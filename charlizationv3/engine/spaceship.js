// ═══════════════════════════════════════════════════════════════════
// spaceship.js — Spaceship & Victory system (shared: server + client)
//
// Phase I: Spaceship stats, launch, scoring, and game end conditions.
// Ported from:
//   FUN_00596eec (recalc_spaceship_stats)
//   FUN_005973fd (launch_spaceship)
//   FUN_004a28b0 (calc_civ_score)
//   FUN_0048aedc (check_game_end_conditions)
// ═══════════════════════════════════════════════════════════════════

import { WONDER_NAMES, WONDER_OBSOLETE, DIFFICULTY_KEYS } from './defs.js';

// ── Spaceship part building IDs ──
const SS_STRUCTURAL = 35;  // building ID for SS Structural
const SS_COMPONENT  = 36;  // building ID for SS Component
const SS_MODULE     = 37;  // building ID for SS Module

// Apollo Program wonder index
const WONDER_APOLLO = 25;

// COSMIC parameter #20 default: base flight time constant
const COSMIC_FLIGHT_TIME = 220;

// ── Year calculation (inlined to avoid import cycle with year.js) ──
const YEAR_SCHEDULE = [
  { until: 250, perTurn: 20 },
  { until: 300, perTurn: 10 },
  { until: 350, perTurn: 5 },
  { until: 400, perTurn: 2 },
  { until: Infinity, perTurn: 1 },
];

function getNumericYear(turnsPassed) {
  const turn = turnsPassed || 0;
  let year = -4000, t = 0;
  for (const seg of YEAR_SCHEDULE) {
    const turnsInSeg = Math.min(turn, seg.until) - t;
    if (turnsInSeg <= 0) break;
    year += turnsInSeg * seg.perTurn;
    t += turnsInSeg;
    if (t >= turn) break;
  }
  return year;
}

/**
 * Count spaceship parts across all cities owned by a civ.
 *
 * Spaceship parts are buildings 35 (Structural), 36 (Component), 37 (Module)
 * that can exist in multiple cities. Each city can have at most one of each,
 * but the civ total counts across all cities.
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {{ structurals: number, components: number, modules: number }}
 */
function countSpaceshipParts(state, civSlot) {
  let structurals = 0, components = 0, modules = 0;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== civSlot || city.size <= 0) continue;
    if (!city.buildings) continue;
    if (city.buildings.has(SS_STRUCTURAL)) structurals++;
    if (city.buildings.has(SS_COMPONENT))  components++;
    if (city.buildings.has(SS_MODULE))     modules++;
  }
  return { structurals, components, modules };
}

/**
 * Check if a civ has Apollo Program active (not obsoleted).
 */
function hasApollo(state, civSlot) {
  const obsTech = WONDER_OBSOLETE[WONDER_APOLLO];
  if (obsTech >= 0 && state.civTechs) {
    for (let c = 0; c < 8; c++) {
      if (state.civTechs[c]?.has(obsTech)) return false;
    }
  }
  const w = state.wonders?.[WONDER_APOLLO];
  if (!w || w.cityIndex == null || w.destroyed) return false;
  // Apollo benefits everyone once built, but only the owner gets the flight bonus
  const city = state.cities[w.cityIndex];
  return city && city.owner === civSlot;
}

/**
 * Recalculate spaceship stats for a civ — ported from FUN_00596eec.
 *
 * Computes mass, success probability, flight time, and arrival estimate.
 * Stores results in state.spaceships[civSlot].
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot
 * @returns {object} the spaceship stats object
 */
