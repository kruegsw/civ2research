// ═══════════════════════════════════════════════════════════════════
// buildcheck.js — Production prerequisite checks (shared: server + client)
//
// Port of FUN_004bfe5a (can_build_unit_type), FUN_004c03ae
// (can_build_improvement), and FUN_004c02d8 (can_build_wonder)
// from Civ2 binary. Validates whether a civ/city can build a
// specific unit, building, or wonder.
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_PREREQS, UNIT_OBSOLETE, UNIT_DOMAIN,
  IMPROVE_PREREQS, IMPROVE_COSTS, IMPROVE_REQUIRES_BUILDING,
  COASTAL_BUILDINGS, POWER_PLANT_BUILDINGS,
  SS_STRUCTURAL, SS_COMPONENT, SS_MODULE,
  WONDER_PREREQS, WONDER_OBSOLETE,
  UNIT_COSTS, FANATIC_TYPES,
} from './defs.js';
import { cityHasBuilding, hasWonderEffect, getGovernment } from './utils.js';

/**
 * Check if a civ can build a specific unit type.
 * Port of FUN_004bfe5a — tech prereqs, obsolescence, domain, government.
 *
 * @param {number} civSlot
 * @param {number} cityIndex - city index, or -1 for generic check
 * @param {number} unitTypeId
 * @param {object} gameState
 * @param {object} mapBase
 * @returns {boolean}
 */
export function canBuildUnitType(civSlot, cityIndex, unitTypeId, gameState, mapBase) {
  if (unitTypeId < 0 || UNIT_COSTS[unitTypeId] == null) return false;

  const civTechs = gameState.civTechs?.[civSlot];
  const hasTech = (id) => id < 0 || (civTechs ? civTechs.has(id) : false);

  // Tech prerequisite
  const prereq = UNIT_PREREQS[unitTypeId] ?? -1;
  if (prereq <= -2) return false; // unbuildable (e.g., Extra Land slots 51+)
  if (prereq >= 0 && !hasTech(prereq)) return false;

  // Obsolescence
  const obsolete = UNIT_OBSOLETE[unitTypeId] ?? -1;
  if (obsolete >= 0 && hasTech(obsolete)) return false;

  // Domain restrictions for sea units: need coastal city
  const domain = UNIT_DOMAIN[unitTypeId] ?? 0;
  if (domain === 2 && cityIndex >= 0) {
    const city = gameState.cities[cityIndex];
    if (city && !isCityCoastal(city, mapBase)) return false;
  }

  // Fanatics require Fundamentalism government
  if (FANATIC_TYPES.has(unitTypeId)) {
    const govt = getGovernment(null, gameState, civSlot);
    if (govt !== 'fundamentalism') return false;
  }

  return true;
}

/**
 * Check if a civ/city can build a specific building (improvement).
 * Port of FUN_004c03ae — tech prereqs, already built, building chains,
 * coastal, power plant exclusion, spaceship validation.
 *
 * @param {number} civSlot
 * @param {number} cityIndex - city index, or -1 for generic check
 * @param {number} buildingId - 1-38 (buildings) or 39+ (wonder, delegated)
 * @param {object} gameState
 * @param {object} mapBase
 * @returns {boolean}
 */
export function canBuildImprovement(civSlot, cityIndex, buildingId, gameState, mapBase) {
  // Wonders use building IDs 39+ in the reducer convention (item.id for wonders)
  // But this function handles buildings 1-38 only. Caller should route wonders separately.

  if (buildingId < 1 || buildingId > 38) return false;

  const civTechs = gameState.civTechs?.[civSlot];
  const hasTech = (id) => id < 0 || (civTechs ? civTechs.has(id) : false);

  // Capitalization (38): always available once tech prereq is met
  if (buildingId === 38) {
    const prereq = IMPROVE_PREREQS[buildingId] ?? -1;
    return hasTech(prereq);
  }

  // Tech prerequisite
  const prereq = IMPROVE_PREREQS[buildingId] ?? -1;
  if (prereq >= 0 && !hasTech(prereq)) return false;

  // Generic availability check (no specific city)
  if (cityIndex < 0) return true;

  const city = gameState.cities[cityIndex];
  if (!city) return false;

  // Already built
  if (cityHasBuilding(city, buildingId)) return false;

  // ── Building prerequisite chain ──
  const requiredBuilding = IMPROVE_REQUIRES_BUILDING[buildingId];
  if (requiredBuilding != null && !cityHasBuilding(city, requiredBuilding)) return false;

  // ── Coastal requirements ──
  if (COASTAL_BUILDINGS.has(buildingId)) {
    if (!isCityCoastal(city, mapBase)) return false;
  }

  // ── Palace: unique per civ (only one palace) ──
  if (buildingId === 1) {
    // Check if civ already has a palace in another city
    for (let i = 0; i < gameState.cities.length; i++) {
      if (i === cityIndex) continue;
      const c = gameState.cities[i];
      if (c && c.owner === civSlot && c.size > 0 && cityHasBuilding(c, 1)) return false;
    }
  }

  // ── Power plant mutual exclusion ──
  if (POWER_PLANT_BUILDINGS.has(buildingId)) {
    // Must have Factory or Mfg. Plant (already checked via IMPROVE_REQUIRES_BUILDING for Factory)
    // But also check Mfg. Plant as alternative
    if (!cityHasBuilding(city, 15) && !cityHasBuilding(city, 16)) return false;
    // Cannot build if another power plant already exists
    for (const ppId of POWER_PLANT_BUILDINGS) {
      if (ppId !== buildingId && cityHasBuilding(city, ppId)) return false;
    }
    // Hydro Plant additionally requires city to be near river or mountains
    // (canBuildHydro flag from parser, or check terrain)
    if (buildingId === 20 && city.canBuildHydro === false) return false;
  }

  // ── Spaceship parts ──
  if (buildingId >= SS_STRUCTURAL && buildingId <= SS_MODULE) {
    // Need Apollo Program built (wonder 25)
    const apollo = gameState.wonders?.[25];
    if (!apollo || apollo.cityIndex == null || apollo.destroyed) return false;
    // Check spaceship not already launched
    if (gameState.spaceshipLaunched?.[civSlot]) return false;
  }

  return true;
}

