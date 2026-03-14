// ═══════════════════════════════════════════════════════════════════
// ai/prodai.js — City production AI: build selection & rush-buy
//
// Ported from Civ2 FUN_00498e8b. Comprehensive scoring system that
// evaluates ALL possible builds (units, buildings, wonders) for each
// city and picks the highest-scoring item. Factors in threat level,
// city needs, strategic posture, and production switch penalty.
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from '../rules.js';
import { getProductionCost } from '../production.js';
import { calcRushBuyCost } from '../happiness.js';
import {
  UNIT_PREREQS, UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_DOMAIN,
  UNIT_OBSOLETE, UNIT_COSTS, UNIT_NAMES,
  IMPROVE_PREREQS, IMPROVE_MAINTENANCE, IMPROVE_NAMES,
  IMPROVE_COSTS, WONDER_COSTS, WONDER_NAMES,
  WONDER_PREREQS, WONDER_OBSOLETE,
  SETTLER_TYPES, NON_COMBAT_TYPES,
} from '../defs.js';
import { hasWonderEffect } from '../utils.js';

// ── Constants ──────────────────────────────────────────────────────

const NUM_UNIT_TYPES = UNIT_ATK.length;  // 52
const NUM_BUILDING_TYPES = 39;           // 0-38, index 0 unused
const NUM_WONDERS = 28;                  // 0-27

// Minimum score advantage to justify a cross-type production switch
const SWITCH_THRESHOLD = 1.5;

// Shield penalty fraction for cross-type switch
const CROSS_TYPE_PENALTY = 0.5;

// Minimum score multiplier to justify switching between items of the SAME type
// when shields have already been invested (e.g. Settlers→Warriors)
const SAME_TYPE_SWITCH_THRESHOLD = 1.3;

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
  if (prereq === -2) return false;
  if (prereq < 0) return true;
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
  if (city.buildings && city.buildings.has(buildingId)) return false;
  const prereq = IMPROVE_PREREQS[buildingId] ?? -1;
  return hasTechPrereq(civTechs, prereq);
}

/**
 * Check if a civ can build a given wonder.
 */
function canBuildWonder(civTechs, gameState, wonderIndex) {
  const prereq = WONDER_PREREQS[wonderIndex] ?? -1;
  if (!hasTechPrereq(civTechs, prereq)) return false;
  const obsolete = WONDER_OBSOLETE[wonderIndex] ?? -1;
  if (obsolete >= 0 && civTechs && civTechs.has(obsolete)) return false;
  // Already built by anyone?
  const w = gameState.wonders?.[wonderIndex];
  if (w && w.cityIndex != null && !w.destroyed) return false;
  return true;
}

/**
 * Check if any city (ours or enemy) is currently building a specific wonder.
 */
function isWonderBeingBuilt(gameState, wonderIndex) {
  const wonderBuildId = wonderIndex + 39;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0) continue;
    const item = c.itemInProduction;
    if (item && item.type === 'wonder' && item.id === wonderBuildId) return true;
  }
  return false;
}

/**
 * Find enemy units within a given tile distance of a position.
 */
function findNearbyEnemies(gx, gy, gameState, mapBase, civSlot, maxDist) {
  const enemies = [];
  for (const u of gameState.units) {
    if (u.owner === civSlot) continue;
    if (u.gx < 0) continue;
    if (UNIT_ATK[u.type] === 0) continue;
    const dist = tileDist(gx, gy, u.gx, u.gy, mapBase);
    if (dist <= maxDist) {
      enemies.push({ unit: u, dist });
    }
  }
  return enemies;
}

/**
 * Count our defenders in a city.
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
 * Count our total military units on the same continent as a city.
 * (Approximate: just checks units within a generous radius.)
 */
