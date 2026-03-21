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
  UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_ROLE,
  DIFFICULTY_KEYS, TERRAIN_DEFENSE,
} from '../defs.js';
import { GOAL_ESCORT } from './goals.js';

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

// ── M.3: Settler Decision Tree constants ─────────────────────────
/**
 * Maximum settlers per city, indexed by difficulty (0=Chieftain..5=Deity).
 * Higher difficulty → fewer settlers → more focused expansion.
 * From Civ2 AI settler production logic (FUN_00498e8b).
 */
const MAX_SETTLERS_PER_CITY = [4, 3, 3, 2, 2, 2];

/** Engineer (type 1) counts as 1.5 settlers for expand/terraform decisions. */
const ENGINEER_SETTLER_WEIGHT = 1.5;

// ── M.4: Terraform constants ─────────────────────────────────────
/** Tech IDs needed for terraform decisions. */
const TECH_ENGINEERING = 25;
const TECH_CONSTRUCTION = 18;

/**
 * Irrigation priority by terrain type. Higher = irrigate sooner.
 * Desert and Plains get highest priority because irrigation transforms
 * them from marginal to productive (desert: 0→1 food, plains: 1→2 food).
 * Terrain types that cannot be irrigated get 0.
 */
const IRRIGATION_PRIORITY = [
  8,  // 0 Desert: 0 base food → +1 irrigation, critical for desert cities
  7,  // 1 Plains: 1 base food → +1 irrigation, good food boost
  5,  // 2 Grassland: 2 base food already, but +1 is still valuable
  0,  // 3 Forest: cannot irrigate (transforms to plains)
  4,  // 4 Hills: 1 base food → +1, decent
  0,  // 5 Mountains: cannot irrigate
  3,  // 6 Tundra: 1 base food → +1, marginal terrain
  0,  // 7 Glacier: cannot irrigate
  0,  // 8 Swamp: cannot irrigate (transforms)
  0,  // 9 Jungle: cannot irrigate (transforms)
  0,  // 10 Ocean: N/A
];

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

// ── M.3: Difficulty and tech helpers ─────────────────────────────

/** Get numeric difficulty index (0=Chieftain..5=Deity) for a civ. */
function getDifficultyIndex(gameState, civ) {
  const d = gameState.civs?.[civ]?.difficulty;
  if (typeof d === 'number') return d;
  const idx = DIFFICULTY_KEYS.indexOf(d);
  return idx >= 0 ? idx : 2; // default prince
}

