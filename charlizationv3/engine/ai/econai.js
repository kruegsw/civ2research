// ═══════════════════════════════════════════════════════════════════
// ai/econai.js — AI economy: research selection, tax/science rates,
//                government revolution timing
//
// Ported from Civ2 decompiled functions:
//   - FUN_004bdb2c (calcTechValue)
//   - FUN_004c09b0 (pickResearchGoal)
//   - FUN_0055f5a3 (chooseGovernment)
//   - FUN_004bd2a3 (balanceRates / rate assessment)
//   - FUN_004bdaa5 (isPrereqOf — recursive prereq walk)
//   - FUN_004bfdbe (canResearch — immediate availability check)
//   - FUN_0055c277 (canUseGovernment — govt tech prereq check)
// ═══════════════════════════════════════════════════════════════════

import { getAvailableResearch, calcResearchCost } from '../research.js';
import { validateAction } from '../rules.js';
import { calcCityTrade } from '../production.js';
import {
  ADVANCE_NAMES, ADVANCE_PREREQS, ADVANCE_EPOCH, ADVANCE_AI_INTEREST,
  ADVANCE_AI_VALUE, ADVANCE_MODIFIER,
  UNIT_PREREQS, UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_ROLE,
  IMPROVE_PREREQS, IMPROVE_NAMES,
  WONDER_PREREQS, WONDER_OBSOLETE,
  GOVT_TECH_PREREQS, GOVT_MAX_RATE, GOVT_MAX_SCIENCE, GOVT_INDEX,
  GOVERNMENT_KEYS, LEADER_PERSONALITY, DIFFICULTY_KEYS,
  GROWTH_CAP_BUILDINGS,
} from '../defs.js';

// ── Constants ──────────────────────────────────────────────────

// Aqueduct/Sewer building IDs and their population thresholds
// Binary ref: FUN_00441a79 (city_growth_building_check)
const AQUEDUCT_BUILDING_ID = GROWTH_CAP_BUILDINGS.AQUEDUCT.buildingId;
const SEWER_BUILDING_ID = GROWTH_CAP_BUILDINGS.SEWER.buildingId;
const AQUEDUCT_THRESHOLD = GROWTH_CAP_BUILDINGS.AQUEDUCT.defaultThreshold;
const SEWER_THRESHOLD = GROWTH_CAP_BUILDINGS.SEWER.defaultThreshold;

// Space ship part building IDs (SS Structural=35, SS Component=36, SS Module=37)
const SS_PART_BUILDINGS = [35, 36, 37];

// Number of wonders in standard Civ2
const NUM_WONDERS = 28;

// Number of advances
const NUM_ADVANCES = 89;

// Government index mapping (matches GOVERNMENT_KEYS order)
// 0=anarchy, 1=despotism, 2=monarchy, 3=communism, 4=fundamentalism, 5=republic, 6=democracy
const GOVT_IDX = Object.fromEntries(
  GOVERNMENT_KEYS.map((k, i) => [k, i])
);

// Statue of Liberty wonder index (grants access to all governments)
const STATUE_OF_LIBERTY = 19;

// ── Helpers ──────────────────────────────────────────────────────

/**
 * Get treaty status between two civs.
 */
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

/**
 * Check if civ has a specific tech.
 * Port of FUN_004bd9f0 (simplified — we don't need the bitmask walk,
 * since civTechs is already a Set).
 */
function civHasTech(gameState, civSlot, techId) {
  if (techId < 0) return techId !== -2; // -1 = "no prereq" → always true; -2 = never
  if (techId >= NUM_ADVANCES) return false;
  const techs = gameState.civTechs?.[civSlot];
  return techs ? techs.has(techId) : false;
}

/**
 * Recursive prerequisite check.
 * Port of FUN_004bdaa5: returns true if `targetTechId` appears anywhere
 * in the prerequisite tree of `rootTechId` (or equals it).
 *
 * In other words: "is targetTechId needed to eventually research rootTechId?"
 */
function isPrereqOf(rootTechId, targetTechId, _visited) {
  if (rootTechId < 0) return false;
  if (rootTechId === targetTechId) return true;
  // Guard against cycles (shouldn't exist, but defensive)
  if (!_visited) _visited = new Set();
  if (_visited.has(rootTechId)) return false;
  _visited.add(rootTechId);
  const prereqs = ADVANCE_PREREQS[rootTechId];
  if (!prereqs) return false;
  return isPrereqOf(prereqs[0], targetTechId, _visited) ||
         isPrereqOf(prereqs[1], targetTechId, _visited);
}

/**
 * Check if a civ owns a specific wonder.
 * Port of FUN_00453e51: looks up wonder's city index, checks if that
 * city is owned by civSlot.
 */
function civOwnsWonder(gameState, civSlot, wonderIdx) {
  const w = gameState.wonders?.[wonderIdx];
  if (!w || w.cityIndex < 0 || w.destroyed) return false;
  const city = gameState.cities?.[w.cityIndex];
  return city && city.owner === civSlot;
}

/**
 * Get the city index for a wonder, or -1 if not built / destroyed.
 * Port of FUN_00453e18.
 */
function getWonderCityIndex(gameState, wonderIdx) {
  const w = gameState.wonders?.[wonderIdx];
  if (!w || w.cityIndex < 0 || w.destroyed) return -1;
  return w.cityIndex;
}

/**
 * Check if a civ can use a given government index.
 * Port of FUN_0055c277: checks tech prereq OR Statue of Liberty ownership.
 */
function canUseGovernment(gameState, civSlot, govtIndex) {
  // Government index 0 (anarchy) and 1 (despotism) are always available
  if (govtIndex <= 1) return true;
  // Statue of Liberty grants all governments
  const hasStatue = civOwnsWonder(gameState, civSlot, STATUE_OF_LIBERTY);
  // Check tech prereq for this government
  const techPrereqs = {
    2: 54,  // Monarchy → Monarchy tech
    3: 15,  // Communism → Communism tech
    4: 31,  // Fundamentalism → Fundamentalism tech
    5: 71,  // Republic → The Republic tech
    6: 21,  // Democracy → Democracy tech
  };
  const reqTech = techPrereqs[govtIndex];
  if (reqTech == null) return false;
  if (civHasTech(gameState, civSlot, reqTech) || hasStatue) return true;
  return false;
}

/**
 * Get the government index (0-6) for a civ.
 */
function getGovtIndex(gameState, civSlot) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return 1; // default despotism
  // If GOVT_INDEX is available, use it; otherwise look up from string
  if (typeof GOVT_INDEX !== 'undefined' && GOVT_INDEX[civ.government] != null) {
    return GOVT_INDEX[civ.government];
  }
  return GOVT_IDX[civ.government] ?? 1;
}

