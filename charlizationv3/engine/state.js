// ═══════════════════════════════════════════════════════════════════
// state.js — Game state schema (shared: server + client)
//
// Defines how a game state is created from a parsed .sav file.
// The parser produces raw data; this module wraps it into the
// canonical state shape that the server holds authoritatively
// and clients receive (filtered by visibility).
// ═══════════════════════════════════════════════════════════════════

import { LEADERS_TXT_NAMES } from './defs.js';

/**
 * Build the initial game state from a parsed .sav file.
 * This is the starting state for an interactive game session.
 *
 * @param {object} parsed - output of Civ2Parser.parse()
 * @returns {object} canonical game state
 */
export function initialStateFromSav(parsed) {
  // Resolve civ display names (same logic as app.js had inline)
  const civNames = {};
  for (let i = 0; i < 8; i++) {
    const nb = parsed.civNameBlocks && parsed.civNameBlocks[i];
    const cd = parsed.civData && parsed.civData[i];
    const tribeName = nb && nb.tribeName;
    const rulesName = cd && cd.rulesCivNumber != null && LEADERS_TXT_NAMES[cd.rulesCivNumber];
    civNames[i] = i === 0 ? 'Barbarians' : (tribeName || rulesName || `Civ ${i}`);
  }

  return {
    // The full parsed data — rendering and game logic both need access
    // to the complete map, units, cities, civData, gameState, etc.
    ...parsed,
    civNames,

    // ── Future: mutable game state fields ──
    // When the game becomes interactive, the server will maintain:
    //   version: 0,           // increments on each action (for sync)
    //   activeCiv: parsed.gameState.playerCiv,  // whose turn it is
    //   phase: 'movement',    // turn phase: movement | production | endTurn
    //   pendingActions: [],    // queued actions for async resolution
  };
}

// ─────────────────────────────────────────────────────────────────
// TODO: Game state shape for interactive play
// ─────────────────────────────────────────────────────────────────
// The game state will evolve from the parsed save to include:
//
//   state.version      — monotonic counter, increments on every mutation
//   state.activeCiv    — which civ is taking their turn (0-7)
//   state.phase        — turn phase (movement, combat, production, diplomacy)
//   state.turnNumber   — current turn (may differ from turnsPassed if game continues)
//
// Units will gain mutable fields:
//   unit.movesLeft     — remaining movement points this turn
//   unit.hasAttacked   — can't attack again this turn
//   unit.goto          — destination tile for auto-move
//
// Cities will gain mutable fields:
//   city.productionQueue — what's being built (already parsed, but becomes mutable)
//   city.shieldsInBox    — accumulated shields toward current production
//   city.foodInBox       — accumulated food toward growth
//
// The reducer (reducer.js) will be the only code that mutates state.
