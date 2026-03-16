// ═══════════════════════════════════════════════════════════════════
// ai/index.js — AI player controller (full FUN_0053184D port)
//
// Called by the server during AI civ turns. Returns an array of
// actions to apply before END_TURN.
//
// Binary phases (from FUN_0053184D, 14,665 bytes):
//   P0. Anti-nuke defense — prioritize SDI if enemies have nukes
//   P1. Era quarter counting — track tech progression
//   P2. Terraform goal counting per continent
//   P3. Unit classification — role classify, cancel stale GOTO, ZOC wait
//   P4. City processing — defense/attack goals, wonder counting
//   P5. Continent threat assessment — 5-level system
//   P6. Unit redistribution — move units from safe to threatened continents
//   P7. Unit-to-goal matching — reverse iterate, priority / (distance + 1)
//   P8. City cleanup — clear peace flags, compute production goals
//
// Then existing AI modules:
//   Research & economy, Diplomacy, City production, Settler/Worker,
//   Military unit AI, Goal cleanup, Movement cleanup
// ═══════════════════════════════════════════════════════════════════

import { assessStrategy } from './strategyai.js';
import { generateEconActions } from './econai.js';
import { generateDiplomacyActions } from './diplomai.js';
import { generateProductionActions, generateRushBuyActions, generateSellObsoleteActions } from './prodai.js';
import { generateSettlerActions } from './cityai.js';
import { generateMilitaryActions, generateCleanupActions } from './unitai.js';
import { generateBarbarianActions } from './barbarian.js';
import {
  GoalList,
  GOAL_ATTACK_CITY, GOAL_DEFEND_CITY, GOAL_NAVAL_ASSAULT,
  GOAL_REINFORCE, GOAL_EXPLORE, GOAL_TRANSPORT,
  GOAL_BUILD_ROAD, GOAL_NONE,
} from './goals.js';
import {
  UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_ROLE,
  SETTLER_TYPES,
} from '../defs.js';
import { hasWonderEffect } from './data.js';

// ── Goal list storage per civ slot ────────────────────────────────
// Persisted between turns via module-level map. Each civ gets its own.
const _civGoals = new Map();

/**
 * Get or create the GoalList for a civ.
 * @param {number} civSlot
 * @returns {GoalList}
 */
function getGoalList(civSlot) {
  let gl = _civGoals.get(civSlot);
  if (!gl) {
    gl = new GoalList();
    _civGoals.set(civSlot, gl);
  }
  return gl;
}

// ── Treaty helper ─────────────────────────────────────────────────
function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

function hasContact(gameState, civA, civB) {
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties?.[key] !== undefined;
}

function isAtWar(gameState, civA, civB) {
  return getTreaty(gameState, civA, civB) === 'war' && hasContact(gameState, civA, civB);
}

// ── Tile distance (isometric doubled-X) ───────────────────────────
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

// ── Check if a city has a building ────────────────────────────────
function cityHasBuilding(city, buildingId) {
  return city.buildings ? city.buildings.has(buildingId) : false;
}

// ═══════════════════════════════════════════════════════════════════
// P0: Anti-nuke defense
//
// Ported from FUN_0053184D phase 0: if any enemy civ has nuclear
// missile units (type 45) and we don't have SDI Defense (building 17)
// in our cities, mark SDI as a priority build. Implemented as a
// flag on the strategy object that prodai.js can read.
// ═══════════════════════════════════════════════════════════════════

function phaseAntiNukeDefense(gameState, civSlot, strategy, debugLog) {
  const aiData = strategy.aiData;
  if (!aiData) return;

  // Check if any enemy civ has nuclear missiles
  let enemyHasNukes = false;
  for (const u of gameState.units) {
    if (u.gx < 0) continue;
    if (u.owner === civSlot || u.owner === 0) continue;
    if (u.type === 45) { // Nuclear Missile
      if (isAtWar(gameState, civSlot, u.owner)) {
        enemyHasNukes = true;
        break;
      }
    }
  }

  if (!enemyHasNukes) {
    strategy.needsSDI = false;
    return;
  }

  // Count our cities without SDI Defense (building 17)
  let citiesWithoutSDI = 0;
  let totalCities = 0;
  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner !== civSlot) continue;
    totalCities++;
    if (!cityHasBuilding(city, 17)) {
      citiesWithoutSDI++;
    }
  }

  strategy.needsSDI = citiesWithoutSDI > 0;

  // Check if we have The Laser tech (prereq for SDI, tech 41)
  const hasTech41 = gameState.civTechs?.[civSlot]?.has(41) ?? false;
  strategy.canBuildSDI = hasTech41;

  if (debugLog && strategy.needsSDI) {
    debugLog.push(`P0-NUKE: enemy has nukes, ${citiesWithoutSDI}/${totalCities} cities need SDI Defense${hasTech41 ? '' : ' (need The Laser tech)'}`);
  }
}

// ═══════════════════════════════════════════════════════════════════
// P1: Era quarter counting
//
// Track tech progression using eraQuarters from data.js. Determines
// which "era" the AI is in (ancient, renaissance, industrial, modern)
// and sets strategy flags that affect production priority.
// ═══════════════════════════════════════════════════════════════════

