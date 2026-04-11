// ═══════════════════════════════════════════════════════════════════
// diplomacy.js — Diplomatic transaction functions (shared: server + client)
//
// Phase E: Core diplomacy state mutations for treaty changes,
// war declarations, alliance cascades, and asset transfers.
//
// Phase G.1-G.5: Treaty expiration timers, military withdrawal,
// alliance shared visibility, full executeTransaction, reputation system.
//
// Ported from decompiled Civ2 functions:
//   FUN_0045ac71 — diplo_declare_war
//   FUN_0045a7a8 — diplo_sign_ceasefire
//   FUN_0045a6ab — diplo_sign_peace_treaty
//   FUN_0045a535 — diplo_form_alliance
//   FUN_0045a8e3 — diplo_activate_alliance_wars
//   FUN_004dd285 — parley_execute_transaction
//   FUN_004de0e2 — parley_transfer_city
// ═══════════════════════════════════════════════════════════════════

import { CITY_RADIUS_DOUBLED, LEADER_PERSONALITY, DIFFICULTY_KEYS, ADVANCE_EPOCH, ADVANCE_PREREQS, ADVANCE_AI_INTEREST, UNIT_COSTS, WONDER_PREREQS, GOVT_INDEX, UNIT_DOMAIN } from './defs.js';
import { hasWonderEffect, civHasWonder, refreshCityTileOwnership } from './utils.js';
import { grantAdvance } from './research.js';
import { updateVisibility } from './visibility.js';
import { resetSpaceship } from './spaceship.js';
import { createNewCiv } from './init.js';

// ── D.1: Treaty Flag Constants (binary convention) ────────────────
// These match the 32-bit treaty flag word from the decompiled binary.
// Each civ pair has a directional flag word: treatyFlags[A][B] !== treatyFlags[B][A]
export const TF = {
  CONTACT:           0x01,     // Civs have met
  CEASEFIRE:         0x02,     // Ceasefire active
  PEACE:             0x04,     // Peace treaty active
  ALLIANCE:          0x08,     // Alliance active
  VENDETTA:          0x10,     // War grudge / embassy expelled
  INTRUDER:          0x20,     // Shared intelligence flag
  HOSTILITY:         0x40,     // Transient hostility
  EMBASSY:           0x80,     // Embassy established
  NUKE_AWARENESS:    0x100,    // Aware of nuclear weapons
  PERIODIC_10:       0x400,    // Set on first contact
  WAR_STARTED:       0x800,    // War just started / betrayal
  CAPTURE_VENDETTA:  0x1000,   // City capture vendetta
  WAR:               0x2000,   // Formally at war
  RECENT_CONTACT:    0x4000,   // Recent contact
  CAPTURE_NOTIFY:    0x10000,  // City captured notification
  NUCLEAR_ATTACK:    0x20000,  // Nuclear attack perpetrated
  TRIBUTE_DEMANDED:  0x40000,  // Tribute demanded
  PERIODIC_FLAG_19:  0x80000,  // Periodic flag (cleared every 32 turns)
  WAR_TRACKING:      0x200000, // War tracking (set when WAR is declared)
  MULTI_CAPTURE_VENDETTA: 0x400000,  // Multi-city capture vendetta
  DIPLOMACY_ACTIVE:  0x800000,  // Diplomacy session currently active
  SPY_MISSION_ACTIVE: 0x1000000, // Spy/diplomat mission in progress
  // Note: SPACESHIP_LAUNCHED was 0x100, conflicting with NUKE_AWARENESS.
  // Removed to avoid the constant collision. Spaceship status is tracked
  // separately in the civ record, not in the treaty flags.
};

// ── D.2: Attitude Scoring Constants ──────────────────────────────
export const ATTITUDE = {
  LARGE_TECH_GAP: 8,
  LATE_GAME_TURN: 200,
  PERSONALITY_FLOOR: -2,
  MIL_1_5X: 1.5,
  MIL_2X: 2,
  MIL_4X: 4,
  ALLIANCE_VIOLATION_MAX: 100,
  CEASEFIRE_VIOLATION: 50,
  ALLIANCE_FLOOR: 0,
  CEASEFIRE_PENALTY: -2,
  NO_ALLIANCE_PENALTY: -1,
};

// ── D.3: Attitude Thresholds ────────────────────────────────────
export const ATTITUDE_THRESHOLDS = {
  MAX_HOSTILITY: 100,
  CEASEFIRE_VIOLATION: 50,
  ALLIANCE_FLOOR: 0,
  ALLIANCE_PROPOSAL_GATE: 6,
};

// ── D.4a: Attitude Level ────────────────────────────────────────
// Convert a raw attitude score to a discrete level 0-8.
// Level names: 0=Enraged, 1=Furious, 2=Annoyed, 3=Uncooperative,
//   4=Neutral, 5=Cordial, 6=Polite, 7=Enthusiastic, 8=Worshipful
const ATTITUDE_BRACKETS = [
  [  0, 0], // <0 → 0 (Enraged)
  [ 10, 1], // 0-10 → 1 (Furious)
  [ 25, 2], // 11-25 → 2 (Annoyed)
  [ 38, 3], // 26-38 → 3 (Uncooperative)
  [ 61, 4], // 39-61 → 4 (Neutral)
  [ 74, 5], // 62-74 → 5 (Cordial)
  [ 89, 6], // 75-89 → 6 (Polite)
  [ 99, 7], // 90-99 → 7 (Enthusiastic)
];

/**
 * Map a raw attitude score to a discrete level 0-8.
 * @param {number} rawScore
 * @returns {number} 0 (Enraged) through 8 (Worshipful)
 */
export function getAttitudeLevel(rawScore) {
  if (rawScore < 0)   return 0;
  if (rawScore <= 10)  return 1;
  if (rawScore <= 25)  return 2;
  if (rawScore <= 38)  return 3;
  if (rawScore <= 61)  return 4;
  if (rawScore <= 74)  return 5;
  if (rawScore <= 89)  return 6;
  if (rawScore <= 99)  return 7;
  return 8;
}

/** Returns true if the attitude level is hostile (< Neutral). */
export function isHostile(level) { return level < 4; }

/** Returns true if the attitude level is friendly (> Neutral). */
export function isFriendly(level) { return level > 4; }

/** Convert string treaty status to flag bits. */
export function statusToFlags(status) {
  switch (status) {
    case 'alliance':  return TF.CONTACT | TF.ALLIANCE;
    case 'peace':     return TF.CONTACT | TF.PEACE;
    case 'ceasefire': return TF.CONTACT | TF.CEASEFIRE;
    case 'war':       return TF.CONTACT | TF.WAR;
    default:          return 0;
  }
}

/** Convert treaty flags to string status (highest treaty wins). */
export function flagsToStatus(flags) {
  if (flags & TF.ALLIANCE) return 'alliance';
  if (flags & TF.PEACE) return 'peace';
  if (flags & TF.CEASEFIRE) return 'ceasefire';
  if (flags & TF.CONTACT) return 'war';
  return 'war';
}

/** Get treaty flags for a civ pair. */
export function getTreatyFlags(state, civA, civB) {
  if (!state.treatyFlags) return 0;
  const key = `${civA}-${civB}`;
  return state.treatyFlags[key] || 0;
}

// ── Cascade masks for treaty flag setting/clearing ──
// When setting WAR, clear these treaty flags:
const WAR_CLEARS = TF.CEASEFIRE | TF.PEACE | TF.ALLIANCE;
// When setting PEACE or CEASEFIRE, clear these hostility flags:
// Binary uses 0x2a60: WAR | WAR_STARTED | 0x200 | HOSTILITY | INTRUDER
const PEACE_CLEARS = TF.WAR | TF.WAR_STARTED | 0x200 | TF.HOSTILITY | TF.INTRUDER;

/**
 * Set treaty flags for a civ pair (directional).
 * Low-level setter: writes raw flags for a single direction [A][B].
 * For cascade-aware symmetric operations, use addTreatyFlag / clearTreatyFlag.
 */
export function setTreatyFlags(state, civA, civB, flags) {
  if (!state.treatyFlags) state.treatyFlags = {};
  state.treatyFlags = { ...state.treatyFlags, [`${civA}-${civB}`]: flags };
}

/**
 * Add flag bits to a civ pair's treaty (cascade-aware, symmetric).
 *
 * Binary FUN_00467825 (block_00460000.c:1459-1477) — three INDEPENDENT
 * if-statements (not mutually exclusive) that compute cascading sets/clears
 * before applying:
 *   if (flag & ALLIANCE):           also set PEACE                      (0x4)
 *   if (flag & 0xe = CF|PE|AL):     clear war flags 0x2a60 from pair
 *   if (flag & WAR):                clear treaty bits 0xe from pair,
 *                                   add WAR_TRACKING (0x200000) to flag
 * After cascades, the final flag word is OR'd into BOTH directions of the
 * pair. JS additionally OR's TF.CONTACT into peace/ceasefire/alliance sets
 * because callers don't always pre-set CONTACT (the binary always does).
 *
 * The previous JS used an else-if chain which only handled the FIRST matching
 * branch — compound masks like (ALLIANCE|WAR) would miss the WAR cascade.
 */
export function addTreatyFlag(state, civA, civB, flag) {
  // Compute the effective cascade exactly as the binary does.
  let toSet = flag;
  let toClear = 0;

  // (1) ALLIANCE recursion → also set PEACE
  if (toSet & TF.ALLIANCE) {
    toSet |= TF.PEACE;
  }
  // (2) Any treaty bit (CEASEFIRE|PEACE|ALLIANCE = 0xe) → clear war flags 0x2a60
  if (toSet & (TF.CEASEFIRE | TF.PEACE | TF.ALLIANCE)) {
    toClear |= PEACE_CLEARS; // = WAR | WAR_STARTED | 0x200 | HOSTILITY | INTRUDER
    toSet |= TF.CONTACT;     // JS convention: peace implies contact
  }
  // (3) WAR → clear treaty flags 0xe, add WAR_TRACKING
  if (toSet & TF.WAR) {
    toClear |= TF.CEASEFIRE | TF.PEACE | TF.ALLIANCE;
    toSet |= TF.WAR_TRACKING;
  }

  let ab = getTreatyFlags(state, civA, civB);
  let ba = getTreatyFlags(state, civB, civA);
  // Order: clear first, then set (matches binary execution order: cascaded
  // FUN_00467750 calls clear before the final OR).
  ab = (ab & ~toClear) | toSet;
  ba = (ba & ~toClear) | toSet;

  if (!state.treatyFlags) state.treatyFlags = {};
  state.treatyFlags = {
    ...state.treatyFlags,
    [`${civA}-${civB}`]: ab,
    [`${civB}-${civA}`]: ba,
  };

  // Sync string-based treaty to match the updated flags
  if (toSet & (TF.ALLIANCE | TF.PEACE | TF.CEASEFIRE | TF.WAR)) {
    if (!state.treaties) state.treaties = {};
    state.treaties = { ...state.treaties, [treatyKey(civA, civB)]: flagsToStatus(ab) };
  }
}

/**
 * Clear flag bits from a civ pair's treaty (cascade-aware, symmetric).
 *
 * Binary FUN_00467750 (block_00460000.c:1429-1450) — three independent
 * if-statements (NOT mutually exclusive) that each cascade additional bits
 * before clearing:
 *   PEACE   (0x4)    -> recursively clear ALLIANCE (0x8)
 *   WAR     (0x2000) -> recursively clear WAR_STARTED + CAPTURE_VENDETTA (0x1800)
 *   CONTACT (0x1)    -> recursively clear WAR — which itself recurses to clear 0x1800
 * After all cascades, the cleaned mask is removed from BOTH directions of the
 * treaty matrix.
 *
 * Note: a compound mask like (PEACE | WAR) must trigger BOTH cascades, hence
 * three independent ifs rather than else-if. The previous JS used else-if and
 * also wholesale-zeroed the pair when CONTACT was cleared, which over-cleared
 * bits like EMBASSY/VENDETTA/NUCLEAR_ATTACK that the binary preserves.
 */
export function clearTreatyFlag(state, civA, civB, flag) {
  // Build the effective mask by walking the same cascade the binary does.
  let effective = flag;
  if (effective & TF.PEACE) {
    effective |= TF.ALLIANCE;
  }
  if (effective & TF.CONTACT) {
    // CONTACT cascades to WAR (which then cascades to WAR_STARTED+CAPTURE_VENDETTA)
    effective |= TF.WAR;
  }
  if (effective & TF.WAR) {
    effective |= TF.WAR_STARTED | TF.CAPTURE_VENDETTA;
  }

  let ab = getTreatyFlags(state, civA, civB);
  let ba = getTreatyFlags(state, civB, civA);
  ab &= ~effective;
  ba &= ~effective;

  if (!state.treatyFlags) state.treatyFlags = {};
  state.treatyFlags = {
    ...state.treatyFlags,
    [`${civA}-${civB}`]: ab,
    [`${civB}-${civA}`]: ba,
  };

  // Sync string-based treaty to match the updated flags. When CONTACT is
  // cleared the pair is no longer in any relationship, so revert to default
  // (binary's flagsToStatus returns 'war' for a pair with no CONTACT bit).
  if (effective & (TF.CONTACT | TF.ALLIANCE | TF.PEACE | TF.CEASEFIRE | TF.WAR)) {
    if (!state.treaties) state.treaties = {};
    state.treaties = { ...state.treaties, [treatyKey(civA, civB)]: flagsToStatus(ab) };
  }
}

// ── Helpers ──────────────────────────────────────────────────────

/** Get the canonical treaty key for a civ pair (lower index first). */
function treatyKey(civA, civB) {
  return civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
}

/** Get current treaty status between two civs. */
function getTreaty(state, civA, civB) {
  if (!state.treaties) return 'war';
  return state.treaties[treatyKey(civA, civB)] || 'war';
}

/** Check if two civs have made contact (treaty entry exists). */
function haveContact(state, civA, civB) {
  if (!state.treaties) return false;
  return state.treaties[treatyKey(civA, civB)] !== undefined;
}

/** Set treaty status between two civs. Records treatyTurn for expiration tracking. */
function setTreaty(state, civA, civB, status) {
  if (!state.treaties) state.treaties = {};
  state.treaties = { ...state.treaties, [treatyKey(civA, civB)]: status };
  // G.1: Record turn when treaty was signed (for ceasefire expiration)
  if (!state.treatyTurns) state.treatyTurns = {};
  state.treatyTurns = { ...state.treatyTurns, [treatyKey(civA, civB)]: state.turn?.number || 0 };
  // Sync flag-based treaty to match the string status
  // Preserve existing non-treaty flags (embassy, vendetta, etc.) while
  // updating the treaty-level bits (ALLIANCE/PEACE/CEASEFIRE/WAR/CONTACT)
  const TREATY_MASK = TF.ALLIANCE | TF.PEACE | TF.CEASEFIRE | TF.WAR | TF.CONTACT;
  const newBits = statusToFlags(status);
  let ab = getTreatyFlags(state, civA, civB);
  let ba = getTreatyFlags(state, civB, civA);
  ab = (ab & ~TREATY_MASK) | newBits;
  ba = (ba & ~TREATY_MASK) | newBits;
  if (!state.treatyFlags) state.treatyFlags = {};
  state.treatyFlags = {
    ...state.treatyFlags,
    [`${civA}-${civB}`]: ab,
    [`${civB}-${civA}`]: ba,
  };
}

/** Ensure diplomacy tracking object exists for a civ pair. */
function ensureDiplomacy(state, civA, civB) {
  if (!state.diplomacy) state.diplomacy = {};
  const key = `${civA}-${civB}`;
  if (!state.diplomacy[key]) {
    state.diplomacy = { ...state.diplomacy, [key]: {} };
  }
  return key;
}

/** Get attitude of civSlot toward targetCiv. */
function getAttitude(state, civSlot, targetCiv) {
  return state.civs?.[civSlot]?.attitudes?.[targetCiv] ?? 0;
}

/** Modify attitude of civSlot toward targetCiv by delta, clamped [-100, 100]. */
export function adjustAttitude(state, civSlot, targetCiv, delta) {
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
  // Binary clamps to [0, 100] — negative attitudes don't exist in Civ2
  civ.attitudes[targetCiv] = Math.max(0, Math.min(100, cur + delta));
  state.civs[civSlot] = civ;
}

/**
 * Convert gold amount to attitude delta using diminishing returns.
 * Binary FUN_0045b472: first 50g → att/10, then 100g batches → att/(10+5n).
 * E.g. 50g=5att, next 100g≈6.67att, next 100g=5att, etc.
 * @param {number} gold - gold amount
 * @returns {number} attitude delta (positive)
 */
export function goldToAttitude(gold) {
  let result = 0;
  let divisor = 10;
  let threshold = 50;
  while (gold > 0) {
    const batch = Math.max(0, Math.min(gold, threshold));
    result += Math.trunc(batch / divisor);
    divisor += 5;
    gold -= threshold;
    threshold = 100;
  }
  return result;
}

/** Increment a civ's patience counter (reputation damage tracker). */
function incrementPatience(state, civSlot) {
  if (!state.civs?.[civSlot]) return;
  state.civs = [...state.civs];
  const civ = { ...state.civs[civSlot] };
  civ.patience = (civ.patience || 0) + 1;
  state.civs[civSlot] = civ;
}

/** Clamp attitude to [min, max]. */
function clampAttitude(state, civSlot, targetCiv, min, max) {
  if (!state.civs?.[civSlot]?.attitudes) return;
  state.civs = [...state.civs];
  const civ = { ...state.civs[civSlot] };
  if (!Array.isArray(civ.attitudes)) {
    const old = civ.attitudes;
    civ.attitudes = [0, 0, 0, 0, 0, 0, 0, 0];
    if (old) for (const [k, v] of Object.entries(old)) civ.attitudes[+k] = v;
  } else {
    civ.attitudes = [...civ.attitudes];
  }
  const cur = civ.attitudes[targetCiv] ?? 0;
  civ.attitudes[targetCiv] = Math.max(min, Math.min(max, cur));
  state.civs[civSlot] = civ;
}

/** Check if civSlot is a human player. */
function isHuman(state, civSlot) {
  return !!(state.civs?.[civSlot]?.isHuman);
}

/**
 * Randomize a civ's attitude toward another civ in the direction of 50.
 * Binary: attitude = clamp(rand_between(attitude, 0x32), 0, 100)
 * This picks a random value between the current attitude and 50, then clamps [0, 100].
 * Used when signing peace treaties and ceasefires (spec sections 2.5, 2.6).
 */
function randomizeAttitudeToward50(state, civSlot, targetCiv) {
  if (!state.civs?.[civSlot]) return;
  const cur = state.civs[civSlot].attitudes?.[targetCiv] ?? 0;
  const target = 50;
  // rand_between(a, b) returns a random integer in [min(a,b), max(a,b)]
  const lo = Math.min(cur, target);
  const hi = Math.max(cur, target);
  const rng = state.rng;
  const newVal = lo + (rng ? rng.nextInt(hi - lo + 1) : Math.floor(Math.random() * (hi - lo + 1)));
  // Set attitude (clamped 0-100)
  state.civs = [...state.civs];
  const civ = { ...state.civs[civSlot] };
  if (!Array.isArray(civ.attitudes)) {
    const old = civ.attitudes;
    civ.attitudes = [0, 0, 0, 0, 0, 0, 0, 0];
    if (old) for (const [k, v] of Object.entries(old)) civ.attitudes[+k] = v;
  } else {
    civ.attitudes = [...civ.attitudes];
  }
  civ.attitudes[targetCiv] = Math.max(0, Math.min(100, newVal));
  state.civs[civSlot] = civ;
}

// ── G.5: Reputation helpers ──
//
// Binary reputation model (spec section 5.1):
//   DAT_0064c6be — one byte per civ, starts at 0.
//   Higher value = more past treaty violations = WORSE standing.
//   Incremented by +1 per violation condition (rank/difficulty/third-party).
//   Used in AI trust formula: trust = reputation[other] - treaty_violations[other][self]
//
// Binary treaty_violations model (spec section 1.1, DAT_0064c6e8):
//   Signed byte per civ pair. Negative = good standing, positive = violations.
//   Decremented (worsened) when human player breaks a treaty.