/** Check if a civ has a specific tech. */
function hasTech(gameState, civ, techId) {
  if (techId < 0) return true;
  if (civ < 1) return false;
  return gameState.civTechs?.[civ]?.has(techId) ?? false;
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

  // ═════════════════════════════════════════════════════════════
  // Part 3: Settler priority formula
  //
  // Exact priority scoring for settler city founding decisions:
  //   - Distance to nearest own city: closer = higher (inverse distance)
  //   - Terrain quality: count good terrain in 2-tile radius
  //   - Fresh water (river): +5 priority (already applied above)
  //   - Coastal: +3 priority (already applied above)
  //   - Far from enemies: +2 priority
  // ═════════════════════════════════════════════════════════════

  // Distance to nearest own city: inverse distance bonus
  // Closer sites are more valuable (easier to defend, faster to connect)
  let nearestOwnCityDist = Infinity;
  for (const city of gameState.cities) {
    if (city.owner !== civSlot || city.size <= 0) continue;
    const d = tileDist(gx, gy, city.gx, city.gy, mapBase);
    if (d < nearestOwnCityDist) nearestOwnCityDist = d;
  }
  if (nearestOwnCityDist < Infinity && nearestOwnCityDist > 0) {
    // Inverse distance: closer = higher priority (max +8 at dist 1)
    score += Math.max(0, Math.floor(8 / nearestOwnCityDist));
  }

  // Terrain quality: count good terrain tiles (food >= 2) in 2-tile radius
  let goodTerrainCount = 0;
  for (let ri = 0; ri < 21; ri++) {
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
    const parT2 = ((gy + ddy) % 2 + 2) % 2;
    const tgx2 = gx + ((parC + ddx - parT2) >> 1);
    const tgy2 = gy + ddy;
    const wgx2 = mapBase.wraps
      ? ((tgx2 % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx2;
    if (tgy2 < 0 || tgy2 >= mapBase.mh || wgx2 < 0 || wgx2 >= mapBase.mw) continue;
    const t2 = mapBase.getTerrain(wgx2, tgy2);
    if (t2 === 10) continue;
    const baseFood = TERRAIN_BASE[t2]?.[0] ?? 0;
    if (baseFood >= 2) goodTerrainCount++;
  }
  // Scale: +1 per 3 good terrain tiles (max +7 for 21 tiles)
  score += Math.floor(goodTerrainCount / 3);

  // Far from enemies: +2 priority if no enemy units within 5 tiles
  let enemyNearby = false;
  for (const u of (gameState.units || [])) {
    if (u.gx < 0 || u.owner === civSlot || u.owner === 0) continue;
    if ((UNIT_ATK[u.type] || 0) === 0) continue;
    const d = tileDist(gx, gy, u.gx, u.gy, mapBase);
    if (d <= 10) { // 5 real tiles = doubled-coord 10
      enemyNearby = true;
      break;
    }
  }
  if (!enemyNearby) score += 2;

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
 * M.4: Terrain-aware worker order decision.
 *
 * Determines what improvement to build at the current tile using
 * terrain-aware priorities (ported from Civ2 FUN_00498e8b logic):
 *
 *   1. Clean pollution (always highest — stops production penalties)
 *   2. Irrigate: priority by terrain food yield (desert/plains first)
 *      — only if CAN_IRRIGATE and adjacent to water source
 *   3. Road: priority by trade potential and city connectivity
 *      — always build roads for movement and trade
 *   4. Mine: only on hills (terrain 4) and mountains (terrain 5)
 *      — AND only if the tile already has a road (Civ2 AI pattern:
 *        roads before mines to connect the tile to the trade network)
 *   5. Fortress: at narrow passages (chokepoint detection)
 *      — requires Construction tech (ID 18)
 *   6. Railroad: only on already-roaded tiles
 *      — requires Engineering tech (ID 25)
 *
 * Returns an action or null if nothing to do here.
 */
function getWorkerOrder(unit, unitIndex, gameState, mapBase, civSlot) {
  const terrain = mapBase.getTerrain(unit.gx, unit.gy);
  if (terrain === 10) return null;

  const imp = mapBase.getImprovements(unit.gx, unit.gy);

  // ── Priority 1: Clean pollution (always top) ──
  if (imp.pollution) {
    const action = { type: 'WORKER_ORDER', unitIndex, order: 'pollution' };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) return action;
  }

  // ── Priority 2: Irrigate — terrain-aware priority ──
  // Desert/Plains get highest irrigation priority (food-critical).
  // Only irrigate if terrain supports it and water source is adjacent.
  if (!imp.irrigation && CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0) {
    const irrPri = IRRIGATION_PRIORITY[terrain] || 0;
    if (irrPri > 0 && checkWaterSource(unit.gx, unit.gy, mapBase)) {
      // High-priority terrains (desert=8, plains=7): irrigate before road.
      // Lower-priority terrains (grassland=5, tundra=3): road first.
      if (irrPri >= 6 || imp.road) {
        const action = { type: 'WORKER_ORDER', unitIndex, order: 'irrigation' };
        const err = validateAction(gameState, mapBase, action, civSlot);
        if (!err) return action;
      }
    }
  }

  // ── Priority 3: Build road ──
  // Roads always valuable for movement + trade. Build before mines.
  if (!imp.road) {
    const action = { type: 'WORKER_ORDER', unitIndex, order: 'road' };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) return action;
  }

  // ── Priority 2b: Irrigate lower-priority terrains (now that road is done) ──
  // Grassland (5), Hills (4), Tundra (3) — irrigate after road is built.
  if (!imp.irrigation && CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0) {
    const irrPri = IRRIGATION_PRIORITY[terrain] || 0;
    if (irrPri > 0 && irrPri < 6 && checkWaterSource(unit.gx, unit.gy, mapBase)) {
      const action = { type: 'WORKER_ORDER', unitIndex, order: 'irrigation' };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) return action;
    }
  }

  // ── Priority 4: Mine hills/mountains (only with existing road) ──
  // Civ2 AI pattern: only mine terrain types 4 (Hills) and 5 (Mountains).
  // Require existing road so the production boost is connected to the network.
  // Hills get +3 shields from mining, Mountains get +1 — very valuable.
  if (!imp.mining && imp.road && CAN_MINE[terrain] && MINING_TURNS[terrain] > 0) {
    // Only mine hills and mountains (Civ2 AI ignores desert mining in most cases)
    if (terrain === 4 || terrain === 5) {
      const action = { type: 'WORKER_ORDER', unitIndex, order: 'mine' };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) return action;
    }
  }

  // ── Priority 5: Fortress at narrow passages (chokepoints) ──
  // Requires Construction tech. Build fortress only at tiles that form
  // natural chokepoints: land tiles with ≤2 passable land neighbors and
  // high defensive terrain value (hills, mountains, forest).
  if (!imp.fortress && hasTech(gameState, civSlot, TECH_CONSTRUCTION)) {
    if (_isChokepoint(unit.gx, unit.gy, mapBase) && TERRAIN_DEFENSE[terrain] >= 3) {
      const action = { type: 'WORKER_ORDER', unitIndex, order: 'fortress' };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) return action;
    }
  }

  // ── Priority 6: Railroad on roaded tiles (requires Engineering) ──
  if (imp.road && !imp.railroad && hasTech(gameState, civSlot, TECH_ENGINEERING)) {
    const action = { type: 'WORKER_ORDER', unitIndex, order: 'railroad' };
    const err = validateAction(gameState, mapBase, action, civSlot);
    if (!err) return action;
  }

  // ── Fallback: mine desert if road exists (low priority) ──
  // Desert mining gives +1 shield — not great but better than nothing.
  if (!imp.mining && imp.road && CAN_MINE[terrain] && MINING_TURNS[terrain] > 0) {
    if (terrain === 0 || terrain === 7) { // Desert or Glacier
      const action = { type: 'WORKER_ORDER', unitIndex, order: 'mine' };
      const err = validateAction(gameState, mapBase, action, civSlot);
      if (!err) return action;
    }
  }

  return null;
}