function phaseEraQuarterCounting(gameState, civSlot, strategy, debugLog) {
  const aiData = strategy.aiData;
  if (!aiData || !aiData.eraQuarters) return;

  const quarters = aiData.eraQuarters[civSlot] || [0, 0, 0, 0];
  const totalTechs = quarters[0] + quarters[1] + quarters[2] + quarters[3];

  // Determine dominant era: which era has the most techs
  let dominantEra = 0;
  let maxCount = quarters[0];
  for (let e = 1; e <= 3; e++) {
    if (quarters[e] > maxCount) {
      maxCount = quarters[e];
      dominantEra = e;
    }
  }

  // Effective era: weighted toward later eras if we have any modern tech
  // Binary uses this to adjust AI aggression and build priorities
  let effectiveEra = dominantEra;
  if (quarters[3] >= 3) effectiveEra = 3;        // some modern techs → modern era
  else if (quarters[2] >= 5) effectiveEra = 2;    // industrial threshold
  else if (quarters[1] >= 5) effectiveEra = 1;    // renaissance threshold

  strategy.eraQuarters = quarters;
  strategy.dominantEra = dominantEra;
  strategy.effectiveEra = effectiveEra;
  strategy.totalTechs = totalTechs;

  // Compare with other civs: are we behind/ahead on era progression?
  let civsAhead = 0;
  let civsBehind = 0;
  for (let c = 1; c < 8; c++) {
    if (c === civSlot) continue;
    if (!(aiData.civsAlive & (1 << c))) continue;
    const otherQ = aiData.eraQuarters[c] || [0, 0, 0, 0];
    const otherTotal = otherQ[0] + otherQ[1] + otherQ[2] + otherQ[3];
    if (otherTotal > totalTechs + 3) civsAhead++;
    else if (otherTotal < totalTechs - 3) civsBehind++;
  }

  strategy.techLeadStatus = civsAhead > civsBehind ? 'behind' :
                            civsBehind > civsAhead ? 'ahead' : 'even';

  if (debugLog) {
    debugLog.push(`P1-ERA: era=${effectiveEra} techs=[${quarters}] total=${totalTechs} lead=${strategy.techLeadStatus}`);
  }
}

// ═══════════════════════════════════════════════════════════════════
// P2: Terraform goal counting per continent
//
// Scan each continent for terraforming opportunities: tiles that
// lack roads, irrigation, or mines near our cities. Set goal
// priorities so settler/engineer AI can pick them up.
// ═══════════════════════════════════════════════════════════════════

function phaseTerraformGoalCounting(gameState, mapBase, civSlot, strategy, goals, debugLog) {
  const aiData = strategy.aiData;
  if (!aiData || !aiData.continents) return;

  const mw = mapBase.mw;
  let terraformGoalsAdded = 0;

  // For each continent where we have cities, count improvable tiles
  for (const [bodyId, cont] of aiData.continents) {
    if (bodyId <= 0) continue;
    const ourCities = cont.cityCounts.get(civSlot) || 0;
    if (ourCities === 0) continue;

    // Count settlers/engineers on this continent
    const ourSettlers = cont.settlerCount.get(civSlot) || 0;

    // Find our cities on this continent and check surrounding tiles
    for (const city of gameState.cities) {
      if (!city || city.size <= 0 || city.gx < 0) continue;
      if (city.owner !== civSlot) continue;
      const cIdx = city.gy * mw + city.gx;
      const cTile = mapBase.tileData?.[cIdx];
      if (!cTile || (cTile.bodyId ?? 0) !== bodyId) continue;

      // Check city radius tiles (fat cross, radius ~2) for unimproved land
      let unimprovedCount = 0;
      const neighbors = mapBase.getCityRadius ?
        mapBase.getCityRadius(city.gx, city.gy) :
        _getCityRadiusFallback(city.gx, city.gy, mapBase);

      for (const [tx, ty] of neighbors) {
        if (ty < 0 || ty >= mapBase.mh) continue;
        const wtx = ((tx % mw) + mw) % mw;
        const tIdx = ty * mw + wtx;
        const tile = mapBase.tileData?.[tIdx];
        if (!tile) continue;
        if ((tile.bodyId ?? 0) !== bodyId) continue;

        const terrain = mapBase.getTerrain(wtx, ty);
        if (terrain === 10) continue; // ocean

        const improvements = tile.improvements || {};
        // Count tiles that need roads or irrigation
        if (!improvements.road && terrain !== 5) { // not mountains
          unimprovedCount++;
        }
        if (!improvements.irrigation && terrain !== 5 && terrain !== 3 && terrain !== 4) {
          // Grassland, plains, desert can be irrigated (not forest, hills, mountains)
          unimprovedCount++;
        }
      }

      // Add BUILD_ROAD goals near cities with many unimproved tiles
      // Priority scales with how many tiles need work vs settlers available
      if (unimprovedCount > 2 && ourSettlers > 0) {
        const priority = Math.min(120, Math.floor(30 + unimprovedCount * 5));
        goals.addTacticalGoal(GOAL_BUILD_ROAD, priority, city.gx, city.gy);
        terraformGoalsAdded++;
      }
    }
  }

  strategy.terraformGoalsAdded = terraformGoalsAdded;

  if (debugLog && terraformGoalsAdded > 0) {
    debugLog.push(`P2-TERRAFORM: ${terraformGoalsAdded} terraform goals added`);
  }
}

/**
 * Fallback city radius computation when mapBase.getCityRadius doesn't exist.
 * Returns array of [gx, gy] for the 21-tile fat cross around a city.
 */
