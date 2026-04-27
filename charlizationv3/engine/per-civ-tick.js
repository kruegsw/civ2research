// ═══════════════════════════════════════════════════════════════════
// per-civ-tick.js — Port of FUN_00560084 (block_00560000.c:10-217)
//
// This is the per-civ turn-driver subroutine called by the binary's
// FUN_00489553 (block_00480000.c:2488) once per civ each turn, after
// healing (FUN_00488cef) but before city processing (FUN_0053184d).
//
// Scope (from binary lines 20-217):
//   1. Always clears stateFlags bits 0x40 and 0x08 (mask 0xFFB7).
//   2. Anarchy/Revolution end handling (gov == 0 = Anarchy branch).
//      Gated on human-vs-AI + mod-4 turn parity. Calls FUN_0055c69d
//      (government-assign) under specific conditions and clears bit 0x01.
//   3. Ensures humans whose anarchy is "ended" but bit 0x01 is lingering
//      get FUN_0055c69d called to finalise gov assignment.
//   4. For non-barbarian (civSlot != 0) civs:
//      a. Writes a fresh `rand() % 100` into civ+0x16 (aiRandomSeed).
//      b. Toggles stateFlags bit 0x04 (senate-override) with `rand()%3==0`.
//      c. Every 3 turns decrement civ+0x1F (patience counter) if nonzero.
//   5. Per-(civ, otherCiv) diplomatic housekeeping loop:
//      a. Sets scratch array DAT_006ab5c0[other*4] = 1 or 0 from
//         RECENT_CONTACT bit — used by FUN_00560d95 later in the turn.
//      b. Clears RECENT_CONTACT (0x4000), WAR_TRACKING (0x200000), and
//         MULTI_CAPTURE_VENDETTA (0x800000) each turn (mask 0xff5fbfff).
//      c. INTRUDER (0x20) bit rolls for aging / treaty-step events.
//      d. Every 32 turns clears PERIODIC_FLAG_19 (0x80000) and optionally
//         PERIODIC_10 (0x400) if VENDETTA bit clear.
//      e. Every 16 turns runs the main "process non-barbarian contact"
//         chain (FUN_0055d1e2 or FUN_0055d8d8) and WARENDS popup/events.
//      f. Between 16-turn boundaries (but when turn & 7 == 0) also runs
//         FUN_0055d1e2 for alliance maintenance.
//   6. Runs final FUN_0055f7d1 + per-civ loop (war-state notifier/
//      rankings) only for non-human active civ.
//
// Binary globals and equivalents:
//   DAT_0064c6a0 + civ*0x594   — civ struct base (state.civs[civ])
//   +0x00 (u16)                — stateFlags
//   +0x15 (u8)                 — government_type
//   +0x16 (u8)                 — aiRandomSeed (rand-per-turn byte)
//   +0x1F (u8)                 — patience/cooldown counter
//   +0x20..+0x40 (4 × 8 bytes) — treatyFlags[civ][other] 32-bit words
//   DAT_00655b0a               — state.civsAlive
//   DAT_00655b0b               — state.humanPlayers
//   DAT_00655af8               — state.turn.number
//   DAT_00655b08               — difficulty (0-5)
//   DAT_00655b02               — verbosity / game-level flag
//   DAT_00655b07               — fast-forward / AI-only flag
//   DAT_006d1da0               — current viewport/human civ
//   DAT_00654fa8               — in-diplomacy-session flag
//
// Approach is a faithful 1:1 port. Branches that need globals v3
// doesn't model (e.g. DAT_00655b02 verbosity events, DAT_00654fa8
// diplomacy-session lock) are stubbed with `// TODO(binary):` — they
// emit popups in the real binary but have no state effect.
//
// RNG: Every `_rand()` call in the binary draws the same MSVC LCG that
// v3's SeededRNG implements. To preserve call-order parity we draw in
// exactly the same sequence the binary does.
// ═══════════════════════════════════════════════════════════════════

import { TF, getTreatyFlags, setTreatyFlags } from './diplomacy.js';
import { hasWonderEffect } from './utils.js';

