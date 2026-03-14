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

import { resolveDirection, getDirection, isZOCBlocked } from '../movement.js';
import { validateAction } from '../rules.js';
import {
  UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_HP, UNIT_FP, UNIT_ROLE, UNIT_NAMES,
  BUSY_ORDERS, TERRAIN_DEFENSE, TERRAIN_MOVE_COST, UNIT_NEGATES_WALLS,
  UNIT_MOVE_POINTS, UNIT_COSTS, GOVT_INDEX,
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
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(unit.gx, unit.gy) : -1;

  // ── Damage level (ported from decompiled local_d8 computation) ──
  // 0 = full HP, 1 = any damage, 2 = below 50% HP, 3 = below 25% HP
  const maxHp = UNIT_HP[unit.type] || 1;
  const curHp = Math.max(1, maxHp - (unit.hpLost || 0));
  let damageLevel = (unit.hpLost || 0) > 0 ? 1 : 0;
  if (curHp * 4 < maxHp) damageLevel = 3;
  else if (curHp * 2 < maxHp) damageLevel = 2;

  // Heavily damaged attackers (< 25% HP) should retreat or skip, not attack
  if (damageLevel >= 3) {
    // Try to retreat to a friendly city
    const retreatCity = _findNearestOwnCity(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, unitBodyId);
    if (retreatCity) {
      const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
        retreatCity.gx, retreatCity.gy, unit, civSlot);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }
    return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
  }

  // ── 1. Evaluate adjacent enemies for attack ──
  // Ported from FUN_00538a29 combat evaluation at LAB_005414d7.
  // For each adjacent tile with an enemy unit, compute a combat score.
  // Attack the best target if our score exceeds the threshold.
  const adjacentEnemies = findAdjacentEnemies(gameState, mapBase, spatialIdx, unit, civSlot);
  if (adjacentEnemies.length > 0) {
    let bestTarget = null;
    let bestCombatScore = -Infinity;

    for (const enemy of adjacentEnemies) {
      // Domain check: land units can't attack into ocean
      if (domain === 0) {
        const terrain = mapBase.getTerrain(enemy.gx, enemy.gy);
        if (terrain === 10) continue;
      }

      // Check if this is a city assault
      const defCity = gameState.cities.find(c =>
        c.gx === enemy.gx && c.gy === enemy.gy && c.size > 0 && c.owner !== civSlot);
      const hasCityWalls = defCity ? (defCity.buildings?.has(3) || false) : false;

      // ── City assault evaluation (ported from decompiled) ──
      // Before attacking a walled city, check if we have enough force.
      // Count our attack units on this tile vs their defense units in the city.
      if (defCity) {
        const cityAssaultOk = _evaluateCityAssault(
          unit, unitIndex, gameState, mapBase, spatialIdx, civSlot,
          enemy.gx, enemy.gy, defCity, hasCityWalls, negatesWalls
        );
        if (!cityAssaultOk) continue; // not enough force, skip this target
      }

      // ── Combat scoring (ported from FUN_00580341 logic) ──
      // Compute effective ATK vs effective DEF using Civ2's fixed-point formula.
      const defTerrain = mapBase.getTerrain(enemy.gx, enemy.gy);
      const score = _computeCombatScore(unit, enemy.defender.unit, defTerrain,
        hasCityWalls, negatesWalls, enemy.defender.unit.orders === 'fortified');

      if (score > bestCombatScore) {
        bestCombatScore = score;
        bestTarget = enemy;
      }
    }

    // Attack if combat score is favorable.
    // The decompiled threshold: effATK * 8 > effDEF * terrain * 4
    // which simplifies to: combat score > 0 means favorable.
    // For damaged units (damageLevel 2), require a higher score.
    const attackThreshold = damageLevel >= 2 ? 4 : 0;
    if (bestTarget && bestCombatScore > attackThreshold) {
      return { type: 'MOVE_UNIT', unitIndex, dir: bestTarget.dir };
    }

    // Even with unfavorable odds, attack undefended cities or very weak targets
    if (bestTarget && bestCombatScore > -4) {
      const defCity = gameState.cities.find(c =>
        c.gx === bestTarget.gx && c.gy === bestTarget.gy && c.size > 0);
      if (defCity) {
        // Attack cities even at slightly unfavorable odds — capturing matters
        return { type: 'MOVE_UNIT', unitIndex, dir: bestTarget.dir };
      }
    }
  }

  // ── 2. Score all enemy cities as potential targets ──
  // Ported from FUN_00538a29 target selection loop (LAB_00539cb3).
  // Score: (citySize * 25 + 50) / (distance + 1)
  //   × 2 if same continent (bodyId match)
  //   + 60 if own attack units already nearby
  //   Skip cities behind peace/ceasefire treaties
  let bestTargetScore = -999;
  let bestTargetCity = null;

  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === civSlot) continue;
    if (!isAtWar(gameState, civSlot, city.owner)) continue;

    // Distance filtering
    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
    if (dist > 30) continue; // don't chase targets across the whole map

    // For land units, prefer same-continent targets
    let sameContinent = true;
    if (domain === 0 && unitBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== unitBodyId) {
        sameContinent = false;
        continue; // land units can't reach different continents without transport
      }
    }

    // ── Target score (ported from decompiled) ──
    let score = ((city.size * 25) + 50) / (dist + 1);

    // Same continent bonus: ×2
    if (sameContinent) score *= 2;

    // Check for own attack units near the target (stack bonus +60)
    const nearbyOwnAttackers = _countOwnAttackersNear(gameState, city.gx, city.gy, civSlot, mapBase);
    if (nearbyOwnAttackers > 0) score += 60;

    // Prefer targets that are closer to our cities (supply line logic)
    const nearestOwnCity = _findNearestOwnCity(gameState, mapBase, city.gx, city.gy, civSlot, domain, -1);
    if (nearestOwnCity) {
      const supplyDist = tileDist(city.gx, city.gy, nearestOwnCity.gx, nearestOwnCity.gy, mapBase);
      if (supplyDist < 8) score += 20;
    }

    // Small random factor (0-4) to prevent identical moves across units
    score += Math.random() * 4;

    if (score > bestTargetScore) {
      bestTargetScore = score;
      bestTargetCity = city;
    }
  }

  // ── 3. Move toward best target ──
  // If we have a target city, use the full 8-direction evaluator from the binary.
  // This evaluates combat opportunities, exploration, terrain, ZOC, etc. all at once.
  if (bestTargetCity) {
    const moveDir = _evaluateDirections(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
      bestTargetCity.gx, bestTargetCity.gy, {
        role: 0, explore: true,
      }
    );
    if (moveDir) return { type: 'MOVE_UNIT', unitIndex, dir: moveDir };
  }

  // ── 4. No target city — look for nearest enemy unit ──
  const enemyUnit = findNearestEnemyUnit(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, 16);
  if (enemyUnit) {
    const moveDir = _evaluateDirections(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
      enemyUnit.gx, enemyUnit.gy, {
        role: 0, explore: true,
      }
    );
    if (moveDir) return { type: 'MOVE_UNIT', unitIndex, dir: moveDir };
  }

  // ── 5. Exploration fallbacks ──
  // Use the full evaluator with no target — it will score exploration lookahead,
  // goody huts, and terrain naturally.
  {
    // Try with a goody hut target first
    let exploreTarget = null;
    if (domain === 0) {
      exploreTarget = findNearestGoodyHut(mapBase, unit.gx, unit.gy, civSlot, 8);
    }
    if (!exploreTarget) {
      exploreTarget = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, domain);
    }

    const moveDir = _evaluateDirections(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
      exploreTarget?.gx ?? null, exploreTarget?.gy ?? null, {
        role: 0, explore: true,
      }
    );
    if (moveDir) return { type: 'MOVE_UNIT', unitIndex, dir: moveDir };
  }

  // 6. Random patrol
  return randomMove(unit, unitIndex, mapBase, domain);
}

// ── aiAttacker helper: compute combat score ─────────────────────────
// Ported from FUN_00580341 and the combat comparison in FUN_00538a29.
// Uses Civ2's fixed-point effective-ATK vs effective-DEF.
// Returns a score: positive = favorable for attacker, negative = unfavorable.
function _computeCombatScore(attacker, defender, defTerrain, hasCityWalls, negatesWalls, defFortified) {
  // Effective ATK: base * 8 * veteran
  const atkBase = UNIT_ATK[attacker.type] || 0;
  const atkMaxHp = UNIT_HP[attacker.type] || 1;
  const atkCurHp = Math.max(1, atkMaxHp - (attacker.hpLost || 0));
  const atkFp = UNIT_FP[attacker.type] || 1;
  let effAtk = atkBase * 8;
  if (attacker.veteran) effAtk = Math.floor(effAtk * 1.5);

  // Effective DEF: base * terrain_defense * 4 * veteran * fortification * walls
  const defBase = UNIT_DEF[defender.type] || 1;
  const defMaxHp = UNIT_HP[defender.type] || 1;
  const defCurHp = Math.max(1, defMaxHp - (defender.hpLost || 0));
  const defFp = UNIT_FP[defender.type] || 1;
  const terrMul = TERRAIN_DEFENSE[defTerrain] ?? 2;
  let effDef = defBase * terrMul * 4;
  if (defender.veteran) effDef = Math.floor(effDef * 1.5);
  if (defFortified) effDef = Math.floor(effDef * 1.5);
  if (hasCityWalls && !negatesWalls) {
    const atkDomain = UNIT_DOMAIN[attacker.type] ?? 0;
    if (atkDomain !== 2) effDef *= 3; // walls don't help vs air
  }

  if (effAtk <= 0) return -999;
  if (effDef <= 0) return 999;

  // Composite combat power: effStat * curHP * firepower
  // This is the core comparison from the decompiled code
  const atkPower = effAtk * atkCurHp * atkFp;
  const defPower = effDef * defCurHp * defFp;

  // Return score as the ratio difference (positive = favorable)
  // Scale so that equal power = 0, double power = ~8
  if (defPower === 0) return 999;
  return Math.floor((atkPower / defPower - 1) * 8);
}

// ── aiAttacker helper: evaluate city assault feasibility ────────────
// Ported from FUN_00538a29 city assault check.
// Counts our units' total attack power vs city's total defense power.
// For walled cities, requires ATK×2 > DEF to proceed.
function _evaluateCityAssault(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot,
                               cityGx, cityGy, defCity, hasCityWalls, negatesWalls) {
  // Count defending units and total defense power in the city
  const defenders = unitsAt(spatialIdx, cityGx, cityGy);
  let totalDefPower = 0;
  let defenderCount = 0;

  const defTerrain = mapBase.getTerrain(cityGx, cityGy);
  for (const { unit: dUnit } of defenders) {
    if (dUnit.owner === civSlot || dUnit.gx < 0) continue;
    if (!isAtWar(gameState, civSlot, dUnit.owner)) continue;
    defenderCount++;
    const dStr = defenseStrength(dUnit, defTerrain,
      dUnit.orders === 'fortified', hasCityWalls, negatesWalls);
    totalDefPower += dStr;
  }

  // Undefended city: always attack
  if (defenderCount === 0) return true;

  // Count our attack units adjacent to (or on same tile as) this target
  // Include the current unit + any other attackers nearby
  let totalAtkPower = attackStrength(unit);

  // Check all 8 adjacent tiles for our attack units
  const neighbors = mapBase.getNeighbors(cityGx, cityGy);
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const entries = unitsAt(spatialIdx, wnx, ny);
    for (const { unit: nearby, index: nIdx } of entries) {
      if (nIdx === unitIndex) continue; // already counted
      if (nearby.owner !== civSlot || nearby.gx < 0) continue;
      if ((UNIT_ATK[nearby.type] || 0) <= 0) continue;
      const nRole = UNIT_ROLE[nearby.type] ?? 0;
      if (nRole !== 0) continue; // only count attack-role units
      totalAtkPower += attackStrength(nearby);
    }
  }

  // City assault threshold:
  // - Without walls: attack if total ATK > DEF * 0.8
  // - With walls (and we can't negate them): attack if total ATK > DEF * 1.5
  // Ported from decompiled: attacker composite > 1.5× defender composite for walled
  if (hasCityWalls && !negatesWalls) {
    return totalAtkPower * 2 > totalDefPower * 3; // ATK > 1.5 × DEF
  }
  return totalAtkPower * 5 > totalDefPower * 4; // ATK > 0.8 × DEF
}

// ── aiAttacker helper: count own attack-role units near a tile ──────
function _countOwnAttackersNear(gameState, gx, gy, civSlot, mapBase) {
  let count = 0;
  for (const u of gameState.units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    if ((UNIT_ATK[u.type] || 0) <= 0) continue;
    const role = UNIT_ROLE[u.type] ?? 0;
    if (role !== 0) continue;
    const dist = tileDist(u.gx, u.gy, gx, gy, mapBase);
    if (dist <= 4) count++;
  }
  return count;
}

