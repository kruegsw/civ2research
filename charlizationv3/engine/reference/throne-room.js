/**
 * Civ2 MGE Throne Room Scene — Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra)
 * Primary source: FUN_004d17bf (12,822-byte build_advance_scene function)
 *
 * The throne room / "advance scene" is shown when the player discovers a new
 * technology. It renders a room scene with decorations that improve as the
 * player's civilization grows in 6 power-ranking categories.
 *
 * The scene is built from 3 object classes:
 *   1. Room layers (7): background panels with fixed category/threshold
 *   2. Floor upgrades (24): progressive floor/wall sprites indexed by threshold
 *   3. Decoration objects (57): items placed via category+threshold gating
 *
 * All coordinates reference the 457x304 (0x1C9 x 0x130) scene surface.
 * Blitting offsets: dx = srcX - 0xAF (175), dy = srcY - 99 (0x63).
 */

// === Power Ranking Categories ===
// 6 shorts loaded from civ record at DAT_0064caa8 + civId * 0x594
// FUN_004d01ae @ 0x004D01AE
export const POWER_CATEGORIES = {
  0: 'military',    // category 0 — military strength
  1: 'culture',     // category 1 — culture/approval (checked via FUN_00596c08)
  2: 'economy',     // category 2 — economic power
  3: 'technology',  // category 3 — tech level
  4: 'territory',   // category 4 — land area
  5: 'population',  // category 5 — population
};

// === Scene Dimensions ===
// FUN_004d0517 @ 0x004D0517
export const SCENE_DIMENSIONS = {
  width: 0x1C9,          // 457 — scene surface width
  height: 0x130,         // 304 — scene surface height
  displayWidth: 0x280,   // 640 — full display width (starfield)
  displayHeight: 0x1E0,  // 480 — full display height
  blitOffsetX: 0xAF,     // 175 — blit origin X
  blitOffsetY: 99,       // 99 (0x63) — blit origin Y
  textAreaRect: { left: 10, top: 0x14, right: 300, bottom: 0x1DF }, // 0x004D0517+223
  titleRect: { left: 0, top: 0, right: 0x27F, bottom: 0x28 }, // 639x40, 0x004D043F
};

// === Wonder Window Init ===
// FUN_004d0517 @ 0x004D0517
export const WONDER_WINDOW = {
  displaySize: { width: 0x1C9, height: 0x130 }, // 457x304
  colorDepth: 9,
  textCursorStart: { x: 10, y: 0x28 },   // 10, 40
  fonts: [0x18, 0x14, 0x10],              // 24pt, 20pt, 16pt
  timerThreshold: 0x4B1,                  // 1201ms invalidation timer
};

// === Room Layers (7 entries) ===
// Struct: [type, category, x, y, w, h, spriteId, dllResourceId]
// From local_c88/local_c84 array at 0x004D17BF+0x668
// type: 0=empty/skip, 1=threshold_gated, 2=always_render, 5=variant
// category: which of 6 power categories to check
export const ROOM_LAYERS = [
  // idx 0: Right wall panel
  { type: 2, category: 6, x: 0x1CF, y: 0xB2, w: 0xAA, h: 0x2B, spriteId: 0x33, dllId: 0x204,
    sourceAddr: '0x004D1E4E' },
  // idx 1: Bottom-right floor
  { type: 2, category: 6, x: 0x1D0, y: 0x189, w: 0x68, h: 0x3D, spriteId: 0x28, dllId: 0x230,
    sourceAddr: '0x004D1E6A' },
  // idx 2: Lower background
  { type: 0, category: 7, x: 0x197, y: 0x1DF, w: 0x13C, h: 0x3A, spriteId: 0x22, dllId: 0x44,
    sourceAddr: '0x004D1E86' },
  // idx 3: Wall texture
  { type: 2, category: 2, x: 0x1C9, y: 0x1DE, w: 0x144, h: 0x19, spriteId: 0x36, dllId: 0x92,
    sourceAddr: '0x004D1EA2' },
  // idx 4: Wall extension
  { type: 2, category: 2, x: 0x1CA, y: 0x1FA, w: 0x139, h: 0x26, spriteId: 0x27, dllId: 0xAC,
    sourceAddr: '0x004D1EBE' },
  // idx 5: Floor base
  { type: 0, category: 9, x: 0x199, y: 0x1E2, w: 0x145, h: 0x42, spriteId: 0x37, dllId: 0x7F,
    sourceAddr: '0x004D1EDA' },
  // idx 6: Main hall
  { type: 1, category: 2, x: 0x1BB, y: 0x1DF, w: 0x13F, h: 0x4D, spriteId: 0x4E, dllId: 0x69,
    sourceAddr: '0x004D1EF6' },
];

