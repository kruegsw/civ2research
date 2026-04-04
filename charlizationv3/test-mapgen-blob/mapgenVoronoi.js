// =====================================================================
// mapgenVoronoi.js -- Voronoi polygon region-based map generation
//
// Inspired by Amit Patel / Red Blob Games approach:
//   1. Scatter seed points, Lloyd-relax them into even regions
//   2. Assign each tile to nearest seed (Voronoi partition)
//   3. Determine land/water per region via simplex noise + island shaping
//   4. Elevation = BFS distance from coast regions
//   5. Moisture = BFS distance from water (coast = wet, interior = dry)
//   6. Biome via Whittaker-style table (elevation, temperature, moisture)
//   7. Rivers: walk from high-elevation regions downhill to water
//   8. Transfer region properties to tiles
//   9. Post-process: body IDs, fertility, goody huts
// =====================================================================

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from '../engine/defs.js';

// -- Terrain constants --
const T_DESERT = 0, T_PLAINS = 1, T_GRASSLAND = 2, T_FOREST = 3;
const T_HILLS = 4, T_MOUNTAINS = 5, T_TUNDRA = 6, T_GLACIER = 7;
const T_SWAMP = 8, T_JUNGLE = 9, T_OCEAN = 10;

// =====================================================================
// MSVC-compatible LCG PRNG (shared with mapgenBlob.js)
// =====================================================================
class MsvcRng {
  constructor(seed) { this.state = (seed >>> 0) || 1; }
  next() {
    this.state = (Math.imul(this.state, 214013) + 2531011) >>> 0;
    return (this.state >>> 16) & 0x7FFF;
  }
  nextInt(n) { return n <= 1 ? 0 : this.next() % n; }
  random() { return this.next() / 32768; }
}

// =====================================================================
// 2D Simplex noise (self-contained, no external deps)
//
// Based on Stefan Gustavson's implementation.
// Produces values in approximately [-1, 1].
// =====================================================================

const GRAD3 = [
  [1,1],[- 1,1],[1,-1],[-1,-1],
  [1,0],[-1,0],[0,1],[0,-1],
  [1,1],[-1,1],[1,-1],[-1,-1],
];

class SimplexNoise {
  constructor(rng) {
    // Build a permutation table from the RNG
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    // Fisher-Yates shuffle using our seeded RNG
    for (let i = 255; i > 0; i--) {
      const j = rng.nextInt(i + 1);
      const tmp = p[i]; p[i] = p[j]; p[j] = tmp;
    }
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  noise2D(xin, yin) {
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1, j1;
    if (x0 > y0) { i1 = 1; j1 = 0; }
    else          { i1 = 0; j1 = 1; }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;

    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.permMod12[ii     + this.perm[jj]];
    const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]];
    const gi2 = this.permMod12[ii + 1  + this.perm[jj + 1]];

    let n0, n1, n2;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) n0 = 0;
    else { t0 *= t0; n0 = t0 * t0 * (GRAD3[gi0][0] * x0 + GRAD3[gi0][1] * y0); }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) n1 = 0;
    else { t1 *= t1; n1 = t1 * t1 * (GRAD3[gi1][0] * x1 + GRAD3[gi1][1] * y1); }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) n2 = 0;
    else { t2 *= t2; n2 = t2 * t2 * (GRAD3[gi2][0] * x2 + GRAD3[gi2][1] * y2); }

    return 70.0 * (n0 + n1 + n2);
  }

  // Fractal Brownian motion: sum multiple octaves for natural-looking noise
  fbm(x, y, octaves, lacunarity, gain) {
    let sum = 0, amp = 1, freq = 1, max = 0;
    for (let i = 0; i < octaves; i++) {
      sum += amp * this.noise2D(x * freq, y * freq);
      max += amp;
      freq *= lacunarity;
      amp *= gain;
    }
    return sum / max;
  }
}

// =====================================================================
// Main generator
// =====================================================================

/**
 * Generate a map using Voronoi polygon regions (Amit Patel / Red Blob Games style).
 *
 * @param {object} settings
 * @param {number} [settings.width]       - map width  (default 50)
 * @param {number} [settings.height]      - map height (default 80)
 * @param {number} [settings.seed]        - RNG seed
 * @param {number} [settings.mapShape]    - 0=wrapping, 1=flat (default 0)
 * @param {number} [settings.landmass]    - 0=small, 1=normal, 2=large
 * @param {number} [settings.temperature] - -1=cool, 0=temperate, 1=warm
 * @param {number} [settings.climate]     - -1=arid, 0=normal, 1=wet
 * @returns {{ mw, mh, mapShape, mapSeed, tileData }}
 */
