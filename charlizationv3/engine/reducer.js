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
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, UNIT_COSTS, UNIT_CARRY_CAP, UNIT_FUEL, CITY_RADIUS_DOUBLED, IMPROVE_COSTS, IMPROVE_MAINTENANCE, ADVANCE_NAMES, UNIT_NAMES, UNIT_DEF, UNIT_ATK, UNIT_DESTROYED_AFTER_ATTACK, UNIT_UPGRADE_TO, ADVANCE_EPOCH, COMMODITY_NAMES, WONDER_NAMES, GOVT_MAX_RATE, GOVT_MAX_SCIENCE, TERRAIN_NAMES } from './defs.js';
import { launchSpaceship } from './spaceship.js';
import { handleNuclearAttack, handleNuclearResponse } from './nuclear.js';
import { resolveDirection, moveCost } from './movement.js';
import { findPath, calcGotoDirection, findRoadPath } from './pathfinding.js';
import { updateVisibility } from './visibility.js';
import { getProductionCost, calcCityTrade } from './production.js';
import { calcRushBuyCost } from './happiness.js';
import { cityHasBuilding, hasWonderEffect } from './utils.js';
import { declareWar as diplomacyDeclareWar, signCeasefire, signPeaceTreaty, formAlliance, executeTransaction, applyGovernmentChangeEffects, calcTributeDemand, goldToAttitude, adjustAttitude } from './diplomacy.js';
import { grantAdvance } from './research.js';

// ── Sub-module imports ──
import { getCityName, assignInitialWorkers, radiusTileCoords, discoverContacts, killUnit, checkCivElimination, rehomeUnits, checkSenateVeto, cleanupTradeRoutes } from './reduce/helpers.js';
import { spawnBarbarianUprising } from './reduce/barbarians.js';
import { handleMoveUnit, resolveGoodyHut } from './reduce/move-unit.js';
import { handleEndTurn } from './reduce/end-turn.js';
import { handleBribeUnit, handleStealTech, handleSabotageCity, handleInciteRevolt, handleSpyPoisonWater, handleSpyPlantNuke, handleSpySabotageProduction, handleSpyInvestigateCity, handleSpyEstablishEmbassy, handleSpySabotageUnit, handleSpySubvertCity } from './reduce/espionage-actions.js';