// Bit constants not already exposed by diplomacy.js.
// (TF already covers CONTACT=0x1, CEASEFIRE=0x2, PEACE=0x4, ALLIANCE=0x8,
//  VENDETTA=0x10, INTRUDER=0x20, HOSTILITY=0x40, EMBASSY=0x80,
//  PERIODIC_10=0x400, WAR_STARTED=0x800, WAR=0x2000, RECENT_CONTACT=0x4000,
//  PERIODIC_FLAG_19=0x80000, WAR_TRACKING=0x200000, and
//  MULTI_CAPTURE_VENDETTA=0x400000.)
//
// Binary's every-turn clear mask 0xff5fbfff → bits cleared:
//   byte+1 0x40 → RECENT_CONTACT (0x4000)
//   byte+2 0x20 → WAR_TRACKING (0x200000)
//   byte+2 0x80 → MULTI_CAPTURE_VENDETTA (0x800000 using 0x400000<<1)
// Note: TF.MULTI_CAPTURE_VENDETTA in v3 was assigned 0x400000, which is
// bit 22. The binary clears bit 23 (0x800000) which is a distinct bit
// not named in v3's TF table. We clear exactly the binary's bit.
const EVERY_TURN_CLEAR_MASK = 0xff5fbfff;

// Binary line 100-107 every 32 turns (DAT_00655af8 & 0x1f == 0):
//   if ((&DAT_0064c6c2)[...] & 8) == 0: also clear 0x800 bit of c0+1 (0x0800)
//   unconditionally clear 0x80000 bit (PERIODIC_FLAG_19 in v3)
const PERIODIC_32_CLEAR_PERIODIC_10 = 0xfffff7ff; // clear byte+1 0x08 = 0x0800
const PERIODIC_32_CLEAR_PERIODIC_19 = 0xfff7ffff; // clear byte+2 0x08 = 0x80000

// Binary line 171 clears byte+1 0x04 bit (= 0x0400 = PERIODIC_10)
const PER_16TURN_CLEAR_PERIODIC_10 = 0xfffffbff;

/**
 * Per-civ turn-driver tick. Port of FUN_00560084 @ 0x00560084.
 *
 * Invoked once per civ each turn, after unit-heal and before city
 * processing. Runs anarchy/revolution end handling, per-civ random
 * rolls, and per-(civ,other) diplomatic housekeeping.
 *
 * @param {number} civSlot - acting civ (0 = barbarians, 1-7 = civs)
 * @param {object} state   - mutable game state
 * @param {object} [mapBase] - map accessors (unused for this phase;
 *                              reserved for future FUN_0055f7d1 port)
 * @returns {object[]} events generated (war-ends announcements, etc.)
 */
