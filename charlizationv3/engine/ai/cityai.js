// ═══════════════════════════════════════════════════════════════════
// ai/cityai.js — Settler/Worker AI: city founding, tile improvements
//
// Ported from Civ2 settler AI logic. Handles:
//   - City site evaluation and founding
//   - Worker tile improvement priorities
//   - Settler movement toward optimal sites
// ═══════════════════════════════════════════════════════════════════

import { resolveDirection } from '../movement.js';
import { validateAction } from '../rules.js';
import {
  BUSY_ORDERS, CIV_CITY_NAMES,
  CAN_IRRIGATE, CAN_MINE, IRRIGATION_TURNS, MINING_TURNS,
  CITY_RADIUS_DOUBLED, TERRAIN_BASE,
  SPECIAL_TOTAL, IRRIGATION_BONUS, MINING_BONUS,
  UNIT_ATK,
} from '../defs.js';

// ── Constants ─────────────────────────────────────────────────────

/** Minimum doubled-coord distance between AI cities. */
const MIN_CITY_SPACING = 6;

/** Absolute minimum (rules enforcement). */
const MIN_CITY_SPACING_ABSOLUTE = 3;

/**
 * Bonus for neighbor tiles near an enemy city (from Civ2 AI FUN_005312e4).
 * In the decompiled binary, each neighbor tile adjacent to a hostile city
 * gets +12 to the candidate score — aggressive expansion into enemy territory.
 */
const ENEMY_TERRITORY_BONUS = 12;

/** Settler search radius for city sites. */
const SITE_SEARCH_RADIUS = 10;

/** Score threshold to build a city (first city is lower). */
const BUILD_THRESHOLD_FIRST = 10;
const BUILD_THRESHOLD_NORMAL = 25;

/** Maximum worker move distance before heading to a city. */
const WORKER_MAX_WANDER = 6;

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
 * Check if a tile is within map bounds.
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

// ── Danger detection ──────────────────────────────────────────────

/**
 * Check if a tile is adjacent to enemy combat units.
 */
function isAdjacentToEnemy(gx, gy, mapBase, gameState, civSlot) {
  const neighbors = mapBase.getNeighbors(gx, gy);
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    for (const u of gameState.units) {
      if (u.gx === wnx && u.gy === ny && u.gx >= 0 &&
          u.owner !== civSlot && isAtWar(gameState, civSlot, u.owner) &&
          (UNIT_ATK[u.type] || 0) > 0) {
        return true;
      }
    }
  }
  return false;
}

// ── City naming ───────────────────────────────────────────────────

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

// ── City site evaluation (ported from Civ2 FUN_005312e4) ─────────

/**
 * Compute the food/shield/trade yield of a tile, considering terrain,
 * special resources, irrigation, and mining.
 *
 * Returns [food, shields, trade].
 */
function tileYield(gx, gy, mapBase) {
  const terrain = mapBase.getTerrain(gx, gy);
  if (terrain < 0 || terrain > 10) return [0, 0, 0];

  const base = TERRAIN_BASE[terrain];
  let food = base[0];
  let shields = base[1];
  let trade = base[2];

  // Check for special resources
  const res = mapBase.getResource(gx, gy);
  if (res > 0 && SPECIAL_TOTAL[terrain]) {
    const specIdx = res - 1; // 1-based to 0-based
    const spec = SPECIAL_TOTAL[terrain][specIdx];
    if (spec) {
      // Special resources replace base yields
      food = spec[0];
      shields = spec[1];
      trade = spec[2];
    }
  }

  // Check existing improvements
  const imp = mapBase.getImprovements(gx, gy);
  if (imp.irrigation && res === 0) food += IRRIGATION_BONUS[terrain] || 0;
  if (imp.mining && !imp.irrigation && res === 0) shields += MINING_BONUS[terrain] || 0;

  // Rivers add +1 trade
  if (mapBase.hasRiver(gx, gy)) trade += 1;

  return [food, shields, trade];
}

/**
 * Compute potential yield if the tile were improved (for city site scoring).
 * Estimates what yields COULD be if irrigation/mining were added.
 */
