// ═══════════════════════════════════════════════════════════════════
// nuclear.js — Nuclear attack, fallout, and response (shared: server + client)
//
// Ported from decompiled Civ2 binary:
//   FUN_0057f9e3 — handle_nuke_attack (1236 bytes)
//   FUN_005b9179 — nuclear_fallout (696 bytes)
//   FUN_0057febc — nuclear_response_retaliation (1084 bytes)
//
// These functions implement the full nuclear weapon pipeline:
//   1. handleNuclearAttack — SDI check, 9-tile destruction, treaty flags
//   2. applyNuclearFallout — per-tile improvement destruction (50% each)
//   3. handleNuclearResponse — AI interceptor launch + ground unit rally
// ═══════════════════════════════════════════════════════════════════

import { UNIT_DOMAIN, UNIT_ATK, UNIT_MOVE_POINTS } from './defs.js';
import { getTreatyFlags, setTreatyFlags, TF } from './diplomacy.js';

// ═══════════════════════════════════════════════════════════════════
// 1. NUCLEAR_ATTACK — Full nuclear strike handler
// Ported from FUN_0057f9e3 (handle_nuke_attack)
// ═══════════════════════════════════════════════════════════════════

/**
 * Handle a nuclear attack on a target tile.
 *
 * Steps (matching decompiled binary order):
 *   1. SDI interception: scan for cities with SDI Defense (building 17)
 *      within Manhattan distance < 4 of target. If found, nuke is intercepted.
 *   2. For each of 9 tiles (center + 8 neighbors):
 *      - 50% chance destroy irrigation
 *      - 50% chance destroy mining
 *      - Remove standalone fortress (fortress without city)
 *      - Place pollution (on non-ocean tiles)
 *      - Kill all units on tile
 *      - If city on tile: halve city size
 *   3. Set treaty flags: victim→attacker = WAR flags, attacker→victim = NUCLEAR_ATTACK
 *   4. Add to global pollution counter (2/3 chance per tile)
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessor functions
 * @param {number} attackerCiv - civ slot of the nuke launcher
 * @param {number} targetGx - target tile grid X
 * @param {number} targetGy - target tile grid Y
 * @returns {{ intercepted: boolean, affectedCivs: Set, events: Array }}
 */
