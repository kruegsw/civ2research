// ═══════════════════════════════════════════════════════════════════
// research.js — Tech research system (shared: server + client)
//
// Calculates research cost, available advances, and handles
// tech discovery during END_TURN.
//
// Phase G: Enhanced handle_tech_discovery (FUN_004bf05b) with
// barracks refund, wonder obsolescence, Leonardo's auto-upgrade,
// first-discoverer tracking, and unit obsolescence cascade.
// ═══════════════════════════════════════════════════════════════════

import {
  ADVANCE_PREREQS, ADVANCE_NAMES, COSMIC_TECH_MULTIPLIER, DIFFICULTY_KEYS,
  UNIT_PREREQS, UNIT_OBSOLETE, UNIT_NAMES,
  UNIT_ROLE, UNIT_CARRY_CAP,
  WONDER_OBSOLETE, WONDER_NAMES, IMPROVE_MAINTENANCE,
  GOVERNMENT_NAMES,
} from './defs.js';

/**
 * Compute the paradigm-pacing threshold for a given research slot.
 *
 * Binary ref: FUN_00486e15 (block_00480000.c:1644-1655)
 *   sum = Σ_{i=0..slot} (7 - difficulty) * i
 *   return sum / 2 + 1
 *
 * Used by check_tech_advance (FUN_00486e6f): when a civ's total score
 * exceeds this threshold for (researchSlot + 1), the slot advances.
 * Higher difficulty → smaller threshold → faster paradigm advancement.
 *
 * @param {number} slot - paradigm slot to compute cost for (0+)
 * @param {number} difficultyIdx - 0=chieftain..5=deity
 * @returns {number} score threshold
 */
export function calcTechParadigmCost(slot, difficultyIdx) {
  const diff = Math.max(0, Math.min(5, difficultyIdx));
  let sum = 0;
  for (let i = 0; i <= slot; i++) {
    sum += (7 - diff) * i;
  }
  return Math.floor(sum / 2) + 1;
}

/**
 * Get list of advances available for research by a civ.
 *
 * @param {object} gameState
 * @param {number} civSlot
 * @returns {number[]} array of advance IDs the civ can research
 */
export function getAvailableResearch(gameState, civSlot) {
  const civTechs = gameState.civTechs?.[civSlot];
  if (!civTechs) return [];

  const available = [];
  for (let i = 0; i < ADVANCE_PREREQS.length; i++) {
    if (civTechs.has(i)) continue; // already known
    const [p1, p2] = ADVANCE_PREREQS[i];
    if (p1 === -2 || p2 === -2) continue; // unresearchable
    if (p1 >= 0 && !civTechs.has(p1)) continue; // missing prereq 1
    if (p2 >= 0 && !civTechs.has(p2)) continue; // missing prereq 2
    available.push(i);
  }
  return available;
}

/**
 * Calculate the science cost for a civ to research a tech.
 *
 * Gap 94: Binary FUN_004c2788 uses different base costs for human vs AI:
 *   Human: baseCost = difficultyLevel * 2 + 6 (harder = more expensive)
 *   AI:    baseCost = 14 - difficultyLevel (harder = cheaper AI research)
 *
 * Gap 95: Bloodlust scenario flag scales cost by 4/5.
 *
 * @param {object} gameState
 * @param {number} civSlot
 * @returns {number} beakers needed for the next tech
 */
/**
 * Byte-exact port of FUN_004c2788. Used when Frida has captured the
 * binary's globals; v3's existing heuristic calcResearchCost (below)
 * is the fallback for live play.
 *
 * State must contain `researchCostGlobals` matching the Frida capture
 * shape. Returns the beaker cost identically to FUN_004c2788.
 */
/**
 * Compute the globals that FUN_004c2788 reads from memory, using v3
 * game state when no Frida capture is available. Keeps byte-exact
 * math in calcResearchCostExact; only the inputs are derived.
 *
 * Approximations (vs binary runtime):
 *  - leaderSlot: binary sorts civs by a power score involving buildings
 *    and unit types; v3 uses a max-acqTechCount proxy. Matches for
 *    games where the tech leader is also the power leader (common).
 *  - numDefinedTechs: binary counts tech-table entries with bA != -2;
 *    v3 approximates from ADVANCE_PREREQS (same source semantically).
 *  - scenarioFlagBcb4, scenarioTechParadigm: set to 0, 10 (no-op) when
 *    unknown — matches vanilla RULES.TXT defaults.
 */
