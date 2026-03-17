// ═══════════════════════════════════════════════════════════════════
// reduce/espionage-actions.js — Spy/diplomat action handlers
// ═══════════════════════════════════════════════════════════════════

import { UNIT_HP } from '../defs.js';
import { validateAction, calcBribeCost, calcInciteCost } from '../rules.js';
import { updateVisibility } from '../visibility.js';
import { grantAdvance } from '../research.js';
import { checkSpySurvival, spyCaughtCheck, handleEspionageIncident, calcSpySuccessChance, validateBribery } from '../espionage.js';
import { dispatchEvents, EVENT_RECEIVED_TECH, EVENT_CITY_TAKEN } from '../events.js';
import { killUnit, captureCity, checkCivElimination, removeWorstWorker } from './helpers.js';
import { spawnBarbarianUprising } from './barbarians.js';

export function handleBribeUnit(state, prev, mapBase, action, civSlot) {
  // Validate bribery preconditions (sole city defender, barbarians, etc.)
  const bribeCheck = validateBribery(state, action.targetIndex, civSlot);
  if (!bribeCheck.valid) {
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'bribeFailed', civSlot, reason: bribeCheck.reason });
    return;
  }
  const spy = state.units[action.unitIndex];
  const target = state.units[action.targetIndex];
  const bCost = calcBribeCost(state, target, mapBase, civSlot);
  // Deduct gold
  state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
  const bCiv = { ...state.civs[civSlot] };
  bCiv.treasury = (bCiv.treasury || 0) - bCost;
  state.civs[civSlot] = bCiv;
  // Transfer unit ownership
  state.units[action.targetIndex] = { ...target, owner: civSlot, homeCityId: 0xFFFF, orders: 'none' };
  // Spy survival check (uses decompiled formula)
  const bribeSurvival = checkSpySurvival(spy, 0, state.rng);
  if (bribeSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: bribeSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  // Diplomatic incident
  handleEspionageIncident(state, mapBase, civSlot, target.owner);
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'unitBribed', civSlot, unitType: target.type, cost: bCost });
}

export function handleStealTech(state, prev, mapBase, action, civSlot) {
  const spy = state.units[action.unitIndex];
  const sCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  // Success chance gate (ported from decompiled spy success check)
  const stealChance = calcSpySuccessChance(spy, sCity, 'steal', state);
  if (state.rng.random() >= stealChance) {
    // Failed — spy caught
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, sCity.owner);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'stealTech', cityName: sCity.name });
    return;
  }
  const theirTechs = state.civTechs?.[sCity.owner];
  const myTechs = state.civTechs?.[civSlot];
  // Collect stealable techs
  const stealable = [];
  for (const t of theirTechs) { if (!myTechs.has(t)) stealable.push(t); }
  let stolenId;
  // J.2: Spies (type 47) can target a specific tech; Diplomats get random
  if (spy.type === 47 && action.techId != null && action.techId >= 0) {
    // Targeted theft — validate the target civ actually has it and we don't
    if (stealable.includes(action.techId)) {
      stolenId = action.techId;
    } else {
      // Fallback to random if requested tech isn't available
      stolenId = stealable[state.rng.nextInt(stealable.length)];
    }
  } else {
    // Diplomat or spy without targeted choice: random tech
    stolenId = stealable[state.rng.nextInt(stealable.length)];
  }
  grantAdvance(state, civSlot, stolenId);
  // Spy survival (decompiled formula: successLevel=0 for normal steal)
  const stealSurvival = checkSpySurvival(spy, 0, state.rng);
  if (stealSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: stealSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  // Diplomatic incident
  handleEspionageIncident(state, mapBase, civSlot, sCity.owner);
  // Dispatch scenario events for tech received
  dispatchEvents(state, mapBase, EVENT_RECEIVED_TECH, { civSlot, techId: stolenId });
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'techStolen', civSlot, advanceId: stolenId, from: sCity.owner });
}

