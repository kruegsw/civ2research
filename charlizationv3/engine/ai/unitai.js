// ═══════════════════════════════════════════════════════════════════
// ai/unitai.js — Unit AI: exploration, combat, movement
//
// Handles military unit movement (explore, attack, patrol) and
// end-of-turn cleanup (skip/fortify idle units).
// ═══════════════════════════════════════════════════════════════════

import { resolveDirection, getDirection } from '../movement.js';
import { validateAction } from '../rules.js';
import {
  UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_HP,
  BUSY_ORDERS, TERRAIN_DEFENSE,
} from '../defs.js';

// ── Helpers ──────────────────────────────────────────────────────

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/**
 * Check if a tile has been explored by this civ (visibility bit set).
 */
function isExplored(mapBase, gx, gy, civSlot) {
  if (gy < 0 || gy >= mapBase.mh) return true; // off-map counts as "explored"
  const wgx = mapBase.wraps ? ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw : gx;
  if (wgx < 0 || wgx >= mapBase.mw) return true;
  const idx = gy * mapBase.mw + wgx;
  const tile = mapBase.tileData[idx];
  if (!tile) return true;
  return !!(tile.visibility & (1 << civSlot));
}

/**
 * Find the nearest unexplored tile using BFS from (startGx, startGy).
 * Returns { gx, gy } or null if everything nearby is explored.
 * Limits search to maxRadius steps to keep it fast.
 */
function findNearestUnexplored(mapBase, startGx, startGy, civSlot, maxRadius = 15) {
  const visited = new Set();
  const key = (gx, gy) => `${gx},${gy}`;
  const queue = [{ gx: startGx, gy: startGy, dist: 0 }];
  visited.add(key(startGx, startGy));

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.dist > maxRadius) break;

    // Check if this tile is unexplored
    if (cur.dist > 0 && !isExplored(mapBase, cur.gx, cur.gy, civSlot)) {
      return { gx: cur.gx, gy: cur.gy };
    }

    // Expand neighbors
    const neighbors = mapBase.getNeighbors(cur.gx, cur.gy);
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (ny < 0 || ny >= mapBase.mh) continue;
      const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
      if (wnx < 0 || wnx >= mapBase.mw) continue;
      const k = key(wnx, ny);
      if (visited.has(k)) continue;
      visited.add(k);
      queue.push({ gx: wnx, gy: ny, dist: cur.dist + 1 });
    }
  }

  return null; // everything explored within radius
}

/**
 * Get the direction from (fromGx, fromGy) toward (toGx, toGy).
 * Picks the adjacent tile closest to the target.
 */
function directionToward(mapBase, fromGx, fromGy, toGx, toGy) {
  // First try direct adjacency
  const direct = getDirection(fromGx, fromGy, toGx, toGy, mapBase);
  if (direct) return direct;

  // Otherwise, find the adjacent tile that minimizes distance to target
  const neighbors = mapBase.getNeighbors(fromGx, fromGy);
  let bestDir = null;
  let bestDist = Infinity;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
    if (wnx < 0 || wnx >= mapBase.mw) continue;

    // Compute distance using doubled-X coordinates for proper isometric distance
    const fromDx = wnx * 2 + (ny % 2);
    const toDx = toGx * 2 + (toGy % 2);
    let ddx = Math.abs(fromDx - toDx);
    if (mapBase.wraps) {
      const mw2 = mapBase.mw * 2;
      ddx = Math.min(ddx, mw2 - ddx);
    }
    const ddy = Math.abs(ny - toGy);
    const dist = ddx + ddy;

    if (dist < bestDist) {
      bestDist = dist;
      bestDir = dir;
    }
  }

  return bestDir;
}

// ── Adjacent enemy detection ─────────────────────────────────────

/**
 * Find enemy units on tiles adjacent to the given unit.
 * Returns array of { unitIndex, dir, gx, gy } for each adjacent enemy.
 */
function findAdjacentEnemies(gameState, mapBase, unit, unitIndex) {
  const results = [];
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    const wnx = mapBase.wraps ? ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw : nx;
    if (wnx < 0 || wnx >= mapBase.mw) continue;

    for (let i = 0; i < gameState.units.length; i++) {
      const u = gameState.units[i];
      if (u.gx === wnx && u.gy === ny && u.owner !== unit.owner && u.gx >= 0) {
        results.push({ unitIndex: i, dir, gx: wnx, gy: ny });
      }
    }
  }

  return results;
}

/**
 * Simple combat evaluation: should we attack?
 * Compares raw ATK * HP vs DEF * HP * terrain_defense.
 */
function shouldAttack(attacker, defender, defTerrain) {
  const atkStr = (UNIT_ATK[attacker.type] || 1) * ((UNIT_HP[attacker.type] || 1) - (attacker.hpLost || 0));
  const terrainMul = TERRAIN_DEFENSE[defTerrain] ?? 2;
  const defStr = (UNIT_DEF[defender.type] || 1) * ((UNIT_HP[defender.type] || 1) - (defender.hpLost || 0)) * (terrainMul / 2);

  // Attack if we have at least 60% of their effective strength
  // (be somewhat aggressive — AI should fight)
  return atkStr >= defStr * 0.6;
}