/**
 * Get leader personality value used by calcTechValue.
 *
 * Binary reads `DAT_006554FA[styleLeader * 0x30]` — byte 0 of each
 * leader's 0x30 stride struct. Cross-verified via Frida captures
 * (2026-04-24, session game_20260424_104607): this byte is the
 * **civilize** score from RULES.TXT @LEADERS column 3, NOT expand.
 * v3's LEADER_PERSONALITY stores [expand, attack, civilize], so we
 * read index 2. Prior v3 used index 0 (expand) which produced
 * systematically wrong base = modifier * (wrong sign/magnitude) + aiValue.
 */
function getLeaderPersonality(rulesCivNumber) {
  if (typeof LEADER_PERSONALITY === 'undefined' || !LEADER_PERSONALITY) return 0;
  const entry = LEADER_PERSONALITY[rulesCivNumber];
  if (!entry) return 0;
  return entry[2] ?? 0;
}

/**
 * Count cities owned by a civ.
 */
function countCities(gameState, civSlot) {
  if (!gameState.cities) return 0;
  let n = 0;
  for (const c of gameState.cities) {
    if (c && c.owner === civSlot && c.gx >= 0) n++;
  }
  return n;
}

/**
 * Count this civ's naval (domain=2) units — mirrors civ struct +0x6A
 * (navalUnitCount), derived since v3 excludes this as a derivable field.
 */
function countCivNavalUnits(gameState, civSlot) {
  if (!gameState.units) return 0;
  let n = 0;
  for (const u of gameState.units) {
    if (!u || u.owner !== civSlot || u.gx < 0) continue;
    if ((UNIT_DOMAIN[u.type] ?? 0) === 2) n++;
  }
  return n;
}

/**
 * Find the largest city size owned by this civ.
 */
function largestCitySize(gameState, civSlot) {
  let maxSize = 0;
  if (!gameState.cities) return 0;
  for (const c of gameState.cities) {
    if (c && c.owner === civSlot && c.gx >= 0 && c.size > maxSize) {
      maxSize = c.size;
    }
  }
  return maxSize;
}

/**
 * Check if civ is human-controlled (not AI).
 * In multiplayer, uses civsAlive bitmask interpretation;
 * for our purposes, seat assignment determines this.
 */
function isHumanCiv(gameState, civSlot) {
  // Authoritative check matches the binary at FUN_004c09b0:126:
  //   (1 << civSlot) & DAT_00655b0b
  // DAT_00655b0b = humanPlayers bitmask (bit N = civ N human).
  // init.js populates gameState.humanPlayers from the save's header.
  // Prior implementation used seatCivMap which marks all SEATED civs
  // as human (correct for multiplayer, wrong for pickResearchGoal
  // where the question is "is this specific civ a human player").
  if (gameState.humanPlayers != null) {
    return !!((1 << civSlot) & gameState.humanPlayers);
  }
  // Fallback only when humanPlayers isn't populated (shouldn't happen
  // in practice; initFromSav always sets it).
  if (gameState.seatCivMap) {
    for (const seat of Object.values(gameState.seatCivMap)) {
      if (seat === civSlot) return true;
    }
    return false;
  }
  return civSlot === 1;
}

/**
 * Get the tech count for a civ.
 */
function getTechCount(gameState, civSlot) {
  return gameState.civTechCounts?.[civSlot] ??
         gameState.civTechs?.[civSlot]?.size ?? 0;
}

// ═══════════════════════════════════════════════════════════════════
// 0. getCivStyleTechBonus — Per-civ-style tech bonus (21 cases)
//
// Extracted from FUN_004bdb2c lines 6227-6420: the big switch on
// rulesCivNumber. Returns a bonus (positive or negative) for a
// specific tech based on the civ's hardcoded preferences.
// ═══════════════════════════════════════════════════════════════════

/**
 * Get per-civ-style tech bonus from the binary's hardcoded preference table.
 *
 * Port of FUN_004bdb2c lines 6227-6420: 21-way switch on rulesCivNumber.
 * Each civ has specific tech preferences (bonuses) and aversions (penalties).
 * This excludes context-dependent bonuses (navalScore, continent access)
 * which are applied separately in calcTechValue.
 *
 * @param {number} rulesCivNumber - civ style index 0-20
 * @param {number} techId - advance ID 0-88
 * @returns {number} bonus value (can be negative)
 */