export function handleSabotageCity(state, prev, mapBase, action, civSlot) {
  const spy = state.units[action.unitIndex];
  const sCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  // Success chance gate
  const sabChance = calcSpySuccessChance(spy, sCity, 'sabotage', state);
  if (state.rng.random() >= sabChance) {
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, sCity.owner);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'sabotageCity', cityName: sCity.name });
    return;
  }
  const sCityIdx = state.cities.indexOf(sCity);
  state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
  const sabCity = { ...sCity };
  let sabResult;
  // 50% destroy random building, 50% reset production (from decompiled case 3)
  const buildings = sabCity.buildings instanceof Set ? [...sabCity.buildings] : [];
  // Never destroy Palace (1), City Walls (8), SDI Defense (17)
  const destructible = buildings.filter(b => b !== 1 && b !== 8 && b !== 17);
  if (destructible.length > 0 && state.rng.random() < 0.5) {
    const bid = destructible[state.rng.nextInt(destructible.length)];
    const newBuildings = new Set(sabCity.buildings);
    newBuildings.delete(bid);
    sabCity.buildings = newBuildings;
    sabCity.hasWalls = newBuildings.has(8);
    sabResult = { type: 'buildingDestroyed', buildingId: bid };
  } else {
    sabCity.shieldsInBox = 0;
    sabResult = { type: 'productionReset' };
  }
  state.cities[sCityIdx] = sabCity;
  // Spy survival (decompiled formula)
  const sabSurvival = checkSpySurvival(spy, 0, state.rng);
  if (sabSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: sabSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  // Diplomatic incident
  handleEspionageIncident(state, mapBase, civSlot, sCity.owner);
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'citySabotaged', civSlot, cityName: sCity.name, ...sabResult });
}

export function handleInciteRevolt(state, prev, mapBase, action, civSlot) {
  const spy = state.units[action.unitIndex];
  const iCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  const iCityIdx = state.cities.indexOf(iCity);
  const iCost = calcInciteCost(state, iCity, mapBase);
  const oldOwner = iCity.owner;
  // Deduct gold
  state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
  const iCiv = { ...state.civs[civSlot] };
  iCiv.treasury = (iCiv.treasury || 0) - iCost;
  state.civs[civSlot] = iCiv;
  // Transfer nearby units (within distance 1) to new owner — from decompiled execute_civil_war
  state.units = state.units !== prev.units ? state.units : [...prev.units];
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.gx < 0 || u.owner !== oldOwner) continue;
    const udx = Math.abs(u.gx - iCity.gx);
    const udy = Math.abs(u.gy - iCity.gy);
    const udist = (mapBase.wraps ? Math.min(udx, mapBase.mw - udx) : udx) + udy;
    if (udist < 2) {
      // On city tile: transfer to new owner; adjacent and not in another city: also transfer
      if (udist === 0 || !state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.size > 0 && c !== iCity)) {
        state.units[ui] = { ...u, owner: civSlot, homeCityId: iCityIdx, orders: 'none' };
        if (mapBase.tileData) {
          updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, u.gx, u.gy, mapBase.wraps);
        }
      }
    }
  }
  // Transfer city ownership via captureCity (incite revolt skips random building destruction)
  state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
  captureCity(state, prev, mapBase, iCityIdx, civSlot, oldOwner, { skipBuildingDestruction: true });
  // Spy survival (decompiled formula)
  const inciteSurvival = checkSpySurvival(spy, 0, state.rng);
  if (inciteSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: inciteSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  // Diplomatic incident
  handleEspionageIncident(state, mapBase, civSlot, oldOwner);
  checkCivElimination(state, oldOwner);
  // Barbarian uprising when civ is destroyed via incite revolt
  if (oldOwner > 0 && !(state.civsAlive & (1 << oldOwner))) {
    spawnBarbarianUprising(state, mapBase, iCity.gx, iCity.gy);
  }
  // Scenario events: city taken
  dispatchEvents(state, mapBase, EVENT_CITY_TAKEN, {
    cityName: iCity.name, attacker: civSlot, defender: oldOwner,
  });
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'cityIncited', civSlot, cityName: iCity.name, from: oldOwner, cost: iCost });
}