// ── aiAttacker helper: find nearest own city ────────────────────────
function _findNearestOwnCity(gameState, mapBase, gx, gy, civSlot, domain, bodyId) {
  let best = null;
  let bestDist = Infinity;
  for (const city of gameState.cities) {
    if (!city || city.owner !== civSlot || city.size <= 0) continue;
    if (domain === 0 && bodyId > 0) {
      const cb = mapBase.getBodyId(city.gx, city.gy);
      if (cb > 0 && cb !== bodyId) continue;
    }
    const d = tileDist(gx, gy, city.gx, city.gy, mapBase);
    if (d < bestDist) {
      bestDist = d;
      best = city;
    }
  }
  return best;
}

// ── Universal 8-direction movement evaluator ─────────────────────────
// Ported from FUN_00538a29 main movement loop (LAB_005414d7, lines 4798-5434).
// This is the core "where do I move?" logic used by ALL unit roles in the
// original Civ2 binary. Each of 8 directions gets scored based on:
//
//   1. Role-specific base score (attack→enemy weakness, defend→friendly cities,
//      explore→unexplored terrain, settle→good sites)
//   2. Terrain movement cost penalty (prefer roads, avoid mountains for fast units)
//   3. Exploration lookahead bonus (4× further in same direction + neighbors)
//   4. Enemy avoidance (non-combat units steer away from hostiles)
//   5. Friendly/enemy city scoring (by role)
//   6. Combat evaluation (full FUN_00580341 equivalent with role-specific bonuses)
//   7. Distance-to-target improvement
//   8. Direction momentum (penalty for sharp turns from last heading)
//   9. Polar penalty (reduce score at map edges)
//  10. Goody hut bonus
//  11. ZOC blocking filter
//  12. Enemy territory avoidance with treaty checks
//  13. Allied territory penalty
//  14. Post-loop movement-cost-vs-combat check
//
// @param {object} unit - the unit to evaluate
// @param {number} unitIndex - unit's index in gameState.units
// @param {object} gameState - current game state
// @param {object} mapBase - immutable map data with accessors
// @param {Map} spatialIdx - spatial index from buildUnitSpatialIndex
// @param {number} civSlot - civ slot (1-7)
// @param {number} domain - unit domain (0=land, 1=sea, 2=air)
// @param {number|null} targetGx - target tile gx (or null for no target)
// @param {number|null} targetGy - target tile gy (or null for no target)
// @param {object} [opts] - options:
//   role: unit role override (default: UNIT_ROLE[unit.type])
//   explore: boolean, enable exploration lookahead (default: auto from role)
//   lastDir: last direction index 0-7 for momentum (default: -1 = no momentum)
//   avoidEnemies: boolean, penalize tiles near enemies (default: false)
//   cityDefense: Map from analyzeCityDefense (for defend role)
// @returns {string|null} best direction name, or null if stuck
function _evaluateDirections(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
                              targetGx, targetGy, opts = {}) {
  let role = opts.role ?? (UNIT_ROLE[unit.type] ?? 0);
  const lastDirIdx = opts.lastDir ?? -1;
  const avoidEnemies = opts.avoidEnemies ?? false;
  const negatesWalls = UNIT_NEGATES_WALLS.has(unit.type);

  // ── Damage level (ported from decompiled local_d8) ──
  const maxHp = UNIT_HP[unit.type] || 1;
  const curHp = Math.max(1, maxHp - (unit.hpLost || 0));
  let damageLevel = (unit.hpLost || 0) > 0 ? 1 : 0;
  if (curHp * 4 < maxHp) damageLevel = 3;
  else if (curHp * 2 < maxHp) damageLevel = 2;

  // ── Current tile terrain (local_80) ──
  const curTerrain = mapBase.getTerrain(unit.gx, unit.gy);

  // ── Unit movement speed for terrain cost scaling ──
  // Ported from DAT_0064bcc8: the unit's base move cost, used to scale
  // terrain penalties — fast units (cavalry, armor) pay more for rough terrain
  const unitMoveSpeed = UNIT_MOVE_POINTS[unit.type] || 1;

  // ── Pre-loop role promotion (ported from lines 4824-4832) ──
  // If role is 1 (defend) but DEF < ATK, promote to role 0 (attack)
  // This makes defensive units with better attack stats act offensively
  const unitDef = UNIT_DEF[unit.type] || 0;
  const unitAtk = UNIT_ATK[unit.type] || 0;
  if (role === 1) {
    // Ported: if DEF < ATK and continent not under guard flag, promote to attack
    if (unitDef < unitAtk) {
      role = 0;
    }
    // Also promote if DEF <= ATK and no current target (patrol mode)
    if (unitDef <= unitAtk && !opts.avoidEnemies) {
      role = 0;
    }
  }

  // ── Exploration flag (ported from local_68) ──
  // Enabled when: no enemies nearby AND not an air defense unit holding position
  const enemiesNearby = _anyEnemyNearUnit(gameState, mapBase, unit.gx, unit.gy, civSlot);
  const autoExplore = opts.explore ?? (!enemiesNearby && role !== 4);

  // ── Distance to target (if any) ──
  const hasTarget = targetGx != null && targetGy != null;
  const curDistToTarget = hasTarget ? tileDist(unit.gx, unit.gy, targetGx, targetGy, mapBase) : 0;

  // ── Track whether we're on our own continent (for settler road checks) ──
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(unit.gx, unit.gy) : -1;

  // ── Evaluate each of 8 directions ──
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
  let bestDir = null;
  let bestScore = -999;
  let bestRawScore = -999;  // local_fc: score before enemy-movement reduction
  let foundEnemyTile = false;  // local_50
  let enemyEngagementBonus = 0;  // local_64: tracks bonus from engaging enemies

  for (const dir of DIRECTIONS) {
    const pair = neighbors[dir];
    if (!pair) continue;
    const [nx, ny] = pair;
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);

    // ── Tile properties ──
    const terrain = mapBase.getTerrain(wnx, ny);
    const isOcean = (terrain === 10);

    // ── Domain passability (ported from local_6c checks) ──
    // Land units can't enter ocean (unless air transport flag)
    // Sea units can't enter land
    if (domain === 0 && isOcean) continue;
    if (domain === 1 && !isOcean) continue;

    // ── Find first combat-relevant unit at destination (ported from local_54) ──
    // Walk the stack, skip units with role > 4 (transports, settlers, diplomats, traders)
    // Ported from the while loop at lines 4845-4849
    const tileEntries = unitsAt(spatialIdx, wnx, ny);
    let firstUnitOwner = -1;  // local_78
    let firstUnitEntry = null;
    for (const entry of tileEntries) {
      if (entry.unit.gx < 0) continue;
      const entryRole = UNIT_ROLE[entry.unit.type] ?? 0;
      if (entryRole > 4) continue;
      firstUnitEntry = entry;
      firstUnitOwner = entry.unit.owner;
      break;
    }
    const hasUnitOnTile = firstUnitEntry !== null;

    // ── Complex passability checks (ported from lines 4850-4861) ──
    // Check domain constraints, stacking, and ZOC before scoring.
    //
    // Key binary checks consolidated:
    // (1) Land units (domain 0): dest must not be ocean (already filtered above)
    // (2) Sea units (domain 1): dest must be ocean (already filtered above)
    // (3) If own unit at dest with 2+ units stacked, check for city/fortress
    //     (binary: thunk_FUN_005b50ad(local_54,2) < 2 OR has city OR has fortress)
    // (4) If enemy at dest but not at war, skip tile
    if (hasUnitOnTile && firstUnitOwner === civSlot) {
      // Check soft stacking limits — Civ2 limits stacking in the field
      // Ported from lines 4858-4861: allow if < 2 units, or has city/fortress
      let ownCount = 0;
      for (const entry of tileEntries) {
        if (entry.unit.owner === civSlot && entry.unit.gx >= 0) ownCount++;
      }
      if (ownCount >= 2) {
        // Allow if tile has a city or fortress
        const hasCity = gameState.cities.some(c =>
          c.gx === wnx && c.gy === ny && c.owner === civSlot && c.size > 0);
        const tileIdx = ny * mapBase.mw + wnx;
        const tile = mapBase.tileData[tileIdx];
        const hasFortress = tile && tile.improvements && tile.improvements.fortress;
        if (!hasCity && !hasFortress) {
          // Skip over-stacked field tiles (soft limit = 2 in binary)
          // Exception: allow if combat unit count < 2
          const combatCount = tileEntries.filter(e =>
            e.unit.owner === civSlot && e.unit.gx >= 0 && (UNIT_ATK[e.unit.type] || 0) > 0
          ).length;
          if (combatCount >= 2) continue;
        }
      }
    }

    // ── ZOC blocking check ──
    // Ported from the ZOC filter — only applies to land units moving to empty tiles
    if (domain === 0 && !hasUnitOnTile) {
      const zocBlocked = isZOCBlocked(unit.type, civSlot, unit.gx, unit.gy, wnx, ny,
        mapBase, gameState.units);
      if (zocBlocked) continue;
    }

    // ══════════════════════════════════════════════════════════════
    //  SCORE COMPUTATION (ported from lines 4862-5377)
    // ══════════════════════════════════════════════════════════════
    let score = 0;
    let isEnemyEngagement = false;  // local_118: true when evaluating enemy combat
    let localEngagementBonus = 0;   // local_ac: bonus type for this direction

    // ── (A) Base score by tile contents ──
    if (!hasUnitOnTile) {
      // No units on destination tile — 3 scoring paths from binary

      if (avoidEnemies) {
        // ── Path 1: Barbarian/cautious mode (line 4863-4868) ──
        // Ported from bVar23 path: if current terrain is ocean and enemy nearby, skip
        if (curTerrain === 10 && _anyEnemyNearUnit(gameState, mapBase, wnx, ny, civSlot)) {
          continue;  // goto LAB_0054168e
        }
        score = Math.floor(Math.random() * 5);
      } else if (firstUnitOwner < 0 && !isOcean) {
        // ── Path 2: Empty land tile, no units present (lines 4869-4878) ──
        if (role === 0) {
          // Attack role, land: random(0,2) minus terrain move cost × 2
          // Ported from line 4871-4872
          score = Math.floor(Math.random() * 3);
          score += (TERRAIN_MOVE_COST[terrain] ?? 1) * -2;
        } else {
          // Non-attack roles: random(0,2) minus terrain defense bonus
          // Ported from line 4875-4876
          score = Math.floor(Math.random() * 3);
          score -= (TERRAIN_DEFENSE[terrain] ?? 2);
        }
      } else {
        // ── Path 3: Has own units or is ocean tile (lines 4879-4991) ──
        // Ported from the else branch at line 4879
        score = Math.floor(Math.random() * 5);

        // If no enemy units and no own units (empty tile with our civ's presence)
        if (firstUnitOwner < 0 || firstUnitOwner === civSlot) {
          // ── Terrain scoring for combat units heading to field tiles ──
          // Ported from lines 4882-4910
          if (role < 6) {
            // Combat units: terrain defense × 4 (prefer defensible terrain)
            // Ported from line 4883
            score += (TERRAIN_DEFENSE[terrain] ?? 2) * 4;
          } else {
            // Settlers (role >= 6): penalize by (moveCost - 1) × unitSpeed
            // Ported from lines 4886-4910
            const terrCost = TERRAIN_MOVE_COST[terrain] ?? 1;
            score += 6 - (terrCost - 1) * unitMoveSpeed;

            // ── Settler road-to-home-city check (lines 4889-4910) ──
            // If we have a target city and distance < 4, check road connectivity
            if (hasTarget && curDistToTarget < 4) {
              const fromImp = mapBase.getImprovements(unit.gx, unit.gy);
              const toImp = mapBase.getImprovements(wnx, ny);
              const hasRoadConnection = (fromImp.road || fromImp.railroad) &&
                                        (toImp.road || toImp.railroad);
              if (hasRoadConnection) {
                // On road: bonus if terrain is easy, penalty if rough for fast units
                if (unitMoveSpeed < (TERRAIN_MOVE_COST[terrain] ?? 1)) {
                  score -= 4;  // line 4897
                } else {
                  score += 8;  // line 4900
                }
              } else if ((TERRAIN_MOVE_COST[terrain] ?? 1) <= unitMoveSpeed) {
                // Railroad check: terrain cost within unit speed on railroad
                const toImpObj = mapBase.getImprovements(wnx, ny);
                if (toImpObj.railroad) {
                  score += 4;  // line 4908
                }
              }
            }
          }
        }
      }
    } else if (hasUnitOnTile && firstUnitOwner === civSlot) {
      // ── Own units on tile: role-based stacking evaluation ──
      // Ported from lines 4913-4989

      score = Math.floor(Math.random() * 5);

      // Check if the tile is our city (binary: thunk_FUN_005b94d5 returns city flag)
      const isFriendlyCity = gameState.cities.some(c =>
        c.gx === wnx && c.gy === ny && c.owner === civSlot && c.size > 0);
      // Also check if it's "our territory" city tile (bit 0x43 == 1 means city+owned)
      const isOwnedCity = isFriendlyCity;

      if (isOwnedCity) {
        // ── In our city: role-based switch (lines 4917-4963) ──
        const atkCount = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 0);
        const defCount = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 1);

        switch (role) {
          case 0: // Attack: prefer cities with few attackers but some defenders
            // Ported from lines 4918-4927
            if (atkCount < 1 && defCount > 0) score += 8;
            else score += atkCount * -8;
            break;
          case 1: // Defend: prefer cities that need more defense
            // Ported from lines 4928-4935
            if (defCount < 1) score += 8;
            else score += defCount * -4;
            break;
          case 2: // Naval superiority: bonus if air defense present, penalize extra naval
            // Ported from lines 4937-4943
            {
              const airDefHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 4);
              if (airDefHere > 0) score += 8;
              const navalHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 2);
              score += navalHere * -4;
            }
            break;
          case 4: // Air defense: bonus if naval present, penalize extra air defense
            // Ported from lines 4945-4951
            {
              const navalHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 2);
              if (navalHere > 0) score += 8;
              const airDefHere2 = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 4);
              score += airDefHere2 * -8;
            }
            break;
          case 5: // Transport: slight penalty
            // Ported from lines 4953-4955
            score -= 4;
            break;
          case 6: // Settle: bonus if combat escort present
            // Ported from lines 4957-4962
            {
              const combatHere = atkCount + defCount;
              if (combatHere > 0) score += 8;
            }
            break;
          default:
            break;
        }
      } else {
        // ── Not our city — stacking with own field units ──
        // Ported from lines 4966-4989
        switch (role) {
          case 0: // Attack: group with other attackers, scale by stack size
            // Ported from lines 4968-4970: (atkCount * 4) / (totalCount + 1)
            {
              const atkHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 0);
              const totalHere = tileEntries.filter(e => e.unit.owner === civSlot && e.unit.gx >= 0).length;
              score += Math.floor((atkHere * 4) / (totalHere + 1));
            }
            break;
          case 1: // Defend: group with defenders, penalize by attacker count
            // Ported from lines 4972-4975: (defCount * 2) / (atkCount + 1)
            {
              const defHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 1);
              const atkHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 0);
              score += Math.floor((defHere * 2) / (atkHere + 1));
            }
            break;
          case 5: // Transport: prefer tiles with own land units + terrain defense
            // Ported from lines 4977-4980
            {
              const defTerr = TERRAIN_DEFENSE[terrain] ?? 2;
              const ownCount = _countDomainUnitsAtTile(spatialIdx, wnx, ny, civSlot, 0);
              score += (defTerr + ownCount) * 2;
            }
            break;
          case 6: // Settle: bonus if combat escorts present
            // Ported from lines 4982-4988
            {
              const atkHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 0);
              const defHere = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 1);
              if (atkHere + defHere > 0) score += 8;
            }
            break;
          default:
            break;
        }
      }
    } else if (hasUnitOnTile && firstUnitOwner !== civSlot) {
      // ══════════════════════════════════════════════════════════════
      //  ENEMY UNIT ON TILE — Combat evaluation (lines 5076-5303)
      // ══════════════════════════════════════════════════════════════
      if (!isAtWar(gameState, civSlot, firstUnitOwner)) {
        // Not at war — skip this tile (don't walk through neutral units)
        continue;
      }

      isEnemyEngagement = true;  // local_118 = 1

      // ── Subtract our unit's defense rating as base penalty (lines 5301-5303) ──
      // Ported: local_18 -= our unit's DEF value
      score -= unitDef;

      // ── Pre-combat checks (ported from lines 5079-5100) ──
      // Several conditions that cause skipping enemy engagement:
      // - Barbarian units skip engagement in certain conditions
      // - Sea domain units entering enemy-occupied land (domain mismatch)
      // - Non-combat units (ATK=0) trying to enter enemy tile
      if (unitAtk === 0 && role !== 7) {
        // Non-combat, non-diplomat: cannot attack
        continue;
      }

      // ── Find best defender and compute combat score ──
      // Ported from: local_54 = thunk_FUN_0057e6e2(local_54, local_168)
      // then FUN_00580341(local_168, local_60, 0)
      const bestDef = bestDefenderOnTile(spatialIdx, wnx, ny, civSlot, terrain, gameState, mapBase);
      if (bestDef) {
        const defCity = gameState.cities.find(c =>
          c.gx === wnx && c.gy === ny && c.size > 0 && c.owner !== civSlot);
        const hasCityWalls = defCity ? (defCity.buildings?.has(3) || false) : false;

        // ── Core combat score (FUN_00580341 equivalent) ──
        // Ported from line 5124
        const combatScore = _computeCombatScore(
          unit, bestDef.unit, terrain, hasCityWalls, negatesWalls,
          bestDef.unit.orders === 'fortified'
        );

        // ── Scale by unit count at target + normalize by unit cost ──
        // Ported from lines 5125-5129:
        //   local_10 = ((countRole0AtTarget + 1) * combatScore) / (unitCost / 10)
        const atkUnitsAtTarget = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 0);
        const unitCostDiv = Math.max(1, Math.floor((UNIT_COSTS[unit.type] ?? 40) / 10));
        let combatValue = Math.floor(((atkUnitsAtTarget + 1) * combatScore) / unitCostDiv);

        // ── City capture bonus (line 5131-5132) ──
        // Ported: if target is an enemy city, multiply combat value × 3
        if (defCity) combatValue *= 3;

        // ── Naval superiority vs air defense bonus (lines 5134-5137) ──
        // Ported: if our role is 2 (naval) and target's role is 4 (air def), double
        if (role === 2 && (UNIT_ROLE[bestDef.unit.type] ?? 0) === 4) {
          combatValue *= 2;
        }

        // ── Undamaged path (local_48 == 0): role-specific bonuses ──
        if (damageLevel < 2) {
          // ── Role 0 (attack) specific bonuses ──
          if (role === 0) {
            // Ported from line 5141-5142: if no current target (uVar21==0), double
            if (!hasTarget) {
              combatValue *= 2;
            }

            // Ported from lines 5144-5149: if our ATK × 2 < enemy total DEF, double
            // (we're outgunned, so attacking is more valuable — focus fire)
            const enemyDefTotal = _countEnemyDefensePower(spatialIdx, wnx, ny, civSlot, gameState);
            if (unitAtk * 2 < enemyDefTotal) {
              combatValue *= 2;
              localEngagementBonus = 1;
            }

            // Ported from lines 5151-5154: if own attack-role units at target tile, double
            // (coordinated stack attack bonus)
            const atkRoleAtTarget = _countRoleUnitsAtTile(spatialIdx, wnx, ny, civSlot, 0);
            if (atkRoleAtTarget > 0) {
              combatValue *= 2;
              localEngagementBonus = 1;
            }

            // Ported from lines 5156-5159: if own units mobilized near starting tile, double
            // FUN_00492e60 equivalent — check if we have units on rally point
            const nearbyOwn = _countOwnAttackersNear(gameState, unit.gx, unit.gy, civSlot, mapBase);
            if (nearbyOwn > 0) {
              combatValue *= 2;
            }
          }

          // Ported from lines 5169-5172: if target is a "stealth" unit (flags & 8),
          // triple combat value — corresponds to high-value targets like spies/nukes
          const defenderRole = UNIT_ROLE[bestDef.unit.type] ?? 0;
          if (defenderRole === 7) {
            // Diplomat/spy units are high-value targets
            combatValue *= 3;
          }
        } else {
          // ── Damaged path (local_48 != 0, lines 5174-5181) ──
          // Halve combat value when damaged
          combatValue = Math.floor(combatValue / 2);
          // If defender's ATK >= our DEF, set to 0 (retreat rather than fight)
          const defAtk = UNIT_ATK[bestDef.unit.type] || 0;
          if (defAtk >= unitDef) combatValue = 0;
        }

        // ── Special target role bonuses (lines 5183-5202) ──
        const defenderRoleCheck = UNIT_ROLE[bestDef.unit.type] ?? 0;

        // Ported from lines 5192-5199: barbarian (owner==0) bonus for role 7 targets
        if (firstUnitOwner === 0 && defenderRoleCheck === 7) {
          // Against barbarian diplomats: halve (they're not real threats)
          combatValue = Math.floor(combatValue / 2);
        } else if (firstUnitOwner === 0 && defenderRoleCheck > 4) {
          // Against barbarian transports/settlers: bonus
          combatValue += 12;
        } else if (defenderRoleCheck === 6) {
          // Ported from line 5200-5201: settler target — double value (capture value)
          combatValue *= 2;
        }

        // ── Threshold check (lines 5203-5207) ──
        // Ported: threshold = (barbarian ? 6 : 12)
        // Binary: ((-(uint)(local_78 == 0) & 6) + 6)
        //   → if local_78 == 0: (-1 & 6) + 6 = 6 + 6 = 12... wait, that's wrong
        //   → Actually: -(uint)(true) = 0xFFFFFFFF, & 6 = 6, + 6 = 12 for barbarian
        //   → -(uint)(false) = 0, & 6 = 0, + 6 = 6 for non-barbarian
        // Wait, re-reading: local_78 is the OWNER of the first unit. Barbarians are civ 0.
        // So threshold = 12 if barbarian owner, 6 if normal civ.
        // This seems inverted but matches the binary: the AI is MORE cautious attacking
        // barbarians (who tend to be weak but grouped) and LESS cautious attacking civs.
        // Actually let's re-check: -(uint)(local_78 == 0) when local_78==0 gives -1 (0xFFFFFFFF)
        // -1 & 6 = 6, so 6 + 6 = 12 for barbarians. For non-barbarian: 0 & 6 = 0, 0 + 6 = 6.
        // So higher threshold for barbarians = more cautious. This makes sense because
        // barbarians don't hold territory worth capturing.
        const threshold = (firstUnitOwner === 0) ? 12 : 6;
        if (combatValue >= threshold) {
          score += combatValue * 4;
          foundEnemyTile = true;
        } else {
          score = -999;
        }
      } else {
        // No valid defender found — maybe all are non-combat or dead
        score += 8;
      }
    }

    // ── (B) Direction momentum penalty (ported from lines 4995-5006) ──
    // Penalize sharp turns from last heading.
    // Binary: compute abs(lastDir - curDir), clamp via 8-wrap, penalty = diff² × 2
    if (lastDirIdx >= 0) {
      const curDirIdx = DIRECTIONS.indexOf(dir);
      let angularDiff = Math.abs(lastDirIdx - curDirIdx);
      if (angularDiff > 4) angularDiff = 8 - angularDiff;
      score -= angularDiff * angularDiff * 2;
    }

    // ── (C) Enemy territory avoidance (ported from lines 5010-5053) ──
    // Ported: only applies when no unit on tile AND tile owner is known AND
    // our unit's role < 5 (combat roles only, not transports/settlers)
    if (firstUnitEntry === null && firstUnitOwner < 0) {
      // No units on tile — check territory ownership
      const tileOwner = _getTileOwnerCiv(mapBase, wnx, ny);

      if (tileOwner > 0 && tileOwner !== civSlot) {
        // ── Check treaty status with tile owner ──
        const treatyStatus = getTreaty(gameState, civSlot, tileOwner);

        if (treatyStatus !== 'war') {
          // ── Allied/neutral territory checks (lines 5014-5053) ──
          // Ported: check if we have ceasefire/peace with tile owner
          if (hasTarget && curDistToTarget < 4 && tileOwner !== civSlot) {
            // Moving through allied territory toward a target: penalty if close
            // Ported from lines 5023-5033
            const newDist = tileDist(wnx, ny, targetGx, targetGy, mapBase);
            if (curDistToTarget < newDist && curDistToTarget < 3) {
              score += 5;  // Moving away from target through ally = slight bonus (flanking)
            }
            if (newDist >= curDistToTarget) {
              score -= 5;  // Not getting closer through allied territory
            }
          }

          // Ported from lines 5036-5052: territory with improvements penalty
          if (isAtWar(gameState, civSlot, tileOwner)) {
            score -= 5;
            const imp = mapBase.getImprovements(wnx, ny);
            if (imp.road || imp.irrigation || imp.mining) score -= 3;
          }
        } else {
          // At war with tile owner but no unit present
          // Minor avoidance for non-combat roles
          if (avoidEnemies && role < 5) {
            score -= 5;
            const imp = mapBase.getImprovements(wnx, ny);
            if (imp.road || imp.irrigation || imp.mining) score -= 3;
          }
        }
      }
    }

    // ── (D) Allied territory penalty (ported from line 5055-5057) ──
    // Ported: if tile owner has alliance flag (treaty & 8), penalty -6
    if (!hasUnitOnTile && firstUnitOwner < 0) {
      const tileOwner = _getTileOwnerCiv(mapBase, wnx, ny);
      if (tileOwner > 0 && tileOwner !== civSlot &&
          !isAtWar(gameState, civSlot, tileOwner)) {
        score -= 6;
      }
    }

    // ── (E) Undefended enemy city / goody hut detection (lines 5058-5073) ──
    if (!hasUnitOnTile) {
      // ── Undefended enemy city: huge bonus (line 5066) ──
      // Ported: if tile has enemy city owned by a civ we're at war with,
      // and treaty checks pass (no ceasefire, etc.), score = 999
      const emptyEnemyCity = gameState.cities.find(c =>
        c.gx === wnx && c.gy === ny && c.size > 0 && c.owner !== civSlot &&
        isAtWar(gameState, civSlot, c.owner));
      if (emptyEnemyCity) {
        // Ported from lines 5061-5068: additional checks before awarding 999
        // Check if the city owner's treaty has certain flags (ceasefire, etc.)
        // In our model, isAtWar already filters this, so direct award
        score = 999;
      }

      // ── Goody hut bonus (line 5071-5073) ──
      // Ported: thunk_FUN_005b8ffa returns nonzero if goody hut present → +20
      const tileIdx = ny * mapBase.mw + wnx;
      const tile = mapBase.tileData[tileIdx];
      if (tile && tile.goodyHut) {
        score += 20;
      }
    }

    // ── (F) Distance to target improvement ──
    // This is not a single block in the decompiled code but interspersed through
    // the city-target distance checks. We centralize it here.
    // The binary uses distance comparisons at multiple points; the net effect is
    // a per-direction bonus/penalty proportional to how much closer we get.
    if (hasTarget) {
      const newDist = tileDist(wnx, ny, targetGx, targetGy, mapBase);
      const distImprovement = curDistToTarget - newDist;
      // Scale by 4 (ported from multiple score += ±4/±5 patterns)
      score += distImprovement * 4;
    }

    // ── (G) Exploration lookahead (ported from lines 5316-5354) ──
    // Ported: check 4× further in the same direction for unexplored tiles.
    // Binary: iVar11 = FUN_005ae052(dx[local_60] * 4 + local_d4)
    //         iVar12 = dy[local_60] * 4 + local_e8
    // Then checks visibility, enemy presence, and terrain food value.
    if (autoExplore && !isEnemyEngagement) {
      // ── Far-ahead check (4× in same direction) ──
      // Ported from lines 5317-5328
      const lookDest = resolveDirection(wnx, ny, dir, mapBase);
      if (lookDest) {
        // Compute the 4× distant tile from current position
        // Binary: dx[dir]*4 + curX, dy[dir]*4 + curY
        // Walk 4 steps in the same direction via repeated resolveDirection
        const lookPair2 = resolveDirection(lookDest.gx, lookDest.gy, dir, mapBase);
        const lookPair3 = lookPair2 ? resolveDirection(lookPair2.gx, lookPair2.gy, dir, mapBase) : null;
        const farTile = lookPair3 ? resolveDirection(lookPair3.gx, lookPair3.gy, dir, mapBase) : null;

        // Check 4× distant tile for unexplored
        if (farTile && inBounds(farTile.gx, farTile.gy, mapBase)) {
          const farWgx = wrapX(farTile.gx, mapBase);
          if (!isExplored(mapBase, farWgx, farTile.gy, civSlot)) {
            // Ported from line 5323-5324: unexplored → +8
            score += 8;
          } else {
            // Ported from line 5327: explored → +2
            score += 2;
          }
        }

        // ── Check 8 neighbors of the far-ahead point ──
        // Ported from the inner loop at lines 5330-5354
        const farCheckTile = lookDest;  // Use the 1-step-ahead as the far check center
        if (inBounds(farCheckTile.gx, farCheckTile.gy, mapBase)) {
          const farNeighbors = mapBase.getNeighbors(farCheckTile.gx, farCheckTile.gy);
          for (const fdir in farNeighbors) {
            const [fnx, fny] = farNeighbors[fdir];
            if (!inBounds(fnx, fny, mapBase)) continue;
            const fwnx = wrapX(fnx, mapBase);

            // Ported from lines 5335-5339: unexplored neighbor → +2
            if (!isExplored(mapBase, fwnx, fny, civSlot)) {
              score += 2;
            }

            // Ported from lines 5341-5343: enemy unit in lookahead → -2
            const farEntries = unitsAt(spatialIdx, fwnx, fny);
            for (const fe of farEntries) {
              if (fe.unit.owner !== civSlot && isAtWar(gameState, civSlot, fe.unit.owner) &&
                  (UNIT_ATK[fe.unit.type] || 0) > 0) {
                score -= 2;
              }
            }

            // Ported from lines 5345-5351: for barbarian/explorer mode,
            // add terrain food value bonus (DAT_00627cca = terrain food output)
            // This makes explorers prefer fertile terrain
            if (avoidEnemies) {
              // Terrain food output bonus (approximate DAT_00627cca lookup)
              // Terrain food values: desert=0, plains=1, grassland=2, forest=1,
              // hills=1, mountains=0, tundra=1, glacier=0, swamp=1, jungle=1, ocean=1
              const TERRAIN_FOOD = [0, 1, 2, 1, 1, 0, 1, 0, 1, 1, 1];
              score += (TERRAIN_FOOD[mapBase.getTerrain(fwnx, fny)] ?? 0);
            }
          }
        }
      }

      // ── Bonus for destination tile itself being unexplored ──
      if (!isExplored(mapBase, wnx, ny, civSlot)) {
        score += 8;
      }
    }

    // ── (H) Terrain movement cost for land units ──
    // Ported from the terrain-cost patterns interspersed in lines 4882-4910.
    // Only applies to land units on empty tiles (not already scored in path A).
    // This section handles road/railroad bonuses separately from the base terrain
    // scoring in section (A), since roads reduce effective movement cost.
    if (domain === 0 && !hasUnitOnTile && !isEnemyEngagement) {
      // ── Road/railroad bonus ──
      const fromImp = mapBase.getImprovements(unit.gx, unit.gy);
      const toImp = mapBase.getImprovements(wnx, ny);
      if (fromImp.railroad && toImp.railroad) {
        score += 8;  // Free movement on railroads
      } else if ((fromImp.road || fromImp.railroad) && (toImp.road || toImp.railroad)) {
        score += 4;  // Reduced cost on roads
      }
    }

    // ── (I) Polar penalty (ported from lines 5356-5358) ──
    // Binary: if (local_74 == 0 || local_74 == mapHeight - 1) score /= 3
    if (ny === 0 || ny === mapBase.mh - 1) {
      score = Math.floor(score / 3);
    }

    // ── (J) Movement cost vs combat check (ported from lines 5360-5367) ──
    // If engaging an enemy, check if our remaining movement is sufficient.
    // Binary: if local_118 && movesLeft < unitSpeed && no city at dest,
    //         reduce score by ratio of our attack units vs total units.
    if (isEnemyEngagement) {
      const movesLeft = unit.movesLeft || 0;
      const baseSpeed = unitMoveSpeed * 3;  // in movement thirds
      if (movesLeft < baseSpeed) {
        // Check if there's a city at dest (cities don't cost extra to enter)
        const destHasCity = gameState.cities.some(c =>
          c.gx === wnx && c.gy === ny && c.size > 0);
        if (!destHasCity) {
          // Reduce score proportionally to remaining movement
          const ownAtkHere = _countRoleUnitsAtTile(spatialIdx, unit.gx, unit.gy, civSlot, 0);
          const ownTotalHere = tileEntries.filter(e =>
            e.unit.owner === civSlot && e.unit.gx >= 0).length;
          if (ownTotalHere > 0) {
            score = Math.floor((ownAtkHere / Math.max(1, ownTotalHere)) * score);
          }
        }
      }
    }

    // ── Track best scores ──
    const rawScore = score;
    if (score > bestScore) {
      bestScore = score;
      bestDir = dir;
      if (isEnemyEngagement) {
        foundEnemyTile = true;
        enemyEngagementBonus = localEngagementBonus;
      }
    }
    if (rawScore > bestRawScore) {
      bestRawScore = rawScore;
    }
  }

  // ── Post-loop checks (ported from lines 5383-5399) ──

  // (1) If engaging enemy but movement cost is too high, cancel
  // Ported from lines 5383-5387:
  //   if foundEnemy && movesLeft < (unitSpeed - engagementBonus), cancel
  if (foundEnemyTile) {
    const movesLeft = unit.movesLeft || 0;
    const effectiveSpeed = (unitMoveSpeed - enemyEngagementBonus) * 3;
    if (movesLeft < effectiveSpeed && effectiveSpeed > 0) {
      bestDir = null;
    }
  }

  // (2) If raw score differs from best score, the movement cost reduction
  // changed the winner — cancel to avoid suboptimal engagement
  // Ported from lines 5388-5390
  if (bestRawScore !== bestScore) {
    // The score was modified by movement cost check — result is unreliable
    // Only cancel if we're engaging enemies (don't cancel exploration)
    if (foundEnemyTile) {
      bestDir = null;
    }
  }

  return bestDir;
}

