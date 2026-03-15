// ═══════════════════════════════════════════════════════════════════
// reducer.js — Authoritative state transitions (shared: server + client)
//
// The ONLY code that mutates game state. The server calls
// applyAction(gameState, mapBase, action) for every validated action.
// Returns a new state object if valid, or the same reference if rejected.
//
// Never mutates the input state directly — clones first.
// ═══════════════════════════════════════════════════════════════════

import { validateAction, calcBribeCost, calcInciteCost } from './rules.js';
import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, CHANGE_RATES, SET_RESEARCH, UNIT_ORDER, WORKER_ORDER, REVOLUTION, PILLAGE, DESTROY_CITY, PROPOSE_TREATY, RESPOND_TREATY, DECLARE_WAR, ESTABLISH_TRADE, RENAME_CITY, BRIBE_UNIT, STEAL_TECH, SABOTAGE_CITY, INCITE_REVOLT, DEMAND_TRIBUTE, RESPOND_DEMAND, SHARE_MAP, BOMBARD, REBASE, GOTO, TRANSFORM_TERRAIN, NUKE, PARADROP, AIRLIFT, UPGRADE_UNIT, ADJUST_ATTITUDE, SPY_POISON_WATER, SPY_PLANT_NUKE, SPY_SABOTAGE_PRODUCTION, SPY_INVESTIGATE_CITY, SPY_ESTABLISH_EMBASSY, SPY_SABOTAGE_UNIT } from './actions.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, UNIT_COSTS, UNIT_CARRY_CAP, UNIT_FUEL, CITY_RADIUS_DOUBLED, CIV_CITY_NAMES, BARBARIAN_CITY_NAMES, IMPROVE_COSTS, IMPROVE_MAINTENANCE, SHIELD_BOX_FACTOR, ADVANCE_NAMES, UNIT_NAMES, UNIT_PREREQS, UNIT_OBSOLETE, IRRIGATION_TURNS, MINING_TURNS, ROAD_TURNS, FORTRESS_TURNS, AIRBASE_TURNS, POLLUTION_TURNS, CAN_IRRIGATE, IRR_TRANSFORM, CAN_MINE, MINE_TRANSFORM, SUPPORT_EXEMPT_TYPES, UNIT_DEF, UNIT_ATK, UNIT_DESTROYED_AFTER_ATTACK, TERRAIN_DEFENSE, TERRAIN_TRANSFORM, TRANSFORM_TURNS, POLLUTION_THRESHOLD, UNIT_UPGRADE_TO, BARBARIAN_LAND_UNITS, BARBARIAN_SEA_UNITS, BARBARIAN_SPAWN_FREQUENCY, BARBARIAN_MAX_UNITS, BARBARIAN_MIN_TURN } from './defs.js';
import { calcResearchCost, grantAdvance, getAvailableResearch, handleTechDiscovery, upgradeUnitsForTech } from './research.js';
import { checkGameEndConditions } from './spaceship.js';
import { resolveDirection, moveCost } from './movement.js';
import { findPath } from './pathfinding.js';
import { updateVisibility } from './visibility.js';
import { calcShieldProduction, getProductionCost, calcCityTrade, getTileYields } from './production.js';
import { calcRushBuyCost } from './happiness.js';
import { resolveCombat, calcStackBestDefender } from './combat.js';
import { cityHasBuilding, hasWonderEffect } from './utils.js';
import { processCityTurn } from './cityturn.js';
import { handleCityCapture, handleCivilWar } from './citycapture.js';
import { declareWar as diplomacyDeclareWar, signCeasefire, signPeaceTreaty, formAlliance } from './diplomacy.js';
import { checkSpySurvival, spyCaughtCheck, handleEspionageIncident, calcBribeCostEnhanced, calcInciteCostEnhanced } from './espionage.js';
import { dispatchEvents, EVENT_TURN, EVENT_CITY_TAKEN, EVENT_UNIT_KILLED, EVENT_RECEIVED_TECH, EVENT_TURN_INTERVAL, EVENT_RANDOM_TURN } from './events.js';

/**
 * Apply completed worker improvement to the map tile data.
 * Mutates tileData[idx].improvements in place (authoritative source).
 */
function completeWorkerOrder(order, gx, gy, terrain, mapBase) {
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
        imp.irrigation = true;
      } else if (IRR_TRANSFORM[terrain] >= 0) {
        tile.terrain = IRR_TRANSFORM[terrain];
      }
      break;
    case 'mine':
      if (CAN_MINE[terrain]) {
        imp.mining = true;
      } else if (MINE_TRANSFORM[terrain] >= 0) {
        tile.terrain = MINE_TRANSFORM[terrain];
      }
      break;
    case 'fortress':  imp.fortress = true; break;
    case 'airbase':   imp.airbase = true; break;
    case 'pollution': imp.pollution = false; break;
  }

  // Farmland: irrigation + mining both set
  if (imp.irrigation && imp.mining) imp.farmland = true;

  tile.improvements = imp;
}

/**
 * Score a tile using the authoritative yield calculation from production.js.
 * Accounts for terrain, resources, improvements, government penalties, rivers, etc.
 * Returns a weighted score: food * 3 + shields * 2 + trade * 1.
 */
function scoreTileYields(gx, gy, isCenter, city, cityIndex, gameState, mapBase) {
  const [food, shields, trade] = getTileYields(gx, gy, isCenter, city, cityIndex, gameState, mapBase);
  return food * 3 + shields * 2 + trade;
}

/**
 * Resolve city radius tile index (0-19) to map coordinates.
 * Returns { gx, gy } or null if off-map.
 */
