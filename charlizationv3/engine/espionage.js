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

import { UNIT_COSTS, UNIT_HP, ADVANCE_NAMES, DIFFICULTY_KEYS } from './defs.js';
import { getGovernment, cityHasBuilding, hasWonderEffect } from './utils.js';
import { calcGarrisonDistance } from './production.js';
import { handleNuclearAttack } from './nuclear.js';
import { TF, getTreatyFlags, setTreatyFlags, addTreatyFlag } from './diplomacy.js';

// ═══════════════════════════════════════════════════════════════════
// Intelligence access check
//
// Determines whether viewerCiv can see intelligence (city details,
// unit info, etc.) about targetCiv. Conditions:
//   - Has Espionage tech (advance 27)
//   - Has Writing tech (advance 88)
//   - Has an embassy with targetCiv
//   - Map is revealed (cheat / scenario flag)
//
// Binary ref: FUN_00520000 block — intelligence visibility checks
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if viewerCiv can view intelligence about targetCiv.
 *
 * @param {object} state - game state
 * @param {number} viewerCiv - civ slot that wants to view
 * @param {number} targetCiv - civ slot being viewed
 * @returns {boolean} true if viewer has intelligence access
 */
export function canViewIntelligence(state, viewerCiv, targetCiv) {
  if (viewerCiv === targetCiv) return true;

  // Check for Espionage tech (advance 27)
  if (state.civTechs?.[viewerCiv]?.has(27)) return true;

  // Check for Writing tech (advance 88)
  if (state.civTechs?.[viewerCiv]?.has(88)) return true;

  // Check for embassy
  if (state.embassies) {
    const embKey = `${viewerCiv}-${targetCiv}`;
    if (state.embassies[embKey]) return true;
  }

  // Map revealed (scenario/cheat flag)
  if (state.mapRevealed) return true;

  return false;
}

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

  // Communism and Republic cap — binary checks the BRIBER's (spy's) government, not target's
  // Binary ref: FUN_004c9528 line 2953: checks param_2 (spy civ), NOT the target unit's owner
  const bribeGovt = spyCiv != null ? getGovernment(null, state, spyCiv) : getGovernment(null, state, target.owner);
  if (bribeGovt === 'communism') dist = Math.min(dist, 10);
  if (bribeGovt === 'republic' && dist > 9) dist = 10;

  const unitCost = (UNIT_COSTS[target.type] || 10) / 10; // raw shield cost (costs are ×10 internal)
  let cost = Math.floor(unitCost * (treasury + 750) / (dist + 2));
  if (cost < 0) cost = 30000;

  // Settlers/Engineers cost more (role = settler)
  if (target.type !== 0 && target.type !== 1) {
    cost = Math.floor(cost / 2);
  }

  // Damaged units cost less — use hpLost (damage taken), not movesRemain
  // Binary ref: FUN_004c9528 uses unit's actual HP damage field to discount bribe cost
  const maxHp = (UNIT_HP && UNIT_HP[target.type]) || 10;
  const hpLost = target.hpLost || 0;
  const curHp = Math.max(1, maxHp - hpLost);
  cost = Math.floor(cost * curHp / maxHp);

  // Garrison proximity discount: if nearest garrison is far (distance > 10),
  // the unit is less protected and easier to bribe — reduce cost by 10%
  if (mapBase) {
    const garrisonDist = calcGarrisonDistance(state, mapBase, target.gx, target.gy, target.owner);
    if (garrisonDist > 10) {
      cost = Math.floor(cost * 0.9);
    }
  }

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

  // Garrison proximity discount: if nearest garrison is far (distance > 10),
  // the city is less protected — reduce incite cost by 15%
  if (mapBase) {
    const garrisonDist = calcGarrisonDistance(state, mapBase, city.gx, city.gy, city.owner);
    if (garrisonDist > 10) {
      cost = Math.floor(cost * 0.85);
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

  // Gap 77: Senate scandal for Republic/Democracy on espionage incidents.
  // Binary FUN_004c59f0: Communism blocks the scandal entirely.
  // Democracy always triggers, Republic has 50% chance.
  const attackerGovt = getGovernment(null, state, attackerCiv);
  if (attackerGovt !== 'communism') {
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

// ═══════════════════════════════════════════════════════════════════
// Mission Execution Stubs — J.2 Phase 2
//
// Each mission function: checks spy survival via calcSpySuccessChance,
// applies the effect on success, handles diplomatic incident via
// handleEspionageIncident, teleports surviving spy, and returns events.
//
// Binary ref: FUN_004c6bf5 (spy_enters_city) — giant switch statement
// with cases 0-7 for each mission type.
// ═══════════════════════════════════════════════════════════════════

/**
 * Find the spy unit index on a city tile for a given civ.
 * @returns {number} unit index or -1
 */
function findSpyOnCity(state, spyCiv, cityIndex) {
  const city = state.cities[cityIndex];
  if (!city) return -1;
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.owner === spyCiv && u.gx === city.gx && u.gy === city.gy && u.gx >= 0 &&
        (u.type === 46 || u.type === 47)) {
      return i;
    }
  }
  return -1;
}

/**
 * Mission 0: Establish Embassy.
 * No detection checks. Always succeeds. Diplomat/spy is consumed (diplomat)
 * or survives (spy). Sets embassy flag between civs.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} targetCiv - civ owning the target city
 * @param {number} cityIndex - index of target city
 * @returns {object[]} events
 */
export function establishEmbassy(state, mapBase, spyCiv, targetCiv, cityIndex) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.owner !== targetCiv) {
    events.push({ type: 'espionageFailed', mission: 'embassy', reason: 'Invalid city' });
    return events;
  }

  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'embassy', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];

  // Embassy: no detection checks (case 0 in binary)
  // Set embassy flag
  if (!state.embassies) state.embassies = {};
  const embKey = `${spyCiv}-${targetCiv}`;
  state.embassies = { ...state.embassies, [embKey]: true };

  events.push({
    type: 'embassyEstablished', spyCiv, targetCiv,
    cityName: city.name, cityIndex,
  });

  // Spy survival (diplomats always consumed, spies survive)
  const survival = checkSpySurvival(spy, 0, state.rng);
  if (!survival.survives) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyConsumed', spyCiv, unitIndex: spyIdx });
  } else {
    if (survival.becomesVeteran && !spy.veteran) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, veteran: true };
    }
    spyEscapeTeleport(state, mapBase, spyIdx);
  }

  return events;
}