// ── _evaluateDirections helpers ───────────────────────────────────────

/**
 * Count units of a specific role at a tile owned by civSlot.
 * Ported from FUN_005b53b6(unitIdx, roleFilter).
 */
function _countRoleUnitsAtTile(spatialIdx, gx, gy, civSlot, targetRole) {
  const entries = unitsAt(spatialIdx, gx, gy);
  let count = 0;
  for (const { unit } of entries) {
    if (unit.owner !== civSlot || unit.gx < 0) continue;
    if ((UNIT_ROLE[unit.type] ?? 0) === targetRole) count++;
  }
  return count;
}

/**
 * Count units of a specific domain at a tile owned by civSlot.
 */
function _countDomainUnitsAtTile(spatialIdx, gx, gy, civSlot, targetDomain) {
  const entries = unitsAt(spatialIdx, gx, gy);
  let count = 0;
  for (const { unit } of entries) {
    if (unit.owner !== civSlot || unit.gx < 0) continue;
    if ((UNIT_DOMAIN[unit.type] ?? 0) === targetDomain) count++;
  }
  return count;
}

/**
 * Sum total defense power of enemy units at a tile.
 */
function _countEnemyDefensePower(spatialIdx, gx, gy, civSlot, gameState) {
  const entries = unitsAt(spatialIdx, gx, gy);
  let total = 0;
  for (const { unit } of entries) {
    if (unit.owner === civSlot || unit.gx < 0) continue;
    if (!isAtWar(gameState, civSlot, unit.owner)) continue;
    total += (UNIT_DEF[unit.type] || 0);
  }
  return total;
}

