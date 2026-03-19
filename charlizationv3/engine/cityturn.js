// ═══════════════════════════════════════════════════════════════════
// cityturn.js — Per-city turn processing (shared: server + client)
//
// Port of FUN_004ebbde (process_city_food), FUN_004e7eb1
// (calc_food_box_size), FUN_004ec3fe (process_city_production),
// FUN_004eef23 (process_unit_support_deficit), FUN_004f0221
// (pay_building_upkeep), FUN_004ef578 (handle_city_disorder),
// and FUN_004f0a9c (process_city_turn) from the Civ2 binary.
// ═══════════════════════════════════════════════════════════════════

import {
  FOOD_BOX_MULTIPLIER,
  UNIT_DOMAIN, UNIT_COSTS, UNIT_ROLE,
  IMPROVE_COSTS, IMPROVE_MAINTENANCE,
  SUPPORT_EXEMPT_TYPES, SETTLER_TYPES,
  CITY_RADIUS_DOUBLED,
  COMMODITY_NAMES,
  GROWTH_CAP_BUILDINGS,
} from './defs.js';
import {
  calcFoodSurplus, calcShieldProduction, getProductionCost,
  calcGrossShields, calcUnitShieldSupport, calcCityTrade,
  calcBuildingMaintenance, calcSupplyDemand,
  expandCityTerritory,
} from './production.js';
import { calcHappiness } from './happiness.js';
import { cityHasBuilding, hasWonderEffect, getGovernment } from './utils.js';
import { grantAdvance, getAvailableResearch, checkUnitAutoUpgrade, upgradeUnitsForTech } from './research.js';
import { calcAttitudeScore } from './diplomacy.js';

// ═══════════════════════════════════════════════════════════════════
// Food processing (Wave 1 — unchanged)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate food box size for a given city size.
 * Port of FUN_004e7eb1 — base formula: (size + 1) × FOOD_BOX_MULTIPLIER.
 *
 * @param {number} citySize
 * @returns {number}
 */
export function calcFoodBoxSize(citySize) {
  return (citySize + 1) * FOOD_BOX_MULTIPLIER;
}

/**
 * Calculate food box size adjusted for difficulty (human players only).
 * Port of FUN_004e74df — Chieftain 60%, Warlord 80%, others 100%.
 *
 * @param {number} citySize
 * @param {string} difficulty - 'chieftain','warlord','prince','king','emperor','deity'
 * @param {boolean} isHuman
 * @returns {number}
 */
export function calcFoodBoxWithDifficulty(citySize, difficulty, isHuman) {
  let base = calcFoodBoxSize(citySize);
  if (isHuman) {
    if (difficulty === 'chieftain') base = Math.trunc(base * 6 / 10);
    else if (difficulty === 'warlord') base = Math.trunc(base * 8 / 10);
  }
  return base;
}

/**
 * Process food for a single city during END_TURN.
 * Port of FUN_004ebbde — food surplus, growth, famine, granary,
 * aqueduct/sewer gates, WLTKD bonus growth.
 *
 * Does NOT mutate the city directly; returns new values and events
 * so the caller (reducer) can apply them.
 *
 * @param {object} city
 * @param {number} cityIndex
 * @param {object} state - full game state (for calcFoodSurplus, wonder checks)
 * @param {object} mapBase
 * @returns {{ newFoodInBox: number, newSize: number, events: Array }}
 */
