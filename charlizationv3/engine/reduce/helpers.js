// ═══════════════════════════════════════════════════════════════════
// reduce/helpers.js — Shared utility functions used by multiple handlers
// ═══════════════════════════════════════════════════════════════════

import { CITY_RADIUS_DOUBLED, CIV_CITY_NAMES, BARBARIAN_CITY_NAMES, UNIT_FUEL, UNIT_MOVE_POINTS, MOVEMENT_MULTIPLIER, UNIT_ATK, CAN_IRRIGATE, IRR_TRANSFORM, CAN_MINE, MINE_TRANSFORM, UNIT_LIMITS, ROAD_TURNS, IRRIGATION_TURNS, MINING_TURNS, FORTRESS_TURNS, AIRBASE_TURNS, POLLUTION_TURNS } from '../defs.js';
import { getTileYields } from '../production.js';
import { getGovernment, cityHasBuilding, hasWonderEffect } from '../utils.js';
import { handleCityCapture } from '../citycapture.js';
import { dispatchEvents, EVENT_CITY_TAKEN } from '../events.js';

/**
 * Apply completed worker improvement to the map tile data.
 * Mutates tileData[idx].improvements in place (authoritative source).
 *
 * @param {string} order - worker order type
 * @param {number} gx - tile x
 * @param {number} gy - tile y
 * @param {number} terrain - terrain type at tile
 * @param {object} mapBase - map data
 * @param {object} [opts] - optional: { hasRefrigeration: bool } for farmland check
 */
export function completeWorkerOrder(order, gx, gy, terrain, mapBase, opts) {
  const idx = gy * mapBase.mw + gx;
  const tile = mapBase.tileData?.[idx];
  if (!tile) return;

  // Clone improvements to avoid aliasing
  const imp = { ...tile.improvements };

  switch (order) {
    case 'road':      imp.road = true; break;
    case 'railroad':  imp.railroad = true; break;
    case 'irrigation':
      if (CAN_IRRIGATE[terrain]) {
        // Gap 86: Farmland creation from re-irrigation
        // If tile already has irrigation AND has a road, and civ has Refrigeration,
        // create farmland instead of just setting irrigation again.
        if (imp.irrigation && imp.road && opts?.hasRefrigeration) {
          imp.farmland = true;
        } else {
          imp.irrigation = true;
        }
      } else if (IRR_TRANSFORM[terrain] >= 0) {
        // Gap 85: Negative work value → terrain type change (e.g., irrigating forest → plains)
        tile.terrain = IRR_TRANSFORM[terrain];
        // Clear improvements that don't apply to new terrain
        imp.irrigation = false;
        imp.mining = false;
        imp.farmland = false;
      }
      break;
    case 'mine':
      if (CAN_MINE[terrain]) {
        imp.mining = true;
      } else if (MINE_TRANSFORM[terrain] >= 0) {
        // Gap 85: Negative work value → terrain type change (e.g., mining plains → forest)
        tile.terrain = MINE_TRANSFORM[terrain];
        // Clear improvements that don't apply to new terrain
        imp.irrigation = false;
        imp.mining = false;
        imp.farmland = false;
      }
      break;
    case 'fortress':  imp.fortress = true; break;
    case 'airbase':   imp.airbase = true; break;
    case 'pollution': imp.pollution = false; break;
  }

  // Farmland: irrigation + mining both set (legacy check)
  if (imp.irrigation && imp.mining) imp.farmland = true;

  tile.improvements = imp;
}

/**
 * Calculate effective work turns needed for a worker order, accounting for:
 * - Per-terrain durations from defs.js (IRRIGATION_TURNS, MINING_TURNS, etc.)
 * - Engineer double-speed (halve turns, min 1)
 * - Settler/engineer cooperation (multiple workers on same tile pool work)
 * - River penalty for railroad (+1 turn if tile has a river)
 *
 * @param {string} order - worker order type ('road','railroad','irrigation','mine','fortress','airbase','pollution')
 * @param {number} terrain - terrain type at tile
 * @param {boolean} isEngineer - true if the unit is an Engineer (type 1)
 * @param {object} [opts] - optional: { hasRiver: bool, coopCount: number }
 *   coopCount = number of settlers/engineers working on same tile and same order (including this one)
 * @returns {number} effective turns needed for this worker
 */
