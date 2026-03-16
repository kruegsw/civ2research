// ═══════════════════════════════════════════════════════════════════
// espionage.js — Espionage functions (shared: server + client)
//
// Phase J.2: Implements Civ2 espionage mechanics.
//
// Ported from decompiled functions:
//   FUN_004c59f0  — handle_incident_terror (1465B)
//   FUN_004c5fae  — spy_diplomat_action (1271B)
//   FUN_004c64aa  — spy_caught_check (163B)
//   FUN_004c65d2  — calc_city_revolt_distance (232B)
//   FUN_004c6bf5  — spy_enters_city (10469B)
//   FUN_004c9528  — pick_up_unit / bribe (2453B)
//   FUN_004c9ebd  — spy_sabotage_unit (784B)
// ═══════════════════════════════════════════════════════════════════

import { UNIT_COSTS, UNIT_HP, ADVANCE_NAMES } from './defs.js';
import { getGovernment, cityHasBuilding, hasWonderEffect } from './utils.js';

// ═══════════════════════════════════════════════════════════════════
// calc_city_revolt_distance — FUN_004c65d2 (232B)
//
// Distance to nearest city with barracks (building 2) owned by
// the same civ. Used in both bribe cost and incite revolt cost.
// Capped at 16. Under Communism, capped at 10.
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate distance from (gx, gy) to the nearest city with barracks (building 2)
 * owned by civSlot. Capped at 16.
 *
 * @param {object} state - game state
 * @param {object} mapBase - map accessor
 * @param {number} civSlot - owning civ
 * @param {number} gx - target x
 * @param {number} gy - target y
 * @returns {number} distance (0-16)
 */
export function calcCityRevoltDistance(state, mapBase, civSlot, gx, gy) {
  let minDist = 16;

  if (!state.cities) return minDist;

  for (const city of state.cities) {
    if (city.size <= 0 || city.owner !== civSlot) continue;
    if (!city.buildings || !city.buildings.has(2)) continue; // barracks = building 2

    const dist = tileDist(gx, gy, city.gx, city.gy, mapBase.mw, mapBase.wraps);
    if (dist < minDist) {
      minDist = dist;
    }
  }

  return minDist;
}

/**
 * Manhattan distance with optional wrapping.
 */
function tileDist(ax, ay, bx, by, mw, wraps) {
  let dx = Math.abs(ax - bx);
  if (wraps) dx = Math.min(dx, mw - dx);
  return dx + Math.abs(ay - by);
}

// ═══════════════════════════════════════════════════════════════════
// Spy survival mechanics — FUN_004c5fae (spy_diplomat_action)
//
// When a spy completes an action, check survival:
//   - Diplomats (type 46) are always consumed
//   - Spies (type 47) have a survival chance based on:
//     - Base odds: 2 (caught) or 3 (success)
//     - Veteran doubles odds
//     - Hard mission halves odds
//     - Random coin flip bonus when odds are low
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if a spy survives after an action.
 *
 * @param {object} unit - the spy/diplomat unit
 * @param {number} successLevel - -1=caught, 0=normal, 1=hard
 * @returns {{ survives: boolean, becomesVeteran: boolean }}
 */
export function checkSpySurvival(unit, successLevel, rng) {
  // Diplomats (type 46) always die
  if (unit.type === 46) {
    return { survives: false, becomesVeteran: false };
  }

  // Spy (type 47) survival calculation from decompiled code
  let survivalOdds = (successLevel < 0 ? 1 : 0) + 2; // base: 2 (success) or 3 (caught)

  if (unit.veteran) {
    survivalOdds *= 2;
  }

  if (successLevel > 0) {
    survivalOdds = Math.floor(survivalOdds / 2);
  }

  // Coin flip bonus when odds are low
  if (survivalOdds < 2) {
    if ((rng ? rng.random() : Math.random()) < 0.5) {
      survivalOdds++;
    }
  }

  if (survivalOdds <= 1) {
    return { survives: false, becomesVeteran: false };
  }

  const roll = rng ? rng.nextInt(survivalOdds) : Math.floor(Math.random() * survivalOdds);
  if (roll !== 0) {
    // Spy survives and becomes veteran
    return { survives: true, becomesVeteran: true };
  }

  return { survives: false, becomesVeteran: false };
}

/**
 * Cumulative spy caught check — used for harder actions (plant nuke, etc.)
 * Each check is an independent survival test with successLevel=-1.
 *
 * @param {object} unit - the spy unit
 * @returns {boolean} true if spy is caught (fails check)
 */
export function spyCaughtCheck(unit, rng) {
  const result = checkSpySurvival(unit, -1, rng);
  return !result.survives;
}

// ═══════════════════════════════════════════════════════════════════
// Enhanced bribe cost — FUN_004c9528 (pick_up_unit)
//
// From pseudocode:
//   distToBarracks = calc_city_revolt_distance(targetOwner, unit.x, unit.y)
//   if republic AND dist > 9: dist = 10
//   cost = unit_cost * (treasury + 750) / (dist + 2)
//   if cost < 0: cost = 30000
//   if role != settler: cost /= 2
//   (settler/engineer types: double cost already from the formula)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate bribe cost for a unit, accounting for barracks distance.
 * This is the enhanced version from the decompiled binary.
 *
 * @param {object} state - game state
 * @param {object} target - target unit
 * @param {object} mapBase - map accessor
 * @returns {number} bribe cost in gold
 */
