// ═══════════════════════════════════════════════════════════════════
// pathfinding.js — A* pathfinder for Civ2 isometric map (shared: server + client)
//
// Three pathfinding functions ported from decompiled Civ2 pseudocode:
//   C.1: findPath()           — Enhanced A* with ZOC, domain, transport boarding
//   C.2: calcGotoDirection()  — Next-step calculator for GOTO orders
//   C.3: findRoadPath()       — Roads-only pathfinding for trade routes
//
// Uses doubled-X coordinates. Returns array of direction strings
// (N, NE, E, SE, S, SW, W, NW) from start to goal.
// ═══════════════════════════════════════════════════════════════════

import {
  UNIT_DOMAIN, UNIT_ATK, MOVEMENT_MULTIPLIER,
  TERRAIN_MOVE_COST, UNIT_IGNORE_ZOC, UNIT_CARRY_CAP, UNIT_MOVE_POINTS,
} from './defs.js';
import { moveCost, resolveDirection, isZOCBlocked, getDirection } from './movement.js';

// ─── Direction constants ─────────────────────────────────────────
const DIR_NAMES = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

// Opposite direction index: N↔S, NE↔SW, E↔W, SE↔NW
const OPPOSITE_DIR = [4, 5, 6, 7, 0, 1, 2, 3];

// ─── MinHeap (binary heap) for A* priority queue ─────────────────
class MinHeap {
  constructor() { this._data = []; }
  get size() { return this._data.length; }

  push(item) {
    const d = this._data;
    d.push(item);
    let i = d.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (d[p].f <= d[i].f) break;
      [d[p], d[i]] = [d[i], d[p]];
      i = p;
    }
  }

  pop() {
    const d = this._data;
    const top = d[0];
    const last = d.pop();
    if (d.length > 0) {
      d[0] = last;
      let i = 0;
      for (;;) {
        let s = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < d.length && d[l].f < d[s].f) s = l;
        if (r < d.length && d[r].f < d[s].f) s = r;
        if (s === i) break;
        [d[s], d[i]] = [d[i], d[s]];
        i = s;
      }
    }
    return top;
  }
}

// ─── Heuristic ───────────────────────────────────────────────────

/**
 * Chebyshev distance in doubled-X isometric space.
 * Diagonal move covers dx=1, dy=1 in one step.
 * N/S covers dy=2 in one step, E/W covers dx=1 in one step.
 */
function heuristic(x1, y1, x2, y2, mw, wraps) {
  let dx = Math.abs(x2 - x1);
  if (wraps) dx = Math.min(dx, mw - dx);
  const dy = Math.abs(y2 - y1);
  // In doubled-X isometric coords, one step = max(dx, ceil(dy/2))
  return Math.max(dx, Math.ceil(dy / 2)) * MOVEMENT_MULTIPLIER;
}

// ─── Helper: check for enemy combat units on a tile ──────────────

function hasEnemyCombat(gx, gy, owner, units) {
  for (const u of units) {
    if (u.gx === gx && u.gy === gy && u.owner !== owner && u.gx >= 0
        && (UNIT_ATK[u.type] || 0) > 0) {
      return true;
    }
  }
  return false;
}

// ─── Helper: check for friendly transport on an ocean tile ───────

function hasFriendlyTransport(gx, gy, owner, units) {
  for (const u of units) {
    if (u.gx === gx && u.gy === gy && u.owner === owner && u.gx >= 0
        && UNIT_DOMAIN[u.type] === 2 && (UNIT_CARRY_CAP[u.type] || 0) > 0) {
      return true;
    }
  }
  return false;
}

// ─── Helper: check if tile has a friendly city ───────────────────

function hasFriendlyCity(gx, gy, owner, mapBase) {
  if (!mapBase.tileData) return false;
  const idx = gy * mapBase.mw + ((gx % mapBase.mw + mapBase.mw) % mapBase.mw);
  const tile = mapBase.tileData[idx];
  if (!tile) return false;
  if (tile.improvements && tile.improvements.city && tile.tileOwnership === owner) return true;
  return false;
}

// ─── Helper: check if tile has any city ──────────────────────────

function hasCity(gx, gy, mapBase) {
  if (!mapBase.tileData) return false;
  const idx = gy * mapBase.mw + ((gx % mapBase.mw + mapBase.mw) % mapBase.mw);
  const tile = mapBase.tileData[idx];
  return tile && tile.improvements && tile.improvements.city;
}

// ─── C.1: findPath — Enhanced A* ─────────────────────────────────

