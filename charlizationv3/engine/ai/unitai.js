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
  UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_ROLE, UNIT_NAMES,
  BUSY_ORDERS, TERRAIN_DEFENSE, UNIT_NEGATES_WALLS,
} from '../defs.js';

// ── Constants ─────────────────────────────────────────────────────

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/** BFS search limit for exploration. */
const EXPLORE_RADIUS = 20;

/** Maximum tiles to search when looking for enemy targets. */
const TARGET_SEARCH_RADIUS = 8;

/**
 * Win probability thresholds for AI attack decisions.
 * Based on effectiveATK / (effectiveATK + effectiveDEF) formula.
 * Aggressive AI attacks at lower win probability; cautious at higher.
 */
const ATTACK_THRESHOLD_AGGRESSIVE = 0.4;
const ATTACK_THRESHOLD_CAUTIOUS = 0.6;
const ATTACK_THRESHOLD_DEFAULT = 0.45;

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
 * Compute approximate win probability for an attacker vs a defender.
 * Uses the Civ2 combat model: each round, attacker wins with probability
 * effATK / (effATK + effDEF). Overall win probability is approximated
 * from the strength ratio.
 *
 * Returns a number between 0 and 1.
 */
function estimateWinProbability(attacker, defenderUnit, defTerrain, hasCityWalls, attackerNegatesWalls) {
  // Effective ATK: base * HP ratio * veteran
  const baseAtk = UNIT_ATK[attacker.type] || 1;
  const atkMaxHp = UNIT_HP[attacker.type] || 1;
  const atkCurHp = Math.max(1, atkMaxHp - (attacker.hpLost || 0));
  const atkFp = UNIT_FP[attacker.type] || 1;
  let effAtk = baseAtk * 8;
  if (attacker.veteran) effAtk = Math.floor(effAtk * 1.5);

  // Effective DEF: base * terrain * veteran * fortification * city walls
  const baseDef = UNIT_DEF[defenderUnit.type] || 1;
  const defMaxHp = UNIT_HP[defenderUnit.type] || 1;
  const defCurHp = Math.max(1, defMaxHp - (defenderUnit.hpLost || 0));
  const defFp = UNIT_FP[defenderUnit.type] || 1;
  const terrMul = TERRAIN_DEFENSE[defTerrain] ?? 2;
  let effDef = baseDef * terrMul * 4;
  if (defenderUnit.veteran) effDef = Math.floor(effDef * 1.5);
  if (defenderUnit.orders === 'fortified') effDef = Math.floor(effDef * 1.5);
  if (hasCityWalls && !attackerNegatesWalls) effDef *= 3;

  if (effAtk <= 0) return 0;
  if (effDef <= 0) return 1;

  // Per-round win probability
  const pRound = effAtk / (effAtk + effDef);

  // Approximate overall win probability considering HP and firepower.
  // Attacker needs ceil(defCurHp*10 / (atkFp*10)) = ceil(defCurHp/atkFp) hits to win.
  // Defender needs ceil(atkCurHp*10 / (defFp*10)) = ceil(atkCurHp/defFp) hits to win.
  const atkHitsNeeded = Math.ceil(defCurHp / Math.max(1, atkFp));
  const defHitsNeeded = Math.ceil(atkCurHp / Math.max(1, defFp));

  // Use the negative hypergeometric approximation:
  // P(attacker wins) ≈ sum of binomial-like terms, but a good approximation is:
  // P ≈ pRound^atkHitsNeeded / (pRound^atkHitsNeeded + (1-pRound)^defHitsNeeded)
  // This is the "race" approximation.
  const pA = Math.pow(pRound, atkHitsNeeded);
  const pD = Math.pow(1 - pRound, defHitsNeeded);
  if (pA + pD === 0) return 0.5;
  return pA / (pA + pD);
}

