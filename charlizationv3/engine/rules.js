// ═══════════════════════════════════════════════════════════════════
// rules.js — Action validation (shared: server + client)
//
// Pure functions that check whether an action is legal given the
// current state. Used by:
//   - Server (reducer.js): reject invalid actions before applying
//   - Client: disable UI for illegal actions
//
// Returns null if valid, or an error string explaining why not.
// ═══════════════════════════════════════════════════════════════════

import { MOVE_UNIT, END_TURN } from './actions.js';
import { UNIT_DOMAIN } from './defs.js';
import { resolveDirection } from './movement.js';

/**
 * Validate whether an action is legal in the current state.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - map accessor functions
 * @param {object} action - { type, ...params }
 * @param {number} civSlot - the civ slot of the acting player
 * @returns {string|null} error message if invalid, null if valid
 */
export function validateAction(gameState, mapBase, action, civSlot) {
  if (!action || !action.type) return 'Missing action type';

  // Must be this civ's turn
  if (civSlot !== gameState.activeCiv) return 'Not your turn';

  switch (action.type) {
    case MOVE_UNIT: {
      const { unitIndex, dir } = action;
      if (unitIndex == null || !dir) return 'Missing unitIndex or dir';

      const unit = gameState.units[unitIndex];
      if (!unit) return 'Unit not found';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.movesLeft <= 0) return 'No movement points remaining';

      // Resolve destination
      const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
      if (!dest) return 'Cannot move off map';

      // Domain check: land units can't enter ocean (no transport yet)
      const domain = UNIT_DOMAIN[unit.type] ?? 0;
      const terrain = mapBase.getTerrain(dest.gx, dest.gy);
      if (domain === 0 && terrain === 10) return 'Land unit cannot enter ocean';
      if (domain === 1 && terrain !== 10) return 'Sea unit cannot enter land';

      return null;
    }

    case END_TURN:
      return null; // always valid if it's your turn

    default:
      return `Unknown action type: ${action.type}`;
  }
}
