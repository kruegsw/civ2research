// ═══════════════════════════════════════════════════════════════════
// reduce/barbarians.js — Barbarian spawning, AI, and camp production
// ═══════════════════════════════════════════════════════════════════

import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, UNIT_COSTS, UNIT_ATK, UNIT_DEF, BARBARIAN_CITY_NAMES, BARBARIAN_SEA_UNITS, BARBARIAN_SPAWN_FREQUENCY, BARBARIAN_MAX_UNITS, BARBARIAN_MIN_TURN } from '../defs.js';
import { resolveDirection, moveCost } from '../movement.js';
import { updateVisibility } from '../visibility.js';
import { resolveCombat, calcStackBestDefender } from '../combat.js';
import { cityHasBuilding, hasWonderEffect } from '../utils.js';
import { getNumericYear } from '../year.js';
import { makeUnit, killUnit, captureCity, checkCivElimination } from './helpers.js';

// I.1: Difficulty-based spawn count multiplier
export const DIFFICULTY_BARB_MULTIPLIER = {
  chieftain: 0.5, warlord: 0.75, prince: 1.0, king: 1.25, emperor: 1.5, deity: 2.0,
};

/**
 * I.1: Pick barbarian unit type based on game era (year).
 * Era pools (pick randomly from available types for the era):
 *   Before 1000 BC: Warriors (2), Horsemen (15)
 *   1000 BC - 1 AD: + Archers (4), Chariots (16)
 *   1 AD - 1500 AD: + Legion (5), Pikemen (6), Knights (19)
 *   After 1500 AD:  + Musketeers (7), Dragoons (20), Cannon (24)
 * Falls back to tech-count method if year calculation fails.
 */
export function getBarbUnitType(state) {
  const turnNum = state.turn?.number || 0;
  const year = getNumericYear(turnNum);
  const rng = state.rng;

  // Build pool of available barbarian unit types based on era
  const pool = [2, 15]; // Warriors, Horsemen (always available)
  if (year >= -1000) pool.push(4, 16);  // Archers, Chariots
  if (year >= 1)     pool.push(5, 6, 19); // Legion, Pikemen, Knights
  if (year >= 1500)  pool.push(7, 20, 24); // Musketeers, Dragoons, Cannon

  return pool[rng.nextInt(pool.length)];
}

/** Pick barbarian sea unit type based on max tech count across alive civs. */
export function getBarbSeaUnitType(state) {
  let maxTechCount = 0;
  for (let c = 1; c < 8; c++) {
    if (!(state.civsAlive & (1 << c))) continue;
    const tc = state.civTechCounts?.[c] || 0;
    if (tc > maxTechCount) maxTechCount = tc;
  }
  for (let i = BARBARIAN_SEA_UNITS.length - 1; i >= 0; i--) {
    if (maxTechCount >= BARBARIAN_SEA_UNITS[i][1]) return BARBARIAN_SEA_UNITS[i][0];
  }
  return BARBARIAN_SEA_UNITS[0][0]; // fallback: Trireme
}

/**
 * Barbarian spawning phase: land units, sea units, and camp founding.
 * Called once per full turn cycle (when turn number increments).
 * I.1: Difficulty-scaled frequency, territory suppression, leader units with gold.
 * I.2: Naval barbarians near coastal settlements, fuel timeout, scuttle weak ships.
 */
