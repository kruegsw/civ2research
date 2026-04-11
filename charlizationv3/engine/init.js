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
  MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, LEADERS_TXT_NAMES, WONDER_NAMES, COSMIC_DEFAULTS,
  CIV_COLORS, ADVANCE_PREREQS, ADVANCE_NAMES, TERRAIN_BASE,
  CITY_RADIUS_DOUBLED, ADVANCE_EPOCH, UNIT_PREREQS, UNIT_DOMAIN,
  IMPROVE_COSTS, IMPROVE_MAINTENANCE,
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

  // ── Ensure all 8 civ slots are initialized with defaults ──
  const civs = Array.from({ length: 8 }, (_, i) => {
    if (parsed.civs && parsed.civs[i]) return parsed.civs[i];
    return {
      name: i === 0 ? 'Barbarians' : `Civ ${i}`,
      style: i % 4,
      government: i === 0 ? 'anarchy' : 'despotism',
      treasury: 0,
      scienceRate: i === 0 ? 0 : 5,
      taxRate: i === 0 ? 10 : 5,
      luxuryRate: 0,
      researchProgress: 0,
      techBeingResearched: 0xFF,
      rulesCivNumber: i === 0 ? 0 : i - 1,
      attitudes: [0, 0, 0, 0, 0, 0, 0, 0],
      reputation: 100,
    };
  });

  const gameState = {
    units,
    cities: parsed.cities,
    civs,
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
    barbarianActivity: parsed.gameState?.barbarianActivity || 'villages',
    // Q.4: Scenario-specific state
    isScenario,
    scenarioRules,
    scenarioTechRestrictions,
    scenarioName: parsed.tail?.scenarioName || null,
    // Cosmic parameters: parsed from save file, fallback to RULES.TXT defaults
    cosmic: parsed.gameState?.cosmicParams ?? [...COSMIC_DEFAULTS],
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

  // Determine game difficulty: use highest difficulty among all seats
  // (human seat may not have difficulty set; AI seats get it from lobby dropdown)
  let difficultyIdx = 0;
  for (const seat of seatList) {
    const idx = DIFFICULTY_INDEX[seat.difficulty] ?? -1;
    if (idx > difficultyIdx) difficultyIdx = idx;
  }
  const difficultyName = ['chieftain','warlord','prince','king','emperor','deity'][difficultyIdx] || 'chieftain';

  // Civ2 supports max 7 civilizations (slots 1-7; slot 0 = barbarians)
  const civCount = Math.min(seatList.length, 7);

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
  // mapResult.closeSpawns: testing flag — clusters all civs in a small area
  const placements = assignInitialSettlerPositions(mapBase, civCount, { closeSpawns: !!mapResult.closeSpawns });

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
        movesRemain: 0,
        orders: 'none',
        movesMade: 0,
        movesLeft: UNIT_MOVE_POINTS[unitType] * MOVEMENT_MULTIPLIER,
        homeCityId: 0xFFFF,
        goToX: -1, goToY: -1,
        hpLost: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      });
    }

    // (#163) Place Explorer (type 50) if civ has Seafaring (tech 75)
    // Binary FUN_004a7ce9: grants an Explorer unit when the civ starts with Seafaring
    if (civTechs[civSlot] && civTechs[civSlot].has(75)) {
      units.push({
        type: 50, // Explorer
        owner: civSlot,
        gx: pos.gx, gy: pos.gy,
        x: pos.gx * 2 + (pos.gy % 2), y: pos.gy,
        veteran: 0,
        movesRemain: 0,
        orders: 'none',
        movesMade: 0,
        movesLeft: UNIT_MOVE_POINTS[50] * MOVEMENT_MULTIPLIER,
        homeCityId: 0xFFFF,
        goToX: -1, goToY: -1,
        hpLost: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      });
    }

    // Remove nearby goody huts (Civ2: clear huts in city radius of starting position)
    clearNearbyGoodyHuts(mapBase, pos.gx, pos.gy);

    // Mark visibility for initial position (radius 2 = city-level LOS, matching real Civ2)
    updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, pos.gx, pos.gy, mapBase.wraps, 2);
  }

  // ── Settler position balancing: grant extra settler to civs with poor starts ──
  // Score each civ's start position by counting desirable terrain in 2-tile radius.
  // Scoring: grassland=3, plains=4, river=+3, hills=2, forest=2, desert/tundra/glacier=0
  const startScores = [];
  for (let i = 0; i < civCount; i++) {
    const pos = placements[i];
    let score = 0;
    for (const [dx, dy] of CITY_RADIUS_DOUBLED) {
      const ny = pos.gy + dy;
      if (ny < 0 || ny >= mapBase.mh) continue;
      const nx = mapBase.wraps
        ? ((pos.gx + dx) % mapBase.mw + mapBase.mw) % mapBase.mw
        : pos.gx + dx;
      if (nx < 0 || nx >= mapBase.mw) continue;
      const tile = mapBase.tileData[ny * mapBase.mw + nx];
      if (!tile) continue;
      const ter = tile.terrain;
      // Terrain scoring
      if (ter === 2) score += 3;       // grassland
      else if (ter === 1) score += 4;  // plains
      else if (ter === 4) score += 2;  // hills
      else if (ter === 3) score += 2;  // forest
      // desert(0), tundra(6), glacier(7) = 0
      if (tile.river) score += 3;
    }
    startScores.push(score);
  }
  const avgScore = startScores.reduce((a, b) => a + b, 0) / Math.max(1, civCount);
  for (let i = 0; i < civCount; i++) {
    if (startScores[i] + 3 <= avgScore) {
      // Grant an extra settler to this civ
      const civSlot = i + 1;
      const pos = placements[i];
      units.push({
        type: 0, // Settlers
        owner: civSlot,
        gx: pos.gx, gy: pos.gy,
        x: pos.gx * 2 + (pos.gy % 2), y: pos.gy,
        veteran: 0,
        movesRemain: 0,
        orders: 'none',
        movesMade: 0,
        movesLeft: UNIT_MOVE_POINTS[0] * MOVEMENT_MULTIPLIER,
        homeCityId: 0xFFFF,
        goToX: -1, goToY: -1,
        hpLost: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      });
    }
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

  // Binary FUN_0041F69F: establish bilateral diplomacy contact between all human players
  const treaties = {};
  for (let a = 1; a <= civCount; a++) {
    for (let b = a + 1; b <= civCount; b++) {
      const aHuman = !!((1 << a) & humanPlayers);
      const bHuman = !!((1 << b) & humanPlayers);
      if (aHuman && bHuman) {
        const key = `${a}-${b}`;
        treaties[key] = 'ceasefire';
      }
    }
  }

  // Binary FUN_004a76f5 (reset_kill_history): zeroes the destroyed-civs
  // history at game start. 12 entries max: killTurns, killerCivIds,
  // destroyedCivRulesIds, destroyedCivNames. Without explicit init,
  // consumers that iterate killHistory before any civ dies would hit undefined.
  const killHistory = {
    count: 0,
    killTurns: new Array(12).fill(0),
    killerCivIds: new Array(12).fill(0),
    destroyedCivRulesIds: new Array(12).fill(0),
    destroyedCivNames: new Array(12).fill(''),
  };

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
    treaties,
    killHistory,
    // Cosmic parameters: use defaults for new games (no save file to parse from)
    cosmic: [...COSMIC_DEFAULTS],
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

  // Tax/science rates from binary pseudocode: scienceRate=4, taxRate=4, luxRate=1
  // Civ2 uses a 0-10 scale where each unit = 10%. So sci=4 → 40%, tax=4 → 40%, lux=1 → 10%
  // (#162) Binary FUN_004a7ce9: initial rates are 40/40/10 (not 50/50/0)
  const scienceRate = 4;
  const taxRate = 4;
  const luxuryRate = 1;

  // City style: based on rulesCivNumber (Civ2: 0-3 cycling through 4 styles)
  // Romans=0→European, Babylonians=1→Classical, Germans=2→Far-Eastern, Egyptians=3→Middle-Eastern
  const style = rulesCivNumber % 4;

  // Initialize attitudes toward other civs
  // Binary FUN_004a7ce9: rand()%80+10 for AI targets, clamp(diff*5+rand()%80+10, 10, 75) for human
  const attitudes = new Array(8).fill(0);
  for (let j = 0; j < 8; j++) {
    if (j === civSlot) { attitudes[j] = 0; continue; }
    if (j === 0) { attitudes[j] = 0; continue; } // barbarians
    const baseAtt = (rng ? rng.nextInt(80) : Math.floor(Math.random() * 80)) + 10;
    // Human targets get difficulty-scaled attitudes (higher diff = friendlier start)
    if (seat && !seat.ai) {
      attitudes[j] = Math.max(10, Math.min(75, difficultyIdx * 5 + baseAtt));
    } else {
      attitudes[j] = baseAtt;
    }
  }

  // (#45) Binary FUN_004a7ce9: grant techs that other civs already have.
  // For each tech known by at least one other alive civ, grant it with
  // probability rand()%(diff+1) > 0 (i.e. always on Chieftain, 50% on Deity).
  // This is the real Civ2 algorithm: later civs catch up to earlier ones.
  const isHuman = seat && !seat.ai;
  const techsToGrant = getStartingTechs(difficultyIdx, isHuman, rng, civSlot, civTechs);
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
    researchSlot: 0, // Binary civ+0x3FE: paradigm pacing counter (FUN_00486e6f)
    techBeingResearched: 0xFF, // none selected
    rulesCivNumber,
    difficulty: seat?.difficulty || undefined,
    attitudes,
    reputation: 100, // G.5: perfect reputation at start
  };
}

