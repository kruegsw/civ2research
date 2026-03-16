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
// Distance to nearest city with Palace (building 1) owned by
// the same civ. Used in both bribe cost and incite revolt cost.
// Capped at 16. Under Communism, capped at 10.
//
// Binary ref: Scans all cities belonging to civSlot for Palace
// (building 1). Returns Manhattan distance to nearest palace city
// (capital), or 16 if none found.
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate distance from (gx, gy) to the nearest city with Palace (building 1)
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
    if (!city.buildings || !city.buildings.has(1)) continue; // Palace = building 1

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
//   distToPalace = calc_city_revolt_distance(targetOwner, unit.x, unit.y)
//   if BRIBER's govt == communism AND dist > 9: dist = 10
//   if BRIBER's govt == republic AND dist > 9: dist = 10
//   cost = unit_cost * (treasury + 750) / (dist + 2)
//   if cost < 0: cost = 30000
//   if role != settler: cost /= 2
//   (settler/engineer types: double cost already from the formula)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate bribe cost for a unit, accounting for palace distance.
 * This is the enhanced version from the decompiled binary.
 *
 * Binary ref: FUN_004c9528 — Communism distance cap checks the
 * BRIBER's (spy's) government, not the target's. Republic check
 * is also on the briber's government.
 *
 * @param {object} state - game state
 * @param {object} target - target unit
 * @param {object} mapBase - map accessor
 * @param {number} [spyCiv] - the spy's civ slot (for government checks)
 * @returns {number} bribe cost in gold
 */
export function calcBribeCostEnhanced(state, target, mapBase, spyCiv) {
  const treasury = state.civs?.[target.owner]?.treasury || 0;

  // Distance to nearest Palace of target civ
  let dist = calcCityRevoltDistance(state, mapBase, target.owner, target.gx, target.gy);

  // Communism and Republic cap — checks the BRIBER's (spy's) government per binary
  const govtCiv = spyCiv != null ? spyCiv : target.owner; // fallback for backward compat
  const govt = getGovernment(null, state, govtCiv);
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
  const curHp = Math.max(1, maxHp - (target.movesRemain || 0));
  cost = Math.floor(cost * curHp / maxHp);

  return Math.max(1, cost);
}

// ═══════════════════════════════════════════════════════════════════
// Enhanced incite revolt cost — FUN_004c6bf5 (spy_enters_city case 6)
//
// From pseudocode:
//   distToPalace = calc_city_revolt_distance(cityOwner, x, y)
//   if dist < 2: revolt impossible (palace too close)
//   if TARGET's govt == communism AND dist > 9: dist = 10
//   if TARGET's govt == republic AND dist > 9: dist = 10
//   if courthouse: dist /= 2
//   cost = citySize * (treasury + 1000) / (dist + 3)
//   if cost < 0: cost = 30000
//   if capital: cost /= 2
//   if no defenders: cost /= 2
//   if originalOwner == attacker: cost /= 2
//   if spy: cost -= cost/6 (or cost/3 if veteran)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate incite revolt cost for a city, accounting for palace distance.
 * This is the enhanced version from the decompiled binary.
 *
 * Binary ref: FUN_004c6bf5 case 6 — Communism distance cap checks the
 * TARGET civ's government (unlike bribery which checks the briber).
 *
 * @param {object} state - game state
 * @param {object} city - target city
 * @param {object} mapBase - map accessor
 * @param {object} [spy] - the spy/diplomat unit (optional, for spy discount)
 * @returns {{ cost: number, blocked: boolean }} cost in gold, or blocked if palace too close
 */