function _getCityRadiusFallback(cgx, cgy, mapBase) {
  const tiles = [];
  // Civ2 city radius: 2 rows above/below, offset by parity
  for (let dy = -2; dy <= 2; dy++) {
    const rowY = cgy + dy;
    // The number of tiles per row in the fat cross
    let xRange;
    if (dy === 0) xRange = 2;
    else if (Math.abs(dy) === 1) xRange = 2;
    else xRange = 1;

    for (let dx = -xRange; dx <= xRange; dx++) {
      // Isometric offset: odd rows are shifted
      const parity = ((cgy % 2) + 2) % 2;
      const tileGx = cgx + dx;
      const tileGy = rowY;
      if (tileGx === cgx && tileGy === cgy) continue; // skip city center
      tiles.push([tileGx, tileGy]);
    }
  }
  return tiles;
}

// ═══════════════════════════════════════════════════════════════════
// P3: Unit classification
//
// Classify all our units by role. Cancel stale GOTO orders for
// units that have been stuck. Handle ZOC-based AI_WAIT logic.
// Sets up bookkeeping arrays used by later phases.
// ═══════════════════════════════════════════════════════════════════

function phaseUnitClassification(gameState, mapBase, civSlot, strategy, debugLog) {
  const units = gameState.units;
  const aiData = strategy.aiData;
  const mw = mapBase.mw;

  // Classify units by role and domain
  const unitsByRole = new Map(); // role → [unitIndex]
  const unitsByDomain = [[], [], []]; // domain 0=ground, 1=air, 2=sea
  const settlerUnits = [];
  let cancelledGotos = 0;
  let zocWaitCount = 0;

  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (u.gx < 0 || u.owner !== civSlot) continue;

    const role = UNIT_ROLE[u.type] ?? 0;
    const domain = UNIT_DOMAIN[u.type] ?? 0;

    // Track by role
    if (!unitsByRole.has(role)) unitsByRole.set(role, []);
    unitsByRole.get(role).push(i);

    // Track by domain
    if (domain >= 0 && domain <= 2) unitsByDomain[domain].push(i);

    // Track settlers
    if (SETTLER_TYPES.has(u.type)) {
      settlerUnits.push(i);
    }

    // Cancel stale GOTO orders:
    // If a unit has been on GOTO for > 0 turns and hasn't moved (same tile),
    // or if GOTO target is unreachable, cancel the order
    if (u.orders === 'goto' && u.goToX != null && u.goToY != null) {
      // Check if unit is at its GOTO target already
      if (u.gx === u.goToX && u.gy === u.goToY) {
        // Arrived at target — clear goto (the action phases will decide what to do)
        cancelledGotos++;
        // We don't emit an action here — the unit will be picked up by military AI
        // with fresh orders. The flag is informational.
      }
      // Check if GOTO target is on a different domain (land unit going to ocean, etc.)
      else {
        const targetIdx = u.goToY * mw + ((u.goToX % mw + mw) % mw);
        const targetTile = mapBase.tileData?.[targetIdx];
        if (targetTile) {
          const targetTerrain = mapBase.getTerrain(((u.goToX % mw + mw) % mw), u.goToY);
          if (domain === 0 && targetTerrain === 10) {
            // Land unit with ocean target — stale
            cancelledGotos++;
          } else if (domain === 2 && targetTerrain !== 10) {
            // Sea unit with land target (OK for coastal cities, but check)
            const hasCity = gameState.cities.some(c =>
              c.gx === u.goToX && c.gy === u.goToY && c.size > 0);
            if (!hasCity) cancelledGotos++;
          }
        }
      }
    }

    // ZOC-based AI_WAIT:
    // If a land unit is stuck between enemy ZOC tiles and has no good move,
    // it should wait (skip this turn) rather than making a bad move.
    // This is tracked but not acted on here — the military AI handles it.
    if (domain === 0 && u.movesLeft > 0 && !SETTLER_TYPES.has(u.type)) {
      // Simple ZOC stuck detection: count adjacent enemy combat units
      const neighbors = mapBase.getNeighbors(u.gx, u.gy);
      let adjacentEnemies = 0;
      for (const dir in neighbors) {
        const [nx, ny] = neighbors[dir];
        if (ny < 0 || ny >= mapBase.mh) continue;
        const wnx = ((nx % mw) + mw) % mw;
        // Quick check: any enemy combat unit adjacent
        for (const other of units) {
          if (other.gx === wnx && other.gy === ny && other.owner !== civSlot &&
              other.owner !== 0 && other.gx >= 0 &&
              (UNIT_ATK[other.type] || 0) > 0) {
            if (isAtWar(gameState, civSlot, other.owner)) {
              adjacentEnemies++;
              break;
            }
          }
        }
      }
      if (adjacentEnemies >= 3) {
        zocWaitCount++;
      }
    }
  }

  strategy.unitsByRole = unitsByRole;
  strategy.unitsByDomain = unitsByDomain;
  strategy.settlerUnits = settlerUnits;
  strategy.cancelledGotos = cancelledGotos;
  strategy.zocWaitCount = zocWaitCount;

  if (debugLog) {
    const roleCounts = [];
    for (const [role, idxs] of unitsByRole) {
      roleCounts.push(`r${role}=${idxs.length}`);
    }
    debugLog.push(`P3-CLASSIFY: ${roleCounts.join(' ')} settlers=${settlerUnits.length} staleGoto=${cancelledGotos} zocWait=${zocWaitCount}`);
  }
}

// ═══════════════════════════════════════════════════════════════════
// P4: City processing
//
// Per-continent population counting, wonder counting. Add defense
// goals at our cities and attack goals at enemy cities (with bonus
// priority for cities without City Walls).
// ═══════════════════════════════════════════════════════════════════