/** Ceasefire expiration threshold in turns. */
export const CEASEFIRE_EXPIRE_TURNS = 16;
/** Withdrawal deadline after peace treaty (turns). */
export const WITHDRAWAL_DEADLINE_TURNS = 2;
/** Reputation decay interval (turns between +1 recovery). */
export const REPUTATION_DECAY_INTERVAL = 16;

/**
 * Adjust a civ's reputation by delta, clamped to [0, 100].
 * Lower reputation = less trustworthy (kept for backward compat).
 */
function adjustReputation(state, civSlot, delta) {
  if (!state.civs?.[civSlot]) return;
  state.civs = [...state.civs];
  const civ = { ...state.civs[civSlot] };
  const cur = civ.reputation ?? 100;
  civ.reputation = Math.max(0, Math.min(100, cur + delta));
  state.civs[civSlot] = civ;
}

/**
 * Increment a civ's binary-faithful reputation counter by 1.
 * Binary: reputation[civ] += 1 (higher = worse, counts treaty violations).
 * Spec section 5.1: DAT_0064c6be, one byte, 0-255.
 */
function incrementReputation(state, civSlot) {
  if (!state.civs?.[civSlot]) return;
  state.civs = [...state.civs];
  const civ = { ...state.civs[civSlot] };
  civ.reputationCounter = Math.min(255, (civ.reputationCounter ?? 0) + 1);
  state.civs[civSlot] = civ;
}

/**
 * Adjust per-pair treaty violation counter.
 * Binary: treaty_violations[violator][target] += delta (signed byte).
 * Spec section 4.1: decremented (delta = -1) when human breaks treaty.
 */
function adjustTreatyViolations(state, violator, target, delta) {
  if (!state.civs?.[violator]) return;
  state.civs = [...state.civs];
  const civ = { ...state.civs[violator] };
  if (!civ.treatyViolations || !Array.isArray(civ.treatyViolations)) {
    civ.treatyViolations = [0, 0, 0, 0, 0, 0, 0, 0];
  } else {
    civ.treatyViolations = [...civ.treatyViolations];
  }
  civ.treatyViolations[target] = Math.max(-128, Math.min(127,
    (civ.treatyViolations[target] || 0) + delta));
  state.civs[violator] = civ;
}

/**
 * Get a civ's current reputation score.
 * @param {object} state
 * @param {number} civSlot
 * @returns {number} reputation 0-100 (100 = perfect)
 */
export function getReputation(state, civSlot) {
  return state.civs?.[civSlot]?.reputation ?? 100;
}

/**
 * Check if a civ's reputation is too low for treaty acceptance.
 * Threshold: reputation < 40 means other civs refuse treaties.
 * @param {object} state
 * @param {number} civSlot
 * @returns {boolean} true if reputation is too low
 */
export function isReputationTooLow(state, civSlot) {
  return getReputation(state, civSlot) < 40;
}

/**
 * Get a civ's current patience value.
 * Patience decays by 1 every 3 turns (min 0) and is incremented
 * by treaty violations / provocations.
 * @param {object} state
 * @param {number} civSlot
 * @returns {number} patience value (0+)
 */
export function getPatience(state, civSlot) {
  return state.civs?.[civSlot]?.patience || 0;
}

/**
 * Process diplomacy timers for END_TURN. Called from reducer.js.
 *
 * Handles:
 *   G.1: Ceasefire expiration (16 turns)
 *   G.2: Military withdrawal deadline enforcement
 *   G.3: Alliance shared visibility per-turn update
 *   G.5: Reputation decay (+1 per 16 turns toward 100)
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} turnNumber - current turn number
 * @returns {object[]} events generated
 */
export function processDiplomacyTimers(state, mapBase, turnNumber) {
  const events = [];

  if (!state.treaties) return events;

  const keys = Object.keys(state.treaties);

  for (const key of keys) {
    const treaty = state.treaties[key];
    const [aStr, bStr] = key.split('-');
    const civA = +aStr;
    const civB = +bStr;

    // Skip dead civs
    if (!(state.civsAlive & (1 << civA)) || !(state.civsAlive & (1 << civB))) continue;

    // G.1: Ceasefire expiration after 16 turns
    if (treaty === 'ceasefire') {
      const signedTurn = state.treatyTurns?.[key] ?? 0;
      if (turnNumber - signedTurn >= CEASEFIRE_EXPIRE_TURNS) {
        // Expire ceasefire → revert to no-treaty (war)
        state.treaties = { ...state.treaties };
        delete state.treaties[key];
        // Clean up treatyTurns too
        if (state.treatyTurns) {
          state.treatyTurns = { ...state.treatyTurns };
          delete state.treatyTurns[key];
        }
        events.push({
          type: 'ceasefireExpired',
          civA,
          civB,
          turn: turnNumber,
        });
      }
    }

    // G.2: Military withdrawal enforcement
    if (treaty === 'peace' && state.withdrawalDeadlines?.[key] != null) {
      const deadline = state.withdrawalDeadlines[key];
      if (turnNumber >= deadline) {
        // Check if either civ has units in the other's territory
        const aInB = hasUnitsInTerritory(state, mapBase, civA, civB);
        const bInA = hasUnitsInTerritory(state, mapBase, civB, civA);

        if (aInB || bInA) {
          // Treaty auto-breaks — declare war
          setTreaty(state, civA, civB, 'war');
          // Clear the withdrawal deadline
          state.withdrawalDeadlines = { ...state.withdrawalDeadlines };
          delete state.withdrawalDeadlines[key];
          // Wake units
          wakeUnitsNearEnemy(state, mapBase, civA, civB);
          wakeUnitsNearEnemy(state, mapBase, civB, civA);
          // Cancel trade routes
          cancelTradeRoutes(state, civA, civB);
          events.push({
            type: 'peaceBrokenWithdrawal',
            civA,
            civB,
            turn: turnNumber,
            violator: aInB ? civA : civB,
          });
        } else {
          // Withdrawal complete — remove deadline
          state.withdrawalDeadlines = { ...state.withdrawalDeadlines };
          delete state.withdrawalDeadlines[key];
        }
      }
    }

    // G.3: Alliance shared visibility per-turn update
    if (treaty === 'alliance' && mapBase?.tileData) {
      shareAllianceVisibility(state, mapBase, civA, civB);
    }
  }

  // G.5: Reputation decay — binary FUN_00487371 (process_end_of_turn) lines 1823-1841.
  // Decay interval: (difficulty + 1) * 12 turns. Chieftain=12, Deity=72.
  // Note: binary scale is 0-7 (0=spotless, 7=atrocities), JS scale is 0-100
  // (0=worst, 100=best); JS recovers +1 toward 100, semantically same as
  // binary decrementing toward 0.
  const diffIdxRep = Math.max(0, DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain'));
  const repDecayInterval = (diffIdxRep + 1) * 12;
  if (turnNumber > 0 && (turnNumber % repDecayInterval) === 0) {
    if (state.civs) {
      state.civs = [...state.civs];
      for (let c = 1; c <= 7; c++) {
        if (!(state.civsAlive & (1 << c))) continue;
        const civ = state.civs[c];
        if (!civ) continue;
        const rep = civ.reputation ?? 100;
        if (rep < 100) {
          state.civs[c] = { ...civ, reputation: Math.min(100, rep + 1) };
        }
      }
    }
  }

  // Patience decay — every 3 turns, decrement patience by 1 for all civs (min 0)
  if (turnNumber > 0 && (turnNumber % 3) === 0) {
    if (state.civs) {
      // Avoid re-spreading if already done above
      if (!Array.isArray(state.civs) || Object.isFrozen(state.civs)) {
        state.civs = [...state.civs];
      }
      for (let c = 1; c <= 7; c++) {
        if (!(state.civsAlive & (1 << c))) continue;
        const civ = state.civs[c];
        if (!civ) continue;
        const pat = civ.patience || 0;
        if (pat > 0) {
          state.civs[c] = { ...civ, patience: pat - 1 };
        }
      }
    }
  }

  // ── Periodic treaty flag clearing ──
  // Port of FUN_0055d8d8 periodic housekeeping: clear transient flags
  // at different intervals to prevent stale state accumulation.
  if (state.treatyFlags && turnNumber > 0) {
    let flagsMutated = false;

    // Every 8 turns: clear WAR_STARTED (0x800) for all civ pairs
    if ((turnNumber % 8) === 0) {
      for (let a = 1; a <= 7; a++) {
        for (let b = a + 1; b <= 7; b++) {
          if (!(state.civsAlive & (1 << a)) || !(state.civsAlive & (1 << b))) continue;
          const kAB = `${a}-${b}`;
          const kBA = `${b}-${a}`;
          if ((state.treatyFlags[kAB] || 0) & TF.WAR_STARTED) {
            if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
            state.treatyFlags[kAB] = (state.treatyFlags[kAB] || 0) & ~TF.WAR_STARTED;
          }
          if ((state.treatyFlags[kBA] || 0) & TF.WAR_STARTED) {
            if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
            state.treatyFlags[kBA] = (state.treatyFlags[kBA] || 0) & ~TF.WAR_STARTED;
          }
        }
      }
    }

    // Every 16 turns: clear RECENT_CONTACT (0x4000)
    if ((turnNumber % 16) === 0) {
      for (let a = 1; a <= 7; a++) {
        for (let b = a + 1; b <= 7; b++) {
          if (!(state.civsAlive & (1 << a)) || !(state.civsAlive & (1 << b))) continue;
          const kAB = `${a}-${b}`;
          const kBA = `${b}-${a}`;
          if ((state.treatyFlags[kAB] || 0) & TF.RECENT_CONTACT) {
            if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
            state.treatyFlags[kAB] = (state.treatyFlags[kAB] || 0) & ~TF.RECENT_CONTACT;
          }
          if ((state.treatyFlags[kBA] || 0) & TF.RECENT_CONTACT) {
            if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
            state.treatyFlags[kBA] = (state.treatyFlags[kBA] || 0) & ~TF.RECENT_CONTACT;
          }
        }
      }
    }

    // Every 32 turns: clear PERIODIC_FLAG_19 (0x80000) and TRIBUTE_DEMANDED (0x40000)
    if ((turnNumber % 32) === 0) {
      for (let a = 1; a <= 7; a++) {
        for (let b = a + 1; b <= 7; b++) {
          if (!(state.civsAlive & (1 << a)) || !(state.civsAlive & (1 << b))) continue;
          const clearMask = TF.PERIODIC_FLAG_19 | TF.TRIBUTE_DEMANDED;
          const kAB = `${a}-${b}`;
          const kBA = `${b}-${a}`;
          if ((state.treatyFlags[kAB] || 0) & clearMask) {
            if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
            state.treatyFlags[kAB] = (state.treatyFlags[kAB] || 0) & ~clearMask;
          }
          if ((state.treatyFlags[kBA] || 0) & clearMask) {
            if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
            state.treatyFlags[kBA] = (state.treatyFlags[kBA] || 0) & ~clearMask;
          }
        }
      }
    }
  }

  // ── Senate override toggle ──
  // Every turn, 1/3 chance to toggle senate override flag on each civ.
  // In the binary, the senate can block war declarations for democracies/republics;
  // this random toggle simulates political instability events.
  if (state.civs) {
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      const civ = state.civs[c];
      if (!civ) continue;
      const govt = civ.government;
      if (govt !== 'republic' && govt !== 'democracy') continue;
      // Use deterministic hash if no RNG to keep saves reproducible
      const roll = ((turnNumber * 7 + c * 13) % 3);
      if (roll === 0) {
        if (!Array.isArray(state.civs) || Object.isFrozen(state.civs)) {
          state.civs = [...state.civs];
        }
        state.civs[c] = { ...civ, senateOverride: !civ.senateOverride };
      }
    }
  }

  return events;
}

/**
 * Check if civSlot has any units on tiles owned by territoryCiv.
 */
function hasUnitsInTerritory(state, mapBase, civSlot, territoryCiv) {
  if (!state.units || !mapBase.tileData) return false;
  for (const u of state.units) {
    if (!u || u.owner !== civSlot || u.gx < 0) continue;
    const idx = u.gy * mapBase.mw + u.gx;
    const tile = mapBase.tileData[idx];
    if (tile && tile.tileOwnership === territoryCiv) return true;
  }
  return false;
}

/**
 * G.3: Share current visibility between allied civs (per-turn update).
 * Each civ sees what the other sees from their units and cities.
 */
function shareAllianceVisibility(state, mapBase, civA, civB) {
  const bitA = 1 << civA;
  const bitB = 1 << civB;

  // Share visibility from units and cities of each allied civ
  // Update tile visibility: if A can see it, B can too (and vice versa)
  if (state.units) {
    for (const u of state.units) {
      if (!u || u.gx < 0) continue;
      if (u.owner === civA) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civB, u.gx, u.gy, mapBase.wraps);
      } else if (u.owner === civB) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civA, u.gx, u.gy, mapBase.wraps);
      }
    }
  }
  if (state.cities) {
    for (const c of state.cities) {
      if (!c || c.size <= 0) continue;
      if (c.owner === civA) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civB, c.gx, c.gy, mapBase.wraps, 2);
      } else if (c.owner === civB) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civA, c.gx, c.gy, mapBase.wraps, 2);
      }
    }
  }
}

/** Get difficulty index for a civ (0-5). */
function getDifficultyIdx(state, civSlot) {
  const diff = state.civs?.[civSlot]?.difficulty || state.difficulty || 'chieftain';
  const keys = ['chieftain', 'warlord', 'prince', 'king', 'emperor', 'deity'];
  const idx = keys.indexOf(diff);
  return idx >= 0 ? idx : 0;
}

/** Record the current turn as the last tribute turn for a civ pair. */
function recordTributeTurn(state, civA, civB) {
  const key = ensureDiplomacy(state, civA, civB);
  state.diplomacy = {
    ...state.diplomacy,
    [key]: { ...(state.diplomacy[key] || {}), lastTributeTurn: state.turn?.number || 0 },
  };
}

/** Resolve city radius tile index to map coordinates. */
function radiusTileCoords(cityGx, cityGy, i, mapBase) {
  const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
  const parC = cityGy & 1;
  const parT = ((cityGy + ddy) % 2 + 2) % 2;
  const tgx = cityGx + ((parC + ddx - parT) >> 1);
  const tgy = cityGy + ddy;
  const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
  if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) return null;
  return { gx: wgx, gy: tgy };
}

/** Manhattan distance with optional horizontal wrapping. */
function tileDist(ax, ay, bx, by, mw, wraps) {
  let dx = Math.abs(ax - bx);
  if (wraps) dx = Math.min(dx, mw - dx);
  return dx + Math.abs(ay - by);
}

// ═══════════════════════════════════════════════════════════════════
// 1. declareWar — FUN_0045ac71 (diplo_declare_war)
//
// Declares war from aggressor on target. Handles reputation damage
// based on existing treaty level: alliance > peace > ceasefire > none.
// Triggers allied war activation cascade.
// ═══════════════════════════════════════════════════════════════════

/**
 * Declare war from aggressor on target civ.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} aggressor - civ slot declaring war
 * @param {number} target - civ slot being attacked
 * @param {number} [thirdParty=-1] - civ that provoked the war (-1 = self-initiated)
 * @returns {{ events: object[] }}
 */
export function declareWar(state, mapBase, aggressor, target, thirdParty = -1) {
  const events = [];
  const currentTreaty = getTreaty(state, aggressor, target);

  // Binary FUN_0045ac71: does NOT early-return for already-at-war.
  // The C code continues through the "no treaty" path, applying attitude
  // penalties to third parties even when war already exists.

  // Binary FUN_0045ac71 line 4893: treaty_violations[third_party][violator] += 1
  if (thirdParty >= 0) {
    adjustTreatyViolations(state, thirdParty, aggressor, 1);
    // Also keep the diplomacy object for backward compat
    const dKey = ensureDiplomacy(state, thirdParty, aggressor);
    const prev = state.diplomacy[dKey] || {};
    state.diplomacy = {
      ...state.diplomacy,
      [dKey]: { ...prev, violations: (prev.violations || 0) + 1 },
    };
  }

  const diffIdx = getDifficultyIdx(state, aggressor);
  // Binary uses wonder 0x14 = 20 (Eiffel Tower) for reputation protection.
  // Spec section 5.3 labels this "Statue of Liberty" but WONDER_NAMES[20] = "Eiffel Tower".
  const hasReputationWonder = hasWonderEffect(state, aggressor, 20);
  // Binary conditions for reputation: rank == 7 (DAT_00655c22) AND cities > 4
  const aggressorRank = state.civs?.[aggressor]?.powerRank ?? 0;
  const aggressorCities = state.cities
    ? state.cities.filter(c => c.owner === aggressor && c.size > 0).length
    : 0;

  if (currentTreaty === 'alliance') {
    // ── Breaking alliance — spec section 4.1, FUN_0045ac71 lines 4944-4961 ──
    // Binary: status & 0x08 != 0 (alliance active)
    if (diffIdx > 0 && !hasReputationWonder) {
      incrementReputation(state, aggressor); // line 4946
    }
    if (thirdParty < 0) {
      incrementReputation(state, aggressor); // line 4949
      if (isHuman(state, aggressor)) {
        adjustTreatyViolations(state, aggressor, target, -1); // line 4951
      }
    }

    if (thirdParty >= 0) {
      // Binary line 4954: thunk_FUN_00456f20(param_3, param_1, 0xffffffe7) = -25
      adjustAttitude(state, thirdParty, aggressor, -25);
    }

    // Binary line 4956: FUN_00467ef2(param_1, param_2) — cancel alliance
    // This clears the alliance bit and recalls units; does NOT declare war.
    // The alliance break downgrades to peace, not war.
    breakAlliance(state, mapBase, aggressor, target);

    // Set sneak attack flag if human (line 4958)
    if (isHuman(state, aggressor)) {
      const sKey = ensureDiplomacy(state, aggressor, target);
      state.diplomacy = {
        ...state.diplomacy,
        [sKey]: {
          ...(state.diplomacy[sKey] || {}),
          sneak: true, sneakTurn: state.turn?.number || 0,
        },
      };
      addTreatyFlag(state, aggressor, target, TF.VENDETTA); // 0x10
    }

    // NOTE: Binary does NOT call FUN_00467825(0x2000) or FUN_0045a8e3 here.
    // Alliance break only cancels the alliance; it does not declare war.

  } else if (currentTreaty === 'peace' || currentTreaty === 'ceasefire') {
    // ── Breaking peace or ceasefire — spec section 4.1, FUN_0045ac71 lines 4903-4929 ──
    // Binary: status & 0x06 != 0 (has ceasefire or peace treaty)
    const hasPeace = currentTreaty === 'peace';
    const hasBothPeaceAndCeasefire = hasPeace; // peace implies ceasefire was active

    // DOUBLE reputation hit if both peace AND ceasefire active (lines 4903-4915)
    if (hasBothPeaceAndCeasefire) {
      if (aggressorRank === 7 && aggressorCities > 4 && thirdParty < 0) {
        incrementReputation(state, aggressor); // line 4907
      }
      if (diffIdx > 0 && !hasReputationWonder) {
        incrementReputation(state, aggressor); // line 4910
      }
      if (thirdParty < 0 && isHuman(state, aggressor)) {
        adjustTreatyViolations(state, aggressor, target, -1); // line 4914
      }
    }

    // Single treaty break (lines 4917-4926, applied for ANY ceasefire/peace)
    if (aggressorRank === 7 && aggressorCities > 4 && thirdParty < 0) {
      incrementReputation(state, aggressor); // line 4919
    }
    if (diffIdx > 0 && !hasReputationWonder) {
      incrementReputation(state, aggressor); // line 4922
    }
    if (thirdParty < 0 && isHuman(state, aggressor)) {
      adjustTreatyViolations(state, aggressor, target, -1); // line 4925
    }

    if (thirdParty >= 0) {
      // Binary line 4929: thunk_FUN_00456f20(param_3, param_1, 0xfffffff1) = -15
      adjustAttitude(state, thirdParty, aggressor, -15);
    }

  } else {
    // ── No treaty (status & 0x06 == 0) — minor violation (tech steal or similar) ──
    // Binary FUN_0045ac71 lines 4897-4900: only attitude penalty to third party,
    // NO reputation increments for declaring war without a treaty.
    if (thirdParty >= 0) {
      // Binary line 4899: thunk_FUN_00456f20(param_3, param_1, 0xfffffffb) = -5
      adjustAttitude(state, thirdParty, aggressor, -5);
    }
  }

  // ── Common post-break logic for NON-alliance branches (lines 4932-4941) ──
  // The alliance branch only cancels the alliance (FUN_00467ef2) — it does NOT
  // declare war or activate alliance cascades.
  if (currentTreaty !== 'alliance') {
    // Set sneak_attack_flag if aggressor is human (line 4932-4934)
    if (isHuman(state, aggressor)) {
      const sKey = ensureDiplomacy(state, aggressor, target);
      state.diplomacy = {
        ...state.diplomacy,
        [sKey]: {
          ...(state.diplomacy[sKey] || {}),
          sneak: true, sneakTurn: state.turn?.number || 0,
        },
      };
      addTreatyFlag(state, aggressor, target, TF.VENDETTA); // 0x10
    }

    // Declare war (line 4936): FUN_00467825(param_1, param_2, 0x2000)
    setTreaty(state, aggressor, target, 'war');

    // Binary FUN_00579c40 line 3895: set max hostility (100) in both directions
    adjustAttitude(state, aggressor, target, +100);
    adjustAttitude(state, target, aggressor, +100);

    // Human-only: set shared_war_target flags + alliance cascade (lines 4937-4941)
    if (isHuman(state, aggressor)) {
      addTreatyFlag(state, target, aggressor, TF.PERIODIC_FLAG_19); // 0x80800 bits
      addTreatyFlag(state, target, aggressor, TF.WAR_STARTED);
      recordTributeTurn(state, target, aggressor);
      const allyResult = activateAllianceWars(state, mapBase, target, aggressor);
      events.push(...allyResult.events);
    }
  }

  // Cancel trade routes between the two civs
  cancelTradeRoutes(state, aggressor, target);

  // Wake sleeping/sentry units near enemy
  wakeUnitsNearEnemy(state, mapBase, aggressor, target);
  wakeUnitsNearEnemy(state, mapBase, target, aggressor);

  if (currentTreaty !== 'alliance') {
    // Non-alliance branches declare war — emit warDeclared event
    events.push({
      type: 'warDeclared',
      aggressor,
      target,
      thirdParty: thirdParty >= 0 ? thirdParty : undefined,
      previousTreaty: currentTreaty,
    });
  }
  // Alliance branch already emitted 'allianceBroken' via breakAlliance()

  return { events };
}

