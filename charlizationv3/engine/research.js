// ═══════════════════════════════════════════════════════════════════
// research.js — Tech research system (shared: server + client)
//
// Calculates research cost, available advances, and handles
// tech discovery during END_TURN.
// ═══════════════════════════════════════════════════════════════════

import { ADVANCE_PREREQS, ADVANCE_NAMES, COSMIC_TECH_MULTIPLIER, DIFFICULTY_KEYS } from './defs.js';

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
 * Simplified formula suitable for multiplayer (skips AI catch-up,
 * scenario flags, etc.). Based on FUN_004c2788.
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