function phaseCityProcessing(gameState, mapBase, civSlot, strategy, goals, debugLog) {
  const aiData = strategy.aiData;
  if (!aiData || !aiData.continents) return;

  const mw = mapBase.mw;
  let defenseGoals = 0;
  let attackGoals = 0;

  // Track wonders owned by civ
  const wondersOwned = [];
  if (gameState.wonders) {
    for (let w = 0; w < gameState.wonders.length; w++) {
      if (hasWonderEffect(gameState, civSlot, w)) {
        wondersOwned.push(w);
      }
    }
  }
  strategy.wondersOwned = wondersOwned;

  // Per-continent processing
  for (const [bodyId, cont] of aiData.continents) {
    if (bodyId <= 0) continue;

    const ourCities = cont.cityCounts.get(civSlot) || 0;
    const ourPop = cont.cityPop.get(civSlot) || 0;
    const ourMil = cont.militaryCounts.get(civSlot) || 0;

    // Sum enemy stats on this continent
    let enemyMil = 0;
    let enemyCities = 0;
    let enemyAtk = 0;
    for (const [civ, count] of cont.militaryCounts) {
      if (civ === civSlot || civ === 0) continue;
      if (isAtWar(gameState, civSlot, civ)) {
        enemyMil += count;
        enemyAtk += cont.attackStrength.get(civ) || 0;
      }
    }
    for (const [civ, count] of cont.cityCounts) {
      if (civ === civSlot || civ === 0) continue;
      if (isAtWar(gameState, civSlot, civ)) {
        enemyCities += count;
      }
    }

    // ── Defense goals at our cities ──
    if (ourCities > 0) {
      for (const city of gameState.cities) {
        if (!city || city.size <= 0 || city.gx < 0) continue;
        if (city.owner !== civSlot) continue;
        const idx = city.gy * mw + city.gx;
        const tile = mapBase.tileData?.[idx];
        if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;

        // Base defense priority: scales with city size and threat
        let priority = 40 + city.size * 3;

        // Boost for cities with wonders
        const cityWonders = gameState.wonders?.filter(w =>
          w && w.cityIndex != null && gameState.cities[w.cityIndex] === city && !w.destroyed
        ).length || 0;
        if (cityWonders > 0) priority += 30;

        // Boost if enemies are on this continent
        if (enemyMil > 0) {
          const threatRatio = enemyMil / Math.max(ourMil, 1);
          priority += Math.floor(threatRatio * 30);
        }

        // Boost for capital (has Palace, building 1)
        if (cityHasBuilding(city, 1)) priority += 20;

        priority = Math.min(255, priority);
        goals.addTacticalGoal(GOAL_DEFEND_CITY, priority, city.gx, city.gy);
        defenseGoals++;
      }
    }

    // ── Attack goals at enemy cities ──
    if (enemyCities > 0 && (ourMil > 0 || ourCities > 0)) {
      for (const city of gameState.cities) {
        if (!city || city.size <= 0 || city.gx < 0) continue;
        if (city.owner === civSlot || city.owner === 0) continue;
        if (!isAtWar(gameState, civSlot, city.owner)) continue;

        const idx = city.gy * mw + city.gx;
        const tile = mapBase.tileData?.[idx];
        if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;

        // Base attack priority
        const advRatio = ourMil / Math.max(enemyMil, 1);
        let priority = Math.floor(50 + advRatio * 25 + city.size * 4);

        // Bonus for cities WITHOUT City Walls (building 8) — easier to take
        if (!cityHasBuilding(city, 8)) {
          priority += 25;
        }

        // Bonus for cities without defenders (very attractive target)
        const defendersHere = gameState.units.filter(u =>
          u.gx === city.gx && u.gy === city.gy && u.owner === city.owner &&
          u.gx >= 0 && (UNIT_DEF[u.type] || 0) > 0
        ).length;
        if (defendersHere === 0) priority += 30;

        priority = Math.min(255, priority);
        goals.addTacticalGoal(GOAL_ATTACK_CITY, priority, city.gx, city.gy);
        attackGoals++;
      }
    }

    // ── REINFORCE goals if outnumbered ──
    if (ourCities > 0 && enemyMil > ourMil * 1.5) {
      let bestCity = null;
      let bestSize = 0;
      for (const city of gameState.cities) {
        if (!city || city.size <= 0 || city.gx < 0 || city.owner !== civSlot) continue;
        const idx = city.gy * mw + city.gx;
        const tile = mapBase.tileData?.[idx];
        if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;
        if (city.size > bestSize) {
          bestSize = city.size;
          bestCity = city;
        }
      }
      if (bestCity) {
        const threatRatio = enemyMil / Math.max(ourMil, 1);
        const priority = Math.min(255, Math.floor(100 + threatRatio * 20));
        goals.addStrategicGoal(GOAL_REINFORCE, priority, bestCity.gx, bestCity.gy);
      }
    }

    // ── NAVAL_ASSAULT goals for enemy cities on other continents ──
    if (ourCities > 0 && enemyCities === 0 && ourMil >= 3) {
      for (const city of gameState.cities) {
        if (!city || city.size <= 0 || city.gx < 0) continue;
        if (city.owner === civSlot || city.owner === 0) continue;
        if (!isAtWar(gameState, civSlot, city.owner)) continue;

        const cIdx = city.gy * mw + city.gx;
        const cTile = mapBase.tileData?.[cIdx];
        if (!cTile || (cTile.bodyId ?? 0) === bodyId) continue;

        // Check if city is coastal
        const neighbors = mapBase.getNeighbors(city.gx, city.gy);
        let isCoastal = false;
        for (const dir in neighbors) {
          const [nx, ny] = neighbors[dir];
          if (ny < 0 || ny >= mapBase.mh) continue;
          const wnx = ((nx % mw) + mw) % mw;
          if (mapBase.getTerrain(wnx, ny) === 10) { isCoastal = true; break; }
        }
        if (!isCoastal) continue;

        const priority = Math.min(200, Math.floor(40 + city.size * 3));
        goals.addStrategicGoal(GOAL_NAVAL_ASSAULT, priority, city.gx, city.gy);
      }
    }
  }

  // ── EXPLORE goals for continents with units but no cities ──
  for (const [bodyId, cont] of aiData.continents) {
    if (bodyId <= 0) continue;
    const ourCities = cont.cityCounts.get(civSlot) || 0;
    const ourMil = cont.militaryCounts.get(civSlot) || 0;
    if (ourMil > 0 && ourCities === 0) {
      goals.addTacticalGoal(GOAL_EXPLORE, 40, -1, bodyId);
    }
  }

  if (debugLog) {
    debugLog.push(`P4-CITIES: ${defenseGoals} defend, ${attackGoals} attack goals, ${wondersOwned.length} wonders owned`);
  }
}