// === Floor/Wall Upgrade Array (24 entries) ===
// 28-byte stride entries in local_bc4 at 0x004D1F12
// Struct per entry: [spriteBase(2 bytes), y(4), x(4), w(4), h(4), blank(4), blank(4), threshold(2)]
// Each is a progressive floor/wall sprite; the game finds the highest-threshold
// entry whose threshold is <= the player's ranking, then renders that sprite.
// Indices 0-6 are room layers (rendered first), 7-23 are floor upgrades.
//
// The floor upgrade array shares the same byte layout. We decode the raw byte
// array from the decompiled source. Each entry is 0x1C (28) bytes.
export const FLOOR_UPGRADES = [
  // --- Entries 0-6: Base room layers (re-encoded from room layer data) ---
  // See ROOM_LAYERS above — these are the same 7 entries in packed form.

  // --- Entries 7-23: Progressive floor/wall upgrade sprites ---
  // idx 7: threshold 0 (always present) — sprite 0x190, pos (0x138, 0)
  { idx: 7, spriteBase: 0x190, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 0, sourceAddr: '0x004D1F12+0x00' },
  // idx 8: threshold 1
  { idx: 8, spriteBase: 0x191, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 1, sourceAddr: '0x004D1F12+0x1C' },
  // idx 9: threshold 2
  { idx: 9, spriteBase: 0x192, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 2, sourceAddr: '0x004D1F12+0x38' },
  // idx 10: threshold 3
  { idx: 10, spriteBase: 0x193, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 3, sourceAddr: '0x004D1F12+0x54' },
  // idx 11: threshold 4
  { idx: 11, spriteBase: 0x194, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 4, sourceAddr: '0x004D1F12+0x70' },
  // idx 12: threshold 6
  { idx: 12, spriteBase: 0x196, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 6, sourceAddr: '0x004D1F12+0x8C' },
  // idx 13: threshold 8
  { idx: 13, spriteBase: 0x198, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 8, sourceAddr: '0x004D1F12+0xA8' },
  // idx 14: threshold 10
  { idx: 14, spriteBase: 0x19A, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 10, sourceAddr: '0x004D1F12+0xC4' },
  // idx 15: threshold 12
  { idx: 15, spriteBase: 0x19C, y: 0x138, x: 0, w: 0x9D, h: 0xFD, depth: 0xF0,
    threshold: 12, sourceAddr: '0x004D1F12+0xE0' },
  // idx 16: threshold 14
  { idx: 16, spriteBase: 0x19E, y: 0x137, x: 0, w: 0x9D, h: 0xFE, depth: 0xF0,
    threshold: 14, sourceAddr: '0x004D1F12+0xFC' },
  // idx 17: threshold 16
  { idx: 17, spriteBase: 0x1A0, y: 0x137, x: 0, w: 0x9D, h: 0xFE, depth: 0xF0,
    threshold: 16, sourceAddr: '0x004D1F12+0x118' },
  // idx 18: threshold 18
  { idx: 18, spriteBase: 0x1A2, y: 0x137, x: 0, w: 0x9D, h: 0xFE, depth: 0xF0,
    threshold: 18, sourceAddr: '0x004D1F12+0x134' },
  // idx 19: threshold 20
  { idx: 19, spriteBase: 0x1A5, y: 0x137, x: 0, w: 0x9D, h: 0xFE, depth: 0xF0,
    threshold: 20, sourceAddr: '0x004D1F12+0x150' },
  // idx 20: threshold 22
  { idx: 20, spriteBase: 0x1A8, y: 0x137, x: 0, w: 0x9D, h: 0x115, depth: 0xF0,
    threshold: 22, sourceAddr: '0x004D1F12+0x16C' },
  // idx 21: threshold 23 — wider wall (different w)
  { idx: 21, spriteBase: 0x1A9, y: 0xBB, x: 0, w: 0x72, h: 0x191, depth: 0x11B,
    threshold: 23, sourceAddr: '0x004D1F12+0x188' },
  // idx 22: threshold 24
  { idx: 22, spriteBase: 0x1AA, y: 0xBB, x: 0, w: 0x72, h: 0x191, depth: 0x11B,
    threshold: 24, sourceAddr: '0x004D1F12+0x1A4' },
  // idx 23: threshold 25
  { idx: 23, spriteBase: 0x1AB, y: 0xBA, x: 0, w: 0x72, h: 0x192, depth: 0x11B,
    threshold: 25, sourceAddr: '0x004D1F12+0x1C0' },
  // idx 24: threshold 26
  { idx: 24, spriteBase: 0x1AC, y: 0xBA, x: 0, w: 0x72, h: 0x192, depth: 0x11B,
    threshold: 26, sourceAddr: '0x004D1F12+0x1DC' },
  // idx 25: threshold 27
  { idx: 25, spriteBase: 0x1AD, y: 0xBB, x: 0, w: 0x72, h: 0x191, depth: 0x11B,
    threshold: 27, sourceAddr: '0x004D1F12+0x1F8' },
  // idx 26: threshold 28
  { idx: 26, spriteBase: 0x1AE, y: 0xBB, x: 0, w: 0x72, h: 0x191, depth: 0x11B,
    threshold: 28, sourceAddr: '0x004D1F12+0x214' },
  // idx 27: threshold 30
  { idx: 27, spriteBase: 0x1B1, y: 0xBB, x: 0, w: 0x72, h: 0x191, depth: 0x11B,
    threshold: 30, sourceAddr: '0x004D1F12+0x230' },
  // idx 28: threshold 32
  { idx: 28, spriteBase: 0x1B4, y: 0xBB, x: 0, w: 0x72, h: 0x191, depth: 0x11B,
    threshold: 32, sourceAddr: '0x004D1F12+0x24C' },
  // idx 29: threshold 36
  { idx: 29, spriteBase: 0x1B7, y: 0xBB, x: 0, w: 0x72, h: 0x191, depth: 0x11B,
    threshold: 36, sourceAddr: '0x004D1F12+0x268' },
  // idx 30: threshold 38 — wider panels
  { idx: 30, spriteBase: 0x1B8, y: 0xBA, x: 0, w: 0x72, h: 0x192, depth: 0x11B,
    threshold: 38, sourceAddr: '0x004D1F12+0x284' },
];