function radiusTileCoords(cityGx, cityGy, i, mapBase) {
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
function autoAssignWorker(city, cityIndex, workedTiles, gameState, mapBase) {
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
function removeWorstWorker(city, cityIndex, workedTiles, gameState, mapBase) {
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

function getCityName(owner, cities, civs) {
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
 * Assign initial workers for a new city. Evaluates all 20 radius tiles
 * (not 20=center, always worked) and picks the best N tiles.
 * Uses full yield calculation (resources, improvements, government, rivers).
 * Returns workedTiles: number[] (tile indices 0-19).
 */
function assignInitialWorkers(gx, gy, size, city, cityIndex, gameState, mapBase) {
  const scores = [];
  for (let i = 0; i < 20; i++) {
    const pos = radiusTileCoords(gx, gy, i, mapBase);
    if (!pos) continue;
    const ter = mapBase.getTerrain(pos.gx, pos.gy);
    if (ter < 0 || ter > 10) continue;
    const score = scoreTileYields(pos.gx, pos.gy, false, city, cityIndex, gameState, mapBase);
    scores.push({ i, score });
  }
  scores.sort((a, b) => b.score - a.score);

  const toPlace = Math.min(size, scores.length);
  return scores.slice(0, toPlace).map(s => s.i);
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
function discoverContacts(state, mapBase, civSlot, gx, gy, radius) {
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

// ── Goody hut (tribal village) outcomes ──
// Faithful to decompiled FUN_0058f040 (process_goody_hut)

/** Check if ANY civ in the game has discovered a tech. */
function anyoneHasTech(state, techId) {
  if (techId < 0) return true;
  if (!state.civTechs) return false;
  for (let c = 1; c < 8; c++) {
    if (!(state.civsAlive & (1 << c))) continue;
    if (state.civTechs[c]?.has(techId)) return true;
  }
  return false;
}

/**
 * Pick mercenary unit type per Civ2 algorithm.
 * Two classes (50/50 coin flip): 2-move cavalry line, 1-move infantry line.
 * Tech checks use ANY civ's discoveries, not just the triggering civ.
 */
function getHutMercType(state) {
  if (Math.random() < 0.5) {
    // 2-move class: Horsemen→Elephant→Knights→Crusaders→Dragoons→Riflemen
    if (anyoneHasTech(state, 17)) return 11; // Conscription → Riflemen
    if (anyoneHasTech(state, 42)) return 20; // Leadership → Dragoons
    if (anyoneHasTech(state, 55)) return 18; // Monotheism → Crusaders
    if (anyoneHasTech(state, 11)) return 19; // Chivalry → Knights
    if (anyoneHasTech(state, 64) && Math.random() < 0.5) return 17; // Polytheism → 50% Elephant
    return Math.random() < 0.67 ? 15 : 16; // 2/3 Horsemen, 1/3 Chariot
  } else {
    // 1-move class: Archers→Legion→Musketeers→Fanatics
    if (anyoneHasTech(state, 34)) return 8;  // Guerrilla Warfare → Fanatics
    if (anyoneHasTech(state, 35)) return 7;  // Gunpowder → Musketeers
    if (anyoneHasTech(state, 39)) return 5;  // Iron Working → Legion
    return 4; // Archers
  }
}

/** Pick barbarian unit type based on max tech count across alive civs. */
function getBarbUnitType(state) {
  let maxTechCount = 0;
  for (let c = 1; c < 8; c++) {
    if (!(state.civsAlive & (1 << c))) continue;
    const tc = state.civTechCounts?.[c] || 0;
    if (tc > maxTechCount) maxTechCount = tc;
  }
  // Walk BARBARIAN_LAND_UNITS backwards to pick highest qualifying type
  for (let i = BARBARIAN_LAND_UNITS.length - 1; i >= 0; i--) {
    if (maxTechCount >= BARBARIAN_LAND_UNITS[i][1]) return BARBARIAN_LAND_UNITS[i][0];
  }
  return BARBARIAN_LAND_UNITS[0][0]; // fallback: Warriors
}

/** Pick barbarian sea unit type based on max tech count across alive civs. */
function getBarbSeaUnitType(state) {
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

/** Make a new unit object at the given position. */
function makeUnit(type, owner, gx, gy, movesLeft) {
  return {
    type, owner, gx, gy,
    x: gx * 2 + (gy % 2), y: gy,
    veteran: 0, hpLost: 0, orders: 'none',
    movesMade: 0, movesLeft: movesLeft ?? 0,
    homeCityId: 0xFFFF,
    goToX: -1, goToY: -1, visFlag: 0xFF,
    commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
    prevInStack: -1, nextInStack: -1,
  };
}

/**
 * Resolve a goody hut encounter. Faithful to Civ2 decompiled logic.
 * Roll rand()%5 → 0:tribe/nomads, 1:mercs, 2:gold, 3:barbarians, 4:scrolls.
 * Suppression rules redirect outcomes when conditions aren't met.
 */
function resolveGoodyHut(state, mapBase, unit, civSlot) {
  const turnNum = state.turn?.number || 0;
  const hasCities = state.cities.some(c => c.owner === civSlot && c.size > 0);
  const earlyNoCities = !hasCities && turnNum < 50;

  // Roll outcome (Civ2: rand()%5 → equal 20% each)
  let outcome = Math.floor(Math.random() * 5); // 0-4

  // Suppression rules
  // Tribe (0): needs epoch ≥ 4 (approx turn 100+); redirect to mercs
  if (outcome === 0 && turnNum < 100) outcome = 1;
  // Barbarians (3): suppressed early game with no cities; redirect to mercs
  if (outcome === 3 && earlyNoCities) outcome = 1;
  // Scrolls (4): suppressed once any civ discovers Invention (38); redirect to gold
  if (outcome === 4 && anyoneHasTech(state, 38)) outcome = 2;

  // Non-combat units never trigger barbarians
  const NONCOMBAT = new Set([0, 1, 46, 47, 48, 49, 50]);
  if (outcome === 3 && NONCOMBAT.has(unit.type)) outcome = 2;

  switch (outcome) {
    case 2: { // Gold
      // Base 50, 1/3 chance re-roll: low=25, high=100. After turn 250 (≈1000 AD): doubled
      let amount = 50;
      if (Math.random() < 0.33) amount = Math.random() < 0.5 ? 25 : 100;
      if (turnNum > 250) amount *= 2;
      if (state.civs?.[civSlot]) {
        state.civs = state.civs.map((c, i) => i === civSlot ? { ...c, treasury: (c.treasury || 0) + amount } : c);
      }
      return { type: 'gold', amount };
    }

    case 4: { // Scrolls (tech)
      const available = getAvailableResearch(state, civSlot);
      if (available.length === 0) {
        // No tech available — give gold instead
        const amount = turnNum > 250 ? 100 : 50;
        if (state.civs?.[civSlot]) {
          state.civs = state.civs.map((c, i) => i === civSlot ? { ...c, treasury: (c.treasury || 0) + amount } : c);
        }
        return { type: 'gold', amount };
      }
      const techId = available[Math.floor(Math.random() * available.length)];
      grantAdvance(state, civSlot, techId);
      return { type: 'tech', advanceId: techId, advanceName: ADVANCE_NAMES[techId] };
    }

    case 1: { // Mercenaries
      const unitType = getHutMercType(state);
      const mercMoves = (UNIT_MOVE_POINTS[unitType] || 1) * MOVEMENT_MULTIPLIER;
      state.units = [...state.units, makeUnit(unitType, civSlot, unit.gx, unit.gy, mercMoves)];
      const mercIdx = state.units.length - 1;
      return { type: 'unit', unitType, unitName: UNIT_NAMES[unitType], mercenaryIndices: [mercIdx] };
    }

    case 0: { // Tribe → nomads (simplified: skip advanced tribe/city founding)
      // Nomads suppressed if any civ has Explosives (28); redirect to gold
      if (anyoneHasTech(state, 28)) {
        const amount = turnNum > 250 ? 100 : 50;
        if (state.civs?.[civSlot]) {
          state.civs = state.civs.map((c, i) => i === civSlot ? { ...c, treasury: (c.treasury || 0) + amount } : c);
        }
        return { type: 'gold', amount };
      }
      const nomadMoves = (UNIT_MOVE_POINTS[0] || 1) * MOVEMENT_MULTIPLIER;
      state.units = [...state.units, makeUnit(0, civSlot, unit.gx, unit.gy, nomadMoves)];
      const nomadIdx = state.units.length - 1;
      return { type: 'nomads', mercenaryIndices: [nomadIdx] };
    }

    case 3: { // Barbarians
      const barbType = getBarbUnitType(state);
      const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const count = 1 + Math.floor(Math.random() * 3);
      let spawned = 0;
      for (let i = dirs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
      }
      for (const dir of dirs) {
        if (spawned >= count) break;
        const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
        if (!dest) continue;
        if (mapBase.getTerrain(dest.gx, dest.gy) === 10) continue;
        if (state.cities.some(c => c.gx === dest.gx && c.gy === dest.gy && c.size > 0)) continue;
        state.units = [...state.units,
          makeUnit(barbType, 0, dest.gx, dest.gy, UNIT_MOVE_POINTS[barbType] * MOVEMENT_MULTIPLIER)];
        spawned++;
      }
      return { type: 'barbarians', count: spawned };
    }

    default:
      return { type: 'nothing' };
  }
}

/**
 * Apply an action to the game state.
 *
 * @param {object} prev - current authoritative game state (never mutated)
 * @param {object} mapBase - immutable map data + accessor functions
 * @param {object} action - { type, ...params }
 * @param {number} civSlot - civ slot of the acting player
 * @returns {object} new state if valid, same reference if rejected
 */
export function applyAction(prev, mapBase, action, civSlot) {
  // Validate
  const error = validateAction(prev, mapBase, action, civSlot);
  if (error) return prev;

  // Clone mutable state (shallow clone units array, deep clone moved unit)
  const state = { ...prev, units: [...prev.units] };

  switch (action.type) {
    case MOVE_UNIT: {
      const { unitIndex, dir } = action;
      const unit = { ...state.units[unitIndex] };
      const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);

      // Check for enemy units at destination
      const enemiesAtDest = [];
      for (let i = 0; i < state.units.length; i++) {
        const u = state.units[i];
        if (u.gx === dest.gx && u.gy === dest.gy && u.owner !== unit.owner && u.gx >= 0) {
          enemiesAtDest.push(i);
        }
      }

      if (enemiesAtDest.length > 0) {
        // ── Combat ──
        // Establish contact if this is the first encounter, then auto-declare war
        const defCivSlot = state.units[enemiesAtDest[0]].owner;
        if (!state.treaties) state.treaties = {};
        const warKey = civSlot < defCivSlot ? `${civSlot}-${defCivSlot}` : `${defCivSlot}-${civSlot}`;
        if (state.treaties[warKey] === undefined) {
          // First contact via combat — establish contact then immediately go to war
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({ type: 'firstContact', civA: civSlot, civB: defCivSlot });
        }
        if (state.treaties[warKey] !== 'war') {
          // Declare war via diplomacy module (handles reputation, alliances, trade routes)
          const combatWarResult = diplomacyDeclareWar(state, mapBase, civSlot, defCivSlot);
          if (!state.turnEvents) state.turnEvents = [];
          for (const evt of combatWarResult.events) {
            state.turnEvents.push(evt);
          }
        }

        // Find best defender using calcStackBestDefender (FUN_0057e6e2)
        const defTerrain = mapBase.getTerrain(dest.gx, dest.gy);
        const defCity = state.cities.find(c => c.gx === dest.gx && c.gy === dest.gy && c.owner !== unit.owner);
        const defInCity = !!defCity;
        const defCityHasWalls = defInCity && (cityHasBuilding(defCity, 8) || hasWonderEffect(state, defCivSlot, 6));
        const defImp = mapBase.getImprovements(dest.gx, dest.gy);
        const defHasFortress = !!(defImp && defImp.fortress);
        const defOnRiver = !!(mapBase.hasRiver && mapBase.hasRiver(dest.gx, dest.gy));
        const defCityBuildings = defCity ? defCity.buildings : null;

        // Use calcStackBestDefender for best defender selection
        let bestDefIdx = calcStackBestDefender(dest.gx, dest.gy, unit.type, state, mapBase);
        if (bestDefIdx < 0) bestDefIdx = enemiesAtDest[0]; // fallback

        const defender = { ...state.units[bestDefIdx] };
        // Capture pre-combat veteran status for combat log
        const attacker_preCombat_veteran = unit.veteran;
        const defender_preCombat_veteran = defender.veteran;

        // Detect amphibious attack: attacker is a land unit on an ocean tile (carried by ship)
        const atkDomainCheck = UNIT_DOMAIN[unit.type] ?? 0;
        const atkTerrain = mapBase.getTerrain(unit.gx, unit.gy);
        const isAmphibious = atkDomainCheck === 0 && atkTerrain === 10; // land unit on ocean = on a ship

        // Check if defender's civ has Great Wall wonder (separate from city walls effect)
        const defenderHasGreatWall = defInCity && hasWonderEffect(state, defCivSlot, 6);

        // Detect treaty violation: attacking a civ you had peace/ceasefire with
        let isTreatyViolation = false;
        if (state.treaties) {
          const prevTreaty = prev.treaties?.[warKey];
          if (prevTreaty && prevTreaty !== 'war' && prevTreaty !== undefined) {
            isTreatyViolation = true;
          }
        }

        // Build entropy seed from positions, turn, unit indices, and state version
        // so that repeated same-type combats produce different outcomes
        const turnNum_ = state.turn?.number || 0;
        const combatSeed = (unit.gx * 997 + unit.gy * 991 + dest.gx * 983 + dest.gy * 977 +
          unitIndex * 967 + bestDefIdx * 953 + turnNum_ * 941 + (state.version || 0) * 929);
        const combatOpts = {
          amphibious: isAmphibious,
          defenderHasGreatWall,
          treatyViolation: isTreatyViolation,
        };
        const result = resolveCombat(unit, defender, defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver, defCityBuildings, combatSeed, state.difficulty || 'chieftain', unit.movesLeft, combatOpts);

        const defOwner = defender.owner;

        // ── Treaty violation: set sneak attack flag ──
        if (isTreatyViolation) {
          if (!state.diplomacy) state.diplomacy = {};
          const dKey = `${civSlot}-${defCivSlot}`;
          state.diplomacy = { ...state.diplomacy, [dKey]: { ...(state.diplomacy[dKey] || {}), sneak: true, sneakTurn: turnNum_ } };
        }

        // ── Submarine retreat handling ──
        if (result.submarineRetreated) {
          // Submarine retreats with damage — neither side destroyed
          unit.hpLost = result.atkHpLost;
          unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
          if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
          state.units[bestDefIdx] = { ...defender, hpLost: result.defHpLost };
          state.units[unitIndex] = unit;
          state.combatResult = {
            type: 'subRetreat',
            attacker: unit.type, defender: defender.type,
            atkOwner: unit.owner, defOwner: defender.owner,
            gx: dest.gx, gy: dest.gy,
            atkHpLost: result.atkHpLost, defHpLost: result.defHpLost,
            rounds: result.rounds,
            atkMaxHp: result.atkMaxHp, defMaxHp: result.defMaxHp,
            atkFp: result.atkFp, defFp: result.defFp,
            atkStartHp: result.atkStartHp, defStartHp: result.defStartHp,
          };
          break;
        }

        if (result.attackerWins) {
          // Defender destroyed
          killUnit(state, bestDefIdx);

          // Scenario events: unit killed
          if (state.scenarioEvents && state.scenarioEvents.length > 0) {
            dispatchEvents(state, mapBase, EVENT_UNIT_KILLED, {
              unitType: defender.type, attacker: unit.owner, defender: defender.owner,
            });
          }

          // Gold reward for killing barbarian units (B.2: difficulty × 50)
          if (defender.owner === 0 && civSlot > 0) {
            const killGold = result.barbarianGold || 0;
            if (killGold > 0) {
              state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
              const killerCiv = { ...state.civs[civSlot] };
              killerCiv.treasury = (killerCiv.treasury || 0) + killGold;
              state.civs[civSlot] = killerCiv;
              if (!state.turnEvents) state.turnEvents = [];
              state.turnEvents.push({
                type: 'barbarianGold',
                civSlot, gold: killGold,
              });
            }
          }

          // Veteran promotion for attacker
          if (result.atkVeteranPromo) unit.veteran = 1;
          unit.hpLost = result.atkHpLost;

          // Stack wipe: on open ground (no city/fortress), kill ALL enemies
          const hasProtection = defInCity || defHasFortress;
          if (!hasProtection) {
            for (let i = 0; i < state.units.length; i++) {
              if (i !== bestDefIdx && state.units[i].gx === dest.gx &&
                  state.units[i].gy === dest.gy && state.units[i].owner !== unit.owner &&
                  state.units[i].gx >= 0) {
                killUnit(state, i);
              }
            }
          }

          // Attacker enters tile only if no more enemies remain
          const moreEnemies = state.units.some(u =>
            u.gx === dest.gx && u.gy === dest.gy && u.owner !== unit.owner && u.gx >= 0);
          if (!moreEnemies) {
            unit.gx = dest.gx; unit.gy = dest.gy;
            unit.x = dest.gx * 2 + (dest.gy % 2); unit.y = dest.gy;

            // City capture
            if (defCity) {
              state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
              const ci = state.cities.findIndex(c => c === defCity);
              if (ci >= 0) {
                captureCity(state, prev, mapBase, ci, unit.owner, defOwner);
                state.combatResult = { type: 'capture', cityName: defCity.name, civSlot };
              }
            }
          }

          // Combat costs 1 MP (not all movement)
          unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
          if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
        } else {
          // Attacker destroyed
          unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;

          // Veteran promotion for defender
          state.units[bestDefIdx] = { ...defender,
            veteran: result.defVeteranPromo ? 1 : defender.veteran,
            hpLost: result.defHpLost };
        }

        state.units[unitIndex] = unit;
        state.combatResult = state.combatResult || {
          type: result.attackerWins ? 'atkWin' : 'defWin',
          attacker: unit.type, defender: defender.type,
          atkOwner: unit.owner, defOwner: defender.owner,
          atkVeteran: !!attacker_preCombat_veteran, defVeteran: !!defender_preCombat_veteran,
          gx: dest.gx, gy: dest.gy,
          atkHpLost: result.atkHpLost, defHpLost: result.defHpLost,
          rounds: result.rounds,
          atkMaxHp: result.atkMaxHp, defMaxHp: result.defMaxHp,
          atkFp: result.atkFp, defFp: result.defFp,
          atkStartHp: result.atkStartHp, defStartHp: result.defStartHp,
          defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver,
          defFortified: defender.orders === 'fortified',
          atkVeteranPromo: result.atkVeteranPromo,
          defVeteranPromo: result.defVeteranPromo,
        };

        // Check civ elimination for the losing side
        const eliminatedCiv = result.attackerWins ? defOwner : unit.owner;
        checkCivElimination(state, eliminatedCiv);

        // Barbarian uprising when a civ is destroyed via city capture
        if (result.attackerWins && defCity && eliminatedCiv > 0 &&
            !(state.civsAlive & (1 << eliminatedCiv))) {
          spawnBarbarianUprising(state, mapBase, dest.gx, dest.gy);
        }
      } else {
        // ── Normal movement (no enemy) ──
        const prevGx = unit.gx, prevGy = unit.gy;
        const cost = moveCost(unit.type, mapBase, unit.gx, unit.gy, dest.gx, dest.gy);
        const domain = UNIT_DOMAIN[unit.type] ?? 0;

        // Probabilistic movement check (from Civ2 binary FUN_0059062c lines 712-729):
        // When a land unit has insufficient MP for terrain cost AND has already spent
        // some MP this turn, movement succeeds probabilistically: P = movesLeft / cost.
        // If check fails, all remaining MP are exhausted and unit does not move.
        if (domain === 0 && cost > 1 && unit.movesLeft < cost) {
          const totalMP = (UNIT_MOVE_POINTS[unit.type] || 1) * MOVEMENT_MULTIPLIER;
          if (unit.movesLeft < totalMP) {
            // Unit has already used some movement — probabilistic check
            const roll = Math.floor(Math.random() * cost); // 0 to cost-1
            if (unit.movesLeft <= roll) {
              // Failed: exhaust all remaining MP, do not move
              unit.movesLeft = 0;
              state.units[unitIndex] = unit;
              break;
            }
          }
          // Else: fresh unit (full MP) or roll succeeded — proceed with move
        }

        unit.gx = dest.gx;
        unit.gy = dest.gy;
        unit.x = dest.gx * 2 + (dest.gy % 2);
        unit.y = dest.gy;

        // Deduct movement (minimum 1 third spent, even on railroad)
        unit.movesLeft = Math.max(0, unit.movesLeft - Math.max(cost, 1));

        // Wake from sleep/fortify/sentry
        if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';

        // Cancel any work order on move
        if (unit.orders === 'road' || unit.orders === 'irrigation' || unit.orders === 'mine' ||
            unit.orders === 'fortress' || unit.orders === 'airbase' || unit.orders === 'pollution' ||
            unit.orders === 'railroad') {
          unit.orders = 'none';
          unit.workTurns = 0;
        }

        // Naval transport: sea unit with carry capacity auto-moves cargo
        if (UNIT_DOMAIN[unit.type] === 1 && UNIT_CARRY_CAP[unit.type]) {
          for (let i = 0; i < state.units.length; i++) {
            const u = state.units[i];
            if (u.gx === prevGx && u.gy === prevGy && u.owner === unit.owner &&
                UNIT_DOMAIN[u.type] === 0 && u.gx >= 0) {
              state.units[i] = { ...u,
                gx: dest.gx, gy: dest.gy,
                x: dest.gx * 2 + (dest.gy % 2), y: dest.gy,
              };
            }
          }
        }

        // ── Capture undefended enemy city ──
        const enemyCity = state.cities.find(c =>
          c.gx === dest.gx && c.gy === dest.gy && c.owner !== civSlot && c.owner > 0 && c.size > 0);
        if (enemyCity && (UNIT_ATK[unit.type] || 0) > 0) {
          const defOwner = enemyCity.owner;
          state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
          const cityIdx = state.cities.indexOf(enemyCity);
          if (cityIdx >= 0) {
            captureCity(state, prev, mapBase, cityIdx, civSlot, defOwner);
            state.combatResult = {
              type: 'capture', cityName: enemyCity.name, civSlot,
              gx: dest.gx, gy: dest.gy,
            };
            // Check civ elimination for the old owner
            checkCivElimination(state, defOwner);
            // Barbarian uprising when a civ is destroyed via city capture
            if (defOwner > 0 && !(state.civsAlive & (1 << defOwner))) {
              spawnBarbarianUprising(state, mapBase, dest.gx, dest.gy);
            }
          }
        }

        state.units[unitIndex] = unit;
      }

      // Update visibility for this civ around new position
      if (unit.gx >= 0) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, unit.gx, unit.gy, mapBase.wraps);
        // Check for first contact with other civs now visible
        discoverContacts(state, mapBase, civSlot, unit.gx, unit.gy, 1);
      }

      // ── Goody hut check ──
      if (unit.gx >= 0 && civSlot > 0) { // alive unit, non-barbarian
        const tileIdx = unit.gy * mapBase.mw + unit.gx;
        const tile = mapBase.tileData[tileIdx];
        if (tile && tile.goodyHut) {
          // Consume the hut
          tile.goodyHut = false;
          // Resolve outcome
          const hutResult = resolveGoodyHut(state, mapBase, unit, civSlot);
          if (hutResult) {
            state.goodyHutResult = { ...hutResult, civSlot };
          }
        }
      }

      // ── Sentry wake: enemy units with orders 'sentry' within 2 tiles wake up ──
      if (unit.gx >= 0) {
        const wokenUnits = [];
        for (let si = 0; si < state.units.length; si++) {
          const su = state.units[si];
          if (su.owner === civSlot || su.gx < 0 || su.orders !== 'sentry') continue;
          // Check within 2 tiles (Manhattan distance in gx,gy space)
          let sDx = Math.abs(su.gx - unit.gx);
          if (mapBase.wraps) sDx = Math.min(sDx, mapBase.mw - sDx);
          const sDy = Math.abs(su.gy - unit.gy);
          if (sDx + sDy <= 2) {
            state.units[si] = { ...su, orders: 'none' };
            wokenUnits.push({ unitIndex: si, unitType: su.type, civSlot: su.owner });
          }
        }
        if (wokenUnits.length > 0) {
          state.unitsWoken = wokenUnits;
        }
      }

      break;
    }

    case BUILD_CITY: {
      const { unitIndex, name: requestedName } = action;
      const unit = state.units[unitIndex];

      // Create city at settler's position
      const isFirstCity = prev.cities.filter(c => c.owner === unit.owner).length === 0;
      const buildings = new Set();
      if (isFirstCity) buildings.add(1); // Palace
      const cityName = (requestedName && requestedName.trim()) || getCityName(unit.owner, prev.cities, prev.civs);
      const newCity = {
        name: cityName,
        owner: unit.owner,
        originalOwner: unit.owner,
        size: 1,
        gx: unit.gx, gy: unit.gy,
        cx: unit.gx * 2 + (unit.gy % 2), cy: unit.gy,
        hasWalls: false, hasPalace: isFirstCity,
        civilDisorder: false, weLoveKingDay: false, isOccupied: false,
        workedTiles: [],
        specialists: [],
        buildings,
        foodInBox: 0, shieldsInBox: 0,
        itemInProduction: { type: 'unit', id: 2 }, // default: Warriors
      };
      state.cities = [...prev.cities, newCity];
      const newCityIndex = state.cities.length - 1;

      // Compute initial worker placement using full yield calculation
      newCity.workedTiles = assignInitialWorkers(
        unit.gx, unit.gy, 1, newCity, newCityIndex, state, mapBase
      );

      // Remove settler (mark as dead)
      state.units[unitIndex] = { ...unit, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };

      // Mark tile as city (road/railroad connectivity + renderer needs this)
      const cityTileIdx = newCity.gy * mapBase.mw + newCity.gx;
      if (mapBase.tileData[cityTileIdx]) {
        mapBase.tileData[cityTileIdx].improvements = {
          ...mapBase.tileData[cityTileIdx].improvements,
          city: true, road: true,
        };
        // Set tile ownership to founding civ
        mapBase.tileData[cityTileIdx].tileOwnership = unit.owner;
      }

      // Set tile ownership for city radius tiles
      for (let ri = 0; ri < 20; ri++) {
        const rpos = radiusTileCoords(newCity.gx, newCity.gy, ri, mapBase);
        if (!rpos) continue;
        const rTileIdx = rpos.gy * mapBase.mw + rpos.gx;
        const rTile = mapBase.tileData[rTileIdx];
        if (!rTile) continue;
        // Only claim unclaimed tiles (tileOwnership 0 or 0x0F means unclaimed)
        if (rTile.tileOwnership === 0 || rTile.tileOwnership === 0x0F) {
          rTile.tileOwnership = unit.owner;
        }
      }

      // Update visibility with city radius (cities have radius 2)
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, newCity.gx, newCity.gy, mapBase.wraps, 2);
      // Check for first contact with other civs now visible from the new city
      discoverContacts(state, mapBase, civSlot, newCity.gx, newCity.gy, 2);

      // Notify client
      state.cityFounded = { name: newCity.name, cityIndex: newCityIndex, civSlot };

      break;
    }

    case SET_WORKERS: {
      const { cityIndex, workedTiles, specialists } = action;
      state.cities = [...prev.cities];
      state.cities[cityIndex] = {
        ...state.cities[cityIndex],
        workedTiles: [...workedTiles],
        specialists: [...specialists],
      };
      break;
    }

    case CHANGE_PRODUCTION: {
      const { cityIndex, item } = action;
      state.cities = [...prev.cities];
      const city = state.cities[cityIndex];
      // Civ2 ShieldPenaltyTypeChange (COSMIC, default 50%):
      // Same type (unit→unit, building→building, wonder→wonder): keep all shields
      // Cross-type (unit→building, etc.): keep 50%, applied once on switch
      const prevItem = city.itemInProduction;
      const sameType = prevItem && prevItem.type === item.type;
      const oldShields = city.shieldsInBox || 0;
      const newShields = sameType ? oldShields : Math.floor(oldShields / 2);
      state.cities[cityIndex] = {
        ...city,
        itemInProduction: { type: item.type, id: item.id },
        shieldsInBox: newShields,
      };
      break;
    }

    case RUSH_BUY: {
      const { cityIndex } = action;
      state.cities = [...prev.cities];
      const city = state.cities[cityIndex];
      const item = city.itemInProduction;
      const totalCost = getProductionCost(item);
      const buyCost = calcRushBuyCost(item.type, totalCost, city.shieldsInBox || 0);

      // Deduct gold
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.treasury -= buyCost;
      state.civs[civSlot] = civ;

      // Complete production immediately
      state.cities[cityIndex] = { ...city, shieldsInBox: totalCost };
      break;
    }

    case SELL_BUILDING: {
      const { cityIndex, buildingId } = action;
      state.cities = [...prev.cities];
      const city = state.cities[cityIndex];

      // Remove building
      const newBuildings = new Set(city.buildings);
      newBuildings.delete(buildingId);

      // Refund: full shield cost in gold
      const refund = (IMPROVE_COSTS[buildingId] || 0);
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.treasury = (civ.treasury || 0) + refund;
      state.civs[civSlot] = civ;

      state.cities[cityIndex] = {
        ...city,
        buildings: newBuildings,
        soldThisTurn: true,
        hasWalls: newBuildings.has(8),
        hasPalace: newBuildings.has(1),
      };
      break;
    }

    case CHANGE_RATES: {
      const { scienceRate, taxRate } = action;
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.scienceRate = scienceRate;
      civ.taxRate = taxRate;
      civ.luxuryRate = 10 - scienceRate - taxRate;
      state.civs[civSlot] = civ;
      break;
    }

    case SET_RESEARCH: {
      const { advanceId } = action;
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.techBeingResearched = advanceId;
      state.civs[civSlot] = civ;
      break;
    }

    case UNIT_ORDER: {
      const { unitIndex, order } = action;
      const unit = { ...state.units[unitIndex] };

      if (order === 'disband') {
        // Remove unit
        unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;
      } else if (order === 'fortify') {
        // Takes 1 turn to fortify — set to 'fortifying', END_TURN will promote to 'fortified'
        unit.orders = 'fortifying';
        unit.movesLeft = 0;
      } else if (order === 'sentry') {
        unit.orders = 'sentry';
        unit.movesLeft = 0;
      } else if (order === 'sleep') {
        unit.orders = 'sleep';
        unit.movesLeft = 0;
      } else if (order === 'skip') {
        // Skip: end this unit's turn but don't change orders
        unit.movesLeft = 0;
      } else if (order === 'wake') {
        // Wake: clear all orders, cancel any work in progress
        unit.orders = 'none';
        unit.workTurns = 0;
      }

      state.units[unitIndex] = unit;
      break;
    }

    case WORKER_ORDER: {
      const { unitIndex, order } = action;
      const unit = { ...state.units[unitIndex] };

      // Begin the work order — progress tracked by workTurns, completed in END_TURN
      unit.orders = order;
      unit.workTurns = 0;
      unit.movesLeft = 0;

      state.units[unitIndex] = unit;
      break;
    }

    case REVOLUTION: {
      const { government } = action;
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      if (hasWonderEffect(state, civSlot, 19)) {
        // Statue of Liberty: instant government switch, no anarchy
        civ.government = government;
      } else {
        civ.government = 'anarchy';
        civ.anarchyTurns = 1 + Math.floor(Math.random() * 4);
        civ.pendingGovernment = government;
      }
      state.civs[civSlot] = civ;
      break;
    }

    case PILLAGE: {
      const { unitIndex: pillUi } = action;
      const pillUnit = state.units[pillUi];
      const pillIdx = pillUnit.gy * mapBase.mw + pillUnit.gx;
      const pillTile = mapBase.tileData[pillIdx];
      if (pillTile) {
        const imp = { ...pillTile.improvements };
        // Destroy highest-value improvement
        if (imp.railroad) imp.railroad = false;
        else if (imp.fortress) imp.fortress = false;
        else if (imp.airbase) imp.airbase = false;
        else if (imp.farmland) { imp.farmland = false; imp.mining = false; }
        else if (imp.mining) imp.mining = false;
        else if (imp.irrigation) imp.irrigation = false;
        else if (imp.road) imp.road = false;
        pillTile.improvements = imp;
      }
      break;
    }

    case DESTROY_CITY: {
      const { cityIndex: razeCi } = action;
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const razeCity = state.cities[razeCi];
      // Kill all units homed here
      rehomeUnits(state, razeCi, civSlot);
      // Clear city tile
      const razeTileIdx = razeCity.gy * mapBase.mw + razeCity.gx;
      if (mapBase.tileData[razeTileIdx]) {
        mapBase.tileData[razeTileIdx].improvements = {
          ...mapBase.tileData[razeTileIdx].improvements, city: false,
        };
        // Clear tile ownership on city tile
        mapBase.tileData[razeTileIdx].tileOwnership = 0;
      }
      // Clear tile ownership in city radius (only tiles not claimed by another of our cities)
      for (let ri = 0; ri < 20; ri++) {
        const rpos = radiusTileCoords(razeCity.gx, razeCity.gy, ri, mapBase);
        if (!rpos) continue;
        const rTileIdx = rpos.gy * mapBase.mw + rpos.gx;
        const rTile = mapBase.tileData[rTileIdx];
        if (!rTile || rTile.tileOwnership !== razeCity.owner) continue;
        // Check if any other city of this owner claims this tile
        const otherClaims = state.cities.some((c, ci) =>
          ci !== razeCi && c.owner === razeCity.owner && c.size > 0 &&
          CITY_RADIUS_DOUBLED.some(([ddx, ddy]) => {
            const parC = c.gy & 1;
            const parT = ((c.gy + ddy) % 2 + 2) % 2;
            const tgx = c.gx + ((parC + ddx - parT) >> 1);
            const tgy = c.gy + ddy;
            const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
            return wgx === rpos.gx && tgy === rpos.gy;
          })
        );
        if (!otherClaims) rTile.tileOwnership = 0;
      }
      state.cities[razeCi] = { ...razeCity, size: 0, owner: -1 };
      checkCivElimination(state, civSlot);
      break;
    }

    case PROPOSE_TREATY: {
      const { targetCiv: ptTarget, treaty: ptType } = action;
      if (!state.treatyProposals) state.treatyProposals = [];
      state.treatyProposals = [...state.treatyProposals, {
        from: civSlot, to: ptTarget, treaty: ptType, resolved: false,
        turn: state.turn.number,
      }];
      break;
    }

    case RESPOND_TREATY: {
      const { proposalIndex: rtIdx, accept: rtAccept } = action;
      state.treatyProposals = [...(prev.treatyProposals || [])];
      const proposal = { ...state.treatyProposals[rtIdx], resolved: true, accepted: rtAccept };
      state.treatyProposals[rtIdx] = proposal;
      if (rtAccept) {
        let rtResult;
        switch (proposal.treaty) {
          case 'ceasefire':
            rtResult = signCeasefire(state, proposal.from, proposal.to);
            break;
          case 'peace':
            rtResult = signPeaceTreaty(state, proposal.from, proposal.to);
            break;
          case 'alliance':
            rtResult = formAlliance(state, mapBase, proposal.from, proposal.to);
            break;
          default:
            // Fallback: just set the treaty directly
            if (!state.treaties) state.treaties = {};
            const rtKey = proposal.from < proposal.to
              ? `${proposal.from}-${proposal.to}` : `${proposal.to}-${proposal.from}`;
            state.treaties = { ...state.treaties, [rtKey]: proposal.treaty };
            break;
        }
        if (!state.turnEvents) state.turnEvents = [];
        if (rtResult) {
          for (const evt of rtResult.events) {
            state.turnEvents.push(evt);
          }
        }
        state.turnEvents.push({
          type: 'treatyAccepted', civA: proposal.from, civB: proposal.to,
          treaty: proposal.treaty,
        });
      }
      break;
    }

    case DECLARE_WAR: {
      const { targetCiv: dwTarget } = action;
      const dwResult = diplomacyDeclareWar(state, mapBase, civSlot, dwTarget);
      if (!state.turnEvents) state.turnEvents = [];
      for (const evt of dwResult.events) {
        state.turnEvents.push(evt);
      }
      break;
    }

    case ESTABLISH_TRADE: {
      const { unitIndex: etUi, cityIndex: etCi } = action;
      const etUnit = state.units[etUi];
      const homeCity = state.cities[etUnit.homeCityId];
      const destCity = state.cities[etCi];
      // Calculate trade income (simplified: based on distance + city sizes)
      const dx = Math.abs(homeCity.gx - destCity.gx);
      const dy = Math.abs(homeCity.gy - destCity.gy);
      const dist = dx + dy;
      const isForeign = homeCity.owner !== destCity.owner;
      // Civ2 formula: (dist + 10) × (homeSize + destSize) / 24, ×2 if foreign
      const baseIncome = Math.floor((dist + 10) * (homeCity.size + destCity.size) / 24);
      const income = isForeign ? baseIncome * 2 : baseIncome;
      // Create route
      const route = { destCityIndex: etCi, income };
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const updHome = { ...state.cities[etUnit.homeCityId] };
      updHome.tradeRoutes = [...(updHome.tradeRoutes || []), route];
      state.cities[etUnit.homeCityId] = updHome;
      // Consume the caravan/freight
      killUnit(state, etUi);
      // One-time trade bonus (gold)
      if (state.civs?.[civSlot]) {
        state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
        const civ = { ...state.civs[civSlot] };
        const bonus = income * 3;
        civ.treasury = (civ.treasury || 0) + bonus;
        state.civs[civSlot] = civ;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'tradeEstablished', civSlot,
          homeCityName: homeCity.name, destCityName: destCity.name,
          income, bonus,
        });
      }
      break;
    }

    case RENAME_CITY: {
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      state.cities[action.cityIndex] = { ...state.cities[action.cityIndex], name: action.name.trim() };
      break;
    }

    case BRIBE_UNIT: {
      const spy = state.units[action.unitIndex];
      const target = state.units[action.targetIndex];
      const bCost = calcBribeCost(state, target, mapBase);
      // Deduct gold
      state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
      const bCiv = { ...state.civs[civSlot] };
      bCiv.treasury = (bCiv.treasury || 0) - bCost;
      state.civs[civSlot] = bCiv;
      // Transfer unit ownership
      state.units[action.targetIndex] = { ...target, owner: civSlot, homeCityId: 0xFFFF, orders: 'none' };
      // Spy survival check (uses decompiled formula)
      const bribeSurvival = checkSpySurvival(spy, 0);
      if (bribeSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: bribeSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }
      // Diplomatic incident
      handleEspionageIncident(state, mapBase, civSlot, target.owner);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'unitBribed', civSlot, unitType: target.type, cost: bCost });
      break;
    }

    case STEAL_TECH: {
      const spy = state.units[action.unitIndex];
      const sCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      const theirTechs = state.civTechs?.[sCity.owner];
      const myTechs = state.civTechs?.[civSlot];
      // Collect stealable techs
      const stealable = [];
      for (const t of theirTechs) { if (!myTechs.has(t)) stealable.push(t); }
      const stolenId = stealable[Math.floor(Math.random() * stealable.length)];
      grantAdvance(state, civSlot, stolenId);
      // Spy survival (decompiled formula: successLevel=0 for normal steal)
      const stealSurvival = checkSpySurvival(spy, 0);
      if (stealSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: stealSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }
      // Diplomatic incident
      handleEspionageIncident(state, mapBase, civSlot, sCity.owner);
      // Dispatch scenario events for tech received
      dispatchEvents(state, mapBase, EVENT_RECEIVED_TECH, { civSlot, techId: stolenId });
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'techStolen', civSlot, advanceId: stolenId, from: sCity.owner });
      break;
    }

    case SABOTAGE_CITY: {
      const spy = state.units[action.unitIndex];
      const sCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      const sCityIdx = state.cities.indexOf(sCity);
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const sabCity = { ...sCity };
      let sabResult;
      // 50% destroy random building, 50% reset production (from decompiled case 3)
      const buildings = sabCity.buildings instanceof Set ? [...sabCity.buildings] : [];
      // Never destroy Palace (1), City Walls (8), SDI Defense (17)
      const destructible = buildings.filter(b => b !== 1 && b !== 8 && b !== 17);
      if (destructible.length > 0 && Math.random() < 0.5) {
        const bid = destructible[Math.floor(Math.random() * destructible.length)];
        const newBuildings = new Set(sabCity.buildings);
        newBuildings.delete(bid);
        sabCity.buildings = newBuildings;
        sabCity.hasWalls = newBuildings.has(8);
        sabResult = { type: 'buildingDestroyed', buildingId: bid };
      } else {
        sabCity.shieldsInBox = 0;
        sabResult = { type: 'productionReset' };
      }
      state.cities[sCityIdx] = sabCity;
      // Spy survival (decompiled formula)
      const sabSurvival = checkSpySurvival(spy, 0);
      if (sabSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: sabSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }
      // Diplomatic incident
      handleEspionageIncident(state, mapBase, civSlot, sCity.owner);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'citySabotaged', civSlot, cityName: sCity.name, ...sabResult });
      break;
    }

    case INCITE_REVOLT: {
      const spy = state.units[action.unitIndex];
      const iCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      const iCityIdx = state.cities.indexOf(iCity);
      const iCost = calcInciteCost(state, iCity, mapBase);
      const oldOwner = iCity.owner;
      // Deduct gold
      state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
      const iCiv = { ...state.civs[civSlot] };
      iCiv.treasury = (iCiv.treasury || 0) - iCost;
      state.civs[civSlot] = iCiv;
      // Transfer nearby units (within distance 1) to new owner — from decompiled execute_civil_war
      state.units = state.units !== prev.units ? state.units : [...prev.units];
      for (let ui = 0; ui < state.units.length; ui++) {
        const u = state.units[ui];
        if (u.gx < 0 || u.owner !== oldOwner) continue;
        const udx = Math.abs(u.gx - iCity.gx);
        const udy = Math.abs(u.gy - iCity.gy);
        const udist = (mapBase.wraps ? Math.min(udx, mapBase.mw - udx) : udx) + udy;
        if (udist < 2) {
          // On city tile: transfer to new owner; adjacent and not in another city: also transfer
          if (udist === 0 || !state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.size > 0 && c !== iCity)) {
            state.units[ui] = { ...u, owner: civSlot, homeCityId: iCityIdx, orders: 'none' };
            if (mapBase.tileData) {
              updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, u.gx, u.gy, mapBase.wraps);
            }
          }
        }
      }
      // Transfer city ownership via captureCity (incite revolt skips random building destruction)
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      captureCity(state, prev, mapBase, iCityIdx, civSlot, oldOwner, { skipBuildingDestruction: true });
      // Spy survival (decompiled formula)
      const inciteSurvival = checkSpySurvival(spy, 0);
      if (inciteSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: inciteSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }
      // Diplomatic incident
      handleEspionageIncident(state, mapBase, civSlot, oldOwner);
      checkCivElimination(state, oldOwner);
      // Barbarian uprising when civ is destroyed via incite revolt
      if (oldOwner > 0 && !(state.civsAlive & (1 << oldOwner))) {
        spawnBarbarianUprising(state, mapBase, iCity.gx, iCity.gy);
      }
      // Scenario events: city taken
      dispatchEvents(state, mapBase, EVENT_CITY_TAKEN, {
        cityName: iCity.name, attacker: civSlot, defender: oldOwner,
      });
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'cityIncited', civSlot, cityName: iCity.name, from: oldOwner, cost: iCost });
      break;
    }

    // ── New spy actions (Phase J.2) ──

    case SPY_POISON_WATER: {
      // Spy poisons water supply: reduce city population by 1
      // From decompiled spy_enters_city case 4
      const spy = state.units[action.unitIndex];
      const pCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      const pCityIdx = state.cities.indexOf(pCity);
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const poisonCity = { ...pCity };
      if (poisonCity.size < 2) {
        // City too small, just wipe food
        poisonCity.foodInBox = 0;
      } else {
        poisonCity.size -= 1;
        // Remove a worked tile if more workers than size
        if (poisonCity.workedTiles && poisonCity.workedTiles.length > poisonCity.size) {
          poisonCity.workedTiles = removeWorstWorker(poisonCity, pCityIdx, poisonCity.workedTiles, state, mapBase);
        }
      }
      state.cities[pCityIdx] = poisonCity;
      // Spy survival (poison is random difficulty: successLevel = rand 0 or -1)
      const poisonLevel = Math.random() < 0.5 ? -1 : 0;
      const poisonSurvival = checkSpySurvival(spy, poisonLevel);
      if (poisonSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: poisonSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }
      handleEspionageIncident(state, mapBase, civSlot, pCity.owner);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'waterPoisoned', civSlot, cityName: pCity.name, from: pCity.owner });
      break;
    }

    case SPY_PLANT_NUKE: {
      // Spy plants nuclear device: nuke the city
      // From decompiled spy_enters_city case 5
      // Requires 4 cumulative spy caught checks (3 base + 1 if barracks)
      const spy = state.units[action.unitIndex];
      const nCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      const nCityIdx = state.cities.indexOf(nCity);
      if (!state.turnEvents) state.turnEvents = [];

      // Cumulative spy caught checks (4 total, harder if barracks present)
      let nukeCaught = false;
      for (let chk = 0; chk < 3; chk++) {
        if (spyCaughtCheck(spy)) { nukeCaught = true; break; }
      }
      // Extra check if city has barracks (building 2)
      if (!nukeCaught && nCity.buildings && nCity.buildings.has(2)) {
        if (spyCaughtCheck(spy)) nukeCaught = true;
      }

      if (nukeCaught) {
        killUnit(state, action.unitIndex);
        state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'plantNuke', cityName: nCity.name });
        handleEspionageIncident(state, mapBase, civSlot, nCity.owner);
        break;
      }

      // Nuke the city — apply nuke damage (same as NUKE action but centered on city)
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const nukeCity = { ...nCity };
      // Destroy random buildings (50% each)
      if (nukeCity.buildings instanceof Set) {
        const nukeBldgs = new Set(nukeCity.buildings);
        for (const bid of [...nukeBldgs]) {
          if (bid === 1) continue; // keep Palace
          if (Math.random() < 0.5) nukeBldgs.delete(bid);
        }
        nukeCity.buildings = nukeBldgs;
        nukeCity.hasWalls = nukeBldgs.has(8);
      }
      // Halve population (min 1)
      nukeCity.size = Math.max(1, Math.floor(nukeCity.size / 2));
      // Add pollution
      const nukeTileIdx = nCity.gy * mapBase.mw + nCity.gx;
      if (mapBase.tileData?.[nukeTileIdx]) {
        mapBase.tileData[nukeTileIdx].improvements = { ...mapBase.tileData[nukeTileIdx].improvements, pollution: true };
      }
      state.cities[nCityIdx] = nukeCity;

      // Kill/damage units in city
      state.units = state.units !== prev.units ? state.units : [...prev.units];
      for (let ui = 0; ui < state.units.length; ui++) {
        const u = state.units[ui];
        if (u.gx === nCity.gx && u.gy === nCity.gy && u.gx >= 0 && u.owner !== civSlot) {
          if (Math.random() < 0.5) {
            killUnit(state, ui);
          }
        }
      }

      // Spy survival
      const nukeSurvival = checkSpySurvival(spy, 1); // hard mission
      if (nukeSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: nukeSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }

      // Global diplomatic incident: all civs may declare war
      // From decompiled: lower attitude by 100 for all other civs
      for (let c = 1; c <= 7; c++) {
        if (c === civSlot || !(state.civsAlive & (1 << c))) continue;
        handleEspionageIncident(state, mapBase, civSlot, c);
      }

      state.turnEvents.push({ type: 'nukeBySpyPlanted', civSlot, cityName: nCity.name, from: nCity.owner });
      break;
    }

    case SPY_SABOTAGE_PRODUCTION: {
      // Spy resets city's shieldsInBox to 0
      const spy = state.units[action.unitIndex];
      const spCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      const spCityIdx = state.cities.indexOf(spCity);
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      state.cities[spCityIdx] = { ...spCity, shieldsInBox: 0 };
      // Spy survival
      const spSurvival = checkSpySurvival(spy, 0);
      if (spSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: spSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }
      handleEspionageIncident(state, mapBase, civSlot, spCity.owner);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'productionSabotaged', civSlot, cityName: spCity.name, from: spCity.owner });
      break;
    }

    case SPY_INVESTIGATE_CITY: {
      // Spy reveals city details — low risk operation
      // From decompiled spy_enters_city case 1
      const spy = state.units[action.unitIndex];
      const invCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      // Diplomat consumed; Spy survives if city has no walls
      if (spy.type === 46) {
        // Diplomat: consumed after investigation
        const invSurvival = checkSpySurvival(spy, 0);
        if (!invSurvival.survives) {
          killUnit(state, action.unitIndex);
        }
      } else {
        // Spy: survives if city has no walls, otherwise check
        if (invCity.buildings && invCity.buildings.has(8)) {
          const invSurvival = checkSpySurvival(spy, 0);
          if (invSurvival.survives) {
            state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: invSurvival.becomesVeteran ? 1 : spy.veteran };
          } else {
            killUnit(state, action.unitIndex);
          }
        } else {
          state.units[action.unitIndex] = { ...spy, movesLeft: 0 };
        }
      }
      if (!state.turnEvents) state.turnEvents = [];
      // Send city details to the acting civ
      const invBuildings = invCity.buildings instanceof Set ? [...invCity.buildings] : [];
      state.turnEvents.push({
        type: 'cityInvestigated', civSlot, cityName: invCity.name,
        from: invCity.owner, size: invCity.size,
        buildings: invBuildings,
        producing: invCity.producing,
        shieldsInBox: invCity.shieldsInBox,
      });
      break;
    }

    case SPY_ESTABLISH_EMBASSY: {
      // Establish embassy with city owner's civ
      // From decompiled spy_enters_city case 0
      const spy = state.units[action.unitIndex];
      const embCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      const embTarget = embCity.owner;
      // Set embassy flag in diplomacy
      if (!state.diplomacy) state.diplomacy = {};
      const embKey = `${civSlot}-${embTarget}`;
      state.diplomacy = {
        ...state.diplomacy,
        [embKey]: { ...(state.diplomacy[embKey] || {}), embassy: true },
      };
      // Diplomat consumed; Spy survives
      if (spy.type === 46) {
        killUnit(state, action.unitIndex);
      } else {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0 };
      }
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'embassyEstablished', civSlot, targetCiv: embTarget, cityName: embCity.name });
      break;
    }

    case SPY_SABOTAGE_UNIT: {
      // Spy sabotages enemy unit: 50% HP damage
      // From decompiled FUN_004c9ebd (spy_sabotage_unit, 784B)
      const spy = state.units[action.unitIndex];
      const sabTarget = state.units[action.targetIndex];
      const maxHp = (UNIT_HP && UNIT_HP[sabTarget.type]) || 10;
      const damage = Math.floor(maxHp / 2);
      state.units[action.targetIndex] = {
        ...sabTarget,
        hpLost: Math.min(maxHp - 1, (sabTarget.hpLost || 0) + damage),
      };
      // Spy survival
      const sabUnitSurvival = checkSpySurvival(spy, 0);
      if (sabUnitSurvival.survives) {
        state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: sabUnitSurvival.becomesVeteran ? 1 : spy.veteran };
      } else {
        killUnit(state, action.unitIndex);
      }
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'unitSabotaged', civSlot, targetType: sabTarget.type, damage });
      break;
    }

    case DEMAND_TRIBUTE: {
      if (!state.tributeDemands) state.tributeDemands = [];
      state.tributeDemands = [...state.tributeDemands, {
        from: civSlot, to: action.targetCiv, amount: action.amount,
        resolved: false, turn: state.turn.number,
      }];
      break;
    }

    case RESPOND_DEMAND: {
      state.tributeDemands = [...(prev.tributeDemands || [])];
      const demand = { ...state.tributeDemands[action.demandIndex], resolved: true, accepted: action.accept };
      state.tributeDemands[action.demandIndex] = demand;
      if (action.accept) {
        state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
        // Deduct from target, add to demander
        const payer = { ...state.civs[civSlot] };
        payer.treasury = (payer.treasury || 0) - demand.amount;
        state.civs[civSlot] = payer;
        const receiver = { ...state.civs[demand.from] };
        receiver.treasury = (receiver.treasury || 0) + demand.amount;
        state.civs[demand.from] = receiver;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({ type: 'tributePaid', from: civSlot, to: demand.from, amount: demand.amount });
      }
      break;
    }

    case SHARE_MAP: {
      // Mutual map exchange: OR exploration bits for both civs
      if (mapBase.tileData) {
        const myBit = 1 << civSlot;
        const theirBit = 1 << action.targetCiv;
        for (const tile of mapBase.tileData) {
          if (!tile) continue;
          const vis = tile.visibility ?? 0;
          const myExplored = vis & myBit;
          const theirExplored = vis & theirBit;
          if (myExplored && !theirExplored) tile.visibility = vis | theirBit;
          if (theirExplored && !myExplored) tile.visibility = vis | myBit;
        }
      }
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'mapShared', civSlot, targetCiv: action.targetCiv });
      break;
    }

    case BOMBARD: {
      const { unitIndex: bmbUi, targetGx: bmbTgx, targetGy: bmbTgy } = action;
      const bmbUnit = state.units[bmbUi];
      // Find best defender at target
      const bmbDefenders = state.units.filter(u => u.gx === bmbTgx && u.gy === bmbTgy && u.owner !== civSlot && u.gx >= 0);
      if (bmbDefenders.length > 0) {
        // Bombardment does 2 HP damage to strongest defender (no risk to attacker)
        const bmbBestDef = bmbDefenders.reduce((a, b) => (UNIT_DEF[b.type] || 0) > (UNIT_DEF[a.type] || 0) ? b : a);
        const bmbDi = state.units.indexOf(bmbBestDef);
        if (bmbDi >= 0) {
          state.units[bmbDi] = { ...bmbBestDef };
          state.units[bmbDi].hp = Math.max(0, (bmbBestDef.hp ?? 10) - 2);
          if (state.units[bmbDi].hp <= 0) {
            state.units[bmbDi].gx = -1; // kill
          }
        }
      }
      // Use all movement (air units expend their turn)
      state.units[bmbUi] = { ...bmbUnit, movesLeft: 0 };
      // Missiles: destroyed after attack
      if (UNIT_DESTROYED_AFTER_ATTACK.has(bmbUnit.type)) {
        state.units[bmbUi].gx = -1;
        state.units[bmbUi].gy = -1;
        state.units[bmbUi].x = -1;
        state.units[bmbUi].y = -1;
      }
      state.combatResult = { type: 'bombard', attacker: bmbUnit.type, targetGx: bmbTgx, targetGy: bmbTgy };
      break;
    }

    case REBASE: {
      const { unitIndex: rbUi, targetGx: rbTgx, targetGy: rbTgy } = action;
      const rbUnit = state.units[rbUi];
      const rbNewUnit = { ...rbUnit, gx: rbTgx, gy: rbTgy, x: rbTgx * 2 + (rbTgy % 2), y: rbTgy, movesLeft: 0 };
      // Refuel at destination
      const rbMaxFuel = UNIT_FUEL[rbUnit.type];
      if (rbMaxFuel > 0) {
        rbNewUnit.fuelRemaining = rbMaxFuel;
      }
      state.units[rbUi] = rbNewUnit;
      break;
    }

    case GOTO: {
      const { unitIndex: gtUi, targetGx: gtTgx, targetGy: gtTgy, path: gtPath } = action;
      const gtUnit = state.units[gtUi];
      if (!gtPath || gtPath.length === 0) break;

      // Set goto destination on unit
      state.units[gtUi] = { ...gtUnit, goToX: gtTgx, goToY: gtTgy, orders: 'goto' };

      // Execute as many steps as possible this turn
      let gtCur = state.units[gtUi];
      for (const gtDir of gtPath) {
        if (gtCur.movesLeft <= 0) break;
        if (gtCur.gx < 0) break; // dead

        const gtDest = resolveDirection(gtCur.gx, gtCur.gy, gtDir, mapBase);
        if (!gtDest) break;

        // Check for enemies at destination (stop before combat)
        const gtHasEnemy = state.units.some(u => u.gx === gtDest.gx && u.gy === gtDest.gy && u.owner !== civSlot && u.gx >= 0 && (UNIT_ATK[u.type] || 0) > 0);
        if (gtHasEnemy) break;

        const gtCost = moveCost(gtCur.type, mapBase, gtCur.gx, gtCur.gy, gtDest.gx, gtDest.gy);
        if (gtCost < 0) break;

        // Probabilistic movement check for goto steps (same rule as single-step movement)
        const gtDomain = UNIT_DOMAIN[gtCur.type] ?? 0;
        if (gtDomain === 0 && gtCost > 1 && gtCur.movesLeft < gtCost) {
          const gtTotalMP = (UNIT_MOVE_POINTS[gtCur.type] || 1) * MOVEMENT_MULTIPLIER;
          if (gtCur.movesLeft < gtTotalMP) {
            const gtRoll = Math.floor(Math.random() * gtCost);
            if (gtCur.movesLeft <= gtRoll) {
              gtCur = { ...gtCur, movesLeft: 0 };
              state.units[gtUi] = gtCur;
              break;
            }
          }
        }

        const gtActualCost = Math.max(gtCost, 1);
        gtCur = { ...gtCur, gx: gtDest.gx, gy: gtDest.gy, x: gtDest.gx * 2 + (gtDest.gy % 2), y: gtDest.gy, movesLeft: Math.max(0, gtCur.movesLeft - gtActualCost) };
        state.units[gtUi] = gtCur;

        // Update visibility
        if (mapBase.tileData) {
          updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, gtDest.gx, gtDest.gy, mapBase.wraps);
          discoverContacts(state, mapBase, civSlot, gtDest.gx, gtDest.gy, 1);
        }

        // Check goody hut
        const gtTileIdx = gtDest.gy * mapBase.mw + gtDest.gx;
        const gtTile = mapBase.tileData?.[gtTileIdx];
        if (gtTile && gtTile.goodyHut && civSlot > 0) {
          gtTile.goodyHut = false;
          const hutResult = resolveGoodyHut(state, mapBase, gtCur, civSlot);
          if (hutResult) state.goodyHutResult = { ...hutResult, civSlot };
          break; // stop on goody hut
        }

        // Reached destination?
        if (gtDest.gx === gtTgx && gtDest.gy === gtTgy) {
          state.units[gtUi] = { ...state.units[gtUi], orders: 'none', goToX: undefined, goToY: undefined };
          break;
        }
      }
      break;
    }

    case TRANSFORM_TERRAIN: {
      const { unitIndex: tfUi } = action;
      const tfUnit = state.units[tfUi];
      state.units[tfUi] = { ...tfUnit, orders: 'transform', turnsWorked: 0, movesLeft: 0 };
      break;
    }

    case NUKE: {
      // ── Enhanced NUKE action (B.5) ──
      // Ported from decompiled FUN_0057f9e3 (handle_nuke_attack, 1236 bytes)
      const { unitIndex: nukeUi, targetGx: nukeTgx, targetGy: nukeTgy } = action;
      if (!state.turnEvents) state.turnEvents = [];

      // ── SDI Defense interception check ──
      // Any city within distance 4 of target with SDI Defense (building 17)
      // owned by a different civ can intercept the nuke.
      let sdiIntercepted = false;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const sdiCity = state.cities[ci];
        if (sdiCity.size <= 0 || sdiCity.owner === civSlot) continue;
        if (!(sdiCity.buildings && sdiCity.buildings.has(17))) continue; // SDI Defense = building 17
        let ddx = Math.abs(sdiCity.gx - nukeTgx);
        if (mapBase.wraps) ddx = Math.min(ddx, mapBase.mw - ddx);
        const ddy = Math.abs(sdiCity.gy - nukeTgy);
        const dist = ddx + ddy;
        if (dist < 4) {
          sdiIntercepted = true;
          state.turnEvents.push({
            type: 'nukeIntercepted', civSlot, targetGx: nukeTgx, targetGy: nukeTgy,
            interceptorCiv: sdiCity.owner, interceptorCity: sdiCity.name,
          });
          break;
        }
      }

      // Destroy the missile unit regardless of interception
      killUnit(state, nukeUi);

      if (sdiIntercepted) {
        // Nuke intercepted — no damage, but missile is consumed
        break;
      }

      // ── 3x3 area of effect: collect all 9 tiles ──
      const nukeTiles = [{ gx: nukeTgx, gy: nukeTgy }];
      const nukeDirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      for (const nd of nukeDirs) {
        const nDest = resolveDirection(nukeTgx, nukeTgy, nd, mapBase);
        if (nDest) nukeTiles.push(nDest);
      }

      // ── Destroy all units on all 9 tiles ──
      const affectedCivs = new Set();
      for (const nt of nukeTiles) {
        for (let i = 0; i < state.units.length; i++) {
          const u = state.units[i];
          if (u.gx === nt.gx && u.gy === nt.gy && u.gx >= 0) {
            // Track affected civs for diplomatic consequences
            if (u.owner !== civSlot && u.owner > 0) {
              affectedCivs.add(u.owner);
            }
            killUnit(state, i);
          }
        }
      }

      // ── City effects: halve population, destroy ~50% buildings ──
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      for (const nt of nukeTiles) {
        for (let ci = 0; ci < state.cities.length; ci++) {
          const c = state.cities[ci];
          if (c.gx !== nt.gx || c.gy !== nt.gy || c.size <= 0) continue;

          const newSize = Math.max(1, Math.floor(c.size / 2));
          // Destroy ~50% of buildings (seeded PRNG for determinism)
          let nukeBuildings = new Set(c.buildings);
          const buildingList = [...nukeBuildings];
          let nukeSeed = ((nt.gx * 31 + nt.gy * 17 + ci * 13 + (state.turn?.number || 0)) & 0x7FFFFFFF) || 1;
          const nukeRand = () => { nukeSeed = (nukeSeed * 1103515245 + 12345) & 0x7FFFFFFF; return nukeSeed; };
          for (const bid of buildingList) {
            // Wonders (building >= 39) are never destroyed by nukes
            if (bid >= 39) continue;
            if (nukeRand() % 2 === 0) nukeBuildings.delete(bid);
          }

          const newWorked = c.workedTiles && c.workedTiles.length > newSize
            ? c.workedTiles.slice(0, newSize) : (c.workedTiles || []);
          state.cities[ci] = {
            ...c, size: newSize, workedTiles: newWorked,
            buildings: nukeBuildings,
            hasWalls: nukeBuildings.has(8),
            hasPalace: nukeBuildings.has(1),
          };

          // Track affected civ
          if (c.owner !== civSlot && c.owner > 0) {
            affectedCivs.add(c.owner);
          }
        }
      }

      // ── Set pollution on all 9 tiles ──
      for (const nt of nukeTiles) {
        const nIdx = nt.gy * mapBase.mw + nt.gx;
        const tile = mapBase.tileData[nIdx];
        if (!tile) continue;
        if (tile.terrain !== 10) {
          tile.improvements = { ...tile.improvements, pollution: true };
        }
      }

      // ── Diplomatic consequences: all affected civs gain max hostility ──
      // From pseudocode: treaty flags 0x110 (attacked + nuke victim) and 0x20000 (we_nuked_them)
      for (const affectedCiv of affectedCivs) {
        state.turnEvents.push({
          type: 'nukeVictim', attacker: civSlot, victim: affectedCiv,
        });
      }

      // ── Check eliminations for affected civs ──
      for (const affectedCiv of affectedCivs) {
        checkCivElimination(state, affectedCiv);
      }

      state.turnEvents.push({ type: 'nuclearStrike', civSlot, targetGx: nukeTgx, targetGy: nukeTgy });
      break;
    }

    case PARADROP: {
      const { unitIndex: pdUi, targetGx: pdTgx, targetGy: pdTgy } = action;
      const pdUnit = { ...state.units[pdUi] };
      pdUnit.gx = pdTgx;
      pdUnit.gy = pdTgy;
      pdUnit.x = pdTgx * 2 + (pdTgy % 2);
      pdUnit.y = pdTgy;
      pdUnit.movesLeft = 0;
      state.units[pdUi] = pdUnit;
      // Update visibility
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, pdTgx, pdTgy, mapBase.wraps);
      discoverContacts(state, mapBase, civSlot, pdTgx, pdTgy, 1);
      break;
    }

    case AIRLIFT: {
      const { unitIndex: alUi, targetCityIndex: alTci } = action;
      const alUnit = { ...state.units[alUi] };
      const alTargetCity = state.cities[alTci];
      // Mark source city as having airlifted
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const alSrcCi = state.cities.findIndex(c => c.gx === alUnit.gx && c.gy === alUnit.gy && c.owner === civSlot && c.size > 0);
      if (alSrcCi >= 0) {
        state.cities[alSrcCi] = { ...state.cities[alSrcCi], airliftedThisTurn: true };
      }
      // Move unit to target city
      alUnit.gx = alTargetCity.gx;
      alUnit.gy = alTargetCity.gy;
      alUnit.x = alTargetCity.gx * 2 + (alTargetCity.gy % 2);
      alUnit.y = alTargetCity.gy;
      alUnit.movesLeft = 0;
      state.units[alUi] = alUnit;
      // Update visibility
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, alUnit.gx, alUnit.gy, mapBase.wraps);
      discoverContacts(state, mapBase, civSlot, alUnit.gx, alUnit.gy, 1);
      break;
    }

    case UPGRADE_UNIT: {
      const { unitIndex: upgUi } = action;
      const upgUnit = { ...state.units[upgUi] };
      const upgOldType = upgUnit.type;
      const upgTarget = UNIT_UPGRADE_TO[upgOldType];
      const oldCost = UNIT_COSTS[upgOldType] || 0;
      const newCost = UNIT_COSTS[upgTarget] || 0;
      const upgCost = Math.max(40, (newCost - oldCost) * 2);
      // Deduct gold
      state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
      const upgCiv = { ...state.civs[civSlot] };
      upgCiv.treasury = (upgCiv.treasury || 0) - upgCost;
      state.civs[civSlot] = upgCiv;
      // Upgrade the unit: change type, reset HP, keep veteran status
      upgUnit.type = upgTarget;
      upgUnit.hpLost = 0;
      upgUnit.movesLeft = 0; // uses the turn
      state.units[upgUi] = upgUnit;
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'unitUpgraded', civSlot, oldType: upgOldType, newType: upgTarget, cost: upgCost });
      break;
    }

    case ADJUST_ATTITUDE: {
      // AI diplomacy attitude adjustment — update civ's attitude toward another civ
      const { civSlot: attCiv, targetCiv: attTarget, delta: attDelta } = action;
      if (state.civs?.[attCiv]) {
        state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
        const updCiv = { ...state.civs[attCiv] };
        const oldAtt = updCiv.attitudes;
        const attitudes = Array.isArray(oldAtt) ? [...oldAtt] : [0, 0, 0, 0, 0, 0, 0, 0];
        if (!Array.isArray(oldAtt) && oldAtt) {
          // Merge object-style attitudes into array
          for (const [k, v] of Object.entries(oldAtt)) attitudes[+k] = v;
        }
        attitudes[attTarget] = Math.max(-100, Math.min(100, (attitudes[attTarget] || 0) + attDelta));
        updCiv.attitudes = attitudes;
        state.civs[attCiv] = updCiv;
      }
      break;
    }

    case END_TURN: {
      const endingCiv = state.turn.activeCiv;

      // ── Advance to next civ FIRST ──
      let next = endingCiv;
      let turnNumber = state.turn.number;
      for (let i = 0; i < 7; i++) {
        next = (next % 7) + 1;
        if (state.civsAlive & (1 << next)) break;
      }
      const firstAlive = findFirstAliveCiv(state.civsAlive);
      if (next <= endingCiv || next === firstAlive) {
        turnNumber++;
      }

      // ── Barbarian AI movement phase (runs once per full turn cycle) ──
      if (turnNumber > state.turn.number) {
        processBarbarianAI(state, prev, mapBase);
        processBarbCampProduction(state, mapBase);
      }

      state.turn = { activeCiv: next, number: turnNumber };

      // ── Begin-of-turn processing for the NEW active civ ──
      const activeCiv = next;

      // Reset movement for the new active civ's units + promote fortifying→fortified
      // Lighthouse (+1 MP sea), Magellan (+1 MP sea) — stack
      const seaBonus = (hasWonderEffect(state, activeCiv, 3) ? 1 : 0)
        + (hasWonderEffect(state, activeCiv, 12) ? 1 : 0);
      state.units = state.units.map(u => {
        if (u.owner !== activeCiv) return u;
        const orders = u.orders === 'fortifying' ? 'fortified' : u.orders;
        let mp = UNIT_MOVE_POINTS[u.type];
        if (seaBonus && UNIT_DOMAIN[u.type] === 1) mp += seaBonus;
        return { ...u, movesLeft: mp * MOVEMENT_MULTIPLIER, orders };
      });

      // ── Anarchy countdown ──
      if (state.civs?.[activeCiv]) {
        const civ = state.civs[activeCiv];
        if (civ.government === 'anarchy' && civ.anarchyTurns > 0) {
          state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
          const updCiv = { ...state.civs[activeCiv] };
          updCiv.anarchyTurns = updCiv.anarchyTurns - 1;
          if (updCiv.anarchyTurns <= 0) {
            updCiv.government = updCiv.pendingGovernment || 'despotism';
            delete updCiv.pendingGovernment;
            delete updCiv.anarchyTurns;
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({
              type: 'anarchyEnded', civSlot: activeCiv,
              government: updCiv.government,
            });
          }
          state.civs[activeCiv] = updCiv;
        }
      }

      // ── Process city resistance for the active civ ──
      state.cities = [...prev.cities];
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;
        if (city.resistanceTurns > 0) {
          state.cities[ci] = state.cities[ci] !== city ? state.cities[ci] : { ...city };
          // Count garrisoned military units (attack > 0)
          let garrison = 0;
          for (const u of state.units) {
            if (u.gx === city.gx && u.gy === city.gy && u.owner === city.owner && u.gx >= 0
                && (UNIT_ATK[u.type] || 0) > 0) {
              garrison++;
            }
          }
          // Decrement: 1 base + garrison bonus
          const resDec = 1 + garrison;
          state.cities[ci].resistanceTurns = Math.max(0, city.resistanceTurns - resDec);
        }
      }

      // ── Process cities for the active civ (happiness, food, production, support, disorder) ──
      // Delegated to processCityTurn() in cityturn.js which orchestrates:
      //   1. calcHappiness → update disorder/WLTKD
      //   2. Food processing (growth, famine, granary, aqueduct/sewer gates)
      //   3. Shield production & completion (units, buildings, wonders)
      //   4. Unit support deficit (disband most-distant units)
      //   5. Disorder check (democracy revolution risk)
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;

        const result = processCityTurn(ci, state, mapBase, {
          autoAssignWorker,
          removeWorstWorker,
        });

        // Emit all events from this city's turn processing
        if (result.events.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...result.events);
        }
      }

      // ── Famine elimination check: if a city was destroyed by famine, check if civ is eliminated ──
      checkCivElimination(state, activeCiv);

      // ── Pollution generation for the active civ's cities ──
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;
        if (city.resistanceTurns > 0) continue; // no production → no pollution
        const { netShields } = calcShieldProduction(city, ci, state, mapBase, state.units);
        let pollScore = Math.max(0, netShields - POLLUTION_THRESHOLD);
        // Population contribution: (population - 4) if no Mass Transit (building 13)
        if (!cityHasBuilding(city, 13)) {
          pollScore += Math.max(0, city.size - 4);
        }
        if (pollScore > 0 && Math.random() < pollScore / 100) {
          // Place pollution on a random land tile within city's 21-tile radius
          const parC = city.gy & 1;
          const landTiles = [];
          for (let ri = 0; ri < 21; ri++) {
            const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
            const parT = ((city.gy + ddy) % 2 + 2) % 2;
            const tgx = city.gx + ((parC + ddx - parT) >> 1);
            const tgy = city.gy + ddy;
            const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
            if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
            const ter = mapBase.getTerrain(wgx, tgy);
            if (ter === 10) continue; // skip ocean
            const imp = mapBase.getImprovements(wgx, tgy);
            if (imp.pollution) continue; // already polluted
            landTiles.push({ gx: wgx, gy: tgy });
          }
          if (landTiles.length > 0) {
            const pick = landTiles[Math.floor(Math.random() * landTiles.length)];
            const pollIdx = pick.gy * mapBase.mw + pick.gx;
            if (mapBase.tileData[pollIdx]) {
              mapBase.tileData[pollIdx].improvements = { ...mapBase.tileData[pollIdx].improvements, pollution: true };
            }
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'pollution', cityName: city.name, civSlot: activeCiv });
          }
        }
      }

      // ── Global warming check: 8+ pollution tiles → convert random coastal tile ──
      {
        let pollCount = 0;
        for (const tile of mapBase.tileData) {
          if (tile && tile.improvements && tile.improvements.pollution) pollCount++;
        }
        if (pollCount >= 8) {
          const coastalTiles = [];
          for (let gy = 0; gy < mapBase.mh; gy++) {
            for (let gx = 0; gx < mapBase.mw; gx++) {
              const ter = mapBase.getTerrain(gx, gy);
              if (ter === 10) continue;
              const neighbors = mapBase.getNeighbors(gx, gy);
              let coastal = false;
              for (const dir in neighbors) {
                const [nx, ny] = neighbors[dir];
                if (ny >= 0 && ny < mapBase.mh && mapBase.getTerrain(nx, ny) === 10) {
                  coastal = true; break;
                }
              }
              if (coastal) coastalTiles.push({ gx, gy, terrain: ter });
            }
          }
          if (coastalTiles.length > 0) {
            const gwPick = coastalTiles[Math.floor(Math.random() * coastalTiles.length)];
            const gwIdx = gwPick.gy * mapBase.mw + gwPick.gx;
            const gwTransform = { 1: 0, 2: 0, 3: 9, 4: 4, 5: 5, 6: 0, 7: 6, 8: 8, 9: 9 };
            const newTer = gwTransform[gwPick.terrain];
            if (newTer != null && mapBase.tileData[gwIdx]) {
              mapBase.tileData[gwIdx].terrain = newTer;
              if (!state.turnEvents) state.turnEvents = [];
              state.turnEvents.push({ type: 'globalWarming' });
            }
          }
        }
      }

      // ── Reset airlift flags for active civ's cities ──
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;
        if (city.airliftedThisTurn) {
          state.cities[ci] = { ...state.cities[ci], airliftedThisTurn: false };
        }
      }

      // ── Trade / Treasury / Science for the active civ ──
      let civTaxTotal = 0;
      let civSciTotal = 0;
      let civMaintenanceTotal = 0;
      let tradeRouteIncome = 0;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;
        if (city.resistanceTurns > 0) continue; // no trade during resistance
        const { tax, sci, maintenance } = calcCityTrade(city, ci, state, mapBase);
        civTaxTotal += tax;
        civSciTotal += sci;
        civMaintenanceTotal += maintenance;
        // Trade route income
        if (city.tradeRoutes) {
          for (const route of city.tradeRoutes) {
            const dest = state.cities[route.destCityIndex];
            if (dest && dest.size > 0) tradeRouteIncome += route.income;
          }
        }
      }

      // Update civ treasury and research progress
      if (state.civs && state.civs[activeCiv]) {
        state.civs = [...prev.civs];
        const civ = { ...state.civs[activeCiv] };
        civ.treasury = (civ.treasury || 0) + civTaxTotal + tradeRouteIncome - civMaintenanceTotal;

        // If treasury goes negative, sell cheapest-maintenance building to cover deficit
        while (civ.treasury < 0) {
          let cheapestId = -1, cheapestCost = Infinity, cheapestCi = -1;
          for (let sci = 0; sci < state.cities.length; sci++) {
            const sc = state.cities[sci];
            if (sc.owner !== activeCiv || sc.size <= 0 || !sc.buildings) continue;
            for (const bid of sc.buildings) {
              if (bid === 1) continue; // never sell Palace
              const maint = IMPROVE_MAINTENANCE[bid] || 0;
              if (maint > 0 && maint < cheapestCost) {
                cheapestCost = maint;
                cheapestId = bid;
                cheapestCi = sci;
              }
            }
          }
          if (cheapestId < 0) { civ.treasury = 0; break; }
          const sellCity = { ...state.cities[cheapestCi] };
          const sellBuildings = new Set(sellCity.buildings);
          sellBuildings.delete(cheapestId);
          sellCity.buildings = sellBuildings;
          sellCity.hasWalls = sellBuildings.has(8);
          sellCity.hasPalace = sellBuildings.has(1);
          state.cities[cheapestCi] = sellCity;
          civ.treasury += IMPROVE_COSTS[cheapestId] || 0;
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'buildingSold', cityName: sellCity.name, cityIndex: cheapestCi,
            civSlot: activeCiv, buildingId: cheapestId,
          });
        }

        civ.researchProgress = (civ.researchProgress || 0) + civSciTotal;

        // ── Research completion check ──
        const techId = civ.techBeingResearched;
        if (techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length) {
          const cost = calcResearchCost(state, activeCiv);
          if (civ.researchProgress >= cost) {
            // Grant the advance
            grantAdvance(state, activeCiv, techId);
            civ.researchProgress = 0;
            civ.techBeingResearched = 0xFF; // clear — player must pick next
            // Notify via discoveredAdvance field (client will show picker)
            state.discoveredAdvance = { civSlot: activeCiv, advanceId: techId };
            // Phase G: handle tech discovery effects (barracks refund, wonder obsolescence, Leonardo's)
            const techEvents = handleTechDiscovery(state, activeCiv, techId);
            if (techEvents.length > 0) {
              if (!state.turnEvents) state.turnEvents = [];
              state.turnEvents.push(...techEvents);
            }
            // Sync treasury in case handleTechDiscovery modified it (barracks refund)
            civ.treasury = state.civs[activeCiv]?.treasury ?? civ.treasury;
            // Scenario events: tech discovered
            if (state.scenarioEvents && state.scenarioEvents.length > 0) {
              dispatchEvents(state, mapBase, EVENT_RECEIVED_TECH, { civSlot: activeCiv, techId });
            }
            console.log(`[tech] Civ ${activeCiv} discovered ${ADVANCE_NAMES[techId]} (id=${techId}), civTechs now:`, [...state.civTechs[activeCiv]]);
          }
        }

        state.civs[activeCiv] = civ;
      }

      // ── Great Library: auto-grant techs known by 2+ other civs ──
      if (hasWonderEffect(state, activeCiv, 4)) {
        const myTechs = state.civTechs?.[activeCiv];
        if (myTechs) {
          for (let advId = 0; advId < ADVANCE_NAMES.length; advId++) {
            if (myTechs.has(advId)) continue;
            let count = 0;
            for (let c = 1; c < 8; c++) {
              if (c === activeCiv || !(state.civsAlive & (1 << c))) continue;
              if (state.civTechs[c]?.has(advId)) count++;
            }
            if (count >= 2) {
              grantAdvance(state, activeCiv, advId);
              if (!state.turnEvents) state.turnEvents = [];
              state.turnEvents.push({ type: 'freeAdvance', civSlot: activeCiv, advanceId: advId, source: 'Great Library' });
            }
          }
        }
      }

      // ── Leonardo's Workshop: auto-upgrade obsolete units ──
      // Primary upgrade happens in handleTechDiscovery() at discovery time.
      // This per-turn sweep catches edge cases (e.g., capturing Leonardo's after
      // having the obsoleting tech, or loading a save with stale unit types).
      if (hasWonderEffect(state, activeCiv, 14)) {
        const techs = state.civTechs?.[activeCiv];
        if (techs) {
          for (const t of techs) {
            const leoEvents = upgradeUnitsForTech(state, activeCiv, t);
            if (leoEvents.length > 0) {
              if (!state.turnEvents) state.turnEvents = [];
              state.turnEvents.push(...leoEvents);
            }
          }
        }
      }

      // ── Process unit orders for active civ (worker progress, HP recovery) ──
      for (let ui = 0; ui < state.units.length; ui++) {
        const u = state.units[ui];
        if (u.owner !== activeCiv || u.gx < 0) continue;

        // HP recovery: units not in combat heal 1 HP per turn (in city: 2 HP)
        if (u.hpLost > 0) {
          const inCity = state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner);
          const healAmt = inCity ? 2 : 1;
          const newHpLost = Math.max(0, u.hpLost - healAmt);
          if (newHpLost !== u.hpLost) {
            state.units[ui] = { ...u, hpLost: newHpLost };
          }
        }

        // Air unit fuel: decrement when away from city/carrier/airbase, crash at 0
        const maxFuel = UNIT_FUEL[u.type];
        if (maxFuel > 0) {
          const fuelTileIdx = u.gy * mapBase.mw + u.gx;
          const fuelTile = mapBase.tileData?.[fuelTileIdx];
          const onAirbase = fuelTile && fuelTile.improvements && fuelTile.improvements.airbase;
          const atBase = onAirbase
            || state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner)
            || state.units.some((v, vi) => vi !== ui && v.gx === u.gx && v.gy === u.gy
              && v.owner === u.owner && v.type === 42 && v.gx >= 0);
          if (atBase) {
            if ((u.fuelRemaining ?? maxFuel) !== maxFuel)
              state.units[ui] = { ...state.units[ui], fuelRemaining: maxFuel };
          } else {
            const fuel = (state.units[ui].fuelRemaining ?? maxFuel) - 1;
            if (fuel <= 0) {
              killUnit(state, ui);
              if (!state.turnEvents) state.turnEvents = [];
              state.turnEvents.push({ type: 'unitLost', unitType: u.type, reason: 'fuel', civSlot: activeCiv });
            } else {
              state.units[ui] = { ...state.units[ui], fuelRemaining: fuel };
            }
          }
          continue; // air units don't do worker orders
        }

        // Worker orders: road, irrigation, mine, fortress, airbase, pollution, railroad
        const workerOrders = ['road', 'railroad', 'irrigation', 'mine', 'fortress', 'airbase', 'pollution'];
        if (workerOrders.includes(u.orders)) {
          const terrain = mapBase.getTerrain(u.gx, u.gy);
          const isEngineer = u.type === 1;
          const newWorkTurns = (u.workTurns || 0) + 1;
          let turnsNeeded;

          switch (u.orders) {
            case 'road': turnsNeeded = ROAD_TURNS; break;
            case 'railroad': turnsNeeded = ROAD_TURNS; break;
            case 'irrigation': turnsNeeded = IRRIGATION_TURNS[terrain] || 5; break;
            case 'mine': turnsNeeded = MINING_TURNS[terrain] || 5; break;
            case 'fortress': turnsNeeded = FORTRESS_TURNS; break;
            case 'airbase': turnsNeeded = AIRBASE_TURNS; break;
            case 'pollution': turnsNeeded = POLLUTION_TURNS; break;
            default: turnsNeeded = 999;
          }

          // Engineers work at 2× speed
          if (isEngineer) turnsNeeded = Math.max(1, Math.ceil(turnsNeeded / 2));

          if (newWorkTurns >= turnsNeeded) {
            // Complete the improvement
            completeWorkerOrder(u.orders, u.gx, u.gy, terrain, mapBase);
            state.units[ui] = { ...u, orders: 'none', workTurns: 0 };
          } else {
            state.units[ui] = { ...u, workTurns: newWorkTurns };
          }
        }

        // Transform terrain order (Engineers only)
        if (u.orders === 'transform' && u.type === 1) {
          const tfTerrain = mapBase.getTerrain(u.gx, u.gy);
          const tfTarget = TERRAIN_TRANSFORM[tfTerrain];
          const tfTurnsNeeded = Math.max(1, Math.ceil((TRANSFORM_TURNS[tfTerrain] || 10) / 2)); // Engineers work at 2x speed
          const tfWorked = (u.turnsWorked || 0) + 1;
          if (tfWorked >= tfTurnsNeeded && tfTarget >= 0) {
            // Transform complete
            const tfTileIdx = u.gy * mapBase.mw + u.gx;
            if (mapBase.tileData[tfTileIdx]) {
              mapBase.tileData[tfTileIdx].terrain = tfTarget;
              // Clear improvements that don't apply to new terrain
              mapBase.tileData[tfTileIdx].improvements = {
                ...mapBase.tileData[tfTileIdx].improvements,
                irrigation: false,
                mining: false,
                farmland: false,
              };
            }
            state.units[ui] = { ...u, orders: 'none', turnsWorked: 0 };
          } else {
            state.units[ui] = { ...u, turnsWorked: tfWorked, movesLeft: 0 };
          }
        }

        // GOTO continuation: units with goto orders continue moving next turn
        if (u.orders === 'goto' && u.goToX != null && u.goToY != null && u.movesLeft > 0) {
          const gtTargetGx = u.goToX;
          const gtTargetGy = u.goToY;
          // Already at destination?
          if (u.gx === gtTargetGx && u.gy === gtTargetGy) {
            state.units[ui] = { ...u, orders: 'none', goToX: undefined, goToY: undefined };
          } else {
            // Use A* pathfinding to compute optimal path each step
            let gtCurUnit = { ...u };
            let gtMoved = false;
            while (gtCurUnit.movesLeft > 0 && gtCurUnit.gx >= 0) {
              // Re-compute path from current position (handles dynamic obstacles)
              const gtPath = findPath(gtCurUnit.type, gtCurUnit.gx, gtCurUnit.gy, gtTargetGx, gtTargetGy, mapBase, gtCurUnit.owner, state.units, state.cities);
              if (!gtPath || gtPath.length === 0) break; // no path or already there

              // Take only the first step of the computed path
              const gtDir = gtPath[0];
              const gtNextDest = resolveDirection(gtCurUnit.gx, gtCurUnit.gy, gtDir, mapBase);
              if (!gtNextDest) break;
              const gtMoveCostVal = moveCost(gtCurUnit.type, mapBase, gtCurUnit.gx, gtCurUnit.gy, gtNextDest.gx, gtNextDest.gy);
              if (gtMoveCostVal < 0) break;
              const gtActual = Math.max(gtMoveCostVal, 1);
              gtCurUnit = {
                ...gtCurUnit,
                gx: gtNextDest.gx, gy: gtNextDest.gy,
                x: gtNextDest.gx * 2 + (gtNextDest.gy % 2), y: gtNextDest.gy,
                movesLeft: Math.max(0, gtCurUnit.movesLeft - gtActual),
              };
              gtMoved = true;
              // Update visibility
              if (mapBase.tileData) {
                updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, activeCiv, gtNextDest.gx, gtNextDest.gy, mapBase.wraps);
                discoverContacts(state, mapBase, activeCiv, gtNextDest.gx, gtNextDest.gy, 1);
              }
              // Check goody hut
              const gtHutIdx = gtNextDest.gy * mapBase.mw + gtNextDest.gx;
              const gtHutTile = mapBase.tileData?.[gtHutIdx];
              if (gtHutTile && gtHutTile.goodyHut && activeCiv > 0) {
                gtHutTile.goodyHut = false;
                const gtHutResult = resolveGoodyHut(state, mapBase, gtCurUnit, activeCiv);
                if (gtHutResult) state.goodyHutResult = { ...gtHutResult, civSlot: activeCiv };
                break;
              }
              // Reached destination?
              if (gtNextDest.gx === gtTargetGx && gtNextDest.gy === gtTargetGy) {
                gtCurUnit.orders = 'none';
                gtCurUnit.goToX = undefined;
                gtCurUnit.goToY = undefined;
                break;
              }
            }
            if (gtMoved) {
              state.units[ui] = gtCurUnit;
            }
          }
        }
      }

      // ── Barbarian spawning phase (runs once per full turn cycle) ──
      // turnNumber was incremented above when activeCiv wraps back to firstAlive
      if (turnNumber > (prev.turn?.number || 0)) {
        spawnBarbarians(state, mapBase);
        // ── Scenario events: TURN, TURN_INTERVAL, RANDOM_TURN triggers ──
        if (state.scenarioEvents && state.scenarioEvents.length > 0) {
          dispatchEvents(state, mapBase, EVENT_TURN, { turn: turnNumber });
          dispatchEvents(state, mapBase, EVENT_TURN_INTERVAL, { turn: turnNumber });
          dispatchEvents(state, mapBase, EVENT_RANDOM_TURN, { turn: turnNumber });
        }
      }

      // ── Game end conditions (Phase I): conquest, spaceship, retirement ──
      if (!state.gameOver) {
        const endResult = checkGameEndConditions(state);
        if (endResult && endResult.ended) {
          state.gameOver = { winner: endResult.winner, reason: endResult.reason };
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'gameOver', winner: endResult.winner,
            reason: endResult.reason,
            ...(endResult.score != null ? { score: endResult.score } : {}),
            ...(endResult.year != null ? { year: endResult.year } : {}),
            ...(endResult.successProb != null ? { successProb: endResult.successProb } : {}),
          });
        }
      }

      break;
    }

    default:
      return prev;
  }

  state.version = (prev.version || 0) + 1;
  return state;
}

