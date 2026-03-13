// ═══════════════════════════════════════════════════════════════════
// pathfinding.js — A* pathfinder for Civ2 isometric map (shared: server + client)
//
// Uses doubled-X coordinates. Returns array of direction strings
// (N, NE, E, SE, S, SW, W, NW) from start to goal.
// ═══════════════════════════════════════════════════════════════════

import { UNIT_DOMAIN, MOVEMENT_MULTIPLIER } from './defs.js';
import { moveCost, resolveDirection } from './movement.js';

const DIR_NAMES = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/**
 * Find shortest path from (sx,sy) to (gx,gy) for a given unit type.
 * @param {number} unitType - unit type index
 * @param {number} sx - start gx
 * @param {number} sy - start gy
 * @param {number} gx - goal gx
 * @param {number} gy - goal gy
 * @param {object} mapBase - map accessor object
 * @param {number} owner - civ slot of unit owner
 * @param {Array} units - all units array (for ZOC checks)
 * @param {Array} cities - cities array (for friendly city checks)
 * @returns {string[]|null} array of direction strings, or null if no path
 */
export function findPath(unitType, sx, sy, gx, gy, mapBase, owner, units, cities) {
  if (sx === gx && sy === gy) return [];

  const domain = UNIT_DOMAIN[unitType] ?? 0;
  const mw = mapBase.mw;
  const mh = mapBase.mh;
  const wraps = mapBase.wraps;

  // Key for visited set
  const key = (x, y) => y * mw + x;

  // Heuristic: Chebyshev distance in isometric coords (scaled by min terrain cost)
  function heuristic(x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    if (wraps) dx = Math.min(dx, mw - dx);
    const dy = Math.abs(y2 - y1);
    // In doubled-X isometric, diagonal move = 1 step, covers dx=1 dy=1
    // Straight N/S = dy=2, E/W = dx=1
    return Math.max(dx, Math.ceil(dy / 2)) * MOVEMENT_MULTIPLIER;
  }

  // Priority queue (simple binary heap)
  const open = [];
  const gScore = new Map();
  const cameFrom = new Map(); // key → { fromKey, dir }

  const startKey = key(sx, sy);
  gScore.set(startKey, 0);

  function heapPush(item) {
    open.push(item);
    let i = open.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (open[parent].f <= open[i].f) break;
      [open[parent], open[i]] = [open[i], open[parent]];
      i = parent;
    }
  }

  function heapPop() {
    const top = open[0];
    const last = open.pop();
    if (open.length > 0) {
      open[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < open.length && open[l].f < open[smallest].f) smallest = l;
        if (r < open.length && open[r].f < open[smallest].f) smallest = r;
        if (smallest === i) break;
        [open[smallest], open[i]] = [open[i], open[smallest]];
        i = smallest;
      }
    }
    return top;
  }

  heapPush({ x: sx, y: sy, f: heuristic(sx, sy, gx, gy), g: 0 });

  const maxIter = mw * mh * 2; // safety limit
  let iter = 0;

  while (open.length > 0 && iter++ < maxIter) {
    const cur = heapPop();
    const curKey = key(cur.x, cur.y);

    // Goal check
    if (cur.x === gx && cur.y === gy) {
      // Reconstruct path
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

    // Skip if we've found a better path to this node already
    const bestG = gScore.get(curKey);
    if (bestG !== undefined && cur.g > bestG) continue;

    // Expand neighbors
    for (const dir of DIR_NAMES) {
      const dest = resolveDirection(cur.x, cur.y, dir, mapBase);
      if (!dest) continue;

      const { gx: nx, gy: ny } = dest;

      // Domain check
      const terrain = mapBase.getTerrain(nx, ny);
      if (domain === 0 && terrain === 10) continue; // land can't enter ocean (simplified)
      if (domain === 1 && terrain !== 10) continue; // sea can't enter land

      // Movement cost
      const cost = moveCost(unitType, mapBase, cur.x, cur.y, nx, ny);
      if (cost < 0) continue; // impassable

      const tentG = cur.g + Math.max(cost, 1);
      const nKey = key(nx, ny);
      const prevG = gScore.get(nKey);

      if (prevG === undefined || tentG < prevG) {
        gScore.set(nKey, tentG);
        cameFrom.set(nKey, { fromKey: curKey, dir });
        heapPush({ x: nx, y: ny, f: tentG + heuristic(nx, ny, gx, gy), g: tentG });
      }
    }
  }

  return null; // no path found
}
