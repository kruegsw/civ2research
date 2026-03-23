// ═══════════════════════════════════════════════════════════════════
// block_00570000.js — Mechanical transpilation of block_00570000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00570000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00570000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8, s16, u16, s32, u32, w16, w32,
  DAT_006560f0, DAT_0064b1bc, DAT_0064c600, DAT_0064f340,
  DAT_00627cc0,
  getTileOffset, tileRead, tileWrite,
} from './mem.js';

import {
  FUN_004087c0, FUN_005ae052, FUN_005b8931,
  FUN_005b94d5, FUN_005b89bb, FUN_005b89e4,
  FUN_005b8a1d, FUN_005b8ca6,
  FUN_004bd9f0,
} from './fn_utils.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// ═══════════════════════════════════════════════════════════════════

let DAT_006d1da0 = 0;    // current player civ
let DAT_00655b0b = 0;    // human players bitmask
let DAT_00655b0a = 0;    // alive civs bitmask
let DAT_00655b02 = 0;    // multiplayer player count
let DAT_00655b08 = 0;    // difficulty level
let DAT_00654fa8 = 0;    // ai_override / autoplay flag
let DAT_00655af8 = 0;    // current turn number
let DAT_00655afa = 0;    // game year/era
let DAT_00655af0 = 0;    // game options bitfield
let DAT_00655ae8 = 0;    // map flags (bit 15 = flat earth)
let DAT_00655b18 = 0;    // max cities
let DAT_00655b16 = 0;    // max units
let DAT_00655b40 = 0;    // scenario flag
let DAT_006d1164 = 0;    // total tiles
let DAT_006d1160 = 0;    // map width
let DAT_00655b14 = 0;    // number of civs
let DAT_0064bc60 = 0;    // scenario flags2
let DAT_006acb38 = 0;    // multiplayer response
let DAT_006acb30 = 0;    // terrain type at combat location
let DAT_006acb08 = 0;    // city index at combat location
let DAT_006acb34 = 0;    // defense multiplier
let DAT_006acb0c = 0;    // kill count
let DAT_0062edf8 = 0;    // flag: in city capture processing
let DAT_00627670 = 0;    // events enabled flag
let DAT_006ad908 = 0;    // animation active flag
let DAT_006c926c = 0;    // network interrupt flag
let DAT_00655c21 = 0;    // barbarian civ index
let DAT_0064bcdb = 0;    // unit move range

// ── Dialog/UI state (stubs) ──
let DAT_006ac874 = 0;
let DAT_006ac878 = 0;
let DAT_006ac87c = 0;
let DAT_006ac888 = null;
let DAT_006ac88c = 0;
let DAT_006ac890 = 0;
let DAT_006ac894 = 0;
let DAT_006ac898 = 0;
let DAT_006ac8a0 = 0;
let DAT_006ac8a4 = 0;
let DAT_006ac89c = 0;
let DAT_006ac924 = 0;
let DAT_006ac120 = 0;
let DAT_006ac118 = 0;
let DAT_006ac124 = 0;
let DAT_006ac0f0 = 0;
let DAT_006ac0f4 = 0;
let DAT_006ac0a0 = 0;
let DAT_006ac0a4 = 0;
let DAT_006ac880 = 0;
let DAT_006ac884 = 0;
let DAT_006ac11c = 0;
let DAT_006ac2d4 = 0;
let DAT_006ac2d8 = 0;
let DAT_006ac2dc = 0;
let DAT_006ac2c8 = 0;
let DAT_006ac2cc = 0;
let DAT_006ac2d0 = 0;
let DAT_006a4f88 = 0;
let DAT_00634000 = 0;
let DAT_00634004 = 0;
let DAT_00634008 = 0;
let DAT_0063400c = 0;
let DAT_00634304 = 0;
let DAT_00634308 = 0;
let DAT_0063430c = null;
let DAT_00633598 = 0;
let DAT_0063359c = 0;
let DAT_006ab198 = 0;
let DAT_006ab19c = 0;
let DAT_00628420 = 0;

// ── Large data arrays (stubs) ──
let DAT_0064c6c0 = new Uint8Array(8 * 0x594);  // diplomacy array
let DAT_0064f348 = new Uint8Array(256 * 0x58);  // city data
let DAT_006560f6 = new Uint8Array(2048 * 0x20); // unit data (type/owner)
let DAT_00655c22 = new Uint8Array(8);            // civ epoch/era
let DAT_0064c488 = new Uint32Array(256);         // improvement data


