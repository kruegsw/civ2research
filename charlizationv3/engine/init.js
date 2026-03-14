// ═══════════════════════════════════════════════════════════════════
// init.js — Game initialization (server only)
//
// Two paths to start a game:
//   initFromSav()  — load a parsed .sav file, assign players to civs
//   initNewGame()  — generate map, place settlers, init civs
// ═══════════════════════════════════════════════════════════════════

import { createAccessors } from './state.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, LEADERS_TXT_NAMES, WONDER_NAMES } from './defs.js';
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

  const seatCivMap = buildSeatCivMap(seatList, civsAlive);

  // Build humanPlayers bitmask: bit N = 1 means civ N is human-controlled.
  // Civ 0 (barbarians) is always AI. Any civ with a seat is human (unless AI seat).
  const aiSeatIndices = new Set(seatList.filter(s => s.ai).map(s => s.seatIndex));
  const humanPlayers = buildHumanPlayersBitmask(seatCivMap, aiSeatIndices);

  // Convert per-civ treaty flags from .sav into the game's treaties map.
  // The parser stores treaties as per-civ arrays with flags (contact, ceaseFire,
  // peace, alliance). We convert to the reducer's flat map format: "civA-civB" → status.
  const treaties = buildTreatiesFromSav(parsed.civs, civsAlive);

  const gameState = {
    units,
    cities: parsed.cities,
    civs: parsed.civs,
    civTechCounts: parsed.civTechCounts,
    civTechs: parsed.civTechs,
    civsAlive,
    playerCiv: parsed.playerCiv,
    mapRevealed: parsed.mapRevealed,
    turn: { number: parsed.gameState?.turnsPassed ?? 0, activeCiv },
    version: 0,
    // Seat→civ mapping: seat index maps to civ slot
    seatCivMap,
    humanPlayers,
    treaties,
    wonders: parsed.gameState?.wonders || initWonders(),
    difficulty: parsed.gameState?.difficulty || 'chieftain',
    barbarianActivity: parsed.gameState?.barbarianActivity || 'normal',
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
    // Mark visibility for initial position (radius 2 = city-level LOS, matching real Civ2)
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, pos.gx, pos.gy, mapBase.wraps, 2);
  }

  // Civ alive bitmask: barbs + each seated player's civ
  let civsAlive = 0;
  for (let i = 0; i < civCount; i++) civsAlive |= (1 << (i + 1));

  const seatCivMap = {};
  for (let i = 0; i < seatList.length; i++) {
    seatCivMap[seatList[i].seatIndex] = i + 1;
  }

  // Build humanPlayers bitmask: bit N = 1 means civ N is human-controlled.
  // Civ 0 (barbarians) is always AI. Any civ with a seat is human (unless AI seat).
  const aiSeatIndices = new Set(seatList.filter(s => s.ai).map(s => s.seatIndex));
  const humanPlayers = buildHumanPlayersBitmask(seatCivMap, aiSeatIndices);

  const gameState = {
    units,
    cities: [],
    civs: buildInitialCivs(seatList),
    civTechCounts: new Array(8).fill(0),
    civTechs: Array.from({ length: 8 }, () => new Set()),
    civsAlive,
    playerCiv: 1,
    mapRevealed: false,
    turn: { number: 0, activeCiv: 1 },
    wonders: initWonders(),
    difficulty: 'chieftain',
    barbarianActivity: 'roaming',
    version: 0,
    seatCivMap,
    humanPlayers,
    unitBySaveIndex: null,
    allUnits: null,
  };

  return { mapBase, gameState };
}

/**
 * Convert per-civ treaty data from a parsed .sav into the reducer's flat treaty map.
 * Each civ pair gets the highest-level treaty status: alliance > peace > ceasefire > war.
 * If the contact flag is set but no treaty type is active, defaults to 'ceasefire'.
 *
 * @param {Array} civs - parsed civs array (each has .treaties[8])
 * @param {number} civsAlive - alive civs bitmask
 * @returns {object} treaties map: { "civA-civB": status }
 */
