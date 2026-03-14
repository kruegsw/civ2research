// ═══════════════════════════════════════════════════════════════════
// ai/index.js — AI player controller (Phase 7: diplomacy)
//
// Called by the server during AI civ turns. Returns an array of
// actions to apply before END_TURN.
//
// Phases:
//   0. Strategic assessment — threat, posture, war/peace targets (advisory)
//   1. Research & economy — smart tech selection, rate balancing, revolution
//   2. Diplomacy — treaty responses, war declarations, peace proposals, tribute
//   3. City management — production selection and rush-buy
//   4. Settler AI — city founding and worker improvements
//   5. Military AI — exploration, combat, patrol
//   6. Cleanup — skip/fortify ALL units that still have moves so END_TURN passes
// ═══════════════════════════════════════════════════════════════════

import { assessStrategy } from './strategyai.js';
import { generateEconActions } from './econai.js';
import { generateDiplomacyActions } from './diplomai.js';
import { generateProductionActions, generateRushBuyActions } from './prodai.js';
import { generateSettlerActions } from './cityai.js';
import { generateMilitaryActions, generateCleanupActions } from './unitai.js';
import { generateBarbarianActions } from './barbarian.js';

/**
 * Run one AI turn for the given civ.
 * Returns an array of actions to apply before END_TURN.
 *
 * IMPORTANT: The server applies these actions sequentially through
 * applyAction(), so later actions see a mutated state. However, we
 * compute all actions against the *initial* state snapshot. To stay
 * safe, each unit gets at most one action per phase.
 *
 * Cleanup issues skip/fortify for ALL units that have movesLeft > 0
 * in the initial snapshot (not just unhandled units). This is safe
 * because:
 *   - Units given UNIT_ORDER/WORKER_ORDER by earlier phases already
 *     have movesLeft=0 after those orders are applied, so the
 *     redundant skip is a harmless no-op (movesLeft already 0).
 *   - Units given MOVE_UNIT may still have movesLeft > 0 after the
 *     move is applied; the skip zeros out remaining movement,
 *     preventing END_TURN rejection.
 *   - Units consumed by BUILD_CITY or disband are dead (gx < 0)
 *     when the skip is applied, so the skip is rejected harmlessly.
 *   - The 'skip' order does NOT change unit.orders, so it never
 *     overwrites fortify/sentry/worker orders set by earlier phases.
 *
 * @param {object} gameState - current mutable game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7) being played
 * @param {Array<string>|null} [debugLog=null] - if non-null, AI modules push debug strings here
 * @returns {{ actions: Array<object>, debugLog: Array<string>|null }}
 */
export function runAiTurn(gameState, mapBase, civSlot, debugLog = null) {
  // ── Barbarian AI (civ slot 0): separate simpler logic ──
  if (civSlot === 0) {
    const barbActions = generateBarbarianActions(gameState, mapBase, debugLog);
    return { actions: barbActions, debugLog };
  }

  const actions = [];

  try {
    // ── 0. Strategic assessment (advisory — no actions) ──
    const strategy = assessStrategy(gameState, mapBase, civSlot, undefined, debugLog);

    // ── 1. Research & economy ──
    for (const a of generateEconActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── 2. Diplomacy ──
    for (const a of generateDiplomacyActions(gameState, mapBase, civSlot, debugLog)) {
      actions.push(a);
    }

    // ── 3. City management: production selection + rush-buy ──
    for (const a of generateProductionActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }
    for (const a of generateRushBuyActions(gameState, mapBase, civSlot, strategy)) {
      actions.push(a);
    }

    // ── 4. Settler/Worker AI ──
    for (const a of generateSettlerActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── 5. Military unit AI ──
    for (const a of generateMilitaryActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── 6. Cleanup: skip/fortify ALL units that still have moves ──
    // Must come last. Does NOT skip "handled" units — see JSDoc above
    // for why this is safe and necessary to prevent END_TURN rejection.
    const cleanupActions = generateCleanupActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...cleanupActions);

  } catch (err) {
    // Never crash the server — log and return whatever we have
    console.error(`[ai] Error during AI turn for civ ${civSlot}:`, err);
  }

  return { actions, debugLog };
}
