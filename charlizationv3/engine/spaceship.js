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

// ── Retirement score difficulty multipliers (from binary) ──
const DIFFICULTY_MULTIPLIER = { 0: 4, 1: 5, 2: 6, 3: 8, 4: 10, 5: 13 };

// ── Final display difficulty multipliers (percentage, from binary) ──
// chieftain=50%, warlord=75%, prince=100%, king=125%, emperor=150%, deity=200%
const FINAL_SCORE_MULTIPLIER = { 0: 50, 1: 75, 2: 100, 3: 125, 4: 150, 5: 200 };

// ── Alpha Centauri bonus points per spaceship part type ──
const AC_BONUS_STRUCTURAL = 100;
const AC_BONUS_COMPONENT  = 200;
const AC_BONUS_MODULE      = 300;

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
 * Binary scoring formula:
 *   - Population: sum of city.size across all cities (happy citizens proxy)
 *   - Wonders: count of active wonders owned by civ * 5
 *   - Territory: count of tiles owned by civ (tileOwnership on mapBase)
 *   - Pollution penalty: -(globalPollution count) * 10 / numAliveCivs
 *   - Difficulty modifier: difficultyIdx * 25 - 50
 *   - Spaceship bonus: spaceshipMult * 100 + max(0, (570 - turnNumber)) * 2 + 400
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @param {object} [mapBase] - map data (needed for territory counting)
 * @returns {{ total: number, population: number, wonders: number, territory: number, pollution: number, difficulty: number, spaceship: number }}
 */
export function calcCivScore(state, civSlot, mapBase) {
  // ── Population score: sum of city.size across all owned cities ──
  let populationScore = 0;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== civSlot || city.size <= 0) continue;
    populationScore += city.size;
  }

  // ── Wonder score: count active wonders owned by civ × 5 ──
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
      if (!obsolete) wonderScore += 20; // Binary uses ×20, not ×5
    }
  }

  // ── Territory score: count tiles owned by this civ ──
  let territoryScore = 0;
  if (mapBase && mapBase.tileData) {
    for (let i = 0; i < mapBase.tileData.length; i++) {
      if (mapBase.tileData[i].tileOwnership === civSlot) territoryScore++;
    }
  }

  // ── Pollution penalty: binary uses (pollutedTiles - cleanedTiles) * -10 per civ ──
  let pollutionPenalty = 0;
  if (mapBase && mapBase.tileData) {
    let pollutedCount = 0;
    for (let i = 0; i < mapBase.tileData.length; i++) {
      if (mapBase.tileData[i].improvements?.pollution) pollutedCount++;
    }
    pollutionPenalty = -pollutedCount * 10;
  }

  // ── Difficulty modifier: difficultyIdx * 25 - 50 ──
  const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain'));
  const difficultyMod = diffIdx * 25 - 50;

  // ── Spaceship score ──
  const turnNum = state.turn?.number || 0;
  let spaceshipScore = 0;
  const ss = state.spaceships?.[civSlot];
  if (ss && ss.launched) {
    const arrived = ss.arrivalTurn <= turnNum;
    if (arrived) {
      // Spaceship bonus: spaceshipMult * 100 + max(0, (570 - turnNumber)) * 2 + 400
      const spaceshipMult = (ss.structurals || 0) + (ss.components || 0) + (ss.modules || 0);
      spaceshipScore = spaceshipMult * 100 + Math.max(0, (570 - turnNum)) * 2 + 400;
    }
  }

  // ── Late-game science bonus (binary: after turn 200, clamp(numAdvances * 3, 0, 100)) ──
  const turnNum2 = state.turn?.number || 0;
  let scienceBonus = 0;
  if (turnNum2 > 200) {
    const numAdvances = state.civTechs?.[civSlot]?.size || 0;
    scienceBonus = Math.max(0, Math.min(100, numAdvances * 3));
  }

  // ── Total score ──
  const baseScore = Math.max(0,
    populationScore + wonderScore + territoryScore + pollutionPenalty + difficultyMod + spaceshipScore + scienceBonus);

  return {
    total: baseScore,
    population: populationScore,
    wonders: wonderScore,
    territory: territoryScore,
    pollution: pollutionPenalty,
    difficulty: difficultyMod,
    spaceship: spaceshipScore,
    science: scienceBonus,
  };
}