/**
 * Check if any enemy combat units are within 2 tiles of a unit.
 * Simplified equivalent for the exploration flag check.
 */
function _anyEnemyNearUnit(gameState, mapBase, gx, gy, civSlot) {
  for (const u of gameState.units) {
    if (u.gx < 0 || u.owner === civSlot) continue;
    if ((UNIT_ATK[u.type] || 0) <= 0) continue;
    if (!isAtWar(gameState, civSlot, u.owner)) continue;
    const dist = tileDist(gx, gy, u.gx, u.gy, mapBase);
    if (dist <= 4) return true;
  }
  return false;
}

/**
 * Get the civ that owns a tile (from city radius ownership).
 * Returns civ slot or 0 if unclaimed.
 */
function _getTileOwnerCiv(mapBase, gx, gy) {
  if (typeof mapBase.getTileOwnership === 'function') {
    return mapBase.getTileOwnership(gx, gy) || 0;
  }
  // Fallback: check if a city's worked tiles include this one
  return 0;
}

// ── Legacy wrapper ────────────────────────────────────────────────────
// The old _scoredDirectionToward is now a thin wrapper around _evaluateDirections.
// Callers that used the old signature continue to work.
function _scoredDirectionToward(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
                                 targetGx, targetGy) {
  return _evaluateDirections(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
    targetGx, targetGy, {
      role: UNIT_ROLE[unit.type] ?? 0,
      explore: true,
    });
}

/**
 * AI for Role 1 (Defend): defensive garrison units.
 *
 * Ported from Civ2 FUN_00538a29 role 1 logic (LAB_0053b8f0, lines 3257-3612).
 *
 * Garrison management:
 * - Computes needed defenders per city from: citySize / divisor + 1
 *   where divisor = 3 (threat nearby) or 4 (safe), ±1 for barracks/republic
 * - With barracks: minimum garrison = 1, 2 if size>3, 3 if >7 mil units, 4 if >11
 * - Excess defenders are released to reinforce underdefended cities
 * - Deficit cities request production + attract free defenders
 *
 * Counterattack:
 * - Defenders in cities attack adjacent enemies threatening our cities
 * - Defenders outside cities with hatred-flagged enemies nearby advance to block
 *
 * Reinforcement routing:
 * - Free defenders move toward the most underdefended city on the same continent
 * - Prioritizes own cities, falls back to nearest city
 *
 * Fortification:
 * - Defenders in adequately-garrisoned cities fortify for defense bonus
 * - On fortress tiles without cities, fortify if safe
 */