export function handleSpyPoisonWater(state, prev, mapBase, action, civSlot) {
  // Spy poisons water supply: reduce city population by 1
  // From decompiled spy_enters_city case 4
  const spy = state.units[action.unitIndex];
  const pCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  // Success chance gate
  const poisonChance = calcSpySuccessChance(spy, pCity, 'poison', state);
  if (state.rng.random() >= poisonChance) {
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, pCity.owner);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'poisonWater', cityName: pCity.name });
    return;
  }
  const pCityIdx = state.cities.indexOf(pCity);
  state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
  const poisonCity = { ...pCity };
  if (poisonCity.size < 2) {
    // City too small, just wipe food
    poisonCity.foodInBox = 0;
  } else {
    poisonCity.size -= 1;
    // Remove a worked tile if more workers than size
    if (poisonCity.workedTiles && poisonCity.workedTiles.length > poisonCity.size) {
      poisonCity.workedTiles = removeWorstWorker(poisonCity, pCityIdx, poisonCity.workedTiles, state, mapBase);
    }
  }
  state.cities[pCityIdx] = poisonCity;
  // Spy survival (poison is random difficulty: successLevel = rand 0 or -1)
  const poisonLevel = state.rng.random() < 0.5 ? -1 : 0;
  const poisonSurvival = checkSpySurvival(spy, poisonLevel, state.rng);
  if (poisonSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: poisonSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  handleEspionageIncident(state, mapBase, civSlot, pCity.owner);
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'waterPoisoned', civSlot, cityName: pCity.name, from: pCity.owner });
}

export function handleSpyPlantNuke(state, prev, mapBase, action, civSlot) {
  // Spy plants nuclear device: nuke the city
  // From decompiled spy_enters_city case 5
  // Requires 4 cumulative spy caught checks (3 base + 1 if barracks)
  const spy = state.units[action.unitIndex];
  const nCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  const nCityIdx = state.cities.indexOf(nCity);
  if (!state.turnEvents) state.turnEvents = [];

  // Cumulative spy caught checks (4 total, harder if barracks present)
  let nukeCaught = false;
  for (let chk = 0; chk < 3; chk++) {
    if (spyCaughtCheck(spy, state.rng)) { nukeCaught = true; break; }
  }
  // Extra check if city has barracks (building 2)
  if (!nukeCaught && nCity.buildings && nCity.buildings.has(2)) {
    if (spyCaughtCheck(spy, state.rng)) nukeCaught = true;
  }

  if (nukeCaught) {
    killUnit(state, action.unitIndex);
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'plantNuke', cityName: nCity.name });
    handleEspionageIncident(state, mapBase, civSlot, nCity.owner);
    return;
  }

  // Nuke the city — apply nuke damage (same as NUKE action but centered on city)
  state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
  const nukeCity = { ...nCity };
  // Destroy random buildings (50% each)
  if (nukeCity.buildings instanceof Set) {
    const nukeBldgs = new Set(nukeCity.buildings);
    for (const bid of [...nukeBldgs]) {
      if (bid === 1) continue; // keep Palace
      if (state.rng.random() < 0.5) nukeBldgs.delete(bid);
    }
    nukeCity.buildings = nukeBldgs;
    nukeCity.hasWalls = nukeBldgs.has(8);
  }
  // Halve population (min 1)
  nukeCity.size = Math.max(1, Math.floor(nukeCity.size / 2));
  // Add pollution
  const nukeTileIdx = nCity.gy * mapBase.mw + nCity.gx;
  if (mapBase.tileData?.[nukeTileIdx]) {
    mapBase.tileData[nukeTileIdx].improvements = { ...mapBase.tileData[nukeTileIdx].improvements, pollution: true };
  }
  state.cities[nCityIdx] = nukeCity;

  // Kill/damage units in city
  state.units = state.units !== prev.units ? state.units : [...prev.units];
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.gx === nCity.gx && u.gy === nCity.gy && u.gx >= 0 && u.owner !== civSlot) {
      if (state.rng.random() < 0.5) {
        killUnit(state, ui);
      }
    }
  }

  // Spy survival
  const nukeSurvival = checkSpySurvival(spy, 1, state.rng); // hard mission
  if (nukeSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: nukeSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }

  // Global diplomatic incident: all civs may declare war
  // From decompiled: lower attitude by 100 for all other civs
  for (let c = 1; c <= 7; c++) {
    if (c === civSlot || !(state.civsAlive & (1 << c))) continue;
    handleEspionageIncident(state, mapBase, civSlot, c);
  }

  state.turnEvents.push({ type: 'nukeBySpyPlanted', civSlot, cityName: nCity.name, from: nCity.owner });
}

