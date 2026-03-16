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
 * Q.1: Enhanced with AI difficulty-based cost scaling from the binary.
 * AI civs get costs multiplied by (14 - difficultyLevel) / 10:
 *   Chieftain AI (0): ×1.4 (slower — helps human)
 *   Warlord AI (1):   ×1.3
 *   Prince AI (2):    ×1.2
 *   King AI (3):      ×1.1
 *   Emperor AI (4):   ×1.0 (no change)
 *   Deity AI (5):     ×0.9 (faster — challenges human)
 *
 * Based on FUN_004c2788.
 *
 * @param {object} gameState
 * @param {number} civSlot
 * @returns {number} beakers needed for the next tech
 */
export function calcResearchCost(gameState, civSlot) {
  const civTechs = gameState.civTechs?.[civSlot];
  const totalTechs = Math.max(1, civTechs ? civTechs.size : 1);

  const diffIdx = Math.max(0, DIFFICULTY_KEYS.indexOf(gameState.difficulty || 'chieftain'));

  // Base cost: human player formula
  let baseCost = diffIdx * 2 + 6;

  // Late-game penalty (totalTechs > 19)
  const turnNum = gameState.turn?.number || 0;
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

  // Raging hordes penalty
  if (gameState.barbarianActivity === 'raging') {
    baseCost = Math.floor((baseCost * 5 + 3) / 4);
  }

  // Human minimum floor
  if (baseCost < 11 - totalTechs) {
    baseCost = 11 - totalTechs;
  }

  // Final cost = baseCost × totalTechs
  let cost = Math.max(1, Math.min(32000, baseCost * totalTechs));

  // ── Q.1: AI difficulty-based cost scaling ──
  // Binary: aiCost = baseCost * (14 - difficultyLevel) / 10
  // Check if this civ is AI (not in humanPlayers bitmask)
  const isHuman = gameState.humanPlayers & (1 << civSlot);
  if (!isHuman && civSlot > 0) {
    // AI cost modifier: (14 - diffIdx) / 10
    // Chieftain(0): 14/10 = 1.4×, Deity(5): 9/10 = 0.9×
    cost = Math.max(1, Math.floor(cost * (14 - diffIdx) / 10));
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
// Future Tech sentinel (techId 0x59 = 89 or >= 100)
const FUTURE_TECH_ID = 89;

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