// (#176) Max unit limits from binary
const MAX_UNITS_HARD = 2047;  // Absolute hard cap (data structure limit)
const MAX_UNITS_AI_SOFT = 1948; // AI soft cap (binary: 2047 - 99)

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
      // (#167) Scan adjacent tiles to set coastal, river, mountain flags
      {
        let isCoastal = false, hasRiver = false, hasMountain = false;
        // Check center tile for river
        const centerTile = mapBase.tileData[unit.gy * mapBase.mw + unit.gx];
        if (centerTile && centerTile.river) hasRiver = true;
        // Scan inner ring (8 adjacent tiles) in city radius
        for (let ri = 0; ri < 8; ri++) {
          const adj = radiusTileCoords(unit.gx, unit.gy, ri, mapBase);
          if (!adj) continue;
          const adjIdx = adj.gy * mapBase.mw + adj.gx;
          const adjTile = mapBase.tileData[adjIdx];
          if (!adjTile) continue;
          if (adjTile.terrain === 10) isCoastal = true;     // Ocean
          if (adjTile.terrain === 5) hasMountain = true;     // Mountains
          if (adjTile.river) hasRiver = true;
        }
        newCity.isCoastal = isCoastal;
        newCity.hasRiver = hasRiver;
        newCity.hasMountain = hasMountain;
      }

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

      // Binary FUN_0043f8b0 lines 5640-5643: ALWAYS updates visibility after founding.
      // Cities reveal a radius-2 area for the founding civ.
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, unit.owner,
        newCity.gx, newCity.gy, mapBase.wraps, 2);

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
      // Binary production switch penalty:
      // Same category (unit→unit, building→building, wonder→wonder): keep all shields.
      // Cross-category (unit↔building, unit↔wonder, building↔wonder): 50% shield loss.
      // Same item: no change.
      const prevItem = city.itemInProduction;
      const oldShields = city.shieldsInBox || 0;
      let newShields;
      if (!prevItem || (prevItem.type === item.type && prevItem.id === item.id)) {
        newShields = oldShields;
      } else if (prevItem.type === item.type) {
        // Same category: keep all shields
        newShields = oldShields;
      } else {
        // Cross-category: 50% penalty
        newShields = Math.floor(oldShields / 2);
      }
      state.cities[cityIndex] = {
        ...city,
        itemInProduction: { type: item.type, id: item.id },
        shieldsInBox: newShields,
      };

      // ── Wonder production events (block_00440000) ──
      if (!state.turnEvents) state.turnEvents = [];
      const prevIsWonder = prevItem && prevItem.type === 'wonder';
      const newIsWonder = item.type === 'wonder';
      if (prevIsWonder && newIsWonder && prevItem.id !== item.id) {
        // (#130) Switching between two wonders: epoch-based shield penalty.
        // If the new wonder is in a different epoch than the old one, apply additional penalty.
        // Binary uses ADVANCE_EPOCH of the wonder's prerequisite tech.
        const oldWonderIdx = prevItem.id - 39;
        const newWonderIdx = item.id - 39;
        let epochPenalty = false;
        if (oldWonderIdx >= 0 && newWonderIdx >= 0) {
          // Import WONDER_PREREQS indirectly through ADVANCE_EPOCH
          const oldEpoch = (oldWonderIdx < ADVANCE_EPOCH.length) ? ADVANCE_EPOCH[oldWonderIdx] : 0;
          const newEpoch = (newWonderIdx < ADVANCE_EPOCH.length) ? ADVANCE_EPOCH[newWonderIdx] : 0;
          if (oldEpoch !== newEpoch) {
            // Epoch mismatch: apply 50% penalty on top of normal cap
            const capped = state.cities[cityIndex].shieldsInBox || 0;
            state.cities[cityIndex] = {
              ...state.cities[cityIndex],
              shieldsInBox: Math.floor(capped / 2),
            };
            epochPenalty = true;
          }
        }
        state.turnEvents.push({
          type: 'wonderSwitched', civSlot,
          cityName: city.name, cityIndex,
          oldWonderId: prevItem.id, oldWonderName: WONDER_NAMES[prevItem.id - 39] || `Wonder ${prevItem.id}`,
          newWonderId: item.id, newWonderName: WONDER_NAMES[item.id - 39] || `Wonder ${item.id}`,
          epochPenalty,
        });
      } else if (newIsWonder && !prevIsWonder) {
        // Switching TO a wonder from non-wonder
        state.turnEvents.push({
          type: 'wonderStarted', civSlot,
          cityName: city.name, cityIndex,
          wonderId: item.id, wonderName: WONDER_NAMES[item.id - 39] || `Wonder ${item.id}`,
        });
      } else if (prevIsWonder && !newIsWonder) {
        // Switching FROM a wonder to non-wonder
        state.turnEvents.push({
          type: 'wonderAbandoned', civSlot,
          cityName: city.name, cityIndex,
          wonderId: prevItem.id, wonderName: WONDER_NAMES[prevItem.id - 39] || `Wonder ${prevItem.id}`,
        });
      }
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

      // Refund: full shield cost in gold (binary FUN_00505d3d gives full cost)
      const refund = IMPROVE_COSTS[buildingId] || 0;
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
        // (#120) Auto-clamp rates on government change
        _autoClampRates(civ, government);
        state.civs[civSlot] = civ;
        // Apply government change side effects (Fanatics production switch, embassy clearing)
        applyGovernmentChangeEffects(state, civSlot, oldGovt, government);
      } else {
        civ.government = 'anarchy';
        // Binary: 1-4 random turns of anarchy (matches Civ2 MGE behavior)
        civ.anarchyTurns = 1 + state.rng.nextInt(4);
        civ.pendingGovernment = government;
        // (#120) Auto-clamp rates for anarchy too
        _autoClampRates(civ, 'anarchy');
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
      // #166: Trade route cleanup — remove routes pointing to this city from ALL other cities
      cleanupTradeRoutes(state, razeCi);

      // ── Wonder clearing (block_00440000 delete_city): mark wonders in this city as destroyed ──
      if (state.wonders) {
        state.wonders = [...state.wonders];
        for (let wi = 0; wi < state.wonders.length; wi++) {
          const w = state.wonders[wi];
          if (w && w.cityIndex === razeCi && !w.destroyed) {
            state.wonders[wi] = { ...w, cityIndex: null, destroyed: true };
          }
        }
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

      // ── Binary-faithful one-time trade revenue formula (block_00440000) ──
      // Distance: Manhattan distance between home and dest
      let etDx = Math.abs(homeCity.gx - destCity.gx);
      if (mapBase.wraps && etDx > mapBase.mw / 2) etDx = mapBase.mw - etDx;
      const etDy = Math.abs(homeCity.gy - destCity.gy);
      const etDist = etDx + etDy;

      // Base trade for each city (gross trade arrows)
      const homeTrade = calcCityTrade(homeCity, etUnit.homeCityId, state, mapBase).grossTrade || 1;
      const destTrade = calcCityTrade(destCity, etCi, state, mapBase).grossTrade || 1;

      // Binary formula: revenue = (homeTrade + destTrade) * (distance + 10) / 24
      // D10: Difficulty modifier on trade distance (binary DAT_00655af0)
      let adjDist = etDist;
      const diffFlags = state.difficultyFlags || 0;
      if (diffFlags & 4) adjDist = Math.floor(adjDist * 4 / 5);   // easier: reduce distance
      if (diffFlags & 8) adjDist = Math.floor(adjDist * 5 / 4);   // harder: increase distance
      let revenue = Math.floor((homeTrade + destTrade) * (adjDist + 10) / 24);

      // Intercontinental bonus: if different continent (bodyId), revenue *= 2
      if (mapBase.getBodyId) {
        const homeBody = mapBase.getBodyId(homeCity.gx, homeCity.gy);
        const destBody = mapBase.getBodyId(destCity.gx, destCity.gy);
        if (homeBody !== destBody) revenue *= 2;
      }

      // Same owner penalty: if same civ, revenue /= 2
      if (homeCity.owner === destCity.owner) {
        revenue = Math.floor(revenue / 2);
      }

      // D11: Railroad/Airport trade distance bonus (binary FUN_00440750)
      // Binary checks tile improvements for Railroad (0x20) and Airport (0x19)
      {
        let distFactor = 0;
        const homeImp = mapBase.getImprovements ? mapBase.getImprovements(homeCity.gx, homeCity.gy) : null;
        const destImp = mapBase.getImprovements ? mapBase.getImprovements(destCity.gx, destCity.gy) : null;
        const homeRR = !!(homeImp && homeImp.railroad);
        const destRR = !!(destImp && destImp.railroad);
        if (homeRR && destRR) {
          if (mapBase.getBodyId) {
            const hb = mapBase.getBodyId(homeCity.gx, homeCity.gy);
            const db = mapBase.getBodyId(destCity.gx, destCity.gy);
            distFactor += (hb === db) ? 1 : 2; // same continent +1, different +2
          } else {
            distFactor += 1;
          }
        }
        // Airport adds +1 each
        if (homeCity.buildings?.has(25)) distFactor += 1; // Airport building
        if (destCity.buildings?.has(25)) distFactor += 1;
        if (distFactor > 0) {
          revenue += (distFactor * revenue) >> 1;
        }
      }

      // Commodity-based modifiers
      const commodity = etUnit.commodityCarried ?? -1;
      let demandMatch = false;
      if (commodity >= 0 && commodity < COMMODITY_NAMES.length) {
        // Check if commodity matches dest city's demand list
        if (destCity.demandList && destCity.demandList.includes(commodity)) demandMatch = true;
      }

      // Commodity demand bonus tiers (binary ref: block_00440000)
      //   commodities 3,5,8,10 = +50%
      //   commodities 9,11,12,13 = +100%
      //   commodity 14 = +150%
      //   commodity 15 = +200%
      const COMMODITY_TIER_50  = new Set([3, 5, 8, 10]);   // Cloth, Coal, Wine, Silk
      const COMMODITY_TIER_100 = new Set([9, 11, 12, 13]); // Silk(9 overlap?), Spice, Gems, Gold
      let commodityBonus = 0;
      if (commodity === 15)                       commodityBonus = Math.floor(revenue * 2);     // +200%
      else if (commodity === 14)                  commodityBonus = Math.floor(revenue * 3 / 2); // +150%
      else if (COMMODITY_TIER_100.has(commodity))  commodityBonus = revenue;                     // +100%
      else if (COMMODITY_TIER_50.has(commodity))   commodityBonus = Math.floor(revenue / 2);     // +50%

      // Demand slot match: if dest demands this commodity, revenue doubles (+ commodity bonus)
      // D18: Owner-dependent formula variant from binary FUN_00440750
      if (demandMatch) {
        if (homeCity.owner === destCity.owner) {
          revenue = revenue * 2 + commodityBonus;  // same owner: double then add bonus
        } else {
          revenue = (revenue + commodityBonus) * 2; // diff owner: add bonus then double
        }
      } else {
        revenue = revenue + commodityBonus;
      }

      // Minimum revenue: 1
      revenue = Math.max(1, revenue);

      // D.6: Food caravan special case — deliver food instead of gold
      // if commodity is Hides(0)/Wool(1)/Beads(2) (food commodities) and
      // dest city has Harbour(30) or Granary(3)
      const foodCommodities = new Set([0, 1, 2]); // approximation: low-value = food
      const isFood = foodCommodities.has(commodity) &&
        (cityHasBuilding(destCity, 30) || cityHasBuilding(destCity, 3));

      // ── 3-slot trade route limit with replacement (block_00440000) ──
      const existingRoutes = homeCity.tradeRoutes || [];
      const route = { destCityIndex: etCi, commodity };
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const updHome = { ...state.cities[etUnit.homeCityId] };

      if (existingRoutes.length >= 3) {
        // Find lowest-value existing route for comparison
        let lowestVal = Infinity;
        let lowestIdx = -1;
        for (let ri = 0; ri < existingRoutes.length; ri++) {
          const er = existingRoutes[ri];
          const erDest = state.cities[er.destCityIndex];
          if (!erDest || erDest.size <= 0) {
            // Dead route — always replaceable
            lowestVal = 0;
            lowestIdx = ri;
            break;
          }
          // D16: Binary route value formula — distance weighted by continent/owner
          let erDx = Math.abs(homeCity.gx - erDest.gx);
          if (mapBase.wraps && erDx > mapBase.mw / 2) erDx = mapBase.mw - erDx;
          const erDy = Math.abs(homeCity.gy - erDest.gy);
          let erVal = erDx + erDy;
          // Same continent: halve value
          if (mapBase.getBodyId) {
            const hb = mapBase.getBodyId(homeCity.gx, homeCity.gy);
            const db = mapBase.getBodyId(erDest.gx, erDest.gy);
            if (hb === db) erVal = Math.trunc(erVal / 2);
          }
          // Same owner: halve value
          if (homeCity.owner === erDest.owner) erVal = Math.trunc(erVal / 2);
          if (erVal < lowestVal) { lowestVal = erVal; lowestIdx = ri; }
        }

        // D16: New route value using same formula
        let newVal = etDist;
        if (mapBase.getBodyId) {
          const hb = mapBase.getBodyId(homeCity.gx, homeCity.gy);
          const db = mapBase.getBodyId(destCity.gx, destCity.gy);
          if (hb === db) newVal = Math.trunc(newVal / 2);
        }
        if (homeCity.owner === destCity.owner) newVal = Math.trunc(newVal / 2);
        if (newVal > lowestVal && lowestIdx >= 0) {
          // Replace lowest-value route
          const newRoutes = [...existingRoutes];
          newRoutes[lowestIdx] = route;
          updHome.tradeRoutes = newRoutes;
        } else {
          // All existing routes are more valuable — reject
          // Still consume unit and give one-time bonus, but no ongoing route
          updHome.tradeRoutes = [...existingRoutes];
        }
      } else {
        updHome.tradeRoutes = [...existingRoutes, route];
      }
      state.cities[etUnit.homeCityId] = updHome;

      // Consume the caravan/freight
      killUnit(state, etUi);

      // Freight bonus: Freight units (type 49) receive double one-time trade revenue
      // compared to Caravans (type 48). Binary ref: block_00440000 applies ×2 for Freight.
      if (etUnit.type === 49) {
        revenue *= 2;
      }

      // D12: Pre-200AD revenue doubling if civ lacks both Alphabet(38) and Writing(57)
      const gameYear = state.turn?.year ?? 0;
      const civTechs = state.civTechs?.[civSlot];
      if (gameYear < 200 && civTechs && !civTechs.has(38) && !civTechs.has(57)) {
        revenue *= 2;
      }

      // D13: Communism tech -33% penalty on trade revenue
      if (civTechs?.has(67)) revenue -= Math.floor(revenue / 3);

      // D14: Democracy tech -33% penalty on trade revenue
      if (civTechs?.has(30)) revenue -= Math.floor(revenue / 3);

      // ── Revenue: binary adds FULL amount to BOTH treasury AND research ──
      const goldShare = revenue;
      const sciShare = revenue;

      if (!state.turnEvents) state.turnEvents = [];

      if (isFood) {
        // Food delivery: add food to destination city
        const updDest = { ...state.cities[etCi] };
        updDest.foodInBox = (updDest.foodInBox || 0) + revenue * 2; // convert gold to food equivalent
        state.cities[etCi] = updDest;
        state.turnEvents.push({
          type: 'tradeEstablished', civSlot,
          homeCityName: homeCity.name, destCityName: destCity.name,
          foodDelivered: revenue * 2, commodity,
          revenue, goldShare, sciShare,
        });
      } else {
        // Gold + research split
        if (state.civs?.[civSlot]) {
          state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
          const civ = { ...state.civs[civSlot] };
          civ.treasury = (civ.treasury || 0) + goldShare;
          // Add science share to research progress
          civ.researchProgress = (civ.researchProgress || 0) + sciShare;
          state.civs[civSlot] = civ;
        }
        state.turnEvents.push({
          type: 'tradeEstablished', civSlot,
          homeCityName: homeCity.name, destCityName: destCity.name,
          bonus: revenue, commodity,
          revenue, goldShare, sciShare,
        });
      }

      // ── D9: Diplomatic effect: adjust attitude in BOTH directions by -10 ──
      // Binary FUN_00440750: calls adjustAttitude for both (destOwner→homeOwner) AND (homeOwner→destOwner)
      if (homeCity.owner !== destCity.owner) {
        state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
        const destOwner = destCity.owner;
        // Destination owner's attitude toward trade partner improves
        if (state.civs[destOwner]) {
          const updDestCiv = { ...state.civs[destOwner] };
          const oldAtt = updDestCiv.attitudes;
          const attitudes = Array.isArray(oldAtt) ? [...oldAtt] : [0, 0, 0, 0, 0, 0, 0, 0];
          if (!Array.isArray(oldAtt) && oldAtt) {
            for (const [k, v] of Object.entries(oldAtt)) attitudes[+k] = v;
          }
          attitudes[civSlot] = Math.max(-100, Math.min(100, (attitudes[civSlot] || 0) - 10));
          updDestCiv.attitudes = attitudes;
          state.civs[destOwner] = updDestCiv;
        }
        // Home owner's attitude toward dest owner also improves
        if (state.civs[civSlot]) {
          const updHomeCiv = { ...state.civs[civSlot] };
          const oldAtt2 = updHomeCiv.attitudes;
          const attitudes2 = Array.isArray(oldAtt2) ? [...oldAtt2] : [0, 0, 0, 0, 0, 0, 0, 0];
          if (!Array.isArray(oldAtt2) && oldAtt2) {
            for (const [k, v] of Object.entries(oldAtt2)) attitudes2[+k] = v;
          }
          attitudes2[destOwner] = Math.max(-100, Math.min(100, (attitudes2[destOwner] || 0) - 10));
          updHomeCiv.attitudes = attitudes2;
          state.civs[civSlot] = updHomeCiv;
        }
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
      // New binary-faithful flow (FUN_0045705e + FUN_00460129:308-377):
      //   - If `accept` is set, the player has already viewed the AI's offer
      //     and chosen accept (true) or refuse (false). Resolve immediately.
      //   - If `accept` is undefined, fall back to the legacy pending-demand
      //     flow used by AI-initiated demands (RESPOND_DEMAND completes it).
      if (action.accept === true) {
        // Validate amount matches what the AI is willing to pay (server-side
        // recompute prevents client tampering).
        const offer = calcTributeDemand(state, action.targetCiv, civSlot);
        const requested = action.amount ?? 0;
        // Allow tolerance of 0 — exact match required
        const amount = offer.willingness === 'pay'
          ? Math.min(requested, offer.amount)
          : 0;
        if (amount > 0) {
          state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
          const payer = { ...state.civs[action.targetCiv] };
          payer.treasury = Math.max(0, (payer.treasury || 0) - amount);
          state.civs[action.targetCiv] = payer;
          const receiver = { ...state.civs[civSlot] };
          receiver.treasury = (receiver.treasury || 0) + amount;
          state.civs[civSlot] = receiver;
          // Attitude: AI feels better toward us for receiving the gold
          // (binary line 369-370: FUN_00456f20(receiver, payer, -goldToAttitude(amount)))
          const attDelta = goldToAttitude(amount);
          adjustAttitude(state, action.targetCiv, civSlot, +attDelta);
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'tributePaid',
            from: action.targetCiv,
            to: civSlot,
            amount,
          });
        }
      } else if (action.accept === false) {
        // Player viewed the AI's offer and refused. Insulted; minor attitude
        // hit (the binary doesn't transfer gold or take stronger action,
        // since the player simply walked away from a free gift).
        adjustAttitude(state, action.targetCiv, civSlot, -5);
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'tributeRefused',
          from: action.targetCiv,
          to: civSlot,
        });
      } else if (action.provoked === true) {
        // The demand provoked the AI into war (binary FUN_00460129:497-517).
        // The AI is the aggressor, NOT the player — declare war with the
        // arguments flipped so the warDeclared event correctly attributes
        // the aggressor.
        const warResult = diplomacyDeclareWar(state, mapBase, action.targetCiv, civSlot);
        if (warResult && warResult.events) {
          if (!state.turnEvents) state.turnEvents = [];
          for (const evt of warResult.events) state.turnEvents.push(evt);
        }
      } else {
        // Legacy flow: create pending demand for AI-initiated DEMAND_TRIBUTE.
        if (!state.tributeDemands) state.tributeDemands = [];
        state.tributeDemands = [...state.tributeDemands, {
          from: civSlot, to: action.targetCiv, amount: action.amount,
          resolved: false, turn: state.turn.number,
        }];
      }
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

        // #139: LONGMOVE counter — prevent infinite goto loops after 47 moves
        const gtPrevCounter = gtCur.longMoveCounter || 0;
        let gtIncrement = 1;
        if (gtCur.lastMoveDir) {
          const gtOppDirs = { N: "S", S: "N", E: "W", W: "E", NE: "SW", SW: "NE", NW: "SE", SE: "NW" };
          if (gtOppDirs[gtDir] === gtCur.lastMoveDir) gtIncrement += 0x0f;
        }
        const gtNewCounter = gtPrevCounter + gtIncrement;
        if (gtNewCounter > 0x2f) { // LONGMOVE_THRESHOLD = 47
          gtCur = { ...gtCur, orders: "none", goToX: undefined, goToY: undefined, longMoveCounter: 0 };
          state.units[gtUi] = gtCur;
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({ type: "longMoveCancel", unitIndex: gtUi, unitType: gtCur.type, civSlot, gx: gtCur.gx, gy: gtCur.gy });
          break;
        }
        gtCur = { ...gtCur, longMoveCounter: gtNewCounter, lastMoveDir: gtDir };

        const gtDest = resolveDirection(gtCur.gx, gtCur.gy, gtDir, mapBase);
        if (!gtDest) {
          // #141: Clear goto on failed move
          gtCur = { ...gtCur, orders: "none", goToX: undefined, goToY: undefined };
          state.units[gtUi] = gtCur;
          break;
        }

        // Check for any foreign unit at destination — cancel goto (binary: cancel_goto_if_blocked)
        const gtHasForeign = state.units.some(u =>
          u.gx === gtDest.gx && u.gy === gtDest.gy && u.gx >= 0 &&
          u.owner !== civSlot && u.owner !== 0
        );
        if (gtHasForeign) {
          gtCur = { ...gtCur, orders: 'none', goToX: undefined, goToY: undefined };
          state.units[gtUi] = gtCur;
          break;
        }

        const gtCost = moveCost(gtCur.type, mapBase, gtCur.gx, gtCur.gy, gtDest.gx, gtDest.gy);
        if (gtCost < 0) {
          // #141: Clear goto on failed move
          gtCur = { ...gtCur, orders: "none", goToX: undefined, goToY: undefined };
          state.units[gtUi] = gtCur;
          break;
        }

        // Probabilistic movement check for goto steps (same rule as single-step movement)
        const gtDomain = UNIT_DOMAIN[gtCur.type] ?? 0;
        if (gtDomain === 0 && gtCost > 1 && gtCur.movesLeft < gtCost) {
          const gtTotalMP = (UNIT_MOVE_POINTS[gtCur.type] || 1) * MOVEMENT_MULTIPLIER;
          if (gtCur.movesLeft < gtTotalMP) {
            const gtRoll = state.rng.nextInt(gtCost);
            if (gtCur.movesLeft <= gtRoll) {
              // #141: Clear goto on failed probabilistic move
              gtCur = { ...gtCur, movesLeft: 0, orders: "none", goToX: undefined, goToY: undefined };
              state.units[gtUi] = gtCur;
              break;
            }
          }
        }

        gtCur = { ...gtCur, gx: gtDest.gx, gy: gtDest.gy, x: gtDest.gx * 2 + (gtDest.gy % 2), y: gtDest.gy, movesLeft: Math.max(0, gtCur.movesLeft - gtCost) };
        state.units[gtUi] = gtCur;

        // Update visibility
        if (mapBase.tileData) {
          updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, gtDest.gx, gtDest.gy, mapBase.wraps);
          discoverContacts(state, mapBase, civSlot, gtDest.gx, gtDest.gy, 1);
        }

        // Check goody hut — only land units (domain 0) trigger huts (#66)
        const gtTileIdx = gtDest.gy * mapBase.mw + gtDest.gx;
        const gtTile = mapBase.tileData?.[gtTileIdx];
        if (gtTile && gtTile.goodyHut && civSlot > 0 && (UNIT_DOMAIN[gtCur.type] ?? 0) === 0) {
          gtTile.goodyHut = false;
          const hutResult = resolveGoodyHut(state, mapBase, gtCur, civSlot);
          if (hutResult) state.goodyHutResult = { ...hutResult, civSlot };
          break; // stop on goody hut
        }

        // Reached destination?
        if (gtDest.gx === gtTgx && gtDest.gy === gtTgy) {
          state.units[gtUi] = { ...state.units[gtUi], orders: 'none', goToX: undefined, goToY: undefined, longMoveCounter: 0 };
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
      // ── Nuclear attack (B.5) — delegated to nuclear.js ──
      const { unitIndex: nukeUi, targetGx: nukeTgx, targetGy: nukeTgy } = action;
      if (!state.turnEvents) state.turnEvents = [];

      // Ensure cities array is cloned before nuclear.js mutates it
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];

      // Destroy the missile unit regardless of interception
      killUnit(state, nukeUi);

      // SDI check, 9-tile destruction, fallout, diplomacy flags
      const nukeResult = handleNuclearAttack(state, mapBase, civSlot, nukeTgx, nukeTgy);
      for (const evt of nukeResult.events) state.turnEvents.push(evt);

      if (!nukeResult.intercepted) {
        // AI nuclear response (retaliation missiles + ground unit rally)
        const responseResult = handleNuclearResponse(state, mapBase, nukeTgx, nukeTgy, civSlot);
        for (const evt of responseResult.events) state.turnEvents.push(evt);

        // Check eliminations for all affected civs
        for (const affectedCiv of nukeResult.affectedCivs) {
          checkCivElimination(state, affectedCiv);
        }
      }
      break;
    }

    case PARADROP: {
      const { unitIndex: pdUi, targetGx: pdTgx, targetGy: pdTgy } = action;
      const pdUnit = { ...state.units[pdUi] };

      // ── #116: Paradrop treaty check — prompt war declaration if landing near allied city ──
      // Binary FUN_004ca39e: check if target is near a city belonging to an allied/peaceful civ.
      // If so, this constitutes a hostile act requiring war declaration.
      let pdTreatyBlocker = null;
      for (const pdCity of state.cities) {
        if (!pdCity || pdCity.size <= 0 || pdCity.owner === civSlot || pdCity.owner === 0) continue;
        let pdDx = Math.abs(pdCity.gx - pdTgx);
        if (mapBase.wraps) pdDx = Math.min(pdDx, mapBase.mw - pdDx);
        const pdDy = Math.abs(pdCity.gy - pdTgy);
        if (pdDx + pdDy > 3) continue; // not "near" (within 3 manhattan tiles)
        // Check if we have a non-war treaty with this city's owner
        const pdCityOwner = pdCity.owner;
        const pdWarKey = civSlot < pdCityOwner ? `${civSlot}-${pdCityOwner}` : `${pdCityOwner}-${civSlot}`;
        const pdTreaty = state.treaties?.[pdWarKey];
        if (pdTreaty && pdTreaty !== 'war') {
          pdTreatyBlocker = { ownerCiv: pdCityOwner, cityName: pdCity.name, treaty: pdTreaty };
          break;
        }
      }
      if (pdTreatyBlocker && !action.confirmWarDeclaration) {
        // Signal that client needs to prompt for war declaration
        state.paradropTreatyPrompt = {
          unitIndex: pdUi, targetGx: pdTgx, targetGy: pdTgy,
          ...pdTreatyBlocker,
        };
        break; // don't execute paradrop until confirmed
      }
      if (pdTreatyBlocker && action.confirmWarDeclaration) {
        // Player confirmed — declare war
        const pdDeclareResult = diplomacyDeclareWar(state, mapBase, civSlot, pdTreatyBlocker.ownerCiv);
        if (!state.turnEvents) state.turnEvents = [];
        for (const evt of pdDeclareResult.events) state.turnEvents.push(evt);
      }

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
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];

      // (#122) Enforce one-airlift-per-turn-per-city for BOTH source and destination
      const alSrcCi = state.cities.findIndex(c => c.gx === alUnit.gx && c.gy === alUnit.gy && c.owner === civSlot && c.size > 0);
      if (alSrcCi >= 0 && state.cities[alSrcCi].airliftedThisTurn) {
        break; // source city already airlifted this turn
      }
      if (state.cities[alTci].airliftedThisTurn) {
        break; // destination city already airlifted this turn
      }

      // Mark both source and destination cities as having airlifted
      if (alSrcCi >= 0) {
        state.cities[alSrcCi] = { ...state.cities[alSrcCi], airliftedThisTurn: true };
      }
      state.cities[alTci] = { ...state.cities[alTci], airliftedThisTurn: true };

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
      const { transaction } = action;
      if (transaction) {
        const result = executeTransaction(state, mapBase, transaction);
        if (result.events?.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...result.events);
        }
      }
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

