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

import { CITY_RADIUS_DOUBLED, LEADER_PERSONALITY, DIFFICULTY_KEYS } from './defs.js';
import { hasWonderEffect, civHasWonder } from './utils.js';
import { grantAdvance } from './research.js';
import { updateVisibility } from './visibility.js';

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
  SPACESHIP_LAUNCHED: 0x100,     // Civ has launched spaceship
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
const PEACE_CLEARS = TF.WAR | TF.WAR_STARTED | TF.CAPTURE_VENDETTA | TF.HOSTILITY;

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
 * Cascade rules when SETTING:
 *   ALLIANCE  -> also set PEACE + CONTACT
 *   PEACE     -> also set CONTACT; clear WAR, WAR_STARTED, CAPTURE_VENDETTA, HOSTILITY
 *   CEASEFIRE -> also set CONTACT; clear WAR, WAR_STARTED, CAPTURE_VENDETTA, HOSTILITY
 *   WAR       -> clear CEASEFIRE, PEACE, ALLIANCE; set WAR_TRACKING
 */
export function addTreatyFlag(state, civA, civB, flag) {
  let ab = getTreatyFlags(state, civA, civB);
  let ba = getTreatyFlags(state, civB, civA);

  if (flag & TF.ALLIANCE) {
    // Setting ALLIANCE: also set PEACE + CONTACT
    ab = (ab | flag | TF.PEACE | TF.CONTACT);
    ba = (ba | flag | TF.PEACE | TF.CONTACT);
  } else if (flag & TF.PEACE) {
    // Setting PEACE: also set CONTACT, clear war-related flags
    ab = ((ab | flag | TF.CONTACT) & ~PEACE_CLEARS);
    ba = ((ba | flag | TF.CONTACT) & ~PEACE_CLEARS);
  } else if (flag & TF.CEASEFIRE) {
    // Setting CEASEFIRE: also set CONTACT, clear war-related flags
    ab = ((ab | flag | TF.CONTACT) & ~PEACE_CLEARS);
    ba = ((ba | flag | TF.CONTACT) & ~PEACE_CLEARS);
  } else if (flag & TF.WAR) {
    // Setting WAR: clear treaty flags, set WAR_TRACKING
    ab = ((ab | flag | TF.WAR_TRACKING) & ~WAR_CLEARS);
    ba = ((ba | flag | TF.WAR_TRACKING) & ~WAR_CLEARS);
  } else {
    ab |= flag;
    ba |= flag;
  }

  if (!state.treatyFlags) state.treatyFlags = {};
  state.treatyFlags = {
    ...state.treatyFlags,
    [`${civA}-${civB}`]: ab,
    [`${civB}-${civA}`]: ba,
  };
}

/**
 * Clear flag bits from a civ pair's treaty (cascade-aware, symmetric).
 *
 * Cascade rules when CLEARING:
 *   PEACE   -> also clear ALLIANCE
 *   CONTACT -> clear everything (all flags to 0)
 *   WAR     -> also clear WAR_STARTED + CAPTURE_VENDETTA
 */
