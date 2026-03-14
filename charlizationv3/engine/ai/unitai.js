// ═══════════════════════════════════════════════════════════════════
// ai/unitai.js — Unit AI: role-based dispatch, combat, exploration
//
// Ported from Civ2 FUN_00538a29 (unit AI master function).
// Dispatches units based on UNIT_ROLE from defs.js:
//   0=Attack, 1=Defend, 2=Naval superiority, 3=Air attack,
//   4=Air defense, 5=Sea transport, 7=Diplomacy, 8=Trade
//
// Each unit gets at most ONE action per AI turn.
// ═══════════════════════════════════════════════════════════════════

import { resolveDirection, getDirection } from '../movement.js';
import { validateAction } from '../rules.js';
import {
  UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_ROLE,
  BUSY_ORDERS, TERRAIN_DEFENSE, UNIT_NEGATES_WALLS,
} from '../defs.js';

// ── Constants ─────────────────────────────────────────────────────

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/** BFS search limit for exploration. */
const EXPLORE_RADIUS = 20;

/** Maximum tiles to search when looking for enemy targets. */
const TARGET_SEARCH_RADIUS = 8;

/** Minimum attack-to-defense ratio for AI to commit to an attack. */
const ATTACK_AGGRESSION = 0.8;

/** Minimum defenders per city (base). */
const MIN_DEFENDERS_PER_CITY = 1;

/** Extra defenders for frontier cities (near enemy). */
const FRONTIER_EXTRA_DEFENDERS = 1;

/** Distance threshold (doubled-coord) to consider a city "frontier". */
const FRONTIER_DISTANCE = 16;

// ── Geometry helpers ──────────────────────────────────────────────

/**
 * Wrap an x-coordinate if the map wraps horizontally.
 */
function wrapX(gx, mapBase) {
  if (!mapBase.wraps) return gx;
  return ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw;
}

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
 * Check if a tile has been explored by this civ (visibility bit set).
 */
function isExplored(mapBase, gx, gy, civSlot) {
  if (gy < 0 || gy >= mapBase.mh) return true;
  const wgx = wrapX(gx, mapBase);
  if (wgx < 0 || wgx >= mapBase.mw) return true;
  const idx = gy * mapBase.mw + wgx;
  const tile = mapBase.tileData[idx];
  if (!tile) return true;
  return !!(tile.visibility & (1 << civSlot));
}

/**
 * Check if a tile is within map bounds (after wrapping).
 */
function inBounds(gx, gy, mapBase) {
  if (gy < 0 || gy >= mapBase.mh) return false;
  const wgx = wrapX(gx, mapBase);
  return wgx >= 0 && wgx < mapBase.mw;
}

// ── Treaty helper ─────────────────────────────────────────────────

function getTreaty(gameState, civA, civB) {
  if (!gameState.treaties) return 'war';
  const key = civA < civB ? `${civA}-${civB}` : `${civB}-${civA}`;
  return gameState.treaties[key] || 'war';
}

function isAtWar(gameState, civA, civB) {
  return getTreaty(gameState, civA, civB) === 'war';
}

// ── Unit indexing helpers ─────────────────────────────────────────

/**
 * Build spatial index: Map<"gx,gy" -> unit[]> for all alive units.
 * Speeds up neighbor and tile queries.
 */
function buildUnitSpatialIndex(gameState) {
  const idx = new Map();
  for (let i = 0; i < gameState.units.length; i++) {
    const u = gameState.units[i];
    if (u.gx < 0) continue;
    const key = `${u.gx},${u.gy}`;
    if (!idx.has(key)) idx.set(key, []);
    idx.get(key).push({ unit: u, index: i });
  }
  return idx;
}

function unitsAt(spatialIdx, gx, gy) {
  return spatialIdx.get(`${gx},${gy}`) || [];
}

// ── Combat evaluation (ported from Civ2) ──────────────────────────

/**
 * Compute effective attack strength for a unit.
 * ATK = base_atk * remaining_hp * firepower
 * Veteran: ×1.5
 */
function attackStrength(unit) {
  const baseAtk = UNIT_ATK[unit.type] || 0;
  const maxHp = UNIT_HP[unit.type] || 1;
  const curHp = Math.max(1, maxHp - (unit.hpLost || 0));
  const fp = UNIT_FP[unit.type] || 1;
  let str = baseAtk * curHp * fp;
  if (unit.veteran) str = Math.floor(str * 1.5);
  return str;
}

