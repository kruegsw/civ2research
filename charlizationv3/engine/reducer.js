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
import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, CHANGE_RATES, SET_RESEARCH, UNIT_ORDER, WORKER_ORDER } from './actions.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, CITY_RADIUS_DOUBLED, TERRAIN_BASE, IRRIGATION_BONUS, MINING_BONUS, CIV_CITY_NAMES, BARBARIAN_CITY_NAMES, IMPROVE_COSTS, SHIELD_BOX_FACTOR, ADVANCE_NAMES, IRRIGATION_TURNS, MINING_TURNS, ROAD_TURNS, FORTRESS_TURNS, AIRBASE_TURNS, POLLUTION_TURNS, CAN_IRRIGATE, IRR_TRANSFORM, CAN_MINE, MINE_TRANSFORM } from './defs.js';
import { calcResearchCost, grantAdvance } from './research.js';
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
    if (ter < 0 || ter > 10 || ter === 10) continue;
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
    if (ter < 0 || ter > 10 || ter === 10) continue; // skip ocean
    const imp = mapBase.getImprovements(wgx, tgy);
    scores.push({ i, score: tileScore(ter, imp) });
  }
  scores.sort((a, b) => b.score - a.score);

  const toPlace = Math.min(size, scores.length);
  return scores.slice(0, toPlace).map(s => s.i);
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

        if (result.attackerWins) {
          // Defender destroyed
          state.units[bestDefIdx] = { ...defender, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };

          // Veteran promotion for attacker
          if (result.atkVeteranPromo) unit.veteran = 1;
          unit.hpLost = result.atkHpLost;

          // Move attacker to destination (consumes all movement for this turn)
          unit.gx = dest.gx;
          unit.gy = dest.gy;
          unit.x = dest.gx * 2 + (dest.gy % 2);
          unit.y = dest.gy;
          unit.movesLeft = 0;
          if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';

          // City capture: if enemy city at dest and no more enemy units there
          const remainingEnemies = state.units.some(u =>
            u.gx === dest.gx && u.gy === dest.gy && u.owner !== unit.owner && u.gx >= 0
            && state.units.indexOf(u) !== bestDefIdx);
          if (defCity && !remainingEnemies) {
            state.cities = [...prev.cities];
            const ci = state.cities.indexOf(defCity);
            if (ci >= 0) {
              const captured = { ...defCity };
              captured.owner = unit.owner;
              // City shrinks by 1 on capture (min 1)
              captured.size = Math.max(1, captured.size - 1);
              captured.civilDisorder = false;
              captured.weLoveKingDay = false;
              captured.soldThisTurn = false;
              // Reassign workers for smaller size
              if (captured.workedTiles.length > captured.size) {
                captured.workedTiles = captured.workedTiles.slice(0, captured.size);
              }
              captured.specialists = [];
              state.cities[ci] = captured;
              state.combatResult = { type: 'capture', cityName: defCity.name, civSlot };
            }
          }
        } else {
          // Attacker destroyed
          unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;

          // Veteran promotion for defender
          if (result.defVeteranPromo) {
            state.units[bestDefIdx] = { ...defender, veteran: 1, hpLost: result.defHpLost };
          } else {
            state.units[bestDefIdx] = { ...defender, hpLost: result.defHpLost };
          }
        }

        state.units[unitIndex] = unit;
        state.combatResult = state.combatResult || { type: result.attackerWins ? 'atkWin' : 'defWin', attacker: unit.type, defender: defender.type };
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

    case END_TURN: {
      const endingCiv = state.turn.activeCiv;

      // ── Compute happiness for all ending civ's cities ──
      state.cities = [...prev.cities];
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== endingCiv || city.size <= 0) continue;
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

      // ── Process cities for the ending civ ──
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== endingCiv || city.size <= 0) continue;

        // ── Food ──
        const { surplus } = calcFoodSurplus(city, ci, state, mapBase, state.units);
        let newFood = (city.foodInBox || 0) + surplus;
        let newSize = city.size;
        let newWorked = city.workedTiles;
        let newSpecs = city.specialists;
        let newBuildings = city.buildings;

        const growthThreshold = foodToGrow(city.size);

        // WLTKD growth: under Republic/Democracy, city grows each turn if food surplus > 0
        const govt = state.civs?.[endingCiv]?.government || 'despotism';
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
          if (newSize > 8 && !cityHasBuilding(city, 9)) {
            newSize = 8;
            newFood = growthThreshold - 1;
          } else if (newSize > 12 && !cityHasBuilding(city, 23)) {
            newSize = 12;
            newFood = growthThreshold - 1;
          } else {
            newWorked = autoAssignWorker(city, newWorked, mapBase);
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
                owner: endingCiv,
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
          }
        }

        // Reset soldThisTurn flag at end of turn
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

      // ── Trade / Treasury / Science for the ending civ ──
      let civTaxTotal = 0;
      let civSciTotal = 0;
      let civMaintenanceTotal = 0;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== endingCiv || city.size <= 0) continue;
        const { tax, sci, maintenance } = calcCityTrade(city, ci, state, mapBase);
        civTaxTotal += tax;
        civSciTotal += sci;
        civMaintenanceTotal += maintenance;
      }

      // Update civ treasury and research progress
      if (state.civs && state.civs[endingCiv]) {
        state.civs = [...prev.civs];
        const civ = { ...state.civs[endingCiv] };
        civ.treasury = (civ.treasury || 0) + civTaxTotal - civMaintenanceTotal;
        if (civ.treasury < 0) civ.treasury = 0;
        civ.researchProgress = (civ.researchProgress || 0) + civSciTotal;

        // ── Research completion check ──
        const techId = civ.techBeingResearched;
        if (techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length) {
          const cost = calcResearchCost(state, endingCiv);
          if (civ.researchProgress >= cost) {
            // Grant the advance
            grantAdvance(state, endingCiv, techId);
            civ.researchProgress = 0;
            civ.techBeingResearched = 0xFF; // clear — player must pick next
            // Notify via discoveredAdvance field (client will show picker)
            state.discoveredAdvance = { civSlot: endingCiv, advanceId: techId };
          }
        }

        state.civs[endingCiv] = civ;
      }

      // ── Process unit orders for ending civ (worker progress, HP recovery) ──
      for (let ui = 0; ui < state.units.length; ui++) {
        const u = state.units[ui];
        if (u.owner !== endingCiv || u.gx < 0) continue;

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

      // ── Advance to next civ ──
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

      // Reset movement for the next civ's units + promote fortifying→fortified
      state.units = state.units.map(u => {
        if (u.owner !== next) return u;
        const orders = u.orders === 'fortifying' ? 'fortified' : u.orders;
        return { ...u, movesLeft: UNIT_MOVE_POINTS[u.type] * MOVEMENT_MULTIPLIER, orders };
      });

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