export function processCityFood(city, cityIndex, state, mapBase, callbacks) {
  const events = [];
  const activeCiv = city.owner;
  const units = state.units || [];

  // ── Calculate food surplus ──
  const { surplus } = calcFoodSurplus(city, cityIndex, state, mapBase, units);
  let newFood = (city.foodInBox || 0) + surplus;
  let newSize = city.size;
  let newWorked = city.workedTiles;
  let newSpecs = city.specialists;
  let cityDestroyed = false;

  // Difficulty and human detection for food box scaling
  const difficulty = state.difficulty || 'chieftain';
  const humanPlayers = state.humanPlayers || 0xFF;
  const isHuman = !!((1 << activeCiv) & humanPlayers);

  const growthThreshold = calcFoodBoxWithDifficulty(city.size, difficulty, isHuman);

  // WLTKD growth: Republic/Democracy + WLTKD + positive food surplus → grow each turn
  const govt = getGovernment(city, state);
  const wltkdGrowth = city.weLoveKingDay && surplus > 0 &&
    (govt === 'republic' || govt === 'democracy');

  // Granary effect: building 3 or Pyramids wonder (index 0)
  const hasGranary = cityHasBuilding(city, 3) || hasWonderEffect(state, activeCiv, 0);

  if (newFood >= growthThreshold || wltkdGrowth) {
    // ── Growth ──
    if (newFood >= growthThreshold) {
      // Normal growth: consume food box
      newSize++;
      newFood = hasGranary ? Math.floor(growthThreshold / 2) : 0;
    } else {
      // WLTKD growth: grow without consuming food box
      newSize++;
    }

    // Aqueduct gate: can't grow past size 8 without Aqueduct (building 9)
    let growthBlocked = null;
    // Binary ref: FUN_00441a79 (city_growth_building_check)
    if (newSize > GROWTH_CAP_BUILDINGS.AQUEDUCT.defaultThreshold && !cityHasBuilding(city, GROWTH_CAP_BUILDINGS.AQUEDUCT.buildingId)) {
      newSize = GROWTH_CAP_BUILDINGS.AQUEDUCT.defaultThreshold;
      newFood = growthThreshold - 1; // cap food just below threshold
      growthBlocked = 'needsAqueduct';
    }
    // Sewer System gate: can't grow past size 12 without Sewer System (building 23)
    else if (newSize > GROWTH_CAP_BUILDINGS.SEWER.defaultThreshold && !cityHasBuilding(city, GROWTH_CAP_BUILDINGS.SEWER.buildingId)) {
      newSize = GROWTH_CAP_BUILDINGS.SEWER.defaultThreshold;
      newFood = growthThreshold - 1;
      growthBlocked = 'needsSewer';
    }
    // Successful growth — auto-assign new worker if callback provided
    else if (callbacks?.autoAssignWorker) {
      newWorked = callbacks.autoAssignWorker(city, cityIndex, newWorked, state, mapBase);
    }

    if (growthBlocked) {
      events.push({ type: growthBlocked, cityName: city.name, cityIndex, civSlot: activeCiv });
    } else {
      events.push({ type: 'cityGrowth', cityName: city.name, cityIndex, civSlot: activeCiv, newSize });
      // Expand territory: claim one best unowned tile after city growth
      const claimed = expandCityTerritory(state, mapBase, cityIndex);
      if (claimed) {
        events.push({ type: 'territoryClaimed', cityName: city.name, cityIndex, civSlot: activeCiv, gx: claimed.gx, gy: claimed.gy });
      }
    }
  } else if (newFood < 0) {
    // ── A.7: Famine (binary-faithful path) ──
    newFood = 0;

    // First check: disband a settler/engineer homed to this city instead of shrinking
    let settlerDisbanded = false;
    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (u && u.owner === activeCiv && u.gx >= 0 &&
          u.homeCityId === cityIndex && SETTLER_TYPES.has(u.type)) {
        state.units = state.units.length ? [...state.units] : state.units;
        state.units[ui] = { ...u, gx: -1, gy: -1, movesLeft: 0 };
        events.push({
          type: 'unitDisbanded', unitType: u.type,
          civSlot: activeCiv, cityName: city.name, reason: 'famine',
        });
        settlerDisbanded = true;
        break;
      }
    }

    if (!settlerDisbanded) {
      if (newSize > 1) {
        newSize--;
        // Remove a specialist first, then worst worker
        if (newSpecs.length > 0) {
          newSpecs = newSpecs.slice(0, -1);
        } else if (newWorked.length > 0 && callbacks?.removeWorstWorker) {
          newWorked = callbacks.removeWorstWorker(city, cityIndex, newWorked, state, mapBase);
        }
        events.push({ type: 'famine', cityName: city.name, cityIndex, civSlot: activeCiv, newSize });
      } else {
        // City destroyed by famine (size 1 → 0)
        newSize = 0;
        cityDestroyed = true;
        events.push({ type: 'cityDestroyed', cityName: city.name, cityIndex, civSlot: activeCiv, reason: 'famine' });
        // Disband all units homed to this city
        for (let ui = 0; ui < state.units.length; ui++) {
          const u = state.units[ui];
          if (u && u.homeCityId === cityIndex && u.gx >= 0) {
            state.units = state.units.length ? [...state.units] : state.units;
            state.units[ui] = { ...u, gx: -1, gy: -1, movesLeft: 0 };
          }
        }
        // Trade route cleanup: remove routes pointing to this city from all other cities
        state.cities = state.cities.length ? [...state.cities] : state.cities;
        for (let ci = 0; ci < state.cities.length; ci++) {
          if (ci === cityIndex) continue;
          const c = state.cities[ci];
          if (!c.tradeRoutes || c.tradeRoutes.length === 0) continue;
          const filtered = c.tradeRoutes.filter(r => r.destCityIndex !== cityIndex);
          if (filtered.length !== c.tradeRoutes.length) {
            state.cities[ci] = { ...c, tradeRoutes: filtered };
          }
        }
        // Wonder clearing: mark wonders in this city as destroyed
        if (state.wonders) {
          state.wonders = [...state.wonders];
          for (let wi = 0; wi < state.wonders.length; wi++) {
            const w = state.wonders[wi];
            if (w && w.cityIndex === cityIndex && !w.destroyed) {
              state.wonders[wi] = { ...w, cityIndex: null, destroyed: true };
            }
          }
        }
      }
    }
  }

  return { newFoodInBox: newFood, newSize, newWorked, newSpecs, cityDestroyed, events };
}


// ═══════════════════════════════════════════════════════════════════
// D.3: Caravan/Freight commodity assignment
// Port of FUN_004ec1c6 (assign_caravan_commodity)
// ═══════════════════════════════════════════════════════════════════

/**
 * Assign a trade commodity to a newly built Caravan (48) or Freight (49) unit.
 * Port of FUN_004ec1c6 — selects a commodity based on the city's available
 * supply. In the original game, this calls calc_supply_demand() to determine
 * which commodities the city supplies, then picks the first available one
 * not already carried by another trade unit from the same city.
 *
 * Since the full supply/demand model is not yet ported, we use a deterministic
 * formula based on the city's terrain and position to select a commodity.
 * The commodity is stored on the unit as commodityCarried (0-15).
 *
 * @param {object} city - the city that built the unit
 * @param {number} cityIndex - index in gameState.cities
 * @param {object} state - game state (for checking existing trade units)
 * @param {object} mapBase - map data for terrain lookup
 * @returns {number} commodity ID (0-15)
 */