// ── Main unit AI logic ───────────────────────────────────────────

/**
 * Generate movement/combat actions for all military units of the given civ.
 * Only moves units one tile each (conservative approach since state changes
 * between action applications).
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @returns {Array<object>} actions
 */
export function generateMilitaryActions(gameState, mapBase, civSlot) {
  const actions = [];

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    // Skip units that aren't ours, are dead, have no moves, or are busy
    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;
    if (BUSY_ORDERS.has(unit.orders)) continue;

    // Skip settlers/engineers — handled by cityai
    if (unit.type === 0 || unit.type === 1) continue;

    // Skip non-combat units (caravans, diplomats, etc.)
    const atk = UNIT_ATK[unit.type] || 0;
    if (atk === 0) continue;

    // Skip air and sea units for now (complex movement rules)
    const domain = UNIT_DOMAIN[unit.type] ?? 0;
    if (domain !== 0) continue;

    // 1. Check for adjacent enemies — consider attacking
    const adjacentEnemies = findAdjacentEnemies(gameState, mapBase, unit, i);
    if (adjacentEnemies.length > 0) {
      // Find the most favorable target
      let bestTarget = null;
      let bestRatio = -Infinity;

      for (const enemy of adjacentEnemies) {
        const defender = gameState.units[enemy.unitIndex];
        const defTerrain = mapBase.getTerrain(enemy.gx, enemy.gy);

        const atkStr = (UNIT_ATK[unit.type] || 1) * ((UNIT_HP[unit.type] || 1) - (unit.hpLost || 0));
        const terrainMul = TERRAIN_DEFENSE[defTerrain] ?? 2;
        const defStr = (UNIT_DEF[defender.type] || 1) * ((UNIT_HP[defender.type] || 1) - (defender.hpLost || 0)) * (terrainMul / 2);
        const ratio = defStr > 0 ? atkStr / defStr : Infinity;

        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestTarget = enemy;
        }
      }

      if (bestTarget) {
        const defender = gameState.units[bestTarget.unitIndex];
        const defTerrain = mapBase.getTerrain(bestTarget.gx, bestTarget.gy);

        if (shouldAttack(unit, defender, defTerrain)) {
          const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir: bestTarget.dir };
          const err = validateAction(gameState, mapBase, moveAction, civSlot);
          if (!err) {
            actions.push(moveAction);
            continue; // Done with this unit for now
          }
        }
      }
    }

    // 2. Explore: move toward nearest unexplored tile
    const target = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, 20);
    if (target) {
      const dir = directionToward(mapBase, unit.gx, unit.gy, target.gx, target.gy);
      if (dir) {
        const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir };
        const err = validateAction(gameState, mapBase, moveAction, civSlot);
        if (!err) {
          actions.push(moveAction);
          continue;
        }
      }
    }

    // 3. Random movement as fallback
    const shuffled = [...DIRECTIONS].sort(() => Math.random() - 0.5);
    let moved = false;
    for (const dir of shuffled) {
      const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir };
      const err = validateAction(gameState, mapBase, moveAction, civSlot);
      if (!err) {
        // Don't walk into ocean with land units
        const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
        if (dest) {
          const terrain = mapBase.getTerrain(dest.gx, dest.gy);
          if (domain === 0 && terrain === 10) continue; // skip ocean
        }
        actions.push(moveAction);
        moved = true;
        break;
      }
    }

    // If couldn't move at all, will be handled by cleanup
  }

  return actions;
}

/**
 * Generate skip/fortify orders for units that still have moves left
 * but have nothing useful to do. This ensures END_TURN validation
 * passes (all units must have orders or no moves).
 *
 * @param {object} gameState - current game state (post other actions)
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @returns {Array<object>} actions
 */
export function generateCleanupActions(gameState, mapBase, civSlot) {
  const actions = [];

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;
    if (BUSY_ORDERS.has(unit.orders)) continue;

    const domain = UNIT_DOMAIN[unit.type] ?? 0;

    // For land military units in cities, fortify
    if (domain === 0 && (UNIT_ATK[unit.type] || 0) > 0) {
      const inCity = gameState.cities.some(c =>
        c.gx === unit.gx && c.gy === unit.gy && c.owner === civSlot && c.size > 0);
      if (inCity) {
        const fortifyAction = { type: 'UNIT_ORDER', unitIndex: i, order: 'fortify' };
        const err = validateAction(gameState, mapBase, fortifyAction, civSlot);
        if (!err) {
          actions.push(fortifyAction);
          continue;
        }
      }
    }

    // For everything else, skip
    const skipAction = { type: 'UNIT_ORDER', unitIndex: i, order: 'skip' };
    const err = validateAction(gameState, mapBase, skipAction, civSlot);
    if (!err) {
      actions.push(skipAction);
    }
  }

  return actions;
}
