// ═══════════════════════════════════════════════════════════════════
// nuclear.js — Nuclear attack, fallout, and response (shared: server + client)
//
// Ported from decompiled Civ2 binary:
//   FUN_0057f9e3 — handle_nuke_attack (1236 bytes)
//   FUN_005b9179 — nuclear_fallout (696 bytes)
//   FUN_0057febc — nuclear_response_retaliation (1084 bytes)
//
// These functions implement the full nuclear weapon pipeline:
//   1. handleNuclearAttack — SDI check, 9-tile destruction, treaty flags, reputation
//   2. applyNuclearFallout — per-tile: fortress, railroad, irrigation/mining; 66.7% pollution
//   3. handleNuclearResponse — AI interceptor launch + ground unit rally
// ═══════════════════════════════════════════════════════════════════

import { UNIT_DOMAIN, UNIT_ATK, UNIT_MOVE_POINTS } from './defs.js';
import { getTreatyFlags, setTreatyFlags, TF } from './diplomacy.js';

/**
 * Compute map distance matching binary FUN_005ae1b0.
 * Binary formula: (abs(dx) + abs(dy)) >> 1, using full cx/cy coords.
 * Our gx = cx >> 1, gy = cy. Convert back to cx for the computation.
 *
 * @param {number} gx1 - tile 1 grid X (half-column)
 * @param {number} gy1 - tile 1 grid Y (row)
 * @param {number} gx2 - tile 2 grid X (half-column)
 * @param {number} gy2 - tile 2 grid Y (row)
 * @param {boolean} wraps - whether map wraps horizontally
 * @param {number} mw2 - full map width in cx-space (= mw * 2)
 * @returns {number} map distance (integer, matching binary)
 */
function mapDistance(gx1, gy1, gx2, gy2, wraps, mw2) {
  // Convert gx back to cx: cx = 2*gx + (gy % 2)
  const cx1 = 2 * gx1 + (gy1 & 1);
  const cy1 = gy1;
  const cx2 = 2 * gx2 + (gy2 & 1);
  const cy2 = gy2;
  let dx = Math.abs(cx1 - cx2);
  if (wraps && dx > (mw2 >> 1)) dx = mw2 - dx;
  const dy = Math.abs(cy1 - cy2);
  return (dx + dy) >> 1;
}

// ═══════════════════════════════════════════════════════════════════
// 1. NUCLEAR_ATTACK — Full nuclear strike handler
// Ported from FUN_0057f9e3 (handle_nuke_attack)
// ═══════════════════════════════════════════════════════════════════

/**
 * Handle a nuclear attack on a target tile.
 *
 * Steps (matching decompiled binary FUN_0057f9e3 order):
 *   1. SDI interception: scan for cities with SDI Defense (building 17)
 *      within FUN_005ae1b0 distance < 4 of target. If found, nuke intercepted.
 *   2. For each of 9 tiles (center + 8 neighbors) — unit destruction:
 *      - Set diplomacy flags (0x110 victim→attacker, 0x20000 attacker→victim)
 *      - Reputation penalty +100 per tile with foreign units (FUN_00456f20)
 *      - Kill ALL units on tile (FUN_005b47fa)
 *   3. Nuclear fallout via FUN_005b9179:
 *      - Non-city tiles: fortress removal, 50% railroad, irrigation/mining
 *        with farmland protection, 66.7% pollution. Roads and forests NOT destroyed.
 *      - City tiles: population halved (size -= size >> 1), NO terrain damage
 *   4. Update global pollution counter
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessor functions
 * @param {number} attackerCiv - civ slot of the nuke launcher
 * @param {number} targetGx - target tile grid X
 * @param {number} targetGy - target tile grid Y
 * @param {boolean} [checkSdi=true] - whether SDI can intercept. Binary param_4:
 *   combat/movement calls pass 1 (check SDI), spy sabotage passes 0 (bypass SDI).
 * @returns {{ intercepted: boolean, affectedCivs: Set, events: Array }}
 */