export function assignCaravanCommodity(city, cityIndex, state, mapBase) {
  const numCommodities = COMMODITY_NAMES.length; // 16

  // Gather commodities already carried by trade units from this city
  const usedCommodities = new Set();
  for (const u of state.units) {
    if (u.gx < 0) continue;
    if (u.homeCityId !== cityIndex) continue;
    if (u.type !== 48 && u.type !== 49) continue;
    if (u.commodityCarried >= 0 && u.commodityCarried < numCommodities) {
      usedCommodities.add(u.commodityCarried);
    }
  }

  // Use full supply/demand model (port of FUN_0043d400) to pick highest-supply commodity
  const { supply } = calcSupplyDemand(city, cityIndex, state, mapBase);

  // Build a sorted list of commodities by supply value (descending)
  const ranked = [];
  for (let i = 0; i < numCommodities; i++) {
    ranked.push({ id: i, val: supply[i] });
  }
  ranked.sort((a, b) => b.val - a.val);

  // Pick the highest-supply commodity not already carried
  for (const { id, val } of ranked) {
    if (val < 0) continue; // -1 means unavailable (requires tech)
    if (!usedCommodities.has(id)) return id;
  }

  // All commodities in use or unavailable — fallback to first available
  for (const { id, val } of ranked) {
    if (val >= 0) return id;
  }

  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// A.3: Production processing
// Port of FUN_004ec3fe (process_city_production)
// ═══════════════════════════════════════════════════════════════════

/**
 * Process shield production for a single city during END_TURN.
 * Accumulates shields, checks for production completion, handles
 * unit creation, building placement, and wonder completion.
 *
 * Mutates state directly (units array, wonders array) as the reducer
 * pattern requires. Returns events and new shield/building values
 * for the caller to apply to the city object.
 *
 * @param {object} city - city object (read-only within this function for city fields)
 * @param {number} cityIndex
 * @param {object} state - mutable game state
 * @param {object} mapBase
 * @param {object} callbacks - { autoAssignWorker, removeWorstWorker } from reducer
 * @returns {{ newShieldsInBox: number, newBuildings: Set|null, completedItem: object|null,
 *             newSize: number|null, newWorked: Array|null, events: Array }}
 */
export function processCityProduction(city, cityIndex, state, mapBase, callbacks) {
  const events = [];
  const activeCiv = city.owner;

  // ── Auto-upgrade obsoleted unit production ──
  const upgradeEvent = checkUnitAutoUpgrade(state, cityIndex);
  if (upgradeEvent) {
    events.push(upgradeEvent);
    // Re-read city after production switch
    city = state.cities[cityIndex];
  }

  // No production during civil disorder
  if (city.civilDisorder) {
    return {
      newShieldsInBox: city.shieldsInBox || 0,
      newBuildings: null,
      completedItem: null,
      newSize: null,
      newWorked: null,
      events,
    };
  }

  // Calculate net shield production
  const { netShields } = calcShieldProduction(city, cityIndex, state, mapBase, state.units);
  let newShields = (city.shieldsInBox || 0) + netShields;

  const item = city.itemInProduction;
  const cost = getProductionCost(item);

  let newBuildings = null;
  let completedItem = null;
  let newSize = null;
  let newWorked = null;

  if (item && newShields >= cost) {
    // ═══ PRODUCTION COMPLETE ═══
    completedItem = { ...item };

    // Overflow: cap at item cost (Civ2 rule)
    const overflow = newShields - cost;
    newShields = Math.min(overflow, cost);

    if (item.type === 'unit') {
      // ── Create unit ──
      // Determine veteran status:
      //   Barracks (building 2) or Sun Tzu's (wonder 7) → all land units
      //   Airport (building 32) → air units
      //   Port Facility (building 34) or Lighthouse (wonder 3) → sea units
      //   Communism government + settler/engineer role (UNIT_ROLE 6) → veteran
      const govt = getGovernment(city, state);
      const unitRole = UNIT_ROLE[item.id] ?? 0;
      const isVeteran = (
        cityHasBuilding(city, 2) || hasWonderEffect(state, activeCiv, 7)
        || (UNIT_DOMAIN[item.id] === 1 && cityHasBuilding(city, 32))
        || (UNIT_DOMAIN[item.id] === 2 && (cityHasBuilding(city, 34) || hasWonderEffect(state, activeCiv, 3)))
        || (govt === 'communism' && unitRole === 6)
      );

      const newUnit = {
        type: item.id,
        owner: activeCiv,
        gx: city.gx, gy: city.gy,
        x: city.gx * 2 + (city.gy % 2), y: city.gy,
        veteran: isVeteran ? 1 : 0,
        movesRemain: 0,
        orders: 'none', movesMade: 0, movesLeft: 0,
        homeCityId: cityIndex,
        goToX: -1, goToY: -1,
        hpLost: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      };

      // Settler/Engineer: city shrinks by 1 (min size 1)
      if (SETTLER_TYPES.has(item.id) && city.size > 1) {
        newSize = city.size - 1;
        const curWorked = newWorked || city.workedTiles;
        if (curWorked.length > newSize && callbacks?.removeWorstWorker) {
          newWorked = callbacks.removeWorstWorker(
            { ...city, size: newSize }, cityIndex, curWorked, state, mapBase);
        }
      }

      // Caravan/Freight: assign a trade commodity (port of FUN_004ec1c6)
      if (item.id === 48 || item.id === 49) {
        newUnit.commodityCarried = assignCaravanCommodity(city, cityIndex, state, mapBase);
      }

      state.units = [...state.units, newUnit];
    } else if (item.type === 'building') {
      // ── Add building ──
      newBuildings = new Set(city.buildings);
      // Check if already built (shouldn't happen, but guard)
      if (newBuildings.has(item.id)) {
        // Refund — keep shields at cost
        newShields = cost;
        completedItem = null;
      } else {
        newBuildings.add(item.id);

        // Palace (building 1) is unique per civ — remove from all other cities
        if (item.id === 1) {
          for (let oci = 0; oci < state.cities.length; oci++) {
            if (oci === cityIndex) continue;
            const oc = state.cities[oci];
            if (!oc || oc.size <= 0 || oc.owner !== activeCiv) continue;
            if (oc.buildings && oc.buildings.has(1)) {
              const updBlds = new Set(oc.buildings);
              updBlds.delete(1);
              state.cities[oci] = { ...oc, buildings: updBlds, hasPalace: false };
              events.push({
                type: 'palaceRemoved', cityName: oc.name, cityIndex: oci, civSlot: activeCiv,
              });
            }
          }
        }
      }
    } else if (item.type === 'wonder') {
      // ── Complete wonder ──
      const wi = item.id - 39;
      if (state.wonders && wi >= 0 && wi < state.wonders.length) {
        // Check if another civ already built it (wonder race lost)
        const existing = state.wonders[wi];
        if (existing && existing.cityIndex != null) {
          // Wonder already built! Refund shields
          newShields = cost;
          completedItem = null;
          events.push({
            type: 'wonderBeaten', cityName: city.name, cityIndex,
            civSlot: activeCiv, wonderIndex: wi,
          });
        } else {
          state.wonders = [...state.wonders];
          state.wonders[wi] = { cityIndex, destroyed: false };

          // Darwin's Voyage (18): 2 free advances on completion
          if (wi === 18) {
            const avail = getAvailableResearch(state, activeCiv);
            for (let n = 0; n < 2 && avail.length > 0; n++) {
              const advId = avail.shift();
              grantAdvance(state, activeCiv, advId);
              events.push({
                type: 'freeAdvance', civSlot: activeCiv,
                advanceId: advId, source: "Darwin's Voyage",
              });
              // Refresh available after granting (prereqs may unlock new techs)
              avail.length = 0;
              avail.push(...getAvailableResearch(state, activeCiv));
            }
          }
          // Manhattan Project (23): enables nuclear weapons for ALL civs
          // Also halves nuclear stockpile for all civs (FUN_004ec3fe lines 4957-4961)
          // Binary: for each civ 1-7, nukeByte = clamp((nukeByte + 1) / 2, 0, 6)
          if (wi === 23) {
            state.nuclearEnabled = true;
            // Halve nuclear stockpile for all civs
            if (state.civs) {
              state.civs = [...state.civs];
              for (let ci = 1; ci < 8; ci++) {
                const civ = state.civs[ci];
                if (!civ) continue;
                const nukeByte = civ.nukeStockpile || 0;
                if (nukeByte > 0) {
                  const halved = Math.min(6, Math.max(0, Math.floor((nukeByte + 1) / 2)));
                  state.civs[ci] = { ...civ, nukeStockpile: halved };
                }
              }
            }
            events.push({ type: 'manhattanProject', civSlot: activeCiv });
          }
          // Apollo Program (25): reveals entire map for the owner
          if (wi === 25 && mapBase.tileData) {
            const bit = 1 << activeCiv;
            for (const tile of mapBase.tileData) {
              if (tile) tile.visibility |= bit;
            }
            events.push({ type: 'apolloProgram', civSlot: activeCiv });
          }
          // A.4: SETI Program (26): halve remaining research cost, -25 attitude
          if (wi === 26) {
            // Halve remaining research cost for current tech
            if (state.civs?.[activeCiv]) {
              const civ = state.civs[activeCiv];
              const curCost = civ.researchCost || 0;
              if (curCost > 0) {
                state.civs = [...state.civs];
                state.civs[activeCiv] = { ...civ, researchCost: curCost >> 1 };
              }
            }
            events.push({ type: 'setiProgram', civSlot: activeCiv });
          }
          // Da Vinci's Workshop (14): trigger unit auto-upgrade for all owned units
          // Binary ref: FUN_004ec3fe line 5141 — thunk_FUN_004be6ba(civId)
          if (wi === 14) {
            const techs = state.civTechs?.[activeCiv];
            if (techs) {
              for (const t of techs) {
                const leoEvents = upgradeUnitsForTech(state, activeCiv, t);
                events.push(...leoEvents);
              }
            }
          }
          // Eiffel Tower (20): trigger attitude recalculation for all other civs
          // Binary ref: FUN_004ec3fe line 5144 — thunk_FUN_004ec312(civId)
          if (wi === 20) {
            if (state.civs) {
              state.civs = [...state.civs];
              for (let ci = 1; ci < 8; ci++) {
                if (ci === activeCiv || !(state.civsAlive & (1 << ci))) continue;
                const attScore = calcAttitudeScore(state, ci, activeCiv);
                const otherCiv = state.civs[ci];
                if (otherCiv) {
                  state.civs[ci] = { ...otherCiv, attitudeToward: { ...(otherCiv.attitudeToward || {}), [activeCiv]: attScore } };
                }
              }
            }
            events.push({ type: 'eiffelTower', civSlot: activeCiv });
          }

          // Force reassign: all other cities building the SAME wonder get production reset
          // Binary ref: FUN_004ec3fe line 5156 — thunk_FUN_00441b11(citySlot, 99)
          for (let oci = 0; oci < state.cities.length; oci++) {
            if (oci === cityIndex) continue;
            const oc = state.cities[oci];
            if (!oc || oc.size <= 0) continue;
            if (oc.itemInProduction?.type === 'wonder' && oc.itemInProduction?.id === item.id) {
              state.cities[oci] = {
                ...oc,
                itemInProduction: { type: 'unit', id: 2 }, // Reset to Warriors
                shieldsInBox: 0,
              };
              events.push({
                type: 'wonderRaceForceReassign', cityName: oc.name, cityIndex: oci,
                civSlot: oc.owner, wonderIndex: wi,
              });
            }
          }
        }
      }
    }

    // Notify: production complete (only if item wasn't refunded)
    if (completedItem) {
      events.push({
        type: 'productionComplete', cityName: city.name, cityIndex,
        civSlot: activeCiv, item: completedItem,
      });
    }
  }

  return { newShieldsInBox: newShields, newBuildings, completedItem, newSize, newWorked, events };
}


// ═══════════════════════════════════════════════════════════════════
// A.4: Unit support deficit, building upkeep, disorder
// ═══════════════════════════════════════════════════════════════════

/**
 * Process unit support deficit for a city.
 * Port of FUN_004eef23 — when a city's gross shield production is less
 * than its unit support cost, disband the most distant non-essential
 * supported unit until balance is restored.
 *
 * Mutates state.units directly (marks disbanded units dead).
 *
 * @param {object} city
 * @param {number} cityIndex
 * @param {object} state - mutable game state
 * @param {object} mapBase
 * @returns {{ events: Array }}
 */
export function processUnitSupportDeficit(city, cityIndex, state, mapBase) {
  const events = [];
  const activeCiv = city.owner;

  const { grossShields, support } = calcShieldProduction(city, cityIndex, state, mapBase, state.units);

  if (support <= grossShields) return { events };

  // Need to disband units until support is affordable
  let currentSupport = support;
  while (currentSupport > grossShields) {
    // Find most distant supported unit that isn't essential
    let worstIdx = -1;
    let worstDist = -1;

    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (u.owner !== activeCiv || u.gx < 0 || u.homeCityId !== cityIndex) continue;
      if (SUPPORT_EXEMPT_TYPES.has(u.type)) continue;
      // Don't disband units garrisoned in the city
      if (u.gx === city.gx && u.gy === city.gy) continue;

      const dist = Math.abs(u.gx - city.gx) + Math.abs(u.gy - city.gy);
      if (dist > worstDist) {
        worstDist = dist;
        worstIdx = ui;
      }
    }

    if (worstIdx < 0) break; // No disbandable units found

    // Kill the unit and recover half shields to nearest city
    const u = state.units[worstIdx];
    state.units[worstIdx] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
    events.push({
      type: 'unitDisbanded', unitType: u.type,
      civSlot: activeCiv, cityName: city.name,
    });

    // A.8: Half-shield recovery — disbanded units return half their cost to nearest city
    const unitCost = UNIT_COSTS[u.type] || 0;
    if (unitCost > 0) {
      const halfShields = Math.floor(unitCost / 2);
      if (halfShields > 0) {
        // Add to the disbanding city's shield box
        const curCity = state.cities[cityIndex];
        state.cities[cityIndex] = {
          ...curCity,
          shieldsInBox: (curCity.shieldsInBox || 0) + halfShields,
        };
      }
    }

    // Recalculate support after disbanding
    const recheck = calcShieldProduction(city, cityIndex, state, mapBase, state.units);
    currentSupport = recheck.support;
    if (recheck.support <= recheck.grossShields) break;
  }

  // A.8: AI auto-disband — every 8 turns, AI in Republic/Democracy with disorder
  // disbands excess units to restore order
  const humanPlayers = state.humanPlayers || 0xFF;
  const isAI = !((1 << activeCiv) & humanPlayers);
  const govt = getGovernment(city, state);
  if (isAI && city.civilDisorder &&
      (govt === 'republic' || govt === 'democracy')) {
    const turnNum = state.turn?.number || 0;
    for (let ui = 0; ui < state.units.length; ui++) {
      if (((turnNum + ui) & 7) !== 0) continue; // every 8 turns per unit
      const u = state.units[ui];
      if (u.owner !== activeCiv || u.gx < 0 || u.homeCityId !== cityIndex) continue;
      if (SUPPORT_EXEMPT_TYPES.has(u.type)) continue;
      if (u.gx === city.gx && u.gy === city.gy) continue; // keep garrison

      state.units[ui] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
      events.push({
        type: 'unitDisbanded', unitType: u.type,
        civSlot: activeCiv, cityName: city.name, reason: 'aiAutoDisband',
      });
      // Recover half shields
      const unitCost = UNIT_COSTS[u.type] || 0;
      if (unitCost > 0) {
        const curCity = state.cities[cityIndex];
        state.cities[cityIndex] = {
          ...curCity,
          shieldsInBox: (curCity.shieldsInBox || 0) + Math.floor(unitCost / 2),
        };
      }
      break; // one per call
    }
  }

  return { events };
}