export function calcBribeCostEnhanced(state, target, mapBase) {
  const treasury = state.civs?.[target.owner]?.treasury || 0;

  // Distance to nearest barracks of target civ
  let dist = calcCityRevoltDistance(state, mapBase, target.owner, target.gx, target.gy);

  // Communism and Republic cap at 10
  const govt = getGovernment(null, state, target.owner);
  if (govt === 'communism') dist = Math.min(dist, 10);
  if (govt === 'republic' && dist > 9) dist = 10;

  const unitCost = (UNIT_COSTS[target.type] || 10) / 10; // raw shield cost
  let cost = Math.floor(unitCost * (treasury + 750) / (dist + 2));
  if (cost < 0) cost = 30000;

  // Settlers/Engineers cost more (role = settler)
  if (target.type !== 0 && target.type !== 1) {
    cost = Math.floor(cost / 2);
  }

  // Damaged units cost less
  const maxHp = (UNIT_HP && UNIT_HP[target.type]) || 10;
  const curHp = Math.max(1, maxHp - (target.hpLost || 0));
  cost = Math.floor(cost * curHp / maxHp);

  return Math.max(1, cost);
}

// ═══════════════════════════════════════════════════════════════════
// Enhanced incite revolt cost — FUN_004c6bf5 (spy_enters_city case 6)
//
// From pseudocode:
//   distToBarracks = calc_city_revolt_distance(cityOwner, x, y)
//   if dist < 2: revolt impossible (barracks too close)
//   if republic AND dist > 9: dist = 10
//   if courthouse: dist /= 2
//   cost = citySize * (treasury + 1000) / (dist + 3)
//   if cost < 0: cost = 30000
//   if capital: cost /= 2
//   if no defenders: cost /= 2
//   if originalOwner == attacker: cost /= 2
//   if spy: cost -= cost/6 (or cost/3 if veteran)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate incite revolt cost for a city, accounting for barracks distance.
 * This is the enhanced version from the decompiled binary.
 *
 * @param {object} state - game state
 * @param {object} city - target city
 * @param {object} mapBase - map accessor
 * @param {object} [spy] - the spy/diplomat unit (optional, for spy discount)
 * @returns {{ cost: number, blocked: boolean }} cost in gold, or blocked if barracks too close
 */
export function calcInciteCostEnhanced(state, city, mapBase, spy) {
  const treasury = state.civs?.[city.owner]?.treasury || 0;

  // Distance to nearest barracks of city owner
  let dist = calcCityRevoltDistance(state, mapBase, city.owner, city.gx, city.gy);

  // Barracks within 2 tiles blocks revolt
  if (dist < 2) {
    return { cost: Infinity, blocked: true };
  }

  const govt = getGovernment(null, state, city.owner);
  if (govt === 'republic' && dist > 9) dist = 10;
  if (govt === 'communism') dist = Math.min(dist, 10);

  // Courthouse halves distance (building 7)
  if (city.buildings && city.buildings.has(7)) {
    dist = Math.max(1, Math.floor(dist / 2));
  }

  let cost = Math.floor(city.size * (treasury + 1000) / (dist + 3));
  if (cost < 0) cost = 30000;

  // Capital city (has Palace, building 1)
  if (city.buildings && city.buildings.has(1)) {
    cost = Math.floor(cost / 2);
  }

  // No defenders at city
  const hasGarrison = state.units.some(u =>
    u.gx === city.gx && u.gy === city.gy && u.owner === city.owner && u.gx >= 0
  );
  if (!hasGarrison) {
    cost = Math.floor(cost / 2);
  }

  // City was originally owned by the spy's owner
  if (spy && city.originalOwner === spy.owner) {
    cost = Math.floor(cost / 2);
  }

  // Spy discount (not diplomat)
  if (spy && spy.type === 47) {
    if (spy.veteran) {
      cost -= Math.floor(cost / 3);
    } else {
      cost -= Math.floor(cost / 6);
    }
  }

  return { cost: Math.max(1, cost), blocked: false };
}

// ═══════════════════════════════════════════════════════════════════
// Spy success chance calculator
//
// Factors: operation type, spy veteran status, courthouse,
// police station, city size, distance from capital.
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate spy success chance for an operation.
 *
 * @param {object} spy - spy unit
 * @param {object} city - target city
 * @param {string} operation - operation type ('steal', 'sabotage', 'poison', 'nuke', 'investigate')
 * @param {object} state - game state
 * @returns {number} success probability 0.0-1.0
 */