export function getWorkerTurnsNeeded(order, terrain, isEngineer, opts) {
  let baseTurns;
  switch (order) {
    case 'road':       baseTurns = ROAD_TURNS; break;
    case 'railroad':   baseTurns = ROAD_TURNS; break;
    case 'irrigation': baseTurns = IRRIGATION_TURNS[terrain] || 5; break;
    case 'mine':       baseTurns = MINING_TURNS[terrain] || 5; break;
    case 'fortress':   baseTurns = FORTRESS_TURNS; break;
    case 'airbase':    baseTurns = AIRBASE_TURNS; break;
    case 'pollution':  baseTurns = POLLUTION_TURNS; break;
    default:           baseTurns = 999;
  }

  // River penalty: building railroad on a river tile costs +1 turn
  if (order === 'railroad' && opts?.hasRiver) {
    baseTurns += 1;
  }

  // Engineer double-speed: halve turns (minimum 1)
  if (isEngineer) baseTurns = Math.max(1, Math.ceil(baseTurns / 2));

  // Settler cooperation: multiple workers on same tile pool their work
  // Each additional worker contributes 1 extra work-turn per turn, so
  // effective turns = ceil(baseTurns / coopCount)
  const coopCount = opts?.coopCount || 1;
  if (coopCount > 1) {
    baseTurns = Math.max(1, Math.ceil(baseTurns / coopCount));
  }

  return baseTurns;
}

/**
 * Count how many settlers/engineers are working the same order on the same tile.
 * Used for settler cooperation (pooling work).
 *
 * @param {object} state - game state
 * @param {number} gx - tile gx
 * @param {number} gy - tile gy
 * @param {string} order - worker order type
 * @param {number} owner - civ slot (only count same-civ workers)
 * @returns {number} count of cooperating workers (min 1)
 */
export function countCooperatingWorkers(state, gx, gy, order, owner) {
  let count = 0;
  for (const u of state.units) {
    if (u.gx !== gx || u.gy !== gy || u.gx < 0) continue;
    if (u.owner !== owner) continue;
    // Only settlers (type 0) and engineers (type 1) do worker orders
    if (u.type !== 0 && u.type !== 1) continue;
    if (u.orders === order) count++;
  }
  return Math.max(1, count);
}

/**
 * Score a tile using the authoritative yield calculation from production.js.
 * Accounts for terrain, resources, improvements, government penalties, rivers, etc.
 * Returns a weighted score: food * 3 + shields * 2 + trade * 1.
 */
export function scoreTileYields(gx, gy, isCenter, city, cityIndex, gameState, mapBase) {
  const [food, shields, trade] = getTileYields(gx, gy, isCenter, city, cityIndex, gameState, mapBase);
  return food * 3 + shields * 2 + trade;
}

/**
 * Resolve city radius tile index (0-19) to map coordinates.
 * Returns { gx, gy } or null if off-map.
 */
export function radiusTileCoords(cityGx, cityGy, i, mapBase) {
  const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
  const parC = cityGy & 1;
  const parT = ((cityGy + ddy) % 2 + 2) % 2;
  const tgx = cityGx + ((parC + ddx - parT) >> 1);
  const tgy = cityGy + ddy;
  const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
  if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) return null;
  return { gx: wgx, gy: tgy };
}

/**
 * Auto-assign one more worker to the best available tile.
 * Uses full yield calculation (resources, improvements, government, rivers).
 * Returns new workedTiles array (or same reference if no tile available).
 */
export function autoAssignWorker(city, cityIndex, workedTiles, gameState, mapBase) {
  const worked = new Set(workedTiles);
  let bestIdx = -1, bestScore = -1;
  for (let i = 0; i < 20; i++) {
    if (worked.has(i)) continue;
    const pos = radiusTileCoords(city.gx, city.gy, i, mapBase);
    if (!pos) continue;
    const ter = mapBase.getTerrain(pos.gx, pos.gy);
    if (ter < 0 || ter > 10) continue;
    const score = scoreTileYields(pos.gx, pos.gy, false, city, cityIndex, gameState, mapBase);
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  }
  if (bestIdx < 0) return workedTiles;
  return [...workedTiles, bestIdx];
}

/**
 * Remove the worst worker (lowest yield tile). Returns new workedTiles array.
 */