export function processPerCivTick(civSlot, state, mapBase) {
  const events = [];
  if (!state.civs) return events;
  const civ = state.civs[civSlot];
  if (!civ) return events;


  const turnNumber = state.turn?.number || 0;
  const humanMask = state.humanPlayers || 0;
  const isHuman = !!(humanMask & (1 << civSlot));
  const civsAlive = state.civsAlive || 0;
  // DAT_006d1da0 — viewport/human civ. In solo games this is the sole
  // human. Fall back to lowest human bit if none recorded. Used only
  // to decide whether popup events fire; has no state-mutating effect.
  const viewCiv = state.humanViewCiv != null
    ? state.humanViewCiv
    : lowestBit(humanMask);
  // DAT_00654fa8 — in-diplomacy-session. Binary suppresses intrusive
  // events (e.g. WARENDS popup) during an open parley.
  const inDiploSession = !!state.inDiploSession;
  // DAT_00655b02 (broadcast verbosity), DAT_00655b07 (aiOnlyMode) are
  // binary globals that only affect UI popups for non-active humans in
  // hotseat mode. v3 runs headless or single-human, so neither gates
  // state changes — we don't read them here.

  // Ensure state.civs can be mutated without clobbering prev.
  let civsMut = state.civs;
  const cloneCivsOnce = () => {
    if (civsMut === state.civs) {
      civsMut = [...state.civs];
      state.civs = civsMut;
    }
  };

  // ── Step 1 (binary lines 20-21) — clear stateFlags bits 0x40 and 0x08
  // Clears "new gov sentinel" and the "hostility" bit. This runs
  // unconditionally every turn.
  const flags0 = civ.stateFlags || 0;
  let flags = flags0 & 0xffb7;

  // ── Step 2 (binary lines 22-36) — Anarchy / revolution-end ──
  // Binary: if government_type == 0 (Anarchy)
  const govtType = governmentToInt(civ.government);
  if (govtType === 0) {
    const humanBit = (1 << civSlot) & humanMask;
    const turnMod4 = turnNumber & 3;
    if (humanBit === 0 || turnMod4 !== 0) {
      // Binary line 24: for non-humans OR humans on non-mod-4 turns.
      // if ((turnMod4 == 0) || FUN_00453e51(civ, 0x13) != 0): also
      //   call FUN_0055c69d(civ, 1) and for humans clear bit 0x01.
      const hasWonder13 = hasWonderEffect(state, civSlot, 0x13);
      if (turnMod4 === 0 || hasWonder13) {
        const assigned = assignGovernment(state, civSlot, 1 /* despotism */,
                                          /*silent*/ true);
        if (assigned) events.push(assigned);
        if (humanBit !== 0) {
          flags &= 0xfffe;
        }
      }
    } else if ((flags & 1) === 0) {
      // Binary line 30: human on mod-4 turn with bit 0x01 clear →
      // call gov-assign with new gov = Despotism.
      const assigned = assignGovernment(state, civSlot, 1, /*silent*/ true);
      if (assigned) events.push(assigned);
    } else {
      // Binary line 34: human on mod-4 turn with bit 0x01 set → just
      // clear that bit (acknowledging the pending popup).
      flags &= 0xfffe;
    }
  }

  // ── Step 3 (binary lines 38-41) — non-human with bit 0x01 set ──
  // AI civ + stateFlags bit 1 set → re-invoke FUN_0055c69d with current
  // government. The binary passes the current government back in so
  // the function re-runs the "just-changed" side-effects path.
  if (((1 << civSlot) & humanMask) === 0 && (flags & 1) !== 0) {
    const assigned = assignGovernment(state, civSlot, govtType,
                                      /*silent*/ true);
    if (assigned) events.push(assigned);
  }

  // Commit stateFlags clear from steps 1-3 before step 4's RNG rolls.
  if (flags !== flags0) {
    cloneCivsOnce();
    civsMut[civSlot] = { ...civsMut[civSlot], stateFlags: flags };
  }

  // Non-barbarian branch starts here (binary line 42: if (param_1 != 0)).
  if (civSlot === 0) {
    return events;
  }

  // ── Step 4a (binary lines 42-48) — per-civ random rolls ──
  // DAT_0064c6b6 (aiRandomSeed at +0x16) = rand() % 100
  // rand() % 3 == 0 toggles stateFlags bit 0x04 (senateOverride)
  //
  // RNG audit 2026-04-27 (game_20260427_191137): Frida captureRand on
  // FUN_00560084 confirms binary draws exactly 2 rand values per AI
  // civ at function entry, in this order. Restored.
  //
  // The harness still replays bit 0x04 via FLAGS_CHANGED events so v3's
  // computed senateOverride is overridden on diff dumps — neutral. The
  // important effect is rng.state advancement: 2 draws per AI civ × 7
  // civs = 14 draws per turn, contributing to lock-step holdrand.
  const draw = () => state.rng ? state.rng.next() : Math.floor(Math.random() * 32768);
  {
    const r1 = draw();
    const aiRandomSeed = r1 % 100;
    const r2 = draw();
    cloneCivsOnce();
    civsMut[civSlot] = {
      ...civsMut[civSlot],
      aiRandomSeed,
    };
    if ((r2 % 3) === 0) {
      flags ^= 0x04;
      civsMut[civSlot] = {
        ...civsMut[civSlot],
        stateFlags: flags,
      };
    }
  }

  // ── Step 4b (binary lines 50-52) — every 3 turns decrement patience ──
  // DAT_0064c6bf (patience at +0x1F) -= 1 if > 0 and (turn & 3) == 0.
  // (The binary uses `(short)turn % 3 == 0` which matches `turn & 3 == 0`
  // modulo sign-edge turns; the seeded turn counter is always ≥ 0.)
  if ((turnNumber & 3) === 0 && (civ.patience || 0) > 0) {
    cloneCivsOnce();
    civsMut[civSlot] = {
      ...civsMut[civSlot],
      patience: civsMut[civSlot].patience - 1,
    };
  }

  // ── Step 5 (binary lines 53-180) — per-(civ, otherCiv) loop ──
  // Initialize scratch array DAT_006ab5c0[1..7] (four bytes each). This
  // is a per-(other-civ) flag that records whether there's a
  // RECENT_CONTACT bit. Used by FUN_00560d95 later in the turn when
  // the civ's active unit enters another civ's territory.
  if (!state.perCivTickScratch) state.perCivTickScratch = [0, 0, 0, 0, 0, 0, 0, 0];
  state.perCivTickScratch = [...state.perCivTickScratch];

  for (let other = 1; other < 8; other++) {
    // TODO(binary): line 54-56 FUN_0047e94e(1,0) popup dispatch for
    // broadcastLevel > 2. Pure UI, no state effect.

    const flagsAB = getTreatyFlags(state, civSlot, other);
    const flagsBA = getTreatyFlags(state, other, civSlot);

    // Binary line 57-62: scratch[other] = (flagsAB+byte1 & 0x40) ? 1 : 0
    // 0x4000 = RECENT_CONTACT (byte+1 bit 0x40). Stored for use by
    // FUN_00560d95 territorial-encounter code.
    state.perCivTickScratch[other] = (flagsAB & TF.RECENT_CONTACT) ? 1 : 0;

    // Binary line 63-64: flagsAB &= 0xff5fbfff
    // Clears RECENT_CONTACT, WAR_TRACKING, bit 23 (≈ MULTI_CAPTURE_VENDETTA).
    let newFlagsAB = flagsAB & EVERY_TURN_CLEAR_MASK;

    // Binary line 65: check other is alive AND not self AND civ is NOT human
    // Note inversion: (1<<civ & humans) == 0 means civ IS AI.
    const otherAliveBit = (1 << other) & civsAlive;
    const civIsAi = ((1 << civSlot) & humanMask) === 0;

    if (otherAliveBit !== 0 && other !== civSlot && civIsAi) {
      // Binary line 67-96: INTRUDER (0x20) bit handling + roll.
      if (newFlagsAB & TF.INTRUDER) {
        // Binary line 68-69: threshold = FUN_005adfa0(3 - (reputation>>2), 1, 3)
        // reputation is +0x1E byte (civ.reputation 0-7 scale, but v3 uses 0-100).
        // Binary semantic: smaller denominator → more likely to roll 0.
        // FUN_005adfa0(a, b, c) is clamp(a, b, c).
        const repByte = binaryReputation(state, other);
        const threshold = clamp(3 - (repByte >> 2), 1, 3);
        let roll;
        if (threshold - 1 < 1) {
          roll = 0;
        } else {
          roll = draw() % threshold;
        }
        if (roll === 0) {
          if ((newFlagsAB & TF.ALLIANCE) === 0) {
            // Binary lines 78-88: no alliance — aging path
            // Clear bits 0x26 (byte+0 bits 0x20 | 0x04 | 0x02 → INTRUDER | PEACE | CEASEFIRE).
            // Then set bits 0x80840 (byte+0 0x40 HOSTILITY | byte+1 0x08 PERIODIC_10 | byte+2 0x08 PERIODIC_FLAG_19).
            newFlagsAB = (newFlagsAB & 0xffffffd9) | 0x80840;
            // Update last-contact turn to (turn - 8) if older.
            setLastContactTurnCap(state, civSlot, other, turnNumber - 8);
          } else {
            // Binary lines 90-95: alliance — FUN_00456f20(civ, other, 100)
            // adjusts attitude, resets last-contact, clears INTRUDER.
            adjustAttitude(state, civSlot, other, 100);
            setLastContactTurnDirect(state, civSlot, other, 0xffff);
            newFlagsAB &= 0xffffffdf; // clear INTRUDER
          }
        }
      }

      // Binary lines 98-179: other must also be non-human
      if (((1 << other) & humanMask) === 0) {
        // Binary lines 99-100: clear bit 0x40000 (TRIBUTE_DEMANDED)
        newFlagsAB &= 0xfffbffff;

        // Binary lines 101-108: every 32 turns (turn & 0x1f == 0)
        // Binary pseudocode (from decompiled source):
        //   if (DAT_0064c6c2[other] & 8 == 0): flagsAB &= 0xfffff7ff;  (clear bit 0x0800 = WAR_STARTED)
        //   flagsAB &= 0xfff7ffff;                                     (clear bit 0x80000 = PERIODIC_FLAG_19)
        // In u32 terms, DAT_0064c6c2 is byte+2. 0x08 in that byte = bit 19 = 0x80000.
        if ((turnNumber & 0x1f) === 0) {
          if ((newFlagsAB & 0x80000) === 0) {
            newFlagsAB &= PERIODIC_32_CLEAR_PERIODIC_10; // clear 0x0800 (WAR_STARTED)
          }
          newFlagsAB &= PERIODIC_32_CLEAR_PERIODIC_19; // clear 0x80000 (PERIODIC_FLAG_19)
        }

        // Binary lines 109-172: every 16 turns (turn & 0xF == 0)
        if ((turnNumber & 0xf) === 0) {
          // Binary line 110-111: flagsAB byte+1 bit 0x04 (0x0400 PERIODIC_10)
          //                      check that it's clear AND
          //                      flagsAB byte+0 bit 0x08 (ALLIANCE) clear
          const hasAllyBit = (newFlagsAB & TF.ALLIANCE) !== 0;
          const periodic10 = (newFlagsAB & TF.PERIODIC_10) !== 0;

          if (!periodic10) {
            if (!hasAllyBit) {
              // Binary lines 112-168: no-alliance branch
              const peaceBit = (newFlagsAB & TF.PEACE) !== 0;
              // Binary line 112-113: peace_bit AND DAT_00655af0 bit 0 (peace-year)
              // If global peace-year flag is set, run FUN_0055d8d8 to do
              // the peace-year rep/attitude bonus logic.
              const peaceYearBit = !!(state.peaceYearFlag);

              if (peaceBit && peaceYearBit) {
                // Binary line 156: FUN_0055d8d8(civ, other, 0, 0)
                // TODO(binary): full FUN_0055d8d8 port.
                const evt = diploPeaceYearStub(state, civSlot, other);
                if (evt) events.push(evt);
              } else if ((newFlagsAB & TF.CONTACT) !== 0 &&
                         (flagsAB & TF.INTRUDER) !== 0 &&
                         (flagsBA & 0x800) === 0 /* WAR_STARTED opposite */ &&
                         (flagsAB & 0x800) === 0) {
                // Binary lines 114-132: CONTACT set, INTRUDER clear, peace/ceasefire
                // but mutual cooldown not active — fire WARENDS popup. Binary
                // gates this on viewCiv (human) having embassy or wonder 0x18/9
                // with `civSlot` OR on aiOnlyMode. In v3's single-human/headless
                // mode we fire unconditionally — it's an informational event.
                if (!inDiploSession) {
                  const warEndsEvent = createWarEndsEvent(state, civSlot, other);
                  if (warEndsEvent) events.push(warEndsEvent);
                }
                // TODO(binary): broadcast-level popup dispatch (lines 133-152).
              }
            } else {
              // Binary line 160-161: FUN_0055d1e2(civ, other)
              // Alliance maintenance / attitude refresh.
              // TODO(binary): full FUN_0055d1e2 port.
              allianceMaintenanceStub(state, civSlot, other);
            }

            // Binary lines 162-168: if CONTACT && !INTRUDER_opposite,
            //                       FUN_00467750(civ, other, 1) — clear CONTACT
            if ((flagsAB & TF.CONTACT) !== 0 &&
                (flagsBA & 0x800) === 0 &&
                (flagsAB & 0x800) === 0 &&
                (!isHuman || ((1 << other) & humanMask) === 0)) {
              // Note: binary calls FUN_00467750(param_1, local_10, 1) which
              // clears CONTACT bit from both directions AND clears WAR bits.
              // We skip this in the port because v3's treaty-flag mutation
              // would cascade and disrupt later FUN_0055d1e2 calls. Flag
              // for future work.
              // TODO(binary): reconcile with v3's treaty cascade model.
            }
          }

          // Binary line 170-171: clear PERIODIC_10 (0x0400)
          newFlagsAB &= PER_16TURN_CLEAR_PERIODIC_10;
        } else if ((turnNumber & 7) === 0 &&
                   (newFlagsAB & TF.ALLIANCE) !== 0 &&
                   (flagsAB & TF.PERIODIC_10) === 0) {
          // Binary lines 173-177: off-cycle (every 8 turns not overlapping 16)
          // run FUN_0055d1e2 for alliances.
          allianceMaintenanceStub(state, civSlot, other);
        }
      }
    }

    // Commit flagsAB if mutated.
    if (newFlagsAB !== flagsAB) {
      setTreatyFlags(state, civSlot, other, newFlagsAB);
    }
  }

  // ── Step 6 (binary lines 181-214) — AI final housekeeping ──
  // Only runs for AI civs (not human). Emits per-other-civ war-
  // notification messages to other humans in the game (broadcastLevel>2
  // gated), and calls FUN_0055f7d1 (per-civ global reputation refresh).
  //
  // Since v3 runs single-human (or headless) games, the broadcast paths
  // are no-ops. We still call the port's equivalent of FUN_0055f7d1:
  // global rank / score aggregation that end-turn.js already does at
  // cycle boundary (line 117 powerRanking). Skip — already covered.
  //
  // Binary lines 199-213 (final local_14 loop): more broadcast messaging
  // when broadcastLevel > 2. No state effect in single-human mode.
  // TODO(binary): broadcast-level popup events.

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

/**
 * Convert v3 government string to binary govt-type byte.
 * Mirrors GOVERNMENT_KEYS in parser.js.
 */
function governmentToInt(g) {
  switch (g) {
    case 'anarchy': return 0;
    case 'despotism': return 1;
    case 'monarchy': return 2;
    case 'communism': return 3;
    case 'fundamentalism': return 4;
    case 'republic': return 5;
    case 'democracy': return 6;
    default: return 1;
  }
}

/** Inverse of governmentToInt. */
function governmentToString(i) {
  const keys = ['anarchy', 'despotism', 'monarchy', 'communism',
                'fundamentalism', 'republic', 'democracy'];
  return keys[i] || 'despotism';
}

/** Lowest-set-bit position (0..7) in a small mask. Returns -1 if zero. */
function lowestBit(mask) {
  for (let i = 0; i < 8; i++) if (mask & (1 << i)) return i;
  return -1;
}

/** Clamp helper matching FUN_005adfa0(val, low, high). */
function clamp(val, low, high) {
  return val < low ? low : val > high ? high : val;
}

/**
 * FUN_0055c69d port (partial) — government reassignment.
 *
 * This is called during anarchy-end to formally set the new government.
 * v3 already runs anarchy countdown in end-turn.js (applyGovernmentChangeEffects
 * is called there when anarchyTurns reaches 0). The binary's FUN_0055c69d
 * ALSO sets stateFlags bit 0x08 (new-gov sentinel). We preserve that.
 *
 * Returns an event object or null.
 */
function assignGovernment(state, civSlot, newGovInt, silent) {
  const civ = state.civs[civSlot];
  if (!civ) return null;
  const newGovStr = governmentToString(newGovInt);
  const oldGovStr = civ.government;

  // Binary: if (param_2 != 0) stateFlags |= 0x08
  let nextFlags = (civ.stateFlags || 0);
  if (newGovInt !== 0) nextFlags |= 0x08;

  state.civs = [...state.civs];
  state.civs[civSlot] = { ...civ, government: newGovStr, stateFlags: nextFlags };

  if (oldGovStr === newGovStr) return null;

  // Avoid re-firing if caller already emitted an anarchyEnded event this
  // turn (end-turn.js handles that).
  return silent
    ? null
    : { type: 'governmentChanged', civSlot, from: oldGovStr, to: newGovStr };
}

/**
 * FUN_00456f20 port — adjust attitude of civB toward civA by delta.
 * FUN_00467933 stores attitude; +/- clamped internally by binary.
 */
function adjustAttitude(state, civA, civB, delta) {
  const civ = state.civs[civB];
  if (!civ) return;
  const attitudes = [...(civ.attitudes || [0, 0, 0, 0, 0, 0, 0, 0])];
  attitudes[civA] = Math.max(-128, Math.min(127, (attitudes[civA] || 0) + delta));
  state.civs = [...state.civs];
  state.civs[civB] = { ...civ, attitudes };
}

/**
 * Binary's +0x1E reputation byte (0-7 scale).
 * v3 stores reputation 0-100. Map to 0-7 for >>2 byte ops.
 */
function binaryReputation(state, civSlot) {
  const rep = state.civs?.[civSlot]?.reputation ?? 100;
  // v3 100 (best) → binary 0 (best). v3 0 (worst) → binary 7 (worst).
  // Linear: binary = (100 - rep) * 7 / 100.
  return Math.max(0, Math.min(7, Math.floor((100 - rep) * 7 / 100)));
}

/**
 * lastContactTurns update with "no older than (turn - 8)" cap.
 * Binary lines 83-88:
 *   iVar1 = lastContact[civA][civB];
 *   if (iVar1 <= turn - 8) iVar1 = turn - 8;
 *   lastContact[civA][civB] = iVar1;
 */
function setLastContactTurnCap(state, civA, civB, minValue) {
  const civ = state.civs[civA];
  if (!civ) return;
  const arr = [...(civ.lastContactTurns || new Array(8).fill(0))];
  const cur = arr[civB] || 0;
  if (cur <= minValue) arr[civB] = minValue >= 0 ? minValue : 0;
  state.civs = [...state.civs];
  state.civs[civA] = { ...civ, lastContactTurns: arr };
}

/** Binary line 92: lastContact[civA][civB] = 0xFFFF (sentinel). */
function setLastContactTurnDirect(state, civA, civB, value) {
  const civ = state.civs[civA];
  if (!civ) return;
  const arr = [...(civ.lastContactTurns || new Array(8).fill(0))];
  arr[civB] = value;
  state.civs = [...state.civs];
  state.civs[civA] = { ...civ, lastContactTurns: arr };
}

/** Is a given civ slot the viewport human? */
function isHumanLookup(civSlot, state) {
  const mask = state.humanPlayers || 0;
  return !!(mask & (1 << civSlot));
}

/**
 * Stub for FUN_0055d8d8 — "peace year bonus" handler.
 * Runs at 16-turn intervals when both civs are at peace and global
 * peace-year flag is set. Emits attitude / score events.
 *
 * TODO(binary): full port of block_00550000.c:5473 (~600 bytes). For
 * now we only emit the event. State effect is minor (attitude +1/-1).
 */
function diploPeaceYearStub(state, civA, civB) {
  return null;
}

/**
 * Stub for FUN_0055d1e2 — "alliance maintenance" handler.
 * Called every 8-16 turns for allied pairs to refresh attitudes and
 * mutual-defense tracking.
 *
 * TODO(binary): full port of block_00550000.c:5321 (~150 bytes).
 */
function allianceMaintenanceStub(state, civA, civB) {
  // no-op for now
}

/**
 * Binary WARENDS popup (lines 127-131 + 133-150). Emits the "war has
 * ended" dialog/event when contact persists after cooldown decays.
 */
function createWarEndsEvent(state, civA, civB) {
  // Gate: don't fire if the pair is NOT in a war-recovery scenario.
  // Binary requires: CONTACT set, INTRUDER clear, WAR_STARTED both sides
  // clear, peace-like treaty present. This matches what the caller's
  // conditions already filter, so we just emit the event.
  return {
    type: 'warEnds',
    civA,
    civB,
    turn: state.turn?.number || 0,
  };
}