// === Decoration Objects (57 entries, indices 0x1F-0x57) ===
// Each decoration has: [type, category, x, y, srcX, srcY, w, h, dllResourceId, threshold]
// type: determines which render context (1=culture, 2=economy, 3=tech, 4=territory, 5=population)
// category: power category index for threshold comparison
// When player's category value >= threshold AND FUN_00596c08(civId, category) >= threshold:
//   render "filled" sprite; otherwise render "empty" sprite
// All from local variables at 0x004D17BF starting at ~local_920
export const THRONE_DECORATIONS = [
  // === Category 6 (fixed) decorations ===
  { idx: 0x1F, type: 1, category: 6, x: 0x1C1, y: 0x1BA, w: 0x75, h: 0x21,
    spriteId: 0x2B, dllId: 0x1CE, sourceAddr: '0x004D2420' },
  // === Category 4 (territory) decorations ===
  { idx: 0x20, type: 5, category: 4, x: 0x1F0, y: 0x18E, w: 0xA5, h: 0x30,
    spriteId: 0x16, dllId: 400, sourceAddr: '0x004D2440' },
  { idx: 0x21, type: 3, category: 3, x: 0x1D9, y: 0x17D, w: 0xA4, h: 0x3E,
    spriteId: 0x35, dllId: 0xD2, sourceAddr: '0x004D2460' },
  { idx: 0x22, type: 4, category: 4, x: 0x1E7, y: 0x1C5, w: 0xA9, h: 0x30,
    spriteId: 0x24, dllId: 0x168, sourceAddr: '0x004D2480' },
  { idx: 0x23, type: 4, category: 3, x: 0x1E5, y: 0x1E0, w: 0xBD, h: 0x32,
    spriteId: 0x24, dllId: 0x103, sourceAddr: '0x004D24A0' },
  { idx: 0x24, type: 5, category: 4, x: 0x1F1, y: 0x1AD, w: 0xB4, h: 0x47,
    spriteId: 0x26, dllId: 0x1C1, sourceAddr: '0x004D24C0' },
  // === Category 1 (culture) decorations ===
  { idx: 0x25, type: 4, category: 1, x: 0x1E1, y: 0x1FC, w: 0xD2, h: 0x2B,
    spriteId: 0x20, dllId: 0x30, sourceAddr: '0x004D24E0' },
  { idx: 0x26, type: 4, category: 2, x: 0x1E3, y: 0x211, w: 0xE1, h: 0x37,
    spriteId: 0x2A, dllId: 0x96, sourceAddr: '0x004D2500' },
  { idx: 0x27, type: 5, category: 2, x: 0x1EC, y: 0x1AF, w: 0xC7, h: 0x4A,
    spriteId: 0x24, dllId: 0x97, sourceAddr: '0x004D2520' },
  { idx: 0x28, type: 3, category: 2, x: 0x1D7, y: 0x1AF, w: 0xCE, h: 0x45,
    spriteId: 0x3A, dllId: 0x4A, sourceAddr: '0x004D2540' },
  { idx: 0x29, type: 5, category: 2, x: 0x1ED, y: 0x1CA, w: 0xE9, h: 0x50,
    spriteId: 0x2F, dllId: 0xE2, sourceAddr: '0x004D2560' },
  // === Category 6 (background) decorations ===
  { idx: 0x2A, type: 1, category: 6, x: 0x1C0, y: 0xB2, w: 0xC8, h: 0x3E,
    spriteId: 0x28, dllId: 399, sourceAddr: '0x004D2580' },
  { idx: 0x2B, type: 5, category: 3, x: 0x1EE, y: 0x12C, w: 0xC5, h: 0x12,
    spriteId: 0x18, dllId: 0x133, sourceAddr: '0x004D25A0' },
  // === Category 4 (territory) decorations continued ===
  { idx: 0x2C, type: 3, category: 4, x: 0x1D8, y: 0x136, w: 0xBC, h: 0x41,
    spriteId: 0x38, dllId: 0x90, sourceAddr: '0x004D25C0' },
  { idx: 0x2D, type: 5, category: 1, x: 0x1EA, y: 0x153, w: 0xE8, h: 0x25,
    spriteId: 0x29, dllId: 1, sourceAddr: '0x004D25E0' },
  { idx: 0x2E, type: 5, category: 3, x: 0x1EF, y: 0x12C, w: 0xD9, h: 0x49,
    spriteId: 0x3C, dllId: 0x146, sourceAddr: '0x004D2600' },
  { idx: 0x2F, type: 3, category: 1, x: 0x1D6, y: 0x164, w: 0xE9, h: 0x48,
    spriteId: 0x40, dllId: 1, sourceAddr: '0x004D2620' },
  { idx: 0x30, type: 5, category: 1, x: 0x1EB, y: 0x15E, w: 0xFB, h: 0x6F,
    spriteId: 0x45, dllId: 0x27, sourceAddr: '0x004D2640' },
  // === Category 4 decorations ===
  { idx: 0x31, type: 4, category: 4, x: 0x1E6, y: 0x109, w: 0xED, h: 0x31,
    spriteId: 0x2C, dllId: 0x136, sourceAddr: '0x004D2660' },
  { idx: 0x32, type: 4, category: 3, x: 0x1E4, y: 0x11F, w: 0x107, h: 0x34,
    spriteId: 0x2E, dllId: 0xCE, sourceAddr: '0x004D2680' },
  { idx: 0x33, type: 4, category: 1, x: 0x1E0, y: 0x137, w: 0x122, h: 0x2E,
    spriteId: 0x28, dllId: 1, sourceAddr: '0x004D26A0' },
  { idx: 0x34, type: 4, category: 2, x: 0x1E2, y: 0x148, w: 0x136, h: 0x39,
    spriteId: 0x35, dllId: 0x5C, sourceAddr: '0x004D26C0' },
  // === Category 8 (high-level) decorations ===
  { idx: 0x35, type: 2, category: 8, x: 0x1D4, y: 0x20E, w: 0xF6, h: 0x51,
    spriteId: 0x36, dllId: 0x334, sourceAddr: '0x004D26E0' },
  { idx: 0x36, type: 0, category: 0x21, x: 0x1B6, y: 0x24B, w: 0x114, h: 0x15,
    spriteId: 0x19, dllId: 0x2D1, sourceAddr: '0x004D2700' },
  { idx: 0x37, type: 1, category: 8, x: 0x1C5, y: 0x246, w: 0x111, h: 0x2F,
    spriteId: 0x2B, dllId: 0x285, sourceAddr: '0x004D2720' },
  { idx: 0x38, type: 0, category: 0x1F, x: 0x1B3, y: 0x210, w: 0xFD, h: 0x30,
    spriteId: 0x26, dllId: 0x282, sourceAddr: '0x004D2740' },
  // === Category 7 decorations ===
  { idx: 0x39, type: 2, category: 7, x: 0x1D2, y: 0x1F7, w: 0x102, h: 0x4D,
    spriteId: 0x3A, dllId: 0x2AB, sourceAddr: '0x004D2760' },
  { idx: 0x3A, type: 0, category: 0x1D, x: 0x1B0, y: 0x22D, w: 0x123, h: 0x19,
    spriteId: 0x19, dllId: 0x243, sourceAddr: '0x004D2780' },
  { idx: 0x3B, type: 1, category: 7, x: 0x1C3, y: 0x228, w: 0x11D, h: 0x2F,
    spriteId: 0x2E, dllId: 0x222, sourceAddr: '0x004D27A0' },
  // === Category 5 (population) decorations ===
  { idx: 0x3C, type: 2, category: 5, x: 0x1CE, y: 0x1F1, w: 0xFD, h: 0x4E,
    spriteId: 0x39, dllId: 0x1B5, sourceAddr: '0x004D27C0' },
  { idx: 0x3D, type: 0, category: 0x15, x: 0x1A7, y: 0x228, w: 0x11D, h: 0x18,
    spriteId: 0x1A, dllId: 0x20C, sourceAddr: '0x004D27E0' },
  { idx: 0x3E, type: 1, category: 5, x: 0x1BF, y: 0x224, w: 0x118, h: 0x31,
    spriteId: 0x2E, dllId: 0x15D, sourceAddr: '0x004D2800' },
  { idx: 0x3F, type: 0, category: 0x13, x: 0x1A4, y: 0x1F0, w: 0x107, h: 0x34,
    spriteId: 0x35, dllId: 0x1B9, sourceAddr: '0x004D2820' },
  // === Category 1 (culture) continued ===
  { idx: 0x40, type: 2, category: 1, x: 0x1C8, y: 0x1DA, w: 0x10B, h: 0x4B,
    spriteId: 0x41, dllId: 0x46, sourceAddr: '0x004D2840' },
  { idx: 0x41, type: 0, category: 0x0B, x: 0x19B, y: 0x1CF, w: 0x108, h: 0x42,
    spriteId: 0x3D, dllId: 0xC2, sourceAddr: '0x004D2860' },
  { idx: 0x42, type: 2, category: 3, x: 0x1CB, y: 0x1CE, w: 0x109, h: 0x4D,
    spriteId: 0x40, dllId: 0xD3, sourceAddr: '0x004D2880' },
  { idx: 0x43, type: 2, category: 1, x: 0x1C7, y: 0x1BC, w: 0x11B, h: 0x44,
    spriteId: 0x44, dllId: 1, sourceAddr: '0x004D28A0' },
  // === Category 5 (population) continued ===
  { idx: 0x44, type: 0, category: 5, x: 0x195, y: 0x1E4, w: 0x12F, h: 0x42,
    spriteId: 0x31, dllId: 1, sourceAddr: '0x004D28C0' },
  { idx: 0x45, type: 0, category: 0x0D, x: 0x19D, y: 0x1FB, w: 0x12B, h: 0x20,
    spriteId: 0x1F, dllId: 0x105, sourceAddr: '0x004D28E0' },
  { idx: 0x46, type: 1, category: 1, x: 0x1BA, y: 0x204, w: 0x129, h: 0x2F,
    spriteId: 0x33, dllId: 0x39, sourceAddr: '0x004D2900' },
  { idx: 0x47, type: 1, category: 3, x: 0x1BC, y: 0x1F9, w: 0x125, h: 0x37,
    spriteId: 0x35, dllId: 0xB7, sourceAddr: '0x004D2920' },
  { idx: 0x48, type: 1, category: 1, x: 0x1B9, y: 0x1DF, w: 0x13E, h: 0x33,
    spriteId: 0x34, dllId: 1, sourceAddr: '0x004D2940' },
  { idx: 0x49, type: 0, category: 0x13, x: 0x1A3, y: 0x1BE, w: 0x11F, h: 0x2C,
    spriteId: 0x40, dllId: 0x18C, sourceAddr: '0x004D2960' },
  // === Category 5 continued ===
  { idx: 0x4A, type: 2, category: 5, x: 0x1CD, y: 0x1AC, w: 0x117, h: 0x42,
    spriteId: 0x46, dllId: 0x172, sourceAddr: '0x004D2980' },
  { idx: 0x4B, type: 0, category: 0x15, x: 0x1A6, y: 0x1D1, w: 0x142, h: 0x1D,
    spriteId: 0x1D, dllId: 0x1EE, sourceAddr: '0x004D29A0' },
  { idx: 0x4C, type: 1, category: 5, x: 0x1BE, y: 0x1CD, w: 0x13C, h: 0x34,
    spriteId: 0x33, dllId: 0x128, sourceAddr: '0x004D29C0' },
  // === Category 7 continued ===
  { idx: 0x4D, type: 2, category: 7, x: 0x1D1, y: 0x19D, w: 0x12C, h: 0x3C,
    spriteId: 0x4B, dllId: 0x26E, sourceAddr: '0x004D29E0' },
  { idx: 0x4E, type: 0, category: 0x1F, x: 0x1B2, y: 0x19E, w: 0x12B, h: 0x24,
    spriteId: 0x41, dllId: 0x25D, sourceAddr: '0x004D2A00' },
  { idx: 0x4F, type: 0, category: 0x1D, x: 0x1AF, y: 0x1BD, w: 0x15C, h: 0x1D,
    spriteId: 0x1D, dllId: 0x225, sourceAddr: '0x004D2A20' },
  { idx: 0x50, type: 1, category: 7, x: 0x1C2, y: 0x1B9, w: 0x157, h: 0x31,
    spriteId: 0x34, dllId: 0x1F0, sourceAddr: '0x004D2A40' },
  // === Category 8 continued ===
  { idx: 0x51, type: 2, category: 8, x: 0x1D3, y: 0x188, w: 0x129, h: 0x3A,
    spriteId: 0x4E, dllId: 0x2F9, sourceAddr: '0x004D2A60' },
  { idx: 0x52, type: 0, category: 0x21, x: 0x1B5, y: 0x1A5, w: 0x15C, h: 0x1C,
    spriteId: 0x1E, dllId: 0x2B3, sourceAddr: '0x004D2A80' },
  { idx: 0x53, type: 1, category: 8, x: 0x1C4, y: 0x1A0, w: 0x156, h: 0x32,
    spriteId: 0x35, dllId: 0x252, sourceAddr: '0x004D2AA0' },
  { idx: 0x54, type: 0, category: 0x0F, x: 0x19F, y: 0x1D1, w: 0x107, h: 0x43,
    spriteId: 0x2A, dllId: 0x126, sourceAddr: '0x004D2AC0' },
  // === Category 4 continued ===
  { idx: 0x55, type: 2, category: 4, x: 0x1CC, y: 0x1CF, w: 0x101, h: 0x50,
    spriteId: 0x32, dllId: 0x121, sourceAddr: '0x004D2AE0' },
  { idx: 0x56, type: 0, category: 0x11, x: 0x1A1, y: 0x201, w: 0x11A, h: 0x21,
    spriteId: 0x1A, dllId: 0x16A, sourceAddr: '0x004D2B00' },
  { idx: 0x57, type: 1, category: 4, x: 0x1BD, y: 0x1FB, w: 0x116, h: 0x38,
    spriteId: 0x2D, dllId: 0xEF, sourceAddr: '0x004D2B20' },
];