function aiDefender(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, strategy, cityDefense) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(unit.gx, unit.gy) : -1;

  // ── Damage level (ported from decompiled local_d8) ──
  const maxHp = UNIT_HP[unit.type] || 1;
  const curHp = Math.max(1, maxHp - (unit.hpLost || 0));
  let damageLevel = (unit.hpLost || 0) > 0 ? 1 : 0;
  if (curHp * 4 < maxHp) damageLevel = 3;
  else if (curHp * 2 < maxHp) damageLevel = 2;

  // ── Find own city at this tile (local_3c == 0 in decompiled) ──
  const inCityIdx = _findOwnCityAtTile(gameState, unit.gx, unit.gy, civSlot);
  const inCity = inCityIdx >= 0;
  const ownCity = inCity ? gameState.cities[inCityIdx] : null;

  // ── Check for adjacent enemies (counterattack opportunity) ──
  const adjacentEnemies = findAdjacentEnemies(gameState, mapBase, spatialIdx, unit, civSlot);
  const enemiesNear = adjacentEnemies.length > 0;

  // ── Counterattack logic: defend cities against adjacent threats ──
  // Ported from FUN_00538a29 local_158 check + combat evaluation.
  // If we're in or near a city, attack adjacent enemies threatening it.
  if (enemiesNear && damageLevel < 3) {
    const counterattackAction = _defenderCounterattack(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
      adjacentEnemies, inCityIdx, cityDefense
    );
    if (counterattackAction) return counterattackAction;
  }

  // ══════════════════════════════════════════════════════════════
  // IN CITY: Garrison management (ported from LAB_0053b8f0)
  // ══════════════════════════════════════════════════════════════
  if (inCity) {
    // ── Count defend-role units at this city (FUN_005b53b6 equivalent) ──
    const defenderCount = _countDefendersAtTile(gameState, spatialIdx, unit.gx, unit.gy, civSlot);

    // ── Compute needed garrison (ported from lines 3260-3295) ──
    const neededDefenders = _computeNeededGarrison(
      ownCity, inCityIdx, gameState, mapBase, spatialIdx, civSlot, strategy
    );

    // ── If only 1 defender (us), always stay (lines 3297-3299) ──
    if (defenderCount <= 1) {
      return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
    }

    // ── Check if we are the "best" defender — the strongest stays ──
    // Ported from FUN_0057e6e2: find the best defender in the stack.
    // If this unit IS the best, it stays.
    const bestDefender = _findBestDefenderInCity(gameState, spatialIdx, unit.gx, unit.gy, civSlot, mapBase);
    if (bestDefender === unitIndex) {
      // We are the best defender — stay and fortify
      return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
    }

    // ── Garrison has enough or excess defenders ──
    if (defenderCount <= neededDefenders) {
      // Not enough defenders yet — need more, request production
      // We stay and fortify; production AI handles building more
      return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
    }

    // ── Excess defenders: release this unit ──
    // Ported from lines 3310-3328: if defenders > needed, release excess.
    // Check if releasing this unit would still leave enough defenders.
    const afterRelease = _countDefendRoleUnitsExcluding(
      gameState, spatialIdx, unit.gx, unit.gy, civSlot, unitIndex
    );

    if (afterRelease < neededDefenders) {
      // Still needed, stay
      return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
    }

    // ── Find city that needs reinforcements ──
    // Ported from the underdefended city search (lines 3419-3486 for role 4,
    // and the general target city search for role 1).
    const reinforceTarget = _findCityNeedingReinforcement(
      gameState, mapBase, spatialIdx, civSlot, unit.gx, unit.gy, unitBodyId,
      cityDefense, strategy
    );

    if (reinforceTarget) {
      const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
        reinforceTarget.gx, reinforceTarget.gy, unit, civSlot);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }

    // ── Periodic release: every 8th turn, wake up idle garrison defenders ──
    // Ported from lines 3321-3326: (turn + unitIndex) & 7 == 0 check.
    const turnNum = gameState.turn?.number || 0;
    if (((turnNum + unitIndex) & 7) === 0 && afterRelease >= neededDefenders) {
      // Try to explore or patrol if no city needs help
      const exploreDir = _defenderExplore(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain);
      if (exploreDir) return exploreDir;
    }

    // No city needs help — stay fortified
    return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
  }

  // ══════════════════════════════════════════════════════════════
  // NOT IN CITY: Route to a city or defend a position
  // ══════════════════════════════════════════════════════════════

  // ── Check if on a fortress tile (ported from local_bc fortress check) ──
  const tileIdx = unit.gy * mapBase.mw + wrapX(unit.gx, mapBase);
  const tile = mapBase.tileData[tileIdx];
  const onFortress = tile && tile.improvements && tile.improvements.fortress;

  // ── Heavily damaged: retreat to nearest city ──
  if (damageLevel >= 3) {
    const retreatCity = _findNearestOwnCity(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, unitBodyId);
    if (retreatCity) {
      const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
        retreatCity.gx, retreatCity.gy, unit, civSlot);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }
    // Can't retreat — fortify in place
    return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
  }

  // ── Enemy city proximity: block/capture hostile cities ──
  // Ported from lines 3127-3212: if canMoveToCity flag set,
  // check nearby enemy cities with hatred flag for blocking positions.
  if (domain === 0 && damageLevel < 2) {
    const blockAction = _defenderBlockEnemyCity(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, unitBodyId, strategy
    );
    if (blockAction) return blockAction;
  }

  // ── Find nearest city on same continent that needs defenders ──
  // Ported from lines 3226-3248: find nearest own city on same bodyId
  const reinforceTarget = _findCityNeedingReinforcement(
    gameState, mapBase, spatialIdx, civSlot, unit.gx, unit.gy, unitBodyId,
    cityDefense, strategy
  );

  if (reinforceTarget) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
      reinforceTarget.gx, reinforceTarget.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // ── Move toward nearest own city on same continent ──
  // Ported from lines 3229-3243: find closest city, prefer own, same continent.
  const nearestCity = _findNearestOwnCityOnContinent(
    gameState, mapBase, unit.gx, unit.gy, civSlot, domain, unitBodyId
  );

  if (nearestCity) {
    // If we're already adjacent or at the city, fortify
    const cityDist = tileDist(unit.gx, unit.gy, nearestCity.gx, nearestCity.gy, mapBase);
    if (cityDist <= 2) {
      // Move into the city first
      const dir = directionToward(mapBase, unit.gx, unit.gy, nearestCity.gx, nearestCity.gy, domain);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
      nearestCity.gx, nearestCity.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  // ── On fortress: fortify ──
  if (onFortress) {
    return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
  }

  // ── Fallback: fortify in place ──
  return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
}

// ── aiDefender helpers ──────────────────────────────────────────────

/**
 * Find our city at the given tile. Returns city index or -1.
 */
function _findOwnCityAtTile(gameState, gx, gy, civSlot) {
  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const c = gameState.cities[ci];
    if (c && c.gx === gx && c.gy === gy && c.owner === civSlot && c.size > 0) return ci;
  }
  return -1;
}

/**
 * Count defend-role land units at a tile owned by civSlot.
 * Ported from FUN_005b53b6(unitIndex, 1) — counts role-1 units at the same tile.
 */
function _countDefendersAtTile(gameState, spatialIdx, gx, gy, civSlot) {
  const entries = unitsAt(spatialIdx, gx, gy);
  let count = 0;
  for (const { unit } of entries) {
    if (unit.owner !== civSlot || unit.gx < 0) continue;
    const domain = UNIT_DOMAIN[unit.type] ?? 0;
    if (domain !== 0) continue; // only land units
    const role = UNIT_ROLE[unit.type] ?? 0;
    if (role === 1) count++;
  }
  return count;
}

/**
 * Count defend-role units at tile, excluding one specific unit.
 */
function _countDefendRoleUnitsExcluding(gameState, spatialIdx, gx, gy, civSlot, excludeIdx) {
  const entries = unitsAt(spatialIdx, gx, gy);
  let count = 0;
  for (const { unit, index } of entries) {
    if (index === excludeIdx) continue;
    if (unit.owner !== civSlot || unit.gx < 0) continue;
    const domain = UNIT_DOMAIN[unit.type] ?? 0;
    if (domain !== 0) continue;
    const role = UNIT_ROLE[unit.type] ?? 0;
    if (role === 1) count++;
  }
  return count;
}

/**
 * Compute needed garrison size for a city.
 *
 * Ported from FUN_00538a29 lines 3260-3295:
 *   divisor = 3 if enemies nearby (FUN_005b4c63 != 0), else 4
 *   barracks (building 1): divisor -= 1
 *   republic/democracy govt (continent threat = 5): divisor += 1
 *   neededDefenders = citySize / divisor + 1
 *
 *   With barracks: minimum garrison from military units:
 *     1 normally, 2 if citySize > 3, 3 if civMilUnits > 7, 4 if > 11
 *     neededDefenders = max(neededDefenders, barracksMinimum)
 *
 * @returns {number} needed defender count
 */
function _computeNeededGarrison(city, cityIndex, gameState, mapBase, spatialIdx, civSlot, strategy) {
  if (!city || city.size <= 0) return 1;

  // Check if enemies are near this city (FUN_005b4c63 equivalent)
  const enemiesNearby = _anyEnemyNearCity(gameState, mapBase, city.gx, city.gy, civSlot);

  // Base divisor: 3 if threatened, 4 if safe
  let divisor = enemiesNearby ? 3 : 4;

  // Barracks (building 1): -1 divisor (better garrison needed)
  const hasBarracks = city.buildings ? city.buildings.has(1) : false;
  if (hasBarracks) {
    divisor -= 1;
  }

  // Government: republic (5) or democracy (6) increases divisor
  // Ported from: if continent_threat == 5, divisor += 1
  // In our model, check if government is republic-tier
  const govtStr = gameState.civs?.[civSlot]?.government;
  const govtIdx = typeof govtStr === 'number' ? govtStr : (GOVT_INDEX[govtStr] ?? 1);
  if (govtIdx === 5 || govtIdx === 6) { // republic or democracy
    divisor += 1;
  }

  // Ensure divisor is at least 1
  if (divisor < 1) divisor = 1;

  // Base needed: citySize / divisor + 1
  let needed = Math.floor(city.size / divisor) + 1;

  // With barracks: apply minimum garrison from military strength
  // Ported from lines 3280-3294
  if (hasBarracks) {
    let barracksMin = 1;
    if (city.size > 3) barracksMin = 2;

    // Check civ's total military unit count from strategy.aiData
    const totalMilUnits = strategy?.aiData?.unitCount?.[civSlot] ?? 0;
    if (totalMilUnits > 7) barracksMin = 3;
    if (totalMilUnits > 11) barracksMin = 4;

    if (barracksMin > needed) needed = barracksMin;
  }

  return needed;
}

/**
 * Check if any enemy combat units are within 2 tiles of a city.
 * Simplified equivalent of FUN_005b4c63(x, y, civ).
 */
function _anyEnemyNearCity(gameState, mapBase, gx, gy, civSlot) {
  for (const u of gameState.units) {
    if (u.gx < 0 || u.owner === civSlot) continue;
    if ((UNIT_ATK[u.type] || 0) <= 0) continue;
    if (!isAtWar(gameState, civSlot, u.owner)) continue;
    const dist = tileDist(gx, gy, u.gx, u.gy, mapBase);
    if (dist <= 4) return true; // within 2 real tiles (doubled-coord distance 4)
  }
  return false;
}

/**
 * Find the best (strongest) defend-role unit in a city tile.
 * Returns the unitIndex of the strongest defender.
 * Equivalent of FUN_0057e6e2 — picks the unit that should stay as garrison.
 *
 * The "best" defender is the one with the highest effective defense strength,
 * considering veteran status, HP, and base defense.
 */
function _findBestDefenderInCity(gameState, spatialIdx, gx, gy, civSlot, mapBase) {
  const entries = unitsAt(spatialIdx, gx, gy);
  const terrain = mapBase.getTerrain(gx, gy);

  // Check for city walls
  const city = gameState.cities.find(c =>
    c.gx === gx && c.gy === gy && c.owner === civSlot && c.size > 0);
  const hasCityWalls = city ? (city.buildings?.has(3) || false) : false;

  let bestIdx = -1;
  let bestStr = -1;

  for (const { unit: u, index } of entries) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    const uDomain = UNIT_DOMAIN[u.type] ?? 0;
    if (uDomain !== 0) continue; // land only
    const uRole = UNIT_ROLE[u.type] ?? 0;
    if (uRole !== 1) continue; // defend role only

    const isFortified = (u.orders === 'fortified');
    const str = defenseStrength(u, terrain, isFortified, hasCityWalls, false);
    if (str > bestStr) {
      bestStr = str;
      bestIdx = index;
    }
  }
  return bestIdx;
}

/**
 * Defender counterattack: if we're in or near a city, attack adjacent enemies
 * threatening that city.
 *
 * Ported from FUN_00538a29 local_158 + combat evaluation at LAB_005414d7.
 * Defenders only counterattack when:
 * - The enemy is within 2 tiles of one of our cities
 * - Our attack strength is at least 60% of their defense strength
 * - We're not the last defender in the city (if in one)
 */