/**
 * Calculate retirement score for a civ — used when the game ends
 * at year 2020 or the player retires.
 *
 * Formula (from binary):
 *   difficultyMultiplier table: {0:4, 1:5, 2:6, 3:8, 4:10, 5:13}
 *   rawScore = (diffMultiplier * max(civilizationScore, gameScore)) / 100
 *   Rank = largest rank where (rank+1)^2 / 3 <= rawScore, maxRank=23
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {{ rawScore: number, rank: number, civScore: number }}
 */
export function calcRetirementScore(state, civSlot) {
  const scoreBreakdown = calcCivScore(state, civSlot);
  const civScore = scoreBreakdown.total;

  // gameScore could be a separate metric; for now use civScore as both
  // (the binary distinguishes "civilization score" from "game score" but
  // both are computed from overlapping formulas)
  const gameScore = civScore;

  const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain'));
  const diffMultiplier = DIFFICULTY_MULTIPLIER[diffIdx] ?? 4;
  const rawScore = Math.floor((diffMultiplier * Math.max(civScore, gameScore)) / 100);

  // Rank formula: largest rank where (rank+1)^2 / 3 <= rawScore, maxRank=23
  let rank = 0;
  for (let r = 0; r <= 23; r++) {
    if (Math.floor(((r + 1) * (r + 1)) / 3) <= rawScore) {
      rank = r;
    } else {
      break;
    }
  }

  return { rawScore, rank, civScore };
}

/**
 * Calculate final civilization score with difficulty multiplier and
 * Alpha Centauri bonus.
 *
 * The final displayed score applies a difficulty-based percentage
 * multiplier to the base civ score, then adds a spaceship arrival
 * bonus if the ship reached Alpha Centauri.
 *
 * Difficulty multipliers for final display:
 *   chieftain=50%, warlord=75%, prince=100%, king=125%, emperor=150%, deity=200%
 *
 * Alpha Centauri bonus (if spaceship arrived):
 *   +100 per structural, +200 per component, +300 per module
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {{ finalScore: number, baseScore: number, difficultyPct: number, acBonus: number, breakdown: object }}
 */
export function calcFinalScore(state, civSlot) {
  const breakdown = calcCivScore(state, civSlot);
  const baseScore = breakdown.total;

  // Difficulty multiplier
  const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain'));
  const difficultyPct = FINAL_SCORE_MULTIPLIER[diffIdx] ?? 100;
  const scaledScore = Math.floor(baseScore * difficultyPct / 100);

  // Alpha Centauri bonus: only if spaceship arrived
  let acBonus = 0;
  const ss = state.spaceships?.[civSlot];
  const turnNum = state.turn?.number || 0;
  if (ss && ss.launched && ss.arrivalTurn <= turnNum && !ss.destroyed) {
    acBonus += (ss.structurals || 0) * AC_BONUS_STRUCTURAL;
    acBonus += (ss.components || 0) * AC_BONUS_COMPONENT;
    acBonus += (ss.modules || 0) * AC_BONUS_MODULE;
  }

  const finalScore = scaledScore + acBonus;

  return {
    finalScore,
    baseScore,
    difficultyPct,
    acBonus,
    breakdown,
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

  // ── 3. Year 2000 AD: plan retirement prompt (game continues) ──
  const year = getNumericYear(turnNum);
  if (year >= 2000 && year < 2020 && !state.year2000Warned) {
    state.year2000Warned = true;
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({
      type: 'year2000Warning', year,
      message: 'The year 2000 approaches! You may retire now or continue until 2020 AD.',
    });
  }

  // ── 4. Year 2020 AD: forced retirement ──
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

  // ── 5. Scenario end: warning 5 turns before, end at scenario turn limit ──
  const scenarioTurnLimit = state.scenarioTurnLimit ?? -1;
  if (scenarioTurnLimit > 0) {
    const turnsRemaining = scenarioTurnLimit - turnNum;

    // Warning 5 turns before end
    if (turnsRemaining <= 5 && turnsRemaining > 0 && !state.scenarioEndWarned) {
      state.scenarioEndWarned = true;
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'scenarioEndWarning',
        turnsRemaining,
        message: `The scenario will end in ${turnsRemaining} turn${turnsRemaining !== 1 ? 's' : ''}!`,
      });
    }

    // Scenario end
    if (turnNum >= scenarioTurnLimit) {
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
        reason: 'scenarioEnd',
        score: bestScore,
      };
    }
  }

  return null;
}

