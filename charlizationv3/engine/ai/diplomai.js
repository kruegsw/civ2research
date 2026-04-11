// ═══════════════════════════════════════════════════════════════════
// ai/diplomai.js — AI diplomacy: treaty proposals, war declarations,
//                  tribute demands, and responding to incoming offers
//
// Ported from Civ2 decompiled functions:
//   FUN_0055cbd5 — war declaration evaluation (per-continent strength)
//   FUN_0055d1e2 — tech/peace negotiation between two AI civs
//   FUN_0055d685 — third-party "join war" requests
//   FUN_0055d8d8 — main diplomacy encounter orchestrator
//   FUN_0045705e — diplomacy evaluation (tribute, attitude, tech desire)
//
// Phase 6 Wave 6 (O.1-O.5):
//   O.1: Full negotiation state machine (greeting, demand eval, counter-offers)
//   O.2: AI tech exchange (mutual benefit, superior-civ blocking, alliance tribute)
//   O.3: Alliance/crusade proposals (HELPME formation, multi-civ coalitions)
//   O.4: Full ai_diplomacy_turn_processing (patience, flags, anarchy govt)
//   O.5: Full ai_evaluate_diplomacy_toward_human (multi-factor attitude)
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from '../rules.js';
import {
  UNIT_ATK, UNIT_DEF,
  DIFFICULTY_KEYS,
  ADVANCE_PREREQS, ADVANCE_EPOCH, ADVANCE_AI_INTEREST,
  UNIT_PREREQS, UNIT_ROLE,
  IMPROVE_PREREQS, GOVT_TECH_PREREQS, GOVT_INDEX,
  GOVERNMENT_NAMES,
  LEADER_PERSONALITY as LEADER_PERSONALITY_3,
} from '../defs.js';
import { hasWonderEffect, civHasWonder } from '../utils.js';
import {
  calcAttitudeScore,
  TF, getTreatyFlags, addTreatyFlag, clearTreatyFlag,
  DIPLO_EVENTS, fireDiplomacyEvent,
  declareWar as diplomacyDeclareWar,
  signCeasefire, signPeaceTreaty, formAlliance,
  getReputation, isReputationTooLow,
  getAttitudeLevel, isHostile, isFriendly,
  calcPatienceThreshold, getPatience,
  shouldBetrayTreaty, wouldEnableWonder,
  calcTributeDemand,
} from '../diplomacy.js';

// ── Leader Personality Table ─────────────────────────────────────
// Indexed by rulesCivNumber (0-20). Each entry: [expansionism, militarism]
// From Civ2 LEADERS.TXT analysis:
//   expansionism: -1=isolationist, 0=neutral, 1=expansionist
//   militarism:   -1=peaceful, 0=neutral, 1=aggressive
// These map to DAT_006554f8 (patience) and DAT_00655c22 (power ranking)
// in the decompiled source.
const LEADER_PERSONALITY = [
  [ 1,  1], //  0: Romans       — expansionist, aggressive
  [ 0, -1], //  1: Babylonians  — neutral, peaceful
  [ 1,  1], //  2: Germans      — expansionist, aggressive
  [ 0,  0], //  3: Egyptians    — neutral, neutral
  [ 1,  0], //  4: Americans    — expansionist, neutral
  [ 0, -1], //  5: Greeks       — neutral, peaceful
  [-1, -1], //  6: Indians      — isolationist, peaceful
  [ 1,  1], //  7: Russians     — expansionist, aggressive
  [ 1,  1], //  8: Zulus        — expansionist, aggressive
  [ 0,  0], //  9: French       — neutral, neutral
  [ 1,  1], // 10: Aztecs       — expansionist, aggressive
  [ 1,  0], // 11: Chinese      — expansionist, neutral
  [ 0,  0], // 12: English      — neutral, neutral
  [ 1,  1], // 13: Mongols      — expansionist, aggressive
  [ 0,  0], // 14: Celts        — neutral, neutral
  [ 1,  1], // 15: Japanese     — expansionist, aggressive
  [ 1,  1], // 16: Vikings      — expansionist, aggressive
  [ 1,  0], // 17: Spanish      — expansionist, neutral
  [ 0,  0], // 18: Persians     — neutral, neutral
  [ 1,  0], // 19: Carthaginians— expansionist, neutral
  [ 0,  1], // 20: Sioux        — neutral, aggressive
];

// ── Helpers ──────────────────────────────────────────────────────

/**
 * Get treaty status between two civs.
 * Mirrors the unexported getTreaty() in rules.js.
 */
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

/**
 * Check if two civs have made contact (i.e. a treaty entry exists).
 * When no treaty entry exists, the civs have never met — diplomacy
 * should not occur between them. This is distinct from being "at war":
 * getTreaty() returns 'war' by default for uncontacted civs, but
 * actual war only exists when an explicit 'war' entry is in treaties.
 */
function haveContact(gameState, civA, civB) {
  if (!gameState.treaties) return false;
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] !== undefined;
}

/**
 * Get leader personality for a civ slot.
 * Returns { expansionism, militarism } where each is -1, 0, or 1.
 */
function getPersonality(gameState, civSlot) {
  const civ = gameState.civs?.[civSlot];
  const rcn = civ?.rulesCivNumber ?? 0;
  const entry = LEADER_PERSONALITY[rcn] || [0, 0];
  return { expansionism: entry[0], militarism: entry[1] };
}

/**
 * Get attitude of civSlot toward targetCiv (-100 to +100).
 */
function getAttitude(gameState, civSlot, targetCiv) {
  const civ = gameState.civs?.[civSlot];
  if (!civ?.attitudes) return 0;
  return civ.attitudes[targetCiv] ?? 0;
}

/**
 * Modify attitude of civSlot toward targetCiv by delta.
 * Clamps to [-100, +100]. Returns the ADJUST_ATTITUDE action.
 */
function makeAttitudeAction(civSlot, targetCiv, delta) {
  return { type: 'ADJUST_ATTITUDE', civSlot, targetCiv, delta };
}

/**
 * Get the difficulty level index (0=chieftain .. 5=deity).
 */
function getDifficultyIndex(gameState, civSlot) {
  const civ = gameState.civs?.[civSlot];
  const diff = civ?.difficulty || 'chieftain';
  const idx = DIFFICULTY_KEYS.indexOf(diff);
  return idx >= 0 ? idx : 0;
}

/**
 * Compute isometric distance between two tiles using doubled-X coordinates.
 * Handles horizontal wrapping.
 */
function tileDist(gx1, gy1, gx2, gy2, mapBase) {
  const dx1 = gx1 * 2 + (gy1 % 2);
  const dx2 = gx2 * 2 + (gy2 % 2);
  let ddx = Math.abs(dx1 - dx2);
  if (mapBase?.wraps) {
    const mw2 = mapBase.mw * 2;
    ddx = Math.min(ddx, mw2 - ddx);
  }
  return ddx + Math.abs(gy1 - gy2);
}

/**
 * Count how many civs this civ is currently at war with.
 */
function countWars(gameState, civSlot) {
  let wars = 0;
  const civs = gameState.civs;
  if (!civs) return 0;
  for (let i = 1; i < civs.length; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;
    // Only count as "at war" if there's actual contact — uncontacted civs
    // default to 'war' via getTreaty() but aren't truly at war
    if (getTreaty(gameState, civSlot, i) === 'war' && haveContact(gameState, civSlot, i)) wars++;
  }
  return wars;
}

// ── O.1: Greeting / Negotiation Helpers ──────────────────────────

/**
 * Classify greeting tone based on attitude value.
 * Port of FUN_0045705e greeting branch (~3540-3560):
 *   attitude < 4  → hostile
 *   attitude < 26 → guarded
 *   attitude < 50 → neutral
 *   attitude < 74 → friendly
 *   attitude >= 74 → enthusiastic
 *
 * Binary attitude is on a 0-100 scale (not -100 to +100).
 */
function getGreetingTone(attitude) {
  // Use the 9-level attitude scale from diplomacy.js for consistent grading
  const level = getAttitudeLevel(attitude);
  if (level <= 1) return 'hostile';      // Enraged / Furious
  if (level <= 3) return 'guarded';      // Annoyed / Uncooperative
  if (level === 4) return 'neutral';     // Neutral
  if (level <= 6) return 'friendly';     // Cordial / Polite
  return 'enthusiastic';                  // Enthusiastic / Worshipful
}

/**
 * Check if civSlot is a human player.
 * Mirrors econai.js isHumanCiv.
 */
function isHumanCiv(gameState, civSlot) {
  if (gameState.seatCivMap) {
    for (const seat of Object.values(gameState.seatCivMap)) {
      if (seat === civSlot) return true;
    }
    return false;
  }
  return civSlot === 1;
}

/**
 * Count the depth of a tech in the prerequisite tree (0 = no prereqs).
 * Cached per call via a Map to avoid redundant recursion.
 * Port of FUN_004bdaa5 recursive prereq walk.
 */
function techPrereqDepth(techId, cache) {
  if (techId < 0 || techId >= 89) return 0;
  if (cache.has(techId)) return cache.get(techId);
  // Mark visited to prevent cycles
  cache.set(techId, 0);
  const prereqs = ADVANCE_PREREQS[techId];
  if (!prereqs) { cache.set(techId, 0); return 0; }
  let maxDepth = 0;
  for (const pid of prereqs) {
    if (pid >= 0 && pid < 89) {
      maxDepth = Math.max(maxDepth, 1 + techPrereqDepth(pid, cache));
    }
  }
  cache.set(techId, maxDepth);
  return maxDepth;
}

/**
 * Compute a tech's valuation score for diplomacy.
 * O.1: techs valued by prereq chain depth x military/economic utility.
 *
 * From FUN_004bdb2c (calcTechValue):
 *   value = baseCost * (1 + prereqDepth/4) * utilityMultiplier
 *
 * utilityMultiplier:
 *   - Enables a military unit (ATK >= 3): x2
 *   - Enables a building/wonder: x1.5
 *   - Enables a government: x2
 *   - AI_INTEREST flag: x1.5
 *   - Modern era (epoch 3): x1.25
 */
function valueTech(techId, civSlot, gameState) {
  if (techId < 0 || techId >= 89) return 0;
  const depthCache = new Map();
  const depth = techPrereqDepth(techId, depthCache);
  const epoch = ADVANCE_EPOCH[techId] ?? 0;

  let baseValue = 5 + depth * 2;

  // Check if tech enables a military unit
  for (let ut = 0; ut < (UNIT_PREREQS?.length ?? 0); ut++) {
    if (UNIT_PREREQS[ut] === techId) {
      const atk = UNIT_ATK[ut] || 0;
      if (atk >= 3) { baseValue *= 2; break; }
      if ((UNIT_ROLE[ut] ?? 0) <= 1) { baseValue *= 1.5; break; }
    }
  }

  // Check if tech enables a building
  if (IMPROVE_PREREQS) {
    for (let bi = 0; bi < IMPROVE_PREREQS.length; bi++) {
      if (IMPROVE_PREREQS[bi] === techId) { baseValue *= 1.3; break; }
    }
  }

  // Check if tech enables a government
  for (const govtName of Object.keys(GOVT_TECH_PREREQS)) {
    if (GOVT_TECH_PREREQS[govtName] === techId) { baseValue *= 2; break; }
  }

  // AI interest flag
  if (ADVANCE_AI_INTEREST[techId]) baseValue *= 1.5;

  // Modern era bonus
  if (epoch === 3) baseValue *= 1.25;

  return Math.floor(baseValue);
}

/**
 * Evaluate a gold amount relative to civ's treasury.
 * O.1: Gold valuation scaled by treasury ratio.
 * Returns 0-100 "pain" score: how much this gold amount costs the civ.
 */
function valueGold(amount, treasury) {
  if (treasury <= 0) return 100;
  const ratio = amount / treasury;
  return Math.min(100, Math.floor(ratio * 100));
}

/**
 * Evaluate a city's strategic value.
 * O.1: city.size x improvements x strategic position.
 */
function valueCity(city, gameState) {
  if (!city || city.size <= 0) return 0;
  let val = city.size * 10;
  // Count improvements
  if (city.buildings) {
    val += city.buildings.size * 5;
  }
  // Capital bonus
  if (city.buildings?.has(1)) val += 30; // Palace
  return val;
}

/**
 * Evaluate a demand and decide whether to accept.
 * O.1: Different thresholds for tech, gold, map demands.
 *
 * From FUN_0045705e:
 *   Tech demand: accept if attitude > 50 (neutral+) or demander 2x stronger
 *   Gold demand: accept if attitude > 26 (guarded+) and affordable
 *   Map demand:  accept if attitude > 0 (not hostile)
 *   Treaty:      see treaty-specific thresholds
 */
function evaluateDemand(civSlot, fromCiv, demandType, demandValue, gameState, continentData) {
  const attitude = getAttitude(gameState, civSlot, fromCiv);
  const personality = getPersonality(gameState, civSlot);
  const ourStr = calcMilitaryStrength(gameState, civSlot);
  const theirStr = calcMilitaryStrength(gameState, fromCiv);
  const powerRatio = theirStr / Math.max(ourStr, 1);

  switch (demandType) {
    case 'tech': {
      // Accept if friendly (attitude > 50) or they're 2x stronger
      if (attitude > 50) return true;
      if (powerRatio > 2.0) return true;
      // Peaceful leaders give tech more readily
      if (personality.militarism < 0 && attitude > 25) return true;
      return false;
    }
    case 'gold': {
      const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
      const pain = valueGold(demandValue, treasury);
      // Accept if not too painful and attitude is at least guarded
      if (attitude > 0 && pain < 30) return true;
      // Accept if they're much stronger
      if (powerRatio > 2.0 && pain < 60) return true;
      return false;
    }
    case 'map': {
      // Maps are cheap to share — accept if not hostile
      if (attitude > -25) return true;
      return false;
    }
    default:
      return false;
  }
}

/**
 * Generate a counter-offer when rejecting a demand.
 * O.1: If we reject a demand, propose an alternative.
 *
 * Counter-offer logic:
 *   - Tech demand rejected → offer gold (25% of treasury, max 100)
 *   - Gold demand rejected → offer half the gold
 *   - Any demand rejected + we want peace → propose ceasefire
 */
function generateCounterOffer(civSlot, fromCiv, demandType, gameState) {
  const attitude = getAttitude(gameState, civSlot, fromCiv);
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
  const treaty = getTreaty(gameState, civSlot, fromCiv);

  // If at war and we're weaker, propose peace instead
  if (treaty === 'war') {
    const ourStr = calcMilitaryStrength(gameState, civSlot);
    const theirStr = calcMilitaryStrength(gameState, fromCiv);
    if (theirStr > ourStr) {
      return { type: 'PROPOSE_TREATY', targetCiv: fromCiv, treaty: 'ceasefire' };
    }
  }

  // Counter gold with half amount
  if (demandType === 'gold' && treasury > 50) {
    const counterAmount = Math.min(Math.floor(treasury * 0.15), 100);
    if (counterAmount >= 25) {
      return { type: 'DEMAND_TRIBUTE', targetCiv: fromCiv, amount: counterAmount };
    }
  }

  return null;
}

// ── O.2: Tech Exchange Helpers ─────────────────────────────────

/**
 * Find techs that civA has but civB does not.
 * Returns array of tech IDs.
 */
function findTradableTechs(gameState, civA, civB) {
  const techsA = gameState.civTechs?.[civA];
  const techsB = gameState.civTechs?.[civB];
  if (!techsA || !techsB) return [];
  const result = [];
  for (const tid of techsA) {
    if (!techsB.has(tid)) result.push(tid);
  }
  return result;
}

/**
 * Check "superior civ" blocking rule.
 * O.2: If the strongest human has powerRank >= 5 and more techs than
 * both trading AIs, block AI-AI trading to prevent runaway catch-up.
 *
 * Port of FUN_0055d1e2 ~5375-5395: checks if human is "far ahead"
 * and blocks tech transfer between AI civs.
 */
function isTechTradeBlocked(gameState, civA, civB) {
  const techCountA = gameState.civTechs?.[civA]?.size ?? 0;
  const techCountB = gameState.civTechs?.[civB]?.size ?? 0;
  const maxAiTechs = Math.max(techCountA, techCountB);

  for (let h = 1; h < 8; h++) {
    if (!isHumanCiv(gameState, h)) continue;
    if (!(gameState.civsAlive & (1 << h))) continue;
    const humanTechs = gameState.civTechs?.[h]?.size ?? 0;
    // If human has significantly more techs (6+) than the better AI,
    // and both AIs are behind, block trading to avoid catch-up
    if (humanTechs > maxAiTechs + 6) return true;
  }
  return false;
}

