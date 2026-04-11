// ═══════════════════════════════════════════════════════════════════
// reduce/move-unit.js — MOVE_UNIT action handler + goody hut logic
// ═══════════════════════════════════════════════════════════════════

import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_ROLE, UNIT_ATK, UNIT_CARRY_CAP, UNIT_NAMES, ADVANCE_NAMES, UNIT_FUEL, UNIT_DESTROYED_AFTER_ATTACK, UNIT_SUBMARINE, UNIT_SUB_DETECTOR, NON_COMBAT_TYPES, UNIT_HP, DIFFICULTY_KEYS } from '../defs.js';
import { resolveDirection, moveCost, calcEffectiveMovementPoints, findAvailableTransport, loadUnitsOntoShip, checkTrespass, checkTriremeSinking, checkAirFuel } from '../movement.js';
import { updateVisibility } from '../visibility.js';
import { resolveCombat, calcStackBestDefender, ejectAirUnits } from '../combat.js';
import { cityHasBuilding, hasWonderEffect, refreshCityTileOwnership } from '../utils.js';
import { grantAdvance, getAvailableResearch } from '../research.js';
import { dispatchEvents, EVENT_UNIT_KILLED } from '../events.js';
import { declareWar as diplomacyDeclareWar, getTreatyFlags, TF } from '../diplomacy.js';

import { makeUnit, killUnit, captureCity, checkCivElimination, discoverContacts, checkSenateVeto, getCityName, assignInitialWorkers, radiusTileCoords } from './helpers.js';
import { getBarbUnitType } from './barbarians.js';

// ── #139 LONGMOVE counter: binary threshold from FUN_0059062c ──
const LONGMOVE_THRESHOLD = 0x2f; // 47 — after this many goto moves, cancel goto to prevent infinite loops

// ── Goody hut (tribal village) outcomes ──
// Faithful to decompiled FUN_0058f040 (process_goody_hut)

/** Check if ANY civ in the game has discovered a tech. */
function anyoneHasTech(state, techId) {
  if (techId < 0) return true;
  if (!state.civTechs) return false;
  for (let c = 1; c < 8; c++) {
    if (!(state.civsAlive & (1 << c))) continue;
    if (state.civTechs[c]?.has(techId)) return true;
  }
  return false;
}

/**
 * Pick mercenary unit type per binary FUN_0058f040 lines 5031-5078.
 * Two classes: offensive (cavalry line) and defensive (infantry line).
 * 50% coin flip picks class. Tech checks use global tech-discovered flags.
 *
 * Offensive: Knights(19) default if Chivalry(11) known.
 *   Cumulative overrides: Iron Working(55)→Crusaders(18),
 *   Feudalism(42)→Dragoons(20), Combined Arms(17)→Cavalry(11).
 *   No Chivalry: 1/3 Chariot(16) vs 2/3 Horsemen(15),
 *   + 50% Elephant(17) if Machine Tools(64) known.
 *
 * Defensive: Musketeers(8) default.
 *   Downgrade without techs: no Electricity(34)→Pikemen(7),
 *   no Electronics(35)→Legion(5), no Engineering(39)→Archers(4).
 */
function getHutMercType(state) {
  const rng = state.rng;

  // Offensive unit (binary local_14)
  let offensive = 19; // Knights (default when Chivalry known)
  if (!anyoneHasTech(state, 11)) {
    // No Chivalry: choose from early units
    offensive = (rng.nextInt(3) === 0) ? 16 : 15; // 1/3 Chariot, 2/3 Horsemen
    if (anyoneHasTech(state, 64) && rng.nextInt(2) !== 0) {
      offensive = 17; // Machine Tools → 50% Elephant
    }
  }
  // Cumulative overrides (each later tech overrides)
  if (anyoneHasTech(state, 55)) offensive = 18; // Iron Working → Crusaders
  if (anyoneHasTech(state, 42)) offensive = 20; // Feudalism → Dragoons
  if (anyoneHasTech(state, 17)) offensive = 11; // Combined Arms → Cavalry

  // Defensive unit (binary local_c)
  let defensive = 8; // Musketeers (default)
  if (!anyoneHasTech(state, 34)) defensive = 7; // no Electricity → Pikemen
  if (!anyoneHasTech(state, 35)) defensive = 5; // no Electronics → Legion
  if (!anyoneHasTech(state, 39)) defensive = 4; // no Engineering → Archers

  // 50% coin flip: offensive vs defensive
  return (rng.nextInt(2) === 0) ? offensive : defensive;
}

/**
 * I.3: Resolve a goody hut encounter with full outcome table.
 * #48: Binary uses uniform rand()%5, NOT difficulty-weighted distribution.
 * Outcomes (5 equal chances):
 *   0: Advanced Tribe (found city with some buildings)
 *   1: Mercenary unit (friendly unit joins, era-based)
 *   2: Gold (25-100g scaled by era)
 *   3: Technology (random no-prereq tech civ doesn't have)
 *   4: Barbarian uprising (spawn 4-8 hostile barbarians)
 *
 * Map reveal and settler are subsumed into the above outcomes via suppression rules.
 */