/**
 * Barbarian spawning phase: land units, sea units, and camp founding.
 * Called once per full turn cycle (when turn number increments).
 */
function spawnBarbarians(state, mapBase) {
  const activity = state.barbarianActivity || 'none';
  const freq = BARBARIAN_SPAWN_FREQUENCY[activity];
  if (!freq || activity === 'none') return;

  const turnNum = state.turn.number;
  if (turnNum < BARBARIAN_MIN_TURN) return;

  // Count existing barbarian units on the map
  let barbCount = 0;
  for (const u of state.units) {
    if (u.owner === 0 && u.gx >= 0) barbCount++;
  }

  // ── Land barbarian spawning ──
  if (turnNum % freq === 0 && barbCount < BARBARIAN_MAX_UNITS) {
    const spawnLoc = findBarbSpawnTile(state, mapBase, /* land */ true);
    if (spawnLoc) {
      const unitType = getBarbUnitType(state);
      const spawnCount = 1 + Math.floor(Math.random() * 3); // 1-3

      // Ensure units array is a fresh clone before pushing
      state.units = [...state.units];

      let actualSpawned = 0;
      for (let s = 0; s < spawnCount && barbCount + actualSpawned < BARBARIAN_MAX_UNITS; s++) {
        state.units.push(makeUnit(
          unitType, 0, spawnLoc.gx, spawnLoc.gy,
          UNIT_MOVE_POINTS[unitType] * MOVEMENT_MULTIPLIER
        ));
        actualSpawned++;
      }

      if (actualSpawned > 0) {
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({ type: 'barbarianSpawn', count: actualSpawned, gx: spawnLoc.gx, gy: spawnLoc.gy });
        barbCount += actualSpawned;
      }
    }
  }

  // ── Sea barbarian spawning (same frequency, separate check) ──
  if (turnNum % freq === 0 && barbCount < BARBARIAN_MAX_UNITS && !mapBase.wraps) {
    const seaLoc = findBarbSeaSpawnTile(mapBase);
    if (seaLoc) {
      const seaType = getBarbSeaUnitType(state);
      const seaCount = 1 + Math.floor(Math.random() * 2); // 1-2

      let actualSeaSpawned = 0;
      for (let s = 0; s < seaCount && barbCount + actualSeaSpawned < BARBARIAN_MAX_UNITS; s++) {
        state.units.push(makeUnit(
          seaType, 0, seaLoc.gx, seaLoc.gy,
          UNIT_MOVE_POINTS[seaType] * MOVEMENT_MULTIPLIER
        ));
        actualSeaSpawned++;
      }

      if (actualSeaSpawned > 0) {
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({ type: 'barbarianSpawn', count: actualSeaSpawned, gx: seaLoc.gx, gy: seaLoc.gy });
        barbCount += actualSeaSpawned;
      }
    }
  }

  // ── Camp founding (every 64 turns, 25% chance) ──
  if (turnNum % 64 === 0 && Math.random() < 0.25) {
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
 * Find a random unexplored land tile for barbarian spawning.
 * Unexplored = visibility byte has NO bits set for any alive civ (slots 1-7).
 * Must be land (terrain !== 10), not in/adjacent to a city.
 * Tries up to 100 random positions.
 */
function findBarbSpawnTile(state, mapBase, _land) {
  const { mw, mh, tileData } = mapBase;
  if (!tileData) return null;

  // Build alive-civ visibility mask (bits 1-7)
  let aliveMask = 0;
  for (let c = 1; c < 8; c++) {
    if (state.civsAlive & (1 << c)) aliveMask |= (1 << c);
  }

  for (let attempt = 0; attempt < 100; attempt++) {
    const gx = Math.floor(Math.random() * mw);
    const gy = Math.floor(Math.random() * mh);
    const idx = gy * mw + gx;
    const tile = tileData[idx];
    if (!tile) continue;

    // Must be land
    if (tile.terrain === 10) continue;

    // Must be unexplored by all alive civs
    if ((tile.visibility & aliveMask) !== 0) continue;

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
function findBarbSeaSpawnTile(mapBase) {
  const { mw, mh, tileData } = mapBase;
  if (!tileData) return null;

  for (let attempt = 0; attempt < 100; attempt++) {
    let gx, gy;
    // Pick a random edge: 0=top, 1=bottom, 2=left, 3=right
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
      case 0: gx = Math.floor(Math.random() * mw); gy = 0; break;
      case 1: gx = Math.floor(Math.random() * mw); gy = mh - 1; break;
      case 2: gx = 0; gy = Math.floor(Math.random() * mh); break;
      case 3: gx = mw - 1; gy = Math.floor(Math.random() * mh); break;
    }
    const idx = gy * mw + gx;
    const tile = tileData[idx];
    if (!tile) continue;
    if (tile.terrain !== 10) continue; // must be ocean
    return { gx, gy };
  }
  return null;
}

function findFirstAliveCiv(civsAlive) {
  for (let i = 1; i < 8; i++) {
    if (civsAlive & (1 << i)) return i;
  }
  return 1;
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
function captureCity(state, prev, mapBase, cityIndex, newOwner, oldOwner, opts = {}) {
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

/** Mark a unit dead (gx=-1). */
function killUnit(state, idx) {
  const u = state.units[idx];
  if (u.gx < 0) return;
  state.units[idx] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
}

/** Check if a civ has no cities and no alive units → eliminate. */
function checkCivElimination(state, civSlot) {
  if (civSlot <= 0 || !(state.civsAlive & (1 << civSlot))) return;
  const hasUnit = state.units.some(u => u.owner === civSlot && u.gx >= 0);
  const hasCity = state.cities.some(c => c.owner === civSlot && c.size > 0);
  if (!hasUnit && !hasCity) {
    state.civsAlive &= ~(1 << civSlot);
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
function checkGameOver(state) {
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
    state.gameOver = { winner: lastAlive };
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'gameOver', winner: lastAlive });
  }
}

/** Rehome units whose home city was destroyed. Assign to nearest own city or 0xFFFF. */
function rehomeUnits(state, destroyedCityIdx, owner) {
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

// ═══════════════════════════════════════════════════════════════════
// Barbarian AI — runs once per full turn cycle
// ═══════════════════════════════════════════════════════════════════

const BARB_DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/**
 * Manhattan distance accounting for horizontal wrapping.
 */
function barbDist(gx1, gy1, gx2, gy2, mapBase) {
  let dx = Math.abs(gx1 - gx2);
  if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
  return dx + Math.abs(gy1 - gy2);
}

/**
 * Process all barbarian (owner === 0) unit movement and combat.
 * Called once per full turn cycle when turnNumber increments.
 */
function processBarbarianAI(state, prev, mapBase) {
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
          const j = Math.floor(Math.random() * (i + 1));
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

        const barbCombatSeed = (attacker.gx * 997 + attacker.gy * 991 + chosenDest.gx * 983 +
          chosenDest.gy * 977 + ui * 967 + bestDefIdx * 953 + (state.turn?.number || 0) * 941 +
          (state.version || 0) * 929);
        const barbCombatOpts = {
          defenderHasGreatWall: barbDefenderHasGreatWall,
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
              hpLost: result.atkHpLost,
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
              hpLost: result.atkHpLost,
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
            hpLost: result.defHpLost,
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
function spawnBarbarianUprising(state, mapBase, cityGx, cityGy) {
  const activity = state.barbarianActivity || 'none';
  if (activity === 'none') return;

  const unitType = getBarbUnitType(state);
  const count = 2 + Math.floor(Math.random() * 3); // 2-4

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
    const j = Math.floor(Math.random() * (i + 1));
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
function processBarbCampProduction(state, mapBase) {
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
    // unitCost is already base×10; production threshold is unitCost * MOVEMENT_MULTIPLIER
    if (camp.shieldsInBox >= unitCost * MOVEMENT_MULTIPLIER && barbCount < BARBARIAN_MAX_UNITS) {
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
function barbCanEnter(gx, gy, domain, state, mapBase) {
  const terrain = mapBase.getTerrain(gx, gy);
  if (domain === 0 && terrain === 10) return false;
  if (domain === 1 && terrain !== 10) return false;
  // Barbarian units are allowed to stack on the same tile (no stacking check)
  if (state.cities.some(c => c.gx === gx && c.gy === gy && c.owner === 0 && c.size > 0)) return false;
  return true;
}