export function spawnBarbarians(state, mapBase) {
  const activity = state.barbarianActivity || 'none';
  const freq = BARBARIAN_SPAWN_FREQUENCY[activity];
  if (!freq || activity === 'none') return;

  const turnNum = state.turn.number;
  if (turnNum < BARBARIAN_MIN_TURN) return;

  // I.1: Difficulty-scaled spawn frequency
  const difficulty = state.difficulty || 'chieftain';
  const diffMult = DIFFICULTY_BARB_MULTIPLIER[difficulty] || 1.0;
  // Scale frequency: lower freq = more spawning. Multiply freq by inverse of difficulty.
  const scaledFreq = Math.max(1, Math.round(freq / diffMult));

  // Count existing barbarian units on the map
  let barbCount = 0;
  for (const u of state.units) {
    if (u.owner === 0 && u.gx >= 0) barbCount++;
  }

  // ── Land barbarian spawning ──
  if (turnNum % scaledFreq === 0 && barbCount < BARBARIAN_MAX_UNITS) {
    const spawnLoc = findBarbSpawnTile(state, mapBase, /* land */ true);
    if (spawnLoc) {
      const unitType = getBarbUnitType(state);
      // I.1: Difficulty-scaled spawn count
      const baseCount = 1 + state.rng.nextInt(3); // 1-3
      const spawnCount = Math.max(1, Math.round(baseCount * diffMult));

      // Ensure units array is a fresh clone before pushing
      state.units = [...state.units];

      let actualSpawned = 0;
      for (let s = 0; s < spawnCount && barbCount + actualSpawned < BARBARIAN_MAX_UNITS; s++) {
        const newUnit = makeUnit(
          unitType, 0, spawnLoc.gx, spawnLoc.gy,
          UNIT_MOVE_POINTS[unitType] * MOVEMENT_MULTIPLIER
        );
        state.units.push(newUnit);
        actualSpawned++;
      }

      // I.1: Spawn a barbarian leader unit carrying gold ransom (1 in 4 chance)
      if (actualSpawned > 0 && state.rng.random() < 0.25 && barbCount + actualSpawned < BARBARIAN_MAX_UNITS) {
        const leaderUnit = makeUnit(2, 0, spawnLoc.gx, spawnLoc.gy, UNIT_MOVE_POINTS[2] * MOVEMENT_MULTIPLIER); // Warriors as leader
        // Barbarian leaders carry gold: 25 × difficulty rank (1-6)
        const diffIdx = ['chieftain','warlord','prince','king','emperor','deity'].indexOf(difficulty);
        leaderUnit.barbarianGold = 25 * (diffIdx + 1);
        state.units.push(leaderUnit);
        actualSpawned++;
      }

      if (actualSpawned > 0) {
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({ type: 'barbarianSpawn', count: actualSpawned, gx: spawnLoc.gx, gy: spawnLoc.gy });
        barbCount += actualSpawned;
      }
    }
  }

  // ── I.2: Sea barbarian spawning — near coastal settlements ──
  if (turnNum % scaledFreq === 0 && barbCount < BARBARIAN_MAX_UNITS) {
    const seaLoc = findBarbCoastalSpawnTile(state, mapBase);
    if (seaLoc) {
      const seaType = getBarbSeaUnitType(state);
      const seaCount = 1 + state.rng.nextInt(2); // 1-2

      let actualSeaSpawned = 0;
      for (let s = 0; s < seaCount && barbCount + actualSeaSpawned < BARBARIAN_MAX_UNITS; s++) {
        const seaUnit = makeUnit(
          seaType, 0, seaLoc.gx, seaLoc.gy,
          UNIT_MOVE_POINTS[seaType] * MOVEMENT_MULTIPLIER
        );
        // I.2: Track spawn turn for 30-turn fuel timeout
        seaUnit.barbSeaTurn = turnNum;
        state.units.push(seaUnit);
        actualSeaSpawned++;
      }

      if (actualSeaSpawned > 0) {
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({ type: 'barbarianSpawn', count: actualSeaSpawned, gx: seaLoc.gx, gy: seaLoc.gy });
        barbCount += actualSeaSpawned;
      }
    }
  }

  // ── I.2: Barbarian sea unit maintenance — fuel timeout and scuttle ──
  processBarbNavalMaintenance(state, mapBase, turnNum);

  // ── Camp founding (every 64 turns, 25% chance) ──
  if (turnNum % 64 === 0 && state.rng.random() < 0.25) {
    // Find a barbarian unit far from any city (distance > 3)
    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (u.owner !== 0 || u.gx < 0) continue;
      if (UNIT_DOMAIN[u.type] !== 0) continue; // land units only

      // Check no city within 3 tiles
      let nearCity = false;
      for (const c of state.cities) {
        if (c.size <= 0) continue;
        let dx = Math.abs(u.gx - c.gx);
        if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
        const dy = Math.abs(u.gy - c.gy);
        if (dx + dy <= 3) { nearCity = true; break; }
      }
      if (nearCity) continue;

      // Found a candidate — create a camp (size-1 barbarian city)
      const camp = {
        name: BARBARIAN_CITY_NAMES[0] || 'Camp',
        owner: 0,
        gx: u.gx, gy: u.gy,
        x: u.gx * 2 + (u.gy % 2), y: u.gy,
        size: 1,
        foodInBox: 0, shieldsInBox: 0,
        buildings: new Set(),
        hasWalls: false, hasPalace: false,
        workedTiles: [20], // center tile only
        specialists: [],
        itemInProduction: null,
        civilDisorder: false,
        weLoveKingDay: false,
        soldThisTurn: false,
      };

      state.cities = [...state.cities, camp];
      const campIdx = state.cities.length - 1;

      // Keep the founding unit alive as the camp's garrison
      state.units[ui] = { ...u, homeCityId: campIdx };

      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'barbarianCamp', gx: u.gx, gy: u.gy });
      break; // only one camp per cycle
    }
  }
}