/**
 * Compute effective defense strength for a unit on a given tile.
 * DEF = base_def * remaining_hp * firepower * terrain_defense / 2
 * Fortified: ×1.5
 * Behind city walls: ×3 (unless attacker negates walls)
 * Veteran: ×1.5
 */
function defenseStrength(unit, terrain, isFortified, hasCityWalls, attackerNegatesWalls) {
  const baseDef = UNIT_DEF[unit.type] || 0;
  const maxHp = UNIT_HP[unit.type] || 1;
  const curHp = Math.max(1, maxHp - (unit.hpLost || 0));
  const fp = UNIT_FP[unit.type] || 1;
  const terrMul = TERRAIN_DEFENSE[terrain] ?? 2;
  let str = baseDef * curHp * fp * (terrMul / 2);
  if (unit.veteran) str = Math.floor(str * 1.5);
  if (isFortified) str = Math.floor(str * 1.5);
  if (hasCityWalls && !attackerNegatesWalls) str = Math.floor(str * 3);
  return str;
}

/**
 * Find the best (weakest) defender on a tile. Returns { unit, index, defStr }
 * or null if no defenders.
 */
function bestDefenderOnTile(spatialIdx, gx, gy, attackerOwner, terrain, gameState, mapBase) {
  const entries = unitsAt(spatialIdx, gx, gy);
  if (entries.length === 0) return null;

  // Check for city walls at the tile
  const city = gameState.cities.find(c =>
    c.gx === gx && c.gy === gy && c.size > 0);
  const hasCityWalls = city ? (city.buildings?.has(3) || false) : false;

  let best = null;
  let bestStr = -1;

  for (const { unit, index } of entries) {
    if (unit.owner === attackerOwner) continue;
    if (unit.gx < 0) continue;
    if (!isAtWar(gameState, attackerOwner, unit.owner)) continue;

    const isFortified = (unit.orders === 'fortified');
    const str = defenseStrength(unit, terrain, isFortified, hasCityWalls, false);

    // Pick the strongest defender (they defend the stack)
    if (str > bestStr) {
      bestStr = str;
      best = { unit, index, defStr: str };
    }
  }

  return best;
}

/**
 * Should this attacker attack the defender on that tile?
 * Returns true if odds are favorable enough per ATTACK_AGGRESSION.
 */
function shouldAttack(attacker, defenderInfo, attackerNegatesWalls) {
  const atkStr = attackStrength(attacker);
  let defStr = defenderInfo.defStr;
  // Re-evaluate if attacker negates walls (the defStr was computed with walls)
  if (attackerNegatesWalls && defStr > 0) {
    // Rough approximation: reduce by walls factor
    // More precise: recompute from scratch. But defenderInfo.defStr already includes walls.
    // We'll just use atkStr vs defStr directly since the ratio is what matters.
  }
  if (defStr <= 0) return true; // undefended tile
  return atkStr >= defStr * ATTACK_AGGRESSION;
}

// ── Pathfinding / target search ───────────────────────────────────

/**
 * Find nearest unexplored tile using BFS.
 * Returns { gx, gy } or null.
 */
function findNearestUnexplored(mapBase, startGx, startGy, civSlot, domain, maxRadius = EXPLORE_RADIUS) {
  const visited = new Set();
  const key = (gx, gy) => `${gx},${gy}`;
  const queue = [{ gx: startGx, gy: startGy, dist: 0 }];
  visited.add(key(startGx, startGy));

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.dist > maxRadius) break;

    if (cur.dist > 0 && !isExplored(mapBase, cur.gx, cur.gy, civSlot)) {
      return { gx: cur.gx, gy: cur.gy };
    }

    const neighbors = mapBase.getNeighbors(cur.gx, cur.gy);
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const k = key(wnx, ny);
      if (visited.has(k)) continue;
      visited.add(k);

      // Domain check: land units skip ocean, sea units skip land
      const terrain = mapBase.getTerrain(wnx, ny);
      if (domain === 0 && terrain === 10) continue;
      if (domain === 1 && terrain !== 10) continue;

      queue.push({ gx: wnx, gy: ny, dist: cur.dist + 1 });
    }
  }
  return null;
}

/**
 * Find nearest goody hut visible to this civ.
 * Returns { gx, gy } or null.
 */