export function handleSpySabotageProduction(state, prev, mapBase, action, civSlot) {
  // Spy resets city's shieldsInBox to 0
  const spy = state.units[action.unitIndex];
  const spCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  // Success chance gate
  const spSabChance = calcSpySuccessChance(spy, spCity, 'sabotageProduction', state);
  if (state.rng.random() >= spSabChance) {
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, spCity.owner);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'sabotageProduction', cityName: spCity.name });
    return;
  }
  const spCityIdx = state.cities.indexOf(spCity);
  state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
  state.cities[spCityIdx] = { ...spCity, shieldsInBox: 0 };
  // Spy survival
  const spSurvival = checkSpySurvival(spy, 0, state.rng);
  if (spSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: spSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  handleEspionageIncident(state, mapBase, civSlot, spCity.owner);
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'productionSabotaged', civSlot, cityName: spCity.name, from: spCity.owner });
}

export function handleSpyInvestigateCity(state, prev, mapBase, action, civSlot) {
  // Spy reveals city details — low risk operation
  // From decompiled spy_enters_city case 1
  const spy = state.units[action.unitIndex];
  const invCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  // Unified success/detection check (J.1)
  const invChance = calcSpySuccessChance(spy, invCity, 'investigate', state);
  if (state.rng.random() >= invChance) {
    // Failed — spy caught
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, invCity.owner);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'investigateCity', cityName: invCity.name });
    return;
  }
  // Spy survival (decompiled formula)
  const invSurvival = checkSpySurvival(spy, 0, state.rng);
  if (invSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: invSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  if (!state.turnEvents) state.turnEvents = [];
  // Send city details to the acting civ
  const invBuildings = invCity.buildings instanceof Set ? [...invCity.buildings] : [];
  state.turnEvents.push({
    type: 'cityInvestigated', civSlot, cityName: invCity.name,
    from: invCity.owner, size: invCity.size,
    buildings: invBuildings,
    producing: invCity.producing,
    shieldsInBox: invCity.shieldsInBox,
  });
}

export function handleSpyEstablishEmbassy(state, prev, mapBase, action, civSlot) {
  // Establish embassy with city owner's civ
  // From decompiled spy_enters_city case 0
  const spy = state.units[action.unitIndex];
  const embCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  const embTarget = embCity.owner;
  // Unified success/detection check (J.1)
  const embChance = calcSpySuccessChance(spy, embCity, 'embassy', state);
  if (state.rng.random() >= embChance) {
    // Failed — spy caught
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, embTarget);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'establishEmbassy', cityName: embCity.name });
    return;
  }
  // Set embassy flag in diplomacy
  if (!state.diplomacy) state.diplomacy = {};
  const embKey = `${civSlot}-${embTarget}`;
  state.diplomacy = {
    ...state.diplomacy,
    [embKey]: { ...(state.diplomacy[embKey] || {}), embassy: true },
  };
  // Spy survival (decompiled formula)
  const embSurvival = checkSpySurvival(spy, 0, state.rng);
  if (embSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: embSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'embassyEstablished', civSlot, targetCiv: embTarget, cityName: embCity.name });
}

export function handleSpySabotageUnit(state, prev, mapBase, action, civSlot) {
  // Spy sabotages enemy unit: 50% HP damage
  // From decompiled FUN_004c9ebd (spy_sabotage_unit, 784B)
  const spy = state.units[action.unitIndex];
  const sabTarget = state.units[action.targetIndex];
  // Unified success/detection check (J.1) — use nearest city for building modifiers
  const sabUnitCity = state.cities.find(c => c.gx === sabTarget.gx && c.gy === sabTarget.gy && c.size > 0 && c.owner === sabTarget.owner);
  // If target isn't in a city, use a dummy city with no buildings for the check
  const sabUnitCheckCity = sabUnitCity || { gx: sabTarget.gx, gy: sabTarget.gy, buildings: new Set(), owner: sabTarget.owner };
  const sabUnitChance = calcSpySuccessChance(spy, sabUnitCheckCity, 'sabotage', state);
  if (state.rng.random() >= sabUnitChance) {
    // Failed — spy caught
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, sabTarget.owner);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'sabotageUnit' });
    return;
  }
  const maxHp = (UNIT_HP && UNIT_HP[sabTarget.type]) || 10;
  const damage = Math.floor(maxHp / 2);
  state.units[action.targetIndex] = {
    ...sabTarget,
    movesRemain: Math.min(maxHp - 1, (sabTarget.movesRemain || 0) + damage),
  };
  // Spy survival
  const sabUnitSurvival = checkSpySurvival(spy, 0, state.rng);
  if (sabUnitSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: sabUnitSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  handleEspionageIncident(state, mapBase, civSlot, sabTarget.owner);
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'unitSabotaged', civSlot, targetType: sabTarget.type, damage });
}