function deriveResearchCostGlobals(gameState, civSlot) {
  const civ = gameState.civs?.[civSlot] ?? {};
  // Leader slot: civ with max (acqTechCount + futureTechCount) among
  // civs 1..7 that are alive. Ties go to lowest slot index (stable).
  let leaderSlot = 0;
  let leaderCombined = -1;
  const civs = gameState.civs || [];
  const alive = gameState.civsAlive ?? 0xFF;
  for (let i = 1; i < 8; i++) {
    if (!(alive & (1 << i))) continue;
    const c = civs[i];
    if (!c) continue;
    const combined = (c.acquiredTechCount ?? 0) + (c.futureTechCount ?? 0);
    if (combined > leaderCombined) {
      leaderCombined = combined;
      leaderSlot = i;
    }
  }
  const leader = civs[leaderSlot] ?? {};
  // Count tech entries with bA != -2 (unresearchable marker).
  let numDefinedTechs = 0;
  for (const p of ADVANCE_PREREQS) {
    if (!p) continue;
    if (p[0] !== -2 && p[1] !== -2) numDefinedTechs++;
  }
  // Map v3 state to the capture shape.
  const difficulty = Math.max(0, Math.min(5,
    DIFFICULTY_KEYS.indexOf(gameState.difficulty || 'chieftain')));
  // scenarioFlags: bit 0x4 (raging hordes / bloodlust scaling) applied
  // for huge maps (>5999 tiles) per block_00410000.c:6530-6532.
  // bit 0x8 applied for small maps (<3000 tiles) OR vanilla MGE maps
  // (Frida captured value is 8 for 80x50 games consistently).
  // When state doesn't carry a value, default to the captured MGE value.
  let scenarioFlags;
  if (typeof gameState.scenarioFlags === 'number') {
    scenarioFlags = gameState.scenarioFlags;
  } else {
    scenarioFlags = 0x8;  // default matches vanilla MGE Frida capture
    if (gameState.barbarianActivity === 'raging') scenarioFlags |= 0x4;
    if (gameState.bloodlust || gameState.gameToggles?.bloodlust) scenarioFlags |= 0x8;
  }
  return {
    difficulty,
    humanPlayers: gameState.humanPlayers ?? 0,
    scenarioFlags,
    scenarioFlagBcb4: 0,
    scenarioTechParadigm: 10,
    cosmicTechParadigm: (typeof COSMIC_TECH_MULTIPLIER === 'number') ? COSMIC_TECH_MULTIPLIER : 10,
    leaderSlot,
    techCounter: gameState.turn?.number ?? gameState.turnsPassed ?? 0,
    numDefinedTechs,
    civAcqTechCount: civ.acquiredTechCount ?? 0,
    civFutureTechCount: civ.futureTechCount ?? 0,
    leaderAcqTechCount: leader.acquiredTechCount ?? 0,
    leaderFutureTechCount: leader.futureTechCount ?? 0,
  };
}

export function calcResearchCostExact(gameState, civSlot) {
  const g = gameState.researchCostGlobals ?? deriveResearchCostGlobals(gameState, civSlot);
  if (!g) return calcResearchCost(gameState, civSlot);

  // Line 959-963: uVar1 = acqTechCount + futureTechCount; clamp min 1
  let uVar1 = g.civAcqTechCount + g.civFutureTechCount;
  if (uVar1 < 2) uVar1 = 1;

  // Line 964: clamp difficulty to [0, 4]. (Deity=5 → 4)
  let local_14 = Math.max(0, Math.min(4, g.difficulty));
  // Line 965-970: AI vs human adjustment
  const civBit = 1 << civSlot;
  const isHuman = (g.humanPlayers & civBit) !== 0;
  if (!isHuman) local_14 = 0xe - local_14;  // AI: 14 - diff
  else local_14 = local_14 * 2 + 6;         // Human: 2*diff + 6

  // Line 971-995: Leader comparison block
  //   gated on: (scenarioFlags & 0x80) == 0 OR DAT_0064bcb4 == 0
  if (((g.scenarioFlags & 0x80) === 0) || (g.scenarioFlagBcb4 === 0)) {
    const leaderCombined = g.leaderAcqTechCount + g.leaderFutureTechCount;
    if (uVar1 < leaderCombined) {
      if (g.difficulty !== 0) local_14 -= 1;
      // Deity special: if much further behind AND turn > 150 (tech counter), -1 more
      if (g.difficulty === 5 && (uVar1 + 4 < leaderCombined) && (g.techCounter > 150)) {
        local_14 -= 1;
      }
    } else {
      // Ahead of leader: penalty = (excess / 3)
      local_14 += Math.trunc((uVar1 - leaderCombined) / 3);
    }
    // Line 989-993: late-game adjustment. uVar1 > 19 only.
    let local_10 = 0;
    if (uVar1 > 0x13) {
      // Binary: clamp(uVar1 - (techCounter + (techCounter>>31 & 7)) >> 3, 0, 6)
      // The `>>31 & 7` is signed-divide-by-8 rounding fix. For non-negative
      // techCounter it's just (techCounter >> 3) = floor(techCounter/8).
      const sh = (g.techCounter < 0)
        ? (g.techCounter + ((g.techCounter >> 31) & 7)) >> 3
        : g.techCounter >> 3;
      local_10 = Math.max(0, Math.min(6, uVar1 - sh));
    }
    local_14 += local_10;
  }

  // Line 996-1003: tech paradigm multiplier
  if ((g.scenarioFlags & 0x80) === 0) {
    if (g.cosmicTechParadigm !== 10) {
      local_14 = Math.trunc((g.cosmicTechParadigm * local_14) / 10);
    }
  } else if (g.scenarioTechParadigm !== 10) {
    local_14 = Math.trunc((g.scenarioTechParadigm * local_14) / 10);
  }

  // Line 1004-1009: baseCost += baseCost * 3/4 (scaled early)
  let local_1c = (local_14 * 3) >> 2;
  if (uVar1 < 0x14) {
    local_1c = Math.trunc((uVar1 * local_1c) / 0x14);
  }
  local_14 = local_14 + local_1c;

  // Line 1011-1013: defined-techs scaling
  if (g.numDefinedTechs > 0x43) {
    local_14 = Math.trunc((local_14 * 0x43) / g.numDefinedTechs);
  }

  // Line 1014-1015: scenario flag bit 4 (0x4) → *5/4
  if ((g.scenarioFlags & 4) !== 0) {
    const t = local_14 * 5;
    local_14 = (t + ((t >> 31) & 3)) >> 2;
  }
  // Line 1017-1018: scenario flag bit 3 (0x8) → *4/5
  if ((g.scenarioFlags & 8) !== 0) {
    local_14 = Math.trunc((local_14 * 4) / 5);
  }

  // Line 1020-1023: human minimum floor
  if (isHuman && local_14 < (0xb - uVar1)) {
    local_14 = 0xb - uVar1;
  }

  // Line 1024-1027: final cost = local_14 * uVar1 with overflow clamp
  let local_18 = local_14 * uVar1;
  if (local_18 < 1 || local_18 > 32000) local_18 = 32000;
  return local_18;
}