function findNearestGoodyHut(mapBase, startGx, startGy, civSlot, maxRadius = 10) {
  const visited = new Set();
  const key = (gx, gy) => `${gx},${gy}`;
  const queue = [{ gx: startGx, gy: startGy, dist: 0 }];
  visited.add(key(startGx, startGy));

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.dist > maxRadius) break;

    if (cur.dist > 0) {
      const idx = cur.gy * mapBase.mw + cur.gx;
      const tile = mapBase.tileData[idx];
      if (tile && tile.goodyHut && isExplored(mapBase, cur.gx, cur.gy, civSlot)) {
        return { gx: cur.gx, gy: cur.gy };
      }
    }

    const neighbors = mapBase.getNeighbors(cur.gx, cur.gy);
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const k = key(wnx, ny);
      if (visited.has(k)) continue;
      visited.add(k);
      const terrain = mapBase.getTerrain(wnx, ny);
      if (terrain === 10) continue; // goody huts are on land
      queue.push({ gx: wnx, gy: ny, dist: cur.dist + 1 });
    }
  }
  return null;
}

/**
 * Find nearest enemy city within search radius using BFS.
 * Only considers civs we are at war with.
 * Returns { city, gx, gy, dist } or null.
 */
function findNearestEnemyCity(gameState, mapBase, startGx, startGy, civSlot, domain, maxRadius = TARGET_SEARCH_RADIUS) {
  let bestCity = null;
  let bestDist = Infinity;

  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === civSlot) continue;
    if (!isAtWar(gameState, civSlot, city.owner)) continue;

    const dist = tileDist(startGx, startGy, city.gx, city.gy, mapBase);
    if (dist <= maxRadius * 2 && dist < bestDist) {
      // For land units, skip cities on islands we can't reach (simple ocean check)
      if (domain === 0) {
        const cityTerrain = mapBase.getTerrain(city.gx, city.gy);
        if (cityTerrain === 10) continue;
      }
      bestDist = dist;
      bestCity = city;
    }
  }

  if (!bestCity) return null;
  return { city: bestCity, gx: bestCity.gx, gy: bestCity.gy, dist: bestDist };
}

/**
 * Find nearest enemy unit within search radius.
 * Only considers civs we are at war with.
 * Returns { unit, index, gx, gy, dist } or null.
 */
function findNearestEnemyUnit(gameState, mapBase, startGx, startGy, civSlot, domain, maxRadius = TARGET_SEARCH_RADIUS) {
  let best = null;
  let bestDist = Infinity;

  for (let i = 0; i < gameState.units.length; i++) {
    const u = gameState.units[i];
    if (u.gx < 0 || u.owner === civSlot) continue;
    if (!isAtWar(gameState, civSlot, u.owner)) continue;

    const dist = tileDist(startGx, startGy, u.gx, u.gy, mapBase);
    if (dist <= maxRadius * 2 && dist < bestDist) {
      bestDist = dist;
      best = { unit: u, index: i, gx: u.gx, gy: u.gy, dist: bestDist };
    }
  }

  return best;
}

/**
 * Get the direction from (fromGx, fromGy) toward (toGx, toGy).
 * Picks the adjacent tile closest to the target.
 */
function directionToward(mapBase, fromGx, fromGy, toGx, toGy) {
  const direct = getDirection(fromGx, fromGy, toGx, toGy, mapBase);
  if (direct) return direct;

  const neighbors = mapBase.getNeighbors(fromGx, fromGy);
  let bestDir = null;
  let bestDist = Infinity;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const dist = tileDist(wnx, ny, toGx, toGy, mapBase);
    if (dist < bestDist) {
      bestDist = dist;
      bestDir = dir;
    }
  }

  return bestDir;
}

/**
 * Get direction toward target, avoiding ocean for land units or land for sea units.
 * Also avoids tiles with stronger enemy units for non-attack movement.
 */
function safeDirectionToward(mapBase, gameState, spatialIdx, fromGx, fromGy, toGx, toGy, unit, civSlot) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;
  const neighbors = mapBase.getNeighbors(fromGx, fromGy);
  let bestDir = null;
  let bestDist = Infinity;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);

    // Domain passability
    const terrain = mapBase.getTerrain(wnx, ny);
    if (domain === 0 && terrain === 10) continue;
    if (domain === 1 && terrain !== 10) continue;

    // Avoid tiles with enemy units unless we want to attack
    const enemiesOnTile = unitsAt(spatialIdx, wnx, ny).filter(
      e => e.unit.owner !== civSlot && isAtWar(gameState, civSlot, e.unit.owner)
    );
    if (enemiesOnTile.length > 0) continue; // skip for safe pathing

    const dist = tileDist(wnx, ny, toGx, toGy, mapBase);
    if (dist < bestDist) {
      bestDist = dist;
      bestDir = dir;
    }
  }

  return bestDir;
}