/**
 * Mission 1: Investigate City.
 * No detection checks. Reveals city production, buildings, garrison.
 * Diplomat consumed; spy survives.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} cityIndex - index of target city
 * @returns {object[]} events
 */
export function investigateCity(state, mapBase, spyCiv, cityIndex) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0) {
    events.push({ type: 'espionageFailed', mission: 'investigate', reason: 'Invalid city' });
    return events;
  }

  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'investigate', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];

  // Investigation: no detection checks (case 1 in binary)
  // Gather intelligence
  const garrison = state.units.filter(u =>
    u.gx === city.gx && u.gy === city.gy && u.owner === city.owner && u.gx >= 0);

  events.push({
    type: 'cityInvestigated', spyCiv, cityIndex,
    cityName: city.name, owner: city.owner,
    production: city.itemInProduction,
    buildings: city.buildings ? [...city.buildings] : [],
    garrisonCount: garrison.length,
    size: city.size,
  });

  // Spy survival
  const survival = checkSpySurvival(spy, 0, state.rng);
  if (!survival.survives) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyConsumed', spyCiv, unitIndex: spyIdx });
  } else {
    if (survival.becomesVeteran && !spy.veteran) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, veteran: true };
    }
    spyEscapeTeleport(state, mapBase, spyIdx);
  }

  return events;
}