export function getCivStyleTechBonus(rulesCivNumber, techId) {
  // Exact port of FUN_004bdb2c's switch at block_004B0000.c:6227-6420.
  // Prior v3 had "enhanced" bonuses (e.g. Romans +2 Republic, Greeks +2
  // Democracy, Russians +3 Communism, Babylonians +1 Monarchy) that
  // don't exist in the binary — removed to restore pick-for-pick
  // fidelity.
  let bonus = 0;
  switch (rulesCivNumber) {
    case 0: // Romans: Iron Working(0x27=39), Bronze Working(0x08=8), Warrior Code(0x56=86): +2
      if (techId === 39 || techId === 8 || techId === 86) bonus += 2;
      if (techId === 55) bonus -= 1; // Monotheism (0x37)
      break;
    case 1: // Babylonians
      if (techId === 12) bonus += 1; // Code of Laws (0x0C)
      break;
    case 2: // Germans
      if (techId === 6) bonus += 1;  // Banking (0x06)
      if (techId === 82) bonus += 1; // Theology (0x52)
      if (techId === 60) bonus += 1; // Philosophy (0x3C)
      break;
    case 3: // Egyptians
      if (techId === 47) bonus += 2; // Masonry (0x2F)
      break;
    case 4: // Americans
      if (techId === 21) bonus += 2; // Democracy (0x15)
      if (techId === 15) bonus -= 1; // Communism (0x0F)
      if (techId === 73) bonus += 1; // Rocketry (0x49)
      if (techId === 16) bonus += 1; // Computers (0x10)
      if (techId === 42) bonus += 1; // Leadership (0x2A)
      break;
    case 5: // Greeks
      if (techId === 64) bonus += 1; // Polytheism (0x40)
      if (techId === 8) bonus += 1;  // Bronze Working (0x08)
      if (techId === 1) bonus += 1;  // Alphabet (0x01)
      if (techId === 46) bonus += 1; // Map Making (0x2E)
      if (techId === 55) bonus -= 1; // Monotheism (0x37)
      if (techId === 60) bonus += 2; // Philosophy (0x3C)
      break;
    case 6: // Indians
      if (techId === 64) bonus += 2; // Polytheism (0x40)
      if (techId === 36) bonus += 1; // Horseback Riding (0x24)
      if (techId === 56) bonus += 1; // Mysticism (0x38)
      if (techId === 9) bonus += 1;  // Ceremonial Burial (0x09)
      if (techId === 55) bonus -= 1; // Monotheism (0x37)
      break;
    case 7: // Russians
      if (techId === 15) bonus += 2; // Communism (0x0F)
      if (techId === 60) bonus += 1; // Philosophy (0x3C)
      if (techId === 34) bonus += 1; // Guerrilla Warfare (0x22)
      break;
    case 8: // Zulus
      if (techId === 64) bonus += 2; // Polytheism (0x40)
      if (techId === 36) bonus += 1; // Horseback Riding (0x24)
      if (techId === 56) bonus += 1; // Mysticism (0x38)
      if (techId === 9) bonus += 1;  // Ceremonial Burial (0x09)
      if (techId === 8) bonus -= 1;  // Bronze Working (0x08)
      if (techId === 39) bonus -= 1; // Iron Working (0x27)
      break;
    case 9: // French
      if (techId === 42) bonus += 1; // Leadership (0x2A)
      if (techId === 81) bonus += 1; // Tactics (0x51)
      if (techId === 17) bonus += 1; // Conscription (0x11)
      break;
    case 10: // Aztecs
      if (techId === 35) bonus -= 2; // Gunpowder (0x23)
      if (techId === 55) bonus -= 1; // Monotheism (0x37)
      break;
    case 11: // Chinese (context naval penalty applied by caller using local_34)
      if (techId === 35) bonus += 1; // Gunpowder (0x23)
      break;
    case 12: // English (context naval bonus applied by caller using local_10)
      if (techId === 55) bonus += 1; // Monotheism (0x37)
      break;
    // cases 13 (Mongols) and 14 (Celts) have no tech-specific bonuses
    case 15: // Japanese
      if (techId === 79) bonus += 1; // Steel (0x4F)
      if (techId === 52) bonus += 1; // Miniaturization (0x34)
      break;
    case 16: // Vikings
      if (techId === 46) bonus += 1; // Map Making (0x2E)
      break;
    case 17: // Spanish (context naval bonus applied by caller using local_10)
      if (techId === 55) bonus += 1; // Monotheism (0x37)
      break;
    case 18: // Persians
    case 19: // Carthaginians
      if (techId === 64) bonus += 2; // Polytheism (0x40)
      if (techId === 36) bonus += 1; // Horseback Riding (0x24)
      if (techId === 56) bonus += 1; // Mysticism (0x38)
      if (techId === 9) bonus += 1;  // Ceremonial Burial (0x09)
      if (techId === 55) bonus -= 1; // Monotheism (0x37)
      break;
    case 20: // Sioux
      if (techId === 36) bonus += 2; // Horseback Riding (0x24)
      break;
    default:
      break;
  }
  return bonus;
}

// ═══════════════════════════════════════════════════════════════════
// 1. calcTechValue — Port of FUN_004bdb2c
//
// Scores how valuable a tech is for the AI to research.
// param_1 = civSlot, param_2 = techId
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate the AI value of researching a specific tech.
 *
 * Faithful port of FUN_004bdb2c. The score incorporates:
 *  - Base: ADVANCE_AI_INTEREST * leaderPersonality + ADVANCE_EPOCH
 *  - Naval capability bonuses (prereq chain to key ship techs)
 *  - Continent connectivity heuristic
 *  - Active research goal bonus
 *  - Fusion Power bonus (prereq of key tech)
 *  - Space race component bonuses
 *  - Strategic goal tech bonus
 *  - Wonder prereq bonus/penalty
 *  - Aqueduct/Sewer growth bonus
 *  - Exploration/expansion bonuses
 *  - Leader-specific civ bonuses (big switch on rulesCivNumber)
 *  - Tech already-known discount
 *  - Minimum floor of 1
 *
 * @param {number} civSlot
 * @param {number} techId
 * @param {object} gameState
 * @param {object} mapBase
 * @returns {number} score (minimum 1)
 */