export function calcResearchCost(gameState, civSlot) {
  // Binary FUN_004c2788 uses tech_counter + futureTechCount (at civ_struct
  // offsets +0xB0 and +0xB1, aka save data_block +16 and +17). This is
  // NOT the same as civTechs.size: the counter includes the currently-in-
  // progress tech as +1, while civTechs only counts *discovered* techs.
  // Mismatched-by-one totalTechs yields a too-low cost, causing techs to
  // complete a turn early (e.g., civ 5 at turn 16 with 10 beakers would
  // complete Bronze Working because v3's cost=10 vs real cost=18).
  //
  // Prefer the parsed counter fields; fall back to civTechs size so old
  // tests and callers without the counter fields still work.
  const civ = gameState.civs?.[civSlot];
  const civTechs = gameState.civTechs?.[civSlot];
  const counterTotal = (civ?.acquiredTechCount ?? 0) + (civ?.futureTechCount ?? 0);
  const techsSizeTotal = civTechs ? civTechs.size : 0;
  const totalTechs = Math.max(1, counterTotal || techsSizeTotal);

  // Difficulty may arrive as a number (0..5) or a string ('chieftain'..'deity').
  // The numeric form (from sav/snapshot parser) was being silently treated as
  // Chieftain because indexOf(5) returns -1 on the string array — making AI
  // research costs 14 (Chieftain) instead of 10 (Deity), a ~40% inflation.
  const diffRaw = gameState.difficulty;
  const diffIdx = Math.max(0, typeof diffRaw === 'number'
    ? Math.min(5, diffRaw)
    : DIFFICULTY_KEYS.indexOf(diffRaw || 'chieftain'));

  // Binary FUN_004c2788: difficulty clamped to [0,4] (Deity treated as Emperor)
  // Human: clampedDiff * 2 + 6 (Chieftain=6 fast, Deity=14 slow)
  // AI:    14 - clampedDiff    (Chieftain=14 slow, Deity=10 fast)
  const isHumanCiv = !!(gameState.humanPlayers & (1 << civSlot));
  const clampedDiff = Math.min(diffIdx, 4);
  let baseCost = isHumanCiv ? (clampedDiff * 2 + 6) : (14 - clampedDiff);

  // ── Leading-civ tech cost adjustment (FUN_004c2788, line 971) ──
  // Compare this civ's tech count to the LEADER civ's tech count.
  // Behind: cost -= 1 (catch-up bonus); Ahead: cost += (ahead / 3) (penalty).
  //
  // Binary uses DAT_00655c20 (a specific leader slot, not max-across-civs).
  // Frida probe (session game_20260420_213030) showed leaderSlot=0 (barbarian,
  // which has 0 techs). That matches how the binary initializes DAT_00655c20
  // (block_00480000.c:1082) — defaults to 0 and stays 0 unless a human
  // civ's rank matches the DAT_00655c2a rank array, which often fails early
  // in the game. Using leader=civ0.techCount (= 0) fits all 9 Frida-observed
  // cost cases.
  //
  // If state.leaderSlot is explicitly set by the harness (from a Frida
  // probe), use that civ's tech count. Otherwise default to civ 0's count.
  const turnNum = gameState.turn?.number || 0;
  {
    const leaderSlot = gameState.leaderSlot ?? 0;
    const leaderTechCount = gameState.civTechCounts?.[leaderSlot]
      ?? (gameState.civTechs?.[leaderSlot]?.size || 0);

    if (totalTechs < leaderTechCount) {
      // Behind the leader: catch-up bonus
      if (diffIdx !== 0) {
        baseCost -= 1;
      }
      // Deity super-behind: additional -1 if techCount + 4 < leader AND turn > 150
      if (diffIdx === 5 && totalTechs + 4 < leaderTechCount && turnNum > 150) {
        baseCost -= 1;
      }
    } else if (totalTechs >= leaderTechCount) {
      // Ahead of or tied with leader: penalty
      baseCost += Math.floor((totalTechs - leaderTechCount) / 3);
    }
  }

  // Late-game penalty (totalTechs > 19)
  if (totalTechs > 19) {
    const latePenalty = Math.max(0, Math.min(6, totalTechs - Math.floor(turnNum / 8)));
    baseCost += latePenalty;
  }

  // COSMIC tech multiplier (default 3, meaning baseCost * 3/10)
  if (COSMIC_TECH_MULTIPLIER !== 10) {
    baseCost = Math.floor((COSMIC_TECH_MULTIPLIER * baseCost) / 10);
  }

  // Progressive modifier (75% adder, scaled early)
  let modifier = (baseCost * 3) >> 2;
  if (totalTechs < 20) {
    modifier = Math.floor((totalTechs * modifier) / 20);
  }
  baseCost += modifier;

  // ── Defined-techs scaling (FUN_004c2788, line 1011-1012) ──
  // Binary: DAT_00655b1a = total number of defined techs (entries with exists!=0).
  // If numDefinedTechs > 67, scale cost down: cost = cost * 67 / numDefinedTechs.
  // With default RULES.TXT this is ~90 techs, so cost is always scaled by 67/90.
  //
  // Live Frida probe (game_20260420_202141) shows binary behaves as if
  // N≈111 for that session's configuration. But applying N=111 retroactively
  // regresses fidelity on older session game_20260419_112207 (extra AI
  // units produced, early tech completions) — suggesting N is game-config
  // or RULES-dependent. See v3_research_cost_delta.md for data; to pin
  // this, probe DAT_00655b1a at session start via Frida and make N
  // session-configurable. For now, stick with derived 90.
  {
    // Frida-probed DAT_00655b1a = 89 (stable across game_20260420_202141
    // and _210339 with default RULES.TXT at Deity). Use the observed
    // value. Small delta from v3's previous assumption (90) but exact.
    const numDefinedTechs = 89;
    if (numDefinedTechs > 67) {
      baseCost = Math.floor(baseCost * 67 / numDefinedTechs);
    }
  }

  // Raging hordes penalty: ×5/4 (binary FUN_004c2788 line 1014-1015)
  // C: `(local_14 * 5 + (local_14 * 5 >> 0x1f & 3U)) >> 2`
  // For positive baseCost this is floor(baseCost * 5 / 4).
  // The `>> 0x1f & 3` is a signed-division rounding fix for negative values
  // only — for non-negative values it's just `(baseCost * 5) >> 2`.
  if (gameState.barbarianActivity === 'raging') {
    baseCost = (baseCost * 5) >> 2;
  }

  // Gap 95: Bloodlust scenario flag (binary: DAT_00655af0 & 8)
  // Scales research cost by 4/5 (makes research cheaper under bloodlust)
  if (gameState.bloodlust || gameState.gameToggles?.bloodlust) {
    baseCost = Math.floor((baseCost * 4) / 5);
  }

  // Human minimum floor (binary: only applies when civ is in humanMask)
  if (isHumanCiv && baseCost < 11 - totalTechs) {
    baseCost = 11 - totalTechs;
  }

  // Final cost = baseCost × totalTechs
  // Binary (FUN_004c2788, line 1025): if cost < 1 OR cost > 32000, set to 32000.
  // Both out-of-range branches collapse to 32000 (not clamped to 1).
  let cost = baseCost * totalTechs;
  if (cost < 1 || cost > 32000) {
    cost = 32000;
  }

  return cost;
}