/**
 * Check if a civ can build a specific wonder.
 * Port of FUN_004c02d8 — tech prereq, wonder slot availability.
 *
 * @param {number} civSlot
 * @param {number} wonderIndex - 0-27
 * @param {object} gameState
 * @returns {boolean}
 */
export function canBuildWonder(civSlot, wonderIndex, gameState) {
  if (wonderIndex < 0 || wonderIndex >= (gameState.wonders?.length || 28)) return false;

  const civTechs = gameState.civTechs?.[civSlot];
  const hasTech = (id) => id < 0 || (civTechs ? civTechs.has(id) : false);

  // Tech prerequisite
  const prereq = WONDER_PREREQS[wonderIndex] ?? -1;
  if (prereq >= 0 && !hasTech(prereq)) return false;

  // Wonder already built or destroyed → unavailable
  const w = gameState.wonders?.[wonderIndex];
  if (!w) return false;
  if (w.cityIndex != null) return false; // already built by someone
  if (w.destroyed) return false;

  // Wonder obsoleted by a tech any civ has → can't start building
  const obsTech = WONDER_OBSOLETE[wonderIndex] ?? -1;
  if (obsTech >= 0 && hasTech(obsTech)) return false;

  return true;
}

/**
 * Get the full list of available production items for a city.
 * Convenience wrapper around the three canBuild functions.
 *
 * @param {number} civSlot
 * @param {number} cityIndex
 * @param {object} gameState
 * @param {object} mapBase
 * @returns {{ units: number[], buildings: number[], wonders: number[] }}
 */
export function getAvailableProduction(civSlot, cityIndex, gameState, mapBase) {
  const units = [];
  const buildings = [];
  const wonders = [];

  // Units (0-51, but skip unbuildable extras)
  for (let id = 0; id < UNIT_COSTS.length; id++) {
    if (UNIT_COSTS[id] == null) continue;
    if (canBuildUnitType(civSlot, cityIndex, id, gameState, mapBase)) {
      units.push(id);
    }
  }

  // Buildings (1-38)
  for (let id = 1; id <= 38; id++) {
    if (IMPROVE_COSTS[id] == null) continue;
    if (canBuildImprovement(civSlot, cityIndex, id, gameState, mapBase)) {
      buildings.push(id);
    }
  }

  // Wonders (0-27)
  const wonderCount = gameState.wonders?.length || 28;
  for (let wi = 0; wi < wonderCount; wi++) {
    if (canBuildWonder(civSlot, wi, gameState)) {
      wonders.push(wi);
    }
  }

  return { units, buildings, wonders };
}

// ── Internal helpers ──

/**
 * Check if a city is adjacent to ocean (coastal).
 * Uses parser's canBuildCoastal flag if available, otherwise checks tiles.
 */
function isCityCoastal(city, mapBase) {
  // Parser-provided flag (from .sav attribs1 bit 7)
  if (city.canBuildCoastal != null) return city.canBuildCoastal;

  // Fallback: check adjacent tiles for ocean
  if (!mapBase?.getTerrain) return false;
  const { gx, gy } = city;
  const offsets = (gy % 2 === 0)
    ? [[0,-1],[1,0],[0,1],[-1,1],[-1,0],[-1,-1],[0,-2],[0,2]]
    : [[1,-1],[1,0],[1,1],[0,1],[-1,0],[0,-1],[0,-2],[0,2]];
  for (const [dx, dy] of offsets) {
    const nx = gx + dx;
    const ny = gy + dy;
    if (ny < 0 || ny >= mapBase.mh) continue;
    const wx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
    if (wx < 0 || wx >= mapBase.mw) continue;
    if (mapBase.getTerrain(wx, ny) === 10) return true;
  }
  return false;
}