// ── O.5: Border Intrusion Detection ────────────────────────────

/**
 * Detect border intrusions: count foreign military units inside
 * a civ's city radius tiles.
 *
 * O.5: Port of FUN_0045705e border scan (~3594-3620).
 * Returns { intruders: number, intruderCivs: Set<number> }
 */
function detectBorderIntrusions(gameState, mapBase, civSlot) {
  const intruderCivs = new Set();
  let intruders = 0;

  if (!gameState.cities || !gameState.units || !mapBase) {
    return { intruders, intruderCivs };
  }

  // Collect tile indices within city radius for all our cities
  const ourTiles = new Set();
  const mw = mapBase.mw;
  for (const city of gameState.cities) {
    if (!city || city.owner !== civSlot || city.size <= 0 || city.gx < 0) continue;
    // Add city tile + neighboring tiles (simplified radius)
    ourTiles.add(city.gy * mw + city.gx);
    if (mapBase.getNeighbors) {
      const neighbors = mapBase.getNeighbors(city.gx, city.gy);
      for (const dir in neighbors) {
        const [nx, ny] = neighbors[dir];
        if (ny >= 0 && ny < mapBase.mh) {
          const wnx = ((nx % mw) + mw) % mw;
          ourTiles.add(ny * mw + wnx);
        }
      }
    }
  }

  // Check for foreign military units on our tiles
  for (const u of gameState.units) {
    if (!u || u.gx < 0 || u.owner === civSlot || u.owner === 0) continue;
    const atk = UNIT_ATK[u.type] || 0;
    if (atk === 0) continue; // ignore non-combat units
    const idx = u.gy * mw + u.gx;
    if (ourTiles.has(idx)) {
      const treaty = getTreaty(gameState, civSlot, u.owner);
      // Only count as intrusion if not at war (war units are expected)
      if (treaty !== 'war' && haveContact(gameState, civSlot, u.owner)) {
        intruders++;
        intruderCivs.add(u.owner);
      }
    }
  }

  return { intruders, intruderCivs };
}

// ── O.5b: Border Scoring (calc_war_readiness feed) ──────────────

/**
 * Calculate detailed border score for a target civ's units near our cities.
 *
 * Port of calc_war_readiness border scan from FUN_0055cbd5:
 *   - Scan all units belonging to targetCiv
 *   - For each unit near an aiCiv city (within 3 tiles):
 *     - Base score: +1 per unit
 *     - Tile improvement bonuses at unit position
 *     - If 4+ units near same city: increment intruder count
 *
 * @param {object} state - game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ whose borders are being evaluated
 * @param {number} targetCiv - civ whose units are being scored
 * @returns {{ borderScore: number, intruderCount: number, intruderDetailCnt: number, unitCount: number }}
 */
export function calcBorderScore(state, mapBase, aiCiv, targetCiv) {
  let borderScore = 0;
  let intruderCount = 0;
  let intruderDetailCnt = 0;
  let unitCount = 0;

  if (!state.cities || !state.units || !mapBase) {
    return { borderScore, intruderCount, intruderDetailCnt, unitCount };
  }

  const mw = mapBase.mw;

  // Collect AI cities with their positions
  const aiCities = [];
  for (const city of state.cities) {
    if (!city || city.owner !== aiCiv || city.size <= 0 || city.gx < 0) continue;
    aiCities.push(city);
  }

  if (aiCities.length === 0) {
    return { borderScore, intruderCount, intruderDetailCnt, unitCount };
  }

  // Track per-city intruder counts for the 4+ threshold
  const cityIntruderCounts = new Map(); // cityIndex -> count

  // Scan all units belonging to targetCiv
  for (const u of state.units) {
    if (!u || u.gx < 0 || u.owner !== targetCiv) continue;
    unitCount++;

    // Check proximity to each AI city (within 3 tiles)
    for (let ci = 0; ci < aiCities.length; ci++) {
      const city = aiCities[ci];
      const dist = tileDist(u.gx, u.gy, city.gx, city.gy, mapBase);
      if (dist > 3) continue;

      // Base score: +1 per unit near a city
      borderScore += 1;

      // Check tile improvements at unit position for bonus scoring
      if (mapBase.getImprovements) {
        const imp = mapBase.getImprovements(u.gx, u.gy);
        if (imp) {
          if (imp.road) borderScore += 1;
          if (imp.railroad) borderScore += 1;
          if (imp.mining) borderScore += 1;
          if (imp.irrigation) borderScore += 1;
          if (imp.fortress) borderScore += 2;
        }
      }

      // Track per-city intruder count
      const prevCount = cityIntruderCounts.get(ci) || 0;
      cityIntruderCounts.set(ci, prevCount + 1);

      intruderDetailCnt++;
      break; // only count once per unit (nearest city)
    }
  }

  // If 4+ intruding units near the same city: increment intruderCount
  for (const count of cityIntruderCounts.values()) {
    if (count >= 4) intruderCount++;
  }

  return { borderScore, intruderCount, intruderDetailCnt, unitCount };
}

// ── Alliance Violation Detection ────────────────────────────────

/**
 * Check for alliance violations using treaty flags.
 *
 * Port of FUN_0055d8d8 alliance violation path:
 *   - For each allied civ, check the INTRUDER flag (0x20)
 *   - If set: break treaty to war, set attitude to max hostility
 *   - If not set but HOSTILITY flag (0x40) exists: fire TERMS event
 *
 * @param {object} state - game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ checking for violations
 * @returns {Array<object>} actions/events generated
 */
export function checkAllianceViolations(state, mapBase, aiCiv) {
  const actions = [];

  if (!state.civs) return actions;

  for (let other = 1; other < 8; other++) {
    if (other === aiCiv) continue;
    if (!(state.civsAlive & (1 << other))) continue;
    if (getTreaty(state, aiCiv, other) !== 'alliance') continue;

    const flags = getTreatyFlags(state, aiCiv, other);

    // (#41) Alliance violation: randomized tolerance check on flag 0x20.
    // Binary: when INTRUDER flag is set, AI doesn't always declare war.
    // Instead it does a randomized tolerance check: rand() % (tolerance + 3) == 0
    // triggers war. Higher tolerance = less likely to immediately go to war.
    if (flags & TF.INTRUDER) {
      const rcn = state.civs[aiCiv]?.rulesCivNumber ?? 0;
      const pers3 = LEADER_PERSONALITY_3[rcn] || [0, 0, 0];
      const tolerance = pers3[2] ?? 0;
      const toleranceMod = Math.max(1, tolerance + 3);
      const roll = state.rng ? state.rng.nextInt(toleranceMod) : Math.floor(Math.random() * toleranceMod);

      if (roll === 0) {
        // Tolerance check failed — declare war
        actions.push({ type: 'DECLARE_WAR', targetCiv: other });
        actions.push(makeAttitudeAction(aiCiv, other, -100));

        fireDiplomacyEvent(state, DIPLO_EVENTS.VIOLATE, aiCiv, other, {
          reason: 'alliance_violation',
        });
      } else {
        // Tolerance check passed — just reduce attitude significantly
        actions.push(makeAttitudeAction(aiCiv, other, -30));
      }

      // Clear the violation flag regardless
      clearTreatyFlag(state, aiCiv, other, TF.INTRUDER);
    }
    // Check HOSTILITY flag (0x40) — previous violation warning
    else if (flags & TF.HOSTILITY) {
      // Fire TERMS event — demand the violator negotiate
      fireDiplomacyEvent(state, DIPLO_EVENTS.TERMS, aiCiv, other, {
        reason: 'hostility_flag',
      });
      // Clear the hostility flag after processing
      clearTreatyFlag(state, aiCiv, other, TF.HOSTILITY);
    }
  }

  return actions;
}

// ── Intruder System Gaps ────────────────────────────────────────

/**
 * Enhanced border intrusion detection with border score integration,
 * timing gate, escalation roll, and treaty-based responses.
 *
 * Port of FUN_0045705e intruder detection with full escalation logic:
 *   - Timing gate: only process when (turn + aiCiv) & 3 === 0
 *   - Escalation roll: if rand() % (tolerance + 2) === 0, set violation flag
 *   - Treaty-based response events:
 *     - At peace: NEARCITY/INTRUDER events
 *     - Ceasefire: VIOLATOR/VIOLATORS events
 *     - No treaty: direct war consideration
 *
 * @param {object} state - game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ processing intrusions
 * @returns {Array<object>} actions generated
 */
export function processIntrusionEscalation(state, mapBase, aiCiv) {
  const actions = [];
  const turnNumber = state.turn?.number ?? 0;

  // Timing gate: only process when (turn + aiCiv) & 3 === 0
  if ((turnNumber + aiCiv) & 3) return actions;

  if (!state.civs) return actions;

  const aiCivData = state.civs[aiCiv];
  if (!aiCivData) return actions;

  // Get leader tolerance from the 3-element personality table in defs.js
  const rcn = aiCivData.rulesCivNumber ?? 0;
  const personality3 = LEADER_PERSONALITY_3[rcn] || [0, 0, 0];
  const tolerance = personality3[2] ?? 0; // tolerance is index 2

  for (let other = 1; other < 8; other++) {
    if (other === aiCiv) continue;
    if (!(state.civsAlive & (1 << other))) continue;
    if (!haveContact(state, aiCiv, other)) continue;

    const treaty = getTreaty(state, aiCiv, other);
    if (treaty === 'war') continue; // war units are expected

    // Get border score for this civ pair
    const { borderScore, intruderCount } = calcBorderScore(state, mapBase, aiCiv, other);

    if (borderScore === 0) continue;

    // Escalation roll: random check against tolerance
    // Higher tolerance = less likely to escalate (larger divisor)
    const toleranceDivisor = Math.abs(tolerance) + 2;
    const roll = ((turnNumber * 31 + aiCiv * 17 + other * 11) % toleranceDivisor);

    if (roll === 0) {
      // Set violation flag (0x20) on the treaty
      addTreatyFlag(state, aiCiv, other, TF.INTRUDER);
    }

    // Fire appropriate events based on treaty status
    if (treaty === 'peace') {
      if (intruderCount > 0) {
        fireDiplomacyEvent(state, DIPLO_EVENTS.INTRUDER, aiCiv, other, {
          borderScore, intruderCount,
        });
      } else {
        fireDiplomacyEvent(state, DIPLO_EVENTS.NEARCITY, aiCiv, other, {
          borderScore,
        });
      }
      // Attitude penalty for intrusion during peace
      actions.push(makeAttitudeAction(aiCiv, other, -3));
    } else if (treaty === 'ceasefire') {
      if (intruderCount > 0) {
        fireDiplomacyEvent(state, DIPLO_EVENTS.VIOLATORS, aiCiv, other, {
          borderScore, intruderCount,
        });
      } else {
        fireDiplomacyEvent(state, DIPLO_EVENTS.VIOLATOR, aiCiv, other, {
          borderScore,
        });
      }
      // Harsher attitude penalty during ceasefire
      actions.push(makeAttitudeAction(aiCiv, other, -5));
    } else {
      // No treaty (uncontacted or bare contact) — direct war consideration
      // Stronger attitude penalty; shouldDeclareWar will pick this up
      actions.push(makeAttitudeAction(aiCiv, other, -8));
    }
  }

  return actions;
}

// ── Military Aid ────────────────────────────────────────────────

/**
 * Consider gifting a military unit to an allied civ that is losing a war.
 *
 * Port of FUN_0055d8d8 military aid path:
 *   - For each allied civ at war: if ally is weaker than their enemy
 *   - Find a non-civilian unit in one of AI's cities
 *   - Score: defense + attack*2 (prefer offensive units)
 *   - Transfer the unit to the ally
 *   - Gate: only consider if AI has 5+ military units, once per turn
 *
 * @param {object} state - game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ considering aid
 * @returns {Array<object>} actions generated
 */
export function considerMilitaryAid(state, mapBase, aiCiv) {
  const actions = [];

  if (!state.civs || !state.units) return actions;

  // Gate: only consider if AI has 5+ military units
  let milUnitCount = 0;
  for (const u of state.units) {
    if (!u || u.owner !== aiCiv || u.gx < 0) continue;
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk > 0 || def > 1) milUnitCount++;
  }
  if (milUnitCount < 5) return actions;

  let aided = false;

  for (let ally = 1; ally < 8; ally++) {
    if (ally === aiCiv || aided) continue;
    if (!(state.civsAlive & (1 << ally))) continue;
    if (getTreaty(state, aiCiv, ally) !== 'alliance') continue;

    // Check if ally is at war with someone
    let allyEnemy = -1;
    let allyEnemyStr = 0;
    for (let e = 1; e < 8; e++) {
      if (e === ally || e === aiCiv) continue;
      if (!(state.civsAlive & (1 << e))) continue;
      if (getTreaty(state, ally, e) !== 'war') continue;
      if (!haveContact(state, ally, e)) continue;
      const eStr = calcMilitaryStrength(state, e);
      if (eStr > allyEnemyStr) {
        allyEnemyStr = eStr;
        allyEnemy = e;
      }
    }
    if (allyEnemy < 0) continue;

    // Check if ally is weaker than their enemy
    const allyStr = calcMilitaryStrength(state, ally);
    if (allyStr >= allyEnemyStr) continue;

    // Collect AI cities (to find units stationed in cities)
    const aiCityPositions = new Set();
    if (state.cities) {
      for (const c of state.cities) {
        if (c && c.owner === aiCiv && c.size > 0 && c.gx >= 0) {
          aiCityPositions.add(c.gy * mapBase.mw + c.gx);
        }
      }
    }

    // Find best non-civilian unit in one of AI's cities
    let bestUnit = -1;
    let bestScore = 0;
    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (!u || u.owner !== aiCiv || u.gx < 0) continue;
      const atk = UNIT_ATK[u.type] || 0;
      const def = UNIT_DEF[u.type] || 0;
      if (atk === 0 && def <= 1) continue; // skip non-combat

      // Must be in one of our cities
      const tileIdx = u.gy * mapBase.mw + u.gx;
      if (!aiCityPositions.has(tileIdx)) continue;

      const score = def + atk * 2;
      if (score > bestScore) {
        bestScore = score;
        bestUnit = ui;
      }
    }

    if (bestUnit >= 0) {
      actions.push({
        type: 'GIFT_UNIT',
        unitIndex: bestUnit,
        fromCiv: aiCiv,
        toCiv: ally,
      });
      aided = true;
    }
  }

  return actions;
}

// ── Per-Continent Military Analysis ─────────────────────────────
// Port of the continent-based strength comparison from FUN_0055cbd5.
// In the original, continents are tracked via per-continent data blocks
// at civ offsets +404-996. We approximate using city proximity clusters.

/**
 * Assign each city to a "continent" cluster via flood-fill on the
 * isometric grid. Two cities share a continent if they're within
 * 20 tiles of each other (approximating landmass connectivity).
 *
 * Returns a Map<clusterId, { civCities: Map<civSlot, [{gx,gy}]>,
 *                            civMilitary: Map<civSlot, number> }>
 */
