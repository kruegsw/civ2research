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

import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, CHANGE_RATES, SET_RESEARCH, UNIT_ORDER, WORKER_ORDER, REVOLUTION, PILLAGE, DESTROY_CITY, PROPOSE_TREATY, RESPOND_TREATY, DECLARE_WAR, ESTABLISH_TRADE, RENAME_CITY, BRIBE_UNIT, STEAL_TECH, SABOTAGE_CITY, INCITE_REVOLT, DEMAND_TRIBUTE, RESPOND_DEMAND, SHARE_MAP, BOMBARD, REBASE, GOTO, TRANSFORM_TERRAIN, NUKE, PARADROP, AIRLIFT, UPGRADE_UNIT } from './actions.js';
import { UNIT_DOMAIN, UNIT_ATK, CITY_RADIUS_DOUBLED, UNIT_COSTS, IMPROVE_COSTS, WONDER_COSTS, IMPROVE_MAINTENANCE, ADVANCE_PREREQS, UNIT_PREREQS, UNIT_OBSOLETE, IMPROVE_PREREQS, WONDER_PREREQS, WONDER_OBSOLETE, IRRIGATION_TURNS, MINING_TURNS, ROAD_TURNS, GOVERNMENT_KEYS, GOVT_TECH_PREREQS, UNIT_CARRY_CAP, GOVT_MAX_RATE, GOVT_MAX_SCIENCE, TERRAIN_TRANSFORM, UNIT_MOVE_POINTS, UNIT_UPGRADE_TO, BUSY_ORDERS } from './defs.js';
import { resolveDirection, getDirection, isZOCBlocked } from './movement.js';
import { getProductionCost } from './production.js';
import { calcRushBuyCost } from './happiness.js';
import { getGovernment } from './utils.js';

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

  // Actions that can be performed even when it's not your turn
  const ANYTIME_ACTIONS = [RESPOND_TREATY, RESPOND_DEMAND, RENAME_CITY, CHANGE_PRODUCTION, SET_WORKERS, SET_RESEARCH, CHANGE_RATES];
  if (!ANYTIME_ACTIONS.includes(action.type) && civSlot !== gameState.turn.activeCiv) {
    return 'Not your turn';
  }

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

      // Domain checks with naval transport
      const domain = UNIT_DOMAIN[unit.type] ?? 0;
      const terrain = mapBase.getTerrain(dest.gx, dest.gy);
      if (domain === 0 && terrain === 10) {
        // Land→ocean: embark only, must have transport with capacity at dest
        const srcTerrain = mapBase.getTerrain(unit.gx, unit.gy);
        if (srcTerrain === 10) return 'Use transport to move at sea';
        const err = checkTransportCapacity(gameState, dest.gx, dest.gy, unit.owner);
        if (err) return err;
      }
      if (domain === 1 && terrain !== 10) return 'Sea unit cannot enter land';

      // Check for enemy units at destination
      const hasEnemy = gameState.units.some(u =>
        u.gx === dest.gx && u.gy === dest.gy && u.owner !== unit.owner && u.gx >= 0);
      if (hasEnemy && (UNIT_ATK[unit.type] || 0) === 0) return 'Non-combat unit cannot attack';
      if (hasEnemy && domain === 0 && terrain === 10) return 'Cannot attack units at sea';

      // Non-combat units (except Diplomats/Spies) cannot enter undefended enemy cities
      if (!hasEnemy && (UNIT_ATK[unit.type] || 0) === 0) {
        const hasEnemyCity = gameState.cities.some(c =>
          c.gx === dest.gx && c.gy === dest.gy && c.owner !== unit.owner && c.owner > 0 && c.size > 0);
        if (hasEnemyCity) {
          const isDiplomatic = unit.type === 46 || unit.type === 47; // Diplomat, Spy
          if (!isDiplomatic) return 'Non-combat unit cannot enter enemy city';
        }
      }

      // Zone of Control check
      if (!hasEnemy && isZOCBlocked(unit.type, civSlot, unit.gx, unit.gy, dest.gx, dest.gy, mapBase, gameState.units)) {
        return 'Movement blocked by Zone of Control';
      }

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

      // Validate workers aren't on off-map tiles
      const parC = city.gy & 1;
      const proposedWorldTiles = [];
      for (const i of workedTiles) {
        const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
        const parT = ((city.gy + ddy) % 2 + 2) % 2;
        const tgx = city.gx + ((parC + ddx - parT) >> 1);
        const tgy = city.gy + ddy;
        const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
        if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw)
          return `Worker on out-of-bounds tile (${tgx},${tgy})`;
        proposedWorldTiles.push(`${wgx},${tgy}`);
      }

      // Validate tiles aren't already worked by another city
      const proposedSet = new Set(proposedWorldTiles);
      for (let ci = 0; ci < gameState.cities.length; ci++) {
        if (ci === cityIndex) continue;
        const oc = gameState.cities[ci];
        if (!oc || oc.size <= 0 || !oc.workedTiles) continue;
        const ocParC = oc.gy & 1;
        for (const oi of oc.workedTiles) {
          const [oddx, oddy] = CITY_RADIUS_DOUBLED[oi];
          const oParT = ((oc.gy + oddy) % 2 + 2) % 2;
          const otgx = oc.gx + ((ocParC + oddx - oParT) >> 1);
          const otgy = oc.gy + oddy;
          const owgx = mapBase.wraps ? ((otgx % mapBase.mw) + mapBase.mw) % mapBase.mw : otgx;
          if (proposedSet.has(`${owgx},${otgy}`))
            return `Tile (${owgx},${otgy}) already worked by another city`;
        }
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

      // Tech prerequisite checks
      const civTechs = gameState.civTechs?.[civSlot];
      const hasTech = (id) => id < 0 || (civTechs ? civTechs.has(id) : false);
      if (item.type === 'unit') {
        const prereq = UNIT_PREREQS[item.id] ?? -1;
        if (prereq >= 0 && !hasTech(prereq)) return 'Missing tech prerequisite';
        const obsolete = UNIT_OBSOLETE[item.id] ?? -1;
        if (obsolete >= 0 && hasTech(obsolete)) return 'Unit is obsolete';
      }
      if (item.type === 'building') {
        const prereq = IMPROVE_PREREQS[item.id] ?? -1;
        if (prereq >= 0 && !hasTech(prereq)) return 'Missing tech prerequisite';
      }
      if (item.type === 'wonder') {
        const prereq = WONDER_PREREQS[item.id - 39] ?? -1;
        if (prereq >= 0 && !hasTech(prereq)) return 'Missing tech prerequisite';
        const obsolete = WONDER_OBSOLETE[item.id - 39] ?? -1;
        if (obsolete >= 0 && hasTech(obsolete)) return 'Wonder is obsolete';
      }

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
      // Government rate limits
      const govt = getGovernment(null, gameState, civSlot);
      const maxRate = GOVT_MAX_RATE[govt] ?? 10;
      const maxSci = GOVT_MAX_SCIENCE[govt] ?? 10;
      const luxuryRate = 10 - scienceRate - taxRate;
      if (taxRate > maxRate) return `${govt}: tax max ${maxRate * 10}%`;
      if (luxuryRate > maxRate) return `${govt}: luxury max ${maxRate * 10}%`;
      if (scienceRate > maxSci) return `${govt}: science max ${maxSci * 10}%`;
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
        if (imp.railroad) return 'Already has railroad';
      }
      if (order === 'pollution') {
        const imp = mapBase.getImprovements(unit.gx, unit.gy);
        if (!imp.pollution) return 'No pollution to clean';
      }
      return null;
    }

    case REVOLUTION: {
      const { government } = action;
      if (!government) return 'Missing government';
      if (!GOVERNMENT_KEYS.includes(government)) return 'Invalid government type';
      if (government === 'anarchy') return 'Cannot choose anarchy';
      const civ = gameState.civs?.[civSlot];
      if (!civ) return 'Civ not found';
      if (civ.government === government) return 'Already that government';
      if (civ.government === 'anarchy') return 'Revolution already in progress';
      // Check tech prerequisite
      const prereq = GOVT_TECH_PREREQS[government] ?? -1;
      if (prereq >= 0) {
        const civTechs = gameState.civTechs?.[civSlot];
        if (!civTechs || !civTechs.has(prereq)) return 'Missing tech prerequisite';
      }
      return null;
    }

    case PILLAGE: {
      const unit = gameState.units[action.unitIndex];
      if (!unit) return 'Unit not found';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.gx < 0) return 'Unit is dead';
      if (UNIT_DOMAIN[unit.type] !== 0) return 'Only land units can pillage';
      const pTerrain = mapBase.getTerrain(unit.gx, unit.gy);
      if (pTerrain === 10) return 'Cannot pillage ocean';
      if (gameState.cities.some(c => c.gx === unit.gx && c.gy === unit.gy)) return 'Cannot pillage city tile';
      const pImp = mapBase.getImprovements(unit.gx, unit.gy);
      if (!pImp || (!pImp.road && !pImp.railroad && !pImp.irrigation && !pImp.mining &&
          !pImp.fortress && !pImp.airbase && !pImp.farmland)) return 'Nothing to pillage';
      return null;
    }

    case DESTROY_CITY: {
      const city = gameState.cities[action.cityIndex];
      if (!city) return 'City not found';
      if (city.owner !== civSlot) return 'Not your city';
      if (city.size <= 0) return 'City already destroyed';
      if (city.buildings?.has(1)) return 'Cannot destroy capital';
      return null;
    }

    case PROPOSE_TREATY: {
      const { targetCiv, treaty } = action;
      if (targetCiv == null || targetCiv === civSlot) return 'Invalid target';
      if (!(gameState.civsAlive & (1 << targetCiv))) return 'Target civ is dead';
      if (!haveContact(gameState, civSlot, targetCiv)) return 'No contact with target civ';
      if (!treaty || !['peace', 'ceasefire'].includes(treaty)) return 'Invalid treaty type';
      const current = getTreaty(gameState, civSlot, targetCiv);
      if (current === treaty) return `Already at ${treaty}`;
      if (current !== 'war') return 'Must be at war to propose peace';
      // Check for duplicate pending proposals
      if (gameState.treatyProposals?.some(p => p.from === civSlot && p.to === targetCiv && !p.resolved))
        return 'Proposal already pending';
      return null;
    }

    case RESPOND_TREATY: {
      const { proposalIndex, accept } = action;
      const proposal = gameState.treatyProposals?.[proposalIndex];
      if (!proposal) return 'Proposal not found';
      if (proposal.to !== civSlot) return 'Not addressed to you';
      if (proposal.resolved) return 'Already resolved';
      return null;
    }

    case DECLARE_WAR: {
      const { targetCiv: warTarget } = action;
      if (warTarget == null || warTarget === civSlot) return 'Invalid target';
      if (!(gameState.civsAlive & (1 << warTarget))) return 'Target civ is dead';
      if (!haveContact(gameState, civSlot, warTarget)) return 'No contact with target civ';
      const curTreaty = getTreaty(gameState, civSlot, warTarget);
      if (curTreaty === 'war') return 'Already at war';
      return null;
    }

    case ESTABLISH_TRADE: {
      const { unitIndex: tradeUnitIdx, cityIndex: tradeCityIdx } = action;
      const tradeUnit = gameState.units[tradeUnitIdx];
      if (!tradeUnit) return 'Unit not found';
      if (tradeUnit.owner !== civSlot) return 'Not your unit';
      if (tradeUnit.type !== 48 && tradeUnit.type !== 49) return 'Only Caravans/Freight can trade';
      if (tradeUnit.gx < 0) return 'Unit is dead';
      const tradeCity = gameState.cities[tradeCityIdx];
      if (!tradeCity) return 'City not found';
      if (tradeCity.gx !== tradeUnit.gx || tradeCity.gy !== tradeUnit.gy) return 'Must be in the city';
      // Must be different from home city
      if (tradeCityIdx === tradeUnit.homeCityId) return 'Cannot trade with home city';
      // Home city must exist
      const homeCity = gameState.cities[tradeUnit.homeCityId];
      if (!homeCity || homeCity.size <= 0) return 'Home city not found';
      // Check max 3 trade routes on home city
      if ((homeCity.tradeRoutes?.length || 0) >= 3) return 'Home city has max trade routes';
      return null;
    }

    case RENAME_CITY: {
      const city = gameState.cities[action.cityIndex];
      if (!city) return 'City not found';
      if (city.owner !== civSlot) return 'Not your city';
      if (city.size <= 0) return 'City is destroyed';
      if (!action.name || typeof action.name !== 'string') return 'Invalid name';
      if (action.name.trim().length === 0 || action.name.length > 24) return 'Name must be 1-24 characters';
      return null;
    }

    case BRIBE_UNIT: {
      const spy = gameState.units[action.unitIndex];
      if (!spy) return 'Unit not found';
      if (spy.owner !== civSlot) return 'Not your unit';
      if (spy.type !== 46 && spy.type !== 47) return 'Only Diplomats/Spies can bribe';
      if (spy.gx < 0) return 'Unit is dead';
      if (spy.movesLeft <= 0) return 'No moves left';
      const target = gameState.units[action.targetIndex];
      if (!target) return 'Target not found';
      if (target.owner === civSlot) return 'Cannot bribe own unit';
      if (target.gx < 0) return 'Target is dead';
      // Must be adjacent
      const bDir = getDirection(spy.gx, spy.gy, target.gx, target.gy, mapBase);
      if (!bDir) return 'Target not adjacent';
      // Democracy immune
      const tGovt = getGovernment(null, gameState, target.owner);
      if (tGovt === 'democracy') return 'Democratic units cannot be bribed';
      // Check cost
      const bCost = calcBribeCost(gameState, target, mapBase);
      if ((gameState.civs?.[civSlot]?.treasury || 0) < bCost) return `Costs ${bCost} gold (insufficient)`;
      return null;
    }

    case STEAL_TECH: {
      const spy = gameState.units[action.unitIndex];
      if (!spy) return 'Unit not found';
      if (spy.owner !== civSlot) return 'Not your unit';
      if (spy.type !== 46 && spy.type !== 47) return 'Only Diplomats/Spies';
      if (spy.gx < 0) return 'Unit is dead';
      if (spy.movesLeft <= 0) return 'No moves left';
      const city = gameState.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      if (!city) return 'Must be in an enemy city';
      if (city.owner === civSlot) return 'Cannot steal from own city';
      // Check there's a tech to steal
      const theirTechs = gameState.civTechs?.[city.owner];
      const myTechs = gameState.civTechs?.[civSlot];
      if (!theirTechs || !myTechs) return 'No techs available';
      let hasStealable = false;
      for (const t of theirTechs) { if (!myTechs.has(t)) { hasStealable = true; break; } }
      if (!hasStealable) return 'Nothing to steal';
      return null;
    }

    case SABOTAGE_CITY: {
      const spy = gameState.units[action.unitIndex];
      if (!spy) return 'Unit not found';
      if (spy.owner !== civSlot) return 'Not your unit';
      if (spy.type !== 46 && spy.type !== 47) return 'Only Diplomats/Spies';
      if (spy.gx < 0) return 'Unit is dead';
      if (spy.movesLeft <= 0) return 'No moves left';
      const city = gameState.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      if (!city) return 'Must be in an enemy city';
      if (city.owner === civSlot) return 'Cannot sabotage own city';
      return null;
    }

    case INCITE_REVOLT: {
      const spy = gameState.units[action.unitIndex];
      if (!spy) return 'Unit not found';
      if (spy.owner !== civSlot) return 'Not your unit';
      if (spy.type !== 46 && spy.type !== 47) return 'Only Diplomats/Spies';
      if (spy.gx < 0) return 'Unit is dead';
      if (spy.movesLeft <= 0) return 'No moves left';
      const city = gameState.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
      if (!city) return 'Must be in an enemy city';
      if (city.owner === civSlot) return 'Cannot incite own city';
      if (city.buildings?.has(1)) return 'Cannot incite capital';
      const cGovt = getGovernment(null, gameState, city.owner);
      if (cGovt === 'democracy') return 'Cannot incite democratic city';
      const iCost = calcInciteCost(gameState, city, mapBase);
      if ((gameState.civs?.[civSlot]?.treasury || 0) < iCost) return `Costs ${iCost} gold (insufficient)`;
      return null;
    }

    case DEMAND_TRIBUTE: {
      const { targetCiv, amount } = action;
      if (targetCiv == null || targetCiv === civSlot) return 'Invalid target';
      if (!(gameState.civsAlive & (1 << targetCiv))) return 'Target civ is dead';
      if (!haveContact(gameState, civSlot, targetCiv)) return 'No contact with target civ';
      if (!amount || amount < 1 || amount > 1000) return 'Invalid amount';
      if (gameState.tributeDemands?.some(d => d.from === civSlot && d.to === targetCiv && !d.resolved))
        return 'Demand already pending';
      return null;
    }

    case RESPOND_DEMAND: {
      const demand = gameState.tributeDemands?.[action.demandIndex];
      if (!demand) return 'Demand not found';
      if (demand.to !== civSlot) return 'Not addressed to you';
      if (demand.resolved) return 'Already resolved';
      if (action.accept && (gameState.civs?.[civSlot]?.treasury || 0) < demand.amount)
        return 'Insufficient gold';
      return null;
    }

    case SHARE_MAP: {
      const { targetCiv } = action;
      if (targetCiv == null || targetCiv === civSlot) return 'Invalid target';
      if (!(gameState.civsAlive & (1 << targetCiv))) return 'Target civ is dead';
      const treaty = getTreaty(gameState, civSlot, targetCiv);
      if (treaty === 'war') return 'Must be at peace to share maps';
      return null;
    }

    case BOMBARD: {
      const { unitIndex, targetGx, targetGy } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      if ((UNIT_ATK[unit.type] || 0) === 0) return 'Unit cannot attack';
      // Only air units (domain 2) and some naval can bombard
      const bDomain = UNIT_DOMAIN[unit.type] ?? 0;
      if (bDomain !== 2 && bDomain !== 1) return 'Only air and naval units can bombard';
      // Must have moves left
      if (unit.movesLeft <= 0) return 'No moves remaining';
      // Target must have enemy units or city
      const bHasTarget = gameState.units.some(u => u.gx === targetGx && u.gy === targetGy && u.owner !== civSlot && u.gx >= 0)
        || gameState.cities.some(c => c.gx === targetGx && c.gy === targetGy && c.owner !== civSlot && c.size > 0);
      if (!bHasTarget) return 'No valid target at location';
      return null;
    }

    case REBASE: {
      const { unitIndex, targetGx, targetGy } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      const rbDomain = UNIT_DOMAIN[unit.type] ?? 0;
      if (rbDomain !== 2) return 'Only air units can rebase';
      if (unit.movesLeft <= 0) return 'No moves remaining';
      // Target must be a friendly city or carrier
      const rbHasCity = gameState.cities.some(c => c.gx === targetGx && c.gy === targetGy && c.owner === civSlot && c.size > 0);
      const rbHasCarrier = gameState.units.some(u => u.gx === targetGx && u.gy === targetGy && u.owner === civSlot && u.type === 42 && u.gx >= 0);
      // Or airbase
      const rbTileIdx = targetGy * mapBase.mw + targetGx;
      const rbTile = mapBase.tileData?.[rbTileIdx];
      const rbHasAirbase = rbTile && rbTile.improvements && rbTile.improvements.airbase;
      if (!rbHasCity && !rbHasCarrier && !rbHasAirbase) return 'Must rebase to friendly city, carrier, or airbase';
      return null;
    }

    case GOTO: {
      const { unitIndex, targetGx, targetGy } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.movesLeft <= 0) return 'No moves remaining';
      if (targetGx < 0 || targetGx >= mapBase.mw || targetGy < 0 || targetGy >= mapBase.mh) return 'Target out of bounds';
      return null;
    }

    case TRANSFORM_TERRAIN: {
      const { unitIndex } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.type !== 1) return 'Only Engineers can transform terrain';
      const tfTerrain = mapBase.getTerrain(unit.gx, unit.gy);
      if (TERRAIN_TRANSFORM[tfTerrain] < 0) return 'Cannot transform this terrain';
      return null;
    }

    case NUKE: {
      const { unitIndex, targetGx, targetGy } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.type !== 45) return 'Only Nuclear Missiles can nuke';
      if (unit.movesLeft <= 0) return 'No moves remaining';
      // Manhattan Project must have been built
      const mpBuilt = gameState.wonders?.[23]?.cityIndex != null && !gameState.wonders[23].destroyed;
      if (!mpBuilt) return 'Manhattan Project has not been built';
      // Target must be within range (unit's move points)
      const nukeRange = UNIT_MOVE_POINTS[45] || 16;
      let nukeDx = Math.abs(unit.gx - targetGx);
      if (mapBase.wraps) nukeDx = Math.min(nukeDx, mapBase.mw - nukeDx);
      const nukeDy = Math.abs(unit.gy - targetGy);
      if (nukeDx + nukeDy > nukeRange) return 'Target out of range';
      return null;
    }

    case PARADROP: {
      const { unitIndex, targetGx, targetGy } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (unit.type !== 13) return 'Only Paratroopers can paradrop';
      if (unit.movesLeft <= 0) return 'No moves remaining';
      // Target must be land
      const pdTerrain = mapBase.getTerrain(targetGx, targetGy);
      if (pdTerrain === 10) return 'Cannot paradrop onto ocean';
      // Within range 10
      let pdDx = Math.abs(unit.gx - targetGx);
      if (mapBase.wraps) pdDx = Math.min(pdDx, mapBase.mw - pdDx);
      const pdDy = Math.abs(unit.gy - targetGy);
      if (pdDx + pdDy > 10) return 'Target out of range';
      // No enemy units on target
      const pdHasEnemy = gameState.units.some(u =>
        u.gx === targetGx && u.gy === targetGy && u.owner !== civSlot && u.gx >= 0);
      if (pdHasEnemy) return 'Enemy units at target';
      return null;
    }

    case AIRLIFT: {
      const { unitIndex, targetCityIndex } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      if (UNIT_DOMAIN[unit.type] !== 0) return 'Only land units can be airlifted';
      if (unit.movesLeft <= 0) return 'No moves remaining';
      // Source city: unit must be in a city with airport
      const srcCity = gameState.cities.find(c => c.gx === unit.gx && c.gy === unit.gy && c.owner === civSlot && c.size > 0);
      if (!srcCity) return 'Unit must be in a friendly city';
      if (!srcCity.buildings?.has(32)) return 'Source city needs an Airport';
      if (srcCity.airliftedThisTurn) return 'City already airlifted this turn';
      // Target city
      const tgtCity = gameState.cities[targetCityIndex];
      if (!tgtCity || tgtCity.size <= 0) return 'Target city not found';
      if (tgtCity.owner !== civSlot) return 'Target must be a friendly city';
      if (!tgtCity.buildings?.has(32)) return 'Target city needs an Airport';
      // Can't airlift to same city
      if (tgtCity.gx === unit.gx && tgtCity.gy === unit.gy) return 'Already in this city';
      return null;
    }

    case UPGRADE_UNIT: {
      const { unitIndex } = action;
      const unit = gameState.units[unitIndex];
      if (!unit || unit.gx < 0) return 'Unit does not exist';
      if (unit.owner !== civSlot) return 'Not your unit';
      // Must be in a friendly city
      const upgCity = gameState.cities.find(c => c.gx === unit.gx && c.gy === unit.gy && c.owner === civSlot && c.size > 0);
      if (!upgCity) return 'Must be in a friendly city';
      // Must have an upgrade path
      const upgTarget = UNIT_UPGRADE_TO[unit.type] ?? -1;
      if (upgTarget < 0) return 'No upgrade available';
      // Must have the obsolescence tech
      const obsTech = UNIT_OBSOLETE[unit.type] ?? -1;
      if (obsTech < 0) return 'Unit has no obsolescence tech';
      const civTechs = gameState.civTechs?.[civSlot];
      if (!civTechs || !civTechs.has(obsTech)) return 'Missing required tech';
      // Must have enough gold (cost = difference × 2, minimum 40)
      const oldCost = UNIT_COSTS[unit.type] || 0;
      const newCost = UNIT_COSTS[upgTarget] || 0;
      const upgCost = Math.max(40, (newCost - oldCost) * 2);
      const treasury = gameState.civs?.[civSlot]?.treasury || 0;
      if (treasury < upgCost) return `Costs ${upgCost} gold (insufficient)`;
      return null;
    }

    case END_TURN: {
      // Reject if any unit still needs orders (has moves left and not busy)
      const hasUnitNeedingOrders = gameState.units.some(u =>
        u.owner === civSlot && u.gx >= 0 && u.movesLeft > 0 && !BUSY_ORDERS.has(u.orders));
      if (hasUnitNeedingOrders) return 'Units still need orders';
      return null;
    }

    case 'ADJUST_ATTITUDE': {
      const { civSlot: attCiv, targetCiv: attTarget, delta } = action;
      if (attCiv == null || attTarget == null || delta == null) return 'Missing ADJUST_ATTITUDE fields';
      if (attCiv < 0 || attCiv > 7 || attTarget < 0 || attTarget > 7) return 'Invalid civ slot';
      if (attCiv === attTarget) return 'Cannot adjust attitude toward self';
      return null;
    }

    default:
      return `Unknown action type: ${action.type}`;
  }
}