/**
 * Pay building upkeep for a city.
 * Port of FUN_004f0221 — deduct maintenance from treasury. If treasury
 * goes negative, sell cheapest-maintenance building to cover deficit.
 *
 * Note: In the current engine, building upkeep is handled at the civ
 * level (summed across all cities in the trade/treasury section of
 * END_TURN). This function is provided for future per-city upkeep
 * processing but is NOT called by the orchestrator to avoid breaking
 * the existing civ-wide treasury flow.
 *
 * @param {number} cityIndex
 * @param {object} state - mutable game state
 * @returns {{ events: Array }}
 */
export function payBuildingUpkeep(cityIndex, state) {
  const events = [];
  const city = state.cities[cityIndex];
  const activeCiv = city.owner;
  const govt = getGovernment(city, state);

  // No upkeep under anarchy
  if (govt === 'anarchy') return { events };

  const civ = state.civs?.[activeCiv];
  if (!civ) return { events };

  const maintenance = calcBuildingMaintenance(city, state);
  if (maintenance <= 0) return { events };

  // Deduct from treasury (note: this modifies the civ object directly)
  let treasury = civ.treasury || 0;
  treasury -= maintenance;

  // If treasury goes negative, sell cheapest building
  while (treasury < 0 && city.buildings && city.buildings.size > 0) {
    let cheapestId = -1;
    let cheapestMaint = Infinity;

    for (const bid of city.buildings) {
      if (bid === 1) continue; // never sell Palace
      const maint = IMPROVE_MAINTENANCE[bid] || 0;
      if (maint > 0 && maint < cheapestMaint) {
        cheapestMaint = maint;
        cheapestId = bid;
      }
    }

    if (cheapestId < 0) { treasury = 0; break; }

    const sellBuildings = new Set(city.buildings);
    sellBuildings.delete(cheapestId);
    state.cities[cityIndex] = {
      ...state.cities[cityIndex],
      buildings: sellBuildings,
      hasWalls: sellBuildings.has(8),
      hasPalace: sellBuildings.has(1),
    };

    treasury += IMPROVE_COSTS[cheapestId] || 0;
    events.push({
      type: 'buildingSold', cityName: city.name, cityIndex,
      civSlot: activeCiv, buildingId: cheapestId,
    });
  }

  // Update civ treasury
  state.civs = [...state.civs];
  state.civs[activeCiv] = { ...civ, treasury };

  return { events };
}