/**
 * Mission 2: Steal Technology.
 * Binary ref: FUN_004c6bf5 case 2.
 * 1 detection check for random steal; 2 checks for specific steal if city has walls.
 * On success, transfers a tech from target to spy's civ.
 * Spies (type 47) can choose a specific tech; diplomats steal randomly.
 * After a successful steal, city is marked as "already stolen from" (stolenFrom flag).
 * Subsequent steals from the same city require the STEALHARD dialog (specific only).
 * Triggers diplomatic incident.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} targetCiv - civ owning the target city
 * @param {number} cityIndex - index of target city
 * @param {object} rng - random number generator
 * @param {number} [targetTechId] - specific tech to steal (spy only)
 * @returns {object[]} events
 */
export function stealTech(state, mapBase, spyCiv, targetCiv, cityIndex, rng, targetTechId) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.owner !== targetCiv) {
    events.push({ type: 'espionageFailed', mission: 'stealTech', reason: 'Invalid city' });
    return events;
  }

  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'stealTech', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];
  const effectiveRng = rng || state.rng;
  const isSpecific = targetTechId != null && spy.type === 47;

  // Detection checks: 1 base, +1 if specific steal AND city has walls (building 8)
  let numChecks = 1;
  if (isSpecific && city.buildings && city.buildings.has(8)) {
    numChecks = 2;
  }
  // If city was already stolen from and this is a random steal, block it
  // (binary: city.flags & 0x08 means already stolen from — must use specific steal)
  if (!isSpecific && city.stolenFrom) {
    events.push({ type: 'stealTechFailed', spyCiv, targetCiv, reason: 'Already stolen from this city' });
    return events;
  }

  for (let i = 0; i < numChecks; i++) {
    if (spyCaughtCheck(spy, effectiveRng)) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
      events.push({ type: 'spyCaught', spyCiv, targetCiv, mission: 'stealTech', cityName: city.name });
      handleEspionageIncident(state, mapBase, spyCiv, targetCiv);
      return events;
    }
  }

  // Find stealable techs
  const spyTechs = state.civTechs?.[spyCiv] || new Set();
  const targetTechs = state.civTechs?.[targetCiv] || new Set();
  const stealable = [];
  for (const tech of targetTechs) {
    if (!spyTechs.has(tech)) stealable.push(tech);
  }

  if (stealable.length === 0) {
    events.push({ type: 'stealTechFailed', spyCiv, targetCiv, reason: 'No stealable techs' });
  } else {
    let techId;
    if (isSpecific && stealable.includes(targetTechId)) {
      // Spy-specific steal: take the requested tech
      techId = targetTechId;
    } else if (isSpecific) {
      // Requested tech not available — fall back to random
      techId = stealable[effectiveRng ? effectiveRng.nextInt(stealable.length) : Math.floor(Math.random() * stealable.length)];
    } else {
      // Random steal (diplomat or spy without specific target)
      techId = stealable[effectiveRng ? effectiveRng.nextInt(stealable.length) : Math.floor(Math.random() * stealable.length)];
    }
    // Grant the tech to spy's civ
    if (!state.civTechs[spyCiv]) state.civTechs[spyCiv] = new Set();
    state.civTechs[spyCiv] = new Set(state.civTechs[spyCiv]);
    state.civTechs[spyCiv].add(techId);

    // Mark city as "already stolen from" (binary: city.flags |= 0x08)
    state.cities = [...state.cities];
    state.cities[cityIndex] = { ...city, stolenFrom: true };

    events.push({
      type: 'techStolen', spyCiv, targetCiv, techId,
      techName: ADVANCE_NAMES[techId] || `Tech ${techId}`,
      cityName: city.name,
      specific: isSpecific,
    });
  }

  // Diplomatic incident
  handleEspionageIncident(state, mapBase, spyCiv, targetCiv);

  // Spy survival
  const survival = checkSpySurvival(spy, 0, effectiveRng);
  if (!survival.survives) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyConsumed', spyCiv, unitIndex: spyIdx });
  } else {
    if (survival.becomesVeteran && !spy.veteran) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, veteran: true };
    }
    spyEscapeTeleport(state, mapBase, spyIdx);
  }

  return events;
}

