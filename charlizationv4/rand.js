// ═══════════════════════════════════════════════════════════════════
// rand.js — MSVC-compatible seeded PRNG
//
// Binary uses MSVC's rand(): seed = seed * 214013 + 2531011
// Returns (seed >> 16) & 0x7FFF (range 0-32767)
// ═══════════════════════════════════════════════════════════════════

let _seed = 0;

export function srand(seed) {
  _seed = seed >>> 0;
}

export function rand() {
  _seed = (Math.imul(_seed, 214013) + 2531011) >>> 0;
  return (_seed >>> 16) & 0x7FFF;
}

export function getSeed() {
  return _seed;
}
