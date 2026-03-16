// ═══════════════════════════════════════════════════════════════════
// spaceship.js — Spaceship & Victory system (shared: server + client)
//
// Phase I: Spaceship stats, launch, scoring, and game end conditions.
// Phase 6 K: Accurate mass tables, score formula, year 2000 warning.
// Ported from:
//   FUN_00596eec (recalc_spaceship_stats)
//   FUN_005973fd (launch_spaceship)
//   FUN_004a28b0 (calc_civ_score)
//   FUN_0048aedc (check_game_end_conditions)
// ═══════════════════════════════════════════════════════════════════

import { WONDER_NAMES, WONDER_OBSOLETE, DIFFICULTY_KEYS, ADVANCE_NAMES } from './defs.js';
import { getNumericYear } from './year.js';

// ── Spaceship part building IDs ──
const SS_STRUCTURAL = 35;  // building ID for SS Structural
const SS_COMPONENT  = 36;  // building ID for SS Component
const SS_MODULE     = 37;  // building ID for SS Module

// Apollo Program wonder index
const WONDER_APOLLO = 25;

// COSMIC parameter #20 default: base flight time constant
const COSMIC_FLIGHT_TIME = 220;

// ── K.1: Binary-accurate mass per part type (tons) ──
// Structural parts: 800 tons each
// Components have two sub-types (propulsion/fuel) but in our building system
// they're one type; the binary uses 400 for propulsion + 600 for fuel.
// Average component mass = 500 tons (split evenly propulsion/fuel)
// Modules have three sub-types: habitation (1000), life support (800), solar panel (800)
// Average module mass = ~867 tons, but binary counts them separately.
// Since we track aggregate counts, we use the per-part averages:
const SS_MASS_STRUCTURAL = 800;   // 800 tons each
const SS_MASS_COMPONENT  = 500;   // avg of propulsion(400) + fuel(600)
const SS_MASS_MODULE     = 867;   // avg of hab(1000) + life(800) + solar(800)

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

  // ── K.1: Mass calculation using binary's weight table ──
  const mass = parts.structurals * SS_MASS_STRUCTURAL
    + parts.components * SS_MASS_COMPONENT
    + parts.modules * SS_MASS_MODULE;

  // ── K.1: Success probability — fuel ratio × energy ratio × flight penalty ──
  let success = 100;

  // Success requires at least 1 of each part type for basic integrity
  if (parts.structurals === 0 || parts.components === 0 || parts.modules === 0) {
    success = 0;
  } else {
    // Fuel ratio: components (propulsion+fuel) vs modules (habitation+life+solar)
    // Higher component-to-module ratio = better fuel coverage
    // fuel_ratio = min(100, components * 100 / modules)
    const fuelRatio = Math.min(100, Math.floor((parts.components * 100) / Math.max(1, parts.modules)));

    // Energy ratio: structurals (shielding) vs total payload (components + modules)
    // energy_ratio = min(100, structurals * 200 / (components + modules))
    const energyRatio = Math.min(100,
      Math.floor((parts.structurals * 200) / Math.max(1, parts.components + parts.modules)));

    // Binary formula: success = (fuelRatio * energyRatio) / 100
    // This is fuel ratio × energy ratio as multiplicative percentages
    success = Math.floor((fuelRatio * energyRatio) / 100);
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
 * K.3: Fixed to match binary scoring formula:
 *   - Population: sum of citySize * (citySize + 1) / 2 * 10000 (Civ2 population formula)
 *     Score contribution = totalPopulation / 10000 (displayed as population in thousands)
 *   - Wonders: 20 points each (owned, not obsolete)
 *   - Future techs: 5 points per level
 *   - Peace bonus: 3 points per consecutive turn of peace
 *   - Technology: 2 points per tech discovered
 *   - Map exploration: (exploredTiles / totalTiles) * 300
 *   - Spaceship: arrival bonus scaled by year
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {{ total: number, population: number, wonders: number, futureTech: number, peace: number, technology: number, mapBonus: number, spaceship: number }}
 */
export function calcCivScore(state, civSlot) {
  // ── Population score (binary formula: citySize * (citySize+1) / 2 * 10000) ──
  // Civ2 population: each city has pop = size * (size+1) / 2 * 10000
  // Score contribution is totalPop / 10000 (so effectively sum of size*(size+1)/2)
  let populationScore = 0;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== civSlot || city.size <= 0) continue;
    // Binary: sum of citySize * (citySize + 1) / 2 per city
    // This gives population in units of 10000, so score = raw pop / 10000
    populationScore += Math.floor(city.size * (city.size + 1) / 2);
  }

  // ── Wonder score: 20 points per owned, non-obsolete wonder ──
  let wonderScore = 0;
  if (state.wonders) {
    for (let wi = 0; wi < state.wonders.length; wi++) {
      const w = state.wonders[wi];
      if (!w || w.cityIndex == null || w.destroyed) continue;
      const wCity = state.cities[w.cityIndex];
      if (!wCity || wCity.owner !== civSlot) continue;
      // Check if wonder is obsolete
      const obsTech = WONDER_OBSOLETE[wi];
      let obsolete = false;
      if (obsTech >= 0 && state.civTechs) {
        for (let c = 0; c < 8; c++) {
          if (state.civTechs[c]?.has(obsTech)) { obsolete = true; break; }
        }
      }
      if (!obsolete) wonderScore += 20;
    }
  }

  // ── Future tech score: 5 points per level ──
  const futureTechCount = state.futureTechCounts?.[civSlot] || 0;
  const futureTechScore = futureTechCount * 5;

  // ── Peace bonus: 3 points per consecutive turn of peace ──
  const peaceTurns = state.civPeaceTurns?.[civSlot] || 0;
  const peaceScore = peaceTurns * 3;

  // ── Technology: 2 points per tech discovered ──
  const techCount = state.civTechs?.[civSlot]?.size || 0;
  const techScore = techCount * 2;

  // ── Map exploration: (exploredTiles / totalTiles) * 300 ──
  let mapBonus = 0;
  const exploredPercent = state.mapExploredPercent?.[civSlot] || 0;
  // exploredPercent is 0-100; score = percent * 3 (max 300)
  mapBonus = Math.min(300, Math.max(0, Math.floor(exploredPercent * 3)));

  // ── Spaceship score ──
  const turnNum = state.turn?.number || 0;
  let spaceshipScore = 0;
  const ss = state.spaceships?.[civSlot];
  if (ss && ss.launched) {
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

  // ── Total score ──
  const baseScore = Math.max(0,
    populationScore + wonderScore + futureTechScore + peaceScore + techScore + mapBonus + spaceshipScore);

  return {
    total: baseScore,
    population: populationScore,
    wonders: wonderScore,
    futureTech: futureTechScore,
    peace: peaceScore,
    technology: techScore,
    mapBonus,
    spaceship: spaceshipScore,
  };
}

