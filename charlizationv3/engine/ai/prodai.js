// ═══════════════════════════════════════════════════════════════════
// ai/prodai.js — City production AI: build selection & rush-buy
//
// Phase 3 of AI player support. Evaluates each city owned by the
// AI civ and decides what to produce (units, buildings, wonders)
// and whether to rush-buy critical items.
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from '../rules.js';
import { getProductionCost } from '../production.js';
import { calcRushBuyCost } from '../happiness.js';
import {
  UNIT_PREREQS, UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_OBSOLETE,
  IMPROVE_PREREQS,
} from '../defs.js';

// ── Helpers ──────────────────────────────────────────────────────

/**
 * Compute isometric distance between two tiles using doubled-X coordinates.
 */
function tileDist(gx1, gy1, gx2, gy2, mapBase) {
  const dx1 = gx1 * 2 + (gy1 % 2);
  const dx2 = gx2 * 2 + (gy2 % 2);
  let ddx = Math.abs(dx1 - dx2);
  if (mapBase.wraps) {
    const mw2 = mapBase.mw * 2;
    ddx = Math.min(ddx, mw2 - ddx);
  }
  return ddx + Math.abs(gy1 - gy2);
}

/**
 * Check if a civ has the prerequisite tech for a unit/building.
 * prereq < 0 means always available (-1) or unbuildable (-2).
 */
function hasTechPrereq(civTechs, prereq) {
  if (prereq === -2) return false; // unbuildable
  if (prereq < 0) return true;     // always available
  return civTechs ? civTechs.has(prereq) : false;
}

/**
 * Check if a unit type is obsolete for the given civ.
 */
function isUnitObsolete(civTechs, unitId) {
  const obsolete = UNIT_OBSOLETE[unitId] ?? -1;
  if (obsolete < 0) return false;
  return civTechs ? civTechs.has(obsolete) : false;
}

/**
 * Check if a civ can build a given unit type.
 */
function canBuildUnit(civTechs, unitId) {
  const prereq = UNIT_PREREQS[unitId] ?? -1;
  if (!hasTechPrereq(civTechs, prereq)) return false;
  if (isUnitObsolete(civTechs, unitId)) return false;
  return true;
}

/**
 * Check if a civ can build a given building in a city.
 */
function canBuildBuilding(civTechs, city, buildingId) {
  // City already has it
  if (city.buildings && city.buildings.has(buildingId)) return false;
  // Tech prereq
  const prereq = IMPROVE_PREREQS[buildingId] ?? -1;
  return hasTechPrereq(civTechs, prereq);
}

/**
 * Find enemy units within a given tile distance of a position.
 */
function findNearbyEnemies(gx, gy, gameState, mapBase, civSlot, maxDist) {
  const enemies = [];
  for (const u of gameState.units) {
    if (u.owner === civSlot) continue; // skip own units
    if (u.gx < 0) continue; // dead
    if (UNIT_ATK[u.type] === 0) continue; // non-combat
    const dist = tileDist(gx, gy, u.gx, u.gy, mapBase);
    if (dist <= maxDist) {
      enemies.push({ unit: u, dist });
    }
  }
  return enemies;
}

/**
 * Count our defenders in/near a city.
 */
function countCityDefenders(city, gameState, civSlot) {
  let count = 0;
  for (const u of gameState.units) {
    if (u.owner !== civSlot) continue;
    if (u.gx < 0) continue;
    if (u.gx === city.gx && u.gy === city.gy) {
      if ((UNIT_DEF[u.type] || 0) > 0) count++;
    }
  }
  return count;
}

/**
 * Check if a city is a frontier city (near enemy cities).
 */
function isFrontierCity(city, gameState, mapBase, civSlot) {
  for (const c of gameState.cities) {
    if (c.owner === civSlot || c.owner === 0) continue;
    if (c.size <= 0) continue;
    const dist = tileDist(city.gx, city.gy, c.gx, c.gy, mapBase);
    if (dist <= 12) return true;
  }
  return false;
}

/**
 * Find the best available defensive unit (highest DEF among land units).
 */
function bestDefensiveUnit(civTechs) {
  let bestId = -1;
  let bestDef = -1;
  for (let id = 0; id < UNIT_DEF.length; id++) {
    if (!canBuildUnit(civTechs, id)) continue;
    const domain = UNIT_DOMAIN[id] ?? 0;
    if (domain !== 0) continue; // land only
    const def = UNIT_DEF[id] || 0;
    if (def <= 0) continue;
    if (def > bestDef) {
      bestDef = def;
      bestId = id;
    }
  }
  return bestId;
}