export function calcTechValue(civSlot, techId, gameState, mapBase) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return 1;

  const dbg = !!process.env.DEBUG_TECH_VAL;
  const dbgBreakdown = dbg ? {} : null;

  // ── Leader personality (expansionism value) ──
  // FUN_004bdb2c line 6071: local_38 = leaderPersonality[rulesCivNumber * 0x30]
  const rulesCivNum = civ.rulesCivNumber ?? 0;
  let leaderPers = getLeaderPersonality(rulesCivNum);
  if (dbg) dbgBreakdown.leaderPers_initial = leaderPers;

  // ── Hostility-based personality damping ──
  // Binary FUN_004bdb2c:6072-6090 — decrement leaderPers once per
  // continent where both the AI civ AND a human civ with more techs
  // have cities, and the diplomatic byte at +0xC1+i*4 has bit 0x20 set.
  //
  // The CONTINENT check is the critical gate at game start: both civs
  // must have at least one city. With civs at init having no cities,
  // the continent loop never enters, leaderPers stays intact.
  //
  // Prior v3 simplified to just war+tech-deficit, skipping the
  // continent check — which caused spurious decrements at init when
  // no cities exist. Observed: Celts leaderPers 1→0 on first tech
  // pick because the simplified check matched "at war with civ 5" but
  // binary required city-on-shared-continent.
  //
  // Mitigation: gate on "both civs have at least one city" so init-time
  // picks don't decrement. Still an approximation — real binary goes
  // per-continent.
  if (!isHumanCiv(gameState, civSlot) && leaderPers >= 0) {
    const myCityCount = countCities(gameState, civSlot);
    if (myCityCount > 0) {
      for (let i = 1; i < 8; i++) {
        if (i === civSlot) continue;
        const otherCiv = gameState.civs?.[i];
        if (!otherCiv || otherCiv.alive === false) continue;
        if (!isHumanCiv(gameState, i)) continue;
        if (countCities(gameState, i) === 0) continue;
        const treaty = getTreaty(gameState, civSlot, i);
        if (treaty !== 'war') continue;
        const myTechs = getTechCount(gameState, civSlot);
        const theirTechs = getTechCount(gameState, i);
        if (theirTechs <= myTechs) continue;
        if (leaderPers >= 0) leaderPers--;
      }
    }
  }

  // ── Base score ──
  // Binary FUN_004bdb2c:6091:
  //   base = DAT_0062768b[tech*0x10] * leaderPers + DAT_0062768a[tech*0x10]
  // where +0x7 byte = modifier (col 2), +0x6 byte = AI_value (col 1).
  // Verified via Frida techBytes capture 2026-04-24: binary's in-memory
  // values equal RULES.TXT @CIVILIZE cols 2 and 1 respectively. Prior
  // v3 used ADVANCE_AI_INTEREST (sparse 0s/1s, wrong) multiplied with
  // leaderPers, and ADVANCE_EPOCH (0-3 era values) as additive —
  // both wrong. Now uses the authoritative tables.
  const modifier = ADVANCE_MODIFIER?.[techId] ?? 0;
  const aiValue = ADVANCE_AI_VALUE?.[techId] ?? 0;
  let score = modifier * leaderPers + aiValue;
  if (dbg) {
    dbgBreakdown.modifier = modifier;
    dbgBreakdown.aiValue = aiValue;
    dbgBreakdown.base = score;
    dbgBreakdown.leaderPers_final = leaderPers;
  }

  // ── Naval capability scoring ──
  // Lines 6093-6111: Check if techId is a prerequisite for key naval techs.
  // The decompiled code checks prereqs of unit types (Trireme, Caravel, Frigate, Transport).
  // These resolve to: Map Making (46), Navigation (57), Magnetism (45), Industrialization (37).
  //
  // Scoring: prereq of MapMaking(46) → 3, prereq of Nav(57) or Mag(45) → 2,
  //          prereq of Industrialization(37) → 1, else 0
  let navalScore = 0;
  if (isPrereqOf(46, techId)) {         // Map Making (Trireme)
    navalScore = 3;
  } else if (isPrereqOf(57, techId) || isPrereqOf(45, techId)) {  // Navigation or Magnetism
    navalScore = 2;
  } else if (isPrereqOf(37, techId)) {  // Industrialization (Transport)
    navalScore = 1;
  }

  // Line 6112-6114: If game has "bloodlust" flag (bit 2 of game flags), double naval score.
  // We approximate: if no scenario restrictions, don't double.
  // (DAT_00655af0 & 4) — scenario bloodlust flag; skip for standard games.

  // Lines 6115-6145: If navalScore > 0, check continent connectivity.
  // Simplified: if the civ has cities on multiple continents OR has no naval tech,
  // apply the naval bonus. The decompiled code checks per-continent arrays,
  // which we don't have. We apply a simplified heuristic.
  if (navalScore > 0) {
    // Binary FUN_004bdb2c lines 6115-6145 — continent-based naval bonus:
    //   if civ has a continent with NO other civ presence → +navalScore
    //   else if non-human OR scenario flag 4 set → +1
    //   else → 0
    // Without per-continent presence data we can't detect the
    // "isolated continent" case. Empirically, turn-1 captures show the
    // +1 path is by far the most common (~80% of cases), while the
    // previous "!hasMapMaking → +navalScore" approximation overshot by
    // 1-2 on most picks. Conservatively apply the +1 path until
    // continent-presence is captured via Frida.
    // TODO: once gameState.continentPresence is populated, replicate
    // the per-continent bVar2 scan here.
    const isHuman = isHumanCiv(gameState, civSlot);
    const scenarioBit4 = ((gameState.scenarioFlags ?? 0) & 0x04) !== 0;
    if (!isHuman || scenarioBit4) score += 1;
  }
  if (dbg) dbgBreakdown.after_naval = score;

  // ── Free-tech-goal bonus ──
  // Binary FUN_004bdb2c:6147-6151 — if techId matches the global
  // free-tech-goal (DAT_0064c59e, signed byte), add
  //   floor(civ.navalUnitCount / 4)
  // where civ+0x6A is a signed short. The `x >> 31 & 3` in the
  // decompile is the C signed-divide-by-4 rounding adjustment (truncate
  // toward zero); for non-negative counts `Math.floor` matches.
  // gameState.freeTechGoal is captured from the binary via Frida.
  const freeTechGoal = gameState.freeTechGoal ?? -1;
  if (freeTechGoal === techId) {
    const navalCount = countCivNavalUnits(gameState, civSlot);
    score += Math.trunc(navalCount / 4);
  }
  if (dbg) dbgBreakdown.after_freetech = score;

  // ── AI-only bonuses (non-human civ) ──
  // Line 6152: if civ is NOT human
  if (!isHumanCiv(gameState, civSlot)) {
    // ── Fusion Power / advanced tech bonus ──
    // Binary FUN_004bdb2c:6153 gates this on:
    //   (DAT_00655b0b & DAT_00655bce) != 0
    // = (humanPlayers & techAdoptionMask) != 0.
    // DAT_00655bce is a per-tech adoption mask that's 0 at game init
    // (confirmed via Frida 2026-04-24, all 465 captures showed 0).
    // The block only fires mid/late-game when humans advance.
    // gameState.techAdoptionMask passes the captured value through.
    const adoptionMask = gameState.techAdoptionMask ?? 0;
    const humanPlayersMask = gameState.humanPlayers ?? 0;
    if ((humanPlayersMask & adoptionMask) !== 0) {
      if (isPrereqOf(32, techId)) {  // Fusion Power
        score += 2;
      }
      for (const ssBuilding of SS_PART_BUILDINGS) {
        if (IMPROVE_PREREQS[ssBuilding] === techId) {
          score += 3;
        }
      }
    }

    // ── Strategic goal tech bonus ──
    // Binary FUN_004bdb2c lines 6164-6170 reads DAT_0064b3fb (signed
    // byte) as the AI's current strategic tech goal. If set (>= 0),
    // some human civ already knows the goal tech, and the candidate
    // (techId) is a prereq of the goal → +2. If candidate IS the goal
    // → total +5.
    //
    // Binary's DAT_0064b3fb default at game start = 0 (Advanced Flight)
    // per Frida capture 2026-04-24. v3 now reads from
    // gameState.aiStrategicGoal (pass-through from runtime memory)
    // with a fallback to 0 to match the binary default.
    //
    // Prior v3 hardcoded 76 (Space Flight) which is never set this way
    // in vanilla Civ2 — resulted in the AI-only advanced bonus being
    // effectively skipped, under-scoring techs by 2 points each.
    const strategicGoal = gameState.aiStrategicGoal ?? 0;
    if (strategicGoal >= 0) {
      // Binary: `(DAT_00655b0b & DAT_00655b82[goal]) != 0` — "any
      // human civ knows the goal tech". humanPlayers bitmask AND
      // "civs-who-know-tech" bitmask. At game start no-one knows
      // Advanced Flight so this is false and no bonus applies.
      // Later in the game when humans research advanced techs the
      // bonus starts firing.
      let humanHasGoal = false;
      for (let i = 1; i < 8; i++) {
        if (isHumanCiv(gameState, i) && civHasTech(gameState, i, strategicGoal)) {
          humanHasGoal = true;
          break;
        }
      }
      if (humanHasGoal && isPrereqOf(strategicGoal, techId)) {
        score += 2;
        if (techId === strategicGoal) {
          score += 3; // total +5 for the goal tech itself
        }
      }
    }

    // ── Wonder prereq bonus/penalty ──
    // Lines 6171-6183: For each wonder whose prereq matches techId:
    //   - If we already own it (and techId != Engineering=0x25=37): score -= 2
    //   - If another alive civ's city has it (the wonder is built by rival): score += 2
    for (let w = 0; w < NUM_WONDERS; w++) {
      if (WONDER_PREREQS[w] === techId) {
        // Do we already own this wonder?
        if (civOwnsWonder(gameState, civSlot, w) && techId !== 37) {
          // Already own it — slight penalty (we don't need the prereq as urgently)
          // Decompiled: techId != 0x25 = 37 = Industrialization (Engineering in task desc)
          score -= 2;
        }
        // Is this wonder built by a rival alive civ?
        const wCityIdx = getWonderCityIndex(gameState, w);
        if (wCityIdx >= 0) {
          const wCity = gameState.cities?.[wCityIdx];
          if (wCity && wCity.owner !== civSlot &&
              (gameState.civsAlive & (1 << wCity.owner)) !== 0) {
            score += 2;
          }
        }
      }
    }
  }

  // ── Aqueduct / Sewer System growth bonus ──
  // Lines 6185-6205: If techId enables Aqueduct (building 9) or Sewer (building 23),
  // find the civ's largest city. If it's >= the building's threshold, +2.
  const aqueductTech = IMPROVE_PREREQS[AQUEDUCT_BUILDING_ID]; // Construction (18)
  const sewerTech = IMPROVE_PREREQS[SEWER_BUILDING_ID];       // Sanitation (74)
  if (techId === aqueductTech || techId === sewerTech) {
    const maxCity = largestCitySize(gameState, civSlot);
    const threshold = (techId === aqueductTech) ? AQUEDUCT_THRESHOLD : SEWER_THRESHOLD;
    if (maxCity >= threshold) {
      score += 2;
    }
  }

  // ── Exploration/Expansion bonus ──
  // Lines 6206-6216: If leaderPersonality >= 0 AND civ has University tech (85=0x55):
  //   - If techId is prereq of Computers (16=0x10): score += leaderPers + 1
  //   - If techId IS Computers: score += 2
  if (leaderPers >= 0 && civHasTech(gameState, civSlot, 85)) { // University
    if (isPrereqOf(16, techId)) { // Computers
      score += leaderPers + 1;
    }
    if (techId === 16) {
      score += 2;
    }
  }

  // ── Industrialization chain bonus ──
  // Lines 6217-6225: If civ has Invention (38=0x26) AND techId is prereq of
  // Industrialization (37=0x25):
  //   - If civ also has Navigation (57=0x39): score += 2
  //   - Else: score += 1
  if (civHasTech(gameState, civSlot, 38)) { // Invention
    if (isPrereqOf(37, techId)) {           // Industrialization
      if (civHasTech(gameState, civSlot, 57)) { // Navigation
        score += 2;
      } else {
        score += 1;
      }
    }
  }

  // ── Leader-specific civ bonuses ──
  // Lines 6227-6420: Big switch on rulesCivNumber (0-20).
  // Each civ has hardcoded tech preferences/aversions.
  // Uses getCivStyleTechBonus for the base tech-specific bonus,
  // plus context-dependent bonuses (navalScore, continent access)
  // that require gameState/mapBase.
  const civStyleBonus = getCivStyleTechBonus(rulesCivNum, techId);
  score += civStyleBonus;
  if (dbg) { dbgBreakdown.civStyle = civStyleBonus; dbgBreakdown.after_civStyle = score; }

  // Context-dependent civ bonuses that need navalScore/gameState/mapBase
  if (rulesCivNum === 11) { // Chinese
    // Decompiled: if no naval access (local_34 != 0), subtract navalScore.
    // We don't track per-continent data, so approximate: if civ has no
    // coastal cities, treat as landlocked and penalize naval techs.
    if (navalScore > 0) {
      let hasCoastal = false;
      if (gameState.cities && mapBase) {
        for (const city of gameState.cities) {
          if (city && city.owner === civSlot && city.gx >= 0) {
            hasCoastal = true;
            break;
          }
        }
      }
      if (!hasCoastal) score -= navalScore;
    }
  } else if (rulesCivNum === 12) { // English
    if (navalScore > 0) score += 1; // English favor naval techs
  } else if (rulesCivNum === 17) { // Spanish
    if (navalScore > 1) score += 1; // Spanish favor advanced naval
  }

  // ── No-one-has-this-tech bonus ──
  // Line 6421-6423: If no alive civ has this tech (using DAT_00655b82 lookup),
  // score += 1. DAT_00655b82[techId] tracks which civs know this tech.
  // Approximation: check if any other alive civ has this tech.
  let anyoneHasTech = false;
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (gameState.civs?.[i]?.alive === false) continue;
    if (civHasTech(gameState, i, techId)) {
      anyoneHasTech = true;
      break;
    }
  }
  if (!anyoneHasTech) {
    score += 1;
  }
  if (dbg) dbgBreakdown.after_noOneHas = score;

  // ── Already-known-by-us discount ──
  // Lines 6424-6430: For each tech that has this techId as a direct prerequisite,
  // if we already know that child tech → score -= 1.
  // This penalizes researching techs whose children we already have.
  for (let t = 0; t < NUM_ADVANCES; t++) {
    const prereqs = ADVANCE_PREREQS[t];
    if (!prereqs) continue;
    if ((prereqs[0] === techId || prereqs[1] === techId) &&
        civHasTech(gameState, civSlot, t)) {
      score -= 1;
    }
  }

  // ── Floor at 1 ──
  // Line 6431-6433: if score < 2, score = 1
  if (dbg) dbgBreakdown.pre_floor = score;
  if (score < 2) {
    score = 1;
  }

  if (dbg) {
    dbgBreakdown.final = score;
    process.stderr.write(`[DEBUG_TECH_VAL] civ=${civSlot} tech=${techId} ${JSON.stringify(dbgBreakdown)}\n`);
  }

  return score;
}