export function handleNuclearAttack(state, mapBase, attackerCiv, targetGx, targetGy) {
  const events = [];

  // ── SDI Defense interception check ──
  // Binary: scan all cities; if any city within distance < 4 has SDI Defense
  // (building 17) and is owned by a different civ, the nuke is intercepted.
  for (let ci = 0; ci < state.cities.length; ci++) {
    const sdiCity = state.cities[ci];
    if (sdiCity.size <= 0 || sdiCity.owner === attackerCiv) continue;
    if (!(sdiCity.buildings && sdiCity.buildings.has(17))) continue; // SDI Defense = building 17
    let ddx = Math.abs(sdiCity.gx - targetGx);
    if (mapBase.wraps) ddx = Math.min(ddx, mapBase.mw - ddx);
    const ddy = Math.abs(sdiCity.gy - targetGy);
    const dist = ddx + ddy;
    if (dist < 4) {
      events.push({
        type: 'nukeIntercepted', attackerCiv, targetGx, targetGy,
        interceptorCiv: sdiCity.owner, interceptorCity: sdiCity.name,
      });
      return { intercepted: true, affectedCivs: new Set(), events };
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
  let globalPollutionAdded = 0;

  for (const nt of nukeTiles) {
    const tileIdx = nt.gy * mapBase.mw + nt.gx;
    const tile = mapBase.tileData?.[tileIdx];
    if (!tile) continue;
    const isOcean = tile.terrain === 10;

    // ── Apply fallout to non-ocean tiles ──
    if (!isOcean) {
      applyNuclearFallout(tile, rand);

      // Global pollution: 2/3 chance per tile (rand() % 3 != 0)
      if (rand() % 3 !== 0) {
        globalPollutionAdded++;
      }
    }

    // ── Kill all units on this tile ──
    for (let i = 0; i < state.units.length; i++) {
      const u = state.units[i];
      if (u.gx === nt.gx && u.gy === nt.gy && u.gx >= 0) {
        if (u.owner !== attackerCiv && u.owner > 0) {
          affectedCivs.add(u.owner);
        }
        state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
      }
    }

    // ── Halve city population on this tile ──
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.gx !== nt.gx || c.gy !== nt.gy || c.size <= 0) continue;

      const newSize = Math.max(1, Math.floor(c.size / 2));
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
  if (globalPollutionAdded > 0) {
    state.currentPollution = (state.currentPollution || 0) + globalPollutionAdded;
  }

  // ── Diplomatic consequences ──
  // Binary: treaty[victim][attacker] |= 0x110 (WAR + bit 8 trespass)
  //         treaty[attacker][victim] |= 0x20000 (NUCLEAR_ATTACK flag)
  for (const victimCiv of affectedCivs) {
    // Victim→attacker: set WAR + hostility flags
    const victimFlags = getTreatyFlags(state, victimCiv, attackerCiv);
    setTreatyFlags(state, victimCiv, attackerCiv,
      victimFlags | TF.WAR | TF.NUKE_AWARENESS | TF.CONTACT);

    // Attacker→victim: set NUCLEAR_ATTACK flag
    const attackerFlags = getTreatyFlags(state, attackerCiv, victimCiv);
    setTreatyFlags(state, attackerCiv, victimCiv,
      attackerFlags | TF.NUCLEAR_ATTACK | TF.CONTACT);

    // Also set the canonical treaty to 'war'
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
    tilesAffected: nukeTiles.length, globalPollutionAdded,
  });

  return { intercepted: false, affectedCivs, events };
}


// ═══════════════════════════════════════════════════════════════════
// 2. NUCLEAR_FALLOUT — Per-tile improvement destruction
// Ported from FUN_005b9179 (nuclear_fallout, 696 bytes)
// ═══════════════════════════════════════════════════════════════════

/**
 * Apply nuclear fallout effects to a single tile.
 * Destroys improvements with 50% chance each, removes standalone
 * fortresses, and places pollution.
 *
 * Binary reference (block_005B0000.c):
 *   - irrigation (0x08): 50% chance removed
 *   - mining (0x04): 50% chance removed
 *   - fortress (0x40) without city (0x02): always removed
 *   - pollution (0x20): always placed
 *
 * @param {object} tile - mapBase.tileData[idx] (mutated in place)
 * @param {function} rand - PRNG function returning an integer
 */
export function applyNuclearFallout(tile, rand) {
  if (!tile || tile.terrain === 10) return; // skip ocean

  const imp = { ...tile.improvements };

  // 50% chance destroy irrigation
  if (imp.irrigation && (rand() & 1) === 0) {
    imp.irrigation = false;
    // If farmland was present (irrigation + mining), farmland is also lost
    if (imp.farmland) imp.farmland = false;
  }

  // 50% chance destroy mining
  if (imp.mining && (rand() & 1) === 0) {
    imp.mining = false;
    // If farmland was present, farmland is also lost
    if (imp.farmland) imp.farmland = false;
  }

  // Remove standalone fortress (fortress present but no city on tile)
  // Binary: (bVar1 & 0x42) == 0x02 means fortress without city
  // In our model, city presence is indicated by tile having a city
  // We check for fortress flag; city tiles have a separate city object
  // but the tile improvement also has a 'city' or 'cityBit' indicator.
  // For safety, remove fortress unconditionally (cities are tracked
  // separately and their fortress is part of the city building set).
  if (imp.fortress) {
    imp.fortress = false;
  }

  // Place pollution
  imp.pollution = true;

  tile.improvements = imp;
}

/**
 * Apply nuclear fallout to 9 tiles (center + 8 neighbors).
 * Standalone version for use outside of handleNuclearAttack
 * (e.g., for spy-planted nukes or meltdown scenarios).
 *
 * @param {object} mapBase - map data + accessor functions
 * @param {number} centerGx - center tile grid X
 * @param {number} centerGy - center tile grid Y
 * @param {function} [rng] - optional PRNG function; defaults to seeded LCG
 * @returns {{ tilesAffected: number, globalPollutionAdded: number }}
 */
export function applyNuclearFalloutArea(mapBase, centerGx, centerGy, rng) {
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
    if (!tile || tile.terrain === 10) continue;

    applyNuclearFallout(tile, rand);
    tilesAffected++;

    // Global pollution: 2/3 chance per tile
    if (rand() % 3 !== 0) {
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
  const humanPlayers = state.humanPlayers || 0xFF;

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
