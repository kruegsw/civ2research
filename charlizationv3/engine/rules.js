// ═══════════════════════════════════════════════════════════════════
// rules.js — Action validation (shared: server + client)
//
// Pure functions that check whether an action is legal given the
// current state. Used by:
//   - Server (reducer.js): reject invalid actions before applying
//   - Client: disable UI for illegal actions, prevent wasted round-trips
//
// Returns null if valid, or an error string explaining why not.
// ═══════════════════════════════════════════════════════════════════

/**
 * Validate whether an action is legal in the current state.
 *
 * @param {object} state - current game state
 * @param {object} action - { type, ...params }
 * @returns {string|null} error message if invalid, null if valid
 */
export function validateAction(state, action) {
  // if (!action || !action.type) return 'Missing action type';

  // Common checks for all actions:
  // - Is it this civ's turn?  (action.civSlot === state.activeCiv)
  // - Is the game still in progress?

  // switch (action.type) {
  //   case 'MOVE_UNIT': {
  //     // - Does the unit exist and belong to the acting civ?
  //     // - Does the unit have movement points remaining?
  //     // - Is the target tile adjacent (or within goto path)?
  //     // - Can this unit type enter that terrain?
  //     //   (land units can't enter ocean without transport, etc.)
  //     // - Zone of Control: is the unit moving between two enemy ZOC tiles?
  //     // - Is the unit currently fortified/sleeping? (auto-wake)
  //     break;
  //   }
  //   case 'BUILD_CITY': {
  //     // - Is the unit a settler type? (type 0 or 1)
  //     // - Is the tile land (not ocean)?
  //     // - Is there already a city on this tile?
  //     // - Is there a city within minimum distance? (1 tile gap)
  //     break;
  //   }
  //   case 'CHANGE_PRODUCTION': {
  //     // - Does the city belong to the acting civ?
  //     // - Is the item buildable? (tech prereqs met, not duplicate wonder)
  //     // - Penalty: changing production loses accumulated shields
  //     //   (unless same category or Pyramids/Suffrage allow granary switch)
  //     break;
  //   }
  //   case 'SET_RATES': {
  //     // - Do tax + lux + sci rates sum to 10?
  //     // - Government rate limits: Democracy allows 0-10 each,
  //     //   Despotism caps science at 6, etc.
  //     break;
  //   }
  //   case 'END_TURN':
  //     return null; // always valid if it's your turn
  //   default:
  //     return `Unknown action type: ${action.type}`;
  // }

  return null; // stub: all actions valid until implemented
}
