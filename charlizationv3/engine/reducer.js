// ═══════════════════════════════════════════════════════════════════
// reducer.js — Authoritative state transitions (shared: server + client)
//
// The ONLY code that mutates game state. The server calls
// applyAction(gameState, mapBase, action) for every validated action.
// Returns a new state object if valid, or the same reference if rejected.
//
// Never mutates the input state directly — clones first.
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from './rules.js';
import { MOVE_UNIT, END_TURN } from './actions.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS } from './defs.js';
import { resolveDirection, moveCost } from './movement.js';
import { updateVisibility } from './visibility.js';

/**
 * Apply an action to the game state.
 *
 * @param {object} prev - current authoritative game state (never mutated)
 * @param {object} mapBase - immutable map data + accessor functions
 * @param {object} action - { type, ...params }
 * @param {number} civSlot - civ slot of the acting player
 * @returns {object} new state if valid, same reference if rejected
 */
export function applyAction(prev, mapBase, action, civSlot) {
  // Validate
  const error = validateAction(prev, mapBase, action, civSlot);
  if (error) return prev;

  // Clone mutable state (shallow clone units array, deep clone moved unit)
  const state = { ...prev, units: [...prev.units] };

  switch (action.type) {
    case MOVE_UNIT: {
      const { unitIndex, dir } = action;
      const unit = { ...state.units[unitIndex] };
      const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);

      // Calculate cost
      const cost = moveCost(unit.type, mapBase, unit.gx, unit.gy, dest.gx, dest.gy);

      // Update position
      unit.gx = dest.gx;
      unit.gy = dest.gy;
      unit.x = dest.gx * 2 + (dest.gy % 2);
      unit.y = dest.gy;

      // Deduct movement (minimum 1 third spent, even on railroad)
      unit.movesLeft = Math.max(0, unit.movesLeft - Math.max(cost, 1));

      // Wake from sleep/fortify
      if (unit.orders === 2 || unit.orders === 3) unit.orders = 0;

      state.units[unitIndex] = unit;

      // Update visibility for this civ around new position
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, dest.gx, dest.gy, mapBase.wraps);

      break;
    }

    case END_TURN: {
      // Find next alive civ
      let next = state.activeCiv;
      let turnNumber = state.turnNumber;
      for (let i = 0; i < 7; i++) {
        next = (next % 7) + 1; // cycle 1→2→3→...→7→1
        if (state.civsAlive & (1 << next)) break;
      }
      // If we wrapped back to first alive civ, increment turn
      const firstAlive = findFirstAliveCiv(state.civsAlive);
      if (next <= state.activeCiv || next === firstAlive) {
        turnNumber++;
      }

      state.activeCiv = next;
      state.turnNumber = turnNumber;

      // Reset movement for the next civ's units
      state.units = state.units.map(u => {
        if (u.owner !== next) return u;
        return { ...u, movesLeft: UNIT_MOVE_POINTS[u.type] * MOVEMENT_MULTIPLIER };
      });

      break;
    }

    default:
      return prev;
  }

  state.version = (prev.version || 0) + 1;
  return state;
}

function findFirstAliveCiv(civsAlive) {
  for (let i = 1; i < 8; i++) {
    if (civsAlive & (1 << i)) return i;
  }
  return 1;
}