function potentialTileYield(gx, gy, mapBase) {
  const terrain = mapBase.getTerrain(gx, gy);
  if (terrain < 0 || terrain > 10) return [0, 0, 0];

  const base = TERRAIN_BASE[terrain];
  let food = base[0];
  let shields = base[1];
  let trade = base[2];

  // Special resources
  const res = mapBase.getResource(gx, gy);
  if (res > 0 && SPECIAL_TOTAL[terrain]) {
    const specIdx = res - 1;
    const spec = SPECIAL_TOTAL[terrain][specIdx];
    if (spec) {
      food = spec[0];
      shields = spec[1];
      trade = spec[2];
    }
  }

  // Potential irrigation bonus (if terrain supports it)
  if (CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0 && res === 0) {
    food += IRRIGATION_BONUS[terrain] || 0;
  }

  // Potential mining bonus (only if terrain prefers mining over irrigation)
  if (CAN_MINE[terrain] && MINING_TURNS[terrain] > 0 && res === 0) {
    // Hills/mountains benefit more from mining than irrigation
    if (terrain === 4 || terrain === 5 || terrain === 7) {
      shields += MINING_BONUS[terrain] || 0;
    }
  }

  // Rivers add +1 trade
  if (mapBase.hasRiver(gx, gy)) trade += 1;

  return [food, shields, trade];
}

// ── Private helpers for FUN_005312e4 port ─────────────────────────

/**
 * Check if a tile has an enemy city (owned by a different civ).
 * Ported from FUN_005b8ca6 (get_city_owner_at): returns civ slot of
 * the city owner if there's a city on the tile, or -1 if no city.
 *
 * @param {number} gx
 * @param {number} gy
 * @param {object} gameState
 * @returns {number} owner civ slot, or -1 if no city
 */
function _getCityOwnerAt(gx, gy, gameState) {
  for (const city of gameState.cities) {
    if (city.size <= 0) continue;
    if (city.gx === gx && city.gy === gy) return city.owner;
  }
  return -1;
}

/**
 * Check if any alive units occupy the given tile.
 * Ported from FUN_005b8d62 (get_unit_owner_at): returns owner if any
 * unit is present, or -1 if empty.
 *
 * @param {number} gx
 * @param {number} gy
 * @param {object} gameState
 * @returns {number} owner civ slot, or -1 if no units
 */
function _getUnitOwnerAt(gx, gy, gameState) {
  for (const u of gameState.units) {
    if (u.gx < 0) continue;
    if (u.gx === gx && u.gy === gy) return u.owner;
  }
  return -1;
}

/**
 * Get the effective owner of a tile (city radius ownership priority).
 * Ported from FUN_005b8c42 (get_tile_effective_owner):
 * - Returns cityRadiusOwner (1-7) if set
 * - Falls back to tile fertility owner, clamped (1-8 → 8)
 * - Returns 0 if unowned
 *
 * @param {number} gx
 * @param {number} gy
 * @param {object} mapBase
 * @returns {number} owner (0 = unowned, 1-7 = civ, 8 = generic claimed)
 */
function _getTileEffectiveOwner(gx, gy, mapBase) {
  const crOwner = mapBase.getCityRadiusOwner(gx, gy);
  if (crOwner > 0) return crOwner;
  // Fertility-based owner fallback
  const fertOwner = mapBase.getTileFertility
    ? mapBase.getTileFertility(gx, gy) : 0;
  if (fertOwner > 0 && fertOwner < 9) return 8;
  return fertOwner || 0;
}

/**
 * Check if the AI should consider a civ hostile (for enemy territory bonus).
 * Ported from FUN_00467af0 (should_declare_war):
 * - True if at war (hatred flag / treaty bit 0x20)
 * - True if only "contact" status and attitude > 49
 * - False if allied (treaty bit 8)
 *
 * In our JS model this simplifies to checking war status.
 *
 * @param {object} gameState
 * @param {number} civA - our civ
 * @param {number} civB - target civ
 * @returns {boolean}
 */
function _shouldConsiderHostile(gameState, civA, civB) {
  if (civA === civB) return false;
  return isAtWar(gameState, civA, civB);
}

/**
 * Check if a civ is a "human" player for the purposes of the binary's
 * ownership filter (DAT_00655b0b = human_civs_bitmask).
 *
 * In original Civ2 single-player, only 1 civ is human; AI settlers freely
 * ignore AI-owned territory but respect human-owned territory if at
 * ceasefire/peace. In our multiplayer model all non-barbarian civs may be
 * human, so we treat every civ OTHER than ourselves as potentially human.
 * Civ 0 (barbarians) is never human.
 *
 * @param {number} civId
 * @param {number} ourCiv
 * @returns {boolean}
 */
function _isHumanPlayer(civId, ourCiv) {
  if (civId <= 0) return false;  // barbarians are never "human"
  return civId !== ourCiv;       // any other civ is treated as human
}