/**
 * Check game end conditions — ported from FUN_0048aedc.
 *
 * K.4: Added year 2000 AD warning event (game continues), year 2020 AD
 * forced retirement. Uses seeded RNG for spaceship success roll.
 *
 * Conditions checked:
 *   1. Conquest: only one non-barbarian civ remains alive
 *   2. Spaceship arrival: a launched spaceship has arrived (turn >= arrivalTurn)
 *      and the random success check passes (rolled against successProb)
 *   3. Year 2000 AD: emit warning event (game continues)
 *   4. Retirement: year >= 2020 AD (forced game end, highest score wins)
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
        // Success check: roll 0-99 against successProb using seeded RNG
        const roll = state.rng ? state.rng.nextInt(100) : Math.floor(Math.random() * 100);
        if (roll < ss.successProb) {
          return {
            ended: true, winner: c,
            reason: 'spaceship',
            successProb: ss.successProb,
          };
        } else {
          // Ship lost! Mark it
          const updatedSs = { ...ss, launched: false, destroyed: true };
          state.spaceships = { ...state.spaceships, [c]: updatedSs };
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'spaceshipLost', civSlot: c,
            successProb: ss.successProb,
          });
        }
      }
    }
  }

  // ── 3. Year 2000 AD warning (game continues) ──
  const year = getNumericYear(turnNum);
  if (year >= 2000 && year < 2020 && !state.year2000Warned) {
    state.year2000Warned = true;
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({
      type: 'year2000Warning', year,
      message: 'The year 2000 approaches! The game will end in 2020 AD.',
    });
  }

  // ── 4. Retirement: year >= 2020 AD ──
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
