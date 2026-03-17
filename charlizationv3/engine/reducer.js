// ═══════════════════════════════════════════════════════════════════
// reducer.js — Authoritative state transitions (shared: server + client)
//
// The ONLY code that mutates game state. The server calls
// applyAction(gameState, mapBase, action) for every validated action.
// Returns a new state object if valid, or the same reference if rejected.
//
// Never mutates the input state directly — clones first.
// ═══════════════════════════════════════════════════════════════════

import { validateAction, calcBribeCost, calcInciteCost } from './rules.js';
import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, CHANGE_RATES, SET_RESEARCH, UNIT_ORDER, WORKER_ORDER, REVOLUTION, PILLAGE, DESTROY_CITY, PROPOSE_TREATY, RESPOND_TREATY, DECLARE_WAR, ESTABLISH_TRADE, RENAME_CITY, BRIBE_UNIT, STEAL_TECH, SABOTAGE_CITY, INCITE_REVOLT, DEMAND_TRIBUTE, RESPOND_DEMAND, SHARE_MAP, BOMBARD, REBASE, GOTO, TRANSFORM_TERRAIN, NUKE, PARADROP, AIRLIFT, UPGRADE_UNIT, ADJUST_ATTITUDE, SPY_POISON_WATER, SPY_PLANT_NUKE, SPY_SABOTAGE_PRODUCTION, SPY_INVESTIGATE_CITY, SPY_ESTABLISH_EMBASSY, SPY_SABOTAGE_UNIT, SPY_SUBVERT_CITY, LAUNCH_SPACESHIP, EXECUTE_TRADE, CARAVAN_HELP_WONDER } from './actions.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, UNIT_COSTS, UNIT_CARRY_CAP, UNIT_FUEL, CITY_RADIUS_DOUBLED, IMPROVE_COSTS, IMPROVE_MAINTENANCE, ADVANCE_NAMES, UNIT_NAMES, UNIT_DEF, UNIT_ATK, UNIT_DESTROYED_AFTER_ATTACK, UNIT_UPGRADE_TO, ADVANCE_EPOCH, COMMODITY_NAMES } from './defs.js';
import { launchSpaceship } from './spaceship.js';
import { resolveDirection, moveCost } from './movement.js';
import { findPath, calcGotoDirection, findRoadPath } from './pathfinding.js';
import { updateVisibility } from './visibility.js';
import { getProductionCost, calcCityTrade } from './production.js';
import { calcRushBuyCost } from './happiness.js';
import { cityHasBuilding, hasWonderEffect } from './utils.js';
import { declareWar as diplomacyDeclareWar, signCeasefire, signPeaceTreaty, formAlliance, executeTransaction, applyGovernmentChangeEffects } from './diplomacy.js';
import { grantAdvance } from './research.js';

