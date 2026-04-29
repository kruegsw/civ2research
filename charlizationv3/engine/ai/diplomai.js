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
  UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_DOMAIN,
  DIFFICULTY_KEYS,
  ADVANCE_PREREQS,
  IMPROVE_PREREQS, GOVT_TECH_PREREQS, GOVT_INDEX,
  GOVERNMENT_NAMES,
  LEADER_PERSONALITY as LEADER_PERSONALITY_3,
} from '../defs.js';
import { hasWonderEffect, civHasWonder } from '../utils.js';
import {
  calcAttitudeScore,
  TF, getTreatyFlags, setTreatyFlags, addTreatyFlag, clearTreatyFlag,
  DIPLO_EVENTS, fireDiplomacyEvent,
  declareWar as diplomacyDeclareWar,
  signCeasefire, signPeaceTreaty, formAlliance,
  getReputation, isReputationTooLow,
  getAttitudeLevel, isHostile, isFriendly,
  calcPatienceThreshold, getPatience,
  shouldBetrayTreaty, wouldEnableWonder,
  calcTributeDemand, shouldProvoke,
} from '../diplomacy.js';
import { calcTechValue } from './econai.js';
import { grantAdvance, handleTechDiscovery } from '../research.js';

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
 * Get hostility byte of civSlot toward targetCiv (0..100).
 * 0 = Worshipful (most friendly); 100 = Furious (most hostile).
 */
function getAttitude(gameState, civSlot, targetCiv) {
  const civ = gameState.civs?.[civSlot];
  if (!civ?.attitudes) return 0;
  return civ.attitudes[targetCiv] ?? 0;
}

/**
 * Modify civSlot's attitude byte toward targetCiv by `delta`.
 *
 * Convention: the attitude byte is HOSTILITY 0..100 (binary +0x40+target).
 *   delta > 0 → MORE hostile (toward Furious / 100).
 *   delta < 0 → MORE friendly (toward Worshipful / 0).
 * The reducer clamps the result to [0, 100].
 *
 * Returns an ADJUST_ATTITUDE action.
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
 * Attitude byte is HOSTILITY (0=Worshipful, 100=Furious). Tones map by level:
 *   level 1 (Worshipful)         → 'enthusiastic'
 *   level 2-3 (Enthusiastic/Cordial) → 'friendly'
 *   level 4 (Receptive)          → 'neutral'
 *   level 5-6 (Neutral/Uncooperative) → 'guarded'
 *   level >= 7 (Icy/Furious)     → 'hostile'
 */
function getGreetingTone(attitude) {
  const level = getAttitudeLevel(attitude);
  if (level <= 1) return 'enthusiastic'; // Worshipful
  if (level <= 3) return 'friendly';     // Enthusiastic / Cordial
  if (level === 4) return 'neutral';     // Receptive
  if (level <= 6) return 'guarded';      // Neutral / Uncooperative
  return 'hostile';                       // Icy / Furious
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
 * From FUN_0045705e (under hostility convention: low byte = friendly):
 *   Tech demand: accept if hostility < 50 (neutral+) or demander 2x stronger
 *   Gold demand: accept if hostility < 74 (guarded+) and affordable
 *   Map demand:  accept if hostility < 100 (anything but Furious)
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
      // Accept if friendly (hostility < 50) or they're 2x stronger
      if (attitude < 50) return true;
      if (powerRatio > 2.0) return true;
      // Peaceful leaders give tech more readily (anything friendlier than Furious)
      if (personality.militarism < 0 && attitude < 75) return true;
      return false;
    }
    case 'gold': {
      const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
      const pain = valueGold(demandValue, treasury);
      // Accept if not too painful and not maxed-out hostile
      if (attitude < 100 && pain < 30) return true;
      // Accept if they're much stronger
      if (powerRatio > 2.0 && pain < 60) return true;
      return false;
    }
    case 'map': {
      // Maps are cheap to share — accept unless very hostile
      if (attitude < 80) return true;
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
        // Max hostility: attitude byte is 0..100 hostility (100=furious).
        actions.push(makeAttitudeAction(aiCiv, other, +100));

        fireDiplomacyEvent(state, DIPLO_EVENTS.VIOLATE, aiCiv, other, {
          reason: 'alliance_violation',
        });
      } else {
        // Tolerance check passed — bump hostility (positive delta on
        // hostility byte = more hostile per binary convention).
        actions.push(makeAttitudeAction(aiCiv, other, +30));
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
      // Hostility bump for intrusion during peace (positive delta = more hostile).
      actions.push(makeAttitudeAction(aiCiv, other, +3));
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
      // Harsher hostility bump during ceasefire (+ = more hostile).
      actions.push(makeAttitudeAction(aiCiv, other, +5));
    } else {
      // No treaty (uncontacted or bare contact) — direct war consideration.
      // Strongest hostility bump; shouldDeclareWar will pick this up.
      actions.push(makeAttitudeAction(aiCiv, other, +8));
    }
  }

  return actions;
}

// ── Military Aid ────────────────────────────────────────────────

/**
 * Consider gifting a military unit to an allied civ that is losing a war.
 *
 * Faithful port of FUN_0055f7d1 (block_00550000.c:5982, 2222 bytes).
 *
 * Algorithm:
 *   1. Count `local_14` = number of civs we are AT WAR with.
 *   2. For each allied civ `ally` (our diplo[ally] & 0x08):
 *      Gate: ally has ≤ our military_power, OR we have no wars.
 *      For each civ `enemy` that ally is at war with (their diplo[enemy]
 *      bit 0x2000 = WAR), with peer-flag (bit 0x200) AND
 *      ally's military_power ≤ enemy's, AND enemy's powerRank ≥ ally's:
 *        a. Find best military unit in OUR cities scoring:
 *             score = (atk*2 + def) * (hp / maxHp)
 *           Filter: tile threat byte == 4, OR == 5 AND no wars (local_14==0).
 *        b. Find an undefended ally city (no land defender).
 *        c. Gift the unit to that ally city.
 *      One gift per ally, one ally per call.
 *
 * @param {object} state - game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ considering aid (param_1 in binary)
 * @returns {Array<object>} GIFT_UNIT actions
 */
