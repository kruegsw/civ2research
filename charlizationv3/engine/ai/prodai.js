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
  UNIT_PREREQS, UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_DOMAIN, UNIT_ROLE,
  UNIT_OBSOLETE, UNIT_COSTS, UNIT_NAMES,
  IMPROVE_PREREQS, IMPROVE_MAINTENANCE, IMPROVE_NAMES,
  IMPROVE_COSTS, WONDER_COSTS, WONDER_NAMES,
  WONDER_PREREQS, WONDER_OBSOLETE,
  SETTLER_TYPES, NON_COMBAT_TYPES,
  LEADER_PERSONALITY, GOVT_INDEX,
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
 * Count sea tiles (terrain 10) in a city's working radius (20 tiles).
 * Weighted: tiles being actively worked count as 4, others as 1.
 */
function countSeaTiles(city, mapBase) {
  if (!mapBase.getTerrain) return 0;
  const offsets = [
    [-1,-1],[0,-2],[1,-1],[1,1],[0,2],[-1,1],
    [-2,-2],[-1,-3],[0,-4],[1,-3],[2,-2],[2,0],[2,2],[1,3],[0,4],[-1,3],[-2,2],[-2,0],
    [0,-1],[0,1],
  ];
  let count = 0;
  for (const [dx, dy] of offsets) {
    let gx = city.gx + dx;
    const gy = city.gy + dy;
    if (gy < 0 || gy >= mapBase.mh) continue;
    if (mapBase.wraps) gx = ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw;
    else if (gx < 0 || gx >= mapBase.mw) continue;
    try {
      if (mapBase.getTerrain(gx, gy) === 10) count++;
    } catch { /* ignore */ }
  }
  return count;
}

/**
 * Count how many of our cities on the same continent have a given building.
 */
