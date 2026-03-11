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

import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, CHANGE_RATES, SET_RESEARCH, UNIT_ORDER, WORKER_ORDER } from './actions.js';
import { UNIT_DOMAIN, UNIT_ATK, CITY_RADIUS_DOUBLED, UNIT_COSTS, IMPROVE_COSTS, WONDER_COSTS, IMPROVE_MAINTENANCE, ADVANCE_PREREQS, IRRIGATION_TURNS, MINING_TURNS, ROAD_TURNS } from './defs.js';
import { resolveDirection, getDirection } from './movement.js';
import { getProductionCost } from './production.js';
import { calcRushBuyCost } from './happiness.js';

const VALID_SPECIALIST_TYPES = new Set(['entertainer', 'taxman', 'scientist']);

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
  if (civSlot !== gameState.turn.activeCiv) return 'Not your turn';

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

      // Check for enemy units at destination — non-combat units (ATK=0) can't attack
      const hasEnemy = gameState.units.some(u =>
        u.gx === dest.gx && u.gy === dest.gy && u.owner !== unit.owner && u.gx >= 0);
      if (hasEnemy && (UNIT_ATK[unit.type] || 0) === 0) return 'Non-combat unit cannot attack';

      // Can't move own units onto enemy-occupied tile without attacking (friendly stack check not needed — we allow stacking own units)

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
      const { cityIndex, workedTiles, specialists } = action;
      if (cityIndex == null) return 'Missing cityIndex';
      const city = gameState.cities[cityIndex];
      if (!city) return 'City not found';
      if (city.owner !== civSlot) return 'Not your city';

      // Validate types
      if (!Array.isArray(workedTiles)) return 'workedTiles must be an array';
      if (!Array.isArray(specialists)) return 'specialists must be an array';

      // Workers + specialists must equal city size (center tile is always worked, not counted)
      if (workedTiles.length + specialists.length !== city.size) {
        return `Workers (${workedTiles.length}) + specialists (${specialists.length}) != city size (${city.size})`;
      }

      // Validate specialist types
      for (const spec of specialists) {
        if (!VALID_SPECIALIST_TYPES.has(spec))
          return `Invalid specialist type: ${spec}`;
      }

      // Validate tile indices are in range and unique
      const seen = new Set();
      for (const ti of workedTiles) {
        if (ti < 0 || ti > 19) return `Worker tile index out of range: ${ti}`;
        if (seen.has(ti)) return `Duplicate worker tile index: ${ti}`;
        seen.add(ti);
      }

      // Validate workers aren't on ocean or off-map tiles
      const parC = city.gy & 1;
      for (const i of workedTiles) {
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

    case CHANGE_PRODUCTION: {
      const { cityIndex, item } = action;
      if (cityIndex == null) return 'Missing cityIndex';
      const city = gameState.cities[cityIndex];
      if (!city) return 'City not found';
      if (city.owner !== civSlot) return 'Not your city';
      if (!item || !item.type) return 'Missing production item';
      if (!['unit', 'building', 'wonder'].includes(item.type)) return 'Invalid item type';
      if (item.id == null) return 'Missing item id';

      // Validate item exists in cost tables
      if (item.type === 'unit' && UNIT_COSTS[item.id] == null) return 'Unknown unit type';
      if (item.type === 'building' && IMPROVE_COSTS[item.id] == null) return 'Unknown building';
      if (item.type === 'wonder' && WONDER_COSTS[item.id - 39] == null) return 'Unknown wonder';

      // Can't build a building/wonder the city already has
      if (item.type === 'building' && city.buildings && city.buildings.has(item.id))
        return 'City already has this building';

      return null;
    }

    case RUSH_BUY: {
      const { cityIndex } = action;
      if (cityIndex == null) return 'Missing cityIndex';
      const city = gameState.cities[cityIndex];
      if (!city) return 'City not found';
      if (city.owner !== civSlot) return 'Not your city';
      const item = city.itemInProduction;
      if (!item) return 'Nothing being produced';
      // Can't rush-buy Capitalization
      if (item.type === 'building' && item.id === 38) return 'Cannot rush-buy Capitalization';
      // Can't rush-buy units during civil disorder
      if (item.type === 'unit' && city.civilDisorder) return 'Cannot rush-buy units during disorder';
      // Check cost
      const totalCost = getProductionCost(item);
      if (city.shieldsInBox >= totalCost) return 'Production already complete';
      const buyCost = calcRushBuyCost(item.type, totalCost, city.shieldsInBox || 0);
      const treasury = gameState.civs?.[civSlot]?.treasury || 0;
      if (buyCost > treasury) return 'Not enough gold';
      return null;
    }

    case SELL_BUILDING: {
      const { cityIndex, buildingId } = action;
      if (cityIndex == null) return 'Missing cityIndex';
      if (buildingId == null) return 'Missing buildingId';
      const city = gameState.cities[cityIndex];
      if (!city) return 'City not found';
      if (city.owner !== civSlot) return 'Not your city';
      if (!city.buildings || !city.buildings.has(buildingId)) return 'City does not have this building';
      if (buildingId === 1) return 'Cannot sell the Palace';
      if (buildingId >= 35 && buildingId <= 37) return 'Cannot sell spaceship parts';
      if (city.soldThisTurn) return 'Already sold a building this turn';
      return null;
    }

    case CHANGE_RATES: {
      const { scienceRate, taxRate } = action;
      if (scienceRate == null || taxRate == null) return 'Missing rate values';
      if (!Number.isInteger(scienceRate) || !Number.isInteger(taxRate)) return 'Rates must be integers';
      if (scienceRate < 0 || scienceRate > 10) return 'Science rate out of range (0-10)';
      if (taxRate < 0 || taxRate > 10) return 'Tax rate out of range (0-10)';
      if (scienceRate + taxRate > 10) return 'Rates sum exceeds 10';
      return null;
    }

    case SET_RESEARCH: {
      const { advanceId } = action;
      if (advanceId == null) return 'Missing advanceId';
      if (!Number.isInteger(advanceId) || advanceId < 0 || advanceId >= ADVANCE_PREREQS.length) {
        return 'Invalid advance ID';
      }
      const civTechs = gameState.civTechs?.[civSlot];
      if (civTechs && civTechs.has(advanceId)) return 'Already researched';
      const [p1, p2] = ADVANCE_PREREQS[advanceId];
      if (p1 === -2 || p2 === -2) return 'Advance is not researchable';
      if (p1 >= 0 && !(civTechs && civTechs.has(p1))) return 'Missing prerequisite';
      if (p2 >= 0 && !(civTechs && civTechs.has(p2))) return 'Missing prerequisite';
      return null;
    }

    case UNIT_ORDER: {
      const { unitIndex, order } = action;
      if (unitIndex == null) return 'Missing unitIndex';
      if (!['fortify', 'sentry', 'sleep', 'skip', 'disband', 'wake'].includes(order)) return 'Invalid order';
      const unit = gameState.units[unitIndex];
      if (!unit) return 'Unit not found';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.gx < 0) return 'Unit is dead';
      // Can't fortify sea/air units
      if (order === 'fortify' && UNIT_DOMAIN[unit.type] !== 0) return 'Only land units can fortify';
      // Can only wake units that have active orders
      if (order === 'wake' && (!unit.orders || unit.orders === 'none')) return 'Unit has no orders to clear';
      return null;
    }

    case WORKER_ORDER: {
      const { unitIndex, order } = action;
      if (unitIndex == null) return 'Missing unitIndex';
      if (!['road', 'railroad', 'irrigation', 'mine', 'fortress', 'airbase', 'pollution'].includes(order)) return 'Invalid worker order';
      const unit = gameState.units[unitIndex];
      if (!unit) return 'Unit not found';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.gx < 0) return 'Unit is dead';
      // Only settlers (0) and engineers (1) can do worker orders
      if (unit.type !== 0 && unit.type !== 1) return 'Only Settlers/Engineers can build';
      const terrain = mapBase.getTerrain(unit.gx, unit.gy);
      // Can't build on ocean (except pollution cleanup)
      if (terrain === 10 && order !== 'pollution') return 'Cannot build improvements on ocean';
      // Check specific orders
      if (order === 'irrigation') {
        if (IRRIGATION_TURNS[terrain] === 0) return 'Cannot irrigate this terrain';
        const imp = mapBase.getImprovements(unit.gx, unit.gy);
        if (imp.irrigation && !imp.farmland) return 'Already irrigated';
      }
      if (order === 'mine') {
        if (MINING_TURNS[terrain] === 0) return 'Cannot mine this terrain';
        const imp = mapBase.getImprovements(unit.gx, unit.gy);
        if (imp.mining) return 'Already has mine';
      }
      if (order === 'road') {
        const imp = mapBase.getImprovements(unit.gx, unit.gy);
        if (imp.road) return 'Already has road';
      }
      if (order === 'railroad') {
        const imp = mapBase.getImprovements(unit.gx, unit.gy);
        if (!imp.road) return 'Needs road first';
        if (imp.rail) return 'Already has railroad';
      }
      if (order === 'pollution') {
        const imp = mapBase.getImprovements(unit.gx, unit.gy);
        if (!imp.pollution) return 'No pollution to clean';
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