/**
 * M.4: Detect whether a tile is a chokepoint (narrow passage).
 * A chokepoint is a land tile with ≤2 passable land neighbors,
 * forming a natural bottleneck between two areas.
 *
 * @param {number} gx
 * @param {number} gy
 * @param {object} mapBase
 * @returns {boolean}
 */
function _isChokepoint(gx, gy, mapBase) {
  const neighbors = mapBase.getNeighbors(gx, gy);
  let landCount = 0;
  for (const dir in neighbors) {
    const [nx, ny] = neighbors[dir];
    if (!inBounds(nx, ny, mapBase)) continue;
    const wnx = wrapX(nx, mapBase);
    const t = mapBase.getTerrain(wnx, ny);
    if (t !== 10) landCount++; // not ocean = land
  }
  // A tile with ≤2 land neighbors is a narrow passage
  return landCount <= 2;
}

/**
 * Score the value of a specific terrain improvement on a tile.
 * Used by settlers to decide which tile improvements to make.
 *
 * Scoring:
 *   - Irrigatable grassland/plains: +3 value
 *   - Minable hills: +2 value
 *   - Road-connectable tiles between cities: +4 value
 *   - Already improved tiles: 0 value
 *
 * @param {number} gx - tile X
 * @param {number} gy - tile Y
 * @param {object} mapBase - map data
 * @param {object} [gameState] - for city connectivity check
 * @param {number} [civSlot] - civ slot for city ownership check
 * @returns {number} improvement value score
 */