/** Cancel trade routes between two warring civs. */
function cancelTradeRoutes(state, civA, civB) {
  if (!state.cities) return;
  let changed = false;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.size <= 0 || !city.tradeRoutes || city.tradeRoutes.length === 0) continue;
    if (city.owner !== civA && city.owner !== civB) continue;

    const enemyCiv = city.owner === civA ? civB : civA;
    const filtered = city.tradeRoutes.filter(r => {
      const destCity = state.cities[r.destCityIndex];
      return !destCity || destCity.owner !== enemyCiv;
    });

    if (filtered.length < city.tradeRoutes.length) {
      if (!changed) { state.cities = [...state.cities]; changed = true; }
      state.cities[ci] = { ...city, tradeRoutes: filtered };
    }
  }
}

/** Wake sleeping/sentry units of one civ that are near another civ's units or cities. */
function wakeUnitsNearEnemy(state, mapBase, civSlot, enemyCiv) {
  if (!state.units) return;
  const WAKE_RANGE = 4;

  // Collect enemy positions
  const enemyPositions = [];
  for (const u of state.units) {
    if (u && u.owner === enemyCiv && u.gx >= 0) {
      enemyPositions.push({ gx: u.gx, gy: u.gy });
    }
  }
  if (state.cities) {
    for (const c of state.cities) {
      if (c && c.owner === enemyCiv && c.size > 0) {
        enemyPositions.push({ gx: c.gx, gy: c.gy });
      }
    }
  }
  if (enemyPositions.length === 0) return;

  let mutated = false;
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (!u || u.owner !== civSlot || u.gx < 0) continue;
    if (u.orders !== 'sleep' && u.orders !== 'sentry' && u.orders !== 'fortified') continue;

    for (const ep of enemyPositions) {
      const dist = tileDist(u.gx, u.gy, ep.gx, ep.gy, mapBase.mw, mapBase.wraps);
      if (dist <= WAKE_RANGE) {
        if (!mutated) { state.units = [...state.units]; mutated = true; }
        state.units[i] = { ...u, orders: 'none' };
        break;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// 2. signCeasefire — FUN_0045a7a8 (diplo_sign_ceasefire)
//
// Establishes a ceasefire between warring civs.
// ═══════════════════════════════════════════════════════════════════

/**
 * Sign a ceasefire between two civs.
 *
 * @param {object} state - mutable game state
 * @param {number} civA - proposing civ
 * @param {number} civB - accepting civ
 * @returns {{ events: object[] }}
 */
export function signCeasefire(state, civA, civB) {
  const events = [];

  setTreaty(state, civA, civB, 'ceasefire');

  // #149: Set TRIBUTE_DEMANDED flag (0x40000) during ceasefire signing
  // Binary FUN_0045a7a8: treaty[civA][civB] |= 0x40000
  addTreatyFlag(state, civA, civB, TF.TRIBUTE_DEMANDED);

  // Binary FUN_0045a7a8 lines 4792-4794: randomize attitude toward 50, then clamp [0, 100]
  // attitude = clamp(rand_between(attitude, 0x32), 0, 100)
  // Spec section 2.6: "randomize toward 50"
  randomizeAttitudeToward50(state, civB, civA);

  // Record treaty turn
  recordTributeTurn(state, civA, civB);

  // Clear provoked flags for all civs toward civA
  // (simplified: clear sneak flag)
  if (state.diplomacy) {
    const newDiplo = { ...state.diplomacy };
    for (let c = 1; c <= 7; c++) {
      const dKey = `${c}-${civA}`;
      if (newDiplo[dKey]?.provoked) {
        newDiplo[dKey] = { ...newDiplo[dKey], provoked: false };
      }
    }
    state.diplomacy = newDiplo;
  }

  // Binary FUN_0045a7a8: clear WAR_STARTED (0x800) on civA's flags toward ALL civs.
  // rawC: for(k=1;k<8;k++) treaty[civA][k] &= 0xfffff7ff
  // This is unconditional — clears WAR_STARTED from civA toward every other civ.
  if (state.treatyFlags) {
    let flagsMutated = false;
    for (let c = 1; c <= 7; c++) {
      if (c === civA) continue;
      const kAC = `${civA}-${c}`;
      const cur = state.treatyFlags[kAC] || 0;
      if (cur & TF.WAR_STARTED) {
        if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
        state.treatyFlags[kAC] = cur & ~TF.WAR_STARTED;
      }
    }
  }

  events.push({
    type: 'treatySigned',
    treatyType: 'ceasefire',
    civA,
    civB,
  });

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// 3. signPeaceTreaty — FUN_0045a6ab (diplo_sign_peace_treaty)
//
// Signs a peace treaty (upgrading from ceasefire).
// ═══════════════════════════════════════════════════════════════════

/**
 * Sign a peace treaty between two civs.
 *
 * @param {object} state - mutable game state
 * @param {number} civA - proposing civ
 * @param {number} civB - accepting civ
 * @returns {{ events: object[] }}
 */
export function signPeaceTreaty(state, civA, civB) {
  const events = [];

  setTreaty(state, civA, civB, 'peace');

  // Binary FUN_0045a6ab lines 4761-4763: randomize attitude toward 50, then clamp [0, 100]
  // attitude = clamp(rand_between(attitude, 0x32), 0, 100)
  // Spec section 2.5: "randomize toward 50"
  // Only the accepting civ's (civB) attitude toward the proposer (civA) is affected.
  randomizeAttitudeToward50(state, civB, civA);

  // Reset patience
  if (state.civs?.[civB]) {
    state.civs = [...state.civs];
    state.civs[civB] = { ...state.civs[civB], patience: 0 };
  }

  // Record treaty turn
  recordTributeTurn(state, civB, civA);

  // G.2: Military withdrawal clause — units in enemy territory must withdraw within 2 turns
  const currentTurn = state.turn?.number || 0;
  if (!state.withdrawalDeadlines) state.withdrawalDeadlines = {};
  state.withdrawalDeadlines = {
    ...state.withdrawalDeadlines,
    [treatyKey(civA, civB)]: currentTurn + 2,
  };

  events.push({
    type: 'treatySigned',
    treatyType: 'peace',
    civA,
    civB,
    withdrawalDeadline: currentTurn + 2,
  });

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// 4. formAlliance — FUN_0045a535 (diplo_form_alliance)
//
// Forms an alliance between civA and civB. Adjusts attitude,
// sets treaty flags. If either is at war, ally joins via cascade.
// ═══════════════════════════════════════════════════════════════════

/**
 * Form an alliance between two civs.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} civA - proposing civ
 * @param {number} civB - accepting civ
 * @returns {{ events: object[] }}
 */
export function formAlliance(state, mapBase, civA, civB) {
  const events = [];

  // Binary FUN_0045a535 line 4727: FUN_00456f20(civB, civA, -25)
  // The "price" of forming an alliance — attitude adjusted downward.
  // Spec section 2.4: "This is the price of forming an alliance."
  adjustAttitude(state, civB, civA, -25);

  setTreaty(state, civA, civB, 'alliance');

  // Reset patience
  if (state.civs?.[civB]) {
    state.civs = [...state.civs];
    state.civs[civB] = { ...state.civs[civB], patience: 0 };
  }

  // Record treaty turn
  recordTributeTurn(state, civA, civB);

  // ── Non-binary additions (engine enhancements, not in FUN_0045a535) ──
  // These features are not in the decompiled binary alliance function but are
  // reasonable multiplayer engine additions.

  // Map sharing: allies share visibility
  if (mapBase?.tileData) {
    shareMaps(state, mapBase, civA, civB);
    shareMaps(state, mapBase, civB, civA);
  }

  // Auto-establish embassy both ways
  if (!state.diplomacy) state.diplomacy = {};
  const embKeyAB = `${civA}-${civB}`;
  const embKeyBA = `${civB}-${civA}`;
  state.diplomacy = {
    ...state.diplomacy,
    [embKeyAB]: { ...(state.diplomacy[embKeyAB] || {}), embassy: true },
    [embKeyBA]: { ...(state.diplomacy[embKeyBA] || {}), embassy: true },
  };

  events.push({
    type: 'treatySigned',
    treatyType: 'alliance',
    civA,
    civB,
  });

  // Check if either civ is at war — the new ally should join those wars
  // Binary FUN_0045a8e3: attitude set to +100 (max hostility) on alliance cascade
  for (let c = 1; c <= 7; c++) {
    if (c === civA || c === civB) continue;
    if (!(state.civsAlive & (1 << c))) continue;

    // If civA is at war with c, civB should join
    if (getTreaty(state, civA, c) === 'war' && haveContact(state, civA, c)) {
      const bTreaty = getTreaty(state, civB, c);
      if (bTreaty !== 'war' && haveContact(state, civB, c)) {
        setTreaty(state, civB, c, 'war');
        adjustAttitude(state, civB, c, +100);
        events.push({
          type: 'warDeclared',
          aggressor: civB,
          target: c,
          reason: 'allianceObligation',
          alliedWith: civA,
        });
      }
    }

    // If civB is at war with c, civA should join
    if (getTreaty(state, civB, c) === 'war' && haveContact(state, civB, c)) {
      const aTreaty = getTreaty(state, civA, c);
      if (aTreaty !== 'war' && haveContact(state, civA, c)) {
        setTreaty(state, civA, c, 'war');
        adjustAttitude(state, civA, c, +100);
        events.push({
          type: 'warDeclared',
          aggressor: civA,
          target: c,
          reason: 'allianceObligation',
          alliedWith: civB,
        });
      }
    }
  }

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// 4b. recallUnitsFromTerritory
//
// When peace/ceasefire ends (transition to war) or alliance breaks,
// recall all units of ownerCiv from territoryCiv's territory to the
// nearest friendly city on the same continent.
// Port of binary recall_units_from_territory (block 0x0046).
// ═══════════════════════════════════════════════════════════════════

/**
 * Recall all units owned by ownerCiv that are in territoryCiv's territory.
 * Relocated units are moved to the nearest friendly city owned by ownerCiv
 * on the same continent. If no such city exists, fall back to any nearest
 * friendly city. Units have their orders cleared.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors (tileData, mw, mh, wraps, getBodyId)
 * @param {number} ownerCiv - civ whose units are being recalled
 * @param {number} territoryCiv - civ whose territory units must leave
 * @returns {{ recalled: number }}
 */
export function recallUnitsFromTerritory(state, mapBase, ownerCiv, territoryCiv) {
  if (!state.units || !mapBase.tileData) return { recalled: 0 };

  let recalled = 0;
  const mw = mapBase.mw;

  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.owner !== ownerCiv || u.gx < 0) continue;

    // Check if unit is in territoryCiv's territory
    const tileIdx = u.gy * mw + u.gx;
    const tile = mapBase.tileData[tileIdx];
    if (!tile || tile.tileOwnership !== territoryCiv) continue;

    // Find nearest friendly city owned by ownerCiv, preferring same continent
    const unitContinent = mapBase.getBodyId ? mapBase.getBodyId(u.gx, u.gy) : -1;
    let bestCi = -1;
    let bestDist = Infinity;
    let bestSameContinent = false;

    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.owner !== ownerCiv || c.size <= 0) continue;
      const d = tileDist(u.gx, u.gy, c.gx, c.gy, mw, mapBase.wraps);
      const sameContinent = mapBase.getBodyId ? mapBase.getBodyId(c.gx, c.gy) === unitContinent : false;

      // Prefer same-continent cities; within same preference, pick closest
      if (sameContinent && !bestSameContinent) {
        bestCi = ci;
        bestDist = d;
        bestSameContinent = true;
      } else if (sameContinent === bestSameContinent && d < bestDist) {
        bestCi = ci;
        bestDist = d;
      }
    }

    if (bestCi >= 0) {
      const dest = state.cities[bestCi];
      state.units[i] = {
        ...u,
        gx: dest.gx, gy: dest.gy,
        x: dest.gx * 2 + (dest.gy % 2), y: dest.gy,
        orders: 'none',
      };
      recalled++;
    }
  }

  return { recalled };
}

// ═══════════════════════════════════════════════════════════════════
// 4c. breakAlliance
//
// Breaks an alliance between two civs. Clears alliance flag for both
// directions, recalls units from each other's territory, and sets the
// treaty to 'peace' (alliance break does not mean war).
// Port of binary break_alliance (block 0x0046).
// ═══════════════════════════════════════════════════════════════════

/**
 * Break an alliance between two civs.
 * Clears the alliance flag, recalls units from each other's territory,
 * and downgrades the treaty to 'peace'.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} civA - one ally
 * @param {number} civB - the other ally
 * @returns {{ events: object[] }}
 */
export function breakAlliance(state, mapBase, civA, civB) {
  const events = [];

  // Clear alliance flag for both directions
  clearTreatyFlag(state, civA, civB, TF.ALLIANCE);

  // Downgrade to peace (not war)
  setTreaty(state, civA, civB, 'peace');

  // Recall units from each other's territory
  const recallA = recallUnitsFromTerritory(state, mapBase, civA, civB);
  const recallB = recallUnitsFromTerritory(state, mapBase, civB, civA);

  events.push({
    type: 'allianceBroken',
    civA,
    civB,
    unitsRecalledA: recallA.recalled,
    unitsRecalledB: recallB.recalled,
  });

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// 5. activateAllianceWars — FUN_0045a8e3 (diplo_activate_alliance_wars)
//
// When civA goes to war with civB, civA's allies are checked:
// each ally that has contact with civB and no existing war/alliance
// is UNCONDITIONALLY dragged into the war. Binary has no cooldown,
// attitude threshold, or random gate — alliances cascade aggressively.
// Prevents infinite loops via a processed set.
// ═══════════════════════════════════════════════════════════════════

/**
 * Activate alliance war cascade: civA's allies join war against civB.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} civA - civ whose allies should join
 * @param {number} civB - civ being warred against
 * @param {Set} [processed] - set of already-processed war declarations to prevent loops
 * @returns {{ events: object[] }}
 */
export function activateAllianceWars(state, mapBase, civA, civB, processed) {
  const events = [];
  if (!haveContact(state, civA, civB)) return { events };

  // Track which declarations we've already processed to prevent infinite cascades
  if (!processed) processed = new Set();
  const pairKey = `${Math.min(civA, civB)}-${Math.max(civA, civB)}`;
  if (processed.has(pairKey)) return { events };
  processed.add(pairKey);

  for (let civ = 1; civ <= 7; civ++) {
    if (civ === civA || civ === civB) continue;
    if (!(state.civsAlive & (1 << civ))) continue;

    // Must be allied with civA
    if (getTreaty(state, civA, civ) !== 'alliance') continue;

    // Must have contact with civB
    if (!haveContact(state, civ, civB)) continue;

    // Must not already be at war or allied with civB
    // Binary FUN_0045a8e3: !(treaty[ally][enemy] & 0x2008) — not at war or allied
    const existingFlags = getTreatyFlags(state, civ, civB);
    if (existingFlags & (TF.WAR | TF.ALLIANCE)) continue;

    // Binary cascades UNCONDITIONALLY here — no cooldown, no attitude check,
    // no random gate. Three phantom gates previously here were fabricated.

    // This ally joins the war
    setTreaty(state, civ, civB, 'war');

    // Set provoked + attacked flags (simplified)
    const dKey = ensureDiplomacy(state, civ, civB);
    state.diplomacy = {
      ...state.diplomacy,
      [dKey]: {
        ...(state.diplomacy[dKey] || {}),
        provoked: true,
        attacked: true,
        attackedTurn: state.turn?.number || 0,
      },
    };

    // Binary ref: FUN_0045a8e3 — alliance cascade sets attitude to 100
    // (maximum hostility). In binary's 0-100 scale, 100 = max hostility.
    // adjust_attitude(ally, enemy, 100) means SET to 100, not add 100.
    // Using adjustAttitude with a large positive delta to reach cap.
    // Binary: thunk_FUN_00456f20(ally, enemy, 100) — sets attitude to 100
    adjustAttitude(state, civ, civB, +100);

    recordTributeTurn(state, civB, civ);

    events.push({
      type: 'warDeclared',
      aggressor: civ,
      target: civB,
      reason: 'allianceObligation',
      alliedWith: civA,
    });

    // Recursively check if this new war triggers more alliance cascades
    const cascadeKey = `${Math.min(civ, civB)}-${Math.max(civ, civB)}`;
    if (!processed.has(cascadeKey)) {
      const cascade = activateAllianceWars(state, mapBase, civ, civB, processed);
      events.push(...cascade.events);
    }
  }

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// 6. executeTransaction — FUN_004dd285 (parley_execute_transaction)
//
// Master dispatcher for diplomatic transactions. Executes both sides
// of a trade deal: gold, techs, cities, units, maps.
// ═══════════════════════════════════════════════════════════════════

/**
 * Execute a diplomatic transaction (trade/gift).
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {object} offer - transaction descriptor
 * @param {number} offer.from - giving civ
 * @param {number} offer.to - receiving civ
 * @param {number} [offer.gold] - gold amount to transfer
 * @param {number[]} [offer.techs] - tech IDs to transfer
 * @param {number[]} [offer.cities] - city indices to transfer
 * @param {number[]} [offer.units] - unit indices to transfer
 * @param {boolean} [offer.shareMaps] - whether to share map visibility
 * @param {string} [offer.treaty] - treaty to sign ('ceasefire'|'peace'|'alliance')
 * @returns {{ events: object[] }}
 */
export function executeTransaction(state, mapBase, offer) {
  const events = [];
  const { from, to } = offer;

  // G.4: Validation — reject invalid transactions early
  const validationError = validateTransaction(state, offer);
  if (validationError) {
    events.push({ type: 'transactionRejected', reason: validationError, from, to });
    return { events };
  }

  // ── Gold transfer ──
  if (offer.gold && offer.gold > 0) {
    const result = transferGold(state, from, to, offer.gold);
    events.push(...result.events);
  }

  // ── Tech transfer ──
  if (offer.techs && offer.techs.length > 0) {
    const result = transferTechs(state, from, to, offer.techs);
    events.push(...result.events);
  }

  // ── City transfer ──
  if (offer.cities && offer.cities.length > 0) {
    for (const cityIndex of offer.cities) {
      const result = transferCity(state, mapBase, cityIndex, from, to);
      events.push(...result.events);
    }
  }

  // ── Unit transfer ──
  if (offer.units && offer.units.length > 0) {
    const result = transferUnits(state, mapBase, from, to, offer.units);
    events.push(...result.events);
  }

  // ── Map sharing ──
  if (offer.shareMaps) {
    const result = shareMaps(state, mapBase, from, to);
    events.push(...result.events);
  }

  // ── Treaty signing ──
  if (offer.treaty) {
    let treatyResult;
    switch (offer.treaty) {
      case 'ceasefire':
        treatyResult = signCeasefire(state, from, to);
        break;
      case 'peace':
        treatyResult = signPeaceTreaty(state, from, to);
        break;
      case 'alliance':
        treatyResult = formAlliance(state, mapBase, from, to);
        break;
    }
    if (treatyResult) events.push(...treatyResult.events);
  }

  // G.4: Demand withdraw troops — order enemy units out of your territory
  if (offer.demandWithdraw) {
    const withdrawResult = demandWithdrawTroops(state, mapBase, from, to);
    events.push(...withdrawResult.events);
  }

  // ── Check civ elimination after transfers ──
  for (const civ of [from, to]) {
    if (civ <= 0) continue;
    const hasCity = state.cities.some(c => c.owner === civ && c.size > 0);
    const hasUnit = state.units.some(u => u.owner === civ && u.gx >= 0);
    if (!hasCity && !hasUnit) {
      state.civsAlive &= ~(1 << civ);
      events.push({ type: 'civEliminated', civSlot: civ });
    }
  }

  return { events };
}

// ── G.4: Transaction validation ──

/** Validate a diplomatic transaction before execution. Returns error string or null. */
function validateTransaction(state, offer) {
  const { from, to } = offer;

  // Validate gold: can't give more than you have
  if (offer.gold && offer.gold > 0) {
    const available = state.civs?.[from]?.treasury || 0;
    if (offer.gold > available) return 'Insufficient gold';
  }

  // Validate techs: can't give tech you don't have
  if (offer.techs && offer.techs.length > 0) {
    const fromTechs = state.civTechs?.[from];
    if (!fromTechs) return 'No tech data for giver';
    for (const techId of offer.techs) {
      if (!fromTechs.has(techId)) return `Does not have tech ${techId}`;
    }
  }

  // Validate cities: must own the city
  if (offer.cities && offer.cities.length > 0) {
    for (const ci of offer.cities) {
      const city = state.cities?.[ci];
      if (!city || city.owner !== from || city.size <= 0) return `Does not own city ${ci}`;
    }
  }

  // Validate units: must own the unit
  if (offer.units && offer.units.length > 0) {
    for (const ui of offer.units) {
      const unit = state.units?.[ui];
      if (!unit || unit.owner !== from || unit.gx < 0) return `Does not own unit ${ui}`;
    }
  }

  return null;
}

// ── G.4: Demand withdraw troops ──

/**
 * Demand that a civ withdraw its troops from your territory.
 * Sets a withdrawal deadline; if not met, treaty auto-breaks in END_TURN.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} demander - civ demanding withdrawal
 * @param {number} target - civ whose troops must withdraw
 * @returns {{ events: object[] }}
 */
function demandWithdrawTroops(state, mapBase, demander, target) {
  const events = [];
  const currentTurn = state.turn?.number || 0;

  // Set withdrawal deadline (2 turns to comply)
  if (!state.withdrawalDeadlines) state.withdrawalDeadlines = {};
  state.withdrawalDeadlines = {
    ...state.withdrawalDeadlines,
    [treatyKey(demander, target)]: currentTurn + 2,
  };

  events.push({
    type: 'withdrawalDemanded',
    demander,
    target,
    deadline: currentTurn + 2,
  });

  return { events };
}

// ── Transaction sub-functions ──

/** Transfer gold from one civ to another. Clamps to available balance. */
function transferGold(state, fromCiv, toCiv, amount) {
  const events = [];
  if (!state.civs) return { events };

  state.civs = [...state.civs];
  const fromData = { ...state.civs[fromCiv] };
  const toData = { ...state.civs[toCiv] };

  // Clamp to available
  const available = fromData.treasury || 0;
  const actual = Math.min(amount, available);
  if (actual <= 0) return { events };

  fromData.treasury = available - actual;
  toData.treasury = (toData.treasury || 0) + actual;

  state.civs[fromCiv] = fromData;
  state.civs[toCiv] = toData;

  // Binary FUN_0045f0b1: gold gift attitude uses diminishing returns × 3/2
  // goldToAttitude gives the base, then ×3/2 for the gift context
  const attitudeBonus = Math.trunc(goldToAttitude(actual) * 3 / 2);
  adjustAttitude(state, toCiv, fromCiv, attitudeBonus);

  events.push({
    type: 'goldTransferred',
    from: fromCiv,
    to: toCiv,
    amount: actual,
  });

  return { events };
}

/** Transfer technologies from one civ to another. */
function transferTechs(state, fromCiv, toCiv, techIds) {
  const events = [];
  const fromTechs = state.civTechs?.[fromCiv];
  const toTechs = state.civTechs?.[toCiv];
  if (!fromTechs || !toTechs) return { events };

  for (const techId of techIds) {
    if (fromTechs.has(techId) && !toTechs.has(techId)) {
      grantAdvance(state, toCiv, techId);
      // Binary FUN_0045f0b1: tech gift attitude = techValue * 4 (best) or * 2 (2nd)
      const techValue = ADVANCE_EPOCH[techId] ?? 1;
      const attBonus = techValue * 4;
      adjustAttitude(state, toCiv, fromCiv, attBonus);
      events.push({
        type: 'techTransferred',
        from: fromCiv,
        to: toCiv,
        advanceId: techId,
      });
    }
  }

  return { events };
}

/**
 * Gap 90: Check if a unit type can exist on the terrain at (gx, gy).
 * Ground units can't be on ocean; sea units can't be on land.
 * Air units can go anywhere.
 */
function isTerrainCompatible(unitType, gx, gy, mapBase) {
  const domain = UNIT_DOMAIN[unitType] ?? 0;
  if (domain === 1) return true; // air units are always OK
  const ter = mapBase.getTerrain ? mapBase.getTerrain(gx, gy) : mapBase.tileData?.[gy * mapBase.mw + gx]?.terrain;
  if (ter == null) return false;
  const isOcean = (ter === 10);
  if (domain === 0 && isOcean) return false;  // ground on ocean
  if (domain === 2 && !isOcean) return false;  // sea on land
  return true;
}

/**
 * Gap 90: Find a compatible tile near (gx, gy) using a 45-tile spiral.
 * Returns { gx, gy } or null if no compatible tile found.
 */
function findCompatibleTile(unitType, gx, gy, mapBase) {
  // 45-tile spiral: inner ring (8), mid ring (12), outer ring (24), plus center
  // Use doubled-x offsets for the spiral
  const spiralOffsets = [
    // Ring 1 (8 tiles)
    [+1,-1],[+2,0],[+1,+1],[0,+2],[-1,+1],[-2,0],[-1,-1],[0,-2],
    // Ring 2 (12 tiles)
    [+2,-2],[+2,+2],[-2,+2],[-2,-2],
    [+1,-3],[+3,-1],[+3,+1],[+1,+3],[-1,+3],[-3,+1],[-3,-1],[-1,-3],
    // Ring 3 (wider)
    [+4,0],[0,+4],[-4,0],[0,-4],
    [+3,-3],[+3,+3],[-3,+3],[-3,-3],
    [+4,-2],[+4,+2],[-4,+2],[-4,-2],
    [+2,-4],[+2,+4],[-2,+4],[-2,-4],
    [+1,-5],[+5,-1],[+5,+1],[+1,+5],[-1,+5],[-5,+1],[-5,-1],[-1,-5],
  ];

  for (const [ddx, ddy] of spiralOffsets) {
    const parC = gy & 1;
    const parT = ((gy + ddy) % 2 + 2) % 2;
    const tgx = gx + ((parC + ddx - parT) >> 1);
    const tgy = gy + ddy;
    if (tgy < 0 || tgy >= mapBase.mh) continue;
    const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (wgx < 0 || wgx >= mapBase.mw) continue;
    if (isTerrainCompatible(unitType, wgx, tgy, mapBase)) {
      return { gx: wgx, gy: tgy };
    }
  }
  return null;
}

/** Transfer units from one civ to another.
 *  Gap 89: Split stacks properly when transferring from a multi-unit stack.
 *  Gap 90: Validate terrain compatibility; if unit can't exist on current terrain,
 *  search 45-tile spiral for compatible terrain.
 */
function transferUnits(state, mapBase, fromCiv, toCiv, unitIndices) {
  const events = [];
  if (!state.units) return { events };

  state.units = [...state.units];

  // Gap 89: Collect indices of units being transferred for stack splitting
  const transferSet = new Set(unitIndices);

  for (const ui of unitIndices) {
    const u = state.units[ui];
    if (!u || u.gx < 0 || u.owner !== fromCiv) continue;

    // Gap 89: Split stack — unlink this unit from its stack pointers
    // Update prevInStack/nextInStack for remaining stack members
    if (u.prevInStack >= 0 && !transferSet.has(u.prevInStack)) {
      const prev = state.units[u.prevInStack];
      if (prev) {
        state.units[u.prevInStack] = {
          ...prev,
          nextInStack: u.nextInStack >= 0 && !transferSet.has(u.nextInStack) ? u.nextInStack : -1,
        };
      }
    }
    if (u.nextInStack >= 0 && !transferSet.has(u.nextInStack)) {
      const next = state.units[u.nextInStack];
      if (next) {
        state.units[u.nextInStack] = {
          ...next,
          prevInStack: u.prevInStack >= 0 && !transferSet.has(u.prevInStack) ? u.prevInStack : -1,
        };
      }
    }

    // Find nearest city of new owner for rehoming
    let bestCi = -1, bestDist = Infinity;
    if (state.cities) {
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (c.owner === toCiv && c.size > 0) {
          const d = tileDist(u.gx, u.gy, c.gx, c.gy, mapBase.mw, mapBase.wraps);
          if (d < bestDist) { bestDist = d; bestCi = ci; }
        }
      }
    }

    // Gap 90: Validate terrain compatibility
    let placeGx = u.gx, placeGy = u.gy;
    if (!isTerrainCompatible(u.type, placeGx, placeGy, mapBase)) {
      const found = findCompatibleTile(u.type, placeGx, placeGy, mapBase);
      if (found) {
        placeGx = found.gx;
        placeGy = found.gy;
      }
    }

    state.units[ui] = {
      ...u,
      owner: toCiv,
      gx: placeGx,
      gy: placeGy,
      x: placeGx * 2 + (placeGy % 2),
      y: placeGy,
      homeCityId: bestCi >= 0 ? bestCi : 0xFFFF,
      orders: 'none',
      goToX: -1,
      goToY: -1,
      prevInStack: -1,
      nextInStack: -1,
    };

    // Update visibility for new owner
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, placeGx, placeGy, mapBase.wraps);

    events.push({
      type: 'unitTransferred',
      unitIndex: ui,
      unitType: u.type,
      from: fromCiv,
      to: toCiv,
    });
  }

  return { events };
}

/** Share map visibility between two civs. */
function shareMaps(state, mapBase, fromCiv, toCiv) {
  const events = [];
  if (!mapBase.tileData) return { events };

  const fromBit = 1 << fromCiv;
  const toBit = 1 << toCiv;

  // Grant visibility: tiles visible to fromCiv become visible to toCiv
  for (let i = 0; i < mapBase.tileData.length; i++) {
    const tile = mapBase.tileData[i];
    if (!tile) continue;
    if ((tile.visibility & fromBit) && !(tile.visibility & toBit)) {
      tile.visibility |= toBit;
    }
  }

  // Binary FUN_004dd8ad: also share sight radius around units and cities
  // Reveal tiles around fromCiv's units for toCiv
  for (const u of state.units) {
    if (u.owner !== fromCiv || u.gx < 0) continue;
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, u.gx, u.gy, mapBase.wraps);
  }
  // Reveal tiles around fromCiv's cities for toCiv (radius 2)
  for (const c of state.cities) {
    if (c.owner !== fromCiv || c.size <= 0) continue;
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, c.gx, c.gy, mapBase.wraps, 2);
  }

  events.push({
    type: 'mapsShared',
    from: fromCiv,
    to: toCiv,
  });

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// 7. transferCity — FUN_004de0e2 (parley_transfer_city)
//
// Transfers a city from one civ to another. Removes certain buildings,
// transfers units in the city, updates tile ownership and visibility.
// ═══════════════════════════════════════════════════════════════════

// Buildings always removed on diplomatic city transfer
// From pseudocode: Palace=1, Temple=4, Barracks=2, Courthouse=7
const TRANSFER_REMOVE_BUILDINGS = new Set([1, 2, 4, 7]);

/**
 * Transfer a city from one civ to another (diplomatic, not capture).
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} cityIndex - index into state.cities
 * @param {number} fromCiv - current owner
 * @param {number} toCiv - new owner
 * @returns {{ events: object[] }}
 */
export function transferCity(state, mapBase, cityIndex, fromCiv, toCiv) {
  const events = [];
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0 || city.owner !== fromCiv) return { events };

  const cityGx = city.gx;
  const cityGy = city.gy;

  // ── Remove specific buildings ──
  let buildings = new Set(city.buildings);
  for (const bid of TRANSFER_REMOVE_BUILDINGS) {
    buildings.delete(bid);
  }

  // ── Update city ──
  state.cities = [...state.cities];
  state.cities[cityIndex] = {
    ...city,
    owner: toCiv,
    buildings,
    hasWalls: buildings.has(8),
    hasPalace: buildings.has(1),
    shieldsInBox: 0,
    civilDisorder: false,
    weLoveKingDay: false,
    soldThisTurn: false,
    resistanceTurns: 0,
    originalOwner: fromCiv,
    turnCaptured: state.turn?.number || 0,
    tradeRoutes: city.tradeRoutes || [], // Gap 88: preserve trade routes, reassign to new owner
  };

  // ── Update tile ownership around city ──
  // City center tile
  const centerIdx = cityGy * mapBase.mw + cityGx;
  if (mapBase.tileData[centerIdx]) {
    mapBase.tileData[centerIdx].tileOwnership = toCiv;
  }

  // City radius tiles (21-tile spiral)
  for (let r = 0; r < 21; r++) {
    const pos = radiusTileCoords(cityGx, cityGy, r, mapBase);
    if (!pos) continue;
    const tIdx = pos.gy * mapBase.mw + pos.gx;
    const tile = mapBase.tileData[tIdx];
    if (!tile) continue;
    if (tile.tileOwnership === fromCiv) {
      // Only change ownership if no other city of fromCiv claims this tile
      const otherClaim = state.cities.some((c, ci) =>
        ci !== cityIndex && c.owner === fromCiv && c.size > 0 &&
        CITY_RADIUS_DOUBLED.some(([ddx, ddy]) => {
          const parC = c.gy & 1;
          const parT = ((c.gy + ddy) % 2 + 2) % 2;
          const tgx = c.gx + ((parC + ddx - parT) >> 1);
          const tgy = c.gy + ddy;
          const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
          return wgx === pos.gx && tgy === pos.gy;
        })
      );
      if (!otherClaim) {
        tile.tileOwnership = toCiv;
      }
    }
    // Grant visibility to new owner
    tile.visibility |= (1 << toCiv);
  }

  // ── #118: Update visibility around city for new owner ──
  // Binary FUN_004de0e2: reveal full 21-tile city radius + 8-tile adjacent scan
  // (not just range 2). First reveal all 21 city radius tiles, then for each
  // of the 8 adjacent tiles, call updateVisibility to reveal their sight radius.
  updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, cityGx, cityGy, mapBase.wraps, 2);
  // Reveal each of the 21 city radius tiles directly
  for (let r = 0; r < 21; r++) {
    const pos = radiusTileCoords(cityGx, cityGy, r, mapBase);
    if (!pos) continue;
    const tIdx = pos.gy * mapBase.mw + pos.gx;
    if (mapBase.tileData[tIdx]) {
      mapBase.tileData[tIdx].visibility |= (1 << toCiv);
    }
  }
  // 8-tile adjacent scan: reveal visibility around each adjacent tile
  const adjOffsets = [[+1,-1],[+2,0],[+1,+1],[0,+2],[-1,+1],[-2,0],[-1,-1],[0,-2]];
  for (const [ddx, ddy] of adjOffsets) {
    const parC = cityGy & 1;
    const parT = ((cityGy + ddy) % 2 + 2) % 2;
    const tgx = cityGx + ((parC + ddx - parT) >> 1);
    const tgy = cityGy + ddy;
    if (tgy < 0 || tgy >= mapBase.mh) continue;
    const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (wgx < 0 || wgx >= mapBase.mw) continue;
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, wgx, tgy, mapBase.wraps);
  }

  // ── Transfer units at the city tile ──
  state.units = [...state.units];
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (!u || u.gx < 0 || u.owner !== fromCiv) continue;

    if (u.gx === cityGx && u.gy === cityGy) {
      // Unit is at the city — transfer ownership
      let bestCi = -1, bestDist = Infinity;
      // Find nearest city of new owner for rehoming
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (c.owner === toCiv && c.size > 0) {
          const d = tileDist(u.gx, u.gy, c.gx, c.gy, mapBase.mw, mapBase.wraps);
          if (d < bestDist) { bestDist = d; bestCi = ci; }
        }
      }

      state.units[ui] = {
        ...u,
        owner: toCiv,
        homeCityId: bestCi >= 0 ? bestCi : 0xFFFF,
        orders: 'none',
        goToX: -1,
        goToY: -1,
      };

      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, u.gx, u.gy, mapBase.wraps);
    } else if (u.homeCityId === cityIndex) {
      // #117: Unit is homed to this city but NOT physically there — disband
      // Binary FUN_004de0e2: units homed to transferred city but not at the
      // city tile are disbanded (killed), not rehomed. Only units physically
      // present at the city tile get transferred to the new owner.
      state.units[ui] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
      events.push({
        type: 'unitDisbanded',
        unitIndex: ui,
        unitType: u.type,
        owner: fromCiv,
        reason: 'cityTransferred',
      });
    }
  }

  // ── Wonder ownership: wonders are city-indexed, so they automatically transfer ──
  // Emit events for any wonders in this city
  if (state.wonders) {
    for (let wi = 0; wi < state.wonders.length; wi++) {
      const w = state.wonders[wi];
      if (w && w.cityIndex === cityIndex && !w.destroyed) {
        events.push({
          type: 'wonderTransferred',
          wonderIndex: wi,
          from: fromCiv,
          to: toCiv,
          cityIndex,
        });
      }
    }
  }

  // ── Palace relocation for old owner ──
  if (city.buildings && city.buildings.has(1)) {
    // Lost palace — give one to the most-populated remaining city
    let bestPalaceCi = -1, bestSize = 0;
    for (let ci = 0; ci < state.cities.length; ci++) {
      const c = state.cities[ci];
      if (c.owner === fromCiv && c.size > 0 && ci !== cityIndex) {
        if (c.size > bestSize) { bestSize = c.size; bestPalaceCi = ci; }
      }
    }
    if (bestPalaceCi >= 0) {
      const pc = state.cities[bestPalaceCi];
      const pBuildings = new Set(pc.buildings);
      pBuildings.add(1);
      state.cities[bestPalaceCi] = { ...pc, buildings: pBuildings, hasPalace: true };
    }
  }

  events.push({
    type: 'cityTransferred',
    cityIndex,
    cityName: city.name,
    from: fromCiv,
    to: toCiv,
  });

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// D.4: Attitude Scoring — 15-phase formula
// Port of FUN_00560d95 (calc_attitude_score)
//
// MODIFIER_SUMMARY — All 29 attitude modifiers in the binary formula:
//
// Phase 2: Pre-scoring data collection
//   1. techRankCount — count civs with more techs than target
//   2. warCount — count of AI's active wars
//   3. allianceStrength — target's alliance network strength
//
// Phase 3: Alliance modifiers (when allied)
//   4. Treasury comparison: +1 if AI poorer than target
//   5. Tech count (AI behind): +1 if AI has fewer techs (difficulty > 0)
//   6. Tech count (AI ahead): -1 if target has fewer techs
//   7. Military power (AI weaker): +1 if AI weaker
//   8. Military power (AI stronger): -1 if AI stronger
//   9. War front penalty: -(warCount - expansionism - 1) if at war
//  10. Large tech gap bonus: +1 if AI 8+ techs behind target
//
// Phase 4: Treaty status modifiers
//  11. Ceasefire penalty: -2 if ceasefire active
//  12. Non-alliance penalty: -1 if not allied
//
// Phase 5: Late-game power penalties
//  13. Power rank penalty: -(7 - targetPowerRank), halved before turn 400
//  14. Rank-7 bonus: +floor(diffIdx/3)+1 if target is rank 7 with 3+ cities
//
// Phase 6: Spaceship penalties
//  15. Spaceship flag: -1 if target building spaceship
//  16. Spaceship race: -1 extra if AI is NOT building spaceship
//
// Phase 7+8: Personality + power differential
//  17. Personality modifier: expansionism*3 + militarism*2 (floored at -2)
//  18. Power rank differential: (targetRank - aiRank), halved
//
// Phase 9: Military power stacking penalties
//  19. 4x inferior: -1 if AI mil*4 < target mil
//  20. 2x inferior: -1 if AI mil*2 < target mil
//  21. 1.5x inferior: -1 if AI mil*3 < target mil*2
//
// Phase 10: Peaceful strength bonus (non-allied)
//  22. Target weaker: +1 if target mil < AI mil
//  23. Target much weaker: +1 if target mil*2 < AI mil
//
// Phase 11: Wonder effects
//  24. Great Wall / UN (target): score reduction + -10
//  25. Eiffel Tower (AI): +1
//  26. Eiffel Tower (target): score halved + penalty
//
// Phase 12-15: Final modifiers
//  27. Tech leader bonus: +1 if no civ has more techs than target
//  28. Tech count vs tolerance: +(1 - tolerance) if AI behind in techs
//  29. Alliance floor: score clamped to 0 minimum if allied
//
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate AI attitude toward another civ using the full 15-phase
 * binary-faithful formula.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ computing attitude
 * @param {number} targetCiv - civ being evaluated
 * @returns {number} attitude score (negative=hostile, positive=friendly)
 */