export function recalcSpaceshipStats(state, civSlot) {
  const parts = countSpaceshipParts(state, civSlot);
  if (!state.spaceships) state.spaceships = {};

  const existing = state.spaceships[civSlot] || {};
  const launched = existing.launched || false;
  const launchTurn = existing.launchTurn ?? -1;

  // ── Mass calculation ──
  // Each structural = 600 tons, component = 400 tons, module = 800 tons
  // (simplified from the weight table in the binary)
  const mass = parts.structurals * 600 + parts.components * 400 + parts.modules * 800;

  // ── Success probability ──
  let success = 100;

  // Success requires at least 1 of each part type for basic integrity
  if (parts.structurals === 0 || parts.components === 0 || parts.modules === 0) {
    success = 0;
  } else {
    // Fuel ratio: components provide propulsion, modules provide habitation
    // fuel_ratio = (components * 100) / modules — clamped to 0-100
    const fuelRatio = Math.min(100, Math.floor((parts.components * 100) / Math.max(1, parts.modules)));
    success = Math.floor((Math.min(100, fuelRatio) * success) / 100);

    // Energy ratio: structurals provide shielding
    // energy_ratio = (structurals * 200) / (components + modules) — clamped to 0-100
    const energyRatio = Math.min(100,
      Math.floor((parts.structurals * 200) / Math.max(1, parts.components + parts.modules)));
    success = Math.floor((Math.min(100, energyRatio) * success) / 100);
  }

  // ── Flight time (in 10ths of a turn) ──
  let flightConstant = COSMIC_FLIGHT_TIME;
  const hasApolloBonus = hasApollo(state, civSlot);
  if (hasApolloBonus) {
    flightConstant = Math.floor(flightConstant * 3 / 4);
  }

  // Thrust from components, population from modules
  const thrust = Math.max(1, parts.components * 10);
  let flightTime = mass > 0 ? Math.floor((mass * flightConstant) / (thrust + 1)) : 0;

  // Penalty for long flight: if flightTime > 150 (15.0 turns), -1% per turn over
  if (flightTime > 150) {
    success -= Math.floor((flightTime - 150) / 10);
  }
  success = Math.max(0, Math.min(100, success));

  // Convert flight time from 10ths to turns (integer)
  const flightTurns = Math.max(1, Math.ceil(flightTime / 10));

  // ── Arrival turn estimate ──
  const currentTurn = state.turn?.number || 0;
  const arrivalTurn = launched
    ? launchTurn + flightTurns
    : currentTurn + flightTurns;

  // ── Can launch? Need at least 1 of each part ──
  const canLaunch = !launched &&
    parts.structurals >= 1 && parts.components >= 1 && parts.modules >= 1;

  const ss = {
    ...parts,
    mass,
    successProb: success,
    flightTurns,
    arrivalTurn,
    launched,
    launchTurn,
    canLaunch,
    hasApollo: hasApolloBonus,
  };

  state.spaceships = { ...state.spaceships, [civSlot]: ss };
  return ss;
}

/**
 * Launch a civ's spaceship — ported from FUN_005973fd.
 *
 * Sets launched flag and records launch turn. After launch, AI civs
 * switch all cities to Capitalization.
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot
 * @returns {object[]} events
 */
export function launchSpaceship(state, civSlot) {
  const events = [];

  // Recalculate stats first
  const ss = recalcSpaceshipStats(state, civSlot);
  if (!ss.canLaunch && !ss.launched) {
    events.push({ type: 'launchFailed', civSlot, reason: 'Not enough parts' });
    return events;
  }
  if (ss.launched) {
    events.push({ type: 'launchFailed', civSlot, reason: 'Already launched' });
    return events;
  }

  const currentTurn = state.turn?.number || 0;
  const updatedSs = {
    ...ss,
    launched: true,
    launchTurn: currentTurn,
    arrivalTurn: currentTurn + ss.flightTurns,
    canLaunch: false,
  };
  state.spaceships = { ...state.spaceships, [civSlot]: updatedSs };

  const civName = state.civs?.[civSlot]?.name || `Civ ${civSlot}`;
  events.push({
    type: 'spaceshipLaunched', civSlot, civName,
    arrivalTurn: updatedSs.arrivalTurn,
    flightTurns: ss.flightTurns,
    successProb: ss.successProb,
  });

  // AI civs switch all cities to Capitalization after launch
  const isHuman = state.humanPlayers & (1 << civSlot);
  if (!isHuman) {
    for (let ci = 0; ci < state.cities.length; ci++) {
      const city = state.cities[ci];
      if (city.owner !== civSlot || city.size <= 0) continue;
      state.cities[ci] = {
        ...city,
        itemInProduction: { type: 'building', id: 38, name: 'Capitalization' },
        shieldsStored: 0,
      };
    }
  }

  return events;
}

/**
 * Calculate a civ's score — ported from FUN_004a28b0.
 *
 * Components:
 *   - Population: sum(city.size + happyCitizens - unhappyCitizens)
 *   - Wonders: 20 points per active wonder owned
 *   - Future tech: 5 points per future tech level
 *   - Difficulty modifier: difficultyLevel * 25 - 50
 *   - Map exploration bonus (after turn 199): up to 100 points
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {{ total: number, population: number, wonders: number, futureTech: number, difficulty: number }}
 */
