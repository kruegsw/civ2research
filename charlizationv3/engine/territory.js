// ═══════════════════════════════════════════════════════════════════
// territory.js — Dynamic territory expansion (shared: server + client)
//
// #106: When cities grow or wonders complete, claim unclaimed tiles
// using a scoring algorithm (distance, terrain value, strategic position).
// Auto-road placement on newly claimed tiles.
//
// Ported from Civ2 binary territory management:
//   FUN_004e7641 — surrounding tile analysis / territory claim
//   Binary territory expansion triggers on city growth and wonder completion.
// ═══════════════════════════════════════════════════════════════════

import {
  CITY_RADIUS_DOUBLED, TERRAIN_DEFENSE, TERRAIN_BASE,
} from './defs.js';

// ═══════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════

/** Maximum distance (in iso tiles) to consider for territory expansion. */
const MAX_EXPANSION_DIST = 5;

/** Minimum city size before territory expansion kicks in. */
const MIN_CITY_SIZE_FOR_EXPANSION = 3;

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

/** Resolve city radius tile index to map coordinates (same as citycapture.js). */
function radiusTileCoords(cityGx, cityGy, ddx, ddy, mapBase) {
  const parC = cityGy & 1;
  const parT = (((cityGy + ddy) % 2) + 2) % 2;
  const tgx = cityGx + ((parC + ddx - parT) >> 1);
  const tgy = cityGy + ddy;
  const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
  if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) return null;
  return { gx: wgx, gy: tgy };
}

/** Isometric distance between two tiles (handles wrapping). */
function tileDist(ax, ay, bx, by, mw, wraps) {
  let dx = Math.abs(ax - bx);
  if (wraps) dx = Math.min(dx, mw - dx);
  return dx + Math.abs(ay - by);
}

/**
 * Score a tile for territory claiming.
 * Higher = more desirable to claim.
 *
 * @param {number} terrain - terrain type (0-10)
 * @param {number} dist - distance from claiming city
 * @param {object} imp - tile improvements
 * @param {boolean} hasResource - tile has a special resource
 * @returns {number} score
 */
function scoreTileForClaim(terrain, dist, imp, hasResource) {
  if (terrain === 10) return -1; // ocean tiles can't be claimed by land expansion

  // Base score from terrain yields (food + shields + trade)
  const yields = TERRAIN_BASE[terrain] || [0, 0, 0];
  let score = yields[0] + yields[1] + yields[2];

  // Terrain defense value (strategic position)
  const defValue = TERRAIN_DEFENSE[terrain] || 2;
  score += (defValue - 2); // hills/mountains/forests score higher

  // Distance penalty: closer tiles are more valuable
  score += Math.max(0, 6 - dist);

  // Improvement bonuses
  if (imp) {
    if (imp.road) score += 2;
    if (imp.railroad) score += 3;
    if (imp.irrigation) score += 2;
    if (imp.mining) score += 2;
    if (imp.fortress) score += 3;
  }

  // Special resource bonus
  if (hasResource) score += 4;

  return score;
}

// ═══════════════════════════════════════════════════════════════════
// Main: expandTerritory
// ═══════════════════════════════════════════════════════════════════

/**
 * Expand territory around a city, claiming unclaimed tiles.
 * Called when a city grows or a wonder is completed.
 *
 * Binary ref: FUN_004e7641 surrounding_tile_analysis —
 *   For each tile in the city's extended radius, if unclaimed (tileOwnership == 0xFF
 *   or unset), score it by (terrain value - distance + strategic bonus) and claim
 *   the best N tiles, where N scales with city size.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data with tileData, getTerrain, getImprovements
 * @param {number} cityIndex - index of the city triggering expansion
 * @param {object} [opts] - options
 * @param {boolean} [opts.wonderBonus] - if true, claim extra tiles (wonder completed)
 * @returns {{ claimed: number, autoRoads: number, events: object[] }}
 */