function scoreTerrainImprovement(gx, gy, mapBase, gameState, civSlot) {
  const terrain = mapBase.getTerrain(gx, gy);
  if (terrain === 10) return 0; // ocean

  const imp = mapBase.getImprovements(gx, gy);
  let value = 0;

  // Irrigatable grassland (terrain 2) / plains (terrain 1): +3
  if (!imp.irrigation && CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0) {
    if (terrain === 1 || terrain === 2) { // plains or grassland
      if (checkWaterSource(gx, gy, mapBase)) {
        value += 3;
      }
    }
  }

  // Minable hills (terrain 4): +2
  if (!imp.mining && CAN_MINE[terrain] && MINING_TURNS[terrain] > 0) {
    if (terrain === 4) { // hills
      value += 2;
    }
  }

  // Road-connectable tiles between cities: +4
  if (!imp.road) {
    if (gameState && civSlot != null) {
      let nearCityCount = 0;
      for (const city of gameState.cities) {
        if (!city || city.owner !== civSlot || city.size <= 0) continue;
        const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);
        if (dist <= 6) nearCityCount++;
        if (nearCityCount >= 2) break;
      }
      if (nearCityCount >= 2) {
        value += 4; // between two cities — road connectivity is valuable
      }
    }
  }

  // Already improved tiles: 0 value (nothing to do)
  if (imp.road && imp.irrigation && imp.mining) {
    return 0;
  }

  return value;
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

  // ── Pollution: always top priority ──
  if (imp.pollution) {
    score += 10;
    if (gameState && civSlot != null) {
      for (const city of gameState.cities) {
        if (!city || city.owner !== civSlot || city.size <= 0) continue;
        const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);
        if (dist <= 4) {
          if (city.size >= 8) score += 4;
          else if (city.size >= 5) score += 2;
          break;
        }
      }
    }
  }

  // ── Irrigation: terrain-aware priority (M.4) ──
  // Desert/Plains get highest score because food boost is critical.
  if (!imp.irrigation && CAN_IRRIGATE[terrain] && IRRIGATION_TURNS[terrain] > 0) {
    const irrPri = IRRIGATION_PRIORITY[terrain] || 0;
    if (irrPri > 0 && checkWaterSource(gx, gy, mapBase)) {
      // Scale by irrigation priority (desert=8, plains=7, grassland=5, etc.)
      score += Math.max(2, irrPri);
      // Extra bonus for river/ocean adjacency (natural water source)
      if (mapBase.hasRiver(gx, gy)) score += 2;
      else {
        const nbrs = mapBase.getNeighbors(gx, gy);
        for (const d in nbrs) {
          const [nx2, ny2] = nbrs[d];
          if (!inBounds(nx2, ny2, mapBase)) continue;
          const wnx2 = wrapX(nx2, mapBase);
          if (mapBase.getTerrain(wnx2, ny2) === 10 || mapBase.hasRiver(wnx2, ny2)) {
            score += 1;
            break;
          }
        }
      }
    } else if (irrPri >= 6) {
      // High-priority terrain without water source — encourage chain building
      score += 2;
    } else {
      score += 1;
    }
  }

  // ── Road: priority by trade potential and city connectivity ──
  if (!imp.road) {
    // Base road score
    const baseTradeYield = TERRAIN_BASE[terrain]?.[2] ?? 0;
    score += 3 + baseTradeYield; // higher base trade = more road value

    // City connectivity: boost if tile is between two own cities
    if (gameState && civSlot != null) {
      let nearCityCount = 0;
      for (const city of gameState.cities) {
        if (!city || city.owner !== civSlot || city.size <= 0) continue;
        const dist = tileDist(gx, gy, city.gx, city.gy, mapBase);
        if (dist <= 6) nearCityCount++;
        if (nearCityCount >= 2) break;
      }
      if (nearCityCount >= 2) score += 4;
    }
    // Gap in road network (adjacent roads on both sides)
    const neighbors = mapBase.getNeighbors(gx, gy);
    let adjacentRoads = 0;
    for (const dir in neighbors) {
      const [nx, ny] = neighbors[dir];
      if (!inBounds(nx, ny, mapBase)) continue;
      const wnx = wrapX(nx, mapBase);
      const nImp = mapBase.getImprovements(wnx, ny);
      if (nImp.road) adjacentRoads++;
    }
    if (adjacentRoads >= 2) score += 2;
  }

  // ── Mine: only hills/mountains with road (M.4) ──
  if (!imp.mining && imp.road && CAN_MINE[terrain] && MINING_TURNS[terrain] > 0) {
    if (terrain === 4) score += 5;       // Hills: +3 shields from mining
    else if (terrain === 5) score += 3;  // Mountains: +1 shield from mining
    else score += 1;                     // Desert/Glacier: +1 shield, low priority
  }

  // ── Fortress at chokepoints (M.4) ──
  if (!imp.fortress && TERRAIN_DEFENSE[terrain] >= 3) {
    if (_isChokepoint(gx, gy, mapBase)) score += 3;
  }

  // ── Railroad: on roaded tiles (M.4) ──
  // Score is low since it requires Engineering and is a late-game improvement.
  if (imp.road && !imp.railroad) {
    if (gameState && civSlot != null && hasTech(gameState, civSlot, TECH_ENGINEERING)) {
      score += 2;
    }
  }

  // ── Terrain improvement value bonus ──
  // Add specific terrain improvement value scoring for settler decisions
  score += scoreTerrainImprovement(gx, gy, mapBase, gameState, civSlot);

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