function _defenderCounterattack(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
                                 adjacentEnemies, inCityIdx, cityDefense) {
  // If we're the sole defender of a city, don't counterattack (stay put)
  if (inCityIdx >= 0) {
    const defCount = _countDefendersAtTile(
      gameState, spatialIdx, unit.gx, unit.gy, civSlot
    );
    if (defCount <= 1) return null;
  }

  let bestTarget = null;
  let bestScore = -Infinity;

  for (const enemy of adjacentEnemies) {
    // Domain check: land units can't attack into ocean
    if (domain === 0) {
      const terrain = mapBase.getTerrain(enemy.gx, enemy.gy);
      if (terrain === 10) continue;
    }

    // Check if this enemy is near one of our cities (within 4 doubled-coord tiles)
    let nearOwnCity = false;
    for (const [, info] of cityDefense) {
      if (tileDist(enemy.gx, enemy.gy, info.city.gx, info.city.gy, mapBase) <= 4) {
        nearOwnCity = true;
        break;
      }
    }
    // Also count if we're in a city and enemy is adjacent (always defend our own city)
    if (inCityIdx >= 0) nearOwnCity = true;

    if (!nearOwnCity) continue;

    // Evaluate combat odds
    const atkStr = attackStrength(unit);
    const defStr = enemy.defender.defStr;

    // Only attack if our strength is at least 60% of theirs (ported threshold)
    if (defStr > 0 && atkStr < defStr * 0.6) continue;

    // Score: prefer weaker enemies and undefended tiles
    const score = defStr > 0 ? atkStr / defStr : 999;
    if (score > bestScore) {
      bestScore = score;
      bestTarget = enemy;
    }
  }

  if (bestTarget) {
    return { type: 'MOVE_UNIT', unitIndex, dir: bestTarget.dir };
  }
  return null;
}

/**
 * Find a city that needs reinforcement, prioritizing:
 * 1. Cities with the biggest deficit (needed - actual defenders)
 * 2. Cities on the same continent
 * 3. Closer cities (tie-breaking)
 *
 * Ported from the underdefended city search logic in FUN_00538a29
 * (combination of lines 3419-3486 role 4 search and general routing).
 */
function _findCityNeedingReinforcement(gameState, mapBase, spatialIdx, civSlot, fromGx, fromGy,
                                        unitBodyId, cityDefense, strategy) {
  let bestCity = null;
  let bestScore = -Infinity;

  for (const [ci, info] of cityDefense) {
    const city = info.city;
    if (!city || city.size <= 0) continue;

    // Same continent check for land units
    if (unitBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== unitBodyId) continue;
    }

    // Compute deficit: how many more defenders does this city need?
    const actualDef = _countDefendersAtTile(gameState, spatialIdx, city.gx, city.gy, civSlot);
    const neededDef = _computeNeededGarrison(
      city, ci, gameState, mapBase, spatialIdx, civSlot, strategy
    );
    const deficit = neededDef - actualDef;

    if (deficit <= 0) continue; // city is adequately defended

    // Distance penalty
    const dist = tileDist(fromGx, fromGy, city.gx, city.gy, mapBase);

    // Score: deficit × 100 - distance (prefer bigger deficits, closer cities)
    // Ported from decompiled priority logic: distance used as tie-breaker
    let score = deficit * 100 - dist;

    // Bonus if city is threatened by nearby enemies
    if (_anyEnemyNearCity(gameState, mapBase, city.gx, city.gy, civSlot)) {
      score += 200;
    }

    // Bonus for larger cities (ported from citySize scoring in decompiled)
    score += city.size * 5;

    if (score > bestScore) {
      bestScore = score;
      bestCity = city;
    }
  }

  return bestCity;
}

/**
 * Find nearest own city on same continent (for defenders heading home).
 */
function _findNearestOwnCityOnContinent(gameState, mapBase, gx, gy, civSlot, domain, bodyId) {
  let best = null;
  let bestDist = Infinity;
  for (const city of gameState.cities) {
    if (!city || city.owner !== civSlot || city.size <= 0) continue;
    if (domain === 0 && bodyId > 0) {
      const cb = mapBase.getBodyId(city.gx, city.gy);
      if (cb > 0 && cb !== bodyId) continue;
    }
    const d = tileDist(gx, gy, city.gx, city.gy, mapBase);
    if (d < bestDist) {
      bestDist = d;
      best = city;
    }
  }
  return best;
}

/**
 * Defender exploration: when a defender has no city to go to,
 * try moving toward an unexplored tile or doing a random move.
 */
function _defenderExplore(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain) {
  // Try to move toward unexplored tiles
  const unexplored = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, domain, 10);
  if (unexplored) {
    const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
      unexplored.gx, unexplored.gy, unit, civSlot);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }
  return null;
}

/**
 * Defender blocking enemy cities: when outside a city and not heavily damaged,
 * check for nearby hostile enemy cities and position near them.
 *
 * Ported from lines 3127-3212 of FUN_00538a29:
 * - Looks for enemy cities with hatred flag (treaty & 0x20)
 * - If within movement range, evaluates surrounding tiles for defensive positioning
 * - Picks tile with best defensive terrain that's closest to unit
 */
function _defenderBlockEnemyCity(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot,
                                  unitBodyId, strategy) {
  // Only if we're not already busy with goto orders
  if (unit.orders && unit.orders !== 'none' && unit.orders !== 'fortified') return null;

  const moveRange = (UNIT_MOVE_POINTS[unit.type] || 1) * 4; // approximate reach in doubled-coord

  let bestTarget = null;
  let bestScore = -Infinity;

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === civSlot) continue;
    if (!isAtWar(gameState, civSlot, city.owner)) continue;

    // Same continent check
    if (unitBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== unitBodyId) continue;
    }

    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
    if (dist > moveRange) continue;

    // Score: prefer closer, larger enemy cities
    const score = city.size * 10 - dist;
    if (score > bestScore) {
      bestScore = score;
      bestTarget = city;
    }
  }

  if (!bestTarget) return null;

  // Move toward the enemy city but stop adjacent (don't enter)
  const dist = tileDist(unit.gx, unit.gy, bestTarget.gx, bestTarget.gy, mapBase);
  if (dist <= 2) {
    // Already adjacent — fortify in place for defensive bonus
    return { type: 'UNIT_ORDER', unitIndex, order: 'fortify' };
  }

  const dir = safeDirectionToward(mapBase, gameState, spatialIdx, unit.gx, unit.gy,
    bestTarget.gx, bestTarget.gy, unit, civSlot);
  if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };

  return null;
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
 *
 * Ported from FUN_00538a29 role 4 logic (lines 3041-3115 + 3349-3612).
 *
 * Air defense stacking logic:
 * - Counts air defense units (role 4) in current city
 * - Determines max air units that should stack here (min(UNIT_CARRY_CAP, 3))
 * - If city needs more air defense, stay and skip (ready for intercept)
 * - If city has enough, find a city that needs air cover
 * - Prioritizes cities with airbase/airport, then threatened frontline cities
 * - Air units that can't find a useful position skip to conserve fuel
 */
function aiAirDefense(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // ── Check if in a city (air units must land in cities/airbases) ──
  const inCityIdx = _findOwnCityAtTile(gameState, unit.gx, unit.gy, civSlot);
  const inCity = inCityIdx >= 0;

  if (inCity) {
    // ── Count air defense units at this city ──
    // Ported from lines 3349-3383: walk the unit stack, count role 4 + role 5 units
    const airDefHere = _countAirDefenseAtTile(gameState, spatialIdx, unit.gx, unit.gy, civSlot);
    const city = gameState.cities[inCityIdx];

    // ── Determine max air defense units for this city ──
    // Ported from lines 3410-3420: max = min(UNIT_CARRY_CAP equivalent, 3)
    // If city is threatened (enemies on same continent), allow more
    const enemiesNearby = _anyEnemyNearCity(gameState, mapBase, city.gx, city.gy, civSlot);
    let maxAirDef = enemiesNearby ? 3 : 1;

    // If city has no threats at all, only 1 interceptor needed
    const bodyId = mapBase.getBodyId(city.gx, city.gy);
    const continentThreat = _getContinentThreatLevel(gameState, mapBase, civSlot, bodyId);
    if (continentThreat === 0) maxAirDef = 1;

    if (airDefHere <= maxAirDef) {
      // City needs this air defense unit — stay
      return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
    }

    // ── Excess air defense: find a city that needs air cover ──
    // Ported from lines 3419-3486: search own cities for ones needing air defense
    const targetCity = _findCityNeedingAirDefense(
      gameState, mapBase, spatialIdx, civSlot, unit.gx, unit.gy, unitIndex
    );

    if (targetCity) {
      // Rebase to that city
      const rebaseAction = { type: 'REBASE', unitIndex, targetGx: targetCity.gx, targetGy: targetCity.gy };
      const err = validateAction(gameState, mapBase, rebaseAction, civSlot);
      if (!err) return rebaseAction;

      // If rebase fails (out of range?), try moving toward it
      const dir = directionToward(mapBase, unit.gx, unit.gy, targetCity.gx, targetCity.gy, 2);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }

    // No city needs us — stay here
    return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
  }

  // ── Not in a city: land at nearest own city (air units crash otherwise) ──
  const nearestCity = _findNearestOwnCityOnContinent(
    gameState, mapBase, unit.gx, unit.gy, civSlot, 2, -1
  );
  if (nearestCity) {
    const rebaseAction = { type: 'REBASE', unitIndex, targetGx: nearestCity.gx, targetGy: nearestCity.gy };
    const err = validateAction(gameState, mapBase, rebaseAction, civSlot);
    if (!err) return rebaseAction;

    const dir = directionToward(mapBase, unit.gx, unit.gy, nearestCity.gx, nearestCity.gy, 2);
    if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
  }

  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

// ── aiAirDefense helpers ──────────────────────────────────────────

/**
 * Count air defense (role 4) units at a tile owned by civSlot.
 */
function _countAirDefenseAtTile(gameState, spatialIdx, gx, gy, civSlot) {
  const entries = unitsAt(spatialIdx, gx, gy);
  let count = 0;
  for (const { unit } of entries) {
    if (unit.owner !== civSlot || unit.gx < 0) continue;
    const role = UNIT_ROLE[unit.type] ?? 0;
    if (role === 4) count++;
  }
  return count;
}

/**
 * Get continent threat level: 0 = no enemies, 1 = enemies present, 2 = under attack.
 * Approximation of DAT_0064ca32 continent threat status.
 */
function _getContinentThreatLevel(gameState, mapBase, civSlot, bodyId) {
  if (bodyId <= 0) return 0;
  let hasEnemyCity = false;
  let hasEnemyUnit = false;

  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner === civSlot) continue;
    if (!isAtWar(gameState, civSlot, city.owner)) continue;
    const cb = mapBase.getBodyId(city.gx, city.gy);
    if (cb === bodyId) { hasEnemyCity = true; break; }
  }

  if (!hasEnemyCity) {
    for (const u of gameState.units) {
      if (u.gx < 0 || u.owner === civSlot) continue;
      if ((UNIT_ATK[u.type] || 0) <= 0) continue;
      if (!isAtWar(gameState, civSlot, u.owner)) continue;
      const ub = mapBase.getBodyId(u.gx, u.gy);
      if (ub === bodyId) { hasEnemyUnit = true; break; }
    }
  }

  if (hasEnemyCity) return 2;
  if (hasEnemyUnit) return 1;
  return 0;
}

/**
 * Find a city that needs air defense cover.
 * Ported from lines 3419-3486: iterate own cities, find ones with no/few air defenders.
 * Prioritize:
 * - Cities with airport (building 32) or airbase improvement
 * - Threatened cities (enemies on continent)
 * - Closer cities
 */
function _findCityNeedingAirDefense(gameState, mapBase, spatialIdx, civSlot, fromGx, fromGy, excludeUnit) {
  let bestCity = null;
  let bestScore = -Infinity;

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.owner !== civSlot || city.size <= 0 || city.gx < 0) continue;

    // Count existing air defense at this city
    const airDefHere = _countAirDefenseAtTile(gameState, spatialIdx, city.gx, city.gy, civSlot);
    if (airDefHere >= 2) continue; // already has enough

    const dist = tileDist(fromGx, fromGy, city.gx, city.gy, mapBase);
    const bodyId = mapBase.getBodyId(city.gx, city.gy);
    const threat = _getContinentThreatLevel(gameState, mapBase, civSlot, bodyId);

    // Base score: threat level, minus air defense already there
    let score = threat * 100 + city.size * 5 - airDefHere * 50 - dist;

    // Bonus for cities with airport
    if (city.buildings?.has(32)) score += 50;

    // Bonus for frontier cities (enemies nearby)
    if (_anyEnemyNearCity(gameState, mapBase, city.gx, city.gy, civSlot)) {
      score += 150;
    }

    // Only go to cities that have NO air defense yet, or are threatened
    if (airDefHere === 0 || threat > 0) {
      if (score > bestScore) {
        bestScore = score;
        bestCity = city;
      }
    }
  }

  return bestCity;
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
 * Ported from Civ2 FUN_00538a29 role 6 logic (lines 2808-2928).
 *
 * The decompiled logic:
 * 1. If unit has a goto order toward an enemy city (orders == 0x0B),
 *    check if that city still belongs to an enemy we're at war with.
 *    If so, keep going (local_a4 = 1 → proceed to movement evaluator).
 * 2. Otherwise, if the diplomat is NOT in a city (FUN_005b89e4 == 0):
 *    Score all cities as potential targets:
 *    - Must be on the same continent (bodyId match), or reachable via
 *      adjacent tiles on the same continent
 *    - Own cities: score = 99 - distance (lower priority)
 *    - Foreign cities:
 *      a. If we have treaty (flags & 0xe): complex diplomatic checks
 *         determine whether to halve the score or skip entirely
 *      b. If they hate us (treaty & 0x20): score += 100 (high priority)
 *      c. Otherwise: score += diplomatic_value(us, them)
 *      d. Score /= (distance + 1)
 *      e. If city has capital flag (& 8): halve score; if tech gap > 6:
 *         halve again; if we have embassy: score = 1
 *      f. Final: score += 100
 *    Pick the city with the highest score and goto it (order 0x53='S').
 * 3. If in an enemy city: perform espionage action.
 * 4. If no valid target found and no goto order: disband.
 *
 * Our JS adaptation preserves the scoring structure but uses our
 * action types (STEAL_TECH, SABOTAGE_CITY, INCITE_REVOLT) and
 * _evaluateDirections() for movement.
 */