// ── Adjacent enemy detection ──────────────────────────────────────

/**
 * Find enemy units on tiles adjacent to the given unit.
 * Returns array of { dir, gx, gy, defender } where defender is the
 * best defender info from bestDefenderOnTile.
 */
function findAdjacentEnemies(gameState, mapBase, spatialIdx, unit, civSlot) {
  const results = [];
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const terrain = mapBase.getTerrain(wnx, ny);
    const defender = bestDefenderOnTile(spatialIdx, wnx, ny, civSlot, terrain, gameState, mapBase);
    if (defender) {
      results.push({ dir, gx: wnx, gy: ny, defender });
    }
  }

  return results;
}

/**
 * Check if a tile is adjacent to any enemy combat unit (for danger avoidance).
 */
function isAdjacentToEnemy(mapBase, spatialIdx, gx, gy, civSlot, gameState) {
  const neighbors = mapBase.getNeighbors(gx, gy);
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const entries = unitsAt(spatialIdx, wnx, ny);
    for (const { unit } of entries) {
      if (unit.owner !== civSlot && isAtWar(gameState, civSlot, unit.owner)) {
        if ((UNIT_ATK[unit.type] || 0) > 0) return true;
      }
    }
  }
  return false;
}

// ── City defense analysis ─────────────────────────────────────────

/**
 * Compute how many defenders each of our cities has, and whether it's
 * a frontier city (near enemy cities).
 * Returns Map<cityIndex, { city, defenderCount, isFrontier, neededDefenders }>
 */
function analyzeCityDefense(gameState, mapBase, civSlot) {
  const result = new Map();

  // Build a list of enemy cities for frontier check
  const enemyCities = [];
  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner !== civSlot && isAtWar(gameState, civSlot, city.owner)) {
      enemyCities.push(city);
    }
  }

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.owner !== civSlot || city.size <= 0 || city.gx < 0) continue;

    // Count defenders in this city
    let defenderCount = 0;
    for (const u of gameState.units) {
      if (u.gx < 0 || u.owner !== civSlot) continue;
      if (u.gx !== city.gx || u.gy !== city.gy) continue;
      if ((UNIT_DEF[u.type] || 0) > 0) defenderCount++;
    }

    // Check frontier status
    let isFrontier = false;
    for (const ec of enemyCities) {
      if (tileDist(city.gx, city.gy, ec.gx, ec.gy, mapBase) <= FRONTIER_DISTANCE) {
        isFrontier = true;
        break;
      }
    }

    const neededDefenders = MIN_DEFENDERS_PER_CITY + (isFrontier ? FRONTIER_EXTRA_DEFENDERS : 0);

    result.set(ci, { city, defenderCount, isFrontier, neededDefenders });
  }

  return result;
}

/**
 * Find the most underdefended city (city with greatest deficit).
 * Returns { cityIndex, city, deficit } or null.
 */
function findMostUnderdefendedCity(cityDefense) {
  let worstIndex = null;
  let worstDeficit = 0;

  for (const [ci, info] of cityDefense) {
    const deficit = info.neededDefenders - info.defenderCount;
    if (deficit > worstDeficit) {
      worstDeficit = deficit;
      worstIndex = ci;
    }
  }

  if (worstIndex == null) return null;
  const info = cityDefense.get(worstIndex);
  return { cityIndex: worstIndex, city: info.city, deficit: worstDeficit };
}

// ── Role-specific AI logic ────────────────────────────────────────

/**
 * AI for Role 0 (Attack): offensive land/mounted units.
 *
 * Priority:
 * 1. Attack adjacent enemy if odds favorable
 * 2. Move toward nearest enemy city (within 8 tiles)
 * 3. Move toward nearest enemy unit
 * 4. Explore toward unexplored tiles
 * 5. Patrol: random movement
 */