// ═══════════════════════════════════════════════════════════════════
// FUN_0057075c — SEH_cleanup_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057075c() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570772 — SEH_epilog_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570772() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570780 — load_terrain1_bitmap
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00570780 (2082 bytes)
export function FUN_00570780() {
  let uVar1, iVar2, uVar3;
  let local_570 = new Uint8Array(16), local_580 = new Uint8Array(16);
  let local_590 = new Uint8Array(16), local_5a0 = new Uint8Array(16);
  let local_5b0 = new Uint8Array(16), local_5c0 = new Uint8Array(16);
  let local_5d0 = new Uint8Array(16), local_5e0 = new Uint8Array(16);
  let local_5f0 = new Uint8Array(16), local_600 = new Uint8Array(16);
  let local_610 = new Uint8Array(16), local_620 = new Uint8Array(16);
  let local_630 = new Uint8Array(16), local_640 = new Uint8Array(16);
  let local_650 = new Uint8Array(16), local_660 = new Uint8Array(16);
  let local_670 = new Uint8Array(16), local_680 = new Uint8Array(16);
  let local_550 = new Uint8Array(1076);
  let local_560, local_55c, local_558, local_554;
  let local_18, local_14;

  // DEVIATION: SEH (FS_OFFSET restore)
  FUN_005c64da(); // DEVIATION: GDI init
  _getcwd(0, 0x104); // DEVIATION: save current dir
  _chdir(DAT_0064bb08); // DEVIATION: change to game dir
  iVar2 = load_bitmap(DAT_006ac0a8, "TERRAIN1.BMP", 10, 0xc0, local_550); // DEVIATION: Win32
  if (iVar2 === 0) {
    iVar2 = FUN_005bf071("TERRAIN1.GIF", 10, 0xc0, local_550); // DEVIATION: GIF loader
    if (iVar2 === 0) {
      _chdir(DAT_00655020); // DEVIATION: chdir to install dir
      FUN_005bf071("TERRAIN1.GIF", 10, 0xc0, local_550); // DEVIATION: GIF fallback
    } else {
      _chdir(DAT_00655020); // DEVIATION: chdir
    }
  } else {
    _chdir(DAT_00655020); // DEVIATION: chdir
  }
  // Extract 11 terrain sprites — 3 columns per row
  local_554 = 1;
  local_55c = 0x83;
  local_560 = 0xc4;
  local_558 = 1;
  for (local_18 = 0; local_18 < 0xb; local_18 = local_18 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
    FUN_005cef31(local_570, DAT_006ac0a8, local_554, local_558);
    FUN_005cef31(local_580, DAT_006ac0a8, local_554, local_558);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_55c, local_558, uVar3);
    FUN_005cef31(local_590, DAT_006ac0a8, local_55c, local_558);
    FUN_005cef31(local_5a0, DAT_006ac0a8, local_55c, local_558);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_560, local_558, uVar3);
    FUN_005cef31(local_5b0, DAT_006ac0a8, local_560, local_558);
    FUN_005cef31(local_5c0, DAT_006ac0a8, local_560, local_558);
    local_558 = local_558 + 0x21;
  }
  // Extract 3 resource sprites
  local_554 = 0x1c8;
  local_558 = 100;
  for (local_14 = 0; local_14 < 3; local_14 = local_14 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
    FUN_005cef31(local_5d0, DAT_006ac0a8, local_554, local_558);
    FUN_005cef31(local_5e0, DAT_006ac0a8, local_554, local_558);
    local_558 = local_558 + 0x21;
  }
  // Extract 3 individual sprites
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
  FUN_005cef31(local_5f0, DAT_006ac0a8, local_554, local_558);
  FUN_005cef31(local_600, DAT_006ac0a8, local_554, local_558);
  local_558 = local_558 + 0x21;
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
  FUN_005cef31(local_610, DAT_006ac0a8, local_554, local_558);
  FUN_005cef31(local_620, DAT_006ac0a8, local_554, local_558);
  local_558 = local_558 + 0x21;
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
  FUN_005cef31(local_630, DAT_006ac0a8, local_554, local_558);
  FUN_005cef31(local_640, DAT_006ac0a8, local_554, local_558);
  // Extract 9 pairs of overlay sprites
  local_558 = 0x16c;
  local_554 = 1;
  for (local_14 = 0; local_14 < 9; local_14 = local_14 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, local_558, uVar3);
    FUN_005cef31(local_650, DAT_006ac0a8, local_554, local_558);
    FUN_005cef31(local_660, DAT_006ac0a8, local_554, local_558);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_554, local_558 + 0x21, uVar3);
    FUN_005cef31(local_670, DAT_006ac0a8, local_554, local_558 + 0x21);
    FUN_005cef31(local_680, DAT_006ac0a8, local_554, local_558 + 0x21);
    local_554 = local_554 + 0x41;
  }
  // Save modified bitmap back to file
  _chdir(DAT_0064bb08); // DEVIATION: chdir
  iVar2 = FUN_00415133("TERRAIN1.BMP"); // DEVIATION: file exists check
  if (iVar2 !== 0) {
    iVar2 = FID_conflict__remove("TERRAIN1.BMP"); // DEVIATION: delete
    if (iVar2 !== 0) {
      _chdir(0); // DEVIATION: restore dir
      FUN_004083f0();
      FUN_00570fa2();
      FUN_00570fb8();
      return;
    }
  }
  FUN_write_bitmap_data(DAT_006ac0a8, "TERRAIN1.BMP", 10, 0xc0, local_550); // DEVIATION: save BMP
  _chdir(0); // DEVIATION: restore dir
  FUN_004083f0();
  // DEVIATION: SEH cleanup
  FUN_00570fa2();
  FUN_00570fb8();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570fa2 — SEH_cleanup_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570fa2() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570fb8 — SEH_epilog_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570fb8() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570fc6 — load_terrain2_bitmap
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00570fc6 (2342 bytes)
export function FUN_00570fc6() {
  let uVar1, iVar2, uVar3;
  let local_570 = new Uint8Array(16), local_580 = new Uint8Array(16);
  let local_590 = new Uint8Array(16), local_5a0 = new Uint8Array(16);
  let local_5b0 = new Uint8Array(16), local_5c0 = new Uint8Array(16);
  let local_5d0 = new Uint8Array(16), local_5e0 = new Uint8Array(16);
  let local_5f0 = new Uint8Array(16), local_600 = new Uint8Array(16);
  let local_610 = new Uint8Array(16), local_620 = new Uint8Array(16);
  let local_630 = new Uint8Array(16), local_640 = new Uint8Array(16);
  let local_54c = new Uint8Array(1076);
  let local_560, local_55c, local_558, local_554, local_550;
  let local_14;

  // DEVIATION: SEH (FS_OFFSET restore)
  FUN_005c64da(); // DEVIATION: GDI init
  _getcwd(0, 0x104); // DEVIATION: save dir
  _chdir(DAT_0064bb08); // DEVIATION: chdir
  iVar2 = load_bitmap(DAT_006ac0a8, "TERRAIN2.BMP", 10, 0xc0, local_54c); // DEVIATION: Win32
  if (iVar2 === 0) {
    iVar2 = FUN_005bf071("TERRAIN2.GIF", 10, 0xc0, local_54c); // DEVIATION: GIF
    if (iVar2 === 0) {
      _chdir(DAT_00655020); // DEVIATION: chdir
      FUN_005bf071("TERRAIN2.GIF", 10, 0xc0, local_54c); // DEVIATION: GIF fallback
    } else {
      _chdir(DAT_00655020); // DEVIATION: chdir
    }
  } else {
    _chdir(DAT_00655020); // DEVIATION: chdir
  }
  // Extract 16 terrain2 sprites — 8 per row, 4 columns per sprite
  local_550 = 1;
  local_55c = 0x43;
  for (local_14 = 0; local_14 < 0x10; local_14 = local_14 + 1) {
    local_554 = (local_14 & 7) * 0x41;
    local_558 = (local_14 >> 3) * 0x21;
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550 + local_554, local_55c + local_558, uVar3);
    FUN_005cef31(local_570, DAT_006ac0a8, local_550 + local_554, local_55c + local_558);
    FUN_005cef31(local_580, DAT_006ac0a8, local_550 + local_554, local_55c + local_558);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0x42, uVar3);
    FUN_005cef31(local_590, DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0x42);
    FUN_005cef31(local_5a0, DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0x42);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0x84, uVar3);
    FUN_005cef31(local_5b0, DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0x84);
    FUN_005cef31(local_5c0, DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0x84);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0xc6, uVar3);
    FUN_005cef31(local_5d0, DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0xc6);
    FUN_005cef31(local_5e0, DAT_006ac0a8, local_550 + local_554, local_55c + local_558 + 0xc6);
  }
  // Extract 4 additional sprites
  local_550 = 1;
  local_55c = 0x14b;
  for (local_14 = 0; local_14 < 4; local_14 = local_14 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_55c, uVar3);
    FUN_005cef31(local_5f0, DAT_006ac0a8, local_550, local_55c);
    FUN_005cef31(local_600, DAT_006ac0a8, local_550, local_55c);
    local_550 = local_550 + 0x41;
  }
  // Extract 8 directional overlay sprites (4 per direction)
  local_550 = 1;
  local_55c = 0x1ad;
  for (local_560 = 0; local_560 < 8; local_560 = local_560 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_55c, uVar3);
    FUN_005cef31(local_610, DAT_006ac0a8, local_550, local_55c);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550 + 0x21, local_55c + 0x22, uVar3);
    FUN_005cef31(local_620, DAT_006ac0a8, local_550 + 0x21, local_55c + 0x22);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_55c + 0x11, uVar3);
    FUN_005cef31(local_630, DAT_006ac0a8, local_550, local_55c + 0x11);
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_550, local_55c + 0x22, uVar3);
    FUN_005cef31(local_640, DAT_006ac0a8, local_550, local_55c + 0x22);
    local_550 = local_550 + 0x42;
  }
  // Save modified bitmap
  _chdir(DAT_0064bb08); // DEVIATION: chdir
  iVar2 = FUN_00415133("TERRAIN2.BMP"); // DEVIATION: file exists
  if (iVar2 !== 0) {
    iVar2 = FID_conflict__remove("TERRAIN2.BMP"); // DEVIATION: delete
    if (iVar2 !== 0) {
      _chdir(0); // DEVIATION: restore dir
      FUN_004083f0();
      FUN_005718ec();
      FUN_00571902();
      return;
    }
  }
  FUN_write_bitmap_data(DAT_006ac0a8, "TERRAIN2.BMP", 10, 0xc0, local_54c); // DEVIATION: save BMP
  _chdir(0); // DEVIATION: restore dir
  FUN_004083f0();
  // DEVIATION: SEH cleanup
  FUN_005718ec();
  FUN_00571902();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005718ec — SEH_cleanup_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_005718ec() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571902 — SEH_epilog_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571902() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571910 — load_icons_bitmap
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00571910 (666 bytes)
export function FUN_00571910() {
  let uVar1, iVar2, uVar3;
  let local_568 = new Uint8Array(16);
  let local_554 = new Uint8Array(1076);
  let local_558, local_120;
  let local_18, local_14;

  // DEVIATION: SEH (FS_OFFSET restore)
  FUN_005c64da(); // DEVIATION: GDI init
  _getcwd(0, 0x104); // DEVIATION: save dir
  _chdir(DAT_0064bb08); // DEVIATION: chdir
  iVar2 = load_bitmap(DAT_006ac0a8, "ICONS.BMP", 10, 0xc0, local_554); // DEVIATION: Win32
  if (iVar2 === 0) {
    iVar2 = FUN_005bf071("ICONS.GIF", 10, 0xc0, local_554); // DEVIATION: GIF
    if (iVar2 === 0) {
      _chdir(DAT_00655020);
      FUN_005bf071("ICONS.GIF", 10, 0xc0, local_554);
    } else {
      _chdir(DAT_00655020);
    }
  } else {
    _chdir(DAT_00655020);
  }
  // Extract 4x5 grid of icon sprites
  local_558 = 0xd3;
  for (local_14 = 0; local_14 < 4; local_14 = local_14 + 1) {
    local_120 = 0x157;
    for (local_18 = 0; local_18 < 5; local_18 = local_18 + 1) {
      uVar1 = FUN_00417f70();
      uVar3 = FUN_004bb540(uVar1);
      uVar3 = FUN_004a6980(uVar3);
      FUN_005a9abf(DAT_006ac0a8, local_120, local_558, uVar3);
      FUN_005cef31(local_568, DAT_006ac0a8, local_120, local_558);
      local_120 = local_120 + 0x25;
    }
    local_558 = local_558 + 0x15;
  }
  // Save modified bitmap
  _chdir(DAT_0064bb08);
  iVar2 = FUN_00415133("ICONS.BMP");
  if (iVar2 !== 0) {
    iVar2 = FID_conflict__remove("ICONS.BMP");
    if (iVar2 !== 0) {
      _chdir(0);
      FUN_004083f0();
      FUN_00571baa();
      FUN_00571bc0();
      return;
    }
  }
  FUN_write_bitmap_data(DAT_006ac0a8, "ICONS.BMP", 10, 0xc0, local_554); // DEVIATION: save BMP
  _chdir(0);
  FUN_004083f0();
  FUN_00571baa();
  FUN_00571bc0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571baa — SEH_cleanup_4
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571baa() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571bc0 — SEH_epilog_4
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571bc0() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571bce — load_icons_bitmap_2
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00571bce (1175 bytes)
export function FUN_00571bce() {
  let uVar1, iVar2, uVar3;
  let local_568 = new Uint8Array(16), local_578 = new Uint8Array(16);
  let local_588 = new Uint8Array(16), local_598 = new Uint8Array(16);
  let local_550 = new Uint8Array(1076);
  let local_558, local_554, local_11c;
  let local_14;

  // DEVIATION: SEH (FS_OFFSET restore)
  FUN_005c64da(); // DEVIATION: GDI init
  _getcwd(0, 0x104); // DEVIATION: save dir
  _chdir(DAT_0064bb08); // DEVIATION: chdir
  iVar2 = load_bitmap(DAT_006ac0a8, "ICONS.BMP", 10, 0xc0, local_550); // DEVIATION: Win32
  if (iVar2 === 0) {
    iVar2 = FUN_005bf071("ICONS.GIF", 10, 0xc0, local_550);
    if (iVar2 === 0) {
      _chdir(DAT_00655020);
      FUN_005bf071("ICONS.GIF", 10, 0xc0, local_550);
    } else {
      _chdir(DAT_00655020);
    }
  } else {
    _chdir(DAT_00655020);
  }
  // Extract 0x27 (39) sprites — 8 per row, wrapping
  local_11c = 0x157;
  local_554 = 1;
  local_558 = 0;
  for (local_14 = 1; local_14 < 0x27; local_14 = local_14 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_11c, local_554, uVar3);
    FUN_005cef31(local_568, DAT_006ac0a8, local_11c, local_554);
    local_11c = local_11c + 0x25;
    local_558 = local_558 + 1;
    if (7 < local_558) {
      local_558 = 0;
      local_554 = local_554 + 0x15;
      local_11c = 0x157;
    }
  }
  // Extract 0x1c (28) more sprites — 7 per row
  local_11c = 0x157;
  local_554 = 0x6a;
  local_558 = 0;
  for (local_14 = 0; local_14 < 0x1c; local_14 = local_14 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_11c, local_554, uVar3);
    FUN_005cef31(local_578, DAT_006ac0a8, local_11c, local_554);
    local_11c = local_11c + 0x25;
    local_558 = local_558 + 1;
    if (6 < local_558) {
      local_558 = 0;
      local_554 = local_554 + 0x15;
      local_11c = 0x157;
    }
  }
  // Extract 1 individual sprite
  uVar1 = FUN_00417f70();
  uVar3 = FUN_004bb540(uVar1);
  uVar3 = FUN_004a6980(uVar3);
  FUN_005a9abf(DAT_006ac0a8, 199, 0x100, uVar3);
  FUN_005cef31(local_588, DAT_006ac0a8, 199, 0x100);
  // Extract 8 direction sprites
  local_11c = 1;
  local_554 = 0x164;
  for (local_14 = 0; local_14 < 8; local_14 = local_14 + 1) {
    uVar1 = FUN_00417f70();
    uVar3 = FUN_004bb540(uVar1);
    uVar3 = FUN_004a6980(uVar3);
    FUN_005a9abf(DAT_006ac0a8, local_11c, local_554, uVar3);
    FUN_005cef31(local_598, DAT_006ac0a8, local_11c, local_554);
    local_11c = local_11c + 0x21;
  }
  // Save modified bitmap
  _chdir(DAT_0064bb08);
  iVar2 = FUN_00415133("ICONS.BMP");
  if (iVar2 !== 0) {
    iVar2 = FID_conflict__remove("ICONS.BMP");
    if (iVar2 !== 0) {
      _chdir(0);
      FUN_004083f0();
      FUN_00572065();
      FUN_0057207b();
      return;
    }
  }
  FUN_write_bitmap_data(DAT_006ac0a8, "ICONS.BMP", 10, 0xc0, local_550); // DEVIATION: save BMP
  _chdir(0);
  FUN_004083f0();
  FUN_00572065();
  FUN_0057207b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572065 — SEH_cleanup_5
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572065() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057207b — SEH_epilog_5
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057207b() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572089 — setup_dialog_window
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00572089 (546 bytes)
export function FUN_00572089(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // C: Map view dialog setup — initializes dialog state globals
  if (param_1 === 0) {
    // C: FUN_005f22d0(&DAT_006ac2e4, ""); — empty title
  } else {
    // C: FUN_005f22d0(&DAT_006ac2e4, param_1); — set title
  }
  // C: Set dialog pointers
  DAT_006ac2c4 = param_2;
  DAT_006ac2c8 = param_8;
  DAT_006ac2cc = param_9;
  DAT_006ac2d0 = param_7;
  DAT_006ac3ac = 0;
  DAT_006ac458 = 0;
  // C: Override with default sounds if flag 4
  if ((param_2 & 4) !== 0) {
    DAT_006ac2c8 = DAT_00633598;
    DAT_006ac2cc = DAT_0063359c;
  }
  // C: Window style flags
  let local_8 = ((param_2 & 8) === 0) ? 0x202 : 0x802;
  if (DAT_006ac2c8 !== 0) { local_8 = local_8 | 0x400; }
  if (param_7 !== 0) { local_8 = local_8 | 0x1000; }
  // C: Position adjustments
  if ((param_2 & 2) === 0) {
    param_5 = param_5 + DAT_006ac2cc * 2;
    param_6 = param_6 + DAT_006ac2c8 + DAT_006ac2cc;
  }
  if ((param_2 & 1) !== 0) {
    param_3 = (DAT_006ab198 >> 1) - (param_5 >> 1);
    param_4 = (DAT_006ab19c >> 1) - (param_6 >> 1);
  }
  let local_c = (DAT_006a4f88 === 0) ? 0 : DAT_006a4f88 + 0x48;
  // DEVIATION: MFC — FUN_005bb4ae creates window
  FUN_005bb4ae(0, local_8, param_3, param_4, param_5, param_6, 0, local_c);
  if (DAT_006ac2c8 !== 0) { FUN_00497d00(DAT_006ac2c8); }
  if (DAT_006ac2d0 !== 0) { FUN_004cff70(DAT_006ac2d0); }
  FUN_00552ed2(); // DEVIATION: MFC — show dialog
  FUN_0059d3c9(0); // DEVIATION: sound
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005722ab — invalidate_map_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_005722ab() {
  // UI display invalidation — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572364 — clear_map_dirty_flag
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572364() {
  DAT_006ac88c = 0;
  // CRichEditDoc::InvalidateObjectCache — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572389 — refresh_map_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572389() {
  // UI map refresh — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005723ee — draw_map_controls
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_005723ee (556 bytes)
export function FUN_005723ee() {
  let local_24, local_20, local_1c, local_18;
  let local_14 = new Uint8Array(16);

  // Draw primary color swatch
  if (DAT_00634000 === 0) { local_18 = DAT_006ac874; }
  else { local_18 = DAT_00634000; }
  FUN_005a9abf(DAT_006ac1b0, DAT_006ac2d4 + 0x142, DAT_006ac2d8 + 0xac, 0x20, 0x20, local_18); // DEVIATION: blit
  FUN_005a9964(DAT_006ac1b0, DAT_006ac2d4 + 0x142, DAT_006ac2d8 + 0xac, 0x20, 0x20, 10); // DEVIATION: border

  // Draw secondary color swatch
  if (DAT_00634004 === 0) { local_1c = DAT_006ac874; }
  else { local_1c = DAT_00634004; }
  FUN_005a9abf(DAT_006ac1b0, DAT_006ac2d4 + 0x14a, DAT_006ac2d8 + 0xb4, 0x10, 0x10, local_1c);
  FUN_005a9964(DAT_006ac1b0, DAT_006ac2d4 + 0x14a, DAT_006ac2d8 + 0xb4, 0x10, 0x10, 10);

  // Draw tertiary color swatch
  if (DAT_00634008 === 0) { local_20 = DAT_006ac874; }
  else { local_20 = DAT_00634008; }
  FUN_005a9abf(DAT_006ac1b0, DAT_006ac2d4 + 0x11e, DAT_006ac2d8 + 0xac, 0x20, 0x20, local_20);
  FUN_005a9964(DAT_006ac1b0, DAT_006ac2d4 + 0x11e, DAT_006ac2d8 + 0xac, 0x20, 0x20, 10);

  // Draw quaternary color swatch (if not in mode 0xb)
  if (DAT_006ac924 !== 0xb) {
    if (DAT_0063400c === 0) { local_24 = DAT_006ac874; }
    else { local_24 = DAT_0063400c; }
    FUN_005a9abf(DAT_006ac1b0, DAT_006ac2d4 + 0x166, DAT_006ac2d8 + 0xac, 0x20, 0x20, local_24);
    FUN_005a9964(DAT_006ac1b0, DAT_006ac2d4 + 0x166, DAT_006ac2d8 + 0xac, 0x20, 0x20, 10);
  }
  // Invalidate the color swatch area
  FUN_004086c0(local_14, DAT_006ac2d4 + 0x11e, DAT_006ac2d8 + 0xac, 0x68, 0x20);
  FUN_00408490(local_14); // DEVIATION: MFC invalidate rect
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057261a — draw_color_swatch
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_0057261a (294 bytes)
export function FUN_0057261a(param_1, param_2, param_3, param_4) {
  let iVar1, iVar2;
  let uVar3;
  let local_14 = new Uint8Array(16);

  if (9 < param_4 && param_4 < 0xca) {
    uVar3 = (param_4 - 10) >> 31;
    iVar1 = ((((param_4 - 10) ^ uVar3) - uVar3) & 0x1f ^ uVar3) - uVar3;
    iVar2 = (param_4 - 10 + ((param_4 - 10) >> 31 & 0x1f)) >> 5;
    FUN_004086c0(local_14, iVar1 * 0xc + param_2, iVar2 * 0xc + param_3, 10, 10);
    FUN_0040fdb0(DAT_006ac1b0, local_14, param_4); // DEVIATION: fill rect
    FUN_005a99fc(DAT_006ac1b0, local_14, 10, 10); // DEVIATION: draw border
    FUN_004086c0(local_14, iVar1 * 0xc + param_2 - 1, iVar2 * 0xc + param_3 - 1, 0xc, 0xc);
    if (param_4 === DAT_00634000 || param_4 === DAT_00634004) {
      FUN_005a99fc(param_1, local_14, 0x29, 0x29); // DEVIATION: highlight border
    } else {
      FUN_005a99fc(param_1, local_14, 0x1d, 0x1d); // DEVIATION: normal border
    }
    FUN_00408490(local_14); // DEVIATION: MFC invalidate
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572740 — hit_test_map_region
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572740(param_1, param_2) {
  let iVar1;

  param_1 = param_1 + -0x11e;
  param_2 = param_2 + -0x14;
  if ((((param_1 < 0) || (0x6c < param_1)) || (param_2 < 0)) ||
     (((0xbe < param_2 || (0x20 < param_1 % 0x24)) || (0x20 < param_2 % 0x26)))) {
    iVar1 = -1;
  } else {
    iVar1 = ((param_1 / 0x24) | 0) + (((param_2 / 0x26) | 0) * 3);
  }
  return iVar1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005727d8 — setup_map_editor_colors
// ═══════════════════════════════════════════════════════════════════
export function FUN_005727d8() {
  // UI setup — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572887 — get_map_editor_tile_rect
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00572887 (1295 bytes)
export function FUN_00572887(param_1, param_2) {
  // C: Renders a map tile at (param_1, param_2) with terrain bitmap
  // C: Uses DAT_006ac124 (scroll mode), DAT_006ac894/006ac874 (bitmap handles)
  // C: Calls FUN_005c0c5d (draw terrain), FUN_004086c0 (calc rect),
  //    FUN_005cd5ba/FUN_005cd775 (scale/blit bitmap), FUN_005cdb33 (transparent blit)
  // C: Writes to DAT_006ac108 (tile rect buffer)
  // DEVIATION: GDI rendering — cannot draw without device context
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572da0 — draw_map_editor_cursor
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00572da0 (607 bytes)
export function FUN_00572da0() {
  // C: Draws map view overlay — cursor rectangle + border lines
  // C: FUN_005bb574 init, reads DAT_006ac0f0/f4 (cursor pos), DAT_006ac2d4/d8 (viewport)
  // C: Draws border rectangles around map area via FUN_004086c0 + FUN_0040fdb0
  // C: Draws cursor highlight with different colors (0x6a, 10, 0x29)
  // C: FUN_005c00ce/005c0073 (begin/end paint), FUN_00408460 (invalidate)
  // C: No game state DAT_ writes — pure rendering
  // DEVIATION: GDI rendering
  FUN_005bb574(); // DEVIATION: MFC init
  FUN_00408460(); // DEVIATION: MFC invalidate
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572fff — handle_map_editor_click
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00572fff (2685 bytes)
export function FUN_00572fff(param_1, param_2) {
  let uVar1, uVar2, uVar5;
  let iVar4, iVar6;
  let local_70, local_68, local_6c, local_64, local_60;

  // DEVIATION: SEH, CString, SetCapture
  param_1 = param_1 - DAT_006ac2d4;
  param_2 = param_2 - DAT_006ac2d8;
  uVar5 = FUN_00572740(param_1, param_2); // hit test
  uVar2 = DAT_006ac0f4;
  uVar1 = DAT_006ac0f0;
  switch (uVar5) {
  case 0: // color palette click
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
    // DEVIATION: GetKeyState — check mouse buttons
    // C: swaps DAT_00634004/00634008 or DAT_00634000/0063400c based on button
    FUN_005723ee();
    FUN_0057261a(0, DAT_006ac2d4 + 10, DAT_006ac2d8 + 0xe0, 0);
    param_2 = 0; param_1 = 0;
    break;
  case 1: // left panel
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = 1; DAT_006ac118 = 1;
    break;
  case 2: // right panel
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = 2; DAT_006ac118 = 2;
    break;
  case 3: // map area — scroll/pan
    local_68 = DAT_006ac0f4; local_6c = DAT_006ac0f0;
    DAT_006ac0f4 = DAT_006ac0a4; DAT_006ac0f0 = DAT_006ac0a0;
    DAT_006ac0a4 = uVar2; DAT_006ac0a0 = uVar1;
    // DEVIATION: GDI — FUN_005cdf50, FUN_005cec44, FUN_005cef66, FUN_005cf23f rendering
    FUN_00574239();
    if (DAT_006ac120 === 3) { FUN_00572da0(); }
    break;
  case 4: // cancel
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = 0;
    break;
  case 5: // zoom in
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
    FUN_00572389(); FUN_005727d8(); FUN_00574239();
    break;
  case 6: // zoom out
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
    FUN_00572389(); FUN_005c044a(DAT_00634000, DAT_00634004); FUN_00574239();
    break;
  case 7: // rotate
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
    FUN_00572389();
    FUN_005c044a(DAT_00634004, 1);
    FUN_005c044a(DAT_00634000, DAT_00634004);
    FUN_005c044a(1, DAT_00634000);
    FUN_00574239();
    break;
  case 8: // settings
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
    show_messagebox_6267();
    break;
  case 9: // toggle mode 0
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118; DAT_006ac124 = 0;
    break;
  case 10: // toggle mode 1
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118; DAT_006ac124 = 1;
    break;
  case 11: // toggle mode 2
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118; DAT_006ac124 = 2;
    break;
  case 12: // color swap forward
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
    // DEVIATION: GetKeyState — swap DAT_00634004/00634008 or DAT_00634000/0063400c
    FUN_005723ee();
    FUN_0057261a(0, DAT_006ac2d4 + 10, DAT_006ac2d8 + 0xe0, 0);
    FUN_0057261a(0, DAT_006ac2d4 + 10, DAT_006ac2d8 + 0xe0, 0);
    param_2 = 0; param_1 = 0;
    break;
  case 13: // no action
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
    break;
  case 14: // minimap select
    if (DAT_006ac924 === 0xb) {
      FUN_00572389();
      DAT_006ac120 = 3;
      DAT_006ac0f4 = FUN_005adfa0(DAT_006ac0f4, 5, 0x2f);
      DAT_006ac0f0 = FUN_005adfa0(DAT_006ac0f0, 0, 0xe);
      FUN_00572da0();
    } else {
      if (DAT_006ac120 === 3) { FUN_005bb574(); }
      DAT_006ac120 = DAT_006ac118;
      // DEVIATION: GetKeyState color swap
      FUN_005723ee();
      FUN_0057261a(0, DAT_006ac2d4 + 10, DAT_006ac2d8 + 0xe0, 0);
      FUN_0057261a(0, DAT_006ac2d4 + 10, DAT_006ac2d8 + 0xe0, 0);
      param_2 = 0; param_1 = 0;
    }
    break;
  }
  // C line 1335: handle clicks in map area
  if (param_1 >= 9 && param_1 <= 0x187 && param_2 >= 0xdf && param_2 <= 0x125) {
    // C: minimap palette click — calculate color index from position
    // DEVIATION: GetKeyState
    // C: DAT_00634004/DAT_00634000 = calculated color from click position
    FUN_005723ee();
    FUN_0057261a(0, DAT_006ac2d4 + 10, DAT_006ac2d8 + 0xe0, 0);
    if (DAT_006ac120 === 3) { FUN_005bb574(); }
    DAT_006ac120 = DAT_006ac118;
  } else if (param_1 > 0xf && param_1 < DAT_006ac878 * 4 + 0x10 &&
            param_2 > 0xf && param_2 < DAT_006ac87c * 4 + 0x10) {
    switch (DAT_006ac120) {
    case 0: // select tile color
      local_60 = FUN_005c0bf2((param_1 - 0x10) >> 2, (param_2 - 0x10) >> 2);
      // DEVIATION: GetKeyState
      FUN_005723ee();
      if (DAT_006ac120 === 3) { FUN_005bb574(); }
      DAT_006ac120 = DAT_006ac118;
      DAT_006ac898 = 0x204;
      FUN_00408010(0x204); // DEVIATION: MFC
      FUN_00484d52();
      break;
    case 1:
    case 2: // draw tile
      FUN_00572389();
      DAT_006ac8a4 = 1;
      iVar4 = (param_1 - 0x10) >> 2;
      iVar6 = (param_2 - 0x10) >> 2;
      DAT_006ac880 = iVar4;
      DAT_006ac884 = iVar6;
      // DEVIATION: GetKeyState — sets DAT_006ac894
      DAT_006ac894 = DAT_00634004;
      local_64 = FUN_00572887(iVar4, iVar6);
      FUN_00408490(local_64); // DEVIATION: MFC
      break;
    case 3: // move cursor
      FUN_00572389();
      DAT_006ac0f4 = FUN_005adfa0((param_1 - 0x10) >> 2, 5, 0x2f);
      DAT_006ac0f0 = FUN_005adfa0((param_2 - 0x10) >> 2, 0, 0xe);
      FUN_00572da0();
      break;
    }
  }
  // DEVIATION: SEH cleanup
  FUN_00573adc();
  FUN_00573aef();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573adc — cleanup_cstring
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573adc() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573aef — SEH_epilog_6
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573aef() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573afd — release_capture
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573afd() {
  DAT_006ac8a4 = 0;
  // ReleaseCapture — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573b1d — handle_map_editor_mouse_move
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00573b1d (813 bytes)
export function FUN_00573b1d(param_1, param_2) {
  let iVar1, iVar2, iVar4, iVar5, iVar6, iVar7;
  let uVar3;
  let local_18, local_14, local_10, local_8;

  param_1 = param_1 - DAT_006ac2d4;
  param_2 = param_2 - DAT_006ac2d8;
  if (param_1 < 9 || 0x187 < param_1 || param_2 < 0xdf || 0x125 < param_2) {
    if (param_1 < 0x10 || DAT_006ac878 * 4 + 0x10 <= param_1 ||
       param_2 < 0x10 || DAT_006ac87c * 4 + 0x10 <= param_2) {
      // Outside map area — set default cursor
      if (DAT_006ac898 !== 0x201) {
        DAT_006ac898 = 0x201;
        FUN_00408010(0x201); // DEVIATION: SetCursor
        FUN_00484d52();
      }
      DAT_006ac884 = -1;
      DAT_006ac880 = -1;
      iVar1 = DAT_006ac880;
      iVar2 = DAT_006ac884;
    } else {
      // Inside map area — set appropriate cursor based on mode
      if (DAT_006ac120 === 0) {
        if (DAT_006ac898 !== 0x205) {
          DAT_006ac898 = 0x205;
          FUN_00408010(0x205); FUN_00484d52();
        }
      } else if (0 < DAT_006ac120 && DAT_006ac120 < 3 && DAT_006ac898 !== 0x204) {
        DAT_006ac898 = 0x204;
        FUN_00408010(0x204); FUN_00484d52();
      }
      iVar1 = DAT_006ac880;
      iVar2 = DAT_006ac884;
      // C: DAT_006ac8a4 — drawing in progress
      if (DAT_006ac8a4 !== 0) {
        iVar1 = (param_1 - 0x10) >> 2;
        iVar2 = (param_2 - 0x10) >> 2;
        if (DAT_006ac120 === 1) {
          // Line drawing mode — draw tiles from last position to current
          if (DAT_006ac880 < 0 || DAT_006ac884 < 0) {
            DAT_006ac880 = iVar1;
            DAT_006ac884 = iVar2;
          }
          iVar4 = iVar1 - DAT_006ac880;
          iVar5 = iVar2 - DAT_006ac884;
          local_8 = -1; local_18 = -1;
          local_10 = DAT_006ac880 << 8;
          local_14 = DAT_006ac884 << 8;
          while (true) {
            iVar6 = local_10 >> 8;
            iVar7 = local_14 >> 8;
            if (iVar6 === iVar1 && iVar7 === iVar2) break;
            if (iVar6 !== local_18 || iVar7 !== local_8) {
              FUN_00572887(iVar6, iVar7);
              local_18 = iVar6;
              local_8 = iVar7;
            }
            local_10 = local_10 + iVar4;
            local_14 = local_14 + iVar5;
          }
          FUN_00408460(); // DEVIATION: MFC invalidate
        } else if (DAT_006ac120 === 2) {
          // Point drawing mode
          uVar3 = FUN_00572887(iVar1, iVar2);
          FUN_00408490(uVar3); // DEVIATION: MFC
        }
      }
    }
  } else {
    // Palette area — set palette cursor
    iVar1 = DAT_006ac880;
    iVar2 = DAT_006ac884;
    if (DAT_006ac898 !== 0x205) {
      DAT_006ac898 = 0x205;
      FUN_00408010(0x205); FUN_00484d52();
      iVar1 = DAT_006ac880;
      iVar2 = DAT_006ac884;
    }
  }
  DAT_006ac884 = iVar2;
  DAT_006ac880 = iVar1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573e59 — open_map_editor_dialog
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00573e59 (947 bytes)
export function FUN_00573e59(param_1, param_2, param_3, param_4) {
  // C: Map editor main setup — initializes all map editor state
  // DEVIATION: SEH, MFC constructors
  DAT_006ac924 = param_3;
  DAT_006ac8a0 = param_1;
  DAT_006ac878 = FUN_004a6980(); // map width
  DAT_006ac87c = FUN_004bb540(); // map height
  DAT_006ac874 = FUN_00417f70(); // tile size
  DAT_006ac888 = param_4;
  // DEVIATION: GDI — FUN_005cdf50, FUN_005cf23f, FUN_005bd65c bitmap setup
  FUN_005727d8(); // DEVIATION: zoom init
  // C: Set initial scroll position from DAT_006a4f88 viewport
  DAT_006ac0a4 = 0; // C: reads from DAT_00642c48[*(DAT_006a4f88+0x2ec)*4]
  DAT_006ac0a0 = 0; // C: reads from DAT_00642b48[*(DAT_006a4f88+0x2ec)*4]
  DAT_006ac0f0 = DAT_006ac0a0;
  DAT_006ac0f4 = DAT_006ac0a4;
  FUN_00572389(); // DEVIATION: refresh
  DAT_006ac120 = 1;   // draw mode
  DAT_006ac118 = 1;   // previous mode
  DAT_006ac124 = 0;   // sub-mode
  DAT_006ac898 = 0x201; // cursor type
  DAT_006ac88c = 1;   // dialog active flag
  DAT_006ac8a4 = 0;   // not drawing
  // C: FUN_00572089 creates dialog window
  FUN_00572089(param_2, 0xd, 0, 0, 0x192, 0x14e, 0, 0, 0);
  // DEVIATION: MFC — button layout, dialog loop
  // C: while (DAT_006ac88c !== 0) { FUN_0040ef50(); }
  FUN_0059d3c9(0); // DEVIATION: sound
  FUN_00553379(); // DEVIATION: cleanup
  FUN_0057420c(); // DEVIATION: destructor
  FUN_00574218(); // DEVIATION: destructor
  FUN_0057422b(); // DEVIATION: SEH
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057420c — cleanup_dialog_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057420c() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574218 — cleanup_dialog_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574218() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057422b — SEH_epilog_7
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057422b() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574239 — redraw_map_editor_full
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00574239 (745 bytes)
export function FUN_00574239() {
  let bVar1;
  let local_50 = new Uint8Array(16), local_40 = new Uint8Array(16);
  let local_14 = new Uint8Array(16);
  let local_30, local_2c, local_28, local_24, local_20, local_1c, local_18;

  FUN_00552112(); // DEVIATION: MFC begin paint
  FUN_0040fdb0(DAT_006ac1b0, DAT_006ac46c, 0x1d); // DEVIATION: fill background
  local_20 = DAT_006ac2d4 + 0x10;
  local_24 = DAT_006ac2d8 + 0x10;
  local_18 = DAT_006ac878 << 2;
  local_1c = DAT_006ac87c << 2;
  FUN_004086c0(local_14, 0, 0, DAT_006ac878, DAT_006ac87c);
  FUN_005cebb4(DAT_006ac128, local_14); // DEVIATION: stretch blit
  bVar1 = FUN_00417f70();
  DAT_006ac874 = bVar1 & 0xFF;
  FUN_005a9abf(DAT_006ac1b0, local_20, local_24, local_18, local_1c, DAT_006ac874); // DEVIATION: blit
  FUN_005cd775(4, 1); // DEVIATION: scale
  FUN_005cef66(local_40, DAT_006ac1b0, 0, local_20, local_24); // DEVIATION: draw
  FUN_005cd775(1, 1); // DEVIATION: scale reset
  FUN_004ccb6a(DAT_006ac1b0, local_20, local_24, local_18, local_1c, 6); // DEVIATION: border
  // Draw color palette (0xC0 colors)
  local_20 = DAT_006ac2d4 + 10;
  local_24 = DAT_006ac2d8 + 0xe0;
  for (local_28 = 0; local_28 < 0xc0; local_28 = local_28 + 1) {
    FUN_0057261a(DAT_006ac1b0, local_20, local_24, local_28 + 10);
  }
  // Draw 3x5 terrain preview grid
  local_20 = DAT_006ac2d4 + 0x11e;
  local_24 = DAT_006ac2d8 + 0x14;
  for (local_2c = 0; local_2c < 3; local_2c = local_2c + 1) {
    for (local_30 = 0; local_30 < 5; local_30 = local_30 + 1) {
      if (local_30 === 0 && local_2c === 0) {
        FUN_005a9abf(DAT_006ac1b0, local_2c * 0x24 + local_20, local_30 * 0x26 + local_24,
                     0x20, 0x20, DAT_006ac874);
      } else {
        FUN_005a9abf(DAT_006ac1b0, local_2c * 0x24 + local_20, local_30 * 0x26 + local_24,
                     0x20, 0x20, 0x29);
        FUN_005cef31(local_50, DAT_006ac1b0, local_2c * 0x24 + local_20, local_30 * 0x26 + local_24);
      }
      FUN_005a9964(DAT_006ac1b0, local_2c * 0x24 + local_20, local_30 * 0x26 + local_24,
                   0x20, 0x20, 10); // DEVIATION: border
    }
  }
  FUN_005723ee(); // draw color swatches
  FUN_005baeb0(DAT_006ac1b0); // DEVIATION: MFC
  FUN_005baec8(DAT_006a4f90); // DEVIATION: MFC
  FUN_005baee0(0x29, 0x12, 1, 1); // DEVIATION: MFC
  FUN_00408460(); // DEVIATION: MFC invalidate
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574522 — draw_preview_window
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00574522 (356 bytes)
export function FUN_00574522() {
  // C: Minimap paint handler — renders scaled minimap in dialog
  // C: Writes DAT_006ac874 = FUN_00417f70() (tile size)
  // C: Reads in_ECX layout (dialog rect), GetSystemMetrics(3) for scrollbar
  // C: Draws via FUN_005a9abf, FUN_005cd775 (scale), FUN_005cef66, FUN_004ccb6a (border)
  // DEVIATION: MFC (in_ECX), GDI rendering
  DAT_006ac874 = FUN_00417f70();
  FUN_00408460(); // DEVIATION: MFC invalidate
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574686 — refresh_preview_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574686() {
  FUN_00574522();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005746a1 — get_sprite_rect_for_editor_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_005746a1(param_1, param_2, param_3, param_4, param_5) {
  // This returns sprite coordinates for various map editor items.
  // Writes to param_2..param_5 (pass-by-reference in C).
  // Since JS doesn't have pointers, we return an object.
  let local_8 = 0;
  let x = 0, y = 0, w = 0, h = 0;

  if (DAT_006ac924 < 0xc) {
    const uVar1 = param_1 >> 31;
    switch (DAT_006ac924) {
      case 0:
        local_8 = 0x14;
        x = (((param_1 + (uVar1 & 3)) >> 2) | 0) * 0x25 + 0x157;
        y = ((((param_1 ^ uVar1) - uVar1 & 3 ^ uVar1) - uVar1) | 0) * 0x15 + 0xd3;
        w = 0x24;
        h = 0x14;
        break;
      case 1:
        if (param_1 < 0x18) {
          x = 1;
        } else {
          x = 0x14e;
          param_1 = param_1 - 0x18;
        }
        {
          const u1 = param_1 >> 31;
          x = x + ((((param_1 ^ u1) - u1 & 3 ^ u1) - u1) | 0) * 0x41;
          y = (((param_1 + (u1 & 3)) >> 2) | 0) * 0x31 + 0x27;
        }
        w = 0x40;
        h = 0x30;
        local_8 = 0x30;
        break;
      case 2:
        local_8 = 4;
        x = param_1 * 0x41 + 0x8f;
        y = 0x1a7;
        w = 0x40;
        h = 0x30;
        break;
      case 3:
        local_8 = 0x12;
        w = 0xe;
        h = 0x16;
        x = (((param_1 >> 1) % 9) | 0) * (w + 1) + 1;
        y = (h + 1) * (param_1 & 1) + 0x1a9;
        break;
      case 4:
        local_8 = 0x42;
        w = 0x24;
        h = 0x14;
        if (param_1 < 0x26) {
          x = ((((param_1 ^ uVar1) - uVar1 & 7 ^ uVar1) - uVar1) | 0) * 0x25 + 0x157;
          y = (((param_1 + (uVar1 & 7)) >> 3) | 0) * 0x15 + 1;
        } else {
          x = (((param_1 - 0x26) % 7) | 0) * 0x25 + 0x157;
          y = (((param_1 - 0x26) / 7) | 0) * 0x15 + 0x6a;
        }
        break;
      case 5:
        local_8 = 1;
        w = 0x40;
        h = 0x20;
        x = 199;
        y = 0x100;
        break;
      case 6:
        local_8 = 8;
        w = 0x20;
        h = 0x20;
        x = (w + 1) * param_1 + 1;
        y = 0x164;
        break;
      case 7:
        local_8 = 0x2c;
        w = 0x40;
        h = 0x20;
        x = (((param_1 / 0xb) | 0) * 0x41) + 1;
        y = ((param_1 % 0xb) | 0) * 0x21 + 1;
        break;
      case 8:
        w = 0x40;
        h = 0x20;
        if (param_1 < 0x40) {
          x = ((((param_1 ^ uVar1) - uVar1 & 7 ^ uVar1) - uVar1) | 0) * 0x41 + 1;
          y = (((((((param_1 ^ uVar1) - uVar1 & 0xf ^ uVar1) - uVar1) | 0) < 8 ? 0 : 1) - 1) & 0x21) +
              (((param_1 + (uVar1 & 0xf)) >> 4) | 0) * 0x42 + 0x43;
        } else {
          x = (param_1 - 0x40) * 0x41 + 1;
          y = 0x14b;
        }
        local_8 = 0x44;
        break;
      case 9:
        w = 0x20;
        h = 0x10;
        x = 1;
        y = 0x1ad;
        {
          const r = (((param_1 ^ uVar1) - uVar1 & 3 ^ uVar1) - uVar1) | 0;
          switch (r) {
            case 0: break;
            case 1: y = y + 0x22; x = x + 0x21; break;
            case 2: y = y + 0x11; break;
            case 3: y = y + 0x22; break;
          }
        }
        x = x + (((param_1 + (uVar1 & 3)) >> 2) | 0) * 0x42;
        local_8 = 0x20;
        break;
      case 10:
        w = 0x40;
        h = 0x20;
        x = 0x1c8;
        if (param_1 < 6) {
          y = param_1 * 0x21 + 100;
        } else {
          x = (((param_1 - 6) % 9) | 0) * 0x41 + 1;
          y = (((param_1 - 6) / 9) | 0) * 0x21 + 0x16c;
        }
        local_8 = 0x18;
        break;
      case 0xb:
        local_8 = 0x3f;
        y = (((param_1 / 9) | 0) * 0x31) + 1;
        x = ((param_1 % 9) | 0) * 0x41 + 1;
        w = 0x40;
        h = 0x30;
        break;
    }
  }

  // Write results to param objects (in C these are pointer writes)
  if (param_2 !== undefined) {
    param_2.val = x;
    if (param_3) param_3.val = y;
    if (param_4) param_4.val = w;
    if (param_5) param_5.val = h;
  }
  return local_8;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574c47 — show_sprite_editor_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574c47(param_1) {
  // UI sprite display — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574ca6 — setup_sprite_editor_dialog
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00574ca6 (498 bytes)
export function FUN_00574ca6(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // C: Scenario editor dialog setup — same pattern as FUN_00572089
  if (param_1 === 0) {
    // C: FUN_005f22d0(&DAT_006ac5bc, ""); — empty title
  } else {
    // C: FUN_005f22d0(&DAT_006ac5bc, param_1);
  }
  DAT_006ac59c = param_2;
  DAT_006ac5a0 = param_8;
  DAT_006ac5a4 = param_9;
  DAT_006ac5a8 = param_7;
  DAT_006ac684 = 0;
  DAT_006ac730 = 0;
  if ((param_2 & 4) !== 0) {
    DAT_006ac5a0 = DAT_00633598;
    DAT_006ac5a4 = DAT_0063359c;
  }
  let local_8 = ((param_2 & 8) === 0) ? 0x202 : 0x802;
  if (DAT_006ac5a0 !== 0) { local_8 = local_8 | 0x400; }
  if (param_7 !== 0) { local_8 = local_8 | 0x1000; }
  if ((param_2 & 2) === 0) {
    param_5 = param_5 + DAT_006ac5a4 * 2;
    param_6 = param_6 + DAT_006ac5a0 + DAT_006ac5a4;
  }
  if ((param_2 & 1) !== 0) {
    param_3 = (DAT_006ab198 >> 1) - (param_5 >> 1);
    param_4 = (DAT_006ab19c >> 1) - (param_6 >> 1);
  }
  FUN_005bb4ae(0, local_8, param_3, param_4, param_5, param_6, 0, 0);
  if (DAT_006ac5a0 !== 0) { FUN_00497d00(DAT_006ac5a0); }
  if (DAT_006ac5a8 !== 0) { FUN_004cff70(DAT_006ac5a8); }
  FUN_00552ed2(); // DEVIATION: MFC show dialog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574e98 — init_sprite_preview
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00570000.c FUN_00574e98 (184 bytes)
export function FUN_00574e98() {
  // C: Map editor refresh — reinitializes tile sprites after resolution change
  // C: Writes DAT_006ac874 = FUN_00417f70() (tile size)
  // C: Writes DAT_006ac890 = 0 (refresh flag)
  // C: Calls FUN_005cf467(9,7) (set sprite grid), FUN_005727d8 (zoom init)
  // C: FUN_005cef31, FUN_005cdf50, FUN_005cebb4 — bitmap recalc
  // DEVIATION: GDI bitmap operations
  DAT_006ac874 = FUN_00417f70();
  FUN_005727d8();
  DAT_006ac890 = 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574f50 — debug_export_sprites
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574f50() {
  // UI/debug function — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00575d89 — export_single_sprite
// ═══════════════════════════════════════════════════════════════════
export function FUN_00575d89(param_1, param_2, param_3, param_4, param_5) {
  // UI/debug function — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00575dc4 — clear_sprite_dirty
// ═══════════════════════════════════════════════════════════════════
export function FUN_00575dc4() {
  DAT_006ac890 = 0;
  // CRichEditDoc::InvalidateObjectCache — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00575dec — open_sprite_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00575dec() {
  // UI dialog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057624d — launch_sprite_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057624d() {
  FUN_00575dec();
}

// ═══════════════════════════════════════════════════════════════════
// show_messagebox_6267 — show_import_sprite_dialog
// ═══════════════════════════════════════════════════════════════════
export function show_messagebox_6267() {
  // UI dialog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005767a7 — free_text_buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005767a7() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005767b3 — SEH_cleanup_6
// ═══════════════════════════════════════════════════════════════════
export function FUN_005767b3() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005767c9 — SEH_epilog_8
// ═══════════════════════════════════════════════════════════════════
export function FUN_005767c9() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// CBitmapButton::~CBitmapButton — destructor (MFC library)
// ═══════════════════════════════════════════════════════════════════
export function CBitmapButton_destructor() {
  // MFC destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578402 — destroy_bitmap_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578402() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578411 — destroy_bitmap_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578411() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578420 — destroy_bitmap_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578420() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057842f — destroy_button_base
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057842f() {
  FUN_0040fbb0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057843e — destroy_frame_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057843e() {
  // MFC destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578451 — SEH_epilog_9
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578451() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005784a0 — create_bitmap_button
// ═══════════════════════════════════════════════════════════════════
export function FUN_005784a0() {
  // MFC constructor — no-op in JS
  return {};
}

// ═══════════════════════════════════════════════════════════════════
// ios_base::precision — library function
// ═══════════════════════════════════════════════════════════════════
export function ios_base_precision(thisObj, param_1) {
  // MFC library — no-op in JS
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// ios_base::width — library function
// ═══════════════════════════════════════════════════════════════════
export function ios_base_width(thisObj, param_1) {
  // MFC library — no-op in JS
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578650 — setup_html_stream_lines
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578650(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// CHtmlStream::Reset — library function
// ═══════════════════════════════════════════════════════════════════
export function CHtmlStream_Reset() {
  // MFC library — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005786b6 — reset_and_setup_html
// ═══════════════════════════════════════════════════════════════════
export function FUN_005786b6(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005786f1 — create_html_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_005786f1(param_1) {
  // UI — no-op in JS
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578770 — destroy_html_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578770() {
  // UI destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005787bd — destroy_timevec
// ═══════════════════════════════════════════════════════════════════
export function FUN_005787bd() {
  // C++ destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005787d0 — SEH_epilog_10
// ═══════════════════════════════════════════════════════════════════
export function FUN_005787d0() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005787de — find_menu_item_by_id
// ═══════════════════════════════════════════════════════════════════
export function FUN_005787de(param_1) {
  // Menu traversal — UI only, stub
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578840 — count_visible_menu_items
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578840(param_1) {
  // Menu traversal — UI only, stub
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005788a9 — get_menu_item_id_by_index
// ═══════════════════════════════════════════════════════════════════
export function FUN_005788a9(param_1) {
  return 0xffffffff;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578922 — find_submenu_item_by_id
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578922(param_1) {
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005789aa — count_visible_submenu_items
// ═══════════════════════════════════════════════════════════════════
export function FUN_005789aa(param_1) {
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578a1c — get_submenu_item_id_by_index
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578a1c(param_1, param_2) {
  return 0xffffffff;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578abd — replace_pipes_with_tabs
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578abd(param_1) {
  if (typeof param_1 === 'string') {
    return param_1.replace(/\|/g, '\t');
  }
  // For array-based strings:
  for (let i = 0; i < param_1.length; i++) {
    if (param_1[i] === 0x7C) { // '|'
      param_1[i] = 0x09; // '\t'
    }
    if (param_1[i] === 0) break;
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578b06 — add_menu_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578b06(param_1, param_2) {
  // Menu building — UI only, stub
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578c12 — add_submenu_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578c12(param_1, param_2, param_3, param_4) {
  // Menu building — UI only, stub
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578d8a — dispatch_menu_callback
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578d8a(param_1, param_2) {
  // Menu callback dispatch — UI only, stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578de8 — set_menu_parent_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578de8(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578e38 — set_menu_callback
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578e38(param_1) {
  DAT_0063430c = param_1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578e60 — toggle_menu_item_check
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578e60(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578ec7 — toggle_menu_item_grayed
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578ec7(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578f2c — build_full_menu
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578f2c(param_1) {
  // Menu building — UI only, stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005791df — set_menu_item_visibility
// ═══════════════════════════════════════════════════════════════════
export function FUN_005791df(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579260 — set_submenu_item_visibility
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579260(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005792e1 — set_submenu_item_checked
// ═══════════════════════════════════════════════════════════════════
export function FUN_005792e1(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005793a3 — remove_submenu_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_005793a3(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057940d — set_submenu_item_grayed
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057940d(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005794cf — set_all_subitems_checked
// ═══════════════════════════════════════════════════════════════════
export function FUN_005794cf(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057953e — update_submenu_item_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057953e(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005799c0 — set_tab_control_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_005799c0(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579a00 — insert_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579a00(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579a40 — remove_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579a40(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579a80 — update_menu_entry_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579a80(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579ac0 — check_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579ac0(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579b00 — gray_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579b00(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579b40 — set_menu_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579b40(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579b90 — get_menu_handle
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579b90() {
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// CPropertySheet::EnableStackedTabs — library function
// ═══════════════════════════════════════════════════════════════════
export function CPropertySheet_EnableStackedTabs(thisObj, param_1) {
  // MFC library — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579bf0 — flush_menu_updates
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579bf0() {
  // UI — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00579c40 — handle_war_declaration (GAME LOGIC)
// Checks/triggers war declaration between two civs on city capture
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579c40(param_1, param_2) {
  let local_8 = 0;

  FUN_00467750(param_1, param_2, 0x60);

  if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 6) !== 0) &&
     (((1 << (u8(param_1) & 0x1f)) & u8(DAT_00655b0b)) !== 0 ||
      ((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    FUN_0045ac71(param_1, param_2, 0xffffffff);
  }

  FUN_00467750(param_1, param_2, 0xc);

  if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 1) !== 0) {
    FUN_00467825(param_1, param_2, 0x2000);
    FUN_00467933(param_1, param_2, 100);
    FUN_00467933(param_2, param_1, 100);

    if (((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594 + 1] & 0x10) === 0) &&
       ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594 + 1] & 0x10) === 0)) {
      let off = param_2 * 4 + param_1 * 0x594;
      w32(DAT_0064c6c0, off, u32(DAT_0064c6c0, off) | 0x1000);
      local_8 = 1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00579dbb — calc_city_value (GAME LOGIC)
// Calculate value metric for a city (population * treasury ratio)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579dbb(param_1) {
  let iVar1;
  let local_8;

  iVar1 = s8(DAT_0064f340[param_1 * 0x58 + 8]);
  if (s32(DAT_0064c600, iVar1 * 0x594 + 0xa2) <
      ((32000 / s8(DAT_0064f340[param_1 * 0x58 + 9])) | 0)) {
    local_8 = (s8(DAT_0064f340[param_1 * 0x58 + 9]) * s32(DAT_0064c600, iVar1 * 0x594 + 0xa2)) /
              (s16(DAT_0064c600, iVar1 * 0x594 + 0x10c) + 1) | 0;
  } else {
    local_8 = (s32(DAT_0064c600, iVar1 * 0x594 + 0xa2) /
              (s16(DAT_0064c600, iVar1 * 0x594 + 0x10c) + 1) | 0) *
              s8(DAT_0064f340[param_1 * 0x58 + 9]);
  }
  if (local_8 < 0) {
    local_8 = 32000;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00579ed0 — can_declare_war (GAME LOGIC)
// Check if civ can declare war / show war declaration dialogs
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579ed0(param_1, param_2, param_3) {
  let uVar1;
  let iVar2;
  let local_8;

  if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4 + 1] & 0x20) !== 0) {
    return 0;
  }

  if ((param_3 & u32(DAT_0064c6c0, param_1 * 0x594 + param_2 * 4)) === 0) {
    return 0;
  }

  if ((1 << (u8(param_2) & 0x1f) & u8(DAT_00655b0a)) === 0) {
    return 0;
  }

  uVar1 = FUN_00493c7d(param_2);
  FUN_0040ff60(1, uVar1);
  if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) === 0) {
    if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 4) === 0) {
      if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 2) === 0) {
        // DEVIATION: Win32 API (show dialog s_ANNOY)
        local_8 = 1;
      } else if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4 + 2] & 4) === 0) {
        // DEVIATION: Win32 API (show dialog s_ANNOYCEASE)
        local_8 = 1;
      } else {
        // DEVIATION: Win32 API (show dialog s_ANNOYVASSAL)
        local_8 = 1;
      }
    } else {
      // DEVIATION: Win32 API (show dialog s_ANNOYPEACE)
      local_8 = 1;
    }
    if (local_8 === 1) {
      iVar2 = FUN_0055bef9(param_1, param_2);
      if (iVar2 === 0) {
        if (4 < u8(DAT_0064c600[param_1 * 0x594 + 0xb5])) {
          iVar2 = FUN_00453e51(param_2, 0x18);
          if (iVar2 === 0) {
            if (((DAT_0064c6c0[param_2 * 0x594 + param_1 * 4 + 1] & 0x10) === 0) &&
               (DAT_0064c600[param_2 * 0x594 + 0xbe] === 0)) {
              // DEVIATION: Win32 API (show dialog s_ALLOWHAWKS)
            } else {
              uVar1 = FUN_00410070(param_2);
              FUN_0040ff60(0, uVar1);
              // DEVIATION: Win32 API (show dialog s_ALLOWAGGRESSOR)
            }
          } else {
            // DEVIATION: Win32 API (show dialog s_ALLOWUN)
          }
        }
        uVar1 = 0;
      } else {
        // DEVIATION: Win32 API (show dialog s_OVERRULE)
        uVar1 = 1;
      }
    } else {
      uVar1 = 1;
    }
  } else {
    // DEVIATION: Win32 API (show dialog s_ANNOYALLIED)
    uVar1 = 1;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a27a — steal_tech_on_capture (GAME LOGIC)
// Transfer technology from one civ to another on city capture
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a27a(param_1, param_2) {
  let local_318 = -1;
  let local_18 = -999;

  if ((param_1 === 0) || (param_2 === 0)) {
    return;
  }

  let bVar3 = DAT_006d1da0 === param_1;
  if (DAT_00654fa8 !== 0) {
    bVar3 = false;
  }

  while (true) {
    for (let local_314 = 0; local_314 < 100; local_314 = local_314 + 1) {
      let iVar1 = FUN_004bd9f0(param_1, local_314);
      if ((iVar1 === 0) && (iVar1 = FUN_004bd9f0(param_2, local_314), iVar1 !== 0) &&
         (((DAT_00655af0 & 0x80) === 0 || ((DAT_0064bc60 & 0x10) === 0)) ||
          (local_314 !== 0x1f && local_314 !== 0x36 && local_314 !== 0xf &&
           local_314 !== 0x47 && local_314 !== 0x15))) {
        let iVar1_check = FUN_004bdb2c(param_1, local_314);
        if (local_18 <= iVar1_check) {
          local_318 = local_314;
          local_18 = iVar1_check;
        }
      }
    }
    if (local_318 < 0) break;

    let local_314 = local_318;
    if (((1 << (u8(param_1) & 0x1f)) & u8(DAT_00655b0b)) === 0) {
      // AI civ — auto-steal
    } else {
      // Human civ — would show dialog, we just proceed
    }

    FUN_004bf05b(param_1, local_314, param_2, 0, 0);

    if (((1 << (u8(param_1) & 0x1f)) & u8(DAT_00655b0b)) === 0) {
      FUN_00442541(param_1, 0xffffffff);
    }
    return;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a661 — free_text_buffer_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a661() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057a677 — SEH_epilog_11
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a677() {
  // SEH epilog — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a685 — find_best_capital_city (GAME LOGIC)
// Finds the most centrally-located city for a civ to serve as capital
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a685(param_1) {
  let local_10 = 0x7fff;
  let local_18 = -1;

  for (let local_14 = 0; local_14 < DAT_00655b18; local_14 = local_14 + 1) {
    if ((s16(DAT_0064f340, local_14 * 0x58 + 0x54) !== 0) && // DAT_0064f394
       (s8(DAT_0064f340[local_14 * 0x58 + 8]) === param_1)) { // DAT_0064f348
      let local_8 = 0;
      for (let local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
        if ((s16(DAT_0064f340, local_c * 0x58 + 0x54) !== 0) &&
           (s8(DAT_0064f340[local_c * 0x58 + 8]) === param_1)) {
          let iVar1 = FUN_005ae31d(
            s16(DAT_0064f340, local_14 * 0x58),
            s16(DAT_0064f340, local_14 * 0x58 + 2),
            s16(DAT_0064f340, local_c * 0x58),
            s16(DAT_0064f340, local_c * 0x58 + 2));
          local_8 = local_8 + iVar1;
        }
      }
      if (local_8 < local_10) {
        local_10 = local_8;
        local_18 = local_14;
      }
    }
  }
  return local_18;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a7e9 — transfer_city (GAME LOGIC)
// Transfer a city from one civ to another (used in civil war/schism)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a7e9(param_1, param_2, param_3) {
  w16(DAT_0064c600, param_2 * 0x594 + 0x108, s16(DAT_0064c600, param_2 * 0x594 + 0x108) - 1);
  w16(DAT_0064c600, param_3 * 0x594 + 0x108, s16(DAT_0064c600, param_3 * 0x594 + 0x108) + 1);
  w16(DAT_0064c600, param_2 * 0x594 + 0x10c,
      s16(DAT_0064c600, param_2 * 0x594 + 0x10c) - s8(DAT_0064f340[param_1 * 0x58 + 9]));
  w16(DAT_0064c600, param_3 * 0x594 + 0x10c,
      s8(DAT_0064f340[param_1 * 0x58 + 9]) + s16(DAT_0064c600, param_3 * 0x594 + 0x10c));
  DAT_0064f340[param_1 * 0x58 + 8] = u8(param_3);
  FUN_005b99e8(
    s16(DAT_0064f340, param_1 * 0x58),
    s16(DAT_0064f340, param_1 * 0x58 + 2),
    param_3, 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a904 — attempt_civil_war (GAME LOGIC)
// Attempts to trigger a civil war / civ split
// Returns 1 on success, 0 on failure
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a904(param_1) {
  let cVar1;
  let iVar2;
  let uVar3;
  let local_15c;
  let local_158;
  let local_154;
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  iVar2 = FUN_004fc20d(param_1);
  if (iVar2 === 0) {
    return 0;
  }

  local_24 = -1;
  for (local_148 = 1; local_148 < 8; local_148 = local_148 + 1) {
    if ((s16(DAT_0064c600, local_148 * 0x594 + 0x106) === 0) &&
       (s16(DAT_0064c600, local_148 * 0x594 + 0x108) === 0)) {
      local_24 = local_148;
    }
  }
  if (local_24 < 1) {
    return 0;
  }

  let aiStack_13c = new Array(64).fill(0);
  local_154 = -1;
  for (local_140 = 0; local_140 < DAT_00655b18; local_140 = local_140 + 1) {
    if ((s32(DAT_0064f340, local_140 * 0x58 + 0x54) !== 0) &&
       (s8(DAT_0064f340[local_140 * 0x58 + 8]) === param_1)) {
      local_3c = FUN_005b8a81(
        s16(DAT_0064f340, local_140 * 0x58),
        s16(DAT_0064f340, local_140 * 0x58 + 2));
      aiStack_13c[local_3c] =
           aiStack_13c[local_3c] + s8(DAT_0064f340[local_140 * 0x58 + 9]);
      iVar2 = FUN_0043d20a(local_140, 1);
      if ((iVar2 !== 0) &&
         ((local_154 < 0 ||
          (s16(DAT_0064c600, param_1 * 0x594 + 0xac) ===
           s16(DAT_0064f340, local_140 * 0x58))))) {
        local_154 = local_3c;
        local_15c = s16(DAT_0064f340, local_140 * 0x58);
        local_8 = s16(DAT_0064f340, local_140 * 0x58 + 2);
        local_144 = local_140;
      }
    }
  }

  if (local_154 < 0) {
    return 0;
  }

  DAT_00655b0a = DAT_00655b0a & ~(1 << (u8(local_24) & 0x1f));
  iVar2 = new_civ(local_24);
  if (iVar2 === 0) {
    return 0;
  }
  DAT_00655b0a = DAT_00655b0a | (1 << (u8(local_24) & 0x1f));

  uVar3 = FUN_00410070(param_1);
  FUN_0040ff60(0, uVar3);
  uVar3 = FUN_00410070(local_24);
  FUN_0040ff60(1, uVar3);
  // DEVIATION: Win32 API (FUN_00421ea0 s_SCHISM)
  if (2 < DAT_00655b02) {
    FUN_00511880(0x16, 0xff, 2, 0, 0, 0);
  }

  // Transfer treasury (half)
  w32(DAT_0064c600, local_24 * 0x594 + 0xa2,
      (s32(DAT_0064c600, param_1 * 0x594 + 0xa2) / 2) | 0);
  w32(DAT_0064c600, param_1 * 0x594 + 0xa2,
      s32(DAT_0064c600, param_1 * 0x594 + 0xa2) - s32(DAT_0064c600, local_24 * 0x594 + 0xa2));

  // Transfer science beakers (half)
  w16(DAT_0064c600, local_24 * 0x594 + 0x10e,
      (u16(DAT_0064c600, param_1 * 0x594 + 0x10e) >> 1) & 0xffff);

  // Copy government type
  DAT_0064c600[local_24 * 0x594 + 0xb5] = DAT_0064c600[param_1 * 0x594 + 0xb5];
  // Copy tax rate
  w16(DAT_0064c600, local_24 * 0x594 + 0xa8, u16(DAT_0064c600, param_1 * 0x594 + 0xa8));
  // Copy government count/type
  DAT_0064c600[local_24 * 0x594 + 0xb0] = DAT_0064c600[param_1 * 0x594 + 0xb0];

  // Copy tech flags (13 bytes)
  for (local_18 = 0; local_18 < 0xd; local_18 = local_18 + 1) {
    DAT_0064c600[local_24 * 0x594 + 0xf8 + local_18] =
         DAT_0064c600[param_1 * 0x594 + 0xf8 + local_18];
  }

  // Set contact turns for all civs
  for (local_148 = 1; local_148 < 8; local_148 = local_148 + 1) {
    w16(DAT_0064c600, local_148 * 0x594 + 0x482 + local_24 * 2, DAT_00655af8 - 8);
  }

  // Set diplomacy: alliance + peace between old and new
  w32(DAT_0064c6c0, local_24 * 0x594 + param_1 * 4, 0x2001);
  w32(DAT_0064c6c0, local_24 * 4 + param_1 * 0x594, 0x82801);

  // Copy visibility from old civ to new civ
  local_30 = 1 << (u8(param_1) & 0x1f);
  local_38 = 1 << (u8(local_24) & 0x1f);
  local_158 = 0;
  local_34 = 0;
  FUN_005b9ec6();
  for (local_18 = 0; local_18 < DAT_006d1164; local_18 = local_18 + 1) {
    iVar2 = FUN_005b8931(local_34, local_158);
    if ((local_30 & tileRead(iVar2, 4)) !== 0) {
      FUN_005b976d(local_34, local_158, local_38, 1, 1);
    }
    local_34 = local_34 + 2;
    if (DAT_006d1160 <= local_34) {
      local_158 = local_158 + 1;
      local_34 = local_158 & 1;
    }
  }
  FUN_005b9f1c();

  // Partition cities between old and new civ based on continents
  local_14 = aiStack_13c[local_154];
  local_20 = 0;
  for (local_3c = 0; local_3c < 0x40; local_3c = local_3c + 1) {
    if (aiStack_13c[local_3c] !== 0) {
      if ((local_14 < local_20) || (local_154 === local_3c)) {
        if (local_154 !== local_3c) {
          local_14 = local_14 + aiStack_13c[local_3c];
        }
        aiStack_13c[local_3c] = 1;
      } else {
        local_20 = local_20 + aiStack_13c[local_3c];
        aiStack_13c[local_3c] = 2;
      }
    }
  }

  if ((local_14 < local_20 * 2) && (local_20 <= local_14)) {
    // Continent-based partition
    for (local_140 = 0; local_140 < DAT_00655b18; local_140 = local_140 + 1) {
      if ((s32(DAT_0064f340, local_140 * 0x58 + 0x54) !== 0) &&
         (s8(DAT_0064f340[local_140 * 0x58 + 8]) === param_1)) {
        local_3c = FUN_005b8a81(
          s16(DAT_0064f340, local_140 * 0x58),
          s16(DAT_0064f340, local_140 * 0x58 + 2));
        if (aiStack_13c[local_3c] === 2) {
          FUN_0043cc00(local_140, param_1);
          FUN_0057a7e9(local_140, param_1, local_24);
        } else {
          FUN_0043cc00(local_140, local_24);
        }
      }
    }
  } else {
    // Distance-based partition
    local_20 = 0;
    local_10 = s16(DAT_0064c600, param_1 * 0x594 + 0x10c);
    while (local_20 * 3 < local_10) {
      local_c = 1;
      local_14c = -1;
      for (local_140 = 0; local_140 < DAT_00655b18; local_140 = local_140 + 1) {
        if ((s32(DAT_0064f340, local_140 * 0x58 + 0x54) !== 0) &&
           (s8(DAT_0064f340[local_140 * 0x58 + 8]) === param_1)) {
          FUN_0043cc00(local_140, local_24);
          FUN_0043cc00(local_140, param_1);
          local_1c = FUN_005ae31d(local_15c, local_8,
            s16(DAT_0064f340, local_140 * 0x58),
            s16(DAT_0064f340, local_140 * 0x58 + 2));
          if (local_c < local_1c) {
            local_14c = local_140;
            local_c = local_1c;
          }
        }
      }
      if (local_14c < 0) break;
      local_20 = local_20 + s8(DAT_0064f340[local_14c * 0x58 + 9]);
      FUN_0057a7e9(local_14c, param_1, local_24);
    }
  }

  // Reassign units to new civ based on city ownership
  for (local_150 = 0; local_150 < DAT_00655b16; local_150 = local_150 + 1) {
    if ((s16(DAT_006560f0, local_150 * 0x20 + 0x1a) !== 0) &&
       (s8(DAT_006560f0[local_150 * 0x20 + 7]) === param_1)) {
      local_140 = FUN_0043cf76(
        s16(DAT_006560f0, local_150 * 0x20),
        s16(DAT_006560f0, local_150 * 0x20 + 2));
      if ((local_140 < 0) && (DAT_006560f0[local_150 * 0x20 + 0x10] !== 0xff)) {
        local_140 = u8(DAT_006560f0[local_150 * 0x20 + 0x10]);
      }
      if (-1 < local_140) {
        cVar1 = s8(DAT_0064f340[local_140 * 0x58 + 8]);
        iVar2 = cVar1;
        if ((iVar2 === param_1) || (iVar2 === local_24)) {
          FUN_005b99e8(
            s16(DAT_006560f0, local_150 * 0x20),
            s16(DAT_006560f0, local_150 * 0x20 + 2), iVar2, 1);
          local_2c = local_150;
          for (local_150 = FUN_005b2d39(local_150); -1 < local_150;
              local_150 = FUN_005b2c82(local_150)) {
            DAT_006560f0[local_150 * 0x20 + 7] = u8(cVar1);
            if ((DAT_006560f0[local_150 * 0x20 + 0x10] !== 0xff) &&
               (s8(DAT_0064f340[u8(DAT_006560f0[local_150 * 0x20 + 0x10]) * 0x58 + 8])
                !== iVar2)) {
              DAT_006560f0[local_150 * 0x20 + 0x10] = u8(local_140);
            }
          }
          local_150 = local_2c;
        }
      }
    }
  }

  // Find capital for new civ
  iVar2 = FUN_0057a685(local_24);
  if (-1 < iVar2) {
    FUN_0043d289(iVar2, 1, 1);
    w16(DAT_0064c600, local_24 * 0x594 + 0xac,
        u16(DAT_0064f340, iVar2 * 0x58));
  }

  // Temporarily mark original city as unowned to find old capital
  DAT_0064f340[local_144 * 0x58 + 8] = 0xff;
  iVar2 = FUN_0057a685(param_1);
  if (-1 < iVar2) {
    FUN_0043d289(iVar2, 1, 1);
    w16(DAT_0064c600, param_1 * 0x594 + 0xac,
        u16(DAT_0064f340, iVar2 * 0x58));
  }
  DAT_0064f340[local_144 * 0x58 + 8] = u8(param_1);

  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  FUN_0047cf9e(DAT_006d1da0, 1);
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057b5df — handle_city_capture (CRITICAL GAME LOGIC)
// This is the main city capture handler (~800 lines, 11451 bytes).
// Called when a military unit conquers an enemy city.
//
// param_1 = city index (uint)
// param_2 = capturing civ
// param_3 = capture mode (0=normal, 1=subvert, 2+=diplomatic)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057b5df(param_1, param_2, param_3) {
  let cVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let local_3ec;
  let local_3e8;
  let local_3e4;
  let local_3e0;
  let local_3d8;
  let local_3cc;
  let local_3c8;
  let local_3c4;
  let local_3c0;
  let local_3bc;
  let local_3b4;
  let local_3b0;
  let local_398;
  let local_394;
  let local_390;
  let local_98;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c = new Uint8Array(80);
  let local_1c;
  let local_18;
  let local_14;

  FUN_0059db08(0x4000);

  // Get original owner of the city
  local_84 = s8(DAT_0064f340[param_1 * 0x58 + 8]); // DAT_0064f348
  iVar4 = s16(DAT_0064f340, param_1 * 0x58);        // city x
  iVar5 = s16(DAT_0064f340, param_1 * 0x58 + 2);    // city y

  // Handle war declaration if capture is by combat
  if (param_3 < 2) {
    FUN_00579c40(param_2, local_84);
  }

  // Check if the city's original builder is the capturer
  local_7c = (s8(DAT_0064f340[param_1 * 0x58 + 0xa]) === param_2) ? 1 : 0; // DAT_0064f34a

  // Save city name
  FUN_005f22d0(local_6c, param_1 * 0x58 + 0x20); // DAT_0064f360 + offset

  // ── Reputation/diplomacy effects ──
  if ((((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) !== 0 ||
      ((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) !== 0) &&
     (((iVar6 = FUN_004a7577(local_84), iVar6 === 0) &&
       (iVar6 = FUN_004a7577(param_2), iVar6 === 0)) || (DAT_00655b08 < 2))) {
    FUN_00467825(param_2, local_84, 0x10000);

    if (!(((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) !== 0 &&
        u8(DAT_0064c600[param_2 * 0x594 + 0xb5]) === 6 && // government = democracy
        u8(DAT_00655c22[param_2]) === 7)) {
      if (((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) !== 0 &&
         u8(DAT_00655c22[local_84]) < u8(DAT_00655c22[param_2])) {
        local_88 = 0;
        for (local_1c = 0; local_1c < DAT_00655b18; local_1c = local_1c + 1) {
          if (((s16(DAT_0064f340, local_1c * 0x58 + 0x54) !== 0) && (local_1c !== param_1)) &&
             ((s8(DAT_0064f340[local_1c * 0x58 + 0xa]) === local_84) &&
              (s8(DAT_0064f340[local_1c * 0x58 + 8]) === param_2))) {
            local_88 = local_88 + 1;
          }
        }
        if ((1 < local_88) && ((local_88 & 1) === 0)) {
          let off = param_2 * 4 + local_84 * 0x594;
          w32(DAT_0064c6c0, off, u32(DAT_0064c6c0, off) | 0x400000);
        }
      }
    } else {
      let off = param_2 * 4 + local_84 * 0x594;
      w32(DAT_0064c6c0, off, u32(DAT_0064c6c0, off) | 0x400000);
    }
  }

  // Remove cease-fire flags
  FUN_00467750(param_2, local_84, 0x800);

  if (((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0 &&
     (s8(DAT_0064f340[param_1 * 0x58 + 9]) > 14) && (local_7c === 0)) {
    let off = param_2 * 4 + local_84 * 0x594;
    w32(DAT_0064c6c0, off, u32(DAT_0064c6c0, off) | 0x10);
  }

  // ── Civil war check ──
  local_398 = -1;
  if (((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0 &&
     (iVar6 = FUN_0043d20a(param_1, 1), iVar6 !== 0) &&
     s16(DAT_0064c600, local_84 * 0x594 + 0x108) > 4) { // city count > 4
    if (((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) === 0) {
      bVar2 = u8(DAT_00655c22[DAT_00655c21]) < u8(DAT_00655c22[local_84]);
    } else {
      bVar2 = u8(DAT_00655c22[param_2]) < u8(DAT_00655c22[local_84]);
    }
    if (bVar2 && (iVar6 = FUN_0057a904(local_84), iVar6 === 0)) {
      DAT_0064f340[param_1 * 0x58 + 8] = 0xff;
      local_398 = FUN_0057a685(local_84);
      DAT_0064f340[param_1 * 0x58 + 8] = u8(local_84);
    }
  }

  // ── Calculate gold plundered ──
  local_74 = FUN_00579dbb(param_1);

  // ── Check for capital escape ──
  iVar6 = FUN_0043d20a(param_1, 1); // is this the capital?
  if (iVar6 !== 0) {
    local_18 = -999;
    local_3c8 = 0xffffffff;

    // Find best candidate city for capital relocation
    for (local_1c = 0; local_1c < DAT_00655b18; local_1c = local_1c + 1) {
      if ((s16(DAT_0064f340, local_1c * 0x58 + 0x54) !== 0) &&
         (s8(DAT_0064f340[local_1c * 0x58 + 8]) === local_84) && (local_1c !== param_1) &&
         (s8(DAT_0064f340[param_1 * 0x58 + 9]) / 2 <=
          s8(DAT_0064f340[local_1c * 0x58 + 9])) &&
         (s8(DAT_0064f340[local_1c * 0x58 + 9]) > 7)) {
        cVar1 = s8(DAT_0064f340[local_1c * 0x58 + 9]);
        local_14 = FUN_005ae31d(
          s16(DAT_0064f340, local_1c * 0x58),
          s16(DAT_0064f340, local_1c * 0x58 + 2),
          iVar4, iVar5);
        local_14 = cVar1 * 3 - local_14;

        local_3cc = FUN_005b2e69(
          s16(DAT_0064f340, local_1c * 0x58),
          s16(DAT_0064f340, local_1c * 0x58 + 2));
        iVar6 = FUN_005b50ad(local_3cc, 2);
        local_14 = local_14 + iVar6 * 4;

        iVar6 = FUN_0043d20a(local_1c, 0x1b); // has courthouse
        if (iVar6 !== 0) {
          local_14 = ((local_14 * 3) / 2) | 0;
        }

        iVar6 = FUN_0043d20a(local_1c, 8); // has walls
        if ((iVar6 !== 0) || (iVar6 = FUN_00453e51(local_84, 6), iVar6 !== 0)) {
          local_14 = local_14 << 1;
        }

        iVar6 = FUN_0043d20a(local_1c, 0x11); // has palace
        if (iVar6 !== 0) {
          local_14 = local_14 * 3;
        }

        // Penalty if on different continent
        iVar6 = FUN_005b8a81(
          s16(DAT_0064f340, local_1c * 0x58),
          s16(DAT_0064f340, local_1c * 0x58 + 2));
        iVar7 = FUN_005b8a81(iVar4, iVar5);
        if (iVar6 !== iVar7) {
          local_14 = (local_14 / 2) | 0;
        }

        if (local_18 < local_14) {
          local_18 = local_14;
          local_3c8 = local_1c;
        }
      }
    }

    // Decide if capital escapes
    local_3c4 = 0;
    if ((999 < s32(DAT_0064c600, local_84 * 0x594 + 0xa2)) &&
       (0 < local_3c8) && (local_398 < 0)) {
      local_1c = local_3c8;

      if ((((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0) ||
         (DAT_006d1da0 !== local_84) || (DAT_00654fa8 !== 0)) {
        if ((((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0) ||
           (DAT_00655b02 < 3) || (DAT_00654fa8 !== 0)) {
          if ((2 < DAT_00655b08) &&
             ((iVar6 = FUN_004a75a6(local_84), iVar6 !== 0) ||
              s16(DAT_0064c600, local_84 * 0x594 + 0x108) > 0xb ||
              s32(DAT_0064c600, local_84 * 0x594 + 0xa2) > 1999)) {
            local_3c4 = 1;
          }
        } else {
          // Multiplayer: ask other player
          DAT_006acb38 = -1;
          FUN_00511880(0x17, 0, 3, 1, DAT_006d1da0, 0);
          // Wait for response... (simplified)
          if (DAT_006acb38 === -1) {
            local_3c4 = 0;
            iVar6 = FUN_004a75a6(local_84);
            if ((iVar6 !== 0) || s16(DAT_0064c600, local_84 * 0x594 + 0x108) > 0xb ||
               s32(DAT_0064c600, local_84 * 0x594 + 0xa2) > 1999) {
              local_3c4 = 1;
            }
          }
        }
      } else {
        // Human player captures own civ's capital — show dialog
        // DEVIATION: Win32 API (FUN_00410030 s_CANESCAPE dialog)
        local_3c4 = FUN_00410030("CANESCAPE", 0, 0);
      }
    }

    // Execute capital escape or destroy capital
    if (local_3c4 === 1) {
      w32(DAT_0064c600, local_84 * 0x594 + 0xa2,
          s32(DAT_0064c600, local_84 * 0x594 + 0xa2) - 1000);
      FUN_0043d289(local_1c, 1, 1);
      // DEVIATION: Win32 API (FUN_00414dd0 s_ESCAPE notification)
      if (((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0) {
        FUN_00441b11(local_3c8, 99);
      }
    } else {
      FUN_004a762d(local_84);
      if (-1 < local_398) {
        DAT_0064f340[local_398 * 0x58 + 0x39] = 0xff;
      }
    }
  }

  // ── Handle wonders in captured city ──
  if ((s8(DAT_0064f340[param_1 * 0x58 + 0x39]) < -0x26) && (DAT_00654fa8 === 0)) {
    // Wonder was being built — announce abandonment
    if (s8(DAT_0064f340[param_1 * 0x58 + 0x39]) < 1) {
      local_3c0 = ~s8(DAT_0064f340[param_1 * 0x58 + 0x39]) + 1;
    } else {
      local_3c0 = s8(DAT_0064f340[param_1 * 0x58 + 0x39]);
    }
    // Show wonder notification...
  }

  // ── Check for wonder captures ──
  if ((((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) !== 0 ||
      ((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) !== 0) && (DAT_00654fa8 === 0)) {
    for (local_8c = 0; local_8c < 0x1c; local_8c = local_8c + 1) {
      uVar9 = FUN_00453e18(local_8c);
      if (uVar9 === param_1) {
        iVar6 = local_8c + 0x27;
        // Show wonder capture/loss notifications
        if (local_8c === 0x14) { // Great Library
          FUN_004ec312(param_2);
        }
      }
    }
  }

  local_74 = FUN_005adfa0(local_74, 0, s32(DAT_0064c600, local_84 * 0x594 + 0xa2));
  w32(DAT_0064c600, local_84 * 0x594 + 0xa2,
      s32(DAT_0064c600, local_84 * 0x594 + 0xa2) - local_74);
  if (param_2 !== 0) {
    w32(DAT_0064c600, param_2 * 0x594 + 0xa2,
        s32(DAT_0064c600, param_2 * 0x594 + 0xa2) + local_74);
  }

  if ((DAT_006d1da0 === param_2) || (DAT_006d1da0 === local_84)) {
    FUN_00569363(1);
  }

  w16(DAT_0064f340, param_1 * 0x58 + 0x1c, 0);
  w32(DAT_0064f340, param_1 * 0x58 + 4,
      u32(DAT_0064f340, param_1 * 0x58 + 4) & 0xffffffc4);

  if (s8(DAT_0064f340[param_1 * 0x58 + 0x39]) >= 0) {
    let bldg = s8(DAT_0064f340[param_1 * 0x58 + 0x39]);
    DAT_0064c600[local_84 * 0x594 + 0x1f4 + bldg] =
         DAT_0064c600[local_84 * 0x594 + 0x1f4 + bldg] - 1;
  }

  // ── Remove capital-related improvements if not original city ──
  if (local_7c === 0) {
    FUN_0043d289(param_1, 1, 0);  // Remove palace
    FUN_0043d289(param_1, 4, 0);  // Remove courthouse-type
    FUN_0043d289(param_1, 0xb, 0);
    FUN_0043d289(param_1, 7, 0);
  }

  // ── Population reduction ──
  if ((param_3 === 0) && (local_7c === 0)) {
    iVar6 = _rand();
    bVar3 = u8(iVar6 >> 31);
    for (local_70 = 0; local_70 < 5; local_70 = local_70 + 1) {
      DAT_0064f340[param_1 * 0x58 + 0x34 + local_70] =
           DAT_0064f340[param_1 * 0x58 + 0x34 + local_70] &
           u8(0xaa >> ((((u8(iVar6) ^ bVar3) - bVar3 & 1 ^ bVar3) - bVar3) & 0x1f));
    }
  }

  // ── Reduce city size ──
  if (((param_3 === 0) && (local_7c === 0)) ||
     (s8(DAT_0064f340[param_1 * 0x58 + 9]) > 1)) {
    local_78 = 0;

    if (param_2 === 0) {
      iVar6 = FUN_005b8a81(iVar4, iVar5);
      for (local_3bc = 1; local_3bc < 8; local_3bc = local_3bc + 1) {
        if (((1 << (u8(local_3bc) & 0x1f)) & u8(DAT_00655b0b)) !== 0 &&
           (DAT_0064c600[local_3bc * 0x594 + 0x332 + iVar6] !== 0)) {
          local_78 = 1;
        }
      }
    }

    // Decide whether to reduce population
    if ((s8(DAT_0064f340[param_1 * 0x58 + 9]) < 2) &&
       ((((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) === 0 &&
         ((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0) ||
        ((param_2 === 0 && ((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) !== 0))) &&
       (((param_2 !== 0 || local_78 !== 0) &&
         ((DAT_00655b0b & DAT_0064f340[param_1 * 0x58 + 0xc]) === 0) &&
         u8(DAT_00655c22[param_2]) !== 7))) {
      if (u8(DAT_00655c22[DAT_00655c21]) < u8(DAT_00655c22[param_2])) {
        uVar9 = Math.floor(Math.random() * 0x7fff);
        uVar10 = uVar9 >> 31;
        if (((uVar9 ^ uVar10) - uVar10 & 1 ^ uVar10) !== uVar10) {
          // Don't reduce — skip
        }
      }
    } else {
      // Reduce population by 1
      DAT_0064f340[param_1 * 0x58 + 9] = DAT_0064f340[param_1 * 0x58 + 9] - 1;
    }

    // If city reaches size 0, destroy it
    if (DAT_0064f340[param_1 * 0x58 + 9] === 0) {
      delete_city(param_1, 0);
      param_1 = 0xffffffff;
    }
  }

  if (param_1 >= 0 && param_1 !== 0xffffffff) {
    w16(DAT_0064c600, param_2 * 0x594 + 0xae, DAT_00655af8);
    FUN_00492c15(param_2, 5, iVar4, iVar5, 4);

    // Update visibility
    FUN_005b9ec6();
    for (local_70 = 0; local_70 < 0x15; local_70 = local_70 + 1) {
      uVar8 = FUN_005ae052(s8(DAT_0064f340[0x28370 + local_70]) + iVar4);
      local_80 = s8(DAT_0064f340[0x283a0 + local_70]) + iVar5;
      iVar6 = FUN_004087c0(uVar8, local_80);
      if (iVar6 !== 0) {
        FUN_005b9c49(uVar8, local_80, param_2, 1);
        if (param_2 === 0) {
          FUN_005b976d(uVar8, local_80, 1, 1, 1);
        }
      }
    }
    FUN_005b9f1c();

    // Set new owner
    DAT_0064f340[param_1 * 0x58 + 8] = u8(param_2);
    FUN_0043cc00(param_1, local_84);

    // Check for events
    if (DAT_00627670 !== 0) {
      FUN_004fc2bb(param_1 * 0x58 + 0x20, param_2, local_84);
    }
  }

  // Update tile ownership
  FUN_005b99e8(iVar4, iVar5, param_2, 1);

  if ((DAT_006d1da0 === param_2) || (DAT_006d1da0 === local_84)) {
    FUN_0046e020(5, 0, 0, 0);
  }

  // ── Notify multiplayer ──
  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x78, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }

  // ── Notify human players of capture ──
  if ((((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) === 0 &&
      ((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0) || (DAT_00654fa8 !== 0)) {
    // AI vs AI or autoplay — notify allied human players
    if (DAT_00654fa8 === 0) {
      for (local_3d8 = 1; local_3d8 < 8; local_3d8 = local_3d8 + 1) {
        if (((1 << (u8(local_3d8) & 0x1f)) & u8(DAT_00655b0a)) !== 0 &&
           ((1 << (u8(local_3d8) & 0x1f)) & u8(DAT_00655b0b)) !== 0) {
          if (DAT_006d1da0 === local_3d8) {
            FUN_0047cea6(iVar4, iVar5);
          }
          // Check alliance notifications...
        }
      }
    }
  } else {
    // Human player involved — show city capture dialog
    if ((DAT_006d1da0 === param_2) || (DAT_006d1da0 === local_84)) {
      FUN_004105f8(iVar4, iVar5, param_2);
      FUN_0047cea6(iVar4, iVar5);
      FUN_004eb80a("CITYCAPTURE", param_1, 0x46, 1, param_2);
    }
    // Send multiplayer notifications if needed
  }

  // ── Steal technology ──
  if (((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 0x20) === 0)) {
    FUN_0057a27a(param_2, local_84);
  }

  // ── Handle units at captured city ──
  if (param_1 < 0 || param_1 === 0xffffffff) {
    // City was destroyed — skip unit handling
  } else {
    // Kill/reassign units belonging to old owner at this city
    local_3cc = DAT_00655b16;
    while (true) {
      local_3cc = local_3cc - 1;
      if (local_3cc < 0) break;

      if ((s16(DAT_006560f0, local_3cc * 0x20 + 0x1a) !== 0) && // unit alive
         (s8(DAT_006560f0[local_3cc * 0x20 + 7]) === local_84) && // owned by old civ
         (u8(DAT_006560f0[local_3cc * 0x20 + 0x10]) === param_1)) { // home city = captured city
        if (u8(DAT_006560f0[local_3cc * 0x20 + 6]) !== 9) { // not diplomat type
          // Check if land unit at city location
          if (((1 << (u8(local_84) & 0x1f)) & u8(DAT_00655b0b)) === 0) {
            let nearby_city = FUN_0043cf76(
              s16(DAT_006560f0, local_3cc * 0x20),
              s16(DAT_006560f0, local_3cc * 0x20 + 2));
            if (nearby_city >= 0 && nearby_city !== param_1) {
              if (s8(DAT_0064b1bc[u8(DAT_006560f0[local_3cc * 0x20 + 6]) * 0x14 + 0x0e]) === 1) {
                iVar6 = FUN_005b53b6(local_3cc, 1);
                if (iVar6 === 1) {
                  DAT_006560f0[local_3cc * 0x20 + 0x10] = u8(nearby_city);
                  local_3cc = DAT_00655b16;
                  continue;
                }
              }
              w32(DAT_0064f340, nearby_city * 0x58 + 4,
                  u32(DAT_0064f340, nearby_city * 0x58 + 4) | 0x20);
            }
          }
          FUN_005b6042(local_3cc, 1); // Kill unit
          local_3cc = DAT_00655b16;
          continue;
        }
        // Diplomat — set home to 0xff (no home)
        DAT_006560f0[local_3cc * 0x20 + 0x10] = 0xff;
      }
    }

    if (((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) !== 0 &&
       ((u8(DAT_0064c600[param_2 * 0x594 + 0xb5]) > 4 ||
         u8(DAT_0064c600[local_84 * 0x594 + 0xb5]) > 4) &&
        DAT_00655b08 !== 0)) {
      w32(DAT_0064f340, param_1 * 0x58 + 4,
          u32(DAT_0064f340, param_1 * 0x58 + 4) | 1);
    }

    // ── Assign production for AI ──
    if (((1 << (u8(param_2) & 0x1f)) & u8(DAT_00655b0b)) === 0) {
      DAT_0064f340[param_1 * 0x58 + 0x39] = 0;
      if (param_2 === 0) {
        DAT_0064f340[param_1 * 0x58 + 0x39] = 5;
        local_3cc = FUN_005b2e69(iVar4, iVar5);
        if (-1 < local_3cc) {
          DAT_0064f340[param_1 * 0x58 + 0x39] = DAT_006560f0[local_3cc * 0x20 + 6];
        }
      }
      DAT_0064c600[param_2 * 0x594 + 0x1f4 + s8(DAT_0064f340[param_1 * 0x58 + 0x39])] =
           DAT_0064c600[param_2 * 0x594 + 0x1f4 + s8(DAT_0064f340[param_1 * 0x58 + 0x39])] + 1;
      FUN_00441b11(param_1, 99);
    } else {
      // ── Human player: assign best available production ──
      FUN_0047cf22(
        s16(DAT_0064f340, param_1 * 0x58),
        s16(DAT_0064f340, param_1 * 0x58 + 2));

      // Try to keep existing production item, or find best alternative
      if (s8(DAT_0064f340[param_1 * 0x58 + 0x39]) < 0 ||
         (iVar6 = FUN_004bfe5a(param_2, param_1, s8(DAT_0064f340[param_1 * 0x58 + 0x39])),
          iVar6 !== 0)) {
        if (s8(DAT_0064f340[param_1 * 0x58 + 0x39]) < 0) {
          if (s8(DAT_0064f340[param_1 * 0x58 + 0x39]) < 1) {
            local_3e0 = ~s8(DAT_0064f340[param_1 * 0x58 + 0x39]) + 1;
          } else {
            local_3e0 = s8(DAT_0064f340[param_1 * 0x58 + 0x39]);
          }
          iVar6 = FUN_004c03ae(param_2, param_1, local_3e0);
          if (iVar6 !== 0) {
            // Keep current production
          } else {
            // Reset and find best
            DAT_0064f340[param_1 * 0x58 + 0x39] = 0;
            local_18 = 0;
            for (local_3b0 = 0x3e; local_3b0 >= 0; local_3b0 = local_3b0 - 1) {
              if ((u8(DAT_0064b1bc[local_3b0 * 0x14 + 0x0e]) === 1) &&
                 (iVar6 = FUN_004bfe5a(param_2, param_1, local_3b0), iVar6 !== 0)) {
                local_14 = (s8(DAT_0064b1bc[local_3b0 * 0x14 + 9]) << 3) /
                           s8(DAT_0064b1bc[local_3b0 * 0x14 + 0x0c]);
                if ((u8(DAT_0064b1bc[local_3b0 * 0x14 + 1]) & 4) !== 0) {
                  local_14 = local_14 + 1;
                }
                if (local_18 < local_14) {
                  local_18 = local_14;
                  DAT_0064f340[param_1 * 0x58 + 0x39] = u8(local_3b0);
                }
                break;
              }
            }
          }
        }
      } else {
        // Can't build current item — find alternative
        DAT_0064f340[param_1 * 0x58 + 0x39] = 0;
        local_18 = 0;
        for (local_3b0 = 0x3e; local_3b0 >= 0; local_3b0 = local_3b0 - 1) {
          if ((u8(DAT_0064b1bc[local_3b0 * 0x14 + 0x0e]) === 1) &&
             (iVar6 = FUN_004bfe5a(param_2, param_1, local_3b0), iVar6 !== 0)) {
            local_14 = (s8(DAT_0064b1bc[local_3b0 * 0x14 + 9]) << 3) /
                       s8(DAT_0064b1bc[local_3b0 * 0x14 + 0x0c]);
            if ((u8(DAT_0064b1bc[local_3b0 * 0x14 + 1]) & 4) !== 0) {
              local_14 = local_14 + 1;
            }
            if (local_18 < local_14) {
              local_18 = local_14;
              DAT_0064f340[param_1 * 0x58 + 0x39] = u8(local_3b0);
            }
            break;
          }
        }
      }

      // Reveal surrounding tiles
      FUN_005b9ec6();
      for (local_70 = 0; local_70 < 8; local_70 = local_70 + 1) {
        uVar8 = FUN_005ae052(s8(DAT_0064f340[0x28350 + local_70]) + iVar4);
        local_80 = s8(DAT_0064f340[0x28360 + local_70]) + iVar5;
        iVar6 = FUN_004087c0(uVar8, local_80);
        if (iVar6 !== 0) {
          iVar6 = FUN_005b8931(uVar8, local_80);
          if (((1 << (u8(param_2) & 0x1f)) & u8(tileRead(iVar6, 4))) === 0) {
            FUN_005b976d(uVar8, local_80, 1 << (u8(param_2) & 0x1f), 1, 1);
            FUN_0047cea6(uVar8, local_80);
          }
        }
      }
      FUN_005b9f1c();

      DAT_0062edf8 = 1;
      FUN_citywin_DADA();
      FUN_handle_city_disorder_00509590(param_1);
      FUN_citywin_DB36();
      DAT_0062edf8 = 0;
    }
  }

  // ── Check if old owner is eliminated ──
  iVar6 = kill_civ(local_84, param_2);

  // ── Partisan generation ──
  if ((iVar6 === 0) && (param_1 >= 0 && param_1 !== 0xffffffff) && (local_7c === 0) &&
     ((u8(DAT_0064c600[local_84 * 0x594 + 0xb5]) === 3 ||
       u8(DAT_0064c600[local_84 * 0x594 + 0xb5]) === 6) ||
      (DAT_00655b40 !== 0 || (iVar6 = FUN_004bd9f0(local_84, 0xf), iVar6 !== 0)))) {
    // Calculate how many partisans to spawn
    let gov_old = u8(DAT_0064c600[local_84 * 0x594 + 0xb5]);
    let gov_new = u8(DAT_0064c600[param_2 * 0x594 + 0xb5]);
    if (gov_old === gov_new || (gov_old - gov_new) < 0) {
      local_3e4 = ~(gov_old - gov_new) + 1;
    } else {
      local_3e4 = gov_old - gov_new;
    }

    let era_old = u8(DAT_00655c22[local_84]);
    let era_new = u8(DAT_00655c22[param_2]);
    if (era_old === era_new || (era_old - era_new) < 0) {
      local_3e8 = ~(era_old - era_new) + 1;
    } else {
      local_3e8 = era_old - era_new;
    }

    let cityPop = s8(DAT_0064f340[param_1 * 0x58 + 9]);
    local_3b4 = (((((cityPop + 5 + ((cityPop + 5) >> 31 & 7)) >> 3) | 0) *
                (local_3e4 + local_3e8 + 1)) / 2) | 0;

    if (param_3 !== 0) {
      local_3b4 = (local_3b4 / 2) | 0;
    }

    // Check for Guerrilla Warfare tech
    iVar6 = FUN_004bd9f0(local_84, 0x11);
    if (iVar6 === 0) {
      local_3b4 = local_3b4 - 1;
    }

    // Check for Communism/Gunpowder
    iVar6 = FUN_004bd9f0(local_84, 0x22);
    if (iVar6 === 0) {
      iVar6 = FUN_004bd9f0(local_84, 0xf);
      if (iVar6 === 0) {
        local_3b4 = 0;
      }
      iVar6 = FUN_004bd9f0(local_84, 0x23);
      if (iVar6 === 0) {
        local_3b4 = 0;
      }
    } else {
      iVar6 = FUN_004bd9f0(param_2, 0x22);
      if (iVar6 === 0) {
        local_3b4 = local_3b4 << 1;
      } else {
        local_3b4 = local_3b4 + 1;
      }
    }

    // Check capturer's government
    // ...simplified...

    local_394 = 0;
    for (local_90 = 0; local_90 < local_3b4; local_90 = local_90 + 1) {
      // Find best tile for partisan placement
      local_18 = 0;
      for (local_70 = 0; local_70 < 0x14; local_70 = local_70 + 1) {
        uVar8 = FUN_005ae052(s8(DAT_0064f340[0x28370 + local_70]) + iVar4);
        local_80 = s8(DAT_0064f340[0x283a0 + local_70]) + iVar5;
        iVar7 = FUN_004087c0(uVar8, local_80);
        if ((iVar7 !== 0) && (iVar7 = FUN_005b89e4(uVar8, local_80), iVar7 === 0) &&
           (iVar7 = FUN_005b8da4(uVar8, local_80), iVar7 < 0)) {
          bVar3 = FUN_005b89bb(uVar8, local_80);
          local_14 = s8(DAT_00627cc0[u8(bVar3) * 0x18 + 9]) * 2;
          uVar9 = FUN_005b94d5(uVar8, local_80);
          if ((uVar9 & 0x10) !== 0) {
            local_14 = local_14 + 1;
          }
          uVar9 = FUN_005b94d5(uVar8, local_80);
          if ((uVar9 & 0x20) !== 0) {
            local_14 = local_14 + 1;
          }
          bVar3 = FUN_005b94d5(uVar8, local_80);
          if ((bVar3 & 0x42) === 0x40) {
            local_14 = local_14 << 1;
          }
          if (local_18 < local_14) {
            local_18 = local_14;
            local_390 = local_80;
            local_98 = uVar8;
          }
        }
      }
      if (local_18 !== 0) {
        local_3cc = FUN_005b3d06(9, local_84, local_98, local_390);
        if (local_3cc >= 0) {
          local_394 = local_394 + 1;
          // Set unit to fortified
          DAT_006560f0[local_3cc * 0x20 + 0x0f] = 2;
          FUN_005b490e(local_3cc, param_2);
          FUN_0047cea6(local_98, local_390);
        }
      }
    }
  }

  // ── Set captured-city metadata ──
  if (param_1 >= 0 && param_1 !== 0xffffffff) {
    DAT_0064f340[param_1 * 0x58 + 0xa] = u8(local_84); // DAT_0064f34a — previous owner
    DAT_0064f340[param_1 * 0x58 + 0xb] = u8(DAT_00655af8); // DAT_0064f34b — turn captured

    uVar9 = FUN_00453e18(0xe);
    if (uVar9 === param_1) {
      FUN_004be6ba(param_2);
    }
  }

  // Final multiplayer sync
  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x78, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e29f — free_text_buffer_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e29f() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057e2b5 — SEH_epilog_12
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e2b5() {
  // SEH epilog — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e2c3 — get_unit_firepower (GAME LOGIC)
// Returns the effective firepower of a unit, considering veteran
// status and fortification bonuses.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e2c3(param_1) {
  let local_8;

  local_8 = s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 8]) * 8;

  // Veteran bonus
  if ((u16(DAT_006560f0, param_1 * 0x20 + 4) & 0x2000) !== 0) {
    local_8 = local_8 + (local_8 >> 1);
  }
  // Fortified bonus
  if ((u16(DAT_006560f0, param_1 * 0x20 + 4) & 0x10) !== 0) {
    local_8 = local_8 + (local_8 >> 1);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e33a — calc_defense_strength (CRITICAL GAME LOGIC)
// Calculates the defense strength of a unit at its current position.
//
// param_1 = unit index (defender)
// param_2 = flag: if nonzero, read terrain/city data fresh
// param_3 = attacker unit index (-1 if none)
//
// Returns defense value used in combat calculations.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e33a(param_1, param_2, param_3) {
  let cVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let pbVar5;
  let uVar6;
  let local_8;

  iVar3 = s16(DAT_006560f0, param_1 * 0x20);     // unit x
  iVar4 = s16(DAT_006560f0, param_1 * 0x20 + 2);  // unit y

  // If param_2 is set, refresh terrain/city data for this tile
  if (param_2 !== 0) {
    bVar2 = FUN_005b89bb(iVar3, iVar4);
    DAT_006acb30 = u8(bVar2);                      // terrain type
    DAT_006acb08 = FUN_0043cf76(iVar3, iVar4);     // city at tile (-1 if none)
  }

  // Get unit defense stat
  cVar1 = s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 9]); // defense value

  // Get tile data: terrain defense bonus + river bonus
  pbVar5 = FUN_005b8931(iVar3, iVar4);
  let byte0 = tileRead(pbVar5, 0);
  let riverBonus = (byte0 >> 7) & 1; // river = +1 defense
  let terrainDefense = s8(DAT_00627cc0[DAT_006acb30 * 0x18 + 9]); // terrain defense from table

  local_8 = (riverBonus + terrainDefense) * cVar1 * 4;

  // ── Determine defense multiplier ──
  DAT_006acb34 = 2; // base multiplier

  // Check if unit is fortified and is a ground unit (domain == 0)
  if ((s8(DAT_006560f0[param_1 * 0x20 + 0x0f]) === 2) && // fortified
     (s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 0)) { // land unit
    DAT_006acb34 = 3; // fortified bonus
  }

  // ── Fortress bonus ──
  bVar2 = FUN_005b94d5(iVar3, iVar4);
  if ((u8(bVar2) & 0x42) === 0x40) { // fortress without city
    if (param_3 < 0) {
      DAT_006acb34 = 4; // fortress against unknown attacker
    } else if ((s8(DAT_0064b1bc[u8(DAT_006560f0[param_3 * 0x20 + 6]) * 0x14 + 5]) !== 1) && // not air
              ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_3 * 0x20 + 6]) * 0x14]) & 0x40) === 0)) { // not ignores fortress
      DAT_006acb34 = 4;
    }
  }

  // ── City walls / coastal fortress / SAM battery bonuses ──
  if (DAT_006acb08 >= 0) {
    // Check if defender is air unit with "ignore walls" attacking ground unit
    if ((s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 1) && // air unit
       (param_3 >= 0) &&
       ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14]) & 0x10) !== 0)) { // has flag
      uVar6 = u8(DAT_006560f0[param_3 * 0x20 + 6]);
      if (s8(DAT_0064b1bc[uVar6 * 0x14 + 5]) === 1 && // attacker is air
         (u8(DAT_0064b1bc[uVar6 * 0x14 + 1]) & 0x10) === 0) { // attacker no air defense
        if ((u8(DAT_0064b1bc[uVar6 * 0x14]) & 0x10) === 0) {
          DAT_006acb34 = DAT_006acb34 << 2; // x4 SAM battery effect
        } else {
          DAT_006acb34 = DAT_006acb34 << 1; // x2
        }
        // Skip city wall check
      } else {
        // Check for city walls improvement
        iVar3 = FUN_0043d20a(DAT_006acb08, 8); // city walls
        if ((iVar3 !== 0 ||
            (iVar3 = FUN_00453e51(s8(DAT_006560f0[param_1 * 0x20 + 7]), 6), iVar3 !== 0)) &&
           (s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 0)) { // land unit
          if (param_3 < 0) {
            DAT_006acb34 = 6; // walls vs unknown
          } else if ((s8(DAT_0064b1bc[u8(DAT_006560f0[param_3 * 0x20 + 6]) * 0x14 + 5]) === 0) && // land attacker
                    ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_3 * 0x20 + 6]) * 0x14]) & 0x40) === 0)) { // doesn't ignore walls
            DAT_006acb34 = 6; // walls bonus
          }
        }
      }
    } else {
      // Non-air defender in city
      iVar3 = FUN_0043d20a(DAT_006acb08, 8); // city walls
      if ((iVar3 !== 0 ||
          (iVar3 = FUN_00453e51(s8(DAT_006560f0[param_1 * 0x20 + 7]), 6), iVar3 !== 0)) &&
         (s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 0)) { // land unit
        if (param_3 < 0) {
          DAT_006acb34 = 6;
        } else if ((s8(DAT_0064b1bc[u8(DAT_006560f0[param_3 * 0x20 + 6]) * 0x14 + 5]) === 0) &&
                  ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_3 * 0x20 + 6]) * 0x14]) & 0x40) === 0)) {
          DAT_006acb34 = 6;
        }
      }
    }
  }

  // Non-land units don't get terrain multiplier
  if (s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) !== 0) {
    DAT_006acb34 = 2; // reset to base
  }

  // Apply defense multiplier
  if (DAT_006acb34 !== 2) {
    local_8 = (local_8 * DAT_006acb34) >> 1;
  }

  // ── Veteran bonus ──
  if ((u16(DAT_006560f0, param_1 * 0x20 + 4) & 0x2000) !== 0) {
    local_8 = local_8 + (local_8 >> 1); // +50%
  }

  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e6e2 — find_best_defender (GAME LOGIC)
// Finds the unit in a stack that provides the best defense.
//
// param_1 = stack leader unit index
// param_2 = attacker unit index (-1 if none)
//
// Returns the unit index of the best defender.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e6e2(param_1, param_2) {
  let sVar1;
  let sVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = param_1;

  if (param_1 >= 0) {
    sVar1 = s16(DAT_006560f0, param_1 * 0x20);      // x
    sVar2 = s16(DAT_006560f0, param_1 * 0x20 + 2);   // y
    bVar3 = FUN_005b89bb(sVar1, sVar2);
    DAT_006acb30 = u8(bVar3);
    DAT_006acb08 = FUN_0043cf76(sVar1, sVar2);

    // Iterate through all units in the stack
    for (param_1 = FUN_005b2d39(param_1); param_1 >= 0; param_1 = FUN_005b2c82(param_1)) {
      // Skip sea units defending on ocean
      if ((DAT_006acb30 !== 10) ||
         (s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) !== 0)) {
        local_10 = FUN_0057e33a(param_1, 0, param_2);

        // Apply HP ratio if damage affects defense
        if ((DAT_00655ae8 & 0x10) !== 0) {
          iVar4 = FUN_005b29d7(param_1); // current HP
          iVar5 = FUN_005b29aa(param_1); // max HP
          local_10 = ((iVar4 * local_10) / iVar5) | 0;
        }

        // Pikeman vs mounted bonus
        if ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 1]) & 4) !== 0) {
          local_10 = local_10 + 1;
        }

        // Anti-air bonus
        if ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 1]) & 0x20) !== 0) {
          if (param_2 === -1) {
            local_10 = local_10 + 1;
          } else if (s8(DAT_0064b1bc[u8(DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 5]) === 1) {
            // Air attacker — bonus depends on attacker having air defense
            if ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 1]) & 0x10) === 0) {
              local_10 = local_10 * 3;
            } else {
              local_10 = local_10 * 5;
            }
          }
        }

        // Fighter vs fighter bonus
        if (((u8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14]) & 0x10) !== 0) &&
           (param_2 !== -1) &&
           (s8(DAT_0064b1bc[u8(DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 5]) === 1) &&
           ((u8(DAT_0064b1bc[u8(DAT_006560f0[param_2 * 0x20 + 6]) * 0x14]) & 0x10) !== 0)) {
          local_10 = local_10 << 1;
        }

        // Submarine in city penalty
        if ((s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 2) &&
           (DAT_006acb08 >= 0)) {
          if (param_2 === -1) {
            local_10 = (local_10 / 2) | 0;
          } else if ((s8(DAT_0064b1bc[u8(DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 5]) === 1) &&
                    (iVar4 = FUN_0043d20a(DAT_006acb08, 0x1b), iVar4 === 0)) {
            local_10 = local_10 << 1;
          } else {
            local_10 = (local_10 / 2) | 0;
          }
        }

        if (local_8 <= local_10) {
          local_8 = local_10;
          local_c = param_1;
        }
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e9f9 — kill_unit_in_combat (GAME LOGIC)
// Handles killing a unit (updating stats, calling events, etc.)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e9f9(param_1, param_2, param_3, param_4) {
  let unitOwner = s8(DAT_006560f0[param_1 * 0x20 + 7]);
  let unitType = u8(DAT_006560f0[param_1 * 0x20 + 6]);

  if (DAT_0064c600[unitOwner * 0x594 + 0x1b6 + unitType] !== 0xff) {
    DAT_0064c600[unitOwner * 0x594 + 0x1b6 + unitType] =
         DAT_0064c600[unitOwner * 0x594 + 0x1b6 + unitType] + 1;
  }

  if ((unitOwner === DAT_006d1da0) || (DAT_00655b02 < 3)) {
    FUN_0059c575(param_1, param_2, DAT_00655afa, param_3, param_4);
  } else if ((2 < DAT_00655b02) &&
            ((u8(DAT_00655b0b) & (1 << (DAT_006560f0[param_1 * 0x20 + 7] & 0x1f))) !== 0)) {
    FUN_0046b14d(100, 0, param_1, param_2, DAT_00655afa, param_3, param_4, 0, 0, 0);
  }

  DAT_006acb0c = DAT_006acb0c + 1;

  if (DAT_00627670 !== 0) {
    FUN_004fbd9d(unitType, s8(DAT_006560f0[param_2 * 0x20 + 7]), unitOwner);
  }

  FUN_005b4391(param_1, 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057eb94 — kill_all_units_in_stack (GAME LOGIC)
// Kills all units in a stack (param_1 = stack bottom)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057eb94(param_1, param_2, param_3, param_4) {
  DAT_006acb0c = 0;
  param_1 = FUN_005b2d39(param_1);
  while (param_1 >= 0) {
    let sVar1 = s16(DAT_006560f0, param_1 * 0x20 + 0x18); // next in stack
    FUN_0057e9f9(param_1, param_2, param_3, param_4);
    param_1 = sVar1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057ebfd — promote_unit (GAME LOGIC)
// Promotes a unit to veteran status
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057ebfd(param_1) {
  if (((u16(DAT_006560f0, param_1 * 0x20 + 4) & 0x2000) === 0) &&
     ((DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 1] & 0x10) === 0)) {
    w16(DAT_006560f0, param_1 * 0x20 + 4,
        u16(DAT_006560f0, param_1 * 0x20 + 4) | 0x2000);
    if (((u8(DAT_00655b0b) & (1 << (DAT_006560f0[param_1 * 0x20 + 7] & 0x1f))) !== 0) &&
       (DAT_00654fa8 === 0)) {
      FUN_004271e8(0, u32(DAT_0064b1bc, u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 - 4));
      if (s8(DAT_006560f0[param_1 * 0x20 + 7]) === DAT_006d1da0) {
        FUN_004442e0("PROMOTED", param_1);
      } else if (2 < DAT_00655b02) {
        FUN_00511880(0x20, 0, 1, 0, param_1, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057ed3f — play_combat_animation (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057ed3f(param_1, param_2, param_3) {
  // Combat animation — UI only, no-op in JS
  DAT_006ad908 = 1;
  // ... animation frames ...
  DAT_006ad908 = 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057f628 — destroy_combat_animation_data
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f628() {
  // C++ destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057f648 — SEH_epilog_13
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f648() {
  // SEH epilog — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057f657 — show_nuke_animation (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f657(param_1, param_2) {
  // Nuclear explosion animation — UI only, no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057f9e3 — nuclear_attack (GAME LOGIC)
// Handles nuclear missile strike on a tile.
// param_1 = attacking civ
// param_2 = target x
// param_3 = target y
// param_4 = flag (check for SDI)
// Returns 1 if strike succeeds, 0 if intercepted.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f9e3(param_1, param_2, param_3, param_4) {
  let cVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_14;
  let local_c;
  let local_8;

  iVar2 = FUN_005b8da4(param_2, param_3);
  local_c = u8(iVar2);

  // ── Check for SDI defense ──
  if (param_4 !== 0) {
    for (local_14 = 0; local_14 < DAT_00655b18; local_14 = local_14 + 1) {
      if (((s16(DAT_0064f340, local_14 * 0x58 + 0x54) !== 0) &&
          (s8(DAT_0064f340[local_14 * 0x58 + 8]) !== param_1)) &&
         ((iVar4 = FUN_0043d20a(local_14, 0x11), iVar4 !== 0) &&
          (iVar4 = FUN_005ae1b0(
            s16(DAT_0064f340, local_14 * 0x58),
            s16(DAT_0064f340, local_14 * 0x58 + 2),
            param_2, param_3), iVar4 < 4))) {
        // SDI within range — nuke intercepted
        return 0;
      }
    }
  }

  // ── Execute nuclear strike ──
  FUN_0057f657(param_2, param_3);

  // Kill all units in 9-tile area
  for (local_8 = 0; local_8 < 9; local_8 = local_8 + 1) {
    uVar3 = FUN_005ae052(s8(DAT_0064f340[0x28350 + local_8]) + param_2);
    cVar1 = s8(DAT_0064f340[0x28360 + local_8]);
    iVar2 = FUN_004087c0(uVar3, cVar1 + param_3);
    if ((iVar2 !== 0) && (iVar2 = FUN_005b2e69(uVar3, cVar1 + param_3), -1 < iVar2)) {
      if (s8(DAT_006560f0[iVar2 * 0x20 + 7]) !== param_1) {
        let unitOwner = s8(DAT_006560f0[iVar2 * 0x20 + 7]);
        let off1 = unitOwner * 0x594 + param_1 * 4;
        w32(DAT_0064c6c0, off1, u32(DAT_0064c6c0, off1) | 0x110);
        let off2 = unitOwner * 4 + param_1 * 0x594;
        w32(DAT_0064c6c0, off2, u32(DAT_0064c6c0, off2) | 0x20000);
        FUN_00456f20(unitOwner, param_1, 100);
      }
      FUN_005b47fa(iVar2, 1);
    }
  }

  // Destroy terrain improvements
  FUN_005b9179(param_2, param_3);

  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057febc — scramble_air_defense (GAME LOGIC)
// Orders air units to intercept an incoming attack
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057febc(param_1, param_2, param_3) {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_14;

  local_14 = 0;
  while (true) {
    if (DAT_00655b16 <= local_14) {
      // Second pass: order nearby interceptors to scramble
      iVar1 = FUN_005b8a1d(param_2, param_3);
      iVar2 = FUN_005b8a81(param_2, param_3);

      for (local_14 = 0; local_14 < DAT_00655b16; local_14 = local_14 + 1) {
        if ((s16(DAT_006560f0, local_14 * 0x20 + 0x1a) !== 0) &&
           ((s8(DAT_006560f0[local_14 * 0x20 + 7]) === param_1 ||
            ((s8(DAT_006560f0[local_14 * 0x20 + 7]) !== iVar1 &&
             ((DAT_0064c6c0[s8(DAT_006560f0[local_14 * 0x20 + 7]) * 4 + param_1 * 0x594] & 8) !== 0) &&
             ((u8(DAT_00655b0b) & (1 << (u8(DAT_006560f0[local_14 * 0x20 + 7]) & 0x1f))) === 0)))) &&
           (s8(DAT_0064b1bc[u8(DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 5]) === 0) && // land unit
           (s8(DAT_0064b1bc[u8(DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 8]) !== 0) && // has attack
           (iVar3 = FUN_005b2c3d(local_14), iVar3 !== 0))) {
          // Check if unit can reach target
          if ((u8(DAT_0064b1bc[u8(DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 0x0e]) !== 1) ||
             (iVar3 = FUN_005b8ca6(
               s16(DAT_006560f0, local_14 * 0x20),
               s16(DAT_006560f0, local_14 * 0x20 + 2)), iVar3 < 0)) {
            iVar3 = FUN_005ae1b0(
              param_2, param_3,
              s16(DAT_006560f0, local_14 * 0x20),
              s16(DAT_006560f0, local_14 * 0x20 + 2));
            iVar3 = FUN_005b8a81(
              s16(DAT_006560f0, local_14 * 0x20),
              s16(DAT_006560f0, local_14 * 0x20 + 2));
            if (iVar3 === iVar2) {
              // Set unit to intercept
              DAT_006560f0[local_14 * 0x20 + 0x0f] = 0x0b; // goto order
              // Set target coords
              // DAT_00656102[local_14] = param_2, DAT_00656104[local_14] = param_3
            }
          }
        }
      }
      return;
    }

    // First pass: check for fighters that can immediately intercept
    if (((s16(DAT_006560f0, local_14 * 0x20 + 0x1a) !== 0) &&
        (s8(DAT_006560f0[local_14 * 0x20 + 7]) === param_1)) &&
       ((u8(DAT_0064b1bc[u8(DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 1]) & 1) !== 0) &&
       (iVar1 = FUN_005b8ca6(
         s16(DAT_006560f0, local_14 * 0x20),
         s16(DAT_006560f0, local_14 * 0x20 + 2)), iVar1 >= 0) &&
       ((u8(DAT_006560f0[local_14 * 0x20 + 8]) === 0 ||
        (u16(DAT_006560f0, local_14 * 0x20 + 4) & 0x100) !== 0)) &&
       ((u16(DAT_006560f0, local_14 * 0x20 + 4) & 0x10) === 0)) {
      iVar1 = FUN_005ae1b0(
        s16(DAT_006560f0, local_14 * 0x20),
        s16(DAT_006560f0, local_14 * 0x20 + 2),
        param_2, param_3);
      if (iVar1 <= u8(DAT_0064bcdb)) {
        break; // Found interceptor
      }
    }
    local_14 = local_14 + 1;
  }

  FUN_004ca39e(local_14, param_2, param_3);
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
// Functions called from other blocks — stubbed as no-ops or
// returning default values until fully transpiled.
// ═══════════════════════════════════════════════════════════════════

function _rand() { return Math.floor(Math.random() * 0x7fff); }
function FUN_005c656b() { /* bitmap cleanup */ }
function FUN_005c64da() { /* bitmap init */ }
function FUN_005cde4d() { /* CString cleanup */ }
function FUN_005cdf50() { /* select drawing surface */ }
function FUN_005cef31() { /* bitblt rect */ }
function FUN_005cf23f() { /* invalidate window */ }
function FUN_005cf467() { /* set sprite count */ }
function FUN_005cedad() { /* copy sprite region */ }
function FUN_005cec44() { /* stretch blit */ }
function FUN_005cef66() { /* transparent blit */ }
function FUN_005cebb4() { /* set clip rect */ }
function FUN_005c044a() { /* set palette entries */ }
function FUN_005c041f() { /* set background color */ }
function FUN_005c00ce() { /* save DC state */ }
function FUN_005c0073() { /* restore DC state */ }
function FUN_005c0333() { /* draw line */ }
function FUN_005c0c5d() { /* set pixel */ }
function FUN_005c0bf2() { /* get pixel */ return 0; }
function FUN_005c61b0() { /* update window */ }
function FUN_005bd65c() { /* select bitmap */ }
function FUN_005bb574() { /* end paint */ }
function FUN_005bb4ae() { /* create window */ }
function FUN_005bcdfc() { /* set menu */ }
function FUN_005bf071() { return 0; /* load GIF */ }
function FUN_005f22d0() { /* strcpy */ }
function FUN_005f22e0() { /* strcat */ }
function FUN_005dcc10() { /* init CRichEditDoc */ }
function FUN_005e0f2a() { return 0; }
function FUN_005e1226() { /* delete menu item */ }
function FUN_005e14c8() { /* modify menu item text */ }
function FUN_005e1118() { /* check menu item */ }
function FUN_005e11be() { /* gray menu item */ }
function FUN_005e10fb() { /* draw menu bar */ }
function FUN_0040f570() { /* destroy GDI object */ }
function FUN_0040fbb0() { /* delete object */ }
function FUN_0040f010() { /* delete operator */ }
function FUN_0059df8a() { /* free text buffer */ }
function FUN_0059db08() { /* allocate text buffer */ }
function FUN_0059c575() { /* play death animation */ }
function FUN_0059ec88() { /* show wonder movie */ }
function FUN_00467750() { /* set diplomacy flags */ }
function FUN_00467825() { /* set diplomacy event */ }
function FUN_00467933() { /* set diplomacy attitude */ }
function FUN_0045ac71() { /* break treaty */ }
function FUN_00453e18() { return -1; /* get wonder city */ }
function FUN_00453e51() { return 0; /* has_improvement (global) */ }
function FUN_0043d20a() { return 0; /* has_city_improvement */ }
function FUN_0043d289() { /* set/clear city improvement */ }
function FUN_0043cc00() { /* recalculate city */ }
function FUN_0043cf76() { return -1; /* find city at coords */ }
function FUN_0043c9d0() { /* show game text popup */ }
function FUN_00442541() { /* ai: choose new production */ }
function FUN_00441b11() { /* ai: assign city production */ }
function FUN_004a762d() { /* anarchy/government change */ }
function FUN_004a7577() { return 0; /* is_ai_only_civ */ }
function FUN_004a75a6() { return 0; /* has_spaceship */ }
function FUN_004bd9f0_stub() { return 0; }
function FUN_004bdb2c() { return 0; /* tech_priority */ }
function FUN_004bf05b() { /* give_tech */ }
function FUN_004bfe5a() { return 0; /* can_build_unit */ }
function FUN_004c03ae() { return 0; /* can_build_improvement */ }
function FUN_004c0cf7() { /* start negotiation */ }
function FUN_004c4240() { /* show tech stolen popup */ }
function FUN_004eb80a() { /* show city event popup */ }
function FUN_004ec312() { /* great_library_effect */ }
function FUN_004fc20d() { return 0; /* check_civil_war_eligible */ }
function FUN_004fc2bb() { /* fire city capture event */ }
function FUN_004fbd9d() { /* fire unit killed event */ }
function FUN_004be6ba() { /* update wonder effects */ }
function FUN_00492c15() { /* create explorer unit */ }
function FUN_00493c7d() { return ""; /* get civ adjective */ }
function FUN_004105f8() { /* center map on tile */ }
function FUN_00410030() { return 0; /* show dialog with buttons */ }
function FUN_00410070() { return ""; /* get civ name */ }
function FUN_0040ff60() { /* set text substitution var */ }
function FUN_0040ff30() { /* set text substitution int */ }
function FUN_00421da0() { /* set timer */ }
function FUN_00421bb0() { return 0; /* get tick count */ }
function FUN_004271e8() { /* set icon/image */ }
function FUN_0040bbb0() { /* begin text formatting */ }
function FUN_0040bbe0() { /* add text line */ }
function FUN_0040bc10() { /* add formatted text */ }
function FUN_0040bc80() { return 0; /* show popup dialog */ }
function FUN_0040fe10() { /* flush text */ }
function FUN_00414dd0() { /* show message and unit */ }
function FUN_004442e0() { /* show advisor popup */ }
function FUN_00444270() { /* show error message */ }
function FUN_004cc870() { /* show game message */ }
function FUN_0046e020() { /* play sound effect */ }
function FUN_0046e287() { /* flush sound */ }
function FUN_0046b14d() { /* send multiplayer message */ }
function FUN_00511880() { /* send multiplayer event */ }
function FUN_004b0b53() { /* sync game state */ }
function FUN_0047e94e() { /* process network messages */ }
function FUN_0047cf9e() { /* update civ screen */ }
function FUN_0047cf22() { /* refresh city screen */ }
function FUN_0047cea6() { /* refresh map tile */ }
function FUN_0047c3e0() { return 0; /* check combat window */ }
function FUN_0047dfb0() { return 32; /* get sprite dimension */ }
function FUN_0047df20() { /* set animation frame */ }
function FUN_0047dff0() { /* start animation */ }
function FUN_0047df50() { /* stop animation */ }
function FUN_0047a6b0() { /* get tile screen coords */ }
function FUN_00569363() { /* update status bar */ }
function FUN_0056c5fc() { /* swap sprite buffers */ }
function FUN_0055bef9() { return 0; /* check senate override */ }
function FUN_00456f20() { /* set attitude toward civ */ }
function FUN_004ca39e() { /* order unit to intercept */ }
function FUN_004abfe5() { return 0; /* pathfind */ }
function XD_FlushSendBuffer() { /* flush network */ }
function delete_city() { /* destroy city */ }
function kill_civ() {}
function new_civ() {}
function FUN_005b99e8() { /* update tile ownership */ }
function FUN_005b9ec6() { /* begin visibility update */ }
function FUN_005b9f1c() { /* end visibility update */ }
function FUN_005b976d() { /* set tile visibility */ }
function FUN_005b9c49() { /* update tile for civ */ }
function FUN_005b8b1a() { /* notify tile change */ }
function FUN_005b8da4() { return -1; /* get tile owner */ }
function FUN_005b8a81() { return 0; /* get continent id */ }
function FUN_005b50ad() { return 0; /* count units on continent */ }
function FUN_005b2e69() { return -1; /* find unit at tile */ }
function FUN_005b2d39() { return -1; /* get stack bottom */ }
function FUN_005b2c82() { return -1; /* get next in stack */ }
function FUN_005b2c3d() { return 0; /* get moves remaining */ }
function FUN_005b53b6() { return 0; /* count_stackable */ }
function FUN_005b3d06() { return -1; /* create unit */ }
function FUN_005b490e() { /* assign unit to civ */ }
function FUN_005b4391() { /* delete unit */ }
function FUN_005b47fa() { /* kill unit at tile */ }
function FUN_005b6042() { /* disband unit */ }
function FUN_005b8b65() { return 0; /* is tile visible to civ */ }
function FUN_005b29d7() { return 10; /* get current HP */ }
function FUN_005b29aa() { return 10; /* get max HP */ }
function FUN_005b9179() { /* destroy improvements at tile */ }
function FUN_005ae31d() { return 0; /* calculate distance */ }
function FUN_005ae1b0() { return 0; /* calculate straight distance */ }
function FUN_005adfa0() { return 0; /* clamp value */ }
function FUN_citywin_DADA() { /* city window update 1 */ }
function FUN_handle_city_disorder_00509590() { /* check city disorder */ }
function FUN_citywin_DB36() { /* city window update 2 */ }
function build_menu_128C() { /* build menu entry */ }