export function removeWorstWorker(city, cityIndex, workedTiles, gameState, mapBase) {
  if (workedTiles.length === 0) return workedTiles;
  let worstIdx = 0, worstScore = Infinity;
  for (let w = 0; w < workedTiles.length; w++) {
    const i = workedTiles[w];
    const pos = radiusTileCoords(city.gx, city.gy, i, mapBase);
    if (!pos) { worstIdx = w; break; } // off-map tile is definitely worst
    const ter = mapBase.getTerrain(pos.gx, pos.gy);
    if (ter < 0 || ter > 10) { worstIdx = w; break; }
    const score = scoreTileYields(pos.gx, pos.gy, false, city, cityIndex, gameState, mapBase);
    if (score < worstScore) { worstScore = score; worstIdx = w; }
  }
  const result = [...workedTiles];
  result.splice(worstIdx, 1);
  return result;
}

export function getCityName(owner, cities, civs) {
  if (owner === 0) {
    return BARBARIAN_CITY_NAMES[0];
  }
  const rulesNum = civs?.[owner]?.rulesCivNumber ?? 0;
  const nameList = CIV_CITY_NAMES[rulesNum] || CIV_CITY_NAMES[0];
  const ownedNames = new Set(cities.filter(c => c.owner === owner).map(c => c.name));
  for (const name of nameList) {
    if (!ownedNames.has(name)) return name;
  }
  return `City ${cities.filter(c => c.owner === owner).length + 1}`;
}

/**
 * Assign initial workers for a new city using multi-phase algorithm.
 * Binary-faithful: honor existing assignments, food-priority first, then surplus optimization.
 *
 * Phase 1: Honor existing tile assignments (from workedTiles if provided)
 * Phase 2: Food-priority pass — assign tiles that produce food first
 * Phase 3: Surplus optimization — fill remaining slots with best overall yield
 *
 * Evaluates all 20 radius tiles (not 20=center, always worked).
 * Uses full yield calculation (resources, improvements, government, rivers).
 * Returns workedTiles: number[] (tile indices 0-19).
 */
export function assignInitialWorkers(gx, gy, size, city, cityIndex, gameState, mapBase) {
  // Gather all valid tiles with yields
  const tileInfo = [];
  for (let i = 0; i < 20; i++) {
    const pos = radiusTileCoords(gx, gy, i, mapBase);
    if (!pos) continue;
    const ter = mapBase.getTerrain(pos.gx, pos.gy);
    if (ter < 0 || ter > 10) continue;
    const [food, shields, trade] = getTileYields(pos.gx, pos.gy, false, city, cityIndex, gameState, mapBase);
    const score = food * 3 + shields * 2 + trade;
    tileInfo.push({ i, food, shields, trade, score });
  }

  const toPlace = Math.min(size, tileInfo.length);
  if (toPlace === 0) return [];

  const assigned = new Set();
  const result = [];

  // Phase 1: Honor existing assignments (if city already had workedTiles)
  if (city.workedTiles && city.workedTiles.length > 0) {
    for (const idx of city.workedTiles) {
      if (result.length >= toPlace) break;
      if (tileInfo.some(t => t.i === idx) && !assigned.has(idx)) {
        assigned.add(idx);
        result.push(idx);
      }
    }
  }

  // Phase 2: Food-priority — assign tiles that produce food, sorted by food then overall score
  const foodTiles = tileInfo.filter(t => t.food > 0 && !assigned.has(t.i));
  foodTiles.sort((a, b) => b.food - a.food || b.score - a.score);
  for (const t of foodTiles) {
    if (result.length >= toPlace) break;
    assigned.add(t.i);
    result.push(t.i);
  }

  // Phase 3: Surplus optimization — fill remaining with best overall yield
  const remaining = tileInfo.filter(t => !assigned.has(t.i));
  remaining.sort((a, b) => b.score - a.score);
  for (const t of remaining) {
    if (result.length >= toPlace) break;
    assigned.add(t.i);
    result.push(t.i);
  }

  return result;
}

// ── Contact discovery ──
// When a unit moves (or a city is built), check if any other civ's
// units or cities are now within this civ's LOS. If so, establish
// first contact (ceasefire) between the two civs. This prevents the
// AI from proposing diplomacy to civs that haven't been encountered.