/**
 * Grant starting techs to a new civ.
 *
 * Binary ref: `new_civ` (FUN_004A7CE9 in block_004A0000.c, lines 2726-2748).
 * The binary's tech-granting code is gated by `if (DAT_00655af8 != 0)` —
 * i.e. **only fires for mid-game respawn**, never at game start. At turn 0
 * all civs start with ZERO techs. The previous JS implementation had a
 * "fallback to random no-prereq pool" path that gave 7 techs at Chieftain
 * down to 0 at Deity — that was a JS invention with no binary basis, and
 * because the seeded RNG was deterministic the player got the same techs
 * (Horseback Riding + Bronze Working) every game.
 *
 * Mid-game respawn (binary lines 2729-2744): for each of 100 advances,
 * if at least one alive civ has it AND `rand() % (difficulty + 1) != 0`,
 * grant it to the new civ. So:
 *   - Chieftain (idx 0): rand()%1 == 0 → never grants
 *   - Warlord  (idx 1): rand()%2 != 0 → 50% chance per tech
 *   - Deity    (idx 5): rand()%6 != 0 → 83% chance per tech
 *
 * @param {number} difficultyIdx - 0=chieftain..5=deity
 * @param {boolean} isHuman - whether this civ is human-controlled (unused, kept for sig compat)
 * @param {object} [rng] - SeededRNG instance
 * @param {number} civSlot - the civ slot being initialized
 * @param {Array<Set>} civTechs - per-civ tech sets (already initialized for earlier civs)
 * @returns {number[]} array of advance IDs to grant
 */
