// ═══════════════════════════════════════════════════════════════════
// reduce/end-turn.js — END_TURN action handler
// ═══════════════════════════════════════════════════════════════════

import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_HP, UNIT_FUEL, UNIT_ATK, ADVANCE_NAMES, IMPROVE_COSTS, IMPROVE_MAINTENANCE, ROAD_TURNS, IRRIGATION_TURNS, MINING_TURNS, FORTRESS_TURNS, AIRBASE_TURNS, POLLUTION_TURNS, TERRAIN_TRANSFORM, TRANSFORM_TURNS, UNIT_NO_LIGHTHOUSE_BONUS } from '../defs.js';
import { resolveDirection, moveCost, calcEffectiveMovementPoints, checkTriremeSinking } from '../movement.js';
import { calcGotoDirection } from '../pathfinding.js';
import { updateVisibility } from '../visibility.js';
import { calcCityTrade } from '../production.js';
import { cityHasBuilding, hasWonderEffect } from '../utils.js';
import { calcResearchCost, grantAdvance, handleTechDiscovery, upgradeUnitsForTech } from '../research.js';
import { checkGameEndConditions, recalcSpaceshipStats } from '../spaceship.js';
import { processCityTurn } from '../cityturn.js';
import { processDiplomacyTimers } from '../diplomacy.js';
import { dispatchEvents, EVENT_TURN, EVENT_RECEIVED_TECH, EVENT_TURN_INTERVAL, EVENT_RANDOM_TURN } from '../events.js';
import { completeWorkerOrder, autoAssignWorker, removeWorstWorker, discoverContacts, killUnit, checkCivElimination, findFirstAliveCiv } from './helpers.js';
import { processBarbarianAI, processBarbCampProduction, spawnBarbarians } from './barbarians.js';
// resolveGoodyHut is defined in move-unit.js but is also used in GOTO continuation within END_TURN.
// We need the same function. Rather than exporting the local function from move-unit.js (which
// would create a circular-ish dependency), we inline the goody-hut logic imported from move-unit.
// Actually, resolveGoodyHut is called via the GOTO continuation in END_TURN. We need to import it.
// Since it's a private function in move-unit.js, we must either export it or duplicate.
// The simplest correct approach: export resolveGoodyHut from move-unit.js.
import { resolveGoodyHut } from './move-unit.js';

/**
 * Handle the END_TURN action.
 * @param {object} state - mutable clone of game state
 * @param {object} prev - previous immutable state
 * @param {object} mapBase - immutable map data
 * @param {object} action - { type: END_TURN }
 * @param {number} civSlot - acting player's civ slot
 */