/**
 * Grant an advance to a civ. Updates civTechs and civTechCounts.
 *
 * @param {object} state - mutable game state (will be modified)
 * @param {number} civSlot
 * @param {number} advanceId
 */
/**
 * (#169) Grant an advance to a civ. Updates civTechs, civTechCounts,
 * and tracks the source civ that provided the tech.
 *
 * @param {object} state - mutable game state (will be modified)
 * @param {number} civSlot
 * @param {number} advanceId
 * @param {number} [sourceCiv] - which civ provided the tech (for tracking)
 */
export function grantAdvance(state, civSlot, advanceId, sourceCiv) {
  if (!state.civTechs) state.civTechs = [];
  if (!state.civTechs[civSlot]) state.civTechs[civSlot] = new Set();
  state.civTechs[civSlot] = new Set(state.civTechs[civSlot]);
  state.civTechs[civSlot].add(advanceId);

  // Update tech count
  if (!state.civTechCounts) state.civTechCounts = new Array(8).fill(0);
  state.civTechCounts = [...state.civTechCounts];
  state.civTechCounts[civSlot] = state.civTechs[civSlot].size;

  // (#169) Track tech source: which civ provided each tech
  if (sourceCiv != null && sourceCiv >= 0) {
    if (!state.techSources) state.techSources = {};
    if (!state.techSources[civSlot]) state.techSources[civSlot] = {};
    state.techSources[civSlot] = { ...state.techSources[civSlot], [advanceId]: sourceCiv };
  }
}

// ── TECH IDs referenced by name (standard MGE RULES.TXT order) ──
const TECH_GUNPOWDER = 35;
const TECH_AUTOMOBILE = 5;
const TECH_MONARCHY = 54;
const TECH_REPUBLIC = 71;
const TECH_DEMOCRACY = 21;
const TECH_COMMUNISM = 15;
const TECH_FUNDAMENTALISM = 31;
const TECH_PHILOSOPHY = 60;
// Future Tech sentinel (techId 0x59 = 89 or >= 100)
const FUTURE_TECH_ID = 89;

