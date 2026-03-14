// ═══════════════════════════════════════════════════════════════════
// ai/cityai.js — Settler/Worker AI: city founding, tile improvements
//
// Handles settler city placement decisions and worker orders for
// idle settlers/engineers near cities.
// ═══════════════════════════════════════════════════════════════════

import { resolveDirection } from '../movement.js';
import { validateAction } from '../rules.js';
import {
  BUSY_ORDERS, CIV_CITY_NAMES,
  CAN_IRRIGATE, CAN_MINE, IRRIGATION_TURNS, MINING_TURNS,
  CITY_RADIUS_DOUBLED,
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
 * Get the next unused city name for a civ.
 */
function getNextCityName(gameState, civSlot) {
  const civ = gameState.civs?.[civSlot];
  const rulesNum = civ?.rulesCivNumber ?? 0;
  const nameList = CIV_CITY_NAMES[rulesNum] || CIV_CITY_NAMES[0];
  const ownedNames = new Set(
    gameState.cities.filter(c => c.owner === civSlot).map(c => c.name)
  );
  for (const name of nameList) {
    if (!ownedNames.has(name)) return name;
  }
  return `City ${gameState.cities.filter(c => c.owner === civSlot).length + 1}`;
}

/**
 * Evaluate how good a tile is for founding a city.
 * Higher score = better site.
 *
 * Factors: terrain food/shield potential, distance from own cities,
 * presence of rivers, avoidance of ocean/mountains/glacier.
 */
function evaluateCitySite(gx, gy, gameState, mapBase, civSlot) {
  const terrain = mapBase.getTerrain(gx, gy);

  // Can't build on ocean
  if (terrain === 10) return -1;

  // Can't build too close to existing cities (rules.js enforces this)
  // Use the same radius check the validator uses
  for (const city of gameState.cities) {
    if (city.size <= 0) continue;
    const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);
    // Minimum distance of 4 in doubled-coord distance (approximately 2 tiles)
    // The rules.js check uses the 21-tile radius, but we want extra spacing
    // for AI cities to not overlap too much
    if (dist < 6 && city.owner === civSlot) return -1;
    // Absolute minimum enforced by rules: within city radius of any city
    if (dist < 3) return -1;
  }

  // Score the surrounding area
  let score = 0;
  let foodTiles = 0;
  let shieldTiles = 0;

  // Check all 20 city radius tiles + center
  const parC = gy & 1;
  for (let ri = 0; ri < 20; ri++) {
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
    const parT = ((gy + ddy) % 2 + 2) % 2;
    const tgx = gx + ((parC + ddx - parT) >> 1);
    const tgy = gy + ddy;
    const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;

    const t = mapBase.getTerrain(wgx, tgy);
    // Simple terrain scoring (rough food/shield potential)
    // Desert=0, Plains=1F1S, Grassland=2F, Forest=1F2S, Hills=1F0S(+mine), Mountains=1S
    // Tundra=1F, Glacier=0, Swamp=1F, Jungle=1F, Ocean=1F1T
    const foodScore = [0, 1, 2, 1, 1, 0, 1, 0, 1, 1, 1];
    const shieldScore = [1, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0];

    if (t >= 0 && t <= 10) {
      const f = foodScore[t] || 0;
      const s = shieldScore[t] || 0;
      score += f * 3 + s * 2;
      if (f > 0) foodTiles++;
      if (s > 0) shieldTiles++;
    }

    // Bonus for rivers (trade + irrigation source)
    if (mapBase.hasRiver(wgx, tgy)) score += 2;

    // Bonus for resources
    const res = mapBase.getResource(wgx, tgy);
    if (res > 0) score += 3;
  }

  // Center tile bonus
  if (terrain >= 0 && terrain <= 10) {
    const centerFood = [0, 1, 2, 1, 1, 0, 1, 0, 1, 1, 1];
    score += (centerFood[terrain] || 0) * 2;
  }

  // Bonus for having a mix of food and shields
  if (foodTiles >= 5) score += 5;
  if (shieldTiles >= 3) score += 3;

  // Penalty for harsh terrain at center
  if (terrain === 0 || terrain === 6 || terrain === 7) score -= 5; // desert, tundra, glacier

  // River at center is great
  if (mapBase.hasRiver(gx, gy)) score += 5;

  // Penalty for mountains at center (no food)
  if (terrain === 5) score -= 3;

  return score;
}

/**
 * Find the best direction to move a settler toward a good city site.
 * Evaluates adjacent tiles as potential city sites and also looks
 * further ahead using a simple heuristic.
 */