/** Get treaty status between two civs. */
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

/**
 * Check if two civs have made contact (i.e. an explicit treaty entry exists).
 * Diplomacy requires prior contact — civs that have never met cannot
 * propose treaties, declare war, or demand tribute.
 */
function haveContact(gameState, civA, civB) {
  if (!gameState.treaties) return false;
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] !== undefined;
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

/**
 * Bribe cost: ((target_treasury + 750) / (distance_to_capital + 2)) * (shield_cost / 10)
 * Damaged units cost less proportionally. Settlers/Engineers cost double.
 */
export function calcBribeCost(gameState, target, mapBase) {
  const treasury = gameState.civs?.[target.owner]?.treasury || 0;
  const capital = gameState.cities.find(c => c.owner === target.owner && c.buildings?.has(1) && c.size > 0);
  let dist = 16;
  if (capital) {
    const mw2 = (mapBase.mw || 0) * 2;
    const ux = target.gx * 2 + (target.gy % 2);
    const cx = capital.gx * 2 + (capital.gy % 2);
    let dx = Math.abs(ux - cx);
    if (mapBase.wraps) dx = Math.min(dx, mw2 - dx);
    dist = dx + Math.abs(target.gy - capital.gy);
  }
  const govt = getGovernment(null, gameState, target.owner);
  if (govt === 'communism') dist = Math.min(dist, 10);
  const shieldCost = (UNIT_COSTS[target.type] || 1) * 10;
  let cost = Math.floor(((treasury + 750) / (dist + 2)) * (shieldCost / 10));
  // Settlers/Engineers: double
  if (target.type === 0 || target.type === 1) cost *= 2;
  // Damaged: proportional reduction
  const maxHp = 10; // base HP
  const curHp = Math.max(1, maxHp - (target.hpLost || 0));
  cost = Math.floor((cost / 2) * (1 + curHp / maxHp));
  return Math.max(1, cost);
}