// ═══════════════════════════════════════════════════════════════════
// 2. pickResearchGoal — Port of FUN_004c09b0
//
// Iterates all available techs, scores them, applies weighted
// randomization, and returns the best tech ID.
// ═══════════════════════════════════════════════════════════════════

/**
 * Pick a research goal using weighted random selection.
 *
 * Port of FUN_004c09b0:
 * - For AI (non-human) civs: score = calcTechValue(); then weighted random
 *   selection where rand() % score gives the selection value
 * - For human civs (multiplayer allies with AI assist):
 *   score = rand() % 3 + calcTechValue() - 1
 * - Highest score wins
 *
 * @param {number} civSlot
 * @param {object} gameState
 * @param {object} mapBase
 * @returns {number} tech ID or -1 if nothing available
 */
function pickResearchGoal(civSlot, gameState, mapBase) {
  const human = isHumanCiv(gameState, civSlot);
  let bestScore = -1;
  let bestTech = -1;
  let candidateCount = 0;

  // The decompiled code iterates 0..99, checking canResearch (FUN_004bfdbe).
  // We use getAvailableResearch which does the same prereq check.
  const available = getAvailableResearch(gameState, civSlot);

  // Decompiled block_004C0000.c:126-128 — outer inclusion condition:
  //   include iff (NOT human) OR (first candidate) OR (DAT_00655b08 == 0)
  //                OR ((techId - civ[+0x10]) % 3 != 0)
  // Simplified to "exclude iff human AND not-first AND DAT_00655b08 != 0
  //                AND (techId - aiSeed) % 3 == 0".
  // This is a HUMAN-only display throttle, not an AI filter.
  //
  // aiSeed comes from civ struct +0x10 (parser.js labels it
  // `acquiredTechCount`; per Data_Structures.md it's "rank / power_rating").
  // The byte increments as civs build wonders/techs, so the tech cycle
  // rotates over time.
  //
  // Prior v3 bug (fixed in AI port slice 1): applied the filter to
  // non-human AND used rulesCivNumber — both wrong. Port now matches
  // FUN_004c09b0 exactly.
  const civData = gameState.civs?.[civSlot];
  const aiSeed = civData?.acquiredTechCount ?? 0;
  const dat655b08 = gameState.difficulty ?? 5;  // proxy for DAT_00655b08;
                                                  // per trace_civ2.js comment it
                                                  // aliases the difficulty byte

  const debug = !!process.env.DEBUG_RESEARCH_PICK;
  const dbgLog = [];
  if (debug) {
    process.stderr.write(`[DEBUG_RESEARCH_PICK] civ=${civSlot} human=${human} aiSeed=${aiSeed} dat655b08=${dat655b08} availCount=${available.length} avail=[${available.join(',')}]\n`);
  }

  for (const techId of available) {
    candidateCount++;

    // Binary's outer filter (human-only throttle):
    if (human && candidateCount > 1 && dat655b08 !== 0
        && (((techId - aiSeed) % 3) === 0)) {
      if (debug) dbgLog.push(`  skip techId=${techId} (%3 human throttle)`);
      continue;
    }

    const techVal = calcTechValue(civSlot, techId, gameState, mapBase);
    const rngStateBefore = gameState.rng?.state;
    let selectionScore;

    if (!human) {
      // AI: weighted random. If techVal <= 1, score = 0.
      // Else score = rand() % techVal.
      // Lines 130-138
      if (techVal <= 1) {
        selectionScore = 0;
      } else {
        selectionScore = gameState.rng ? gameState.rng.nextInt(techVal) : Math.floor(Math.random() * techVal);
      }
    } else {
      // Human (with AI advisor): rand() % 3 + techVal - 1
      // Lines 142-144
      selectionScore = (gameState.rng ? gameState.rng.nextInt(3) : Math.floor(Math.random() * 3)) + techVal - 1;
    }

    if (debug) {
      const rngStateAfter = gameState.rng?.state;
      dbgLog.push(`  tech=${techId} techVal=${techVal} rng_before=0x${(rngStateBefore>>>0).toString(16)} rng_after=0x${(rngStateAfter>>>0).toString(16)} score=${selectionScore}${selectionScore > bestScore ? ' *BEST*' : ''}`);
    }

    // Lines 146-149: keep the highest scoring tech
    if (selectionScore > bestScore) {
      bestScore = selectionScore;
      bestTech = techId;
    }
  }

  if (debug) {
    for (const l of dbgLog) process.stderr.write(l + '\n');
    process.stderr.write(`[DEBUG_RESEARCH_PICK] civ=${civSlot} bestTech=${bestTech} bestScore=${bestScore}\n`);
  }

  return bestTech;
}