function computeContinentData(gameState, mapBase) {
  const cities = gameState.cities;
  const units = gameState.units;
  if (!cities || !units) return new Map();

  // Collect alive cities with their positions
  const aliveCities = [];
  for (const c of cities) {
    if (c && c.size > 0 && c.gx >= 0) {
      aliveCities.push(c);
    }
  }

  // Simple clustering: union-find by proximity (within 20 tiles)
  const CLUSTER_DIST = 20;
  const parent = new Array(aliveCities.length);
  for (let i = 0; i < parent.length; i++) parent[i] = i;

  function find(x) {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  }
  function union(a, b) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent[ra] = rb;
  }

  for (let i = 0; i < aliveCities.length; i++) {
    for (let j = i + 1; j < aliveCities.length; j++) {
      const d = tileDist(aliveCities[i].gx, aliveCities[i].gy,
                         aliveCities[j].gx, aliveCities[j].gy, mapBase);
      if (d <= CLUSTER_DIST) union(i, j);
    }
  }

  // Build cluster map
  const clusters = new Map();
  for (let i = 0; i < aliveCities.length; i++) {
    const cid = find(i);
    if (!clusters.has(cid)) {
      clusters.set(cid, { civCities: new Map(), civMilitary: new Map() });
    }
    const cl = clusters.get(cid);
    const owner = aliveCities[i].owner;
    if (!cl.civCities.has(owner)) cl.civCities.set(owner, []);
    cl.civCities.get(owner).push(aliveCities[i]);
  }

  // Assign unit military strength to the nearest cluster where their civ has cities
  for (const u of units) {
    if (!u || u.gx < 0) continue;
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def <= 1) continue; // non-combat
    const str = atk + def;

    // Find the cluster containing this unit's nearest friendly city
    let bestCluster = -1;
    let bestDist = Infinity;
    for (const [cid, cl] of clusters) {
      const friendlyCities = cl.civCities.get(u.owner);
      if (!friendlyCities) continue;
      for (const c of friendlyCities) {
        const d = tileDist(u.gx, u.gy, c.gx, c.gy, mapBase);
        if (d < bestDist) { bestDist = d; bestCluster = cid; }
      }
    }
    if (bestCluster >= 0) {
      const cl = clusters.get(bestCluster);
      cl.civMilitary.set(u.owner, (cl.civMilitary.get(u.owner) || 0) + str);
    }
  }

  return clusters;
}

/**
 * Compute total military strength for a civ (sum of ATK+DEF for combat units).
 */
function calcMilitaryStrength(gameState, civSlot) {
  if (!gameState.units) return 0;
  let strength = 0;
  for (const u of gameState.units) {
    if (!u || u.owner !== civSlot || u.gx < 0) continue;
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def <= 1) continue;
    strength += atk + def;
  }
  return strength;
}

/**
 * Count alive cities for a civ.
 */
function countCities(gameState, civSlot) {
  if (!gameState.cities) return 0;
  let n = 0;
  for (const c of gameState.cities) {
    if (c && c.owner === civSlot && c.size > 0 && c.gx >= 0) n++;
  }
  return n;
}

// ═══════════════════════════════════════════════════════════════════
// 1. evaluateMilitaryBalance — Per-continent strength comparison
//    Port of the inner loop of FUN_0055cbd5
// ═══════════════════════════════════════════════════════════════════

/**
 * Compare military balance between two civs on shared continents.
 *
 * Returns:
 *   { dominantCount, weakCount, sharedContinents,
 *     ourSharedStrength, theirSharedStrength }
 *
 * dominantCount: continents where we have >= 2x their strength
 * weakCount:     continents where they have >= 2x our strength
 *
 * Based on FUN_0055cbd5's per-continent loop at 0x0055CE6E:
 *   for each continent where both have cities,
 *     compare attack_strength[us] + city_attack[us]
 *     vs attack_strength[them] + city_count[them]
 */
function evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState) {
  let dominantCount = 0;
  let weakCount = 0;
  let sharedContinents = 0;
  let ourSharedStrength = 0;
  let theirSharedStrength = 0;

  // Sun Tzu's War Academy (wonder 7) gives effective military bonus
  const hasSunTzu = hasWonderEffect(gameState, civSlot, 7);
  const theyHaveSunTzu = hasWonderEffect(gameState, targetCiv, 7);

  for (const [, cl] of continentData) {
    const ourCities = cl.civCities.get(civSlot);
    const theirCities = cl.civCities.get(targetCiv);
    if (!ourCities || !theirCities) continue; // not a shared continent

    sharedContinents++;

    let ourStr = cl.civMilitary.get(civSlot) || 0;
    let theirStr = cl.civMilitary.get(targetCiv) || 0;

    // Sun Tzu bonus: +25% effective strength (simulates veteran bonus)
    if (hasSunTzu) ourStr = Math.floor(ourStr * 1.25);
    if (theyHaveSunTzu) theirStr = Math.floor(theirStr * 1.25);

    ourSharedStrength += ourStr;
    theirSharedStrength += theirStr;

    if (ourStr >= theirStr * 2) dominantCount++;
    if (theirStr >= ourStr * 2) weakCount++;
  }

  return { dominantCount, weakCount, sharedContinents,
           ourSharedStrength, theirSharedStrength };
}

// ═══════════════════════════════════════════════════════════════════
// 2. shouldDeclareWar — Port of FUN_0055cbd5
//
// Original function checks:
//   - Alliance constraints (0x08 treaty flag = alliance)
//   - Third-party alliances that would be violated
//   - Per-continent military dominance ratio
//   - Leader patience (DAT_006554f8[rulesCivNumber])
//   - Number of existing war fronts
//   - Random factor
// ═══════════════════════════════════════════════════════════════════

function shouldDeclareWar(civSlot, targetCiv, continentData, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty === 'war') return false; // already at war

  const personality = getPersonality(gameState, civSlot);
  const difficulty = getDifficultyIndex(gameState, civSlot);

  // Peaceful leaders (militarism -1) avoid declaring war unless provoked
  // This maps to the patience check in FUN_0055cbd5 line ~5240:
  //   if patience[us] < patience[them] → return 0 (don't declare)
  if (personality.militarism < 0) return false;

  // Count existing wars — FUN_0055cbd5 at ~5244-5260 iterates all civs
  // and counts active wars, alliances, and third-party considerations
  const warCount = countWars(gameState, civSlot);

  // Don't open more than 2 fronts (from decompiled: local_c threshold)
  if (warCount > 2) return false;

  // Aggressive leaders tolerate one more front
  const maxFronts = personality.militarism > 0 ? 3 : 2;
  if (warCount >= maxFronts) return false;

  // Alliance constraint: if we're allied with civA, and civA is allied
  // with targetCiv, don't declare war on targetCiv.
  // Port of FUN_0055cbd5 at ~5222-5238:
  //   for each third civ: if allied with us AND allied with target
  //   AND third civ is stronger → return 0
  if (treaty === 'alliance') {
    // Breaking an alliance to declare war is a separate decision
    return false;
  }

  const civs = gameState.civs;
  if (civs) {
    for (let k = 1; k < civs.length; k++) {
      if (k === civSlot || k === targetCiv) continue;
      if (!(gameState.civsAlive & (1 << k))) continue;

      const ourTreaty = getTreaty(gameState, civSlot, k);
      const theirTreaty = getTreaty(gameState, targetCiv, k);

      // If we're allied with k, and k is allied with targetCiv,
      // declaring war would damage our alliance with k
      if (ourTreaty === 'alliance' && theirTreaty === 'alliance') {
        return false;
      }

      // FUN_0055cbd5 ~5252-5258: if third civ is allied with both us
      // and the target, AND third civ is stronger than both, don't start war
      if (ourTreaty === 'alliance' && theirTreaty !== 'war') {
        const thirdStr = calcMilitaryStrength(gameState, k);
        const ourStr = calcMilitaryStrength(gameState, civSlot);
        if (thirdStr > ourStr) return false;
      }
    }
  }

  // Per-continent military comparison
  const balance = evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState);

  // Must share at least one continent (proximity check)
  if (balance.sharedContinents === 0) return false;

  // Need military dominance on at least one shared continent
  // FUN_0055cbd5 ~5282-5298: compares total strength ratio with
  // a threshold derived from (local_c - patience + 4)
  if (balance.dominantCount === 0) return false;

  // Overall strength check: our shared strength must exceed theirs
  // factored by the war front count penalty
  const strengthRatio = balance.ourSharedStrength /
                        Math.max(balance.theirSharedStrength, 1);

  // FUN_0055cbd5 line ~5298: (local_1c << 2) / local_24 < (local_c - patience + 4)
  // Translating: we need 4x strength advantage minus patience offset
  // Simplified: need strengthRatio > (2.0 - 0.5 * militarism)
  const requiredRatio = 2.0 - 0.5 * personality.militarism;
  if (strengthRatio < requiredRatio) return false;

  // Higher difficulty AI is more willing to declare war
  // FUN_0055cbd5 uses difficulty indirectly through patience tables
  const difficultyBonus = difficulty * 0.05; // 0.0 to 0.25

  // Random check: 30% base chance, modified by personality and difficulty
  // The original uses `_rand()` checks scattered throughout; we simplify
  // to a single probabilistic gate per turn
  const warChance = 0.2 + 0.1 * personality.militarism + difficultyBonus;
  if ((gameState.rng ? gameState.rng.random() : Math.random()) > warChance) return false;

  return true;
}

// ═══════════════════════════════════════════════════════════════════
// 3. shouldProposePeace — Port of FUN_0055d8d8 peace path
//
// From the decompiled main diplomacy function, peace is proposed when:
//   - Currently at war
//   - FUN_0055cbd5 returns 0 (can't sustain war) for BOTH sides
//   - OR one side has wonder protection (Great Wall / United Nations)
//   - OR patience threshold exceeded (long war)
//   - Contact frequency: (turn + civ1 + civ2) % 4 == 0 OR first contact
// ═══════════════════════════════════════════════════════════════════

function shouldProposePeace(civSlot, targetCiv, continentData, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty !== 'war') return false; // only propose peace when at war

  const personality = getPersonality(gameState, civSlot);
  const turnNumber = gameState.turn?.number ?? 0;
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;

  // Contact frequency gate from FUN_0055d8d8 ~5663:
  //   (DAT_00655af8 + param_2 + param_1 & 3) == 0
  // This means diplomacy runs every 4 turns per pair
  if ((turnNumber + civSlot + targetCiv) % 4 !== 0) return false;

  const balance = evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState);
  const ourTotal = calcMilitaryStrength(gameState, civSlot);
  const theirTotal = calcMilitaryStrength(gameState, targetCiv);
  const strengthRatio = ourTotal / Math.max(theirTotal, 1);

  // Great Wall (wonder 6) / United Nations (wonder 24) provide diplomatic shield
  // From FUN_0055d8d8 ~5668-5676: hasWonder(target, 6) or hasWonder(target, 0x18)
  // forces peace consideration even if militarily strong
  const targetHasGreatWall = hasWonderEffect(gameState, targetCiv, 6);
  const targetHasUN = hasWonderEffect(gameState, targetCiv, 24);
  const weHaveGreatWall = hasWonderEffect(gameState, civSlot, 6);
  const weHaveUN = hasWonderEffect(gameState, civSlot, 24);

  // FUN_0055d8d8 ~5668: if FUN_0055cbd5 returns 0 (can't declare war)
  // for BOTH sides, they make peace. Approximate this:
  let shouldPeace = false;

  // Their military > 1.5x ours on shared continents — we're losing
  if (balance.weakCount > 0 && balance.dominantCount === 0) {
    shouldPeace = true;
  }

  // Overall strength deficit
  if (strengthRatio < 0.67) {
    shouldPeace = true;
  }

  // Treasury very low — can't sustain war
  // From FUN_0045705e: treasury checks against tribute thresholds
  if (treasury < 50) {
    shouldPeace = true;
  }

  // Peaceful leaders propose peace more readily
  if (personality.militarism < 0 && strengthRatio < 1.2) {
    shouldPeace = true;
  }

  // Long war without advantage (approximate: use turn parity check)
  // FUN_0055d8d8 ~5510-5514: checks if more than 15 turns since last contact
  // We approximate with war front fatigue
  const warCount = countWars(gameState, civSlot);
  if (warCount > 1 && strengthRatio < 1.5) {
    shouldPeace = true;
  }

  // Wonder-protected targets — forcing peace
  if (targetHasGreatWall || targetHasUN) {
    shouldPeace = true;
  }

  // Don't propose if we clearly dominate — FUN_0055cbd5 would return 1
  // meaning we SHOULD be fighting
  if (balance.dominantCount > 0 && balance.weakCount === 0 && strengthRatio > 2.0) {
    // Unless we have Great Wall/UN forcing pacifism
    if (!weHaveGreatWall && !weHaveUN) {
      shouldPeace = false;
    }
  }

  // Aggressive leaders are less willing to propose peace
  if (personality.militarism > 0 && strengthRatio > 1.0) {
    shouldPeace = false;
  }

  // Don't propose peace to civs with very negative attitude (< -50)
  const attitude = getAttitude(gameState, civSlot, targetCiv);
  if (attitude < -50 && strengthRatio > 0.8) {
    shouldPeace = false;
  }

  return shouldPeace;
}

// ═══════════════════════════════════════════════════════════════════
// 4. shouldDemandTribute — Port of FUN_0045705e tribute logic
//
// FUN_0045705e at ~3574-3679 computes DAT_0064b0ec (tribute demand)
// and DAT_0064b118 (tech desire). Tribute is demanded when:
//   - Not at war (already have contact)
//   - We're militarily dominant
//   - Target has enough treasury to be worth demanding
//   - Contact frequency allows it (every ~6+ turns per pair)
//   - Leader patience modulates amount
// ═══════════════════════════════════════════════════════════════════

function shouldDemandTribute(civSlot, targetCiv, continentData, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty === 'war') return null; // can't demand from enemies

  const turnNumber = gameState.turn?.number ?? 0;
  const difficulty = getDifficultyIndex(gameState, civSlot);
  const personality = getPersonality(gameState, civSlot);

  // ── Item 4: DEMAND_COOLDOWN — check demand cooldown timer (8 turns) ──
  const diploKey = `${civSlot}-${targetCiv}`;
  const cooldownExpiry = gameState.diplomacy?.[diploKey]?.demandCooldown ?? 0;
  if (cooldownExpiry > 0 && turnNumber < cooldownExpiry) return null;

  // ── Item 9: WONDER_DEMAND_SUPPRESSION ──
  // Great Wall (wonder 6) or United Nations (wonder 24) suppress tribute demands
  if (civHasWonder(gameState, targetCiv, 6) || civHasWonder(gameState, targetCiv, 24)) {
    return null;
  }

  // FUN_0055d685 at ~5442: check if last demand was less than 6 turns ago
  //   (DAT_0064ca82[target][us] - currentTurn) < 6 → too recent
  // We approximate with modular turn check
  if ((turnNumber + civSlot * 3 + targetCiv) % 10 !== 0) return null;

  // Peaceful leaders rarely demand tribute
  if (personality.militarism < 0 && (gameState.rng ? gameState.rng.random() : Math.random()) > 0.33) return null;

  // Military comparison
  const balance = evaluateMilitaryBalance(civSlot, targetCiv, continentData, gameState);
  const ourStr = calcMilitaryStrength(gameState, civSlot);
  const theirStr = calcMilitaryStrength(gameState, targetCiv);
  let ratio = ourStr / Math.max(theirStr, 1);

  // Tech desire: check what techs the target has that we don't
  // This increases our motivation to demand tribute
  let techDesire = 0;
  const ourTechs = gameState.civTechs?.[civSlot];
  const theirTechs = gameState.civTechs?.[targetCiv];
  if (ourTechs && theirTechs) {
    for (const tid of theirTechs) {
      if (!ourTechs.has(tid)) techDesire++;
    }
  }
  // If they have desirable techs, lower the effective military threshold
  if (techDesire > 3) ratio += 0.3;

  // Need military advantage — FUN_0045705e uses complex per-continent
  // calculations; we simplify to a 1.5x threshold
  if (ratio < 1.5) return null;

  // Check target treasury
  const theirTreasury = gameState.civs?.[targetCiv]?.treasury ?? 0;
  if (theirTreasury < 100) return null; // not worth demanding

  // Use the binary-faithful calcTributeDemand: targetCiv = payer (the
  // one being asked), civSlot = receiver (the demanding AI).
  const offer = calcTributeDemand(gameState, targetCiv, civSlot);
  if (offer.willingness !== 'pay' || offer.amount <= 0) return null;
  let amount = offer.amount;

  // ── Item 4: DEMAND_COOLDOWN — half-demand period and ceasefire halving ──
  // 16-turn half-demand period: if within 16 turns of last demand, halve amount
  const lastDemandTurn = gameState.diplomacy?.[diploKey]?.lastDemandTurn ?? 0;
  if (lastDemandTurn > 0 && turnNumber - lastDemandTurn < 16) {
    amount = Math.floor(amount / 2);
  }
  // If ceasefire is active: halve tribute again
  if (treaty === 'ceasefire') {
    amount = Math.floor(amount / 2);
  }

  amount = Math.max(25, Math.min(1000, amount));

  // FUN_0055d685 ~5446: barbarian-like civs have 1-in-3 random gate
  // We apply a general random check for less aggressive leaders
  if (personality.militarism <= 0 && (gameState.rng ? gameState.rng.random() : Math.random()) > 0.5) return null;

  return { targetCiv, amount };
}