function getStartingTechs(difficultyIdx, isHuman, rng, civSlot, civTechs) {
  // Collect all techs known by any already-alive civ. At game start no civ
  // has any techs yet, so this set is empty and the function returns [].
  // Only at mid-game respawn (after some civs have researched things) does
  // this set become non-empty.
  const knownByOthers = new Set();
  if (civTechs) {
    for (let c = 1; c < 8; c++) {
      if (c === civSlot) continue;
      if (!civTechs[c] || civTechs[c].size === 0) continue;
      for (const techId of civTechs[c]) {
        knownByOthers.add(techId);
      }
    }
  }

  // No civs have techs yet → game start → no starting techs (binary line 2726
  // gates the entire grant block on `DAT_00655af8 != 0`).
  if (knownByOthers.size === 0) return [];

  // Chieftain: binary forces local_1b4 = 0 (line 2734), so never grants.
  if (difficultyIdx === 0) return [];

  // Mid-game respawn: per-tech rand() % (diff+1) != 0
  const granted = [];
  for (const techId of knownByOthers) {
    const roll = rng ? rng.nextInt(difficultyIdx + 1) : Math.floor(Math.random() * (difficultyIdx + 1));
    if (roll !== 0) {
      granted.push(techId);
    }
  }
  return granted.sort((a, b) => a - b);
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
export function assignInitialSettlerPositions(mapBase, numCivs, opts = {}) {
  const { mw, mh, tileData, wraps } = mapBase;
  const closeSpawns = !!opts.closeSpawns;

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

  // ── Close-spawns testing mode: cluster all civs around the map center ──
  // Each civ is placed exactly 3 tiles from the center on different sides.
  if (closeSpawns) {
    const placements = [];
    const cx = Math.floor(mw / 2) & ~1;
    const cy = Math.floor(mh / 2);
    // Spiral offsets at distance ~3, picking valid parity for each row
    const offsets = [
      [0, 0], [4, 0], [-4, 0], [0, 4], [0, -4],
      [4, 4], [-4, 4], [4, -4], [-4, -4],
      [2, 2], [-2, -2], [2, -2], [-2, 2],
    ];
    for (let i = 0; i < numCivs && i < offsets.length; i++) {
      const [dx, dy] = offsets[i];
      let px = cx + dx;
      let py = cy + dy;
      // Snap to valid parity for the row
      px = (px & ~1) | (py & 1);
      // Wrap or clamp x
      if (wraps) px = ((px % mw) + mw) % mw;
      else px = Math.max(0, Math.min(mw - 1, px));
      py = Math.max(0, Math.min(mh - 1, py));
      placements.push({ gx: px, gy: py });
    }
    return placements;
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

// ═══════════════════════════════════════════════════════════════════
// setupScenarioStart — Grant era-appropriate techs, cities, and units
// Stub for scenario start setup. Full implementation needs complete
// tech/city/unit lists per era from the binary.
// ═══════════════════════════════════════════════════════════════════

// (#107) AI late-game first city bonus buildings (Granary=3, Marketplace=5, Barracks=2)
const AI_BONUS_BUILDINGS = [3, 5, 2];

/**
 * (#107) Apply AI late-game first city bonus.
 * After turn 40, when an AI founds its first city, it gets bonus size
 * (up to +10, min(10, turn/10)) and free buildings (Granary, Marketplace, Barracks).
 * Binary FUN_004a7ce9 new_civ: late-game AI catch-up mechanic.
 *
 * @param {object} city - the newly founded city (mutable)
 * @param {number} turnNumber - current game turn
 * @param {boolean} isAI - whether this civ is AI-controlled
 */
export function applyAIFirstCityBonus(city, turnNumber, isAI) {
  if (!isAI || turnNumber <= 40) return;
  // Bonus size: min(10, turn / 10), floor
  const bonusSize = Math.min(10, Math.floor(turnNumber / 10));
  city.size = Math.max(city.size, 1 + bonusSize);
  // Grant free buildings
  if (!city.buildings) city.buildings = new Set();
  for (const bid of AI_BONUS_BUILDINGS) {
    city.buildings.add(bid);
  }
}

// Era tech cutoff advance IDs (approximate; based on ADVANCE_EPOCH values)
// Epoch 0 = ancient, 1 = renaissance, 2 = industrial, 3 = modern
const ERA_EPOCH_MAX = [0, 1, 2, 3];

/**
 * (#164) Set up an accelerated game start by granting era-appropriate techs.
 * Grants all techs whose epoch <= era level AND whose prerequisites are
 * also within that epoch (ensuring a valid tech tree state).
 *
 * Era levels:
 *   0 = ancient:     grant techs up to Bronze Working era (epoch 0)
 *   1 = renaissance: grant techs up to Gunpowder era (epoch 0-1)
 *   2 = industrial:  grant techs up to Railroad era (epoch 0-2)
 *   3 = modern:      grant techs up to Electronics era (epoch 0-3)
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} era - era index (0=ancient, 1=renaissance, 2=industrial, 3=modern)
 */
export function setupScenarioStart(state, mapBase, era) {
  const epochMax = ERA_EPOCH_MAX[Math.min(era, 3)];

  // Build the set of eligible techs (epoch <= epochMax)
  const eligible = new Set();
  for (let advId = 0; advId < ADVANCE_NAMES.length; advId++) {
    const epoch = (advId < ADVANCE_EPOCH.length) ? ADVANCE_EPOCH[advId] : -1;
    if (epoch >= 0 && epoch <= epochMax) {
      eligible.add(advId);
    }
  }

  // Grant techs in dependency order: repeatedly add techs whose prereqs are met
  // This ensures prerequisite chains are satisfied
  for (let c = 1; c <= 7; c++) {
    if (!(state.civsAlive & (1 << c))) continue;
    if (!state.civTechs) state.civTechs = Array.from({ length: 8 }, () => new Set());
    if (!state.civTechCounts) state.civTechCounts = new Array(8).fill(0);

    const techSet = state.civTechs[c];
    let added = true;
    while (added) {
      added = false;
      for (const advId of eligible) {
        if (techSet.has(advId)) continue;
        const [p1, p2] = ADVANCE_PREREQS[advId];
        // No-prereq techs always qualify
        const p1ok = (p1 === -1) || techSet.has(p1);
        const p2ok = (p2 === -1) || techSet.has(p2);
        if (p1ok && p2ok) {
          techSet.add(advId);
          added = true;
        }
      }
    }
    state.civTechCounts[c] = techSet.size;
  }
}