// === DLL Resource IDs for Dialog Layers ===
// The 11 dialog layers are created with sequential DLL resource IDs
// FUN_005bf5e1(id, 10, 0xEC, this+0x1F8) — from the rendering section
// 0x004D2B3A onwards
export const DIALOG_LAYER_IDS = [
  0x1B9, 0x1E0, 0x1C7, 0x1EA, 0x1D6, 0x1BA, 0x1E1, 0x1C8, 0x1E9, 0x1D7, 0x1EB,
];

// === Starfield Animation ===
// FUN_004d570b @ 0x004D570B (1046 bytes)
export const STARFIELD = {
  particleCount: 80,         // 0x50 stars — 0x004D5729
  screenCenter: { x: 0x140, y: 0xF0 },  // 320, 240 — perspective projection center
  screenBounds: { width: 0x280, height: 0x1E0 }, // 640x480
  initialRange: {
    x: { min: -32000, max: 32000 },   // 0x004D5733
    y: { min: -24000, max: 24000 },   // 0x004D573D
    z: { min: 1, max: 100 },          // 0x004D5747
  },
  respawnRange: {
    z: { min: 50, max: 100 },         // 0x004D63FB — animate_stars
  },
  velocity: {
    dx: 0xFA,   // +250 per frame  — 0x004D6438
    dy: 300,    // +300 per frame  — 0x004D643E
    dz: -1,     // approaching     — 0x004D6444
  },
  starColor: 0x29,       // palette index — 0x004D57E4
  backgroundColor: 10,   // palette index — 0x004D6485
  animIntervalMs: 5,     // timer callback period — 0x004D1110
  starStride: 12,        // bytes per star: x(4) + y(4) + z(4)
  starOffset: 0x1DB8,    // offset in wonder window object
  sourceAddr: '0x004D570B',
};

// === Typewriter Text Effect ===
// FUN_004d4fd1 @ 0x004D4FD1 (986 bytes)
export const TYPEWRITER = {
  intervalMs: 60,             // timer period for normal mode — 0x004D10FD
  betweenTurnsIntervalMs: 10, // faster for between-turns — 0x004D1674
  labelColor: 0xF9,           // palette index for category labels — 0x004D5046
  valueColor: 0xFE,           // palette index for values — 0x004D503E
  cursorStartX: 10,           // 0x004D0D40
  cursorStartY: 0x28,         // 40 — 0x004D0D44
  wonderCursorY: 0x73,        // 115 — starfield text start — 0x004D5888
  autoCloseDelayMs: 500,      // after text done, mode 1 — 0x004D5139
  sourceAddr: '0x004D4FD1',
};