// ── Space Race Tech IDs ──
const TECH_AUTOMOBILE  = 5;   // Automobile
const TECH_ELECTRONICS = 24;  // Electronics
const TECH_PHILOSOPHY  = 60;  // Philosophy
const TECH_INVENTION   = 38;  // Invention

/**
 * Check a civ's space-race tech capability level.
 *
 * Level 0: no spaceship-relevant techs
 * Level 1: has Automobile (5) OR Electronics (24)
 * Level 2: has both Automobile AND Electronics, AND either Philosophy (60)
 *          or Invention (38)
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {number} 0, 1, or 2
 */
export function checkSpaceRaceCapability(state, civSlot) {
  const techs = state.civTechs?.[civSlot];
  if (!techs) return 0;

  const hasAuto = techs.has(TECH_AUTOMOBILE);
  const hasElec = techs.has(TECH_ELECTRONICS);

  if (!hasAuto && !hasElec) return 0;

  if (hasAuto && hasElec) {
    if (techs.has(TECH_PHILOSOPHY) || techs.has(TECH_INVENTION)) return 2;
  }

  return 1;
}

// ── K.5: Spaceship part weight escalation ──
// Port of binary weight table: parts 0-3 weigh 1, parts 4-5 weigh 2, parts 6+ weigh 3.
// Used for mass/cost escalation when building multiple parts of the same type.
/**
 * Calculate the weight multiplier for a spaceship part by its index.
 * @param {number} partIndex - 0-based index of the part within its type
 * @returns {number} weight: 1 for parts 0-3, 2 for parts 4-5, 3 for parts 6+
 */
export function calcPartWeight(partIndex) {
  return 1 + (partIndex > 3 ? 1 : 0) + (partIndex > 5 ? 1 : 0);
}

// ── K.6: Spaceship success rate (alternate detailed formula) ──
// Port of binary success calculation using individual component sub-types
// (lifeSupport, solarEnergy, fuel, propulsion) rather than aggregate counts.
// Use this when the spaceship tracks individual sub-type counts.
/**
 * Calculate spaceship success rate from detailed component sub-types.
 * @param {object} ship - { fuel, propulsion, lifeSupport, solarEnergy, structurals, components, modules }
 * @returns {number} success probability 0-100
 */
export function calcSpaceshipSuccessRate(ship) {
  let success = 100;
  const totalFuelPropulsion = Math.max(1, (ship.fuel || 0) + (ship.propulsion || 0));
  success = Math.min(success, Math.floor((ship.lifeSupport || 0) * 100 / totalFuelPropulsion));
  success = Math.min(success, Math.floor((ship.solarEnergy || 0) * 200 / totalFuelPropulsion));
  const totalMass = (ship.structurals || 0) * 4 + (ship.components || 0) * 6 + (ship.modules || 0) * 8;
  if (totalMass > 150) success -= Math.floor((totalMass - 150) / 10);
  return Math.max(0, Math.min(100, success));
}

// ═══════════════════════════════════════════════════════════════════
// resetSpaceship — Zero out all spaceship fields for a civ
// Called from killCiv and from new game init.
// ═══════════════════════════════════════════════════════════════════

/**
 * Reset (zero out) all spaceship fields for a given civ.
 * Called when a civ is eliminated or at new game initialization.
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot - civ slot to reset (0-7)
 */
export function resetSpaceship(state, civSlot) {
  if (!state.spaceships) state.spaceships = {};
  state.spaceships = {
    ...state.spaceships,
    [civSlot]: null,
  };
}
