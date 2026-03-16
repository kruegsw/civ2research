// ═══════════════════════════════════════════════════════════════════
// ai/prodai.js — City production AI: build selection & rush-buy
//
// Ported from Civ2 FUN_00498e8b. Comprehensive scoring system that
// evaluates ALL possible builds (units, buildings, wonders) for each
// city and picks the highest-scoring item. Factors in threat level,
// city needs, strategic posture, and production switch penalty.
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from '../rules.js';
import { getProductionCost, calcFoodSurplus, calcShieldProduction, calcCityTrade } from '../production.js';
import { calcRushBuyCost } from '../happiness.js';
import {
  UNIT_PREREQS, UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_DOMAIN, UNIT_ROLE,
  UNIT_OBSOLETE, UNIT_COSTS, UNIT_NAMES, UNIT_MOVE_POINTS,
  IMPROVE_PREREQS, IMPROVE_MAINTENANCE, IMPROVE_NAMES,
  IMPROVE_COSTS, WONDER_COSTS, WONDER_NAMES,
  WONDER_PREREQS, WONDER_OBSOLETE,
  SETTLER_TYPES, NON_COMBAT_TYPES,
  LEADER_PERSONALITY, GOVT_INDEX,
} from '../defs.js';
import { hasWonderEffect } from '../utils.js';
import {
  canBuildUnitType, canBuildImprovement, canBuildWonder as canBuildWonderCheck,
  getAvailableProduction,
} from '../buildcheck.js';
import {
  GOAL_ATTACK_CITY, GOAL_DEFEND_CITY, GOAL_NAVAL_ASSAULT,
  GOAL_REINFORCE, GOAL_EXPLORE, GOAL_TRANSPORT,
} from './goals.js';

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
 * Delegates to buildcheck.js for full validation: tech prereqs, obsolescence,
 * domain (coastal), fanatics (government), etc.
 * Uses cityIndex=-1 for generic checks (no coastal validation).
 */
function canBuildUnit(civTechs, unitId, civSlot, cityIndex, gameState, mapBase) {
  // When called with full context, use the authoritative buildcheck
  if (civSlot != null && gameState != null) {
    return canBuildUnitType(civSlot, cityIndex ?? -1, unitId, gameState, mapBase);
  }
  // Legacy fallback: tech-only check (used by bestDefensiveUnit/bestOffensiveUnit)
  const prereq = UNIT_PREREQS[unitId] ?? -1;
  if (!hasTechPrereq(civTechs, prereq)) return false;
  if (isUnitObsolete(civTechs, unitId)) return false;
  return true;
}

/**
 * Check if a civ/city can build a given building.
 * Delegates to buildcheck.js for full validation: tech prereqs, already built,
 * building chains (e.g. Mfg Plant needs Factory), coastal requirements,
 * power plant mutual exclusion, palace uniqueness, spaceship parts, etc.
 */
function canBuildBuilding(civTechs, city, buildingId, civSlot, cityIndex, gameState, mapBase) {
  // When called with full context, use the authoritative buildcheck
  if (civSlot != null && gameState != null) {
    return canBuildImprovement(civSlot, cityIndex ?? -1, buildingId, gameState, mapBase);
  }
  // Legacy fallback: simplified check
  if (city.buildings && city.buildings.has(buildingId)) return false;
  const prereq = IMPROVE_PREREQS[buildingId] ?? -1;
  return hasTechPrereq(civTechs, prereq);
}

/**
 * Check if a civ can build a given wonder.
 * Delegates to buildcheck.js for full validation: tech prereqs, already built,
 * obsolescence, destroyed status, etc.
 */