export function considerMilitaryAid(state, mapBase, aiCiv) {
  const actions = [];

  if (!state.civs || !state.units) return actions;

  // Binary lines 6004-6008: local_14 = number of war partners.
  // (&DAT_0064c6c1)[other*4 + ourCiv*0x594] & 0x20 = byte+1 bit 0x20 of
  // diplo word = bit 13 = TF.WAR (0x2000).
  let local_14 = 0;
  for (let other = 1; other < 8; other++) {
    if (other === aiCiv) continue;
    const f = getTreatyFlags(state, aiCiv, other);
    if (f & TF.WAR) local_14++;
  }

  // Aggregate military power for each civ (binary: civ + 0x6E).
  const militaryPower = new Array(8).fill(0);
  for (let i = 1; i < 8; i++) militaryPower[i] = calcMilitaryStrength(state, i);

  // Binary lines 6009-6135: for each ally, scan their war partners.
  for (let ally = 1; ally < 8; ally++) {
    if (ally === aiCiv) continue;
    if (!(state.civsAlive & (1 << ally))) continue;
    // Binary 6014: ALLIANCE bit (0x08) of our diplo[ally].
    const flagsToAlly = getTreatyFlags(state, aiCiv, ally);
    if ((flagsToAlly & TF.ALLIANCE) === 0) continue;
    // Binary 6015-6016: ally.military_power <= our.military_power
    //                    OR local_14 == 0.
    if (militaryPower[ally] > militaryPower[aiCiv] && local_14 !== 0) continue;

    // Inner loop 6017-6023: find an enemy that ally is at war with.
    for (let enemy = 1; enemy < 8; enemy++) {
      if (enemy === aiCiv || enemy === ally) continue;
      if (!(state.civsAlive & (1 << enemy))) continue;
      const allyToEnemy = getTreatyFlags(state, ally, enemy);
      // Binary 6019: bit 0x20 of byte+1 = TF.WAR (0x2000).
      if ((allyToEnemy & TF.WAR) === 0) continue;
      // Binary 6020: bit 0x02 of byte+1 = bit 9 = 0x200 ("recently
      // declared" / "war started by them" tracking flag).
      if ((allyToEnemy & 0x200) === 0) continue;
      // Binary 6021-6022: enemy.military_power >= ally.military_power.
      if (militaryPower[ally] > militaryPower[enemy]) continue;
      // Binary 6023: enemy's power rank ≥ ally's.
      // (state.powerRanks is the v3 equivalent of DAT_00655c22.)
      const ranks = state.powerRanks || [];
      const allyRank = ranks[ally] ?? 3;
      const enemyRank = ranks[enemy] ?? 3;
      if (enemyRank < allyRank) continue;

      // Binary lines 6024-6049: find best unit in OUR cities.
      // Must be in a city we own; score = (atk*2 + def) * hp_ratio.
      let bestUnit = -1;
      let bestScore = 0;
      const ourCities = [];
      for (const c of (state.cities || [])) {
        if (c && c.owner === aiCiv && c.size > 0 && c.gx >= 0) ourCities.push(c);
      }
      const ourCityPos = new Set(ourCities.map(c => c.gy * mapBase.mw + c.gx));
      for (let ui = 0; ui < state.units.length; ui++) {
        const u = state.units[ui];
        if (!u || u.owner !== aiCiv || u.gx < 0) continue;
        // Binary 6029: cVar < 2 — non-civilian (role byte). We use atk/def.
        const atk = UNIT_ATK[u.type] || 0;
        const def = UNIT_DEF[u.type] || 0;
        if (atk === 0 && def <= 1) continue;
        // Binary 6030: domain == 0 (land unit) — `(&DAT_0064b1c1)[type*0x14]`.
        if ((UNIT_DOMAIN[u.type] ?? 0) !== 0) continue;
        // Must be in one of our cities (binary requires city to be the unit's
        // location AND no enemy unit on tile via FUN_004087c0).
        const tileIdx = u.gy * mapBase.mw + u.gx;
        if (!ourCityPos.has(tileIdx)) continue;
        // Binary 6042: hp_ratio = thunk_FUN_005b29aa(unit) — typically
        // unit_health / unit_type_max_health. v3 stores damage in hpLost.
        const maxHp = (UNIT_HP[u.type] ?? 10);
        const hpRatio = Math.max(0, (maxHp - (u.hpLost || 0))) / maxHp;
        const score = (def + atk * 2) * hpRatio;
        if (score > bestScore) {
          bestScore = score;
          bestUnit = ui;
        }
      }
      if (bestUnit < 0) continue;

      // Binary lines 6052-6128: find an UNDEFENDED ally city to send unit to.
      // Binary checks `(&DAT_0064f344)[city*0x58] & 0x80` (founded flag),
      // and that the city's continent matches local_2c's threat region,
      // and `FUN_005b4c63(x, y, ally)` returns 0 (no defender).
      let targetAllyCity = -1;
      for (let ci = 0; ci < (state.cities?.length || 0); ci++) {
        const c = state.cities[ci];
        if (!c || c.owner !== ally || c.size <= 0 || c.gx < 0) continue;
        // Undefended check: no land military unit on the tile.
        const tileIdx = c.gy * mapBase.mw + c.gx;
        let hasDefender = false;
        for (const u of state.units) {
          if (!u || u.owner !== ally || u.gx < 0) continue;
          const ut = u.gy * mapBase.mw + u.gx;
          if (ut !== tileIdx) continue;
          const def = UNIT_DEF[u.type] || 0;
          if (def >= 1) { hasDefender = true; break; }
        }
        if (hasDefender) continue;
        targetAllyCity = ci;
        break;
      }
      if (targetAllyCity < 0) continue;

      actions.push({
        type: 'GIFT_UNIT',
        unitIndex: bestUnit,
        fromCiv: aiCiv,
        toCiv: ally,
        toCityIndex: targetAllyCity,
      });
      // Binary terminates after one gift via "return" in the inner block.
      return actions;
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
// 3. shouldProposePeace — Port of FUN_0055d8d8 peace gate (lines 5667-5676)
//
// Binary gate (AND of both sides): peace proposed iff each civ EITHER
//   - cannot declare war (FUN_0055cbd5 returns 0), or
//   - holds Great Wall (wonder 6), or
//   - holds United Nations (wonder 24 = 0x18), or
//   - is a Republic/Democracy (govt > 4) AND no WAR_STARTED toward the other.
// Also gated by every-4-turn contact-pair cadence.
// ═══════════════════════════════════════════════════════════════════

function shouldProposePeace(civSlot, targetCiv, gameState, mapBase) {
  const treaty = getTreaty(gameState, civSlot, targetCiv);
  if (treaty !== 'war') return false; // only propose peace when at war

  // Cadence: every 4 turns per pair (binary line 5663)
  const turnNumber = gameState.turn?.number ?? 0;
  if ((turnNumber + civSlot + targetCiv) % 4 !== 0) return false;

  // Per-civ pacifism check (binary "can civ X declare war / does X have shield")
  const peaceful = (civA, civB) => {
    if (!shouldDeclareWarFull(gameState, mapBase, civA, civB)) return true;
    if (hasWonderEffect(gameState, civA, 6)) return true;   // Great Wall
    if (hasWonderEffect(gameState, civA, 24)) return true;  // United Nations
    // govt > 4 (Republic/Democracy) AND no WAR_STARTED toward the other
    const govtIdx = GOVT_INDEX[gameState.civs?.[civA]?.government] ?? 1;
    const flagsAB = getTreatyFlags(gameState, civA, civB);
    if (govtIdx > 4 && !(flagsAB & TF.WAR_STARTED)) return true;
    return false;
  };

  return peaceful(civSlot, targetCiv) && peaceful(targetCiv, civSlot);
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
  // Binary FUN_0055d8d8 lines 5656-5660: gate on CONTACT bit (0x01) of
  // the treaty flag word — first contact iff CONTACT not yet set in either
  // direction. v3 mirrors flags both ways via addTreatyFlag, so checking
  // one side suffices.
  const flags = getTreatyFlags(gameState, civSlot, targetCiv);
  if (flags & TF.CONTACT) return null;

  // First contact: propose ceasefire (binary writes 0x401 = CONTACT|CEASEFIRE).
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
 *   2. Evaluate proposal type with attitude-based thresholds (hostility byte)
 *   3. For alliance: hostility < 26 required (friendly tier)
 *   4. For peace:    hostility < 50 OR military weakness
 *   5. For ceasefire: hostility < 100 OR multi-front war
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
      // Hostility convention: low byte = friendly. Alliance needs friendly.
      // Alliance if hostility < 26 (Worshipful/Enthusiastic tier)
      if (attitude < 26) accept = true;
      // Also accept if we share enemies and are relatively weak (and not too hostile)
      if (attitude < 50 && warCount > 0 && ratio < 1.0) accept = true;
      // Enthusiastic greeting → always consider
      if (tone === 'enthusiastic') accept = true;
      // Hostile/guarded → never accept alliance
      if (tone === 'hostile' || tone === 'guarded') accept = false;
    } else if (p.treaty === 'peace') {
      // Peace if hostility < 50 (anything friendlier than half-hostile)
      if (attitude < 50) accept = true;
      // Accept if they're stronger or roughly equal
      if (ratio < 1.5) accept = true;
      if (warCount > 1) accept = true;
      if (balance.weakCount > 0) accept = true;
      if (personality.militarism < 0) accept = true;
      // Reject if we clearly dominate and are aggressive
      if (ratio > 2.0 && balance.dominantCount > 0 && personality.militarism > 0) {
        accept = false;
      }
      // Hostile tone halves willingness
      if (tone === 'hostile' && ratio > 0.8) accept = false;
    } else {
      // Ceasefire: accept unless hostility maxed (Furious-only refusal)
      if (attitude < 100) accept = true;
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
      // O.1: Attitude adjustment on accept/reject. Convention: high
      // attitude byte = hostile, low = friendly. Accept warms relations
      // (negative delta toward 0). Reject sours them (positive delta).
      if (accept) {
        actions.push(makeAttitudeAction(civSlot, p.from, -10));
      } else {
        actions.push(makeAttitudeAction(civSlot, p.from, +5));
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
      // O.1: Attitude changes. Convention: high byte = hostile.
      if (accept) {
        // Paying tribute warms their view of us → reduce hostility.
        actions.push(makeAttitudeAction(d.from, civSlot, -5));
      } else {
        // Rejection sours relations → bump hostility.
        actions.push(makeAttitudeAction(d.from, civSlot, +10));
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
          const val = calcTechValue(other, tid, gameState, mapBase);
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
            const val = calcTechValue(civSlot, tid, gameState, mapBase);
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

      // Check attitude — skip if very hostile (won't trade with hated civ)
      const attitude = getAttitude(gameState, civSlot, other);
      if (attitude > 75) continue;

      // Evaluate mutual benefit: pick techs of similar value
      // Gap 48: Skip techs that would enable unbuilt wonders for the recipient
      let ourBestTech = -1;
      let ourBestVal = 0;
      for (const tid of weCanGive) {
        if (wouldEnableWonder(gameState, other, tid)) continue;
        const val = calcTechValue(other, tid, gameState, mapBase);
        if (val > ourBestVal) { ourBestVal = val; ourBestTech = tid; }
      }

      let theirBestTech = -1;
      let theirBestVal = 0;
      for (const tid of theyCanGive) {
        if (wouldEnableWonder(gameState, civSlot, tid)) continue;
        const val = calcTechValue(civSlot, tid, gameState, mapBase);
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

      // Improve attitudes after successful trade — both directions.
      // Friendlier = lower hostility byte → negative delta.
      actions.push(makeAttitudeAction(civSlot, other, -5));
      actions.push(makeAttitudeAction(other, civSlot, -5));

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
      // 4. Attitude must be friendly tier (hostility byte low). Apply
      //    leader tolerance as a small bias: tolerant leaders (+1) accept
      //    slightly higher hostility, intolerant (-1) require more friendliness.
      //    Base gate: hostility level <= 3 (Worshipful/Enthusiastic/Cordial).
      const attitude = getAttitude(gameState, civSlot, target);
      const aiCivData = gameState.civs?.[civSlot];
      const rcn = aiCivData?.rulesCivNumber ?? 0;
      const pers3 = LEADER_PERSONALITY_3[rcn] || [0, 0, 0];
      const tolerance = pers3[2] ?? 0;
      const allianceLevel = getAttitudeLevel(attitude); // 1=Worshipful .. 8=Furious
      if (allianceLevel - tolerance > 3) continue;
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
        // Proactive alliance proposal warms our view of target → friendlier (negative delta).
        actions.push(makeAttitudeAction(civSlot, target, -5));
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

        // Check attitude — skip if too hostile to seek alliance (hostility > 60)
        const attitude = getAttitude(gameState, civSlot, ally);
        if (attitude > 60) continue;

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
          // HELPME alliance proposal warms our view of would-be ally (negative delta).
          actions.push(makeAttitudeAction(civSlot, ally, -15));

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
            // Crusade alliance warms relations with co-attacker (negative delta).
            actions.push(makeAttitudeAction(civSlot, ally, -10));
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
        // Patience decrement = bump hostility toward war enemy
        actions.push(makeAttitudeAction(civSlot, i, +Math.ceil(patienceDecrement)));
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
        // Small attitude penalty toward violating ally → bump hostility
        actions.push(makeAttitudeAction(civSlot, ally, +3));
      }
    }
  }

  // ── O.4: 32-turn periodic hostility decay (forgetting) ──
  // Every 32 turns, hostility byte drifts 1 point toward 0 (Worshipful).
  // Hostility byte is non-negative; drift only applies if att > 0.
  if (turnNumber > 0 && turnNumber % 32 === 0) {
    for (let i = 1; i < 8; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;
      const att = getAttitude(gameState, civSlot, i);
      if (att > 0) {
        actions.push(makeAttitudeAction(civSlot, i, -1));
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
      // Upgrade ceasefire→peace when hostility is below half (friendly tier).
      if (attitude < 50) {
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
  // After 8 turns of ceasefire with hostile attitude (byte > 75), consider war
  if (turnNumber > 0 && turnNumber % 8 === 0) {
    const personality = getPersonality(gameState, civSlot);
    for (let i = 1; i < 8; i++) {
      if (i === civSlot) continue;
      if (!(gameState.civsAlive & (1 << i))) continue;
      if (getTreaty(gameState, civSlot, i) !== 'ceasefire') continue;

      const attitude = getAttitude(gameState, civSlot, i);
      // Hostile attitude + aggressive personality → ceasefire may expire into war.
      // Under hostility convention high byte = hostile, so trigger above 75.
      if (attitude > 75 && personality.militarism > 0) {
        actions.push(makeAttitudeAction(civSlot, i, +5));
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
    // Each intrusion worsens attitude → bump hostility +5 (cumulative)
    actions.push(makeAttitudeAction(civSlot, intruderCiv, +5));
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
      actions.push(makeAttitudeAction(civSlot, intruderCiv, +scorePenalty));
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
    // calcAttitudeScore returns positive=friendly, negative=hostile (-10..+10).
    // Hostility byte is the OPPOSITE: 0=friendly, 100=hostile. Negate.
    const turnNum = gameState.turn?.number || 0;
    if ((turnNum & 3) === 0) {
      const binaryScore = calcAttitudeScore(gameState, civSlot, other);
      const targetAttitude = Math.max(0, Math.min(100, 50 - binaryScore * 5));
      // Nudge current attitude toward binary target (smooth convergence)
      const diff = targetAttitude - attitude;
      if (Math.abs(diff) > 5) {
        attDelta += Math.sign(diff) * Math.min(Math.abs(diff), 10);
      }
    }

    // Hostility convention: positive delta = MORE hostile, negative = friendlier.
    // ── O.5: Personality modifiers ──
    // Militarist leaders distrust everyone slightly → bump hostility
    if (personality.militarism > 0) attDelta += 1;
    // Expansionist leaders dislike civs with more cities → bump hostility
    const theirCities = countCities(gameState, other);
    if (personality.expansionism > 0 && theirCities > ourCities) {
      attDelta += 2;
    }
    // Peaceful leaders slowly warm to non-enemies → reduce hostility
    if (personality.militarism < 0 && treaty !== 'war') {
      attDelta -= 1;
    }

    // ── O.5: Military threat assessment ──
    const theirStr = calcMilitaryStrength(gameState, other);
    if (theirStr > ourStr * 2 && treaty !== 'alliance') {
      // Much stronger civ → fear-based hostility
      attDelta += 3;
    } else if (ourStr > theirStr * 3 && treaty !== 'war') {
      // We're much stronger → mild contempt
      attDelta += 1;
    }

    // ── O.5: Alliance strength bonus (allies warm up over time) ──
    if (treaty === 'alliance') {
      // Allies cool down 3/turn, but stop once Worshipful (hostility 0)
      if (attitude > 20) attDelta -= 3;
    }

    // ── O.5: Peace treaty warmth ──
    if (treaty === 'peace') {
      // Drift toward friendly while still hostile
      if (attitude > 0) attDelta -= 1;
    }

    // ── O.5: Wonder effects on attitude ──
    // Eiffel Tower (wonder 20): other civs view us more favorably → friendlier
    if (hasWonderEffect(gameState, civSlot, 20)) {
      attDelta -= 2;
    }
    // Women's Suffrage (wonder 21): stability bonus, others respect → friendlier
    if (hasWonderEffect(gameState, civSlot, 21)) {
      attDelta -= 1;
    }

    // ── O.5: Spaceship race detection ──
    // If other civ is building spaceship parts, become hostile
    if (gameState.spaceships?.[other]) {
      const ss = gameState.spaceships[other];
      if ((ss.structural || 0) > 0 || (ss.fuel || 0) > 0 || (ss.propulsion || 0) > 0
          || (ss.habitation || 0) > 0 || (ss.lifeSupport || 0) > 0 || (ss.solarPanel || 0) > 0) {
        // They're building a spaceship — racing → bump hostility
        attDelta += 5;
        if (debugLog && attitude < 80) {
          const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;
          const otherName = gameState.civs?.[other]?.name || `Civ ${other}`;
          debugLog.push(`DIPLO: ${civName} grows hostile toward ${otherName} (spaceship race)`);
        }
      }
    }
    // Also check raw spaceship structural count (from parser data)
    const otherCiv = gameState.civs?.[other];
    if (otherCiv?.spaceshipStructural > 0) {
      attDelta += 3;
    }

    // ── O.5: Espionage scandal ──
    // If other civ was caught spying on us (provocation flag) → bump hostility
    const dKey = civSlot < other ? `${civSlot}-${other}` : `${other}-${civSlot}`;
    const diplo = gameState.diplomacy?.[dKey];
    if (diplo?.sneak) {
      attDelta += 8;
    }

    // ── O.5: Shared enemy bonus ──
    // If we and other are both at war with the same civ, attitudes warm
    for (let third = 1; third < 8; third++) {
      if (third === civSlot || third === other) continue;
      if (!(gameState.civsAlive & (1 << third))) continue;
      const ourWar = getTreaty(gameState, civSlot, third) === 'war' && haveContact(gameState, civSlot, third);
      const theirWar = getTreaty(gameState, other, third) === 'war' && haveContact(gameState, other, third);
      if (ourWar && theirWar) {
        attDelta -= 2;
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
  const treaty = getTreaty(state, aiCiv, targetCiv);
  if (treaty === 'war') return false; // already at war
  if (treaty === 'alliance') return false; // won't break alliance here

  // Binary FUN_0055cbd5 line 5220: if WAR_STARTED toward target, fall through to "yes".
  // (v3 uses symmetric addTreatyFlag, so direction is moot.)
  const flagsToTarget = getTreatyFlags(state, aiCiv, targetCiv);
  if (flagsToTarget & TF.WAR_STARTED) return true;
  // Binary line 5221: if VENDETTA toward target, fall through to "yes".
  if (flagsToTarget & TF.VENDETTA) return true;

  // Binary FUN_0055cbd5 lines 5222-5238: third-party deterrent.
  // For each alive third civ k: if a hostile interaction is possible AND k
  // is stronger than the would-be opponent AND k is not allied with that
  // opponent, return false (focus on k instead of opening another front).
  const ourStr = calcMilitaryStrength(state, aiCiv);
  const targetStr = calcMilitaryStrength(state, targetCiv);
  for (let k = 1; k < 8; k++) {
    if (k === aiCiv || k === targetCiv) continue;
    if (!(state.civsAlive & (1 << k))) continue;
    const kStr = calcMilitaryStrength(state, k);
    // Branch A: we can provoke k AND k stronger than target AND k not allied with target
    if (shouldProvoke(state, aiCiv, k) && kStr > targetStr &&
        getTreaty(state, k, targetCiv) !== 'alliance') {
      return false;
    }
    // Branch B: target can provoke k AND k stronger than us AND we not allied with k
    if (shouldProvoke(state, targetCiv, k) && kStr > ourStr &&
        getTreaty(state, aiCiv, k) !== 'alliance') {
      return false;
    }
  }

  // Binary FUN_0055cbd5 line 5240: if our power rank < target's, return false.
  // DAT_0064c7a5 byte at civ struct +0x105 (per-civ rank/age byte). v3 uses
  // powerRank as the closest equivalent.
  const ourRank = state.civs?.[aiCiv]?.powerRank ?? 3;
  const theirRank = state.civs?.[targetCiv]?.powerRank ?? 3;
  if (ourRank < theirRank) return false;

  // Binary FUN_0055cbd5 lines 5244-5278: complications/restraints score.
  // Higher complications → harder to justify declaring war. NOT an ally
  // score (earlier v3 labeling was inverted).
  let complications = 0;
  const turnNum = state.turn?.number ?? 0;
  for (let k = 1; k < 8; k++) {
    if (k === aiCiv || k === targetCiv) continue;
    const kAlive = !!(state.civsAlive & (1 << k));

    // (1) shouldProvoke us → k: +1 (already-hostile third party)
    if (shouldProvoke(state, aiCiv, k)) complications += 1;

    if (!kAlive) continue;

    const usAlliedK = getTreaty(state, aiCiv, k) === 'alliance';
    const targetAlliedK = getTreaty(state, targetCiv, k) === 'alliance';
    const kFlagsToTarget = getTreatyFlags(state, k, targetCiv);

    // (2) us AND target both allied with k: +1 (mediator), +2 if k stronger than both
    if (usAlliedK && targetAlliedK) {
      complications += 1;
      const kRank = state.civs?.[k]?.powerRank ?? 3;
      if (ourRank < kRank && theirRank < kRank) complications += 1; // total +2
    }
    // (3) us allied k AND k at war with target: -1 (we have a fighting friend)
    if (usAlliedK && (kFlagsToTarget & TF.WAR)) complications -= 1;
    // (4) k rank == 7 AND turn > 199 AND k at war with target: -1 (top-tier ally
    //     of attrition is already weakening target)
    const kRankCheck = state.civs?.[k]?.powerRank ?? 3;
    if (kRankCheck === 7 && turnNum > 199 && (kFlagsToTarget & TF.WAR)) {
      complications -= 1;
    }
  }
  // (5) !shouldProvoke(us, target): +1 (target not currently provokable — harder
  //     to justify aggression).
  if (!shouldProvoke(state, aiCiv, targetCiv)) complications += 1;

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

  // Binary line 5299: militarism byte from leader personality
  // (DAT_006554f8 indexed by rulesCivNumber, NOT runtime per-civ patience).
  const aiCivData = state.civs?.[aiCiv];
  const rcn = aiCivData?.rulesCivNumber ?? 0;
  const personality = LEADER_PERSONALITY_3[rcn] || [0, 0, 0];
  const militarism = personality[1] ?? 0;

  // Binary final formula (line 5298):
  //   if ((ourStrength << 2) / theirStrength < (complications - militarism + 4))
  //     return 0 (don't declare)
  //   else return 1
  // Aggressive leaders (militarism > 0) need less strength advantage.
  const denominator = Math.max(theirStrength + theirDefense, 1);
  const lhs = (ourStrength << 2) / denominator;
  const rhs = complications - militarism + 4;

  return lhs >= rhs;
}

// ═══════════════════════════════════════════════════════════════════
// AI_TECH_TRADE — aiTechTradeNegotiation
//
// Faithful port of FUN_0055d1e2 @ 0x0055D1E2 (block_00550000.c:5321).
// Called by FUN_00560084 per-civ tick on every-16-turn boundary when
// the pair is allied (or every-8-turn alliance-only off-cycle). Iterates
// all 100 techs and finds the best tech each civ doesn't have but the
// other does (calcTechValue + rand()%3 noise). Behaviour:
//   - Both directions found → mutual swap (no diplomatic flag set).
//   - Only one direction wants → allied-only one-way gift, gated by
//     ALLIANCE bit + tech-lead difference + once-per-cycle TF flag.
// Returns true if any tech changed hands.
// ═══════════════════════════════════════════════════════════════════

/**
 * AI tech trade negotiation between two civs.
 *
 * Port of FUN_0055d1e2(int param_1, int param_2).
 *
 * @param {object} state - mutable game state
 * @param {number} param_1 - first civ in the trade
 * @param {number} param_2 - second civ in the trade
 * @param {number} runningCiv - the AI civ whose tick is invoking this
 *                              (DAT_00655c31 in the binary)
 * @returns {boolean} true if a trade or gift occurred
 */
export function aiTechTradeNegotiation(state, param_1, param_2, runningCiv) {
  // Binary line 5342: scenario flag gate — skip body when both bits set.
  // DAT_00655af0 & 0x80 (scenario flag), DAT_0064bc60 & 0x20 (no-tech-trade).
  // v3 doesn't model scenario flags; default = run body.
  const scenarioFlags = state.scenarioFlags || 0;
  const cosmicFlags = state.cosmicFlags || 0;
  if ((scenarioFlags & 0x80) !== 0 && (cosmicFlags & 0x20) !== 0) return false;

  // Binary lines 5343-5353: bVar1 = "running AI civ outpaces the pair in
  // tech count" override (lets late-game leaders give one-sided gifts).
  // True only if: running-civ alive, difficulty > 0, ≥5 cities, turn ≥ 201,
  // and running-civ has strictly more techs than both param_1 and param_2.
  let bVar1 = false;
  {
    const civsAlive = state.civsAlive || 0;
    const aliveBit = (1 << runningCiv) & civsAlive;
    const difficulty = state.difficulty ?? 0;
    const turnNumber = state.turn?.number || 0;
    const runningCities = countCivCities(state, runningCiv);
    const tcRunning = state.civTechCounts?.[runningCiv] ?? state.civTechs?.[runningCiv]?.size ?? 0;
    const tcA = state.civTechCounts?.[param_1] ?? state.civTechs?.[param_1]?.size ?? 0;
    const tcB = state.civTechCounts?.[param_2] ?? state.civTechs?.[param_2]?.size ?? 0;
    if (aliveBit !== 0 && difficulty !== 0 && runningCities >= 5 && turnNumber >= 0xc9
        && tcRunning > tcA && tcRunning > tcB) {
      bVar1 = true;
    }
  }

  // Binary lines 5354-5381: tech selection loop.
  // local_10 bitmask: 1 = found tech for param_1 to receive (best in local_20),
  //                   2 = found tech for param_2 to receive (best in local_24).
  let local_10 = 0;
  let local_14 = 0; // best score for param_1's receive
  let local_18 = 0; // best score for param_2's receive
  let local_20 = -1;
  let local_24 = -1;

  for (let t = 0; t < 100; t++) {
    // Binary line 5355: skip techs disabled in tree (both prereqs == -2).
    const prereqs = ADVANCE_PREREQS[t];
    if (!prereqs) continue;
    if (prereqs[0] === -2 && prereqs[1] === -2) continue;

    const aHas = civHasTechBoth(state, param_1, t);
    const bHas = civHasTechBoth(state, param_2, t);

    if (!aHas && bHas) {
      // param_1 doesn't know it, param_2 does → potential receive for param_1.
      const r = drawRand(state);
      const v = calcTechValue(param_1, t, state, null) + (r % 3);
      if ((local_10 & 1) === 0 || local_14 < v) {
        local_20 = t;
        local_10 |= 1;
        local_14 = v;
      }
    } else if (aHas && !bHas) {
      // Symmetric: param_2 doesn't know, param_1 does → potential receive for param_2.
      const r = drawRand(state);
      const v = calcTechValue(param_2, t, state, null) + (r % 3);
      if ((local_10 & 2) === 0 || local_18 < v) {
        local_24 = t;
        local_10 |= 2;
        local_18 = v;
      }
    }
  }

  // Binary lines 5382-5407: outcome dispatch.
  if (local_10 === 3) {
    // Mutual trade — swap. No diplomatic flag set.
    grantTechFromCiv(state, param_1, local_20, param_2);
    grantTechFromCiv(state, param_2, local_24, param_1);
    return true;
  }

  if (local_10 === 1) {
    // Only param_1 wants. Gate: ALLIANCE bit AND
    //   (param_1.techCount + 2*(6 - difficulty) < param_2.techCount  OR  bVar1)
    //   AND TRIBUTE_DEMANDED bit (0x40000) currently CLEAR (once per cycle).
    const flagsAB = getTreatyFlags(state, param_1, param_2);
    if ((flagsAB & TF.ALLIANCE) === 0) return false;
    if ((flagsAB & TF.TRIBUTE_DEMANDED) !== 0) return false;
    const tcA = state.civTechCounts?.[param_1] ?? state.civTechs?.[param_1]?.size ?? 0;
    const tcB = state.civTechCounts?.[param_2] ?? state.civTechs?.[param_2]?.size ?? 0;
    const difficulty = state.difficulty ?? 0;
    const techGap = tcA + (6 - difficulty) * 2 < tcB;
    if (!techGap && !bVar1) return false;

    addTreatyFlag(state, param_1, param_2, TF.TRIBUTE_DEMANDED);
    grantTechFromCiv(state, param_1, local_20, param_2);
    return true;
  }

  if (local_10 === 2) {
    // Symmetric: only param_2 wants. Gate uses flagsBA (reversed pair).
    const flagsBA = getTreatyFlags(state, param_2, param_1);
    if ((flagsBA & TF.ALLIANCE) === 0) return false;
    if ((flagsBA & TF.TRIBUTE_DEMANDED) !== 0) return false;
    const tcA = state.civTechCounts?.[param_1] ?? state.civTechs?.[param_1]?.size ?? 0;
    const tcB = state.civTechCounts?.[param_2] ?? state.civTechs?.[param_2]?.size ?? 0;
    const difficulty = state.difficulty ?? 0;
    const techGap = tcB + (6 - difficulty) * 2 < tcA;
    if (!techGap && !bVar1) return false;

    addTreatyFlag(state, param_1, param_2, TF.TRIBUTE_DEMANDED);
    grantTechFromCiv(state, param_2, local_24, param_1);
    return true;
  }

  return false;
}

// ── helpers used by aiTechTradeNegotiation ──

function civHasTechBoth(state, civSlot, techId) {
  const civBit = 1 << civSlot;
  const ktb = state.knowsTechBytes;
  if (ktb && typeof ktb[techId] === 'number' && (ktb[techId] & civBit) !== 0) return true;
  const techs = state.civTechs?.[civSlot];
  return !!(techs && techs.has(techId));
}

function countCivCities(state, civSlot) {
  if (!state.cities) return 0;
  let n = 0;
  for (const c of state.cities) {
    if (c && c.owner === civSlot && (c.gx == null || c.gx >= 0)) n++;
  }
  return n;
}

function drawRand(state) {
  return state.rng ? state.rng.next() : Math.floor(Math.random() * 32768);
}

function grantTechFromCiv(state, receiverSlot, techId, giverSlot) {
  if (techId < 0 || techId >= ADVANCE_PREREQS.length) return;
  grantAdvance(state, receiverSlot, techId, giverSlot);
  handleTechDiscovery(state, receiverSlot, techId);
}

// ═══════════════════════════════════════════════════════════════════
// AI_VS_AI_DIPLOMACY — processAiVsAiDiplomacy
//
// Treaty escalation heuristic (NOT a binary port — the binary's actual
// AI-vs-AI treaty work happens inside FUN_0055d8d8). Runs every 4 turns
// per pair. Escalates through ceasefire → peace → alliance based on
// attitude, or declares war on low attitude.
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

  // Attitude is HOSTILITY: 0=Worshipful (friendly), 100=Furious (hostile).
  // Cooperation escalates when hostility is LOW; war is provoked when hostility is HIGH.
  if (treaty === 'war') {
    // If at war and hostility < 60: less hostile → attempt ceasefire
    if (attitude < 60) {
      const result = signCeasefire(state, aiCiv, otherAiCiv);
      events.push(...result.events);
    }
  } else if (treaty === 'ceasefire') {
    // If ceasefire and hostility < 40: friendlier → attempt peace
    if (attitude < 40) {
      const result = signPeaceTreaty(state, aiCiv, otherAiCiv);
      events.push(...result.events);
    }
  } else if (treaty === 'peace') {
    if (attitude < 20) {
      // If peace and hostility < 20: very friendly → attempt alliance
      const result = formAlliance(state, mapBase, aiCiv, otherAiCiv);
      events.push(...result.events);
    } else if (attitude > 80) {
      // If peace and hostility > 80: very hostile → spontaneous war check
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
 * Faithful port of FUN_0055d685 (block_00550000.c:5418, 595 bytes).
 *
 * Binary signature: FUN_0055d685(p1, p2, p3) with
 *   p1 = us (the civ receiving the request)
 *   p2 = enemyCiv (the civ to potentially declare war on)
 *   p3 = allyCiv  (the civ asking us for help)
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data with accessors
 * @param {number} aiCiv - AI civ being asked to join (p1)
 * @param {number} allyCiv - civ requesting help (p3)
 * @param {number} enemyCiv - civ to declare war on (p2)
 * @returns {Array<object>} events generated
 */
export function processJoinWar(state, mapBase, aiCiv, allyCiv, enemyCiv) {
  const events = [];

  // Binary line 5428: outer gate — flags[us][enemy] & (WAR|ALLIANCE) == 0.
  // We must be NEITHER at war NOR allied with the proposed enemy.
  const flagsUsToEnemy = getTreatyFlags(state, aiCiv, enemyCiv);
  if (flagsUsToEnemy & (TF.WAR | TF.ALLIANCE)) return events;

  // Binary line 5429: check flags[ally][enemy] byte+1 bit 0x20 = bit 13 = WAR.
  // i.e. asker must be at war with the proposed enemy.
  const flagsAllyToEnemy = getTreatyFlags(state, allyCiv, enemyCiv);
  if ((flagsAllyToEnemy & TF.WAR) === 0) {
    // Binary lines 5430-5435: asker is NOT at war with enemy.
    // If BOTH us and asker have VENDETTA toward enemy, set INTRUDER on
    // the two outbound directions (us→enemy and asker→enemy). Binary
    // mutates `flags[p1][p2] |= 0x20` and `flags[p3][p2] |= 0x20` —
    // these are ONE-WAY writes (the binary does not also set INTRUDER
    // on flags[enemy][us] / flags[enemy][asker]). Using `addTreatyFlag`
    // here would be bidirectional and incorrectly tag `enemy` as having
    // INTRUDER intent toward us, biasing downstream AI gates.
    const usVendetta = !!(flagsUsToEnemy & TF.VENDETTA);
    const allyVendetta = !!(flagsAllyToEnemy & TF.VENDETTA);
    if (usVendetta && allyVendetta) {
      setTreatyFlags(state, aiCiv, enemyCiv,
        getTreatyFlags(state, aiCiv, enemyCiv) | TF.INTRUDER);
      setTreatyFlags(state, allyCiv, enemyCiv,
        getTreatyFlags(state, allyCiv, enemyCiv) | TF.INTRUDER);
    }
    return events; // no war triggered yet — pending only
  }

  // Binary Branch 2: pending join flag exists — may trigger war
  // Binary lines 5440-5451: human-enemy gate.
  // If `enemy` is HUMAN, AI applies extra rejection criteria so it
  // doesn't gang up on humans recklessly.
  const enemyIsHuman = !!((state.humanPlayers || 0) & (1 << enemyCiv));
  if (enemyIsHuman) {
    // VENDETTA shortcut (line 5441): if we have vendetta toward enemy,
    // skip the extra checks — declare immediately.
    const usVendetta = !!(flagsUsToEnemy & TF.VENDETTA);
    const turnNumber = state.turn?.number || 0;
    if (!usVendetta) {
      // Recent contact check (line 5442-5443):
      //   lastContact[enemy][us] - currentTurn < 6 → reject.
      // v3 stores the table as civs[civ].lastContactTurns[other] (mirrors
      // binary's DAT_0064ca82[civ*0x594 + other*2]).
      const lastContact = state.civs?.[enemyCiv]?.lastContactTurns?.[aiCiv] ?? 0;
      if (lastContact - turnNumber < 6) return events;
      // Power-rank rejection (lines 5446-5448):
      //   if powerRank[enemy] < 7 AND rand() % 3 != 0 → reject.
      const enemyRank = state.powerRanks?.[enemyCiv] ?? 3;
      if (enemyRank < 7) {
        const rng = state.rng;
        const r = rng ? rng.nextInt(3) : Math.floor(Math.random() * 3);
        if (r !== 0) return events;
      }
    }
    // Binary lines 5450-5451: update lastContact[enemy][us] and
    // lastContact[enemy][ally] = currentTurn.
    const enemyCiv_ = state.civs?.[enemyCiv];
    if (enemyCiv_) {
      const arr = [...(enemyCiv_.lastContactTurns || new Array(8).fill(0))];
      arr[aiCiv] = turnNumber;
      arr[allyCiv] = turnNumber;
      state.civs = [...state.civs];
      state.civs[enemyCiv] = { ...enemyCiv_, lastContactTurns: arr };
    }
  }

  // Binary lines 5453-5460: emit JOINWAR popup (UI in binary, event in v3),
  // then declare war p1 → p2 (FUN_00467825 with WAR bit 0x2000).
  const warResult = diplomacyDeclareWar(state, mapBase, aiCiv, enemyCiv, allyCiv);
  events.push(...warResult.events);

  fireDiplomacyEvent(state, DIPLO_EVENTS.HELPME, allyCiv, aiCiv, {
    reason: 'join_war',
    enemy: enemyCiv,
  });

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0055d8d8 — peace-year encounter (full state-mutating port)
//
// Binary block_00550000.c:5479 (7326 bytes). Invoked from per-civ-tick
// FUN_00560084 line 156 when both civs are at peace, no alliance, and
// the global peace-year flag is set, every 16 turns. The function has
// three large UI dialog paths (PARLEY/WARNING/SIGN popups, lines
// 5494-5655) which are inert in headless mode plus the AI-AI
// orchestration body at 5661-5921. This port covers the full body's
// state mutations — entry treaty bits, both-peaceful gate, tech-trade
// invocation, sign-peace, alliance form/cancel via shared-enemy
// search, and war declaration. UI dialog paths are skipped.
// ═══════════════════════════════════════════════════════════════════

/**
 * Faithful port of FUN_0055d8d8 — peace-year diplomatic encounter.
 *
 * Mutates treaty flags + may invoke aiTechTradeNegotiation /
 * processJoinWar. Returns null (binary signature is void).
 *
 * @param {object} state - mutable game state
 * @param {number} civA  - first civ (binary param_1)
 * @param {number} civB  - second civ (binary param_2)
 */
export function aiPeaceYearEncounter(state, civA, civB) {
  // Binary lines 5494-5499: early returns on barbarian / turn-zero.
  if (civA === 0 || civB === 0) return null;
  const turnNumber = state.turn?.number ?? 0;
  if (turnNumber === 0) return null;

  // Binary line 5503: scenario gate (DAT_00627670 + FUN_004fbe84) — passthrough.
  // Binary lines 5506-5655: UI dialog paths skipped.

  // Binary lines 5656-5660: ALWAYS-RUN bidirectional treaty-bit writes.
  const flagsEntry = getTreatyFlags(state, civA, civB);
  const firstContact = (flagsEntry & TF.CONTACT) === 0;
  if (firstContact) {
    // RECENT_CONTACT (0x4000) bidir — line 5657.
    addTreatyFlag(state, civA, civB, TF.RECENT_CONTACT);
  }
  // bVar6 in the binary captures `!CONTACT` here (line 5659) and is reused
  // below as the cadence-override "first contact" override.
  // Line 5660: bidir set CONTACT | PERIODIC_10.
  addTreatyFlag(state, civA, civB, TF.PERIODIC_10 | TF.CONTACT);

  // Binary lines 5661-5666: outer gate.
  //   1) p1 NOT human AND p2 NOT human — already true: per-civ-tick wires
  //      this only for AI-AI pairs.
  //   2) (turn + p1 + p2) & 3 == 0 OR firstContact (line 5663).
  //   3) Scenario civ-3/civ-1 gate (lines 5664-5666) — passthrough.
  if (((turnNumber + civA + civB) & 3) !== 0 && !firstContact) return null;

  // Binary lines 5667-5676: both-peaceful gate.
  //   peaceful(us, them) iff:
  //     shouldDeclareWar(us, them) == 0
  //     OR them has Great Wall (wonder 6) or UN (wonder 24)
  //     OR us.govt > 4 AND no WAR_STARTED toward them
  const peaceful = (us, them) => {
    if (!shouldDeclareWarFull(state, null, us, them)) return true;
    if (civHasWonder(state, them, 6) || civHasWonder(state, them, 24)) return true;
    const usGovt = GOVT_INDEX[state.civs?.[us]?.government] ?? 1;
    const flagsUs = getTreatyFlags(state, us, them);
    if (usGovt > 4 && !(flagsUs & TF.WAR_STARTED)) return true;
    return false;
  };

  if (peaceful(civA, civB) && peaceful(civB, civA)) {
    // Binary line 5677: tech trade between the pair.
    aiTechTradeNegotiation(state, civA, civB, civA);

    const flagsAB = getTreatyFlags(state, civA, civB);
    if ((flagsAB & TF.PEACE) === 0) {
      // Binary lines 5678-5743: NOT yet at PEACE — sign peace.
      // (Binary lines 5679-5742 are dialog popups; line 5743 sets PEACE bidir.)
      // This path is dead under per-civ-tick wiring (which gates on PEACE bit
      // already set), but ported for direct callers / future wiring.
      addTreatyFlag(state, civA, civB, TF.PEACE);
    } else {
      // Binary lines 5745-5865: already at PEACE — alliance form/cancel.
      const alreadyAllied = (flagsAB & TF.ALLIANCE) !== 0;
      const rankA = state.civs?.[civA]?.powerRank ?? 3;
      const rankB = state.civs?.[civB]?.powerRank ?? 3;
      // Binary lines 5746-5755: rank-7 special case flags.
      let rankSeven = false;       // bVar1 in binary
      let alliedActive = alreadyAllied; // bVar6 in binary
      if (rankA === 7 && rankB > 3) { alliedActive = false; rankSeven = true; }
      if (rankB === 7 && rankA > 3) { alliedActive = false; rankSeven = true; }

      const humanMask = state.humanPlayers || 0;
      // Binary uses DAT_00655b08 != 0 = "not Chieftain". v3 stores
      // difficulty as either string or 0/index; treat any truthy value as
      // "not Chieftain" with the existing diplomai.js convention (?? 0).
      const difficultyNonZero = !!(state.difficulty ?? 0) &&
        state.difficulty !== 'chieftain';

      // Binary lines 5757-5793: third-party shared-enemy / mediator search.
      let chosenAlly = -1;          // local_2c
      let alliedThirdCount = 0;     // local_14
      let chosenViaRankSeven = false; // bVar2

      for (let k = 1; k < 8; k++) {
        if (k === civA || k === civB) continue;
        const flagsAK = getTreatyFlags(state, civA, k);
        const flagsBK = getTreatyFlags(state, civB, k);
        const kAlliedEither = (flagsAK & TF.ALLIANCE) !== 0 ||
                              (flagsBK & TF.ALLIANCE) !== 0;
        if (!kAlliedEither) {
          // Binary lines 5764-5771: rank-7 mediator special case.
          // bVar2 = (humanMask&k) AND rank[k]==7 AND difficulty>0
          //         AND civ[k].score>=5 AND turn>=0xc9.
          const rankK = state.civs?.[k]?.powerRank ?? 3;
          const scoreK = state.civs?.[k]?.score ?? 0;
          const kIsHuman = ((1 << k) & humanMask) !== 0;
          chosenViaRankSeven = kIsHuman && rankK === 7 && difficultyNonZero &&
                               scoreK >= 5 && turnNumber >= 0xc9;
          if (chosenViaRankSeven) { chosenAlly = k; break; }

          if (difficultyNonZero) {
            if (alliedActive) {
              // Binary lines 5774-5780: already-allied pair looks for any k
              // where neither side is at PEACE with k.
              if (!(flagsAK & TF.PEACE) && !(flagsBK & TF.PEACE)) {
                chosenAlly = k; break;
              }
            } else if (!rankSeven &&
                       shouldProvoke(state, civA, k) && rankA <= rankK &&
                       shouldProvoke(state, civB, k) && rankB <= rankK) {
              // Binary lines 5782-5786: not-yet-allied pair looks for a
              // shared provokable target stronger than both of us.
              chosenAlly = k; break;
            }
          }
        } else {
          alliedThirdCount += 1;
        }
      }

      // Binary lines 5794-5798: scenario civ-6/civ-7 special case (skip).

      // Binary lines 5799-5818: cancel alliance branch decision.
      // The threshold compares civ[DAT_00655b03] +0x1E byte against
      // alliedThirdCount. DAT_00655b03 is the per-civ-tick "active" civ
      // (== civA in our wiring) and +0x1E is a per-civ tolerance/score
      // byte. Use civA's powerRank as the closest available proxy.
      const activeRank = state.civs?.[civA]?.powerRank ?? 3;
      if (chosenAlly < 1 ||
          ((!chosenViaRankSeven || activeRank < alliedThirdCount) &&
           alliedThirdCount !== 0 && !alliedActive)) {
        // Binary line 5817: bidir clear ALLIANCE bit.
        if (alreadyAllied) {
          clearTreatyFlag(state, civA, civB, TF.ALLIANCE);
        }
      } else {
        // Binary lines 5819-5864: form / maintain alliance branch.
        if (!alreadyAllied) {
          // Binary lines 5849-5851: process JOIN_WAR with the new ally
          // against the partner's enemies. Binary gates this on dialog
          // visibility (UI gate at 5822-5830); we always run for state
          // mutation parity in headless.
          processJoinWar(state, null, civA, chosenAlly, civB);
          processJoinWar(state, null, civB, chosenAlly, civA);
          // Binary lines 5853-5860: human-only INTRUDER/0x10000 set on
          // third party — dead in headless (humanMask&k == 0). Skipped.
        }
        // Binary line 5863: bidir set ALLIANCE.
        addTreatyFlag(state, civA, civB, TF.ALLIANCE);
      }
    }
  } else if (((getTreatyFlags(state, civA, civB) & TF.WAR) === 0) || firstContact) {
    // Binary lines 5867-5919: war declaration branch.
    // Lines 5868-5912 are popup-gated UI (skipped in headless).
    // Line 5913: bidir clear PEACE.
    clearTreatyFlag(state, civA, civB, TF.PEACE);
    // Line 5914: bidir set 0x2000 = WAR.
    addTreatyFlag(state, civA, civB, TF.WAR);
    // Lines 5915-5918: VENDETTA → WAR_STARTED transition. Binary clears
    // VENDETTA bidir then sets WAR_STARTED ONE-WAY (raw |= on civA→civB).
    const f2 = getTreatyFlags(state, civA, civB);
    if (f2 & TF.VENDETTA) {
      clearTreatyFlag(state, civA, civB, TF.VENDETTA);
      setTreatyFlags(state, civA, civB,
                     getTreatyFlags(state, civA, civB) | TF.WAR_STARTED);
    }
  }

  return null;
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

  // Hostility convention: low byte = friendly. Accept ceasefire if hostility
  // is anything less than "mostly hostile" (< 70).
  if (attitude < 70) {
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
      // Hostility convention: alliance requires LOW hostility (friendly).
      // Reject unless hostility < 30 (Worshipful/Enthusiastic/Cordial tier).
      if (attitude >= 30) {
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
        // Provocation → hostility bump
        actions.push(makeAttitudeAction(civSlot, other, +30));
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
// and hostility byte is high (isHostile, level > 4 = raw > ~61):
// break peace and declare war.
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
// Break if: hostility byte is at least Receptive (not friendly tier 1-3),
// military power > ally's * 2, no shared war. Cancel alliance → peace.
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
    // Bump attitude byte to maximum hostility (+100 → clamps to 100 = furious).
    actions.push(makeAttitudeAction(civSlot, target, +100));

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
            // Set initial attitude based on leader personalities.
            // Hostility convention: friendlier = NEGATIVE delta, wary = POSITIVE.
            const ourPers = getPersonality(gameState, civSlot);
            const theirPers = getPersonality(gameState, i);
            let initialDelta = 0;
            if (ourPers.militarism < 0) initialDelta -= 10;        // we're peaceful → friendlier
            if (theirPers.militarism < 0) initialDelta -= 5;       // they're peaceful → friendlier
            if (ourPers.militarism > 0 && theirPers.militarism > 0) {
              initialDelta += 10; // two aggressive civs start wary → bump hostility
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
      // Only one war declaration per turn (from FUN_0055d8d8 behavior).
      // Faithful port: delegate to shouldDeclareWarFull (FUN_0055cbd5).
      if (!declaredWar && shouldDeclareWarFull(gameState, mapBase, civSlot, i)) {
        const action = { type: 'DECLARE_WAR', targetCiv: i };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) {
          actions.push(action);
          // War declaration worsens attitudes → bump hostility both ways
          actions.push(makeAttitudeAction(civSlot, i, +40));
          actions.push(makeAttitudeAction(i, civSlot, +40));
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
            // Spontaneous war → bump hostility
            actions.push(makeAttitudeAction(civSlot, i, +30));
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
      if (shouldProposePeace(civSlot, i, gameState, mapBase)) {
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
              // Grovel: large warming gesture (desperate for peace) → friendlier
              actions.push(makeAttitudeAction(civSlot, i, -40));
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
              // Peace proposal improves attitude → friendlier
              actions.push(makeAttitudeAction(civSlot, i, -20));
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