/**
 * Check for and establish contact between civSlot and any other civ
 * whose units or cities are visible on tiles within radius of (gx, gy).
 * Uses the visibility bits already set by updateVisibility().
 *
 * @param {object} state - mutable game state (treaties will be updated)
 * @param {object} mapBase - immutable map data
 * @param {number} civSlot - the civ whose unit/city just moved/was built
 * @param {number} gx - center tile gx
 * @param {number} gy - center tile gy
 * @param {number} [radius=1] - visibility radius (1=unit, 2=city)
 */
export function discoverContacts(state, mapBase, civSlot, gx, gy, radius) {
  if (civSlot === 0) return; // barbarians don't do diplomacy

  const { mw, mh, wraps } = mapBase;
  const fowBit = 1 << civSlot;

  // Collect tile indices in the visibility radius using doubled-X coordinates
  // (same offsets as visibility.js RADIUS_1 / RADIUS_2)
  const RADIUS_1_OFFSETS = [
    [0,0], [-1,-1], [1,-1], [1,1], [-1,1], [0,-2], [0,2], [2,0], [-2,0]
  ];
  const RADIUS_2_EXTRA = [
    [-1,-3], [1,-3], [-2,-2], [2,-2], [-3,-1], [3,-1],
    [-3,1], [3,1], [-2,2], [2,2], [-1,3], [1,3]
  ];
  const offsets = radius === 2
    ? [...RADIUS_1_OFFSETS, ...RADIUS_2_EXTRA]
    : RADIUS_1_OFFSETS;

  const mw2 = mw * 2;
  const dx = gx * 2 + (gy % 2);

  // Collect visible tile indices
  const visibleTiles = new Set();
  for (const [odx, ody] of offsets) {
    let ndx = dx + odx;
    const ndy = gy + ody;
    if (ndy < 0 || ndy >= mh) continue;
    if (wraps) {
      ndx = ((ndx % mw2) + mw2) % mw2;
    } else if (ndx < 0 || ndx >= mw2) {
      continue;
    }
    visibleTiles.add(ndy * mw + (ndx >> 1));
  }

  // Check all alive civs for units/cities on those tiles
  const newContacts = new Set();

  for (const u of state.units) {
    if (!u || u.gx < 0 || u.owner === civSlot || u.owner === 0) continue;
    if (!(state.civsAlive & (1 << u.owner))) continue;
    const idx = u.gy * mw + u.gx;
    if (visibleTiles.has(idx)) {
      newContacts.add(u.owner);
    }
  }

  for (const c of state.cities) {
    if (!c || c.size <= 0 || c.owner === civSlot || c.owner === 0) continue;
    if (!(state.civsAlive & (1 << c.owner))) continue;
    const cgx = c.gx != null ? c.gx : c.cx;
    const cgy = c.gy != null ? c.gy : c.cy;
    const idx = cgy * mw + cgx;
    if (visibleTiles.has(idx)) {
      newContacts.add(c.owner);
    }
  }

  // Establish first contact (ceasefire) for each newly discovered civ
  for (const otherCiv of newContacts) {
    if (!state.treaties) state.treaties = {};
    const key = civSlot < otherCiv
      ? `${civSlot}-${otherCiv}` : `${otherCiv}-${civSlot}`;
    if (state.treaties[key] === undefined) {
      // First contact: establish ceasefire (matching Civ2 FUN_0055d8d8 behavior)
      state.treaties = { ...state.treaties, [key]: 'ceasefire' };
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'firstContact', civA: civSlot, civB: otherCiv,
      });
    }
  }
}

/**
 * Make a new unit object at the given position.
 * Gap 74: Checks unit caps before creating — returns null if total units >= 2048
 * or per-civ units >= 1948. Callers should check for null return.
 *
 * @param {number} type - unit type id
 * @param {number} owner - civ slot
 * @param {number} gx - map grid x
 * @param {number} gy - map grid y
 * @param {number} [movesLeft] - initial movement points
 * @param {object} [state] - game state (for unit cap checks; if omitted, no cap check)
 * @returns {object|null} unit object, or null if cap exceeded
 */