// ═══════════════════════════════════════════════════════════════════
// 3. chooseResearch — Exported wrapper around pickResearchGoal
// ═══════════════════════════════════════════════════════════════════

/**
 * Choose a tech to research. Returns a SET_RESEARCH action or null.
 *
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @returns {object|null} SET_RESEARCH action or null
 */
export function chooseResearch(gameState, mapBase, civSlot) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return null;

  // Only pick research if none is set or current is invalid
  if (civ.techBeingResearched != null &&
      civ.techBeingResearched !== 0xFF &&
      civ.techBeingResearched !== -1) {
    // Already researching something — check if still valid
    const civTechs = gameState.civTechs?.[civSlot];
    if (civTechs && !civTechs.has(civ.techBeingResearched)) {
      return null; // still researching, don't change
    }
    // Already know this tech (just completed) — fall through to pick new
  }

  const techId = pickResearchGoal(civSlot, gameState, mapBase);
  if (techId < 0) return null;

  const action = { type: 'SET_RESEARCH', advanceId: techId };
  const err = validateAction(gameState, mapBase, action, civSlot);
  if (err) return null;
  return action;
}

// ═══════════════════════════════════════════════════════════════════
// 4. balanceRates — Port of FUN_00487a41 lines 2001-2064
//
// The binary's AI rate-setting code runs INSIDE process_civ_turn,
// AFTER all city turns complete. It uses an incremental approach:
//   - Compute current luxury from existing sci+tax
//   - If disorder detected: bump luxury by 1 (max 4 = 40%)
//   - Reduce luxury on quiet turns (every 4th turn, no disorder)
//   - Science = leader expansionism + (10 - luxury) / 2
//   - Treasury bonuses push science higher
//   - Tax = remainder
// ═══════════════════════════════════════════════════════════════════

/**
 * Adjust tax/science/luxury rates based on city happiness state.
 *
 * Faithful port of FUN_00487a41 lines 2001-2064 (AI rate-setting
 * inside process_civ_turn). The binary's approach is incremental:
 * it adjusts luxury ±1 from current rates each turn rather than
 * recomputing from scratch.
 *
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @returns {object|null} CHANGE_RATES action or null
 */