/**
 * Evaluate how good a tile is for founding a city.
 * Higher score = better site.
 *
 * Faithfully ported from Civ2 decompiled FUN_005312e4 (ai_find_best_settle_dir).
 * The original function evaluates 9 candidate tiles around a settler (8
 * neighbors + center); this function scores a single candidate tile at
 * (gx, gy), equivalent to one iteration of the outer loop.
 *
 * ═══════════════════════════════════════════════════════════════
 * Part 1 — Binary-faithful core (FUN_005312e4 inner loop)
 * ═══════════════════════════════════════════════════════════════
 *
 * For each of the 8 neighbor tiles around the candidate:
 *
 *   (a) Tile must be in bounds             [FUN_004087c0 != 0]
 *   (b) Tile must be land (not ocean)      [FUN_005b89e4 == 0]
 *   (c) Tile must have no units            [FUN_005b8d62 < 0]
 *   (d) Ownership filter — tile passes if ANY of:
 *       • effective_owner > 7              [FUN_005b8c42 > 7] (unowned/generic)
 *       • owner is NOT a human player      [(1<<owner & DAT_00655b0b) == 0]
 *       • no ceasefire/peace with owner    [(treaty[owner][us] & 6) == 0]
 *   (e) +1 to score for each passing tile
 *
 *   (f) Enemy city bonus (+12) — applied when ALL of:
 *       • neighbor has a city              [FUN_005b8ca6 >= 0]
 *       • city owner != our civ
 *       • neighbor has no units            [FUN_005b8d62 < 0] (re-checked)
 *       • should_declare_war(us, owner)    [FUN_00467af0 != 0]
 *       In the binary this bonus only triggers for the center candidate
 *       (direction index == 8). Since we evaluate single tiles, we apply
 *       it unconditionally.
 *
 * ═══════════════════════════════════════════════════════════════
 * Part 2 — Augmented scoring (beyond binary)
 * ═══════════════════════════════════════════════════════════════
 *
 * The binary's FUN_005312e4 produces very coarse scores (0-8 + enemy
 * bonuses). We layer additional heuristics on top:
 *   - 21-tile BFC yield potential (food/shield/trade weighted)
 *   - Coastal bonus (+4 if adjacent ocean)
 *   - River/freshwater bonus (+5 if center has river)
 *   - Continent preference (+3 if same landmass as existing cities)
 *   - Distance penalty (reject sites too close to own/any cities)
 *
 * @param {number} gx - tile column
 * @param {number} gy - tile row
 * @param {object} gameState
 * @param {object} mapBase
 * @param {number} civSlot
 * @returns {number} site score (-1 = invalid site)
 */
