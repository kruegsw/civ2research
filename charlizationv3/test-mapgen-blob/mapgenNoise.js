// ═══════════════════════════════════════════════════════════════════
// mapgenNoise.js — Simplex noise + Whittaker biome map generation
//
// Pipeline:
//   1. Simplex noise (2D, inline implementation, no dependencies)
//   2. Fractal noise for elevation (5 octaves, persistence 0.5)
//   3. Fractal noise for moisture (5 octaves, persistence 0.5)
//   4. Latitude-based temperature gradient
//   5. Whittaker-style biome table: (elevation, temperature, moisture) -> terrain
//   6. Elevation thresholds: sea level (ocean), hills, mountains
//   7. River generation: gradient descent from high points to ocean
//   8. Polar caps + tundra scatter
//   9. Body ID assignment + fertility + goody huts
//
// Wrapping maps (mapShape=0): noise tiles seamlessly in X via
// cylindrical projection (cos/sin mapping of X coordinate).
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP, CITY_RADIUS_DOUBLED } from '../engine/defs.js';

// ── MSVC-compatible LCG PRNG (from mapgen.js) ──
class MsvcRng {
  constructor(seed) { this.state = (seed >>> 0) || 1; }
  next() {
    this.state = (Math.imul(this.state, 214013) + 2531011) >>> 0;
    return (this.state >>> 16) & 0x7FFF;
  }
  nextInt(n) { return n <= 1 ? 0 : this.next() % n; }
  random() { return this.next() / 32768; }
}

// ═══════════════════════════════════════════════════════════════════
// Simplex Noise 2D — self-contained implementation
//
// Based on the standard simplex noise algorithm by Ken Perlin.
// Permutation table seeded from our PRNG for reproducibility.
// ═══════════════════════════════════════════════════════════════════

class SimplexNoise {
  constructor(rng) {
    // Build a seeded permutation table
    const perm = new Uint8Array(256);
    for (let i = 0; i < 256; i++) perm[i] = i;
    // Fisher-Yates shuffle using our seeded RNG
    for (let i = 255; i > 0; i--) {
      const j = rng.nextInt(i + 1);
      const tmp = perm[i];
      perm[i] = perm[j];
      perm[j] = tmp;
    }
    // Double the table to avoid modulo in lookups
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = perm[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  // 12 gradient vectors for 2D simplex noise
  static GRAD3 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [-1, 1], [1, -1], [-1, -1],
  ];

  noise2D(xin, yin) {
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0); // skewing factor
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;  // unskewing factor
    const { perm, permMod12 } = this;
    const GRAD3 = SimplexNoise.GRAD3;

    // Skew input space to determine which simplex cell we're in
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;

    // Unskew back to (x,y) space
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    // Determine which simplex we're in (upper or lower triangle)
    let i1, j1;
    if (x0 > y0) { i1 = 1; j1 = 0; } // lower triangle
    else          { i1 = 0; j1 = 1; } // upper triangle

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;

    const ii = i & 255;
    const jj = j & 255;

    // Calculate contribution from corner 0
    let n0 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      const gi0 = permMod12[ii + perm[jj]];
      n0 = t0 * t0 * (GRAD3[gi0][0] * x0 + GRAD3[gi0][1] * y0);
    }

    // Calculate contribution from corner 1
    let n1 = 0;
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      const gi1 = permMod12[ii + i1 + perm[jj + j1]];
      n1 = t1 * t1 * (GRAD3[gi1][0] * x1 + GRAD3[gi1][1] * y1);
    }

    // Calculate contribution from corner 2
    let n2 = 0;
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      const gi2 = permMod12[ii + 1 + perm[jj + 1]];
      n2 = t2 * t2 * (GRAD3[gi2][0] * x2 + GRAD3[gi2][1] * y2);
    }

    // Scale to [-1, 1]
    return 70.0 * (n0 + n1 + n2);
  }
}

// ── Terrain constants ──
const T_DESERT = 0, T_PLAINS = 1, T_GRASSLAND = 2, T_FOREST = 3;
const T_HILLS = 4, T_MOUNTAINS = 5, T_TUNDRA = 6, T_GLACIER = 7;
const T_SWAMP = 8, T_JUNGLE = 9, T_OCEAN = 10;

