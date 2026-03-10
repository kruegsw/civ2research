// ═══════════════════════════════════════════════════════════════════
// rules.js — Action validation (shared: server + client)
//
// Pure functions that check whether an action is legal given the
// current state. Used by:
//   - Server (reducer.js): reject invalid actions before applying
//   - Client: disable UI for illegal actions, build context menus
//
// Returns null if valid, or an error string explaining why not.
// ═══════════════════════════════════════════════════════════════════

import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS } from './actions.js';
import { UNIT_DOMAIN, CITY_RADIUS_DOUBLED } from './defs.js';
import { resolveDirection, getDirection } from './movement.js';

function popcount(n) {
  let c = 0;
  while (n) { c += n & 1; n >>>= 1; }
  return c;
}

function countSpecialists(specBytes) {
  let count = 0;
  for (let b = 0; b < 4; b++) {
    for (let s = 0; s < 4; s++) {
      const val = (specBytes[b] >> (s * 2)) & 0x03;
      if (val > 0) count++;
    }
  }
  return count;
}

/**
 * Check if a tile is too close to an existing city.
 * In Civ2, no city can be built if its center falls within another
 * city's 21-tile radius (i.e. cities must be spaced at least 3 apart).
 */
function isTooCloseToCity(gx, gy, cities, mapBase) {
  const mw2 = mapBase.mw * 2;
  const dx = gx * 2 + (gy % 2);
  for (const city of cities) {
    const cdx = city.gx * 2 + (city.gy % 2);
    for (const [odx, ody] of CITY_RADIUS_DOUBLED) {
      let ndx = cdx + odx;
      const ndy = city.gy + ody;
      if (mapBase.wraps) { ndx = ((ndx % mw2) + mw2) % mw2; }
      if (ndx === dx && ndy === gy) return true;
    }
  }
  return false;
}

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

    case BUILD_CITY: {
      const { unitIndex } = action;
      if (unitIndex == null) return 'Missing unitIndex';

      const unit = gameState.units[unitIndex];
      if (!unit) return 'Unit not found';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.type !== 0) return 'Only settlers can build cities';
      if (unit.gx < 0) return 'Unit is dead';

      // Can't build on ocean
      const terrain = mapBase.getTerrain(unit.gx, unit.gy);
      if (terrain === 10) return 'Cannot build city on ocean';

      // Can't build on existing city or within another city's radius
      if (isTooCloseToCity(unit.gx, unit.gy, gameState.cities, mapBase)) {
        return 'Too close to another city';
      }

      return null;
    }

    case SET_WORKERS: {
      const { cityIndex, workersInner, workersOuterA, workersOuterB, specialistBytes } = action;
      if (cityIndex == null) return 'Missing cityIndex';
      const city = gameState.cities[cityIndex];
      if (!city) return 'City not found';
      if (city.owner !== civSlot) return 'Not your city';

      // Validate bitmask ranges
      if ((workersInner & ~0xFF) || (workersOuterA & ~0xFF) || (workersOuterB & ~0x0F))
        return 'Invalid worker bitmask';
      if (!specialistBytes || specialistBytes.length !== 4)
        return 'Invalid specialist bytes';

      // Workers + specialists must equal city size (center tile is always worked, not counted)
      const workerCount = popcount(workersInner) + popcount(workersOuterA) + popcount(workersOuterB);
      const specCount = countSpecialists(specialistBytes);
      if (workerCount + specCount !== city.size) {
        return `Workers (${workerCount}) + specialists (${specCount}) != city size (${city.size})`;
      }

      // Validate no specialist byte uses invalid values (only 0-3 allowed)
      for (let b = 0; b < 4; b++) {
        if (specialistBytes[b] < 0 || specialistBytes[b] > 255)
          return 'Specialist byte out of range';
      }

      // Validate workers aren't on ocean or off-map tiles
      const parC = city.gy & 1;
      for (let i = 0; i < 20; i++) {
        const bit = i < 8 ? (workersInner >> i) & 1
          : i < 16 ? (workersOuterA >> (i - 8)) & 1
          : (workersOuterB >> (i - 16)) & 1;
        if (!bit) continue;
        const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
        const parT = ((city.gy + ddy) % 2 + 2) % 2;
        const tgx = city.gx + ((parC + ddx - parT) >> 1);
        const tgy = city.gy + ddy;
        const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
        if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw)
          return `Worker on out-of-bounds tile (${tgx},${tgy})`;
        const ter = mapBase.getTerrain(wgx, tgy);
        if (ter === 10) return `Worker on ocean tile (${tgx},${tgy})`;
      }

      return null;
    }

    case END_TURN:
      return null; // always valid if it's your turn

    default:
      return `Unknown action type: ${action.type}`;
  }
}

/**
 * Get valid actions for a unit at a target tile.
 * Used by the client to build context menus.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - map accessor functions
 * @param {number} unitIndex - index of the active unit
 * @param {object} tile - { gx, gy } of the clicked tile
 * @returns {Array<{type, label, action}>} list of valid actions
 */
export function getValidActions(gameState, mapBase, unitIndex, tile) {
  const unit = gameState.units[unitIndex];
  if (!unit || unit.gx < 0 || unit.movesLeft <= 0) return [];

  const civSlot = unit.owner;
  const sameTile = unit.gx === tile.gx && unit.gy === tile.gy;
  const actions = [];

  if (!sameTile) {
    // Different tile — check if it's a valid move
    const dir = getDirection(unit.gx, unit.gy, tile.gx, tile.gy, mapBase);
    if (dir) {
      const moveAction = { type: MOVE_UNIT, unitIndex, dir };
      if (!validateAction(gameState, mapBase, moveAction, civSlot)) {
        actions.push({ type: MOVE_UNIT, dir });
      }
    }
  } else {
    // Same tile — check tile-local actions
    const buildAction = { type: BUILD_CITY, unitIndex };
    if (!validateAction(gameState, mapBase, buildAction, civSlot)) {
      actions.push({ type: BUILD_CITY });
    }

    // Future: FORTIFY_UNIT, SENTRY, etc. would be checked here
  }

  return actions;
}