export function resolveGoodyHut(state, mapBase, unit, civSlot) {
  const turnNum = state.turn?.number || 0;
  const hasCities = state.cities.some(c => c.owner === civSlot && c.size > 0);
  const civCityCount = state.cities.filter(c => c.owner === civSlot && c.size > 0).length;
  const earlyNoCities = civCityCount === 0 && turnNum < 50;

  // Distance to nearest own city (used by barbarian suppression)
  let nearestCityDist = 999;
  for (const c of state.cities) {
    if (c.owner !== civSlot || c.size <= 0) continue;
    let dx = Math.abs(unit.gx - c.gx);
    if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
    const dy = Math.abs(unit.gy - c.gy);
    nearestCityDist = Math.min(nearestCityDist, dx + dy);
  }

  const rng = state.rng;

  // #48: Uniform distribution — rand()%5 per binary FUN_0058f040
  // Binary outcome indices: 0=advancedTribe, 1=mercenary, 2=gold, 3=barbarians, 4=tech
  let outcome = rng.nextInt(5);

  // Suppression rules (from binary FUN_0058f040)
  if (outcome === 0 && nearestCityDist < 4) outcome = 1;   // too close to city for advanced tribe
  if (outcome === 0 && civCityCount === 0 && turnNum < 50) {
    // Binary lines 4978-4989: if no cities and turn < 50, check homeless settler count
    const homelessSettlers = state.units.filter(u =>
      u.gx >= 0 && (UNIT_ROLE[u.type] ?? 0) === 5 && (u.homeCityId == null || u.homeCityId < 0)
    ).length;
    if (homelessSettlers >= 2) outcome = 1;  // too many settlers → mercenary
  }
  // Binary line 5118-5121: barbarians suppressed if near city OR early no-cities
  if (outcome === 3 && (nearestCityDist < 4 || earlyNoCities)) outcome = 1;
  // Binary line 5216: tech suppressed if turn 0 OR this civ has tech 38
  if (outcome === 4 && (turnNum === 0 || state.civTechs?.[civSlot]?.has(38))) outcome = 2;
  if (NON_COMBAT_TYPES.has(unit.type) && outcome === 3) outcome = 2; // noncombat unit → gold

  switch (outcome) {
    case 0: { // Advanced Tribe — found a city with some buildings
      const terrain = mapBase.getTerrain(unit.gx, unit.gy);
      if (terrain === 10) return hutGiveGold(state, civSlot, state, rng);
      let tooClose = false;
      for (const c of state.cities) {
        if (c.size <= 0) continue;
        let dx = Math.abs(unit.gx - c.gx);
        if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
        const dy = Math.abs(unit.gy - c.gy);
        if (dx + dy <= 3) { tooClose = true; break; }
      }
      if (tooClose) return hutGiveMerc(state, civSlot, unit, rng);

      const cityName = getCityName(civSlot, state.cities, state.civs);
      // #48: Late-game cities can be up to size 4 with multiple buildings
      // (Granary, Temple, Marketplace, Library if tech allows)
      const buildings = new Set();
      buildings.add(3); // Granary — always present
      if (turnNum > 100) buildings.add(4); // Temple after early game
      if (turnNum > 200) buildings.add(5); // Marketplace in mid-game
      const civTechs = state.civTechs?.[civSlot];
      if (turnNum > 250 && civTechs && civTechs.has(84)) buildings.add(6); // Library if civ has Writing (tech 84)
      const isFirstCity = state.cities.filter(c => c.owner === civSlot && c.size > 0).length === 0;
      if (isFirstCity) buildings.add(1); // Palace

      // #48: City size scales with era: 1-2 early, up to 4 late-game
      let maxSize = 2;
      if (turnNum > 150) maxSize = 3;
      if (turnNum > 300) maxSize = 4;

      const newCity = {
        name: cityName, owner: civSlot, originalOwner: civSlot,
        size: 1 + rng.nextInt(maxSize),
        gx: unit.gx, gy: unit.gy,
        cx: unit.gx * 2 + (unit.gy % 2), cy: unit.gy,
        hasWalls: false, hasPalace: isFirstCity,
        civilDisorder: false, weLoveKingDay: false, isOccupied: false,
        workedTiles: [], specialists: [], buildings,
        foodInBox: 0, shieldsInBox: 0,
        itemInProduction: { type: 'unit', id: 2 },
      };
      state.cities = [...state.cities, newCity];
      const newCityIndex = state.cities.length - 1;
      newCity.workedTiles = assignInitialWorkers(unit.gx, unit.gy, newCity.size, newCity, newCityIndex, state, mapBase);

      const cityTileIdx = unit.gy * mapBase.mw + unit.gx;
      if (mapBase.tileData[cityTileIdx]) {
        mapBase.tileData[cityTileIdx].improvements = { ...mapBase.tileData[cityTileIdx].improvements, city: true, road: true };
        mapBase.tileData[cityTileIdx].tileOwnership = civSlot;
      }
      for (let ri = 0; ri < 20; ri++) {
        const rpos = radiusTileCoords(newCity.gx, newCity.gy, ri, mapBase);
        if (!rpos) continue;
        const rTile = mapBase.tileData[rpos.gy * mapBase.mw + rpos.gx];
        if (rTile && (rTile.tileOwnership === 0 || rTile.tileOwnership === 0x0F)) rTile.tileOwnership = civSlot;
      }
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, newCity.gx, newCity.gy, mapBase.wraps, 2);
      return { type: 'advancedTribe', cityName, cityIndex: newCityIndex };
    }

    case 2: return hutGiveGold(state, civSlot, state, rng);

    case 4: { // Technology (binary case 4)
      const available = getAvailableResearch(state, civSlot);
      if (available.length === 0) return hutGiveGold(state, civSlot, state, rng);
      const techId = available[rng.nextInt(available.length)];
      grantAdvance(state, civSlot, techId);
      return { type: 'tech', advanceId: techId, advanceName: ADVANCE_NAMES[techId] };
    }

    case 1: return hutGiveMerc(state, civSlot, unit, rng);

    case 3: { // Barbarian uprising (binary case 3, FUN_0058f040:5164-5214)
      // Binary: iterate 8 directions, step by clamp(4 - civCityCount, 1, 4)
      // More cities → smaller step → more barbarians spawned
      const civCityCount = state.cities.filter(c => c.owner === civSlot && c.size > 0).length;
      const step = Math.max(1, Math.min(4, 4 - civCityCount));

      const spawnLocs = [];
      for (let di = 0; di < 8; di++) {
        const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        // Binary uses (turnNum + index) & 7 to pick direction
        const dirIdx = (turnNum + di) & 7;
        const dest = resolveDirection(unit.gx, unit.gy, dirs[dirIdx], mapBase);
        if (!dest) continue;
        if (mapBase.getTerrain(dest.gx, dest.gy) === 10) continue;
        if (state.cities.some(c => c.gx === dest.gx && c.gy === dest.gy && c.size > 0)) continue;
        if (state.units.some(u => u.gx === dest.gx && u.gy === dest.gy && u.gx >= 0)) continue;
        spawnLocs.push(dest);
      }

      state.units = [...state.units];
      let spawned = 0;
      for (let idx = 0; idx <= 7; idx += step) {
        if (idx >= spawnLocs.length) break;
        const loc = spawnLocs[idx];
        const barbType = getBarbUnitType(state);
        state.units.push(makeUnit(barbType, 0, loc.gx, loc.gy, UNIT_MOVE_POINTS[barbType] * MOVEMENT_MULTIPLIER));
        spawned++;
      }
      return { type: 'barbarians', count: spawned };
    }

    default: return { type: 'nothing' };
  }
}

/** Helper: give gold from goody hut.
 * Binary FUN_0058f040 case 2 (lines 5093-5106):
 *   base = 50 gold; 1/3 chance to modify based on difficulty:
 *   roll rand()%10 - difficulty + 2: if < 5 → 25 gold, else → 100 gold.
 *   After year 1000 (DAT_00655afa > 1000): double. */
function hutGiveGold(state, civSlot, gameState, rng) {
  const diffIdx = DIFFICULTY_KEYS.indexOf(gameState.difficulty || 'chieftain');
  const turnNum = gameState.turn?.number || 0;
  let amount = 50;
  if (rng.nextInt(3) === 0) {
    const roll = rng.nextInt(10) - diffIdx + 2;
    amount = roll < 5 ? 25 : 100;
  }
  if (turnNum > 200) amount <<= 1; // binary: DAT_00655afa > 1000 (year > 1000 ≈ turn 200)
  if (state.civs?.[civSlot]) {
    state.civs = state.civs.map((c, i) => i === civSlot ? { ...c, treasury: (c.treasury || 0) + amount } : c);
  }
  return { type: 'gold', amount };
}

/** Helper: give mercenary unit from goody hut. */
function hutGiveMerc(state, civSlot, unit, rng) {
  const unitType = getHutMercType(state);
  const mercMoves = (UNIT_MOVE_POINTS[unitType] || 1) * MOVEMENT_MULTIPLIER;
  state.units = [...state.units, makeUnit(unitType, civSlot, unit.gx, unit.gy, mercMoves)];
  return { type: 'unit', unitType, unitName: UNIT_NAMES[unitType], mercenaryIndices: [state.units.length - 1] };
}

/**
 * Handle the MOVE_UNIT action.
 * @param {object} state - mutable clone of game state
 * @param {object} prev - previous immutable state
 * @param {object} mapBase - immutable map data
 * @param {object} action - { type, unitIndex, dir }
 * @param {number} civSlot - acting player's civ slot
 */