export function calcAttitudeScore(state, aiCiv, targetCiv) {
  if (aiCiv === targetCiv) return 0;

  const aiCivData = state.civs?.[aiCiv];
  const targetCivData = state.civs?.[targetCiv];
  if (!aiCivData || !targetCivData) return 0;

  const treaty = getTreaty(state, aiCiv, targetCiv);

  // Leader personality lookup
  const rulesCivNum = aiCivData.rulesCivNumber ?? 0;
  const personality = LEADER_PERSONALITY[rulesCivNum] || [0, 0, 0];
  const [expansionism, militarism, tolerance] = personality;

  const aiTechCount = state.civTechCounts?.[aiCiv] || 0;
  const targetTechCount = state.civTechCounts?.[targetCiv] || 0;
  const aiMilPower = aiCivData.militaryPower || 0;
  const targetMilPower = targetCivData.militaryPower || 0;
  const aiPowerRank = aiCivData.powerRank ?? 3;
  const targetPowerRank = targetCivData.powerRank ?? 3;
  const turnNum = state.turn?.number || 0;
  const diffIdx = DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain');
  const isAllied = treaty === 'alliance';

  let score = 0;

  // Phase 2: Pre-scoring data collection
  let techRankCount = 0;
  let warCount = 0;
  let allianceStrength = 0;
  for (let c = 1; c < 8; c++) {
    if (c === aiCiv || !(state.civsAlive & (1 << c))) continue;
    const otherTechs = state.civTechCounts?.[c] || 0;
    if (otherTechs > targetTechCount) techRankCount++;
    if (getTreaty(state, aiCiv, c) === 'war') warCount++;
    if (getTreaty(state, targetCiv, c) === 'alliance') {
      allianceStrength++;
      const allyMilPower = state.civs?.[c]?.militaryPower || 0;
      if (targetMilPower < allyMilPower) allianceStrength++;
    }
  }

  // Phase 3: At-war modifiers (binary: these fire when AT WAR, not when allied)
  // Reference: diplomacy-tables.js MODIFIER_SUMMARY — Phase 3 is "War-only modifiers"
  // Binary FUN_00560d95: checks treaty for WAR status, then applies comparison modifiers
  const isAtWar = treaty === 'war';
  if (isAtWar) {
    if (warCount === 0) {
      if ((aiCivData.treasury || 0) < (targetCivData.treasury || 0)) score += 1;
      if (aiTechCount < targetTechCount && diffIdx > 0) score += 1;
      if (targetTechCount < aiTechCount) score -= 1;
      if (aiMilPower < targetMilPower) score += 1;
      if (targetMilPower < aiMilPower) score -= 1;
    } else if (expansionism < 1 || warCount > 1) {
      let penalty = warCount - expansionism - 1;
      if (penalty < 2) penalty = 1;
      score -= penalty;
    }
    if (aiTechCount + 8 < targetTechCount) score += 1;
  }

  // Phase 4: Treaty status modifiers
  if (treaty === 'ceasefire') score -= 2;
  if (!isAllied) score -= 1;

  // Phase 5: Late-game power penalties
  if (targetPowerRank < 7 && turnNum > 200) {
    let penalty = 7 - targetPowerRank;
    if (turnNum < 400) penalty = (penalty + 1) >> 1;
    score -= penalty;
  }
  if (targetPowerRank === 7 && (targetCivData.cityCount || 0) > 3 &&
      turnNum > 200 && diffIdx > 0) {
    score += Math.floor(diffIdx / 3) + 1;
  }

  // Phase 6: Spaceship penalties
  if (targetCivData.spaceshipFlag) {
    score -= 1;
    if (!aiCivData.spaceshipFlag && score > 0) score -= 1;
  }

  // Phase 7+8: Personality + power differential
  let personalityMod = expansionism * 3 + militarism * 2;
  if (personalityMod < -1) personalityMod = -2;
  let powerDiff = targetPowerRank - aiPowerRank;
  if (powerDiff < 0) powerDiff = Math.floor(powerDiff / 2);
  else if (!isAllied) powerDiff = Math.floor(powerDiff / 2);
  score += personalityMod + powerDiff;

  // Phase 9: Military power comparison (stacking penalties)
  if (aiMilPower * 4 < targetMilPower) score -= 1;
  if (aiMilPower * 2 < targetMilPower) score -= 1;
  if (aiMilPower * 3 < targetMilPower * 2) score -= 1;

  // Phase 10: Peaceful strength bonus (NOT allied)
  if (!isAllied) {
    if (targetMilPower < aiMilPower) score += 1;
    if (targetMilPower * 2 < aiMilPower) score += 1;
  }

  // Phase 11: Wonder effects
  // Great Wall (wonder 6) or United Nations (wonder 24): strong diplomatic deterrent
  // These wonders block AI war declarations (shouldDeclareWar = 0) and impose
  // an attitude penalty of -10, in addition to the score halving/reduction.
  if (civHasWonder(state, targetCiv, 6) || civHasWonder(state, targetCiv, 24)) {
    if (score < 1) score -= 1; else score >>= 1;
    score -= 10;
  }
  if (civHasWonder(state, aiCiv, 20)) score += 1;
  if (civHasWonder(state, targetCiv, 20)) {
    if (score > 0) score = Math.floor(score / 2);
    score -= (score >= 1 ? 2 : 1);
  }

  // Phase 12: Tech leader bonus
  if (techRankCount === 0) score += 1;

  // Phase 13: Tech count vs tolerance
  if (aiTechCount < targetTechCount) score += (1 - tolerance);

  // Phase 14: Alliance floor
  if (isAllied && score < 1) score = 0;

  // Phase 15: No contact reset
  if (!haveContact(state, aiCiv, targetCiv)) score = 0;

  return score;
}