/**
 * Find shortest path from (sx,sy) to (gx,gy) for a given unit type.
 *
 * Ported from FUN_004abfe5 (find_path). Uses A* with:
 *   - Chebyshev heuristic (isometric doubled-X coords)
 *   - ZOC (Zone of Control) enforcement
 *   - Domain restrictions (land/sea/air)
 *   - Transport boarding (land units can path to ocean tiles with friendly transports)
 *   - maxCost budget to limit search radius
 *
 * @param {number} unitType - unit type index
 * @param {number} sx - start gx
 * @param {number} sy - start gy
 * @param {number} gx - goal gx
 * @param {number} gy - goal gy
 * @param {object} mapBase - map accessor object { mw, mh, wraps, getTerrain, getImprovements, ... }
 * @param {number} owner - civ slot of unit owner
 * @param {Array} units - all units array (for ZOC checks, transport detection)
 * @param {Array} [cities] - cities array (unused but kept for backward compat)
 * @param {number} [maxCost=Infinity] - stop searching when g exceeds this cost
 * @returns {string[]|null} array of direction strings, or null if no path
 */
export function findPath(unitType, sx, sy, gx, gy, mapBase, owner, units, cities, maxCost) {
  if (sx === gx && sy === gy) return [];

  const domain = UNIT_DOMAIN[unitType] ?? 0;
  const mw = mapBase.mw;
  const mh = mapBase.mh;
  const wraps = mapBase.wraps;
  const budget = (maxCost != null && maxCost !== Infinity) ? maxCost : mw * mh * MOVEMENT_MULTIPLIER;

  // Use string keys for the visited/gScore maps (handles large maps cleanly)
  const gScore = new Map();
  const cameFrom = new Map(); // key → { fromKey, dir }

  const startKey = sy * mw + ((sx % mw + mw) % mw);
  gScore.set(startKey, 0);

  const heap = new MinHeap();
  heap.push({ x: sx, y: sy, f: heuristic(sx, sy, gx, gy, mw, wraps), g: 0 });

  const maxIter = mw * mh * 4; // safety limit
  let iter = 0;

  while (heap.size > 0 && iter++ < maxIter) {
    const cur = heap.pop();
    const curKey = cur.y * mw + ((cur.x % mw + mw) % mw);

    // Goal check
    if (cur.x === gx && cur.y === gy) {
      // Reconstruct path as direction strings
      const path = [];
      let k = curKey;
      while (cameFrom.has(k)) {
        const { fromKey, dir } = cameFrom.get(k);
        path.push(dir);
        k = fromKey;
      }
      path.reverse();
      return path;
    }

    // Skip if we already found a better path to this node
    const bestG = gScore.get(curKey);
    if (bestG !== undefined && cur.g > bestG) continue;

    // Budget check: don't expand nodes beyond maxCost
    if (cur.g > budget) continue;

    // Expand neighbors
    for (const dir of DIR_NAMES) {
      const dest = resolveDirection(cur.x, cur.y, dir, mapBase);
      if (!dest) continue;

      const { gx: nx, gy: ny } = dest;

      // ── Domain check ──
      const terrain = mapBase.getTerrain(nx, ny);
      if (domain === 0) {
        // Land unit: can't enter ocean unless there's a friendly transport
        // or the destination is a coastal city
        if (terrain === 10) {
          const isGoal = (nx === gx && ny === gy);
          const canBoard = units && hasFriendlyTransport(nx, ny, owner, units);
          const isCoastalCity = hasCity(nx, ny, mapBase);
          if (!canBoard && !isCoastalCity && !isGoal) continue;
          // Even for goal tiles on ocean, land units truly can't go there
          // unless transport or city — skip if neither
          if (!canBoard && !isCoastalCity) continue;
        }
      } else if (domain === 2) {
        // Sea unit: can only enter ocean tiles or cities on coast
        if (terrain !== 10) {
          if (!hasCity(nx, ny, mapBase)) continue;
        }
      }
      // Air units (domain 2): no terrain restrictions

      // ── Enemy combat unit check ──
      // Can't path through tiles with enemy combat units (except for the goal tile — attack intent)
      if (units) {
        const isGoal = (nx === gx && ny === gy);
        if (!isGoal && hasEnemyCombat(nx, ny, owner, units)) continue;
      }

      // ── ZOC blocking check ──
      if (units && isZOCBlocked(unitType, owner, cur.x, cur.y, nx, ny, mapBase, units)) continue;

      // ── Movement cost ──
      const cost = moveCost(unitType, mapBase, cur.x, cur.y, nx, ny);
      if (cost < 0) continue; // impassable

      const tentG = cur.g + Math.max(cost, 1);

      // Don't exceed budget
      if (tentG > budget) continue;

      const nKey = ny * mw + ((nx % mw + mw) % mw);
      const prevG = gScore.get(nKey);

      if (prevG === undefined || tentG < prevG) {
        gScore.set(nKey, tentG);
        cameFrom.set(nKey, { fromKey: curKey, dir });
        heap.push({ x: nx, y: ny, f: tentG + heuristic(nx, ny, gx, gy, mw, wraps), g: tentG });
      }
    }
  }

  return null; // no path found
}