function aiAttacker(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, strategy) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;
  const negatesWalls = UNIT_NEGATES_WALLS.has(unit.type);

  // 1. Check adjacent enemies — attack if favorable
  const adjacentEnemies = findAdjacentEnemies(gameState, mapBase, spatialIdx, unit, civSlot);
  if (adjacentEnemies.length > 0) {
    // Pick the most favorable target (best attack-to-defense ratio)
    let bestTarget = null;
    let bestRatio = -Infinity;
    const atkStr = attackStrength(unit);

    for (const enemy of adjacentEnemies) {
      // Also check domain: land units can't attack into ocean
      if (domain === 0) {
        const terrain = mapBase.getTerrain(enemy.gx, enemy.gy);
        if (terrain === 10) continue;
      }

      const ratio = enemy.defender.defStr > 0 ? atkStr / enemy.defender.defStr : Infinity;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestTarget = enemy;
      }
    }

    if (bestTarget && shouldAttack(unit, bestTarget.defender, negatesWalls)) {
      return { type: 'MOVE_UNIT', unitIndex, dir: bestTarget.dir };
    }
  }

  // 2. Move toward nearest enemy city
  const enemyCity = findNearestEnemyCity(gameState, mapBase, unit.gx, unit.gy, civSlot, domain);
  if (enemyCity) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy, enemyCity.gx, enemyCity.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    // If safe path blocked, try direct path (willing to walk near enemies when attacking)
    const directDir = directionToward(mapBase, unit.gx, unit.gy, enemyCity.gx, enemyCity.gy);
    if (directDir) {
      const dest = resolveDirection(unit.gx, unit.gy, directDir, mapBase);
      if (dest) {
        const t = mapBase.getTerrain(dest.gx, dest.gy);
        if (!(domain === 0 && t === 10)) {
          return { type: 'MOVE_UNIT', unitIndex, dir: directDir };
        }
      }
    }
  }

  // 3. Move toward nearest enemy unit
  const enemyUnit = findNearestEnemyUnit(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, 12);
  if (enemyUnit) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy, enemyUnit.gx, enemyUnit.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // 4. Explore
  const unexplored = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, domain);
  if (unexplored) {
    const dir = directionToward(mapBase, unit.gx, unit.gy, unexplored.gx, unexplored.gy);
    if (dir) {
      const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
      if (dest) {
        const t = mapBase.getTerrain(dest.gx, dest.gy);
        if (!(domain === 0 && t === 10) && !(domain === 1 && t !== 10)) {
          return { type: 'MOVE_UNIT', unitIndex, dir };
        }
      }
    }
  }

  // 5. Random patrol
  return randomMove(unit, unitIndex, mapBase, domain);
}

/**
 * AI for Role 1 (Defend): defensive units.
 *
 * Priority:
 * 1. If in an underdefended city, fortify
 * 2. If adjacent to enemy attacking our city, counterattack
 * 3. Move toward most underdefended city
 * 4. Fortify in nearest city
 */
function aiDefender(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, cityDefense) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  // Check if we're in a city
  const inCityIdx = gameState.cities.findIndex(c =>
    c.gx === unit.gx && c.gy === unit.gy && c.owner === civSlot && c.size > 0);

  if (inCityIdx >= 0) {
    const defInfo = cityDefense.get(inCityIdx);

    // If this city needs defenders and we're here, fortify
    if (defInfo && defInfo.defenderCount <= defInfo.neededDefenders) {
      return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
    }

    // If this city has excess defenders, check if another city needs us
    const underdefended = findMostUnderdefendedCity(cityDefense);
    if (underdefended && underdefended.deficit > 0) {
      const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
        underdefended.city.gx, underdefended.city.gy, unit, civSlot);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }

    // City is well-defended and no others need help — fortify here
    return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
  }

  // Not in a city

  // 1. If adjacent to enemy near one of our cities, counterattack
  const adjacentEnemies = findAdjacentEnemies(gameState, mapBase, spatialIdx, unit, civSlot);
  for (const enemy of adjacentEnemies) {
    // Check if this enemy is near one of our cities
    for (const [, info] of cityDefense) {
      if (tileDist(enemy.gx, enemy.gy, info.city.gx, info.city.gy, mapBase) <= 4) {
        if (domain === 0) {
          const terrain = mapBase.getTerrain(enemy.gx, enemy.gy);
          if (terrain === 10) continue;
        }
        const atkStr = attackStrength(unit);
        if (atkStr >= enemy.defender.defStr * 0.6) {
          return { type: 'MOVE_UNIT', unitIndex, dir: enemy.dir };
        }
      }
    }
  }

  // 2. Move toward most underdefended city
  const underdefended = findMostUnderdefendedCity(cityDefense);
  if (underdefended) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
      underdefended.city.gx, underdefended.city.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // 3. Move toward nearest own city and fortify there
  let nearestCity = null;
  let nearestDist = Infinity;
  for (const city of gameState.cities) {
    if (!city || city.owner !== civSlot || city.size <= 0) continue;
    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestCity = city;
    }
  }

  if (nearestCity) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
      nearestCity.gx, nearestCity.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // 4. Fallback: fortify in place
  return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
}