export function handleMoveUnit(state, prev, mapBase, action, civSlot) {
  const { unitIndex, dir } = action;
  const unit = { ...state.units[unitIndex] };
  const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
  // Save attacker origin for combat animation (before position changes)
  const atkOriginGx = unit.gx;
  const atkOriginGy = unit.gy;

  // ── #139: LONGMOVE counter — prevent infinite goto loops ──
  // Binary FUN_0059062c: counter increments each move, +0x0F if backtracking.
  // If counter exceeds 47 (0x2F), cancel goto to prevent infinite loops.
  if (unit.orders === 'goto') {
    const prevCounter = unit.longMoveCounter || 0;
    // Detect backtracking: if direction reversed from last move
    let increment = 1;
    if (unit.lastMoveDir) {
      const oppDirs = { N: 'S', S: 'N', E: 'W', W: 'E', NE: 'SW', SW: 'NE', NW: 'SE', SE: 'NW' };
      if (oppDirs[dir] === unit.lastMoveDir) increment += 0x0f; // backtrack penalty
    }
    const newCounter = prevCounter + increment;
    unit.longMoveCounter = newCounter;
    unit.lastMoveDir = dir;
    if (newCounter > LONGMOVE_THRESHOLD) {
      // Cancel goto — unit is stuck in a loop
      unit.orders = 'none';
      unit.goToX = undefined;
      unit.goToY = undefined;
      unit.longMoveCounter = 0;
      state.units[unitIndex] = unit;
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'longMoveCancel',
        unitIndex, unitType: unit.type, civSlot,
        gx: unit.gx, gy: unit.gy,
      });
      return;
    }
  } else {
    // Reset counter when not in goto mode
    unit.longMoveCounter = 0;
  }

  // ── #140: Fatigue dialog — allow one-more-move at low MP instead of hard reject ──
  // Binary FUN_0059062c: at 0 MP, unit can still attempt one more move with confirmation.
  // The action.allowFatigue flag is set by the client when the player confirms.
  // Without it, the server rejects moves at 0 MP for non-air units that have no free-move
  // exceptions (railroads, roads, etc).
  // NOTE: Air units always use all MP; this only applies to ground/sea.
  if (unit.movesLeft <= 0 && !action.allowFatigue) {
    const domain = UNIT_DOMAIN[unit.type] ?? 0;
    if (domain !== 1) { // air units handled differently
      // Check if the destination has a railroad or road (cost 0 or 1) — always allowed
      const fatigueCost = moveCost(unit.type, mapBase, unit.gx, unit.gy, dest.gx, dest.gy);
      if (fatigueCost > 1) {
        // #141: Clear goto on failed move
        if (unit.orders === 'goto') {
          unit.orders = 'none';
          unit.goToX = undefined;
          unit.goToY = undefined;
          state.units[unitIndex] = unit;
        }
        // Signal fatigue — client should prompt for confirmation
        state.fatiguePrompt = { unitIndex, dir, gx: unit.gx, gy: unit.gy };
        return;
      }
    }
  }

  // Check for enemy units at destination
  const enemiesAtDest = [];
  for (let i = 0; i < state.units.length; i++) {
    const u = state.units[i];
    if (u.gx === dest.gx && u.gy === dest.gy && u.owner !== unit.owner && u.gx >= 0) {
      enemiesAtDest.push(i);
    }
  }

  if (enemiesAtDest.length > 0) {
    // ── Combat ──
    const defCivSlot = state.units[enemiesAtDest[0]].owner;
    if (!state.treaties) state.treaties = {};
    const warKey = civSlot < defCivSlot ? `${civSlot}-${defCivSlot}` : `${defCivSlot}-${civSlot}`;

    // Binary FUN_00580341:273-274: alliance check — cannot attack allies
    // (&DAT_0064c6c0)[defender * 4 + attacker * 0x594] & 8 → return 1 (abort)
    if (state.treaties[warKey] === 'alliance') {
      return; // allies cannot attack each other
    }

    // Establish contact if this is the first encounter, then auto-declare war
    if (state.treaties[warKey] === undefined) {
      // First contact via combat — establish contact then immediately go to war
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'firstContact', civA: civSlot, civB: defCivSlot });
    }
    if (state.treaties[warKey] !== 'war') {
      // F.2: Senate war veto — check before attacking a non-war civ
      const combatSenateCheck = checkSenateVeto(state, mapBase, civSlot, defCivSlot);
      if (!state.turnEvents) state.turnEvents = [];
      for (const evt of combatSenateCheck.events) {
        state.turnEvents.push(evt);
      }
      if (combatSenateCheck.blocked) return; // Senate blocks the attack

      // Declare war via diplomacy module (handles reputation, alliances, trade routes)
      const combatWarResult = diplomacyDeclareWar(state, mapBase, civSlot, defCivSlot);
      for (const evt of combatWarResult.events) {
        state.turnEvents.push(evt);
      }
    }

    // ── Gap 38: SDI missile interception (from FUN_0057f9e3) ──
    // When a missile unit (UNIT_DESTROYED_AFTER_ATTACK, attack < 99) attacks,
    // check if any city NOT owned by the attacker has SDI Defense (building 17)
    // within isometric distance < 4 of the target tile. If so, the missile is
    // intercepted: destroy the missile, cancel combat, emit event.
    // Nuclear missiles (attack=99) bypass SDI.
    if (UNIT_DESTROYED_AFTER_ATTACK.has(unit.type) && (UNIT_ATK[unit.type] || 0) < 99) {
      let sdiIntercepted = false;
      let sdiCityName = '';
      let sdiCityOwner = -1;
      for (const city of state.cities) {
        if (!city || city.size <= 0 || city.owner === civSlot) continue;
        if (!city.buildings || !city.buildings.has(17)) continue;
        // Compute isometric distance: convert gx/gy to doubled-X coords, then (abs_dx + abs_dy) >> 1
        const cx1 = dest.gx * 2 + (dest.gy % 2);
        const cy1 = dest.gy;
        const cx2 = city.gx * 2 + (city.gy % 2);
        const cy2 = city.gy;
        let dx = Math.abs(cx1 - cx2);
        if (mapBase.wraps) dx = Math.min(dx, mapBase.mw * 2 - dx);
        const dy = Math.abs(cy1 - cy2);
        const dist = (dx + dy) >> 1;
        if (dist < 4) {
          sdiIntercepted = true;
          sdiCityName = city.name || '';
          sdiCityOwner = city.owner;
          break;
        }
      }
      if (sdiIntercepted) {
        // Destroy the missile
        unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;
        state.units[unitIndex] = unit;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'sdiIntercept',
          unitType: unit.type,
          unitName: UNIT_NAMES[unit.type],
          owner: civSlot,
          targetGx: dest.gx, targetGy: dest.gy,
          sdiCityName, sdiCityOwner,
        });
        state.combatResult = {
        atkGx: atkOriginGx, atkGy: atkOriginGy,
          type: 'sdiIntercept',
          attacker: unit.type, atkOwner: civSlot,
          gx: dest.gx, gy: dest.gy,
          sdiCityName, sdiCityOwner,
        };
        return;
      }
    }

    // ── Gap 39: Diplomat/spy intercept at target tile ──
    // Binary FUN_00580341: when defender stack at target contains a diplomat (type 46)
    // or spy (type 47), the diplomat/spy is consumed to cancel combat.
    // The attacker is NOT destroyed; combat simply doesn't happen.
    {
      let diplomatIdx = -1;
      for (const ei of enemiesAtDest) {
        const eu = state.units[ei];
        if (eu.gx >= 0 && (eu.type === 46 || eu.type === 47)) {
          diplomatIdx = ei;
          break;
        }
      }
      if (diplomatIdx >= 0) {
        const diplomat = state.units[diplomatIdx];
        // Consume the diplomat/spy
        killUnit(state, diplomatIdx);
        // Attacker is not destroyed but combat is cancelled
        unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
        state.units[unitIndex] = unit;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'diplomatIntercept',
          diplomatType: diplomat.type,
          diplomatName: UNIT_NAMES[diplomat.type],
          diplomatOwner: diplomat.owner,
          attackerType: unit.type,
          attackerOwner: civSlot,
          gx: dest.gx, gy: dest.gy,
        });
        state.combatResult = {
        atkGx: atkOriginGx, atkGy: atkOriginGy,
          type: 'diplomatIntercept',
          attacker: unit.type, atkOwner: civSlot,
          defender: diplomat.type, defOwner: diplomat.owner,
          gx: dest.gx, gy: dest.gy,
        };
        return;
      }
    }

    // Find best defender using calcStackBestDefender (FUN_0057e6e2)
    const defTerrain = mapBase.getTerrain(dest.gx, dest.gy);
    const defCity = state.cities.find(c => c.gx === dest.gx && c.gy === dest.gy && c.owner !== unit.owner);
    const defInCity = !!defCity;
    const defCityHasWalls = defInCity && (cityHasBuilding(defCity, 8) || hasWonderEffect(state, defCivSlot, 6));
    const defImp = mapBase.getImprovements(dest.gx, dest.gy);
    const defHasFortress = !!(defImp && defImp.fortress);
    const defOnRiver = !!(mapBase.hasRiver && mapBase.hasRiver(dest.gx, dest.gy));
    const defCityBuildings = defCity ? defCity.buildings : null;

    // Use calcStackBestDefender for best defender selection
    let bestDefIdx = calcStackBestDefender(dest.gx, dest.gy, unit.type, state, mapBase);
    if (bestDefIdx < 0) bestDefIdx = enemiesAtDest[0]; // fallback

    const defender = { ...state.units[bestDefIdx] };
    // Capture pre-combat veteran status for combat log
    const attacker_preCombat_veteran = unit.veteran;
    const defender_preCombat_veteran = defender.veteran;

    // Detect amphibious attack: attacker is a land unit on an ocean tile (carried by ship)
    const atkDomainCheck = UNIT_DOMAIN[unit.type] ?? 0;
    const atkTerrain = mapBase.getTerrain(unit.gx, unit.gy);
    const isAmphibious = atkDomainCheck === 0 && atkTerrain === 10; // land unit on ocean = on a ship

    // Check if defender's/attacker's civ has Great Wall wonder
    const defenderHasGreatWall = defInCity && hasWonderEffect(state, defCivSlot, 6);
    const attackerHasGreatWall = hasWonderEffect(state, civSlot, 6);

    // Palace / small-city double-roll: check if defending city has Palace (building 1) or size < 8
    const defCityHasPalace = defInCity && defCity.buildings && defCity.buildings.has(1);
    const defCitySize = defCity ? (defCity.size || 0) : 0;

    // Sun Tzu's War Academy (wonder 7): auto-promotes combat winners
    const attackerSunTzu = hasWonderEffect(state, civSlot, 7);
    const defenderSunTzu = hasWonderEffect(state, defCivSlot, 7);

    // Detect treaty violation: attacking a civ you had peace/ceasefire with
    let isTreatyViolation = false;
    if (state.treaties) {
      const prevTreaty = prev.treaties?.[warKey];
      if (prevTreaty && prevTreaty !== 'war' && prevTreaty !== undefined) {
        isTreatyViolation = true;
      }
    }

    // Build entropy seed from positions, turn, unit indices, and state version
    // so that repeated same-type combats produce different outcomes
    const turnNum_ = state.turn?.number || 0;
    const combatSeed = (unit.gx * 997 + unit.gy * 991 + dest.gx * 983 + dest.gy * 977 +
      unitIndex * 967 + bestDefIdx * 953 + turnNum_ * 941 + (state.version || 0) * 929);
    const combatOpts = {
      amphibious: isAmphibious,
      defenderHasGreatWall,
      attackerHasGreatWall,
      sneakAttack: isTreatyViolation,
      defCityHasPalace,
      defCitySize,
      treatyViolation: isTreatyViolation,
      attackerSunTzu,
      defenderSunTzu,
      humanPlayers: state.humanPlayers ?? 0xFF,
      defenderReputation: state.civs?.[defCivSlot]?.reputation ?? 100,
      singleRoundCombat: state.singleRoundCombat || false,
    };
    const result = resolveCombat(unit, defender, defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver, defCityBuildings, combatSeed, state.difficulty || 'chieftain', unit.movesLeft, combatOpts);

    const defOwner = defender.owner;

    // ── Treaty violation: set sneak attack flag ──
    if (isTreatyViolation) {
      if (!state.diplomacy) state.diplomacy = {};
      const dKey = `${civSlot}-${defCivSlot}`;
      state.diplomacy = { ...state.diplomacy, [dKey]: { ...(state.diplomacy[dKey] || {}), sneak: true, sneakTurn: turnNum_ } };
    }

    // ── Submarine retreat handling ──
    if (result.submarineRetreated) {
      // Submarine retreats with damage — neither side destroyed
      unit.movesRemain = result.atkHpLost;
      unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
      if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
      state.units[bestDefIdx] = { ...defender, movesRemain: result.defHpLost };
      state.units[unitIndex] = unit;
      state.combatResult = {
        atkGx: atkOriginGx, atkGy: atkOriginGy,
        type: 'subRetreat',
        attacker: unit.type, defender: defender.type,
        atkOwner: unit.owner, defOwner: defender.owner,
        gx: dest.gx, gy: dest.gy,
        atkHpLost: result.atkHpLost, defHpLost: result.defHpLost,
        rounds: result.rounds,
        atkMaxHp: result.atkMaxHp, defMaxHp: result.defMaxHp,
        atkFp: result.atkFp, defFp: result.defFp,
        atkStartHp: result.atkStartHp, defStartHp: result.defStartHp,
      };
      return;
    }

    // ── Single-round draw handling (#131) ──
    // Scenario flag: after one round of combat, both sides survive with damage.
    // Neither is destroyed; attacker stays on its tile, defender stays on its tile.
    if (result.singleRoundDraw) {
      unit.movesRemain = result.atkHpLost;
      unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
      if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
      state.units[bestDefIdx] = { ...defender, movesRemain: result.defHpLost };
      state.units[unitIndex] = unit;
      state.combatResult = {
        atkGx: atkOriginGx, atkGy: atkOriginGy,
        type: 'singleRoundDraw',
        attacker: unit.type, defender: defender.type,
        atkOwner: unit.owner, defOwner: defender.owner,
        gx: dest.gx, gy: dest.gy,
        atkHpLost: result.atkHpLost, defHpLost: result.defHpLost,
        rounds: result.rounds,
        atkMaxHp: result.atkMaxHp, defMaxHp: result.defMaxHp,
        atkFp: result.atkFp, defFp: result.defFp,
        atkStartHp: result.atkStartHp, defStartHp: result.defStartHp,
      };
      return;
    }

    // ── B.3: Fortress retreat handling ──
    // Defender on a fortress retreats to an adjacent land tile instead of dying.
    // Attacker advances to the defender's former position.
    if (result.fortressRetreat) {
      // Find a random adjacent land tile for the defender to retreat to (away from attacker)
      const retreatDirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      let retreatDest = null;
      // Shuffle directions using state RNG for determinism
      for (let ri = retreatDirs.length - 1; ri > 0; ri--) {
        const rj = state.rng.nextInt(ri + 1);
        [retreatDirs[ri], retreatDirs[rj]] = [retreatDirs[rj], retreatDirs[ri]];
      }
      for (const rd of retreatDirs) {
        const rDest = resolveDirection(dest.gx, dest.gy, rd, mapBase);
        if (!rDest) continue;
        // Must be land tile
        if (mapBase.getTerrain(rDest.gx, rDest.gy) === 10) continue;
        // Must not be the attacker's tile
        if (rDest.gx === unit.gx && rDest.gy === unit.gy) continue;
        // Must not have enemy units
        const hasEnemy = state.units.some(u => u.gx === rDest.gx && u.gy === rDest.gy && u.owner !== defender.owner && u.gx >= 0);
        if (hasEnemy) continue;
        retreatDest = rDest;
        break;
      }

      if (retreatDest) {
        // Move defender to retreat tile with 1 HP
        state.units[bestDefIdx] = {
          ...defender,
          gx: retreatDest.gx, gy: retreatDest.gy,
          x: retreatDest.gx * 2 + (retreatDest.gy % 2), y: retreatDest.gy,
          movesRemain: result.defHpLost, movesLeft: 0,
          orders: 'none',
        };
        // Attacker stays on its original tile (no auto-advance)
        unit.movesRemain = result.atkHpLost;
        unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
        if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
        if (result.atkVeteranPromo) unit.veteran = 1;
      } else {
        // No valid retreat tile — defender dies normally
        killUnit(state, bestDefIdx);
        // Attacker stays on its original tile (no auto-advance)
        unit.movesRemain = result.atkHpLost;
        unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
        if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
        if (result.atkVeteranPromo) unit.veteran = 1;
      }
      state.units[unitIndex] = unit;
      state.combatResult = {
        atkGx: atkOriginGx, atkGy: atkOriginGy,
        type: 'fortressRetreat',
        attacker: unit.type, defender: defender.type,
        atkOwner: unit.owner, defOwner: defender.owner,
        atkVeteran: !!attacker_preCombat_veteran, defVeteran: !!defender_preCombat_veteran,
        gx: dest.gx, gy: dest.gy,
        retreatGx: retreatDest?.gx, retreatGy: retreatDest?.gy,
        atkHpLost: result.atkHpLost, defHpLost: result.defHpLost,
        rounds: result.rounds,
        atkMaxHp: result.atkMaxHp, defMaxHp: result.defMaxHp,
        atkFp: result.atkFp, defFp: result.defFp,
        atkStartHp: result.atkStartHp, defStartHp: result.defStartHp,
        atkVeteranPromo: result.atkVeteranPromo,
      };
      // Update visibility at new positions
      if (unit.gx >= 0) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, unit.gx, unit.gy, mapBase.wraps);
        discoverContacts(state, mapBase, civSlot, unit.gx, unit.gy, 1);
      }
      return;
    }

    if (result.attackerWins) {
      // Defender destroyed
      killUnit(state, bestDefIdx);

      // ── #133: Kill counter — increment attacker's per-civ kill count ──
      // Binary ref: DAT_0064c7b6[owner*0x594 + unitType], capped at 255.
      // Track per-civ total kills for power graph and score calculations.
      if (!state.killCounters) state.killCounters = {};
      const atkKillKey = `${unit.owner}`;
      state.killCounters = { ...state.killCounters };
      state.killCounters[atkKillKey] = Math.min(255,
        (state.killCounters[atkKillKey] || 0) + 1);

      // Binary FUN_0059c575: record combat kill in per-civ ring buffer (300 entries)
      // Used by Military Advisor to display combat history.
      if (!state.combatHistory) state.combatHistory = {};
      const chKey = `${unit.owner}`;
      if (!state.combatHistory[chKey]) state.combatHistory[chKey] = [];
      const hist = [...state.combatHistory[chKey]];
      hist.push({
        turn: state.turn?.number || 0,
        atkType: unit.type, defType: defender.type,
        defOwner: defender.owner,
        gx: dest.gx, gy: dest.gy,
      });
      if (hist.length > 300) hist.shift(); // ring buffer: max 300 entries
      state.combatHistory = { ...state.combatHistory, [chKey]: hist };

      // Eject air units if a carrier (type 42) was destroyed
      if (defender.type === 42) {
        const ejectResult = ejectAirUnits(state, dest.gx, dest.gy, unit.owner);
        if (ejectResult.events.length > 0) {
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push(...ejectResult.events);
        }
      }

      // Scenario events: unit killed
      if (state.scenarioEvents && state.scenarioEvents.length > 0) {
        dispatchEvents(state, mapBase, EVENT_UNIT_KILLED, {
          unitType: defender.type, attacker: unit.owner, defender: defender.owner,
        });
      }

      // ── Phase 1 pop reduction (combat-time, walls-gated) ──
      // Binary FUN_00580341 lines 999-1006: when a defender dies at a city tile,
      // reduce city pop by 1 IF no City Walls, no Great Wall, not Chieftain+human.
      // This is SEPARATE from Phase 2 (always -1 at capture time in citycapture.js).
      // Net effect: -2 pop without walls, -1 with walls (for size 3+ cities).
      if (defInCity) {
        const cityAtBattle = state.cities.find(c =>
          c.gx === dest.gx && c.gy === dest.gy && c.size > 0);
        if (cityAtBattle) {
          const wallsBlock = cityAtBattle.buildings?.has?.(8); // City Walls
          const greatWallBlock = hasWonderEffect(state, cityAtBattle.owner, 6);
          const chieftainHumanBlock = (state.difficulty === 'chieftain' || state.difficulty === 0)
            && !!((state.humanPlayers || 0) & (1 << civSlot));
          if (!wallsBlock && !greatWallBlock && !chieftainHumanBlock) {
            const ci = state.cities.indexOf(cityAtBattle);
            if (ci >= 0) {
              state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
              const newCity = { ...state.cities[ci], size: cityAtBattle.size - 1 };
              state.cities[ci] = newCity;
              if (newCity.size <= 0) {
                // Binary FUN_00580341 lines 1018-1029: city destroyed IMMEDIATELY
                // when Phase 1 pop reduction brings size to 0.
                // 1. Delete city (mark size 0)
                state.cities[ci] = { ...newCity, size: 0 };
                const defOwner = cityAtBattle.owner;
                // 2. Kill all defending units still at this tile
                for (let ki = 0; ki < state.units.length; ki++) {
                  const ku = state.units[ki];
                  if (ku.gx === dest.gx && ku.gy === dest.gy && ku.owner === defOwner && ku.gx >= 0) {
                    killUnit(state, ki);
                  }
                }
                // 3. Kill all units HOMED to this city (anywhere on the map)
                // Binary delete_city (FUN_004413d1 lines 449-459): iterates all
                // units and kills any with homeCityId matching the destroyed city.
                for (let ki = 0; ki < state.units.length; ki++) {
                  const ku = state.units[ki];
                  if (ku.owner === defOwner && ku.gx >= 0 && ku.homeCityId === ci) {
                    killUnit(state, ki);
                  }
                }
                // 4. Clear city tile
                const cityTileIdx = dest.gy * mapBase.mw + dest.gx;
                if (mapBase.tileData?.[cityTileIdx]) {
                  mapBase.tileData[cityTileIdx].improvements = {
                    ...mapBase.tileData[cityTileIdx].improvements,
                    city: false,
                  };
                }
                // 5. Emit city destroyed event
                if (!state.turnEvents) state.turnEvents = [];
                state.turnEvents.push({
                  type: 'cityDestroyed', cityName: cityAtBattle.name,
                  civSlot: defOwner, attacker: civSlot,
                  gx: dest.gx, gy: dest.gy,
                });
                // 6. Refresh tile ownership for remaining cities (binary line 498)
                for (const rc of state.cities) {
                  if (rc.size > 0 && rc.owner > 0) {
                    refreshCityTileOwnership(rc, mapBase);
                  }
                }
                // 7. Check civ elimination (binary: thunk_kill_civ)
                checkCivElimination(state, defOwner, true);
              }
            }
          }
        }
      }

      // Gold reward for killing barbarian units (B.2: difficulty × 50)
      if (defender.owner === 0 && civSlot > 0) {
        const killGold = result.barbarianGold || 0;
        if (killGold > 0) {
          state.civs = state.civs !== prev.civs ? state.civs : [...prev.civs];
          const killerCiv = { ...state.civs[civSlot] };
          killerCiv.treasury = (killerCiv.treasury || 0) + killGold;
          state.civs[civSlot] = killerCiv;
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'barbarianGold',
            civSlot, gold: killGold,
          });
        }
      }

      // Veteran promotion for attacker
      if (result.atkVeteranPromo) unit.veteran = 1;
      unit.movesRemain = result.atkHpLost;

      // Stack wipe: on open ground (no city), kill ALL enemies (#20)
      // Binary: fortress without a city does NOT protect the stack from wipe.
      // Only cities provide stack protection.
      const hasProtection = defInCity;
      if (!hasProtection) {
        for (let i = 0; i < state.units.length; i++) {
          if (i !== bestDefIdx && state.units[i].gx === dest.gx &&
              state.units[i].gy === dest.gy && state.units[i].owner !== unit.owner &&
              state.units[i].gx >= 0) {
            killUnit(state, i);
          }
        }
      }

      // Attacker stays on its original tile after winning combat.
      // Player must issue a separate move command to advance to the tile.
      // Combat costs 1 MP but does NOT change the attacker's position.
      unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
      if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
    } else {
      // Attacker destroyed
      unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;

      // ── #133: Kill counter — increment defender's per-civ kill count ──
      if (!state.killCounters) state.killCounters = {};
      const defKillKey = `${defender.owner}`;
      state.killCounters = { ...state.killCounters };
      state.killCounters[defKillKey] = Math.min(255,
        (state.killCounters[defKillKey] || 0) + 1);

      // Veteran promotion for defender
      state.units[bestDefIdx] = { ...defender,
        veteran: result.defVeteranPromo ? 1 : defender.veteran,
        movesRemain: result.defHpLost };
    }

    state.units[unitIndex] = unit;
    state.combatResult = state.combatResult || {
      type: result.attackerWins ? 'atkWin' : 'defWin',
      attacker: unit.type, defender: defender.type,
      atkOwner: unit.owner, defOwner: defender.owner,
      atkVeteran: !!attacker_preCombat_veteran, defVeteran: !!defender_preCombat_veteran,
      gx: dest.gx, gy: dest.gy,
      atkGx: prev.units[unitIndex]?.gx ?? dest.gx, atkGy: prev.units[unitIndex]?.gy ?? dest.gy,
      atkHpLost: result.atkHpLost, defHpLost: result.defHpLost,
      rounds: result.rounds,
      atkMaxHp: result.atkMaxHp, defMaxHp: result.defMaxHp,
      atkFp: result.atkFp, defFp: result.defFp,
      atkStartHp: result.atkStartHp, defStartHp: result.defStartHp,
      effAtk: result.effAtk, effDef: result.effDef,
      defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver,
      defFortified: defender.orders === 'fortified',
      atkVeteranPromo: result.atkVeteranPromo,
      defVeteranPromo: result.defVeteranPromo,
    };

    // ── #134: Post-combat air fuel tracking ──
    // After combat, if the surviving attacker is an air unit, decrement fuel
    if (result.attackerWins && unit.gx >= 0) {
      const atkMaxFuel = UNIT_FUEL[unit.type];
      if (atkMaxFuel > 0) {
        const fuelResult = checkAirFuel(unit, unitIndex, state, mapBase);
        if (fuelResult.fuelRemaining >= 0) {
          unit.fuelRemaining = fuelResult.fuelRemaining;
          state.units[unitIndex] = unit;
          if (fuelResult.crashed) {
            killUnit(state, unitIndex);
            if (!state.turnEvents) state.turnEvents = [];
            state.turnEvents.push({ type: 'unitLost', unitType: unit.type, reason: 'fuel', civSlot });
          }
        }
      }
    }

    // ── #134: Defender scramble — nearby fighter scrambles to intercept air attacker ──
    // If the attacker is an air unit and defender wins, check for friendly fighters
    // at adjacent cities/airbases that can scramble to counter-attack
    if (!result.attackerWins && (UNIT_DOMAIN[unit.type] ?? 0) === 1) {
      for (let si = 0; si < state.units.length; si++) {
        const scrambleUnit = state.units[si];
        if (scrambleUnit.gx < 0 || scrambleUnit.owner !== defOwner) continue;
        // Only fighters (type 27) and stealth fighters (type 30) scramble
        if (scrambleUnit.type !== 27 && scrambleUnit.type !== 30) continue;
        if (scrambleUnit.movesLeft <= 0) continue;
        // Must be at a city or airbase adjacent to the combat tile
        let adjDx = Math.abs(scrambleUnit.gx - dest.gx);
        if (mapBase.wraps) adjDx = Math.min(adjDx, mapBase.mw - adjDx);
        const adjDy = Math.abs(scrambleUnit.gy - dest.gy);
        if (adjDx + adjDy > 2) continue; // must be adjacent (iso distance <= 1)
        // Emit scramble event
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'scramble',
          scrambleUnitIndex: si,
          scrambleType: scrambleUnit.type,
          scrambleOwner: scrambleUnit.owner,
          gx: dest.gx, gy: dest.gy,
        });
        break; // only one scramble per combat
      }
    }

    // Check civ elimination for the losing side
    const eliminatedCiv = result.attackerWins ? defOwner : unit.owner;
    checkCivElimination(state, eliminatedCiv, true);

    // NOTE: the binary's kill_civ (FUN_004AA378 in block_004A0000.c:3378)
    // does NOT spawn barbarians when a civ is destroyed by city capture —
    // verified by listing all functions called from kill_civ. Barbarian
    // uprisings come from goody huts and the periodic spawn timer
    // (gated by the barbarianActivity setting), not from civ deaths.
  } else {
    // ── Normal movement (no enemy at destination) ──
    // Binary FUN_0059062c handles several city-at-destination cases before moving:
    //   1. Allied city (diplomacy & 0x08): enter, stop unit, heal (lines 258-286)
    //   2. Peace/ceasefire city (& 0x06): EXPEL dialog — must break treaty (lines 357-389)
    //   3. Enemy war city (& 0x20): enter and capture (lines 664-673, 1000-1005)
    //   4. Own city: normal entry
    // We check these cases here before the normal move logic.
    let enterAlliedCity = false;
    {
      const destCity = state.cities.find(c =>
        c.gx === dest.gx && c.gy === dest.gy && c.owner !== civSlot && c.owner > 0 && c.size > 0);
      if (destCity) {
        const destCityOwner = destCity.owner;
        const keyA = Math.min(civSlot, destCityOwner);
        const keyB = Math.max(civSlot, destCityOwner);
        const cityKey = `${keyA}-${keyB}`;
        const cityTreaty = state.treaties?.[cityKey];

        if (cityTreaty === 'alliance') {
          // Allied city: unit will enter, heal, and stop (consume all MP at end)
          enterAlliedCity = true;
        } else if (cityTreaty === 'peace' || cityTreaty === 'ceasefire') {
          // Peace/ceasefire: must declare war to enter. Run Senate veto like combat.
          const cityEntrySenate = checkSenateVeto(state, mapBase, civSlot, destCityOwner);
          if (!state.turnEvents) state.turnEvents = [];
          for (const evt of cityEntrySenate.events) {
            state.turnEvents.push(evt);
          }
          if (cityEntrySenate.blocked) {
            // Senate blocks — clear goto and return
            if (unit.orders === 'goto') {
              unit.orders = 'none';
              unit.goToX = undefined;
              unit.goToY = undefined;
              state.units[unitIndex] = unit;
            }
            return;
          }
          // Declare war via diplomacy module (handles reputation, alliances, trade routes)
          const cityEntryWarResult = diplomacyDeclareWar(state, mapBase, civSlot, destCityOwner);
          for (const evt of cityEntryWarResult.events) {
            state.turnEvents.push(evt);
          }
        }
        // 'war' or no treaty: proceed with move (capture handled post-move)
      }
    }

    const prevGx = unit.gx, prevGy = unit.gy;
    const cost = moveCost(unit.type, mapBase, unit.gx, unit.gy, dest.gx, dest.gy);
    const domain = UNIT_DOMAIN[unit.type] ?? 0;
    const destTerrain = mapBase.getTerrain(dest.gx, dest.gy);
    const srcTerrain = mapBase.getTerrain(unit.gx, unit.gy);

    // ── C.4: Transport boarding — land unit moving to ocean tile ──
    if (domain === 0 && destTerrain === 10) {
      const transportIdx = findAvailableTransport(dest.gx, dest.gy, unit.owner, state.units);
      if (transportIdx < 0) {
        // No transport available — can't enter ocean, reject move
        // #141: Clear goto on failed move
        if (unit.orders === 'goto') {
          unit.orders = 'none'; unit.goToX = undefined; unit.goToY = undefined;
          state.units[unitIndex] = unit;
        }
        return;
      }
      // Board transport: move unit to transport's tile, costs 1 MP
      unit.gx = dest.gx;
      unit.gy = dest.gy;
      unit.x = dest.gx * 2 + (dest.gy % 2);
      unit.y = dest.gy;
      unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
      if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
      state.units[unitIndex] = unit;
      // Update visibility
      if (unit.gx >= 0) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, unit.gx, unit.gy, mapBase.wraps);
        discoverContacts(state, mapBase, civSlot, unit.gx, unit.gy, 1);
      }
      return;
    }

    // ── C.4: Disembarkation — land unit on ocean tile moving to land ──
    if (domain === 0 && srcTerrain === 10 && destTerrain !== 10) {
      unit.gx = dest.gx;
      unit.gy = dest.gy;
      unit.x = dest.gx * 2 + (dest.gy % 2);
      unit.y = dest.gy;
      // Disembarkation costs all remaining MP
      unit.movesLeft = 0;
      if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
      state.units[unitIndex] = unit;
      // Update visibility
      if (unit.gx >= 0) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, unit.gx, unit.gy, mapBase.wraps);
        discoverContacts(state, mapBase, civSlot, unit.gx, unit.gy, 1);
      }
      return;
    }

    // Probabilistic movement check (from Civ2 binary FUN_0059062c lines 712-729):
    // When a land unit has insufficient MP for terrain cost AND has already spent
    // some MP this turn, movement succeeds probabilistically: P = movesLeft / cost.
    // If check fails, all remaining MP are exhausted and unit does not move.
    if (domain === 0 && cost > 1 && unit.movesLeft < cost) {
      const totalMP = calcEffectiveMovementPoints(unit);
      if (unit.movesLeft < totalMP) {
        // Unit has already used some movement — probabilistic check
        const roll = state.rng.nextInt(cost); // 0 to cost-1
        if (unit.movesLeft <= roll) {
          // Failed: exhaust all remaining MP, do not move
          unit.movesLeft = 0;
          // #141: Clear goto on failed move
          if (unit.orders === 'goto') {
            unit.orders = 'none'; unit.goToX = undefined; unit.goToY = undefined;
          }
          state.units[unitIndex] = unit;
          return;
        }
      }
      // Else: fresh unit (full MP) or roll succeeded — proceed with move
    }

    console.log(`[move] Unit #${unitIndex} type=${unit.type} moving from (${unit.gx},${unit.gy}) to (${dest.gx},${dest.gy}), total units: ${state.units.length}`);
    unit.gx = dest.gx;
    unit.gy = dest.gy;
    unit.x = dest.gx * 2 + (dest.gy % 2);
    unit.y = dest.gy;

    // #119: Railroad cost is 0 (free movement), don't floor to 1
    unit.movesLeft = Math.max(0, unit.movesLeft - cost);

    // Wake from sleep/fortify/sentry
    if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';

    // Cancel any work order on move
    if (unit.orders === 'road' || unit.orders === 'irrigation' || unit.orders === 'mine' ||
        unit.orders === 'fortress' || unit.orders === 'airbase' || unit.orders === 'pollution' ||
        unit.orders === 'railroad') {
      unit.orders = 'none';
      unit.workTurns = 0;
    }

    // Naval transport: sea unit with carry capacity auto-moves cargo
    if (UNIT_DOMAIN[unit.type] === 2 && UNIT_CARRY_CAP[unit.type]) {
      for (let i = 0; i < state.units.length; i++) {
        const u = state.units[i];
        if (u.gx === prevGx && u.gy === prevGy && u.owner === unit.owner &&
            UNIT_DOMAIN[u.type] === 0 && u.gx >= 0) {
          state.units[i] = { ...u,
            gx: dest.gx, gy: dest.gy,
            x: dest.gx * 2 + (dest.gy % 2), y: dest.gy,
          };
        }
      }
      // C.4: Auto-load friendly units at destination tile onto the transport
      loadUnitsOntoShip(state, unitIndex, dest.gx, dest.gy);
    }

    // ── Capture undefended enemy city ──
    // Treaty-breaking (peace/ceasefire) is handled BEFORE the move in the city
    // entry check above (via diplomacyDeclareWar). By the time we get here,
    // the treaty should already be 'war' or was never set (barbarian/first contact).
    const enemyCity = state.cities.find(c =>
      c.gx === dest.gx && c.gy === dest.gy && c.owner !== civSlot && c.owner > 0 && c.size > 0);
    if (enemyCity && (UNIT_ATK[unit.type] || 0) > 0) {
      const defOwner = enemyCity.owner;
      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const cityIdx = state.cities.indexOf(enemyCity);
      if (cityIdx >= 0) {
        captureCity(state, prev, mapBase, cityIdx, civSlot, defOwner);
        state.combatResult = {
        atkGx: atkOriginGx, atkGy: atkOriginGy,
          type: 'capture', cityName: enemyCity.name, civSlot,
          gx: dest.gx, gy: dest.gy,
        };
        // Check civ elimination for the old owner
        checkCivElimination(state, defOwner, true);
        // NOTE: binary kill_civ does NOT spawn barbarians on civ death
        // (see move-unit.js:778 comment for verification details).
      }
    }

    // #64: Allied city entry — heal and STOP the unit
    // Binary FUN_0059062c:258-286: when entering allied city, unit heals maxHP/10
    // (damage reduction), consumes ~10% movement cost, then FUN_005b6787 consumes
    // all remaining MP (unit stops for the turn). Shows ALLIEDREPAIR message.
    if (enterAlliedCity && unit.gx >= 0) {
      const alliedCity = state.cities.find(c =>
        c.gx === unit.gx && c.gy === unit.gy && c.size > 0 && c.owner !== unit.owner);
      if (alliedCity) {
        // Heal: reduce damage by maxHP/10
        const maxHp = (UNIT_HP[unit.type] || 1) * 10;
        const healAmount = Math.floor(maxHp / 10);
        unit.movesRemain = Math.max(0, (unit.movesRemain || 0) - healAmount);
        // Stop unit: consume all remaining movement (binary FUN_005b6787)
        unit.movesLeft = 0;
        state.units[unitIndex] = unit;
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push({
          type: 'alliedCityEntry',
          cityName: alliedCity.name, cityOwner: alliedCity.owner,
          unitIndex, unitType: unit.type, civSlot,
        });
      }
    }

    // ── #8: Air fuel per-move check ──
    // Air units consume 1 fuel on each move (not once per turn).
    // If fuel reaches 0 and unit is not on city/carrier/airbase, destroy immediately.
    if ((UNIT_DOMAIN[unit.type] ?? 0) === 1) {
      const maxFuel = UNIT_FUEL[unit.type];
      if (maxFuel > 0) {
        const fuelResult = checkAirFuel(unit, unitIndex, state, mapBase);
        if (fuelResult.fuelRemaining >= 0) {
          unit.fuelRemaining = fuelResult.fuelRemaining;
        }
        if (fuelResult.crashed) {
          unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;
          state.units[unitIndex] = unit;
          killUnit(state, unitIndex);
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({ type: 'unitLost', unitType: unit.type, reason: 'fuel', civSlot });
          return;
        }
      }
    }

    state.units[unitIndex] = unit;
  }

  // ── #67: Submarine stealth — submarines only visible to adjacent units ──
  // After move, detect/reveal submarines based on adjacency to sub detectors.
  if (unit.gx >= 0) {
    if (UNIT_SUB_DETECTOR.has(unit.type)) {
      // Sub detector moved — reveal any enemy subs in adjacent tiles
      for (let si = 0; si < state.units.length; si++) {
        const su = state.units[si];
        if (su.gx < 0 || su.owner === civSlot) continue;
        if (!UNIT_SUBMARINE.has(su.type)) continue;
        let sdx = Math.abs(su.gx - unit.gx);
        if (mapBase.wraps) sdx = Math.min(sdx, mapBase.mw - sdx);
        const sdy = Math.abs(su.gy - unit.gy);
        if (sdx <= 1 && sdy <= 2 && sdx + sdy <= 2) {
          // Adjacent submarine detected — emit event and mark revealed
          state.units[si] = { ...state.units[si], subRevealed: true };
          if (!state.turnEvents) state.turnEvents = [];
          state.turnEvents.push({
            type: 'submarineDetected',
            subIndex: si, subType: su.type, subOwner: su.owner,
            detectorIndex: unitIndex, detectorType: unit.type, detectorOwner: civSlot,
            gx: su.gx, gy: su.gy,
          });
        }
      }
    }
    // Mark submarine stealth status on the moving unit
    if (UNIT_SUBMARINE.has(unit.type)) {
      let subRevealed = false;
      for (let di = 0; di < state.units.length; di++) {
        const du = state.units[di];
        if (du.gx < 0 || du.owner === civSlot) continue;
        if (!UNIT_SUB_DETECTOR.has(du.type)) continue;
        let ddx = Math.abs(du.gx - unit.gx);
        if (mapBase.wraps) ddx = Math.min(ddx, mapBase.mw - ddx);
        const ddy = Math.abs(du.gy - unit.gy);
        if (ddx <= 1 && ddy <= 2 && ddx + ddy <= 2) {
          subRevealed = true;
          break;
        }
      }
      state.units[unitIndex] = { ...state.units[unitIndex], subRevealed };
    }
  }

  // Update visibility for this civ around new position
  if (unit.gx >= 0) {
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, unit.gx, unit.gy, mapBase.wraps);
    // Check for first contact with other civs now visible
    discoverContacts(state, mapBase, civSlot, unit.gx, unit.gy, 1);

    // Binary FUN_004274a6 (process_unit_move_visibility) lines 2541-2685:
    // After a unit finishes moving, scan immediate neighbors for OTHER civs'
    // units. If a neighbor is non-allied (treaty flag bit TF.ALLIANCE clear),
    // cancel the moving unit's GOTO and wake adjacent sentries.
    //
    // Binary FUN_0042738c (cancel_goto_if_blocked): clears order if low nibble
    //   of order == 0xb (GOTO) AND unit AI role != 7 (caravan/freight keep
    //   going).
    // Binary FUN_004273e6 (cancel_goto_for_stack): wakes any sentry-order unit
    //   in the stack at the given position.
    //
    // Adjacency = Chebyshev distance 1 in logical (gx, gy) grid.
    const isAdjacent = (u1, u2) => {
      let dx = Math.abs(u1.gx - u2.gx);
      if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
      const dy = Math.abs(u1.gy - u2.gy);
      return dx <= 1 && dy <= 1 && (dx + dy) > 0;
    };
    const isAllied = (civA, civB) => {
      if (civA === civB) return true;
      if (civA === 0 || civB === 0) return false; // barbarians: never allied
      const flags = getTreatyFlags(state, civA, civB);
      return (flags & TF.ALLIANCE) !== 0;
    };

    // ── Cancel the moving unit's own GOTO if it's now next to a non-ally ──
    // Binary FUN_0042738c (cancel_goto_if_blocked) at block_00420000.c:2439-2446
    // checks `unit_type[+0xa] != 7` where +0xa is the AI Role byte from
    // RULES.TXT @UNITS — value 7 = caravan/freight (trade units), which keep
    // their GOTO even when blocked. JS UNIT_ROLE uses a +1 offset relative to
    // RULES.TXT (see espionage.js:224 comment), so JS role 8 = binary role 7
    // (caravan/freight). Air units are NOT exempt in the binary; the previous
    // JS check `UNIT_DOMAIN !== 1` was a JS-invented exemption.
    if (unit.orders === 'goto' && (UNIT_ROLE[unit.type] ?? 0) !== 8) {
      let blocking = false;
      for (let ei = 0; ei < state.units.length; ei++) {
        const e = state.units[ei];
        if (e.gx < 0 || e.owner === civSlot) continue;
        if (isAllied(civSlot, e.owner)) continue;
        if (isAdjacent(unit, e)) { blocking = true; break; }
      }
      if (blocking) {
        unit.orders = 'none';
        // Note: `unit` is the live reference into state.units; the move loop
        // writes back to the array, so this assignment is sufficient.
      }
    }

    // ── Wake nearby sentries / cancel nearby gotos for the moving civ's
    // own units when enemies become visible (existing D5/D6 behaviour) ──
    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (u.owner !== civSlot || u.gx < 0) continue;
      if (u.orders !== 'sentry' && u.orders !== 'goto') continue;
      // Check if any non-allied unit is adjacent
      let enemyAdj = false;
      for (let ei = 0; ei < state.units.length; ei++) {
        const e = state.units[ei];
        if (e.gx < 0 || e.owner === civSlot) continue;
        if (isAllied(civSlot, e.owner)) continue;
        if (isAdjacent(u, e)) { enemyAdj = true; break; }
      }
      if (!enemyAdj) continue;
      // Cancel GOTO for non-trade units (binary role != 7 = JS UNIT_ROLE != 8),
      // wake sentries unconditionally.
      if (u.orders === 'goto' && (UNIT_ROLE[u.type] ?? 0) !== 8) {
        state.units[ui] = { ...u, orders: 'none' };
      } else if (u.orders === 'sentry') {
        state.units[ui] = { ...u, orders: 'none' };
      }
    }
  }

  // ── Trespass check: entering another civ's territory during peace ──
  if (unit.gx >= 0 && civSlot > 0) {
    const trespassResult = checkTrespass(state, mapBase, civSlot, unit.gx, unit.gy);
    if (trespassResult.trespass) {
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({
        type: 'trespass',
        civSlot,
        ownerCiv: trespassResult.ownerCiv,
        gx: unit.gx,
        gy: unit.gy,
      });
    }
  }

  // ── #65: Diplomat expulsion — 3-stage escalation when enemy diplomat enters territory ──
  // Binary FUN_0059062c: when a diplomat/spy (type 46/47) enters territory of a civ
  // that has peace/ceasefire, the territory owner can expel them.
  // Stage 1: Warning (first offense) — event only
  // Stage 2: Expel (second offense) — diplomat teleported to nearest own city
  // Stage 3: War (third+ offense) — declare war on the trespassing civ
  if (unit.gx >= 0 && civSlot > 0 && (unit.type === 46 || unit.type === 47)) {
    const tileIdx65 = unit.gy * mapBase.mw + unit.gx;
    const tile65 = mapBase.tileData?.[tileIdx65];
    const tileOwner65 = tile65?.tileOwnership;
    if (tileOwner65 != null && tileOwner65 !== civSlot && tileOwner65 !== 0 && tileOwner65 !== 0x0F) {
      const dKey65 = civSlot < tileOwner65 ? `${civSlot}-${tileOwner65}` : `${tileOwner65}-${civSlot}`;
      const treaty65 = state.treaties?.[dKey65];
      if (treaty65 === 'peace' || treaty65 === 'ceasefire') {
        // Track escalation state per civ pair
        if (!state.diplomatExpulsions) state.diplomatExpulsions = {};
        const expKey = `${civSlot}-${tileOwner65}`;
        const stage = (state.diplomatExpulsions[expKey] || 0) + 1;
        state.diplomatExpulsions = { ...state.diplomatExpulsions, [expKey]: stage };
        if (!state.turnEvents) state.turnEvents = [];

        if (stage === 1) {
          // Warning
          state.turnEvents.push({
            type: 'diplomatExpulsionWarning',
            civSlot, ownerCiv: tileOwner65,
            unitIndex, unitType: unit.type,
            gx: unit.gx, gy: unit.gy,
          });
        } else if (stage === 2) {
          // Expel — teleport diplomat to nearest own city
          let nearestCity = null;
          let nearestDist = Infinity;
          for (const c of state.cities) {
            if (c.owner !== civSlot || c.size <= 0) continue;
            let cdx = Math.abs(c.gx - unit.gx);
            if (mapBase.wraps) cdx = Math.min(cdx, mapBase.mw - cdx);
            const cdy = Math.abs(c.gy - unit.gy);
            const dist = cdx + cdy;
            if (dist < nearestDist) { nearestDist = dist; nearestCity = c; }
          }
          if (nearestCity) {
            unit.gx = nearestCity.gx;
            unit.gy = nearestCity.gy;
            unit.x = nearestCity.gx * 2 + (nearestCity.gy % 2);
            unit.y = nearestCity.gy;
            unit.movesLeft = 0;
            state.units[unitIndex] = unit;
          }
          state.turnEvents.push({
            type: 'diplomatExpelled',
            civSlot, ownerCiv: tileOwner65,
            unitIndex, unitType: unit.type,
            toGx: unit.gx, toGy: unit.gy,
          });
        } else {
          // Stage 3+: Declare war
          const warResult65 = diplomacyDeclareWar(state, mapBase, tileOwner65, civSlot);
          for (const evt of warResult65.events) {
            state.turnEvents.push(evt);
          }
          state.turnEvents.push({
            type: 'diplomatExpulsionWar',
            civSlot, ownerCiv: tileOwner65,
            unitIndex, unitType: unit.type,
            gx: unit.gx, gy: unit.gy,
          });
        }
      }
    }
  }

  // ── C.2: Per-move trireme sinking check ──
  // Binary checks per-move, not per-turn. After each move, trireme in open ocean may sink.
  if (unit.gx >= 0 && unit.type === 32) {
    if (checkTriremeSinking(unit, unitIndex, state, mapBase, hasWonderEffect)) {
      killUnit(state, unitIndex);
      if (!state.turnEvents) state.turnEvents = [];
      state.turnEvents.push({ type: 'unitLost', unitType: unit.type, reason: 'triremeSinking', civSlot });
      return;
    }
  }

  // ── Goody hut check ──
  // #66: Only land units (domain 0) can trigger goody huts, per binary FUN_0058f040
  if (unit.gx >= 0 && civSlot > 0 && (UNIT_DOMAIN[unit.type] ?? 0) === 0) {
    const tileIdx = unit.gy * mapBase.mw + unit.gx;
    const tile = mapBase.tileData[tileIdx];
    if (tile && tile.goodyHut) {
      // Consume the hut
      tile.goodyHut = false;
      // Resolve outcome
      const hutResult = resolveGoodyHut(state, mapBase, unit, civSlot);
      if (hutResult) {
        state.goodyHutResult = { ...hutResult, civSlot };
      }
    }
  }

  // ── Sentry wake + AI alert: enemy units within 2 tiles wake up ──
  // Binary FUN_004273e6 (cancel_goto_for_stack) + FUN_005369f3 (ai_alert_nearby_units)
  if (unit.gx >= 0) {
    const wokenUnits = [];
    for (let si = 0; si < state.units.length; si++) {
      const su = state.units[si];
      if (su.owner === civSlot || su.gx < 0) continue;
      if (su.orders !== 'sentry' && su.orders !== 'sleep') continue;
      let sDx = Math.abs(su.gx - unit.gx);
      if (mapBase.wraps) sDx = Math.min(sDx, mapBase.mw - sDx);
      const sDy = Math.abs(su.gy - unit.gy);
      if (sDx + sDy <= 2) {
        // Binary FUN_005369f3: AI units get goto order toward the threat
        const isAI = !((state.humanPlayers || 0) & (1 << su.owner));
        if (isAI && (UNIT_ATK[su.type] || 0) > 0) {
          state.units[si] = { ...su, orders: 'goto', goToX: unit.gx, goToY: unit.gy };
        } else {
          state.units[si] = { ...su, orders: 'none' };
        }
        wokenUnits.push({ unitIndex: si, unitType: su.type, civSlot: su.owner });
      }
    }
    if (wokenUnits.length > 0) {
      state.unitsWoken = wokenUnits;
    }
  }
}