// ─── C.2: calcGotoDirection — Next step for GOTO orders ──────────

/**
 * Calculate the next movement direction for a unit with GOTO orders.
 *
 * Ported from FUN_004adafc (calc_unit_goto_direction). Three-tier approach:
 *   1. If adjacent to target, return direct direction
 *   2. Use A* pathfinding (findPath) to compute optimal first step
 *   3. Geometric fallback if A* fails (long distances, partial visibility)
 *
 * @param {object} unit - unit object { type, gx, gy, owner, goToX, goToY, prevDir }
 * @param {number} targetGx - goto target gx
 * @param {number} targetGy - goto target gy
 * @param {object} mapBase - map accessor object
 * @param {number} owner - civ slot
 * @param {Array} units - all units array
 * @param {Array} [cities] - cities array
 * @returns {{ dir: string, dx: number, dy: number }|null} next direction, or null if no path/cancel
 */
export function calcGotoDirection(unit, targetGx, targetGy, mapBase, owner, units, cities) {
  const unitType = unit.type;
  const unitGx = unit.gx;
  const unitGy = unit.gy;

  if (unitGx < 0 || unitGy < 0) return null;
  if (unitGx === targetGx && unitGy === targetGy) return null; // already there

  // ── Tier 1: Adjacent — direct move ──
  const adjDir = getDirection(unitGx, unitGy, targetGx, targetGy, mapBase);
  if (adjDir) {
    return { dir: adjDir };
  }

  // ── Tier 2: A* pathfinding ──
  // Use generous maxCost for medium-range paths
  const domain = UNIT_DOMAIN[unitType] ?? 0;
  const speed = (UNIT_MOVE_POINTS[unitType] || 1) * MOVEMENT_MULTIPLIER;
  // Budget: ~23 tiles worth of movement as in original (48-tile BFS radius)
  const maxCost = 999 * MOVEMENT_MULTIPLIER;

  const path = findPath(unitType, unitGx, unitGy, targetGx, targetGy, mapBase, owner, units, cities, maxCost);
  if (path && path.length > 0) {
    return { dir: path[0] };
  }

  // ── Tier 3: Geometric fallback ──
  // For long distances or when A* can't reach, use direction heuristic
  // (ported from the geometric section of calc_unit_goto_direction)
  const mw = mapBase.mw;
  const wraps = mapBase.wraps;

  let dx = targetGx - unitGx;
  if (wraps) {
    // Correct for wrapping: pick the shorter direction
    if (dx > mw / 2) dx -= mw;
    else if (dx < -mw / 2) dx += mw;
  }
  const dy = targetGy - unitGy;

  if (dx === 0 && dy === 0) return null;

  // Score all 8 directions, pick the one that moves closest to target
  let bestScore = Infinity;
  let bestDir = null;

  for (let di = 0; di < 8; di++) {
    const dirName = DIR_NAMES[di];
    const dest = resolveDirection(unitGx, unitGy, dirName, mapBase);
    if (!dest) continue;

    const { gx: nx, gy: ny } = dest;

    // Domain check
    const terrain = mapBase.getTerrain(nx, ny);
    if (domain === 0 && terrain === 10) {
      if (!units || !hasFriendlyTransport(nx, ny, owner, units)) continue;
    }
    if (domain === 2 && terrain !== 10) {
      if (!hasCity(nx, ny, mapBase)) continue;
    }

    // Skip tiles with enemy combat units
    if (units && hasEnemyCombat(nx, ny, owner, units)) continue;

    // ZOC check
    if (units && isZOCBlocked(unitType, owner, unitGx, unitGy, nx, ny, mapBase, units)) continue;

    // Movement cost for this step
    const cost = moveCost(unitType, mapBase, unitGx, unitGy, nx, ny);
    if (cost < 0) continue;

    // Remaining distance from neighbor to target (Chebyshev)
    let remDx = Math.abs(targetGx - nx);
    if (wraps) remDx = Math.min(remDx, mw - remDx);
    const remDy = Math.abs(targetGy - ny);
    const remDist = Math.max(remDx, Math.ceil(remDy / 2));

    // Score: weighted sum of remaining distance and step cost
    // Favor lower remaining distance; use cost as tiebreaker
    const score = remDist * 100 + Math.max(cost, 1);

    if (score < bestScore) {
      bestScore = score;
      bestDir = dirName;
    }
  }

  if (!bestDir) return null;

  // ── Anti-oscillation check ──
  // If the best direction is the exact opposite of the previous direction,
  // the unit is stuck oscillating — cancel GOTO
  if (unit.prevDir != null) {
    const bestIdx = DIR_NAMES.indexOf(bestDir);
    const prevIdx = DIR_NAMES.indexOf(unit.prevDir);
    if (bestIdx >= 0 && prevIdx >= 0 && bestIdx === OPPOSITE_DIR[prevIdx]) {
      return null; // cancel — unit is oscillating
    }
  }

  return { dir: bestDir };
}

