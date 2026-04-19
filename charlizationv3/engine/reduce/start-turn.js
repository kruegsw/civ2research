// ═══════════════════════════════════════════════════════════════════
// start-turn.js — Per-civ start-of-turn processing
//
// Binary reference: FUN_0048710a @ block_00480000.c:1741-1787 is called
// once per civ at that civ's turn start (from FUN_00487371 line 1822).
// It runs per-unit reset logic:
//   - Active unit (order=none): moveSpent=0, movesLeft=max, flags cleared.
//   - Idle unit (fortify-like orders): decrement the fortify-delay
//     counter (+0x0E); when it reaches 0, promote to 'fortified'.
//
// This file extracts that logic so it can be invoked BOTH during the
// reducer's END_TURN cycle-wrap AND via the new START_TURN action
// (fired per civ by the harness / server). Decoupling the start-of-
// turn reset from END_TURN lets callers drive timing explicitly,
// matching the binary's per-civ model.
//
// Current rule (empirically matched, full binary mechanism pending):
//   Idle units → moveSpent UNCHANGED for human owners, BUMPED to max
//   for AI owners. This split is a snapshot-timing shortcut — the
//   underlying binary likely uses the +0x0E delay counter with a
//   fortify_promote_and_clear() that bumps moveSpent when delay hits
//   zero. Once we understand that fully, the human/AI branch can be
//   replaced with a delay-driven rule.
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
      // See file-level comment: empirical human/AI split pending
      // binary-mechanism analysis.
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
