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

import { WONDER_OBSOLETE, DIFFICULTY_KEYS } from './defs.js';
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

// Fusion Power tech index (0x20 = 32) — grants nuclear power bonus for spaceship
// Spec §1.2: ss_flags bit 3 (0x08) "has_nuclear_power" set when civ has tech 0x20
// C ref: FUN_00596eec:1638-1640
const TECH_FUSION_POWER = 32;

// ── Mass/Thrust paradigm from RULES.TXT @COSMIC line 41 (default: 75) ──
// Spec §5.2: DAT_0064bcdc = Mass/Thrust paradigm
// C ref: FUN_00596eec:1676
const COSMIC_MASS_THRUST_PARADIGM = 75;

// ── Binary-accurate mass per part type (from config table at DAT_00634f68) ──
// Spec §1.4: 6 entries at base 0x00634F60, 12-byte stride, mass at +0x08
// Extracted from civ2.exe binary static data segment
// C ref: FUN_00596eec:1644-1648 — *(int *)(&DAT_00634f68 + i * 0xc)
const SS_PART_MASS = [
  1,   // [0] Structural    (DAT_00634f68)
  4,   // [1] Fuel          (DAT_00634f74)
  4,   // [2] Propulsion    (DAT_00634f80)
  16,  // [3] Habitation    (DAT_00634f8c)
  16,  // [4] Life Support  (DAT_00634f98)
  16,  // [5] Solar Panel   (DAT_00634fa4)
];

// ── Max part counts (from config table at DAT_00634f64) ──
// Spec §3: (&DAT_00634f64)[part_index * 3]
const SS_PART_MAX = [
  39,  // [0] Structural    (DAT_00634f64)
  8,   // [1] Fuel          (DAT_00634f70)
  8,   // [2] Propulsion    (DAT_00634f7c)
  4,   // [3] Habitation    (DAT_00634f88)
  4,   // [4] Life Support  (DAT_00634f94)
  4,   // [5] Solar Panel   (DAT_00634fa0)
];

/**
 * Get spaceship part counts for a civ.
 * The binary tracks 6 individual sub-types per civ (ss_parts[0..5]).
 * Spec §1.1: offsets +0x408 through +0x412 in civ record.
 * C ref: *(short *)(&DAT_0064caa8 + civ * 0x594 + part_index * 2)
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {{ structural: number, fuel: number, propulsion: number, habitation: number, lifeSupport: number, solarPanel: number }}
 */
function getSpaceshipParts(state, civSlot) {
  const existing = state.spaceships?.[civSlot] || {};
  return {
    structural:  existing.structural  ?? 0,
    fuel:        existing.fuel        ?? 0,
    propulsion:  existing.propulsion  ?? 0,
    habitation:  existing.habitation  ?? 0,
    lifeSupport: existing.lifeSupport ?? 0,
    solarPanel:  existing.solarPanel  ?? 0,
  };
}

/**
 * Check if Apollo Program has been built by any civ (not destroyed).
 * Spec §4.2, §9.2: Apollo enables spaceship construction for ALL civs.
 * C ref: block_004C0000.c:2358-2359
 *
 * @param {object} state - game state
 * @returns {boolean}
 */
function isApolloBuilt(state) {
  const obsTech = WONDER_OBSOLETE[WONDER_APOLLO];
  if (obsTech >= 0 && state.civTechs) {
    for (let c = 0; c < 8; c++) {
      if (state.civTechs[c]?.has(obsTech)) return false;
    }
  }
  const w = state.wonders?.[WONDER_APOLLO];
  if (!w || w.cityIndex == null || w.destroyed) return false;
  const city = state.cities[w.cityIndex];
  return city && city.size > 0;
}

/**
 * Check if a civ has Fusion Power tech (nuclear power bonus for spaceship).
 * Spec §1.2: ss_flags bit 3 (0x08) = has_nuclear_power, set when civ has tech 0x20.
 * Spec §5.2: nuclear power reduces Mass/Thrust paradigm to 75%.
 * C ref: FUN_00596eec:1638-1640
 *
 * @param {object} state - game state
 * @param {number} civSlot
 * @returns {boolean}
 */