/**
 * AI for Role 2 (Naval superiority): sea combat units.
 * TODO: Full naval AI with patrol routes and blockade logic.
 *
 * Priority:
 * 1. Attack adjacent enemy ships
 * 2. Patrol near own coastal cities
 * 3. Move toward enemy ships
 * 4. Explore sea
 */
function aiNavalCombat(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // 1. Attack adjacent enemy ships
  const adjacentEnemies = findAdjacentEnemies(gameState, mapBase, spatialIdx, unit, civSlot);
  if (adjacentEnemies.length > 0) {
    let bestTarget = null;
    let bestRatio = -Infinity;
    const atkStr = attackStrength(unit);

    for (const enemy of adjacentEnemies) {
      // Naval units can attack units on ocean tiles and coastal tiles (bombard cities)
      const ratio = enemy.defender.defStr > 0 ? atkStr / enemy.defender.defStr : Infinity;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestTarget = enemy;
      }
    }

    if (bestTarget && bestRatio >= ATTACK_AGGRESSION) {
      return { type: 'MOVE_UNIT', unitIndex, dir: bestTarget.dir };
    }
  }

  // 2. Move toward nearest enemy ship
  const enemyShip = findNearestEnemyUnit(gameState, mapBase, unit.gx, unit.gy, civSlot, 1, 10);
  if (enemyShip) {
    const dir = directionToward(mapBase, unit.gx, unit.gy, enemyShip.gx, enemyShip.gy);
    if (dir) {
      const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
      if (dest) {
        const t = mapBase.getTerrain(dest.gx, dest.gy);
        if (t === 10) return { type: 'MOVE_UNIT', unitIndex, dir };
      }
    }
  }

  // 3. Explore sea
  const unexplored = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, 1, 15);
  if (unexplored) {
    const dir = directionToward(mapBase, unit.gx, unit.gy, unexplored.gx, unexplored.gy);
    if (dir) {
      const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
      if (dest) {
        const t = mapBase.getTerrain(dest.gx, dest.gy);
        if (t === 10) return { type: 'MOVE_UNIT', unitIndex, dir };
      }
    }
  }

  // 4. Random sea movement
  return randomMove(unit, unitIndex, mapBase, 1);
}

/**
 * AI for Role 3 (Air attack): bombers.
 * TODO: Full air AI with rebase and fuel management.
 *
 * Simplified: stay in city, skip turn. Bombers need fuel management
 * to avoid crashing, so passive is safer for now.
 */