export function expandTerritory(state, mapBase, cityIndex, opts = {}) {
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0 || city.gx < 0) {
    return { claimed: 0, autoRoads: 0, events: [] };
  }

  const civSlot = city.owner;
  const events = [];

  // Only expand if city is large enough
  if (city.size < MIN_CITY_SIZE_FOR_EXPANSION && !opts.wonderBonus) {
    return { claimed: 0, autoRoads: 0, events: [] };
  }

  // Number of tiles to claim: scales with city size
  // Base: (citySize - 2), wonder bonus: +3
  let maxClaim = Math.max(1, city.size - 2);
  if (opts.wonderBonus) maxClaim += 3;

  // Gather candidate tiles: city radius + extended range
  const candidates = [];
  const checked = new Set();

  // Check city radius tiles (21 positions)
  for (let ri = 0; ri < CITY_RADIUS_DOUBLED.length; ri++) {
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
    const pos = radiusTileCoords(city.gx, city.gy, ddx, ddy, mapBase);
    if (!pos) continue;

    const tIdx = pos.gy * mapBase.mw + pos.gx;
    if (checked.has(tIdx)) continue;
    checked.add(tIdx);

    const tile = mapBase.tileData[tIdx];
    if (!tile) continue;

    // Only claim unclaimed tiles (0xFF or no owner) or tiles owned by barbarians (0)
    const tileOwner = tile.tileOwnership;
    if (tileOwner !== undefined && tileOwner !== 0xFF && tileOwner !== 0 &&
        tileOwner !== civSlot) continue;
    if (tileOwner === civSlot) continue; // already ours

    const terrain = tile.terrain ?? (mapBase.getTerrain ? mapBase.getTerrain(pos.gx, pos.gy) : 0);
    const imp = tile.improvements || (mapBase.getImprovements ? mapBase.getImprovements(pos.gx, pos.gy) : null);
    const dist = tileDist(city.gx, city.gy, pos.gx, pos.gy, mapBase.mw, mapBase.wraps);

    // Check for special resources
    const hasResource = !!(tile.specialResource);

    const score = scoreTileForClaim(terrain, dist, imp, hasResource);
    if (score < 0) continue; // ocean or undesirable

    candidates.push({ gx: pos.gx, gy: pos.gy, tIdx, score, imp });
  }

  // Also check extended range (distance 3-5) for larger cities
  if (city.size >= 5 || opts.wonderBonus) {
    // Scan a wider area around the city
    const scanRange = MAX_EXPANSION_DIST;
    for (let dy = -scanRange; dy <= scanRange; dy++) {
      for (let dx = -scanRange; dx <= scanRange; dx++) {
        const tgy = city.gy + dy;
        if (tgy < 0 || tgy >= mapBase.mh) continue;
        let tgx = city.gx + dx;
        if (mapBase.wraps) tgx = ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw;
        else if (tgx < 0 || tgx >= mapBase.mw) continue;

        const tIdx = tgy * mapBase.mw + tgx;
        if (checked.has(tIdx)) continue;
        checked.add(tIdx);

        const tile = mapBase.tileData[tIdx];
        if (!tile) continue;

        const tileOwner = tile.tileOwnership;
        if (tileOwner !== undefined && tileOwner !== 0xFF && tileOwner !== 0 &&
            tileOwner !== civSlot) continue;
        if (tileOwner === civSlot) continue;

        const dist = tileDist(city.gx, city.gy, tgx, tgy, mapBase.mw, mapBase.wraps);
        if (dist > MAX_EXPANSION_DIST) continue;

        const terrain = tile.terrain ?? (mapBase.getTerrain ? mapBase.getTerrain(tgx, tgy) : 0);
        const imp = tile.improvements || (mapBase.getImprovements ? mapBase.getImprovements(tgx, tgy) : null);
        const hasResource = !!(tile.specialResource);

        const score = scoreTileForClaim(terrain, dist, imp, hasResource);
        if (score < 0) continue;

        candidates.push({ gx: tgx, gy: tgy, tIdx, score, imp });
      }
    }
  }

  // Sort by score descending — claim the best tiles first
  candidates.sort((a, b) => b.score - a.score);

  let claimed = 0;
  let autoRoads = 0;

  for (let i = 0; i < Math.min(maxClaim, candidates.length); i++) {
    const c = candidates[i];
    const tile = mapBase.tileData[c.tIdx];
    if (!tile) continue;

    // Claim the tile
    tile.tileOwnership = civSlot;
    claimed++;

    // Auto-road placement on claimed tiles if they don't already have a road
    // Binary: newly claimed tiles get a road for connectivity
    if (tile.improvements && !tile.improvements.road) {
      tile.improvements = { ...tile.improvements, road: true };
      autoRoads++;
    } else if (!tile.improvements) {
      tile.improvements = { road: true, railroad: false, irrigation: false,
        mining: false, fortress: false, pollution: false, farmland: false,
        airbase: false, city: false };
      autoRoads++;
    }
  }

  if (claimed > 0) {
    events.push({
      type: 'territoryExpanded',
      civSlot,
      cityIndex,
      cityName: city.name,
      tilesClaimed: claimed,
      autoRoads,
      wonderBonus: !!opts.wonderBonus,
    });
  }

  return { claimed, autoRoads, events };
}