function hasFusionPower(state, civSlot) {
  const techs = state.civTechs?.[civSlot];
  return techs ? techs.has(TECH_FUSION_POWER) : false;
}

/**
 * Progressive thrust function — converts a part count into a thrust value.
 * First 4 parts add 1 each, parts 5-6 add 2 each, parts 7+ add 3 each.
 * Spec §5.3: FUN_00596e92
 * C ref: block_00590000.c:1591-1610
 *
 * @param {number} count - number of parts
 * @returns {number} thrust value
 */
function thrustFromParts(count) {
  let result = 0;
  for (let i = 0; i < count; i++) {
    let inc = 1;
    if (i > 3) inc = 2;   // C: if (3 < local_c) iVar1 = local_8 + 2
    result += inc;
    if (i > 5) result++;   // C: if (5 < local_c) local_8 = local_8 + 1
  }
  return result;
}

/**
 * Recalculate spaceship stats for a civ — ported from FUN_00596eec.
 *
 * Computes mass, success probability, flight time, and arrival estimate
 * using individual part sub-type counts (6 types, not 3 aggregates).
 *
 * Spec §5 (travel time), §6 (success probability).
 * C ref: FUN_00596eec (block_00590000.c:1619-1722)
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot
 * @returns {object} the spaceship stats object
 */