// Government indices (matching GOVERNMENT_NAMES)
const GOVT_ANARCHY = 0;
const GOVT_DESPOTISM = 1;
const GOVT_MONARCHY = 2;
const GOVT_COMMUNISM = 3;
const GOVT_FUNDAMENTALISM = 4;
const GOVT_REPUBLIC = 5;
const GOVT_DEMOCRACY = 6;

/**
 * Handle tech discovery effects — ported from FUN_004bf05b.
 *
 * Called after grantAdvance(). Processes:
 *   a. Barracks refund on obsoleting tech (Gunpowder/Automobile/etc.)
 *   b. Wonder obsolescence notifications
 *   c. Leonardo's auto-upgrade via upgradeUnitsForTech()
 *   d. First-discoverer tracking (for scoring)
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot - the civ that discovered the tech
 * @param {number} techId - the advance ID discovered
 * @returns {object[]} array of event objects for the UI/log
 */
export function handleTechDiscovery(state, civSlot, techId) {
  const events = [];

  // ── Future tech handling ──
  if (techId >= FUTURE_TECH_ID) {
    if (!state.futureTechCounts) state.futureTechCounts = new Array(8).fill(0);
    state.futureTechCounts = [...state.futureTechCounts];
    state.futureTechCounts[civSlot]++;
    events.push({
      type: 'futureTech', civSlot,
      count: state.futureTechCounts[civSlot],
    });
    return events;
  }

  // ── First-discoverer tracking ──
  if (!state.firstDiscoverer) state.firstDiscoverer = {};
  const isFirstDiscoverer = !(techId in state.firstDiscoverer);
  if (isFirstDiscoverer) {
    state.firstDiscoverer = { ...state.firstDiscoverer, [techId]: civSlot };
  }
  // Track all discoverers via bitmask
  if (!state.techDiscoveredBitmask) state.techDiscoveredBitmask = {};
  state.techDiscoveredBitmask = { ...state.techDiscoveredBitmask };
  state.techDiscoveredBitmask[techId] =
    (state.techDiscoveredBitmask[techId] || 0) | (1 << civSlot);

  // (#127) Barracks obsolescence: walk full chain from Gunpowder.
  // Binary walks the tech chain from Gunpowder (35) to find the latest
  // non-obsolete barracks tech. Each barracks-tier tech obsoletes the previous.
  // Chain: Gunpowder(35) → Automobile(5) → (end). When any tech in this chain
  // is discovered, Barracks (building 2) are removed and maintenance refunded.
  {
    const BARRACKS_CHAIN = [TECH_GUNPOWDER, TECH_AUTOMOBILE]; // extendable
    if (BARRACKS_CHAIN.includes(techId)) {
      let barracksCount = 0;
      for (let ci = 0; ci < state.cities.length; ci++) {
        const city = state.cities[ci];
        if (city.owner !== civSlot || city.size <= 0) continue;
        if (!city.buildings || !city.buildings.has(2)) continue;
        barracksCount++;
        const newBuildings = new Set(city.buildings);
        newBuildings.delete(2);
        state.cities[ci] = { ...city, buildings: newBuildings };
      }
      if (barracksCount > 0) {
        const refund = (IMPROVE_MAINTENANCE[2] || 1) * barracksCount;
        const civ = { ...state.civs[civSlot] };
        civ.treasury = (civ.treasury || 0) + refund;
        state.civs[civSlot] = civ;
        events.push({
          type: 'barracksObsolete', civSlot,
          count: barracksCount, refund,
          obsoletingTech: techId,
        });
      }
    }
  }

  // ── Wonder obsolescence notifications ──
  // When a tech is first discovered globally, check if it obsoletes any wonder.
  // The wonder's effect is disabled for ALL civs (handled by wonderObsolete() in utils.js),
  // but we emit events so the UI can notify the wonder's owner.
  if (isFirstDiscoverer) {
    for (let wi = 0; wi < WONDER_OBSOLETE.length; wi++) {
      if (WONDER_OBSOLETE[wi] !== techId) continue;
      const wonder = state.wonders?.[wi];
      if (!wonder || wonder.cityIndex == null || wonder.destroyed) continue;
      // Find the owner of the wonder's city
      const wonderCity = state.cities[wonder.cityIndex];
      const wonderOwner = wonderCity?.owner;
      events.push({
        type: 'wonderObsolete', civSlot: wonderOwner,
        wonderIndex: wi, wonderName: WONDER_NAMES[wi],
        obsoletedBy: ADVANCE_NAMES[techId], discoverer: civSlot,
      });
    }
  }

  // ── Leonardo's Workshop: auto-upgrade units ──
  const upgradeEvents = upgradeUnitsForTech(state, civSlot, techId);
  events.push(...upgradeEvents);

  // ── Government revolution prompt ──
  const govtEvent = checkGovernmentRevolution(state, civSlot, techId);
  if (govtEvent) events.push(govtEvent);

  // ── Great Library cascade ──
  const libEvents = checkGreatLibraryCascade(state, techId);
  events.push(...libEvents);

  // ── Golden Age: Philosophy first-discoverer bonus ──
  // Binary FUN_004bf05b: tech 0x3c (60 = Philosophy) first discoverer
  // sets civ flag 0x20 and triggers golden age city selection (FUN_004bee56)
  if (techId === TECH_PHILOSOPHY && isFirstDiscoverer) {
    // Set civ flag 0x20
    if (state.civs?.[civSlot]) {
      state.civs = [...state.civs];
      const civ = { ...state.civs[civSlot] };
      civ.philosophyBonus = true; // civ flag 0x20
      state.civs[civSlot] = civ;
    }
    const goldenEvent = triggerGoldenAge(state, civSlot);
    if (goldenEvent) events.push(goldenEvent);
  }

  return events;
}

