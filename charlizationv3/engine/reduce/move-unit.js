// ═══════════════════════════════════════════════════════════════════
// reduce/move-unit.js — MOVE_UNIT action handler + goody hut logic
// ═══════════════════════════════════════════════════════════════════

import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, UNIT_DOMAIN, UNIT_ATK, UNIT_CARRY_CAP, UNIT_NAMES, ADVANCE_NAMES, UNIT_FUEL } from '../defs.js';
import { resolveDirection, moveCost, calcEffectiveMovementPoints, findAvailableTransport, loadUnitsOntoShip, checkTrespass } from '../movement.js';
import { updateVisibility } from '../visibility.js';
import { resolveCombat, calcStackBestDefender, ejectAirUnits } from '../combat.js';
import { cityHasBuilding, hasWonderEffect } from '../utils.js';
import { grantAdvance, getAvailableResearch } from '../research.js';
import { dispatchEvents, EVENT_UNIT_KILLED } from '../events.js';
import { declareWar as diplomacyDeclareWar } from '../diplomacy.js';
import { getNumericYear } from '../year.js';
import { makeUnit, killUnit, captureCity, checkCivElimination, discoverContacts, checkSenateVeto, getCityName, assignInitialWorkers, radiusTileCoords } from './helpers.js';
import { spawnBarbarianUprising, getBarbUnitType } from './barbarians.js';

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
 * Pick mercenary unit type per Civ2 algorithm.
 * Two classes (50/50 coin flip): 2-move cavalry line, 1-move infantry line.
 * Tech checks use ANY civ's discoveries, not just the triggering civ.
 */
function getHutMercType(state) {
  const rng = state.rng;
  if (rng.random() < 0.5) {
    // 2-move class: Horsemen→Elephant→Knights→Crusaders→Dragoons→Riflemen
    if (anyoneHasTech(state, 17)) return 11; // Conscription → Riflemen
    if (anyoneHasTech(state, 42)) return 20; // Leadership → Dragoons
    if (anyoneHasTech(state, 55)) return 18; // Monotheism → Crusaders
    if (anyoneHasTech(state, 11)) return 19; // Chivalry → Knights
    if (anyoneHasTech(state, 64) && rng.random() < 0.5) return 17; // Polytheism → 50% Elephant
    return rng.random() < 0.67 ? 15 : 16; // 2/3 Horsemen, 1/3 Chariot
  } else {
    // 1-move class: Archers→Legion→Musketeers→Fanatics
    if (anyoneHasTech(state, 34)) return 8;  // Guerrilla Warfare → Fanatics
    if (anyoneHasTech(state, 35)) return 7;  // Gunpowder → Musketeers
    if (anyoneHasTech(state, 39)) return 5;  // Iron Working → Legion
    return 4; // Archers
  }
}

// I.3: Difficulty-based goody hut outcome weights
// [advancedTribe, mercenary, gold, tech, mapReveal, settler, barbarians]
const GOODY_HUT_WEIGHTS = {
  chieftain:     [15, 20, 25, 15, 10, 10, 5],
  warlord:       [12, 18, 20, 15, 10, 10, 15],
  prince:        [10, 15, 20, 15, 10,  8, 22],
  king:          [ 8, 15, 15, 15, 10,  7, 30],
  emperor:       [ 5, 12, 15, 13, 10,  5, 40],
  deity:         [ 3, 10, 10, 12, 10,  5, 50],
};

/**
 * I.3: Resolve a goody hut encounter with full outcome table.
 * Outcomes:
 *   0: Advanced Tribe (found city with some buildings)
 *   1: Mercenary unit (friendly unit joins, era-based)
 *   2: Gold (25-100g scaled by era)
 *   3: Technology (random no-prereq tech civ doesn't have)
 *   4: Map reveal (reveal area around hut)
 *   5: Settler (free settler unit)
 *   6: Barbarian uprising (spawn 4-8 hostile barbarians)
 *
 * Uses difficulty-based probability weights.
 */