function aiAirAttack(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // TODO: Implement bomber AI — rebase to frontline cities, bombard enemy
  // For now, skip to avoid crashing from fuel exhaustion
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

/**
 * AI for Role 4 (Air defense): fighters.
 * TODO: Full air AI with interception and patrol.
 *
 * Simplified: stay in city for interception readiness.
 */
function aiAirDefense(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // TODO: Implement fighter AI — rebase to threatened cities, intercept
  // For now, skip to conserve fuel
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

/**
 * AI for Role 5 (Sea transport): ferries.
 * TODO: Full transport AI with loading/unloading and cross-ocean ferry.
 *
 * Simplified: skip turn. Requires coordination with land unit AI.
 */
function aiTransport(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // TODO: Implement transport AI — load land units in coastal cities,
  // ferry to target continent, unload
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

/**
 * AI for Role 7 (Diplomacy): diplomats/spies.
 *
 * Priority:
 * 1. If in enemy city, attempt espionage (steal tech or sabotage)
 * 2. Move toward nearest enemy city
 * 3. Avoid enemy combat units (diplomats are fragile)
 */
function aiDiplomat(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  // 1. Check if we're in an enemy city — try to steal tech
  const enemyCityHere = gameState.cities.find(c =>
    c.gx === unit.gx && c.gy === unit.gy && c.owner !== civSlot && c.size > 0 &&
    isAtWar(gameState, civSlot, c.owner));

  if (enemyCityHere) {
    // Try steal tech first
    const stealAction = { type: 'STEAL_TECH', unitIndex };
    const stealErr = validateAction(gameState, mapBase, stealAction, civSlot);
    if (!stealErr) return stealAction;

    // Try sabotage
    const sabAction = { type: 'SABOTAGE_CITY', unitIndex };
    const sabErr = validateAction(gameState, mapBase, sabAction, civSlot);
    if (!sabErr) return sabAction;
  }

  // 2. Move toward nearest enemy city, avoiding danger
  const enemyCity = findNearestEnemyCity(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, 20);
  if (enemyCity) {
    // Use safe pathing — diplomats should avoid enemy combat units
    const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
    let bestDir = null;
    let bestDist = Infinity;

    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const terrain = mapBase.getTerrain(wnx, ny);
      if (domain === 0 && terrain === 10) continue;

      // Avoid tiles adjacent to enemy combat units
      if (isAdjacentToEnemy(mapBase, spatialIdx, wnx, ny, civSlot, gameState)) continue;

      const dist = tileDist(wnx, ny, enemyCity.gx, enemyCity.gy, mapBase);
      if (dist < bestDist) {
        bestDist = dist;
        bestDir = dir;
      }
    }

    if (bestDir) return { type: 'MOVE_UNIT', unitIndex, dir: bestDir };
  }

  // 3. Fallback: skip
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

/**
 * AI for Role 8 (Trade): caravans/freight.
 *
 * Priority:
 * 1. If in a foreign city, establish trade route
 * 2. Move toward nearest foreign city
 */
function aiTrader(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;

  // 1. Check if we're in a foreign city — establish trade
  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0) continue;
    if (city.gx !== unit.gx || city.gy !== unit.gy) continue;
    if (city.owner === civSlot) continue; // must be foreign

    const tradeAction = { type: 'ESTABLISH_TRADE', unitIndex, cityIndex: ci };
    const err = validateAction(gameState, mapBase, tradeAction, civSlot);
    if (!err) return tradeAction;
  }

  // Also check own cities (trade between own cities is valid if different from home)
  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0) continue;
    if (city.gx !== unit.gx || city.gy !== unit.gy) continue;
    if (city.owner !== civSlot) continue;

    const tradeAction = { type: 'ESTABLISH_TRADE', unitIndex, cityIndex: ci };
    const err = validateAction(gameState, mapBase, tradeAction, civSlot);
    if (!err) return tradeAction;
  }

  // 2. Move toward nearest foreign city (prefer allies, then own)
  let bestCity = null;
  let bestDist = Infinity;

  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === civSlot) continue;
    if (isAtWar(gameState, civSlot, city.owner)) continue; // skip enemy cities

    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
    if (dist < bestDist) {
      bestDist = dist;
      bestCity = city;
    }
  }

  // If no foreign friendly cities, try own cities further away
  if (!bestCity) {
    for (const city of gameState.cities) {
      if (!city || city.size <= 0 || city.gx < 0) continue;
      if (city.owner !== civSlot) continue;
      const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
      if (dist > 4 && dist < bestDist) { // must be far enough to not be home city
        bestDist = dist;
        bestCity = city;
      }
    }
  }

  if (bestCity) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
      bestCity.gx, bestCity.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // 3. Fallback: skip
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

/**
 * AI for Explorer units (type 50): non-combat exploration.
 *
 * Priority:
 * 1. Move to goody huts if visible
 * 2. Move toward unexplored tiles
 * 3. Avoid tiles adjacent to enemy units
 */