function findBestSettlerDirection(unitGx, unitGy, gameState, mapBase, civSlot) {
  const neighbors = mapBase.getNeighbors(unitGx, unitGy);
  let bestDir = null;
  let bestScore = -Infinity;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
    if (wnx < 0 || wnx >= mapBase.mw) continue;

    // Don't walk into ocean
    const terrain = mapBase.getTerrain(wnx, ny);
    if (terrain === 10) continue;

    // Score this tile as a city site
    const siteScore = evaluateCitySite(wnx, ny, gameState, mapBase, civSlot);

    // Also consider tiles further in this direction (look-ahead)
    let lookAheadScore = 0;
    const next = resolveDirection(wnx, ny, dir, mapBase);
    if (next) {
      const nextTer = mapBase.getTerrain(next.gx, next.gy);
      if (nextTer !== 10) {
        lookAheadScore = evaluateCitySite(next.gx, next.gy, gameState, mapBase, civSlot) * 0.5;
      }
    }

    const totalScore = siteScore + lookAheadScore;
    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestDir = dir;
    }
  }

  return bestDir;
}

// ── Main settler/worker AI ───────────────────────────────────────

/**
 * Generate actions for settler and worker units.
 *
 * Logic:
 * 1. Settlers with no cities: build a city immediately if the site is decent
 * 2. Settlers: evaluate current tile, build if good; otherwise move toward better site
 * 3. Idle settlers/engineers near cities: improve tiles (road, irrigation, mine)
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @returns {Array<object>} actions
 */
export function generateSettlerActions(gameState, mapBase, civSlot) {
  const actions = [];
  const ownCities = gameState.cities.filter(c => c.owner === civSlot && c.size > 0);
  const numSettlers = gameState.units.filter(u =>
    u.owner === civSlot && u.gx >= 0 && u.type === 0
  ).length;

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    // Only handle our alive settlers/engineers with moves left
    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;
    if (unit.type !== 0 && unit.type !== 1) continue;
    if (BUSY_ORDERS.has(unit.orders)) continue;

    // ── Settler (type 0): prioritize city founding ──
    if (unit.type === 0) {
      // If we have no cities, or we have fewer cities than settlers,
      // try to build a city
      const shouldBuildCity = ownCities.length === 0 || ownCities.length < numSettlers + 1;

      if (shouldBuildCity) {
        // Evaluate current tile
        const siteScore = evaluateCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot);

        // Build threshold: lower for first city, higher for subsequent
        const threshold = ownCities.length === 0 ? 10 : 25;

        if (siteScore >= threshold) {
          // Try to build a city here
          const cityName = getNextCityName(gameState, civSlot);
          const buildAction = { type: 'BUILD_CITY', unitIndex: i, name: cityName };
          const err = validateAction(gameState, mapBase, buildAction, civSlot);
          if (!err) {
            actions.push(buildAction);
            continue;
          }
        }

        // Move toward a better site
        const dir = findBestSettlerDirection(unit.gx, unit.gy, gameState, mapBase, civSlot);
        if (dir) {
          const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir };
          const err = validateAction(gameState, mapBase, moveAction, civSlot);
          if (!err) {
            actions.push(moveAction);
            continue;
          }
        }

        // Fallback: try random directions (avoid getting stuck)
        const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const shuffled = dirs.sort(() => Math.random() - 0.5);
        let moved = false;
        for (const d of shuffled) {
          const dest = resolveDirection(unit.gx, unit.gy, d, mapBase);
          if (!dest) continue;
          const ter = mapBase.getTerrain(dest.gx, dest.gy);
          if (ter === 10) continue; // skip ocean
          const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir: d };
          const err = validateAction(gameState, mapBase, moveAction, civSlot);
          if (!err) {
            actions.push(moveAction);
            moved = true;
            break;
          }
        }
        if (moved) continue;
      }

      // If settler doesn't need to build a city, fall through to worker logic
    }

    // ── Worker logic: improve tiles near cities (settlers/engineers) ──
    // Only do worker orders if there are cities to benefit from
    if (ownCities.length === 0) continue;

    const terrain = mapBase.getTerrain(unit.gx, unit.gy);
    if (terrain === 10) continue; // can't improve ocean

    const imp = mapBase.getImprovements(unit.gx, unit.gy);

    // Priority 1: Clean pollution
    if (imp.pollution) {
      const pollAction = { type: 'WORKER_ORDER', unitIndex: i, order: 'pollution' };
      const err = validateAction(gameState, mapBase, pollAction, civSlot);
      if (!err) {
        actions.push(pollAction);
        continue;
      }
    }

    // Priority 2: Build road if none exists
    if (!imp.road) {
      const roadAction = { type: 'WORKER_ORDER', unitIndex: i, order: 'road' };
      const err = validateAction(gameState, mapBase, roadAction, civSlot);
      if (!err) {
        actions.push(roadAction);
        continue;
      }
    }

    // Priority 3: Build irrigation if possible and terrain supports it
    if (!imp.irrigation && CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0) {
      // Check if adjacent to water source (ocean, river, or existing irrigation)
      const hasWaterSource = checkWaterSource(unit.gx, unit.gy, mapBase);
      if (hasWaterSource) {
        const irrAction = { type: 'WORKER_ORDER', unitIndex: i, order: 'irrigation' };
        const err = validateAction(gameState, mapBase, irrAction, civSlot);
        if (!err) {
          actions.push(irrAction);
          continue;
        }
      }
    }

    // Priority 4: Build mine on hills/mountains
    if (!imp.mining && CAN_MINE[terrain] && MINING_TURNS[terrain] > 0) {
      const mineAction = { type: 'WORKER_ORDER', unitIndex: i, order: 'mine' };
      const err = validateAction(gameState, mapBase, mineAction, civSlot);
      if (!err) {
        actions.push(mineAction);
        continue;
      }
    }

    // Priority 5: Build railroad if road exists
    if (imp.road && !imp.railroad) {
      const rrAction = { type: 'WORKER_ORDER', unitIndex: i, order: 'railroad' };
      const err = validateAction(gameState, mapBase, rrAction, civSlot);
      if (!err) {
        actions.push(rrAction);
        continue;
      }
    }

    // If nothing to do here, move toward a nearby city or unimproved tile
    const moveDir = findWorkerMoveTarget(unit, gameState, mapBase, civSlot);
    if (moveDir) {
      const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir: moveDir };
      const err = validateAction(gameState, mapBase, moveAction, civSlot);
      if (!err) {
        actions.push(moveAction);
        continue;
      }
    }
  }

  return actions;
}

