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
  UNIT_PREREQS, UNIT_OBSOLETE, UNIT_DOMAIN, UNIT_ATK, UNIT_NAMES,
  WONDER_OBSOLETE, WONDER_NAMES, IMPROVE_MAINTENANCE,
  GOVERNMENT_NAMES,
} from './defs.js';

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
export function calcResearchCost(gameState, civSlot) {
  const civTechs = gameState.civTechs?.[civSlot];
  const totalTechs = Math.max(1, civTechs ? civTechs.size : 1);

  const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(gameState.difficulty || 'chieftain'));

  // Gap 94: Base cost differs for human vs AI (binary FUN_004c2788)
  // Human: difficultyLevel * 2 + 6 (harder diff = more expensive = slower research)
  // AI:    14 - difficultyLevel (harder diff = cheaper = faster AI research)
  const isHumanCiv = !!(gameState.humanPlayers & (1 << civSlot));
  let baseCost = isHumanCiv ? (diffIdx * 2 + 6) : (14 - diffIdx);

  // ── Leading-civ tech cost adjustment (FUN_004c2788, line 971) ──
  // Compare this civ's tech count to the leading civ's tech count.
  // Behind: cost -= 1 (catch-up bonus); Ahead: cost += (ahead / 3) (penalty).
  const turnNum = gameState.turn?.number || 0;
  {
    // Find leading civ's tech count (max tech count across all alive civs)
    let leaderTechCount = 0;
    for (let c = 1; c < 8; c++) {
      if (!(gameState.civsAlive & (1 << c))) continue;
      const tc = gameState.civTechCounts?.[c] || (gameState.civTechs?.[c]?.size || 0);
      if (tc > leaderTechCount) leaderTechCount = tc;
    }

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

  // ── City count scaling (FUN_004c2788, line 1004) ──
  // If civ has more than 67 cities, scale cost down: cost = cost * 67 / numCities
  {
    let numCities = 0;
    if (gameState.cities) {
      for (const c of gameState.cities) {
        if (c.owner === civSlot && c.size > 0) numCities++;
      }
    }
    if (numCities > 67) {
      baseCost = Math.floor(baseCost * 67 / numCities);
    }
  }

  // Raging hordes penalty (binary: DAT_00655af0 & 4)
  if (gameState.barbarianActivity === 'raging') {
    baseCost = Math.floor((baseCost * 5 + 3) / 4);
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
  const cost = Math.max(1, Math.min(32000, baseCost * totalTechs));

  return cost;
}

/**
 * Grant an advance to a civ. Updates civTechs and civTechCounts.
 *
 * @param {object} state - mutable game state (will be modified)
 * @param {number} civSlot
 * @param {number} advanceId
 */
export function grantAdvance(state, civSlot, advanceId) {
  if (!state.civTechs) state.civTechs = [];
  if (!state.civTechs[civSlot]) state.civTechs[civSlot] = new Set();
  state.civTechs[civSlot] = new Set(state.civTechs[civSlot]);
  state.civTechs[civSlot].add(advanceId);

  // Update tech count
  if (!state.civTechCounts) state.civTechCounts = new Array(8).fill(0);
  state.civTechCounts = [...state.civTechCounts];
  state.civTechCounts[civSlot] = state.civTechs[civSlot].size;
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

  // ── Barracks obsolescence (Gunpowder chain) ──
  // In Civ2, discovering Gunpowder (35) or the next barracks-obsoleting tech
  // removes Barracks (building 2) from all cities and refunds maintenance.
  // The chain: Gunpowder (35) → Automobile (5) can obsolete barracks.
  // Simplified: Gunpowder destroys Barracks I, but we only have one Barracks type.
  if (techId === TECH_GUNPOWDER) {
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
      });
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
  if (techId === TECH_PHILOSOPHY && isFirstDiscoverer) {
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

    // Find best upgrade: same domain, prereq matches the obsoleting tech,
    // attack >= old unit's attack. Take the last match (highest index = most advanced).
    let bestUpgrade = -1;
    for (let candidate = 0; candidate < UNIT_PREREQS.length; candidate++) {
      if (candidate === unitTypeId) continue;
      if (UNIT_PREREQS[candidate] !== obsoleteTech) continue;
      if (UNIT_DOMAIN[candidate] !== UNIT_DOMAIN[unitTypeId]) continue;
      if (UNIT_ATK[candidate] < UNIT_ATK[unitTypeId]) continue;
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

  // Grant WeLoveKingDay for next turn
  state.cities[chosen] = { ...state.cities[chosen], weLoveKingDay: true };

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
    grantAdvance(state, libraryOwner, techId);
    events.push({
      type: 'freeAdvance',
      civSlot: libraryOwner,
      advanceId: techId,
      source: 'Great Library',
    });
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

  // Find best replacement: same domain, prereq matches obsoleting tech,
  // attack >= old unit. Last match = highest index = most advanced.
  let bestUpgrade = -1;
  for (let candidate = 0; candidate < UNIT_PREREQS.length; candidate++) {
    if (candidate === unitTypeId) continue;
    if (UNIT_PREREQS[candidate] !== obsoleteTech) continue;
    if (UNIT_DOMAIN[candidate] !== UNIT_DOMAIN[unitTypeId]) continue;
    if (UNIT_ATK[candidate] < UNIT_ATK[unitTypeId]) continue;
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
