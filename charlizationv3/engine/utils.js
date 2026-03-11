// ═══════════════════════════════════════════════════════════════════
// utils.js — Shared helpers used across engine modules
//
// Single source of truth for common game-state queries.
// Avoids duplicating these functions in reducer, production,
// happiness, and citydialog.
// ═══════════════════════════════════════════════════════════════════

import { WONDER_OBSOLETE } from './defs.js';

/** Check if a city has a specific building by ID. */
export function cityHasBuilding(city, id) {
  return city.buildings ? city.buildings.has(id) : false;
}

/** Check if a civ owns a specific wonder (ignores obsolescence). */
export function civHasWonder(gameState, civSlot, wonderIndex) {
  const w = gameState.wonders?.[wonderIndex];
  if (!w || w.cityIndex == null || w.destroyed) return false;
  const city = gameState.cities[w.cityIndex];
  return city && city.owner === civSlot;
}

/** Check if a specific city has a specific wonder (ignores obsolescence). */
export function cityHasWonder(gameState, cityIndex, wonderIndex) {
  const w = gameState.wonders?.[wonderIndex];
  return w != null && w.cityIndex === cityIndex;
}

/** Check if a wonder has been obsoleted (any civ has the obsoleting tech). */
export function wonderObsolete(gameState, wonderIndex) {
  const obsTech = WONDER_OBSOLETE[wonderIndex];
  if (obsTech == null || obsTech < 0) return false;
  if (!gameState.civTechs) return false;
  for (let c = 0; c < 8; c++) {
    if (gameState.civTechs[c]?.has(obsTech)) return true;
  }
  return false;
}

/** Check if a civ has a wonder AND it's not obsolete. */
export function hasWonderEffect(gameState, civSlot, wonderIndex) {
  if (wonderObsolete(gameState, wonderIndex)) return false;
  return civHasWonder(gameState, civSlot, wonderIndex);
}

/** Check if a specific city has a wonder AND it's not obsolete. */
export function cityHasActiveWonder(gameState, cityIndex, wonderIndex) {
  if (wonderObsolete(gameState, wonderIndex)) return false;
  return cityHasWonder(gameState, cityIndex, wonderIndex);
}

/** Get government type string for a city's owner civ. */
export function getGovernment(city, gameState) {
  return gameState.civs?.[city.owner]?.government || 'despotism';
}