// ─── C.3: findRoadPath — Roads-only pathfinding for trade routes ─

/**
 * Find a path that only traverses tiles connected by roads or railroads.
 * Used for trade route validation (Caravans/Freight).
 *
 * Ported from FUN_004ad20f (find_road_path). Uses BFS restricted to
 * tiles with road or railroad improvements. Falls back to null if no
 * road-connected path exists.
 *
 * @param {number} fromGx - start gx
 * @param {number} fromGy - start gy
 * @param {number} toGx - destination gx
 * @param {number} toGy - destination gy
 * @param {object} mapBase - map accessor object { mw, mh, wraps, getImprovements, ... }
 * @returns {{ gx: number, gy: number }[]|null} array of tile positions, or null if no road path
 */
export function findRoadPath(fromGx, fromGy, toGx, toGy, mapBase) {
  if (fromGx === toGx && fromGy === toGy) return [];

  const mw = mapBase.mw;
  const mh = mapBase.mh;

  // Check that both endpoints have roads/railroads (or are cities with implicit roads)
  function hasRoadOrCity(gx, gy) {
    if (gy < 0 || gy >= mh) return false;
    const imp = mapBase.getImprovements(gx, gy);
    return imp.road || imp.railroad || imp.city;
  }

  if (!hasRoadOrCity(fromGx, fromGy) || !hasRoadOrCity(toGx, toGy)) {
    return null;
  }

  // BFS over road-connected tiles
  const keyFn = (x, y) => y * mw + ((x % mw + mw) % mw);
  const startKey = keyFn(fromGx, fromGy);
  const goalKey = keyFn(toGx, toGy);

  // cameFrom: key → { fromKey, x, y } (stores actual coords for path reconstruction)
  // coordOf: key → { x, y } for coordinate lookup during reconstruction
  const cameFrom = new Map();
  const coordOf = new Map();
  cameFrom.set(startKey, null);
  coordOf.set(startKey, { x: fromGx, y: fromGy });

  const queue = [{ x: fromGx, y: fromGy }];
  let head = 0;

  const maxIter = mw * mh; // safety limit
  let iter = 0;

  while (head < queue.length && iter++ < maxIter) {
    const cur = queue[head++];
    const curKey = keyFn(cur.x, cur.y);

    if (curKey === goalKey) {
      // Reconstruct path as array of {gx, gy} (excludes start, includes goal)
      const path = [];
      let k = goalKey;
      while (cameFrom.get(k) !== null) {
        const co = coordOf.get(k);
        path.push({ gx: co.x, gy: co.y });
        k = cameFrom.get(k);
      }
      path.reverse();
      return path;
    }

    // Current tile improvements
    const curImp = mapBase.getImprovements(cur.x, cur.y);
    const curHasRoad = curImp.road || curImp.railroad || curImp.city;

    // Expand neighbors
    for (const dir of DIR_NAMES) {
      const dest = resolveDirection(cur.x, cur.y, dir, mapBase);
      if (!dest) continue;

      const { gx: nx, gy: ny } = dest;
      const nKey = keyFn(nx, ny);

      if (cameFrom.has(nKey)) continue;

      // Neighbor must have road/railroad/city
      const nImp = mapBase.getImprovements(nx, ny);
      const nHasRoad = nImp.road || nImp.railroad || nImp.city;
      if (!nHasRoad) continue;

      // Both tiles must be road-connected
      if (!curHasRoad) continue;

      cameFrom.set(nKey, curKey);
      coordOf.set(nKey, { x: nx, y: ny });
      queue.push({ x: nx, y: ny });
    }
  }

  return null; // no road-connected path found
}
