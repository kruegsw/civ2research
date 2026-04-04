// ═══════════════════════════════════════════════════════════════════
// mapgenCiv2TecRegions.js — Civ2-Tectonics with Voronoi continent shapes
//
// Identical to Civ2-Tectonics EXCEPT how continent shapes are determined.
// Instead of random walks filling continental plates, Voronoi regions
// define which tiles are land vs ocean. This produces more angular,
// structured continent outlines while keeping the full Civ2 terrain
// pipeline for biomes, elevation, rivers, etc.
//
// Pipeline:
//   1. Plate generation (Voronoi, classify continental/oceanic, drift)
//   2. Voronoi sub-regions (Lloyd-relaxed) → land/ocean classification
//      - Regions inside continental plates are land candidates
//      - Fill regions until land target is met
//   3. Tectonic boundary processing (mountain chains, rifts, arcs)
//   4. Mountain range spreading (gaussian falloff from boundaries)
//   5. Small island scatter
//   6. Bridge fill
//   7–12. Civ2 terrain pipeline (latitude, moisture, elevation, etc.)
//   13. Body IDs + fertility + goody huts
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from '../engine/defs.js';

// ── MSVC-compatible LCG PRNG ──
class MsvcRng {
  constructor(seed) { this.state = (seed >>> 0) || 1; }
  next() {
    this.state = (Math.imul(this.state, 214013) + 2531011) >>> 0;
    return (this.state >>> 16) & 0x7FFF;
  }
  nextInt(n) { return n <= 1 ? 0 : this.next() % n; }
  random() { return this.next() / 32768; }
}

// ── Direction tables ──
const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];
const DIAG_DX = [1, 1, -1, -1];
const DIAG_DY = [-1, 1, 1, -1];
const RIVER_DX = DIAG_DX;
const RIVER_DY = DIAG_DY;

// ── Terrain constants ──
const T_DESERT = 0, T_PLAINS = 1, T_GRASSLAND = 2, T_FOREST = 3;
const T_HILLS = 4, T_MOUNTAINS = 5, T_TUNDRA = 6, T_GLACIER = 7;
const T_SWAMP = 8, T_JUNGLE = 9, T_OCEAN = 10;

/**
 * Generate a map using plate tectonics + Voronoi regions for continent shape.
 */