function evaluateCitySite(gx, gy, gameState, mapBase, civSlot) {
  const terrain = mapBase.getTerrain(gx, gy);

  // Can't build on ocean (outer loop: FUN_005b89e4 land check)
  if (terrain === 10) return -1;

  // ── Distance penalty (augmentation, not in binary) ──
  // Minimum spacing enforcement — prevents AI city clumping
  for (const city of gameState.cities) {
    if (city.size <= 0) continue;
    const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);

    // Absolute minimum enforced by game rules
    if (dist < MIN_CITY_SPACING_ABSOLUTE) return -1;

    // AI prefers wider spacing for own cities
    if (dist < MIN_CITY_SPACING && city.owner === civSlot) return -1;
  }

  // ═════════════════════════════════════════════════════════════
  // Part 1: Binary-faithful 8-neighbor scan (FUN_005312e4 inner loop)
  // ═════════════════════════════════════════════════════════════
  let score = 0;
  const neighbors = mapBase.getNeighbors(gx, gy);

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);

    // (b) Neighbor must be land — FUN_005b89e4(x,y) == 0
    const nTerrain = mapBase.getTerrain(wnx, ny);
    if (nTerrain === 10) continue;

    // (c) Neighbor must have no units — FUN_005b8d62(x,y) < 0
    const unitOwner = _getUnitOwnerAt(wnx, ny, gameState);
    if (unitOwner >= 0) continue;

    // (d) Ownership filter — ported from:
    //   iVar8 = FUN_005b8c42(x,y);   // get_tile_effective_owner
    //   pass if: iVar8 > 7
    //     OR (1 << iVar8 & human_civs_bitmask) == 0
    //     OR (treaty[iVar8*4 + ourCiv*0x594] & 6) == 0
    const effOwner = _getTileEffectiveOwner(wnx, ny, mapBase);

    if (effOwner > 0 && effOwner <= 7 && effOwner !== civSlot) {
      // Tile is owned by a specific civ (1-7) that isn't us.
      // Binary condition: skip ONLY if owner is human AND we have
      // ceasefire (bit 2) or peace (bit 4) with them.
      // In multiplayer we treat all other civs as potentially human.
      if (_isHumanPlayer(effOwner, civSlot)) {
        const treaty = getTreaty(gameState, civSlot, effOwner);
        // treaty & 6: ceasefire=2, peace=4. Skip if either is set.
        if (treaty === 'ceasefire' || treaty === 'peace') continue;
      }
    }

    // (e) +1 per valid usable neighbor
    score += 1;

    // (f) Enemy city bonus (+12) — FUN_005b8ca6 then FUN_00467af0
    // Binary re-checks FUN_005b8d62 < 0 here (already passed above).
    // Binary also gates this on direction == 8 (center candidate only);
    // since we evaluate arbitrary tiles, we always apply it.
    const cityOwner = _getCityOwnerAt(wnx, ny, gameState);
    if (cityOwner >= 0 && cityOwner !== civSlot) {
      if (_shouldConsiderHostile(gameState, civSlot, cityOwner)) {
        score += ENEMY_TERRITORY_BONUS;
      }
    }
  }

  // ═════════════════════════════════════════════════════════════
  // Part 2: Augmented scoring (beyond binary's coarse neighbor count)
  // ═════════════════════════════════════════════════════════════

  // ── 21-tile BFC yield potential ──
  // Scan the full city radius to evaluate terrain quality.
  // Weight: food (×3) > shields (×2) > trade (×1).
  let yieldScore = 0;
  let hasCoast = false;
  const parC = gy & 1;

  for (let ri = 0; ri < 21; ri++) {
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
    const parT = ((gy + ddy) % 2 + 2) % 2;
    const tgx = gx + ((parC + ddx - parT) >> 1);
    const tgy = gy + ddy;
    const wgx = mapBase.wraps
      ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;

    const t = mapBase.getTerrain(wgx, tgy);
    if (t === 10) { hasCoast = true; continue; }

    const [f, s, tr] = potentialTileYield(wgx, tgy, mapBase);
    yieldScore += f * 3 + s * 2 + tr;
  }

  // Scale yield so it's secondary to the binary's neighbor-count score.
  // Max binary score: 8 neighbors + up to 96 (8×12 enemy bonus) = 104.
  // Max yield for 20 land tiles ~200+. Divide by 10 → tiebreaker range ~20.
  score += Math.floor(yieldScore / 10);

  // ── Coastal bonus ──
  // Adjacent ocean tile → harbors, naval access
  if (hasCoast) score += 4;

  // ── River / freshwater bonus ──
  // Center tile on river → unlimited irrigation potential
  if (mapBase.hasRiver(gx, gy)) score += 5;

  // ── Continent preference ──
  // Ported from the caller's bodyId-based continent logic
  // (FUN_005b8a81 / get_tile_continent). Prefer tiles on the same
  // landmass as existing own cities.
  const candidateBody = mapBase.getBodyId(gx, gy);
  let hasCityOnContinent = false;
  for (const city of gameState.cities) {
    if (city.owner !== civSlot || city.size <= 0) continue;
    const cityBody = mapBase.getBodyId(city.gx, city.gy);
    if (cityBody === candidateBody) {
      hasCityOnContinent = true;
      break;
    }
  }
  if (hasCityOnContinent) score += 3;

  return score;
}

// ── Settler movement ──────────────────────────────────────────────

/**
 * Search within radius for the best unoccupied city site.
 * Uses BFS to find candidate tiles, scores each one.
 *
 * Returns { gx, gy, score } or null.
 */
function findBestCitySite(unitGx, unitGy, gameState, mapBase, civSlot, maxRadius = SITE_SEARCH_RADIUS) {
  const visited = new Set();
  const key = (gx, gy) => `${gx},${gy}`;
  const queue = [{ gx: unitGx, gy: unitGy, dist: 0 }];
  visited.add(key(unitGx, unitGy));

  let bestSite = null;
  let bestScore = -Infinity;

  // Evaluate the current tile first
  const currentScore = evaluateCitySite(unitGx, unitGy, gameState, mapBase, civSlot);
  if (currentScore > bestScore) {
    bestScore = currentScore;
    bestSite = { gx: unitGx, gy: unitGy, score: currentScore };
  }

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.dist > maxRadius) break;

    const neighbors = mapBase.getNeighbors(cur.gx, cur.gy);
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const k = key(wnx, ny);
      if (visited.has(k)) continue;
      visited.add(k);

      const terrain = mapBase.getTerrain(wnx, ny);
      if (terrain === 10) continue; // skip ocean

      // Evaluate this tile as a city site
      const siteScore = evaluateCitySite(wnx, ny, gameState, mapBase, civSlot);
      if (siteScore > bestScore) {
        bestScore = siteScore;
        bestSite = { gx: wnx, gy: ny, score: siteScore };
      }

      queue.push({ gx: wnx, gy: ny, dist: cur.dist + 1 });
    }
  }

  return bestSite;
}