/**
 * Mission 3: Sabotage City.
 * Binary ref: FUN_004c6bf5 case 3 — two modes:
 *   1. Random sabotage (diplomat or spy without specific target):
 *      Roll rand() % 39 to pick a building. If city has it, destroy it.
 *      If no building hit, reset production shields to 0.
 *   2. Specific sabotage (spy only, targetBuildingId provided):
 *      Destroy the specific building. Extra detection checks for
 *      Palace(1)/City Walls(8)/SDI Defense(17).
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} cityIndex - index of target city
 * @param {object} rng - random number generator
 * @param {number} [targetBuildingId] - specific building to destroy (spy only)
 * @returns {object[]} events
 */
export function sabotageProduction(state, mapBase, spyCiv, cityIndex, rng, targetBuildingId) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0) {
    events.push({ type: 'espionageFailed', mission: 'sabotageProduction', reason: 'Invalid city' });
    return events;
  }

  const targetCiv = city.owner;
  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'sabotageProduction', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];
  const effectiveRng = rng || state.rng;
  const isSpecific = targetBuildingId != null && targetBuildingId > 0 && spy.type === 47;

  // Detection checks (case 3): base 1, extra for specific targets
  // Binary: Palace(1) or City Walls(8) → +1 check, SDI Defense(17) → +2 checks
  let numChecks = 1;
  if (isSpecific) {
    if (targetBuildingId === 1 || targetBuildingId === 8) numChecks = 2;
    else if (targetBuildingId === 17) numChecks = 3;
  }

  for (let i = 0; i < numChecks; i++) {
    if (spyCaughtCheck(spy, effectiveRng)) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
      events.push({ type: 'spyCaught', spyCiv, targetCiv, mission: 'sabotageProduction', cityName: city.name });
      handleEspionageIncident(state, mapBase, spyCiv, targetCiv);
      return events;
    }
  }

  state.cities = [...state.cities];
  const updCity = { ...city };
  let destroyedBuilding = null;

  if (isSpecific) {
    // Specific sabotage: destroy the targeted building
    if (updCity.buildings && updCity.buildings.has(targetBuildingId)) {
      const newBuildings = new Set(updCity.buildings);
      newBuildings.delete(targetBuildingId);
      updCity.buildings = newBuildings;
      destroyedBuilding = targetBuildingId;
    } else {
      // Building not present — reset shields instead
      updCity.shieldsStored = 0;
    }
  } else {
    // Random sabotage: roll rand() % 39 to pick a random building
    // Binary: scans building IDs 1-38 (39 slots), if city has the rolled building, destroy it
    const roll = effectiveRng ? effectiveRng.nextInt(39) : Math.floor(Math.random() * 39);
    const buildingId = roll; // 0-38, where 0 means no building hit
    if (buildingId >= 1 && updCity.buildings && updCity.buildings.has(buildingId)) {
      const newBuildings = new Set(updCity.buildings);
      newBuildings.delete(buildingId);
      updCity.buildings = newBuildings;
      destroyedBuilding = buildingId;
    } else {
      // No building hit — reset production shields to 0
      updCity.shieldsStored = 0;
    }
  }

  state.cities[cityIndex] = updCity;

  if (destroyedBuilding != null) {
    events.push({
      type: 'buildingDestroyed', spyCiv, targetCiv, cityIndex,
      cityName: city.name, buildingId: destroyedBuilding,
    });
  } else {
    events.push({
      type: 'productionSabotaged', spyCiv, targetCiv, cityIndex,
      cityName: city.name,
      production: city.itemInProduction,
    });
  }

  // Diplomatic incident
  handleEspionageIncident(state, mapBase, spyCiv, targetCiv);

  // Spy survival
  const survival = checkSpySurvival(spy, 1, effectiveRng); // hard mission
  if (!survival.survives) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyConsumed', spyCiv, unitIndex: spyIdx });
  } else {
    if (survival.becomesVeteran && !spy.veteran) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, veteran: true };
    }
    spyEscapeTeleport(state, mapBase, spyIdx);
  }

  return events;
}