// ═══════════════════════════════════════════════════════════════════
// 5. shouldBreakAlliance — Alliance maintenance logic
//
// From FUN_0055d8d8 ~5746-5793: break alliance if:
//   - Allied civ is at war with multiple of our other allies
//   - A stronger third party threatens us and allied civ won't help
//   - Power ranking divergence (one civ is #7 and other is below #4)
// ═══════════════════════════════════════════════════════════════════

function shouldBreakAlliance(civSlot, targetCiv, gameState) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty !== 'alliance') return false;

  const personality = getPersonality(gameState, civSlot);
  const turnNumber = gameState.turn?.number ?? 0;

  // Only consider breaking alliances occasionally
  if ((turnNumber + civSlot + targetCiv * 2) % 8 !== 0) return false;

  const ourStr = calcMilitaryStrength(gameState, civSlot);
  const theirStr = calcMilitaryStrength(gameState, targetCiv);

  // FUN_0055d8d8 ~5749-5756: power ranking check
  // If allied civ is drastically weaker and we're the top power,
  // the alliance may not serve our interests
  const ourCities = countCities(gameState, civSlot);
  const theirCities = countCities(gameState, targetCiv);

  // Check if ally is dragging us into unwanted wars
  // FUN_0055d8d8 ~5760-5793: for each third civ, check if ally's wars
  // conflict with our other alliances
  let conflictCount = 0;
  const civs = gameState.civs;
  if (civs) {
    for (let k = 1; k < civs.length; k++) {
      if (k === civSlot || k === targetCiv) continue;
      if (!(gameState.civsAlive & (1 << k))) continue;

      const theirRelation = getTreaty(gameState, targetCiv, k);
      const ourRelation = getTreaty(gameState, civSlot, k);

      // Ally is at war with someone we're at peace with
      if (theirRelation === 'war' && ourRelation !== 'war') {
        conflictCount++;
      }
    }
  }

  // Break if too many conflicts and we're not aggressive
  if (conflictCount >= 2 && personality.militarism <= 0) return true;

  // Break if ally has become very weak (liability)
  if (theirStr * 4 < ourStr && theirCities <= 1) return true;

  return false;
}

// ═══════════════════════════════════════════════════════════════════
// 6. processFirstContact — Initial treaty establishment
//
// From FUN_0055d8d8 ~5656-5660: on first contact (treaty flag bit 0
// not set), establish initial ceasefire via FUN_00467825 with flags
// 0x4000 (recent contact) and 0x401 (met + ceasefire).
// ═══════════════════════════════════════════════════════════════════

function processFirstContact(civSlot, targetCiv, gameState) {
  // If no treaties object exists, there's nothing to check
  if (!gameState.treaties) return null;

  const key = civSlot < targetCiv ? `${civSlot}-${targetCiv}` : `${targetCiv}-${civSlot}`;
  const current = gameState.treaties[key];

  // If there's already a treaty entry, this isn't first contact
  if (current !== undefined) return null;

  // First contact: propose ceasefire
  // In original Civ2, first contact always establishes ceasefire
  // unless scenario flags override this
  return { type: 'PROPOSE_TREATY', targetCiv, treaty: 'ceasefire' };
}

// ═══════════════════════════════════════════════════════════════════
// 7. Respond to pending treaty proposals
// ═══════════════════════════════════════════════════════════════════

/**
 * Respond to any unresolved treaty proposals addressed to this civ.
 *
 * O.1 Full Negotiation State Machine:
 *   1. Determine greeting tone from attitude
 *   2. Evaluate proposal type with attitude-based thresholds
 *   3. For alliance: attitude > 74 required
 *   4. For peace:    attitude > 50 OR military weakness
 *   5. For ceasefire: attitude > 26 OR multi-front war
 *   6. If rejected, generate counter-offer
 *
 * Ported from FUN_0045705e attitude scoring with full thresholds.
 */