// ── Settler military escort assignment ─────────────────────────────

/**
 * Find a nearby military unit (within 3 tiles) to escort a settler
 * and assign it an ESCORT goal toward the settler's destination.
 *
 * If no military escort is nearby, returns true to signal the settler
 * should move more cautiously (prefer tiles near own cities).
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase   - map data
 * @param {number} civSlot   - civ slot
 * @param {number} settlerGx - settler position X
 * @param {number} settlerGy - settler position Y
 * @param {number} destGx    - destination X
 * @param {number} destGy    - destination Y
 * @param {object} [strategy] - strategy with goals
 * @param {Array<string>|null} [debugLog=null]
 * @returns {boolean} true if an escort was assigned
 */
function assignSettlerEscort(gameState, mapBase, civSlot, settlerGx, settlerGy, destGx, destGy, strategy, debugLog) {
  const escortRadius = 6; // 3 real tiles in doubled-coord
  let bestUnit = null;
  let bestDist = Infinity;
  let bestIdx = -1;

  for (let i = 0; i < gameState.units.length; i++) {
    const u = gameState.units[i];
    if (u.gx < 0 || u.owner !== civSlot) continue;
    // Must be a land military unit (not settler, diplomat, trader)
    const domain = UNIT_DOMAIN[u.type] ?? 0;
    if (domain !== 0) continue;
    const role = UNIT_ROLE[u.type] ?? 0;
    if (role >= 5) continue; // skip transports, settlers, diplomats, traders
    if ((UNIT_ATK[u.type] || 0) === 0 && (UNIT_DEF[u.type] || 0) === 0) continue;
    // Must not already have orders (goto, fortified, etc.)
    if (u.orders === 'goto') continue;

    const dist = tileDist(u.gx, u.gy, settlerGx, settlerGy, mapBase);
    if (dist <= escortRadius && dist < bestDist) {
      bestDist = dist;
      bestUnit = u;
      bestIdx = i;
    }
  }

  if (bestUnit && strategy?.goals) {
    strategy.goals.addTacticalGoal(GOAL_ESCORT, 100, destGx, destGy);
    // Try to assign the unit to this escort goal
    const escortGoals = strategy.goals.findGoals(GOAL_ESCORT);
    for (const { goal } of escortGoals) {
      if (goal.targetGx === destGx && goal.targetGy === destGy && goal.assignedUnit < 0) {
        goal.assignedUnit = bestIdx;
        break;
      }
    }
    if (debugLog) {
      debugLog.push(`CITY: Escort assigned: unit #${bestIdx} (dist ${bestDist}) → settler dest (${destGx},${destGy})`);
    }
    return true;
  }

  return false;
}

// ═══════════════════════════════════════════════════════════════════
// Main export
// ═══════════════════════════════════════════════════════════════════

/**
 * M.3: Settler Decision Tree + Worker dispatch.
 *
 * Full settler AI with difficulty-based settler limits and expand vs
 * terraform decision (ported from Civ2 FUN_00498e8b / FUN_005312e4).
 *
 * Decision tree for each settler/engineer:
 *   1. FIRST CITY: found immediately (or within 2 moves)
 *   2. EXPAND vs TERRAFORM decision:
 *      a. Compute desired settlers = cities * maxSettlersPerCity[difficulty]
 *      b. Engineers count as 1.5 settlers (they're better at terraform)
 *      c. If effectiveSettlers > desiredSettlers → terraform (worker mode)
 *      d. If effectiveSettlers ≤ desiredSettlers → found new city
 *   3. CITY-JOIN: if settler is in a city of size ≤ 5 and no good sites,
 *      consider joining the city to boost growth (adds 1 population)
 *
 * Worker logic (type 0 in terraform mode, or type 1 always):
 *   - M.4 terrain-aware priorities
 *   - Move toward tiles near cities that need improvement
 *
 * @param {object} gameState - current game state
 * @param {object} mapBase - immutable map data with accessors
 * @param {number} civSlot - civ slot (1-7)
 * @param {object} [strategy] - strategic assessment (used for expansion desire)
 * @param {Array<string>|null} [debugLog=null] - optional debug log
 * @returns {Array<object>} actions
 */