/**
 * Mission 6: Poison Water Supply.
 * 1 detection check. On success, reduces city size by 1.
 * Triggers diplomatic incident.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} cityIndex - index of target city
 * @param {object} rng - random number generator
 * @returns {object[]} events
 */
export function poisonWater(state, mapBase, spyCiv, cityIndex, rng) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0) {
    events.push({ type: 'espionageFailed', mission: 'poisonWater', reason: 'Invalid city' });
    return events;
  }

  const targetCiv = city.owner;
  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'poisonWater', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];
  const effectiveRng = rng || state.rng;

  // Detection check (case 6: 1 check)
  const detectionResult = calcSpySuccessChance(spy, city, 'poison', state);
  if (detectionResult === 0.0) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyCaught', spyCiv, targetCiv, mission: 'poisonWater', cityName: city.name });
    handleEspionageIncident(state, mapBase, spyCiv, targetCiv);
    return events;
  }

  // Poison: reduce city size by 1 (minimum 1)
  const newSize = Math.max(1, city.size - 1);
  state.cities = [...state.cities];
  state.cities[cityIndex] = { ...city, size: newSize };

  events.push({
    type: 'waterPoisoned', spyCiv, targetCiv, cityIndex,
    cityName: city.name,
    oldSize: city.size, newSize,
  });

  // Diplomatic incident
  handleEspionageIncident(state, mapBase, spyCiv, targetCiv);

  // Spy survival
  const survival = checkSpySurvival(spy, 1, effectiveRng); // hard mission
  if (!survival.survives) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyConsumed', spyCiv, unitIndex: spyIdx });
  } else {
    if (survival.becomesVeteran && !spy.veteran) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, veteran: true };
    }
    spyEscapeTeleport(state, mapBase, spyIdx);
  }

  return events;
}

/**
 * Mission 4: Incite Revolt.
 * Cost-based (no detection checks). On success, transfers city ownership
 * to spy's civ. Uses calcInciteCostEnhanced for cost validation.
 * Triggers diplomatic incident.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} cityIndex - index of target city
 * @param {object} rng - random number generator
 * @returns {object[]} events
 */
export function inciteRevolt(state, mapBase, spyCiv, cityIndex, rng) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0) {
    events.push({ type: 'espionageFailed', mission: 'inciteRevolt', reason: 'Invalid city' });
    return events;
  }

  const targetCiv = city.owner;
  if (targetCiv === spyCiv) {
    events.push({ type: 'espionageFailed', mission: 'inciteRevolt', reason: 'Cannot incite own city' });
    return events;
  }

  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'inciteRevolt', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];
  const effectiveRng = rng || state.rng;

  // Calculate cost
  const costResult = calcInciteCostEnhanced(state, city, mapBase, spy);
  if (costResult.blocked) {
    events.push({ type: 'inciteBlocked', spyCiv, targetCiv, cityName: city.name, reason: 'Palace too close' });
    return events;
  }

  // Check if spy's civ can afford it
  const spyTreasury = state.civs?.[spyCiv]?.treasury || 0;
  if (spyTreasury < costResult.cost) {
    events.push({ type: 'inciteTooExpensive', spyCiv, targetCiv, cityName: city.name, cost: costResult.cost, treasury: spyTreasury });
    return events;
  }

  // Deduct cost
  state.civs = [...state.civs];
  state.civs[spyCiv] = { ...state.civs[spyCiv], treasury: spyTreasury - costResult.cost };

  // Transfer city ownership
  state.cities = [...state.cities];
  state.cities[cityIndex] = { ...city, owner: spyCiv };

  // Transfer garrison units to spy's civ
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.gx === city.gx && u.gy === city.gy && u.owner === targetCiv && u.gx >= 0) {
      state.units = [...state.units];
      state.units[i] = { ...u, owner: spyCiv };
    }
  }

  events.push({
    type: 'cityRevolt', spyCiv, targetCiv, cityIndex,
    cityName: city.name, cost: costResult.cost,
  });

  // Diplomatic incident
  handleEspionageIncident(state, mapBase, spyCiv, targetCiv);

  // Spy survival (no detection checks for incite, but spy is consumed)
  const survival = checkSpySurvival(spy, 0, effectiveRng);
  if (!survival.survives) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyConsumed', spyCiv, unitIndex: spyIdx });
  } else {
    if (survival.becomesVeteran && !spy.veteran) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, veteran: true };
    }
    spyEscapeTeleport(state, mapBase, spyIdx);
  }

  return events;
}