export function makeUnit(type, owner, gx, gy, movesLeft, state) {
  // Gap 74: Unit cap enforcement (binary: 2048 max total, 1948 per civ)
  if (state && state.units) {
    let totalAlive = 0;
    let civAlive = 0;
    for (const u of state.units) {
      if (u.gx >= 0) {
        totalAlive++;
        if (u.owner === owner) civAlive++;
      }
    }
    if (totalAlive >= UNIT_LIMITS.MAX_UNIT_SLOTS || civAlive >= UNIT_LIMITS.AI_PER_CIV_CAP) {
      return null;
    }
  }
  // C.3: Initialize fuel for air units based on UNIT_FUEL table
  const maxFuel = UNIT_FUEL[type];
  return {
    type, owner, gx, gy,
    x: gx * 2 + (gy % 2), y: gy,
    veteran: 0, movesRemain: 0, orders: 'none',
    movesMade: 0, movesLeft: movesLeft ?? 0,
    homeCityId: 0xFFFF,
    goToX: -1, goToY: -1, hpLost: 0xFF,
    commodityCarried: -1, workTurns: 0,
    fuelRemaining: maxFuel > 0 ? maxFuel : -1,
    prevInStack: -1, nextInStack: -1,
  };
}

/** Mark a unit dead (gx=-1). */
export function killUnit(state, idx) {
  const u = state.units[idx];
  if (u.gx < 0) return;
  state.units[idx] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
}

/** Check if a civ has no cities and no alive units → eliminate. */
export function checkCivElimination(state, civSlot) {
  if (civSlot <= 0 || !(state.civsAlive & (1 << civSlot))) return;
  const hasUnit = state.units.some(u => u.owner === civSlot && u.gx >= 0);
  const hasCity = state.cities.some(c => c.owner === civSlot && c.size > 0);
  if (!hasUnit && !hasCity) {
    state.civsAlive &= ~(1 << civSlot);
    console.log(`[elim] Civ ${civSlot} eliminated. civsAlive=${state.civsAlive.toString(2)}, alive count=${[1,2,3,4,5,6,7].filter(c => state.civsAlive & (1 << c)).length}`);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'civEliminated', civSlot });
    // Check if only one non-barbarian civ remains → game over
    checkGameOver(state);
  }
}

/**
 * Check if the game is over: only one non-barbarian civ (bits 1-7) remains alive.
 * Sets state.gameOver = { winner: lastAliveCiv } if so.
 */
export function checkGameOver(state) {
  if (state.gameOver) return; // already set
  let aliveCount = 0;
  let lastAlive = -1;
  for (let c = 1; c <= 7; c++) {
    if (state.civsAlive & (1 << c)) {
      aliveCount++;
      lastAlive = c;
    }
  }
  if (aliveCount === 1 && lastAlive > 0) {
    console.log(`[gameOver] Only 1 civ alive (civ ${lastAlive}), game over. civsAlive=${state.civsAlive.toString(2)}`);
    state.gameOver = { winner: lastAlive, reason: 'conquest' };
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'gameOver', winner: lastAlive, reason: 'conquest' });
  } else {
    console.log(`[gameOver] ${aliveCount} civs still alive, game continues. civsAlive=${state.civsAlive.toString(2)}`);
  }
}

/** Rehome units whose home city was destroyed. Assign to nearest own city or 0xFFFF. */
export function rehomeUnits(state, destroyedCityIdx, owner) {
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.homeCityId === destroyedCityIdx && u.owner === owner && u.gx >= 0) {
      let bestCi = -1, bestDist = Infinity;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (c.owner === owner && c.size > 0 && ci !== destroyedCityIdx) {
          const dx = Math.abs(u.gx - c.gx), dy = Math.abs(u.gy - c.gy);
          const d = dx + dy;
          if (d < bestDist) { bestDist = d; bestCi = ci; }
        }
      }
      state.units[i] = { ...u, homeCityId: bestCi >= 0 ? bestCi : 0xFFFF };
    }
  }
}

/**
 * Clean up trade route references from ALL other cities when a city is deleted.
 * Removes any trade route whose destCityIndex points to the deleted city.
 * This must be called whenever a city is destroyed/razed to prevent stale references.
 *
 * @param {object} state - mutable game state (state.cities will be mutated)
 * @param {number} deletedCityIndex - index of the city being deleted
 */
export function cleanupTradeRoutes(state, deletedCityIndex) {
  for (let ci = 0; ci < state.cities.length; ci++) {
    if (ci === deletedCityIndex) continue;
    const c = state.cities[ci];
    if (!c.tradeRoutes || c.tradeRoutes.length === 0) continue;
    const filtered = c.tradeRoutes.filter(r => r.destCityIndex !== deletedCityIndex);
    if (filtered.length !== c.tradeRoutes.length) {
      state.cities[ci] = { ...c, tradeRoutes: filtered };
    }
  }
}