/**
 * Upgrade units for a civ when they have Leonardo's Workshop — ported from FUN_004be6ba.
 *
 * When a civ with Leonardo's Workshop (wonder 14) discovers a tech that
 * obsoletes a unit type, all units of the obsoleted type are auto-upgraded
 * to the new type for free.
 *
 * Without Leonardo's, this is a no-op (old units remain but can't be built).
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot
 * @param {number} techId - the newly discovered tech
 * @returns {object[]} upgrade events
 */
export function upgradeUnitsForTech(state, civSlot, techId) {
  const events = [];

  // Check Leonardo's Workshop (wonder index 14)
  if (!hasLeonardosWorkshop(state, civSlot)) return events;

  const techs = state.civTechs?.[civSlot];
  if (!techs) return events;

  // Track which unit types we've already notified about
  const notified = new Set();

  for (let ui = 0; ui < state.units.length; ui++) {
    const u = state.units[ui];
    if (u.owner !== civSlot || u.gx < 0) continue;

    const unitTypeId = u.type;
    let obsoleteTech = UNIT_OBSOLETE[unitTypeId];

    // If obsoleteTech < 0, this unit type is never obsolete
    if (obsoleteTech < 0) continue;

    // The civ must have the obsoleting tech for the upgrade to trigger
    if (!techs.has(obsoleteTech)) continue;

    // Find best upgrade (FUN_004be6ba, lines 6472-6478):
    // Binary matches candidate.prereq_tech (offset 0x13) == unit.obsolete_tech (offset 0x08),
    // same role (offset 0x12), and candidate.hold >= unit.hold (offset 0x11).
    // Take the last match (highest index = most advanced).
    let bestUpgrade = -1;
    const unitHold = UNIT_CARRY_CAP[unitTypeId] || 0;
    for (let candidate = 0; candidate < UNIT_PREREQS.length; candidate++) {
      if (candidate === unitTypeId) continue;
      if (UNIT_PREREQS[candidate] !== obsoleteTech) continue;
      if (UNIT_ROLE[candidate] !== UNIT_ROLE[unitTypeId]) continue;
      if ((UNIT_CARRY_CAP[candidate] || 0) < unitHold) continue;
      bestUpgrade = candidate;
    }

    if (bestUpgrade >= 0) {
      if (!notified.has(unitTypeId)) {
        events.push({
          type: 'leonardoUpgrade', civSlot,
          fromType: unitTypeId, fromName: UNIT_NAMES[unitTypeId],
          toType: bestUpgrade, toName: UNIT_NAMES[bestUpgrade],
        });
        notified.add(unitTypeId);
      }
      // Apply upgrade: change type, clear veteran flag (bit 0x2000)
      state.units[ui] = {
        ...u,
        type: bestUpgrade,
        veteran: false,
      };
    }
  }

  return events;
}

/**
 * Check if a civ has Leonardo's Workshop AND it's not obsolete.
 * Inlined to avoid circular dependency with utils.js.
 */
function hasLeonardosWorkshop(state, civSlot) {
  // Wonder 14 = Leonardo's Workshop, obsoleted by Automobile (tech 5)
  const LEONARDO_IDX = 14;
  const obsTech = WONDER_OBSOLETE[LEONARDO_IDX];

  // Check if any civ has the obsoleting tech
  if (obsTech >= 0 && state.civTechs) {
    for (let c = 0; c < 8; c++) {
      if (state.civTechs[c]?.has(obsTech)) return false;
    }
  }

  // Check if this civ owns the wonder
  const w = state.wonders?.[LEONARDO_IDX];
  if (!w || w.cityIndex == null || w.destroyed) return false;
  const city = state.cities[w.cityIndex];
  return city && city.owner === civSlot;
}

/**
 * Check if a wonder is active and owned by a specific civ.
 * Inlined to avoid circular dependency with utils.js.
 *
 * @param {object} state
 * @param {number} civSlot
 * @param {number} wonderIdx
 * @returns {boolean}
 */
function hasWonderEffectInline(state, civSlot, wonderIdx) {
  const obsTech = WONDER_OBSOLETE[wonderIdx];
  if (obsTech >= 0 && state.civTechs) {
    for (let c = 0; c < 8; c++) {
      if (state.civTechs[c]?.has(obsTech)) return false;
    }
  }
  const w = state.wonders?.[wonderIdx];
  if (!w || w.cityIndex == null || w.destroyed) return false;
  const city = state.cities[w.cityIndex];
  return city && city.owner === civSlot;
}

