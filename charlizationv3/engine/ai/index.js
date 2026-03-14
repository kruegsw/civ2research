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
//   6. Cleanup — skip/fortify idle units so END_TURN passes
// ═══════════════════════════════════════════════════════════════════

import { assessStrategy } from './strategyai.js';
import { generateEconActions } from './econai.js';
import { generateDiplomacyActions } from './diplomai.js';
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
 * @param {Array<string>|null} [debugLog=null] - if non-null, AI modules push debug strings here
 * @returns {{ actions: Array<object>, debugLog: Array<string>|null }}
 */
export function runAiTurn(gameState, mapBase, civSlot, debugLog = null) {
  const actions = [];

  try {
    // ── 0. Strategic assessment (advisory — no actions) ──
    // Computes threat level, military posture, war/peace targets,
    // and production focus. Passed to all phases for future use.
    const strategy = assessStrategy(gameState, mapBase, civSlot, undefined, debugLog);

    // ── 1. Research & economy ──
    // Smart tech selection, tax/science rate balancing, government revolution
    const econActions = generateEconActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...econActions);

    // ── 2. Diplomacy ──
    // Respond to treaty proposals/tribute demands, declare war, propose peace
    const diploActions = generateDiplomacyActions(gameState, mapBase, civSlot, debugLog);
    actions.push(...diploActions);

    // ── 3. City management: production selection + rush-buy ──
    // Run before unit AI so newly produced/rushed units can be used
    const prodActions = generateProductionActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...prodActions);

    const rushActions = generateRushBuyActions(gameState, mapBase, civSlot, strategy);
    actions.push(...rushActions);

    // ── 4. Settler/Worker AI ──
    // Settlers found cities; idle settlers/engineers improve tiles
    const settlerActions = generateSettlerActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...settlerActions);

    // ── 5. Military unit AI ──
    // Explore unexplored territory, attack adjacent enemies
    const militaryActions = generateMilitaryActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...militaryActions);

    // ── 6. Cleanup: skip/fortify any unit that still has moves ──
    // This must come last. After the server applies steps 3-5,
    // some units will have been moved/ordered. The cleanup pass
    // handles any units that still need orders.
    const cleanupActions = generateCleanupActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...cleanupActions);

  } catch (err) {
    // Never crash the server — log and return whatever we have
    console.error(`[ai] Error during AI turn for civ ${civSlot}:`, err);
  }

  return { actions, debugLog };
}
