// ═══════════════════════════════════════════════════════════════════
// init.js — Game initialization (server only)
//
// Two paths to start a game:
//   initFromSav()  — load a parsed .sav file, assign players to civs
//   initNewGame()  — generate map, place settlers, init civs
//
// Phase F additions:
//   createNewCiv()                — proper civ initialization (from FUN_004a7ce9)
//   assignInitialSettlerPositions() — distance-maximizing placement (from FUN_004a7754)
// ═══════════════════════════════════════════════════════════════════

import { createAccessors } from './state.js';
import {
  MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, LEADERS_TXT_NAMES, WONDER_NAMES,
  CIV_COLORS, ADVANCE_PREREQS, ADVANCE_NAMES, TERRAIN_BASE,
  CITY_RADIUS_DOUBLED,
} from './defs.js';
import { updateVisibility } from './visibility.js';
import { assignContinentBodyIds } from './mapgen.js';
import { SeededRNG } from './rng.js';
import { parseEvents, dispatchEvents, EVENT_SCENARIO_LOADED } from './events.js';

// ── Difficulty name → numeric index (Civ2: 0=Chieftain..5=Deity) ──
const DIFFICULTY_INDEX = {
  chieftain: 0, warlord: 1, prince: 2, king: 3, emperor: 4, deity: 5,
};

// ── Starting techs per difficulty (Civ2: Chieftain gets more free techs) ──
// These are the "always granted" techs for turn-0 new game (from new_civ pseudocode).
// At Chieftain, civs get ~5 starting techs; at Deity they get none.
// Mapping: difficulty index → array of advance IDs to grant.
// Advances with no prerequisites (-1,-1): Alphabet(1), Bronze Working(8),
// Ceremonial Burial(9), Horseback Riding(36), Masonry(47), Pottery(65),
// Warrior Code(86)
const FREE_STARTING_TECHS = [1, 8, 9, 36, 47, 65, 86];

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

  // ── Seeded RNG: derive seed from map seed + turn number for determinism ──
  const rngSeed = (parsed.mapSeed ?? 42) ^ ((parsed.gameState?.turnsPassed ?? 0) * 997);
  const rng = new SeededRNG(rngSeed);

  // ── Parse scenario events if present ──
  const scenarioEvents = parsed.events?.text
    ? parseEvents(parsed.events.text, parsed.civs?.map(c => c?.name))
    : [];

  // ── Q.4: Detect scenario and parse scenario-specific data ──
  const isScenario = !!(parsed.header?.isScn || parsed.header?.isScenarioSave);
  let scenarioRules = null;
  let scenarioTechRestrictions = null;

  if (isScenario) {
    // Parse custom RULES.TXT overrides if the scenario embeds them
    // The scenarioBlock (100 bytes) contains scenario flags and metadata
    const scenBlock = parsed.tail?.scenarioBlock;
    if (scenBlock && scenBlock.length >= 100) {
      // Scenario flags byte at offset 0-1 of scenarioBlock:
      //   bit 0: don't allow tech advances beyond start
      //   bit 1: don't allow conquest victory
      //   bit 2: fixed map (no exploration)
      //   bit 3: fixed civs (no civ destruction)
      const scenFlags = scenBlock[0] | (scenBlock[1] << 8);
      scenarioRules = {
        noTechAdvance: !!(scenFlags & 0x01),
        noConquestVictory: !!(scenFlags & 0x02),
        fixedMap: !!(scenFlags & 0x04),
        fixedCivs: !!(scenFlags & 0x08),
      };

      // Tech restrictions: if noTechAdvance flag is set, civs cannot research
      if (scenarioRules.noTechAdvance) {
        scenarioTechRestrictions = { noResearch: true };
      }
    }
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
    turn: { number: parsed.gameState?.turnsPassed ?? 0, activeCiv },
    version: 0,
    rng,
    scenarioEvents,
    // Seat→civ mapping: seat index maps to civ slot
    seatCivMap,
    humanPlayers,
    treaties,
    wonders: parsed.gameState?.wonders || initWonders(),
    difficulty: parsed.gameState?.difficulty || 'chieftain',
    barbarianActivity: parsed.gameState?.barbarianActivity || 'normal',
    // Q.4: Scenario-specific state
    isScenario,
    scenarioRules,
    scenarioTechRestrictions,
    scenarioName: parsed.tail?.scenarioName || null,
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

  // ── Q.4: Fire SCENARIO_LOADED events if applicable ──
  if (isScenario && scenarioEvents.length > 0) {
    dispatchEvents(gameState, mapBase, EVENT_SCENARIO_LOADED, {});
  }

  return { mapBase, gameState };
}