function countNearbyMilitary(city, gameState, mapBase, civSlot, maxDist) {
  let count = 0;
  for (const u of gameState.units) {
    if (u.owner !== civSlot) continue;
    if (u.gx < 0) continue;
    if (UNIT_ATK[u.type] === 0 && UNIT_DEF[u.type] === 0) continue;
    if (UNIT_DOMAIN[u.type] !== 0) continue; // land only
    const dist = tileDist(city.gx, city.gy, u.gx, u.gy, mapBase);
    if (dist <= maxDist) count++;
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
 * Check if a city is coastal (adjacent ocean tiles).
 */
function isCoastalCity(city, mapBase) {
  if (!mapBase.getTerrain) return false;
  // Check the 20 tiles in city radius for ocean
  const offsets = [
    [-1,-1],[0,-2],[1,-1],[1,1],[0,2],[-1,1], // ring 1
    [-2,-2],[-1,-3],[0,-4],[1,-3],[2,-2],[2,0],[2,2],[1,3],[0,4],[-1,3],[-2,2],[-2,0], // ring 2 partial
    [0,-1],[0,1],[-1,0],[1,0], // immediate neighbors
  ];
  for (const [dx, dy] of offsets) {
    let gx = city.gx + dx;
    const gy = city.gy + dy;
    if (gy < 0 || gy >= mapBase.mh) continue;
    if (mapBase.wraps) gx = ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw;
    else if (gx < 0 || gx >= mapBase.mw) continue;
    try {
      const ter = mapBase.getTerrain(gx, gy);
      if (ter === 10) return true;
    } catch { /* ignore */ }
  }
  return false;
}

/**
 * Estimate city trade output as a rough proxy (city size is a decent approximation).
 */
function estimateCityTrade(city) {
  return Math.max(1, city.size);
}

/**
 * Estimate city shield output.
 * Returns 0 if the city is in civil disorder (no production).
 */
function estimateCityShields(city) {
  if (city.civilDisorder) return 0;
  return Math.max(1, Math.floor(city.size * 0.7) + 1);
}

/**
 * Estimate food surplus for a city (very rough).
 */
function estimateFoodSurplus(city) {
  // Small cities typically have 1-3 surplus, large cities less
  if (city.size <= 3) return 2;
  if (city.size <= 6) return 1;
  return 0;
}

/**
 * Count how many settlers/engineers the civ currently has.
 */
function countSettlers(gameState, civSlot) {
  let count = 0;
  for (const u of gameState.units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    if (SETTLER_TYPES.has(u.type)) count++;
  }
  return count;
}

/**
 * Count how many units of a specific type the civ has.
 */
function countUnitsByType(gameState, civSlot, unitType) {
  let count = 0;
  for (const u of gameState.units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    if (u.type === unitType) count++;
  }
  return count;
}

/**
 * Find the best available defensive unit for the civ (highest DEF among land units).
 */
function bestDefensiveUnit(civTechs) {
  let bestId = -1;
  let bestDef = -1;
  for (let id = 0; id < NUM_UNIT_TYPES; id++) {
    if (!canBuildUnit(civTechs, id)) continue;
    if (UNIT_DOMAIN[id] !== 0) continue;
    if (SETTLER_TYPES.has(id)) continue;
    const def = UNIT_DEF[id] || 0;
    if (def <= 0) continue;
    if (def > bestDef || (def === bestDef && (UNIT_ATK[id] || 0) > (UNIT_ATK[bestId] || 0))) {
      bestDef = def;
      bestId = id;
    }
  }
  return bestId;
}

/**
 * Find the best available offensive unit for the civ (highest ATK among land units).
 */
function bestOffensiveUnit(civTechs) {
  let bestId = -1;
  let bestAtk = -1;
  for (let id = 0; id < NUM_UNIT_TYPES; id++) {
    if (!canBuildUnit(civTechs, id)) continue;
    if (UNIT_DOMAIN[id] !== 0) continue;
    if (SETTLER_TYPES.has(id)) continue;
    if (NON_COMBAT_TYPES.has(id)) continue;
    const atk = UNIT_ATK[id] || 0;
    if (atk <= 0) continue;
    if (atk > bestAtk) {
      bestAtk = atk;
      bestId = id;
    }
  }
  return bestId;
}

/**
 * Clamp a value between min and max (mirrors Civ2 FUN_005adfa0).
 */
function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

// ── Scoring functions ─────────────────────────────────────────────

/**
 * Score a unit type for a specific city context.
 *
 * Based on Civ2 FUN_00498e8b unit scoring section. Returns a numeric
 * score (higher = more desirable). Returns -1 if the unit should not
 * be considered.
 */
function scoreUnit(unitId, city, cityCtx, civTechs, gameState, mapBase, civSlot, strategy) {
  if (!canBuildUnit(civTechs, unitId)) return -1;

  const domain = UNIT_DOMAIN[unitId] ?? 0;
  const atk = UNIT_ATK[unitId] || 0;
  const def = UNIT_DEF[unitId] || 0;
  const hp = UNIT_HP[unitId] || 1;
  const fp = UNIT_FP[unitId] || 1;
  const cost = UNIT_COSTS[unitId] || 10;

  // ── Domain filters ──
  // Landlocked cities skip naval units
  if (domain === 1 && !cityCtx.isCoastal) return -1;
  // Air units: need airport or just allow from any city (Civ2 allows from any)
  // No filter on air — game allows building air anywhere

  // ── Settler scoring ──
  if (SETTLER_TYPES.has(unitId)) {
    // Don't build if city would drop to size 1
    if (city.size <= 1) return -1;
    // Don't build if we have enough cities or settlers
    if (!strategy.expansionDesired && cityCtx.numCities >= 6) return -1;
    if (cityCtx.settlerCount >= 2) return -1;
    if (cityCtx.numCities >= 12) return -1;

    // Engineers (1) vs Settlers (0): prefer engineers if available
    if (unitId === 0 && canBuildUnit(civTechs, 1)) return -1;

    let score = 0;
    // High score when expanding
    if (strategy.expansionDesired) {
      score = 40;
      if (cityCtx.numCities <= 2) score = 60;
    } else {
      // Still worth building for improvements (engineers)
      score = unitId === 1 ? 20 : 10;
    }

    // Size-2 cities with few cities: settlers are critical for expansion.
    // Give a large unconditional boost so settlers consistently outscore warriors.
    if (city.size === 2 && cityCtx.settlerCount === 0 && cityCtx.numCities < 4) {
      score += 25;
    }

    // #11: Boost settler score in specific conditions
    // Early game expansion: fewer than 4 cities
    if (cityCtx.numCities < 4) score += 15;
    // Early turns: expansion is critical
    const turnNum = gameState.turn?.number ?? 0;
    if (turnNum < 100 && cityCtx.numCities < 8) score += 10;
    // No settler currently exists
    if (cityCtx.settlerCount === 0 && cityCtx.numCities < 8) score += 10;

    // Bonus for large cities (can spare the pop)
    if (city.size >= 6) score += 10;
    // Penalty if food surplus is low
    if (estimateFoodSurplus(city) <= 0) score -= 15;

    // Scale by cost-effectiveness
    score = Math.floor(score * 10 / Math.max(1, cost));
    return Math.max(0, score);
  }

  // ── Non-combat units (diplomats, spies, caravans, freight, explorers) ──
  if (NON_COMBAT_TYPES.has(unitId)) {
    // Diplomat/Spy: occasional use
    if (unitId === 46 || unitId === 47) {
      if (strategy.warTargets && strategy.warTargets.length > 0) return 3;
      return 1;
    }
    // Caravan/Freight: trade routes
    if (unitId === 48 || unitId === 49) {
      if (strategy.productionFocus === 'economy' && cityCtx.numCities >= 3) return 4;
      return 1;
    }
    // Explorer
    if (unitId === 50) {
      if (cityCtx.numCities <= 2) return 3;
      return 0;
    }
    return 0;
  }

  // ── Combat units ──
  let score = 0;

  // Base combat power score: weighted combination of ATK, DEF, HP, FP
  const combatPower = (atk * 3 + def * 2) * hp * fp;

  // Offensive units (ATK > DEF): scored by attack power
  if (atk > def) {
    score = atk * 4;
    // Bonus for firepower > 1
    if (fp > 1) score += atk * 2;
    // HP bonus
    score += (hp - 1) * 5;
  }
  // Defensive units (DEF >= ATK): scored by defense power
  else {
    score = def * 3;
    if (fp > 1) score += def;
    score += (hp - 1) * 4;
  }

  // ── City-specific need adjustments ──

  // Emergency: no defenders and enemies nearby
  if (cityCtx.defenders === 0 && def > 0 && domain === 0) {
    score += 30;
    // Extra bonus if enemies are very close
    if (cityCtx.nearbyEnemies.length > 0) {
      score += 20;
      // Closest enemy distance bonus
      const closestDist = Math.min(...cityCtx.nearbyEnemies.map(e => e.dist));
      if (closestDist <= 3) score += 15;
    }
  }

  // Frontier city: prefer military, especially defenders
  if (cityCtx.isFrontier) {
    if (def > atk) score += 10; // Defensive unit bonus on frontier
    else score += 5; // Still want some offensive capability
  }

  // Inland safe city: mild penalty for military, prefer infrastructure
  if (!cityCtx.isFrontier && cityCtx.nearbyEnemies.length === 0 && domain === 0) {
    // Only light penalty — still need some garrison
    if (cityCtx.defenders >= 2) score -= 5;
  }

  // ── Strategic posture adjustments ──
  const focus = strategy.productionFocus;
  const posture = strategy.militaryPosture;
  const threat = strategy.threat;

  // At war: offensive units get bonus
  if (strategy.warTargets && strategy.warTargets.length > 0) {
    if (atk > def) score += Math.floor(atk * 0.3);
  }

  // Threat adjustments
  if (threat === 'high' || threat === 'critical') {
    if (def > 0 && domain === 0) score += Math.floor(def * 0.5);
  }

  // Military posture bonuses
  if (posture === 'attack' && atk > def) {
    score += 8;
  } else if (posture === 'defend' && def >= atk) {
    score += 8;
  } else if (posture === 'turtle' && def >= atk) {
    score += 12;
  }

  // Production focus
  if (focus === 'military') {
    score += 5;
  } else if (focus === 'economy' || focus === 'science') {
    score -= 3;
  }

  // ── Domain-specific adjustments ──

  // Naval units: bonus if coastal and have reason to build navy
  if (domain === 1) {
    if (cityCtx.isCoastal) {
      // Transports/carriers get bonus if we have cities to connect
      if (unitId === 43 || unitId === 34) { // Transport, Galleon
        score += 5;
      }
      // Naval combat: bonus if enemy has navy or coastal cities
      score += 3;
    }
  }

  // Air units: generally useful for offense
  if (domain === 2) {
    if (atk > 0) score += 5;
    // Bombers/fighters scale well
  }

  // ── Cost-effectiveness ──
  // Normalize by production cost: cheaper units score higher per shield
  score = Math.floor(score * 30 / Math.max(1, cost));

  // ── Continent threat ──
  // If there are enemy military units nearby on our continent, prefer military
  if (cityCtx.nearbyEnemyMilitary > 0 && domain === 0) {
    score += 2;
  }

  return Math.max(0, score);
}

/**
 * Score a building for a specific city context.
 *
 * Based on Civ2 FUN_00498e8b building scoring (cases 1-0x26).
 * Returns a numeric score (higher = more desirable). Returns -1 if
 * the building should not be considered.
 */
function scoreBuilding(buildingId, city, cityIndex, cityCtx, civTechs, gameState, mapBase, civSlot, strategy) {
  if (buildingId <= 0 || buildingId >= NUM_BUILDING_TYPES) return -1;
  if (!canBuildBuilding(civTechs, city, buildingId)) return -1;

  const maintenance = IMPROVE_MAINTENANCE[buildingId] || 0;
  const cost = IMPROVE_COSTS[buildingId] || 10;
  const trade = estimateCityTrade(city);
  const shields = estimateCityShields(city);
  const focus = strategy.productionFocus;
  const threat = strategy.threat;

  let score = -1;

  switch (buildingId) {
    // ── 1: Palace ──
    case 1:
      // Only if we don't have one (rebuild after capture)
      score = 1;
      break;

    // ── 2: Barracks ──
    case 2: {
      // Value depends on military production posture
      let s = 4 + (cityCtx.defenders || 0);
      if (strategy.productionFocus === 'military') s += 4;
      if (cityCtx.isFrontier) s += 3;
      if (hasWonderEffect(gameState, civSlot, 7)) return -1; // Sun Tzu makes barracks free upgrades
      // Has City Walls? Barracks pair well
      if (city.buildings && city.buildings.has(8)) s += 2;
      score = clamp(s, 1, 12);
      break;
    }

    // ── 3: Granary ──
    case 3: {
      // Very valuable for growth, especially small cities
      if (hasWonderEffect(gameState, civSlot, 0)) return -1; // Pyramids gives free granary
      let s = 8;
      if (city.size < 5) s += 4;
      if (city.size >= 8) s -= 2;
      if (focus === 'growth') s += 3;
      score = clamp(s, 2, 14);
      break;
    }

    // ── 4: Temple ──
    case 4: {
      // Happiness building — more valuable for larger cities
      let s = 3;
      if (city.size >= 4) s += 3;
      if (city.size >= 8) s += 2;
      if (city.civilDisorder) s += 10;
      // Near disorder threshold: boost if happy/unhappy are close
      else if (city.happy != null && city.unhappy != null && city.unhappy >= city.happy) s += 5;
      // Oracle doubles temple effect
      if (hasWonderEffect(gameState, civSlot, 5)) s += 3;
      score = clamp(s, 1, 16);
      break;
    }

    // ── 5: Marketplace ──
    case 5: {
      let s = clamp(10 - Math.floor(trade / 3), 1, 10);
      if (focus === 'economy') s += 2;
      score = s;
      break;
    }

    // ── 6: Library ──
    case 6: {
      let s = clamp(10 - Math.floor(trade / 3), 1, 10);
      if (focus === 'science') s += 3;
      score = s;
      break;
    }

    // ── 7: Courthouse ──
    case 7: {
      // Corruption reduction — more valuable for distant cities
      let s = 6;
      if (city.size >= 4) s += 2;
      score = clamp(s, 2, 10);
      break;
    }

    // ── 8: City Walls ──
    case 8: {
      if (hasWonderEffect(gameState, civSlot, 6)) return -1; // Great Wall
      let s = 10 - Math.floor(city.size / 2);
      if (cityCtx.isFrontier) s += 4;
      if (threat === 'high' || threat === 'critical') s += 3;
      // Check if enemies have units nearby
      for (let other = 1; other < 8; other++) {
        if (other === civSlot) continue;
        if (strategy.warTargets && strategy.warTargets.includes(other)) {
          s += 2;
          break;
        }
      }
      if (city.buildings && city.buildings.has(2)) s += 1; // Has barracks
      score = clamp(s, 1, 14);
      break;
    }

    // ── 9: Aqueduct ──
    case 9: {
      // Essential for growth past size 8
      if (city.size >= 6) {
        let s = 14 - city.size;
        if (city.size >= 8) s = 18; // Critical
        score = clamp(s, 4, 20);
      } else {
        score = 2; // Low priority if small
      }
      break;
    }

    // ── 10: Bank ──
    case 10: {
      // Requires Marketplace (5)
      if (!(city.buildings && city.buildings.has(5))) return -1;
      let s = clamp(10 - Math.floor(trade / 3), 1, 10);
      if (focus === 'economy') s += 2;
      score = s;
      break;
    }

    // ── 11: Cathedral ──
    case 11: {
      // Strong happiness building
      let s = 6;
      if (city.size >= 6) s += 3;
      if (city.size >= 10) s += 2;
      if (city.civilDisorder) s += 8;
      else if (city.happy != null && city.unhappy != null && city.unhappy >= city.happy) s += 4;
      // Michelangelo's Chapel makes cathedrals more effective
      if (hasWonderEffect(gameState, civSlot, 10)) s += 3;
      score = clamp(s, 2, 16);
      break;
    }

    // ── 12: University ──
    case 12: {
      // Requires Library (6)
      if (!(city.buildings && city.buildings.has(6))) return -1;
      let s = clamp(10 - Math.floor(trade / 3), 1, 10);
      if (focus === 'science') s += 3;
      score = s;
      break;
    }

    // ── 13: Mass Transit ──
    case 13: {
      // Pollution reduction
      let s = 6 - Math.floor(city.size / 4);
      if (city.size >= 10) s += 3;
      score = clamp(s, 1, 10);
      break;
    }

    // ── 14: Colosseum ──
    case 14: {
      // Happiness
      let s = 4;
      if (city.size >= 6) s += 2;
      if (city.civilDisorder) s += 7;
      else if (city.happy != null && city.unhappy != null && city.unhappy >= city.happy) s += 3;
      score = clamp(s, 1, 12);
      break;
    }

    // ── 15: Factory ──
    case 15: {
      let s = clamp(14 - shields, 1, 14);
      if (city.size >= 6) s += 2;
      score = s;
      break;
    }

    // ── 16: Mfg. Plant ──
    case 16: {
      // Requires Factory (15)
      if (!(city.buildings && city.buildings.has(15))) return -1;
      let s = clamp(12 - Math.floor(shields / 2), 2, 12);
      score = s;
      break;
    }

    // ── 17: SDI Defense ──
    case 17: {
      let s = 4;
      // More valuable if enemy has nukes (Manhattan Project exists)
      const mp = gameState.wonders?.[23];
      if (mp && mp.cityIndex != null && !mp.destroyed) s += 4;
      score = clamp(s, 1, 10);
      break;
    }

    // ── 18: Recycling Center ──
    case 18: {
      let s = 5;
      if (city.size >= 8) s += 3;
      // More valuable with factory
      if (city.buildings && city.buildings.has(15)) s += 2;
      score = clamp(s, 2, 10);
      break;
    }

    // ── 19: Power Plant ──
    case 19: {
      // Requires Factory (15), skip if already have any power plant
      if (!(city.buildings && city.buildings.has(15))) return -1;
      if (city.buildings && (city.buildings.has(20) || city.buildings.has(21) || city.buildings.has(29))) return -1;
      // Hoover Dam gives free hydro
      if (hasWonderEffect(gameState, civSlot, 22)) return -1;
      let s = clamp(14 - shields, 2, 14);
      score = s;
      break;
    }

    // ── 20: Hydro Plant ──
    case 20: {
      if (!(city.buildings && city.buildings.has(15))) return -1;
      if (city.buildings && (city.buildings.has(19) || city.buildings.has(21) || city.buildings.has(29))) return -1;
      if (hasWonderEffect(gameState, civSlot, 22)) return -1;
      let s = clamp(14 - shields, 2, 14);
      s += 2; // Prefer over power plant (no pollution)
      score = s;
      break;
    }

    // ── 21: Nuclear Plant ──
    case 21: {
      if (!(city.buildings && city.buildings.has(15))) return -1;
      if (city.buildings && (city.buildings.has(19) || city.buildings.has(20) || city.buildings.has(29))) return -1;
      if (hasWonderEffect(gameState, civSlot, 22)) return -1;
      let s = clamp(14 - shields, 2, 14);
      s += 1; // Slightly better than power plant
      score = s;
      break;
    }

    // ── 22: Stock Exchange ──
    case 22: {
      // Requires Bank (10)
      if (!(city.buildings && city.buildings.has(10))) return -1;
      let s = clamp(10 - Math.floor(trade / 4), 2, 10);
      if (focus === 'economy') s += 2;
      score = s;
      break;
    }

    // ── 23: Sewer System ──
    case 23: {
      // Essential for growth past size 12
      if (city.size >= 10) {
        let s = 14 - city.size;
        if (city.size >= 12) s = 18;
        score = clamp(s, 4, 20);
      } else {
        score = 1;
      }
      break;
    }

    // ── 24: Supermarket ──
    case 24: {
      // Food bonus with farmland
      let s = 5;
      if (city.size >= 6) s += 2;
      score = clamp(s, 2, 10);
      break;
    }

    // ── 25: Superhighways ──
    case 25: {
      let s = clamp(8 - Math.floor(trade / 3), 2, 8);
      if (focus === 'economy') s += 2;
      score = s;
      break;
    }

    // ── 26: Research Lab ──
    case 26: {
      // Requires University (12)
      if (!(city.buildings && city.buildings.has(12))) return -1;
      let s = clamp(12 - Math.floor(trade / 4), 2, 12);
      if (focus === 'science') s += 3;
      score = s;
      break;
    }

    // ── 27: SAM Battery ──
    case 27: {
      let s = 4;
      if (cityCtx.isFrontier) s += 2;
      score = clamp(s, 1, 8);
      break;
    }

    // ── 28: Coastal Fortress ──
    case 28: {
      if (!cityCtx.isCoastal) return -1;
      let s = 5;
      if (cityCtx.isFrontier) s += 3;
      score = clamp(s, 1, 10);
      break;
    }

    // ── 29: Solar Plant ──
    case 29: {
      if (!(city.buildings && city.buildings.has(15))) return -1;
      if (city.buildings && (city.buildings.has(19) || city.buildings.has(20) || city.buildings.has(21))) return -1;
      if (hasWonderEffect(gameState, civSlot, 22)) return -1;
      let s = clamp(14 - shields, 2, 14);
      s += 3; // Best power plant (no pollution, no meltdown)
      score = s;
      break;
    }

    // ── 30: Harbour ──
    case 30: {
      if (!cityCtx.isCoastal) return -1;
      let s = 7;
      if (city.size < 4) s += 2; // food bonus valuable for small coastal cities
      score = clamp(s, 2, 10);
      break;
    }

    // ── 31: Offshore Platform ──
    case 31: {
      if (!cityCtx.isCoastal) return -1;
      let s = 5;
      if (city.size >= 6) s += 2;
      score = clamp(s, 2, 8);
      break;
    }

    // ── 32: Airport ──
    case 32: {
      let s = 5;
      if (cityCtx.numCities >= 4) s += 2;
      score = clamp(s, 2, 8);
      break;
    }

    // ── 33: Police Station ──
    case 33: {
      // Reduces unhappiness from abroad units
      const govt = gameState.civs?.[civSlot]?.government || 'despotism';
      if (govt === 'democracy' || govt === 'republic') {
        let s = 8;
        if (city.size >= 6) s += 2;
        score = clamp(s, 3, 12);
      } else {
        score = 2; // Less useful under non-democratic governments
      }
      break;
    }

    // ── 34: Port Facility ──
    case 34: {
      if (!cityCtx.isCoastal) return -1;
      let s = 4;
      score = clamp(s, 1, 8);
      break;
    }

    // ── 35-37: SS parts ──
    case 35: case 36: case 37: {
      // Spaceship: only if Apollo Program exists
      const apollo = gameState.wonders?.[25];
      if (!apollo || apollo.cityIndex == null || apollo.destroyed) return -1;
      score = 6;
      break;
    }

    // ── 38: Capitalization ──
    case 38: {
      // Convert shields to gold — useful when nothing else to build
      score = 1;
      if (focus === 'economy' && city.size >= 8) score = 3;
      break;
    }

    default:
      return -1;
  }

  if (score < 0) return -1;

  // ── (#17) Treasury-aware building scoring ──
  // Boost economic buildings when treasury is low; penalize high-maintenance when broke
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 100;
  const lowTreasury = treasury < 100;
  const veryLowTreasury = treasury < 30;

  // Gold-generating buildings: Marketplace(5), Bank(10), Stock Exchange(22), Superhighways(25)
  const isGoldGenerator = buildingId === 5 || buildingId === 10 || buildingId === 22 || buildingId === 25;
  if (isGoldGenerator && lowTreasury) {
    score += 3;
    if (veryLowTreasury) score += 3; // urgent when nearly bankrupt
  }

  // ── Maintenance penalty ──
  // Penalize buildings with high maintenance relative to city trade output
  if (maintenance > 0) {
    const maintenanceRatio = maintenance / Math.max(1, trade);
    if (maintenanceRatio > 0.5) score -= 3;
    else if (maintenanceRatio > 0.3) score -= 1;
    // When treasury is very low, extra penalty for high-maintenance buildings
    if (veryLowTreasury && maintenance >= 2) score -= 2;
    // Adam Smith's Trading Co. makes maintenance-1 buildings free
    if (hasWonderEffect(gameState, civSlot, 17) && maintenance <= 1) {
      score += 1; // Maintenance is free, slight bonus
    }
  }

  // ── Normalize by cost ──
  // Buildings with lower cost are preferred (faster to complete)
  score = Math.floor(score * 30 / Math.max(1, cost));

  return Math.max(0, score);
}

/**
 * Score a wonder for a specific city context.
 *
 * Based on Civ2's wonder scoring section. Returns a numeric score.
 * Returns -1 if the wonder should not be considered.
 */
function scoreWonder(wonderIndex, city, cityIndex, cityCtx, civTechs, gameState, mapBase, civSlot, strategy) {
  if (!canBuildWonder(civTechs, gameState, wonderIndex)) return -1;

  // Wonders: item.id = wonderIndex + 39
  const wonderBuildId = wonderIndex + 39;
  const cost = WONDER_COSTS[wonderIndex] || 10;

  // Skip if another civ is already building it (we can see this for known cities)
  // Actually check if ANY city is already building it (except our own cities)
  let someoneElseBuilding = false;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0) continue;
    if (c.owner === civSlot) continue;
    const item = c.itemInProduction;
    if (item && item.type === 'wonder' && item.id === wonderBuildId) {
      someoneElseBuilding = true;
      break;
    }
  }

  // Are WE already building it in another city?
  let weAreBuilding = false;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0) continue;
    if (c.owner !== civSlot) continue;
    const item = c.itemInProduction;
    if (item && item.type === 'wonder' && item.id === wonderBuildId) {
      weAreBuilding = true;
      break;
    }
  }
  // Don't start building in a second city if we're already building it
  if (weAreBuilding) {
    // Unless this city IS the one building it (it will match current production)
    const thisItem = city.itemInProduction;
    if (!(thisItem && thisItem.type === 'wonder' && thisItem.id === wonderBuildId)) {
      return -1;
    }
  }

  // Small cities can't realistically finish wonders
  if (city.size < 4 && cityCtx.numCities > 1) return -1;

  // Base score: wonders are generally very valuable
  let score = 8;

  // If someone else is building it, reduce score (race condition)
  if (someoneElseBuilding) score -= 4;

  // Specific wonder value adjustments
  switch (wonderIndex) {
    case 0: // Pyramids (free granary)
      if (cityCtx.numCities >= 3) score += 4;
      else score += 2;
      break;
    case 1: // Hanging Gardens (+1 happy each city, +2 in wonder city)
      if (cityCtx.numCities >= 3) score += 5;
      break;
    case 2: // Colossus (+1 trade per worked land tile in city)
      score += 3;
      break;
    case 3: // Lighthouse (+1 move sea units, no Trireme loss)
      if (cityCtx.isCoastal) score += 3;
      else score -= 2;
      break;
    case 4: // Great Library (free techs when 2+ civs know them)
      score += 5;
      break;
    case 5: // Oracle (doubles Temple effect)
      score += 3;
      break;
    case 6: // Great Wall (free city walls)
      if (strategy.threat === 'high' || strategy.threat === 'critical') score += 4;
      else score += 2;
      break;
    case 7: // Sun Tzu (free barracks, veterans heal)
      if (strategy.productionFocus === 'military') score += 5;
      else score += 3;
      break;
    case 8: // King Richard's Crusade
      score += 2;
      break;
    case 9: // Marco Polo's Embassy (see all cities)
      score += 4;
      break;
    case 10: // Michelangelo's Chapel (cathedral effect +2)
      score += 5;
      break;
    case 11: // Copernicus' Observatory (double science in city)
      if (strategy.productionFocus === 'science') score += 5;
      else score += 3;
      break;
    case 12: // Magellan's Expedition (+2 sea movement)
      if (cityCtx.isCoastal) score += 3;
      else score += 1;
      break;
    case 13: // Shakespeare's Theatre (all unhappy → content in city)
      if (city.size >= 8) score += 5;
      else score += 2;
      break;
    case 14: // Leonardo's Workshop (free unit upgrades)
      score += 5;
      break;
    case 15: // J.S. Bach's Cathedral (-2 unhappy all cities)
      score += 5;
      break;
    case 16: // Newton's College (double science in city)
      if (city.buildings && city.buildings.has(12)) score += 5; // Has University
      else score += 3;
      break;
    case 17: // Adam Smith's Trading Co. (free maintenance <=1)
      if (cityCtx.numCities >= 4) score += 5;
      else score += 2;
      break;
    case 18: // Darwin's Voyage (2 free techs)
      score += 6; // Very high value
      break;
    case 19: // Statue of Liberty (instant government switch)
      score += 4;
      break;
    case 20: // Eiffel Tower
      score += 2;
      break;
    case 21: // Women's Suffrage (no military unhappiness)
      score += 5;
      break;
    case 22: // Hoover Dam (free hydro in all cities)
      if (cityCtx.numCities >= 3) score += 5;
      else score += 2;
      break;
    case 23: // Manhattan Project (enables nukes for all)
      if (strategy.productionFocus === 'military') score += 3;
      else score += 1;
      break;
    case 24: // United Nations
      score += 3;
      break;
    case 25: // Apollo Program (reveals map, enables spaceship)
      score += 5;
      break;
    case 26: // SETI Program (equivalent to Research Lab in all cities)
      score += 5;
      break;
    case 27: // Cure for Cancer (+1 happy all cities)
      score += 5;
      break;
    default:
      break;
  }

  // ── Normalize by cost ──
  score = Math.floor(score * 30 / Math.max(1, cost));

  // Wonders are prestigious — slight global bonus
  score += 1;

  return Math.max(0, score);
}