export function generateMapVoronoi(settings = {}) {
  const mw = settings.width  || 50;
  const mh = settings.height || 80;
  const mapSeed  = settings.seed ?? Math.floor(Math.random() * 65536);
  const rng      = new MsvcRng(mapSeed);
  const mapShape = settings.mapShape ?? 0;
  const wraps    = mapShape === 0;

  const landmass    = settings.landmass    ?? 1;   // 0/1/2
  const temperature = settings.temperature ?? 0;   // -1/0/1
  const climate     = settings.climate     ?? 0;   // -1/0/1
  const continents  = settings.continents  ?? 0;   // -1=islands, 0=small, 1=large

  // -- Coordinate helpers (Civ2 doubled-X isometric) --
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }
  function snap(x, y) { return (x & ~1) | (y & 1); }
  function inBounds(x, y) {
    if (y < 0 || y >= mh) return false;
    return wraps || (x >= 0 && x < mw);
  }
  function idx(x, y) { return y * mw + snap(wrapX(x), y); }

  // Distance respecting cylindrical wrap
  function tileDist(x1, y1, x2, y2) {
    let dx = Math.abs(x1 - x2);
    if (wraps) dx = Math.min(dx, mw - dx);
    const dy = Math.abs(y1 - y2);
    return Math.sqrt(dx * dx + dy * dy);
  }

  const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
  const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];
  const DIAG_DX = [1, 1, -1, -1];
  const DIAG_DY = [-1, 1, 1, -1];

  const simplex = new SimplexNoise(rng);

  // Total valid tiles (only half the grid positions are valid in Civ2)
  const totalValidTiles = Math.floor(mw * mh / 2);

  // =================================================================
  // PHASE 1: Generate Voronoi seed points + Lloyd relaxation
  // =================================================================

  // Scale region count with map size; aim for ~1 region per 8-12 tiles
  const regionCount = Math.max(2, Math.min(500,
    Math.floor(totalValidTiles / 10)));

  // Generate initial random seed points (in continuous map-space)
  let seeds = [];
  for (let i = 0; i < regionCount; i++) {
    seeds.push({
      x: rng.random() * mw,
      y: rng.random() * mh,
    });
  }

  // =================================================================
  // PHASE 2: Tile-based Voronoi + Lloyd relaxation
  //
  // For each iteration:
  //   a) Assign every valid tile to its nearest seed
  //   b) Compute centroid of each region
  //   c) Move seeds to centroids
  // =================================================================

  // regionOf[i] = which region index owns tile i
  const regionOf = new Int16Array(mw * mh).fill(-1);
  const LLOYD_ITERS = 3;

  for (let iter = 0; iter < LLOYD_ITERS; iter++) {
    // (a) Assign tiles to nearest seed
    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const ti = y * mw + x;
        let bestDist = Infinity, bestR = 0;
        for (let r = 0; r < seeds.length; r++) {
          const d = tileDist(x, y, seeds[r].x, seeds[r].y);
          if (d < bestDist) { bestDist = d; bestR = r; }
        }
        regionOf[ti] = bestR;
      }
    }

    // (b) Compute centroids
    const sumX  = new Float64Array(regionCount);
    const sumY  = new Float64Array(regionCount);
    const count = new Uint32Array(regionCount);

    for (let y = 0; y < mh; y++) {
      for (let x = (y & 1); x < mw; x += 2) {
        const r = regionOf[y * mw + x];
        if (r < 0) continue;
        // For wrapping maps, unwrap x relative to seed to avoid centroid
        // jumping across the seam
        let ux = x;
        if (wraps) {
          const sx = seeds[r].x;
          let dx = x - sx;
          if (dx > mw / 2)  dx -= mw;
          if (dx < -mw / 2) dx += mw;
          ux = sx + dx;
        }
        sumX[r]  += ux;
        sumY[r]  += y;
        count[r] += 1;
      }
    }

    // (c) Move seeds to centroids (keep seeds with no tiles in place)
    for (let r = 0; r < regionCount; r++) {
      if (count[r] === 0) continue;
      let cx = sumX[r] / count[r];
      const cy = sumY[r] / count[r];
      if (wraps) cx = ((cx % mw) + mw) % mw;
      seeds[r] = { x: cx, y: cy };
    }
  }

  // Final assignment after last relaxation
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const ti = y * mw + x;
      let bestDist = Infinity, bestR = 0;
      for (let r = 0; r < seeds.length; r++) {
        const d = tileDist(x, y, seeds[r].x, seeds[r].y);
        if (d < bestDist) { bestDist = d; bestR = r; }
      }
      regionOf[ti] = bestR;
    }
  }

  // Mirror to padding positions so regionOf is defined everywhere
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = snap(x, y);
      if (x !== validX) regionOf[y * mw + x] = regionOf[y * mw + validX];
    }
  }

  // =================================================================
  // Precompute region center (tile centroid) and neighbor adjacency
  // =================================================================

  const rCenterX = new Float64Array(regionCount);
  const rCenterY = new Float64Array(regionCount);
  const rCount   = new Uint32Array(regionCount);

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const r = regionOf[y * mw + x];
      if (r < 0) continue;
      let ux = x;
      if (wraps) {
        let dx = x - seeds[r].x;
        if (dx > mw / 2)  dx -= mw;
        if (dx < -mw / 2) dx += mw;
        ux = seeds[r].x + dx;
      }
      rCenterX[r] += ux;
      rCenterY[r] += y;
      rCount[r]   += 1;
    }
  }
  for (let r = 0; r < regionCount; r++) {
    if (rCount[r] === 0) continue;
    rCenterX[r] /= rCount[r];
    rCenterY[r] /= rCount[r];
    if (wraps) rCenterX[r] = ((rCenterX[r] % mw) + mw) % mw;
  }

  // Region adjacency: two regions are neighbors if any of their tiles
  // are 8-adjacent on the map
  const regionNeighbors = new Array(regionCount);
  for (let r = 0; r < regionCount; r++) regionNeighbors[r] = new Set();

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const r = regionOf[y * mw + x];
      for (let d = 0; d < 8; d++) {
        let nx = x + DIR8_DX[d];
        const ny = y + DIR8_DY[d];
        if (ny < 0 || ny >= mh) continue;
        nx = wrapX(nx);
        if (!wraps && (nx < 0 || nx >= mw)) continue;
        nx = snap(nx, ny);
        const nr = regionOf[ny * mw + nx];
        if (nr >= 0 && nr !== r) regionNeighbors[r].add(nr);
      }
    }
  }

  // =================================================================
  // PHASE 3: Land/water determination per region
  //
  // noise_val = fbm(cx, cy) - distance_from_center * edge_factor
  // Regions with noise_val < threshold are water.
  // =================================================================

  const regionIsLand = new Uint8Array(regionCount);

  // Water threshold varies by landmass setting
  const waterThreshold = [-0.05, -0.15, -0.25][landmass] ?? -0.15;
  // Edge falloff: how aggressively we push edges to water
  const edgeFactor = wraps ? 0.8 : 1.6;
  // Noise frequency scale: higher = more fragmented (islands), lower = larger masses
  const noiseFreq = [0.07, 0.04, 0.02][continents + 1];

  const mapCenterX = mw / 2;
  const mapCenterY = mh / 2;
  const mapRadius  = Math.min(mw, mh) / 2;

  for (let r = 0; r < regionCount; r++) {
    if (rCount[r] === 0) continue;  // empty region, stays water

    const cx = rCenterX[r];
    const cy = rCenterY[r];

    // Noise value (multi-octave for natural shapes)
    const n = simplex.fbm(cx * noiseFreq, cy * noiseFreq, 4, 2.0, 0.5);

    // Distance from center (normalized 0..1)
    let distNorm;
    if (wraps) {
      // Cylindrical: only penalize distance from equator (vertical center)
      // No horizontal penalty since the map wraps
      distNorm = Math.abs(cy - mapCenterY) / (mh / 2);
    } else {
      // Flat: elliptical distance from center
      let dx = (cx - mapCenterX) / (mw / 2);
      let dy = (cy - mapCenterY) / (mh / 2);
      distNorm = Math.sqrt(dx * dx + dy * dy);
    }

    const value = n - distNorm * edgeFactor;
    regionIsLand[r] = value > waterThreshold ? 1 : 0;
  }

  // Force polar rows to water (top/bottom ~8% of map)
  const polarBand = Math.floor(mh * 0.08);
  for (let r = 0; r < regionCount; r++) {
    if (rCount[r] === 0) continue;
    const cy = rCenterY[r];
    if (cy < polarBand || cy > mh - polarBand) {
      regionIsLand[r] = 0;
    }
  }

  // =================================================================
  // PHASE 4: Elevation = BFS distance from nearest coast region
  //
  // Coast region = land region adjacent to at least one water region
  // Interior land gets higher elevation the farther from coast.
  // =================================================================

  const regionElevation = new Float64Array(regionCount);
  {
    const dist = new Int16Array(regionCount).fill(-1);
    const queue = [];

    // Seed BFS from coast regions (land regions touching water)
    for (let r = 0; r < regionCount; r++) {
      if (!regionIsLand[r]) continue;
      let isCoast = false;
      for (const nb of regionNeighbors[r]) {
        if (!regionIsLand[nb]) { isCoast = true; break; }
      }
      if (isCoast) {
        dist[r] = 0;
        queue.push(r);
      }
    }

    // BFS through land regions only
    let head = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      for (const nb of regionNeighbors[cur]) {
        if (!regionIsLand[nb]) continue;
        if (dist[nb] >= 0) continue;
        dist[nb] = dist[cur] + 1;
        queue.push(nb);
      }
    }

    // Normalize elevation to [0, 1]
    let maxDist = 1;
    for (let r = 0; r < regionCount; r++) {
      if (dist[r] > maxDist) maxDist = dist[r];
    }
    for (let r = 0; r < regionCount; r++) {
      if (!regionIsLand[r] || dist[r] < 0) {
        regionElevation[r] = 0;
      } else {
        // Add some noise to break up uniform rings
        const noise = simplex.noise2D(rCenterX[r] * 0.08, rCenterY[r] * 0.08) * 0.15;
        regionElevation[r] = Math.max(0, Math.min(1,
          dist[r] / maxDist + noise));
      }
    }
  }

  // =================================================================
  // PHASE 5: Moisture = BFS distance from water
  //
  // Water regions and coast regions are wet; interior dries out.
  // Climate setting scales the moisture gradient.
  // =================================================================

  const regionMoisture = new Float64Array(regionCount);
  {
    const dist = new Int16Array(regionCount).fill(-1);
    const queue = [];

    // Seed: all water regions + land regions adjacent to water
    for (let r = 0; r < regionCount; r++) {
      if (!regionIsLand[r]) {
        dist[r] = 0;
        queue.push(r);
      } else {
        for (const nb of regionNeighbors[r]) {
          if (!regionIsLand[nb]) {
            dist[r] = 1;
            queue.push(r);
            break;
          }
        }
      }
    }

    let head = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      for (const nb of regionNeighbors[cur]) {
        if (dist[nb] >= 0) continue;
        dist[nb] = dist[cur] + 1;
        queue.push(nb);
      }
    }

    // Normalize and apply climate scaling
    let maxDist = 1;
    for (let r = 0; r < regionCount; r++) {
      if (regionIsLand[r] && dist[r] > maxDist) maxDist = dist[r];
    }

    // Climate shifts: arid = drier overall, wet = more moisture penetration
    const moistureScale = [0.7, 1.0, 1.4][climate + 1];

    for (let r = 0; r < regionCount; r++) {
      if (!regionIsLand[r]) {
        regionMoisture[r] = 1.0;
      } else {
        const raw = 1.0 - (dist[r] / maxDist);
        // Add noise for variety
        const noise = simplex.noise2D(
          rCenterX[r] * 0.06 + 100, rCenterY[r] * 0.06 + 100) * 0.2;
        regionMoisture[r] = Math.max(0, Math.min(1,
          raw * moistureScale + noise));
      }
    }
  }

  // =================================================================
  // PHASE 6: Biome assignment via Whittaker-style table
  //
  // Inputs per region: elevation [0,1], temperature [0,1] from latitude,
  // moisture [0,1]. Output: Civ2 terrain type.
  // =================================================================

  const regionTerrain = new Uint8Array(regionCount).fill(T_OCEAN);

  // Temperature from latitude: equator = hot, poles = cold.
  // temperature setting shifts the gradient.
  function getTemperature(cy) {
    // Normalized distance from equator [0, 1]
    const distFromEquator = Math.abs(cy - mh / 2) / (mh / 2);
    // Base temperature: 1 at equator, 0 at poles
    let t = 1.0 - distFromEquator;
    // Apply temperature setting: warm shifts up, cool shifts down
    t += temperature * 0.15;
    return Math.max(0, Math.min(1, t));
  }

  for (let r = 0; r < regionCount; r++) {
    if (!regionIsLand[r]) {
      regionTerrain[r] = T_OCEAN;
      continue;
    }

    const elev = regionElevation[r];
    const moist = regionMoisture[r];
    const temp = getTemperature(rCenterY[r]);

    // High elevation -> mountains/hills regardless of other factors
    if (elev > 0.75) {
      regionTerrain[r] = T_MOUNTAINS;
    } else if (elev > 0.55) {
      regionTerrain[r] = T_HILLS;
    }
    // Very cold -> glacier/tundra
    else if (temp < 0.15) {
      regionTerrain[r] = T_GLACIER;
    } else if (temp < 0.30) {
      regionTerrain[r] = moist > 0.4 ? T_TUNDRA : T_TUNDRA;
    }
    // Cold-temperate
    else if (temp < 0.45) {
      if (moist > 0.6) regionTerrain[r] = T_FOREST;
      else if (moist > 0.3) regionTerrain[r] = T_PLAINS;
      else regionTerrain[r] = T_TUNDRA;
    }
    // Temperate
    else if (temp < 0.65) {
      if (moist > 0.7) regionTerrain[r] = T_FOREST;
      else if (moist > 0.45) regionTerrain[r] = T_GRASSLAND;
      else if (moist > 0.2) regionTerrain[r] = T_PLAINS;
      else regionTerrain[r] = T_DESERT;
    }
    // Warm
    else if (temp < 0.80) {
      if (moist > 0.7) regionTerrain[r] = T_SWAMP;
      else if (moist > 0.5) regionTerrain[r] = T_GRASSLAND;
      else if (moist > 0.25) regionTerrain[r] = T_PLAINS;
      else regionTerrain[r] = T_DESERT;
    }
    // Hot (tropical)
    else {
      if (moist > 0.7) regionTerrain[r] = T_JUNGLE;
      else if (moist > 0.5) regionTerrain[r] = T_SWAMP;
      else if (moist > 0.3) regionTerrain[r] = T_GRASSLAND;
      else if (moist > 0.15) regionTerrain[r] = T_PLAINS;
      else regionTerrain[r] = T_DESERT;
    }
  }

  // =================================================================
  // PHASE 7: River generation
  //
  // Start from high-elevation land regions, walk downhill to water.
  // Mark tiles along the path as river.
  // =================================================================

  const regionHasRiver = new Uint8Array(regionCount);
  const riverTarget = landmass * 3 + climate * 2 + 12;
  let riversPlaced = 0;

  // Build sorted list of land regions by elevation (descending)
  const landRegions = [];
  for (let r = 0; r < regionCount; r++) {
    if (regionIsLand[r] && regionElevation[r] > 0.3) {
      landRegions.push(r);
    }
  }
  landRegions.sort((a, b) => regionElevation[b] - regionElevation[a]);

  // Shuffle high-elevation regions to add variety while still preferring high starts
  for (let i = 0; i < Math.min(landRegions.length, 30); i++) {
    const j = i + rng.nextInt(Math.min(20, landRegions.length - i));
    const tmp = landRegions[i]; landRegions[i] = landRegions[j]; landRegions[j] = tmp;
  }

  for (let li = 0; li < landRegions.length && riversPlaced < riverTarget; li++) {
    const startR = landRegions[li];
    if (regionHasRiver[startR]) continue;
    if (regionElevation[startR] < 0.3) continue;

    // Walk downhill
    const path = [startR];
    const visited = new Set([startR]);
    let cur = startR;
    let reachedWater = false;
    let reachedExistingRiver = false;

    for (let step = 0; step < 100; step++) {
      // Find lowest-elevation neighbor
      let bestNb = -1, bestElev = Infinity;
      for (const nb of regionNeighbors[cur]) {
        if (visited.has(nb)) continue;
        const e = regionIsLand[nb] ? regionElevation[nb] : -1;
        if (e < bestElev) { bestElev = e; bestNb = nb; }
      }

      if (bestNb < 0) break; // stuck

      path.push(bestNb);
      visited.add(bestNb);

      if (!regionIsLand[bestNb]) {
        reachedWater = true;
        break;
      }
      if (regionHasRiver[bestNb]) {
        reachedExistingRiver = true;
        break;
      }
      cur = bestNb;
    }

    // Only keep rivers that reach water or join an existing river, and
    // have at least 3 land region segments
    const landSegments = path.filter(r => regionIsLand[r]).length;
    if ((reachedWater || reachedExistingRiver) && landSegments >= 3) {
      for (const r of path) {
        if (regionIsLand[r]) regionHasRiver[r] = 1;
      }
      riversPlaced++;
    }
  }

  // =================================================================
  // PHASE 8: Transfer region properties to tiles
  // =================================================================

  const tiles = new Array(mw * mh).fill(T_OCEAN);
  const riverMap = new Uint8Array(mw * mh);

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const ti = y * mw + x;
      const r = regionOf[ti];
      if (r < 0) {
        tiles[ti] = T_OCEAN;
        continue;
      }

      let terrain = regionTerrain[r];

      // Add per-tile variation within regions for natural feel
      const elev = regionElevation[r];
      const tileNoise = simplex.noise2D(x * 0.15, y * 0.15) * 0.12;
      const localElev = elev + tileNoise;

      // Promote some tiles at region borders to hills/mountains for
      // more granular elevation transitions
      if (terrain !== T_OCEAN && terrain !== T_MOUNTAINS && terrain !== T_HILLS) {
        if (localElev > 0.78)      terrain = T_MOUNTAINS;
        else if (localElev > 0.58) terrain = T_HILLS;
      }
      // Demote some mountain tiles at low local elevation
      if (terrain === T_MOUNTAINS && localElev < 0.50) terrain = T_HILLS;
      if (terrain === T_HILLS && localElev < 0.30)     terrain = T_FOREST;

      tiles[ti] = terrain;

      // River: mark tiles in river regions (but not ocean, glacier, mountains)
      if (regionHasRiver[r] && terrain !== T_OCEAN && terrain !== T_GLACIER &&
          terrain !== T_MOUNTAINS) {
        // River tiles convert some terrains (like Civ2 mapgen)
        if (terrain === T_DESERT) tiles[ti] = T_GRASSLAND;
        else if (terrain === T_TUNDRA) tiles[ti] = T_PLAINS;
        riverMap[ti] = 1;
      }
    }
  }

  // =================================================================
  // PHASE 9: Bridge fill (prevent diagonal-only land connections)
  //
  // Identical to mapgenBlob.js phase 5.
  // =================================================================
  {
    let y = 1;
    while (y < mh - 2) {
      let x = y & 1;
      while (x < mw - 2) {
        let mask = 0;
        if (tiles[idx(x, y)] !== T_OCEAN) mask |= 1;
        if (tiles[idx(x + 1, y + 1)] !== T_OCEAN) mask |= 2;
        if (tiles[idx(x + 1, y - 1)] !== T_OCEAN) mask |= 4;
        if (tiles[idx(x + 2, y)] !== T_OCEAN) mask |= 8;
        if (mask === 6 || mask === 9) {
          // Fill all four corners to land
          if (tiles[idx(x + 1, y + 1)] === T_OCEAN) tiles[idx(x + 1, y + 1)] = T_GRASSLAND;
          if (tiles[idx(x + 1, y - 1)] === T_OCEAN) tiles[idx(x + 1, y - 1)] = T_GRASSLAND;
          if (tiles[idx(x + 2, y)] === T_OCEAN) tiles[idx(x + 2, y)] = T_GRASSLAND;
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

  // =================================================================
  // PHASE 10: Polar caps (Civ2-style)
  //
  // Glacier at row 0 and mh-1, scattered tundra on rows 0-1 and mh-2/mh-1.
  // =================================================================
  for (let x = 0; x < mw; x += 2) {
    tiles[0 * mw + x] = T_GLACIER;
    tiles[(mh - 1) * mw + x + 1] = T_GLACIER;
  }
  {
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
  }

  // =================================================================
  // PHASE 11: Smoothing pass
  //
  // Light neighbor-voting to reduce jarring single-tile biome patches.
  // =================================================================
  {
    const smoothIters = totalValidTiles * 2;
    for (let iter = 0; iter < smoothIters; iter++) {
      const y = rng.nextInt(mh);
      const x = snap(rng.nextInt(mw), y);
      const ti = y * mw + x;
      const t = tiles[ti];
      if (t === T_OCEAN || t === T_GLACIER) continue;

      // Count neighbor terrains
      const votes = new Int8Array(11);
      let total = 0;
      for (let d = 0; d < 8; d++) {
        let nx = x + DIR8_DX[d];
        const ny = y + DIR8_DY[d];
        if (!inBounds(nx, ny)) continue;
        nx = wrapX(nx);
        nx = snap(nx, ny);
        const nt = tiles[ny * mw + nx];
        if (nt === T_OCEAN) continue;
        votes[nt]++;
        total++;
      }

      if (total < 4) continue; // border tile, skip

      // If majority of neighbors agree on a different terrain, adopt it
      let bestVote = 0, bestTer = t;
      for (let k = 0; k < 11; k++) {
        if (votes[k] > bestVote) { bestVote = votes[k]; bestTer = k; }
      }
      // Only change if strong consensus (>= 4 neighbors agree) and it
      // differs from current terrain
      if (bestVote >= 4 && bestTer !== t) {
        tiles[ti] = bestTer;
      }
    }
  }

  // =================================================================
  // Finalize: build tileData objects
  // =================================================================

  const tileData = new Array(mw * mh);
  for (let i = 0; i < mw * mh; i++) {
    const terrain = tiles[i] > 10 ? T_OCEAN : tiles[i];
    tileData[i] = {
      terrain,
      river: riverMap[i] === 1 && terrain !== T_OCEAN,
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

  // Mirror valid tiles to padding positions
  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const validX = snap(x, y);
      if (x !== validX) {
        tileData[y * mw + x] = { ...tileData[y * mw + validX] };
      }
    }
  }

  assignBodyIds(tileData, mw, mh, wraps);
  calculateFertility(tileData, mw, mh, wraps);
  placeGoodyHuts(tileData, mw, mh);

  return { mw, mh, mapShape, mapSeed, tileData };
}

// =====================================================================
// Shared post-processing (identical to mapgenBlob.js)
// =====================================================================

function assignBodyIds(tileData, mw, mh, wraps) {
  const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
  const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];
  const visited = new Uint8Array(mw * mh);
  let nextId = 1;
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (visited[i]) continue;
      if (tileData[i].terrain === 10) { visited[i] = 1; tileData[i].bodyId = 0; continue; }
      const bodyId = nextId < 63 ? nextId++ : 62;
      const queue = [{ x, y }];
      visited[y * mw + x] = 1;
      while (queue.length > 0) {
        const { x: cx, y: cy } = queue.shift();
        tileData[cy * mw + cx].bodyId = bodyId;
        for (let d = 0; d < 8; d++) {
          let nx = cx + DIR8_DX[d];
          const ny = cy + DIR8_DY[d];
          if (ny < 0 || ny >= mh) continue;
          nx = wrapX(nx);
          if (nx < 0 || nx >= mw) continue;
          const ni = ny * mw + nx;
          if (visited[ni]) continue;
          if (tileData[ni].terrain === 10) continue;
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
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const i = y * mw + x;
      if (tileData[i].terrain === 10) { tileData[i].fertility = 0; continue; }
      let score = 0;
      for (let r = 0; r < CITY_RADIUS_DOUBLED.length; r++) {
        const [dx, dy] = CITY_RADIUS_DOUBLED[r];
        const gy = y + dy;
        if (gy < 0 || gy >= mh) continue;
        const gx = wrapX(x + dx);
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

function placeGoodyHuts(tileData, mw, mh) {
  for (let i = 0; i < tileData.length; i++) {
    const t = tileData[i];
    if (t.terrain !== 10 && t.terrain !== 7 && t.terrain !== 5) {
      if (Math.random() < 0.02) t.goodyHut = true;
    }
  }
}