/**
 * Initialize a new game from a generated map.
 * Enhanced orchestrator ported from FUN_004aa9c0 (init_new_game).
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

  // ── Phase 8 (enhanced): Assign continent body IDs via proper flood fill ──
  assignContinentBodyIds(mapBase);

  // Determine game difficulty from seatList
  const difficultyName = seatList[0]?.difficulty || 'chieftain';
  const difficultyIdx = DIFFICULTY_INDEX[difficultyName] ?? 0;

  const civCount = seatList.length;

  // ── Seeded RNG: create early so createNewCiv can use it ──
  const rng = new SeededRNG(mapResult.mapSeed ?? 42);

  // ── Initialize civs with createNewCiv ──
  const civs = []; // slot 0 = barbarians
  const civTechCounts = new Array(8).fill(0);
  const civTechs = Array.from({ length: 8 }, () => new Set());

  // Slot 0: Barbarians
  civs.push({
    name: 'Barbarians',
    style: 0,
    government: 'anarchy',
    treasury: 0,
    scienceRate: 0, taxRate: 10, luxuryRate: 0,
    researchProgress: 0,
    techBeingResearched: 0xFF,
    rulesCivNumber: 0,
    attitudes: [0, 0, 0, 0, 0, 0, 0, 0],
    reputation: 100,
  });

  // Slots 1..7: create civs (alive if civSlot <= civCount, otherwise dead placeholder)
  for (let civSlot = 1; civSlot <= 7; civSlot++) {
    const rulesCivNumber = civSlot - 1;
    if (civSlot <= civCount) {
      const seat = seatList[civSlot - 1];
      const civ = createNewCiv(civSlot, rulesCivNumber, difficultyIdx, civTechs, civTechCounts, seat, rng);
      civs.push(civ);
    } else {
      // Dead civ placeholder
      civs.push({
        name: LEADERS_TXT_NAMES[rulesCivNumber] || `Civ ${civSlot}`,
        style: rulesCivNumber % 4,
        government: 'despotism',
        treasury: 0,
        scienceRate: 5, taxRate: 5, luxuryRate: 0,
        researchProgress: 0,
        techBeingResearched: 0xFF,
        rulesCivNumber,
        attitudes: [0, 0, 0, 0, 0, 0, 0, 0],
        reputation: 100,
      });
    }
  }

  // ── Place starting settlers using distance-maximization algorithm ──
  const placements = assignInitialSettlerPositions(mapBase, civCount);

  // ── Create starting units at placements ──
  const units = [];
  const STARTING_UNITS = [0, 2]; // Settlers (0), Warriors (2)

  for (let i = 0; i < civCount; i++) {
    const civSlot = i + 1;
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

    // Remove nearby goody huts (Civ2: clear huts in city radius of starting position)
    clearNearbyGoodyHuts(mapBase, pos.gx, pos.gy);

    // Mark visibility for initial position (radius 2 = city-level LOS, matching real Civ2)
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, pos.gx, pos.gy, mapBase.wraps, 2);
  }

  // ── Civ alive bitmask: each seated player's civ ──
  let civsAlive = 0;
  for (let i = 0; i < civCount; i++) civsAlive |= (1 << (i + 1));

  const seatCivMap = {};
  for (let i = 0; i < seatList.length; i++) {
    seatCivMap[seatList[i].seatIndex] = i + 1;
  }

  // Build humanPlayers bitmask
  const aiSeatIndices = new Set(seatList.filter(s => s.ai).map(s => s.seatIndex));
  const humanPlayers = buildHumanPlayersBitmask(seatCivMap, aiSeatIndices);

  // ── Chieftain bonus: 50 gold starting treasury (from init_new_game pseudocode) ──
  if (difficultyIdx === 0) {
    for (let c = 1; c <= civCount; c++) {
      civs[c].treasury = 50;
    }
  }

  const gameState = {
    units,
    cities: [],
    civs,
    civTechCounts,
    civTechs,
    civsAlive,
    playerCiv: 1,
    mapRevealed: false,
    turn: { number: 0, activeCiv: 1 },
    wonders: initWonders(),
    difficulty: difficultyName,
    barbarianActivity: 'roaming',
    version: 0,
    rng,
    scenarioEvents: [],
    seatCivMap,
    humanPlayers,
    treaties: {},
    unitBySaveIndex: null,
    allUnits: null,
  };

  return { mapBase, gameState };
}

// ═══════════════════════════════════════════════════════════════════
// createNewCiv — Proper civ initialization
// Ported from FUN_004a7ce9 (new_civ)
// ═══════════════════════════════════════════════════════════════════

/**
 * Create a new civilization with proper starting state.
 * Ported from the binary's new_civ function (FUN_004a7ce9).
 *
 * @param {number} civSlot - civ slot index (1-7)
 * @param {number} rulesCivNumber - LEADERS.TXT index (0-20)
 * @param {number} difficultyIdx - difficulty (0=chieftain..5=deity)
 * @param {Array<Set>} civTechs - per-civ tech sets (mutated: starting techs added)
 * @param {Array<number>} civTechCounts - per-civ tech counts (mutated)
 * @param {object} seat - seat info { seatIndex, name, ai, difficulty }
 * @param {object} [rng] - SeededRNG instance (if null, falls back to Math.random)
 * @returns {object} civ data object
 */