/**
 * I.2: Process barbarian naval unit maintenance.
 * - 30-turn fuel timeout: destroy barbarian ships older than 30 turns at sea.
 * - Scuttle weak ships: HP - stackSize < 2.
 */
export function processBarbNavalMaintenance(state, mapBase, turnNum) {
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.owner !== 0 || u.gx < 0) continue;
    if (UNIT_DOMAIN[u.type] !== 1) continue; // sea units only

    // 30-turn fuel timeout
    if (u.barbSeaTurn != null && turnNum - u.barbSeaTurn >= 30) {
      killUnit(state, i);
      continue;
    }

    // Scuttle weak ships: calculate HP remaining and stack size on tile
    const maxHp = (UNIT_HP[u.type] || 1) * 10;
    const currentHp = maxHp - (u.movesRemain || 0);
    let stackSize = 0;
    for (let j = 0; j < state.units.length; j++) {
      const su = state.units[j];
      if (su.owner === 0 && su.gx === u.gx && su.gy === u.gy && su.gx >= 0) stackSize++;
    }
    if (currentHp - stackSize < 2) {
      killUnit(state, i);
    }
  }
}

/**
 * Find a random unexplored land tile for barbarian spawning.
 * Unexplored = visibility byte has NO bits set for any alive civ (slots 1-7).
 * Must be land (terrain !== 10), not in/adjacent to a city.
 * I.1: Territory suppression — no spawning on tiles owned by any civ.
 * Tries up to 100 random positions.
 */
export function findBarbSpawnTile(state, mapBase, _land) {
  const { mw, mh, tileData } = mapBase;
  if (!tileData) return null;

  // Build alive-civ visibility mask (bits 1-7)
  let aliveMask = 0;
  for (let c = 1; c < 8; c++) {
    if (state.civsAlive & (1 << c)) aliveMask |= (1 << c);
  }

  for (let attempt = 0; attempt < 100; attempt++) {
    const gx = state.rng.nextInt(mw);
    const gy = state.rng.nextInt(mh);
    const idx = gy * mw + gx;
    const tile = tileData[idx];
    if (!tile) continue;

    // Must be land
    if (tile.terrain === 10) continue;

    // Must be unexplored by all alive civs
    if ((tile.visibility & aliveMask) !== 0) continue;

    // I.1: Territory suppression — no barbarian camps on tiles owned by civs
    const tileOwner = tile.tileOwnership;
    if (tileOwner !== undefined && tileOwner !== 0 && tileOwner !== 0x0F) continue;

    // Must not be in or adjacent to a city
    let nearCity = false;
    for (const c of state.cities) {
      if (c.size <= 0) continue;
      let dx = Math.abs(gx - c.gx);
      if (mapBase.wraps) dx = Math.min(dx, mw - dx);
      const dy = Math.abs(gy - c.gy);
      if (dx <= 1 && dy <= 2) { nearCity = true; break; }
    }
    if (nearCity) continue;

    return { gx, gy };
  }
  return null;
}

/**
 * Find a random ocean tile at map edge for sea barbarian spawning.
 * Only used when mapBase.wraps is false (edge tiles exist).
 * Tries up to 100 random positions along edges.
 */