function canBuildWonder(civTechs, gameState, wonderIndex, civSlot) {
  // When called with full context, use the authoritative buildcheck
  if (civSlot != null) {
    return canBuildWonderCheck(civSlot, wonderIndex, gameState);
  }
  // Legacy fallback: simplified check
  const prereq = WONDER_PREREQS[wonderIndex] ?? -1;
  if (!hasTechPrereq(civTechs, prereq)) return false;
  const obsolete = WONDER_OBSOLETE[wonderIndex] ?? -1;
  if (obsolete >= 0 && civTechs && civTechs.has(obsolete)) return false;
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
 * Compute actual city trade output. Falls back to size proxy when context
 * is unavailable (follows the same pattern as estimateFoodSurplus).
 */
function estimateCityTrade(city, cityIndex, gameState, mapBase) {
  if (!gameState || !mapBase || cityIndex == null) {
    // Fallback for callers without full context
    return Math.max(1, city.size);
  }
  const { netTrade } = calcCityTrade(city, cityIndex, gameState, mapBase);
  return Math.max(1, netTrade);
}

/**
 * Compute actual city shield output. Falls back to size proxy when context
 * is unavailable (follows the same pattern as estimateFoodSurplus).
 * Returns 0 if the city is in civil disorder (no production).
 */
function estimateCityShields(city, cityIndex, gameState, mapBase) {
  if (city.civilDisorder) return 0;
  if (!gameState || !mapBase || cityIndex == null) {
    // Fallback for callers without full context
    return Math.max(1, Math.floor(city.size * 0.7) + 1);
  }
  const { netShields } = calcShieldProduction(city, cityIndex, gameState, mapBase, gameState.units);
  return Math.max(1, netShields);
}

/**
 * Compute actual food surplus for a city.
 * Ported from FUN_0043d07a (called at line 4197 of FUN_00498e8b)
 * which populates DAT_006a65a8 (food surplus) before all scoring.
 * The old heuristic returned fake constants (2/1/0) regardless of
 * actual tile yields, improvements, government, or settler drain.
 */
function estimateFoodSurplus(city, cityIndex, gameState, mapBase) {
  if (!gameState || !mapBase || cityIndex == null) {
    // Fallback for callers without full context
    if (city.size <= 3) return 2;
    if (city.size <= 6) return 1;
    return 0;
  }
  const { surplus } = calcFoodSurplus(city, cityIndex, gameState, mapBase, gameState.units);
  return surplus;
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
 * Uses cityIndex for domain checks (coastal) when provided.
 */
function bestDefensiveUnit(civTechs, civSlot, cityIndex, gameState, mapBase) {
  let bestId = -1;
  let bestDef = -1;
  for (let id = 0; id < NUM_UNIT_TYPES; id++) {
    if (!canBuildUnit(civTechs, id, civSlot, cityIndex, gameState, mapBase)) continue;
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
 * Uses cityIndex for domain checks (coastal) when provided.
 */
function bestOffensiveUnit(civTechs, civSlot, cityIndex, gameState, mapBase) {
  let bestId = -1;
  let bestAtk = -1;
  for (let id = 0; id < NUM_UNIT_TYPES; id++) {
    if (!canBuildUnit(civTechs, id, civSlot, cityIndex, gameState, mapBase)) continue;
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

// ── Spaceship constants (from RULES.TXT COSMIC section) ──────────
// Maximum counts for each spaceship component category.
// DAT_00634f64 (×3 stride, 6 entries):
//   [0]=structural max, [1]=fuel max, [2]=propulsion max,
//   [3]=habitation max, [4]=life support max, [5]=solar panel max
const SS_MAX = [10, 6, 6, 5, 5, 5]; // Standard Civ2 MGE values

// Spaceship component building IDs: 35=SS Structural, 36=SS Component, 37=SS Module
const SS_STRUCTURAL_ID = 35;
const SS_COMPONENT_ID = 36;
const SS_MODULE_ID = 37;

// ── Spaceship AI ──────────────────────────────────────────────────

/**
 * Score a spaceship part for production selection.
 *
 * Ported from Civ2 FUN_00597d6f (spaceship component selection AI)
 * and FUN_00598197 (component category selection within each phase).
 *
 * The original function evaluates 3 phases:
 *   Phase 0: Structural — build enough structural segments first
 *   Phase 1: Components — fuel + propulsion (balanced, limited by structural count)
 *   Phase 2: Modules — habitation + life support + solar panels
 *
 * Within each phase, it picks whichever component is most needed
 * (fewest built relative to maximum). Returns a score (higher = more
 * desirable) or -1 if the part should not be built.
 *
 * @param {number} buildingId - 35 (structural), 36 (component), 37 (module)
 * @param {object} gameState
 * @param {number} civSlot
 * @param {object} strategy
 * @returns {number} score (-1 = skip)
 */
function _scoreSpaceshipPart(buildingId, gameState, civSlot, strategy) {
  // Must have Apollo Program wonder effect
  if (!hasWonderEffect(gameState, civSlot, 25)) return -1;

  const civ = gameState.civs?.[civSlot];
  if (!civ) return -1;

  // Determine which phase this building belongs to
  let phase; // 0=structural, 1=components, 2=modules
  if (buildingId === SS_STRUCTURAL_ID) phase = 0;
  else if (buildingId === SS_COMPONENT_ID) phase = 1;
  else if (buildingId === SS_MODULE_ID) phase = 2;
  else return -1;

  // ── N.4: Count actual spaceship parts from city buildings ──
  // This is accurate for both parsed saves and mapgen-started games.
  let structural = 0, components = 0, modules = 0;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0 || c.owner !== civSlot || !c.buildings) continue;
    if (c.buildings.has(SS_STRUCTURAL_ID)) structural++;
    if (c.buildings.has(SS_COMPONENT_ID)) components++;
    if (c.buildings.has(SS_MODULE_ID)) modules++;
  }

  // ── N.4: Exact target ratios ──
  // Structurals: need 10, Components: need 4 (balanced fuel+propulsion),
  // Modules: need 3 (habitation+life support+solar).
  // Build order enforced: structural → components → modules.
  const TARGET_STRUCTURAL = 10;
  const TARGET_COMPONENTS = 4;
  const TARGET_MODULES    = 3;

  const structuralNeeded = Math.max(0, TARGET_STRUCTURAL - structural);
  const componentsNeeded = Math.max(0, TARGET_COMPONENTS - components);
  const modulesNeeded    = Math.max(0, TARGET_MODULES - modules);

  // Strategy context
  const aiData = strategy?.aiData;
  const civsAlive = aiData?.civsAlive ?? 0;
  const warTargets = strategy?.warTargets || [];
  const aliveCivCount = aiData?.aliveCivCount ?? 2;

  // Check if any rival civ is ahead in space race
  let rivalAhead = false;
  let rivalSpaceProgress = 0;
  for (let other = 1; other < 8; other++) {
    if (other === civSlot) continue;
    if (!(civsAlive & (1 << other))) continue;
    const otherCiv = gameState.civs?.[other];
    if (!otherCiv) continue;
    // Count rival parts from their cities
    let otherParts = 0;
    for (const c of gameState.cities) {
      if (!c || c.size <= 0 || c.owner !== other || !c.buildings) continue;
      if (c.buildings.has(SS_STRUCTURAL_ID)) otherParts++;
      if (c.buildings.has(SS_COMPONENT_ID)) otherParts++;
      if (c.buildings.has(SS_MODULE_ID)) otherParts++;
    }
    if (otherParts > rivalSpaceProgress) {
      rivalSpaceProgress = otherParts;
    }
    if (otherParts > structural + components + modules) {
      rivalAhead = true;
    }
  }

  // ── Phase priority with strict build order ──
  let score;
  const totalOurs = structural + components + modules;

  if (phase === 0) {
    // Structural phase — always first priority
    if (structuralNeeded <= 0) return -1;
    score = structuralNeeded + 5; // High base to ensure structurals come first
    if (structural < 3) score += 5; // Extra urgency for initial structurals
  } else if (phase === 1) {
    // Component phase — only after enough structurals
    if (componentsNeeded <= 0) return -1;
    // Enforce build order: need at least 4 structurals before components
    if (structural < 4) return -1;
    score = componentsNeeded + 2;
    // Deprioritize if structural phase isn't done yet
    if (structuralNeeded > 0) {
      score = Math.max(1, score - 3);
    }
  } else {
    // Module phase — only after structurals and components
    if (modulesNeeded <= 0) return -1;
    // Enforce build order: need structural base and some components first
    if (structural < 6) return -1;
    if (components < 2) return -1;
    score = modulesNeeded + 1;
    // Deprioritize if earlier phases aren't done
    if (structuralNeeded > 0) score = Math.max(1, score - 4);
    if (componentsNeeded > 0) score = Math.max(1, score - 2);
  }

  // War penalty: reduce spaceship priority during wartime
  if (warTargets.length > 1 && aliveCivCount > 2) {
    score = Math.max(1, score - 2);
  }

  // Rival space race urgency: if rival is building spaceship, increase priority
  if (rivalAhead) {
    score += 3;
  } else if (rivalSpaceProgress > 0) {
    score += 1;
  }

  return Math.max(0, score);
}

// ── Scoring functions ─────────────────────────────────────────────

/**
 * Score a unit type for a specific city context.
 *
 * Ported from Civ2 FUN_00498e8b unit scoring sections:
 *   - Combat units (role 0-4): lines 5695-6050 of decompiled
 *   - Settlers (role 5): lines 5848-5925
 *   - Diplomats (role 6): lines 5526-5650
 *   - Trade units (role 7): lines 5652-5668
 *
 * Returns a numeric score (higher = more desirable). Returns -1 if the
 * unit should not be considered.
 *
 * NOTE: The decompiled code uses lower=better scoring. We invert at the
 * normalization step so our convention (higher=better) is preserved.
 */
function scoreUnit(unitId, city, cityCtx, civTechs, gameState, mapBase, civSlot, strategy) {
  const cityIndex = gameState.cities.indexOf(city);
  if (!canBuildUnit(civTechs, unitId, civSlot, cityIndex, gameState, mapBase)) return -1;

  const domain = UNIT_DOMAIN[unitId] ?? 0;
  const role = UNIT_ROLE[unitId] ?? 0;
  const atk = UNIT_ATK[unitId] || 0;
  const def = UNIT_DEF[unitId] || 0;
  const hp = UNIT_HP[unitId] || 1;
  const fp = UNIT_FP[unitId] || 1;
  const cost = UNIT_COSTS[unitId] || 10;

  // ── Domain filters ──
  // Landlocked cities skip naval units
  if (domain === 1 && !cityCtx.isCoastal) return -1;
  // Nuclear missiles (45): skip
  if (unitId === 42) return -1; // unit 42 = Carrier (0x2a in decompiled skip)

  // ── Leader personality ──
  const leaderIdx = gameState.civs?.[civSlot]?.rulesCivNumber ?? 0;
  const personality = LEADER_PERSONALITY[leaderIdx] || [0, 0, 0];
  const expansionism = personality[0]; // DAT_006554fa
  const militarism = personality[1];   // DAT_006554f8
  const tolerance = personality[2] ?? 0; // DAT_006554f9

  // ── Government ──
  const govtStr = gameState.civs?.[civSlot]?.government || 'despotism';
  const govtIdx = GOVT_INDEX[govtStr] ?? 1;

  // ── Strategic context ──
  const warTargets = strategy.warTargets || [];
  const threatLevel = warTargets.length;
  const aiData = strategy.aiData;
  const civsAlive = aiData?.civsAlive ?? 0;
  const isHuman = (civsAlive & (1 << civSlot)) !== 0;
  const aliveCivCount = aiData?.aliveCivCount ?? 2;

  // Continent strategic posture (local_f8 in decompiled)
  // 0=expand, 1=defend, 4=wartime, 5=build walls
  const postureScore = strategy.militaryPostureScore ?? 0;
  let continentPosture = 0;
  if (postureScore <= 1) continentPosture = 1;
  else if (postureScore <= 3) continentPosture = 3;
  else if (postureScore === 4) continentPosture = 4;
  else if (postureScore === 5) continentPosture = 5;

  // coastal flag (local_b0 in decompiled): 1 if posture is expand/defend or flag set
  let coastalFlag = (continentPosture === 0 || continentPosture === 1) ? 1 : 0;

  // Strongest civ
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

  // City's continent unit counts (from cityCtx)
  const continentId = cityCtx.continentId;
  const cont = aiData?.continents?.get(continentId);
  const ourContCities = cont?.cityCounts?.get(civSlot) || 0;

  // Per-type counts on this continent
  const sameTypeOnCont = cityCtx.unitTypeCountOnCont?.[unitId] || 0;
  const sameTypeGlobal = countUnitsByType(gameState, civSlot, unitId);
  const numCities = cityCtx.numCities;

  // ── Per-type maximum checks (decompiled: ATK >= 99 caps at 4 built + 2 globally) ──
  if (atk >= 99 && sameTypeGlobal >= 4 && sameTypeOnCont >= 2) return -1;

  // ── Settler scoring (role 5) ──
  // Ported from decompiled lines 5848-5925
  if (role === 5) {
    // City size must be > 1 (city.size checks below handle this)
    if (city.size <= 1) return -1;

    // Skip settlers in fundamentalism (govtIdx 4) and various conditions
    // Decompiled: role==5 requires citySize > 1 AND various food/settler checks

    // Engineers (1) vs Settlers (0): prefer engineers if available
    if (unitId === 0 && canBuildUnit(civTechs, 1, civSlot, cityIndex, gameState, mapBase)) return -1;
    // Phalanx check: don't build if govtIdx < 2 (anarchy/despotism) AND unitId == 2
    // (this is actually about Warriors, handled elsewhere)

    // Decompiled settler scoring: base from population surplus analysis
    let score = 0;
    const settlerCount = cityCtx.settlerCount;

    // Check settler need threshold:
    // hasBarracks = city has Granary (building 3) or has wonder 0 (Pyramids)
    const hasGranary = (city.buildings && city.buildings.has(3)) ||
                       hasWonderEffect(gameState, civSlot, 0);
    const granaryDiv = hasGranary ? 4 : 6;

    // Settler need: below (govtIdx + 1) / 2 settlers on continent
    const settlerThreshold = Math.floor((govtIdx + 1) / 2);
    if (sameTypeOnCont < settlerThreshold) {
      // Base score depends on tolerance trait
      if (sameTypeOnCont < Math.floor(settlerThreshold / 2)) {
        score = tolerance >= 0 ? expansionism : tolerance;
      } else {
        score = tolerance;
      }
    }

    // Expansion need: few cities → high score
    if (numCities <= 2) score += 8;
    else if (numCities <= 4) score += 5;
    else if (numCities <= 8) score += 2;

    // No settlers exists: bonus
    if (settlerCount === 0 && numCities < 8) score += 5;

    // War penalty: reduce settler desire during wartime
    if (continentPosture === 4 && aliveCivCount > 2) {
      score -= 3;
    }

    // Personality: expansionists build more settlers
    score += expansionism * 2;

    // City size bonus: large cities can spare pop
    if (city.size >= 6) score += 3;
    if (city.size >= 10) score += 2;
    // Penalty: small city with low food surplus
    const _ci = gameState.cities.indexOf(city);
    if (estimateFoodSurplus(city, _ci >= 0 ? _ci : undefined, gameState, mapBase) <= 0) score -= 4;

    // Normalize: apply personality-based scaling (decompiled normalization)
    // score = ((coastalMatch ? 10 : 20) * score * 3) / (expansionism + 3)
    const coastalMatch = (cityCtx.isCoastal ? 1 : 0) === coastalFlag ? 1 : 0;
    const coastMul = coastalMatch ? 10 : 20;
    score = Math.floor(coastMul * Math.max(0, score) * 3 / (expansionism + 3));

    // Size-2 early game critical boost (keep from original for gameplay)
    if (city.size === 2 && settlerCount === 0 && numCities < 4) {
      score += 25;
    }

    return Math.max(0, score);
  }

  // ── Diplomat/Spy scoring (role 6) ──
  // Ported from decompiled lines 5526-5650
  if (role === 6) {
    // Decompiled: canExpand check, then diplomat scoring based on target civ
    let rawScore = 999; // lower = better in decompiled
    let coastalPref = 0;

    // Check if there's a valid diplomatic target
    // Decompiled: iterates civs 1-7, checks treaty status, tech advantages
    let bestTarget = -1;
    for (let c = 1; c < 8; c++) {
      if (c === civSlot) continue;
      if (!(civsAlive & (1 << c))) continue;
      // Check if we're at war or have contact
      const atWar = warTargets.includes(c);
      const theirTechs = aiData?.techCount?.[c] ?? 0;
      const ourTechs = aiData?.techCount?.[civSlot] ?? 0;
      // Prefer targets with tech advantage or at war
      if (atWar || theirTechs > ourTechs + 7) {
        bestTarget = c;
        break;
      }
    }

    if (bestTarget < 0) {
      // No good target: use strongest civ
      bestTarget = strongestCiv;
      // Base score from wartime posture
      if (continentPosture === 4 && aliveCivCount > 2) {
        coastalPref = coastalFlag;
        rawScore = 8;
        // Adjust by tech count comparison and existing diplomat count
        const theirTechs = aiData?.techCount?.[bestTarget] ?? 0;
        const ourTechs = aiData?.techCount?.[civSlot] ?? 0;
        if (sameTypeGlobal + sameTypeOnCont < Math.floor((numCities + 3) / 4)) {
          if (theirTechs > ourTechs) rawScore -= (theirTechs - ourTechs);
          rawScore = clamp(rawScore, sameTypeGlobal + 1, 10);
        }
      }
    } else {
      // Good target found
      const theirTechs = aiData?.techCount?.[bestTarget] ?? 0;
      const ourTechs = aiData?.techCount?.[civSlot] ?? 0;
      rawScore = clamp(10 - (theirTechs - ourTechs), 2, 10);
      // At war bonus
      if (warTargets.includes(bestTarget)) rawScore++;
      // Already have diplomats: penalize
      if (sameTypeOnCont > 0) rawScore = 999;
      // Treasury comparison for bribery potential
      const ourTreasury = gameState.civs?.[civSlot]?.treasury ?? 0;
      const theirTreasury = gameState.civs?.[bestTarget]?.treasury ?? 0;
      if (ourTreasury >= theirTreasury) coastalPref = coastalFlag;
    }

    // Government bonus: communism gives diplomat advantage
    if (govtIdx === 3) rawScore--;

    // Score inversion: decompiled uses lower=better, we use higher=better
    if (rawScore >= 400) return -1;

    // Personality normalization (same as buildings)
    const coastalMatch = (cityCtx.isCoastal ? 1 : 0) === coastalPref ? 1 : 0;
    const coastMul = coastalMatch ? 10 : 20;
    rawScore = Math.floor(coastMul * rawScore * 3 / (expansionism + 3));

    // Barracks bonus
    if (city.buildings && city.buildings.has(2)) {
      rawScore += Math.floor(rawScore / ((threatLevel >> 1) + 3));
    }

    // Invert: max plausible raw score ~200, so subtract from 200
    return Math.max(0, 200 - rawScore);
  }

  // ── Trade unit scoring (role 7) ──
  // Ported from decompiled lines 5652-5668
  if (role === 7) {
    // Decompiled: coastal city check, then size-based score
    if (cityCtx.isCoastal && city.size < 3) return -1;

    let rawScore = 10;
    // Base: 10 adjusted by city size and personality
    if (city.size < 3) {
      rawScore = 10 - ((5 - tolerance) * aliveCivCount) / 10;
    }
    // Add city trade route count
    rawScore += (cityCtx.tradeRouteCount || 0) * 2;
    // Add continent city count proxy for demand
    rawScore += ourContCities;

    // Coastal check: not on human-controlled island
    if (!isHuman || !cityCtx.isCoastal) {
      // Personality normalization
      const coastalMatch = (cityCtx.isCoastal ? 1 : 0) === coastalFlag ? 1 : 0;
      const coastMul = coastalMatch ? 10 : 20;
      rawScore = Math.floor(coastMul * rawScore * 3 / (expansionism + 3));
      // Barracks bonus
      if (city.buildings && city.buildings.has(2)) {
        rawScore += Math.floor(rawScore / ((threatLevel >> 1) + 3));
      }
      return Math.max(0, 200 - rawScore);
    }
    return -1;
  }

  // ── Combat units (role 0-4) ──
  // Ported from decompiled lines 5695-6050

  // Pre-filter: skip Phalanx (2) if government >= monarchy
  if (unitId === 2 && govtIdx >= 2) return -1;

  // Domain-specific pre-filters
  if (domain === 0) {
    // Land: skip units already over-represented
    const onContinent = sameTypeOnCont;
    const global = sameTypeGlobal;
    // Decompiled: local_21c[type]*2 + aiStack_364[type] = existing count metric
    let existingScore = onContinent * 2 + global;
    if (isHuman) existingScore = Math.floor(existingScore / 2);
    // Special bonus for specific unit types when human
    if (isHuman && (unitId === 12 || unitId === 10 || unitId === 9)) {
      existingScore += 2;
    }
    // Horsemen (15) count includes Chariots (16) and vice-versa
    if (unitId === 15) {
      existingScore += countUnitsByType(gameState, civSlot, 16) * 2;
    }

    // Zero-attack zero-defense units are not combat units
    if (atk === 0 && def === 0) return -1;
  }

  // Sea domain: need coastal city AND adequate sea
  if (domain === 2) {
    // Air domain checks
    // Decompiled: check for nearby ocean tile for air domain (approximation)
  }

  // ── Combat power scoring ──
  // Decompiled formula at lines 5928-5952:
  // combatPower = (ATK + DEF) * speedFactor
  // costEfficiency = (movePoints/COSMIC + 1) * combatPower / 2
  // finalScore = raw * (moveBonus+2) / costEfficiency
  let rawScore;

  // Check: role 0 (attack) or role 1 (defend) with ATK=0 and DEF=0 → score 0
  if (atk === 0 && def === 0) {
    rawScore = 0;
  } else {
    // Speed factor (decompiled: DAT_00655ae8 & 0x10 check)
    // We approximate: use move points / 10 + move*FP as speed factor
    const movePoints = UNIT_MOVE_POINTS?.[unitId] || 1;
    const speedFactor = clamp(Math.floor(movePoints / 10) + fp, 2, 4);
    const combatPower = (atk + def) * speedFactor;

    // Decompiled: costEfficiency = ((moveCost / COSMIC + 1) * combatPower) / 2
    const COSMIC_MOVE_MULTIPLIER = 3; // standard value
    const moveCostNorm = Math.floor(movePoints / COSMIC_MOVE_MULTIPLIER) + 1;
    const costEfficiency = Math.max(1, Math.floor(moveCostNorm * combatPower / 2));

    // Role-based multiplier (decompiled lines 5823-5826)
    // role not 1 and not 5 → ×2; if also not matching continent posture → ×4
    let roleMul = 1;
    if (role !== 1 && role !== 5) {
      roleMul = 2;
      if (continentPosture !== role) roleMul = 4;
    }

    // Base raw score: existingOnContinent + global counts as priority seed
    const existingMetric = sameTypeOnCont * 2 + sameTypeGlobal;
    rawScore = existingMetric * roleMul;

    // Partisans (9) special: only build on continent with certain flags
    if (unitId === 9 && coastalFlag === 0 && continentPosture !== 4) {
      return -1;
    }

    // ── Settle-type special handling ──
    // role 4 (sea transport): bonus during wartime
    if (role === 4) {
      if (continentPosture === 4) {
        rawScore = Math.floor(rawScore * 3 / 2);
      } else {
        if (continentPosture === 1 || sameTypeGlobal > 0) return -1;
        if (unitId !== 43) { // Not Transport
          rawScore = rawScore * 2 * (1 << (coastalFlag & 0x1f));
        }
      }
    }

    // ── Settlers/workers (role 5) in combat section ──
    // Already handled above, skip

    // Movement speed (HP) bonus for combat scoring
    rawScore = (movePoints + 2) * rawScore;

    // Cost-effectiveness division
    rawScore = Math.floor(rawScore / costEfficiency);
  }

  // ── Domain-specific adjustments ──

  // Naval combat (role 2): sea control bonuses
  if (role === 2) {
    // Decompiled: various naval penalty/bonus conditions
    if (!cityCtx.isCoastal) return -1;
    if (coastalFlag === 0) rawScore = rawScore << 1;
    else rawScore = rawScore << 2;
    // Harbour bonus
    if (city.buildings && city.buildings.has(34)) { // Port Facility
      rawScore -= Math.floor(rawScore / 4);
    }
  }

  // Sea domain: double for sea units
  if (domain === 1) {
    rawScore = rawScore << 1;
    // Airport bonus for sea units
    if (city.buildings && city.buildings.has(32)) {
      rawScore -= Math.floor(rawScore / 4);
    }
  }

  // ── Army balance: penalize role 1 (defend) when we have enough ──
  if (role === 1) {
    rawScore -= Math.floor((cityCtx.totalDefenders + 1) / 2);
  }

  // ── Late game: large civ needs more military ──
  if (cityCtx.numCities > 15) {
    rawScore = rawScore << 2;
  }

  // ── Threat-based adjustments ──
  if (coastalFlag === 0 && role < 6) {
    // Defensive posture: bonus for nearby threat
    let threatBonus = 0;
    if (aliveCivCount > 2 && cityCtx.nearbyEnemyMilitary > 0) {
      threatBonus = Math.floor((3 - coastalFlag) *
        (cityCtx.nearbyEnemyMilitary + 1) * rawScore / Math.max(1, aliveCivCount));
    }
    if (role === 5) threatBonus = Math.floor(threatBonus / 2);
    // Non-wartime: double up
    if (coastalFlag === 0 && aliveCivCount > 2) {
      rawScore = rawScore << 1;
    }
    rawScore += threatBonus;
  }

  // ── Human player in wartime: role 1 (defend) gets 999 (skip) ──
  if (role === 1 && isHuman && aliveCivCount > 2) {
    rawScore = 999;
  }

  // ── Emergency: no defenders ──
  if (cityCtx.defenders === 0 && def > 0 && domain === 0) {
    rawScore += 20;
    if (cityCtx.nearbyEnemies.length > 0) {
      rawScore += 15;
      const closestDist = Math.min(...cityCtx.nearbyEnemies.map(e => e.dist));
      if (closestDist <= 3) rawScore += 10;
    }
  }

  // ── Frontier bonus ──
  if (cityCtx.isFrontier && domain === 0) {
    rawScore += 5;
    if (def > atk) rawScore += 5;
  }

  // ── Personality normalization (same pattern as buildings) ──
  if (rawScore >= 400) return -1;

  const coastalPref = (role === 2 || domain === 1) ? 1 : 0;
  const coastalMatch = (cityCtx.isCoastal ? 1 : 0) === coastalPref ? 1 : 0;
  const coastMul = coastalMatch ? 10 : 20;
  rawScore = Math.floor(coastMul * rawScore * 3 / (expansionism + 3));

  // Barracks bonus
  if (city.buildings && city.buildings.has(2)) {
    rawScore += Math.floor(rawScore / ((threatLevel >> 1) + 3));
  }

  // Invert: decompiled uses lower=better, we use higher=better.
  // Typical raw scores range 0-300; use 300 as ceiling.
  return Math.max(0, 300 - Math.min(rawScore, 300));
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
  if (!canBuildBuilding(civTechs, city, buildingId, civSlot, cityIndex, gameState, mapBase)) return -1;

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
  const cityShields = estimateCityShields(city, cityIndex, gameState, mapBase);
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
  const foodSurplus = estimateFoodSurplus(city, cityIndex, gameState, mapBase);
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
    if (c.buildings && c.buildings.has(1)) { // building 1 = Palace
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
      const hasEspionage = civTechs ? civTechs.has(27) : false; // tech 27 = Espionage (0x1B)
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
      const hasEspionage2 = civTechs ? civTechs.has(27) : false; // tech 27 = Espionage (0x1B)
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
      // Spaceship parts: use dedicated scoring from FUN_00597d6f port
      const ssScore = _scoreSpaceshipPart(buildingId, gameState, civSlot, strategy);
      if (ssScore < 0) break; // score stays 999 = skip
      score = ssScore;

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
 * Ported from Civ2 FUN_00498e8b wonder scoring section (lines 5140-5525
 * of decompiled). Each of the 28 wonders (indices 0-27, stored as
 * local_74 in decompiled) gets a score adjusted by game phase,
 * leader personality, strategic posture, and city-specific factors.
 *
 * The decompiled code uses lower=better. We invert at normalization
 * so our convention (higher=better) is preserved.
 *
 * Returns -1 if the wonder should not be considered.
 */
function scoreWonder(wonderIndex, city, cityIndex, cityCtx, civTechs, gameState, mapBase, civSlot, strategy) {
  if (!canBuildWonder(civTechs, gameState, wonderIndex, civSlot)) return -1;

  // Wonders: item.id = wonderIndex + 39
  const wonderBuildId = wonderIndex + 39;

  // Skip if another city (ours or theirs) is already building it
  let weAreBuilding = false;
  let someoneElseBuilding = false;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0) continue;
    const item = c.itemInProduction;
    if (item && item.type === 'wonder' && item.id === wonderBuildId) {
      if (c.owner === civSlot) weAreBuilding = true;
      else someoneElseBuilding = true;
    }
  }
  // Don't build if we're already building it in another city
  if (weAreBuilding) {
    const thisItem = city.itemInProduction;
    if (!(thisItem && thisItem.type === 'wonder' && thisItem.id === wonderBuildId)) {
      return -1;
    }
  }

  // Small cities can't realistically finish wonders
  if (city.size < 3 && cityCtx.numCities > 1) return -1;

  // ── Leader personality ──
  const leaderIdx = gameState.civs?.[civSlot]?.rulesCivNumber ?? 0;
  const personality = LEADER_PERSONALITY[leaderIdx] || [0, 0, 0];
  const expansionism = personality[0]; // DAT_006554fa
  const militarism = personality[1];   // DAT_006554f8
  const tolerance = personality[2] ?? 0; // DAT_006554f9

  // ── Strategic context ──
  const govtStr = gameState.civs?.[civSlot]?.government || 'despotism';
  const govtIdx = GOVT_INDEX[govtStr] ?? 1;
  const aiData = strategy.aiData;
  const civsAlive = aiData?.civsAlive ?? 0;
  const isHuman = (civsAlive & (1 << civSlot)) !== 0;
  const aliveCivCount = aiData?.aliveCivCount ?? 2;
  const warTargets = strategy.warTargets || [];
  const numCities = cityCtx.numCities || 1;
  const citySize = city.size || 1;
  const threatLevel = warTargets.length;

  // Continent posture
  const postureScore = strategy.militaryPostureScore ?? 0;
  let continentPosture = 0;
  if (postureScore <= 1) continentPosture = 1;
  else if (postureScore <= 3) continentPosture = 3;
  else if (postureScore === 4) continentPosture = 4;
  else if (postureScore === 5) continentPosture = 5;
  let coastalFlag = (continentPosture === 0 || continentPosture === 1) ? 1 : 0;

  // Count wonders this city already has (local_8c in decompiled)
  let wondersInCity = 0;
  if (gameState.wonders) {
    for (let w = 0; w < NUM_WONDERS; w++) {
      const wd = gameState.wonders[w];
      if (wd && wd.cityIndex === cityIndex && !wd.destroyed) wondersInCity++;
    }
  }

  // Count wonders we own (local_18 in decompiled)
  let wondersOwned = 0;
  if (gameState.wonders) {
    for (let w = 0; w < NUM_WONDERS; w++) {
      if (hasWonderEffect(gameState, civSlot, w)) wondersOwned++;
    }
  }

  // Strongest civ
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

  // ── Base wonder score ──
  // Decompiled: iVar5 = (local_18 + local_8c + 8) - treasury / 200
  // where local_18 = wondersOwned, local_8c = wondersInCity
  const treasury = gameState.civs?.[civSlot]?.treasury ?? 0;
  let baseScore = (wondersOwned + wondersInCity + 8) - Math.floor(treasury / 200);
  if (baseScore < 2) baseScore = 1;

  // Era-based adjustment: wonder_era = wonderIndex / 7
  const wonderEra = Math.floor(wonderIndex / 7);

  // Per-continent era comparison
  const continentId = cityCtx.continentId;
  // Approximate: check if our era assessment exceeds average
  // Decompiled: DAT_0064c6b7[civ*0x594 + era] = per-continent era count
  // We use tech count as a proxy for era
  const ourTechs = aiData?.techCount?.[civSlot] ?? 0;
  let eraBonus = 0;
  // Rough era thresholds: era 0 = 0-15 techs, era 1 = 15-35, era 2 = 35-55, era 3 = 55+
  const ERA_THRESHOLDS = [0, 15, 35, 55];
  const ourEra = ERA_THRESHOLDS.findIndex((t, i) =>
    i === ERA_THRESHOLDS.length - 1 || ourTechs < ERA_THRESHOLDS[i + 1]);
  // If our era >= wonder era, slight bonus
  if (ourEra >= wonderEra) eraBonus = 0;
  else eraBonus = wonderEra - ourEra; // penalty for building era-mismatched wonders

  let rawScore = baseScore + eraBonus;

  let coastalPref = 0;
  if (continentPosture === 4) coastalPref = coastalFlag;

  // ── Per-wonder switch (decompiled lines 5188-5412) ──
  // Each case adjusts rawScore. Lower = better in decompiled.
  switch (wonderIndex) {
    case 0: // Pyramids (wonder 0x27)
      // Score -= expansionism * 3 + 2
      rawScore -= (expansionism * 3 + 2);
      break;

    case 1: // Hanging Gardens (0x28)
      // Score -= numCities / 3 + 1
      rawScore -= (Math.floor(numCities / 3) + 1);
      break;

    case 2: // Colossus (0x29)
      // Bonus if city has Palace, bonus if city has Marketplace
      if (city.buildings && city.buildings.has(1)) rawScore--;
      if (city.buildings && city.buildings.has(5)) rawScore--;
      rawScore -= Math.floor(citySize / 3);
      break;

    case 3: // Lighthouse (0x2a)
      // Decompiled: score -= (navalCount + seaAttack + 2) / 4
      // Approximate: reduce based on naval unit count
      {
        let navalCount = 0;
        for (const u of gameState.units) {
          if (u.owner === civSlot && u.gx >= 0 && UNIT_DOMAIN[u.type] === 1) navalCount++;
        }
        rawScore -= Math.floor((navalCount + 2) / 4);
      }
      break;

    case 4: // Great Library (0x2b)
      // Decompiled: iterate civs, check tech difference
      // Score better when behind in tech
      for (let c = 1; c < 8; c++) {
        if (c === civSlot) continue;
        if (!(civsAlive & (1 << c))) continue;
        const theirTechs = aiData?.techCount?.[c] ?? 0;
        if (theirTechs < ourTechs) {
          if (isHuman) rawScore++;
        } else {
          rawScore--;
          // Large tech gap: extra bonus
          if (isHuman && ourTechs + 5 < theirTechs) rawScore -= 3;
        }
      }
      break;

    case 5: // Oracle (0x2c)
      // Score -= numCities/4 + 1 - numCities/3
      rawScore -= (Math.floor(numCities / 4) + 1);
      break;

    case 6: // Great Wall (0x2d)
      // Score adjusted by personality: -= expansionism * -2
      rawScore += expansionism * 2; // expansionism makes walls less desirable
      break;

    case 7: // Sun Tzu's War Academy (0x2e)
      // Score -= militarism*3 + tolerance + expansionism*-2 + 1
      rawScore -= (militarism * 3 + tolerance + expansionism * -2 + 1);
      break;

    case 8: // King Richard's Crusade (0x2f)
      // Score adjusted by alive civs count / 3
      rawScore -= clamp(Math.floor((aliveCivCount * 2) / 3), 0, 3);
      break;

    case 9: // Marco Polo's Embassy (0x30)
      // Score adjusted by treaty status with alive civs
      for (let c = 1; c < 8; c++) {
        if (c === civSlot) continue;
        if (!(civsAlive & (1 << c))) continue;
        // Contact/alliance reduces need
        if (warTargets.includes(c)) rawScore--;
        // Peace reduces need less
      }
      break;

    case 10: // Michelangelo's Chapel (0x31)
      // Score -= numCities / 4
      rawScore -= Math.floor(numCities / 4);
      break;

    case 11: // Copernicus' Observatory (0x32)
      // Score -= citySize / 5
      // Palace bonus: subtract 1 if city has Palace
      rawScore -= Math.floor(citySize / 5);
      if (city.buildings && city.buildings.has(1)) rawScore--;
      break;

    case 12: // Magellan's Expedition (0x33)
      // Score adjusted by air unit count
      {
        let airCount = 0;
        for (const u of gameState.units) {
          if (u.owner === civSlot && u.gx >= 0 && UNIT_DOMAIN[u.type] === 2) airCount++;
        }
        rawScore -= Math.floor((airCount + 3) / 4);
      }
      break;

    case 13: // Shakespeare's Theatre (0x34)
      // Score -= citySize / 6
      rawScore -= Math.floor(citySize / 6);
      if (city.buildings && city.buildings.has(1)) rawScore--;
      break;

    case 14: // Leonardo's Workshop (0x35)
      // Score -= numCities >> 4 (small constant)
      coastalPref = coastalFlag;
      rawScore -= 4; // strong static bonus (lower = better)
      break;

    case 15: // J.S. Bach's Cathedral (0x36)
      // Score adjusted by continent goals
      rawScore -= Math.floor(numCities / 4);
      if (city.buildings && city.buildings.has(1)) rawScore--;
      break;

    case 16: // Newton's College (0x37)
      // Score -= citySize / 6
      rawScore -= Math.floor(citySize / 6);
      if (city.buildings && city.buildings.has(1)) rawScore--;
      break;

    case 17: // Adam Smith's Trading Co (0x38)
      // Score -= numCities / 4
      rawScore -= Math.floor(numCities / 4);
      break;

    case 18: // Darwin's Voyage (0x39)
      // Score -= 3 (very desirable)
      rawScore -= 3;
      break;

    case 19: // Statue of Liberty (0x3a)
      // Score based on tech 43 = Literacy (0x2B)
      if (civTechs && civTechs.has(43)) rawScore -= 2;
      else rawScore -= 1;
      break;

    case 20: // Eiffel Tower (0x3b)
      // Score adjusted by strongest civ + human check
      if (isHuman) {
        rawScore--;
        if (govtIdx > 3) rawScore -= 2;
      }
      {
        const strongestTechs = aiData?.techCount?.[strongestCiv] ?? 0;
        if (strongestTechs > 7 + ourTechs) rawScore--;
        if (aiData?.powerRank?.[civSlot] === 6) rawScore--;
      }
      break;

    case 21: // Women's Suffrage (0x3c)
      // Score based on personality: all positive → extra bonus
      rawScore--;
      if (tolerance >= 0 && expansionism >= 0 && militarism >= 0) rawScore--;
      // Spaceship bonus
      if (gameState.civs?.[civSlot]?.spaceshipStructural > 0) rawScore--;
      // High difficulty
      if (govtIdx > 4) rawScore--;
      if (govtIdx > 5) rawScore--;
      break;

    case 22: // Hoover Dam (0x3d)
      // Score based on continent city count
      rawScore -= Math.floor((cityCtx.numCities || 0) / 20);
      break;

    case 23: // Manhattan Project (0x3e)
      // Decompiled: complex spaceshipcheck + nuclear assessment
      // Only build early in space race or when military aggressive
      if (continentPosture !== 4) rawScore += 2; // penalty if not at war
      // Nuclear check: have we researched Rocketry (73)?
      if (!civTechs || !civTechs.has(73)) rawScore += 5; // big penalty
      break;

    case 24: // United Nations (0x3f)
      // Score -= expansionism + militarism*-2
      rawScore -= (expansionism + militarism * -2);
      if (aiData?.powerRank?.[civSlot] === 7) rawScore--;
      break;

    case 25: // Apollo Program (0x40)
      // Score -= expansionism*3 + militarism*-2
      rawScore -= (expansionism * 3 + militarism * -2);
      break;

    case 26: // SETI Program (0x41)
      // Score -= expansionism*2 + 2
      rawScore -= (expansionism * 2 + 2);
      break;

    case 27: // Cure for Cancer (0x42)
      // Score -= militarism + 2
      rawScore -= (militarism + 2);
      break;

    default:
      break;
  }

  // ── Obsolescence check ──
  // Decompiled: local_9c = thunk_FUN_00453da0(wonderIndex) — is wonder already obsolete?
  const obsAny = _isWonderObsoleteForAnyone(gameState, wonderIndex);
  if (obsAny) {
    rawScore = rawScore * 3 + aliveCivCount * 50;
  }

  // ── Wonder count penalty (decompiled: local_238 * 5) ──
  // Cities already building wonders get a penalty
  let otherWonderBuilders = 0;
  for (const c of gameState.cities) {
    if (!c || c.size <= 0 || c.owner !== civSlot) continue;
    const item = c.itemInProduction;
    if (item && item.type === 'wonder') otherWonderBuilders++;
  }
  rawScore += otherWonderBuilders * 5;

  // ── N.3: Wonder competition — compare shield investments with rival ──
  if (someoneElseBuilding) {
    // Find rival's shield investment and our own
    let rivalShields = 0;
    let rivalShieldRate = 0;
    let ourShields = 0;
    for (const c of gameState.cities) {
      if (!c || c.size <= 0) continue;
      const cItem = c.itemInProduction;
      if (!cItem || cItem.type !== 'wonder' || cItem.id !== wonderBuildId) continue;
      if (c.owner === civSlot) {
        ourShields = c.shieldsInBox || 0;
      } else {
        rivalShields = Math.max(rivalShields, c.shieldsInBox || 0);
        // Estimate rival production rate from city size
        rivalShieldRate = Math.max(rivalShieldRate, Math.floor(c.size * 0.7) + 1);
      }
    }
    const wonderCost = WONDER_COSTS[wonderIndex] || 200;
    const rivalProgress = rivalShields / wonderCost;   // 0..1
    const ourProgress = ourShields / wonderCost;        // 0..1
    if (rivalProgress > ourProgress + 0.2) {
      // Rival is significantly ahead — big penalty (lower priority)
      rawScore += 15 + Math.floor(rivalProgress * 10);
    } else if (ourProgress > rivalProgress + 0.1) {
      // We're ahead — boost priority (lower rawScore = better in decompiled convention)
      rawScore -= 5;
    } else {
      // Neck and neck — moderate penalty, urgency from competition
      rawScore += 5;
    }
  }

  // ── Currently building this wonder: stickiness bonus ──
  const thisItem = city.itemInProduction;
  if (thisItem && thisItem.type === 'wonder' && thisItem.id === wonderBuildId) {
    rawScore = Math.floor(rawScore / 2);
  }

  // ── Personality normalization ──
  // Decompiled: score = ((coastalMatch ? 10 : 20) * score * 3) / (expansionism + 3)
  const coastalMatch = (cityCtx.isCoastal ? 1 : 0) === coastalPref ? 1 : 0;
  const coastMul = coastalMatch ? 10 : 20;
  rawScore = Math.floor(coastMul * rawScore * 3 / (expansionism + 3));

  // Barracks bonus
  if (city.buildings && city.buildings.has(2)) {
    rawScore += Math.floor(rawScore / ((threatLevel >> 1) + 3));
  }
  // Palace bonus: if city has Palace and wonder is Shakespeare's (13)
  if (city.buildings && city.buildings.has(1)) {
    rawScore = rawScore - Math.floor(rawScore / 3);
  }

  // Shield progress: bonus for continuing current wonder build
  if (thisItem && thisItem.type === 'wonder' && thisItem.id === wonderBuildId) {
    const shields = city.shieldsInBox || 0;
    if (shields > 0) {
      // The more shields invested, the more we want to keep building
      rawScore = Math.floor(rawScore * (1 - shields / (WONDER_COSTS[wonderIndex] || 200)));
    }
  }

  // Invert: decompiled uses lower=better, we use higher=better
  // Wonder raw scores can range widely. Use 400 as ceiling.
  return Math.max(0, 400 - clamp(rawScore, 0, 400));
}

/**
 * Check if a wonder is obsolete for any alive civ.
 * Equivalent to decompiled FUN_00453da0.
 */
function _isWonderObsoleteForAnyone(gameState, wonderIndex) {
  const obsTech = WONDER_OBSOLETE[wonderIndex] ?? -1;
  if (obsTech < 0) return false;
  if (!gameState.civTechs) return false;
  for (let c = 0; c < 8; c++) {
    if (gameState.civTechs[c]?.has(obsTech)) return true;
  }
  return false;
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

  // Per-unit-type count on this continent (for unit scoring)
  const unitTypeCountOnCont = {};
  for (const u of gameState.units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    const ut = mapBase.tileData?.[u.gy * mapBase.mw + u.gx];
    if ((ut?.bodyId ?? -2) !== continentId) continue;
    unitTypeCountOnCont[u.type] = (unitTypeCountOnCont[u.type] || 0) + 1;
  }

  // Per-continent military strength evaluation (H.4b)
  // Compute our vs enemy military on this continent for production balance
  let contOurMilStrength = 0;
  let contEnemyMilStrength = 0;
  const cont = strategy?.aiData?.continents?.get(continentId);
  if (cont) {
    for (const [civ, count] of cont.militaryCounts) {
      if (civ === civSlot) {
        contOurMilStrength += count;
      } else if (civ !== 0) {
        contEnemyMilStrength += count;
      }
    }
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
    unitTypeCountOnCont,
    contOurMilStrength,
    contEnemyMilStrength,
  };
}

// ── Final production decision ─────────────────────────────────────

/**
 * Pick the best production item for a city from scored candidates.
 *
 * Ported from Civ2 FUN_00498e8b final decision logic (decompiled
 * lines 6052-6109). Compares the best building score, best unit score,
 * and best wonder score, applies personality modifiers and current
 * production stickiness, and returns the final production choice.
 *
 * The decompiled code returns a single integer:
 *   >= 0       → unit type ID
 *   -1         → Palace (building 1)
 *   -2         → Barracks (building 2)
 *   ...
 *   -38        → Capitalization (building 38)
 *   -39..-66   → Wonder (negate and subtract 39 for wonder index)
 *   99         → Capitalize (default/nothing useful)
 *
 * We return { type, id, score } compatible with CHANGE_PRODUCTION.
 *
 * @param {object} city - the city
 * @param {number} cityIndex - index in gameState.cities
 * @param {object} cityCtx - cached city context
 * @param {object} civTechs - civ's tech set
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @param {object} strategy
 * @returns {{ item: {type, id}, score: number } | null}
 */
function _finalProductionDecision(city, cityIndex, cityCtx, civTechs, gameState, mapBase, civSlot, strategy) {
  // ── Score ALL possible items ──
  let bestUnit = null;
  let bestUnitScore = -1;
  let bestBuilding = null;
  let bestBuildingScore = -1;
  let bestWonder = null;
  let bestWonderScore = -1;

  // Score all unit types
  for (let uid = 0; uid < NUM_UNIT_TYPES; uid++) {
    const s = scoreUnit(uid, city, cityCtx, civTechs, gameState, mapBase, civSlot, strategy);
    if (s > bestUnitScore) {
      bestUnitScore = s;
      bestUnit = { type: 'unit', id: uid };
    }
  }

  // Score all building types
  for (let bid = 1; bid < NUM_BUILDING_TYPES; bid++) {
    const s = scoreBuilding(bid, city, cityIndex, cityCtx, civTechs, gameState, mapBase, civSlot, strategy);
    if (s > bestBuildingScore) {
      bestBuildingScore = s;
      bestBuilding = { type: 'building', id: bid };
    }
  }

  // Score all wonders
  for (let wi = 0; wi < NUM_WONDERS; wi++) {
    const s = scoreWonder(wi, city, cityIndex, cityCtx, civTechs, gameState, mapBase, civSlot, strategy);
    if (s > bestWonderScore) {
      bestWonderScore = s;
      bestWonder = { type: 'wonder', id: wi + 39 };
    }
  }

  // ── Goal list integration (H.4a): boost unit scores based on active goals ──
  const goals = strategy?.goals;
  if (goals && bestUnit && bestUnitScore > 0) {
    const bestUnitRole = UNIT_ROLE[bestUnit.id] ?? 0;
    const bestUnitDomain = UNIT_DOMAIN[bestUnit.id] ?? 0;

    // Count unassigned goals by type to determine demand
    const attackGoals = goals.countType(GOAL_ATTACK_CITY);
    const defendGoals = goals.countType(GOAL_DEFEND_CITY);
    const reinforceGoals = goals.countType(GOAL_REINFORCE);
    const navalGoals = goals.countType(GOAL_NAVAL_ASSAULT);
    const transportGoals = goals.countType(GOAL_TRANSPORT);

    // Boost attack units when ATTACK_CITY goals exist
    if (bestUnitRole === 0 && bestUnitDomain === 0 && attackGoals > 0) {
      bestUnitScore = Math.floor(bestUnitScore * (1.0 + Math.min(attackGoals, 5) * 0.06));
    }

    // Boost defensive units when DEFEND_CITY or REINFORCE goals exist
    if (bestUnitRole === 1 && (defendGoals > 0 || reinforceGoals > 0)) {
      const defNeed = defendGoals + reinforceGoals;
      bestUnitScore = Math.floor(bestUnitScore * (1.0 + Math.min(defNeed, 5) * 0.08));
    }

    // Boost naval units when NAVAL_ASSAULT goals exist
    if (bestUnitDomain === 1 && (navalGoals > 0 || transportGoals > 0)) {
      bestUnitScore = Math.floor(bestUnitScore * 1.15);
    }

    // Boost transport when transport goals exist
    if (bestUnitRole === 5 && bestUnitDomain === 1 && transportGoals > 0) {
      bestUnitScore = Math.floor(bestUnitScore * 1.2);
    }

    // Per-continent military balance: if we're outnumbered on this city's
    // continent, boost military unit scores
    if ((bestUnitRole === 0 || bestUnitRole === 1) && bestUnitDomain === 0) {
      const contEnemy = cityCtx.contEnemyMilStrength || 0;
      const contOurs = cityCtx.contOurMilStrength || 0;
      if (contEnemy > 0 && contOurs < contEnemy * 1.5) {
        bestUnitScore = Math.floor(bestUnitScore * 1.1);
      }
    }
  }

  // ── Leader personality influences ──
  const leaderIdx = gameState.civs?.[civSlot]?.rulesCivNumber ?? 0;
  const personality = LEADER_PERSONALITY[leaderIdx] || [0, 0, 0];
  const expansionism = personality[0];
  const militarism = personality[1];
  const tolerance = personality[2] ?? 0;

  // ── Apply personality-based weighting ──
  // Militarist leaders prefer units, tolerant leaders prefer buildings/wonders
  // Decompiled: the final decision uses attribs flags and personality
  // to bias toward one category or another

  // Militarist bonus to unit scores
  if (militarism > 0) bestUnitScore = Math.floor(bestUnitScore * 1.15);
  if (militarism < 0) bestUnitScore = Math.floor(bestUnitScore * 0.9);

  // Civilized bonus to building/wonder scores
  if (tolerance > 0) {
    bestBuildingScore = Math.floor(bestBuildingScore * 1.1);
    bestWonderScore = Math.floor(bestWonderScore * 1.15);
  }
  if (tolerance < 0) {
    bestBuildingScore = Math.floor(bestBuildingScore * 0.9);
    bestWonderScore = Math.floor(bestWonderScore * 0.85);
  }

  // Expansionist bonus to settler scoring is already applied in scoreUnit

  // ── Settler priority override (ported from FUN_00498e8b lines 5695-5707) ──
  // The binary's DAT_006a6608 gatekeeper ensures settlers compete with wonders
  // in the early game. Without this, wonders (score 300-500) always beat
  // settlers (score 25-145), causing zero expansion.
  const settlerCount = cityCtx.settlerCount;
  const numCities = cityCtx.numCities;
  if (numCities < 4 && settlerCount === 0 && city.size > 1) {
    // Cap wonder scores at settler level when expansion is critical
    if (bestUnit && SETTLER_TYPES.has(bestUnit.id) && bestUnitScore > 0) {
      bestWonderScore = Math.min(bestWonderScore, bestUnitScore);
    }
  }

  // ── Food crisis: block settlers if city would starve ──
  // Ported from FUN_00498e8b line 5701: DAT_006a6608 <= local_220
  // The binary checks that food surplus can sustain a settler before allowing it.
  if (bestUnit && SETTLER_TYPES.has(bestUnit.id)) {
    const _fci = gameState.cities.indexOf(city);
    const actualSurplus = _fci >= 0
      ? estimateFoodSurplus(city, _fci, gameState, mapBase) : 0;
    if (actualSurplus <= 0 && city.size <= 3) {
      // City can't afford to lose pop — block settler, prefer granary
      bestUnitScore = -1;
      bestUnit = null;
    }
  }

  // ── Pick the overall best ──
  let bestItem = null;
  let bestScore = -1;

  if (bestUnitScore > bestScore) {
    bestScore = bestUnitScore;
    bestItem = bestUnit;
  }
  if (bestBuildingScore > bestScore) {
    bestScore = bestBuildingScore;
    bestItem = bestBuilding;
  }
  if (bestWonderScore > bestScore) {
    bestScore = bestWonderScore;
    bestItem = bestWonder;
  }

  // ── Current production stickiness ──
  // Ported from decompiled lines 6065-6108:
  // If the city is already building a wonder and has significant shields
  // invested, heavily bias toward continuing the wonder.
  const currentItem = city.itemInProduction;
  if (currentItem && currentItem.type === 'wonder') {
    const invested = city.shieldsInBox || 0;
    const totalCost = getProductionCost(currentItem);
    if (invested > 0 && totalCost > 0 && totalCost !== Infinity) {
      const progress = invested / totalCost;
      // Decompiled: if current production is a wonder and shields > 75% of cost,
      // continue building it unless the best alternative is overwhelmingly better
      if (progress > 0.25) {
        // Score the current wonder
        const wi = currentItem.id - 39;
        const currentWonderScore = scoreWonder(wi, city, cityIndex, cityCtx,
          civTechs, gameState, mapBase, civSlot, strategy);
        if (currentWonderScore > 0) {
          // Boost current wonder score by progress fraction
          const stickyScore = Math.floor(currentWonderScore * (1 + progress));
          if (stickyScore >= bestScore) {
            bestScore = stickyScore;
            bestItem = currentItem;
          }
        }
      }
    }
  }

  // ── Emergency defense override ──
  // A city with 0 defenders should always prioritize building a defensive unit,
  // regardless of whether enemies are nearby (lines 6019-6026 approximate conditions)
  if (cityCtx.defenders === 0) {
    const bestDefId = bestDefensiveUnit(civTechs, civSlot, cityIndex, gameState, mapBase);
    if (bestDefId >= 0) {
      const defScore = scoreUnit(bestDefId, city, cityCtx, civTechs,
        gameState, mapBase, civSlot, strategy);
      if (defScore > 0) {
        // Override: emergency defense gets top priority
        bestItem = { type: 'unit', id: bestDefId };
        bestScore = Math.max(bestScore, defScore + 50); // guaranteed override
      }
    }
  }

  // ── Fallback: if nothing scored positively, build best available unit ──
  // Decompiled: returns 99 (capitalize) when local_30 > 500
  if (!bestItem || bestScore <= 0) {
    // Try to find any buildable defensive unit
    const fallbackId = bestDefensiveUnit(civTechs, civSlot, cityIndex, gameState, mapBase);
    if (fallbackId >= 0) {
      return { item: { type: 'unit', id: fallbackId }, score: 1 };
    }
    // Last resort: Warriors
    if (canBuildUnit(civTechs, 2, civSlot, cityIndex, gameState, mapBase)) {
      return { item: { type: 'unit', id: 2 }, score: 1 };
    }
    return null;
  }

  return { item: bestItem, score: bestScore };
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

    // ── Use _finalProductionDecision to pick the best item ──
    const decision = _finalProductionDecision(
      city, ci, cityCtx, civTechs, gameState, mapBase, civSlot, strat);

    // Nothing scored positively — skip
    if (!decision) continue;
    const { item: bestItem, score: bestScore } = decision;

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

    const totalCost = getProductionCost(item);
    if (totalCost === Infinity) continue;

    const shieldsStored = city.shieldsInBox || 0;

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
      const ourShieldsPerTurn = estimateCityShields(city, ci, gameState, mapBase);
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

// ═══════════════════════════════════════════════════════════════════
// H.4c: Sell obsolete buildings
// ═══════════════════════════════════════════════════════════════════

/**
 * Obsolete building replacement table.
 * Key = old building ID, value = array of replacement building IDs.
 * When a city has the old building AND at least one replacement, sell the old.
 *
 * From Civ2 city processing — buildings that become redundant:
 *   - Power Plant (19) → obsolete if city has Hydro (20), Nuclear (21), or Solar (29)
 */
const OBSOLETE_BUILDING_PAIRS = [
  [19, [20, 21, 29]], // Power Plant → Hydro/Nuclear/Solar
];

/**
 * N.5: Tech-based building obsolescence.
 * Key = building ID, value = tech ID that makes it obsolete.
 *   - Barracks (2) → obsolete when civ has Mobile Warfare (tech 53)
 */
const OBSOLETE_BUILDING_TECHS = [
  [2, 53], // Barracks → Mobile Warfare
];

/**
 * N.5: Wonder-based building obsolescence.
 * Key = building ID, value = wonder index whose effect replaces the building.
 *   - Granary (3) → obsolete when Pyramids (wonder 0) active for civ
 *   - City Walls (8) → obsolete when Great Wall (wonder 6) active for civ
 */
const OBSOLETE_BUILDING_WONDERS = [
  [3, 0],  // Granary → Pyramids (free Granary effect)
  [8, 6],  // City Walls → Great Wall (free City Walls effect)
];

/**
 * Generate SELL_BUILDING actions for buildings that are obsolete because
 * a superior replacement exists in the same city, a tech makes them
 * redundant, or a wonder provides their effect for free.
 *
 * Only sells one building per city per turn (game rule).
 *
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @param {Array<string>|null} [debugLog=null]
 * @returns {Array<object>} SELL_BUILDING actions
 */
export function generateSellObsoleteActions(gameState, mapBase, civSlot, debugLog = null) {
  const actions = [];
  const civTechs = gameState.civTechs?.[civSlot];

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0 || city.owner !== civSlot) continue;
    if (!city.buildings || city.buildings.size === 0) continue;

    let sold = false;

    // ── Check building-replacement pairs ──
    if (!sold) {
      for (const [oldId, replacements] of OBSOLETE_BUILDING_PAIRS) {
        if (!city.buildings.has(oldId)) continue;
        const hasReplacement = replacements.some(rid => city.buildings.has(rid));
        if (!hasReplacement) continue;

        const action = { type: 'SELL_BUILDING', cityIndex: ci, buildingId: oldId };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) {
          actions.push(action);
          if (debugLog) {
            const oldName = IMPROVE_NAMES[oldId] || `bldg#${oldId}`;
            debugLog.push(`SELL: ${city.name}: selling obsolete ${oldName} (replaced)`);
          }
          sold = true;
          break;
        }
      }
    }

    // ── N.5: Check tech-based obsolescence ──
    if (!sold && civTechs) {
      for (const [bldgId, techId] of OBSOLETE_BUILDING_TECHS) {
        if (!city.buildings.has(bldgId)) continue;
        if (!civTechs.has(techId)) continue;

        const action = { type: 'SELL_BUILDING', cityIndex: ci, buildingId: bldgId };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) {
          actions.push(action);
          if (debugLog) {
            const bName = IMPROVE_NAMES[bldgId] || `bldg#${bldgId}`;
            debugLog.push(`SELL: ${city.name}: selling ${bName} (tech obsolete)`);
          }
          sold = true;
          break;
        }
      }
    }

    // ── N.5: Check wonder-based obsolescence ──
    if (!sold) {
      for (const [bldgId, wonderIdx] of OBSOLETE_BUILDING_WONDERS) {
        if (!city.buildings.has(bldgId)) continue;
        if (!hasWonderEffect(gameState, civSlot, wonderIdx)) continue;

        const action = { type: 'SELL_BUILDING', cityIndex: ci, buildingId: bldgId };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) {
          actions.push(action);
          if (debugLog) {
            const bName = IMPROVE_NAMES[bldgId] || `bldg#${bldgId}`;
            const wName = WONDER_NAMES[wonderIdx] || `wonder#${wonderIdx}`;
            debugLog.push(`SELL: ${city.name}: selling ${bName} (${wName} active)`);
          }
          sold = true;
          break;
        }
      }
    }

    // ── N.5: Check zero-benefit buildings (maintenance > 0 with no effect) ──
    // Sell buildings whose benefit is zero: Coastal Fortress (28) if no sea tiles,
    // Harbor (14) if not coastal, SAM Battery (12) if no air threat.
    // Keep this conservative — only sell clearly useless buildings.
    if (!sold) {
      // Coastal Fortress (28): useless for landlocked cities
      if (city.buildings.has(28)) {
        const tile = mapBase.tileData?.[city.gy * mapBase.mw + city.gx];
        const isCoastal = tile?.flags?.river || false; // approximate; check adjacent sea
        let hasAdjacentSea = false;
        const dirs = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
        for (const [ddx, ddy] of dirs) {
          const nx = (city.gx + ddx + mapBase.mw) % mapBase.mw;
          const ny = city.gy + ddy;
          if (ny < 0 || ny >= mapBase.mh) continue;
          const nt = mapBase.tileData?.[ny * mapBase.mw + nx];
          if (nt && nt.terrain === 10) { // terrain 10 = Ocean
            hasAdjacentSea = true;
            break;
          }
        }
        if (!hasAdjacentSea) {
          const action = { type: 'SELL_BUILDING', cityIndex: ci, buildingId: 28 };
          const err = validateAction(gameState, mapBase, action, civSlot);
          if (!err) {
            actions.push(action);
            if (debugLog) debugLog.push(`SELL: ${city.name}: selling Coastal Fortress (landlocked)`);
            sold = true;
          }
        }
      }
    }
  }

  return actions;
}
