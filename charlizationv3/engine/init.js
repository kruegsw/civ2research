// ═══════════════════════════════════════════════════════════════════
// init.js — Game initialization (server only)
//
// Two paths to start a game:
//   initFromSav()  — load a parsed .sav file, assign players to civs
//   initNewGame()  — generate map, place settlers, init civs
// ═══════════════════════════════════════════════════════════════════

import { createAccessors } from './state.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, LEADERS_TXT_NAMES } from './defs.js';
import { updateVisibility } from './visibility.js';

/**
 * Initialize game from a parsed .sav file.
 *
 * @param {object} parsed - output of Civ2Parser.parse()
 * @param {Array<{ seatIndex: number, name: string }>} seatList - seated players
 * @returns {{ mapBase: object, gameState: object }}
 */
export function initFromSav(parsed, seatList) {
  const mapBase = createAccessors(
    parsed.mw, parsed.mh, parsed.mapShape, parsed.mapSeed,
    parsed.tileData, parsed.knownImprovements,
  );
  // Keep immutable map extras
  mapBase.block3Data = parsed.block3Data;
  mapBase.paddingBlock = parsed.paddingBlock;

  // Build mutable game state from parsed data
  const units = parsed.units.map(u => ({
    ...u,
    movesLeft: UNIT_MOVE_POINTS[u.type] * MOVEMENT_MULTIPLIER,
  }));

  // Determine which civs are alive (from save)
  const civsAlive = parsed.civsAlive ?? 0xFF;

  // Find first alive non-barb civ for turn start
  let activeCiv = 1;
  for (let i = 1; i < 8; i++) {
    if (civsAlive & (1 << i)) { activeCiv = i; break; }
  }

  const gameState = {
    units,
    cities: parsed.cities,
    civs: parsed.civs,
    civTechCounts: parsed.civTechCounts,
    civTechs: parsed.civTechs,
    civsAlive,
    playerCiv: parsed.playerCiv,
    mapRevealed: parsed.mapRevealed,
    turnNumber: parsed.gameState?.turnsPassed ?? 0,
    activeCiv,
    version: 0,
    // Seat→civ mapping: seat index maps to civ slot
    seatCivMap: buildSeatCivMap(seatList, civsAlive),
    // Extra fields renderers need
    unitBySaveIndex: parsed.unitBySaveIndex,
    allUnits: parsed.allUnits,
    tail: parsed.tail,
    events: parsed.events,
    gapRecord: parsed.gapRecord,
    header: parsed.header,
    gameState: parsed.gameState,
    validation: parsed.validation,
  };

  return { mapBase, gameState };
}

/**
 * Initialize a new game from a generated map.
 *
 * @param {object} mapResult - output of generateMap() { mw, mh, mapShape, mapSeed, tileData }
 * @param {Array<{ seatIndex: number, name: string }>} seatList - seated players
 * @returns {{ mapBase: object, gameState: object }}
 */
export function initNewGame(mapResult, seatList) {
  const mapBase = createAccessors(
    mapResult.mw, mapResult.mh, mapResult.mapShape, mapResult.mapSeed,
    mapResult.tileData, null,
  );

  // Create settler + warrior per seated player (civ slots 1..N)
  const units = [];
  const civCount = seatList.length;
  const placements = findSettlerPlacements(mapBase, civCount);
  const STARTING_UNITS = [0, 2]; // Settlers, Warriors

  for (let i = 0; i < civCount; i++) {
    const civSlot = i + 1; // civs 1-7 (0 = barbarians)
    const pos = placements[i];
    for (const unitType of STARTING_UNITS) {
      units.push({
        type: unitType,
        owner: civSlot,
        gx: pos.gx, gy: pos.gy,
        x: pos.gx * 2 + (pos.gy % 2), y: pos.gy,
        veteran: 0,
        hpLost: 0,
        orders: 'none',
        movesMade: 0,
        movesLeft: UNIT_MOVE_POINTS[unitType] * MOVEMENT_MULTIPLIER,
        homeCityId: 0xFFFF,
        goToX: -1, goToY: -1,
        visFlag: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      });
    }
    // Mark visibility for initial position
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, pos.gx, pos.gy, mapBase.wraps);
  }

  // Civ alive bitmask: barbs + each seated player's civ
  let civsAlive = 0;
  for (let i = 0; i < civCount; i++) civsAlive |= (1 << (i + 1));

  const seatCivMap = {};
  for (let i = 0; i < seatList.length; i++) {
    seatCivMap[seatList[i].seatIndex] = i + 1;
  }

  const gameState = {
    units,
    cities: [],
    civs: buildInitialCivs(seatList),
    civTechCounts: new Array(8).fill(0),
    civTechs: null,
    civsAlive,
    playerCiv: 1,
    mapRevealed: false,
    turnNumber: 0,
    activeCiv: 1,
    version: 0,
    seatCivMap,
    unitBySaveIndex: null,
    allUnits: null,
  };

  return { mapBase, gameState };
}

/**
 * Build seat→civ mapping. For .sav files, assign seats to alive civs in order.
 */
function buildSeatCivMap(seatList, civsAlive) {
  const map = {};
  const aliveCivs = [];
  for (let i = 1; i < 8; i++) {
    if (civsAlive & (1 << i)) aliveCivs.push(i);
  }
  for (let i = 0; i < seatList.length; i++) {
    const civSlot = i < aliveCivs.length ? aliveCivs[i] : null;
    map[seatList[i].seatIndex] = civSlot;
  }
  return map;
}

/**
 * Find N placement positions for settlers on land, spread across the map.
 */
function findSettlerPlacements(mapBase, count) {
  const { mw, mh } = mapBase;
  const placements = [];

  // Simple strategy: divide map into vertical strips, pick center land tile
  const stripW = Math.floor(mw / count);
  for (let i = 0; i < count; i++) {
    const centerX = Math.floor(stripW * (i + 0.5));
    const centerY = Math.floor(mh / 2);
    // Search outward from center for land
    let found = false;
    for (let r = 0; r < Math.max(mw, mh) && !found; r++) {
      for (let dy = -r; dy <= r && !found; dy++) {
        for (let dx = -r; dx <= r && !found; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue; // only ring
          const gx = ((centerX + dx) % mw + mw) % mw;
          const gy = centerY + dy;
          if (gy < 2 || gy >= mh - 2) continue;
          const ter = mapBase.getTerrain(gx, gy);
          // Avoid ocean, mountains, glacier
          if (ter !== 10 && ter !== 5 && ter !== 7) {
            placements.push({ gx, gy });
            found = true;
          }
        }
      }
    }
    if (!found) placements.push({ gx: Math.floor(mw / 2), gy: Math.floor(mh / 2) });
  }

  return placements;
}

/**
 * Build initial civs array for a new game.
 * Default slot→civ: slot 1=Romans(0), slot 2=Babylonians(1), slot 3=Germans(2), etc.
 * This matches Civ2's default game setup (LEADERS.TXT order).
 */
function buildInitialCivs(seatList) {
  const civs = [];
  for (let i = 0; i < 8; i++) {
    const rulesCivNumber = i === 0 ? 0 : i - 1;
    civs.push({
      name: i === 0 ? 'Barbarians' : (LEADERS_TXT_NAMES[rulesCivNumber] || `Civ ${i}`),
      style: 0,
      government: i === 0 ? 0 : 1, // barbs=anarchy, others=despotism
      treasury: i === 0 ? 0 : 50,
      scienceRate: 5, taxRate: 5, luxuryRate: 0,
      rulesCivNumber,
    });
  }
  return civs;
}