export function generateSettlerActions(gameState, mapBase, civSlot, strategy, debugLog = null) {
  const actions = [];
  const ownCities = gameState.cities.filter(c => c.owner === civSlot && c.size > 0);

  // ── M.3: Compute settler inventory (weighted) ──
  const difficulty = getDifficultyIndex(gameState, civSlot);
  const maxPerCity = MAX_SETTLERS_PER_CITY[difficulty] ?? 3;
  const desiredSettlers = Math.max(1, ownCities.length) * maxPerCity;

  // Count effective settlers: engineers count as 1.5
  let effectiveSettlers = 0;
  for (const u of gameState.units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    if (u.type === 0) effectiveSettlers += 1;
    else if (u.type === 1) effectiveSettlers += ENGINEER_SETTLER_WEIGHT;
  }

  // Should we expand (found new cities) or terraform?
  // Strategy override: if strategy explicitly says no expansion, terraform only.
  const expansionAllowed = strategy?.expansionDesired ?? true;
  const wantExpand = expansionAllowed && (
    ownCities.length === 0 ||
    effectiveSettlers <= desiredSettlers
  );

  for (let i = 0; i < gameState.units.length; i++) {
    const unit = gameState.units[i];

    // Only handle our alive settlers/engineers with moves left
    if (unit.owner !== civSlot) continue;
    if (unit.gx < 0) continue;
    if (unit.movesLeft <= 0) continue;
    if (unit.type !== 0 && unit.type !== 1) continue;
    if (BUSY_ORDERS.has(unit.orders)) continue;

    // ── Settler (type 0): expand vs terraform decision ──
    if (unit.type === 0) {
      const isFirstCity = ownCities.length === 0;

      // ── FIRST CITY: always found immediately ──
      if (isFirstCity) {
        const foundAction = _tryFoundFirstCity(unit, i, gameState, mapBase, civSlot, debugLog);
        if (foundAction) {
          actions.push(foundAction);
          continue;
        }
      }

      // ── EXPAND: settler should found a new city ──
      if (wantExpand && !isFirstCity) {
        const expandAction = _tryExpandCity(unit, i, gameState, mapBase, civSlot, ownCities, debugLog, strategy);
        if (expandAction) {
          actions.push(expandAction);
          continue;
        }

        // ── CITY-JOIN: no good site found, consider joining a small city ──
        // If settler is in a city of size ≤ 5 and there are no good sites
        // within search radius, join the city to boost growth.
        const joinAction = _tryCityJoin(unit, i, gameState, mapBase, civSlot, debugLog);
        if (joinAction) {
          actions.push(joinAction);
          continue;
        }

        // No good site and can't join — fall through to worker mode
        if (debugLog) debugLog.push(`CITY: Settler #${i}: no sites or join, switching to terraform`);
      }

      // ── TERRAFORM: settler acts as worker ──
      if (!wantExpand && debugLog) {
        debugLog.push(`CITY: Settler #${i}: terraform mode (effective=${effectiveSettlers.toFixed(1)} > desired=${desiredSettlers})`);
      }
      // Fall through to worker logic below
    }

    // ── Worker logic (type 0 in terraform mode, or type 1 always) ──
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

    // Last resort: if settler has no action and is NOT in a city,
    // try to move toward the nearest own city (so it's not stuck in the wild).
    // If it IS in a city and has nothing to do, skip its turn.
    const inCity = ownCities.some(c => c.gx === unit.gx && c.gy === unit.gy);
    if (!inCity && ownCities.length > 0) {
      // Move toward nearest city
      let bestCity = null, bestDist = Infinity;
      for (const c of ownCities) {
        const dx = Math.abs(unit.gx - c.gx);
        const dy = Math.abs(unit.gy - c.gy);
        const d = dx + dy;
        if (d < bestDist) { bestDist = d; bestCity = c; }
      }
      if (bestCity) {
        const gotoAction = { type: 'GOTO', unitIndex: i, targetGx: bestCity.gx, targetGy: bestCity.gy, path: [] };
        const err = validateAction(gameState, mapBase, gotoAction, civSlot);
        if (!err) {
          actions.push(gotoAction);
          if (debugLog) debugLog.push(`CITY: Settler #${i} at (${unit.gx},${unit.gy}): returning to city ${bestCity.name}`);
          continue;
        }
      }
    }

    // In a city with nothing to do — skip turn
    actions.push({ type: 'UNIT_ORDER', unitIndex: i, order: 'skip' });
    if (debugLog) debugLog.push(`CITY: Settler #${i} at (${unit.gx},${unit.gy}): idle, skipping`);
  }

  return actions;
}