/**
 * Mission 5: Plant Nuclear Device.
 * Binary ref: FUN_004c6bf5 case 5 — spy-only mission requiring:
 *   - Spy type (not diplomat)
 *   - Civ has Rocketry (tech 73 = 0x49)
 *   - Civ has Nuclear Fission (tech 58 = 0x3A)
 *   - Manhattan Project wonder (index 23 = 0x17) must exist
 *
 * 3-4 detection checks (3 base + 1 if city has defenders).
 * On success: nuclear explosion at city, blame attacker, all-civ attitude penalty.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} cityIndex - index of target city
 * @param {object} rng - random number generator
 * @returns {object[]} events
 */
export function plantNuclearDevice(state, mapBase, spyCiv, cityIndex, rng) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0) {
    events.push({ type: 'espionageFailed', mission: 'plantNuke', reason: 'Invalid city' });
    return events;
  }

  const targetCiv = city.owner;
  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'plantNuke', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];
  const effectiveRng = rng || state.rng;

  // Must be a Spy (type 47), not a Diplomat
  if (spy.type !== 47) {
    events.push({ type: 'espionageFailed', mission: 'plantNuke', reason: 'Requires spy, not diplomat' });
    return events;
  }

  // Tech requirements: Rocketry (73) and Nuclear Fission (58)
  const spyTechs = state.civTechs?.[spyCiv];
  if (!spyTechs || !spyTechs.has(73) || !spyTechs.has(58)) {
    events.push({ type: 'espionageFailed', mission: 'plantNuke', reason: 'Missing required techs' });
    return events;
  }

  // Manhattan Project (wonder index 23) must exist
  const mpWonder = state.wonders?.[23];
  if (!mpWonder || mpWonder.cityIndex == null) {
    events.push({ type: 'espionageFailed', mission: 'plantNuke', reason: 'Manhattan Project not built' });
    return events;
  }

  // 3 base detection checks + 1 if city has defenders (4 total max)
  let numChecks = 3;
  const hasDefenders = state.units.some(u =>
    u.gx === city.gx && u.gy === city.gy && u.owner === targetCiv && u.gx >= 0 && u.type !== 46 && u.type !== 47
  );
  if (hasDefenders) numChecks = 4;

  for (let i = 0; i < numChecks; i++) {
    if (spyCaughtCheck(spy, effectiveRng)) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
      events.push({ type: 'spyCaught', spyCiv, targetCiv, mission: 'plantNuke', cityName: city.name });
      handleEspionageIncident(state, mapBase, spyCiv, targetCiv);
      return events;
    }
  }

  // Nuclear explosion at city coordinates
  // Uses the same handleNuclearAttack function as regular nukes
  const nukeResult = handleNuclearAttack(state, mapBase, spyCiv, city.gx, city.gy);
  events.push(...nukeResult.events);

  // All-civ attitude penalty: +100 (max hostility) from ALL civs toward the spy's civ
  // Binary: for (civ=1; civ<8; civ++) if (civ != spyCiv):
  //   adjust_attitude(civ, spyCiv, 100)  — max hostility
  //   set_treaty_flag(spyCiv, civ, 0x2000)  — WAR flag
  for (let c = 1; c <= 7; c++) {
    if (c === spyCiv) continue;
    if (!(state.civsAlive & (1 << c))) continue;
    // Set attitude to max hostility
    adjustAttitudeHelper(state, c, spyCiv, +100);
    // Set WAR flag between spy's civ and the affected civ
    addTreatyFlag(state, spyCiv, c, TF.WAR);
  }

  events.push({
    type: 'nuclearDevicePlanted', spyCiv, targetCiv, cityIndex,
    cityName: city.name, intercepted: nukeResult.intercepted,
  });

  // Diplomatic incident
  handleEspionageIncident(state, mapBase, spyCiv, targetCiv);

  // Spy survival (hard mission, successLevel=1)
  const survival = checkSpySurvival(spy, 1, effectiveRng);
  if (!survival.survives) {
    state.units = [...state.units];
    state.units[spyIdx] = { ...spy, gx: -1, gy: -1 };
    events.push({ type: 'spyConsumed', spyCiv, unitIndex: spyIdx });
  } else {
    if (survival.becomesVeteran && !spy.veteran) {
      state.units = [...state.units];
      state.units[spyIdx] = { ...spy, veteran: true };
    }
    spyEscapeTeleport(state, mapBase, spyIdx);
  }

  return events;
}