export function clearTreatyFlag(state, civA, civB, flag) {
  if (flag & TF.CONTACT) {
    // Clearing CONTACT: clear everything
    if (!state.treatyFlags) state.treatyFlags = {};
    state.treatyFlags = {
      ...state.treatyFlags,
      [`${civA}-${civB}`]: 0,
      [`${civB}-${civA}`]: 0,
    };
    return;
  }

  let ab = getTreatyFlags(state, civA, civB);
  let ba = getTreatyFlags(state, civB, civA);

  if (flag & TF.PEACE) {
    // Clearing PEACE: also clear ALLIANCE
    ab &= ~(flag | TF.ALLIANCE);
    ba &= ~(flag | TF.ALLIANCE);
  } else if (flag & TF.WAR) {
    // Clearing WAR: also clear WAR_STARTED + CAPTURE_VENDETTA
    ab &= ~(flag | TF.WAR_STARTED | TF.CAPTURE_VENDETTA);
    ba &= ~(flag | TF.WAR_STARTED | TF.CAPTURE_VENDETTA);
  } else {
    ab &= ~flag;
    ba &= ~flag;
  }

  if (!state.treatyFlags) state.treatyFlags = {};
  state.treatyFlags = {
    ...state.treatyFlags,
    [`${civA}-${civB}`]: ab,
    [`${civB}-${civA}`]: ba,
  };
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
function adjustAttitude(state, civSlot, targetCiv, delta) {
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

// ── G.5: Reputation helpers ──

/** Ceasefire expiration threshold in turns. */
export const CEASEFIRE_EXPIRE_TURNS = 16;
/** Withdrawal deadline after peace treaty (turns). */
export const WITHDRAWAL_DEADLINE_TURNS = 2;
/** Reputation decay interval (turns between +1 recovery). */
export const REPUTATION_DECAY_INTERVAL = 16;

/**
 * Adjust a civ's reputation by delta, clamped to [0, 100].
 * Lower reputation = less trustworthy.
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

  // G.5: Reputation decay — every 16 turns, each civ recovers +1 reputation (toward 100)
  if (turnNumber > 0 && (turnNumber % REPUTATION_DECAY_INTERVAL) === 0) {
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

  // Already at war — nothing to do
  if (currentTreaty === 'war' && haveContact(state, aggressor, target)) {
    return { events };
  }

  // Record treaty violation against third party
  if (thirdParty >= 0) {
    const dKey = ensureDiplomacy(state, thirdParty, aggressor);
    const prev = state.diplomacy[dKey] || {};
    state.diplomacy = {
      ...state.diplomacy,
      [dKey]: { ...prev, violations: (prev.violations || 0) + 1 },
    };
  }

  const diffIdx = getDifficultyIdx(state, aggressor);
  // Statue of Liberty wonder index = 19
  const hasStatueOfLiberty = hasWonderEffect(state, aggressor, 19);

  if (currentTreaty === 'alliance') {
    // ── Breaking alliance — worst reputation damage ──
    if (diffIdx > 0 && !hasStatueOfLiberty) {
      incrementPatience(state, aggressor);
    }
    if (thirdParty < 0) {
      incrementPatience(state, aggressor);
    }

    // Double penalty if also had peace+ceasefire (shouldn't usually happen but matches pseudocode)
    if (diffIdx > 0 && !hasStatueOfLiberty) {
      incrementPatience(state, aggressor);
    }

    if (thirdParty >= 0) {
      adjustAttitude(state, thirdParty, aggressor, -15);
    }

    // G.5: Reputation penalty for breaking alliance (-60)
    adjustReputation(state, aggressor, -60);

    // Set sneak attack flag
    const sKey = ensureDiplomacy(state, aggressor, target);
    state.diplomacy = {
      ...state.diplomacy,
      [sKey]: {
        ...(state.diplomacy[sKey] || {}),
        sneak: true, sneakTurn: state.turn?.number || 0,
      },
    };

    // Break the alliance → set to war
    setTreaty(state, aggressor, target, 'war');

    // Activate counter-alliance wars (target's allies join against aggressor)
    const allyResult = activateAllianceWars(state, mapBase, target, aggressor);
    events.push(...allyResult.events);

    recordTributeTurn(state, target, aggressor);

  } else if (currentTreaty === 'peace') {
    // ── Breaking peace — significant reputation damage ──
    if (diffIdx > 0 && !hasStatueOfLiberty) {
      incrementPatience(state, aggressor);
    }
    if (thirdParty < 0) {
      incrementPatience(state, aggressor);
    }

    if (thirdParty >= 0) {
      adjustAttitude(state, thirdParty, aggressor, -5);
    }

    // G.5: Reputation penalty for breaking peace (-40)
    adjustReputation(state, aggressor, -40);

    // Set sneak attack flag
    const sKey = ensureDiplomacy(state, aggressor, target);
    state.diplomacy = {
      ...state.diplomacy,
      [sKey]: {
        ...(state.diplomacy[sKey] || {}),
        sneak: true, sneakTurn: state.turn?.number || 0,
      },
    };

    setTreaty(state, aggressor, target, 'war');

    // Activate counter-alliance wars
    const allyResult = activateAllianceWars(state, mapBase, target, aggressor);
    events.push(...allyResult.events);

    recordTributeTurn(state, target, aggressor);

  } else if (currentTreaty === 'ceasefire') {
    // ── Breaking ceasefire — moderate reputation damage ──
    if (diffIdx > 0 && !hasStatueOfLiberty) {
      incrementPatience(state, aggressor);
    }
    if (thirdParty < 0) {
      incrementPatience(state, aggressor);
    }

    if (thirdParty >= 0) {
      adjustAttitude(state, thirdParty, aggressor, -5);
    }

    // G.5: Reputation penalty for breaking ceasefire (-20)
    adjustReputation(state, aggressor, -20);

    // Set sneak attack flag
    const sKey = ensureDiplomacy(state, aggressor, target);
    state.diplomacy = {
      ...state.diplomacy,
      [sKey]: {
        ...(state.diplomacy[sKey] || {}),
        sneak: true, sneakTurn: state.turn?.number || 0,
      },
    };

    setTreaty(state, aggressor, target, 'war');

    // Activate counter-alliance wars
    const allyResult = activateAllianceWars(state, mapBase, target, aggressor);
    events.push(...allyResult.events);

    recordTributeTurn(state, target, aggressor);

  } else {
    // ── No treaty / first-time war (sneak attack if had contact) — reputation hit ──
    if (diffIdx > 0 && !hasStatueOfLiberty) {
      incrementPatience(state, aggressor);
    }
    if (thirdParty < 0) {
      incrementPatience(state, aggressor);
    }

    if (thirdParty >= 0) {
      adjustAttitude(state, thirdParty, aggressor, -25);
    }

    // G.5: Sneak attack reputation penalty (-80) if had contact but no treaty
    if (haveContact(state, aggressor, target)) {
      adjustReputation(state, aggressor, -80);
    }

    setTreaty(state, aggressor, target, 'war');
  }

  // Cancel trade routes between the two civs
  cancelTradeRoutes(state, aggressor, target);

  // Wake sleeping/sentry units near enemy
  wakeUnitsNearEnemy(state, mapBase, aggressor, target);
  wakeUnitsNearEnemy(state, mapBase, target, aggressor);

  events.push({
    type: 'warDeclared',
    aggressor,
    target,
    thirdParty: thirdParty >= 0 ? thirdParty : undefined,
    previousTreaty: currentTreaty,
  });

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

  // Clamp attitude to [0, 50] — per pseudocode
  clampAttitude(state, civB, civA, 0, 50);

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

  // Clamp attitude to [0, 50] — per pseudocode
  clampAttitude(state, civB, civA, 0, 50);

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

  // Goodwill from alliance — per pseudocode: adjust_attitude(civB, civA, -25)
  // Note: in Civ2 negative attitude = friendly (inverted scale),
  // in our system we use positive = friendly
  adjustAttitude(state, civB, civA, 25);

  setTreaty(state, civA, civB, 'alliance');

  // Reset patience
  if (state.civs?.[civB]) {
    state.civs = [...state.civs];
    state.civs[civB] = { ...state.civs[civB], patience: 0 };
  }

  // Record treaty turn
  recordTributeTurn(state, civA, civB);

  // G.3: Alliance shared visibility — share full map both ways + auto-embassy
  if (mapBase?.tileData) {
    shareMaps(state, mapBase, civA, civB);
    shareMaps(state, mapBase, civB, civA);
  }

  // G.3: Auto-establish embassy both ways
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
  for (let c = 1; c <= 7; c++) {
    if (c === civA || c === civB) continue;
    if (!(state.civsAlive & (1 << c))) continue;

    // If civA is at war with c, civB should join
    if (getTreaty(state, civA, c) === 'war' && haveContact(state, civA, c)) {
      const bTreaty = getTreaty(state, civB, c);
      if (bTreaty !== 'war' && haveContact(state, civB, c)) {
        setTreaty(state, civB, c, 'war');
        adjustAttitude(state, civB, c, -50);
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
        adjustAttitude(state, civA, c, -50);
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
// 5. activateAllianceWars — FUN_0045a8e3 (diplo_activate_alliance_wars)
//
// When civA goes to war with civB, civA's allies are checked:
// each ally that has contact with civB and no existing war/ceasefire
// is dragged into the war. Prevents infinite loops via a processed set.
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

    // Must not already be at war or ceasefire with civB
    const existingTreaty = getTreaty(state, civ, civB);
    if (existingTreaty === 'war' || existingTreaty === 'ceasefire') continue;

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

    // Adjust attitude
    adjustAttitude(state, civ, civB, -50);

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

  // Diplomacy goodwill from gold gift (from pseudocode: -(amount * 3 / 2))
  // In our system positive = friendly, so we add goodwill to receiver toward giver
  const attitudeBonus = Math.min(50, Math.floor(actual / 10));
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

/** Transfer units from one civ to another. */
function transferUnits(state, mapBase, fromCiv, toCiv, unitIndices) {
  const events = [];
  if (!state.units) return { events };

  state.units = [...state.units];

  for (const ui of unitIndices) {
    const u = state.units[ui];
    if (!u || u.gx < 0 || u.owner !== fromCiv) continue;

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

    state.units[ui] = {
      ...u,
      owner: toCiv,
      homeCityId: bestCi >= 0 ? bestCi : 0xFFFF,
      orders: 'none',
      goToX: -1,
      goToY: -1,
    };

    // Update visibility for new owner
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, u.gx, u.gy, mapBase.wraps);

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
    tradeRoutes: [], // trade routes cancelled
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

  // ── Update visibility around city for new owner ──
  updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, toCiv, cityGx, cityGy, mapBase.wraps, 2);

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
      // Unit is homed to this city but not physically there — rehome to nearest own city
      let bestCi = -1, bestDist = Infinity;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const c = state.cities[ci];
        if (ci !== cityIndex && c.owner === fromCiv && c.size > 0) {
          const d = tileDist(u.gx, u.gy, c.gx, c.gy, mapBase.mw, mapBase.wraps);
          if (d < bestDist) { bestDist = d; bestCi = ci; }
        }
      }
      state.units[ui] = {
        ...u,
        homeCityId: bestCi >= 0 ? bestCi : 0xFFFF,
      };
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

  // Phase 3: Alliance modifiers
  if (isAllied) {
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
 * Records in destroyed civs list, kills all units, transfers/destroys cities,
 * clears alive bitmask, and checks for game end.
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
  kh.destroyedCivRulesIds[slot] = civSlot;
  kh.destroyedCivNames[slot] = state.civNames?.[civSlot] ?? `Civ ${civSlot}`;
  if (kh.count < 12) kh.count++;

  // ── Clear alive bitmask ──
  state.civsAlive &= ~(1 << civSlot);

  // ── Kill all remaining units (set gx = -1) ──
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.owner === civSlot && u.gx >= 0) {
      state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
    }
  }

  // ── Transfer remaining cities to barbarians (owner=0) or destroy them ──
  for (let ci = 0; ci < state.cities.length; ci++) {
    const c = state.cities[ci];
    if (c.owner !== civSlot || c.size <= 0) continue;
    // Transfer to barbarians (slot 0)
    state.cities[ci] = { ...c, owner: 0 };
    events.push({
      type: 'cityTransferred', cityName: c.name, cityIndex: ci,
      fromCiv: civSlot, toCiv: 0,
    });
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
    state.gameOver = { winner: lastAlive };
    events.push({ type: 'gameOver', winner: lastAlive });
  }

  return { events };
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
  if (attitude < 25) patience += 1;
  if (attitude > 60) patience -= 1;
  if (civHasWonder(state, aiCiv, 20)) patience += 1; // Eiffel Tower
  const treaty = getTreaty(state, aiCiv, targetCiv);
  if (treaty === 'peace') patience += 1;
  if (treaty === 'alliance') patience += 2;
  return Math.max(0, patience);
}

// ═══════════════════════════════════════════════════════════════════
// Tribute Demand — how much gold an AI demands from a target civ
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate tribute demand amount from AI toward a target civ.
 * Based on difficulty level, tech desire weight, and target's treasury.
 * Rounded to nearest 50 gold.
 *
 * @param {object} state - game state
 * @param {number} aiCiv - AI civ making the demand
 * @param {number} targetCiv - civ being demanded from
 * @param {number} techDesire - weight of the tech desire (0-100+)
 * @returns {number} tribute amount in gold (multiple of 50)
 */
export function calcTributeDemand(state, aiCiv, targetCiv, techDesire) {
  const diffIdx = DIFFICULTY_KEYS.indexOf(state.difficulty || 'chieftain');
  let tribute = Math.floor((diffIdx + 1) * techDesire / 32);
  tribute = Math.max(0, Math.min(20, tribute)) * 50;
  const treasury = state.civs?.[targetCiv]?.treasury || 0;
  if (tribute > treasury && tribute < treasury * 2 && treasury > 49) {
    tribute = Math.floor(treasury / 50) * 50;
  }
  return tribute;
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
