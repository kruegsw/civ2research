// ═══════════════════════════════════════════════════════════════════
// reducer.js — Authoritative state transitions (shared: server + client)
//
// The ONLY code that mutates game state. The server calls
// applyAction(gameState, mapBase, action) for every validated action.
// Returns a new state object if valid, or the same reference if rejected.
//
// Never mutates the input state directly — clones first.
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from './rules.js';
import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, CHANGE_RATES, SET_RESEARCH, UNIT_ORDER, WORKER_ORDER, REVOLUTION } from './actions.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, CITY_RADIUS_DOUBLED, TERRAIN_BASE, IRRIGATION_BONUS, MINING_BONUS, CIV_CITY_NAMES, BARBARIAN_CITY_NAMES, IMPROVE_COSTS, SHIELD_BOX_FACTOR, ADVANCE_NAMES, UNIT_NAMES, UNIT_PREREQS, UNIT_OBSOLETE, IRRIGATION_TURNS, MINING_TURNS, ROAD_TURNS, FORTRESS_TURNS, AIRBASE_TURNS, POLLUTION_TURNS, CAN_IRRIGATE, IRR_TRANSFORM, CAN_MINE, MINE_TRANSFORM } from './defs.js';
import { calcResearchCost, grantAdvance, getAvailableResearch } from './research.js';
import { resolveDirection, moveCost } from './movement.js';
import { updateVisibility } from './visibility.js';
import { calcFoodSurplus, foodToGrow, calcShieldProduction, getProductionCost, calcCityTrade } from './production.js';
import { calcHappiness, calcRushBuyCost } from './happiness.js';
import { resolveCombat } from './combat.js';
import { cityHasBuilding } from './utils.js';

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
    case 'railroad':  imp.rail = true; break;
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
 * Auto-assign one more worker to the best available tile.
 * Returns new workedTiles array (or same reference if no tile available).
 */
function tileScore(ter, imp) {
  const base = TERRAIN_BASE[ter] || [0, 0, 0];
  let food = base[0], shields = base[1], trade = base[2];
  if (imp) {
    if (imp.road) trade += 1;
    if (imp.irrigation && IRRIGATION_BONUS[ter]) food += IRRIGATION_BONUS[ter];
    if (imp.mining) shields += (MINING_BONUS[ter] || 0);
  }
  return food * 100 + shields * 10 + trade; // food >> shields >> trade
}

function autoAssignWorker(city, workedTiles, mapBase) {
  const worked = new Set(workedTiles);
  const parC = city.gy & 1;
  let bestIdx = -1, bestScore = -1;
  for (let i = 0; i < 20; i++) {
    if (worked.has(i)) continue;
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
    const parT = ((city.gy + ddy) % 2 + 2) % 2;
    const tgx = city.gx + ((parC + ddx - parT) >> 1);
    const tgy = city.gy + ddy;
    const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
    const ter = mapBase.getTerrain(wgx, tgy);
    if (ter < 0 || ter > 10) continue;
    const imp = mapBase.getImprovements(wgx, tgy);
    const score = tileScore(ter, imp);
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  }
  if (bestIdx < 0) return workedTiles;
  return [...workedTiles, bestIdx];
}

/**
 * Remove the worst worker (lowest yield tile). Returns new workedTiles array.
 */