export function createNewCiv(civSlot, rulesCivNumber, difficultyIdx, civTechs, civTechCounts, seat, rng) {
  const name = LEADERS_TXT_NAMES[rulesCivNumber] || `Civ ${civSlot}`;

  // Government: always start with Despotism (index 1)
  const government = 'despotism';

  // Treasury: 0 at start (Chieftain bonus applied in initNewGame)
  const treasury = 0;

  // Tax/science rates from pseudocode: scienceRate=4, taxRate=4, luxRate=1
  // Civ2 uses a 0-10 scale where each unit = 10%. So sci=4 → 40%, tax=4 → 40%, lux=1 → 10%
  // But our engine uses 0-10 direct. Default: 50/0/50 (sci=5, tax=5, lux=0)
  const scienceRate = 5;
  const taxRate = 5;
  const luxuryRate = 0;

  // City style: based on rulesCivNumber (Civ2: 0-3 cycling through 4 styles)
  // Romans=0→European, Babylonians=1→Classical, Germans=2→Far-Eastern, Egyptians=3→Middle-Eastern
  const style = rulesCivNumber % 4;

  // Initialize attitudes toward other civs (from pseudocode: rand() % 80 + 10)
  const attitudes = new Array(8).fill(0);
  for (let j = 0; j < 8; j++) {
    if (j === civSlot) { attitudes[j] = 0; continue; }
    if (j === 0) { attitudes[j] = 0; continue; } // barbarians
    // Randomize: rand() % 80 + 10 → range [10, 89]
    // For human targets: clamp(difficulty*5 + rand()%80 + 10, 10, 75)
    attitudes[j] = (rng ? rng.nextInt(80) : Math.floor(Math.random() * 80)) + 10;
  }

  // Q.3: Grant starting techs using seeded PRNG random selection from
  // the no-prereq tech pool. Higher difficulty = fewer starting techs for
  // human, more for AI on easier difficulties.
  const isHuman = seat && !seat.ai;
  const techsToGrant = getStartingTechs(difficultyIdx, isHuman, rng);
  for (const advId of techsToGrant) {
    civTechs[civSlot].add(advId);
  }
  civTechCounts[civSlot] = civTechs[civSlot].size;

  return {
    name,
    style,
    government,
    treasury,
    scienceRate,
    taxRate,
    luxuryRate,
    researchProgress: 0,
    techBeingResearched: 0xFF, // none selected
    rulesCivNumber,
    difficulty: seat?.difficulty || undefined,
    attitudes,
    reputation: 100, // G.5: perfect reputation at start
  };
}