function aiDiplomat(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(unit.gx, unit.gy) : -1;

  // ── 1. If we're in an enemy city → perform espionage action ──
  // Ported from the implicit check: when diplomat arrives at target city,
  // the goto order is cleared and the espionage action fires.
  const enemyCityHere = gameState.cities.find(c =>
    c.gx === unit.gx && c.gy === unit.gy && c.owner !== civSlot && c.size > 0 &&
    isAtWar(gameState, civSlot, c.owner));

  if (enemyCityHere) {
    // Try steal tech first (highest value action)
    const stealAction = { type: 'STEAL_TECH', unitIndex };
    const stealErr = validateAction(gameState, mapBase, stealAction, civSlot);
    if (!stealErr) return stealAction;

    // Try sabotage (always available against enemy cities)
    const sabAction = { type: 'SABOTAGE_CITY', unitIndex };
    const sabErr = validateAction(gameState, mapBase, sabAction, civSlot);
    if (!sabErr) return sabAction;

    // Try incite revolt (costs gold)
    const inciteAction = { type: 'INCITE_REVOLT', unitIndex };
    const inciteErr = validateAction(gameState, mapBase, inciteAction, civSlot);
    if (!inciteErr) return inciteAction;
  }

  // ── 2. Score all cities as potential targets ──
  // Ported from the city scoring loop at lines 2823-2911.
  // Key variables:
  //   local_38 = bestScore (-999 initial)
  //   local_160 = bestCityIndex (-1 initial)
  //   local_24 = hasEmbassy (FUN_00598d45) — we approximate as having contact
  //   local_78 = cityOwner
  //   local_70 = distance to city
  let bestScore = -999;
  let bestTargetCity = null;

  // Check if we have "embassy" equivalent — do we know about other civs?
  // In the binary, FUN_00598d45 checks if we've established embassy.
  // We approximate: true if we have contact with any non-war civ.
  const hasIntelligence = _diplomatHasIntelligence(gameState, civSlot);

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0 || city.gx < 0) continue;

    // ── Continent check (ported from iVar11 == iVar10) ──
    // City must be on the same continent, OR reachable via an adjacent
    // tile on the same continent (the 8-direction fallback at lines 2894-2907).
    if (domain === 0 && unitBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== unitBodyId) {
        // Check if any adjacent tile bridges to our continent
        if (!_canReachViaAdjacentTile(mapBase, unit.gx, unit.gy, city.gx, city.gy, unitBodyId)) {
          continue;
        }
      }
    }

    // ── Distance computation (FUN_005ae31d) ──
    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);

    // ── Distance penalty for far targets with no city at current tile ──
    // Ported from lines 2837-2840: if homeCity % 3 != cityIndex % 3
    // and we're not at a city (tile flag 0x10), and distance > threshold (3 or 4),
    // add 8 to distance penalty (makes far targets less attractive).
    let adjustedDist = dist;
    const homeCityId = unit.homeCityId ?? -1;
    const atCity = gameState.cities.some(c =>
      c.gx === unit.gx && c.gy === unit.gy && c.size > 0);
    if (homeCityId >= 0 && (homeCityId % 3 !== ci % 3) && !atCity && dist > 3) {
      adjustedDist += 8;
    }

    let score;
    const cityOwner = city.owner;

    if (cityOwner === civSlot) {
      // ── Own city: score = 99 - distance (low priority) ──
      // Ported from line 2843: local_18 = 99 - local_70
      score = 99 - adjustedDist;
    } else {
      // ── Foreign city: complex diplomatic scoring ──
      // Ported from lines 2846-2886
      score = 100;

      // Check treaty status
      const treatyStatus = getTreaty(gameState, civSlot, cityOwner);

      if (treatyStatus !== 'war') {
        // ── Has treaty (ported from treaty flags & 0xe check at line 2847) ──
        // Complex conditions determine whether to skip or halve score.
        // Simplified: if at peace/ceasefire and we have intelligence,
        // diplomatic units have limited value (halve score).
        // If the civ is technologically behind us, skip entirely.
        if (hasIntelligence) {
          // With intelligence, we generally don't need diplomats in allied cities
          score = Math.floor(score / 2);
        }

        // ── Capital check (ported from city flags & 8 at line 2876) ──
        // Targeting capitals is risky — halve score
        if (city.buildings?.has(1)) { // palace = building 1
          score = Math.floor(score / 2);
          // If large tech gap, halve again (ported from line 2878-2880)
          // Approximate: skip if target civ is much more advanced
          if (hasIntelligence) {
            score = 1; // ported from line 2882-2883
          }
        }
      } else {
        // ── At war: high-priority target ──
        // Check if they hate us (treaty & 0x20 equivalent)
        // In our model, war = hate. Add hatred bonus.
        score += 100; // ported from line 2873
      }

      // ── Divide by (distance + 1) — closer targets score higher ──
      // Ported from line 2875
      score = Math.floor(score / (adjustedDist + 1));

      // ── Capital penalty for war targets ──
      // Ported from lines 2876-2885: capitals are harder to infiltrate
      if (treatyStatus === 'war' && city.buildings?.has(1)) {
        score = Math.floor(score / 2);
      }

      // ── Final base offset ──
      // Ported from line 2886: local_18 += 100
      score += 100;
    }

    // ── Wonder bonus (not in original but valuable for AI) ──
    // Cities building wonders are high-value sabotage targets
    if (cityOwner !== civSlot && isAtWar(gameState, civSlot, cityOwner)) {
      const item = city.itemInProduction;
      if (item && item.type === 'wonder') {
        score += 50; // Sabotaging wonder production is very valuable
      }
      // Cities with many buildings are better sabotage targets
      if (city.buildings && city.buildings.size > 5) {
        score += 20;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestTargetCity = city;
    }
  }

  // ── 3. Move toward best target ──
  // Ported from lines 2912-2925:
  // If no target found (local_160 < 0) and no goto order: disband.
  // Otherwise, set goto order toward best city (FUN_00531607 with 0x53).
  if (bestTargetCity) {
    // If adjacent to the target city, move directly in
    const directDir = getDirection(unit.gx, unit.gy, bestTargetCity.gx, bestTargetCity.gy, mapBase);
    if (directDir) {
      return { type: 'MOVE_UNIT', unitIndex, dir: directDir };
    }

    // Use _evaluateDirections for smart pathing with enemy avoidance
    const moveDir = _evaluateDirections(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
      bestTargetCity.gx, bestTargetCity.gy, {
        role: 7, // diplomat role — triggers non-combat scoring in evaluator
        explore: false,
        avoidEnemies: true,
      }
    );
    if (moveDir) return { type: 'MOVE_UNIT', unitIndex, dir: moveDir };

    // Fallback: simple safe pathing
    const safeDir = safeDirectionToward(mapBase, gameState, spatialIdx,
      unit.gx, unit.gy, bestTargetCity.gx, bestTargetCity.gy, unit, civSlot);
    if (safeDir) return { type: 'MOVE_UNIT', unitIndex, dir: safeDir };
  }

  // ── 4. No target: skip (original disbands, but we skip to avoid losing units) ──
  // Ported from line 2914: thunk_FUN_005b6042(local_168, 1) = disband
  // We use skip instead — disbanding is too aggressive for our game state
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

/**
 * AI for Role 8 (Trade): caravans/freight.
 *
 * Ported from Civ2 FUN_00538a29 role 7 logic (lines 2930-3040).
 *
 * The decompiled logic has two phases:
 *
 * Phase A — Wonder delivery check (lines 2930-2964):
 *   If the caravan is IN a city (FUN_005b89e4 != 0):
 *   - Check all 8 adjacent tiles for empty tiles on the same continent
 *     that have active AI continent goals (DAT_0064c9f2 != 0)
 *   - Score each direction based on military presence across all civs
 *     on that continent: for own civ halve the score, for others double it
 *   - If a good direction found, set order 0x74='t' (trade goto) and move
 *   This is the "help build wonder" mechanic — caravans move toward
 *   cities building wonders on active continents.
 *
 * Phase B — Trade route selection (lines 2966-3040):
 *   If not adjacent to a wonder target, score all cities for trade routes:
 *   - Must be on the same continent (bodyId match)
 *   - Trade value = (homeCity.totalTrade + targetCity.totalTrade) * distance / 24
 *     (Civ2 trade routes yield gold/science proportional to combined trade
 *      output and distance between cities)
 *   - Own city target: halve the value (domestic trade is less valuable)
 *   - Foreign city: multiply by diplomatic attitude factor (200 - attitude) / 100
 *     (friendly civs give better trade, hostile civs worse)
 *   - If city already has a trade route with this target: halve (diminishing returns)
 *   - Scale by remaining trade route slots: (5 - tradeRouteCount) / 5
 *   - Additional penalties for certain diplomatic conditions
 *   Pick the best city and goto it (order 99 = caravan goto).
 *
 * Fallback: if homeCity is known and on same continent, goto homeCity.
 */