export function findBarbSeaSpawnTile(state, mapBase) {
  const { mw, mh, tileData } = mapBase;
  if (!tileData) return null;
  const rng = state.rng;

  for (let attempt = 0; attempt < 100; attempt++) {
    let gx, gy;
    // Pick a random edge: 0=top, 1=bottom, 2=left, 3=right
    const edge = rng.nextInt(4);
    switch (edge) {
      case 0: gx = rng.nextInt(mw); gy = 0; break;
      case 1: gx = rng.nextInt(mw); gy = mh - 1; break;
      case 2: gx = 0; gy = rng.nextInt(mh); break;
      case 3: gx = mw - 1; gy = rng.nextInt(mh); break;
    }
    const idx = gy * mw + gx;
    const tile = tileData[idx];
    if (!tile) continue;
    if (tile.terrain !== 10) continue; // must be ocean
    return { gx, gy };
  }
  return null;
}

/**
 * I.2: Find an ocean tile near a coastal settlement for sea barbarian spawning.
 * Picks a random non-barbarian coastal city, then finds an adjacent ocean tile.
 * Falls back to findBarbSeaSpawnTile if no coastal cities exist.
 */
export function findBarbCoastalSpawnTile(state, mapBase) {
  const rng = state.rng;
  const { mw, mh, tileData } = mapBase;
  if (!tileData) return null;

  // Collect non-barbarian coastal cities (those with an adjacent ocean tile)
  const coastalCities = [];
  for (const c of state.cities) {
    if (c.owner === 0 || c.size <= 0) continue;
    const cgx = c.gx != null ? c.gx : c.cx;
    const cgy = c.gy != null ? c.gy : c.cy;
    // Check if any adjacent tile is ocean
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    for (const dir of dirs) {
      const dest = resolveDirection(cgx, cgy, dir, mapBase);
      if (!dest) continue;
      if (dest.gy < 0 || dest.gy >= mh) continue;
      const wgx = mapBase.wraps ? ((dest.gx % mw) + mw) % mw : dest.gx;
      if (wgx < 0 || wgx >= mw) continue;
      const dTile = tileData[dest.gy * mw + wgx];
      if (dTile && dTile.terrain === 10) {
        coastalCities.push({ city: c, oceanGx: wgx, oceanGy: dest.gy });
        break; // one match per city is enough
      }
    }
  }

  if (coastalCities.length === 0) {
    // Fallback to edge spawn
    return findBarbSeaSpawnTile(state, mapBase);
  }

  // Pick a random coastal city, find ocean tiles near it
  const pick = coastalCities[rng.nextInt(coastalCities.length)];
  // Try to find an ocean tile 2-4 tiles from the city (not directly adjacent)
  const cgx = pick.city.gx != null ? pick.city.gx : pick.city.cx;
  const cgy = pick.city.gy != null ? pick.city.gy : pick.city.cy;

  for (let attempt = 0; attempt < 20; attempt++) {
    const dx = rng.nextInt(7) - 3; // -3 to 3
    const dy = rng.nextInt(7) - 3;
    if (Math.abs(dx) + Math.abs(dy) < 2) continue; // not too close
    let gx = cgx + dx;
    const gy = cgy + dy;
    if (gy < 0 || gy >= mh) continue;
    if (mapBase.wraps) {
      gx = ((gx % mw) + mw) % mw;
    } else if (gx < 0 || gx >= mw) {
      continue;
    }
    const tile = tileData[gy * mw + gx];
    if (tile && tile.terrain === 10) return { gx, gy };
  }

  // Direct fallback: use the first ocean tile we found adjacent to the city
  return { gx: pick.oceanGx, gy: pick.oceanGy };
}

// ═══════════════════════════════════════════════════════════════════
// Barbarian AI — runs once per full turn cycle
// ═══════════════════════════════════════════════════════════════════

export const BARB_DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/**
 * Manhattan distance accounting for horizontal wrapping.
 */
export function barbDist(gx1, gy1, gx2, gy2, mapBase) {
  let dx = Math.abs(gx1 - gx2);
  if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
  return dx + Math.abs(gy1 - gy2);
}

/**
 * Process all barbarian (owner === 0) unit movement and combat.
 * Called once per full turn cycle when turnNumber increments.
 */