/**
 * Find direction to move settler toward a target tile.
 * Avoids ocean and tiles adjacent to enemy combat units.
 */
function settlerDirectionToward(unit, toGx, toGy, gameState, mapBase, civSlot) {
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
  let bestDir = null;
  let bestDist = Infinity;
  let bestFood = -1;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);

    const terrain = mapBase.getTerrain(wnx, ny);
    if (terrain === 10) continue;

    // Avoid danger — settlers are valuable
    if (isAdjacentToEnemy(wnx, ny, mapBase, gameState, civSlot)) continue;

    const dist = tileDist(wnx, ny, toGx, toGy, mapBase);
    // Tiebreaker: when two tiles are equidistant, prefer better terrain (higher food)
    // This prevents oscillation when the greedy path is blocked
    const [food] = tileYield(wnx, ny, mapBase);
    if (dist < bestDist || (dist === bestDist && food > bestFood)) {
      bestDist = dist;
      bestDir = dir;
      bestFood = food;
    }
  }

  return bestDir;
}

// ── Water source detection ────────────────────────────────────────

/**
 * Check if a tile has adjacent water source for irrigation.
 * Water sources: ocean, river, or existing irrigation on adjacent tile.
 */
function checkWaterSource(gx, gy, mapBase) {
  if (mapBase.hasRiver(gx, gy)) return true;

  const neighbors = mapBase.getNeighbors(gx, gy);
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);

    const terrain = mapBase.getTerrain(wnx, ny);
    if (terrain === 10) return true;

    if (mapBase.hasRiver(wnx, ny)) return true;

    const imp = mapBase.getImprovements(wnx, ny);
    if (imp.irrigation) return true;
  }

  return false;
}

// ── Worker improvement AI ─────────────────────────────────────────

/**
 * Determine what worker order to give at the current tile.
 * Follows Civ2 priority order:
 *   1. Clean pollution (always highest)
 *   2. Build road on unroaded tiles
 *   3. Irrigate irrigable tiles adjacent to water
 *   4. Mine hills/mountains
 *   5. Build railroad on roaded tiles
 *
 * Returns an action or null if nothing to do here.
 */
function getWorkerOrder(unit, unitIndex, gameState, mapBase, civSlot) {
  const terrain = mapBase.getTerrain(unit.gx, unit.gy);
  if (terrain === 10) return null;

  const imp = mapBase.getImprovements(unit.gx, unit.gy);

  // Priority 1: Clean pollution
  if (imp.pollution) {
    const action = { type: 'WORKER_ORDER', unitIndex, order: 'pollution' };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) return action;
  }

  // Priority 2: Irrigate if possible and beneficial
  // Ported priority from FUN_00498e8b: binary's AI irrigates before roads
  // because food production is critical for city growth and settler support.
  if (!imp.irrigation && CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0) {
    if (checkWaterSource(unit.gx, unit.gy, mapBase)) {
      const action = { type: 'WORKER_ORDER', unitIndex, order: 'irrigation' };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) return action;
    }
  }

  // Priority 3: Build road
  if (!imp.road) {
    const action = { type: 'WORKER_ORDER', unitIndex, order: 'road' };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) return action;
  }

  // Priority 4: Mine hills/mountains
  if (!imp.mining && CAN_MINE[terrain] && MINING_TURNS[terrain] > 0) {
    const action = { type: 'WORKER_ORDER', unitIndex, order: 'mine' };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) return action;
  }

  // Priority 5: Build railroad on roaded tiles
  if (imp.road && !imp.railroad) {
    const action = { type: 'WORKER_ORDER', unitIndex, order: 'railroad' };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) return action;
  }

  return null;
}

/**
 * Score how much a tile needs improvement (for worker movement targeting).
 * Higher = more needed.
 * @param {number} gx
 * @param {number} gy
 * @param {object} mapBase
 * @param {object} [gameState] - optional, for city connectivity bonus
 * @param {number} [civSlot] - optional, for city connectivity bonus
 */