/**
 * Q.3: Determine starting techs using random selection from the no-prereq pool.
 *
 * Instead of a fixed list, randomly selects from all techs with no prerequisites
 * (ADVANCE_PREREQS[i] === [-1,-1]). The count depends on difficulty:
 *   Chieftain(0): 7 techs (all no-prereq)
 *   Warlord(1):   5 techs
 *   Prince(2):    3 techs
 *   King(3):      2 techs
 *   Emperor(4):   1 tech
 *   Deity(5):     0 techs
 *
 * Human civs get the count for their difficulty. AI civs on easier
 * difficulties get the same count as humans (the difficulty represents
 * the game setting, not per-civ difficulty).
 *
 * Uses seeded PRNG for determinism so all civs in a game draw from
 * the same RNG stream (ensuring reproducibility, not identical sets).
 *
 * @param {number} difficultyIdx - 0=chieftain..5=deity
 * @param {boolean} isHuman - whether this civ is human-controlled
 * @param {object} [rng] - SeededRNG instance
 * @returns {number[]} array of advance IDs to grant
 */
function getStartingTechs(difficultyIdx, isHuman, rng) {
  // Build pool of all no-prereq techs dynamically
  const pool = [];
  for (let i = 0; i < ADVANCE_PREREQS.length; i++) {
    const [p1, p2] = ADVANCE_PREREQS[i];
    if (p1 === -1 && p2 === -1) pool.push(i);
  }

  // Number of free techs per difficulty level
  const counts = [7, 5, 3, 2, 1, 0];
  const count = Math.min(counts[Math.min(difficultyIdx, 5)], pool.length);

  if (count === 0) return [];
  if (count >= pool.length) return [...pool]; // grant all

  // Fisher-Yates shuffle the pool using seeded RNG, then take first `count`
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rng ? rng.nextInt(i + 1) : Math.floor(Math.random() * (i + 1));
    const tmp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = tmp;
  }

  // Return the first `count` techs, sorted by ID for consistency
  return shuffled.slice(0, count).sort((a, b) => a - b);
}

// ═══════════════════════════════════════════════════════════════════
// assignInitialSettlerPositions — Distance-maximizing placement
// Ported from FUN_004a7754 (assign_initial_settler_positions)
// ═══════════════════════════════════════════════════════════════════

/**
 * Place starting settlers for each civ, maximizing distance between them
 * while preferring high-fertility tiles.
 * Ported from FUN_004a7754 (assign_initial_settler_positions).
 *
 * Algorithm:
 *   1. Score every eligible land tile by fertility (food+shields in city radius)
 *   2. First settler: pick the highest-scoring tile
 *   3. Subsequent settlers: pick the tile that maximizes
 *      min(distance to all already-placed settlers) among top-fertility candidates
 *
 * @param {object} mapBase - accessor object from createAccessors()
 * @param {number} numCivs - number of civs to place (1-7)
 * @returns {Array<{gx: number, gy: number}>} array of positions
 */