/**
 * Incite cost: city_size * (target_treasury + 1000) / (distance_to_own_capital + 3)
 * Courthouse halves distance. Civil disorder, no garrison, originally yours: each halves cost.
 */
export function calcInciteCost(gameState, city, mapBase) {
  const treasury = gameState.civs?.[city.owner]?.treasury || 0;
  const capital = gameState.cities.find(c => c.owner === city.owner && c.buildings?.has(1) && c.size > 0);
  let dist = 32;
  if (capital) {
    const mw2 = (mapBase.mw || 0) * 2;
    const cx = city.gx * 2 + (city.gy % 2);
    const capx = capital.gx * 2 + (capital.gy % 2);
    let dx = Math.abs(cx - capx);
    if (mapBase.wraps) dx = Math.min(dx, mw2 - dx);
    dist = dx + Math.abs(city.gy - capital.gy);
  }
  const govt = getGovernment(null, gameState, city.owner);
  if (govt === 'communism') dist = Math.min(dist, 10);
  if (city.buildings?.has(7)) dist = Math.max(1, Math.floor(dist / 2)); // Courthouse
  let cost = Math.floor(city.size * (treasury + 1000) / (dist + 3));
  if (city.civilDisorder) cost = Math.floor(cost / 2);
  const hasGarrison = gameState.units.some(u => u.gx === city.gx && u.gy === city.gy && u.owner === city.owner && u.gx >= 0);
  if (!hasGarrison) cost = Math.floor(cost / 2);
  return Math.max(1, cost);
}

/** Check if a friendly transport with spare capacity exists at (gx, gy). */
function checkTransportCapacity(gameState, gx, gy, owner) {
  let totalCap = 0;
  let cargo = 0;
  for (const u of gameState.units) {
    if (u.gx !== gx || u.gy !== gy || u.owner !== owner || u.gx < 0) continue;
    if (UNIT_CARRY_CAP[u.type]) totalCap += UNIT_CARRY_CAP[u.type];
    else if (UNIT_DOMAIN[u.type] === 0) cargo++; // land unit = cargo
  }
  if (totalCap === 0) return 'No transport available';
  if (cargo >= totalCap) return 'Transport is full';
  return null;
}