function countCitiesWithBuilding(gameState, mapBase, city, civSlot, buildingId) {
  let count = 0;
  const cityTile = mapBase.tileData?.[city.gy * mapBase.mw + city.gx];
  const cityBody = cityTile?.bodyId ?? -1;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0 || c.owner !== civSlot) continue;
    if (c === city) continue; // skip self
    // Same continent check
    const t = mapBase.tileData?.[c.gy * mapBase.mw + c.gx];
    if ((t?.bodyId ?? -2) !== cityBody) continue;
    if (c.buildings && c.buildings.has(buildingId)) count++;
  }
  return count;
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

  // Combined combat score considers both offense AND survivability.
  // In Civ2, a unit that dies in one hit (Catapult: 6/1/1) is much less
  // useful than one that can survive and fight again (Knights: 4/2/1).
  // Score = offense + survivability + HP/FP bonuses.
  const offense = atk * 3;
  const survivability = def * 2 + hp * 3;
  score = offense + survivability;
  if (fp > 1) score += (atk + def) * 2;

  // Role-based bonus: attackers get ATK emphasis, defenders get DEF emphasis
  if (atk > def) {
    score += atk;  // mild extra offense credit
  } else {
    score += def;  // mild extra defense credit
  }

  // ── Army balance ──
  // Civ2 AI maintains roughly 2:1 attacker:defender ratio. Penalize
  // building more of the over-represented role to prevent mono-armies.
  if (domain === 0) {
    const role = UNIT_ROLE[unitId] ?? 0;
    const totalArmy = cityCtx.totalAttackers + cityCtx.totalDefenders;
    if (totalArmy >= 4) {
      const atkRatio = cityCtx.totalAttackers / totalArmy;
      const defRatio = cityCtx.totalDefenders / totalArmy;
      if (role === 0 && atkRatio > 0.7) {
        // Too many attackers — penalize building more
        score -= Math.floor((atkRatio - 0.5) * 20);
      } else if (role === 1 && defRatio > 0.5) {
        // Too many defenders — penalize building more
        score -= Math.floor((defRatio - 0.3) * 15);
      }
      // Bonus for the under-represented role
      if (role === 0 && atkRatio < 0.4) score += 5;
      if (role === 1 && defRatio < 0.2) score += 8;
    }
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
  // Mild cost adjustment: expensive units get a small penalty, but combat
  // power is the primary factor. Civ2 does NOT aggressively normalize by
  // cost — a Knight at 40 shields is strictly preferred over a Warrior
  // at 10 shields when the tech is available.
  if (cost > 30) score -= Math.floor((cost - 30) / 10);
  if (cost > 60) score -= Math.floor((cost - 60) / 15);

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
 * Ported from Civ2 FUN_00498e8b building scoring switch (cases 1-0x23).
 * Faithfully reproduces the decompiled per-building scoring logic including
 * personality-based normalization.
 *
 * Returns a numeric score (higher = more desirable). Returns -1 if
 * the building should not be considered.
 */
function scoreBuilding(buildingId, city, cityIndex, cityCtx, civTechs, gameState, mapBase, civSlot, strategy) {
  if (buildingId <= 0 || buildingId >= NUM_BUILDING_TYPES) return -1;
  if (!canBuildBuilding(civTechs, city, buildingId)) return -1;

  // ── Map decompiled locals to JS context ──
  const citySize = city.size || 1;
  const numCities = cityCtx.numCities || 1;
  const numOpponents = cityCtx.numOpponents || 0;
  const isCoastal = cityCtx.isCoastal ? 1 : 0;
  const seaTileCount = cityCtx.seaTileCount || 0;
  const numBuildings = cityCtx.numBuildings || 0;
  const tradeRouteCount = cityCtx.tradeRouteCount || 0;
  const totalMilitary = cityCtx.totalMilitary || 0;
  const sdiCount = cityCtx.sdiCount || 0;

  // Leader personality
  const leaderIdx = gameState.civs?.[civSlot]?.rulesCivNumber ?? 0;
  const personality = LEADER_PERSONALITY[leaderIdx] || [0, 0];
  const expansionism = personality[0]; // DAT_006554fa
  const militarism = personality[1];   // DAT_006554f8

  // Government
  const govtStr = gameState.civs?.[civSlot]?.government || 'despotism';
  const govtIdx = GOVT_INDEX[govtStr] ?? 1;

  // Happiness pressure: 0=none, 1=some unhappy, 2=disorder/critical
  // Decompiled: 2 if civil disorder OR production-halted flags; 1 if unhappy==happy; 0 otherwise
  let happyPressure = 0;
  if (city.civilDisorder) {
    happyPressure = 2;
  } else {
    const h = city.happyCitizens ?? city.happy ?? 0;
    const u = city.unhappyCitizens ?? city.unhappy ?? 0;
    if (u >= h && h + u > 0) happyPressure = 1;
  }

  // Threat level: number of enemies at war (from strategy.aiData or warTargets)
  const warTargets = strategy.warTargets || [];
  const threatLevel = warTargets.length;

  // Shield production estimate (divided by 2 = iVar5 in many formulas)
  const cityShields = estimateCityShields(city);
  const halfShields = cityShields >> 1;

  // Strategic posture (0-5): map from strategy assessment
  // 0=expand, 1=defend, 2=behind naval, 3=behind air, 4=build barracks, 5=build walls
  const postureScore = strategy.militaryPostureScore ?? 0;
  let strategicPosture = 0;
  if (postureScore <= 1) strategicPosture = 1;       // defend
  else if (postureScore <= 3) strategicPosture = 3;   // standard
  else if (postureScore === 4) strategicPosture = 4;   // barracks
  else if (postureScore === 5) strategicPosture = 5;   // walls
  else strategicPosture = 0;                           // expand/dominant

  // Approximate city pollution count
  // Decompiled: DAT_006a65e4 = pollution count from city production recalc
  let pollutionCount = 0;
  if (city.buildings) {
    if (city.buildings.has(15)) pollutionCount++; // Factory
    if (city.buildings.has(16)) pollutionCount++; // Mfg Plant
    if (city.buildings.has(19)) pollutionCount++; // Power Plant
  }
  if (citySize >= 10) pollutionCount++;

  // Approximate total food surplus and total population
  // Decompiled: DAT_006a65a8 = food surplus, DAT_006a6550 = total trade/population
  const foodSurplus = estimateFoodSurplus(city);
  const totalPop = citySize; // rough proxy

  // civsAlive bitmask (from strategy.aiData)
  const aiData = strategy.aiData;
  const civsAlive = aiData?.civsAlive ?? 0;
  const aliveCivCount = aiData?.aliveCivCount ?? 2;
  const isHuman = (civsAlive & (1 << civSlot)) === 0;

  // Strongest civ info
  // Approximate: find strongest civ from aiData.powerRanking
  let strongestCiv = 1;
  if (aiData?.powerRanking) {
    let maxPower = -1;
    for (let c = 1; c < 8; c++) {
      if (c === civSlot) continue;
      if (!(civsAlive & (1 << c))) continue;
      if ((aiData.powerRanking[c] || 0) > maxPower) {
        maxPower = aiData.powerRanking[c] || 0;
        strongestCiv = c;
      }
    }
  }

  // Number of our cities with Palace (local_234 in decompiled)
  // Decompiled local_234 = count of own cities with Palace or producing item -1
  let palaceCityCount = 0;
  let largestPalaceCity = 0;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0 || c.owner !== civSlot) continue;
    if (c.buildings && (c.buildings.has(1) || c.buildings.has(8))) {
      palaceCityCount++;
      if (c.size > largestPalaceCity) largestPalaceCity = c.size;
    }
  }

  // Approximate: city waste/corruption (used in courthouse scoring)
  // Decompiled: DAT_006a656c = waste, DAT_006a6580 = corruption
  // We estimate based on city distance from palace and government type
  const waste = Math.max(0, Math.floor(citySize / 3));
  const corruption = Math.max(0, Math.floor(citySize / 4));

  // Approximate: DAT_006a65cc = city shield production for various formulas
  const cityShieldProd = cityShields;

  // ── Building scoring switch (ported from decompiled cases 1-0x23) ──
  let score = 999; // 999 = skip (building not scored)
  let coastalPref = 0; // local_90: 1 = this building prefers coastal cities

  switch (buildingId) {
    // ── case 1: Palace ──
    case 1: {
      // Build palace only under specific strategic conditions:
      // - palaceCityCount==0 (no palace) OR (not alive in civsAlive AND
      //   (palaceCityCount==0 OR (==1 AND largest palace city < 2*citySize)))
      // - AND strategic posture is 4, 5, 0, or threatLevel > 3
      const alive = (civsAlive & (1 << civSlot)) !== 0;
      const canBuild = (palaceCityCount === 0) ||
        (!alive && (palaceCityCount === 0 ||
          (palaceCityCount === 1 && largestPalaceCity * 2 < citySize)));
      const postureOk = strategicPosture === 4 || strategicPosture === 5 ||
        strategicPosture === 0 || threatLevel > 3;
      if (canBuild && postureOk) {
        score = 2;
        if (citySize > 9) score = 1;
        if (citySize > 14) score = score - 1;
        if (threatLevel > 3) coastalPref = isCoastal;
      }
      break;
    }

    // ── case 2: Barracks ──
    case 2: {
      // score = expansionism + threatLevel + 4 - militarism
      score = expansionism + threatLevel + 4 - militarism;
      // If militarism < 0 OR expansionism > 0, AND they don't cancel:
      if ((militarism < 0 || expansionism > 0) && (expansionism + militarism !== 0)) {
        score = score + threatLevel;
      }
      coastalPref = 1;
      // Scale by alive civ count
      if (civsAlive & (1 << civSlot)) {
        if (aliveCivCount === 3) {
          score = Math.floor(score * 3 / 2);
        }
        if (aliveCivCount > 3) {
          score = score << 1;
        }
      }
      break;
    }

    // ── case 3: Granary ──
    case 3: {
      // Skip if Pyramids wonder active (provides free granary)
      if (hasWonderEffect(gameState, civSlot, 0)) break; // score stays 999 = skip
      if (numCities < 3) {
        score = 8;
      } else {
        score = 4;
      }
      // Bonus if food surplus >= total population (good food situation)
      if (totalPop <= foodSurplus) {
        score = score + 2;
      }
      // Bonus for human player based on alive civ count and city size
      if ((civsAlive & (1 << civSlot)) !== 0) {
        const granaryBonus = (aliveCivCount + 4) - citySize;
        if (granaryBonus > 0) {
          score = score + granaryBonus;
        }
      }
      break;
    }

    // ── case 4: Temple ──
    case 4: {
      if (happyPressure === 1) score = 9;
      if (happyPressure === 2) score = -5; // 0xfffffffb signed
      break;
    }

    // ── case 5: Marketplace ──
    case 5: {
      // score = clamp(10 - numCities/2, 1, 10)
      score = clamp(10 - (numCities >> 1), 1, 10);
      if (happyPressure === 1) score = score - 1;
      if (happyPressure === 2) score = -4; // 0xfffffffc signed
      break;
    }

    // ── case 6: Library ──
    case 6: {
      // score = clamp(10 - numCities/3, 1, 10)
      score = clamp(10 - Math.floor(numCities / 3), 1, 10);
      break;
    }

    // ── case 7: Courthouse ──
    case 7: {
      // score = 14 - (waste*2 + corruption)
      score = 14 - (waste * 2 + corruption);
      // Democracy: special handling
      if (govtIdx === 6) {
        if (happyPressure === 2) score = -1;
      } else if (!(civsAlive & (1 << civSlot))) {
        // Not human: reduce based on strongest civ's power
        const strongestPower = aiData?.powerRanking?.[strongestCiv] ?? 0;
        score = score - Math.floor(strongestPower / 2);
      }
      break;
    }

    // ── case 8: City Walls ──
    case 8: {
      // Skip if Great Wall wonder active
      if (hasWonderEffect(gameState, civSlot, 6)) break; // score stays 999

      score = 10 - (citySize >> 1);
      // Penalty for each enemy with hostile treaty or military presence
      for (let other = 1; other < 8; other++) {
        if (!(civsAlive & (1 << other))) continue;
        // Check hostile treaties (approximation: at war)
        if (warTargets.includes(other)) {
          score = score - 2;
        }
        // Enemy has military on same continent (approximation)
        if (aiData?.continents) {
          const cont = aiData.continents.get(cityCtx.continentId);
          if (cont && (cont.militaryCounts.get(other) || 0) > 0) {
            score = score - 1;
          }
        }
      }
      // Bonus for known global threats (approximate with warTargets)
      if (warTargets.length > 0) score = score + 2;
      if (warTargets.length > 1) score = score + 2;
      if (threatLevel > 2) score = score + 2;
      score = clamp(score, 1, 10);
      // Penalty if city already has Palace (walls less critical there)
      if (city.buildings && city.buildings.has(1)) {
        score = score - 4;
      }
      coastalPref = 1;
      break;
    }

    // ── case 9: Aqueduct ──
    case 9: {
      // Aqueduct needed at size threshold (default 8)
      // Decompiled: if (aqueductThreshold - halfShields <= citySize)
      // DAT_0064bcd1 = 8 (standard aqueduct threshold)
      const aqueductThreshold = 8;
      if (aqueductThreshold - halfShields <= citySize) {
        score = (aqueductThreshold + 4) - citySize - halfShields;
        score = clamp(score, 1, 20);
      }
      break;
    }

    // ── case 10: Bank ──
    case 10: {
      // Same as Marketplace + happiness tweak
      score = clamp(10 - Math.floor(numCities / 3), 1, 10);
      if (happyPressure === 1) score = score - 1;
      if (happyPressure === 2) score = 0;
      break;
    }

    // ── case 0xb (11): Cathedral ──
    case 11: {
      // Skip if Michelangelo's Chapel wonder active
      if (hasWonderEffect(gameState, civSlot, 10)) break; // score stays 999
      if (happyPressure === 1) score = 8;
      if (happyPressure === 2) score = -3; // 0xfffffffd signed
      break;
    }

    // ── case 0xc (12): University ──
    case 12: {
      // Requires Library (building 6) — checked by canBuildBuilding prereq
      // Additional check: scienceRate > 0 AND (no opponents OR no Espionage tech)
      const sciRate = gameState.civs?.[civSlot]?.scienceRate ?? 5;
      const hasEspionage = civTechs ? civTechs.has(0x4c) : false; // tech 76 = Espionage
      if (sciRate > 0 && (numOpponents === 0 || !hasEspionage)) {
        score = clamp(10 - (numCities >> 2), 2, 10);
      }
      break;
    }

    // ── case 0xd (13): Mass Transit ──
    case 13: {
      // No scoring case in decompiled — skip
      break;
    }

    // ── case 0xe (14): Colosseum ──
    case 14: {
      if (happyPressure === 2) score = -2; // 0xfffffffe signed
      break;
    }

    // ── case 0xf (15): Factory ──
    // ── case 0x14 (20): Hydro Plant (same scoring as Factory) ──
    case 15:
    case 20: {
      score = clamp(14 - cityShieldProd, 1, 14);
      break;
    }

    // ── case 0x11 (17): SDI Defense ──
    case 17: {
      if (happyPressure < 2) {
        let s = clamp(15 - citySize, 1, 15);
        score = Math.floor((s + 1) / 2);
        // Manhattan Project check: if no Manhattan → double
        // DAT_00655c14 == -1 means no MP city
        const mp = gameState.wonders?.[23];
        const hasManhattan = mp && mp.cityIndex != null && !mp.destroyed;
        if (!hasManhattan) {
          score = score << 1;
        }
        // If strongest civ has no SDI → double
        let strongestHasSdi = false;
        const strongestCities = gameState.cities.filter(c =>
          c && c.size > 0 && c.owner === strongestCiv);
        for (const sc of strongestCities) {
          if (sc.buildings && sc.buildings.has(17)) {
            strongestHasSdi = true;
            break;
          }
        }
        if (!strongestHasSdi) {
          score = score << 1;
        }
        if (citySize > 9) score = score - 1;
        // If city has Palace → 0
        if (city.buildings && city.buildings.has(1)) {
          score = 0;
        }
      }
      coastalPref = 1;
      break;
    }

    // ── case 0x13 (19): Power Plant ──
    case 19: {
      score = clamp(12 - Math.floor(cityShieldProd / 5), 2, 14);
      break;
    }

    // ── case 0x16 (22): Stock Exchange ──
    case 22: {
      if (happyPressure !== 0 || numOpponents < 2) {
        score = clamp(11 - (numCities >> 2), 2, 11);
        if (happyPressure === 1) score = score - 1;
        if (happyPressure === 2) score = 0;
      }
      break;
    }

    // ── case 0x17 (23): Sewer System ──
    case 23: {
      // Sewer needed at size threshold (default 12)
      // Only if numOpponents < 2
      const sewerThreshold = 12;
      if (numOpponents < 2 && (sewerThreshold - halfShields) <= citySize) {
        score = (sewerThreshold + 4) - citySize - halfShields;
        score = clamp(score, 1, 20);
      }
      break;
    }

    // ── case 0x18 (24): Supermarket ──
    case 24: {
      // score = 14 - citySize/2 - tradeRoutes*2 + opponents*2 + halfShields
      score = 14 - (citySize >> 1) + tradeRouteCount * -2 + numOpponents * 2 + halfShields;
      score = clamp(score, 2, 14);
      break;
    }

    // ── case 0x19 (25): Superhighways ──
    case 25: {
      // score = 15 - citySize/2 + opponents*6
      score = 15 - (citySize >> 1) + numOpponents * 6;
      score = clamp(score, 2, 15);
      break;
    }

    // ── case 0x1a (26): Research Lab ──
    case 26: {
      // Same conditions as University: scienceRate > 0, no opponents or no Espionage
      const sciRate2 = gameState.civs?.[civSlot]?.scienceRate ?? 5;
      const hasEspionage2 = civTechs ? civTechs.has(0x4c) : false;
      if ((numOpponents === 0 || !hasEspionage2) && sciRate2 > 0) {
        score = clamp(11 - (numCities >> 2), 2, 10);
      }
      break;
    }

    // ── case 0x1b (27): SAM Battery ──
    case 27: {
      // Evaluate air threat from other civs
      // Decompiled: complex per-civ air unit count assessment
      // Simplified: compute threat from strongest civ's air/naval units
      let airThreat = 0;
      if (civsAlive & (1 << civSlot)) {
        // Human player: sum air threat from all other civs
        for (let other = 1; other < 8; other++) {
          if (other === civSlot) continue;
          if (!(civsAlive & (1 << other))) continue;
          let otherThreat = Math.floor((aiData?.milAtkSum?.[other] ?? 0) / 4);
          // Reduce threat if not at war and no hatred
          if (!warTargets.includes(other)) {
            otherThreat = Math.floor(otherThreat / 2);
          }
          airThreat += otherThreat;
        }
      } else {
        // AI: use strongest civ's air capability estimate
        airThreat = Math.floor((aiData?.milAtkSum?.[strongestCiv] ?? 0) / 3);
      }
      score = 12 - airThreat;
      score = clamp(score, 1, 12);
      // Penalty if city has improvements that suggest inland (decompiled checks city attribs)
      if (city.buildings && city.buildings.has(15)) { // has Factory
        score = score - 3;
      }
      coastalPref = 1;
      // Check if any alive civ is republic/democracy or hates us
      for (let other = 1; other < 8; other++) {
        if (!(civsAlive & (1 << other))) continue;
        const otherGovt = gameState.civs?.[other]?.government || 'despotism';
        const otherGovtIdx = GOVT_INDEX[otherGovt] ?? 1;
        if (otherGovtIdx > 4 || warTargets.includes(other)) {
          coastalPref = isCoastal;
          break;
        }
      }
      break;
    }

    // ── case 0x1c (28): Coastal Fortress ──
    case 28: {
      // Only for coastal cities (checked via isCoastal, not canBuild prereq)
      if (!isCoastal) break; // score stays 999

      // Evaluate naval threat from other civs
      let navalThreat = 0;
      if (civsAlive & (1 << civSlot)) {
        for (let other = 1; other < 8; other++) {
          if (other === civSlot) continue;
          if (!(civsAlive & (1 << other))) continue;
          let otherNaval = Math.floor((aiData?.milDefSum?.[other] ?? 0) / 3);
          if (!warTargets.includes(other)) {
            otherNaval = Math.floor(otherNaval / 2);
          }
          navalThreat += otherNaval;
        }
      } else {
        navalThreat = Math.floor((aiData?.milDefSum?.[strongestCiv] ?? 0) / 2);
      }
      score = 12 - navalThreat;
      score = clamp(score, 1, 12);
      coastalPref = 1;
      // Same republic/democracy/hatred check as SAM
      for (let other = 1; other < 8; other++) {
        if (!(civsAlive & (1 << other))) continue;
        const otherGovt = gameState.civs?.[other]?.government || 'despotism';
        const otherGovtIdx = GOVT_INDEX[otherGovt] ?? 1;
        if (otherGovtIdx > 4 || warTargets.includes(other)) {
          coastalPref = isCoastal;
          break;
        }
      }
      break;
    }

    // ── case 0x1d (29): Solar Plant — no case in decompiled (falls to default) ──
    // Handled by default below

    // ── case 0x1e (30): Harbour ──
    case 30: {
      if (happyPressure < 2) {
        score = clamp(16 - numBuildings, 2, 16);
        if (cityShields < 1) {
          score = Math.floor(score / 2);
        }
      }
      break;
    }

    // ── case 0x1f (31): Offshore Platform ──
    case 31: {
      if (happyPressure < 2) {
        score = clamp(16 - numBuildings, 2, 16);
        if (score > 0) {
          // Reduce if city already has Factory
          if (city.buildings && city.buildings.has(15)) {
            score = Math.floor(score / 2);
          }
          // Reduce if city already has Mfg Plant
          if (city.buildings && city.buildings.has(16)) {
            score = Math.floor(score / 2);
          }
        }
        // Additional check: if many cities lack support AND city is large,
        // reduce priority (decompiled checks DAT_006a65cc - DAT_006a6568)
        const supportRatio = cityShieldProd > 3 ? Math.floor(numBuildings / 4) : 0;
        if (cityShieldProd > 0 && citySize / 2 <= supportRatio) {
          score = score - 2;
        }
      }
      break;
    }

    // ── case 0x20 (32): Airport ──
    case 32: {
      // score = (airportCount*4 + 4) - militarism
      // local_6c = count of own cities on same continent with airport
      const airportCount = countCitiesWithBuilding(gameState, mapBase, city, civSlot, 32);
      score = (airportCount * 4 + 4) - militarism;
      // Reduce if continent goal is 4 (decompiled checks DAT_0064ca32)
      // Approximate: if frontier posture → halve
      if (cityCtx.isFrontier && strategicPosture >= 4) {
        score = Math.floor(score / 2);
      }
      // Bonus if civ doesn't have Alphabet tech (tech 0 = advanced flight)
      if (civTechs && !civTechs.has(0)) {
        score = score << 1;
      }
      // Reduce if only 1 military on continent, or enemies present with no sea
      const contMilitary = aiData?.continents?.get(cityCtx.continentId)
        ?.militaryCounts?.get(civSlot) ?? 0;
      if (contMilitary <= 1 && seaTileCount === 0) {
        score = Math.min(contMilitary, score);
      }
      // Penalty if city has Palace
      if (city.buildings && city.buildings.has(1) && score >= 0) {
        score = 0;
      }
      coastalPref = isCoastal;
      break;
    }

    // ── case 0x21 (33): Police Station ──
    case 33: {
      // Skip if Women's Suffrage wonder active (wonder 21)
      if (hasWonderEffect(gameState, civSlot, 21)) break; // score stays 999

      let pol = pollutionCount;
      // Double pollution impact for republic/democracy (govtIdx > 4)
      if (govtIdx > 4) pol = pol << 1;
      // If republic+ AND pollution exists AND food surplus tight → bonus
      if (govtIdx > 3 && pol > 0 && totalPop - foodSurplus < 2) {
        pol = pol + 2;
      }
      score = 10 - pol;
      break;
    }

    // ── case 0x22 (34): Port Facility ──
    case 34: {
      // Only for coastal cities
      if (!isCoastal) break; // score stays 999

      // Decompiled: local_ac = number of units nearby (capped at 40)
      let nearbyUnits = cityCtx.nearbyOwnMilitary || 0;
      if (nearbyUnits > 40) nearbyUnits = 40;
      score = (11 - (nearbyUnits >> 2)) + sdiCount * -5 +
              (totalMilitary * 2 - militarism) + expansionism;
      score = clamp(score, 2, 15);
      if (militarism < 0) {
        score = score + totalMilitary;
      }
      break;
    }

    // ── case 0x23 (35-37): SS Structural/Component/Module ──
    case 35: case 36: case 37: {
      // Spaceship parts: complex scoring with many conditions
      // Simplified: only build if Apollo exists and strategic conditions are met
      const apollo = gameState.wonders?.[25];
      if (!apollo || apollo.cityIndex == null || apollo.destroyed) break;

      // Check if any other civ already has a spaceship
      let otherHasSpaceship = false;
      for (let other = 1; other < 8; other++) {
        if (other === civSlot) continue;
        if (!(civsAlive & (1 << other))) continue;
        // Approximate: check if other has Apollo too (they might be building SS)
        if (apollo && apollo.cityIndex != null) {
          const apolloCity = gameState.cities[apollo.cityIndex];
          if (apolloCity && apolloCity.owner === other) otherHasSpaceship = true;
        }
      }

      score = 4;
      if (otherHasSpaceship) score = 2;

      // Reduce if at war with multiple opponents
      if (numOpponents > 1 && aliveCivCount > 0) {
        score = otherHasSpaceship ? score - 2 : score - 1;
      }

      // Coastal preference in certain strategic conditions
      if (strategicPosture !== 0) {
        coastalPref = isCoastal;
      }
      break;
    }

    // ── case 38: Capitalization (no case in decompiled switch) ──
    case 38: {
      // Capitalization: minimal score, only when nothing better to build
      score = 1;
      break;
    }

    // ── default: Mfg Plant (16), Recycling (18), Nuclear (21), Solar (29) ──
    // These use the generic formula: clamp(12 - numCities/4, 2, 12)
    default: {
      // Decompiled default: clamp(12 - ((numCities + (numCities >> 31 & 3)) >> 2), 2, 12)
      // This is integer division of numCities by 4 (with rounding toward zero for negatives)
      score = clamp(12 - (numCities >> 2), 2, 12);
      break;
    }
  }

  // ── Score of 999 means building was skipped (no scoring case applied) ──
  if (score >= 400) return -1;

  // ── Post-switch normalization (lines 5096-5118 of decompiled) ──

  // Personality scaling:
  // coastalMultiplier = (isCoastal matches coastalPref) ? 10 : 20
  // score = coastalMultiplier * score * 3 / (expansionism + 3)
  const coastalMatch = (isCoastal === coastalPref) ? 1 : 0;
  const coastalMultiplier = coastalMatch ? 10 : 20;
  score = Math.floor(coastalMultiplier * score * 3 / (expansionism + 3));

  // Bonus if city has Barracks (building 2): score += score / (threatLevel/2 + 3)
  if (city.buildings && city.buildings.has(2)) {
    score = score + Math.floor(score / ((threatLevel >> 1) + 3));
  }

  // Bonus if this city has Shakespeare's Theatre (wonder 13)
  const shakespeareWonder = gameState.wonders?.[13];
  if (shakespeareWonder && shakespeareWonder.cityIndex === cityIndex && !shakespeareWonder.destroyed) {
    score = score + Math.floor(score / 3);
  }

  return score < 0 ? -1 : score;
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

  // Army composition: count attackers vs defenders for balance scoring
  let totalAttackers = 0;
  let totalDefenders = 0;
  let totalMilitary = 0;
  for (const u of gameState.units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    totalMilitary++;
    if (UNIT_DOMAIN[u.type] !== 0) continue; // land only
    const role = UNIT_ROLE[u.type] ?? 0;
    if (role === 0) totalAttackers++;
    else if (role === 1) totalDefenders++;
  }

  // Sea tile count in city radius (for harbour/offshore/port scoring)
  const seaTileCount = countSeaTiles(city, mapBase);

  // Number of alive opponent civs
  let numOpponents = 0;
  for (let c = 1; c < 8; c++) {
    if (c === civSlot) continue;
    const alive = (gameState.cities || []).some(ct => ct && ct.owner === c && ct.size > 0) ||
                  (gameState.units || []).some(u => u.owner === c && u.gx >= 0);
    if (alive) numOpponents++;
  }

  // Number of buildings this city has
  let numBuildings = 0;
  if (city.buildings) {
    for (const _ of city.buildings) numBuildings++;
  }

  // Count trade routes (approximate from city radius tiles with road+railroad)
  // Decompiled: local_24 counts tiles with both road and railroad bits
  let tradeRouteCount = 0;
  // Approximate: count tiles in radius with trade improvements
  // This is a rough proxy — real game tracks actual trade routes
  if (mapBase.tileData) {
    const offsets = [
      [-1,-1],[0,-2],[1,-1],[1,1],[0,2],[-1,1],
      [-2,-2],[-1,-3],[0,-4],[1,-3],[2,-2],[2,0],[2,2],[1,3],[0,4],[-1,3],[-2,2],[-2,0],
      [0,-1],[0,1],
    ];
    for (const [dx, dy] of offsets) {
      let gx = city.gx + dx;
      const gy = city.gy + dy;
      if (gy < 0 || gy >= mapBase.mh) continue;
      if (mapBase.wraps) gx = ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw;
      else if (gx < 0 || gx >= mapBase.mw) continue;
      const t = mapBase.tileData[gy * mapBase.mw + gx];
      if (t && t.road && t.railroad) tradeRouteCount++;
    }
  }

  // Continent-level counts for this city
  const cityTile = mapBase.tileData?.[city.gy * mapBase.mw + city.gx];
  const continentId = cityTile?.bodyId ?? 0;

  // Count SDI-like defenses: cities on this continent with SDI (building 17)
  // or Port Facility (34). Plus air units half-counted.
  // Decompiled: local_22c = FUN_005b53b6(unitStackHead, 2) + FUN_005b53b6(...,4)/2
  // We approximate: count cities on same continent with SDI
  let sdiCount = 0;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0 || c.owner !== civSlot) continue;
    if (c.buildings && c.buildings.has(17)) sdiCount++;
  }

  return {
    nearbyEnemies,
    defenders,
    isFrontier,
    isCoastal: coastal,
    numCities,
    settlerCount,
    nearbyEnemyMilitary: nearbyEnemies.length,
    nearbyOwnMilitary: nearbyMil,
    totalAttackers,
    totalDefenders,
    totalMilitary,
    seaTileCount,
    numOpponents,
    numBuildings,
    tradeRouteCount,
    continentId,
    sdiCount,
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

    // Anti-oscillation: don't switch if the best item scores within 10% of current.
    // This prevents cities from flipping between close-scored items every turn.
    if (!forceSwitch && currentItem && currentScore > 0 &&
        bestScore < currentScore * 1.1) {
      continue;
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