// ═══════════════════════════════════════════════════════════════════
// P5: Continent threat assessment — 5-level system
//
// Uses continentFlags from data.js to classify each continent:
//   Level 5 (HOSTILE):   enemy military + enemy cities (0x01 | 0x02)
//   Level 4 (CONTESTED): enemy military only           (0x02 only)
//   Level 3 (FRONTIER):  enemy cities only              (0x01 only)
//   Level 2 (EXPANSION): at-peace cities present        (0x04)
//   Level 1 (SAFE):      nothing hostile                (no flags)
//
// Higher levels get more defensive/offensive attention.
// ═══════════════════════════════════════════════════════════════════

const THREAT_SAFE       = 1;
const THREAT_EXPANSION  = 2;
const THREAT_FRONTIER   = 3;
const THREAT_CONTESTED  = 4;
const THREAT_HOSTILE    = 5;

function phaseContinentThreatAssessment(gameState, mapBase, civSlot, strategy, goals, debugLog) {
  const aiData = strategy.aiData;
  if (!aiData || !aiData.continentFlags) return;

  const flags = aiData.continentFlags[civSlot];
  if (!flags) return;

  // Classify each continent by threat level
  const continentThreats = new Map(); // bodyId → threat level (1-5)

  for (const [bodyId, cont] of aiData.continents) {
    if (bodyId <= 0) continue;

    const f = flags.get(bodyId) || 0;
    let level = THREAT_SAFE;

    if ((f & 0x01) && (f & 0x02)) {
      level = THREAT_HOSTILE;     // enemy cities + enemy military
    } else if (f & 0x02) {
      level = THREAT_CONTESTED;   // enemy military only (raiding party)
    } else if (f & 0x01) {
      level = THREAT_FRONTIER;    // enemy cities only (no military yet)
    } else if (f & 0x04) {
      level = THREAT_EXPANSION;   // at-peace cities present
    }

    continentThreats.set(bodyId, level);

    // Strong threat flag: enemy attack strength exceeds ours
    if (f & 0x10) {
      // Mark as especially dangerous — boost defense goals
      const ourCities = cont.cityCounts.get(civSlot) || 0;
      if (ourCities > 0) {
        for (const city of gameState.cities) {
          if (!city || city.size <= 0 || city.gx < 0 || city.owner !== civSlot) continue;
          const idx = city.gy * mapBase.mw + city.gx;
          const tile = mapBase.tileData?.[idx];
          if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;

          // Boost existing defense goals by 30 for strong-threat continents
          const existing = goals.findMaxGoalPriority(g =>
            g.goalType === GOAL_DEFEND_CITY &&
            g.targetGx === city.gx && g.targetGy === city.gy
          );
          if (existing) {
            existing.goal.priority = Math.min(255, existing.goal.priority + 30);
          }
        }
      }
    }
  }

  strategy.continentThreats = continentThreats;

  if (debugLog) {
    const NAMES = ['?', 'SAFE', 'EXPANSION', 'FRONTIER', 'CONTESTED', 'HOSTILE'];
    const summary = [];
    for (const [bodyId, level] of continentThreats) {
      if (level > THREAT_SAFE) {
        summary.push(`body${bodyId}=${NAMES[level]}`);
      }
    }
    if (summary.length > 0) {
      debugLog.push(`P5-THREATS: ${summary.join(' ')}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// P6: Unit redistribution
//
// Move units from safe continents to threatened ones. Creates
// TRANSPORT goals at coastal cities on safe continents, pointing
// toward the most threatened continent's coastal cities. Units
// on safe continents with no threats will be assigned transport
// pickup points for redistribution.
// ═══════════════════════════════════════════════════════════════════

function phaseUnitRedistribution(gameState, mapBase, civSlot, strategy, goals, debugLog) {
  const continentThreats = strategy.continentThreats;
  const aiData = strategy.aiData;
  if (!continentThreats || !aiData) return;

  const mw = mapBase.mw;

  // Find the most threatened continent that has our cities
  let mostThreatenedBody = -1;
  let maxThreat = THREAT_SAFE;
  for (const [bodyId, level] of continentThreats) {
    if (level <= THREAT_SAFE) continue;
    const cont = aiData.continents.get(bodyId);
    if (!cont) continue;
    const ourCities = cont.cityCounts.get(civSlot) || 0;
    if (ourCities === 0) continue;
    if (level > maxThreat) {
      maxThreat = level;
      mostThreatenedBody = bodyId;
    }
  }

  if (mostThreatenedBody < 0 || maxThreat <= THREAT_EXPANSION) return;

  // Find safe continents with excess military units
  let redistributed = 0;

  for (const [bodyId, level] of continentThreats) {
    if (level > THREAT_EXPANSION) continue; // not safe enough
    const cont = aiData.continents.get(bodyId);
    if (!cont) continue;

    const ourMil = cont.militaryCounts.get(civSlot) || 0;
    const ourCities = cont.cityCounts.get(civSlot) || 0;

    // Need at least 1 defender per city + excess for redistribution
    const excessUnits = ourMil - ourCities;
    if (excessUnits <= 0) continue;

    // Find a coastal city on this safe continent for pickup
    let pickupCity = null;
    for (const city of gameState.cities) {
      if (!city || city.size <= 0 || city.gx < 0 || city.owner !== civSlot) continue;
      const idx = city.gy * mw + city.gx;
      const tile = mapBase.tileData?.[idx];
      if (!tile || (tile.bodyId ?? 0) !== bodyId) continue;

      // Check if coastal
      const neighbors = mapBase.getNeighbors(city.gx, city.gy);
      for (const dir in neighbors) {
        const [nx, ny] = neighbors[dir];
        if (ny < 0 || ny >= mapBase.mh) continue;
        const wnx = ((nx % mw) + mw) % mw;
        if (mapBase.getTerrain(wnx, ny) === 10) {
          pickupCity = city;
          break;
        }
      }
      if (pickupCity) break;
    }

    if (pickupCity) {
      // Create a TRANSPORT goal at the pickup city
      const priority = Math.min(200, Math.floor(60 + maxThreat * 20));
      goals.addStrategicGoal(GOAL_TRANSPORT, priority, pickupCity.gx, pickupCity.gy);
      redistributed++;
    }
  }

  if (debugLog && redistributed > 0) {
    debugLog.push(`P6-REDIST: ${redistributed} transport goals to move units toward threatened continents`);
  }
}

// ═══════════════════════════════════════════════════════════════════
// P7: Unit-to-goal matching
//
// Core matching algorithm from FUN_0053184D phase 7:
// - Reverse-iterate all units (last unit first)
// - For each unit: find best matching goal by priority / (distance + 1)
// - Assign unit to goal (set internal reference)
// - If unit already has GOTO to goal location: skip
// - Fortified unit threshold: only reassign if new goal priority > 1.5x
// - Uses GoalList.findMaxGoalPriority() for efficient goal lookup
//
// This generates MOVE_UNIT actions to start units moving toward goals.
// ═══════════════════════════════════════════════════════════════════

function phaseUnitToGoalMatching(gameState, mapBase, civSlot, strategy, goals, debugLog) {
  const units = gameState.units;
  const mw = mapBase.mw;
  let matched = 0;
  let skippedFortified = 0;
  let skippedAlreadyGoto = 0;

  // Collect all active goals into a flat array for efficient scanning
  const allGoals = [];
  for (let i = 0; i < goals.tactical.length; i++) {
    const g = goals.tactical[i];
    if (g.goalType === GOAL_NONE) continue;
    if (g.priority <= 0) continue; // negated goals
    allGoals.push({ goal: g, index: i, list: 'tactical' });
  }
  for (let i = 0; i < goals.strategic.length; i++) {
    const g = goals.strategic[i];
    if (g.goalType === GOAL_NONE) continue;
    if (g.priority <= 0) continue;
    allGoals.push({ goal: g, index: i, list: 'strategic' });
  }

  if (allGoals.length === 0) return;

  // Reverse-iterate all units (last unit first, per binary)
  for (let i = units.length - 1; i >= 0; i--) {
    const u = units[i];
    if (u.gx < 0 || u.owner !== civSlot) continue;
    if (u.movesLeft <= 0) continue;

    // Skip settlers — handled by cityai
    if (SETTLER_TYPES.has(u.type)) continue;

    // Skip non-combat units that aren't relevant to goal matching
    const atk = UNIT_ATK[u.type] || 0;
    const def = UNIT_DEF[u.type] || 0;
    if (atk === 0 && def === 0) continue;

    const role = UNIT_ROLE[u.type] ?? 0;
    const domain = UNIT_DOMAIN[u.type] ?? 0;

    // Skip air units from goal matching (they have their own AI)
    if (domain === 1) continue;

    // Check if unit already has a goal assignment
    const currentGoal = goals.getGoalForUnit(i);

    // If unit already has GOTO pointing at its goal target, skip
    if (currentGoal && u.orders === 'goto' && u.goToX != null && u.goToY != null) {
      if (u.goToX === currentGoal.targetGx && u.goToY === currentGoal.targetGy) {
        skippedAlreadyGoto++;
        continue;
      }
    }

    // Find the best matching goal for this unit
    let bestEntry = null;
    let bestScore = -Infinity;

    for (const entry of allGoals) {
      const g = entry.goal;

      // Type matching: which unit roles fit which goal types
      if (!_goalMatchesUnit(g.goalType, role, domain, atk, def)) continue;

      // Skip abstract goals with no coordinates (e.g. EXPLORE with bodyId encoding)
      if (g.targetGx < 0 && g.targetGy < 0) continue;

      // Compute distance
      const dist = tileDist(u.gx, u.gy, g.targetGx, g.targetGy, mapBase);

      // Score = priority / (distance + 1)
      // This favors high-priority nearby goals
      const score = g.priority / (dist + 1);

      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    }

    if (!bestEntry) continue;

    // Fortified unit threshold: only reassign if new goal priority > current * 1.5
    if (u.orders === 'fortified' || u.orders === 'fortify') {
      if (currentGoal) {
        const currentDist = tileDist(u.gx, u.gy, currentGoal.targetGx, currentGoal.targetGy, mapBase);
        const currentScore = currentGoal.priority / (currentDist + 1);
        if (bestScore <= currentScore * 1.5) {
          skippedFortified++;
          continue;
        }
      } else {
        // Fortified with no goal: only reassign if the goal is fairly urgent
        if (bestEntry.goal.priority < 80) {
          skippedFortified++;
          continue;
        }
      }
    }

    // Assign unit to goal
    goals.assignUnit(i, bestEntry.list, bestEntry.index);
    matched++;
  }

  if (debugLog) {
    debugLog.push(`P7-MATCH: ${matched} units matched to goals, ${skippedFortified} fortified skipped, ${skippedAlreadyGoto} already moving`);
  }
}

/**
 * Check if a goal type is compatible with a unit's role/domain/stats.
 */
function _goalMatchesUnit(goalType, role, domain, atk, def) {
  switch (goalType) {
    case GOAL_ATTACK_CITY:
      // Attack goals: attackers (role 0), or defenders with attack capability
      return domain === 0 && atk > 0;

    case GOAL_DEFEND_CITY:
      // Defend goals: defenders (role 1), or any land unit with defense
      return domain === 0 && def > 0;

    case GOAL_REINFORCE:
      // Reinforce: any land combat unit
      return domain === 0 && (atk > 0 || def > 0);

    case GOAL_NAVAL_ASSAULT:
      // Naval assault: sea combat (role 2) or sea transport (role 5)
      return domain === 2;

    case GOAL_TRANSPORT:
      // Transport pickup: any land combat unit (they need to get to the pickup)
      return domain === 0 && (atk > 0 || def > 0);

    case GOAL_EXPLORE:
      // Explore: any land unit
      return domain === 0;

    case GOAL_BUILD_ROAD:
      // Road building: settlers only (handled separately, skip here)
      return false;

    default:
      return false;
  }
}

// ═══════════════════════════════════════════════════════════════════
// P8: City cleanup
//
// Clear peace flags (reset temporary peace processing state),
// compute production goals per city based on current threat levels
// and goal assignments. Feeds into production AI.
// ═══════════════════════════════════════════════════════════════════

function phaseCityCleanup(gameState, mapBase, civSlot, strategy, goals, debugLog) {
  const aiData = strategy.aiData;
  if (!aiData) return;

  // Compute per-city production hints based on active goals
  const cityProductionHints = new Map(); // cityIndex → { needsDefender, needsAttacker, needsSDI, needsWalls }

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0 || city.gx < 0 || city.owner !== civSlot) continue;

    const hints = {
      needsDefender: false,
      needsAttacker: false,
      needsSDI: strategy.needsSDI && !cityHasBuilding(city, 17),
      needsWalls: false,
    };

    // Check if this city has a defend goal
    const defendGoal = goals.findMaxGoalPriority(g =>
      g.goalType === GOAL_DEFEND_CITY &&
      g.targetGx === city.gx && g.targetGy === city.gy
    );
    if (defendGoal && defendGoal.goal.priority >= 80) {
      hints.needsDefender = true;
    }

    // Check continent threat level
    const bodyId = mapBase.tileData?.[city.gy * mapBase.mw + city.gx]?.bodyId ?? 0;
    const threatLevel = strategy.continentThreats?.get(bodyId) || THREAT_SAFE;

    if (threatLevel >= THREAT_CONTESTED) {
      hints.needsDefender = true;
      // On hostile continents, also need city walls
      if (threatLevel >= THREAT_HOSTILE && !cityHasBuilding(city, 8)) {
        hints.needsWalls = true;
      }
    }

    // Check if there are attack goals nearby — we might need attackers
    const attackGoal = goals.findMaxGoalPriority(g =>
      g.goalType === GOAL_ATTACK_CITY &&
      g.targetGx >= 0 && g.targetGy >= 0 &&
      tileDist(city.gx, city.gy, g.targetGx, g.targetGy, mapBase) < 30
    );
    if (attackGoal && attackGoal.goal.priority >= 60) {
      hints.needsAttacker = true;
    }

    cityProductionHints.set(ci, hints);
  }

  strategy.cityProductionHints = cityProductionHints;

  if (debugLog) {
    let dCount = 0, aCount = 0, sdiCount = 0, wallCount = 0;
    for (const [, h] of cityProductionHints) {
      if (h.needsDefender) dCount++;
      if (h.needsAttacker) aCount++;
      if (h.needsSDI) sdiCount++;
      if (h.needsWalls) wallCount++;
    }
    if (dCount + aCount + sdiCount + wallCount > 0) {
      debugLog.push(`P8-CLEANUP: city hints: ${dCount} need defenders, ${aCount} need attackers, ${sdiCount} need SDI, ${wallCount} need walls`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// Main entry point: runAiTurn
// ═══════════════════════════════════════════════════════════════════

/**
 * Run one AI turn for the given civ.
 * Returns an array of actions to apply before END_TURN.
 *
 * IMPORTANT: The server applies these actions sequentially through
 * applyAction(), so later actions see a mutated state. However, we
 * compute all actions against the *initial* state snapshot. To stay
 * safe, each unit gets at most one action per phase.
 *
 * Cleanup issues skip/fortify for ALL units that have movesLeft > 0
 * in the initial snapshot (not just unhandled units). This is safe
 * because:
 *   - Units given UNIT_ORDER/WORKER_ORDER by earlier phases already
 *     have movesLeft=0 after those orders are applied, so the
 *     redundant skip is a harmless no-op (movesLeft already 0).
 *   - Units given MOVE_UNIT may still have movesLeft > 0 after the
 *     move is applied; the skip zeros out remaining movement,
 *     preventing END_TURN rejection.
 *   - Units consumed by BUILD_CITY or disband are dead (gx < 0)
 *     when the skip is applied, so the skip is rejected harmlessly.
 *   - The 'skip' order does NOT change unit.orders, so it never
 *     overwrites fortify/sentry/worker orders set by earlier phases.
 *
 * @param {object} gameState - current mutable game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7) being played
 * @param {Array<string>|null} [debugLog=null] - if non-null, AI modules push debug strings here
 * @returns {{ actions: Array<object>, debugLog: Array<string>|null }}
 */
export function runAiTurn(gameState, mapBase, civSlot, debugLog = null) {
  // ── Barbarian AI (civ slot 0): separate simpler logic ──
  if (civSlot === 0) {
    const barbActions = generateBarbarianActions(gameState, mapBase, debugLog);
    return { actions: barbActions, debugLog };
  }

  const actions = [];

  try {
    // ═══════════════════════════════════════════════════════════════
    // Binary FUN_0053184D phases (strategic/goal planning)
    // ═══════════════════════════════════════════════════════════════

    // ── P0. Strategic assessment (advisory — no actions) ──
    const strategy = assessStrategy(gameState, mapBase, civSlot, undefined, debugLog);

    // ── P0b. Goal list initialization and decay ──
    const goals = getGoalList(civSlot);
    goals.decayGoals();
    goals.cleanupDeadUnits(gameState, civSlot);
    goals.cleanupCapturedCities(gameState, civSlot);

    // Attach goals to strategy so downstream modules can read them
    strategy.goals = goals;

    // ── P0c. Anti-nuke defense check ──
    phaseAntiNukeDefense(gameState, civSlot, strategy, debugLog);

    // ── P1. Era quarter counting ──
    phaseEraQuarterCounting(gameState, civSlot, strategy, debugLog);

    // ── P2. Terraform goal counting per continent ──
    phaseTerraformGoalCounting(gameState, mapBase, civSlot, strategy, goals, debugLog);

    // ── P3. Unit classification ──
    phaseUnitClassification(gameState, mapBase, civSlot, strategy, debugLog);

    // ── P4. City processing — defense/attack goals, wonder counting ──
    phaseCityProcessing(gameState, mapBase, civSlot, strategy, goals, debugLog);

    // ── P5. Continent threat assessment — 5-level system ──
    phaseContinentThreatAssessment(gameState, mapBase, civSlot, strategy, goals, debugLog);

    // ── P6. Unit redistribution — safe→threatened continent movement ──
    phaseUnitRedistribution(gameState, mapBase, civSlot, strategy, goals, debugLog);

    // ── P7. Unit-to-goal matching — the core assignment algorithm ──
    phaseUnitToGoalMatching(gameState, mapBase, civSlot, strategy, goals, debugLog);

    // ── P8. City cleanup — production hints for prodai ──
    phaseCityCleanup(gameState, mapBase, civSlot, strategy, goals, debugLog);

    if (debugLog) {
      const counts = goals.countActive();
      if (counts.total > 0) {
        debugLog.push(`GOALS: ${counts.tactical} tactical, ${counts.strategic} strategic goals active`);
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // Action-generating phases (existing AI modules)
    // ═══════════════════════════════════════════════════════════════

    // ── Research & economy ──
    for (const a of generateEconActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── Diplomacy ──
    for (const a of generateDiplomacyActions(gameState, mapBase, civSlot, debugLog)) {
      actions.push(a);
    }

    // ── City management: production selection + rush-buy + sell obsolete ──
    for (const a of generateProductionActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }
    for (const a of generateRushBuyActions(gameState, mapBase, civSlot, strategy)) {
      actions.push(a);
    }
    for (const a of generateSellObsoleteActions(gameState, mapBase, civSlot, debugLog)) {
      actions.push(a);
    }

    // ── Settler/Worker AI ──
    for (const a of generateSettlerActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── Military unit AI ──
    for (const a of generateMilitaryActions(gameState, mapBase, civSlot, strategy, debugLog)) {
      actions.push(a);
    }

    // ── Goal cleanup: remove completed goals, update assignments ──
    goals.cleanupDeadUnits(gameState, civSlot);
    goals.cleanupCapturedCities(gameState, civSlot);

    // ── Cleanup: skip/fortify ALL units that still have moves ──
    // Must come last. Does NOT skip "handled" units — see JSDoc above
    // for why this is safe and necessary to prevent END_TURN rejection.
    const cleanupActions = generateCleanupActions(gameState, mapBase, civSlot, strategy, debugLog);
    actions.push(...cleanupActions);

  } catch (err) {
    // Never crash the server — log and return whatever we have
    console.error(`[ai] Error during AI turn for civ ${civSlot}:`, err);
  }

  return { actions, debugLog };
}