export function calcCivScore(state, civSlot) {
  // ── Population score ──
  let populationScore = 0;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== civSlot || city.size <= 0) continue;
    // Original: city.size + happyCitizens - unhappyCitizens
    // We may not track happy/unhappy on the state — use city.size as base
    const happy = city.happyCitizens || 0;
    const unhappy = city.unhappyCitizens || 0;
    populationScore += city.size + happy - unhappy;
  }

  // ── Wonder score ──
  let wonderScore = 0;
  if (state.wonders) {
    for (let wi = 0; wi < state.wonders.length; wi++) {
      const w = state.wonders[wi];
      if (!w || w.cityIndex == null || w.destroyed) continue;
      const wCity = state.cities[w.cityIndex];
      if (wCity && wCity.owner === civSlot) {
        wonderScore += 20;
      }
    }
  }

  // ── Future tech score ──
  const futureTechCount = state.futureTechCounts?.[civSlot] || 0;
  const futureTechScore = futureTechCount * 5;

  // ── Difficulty modifier ──
  const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain'));
  const difficultyMod = diffIdx * 25 - 50;

  // ── Map exploration bonus (after turn 199) ──
  let mapBonus = 0;
  const turnNum = state.turn?.number || 0;
  if (turnNum > 199) {
    // Approximate map explored percentage from explored tile count
    // In practice, we clamp to a reasonable value
    const exploredPercent = state.mapExploredPercent?.[civSlot] || 0;
    mapBonus = Math.min(100, Math.max(0, exploredPercent * 3));
  }

  // ── Spaceship score ──
  let spaceshipScore = 0;
  const ss = state.spaceships?.[civSlot];
  if (ss && ss.launched) {
    // Bonus based on flight time and arrival
    const arrived = ss.arrivalTurn <= turnNum;
    if (arrived) {
      // Successful arrival: large bonus scaled by year
      const yearFactor = turnNum;
      spaceshipScore = Math.max(0, (570 - yearFactor) * 2 + 400);
    } else {
      // In-flight bonus proportional to parts
      spaceshipScore = (ss.structurals + ss.components + ss.modules) * 10;
    }
  }

  // ── Base score ──
  const baseScore = Math.max(0,
    populationScore + wonderScore + futureTechScore + difficultyMod + mapBonus + spaceshipScore);

  return {
    total: baseScore,
    population: populationScore,
    wonders: wonderScore,
    futureTech: futureTechScore,
    difficulty: difficultyMod,
    mapBonus,
    spaceship: spaceshipScore,
  };
}

/**
 * Check game end conditions — ported from FUN_0048aedc.
 *
 * Conditions checked:
 *   1. Conquest: only one non-barbarian civ remains alive
 *   2. Spaceship arrival: a launched spaceship has arrived (turn >= arrivalTurn)
 *      and the random success check passes
 *   3. Retirement: year >= 2020 AD (forced game end)
 *
 * @param {object} state - game state
 * @returns {object|null} { ended: true, winner: civSlot, reason: string } or null
 */
export function checkGameEndConditions(state) {
  // Already ended
  if (state.gameOver) return null;

  const turnNum = state.turn?.number || 0;

  // ── 1. Conquest: only one non-barbarian civ alive ──
  let aliveCount = 0;
  let lastAlive = -1;
  for (let c = 1; c <= 7; c++) {
    if (state.civsAlive & (1 << c)) {
      aliveCount++;
      lastAlive = c;
    }
  }
  if (aliveCount === 1 && lastAlive > 0) {
    return { ended: true, winner: lastAlive, reason: 'conquest' };
  }
  if (aliveCount === 0) {
    return { ended: true, winner: -1, reason: 'extinction' };
  }

  // ── 2. Spaceship arrival ──
  if (state.spaceships) {
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      const ss = state.spaceships[c];
      if (!ss || !ss.launched) continue;
      if (turnNum >= ss.arrivalTurn) {
        // Success check: roll against successProb
        // In a deterministic simulation, use successProb > 50 as threshold
        if (ss.successProb >= 50) {
          return {
            ended: true, winner: c,
            reason: 'spaceship',
            successProb: ss.successProb,
          };
        } else {
          // Ship lost! Mark it
          const updatedSs = { ...ss, launched: false, destroyed: true };
          state.spaceships = { ...state.spaceships, [c]: updatedSs };
        }
      }
    }
  }

  // ── 3. Retirement: year >= 2020 ──
  const year = getNumericYear(turnNum);
  if (year >= 2020) {
    // Find the civ with the highest score
    let bestCiv = -1, bestScore = -1;
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      const score = calcCivScore(state, c);
      if (score.total > bestScore) {
        bestScore = score.total;
        bestCiv = c;
      }
    }
    return {
      ended: true,
      winner: bestCiv,
      reason: 'retirement',
      year,
      score: bestScore,
    };
  }

  return null;
}
