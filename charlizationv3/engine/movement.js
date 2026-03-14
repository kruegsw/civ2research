// ═══════════════════════════════════════════════════════════════════
// movement.js — Direction resolution & movement cost (shared: server + client)
//
// Isometric map uses doubled-X coordinates (gx = column in half-grid).
// 8-direction movement with proper wrapping.
// ═══════════════════════════════════════════════════════════════════

import { TERRAIN_MOVE_COST, MOVEMENT_MULTIPLIER, UNIT_DOMAIN, UNIT_IGNORE_ZOC, UNIT_ATK } from './defs.js';

// Direction offsets in (gx, gy) doubled-X isometric space.
// Even rows: NE/SE shift left, NW/SW shift left.
// Odd rows: NE/SE shift right, NW/SW stay.
const DIR_OFFSETS_EVEN = {
  N:  [ 0, -2], NE: [ 0, -1], E: [ 1,  0], SE: [ 0,  1],
  S:  [ 0,  2], SW: [-1,  1], W: [-1,  0], NW: [-1, -1],
};
const DIR_OFFSETS_ODD = {
  N:  [ 0, -2], NE: [ 1, -1], E: [ 1,  0], SE: [ 1,  1],
  S:  [ 0,  2], SW: [ 0,  1], W: [-1,  0], NW: [ 0, -1],
};

// Numpad key → direction name
export const NUMPAD_DIR = {
  '1': 'SW', '2': 'S', '3': 'SE',
  '4': 'W',            '6': 'E',
  '7': 'NW', '8': 'N', '9': 'NE',
};

/**
 * Resolve a direction from (gx, gy) to the destination tile.
 *
 * @param {number} gx - current column (half-grid)
 * @param {number} gy - current row
 * @param {string} dir - direction name (N, NE, E, SE, S, SW, W, NW)
 * @param {object} mapBase - must have { mw, mh, wraps }
 * @returns {{ gx: number, gy: number }|null} destination or null if off-map
 */
export function resolveDirection(gx, gy, dir, mapBase) {
  const offsets = (gy % 2 === 0) ? DIR_OFFSETS_EVEN : DIR_OFFSETS_ODD;
  const off = offsets[dir];
  if (!off) return null;

  let nx = gx + off[0];
  let ny = gy + off[1];

  // Vertical bounds
  if (ny < 0 || ny >= mapBase.mh) return null;

  // Horizontal wrapping
  if (mapBase.wraps) {
    nx = ((nx % mapBase.mw) + mapBase.mw) % mapBase.mw;
  } else if (nx < 0 || nx >= mapBase.mw) {
    return null;
  }

  return { gx: nx, gy: ny };
}

/**
 * Calculate movement cost for a unit entering a tile.
 * Roads/railroads reduce cost; terrain type determines base cost.
 *
 * @param {number} unitType - unit type ID
 * @param {object} mapBase - accessor functions (getTerrain, getImprovements)
 * @param {number} fromGx - source tile gx
 * @param {number} fromGy - source tile gy
 * @param {number} toGx - destination tile gx
 * @param {number} toGy - destination tile gy
 * @returns {number} cost in movement thirds (MOVEMENT_MULTIPLIER units)
 */
export function moveCost(unitType, mapBase, fromGx, fromGy, toGx, toGy) {
  const domain = UNIT_DOMAIN[unitType] ?? 0;

  // Sea units: 1 MP per tile
  if (domain === 1) return MOVEMENT_MULTIPLIER;
  // Air units: 1 MP per tile
  if (domain === 2) return MOVEMENT_MULTIPLIER;

  const fromImp = mapBase.getImprovements(fromGx, fromGy);
  const toImp = mapBase.getImprovements(toGx, toGy);

  // Railroad: both tiles have railroad → 0 cost (free move)
  if (fromImp.railroad && toImp.railroad) return 0;

  // Road or river: both tiles connected by road/railroad/river → 1/3 MP
  // Rivers only connect along diagonal edges (NE/SE/SW/NW in iso space),
  // so river bonus only applies for ±1 row moves, not N/S (±2 rows) or E/W
  const dgy = toGy - fromGy;
  const isDiagonal = (dgy === 1 || dgy === -1);
  const fromHasRoad = fromImp.road || fromImp.railroad || (isDiagonal && mapBase.hasRiver(fromGx, fromGy));
  const toHasRoad = toImp.road || toImp.railroad || (isDiagonal && mapBase.hasRiver(toGx, toGy));
  if (fromHasRoad && toHasRoad) return 1;

  // Base terrain cost
  const terrain = mapBase.getTerrain(toGx, toGy);
  return (TERRAIN_MOVE_COST[terrain] ?? 1) * MOVEMENT_MULTIPLIER;
}