/**
 * Check if target civ's wonders block AI war declarations.
 * Great Wall (wonder 6) or United Nations (wonder 24) prevent AI from
 * declaring war (shouldDeclareWar = false).
 *
 * @param {object} state - game state
 * @param {number} targetCiv - the civ being considered for war
 * @returns {boolean} true if war declaration should be blocked
 */
export function shouldBlockWarDeclaration(state, targetCiv) {
  return civHasWonder(state, targetCiv, 6) || civHasWonder(state, targetCiv, 24);
}

// ═══════════════════════════════════════════════════════════════════
// Kill Civ — fully remove a civilization from the game
// Port of cheat_destroy_civ (FUN_00555a8b) + civ elimination logic
// ═══════════════════════════════════════════════════════════════════

/**
 * Completely eliminate a civilization from the game.
 * Binary only kills when 0 cities remain. Records in destroyed civs list,
 * kills all units, clears alive bitmask, destroys spaceship, clears
 * visibility, and checks for game end.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} civSlot - civ slot to eliminate (1-7)
 * @param {number} killerCiv - civ slot of the killer (0 for barbarians)
 * @returns {{ events: object[] }}
 */
export function killCiv(state, mapBase, civSlot, killerCiv) {
  const events = [];

  if (civSlot <= 0 || civSlot > 7) return { events };
  if (!(state.civsAlive & (1 << civSlot))) return { events };

  // ── Guard: binary only kills when 0 cities remain ──
  for (let ci = 0; ci < state.cities.length; ci++) {
    const c = state.cities[ci];
    if (c.owner === civSlot && c.size > 0) return { events };
  }

  // ── Record in destroyed civs list (up to 12 records) ──
  // Matches parser killHistory structure: killTurns, killerCivIds,
  // destroyedCivRulesIds, destroyedCivNames
  if (!state.killHistory) {
    state.killHistory = {
      count: 0,
      killTurns: new Array(12).fill(0),
      killerCivIds: new Array(12).fill(0),
      destroyedCivRulesIds: new Array(12).fill(0),
      destroyedCivNames: new Array(12).fill(''),
    };
  }
  const kh = state.killHistory;
  const slot = kh.count < 12 ? kh.count : 11; // cap at 12 entries
  kh.killTurns = [...kh.killTurns];
  kh.killerCivIds = [...kh.killerCivIds];
  kh.destroyedCivRulesIds = [...kh.destroyedCivRulesIds];
  kh.destroyedCivNames = [...kh.destroyedCivNames];
  kh.killTurns[slot] = state.turn?.number ?? 0;
  kh.killerCivIds[slot] = killerCiv;
  kh.destroyedCivRulesIds[slot] = state.civs?.[civSlot]?.rulesCivNumber ?? civSlot;
  kh.destroyedCivNames[slot] = state.civNames?.[civSlot] ?? `Civ ${civSlot}`;
  if (kh.count < 12) kh.count++;

  // ── Clear alive bitmask ──
  state.civsAlive &= ~(1 << civSlot);

  // ── Repatriate bribed units: units owned by dying civ that were bribed from other civs ──
  // Return them to their original owner (the civ they were bribed from).
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.gx < 0 || u.owner !== civSlot) continue;
    if (u.bribed && u.returnToCiv != null && u.returnToCiv !== civSlot &&
        (state.civsAlive & (1 << u.returnToCiv))) {
      const returnTo = u.returnToCiv;
      // Find nearest city of the original owner for rehoming
      let bestCi = -1, bestDist = Infinity;
      if (state.cities) {
        for (let ci = 0; ci < state.cities.length; ci++) {
          const c = state.cities[ci];
          if (c.owner === returnTo && c.size > 0) {
            let dx = Math.abs(u.gx - c.gx);
            if (mapBase?.wraps) dx = Math.min(dx, (mapBase.mw || 1000) - dx);
            const d = dx + Math.abs(u.gy - c.gy);
            if (d < bestDist) { bestDist = d; bestCi = ci; }
          }
        }
      }
      state.units[i] = {
        ...u,
        owner: returnTo,
        bribed: false,
        returnToCiv: undefined,
        homeCityId: bestCi >= 0 ? bestCi : 0xFFFF,
        orders: 'none',
      };
      if (mapBase?.tileData) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, returnTo, u.gx, u.gy, mapBase.wraps);
      }
      events.push({ type: 'unitRepatriated', unitIndex: i, unitType: u.type, from: civSlot, to: returnTo });
    }
  }

  // ── Kill all remaining units (set gx = -1) ──
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.owner === civSlot && u.gx >= 0) {
      state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
    }
  }

  // ── Clear diplomatic state (binary Step 3: clear all treaties/attitudes for dead civ) ──
  // ALL pair-keyed diplomacy state must be cleared so the AI doesn't keep
  // trying to negotiate with / declare war on / offer alliance to the dead civ
  // every turn. Without this, the user sees the same diplomacy event repeating
  // in chat and a notification sound playing each turn.
  const pairKey = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`);

  if (state.treatyFlags) {
    state.treatyFlags = { ...state.treatyFlags };
    for (let c = 0; c <= 7; c++) {
      delete state.treatyFlags[`${civSlot}-${c}`];
      delete state.treatyFlags[`${c}-${civSlot}`];
    }
  }
  if (state.treaties) {
    state.treaties = { ...state.treaties };
    for (let c = 0; c <= 7; c++) {
      delete state.treaties[pairKey(civSlot, c)];
    }
  }
  if (state.diplomacy) {
    state.diplomacy = { ...state.diplomacy };
    for (let c = 0; c <= 7; c++) {
      delete state.diplomacy[pairKey(civSlot, c)];
    }
  }
  if (state.treatyTurns) {
    state.treatyTurns = { ...state.treatyTurns };
    for (let c = 0; c <= 7; c++) {
      delete state.treatyTurns[pairKey(civSlot, c)];
    }
  }
  if (state.withdrawalDeadlines) {
    state.withdrawalDeadlines = { ...state.withdrawalDeadlines };
    for (let c = 0; c <= 7; c++) {
      delete state.withdrawalDeadlines[pairKey(civSlot, c)];
    }
  }
  if (state.treatyProposals) {
    state.treatyProposals = state.treatyProposals.filter(p =>
      p.from !== civSlot && p.to !== civSlot);
  }
  if (state.tributeDemands) {
    state.tributeDemands = state.tributeDemands.filter(d =>
      d.from !== civSlot && d.to !== civSlot);
  }
  // Clear per-civ attitudes pointing at the dead civ
  if (state.civs) {
    state.civs = [...state.civs];
    for (let c = 1; c <= 7; c++) {
      const civ = state.civs[c];
      if (!civ || !civ.attitudes) continue;
      if (civ.attitudes[civSlot] != null && civ.attitudes[civSlot] !== 0) {
        const newAtt = [...civ.attitudes];
        newAtt[civSlot] = 0;
        state.civs[c] = { ...civ, attitudes: newAtt };
      }
    }
  }

  // ── Destroy spaceship (Fix 6: resetSpaceship) ──
  resetSpaceship(state, civSlot);

  // ── Clear visibility: remove (1 << civSlot) bit from all map tiles ──
  if (mapBase && mapBase.tileData) {
    const visBit = ~(1 << civSlot);
    for (let i = 0; i < mapBase.tileData.length; i++) {
      const tile = mapBase.tileData[i];
      if (tile.visibility !== undefined) {
        tile.visibility &= visBit;
      }
    }
  }

  // ── #129: Reassign eliminated civ's tile ownership ──
  // Scan 45-tile radius per city and reassign tiles to nearest alive civ
  reassignEliminatedCivTiles(state, mapBase, civSlot);

  // ── Recalculate power rankings after civ death ──
  // Binary recalculates rankings when a civ is eliminated (FUN_004853e7).
  if (state.powerRanking) {
    state.powerRanking = [...state.powerRanking];
    state.powerRanking[civSlot] = 0;
    const newRank = new Array(8).fill(0);
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      let rank = 0;
      for (let other = 1; other <= 7; other++) {
        if (other === c || !(state.civsAlive & (1 << other))) continue;
        if (state.powerRanking[other] < state.powerRanking[c]) rank++;
        else if (state.powerRanking[other] === state.powerRanking[c] && other < c) rank++;
      }
      newRank[c] = rank;
    }
    state.powerRank = newRank;
    if (state.civs) {
      state.civs = [...state.civs];
      for (let c = 1; c <= 7; c++) {
        if (state.civs[c]) state.civs[c] = { ...state.civs[c], powerRank: newRank[c] };
      }
    }
  }

  events.push({ type: 'civDestroyed', civSlot, killerCiv });

  // ── Check if game should end (fewer than 2 non-barbarian alive civs) ──
  let aliveCount = 0;
  let lastAlive = -1;
  for (let c = 1; c <= 7; c++) {
    if (state.civsAlive & (1 << c)) {
      aliveCount++;
      lastAlive = c;
    }
  }
  if (aliveCount <= 1 && lastAlive > 0 && !state.gameOver) {
    const trace = new Error().stack.split('\n').slice(1, 4).map(s => s.trim()).join(' | ');
    state.gameOver = {
      winner: lastAlive, reason: 'conquest',
      _debug: `killCiv(${civSlot}) → aliveCount=${aliveCount} civsAlive=${state.civsAlive.toString(2)} trace=${trace}`,
    };
    events.push({ type: 'gameOver', winner: lastAlive, reason: 'conquest', _debug: state.gameOver._debug });
  }

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// Civ Respawn — recycle dead civ slots (binary mechanic)
//
// The binary recycles dead civ slots after 50+ turns. After killing
// a civ, if the game has been running 50+ turns, attempt to respawn
// a new AI civ in an available slot far from existing civs.
// ═══════════════════════════════════════════════════════════════════

/**
 * Attempt to respawn a new civ in a dead slot.
 * Binary recycling mechanic: after 50+ turns, dead civ slots can be reused
 * for a new AI civilization placed far from existing civs.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @returns {{ events: object[], respawnedCiv: number|null }}
 */
export function attemptCivRespawn(state, mapBase) {
  const events = [];
  const turnNumber = state.turn?.number || 0;

  // Only respawn after 50+ turns
  if (turnNumber < 50) return { events, respawnedCiv: null };

  // Find a dead (non-alive) civ slot (1-7)
  let deadSlot = -1;
  for (let c = 1; c <= 7; c++) {
    if (!(state.civsAlive & (1 << c))) {
      deadSlot = c;
      break;
    }
  }
  if (deadSlot < 0) return { events, respawnedCiv: null };

  // Find a suitable position far from all existing civs
  const { mw, mh, tileData, wraps } = mapBase;
  const existingPositions = [];
  for (const city of state.cities) {
    if (city.size > 0) existingPositions.push({ gx: city.gx, gy: city.gy });
  }
  for (const u of state.units) {
    if (u.gx >= 0 && u.owner > 0) existingPositions.push({ gx: u.gx, gy: u.gy });
  }

  // Score land tiles by distance from existing civs
  let bestGx = -1, bestGy = -1, bestMinDist = -1;
  const edgeMargin = Math.max(2, Math.floor(mh / 10));
  for (let y = edgeMargin; y < mh - edgeMargin; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const tile = tileData[y * mw + x];
      const ter = tile.terrain;
      // Skip ocean, mountains, glacier
      if (ter === 10 || ter === 5 || ter === 7) continue;

      // Compute minimum distance to all existing civ positions
      let minDist = Infinity;
      for (const pos of existingPositions) {
        let dx = Math.abs(x - pos.gx);
        if (wraps) dx = Math.min(dx, mw - dx);
        const dy = Math.abs(y - pos.gy);
        const dist = Math.max(dx, dy);
        if (dist < minDist) minDist = dist;
      }

      if (minDist > bestMinDist) {
        bestMinDist = minDist;
        bestGx = x;
        bestGy = y;
      }
    }
  }

  if (bestGx < 0) return { events, respawnedCiv: null };

  // Create the new civ using createNewCiv from init.js
  const diffIdx = Math.max(0, (['chieftain', 'warlord', 'prince', 'king', 'emperor', 'deity']).indexOf(state.difficulty || 'chieftain'));
  const rulesCivNumber = deadSlot - 1;
  const aiSeat = { seatIndex: -1, name: `AI ${deadSlot}`, ai: true };

  if (!state.civTechs) state.civTechs = Array.from({ length: 8 }, () => new Set());
  if (!state.civTechCounts) state.civTechCounts = new Array(8).fill(0);

  // Clear old tech data for this slot
  state.civTechs[deadSlot] = new Set();
  state.civTechCounts[deadSlot] = 0;

  const newCiv = createNewCiv(deadSlot, rulesCivNumber, diffIdx, state.civTechs, state.civTechCounts, aiSeat, state.rng);
  state.civs = [...state.civs];
  state.civs[deadSlot] = newCiv;

  // Mark alive
  state.civsAlive |= (1 << deadSlot);

  // Place a settler and warrior at the chosen position
  const MOVEMENT_MULTIPLIER = 3; // from defs.js
  state.units = [...state.units];
  for (const unitType of [0, 2]) { // Settlers, Warriors
    state.units.push({
      type: unitType,
      owner: deadSlot,
      gx: bestGx, gy: bestGy,
      x: bestGx * 2 + (bestGy % 2), y: bestGy,
      veteran: 0,
      movesRemain: 0,
      orders: 'none',
      movesMade: 0,
      movesLeft: (unitType === 0 ? 1 : 1) * MOVEMENT_MULTIPLIER,
      homeCityId: 0xFFFF,
      goToX: -1, goToY: -1,
      hpLost: 0xFF,
      commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
      prevInStack: -1, nextInStack: -1,
    });
  }

  // Update visibility for new civ's starting position
  updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, deadSlot, bestGx, bestGy, wraps, 2);

  events.push({
    type: 'civRespawned', civSlot: deadSlot, civName: newCiv.name,
    gx: bestGx, gy: bestGy,
  });

  return { events, respawnedCiv: deadSlot };
}

// ═══════════════════════════════════════════════════════════════════
// AI Patience Threshold — how many turns an AI will tolerate
// provocations before escalating (war declaration, etc.)
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate AI patience threshold toward a target civ.
 * Higher patience = more tolerant of provocations before declaring war.
 *
 * Factors: base patience (2), attitude, Eiffel Tower (wonder 20),
 * and current treaty status.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ computing patience
 * @param {number} targetCiv - civ being evaluated
 * @returns {number} patience threshold (0+)
 */
export function calcPatienceThreshold(state, aiCiv, targetCiv) {
  let patience = 2;
  const attitude = getAttitude(state, aiCiv, targetCiv); // 0-100 scale
  if (attitude < 25) patience += 1;   // hostile: more patient (higher threshold)
  if (attitude > 60) patience -= 1;   // friendly: less patient (lower threshold)
  if (civHasWonder(state, aiCiv, 20)) patience += 1; // Eiffel Tower / Statue of Liberty
  const flags = getTreatyFlags(state, aiCiv, targetCiv);
  if (flags & TF.PEACE) patience += 1;
  if (flags & TF.ALLIANCE) patience += 2;
  // Binary FUN_00456f8b: at war resets patience to base (overrides all modifiers)
  if (flags & TF.WAR) patience = 2;
  return Math.max(0, patience);
}

/**
 * Check if an AI civ should provoke/confront a target civ.
 * Binary: returns true when attitude > 49 AND only contact status (no treaty).
 * Used to decide when to initiate diplomatic incidents.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ
 * @param {number} targetCiv - target civ
 * @returns {boolean}
 */
/**
 * Check if hostile interaction is allowed against a target civ.
 *
 * Binary ref: FUN_00467af0 (should_declare_war, block_00460000.c)
 *   (1) if WAR flag already set → return true (allow continued war actions)
 *   (2) if ALLIANCE → return false
 *   (3) if CONTACT only (no PEACE) AND attitude > 49 → return true
 *   (4) otherwise → false
 */
export function shouldProvoke(state, aiCiv, targetCiv) {
  const flags = getTreatyFlags(state, aiCiv, targetCiv);
  // (1) Already at war: always allow hostile actions
  if (flags & TF.WAR) return true;
  // (2) Allied: never provoke
  if (flags & TF.ALLIANCE) return false;
  // (3) Contact only (no peace/ceasefire) + hostile attitude
  const attitude = getAttitude(state, aiCiv, targetCiv);
  if (attitude <= 49) return false;
  return (flags & TF.CONTACT) !== 0 &&
         !(flags & (TF.CEASEFIRE | TF.PEACE));
}

// ═══════════════════════════════════════════════════════════════════
// Tech Era Classification — binary FUN_00568861
//
// Returns 0 (ancient), 1 (industrial), or 2 (modern) based on
// specific tech combinations the civ has researched.
// ═══════════════════════════════════════════════════════════════════

/**
 * Determine a civ's tech era for diplomacy modifiers.
 * Binary FUN_00568861: checks specific tech pairs.
 *
 * @param {object} state - game state
 * @param {number} civSlot - civ to evaluate
 * @returns {number} 0=ancient, 1=industrial, 2=modern
 */
export function getTechEra(state, civSlot) {
  const techs = state.civTechs?.[civSlot];
  if (!techs) return 0;
  // Modern: has Electricity (5) AND Future Tech (24 = 0x18)
  if (techs.has(5) && techs.has(24)) return 2;
  // Industrial: has Automobile (60 = 0x3C) AND Chemistry (38 = 0x26)
  if (techs.has(60) && techs.has(38)) return 1;
  // Ancient
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// Wonder-blocking in Tech Exchange — binary handle_exchange_gift
//
// Checks if giving a tech to a civ would enable them to build an
// unbuilt wonder. Used by AI to refuse disadvantageous tech trades.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if giving techId to civSlot would enable them to build a
 * wonder they don't yet have. From binary handle_exchange_gift
 * (FUN_0045950B) lines ~4387-4402.
 *
 * A trade is blocked if:
 *   - The tech is a prerequisite for an unbuilt wonder
 *   - The target civ is already building that wonder in a city
 *
 * @param {object} state - game state
 * @param {number} civSlot - civ that would receive the tech
 * @param {number} techId - tech being considered for trade
 * @returns {boolean} true if giving this tech would enable wonder construction
 */
export function wouldEnableWonder(state, civSlot, techId) {
  if (techId < 0) return false;
  // Check each wonder (0-27)
  for (let wi = 0; wi < WONDER_PREREQS.length; wi++) {
    // Wonder's required tech must match the tech being traded
    if (WONDER_PREREQS[wi] !== techId) continue;
    // Wonder must not already be built (cityIndex === null means unbuilt)
    const wonder = state.wonders?.[wi];
    if (wonder && wonder.cityIndex != null) continue;
    // Check if target civ has a city currently building this wonder
    // Wonder build IDs are wonderIndex + 39
    const wonderBuildId = wi + 39;
    if (state.cities) {
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (!city || city.owner !== civSlot || city.size <= 0) continue;
        const item = city.itemInProduction;
        if (item && item.type === 'wonder' && item.id === wonderBuildId) {
          return true;
        }
      }
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════
// Treaty Betrayal Check — binary FUN_0055bef9
//
// Determines whether an AI civ is willing to break a treaty.
// Government type, vendetta status, UN wonder, and target's
// patience counter all factor into the decision.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if an AI civ should betray (break) its current treaty.
 * Port of binary FUN_0055bef9.
 *
 * Logic:
 *   - Government < 5 (anarchy..fundamentalism): never betray
 *   - If Alpha Centauri scenario flag + civ flag: never betray
 *   - Build threshold: counter*15 + vendettaBonus + wonderBonus, clamped [0,75]
 *   - If AI's aggressiveness seed < threshold: don't betray
 *   - Republic (govt=5): betray only if civ has militaristic flag (civFlags & 4)
 *   - Democracy (govt=6): always betray if threshold passes
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ considering betrayal
 * @param {number} targetCiv - target civ
 * @returns {boolean} true if AI should betray the treaty
 */
export function shouldBetrayTreaty(state, aiCiv, targetCiv) {
  const aiCivData = state.civs?.[aiCiv];
  if (!aiCivData) return false;

  // Binary FUN_0055bef9: Senate override check.
  // Returns true if Senate BLOCKS the action (war/aggression).
  // Government check: only Republic (5) and Democracy (6) have a Senate
  const govtKey = aiCivData.government || 'anarchy';
  const govtIdx = GOVT_INDEX[govtKey] ?? 0;
  if (govtIdx < 5) return false; // No Senate → no block

  // Binary line 4869: check senate_overrule_flag in status[aiCiv][targetCiv] byte1 bit 0x10
  let base = 0;
  const aiFlagsTowardTarget = getTreatyFlags(state, aiCiv, targetCiv);
  if (aiFlagsTowardTarget & 0x1000) { // byte1 bit 0x10 = overall bit 12 (0x1000)
    base = 25; // 0x19
  }

  // Binary line 4872-4874: United Nations wonder (0x18 = 24)
  if (civHasWonder(state, aiCiv, 24)) {
    base = 50; // 0x32
  }

  // Binary line 4876: threshold = clamp(base + reputation[targetCiv] * 15, 0, 75)
  // Note: uses the TARGET civ's reputation counter, not the AI's
  const targetRepCounter = state.civs?.[targetCiv]?.reputationCounter ?? 0;
  const threshold = Math.min(Math.max(base + targetRepCounter * 15, 0), 75);

  // Binary line 4877: if aggression_level[aiCiv] < threshold → return 0 (no block)
  const aggressionLevel = aiCivData.aggressionLevel ?? aiCivData.aiRandomSeed ?? 0;
  if (aggressionLevel < threshold) return false;

  // Binary line 4880-4886: Republic (govt=5) — Senate blocks only if "we love" active
  if (govtIdx === 5) {
    // Binary: civ.flags & 0x04 = "we love the king" day flag
    const civFlags = aiCivData.civFlags ?? 0;
    return (civFlags & 4) !== 0;
  }

  // Binary line 4888-4889: Democracy (govt=6) — Senate always blocks
  return true;
}

// ═══════════════════════════════════════════════════════════════════
// Tech Sell Pricing — binary FUN_004591cb
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate the price an AI charges to sell a tech.
 * Binary FUN_004591cb: techValue * 20, attitude/treasury/alliance scaling.
 *
 * @param {object} state - game state
 * @param {number} sellerCiv - civ selling the tech
 * @param {number} buyerCiv - civ buying the tech
 * @param {number} techId - tech being sold
 * @returns {number} price in gold (min 100), or 0 if tech invalid
 */
export function calcTechSellPrice(state, sellerCiv, buyerCiv, techId) {
  if (techId < 0) return 0;

  // Base: tech value * 20
  const techValue = ADVANCE_EPOCH[techId] ?? 1;
  let price = techValue * 20;

  // Attitude scaling: if attitude > 50, reduce price proportionally
  const attitude = getAttitude(state, sellerCiv, buyerCiv);
  if (attitude > 50) {
    price = Math.trunc((attitude * price) / 50);
  }

  // Count how many civs know this tech (more common = cheaper)
  let knowers = 0;
  for (let c = 1; c < 8; c++) {
    if (!(state.civsAlive & (1 << c))) continue;
    if (state.civTechs?.[c]?.has(techId)) knowers++;
  }
  const civDivisor = Math.max(1, knowers - 1);
  price = Math.trunc(price / civDivisor) * 10;

  // Treasury-based scaling: rich buyers pay more
  const buyerTreasury = state.civs?.[buyerCiv]?.treasury || 0;
  if (buyerTreasury > 1500) {
    price = Math.trunc(price * 3 / 2);  // +50% for treasury > 1500
  }
  if (buyerTreasury > 3000) {
    price = Math.trunc(price * 3 / 2);  // +50% again for treasury > 3000
  }

  // Alliance discount: allies get reduced price
  const flags = getTreatyFlags(state, sellerCiv, buyerCiv);
  if (flags & TF.ALLIANCE) {
    price = Math.trunc(price / 2);  // allies: 50% off (or 75% if power advantage)
  }

  // Clamp
  if (price < 100) price = 100;
  if (price < 0) price = 30000;  // overflow protection

  return price;
}

// ═══════════════════════════════════════════════════════════════════
// Tribute Demand — port of FUN_0045705e (block_00450000.c:3546)
//
// In Civ2 MGE, the player does NOT specify a tribute amount. When one civ
// demands tribute from another, the *paying* civ computes how much it is
// willing to pay based on tech disparity, military balance, attitude,
// reputation, alliance status, and certain wonders. The result is offered
// to the demander, who accepts (gold transfers) or refuses (relations
// sour, possibly war).
//
// This function ports the binary's algorithm from FUN_0045705e to JS,
// using the engine's flat civTechs Sets in place of the binary's per-tech
// beaker counters. See spec/diplomacy.md §6.1.1 for the full pseudocode.
// ═══════════════════════════════════════════════════════════════════

/**
 * Compute the tribute amount the payer is willing to pay to the receiver.
 *
 * Returns an object describing the AI's response so the caller (UI or
 * server) can decide whether to display, transfer, or escalate to war.
 *
 * @param {object} state - game state
 * @param {number} payerCiv - civ that would pay (FUN_0045705e param_1)
 * @param {number} receiverCiv - civ that demands (FUN_0045705e param_2)
 * @returns {{ amount: number, willingness: 'pay'|'refuse'|'war', wantsWar: boolean }}
 */
export function calcTributeDemand(state, payerCiv, receiverCiv) {
  const payerCivData = state.civs?.[payerCiv];
  const receiverCivData = state.civs?.[receiverCiv];
  if (!payerCivData || !receiverCivData) {
    return { amount: 0, willingness: 'refuse', wantsWar: false };
  }
  const payerTechs = state.civTechs?.[payerCiv];
  const receiverTechs = state.civTechs?.[receiverCiv];
  if (!payerTechs || !receiverTechs) {
    return { amount: 0, willingness: 'refuse', wantsWar: false };
  }

  // ── Step 1: Per-tech disparity scan (FUN_0045705e:3580-3626) ─────
  // The binary scans 1..63 with per-tech beaker counters; we use a
  // simplified weight = (epoch + 1) since the JS engine has no per-tech
  // research progress.
  let accum = 0;
  let wantsWar = false;
  for (let tech = 1; tech < 64; tech++) {
    const payerHas = payerTechs.has(tech);
    const receiverHas = receiverTechs.has(tech);
    const weight = (ADVANCE_EPOCH[tech] ?? 0) + 1; // 1..4

    if (!payerHas && receiverHas) {
      // Receiver has it, payer doesn't → half the diff (binary line 3607-3609)
      accum += weight * 2;
    } else if (!payerHas && !receiverHas) {
      // Neither has it → quarter the disparity (binary line 3597-3604)
      // No contribution since both are zero.
    } else if (payerHas && !receiverHas) {
      // Payer has it, receiver doesn't (binary line 3613-3623, branch C):
      // The binary uses receiver's beaker count. For us, no contribution
      // since the receiver doesn't have the tech.
    } else {
      // Both have the advance — both researching same things flags wantsWar
      // (binary line 3591-3594)
      // Contribution: receiver_beakers - payer_beakers, ≈ 0 with flat sets.
    }
  }

  // Tech-count disparity also drives demand: receiver has more techs
  // overall → larger demand (proxies the binary's beaker accumulation).
  const techDelta = receiverTechs.size - payerTechs.size;
  if (techDelta > 0) accum += techDelta * 4;

  // ── Step 2: Marco Polo's Embassy bonus (FUN_0045705e:3627-3630) ──
  // Receiver knows payer's wealth → can demand 25% more.
  if (civHasWonder(state, receiverCiv, 9)) {
    accum += accum >> 2;
  }

  // ── Step 3: Working attitude (line 3638) ─────────────────────────
  // Use the receiver's attitude TOWARD the payer (the one being asked)
  let attitude = getAttitude(state, receiverCiv, payerCiv);
  const treaty = getTreaty(state, payerCiv, receiverCiv);

  // ── Step 4: Treaty / reputation modifiers (lines 3680-3690) ──────
  if (treaty === 'alliance') attitude -= 25;
  if (treaty === 'war') attitude += 25;

  const payerReputation = payerCivData.reputation ?? 0;
  if (payerReputation !== 0) {
    // (rep - 1 - violations) * 5; we don't track per-pair violations here
    attitude += (payerReputation - 1) * 5;
  }

  // ── Step 5: Attitude scaling (lines 3691-3704) ───────────────────
  if (attitude < 26) {
    accum = Math.floor(accum / 2);
    wantsWar = false;
  } else {
    const attLevel = getAttitudeLevel(attitude);
    if (attLevel < 4) {
      accum = Math.floor((accum * 2) / 3);
    } else if (attitude > 0x4A) {
      accum = Math.floor((accum * 3) / 2);
      wantsWar = true;
    }
  }

  // Alliance flag also forces wantsWar (line 3705-3707) — note this is
  // the byte1 0x08 which the JS treaty system maps via TF.ALLIANCE.
  // Skipped: requires the byte1 ALLIANCE flag which isn't tracked here.

  // ── Step 6: Pacifist wonders (lines 3715-3722) ───────────────────
  // Payer has Great Wall (6) or United Nations (24) → cancel aggression.
  // Note: in the binary, these checks apply to the *demander* (param_1)
  // wanting to make demands of *us*; we mirror by checking the payer's
  // wonders to suppress wantsWar when the payer is shielded.
  if (civHasWonder(state, payerCiv, 6) || civHasWonder(state, payerCiv, 24)) {
    wantsWar = false;
    attitude -= 10;
  }

  // ── Step 7: Reputation multiplier (line 3723-3726) ───────────────
  if (payerReputation > 0) {
    accum += Math.floor((payerReputation * accum) / 2);
  }

  // ── Step 8: Final scaling and rounding (lines 3737-3747) ─────────
  const diffIdx = DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain');
  let scaled = Math.floor(((diffIdx + 1) * accum) / 32);
  scaled = Math.max(0, Math.min(20, scaled));
  let amount = scaled * 50;

  // Treasury cap (lines 3743-3747): if demand > treasury but < 2× treasury
  // and treasury > 50, snap to (treasury / 50) * 50.
  const treasury = payerCivData.treasury ?? 0;
  if (amount > treasury && amount < treasury * 2 && treasury > 49) {
    amount = Math.floor(treasury / 50) * 50;
  }

  // ── Step 9: Allied cap (FUN_00460129:312-319) ────────────────────
  // Allies cannot drain each other; cap at max(100, treasury/2).
  if (treaty === 'alliance') {
    const cap = Math.max(100, Math.floor(treasury / 2));
    if (cap < amount) amount = cap;
  }

  // ── Step 10: Refusal-on-strength (lines 3748-3756) ───────────────
  // If amount is 0 or payer is much stronger militarily, no demand.
  if (amount === 0) {
    wantsWar = false;
  }

  // Affordability: cannot exceed treasury (FUN_00460129:310 gates the
  // dialog on `DAT_0064b118 <= gold[payer]`)
  if (amount > treasury) amount = 0;

  // Determine willingness:
  //   amount > 0   → 'pay' (AI offers the amount)
  //   amount == 0 AND wantsWar → 'war' (AI provoked into hostility)
  //   amount == 0 AND NOT wantsWar → 'refuse' (AI ignores the demand)
  let willingness;
  if (amount > 0) {
    willingness = 'pay';
  } else if (wantsWar) {
    willingness = 'war';
  } else {
    willingness = 'refuse';
  }

  return { amount, willingness, wantsWar };
}

// ═══════════════════════════════════════════════════════════════════
// Gold-to-Attitude Conversion — bracketed diminishing returns
//
// Port of FUN_004dd285 gold gift attitude calculation:
//   First 50 gold:  attitude += amount / 10
//   Next 100 gold brackets: attitude += bracket / (10 + 5*n)
//   Examples: 50g→5, 150g→11, 250g→16, 500g→25
// ═══════════════════════════════════════════════════════════════════

/**
 * Convert a gold gift amount to an attitude change using
 * bracketed diminishing returns.
 *
 * @param {number} amount - gold amount (non-negative)
 * @returns {number} integer attitude change
 */
export function calcGoldToAttitude(amount) {
  if (amount <= 0) return 0;
  let attitude = 0;
  let remaining = amount;

  // First 50 gold: divisor 10
  const first = Math.min(remaining, 50);
  attitude += first / 10;
  remaining -= first;

  // Subsequent 100-gold brackets with increasing divisors
  let n = 1;
  while (remaining > 0) {
    const bracket = Math.min(remaining, 100);
    attitude += bracket / (10 + 5 * n);
    remaining -= bracket;
    n++;
  }

  return Math.floor(attitude);
}

// ═══════════════════════════════════════════════════════════════════
// Tech Price Calculation — diplomacy tech sale pricing
//
// Port of parley tech price computation from FUN_004dd285:
//   base = techEpoch * 20
//   buyer attitude > 50: base *= 2
//   difficulty multiplier: (diffIdx + 1)
//   epoch scaling: × (epoch + 1)
//   treasury scaling: buyer treasury > 3000 → ×2, > 1500 → ×3/2
//   alliance discount: ÷2
//   clamped to [100, 30000]
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate the price of a technology in a diplomatic sale.
 *
 * @param {object} state - game state
 * @param {number} sellerCiv - civ slot selling the tech
 * @param {number} buyerCiv - civ slot buying the tech
 * @param {number} techId - advance ID (0-88)
 * @returns {number} price in gold, clamped to [100, 30000]
 */
export function calcTechPrice(state, sellerCiv, buyerCiv, techId) {
  const epoch = ADVANCE_EPOCH[techId] ?? 0;
  let price = epoch * 20;

  // Buyer attitude toward seller: if friendly (> 50), double base
  const buyerAttitude = state.civs?.[buyerCiv]?.attitudes?.[sellerCiv] ?? 0;
  if (buyerAttitude > 50) price *= 2;

  // Difficulty multiplier
  const diffIdx = DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain');
  price *= (diffIdx >= 0 ? diffIdx : 0) + 1;

  // Epoch scaling
  price *= (epoch + 1);

  // Treasury scaling
  const buyerTreasury = state.civs?.[buyerCiv]?.treasury ?? 0;
  if (buyerTreasury > 3000) {
    price *= 2;
  } else if (buyerTreasury > 1500) {
    price = Math.floor(price * 3 / 2);
  }

  // Alliance discount
  const treaty = getTreaty(state, sellerCiv, buyerCiv);
  if (treaty === 'alliance') {
    price = Math.floor(price / 2);
  }

  // Clamp to [100, 30000]
  return Math.max(100, Math.min(30000, Math.floor(price)));
}

// ═══════════════════════════════════════════════════════════════════
// Diplomacy Event Constants & Fire Function
//
// Used by AI diplomacy (diplomai.js) to push structured events into
// the turn event queue. These correspond to the diplomacy text events
// in the original Civ2 binary (DIPLOMACY.TXT dialog keys).
// ═══════════════════════════════════════════════════════════════════

export const DIPLO_EVENTS = {
  WARENDS:       'WARENDS',       // War has ended (peace signed)
  NEARCITY:      'NEARCITY',      // Foreign unit near our city (peace)
  ADMIRECITY:    'ADMIRECITY',    // AI admires a city (positive event)
  TERMS:         'TERMS',         // AI demands terms (treaty negotiation)
  INTRUDER:      'INTRUDER',      // Single intruder detected in territory
  INTRUDERS:     'INTRUDERS',     // Multiple intruders in territory
  VIOLATOR:      'VIOLATOR',      // Single ceasefire violator
  VIOLATORS:     'VIOLATORS',     // Multiple ceasefire violators
  WITHDRAWN:     'WITHDRAWN',     // Units have withdrawn from territory
  VIOLATE:       'VIOLATE',       // Alliance violation detected
  SENATESCANDAL: 'SENATESCANDAL', // Senate scandal (espionage caught)
  HELPME:        'HELPME',        // AI requests military alliance
  CRUSADE:       'CRUSADE',       // Multi-civ coalition against dominant civ
};

/**
 * Push a diplomacy event into the turn event queue.
 *
 * Events accumulate in state.turnEvents during AI processing and are
 * consumed by the client for display (dialog popups, notifications).
 *
 * @param {object} state - mutable game state
 * @param {string} eventKey - one of DIPLO_EVENTS keys
 * @param {number} aiCiv - AI civ generating the event
 * @param {number} targetCiv - civ the event is directed at
 * @param {object} [data] - additional event-specific data
 */
export function fireDiplomacyEvent(state, eventKey, aiCiv, targetCiv, data) {
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({
    type: 'diplomacyEvent',
    event: eventKey,
    aiCiv,
    targetCiv,
    ...data,
  });
}

// ═══════════════════════════════════════════════════════════════════
// Mercenary Pricing — calcMercenaryPrice
//
// Calculate the gold price for hiring a unit from another civ.
// Modifiers: reputation, treasury ratio, alliance, superpower,
// vendetta, and era (modern tech discount).
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate the price a mercenary civ charges to hire out a unit.
 *
 * @param {object} state - game state
 * @param {number} hirerCiv - civ slot of the hirer (buyer)
 * @param {number} mercCiv - civ slot of the mercenary owner (seller)
 * @param {number} unitIndex - index into state.units
 * @returns {number} gold price, clamped to [50, 5000]
 */
export function calcMercenaryPrice(state, hirerCiv, mercCiv, unitIndex) {
  const unit = state.units?.[unitIndex];
  if (!unit || unit.gx < 0) return 50;

  const shieldCost = UNIT_COSTS[unit.type] ?? 40;
  let price = shieldCost * 10;

  // Reputation modifier: untrustworthy hirer pays double
  const hirerRep = state.civs?.[hirerCiv]?.reputation ?? 100;
  if (hirerRep > 5) price *= 2;

  // Treasury modifier: richer hirer pays +33%
  const hirerTreasury = state.civs?.[hirerCiv]?.treasury ?? 0;
  const mercTreasury = state.civs?.[mercCiv]?.treasury ?? 0;
  if (hirerTreasury > mercTreasury) {
    price = Math.floor(price * 1.33);
  }

  // Alliance modifier: premium for buying ally's units
  const treaty = getTreaty(state, hirerCiv, mercCiv);
  if (treaty === 'alliance') {
    price *= 3;
  }

  // Superpower modifier: dominant hirer gets discount
  const hirerMil = state.civs?.[hirerCiv]?.militaryPower ?? 0;
  const mercMil = state.civs?.[mercCiv]?.militaryPower ?? 0;
  if (hirerMil >= mercMil * 2) {
    price = Math.floor(price / 2);
  }

  // Vendetta: discount if vendetta exists between them
  const flags = getTreatyFlags(state, hirerCiv, mercCiv);
  if (flags & TF.VENDETTA) {
    price = Math.floor(price * 0.75);
  }

  // Era: modern era discount (techCount > 40)
  const hirerTechCount = state.civTechCounts?.[hirerCiv] ?? (state.civTechs?.[hirerCiv]?.size ?? 0);
  if (hirerTechCount > 40) {
    price = Math.floor(price * 0.67);
  }

  // Clamp to [50, 5000]
  return Math.max(50, Math.min(5000, price));
}

// ═══════════════════════════════════════════════════════════════════
// Government Change Side Effects
// Port of binary government transition logic (FUN_005b0f45)
// ═══════════════════════════════════════════════════════════════════

/**
 * Apply side effects when a civ changes government.
 *
 * Two effects ported from the binary:
 *   1. Leaving Fundamentalism: any city producing Fanatics (unit type 8)
 *      switches production to Riflemen (type 11). Fanatics can only be
 *      built under Fundamentalism.
 *   2. Embassy treaties are cleared on government change. The binary
 *      removes the EMBASSY flag (0x80) from all treaty pairs involving
 *      this civ, since the new government doesn't inherit the previous
 *      government's diplomatic infrastructure.
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot - civ whose government changed
 * @param {string} oldGovt - previous government key
 * @param {string} newGovt - new government key
 * @returns {object[]} events generated
 */
export function applyGovernmentChangeEffects(state, civSlot, oldGovt, newGovt) {
  const events = [];

  // ── Effect 1: Leaving Fundamentalism → switch Fanatics production to Riflemen ──
  if (oldGovt === 'fundamentalism' && newGovt !== 'fundamentalism') {
    if (state.cities) {
      let citiesMutated = false;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== civSlot || city.size <= 0) continue;
        const item = city.itemInProduction;
        if (item && item.type === 'unit' && item.id === 8) {
          // Fanatics (type 8) → Riflemen (type 11)
          if (!citiesMutated) { state.cities = [...state.cities]; citiesMutated = true; }
          state.cities[ci] = {
            ...city,
            itemInProduction: { type: 'unit', id: 11, name: 'Riflemen' },
            shieldsStored: 0,
          };
          events.push({
            type: 'productionSwitched', civSlot, cityIndex: ci,
            from: 'Fanatics', to: 'Riflemen',
            reason: 'Left Fundamentalism',
          });
        }
      }
    }
  }

  // ── Effect 2: Clear VENDETTA flags on government change ──
  // Binary FUN_0055c066: clears VENDETTA (0x10) from all treaty pairs involving this civ.
  if (state.treatyFlags) {
    let flagsMutated = false;
    for (let other = 1; other <= 7; other++) {
      if (other === civSlot) continue;
      const kAB = `${civSlot}-${other}`;
      const kBA = `${other}-${civSlot}`;
      const ab = state.treatyFlags[kAB] || 0;
      const ba = state.treatyFlags[kBA] || 0;
      if ((ab & TF.VENDETTA) || (ba & TF.VENDETTA)) {
        if (!flagsMutated) { state.treatyFlags = { ...state.treatyFlags }; flagsMutated = true; }
        if (ab & TF.VENDETTA) {
          state.treatyFlags[kAB] = ab & ~TF.VENDETTA;
        }
        if (ba & TF.VENDETTA) {
          state.treatyFlags[kBA] = ba & ~TF.VENDETTA;
        }
        events.push({
          type: 'embassyExpelled', civSlot, otherCiv: other,
          reason: 'Government change',
        });
      }
    }
  }

  // ── Effect 3: Recalculate happiness for all civ's cities ──
  // Binary FUN_0055c066 line 4927: thunk_FUN_004eb4ed(city, 1) recalculates
  // per-city yields/happiness after government change. Government affects
  // corruption, free support, martial law, WLTKD — all happiness-relevant.
  // The JS happiness system recalculates lazily on next city turn, which is
  // equivalent since government changes always happen between turns.

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// Alliance Violation Check — FUN_00560084 @ 0x005602D8
//
// Per-turn check: if treaty flag 0x20 (INTRUDER) is set between an
// AI civ and another civ, evaluate alliance violation response.
// Uses tolerance-based random roll to decide severity.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check and handle alliance violations for an AI civ.
 * Binary ref: FUN_00560084 @ 0x005602D8 — checks flag 0x20.
 *
 * If INTRUDER flag (0x20) is set on treatyFlags[otherCiv][aiCiv]:
 *   - Roll tolerance check: clamp(3 - (tolerance >> 2), 1, 3)
 *   - If roll triggers and allied: set attitude to 100 (max hostility)
 *   - If roll triggers and NOT allied: break treaties, set hostility flags
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map accessor
 * @param {number} aiCiv - AI civ performing the check
 * @returns {object[]} events
 */
export function checkAllianceViolations(state, mapBase, aiCiv) {
  const events = [];
  if (!state.treatyFlags) return events;

  const aiCivData = state.civs?.[aiCiv];
  if (!aiCivData || aiCivData.isHuman) return events;

  const tolerance = aiCivData.tolerance ?? 0;

  for (let other = 1; other <= 7; other++) {
    if (other === aiCiv) continue;
    if (!(state.civsAlive & (1 << other))) continue;

    const flagsOtherToAi = getTreatyFlags(state, other, aiCiv);
    if (!(flagsOtherToAi & TF.INTRUDER)) continue;

    // Tolerance-based random roll: clamp(3 - (tolerance >> 2), 1, 3)
    let toleranceRolls = Math.max(1, Math.min(3, 3 - (tolerance >> 2)));
    const rng = state.rng;
    const roll = (toleranceRolls <= 1) ? 0 : (rng ? rng.nextInt(toleranceRolls) : Math.floor(Math.random() * toleranceRolls));

    if (roll !== 0) continue; // Only triggers when roll == 0

    const isAllied = !!(flagsOtherToAi & TF.ALLIANCE);

    if (isAllied) {
      // Allied: set attitude to 100 (maximum hostility), clear INTRUDER
      adjustAttitude(state, aiCiv, other, +100);
      // Clear INTRUDER flag
      let newFlags = flagsOtherToAi & ~TF.INTRUDER;
      setTreatyFlags(state, other, aiCiv, newFlags);
      events.push({
        type: 'allianceViolation', aiCiv, otherCiv: other,
        response: 'maxHostility',
      });
    } else {
      // Not allied: break treaties, set hostility flags, can trigger war
      // Clear CEASEFIRE+PEACE+INTRUDER, set WAR_STARTED + PERIODIC_FLAG_19 + HOSTILITY
      let newFlags = flagsOtherToAi;
      newFlags &= ~(TF.CEASEFIRE | TF.PEACE | TF.INTRUDER);
      newFlags |= TF.PERIODIC_FLAG_19 | TF.WAR_STARTED | TF.HOSTILITY;
      setTreatyFlags(state, other, aiCiv, newFlags);

      // Sync treaty string
      const newStatus = flagsToStatus(newFlags);
      if (!state.treaties) state.treaties = {};
      state.treaties = { ...state.treaties, [treatyKey(aiCiv, other)]: newStatus };

      events.push({
        type: 'allianceViolation', aiCiv, otherCiv: other,
        response: 'breakTreaties',
      });
    }
  }

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// Attitude Scale Documentation
//
// NOTE (#109): The binary uses a 0-100 attitude scale where higher
// values = more hostile in the AI decision-making context.
// Our JS engine uses the same 0-100 scale:
//   adjustAttitude clamps to [0, 100]
//   In binary, thunk_FUN_00456f20(civ, other, +100) = max hostility
//   In binary, thunk_FUN_00456f20(civ, other, -25) = more friendly
//
// The attitude brackets (getAttitudeLevel) map:
//   0: Enraged, 1-10: Furious, ..., 90-99: Enthusiastic, 100: Worshipful
//
// This creates an APPARENT inversion: getAttitudeLevel says 100=Worshipful
// (most friendly display) but the AI scoring treats high values as hostile.
// This is because getAttitudeLevel is a DISPLAY function for the human
// player's view, while the AI's raw attitude score is a hostility metric.
//
// For now the dual interpretation is documented. A full normalization
// would require auditing every attitude read/write across the codebase.
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// #50: Mercenary Hiring — hire a civ to attack another
//
// Binary FUN_00459b2a: price based on military strength ratio,
// reputation threshold, 50% betrayal chance, gold payment.
// ═══════════════════════════════════════════════════════════════════

/**
 * Hire a civ (mercenaryCiv) to attack a target civ.
 * Price formula: baseCost * (targetMil / mercMil) clamped [100, 5000].
 * Reputation gate: hirer reputation must be >= 40.
 * 50% betrayal chance: mercenary may take gold but not attack.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} hirerCiv - civ paying for the attack
 * @param {number} mercenaryCiv - civ being hired to attack
 * @param {number} targetCiv - civ to be attacked
 * @returns {{ events: object[], success: boolean, price: number, betrayed: boolean }}
 */
export function hireMercenary(state, mapBase, hirerCiv, mercenaryCiv, targetCiv) {
  const events = [];

  // Reputation gate: hirer must have >= 40 reputation
  const hirerRep = getReputation(state, hirerCiv);
  if (hirerRep < 40) {
    events.push({ type: 'mercenaryRejected', hirerCiv, mercenaryCiv, targetCiv, reason: 'reputationTooLow' });
    return { events, success: false, price: 0, betrayed: false };
  }

  // Calculate price based on military strength ratio
  const mercMil = state.civs?.[mercenaryCiv]?.militaryPower || 1;
  const targetMil = state.civs?.[targetCiv]?.militaryPower || 1;
  const ratio = Math.max(1, Math.floor(targetMil / mercMil));
  const baseCost = 200;
  let price = baseCost * ratio;
  price = Math.max(100, Math.min(5000, price));

  // Check if hirer can afford
  const treasury = state.civs?.[hirerCiv]?.treasury || 0;
  if (treasury < price) {
    events.push({ type: 'mercenaryRejected', hirerCiv, mercenaryCiv, targetCiv, reason: 'insufficientGold' });
    return { events, success: false, price, betrayed: false };
  }

  // Deduct gold from hirer, add to mercenary
  state.civs = [...state.civs];
  const hirerData = { ...state.civs[hirerCiv] };
  const mercData = { ...state.civs[mercenaryCiv] };
  hirerData.treasury = (hirerData.treasury || 0) - price;
  mercData.treasury = (mercData.treasury || 0) + price;
  state.civs[hirerCiv] = hirerData;
  state.civs[mercenaryCiv] = mercData;

  // 50% betrayal chance: mercenary takes gold but does not attack
  const rng = state.rng;
  const roll = rng ? rng.nextInt(2) : Math.floor(Math.random() * 2);
  if (roll === 0) {
    // Betrayal: mercenary keeps gold, no war declaration
    events.push({
      type: 'mercenaryBetrayed', hirerCiv, mercenaryCiv, targetCiv, price,
    });
    return { events, success: false, price, betrayed: true };
  }

  // Success: mercenary declares war on target
  const warResult = declareWar(state, mapBase, mercenaryCiv, targetCiv, hirerCiv);
  events.push(...warResult.events);

  events.push({
    type: 'mercenaryHired', hirerCiv, mercenaryCiv, targetCiv, price,
  });

  return { events, success: true, price, betrayed: false };
}

// ═══════════════════════════════════════════════════════════════════
// #51: Tech/Military Gift Attitude Adjustment
//
// Binary FUN_0045f0b1: tech gift adjusts attitude by techValue * 4.
// Military gift: 50% chance of AI tech breakthrough.
// ═══════════════════════════════════════════════════════════════════

/**
 * Process a military gift (units/gold earmarked for military).
 * 50% chance the receiving AI achieves a tech breakthrough.
 *
 * @param {object} state - mutable game state
 * @param {number} fromCiv - civ giving the military gift
 * @param {number} toCiv - civ receiving the military gift
 * @returns {{ events: object[] }}
 */
export function processMilitaryGift(state, fromCiv, toCiv) {
  const events = [];

  // 50% chance of AI tech breakthrough for military gifts
  const rng = state.rng;
  const roll = rng ? rng.nextInt(2) : Math.floor(Math.random() * 2);
  if (roll === 0) {
    // Find an unresearched tech the AI could learn
    const toTechs = state.civTechs?.[toCiv];
    if (toTechs) {
      for (let t = 0; t < 89; t++) {
        if (toTechs.has(t)) continue;
        // Check prerequisites
        const [p1, p2] = ADVANCE_PREREQS[t] || [-1, -1];
        if (p1 >= 0 && !toTechs.has(p1)) continue;
        if (p2 >= 0 && !toTechs.has(p2)) continue;
        if (p1 === -2 || p2 === -2) continue; // unresearchable
        // Grant the breakthrough
        grantAdvance(state, toCiv, t);
        events.push({
          type: 'militaryGiftBreakthrough',
          fromCiv,
          toCiv,
          advanceId: t,
        });
        break;
      }
    }
  }

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// #52: Tech Exchange Negotiation
//
// AI evaluates tech value, selects best tech, applies attitude gates,
// wonder blocking, difficulty-based restrictions.
// ═══════════════════════════════════════════════════════════════════

/**
 * AI evaluates which tech to request in exchange for a given tech.
 * Binary handle_exchange_gift (FUN_0045950B): AI picks highest-value
 * tech the player has that the AI lacks, subject to attitude gates,
 * wonder blocking, and difficulty restrictions.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ evaluating the exchange
 * @param {number} playerCiv - player civ offering
 * @param {number} offeredTechId - tech the player is offering
 * @returns {{ acceptedTech: number, requestedTech: number, reason: string|null }}
 */
export function evaluateTechExchange(state, aiCiv, playerCiv, offeredTechId) {
  const aiTechs = state.civTechs?.[aiCiv];
  const playerTechs = state.civTechs?.[playerCiv];
  if (!aiTechs || !playerTechs) return { acceptedTech: -1, requestedTech: -1, reason: 'noTechData' };

  // Attitude gate: AI must have attitude level >= 3 (Uncooperative or better)
  const attitude = getAttitude(state, aiCiv, playerCiv);
  const attLevel = getAttitudeLevel(attitude);
  if (attLevel < 3) {
    return { acceptedTech: -1, requestedTech: -1, reason: 'attitudeTooLow' };
  }

  // Check offered tech is valid: player has it, AI doesn't
  if (!playerTechs.has(offeredTechId) || aiTechs.has(offeredTechId)) {
    return { acceptedTech: -1, requestedTech: -1, reason: 'invalidOffer' };
  }

  // Wonder blocking: reject if offered tech would enable AI to build an unbuilt wonder
  // (AI doesn't want player getting wonder-enabling techs either)
  // Check if any tech the AI could give would enable player wonder construction
  const offeredValue = (ADVANCE_EPOCH[offeredTechId] ?? 0) + 1 + (ADVANCE_AI_INTEREST[offeredTechId] ?? 0);

  // Difficulty restriction: on higher difficulties, AI won't trade modern techs
  const diffIdx = getDifficultyIdx(state, aiCiv);
  if (diffIdx >= 4) { // Emperor or Deity
    const epoch = ADVANCE_EPOCH[offeredTechId] ?? 0;
    if (epoch >= 3) {
      return { acceptedTech: -1, requestedTech: -1, reason: 'difficultyRestriction' };
    }
  }

  // Select best tech AI could request: highest value tech player has that AI lacks
  let bestTech = -1;
  let bestValue = -1;
  for (let t = 0; t < 89; t++) {
    if (!playerTechs.has(t) || aiTechs.has(t)) continue;
    // Skip if AI already has this tech
    // Check prerequisites: AI must have all prereqs to use this tech
    const [p1, p2] = ADVANCE_PREREQS[t] || [-1, -1];
    if (p1 >= 0 && !aiTechs.has(p1)) continue;
    if (p2 >= 0 && !aiTechs.has(p2)) continue;
    if (p1 === -2 || p2 === -2) continue;

    // Wonder blocking: skip if giving this tech to AI enables wonder for player
    if (wouldEnableWonder(state, playerCiv, t)) continue;

    const techVal = (ADVANCE_EPOCH[t] ?? 0) + 1 + (ADVANCE_AI_INTEREST[t] ?? 0);
    if (techVal > bestValue) {
      bestValue = techVal;
      bestTech = t;
    }
  }

  if (bestTech < 0) {
    return { acceptedTech: offeredTechId, requestedTech: -1, reason: 'noSuitableTech' };
  }

  // Value comparison: AI wants roughly equal or better value
  if (bestValue < offeredValue - 1) {
    return { acceptedTech: offeredTechId, requestedTech: bestTech, reason: 'valueMismatch' };
  }

  return { acceptedTech: offeredTechId, requestedTech: bestTech, reason: null };
}

// ═══════════════════════════════════════════════════════════════════
// #82: Auto-Alliance with Common Enemy
//
// Proactively seek common enemies for alliance formation.
// Binary AI diplomacy: scan all civ pairs for mutual wars and
// propose alliance if both civs are fighting the same enemy.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if two civs should auto-ally based on a common enemy.
 * Binary AI logic: if civA and civB are both at war with the same
 * third civ and have contact but no alliance, propose alliance.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} aiCiv - AI civ seeking alliance
 * @returns {{ events: object[] }}
 */
export function seekCommonEnemyAlliance(state, mapBase, aiCiv) {
  const events = [];
  if (!state.civs?.[aiCiv] || state.civs[aiCiv].isHuman) return { events };

  for (let candidate = 1; candidate <= 7; candidate++) {
    if (candidate === aiCiv) continue;
    if (!(state.civsAlive & (1 << candidate))) continue;
    if (!haveContact(state, aiCiv, candidate)) continue;

    // Skip if already allied
    const treaty = getTreaty(state, aiCiv, candidate);
    if (treaty === 'alliance') continue;

    // Count common enemies
    let commonEnemies = 0;
    for (let e = 1; e <= 7; e++) {
      if (e === aiCiv || e === candidate) continue;
      if (!(state.civsAlive & (1 << e))) continue;
      if (getTreaty(state, aiCiv, e) === 'war' && haveContact(state, aiCiv, e) &&
          getTreaty(state, candidate, e) === 'war' && haveContact(state, candidate, e)) {
        commonEnemies++;
      }
    }

    if (commonEnemies >= 1) {
      // Attitude gate: need at least Neutral (attLevel >= 4)
      const attitude = getAttitude(state, aiCiv, candidate);
      const attLevel = getAttitudeLevel(attitude);
      if (attLevel >= 4) {
        // Form alliance
        const result = formAlliance(state, mapBase, aiCiv, candidate);
        events.push(...result.events);
        events.push({
          type: 'autoAllianceCommonEnemy',
          aiCiv,
          alliedWith: candidate,
          commonEnemies,
        });
        break; // Only one auto-alliance per turn
      }
    }
  }

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// #83: Auto-Alliance Break
//
// Break alliances when mutual enemy count exceeds patience threshold.
// Binary: if ally is at war with too many of our friends, break alliance.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if an AI civ should break an existing alliance due to too
 * many mutual enemies (ally is fighting our friends).
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} aiCiv - AI civ evaluating alliances
 * @returns {{ events: object[] }}
 */
export function checkAutoAllianceBreak(state, mapBase, aiCiv) {
  const events = [];
  if (!state.civs?.[aiCiv] || state.civs[aiCiv].isHuman) return { events };

  const patienceThreshold = calcPatienceThreshold(state, aiCiv, aiCiv);

  for (let ally = 1; ally <= 7; ally++) {
    if (ally === aiCiv) continue;
    if (!(state.civsAlive & (1 << ally))) continue;
    if (getTreaty(state, aiCiv, ally) !== 'alliance') continue;

    // Count how many civs we're friendly with that the ally is at war with
    let conflictCount = 0;
    for (let c = 1; c <= 7; c++) {
      if (c === aiCiv || c === ally) continue;
      if (!(state.civsAlive & (1 << c))) continue;
      // Our friend (peace or better) is at war with our ally
      const ourTreaty = getTreaty(state, aiCiv, c);
      if ((ourTreaty === 'peace' || ourTreaty === 'alliance') &&
          getTreaty(state, ally, c) === 'war' && haveContact(state, ally, c)) {
        conflictCount++;
      }
    }

    if (conflictCount > patienceThreshold) {
      const result = breakAlliance(state, mapBase, aiCiv, ally);
      events.push(...result.events);
      events.push({
        type: 'autoAllianceBreak',
        aiCiv,
        brokenWith: ally,
        conflictCount,
        patienceThreshold,
      });
    }
  }

  return { events };
}

// ═══════════════════════════════════════════════════════════════════
// #88: Demand Ally Help
//
// Player-to-AI interaction for demanding military assistance from
// an allied civ. AI evaluates attitude + military strength.
// ═══════════════════════════════════════════════════════════════════

/**
 * Demand military assistance from an allied AI civ.
 * AI evaluates whether to help based on attitude and military strength.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} demander - civ requesting help
 * @param {number} allyCiv - allied AI civ being asked for help
 * @param {number} enemyCiv - civ the demander is at war with
 * @returns {{ events: object[], accepted: boolean }}
 */
export function demandAllyHelp(state, mapBase, demander, allyCiv, enemyCiv) {
  const events = [];

  // Must be allied
  if (getTreaty(state, demander, allyCiv) !== 'alliance') {
    events.push({ type: 'allyHelpRejected', demander, allyCiv, enemyCiv, reason: 'notAllied' });
    return { events, accepted: false };
  }

  // Must be at war with enemy
  if (getTreaty(state, demander, enemyCiv) !== 'war') {
    events.push({ type: 'allyHelpRejected', demander, allyCiv, enemyCiv, reason: 'notAtWar' });
    return { events, accepted: false };
  }

  // Attitude check: ally's attitude toward demander must be >= 40
  const attitude = getAttitude(state, allyCiv, demander);
  if (attitude < 40) {
    events.push({ type: 'allyHelpRejected', demander, allyCiv, enemyCiv, reason: 'attitudeTooLow' });
    // Decrement patience for refusing
    incrementPatience(state, allyCiv);
    return { events, accepted: false };
  }

  // Military strength check: ally won't commit if enemy is 3x stronger
  const allyMil = state.civs?.[allyCiv]?.militaryPower || 0;
  const enemyMil = state.civs?.[enemyCiv]?.militaryPower || 0;
  if (enemyMil > allyMil * 3) {
    events.push({ type: 'allyHelpRejected', demander, allyCiv, enemyCiv, reason: 'enemyTooStrong' });
    return { events, accepted: false };
  }

  // Accept: ally declares war on enemy if not already at war
  if (getTreaty(state, allyCiv, enemyCiv) !== 'war') {
    const warResult = declareWar(state, mapBase, allyCiv, enemyCiv, demander);
    events.push(...warResult.events);
  }

  events.push({
    type: 'allyHelpAccepted', demander, allyCiv, enemyCiv,
  });

  return { events, accepted: true };
}

// ═══════════════════════════════════════════════════════════════════
// #89: Unit Transfer (case 8) — handled by existing transferUnits
// with stack splitting and terrain compatibility already implemented.
// This section documents the integration point for the parley
// executeTransaction case 8 dispatch.
//
// Already implemented in executeTransaction → transferUnits with:
//   - Stack pointer splitting (prevInStack/nextInStack)
//   - Terrain compatibility check + 45-tile spiral fallback
//   - Rehoming to nearest city of new owner
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// #90: Contact Sharing (case 9)
//
// Share knowledge of third civs: when one civ shares contact info
// about a third civ, the receiving civ gains CONTACT flag with that
// third civ (but no embassy or treaty).
// ═══════════════════════════════════════════════════════════════════

/**
 * Share knowledge of third-party civs between two civs.
 * The sharer reveals all civs they have contacted to the receiver.
 *
 * @param {object} state - mutable game state
 * @param {number} sharerCiv - civ sharing contact knowledge
 * @param {number} receiverCiv - civ receiving knowledge
 * @returns {{ events: object[], sharedContacts: number[] }}
 */
export function shareContacts(state, sharerCiv, receiverCiv) {
  const events = [];
  const sharedContacts = [];

  for (let c = 1; c <= 7; c++) {
    if (c === sharerCiv || c === receiverCiv) continue;
    if (!(state.civsAlive & (1 << c))) continue;

    // Sharer must have contact with this civ
    if (!haveContact(state, sharerCiv, c)) continue;

    // Receiver must NOT already have contact
    if (haveContact(state, receiverCiv, c)) continue;

    // Grant contact: set CONTACT flag both ways
    addTreatyFlag(state, receiverCiv, c, TF.CONTACT);

    // Set initial treaty status (no treaty = at war by default in Civ2)
    setTreaty(state, receiverCiv, c, 'war');

    sharedContacts.push(c);

    events.push({
      type: 'contactShared',
      sharerCiv,
      receiverCiv,
      revealedCiv: c,
    });
  }

  return { events, sharedContacts };
}

// ═══════════════════════════════════════════════════════════════════
// #114: Map Exchange Prerequisites
//
// Check alliance status, attitude, and Alphabet/Writing tech before
// allowing map exchange. Binary requires both civs to have Alphabet
// (tech 1) and Writing (tech 88) before maps can be exchanged.
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if map exchange is allowed between two civs.
 * Prerequisites:
 *   1. Both civs must have Alphabet (tech 1) AND Writing (tech 88)
 *   2. Must have alliance status OR attitude level >= 5 (Cordial)
 *
 * @param {object} state - game state
 * @param {number} civA - first civ
 * @param {number} civB - second civ
 * @returns {{ allowed: boolean, reason: string|null }}
 */
export function canExchangeMaps(state, civA, civB) {
  const TECH_ALPHABET = 1;
  const TECH_WRITING = 88;

  // Check tech prerequisites
  const techsA = state.civTechs?.[civA];
  const techsB = state.civTechs?.[civB];

  if (!techsA || !techsA.has(TECH_ALPHABET) || !techsA.has(TECH_WRITING)) {
    return { allowed: false, reason: 'missingTechCivA' };
  }
  if (!techsB || !techsB.has(TECH_ALPHABET) || !techsB.has(TECH_WRITING)) {
    return { allowed: false, reason: 'missingTechCivB' };
  }

  // Check diplomatic prerequisites: alliance OR attitude >= Cordial
  const treaty = getTreaty(state, civA, civB);
  if (treaty === 'alliance') {
    return { allowed: true, reason: null };
  }

  // Check attitude in both directions
  const attA = getAttitude(state, civA, civB);
  const attB = getAttitude(state, civB, civA);
  const levelA = getAttitudeLevel(attA);
  const levelB = getAttitudeLevel(attB);

  if (levelA >= 5 && levelB >= 5) {
    return { allowed: true, reason: null };
  }

  return { allowed: false, reason: 'insufficientDiplomacy' };
}

// ═══════════════════════════════════════════════════════════════════
// #129: Civ Elimination Tile Reassignment
//
// When a civ is eliminated, scan 45-tile radius per city and
// reassign tiles to the nearest alive civ's city.
// ═══════════════════════════════════════════════════════════════════

/**
 * Reassign tile ownership after a civ is eliminated.
 * For each tile owned by the dead civ, find the nearest alive civ's
 * city within a 45-tile radius and assign ownership to that civ.
 * Tiles with no nearby alive city become unowned (255).
 *
 * @param {object} state - game state
 * @param {object} mapBase - map data + accessors
 * @param {number} deadCiv - eliminated civ slot
 */
export function reassignEliminatedCivTiles(state, mapBase, deadCiv) {
  if (!mapBase?.tileData || !state.cities) return;

  const { mw, mh, wraps } = mapBase;
  const SCAN_RADIUS = 45;

  for (let i = 0; i < mapBase.tileData.length; i++) {
    const tile = mapBase.tileData[i];
    if (!tile || tile.tileOwnership !== deadCiv) continue;

    const tileGx = i % mw;
    const tileGy = Math.floor(i / mw);

    // Find nearest alive civ's city
    let bestCiv = 255; // unowned
    let bestDist = Infinity;

    for (let ci = 0; ci < state.cities.length; ci++) {
      const city = state.cities[ci];
      if (!city || city.size <= 0) continue;
      if (!(state.civsAlive & (1 << city.owner))) continue;

      const d = tileDist(tileGx, tileGy, city.gx, city.gy, mw, wraps);
      if (d <= SCAN_RADIUS && d < bestDist) {
        bestDist = d;
        bestCiv = city.owner;
      }
    }

    tile.tileOwnership = bestCiv;
  }

  // Binary FUN_0043f7a7: after reassigning dead civ's tiles, refresh
  // ownership for ALL remaining cities' 21-tile radius to ensure
  // consistent territory claims.
  for (const city of state.cities) {
    if (city.size > 0 && (state.civsAlive & (1 << city.owner))) {
      refreshCityTileOwnership(city, mapBase);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// #170: Decrement Patience on Favor Menu Cancel
//
// When the player cancels the favor menu during diplomacy,
// decrement the AI's patience counter.
// ═══════════════════════════════════════════════════════════════════

/**
 * Called when a player cancels the diplomatic favor menu.
 * Decrements the AI civ's patience toward the player.
 *
 * @param {object} state - mutable game state
 * @param {number} aiCiv - AI civ whose patience decreases
 * @param {number} playerCiv - player who cancelled
 */
export function onFavorMenuCancel(state, aiCiv, playerCiv) {
  incrementPatience(state, aiCiv);
}

// ═══════════════════════════════════════════════════════════════════
// #175: Civ Slot Recycling for Barbarian Spawning
//
// Recycle eliminated civ slots for barbarian spawning via new_civ().
// Binary mechanic: when barbarians need a city slot, check for dead
// civ slots and reuse them rather than allocating new ones.
// ═══════════════════════════════════════════════════════════════════

/**
 * Find an available dead civ slot that can be recycled for barbarian use.
 * Returns the slot index (1-7) or -1 if no slot is available.
 * Binary new_civ() mechanic: searches for eliminated civ slots.
 *
 * @param {object} state - game state
 * @returns {number} dead civ slot (1-7) or -1
 */
export function findRecyclableCivSlot(state) {
  for (let c = 1; c <= 7; c++) {
    if (!(state.civsAlive & (1 << c))) {
      // Verify it's truly dead: no cities, no units
      const hasCities = state.cities?.some(city => city.owner === c && city.size > 0);
      const hasUnits = state.units?.some(u => u.owner === c && u.gx >= 0);
      if (!hasCities && !hasUnits) return c;
    }
  }
  return -1;
}

/**
 * Recycle an eliminated civ slot for barbarian spawning.
 * Initializes the slot as a barbarian civ (slot 0 behavior) that
 * can own cities captured by barbarians.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} slot - civ slot to recycle (1-7)
 * @param {number} gx - x position for initial placement
 * @param {number} gy - y position for initial placement
 * @returns {{ events: object[], civSlot: number }}
 */
export function recycleCivSlotForBarbarian(state, mapBase, slot, gx, gy) {
  const events = [];

  if (slot < 1 || slot > 7) return { events, civSlot: -1 };
  if (state.civsAlive & (1 << slot)) return { events, civSlot: -1 };

  // Initialize the slot as a barbarian civ
  state.civs = [...state.civs];
  state.civs[slot] = {
    name: 'Barbarians',
    rulesCivNumber: 0,
    government: 'despotism',
    treasury: 0,
    isHuman: false,
    isBarbarian: true,
    attitudes: [0, 0, 0, 0, 0, 0, 0, 0],
    patience: 0,
    reputation: 0,
    militaryPower: 0,
    difficulty: state.difficulty || 'chieftain',
  };

  // Clear old tech data
  if (state.civTechs) {
    state.civTechs = [...state.civTechs];
    state.civTechs[slot] = new Set();
  }
  if (state.civTechCounts) {
    state.civTechCounts = [...state.civTechCounts];
    state.civTechCounts[slot] = 0;
  }

  // Mark alive
  state.civsAlive |= (1 << slot);

  // Update visibility
  if (mapBase?.tileData) {
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, slot, gx, gy, mapBase.wraps);
  }

  events.push({
    type: 'civSlotRecycled',
    civSlot: slot,
    purpose: 'barbarian',
    gx, gy,
  });

  return { events, civSlot: slot };
}