export function generateMapCiv2TecRegions(settings = {}) {
  const mw = settings.width || 50;
  const mh = settings.height || 80;
  const mapSeed = settings.seed ?? Math.floor(Math.random() * 65536);
  const rng = new MsvcRng(mapSeed);
  const mapShape = settings.mapShape ?? 0;
  const wraps = mapShape === 0;

  const landmass = settings.landmass ?? 1;
  const continentSetting = settings.continents ?? 1;
  let temperature = settings.temperature ?? 0;
  let climate = settings.climate ?? 0;
  const age = settings.age ?? 1;

  if (wraps) { temperature *= 2; climate *= 2; }

  // ── Coordinate helpers ──
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }
  function inBounds(x, y) {
    if (y < 0 || y >= mh) return false;
    return wraps || (x >= 0 && x < mw);
  }
  function snap(x, y) { return (x & ~1) | (y & 1); }
  function idx(x, y) { return y * mw + snap(wrapX(x), y); }
  function getTer(x, y) {
    if (!inBounds(x, y)) return T_OCEAN;
    return tiles[idx(x, y)];
  }

  function tileDist(x1, y1, x2, y2) {
    let dx = Math.abs(x1 - x2);
    if (wraps) dx = Math.min(dx, mw - dx);
    const dy = Math.abs(y1 - y2);
    return Math.sqrt(dx * dx + dy * dy);
  }

  const landCount = new Uint8Array(mw * mh);
  const tiles = new Array(mw * mh).fill(T_OCEAN);

  const _yMargin = Math.min(2, Math.floor(mh / 4));
  function checkBounds(x, y) {
    if (y < _yMargin || y > mh - 1 - _yMargin) return false;
    if (wraps) return true; // any x is valid on wrapping maps
    return x >= 0 && x < mw;
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 1: Plate generation (identical to Civ2Tec)
  // ═══════════════════════════════════════════════════════════

  const totalValidTiles = Math.floor(mw * mh / 2);
  const numPlates = Math.max(2, Math.min(8 + rng.nextInt(5), Math.floor(totalValidTiles / 4))); // scale for small maps
  const plateCenters = [];

  for (let i = 0; i < numPlates; i++) {
    let bestDist = -1, bestX = 0, bestY = 0;
    for (let a = 0; a < 20; a++) {
      const cy = 4 + rng.nextInt(Math.max(1, mh - 8));
      const cx = snap(rng.nextInt(mw), cy);
      let nearest = Infinity;
      for (const p of plateCenters) nearest = Math.min(nearest, tileDist(cx, cy, p.x, p.y));
      if (nearest > bestDist) { bestDist = nearest; bestX = cx; bestY = cy; }
    }
    plateCenters.push({ x: bestX, y: bestY });
  }

  const plateId = new Uint8Array(mw * mh);
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      let best = Infinity, bestP = 0;
      for (let p = 0; p < numPlates; p++) {
        const d = tileDist(x, y, plateCenters[p].x, plateCenters[p].y);
        if (d < best) { best = d; bestP = p; }
      }
      plateId[y * mw + x] = bestP + 1;
    }
  }

  const plateAreas = new Array(numPlates).fill(0);
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const pid = plateId[y * mw + x];
      if (pid) plateAreas[pid - 1]++;
    }
  }

  const continentalRatio = [0.33, 0.42, 0.55][landmass];
  const sorted = plateAreas.map((a, i) => ({ i, a })).sort((a, b) => b.a - a.a);
  let cumArea = 0;
  const totalArea = plateAreas.reduce((s, a) => s + a, 0);
  const isContinental = new Array(numPlates).fill(false);
  for (const { i, a } of sorted) {
    if (cumArea / totalArea < continentalRatio) {
      isContinental[i] = true;
      cumArea += a;
    }
  }

  const plateDrift = plateCenters.map(() => ({
    vx: (rng.random() - 0.5) * 2,
    vy: (rng.random() - 0.5) * 2,
  }));

  // ═══════════════════════════════════════════════════════════
  // PHASE 2: Voronoi regions → continent shape
  // ═══════════════════════════════════════════════════════════
  //
  // Generate fine-grained Voronoi regions across the map, Lloyd-relax
  // them for even spacing, then classify each region as land or ocean
  // based on which plate its center falls in. Regions within
  // continental plates become land. This defines continent SHAPE only
  // — terrain types come from the Civ2 pipeline later.

  // ~1 region per 12-15 tiles → chunky polygon coastlines
  const regionCount = Math.max(2, Math.min(300,
    Math.floor(totalValidTiles / 13)));

  // Generate random region seeds
  let regionSeeds = [];
  for (let i = 0; i < regionCount; i++) {
    regionSeeds.push({
      x: rng.random() * mw,
      y: 2 + rng.random() * (mh - 4), // keep away from poles
    });
  }

  // Lloyd relaxation (3 iterations)
  const regionOf = new Int16Array(mw * mh).fill(-1);
  const LLOYD_ITERS = 3;

  for (let iter = 0; iter < LLOYD_ITERS; iter++) {
    // Assign tiles to nearest seed
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const ti = y * mw + x;
        let bestDist = Infinity, bestR = 0;
        for (let r = 0; r < regionSeeds.length; r++) {
          const d = tileDist(x, y, regionSeeds[r].x, regionSeeds[r].y);
          if (d < bestDist) { bestDist = d; bestR = r; }
        }
        regionOf[ti] = bestR;
      }
    }

    // Compute centroids
    const sumX = new Float64Array(regionCount);
    const sumY = new Float64Array(regionCount);
    const cnt = new Uint32Array(regionCount);

    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const r = regionOf[y * mw + x];
        if (r < 0) continue;
        let ux = x;
        if (wraps) {
          let dx = x - regionSeeds[r].x;
          if (dx > mw / 2) dx -= mw;
          if (dx < -mw / 2) dx += mw;
          ux = regionSeeds[r].x + dx;
        }
        sumX[r] += ux;
        sumY[r] += y;
        cnt[r] += 1;
      }
    }

    for (let r = 0; r < regionCount; r++) {
      if (cnt[r] === 0) continue;
      let cx = sumX[r] / cnt[r];
      const cy = sumY[r] / cnt[r];
      if (wraps) cx = ((cx % mw) + mw) % mw;
      regionSeeds[r] = { x: cx, y: cy };
    }
  }

  // Final tile assignment
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const ti = y * mw + x;
      let bestDist = Infinity, bestR = 0;
      for (let r = 0; r < regionSeeds.length; r++) {
        const d = tileDist(x, y, regionSeeds[r].x, regionSeeds[r].y);
        if (d < bestDist) { bestDist = d; bestR = r; }
      }
      regionOf[ti] = bestR;
    }
  }

  // Mirror regionOf to padding positions
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = snap(x, y);
      if (x !== validX) regionOf[y * mw + x] = regionOf[y * mw + validX];
    }
  }

  // Measure region tile counts and find which plate each region center is in
  const regionTileCount = new Uint32Array(regionCount);
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const r = regionOf[y * mw + x];
      if (r >= 0) regionTileCount[r]++;
    }
  }

  // Determine which plate each region's center belongs to
  const regionPlate = new Array(regionCount); // plate index (0-based)
  for (let r = 0; r < regionCount; r++) {
    const sx = regionSeeds[r].x;
    const sy = regionSeeds[r].y;
    // Find nearest plate center
    let best = Infinity, bestP = 0;
    for (let p = 0; p < numPlates; p++) {
      const d = tileDist(sx, sy, plateCenters[p].x, plateCenters[p].y);
      if (d < best) { best = d; bestP = p; }
    }
    regionPlate[r] = bestP;
  }

  // Classify regions: land if in a continental plate
  // Sort continental regions by distance to their plate center (closest first)
  // so we fill from the plate interior outward, stopping at the land target
  const contParam = Math.max(continentSetting, 0);
  const mapTileCount = Math.floor((mh * mw) / 2 / 400);
  const totalLandTarget = Math.floor(
    mapTileCount * ((landmass * 8 + 8 + contParam * 8) * 5 + 0x50) * 8 / 10
  );

  // Build list of continental regions with distance to their plate center
  const contRegions = [];
  for (let r = 0; r < regionCount; r++) {
    const p = regionPlate[r];
    if (!isContinental[p]) continue;
    const dist = tileDist(regionSeeds[r].x, regionSeeds[r].y,
                          plateCenters[p].x, plateCenters[p].y);
    contRegions.push({ r, dist, tileCount: regionTileCount[r] });
  }
  // Sort: closest to plate center first → fills continent interior first
  contRegions.sort((a, b) => a.dist - b.dist);

  // Fill regions as land until we hit the target
  const regionIsLand = new Uint8Array(regionCount);
  let landPlaced = 0;

  for (const { r, tileCount } of contRegions) {
    if (landPlaced >= totalLandTarget) break;
    regionIsLand[r] = 1;
    landPlaced += tileCount;
  }

  // Write landCount from region classification
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      if (!checkBounds(x, y)) continue;
      const r = regionOf[y * mw + x];
      if (r >= 0 && regionIsLand[r]) {
        landCount[y * mw + x] = 1;
      }
    }
  }

  // ── Coastline wobble ──
  // Voronoi boundaries produce straight edges. Fix that by repeatedly
  // eroding/accreting the coastline: land tiles touching ocean may be
  // removed, ocean tiles touching land may be filled. Multiple passes
  // compound into organic, irregular coastlines.
  const WOBBLE_PASSES = 3;
  for (let pass = 0; pass < WOBBLE_PASSES; pass++) {
    // Snapshot current state so decisions don't cascade within a pass
    const snap_lc = new Uint8Array(landCount);

    for (let y = 2; y < mh - 2; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        if (!checkBounds(x, y)) continue;
        const ti = y * mw + x;
        const isLand = snap_lc[ti] > 0;

        // Count land vs ocean among 8 neighbors
        let landN = 0, oceanN = 0;
        for (let d = 0; d < 8; d++) {
          const nx = wrapX(x + DIR8_DX[d]);
          const ny = y + DIR8_DY[d];
          if (!inBounds(nx, ny)) { oceanN++; continue; }
          const ni = ny * mw + snap(nx, ny);
          if (snap_lc[ni] > 0) landN++; else oceanN++;
        }

        if (isLand && oceanN > 0) {
          // Coastal land tile — more ocean neighbors = more likely to erode
          // ~35% base chance, scaled by how exposed the tile is
          const erodeChance = 0.20 + 0.10 * (oceanN / 8);
          if (rng.random() < erodeChance) {
            landCount[ti] = 0;
          }
        } else if (!isLand && landN > 0) {
          // Ocean tile next to land — more land neighbors = more likely to fill
          // ~25% base chance, scaled by how surrounded the tile is
          const fillChance = 0.12 + 0.15 * (landN / 8);
          if (rng.random() < fillChance) {
            landCount[ti] = 1;
          }
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 3: Tectonic boundary processing (same as Civ2Tec)
  // ═══════════════════════════════════════════════════════════

  const tecBoost = new Float32Array(mw * mh);

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const myPid = plateId[y * mw + x];
      if (!myPid) continue;
      const p1 = myPid - 1;

      for (let d = 0; d < 8; d++) {
        const nx = wrapX(x + DIR8_DX[d]);
        const ny = y + DIR8_DY[d];
        if (!inBounds(nx, ny)) continue;
        const nPid = plateId[idx(nx, ny)];
        if (nPid === myPid || !nPid) continue;

        const p2 = nPid - 1;
        const relVx = plateDrift[p1].vx - plateDrift[p2].vx;
        const relVy = plateDrift[p1].vy - plateDrift[p2].vy;
        const ndx = DIR8_DX[d], ndy = DIR8_DY[d];
        const len = Math.sqrt(ndx * ndx + ndy * ndy) || 1;
        const convergence = (relVx * ndx + relVy * ndy) / len;

        const ti = y * mw + x;

        if (convergence > 0.3) {
          if (isContinental[p1] && isContinental[p2]) {
            tecBoost[ti] = Math.max(tecBoost[ti], 2);
            landCount[ti] = Math.max(landCount[ti], 1);
          } else if (isContinental[p1] || isContinental[p2]) {
            tecBoost[ti] = Math.max(tecBoost[ti], 1);
            landCount[ti] = Math.max(landCount[ti], 1);
          } else {
            if (rng.random() < 0.15) {
              tecBoost[ti] = Math.max(tecBoost[ti], 1);
              landCount[ti] = Math.max(landCount[ti], 1);
            }
          }
        } else if (convergence < -0.3) {
          if (isContinental[p1] && isContinental[p2]) {
            if (landCount[ti] > 0 && rng.random() < 0.4) {
              landCount[ti] = 0;
              tecBoost[ti] = 0;
            }
          }
        }

        break;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 4: Spread mountain ranges (same as Civ2Tec)
  // ═══════════════════════════════════════════════════════════

  const spreadVisited = new Uint8Array(mw * mh);
  const spreadQueue = [];

  for (let i = 0; i < mw * mh; i++) {
    if (tecBoost[i] > 0) {
      spreadQueue.push({ i, boost: tecBoost[i] });
      spreadVisited[i] = 1;
    }
  }

  let sHead = 0;
  while (sHead < spreadQueue.length) {
    const { i: ti, boost } = spreadQueue[sHead++];
    landCount[ti] = Math.min(landCount[ti] + Math.round(boost), 4);

    if (boost <= 1.5) continue;
    const ty = Math.floor(ti / mw);
    const tx = ti % mw;

    for (let d = 0; d < 8; d++) {
      let nx = tx + DIR8_DX[d];
      const ny = ty + DIR8_DY[d];
      if (ny < 0 || ny >= mh) continue;
      nx = wrapX(nx);
      if (!wraps && (nx < 0 || nx >= mw)) continue;
      nx = snap(nx, ny);
      const ni = ny * mw + nx;

      if (spreadVisited[ni]) continue;
      spreadVisited[ni] = 1;

      const decay = (d & 1) === 0 ? 1.8 : 1.5;
      const childBoost = boost - decay;
      if (childBoost < 0.8) continue;

      spreadQueue.push({ i: ni, boost: childBoost });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 5: Small island scatter
  // ═══════════════════════════════════════════════════════════

  const numIslands = continentSetting <= 0 ? 30 + landmass * 15 : 15 + landmass * 10;
  for (let i = 0; i < numIslands; i++) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const sy = rng.nextInt(mh);
      const sx = snap(rng.nextInt(mw), sy);
      if (landCount[idx(sx, sy)]) continue;

      let nearestLand = Infinity;
      for (let d = 1; d <= 7; d += 2) {
        let cx = sx, cy = sy;
        for (let step = 1; step <= 10; step++) {
          cx = wrapX(cx + DIR8_DX[d]);
          cy = cy + DIR8_DY[d];
          if (!inBounds(cx, cy)) break;
          if (landCount[idx(cx, cy)]) { nearestLand = Math.min(nearestLand, step); break; }
        }
      }
      if (nearestLand < 2 || nearestLand > 7) continue;

      const islandSize = rng.nextInt(12) + 3;
      let x = sx, y = sy;
      for (let step = 0; step < islandSize; step++) {
        if (!inBounds(x, y)) break;
        const ti = idx(x, y);
        if (!landCount[ti]) landCount[ti] = 1;
        const dd = rng.next() & 3;
        x = wrapX(x + DIAG_DX[dd]);
        y = y + DIAG_DY[dd];
      }
      break;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 6: Bridge fill
  // ═══════════════════════════════════════════════════════════
  {
    let y = 1;
    while (y < mh - 2) {
      let x = y & 1;
      while (x < mw - 2) {
        let mask = 0;
        if (landCount[idx(x, y)]) mask |= 1;
        if (landCount[idx(x + 1, y + 1)]) mask |= 2;
        if (landCount[idx(x + 1, y - 1)]) mask |= 4;
        if (landCount[idx(x + 2, y)]) mask |= 8;
        if (mask === 6 || mask === 9) {
          landCount[idx(x + 1, y + 1)] = 1;
          landCount[idx(x + 1, y - 1)] = 1;
          landCount[idx(x + 2, y)] = 1;
          if (x < 2 || y < 2) {
            if (y < 2) { if (x > 1) x -= 2; }
            else { y -= 1; x += 1; }
          } else { x -= 1; y -= 1; }
        }
        x += 2;
      }
      y += 1;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASES 7–12: Civ2 terrain pipeline (identical to Civ2Tec)
  // ═══════════════════════════════════════════════════════════════

  // ── Phase 7: Latitude-based terrain assignment ──
  const bandWidth = wraps ? Math.floor(mh / 8) : Math.floor(mh / 12);
  const bandWidthClamped = Math.max(bandWidth, 2);

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      const lc = landCount[i];
      if (lc === 0) {
        tiles[i] = T_OCEAN;
      } else if (lc >= 3) {
        tiles[i] = T_MOUNTAINS;
      } else if (lc === 2) {
        tiles[i] = T_HILLS;
      } else {
        const tempOffset = wraps ? temperature * -6 : temperature * -3;
        const halfH = Math.floor(mh / 2) + 8;
        const jitter1 = (rng.next() & 0xF) + 1;
        const check = y + jitter1;
        const jitter2 = (rng.next() & 0xF) + 1;
        const adjusted = y + jitter2;
        let distFromCenter;
        if (check >= halfH) distFromCenter = adjusted - halfH;
        else distFromCenter = halfH - adjusted;
        distFromCenter += tempOffset;
        if (distFromCenter < 1) distFromCenter = 0;
        const band = Math.floor(distFromCenter / bandWidthClamped);
        switch (band) {
          case 0: tiles[i] = T_DESERT; break;
          case 1: case 2: case 3: tiles[i] = T_PLAINS; break;
          case 4: tiles[i] = (rng.next() & 1) === 0 ? T_PLAINS : T_TUNDRA; break;
          case 5: case 6: tiles[i] = T_TUNDRA; break;
          default: tiles[i] = T_GLACIER; break;
        }
      }
    }
  }

  // ── Phase 8: Elevation/moisture pass ──
  for (let y = 0; y < mh; y++) {
    const distFromEquator_we = Math.abs(Math.floor(mh / 2) - y);
    const distFromQuarter = Math.abs(Math.floor(mh / 4) - distFromEquator_we);
    const elevCap = climate * 4 + 4 + distFromQuarter;
    let elev_we = elevCap >= 1 ? rng.nextInt(climate * 4 + distFromQuarter + 5) : 0;

    for (let x = (y & 1); x < mw; x += 2) {
      const t = tiles[y * mw + x];
      if (t === T_OCEAN) {
        if (elev_we < elevCap) elev_we++;
      } else if (elev_we > 0) {
        if (climate * -2 + 6 > 0) elev_we -= rng.nextInt(climate * -2 + 7);
        switch (t) {
          case T_DESERT: tiles[y * mw + x] = T_PLAINS; break;
          case T_PLAINS: tiles[y * mw + x] = T_GRASSLAND; break;
          case T_HILLS: tiles[y * mw + x] = T_FOREST; break;
          case T_MOUNTAINS: elev_we -= 3; break;
          case T_TUNDRA: tiles[y * mw + x] = T_FOREST; break;
        }
      }
    }

    const ey = mh - 1 - y;
    const distFromEquator_ew = Math.abs(Math.floor(mh / 2) - ey);
    let elev_ew = 0;

    for (let x = mw - 2 + (ey & 1); x >= 0; x -= 2) {
      const t = tiles[ey * mw + x];
      if (t === T_OCEAN) {
        if (elev_ew < Math.floor(distFromEquator_ew / 2) + climate + 1) elev_ew++;
      } else if (elev_ew > 0) {
        if (climate * 2 + 2 < 6) elev_ew -= rng.nextInt(7 - (climate * 2 + 2));
        switch (t) {
          case T_DESERT: tiles[ey * mw + x] = T_PLAINS; break;
          case T_PLAINS: tiles[ey * mw + x] = T_GRASSLAND; break;
          case T_GRASSLAND:
            if (distFromEquator_ew < Math.floor(mh * 3 / 10)) {
              tiles[ey * mw + x] = distFromEquator_ew < 10 ? T_JUNGLE : T_SWAMP;
            } else {
              tiles[ey * mw + x] = T_FOREST;
            }
            elev_ew -= 2;
            break;
          case T_HILLS: tiles[ey * mw + x] = T_FOREST; break;
          case T_MOUNTAINS: elev_ew -= 3; break;
          case T_TUNDRA: tiles[ey * mw + x] = T_PLAINS; break;
          case T_SWAMP: tiles[ey * mw + x] = T_FOREST; break;
        }
      }
    }
  }

  // ── Phase 9: Elevation iterations (terrain promotion) ──
  const elevIterations = (age * 5 + 10) * 160;
  let elevX = 0, elevY = 0;

  for (let iter = 0; iter < elevIterations; iter++) {
    if ((iter & 1) === 0) {
      elevY = rng.nextInt(mh);
      elevX = (elevY & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
    } else {
      const d = rng.next() & 7;
      elevX = wrapX(elevX + DIR8_DX[d]);
      elevY = elevY + DIR8_DY[d];
    }
    if (!inBounds(elevX, elevY)) continue;
    const distFromEquator = Math.abs(Math.floor(mh / 2) - elevY);
    const ti = idx(elevX, elevY);
    const t = tiles[ti];
    if (t === T_OCEAN) continue;
    let newT = t;
    switch (t) {
      case T_DESERT: newT = T_PLAINS; break;
      case T_PLAINS: newT = T_HILLS; break;
      case T_GRASSLAND: newT = T_FOREST; break;
      case T_FOREST:
        newT = distFromEquator < Math.floor(mh * 3 / 10) ? T_JUNGLE : T_PLAINS;
        break;
      case T_HILLS: newT = T_MOUNTAINS; break;
      case T_MOUNTAINS:
        if (elevX >= 2 && elevY >= 2 && elevX < mw - 2 && elevY < mh - 2 &&
            getTer(elevX - 2, elevY) !== T_OCEAN && getTer(elevX + 2, elevY) !== T_OCEAN &&
            getTer(elevX, elevY - 2) !== T_OCEAN && getTer(elevX, elevY + 2) !== T_OCEAN) {
          tiles[ti] = T_OCEAN;
        }
        continue;
      case T_TUNDRA: newT = T_HILLS; break;
      case T_GLACIER: newT = T_MOUNTAINS; break;
      case T_SWAMP: newT = T_GRASSLAND; break;
      case T_JUNGLE: newT = T_SWAMP; break;
    }
    tiles[ti] = newT;
  }

  // ── Phase 10: Smoothing pass (neighbor voting) ──
  const smoothIterations = (3 - (age + 2)) * 800;
  const smoothBias = new Int8Array(11);
  if (climate === -1) { smoothBias[T_DESERT]++; smoothBias[T_PLAINS]++; smoothBias[T_SWAMP]--; }
  if (climate === 1) { smoothBias[T_GRASSLAND]++; smoothBias[T_SWAMP]++; if (temperature >= 0) smoothBias[T_JUNGLE]++; }
  if (temperature === -1) { smoothBias[T_TUNDRA]++; smoothBias[T_FOREST]++; smoothBias[T_DESERT]--; }
  if (temperature === 1) { smoothBias[T_PLAINS]++; smoothBias[T_TUNDRA]--; smoothBias[T_GLACIER]--; if (climate === -1) { smoothBias[T_GRASSLAND]--; smoothBias[T_JUNGLE]--; } }

  let prevSmooth = -1;
  let smoothX = 0, smoothY = 0;
  for (let iter = 0; iter < smoothIterations; iter++) {
    if ((iter & 1) === 0) {
      smoothY = rng.nextInt(mh);
      smoothX = (smoothY & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
      prevSmooth = -1;
    } else {
      const d = rng.next() & 7;
      smoothX = wrapX(smoothX + DIR8_DX[d]);
      smoothY = smoothY + DIR8_DY[d];
    }
    if (!inBounds(smoothX, smoothY)) continue;
    const ti = idx(smoothX, smoothY);
    const t = tiles[ti];
    if (t === T_OCEAN) continue;
    if (prevSmooth >= 0 && prevSmooth === t) continue;
    const isAboveForest = t > 2;

    const votes = new Int8Array(11);
    for (let k = 0; k < 11; k++) votes[k] = smoothBias[k];

    for (let d = 0; d < 8; d++) {
      const nx = wrapX(smoothX + DIR8_DX[d]);
      const ny = smoothY + DIR8_DY[d];
      if (!inBounds(nx, ny)) continue;
      const nt = tiles[idx(nx, ny)];
      if (nt === T_OCEAN) continue;
      if (nt > 2 && isAboveForest && votes[nt] !== 0) votes[nt]++;
      if ((d & 1) === 0) votes[nt]++;
      votes[nt]++;
    }

    let bestVote = 0, bestTer = t;
    for (let k = 0; k < 11; k++) {
      if (votes[k] > bestVote) {
        bestVote = votes[k];
        bestTer = k;
        prevSmooth = k;
      }
    }
    tiles[ti] = bestTer;
  }

  // ── Phase 11: River generation ──
  const riverTarget = landmass * 2 + climate * 2 + 12;
  let riversPlaced = 0;

  for (let attempt = 0; attempt < 1024 && riversPlaced < riverTarget; attempt++) {
    const snapshot = new Uint8Array(mw * mh);
    for (let i = 0; i < mw * mh; i++) snapshot[i] = tiles[i];

    let sx, sy, startFound = false;
    for (let tries = 0; tries < 200; tries++) {
      sy = rng.nextInt(mh);
      sx = (sy & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
      if (tiles[idx(sx, sy)] !== T_MOUNTAINS && tiles[idx(sx, sy)] !== T_OCEAN) { startFound = true; break; }
    }
    if (!startFound) break;

    let rx = sx, ry = sy;
    let dir = rng.next() & 3;
    let length = 0;
    let reachedWater = false;

    while (true) {
      const t = getTer(rx, ry);
      let riverTer = t;
      switch (t) {
        case T_DESERT: riverTer = (rng.nextInt(10) > 1 || length > 3) ? T_GRASSLAND : T_PLAINS; break;
        case T_PLAINS: riverTer = rng.nextInt(10) > 3 ? T_GRASSLAND : T_PLAINS; break;
        case T_FOREST: riverTer = rng.nextInt(10) > 2 ? T_GRASSLAND : T_FOREST; break;
        case T_HILLS: case T_MOUNTAINS: riverTer = T_GRASSLAND; break;
        case T_TUNDRA: riverTer = T_PLAINS; break;
        case T_GLACIER: riverTer = T_TUNDRA; break;
        case T_SWAMP: riverTer = rng.nextInt(10) > 3 ? T_JUNGLE : T_SWAMP; break;
      }
      riverTer |= 0x80;
      tiles[idx(rx, ry)] = riverTer;
      length++;

      for (let rd = 0; rd < 4 && !reachedWater; rd++) {
        const nx = wrapX(rx + RIVER_DX[rd]);
        const ny = ry + RIVER_DY[rd];
        if (inBounds(nx, ny) && (tiles[idx(nx, ny)] & 0x0F) === T_OCEAN) {
          reachedWater = true;
        }
      }

      dir = (dir + (rng.next() & 1) - (length & 1)) & 3;
      rx = wrapX(rx + RIVER_DX[dir]);
      ry = ry + RIVER_DY[dir];

      if (!inBounds(rx, ry)) break;
      if (snapshot[idx(rx, ry)] & 0x80) break;
      if (reachedWater) break;
    }

    const minLen = 5 - Math.floor((attempt + 1) / 800);
    if ((reachedWater || (snapshot[idx(rx, ry)] & 0x80)) && length >= minLen) {
      riversPlaced++;
    } else {
      for (let i = 0; i < mw * mh; i++) tiles[i] = snapshot[i];
    }
  }

  // ── Phase 12: Polar caps + tundra scatter ──
  for (let x = 0; x < mw; x += 2) {
    tiles[0 * mw + x] = T_GLACIER;
    tiles[(mh - 1) * mw + x + 1] = T_GLACIER;
  }
  const polarScatter = Math.floor(mw / 8);
  for (let i = 0; i < polarScatter; i++) {
    let rx = rng.nextInt(Math.floor(mw / 2));
    tiles[0 * mw + rx * 2] = T_TUNDRA;
    rx = rng.nextInt(Math.floor(mw / 2));
    tiles[1 * mw + rx * 2 + 1] = T_TUNDRA;
    rx = rng.nextInt(Math.floor(mw / 2));
    tiles[(mh - 1) * mw + rx * 2 + 1] = T_TUNDRA;
    rx = rng.nextInt(Math.floor(mw / 2));
    tiles[(mh - 2) * mw + rx * 2] = T_TUNDRA;
  }

  // ═══════════════════════════════════════════════════════════
  // Finalize: build tileData, post-processing
  // ═══════════════════════════════════════════════════════════

  const tileData = new Array(mw * mh);
  for (let i = 0; i < mw * mh; i++) {
    const hasRiver = !!(tiles[i] & 0x80);
    const terrain = tiles[i] & 0x0F;
    tileData[i] = {
      terrain: terrain > 10 ? T_OCEAN : terrain,
      river: hasRiver && terrain !== T_OCEAN,
      goodyHut: false,
      resourceSuppressed: false,
      improvements: EMPTY_IMP,
      cityRadiusOwner: 0,
      bodyId: 0,
      visibility: 0,
      tileOwnership: 0,
      fertility: 0,
    };
  }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = (x & ~1) | (y & 1);
      if (x !== validX) {
        tileData[y * mw + x] = { ...tileData[y * mw + validX] };
      }
    }
  }

  assignBodyIds(tileData, mw, mh, wraps);
  calculateFertility(tileData, mw, mh, wraps);
  placeGoodyHuts(tileData, mw, mh);

  return {
    mw, mh, mapShape, mapSeed, tileData,
    _plateId: plateId,
    _isContinental: isContinental,
    _tecBoost: tecBoost,
    _landCount: landCount,
    _regionOf: regionOf,
    _regionIsLand: regionIsLand,
  };
}

// ═══════════════════════════════════════════════════════════════
// Shared post-processing (from mapgen.js)
// ═══════════════════════════════════════════════════════════════

function assignBodyIds(tileData, mw, mh, wraps) {
  const DX = [1, 2, 1, 0, -1, -2, -1, 0];
  const DY = [-1, 0, 1, 2, 1, 0, -1, -2];
  const visited = new Uint8Array(mw * mh);
  let nextId = 1;
  function wX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (visited[i]) continue;
      if (tileData[i].terrain === 10) { visited[i] = 1; tileData[i].bodyId = 0; continue; }
      const bodyId = nextId < 63 ? nextId++ : 62;
      const queue = [{ x, y }];
      visited[i] = 1;
      while (queue.length > 0) {
        const { x: cx, y: cy } = queue.shift();
        tileData[cy * mw + cx].bodyId = bodyId;
        for (let d = 0; d < 8; d++) {
          let nx = cx + DX[d];
          const ny = cy + DY[d];
          if (ny < 0 || ny >= mh) continue;
          nx = wX(nx);
          if (nx < 0 || nx >= mw) continue;
          const ni = ny * mw + nx;
          if (visited[ni] || tileData[ni].terrain === 10) continue;
          visited[ni] = 1;
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
}

function calculateFertility(tileData, mw, mh, wraps) {
  const BASE_YIELD = [
    [0, 1], [1, 1], [2, 0], [1, 2], [1, 0],
    [0, 1], [1, 0], [0, 0], [1, 0], [1, 0], [1, 0],
  ];
  function wX(x) { return wraps ? ((x % mw) + mw) % mw : x; }
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (tileData[i].terrain === 10) { tileData[i].fertility = 0; continue; }
      let score = 0;
      for (let r = 0; r < CITY_RADIUS_DOUBLED.length; r++) {
        const [dx, dy] = CITY_RADIUS_DOUBLED[r];
        const gy = y + dy;
        if (gy < 0 || gy >= mh) continue;
        const gx = wX(x + dx);
        if (gx < 0 || gx >= mw) continue;
        const tile = tileData[gy * mw + gx];
        const [food, shields] = BASE_YIELD[tile.terrain] || [0, 0];
        let tileScore = food * 4 + shields * 2;
        if (tile.river) tileScore += 2;
        if (r === 20) tileScore *= tileData[i].river ? 6 : 4;
        else if (r < 8) tileScore *= 2;
        score += tileScore;
      }
      tileData[i].fertility = Math.max(1, Math.min(15, Math.floor((score - 120) / 8)));
    }
  }
}

function placeGoodyHuts(tileData) {
  for (const t of tileData) {
    if (t.terrain !== 10 && t.terrain !== 7 && t.terrain !== 5) {
      if (Math.random() < 0.02) t.goodyHut = true;
    }
  }
}