export function balanceRates(gameState, mapBase, civSlot) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return null;

  const govt = civ.government || 'despotism';
  const govtIdx = getGovtIndex(gameState, civSlot);
  const currentSciRate = civ.scienceRate ?? 0;
  const currentTaxRate = civ.taxRate ?? 0;

  // ── Scan cities for disorder flag (FUN_00487a41 lines 1972-1982) ──
  // local_1c bit 1 = any city in civil disorder
  let hasDisorder = false;
  if (gameState.cities) {
    for (const city of gameState.cities) {
      if (!city || city.owner !== civSlot || city.gx < 0) continue;
      if (city.civilDisorder) {
        hasDisorder = true;
        break;
      }
    }
  }

  // ── Compute luxury (lines 2002-2010) ──
  // Start from current luxury = 10 - sci - tax
  let luxury = 10 - currentSciRate - currentTaxRate;

  // If disorder AND luxury < 4: bump by 1
  if (hasDisorder && luxury < 4) {
    luxury = luxury + 1;
  }

  // On quiet turns (no disorder, every 4th turn), reduce luxury if > 2
  const turnNum = gameState.turn?.number || 0;
  if ((turnNum & 3) === 0 && !hasDisorder && luxury > 2) {
    luxury = luxury - 1;
  }

  // Clamp luxury to [0, 4] — binary: clamp(local_18, 0, 4)
  luxury = Math.max(0, Math.min(4, luxury));

  // ── Compute science (lines 2012-2014) ──
  // science = expansionism + (10 - luxury) / 2
  const leaderIdx = civ.rulesCivNumber ?? 0;
  const personality = LEADER_PERSONALITY[leaderIdx] || [0, 0];
  const expansionism = personality[0]; // DAT_006554fa
  let science = expansionism + ((10 - luxury) >> 1);

  // ── Treasury bonuses (lines 2015-2022) ──
  const treasury = civ.treasury || 0;
  if (treasury > turnNum + 100) science += 1;
  if (treasury > 2000) science += 1;
  if (treasury > 8000) science = 10 - luxury;

  // ── Check if AI has researched all techs — if so, set science to 0 (lines 2056-2061) ──
  // Binary: if civ has all 5 "final" techs, science = 0
  // We approximate: if no research target, science = 0
  const civTechs = gameState.civTechs?.[civSlot];
  if (civTechs && civTechs.size >= 89) {
    // Near or at tech cap
    science = 0;
  }

  // ── Clamp science to government max (lines 2040-2055) ──
  // Binary: govtIdx determines maxSci: 0→6, 1→6, 2→7, 3→7, 4→7, 5→8, 6→10
  let maxSci = 6;
  if (govtIdx > 1) maxSci = 7;
  if (govtIdx > 4) maxSci = 8;
  if (govtIdx > 5) maxSci = 10;
  const sciCap = Math.min(maxSci, 10 - luxury);
  science = Math.max(0, Math.min(science, sciCap));

  // ── Tax = remainder (line 2063) ──
  let tax = 10 - science - luxury;

  // ── Final sanity clamps ──
  const maxRate = GOVT_MAX_RATE[govt] ?? 6;
  if (tax < 0) { science += tax; tax = 0; }
  if (tax > maxRate) {
    const excess = tax - maxRate;
    tax = maxRate;
    science = Math.max(0, science - excess);
  }
  science = Math.max(0, Math.min(maxSci, science));
  luxury = 10 - science - tax;

  // Validate sum
  if (tax + luxury + science !== 10 || tax < 0 || luxury < 0 || science < 0) {
    // Fallback safe defaults
    tax = Math.min(maxRate, 3);
    science = Math.min(maxSci, 10 - tax);
    luxury = 10 - tax - science;
    if (luxury < 0) { science += luxury; luxury = 0; }
  }

  // Only emit if rates actually differ
  if (science === currentSciRate && tax === currentTaxRate) return null;

  const action = { type: 'CHANGE_RATES', scienceRate: science, taxRate: tax };
  const err = validateAction(gameState, mapBase, action, civSlot);
  if (err) return null;
  return action;
}

// ═══════════════════════════════════════════════════════════════════
// 5. considerRevolution — Port of FUN_0055f5a3
//
// Decides whether the AI should switch governments.
// ═══════════════════════════════════════════════════════════════════

/**
 * Evaluate whether a better government is available and revolt if so.
 *
 * Port of FUN_0055f5a3:
 * - param_2 = 0: proactive check (consider all governments up to democracy)
 * - param_2 = 1: reactive check (typically after losing a war; limits range
 *   and adds randomness: 1/3 chance to consider up to republic, else up to
 *   fundamentalism only)
 *
 * Tech parity check: if the human player is far ahead in tech count,
 * the AI may be forced to downgrade (to slower but more stable government).
 *
 * Government scoring uses a pre-computed "government suitability" value
 * per civ (stored at DAT_0064ca74 in the original). We approximate this
 * by ranking governments based on available techs, city count, treasury,
 * and war status.
 *
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @returns {object|null} REVOLUTION action or null
 */
