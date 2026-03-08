// ═══════════════════════════════════════════════════════════════════
// reducer.js — Authoritative state transitions (shared: server + client)
//
// The ONLY code that mutates game state. The server calls
// applyAction(state, action) for every validated player action.
// Returns a new state reference if the action was valid,
// or the same reference if rejected.
//
// Pattern from Trevdor: validate first (rules.js), then clone
// and mutate. Never mutate the input state directly.
// ═══════════════════════════════════════════════════════════════════

// import { validateAction } from './rules.js';

/**
 * Apply an action to the game state.
 *
 * @param {object} prev - current authoritative state (never mutated)
 * @param {object} action - { type, ...params }
 * @returns {object} new state if valid, same reference if rejected
 */
export function applyAction(prev, action) {
  // 1. Validate — reject early if action is illegal
  // const error = validateAction(prev, action);
  // if (error) return prev;

  // 2. Clone — never mutate authoritative state
  // const state = structuredClone(prev);

  // 3. Apply — switch on action.type
  // switch (action.type) {
  //   case 'MOVE_UNIT': {
  //     // Find unit, check movement points, compute path cost,
  //     // check ZOC, handle combat if enemy present,
  //     // update unit position, decrement moves, update visibility
  //     break;
  //   }
  //   case 'END_TURN': {
  //     // Process end-of-turn for active civ:
  //     //   1. City production (shields → build queue)
  //     //   2. City growth (food → population)
  //     //   3. Tech research (beakers → discovery)
  //     //   4. Unit support costs
  //     //   5. Advance activeCiv to next alive civ
  //     //   6. Increment version
  //     break;
  //   }
  //   default:
  //     return prev; // unknown action type
  // }

  // 4. Bump version
  // state.version = (prev.version || 0) + 1;
  // return state;

  return prev; // stub: no-op until game logic is implemented
}