// ═══════════════════════════════════════════════════════════════════
// TECH_GOVERNMENT_REVOLUTION — prompt revolution on government-
// unlocking techs (ported from binary auto-revolution logic)
// ═══════════════════════════════════════════════════════════════════

/**
 * Government-tech → new-government mapping.
 * Binary triggers auto-revolution prompts when a tech unlocks a new
 * government form and the civ's current government is "worse".
 */
const GOVT_UNLOCK_MAP = [
  { techId: TECH_MONARCHY,        govtIndex: GOVT_MONARCHY,        promptIf: (g) => g === GOVT_DESPOTISM },
  { techId: TECH_REPUBLIC,        govtIndex: GOVT_REPUBLIC,        promptIf: (g) => g !== GOVT_REPUBLIC },
  { techId: TECH_DEMOCRACY,       govtIndex: GOVT_DEMOCRACY,       promptIf: (g) => g !== GOVT_DEMOCRACY },
  { techId: TECH_COMMUNISM,       govtIndex: GOVT_COMMUNISM,       promptIf: (g) => g !== GOVT_COMMUNISM },
  { techId: TECH_FUNDAMENTALISM,  govtIndex: GOVT_FUNDAMENTALISM,  promptIf: (g) => g !== GOVT_FUNDAMENTALISM },
];

/**
 * Check if a discovered tech unlocks a new government and the civ
 * should be prompted to revolt.
 *
 * Skip if current government is already Democracy (6) or Anarchy (0).
 *
 * @param {object} state
 * @param {number} civSlot
 * @param {number} techId
 * @returns {object|null} event { type:'governmentUnlocked', civSlot, techId, newGovernment } or null
 */