export function processBarbarianAI(state, prev, mapBase) {
  state.units = state.units !== prev.units ? state.units : [...prev.units];

  const difficulty = state.difficulty || 'chieftain';

  for (let ui = 0; ui < state.units.length; ui++) {
    const origUnit = state.units[ui];
    if (origUnit.owner !== 0 || origUnit.gx < 0) continue;

    // Reset movement points
    const maxMoves = UNIT_MOVE_POINTS[origUnit.type] * MOVEMENT_MULTIPLIER;
    state.units[ui] = { ...origUnit, movesLeft: maxMoves };

    const maxSteps = UNIT_MOVE_POINTS[origUnit.type] || 1;
    for (let step = 0; step < maxSteps; step++) {
      const unit = state.units[ui];
      if (unit.gx < 0 || unit.movesLeft <= 0) break;

      const domain = UNIT_DOMAIN[unit.type] ?? 0;

      // Find nearest target within 10 tiles
      let bestTarget = null;
      let bestDist = Infinity;

      for (const city of state.cities) {
        if (city.owner === 0 || city.size <= 0) continue;
        const d = barbDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
        if (d < bestDist) { bestDist = d; bestTarget = { gx: city.gx, gy: city.gy }; }
      }
      for (let ti = 0; ti < state.units.length; ti++) {
        const t = state.units[ti];
        if (t.owner === 0 || t.gx < 0) continue;
        const d = barbDist(unit.gx, unit.gy, t.gx, t.gy, mapBase);
        if (d < bestDist) { bestDist = d; bestTarget = { gx: t.gx, gy: t.gy }; }
      }

      let chosenDest = null;

      if (!bestTarget || bestDist > 10) {
        // Random movement
        const shuffled = [...BARB_DIRS];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = state.rng.nextInt(i + 1);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        for (const dir of shuffled) {
          const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
          if (!dest) continue;
          if (!barbCanEnter(dest.gx, dest.gy, domain, state, mapBase)) continue;
          chosenDest = dest;
          break;
        }
      } else {
        // Move toward target
        let bestMoveDist = Infinity;
        for (const dir of BARB_DIRS) {
          const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
          if (!dest) continue;

          const hasEnemy = state.units.some(eu =>
            eu.gx === dest.gx && eu.gy === dest.gy && eu.owner !== 0 && eu.gx >= 0);

          if (hasEnemy) {
            const d = barbDist(dest.gx, dest.gy, bestTarget.gx, bestTarget.gy, mapBase);
            if (d < bestMoveDist) { bestMoveDist = d; chosenDest = dest; }
            continue;
          }

          if (!barbCanEnter(dest.gx, dest.gy, domain, state, mapBase)) continue;
          const d = barbDist(dest.gx, dest.gy, bestTarget.gx, bestTarget.gy, mapBase);
          if (d < bestMoveDist) { bestMoveDist = d; chosenDest = dest; }
        }
      }

      if (!chosenDest) break;

      // Check for enemy units → combat
      const enemiesAtDest = [];
      for (let ei = 0; ei < state.units.length; ei++) {
        const eu = state.units[ei];
        if (eu.gx === chosenDest.gx && eu.gy === chosenDest.gy && eu.owner !== 0 && eu.gx >= 0) {
          enemiesAtDest.push(ei);
        }
      }

      if (enemiesAtDest.length > 0) {
        // ── Barbarian-initiated combat ──
        const defTerrain = mapBase.getTerrain(chosenDest.gx, chosenDest.gy);
        const defCity = state.cities.find(c => c.gx === chosenDest.gx && c.gy === chosenDest.gy && c.owner !== 0);
        const defInCity = !!defCity;
        const defCityHasWalls = defInCity && (cityHasBuilding(defCity, 8) || hasWonderEffect(state, defCity.owner, 6));
        const defImp = mapBase.getImprovements(chosenDest.gx, chosenDest.gy);
        const defHasFortress = !!(defImp && defImp.fortress);
        const defOnRiver = !!(mapBase.hasRiver && mapBase.hasRiver(chosenDest.gx, chosenDest.gy));

        const defCityBuildings = defCity ? defCity.buildings : null;

        // Use calcStackBestDefender for best defender selection
        let bestDefIdx = calcStackBestDefender(chosenDest.gx, chosenDest.gy, state.units[ui].type, state, mapBase);
        if (bestDefIdx < 0) bestDefIdx = enemiesAtDest[0]; // fallback

        const attacker = state.units[ui];
        const defender = state.units[bestDefIdx];

        // Check if defender's civ has Great Wall wonder
        const barbDefenderHasGreatWall = defInCity && hasWonderEffect(state, defender.owner, 6);

        // Palace / small-city double-roll
        const barbDefCityHasPalace = defInCity && defCity && defCity.buildings && defCity.buildings.has(1);
        const barbDefCitySize = defCity ? (defCity.size || 0) : 0;

        const barbCombatSeed = (attacker.gx * 997 + attacker.gy * 991 + chosenDest.gx * 983 +
          chosenDest.gy * 977 + ui * 967 + bestDefIdx * 953 + (state.turn?.number || 0) * 941 +
          (state.version || 0) * 929);
        const barbCombatOpts = {
          defenderHasGreatWall: barbDefenderHasGreatWall,
          defCityHasPalace: barbDefCityHasPalace,
          defCitySize: barbDefCitySize,
          defenderSunTzu: hasWonderEffect(state, defender.owner, 7),
        };
        const result = resolveCombat(attacker, defender, defTerrain, defInCity, defCityHasWalls,
          defHasFortress, defOnRiver, defCityBuildings, barbCombatSeed, difficulty, attacker.movesLeft, barbCombatOpts);

        if (result.attackerWins) {
          killUnit(state, bestDefIdx);

          // Stack wipe on open ground
          if (!defInCity && !defHasFortress) {
            for (let si = 0; si < state.units.length; si++) {
              if (si !== bestDefIdx && state.units[si].gx === chosenDest.gx &&
                  state.units[si].gy === chosenDest.gy && state.units[si].owner !== 0 &&
                  state.units[si].gx >= 0) {
                killUnit(state, si);
              }
            }
          }

          const moreEnemies = state.units.some(eu =>
            eu.gx === chosenDest.gx && eu.gy === chosenDest.gy && eu.owner !== 0 && eu.gx >= 0);
          if (!moreEnemies) {
            state.units[ui] = {
              ...state.units[ui],
              gx: chosenDest.gx, gy: chosenDest.gy,
              x: chosenDest.gx * 2 + (chosenDest.gy % 2), y: chosenDest.gy,
              movesRemain: result.atkHpLost,
              veteran: result.atkVeteranPromo ? 1 : state.units[ui].veteran,
              movesLeft: Math.max(0, state.units[ui].movesLeft - MOVEMENT_MULTIPLIER),
            };

            // City capture by barbarians
            if (defCity) {
              state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
              const ci = state.cities.findIndex(c => c === defCity);
              if (ci >= 0) {
                const defOwner = defCity.owner;
                captureCity(state, prev, mapBase, ci, 0, defOwner);
                if (!state.turnEvents) state.turnEvents = [];
                state.turnEvents.push({ type: 'barbarianCapture', cityName: defCity.name });
              }
            }
          } else {
            state.units[ui] = {
              ...state.units[ui],
              movesRemain: result.atkHpLost,
              veteran: result.atkVeteranPromo ? 1 : state.units[ui].veteran,
              movesLeft: Math.max(0, state.units[ui].movesLeft - MOVEMENT_MULTIPLIER),
            };
          }

          checkCivElimination(state, defender.owner);

          // Barbarian uprising when barbarian AI kills last city of a civ
          if (defCity && defender.owner > 0 &&
              !(state.civsAlive & (1 << defender.owner))) {
            spawnBarbarianUprising(state, mapBase, defCity.gx, defCity.gy);
          }
        } else {
          killUnit(state, ui);
          state.units[bestDefIdx] = {
            ...state.units[bestDefIdx],
            veteran: result.defVeteranPromo ? 1 : defender.veteran,
            movesRemain: result.defHpLost,
          };
        }
        break; // Combat ends this unit's turn
      } else {
        // ── Normal movement ──
        const cost = moveCost(unit.type, mapBase, unit.gx, unit.gy, chosenDest.gx, chosenDest.gy);
        state.units[ui] = {
          ...state.units[ui],
          gx: chosenDest.gx, gy: chosenDest.gy,
          x: chosenDest.gx * 2 + (chosenDest.gy % 2), y: chosenDest.gy,
          movesLeft: Math.max(0, state.units[ui].movesLeft - Math.max(cost, 1)),
        };
      }
    }

    // Update visibility around barbarian's final position
    const finalUnit = state.units[ui];
    if (finalUnit.gx >= 0) {
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, 0, finalUnit.gx, finalUnit.gy, mapBase.wraps);
    }
  }
}