/**
 * (#176) Check if a new unit can be created, enforcing the hard cap (2047)
 * and AI soft cap (1948).
 * @param {object} state - game state
 * @param {number} ownerCiv - civ slot of the unit's owner
 * @returns {boolean} true if a new unit is allowed
 */
export function canCreateUnit(state, ownerCiv) {
  // Count living units
  let count = 0;
  for (const u of state.units) {
    if (u.gx >= 0) count++;
  }
  if (count >= MAX_UNITS_HARD) return false;
  // AI soft cap
  const isHuman = !!(state.humanPlayers & (1 << ownerCiv));
  if (!isHuman && count >= MAX_UNITS_AI_SOFT) return false;
  return true;
}

/**
 * (#120) Auto-clamp tax/science/luxury rates when government changes.
 * Binary auto-adjusts rates to fit within the new government's limits
 * rather than rejecting the change.
 * @param {object} civ - mutable civ object
 * @param {string} newGovt - new government name (lowercase)
 */
function _autoClampRates(civ, newGovt) {
  const maxRate = GOVT_MAX_RATE[newGovt] ?? 10;
  const maxSci = GOVT_MAX_SCIENCE[newGovt] ?? 10;

  let sci = civ.scienceRate || 0;
  let tax = civ.taxRate || 0;

  // Clamp science rate
  if (sci > maxSci) sci = maxSci;
  // Clamp tax rate
  if (tax > maxRate) tax = maxRate;
  // If total exceeds 10, reduce tax first, then science
  if (sci + tax > 10) {
    tax = 10 - sci;
    if (tax < 0) { tax = 0; sci = 10; }
  }

  civ.scienceRate = sci;
  civ.taxRate = tax;
  civ.luxuryRate = 10 - sci - tax;
}