/**
 * Handle civil disorder for a city.
 * Port of FUN_004ef578 — handles disorder onset, continuation,
 * recovery, and democracy revolution risk.
 *
 * @param {object} city
 * @param {number} cityIndex
 * @param {object} state - mutable game state
 * @param {object} mapBase
 * @returns {{ events: Array, civilDisorder: boolean, weLoveKingDay: boolean }}
 */
export function handleCityDisorder(city, cityIndex, state, mapBase) {
  const events = [];
  const activeCiv = city.owner;
  const govt = getGovernment(city, state);

  const wasInDisorder = city.civilDisorder;

  // Recalculate happiness
  const hap = calcHappiness(city, cityIndex, state, mapBase);

  // ── Disorder onset ──
  if (!wasInDisorder && hap.civilDisorder) {
    events.push({
      type: 'civilDisorder', cityName: city.name, cityIndex, civSlot: activeCiv,
    });

    // Democracy: track disorder turns for revolution risk
    if (govt === 'democracy') {
      const disorderTurns = (city.disorderTurns || 0) + 1;
      if (disorderTurns >= 2) {
        // Force revolution to anarchy
        if (state.civs?.[activeCiv]) {
          state.civs = [...state.civs];
          state.civs[activeCiv] = {
            ...state.civs[activeCiv],
            government: 'anarchy',
            anarchyTurns: 2,
          };
        }
        events.push({
          type: 'revolution', civSlot: activeCiv, reason: 'disorder',
        });
        return {
          events,
          civilDisorder: hap.civilDisorder,
          weLoveKingDay: hap.weLoveKingDay,
          disorderTurns: 0,
        };
      }
      return {
        events,
        civilDisorder: hap.civilDisorder,
        weLoveKingDay: hap.weLoveKingDay,
        disorderTurns,
      };
    }
  }

  // ── Disorder continuation ──
  if (wasInDisorder && hap.civilDisorder) {
    if (govt === 'democracy') {
      const disorderTurns = (city.disorderTurns || 0) + 1;
      if (disorderTurns >= 2) {
        // Force revolution to anarchy
        if (state.civs?.[activeCiv]) {
          state.civs = [...state.civs];
          state.civs[activeCiv] = {
            ...state.civs[activeCiv],
            government: 'anarchy',
            anarchyTurns: 2,
          };
        }
        events.push({
          type: 'revolution', civSlot: activeCiv, reason: 'disorder',
        });
        return {
          events,
          civilDisorder: hap.civilDisorder,
          weLoveKingDay: hap.weLoveKingDay,
          disorderTurns: 0,
        };
      }
      return {
        events,
        civilDisorder: hap.civilDisorder,
        weLoveKingDay: hap.weLoveKingDay,
        disorderTurns,
      };
    }
  }

  // ── Disorder recovery ──
  if (wasInDisorder && !hap.civilDisorder) {
    events.push({
      type: 'orderRestored', cityName: city.name, cityIndex, civSlot: activeCiv,
    });
    return {
      events,
      civilDisorder: hap.civilDisorder,
      weLoveKingDay: hap.weLoveKingDay,
      disorderTurns: 0,
    };
  }

  return {
    events,
    civilDisorder: hap.civilDisorder,
    weLoveKingDay: hap.weLoveKingDay,
    disorderTurns: city.disorderTurns || 0,
  };
}