export function handleNuclearAttack(state, mapBase, attackerCiv, targetGx, targetGy, checkSdi = true) {
  const events = [];

  // ── SDI Defense interception check ──
  // Binary FUN_0057f9e3:5883-5917: only when param_4 != 0 (checkSdi == true).
  // Spy-planted nukes call with checkSdi=false, bypassing SDI entirely.
  // Distance uses binary formula: (abs(cx_diff) + abs(cy_diff)) >> 1
  const mw2 = mapBase.mw * 2;
  if (checkSdi) {
    for (let ci = 0; ci < state.cities.length; ci++) {
      const sdiCity = state.cities[ci];
      if (sdiCity.size <= 0 || sdiCity.owner === attackerCiv) continue;
      if (!(sdiCity.buildings && sdiCity.buildings.has(17))) continue; // SDI Defense = building 17
      const dist = mapDistance(sdiCity.gx, sdiCity.gy, targetGx, targetGy, mapBase.wraps, mw2);
      if (dist < 4) {
        events.push({
          type: 'nukeIntercepted', attackerCiv, targetGx, targetGy,
          interceptorCiv: sdiCity.owner, interceptorCity: sdiCity.name,
        });
        return { intercepted: true, affectedCivs: new Set(), events };
      }
    }
  }

  // ── Collect 9 affected tiles (center + 8 neighbors) ──
  const nukeTiles = [{ gx: targetGx, gy: targetGy }];
  if (mapBase.getNeighbors) {
    const neighbors = mapBase.getNeighbors(targetGx, targetGy);
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (ny >= 0 && ny < mapBase.mh) {
        const wgx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
        if (wgx >= 0 && wgx < mapBase.mw) {
          nukeTiles.push({ gx: wgx, gy: ny });
        }
      }
    }
  }

  // ── Deterministic PRNG for 50% chances ──
  let seed = ((targetGx * 31 + targetGy * 17 + attackerCiv * 13 +
    (state.turn?.number || 0)) & 0x7FFFFFFF) || 1;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7FFFFFFF;
    return seed;
  };

  const affectedCivs = new Set();

  // ── Phase 5 (binary lines 5928-5943): Destroy units in blast radius ──
  // Binary destroys units FIRST, then calls FUN_005b9179 for fallout.
  // Diplomacy flags + reputation penalty applied per tile with foreign units.
  for (const nt of nukeTiles) {
    const tileIdx = nt.gy * mapBase.mw + nt.gx;
    const tile = mapBase.tileData?.[tileIdx];
    if (!tile) continue;

    // Find the first foreign unit on this tile (for diplomacy, like binary's FUN_005b2e69)
    let foreignOwner = -1;
    for (let i = 0; i < state.units.length; i++) {
      const u = state.units[i];
      if (u.gx === nt.gx && u.gy === nt.gy && u.gx >= 0) {
        if (u.owner !== attackerCiv && u.owner > 0 && foreignOwner < 0) {
          foreignOwner = u.owner;
        }
      }
    }

    // Set diplomacy flags + reputation penalty BEFORE destroying units
    // Binary FUN_0057f9e3:5933-5940: per tile with foreign units
    if (foreignOwner >= 0) {
      affectedCivs.add(foreignOwner);

      // victim→attacker: |= 0x110 (WAR + nuclear vendetta)
      const victimFlags = getTreatyFlags(state, foreignOwner, attackerCiv);
      setTreatyFlags(state, foreignOwner, attackerCiv,
        victimFlags | TF.WAR | TF.NUKE_AWARENESS | TF.CONTACT);

      // attacker→victim: |= 0x20000 (NUCLEAR_ATTACK flag)
      const attackerFlags = getTreatyFlags(state, attackerCiv, foreignOwner);
      setTreatyFlags(state, attackerCiv, foreignOwner,
        attackerFlags | TF.NUCLEAR_ATTACK | TF.CONTACT);

      // Reputation penalty: +100 hostility (FUN_00456f20)
      // This is per-tile, not per-civ; if the same civ has units on multiple
      // tiles, they get the penalty multiple times (matching binary).
      if (state.civs?.[foreignOwner]) {
        state.civs = [...state.civs];
        const civ = { ...state.civs[foreignOwner] };
        const curRep = civ.reputation ?? 100;
        // FUN_00456f20 adds param_3 to attitude score (worsens relations).
        // In our model, lower reputation = worse. Penalty of 100 is catastrophic.
        civ.reputation = Math.max(0, curRep - 100);
        state.civs[foreignOwner] = civ;
      }
    }

    // Kill ALL units on this tile (binary FUN_005b47fa: walks entire stack)
    for (let i = 0; i < state.units.length; i++) {
      const u = state.units[i];
      if (u.gx === nt.gx && u.gy === nt.gy && u.gx >= 0) {
        state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
      }
    }
  }

  // ── Phase 6 (binary line 5945): Nuclear fallout via FUN_005b9179 ──
  // This handles ALL terrain/city effects in one pass over the 9 tiles.
  const falloutResult = applyNuclearFalloutArea(mapBase, targetGx, targetGy, rand, state.cities);

  // ── Track city damage for events ──
  for (const nt of nukeTiles) {
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.gx !== nt.gx || c.gy !== nt.gy || c.size <= 0) continue;

      // Binary FUN_005b9179:3760-3761: city.size -= city.size >> 1
      // This is "subtract half" — size 5→3, size 3→2, size 1→1
      const half = c.size >> 1;
      const newSize = c.size - half;
      const newWorked = c.workedTiles && c.workedTiles.length > newSize
        ? c.workedTiles.slice(0, newSize) : (c.workedTiles || []);

      state.cities[ci] = {
        ...c, size: newSize, workedTiles: newWorked,
      };

      if (c.owner !== attackerCiv && c.owner > 0) {
        affectedCivs.add(c.owner);
      }

      events.push({
        type: 'cityNuked', cityName: c.name, cityIndex: ci,
        civSlot: c.owner, newSize,
      });
    }
  }

  // ── Update global pollution counter ──
  if (falloutResult.globalPollutionAdded > 0) {
    state.currentPollution = (state.currentPollution || 0) + falloutResult.globalPollutionAdded;
  }

  // ── Diplomatic consequences: set canonical treaty to 'war' ──
  // Treaty flags and reputation were already set per-tile above.
  for (const victimCiv of affectedCivs) {
    if (state.treaties) {
      const key = attackerCiv < victimCiv
        ? `${attackerCiv}-${victimCiv}` : `${victimCiv}-${attackerCiv}`;
      state.treaties = { ...state.treaties, [key]: 'war' };
    }

    events.push({
      type: 'nukeVictim', attacker: attackerCiv, victim: victimCiv,
    });
  }

  events.push({
    type: 'nuclearStrike', civSlot: attackerCiv, targetGx, targetGy,
    tilesAffected: falloutResult.tilesAffected,
    globalPollutionAdded: falloutResult.globalPollutionAdded,
  });

  return { intercepted: false, affectedCivs, events };
}