export function calcSpySuccessChance(spy, city, operation, state) {
  // Base chance depends on operation type
  const baseChances = {
    investigate: 0.95,
    steal: 0.65,
    sabotage: 0.60,
    poison: 0.50,
    nuke: 0.25,
    embassy: 0.95,
    sabotageProduction: 0.65,
  };

  let chance = baseChances[operation] || 0.50;

  // Spy veteran bonus: +50% relative
  if (spy.veteran) {
    chance = Math.min(1.0, chance * 1.5);
  }

  // Courthouse reduces chance by 25% relative (building 7)
  if (city.buildings && city.buildings.has(7)) {
    chance *= 0.75;
  }

  // Police Station reduces chance by 25% relative (building 33)
  if (city.buildings && city.buildings.has(33)) {
    chance *= 0.75;
  }

  // Counterspy units in city increase detection
  if (state.units) {
    const counterspies = state.units.filter(u =>
      u.gx === city.gx && u.gy === city.gy && u.owner === city.owner &&
      u.gx >= 0 && (u.type === 46 || u.type === 47)
    );
    for (const cs of counterspies) {
      // Each counterspy increases detection:
      // diplomat: +20%, spy: +40%, veteran spy: +60%
      const interceptChance = cs.type === 46 ? 0.20
        : (cs.veteran ? 0.60 : 0.40);
      chance *= (1.0 - interceptChance);
    }
  }

  return Math.max(0.0, Math.min(1.0, chance));
}

// ═══════════════════════════════════════════════════════════════════
// handle_incident_terror — FUN_004c59f0 (1465B)
//
// Diplomatic consequences when a spy performs an action against
// another civ. May trigger war declaration, attitude penalty,
// senate scandal, or revolution.
// ═══════════════════════════════════════════════════════════════════

/**
 * Handle diplomatic incident from espionage (terror incident).
 * Modifies state treaties and attitudes.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} attackerCiv - civ that performed espionage
 * @param {number} defenderCiv - civ that was spied on
 */
export function handleEspionageIncident(state, mapBase, attackerCiv, defenderCiv) {
  if (attackerCiv <= 0 || defenderCiv <= 0) return;
  if (attackerCiv === defenderCiv) return;

  if (!state.treaties) state.treaties = {};
  const key = attackerCiv < defenderCiv ? `${attackerCiv}-${defenderCiv}` : `${defenderCiv}-${attackerCiv}`;
  const treaty = state.treaties[key];

  // No contact: just lower attitude
  if (!treaty || treaty === 'war') {
    adjustAttitudeHelper(state, defenderCiv, attackerCiv, -20);
    return;
  }

  // At peace or ceasefire: significant diplomatic fallout
  if (treaty === 'peace' || treaty === 'ceasefire' || treaty === 'alliance') {
    // Lower attitude significantly
    adjustAttitudeHelper(state, defenderCiv, attackerCiv, -30);

    // Record incident
    if (!state.diplomacy) state.diplomacy = {};
    const dKey = `${defenderCiv}-${attackerCiv}`;
    const prev = state.diplomacy[dKey] || {};
    state.diplomacy = {
      ...state.diplomacy,
      [dKey]: { ...prev, espionageIncident: true, incidentTurn: state.turn?.number || 0 },
    };

    // If at peace/ceasefire, there's a chance the defender declares war
    // (AI will handle this in their turn; for now record the incident)
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({
      type: 'espionageIncident',
      attacker: attackerCiv,
      defender: defenderCiv,
      previousTreaty: treaty,
    });
  }

  // Senate scandal for democracies/republics
  const attackerGovt = getGovernment(null, state, attackerCiv);
  if (attackerGovt === 'democracy') {
    // Democracy always triggers revolution on espionage incident
    triggerRevolutionFromScandal(state, attackerCiv);
  } else if (attackerGovt === 'republic') {
    // 50% chance of scandal for republic
    if ((state.rng ? state.rng.random() : Math.random()) < 0.5) {
      triggerRevolutionFromScandal(state, attackerCiv);
    }
  }
}

/**
 * Trigger a revolution due to senate scandal.
 */
function triggerRevolutionFromScandal(state, civSlot) {
  if (!state.civs?.[civSlot]) return;

  state.civs = [...state.civs];
  const civ = { ...state.civs[civSlot] };
  civ.government = 'anarchy';
  civ.anarchyTurns = 1 + (state.rng ? state.rng.nextInt(4) : Math.floor(Math.random() * 4)); // 1-4 turns
  state.civs[civSlot] = civ;

  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({
    type: 'senateScandal',
    civSlot,
    message: 'Senate scandal! Government overthrown!',
  });
}

/**
 * Helper to adjust attitude (safe, creates arrays as needed).
 */
function adjustAttitudeHelper(state, civSlot, targetCiv, delta) {
  if (!state.civs?.[civSlot]) return;
  state.civs = [...state.civs];
  const civ = { ...state.civs[civSlot] };
  if (!civ.attitudes || !Array.isArray(civ.attitudes)) {
    const old = civ.attitudes;
    civ.attitudes = [0, 0, 0, 0, 0, 0, 0, 0];
    if (old) for (const [k, v] of Object.entries(old)) civ.attitudes[+k] = v;
  } else {
    civ.attitudes = [...civ.attitudes];
  }
  const cur = civ.attitudes[targetCiv] ?? 0;
  civ.attitudes[targetCiv] = Math.max(-100, Math.min(100, cur + delta));
  state.civs[civSlot] = civ;
}