// ── City context computation ──────────────────────────────────────

/**
 * Build a context object for a city that caches expensive computations
 * used across all scoring functions.
 */
function buildCityContext(city, gameState, mapBase, civSlot, strategy, ownCities) {
  const nearbyEnemies = findNearbyEnemies(city.gx, city.gy, gameState, mapBase, civSlot, 8);
  const defenders = countCityDefenders(city, gameState, civSlot);
  const isFrontier = isFrontierCity(city, gameState, mapBase, civSlot);
  const coastal = isCoastalCity(city, mapBase);
  const numCities = ownCities.length;
  const settlerCount = countSettlers(gameState, civSlot);
  const nearbyMil = countNearbyMilitary(city, gameState, mapBase, civSlot, 20);

  return {
    nearbyEnemies,
    defenders,
    isFrontier,
    isCoastal: coastal,
    numCities,
    settlerCount,
    nearbyEnemyMilitary: nearbyEnemies.length,
    nearbyOwnMilitary: nearbyMil,
  };
}

// ── Production switch penalty evaluation ──────────────────────────

/**
 * Decide whether to keep current production or switch to a new item.
 *
 * Cross-type switches (unit↔building↔wonder) lose 50% of invested shields.
 * Only switch if the new item's score exceeds the current item by a
 * significant margin AND the shield loss is acceptable.
 *
 * Returns true if we should keep current production.
 */