/**
 * Spawn barbarian units when a civ is destroyed (last city captured).
 * 2-4 barbarian units of appropriate era type on random land tiles within
 * distance 5 of the captured city.
 */
export function spawnBarbarianUprising(state, mapBase, cityGx, cityGy) {
  const activity = state.barbarianActivity || 'none';
  if (activity === 'none') return;

  const unitType = getBarbUnitType(state);
  const count = 2 + state.rng.nextInt(3); // 2-4

  // Collect candidate land tiles within distance 5
  const candidates = [];
  for (let dy = -5; dy <= 5; dy++) {
    for (let dx = -5; dx <= 5; dx++) {
      if (Math.abs(dx) + Math.abs(dy) > 5) continue;
      let gx = cityGx + dx;
      const gy = cityGy + dy;
      if (gy < 0 || gy >= mapBase.mh) continue;
      if (mapBase.wraps) {
        gx = ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw;
      } else if (gx < 0 || gx >= mapBase.mw) {
        continue;
      }
      const terrain = mapBase.getTerrain(gx, gy);
      if (terrain === 10) continue; // skip ocean
      // Skip tiles with non-barbarian cities
      if (state.cities.some(c => c.gx === gx && c.gy === gy && c.owner !== 0 && c.size > 0)) continue;
      candidates.push({ gx, gy });
    }
  }

  if (candidates.length === 0) return;

  // Shuffle candidates
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = state.rng.nextInt(i + 1);
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  state.units = [...state.units];
  let spawned = 0;
  for (let i = 0; i < count && i < candidates.length; i++) {
    const loc = candidates[i];
    state.units.push(makeUnit(
      unitType, 0, loc.gx, loc.gy,
      UNIT_MOVE_POINTS[unitType] * MOVEMENT_MULTIPLIER
    ));
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, 0, loc.gx, loc.gy, mapBase.wraps);
    spawned++;
  }

  if (spawned > 0) {
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'barbarianUprising', count: spawned, gx: cityGx, gy: cityGy });
  }
}