export function assignInitialSettlerPositions(mapBase, numCivs) {
  const { mw, mh, tileData, wraps } = mapBase;

  // ── Step 1: Score all eligible land tiles ──
  // A tile is eligible if: land, not ocean/glacier/mountains, not too close to edges
  const edgeMargin = Math.max(2, Math.floor(mh / 10));
  const candidates = []; // { gx, gy, score }

  for (let y = edgeMargin; y < mh - edgeMargin; y++) {
    for (let x = (y & 1); x < mw; x += 2) { // valid parity tiles only
      const i = y * mw + x;
      const ter = tileData[i].terrain;
      // Skip ocean, mountains, glacier, tundra (poor starts)
      if (ter === 10 || ter === 5 || ter === 7) continue;

      // Score: sum food+shields for city radius (21 tiles), weighted
      const score = scoreTileForStart(mapBase, x, y);
      if (score > 0) {
        candidates.push({ gx: x, gy: y, score });
      }
    }
  }

  if (candidates.length === 0) {
    // Fallback: use the old simple method
    return findSettlerPlacementsFallback(mapBase, numCivs);
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  // ── Step 2: Pick positions using distance maximization ──
  const placements = [];

  // Minimum distance between settlers (scales with map size)
  const minDist = Math.max(6, Math.floor(Math.min(mw, mh) / (numCivs + 1)));

  // First settler: highest fertility tile
  placements.push({ gx: candidates[0].gx, gy: candidates[0].gy });

  // Subsequent settlers: maximize minimum distance to all placed settlers,
  // among the top fertility candidates
  for (let p = 1; p < numCivs; p++) {
    let bestIdx = -1;
    let bestMinDist = -1;
    let bestScore = -1;

    // Consider top N% of candidates (by fertility) to ensure decent start
    const searchLimit = Math.min(candidates.length, Math.max(100, Math.floor(candidates.length * 0.3)));

    for (let c = 0; c < searchLimit; c++) {
      const cand = candidates[c];

      // Compute minimum distance to all already-placed settlers
      let minDistToPlaced = Infinity;
      for (const placed of placements) {
        const dist = chebyshevDist(cand.gx, cand.gy, placed.gx, placed.gy, mw, wraps);
        minDistToPlaced = Math.min(minDistToPlaced, dist);
      }

      // Skip if too close to an existing placement
      if (minDistToPlaced < minDist && bestMinDist >= minDist) continue;

      // Pick the candidate that maximizes minimum distance, with fertility as tiebreaker
      if (minDistToPlaced > bestMinDist ||
          (minDistToPlaced === bestMinDist && cand.score > bestScore)) {
        bestIdx = c;
        bestMinDist = minDistToPlaced;
        bestScore = cand.score;
      }
    }

    if (bestIdx >= 0) {
      placements.push({ gx: candidates[bestIdx].gx, gy: candidates[bestIdx].gy });
    } else {
      // Fallback: pick the best remaining candidate with any distance
      for (let c = 0; c < candidates.length; c++) {
        const cand = candidates[c];
        let used = false;
        for (const placed of placements) {
          if (placed.gx === cand.gx && placed.gy === cand.gy) { used = true; break; }
        }
        if (!used) {
          placements.push({ gx: cand.gx, gy: cand.gy });
          break;
        }
      }
    }

    // Safety: if we still couldn't place, use map center
    if (placements.length <= p) {
      placements.push({ gx: Math.floor(mw / 2), gy: Math.floor(mh / 2) });
    }
  }

  return placements;
}

/**
 * Score a tile for starting position quality.
 * From pseudocode: sum food/shields of surrounding tiles in city radius.
 * Rivers, grassland, and specials boost the score.
 *
 * @param {object} mapBase - accessor object
 * @param {number} gx - tile x
 * @param {number} gy - tile y
 * @returns {number} score (higher = better)
 */
function scoreTileForStart(mapBase, gx, gy) {
  const { mw, mh, tileData, wraps } = mapBase;
  let score = 0;
  let specials = 0;
  let rivers = 0;

  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  // Use CITY_RADIUS_DOUBLED offsets (21 tiles including center)
  for (let r = 0; r < CITY_RADIUS_DOUBLED.length; r++) {
    const [dx, dy] = CITY_RADIUS_DOUBLED[r];
    const ny = gy + dy;
    if (ny < 0 || ny >= mh) continue;
    const nx = wrapX(gx + dx);
    if (nx < 0 || nx >= mw) continue;

    const tile = tileData[ny * mw + nx];
    const ter = tile.terrain;
    if (ter > 10) continue;

    const [food, shields] = TERRAIN_BASE[ter] || [0, 0];
    let tileScore = food * 3 + shields * 2; // food weighted more

    if (tile.river) {
      tileScore += 3; // river: +1 trade in Civ2, but also fertility indicator
      rivers++;
    }
    if (ter === 2) specials++; // grassland

    // Inner ring (indices 0-7) and center (20) are more valuable
    if (r === 20) {
      tileScore *= 3; // center tile
    } else if (r < 8) {
      tileScore *= 2; // inner ring
    }

    score += tileScore;
  }

  // Bonus for rivers (from pseudocode: rivers >= 4 → +4 to score)
  if (rivers >= 4) score += 20;
  else if (specials > 3) score += 10;

  // Penalty for center tile being desert or tundra
  const centerTer = tileData[gy * mw + gx].terrain;
  if (centerTer === 0) score -= 15; // desert
  if (centerTer === 6) score -= 10; // tundra

  // Continent size bonus: prefer larger continents
  const bodyId = tileData[gy * mw + gx].bodyId;
  if (mapBase.landBodyCounts && bodyId > 0 && bodyId < 64) {
    const contSize = mapBase.landBodyCounts[bodyId];
    score += Math.min(15, Math.floor(contSize / 50));
  }

  return Math.max(0, score);
}

/**
 * Chebyshev distance between two tiles, handling X wraparound.
 */
function chebyshevDist(x1, y1, x2, y2, mw, wraps) {
  let dx = Math.abs(x1 - x2);
  if (wraps) dx = Math.min(dx, mw - dx);
  const dy = Math.abs(y1 - y2);
  return Math.max(dx, dy);
}

/**
 * Clear goody huts near a starting position (Civ2: clears in city radius).
 */
function clearNearbyGoodyHuts(mapBase, gx, gy) {
  const { mw, mh, tileData, wraps } = mapBase;
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (const [dx, dy] of CITY_RADIUS_DOUBLED) {
    const ny = gy + dy;
    if (ny < 0 || ny >= mh) continue;
    const nx = wrapX(gx + dx);
    if (nx < 0 || nx >= mw) continue;
    tileData[ny * mw + nx].goodyHut = false;
  }
}

/**
 * Fallback placement: simple vertical strip method (original algorithm).
 */
function findSettlerPlacementsFallback(mapBase, count) {
  const { mw, mh } = mapBase;
  const placements = [];
  const stripW = Math.floor(mw / count);

  for (let i = 0; i < count; i++) {
    const centerX = Math.floor(stripW * (i + 0.5));
    const centerY = Math.floor(mh / 2);
    let found = false;
    for (let r = 0; r < Math.max(mw, mh) && !found; r++) {
      for (let dy = -r; dy <= r && !found; dy++) {
        for (let dx = -r; dx <= r && !found; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          const gx = ((centerX + dx) % mw + mw) % mw;
          const gy = centerY + dy;
          if (gy < 2 || gy >= mh - 2) continue;
          const ter = mapBase.getTerrain(gx, gy);
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

// ═══════════════════════════════════════════════════════════════════
// Helper functions (unchanged from original)
// ═══════════════════════════════════════════════════════════════════

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
 * Initialize empty wonders array (28 wonders, all unbuilt).
 */
function initWonders() {
  return Array.from({ length: WONDER_NAMES.length }, () => ({ cityIndex: null, destroyed: false }));
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