export function handleSpySubvertCity(state, prev, mapBase, action, civSlot) {
  // J.3: Spy-only subvert city — like incite revolt but keeps buildings intact
  // Costs 2× normal incite cost
  const spy = state.units[action.unitIndex];
  const svCity = state.cities.find(c => c.gx === spy.gx && c.gy === spy.gy && c.size > 0);
  const svCityIdx = state.cities.indexOf(svCity);
  const svBaseCost = calcInciteCost(state, svCity, mapBase);
  const svCost = svBaseCost * 2;
  const svOldOwner = svCity.owner;
  // Unified success/detection check (J.1)
  const svChance = calcSpySuccessChance(spy, svCity, 'sabotage', state);
  if (state.rng.random() >= svChance) {
    killUnit(state, action.unitIndex);
    handleEspionageIncident(state, mapBase, civSlot, svOldOwner);
    if (!state.turnEvents) state.turnEvents = [];
    state.turnEvents.push({ type: 'spyCaught', civSlot, operation: 'subvertCity', cityName: svCity.name });
    return;
  }
  // Deduct gold
  state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
  const svCiv = { ...state.civs[civSlot] };
  svCiv.treasury = (svCiv.treasury || 0) - svCost;
  state.civs[civSlot] = svCiv;
  // Transfer nearby units (within distance 1) to new owner
  state.units = state.units !== prev.units ? state.units : [...prev.units];
  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.gx < 0 || u.owner !== svOldOwner) continue;
    const udx = Math.abs(u.gx - svCity.gx);
    const udy = Math.abs(u.gy - svCity.gy);
    const udist = (mapBase.wraps ? Math.min(udx, mapBase.mw - udx) : udx) + udy;
    if (udist < 2) {
      if (udist === 0 || !state.cities.some(c => c.gx === u.gx && c.gy === u.gy && c.size > 0 && c !== svCity)) {
        state.units[ui] = { ...u, owner: civSlot, homeCityId: svCityIdx, orders: 'none' };
        if (mapBase.tileData) {
          updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, u.gx, u.gy, mapBase.wraps);
        }
      }
    }
  }
  // Transfer city ownership — skip building destruction (subvert keeps all buildings)
  state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
  captureCity(state, prev, mapBase, svCityIdx, civSlot, svOldOwner, { skipBuildingDestruction: true });
  // Spy survival
  const svSurvival = checkSpySurvival(spy, 0, state.rng);
  if (svSurvival.survives) {
    state.units[action.unitIndex] = { ...spy, movesLeft: 0, veteran: svSurvival.becomesVeteran ? 1 : spy.veteran };
  } else {
    killUnit(state, action.unitIndex);
  }
  // Diplomatic incident
  handleEspionageIncident(state, mapBase, civSlot, svOldOwner);
  checkCivElimination(state, svOldOwner);
  if (svOldOwner > 0 && !(state.civsAlive & (1 << svOldOwner))) {
    spawnBarbarianUprising(state, mapBase, svCity.gx, svCity.gy);
  }
  dispatchEvents(state, mapBase, EVENT_CITY_TAKEN, {
    cityName: svCity.name, attacker: civSlot, defender: svOldOwner,
  });
  if (!state.turnEvents) state.turnEvents = [];
  state.turnEvents.push({ type: 'citySubverted', civSlot, cityName: svCity.name, from: svOldOwner, cost: svCost });
}