function shouldKeepCurrentProduction(city, currentScore, newScore, newItem) {
  const current = city.itemInProduction;
  if (!current) return false;

  const invested = city.shieldsInBox || 0;
  if (invested === 0) return false;

  // Same type → no shield penalty, but still resist switching if we've
  // invested shields and the new score isn't significantly better.
  // This prevents flip-flopping between e.g. Settlers and Warriors.
  if (current.type === newItem.type) {
    return newScore < currentScore * SAME_TYPE_SWITCH_THRESHOLD;
  }

  // Cross-type switch: 50% shield penalty
  const totalCost = getProductionCost(current);
  if (totalCost === Infinity || totalCost === 0) return false;

  const fractionInvested = invested / totalCost;

  // If we've invested very little (<10%), switch freely
  if (fractionInvested < 0.1) return false;

  // If we've invested moderately (10-30%), switch only if new score is significantly better
  if (fractionInvested < 0.3) {
    return newScore < currentScore * SWITCH_THRESHOLD;
  }

  // If we've invested a lot (>30%), be very reluctant to switch
  // The new item must be overwhelmingly better
  return newScore < currentScore * (SWITCH_THRESHOLD + fractionInvested);
}

// ── Main production AI ───────────────────────────────────────────

/**
 * Generate CHANGE_PRODUCTION actions for all cities owned by the AI civ.
 *
 * For each city, scores ALL possible builds (units, buildings, wonders)
 * and selects the highest-scoring item. Respects production switch
 * penalties to avoid wasteful changes.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @param {object} strategy - strategic assessment from strategy.js
 * @returns {Array<object>} CHANGE_PRODUCTION actions
 */