// ── M.3: Settler sub-decision helpers ────────────────────────────

/**
 * Try to found the FIRST city. Used only when ownCities.length === 0.
 * In Civ2, the first settler founds within 1-3 turns. Use a tiny
 * search radius (3) so we don't wander toward a distant "optimal" site.
 *
 * @returns {object|null} action or null
 */
function _tryFoundFirstCity(unit, unitIndex, gameState, mapBase, civSlot, debugLog) {
  const currentScore = evaluateCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot);
  const currentTerrain = mapBase.getTerrain(unit.gx, unit.gy);

  // Build here immediately unless truly terrible (ocean, glacier, or very low score)
  const isTerrible = currentTerrain === 10 || currentTerrain === 7 || currentScore < 5;

  if (!isTerrible && currentScore >= 0) {
    const cityName = getNextCityName(gameState, civSlot);
    const buildAction = { type: 'BUILD_CITY', unitIndex, name: cityName };
    const err = validateAction(gameState, mapBase, buildAction, civSlot);
    if (!err) {
      if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: founding FIRST city "${cityName}" at (${unit.gx},${unit.gy}), score=${currentScore} (immediate)`);
      return buildAction;
    }
  }

  // Terrible tile — search nearby (radius 3 only)
  const bestSite = findBestCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot, 3);
  if (bestSite && bestSite.score >= 0) {
    if (bestSite.gx === unit.gx && bestSite.gy === unit.gy) {
      const cityName = getNextCityName(gameState, civSlot);
      const buildAction = { type: 'BUILD_CITY', unitIndex, name: cityName };
      const err = validateAction(gameState, mapBase, buildAction, civSlot);
      if (!err) {
        if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: founding FIRST city "${cityName}" at (${unit.gx},${unit.gy}), score=${bestSite.score} (best nearby)`);
        return buildAction;
      }
    }
    const dir = settlerDirectionToward(unit, bestSite.gx, bestSite.gy, gameState, mapBase, civSlot);
    if (dir) {
      const moveAction = { type: 'MOVE_UNIT', unitIndex, dir };
      const err = validateAction(gameState, mapBase, moveAction, civSlot);
      if (!err) {
        if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: moving toward first city site (${bestSite.gx},${bestSite.gy}), score=${bestSite.score}`);
        return moveAction;
      }
    }
  }

  // Fallback: build wherever we are
  {
    const cityName = getNextCityName(gameState, civSlot);
    const buildAction = { type: 'BUILD_CITY', unitIndex, name: cityName };
    const err = validateAction(gameState, mapBase, buildAction, civSlot);
    if (!err) {
      if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: founding FIRST city "${cityName}" at (${unit.gx},${unit.gy}) (fallback)`);
      return buildAction;
    }
  }

  return null;
}

/**
 * Try to found a subsequent city (expansion mode).
 * Uses "good enough" site threshold to prevent oscillation.
 *
 * @returns {object|null} action or null
 */