export function calcInciteCostEnhanced(state, city, mapBase, spy) {
  const treasury = state.civs?.[city.owner]?.treasury || 0;

  // Distance to nearest Palace of city owner
  let dist = calcCityRevoltDistance(state, mapBase, city.owner, city.gx, city.gy);

  // Palace within 2 tiles blocks revolt for human players
  if (dist < 2) {
    return { cost: Infinity, blocked: true };
  }

  // Communism/Republic cap — checks TARGET civ's government per binary
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
// Spy detection roll — FUN_004c64aa (spy_caught_check)
//
// Binary uses a discrete detection roll system: for each mission,
// the spy must pass 1-N detection checks. Each check calls
// checkSpySurvival(unit, -1, rng). If any check fails, the spy
// is caught.
//
// Detection check counts per mission (from reference):
//   embassy (0):           0 checks (spy always survives)
//   investigate (1):       0 checks (no detection in binary)
//   steal (2):             1 check (2 if specific steal + city has walls)
//   sabotage (3):          1 check (2 if Palace or City Walls target,
//                                   3 if SDI Defense target)
//   incite (4):            0 checks (cost-based, not detection)
//   nuke (5):              3 checks (+1 if defenders) — handled separately
//   poison (6):            1 check
//   sabotageProduction:    1 check
//   subvert:               0 checks (cost-based, not detection)
// ═══════════════════════════════════════════════════════════════════

/**
 * Perform spy detection rolls for an operation.
 *
 * Binary mechanic: each mission requires passing N discrete detection
 * checks (FUN_004c64aa). Each check calls checkSpySurvival with
 * param_2=-1 (caught scenario). Failure on any check = spy is caught.
 *
 * Returns 1.0 if the spy evades all detection checks, 0.0 if caught.
 * Callers use `if (state.rng.random() >= result)` so:
 *   1.0 → rng.random() >= 1.0 is always false → spy NOT caught
 *   0.0 → rng.random() >= 0.0 is always true  → spy IS caught
 *
 * Note: The actual detection rolls happen inside this function using
 * state.rng. The caller's subsequent rng.random() call is vestigial
 * but harmless (just consumes one random number).
 *
 * @param {object} spy - spy unit
 * @param {object} city - target city
 * @param {string} operation - operation type
 * @param {object} state - game state
 * @returns {number} 1.0 if spy evades detection, 0.0 if caught
 */
export function calcSpySuccessChance(spy, city, operation, state) {
  // Number of detection checks per mission type (from binary reference)
  const detectionCounts = {
    embassy: 0,            // case 0: no detection checks
    investigate: 0,        // case 1: no detection checks
    steal: 1,              // case 2: 1 base check
    sabotage: 1,           // case 3: 1 base check
    poison: 1,             // case 6: 1 check
    nuke: 3,               // case 5: handled in handleSpyPlantNuke, but 3 base if called here
    sabotageProduction: 1, // sabotage variant: 1 check
  };

  let numChecks = detectionCounts[operation] ?? 1;

  // Sabotage: extra detection checks if targeting protected buildings
  // Binary ref: Palace (building 1) or City Walls (building 8) → +1 check
  //             SDI Defense (building 17) → +2 checks
  // TODO: These extra checks apply when targeting *specific* buildings
  // (spy-only specific sabotage). The current action system doesn't pass
  // the targeted building ID through to this function. For now, apply
  // the base check count. When specific sabotage targeting is wired up,
  // pass the target building ID and add the extra checks here.

  const rng = state.rng;

  // Perform each detection check using the binary's spyCaughtCheck mechanic
  for (let i = 0; i < numChecks; i++) {
    if (spyCaughtCheck(spy, rng)) {
      return 0.0; // caught
    }
  }

  return 1.0; // evaded all detection
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

// ═══════════════════════════════════════════════════════════════════
// J.1: Spy escape teleport — surviving spy teleports to nearest
//      friendly city instead of remaining at hostile location
// ═══════════════════════════════════════════════════════════════════

/**
 * Teleport a surviving spy to the nearest friendly city after an operation.
 * Binary ref: when spy survives (checkSpySurvival returns true), the spy
 * is moved to the nearest own city rather than staying at the target.
 *
 * @param {object} state - game state
 * @param {object} mapBase - map accessor
 * @param {number} unitIndex - index of the spy in state.units
 * @returns {boolean} true if teleported, false if no city found
 */
export function spyEscapeTeleport(state, mapBase, unitIndex) {
  const spy = state.units[unitIndex];
  if (!spy || spy.gx < 0) return false;

  let bestCi = -1, bestDist = Infinity;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const c = state.cities[ci];
    if (c.owner !== spy.owner || c.size <= 0) continue;
    const d = tileDist(spy.gx, spy.gy, c.gx, c.gy, mapBase.mw, mapBase.wraps);
    if (d < bestDist) { bestDist = d; bestCi = ci; }
  }

  if (bestCi < 0) return false;

  const dest = state.cities[bestCi];
  state.units = [...state.units];
  state.units[unitIndex] = {
    ...spy,
    gx: dest.gx, gy: dest.gy,
    x: dest.gx * 2 + (dest.gy % 2), y: dest.gy,
    orders: 'none', movesLeft: 0,
  };
  return true;
}

// ═══════════════════════════════════════════════════════════════════
// J.2: Lone unit bribery validation — cannot bribe a unit if it's
//      the only unit on the tile AND there's a city there
// ═══════════════════════════════════════════════════════════════════

/**
 * Validate whether a unit can be bribed. In Civ2, you cannot bribe:
 * - Units in a city if they're the only defender (would capture city for free)
 * - Units belonging to your own civ
 * - Units that are already at coordinates < 0 (dead)
 *
 * @param {object} state - game state
 * @param {number} targetIndex - index of unit to bribe
 * @param {number} spyCiv - civ attempting the bribe
 * @returns {{ valid: boolean, reason: string }}
 */
export function validateBribery(state, targetIndex, spyCiv) {
  const target = state.units[targetIndex];
  if (!target || target.gx < 0) return { valid: false, reason: 'Invalid target' };
  if (target.owner === spyCiv) return { valid: false, reason: 'Cannot bribe own unit' };
  if (target.owner === 0) return { valid: false, reason: 'Cannot bribe barbarian units' };

  // Check if target is the only unit on a city tile (lone defender)
  const onCity = state.cities.some(c =>
    c.gx === target.gx && c.gy === target.gy && c.owner === target.owner && c.size > 0);
  if (onCity) {
    const unitsOnTile = state.units.filter(u =>
      u.gx === target.gx && u.gy === target.gy && u.owner === target.owner && u.gx >= 0);
    if (unitsOnTile.length <= 1) {
      return { valid: false, reason: 'Cannot bribe sole city defender' };
    }
  }

  return { valid: true, reason: '' };
}