/**
 * Process barbarian camp production. Each camp accumulates 5 shields/turn
 * and produces era-appropriate military units when enough shields are banked.
 * Called once per full turn cycle.
 */
export function processBarbCampProduction(state, mapBase) {
  const activity = state.barbarianActivity || 'none';
  if (activity === 'none') return;

  // Count existing barbarian units
  let barbCount = 0;
  for (const u of state.units) {
    if (u.owner === 0 && u.gx >= 0) barbCount++;
  }

  const unitType = getBarbUnitType(state);
  const unitCost = UNIT_COSTS[unitType]; // already in production units (×10)

  let citiesCloned = false;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== 0 || city.size <= 0) continue;

    // Ensure cities array is cloned once
    if (!citiesCloned) {
      state.cities = [...state.cities];
      citiesCloned = true;
    }

    // Clone this city to mutate
    const camp = { ...city };

    // Set production target
    camp.production = { type: 'unit', id: unitType };

    // Accumulate shields (flat 5 per turn for barbarian camps)
    camp.shieldsInBox = (camp.shieldsInBox || 0) + 5;

    // Check if enough shields to produce a unit
    // Binary uses straight shield cost without movement multiplier
    if (camp.shieldsInBox >= unitCost && barbCount < BARBARIAN_MAX_UNITS) {
      camp.shieldsInBox = 0;

      // Create the new unit at the camp's location
      state.units = [...state.units];
      const newUnit = makeUnit(
        unitType, 0, camp.gx, camp.gy,
        UNIT_MOVE_POINTS[unitType] * MOVEMENT_MULTIPLIER
      );
      newUnit.homeCityId = ci;
      state.units.push(newUnit);
      barbCount++;

      // Update visibility for the new unit
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, 0, camp.gx, camp.gy, mapBase.wraps);
    }

    state.cities[ci] = camp;
  }
}

/**
 * Check if a barbarian unit can enter a tile (terrain/domain/stacking).
 */
export function barbCanEnter(gx, gy, domain, state, mapBase) {
  const terrain = mapBase.getTerrain(gx, gy);
  if (domain === 0 && terrain === 10) return false;
  if (domain === 1 && terrain !== 10) return false;
  // Barbarian units are allowed to stack on the same tile (no stacking check)
  if (state.cities.some(c => c.gx === gx && c.gy === gy && c.owner === 0 && c.size > 0)) return false;
  return true;
}