/**
 * Should this attacker attack the defender on that tile?
 * Computes approximate win probability and compares against threshold.
 * @param {object} attacker - attacking unit
 * @param {object} defenderInfo - { unit, index, defStr } from bestDefenderOnTile
 * @param {boolean} attackerNegatesWalls - does attacker negate city walls
 * @param {number} defTerrain - terrain at defender tile
 * @param {boolean} hasCityWalls - does the tile have city walls
 * @param {string} [posture] - 'attack' for aggressive, 'defend' for cautious
 */
function shouldAttack(attacker, defenderInfo, attackerNegatesWalls, defTerrain, hasCityWalls, posture) {
  if (defenderInfo.defStr <= 0) return true; // undefended tile

  const winProb = estimateWinProbability(
    attacker, defenderInfo.unit, defTerrain ?? 0,
    hasCityWalls ?? false, attackerNegatesWalls
  );

  // Choose threshold based on strategic posture
  let threshold;
  if (posture === 'attack') threshold = ATTACK_THRESHOLD_AGGRESSIVE;
  else if (posture === 'defend' || posture === 'turtle') threshold = ATTACK_THRESHOLD_CAUTIOUS;
  else threshold = ATTACK_THRESHOLD_DEFAULT;

  return winProb >= threshold;
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

  // For land units, get our bodyId to filter unreachable targets
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(startGx, startGy) : -1;

  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === civSlot) continue;
    if (!isAtWar(gameState, civSlot, city.owner)) continue;

    const dist = tileDist(startGx, startGy, city.gx, city.gy, mapBase);
    if (dist <= maxRadius * 2 && dist < bestDist) {
      if (domain === 0) {
        // Skip cities on ocean tiles
        const cityTerrain = mapBase.getTerrain(city.gx, city.gy);
        if (cityTerrain === 10) continue;
        // Skip cities on different landmass (unreachable without naval transport)
        const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
        if (unitBodyId > 0 && cityBodyId > 0 && cityBodyId !== unitBodyId) continue;
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

  // For land units, get our bodyId to filter unreachable targets
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(startGx, startGy) : -1;

  for (let i = 0; i < gameState.units.length; i++) {
    const u = gameState.units[i];
    if (u.gx < 0 || u.owner === civSlot) continue;
    if (!isAtWar(gameState, civSlot, u.owner)) continue;

    const dist = tileDist(startGx, startGy, u.gx, u.gy, mapBase);
    if (dist <= maxRadius * 2 && dist < bestDist) {
      // For land units, skip targets on different landmass
      if (domain === 0) {
        const targetTerrain = mapBase.getTerrain(u.gx, u.gy);
        if (targetTerrain === 10) continue;
        const targetBodyId = mapBase.getBodyId(u.gx, u.gy);
        if (unitBodyId > 0 && targetBodyId > 0 && targetBodyId !== unitBodyId) continue;
      }
      bestDist = dist;
      best = { unit: u, index: i, gx: u.gx, gy: u.gy, dist: bestDist };
    }
  }

  return best;
}

/**
 * Get the direction from (fromGx, fromGy) toward (toGx, toGy).
 * Picks the adjacent tile closest to the target.
 *
 * Optional domain parameter adds terrain passability filtering:
 *   domain 0 (land): skip ocean tiles (terrain 10)
 *   domain 1 (sea):  skip land tiles (terrain !== 10)
 *   domain 2 (air):  no filtering
 *   domain -1 or omitted: no filtering (legacy behavior)
 */
function directionToward(mapBase, fromGx, fromGy, toGx, toGy, domain = -1) {
  // Check if target is directly adjacent first
  const direct = getDirection(fromGx, fromGy, toGx, toGy, mapBase);
  if (direct) {
    // Even for adjacent tiles, respect domain constraints
    if (domain >= 0 && domain <= 1) {
      const dest = resolveDirection(fromGx, fromGy, direct, mapBase);
      if (dest) {
        const terrain = mapBase.getTerrain(dest.gx, dest.gy);
        if (domain === 0 && terrain === 10) return null;
        if (domain === 1 && terrain !== 10) return null;
      }
    }
    return direct;
  }

  const neighbors = mapBase.getNeighbors(fromGx, fromGy);
  let bestDir = null;
  let bestDist = Infinity;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);

    // Domain passability check
    if (domain >= 0 && domain <= 1) {
      const terrain = mapBase.getTerrain(wnx, ny);
      if (domain === 0 && terrain === 10) continue;
      if (domain === 1 && terrain !== 10) continue;
    }

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

    if (bestTarget) {
      const defTerrain = mapBase.getTerrain(bestTarget.gx, bestTarget.gy);
      const defCity = gameState.cities.find(c => c.gx === bestTarget.gx && c.gy === bestTarget.gy && c.size > 0);
      const defWalls = defCity ? (defCity.buildings?.has(8) || false) : false;
      const posture = strategy?.militaryPosture || 'expand';
      if (shouldAttack(unit, bestTarget.defender, negatesWalls, defTerrain, defWalls, posture)) {
        return { type: 'MOVE_UNIT', unitIndex, dir: bestTarget.dir };
      }
    }
  }

  // 2. Move toward nearest enemy city
  const enemyCity = findNearestEnemyCity(gameState, mapBase, unit.gx, unit.gy, civSlot, domain);
  if (enemyCity) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy, enemyCity.gx, enemyCity.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    // If safe path blocked, try direct path (willing to walk near enemies when attacking)
    const directDir = directionToward(mapBase, unit.gx, unit.gy, enemyCity.gx, enemyCity.gy, domain);
    if (directDir) return { type: 'MOVE_UNIT', unitIndex, dir: directDir };
  }

  // 3. Move toward nearest enemy unit
  const enemyUnit = findNearestEnemyUnit(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, 12);
  if (enemyUnit) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy, enemyUnit.gx, enemyUnit.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    // Fallback: direct path toward enemy unit (attackers accept risk)
    const directDir = directionToward(mapBase, unit.gx, unit.gy, enemyUnit.gx, enemyUnit.gy, domain);
    if (directDir) return { type: 'MOVE_UNIT', unitIndex, dir: directDir };
  }

  // 4a. Goody hut priority (#9): move toward nearby goody huts
  if (domain === 0) {
    const goody = findNearestGoodyHut(mapBase, unit.gx, unit.gy, civSlot, 8);
    if (goody) {
      const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy, goody.gx, goody.gy, unit, civSlot);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }
  }

  // 4b. Explore
  const unexplored = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, domain);
  if (unexplored) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy, unexplored.gx, unexplored.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    // Fallback: direct path ignoring enemies (but still respecting domain)
    const directDir = directionToward(mapBase, unit.gx, unit.gy, unexplored.gx, unexplored.gy, domain);
    if (directDir) return { type: 'MOVE_UNIT', unitIndex, dir: directDir };
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
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(unit.gx, unit.gy) : -1;
  let nearestCity = null;
  let nearestDist = Infinity;
  for (const city of gameState.cities) {
    if (!city || city.owner !== civSlot || city.size <= 0) continue;
    // For land units, only consider cities on the same landmass
    if (domain === 0 && unitBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== unitBodyId) continue;
    }
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

    if (bestTarget) {
      const defTerrain = mapBase.getTerrain(bestTarget.gx, bestTarget.gy);
      const defCity = gameState.cities.find(c => c.gx === bestTarget.gx && c.gy === bestTarget.gy && c.size > 0);
      const defWalls = defCity ? (defCity.buildings?.has(8) || false) : false;
      if (shouldAttack(unit, bestTarget.defender, false, defTerrain, defWalls, 'attack')) {
        return { type: 'MOVE_UNIT', unitIndex, dir: bestTarget.dir };
      }
    }
  }

  // 2. Move toward nearest enemy ship
  const enemyShip = findNearestEnemyUnit(gameState, mapBase, unit.gx, unit.gy, civSlot, 1, 10);
  if (enemyShip) {
    const dir = directionToward(mapBase, unit.gx, unit.gy, enemyShip.gx, enemyShip.gy, 1);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // 3. Explore sea
  const unexplored = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, 1, 15);
  if (unexplored) {
    const dir = directionToward(mapBase, unit.gx, unit.gy, unexplored.gx, unexplored.gy, 1);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
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
 *
 * Basic transport coordination:
 * 1. If carrying units and near land with enemy targets, move toward coast
 * 2. If carrying units, move toward the destination continent
 * 3. If empty, move toward a coastal city where land units are waiting
 * 4. If nothing to do, patrol near coastal cities
 */
function aiTransport(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // Check if we're carrying any units (units at same tile with domain 0)
  const cargoHere = unitsAt(spatialIdx, unit.gx, unit.gy).filter(
    e => e.unit.owner === civSlot && (UNIT_DOMAIN[e.unit.type] ?? 0) === 0 && e.index !== unitIndex
  );
  const isCarrying = cargoHere.length > 0;

  if (isCarrying) {
    // We have cargo — find the nearest enemy city or own city on a different landmass
    // to deliver troops to. Move toward adjacent land tiles near that target.
    let bestTarget = null;
    let bestDist = Infinity;

    // Prefer enemy cities for attack delivery
    for (const city of gameState.cities) {
      if (!city || city.size <= 0 || city.gx < 0) continue;
      if (city.owner === civSlot) continue;
      if (!isAtWar(gameState, civSlot, city.owner)) continue;
      const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
      if (dist < bestDist) {
        bestDist = dist;
        bestTarget = { gx: city.gx, gy: city.gy };
      }
    }

    // Fallback: own cities on different landmass
    if (!bestTarget) {
      for (const city of gameState.cities) {
        if (!city || city.size <= 0 || city.gx < 0) continue;
        if (city.owner !== civSlot) continue;
        const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
        if (dist > 6 && dist < bestDist) {
          bestDist = dist;
          bestTarget = { gx: city.gx, gy: city.gy };
        }
      }
    }

    if (bestTarget) {
      // Move toward target, staying on ocean tiles (domain 1)
      const dir = directionToward(mapBase, unit.gx, unit.gy, bestTarget.gx, bestTarget.gy, 1);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
      // If blocked on sea-only path, try any direction toward target
      const anyDir = directionToward(mapBase, unit.gx, unit.gy, bestTarget.gx, bestTarget.gy, -1);
      if (anyDir) return { type: 'MOVE_UNIT', unitIndex, dir: anyDir };
    }
  } else {
    // Empty transport — move toward a coastal city where land units need transport
    // Look for our land units on coast tiles (adjacent to ocean) that don't have
    // enemy targets on their same landmass
    let bestPort = null;
    let bestPortDist = Infinity;

    for (const city of gameState.cities) {
      if (!city || city.owner !== civSlot || city.size <= 0) continue;
      // Check if city is coastal (has adjacent ocean)
      const neighbors = mapBase.getNeighbors(city.gx, city.gy);
      let coastal = false;
      for (const dir in neighbors) {
        const [nx, ny] = neighbors[dir];
        if (!inBounds(nx, ny, mapBase)) continue;
        const wnx = wrapX(nx, mapBase);
        if (mapBase.getTerrain(wnx, ny) === 10) { coastal = true; break; }
      }
      if (!coastal) continue;

      // Check if there are land combat units here that might want transport
      const unitsHere = unitsAt(spatialIdx, city.gx, city.gy);
      const landCombat = unitsHere.filter(e =>
        e.unit.owner === civSlot && (UNIT_DOMAIN[e.unit.type] ?? 0) === 0 &&
        (UNIT_ATK[e.unit.type] || 0) > 0
      );
      if (landCombat.length === 0) continue;

      const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
      if (dist < bestPortDist) {
        bestPortDist = dist;
        bestPort = city;
      }
    }

    if (bestPort) {
      // Move toward port city, preferring ocean path
      const dir = directionToward(mapBase, unit.gx, unit.gy, bestPort.gx, bestPort.gy, 1);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
      // Allow land-adjacent movement to reach port
      const anyDir = directionToward(mapBase, unit.gx, unit.gy, bestPort.gx, bestPort.gy, -1);
      if (anyDir) return { type: 'MOVE_UNIT', unitIndex, dir: anyDir };
    }
  }

  // Fallback: patrol near own coastal cities
  let nearestCoastal = null;
  let nearestCoastalDist = Infinity;
  for (const city of gameState.cities) {
    if (!city || city.owner !== civSlot || city.size <= 0) continue;
    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
    if (dist < nearestCoastalDist) {
      nearestCoastalDist = dist;
      nearestCoastal = city;
    }
  }
  if (nearestCoastal && nearestCoastalDist > 4) {
    const dir = directionToward(mapBase, unit.gx, unit.gy, nearestCoastal.gx, nearestCoastal.gy, 1);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // Random sea movement
  return randomMove(unit, unitIndex, mapBase, 1) || { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
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
  // For land traders, only target cities on the same landmass
  const traderBodyId = (domain === 0) ? mapBase.getBodyId(unit.gx, unit.gy) : -1;
  let bestCity = null;
  let bestDist = Infinity;

  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === civSlot) continue;
    if (isAtWar(gameState, civSlot, city.owner)) continue; // skip enemy cities
    // Skip cities on different landmass for land traders
    if (domain === 0 && traderBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== traderBodyId) continue;
    }

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
      // Skip cities on different landmass for land traders
      if (domain === 0 && traderBodyId > 0) {
        const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
        if (cityBodyId > 0 && cityBodyId !== traderBodyId) continue;
      }
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
export function generateMilitaryActions(gameState, mapBase, civSlot, strategy, debugLog = null) {
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
      if (debugLog) {
        const uName = UNIT_NAMES[unit.type] || `type#${unit.type}`;
        if (action.type === 'MOVE_UNIT') {
          // Determine what the unit is doing based on context
          const dest = resolveDirection(unit.gx, unit.gy, action.dir, mapBase);
          const destStr = dest ? `(${dest.gx},${dest.gy})` : action.dir;
          // Check if there's an enemy at destination (attack)
          const destEntries = dest ? unitsAt(spatialIdx, dest.gx, dest.gy) : [];
          const enemyAtDest = destEntries.some(e => e.unit.owner !== civSlot);
          if (enemyAtDest) {
            const defender = destEntries.find(e => e.unit.owner !== civSlot);
            const defName = defender ? (UNIT_NAMES[defender.unit.type] || `type#${defender.unit.type}`) : 'enemy';
            const atkStr = attackStrength(unit);
            debugLog.push(`UNIT: ${uName} #${i} at (${unit.gx},${unit.gy}): attacking ${defName} at ${destStr}, atk=${atkStr}`);
          } else {
            debugLog.push(`UNIT: ${uName} #${i} at (${unit.gx},${unit.gy}): moving ${action.dir} to ${destStr}`);
          }
        } else if (action.type === 'UNIT_ORDER') {
          debugLog.push(`UNIT: ${uName} #${i} at (${unit.gx},${unit.gy}): order=${action.order}`);
        }
      }
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
export function generateCleanupActions(gameState, mapBase, civSlot, strategy, debugLog = null, handledUnits = null) {
  const actions = [];

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;
    if (BUSY_ORDERS.has(unit.orders)) continue;

    // Skip units already given an action by an earlier phase
    if (handledUnits && handledUnits.has(i)) continue;

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

    // (#22) Non-city idle units: prefer sentry (dimmed on map, wakes on enemy approach)
    // over skip (which does nothing). Sentry saves the player from re-evaluating
    // the unit each turn and provides visual feedback that the unit is idle.
    if (domain === 0 && (UNIT_DEF[unit.type] || 0) > 0) {
      const sentryAction = { type: 'UNIT_ORDER', unitIndex: i, order: 'sentry' };
      const sentryErr = validateAction(gameState, mapBase, sentryAction, civSlot);
      if (!sentryErr) {
        actions.push(sentryAction);
        continue;
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