// === Pollution Bar Thresholds ===
// FUN_004d4fd1 @ 0x004D50C0 (within draw_next_char)
export const POLLUTION_BAR = {
  rect: { left: 0, top: 0x1C1, right: 0x27F, bottom: 0x1DF }, // 0x004D50C0
  thresholds: [
    { max: 0x28, color: 0xF9, label: 'green' },   // < 40: green — 0x004D50F7
    { max: 0x4B, color: 0xFB, label: 'yellow' },   // < 75: yellow — 0x004D5103
    { max: Infinity, color: 0xFA, label: 'red' },   // >= 75: red — 0x004D510D
  ],
  backgroundPalette: 10, // black background fill — 0x004D50D5
  wonderModeColor: 0xFA, // always red for wonder movie — 0x004D5954
  sourceAddr: '0x004D50C0',
};

// === Wonder Statistics Text ===
// FUN_004d4a7b @ 0x004D4A7B (1366 bytes) — build_wonder_info_text
// FUN_004d4a7b @ 0x004D4A7B (1366 bytes) — build_wonder_info_text
// Renders stats in order: 6 power categories, gold, approval, population,
// GNP (with div10.mod10), land area (placeholder), GNP numeric, spaceship,
// literacy, pollution bar. CharCodes are Wingdings-style glyphs used as
// category icons in the typewriter text.
export const WONDER_STATS = {
  categories: [
    // 6 power ranking categories — labels loaded from DAT_00634f60[i].string_table_id
    // Values from DAT_0064caa8 + civ*0x594 + i*2 (short per category)
    // No charCode for these; they use string_table labels instead
    { charCode: null, label: 'ranking[0]', source: 'DAT_0064caa8 + civ*0x594' },
    { charCode: null, label: 'ranking[1]', source: 'DAT_0064caa8 + civ*0x594 + 2' },
    { charCode: null, label: 'ranking[2]', source: 'DAT_0064caa8 + civ*0x594 + 4' },
    { charCode: null, label: 'ranking[3]', source: 'DAT_0064caa8 + civ*0x594 + 6' },
    { charCode: null, label: 'ranking[4]', source: 'DAT_0064caa8 + civ*0x594 + 8' },
    { charCode: null, label: 'ranking[5]', source: 'DAT_0064caa8 + civ*0x594 + 10' },
  ],
  // After the 6 categories, if any category value > FUN_00596b00 result,
  // a special marker string DAT_0062e2f4 is appended after category[0].
  categoryOverflowMarker: 'DAT_0062e2f4',  // appended after first category if any improved

  gold:       { charCode: 0x22, source: 'DAT_0064caae + civ*0x594', suffix: ',000',
                note: '0x004D4B2C: thunk_FUN_004af14b(+0x638, 0x22)' },
  approval:   { charCode: 0x42, source: 'DAT_006ad0f0',
                note: '0x004D4B58: thunk_FUN_004af14b(+0x638, 0x42); value = DAT_006ad0f0, suffixed with %' },
  population: { charCode: 0xCD, source: 'DAT_006ad0e8',
                note: '0x004D4B80: thunk_FUN_004af14b(+0x638, 0xcd); value appended with ,000 suffix' },
  gnp:        { charCode: 0xCE, source: 'DAT_006ad0e4', format: 'div10.mod10',
                note: '0x004D4BA2: thunk_FUN_004af14b(+0x638, 0xce); value = DAT_006ad0e4/10 "." DAT_006ad0e4%10' },
  landArea:   { charCode: 0xD1, source: 'implied',
                note: '0x004D4BDB: thunk_FUN_004af14b(+0x638, 0xd1); placeholder with no value' },
  gnpNumeric: { charCode: 0xC8, source: 'DAT_006ad0dc',
                note: '0x004D4BF7: thunk_FUN_004af14b(+0x638, 200/0xC8); GNP $ value' },
  spaceship:  { charCode: 0xEB, flag: 'civ_attribs & 8',
                note: '0x004D4C34: only shown if (DAT_0064caa0[civ*0x594] & 8) != 0' },
  literacy:   { charCode: 0xCF, source: 'DAT_006ad0f4', format: 'div10.mod10',
                note: '0x004D4C68: thunk_FUN_004af14b(+0x638, 0xcf); value = DAT_006ad0f4/10 "." DAT_006ad0f4%10' },
  diseaseIcon:{ charCode: 0xD2,
                note: '0x004D4CA3: thunk_FUN_004af14b(+0x638, 0xd2); trailing icon after literacy' },
  pollution:  { charCode: 0xD0, source: 'DAT_006ad0ec',
                note: '0x004D4CB9: thunk_FUN_004af14b(+0x838, 0xd0); rendered on separate pollution bar' },
  sourceAddr: '0x004D4A7B',
};

// === Button Layout ===
// FUN_004d53ab @ 0x004D53AB (826 bytes)
export const WONDER_BUTTONS = {
  okButton: {
    rect: { x: 0x1F5, y: 0x1A1, w: 0x34, h: 0x24 },   // 0x004D5F8C
    centeredRect: { x: 0x22F, y: 0x1A1, w: 0x43, h: 0x24 }, // centered when single button
    spriteStates: [
      { x: 1, y: 1 },     // normal — 0x004D54B0
      { x: 0x36, y: 1 },  // highlight
      { x: 0x6B, y: 1 },  // pressed
    ],
    size: { w: 0x34, h: 0x24 }, // 52x36
  },
  videoButton: {
    rect: { x: 0x22F, y: 0x1A1, w: 0x43, h: 0x24 },    // 0x004D60CF
    spriteStates: [
      { x: 1, y: 0x26 },    // normal — 0x004D5557
      { x: 0x45, y: 0x26 }, // highlight
      { x: 0x89, y: 0x26 }, // pressed
    ],
    size: { w: 0x43, h: 0x24 }, // 67x36
    labelsByLanguage: {
      0: 'label_0x354',  // English
      1: 'Lancer',       // French — 0x004D5536
      2: 'Starten',      // German — 0x004D5540
    },
  },
  hotspots: [
    { id: 0, x: 0x1F5, y: 0x1A1, w: 0x34, h: 0x24, label: 'OK' },     // 0x004D5E82
    { id: 1, x: 0x22F, y: 0x1A1, w: 0x43, h: 0x24, label: 'Video' },   // 0x004D5E9C
  ],
  sourceAddr: '0x004D53AB',
};

// === Display Modes ===
// Used throughout show_advance_animation and related functions
export const DISPLAY_MODES = {
  0: 'standard',           // basic advance display
  1: 'with_video_button',  // has wonder video available
  2: 'video_transition',   // transitioning to video playback
  3: 'wonder_movie',       // showing wonder movie starfield
};

// === DLL Files ===
// Resources loaded by the wonder/throne room system
export const THRONE_DLL_FILES = {
  sceneDll: 'ss.dll',                    // main scene sprites — 0x004D0B6A
  civMkDll: 'civ2_mk.dll',              // advisor council — 0x00514F47
  introDll: 'civ2_intro.dll',           // intro video — 0x0055A5E4
  videoPrefix: 'civ2_video_launch.avi',  // wonder video — 0x004D5BDB
};