function respondToTreatyProposals(gameState, mapBase, civSlot, continentData) {
  const actions = [];
  const proposals = gameState.treatyProposals;
  if (!proposals) return actions;

  const personality = getPersonality(gameState, civSlot);

  for (let i = 0; i < proposals.length; i++) {
    const p = proposals[i];
    if (!p || p.resolved || p.to !== civSlot) continue;

    const attitude = getAttitude(gameState, civSlot, p.from);
    const tone = getGreetingTone(attitude);
    const balance = evaluateMilitaryBalance(
      civSlot, p.from, continentData, gameState);
    const ourStr = calcMilitaryStrength(gameState, civSlot);
    const theirStr = calcMilitaryStrength(gameState, p.from);
    const ratio = ourStr / Math.max(theirStr, 1);
    const warCount = countWars(gameState, civSlot);

    let accept = false;

    // Reject alliance/peace proposals from civs with bad reputation
    if ((p.treaty === 'alliance' || p.treaty === 'peace') && isReputationTooLow(gameState, p.from)) {
      accept = false;
    } else if (p.treaty === 'alliance') {
      // O.1 Treaty evaluation: alliance if attitude > 74
      if (attitude > 74) accept = true;
      // Also accept if we share enemies and are relatively weak
      if (attitude > 50 && warCount > 0 && ratio < 1.0) accept = true;
      // Enthusiastic greeting → always consider
      if (tone === 'enthusiastic') accept = true;
      // Hostile/guarded → never accept alliance
      if (tone === 'hostile' || tone === 'guarded') accept = false;
    } else if (p.treaty === 'peace') {
      // O.1 Treaty evaluation: peace if attitude > 50
      if (attitude > 50) accept = true;
      // Accept if they're stronger or roughly equal
      if (ratio < 1.5) accept = true;
      if (warCount > 1) accept = true;
      if (balance.weakCount > 0) accept = true;
      if (personality.militarism < 0) accept = true;
      // Reject if we clearly dominate and are aggressive
      if (ratio > 2.0 && balance.dominantCount > 0 && personality.militarism > 0) {
        accept = false;
      }
      // Hostile tone halves willingness (FUN_0045705e attitude < 4)
      if (tone === 'hostile' && ratio > 0.8) accept = false;
    } else {
      // Ceasefire: attitude > 26 OR multi-front pressure
      if (attitude > 0) accept = true;
      if (ratio < 1.5) accept = true;
      if (warCount > 1) accept = true;
      if (balance.weakCount > 0) accept = true;
      if (personality.militarism < 0) accept = true;
      // Reject if dominant + aggressive
      if (ratio > 2.0 && balance.dominantCount > 0 && personality.militarism > 0) {
        accept = false;
      }
    }

    const action = { type: 'RESPOND_TREATY', proposalIndex: i, accept };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
      // O.1: Attitude adjustment on accept/reject
      if (accept) {
        actions.push(makeAttitudeAction(civSlot, p.from, +10));
      } else {
        actions.push(makeAttitudeAction(civSlot, p.from, -5));
        // O.1: Counter-offer on rejection
        const counter = generateCounterOffer(civSlot, p.from, 'treaty', gameState);
        if (counter) {
          const cErr = validateAction(gameState, mapBase, counter, civSlot);
          if (!cErr) actions.push(counter);
        }
      }
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// 8. Respond to pending tribute demands
// ═══════════════════════════════════════════════════════════════════

/**
 * Respond to unresolved tribute demands.
 *
 * O.1 Full Demand Evaluation:
 *   - Use evaluateDemand() with attitude thresholds
 *   - Generate counter-offers when rejecting
 *   - Attitude adjustments for accept/reject
 *
 * From FUN_0045705e: acceptance based on military ratio and attitude.
 */
function respondToTributeDemands(gameState, mapBase, civSlot, continentData) {
  const actions = [];
  const demands = gameState.tributeDemands;
  if (!demands) return actions;

  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
  const personality = getPersonality(gameState, civSlot);

  for (let i = 0; i < demands.length; i++) {
    const d = demands[i];
    if (!d || d.resolved || d.to !== civSlot) continue;

    const attitude = getAttitude(gameState, civSlot, d.from);
    const balance = evaluateMilitaryBalance(
      civSlot, d.from, continentData, gameState);
    const ourStr = calcMilitaryStrength(gameState, civSlot);
    const theirStr = calcMilitaryStrength(gameState, d.from);
    const ratio = theirStr / Math.max(ourStr, 1);

    // O.1: Use evaluateDemand for the base decision
    let accept = evaluateDemand(civSlot, d.from, 'gold', d.amount, gameState, continentData);

    // Override: accept if they're much stronger (>2x) and we can afford it
    if (ratio > 2 && treasury >= d.amount) accept = true;

    // Peaceful leaders accept more readily
    if (ratio > 1.5 && personality.militarism < 0 && treasury >= d.amount) {
      accept = true;
    }

    // If we're weak on their continent, pay up
    if (balance.weakCount > 0 && balance.dominantCount === 0 && treasury >= d.amount) {
      accept = true;
    }

    // Never accept if it would bankrupt us (leave < 20% treasury)
    if (treasury - d.amount < treasury * 0.2) accept = false;

    // Aggressive leaders never accept unless truly desperate
    if (personality.militarism > 0 && ratio < 3) accept = false;

    const action = { type: 'RESPOND_DEMAND', demandIndex: i, accept };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
      // O.1: Attitude changes
      if (accept) {
        // Paying tribute slightly increases their view of us
        actions.push(makeAttitudeAction(d.from, civSlot, +5));
      } else {
        // Rejection worsens relations
        actions.push(makeAttitudeAction(d.from, civSlot, -10));
        // O.1: Counter-offer on rejection
        const counter = generateCounterOffer(civSlot, d.from, 'gold', gameState);
        if (counter) {
          const cErr = validateAction(gameState, mapBase, counter, civSlot);
          if (!cErr) actions.push(counter);
        }
      }
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// O.2: AI Tech Exchange — AI-to-AI tech trading
//
// Port of FUN_0055d1e2 (tech/peace negotiation between two AI civs):
//   - Evaluate mutual benefit
//   - "Superior civ" blocking: if strongest human is far ahead, block
//   - Alliance-based tech tribute: allies share techs freely
//   - One tech per exchange per turn
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate AI-to-AI tech exchange actions for this civ.
 *
 * Each AI civ can perform at most one tech exchange per turn.
 * Allies share techs freely. Non-allied civs trade based on
 * mutual benefit (each gives one tech the other doesn't have).
 *
 * @param {number} civSlot - the AI civ
 * @param {object} gameState
 * @param {object} mapBase
 * @param {object} continentData
 * @param {Array<string>|null} debugLog
 * @returns {Array<object>} actions
 */
function generateAiTechExchange(civSlot, gameState, mapBase, continentData, debugLog) {
  const actions = [];

  // Both civs must be AI
  if (isHumanCiv(gameState, civSlot)) return actions;

  // Superior civ blocking check
  if (isTechTradeBlocked(gameState, civSlot, civSlot)) return actions;

  let traded = false;

  for (let other = 1; other < 8; other++) {
    if (other === civSlot) continue;
    if (!(gameState.civsAlive & (1 << other))) continue;
    if (isHumanCiv(gameState, other)) continue;
    if (!haveContact(gameState, civSlot, other)) continue;
    if (traded) break; // one exchange per turn

    const treaty = getTreaty(gameState, civSlot, other);
    if (treaty === 'war') continue;

    // Check per-pair frequency: trade every 4 turns per pair
    // Binary: (DAT_00655af8 + param_1 + param_2) & 3 == 0
    const turnNumber = gameState.turn?.number ?? 0;
    if ((turnNumber + civSlot + other) & 3) continue;

    // Find tradable techs in each direction
    const weCanGive = findTradableTechs(gameState, civSlot, other);
    const theyCanGive = findTradableTechs(gameState, other, civSlot);

    if (treaty === 'alliance') {
      // O.2: Alliance-based tech tribute — allies share techs freely
      // Give our best tech to ally (one per turn)
      if (weCanGive.length > 0) {
        // Pick the tech with highest value for the recipient
        // Gap 48: Skip techs that would enable unbuilt wonders
        let bestTech = -1;
        let bestVal = 0;
        for (const tid of weCanGive) {
          if (wouldEnableWonder(gameState, other, tid)) continue;
          const val = valueTech(tid, other, gameState);
          if (val > bestVal) { bestVal = val; bestTech = tid; }
        }
        if (bestTech < 0) continue; // all tradable techs blocked by wonder check
        actions.push({
          type: 'EXECUTE_TRADE',
          fromCiv: civSlot,
          toCiv: other,
          transaction: { from: civSlot, to: other, techs: [bestTech] },
        });
        // Receive their best tech in return (if they have one)
        if (theyCanGive.length > 0) {
          let theirBest = theyCanGive[0];
          let theirBestVal = 0;
          for (const tid of theyCanGive) {
            const val = valueTech(tid, civSlot, gameState);
            if (val > theirBestVal) { theirBestVal = val; theirBest = tid; }
          }
          actions.push({
            type: 'EXECUTE_TRADE',
            fromCiv: other,
            toCiv: civSlot,
            transaction: { from: other, to: civSlot, techs: [theirBest] },
          });
        }
        traded = true;
        if (debugLog) {
          const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
          const otherName = gameState.civs?.[other]?.name || `Civ ${other}`;
          debugLog.push(`DIPLO: ${civName} exchanges tech with ally ${otherName}`);
        }
      }
    } else {
      // Non-allied: mutual benefit trade
      // Both must have something to give
      if (weCanGive.length === 0 || theyCanGive.length === 0) continue;

      // Check attitude — need at least neutral relations
      const attitude = getAttitude(gameState, civSlot, other);
      if (attitude < 0) continue;

      // Evaluate mutual benefit: pick techs of similar value
      // Gap 48: Skip techs that would enable unbuilt wonders for the recipient
      let ourBestTech = -1;
      let ourBestVal = 0;
      for (const tid of weCanGive) {
        if (wouldEnableWonder(gameState, other, tid)) continue;
        const val = valueTech(tid, other, gameState);
        if (val > ourBestVal) { ourBestVal = val; ourBestTech = tid; }
      }

      let theirBestTech = -1;
      let theirBestVal = 0;
      for (const tid of theyCanGive) {
        if (wouldEnableWonder(gameState, civSlot, tid)) continue;
        const val = valueTech(tid, civSlot, gameState);
        if (val > theirBestVal) { theirBestVal = val; theirBestTech = tid; }
      }

      // If all techs are blocked by wonder check, skip
      if (ourBestTech < 0 || theirBestTech < 0) continue;

      // Only trade if values are within 2:1 ratio (fair trade)
      const valRatio = ourBestVal / Math.max(theirBestVal, 1);
      if (valRatio > 2.0 || valRatio < 0.5) continue;

      // Random gate: 50% chance per eligible pair
      if ((gameState.rng ? gameState.rng.random() : Math.random()) > 0.5) continue;

      actions.push({
        type: 'EXECUTE_TRADE',
        fromCiv: civSlot,
        toCiv: other,
        transaction: { from: civSlot, to: other, techs: [ourBestTech] },
      });
      actions.push({
        type: 'EXECUTE_TRADE',
        fromCiv: other,
        toCiv: civSlot,
        transaction: { from: other, to: civSlot, techs: [theirBestTech] },
      });
      traded = true;

      // Improve attitudes after successful trade
      actions.push(makeAttitudeAction(civSlot, other, +5));
      actions.push(makeAttitudeAction(other, civSlot, +5));

      if (debugLog) {
        const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
        const otherName = gameState.civs?.[other]?.name || `Civ ${other}`;
        debugLog.push(`DIPLO: ${civName} trades tech with ${otherName} (mutual benefit)`);
      }
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// O.3: Alliance/Crusade Proposals — "HELPME" alliance formation
//
// Port of FUN_0055d685 (third-party "join war" requests):
//   - AI offers gold + techs for alliance against mutual enemy
//   - Crusade: multiple civs allied against dominant civ
//   - Evaluate: strength of target vs combined alliance strength
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate alliance proposals and crusade requests.
 *
 * "HELPME" pattern:
 *   1. Find our biggest enemy (strongest civ we're at war with)
 *   2. Find potential allies (civs at peace with us, not allied with enemy)
 *   3. Offer alliance + gold/tech incentive if combined strength > enemy
 *
 * Crusade pattern:
 *   1. Find the dominant civ (highest power ranking)
 *   2. If dominant civ is much stronger than any single civ
 *   3. Propose alliances between multiple weaker civs against dominant
 *
 * @param {number} civSlot
 * @param {object} gameState
 * @param {object} mapBase
 * @param {object} continentData
 * @param {Array<string>|null} debugLog
 * @returns {Array<object>} actions
 */
function generateAllianceProposals(civSlot, gameState, mapBase, continentData, debugLog) {
  const actions = [];
  const personality = getPersonality(gameState, civSlot);
  const turnNumber = gameState.turn?.number ?? 0;

  // ── Proactive alliance proposals (non-war) ──
  // Exact timing gate: (turn & 0x1F) === (aiCiv << 2) — every 32 turns, staggered per civ
  if ((turnNumber & 0x1F) === ((civSlot << 2) & 0x1F)) {
    for (let target = 1; target < 8; target++) {
      if (target === civSlot) continue;

      // 6-condition target selection:
      // 1. Target is alive
      if (!(gameState.civsAlive & (1 << target))) continue;
      // 2. Have contact
      if (!haveContact(gameState, civSlot, target)) continue;
      // 3. Not already allied
      const targetTreaty = getTreaty(gameState, civSlot, target);
      if (targetTreaty === 'alliance') continue;
      // 4. Attitude > alliance proposal gate (tolerance - attitude < 6)
      const attitude = getAttitude(gameState, civSlot, target);
      const aiCivData = gameState.civs?.[civSlot];
      const rcn = aiCivData?.rulesCivNumber ?? 0;
      const pers3 = LEADER_PERSONALITY_3[rcn] || [0, 0, 0];
      const tolerance = pers3[2] ?? 0;
      if (tolerance - attitude >= 6) continue;
      // 5. Target is not at war with us
      if (targetTreaty === 'war' && haveContact(gameState, civSlot, target)) continue;
      // 6. Target is not barbarian
      if (target === 0) continue;
      // 7. Our reputation is not too low (target won't trust us)
      if (isReputationTooLow(gameState, civSlot)) continue;

      const hasPending = gameState.treatyProposals?.some(
        p => (p.from === civSlot && p.to === target) && !p.resolved
      );
      if (hasPending) continue;

      const action = { type: 'PROPOSE_TREATY', targetCiv: target, treaty: 'alliance' };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) {
        actions.push(action);
        actions.push(makeAttitudeAction(civSlot, target, +5));
        if (debugLog) {
          const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
          const tgtName = gameState.civs?.[target]?.name || `Civ ${target}`;
          debugLog.push(`DIPLO: ${civName} proactively proposes alliance with ${tgtName} (attitude=${attitude})`);
        }
        break; // one proactive proposal per turn
      }
    }
  }

  // Only consider HELPME/crusade alliances periodically (every 6 turns)
  if ((turnNumber + civSlot * 5) % 6 !== 0) return actions;

  // ── HELPME: Find our biggest war enemy ──
  let biggestEnemy = -1;
  let biggestEnemyStr = 0;
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;
    if (getTreaty(gameState, civSlot, i) !== 'war') continue;
    if (!haveContact(gameState, civSlot, i)) continue;
    const str = calcMilitaryStrength(gameState, i);
    if (str > biggestEnemyStr) {
      biggestEnemyStr = str;
      biggestEnemy = i;
    }
  }

  if (biggestEnemy >= 0) {
    const ourStr = calcMilitaryStrength(gameState, civSlot);
    // Only seek help if enemy is stronger
    if (biggestEnemyStr > ourStr * 0.8) {
      for (let ally = 1; ally < 8; ally++) {
        if (ally === civSlot || ally === biggestEnemy) continue;
        if (!(gameState.civsAlive & (1 << ally))) continue;
        if (!haveContact(gameState, civSlot, ally)) continue;

        const allyTreaty = getTreaty(gameState, civSlot, ally);
        const allyEnemyTreaty = getTreaty(gameState, ally, biggestEnemy);

        // Can't propose alliance if already at war with potential ally
        if (allyTreaty === 'war') continue;
        // Skip if ally is already allied with our enemy
        if (allyEnemyTreaty === 'alliance') continue;
        // Already allied — no need to propose
        if (allyTreaty === 'alliance') continue;

        const allyStr = calcMilitaryStrength(gameState, ally);
        const combinedStr = ourStr + allyStr;

        // Only propose if combined strength exceeds enemy strength
        if (combinedStr < biggestEnemyStr * 0.9) continue;

        // Check attitude — need at least neutral
        const attitude = getAttitude(gameState, civSlot, ally);
        if (attitude < -10) continue;

        // Skip if our reputation is too low (ally won't trust us)
        if (isReputationTooLow(gameState, civSlot)) continue;

        // Propose alliance
        const hasPending = gameState.treatyProposals?.some(
          p => p.from === civSlot && p.to === ally && !p.resolved
        );
        if (hasPending) continue;

        const action = { type: 'PROPOSE_TREATY', targetCiv: ally, treaty: 'alliance' };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) {
          actions.push(action);
          actions.push(makeAttitudeAction(civSlot, ally, +15));

          // O.3: Offer gold incentive if we have surplus
          const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
          if (treasury > 200) {
            const giftAmount = Math.min(Math.floor(treasury * 0.1), 100);
            actions.push({
              type: 'EXECUTE_TRADE',
              fromCiv: civSlot,
              toCiv: ally,
              transaction: { from: civSlot, to: ally, gold: giftAmount },
            });
          }

          // O.3: Offer tech incentive (one tech ally doesn't have)
          const tradableTechs = findTradableTechs(gameState, civSlot, ally);
          if (tradableTechs.length > 0 && !isTechTradeBlocked(gameState, civSlot, ally)) {
            const giftTech = tradableTechs[0]; // cheapest available
            actions.push({
              type: 'EXECUTE_TRADE',
              fromCiv: civSlot,
              toCiv: ally,
              transaction: { from: civSlot, to: ally, techs: [giftTech] },
            });
          }

          if (debugLog) {
            const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
            const allyName = gameState.civs?.[ally]?.name || `Civ ${ally}`;
            const enemyName = gameState.civs?.[biggestEnemy]?.name || `Civ ${biggestEnemy}`;
            debugLog.push(`DIPLO: ${civName} proposes HELPME alliance with ${allyName} against ${enemyName}`);
          }
          break; // one alliance proposal per turn
        }
      }
    }
  }

  // ── Crusade: Rally against dominant civ ──
  // Find the most powerful civ overall
  let dominantCiv = -1;
  let dominantStr = 0;
  for (let i = 1; i < 8; i++) {
    if (!(gameState.civsAlive & (1 << i))) continue;
    const str = calcMilitaryStrength(gameState, i);
    const cities = countCities(gameState, i);
    const power = str + cities * 20;
    if (power > dominantStr) {
      dominantStr = power;
      dominantCiv = i;
    }
  }

  // Only initiate crusade if dominant civ is not us and is much stronger
  if (dominantCiv >= 0 && dominantCiv !== civSlot) {
    const ourStr = calcMilitaryStrength(gameState, civSlot);
    const ourPower = ourStr + countCities(gameState, civSlot) * 20;

    // Dominant must be 2x our power
    if (dominantStr > ourPower * 2) {
      const domTreaty = getTreaty(gameState, civSlot, dominantCiv);
      // Only crusade if already hostile or at war
      const domAttitude = getAttitude(gameState, civSlot, dominantCiv);
      if (domAttitude < 0 || domTreaty === 'war') {
        // Look for other weak civs to ally with
        for (let ally = 1; ally < 8; ally++) {
          if (ally === civSlot || ally === dominantCiv) continue;
          if (!(gameState.civsAlive & (1 << ally))) continue;
          if (!haveContact(gameState, civSlot, ally)) continue;
          const allyTreaty = getTreaty(gameState, civSlot, ally);
          if (allyTreaty === 'war' || allyTreaty === 'alliance') continue;

          // Only approach civs who are also threatened by dominant
          const allyPower = calcMilitaryStrength(gameState, ally) + countCities(gameState, ally) * 20;
          if (dominantStr <= allyPower * 1.5) continue; // not threatened enough

          const hasPending = gameState.treatyProposals?.some(
            p => p.from === civSlot && p.to === ally && !p.resolved
          );
          if (hasPending) continue;

          // Propose alliance (crusade)
          const action = { type: 'PROPOSE_TREATY', targetCiv: ally, treaty: 'alliance' };
          const err = validateAction(gameState, mapBase, action, civSlot);
          if (!err) {
            actions.push(action);
            actions.push(makeAttitudeAction(civSlot, ally, +10));
            if (debugLog) {
              const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
              const allyName = gameState.civs?.[ally]?.name || `Civ ${ally}`;
              const domName = gameState.civs?.[dominantCiv]?.name || `Civ ${dominantCiv}`;
              debugLog.push(`DIPLO: ${civName} proposes crusade alliance with ${allyName} against dominant ${domName}`);
            }
            break; // one crusade proposal per turn
          }
        }
      }
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// O.4: Full ai_diplomacy_turn_processing
//
// Per-turn AI diplomacy orchestrator. Port of main loop in
// FUN_0055d8d8 + FUN_0045705e:
//   - Government management during anarchy (choose best government)
//   - AI random seed roll per turn for stochastic decisions
//   - Patience decrement (every 3rd turn)
//   - Alliance violation detection and war declaration
//   - 32-turn / 16-turn / 8-turn periodic flag clearing
//   - Ceasefire expiration checks
// ═══════════════════════════════════════════════════════════════════

/**
 * Per-turn diplomacy housekeeping actions.
 *
 * Called once at the start of diplomacy processing each turn.
 * Handles periodic state updates that the original binary does
 * in the main diplomacy loop body.
 *
 * @param {number} civSlot
 * @param {object} gameState
 * @param {object} mapBase
 * @param {Array<string>|null} debugLog
 * @returns {Array<object>} actions
 */
function diplomacyTurnProcessing(civSlot, gameState, mapBase, debugLog) {
  const actions = [];
  const civ = gameState.civs?.[civSlot];
  if (!civ) return actions;

  const turnNumber = gameState.turn?.number ?? 0;

  // ── O.4: Government management during anarchy ──
  // If in anarchy with no pending government, pick the best one.
  // Port of FUN_0055f5a3 reactive path (param_2=1):
  //   During anarchy, the AI must choose a government to emerge into.
  if (civ.government === 'anarchy' && !civ.pendingGovernment) {
    const bestGovt = chooseBestGovernment(civSlot, gameState);
    if (bestGovt) {
      const action = { type: 'REVOLUTION', government: bestGovt };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) {
        actions.push(action);
        if (debugLog) {
          const civName = civ.name || `Civ ${civSlot}`;
          debugLog.push(`DIPLO: ${civName} chooses ${bestGovt} during anarchy`);
        }
      }
    }
  }

  // (#150) Patience decrement: per-civ scalar every 3 turns.
  // Binary: DAT_006554f8[civ] -= 1 every 3 turns, but the amount
  // varies per-civ based on leader personality militarism.
  // Aggressive leaders lose patience faster (2 per 3 turns),
  // peaceful leaders lose it slower (1 per 6 turns).
  if (turnNumber > 0 && turnNumber % 3 === 0) {
    const pers = getPersonality(gameState, civSlot);
    const patienceDecrement = pers.militarism > 0 ? 2 : (pers.militarism < 0 ? 0.5 : 1);
    // Apply per-civ patience decrement via attitude adjustments toward war enemies
    for (let i = 1; i < 8; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;
      if (getTreaty(gameState, civSlot, i) === 'war' && haveContact(gameState, civSlot, i)) {
        actions.push(makeAttitudeAction(civSlot, i, -Math.ceil(patienceDecrement)));
      }
    }
  }

  // (#151) Clear transient treaty flags (bits 14, 17, 23, 10, 0x800, 0x80000) on schedule.
  // Binary: certain treaty flags are transient and get cleared periodically.
  // We clear them every 4 turns to match the binary's cleanup cycle.
  if (turnNumber > 0 && turnNumber % 4 === 0) {
    const TRANSIENT_FLAGS = [
      0x4000,   // bit 14
      0x20000,  // bit 17
      0x800000, // bit 23
      0x400,    // bit 10
      0x800,    // 0x800
      0x80000,  // 0x80000
    ];
    for (let i = 1; i < 8; i++) {
      if (i === civSlot) continue;
      if (!haveContact(gameState, civSlot, i)) continue;
      for (const flag of TRANSIENT_FLAGS) {
        try { clearTreatyFlag(gameState, civSlot, i, flag); } catch (_e) { /* flag may not exist */ }
      }
    }
  }

  // (#152) Fire WARENDS event when visibility conditions met.
  // Binary: when two civs at war can no longer see each other's units,
  // the WARENDS event fires allowing diplomatic overtures.
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;
    if (getTreaty(gameState, civSlot, i) !== 'war') continue;
    if (!haveContact(gameState, civSlot, i)) continue;

    // Check if we can see any of their units (simplified visibility check)
    let canSeeEnemy = false;
    for (const u of gameState.units) {
      if (u.gx < 0 || u.owner !== i) continue;
      const tIdx = u.gy * mapBase.mw + ((u.gx % mapBase.mw + mapBase.mw) % mapBase.mw);
      const tile = mapBase.tileData?.[tIdx];
      if (tile && (tile.visibility & (1 << civSlot))) {
        canSeeEnemy = true;
        break;
      }
    }
    if (!canSeeEnemy) {
      // No visible enemy units — fire WARENDS event
      try {
        fireDiplomacyEvent(gameState, DIPLO_EVENTS.WARENDS ?? 'WARENDS', civSlot, i, {
          reason: 'no_visible_enemy',
        });
      } catch (_e) { /* WARENDS event type may not exist yet */ }
    }
  }

  // (#153) Randomly toggle senate override flag (1/3 chance per turn).
  // Binary: in republic/democracy, the senate can override war declarations.
  // The AI toggles this flag with ~33% probability each turn.
  if (civ.government === 'republic' || civ.government === 'democracy') {
    const roll = gameState.rng ? gameState.rng.nextInt(3) : Math.floor(Math.random() * 3);
    if (roll === 0) {
      // Toggle senate override — allows one war declaration this turn
      // We track this via a transient flag on the civ
      civ._senateOverride = !civ._senateOverride;
    }
  }

  // ── O.4: Alliance violation detection ──
  // Check if any ally is attacking civs we're at peace with.
  // If so, warn (attitude penalty) and potentially break alliance.
  for (let ally = 1; ally < 8; ally++) {
    if (ally === civSlot) continue;
    if (!(gameState.civsAlive & (1 << ally))) continue;
    if (getTreaty(gameState, civSlot, ally) !== 'alliance') continue;

    for (let third = 1; third < 8; third++) {
      if (third === civSlot || third === ally) continue;
      if (!(gameState.civsAlive & (1 << third))) continue;

      const allyThirdTreaty = getTreaty(gameState, ally, third);
      const ourThirdTreaty = getTreaty(gameState, civSlot, third);

      // Ally is at war with someone we have peace/alliance with
      if (allyThirdTreaty === 'war' && haveContact(gameState, ally, third) &&
          (ourThirdTreaty === 'peace' || ourThirdTreaty === 'alliance')) {
        // Small attitude penalty toward violating ally
        actions.push(makeAttitudeAction(civSlot, ally, -3));
      }
    }
  }

  // ── O.4: 32-turn periodic attitude drift toward neutral ──
  // Port of FUN_0055d8d8 ~5507-5509: every 32 turns, attitudes
  // drift 1 point toward 0 (forgiveness / forgetting)
  if (turnNumber > 0 && turnNumber % 32 === 0) {
    for (let i = 1; i < 8; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;
      const att = getAttitude(gameState, civSlot, i);
      if (att > 0) {
        actions.push(makeAttitudeAction(civSlot, i, -1));
      } else if (att < 0) {
        actions.push(makeAttitudeAction(civSlot, i, +1));
      }
    }
  }

  // ── O.4: 16-turn periodic re-evaluation of peace treaties ──
  // Every 16 turns, consider upgrading ceasefire to peace
  if (turnNumber > 0 && turnNumber % 16 === 0) {
    for (let i = 1; i < 8; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;
      if (getTreaty(gameState, civSlot, i) !== 'ceasefire') continue;

      const attitude = getAttitude(gameState, civSlot, i);
      if (attitude > 25) {
        // Skip if our reputation is too low (target won't trust us)
        if (isReputationTooLow(gameState, civSlot)) continue;
        const hasPending = gameState.treatyProposals?.some(
          p => (p.from === civSlot && p.to === i || p.from === i && p.to === civSlot) && !p.resolved
        );
        if (!hasPending) {
          const action = { type: 'PROPOSE_TREATY', targetCiv: i, treaty: 'peace' };
          const err = validateAction(gameState, mapBase, action, civSlot);
          if (!err) {
            actions.push(action);
            if (debugLog) {
              const civName = civ.name || `Civ ${civSlot}`;
              const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
              debugLog.push(`DIPLO: ${civName} proposes upgrading ceasefire to peace with ${targetName}`);
            }
          }
        }
      }
    }
  }

  // ── O.4: 8-turn periodic ceasefire expiration warning ──
  // After 8 turns of ceasefire with negative attitude, consider war
  if (turnNumber > 0 && turnNumber % 8 === 0) {
    const personality = getPersonality(gameState, civSlot);
    for (let i = 1; i < 8; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;
      if (getTreaty(gameState, civSlot, i) !== 'ceasefire') continue;

      const attitude = getAttitude(gameState, civSlot, i);
      // Hostile attitude + aggressive personality → ceasefire may expire into war
      if (attitude < -25 && personality.militarism > 0) {
        actions.push(makeAttitudeAction(civSlot, i, -5));
      }
    }
  }

  return actions;
}

/**
 * Choose the best government for an AI civ during anarchy.
 * Simplified version of FUN_0055f5a3 reactive path.
 * Returns a government name string or null.
 */
function chooseBestGovernment(civSlot, gameState) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return null;

  const civTechs = gameState.civTechs?.[civSlot];
  if (!civTechs) return 'despotism';

  // Score each government
  const govts = ['despotism', 'monarchy', 'communism', 'fundamentalism', 'republic', 'democracy'];
  let bestGovt = 'despotism';
  let bestScore = 0;

  const cityCount = countCities(gameState, civSlot);
  const warCount = countWars(gameState, civSlot);
  const personality = getPersonality(gameState, civSlot);

  for (const govt of govts) {
    // Check tech prereq — Statue of Liberty (wonder 19) grants all governments
    const prereq = GOVT_TECH_PREREQS[govt];
    if (prereq >= 0 && !civTechs.has(prereq) && !hasWonderEffect(gameState, civSlot, 19)) continue;

    const gIdx = GOVT_INDEX[govt] ?? 0;
    let score = gIdx; // higher government = generally better

    switch (govt) {
      case 'despotism':
        score = 1;
        break;
      case 'monarchy':
        score = 5 + cityCount;
        if (warCount > 0) score += 3;
        break;
      case 'communism':
        score = 8 + cityCount;
        if (warCount > 0) score += 5;
        if (personality.militarism > 0) score += 3;
        break;
      case 'fundamentalism':
        score = 6;
        if (personality.militarism > 0) score += 8;
        if (warCount > 0) score += 4;
        break;
      case 'republic':
        score = 10 + cityCount * 2;
        if (warCount > 1) score -= 5;
        if (personality.militarism < 0) score += 3;
        break;
      case 'democracy':
        score = 14 + cityCount * 2;
        if (warCount > 0) score -= 8;
        if (personality.militarism > 0) score -= 5;
        if (personality.militarism < 0) score += 5;
        break;
    }

    if (score > bestScore) {
      bestScore = score;
      bestGovt = govt;
    }
  }

  return bestGovt;
}

// ═══════════════════════════════════════════════════════════════════
// O.5: Full ai_evaluate_diplomacy_toward_human
//
// Multi-factor attitude evaluation. Port of FUN_0045705e full
// attitude computation loop (~3540-3679):
//   - Border intrusion detection
//   - Unit withdrawal mechanics
//   - Senate scandal for espionage
//   - Spaceship status checks (racing → hostile)
//   - Alliance strength calculation
//   - Wonder effects on attitude
//   - Personality modifiers (militarism, expansionism)
// ═══════════════════════════════════════════════════════════════════

/**
 * Compute multi-factor attitude adjustments toward all civs.
 *
 * Called once per turn. Evaluates each contacted civ and generates
 * ADJUST_ATTITUDE actions that shift the relationship based on
 * current game conditions.
 *
 * @param {number} civSlot - evaluating AI civ
 * @param {object} gameState
 * @param {object} mapBase
 * @param {object} continentData
 * @param {Array<string>|null} debugLog
 * @returns {Array<object>} attitude adjustment actions
 */
function evaluateDiplomacyTowardAll(civSlot, gameState, mapBase, continentData, debugLog) {
  const actions = [];
  const personality = getPersonality(gameState, civSlot);
  const ourStr = calcMilitaryStrength(gameState, civSlot);
  const ourCities = countCities(gameState, civSlot);

  // O.5: Border intrusion detection
  const { intruders, intruderCivs } = detectBorderIntrusions(gameState, mapBase, civSlot);
  for (const intruderCiv of intruderCivs) {
    // Each intrusion worsens attitude by -5 (cumulative)
    actions.push(makeAttitudeAction(civSlot, intruderCiv, -5));
    if (debugLog) {
      const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
      const intName = gameState.civs?.[intruderCiv]?.name || `Civ ${intruderCiv}`;
      debugLog.push(`DIPLO: ${civName} detects border intrusion by ${intName}`);
    }
  }

  // O.5b: Border score integration — additional per-civ border pressure
  for (const intruderCiv of intruderCivs) {
    const { borderScore, intruderCount } = calcBorderScore(gameState, mapBase, civSlot, intruderCiv);
    if (borderScore > 0) {
      // Scale attitude penalty by border score (1 per 3 border score points)
      const scorePenalty = Math.min(10, Math.floor(borderScore / 3));
      actions.push(makeAttitudeAction(civSlot, intruderCiv, -scorePenalty));
      if (debugLog && scorePenalty > 0) {
        const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
        const intName = gameState.civs?.[intruderCiv]?.name || `Civ ${intruderCiv}`;
        debugLog.push(`DIPLO: ${civName} border score ${borderScore} against ${intName} (penalty -${scorePenalty})`);
      }
    }
  }

  // O.5c: Intrusion escalation processing (timing-gated)
  const intrusionActions = processIntrusionEscalation(gameState, mapBase, civSlot);
  actions.push(...intrusionActions);

  for (let other = 1; other < 8; other++) {
    if (other === civSlot) continue;
    if (!(gameState.civsAlive & (1 << other))) continue;
    if (!haveContact(gameState, civSlot, other)) continue;

    let attDelta = 0;
    const treaty = getTreaty(gameState, civSlot, other);
    const attitude = getAttitude(gameState, civSlot, other);

    // D.4: Binary 15-phase attitude recalibration (every 4 turns)
    const turnNum = gameState.turn?.number || 0;
    if ((turnNum & 3) === 0) {
      const binaryScore = calcAttitudeScore(gameState, civSlot, other);
      // Map binary score (-10..+10 range) to attitude scale (0-100)
      const targetAttitude = Math.max(0, Math.min(100, 50 + binaryScore * 5));
      // Nudge current attitude toward binary target (smooth convergence)
      const diff = targetAttitude - attitude;
      if (Math.abs(diff) > 5) {
        attDelta += Math.sign(diff) * Math.min(Math.abs(diff), 10);
      }
    }

    // ── O.5: Personality modifiers ──
    // Militarist leaders distrust everyone slightly
    if (personality.militarism > 0) attDelta -= 1;
    // Expansionist leaders dislike civs with more cities
    const theirCities = countCities(gameState, other);
    if (personality.expansionism > 0 && theirCities > ourCities) {
      attDelta -= 2;
    }
    // Peaceful leaders slowly warm to non-enemies
    if (personality.militarism < 0 && treaty !== 'war') {
      attDelta += 1;
    }

    // ── O.5: Military threat assessment ──
    const theirStr = calcMilitaryStrength(gameState, other);
    if (theirStr > ourStr * 2 && treaty !== 'alliance') {
      // Much stronger civ → fear-based hostility
      attDelta -= 3;
    } else if (ourStr > theirStr * 3 && treaty !== 'war') {
      // We're much stronger → mild contempt
      attDelta -= 1;
    }

    // ── O.5: Alliance strength bonus ──
    if (treaty === 'alliance') {
      // Allies get +3 per turn (up to cap)
      if (attitude < 80) attDelta += 3;
    }

    // ── O.5: Peace treaty warmth ──
    if (treaty === 'peace') {
      if (attitude < 50) attDelta += 1;
    }

    // ── O.5: Wonder effects on attitude ──
    // Eiffel Tower (wonder 20): other civs view us more favorably
    if (hasWonderEffect(gameState, civSlot, 20)) {
      attDelta += 2;
    }
    // Women's Suffrage (wonder 21): stability bonus, others respect
    if (hasWonderEffect(gameState, civSlot, 21)) {
      attDelta += 1;
    }

    // ── O.5: Spaceship race detection ──
    // If other civ is building spaceship parts, become hostile
    if (gameState.spaceships?.[other]) {
      const ss = gameState.spaceships[other];
      if ((ss.structural || 0) > 0 || (ss.fuel || 0) > 0 || (ss.propulsion || 0) > 0
          || (ss.habitation || 0) > 0 || (ss.lifeSupport || 0) > 0 || (ss.solarPanel || 0) > 0) {
        // They're building a spaceship — racing → hostile
        attDelta -= 5;
        if (debugLog && attitude > -20) {
          const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
          const otherName = gameState.civs?.[other]?.name || `Civ ${other}`;
          debugLog.push(`DIPLO: ${civName} grows hostile toward ${otherName} (spaceship race)`);
        }
      }
    }
    // Also check raw spaceship structural count (from parser data)
    const otherCiv = gameState.civs?.[other];
    if (otherCiv?.spaceshipStructural > 0) {
      attDelta -= 3;
    }

    // ── O.5: Espionage scandal ──
    // If other civ was caught spying on us (provocation flag),
    // major attitude penalty
    const dKey = civSlot < other ? `${civSlot}-${other}` : `${other}-${civSlot}`;
    const diplo = gameState.diplomacy?.[dKey];
    if (diplo?.sneak) {
      attDelta -= 8;
    }

    // ── O.5: Shared enemy bonus ──
    // If we and other are both at war with the same civ, attitude improves
    for (let third = 1; third < 8; third++) {
      if (third === civSlot || third === other) continue;
      if (!(gameState.civsAlive & (1 << third))) continue;
      const ourWar = getTreaty(gameState, civSlot, third) === 'war' && haveContact(gameState, civSlot, third);
      const theirWar = getTreaty(gameState, other, third) === 'war' && haveContact(gameState, other, third);
      if (ourWar && theirWar) {
        attDelta += 2;
        break; // only count once
      }
    }

    // Clamp total per-turn delta to avoid extreme swings
    attDelta = Math.max(-15, Math.min(15, attDelta));

    if (attDelta !== 0) {
      actions.push(makeAttitudeAction(civSlot, other, attDelta));
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// AI_WAR_DECISION — Exported shouldDeclareWar with full formula
//
// Port of FUN_0055cbd5 with attacked-flag fast-path, third-party
// deterrent, power ranking, ally scoring, and final formula.
// ═══════════════════════════════════════════════════════════════════

/**
 * Determine whether an AI civ should declare war on a target.
 * Exported entry point with full formula from decompiled binary.
 *
 * @param {object} state - game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ considering war
 * @param {number} targetCiv - potential target civ
 * @returns {boolean} true if war should be declared
 */
export function shouldDeclareWarFull(state, mapBase, aiCiv, targetCiv) {
  // Fast-path: if target attacked us (WAR_STARTED flag toward us), return true
  const flagsTowardUs = getTreatyFlags(state, targetCiv, aiCiv);
  if (flagsTowardUs & TF.WAR_STARTED) return true;

  const treaty = getTreaty(state, aiCiv, targetCiv);
  if (treaty === 'war') return false; // already at war
  if (treaty === 'alliance') return false; // won't break alliance here

  // Third-party deterrent: scan all alive civs allied with target;
  // if any have stronger military than us, return false
  const ourStr = calcMilitaryStrength(state, aiCiv);
  for (let k = 1; k < 8; k++) {
    if (k === aiCiv || k === targetCiv) continue;
    if (!(state.civsAlive & (1 << k))) continue;
    if (getTreaty(state, targetCiv, k) !== 'alliance') continue;
    const allyStr = calcMilitaryStrength(state, k);
    if (allyStr > ourStr) return false;
  }

  // Power ranking comparison: if target's power rank > ours + 2, return false
  const ourRank = state.civs?.[aiCiv]?.powerRank ?? 3;
  const theirRank = state.civs?.[targetCiv]?.powerRank ?? 3;
  if (theirRank > ourRank + 2) return false;

  // Ally scoring: count our allies, each adds +1; shared enemy adds +2
  let allyScore = 0;
  for (let k = 1; k < 8; k++) {
    if (k === aiCiv || k === targetCiv) continue;
    if (!(state.civsAlive & (1 << k))) continue;
    if (getTreaty(state, aiCiv, k) === 'alliance') {
      allyScore += 1;
      // Shared enemy bonus: if our ally is also at war with target
      if (getTreaty(state, k, targetCiv) === 'war' && haveContact(state, k, targetCiv)) {
        allyScore += 2;
      }
    }
  }

  // Continent strength: approximate from unit counts near shared cities
  const continentData = computeContinentData(state, mapBase);
  let ourStrength = 0;
  let theirStrength = 0;
  let theirDefense = 0;

  for (const [, cl] of continentData) {
    const ourCities = cl.civCities.get(aiCiv);
    const theirCities = cl.civCities.get(targetCiv);
    if (!ourCities || !theirCities) continue;
    ourStrength += cl.civMilitary.get(aiCiv) || 0;
    theirStrength += cl.civMilitary.get(targetCiv) || 0;
    // Approximate defense from city count (each city adds fortification value)
    theirDefense += (theirCities.length || 0) * 2;
  }

  // If no shared continents, fall back to global strength
  if (ourStrength === 0 && theirStrength === 0) {
    ourStrength = ourStr;
    theirStrength = calcMilitaryStrength(state, targetCiv);
  }

  // Leader patience
  const patience = state.civs?.[aiCiv]?.patience ?? 2;

  // Final formula: (ourStrength << 2) / (theirStrength + theirDefense) < (allyScore - patience + 4)
  // If the left side is LESS than the right side, we are strong enough to declare war.
  // (Higher allyScore or lower patience makes the threshold easier to meet.)
  const denominator = Math.max(theirStrength + theirDefense, 1);
  const lhs = (ourStrength << 2) / denominator;
  const rhs = allyScore - patience + 4;

  // The formula says: declare war when lhs >= rhs (we have sufficient strength ratio)
  // The original binary: if (lhs < rhs) return false — meaning we need lhs >= rhs
  return lhs >= rhs;
}

// ═══════════════════════════════════════════════════════════════════
// AI_VS_AI_DIPLOMACY — processAiVsAiDiplomacy
//
// Port of FUN_0055d1e2: AI-to-AI treaty progression/regression.
// Runs every 4 turns per pair. Escalates through ceasefire → peace
// → alliance based on attitude, or declares war on low attitude.
// ═══════════════════════════════════════════════════════════════════

/**
 * Process AI-vs-AI diplomacy for a pair of AI civs.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - first AI civ
 * @param {number} otherAiCiv - second AI civ
 * @returns {Array<object>} events generated
 */
function processAiVsAiDiplomacy(state, mapBase, aiCiv, otherAiCiv) {
  const events = [];
  const turnNumber = state.turn?.number ?? 0;

  // Trigger: every 4 turns per pair
  if ((turnNumber + aiCiv + otherAiCiv) & 3) return events;

  const attitude = getAttitude(state, aiCiv, otherAiCiv);
  const treaty = getTreaty(state, aiCiv, otherAiCiv);

  // First contact: if no contact, establish ceasefire
  if (!haveContact(state, aiCiv, otherAiCiv)) {
    const result = signCeasefire(state, aiCiv, otherAiCiv);
    events.push(...result.events);
    // Set initial contact flags
    addTreatyFlag(state, aiCiv, otherAiCiv, TF.CONTACT);
    return events;
  }

  if (treaty === 'war') {
    // If at war and attitude > 40: attempt ceasefire
    if (attitude > 40) {
      const result = signCeasefire(state, aiCiv, otherAiCiv);
      events.push(...result.events);
    }
  } else if (treaty === 'ceasefire') {
    // If ceasefire and attitude > 60: attempt peace
    if (attitude > 60) {
      const result = signPeaceTreaty(state, aiCiv, otherAiCiv);
      events.push(...result.events);
    }
  } else if (treaty === 'peace') {
    if (attitude > 80) {
      // If peace and attitude > 80: attempt alliance
      const result = formAlliance(state, mapBase, aiCiv, otherAiCiv);
      events.push(...result.events);
    } else if (attitude < 20) {
      // If peace and attitude < 20: spontaneous war check
      if (shouldDeclareWarFull(state, mapBase, aiCiv, otherAiCiv)) {
        const result = diplomacyDeclareWar(state, mapBase, aiCiv, otherAiCiv);
        events.push(...result.events);
      }
    }
  }
  // Alliance: no further escalation needed (already at max treaty level)

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// JOIN_WAR — processJoinWar
//
// Port of FUN_0055d685: third-party "join war" requests.
// An ally asks the AI to join a war against a shared enemy.
// ═══════════════════════════════════════════════════════════════════

/**
 * Process a request for an AI civ to join a war alongside an ally.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ being asked to join
 * @param {number} allyCiv - civ requesting help
 * @param {number} enemyCiv - civ to declare war on
 * @returns {Array<object>} events generated
 */
export function processJoinWar(state, mapBase, aiCiv, allyCiv, enemyCiv) {
  const events = [];

  // Binary FUN_0055d685: outer check — already at war/pending with ally?
  const flagsToAlly = getTreatyFlags(state, allyCiv, aiCiv);
  if (flagsToAlly & (TF.WAR | TF.ALLIANCE)) return events; // already committed

  // Binary Branch 1: check if enemy has pending join flag (0x20)
  const flagsFromEnemy = getTreatyFlags(state, enemyCiv, aiCiv);
  const hasPendingJoin = !!(flagsFromEnemy & 0x20);

  if (!hasPendingJoin) {
    // Binary Branch 1a: if BOTH relationships have peace flag (0x10),
    // set pending join flag (0x20) on both.
    const peaceWithAlly = !!(getTreatyFlags(state, allyCiv, aiCiv) & 0x10);
    const peaceWithEnemy = !!(getTreatyFlags(state, enemyCiv, aiCiv) & 0x10);
    if (peaceWithAlly && peaceWithEnemy) {
      // Set pending join flag on both relationships
      addTreatyFlag(state, allyCiv, aiCiv, 0x20);
      addTreatyFlag(state, enemyCiv, aiCiv, 0x20);
    }
    return events; // no war triggered yet — pending only
  }

  // Binary Branch 2: pending join flag exists — may trigger war
  // Human player gate: 6-turn contact check + difficulty random rejection
  const isHuman = !!((state.humanPlayers || 0) & (1 << aiCiv));
  if (isHuman) {
    const peaceWithAlly = !!(getTreatyFlags(state, allyCiv, aiCiv) & 0x10);
    if (!peaceWithAlly) {
      // Time gate: less than 6 turns of contact → reject
      const contactTurn = state.treatyTurns?.[`${Math.min(aiCiv, allyCiv)}-${Math.max(aiCiv, allyCiv)}`] ?? 0;
      const turnNum = state.turn?.number || 0;
      if (turnNum - contactTurn < 6) return events;

      // Difficulty-based rejection: AI level < 7 → 2/3 chance reject
      const rank = state.civs?.[aiCiv]?.powerRank ?? 3;
      if (rank < 7) {
        const rng = state.rng;
        if (rng ? (rng.nextInt(3) !== 0) : (Math.random() > 0.34)) return events;
      }
    }
  }

  // Trigger war: declare war on enemy
  const warResult = diplomacyDeclareWar(state, mapBase, aiCiv, enemyCiv, allyCiv);
  events.push(...warResult.events);

  fireDiplomacyEvent(state, DIPLO_EVENTS.HELPME, allyCiv, aiCiv, {
    reason: 'join_war',
    enemy: enemyCiv,
  });

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// PEACE_ACCEPTANCE — evaluatePeaceProposal
//
// Evaluate whether an AI civ should accept a peace proposal.
// ═══════════════════════════════════════════════════════════════════

/**
 * Evaluate a peace proposal from proposerCiv.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ considering the proposal
 * @param {number} proposerCiv - civ proposing peace
 * @returns {{ accept: boolean, reason: string }}
 */
export function evaluatePeaceProposal(state, aiCiv, proposerCiv) {
  const attitude = getAttitude(state, aiCiv, proposerCiv);
  const flags = getTreatyFlags(state, aiCiv, proposerCiv);

  // Vendetta override: if vendetta flag set, reject
  if (flags & TF.VENDETTA) {
    return { accept: false, reason: 'vendetta' };
  }

  // Hard reject: if attitude > 75, reject (we're strong, no need for peace)
  if (attitude > 75) {
    return { accept: false, reason: 'too_strong' };
  }

  // Wonder override: if proposer has Great Wall or UN, accept
  if (civHasWonder(state, proposerCiv, 6) || civHasWonder(state, proposerCiv, 24)) {
    return { accept: true, reason: 'wonder_protection' };
  }

  // Gold sweetener: if proposer offers gold, attitude boost before check
  // (In the actual negotiation, gold would be part of the offer; here we
  // approximate by checking if proposer has substantial treasury)
  let effectiveAttitude = attitude;
  const proposerTreasury = state.civs?.[proposerCiv]?.treasury ?? 0;
  if (proposerTreasury > 200) {
    effectiveAttitude -= 5; // gold makes acceptance more likely (lower attitude = more receptive)
  }

  // Primary accept: shouldDeclareWar returns false AND attitude < 51
  const wouldDeclareWar = shouldDeclareWarFull(state, null, aiCiv, proposerCiv);
  if (!wouldDeclareWar && effectiveAttitude < 51) {
    return { accept: true, reason: 'military_balance' };
  }

  return { accept: false, reason: 'unfavorable_terms' };
}

// ═══════════════════════════════════════════════════════════════════
// CEASEFIRE_ACCEPTANCE — evaluateCeasefireProposal
//
// Evaluate whether an AI civ should accept a ceasefire proposal.
// ═══════════════════════════════════════════════════════════════════

/**
 * Evaluate a ceasefire proposal from proposerCiv.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ considering the proposal
 * @param {number} proposerCiv - civ proposing ceasefire
 * @returns {{ accept: boolean }}
 */
export function evaluateCeasefireProposal(state, aiCiv, proposerCiv) {
  const attitude = getAttitude(state, aiCiv, proposerCiv);
  const flags = getTreatyFlags(state, aiCiv, proposerCiv);
  const hasVendetta = !!(flags & TF.VENDETTA);

  // Random gate: rand() % 3 !== 0 (2/3 chance to even consider)
  // Vendetta override: skip random gate if vendetta
  if (!hasVendetta) {
    const turnNumber = state.turn?.number ?? 0;
    const roll = ((turnNumber * 19 + aiCiv * 11 + proposerCiv * 5) % 3);
    if (roll === 0) {
      return { accept: false };
    }
  }

  // Attitude threshold: accept if attitude > 30
  if (attitude > 30) {
    return { accept: true };
  }

  return { accept: false };
}

// ═══════════════════════════════════════════════════════════════════
// NEGOTIATE_MENU_CHOICES — evaluateNegotiationChoice
//
// Evaluate a specific negotiation proposal type from a target civ.
// Delegates to specialized evaluators for each proposal type.
// ═══════════════════════════════════════════════════════════════════

/**
 * Evaluate a negotiation choice for the AI.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ evaluating the proposal
 * @param {number} targetCiv - civ making the proposal
 * @param {string} proposalType - 'alliance' | 'peace' | 'ceasefire' | 'surrender'
 * @returns {{ accept: boolean, counterOffer: string|null }}
 */
export function evaluateNegotiationChoice(state, aiCiv, targetCiv, proposalType) {
  switch (proposalType) {
    case 'alliance': {
      const attitude = getAttitude(state, aiCiv, targetCiv);
      if (attitude <= 70) {
        return { accept: false, counterOffer: 'peace' };
      }
      // Check we're not at war with target's allies
      for (let k = 1; k < 8; k++) {
        if (k === aiCiv || k === targetCiv) continue;
        if (!(state.civsAlive & (1 << k))) continue;
        if (getTreaty(state, targetCiv, k) === 'alliance' &&
            getTreaty(state, aiCiv, k) === 'war' &&
            haveContact(state, aiCiv, k)) {
          return { accept: false, counterOffer: 'peace' };
        }
      }
      return { accept: true, counterOffer: null };
    }

    case 'peace': {
      const result = evaluatePeaceProposal(state, aiCiv, targetCiv);
      return { accept: result.accept, counterOffer: result.accept ? null : 'ceasefire' };
    }

    case 'ceasefire': {
      const result = evaluateCeasefireProposal(state, aiCiv, targetCiv);
      return { accept: result.accept, counterOffer: null };
    }

    case 'surrender': {
      // Accept if military power < target x 3
      const ourStr = calcMilitaryStrength(state, aiCiv);
      const theirStr = calcMilitaryStrength(state, targetCiv);
      const accept = ourStr < theirStr * 3;
      return { accept, counterOffer: accept ? null : 'peace' };
    }

    default:
      return { accept: false, counterOffer: null };
  }
}

// ═══════════════════════════════════════════════════════════════════
// Item 5: PROVOCATION_CONDITIONS — immediate war on flag detection
//
// If INTRUDER_FLAG (0x20) or HOSTILITY_FLAG (0x40) is set toward a
// civ, declare war immediately (skip patience/attitude checks).
// ═══════════════════════════════════════════════════════════════════

/**
 * Check provocation flags and generate immediate war declarations.
 * Wired into generateDiplomacyActions before normal war evaluation.
 *
 * @param {object} gameState - game state
 * @param {object} mapBase - map data with accessors
 * @param {number} civSlot - AI civ checking for provocations
 * @returns {Array<object>} actions generated
 */
function checkProvocationConditions(gameState, mapBase, civSlot) {
  const actions = [];
  if (!gameState.civs) return actions;

  for (let other = 1; other < 8; other++) {
    if (other === civSlot) continue;
    if (!(gameState.civsAlive & (1 << other))) continue;
    if (!haveContact(gameState, civSlot, other)) continue;

    const treaty = getTreaty(gameState, civSlot, other);
    if (treaty === 'war') continue; // already at war

    const flags = getTreatyFlags(gameState, civSlot, other);

    // If INTRUDER (0x20) or HOSTILITY (0x40) flag is set: declare war immediately
    if (flags & (TF.INTRUDER | TF.HOSTILITY)) {
      const action = { type: 'DECLARE_WAR', targetCiv: other };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) {
        actions.push(action);
        actions.push(makeAttitudeAction(civSlot, other, -30));
        // Clear the flags after acting on them
        if (flags & TF.INTRUDER) clearTreatyFlag(gameState, civSlot, other, TF.INTRUDER);
        if (flags & TF.HOSTILITY) clearTreatyFlag(gameState, civSlot, other, TF.HOSTILITY);
        break; // only one provocation war per turn
      }
    }
  }

  return actions;
}

// ═══════════════════════════════════════════════════════════════════
// Item 6: SPONTANEOUS_WAR — break peace when conditions are met
//
// If peace treaty exists, not allied, military power > 5,
// and attitude < 26: break peace and declare war.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if conditions are met for a spontaneous war declaration.
 *
 * Uses patience threshold (Gap 47) and betrayal threshold (Gap 50)
 * from the binary to gate treaty breaks:
 *   - Patience counter must exceed calcPatienceThreshold
 *   - shouldBetrayTreaty (FUN_0055bef9) must return true
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ considering war
 * @param {number} targetCiv - potential target
 * @returns {object|null} war declaration action or null
 */
export function checkSpontaneousWar(state, aiCiv, targetCiv) {
  const treaty = getTreaty(state, aiCiv, targetCiv);

  // Must have peace or ceasefire treaty (not alliance, not war, not uncontacted)
  if (treaty !== 'peace' && treaty !== 'ceasefire') return null;

  // Military power must be > 5
  const aiMilPower = state.civs?.[aiCiv]?.militaryPower ?? 0;
  if (aiMilPower <= 5) return null;

  // Attitude must be hostile (level < 4 on the 9-level scale, i.e. raw < ~39)
  const attitude = state.civs?.[aiCiv]?.attitudes?.[targetCiv] ?? 50;
  const attitudeLevel = getAttitudeLevel(attitude);
  if (!isHostile(attitudeLevel)) return null;

  // Gap 47: Patience threshold check — AI's patience counter must exceed
  // the calcPatienceThreshold for this pair. Binary FUN_00456f8b: the AI
  // compares its accumulated patience counter against the threshold, and
  // only breaks the treaty when patience has been exhausted.
  const patience = getPatience(state, aiCiv);
  const threshold = calcPatienceThreshold(state, aiCiv, targetCiv);
  if (patience < threshold) return null;

  // Gap 50: Betrayal threshold — FUN_0055bef9 checks government type,
  // vendetta flags, UN wonder, and target's patience counter to decide
  // if the AI is willing to break the treaty.
  if (!shouldBetrayTreaty(state, aiCiv, targetCiv)) return null;

  return { type: 'DECLARE_WAR', targetCiv };
}

// ═══════════════════════════════════════════════════════════════════
// Item 7: ALLIANCE_BREAK_THRESHOLD — break alliance under conditions
//
// Break if: attitude < 76, military power > ally's * 2, no shared war.
// Action: cancel alliance, set treaty to peace.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if conditions are met to break an alliance.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ considering alliance break
 * @param {number} allyCiv - allied civ
 * @returns {object|null} action to break alliance or null
 */
export function checkAllianceBreak(state, aiCiv, allyCiv) {
  const treaty = getTreaty(state, aiCiv, allyCiv);
  if (treaty !== 'alliance') return null;

  // Attitude must not be friendly (level > 4) to consider breaking alliance
  const attitude = state.civs?.[aiCiv]?.attitudes?.[allyCiv] ?? 50;
  const attitudeLevel = getAttitudeLevel(attitude);
  if (isFriendly(attitudeLevel)) return null;

  // Military power must be > ally's * 2
  const aiMilPower = state.civs?.[aiCiv]?.militaryPower ?? 0;
  const allyMilPower = state.civs?.[allyCiv]?.militaryPower ?? 0;
  if (aiMilPower <= allyMilPower * 2) return null;

  // Must not have a shared war (both fighting the same enemy)
  let hasSharedWar = false;
  for (let c = 1; c < 8; c++) {
    if (c === aiCiv || c === allyCiv) continue;
    if (!(state.civsAlive & (1 << c))) continue;
    const aiWar = getTreaty(state, aiCiv, c) === 'war' && haveContact(state, aiCiv, c);
    const allyWar = getTreaty(state, allyCiv, c) === 'war' && haveContact(state, allyCiv, c);
    if (aiWar && allyWar) {
      hasSharedWar = true;
      break;
    }
  }
  if (hasSharedWar) return null;

  // Action: cancel alliance, set treaty to peace
  return { type: 'BREAK_ALLIANCE', targetCiv: allyCiv, newTreaty: 'peace' };
}

// ═══════════════════════════════════════════════════════════════════
// Combined entry point
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate all diplomacy-related actions for an AI turn.
 *
 * Evaluation order follows FUN_0055d8d8's priority, enhanced with
 * Phase 6 Wave 6 (O.1-O.5) systems:
 *
 *   0. Per-turn housekeeping (O.4: patience, flags, anarchy govt)
 *   0b. Multi-factor attitude evaluation (O.5)
 *   0c. Provocation conditions (immediate war on flag detection)
 *   1. Respond to incoming proposals/demands (O.1: full negotiation)
 *   2. Check for war declarations (most impactful proactive move)
 *   2b. Spontaneous war checks
 *   2c. Tribute demands (opportunistic)
 *   2d. Alliance breaks (rare + threshold-based)
 *   3. Check for peace proposals (urgent if losing)
 *   4. Check for tribute demands (opportunistic)
 *   5. Check for alliance breaks (rare)
 *   6. AI tech exchange (O.2)
 *   7. Alliance/crusade proposals (O.3)
 *
 * Uses per-continent military analysis ported from FUN_0055cbd5's
 * strength comparison loops across shared continents.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7) being played
 * @returns {Array<object>}
 */

// ── #161: Scenario Hardcoded Overrides ───────────────────────────
// Binary ref: FUN_0055d8d8 — when scenario flag is active, certain
// civ pairs have forced diplomatic behavior (always at war).
// These override normal AI diplomacy evaluation.

/** Hardcoded scenario civ pair overrides: [aggressor, target] */
const SCENARIO_FORCED_WARS = [
  [3, 6],  // Civ 3 (Egyptians) always attacks civ 6 (Indians)
  [3, 1],  // Civ 3 (Egyptians) always attacks civ 1 (Babylonians)
  [6, 7],  // Civ 6 (Indians) always attacks civ 7 (Russians)
];

/**
 * Apply scenario hardcoded diplomatic overrides.
 * When the scenario flag is set, force specific civ pairs into war.
 *
 * @param {object} gameState - game state
 * @param {number} civSlot - AI civ processing diplomacy
 * @param {Array|null} debugLog - optional debug log
 * @returns {Array<object>} actions to apply
 */
function applyScenarioOverrides(gameState, civSlot, debugLog) {
  const actions = [];

  for (const [aggressor, target] of SCENARIO_FORCED_WARS) {
    if (civSlot !== aggressor) continue;
    if (!(gameState.civsAlive & (1 << target))) continue;
    if (!haveContact(gameState, civSlot, target)) continue;

    const treaty = getTreaty(gameState, civSlot, target);
    if (treaty === 'war') continue; // already at war

    // Force war declaration
    actions.push({ type: 'DECLARE_WAR', targetCiv: target });
    // Set attitude to maximum hostility
    actions.push(makeAttitudeAction(civSlot, target, -100));

    if (debugLog) {
      const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
      const targetName = gameState.civs?.[target]?.name || `Civ ${target}`;
      debugLog.push(`DIPLO: SCENARIO OVERRIDE — ${civName} forced to declare war on ${targetName}`);
    }
  }

  return actions;
}

export function generateDiplomacyActions(gameState, mapBase, civSlot, debugLog = null) {
  const actions = [];

  try {
    // ── #161: Scenario hardcoded overrides ──
    // Binary ref: FUN_0055d8d8 scenario override path — when the scenario
    // flag is set (DAT_00655af0 & 0x80), certain civ pairs have forced
    // diplomatic behavior that overrides normal AI evaluation:
    //   (3, 6): Civ 3 always declares war on civ 6 (forced enemies)
    //   (3, 1): Civ 3 always declares war on civ 1 (forced enemies)
    //   (6, 7): Civ 6 always declares war on civ 7 (forced enemies)
    // These represent hardcoded scenario rivalries (e.g., historical
    // enemies in WW2 scenarios: Egyptians vs Indians, Egyptians vs
    // Babylonians, Indians vs Russians).
    if (gameState.isScenario) {
      const scenarioOverrides = applyScenarioOverrides(gameState, civSlot, debugLog);
      if (scenarioOverrides.length > 0) {
        actions.push(...scenarioOverrides);
      }
    }

    // Compute continent-based military data once for all evaluations
    const continentData = computeContinentData(gameState, mapBase);

    // ── 0. O.4: Per-turn diplomacy housekeeping ──
    const housekeeping = diplomacyTurnProcessing(civSlot, gameState, mapBase, debugLog);
    actions.push(...housekeeping);

    // ── 0a. Alliance violation detection ──
    const violationActions = checkAllianceViolations(gameState, mapBase, civSlot);
    actions.push(...violationActions);

    // ── 0b. O.5: Multi-factor attitude evaluation ──
    const attitudeActions = evaluateDiplomacyTowardAll(civSlot, gameState, mapBase, continentData, debugLog);
    actions.push(...attitudeActions);

    // ── 0c. Item 5: PROVOCATION_CONDITIONS — immediate war on flag detection ──
    const provocationActions = checkProvocationConditions(gameState, mapBase, civSlot);
    actions.push(...provocationActions);

    // ── 1. Respond to incoming proposals/demands first ──
    const treatyResponses = respondToTreatyProposals(
      gameState, mapBase, civSlot, continentData);
    actions.push(...treatyResponses);

    const demandResponses = respondToTributeDemands(
      gameState, mapBase, civSlot, continentData);
    actions.push(...demandResponses);

    // ── 2. Proactive diplomacy: iterate all alive civs ──
    // Binary: 6-turn minimum cooldown between AI diplomatic contacts (DAT_0064ca82)
    const DIPLO_COOLDOWN_TURNS = 6;
    const civs = gameState.civs;
    if (!civs) return actions;
    const currentTurn = gameState.turn?.number || 0;

    let declaredWar = false;

    for (let i = 1; i < civs.length; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;

      // Enforce 6-turn cooldown (binary DAT_0064ca82[target][us])
      // War declarations bypass cooldown (urgent)
      const contactKey = `diplo_${Math.min(civSlot, i)}_${Math.max(civSlot, i)}`;
      const lastContact = gameState._diploContactTurns?.[contactKey] || 0;
      const onCooldown = (currentTurn - lastContact) < DIPLO_COOLDOWN_TURNS;

      // (#16) First contact: establish ceasefire with personality-based initial attitude
      if (!haveContact(gameState, civSlot, i)) {
        const firstContactAction = processFirstContact(civSlot, i, gameState);
        if (firstContactAction) {
          const err = validateAction(gameState, mapBase, firstContactAction, civSlot);
          if (!err) {
            actions.push(firstContactAction);
            // Set initial attitude based on leader personalities
            const ourPers = getPersonality(gameState, civSlot);
            const theirPers = getPersonality(gameState, i);
            let initialDelta = 0;
            if (ourPers.militarism < 0) initialDelta += 10;        // we're peaceful
            if (theirPers.militarism < 0) initialDelta += 5;       // they're peaceful
            if (ourPers.militarism > 0 && theirPers.militarism > 0) {
              initialDelta -= 10; // two aggressive civs start wary
            }
            if (initialDelta !== 0) {
              actions.push(makeAttitudeAction(civSlot, i, initialDelta));
            }
            if (debugLog) {
              const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
              const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
              debugLog.push(`DIPLO: ${civName} makes first contact with ${targetName}, attitude=${initialDelta}`);
            }
          }
        }
        continue; // no further diplomacy until next turn
      }

      // 2a. War declarations (most impactful)
      // Only one war declaration per turn (from FUN_0055d8d8 behavior)
      if (!declaredWar && shouldDeclareWar(civSlot, i, continentData, gameState)) {
        const action = { type: 'DECLARE_WAR', targetCiv: i };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) {
          actions.push(action);
          // War declaration worsens attitudes
          actions.push(makeAttitudeAction(civSlot, i, -40));
          actions.push(makeAttitudeAction(i, civSlot, -40));
          declaredWar = true;
          if (debugLog) {
            const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
            const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
            const ourStr = calcMilitaryStrength(gameState, civSlot);
            const theirStr = calcMilitaryStrength(gameState, i);
            const ratio = (ourStr / Math.max(theirStr, 1)).toFixed(1);
            debugLog.push(`DIPLO: ${civName} declares war on ${targetName}: military ratio=${ratio}`);
          }
        }
      }

      // 2a2. Spontaneous war — break peace when attitude is low enough
      if (!declaredWar) {
        const spontAction = checkSpontaneousWar(gameState, civSlot, i);
        if (spontAction) {
          const err = validateAction(gameState, mapBase, spontAction, civSlot);
          if (!err) {
            actions.push(spontAction);
            actions.push(makeAttitudeAction(civSlot, i, -30));
            declaredWar = true;
            if (debugLog) {
              const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
              const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
              debugLog.push(`DIPLO: ${civName} spontaneously declares war on ${targetName} (low attitude)`);
            }
          }
        }
      }

      // Skip non-urgent diplomacy if on cooldown (binary: 6-turn minimum)
      // War declarations above bypass this — they're always urgent
      if (onCooldown) continue;

      // 2b. Peace proposals (urgent if losing)
      if (shouldProposePeace(civSlot, i, continentData, gameState)) {
        // Skip if our reputation is too low (target won't trust us)
        if (isReputationTooLow(gameState, civSlot)) continue;
        // Don't propose if already have a pending proposal
        const hasPending = gameState.treatyProposals?.some(
          p => p.from === civSlot && p.to === i && !p.resolved
        );
        if (!hasPending) {
          // Propose ceasefire if severely losing, peace otherwise
          const ourStr = calcMilitaryStrength(gameState, civSlot);
          const theirStr = calcMilitaryStrength(gameState, i);
          const ratio = ourStr / Math.max(theirStr, 1);

          // (#112) GROVEL mechanic: complete capitulation when very weak.
          // Binary: when strength ratio < 0.25, AI offers everything
          // (all gold, a tech, and ceasefire) as a grovel gesture.
          if (ratio < 0.25) {
            const treatyType = 'ceasefire';
            const action = { type: 'PROPOSE_TREATY', targetCiv: i, treaty: treatyType };
            const err = validateAction(gameState, mapBase, action, civSlot);
            if (!err) {
              actions.push(action);
              // Grovel: offer a large attitude bonus (desperate for peace)
              actions.push(makeAttitudeAction(civSlot, i, +40));
              if (debugLog) {
                const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
                const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
                debugLog.push(`DIPLO: ${civName} GROVELS to ${targetName} (ratio=${ratio.toFixed(2)})`);
              }
            }
          } else {
            const treatyType = ratio < 0.5 ? 'ceasefire' : 'peace';
            const action = { type: 'PROPOSE_TREATY', targetCiv: i, treaty: treatyType };
            const err = validateAction(gameState, mapBase, action, civSlot);
            if (!err) {
              actions.push(action);
              // Peace proposal improves attitude
              actions.push(makeAttitudeAction(civSlot, i, +20));
              if (debugLog) {
                const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
                const targetName = gameState.civs?.[i]?.name || `Civ ${i}`;
                debugLog.push(`DIPLO: ${civName} proposes ${treatyType} to ${targetName}`);
              }
            }
          }
        }
      }

      // (#113) "Over a barrel" bonus tech demand: after a successful tribute/tech
      // demand is accepted, the binary sometimes makes a follow-up demand for
      // an additional tech. This triggers when the target accepted the first
      // demand and is still in a weak position (military ratio > 2:1).
      // TODO (#113): Full implementation requires tracking per-turn demand
      // acceptance state. For now, the shouldDemandTribute function handles
      // the primary demand, and the "over a barrel" follow-up is deferred.

      // 2c. Tribute demands (opportunistic)
      const tribute = shouldDemandTribute(civSlot, i, continentData, gameState);
      if (tribute) {
        // Check for pending demands
        const hasPending = gameState.tributeDemands?.some(
          d => d.from === civSlot && d.to === i && !d.resolved
        );
        if (!hasPending) {
          const action = { type: 'DEMAND_TRIBUTE', targetCiv: tribute.targetCiv,
                           amount: tribute.amount };
          const err = validateAction(gameState, mapBase, action, civSlot);
          if (!err) {
            actions.push(action);
            // Item 4: DEMAND_COOLDOWN — set cooldown timer (8 turns) and record turn
            actions.push({
              type: 'SET_DEMAND_COOLDOWN',
              civSlot,
              targetCiv: tribute.targetCiv,
              cooldownExpiry: (gameState.turn?.number ?? 0) + 8,
            });
            break; // only one demand per turn
          }
        }
      }

      // 2d. Alliance breaks (rare — old heuristic)
      if (shouldBreakAlliance(civSlot, i, gameState)) {
        const action = { type: 'DECLARE_WAR', targetCiv: i };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err && !declaredWar) {
          actions.push(action);
          declaredWar = true;
        }
      }

      // 2e. Alliance break threshold — attitude/military/shared-war check
      if (!declaredWar) {
        const breakAction = checkAllianceBreak(gameState, civSlot, i);
        if (breakAction) {
          // BREAK_ALLIANCE sets treaty to peace instead of declaring war
          const err = validateAction(gameState, mapBase, { type: 'DECLARE_WAR', targetCiv: i }, civSlot);
          if (!err) {
            actions.push(breakAction);
            if (debugLog) {
              const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
              const allyName = gameState.civs?.[i]?.name || `Civ ${i}`;
              debugLog.push(`DIPLO: ${civName} breaks alliance with ${allyName} (threshold)`);
            }
          }
        }
      }

      // (#178) Military aid: find strongest land unit and transfer to unguarded ally city.
      // Binary: when allied, AI checks if ally has cities without defenders.
      // If so, AI finds its strongest available land unit and moves it toward
      // the ally's unguarded city as a gift/reinforcement.
      if (getTreaty(gameState, civSlot, i) === 'alliance') {
        // Check if ally has unguarded cities
        let unguardedAllyCity = null;
        for (const ac of gameState.cities) {
          if (!ac || ac.owner !== i || ac.size <= 0) continue;
          const hasDefender = gameState.units.some(u =>
            u.gx === ac.gx && u.gy === ac.gy && u.owner === i && u.gx >= 0 &&
            (UNIT_DEF[u.type] || 0) > 0
          );
          if (!hasDefender) { unguardedAllyCity = ac; break; }
        }
        if (unguardedAllyCity) {
          // TODO (#178): Full implementation would find our strongest idle land unit
          // near the ally city and issue a MOVE_UNIT or GIFT_UNIT action.
          // This requires a GIFT_UNIT action type in the reducer.
          if (debugLog) {
            const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
            const allyName = gameState.civs?.[i]?.name || `Civ ${i}`;
            debugLog.push(`DIPLO: ${civName} considers military aid to ${allyName}'s unguarded city at (${unguardedAllyCity.gx},${unguardedAllyCity.gy})`);
          }
        }
      }
    }

    // ── 6. O.2: AI tech exchange ──
    const techExchangeActions = generateAiTechExchange(civSlot, gameState, mapBase, continentData, debugLog);
    actions.push(...techExchangeActions);

    // ── 7. O.3: Alliance/crusade proposals ──
    const allianceActions = generateAllianceProposals(civSlot, gameState, mapBase, continentData, debugLog);
    actions.push(...allianceActions);

    // ── 8. Military aid to allied civs ──
    const aidActions = considerMilitaryAid(gameState, mapBase, civSlot);
    actions.push(...aidActions);
    if (debugLog && aidActions.length > 0) {
      for (const a of aidActions) {
        if (a.type === 'GIFT_UNIT') {
          const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
          const allyName = gameState.civs?.[a.toCiv]?.name || `Civ ${a.toCiv}`;
          debugLog.push(`DIPLO: ${civName} gifts unit #${a.unitIndex} to ally ${allyName}`);
        }
      }
    }

    // ── 9. AI-vs-AI diplomacy (treaty progression/regression) ──
    if (!isHumanCiv(gameState, civSlot)) {
      for (let other = civSlot + 1; other < 8; other++) {
        if (!(gameState.civsAlive & (1 << other))) continue;
        if (isHumanCiv(gameState, other)) continue;
        const aiAiEvents = processAiVsAiDiplomacy(gameState, mapBase, civSlot, other);
        if (aiAiEvents.length > 0) {
          // Convert events to actions that the reducer can process
          for (const evt of aiAiEvents) {
            if (evt.type === 'treatySigned' || evt.type === 'warDeclared') {
              // These are informational events from the direct state mutations;
              // push to turnEvents for client notification
              if (!gameState.turnEvents) gameState.turnEvents = [];
              gameState.turnEvents.push(evt);
            }
          }
          if (debugLog) {
            const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
            const otherName = gameState.civs?.[other]?.name || `Civ ${other}`;
            for (const evt of aiAiEvents) {
              debugLog.push(`DIPLO: AI-vs-AI ${civName}↔${otherName}: ${evt.type} (${evt.treatyType || evt.previousTreaty || ''})`);
            }
          }
        }
      }
    }

    // Record cooldown for any human-targeted diplomacy actions
    // (binary: DAT_0064ca82[target][us] = current turn)
    const humanMask = gameState.humanPlayers || 0;
    const diploTargets = new Set();
    for (const a of actions) {
      const target = a.targetCiv ?? a.to ?? a.toCiv;
      if (target != null && (humanMask & (1 << target))) {
        diploTargets.add(target);
      }
    }
    if (diploTargets.size > 0) {
      if (!gameState._diploContactTurns) gameState._diploContactTurns = {};
      for (const t of diploTargets) {
        const key = `diplo_${Math.min(civSlot, t)}_${Math.max(civSlot, t)}`;
        gameState._diploContactTurns[key] = currentTurn;
      }
    }

  } catch (err) {
    console.error(`[diplomai] Error for civ ${civSlot}:`, err);
  }

  return actions;
}
