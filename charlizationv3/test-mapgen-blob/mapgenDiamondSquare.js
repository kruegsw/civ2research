// ═══════════════════════════════════════════════════════════════════
// mapgenDiamondSquare.js — Diamond-Square fractal heightmap map gen
//
// Pipeline:
//   1. Diamond-square fractal heightmap for elevation
//   2. Diamond-square fractal heightmap for moisture (different seed)
//   3. Sea level threshold from landmass setting
//   4. Bridge fill (diagonal ocean gaps)
//   5. Latitude + elevation + moisture → terrain type
//   6. River generation via gradient descent from peaks
//   7. Polar caps + tundra scatter
//   8. Body ID assignment + fertility + goody huts
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

// ═══════════════════════════════════════════════════════════════════
// Diamond-Square heightmap generation
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate a (2^n + 1) x (2^n + 1) heightmap using the diamond-square algorithm.
 *
 * @param {number} size  — must be 2^n + 1
 * @param {MsvcRng} rng  — seeded PRNG
 * @param {number} roughness — controls how quickly displacement shrinks (0.5–1.0)
 * @returns {Float64Array} flat heightmap of size * size values in [0, 1]
 */
function diamondSquare(size, rng, roughness) {
  const grid = new Float64Array(size * size);
  const last = size - 1;

  // Initialize four corners
  grid[0]                     = rng.random();
  grid[last]                  = rng.random();
  grid[last * size]           = rng.random();
  grid[last * size + last]    = rng.random();

  let stepSize = last;
  let scale = 1.0;

  while (stepSize > 1) {
    const half = stepSize >> 1;

    // Diamond step: center of each square
    for (let y = half; y < size; y += stepSize) {
      for (let x = half; x < size; x += stepSize) {
        const tl = grid[(y - half) * size + (x - half)];
        const tr = grid[(y - half) * size + (x + half)];
        const bl = grid[(y + half) * size + (x - half)];
        const br = grid[(y + half) * size + (x + half)];
        const avg = (tl + tr + bl + br) / 4;
        const displacement = (rng.random() - 0.5) * scale;
        grid[y * size + x] = avg + displacement;
      }
    }

    // Square step: center of each diamond
    for (let y = 0; y < size; y += half) {
      // Offset x start for alternating rows
      const xStart = ((y / half) & 1) === 0 ? half : 0;
      for (let x = xStart; x < size; x += stepSize) {
        let sum = 0, count = 0;

        if (y - half >= 0)     { sum += grid[(y - half) * size + x]; count++; }
        if (y + half < size)   { sum += grid[(y + half) * size + x]; count++; }
        if (x - half >= 0)     { sum += grid[y * size + (x - half)]; count++; }
        if (x + half < size)   { sum += grid[y * size + (x + half)]; count++; }

        const avg = sum / count;
        const displacement = (rng.random() - 0.5) * scale;
        grid[y * size + x] = avg + displacement;
      }
    }

    scale *= Math.pow(2, -roughness);
    stepSize = half;
  }

  // Normalize to [0, 1]
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] < min) min = grid[i];
    if (grid[i] > max) max = grid[i];
  }
  const range = max - min || 1;
  for (let i = 0; i < grid.length; i++) {
    grid[i] = (grid[i] - min) / range;
  }

  return grid;
}

/**
 * Bilinear interpolation: resample a (srcSize x srcSize) heightmap
 * to (dstW x dstH).
 */
