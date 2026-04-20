// ═══════════════════════════════════════════════════════════════════
// start-turn.js — Per-civ start-of-turn processing
//
// Invoked via the START_TURN action by the harness / server at each
// civ's turn begin. Decoupled from END_TURN so callers drive timing
// explicitly, matching the binary's per-civ model (FUN_0048710a @
// block_00480000.c:1741 is called per-civ from the turn driver).
//
// Scope of this function:
//   1. moveSpent / movesLeft reset for each of `civ`'s units:
//        - Active unit (no idle order): moveSpent=0, movesLeft=mp.
//        - Idle unit (fortify/sleep/worker-build): moveSpent=mp for AI
//          owners, UNCHANGED for human owners. The split is empirical:
//          AI-auto-fortified units end a cycle with moveSpent already
//          at max (binary sets it during creation/promotion), while
//          human-fortified units hold moveSpent at whatever the user
//          left it (usually 0 if never moved before fortify). Setting
//          idle→max unconditionally would over-write human values;
//          leaving idle→unchanged unconditionally would under-write AI
//          values. The split preserves both observations.
//
// NOT handled here (intentionally separate mechanisms):
//   - fortifying→fortified promotion: global at cycle wrap, gated by
//     `fortifyIssuedTurn < postWrapTurn`. See end-turn.js. This is
//     NOT a per-civ start-of-turn event in the binary — the issue-turn
//     vs current-turn comparison works regardless of which civ's turn
//     is active.
//   - Worker-order progress (road, irrigation, mine, etc.): accumulator
//     `workTurns` at memory +0x0D, incremented during the OWNER civ's
//     END_TURN (not START_TURN). Completion when accumulator reaches
//     terrain-specific threshold.
// ═══════════════════════════════════════════════════════════════════

import { ORDER_BYTES } from '../order-bytes.js';
import { MOVEMENT_MULTIPLIER, UNIT_DOMAIN, UNIT_NO_LIGHTHOUSE_BONUS } from '../defs.js';
import { calcEffectiveMovementPoints } from '../movement.js';
import { hasWonderEffect } from '../utils.js';

const IDLE_ORDERS = new Set([
  'fortified', 'fortifying', 'sleep',
  'road', 'buildRoad',
  'irrigation', 'buildIrrigation',
  'mine', 'buildMine',
  'fortress', 'buildFortress',
  'airbase', 'buildAirbase',
  'transform', 'pollution', 'cleanPollution',
  'railroad',
]);

/**
 * Apply per-civ start-of-turn processing. Returns a mutated state
 * object (caller responsible for cloning if the reducer contract
 * requires it).
 *
 * @param {object} state - game state (mutated in place)
 * @param {number} civ - civ slot (0-7)
 */
export function processCivTurnStart(state, civ) {
  if (!state.units) return state;

  // ── Binary FUN_00560084 per-civ tick (block_00560000.c:10-60) ──
  // Runs at the start of each civ's turn before unit moves-reset. It:
  //   1. Clears stateFlags bits 0x48 (stateFlags &= 0xffb7)
  //   2. If govTransitionByte == 0 (idle), re-run gov assignment under
  //      conditional gates. For AI civs OR on non-mod-4 turns, checks
  //      FUN_00453e51(civ, 0x13) as a secondary gate. On mod-4 turns
  //      for humans OR if stateFlags bit 0x01 is clear, call
  //      FUN_0055c69d which sets bit 0x08.
  //   3. For non-barbarian civs: write a fresh random byte to civ+0xB6
  //      and toggle senate-override bit 0x04 with 1/3 probability.
  //
  // Partial port: we implement (1) and the toggle from (3). The
  // gov-reassignment branches are gated by fields we don't yet track
  // for loaded snapshots (civ+0x15 govTransitionByte isn't in the .sav
  // prefix region). Left as TODO — tracked in reverse_engineering/
  // findings/init_sequence_audit.md.
  if (state.civs && state.civs[civ]) {
    const c = state.civs[civ];
    const flagsBefore = c.stateFlags || 0;
    const newFlags = flagsBefore & 0xffb7;  // clear bits 0x48
    // NOTE: the binary also rolls senate-override (bit 0x04) and
    // writes a random byte to civ+0xB6 here. Skipped because doing
    // so would consume rng draws that the binary's full tick also
    // consumes but in a different order — desyncing our seeded RNG
    // stream from civ2.exe's. Will add once RNG call-order audit
    // (task #49) confirms the exact sequence of rand() calls
    // around these operations.
    if (newFlags !== flagsBefore) {
      state.civs = [...state.civs];
      state.civs[civ] = { ...c, stateFlags: newFlags };
    }
  }

  const ownerHasLighthouse = hasWonderEffect(state, civ, 3);
  const ownerHasMagellan = hasWonderEffect(state, civ, 12);
  const ownerHasNuclearPower = !!(state.civTechs?.[civ]?.has(59));
  const humanMask = state.humanPlayers ?? 0;
  const isHumanOwner = !!(humanMask & (1 << civ));

  state.units = state.units.map(u => {
    if (!u || u.gx < 0 || u.owner !== civ) return u;

    // Sea-unit movement bonuses feed calcEffectiveMovementPoints so
    // damage scaling applies to the total (base + bonuses), matching
    // binary FUN_005b2a39 (lines 772-810).
    let seaBonus = 0;
    if (UNIT_DOMAIN[u.type] === 2) {
      if (ownerHasLighthouse && !UNIT_NO_LIGHTHOUSE_BONUS.has(u.type)) {
        seaBonus += MOVEMENT_MULTIPLIER;
      }
      if (ownerHasMagellan) seaBonus += 2 * MOVEMENT_MULTIPLIER;
      if (ownerHasNuclearPower) seaBonus += MOVEMENT_MULTIPLIER;
    }
    const mp = calcEffectiveMovementPoints(u, seaBonus);
    const idleLastTurn = (u.movesLeft || 0) >= mp;
    const idle = IDLE_ORDERS.has(u.orders);

    // Keep order byte in sync with orders string (idle units may have
    // just been promoted fortifying→fortified by end-turn's global
    // pass; the byte must reflect that).
    const orderByte = (u.orders in ORDER_BYTES)
      ? ORDER_BYTES[u.orders]
      : (u.order ?? 0xFF);

    let newMoveSpent, newMovesLeft;
    if (idle) {
      // Idle unit (fortify-like order). See file header for the
      // rationale behind the human/AI split: binary writes moveSpent
      // during AI auto-fortify creation/promotion; human-fortified
      // units retain whatever moveSpent the user left.
      newMoveSpent = isHumanOwner ? (u.moveSpent ?? 0) : mp;
      newMovesLeft = 0;
    } else {
      newMoveSpent = 0;
      newMovesLeft = mp;
    }

    return {
      ...u,
      movesLeft: newMovesLeft,
      moveSpent: newMoveSpent,
      order: orderByte,
      idleLastTurn,
    };
  });

  return state;
}
