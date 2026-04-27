// ═══════════════════════════════════════════════════════════════════
// rng.js — Seeded PRNG for deterministic multiplayer (shared: server + client)
//
// MINSTD LCG matching the Civ2 binary's MSVC rand() implementation.
// All engine code that previously used Math.random() now calls
// state.rng methods to ensure identical results across clients.
//
// Formula: state = (state * 214013 + 2531011) >>> 0
// Output:  (state >>> 16) & 0x7FFF  → 15-bit value 0..32767
//
// This is the same LCG used by mapgen.js's MsvcRng class, unified
// here as the canonical engine-wide PRNG.
// ═══════════════════════════════════════════════════════════════════

/**
 * Seeded PRNG using MSVC LCG (matches Civ2 binary).
 *
 * Usage:
 *   const rng = new SeededRNG(42);
 *   rng.next();       // 0..32767
 *   rng.nextInt(6);   // 0..5
 *   rng.random();     // 0.0..0.999969 (15-bit resolution)
 *   rng.nextFloat();  // alias for random()
 *   rng.serialize();  // { seed: <current state> }
 */
export class SeededRNG {
  /**
   * @param {number} seed - initial seed (32-bit unsigned integer)
   */
  constructor(seed) {
    this.state = (seed >>> 0) || 1;
  }

  /**
   * Advance state and return 15-bit value (0..32767).
   * @returns {number}
   */
  next() {
    this.state = (Math.imul(this.state, 214013) + 2531011) >>> 0;
    if (this.callCount != null) this.callCount++;
    if (this.traceEnabled) {
      const stack = (new Error()).stack;
      const lines = stack ? stack.split('\n') : [];
      // Skip the Error/next frames; first meaningful caller is index 3
      const caller = (lines[3] || '').trim();
      (this.trace ||= []).push({ state: this.state, caller });
    }
    return (this.state >>> 16) & 0x7FFF;
  }

  /**
   * Return integer in [0, n-1]. Returns 0 if n <= 1.
   * @param {number} n - upper bound (exclusive)
   * @returns {number}
   */
  nextInt(n) {
    if (n <= 1) return 0;
    return this.next() % n;
  }

  /**
   * Return float in [0, 1) with 15-bit resolution.
   * Drop-in replacement for Math.random().
   * @returns {number}
   */
  random() {
    return this.next() / 32768;
  }

  /**
   * Alias for random().
   * @returns {number}
   */
  nextFloat() {
    return this.random();
  }

  /**
   * Serialize the current RNG state for save/restore.
   * @returns {{ seed: number }}
   */
  serialize() {
    return { seed: this.state };
  }

  /**
   * Restore RNG from serialized state.
   * @param {{ seed: number }} data
   * @returns {SeededRNG}
   */
  static deserialize(data) {
    const rng = new SeededRNG(1);
    rng.state = (data.seed >>> 0) || 1;
    return rng;
  }
}