// ═══════════════════════════════════════════════════════════════════
// D.1: Pollution and Nuclear Meltdown
// Port of FUN_004f04dd (process_city_pollution)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate pollution chance and potentially place pollution or trigger
 * nuclear meltdown for a city.
 *
 * Pollution chance formula:
 *   pollutionChance = (citySize + factoryPollution + powerPlantPollution) - thresholdReductions
 *
 * Factory/Mfg. Plant each add shields/2 to pollution.
 * Power Plant (19) / Nuclear Plant (21) add shields/2 to pollution.
 * Hydro Plant (20) / Solar Plant (29) are clean — no pollution contribution.
 * Recycling Center (18) reduces pollution by 2/3.
 * Mass Transit (13) eliminates the population (citySize) component.
 *
 * Nuclear Meltdown: if city has Nuclear Plant (21) and NO Solar Plant (29),
 * there is a small chance of meltdown each turn. On meltdown:
 *   - City size halved
 *   - Pollution placed on ALL tiles in city radius
 *   - Nuclear Plant destroyed
 *
 * @param {object} city
 * @param {number} cityIndex
 * @param {object} state - mutable game state
 * @param {object} mapBase
 * @returns {{ events: Array, newSize: number|null, newBuildings: Set|null }}
 */
export function processCityPollution(city, cityIndex, state, mapBase) {
  const events = [];
  const activeCiv = city.owner;
  const { netShields } = calcShieldProduction(city, cityIndex, state, mapBase, state.units || []);

  // ── Nuclear Meltdown check ──
  // Binary: Nuclear Plant (21) + civil disorder + no Fusion Power tech (0x20=32)
  // Meltdown chance: rand() % max(1, 6 - difficulty)
  const civTechs = state.civTechs?.[activeCiv];
  const hasFusionPower = civTechs ? civTechs.has(32) : false;
  if (cityHasBuilding(city, 21) && city.civilDisorder && !hasFusionPower) {
    const diffIdx = Math.max(0, (state.difficulty ? ['chieftain','warlord','prince','king','emperor','deity'].indexOf(state.difficulty) : 0));
    const meltdownDenom = Math.max(1, 6 - diffIdx);
    const meltdownRoll = state.rng ? state.rng.nextInt(meltdownDenom) : Math.floor(Math.random() * meltdownDenom);
    if (meltdownRoll === 0) {
      // ── MELTDOWN ──
      const newSize = Math.max(1, Math.floor(city.size / 2));
      const newBuildings = new Set(city.buildings);
      newBuildings.delete(21); // Destroy Nuclear Plant

      // Place pollution on ALL tiles in city radius
      const parC = city.gy & 1;
      for (let ri = 0; ri < 21; ri++) {
        const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
        const parT = ((city.gy + ddy) % 2 + 2) % 2;
        const tgx = city.gx + ((parC + ddx - parT) >> 1);
        const tgy = city.gy + ddy;
        const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
        if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
        const ter = mapBase.getTerrain(wgx, tgy);
        if (ter === 10) continue; // skip ocean
        const tileIdx = tgy * mapBase.mw + wgx;
        if (mapBase.tileData[tileIdx]) {
          mapBase.tileData[tileIdx].improvements = {
            ...mapBase.tileData[tileIdx].improvements,
            pollution: true,
          };
        }
      }

      events.push({
        type: 'nuclearMeltdown', cityName: city.name, cityIndex,
        civSlot: activeCiv, newSize,
      });

      return { events, newSize, newBuildings };
    }
  }

  // ── Pollution chance calculation (binary: FUN_004e9c14 + FUN_004efd44) ──
  // Step 1: Determine power level (1=none, 2=dirty power, 3=clean/recycling/solar)
  let powerLevel = 1;
  if (cityHasBuilding(city, 19) || cityHasBuilding(city, 20) ||
      cityHasBuilding(city, 21)) {
    powerLevel = 2; // Power Plant, Hydro, Nuclear = dirty (for pollution divisor)
  }
  if (hasWonderEffect(state, activeCiv, 22)) {
    powerLevel = 2; // Hoover Dam
  }
  // Hydro (20) is actually classified same as Nuclear/Power in the binary for powerLevel
  // but Recycling Center and Solar Plant upgrade to level 3
  if (cityHasBuilding(city, 18)) powerLevel = 3; // Recycling Center
  if (cityHasBuilding(city, 29)) powerLevel = 3; // Solar Plant

  // Step 2: Industrial pollution = shields / powerLevel - 20
  // Binary: DAT_006a6584 = DAT_006a65cc / DAT_006a65f8 - 0x14
  let industrialPollution = Math.trunc(netShields / powerLevel) - 20;

  // Solar Plant zeroes industrial pollution entirely
  if (cityHasBuilding(city, 29)) industrialPollution = 0;

  if (industrialPollution < 0) industrialPollution = 0;

  // Step 3: Population pollution from tech count (only if no Mass Transit, building 13)
  let popPollution = 0;
  if (!cityHasBuilding(city, 13)) {
    const ownerTechs = state.civTechs?.[activeCiv];
    const hasTech = (id) => ownerTechs ? ownerTechs.has(id) : false;
    let techCount = 0;
    // Binary: Industrialization(37), Automobile(5), Mass Production(48), Plastics(62)
    if (hasTech(37)) techCount++;
    if (hasTech(5)) techCount++;
    if (hasTech(48)) techCount++;
    if (hasTech(62)) techCount++;
    // Sanitation(74): +1 only if counter is currently 0 (i.e., if no polluting techs)
    if (!hasTech(74) && techCount === 0) techCount++;
    // Environmentalism(26): -1
    if (hasTech(26)) techCount--;
    // Solar Plant(29): -1
    if (cityHasBuilding(city, 29)) techCount--;
    if (techCount < 0) techCount = 0;
    popPollution = (city.size * techCount) >> 2;
  }

  let pollutionChance = industrialPollution + popPollution;
  if (pollutionChance <= 0) return { events, newSize: null, newBuildings: null };

  // Cap at 255 (binary: 0xFF)
  if (pollutionChance > 255) pollutionChance = 255;

  // Binary: rand() % 256 < pollutionChance → pollution occurs
  const rollVal = state.rng ? state.rng.nextInt(256) : Math.floor(Math.random() * 256);
  if (rollVal >= pollutionChance) return { events, newSize: null, newBuildings: null };

  // ── Place pollution on a random non-ocean, non-polluted tile in city radius ──
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
    const pickIdx = state.rng ? state.rng.nextInt(landTiles.length) : Math.floor(Math.random() * landTiles.length);
    const pick = landTiles[pickIdx];
    const pollIdx = pick.gy * mapBase.mw + pick.gx;
    if (mapBase.tileData[pollIdx]) {
      mapBase.tileData[pollIdx].improvements = {
        ...mapBase.tileData[pollIdx].improvements,
        pollution: true,
      };
    }
    events.push({
      type: 'pollution', cityName: city.name, cityIndex,
      civSlot: activeCiv,
    });
  }

  return { events, newSize: null, newBuildings: null };
}