export function recalcSpaceshipStats(state, civSlot) {
  const parts = getSpaceshipParts(state, civSlot);
  if (!state.spaceships) state.spaceships = {};

  const existing = state.spaceships[civSlot] || {};
  const launched = existing.launched || false;
  const launchTurn = existing.launchTurn ?? -1;

  // ── §5.1: Mass calculation — sum of (part_count * mass_per_part) for all 6 types ──
  // C ref: FUN_00596eec:1644-1648
  // DAT_006ad0e4 += ss_parts[i] * configTable[i].mass
  const partCounts = [parts.structural, parts.fuel, parts.propulsion,
                      parts.habitation, parts.lifeSupport, parts.solarPanel];
  let mass = 0;
  for (let i = 0; i < 6; i++) {
    mass += partCounts[i] * SS_PART_MASS[i];
  }

  // ── §6: Success probability — 3 multiplicative coverage ratios ──
  // C ref: FUN_00596eec:1656-1675
  // Starts at 100%, each ratio reduces multiplicatively.
  let success = 100;

  // Propulsion coverage (C lines 1657-1663):
  //   propulsion_pct = (life_support * 100) / clamp(habitation, 1, 99)
  //   success = (clamp(propulsion_pct, 0, 100) * success) / 100
  const habClamped = Math.max(1, Math.min(99, parts.habitation));
  const propulsionPct = Math.floor((parts.lifeSupport * 100) / habClamped);
  success = Math.floor((Math.max(0, Math.min(100, propulsionPct)) * success) / 100);

  // Energy coverage (C lines 1665-1671):
  //   denom = clamp(habitation + life_support, 1, ...)
  //   energy_pct = (solar * 200) / denom
  //   success = (clamp(energy_pct, 0, 100) * success) / 100
  const energyDenom = Math.max(1, parts.habitation + parts.lifeSupport);
  const energyPct = Math.floor((parts.solarPanel * 200) / energyDenom);
  success = Math.floor((Math.max(0, Math.min(100, energyPct)) * success) / 100);

  // Fuel coverage (C lines 1672-1675):
  //   fuel_pct = (propulsion * 100) / clamp(fuel, 1, 99)
  //   (stored as DAT_006ad0dc but NOT applied to success in C — see note)
  const fuelClamped = Math.max(1, Math.min(99, parts.fuel));
  const fuelPct = Math.floor((parts.propulsion * 100) / fuelClamped);
  // Note: In the C code, fuel_pct is stored in DAT_006ad0dc but is NOT
  // multiplied into DAT_006ad0ec (success). Only propulsion_pct and
  // energy_pct are applied. Fuel coverage is displayed but doesn't
  // affect success probability directly.

  // ── §5.2-5.3: Flight time using Mass/Thrust paradigm ──
  // C ref: FUN_00596eec:1676-1704
  let massThrust = COSMIC_MASS_THRUST_PARADIGM;
  const hasNuclearPower = hasFusionPower(state, civSlot);

  // Nuclear power bonus: 75% of paradigm
  // C: if ((bVar1 & 8) != 0) local_c = (local_c * 3) >> 2;
  if (hasNuclearPower) {
    massThrust = (massThrust * 3) >> 2;  // integer: 75 * 3 / 4 = 56
  }

  // Scale factor for large paradigm values
  // C lines 1680-1683: while (100 < local_c) { local_c >>= 1; local_8 <<= 1; }
  let scaleFactor = 1;
  while (massThrust > 100) {
    massThrust >>= 1;
    scaleFactor <<= 1;
  }

  // Thrust calculation using progressive thrustFromParts
  // C lines 1684-1690 and 1697-1700:
  //   prop_thrust = thrustFromParts(clamped_propulsion)
  //   fuel_thrust = thrustFromParts(clamped_fuel)
  //   thrust_speed = clamp(fuel_thrust * 10, 0, prop_thrust * 10)
  //   flight_time = (mass * massThrust) / (thrust_speed + 1)
  // The stack-artifact pattern at lines 1697-1699 shows:
  //   FUN_00596e92(propulsion) → result used as upper bound
  //   FUN_00596e92(fuel) → result * 10 clamped to [0, prop_thrust * 10]
  const clampedPropulsion = Math.max(0, Math.min(SS_PART_MAX[2], parts.propulsion));
  const clampedFuel = Math.max(0, Math.min(SS_PART_MAX[1], parts.fuel));
  const propThrust = thrustFromParts(clampedPropulsion);
  const fuelThrust = thrustFromParts(clampedFuel);
  const thrustSpeed = Math.max(1, Math.min(fuelThrust * 10, propThrust * 10));
  let flightTime = Math.floor((mass * massThrust) / (thrustSpeed + 1));

  // Apply scale factor (C lines 1701-1704)
  if (scaleFactor > 1) {
    flightTime *= scaleFactor;
  }

  // ── §5.5: Mass penalty on success probability ──
  // C lines 1706-1709: if (flight_time > 150) success -= (flight_time - 150) / 10
  if (flightTime > 150) {
    success -= Math.floor((flightTime - 150) / 10);
  }
  success = Math.max(0, Math.min(100, success));

  // Convert flight time from years×10 to turns (integer)
  const flightTurns = Math.max(1, Math.ceil(flightTime / 10));

  // ── Arrival turn estimate ──
  const currentTurn = state.turn?.number || 0;
  const arrivalTurn = launched
    ? launchTurn + flightTurns
    : currentTurn + flightTurns;

  // ── Can launch? Need at least 1 of each aggregate category ──
  // Spec §3: minimum 1 structural, 1 fuel or propulsion, 1 module sub-type
  const hasStructural = parts.structural >= 1;
  const hasComponent = (parts.fuel >= 1 || parts.propulsion >= 1);
  const hasModule = (parts.habitation >= 1 || parts.lifeSupport >= 1 || parts.solarPanel >= 1);
  const canLaunch = !launched && hasStructural && hasComponent && hasModule;

  const ss = {
    ...parts,
    mass,
    successProb: success,
    propulsionPct,
    energyPct,
    fuelPct,
    flightTime,   // raw value in years×10
    flightTurns,
    arrivalTurn,
    launched,
    launchTurn,
    canLaunch,
    hasNuclearPower,
    apolloBuilt: isApolloBuilt(state),
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
      // Spaceship bonus: totalParts * 100 + max(0, (570 - turnNumber)) * 2 + 400
      const totalParts = (ss.structural || 0) + (ss.fuel || 0) + (ss.propulsion || 0)
        + (ss.habitation || 0) + (ss.lifeSupport || 0) + (ss.solarPanel || 0);
      spaceshipScore = totalParts * 100 + Math.max(0, (570 - turnNum)) * 2 + 400;
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
  // +100 per structural, +200 per component (fuel+propulsion), +300 per module (hab+life+solar)
  let acBonus = 0;
  const ss = state.spaceships?.[civSlot];
  const turnNum = state.turn?.number || 0;
  if (ss && ss.launched && ss.arrivalTurn <= turnNum && !ss.destroyed) {
    acBonus += (ss.structural || 0) * AC_BONUS_STRUCTURAL;
    acBonus += ((ss.fuel || 0) + (ss.propulsion || 0)) * AC_BONUS_COMPONENT;
    acBonus += ((ss.habitation || 0) + (ss.lifeSupport || 0) + (ss.solarPanel || 0)) * AC_BONUS_MODULE;
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

// ── Spaceship thrust escalation (also used for weight) ──
// Port of FUN_00596e92: progressive thrust from parts.
// Spec §5.3: first 4 parts add 1, parts 5-6 add 2, parts 7+ add 3.
/**
 * Calculate the thrust/weight value for a number of spaceship parts.
 * Same logic as thrustFromParts (FUN_00596e92), exported for external use.
 * @param {number} partCount - number of parts
 * @returns {number} thrust value
 */
export function calcPartWeight(partCount) {
  return thrustFromParts(partCount);
}

// ── Standalone success probability calculation ──
// Uses the same 3-ratio formula as recalcSpaceshipStats (FUN_00596eec:1656-1675).
// Spec §6: success = propulsion_coverage * energy_coverage, then flight penalty.
/**
 * Calculate spaceship success rate from individual part sub-type counts.
 * Spec §6: 3 coverage ratios (propulsion, energy, fuel display).
 * C ref: FUN_00596eec:1656-1709
 *
 * @param {object} ship - { fuel, propulsion, lifeSupport, solarPanel, habitation, structural }
 * @returns {number} success probability 0-100
 */
export function calcSpaceshipSuccessRate(ship) {
  let success = 100;

  // Propulsion coverage: (life_support * 100) / clamp(habitation, 1, 99)
  const habClamped = Math.max(1, Math.min(99, ship.habitation || 0));
  const propPct = Math.floor(((ship.lifeSupport || 0) * 100) / habClamped);
  success = Math.floor((Math.max(0, Math.min(100, propPct)) * success) / 100);

  // Energy coverage: (solar * 200) / clamp(habitation + life_support, 1, ...)
  const energyDenom = Math.max(1, (ship.habitation || 0) + (ship.lifeSupport || 0));
  const energyPct = Math.floor(((ship.solarPanel || 0) * 200) / energyDenom);
  success = Math.floor((Math.max(0, Math.min(100, energyPct)) * success) / 100);

  // Flight time mass penalty
  let mass = 0;
  const counts = [ship.structural || 0, ship.fuel || 0, ship.propulsion || 0,
                  ship.habitation || 0, ship.lifeSupport || 0, ship.solarPanel || 0];
  for (let i = 0; i < 6; i++) mass += counts[i] * SS_PART_MASS[i];

  let massThrust = COSMIC_MASS_THRUST_PARADIGM;
  const clampedProp = Math.max(0, Math.min(SS_PART_MAX[2], ship.propulsion || 0));
  const clampedFl = Math.max(0, Math.min(SS_PART_MAX[1], ship.fuel || 0));
  const propTh = thrustFromParts(clampedProp);
  const fuelTh = thrustFromParts(clampedFl);
  const thrustSpd = Math.max(1, Math.min(fuelTh * 10, propTh * 10));
  const flightTime = Math.floor((mass * massThrust) / (thrustSpd + 1));

  if (flightTime > 150) success -= Math.floor((flightTime - 150) / 10);
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