// ═══════════════════════════════════════════════════════════════════
// Throne Room Renderer — FUN_0044db92 (3024 bytes)
// Binary ref: block_00440000.c, lines 7962-8215
// Renders the throne room scene by compositing DLL sprite resources
// onto a 640x480 surface. Each component is loaded via
// FUN_005bf5e1(resourceId, 10, 0xEC, destSurface) then placed via
// FUN_005cedad/FUN_005cef31 using coordinate lookup tables.
// ═══════════════════════════════════════════════════════════════════

export const THRONE_RENDERER = {
  sourceAddr: '0x0044DB92',
  displaySize: { width: 0x280, height: 0x1E0 }, // 640x480

  // === Civ Record Layout ===
  // Upgrade levels: 8 bytes at DAT_0064ca93 + civId * 0x594
  //   Indices 0-4: standard category levels (0-4 each)
  //   Index 5-7: additional upgrade slots
  // Special upgrade bitmask: 1 byte at DAT_0064ca9b + civId * 0x594
  //   Bit 0: base floor (resource 0xA0)
  //   Bit 1: special upgrade 1 (resource 0xA1)
  //   Bit 2: special upgrade 2 (resource 0xA2)
  //   Bit 3: special throne (resource 0xA3, placed at 0xD1,0x8E,0xC0,0x9B)
  //   Bits 4-6: more special upgrades (resources 0xA4-0xA6)
  civUpgradeLevelsBase: 0x0064CA93,
  civSpecialBitmaskBase: 0x0064CA9B,
  civRecordStride: 0x594,
  maxUpgradeLevel: 4,         // levels 0-4 per category; < 4 means upgradable
  numStandardCategories: 8,   // indices 0-7 in upgrade level array
  numSpecialSlots: 7,         // bits 0-6 in special bitmask

  // Additional civ record fields used by FUN_0044d296 (orchestrator):
  // DAT_0064ca96 + civ*0x594 — category 3 level (left-wall component)
  // DAT_0064ca97 + civ*0x594 — category 4 level (right-wall component)
  // DAT_0064ca9a + civ*0x594 — category 7 level (top component)
  civCategory3LevelOffset: 0x0064CA96,  // relative to civ record
  civCategory4LevelOffset: 0x0064CA97,
  civCategory7LevelOffset: 0x0064CA9A,

  // === DLL Resource ID Formulas ===
  // Standard upgrade: resourceId = category * 5 + level + 0x69
  //   @ line 8169: local_54 * 5 + local_50 + 0x69
  //   Categories 0-4, levels 0-4 → resources 0x69-0x8A
  standardResourceBase: 0x69,
  standardResourceFormula: 'category * 5 + level + 0x69',

  // Category 3 (left wall): resourceId = level + 0x78
  //   @ line 8029: level + 0x77 (but level = byte value, so resource = value + 0x77)
  category3ResourceBase: 0x77,

  // Category 4 (right wall): resourceId = level + 0x7D
  //   @ line 8074: level + 0x7C
  category4ResourceBase: 0x7C,

  // Category 7 (top): resourceId = level + 0x8C
  //   @ line 8140: level + 0x8B
  category7ResourceBase: 0x8B,

  // Special base floor: resource 0xA0
  //   @ line 8012: FUN_005bf5e1(0xa0, ...)
  specialFloorResource: 0xA0,

  // Special throne: resource 0xA3
  //   @ line 8096: FUN_005bf5e1(0xa3, ...)
  specialThroneResource: 0xA3,

  // Special upgrades: resource = slotIndex + 0xA0
  //   @ line 8053: FUN_005bf5e1(local_54 + 0xa0, ...)
  //   Slots 1-2 rendered first, then slots 4-6
  specialUpgradeResourceBase: 0xA0,

  // Base scene resource: 100 (0x64)
  //   @ line 8563: FUN_005bf5e1(100, ...)
  baseSceneResource: 100,

  // DLL load parameters (constant for all loads):
  dllLoadParam1: 10,    // always 10 (0x0A)
  dllLoadParam2: 0xEC,  // always 0xEC (236)

  // === Special Throne Placement ===
  // When special bitmask bit 3 is set, render resource 0xA3 at:
  //   @ line 8106: FUN_005cedad(..., 9, 0xD1, 0x8E, 0xC0, 0x9B)
  specialThronePlacement: { x: 0xD1, y: 0x8E, w: 0xC0, h: 0x9B },

  // === Special Floor Placement ===
  // When special bitmask bit 0 is set, render resource 0xA0 at:
  //   @ line 8022: FUN_005cedad(..., 9, 1, 0x137, 0x280, 0x2B)
  specialFloorPlacement: { x: 1, y: 0x137, w: 0x280, h: 0x2B },

  // === Coordinate Lookup Tables ===
  // Static data tables addressed via DAT_ references.
  // Each table has stride 0x10 (16 bytes = 4 ints: x, y, w, h).
  //
  // DAT_0061c068: Standard upgrade coordinates [level][category]
  //   Address: base + level*0x10 + category*0x40
  //   4 ints per entry: x, y, w, h
  //   @ lines 8040-8043, 8179-8182, 8204-8207
  standardCoordTable: {
    base: 0x0061C068,
    levelStride: 0x10,     // 16 bytes per level
    categoryStride: 0x40,  // 64 bytes per category (4 levels * 16 bytes)
    entrySize: 16,         // 4 ints (x, y, w, h)
    usage: 'coordinates for standard upgrade components',
  },

  // DAT_0061c128: Category 3 blit origin [level]
  //   2 ints per entry at stride 0x10: blitX, blitY (subtract 1 each)
  //   @ lines 8045-8046
  category3BlitTable: {
    base: 0x0061C128,
    stride: 0x10,
    usage: 'blit origin for category 3 (left wall) components',
  },

  // DAT_0061c168: Category 4 coordinates [level]
  //   4 ints per entry at stride 0x10: x, y, w, h
  //   @ lines 8085-8091
  category4CoordTable: {
    base: 0x0061C168,
    stride: 0x10,
    usage: 'coordinates for category 4 (right wall) components',
  },

  // DAT_0061c228: Category 7 coordinates [level]
  //   4 ints per entry at stride 0x10: x, y, w, h
  //   @ lines 8151-8157
  category7CoordTable: {
    base: 0x0061C228,
    stride: 0x10,
    usage: 'coordinates for category 7 (top) components',
  },

  // DAT_0061c268: Special upgrade coordinates [slot]
  //   4 ints per entry at stride 0x10 (but accessed slot*4): x, y, w, h
  //   @ lines 8063-8067, 8129-8133
  specialUpgradeCoordTable: {
    base: 0x0061C268,
    stride: 0x10,
    usage: 'coordinates for special upgrade overlays (slots 1-2 and 4-6)',
  },

  // === Render Order ===
  // FUN_0044db92 renders components in this order:
  //   1. Standard upgrades for categories 0-4 (loop local_54 = 0..4)
  //      - Each with level check: DAT_0064ca93[civ*0x594 + cat] != 0
  //   2. Special base floor (bitmask bit 0)
  //   3. Category 3 left wall (DAT_0064ca96[civ*0x594] != 0)
  //   4. Special upgrades slots 1-2 (bitmask bits 1-2)
  //   5. Category 4 right wall (DAT_0064ca97[civ*0x594] != 0)
  //   6. Special throne (bitmask bit 3)
  //   7. Standard upgrades for categories 5-6 (loop local_54 = 5..6)
  //   8. Special upgrades slots 4-6 (bitmask bits 4-6)
  //   9. Category 7 top component (DAT_0064ca9a[civ*0x594] != 0)
  renderOrder: [
    'standard_categories_0_to_4',
    'special_base_floor',
    'category_3_left_wall',
    'special_slots_1_2',
    'category_4_right_wall',
    'special_throne',
    'standard_categories_5_6',
    'special_slots_4_6',
    'category_7_top',
  ],

  // === Text Overlay ===
  // FUN_0044d296 (orchestrator) renders text from THRONE.txt file
  // @ line 7752: thunk_FUN_004a2379(&DAT_006558e8, "THRONE")
  // Text rendered in a rect (100, 0x78, 0x21C, 0x1C2) = (100, 120, 540, 450)
  // Shadow offset: (2, 2), colors: 0 (black shadow), 0xFF (white text)
  throneTextKey: 'THRONE',
  addToThroneTextKey: 'ADDTOTHRONE',
  textRect: { left: 100, top: 0x78, right: 0x21C, bottom: 0x1C2 },
  textShadowOffset: 2,
  textColorShadow: 0,
  textColorMain: 0xFF,

  // === Sound Effect ===
  // @ line 8814: thunk_FUN_0046e020(0xD, 1, 0, 0) — throne room sound
  // @ line 8760: thunk_FUN_0046e020(0x5E, 1, 0, 0) — invalid selection sound
  soundThroneRoom: 0x0D,
  soundInvalidSelection: 0x5E,

  // === Keyboard Hotkeys ===
  // @ FUN_0044f717 line 8755: if (0xCF < param_1 && param_1 < 0xD3)
  // Keys 0xD0, 0xD1, 0xD2 (arrow keys) trigger OK in view mode
  arrowKeyRange: { min: 0xD0, max: 0xD2 },
};