/**
 * Check if a tile has adjacent water source for irrigation.
 * Water sources: ocean, river, or existing irrigation on adjacent tile.
 */
function checkWaterSource(gx, gy, mapBase) {
  // Center tile has river?
  if (mapBase.hasRiver(gx, gy)) return true;

  const neighbors = mapBase.getNeighbors(gx, gy);
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
    if (wnx < 0 || wnx >= mapBase.mw) continue;

    // Ocean tile
    const terrain = mapBase.getTerrain(wnx, ny);
    if (terrain === 10) return true;

    // River
    if (mapBase.hasRiver(wnx, ny)) return true;

    // Existing irrigation
    const imp = mapBase.getImprovements(wnx, ny);
    if (imp.irrigation) return true;
  }

  return false;
}

/**
 * Find a direction to move a worker toward an unimproved tile near a city.
 */
function findWorkerMoveTarget(unit, gameState, mapBase, civSlot) {
  const ownCities = gameState.cities.filter(c => c.owner === civSlot && c.size > 0);

  // Find nearest own city
  let nearestCity = null;
  let nearestDist = Infinity;
  for (const city of ownCities) {
    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestCity = city;
    }
  }

  if (!nearestCity) return null;

  // If too far from nearest city, move toward it
  if (nearestDist > 6) {
    const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
    let bestDir = null;
    let bestDist = Infinity;

    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (ny < 0 || ny >= mapBase.mh) continue;
      const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
      if (wnx < 0 || wnx >= mapBase.mw) continue;
      const ter = mapBase.getTerrain(wnx, ny);
      if (ter === 10) continue;

      const dist = tileDist(wnx, ny, nearestCity.gx, nearestCity.gy, mapBase);
      if (dist < bestDist) {
        bestDist = dist;
        bestDir = dir;
      }
    }

    return bestDir;
  }

  // Near a city: find an adjacent tile that needs improvement
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
  let bestDir = null;
  let bestScore = -1;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
    if (wnx < 0 || wnx >= mapBase.mw) continue;

    const ter = mapBase.getTerrain(wnx, ny);
    if (ter === 10) continue; // skip ocean

    const imp = mapBase.getImprovements(wnx, ny);
    let score = 0;

    // Unroaded tiles get highest priority
    if (!imp.road) score += 3;
    // Unirrigated irrigable tiles
    if (!imp.irrigation && CAN_IRRIGATE[ter] && IRRIGATION_TURNS[ter] > 0) score += 2;
    // Unmineable hills/mountains
    if (!imp.mining && CAN_MINE[ter] && MINING_TURNS[ter] > 0) score += 2;
    // Pollution cleanup
    if (imp.pollution) score += 5;

    if (score > bestScore) {
      bestScore = score;
      bestDir = dir;
    }
  }

  return bestScore > 0 ? bestDir : null;
}