// ── Direction tables ──
const DIR8_DX = [1, 2, 1, 0, -1, -2, -1, 0];
const DIR8_DY = [-1, 0, 1, 2, 1, 0, -1, -2];
const DIAG_DX = [1, 1, -1, -1];
const DIAG_DY = [-1, 1, 1, -1];

/**
 * Generate fractal (fBm) noise by layering multiple octaves of simplex noise.
 *
 * @param {SimplexNoise} simplex  — noise generator
 * @param {number} x              — x coordinate
 * @param {number} y              — y coordinate
 * @param {number} octaves        — number of octaves (default 5)
 * @param {number} persistence    — amplitude decay per octave (default 0.5)
 * @param {number} lacunarity     — frequency growth per octave (default 2.0)
 * @param {number} scale          — base frequency scaling
 * @returns {number} noise value in approximately [-1, 1]
 */
function fractalNoise(simplex, x, y, octaves = 5, persistence = 0.5, lacunarity = 2.0, scale = 1.0) {
  let value = 0;
  let amplitude = 1.0;
  let frequency = scale;
  let maxAmp = 0;

  for (let o = 0; o < octaves; o++) {
    value += amplitude * simplex.noise2D(x * frequency, y * frequency);
    maxAmp += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  return value / maxAmp; // normalize to [-1, 1]
}

/**
 * Sample noise in a way that tiles seamlessly in X for wrapping maps.
 * Maps X to a circle in 3D space (cylinder projection), but since our
 * simplex is 2D, we use a standard trick: sample two 2D noise fields
 * and blend them based on position to create seamless wrapping.
 *
 * Actually, the simplest correct approach for 2D simplex: duplicate the
 * noise domain so that x=0 and x=mw produce the same value. We do this
 * by mapping x to a circle: nx = cos(2*pi*x/mw), ny = sin(2*pi*x/mw),
 * then sampling 2D noise at (nx, y) and (ny, y+offset) and combining.
 *
 * Better approach: use 2D noise with cylindrical coordinates mapped to
 * a 2D plane. We sample at two points derived from the angle and blend.
 */
function sampleWrappingNoise(simplex, gx, gy, mw, scale, octaves, persistence, offsetX, offsetY) {
  // Map gx to angle around cylinder
  const angle = (2 * Math.PI * gx) / mw;
  const r = mw / (2 * Math.PI); // radius to keep spatial frequency consistent
  const nx = r * Math.cos(angle) + offsetX;
  const ny = r * Math.sin(angle) + offsetY;
  // gy is the "height" of the cylinder
  return fractalNoise(simplex, nx, ny + gy * scale, octaves, persistence, 2.0, 1.0);
}

function sampleFlatNoise(simplex, gx, gy, scale, octaves, persistence, offsetX, offsetY) {
  return fractalNoise(simplex, gx * scale + offsetX, gy * scale + offsetY, octaves, persistence);
}

/**
 * Generate a map using Simplex noise + Whittaker biome classification.
 *
 * @param {object} settings
 * @param {number} [settings.width]       — map width in tiles (default 50)
 * @param {number} [settings.height]      — map height in tiles (default 80)
 * @param {number} [settings.seed]        — PRNG seed (default random)
 * @param {number} [settings.mapShape]    — 0=wrapping, 1=flat (default 0)
 * @param {number} [settings.landmass]    — 0=small, 1=normal, 2=large (default 1)
 * @param {number} [settings.temperature] — -1=cool, 0=temperate, 1=warm (default 0)
 * @param {number} [settings.climate]     — -1=arid, 0=normal, 1=wet (default 0)
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMapNoise(settings = {}) {
  const mw = settings.width || 50;
  const mh = settings.height || 80;
  const mapSeed = settings.seed ?? Math.floor(Math.random() * 65536);
  const rng = new MsvcRng(mapSeed);
  const mapShape = settings.mapShape ?? 0;
  const wraps = mapShape === 0;

  const landmass = settings.landmass ?? 1;     // 0=small, 1=normal, 2=large
  const temperature = settings.temperature ?? 0; // -1=cool, 0=temperate, 1=warm
  const climate = settings.climate ?? 0;         // -1=arid, 0=normal, 1=wet
  const continents = settings.continents ?? 0;   // -1=islands, 0=small, 1=large

  // ── Coordinate helpers ──
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }
  function inBounds(x, y) {
    if (y < 0 || y >= mh) return false;
    return wraps || (x >= 0 && x < mw);
  }
  function snap(x, y) { return (x & ~1) | (y & 1); }
  function idx(x, y) { return y * mw + snap(wrapX(x), y); }

  // ═══════════════════════════════════════════════════════════
  // Create noise generators with different seeds
  // ═══════════════════════════════════════════════════════════

  // Burn some RNG values to create distinct seeds for each noise layer
  const elevSeed = rng.next();
  const moistSeed = rng.next();
  const detailSeed = rng.next();

  const elevRng = new MsvcRng(elevSeed);
  const moistRng = new MsvcRng(moistSeed);
  const detailRng = new MsvcRng(detailSeed);

  const elevNoise = new SimplexNoise(elevRng);
  const moistNoise = new SimplexNoise(moistRng);
  const detailNoise = new SimplexNoise(detailRng);

  // Random offsets so different seeds produce different terrain even with same permutation
  const elevOffX = rng.next() * 0.1;
  const elevOffY = rng.next() * 0.1;
  const moistOffX = rng.next() * 0.1;
  const moistOffY = rng.next() * 0.1;

  // Burn RNG values for continent mask (reserved for future use)
  rng.next(); rng.next(); rng.next();

  // ═══════════════════════════════════════════════════════════
  // PHASE 1: Generate elevation and moisture noise fields
  // ═══════════════════════════════════════════════════════════

  // Scale factors — larger numbers = more zoomed out = larger features
  // Continents: islands=higher freq (smaller features), large=lower freq (bigger features)
  const elevScale = [0.055, 0.035, 0.018][continents + 1];
  const moistScale = 0.04;

  // Sea level threshold: adjusted by landmass + continents
  // Higher threshold = more ocean = less land
  // Islands: raise threshold (more ocean → fragmented), Large: lower (more land → connected)
  const seaLevelBase = [0.10, -0.02, -0.12][landmass] + [0.06, 0, -0.06][continents + 1];

  // Moisture amplitude: adjusted by climate setting
  const moistAmp = [0.7, 1.0, 1.3][climate + 1]; // arid/normal/wet

  // Raw noise arrays (one per valid tile, but we store for all positions)
  const elevation = new Float32Array(mw * mh);
  const moisture = new Float32Array(mw * mh);

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;

      // Sample elevation noise
      let elev;
      if (wraps) {
        elev = sampleWrappingNoise(elevNoise, x, y, mw, elevScale, 5, 0.5, elevOffX, elevOffY);
      } else {
        elev = sampleFlatNoise(elevNoise, x, y, elevScale, 5, 0.5, elevOffX, elevOffY);
      }

      // Add some finer detail
      let detail;
      if (wraps) {
        detail = sampleWrappingNoise(detailNoise, x, y, mw, elevScale * 3, 3, 0.4, elevOffX + 500, elevOffY + 500);
      } else {
        detail = sampleFlatNoise(detailNoise, x, y, elevScale * 3, 3, 0.4, elevOffX + 500, elevOffY + 500);
      }
      elev = elev * 0.8 + detail * 0.2;

      // Push edges down for non-wrapping maps (creates ocean borders)
      if (!wraps) {
        const edgeX = Math.min(x, mw - 1 - x) / (mw * 0.15);
        const edgeY = Math.min(y, mh - 1 - y) / (mh * 0.15);
        const edgeFade = Math.min(1, Math.min(edgeX, edgeY));
        elev = elev * edgeFade - (1 - edgeFade) * 0.5;
      }

      // Push poles toward ocean/glacier (reduce land at very top/bottom)
      const poleY = Math.min(y, mh - 1 - y) / (mh * 0.12);
      if (poleY < 1) {
        elev -= (1 - poleY) * 0.3;
      }

      elevation[i] = elev;

      // Sample moisture noise
      let moist;
      if (wraps) {
        moist = sampleWrappingNoise(moistNoise, x, y, mw, moistScale, 5, 0.5, moistOffX, moistOffY);
      } else {
        moist = sampleFlatNoise(moistNoise, x, y, moistScale, 5, 0.5, moistOffX, moistOffY);
      }
      moist *= moistAmp;

      moisture[i] = moist;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 2: Assign terrain using Whittaker biome classification
  // ═══════════════════════════════════════════════════════════

  // Elevation thresholds
  const seaLevel = seaLevelBase;
  const hillsLevel = 0.40;
  const mountainsLevel = 0.60;
  const peakLevel = 0.80; // very high mountains (rare)

  // Temperature: derived from latitude + settings
  // temp ranges approximately [0, 1] where 0=cold (poles), 1=hot (equator)
  function getTemperature(y) {
    const halfH = mh / 2;
    const distFromEquator = Math.abs(halfH - y) / halfH; // 0 at equator, 1 at poles
    // Base temperature: hot at equator, cold at poles
    let temp = 1.0 - distFromEquator;
    // Apply temperature setting shift
    temp += temperature * 0.15; // -1=cool shifts down, +1=warm shifts up
    return Math.max(0, Math.min(1, temp));
  }

  const tiles = new Array(mw * mh).fill(T_OCEAN);
  const elevCategory = new Uint8Array(mw * mh); // 0=ocean, 1=lowland, 2=hills, 3=mountains

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      const elev = elevation[i];
      const moist = moisture[i];
      const temp = getTemperature(y);

      // Determine elevation category
      if (elev < seaLevel) {
        tiles[i] = T_OCEAN;
        elevCategory[i] = 0;
        continue;
      }

      // Normalize land elevation to [0, 1] above sea level
      const landElev = (elev - seaLevel) / (1.0 - seaLevel);

      if (landElev >= mountainsLevel) {
        elevCategory[i] = 3;
        if (temp < 0.15) {
          tiles[i] = T_GLACIER; // frozen peaks
        } else {
          tiles[i] = T_MOUNTAINS;
        }
        continue;
      }

      if (landElev >= hillsLevel) {
        elevCategory[i] = 2;
        if (temp < 0.15) {
          tiles[i] = T_TUNDRA;
        } else if (temp < 0.3 && moist > 0.1) {
          tiles[i] = T_FOREST; // forested hills at cooler temps
        } else {
          tiles[i] = T_HILLS;
        }
        continue;
      }

      // Lowlands: use Whittaker-style biome from temperature + moisture
      elevCategory[i] = 1;

      // Whittaker biome classification
      // temp: 0=frigid, 0.2=cold, 0.4=cool, 0.6=warm, 0.8=hot, 1.0=tropical
      // moist: roughly [-1, 1], negative=dry, positive=wet

      if (temp < 0.12) {
        // Polar: glacier or tundra
        tiles[i] = moist > 0.0 ? T_GLACIER : T_TUNDRA;
      } else if (temp < 0.25) {
        // Subpolar: tundra or boreal forest
        if (moist > 0.2) tiles[i] = T_FOREST;
        else if (moist > -0.2) tiles[i] = T_TUNDRA;
        else tiles[i] = T_TUNDRA;
      } else if (temp < 0.42) {
        // Cold temperate: forest, plains, or tundra edges
        if (moist > 0.3) tiles[i] = T_FOREST;
        else if (moist > 0.0) tiles[i] = T_GRASSLAND;
        else if (moist > -0.3) tiles[i] = T_PLAINS;
        else tiles[i] = T_PLAINS;
      } else if (temp < 0.58) {
        // Temperate: forest, grassland, plains, or desert
        if (moist > 0.4) tiles[i] = T_SWAMP;
        else if (moist > 0.15) tiles[i] = T_FOREST;
        else if (moist > -0.1) tiles[i] = T_GRASSLAND;
        else if (moist > -0.35) tiles[i] = T_PLAINS;
        else tiles[i] = T_DESERT;
      } else if (temp < 0.72) {
        // Warm: jungle, swamp, grassland, desert
        if (moist > 0.4) tiles[i] = T_SWAMP;
        else if (moist > 0.15) tiles[i] = T_FOREST;
        else if (moist > -0.05) tiles[i] = T_GRASSLAND;
        else if (moist > -0.30) tiles[i] = T_PLAINS;
        else tiles[i] = T_DESERT;
      } else if (temp < 0.85) {
        // Hot: jungle, swamp, grassland, desert
        if (moist > 0.35) tiles[i] = T_JUNGLE;
        else if (moist > 0.1) tiles[i] = T_SWAMP;
        else if (moist > -0.15) tiles[i] = T_GRASSLAND;
        else if (moist > -0.35) tiles[i] = T_PLAINS;
        else tiles[i] = T_DESERT;
      } else {
        // Tropical: jungle, swamp, or desert
        if (moist > 0.25) tiles[i] = T_JUNGLE;
        else if (moist > 0.0) tiles[i] = T_SWAMP;
        else if (moist > -0.2) tiles[i] = T_GRASSLAND;
        else if (moist > -0.40) tiles[i] = T_PLAINS;
        else tiles[i] = T_DESERT;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 3: Bridge fill (from mapgen.js)
  //
  // Prevents diagonal-only ocean straits that strand land tiles
  // ═══════════════════════════════════════════════════════════

  {
    const isLand = (x, y) => {
      if (!inBounds(x, y)) return false;
      return tiles[idx(x, y)] !== T_OCEAN;
    };

    let y = 1;
    while (y < mh - 2) {
      let x = y & 1;
      while (x < mw - 2) {
        let mask = 0;
        if (isLand(x, y)) mask |= 1;
        if (isLand(x + 1, y + 1)) mask |= 2;
        if (isLand(x + 1, y - 1)) mask |= 4;
        if (isLand(x + 2, y)) mask |= 8;
        if (mask === 6 || mask === 9) {
          // Fill in to connect diagonally adjacent land
          if (!isLand(x + 1, y + 1)) tiles[idx(x + 1, y + 1)] = T_GRASSLAND;
          if (!isLand(x + 1, y - 1)) tiles[idx(x + 1, y - 1)] = T_GRASSLAND;
          if (!isLand(x + 2, y)) tiles[idx(x + 2, y)] = T_GRASSLAND;
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

  // ═══════════════════════════════════════════════════════════
  // PHASE 4: River generation
  //
  // Trace gradient descent from high-elevation land tiles down
  // to the ocean. Rivers follow the steepest downhill path and
  // modify terrain along their course.
  // ═══════════════════════════════════════════════════════════

  const riverTarget = landmass * 2 + climate * 2 + 12;
  let riversPlaced = 0;
  const riverMap = new Uint8Array(mw * mh);

  // Build candidate list: high-elevation tiles for river sources
  const riverCandidates = [];
  for (let y = 2; y < mh - 2; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      if (tiles[i] === T_OCEAN) continue;
      if (elevation[i] > 0.25) {
        riverCandidates.push({ x, y, elev: elevation[i] });
      }
    }
  }
  // Sort by elevation descending — start rivers from highest points
  riverCandidates.sort((a, b) => b.elev - a.elev);

  // Shuffle top portion to add variety (don't always start from the very top)
  const shuffleN = Math.min(riverCandidates.length, 200);
  for (let i = shuffleN - 1; i > 0; i--) {
    const j = rng.nextInt(i + 1);
    const tmp = riverCandidates[i];
    riverCandidates[i] = riverCandidates[j];
    riverCandidates[j] = tmp;
  }

  let candidateIdx = 0;

  for (let attempt = 0; attempt < 1024 && riversPlaced < riverTarget; attempt++) {
    // Pick a starting tile — try candidates first, then random
    let sx, sy;
    if (candidateIdx < riverCandidates.length) {
      sx = riverCandidates[candidateIdx].x;
      sy = riverCandidates[candidateIdx].y;
      candidateIdx++;
    } else {
      sy = rng.nextInt(mh);
      sx = snap(rng.nextInt(mw), sy);
    }

    if (!inBounds(sx, sy)) continue;
    const si = idx(sx, sy);
    if (tiles[si] === T_OCEAN || tiles[si] === T_MOUNTAINS) continue;
    if (riverMap[si]) continue; // already has river

    // Trace downhill
    const snapshot = new Uint8Array(mw * mh);
    for (let i = 0; i < mw * mh; i++) snapshot[i] = tiles[i];

    let rx = sx, ry = sy;
    let length = 0;
    let reachedWater = false;
    const visited = new Set();

    while (true) {
      const ri = idx(rx, ry);
      if (visited.has(ri)) break; // loop detection
      visited.add(ri);

      const t = tiles[ri];
      // Modify terrain under river
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
      riverTer |= 0x80; // mark as river
      tiles[ri] = riverTer;
      length++;

      // Check if adjacent to ocean
      for (let rd = 0; rd < 4 && !reachedWater; rd++) {
        const nx = wrapX(rx + DIAG_DX[rd]);
        const ny = ry + DIAG_DY[rd];
        if (inBounds(nx, ny) && (tiles[idx(nx, ny)] & 0x0F) === T_OCEAN) {
          reachedWater = true;
        }
      }
      if (reachedWater) break;

      // Find steepest downhill neighbor (gradient descent)
      let bestDir = -1;
      let bestElev = elevation[ri];

      for (let d = 0; d < 4; d++) {
        const nx = wrapX(rx + DIAG_DX[d]);
        const ny = ry + DIAG_DY[d];
        if (!inBounds(nx, ny)) continue;
        const ni = idx(nx, ny);
        if (visited.has(ni)) continue;
        const ne = elevation[ni];
        if (ne < bestElev) {
          bestElev = ne;
          bestDir = d;
        }
      }

      // If no downhill, try random direction (river meanders on flat ground)
      if (bestDir < 0) {
        // Randomly pick a non-visited diagonal neighbor
        const shuffled = [0, 1, 2, 3];
        for (let i = 3; i > 0; i--) {
          const j = rng.nextInt(i + 1);
          const tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
        }
        for (const d of shuffled) {
          const nx = wrapX(rx + DIAG_DX[d]);
          const ny = ry + DIAG_DY[d];
          if (!inBounds(nx, ny)) continue;
          const ni = idx(nx, ny);
          if (visited.has(ni)) continue;
          bestDir = d;
          break;
        }
      }

      if (bestDir < 0) break; // stuck

      rx = wrapX(rx + DIAG_DX[bestDir]);
      ry = ry + DIAG_DY[bestDir];
      if (!inBounds(rx, ry)) break;
    }

    const minLen = 5 - Math.floor((attempt + 1) / 800);
    if ((reachedWater || (inBounds(rx, ry) && (snapshot[idx(rx, ry)] & 0x80))) && length >= minLen) {
      riversPlaced++;
      for (let i = 0; i < mw * mh; i++) {
        if (tiles[i] & 0x80) riverMap[i] = 1;
      }
    } else {
      // Revert failed river
      for (let i = 0; i < mw * mh; i++) tiles[i] = snapshot[i];
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 5: Polar caps + tundra scatter
  // ═══════════════════════════════════════════════════════════

  // Unconditional glacier at row 0 and mh-1 (Civ2-style)
  for (let x = 0; x < mw; x += 2) {
    tiles[0 * mw + x] = T_GLACIER;
    tiles[(mh - 1) * mw + x + 1] = T_GLACIER;
  }
  // Tundra scatter on rows 0-1 and mh-2/mh-1
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
  // Finalize: build tileData objects
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

  // Mirror valid tiles to padding positions
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
  placeGoodyHuts(tileData, mw, mh, rng);

  return {
    mw, mh, mapShape, mapSeed, tileData,
  };
}

// ═══════════════════════════════════════════════════════════════
// Shared post-processing (from mapgen.js)
// ═══════════════════════════════════════════════════════════════

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

function placeGoodyHuts(tileData, mw, mh, rng) {
  for (let i = 0; i < tileData.length; i++) {
    const t = tileData[i];
    if (t.terrain !== 10 && t.terrain !== 7 && t.terrain !== 5) {
      if (rng.random() < 0.02) t.goodyHut = true;
    }
  }
}
