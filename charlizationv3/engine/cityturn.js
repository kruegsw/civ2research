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
  UNIT_DOMAIN, UNIT_COSTS, UNIT_ROLE, UNIT_FP, UNIT_MOVE_POINTS, MOVEMENT_MULTIPLIER,
  IMPROVE_COSTS, IMPROVE_MAINTENANCE, IMPROVE_NAMES, WONDER_NAMES,
  SUPPORT_EXEMPT_TYPES, SETTLER_TYPES,
  CITY_RADIUS_DOUBLED,
  COMMODITY_NAMES,
  GROWTH_CAP_BUILDINGS,
  LEADER_PERSONALITY,
  getCosmic,
} from './defs.js';
import {
  calcFoodSurplus, calcShieldProduction, getProductionCost,
  calcGrossShields, calcUnitShieldSupport, calcCityTrade,
  calcSupplyDemand,
  expandCityTerritory,
} from './production.js';
import { calcHappiness } from './happiness.js';
import { cityHasBuilding, hasWonderEffect, getGovernment } from './utils.js';
import { grantAdvance, getAvailableResearch, checkUnitAutoUpgrade, upgradeUnitsForTech } from './research.js';
import { addTreatyFlag, TF } from './diplomacy.js';
import { expandTerritory } from './territory.js';

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
  const diffIdx = ['chieftain','warlord','prince','king','emperor','deity'].indexOf(difficulty || 'chieftain');

  if (!isHuman) {
    // Binary FUN_004e7eb1 lines 2901-2929: AI food box uses difficulty-scaled rows
    // Formula: rows = 13 - difficulty (or 14 - difficulty for easier levels)
    let rows = 13 - Math.max(0, diffIdx);
    if (diffIdx < 3) rows = 14 - Math.max(0, diffIdx);
    return (citySize + 1) * rows;
  }

  // Human players: base formula with Chieftain/Warlord discount
  let base = calcFoodBoxSize(citySize);
  if (difficulty === 'chieftain') base = Math.trunc(base * 6 / 10);
  else if (difficulty === 'warlord') base = Math.trunc(base * 8 / 10);
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
  // humanPlayers=0 is a valid all-AI game state; `||` would falsely flip
  // it to 0xFF (all human) and change growth-threshold branch. Use `??`
  // so we only fall through on null/undefined.
  const humanPlayers = state.humanPlayers ?? 0xFF;
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
      // #100: Granary half-fill formula from binary FUN_004e7eb1:
      // food_in_box = (newSize + 1) * (FOOD_BOX_MULTIPLIER / 2)
      // Note: uses the NEW size (post-growth) for the half-fill calculation
      newFood = hasGranary ? (newSize + 1) * Math.floor(FOOD_BOX_MULTIPLIER / 2) : 0;
    } else {
      // WLTKD growth: grow without consuming food box
      newSize++;
    }

    // Aqueduct gate: can't grow past cosmic[9] (default 8) without Aqueduct (building 9)
    let growthBlocked = null;
    // Binary ref: FUN_00441a79 (city_growth_building_check)
    const aqueductLimit = getCosmic(state, 9);  // cosmic param 9
    const sewerLimit = getCosmic(state, 10);     // cosmic param 10
    if (newSize > aqueductLimit && !cityHasBuilding(city, 9)) {
      newSize = aqueductLimit;
      newFood = growthThreshold - 1; // cap food just below threshold
      growthBlocked = 'needsAqueduct';
    }
    // Sewer System gate: can't grow past cosmic[10] (default 12) without Sewer System (building 23)
    else if (newSize > sewerLimit && !cityHasBuilding(city, 23)) {
      newSize = sewerLimit;
      newFood = growthThreshold - 1;
      growthBlocked = 'needsSewer';
    }
    // Successful growth — auto-assign new worker if callback provided
    else if (callbacks?.autoAssignWorker) {
      newWorked = callbacks.autoAssignWorker(city, cityIndex, newWorked, state, mapBase);
    }

    // Binary FUN_004e9719: if workers + specialists < expected, add entertainers
    // This handles the case where no tiles are available for a new worker
    if (!growthBlocked) {
      const expectedCitizens = newSize - 1; // -1 for city center (always worked)
      const currentAssigned = (newWorked || city.workedTiles).length + (newSpecs || city.specialists || []).length;
      if (currentAssigned < expectedCitizens) {
        const deficit = expectedCitizens - currentAssigned;
        newSpecs = [...(newSpecs || city.specialists || [])];
        for (let d = 0; d < deficit; d++) newSpecs.push('entertainer');
      }
    }

    if (growthBlocked) {
      events.push({ type: growthBlocked, cityName: city.name, cityIndex, civSlot: activeCiv });
    } else {
      events.push({ type: 'cityGrowth', cityName: city.name, cityIndex, civSlot: activeCiv, newSize });
      // Expand territory: claim one best unowned tile after city growth (basic)
      const claimed = expandCityTerritory(state, mapBase, cityIndex);
      if (claimed) {
        events.push({ type: 'territoryClaimed', cityName: city.name, cityIndex, civSlot: activeCiv, gx: claimed.gx, gy: claimed.gy });
      }
      // #106: Enhanced territory expansion for larger cities (distance, terrain, auto-road)
      if (newSize >= 3) {
        const terrResult = expandTerritory(state, mapBase, cityIndex);
        if (terrResult.events.length > 0) {
          events.push(...terrResult.events);
        }
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
        // Binary FUN_004e9719: remove priority is scientist → taxman → entertainer
        if (newSpecs.length > 0) {
          newSpecs = [...newSpecs];
          const sciIdx = newSpecs.lastIndexOf('scientist');
          if (sciIdx >= 0) newSpecs.splice(sciIdx, 1);
          else {
            const taxIdx = newSpecs.lastIndexOf('taxman');
            if (taxIdx >= 0) newSpecs.splice(taxIdx, 1);
            else newSpecs.pop(); // entertainer (or any remaining)
          }
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

  // #70: For human players, return top 3 commodities for player choice
  // (AI auto-selects best). The caller should check the returned event
  // and let the player pick from the 3 options.
  const humanPlayers = state.humanPlayers ?? 0xFF;
  const isHuman = !!((1 << city.owner) & humanPlayers);

  // Get the city's 3 available commodities (for player choice or AI selection)
  const topCommodities = [];
  for (const { id, val } of ranked) {
    if (val < 0) continue;
    topCommodities.push(id);
    if (topCommodities.length >= 3) break;
  }
  // Ensure at least one commodity
  if (topCommodities.length === 0) topCommodities.push(0);

  // Store the choices on the state for human player UI
  if (isHuman && topCommodities.length > 1) {
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({
      type: 'caravanCommodityChoice',
      cityIndex,
      cityName: city.name,
      civSlot: city.owner,
      commodities: topCommodities,
    });
  }

  // Pick the highest-supply commodity not already carried (AI auto-select or human default)
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

  // ── Binary FUN_004ec3fe:4874-4886 — BADBUILD check ──
  // At the START of each city turn, check if current production is invalid:
  //   - Building already exists in this city
  //   - Wonder already built by any civ
  // If invalid: notify human player, force switch to Warriors.
  // AI cities auto-switch silently.
  const humanPlayers = state.humanPlayers ?? 0xFF;
  const isHumanCity = !!((1 << activeCiv) & humanPlayers);
  if (city.itemInProduction) {
    const prod = city.itemInProduction;
    let badBuild = false;
    let badReason = '';

    if (prod.type === 'building' && prod.id < 39 && city.buildings?.has(prod.id)) {
      badBuild = true;
      badReason = `${IMPROVE_NAMES[prod.id] || 'Building'} already exists`;
    } else if (prod.type === 'building' && prod.id >= 39) {
      // Wonder: check global wonders array
      const wi = prod.id - 39;
      const w = state.wonders?.[wi];
      if (w && w.cityIndex != null && !w.destroyed) {
        badBuild = true;
        badReason = `${WONDER_NAMES[wi] || 'Wonder'} already built`;
      }
    } else if (prod.type === 'wonder') {
      const wi = prod.id - 39;
      const w = state.wonders?.[wi];
      if (w && w.cityIndex != null && !w.destroyed) {
        badBuild = true;
        badReason = `${WONDER_NAMES[wi] || 'Wonder'} already built`;
      }
    }

    if (badBuild) {
      if (isHumanCity) {
        events.push({
          type: 'badBuild', cityName: city.name, cityIndex,
          civSlot: activeCiv, reason: badReason,
          itemName: prod.type === 'wonder'
            ? (WONDER_NAMES[prod.id - 39] || 'Wonder')
            : (IMPROVE_NAMES[prod.id] || 'Building'),
        });
      }
      // Force switch to Warriors (binary: FUN_00441b11 with param_2=99)
      state.cities = [...state.cities];
      state.cities[cityIndex] = {
        ...state.cities[cityIndex],
        itemInProduction: { type: 'unit', id: 2 },
        // Preserve shields for the new production
      };
      city = state.cities[cityIndex];
    }
  }

  // #142: Coast guard barbarian check — prevent barbarian cities on
  // heavily improved coastal tiles from building sea units.
  // Binary: if owner == 0 (barbarian) and city is coastal with 4+ improved
  // tiles, block sea unit production (switch to land unit instead).
  if (activeCiv === 0 && city.itemInProduction?.type === 'unit' &&
      UNIT_DOMAIN[city.itemInProduction.id] === 2) {
    // Count improved tiles in city radius
    let improvedCount = 0;
    const parC = city.gy & 1;
    for (let ri = 0; ri < 21; ri++) {
      const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
      const parT = ((city.gy + ddy) % 2 + 2) % 2;
      const tgx = city.gx + ((parC + ddx - parT) >> 1);
      const tgy = city.gy + ddy;
      const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
      if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
      const imp = mapBase.getImprovements(wgx, tgy);
      if (imp && (imp.road || imp.irrigation || imp.mining || imp.fortress)) {
        improvedCount++;
      }
    }
    if (improvedCount >= 4) {
      // Switch to Warriors (type 2) instead of sea unit
      state.cities[cityIndex] = {
        ...state.cities[cityIndex],
        itemInProduction: { type: 'unit', id: 2 },
      };
      city = state.cities[cityIndex];
    }
  }

  // No NEW production during civil disorder — but if shields already
  // meet the cost, the item should still complete (binary behavior:
  // disorder blocks shield accumulation, not completion of ready items)
  if (city.civilDisorder) {
    const item = city.itemInProduction;
    const cost = item ? getProductionCost(item) : Infinity;
    const storedShields = city.shieldsInBox || 0;
    if (storedShields < cost) {
      // Not ready — skip production entirely
      return {
        newShieldsInBox: storedShields,
        newBuildings: null,
        completedItem: null,
        newSize: null,
        newWorked: null,
        events,
      };
    }
    // Otherwise fall through to complete the already-ready item
  }

  // Calculate net shield production
  const { netShields } = calcShieldProduction(city, cityIndex, state, mapBase, state.units);
  const item = city.itemInProduction;

  // Binary FUN_004ec3fe line 4850: skip shield accumulation when nothing is in production
  if (!item) {
    return {
      newShieldsInBox: city.shieldsInBox || 0,
      newBuildings: null, completedItem: null, newSize: null, newWorked: null, events,
    };
  }

  let newShields = (city.shieldsInBox || 0) + netShields;

  // ── #10: Capitalization (item index 38) — convert shields to gold ──
  // Instead of accumulating shields, each turn's net shield production
  // is converted directly to treasury gold. Shield box stays at 0.
  if (item && item.type === 'building' && item.id === 38) {
    if (netShields > 0 && state.civs?.[activeCiv]) {
      state.civs = state.civs.length ? [...state.civs] : state.civs;
      const civ = { ...state.civs[activeCiv] };
      civ.treasury = Math.min(30000, (civ.treasury || 0) + netShields);
      state.civs[activeCiv] = civ;
      events.push({
        type: 'capitalizationGold', cityName: city.name, cityIndex,
        civSlot: activeCiv, gold: netShields,
      });
    }
    return {
      newShieldsInBox: 0, // Capitalization never accumulates shields
      newBuildings: null,
      completedItem: null,
      newSize: null,
      newWorked: null,
      events,
    };
  }

  const cost = getProductionCost(item);

  let newBuildings = null;
  let completedItem = null;
  let newSize = null;
  let newWorked = null;

  if (item && newShields >= cost) {
    // ═══ PRODUCTION COMPLETE ═══
    completedItem = { ...item };

    // No shield overflow into next production — shields reset to 0 on completion
    newShields = 0;

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

      // #165: Additional veteran conditions based on Gunpowder tech
      // Binary: if city's civ has Gunpowder (tech 35) and the produced unit
      // requires Gunpowder or later, additional veteran check from government
      const civTechs = state.civTechs?.[activeCiv];
      const hasGunpowder = civTechs ? civTechs.has(35) : false;
      let veteranStatus = isVeteran;
      if (!veteranStatus && hasGunpowder && govt === 'fundamentalism') {
        // Fundamentalism gives veteran to all ground units when Gunpowder known
        if (UNIT_DOMAIN[item.id] === 0) veteranStatus = true;
      }

      const unitMP = (UNIT_MOVE_POINTS[item.id] || 1) * MOVEMENT_MULTIPLIER;
      // Observed live 2026-04-18 on fresh units produced by cities:
      //   +0x08 moves (= moveSpent) = full maxMoves (unit can't move this turn)
      //   +0x09 visMask (= hpLost in parser names) = 0 (not 0xFF)
      //   +0x0F orders = 2 (fortified) for ground military, else 0xFF (none)
      // Ground military units are unit types 2..15 in RULES order. Settlers
      // (0), Engineers (1), naval, and air units don't auto-fortify.
      const isGroundMilitary = item.id >= 2 && item.id <= 15;
      const newUnit = {
        type: item.id,
        owner: activeCiv,
        gx: city.gx, gy: city.gy,
        x: city.gx * 2 + (city.gy % 2), y: city.gy,
        veteran: veteranStatus ? 1 : 0,
        movesRemain: 0,            // memory +0x0A damage_taken = 0 (full HP)
        moveSpent: unitMP,         // memory +0x08 = all moves used this turn
        orders: isGroundMilitary ? 'fortified' : 'none',
        order: isGroundMilitary ? 2 : 0xFF,  // raw memory +0x0F byte
        movesMade: 0, movesLeft: 0,
        homeCityId: cityIndex,
        goToX: -1, goToY: -1,
        hpLost: 0,                 // memory +0x09 visMask = 0 (unseen)
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      };

      // #143: Diplomat/Spy initial target: encode home city into unit record
      // Binary: when diplomat (46) or spy (47) is produced, the unit's
      // diplomacyHomeCity field is set to cityIndex for espionage tracking
      if (item.id === 46 || item.id === 47) {
        newUnit.diplomacyHomeCity = cityIndex;
      }

      // #144: Firepower intel reset: when a unit with high firepower (FP >= 2)
      // is produced, reset enemy intelligence on this civ (binary clears spy
      // visibility flags since a powerful unit shifts military balance)
      if ((UNIT_FP[item.id] || 1) >= 2) {
        // Clear enemy intel flags for all civs that have spied on this civ
        for (let ci = 1; ci < 8; ci++) {
          if (ci === activeCiv) continue;
          if (!(state.civsAlive & (1 << ci))) continue;
          const keyAB = activeCiv < ci ? `${activeCiv}-${ci}` : `${ci}-${activeCiv}`;
          const diplo = state.diplomacy?.[keyAB];
          if (diplo?.spyIntel) {
            state.diplomacy = { ...state.diplomacy };
            state.diplomacy[keyAB] = { ...diplo, spyIntel: false };
          }
        }
      }

      // #31: Settler/Engineer from size-1 city guardrails
      // Chieftain difficulty: block settler completion from size-1 cities
      // Other difficulties: settler consumes city (city destroyed)
      if (SETTLER_TYPES.has(item.id)) {
        const difficulty = state.difficulty || 'chieftain';
        if (city.size <= 1) {
          if (difficulty === 'chieftain') {
            // Block: don't create the settler, keep shields just below completion
            // Return early before the unit is added to state.units
            return {
              newShieldsInBox: cost - 1,
              newBuildings: null,
              completedItem: null,
              newSize: null,
              newWorked: null,
              events: [...events, {
                type: 'settlerBlocked', cityName: city.name, cityIndex,
                civSlot: activeCiv, reason: 'size1Chieftain',
              }],
            };
          } else {
            // Non-Chieftain: settler consumes the city (settler still created)
            newSize = 0;
            events.push({
              type: 'cityDestroyed', cityName: city.name, cityIndex,
              civSlot: activeCiv, reason: 'settlerFromSize1',
            });
            // Disband all units homed to this city
            for (let ui = 0; ui < state.units.length; ui++) {
              const u = state.units[ui];
              if (u && u.homeCityId === cityIndex && u.gx >= 0) {
                state.units = state.units.length ? [...state.units] : state.units;
                state.units[ui] = { ...u, gx: -1, gy: -1, movesLeft: 0 };
              }
            }
            // Wonder clearing
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
        } else {
          // Normal case: city shrinks by 1
          newSize = city.size - 1;
          const curWorked = newWorked || city.workedTiles;
          if (curWorked.length > newSize && callbacks?.removeWorstWorker) {
            newWorked = callbacks.removeWorstWorker(
              { ...city, size: newSize }, cityIndex, curWorked, state, mapBase);
          }
        }
      }

      // Caravan/Freight: assign a trade commodity (port of FUN_004ec1c6)
      if (item.id === 48 || item.id === 49) {
        newUnit.commodityCarried = assignCaravanCommodity(city, cityIndex, state, mapBase);
      }

      state.units = [...state.units, newUnit];
      console.log(`[prod] Created unit type=${item.id} at (${city.gx},${city.gy}) for civ ${activeCiv}, total units now: ${state.units.length}, index: ${state.units.length - 1}`);
    } else if (item.type === 'building') {
      // ── Add building ──

      // #30: Apollo Program prerequisite check before SS part completion
      // SS parts (35-37) require Apollo Program (wonder 25) to be built
      if (item.id >= 35 && item.id <= 37) {
        const apollo = state.wonders?.[25];
        if (!apollo || apollo.cityIndex == null || apollo.destroyed) {
          // Apollo not built — block completion, cap shields just below cost
          completedItem = null;
          newShields = cost - 1;
          events.push({
            type: 'ssPartBlocked', cityName: city.name, cityIndex,
            civSlot: activeCiv, buildingId: item.id, reason: 'noApollo',
          });
          return {
            newShieldsInBox: newShields,
            newBuildings: null,
            completedItem: null,
            newSize: null,
            newWorked: null,
            events,
          };
        }
      }

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
          // #32: Preserve shields on wonder race loss — don't zero shieldsInBox.
          // The city keeps its accumulated shields for the next production item.
          completedItem = null;
          // newShields stays at current accumulated value (NOT reset to 0 or cost)
          events.push({
            type: 'wonderBeaten', cityName: city.name, cityIndex,
            civSlot: activeCiv, wonderIndex: wi,
          });
        } else {
          state.wonders = [...state.wonders];
          state.wonders[wi] = { cityIndex, destroyed: false };
          // Add wonder to city's buildings set (wonders use IDs 39-66)
          newBuildings = new Set(city.buildings);
          newBuildings.add(item.id);

          // Darwin's Voyage (18): 2 free advances on completion
          // Gap 80: If completed during revolution (anarchy), set a flag
          // so the second free tech is granted when anarchy ends.
          if (wi === 18) {
            const govt = getGovernment(null, state, activeCiv);
            const avail = getAvailableResearch(state, activeCiv);
            const techsToGrant = (govt === 'anarchy') ? 1 : 2;
            for (let n = 0; n < techsToGrant && avail.length > 0; n++) {
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
            // If in anarchy, defer the second tech grant
            if (govt === 'anarchy') {
              if (!state.civs) state.civs = [];
              state.civs = [...state.civs];
              state.civs[activeCiv] = {
                ...state.civs[activeCiv],
                darwinPendingTech: true,
              };
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
          // Marco Polo's Embassy (9): establish contact with all alive civs
          // Binary ref: FUN_004e7270 — for each civ: set_contact(owner, civ)
          if (wi === 9) {
            for (let ci = 1; ci < 8; ci++) {
              if (ci === activeCiv) continue;
              if (!(state.civsAlive & (1 << ci))) continue;
              addTreatyFlag(state, activeCiv, ci, TF.CONTACT);
            }
            events.push({ type: 'marcoPoloEmbassy', civSlot: activeCiv });
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
          // #68: Eiffel Tower (20): espionage flag + defense halving
          // Binary ref: FUN_00456f8b/FUN_0045ac71 — Eiffel Tower effects:
          //   1. Grants espionage visibility (intelligence) with all civs
          //   2. Increases patience threshold by 1 for all AI civs toward owner
          //   3. Halves AI attitudes toward owner (makes them more friendly)
          // The original code incorrectly just recalculated attitude scores.
          if (wi === 20) {
            if (state.civs) {
              state.civs = [...state.civs];
              for (let ci = 1; ci < 8; ci++) {
                if (ci === activeCiv || !(state.civsAlive & (1 << ci))) continue;
                // Grant espionage/intelligence visibility
                addTreatyFlag(state, activeCiv, ci, TF.CONTACT);
                // Halve negative attitudes toward Eiffel Tower owner
                const otherCiv = state.civs[ci];
                if (otherCiv?.attitudes) {
                  const attitudes = [...(otherCiv.attitudes || new Array(8).fill(0))];
                  if (attitudes[activeCiv] > 0) {
                    attitudes[activeCiv] = Math.floor(attitudes[activeCiv] / 2);
                  }
                  state.civs[ci] = { ...otherCiv, attitudes };
                }
              }
            }
            events.push({ type: 'eiffelTower', civSlot: activeCiv });
          }

          // Force reassign: all other cities building the SAME wonder get production reset
          // Binary ref: FUN_004ec3fe line 5156 — thunk_FUN_00441b11(citySlot, 99)
          // #32: Preserve shields — don't zero shieldsInBox on wonder race loss
          for (let oci = 0; oci < state.cities.length; oci++) {
            if (oci === cityIndex) continue;
            const oc = state.cities[oci];
            if (!oc || oc.size <= 0) continue;
            if (oc.itemInProduction?.type === 'wonder' && oc.itemInProduction?.id === item.id) {
              state.cities[oci] = {
                ...oc,
                itemInProduction: { type: 'unit', id: 2 }, // Reset to Warriors
                // shieldsInBox preserved for next production item
              };
              events.push({
                type: 'wonderRaceForceReassign', cityName: oc.name, cityIndex: oci,
                civSlot: oc.owner, wonderIndex: wi,
              });
            }
          }

          // ── #106: Territory expansion on wonder completion ──
          // Binary: wonders trigger enhanced territory claim around the city.
          const wonderTerr = expandTerritory(state, mapBase, cityIndex, { wonderBonus: true });
          if (wonderTerr.events.length > 0) {
            events.push(...wonderTerr.events);
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

  // Binary FUN_004eef23 lines 5773-5794: war/tribute penalty path.
  // When at war and government comparison condition fails, instead of
  // disbanding, set -999 tribute penalty on affected civ pairs.
  const defGovt = getGovernment(city, state);
  const isAtWar = state.treaties && Object.values(state.treaties).some(t => t === 'war');
  if (isAtWar && (defGovt === 'republic' || defGovt === 'democracy')) {
    // Apply tribute/war demand penalty to diplomacy state
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({
      type: 'supportDeficitPenalty', civSlot: activeCiv,
      cityName: city.name, deficit: support - grossShields,
    });
  }

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

    // A.8: Half-shield recovery — disbanded units return half their cost
    // Binary FUN_004eef23: shields go to NEAREST own city (FUN_0043cf76), not home city
    const unitCost = UNIT_COSTS[u.type] || 0;
    if (unitCost > 0) {
      const halfShields = Math.floor(unitCost / 2);
      if (halfShields > 0) {
        // Find nearest own city to the disbanded unit
        let nearestCi = cityIndex; // fallback to disbanding city
        let nearestDist = Infinity;
        for (let ci2 = 0; ci2 < state.cities.length; ci2++) {
          const c2 = state.cities[ci2];
          if (c2.owner !== activeCiv || c2.size <= 0) continue;
          let dx = Math.abs(u.gx - c2.gx);
          if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
          const dy = Math.abs(u.gy - c2.gy);
          const d = dx + dy;
          if (d < nearestDist) { nearestDist = d; nearestCi = ci2; }
        }
        const recvCity = state.cities[nearestCi];
        state.cities[nearestCi] = {
          ...recvCity,
          shieldsInBox: (recvCity.shieldsInBox || 0) + halfShields,
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
  const humanPlayers = state.humanPlayers ?? 0xFF;
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

  // Binary FUN_004f0221 + FUN_004f00f0: iterate buildings 1-38 in order,
  // applying special cases (Barracks scaling, Adam Smith, Fundamentalism).
  let treasury = civ.treasury || 0;
  const smithFree = hasWonderEffect(state, activeCiv, 17);
  const diffIdx = state.difficulty
    ? ['chieftain','warlord','prince','king','emperor','deity'].indexOf(state.difficulty) : 0;
  const civTechs = state.civTechs?.[activeCiv];
  const hasGunpowder = civTechs ? civTechs.has(35) : false;

  for (let bid = 1; bid <= 38 && city.buildings; bid++) {
    if (!city.buildings.has(bid)) continue;
    if (bid === 1) continue; // never sell Palace

    // Apply FUN_004f00f0 special cases per building
    let maint = IMPROVE_MAINTENANCE[bid] || 0;
    if (bid === 2) { // Barracks scaling
      if (diffIdx < 2 && maint !== 0) maint -= 1;
      if (hasGunpowder) maint += 1;
    }
    if (smithFree && maint === 1) maint = 0; // Adam Smith
    if (maint !== 0 && govt === 'fundamentalism' && (bid === 4 || bid === 14 || bid === 11)) maint = 0;
    if (maint <= 0) continue;
    treasury -= maint;

    if (treasury < 0) {
      // Auto-sell: remove building, refund cost
      treasury = 0; // Binary: civ.treasury = 0 before refund (line 69)
      const sellBuildings = new Set(city.buildings);
      sellBuildings.delete(bid);
      state.cities[cityIndex] = {
        ...state.cities[cityIndex],
        buildings: sellBuildings,
        hasWalls: sellBuildings.has(8),
        hasPalace: sellBuildings.has(1),
      };
      // Binary FUN_004f0221 lines 76-78: refund = building_cost * shield_multiplier
      // In the JS engine, IMPROVE_COSTS already includes the base shield cost.
      treasury += IMPROVE_COSTS[bid] || 0;
      events.push({
        type: 'buildingSold', cityName: city.name, cityIndex,
        civSlot: activeCiv, buildingId: bid,
      });
    }
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
export function handleCityDisorder(city, cityIndex, state, mapBase, wasInDisorderBeforeTurn) {
  const events = [];
  const activeCiv = city.owner;
  const govt = getGovernment(city, state);

  // Use pre-turn disorder state (before happiness recalc set it in step 2)
  const wasInDisorder = wasInDisorderBeforeTurn ?? city.civilDisorder;

  // Recalculate happiness
  const hap = calcHappiness(city, cityIndex, state, mapBase);

  // ── Disorder announcement — every turn the city is in disorder ──
  if (hap.civilDisorder) {
    events.push({
      type: 'civilDisorder', cityName: city.name, cityIndex, civSlot: activeCiv,
      ongoing: wasInDisorder,
    });

    // Binary FUN_004ef578 lines 5855-5864: Democracy revolution triggers
    // IMMEDIATELY on disorder onset (not after 2 turns).
    if (govt === 'democracy') {
      const disorderTurns = (city.disorderTurns || 0) + 1;
      if (disorderTurns >= 1) {
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
  // Binary FUN_004e9c14: pollution uses DAT_006a65cc (total shields WITH factory/power
  // bonuses applied, but BEFORE unit support deduction). Use grossShields, not netShields.
  const { grossShields } = calcShieldProduction(city, cityIndex, state, mapBase, state.units || []);

  // ── Nuclear Meltdown check ──
  // Binary FUN_004efd44 lines 6037-6050: Nuclear Plant (21) + no Fusion Power tech (32).
  // C does NOT require civil disorder — meltdown can happen any turn.
  // Meltdown chance: rand() % max(1, 6 - difficulty) == 0
  const civTechs = state.civTechs?.[activeCiv];
  const hasFusionPower = civTechs ? civTechs.has(32) : false;
  if (cityHasBuilding(city, 21) && !hasFusionPower) {
    const diffIdx = Math.max(0, (state.difficulty ? ['chieftain','warlord','prince','king','emperor','deity'].indexOf(state.difficulty) : 0));
    const meltdownDenom = Math.max(1, 6 - diffIdx);
    const meltdownRoll = state.rng ? state.rng.nextInt(meltdownDenom) : Math.floor(Math.random() * meltdownDenom);
    if (meltdownRoll === 0) {
      // ── MELTDOWN ──
      const newSize = Math.max(1, Math.floor(city.size / 2));
      const newBuildings = new Set(city.buildings);
      newBuildings.delete(21); // Destroy Nuclear Plant

      // Binary FUN_004efd44 lines 6060-6062: place fallout on city center tile only
      // (NOT all 21 radius tiles — that was a JS fabrication)
      const meltTileIdx = city.gy * mapBase.mw + city.gx;
      if (mapBase.tileData?.[meltTileIdx]) {
        mapBase.tileData[meltTileIdx].improvements = {
          ...mapBase.tileData[meltTileIdx].improvements,
          pollution: true,
        };
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

  // Step 2: Industrial pollution = grossShields / powerLevel - 20
  // Binary: DAT_006a6584 = DAT_006a65cc / DAT_006a65f8 - 0x14
  // DAT_006a65cc is total shields WITH building bonuses, before support deduction.
  let industrialPollution = Math.trunc(grossShields / powerLevel) - 20;

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
    // Binary FUN_004e9c14 line 3757-3761: if techCount != 0 AND civ lacks
    // Sanitation (tech 74), add +1 (pollution worsens without sanitation).
    if (techCount !== 0 && !hasTech(74)) techCount++;
    // Binary FUN_004e9c14 line 3763-3768: only reduce if techCount still > 0
    // Environmentalism(26): -1
    if (techCount !== 0 && hasTech(26)) techCount--;
    // Binary FUN_004e9c14 line 3769-3773: Solar Plant (building 29): -1
    if (techCount !== 0 && cityHasBuilding(city, 29)) techCount--;
    if (techCount < 0) techCount = 0;
    popPollution = (city.size * techCount) >> 2;
  }

  let pollutionChance = industrialPollution + popPollution;
  if (pollutionChance <= 0) return { events, newSize: null, newBuildings: null };

  // Cap at 255 (binary: 0xFF)
  if (pollutionChance > 255) pollutionChance = 255;

  // Binary FUN_004efd44 line 6012: rand() % (256 - existing) < pollutionChance * 2
  // C multiplies pollutionChance by 2 before comparison
  const rollMax = Math.max(1, 256 - (city.existingPollution || 0));
  const rollVal = state.rng ? state.rng.nextInt(rollMax) : Math.floor(Math.random() * rollMax);
  if (rollVal >= pollutionChance * 2) return { events, newSize: null, newBuildings: null };

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
 * @param {object} [options] - { skipPollution: boolean } for AI exemption (#12)
 * @returns {{ events: Array, cityDestroyed: boolean }}
 */
export function processCityTurn(cityIndex, state, mapBase, callbacks, options) {
  const city = state.cities[cityIndex];
  const activeCiv = city.owner;
  const events = [];

  // Skip cities in resistance (no production, food, etc.)
  if (city.resistanceTurns > 0) return { events, cityDestroyed: false };

  // ── #148: Clear "already processed" flag per city ──
  // Binary: city[city_idx].flags &= 0xFFBFFFBB — clear per-turn processing flags
  // at the start of each city's turn processing to prevent double-processing.
  if (city.processedThisTurn) {
    state.cities[cityIndex] = { ...state.cities[cityIndex], processedThisTurn: false };
  }

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

  // Save pre-turn disorder state for onset detection in handleCityDisorder
  const wasInDisorderBeforeTurn = !!city.civilDisorder;

  // ── #74: Process food FIRST, then recalculate yields including happiness ──
  // Binary order: food processing occurs before happiness recalculation,
  // so that city size changes from growth/famine affect happiness computation.

  // ── Step 1: Food processing FIRST (delegates to processCityFood) ──
  const foodResult = processCityFood(city, cityIndex, state, mapBase, callbacks);
  let newFood = foodResult.newFoodInBox;
  let newSize = foodResult.newSize;
  let newWorked = foodResult.newWorked;
  let newSpecs = foodResult.newSpecs;
  let newBuildings = city.buildings;
  let cityDestroyed = foodResult.cityDestroyed;
  events.push(...foodResult.events);

  // ── Step 1b: Apply food-related size changes before happiness recalc ──
  if (!cityDestroyed && (newSize !== city.size || newWorked !== city.workedTiles || newSpecs !== city.specialists)) {
    state.cities[cityIndex] = {
      ...state.cities[cityIndex],
      size: newSize,
      workedTiles: newWorked,
      specialists: newSpecs,
    };
  }

  // ── Step 2: Compute happiness AFTER food (city size changes are reflected) ──
  if (!cityDestroyed) {
    const cityForHap = state.cities[cityIndex];
    const hap = calcHappiness(cityForHap, cityIndex, state, mapBase);
    // Store happy/unhappy counts on city so client can display them
    // without needing its own (potentially divergent) happiness calc
    state.cities[cityIndex] = {
      ...state.cities[cityIndex],
      civilDisorder: hap.civilDisorder,
      weLoveKingDay: hap.weLoveKingDay,
      happyCitizens: hap.happy,
      unhappyCitizens: hap.unhappy,
    };
  }

  // Re-read city after food + happiness updates
  const cityAfterHap = state.cities[cityIndex];

  // ── Step 2b: Food shortage 3-turn lookahead warning ──
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
  {
    const shieldResult = calcShieldProduction(cityAfterHap, cityIndex, state, mapBase, state.units || []);
    const shieldSurplus = shieldResult.grossShields - shieldResult.support;
    if (shieldSurplus > cityAfterHap.size) {
      const excess = shieldSurplus - cityAfterHap.size;
      const sz = Math.max(1, cityAfterHap.size);
      const catPools = [
        Math.min(excess, sz),
        Math.min(Math.max(0, excess - sz), sz),
        Math.min(Math.max(0, excess - sz * 2), sz),
        Math.max(0, excess - sz * 3),
      ];
      prodResult.supportCategoryPools = catPools;
    }
  }

  // ── Step 3c: Unit support deficit (binary FUN_004f0a9c line 316) ──
  // Binary runs this IMMEDIATELY after production, BEFORE happiness/disorder.
  // This matters because disbanding units changes garrison count for martial law.
  if (!cityDestroyed) {
    const deficitResult = processUnitSupportDeficit(state.cities[cityIndex], cityIndex, state, mapBase);
    events.push(...deficitResult.events);
  }

  // ── #73: Second yield calculation pass (post-growth, post-production) ──
  // Binary FUN_004f0a9c: runs calc_city_production TWICE per city turn —
  // once before food/production processing, once after. The second pass
  // recalculates yields with updated city size and completed buildings.
  if (!cityDestroyed) {
    // Build city snapshot with newly completed buildings so happiness
    // recalc sees the temple/cathedral/etc. that was just built.
    // Binary FUN_004f0a9c: second yield pass runs AFTER production
    // completes, with updated building set.
    const cityPost = newBuildings !== state.cities[cityIndex].buildings
      ? { ...state.cities[cityIndex], buildings: newBuildings, hasWalls: newBuildings.has(8), hasPalace: newBuildings.has(1) }
      : state.cities[cityIndex];
    // Recalculate happiness after production changes (buildings may have completed)
    const hap2 = calcHappiness(cityPost, cityIndex, state, mapBase);
    if (cityPost.civilDisorder !== hap2.civilDisorder ||
        cityPost.weLoveKingDay !== hap2.weLoveKingDay) {
      state.cities[cityIndex] = {
        ...state.cities[cityIndex],
        civilDisorder: hap2.civilDisorder,
        weLoveKingDay: hap2.weLoveKingDay,
      };
    }
  }

  // ── #72: Wonder/attitude checks (binary FUN_004f0a9c lines 352-367) ──
  // Check Women's Suffrage and Colosseum effects during city processing,
  // calculate corruption/attitude modifiers per the leader personality.
  if (!cityDestroyed && state.civs?.[activeCiv]) {
    const cityNow = state.cities[cityIndex];
    const hasSuffrage = hasWonderEffect(state, activeCiv, 21) ||
                        cityHasBuilding(cityNow, 33); // Police Station
    const leaderIdx = state.civs[activeCiv]?.leaderIndex ?? 0;
    const leaderData = LEADER_PERSONALITY[leaderIdx];
    const leaderAggression = leaderData ? leaderData[1] : 0; // militarism

    // Corruption factor from leader aggression + buildings
    let corruptionFactor = 7 - leaderAggression;
    if (cityHasBuilding(cityNow, 7)) corruptionFactor = 5 - leaderAggression; // Courthouse
    if (cityHasBuilding(cityNow, 22)) corruptionFactor -= 1; // Stock Exchange
    if (cityHasBuilding(cityNow, 4)) { // Temple
      if (cityHasBuilding(cityNow, 6) || hasWonderEffect(state, activeCiv, 5)) {
        corruptionFactor -= 1; // Temple + Library or Oracle
      }
    }

    // Accumulate attitude modifiers on the civ
    if (corruptionFactor > 0) {
      state.civs = state.civs.length ? [...state.civs] : state.civs;
      const civ = { ...state.civs[activeCiv] };
      const suffrageReduction = hasSuffrage ? 1 : 0;
      const baseAggression = leaderData ? leaderData[1] : 0;
      // Binary: partisan_sentiment -= clamp((2 - hasSuffrage) * (baseAggression + 1), 0, 99) * corruptionFactor
      const partisanDelta = Math.max(0, Math.min(99,
        (2 - suffrageReduction) * (Math.abs(baseAggression) + 1))) * corruptionFactor;
      civ.partisanSentiment = (civ.partisanSentiment || 0) - partisanDelta;
      // Binary: citizen_discontent -= clamp(baseAggression * (1 - hasSuffrage), 0, 99) * corruptionFactor
      const discontentDelta = Math.max(0, Math.min(99,
        Math.abs(baseAggression) * (1 - suffrageReduction))) * corruptionFactor;
      civ.citizenDiscontent = (civ.citizenDiscontent || 0) - discontentDelta;
      state.civs[activeCiv] = civ;
    }
  }

  // ── #154: AI auto-settler at size 2 ──
  // Binary: when an AI city reaches size 2 for the first time, create a
  // free settler unit. This helps AI expand early game.
  if (!cityDestroyed) {
    const humanPlayers = state.humanPlayers ?? 0xFF;
    const isAI = !((1 << activeCiv) & humanPlayers);
    if (isAI && newSize === 2 && city.size < 2) {
      // City just grew to size 2 — create a free settler
      const freeSettler = {
        type: 0, // Settlers
        owner: activeCiv,
        gx: city.gx, gy: city.gy,
        x: city.gx * 2 + (city.gy % 2), y: city.gy,
        veteran: 0,
        movesRemain: 0,
        orders: 'none', movesMade: 0, movesLeft: 0,
        homeCityId: cityIndex,
        goToX: -1, goToY: -1,
        hpLost: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      };
      state.units = [...state.units, freeSettler];
      events.push({
        type: 'aiAutoSettler', cityName: city.name, cityIndex,
        civSlot: activeCiv,
      });
    }
  }

  // ── Apply accumulated changes to city ──
  // Use current state.cities[cityIndex] as base — it may have been
  // updated by the second happiness calc (hap2) with new disorder/WLTKD.
  const cityBase = state.cities[cityIndex];
  const soldThisTurn = false;
  if (newSize !== cityBase.size || newFood !== cityBase.foodInBox ||
      newShields !== (cityBase.shieldsInBox || 0) ||
      newWorked !== cityBase.workedTiles || newSpecs !== cityBase.specialists ||
      newBuildings !== cityBase.buildings || cityBase.soldThisTurn) {
    state.cities[cityIndex] = {
      ...cityBase,
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

  // NOTE: Unit support deficit (Step 3c) was moved to run immediately
  // after production, before happiness — matching binary FUN_004f0a9c
  // order: Food → Production → UnitSupportDeficit → Disorder → etc.

  // ── Step 5: Disorder check — BEFORE pollution per binary FUN_004f0a9c ──
  // Binary order: Food → Production → Support → Disorder → Trade → Upkeep → Pollution
  if (!cityDestroyed) {
    const disorderResult = handleCityDisorder(state.cities[cityIndex], cityIndex, state, mapBase, wasInDisorderBeforeTurn);
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

  // ── Step 6: Pollution and Nuclear Meltdown (after disorder per binary order) ──
  if (!cityDestroyed && !options?.skipPollution) {
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

  // ── Step 7: Building upkeep — per-city (binary FUN_004f0a9c line 390) ──
  // Binary: FUN_004f0221 runs per-city for ALL civs (human and AI).
  // Deducts maintenance from treasury; auto-sells if treasury goes negative.
  if (!cityDestroyed) {
    const upkeepResult = payBuildingUpkeep(cityIndex, state);
    events.push(...upkeepResult.events);
  }

  // ── Step 8: City expansion (binary FUN_004f0a9c line 392: FUN_004f080d) ──
  // Binary calls expansion every city turn, not just on growth.
  if (!cityDestroyed) {
    const expCity = state.cities[cityIndex];
    if (expCity.size > 0) {
      expandCityTerritory(state, mapBase, cityIndex);
    }
  }

  // ── #148: Mark city as processed this turn ──
  if (!cityDestroyed) {
    state.cities[cityIndex] = { ...state.cities[cityIndex], processedThisTurn: true };
  }

  return { events, cityDestroyed };
}

/**
 * Binary FUN_004e0ab0 (recalc_city_all): standalone city refresh.
 * Recalculates happiness and yields for a city without processing
 * a full city turn. Used after government changes, building sales,
 * and other mid-turn state changes that affect city output.
 *
 * @param {number} cityIndex
 * @param {object} state - mutable game state
 * @param {object} mapBase
 */
export function recalcCityAll(cityIndex, state, mapBase) {
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0) return;

  // Binary FUN_004eb4a1: full 5-step city refresh
  // 1. Happiness
  const hap = calcHappiness(city, cityIndex, state, mapBase);
  // 2. Food surplus
  const foodSurplus = calcFoodSurplus(city, cityIndex, state, mapBase, state.units);
  // 3. Shield production
  const shields = calcShieldProduction(city, cityIndex, state, mapBase, state.units);
  // 4. Trade/science
  const trade = calcCityTrade(city, cityIndex, state, mapBase);

  state.cities[cityIndex] = {
    ...city,
    civilDisorder: hap.civilDisorder,
    weLoveKingDay: hap.weLoveKingDay,
    happyCitizens: hap.happy,
    unhappyCitizens: hap.unhappy,
    // Cache yields for UI display
    cachedFoodSurplus: foodSurplus,
    cachedNetShields: shields.netShields,
    cachedGrossTrade: trade.grossTrade,
  };
}