export function resolveGoodyHut(state, mapBase, unit, civSlot) {
  const turnNum = state.turn?.number || 0;
  const hasCities = state.cities.some(c => c.owner === civSlot && c.size > 0);
  const earlyNoCities = !hasCities && turnNum < 50;

  const rng = state.rng;
  const difficulty = state.difficulty || 'chieftain';
  const weights = GOODY_HUT_WEIGHTS[difficulty] || GOODY_HUT_WEIGHTS.prince;

  // Weighted random selection
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let roll = rng.nextInt(totalWeight);
  let outcome = 0;
  for (let i = 0; i < weights.length; i++) {
    roll -= weights[i];
    if (roll < 0) { outcome = i; break; }
  }

  // Suppression rules
  if (outcome === 0 && turnNum < 100) outcome = 1;
  if (outcome === 6 && earlyNoCities) outcome = 1;
  if (outcome === 3 && anyoneHasTech(state, 38)) outcome = 2;
  if (outcome === 5 && anyoneHasTech(state, 28)) outcome = 2;
  const NONCOMBAT = new Set([0, 1, 46, 47, 48, 49, 50]);
  if (outcome === 6 && NONCOMBAT.has(unit.type)) outcome = 2;

  switch (outcome) {
    case 0: { // Advanced Tribe — found a city with some buildings
      const terrain = mapBase.getTerrain(unit.gx, unit.gy);
      if (terrain === 10) return hutGiveGold(state, civSlot, turnNum, rng);
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
      const buildings = new Set();
      buildings.add(3); // Granary
      if (turnNum > 150) buildings.add(4); // Temple after early game
      const isFirstCity = state.cities.filter(c => c.owner === civSlot && c.size > 0).length === 0;
      if (isFirstCity) buildings.add(1); // Palace

      const newCity = {
        name: cityName, owner: civSlot, originalOwner: civSlot,
        size: 1 + rng.nextInt(2),
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

    case 2: return hutGiveGold(state, civSlot, turnNum, rng);

    case 3: { // Technology
      const available = getAvailableResearch(state, civSlot);
      if (available.length === 0) return hutGiveGold(state, civSlot, turnNum, rng);
      const techId = available[rng.nextInt(available.length)];
      grantAdvance(state, civSlot, techId);
      return { type: 'tech', advanceId: techId, advanceName: ADVANCE_NAMES[techId] };
    }

    case 1: return hutGiveMerc(state, civSlot, unit, rng);

    case 4: { // Map reveal
      const bit = 1 << civSlot;
      const { mw, mh, tileData } = mapBase;
      const wraps = mapBase.wraps;
      let tilesRevealed = 0;
      for (let dy = -5; dy <= 5; dy++) {
        for (let dx = -5; dx <= 5; dx++) {
          if (Math.abs(dx) + Math.abs(dy) > 7) continue;
          let gx = unit.gx + dx;
          const gy = unit.gy + dy;
          if (gy < 0 || gy >= mh) continue;
          if (wraps) { gx = ((gx % mw) + mw) % mw; } else if (gx < 0 || gx >= mw) continue;
          const tile = tileData[gy * mw + gx];
          if (tile && !(tile.visibility & bit)) { tile.visibility |= bit; tilesRevealed++; }
        }
      }
      return { type: 'mapReveal', tilesRevealed };
    }

    case 5: { // Settler
      const settlerMoves = (UNIT_MOVE_POINTS[0] || 1) * MOVEMENT_MULTIPLIER;
      state.units = [...state.units, makeUnit(0, civSlot, unit.gx, unit.gy, settlerMoves)];
      return { type: 'settler', mercenaryIndices: [state.units.length - 1] };
    }

    case 6: { // Barbarian uprising (4-8 hostile barbarians)
      const barbType = getBarbUnitType(state);
      const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const count = 4 + rng.nextInt(5);
      let spawned = 0;
      for (let i = dirs.length - 1; i > 0; i--) {
        const j = rng.nextInt(i + 1);
        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
      }
      const spawnLocs = [];
      for (const dir of dirs) {
        const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
        if (!dest) continue;
        if (mapBase.getTerrain(dest.gx, dest.gy) === 10) continue;
        if (state.cities.some(c => c.gx === dest.gx && c.gy === dest.gy && c.size > 0)) continue;
        spawnLocs.push(dest);
      }
      state.units = [...state.units];
      for (let i = 0; i < count; i++) {
        if (spawnLocs.length === 0) break;
        const loc = spawnLocs[i % spawnLocs.length];
        state.units.push(makeUnit(barbType, 0, loc.gx, loc.gy, UNIT_MOVE_POINTS[barbType] * MOVEMENT_MULTIPLIER));
        spawned++;
      }
      return { type: 'barbarians', count: spawned };
    }

    default: return { type: 'nothing' };
  }
}

/** Helper: give gold from goody hut. */
function hutGiveGold(state, civSlot, turnNum, rng) {
  const year = getNumericYear(turnNum);
  let amount;
  if (year < -1000) amount = 25 + rng.nextInt(26);
  else if (year < 1) amount = 25 + rng.nextInt(51);
  else amount = 50 + rng.nextInt(51);
  if (year >= 1500) amount *= 2;
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
    // Establish contact if this is the first encounter, then auto-declare war
    const defCivSlot = state.units[enemiesAtDest[0]].owner;
    if (!state.treaties) state.treaties = {};
    const warKey = civSlot < defCivSlot ? `${civSlot}-${defCivSlot}` : `${defCivSlot}-${civSlot}`;
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
        // Attacker advances to defender's former position
        unit.gx = dest.gx; unit.gy = dest.gy;
        unit.x = dest.gx * 2 + (dest.gy % 2); unit.y = dest.gy;
        unit.movesRemain = result.atkHpLost;
        unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
        if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
        if (result.atkVeteranPromo) unit.veteran = 1;
      } else {
        // No valid retreat tile — defender dies normally
        killUnit(state, bestDefIdx);
        unit.gx = dest.gx; unit.gy = dest.gy;
        unit.x = dest.gx * 2 + (dest.gy % 2); unit.y = dest.gy;
        unit.movesRemain = result.atkHpLost;
        unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
        if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
        if (result.atkVeteranPromo) unit.veteran = 1;
      }
      state.units[unitIndex] = unit;
      state.combatResult = {
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

      // Stack wipe: on open ground (no city/fortress), kill ALL enemies
      const hasProtection = defInCity || defHasFortress;
      if (!hasProtection) {
        for (let i = 0; i < state.units.length; i++) {
          if (i !== bestDefIdx && state.units[i].gx === dest.gx &&
              state.units[i].gy === dest.gy && state.units[i].owner !== unit.owner &&
              state.units[i].gx >= 0) {
            killUnit(state, i);
          }
        }
      }

      // Attacker stays on its own tile after winning combat.
      // To capture a city or occupy the tile, the player must move there manually.
      // The attacker does NOT auto-advance.

      // Combat costs 1 MP (not all movement)
      unit.movesLeft = Math.max(0, unit.movesLeft - MOVEMENT_MULTIPLIER);
      if (unit.orders === 'fortified' || unit.orders === 'sleep' || unit.orders === 'sentry') unit.orders = 'none';
    } else {
      // Attacker destroyed
      unit.gx = -1; unit.gy = -1; unit.x = -1; unit.y = -1; unit.movesLeft = 0;

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
      defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver,
      defFortified: defender.orders === 'fortified',
      atkVeteranPromo: result.atkVeteranPromo,
      defVeteranPromo: result.defVeteranPromo,
    };

    // Check civ elimination for the losing side
    const eliminatedCiv = result.attackerWins ? defOwner : unit.owner;
    checkCivElimination(state, eliminatedCiv);

    // Barbarian uprising when a civ is destroyed via city capture
    if (result.attackerWins && defCity && eliminatedCiv > 0 &&
        !(state.civsAlive & (1 << eliminatedCiv))) {
      spawnBarbarianUprising(state, mapBase, dest.gx, dest.gy);
    }
  } else {
    // ── Normal movement (no enemy) ──
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
          state.units[unitIndex] = unit;
          return;
        }
      }
      // Else: fresh unit (full MP) or roll succeeded — proceed with move
    }

    unit.gx = dest.gx;
    unit.gy = dest.gy;
    unit.x = dest.gx * 2 + (dest.gy % 2);
    unit.y = dest.gy;

    // Deduct movement (minimum 1 third spent, even on railroad)
    unit.movesLeft = Math.max(0, unit.movesLeft - Math.max(cost, 1));

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
    const enemyCity = state.cities.find(c =>
      c.gx === dest.gx && c.gy === dest.gy && c.owner !== civSlot && c.owner > 0 && c.size > 0);
    if (enemyCity && (UNIT_ATK[unit.type] || 0) > 0) {
      const defOwner = enemyCity.owner;

      // D.3: Apply treaty-breaking flags when entering undefended enemy city
      if (state.treaties) {
        const capWarKey = civSlot < defOwner ? `${civSlot}-${defOwner}` : `${defOwner}-${civSlot}`;
        const capPrevTreaty = prev.treaties?.[capWarKey];
        if (capPrevTreaty && capPrevTreaty !== 'war' && capPrevTreaty !== undefined) {
          if (!state.diplomacy) state.diplomacy = {};
          const dKey = `${civSlot}-${defOwner}`;
          state.diplomacy = { ...state.diplomacy, [dKey]: { ...(state.diplomacy[dKey] || {}), sneak: true, sneakTurn: state.turn?.number || 0 } };
          // Break the treaty
          state.treaties = { ...state.treaties, [capWarKey]: 'war' };
        }
      }

      state.cities = state.cities !== prev.cities ? state.cities : [...prev.cities];
      const cityIdx = state.cities.indexOf(enemyCity);
      if (cityIdx >= 0) {
        captureCity(state, prev, mapBase, cityIdx, civSlot, defOwner);
        state.combatResult = {
          type: 'capture', cityName: enemyCity.name, civSlot,
          gx: dest.gx, gy: dest.gy,
        };
        // Check civ elimination for the old owner
        checkCivElimination(state, defOwner);
        // Barbarian uprising when a civ is destroyed via city capture
        if (defOwner > 0 && !(state.civsAlive & (1 << defOwner))) {
          spawnBarbarianUprising(state, mapBase, dest.gx, dest.gy);
        }
      }
    }

    state.units[unitIndex] = unit;
  }

  // Update visibility for this civ around new position
  if (unit.gx >= 0) {
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, unit.gx, unit.gy, mapBase.wraps);
    // Check for first contact with other civs now visible
    discoverContacts(state, mapBase, civSlot, unit.gx, unit.gy, 1);

    // D5/D6: Cancel goto orders and wake sentries when enemies become visible
    // Binary FUN_0042738c (cancel_goto_if_blocked) + FUN_004273e6 (cancel_goto_for_stack)
    for (let ui = 0; ui < state.units.length; ui++) {
      const u = state.units[ui];
      if (u.owner !== civSlot || u.gx < 0) continue;
      // Check if any enemy is now visible near this unit (radius 1 = 9 tiles)
      let enemyVisible = false;
      for (let ei = 0; ei < state.units.length; ei++) {
        const e = state.units[ei];
        if (e.owner === civSlot || e.owner === 0 || e.gx < 0) continue;
        let dx = Math.abs(u.gx - e.gx);
        if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
        const dy = Math.abs(u.gy - e.gy);
        if (dx <= 2 && dy <= 2 && dx + dy <= 3) { enemyVisible = true; break; }
      }
      if (!enemyVisible) continue;
      // D5: Cancel goto for non-air units
      if (u.orders === 'goto' && (UNIT_DOMAIN[u.type] ?? 0) !== 1) {
        state.units[ui] = { ...u, orders: 'none' };
      }
      // D6: Wake sentries (non-air land units or any sentry seeing enemies)
      else if (u.orders === 'sentry') {
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

  // ── Goody hut check ──
  if (unit.gx >= 0 && civSlot > 0) { // alive unit, non-barbarian
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

  // ── Sentry wake: enemy units with orders 'sentry' within 2 tiles wake up ──
  if (unit.gx >= 0) {
    const wokenUnits = [];
    for (let si = 0; si < state.units.length; si++) {
      const su = state.units[si];
      if (su.owner === civSlot || su.gx < 0 || su.orders !== 'sentry') continue;
      // Check within 2 tiles (Manhattan distance in gx,gy space)
      let sDx = Math.abs(su.gx - unit.gx);
      if (mapBase.wraps) sDx = Math.min(sDx, mapBase.mw - sDx);
      const sDy = Math.abs(su.gy - unit.gy);
      if (sDx + sDy <= 2) {
        state.units[si] = { ...su, orders: 'none' };
        wokenUnits.push({ unitIndex: si, unitType: su.type, civSlot: su.owner });
      }
    }
    if (wokenUnits.length > 0) {
      state.unitsWoken = wokenUnits;
    }
  }
}