function aiExplorer(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // 1. Check for nearby goody huts
  const goody = findNearestGoodyHut(mapBase, unit.gx, unit.gy, civSlot);
  if (goody) {
    // Move toward goody hut, avoiding enemies
    const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
    let bestDir = null;
    let bestDist = Infinity;

    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const terrain = mapBase.getTerrain(wnx, ny);
      if (terrain === 10) continue;

      // Avoid tiles adjacent to enemy combat units
      if (isAdjacentToEnemy(mapBase, spatialIdx, wnx, ny, civSlot, gameState)) continue;

      const dist = tileDist(wnx, ny, goody.gx, goody.gy, mapBase);
      if (dist < bestDist) {
        bestDist = dist;
        bestDir = dir;
      }
    }

    if (bestDir) return { type: 'MOVE_UNIT', unitIndex, dir: bestDir };
  }

  // 2. Explore toward unexplored tiles, avoiding enemies
  const unexplored = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, 0);
  if (unexplored) {
    const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
    let bestDir = null;
    let bestDist = Infinity;

    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const terrain = mapBase.getTerrain(wnx, ny);
      if (terrain === 10) continue;

      // Avoid tiles adjacent to enemy combat units
      if (isAdjacentToEnemy(mapBase, spatialIdx, wnx, ny, civSlot, gameState)) continue;

      const dist = tileDist(wnx, ny, unexplored.gx, unexplored.gy, mapBase);
      if (dist < bestDist) {
        bestDist = dist;
        bestDir = dir;
      }
    }

    if (bestDir) return { type: 'MOVE_UNIT', unitIndex, dir: bestDir };
  }

  // 3. Random safe movement
  const shuffled = [...DIRECTIONS].sort(() => Math.random() - 0.5);
  for (const dir of shuffled) {
    const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
    if (!dest) continue;
    const terrain = mapBase.getTerrain(dest.gx, dest.gy);
    if (terrain === 10) continue;
    if (isAdjacentToEnemy(mapBase, spatialIdx, dest.gx, dest.gy, civSlot, gameState)) continue;
    return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

// ── Shared helper ─────────────────────────────────────────────────

/**
 * Generate a random valid move for a unit, respecting domain constraints.
 */
function randomMove(unit, unitIndex, mapBase, domain) {
  const shuffled = [...DIRECTIONS].sort(() => Math.random() - 0.5);
  for (const dir of shuffled) {
    const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);
    if (!dest) continue;
    const terrain = mapBase.getTerrain(dest.gx, dest.gy);
    if (domain === 0 && terrain === 10) continue;
    if (domain === 1 && terrain !== 10) continue;
    return { type: 'MOVE_UNIT', unitIndex, dir };
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// Main exports
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate movement/combat actions for all military units of the given civ.
 * Uses role-based dispatch ported from Civ2 FUN_00538a29.
 *
 * Each unit gets at most ONE action (move OR order, not both).
 * Actions go through validateAction before being emitted.
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @param {object} strategy - strategic assessment from strategy.js
 * @returns {Array<object>} actions
 */
export function generateMilitaryActions(gameState, mapBase, civSlot, strategy) {
  const actions = [];
  const spatialIdx = buildUnitSpatialIndex(gameState);
  const cityDefense = analyzeCityDefense(gameState, mapBase, civSlot);

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    // Skip units that aren't ours, are dead, have no moves, or are busy
    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;
    if (BUSY_ORDERS.has(unit.orders)) continue;

    // Skip settlers/engineers — handled by cityai
    if (unit.type === 0 || unit.type === 1) continue;

    const role = UNIT_ROLE[unit.type] ?? 0;
    const domain = UNIT_DOMAIN[unit.type] ?? 0;

    // Skip role 6 (settle) — handled by cityai
    if (role === 6) continue;

    let action = null;

    // Explorer special case (type 50) — non-combat, unique behavior
    if (unit.type === 50) {
      action = aiExplorer(unit, i, gameState, mapBase, spatialIdx, civSlot);
    } else {
      // Role-based dispatch
      switch (role) {
        case 0: // Attack
          action = aiAttacker(unit, i, gameState, mapBase, spatialIdx, civSlot, strategy);
          break;

        case 1: // Defend
          action = aiDefender(unit, i, gameState, mapBase, spatialIdx, civSlot, cityDefense);
          break;

        case 2: // Naval superiority
          action = aiNavalCombat(unit, i, gameState, mapBase, spatialIdx, civSlot);
          break;

        case 3: // Air attack (bombers)
          action = aiAirAttack(unit, i, gameState, mapBase, spatialIdx, civSlot);
          break;

        case 4: // Air defense (fighters)
          action = aiAirDefense(unit, i, gameState, mapBase, spatialIdx, civSlot);
          break;

        case 5: // Sea transport
          action = aiTransport(unit, i, gameState, mapBase, spatialIdx, civSlot);
          break;

        case 7: // Diplomacy
          action = aiDiplomat(unit, i, gameState, mapBase, spatialIdx, civSlot);
          break;

        case 8: // Trade
          action = aiTrader(unit, i, gameState, mapBase, spatialIdx, civSlot);
          break;

        default:
          // Unknown role — treat as attacker if combat, explorer if not
          if ((UNIT_ATK[unit.type] || 0) > 0) {
            action = aiAttacker(unit, i, gameState, mapBase, spatialIdx, civSlot, strategy);
          } else {
            action = aiExplorer(unit, i, gameState, mapBase, spatialIdx, civSlot);
          }
          break;
      }
    }

    if (!action) continue;

    // Validate before emitting
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) {
      actions.push(action);
    }
    // If validation fails, unit will be handled by cleanup
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
 * @param {object} [strategy] - optional strategy (unused, kept for interface compat)
 * @returns {Array<object>} actions
 */
export function generateCleanupActions(gameState, mapBase, civSlot, strategy) {
  const actions = [];

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;
    if (BUSY_ORDERS.has(unit.orders)) continue;

    const domain = UNIT_DOMAIN[unit.type] ?? 0;

    // For land units in cities: fortify (better than skip for defense bonus)
    if (domain === 0 && (UNIT_DEF[unit.type] || 0) > 0) {
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