function removeWorstWorker(city, workedTiles, mapBase) {
  if (workedTiles.length === 0) return workedTiles;
  const parC = city.gy & 1;
  let worstIdx = 0, worstScore = Infinity;
  for (let w = 0; w < workedTiles.length; w++) {
    const i = workedTiles[w];
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
    const parT = ((city.gy + ddy) % 2 + 2) % 2;
    const tgx = city.gx + ((parC + ddx - parT) >> 1);
    const tgy = city.gy + ddy;
    const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) {
      worstIdx = w; break; // off-map tile is definitely worst
    }
    const ter = mapBase.getTerrain(wgx, tgy);
    const imp = mapBase.getImprovements(wgx, tgy);
    const score = tileScore(ter, imp);
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
 * Assign initial workers for a new city. Evaluates all 21 radius tiles
 * and picks the best N tiles (by food, then shields) for workers.
 * Returns workedTiles: number[] (tile indices 0-19).
 */
function assignInitialWorkers(gx, gy, size, mapBase) {
  const parC = gy & 1;
  const scores = [];
  for (let i = 0; i < 20; i++) { // indices 0-19 (not 20=center, always worked)
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
    const parT = ((gy + ddy) % 2 + 2) % 2;
    const tgx = gx + ((parC + ddx - parT) >> 1);
    const tgy = gy + ddy;
    const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
    const ter = mapBase.getTerrain(wgx, tgy);
    if (ter < 0 || ter > 10) continue; // skip ocean
    const imp = mapBase.getImprovements(wgx, tgy);
    scores.push({ i, score: tileScore(ter, imp) });
  }
  scores.sort((a, b) => b.score - a.score);

  const toPlace = Math.min(size, scores.length);
  return scores.slice(0, toPlace).map(s => s.i);
}

// ── Goody hut (tribal village) outcomes ──

// Units that can be gifted by huts: non-obsolete land military units the civ can build
function getHutUnitCandidates(state, civSlot) {
  const civTechs = state.civTechs?.[civSlot];
  const hasTech = (id) => id < 0 || (civTechs ? civTechs.has(id) : false);
  const candidates = [];
  // Land military units only (domain 0, not settlers/diplomats/caravans)
  const EXCLUDED = new Set([0, 1, 46, 47, 48, 49, 50]); // Settlers, Engineers, Diplomat, Spy, Caravan, Freight, Explorer
  for (let id = 2; id < UNIT_NAMES.length; id++) {
    if (!UNIT_NAMES[id]) continue;
    if (EXCLUDED.has(id)) continue;
    if (UNIT_DOMAIN[id] !== 0) continue; // land only
    const prereq = UNIT_PREREQS[id] ?? -1;
    const obsolete = UNIT_OBSOLETE[id] ?? -1;
    if (prereq === -2) continue;
    if (prereq >= 0 && !hasTech(prereq)) continue;
    if (obsolete >= 0 && hasTech(obsolete)) continue;
    candidates.push(id);
  }
  return candidates;
}

/**
 * Resolve a goody hut encounter. Called when a non-barbarian unit enters a hut tile.
 * Returns { type, ... } describing the outcome, or null if no hut.
 *
 * Civ2 outcomes:
 *   gold      — 25 or 50 gold
 *   tech      — free advance from available research
 *   unit      — mercenary military unit spawns
 *   nomads    — free settlers unit
 *   barbarians — barbarian warriors spawn nearby
 *   nothing   — empty hut
 */
function resolveGoodyHut(state, mapBase, unit, civSlot) {
  // Roll outcome (weighted to approximate Civ2 distribution)
  const roll = Math.random() * 100;
  let outcome;
  if (roll < 30) outcome = 'gold';
  else if (roll < 50) outcome = 'unit';
  else if (roll < 65) outcome = 'tech';
  else if (roll < 72) outcome = 'nomads';
  else if (roll < 90) outcome = 'barbarians';
  else outcome = 'nothing';

  // Non-combat units (settlers, diplomats, caravans) never trigger barbarians
  const NONCOMBAT = new Set([0, 1, 46, 47, 48, 49, 50]);
  if (outcome === 'barbarians' && NONCOMBAT.has(unit.type)) outcome = 'gold';

  switch (outcome) {
    case 'gold': {
      const amount = Math.random() < 0.5 ? 25 : 50;
      if (state.civs && state.civs[civSlot]) {
        state.civs = state.civs.map((c, i) => i === civSlot ? { ...c, treasury: (c.treasury || 0) + amount } : c);
      }
      return { type: 'gold', amount };
    }

    case 'tech': {
      const available = getAvailableResearch(state, civSlot);
      if (available.length === 0) {
        // No tech available — give gold instead
        const amount = 50;
        if (state.civs && state.civs[civSlot]) {
          state.civs = state.civs.map((c, i) => i === civSlot ? { ...c, treasury: (c.treasury || 0) + amount } : c);
        }
        return { type: 'gold', amount };
      }
      const techId = available[Math.floor(Math.random() * available.length)];
      grantAdvance(state, civSlot, techId);
      return { type: 'tech', advanceId: techId, advanceName: ADVANCE_NAMES[techId] };
    }

    case 'unit': {
      const candidates = getHutUnitCandidates(state, civSlot);
      if (candidates.length === 0) {
        return { type: 'gold', amount: 25 }; // fallback
      }
      const unitType = candidates[Math.floor(Math.random() * candidates.length)];
      const newUnit = {
        type: unitType,
        owner: civSlot,
        gx: unit.gx, gy: unit.gy,
        x: unit.gx * 2 + (unit.gy % 2), y: unit.gy,
        veteran: 0, hpLost: 0, orders: 'none',
        movesMade: 0, movesLeft: 0, // no moves this turn
        homeCityId: 0xFFFF,
        goToX: -1, goToY: -1, visFlag: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      };
      state.units = [...state.units, newUnit];
      return { type: 'unit', unitType, unitName: UNIT_NAMES[unitType] };
    }

    case 'nomads': {
      const settler = {
        type: 0, // Settlers
        owner: civSlot,
        gx: unit.gx, gy: unit.gy,
        x: unit.gx * 2 + (unit.gy % 2), y: unit.gy,
        veteran: 0, hpLost: 0, orders: 'none',
        movesMade: 0, movesLeft: 0, // no moves this turn
        homeCityId: 0xFFFF,
        goToX: -1, goToY: -1, visFlag: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      };
      state.units = [...state.units, settler];
      return { type: 'nomads' };
    }

    case 'barbarians': {
      // Spawn 1-3 barbarian warriors adjacent to the hut
      const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const count = 1 + Math.floor(Math.random() * 3); // 1-3
      let spawned = 0;
      // Shuffle directions
      for (let i = dirs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
      }
      for (const dir of dirs) {
        if (spawned >= count) break;
        const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
        if (!dest) continue;
        const ter = mapBase.getTerrain(dest.gx, dest.gy);
        if (ter === 10) continue; // not on ocean
        // Don't spawn on cities
        if (state.cities.some(c => c.gx === dest.gx && c.gy === dest.gy && c.size > 0)) continue;
        const barb = {
          type: 2, // Warriors
          owner: 0, // Barbarians
          gx: dest.gx, gy: dest.gy,
          x: dest.gx * 2 + (dest.gy % 2), y: dest.gy,
          veteran: 0, hpLost: 0, orders: 'none',
          movesMade: 0, movesLeft: UNIT_MOVE_POINTS[2] * MOVEMENT_MULTIPLIER,
          homeCityId: 0xFFFF,
          goToX: -1, goToY: -1, visFlag: 0xFF,
          commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
          prevInStack: -1, nextInStack: -1,
        };
        state.units = Array.isArray(state.units) ? [...state.units, barb] : [barb];
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
        // Find best defender (highest effective defense)
        const defTerrain = mapBase.getTerrain(dest.gx, dest.gy);
        const defCity = state.cities.find(c => c.gx === dest.gx && c.gy === dest.gy && c.owner !== unit.owner);
        const defInCity = !!defCity;
        const defCityHasWalls = defInCity && cityHasBuilding(defCity, 8);
        const defImp = mapBase.getImprovements(dest.gx, dest.gy);
        const defHasFortress = !!(defImp && defImp.fortress);
        const defOnRiver = !!(mapBase.hasRiver && mapBase.hasRiver(dest.gx, dest.gy));

        // Pick the defender with highest raw defense × HP
        let bestDefIdx = enemiesAtDest[0];
        let bestDefScore = 0;
        for (const ei of enemiesAtDest) {
          const eu = state.units[ei];
          const defVal = (UNIT_HP[eu.type] || 1) - (eu.hpLost || 0);
          const score = defVal * 100 + (eu.orders === 'fortified' ? 50 : 0);
          if (score > bestDefScore) { bestDefScore = score; bestDefIdx = ei; }
        }

        const defender = { ...state.units[bestDefIdx] };
        const result = resolveCombat(unit, defender, defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver);

        const defOwner = defender.owner;

        if (result.attackerWins) {
          // Defender destroyed
          killUnit(state, bestDefIdx);

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
                const captured = { ...defCity,
                  owner: unit.owner,
                  size: Math.max(1, defCity.size - 1),
                  civilDisorder: false, weLoveKingDay: false, soldThisTurn: false,
                  specialists: [],
                };
                captured.workedTiles = captured.workedTiles.length > captured.size
                  ? captured.workedTiles.slice(0, captured.size) : captured.workedTiles;
                state.cities[ci] = captured;
                // Rehome captured city's units to nearest own city
                rehomeUnits(state, ci, defOwner);
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
        };

        // Check civ elimination for the losing side
        checkCivElimination(state, result.attackerWins ? defOwner : unit.owner);
      } else {
        // ── Normal movement (no enemy) ──
        const cost = moveCost(unit.type, mapBase, unit.gx, unit.gy, dest.gx, dest.gy);

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

        state.units[unitIndex] = unit;
      }

      // Update visibility for this civ around new position
      if (unit.gx >= 0) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, unit.gx, unit.gy, mapBase.wraps);
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

      break;
    }

    case BUILD_CITY: {
      const { unitIndex } = action;
      const unit = state.units[unitIndex];

      // Compute initial worker placement for size-1 city
      const workedTiles = assignInitialWorkers(unit.gx, unit.gy, 1, mapBase);

      // Create city at settler's position
      const isFirstCity = prev.cities.filter(c => c.owner === unit.owner).length === 0;
      const buildings = new Set();
      if (isFirstCity) buildings.add(1); // Palace
      const newCity = {
        name: getCityName(unit.owner, prev.cities, prev.civs),
        owner: unit.owner,
        originalOwner: unit.owner,
        size: 1,
        gx: unit.gx, gy: unit.gy,
        cx: unit.gx * 2 + (unit.gy % 2), cy: unit.gy,
        hasWalls: false, hasPalace: isFirstCity,
        civilDisorder: false, weLoveKingDay: false, isOccupied: false,
        workedTiles,
        specialists: [],
        buildings,
        foodInBox: 0, shieldsInBox: 0,
        itemInProduction: { type: 'unit', id: 2 }, // default: Warriors
      };
      state.cities = [...prev.cities, newCity];

      // Remove settler (mark as dead)
      state.units[unitIndex] = { ...unit, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };

      // Mark tile as city (road/railroad connectivity + renderer needs this)
      const cityTileIdx = newCity.gy * mapBase.mw + newCity.gx;
      if (mapBase.tileData[cityTileIdx]) {
        mapBase.tileData[cityTileIdx].improvements = {
          ...mapBase.tileData[cityTileIdx].improvements,
          city: true, road: true,
        };
      }

      // Update visibility with city radius (cities have radius 2)
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, newCity.gx, newCity.gy, mapBase.wraps, 2);

      // Notify client
      state.cityFounded = { name: newCity.name, cityIndex: state.cities.length - 1, civSlot };

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
      civ.government = 'anarchy';
      // 1-4 turns of anarchy (random)
      civ.anarchyTurns = 1 + Math.floor(Math.random() * 4);
      civ.pendingGovernment = government;
      state.civs[civSlot] = civ;
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

      state.turn = { activeCiv: next, number: turnNumber };

      // ── Begin-of-turn processing for the NEW active civ ──
      const activeCiv = next;

      // Reset movement for the new active civ's units + promote fortifying→fortified
      state.units = state.units.map(u => {
        if (u.owner !== activeCiv) return u;
        const orders = u.orders === 'fortifying' ? 'fortified' : u.orders;
        return { ...u, movesLeft: UNIT_MOVE_POINTS[u.type] * MOVEMENT_MULTIPLIER, orders };
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

      // ── Compute happiness for all active civ's cities ──
      state.cities = [...prev.cities];
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;
        const hap = calcHappiness(city, ci, state, mapBase);
        if (city.civilDisorder !== hap.civilDisorder ||
            city.weLoveKingDay !== hap.weLoveKingDay) {
          state.cities[ci] = {
            ...city,
            civilDisorder: hap.civilDisorder,
            weLoveKingDay: hap.weLoveKingDay,
          };
        }
      }

      // ── Process cities for the active civ (food, shields, production) ──
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;

        // ── Food ──
        const { surplus } = calcFoodSurplus(city, ci, state, mapBase, state.units);
        let newFood = (city.foodInBox || 0) + surplus;
        let newSize = city.size;
        let newWorked = city.workedTiles;
        let newSpecs = city.specialists;
        let newBuildings = city.buildings;

        const growthThreshold = foodToGrow(city.size);

        // WLTKD growth: under Republic/Democracy, city grows each turn if food surplus > 0
        const govt = state.civs?.[activeCiv]?.government || 'despotism';
        const wltkdGrowth = city.weLoveKingDay && surplus > 0 &&
          (govt === 'republic' || govt === 'democracy');

        if (newFood >= growthThreshold || wltkdGrowth) {
          // ── Growth ──
          if (newFood >= growthThreshold) {
            newSize++;
            newFood = cityHasBuilding(city, 3) ? Math.floor(growthThreshold / 2) : 0;
          } else {
            // WLTKD growth: grow by 1 without consuming food box
            newSize++;
          }
          let growthBlocked = null;
          if (newSize > 8 && !cityHasBuilding(city, 9)) {
            newSize = 8;
            newFood = growthThreshold - 1;
            growthBlocked = 'needsAqueduct';
          } else if (newSize > 12 && !cityHasBuilding(city, 23)) {
            newSize = 12;
            newFood = growthThreshold - 1;
            growthBlocked = 'needsSewer';
          } else {
            newWorked = autoAssignWorker(city, newWorked, mapBase);
          }
          // Notify: city growth or blocked
          if (!state.turnEvents) state.turnEvents = [];
          if (growthBlocked) {
            state.turnEvents.push({ type: growthBlocked, cityName: city.name, cityIndex: ci, civSlot: activeCiv });
          } else {
            state.turnEvents.push({ type: 'cityGrowth', cityName: city.name, cityIndex: ci, civSlot: activeCiv, newSize });
          }
        } else if (newFood < 0) {
          // ── Famine ──
          newFood = 0;
          if (newSize > 1) {
            newSize--;
            if (newSpecs.length > 0) {
              newSpecs = newSpecs.slice(0, -1);
            } else if (newWorked.length > 0) {
              newWorked = removeWorstWorker(city, newWorked, mapBase);
            }
            // Notify: famine
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'famine', cityName: city.name, cityIndex: ci, civSlot: activeCiv, newSize });
          }
        }

        // ── Shields (skip if in civil disorder) ──
        let newShields = city.shieldsInBox || 0;
        if (!city.civilDisorder) {
          const { netShields } = calcShieldProduction(city, ci, state, mapBase, state.units);
          newShields += netShields;
          const item = city.itemInProduction;
          const cost = getProductionCost(item);

          if (item && newShields >= cost) {
            // ── Production complete ──
            newShields = 0;
            if (item.type === 'unit') {
              const newUnit = {
                type: item.id,
                owner: activeCiv,
                gx: city.gx, gy: city.gy,
                x: city.gx * 2 + (city.gy % 2), y: city.gy,
                veteran: 0, hpLost: 0,
                orders: 'none', movesMade: 0, movesLeft: 0,
                homeCityId: ci,
                goToX: -1, goToY: -1,
                visFlag: 0xFF,
                commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
                prevInStack: -1, nextInStack: -1,
              };
              // Settler/Engineer: city shrinks by 1 (min size 1)
              if ((item.id === 0 || item.id === 1) && newSize > 1) {
                newSize--;
                if (newWorked.length > newSize) {
                  newWorked = removeWorstWorker(
                    { ...city, size: newSize }, newWorked, mapBase);
                }
              }
              state.units = [...state.units, newUnit];
            } else if (item.type === 'building') {
              newBuildings = new Set(city.buildings);
              newBuildings.add(item.id);
            } else if (item.type === 'wonder') {
              const wi = item.id - 39;
              if (state.wonders && wi >= 0 && wi < state.wonders.length) {
                state.wonders = [...prev.wonders];
                state.wonders[wi] = { cityIndex: ci, destroyed: false };
              }
            }
            // Notify: production complete
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({
              type: 'productionComplete', cityName: city.name, cityIndex: ci,
              civSlot: activeCiv, item: { ...item },
            });
          }
        }

        // Reset soldThisTurn flag at start of turn
        const soldThisTurn = false;

        // Apply changes
        if (newSize !== city.size || newFood !== city.foodInBox ||
            newShields !== city.shieldsInBox ||
            newWorked !== city.workedTiles || newSpecs !== city.specialists ||
            newBuildings !== city.buildings || city.soldThisTurn) {
          state.cities[ci] = {
            ...city,
            size: newSize,
            foodInBox: Math.max(0, newFood),
            shieldsInBox: newShields,
            workedTiles: newWorked,
            specialists: newSpecs,
            buildings: newBuildings,
            hasWalls: newBuildings.has(8),
            hasPalace: newBuildings.has(1),
            soldThisTurn,
          };
        }
      }

      // ── Trade / Treasury / Science for the active civ ──
      let civTaxTotal = 0;
      let civSciTotal = 0;
      let civMaintenanceTotal = 0;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== activeCiv || city.size <= 0) continue;
        const { tax, sci, maintenance } = calcCityTrade(city, ci, state, mapBase);
        civTaxTotal += tax;
        civSciTotal += sci;
        civMaintenanceTotal += maintenance;
      }

      // Update civ treasury and research progress
      if (state.civs && state.civs[activeCiv]) {
        state.civs = [...prev.civs];
        const civ = { ...state.civs[activeCiv] };
        civ.treasury = (civ.treasury || 0) + civTaxTotal - civMaintenanceTotal;
        if (civ.treasury < 0) civ.treasury = 0;
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
            console.log(`[tech] Civ ${activeCiv} discovered ${ADVANCE_NAMES[techId]} (id=${techId}), civTechs now:`, [...state.civTechs[activeCiv]]);
          }
        }

        state.civs[activeCiv] = civ;
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
      }

      break;
    }

    default:
      return prev;
  }

  state.version = (prev.version || 0) + 1;
  return state;
}

function findFirstAliveCiv(civsAlive) {
  for (let i = 1; i < 8; i++) {
    if (civsAlive & (1 << i)) return i;
  }
  return 1;
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
  }
}

/** Rehome units whose home city was captured. Assign to nearest own city or -1. */
function rehomeUnits(state, capturedCityIdx, oldOwner) {
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.homeCityId === capturedCityIdx && u.owner === oldOwner && u.gx >= 0) {
      let bestCi = -1, bestDist = Infinity;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (c.owner === oldOwner && c.size > 0 && ci !== capturedCityIdx) {
          const dx = Math.abs(u.gx - c.gx), dy = Math.abs(u.gy - c.gy);
          const d = dx + dy;
          if (d < bestDist) { bestDist = d; bestCi = ci; }
        }
      }
      state.units[i] = { ...u, homeCityId: bestCi };
    }
  }
}