// ═══════════════════════════════════════════════════════════════════
// A.5: processCityTurn orchestrator
// Port of FUN_004f0a9c (process_city_turn)
// ═══════════════════════════════════════════════════════════════════

/**
 * Process a single city's full turn: happiness, food, production,
 * unit support, disorder, and pollution scoring.
 *
 * Port of FUN_004f0a9c — the per-city orchestrator called once per
 * city during the civ's END_TURN phase. Coordinates all sub-systems.
 *
 * This is a high-level orchestrator that delegates to the individual
 * processing functions. It requires callbacks for reducer-specific
 * helpers (autoAssignWorker, removeWorstWorker) that live in reducer.js.
 *
 * @param {number} cityIndex
 * @param {object} state - mutable game state
 * @param {object} mapBase
 * @param {object} callbacks - { autoAssignWorker, removeWorstWorker }
 * @returns {{ events: Array, cityDestroyed: boolean }}
 */
export function processCityTurn(cityIndex, state, mapBase, callbacks) {
  const city = state.cities[cityIndex];
  const activeCiv = city.owner;
  const events = [];

  // Skip cities in resistance (no production, food, etc.)
  if (city.resistanceTurns > 0) return { events, cityDestroyed: false };

  // ── Step 0a: City turn sync — adoption check (every 64 turns, staggered) ──
  // Binary ref: FUN_004f0a9c line 278
  // Formula: ((turnAge - 1) ^ (turnNumber & 0x3F)) & 0x3F == 0
  // When true, city.foundedBy is set to city.owner (adoption)
  const turnNumber = state.turn?.number || 0;
  const turnAge = city.turnAge || 0;
  if (turnAge > 0 && (((turnAge - 1) ^ (turnNumber & 0x3F)) & 0x3F) === 0) {
    if (city.foundedBy !== activeCiv) {
      state.cities[cityIndex] = { ...state.cities[cityIndex], foundedBy: activeCiv };
    }
  }

  // ── Step 1: Compute happiness ──
  const hap = calcHappiness(city, cityIndex, state, mapBase);
  if (city.civilDisorder !== hap.civilDisorder ||
      city.weLoveKingDay !== hap.weLoveKingDay) {
    state.cities[cityIndex] = {
      ...state.cities[cityIndex],
      civilDisorder: hap.civilDisorder,
      weLoveKingDay: hap.weLoveKingDay,
    };
  }

  // Re-read city after happiness update
  const cityAfterHap = state.cities[cityIndex];

  // ── Step 2: Food processing (delegates to processCityFood) ──
  const foodResult = processCityFood(cityAfterHap, cityIndex, state, mapBase, callbacks);
  let newFood = foodResult.newFoodInBox;
  let newSize = foodResult.newSize;
  let newWorked = foodResult.newWorked;
  let newSpecs = foodResult.newSpecs;
  let newBuildings = cityAfterHap.buildings;
  let cityDestroyed = foodResult.cityDestroyed;
  events.push(...foodResult.events);

  // ── Step 2b: Food shortage 3-turn lookahead warning ──
  // If food is decreasing (surplus < 0) and will hit 0 within 3 turns, emit warning
  if (!cityDestroyed) {
    const { surplus } = calcFoodSurplus(cityAfterHap, cityIndex, state, mapBase, state.units || []);
    if (surplus < 0 && newFood > 0) {
      const turnsUntilEmpty = Math.ceil(newFood / Math.abs(surplus));
      if (turnsUntilEmpty <= 3) {
        events.push({
          type: 'foodShortageWarning', cityName: city.name, cityIndex,
          civSlot: activeCiv, turnsUntilEmpty,
        });
      }
    }
  }

  // ── Step 3: Shield production (via processCityProduction) ──
  const prodResult = processCityProduction(cityAfterHap, cityIndex, state, mapBase, callbacks);
  let newShields = prodResult.newShieldsInBox;
  if (prodResult.newBuildings) newBuildings = prodResult.newBuildings;
  if (prodResult.newSize != null) newSize = prodResult.newSize;
  if (prodResult.newWorked != null) newWorked = prodResult.newWorked;
  events.push(...prodResult.events);

  // ── Step 3b: Unit support category pools for AI production prioritization ──
  // Binary distributes shield surplus across unit support categories with
  // different thresholds based on city size (COSMIC parameters).
  // Categories: pools of surplus shields bucketed by citySize multiples.
  // Used by AI to gauge how much production capacity is available for military.
  // Only computed when surplus > city.size (excess production available).
  {
    const shieldResult = calcShieldProduction(cityAfterHap, cityIndex, state, mapBase, state.units || []);
    const shieldSurplus = shieldResult.grossShields - shieldResult.support;
    if (shieldSurplus > cityAfterHap.size) {
      const excess = shieldSurplus - cityAfterHap.size;
      // Category pools bucketed by citySize thresholds
      const sz = Math.max(1, cityAfterHap.size);
      const catPools = [
        Math.min(excess, sz),                                    // cat 1: first citySize shields
        Math.min(Math.max(0, excess - sz), sz),                  // cat 2: next citySize
        Math.min(Math.max(0, excess - sz * 2), sz),              // cat 3: next citySize
        Math.max(0, excess - sz * 3),                            // cat 4: remainder
      ];
      prodResult.supportCategoryPools = catPools;
    }
  }

  // ── Apply accumulated changes to city ──
  const soldThisTurn = false;
  if (newSize !== cityAfterHap.size || newFood !== cityAfterHap.foodInBox ||
      newShields !== (cityAfterHap.shieldsInBox || 0) ||
      newWorked !== cityAfterHap.workedTiles || newSpecs !== cityAfterHap.specialists ||
      newBuildings !== cityAfterHap.buildings || cityAfterHap.soldThisTurn) {
    state.cities[cityIndex] = {
      ...cityAfterHap,
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

  // ── Step 4: Unit support deficit ──
  if (!cityDestroyed) {
    const deficitResult = processUnitSupportDeficit(state.cities[cityIndex], cityIndex, state, mapBase);
    events.push(...deficitResult.events);
  }

  // NOTE: Building upkeep is handled at the civ level in END_TURN's
  // trade/treasury section (reducer.js), NOT per-city here. This avoids
  // double-counting maintenance. The payBuildingUpkeep() function is
  // retained for potential future use but is not called by the orchestrator.

  // ── Step 4b: Pollution and Nuclear Meltdown (D.1) ──
  if (!cityDestroyed) {
    const pollResult = processCityPollution(state.cities[cityIndex], cityIndex, state, mapBase);
    events.push(...pollResult.events);
    if (pollResult.newSize != null || pollResult.newBuildings != null) {
      const curCity = state.cities[cityIndex];
      state.cities[cityIndex] = {
        ...curCity,
        size: pollResult.newSize ?? curCity.size,
        buildings: pollResult.newBuildings ?? curCity.buildings,
        hasWalls: (pollResult.newBuildings ?? curCity.buildings).has(8),
        hasPalace: (pollResult.newBuildings ?? curCity.buildings).has(1),
      };
    }
  }

  // ── Step 5: Disorder check (post-production) ──
  if (!cityDestroyed) {
    const disorderResult = handleCityDisorder(state.cities[cityIndex], cityIndex, state, mapBase);
    events.push(...disorderResult.events);
    // Apply disorder state changes
    const curCity = state.cities[cityIndex];
    if (curCity.civilDisorder !== disorderResult.civilDisorder ||
        curCity.weLoveKingDay !== disorderResult.weLoveKingDay ||
        curCity.disorderTurns !== disorderResult.disorderTurns) {
      state.cities[cityIndex] = {
        ...curCity,
        civilDisorder: disorderResult.civilDisorder,
        weLoveKingDay: disorderResult.weLoveKingDay,
        disorderTurns: disorderResult.disorderTurns,
      };
    }
  }

  return { events, cityDestroyed };
}