function resampleBilinear(src, srcSize, dstW, dstH) {
  const dst = new Float64Array(dstW * dstH);
  const xRatio = (srcSize - 1) / (dstW - 1 || 1);
  const yRatio = (srcSize - 1) / (dstH - 1 || 1);

  for (let dy = 0; dy < dstH; dy++) {
    for (let dx = 0; dx < dstW; dx++) {
      const sx = dx * xRatio;
      const sy = dy * yRatio;
      const x0 = Math.floor(sx);
      const y0 = Math.floor(sy);
      const x1 = Math.min(x0 + 1, srcSize - 1);
      const y1 = Math.min(y0 + 1, srcSize - 1);
      const fx = sx - x0;
      const fy = sy - y0;

      const tl = src[y0 * srcSize + x0];
      const tr = src[y0 * srcSize + x1];
      const bl = src[y1 * srcSize + x0];
      const br = src[y1 * srcSize + x1];

      dst[dy * dstW + dx] = tl * (1 - fx) * (1 - fy)
                           + tr * fx * (1 - fy)
                           + bl * (1 - fx) * fy
                           + br * fx * fy;
    }
  }
  return dst;
}

// ═══════════════════════════════════════════════════════════════════
// Main generator
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate a Civ2-compatible map using the diamond-square fractal
 * heightmap algorithm.
 *
 * @param {object} settings
 * @param {number} [settings.width=50]        — map width (mw)
 * @param {number} [settings.height=80]       — map height (mh)
 * @param {number} [settings.seed]            — PRNG seed (random if omitted)
 * @param {number} [settings.mapShape=0]      — 0=wrapping, 1=flat
 * @param {number} [settings.landmass=1]      — 0=small, 1=normal, 2=large
 * @param {number} [settings.temperature=0]   — -1=cool, 0=temperate, 1=warm
 * @param {number} [settings.climate=0]       — -1=arid, 0=normal, 1=wet
 * @param {number} [settings.age=1]           — 0=young, 1=normal, 2=old
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMapDiamondSquare(settings = {}) {
  const mw = settings.width || 50;
  const mh = settings.height || 80;
  const mapSeed = settings.seed ?? Math.floor(Math.random() * 65536);
  const rng = new MsvcRng(mapSeed);
  const mapShape = settings.mapShape ?? 0;
  const wraps = mapShape === 0;

  const landmass = settings.landmass ?? 1;
  let temperature = settings.temperature ?? 0;
  let climate = settings.climate ?? 0;
  const age = settings.age ?? 1;
  const continents = settings.continents ?? 0;  // -1=islands, 0=small, 1=large

  if (wraps) { temperature *= 2; climate *= 2; }

  // ── Coordinate helpers ──
  function wrapX(x) { return wraps ? ((x % mw) + mw) % mw : x; }
  function inBounds(x, y) {
    if (y < 0 || y >= mh) return false;
    return wraps || (x >= 0 && x < mw);
  }
  function snap(x, y) { return (x & ~1) | (y & 1); }
  function idx(x, y) { return y * mw + snap(wrapX(x), y); }

  // Working arrays — flat terrain + river marker
  const tiles = new Array(mw * mh).fill(T_OCEAN);
  const landCount = new Uint8Array(mw * mh);

  function getTer(x, y) {
    if (!inBounds(x, y)) return T_OCEAN;
    return tiles[idx(x, y)];
  }
  function setTer(x, y, t) {
    if (!inBounds(x, y)) return;
    tiles[idx(x, y)] = t;
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 1: Generate elevation heightmap via diamond-square
  // ═══════════════════════════════════════════════════════════

  // Pick power-of-two grid that covers the map
  const maxDim = Math.max(mw, mh);
  let n = 1;
  while ((1 << n) + 1 < maxDim) n++;
  const gridSize = (1 << n) + 1;

  // Roughness: young maps (age=0) are rougher/more mountainous,
  // old maps (age=2) are smoother/more eroded
  const roughness = [0.55, 0.65, 0.80][age];

  const elevRaw = diamondSquare(gridSize, rng, roughness);
  const elevation = resampleBilinear(elevRaw, gridSize, mw, mh);

  // Continent shaping: smooth for large masses, roughen for islands
  // Burn a diamond-square for RNG consistency across all settings
  diamondSquare(5, rng, 0.5);

  if (continents === 1) {
    // Smooth elevation to merge land into fewer large masses
    for (let pass = 0; pass < 3; pass++) {
      const smooth = new Float64Array(mw * mh);
      for (let y = 0; y < mh; y++) {
        for (let x = 0; x < mw; x++) {
          let sum = elevation[y * mw + x] * 2, count = 2;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const ny = y + dy;
              let nx = x + dx;
              if (ny < 0 || ny >= mh) continue;
              nx = wraps ? ((nx % mw) + mw) % mw : nx;
              if (!wraps && (nx < 0 || nx >= mw)) continue;
              sum += elevation[ny * mw + nx]; count++;
            }
          }
          smooth[y * mw + x] = sum / count;
        }
      }
      for (let i = 0; i < mw * mh; i++) elevation[i] = smooth[i];
    }
  } else if (continents === -1) {
    // Add extra noise to fragment land into more separate patches
    const fragRng = new MsvcRng(rng.next());
    for (let i = 0; i < mw * mh; i++) {
      elevation[i] += (fragRng.random() - 0.5) * 0.15;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 2: Generate moisture heightmap (separate fractal)
  // ═══════════════════════════════════════════════════════════

  const moistRaw = diamondSquare(gridSize, rng, 0.70);
  const moisture = resampleBilinear(moistRaw, gridSize, mw, mh);

  // Apply climate scaling: arid → less moisture, wet → more
  const climateScale = [0.6, 1.0, 1.4][climate + 1] ?? 1.0;
  for (let i = 0; i < moisture.length; i++) {
    moisture[i] = Math.min(1, moisture[i] * climateScale);
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 3: Apply sea level and classify land vs ocean
  // ═══════════════════════════════════════════════════════════

  // Sea level threshold: higher = less land
  // Islands: raise sea level (more ocean → fragmented), Large: lower (more land → connected)
  const seaLevel = [0.62, 0.52, 0.42][landmass] + [0.10, 0, -0.10][continents + 1];

  // Latitude penalty: push poles underwater to prevent polar land blobs
  for (let y = 0; y < mh; y++) {
    const latFrac = Math.abs(y - mh / 2) / (mh / 2); // 0 at equator, 1 at poles
    const polarPenalty = latFrac > 0.85 ? (latFrac - 0.85) * 2.0 : 0;
    for (let x = 0; x < mw; x++) {
      elevation[y * mw + x] -= polarPenalty;
    }
  }

  // Mark land tiles
  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      if (elevation[i] > seaLevel) {
        landCount[i] = 1;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 4: Elevation classification for land tiles
  // ═══════════════════════════════════════════════════════════

  // Normalize land elevation above sea level to [0, 1]
  let maxLandElev = 0;
  for (let i = 0; i < mw * mh; i++) {
    if (landCount[i]) {
      const above = elevation[i] - seaLevel;
      if (above > maxLandElev) maxLandElev = above;
    }
  }
  if (maxLandElev < 0.001) maxLandElev = 0.001;

  for (let y = 0; y < mh; y++) {
    for (let x = (y & 1); x < mw; x += 2) {
      const i = y * mw + x;
      if (!landCount[i]) continue;
      const normElev = (elevation[i] - seaLevel) / maxLandElev;
      // Add a small noise jitter for naturalistic boundaries
      const jitter = (rng.random() - 0.5) * 0.08;
      const adj = Math.max(0, Math.min(1, normElev + jitter));

      if (adj >= 0.85)      landCount[i] = 4;  // peaks (inland lakes later)
      else if (adj >= 0.65) landCount[i] = 3;  // mountains
      else if (adj >= 0.40) landCount[i] = 2;  // hills
      else                  landCount[i] = 1;  // lowlands
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PHASE 5: Bridge fill (from mapgen.js — fix diagonal gaps)
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
  // PHASES 6–11: Civ2 terrain pipeline (from mapgen.js phases 3–8)
  // ═══════════════════════════════════════════════════════════════

  // ── Phase 6: Latitude-based terrain assignment ──
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

  // ── Phase 7: Elevation/moisture pass (W→E, E→W) ──
  for (let y = 0; y < mh; y++) {
    // W→E pass for row y
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

    // E→W pass for row (mh-1-y)
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

  // ── Phase 8: Elevation iterations (terrain promotion) ──
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

  // ── Phase 9: Smoothing pass (neighbor voting) ──
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

  // ── Phase 10: River generation ──
  // Trace gradient descent from high-elevation land tiles down to ocean.
  // Uses the original elevation heightmap for gradient direction.
  const riverTarget = landmass * 2 + climate * 2 + 12;
  let riversPlaced = 0;
  const riverMap = new Uint8Array(mw * mh);

  for (let attempt = 0; attempt < 1024 && riversPlaced < riverTarget; attempt++) {
    const snapshot = new Uint8Array(mw * mh);
    for (let i = 0; i < mw * mh; i++) snapshot[i] = tiles[i];

    // Pick a start tile — prefer higher elevation
    let sx, sy;
    let startAttempts = 0;
    do {
      sy = rng.nextInt(mh);
      sx = (sy & 1) + rng.nextInt(Math.max(1, Math.floor(mw / 2))) * 2;
      startAttempts++;
    } while (
      startAttempts < 100 &&
      (tiles[idx(sx, sy)] === T_MOUNTAINS ||
       tiles[idx(sx, sy)] === T_OCEAN ||
       elevation[sy * mw + snap(wrapX(sx), sy)] < seaLevel + (maxLandElev * 0.25))
    );

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

      // Check if we're adjacent to ocean
      for (let rd = 0; rd < 4 && !reachedWater; rd++) {
        const nx = wrapX(rx + RIVER_DX[rd]);
        const ny = ry + RIVER_DY[rd];
        if (inBounds(nx, ny) && (tiles[idx(nx, ny)] & 0x0F) === T_OCEAN) {
          reachedWater = true;
        }
      }

      // Bias river direction towards lower elevation using the fractal heightmap
      // Try gradient-based direction, but allow random deviation
      if (rng.random() < 0.6) {
        // Find lowest-elevation neighbor among the 4 diagonal directions
        let bestDir = dir, bestElev = Infinity;
        for (let dd = 0; dd < 4; dd++) {
          const nx = wrapX(rx + RIVER_DX[dd]);
          const ny = ry + RIVER_DY[dd];
          if (!inBounds(nx, ny)) continue;
          const ni = ny * mw + snap(wrapX(nx), ny);
          if (elevation[ni] < bestElev) {
            bestElev = elevation[ni];
            bestDir = dd;
          }
        }
        dir = bestDir;
      } else {
        dir = (dir + (rng.next() & 1) - (length & 1)) & 3;
      }

      rx = wrapX(rx + RIVER_DX[dir]);
      ry = ry + RIVER_DY[dir];

      if (!inBounds(rx, ry)) break;
      if (snapshot[idx(rx, ry)] & 0x80) break;
      if (reachedWater) break;
    }

    const minLen = 5 - Math.floor((attempt + 1) / 800);
    if ((reachedWater || (snapshot[idx(rx, ry)] & 0x80)) && length >= minLen) {
      riversPlaced++;
      for (let i = 0; i < mw * mh; i++) {
        if (tiles[i] & 0x80) riverMap[i] = 1;
      }
    } else {
      for (let i = 0; i < mw * mh; i++) tiles[i] = snapshot[i];
    }
  }

  // ── Phase 11: Polar caps + tundra scatter ──
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
  placeGoodyHuts(tileData, mw, mh);

  return { mw, mh, mapShape, mapSeed, tileData };
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

function placeGoodyHuts(tileData, mw, mh) {
  for (let i = 0; i < tileData.length; i++) {
    const t = tileData[i];
    if (t.terrain !== 10 && t.terrain !== 7 && t.terrain !== 5) {
      if (Math.random() < 0.02) t.goodyHut = true;
    }
  }
}
