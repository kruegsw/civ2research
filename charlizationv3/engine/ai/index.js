// ═══════════════════════════════════════════════════════════════════
// ai/index.js — AI player controller (Phase 4: economy, research, government)
//
// Called by the server during AI civ turns. Returns an array of
// actions to apply before END_TURN.
//
// Phases:
//   1. Research & economy — smart tech selection, rate balancing, revolution
//   2. City management — production selection and rush-buy
//   3. Settler AI — city founding and worker improvements
//   4. Military AI — exploration, combat, patrol
//   5. Cleanup — skip/fortify idle units so END_TURN passes
// ═══════════════════════════════════════════════════════════════════

import { generateEconActions } from './econai.js';
import { generateProductionActions, generateRushBuyActions } from './prodai.js';
import { generateSettlerActions } from './cityai.js';
import { generateMilitaryActions, generateCleanupActions } from './unitai.js';

/**
 * Run one AI turn for the given civ.
 * Returns an array of actions to apply before END_TURN.
 *
 * IMPORTANT: The server applies these actions sequentially through
 * applyAction(), so later actions see a mutated state. However, we
 * compute all actions against the *initial* state snapshot. To stay
 * safe, each unit gets at most one action (one move, one order, etc).
 * The cleanup pass ensures every unit with remaining moves gets a
 * skip or fortify order so END_TURN validation passes.
 *
 * @param {object} gameState - current mutable game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7) being played
 * @returns {Array<object>} actions to apply
 */
export function runAiTurn(gameState, mapBase, civSlot) {
  const actions = [];

  try {
    // ── 1. Research & economy ──
    // Smart tech selection, tax/science rate balancing, government revolution
    const econActions = generateEconActions(gameState, mapBase, civSlot);
    actions.push(...econActions);

    // ── 2. City management: production selection + rush-buy ──
    // Run before unit AI so newly produced/rushed units can be used
    const prodActions = generateProductionActions(gameState, mapBase, civSlot);
    actions.push(...prodActions);

    const rushActions = generateRushBuyActions(gameState, mapBase, civSlot);
    actions.push(...rushActions);

    // ── 3. Settler/Worker AI ──
    // Settlers found cities; idle settlers/engineers improve tiles
    const settlerActions = generateSettlerActions(gameState, mapBase, civSlot);
    actions.push(...settlerActions);

    // ── 4. Military unit AI ──
    // Explore unexplored territory, attack adjacent enemies
    const militaryActions = generateMilitaryActions(gameState, mapBase, civSlot);
    actions.push(...militaryActions);

    // ── 5. Cleanup: skip/fortify any unit that still has moves ──
    // This must come last. After the server applies steps 2-4,
    // some units will have been moved/ordered. The cleanup pass
    // handles any units that still need orders.
    const cleanupActions = generateCleanupActions(gameState, mapBase, civSlot);
    actions.push(...cleanupActions);

  } catch (err) {
    // Never crash the server — log and return whatever we have
    console.error(`[ai] Error during AI turn for civ ${civSlot}:`, err);
  }

  return actions;
}