/**
 * Get direction from one tile to an adjacent tile.
 * Returns null if tiles are not adjacent.
 *
 * @param {number} fromGx
 * @param {number} fromGy
 * @param {number} toGx
 * @param {number} toGy
 * @param {object} [mapBase] - optional, for wrapping support { mw, wraps }
 * @returns {string|null} direction name or null
 */
export function getDirection(fromGx, fromGy, toGx, toGy, mapBase) {
  const offsets = (fromGy % 2 === 0) ? DIR_OFFSETS_EVEN : DIR_OFFSETS_ODD;
  const dgx = toGx - fromGx;
  const dgy = toGy - fromGy;
  for (const [dir, [ox, oy]] of Object.entries(offsets)) {
    if (ox === dgx && oy === dgy) return dir;
  }
  // Check wrap-around adjacency
  if (mapBase?.wraps && mapBase.mw) {
    for (const [dir, [ox, oy]] of Object.entries(offsets)) {
      if (oy !== dgy) continue;
      if (((dgx % mapBase.mw) + mapBase.mw) % mapBase.mw === ((ox % mapBase.mw) + mapBase.mw) % mapBase.mw) return dir;
    }
  }
  return null;
}

/**
 * Check if movement from→to is blocked by Zone of Control.
 * ZOC rule: if a unit is adjacent to an enemy combat unit, it can only move to:
 *   - tiles with friendly units/cities, OR
 *   - tiles NOT adjacent to enemy combat units
 * Air units, sea units, diplomats, settlers etc. with UNIT_IGNORE_ZOC=1 skip this check.
 *
 * @param {number} unitType - unit type ID
 * @param {number} owner - civ slot of the moving unit
 * @param {number} fromGx - source tile gx
 * @param {number} fromGy - source tile gy
 * @param {number} toGx - destination tile gx
 * @param {number} toGy - destination tile gy
 * @param {object} mapBase - map accessor object (needs getNeighbors, tileData)
 * @param {Array} units - all units array
 * @returns {boolean} true if movement is blocked by ZOC
 */
export function isZOCBlocked(unitType, owner, fromGx, fromGy, toGx, toGy, mapBase, units) {
  // Units that ignore ZOC
  if (UNIT_IGNORE_ZOC[unitType]) return false;

  const domain = UNIT_DOMAIN[unitType] ?? 0;

  // Check if 'from' tile is adjacent to enemy combat unit of same domain
  const fromNeighbors = mapBase.getNeighbors(fromGx, fromGy);
  let fromAdjacentToEnemy = false;
  for (const dir in fromNeighbors) {
    const [nx, ny] = fromNeighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    if (hasEnemyCombatUnit(nx, ny, owner, domain, units)) {
      fromAdjacentToEnemy = true;
      break;
    }
  }

  // If not adjacent to enemy, ZOC doesn't restrict
  if (!fromAdjacentToEnemy) return false;

  // We're adjacent to enemy — check if destination is friendly or not adjacent to enemy
  // Friendly = has own unit or own city
  if (hasFriendlyPresence(toGx, toGy, owner, units, mapBase)) return false;

  // Check if destination is adjacent to enemy combat unit
  const toNeighbors = mapBase.getNeighbors(toGx, toGy);
  for (const dir in toNeighbors) {
    const [nx, ny] = toNeighbors[dir];
    if (ny < 0 || ny >= mapBase.mh) continue;
    if (hasEnemyCombatUnit(nx, ny, owner, domain, units)) {
      return true; // blocked by ZOC
    }
  }

  return false;
}

function hasEnemyCombatUnit(gx, gy, owner, domain, units) {
  for (const u of units) {
    if (u.gx === gx && u.gy === gy && u.owner !== owner && u.gx >= 0
        && UNIT_DOMAIN[u.type] === domain && (UNIT_ATK[u.type] || 0) > 0) {
      return true;
    }
  }
  return false;
}

function hasFriendlyPresence(gx, gy, owner, units, mapBase) {
  // Check for friendly unit
  for (const u of units) {
    if (u.gx === gx && u.gy === gy && u.owner === owner && u.gx >= 0) return true;
  }
  // Check for friendly city
  if (mapBase.tileData) {
    const idx = gy * mapBase.mw + gx;
    const tile = mapBase.tileData[idx];
    if (tile && tile.improvements && tile.improvements.city) {
      if (tile.tileOwnership === owner) return true;
    }
  }
  return false;
}