// ═══════════════════════════════════════════════════════════════════
// 2. NUCLEAR_FALLOUT — Per-tile improvement destruction
// Ported from FUN_005b9179 (nuclear_fallout, 696 bytes)
// ═══════════════════════════════════════════════════════════════════

/**
 * Apply nuclear fallout effects to a single non-city, non-ocean tile.
 *
 * Faithfully ported from FUN_005b9179 (block_005B0000.c:3716-3757).
 * Binary processes tiles in this exact order:
 *   1. Remove fortress if no city (0x42 check)
 *   2. 50% chance remove railroad (bit 0x20)
 *   3. Irrigation/mining destruction with farmland protection
 *   4. 2/3 chance pollution (via FUN_005b90df)
 *
 * Bits in byte 1 of tile record (confirmed by worker construction code):
 *   0x04 = irrigation, 0x08 = mining, 0x10 = road, 0x20 = railroad,
 *   0x40 = fortress, 0x80 = pollution
 *
 * The binary does NOT destroy roads (0x10) or forests (terrain byte 0).
 * Only: fortress, railroad, irrigation, mining are at risk.
 *
 * Note: City tiles are NOT processed by this function in the binary.
 * City tiles only get population halved (handled separately).
 *
 * @param {object} tile - mapBase.tileData[idx] (mutated in place)
 * @param {function} rand - PRNG function returning an integer
 * @returns {boolean} true if pollution was placed (for global counter)
 */
export function applyNuclearFallout(tile, rand) {
  if (!tile || tile.terrain === 10) return false; // skip ocean

  const imp = { ...tile.improvements };

  // Step 1: Remove standalone fortress (fortress without city)
  // Binary line 3722: (bVar1 & 0x42) == 0x40 means fortress set, city NOT set
  if (imp.fortress && !imp.city) {
    imp.fortress = false;
  }

  // Step 2: 50% chance remove railroad (bit 0x20)
  // Binary line 3725-3728: rand() odd check, then FUN_005b94fc(x,y,0x20,0,1)
  // Bit 0x20 is RAILROAD in the improvements byte (NOT forest — forest is
  // terrain type 3 in byte 0, and is not touched by nuclear fallout).
  if (_isOdd(rand())) {
    imp.railroad = false;
  }

  // Step 3: Irrigation/mining destruction with farmland protection
  // Binary lines 3730-3748: Conditional on both mining(0x08) and irrigation(0x04)
  //   If NOT farmland (not both irrigation AND mining):
  //     50% chance clear mining(0x08), then 50% chance clear irrigation(0x04)
  //   If farmland (both present):
  //     50% chance clear mining(0x08) only — irrigation protected
  if (!imp.irrigation || !imp.mining) {
    // NOT farmland: each independently at risk
    if (_isOdd(rand())) {
      imp.mining = false;
      imp.farmland = false;
    }
    if (_isOdd(rand())) {
      imp.irrigation = false;
      imp.farmland = false;
    }
  } else {
    // Farmland: only mining at risk, irrigation protected
    if (_isOdd(rand())) {
      imp.mining = false;
      imp.farmland = false; // farmland requires both irrigation + mining
    }
  }

  // Step 4: 2/3 chance to place pollution
  // Binary line 3752-3754: rand() % 3 != 0 → FUN_005b90df (set pollution + increment global)
  let pollutionPlaced = false;
  if (rand() % 3 !== 0) {
    imp.pollution = true;
    pollutionPlaced = true;
  }

  tile.improvements = imp;
  return pollutionPlaced;
}