// ── Sub-module imports ──
import { getCityName, assignInitialWorkers, radiusTileCoords, discoverContacts, killUnit, checkCivElimination, rehomeUnits, checkSenateVeto } from './reduce/helpers.js';
import { spawnBarbarianUprising } from './reduce/barbarians.js';
import { handleMoveUnit, resolveGoodyHut } from './reduce/move-unit.js';
import { handleEndTurn } from './reduce/end-turn.js';
import { handleBribeUnit, handleStealTech, handleSabotageCity, handleInciteRevolt, handleSpyPoisonWater, handleSpyPlantNuke, handleSpySabotageProduction, handleSpyInvestigateCity, handleSpyEstablishEmbassy, handleSpySabotageUnit, handleSpySubvertCity } from './reduce/espionage-actions.js';

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
      handleMoveUnit(state, prev, mapBase, action, civSlot);
      break;
    }

    case BUILD_CITY: {
      const { unitIndex, name: requestedName } = action;
      const unit = state.units[unitIndex];

      // Create city at settler's position
      const isFirstCity = prev.cities.filter(c => c.owner === unit.owner).length === 0;
      const buildings = new Set();
      if (isFirstCity) buildings.add(1); // Palace
      const cityName = (requestedName && requestedName.trim()) || getCityName(unit.owner, prev.cities, prev.civs);
      const newCity = {
        name: cityName,
        owner: unit.owner,
        originalOwner: unit.owner,
        size: 1,
        gx: unit.gx, gy: unit.gy,
        cx: unit.gx * 2 + (unit.gy % 2), cy: unit.gy,
        hasWalls: false, hasPalace: isFirstCity,
        civilDisorder: false, weLoveKingDay: false, isOccupied: false,
        workedTiles: [],
        specialists: [],
        buildings,
        foodInBox: 0, shieldsInBox: 0,
        itemInProduction: { type: 'unit', id: 2 }, // default: Warriors
      };
      state.cities = [...prev.cities, newCity];
      const newCityIndex = state.cities.length - 1;

      // Compute initial worker placement using full yield calculation
      newCity.workedTiles = assignInitialWorkers(
        unit.gx, unit.gy, 1, newCity, newCityIndex, state, mapBase
      );

      // Remove settler (mark as dead)
      state.units[unitIndex] = { ...unit, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };

      // Mark tile as city (road/railroad connectivity + renderer needs this)
      const cityTileIdx = newCity.gy * mapBase.mw + newCity.gx;
      if (mapBase.tileData[cityTileIdx]) {
        mapBase.tileData[cityTileIdx].improvements = {
          ...mapBase.tileData[cityTileIdx].improvements,
          city: true, road: true,
        };
        // Set tile ownership to founding civ
        mapBase.tileData[cityTileIdx].tileOwnership = unit.owner;
      }

      // Set tile ownership for city radius tiles
      for (let ri = 0; ri < 20; ri++) {
        const rpos = radiusTileCoords(newCity.gx, newCity.gy, ri, mapBase);
        if (!rpos) continue;
        const rTileIdx = rpos.gy * mapBase.mw + rpos.gx;
        const rTile = mapBase.tileData[rTileIdx];
        if (!rTile) continue;
        // Only claim unclaimed tiles (tileOwnership 0 or 0x0F means unclaimed)
        if (rTile.tileOwnership === 0 || rTile.tileOwnership === 0x0F) {
          rTile.tileOwnership = unit.owner;
        }
      }

      // Update visibility with city radius (cities have radius 2)
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, newCity.gx, newCity.gy, mapBase.wraps, 2);
      // Check for first contact with other civs now visible from the new city
      discoverContacts(state, mapBase, civSlot, newCity.gx, newCity.gy, 2);

      // Notify client
      state.cityFounded = { name: newCity.name, cityIndex: newCityIndex, civSlot };

      break;
    }

    case SET_WORKERS: {
      const { cityIndex, workedTiles, specialists } = action;
      state.cities = [...prev.cities];
      state.cities[cityIndex] = {
        ...state.cities[cityIndex],
        workedTiles: [...workedTiles],
        specialists: [...specialists],
      };
      break;
    }

    case CHANGE_PRODUCTION: {
      const { cityIndex, item } = action;
      state.cities = [...prev.cities];
      const city = state.cities[cityIndex];
      // D.7: Civ2 production change penalty (ported from binary):
      //  - Same item (same type + same id): no penalty
      //  - Same category (unit→unit, building→building, wonder→wonder): 50% shield loss
      //  - Cross-category (unit↔building/wonder): 100% shield loss (all shields)
      const prevItem = city.itemInProduction;
      const oldShields = city.shieldsInBox || 0;
      let newShields;
      if (!prevItem || (prevItem.type === item.type && prevItem.id === item.id)) {
        // No previous production or switching to same item — no penalty
        newShields = oldShields;
      } else if (prevItem.type === item.type) {
        // Same category, different item — 50% penalty
        newShields = Math.floor(oldShields / 2);
      } else {
        // Cross-category switch — 100% penalty (lose all shields)
        newShields = 0;
      }
      state.cities[cityIndex] = {
        ...city,
        itemInProduction: { type: item.type, id: item.id },
        shieldsInBox: newShields,
      };
      break;
    }

    case RUSH_BUY: {
      const { cityIndex } = action;
      state.cities = [...prev.cities];
      const city = state.cities[cityIndex];
      const item = city.itemInProduction;
      const totalCost = getProductionCost(item);
      const buyCost = calcRushBuyCost(item.type, totalCost, city.shieldsInBox || 0);

      // Deduct gold
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.treasury -= buyCost;
      state.civs[civSlot] = civ;

      // Complete production immediately
      state.cities[cityIndex] = { ...city, shieldsInBox: totalCost };
      break;
    }

    case SELL_BUILDING: {
      const { cityIndex, buildingId } = action;
      state.cities = [...prev.cities];
      const city = state.cities[cityIndex];

      // Remove building
      const newBuildings = new Set(city.buildings);
      newBuildings.delete(buildingId);

      // Refund: half shield cost in gold (binary returns cost / 2)
      const refund = Math.floor((IMPROVE_COSTS[buildingId] || 0) / 2);
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.treasury = (civ.treasury || 0) + refund;
      state.civs[civSlot] = civ;

      state.cities[cityIndex] = {
        ...city,
        buildings: newBuildings,
        soldThisTurn: true,
        hasWalls: newBuildings.has(8),
        hasPalace: newBuildings.has(1),
      };
      break;
    }

    case CHANGE_RATES: {
      const { scienceRate, taxRate } = action;
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.scienceRate = scienceRate;
      civ.taxRate = taxRate;
      civ.luxuryRate = 10 - scienceRate - taxRate;
      state.civs[civSlot] = civ;
      break;
    }

    case SET_RESEARCH: {
      const { advanceId } = action;
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      civ.techBeingResearched = advanceId;
      state.civs[civSlot] = civ;
      break;
    }

    case UNIT_ORDER: {
      const { unitIndex, order } = action;
      const unit = { ...state.units[unitIndex] };

      if (order === 'disband') {
        // Remove unit
        unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;
      } else if (order === 'fortify') {
        // Takes 1 turn to fortify — set to 'fortifying', END_TURN will promote to 'fortified'
        unit.orders = 'fortifying';
        unit.movesLeft = 0;
      } else if (order === 'sentry') {
        unit.orders = 'sentry';
        unit.movesLeft = 0;
      } else if (order === 'sleep') {
        unit.orders = 'sleep';
        unit.movesLeft = 0;
      } else if (order === 'skip') {
        // Skip: end this unit's turn but don't change orders
        unit.movesLeft = 0;
      } else if (order === 'wake') {
        // Wake: clear all orders, cancel any work in progress
        unit.orders = 'none';
        unit.workTurns = 0;
      }

      state.units[unitIndex] = unit;
      break;
    }

    case WORKER_ORDER: {
      const { unitIndex, order } = action;
      const unit = { ...state.units[unitIndex] };

      // Begin the work order — progress tracked by workTurns, completed in END_TURN
      unit.orders = order;
      unit.workTurns = 0;
      unit.movesLeft = 0;

      state.units[unitIndex] = unit;
      break;
    }

    case REVOLUTION: {
      const { government } = action;
      state.civs = [...prev.civs];
      const civ = { ...state.civs[civSlot] };
      const oldGovt = civ.government;
      if (hasWonderEffect(state, civSlot, 19)) {
        // Statue of Liberty: instant government switch, no anarchy
        civ.government = government;
        state.civs[civSlot] = civ;
        // Apply government change side effects (Fanatics production switch, embassy clearing)
        applyGovernmentChangeEffects(state, civSlot, oldGovt, government);
      } else {
        civ.government = 'anarchy';
        // Binary: 1-4 random turns of anarchy (matches Civ2 MGE behavior)
        civ.anarchyTurns = 1 + state.rng.nextInt(4);
        civ.pendingGovernment = government;
        state.civs[civSlot] = civ;
      }
      break;
    }

    case PILLAGE: {
      const { unitIndex: pillUi } = action;
      const pillUnit = state.units[pillUi];
      const pillIdx = pillUnit.gy * mapBase.mw + pillUnit.gx;
      const pillTile = mapBase.tileData[pillIdx];
      if (pillTile) {
        const imp = { ...pillTile.improvements };
        // Destroy highest-value improvement
        if (imp.railroad) imp.railroad = false;
        else if (imp.fortress) imp.fortress = false;
        else if (imp.airbase) imp.airbase = false;
        else if (imp.farmland) { imp.farmland = false; imp.mining = false; }
        else if (imp.mining) imp.mining = false;
        else if (imp.irrigation) imp.irrigation = false;
        else if (imp.road) imp.road = false;
        pillTile.improvements = imp;
      }
      break;
    }

    case DESTROY_CITY: {
      const { cityIndex: razeCi } = action;
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const razeCity = state.cities[razeCi];
      // Kill all units homed here
      rehomeUnits(state, razeCi, civSlot);
      // Clear city tile
      const razeTileIdx = razeCity.gy * mapBase.mw + razeCity.gx;
      if (mapBase.tileData[razeTileIdx]) {
        mapBase.tileData[razeTileIdx].improvements = {
          ...mapBase.tileData[razeTileIdx].improvements, city: false,
        };
        // Clear tile ownership on city tile
        mapBase.tileData[razeTileIdx].tileOwnership = 0;
      }
      // Clear tile ownership in city radius (only tiles not claimed by another of our cities)
      for (let ri = 0; ri < 20; ri++) {
        const rpos = radiusTileCoords(razeCity.gx, razeCity.gy, ri, mapBase);
        if (!rpos) continue;
        const rTileIdx = rpos.gy * mapBase.mw + rpos.gx;
        const rTile = mapBase.tileData[rTileIdx];
        if (!rTile || rTile.tileOwnership !== razeCity.owner) continue;
        // Check if any other city of this owner claims this tile
        const otherClaims = state.cities.some((c, ci) =>
          ci !== razeCi && c.owner === razeCity.owner && c.size > 0 &&
          CITY_RADIUS_DOUBLED.some(([ddx, ddy]) => {
            const parC = c.gy & 1;
            const parT = ((c.gy + ddy) % 2 + 2) % 2;
            const tgx = c.gx + ((parC + ddx - parT) >> 1);
            const tgy = c.gy + ddy;
            const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
            return wgx === rpos.gx && tgy === rpos.gy;
          })
        );
        if (!otherClaims) rTile.tileOwnership = 0;
      }
      state.cities[razeCi] = { ...razeCity, size: 0, owner: -1 };
      checkCivElimination(state, civSlot);
      break;
    }

    case PROPOSE_TREATY: {
      const { targetCiv: ptTarget, treaty: ptType } = action;
      if (!state.treatyProposals) state.treatyProposals = [];
      state.treatyProposals = [...state.treatyProposals, {
        from: civSlot, to: ptTarget, treaty: ptType, resolved: false,
        turn: state.turn.number,
      }];
      break;
    }

    case RESPOND_TREATY: {
      const { proposalIndex: rtIdx, accept: rtAccept } = action;
      state.treatyProposals = [...(prev.treatyProposals || [])];
      const proposal = { ...state.treatyProposals[rtIdx], resolved: true, accepted: rtAccept };
      state.treatyProposals[rtIdx] = proposal;
      if (rtAccept) {
        let rtResult;
        switch (proposal.treaty) {
          case 'ceasefire':
            rtResult = signCeasefire(state, proposal.from, proposal.to);
            break;
          case 'peace':
            rtResult = signPeaceTreaty(state, proposal.from, proposal.to);
            break;
          case 'alliance':
            rtResult = formAlliance(state, mapBase, proposal.from, proposal.to);
            break;
          default:
            // Fallback: just set the treaty directly
            if (!state.treaties) state.treaties = {};
            const rtKey = proposal.from < proposal.to
              ? `${proposal.from}-${proposal.to}` : `${proposal.to}-${proposal.from}`;
            state.treaties = { ...state.treaties, [rtKey]: proposal.treaty };
            break;
        }
        if (!state.turnEvents) state.turnEvents = [];
        if (rtResult) {
          for (const evt of rtResult.events) {
            state.turnEvents.push(evt);
          }
        }
        state.turnEvents.push({
          type: 'treatyAccepted', civA: proposal.from, civB: proposal.to,
          treaty: proposal.treaty,
        });
      }
      break;
    }

    case DECLARE_WAR: {
      const { targetCiv: dwTarget } = action;

      // F.2: Senate war veto — Republic/Democracy senate can block war declarations
      const senateCheck = checkSenateVeto(state, mapBase, civSlot, dwTarget);
      if (!state.turnEvents) state.turnEvents = [];
      for (const evt of senateCheck.events) {
        state.turnEvents.push(evt);
      }
      if (senateCheck.blocked) break;

      const dwResult = diplomacyDeclareWar(state, mapBase, civSlot, dwTarget);
      for (const evt of dwResult.events) {
        state.turnEvents.push(evt);
      }
      break;
    }

    case ESTABLISH_TRADE: {
      const { unitIndex: etUi, cityIndex: etCi } = action;
      const etUnit = state.units[etUi];
      const homeCity = state.cities[etUnit.homeCityId];
      const destCity = state.cities[etCi];

      // D.8: If destination city is own city building a wonder, deliver shields instead
      if (destCity.owner === civSlot && destCity.itemInProduction?.type === 'wonder') {
        // Binary uses the unit's actual shield cost, not a fixed 50
        const helpShields = UNIT_COSTS[etUnit.type] || 50;
        state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
        const updDest = { ...state.cities[etCi] };
        updDest.shieldsInBox = (updDest.shieldsInBox || 0) + helpShields;
        state.cities[etCi] = updDest;
        killUnit(state, etUi);
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'caravanHelpWonder', civSlot,
          cityName: destCity.name, cityIndex: etCi,
          shieldsAdded: helpShields,
        });
        break;
      }

      // Domestic trade requires road connection (Civ2 rule)
      const etIsForeignTrade = homeCity.owner !== destCity.owner;
      if (!etIsForeignTrade) {
        const roadPath = findRoadPath(homeCity.gx, homeCity.gy, destCity.gx, destCity.gy, mapBase);
        if (!roadPath) break; // no road connection — reject
      }

      // D.6: Full commodity matching one-time bonus formula
      // Distance calculation
      let etDx = Math.abs(homeCity.gx - destCity.gx);
      if (mapBase.wraps && etDx > mapBase.mw / 2) etDx = mapBase.mw - etDx;
      const etDy = Math.abs(homeCity.gy - destCity.gy);
      const etDist = etDx + etDy;

      // Supply/demand matching
      const commodity = etUnit.commodityCarried ?? -1;
      let supplyMatch = false;
      let demandMatch = false;
      if (commodity >= 0 && commodity < COMMODITY_NAMES.length) {
        // Check if commodity is in home city's supply list
        if (homeCity.supplyList && homeCity.supplyList.includes(commodity)) supplyMatch = true;
        else supplyMatch = true; // assume supply if no list (city built it)
        // Check if commodity is in dest city's demand list
        if (destCity.demandList && destCity.demandList.includes(commodity)) demandMatch = true;
      }

      // Base one-time bonus: (supply + demand) × distanceFactor × eraFactor
      // supply/demand each contribute the distance to the bonus
      const supplyVal = supplyMatch ? etDist : Math.floor(etDist / 2);
      const demandVal = demandMatch ? etDist : Math.floor(etDist / 2);

      // Era factor based on civ's most advanced tech epoch
      // Pre-Industrial (epoch 0,1) = ×2, Industrial (epoch 2) = ×1.5, Modern (epoch 3) = ×1
      let maxEpoch = 0;
      if (state.civTechs?.[civSlot]) {
        for (const techId of state.civTechs[civSlot]) {
          const ep = ADVANCE_EPOCH[techId] ?? 0;
          if (ep > maxEpoch) maxEpoch = ep;
        }
      }
      let eraFactor = 2; // pre-industrial default
      if (maxEpoch >= 3) eraFactor = 1;
      else if (maxEpoch >= 2) eraFactor = 1.5;

      const isForeign = homeCity.owner !== destCity.owner;
      let bonus = Math.floor((supplyVal + demandVal) * eraFactor);
      // Foreign trade: ×2
      if (isForeign) bonus *= 2;
      // Minimum bonus: 1 gold
      bonus = Math.max(1, bonus);

      // D.6: Food caravan special case — deliver food instead of gold
      // if commodity is Hides(0)/Wool(1)/Beads(2) (food commodities) and
      // dest city has Harbour(30) or Granary(3)
      const foodCommodities = new Set([0, 1, 2]); // approximation: low-value = food
      const isFood = foodCommodities.has(commodity) &&
        (cityHasBuilding(destCity, 30) || cityHasBuilding(destCity, 3));

      // Create ongoing trade route (D.5)
      const route = { destCityIndex: etCi, commodity };
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const updHome = { ...state.cities[etUnit.homeCityId] };
      updHome.tradeRoutes = [...(updHome.tradeRoutes || []), route];
      state.cities[etUnit.homeCityId] = updHome;

      // Consume the caravan/freight
      killUnit(state, etUi);

      // Apply one-time bonus
      if (isFood) {
        // Food delivery: add food to destination city
        const updDest = { ...state.cities[etCi] };
        updDest.foodInBox = (updDest.foodInBox || 0) + bonus * 2; // convert gold to food equivalent
        state.cities[etCi] = updDest;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'tradeEstablished', civSlot,
          homeCityName: homeCity.name, destCityName: destCity.name,
          foodDelivered: bonus * 2, commodity,
        });
      } else {
        // Gold bonus
        if (state.civs?.[civSlot]) {
          state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
          const civ = { ...state.civs[civSlot] };
          civ.treasury = (civ.treasury || 0) + bonus;
          state.civs[civSlot] = civ;
        }
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'tradeEstablished', civSlot,
          homeCityName: homeCity.name, destCityName: destCity.name,
          bonus, commodity,
        });
      }
      break;
    }

    case RENAME_CITY: {
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      state.cities[action.cityIndex] = { ...state.cities[action.cityIndex], name: action.name.trim() };
      break;
    }

    case BRIBE_UNIT: {
      handleBribeUnit(state, prev, mapBase, action, civSlot);
      break;
    }

    case STEAL_TECH: {
      handleStealTech(state, prev, mapBase, action, civSlot);
      break;
    }

    case SABOTAGE_CITY: {
      handleSabotageCity(state, prev, mapBase, action, civSlot);
      break;
    }

    case INCITE_REVOLT: {
      handleInciteRevolt(state, prev, mapBase, action, civSlot);
      break;
    }

    case SPY_POISON_WATER: {
      handleSpyPoisonWater(state, prev, mapBase, action, civSlot);
      break;
    }

    case SPY_PLANT_NUKE: {
      handleSpyPlantNuke(state, prev, mapBase, action, civSlot);
      break;
    }

    case SPY_SABOTAGE_PRODUCTION: {
      handleSpySabotageProduction(state, prev, mapBase, action, civSlot);
      break;
    }

    case SPY_INVESTIGATE_CITY: {
      handleSpyInvestigateCity(state, prev, mapBase, action, civSlot);
      break;
    }

    case SPY_ESTABLISH_EMBASSY: {
      handleSpyEstablishEmbassy(state, prev, mapBase, action, civSlot);
      break;
    }

    case SPY_SABOTAGE_UNIT: {
      handleSpySabotageUnit(state, prev, mapBase, action, civSlot);
      break;
    }

    case SPY_SUBVERT_CITY: {
      handleSpySubvertCity(state, prev, mapBase, action, civSlot);
      break;
    }

    case DEMAND_TRIBUTE: {
      if (!state.tributeDemands) state.tributeDemands = [];
      state.tributeDemands = [...state.tributeDemands, {
        from: civSlot, to: action.targetCiv, amount: action.amount,
        resolved: false, turn: state.turn.number,
      }];
      break;
    }

    case RESPOND_DEMAND: {
      state.tributeDemands = [...(prev.tributeDemands || [])];
      const demand = { ...state.tributeDemands[action.demandIndex], resolved: true, accepted: action.accept };
      state.tributeDemands[action.demandIndex] = demand;
      if (action.accept) {
        state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
        // Deduct from target, add to demander
        const payer = { ...state.civs[civSlot] };
        payer.treasury = (payer.treasury || 0) - demand.amount;
        state.civs[civSlot] = payer;
        const receiver = { ...state.civs[demand.from] };
        receiver.treasury = (receiver.treasury || 0) + demand.amount;
        state.civs[demand.from] = receiver;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({ type: 'tributePaid', from: civSlot, to: demand.from, amount: demand.amount });
      }
      break;
    }

    case SHARE_MAP: {
      // Mutual map exchange: OR exploration bits for both civs
      if (mapBase.tileData) {
        const myBit = 1 << civSlot;
        const theirBit = 1 << action.targetCiv;
        for (const tile of mapBase.tileData) {
          if (!tile) continue;
          const vis = tile.visibility ?? 0;
          const myExplored = vis & myBit;
          const theirExplored = vis & theirBit;
          if (myExplored && !theirExplored) tile.visibility = vis | theirBit;
          if (theirExplored && !myExplored) tile.visibility = vis | myBit;
        }
      }
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'mapShared', civSlot, targetCiv: action.targetCiv });
      break;
    }

    case BOMBARD: {
      const { unitIndex: bmbUi, targetGx: bmbTgx, targetGy: bmbTgy } = action;
      const bmbUnit = state.units[bmbUi];
      // Find best defender at target
      const bmbDefenders = state.units.filter(u => u.gx === bmbTgx && u.gy === bmbTgy && u.owner !== civSlot && u.gx >= 0);
      if (bmbDefenders.length > 0) {
        // Bombardment does 2 HP damage to strongest defender (no risk to attacker)
        const bmbBestDef = bmbDefenders.reduce((a, b) => (UNIT_DEF[b.type] || 0) > (UNIT_DEF[a.type] || 0) ? b : a);
        const bmbDi = state.units.indexOf(bmbBestDef);
        if (bmbDi >= 0) {
          const bmbMaxHp = (UNIT_HP[bmbBestDef.type] || 1);
          const bmbNewHpLost = Math.min(bmbMaxHp, (bmbBestDef.movesRemain || 0) + 2);
          state.units[bmbDi] = { ...bmbBestDef, movesRemain: bmbNewHpLost };
          if (bmbNewHpLost >= bmbMaxHp) {
            state.units[bmbDi].gx = -1; // kill
          }
        }
      }
      // Use all movement (air units expend their turn)
      state.units[bmbUi] = { ...bmbUnit, movesLeft: 0 };
      // Missiles: destroyed after attack
      if (UNIT_DESTROYED_AFTER_ATTACK.has(bmbUnit.type)) {
        state.units[bmbUi].gx = -1;
        state.units[bmbUi].gy = -1;
        state.units[bmbUi].x = -1;
        state.units[bmbUi].y = -1;
      }
      state.combatResult = { type: 'bombard', attacker: bmbUnit.type, targetGx: bmbTgx, targetGy: bmbTgy };
      break;
    }

    case REBASE: {
      const { unitIndex: rbUi, targetGx: rbTgx, targetGy: rbTgy } = action;
      const rbUnit = state.units[rbUi];
      const rbNewUnit = { ...rbUnit, gx: rbTgx, gy: rbTgy, x: rbTgx * 2 + (rbTgy % 2), y: rbTgy, movesLeft: 0 };
      // Refuel at destination
      const rbMaxFuel = UNIT_FUEL[rbUnit.type];
      if (rbMaxFuel > 0) {
        rbNewUnit.fuelRemaining = rbMaxFuel;
      }
      state.units[rbUi] = rbNewUnit;
      break;
    }

    case GOTO: {
      const { unitIndex: gtUi, targetGx: gtTgx, targetGy: gtTgy, path: gtPath } = action;
      const gtUnit = state.units[gtUi];
      if (!gtPath || gtPath.length === 0) break;

      // Set goto destination on unit
      state.units[gtUi] = { ...gtUnit, goToX: gtTgx, goToY: gtTgy, orders: 'goto' };

      // Execute as many steps as possible this turn
      let gtCur = state.units[gtUi];
      for (const gtDir of gtPath) {
        if (gtCur.movesLeft <= 0) break;
        if (gtCur.gx < 0) break; // dead

        const gtDest = resolveDirection(gtCur.gx, gtCur.gy, gtDir, mapBase);
        if (!gtDest) break;

        // Check for enemies at destination (stop before combat)
        const gtHasEnemy = state.units.some(u => u.gx === gtDest.gx && u.gy === gtDest.gy && u.owner !== civSlot && u.gx >= 0 && (UNIT_ATK[u.type] || 0) > 0);
        if (gtHasEnemy) break;

        const gtCost = moveCost(gtCur.type, mapBase, gtCur.gx, gtCur.gy, gtDest.gx, gtDest.gy);
        if (gtCost < 0) break;

        // Probabilistic movement check for goto steps (same rule as single-step movement)
        const gtDomain = UNIT_DOMAIN[gtCur.type] ?? 0;
        if (gtDomain === 0 && gtCost > 1 && gtCur.movesLeft < gtCost) {
          const gtTotalMP = (UNIT_MOVE_POINTS[gtCur.type] || 1) * MOVEMENT_MULTIPLIER;
          if (gtCur.movesLeft < gtTotalMP) {
            const gtRoll = state.rng.nextInt(gtCost);
            if (gtCur.movesLeft <= gtRoll) {
              gtCur = { ...gtCur, movesLeft: 0 };
              state.units[gtUi] = gtCur;
              break;
            }
          }
        }

        const gtActualCost = Math.max(gtCost, 1);
        gtCur = { ...gtCur, gx: gtDest.gx, gy: gtDest.gy, x: gtDest.gx * 2 + (gtDest.gy % 2), y: gtDest.gy, movesLeft: Math.max(0, gtCur.movesLeft - gtActualCost) };
        state.units[gtUi] = gtCur;

        // Update visibility
        if (mapBase.tileData) {
          updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, gtDest.gx, gtDest.gy, mapBase.wraps);
          discoverContacts(state, mapBase, civSlot, gtDest.gx, gtDest.gy, 1);
        }

        // Check goody hut
        const gtTileIdx = gtDest.gy * mapBase.mw + gtDest.gx;
        const gtTile = mapBase.tileData?.[gtTileIdx];
        if (gtTile && gtTile.goodyHut && civSlot > 0) {
          gtTile.goodyHut = false;
          const hutResult = resolveGoodyHut(state, mapBase, gtCur, civSlot);
          if (hutResult) state.goodyHutResult = { ...hutResult, civSlot };
          break; // stop on goody hut
        }

        // Reached destination?
        if (gtDest.gx === gtTgx && gtDest.gy === gtTgy) {
          state.units[gtUi] = { ...state.units[gtUi], orders: 'none', goToX: undefined, goToY: undefined };
          break;
        }
      }
      break;
    }

    case TRANSFORM_TERRAIN: {
      const { unitIndex: tfUi } = action;
      const tfUnit = state.units[tfUi];
      state.units[tfUi] = { ...tfUnit, orders: 'transform', turnsWorked: 0, movesLeft: 0 };
      break;
    }

    case NUKE: {
      // ── Enhanced NUKE action (B.5) ──
      // Ported from decompiled FUN_0057f9e3 (handle_nuke_attack, 1236 bytes)
      const { unitIndex: nukeUi, targetGx: nukeTgx, targetGy: nukeTgy } = action;
      if (!state.turnEvents) state.turnEvents = [];

      // ── SDI Defense interception check ──
      // Any city within distance 4 of target with SDI Defense (building 17)
      // owned by a different civ can intercept the nuke.
      let sdiIntercepted = false;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const sdiCity = state.cities[ci];
        if (sdiCity.size <= 0 || sdiCity.owner === civSlot) continue;
        if (!(sdiCity.buildings && sdiCity.buildings.has(17))) continue; // SDI Defense = building 17
        let ddx = Math.abs(sdiCity.gx - nukeTgx);
        if (mapBase.wraps) ddx = Math.min(ddx, mapBase.mw - ddx);
        const ddy = Math.abs(sdiCity.gy - nukeTgy);
        const dist = ddx + ddy;
        if (dist < 4) {
          sdiIntercepted = true;
          state.turnEvents.push({
            type: 'nukeIntercepted', civSlot, targetGx: nukeTgx, targetGy: nukeTgy,
            interceptorCiv: sdiCity.owner, interceptorCity: sdiCity.name,
          });
          break;
        }
      }

      // Destroy the missile unit regardless of interception
      killUnit(state, nukeUi);

      if (sdiIntercepted) {
        // Nuke intercepted — no damage, but missile is consumed
        break;
      }

      // ── 3x3 area of effect: collect all 9 tiles ──
      const nukeTiles = [{ gx: nukeTgx, gy: nukeTgy }];
      const nukeDirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      for (const nd of nukeDirs) {
        const nDest = resolveDirection(nukeTgx, nukeTgy, nd, mapBase);
        if (nDest) nukeTiles.push(nDest);
      }

      // ── Destroy all units on all 9 tiles ──
      const affectedCivs = new Set();
      for (const nt of nukeTiles) {
        for (let i = 0; i < state.units.length; i++) {
          const u = state.units[i];
          if (u.gx === nt.gx && u.gy === nt.gy && u.gx >= 0) {
            // Track affected civs for diplomatic consequences
            if (u.owner !== civSlot && u.owner > 0) {
              affectedCivs.add(u.owner);
            }
            killUnit(state, i);
          }
        }
      }

      // ── City effects: halve population, destroy ~50% buildings ──
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      for (const nt of nukeTiles) {
        for (let ci = 0; ci < state.cities.length; ci++) {
          const c = state.cities[ci];
          if (c.gx !== nt.gx || c.gy !== nt.gy || c.size <= 0) continue;

          const newSize = Math.max(1, Math.floor(c.size / 2));
          // Destroy ~50% of buildings (seeded PRNG for determinism)
          let nukeBuildings = new Set(c.buildings);
          const buildingList = [...nukeBuildings];
          let nukeSeed = ((nt.gx * 31 + nt.gy * 17 + ci * 13 + (state.turn?.number || 0)) & 0x7FFFFFFF) || 1;
          const nukeRand = () => { nukeSeed = (nukeSeed * 1103515245 + 12345) & 0x7FFFFFFF; return nukeSeed; };
          for (const bid of buildingList) {
            // Wonders (building >= 39) are never destroyed by nukes
            if (bid >= 39) continue;
            if (nukeRand() % 2 === 0) nukeBuildings.delete(bid);
          }

          const newWorked = c.workedTiles && c.workedTiles.length > newSize
            ? c.workedTiles.slice(0, newSize) : (c.workedTiles || []);
          state.cities[ci] = {
            ...c, size: newSize, workedTiles: newWorked,
            buildings: nukeBuildings,
            hasWalls: nukeBuildings.has(8),
            hasPalace: nukeBuildings.has(1),
          };

          // Track affected civ
          if (c.owner !== civSlot && c.owner > 0) {
            affectedCivs.add(c.owner);
          }
        }
      }

      // ── Set pollution on all 9 tiles ──
      for (const nt of nukeTiles) {
        const nIdx = nt.gy * mapBase.mw + nt.gx;
        const tile = mapBase.tileData[nIdx];
        if (!tile) continue;
        if (tile.terrain !== 10) {
          tile.improvements = { ...tile.improvements, pollution: true };
        }
      }

      // ── Diplomatic consequences: all affected civs gain max hostility ──
      // From pseudocode: treaty flags 0x110 (attacked + nuke victim) and 0x20000 (we_nuked_them)
      for (const affectedCiv of affectedCivs) {
        state.turnEvents.push({
          type: 'nukeVictim', attacker: civSlot, victim: affectedCiv,
        });
      }

      // ── Check eliminations for affected civs ──
      for (const affectedCiv of affectedCivs) {
        checkCivElimination(state, affectedCiv);
      }

      state.turnEvents.push({ type: 'nuclearStrike', civSlot, targetGx: nukeTgx, targetGy: nukeTgy });
      break;
    }

    case PARADROP: {
      const { unitIndex: pdUi, targetGx: pdTgx, targetGy: pdTgy } = action;
      const pdUnit = { ...state.units[pdUi] };
      pdUnit.gx = pdTgx;
      pdUnit.gy = pdTgy;
      pdUnit.x = pdTgx * 2 + (pdTgy % 2);
      pdUnit.y = pdTgy;
      pdUnit.movesLeft = 0;
      state.units[pdUi] = pdUnit;
      // Update visibility
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, pdTgx, pdTgy, mapBase.wraps);
      discoverContacts(state, mapBase, civSlot, pdTgx, pdTgy, 1);
      break;
    }

    case AIRLIFT: {
      const { unitIndex: alUi, targetCityIndex: alTci } = action;
      const alUnit = { ...state.units[alUi] };
      const alTargetCity = state.cities[alTci];
      // Mark source city as having airlifted
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const alSrcCi = state.cities.findIndex(c => c.gx === alUnit.gx && c.gy === alUnit.gy && c.owner === civSlot && c.size > 0);
      if (alSrcCi >= 0) {
        state.cities[alSrcCi] = { ...state.cities[alSrcCi], airliftedThisTurn: true };
      }
      // Move unit to target city
      alUnit.gx = alTargetCity.gx;
      alUnit.gy = alTargetCity.gy;
      alUnit.x = alTargetCity.gx * 2 + (alTargetCity.gy % 2);
      alUnit.y = alTargetCity.gy;
      alUnit.movesLeft = 0;
      state.units[alUi] = alUnit;
      // Update visibility
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, alUnit.gx, alUnit.gy, mapBase.wraps);
      discoverContacts(state, mapBase, civSlot, alUnit.gx, alUnit.gy, 1);
      break;
    }

    case UPGRADE_UNIT: {
      const { unitIndex: upgUi } = action;
      const upgUnit = { ...state.units[upgUi] };
      const upgOldType = upgUnit.type;
      const upgTarget = UNIT_UPGRADE_TO[upgOldType];
      const oldCost = UNIT_COSTS[upgOldType] || 0;
      const newCost = UNIT_COSTS[upgTarget] || 0;
      const upgCost = Math.max(40, (newCost - oldCost) * 2);
      // Deduct gold
      state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
      const upgCiv = { ...state.civs[civSlot] };
      upgCiv.treasury = (upgCiv.treasury || 0) - upgCost;
      state.civs[civSlot] = upgCiv;
      // Upgrade the unit: change type, reset HP, keep veteran status
      upgUnit.type = upgTarget;
      upgUnit.movesRemain = 0;
      upgUnit.movesLeft = 0; // uses the turn
      state.units[upgUi] = upgUnit;
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'unitUpgraded', civSlot, oldType: upgOldType, newType: upgTarget, cost: upgCost });
      break;
    }

    case ADJUST_ATTITUDE: {
      // AI diplomacy attitude adjustment — update civ's attitude toward another civ
      const { civSlot: attCiv, targetCiv: attTarget, delta: attDelta } = action;
      if (state.civs?.[attCiv]) {
        state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
        const updCiv = { ...state.civs[attCiv] };
        const oldAtt = updCiv.attitudes;
        const attitudes = Array.isArray(oldAtt) ? [...oldAtt] : [0, 0, 0, 0, 0, 0, 0, 0];
        if (!Array.isArray(oldAtt) && oldAtt) {
          // Merge object-style attitudes into array
          for (const [k, v] of Object.entries(oldAtt)) attitudes[+k] = v;
        }
        attitudes[attTarget] = Math.max(-100, Math.min(100, (attitudes[attTarget] || 0) + attDelta));
        updCiv.attitudes = attitudes;
        state.civs[attCiv] = updCiv;
      }
      break;
    }

    case END_TURN: {
      handleEndTurn(state, prev, mapBase, action, civSlot);
      break;
    }

    case LAUNCH_SPACESHIP: {
      // Wire launchSpaceship from spaceship.js
      const lsEvents = launchSpaceship(state, civSlot);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push(...lsEvents);
      break;
    }

    case EXECUTE_TRADE: {
      // Wire executeTransaction from diplomacy.js
      const { fromCiv, toCiv, transaction } = action;
      executeTransaction(state, fromCiv, toCiv, transaction);
      break;
    }

    case CARAVAN_HELP_WONDER: {
      // D.8: Caravan/Freight at a city building a wonder donates shields equal to unit's build cost
      const { unitIndex: helpUi, cityIndex: helpCi } = action;
      const helpShields = UNIT_COSTS[state.units[helpUi].type] || 50;
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const helpCity = { ...state.cities[helpCi] };
      helpCity.shieldsInBox = (helpCity.shieldsInBox || 0) + helpShields;
      state.cities[helpCi] = helpCity;
      // Consume the caravan/freight
      killUnit(state, helpUi);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'caravanHelpWonder', civSlot,
        cityName: helpCity.name, cityIndex: helpCi,
        shieldsAdded: helpShields,
      });
      break;
    }

    default:
      return prev;
  }

  state.version = (prev.version || 0) + 1;
  return state;
}