function buildTreatiesFromSav(civs, civsAlive) {
  const treaties = {};
  if (!civs) return treaties;

  for (let a = 1; a < 8; a++) {
    if (!(civsAlive & (1 << a))) continue;
    const civA = civs[a];
    if (!civA?.treaties) continue;

    for (let b = a + 1; b < 8; b++) {
      if (!(civsAlive & (1 << b))) continue;
      const civB = civs[b];
      if (!civB?.treaties) continue;

      const tAB = civA.treaties[b]; // A's view of B
      const tBA = civB.treaties[a]; // B's view of A

      // Check if either side has the contact flag
      const hasContact = (tAB?.contact || tBA?.contact);
      if (!hasContact) continue; // no contact → no treaty entry

      const key = `${a}-${b}`;

      // Determine the highest treaty level (use the maximum from both sides)
      if (tAB?.alliance || tBA?.alliance) {
        treaties[key] = 'alliance';
      } else if (tAB?.peace || tBA?.peace) {
        treaties[key] = 'peace';
      } else if (tAB?.ceaseFire || tBA?.ceaseFire) {
        treaties[key] = 'ceasefire';
      } else if (tAB?.war || tBA?.war) {
        treaties[key] = 'war';
      } else {
        // Contact established but no specific status → ceasefire (Civ2 default on first contact)
        treaties[key] = 'ceasefire';
      }
    }
  }

  return treaties;
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
 * Initialize empty wonders array (28 wonders, all unbuilt).
 */
function initWonders() {
  return Array.from({ length: WONDER_NAMES.length }, () => ({ cityIndex: null, destroyed: false }));
}

/**
 * Build initial civs array for a new game.
 * Default slot→civ: slot 1=Romans(0), slot 2=Babylonians(1), slot 3=Germans(2), etc.
 * This matches Civ2's default game setup (LEADERS.TXT order).
 */
function buildInitialCivs(seatList) {
  // Build a map from civ slot (1-based) to seat difficulty
  const civDifficultyMap = {};
  for (let i = 0; i < seatList.length; i++) {
    const civSlot = i + 1;
    if (seatList[i].ai && seatList[i].difficulty) {
      civDifficultyMap[civSlot] = seatList[i].difficulty;
    }
  }

  const civs = [];
  for (let i = 0; i < 8; i++) {
    const rulesCivNumber = i === 0 ? 0 : i - 1;
    civs.push({
      name: i === 0 ? 'Barbarians' : (LEADERS_TXT_NAMES[rulesCivNumber] || `Civ ${i}`),
      style: 0,
      government: i === 0 ? 'anarchy' : 'despotism',
      treasury: i === 0 ? 0 : 50,
      scienceRate: 5, taxRate: 5, luxuryRate: 0,
      researchProgress: 0,
      techBeingResearched: 0xFF, // none selected
      rulesCivNumber,
      difficulty: civDifficultyMap[i] || undefined,
    });
  }
  return civs;
}

/**
 * Build humanPlayers bitmask from seatCivMap.
 * Bit N = 1 means civ N is human-controlled.
 * Civ 0 (barbarians) is always AI (bit 0 always 0).
 * AI seats (in aiSeatIndices) are excluded from the bitmask.
 *
 * @param {object} seatCivMap - maps seat index → civ slot
 * @param {Set<number>} [aiSeatIndices] - seat indices occupied by AI players
 * @returns {number} 8-bit bitmask
 */
function buildHumanPlayersBitmask(seatCivMap, aiSeatIndices) {
  let mask = 0;
  for (const seatIdx of Object.keys(seatCivMap)) {
    // Skip AI seats — they should not be marked as human
    if (aiSeatIndices && aiSeatIndices.has(Number(seatIdx))) continue;
    const civSlot = seatCivMap[seatIdx];
    if (civSlot != null && civSlot >= 1 && civSlot <= 7) {
      mask |= (1 << civSlot);
    }
  }
  return mask;
}