/**
 * Find the best available offensive unit (highest ATK among land units).
 */
function bestOffensiveUnit(civTechs) {
  let bestId = -1;
  let bestAtk = -1;
  for (let id = 0; id < UNIT_ATK.length; id++) {
    if (!canBuildUnit(civTechs, id)) continue;
    const domain = UNIT_DOMAIN[id] ?? 0;
    if (domain !== 0) continue; // land only
    const atk = UNIT_ATK[id] || 0;
    if (atk <= 0) continue;
    // Skip settlers/engineers (types 0-1)
    if (id <= 1) continue;
    if (atk > bestAtk) {
      bestAtk = atk;
      bestId = id;
    }
  }
  return bestId;
}

/**
 * Check whether the city is already building something that seems reasonable
 * and has meaningful shields invested. If switching production type
 * (unit↔building↔wonder), we lose 50% of invested shields, so avoid that.
 */
function shouldKeepCurrentProduction(city, newItem) {
  const current = city.itemInProduction;
  if (!current) return false;

  const invested = city.shieldsInBox || 0;
  if (invested === 0) return false; // nothing invested, safe to switch

  // Same type → no penalty, always fine to switch
  if (current.type === newItem.type) return false;

  // Cross-type switch: penalizes 50%. Keep current if we've invested
  // more than 20% of the total cost — the penalty hurts too much.
  const totalCost = getProductionCost(current);
  if (totalCost === Infinity) return false;
  return invested > totalCost * 0.2;
}

// ── Production priority building list ────────────────────────────
// Each entry: { id, minSize, condition }
// condition is a function (city, gameState, mapBase, civSlot) → boolean

const BUILDING_PRIORITIES = [
  // Granary — food growth acceleration
  { id: 3, minSize: 1, condition: () => true },
  // Temple — happiness for growing cities
  { id: 4, minSize: 3, condition: (city) => (city.civilDisorder || city.size >= 4) },
  // Marketplace — economy boost
  { id: 5, minSize: 4, condition: () => true },
  // Library — science boost
  { id: 6, minSize: 4, condition: () => true },
  // Barracks — when producing military
  { id: 2, minSize: 1, condition: (city) => {
    const item = city.itemInProduction;
    return item && item.type === 'unit' && (UNIT_ATK[item.id] || 0) > 0;
  }},
  // City Walls — frontier cities
  { id: 8, minSize: 1, condition: (city, gameState, mapBase, civSlot) =>
    isFrontierCity(city, gameState, mapBase, civSlot)
  },
  // Courthouse — corruption reduction
  { id: 7, minSize: 3, condition: () => true },
  // Aqueduct — needed for growth past size 8
  { id: 9, minSize: 6, condition: () => true },
  // Factory — production multiplier
  { id: 15, minSize: 6, condition: () => true },
];

// ── Main production AI ───────────────────────────────────────────

/**
 * Generate CHANGE_PRODUCTION actions for all cities owned by the AI civ.
 * Evaluates each city and decides what to produce based on priority:
 *   a. Military emergency defense
 *   b. Settlers for expansion
 *   c. Key buildings (priority order)
 *   d. Best offensive military unit
 *   e. Keep current production
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @returns {Array<object>} CHANGE_PRODUCTION actions
 */