function aiTrader(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  const domain = UNIT_DOMAIN[unit.type] ?? 0;
  const unitBodyId = (domain === 0) ? mapBase.getBodyId(unit.gx, unit.gy) : -1;

  // ── 1. If we're in a city → establish trade route or help wonder ──
  // Check for cities at our location (can be own city delivering to wonder,
  // or foreign city establishing trade route).

  // First check: are we in a foreign city? → establish trade route
  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0) continue;
    if (city.gx !== unit.gx || city.gy !== unit.gy) continue;
    if (city.owner === civSlot) continue; // must be foreign

    const tradeAction = { type: 'ESTABLISH_TRADE', unitIndex, cityIndex: ci };
    const err = validateAction(gameState, mapBase, tradeAction, civSlot);
    if (!err) return tradeAction;
  }

  // Check: are we in our own city building a wonder? → deliver shields
  // (In the original game this is ESTABLISH_TRADE to own wonder-building city.
  //  Our validation allows own-city trade if it's not the home city.)
  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0) continue;
    if (city.gx !== unit.gx || city.gy !== unit.gy) continue;
    if (city.owner !== civSlot) continue;

    // Prioritize wonder delivery: if this city is building a wonder, deliver
    const item = city.itemInProduction;
    if (item && item.type === 'wonder') {
      const tradeAction = { type: 'ESTABLISH_TRADE', unitIndex, cityIndex: ci };
      const err = validateAction(gameState, mapBase, tradeAction, civSlot);
      if (!err) return tradeAction;
    }
  }

  // Also check own cities for non-wonder trade (valid if different from home)
  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0) continue;
    if (city.gx !== unit.gx || city.gy !== unit.gy) continue;
    if (city.owner !== civSlot) continue;

    const tradeAction = { type: 'ESTABLISH_TRADE', unitIndex, cityIndex: ci };
    const err = validateAction(gameState, mapBase, tradeAction, civSlot);
    if (!err) return tradeAction;
  }

  // ── 2. Phase A: Check own cities building wonders → deliver shields ──
  // Ported from lines 2930-2964: if we're in a city, look for adjacent
  // wonder-building cities to deliver to.
  // In our adaptation: scan all own cities building wonders and prioritize
  // the closest one on the same continent.
  let wonderTarget = _findOwnWonderCity(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, unitBodyId);
  if (wonderTarget) {
    // If adjacent, move directly in
    const directDir = getDirection(unit.gx, unit.gy, wonderTarget.gx, wonderTarget.gy, mapBase);
    if (directDir) {
      return { type: 'MOVE_UNIT', unitIndex, dir: directDir };
    }

    // Use safe pathing toward wonder city
    const moveDir = _evaluateDirections(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
      wonderTarget.gx, wonderTarget.gy, {
        role: 8, // trade role
        explore: false,
        avoidEnemies: true,
      }
    );
    if (moveDir) return { type: 'MOVE_UNIT', unitIndex, dir: moveDir };

    const safeDir = safeDirectionToward(mapBase, gameState, spatialIdx,
      unit.gx, unit.gy, wonderTarget.gx, wonderTarget.gy, unit, civSlot);
    if (safeDir) return { type: 'MOVE_UNIT', unitIndex, dir: safeDir };
  }

  // ── 3. Phase B: Score all cities for trade route value ──
  // Ported from lines 2966-3023.
  // Key formula: tradeValue = (homeTradeOutput + targetTradeOutput) * distance / 24
  const homeCityId = unit.homeCityId ?? -1;
  let homeCity = null;
  if (homeCityId >= 0 && homeCityId < gameState.cities.length) {
    homeCity = gameState.cities[homeCityId];
    if (homeCity && homeCity.size <= 0) homeCity = null;
  }

  // If no home city, use the nearest own city as a proxy
  // Ported from lines 2968-2976: fallback to local_40 (nearest own city)
  if (!homeCity) {
    const nearest = _findNearestOwnCity(gameState, mapBase, unit.gx, unit.gy, civSlot, domain, unitBodyId);
    if (nearest) {
      // Find its index
      for (let ci = 0; ci < gameState.cities.length; ci++) {
        if (gameState.cities[ci] === nearest) { homeCity = nearest; break; }
      }
    }
  }

  // If still no home city, disband (ported from line 2978: FUN_005b6042)
  // We skip instead of disbanding.
  if (!homeCity) {
    return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
  }

  // Get home city's trade output (approximate from size if not available)
  const homeTradeOutput = _getCityTradeOutput(homeCity);

  let bestTradeScore = 0;
  let bestTradeCity = null;

  for (let ci = 0; ci < gameState.cities.length; ci++) {
    const city = gameState.cities[ci];
    if (!city || city.size <= 0 || city.gx < 0) continue;

    // ── Same continent check (ported from iVar11 == iVar10) ──
    if (domain === 0 && unitBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== unitBodyId) continue;
    }

    // ── Check existing trade routes — skip if already trading with this city ──
    // Ported from lines 2986-2993: iterate home city's trade route partners
    let alreadyTrading = false;
    if (homeCity.tradeRoutes) {
      for (const route of homeCity.tradeRoutes) {
        if (route === ci || route?.cityIndex === ci) {
          alreadyTrading = true;
          break;
        }
      }
    }

    // ── Distance between the two cities (not from caravan position) ──
    // Ported from line 2994-2997: FUN_005ae31d(city.x, city.y, homeCity.x, homeCity.y)
    const routeDistance = tileDist(city.gx, city.gy, homeCity.gx, homeCity.gy, mapBase);

    // ── Trade value formula ──
    // Ported from lines 2998-2999:
    // local_70 = ((homeCity.totalTrade + targetCity.totalTrade) * distance) / 0x18
    // 0x18 = 24
    const targetTradeOutput = _getCityTradeOutput(city);
    let tradeValue = Math.floor(((homeTradeOutput + targetTradeOutput) * routeDistance) / 24);

    if (city.owner === civSlot) {
      // ── Own city: halve value (domestic trade less valuable) ──
      // Ported from lines 3000-3001
      tradeValue = Math.floor(tradeValue / 2);
    } else {
      // ── Foreign city: apply diplomatic attitude factor ──
      // Ported from lines 3003-3007:
      // uVar9 = FUN_00467904(uVar8, cityOwner, 0, 100) → diplomatic score 0-200
      // local_cc = FUN_005adfa0(uVar9) → absolute value
      // tradeValue = (200 - abs(diplomaticScore)) * tradeValue / 100
      const treatyStatus = getTreaty(gameState, civSlot, city.owner);
      if (treatyStatus === 'war') {
        // At war: zero trade value (can't establish trade with enemies)
        continue;
      }
      // Approximate diplomatic factor: peace = 150/100, ceasefire = 120/100
      let diplomaticFactor = 200;
      if (treatyStatus === 'peace') diplomaticFactor = 150;
      else if (treatyStatus === 'ceasefire') diplomaticFactor = 120;
      else diplomaticFactor = 100; // neutral/unknown
      tradeValue = Math.floor((diplomaticFactor * tradeValue) / 100);
    }

    // ── Already trading penalty: halve if route exists ──
    // Ported from lines 3009-3010
    if (alreadyTrading) {
      tradeValue = Math.floor(tradeValue / 2);
    }

    // ── Remaining trade route slots factor ──
    // Ported from line 3012: ((5 - tradeRouteCount) * tradeValue) / 5
    // city.tradeRoutes stores the target city's trade route count
    const cityTradeRouteCount = city.tradeRoutes?.length || 0;
    tradeValue = Math.floor(((5 - Math.min(cityTradeRouteCount, 4)) * tradeValue) / 5);

    // ── Skip cities with no remaining trade route capacity ──
    if (cityTradeRouteCount >= 3) continue;

    // ── Same home city penalty: can't trade with self ──
    if (ci === homeCityId) continue;

    if (tradeValue > bestTradeScore) {
      bestTradeScore = tradeValue;
      bestTradeCity = city;
    }
  }

  // ── 4. Move toward best trade target ──
  // Ported from lines 3025-3027: FUN_00531607(unitIdx, 99, city.x, city.y)
  if (bestTradeCity) {
    // If adjacent, move directly in
    const directDir = getDirection(unit.gx, unit.gy, bestTradeCity.gx, bestTradeCity.gy, mapBase);
    if (directDir) {
      return { type: 'MOVE_UNIT', unitIndex, dir: directDir };
    }

    // Use _evaluateDirections for smart pathing with enemy avoidance
    const moveDir = _evaluateDirections(
      unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, domain,
      bestTradeCity.gx, bestTradeCity.gy, {
        role: 8,
        explore: false,
        avoidEnemies: true,
      }
    );
    if (moveDir) return { type: 'MOVE_UNIT', unitIndex, dir: moveDir };

    // Fallback: simple safe pathing
    const safeDir = safeDirectionToward(mapBase, gameState, spatialIdx,
      unit.gx, unit.gy, bestTradeCity.gx, bestTradeCity.gy, unit, civSlot);
    if (safeDir) return { type: 'MOVE_UNIT', unitIndex, dir: safeDir };
  }

  // ── 5. Fallback: goto home city if on same continent ──
  // Ported from lines 3030-3038: if homeCity is known and reachable, goto it.
  if (homeCity && unitBodyId > 0) {
    const homeCityBodyId = mapBase.getBodyId(homeCity.gx, homeCity.gy);
    if (homeCityBodyId === unitBodyId) {
      const dir = safeDirectionToward(mapBase, gameState, spatialIdx,
        unit.gx, unit.gy, homeCity.gx, homeCity.gy, unit, civSlot);
      if (dir) return { type: 'MOVE_UNIT', unitIndex, dir };
    }
  }

  // ── 6. Fallback: skip ──
  return { type: 'UNIT_ORDER', unitIndex, order: 'skip' };
}

// ── aiDiplomat / aiTrader helpers ─────────────────────────────────────

/**
 * Check if our civ has "intelligence" about other civs.
 * Approximation of FUN_00598d45 — checks if we've established embassy
 * or have any non-war diplomatic contact.
 */
function _diplomatHasIntelligence(gameState, civSlot) {
  if (!gameState.civs) return false;
  for (let i = 1; i < 8; i++) {
    if (i === civSlot) continue;
    if (!(gameState.civsAlive & (1 << i))) continue;
    const treaty = getTreaty(gameState, civSlot, i);
    if (treaty !== 'war') return true;
  }
  return false;
}

/**
 * Check if a city can be reached from the unit's continent via an adjacent tile.
 * Ported from the 8-direction fallback loop at lines 2894-2907 of the decompiled code.
 * Used when the city is on a different bodyId — checks if any neighbor tile bridges.
 */
function _canReachViaAdjacentTile(mapBase, unitGx, unitGy, cityGx, cityGy, unitBodyId) {
  const neighbors = mapBase.getNeighbors(unitGx, unitGy);
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const terrain = mapBase.getTerrain(wnx, ny);
    if (terrain === 10) continue; // skip ocean
    const neighborBodyId = mapBase.getBodyId(wnx, ny);
    if (neighborBodyId > 0) {
      const cityBodyId = mapBase.getBodyId(cityGx, cityGy);
      if (neighborBodyId === cityBodyId) return true;
    }
  }
  return false;
}

/**
 * Find own city building a wonder, prioritized by distance.
 * Used by caravan AI (Phase A: wonder delivery).
 * Returns the closest own wonder-building city on the same continent, or null.
 */
function _findOwnWonderCity(gameState, mapBase, fromGx, fromGy, civSlot, domain, bodyId) {
  let best = null;
  let bestDist = Infinity;

  for (const city of gameState.cities) {
    if (!city || city.size <= 0 || city.gx < 0) continue;
    if (city.owner !== civSlot) continue;

    // Must be building a wonder
    const item = city.itemInProduction;
    if (!item || item.type !== 'wonder') continue;

    // Same continent check
    if (domain === 0 && bodyId > 0) {
      const cityBodyId = mapBase.getBodyId(city.gx, city.gy);
      if (cityBodyId > 0 && cityBodyId !== bodyId) continue;
    }

    // Skip if we're already at this city (can't deliver to self)
    if (city.gx === fromGx && city.gy === fromGy) continue;

    const dist = tileDist(fromGx, fromGy, city.gx, city.gy, mapBase);
    if (dist < bestDist) {
      bestDist = dist;
      best = city;
    }
  }

  return best;
}

/**
 * Get a city's trade output (approximation).
 * In the decompiled code this is DAT_0064f35e + city*0x58 (totalTrade).
 * We use city.size as a proxy since totalTrade may not be computed.
 */
function _getCityTradeOutput(city) {
  // If the city has a computed trade value, use it
  if (city.totalTrade != null && city.totalTrade > 0) return city.totalTrade;
  // Otherwise approximate: trade roughly scales with city size
  // Average trade per citizen is ~2-4, so size * 3 is a reasonable proxy
  return (city.size || 1) * 3;
}

/**
 * AI for Explorer units (type 50): non-combat exploration.
 *
 * Now uses the ported 8-direction evaluator from the Civ2 binary.
 * Explorers prioritize:
 * 1. Goody huts (+20 bonus in evaluator)
 * 2. Unexplored tiles (exploration lookahead)
 * 3. Avoidance of enemy combat units
 * 4. Terrain movement cost (prefer roads, avoid mountains)
 */
function aiExplorer(unit, unitIndex, gameState, mapBase, spatialIdx, civSlot) {
  // Find the best exploration target: goody hut first, then unexplored
  let targetGx = null;
  let targetGy = null;

  const goody = findNearestGoodyHut(mapBase, unit.gx, unit.gy, civSlot);
  if (goody) {
    targetGx = goody.gx;
    targetGy = goody.gy;
  } else {
    const unexplored = findNearestUnexplored(mapBase, unit.gx, unit.gy, civSlot, 0);
    if (unexplored) {
      targetGx = unexplored.gx;
      targetGy = unexplored.gy;
    }
  }

  // Use the full 8-direction evaluator with exploration + enemy avoidance
  const moveDir = _evaluateDirections(
    unit, unitIndex, gameState, mapBase, spatialIdx, civSlot, 0,
    targetGx, targetGy, {
      role: 0,
      explore: true,
      avoidEnemies: true,
    }
  );

  if (moveDir) return { type: 'MOVE_UNIT', unitIndex, dir: moveDir };

  // Fallback: random safe movement (same as before)
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

  // ── Pre-compute which units to wake up ─────────────────────────
  // Units that were sentry'd/fortified by cleanup in previous turns and
  // are NOT inside our cities should be re-evaluated this turn.
  // We track them in a Set so the main loop can bypass the BUSY_ORDERS check.
  const WAKE_ORDERS = new Set(['sentry', 'fortified', 'sleep']);
  const wakeUpUnits = new Set();
  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];
    if (unit.owner !== civSlot || unit.gx < 0 || unit.movesLeft <= 0) continue;
    if (!WAKE_ORDERS.has(unit.orders)) continue;

    // Don't wake units inside our cities — they're intentionally garrisoned
    const inOwnCity = gameState.cities.some(c =>
      c.gx === unit.gx && c.gy === unit.gy && c.owner === civSlot && c.size > 0);
    if (inOwnCity) continue;

    wakeUpUnits.add(i);
  }

  const spatialIdx = buildUnitSpatialIndex(gameState);
  const cityDefense = analyzeCityDefense(gameState, mapBase, civSlot);

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    // Skip units that aren't ours, are dead, or have no moves
    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;

    // Skip busy units UNLESS they're outside cities and need waking up
    if (BUSY_ORDERS.has(unit.orders) && !wakeUpUnits.has(i)) continue;

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
          action = aiDefender(unit, i, gameState, mapBase, spatialIdx, civSlot, strategy, cityDefense);
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

    // Non-city idle units: use skip (one-turn) instead of sentry (permanent).
    // Sentry makes units invisible to future AI turns since BUSY_ORDERS gates
    // all phases, causing units to get permanently stuck outside cities.

    // For everything else, skip
    const skipAction = { type: 'UNIT_ORDER', unitIndex: i, order: 'skip' };
    const err = validateAction(gameState, mapBase, skipAction, civSlot);
    if (!err) {
      actions.push(skipAction);
    }
  }

  return actions;
}