function tileImprovementNeed(gx, gy, mapBase, gameState, civSlot) {
  const terrain = mapBase.getTerrain(gx, gy);
  if (terrain === 10) return 0;

  const imp = mapBase.getImprovements(gx, gy);
  let score = 0;

  // Pollution is always top priority (#21: weight higher for large/productive cities)
  if (imp.pollution) {
    score += 10;
    // Check if this polluted tile is in the radius of an owned city
    if (gameState && civSlot != null) {
      for (const city of gameState.cities) {
        if (!city || city.owner !== civSlot || city.size <= 0) continue;
        const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);
        if (dist <= 4) { // within city radius
          // Larger/more productive cities make pollution cleanup more urgent
          if (city.size >= 8) score += 4;
          else if (city.size >= 5) score += 2;
          break;
        }
      }
    }
  }

  // Unroaded tiles
  if (!imp.road) {
    score += 3;
    // Road network priority: boost if tile connects two cities (#8)
    if (gameState && civSlot != null) {
      let nearCityCount = 0;
      for (const city of gameState.cities) {
        if (!city || city.owner !== civSlot || city.size <= 0) continue;
        const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);
        if (dist <= 6) nearCityCount++;
        if (nearCityCount >= 2) break;
      }
      // Tile is between two cities — double road priority
      if (nearCityCount >= 2) score += 4;
    }
    // Also check if adjacent tiles have roads leading toward cities
    const neighbors = mapBase.getNeighbors(gx, gy);
    let adjacentRoads = 0;
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const nImp = mapBase.getImprovements(wnx, ny);
      if (nImp.road) adjacentRoads++;
    }
    // If adjacent roads exist, this tile is a gap in the network
    if (adjacentRoads >= 2) score += 2;
  }

  // Unirrigated irrigable tiles — prefer tiles adjacent to existing water (#18)
  if (!imp.irrigation && CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0) {
    if (checkWaterSource(gx, gy, mapBase)) {
      score += 4;
      // Extra bonus if directly adjacent to river or ocean (natural water, not just irrigation chain)
      if (mapBase.hasRiver(gx, gy)) score += 2;
      else {
        const nbrs = mapBase.getNeighbors(gx, gy);
        for (const d in nbrs) {
          const [nx2, ny2] = nbrs[d];
          if (!inBounds(nx2, ny2, mapBase)) continue;
          const wnx2 = wrapX(nx2, mapBase);
          if (mapBase.getTerrain(wnx2, ny2) === 10 || mapBase.hasRiver(wnx2, ny2)) {
            score += 1; // adjacent to natural water source
            break;
          }
        }
      }
    } else {
      // No water source yet — small bonus to encourage building irrigation chains
      // toward this tile (worker will need to irrigate intermediary tiles first)
      score += 1;
    }
  }

  // Unmineable hills/mountains
  if (!imp.mining && CAN_MINE[terrain] && MINING_TURNS[terrain] > 0) score += 3;

  // Railroad needed
  if (imp.road && !imp.railroad) score += 1;

  return score;
}

/**
 * Find the best direction for a worker to move toward unimproved tiles
 * near a city.
 *
 * Logic:
 * 1. If too far from any own city, move toward nearest city
 * 2. If near a city, find the adjacent tile that most needs improvement
 * 3. If nothing nearby needs work, move toward another city that needs it
 */
function findWorkerMoveTarget(unit, gameState, mapBase, civSlot) {
  const ownCities = gameState.cities.filter(c => c.owner === civSlot && c.size > 0);
  if (ownCities.length === 0) return null;

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
  if (nearestDist > WORKER_MAX_WANDER) {
    return moveTowardCity(unit, nearestCity, mapBase, gameState, civSlot);
  }

  // Near a city: find adjacent tile that needs the most improvement
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
  let bestDir = null;
  let bestScore = 0;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const terrain = mapBase.getTerrain(wnx, ny);
    if (terrain === 10) continue;

    const score = tileImprovementNeed(wnx, ny, mapBase, gameState, civSlot);
    if (score > bestScore) {
      bestScore = score;
      bestDir = dir;
    }
  }

  if (bestDir) return bestDir;

  // Nothing nearby needs work — check if another city needs us
  let bestCity = null;
  let bestCityScore = 0;

  for (const city of ownCities) {
    if (city === nearestCity) continue;
    const dist = tileDist(unit.gx, unit.gy, city.gx, city.gy, mapBase);
    if (dist > 20) continue; // too far

    // Score the city's unimproved tiles
    let cityNeed = 0;
    const parC = city.gy & 1;
    for (let ri = 0; ri < 20; ri++) {
      const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
      const parT = ((city.gy + ddy) % 2 + 2) % 2;
      const tgx = city.gx + ((parC + ddx - parT) >> 1);
      const tgy = city.gy + ddy;
      const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
      if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
      cityNeed += tileImprovementNeed(wgx, tgy, mapBase, gameState, civSlot);
    }

    // Prefer closer cities with more improvement need
    const score = cityNeed / (dist + 1);
    if (score > bestCityScore) {
      bestCityScore = score;
      bestCity = city;
    }
  }

  if (bestCity) {
    return moveTowardCity(unit, bestCity, mapBase, gameState, civSlot);
  }

  return null;
}