function _tryExpandCity(unit, unitIndex, gameState, mapBase, civSlot, ownCities, debugLog, strategy) {
  const threshold = BUILD_THRESHOLD_NORMAL;
  const currentScore = evaluateCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot);

  // "Good enough" site (>= 70% of threshold) — build here immediately
  if (currentScore >= threshold * 0.7) {
    const cityName = getNextCityName(gameState, civSlot);
    const buildAction = { type: 'BUILD_CITY', unitIndex, name: cityName };
    const err = validateAction(gameState, mapBase, buildAction, civSlot);
    if (!err) {
      if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: founding city "${cityName}" at (${unit.gx},${unit.gy}), score=${currentScore} (good-enough ≥ ${Math.round(threshold * 0.7)})`);
      return buildAction;
    }
  }

  // Search full radius for optimal site
  const bestSite = findBestCitySite(unit.gx, unit.gy, gameState, mapBase, civSlot);
  if (bestSite && bestSite.score >= threshold) {
    if (bestSite.gx === unit.gx && bestSite.gy === unit.gy) {
      const cityName = getNextCityName(gameState, civSlot);
      const buildAction = { type: 'BUILD_CITY', unitIndex, name: cityName };
      const err = validateAction(gameState, mapBase, buildAction, civSlot);
      if (!err) {
        if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: founding city "${cityName}" at (${unit.gx},${unit.gy}), site score=${bestSite.score}`);
        return buildAction;
      }
    }

    // ── Escort assignment: try to assign a nearby military unit ──
    assignSettlerEscort(gameState, mapBase, civSlot, unit.gx, unit.gy,
      bestSite.gx, bestSite.gy, strategy, debugLog);

    const dir = settlerDirectionToward(unit, bestSite.gx, bestSite.gy, gameState, mapBase, civSlot);
    if (dir) {
      const moveAction = { type: 'MOVE_UNIT', unitIndex, dir };
      const err = validateAction(gameState, mapBase, moveAction, civSlot);
      if (!err) {
        // If no escort was found, check for nearby enemies before moving
        const hasEscort = assignSettlerEscort(gameState, mapBase, civSlot, unit.gx, unit.gy,
          bestSite.gx, bestSite.gy, strategy, null);
        if (!hasEscort && isAdjacentToEnemy(unit.gx, unit.gy, mapBase, gameState, civSlot)) {
          // No escort and enemies adjacent — move toward nearest city instead
          const nearestCity = ownCities.reduce((best, c) => {
            const d = tileDist(unit.gx, unit.gy, c.gx, c.gy, mapBase);
            return (!best || d < best.dist) ? { city: c, dist: d } : best;
          }, null);
          if (nearestCity) {
            const safeDir = moveTowardCity(unit, nearestCity.city, mapBase, gameState, civSlot);
            if (safeDir) {
              if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: no escort, retreating toward ${nearestCity.city.name}`);
              return { type: 'MOVE_UNIT', unitIndex, dir: safeDir };
            }
          }
        }
        if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: moving toward site (${bestSite.gx},${bestSite.gy}), score=${bestSite.score}`);
        return moveAction;
      }
    }
  }

  // Full-threshold check on current tile (fallback)
  if (currentScore >= threshold) {
    const cityName = getNextCityName(gameState, civSlot);
    const buildAction = { type: 'BUILD_CITY', unitIndex, name: cityName };
    const err = validateAction(gameState, mapBase, buildAction, civSlot);
    if (!err) {
      if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: founding city "${cityName}" at (${unit.gx},${unit.gy}), score=${currentScore}`);
      return buildAction;
    }
  }

  return null; // no good site found
}

/**
 * M.3: Try to join a small city (add population).
 * Settler joins if:
 *   - It's on a tile with an own city of size ≤ 5
 *   - No good expansion sites were found (caller already tried _tryExpandCity)
 *
 * In Civ2, ADD_TO_CITY is how excess settlers boost small cities.
 *
 * @returns {object|null} action or null
 */
function _tryCityJoin(unit, unitIndex, gameState, mapBase, civSlot, debugLog) {
  const city = gameState.cities.find(c =>
    c.gx === unit.gx && c.gy === unit.gy && c.owner === civSlot && c.size > 0);

  if (!city) return null;

  // Only join small cities (size ≤ 5) — larger cities don't need the boost
  // and the settler is more valuable founding a new city
  if (city.size > 5) return null;

  const joinAction = { type: 'ADD_TO_CITY', unitIndex };
  const err = validateAction(gameState, mapBase, joinAction, civSlot);
  if (!err) {
    if (debugLog) debugLog.push(`CITY: Settler #${unitIndex}: joining city "${city.name}" (size ${city.size}) at (${unit.gx},${unit.gy})`);
    return joinAction;
  }

  return null;
}