// ═══════════════════════════════════════════════════════════════════
// Throne Room Upgrade Selector — FUN_0044e790 (3336 bytes)
// Binary ref: block_00440000.c, lines 8264-8626
// Interactive UI for choosing which throne room component to upgrade.
// Displays 8 category highlight rectangles and 34 clickable
// component hotspots, each mapped to a category via a depth/priority
// table. The player clicks a component, and that category's upgrade
// level is incremented (or its special bitmask bit is set).
// ═══════════════════════════════════════════════════════════════════

export const THRONE_UPGRADE_SELECTOR = {
  sourceAddr: '0x0044E790',
  componentCount: 0x22,  // 34 interactive components

  // === Power Category Display Rectangles ===
  // local_360[0..0x1f]: 8 rectangles (4 ints each: x, y, w, h)
  // Used with DLL resources 0xAA + category (standard mode)
  // or 0xB2 + category (special mode) to show available upgrades
  categoryRects: [
    // idx 0: { x: 0xD4, y: 1, w: 0xB3, h: 0x127 }
    { idx: 0, x: 0xD4, y: 1, w: 0xB3, h: 0x127 },
    // idx 1: { x: 0x13, y: 0x11B, w: 0x24F, h: 0xC6 }
    { idx: 1, x: 0x13, y: 0x11B, w: 0x24F, h: 0xC6 },
    // idx 2: { x: 0xC6, y: 0x12F, w: 0xD7, h: 0xB1 }
    { idx: 2, x: 0xC6, y: 0x12F, w: 0xD7, h: 0xB1 },
    // idx 3: { x: 0xB, y: 1, w: 0x25F, h: 0x11E }
    { idx: 3, x: 0x0B, y: 1, w: 0x25F, h: 0x11E },
    // idx 4: { x: 0xBC, y: 0x12, w: 0xE6, h: 0x11B }
    { idx: 4, x: 0xBC, y: 0x12, w: 0xE6, h: 0x11B },
    // idx 5: { x: 1, y: 1, w: 0x260, h: 0x137 }
    { idx: 5, x: 1, y: 1, w: 0x260, h: 0x137 },
    // idx 6: { x: 0x11C, y: 0x102, w: 0x27, h: 0x39 }
    { idx: 6, x: 0x11C, y: 0x102, w: 0x27, h: 0x39 },
    // idx 7: { x: 1, y: 1, w: 0x280, h: 0x1E0 } — full screen fallback
    { idx: 7, x: 1, y: 1, w: 0x280, h: 0x1E0 },
  ],

  // === DLL Resource IDs for Category Highlight Overlays ===
  // Standard mode: 0xAA + category (when upgrade level < 4)
  //   @ line 8569: FUN_005bf5e1(local_364 + 0xAA, ...)
  //   Resources 0xAA-0xB1 for categories 0-7
  standardHighlightBase: 0xAA,

  // Special mode: 0xB2 + category (when special bitmask bit not set)
  //   @ line 8592: FUN_005bf5e1(local_364 + 0xB2, ...)
  //   Resources 0xB2-0xB8 for slots 0-6
  specialHighlightBase: 0xB2,

  // Base scene resource: 100 (same as renderer)
  baseSceneResource: 100,

  // === Special Upgrade Coordinates (7 entries) ===
  // local_2E0..local_274: coordinate rects for special upgrade highlights
  // Each has 4 ints: x, y, w, h
  // Accessed in special mode via: local_270 + slot*0x10 - 0x70
  specialUpgradeRects: [
    { idx: 0, x: 0x14, y: 0x13A, w: 0x24F, h: 0x28 },
    { idx: 1, x: 0x5F, y: 0x6D, w: 0x1A3, h: 0x5F },
    { idx: 2, x: 0x12, y: 0x103, w: 0x252, h: 0x2D },
    { idx: 3, x: 0xDE, y: 0xD4, w: 0xA2, h: 0x54 },
    { idx: 4, x: 0x7B, y: 0x125, w: 0x162, h: 0x23 },
    { idx: 5, x: 0x48, y: 0x125, w: 0x1C8, h: 0x27 },
    { idx: 6, x: 0x16, y: 0x16E, w: 0x249, h: 0x47 },
  ],

  // === Component Hotspot Table (34 entries) ===
  // local_234[0..0x87]: 34 entries of 4 ints each (x, y, w, h)
  // Defines the clickable regions for each interactive component
  // Each component maps to a category via the depth table below
  componentHotspots: [
    { idx: 0, x: 1, y: 2, w: 0x16, h: 0x19C },
    { idx: 1, x: 2, y: 0x194, w: 0x36, h: 0x48 },
    { idx: 2, x: 0x25C, y: 1, w: 0x23, h: 0x197 },
    { idx: 3, x: 0x23C, y: 0x195, w: 0x44, h: 0x49 },
    { idx: 4, x: 0x21D, y: 0x16D, w: 0x41, h: 0x46 },
    { idx: 5, x: 0x1C, y: 0x16E, w: 0x47, h: 0x44 },
    { idx: 6, x: 0x47, y: 0x124, w: 0x64, h: 0x27 },
    { idx: 7, x: 0x1AD, y: 0x124, w: 0x63, h: 0x27 },
    { idx: 8, x: 0x47, y: 0x124, w: 0x64, h: 0x27 },   // duplicate of 6
    { idx: 9, x: 0x1AD, y: 0x124, w: 0x63, h: 0x27 },   // duplicate of 7
    { idx: 10, x: 0x11C, y: 0x102, w: 0x27, h: 0x39 },
    { idx: 11, x: 0x25, y: 0x12, w: 0x2D, h: 0x120 },
    { idx: 12, x: 0x93, y: 0x12, w: 0x2C, h: 0x124 },
    { idx: 13, x: 0x19D, y: 0x14, w: 0x31, h: 0x121 },
    { idx: 14, x: 0x20B, y: 0x14, w: 0x2F, h: 0x11E },
    { idx: 15, x: 0x0E, y: 3, w: 0xCF, h: 0x0C },
    { idx: 16, x: 0x17F, y: 1, w: 0xD3, h: 0x0E },
    { idx: 17, x: 0xE3, y: 0xD4, w: 0x0E, h: 0x51 },
    { idx: 18, x: 0x16F, y: 0xD5, w: 0x0B, h: 0x52 },
    { idx: 19, x: 0xBE, y: 0x11, w: 0x15, h: 0x11A },
    { idx: 20, x: 0x185, y: 0x12, w: 0x1A, h: 0x119 },
    { idx: 21, x: 0xDE, y: 0x24, w: 0x96, h: 0x55 },
    { idx: 22, x: 0x11, y: 0x114, w: 0xC1, h: 0x19 },
    { idx: 23, x: 0x190, y: 0x107, w: 0xD0, h: 0x26 },
    { idx: 24, x: 0x5E, y: 0x75, w: 0x36, h: 0x47 },
    { idx: 25, x: 0x10B, y: 0x6C, w: 0x46, h: 0x5E },
    { idx: 26, x: 0x1CC, y: 0x75, w: 0x33, h: 0x49 },
    { idx: 27, x: 0x0B, y: 2, w: 0x93, h: 0x11B },
    { idx: 28, x: 0x1C2, y: 2, w: 0xA7, h: 0x11B },
    { idx: 29, x: 0x14, y: 0x13C, w: 0xB8, h: 0x22 },
    { idx: 30, x: 0x193, y: 0x13D, w: 0xCC, h: 0x23 },
    { idx: 31, x: 0xDE, y: 0x12F, w: 0xA8, h: 0xAF },
    { idx: 32, x: 0x13, y: 0x123, w: 0x250, h: 0xBD },
    { idx: 33, x: 0xD4, y: 1, w: 0xB3, h: 0x127 },
  ],

  // === Component-to-Category Depth/Priority Table (34 entries) ===
  // local_3ec[0..0x21]: maps each component index to a render priority.
  // Used with thunk_FUN_0046ace7 to register clickable regions with
  // their depth ordering and category assignment.
  // Higher values = rendered on top (checked first for clicks)
  componentDepth: [
    /* idx  0 */ 7,    // left wall strip
    /* idx  1 */ 7,    // bottom-left corner
    /* idx  2 */ 7,    // right wall strip
    /* idx  3 */ 7,    // bottom-right corner
    /* idx  4 */ 0x10, // right-side detail
    /* idx  5 */ 0x10, // left-side detail
    /* idx  6 */ 0x0F, // left floor border
    /* idx  7 */ 0x0F, // right floor border
    /* idx  8 */ 0x0E, // left floor border (alt)
    /* idx  9 */ 0x0E, // right floor border (alt)
    /* idx 10 */ 6,    // center throne
    /* idx 11 */ 5,    // left column 1
    /* idx 12 */ 5,    // left column 2
    /* idx 13 */ 5,    // right column 1
    /* idx 14 */ 5,    // right column 2
    /* idx 15 */ 5,    // left top trim
    /* idx 16 */ 5,    // right top trim
    /* idx 17 */ 0x0D, // left pillar
    /* idx 18 */ 0x0D, // right pillar
    /* idx 19 */ 4,    // left inner column
    /* idx 20 */ 4,    // right inner column
    /* idx 21 */ 4,    // center arch
    /* idx 22 */ 0x0C, // left floor panel
    /* idx 23 */ 0x0C, // right floor panel
    /* idx 24 */ 0x0B, // left statue
    /* idx 25 */ 0x0B, // center statue
    /* idx 26 */ 0x0B, // right statue
    /* idx 27 */ 3,    // left background
    /* idx 28 */ 3,    // right background
    /* idx 29 */ 10,   // left floor detail
    /* idx 30 */ 10,   // right floor detail
    /* idx 31 */ 2,    // center floor
    /* idx 32 */ 1,    // full floor
    /* idx 33 */ 0,    // full background
  ],

  // === Upgrade Level Constraints ===
  // Standard mode (this+0x1928 == 0): upgrade if level < 4
  //   @ line 8568: if (DAT_0064ca93[civ*0x594 + cat] < 4)
  //   Max selectable category index: 9 (0-9)
  //   @ line 8702: if (9 < *(local_8 + 0x192c))
  maxStandardCategory: 9,
  maxUpgradeLevel: 4,  // levels 0-3 are upgradable; 4 is max

  // Special mode (this+0x1928 != 0): set bitmask bit if not already set
  //   @ line 8712: if (category < 10) → invalid (must be >= 10, subtract 10)
  //   Category remapping: displayed_cat - 10 = actual special slot
  specialCategoryOffset: 10,
  numSpecialSlots: 7,

  // Special slots 4 and 5 are mutually exclusive:
  //   @ line 8718: if (cat == 4 || cat == 5) check both bits 0x10 and 0x20
  //   If both set, reject. If one set, redirect to the other.
  mutuallyExclusiveSlots: [4, 5],
  mutuallyExclusiveBits: [0x10, 0x20],

  // === State Offsets (relative to this/in_ECX) ===
  // this+0x500: civId being shown
  // this+0x1924: view mode (0 = view, 1 = selection)
  // this+0x1928: upgrade mode (0 = standard, nonzero = special)
  // this+0x192c: selected category index
  civIdOffset: 0x500,
  viewModeOffset: 0x1924,
  upgradeModeOffset: 0x1928,
  selectedCategoryOffset: 0x192C,

  // === Upgrade Application ===
  // Standard: DAT_0064ca93[civ*0x594 + selectedCat] += 1
  //   @ line 8822-8823
  // Special: DAT_0064ca9b[civ*0x594] |= (1 << selectedCat)
  //   @ line 8826-8828
};