/**
 * Get direction to move toward a city, avoiding ocean and danger.
 */
function moveTowardCity(unit, city, mapBase, gameState, civSlot) {
  const neighbors = mapBase.getNeighbors(unit.gx, unit.gy);
  let bestDir = null;
  let bestDist = Infinity;

  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const terrain = mapBase.getTerrain(wnx, ny);
    if (terrain === 10) continue;

    const dist = tileDist(wnx, ny, city.gx, city.gy, mapBase);
    if (dist < bestDist) {
      bestDist = dist;
      bestDir = dir;
    }
  }

  return bestDir;
}

// ═══════════════════════════════════════════════════════════════════
// Main export
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate actions for settler and worker units.
 *
 * Settler logic (type 0):
 *   - Search within radius for best city site (Civ2 site scoring)
 *   - If current tile is good enough, build city
 *   - Otherwise move toward best site, avoiding danger
 *
 * Worker logic (type 0 without needing to build, or type 1):
 *   - Follow Civ2 improvement priority: pollution > road > irrigation > mine > railroad
 *   - Move toward tiles near cities that need improvement
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @param {object} [strategy] - strategic assessment (used for expansion desire)
 * @returns {Array<object>} actions
 */
export function generateSettlerActions(gameState, mapBase, civSlot, strategy, debugLog = null) {
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
      // Decide if we should be building a city
      // Only settlers that are genuinely needed for expansion should city-hunt.
      // Others should do tile improvements. In Civ2, settlers alternate between
      // city founding and improvement based on strategic need.
      const shouldBuildCity = ownCities.length === 0 ||
        (ownCities.length < 8 && (strategy?.expansionDesired ?? true));

      if (shouldBuildCity) {
        const isFirstCity = ownCities.length === 0;
        const threshold = isFirstCity ? BUILD_THRESHOLD_FIRST : BUILD_THRESHOLD_NORMAL;

        // ── First city: found immediately or within 2 turns ──
        // In Civ2, the first settler founds within 1-3 turns. Use a tiny
        // search radius (3) so we don't wander toward a distant "optimal"
        // site. If the current tile is even halfway decent, just build here.
        if (isFirstCity) {
          const currentScore = evaluateCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot);
          const currentTerrain = mapBase.getTerrain(unit.gx, unit.gy);

          // Build here immediately unless the tile is truly terrible
          // (ocean, glacier, or very low score)
          const isTerrible = currentTerrain === 10 || currentTerrain === 7 || currentScore < 5;

          if (!isTerrible && currentScore >= 0) {
            // Current tile is acceptable — build immediately
            const cityName = getNextCityName(gameState, civSlot);
            const buildAction = { type: 'BUILD_CITY', unitIndex: i, name: cityName };
            const err = validateAction(gameState, mapBase, buildAction, civSlot);
            if (!err) {
              actions.push(buildAction);
              if (debugLog) debugLog.push(`CITY: Settler #${i}: founding FIRST city "${cityName}" at (${unit.gx},${unit.gy}), score=${currentScore} (immediate)`);
              continue;
            }
          }

          // Tile is terrible — search nearby (radius 3 only) for something better
          const bestSite = findBestCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot, 3);
          if (bestSite && bestSite.score >= 0) {
            if (bestSite.gx === unit.gx && bestSite.gy === unit.gy) {
              const cityName = getNextCityName(gameState, civSlot);
              const buildAction = { type: 'BUILD_CITY', unitIndex: i, name: cityName };
              const err = validateAction(gameState, mapBase, buildAction, civSlot);
              if (!err) {
                actions.push(buildAction);
                if (debugLog) debugLog.push(`CITY: Settler #${i}: founding FIRST city "${cityName}" at (${unit.gx},${unit.gy}), score=${bestSite.score} (best nearby)`);
                continue;
              }
            }
            const dir = settlerDirectionToward(unit, bestSite.gx, bestSite.gy, gameState, mapBase, civSlot);
            if (dir) {
              const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir };
              const err = validateAction(gameState, mapBase, moveAction, civSlot);
              if (!err) {
                actions.push(moveAction);
                if (debugLog) debugLog.push(`CITY: Settler #${i}: moving toward first city site (${bestSite.gx},${bestSite.gy}), score=${bestSite.score}`);
                continue;
              }
            }
          }

          // Fallback: just build wherever we are if validation passes
          {
            const cityName = getNextCityName(gameState, civSlot);
            const buildAction = { type: 'BUILD_CITY', unitIndex: i, name: cityName };
            const err = validateAction(gameState, mapBase, buildAction, civSlot);
            if (!err) {
              actions.push(buildAction);
              if (debugLog) debugLog.push(`CITY: Settler #${i}: founding FIRST city "${cityName}" at (${unit.gx},${unit.gy}) (fallback)`);
              continue;
            }
          }
        }

        // ── Subsequent settlers: search radius 10 but reduce wandering ──
        // Accept a "good enough" site (70% of threshold) on the current
        // tile rather than keep searching. This prevents settlers from
        // oscillating between distant candidates for 9+ turns.
        if (!isFirstCity) {
          const currentScore = evaluateCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot);

          // If current tile is "good enough" (>= 70% of threshold), just build here
          if (currentScore >= threshold * 0.7) {
            const cityName = getNextCityName(gameState, civSlot);
            const buildAction = { type: 'BUILD_CITY', unitIndex: i, name: cityName };
            const err = validateAction(gameState, mapBase, buildAction, civSlot);
            if (!err) {
              actions.push(buildAction);
              if (debugLog) debugLog.push(`CITY: Settler #${i}: founding city "${cityName}" at (${unit.gx},${unit.gy}), score=${currentScore} (good-enough, threshold*0.7=${Math.round(threshold * 0.7)})`);
              continue;
            }
          }

          // Search full radius for optimal site
          const bestSite = findBestCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot);
          if (bestSite && bestSite.score >= threshold) {
            if (bestSite.gx === unit.gx && bestSite.gy === unit.gy) {
              const cityName = getNextCityName(gameState, civSlot);
              const buildAction = { type: 'BUILD_CITY', unitIndex: i, name: cityName };
              const err = validateAction(gameState, mapBase, buildAction, civSlot);
              if (!err) {
                actions.push(buildAction);
                if (debugLog) debugLog.push(`CITY: Settler #${i}: founding city "${cityName}" at (${unit.gx},${unit.gy}), site score=${bestSite.score}`);
                continue;
              }
            }

            const dir = settlerDirectionToward(unit, bestSite.gx, bestSite.gy, gameState, mapBase, civSlot);
            if (dir) {
              const moveAction = { type: 'MOVE_UNIT', unitIndex: i, dir };
              const err = validateAction(gameState, mapBase, moveAction, civSlot);
              if (!err) {
                actions.push(moveAction);
                continue;
              }
            }
          }

          // Full-threshold check on current tile
          if (currentScore >= threshold) {
            const cityName = getNextCityName(gameState, civSlot);
            const buildAction = { type: 'BUILD_CITY', unitIndex: i, name: cityName };
            const err = validateAction(gameState, mapBase, buildAction, civSlot);
            if (!err) {
              actions.push(buildAction);
              if (debugLog) debugLog.push(`CITY: Settler #${i}: founding city "${cityName}" at (${unit.gx},${unit.gy}), site score=${currentScore}`);
              continue;
            }
          }
        }

        // No good city site found — fall through to worker logic
        // (improve tiles near existing cities rather than wander aimlessly)
      }

      // If settler doesn't need to build a city, fall through to worker logic
    }

    // ── Worker logic: improve tiles near cities ──
    if (ownCities.length === 0) continue;

    // Try worker order on current tile
    const workerOrder = getWorkerOrder(unit, i, gameState, mapBase, civSlot);
    if (workerOrder) {
      actions.push(workerOrder);
      if (debugLog) debugLog.push(`CITY: Worker #${i} at (${unit.gx},${unit.gy}): building ${workerOrder.order}`);
      continue;
    }

    // Nothing to do here — move toward a tile that needs work
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