/**
 * Mission 7: Counter-Espionage.
 * Binary ref: FUN_004c6bf5 case 7 — numeric strength calculation.
 * Spy stays alive at the city providing ongoing protection.
 *
 * Strength formula:
 *   base = spy ? 10 : 5
 *   base += difficultyTable[difficulty]   (5,4,3,2,1,0 for chieftain..deity)
 *   if veteran: base += 2
 *   base += rand() % 6
 *
 * The counter-espionage strength is stored on the city and affects
 * enemy spy detection rolls while the protecting spy remains.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} spyCiv - civ performing the action
 * @param {number} cityIndex - index of own city to protect
 * @returns {object[]} events
 */
export function counterEspionage(state, mapBase, spyCiv, cityIndex) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0 || city.owner !== spyCiv) {
    events.push({ type: 'espionageFailed', mission: 'counterEspionage', reason: 'Invalid or not own city' });
    return events;
  }

  const spyIdx = findSpyOnCity(state, spyCiv, cityIndex);
  if (spyIdx < 0) {
    events.push({ type: 'espionageFailed', mission: 'counterEspionage', reason: 'No spy at city' });
    return events;
  }
  const spy = state.units[spyIdx];
  const rng = state.rng;

  // Calculate counter-espionage strength (binary formula)
  const isSpy = spy.type === 47;
  let strength = isSpy ? 10 : 5;

  // Difficulty table: [5, 4, 3, 2, 1, 0] for chieftain..deity
  const diffKeys = ['chieftain', 'warlord', 'prince', 'king', 'emperor', 'deity'];
  const diffTable = [5, 4, 3, 2, 1, 0];
  const diffIdx = Math.max(0, diffKeys.indexOf(state.difficulty || 'chieftain'));
  strength += diffTable[diffIdx] || 0;

  // Veteran bonus
  if (spy.veteran) strength += 2;

  // Random component
  strength += rng ? rng.nextInt(6) : Math.floor(Math.random() * 6);

  // Set counter-espionage on the city with numeric strength
  state.cities = [...state.cities];
  state.cities[cityIndex] = {
    ...city,
    counterEspionage: true,
    counterEspionageCiv: spyCiv,
    counterEspionageStrength: strength,
    counterEspionageSpyIdx: spyIdx,
  };

  events.push({
    type: 'counterEspionageSet', spyCiv, cityIndex, cityName: city.name,
    strength,
  });

  // Spy stays alive at the city — set orders to counterEspionage but keep position
  // Binary: spy is NOT consumed; it remains stationed providing ongoing protection
  state.units = [...state.units];
  state.units[spyIdx] = { ...spy, orders: 'counterEspionage', movesLeft: 0 };

  return events;
}