/**
 * Comprehensive city capture: delegates to handleCityCapture from citycapture.js.
 * This wrapper maintains the same call signature used throughout the reducer.
 *
 * @param {object} state - mutable game state
 * @param {object} prev - previous (immutable) state reference for clone guards
 * @param {object} mapBase - immutable map data + accessors
 * @param {number} cityIndex - index into state.cities
 * @param {number} newOwner - civ slot of the conqueror (0 for barbarians)
 * @param {number} oldOwner - civ slot of the previous owner
 * @param {object} [opts] - optional overrides
 * @param {boolean} [opts.skipBuildingDestruction] - skip random building destruction (e.g. incite revolt)
 */
export function captureCity(state, prev, mapBase, cityIndex, newOwner, oldOwner, opts = {}) {
  // Ensure cities array is a mutable clone
  state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];

  const cityName = state.cities[cityIndex]?.name;

  const result = handleCityCapture(state, mapBase, cityIndex, newOwner, oldOwner, {
    skipBuildingDestruction: opts.skipBuildingDestruction,
    captureType: opts.skipBuildingDestruction ? 1 : 0,
  });

  // Push capture events into turnEvents
  if (result.events && result.events.length > 0) {
    if (!state.turnEvents) state.turnEvents = [];
    for (const evt of result.events) {
      state.turnEvents.push(evt);
    }
  }

  // Dispatch scenario events for city taken
  if (state.scenarioEvents && state.scenarioEvents.length > 0 && cityName) {
    dispatchEvents(state, mapBase, EVENT_CITY_TAKEN, {
      cityName, attacker: newOwner, defender: oldOwner,
    });
  }
}

export function findFirstAliveCiv(civsAlive) {
  for (let i = 1; i < 8; i++) {
    if (civsAlive & (1 << i)) return i;
  }
  return 1;
}

/**
 * Check if the senate blocks a war declaration.
 * Ported from FUN_00579ed0 (diplomacy_check_attack_allowed).
 *
 * Under Republic/Democracy the senate can refuse war. Exceptions:
 *   - Statue of Liberty (wonder 19): bypasses senate entirely
 *   - Enemy units on attacker's territory: war is allowed
 *   - Already at war: no check needed
 *
 * Republic: 50% chance senate blocks.
 * Democracy: senate always blocks.
 *
 * @param {object} state - game state
 * @param {object} mapBase - map accessor
 * @param {number} attackerCiv - civ declaring war
 * @param {number} defenderCiv - target civ
 * @returns {{ blocked: boolean, events: object[] }}
 */
export function checkSenateVeto(state, mapBase, attackerCiv, defenderCiv) {
  const events = [];
  const govt = getGovernment(null, state, attackerCiv);

  // Only Republic and Democracy have a senate
  if (govt !== 'republic' && govt !== 'democracy') {
    return { blocked: false, events };
  }

  // Statue of Liberty (wonder 19) bypasses senate
  if (hasWonderEffect(state, attackerCiv, 19)) {
    return { blocked: false, events };
  }

  // If already at war, no senate check
  if (state.treaties) {
    const key = attackerCiv < defenderCiv
      ? `${attackerCiv}-${defenderCiv}` : `${defenderCiv}-${attackerCiv}`;
    if (state.treaties[key] === 'war') {
      return { blocked: false, events };
    }
  }

  // If enemy units are on attacker's territory, senate allows war
  const hasTileOwnership = mapBase.getTileOwnership != null;
  if (hasTileOwnership) {
    for (const u of state.units) {
      if (u.owner === defenderCiv && u.gx >= 0) {
        const owner = mapBase.getTileOwnership(u.gx, u.gy);
        if (owner === attackerCiv) {
          return { blocked: false, events };
        }
      }
    }
  }

  // Senate veto check
  let blocked = false;
  if (govt === 'democracy') {
    // Democracy: senate always blocks
    blocked = true;
  } else {
    // Republic: 50% chance senate blocks
    const roll = state.rng ? state.rng.random() : Math.random();
    blocked = roll < 0.5;
  }

  if (blocked) {
    events.push({
      type: 'senateVeto',
      civSlot: attackerCiv,
      targetCiv: defenderCiv,
      government: govt,
      message: `The Senate refuses to declare war!`,
    });
  }

  return { blocked, events };
}