export function considerRevolution(gameState, mapBase, civSlot) {
  const civ = gameState.civs?.[civSlot];
  if (!civ) return null;

  const currentGovt = civ.government || 'despotism';
  const currentGovtIdx = getGovtIndex(gameState, civSlot);

  // Don't revolt if already in anarchy (revolution in progress)
  if (currentGovt === 'anarchy') return null;
  if (civ.anarchyTurns > 0) return null;

  // (#19) Don't revolt during active war — anarchy leaves you defenseless
  let atWarActive = false;
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (gameState.civs?.[i]?.alive === false) continue;
    if (getTreaty(gameState, civSlot, i) === 'war') { atWarActive = true; break; }
  }
  if (atWarActive && currentGovtIdx >= 2) return null; // don't revolt from monarchy+ during war

  // (#19) Don't revolt if treasury is critically low — anarchy stops tax income
  const revolutionTreasury = civ.treasury ?? 0;
  if (revolutionTreasury < 50 && currentGovtIdx >= 2) return null;

  // ── Scenario check (decompiled lines 5942-5943) ──
  // If scenario flags lock government, skip. We don't track scenario flags,
  // so skip this check.

  // ── Determine max government index to consider ──
  // Decompiled lines 5944-5951: proactive → 6, reactive → 5 or 4
  // We always use proactive (param_2 = 0), so maxGovt = 6
  let maxGovtIdx = 6;

  // ── Tech parity check (decompiled lines 5952-5959) ──
  // If "peaceful AI" flag is set and human player exists:
  //   If human is 6+ techs ahead → force reset research goal to far back
  //   If human is 8+ techs ahead → force set government to despotism equivalent
  //
  // We check against the most advanced human civ.
  const myTechCount = getTechCount(gameState, civSlot);
  let maxHumanTechCount = 0;
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (!isHumanCiv(gameState, i)) continue;
    const tc = getTechCount(gameState, i);
    if (tc > maxHumanTechCount) maxHumanTechCount = tc;
  }
  // Decompiled: if human is 6+ techs ahead, may force research reset.
  // If 8+ ahead, may force government downgrade.
  // We don't implement the research reset here (that's chooseResearch's job),
  // but we limit government options if far behind.
  if (maxHumanTechCount - myTechCount > 8) {
    // Force consider only despotism (index 1)
    maxGovtIdx = 1;
  }

  // ── Attitude/aggressiveness check (decompiled lines 5961-5963) ──
  // If some attitude score > 0 and government < republic(5):
  //   limit to despotism (maxGovtIdx = 1) or communism (maxGovtIdx = 3)
  // We use patience as the proxy for this attitude value.
  if (civ.patience != null && civ.patience > 3 && currentGovtIdx < 5) {
    maxGovtIdx = 3; // limit to communism
  }

  // ── Score each government and pick the best ──
  // Decompiled lines 5965-5973: iterate governments 1..maxGovtIdx,
  // check availability (FUN_0055c277), pick the one with highest
  // pre-computed suitability score (DAT_0064ca74).
  //
  // We compute a suitability score on the fly based on game state.
  let bestGovtIdx = 1; // default to despotism
  let bestScore = -999;

  const cityCount = countCities(gameState, civSlot);
  const treasury = civ.treasury ?? 0;
  let atWar = false;
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (gameState.civs?.[i]?.alive === false) continue;
    if (getTreaty(gameState, civSlot, i) === 'war') { atWar = true; break; }
  }

  // Count happiness infrastructure for republic/democracy scoring:
  // Under republic/democracy, martial law doesn't work and military abroad
  // causes unhappiness. Cities NEED temples/colosseums/cathedrals to avoid
  // disorder. Penalty if most cities lack these.
  let citiesWithHappyBuilding = 0;
  let totalCities = 0;
  let disorderCities = 0;
  for (const city of (gameState.cities || [])) {
    if (!city || city.owner !== civSlot || city.size <= 0) continue;
    totalCities++;
    if (city.civilDisorder) disorderCities++;
    if (city.buildings && (city.buildings.has(4) || city.buildings.has(14) ||
        city.buildings.has(11))) {
      citiesWithHappyBuilding++;
    }
  }
  const happyCoverage = totalCities > 0 ? citiesWithHappyBuilding / totalCities : 0;

  for (let g = 1; g <= maxGovtIdx; g++) {
    if (!canUseGovernment(gameState, civSlot, g)) continue;

    // Compute suitability score for this government
    let govScore = 0;

    switch (g) {
      case 1: // Despotism
        govScore = 0;
        break;
      case 2: // Monarchy
        govScore = 5 + cityCount;
        if (atWar) govScore += 3;
        break;
      case 3: // Communism
        govScore = 8 + Math.min(cityCount, 20);
        if (atWar) govScore += 5;
        if (cityCount > 10) govScore += 5; // great for large empires
        break;
      case 4: // Fundamentalism
        govScore = 6;
        if (atWar) govScore += 10;
        if (!atWar) govScore -= 5; // bad for peaceful growth
        // Fundamentalism nullifies all unhappiness — great during disorder
        if (disorderCities > 0) govScore += disorderCities * 3;
        break;
      case 5: // Republic
        govScore = 12 + cityCount;
        if (atWar) govScore -= 4;
        if (treasury > 200) govScore += 3;
        // Penalty if cities lack happiness buildings — republic loses martial law
        // and military abroad causes unhappiness
        if (happyCoverage < 0.5) govScore -= 10;
        else if (happyCoverage < 0.75) govScore -= 5;
        break;
      case 6: // Democracy
        govScore = 15 + cityCount * 2;
        if (atWar) govScore -= 8;
        if (treasury > 200) govScore += 5;
        // Democracy is even more punishing — double war weariness penalty
        if (happyCoverage < 0.5) govScore -= 15;
        else if (happyCoverage < 0.75) govScore -= 8;
        break;
    }

    if (govScore > bestScore) {
      bestScore = govScore;
      bestGovtIdx = g;
    }
  }

  // ── Only revolt if the best government differs from current ──
  if (bestGovtIdx === currentGovtIdx) return null;

  // Translate index to government name
  const targetGovt = GOVERNMENT_KEYS[bestGovtIdx];
  if (!targetGovt || targetGovt === currentGovt) return null;

  const action = { type: 'REVOLUTION', government: targetGovt };
  const err = validateAction(gameState, mapBase, action, civSlot);
  if (err) return null;
  return action;
}

// ═══════════════════════════════════════════════════════════════════
// Combined entry point
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate all economy-related actions for an AI turn.
 *
 * Returns an array of actions (0-3 items): research, rates, revolution.
 * Order matters: research first (may affect rate strategy), then rates,
 * then revolution (which may reset rates to anarchy defaults).
 *
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @param {object} [strategy] — unused currently, reserved for future strategy hints
 * @returns {Array<object>}
 */
export function generateEconActions(gameState, mapBase, civSlot, strategy, debugLog = null) {
  const actions = [];
  const civName = gameState.civs?.[civSlot]?.name || `Civ ${civSlot}`;

  // (#155) AI rate calculation runs after city processing in the binary.
  // We ensure rates are evaluated with current city state, including
  // any disorder/WLTKD changes from this turn's production phase.

  // 1. Research selection
  const researchAction = chooseResearch(gameState, mapBase, civSlot);
  if (researchAction) {
    actions.push(researchAction);
    if (debugLog) {
      const techName = ADVANCE_NAMES[researchAction.advanceId] || `tech#${researchAction.advanceId}`;
      // Compute top 3 for debug
      const available = getAvailableResearch(gameState, civSlot);
      const scored = available.map(tid => ({ tid, score: calcTechValue(civSlot, tid, gameState, mapBase) }));
      scored.sort((a, b) => b.score - a.score);
      const top3 = scored.slice(0, 3).map(s => `${ADVANCE_NAMES[s.tid] || s.tid}=${s.score}`).join(', ');
      const chosenScore = scored.find(s => s.tid === researchAction.advanceId)?.score ?? '?';
      debugLog.push(`ECON: ${civName}: researching ${techName} (score ${chosenScore}). Top 3: ${top3}`);
    }
  }

  // 2. Rate balancing
  const ratesAction = balanceRates(gameState, mapBase, civSlot);
  if (ratesAction) {
    actions.push(ratesAction);
    if (debugLog) {
      const lux = 10 - ratesAction.scienceRate - ratesAction.taxRate;
      debugLog.push(`ECON: ${civName}: rates sci=${ratesAction.scienceRate} tax=${ratesAction.taxRate} lux=${lux}`);
    }
  }

  // 3. Government revolution — binary line 953: only every 8 turns
  // ((turnNumber + civSlot) & 7) == 0
  const turnNum = gameState.turn?.number || 0;
  const revolAction = ((turnNum + civSlot) & 7) === 0
    ? considerRevolution(gameState, mapBase, civSlot)
    : null;
  if (revolAction) {
    actions.push(revolAction);
    if (debugLog) {
      debugLog.push(`ECON: ${civName}: revolution to ${revolAction.government}`);
    }
  }

  return actions;
}