export function generateProductionActions(gameState, mapBase, civSlot) {
  const actions = [];
  const civTechs = gameState.civTechs?.[civSlot];
  const ownCities = gameState.cities.filter(c => c.owner === civSlot && c.size > 0);
  const numCities = ownCities.length;

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];

    // Only manage our own living cities
    if (city.owner !== civSlot) continue;
    if (city.size <= 0) continue;

    // Skip cities in civil disorder (they don't produce anyway)
    if (city.civilDisorder) continue;

    let chosenItem = null;

    // ── Priority A: Military emergency ──
    // Enemy units within 5 tiles and no defenders
    const nearbyEnemies = findNearbyEnemies(city.gx, city.gy, gameState, mapBase, civSlot, 5);
    const defenders = countCityDefenders(city, gameState, civSlot);

    if (nearbyEnemies.length > 0 && defenders === 0) {
      const defUnit = bestDefensiveUnit(civTechs);
      if (defUnit >= 0) {
        chosenItem = { type: 'unit', id: defUnit };
      }
    }

    // ── Priority B: Settlers for expansion ──
    if (!chosenItem && numCities < 4 && canBuildUnit(civTechs, 0)) {
      // Don't build settlers if city would drop to size 1
      if (city.size > 1) {
        // Check if we're not already building settlers
        const current = city.itemInProduction;
        const alreadyBuildingSettler = current && current.type === 'unit' && current.id === 0;
        if (!alreadyBuildingSettler) {
          chosenItem = { type: 'unit', id: 0 };
        }
      }
    }

    // ── Priority C: Key buildings ──
    if (!chosenItem) {
      for (const bp of BUILDING_PRIORITIES) {
        if (city.size < bp.minSize) continue;
        if (!canBuildBuilding(civTechs, city, bp.id)) continue;
        if (!bp.condition(city, gameState, mapBase, civSlot)) continue;

        chosenItem = { type: 'building', id: bp.id };
        break;
      }
    }

    // ── Priority D: Best offensive military unit ──
    if (!chosenItem) {
      const offUnit = bestOffensiveUnit(civTechs);
      if (offUnit >= 0) {
        chosenItem = { type: 'unit', id: offUnit };
      }
    }

    // ── Priority E: Keep current production ──
    if (!chosenItem) continue;

    // Check if we should keep current production to avoid shield penalty
    const currentItem = city.itemInProduction;
    if (currentItem &&
        currentItem.type === chosenItem.type &&
        currentItem.id === chosenItem.id) {
      // Already building the chosen item
      continue;
    }

    if (shouldKeepCurrentProduction(city, chosenItem)) {
      continue;
    }

    // Validate and add the action
    const action = { type: 'CHANGE_PRODUCTION', cityIndex: ci, item: chosenItem };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
    }
  }

  return actions;
}

// ── Rush-buy AI ──────────────────────────────────────────────────

/**
 * Generate RUSH_BUY actions for cities where it makes economic sense.
 *
 * Criteria:
 *   - Treasury above 200 gold
 *   - Rush-buy cost is less than 25% of treasury
 *   - Production is high-value (settlers, key buildings, military in emergency)
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @returns {Array<object>} RUSH_BUY actions
 */
export function generateRushBuyActions(gameState, mapBase, civSlot) {
  const actions = [];
  const civ = gameState.civs?.[civSlot];
  if (!civ) return actions;

  let treasury = civ.treasury || 0;
  if (treasury < 200) return actions;

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (city.owner !== civSlot) continue;
    if (city.size <= 0) continue;
    if (city.civilDisorder) continue;

    const item = city.itemInProduction;
    if (!item) continue;

    // Only rush-buy high-value items
    if (!isHighValueProduction(city, item, gameState, mapBase, civSlot)) continue;

    // Calculate cost
    const totalCost = getProductionCost(item);
    if (totalCost === Infinity) continue;

    const shieldsStored = city.shieldsInBox || 0;
    if (shieldsStored >= totalCost) continue; // already done

    const buyCost = calcRushBuyCost(item.type, totalCost, shieldsStored);

    // Must have enough gold and the cost must be reasonable
    if (buyCost > treasury) continue;
    if (buyCost > treasury * 0.25) continue;

    // Validate
    const action = { type: 'RUSH_BUY', cityIndex: ci };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
      // Track spending so we don't overspend across cities
      treasury -= buyCost;
      if (treasury < 200) break;
    }
  }

  return actions;
}

/**
 * Determine if a production item is high-value enough to rush-buy.
 */
function isHighValueProduction(city, item, gameState, mapBase, civSlot) {
  // Settlers are always high-value
  if (item.type === 'unit' && item.id === 0) return true;

  // Key buildings worth rushing
  const KEY_BUILDINGS = new Set([3, 4, 9, 15]); // Granary, Temple, Aqueduct, Factory
  if (item.type === 'building' && KEY_BUILDINGS.has(item.id)) return true;

  // Military units when under threat
  if (item.type === 'unit' && (UNIT_ATK[item.id] || 0) > 0) {
    const nearbyEnemies = findNearbyEnemies(city.gx, city.gy, gameState, mapBase, civSlot, 5);
    const defenders = countCityDefenders(city, gameState, civSlot);
    if (nearbyEnemies.length > 0 && defenders === 0) return true;
  }

  return false;
}
