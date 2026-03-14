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
import { generateBarbarianActions } from './barbarian.js';

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
  // ── Barbarian AI (civ slot 0): separate simpler logic ──
  if (civSlot === 0) {
    const barbActions = generateBarbarianActions(gameState, mapBase, debugLog);
    return { actions: barbActions, debugLog };
  }

  const actions = [];

  // Track which unit indices already received an action from earlier phases.
  // Cleanup must skip these — otherwise it overwrites move/build actions
  // with sentry/skip (computed from the stale initial snapshot).
  const handledUnits = new Set();

  /** Collect actions from a phase, recording unit indices. */
  function collectActions(phaseActions) {
    for (const a of phaseActions) {
      actions.push(a);
      if (a.unitIndex != null) handledUnits.add(a.unitIndex);
    }
  }

  try {
    // ── 0. Strategic assessment (advisory — no actions) ──
    const strategy = assessStrategy(gameState, mapBase, civSlot, undefined, debugLog);

    // ── 1. Research & economy ──
    collectActions(generateEconActions(gameState, mapBase, civSlot, strategy, debugLog));

    // ── 2. Diplomacy ──
    collectActions(generateDiplomacyActions(gameState, mapBase, civSlot, debugLog));

    // ── 3. City management: production selection + rush-buy ──
    collectActions(generateProductionActions(gameState, mapBase, civSlot, strategy, debugLog));
    collectActions(generateRushBuyActions(gameState, mapBase, civSlot, strategy));

    // ── 4. Settler/Worker AI ──
    collectActions(generateSettlerActions(gameState, mapBase, civSlot, strategy, debugLog));

    // ── 5. Military unit AI ──
    collectActions(generateMilitaryActions(gameState, mapBase, civSlot, strategy, debugLog));

    // ── 6. Cleanup: skip/fortify any unit that still has moves ──
    // Must come last. Skips units already handled by earlier phases.
    const cleanupActions = generateCleanupActions(gameState, mapBase, civSlot, strategy, debugLog, handledUnits);
    actions.push(...cleanupActions);

  } catch (err) {
    // Never crash the server — log and return whatever we have
    console.error(`[ai] Error during AI turn for civ ${civSlot}:`, err);
  }

  return { actions, debugLog };
}