/**
 * Binary's odd-check pattern: tests absolute-value oddness of rand() result.
 * Ghidra decompiles this as ((uVar5 ^ uVar6) - uVar6 & 1 ^ uVar6) != uVar6
 * where uVar6 = (int)uVar5 >> 31. For positive rand(), this is just (rand & 1).
 * For negative rand(), it tests if abs(rand) is odd.
 * Our PRNG always returns positive (& 0x7FFFFFFF), so this simplifies to (rand & 1).
 */
function _isOdd(val) {
  return (val & 1) !== 0;
}

/**
 * Apply nuclear fallout to 9 tiles (center + 8 neighbors).
 * Faithfully ports FUN_005b9179 (block_005B0000.c:3692).
 *
 * Binary behavior per tile:
 *   - If city exists on tile → halve city population (handled by caller)
 *   - If no city AND not ocean → apply terrain fallout (improvements + pollution)
 *   - City tiles get NO terrain damage in the binary
 *
 * This function only handles the terrain fallout. City population halving
 * is done by the caller (handleNuclearAttack).
 *
 * @param {object} mapBase - map data + accessor functions
 * @param {number} centerGx - center tile grid X
 * @param {number} centerGy - center tile grid Y
 * @param {function} [rng] - optional PRNG function; defaults to seeded LCG
 * @param {Array} [cities] - optional city array for city-tile exclusion
 * @returns {{ tilesAffected: number, globalPollutionAdded: number }}
 */
export function applyNuclearFalloutArea(mapBase, centerGx, centerGy, rng, cities) {
  // Build PRNG if not provided
  let seed = ((centerGx * 31 + centerGy * 17 + 7) & 0x7FFFFFFF) || 1;
  const defaultRand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7FFFFFFF;
    return seed;
  };
  const rand = rng || defaultRand;

  // Collect 9 tiles
  const tiles = [{ gx: centerGx, gy: centerGy }];
  if (mapBase.getNeighbors) {
    const neighbors = mapBase.getNeighbors(centerGx, centerGy);
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (ny >= 0 && ny < mapBase.mh) {
        const wgx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
        if (wgx >= 0 && wgx < mapBase.mw) {
          tiles.push({ gx: wgx, gy: ny });
        }
      }
    }
  }

  let tilesAffected = 0;
  let globalPollutionAdded = 0;

  for (const t of tiles) {
    const tileIdx = t.gy * mapBase.mw + t.gx;
    const tile = mapBase.tileData?.[tileIdx];
    if (!tile) continue;

    // Binary FUN_005b9179:3716-3717: check for city on tile FIRST
    // If city exists → skip terrain fallout (city population handled separately)
    const hasCityOnTile = cities
      ? cities.some(c => c.gx === t.gx && c.gy === t.gy && c.size > 0)
      : (tile.improvements && tile.improvements.city);

    if (hasCityOnTile) {
      // City tiles: no terrain fallout in the binary
      // Population halving is done by the caller
      continue;
    }

    // Non-city, non-ocean tiles: apply terrain fallout
    if (tile.terrain === 10) continue; // ocean

    const polluted = applyNuclearFallout(tile, rand);
    tilesAffected++;

    // Global pollution counter: pollution placement is inside applyNuclearFallout
    // which returns whether pollution was placed (2/3 chance)
    if (polluted) {
      globalPollutionAdded++;
    }
  }

  return { tilesAffected, globalPollutionAdded };
}


// ═══════════════════════════════════════════════════════════════════
// 3. NUCLEAR_RESPONSE — AI retaliation after a nuclear strike
// Ported from FUN_0057febc (nuclear_response_retaliation, 1084 bytes)
// ═══════════════════════════════════════════════════════════════════