export function checkGovernmentRevolution(state, civSlot, techId) {
  const civ = state.civs?.[civSlot];
  if (!civ) return null;

  // Resolve current government to numeric index
  const govtName = civ.government || 'despotism';
  const govtIdx = GOVERNMENT_NAMES.indexOf(
    govtName.charAt(0).toUpperCase() + govtName.slice(1)
  );
  const currentGovt = govtIdx >= 0 ? govtIdx : GOVT_DESPOTISM;

  // Already in Democracy or Anarchy — no prompt
  if (currentGovt === GOVT_DEMOCRACY || currentGovt === GOVT_ANARCHY) return null;

  for (const entry of GOVT_UNLOCK_MAP) {
    if (entry.techId !== techId) continue;
    // Binary FUN_004bea84: skip if civ already HAS this government
    if (currentGovt === entry.govtIndex) continue;
    if (!entry.promptIf(currentGovt)) continue;
    return {
      type: 'governmentUnlocked',
      civSlot,
      techId,
      newGovernment: GOVERNMENT_NAMES[entry.govtIndex].toLowerCase(),
    };
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════
// GOLDEN_AGE — Philosophy first-discoverer bonus
// ═══════════════════════════════════════════════════════════════════

/**
 * Trigger a Golden Age for a civ: pick a random city weighted by size
 * (Palace city doubles weight) and grant it a WeLoveKingDay bonus.
 *
 * @param {object} state - mutable game state
 * @param {number} civSlot
 * @returns {object|null} event { type:'goldenAge', civSlot, cityIndex } or null
 */
export function triggerGoldenAge(state, civSlot) {
  if (!state.cities) return null;

  // Build weighted list of cities owned by this civ
  const candidates = [];
  let totalWeight = 0;
  for (let ci = 0; ci < state.cities.length; ci++) {
    const city = state.cities[ci];
    if (city.owner !== civSlot || city.size <= 0) continue;
    let weight = city.size;
    // Palace (building 1) doubles weight
    if (city.buildings?.has(1)) weight *= 2;
    candidates.push({ ci, weight });
    totalWeight += weight;
  }

  if (candidates.length === 0) return null;

  // Pick a random city weighted by size
  const roll = state.rng
    ? state.rng.nextInt(totalWeight)
    : Math.floor(Math.random() * totalWeight);
  let accum = 0;
  let chosen = candidates[0].ci;
  for (const c of candidates) {
    accum += c.weight;
    if (roll < accum) {
      chosen = c.ci;
      break;
    }
  }

  // Binary FUN_004bee56: notification only — WLTKD is determined by happiness calc,
  // not set directly by this function
  return { type: 'goldenAge', civSlot, cityIndex: chosen };
}

// ═══════════════════════════════════════════════════════════════════
// GREAT LIBRARY CASCADE — grant techs known by 2+ civs
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if the Great Library owner should receive a newly-discovered tech.
 *
 * When a tech is known by 2+ civs, the Great Library owner (wonder 4)
 * gets it free if they don't already have it.
 *
 * Called from handleTechDiscovery after granting a tech, so the
 * techDiscoveredBitmask is already updated. We check the bitmask to
 * see if 2+ civs now know this tech.
 *
 * @param {object} state - mutable game state
 * @param {number} techId - the advance just discovered
 * @returns {object[]} array of events
 */
export function checkGreatLibraryCascade(state, techId) {
  const events = [];
  const GREAT_LIBRARY_IDX = 4;

  // Find who owns the Great Library (and check it's not obsolete)
  let libraryOwner = -1;
  for (let c = 1; c < 8; c++) {
    if (hasWonderEffectInline(state, c, GREAT_LIBRARY_IDX)) {
      libraryOwner = c;
      break;
    }
  }
  if (libraryOwner < 0) return events;

  // Already knows this tech?
  if (state.civTechs?.[libraryOwner]?.has(techId)) return events;

  // Count how many civs know this tech
  let knownCount = 0;
  for (let c = 1; c < 8; c++) {
    if (state.civTechs?.[c]?.has(techId)) knownCount++;
  }

  if (knownCount >= 2) {
    // Binary FUN_004bf05b:6929 recursively calls full handleTechDiscovery
    // for the library owner, processing barracks refund, Leonardo's upgrade,
    // wonder obsolescence, etc. grantAdvance must be called first so the
    // recursive handleTechDiscovery's own Great Library check sees the tech
    // as already known (preventing infinite recursion).
    grantAdvance(state, libraryOwner, techId);
    events.push({
      type: 'freeAdvance',
      civSlot: libraryOwner,
      advanceId: techId,
      source: 'Great Library',
    });
    const cascadeEvents = handleTechDiscovery(state, libraryOwner, techId);
    events.push(...cascadeEvents);
  }

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// TECH_PREREQUISITE_CHECK — recursive prereq tree search
// ═══════════════════════════════════════════════════════════════════

/**
 * Recursive check: is techA anywhere in techB's prerequisite tree?
 *
 * Returns true if techA == techB, or if techA is a direct or indirect
 * prerequisite of techB.
 *
 * Uses ADVANCE_PREREQS from defs.js. Handles cycles via a visited set.
 *
 * @param {number} techA - the potential ancestor tech
 * @param {number} techB - the tech whose prereq tree to search
 * @returns {boolean}
 */
export function isPrereqOf(techA, techB) {
  if (techA === techB) return true;
  if (techB < 0 || techB >= ADVANCE_PREREQS.length) return false;
  if (techA < 0 || techA >= ADVANCE_PREREQS.length) return false;

  const visited = new Set();
  const stack = [techB];

  while (stack.length > 0) {
    const current = stack.pop();
    if (current === techA) return true;
    if (visited.has(current)) continue;
    visited.add(current);

    if (current < 0 || current >= ADVANCE_PREREQS.length) continue;
    const [p1, p2] = ADVANCE_PREREQS[current];
    if (p1 >= 0) stack.push(p1);
    if (p2 >= 0) stack.push(p2);
  }

  return false;
}

// ═══════════════════════════════════════════════════════════════════
// UNIT_AUTO_UPGRADE — switch obsoleted city production
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if a city is building a unit type that has been obsoleted by
 * a tech the civ already knows. If so, auto-switch production to
 * the replacement unit type.
 *
 * Replacement logic: find a unit type whose prereq tech matches the
 * obsoleted unit's obsolete tech, same domain, and attack >= old unit.
 * Take the last match (highest index = most advanced).
 *
 * Should be called at the start of processCityProduction.
 *
 * @param {object} state - game state (read-only for this check)
 * @param {number} cityIndex
 * @returns {object|null} event if production was switched, or null
 */
export function checkUnitAutoUpgrade(state, cityIndex) {
  const city = state.cities?.[cityIndex];
  if (!city || city.size <= 0) return null;

  const item = city.itemInProduction;
  if (!item || item.type !== 'unit') return null;

  const unitTypeId = item.id;
  const obsoleteTech = UNIT_OBSOLETE[unitTypeId];
  if (obsoleteTech < 0) return null; // never obsolete

  const civTechs = state.civTechs?.[city.owner];
  if (!civTechs || !civTechs.has(obsoleteTech)) return null; // civ doesn't have obsoleting tech

  // Find best replacement (FUN_004be6ba, lines 6472-6478):
  // Binary matches candidate.prereq_tech (offset 0x13) == unit.obsolete_tech (offset 0x08),
  // same role (offset 0x12), and candidate.hold >= unit.hold (offset 0x11).
  // Last match = highest index = most advanced.
  let bestUpgrade = -1;
  const unitHold = UNIT_CARRY_CAP[unitTypeId] || 0;
  for (let candidate = 0; candidate < UNIT_PREREQS.length; candidate++) {
    if (candidate === unitTypeId) continue;
    if (UNIT_PREREQS[candidate] !== obsoleteTech) continue;
    if (UNIT_ROLE[candidate] !== UNIT_ROLE[unitTypeId]) continue;
    if ((UNIT_CARRY_CAP[candidate] || 0) < unitHold) continue;
    bestUpgrade = candidate;
  }

  if (bestUpgrade < 0) return null;

  // Auto-switch production
  state.cities[cityIndex] = {
    ...city,
    itemInProduction: { type: 'unit', id: bestUpgrade },
  };

  return {
    type: 'productionAutoUpgrade',
    civSlot: city.owner,
    cityIndex,
    cityName: city.name,
    fromType: unitTypeId,
    fromName: UNIT_NAMES[unitTypeId],
    toType: bestUpgrade,
    toName: UNIT_NAMES[bestUpgrade],
  };
}