export function generateProductionActions(gameState, mapBase, civSlot, strategy, debugLog = null) {
  const actions = [];
  const civTechs = gameState.civTechs?.[civSlot];
  const ownCities = [];
  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const c = gameState.cities[ci];
    if (c && c.owner === civSlot && c.size > 0) ownCities.push(ci);
  }

  // Default strategy if not provided
  const strat = strategy || {
    threat: 'low',
    militaryPosture: 'expand',
    expansionDesired: true,
    warTargets: [],
    peaceTargets: [],
    productionFocus: 'economy',
    ourMilitary: 0,
    enemyMilitary: new Map(),
    cityCount: ownCities.length,
    enemyCityCount: new Map(),
  };

  for (const ci of ownCities) {
    const city = gameState.cities[ci];

    // Skip cities in civil disorder (they don't produce anyway)
    if (city.civilDisorder) continue;

    // Build city context (caches expensive lookups)
    const cityCtx = buildCityContext(city, gameState, mapBase, civSlot, strat,
      ownCities.map(i => gameState.cities[i]));

    // ── Score all possible items ──
    let bestItem = null;
    let bestScore = -1;

    // Score all unit types
    for (let uid = 0; uid < NUM_UNIT_TYPES; uid++) {
      const s = scoreUnit(uid, city, cityCtx, civTechs, gameState, mapBase, civSlot, strat);
      if (s > bestScore) {
        bestScore = s;
        bestItem = { type: 'unit', id: uid };
      }
    }

    // Score all building types
    for (let bid = 1; bid < NUM_BUILDING_TYPES; bid++) {
      const s = scoreBuilding(bid, city, ci, cityCtx, civTechs, gameState, mapBase, civSlot, strat);
      if (s > bestScore) {
        bestScore = s;
        bestItem = { type: 'building', id: bid };
      }
    }

    // Score all wonders
    for (let wi = 0; wi < NUM_WONDERS; wi++) {
      const s = scoreWonder(wi, city, ci, cityCtx, civTechs, gameState, mapBase, civSlot, strat);
      if (s > bestScore) {
        bestScore = s;
        bestItem = { type: 'wonder', id: wi + 39 };
      }
    }

    // Nothing scored positively — skip
    if (!bestItem || bestScore <= 0) continue;

    // ── Compare with current production ──
    const currentItem = city.itemInProduction;

    // Already building the best item — no change needed
    if (currentItem &&
        currentItem.type === bestItem.type &&
        currentItem.id === bestItem.id) {
      continue;
    }

    // Score the current production for comparison
    let currentScore = 0;
    let forceSwitch = false;
    if (currentItem) {
      if (currentItem.type === 'unit') {
        // Force switch if building an obsolete unit (#7)
        if (isUnitObsolete(civTechs, currentItem.id)) {
          forceSwitch = true;
          currentScore = 0;
        } else {
          currentScore = scoreUnit(currentItem.id, city, cityCtx, civTechs, gameState, mapBase, civSlot, strat);
        }
      } else if (currentItem.type === 'building') {
        currentScore = scoreBuilding(currentItem.id, city, ci, cityCtx, civTechs, gameState, mapBase, civSlot, strat);
      } else if (currentItem.type === 'wonder') {
        const wi = currentItem.id - 39;
        currentScore = scoreWonder(wi, city, ci, cityCtx, civTechs, gameState, mapBase, civSlot, strat);
      }
      // If current score is negative (invalid), force switch
      if (currentScore < 0) currentScore = 0;
    }

    // Never switch away from settlers/engineers once shields are invested,
    // unless the city is under direct military threat (enemies within 4 tiles).
    // Settlers are too important for expansion to abort mid-build.
    if (!forceSwitch && currentItem && currentItem.type === 'unit' &&
        SETTLER_TYPES.has(currentItem.id) && (city.shieldsInBox || 0) > 0) {
      const closeEnemies = findNearbyEnemies(city.gx, city.gy, gameState, mapBase, civSlot, 4);
      if (closeEnemies.length === 0) {
        continue;  // keep building settlers — no nearby threat
      }
    }

    // Check production switch penalty (skip check if force switching from obsolete)
    if (!forceSwitch && shouldKeepCurrentProduction(city, currentScore, bestScore, bestItem)) {
      continue;
    }

    // Validate and add the action
    const action = { type: 'CHANGE_PRODUCTION', cityIndex: ci, item: bestItem };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
      if (debugLog) {
        const itemName = bestItem.type === 'unit' ? (UNIT_NAMES[bestItem.id] || `unit#${bestItem.id}`)
          : bestItem.type === 'building' ? (IMPROVE_NAMES[bestItem.id] || `bldg#${bestItem.id}`)
          : (WONDER_NAMES[bestItem.id - 39] || `wonder#${bestItem.id}`);
        const oldName = currentItem
          ? (currentItem.type === 'unit' ? (UNIT_NAMES[currentItem.id] || `unit#${currentItem.id}`)
            : currentItem.type === 'building' ? (IMPROVE_NAMES[currentItem.id] || `bldg#${currentItem.id}`)
            : (WONDER_NAMES[(currentItem.id || 0) - 39] || `wonder#${currentItem.id}`))
          : 'nothing';
        debugLog.push(`PROD: ${city.name}: chose ${itemName} (score ${bestScore})${currentItem ? `, switching from ${oldName} (score ${currentScore})` : ''}`);
      }
    }
  }

  return actions;
}