/**
 * Handle AI nuclear response after a strike.
 *
 * Two phases (matching decompiled binary):
 *   Phase 1: Search for interceptor missiles (flagsB & 0x01) in cities
 *            within range. If found, launch retaliatory nuke at attacker.
 *   Phase 2: Rally ground units within 7-tile Manhattan distance on the
 *            same continent toward the nuke site (set goto order).
 *
 * Only affects AI-controlled civs (skips human players).
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessor functions
 * @param {number} targetGx - nuke impact site grid X
 * @param {number} targetGy - nuke impact site grid Y
 * @param {number} attackerCiv - civ slot of the nuke launcher
 * @returns {{ events: Array }}
 */
export function handleNuclearResponse(state, mapBase, targetGx, targetGy, attackerCiv) {
  const events = [];
  const humanPlayers = state.humanPlayers ?? 0xFF;

  // Get the continent/body ID at the nuke site
  const targetBodyId = mapBase.getBodyId ? mapBase.getBodyId(targetGx, targetGy) : -1;

  // ── Phase 1: Search for interceptor missiles ──
  // Binary: look for units with flagsB & 0x01 (missile flag) in cities
  // Unit types 44 (Cruise Missile) and 45 (Nuclear Missile) are missiles.
  // We look for Nuclear Missiles (type 45) specifically for retaliation.
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.gx < 0 || u.owner === attackerCiv || u.owner === 0) continue;

    // Only AI civs respond automatically
    if ((1 << u.owner) & humanPlayers) continue;

    // Must be a nuclear missile (type 45)
    if (u.type !== 45) continue;

    // Must be in a city
    const inCity = state.cities.some(c =>
      c.gx === u.gx && c.gy === u.gy && c.size > 0 && c.owner === u.owner);
    if (!inCity) continue;

    // Skip sleeping/fortified units (binary: statusFlags & 0x10 blocks response)
    if (u.orders === 'sleep') continue;

    // Check range: missile must be able to reach attacker
    const missileRange = UNIT_MOVE_POINTS[45] || 16;
    let dx = Math.abs(u.gx - targetGx);
    if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
    const dy = Math.abs(u.gy - targetGy);
    if (dx + dy > missileRange) continue;

    // Found a retaliatory missile — set it to goto the nuke site
    state.units[i] = {
      ...u,
      orders: 'goto',
      goToX: targetGx,
      goToY: targetGy,
    };

    events.push({
      type: 'nuclearRetaliation', civSlot: u.owner,
      unitIndex: i, targetGx, targetGy,
    });

    // Binary only launches one interceptor per response
    break;
  }

  // ── Phase 2: Rally ground units toward nuke site ──
  // Binary: search within 7-tile Manhattan distance, same continent,
  // ground domain, has attack > 0, has movement remaining.
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.gx < 0 || u.owner === attackerCiv || u.owner === 0) continue;

    // Only AI civs rally
    if ((1 << u.owner) & humanPlayers) continue;

    // Must be ground domain with attack > 0
    if ((UNIT_DOMAIN[u.type] ?? 0) !== 0) continue;
    if ((UNIT_ATK[u.type] || 0) <= 0) continue;

    // Must have movement remaining
    if ((u.movesLeft || 0) <= 0) continue;

    // Must be within 7-tile Manhattan distance
    let dx = Math.abs(u.gx - targetGx);
    if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
    const dy = Math.abs(u.gy - targetGy);
    if (dx + dy > 7) continue;

    // Must be on same continent
    if (targetBodyId >= 0 && mapBase.getBodyId) {
      const unitBody = mapBase.getBodyId(u.gx, u.gy);
      if (unitBody !== targetBodyId) continue;
    }

    // Must be at war with the attacker (or same civ as victim)
    // Binary: treaty flags & 0x08 check (alliance/war status)
    if (state.treaties) {
      const key = u.owner < attackerCiv
        ? `${u.owner}-${attackerCiv}` : `${attackerCiv}-${u.owner}`;
      const treaty = state.treaties[key];
      if (treaty !== 'war') continue;
    }

    // Set goto order toward the nuke site
    state.units[i] = {
      ...u,
      orders: 'goto',
      goToX: targetGx,
      goToY: targetGy,
    };

    events.push({
      type: 'unitRallied', civSlot: u.owner,
      unitIndex: i, unitType: u.type, targetGx, targetGy,
    });
  }

  return { events };
}