export function handleEndTurn(state, prev, mapBase, action, civSlot) {
  const endingCiv = state.turn.activeCiv;

  // ── Advance to next civ FIRST ──
  let next = endingCiv;
  let turnNumber = state.turn.number;
  for (let i = 0; i < 7; i++) {
    next = (next % 7) + 1;
    if (state.civsAlive & (1 << next)) break;
  }
  const firstAlive = findFirstAliveCiv(state.civsAlive);
  if (next <= endingCiv || next === firstAlive) {
    turnNumber++;
  }

  // ── Barbarian AI movement phase (runs once per full turn cycle) ──
  if (turnNumber > state.turn.number) {
    processBarbarianAI(state, prev, mapBase);
    processBarbCampProduction(state, mapBase);
  }

  state.turn = { activeCiv: next, number: turnNumber };

  // ── Begin-of-turn processing for the NEW active civ ──
  const activeCiv = next;

  // Reset movement for the new active civ's units + promote fortifying→fortified
  // C.1: Use calcEffectiveMovementPoints for damage-based MP reduction
  // Sea unit movement bonuses (Raw C FUN_005b2a39):
  //   Lighthouse (wonder 3): +1x MP_PER_TURN, but NOT for units with flagsA & 0x20
  //   Magellan (wonder 12): +2x MP_PER_TURN (DAT_0064bcc8 * 2)
  //   Nuclear Power (tech 59/0x3B): +1x MP_PER_TURN
  const hasLighthouse = hasWonderEffect(state, activeCiv, 3);
  const hasMagellan = hasWonderEffect(state, activeCiv, 12);
  const hasNuclearPower = !!(state.civTechs?.[activeCiv]?.has(59));
  state.units = state.units.map(u => {
    if (u.owner !== activeCiv) return u;
    const orders = u.orders === 'fortifying' ? 'fortified' : u.orders;
    let mp = calcEffectiveMovementPoints(u);
    if (UNIT_DOMAIN[u.type] === 2) { // sea domain
      // Lighthouse: +1 MP, but skip units with flagsA & 0x20 (transports/carriers)
      if (hasLighthouse && !UNIT_NO_LIGHTHOUSE_BONUS.has(u.type)) {
        mp += MOVEMENT_MULTIPLIER;
      }
      // Magellan's Expedition: +2 MP
      if (hasMagellan) mp += 2 * MOVEMENT_MULTIPLIER;
      // Nuclear Power tech: +1 MP
      if (hasNuclearPower) mp += MOVEMENT_MULTIPLIER;
    }
    return { ...u, movesLeft: mp, orders };
  });

  // ── Anarchy countdown ──
  if (state.civs?.[activeCiv]) {
    const civ = state.civs[activeCiv];
    if (civ.government === 'anarchy' && civ.anarchyTurns > 0) {
      state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
      const updCiv = { ...state.civs[activeCiv] };
      updCiv.anarchyTurns = updCiv.anarchyTurns - 1;
      if (updCiv.anarchyTurns <= 0) {
        updCiv.government = updCiv.pendingGovernment || 'despotism';
        delete updCiv.pendingGovernment;
        delete updCiv.anarchyTurns;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'anarchyEnded', civSlot: activeCiv,
          government: updCiv.government,
        });
      }
      state.civs[activeCiv] = updCiv;
    }
  }

  // ── Process city resistance for the active civ ──
  state.cities = [...prev.cities];
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;
    if (city.resistanceTurns > 0) {
      state.cities[ci] = state.cities[ci] !== city ? state.cities[ci] : { ...city };
      // Count garrisoned military units (attack > 0)
      let garrison = 0;
      for (const u of state.units) {
        if (u.gx === city.gx && u.gy === city.gy && u.owner === city.owner && u.gx >= 0
            && (UNIT_ATK[u.type] || 0) > 0) {
          garrison++;
        }
      }
      // Decrement: 1 base + garrison bonus
      const resDec = 1 + garrison;
      state.cities[ci].resistanceTurns = Math.max(0, city.resistanceTurns - resDec);
    }
  }

  // ── Process cities for the active civ (happiness, food, production, support, disorder) ──
  // Delegated to processCityTurn() in cityturn.js which orchestrates:
  //   1. calcHappiness → update disorder/WLTKD
  //   2. Food processing (growth, famine, granary, aqueduct/sewer gates)
  //   3. Shield production & completion (units, buildings, wonders)
  //   4. Unit support deficit (disband most-distant units)
  //   5. Disorder check (democracy revolution risk)
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;

    const result = processCityTurn(ci, state, mapBase, {
      autoAssignWorker,
      removeWorstWorker,
    });

    // Emit all events from this city's turn processing
    if (result.events.length > 0) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push(...result.events);
    }
  }

  // ── Recalc spaceship stats (may have built SS parts this turn) ──
  recalcSpaceshipStats(state, activeCiv);

  // ── Famine elimination check: if a city was destroyed by famine, check if civ is eliminated ──
  checkCivElimination(state, activeCiv);

  // NOTE: Pollution generation is now handled per-city by processCityPollution()
  // inside processCityTurn() (D.1), including nuclear meltdown. Only the global
  // warming check remains here.

  // ── Global warming: cumulative counter system (FUN_00486c2e + FUN_004868fb) ──
  // Binary uses a pollution pressure counter (0-99) that drifts toward a net
  // pressure value each turn. When counter exceeds 16, a warming event fires
  // and degrades terrain across the map.
  {
    // Count pollution tiles and recycling centers across all cities
    let pollCount = 0;
    for (const tile of mapBase.tileData) {
      if (tile && tile.improvements && tile.improvements.pollution) pollCount++;
    }
    let recyclingCount = 0;
    for (const c of state.cities) {
      if (c.size > 0 && cityHasBuilding(c, 29)) recyclingCount++; // Recycling Center = 29
    }

    // Count alive civs for multi-civ divisor
    let aliveCivCount = 0;
    for (let c = 1; c < 8; c++) {
      if (state.civsAlive & (1 << c)) aliveCivCount++;
    }
    aliveCivCount = Math.max(1, aliveCivCount);

    // Pollution level: number of pollution tiles, divided by alive civ count
    let pollLevel = pollCount;
    if (aliveCivCount > 1) {
      pollLevel = Math.floor((aliveCivCount - 1 + pollLevel) / aliveCivCount);
    }

    // Net pressure: pollution × 2 - warmingEvents × 4 - recyclingCenters
    const warmingCount = state.globalWarmingCount || 0;
    const netPressure = pollLevel * 2 - warmingCount * 4 - recyclingCount;

    // Drift counter toward net pressure (±1 per turn)
    let counter = state.pollutionCounter || 0;
    if (netPressure > counter) counter++;
    else if (netPressure < counter) counter--;
    counter = Math.max(0, Math.min(99, counter));
    state.pollutionCounter = counter;

    // Warning at counter == 12 if pollution > 6
    if (counter === 12 && pollCount > 6) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'pollutionWarning' });
    }

    // Trigger global warming at counter > 16
    if (counter > 16) {
      state.globalWarmingCount = warmingCount + 1;
      state.pollutionCounter = 0; // reset after event

      // Apply terrain degradation across the map (FUN_004868fb)
      // Binary iterates all tiles: terrain < 4 → degrade based on position hash vs severity
      const severity = warmingCount; // use pre-increment count as severity
      for (let gy = 0; gy < mapBase.mh; gy++) {
        for (let gx = 0; gx < mapBase.mw; gx++) {
          const tileIdx = gy * mapBase.mw + gx;
          const tile = mapBase.tileData[tileIdx];
          if (!tile) continue;
          const ter = tile.terrain;
          if (ter >= 4) continue; // only desert(0), plains(1), grassland(2), forest(3)

          // Hash-based selection: (x*3 - y*3) & 7 == severity
          if (((gx * 3 - gy * 3) & 7) !== (severity & 7)) continue;

          // Degrade terrain
          if (ter === 3) {
            // Forest → Jungle
            tile.terrain = 9;
            tile.improvements = { ...tile.improvements, irrigation: false, mining: false };
          } else if (ter === 2) {
            // Grassland → Plains
            tile.terrain = 1;
          } else {
            // Desert/Plains → Desert
            tile.terrain = 0;
          }
        }
      }

      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'globalWarming' });
    }
  }

  // ── Reset airlift flags for active civ's cities ──
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;
    if (city.airliftedThisTurn) {
      state.cities[ci] = { ...state.cities[ci], airliftedThisTurn: false };
    }
  }

  // ── Trade / Treasury / Science for the active civ ──
  // D.5: Trade route income is now folded into calcCityTrade via
  // calcTradeRouteIncome — no separate accumulation needed.
  let civTaxTotal = 0;
  let civSciTotal = 0;
  let civMaintenanceTotal = 0;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== activeCiv || city.size <= 0) continue;
    if (city.resistanceTurns > 0) continue; // no trade during resistance
    const { tax, sci, maintenance } = calcCityTrade(city, ci, state, mapBase);
    civTaxTotal += tax;
    civSciTotal += sci;
    civMaintenanceTotal += maintenance;
  }

  // Update civ treasury and research progress
  if (state.civs && state.civs[activeCiv]) {
    state.civs = [...prev.civs];
    const civ = { ...state.civs[activeCiv] };
    civ.treasury = (civ.treasury || 0) + civTaxTotal - civMaintenanceTotal;

    // If treasury goes negative, sell cheapest-maintenance building to cover deficit
    while (civ.treasury < 0) {
      let cheapestId = -1, cheapestCost = Infinity, cheapestCi = -1;
      for (let sci = 0; sci < state.cities.length; sci++) {
        const sc = state.cities[sci];
        if (sc.owner !== activeCiv || sc.size <= 0 || !sc.buildings) continue;
        for (const bid of sc.buildings) {
          if (bid === 1) continue; // never sell Palace
          const maint = IMPROVE_MAINTENANCE[bid] || 0;
          if (maint > 0 && maint < cheapestCost) {
            cheapestCost = maint;
            cheapestId = bid;
            cheapestCi = sci;
          }
        }
      }
      if (cheapestId < 0) { civ.treasury = 0; break; }
      const sellCity = { ...state.cities[cheapestCi] };
      const sellBuildings = new Set(sellCity.buildings);
      sellBuildings.delete(cheapestId);
      sellCity.buildings = sellBuildings;
      sellCity.hasWalls = sellBuildings.has(8);
      sellCity.hasPalace = sellBuildings.has(1);
      state.cities[cheapestCi] = sellCity;
      civ.treasury += IMPROVE_COSTS[cheapestId] || 0;
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'buildingSold', cityName: sellCity.name, cityIndex: cheapestCi,
        civSlot: activeCiv, buildingId: cheapestId,
      });
    }

    // A.3: Science doubling (FUN_004efbc6)
    // Chieftain difficulty: double all science output for human players
    // AI with difficulty > 1: double science while building spaceship parts (35-37)
    const diffIdx = ['chieftain','warlord','prince','king','emperor','deity'].indexOf(state.difficulty || 'chieftain');
    const isHumanCiv = !!((1 << activeCiv) & (state.humanPlayers || 0xFF));
    if (diffIdx === 0 && isHumanCiv) {
      civSciTotal *= 2;
    } else if (!isHumanCiv && diffIdx > 1) {
      // Check if any AI city is building spaceship parts
      const buildingSpaceship = state.cities.some(c =>
        c.owner === activeCiv && c.size > 0 && c.itemInProduction &&
        c.itemInProduction.type === 'building' &&
        c.itemInProduction.id >= 35 && c.itemInProduction.id <= 37
      );
      if (buildingSpaceship) civSciTotal *= 2;
    }

    // Q.4: If scenario restricts tech advances, don't accumulate science
    if (!state.scenarioTechRestrictions?.noResearch) {
      civ.researchProgress = (civ.researchProgress || 0) + civSciTotal;
    }

    // ── Research completion check ──
    const techId = civ.techBeingResearched;
    if (techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length) {
      const cost = calcResearchCost(state, activeCiv);
      if (civ.researchProgress >= cost) {
        // Grant the advance
        grantAdvance(state, activeCiv, techId);
        civ.researchProgress = 0;
        civ.techBeingResearched = 0xFF; // clear — player must pick next
        // Notify via discoveredAdvance field (client will show picker)
        state.discoveredAdvance = { civSlot: activeCiv, advanceId: techId };
        // Phase G: handle tech discovery effects (barracks refund, wonder obsolescence, Leonardo's)
        const techEvents = handleTechDiscovery(state, activeCiv, techId);
        if (techEvents.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...techEvents);
        }
        // Sync treasury in case handleTechDiscovery modified it (barracks refund)
        civ.treasury = state.civs[activeCiv]?.treasury ?? civ.treasury;
        // Scenario events: tech discovered
        if (state.scenarioEvents && state.scenarioEvents.length > 0) {
          dispatchEvents(state, mapBase, EVENT_RECEIVED_TECH, { civSlot: activeCiv, techId });
        }
        console.log(`[tech] Civ ${activeCiv} discovered ${ADVANCE_NAMES[techId]} (id=${techId}), civTechs now:`, [...state.civTechs[activeCiv]]);
      }
    }

    state.civs[activeCiv] = civ;
  }

  // ── Q.2: Tech leak + Great Library ──
  // Great Library (wonder 4): immediately grant techs known by 2+ other civs.
  // Tech leak (no wonder needed): if 2+ other civs already know a tech,
  // civ gets it free on the NEXT turn (tracked via pendingLeakedTechs).
  {
    const hasGreatLibrary = hasWonderEffect(state, activeCiv, 4);
    const myTechs = state.civTechs?.[activeCiv];
    if (myTechs) {
      // First, grant any pending leaked techs from last turn
      if (state.pendingLeakedTechs?.[activeCiv]?.length > 0) {
        for (const advId of state.pendingLeakedTechs[activeCiv]) {
          if (!myTechs.has(advId)) {
            grantAdvance(state, activeCiv, advId);
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'freeAdvance', civSlot: activeCiv, advanceId: advId, source: 'tech leak' });
          }
        }
        // Clear pending
        if (!state.pendingLeakedTechs) state.pendingLeakedTechs = {};
        state.pendingLeakedTechs = { ...state.pendingLeakedTechs, [activeCiv]: [] };
      }

      // Now check for techs known by 2+ other civs
      for (let advId = 0; advId < ADVANCE_NAMES.length; advId++) {
        if (myTechs.has(advId)) continue;
        let count = 0;
        for (let c = 1; c < 8; c++) {
          if (c === activeCiv || !(state.civsAlive & (1 << c))) continue;
          if (state.civTechs[c]?.has(advId)) count++;
        }
        if (count >= 2) {
          if (hasGreatLibrary) {
            // Great Library: grant immediately
            grantAdvance(state, activeCiv, advId);
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'freeAdvance', civSlot: activeCiv, advanceId: advId, source: 'Great Library' });
          } else {
            // Tech leak: queue for next turn
            if (!state.pendingLeakedTechs) state.pendingLeakedTechs = {};
            state.pendingLeakedTechs = { ...state.pendingLeakedTechs };
            if (!state.pendingLeakedTechs[activeCiv]) {
              state.pendingLeakedTechs[activeCiv] = [];
            } else {
              state.pendingLeakedTechs[activeCiv] = [...state.pendingLeakedTechs[activeCiv]];
            }
            if (!state.pendingLeakedTechs[activeCiv].includes(advId)) {
              state.pendingLeakedTechs[activeCiv].push(advId);
            }
          }
        }
      }
    }
  }

  // ── Leonardo's Workshop: auto-upgrade obsolete units ──
  // Primary upgrade happens in handleTechDiscovery() at discovery time.
  // This per-turn sweep catches edge cases (e.g., capturing Leonardo's after
  // having the obsoleting tech, or loading a save with stale unit types).
  if (hasWonderEffect(state, activeCiv, 14)) {
    const techs = state.civTechs?.[activeCiv];
    if (techs) {
      for (const t of techs) {
        const leoEvents = upgradeUnitsForTech(state, activeCiv, t);
        if (leoEvents.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...leoEvents);
        }
      }
    }
  }

  // ── Process unit orders for active civ (worker progress, HP recovery) ──
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.owner !== activeCiv || u.gx < 0) continue;

    // HP recovery — ported from FUN_00488cef (heal_units)
    // Own city + Barracks/Port Facility/Airport = full heal
    // Own city (no matching building) = 2 HP bars
    // Allied city = 1 HP bar
    // Fortress = 1 HP bar
    // Field = 1 HP bar every other turn (even turns only)
    if (u.movesRemain > 0) {
      const domain = UNIT_DOMAIN[u.type] ?? 0;
      const ownCity = state.cities.find(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner && c.size > 0);
      let healAmt = 0;

      if (ownCity) {
        // Domain-specific building: Barracks(2) for land, Port Facility(34) for sea, Airport(32) for air
        const matchingBuildingId = domain === 0 ? 2 : domain === 2 ? 34 : 32;
        if (cityHasBuilding(ownCity, matchingBuildingId)) {
          // Full heal: matching building in own city
          healAmt = u.movesRemain;
        } else {
          // Own city without matching building: 2 HP bars
          healAmt = 2;
        }
      } else {
        // Check allied city (different owner, alliance treaty)
        const alliedCity = state.cities.find(c => {
          if (c.gx !== u.gx || c.gy !== u.gy || c.size <= 0) return false;
          if (c.owner === u.owner) return false;
          // Check for alliance treaty
          const a = Math.min(u.owner, c.owner);
          const b = Math.max(u.owner, c.owner);
          return state.treaties?.[`${a}-${b}`] === 'alliance';
        });

        if (alliedCity) {
          // Allied city: 1 HP bar
          healAmt = 1;
        } else {
          // Check fortress
          const tileIdx = u.gy * mapBase.mw + u.gx;
          const tile = mapBase.tileData?.[tileIdx];
          const onFortress = tile && tile.improvements && tile.improvements.fortress;

          if (onFortress) {
            // Fortress: 1 HP bar
            healAmt = 1;
          } else {
            // Field: 1 HP bar every other turn (heal on even turns only)
            if (turnNumber % 2 === 0) {
              healAmt = 1;
            }
          }
        }
      }

      if (healAmt > 0) {
        const newHpLost = Math.max(0, u.movesRemain - healAmt);
        if (newHpLost !== u.movesRemain) {
          state.units[ui] = { ...u, movesRemain: newHpLost };
        }
      }
    }

    // Air unit fuel: decrement when away from city/carrier/airbase, crash at 0
    const maxFuel = UNIT_FUEL[u.type];
    if (maxFuel > 0) {
      const fuelTileIdx = u.gy * mapBase.mw + u.gx;
      const fuelTile = mapBase.tileData?.[fuelTileIdx];
      const onAirbase = fuelTile && fuelTile.improvements && fuelTile.improvements.airbase;
      const atBase = onAirbase
        || state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.owner === u.owner)
        || state.units.some((v, vi) => vi !== ui && v.gx === u.gx && v.gy === u.gy
          && v.owner === u.owner && v.type === 42 && v.gx >= 0);
      if (atBase) {
        if ((u.fuelRemaining ?? maxFuel) !== maxFuel)
          state.units[ui] = { ...state.units[ui], fuelRemaining: maxFuel };
      } else {
        const fuel = (state.units[ui].fuelRemaining ?? maxFuel) - 1;
        if (fuel <= 0) {
          killUnit(state, ui);
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({ type: 'unitLost', unitType: u.type, reason: 'fuel', civSlot: activeCiv });
        } else {
          state.units[ui] = { ...state.units[ui], fuelRemaining: fuel };
        }
      }
      continue; // air units don't do worker orders
    }

    // Worker orders: road, irrigation, mine, fortress, airbase, pollution, railroad
    const workerOrders = ['road', 'railroad', 'irrigation', 'mine', 'fortress', 'airbase', 'pollution'];
    if (workerOrders.includes(u.orders)) {
      const terrain = mapBase.getTerrain(u.gx, u.gy);
      const isEngineer = u.type === 1;
      const newWorkTurns = (u.workTurns || 0) + 1;
      let turnsNeeded;

      switch (u.orders) {
        case 'road': turnsNeeded = ROAD_TURNS; break;
        case 'railroad': turnsNeeded = ROAD_TURNS; break;
        case 'irrigation': turnsNeeded = IRRIGATION_TURNS[terrain] || 5; break;
        case 'mine': turnsNeeded = MINING_TURNS[terrain] || 5; break;
        case 'fortress': turnsNeeded = FORTRESS_TURNS; break;
        case 'airbase': turnsNeeded = AIRBASE_TURNS; break;
        case 'pollution': turnsNeeded = POLLUTION_TURNS; break;
        default: turnsNeeded = 999;
      }

      // Engineers work at 2× speed
      if (isEngineer) turnsNeeded = Math.max(1, Math.ceil(turnsNeeded / 2));

      if (newWorkTurns >= turnsNeeded) {
        // Complete the improvement
        completeWorkerOrder(u.orders, u.gx, u.gy, terrain, mapBase);
        state.units[ui] = { ...u, orders: 'none', workTurns: 0 };
      } else {
        state.units[ui] = { ...u, workTurns: newWorkTurns };
      }
    }

    // Transform terrain order (Engineers only)
    if (u.orders === 'transform' && u.type === 1) {
      const tfTerrain = mapBase.getTerrain(u.gx, u.gy);
      const tfTarget = TERRAIN_TRANSFORM[tfTerrain];
      const tfTurnsNeeded = Math.max(1, Math.ceil((TRANSFORM_TURNS[tfTerrain] || 10) / 2)); // Engineers work at 2x speed
      const tfWorked = (u.turnsWorked || 0) + 1;
      if (tfWorked >= tfTurnsNeeded && tfTarget >= 0) {
        // Transform complete
        const tfTileIdx = u.gy * mapBase.mw + u.gx;
        if (mapBase.tileData[tfTileIdx]) {
          mapBase.tileData[tfTileIdx].terrain = tfTarget;
          // Clear improvements that don't apply to new terrain
          mapBase.tileData[tfTileIdx].improvements = {
            ...mapBase.tileData[tfTileIdx].improvements,
            irrigation: false,
            mining: false,
            farmland: false,
          };
        }
        state.units[ui] = { ...u, orders: 'none', turnsWorked: 0 };
      } else {
        state.units[ui] = { ...u, turnsWorked: tfWorked, movesLeft: 0 };
      }
    }

    // GOTO continuation: units with goto orders continue moving next turn
    if (u.orders === 'goto' && u.goToX != null && u.goToY != null && u.movesLeft > 0) {
      const gtTargetGx = u.goToX;
      const gtTargetGy = u.goToY;
      // Already at destination?
      if (u.gx === gtTargetGx && u.gy === gtTargetGy) {
        state.units[ui] = { ...u, orders: 'none', goToX: undefined, goToY: undefined };
      } else {
        // Use calcGotoDirection for step-by-step GOTO continuation
        let gtCurUnit = { ...u };
        let gtMoved = false;
        while (gtCurUnit.movesLeft > 0 && gtCurUnit.gx >= 0) {
          // Compute next direction (handles A*, adjacency, geometric fallback)
          const gtResult = calcGotoDirection(gtCurUnit, gtTargetGx, gtTargetGy, mapBase, gtCurUnit.owner, state.units, state.cities);
          if (!gtResult) break; // no path or already there

          const gtDir = gtResult.dir;
          const gtNextDest = resolveDirection(gtCurUnit.gx, gtCurUnit.gy, gtDir, mapBase);
          if (!gtNextDest) break;
          const gtMoveCostVal = moveCost(gtCurUnit.type, mapBase, gtCurUnit.gx, gtCurUnit.gy, gtNextDest.gx, gtNextDest.gy);
          if (gtMoveCostVal < 0) break;
          const gtActual = Math.max(gtMoveCostVal, 1);
          gtCurUnit = {
            ...gtCurUnit,
            gx: gtNextDest.gx, gy: gtNextDest.gy,
            x: gtNextDest.gx * 2 + (gtNextDest.gy % 2), y: gtNextDest.gy,
            movesLeft: Math.max(0, gtCurUnit.movesLeft - gtActual),
          };
          gtMoved = true;
          // Update visibility
          if (mapBase.tileData) {
            updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, activeCiv, gtNextDest.gx, gtNextDest.gy, mapBase.wraps);
            discoverContacts(state, mapBase, activeCiv, gtNextDest.gx, gtNextDest.gy, 1);
          }
          // Check goody hut
          const gtHutIdx = gtNextDest.gy * mapBase.mw + gtNextDest.gx;
          const gtHutTile = mapBase.tileData?.[gtHutIdx];
          if (gtHutTile && gtHutTile.goodyHut && activeCiv > 0) {
            gtHutTile.goodyHut = false;
            const gtHutResult = resolveGoodyHut(state, mapBase, gtCurUnit, activeCiv);
            if (gtHutResult) state.goodyHutResult = { ...gtHutResult, civSlot: activeCiv };
            break;
          }
          // Reached destination?
          if (gtNextDest.gx === gtTargetGx && gtNextDest.gy === gtTargetGy) {
            gtCurUnit.orders = 'none';
            gtCurUnit.goToX = undefined;
            gtCurUnit.goToY = undefined;
            break;
          }
        }
        if (gtMoved) {
          state.units[ui] = gtCurUnit;
        }
      }
    }
  }

  // ── C.2: Trireme sinking check for active civ ──
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.owner !== activeCiv || u.gx < 0) continue;
    if (checkTriremeSinking(u, ui, state, mapBase, hasWonderEffect)) {
      killUnit(state, ui);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'unitLost', unitType: u.type, reason: 'triremeSinking', civSlot: activeCiv });
    }
  }

  // ── Barbarian spawning phase (runs once per full turn cycle) ──
  // turnNumber was incremented above when activeCiv wraps back to firstAlive
  if (turnNumber > (prev.turn?.number || 0)) {
    spawnBarbarians(state, mapBase);
    // ── Scenario events: TURN, TURN_INTERVAL, RANDOM_TURN triggers ──
    if (state.scenarioEvents && state.scenarioEvents.length > 0) {
      dispatchEvents(state, mapBase, EVENT_TURN, { turn: turnNumber });
      dispatchEvents(state, mapBase, EVENT_TURN_INTERVAL, { turn: turnNumber });
      dispatchEvents(state, mapBase, EVENT_RANDOM_TURN, { turn: turnNumber });
    }

    // ── G.1-G.5: Diplomacy timers (ceasefire expiration, withdrawal, alliance visibility, reputation decay) ──
    const diploEvents = processDiplomacyTimers(state, mapBase, turnNumber);
    if (diploEvents.length > 0) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push(...diploEvents);
    }
  }

  // ── K.3: Track consecutive peace turns per civ (for score formula) ──
  // A civ is "at peace" if no treaty with any other alive civ is 'war'.
  if (turnNumber > (prev.turn?.number || 0)) {
    if (!state.civPeaceTurns) state.civPeaceTurns = new Array(8).fill(0);
    state.civPeaceTurns = [...state.civPeaceTurns];
    for (let c = 1; c <= 7; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      let atWar = false;
      if (state.treaties) {
        for (const [key, status] of Object.entries(state.treaties)) {
          if (status !== 'war') continue;
          const [a, b] = key.split('-').map(Number);
          if (a === c || b === c) { atWar = true; break; }
        }
      }
      state.civPeaceTurns[c] = atWar ? 0 : (state.civPeaceTurns[c] || 0) + 1;
    }
  }

  // ── Game end conditions (Phase I): conquest, spaceship, retirement ──
  if (!state.gameOver) {
    const endResult = checkGameEndConditions(state);
    if (endResult && endResult.ended) {
      state.gameOver = { winner: endResult.winner, reason: endResult.reason };
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'gameOver', winner: endResult.winner,
        reason: endResult.reason,
        ...(endResult.score != null ? { score: endResult.score } : {}),
        ...(endResult.year != null ? { year: endResult.year } : {}),
        ...(endResult.successProb != null ? { successProb: endResult.successProb } : {}),
      });
    }
  }
}