// ── Rush-buy AI ──────────────────────────────────────────────────

// High-value building IDs worth rush-buying
const RUSH_BUY_BUILDINGS = new Set([
  3,  // Granary
  4,  // Temple
  9,  // Aqueduct
  15, // Factory
  23, // Sewer System
]);

/**
 * Generate RUSH_BUY actions for cities where it makes economic sense.
 *
 * Enhanced rush-buy logic:
 *   - Settlers, Engineers: always rush-worthy (expansion)
 *   - Aqueducts/Sewer when city is near growth cap
 *   - Key defensive units when under immediate threat
 *   - Key buildings (Granary, Temple, Factory)
 *   - Never rush-buy wonders (too expensive)
 *   - Cost threshold: cost < 25% of treasury (adjustable by threat)
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @param {object} strategy - strategic assessment from strategy.js
 * @returns {Array<object>} RUSH_BUY actions
 */
export function generateRushBuyActions(gameState, mapBase, civSlot, strategy) {
  const actions = [];
  const civ = gameState.civs?.[civSlot];
  if (!civ) return actions;

  let treasury = civ.treasury || 0;
  if (treasury < 100) return actions;

  // Determine how much we're willing to spend
  const threat = strategy?.threat || 'low';
  let maxSpendRatio = 0.25;
  if (threat === 'critical') maxSpendRatio = 0.40;
  else if (threat === 'high') maxSpendRatio = 0.35;

  // Prioritize rush-buy candidates: sort by urgency
  const candidates = [];

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (city.owner !== civSlot) continue;
    if (city.size <= 0) continue;
    if (city.civilDisorder) continue;

    const item = city.itemInProduction;
    if (!item) continue;

    // Wonders: only rush-buy if another civ is racing for the same wonder
    if (item.type === 'wonder') {
      const wonderIdx = item.id - 39;
      // Check if another civ is building the same wonder
      let rivalShields = -1;
      let rivalCost = 0;
      for (const oc of gameState.cities) {
        if (!oc || oc.size <= 0 || oc.owner === civSlot) continue;
        const oi = oc.itemInProduction;
        if (oi && oi.type === 'wonder' && oi.id === item.id) {
          rivalShields = oc.shieldsInBox || 0;
          rivalCost = getProductionCost(oi);
          break;
        }
      }
      // Only rush if a rival is building it
      if (rivalShields < 0) continue;
      // Estimate turns remaining for rival vs us
      const ourRemaining = totalCost - shieldsStored;
      const rivalRemaining = rivalCost - rivalShields;
      const ourShieldsPerTurn = estimateCityShields(city);
      const ourTurns = ourShieldsPerTurn > 0 ? Math.ceil(ourRemaining / ourShieldsPerTurn) : 999;
      // Rough estimate: rival produces similar shields
      const rivalTurns = ourShieldsPerTurn > 0 ? Math.ceil(rivalRemaining / ourShieldsPerTurn) : 999;
      // Only rush if we're behind by 1-3 turns
      if (ourTurns <= rivalTurns) continue; // we're already ahead
      if (ourTurns - rivalTurns > 3) continue; // too far behind, not worth it
      // Critical wonders get higher rush priority
      const CRITICAL_WONDERS = new Set([4, 22, 26, 25]); // Great Library, Hoover Dam, SETI, Apollo
      const rushBuyCost = calcRushBuyCost('wonder', totalCost, shieldsStored);
      // Must afford it and keep 50+ gold
      if (rushBuyCost > treasury - 50) continue;
      const wonderPriority = CRITICAL_WONDERS.has(wonderIdx) ? 9 : 6;
      candidates.push({ ci, city, item, buyCost: rushBuyCost, priority: wonderPriority });
      continue;
    }

    const totalCost = getProductionCost(item);
    if (totalCost === Infinity) continue;

    const shieldsStored = city.shieldsInBox || 0;
    if (shieldsStored >= totalCost) continue;

    const buyCost = calcRushBuyCost(item.type, totalCost, shieldsStored);
    if (buyCost <= 0) continue;

    // Determine urgency/priority
    let priority = 0;

    if (item.type === 'unit') {
      // Settlers/Engineers
      if (SETTLER_TYPES.has(item.id)) {
        priority = 5;
      }
      // Defensive units when under threat
      else if ((UNIT_DEF[item.id] || 0) > 0) {
        const defenders = countCityDefenders(city, gameState, civSlot);
        const enemies = findNearbyEnemies(city.gx, city.gy, gameState, mapBase, civSlot, 5);
        if (enemies.length > 0 && defenders === 0) {
          priority = 8; // Emergency defense
        } else if (defenders === 0) {
          priority = 3;
        }
      }
    } else if (item.type === 'building') {
      // Aqueduct when near growth cap
      if (item.id === 9 && city.size >= 7) {
        priority = 7;
      }
      // Sewer when near growth cap
      else if (item.id === 23 && city.size >= 11) {
        priority = 7;
      }
      // Other key buildings
      else if (RUSH_BUY_BUILDINGS.has(item.id)) {
        priority = 4;
      }
    }

    if (priority > 0) {
      candidates.push({ ci, city, item, buyCost, priority });
    }
  }

  // Sort by priority (highest first), then by cost (cheapest first)
  candidates.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.buyCost - b.buyCost;
  });

  // Process candidates
  for (const { ci, buyCost, priority } of candidates) {
    if (treasury < 100) break;
    if (buyCost > treasury) continue;
    if (buyCost > treasury * maxSpendRatio) {
      // Exception: emergency defense can spend more
      if (priority < 7) continue;
      if (buyCost > treasury * 0.5) continue;
    }

    const action = { type: 'RUSH_BUY', cityIndex: ci };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
      treasury -= buyCost;
    }
  }

  return actions;
}
