// ═══════════════════════════════════════════════════════════════════
// block_004B0000.js — Mechanical transpilation of block_004B0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004B0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004B0000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8, s16 } from './mem.js';

// s32, w16, w32 imported from mem.js above

import { FUN_004bd9f0 as _FUN_004bd9f0 } from './fn_utils.js';
// Re-export FUN_004bd9f0 (already defined in fn_utils.js)
export { _FUN_004bd9f0 as FUN_004bd9f0 };


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_00655b18 = 0;
let DAT_00655b16 = 0;
let DAT_00655b02 = 0;
let DAT_006ad308 = 0;
let DAT_006d1da0 = 0;
let DAT_006d1160 = 0;
let DAT_006d1162 = 0;
let DAT_006d1164 = 0;
let DAT_006d1168 = 0;
let DAT_006d116a = 0;
let DAT_006d116c = 0;
let DAT_00655ae8 = 0;
let DAT_00655aea = 0;
let DAT_00655aee = 0;
let DAT_00655af0 = 0;
let DAT_00655af2 = 0;
let DAT_00655af8 = 0;
let DAT_00655afa = 0;
let DAT_00655afe = 0;
let DAT_00655b00 = 0;
let DAT_00655b03 = 0;
let DAT_00655b04 = 0;
let DAT_00655b05 = 0;
let DAT_00655b07 = 0;
let DAT_00655b0a = 0;
let DAT_00655b0b = 0;
let DAT_00655bce = 0;
let DAT_00655c14 = 0;
let DAT_00655c16 = 0;
let DAT_00626a24 = 0;
let DAT_00626a2c = 0;
let DAT_00628064 = 0;
let DAT_00628420 = 0;
let DAT_0062804c = 0;
let DAT_00633584 = 0;
let DAT_00634814 = 0;
let DAT_00634818 = 0;
let DAT_00635a08 = 0;
let DAT_00635a0c = 0;
let DAT_00635a3c = 0;
let DAT_00635aa0 = 0;
let DAT_00635aa4 = 0;
let DAT_00636598 = 0;
let DAT_006365c4 = 0;
let DAT_006365c8 = 0;
let DAT_006365cc = 0;
let DAT_006365d0 = 0;
let DAT_006365d4 = 0;
let DAT_006365d8 = 0;
let DAT_006365dc = 0;
let DAT_006365e0 = 0;
let DAT_006365e4 = 0;
let DAT_00654b40 = new Uint8Array(0x494);
let DAT_00654c7a = 0;
let DAT_00654fa8 = 0;
let DAT_00654fae = 0;
let DAT_006553d8 = 0;
let DAT_006554f8 = new Uint8Array(0x3f0);
let DAT_00655128 = new Uint8Array(0x154);
let DAT_00655ae8 = new Uint8Array(0x14c);
let DAT_00655c38 = new Uint8Array(0x4b0);
let DAT_0062d0a4 = "";
let DAT_0062d0a8 = "";
let DAT_0062d0ac = "";
let DAT_0062d0b0 = "";
let DAT_0062d0b8 = 0;
let DAT_0062d0bc = null;
let DAT_0062d0c0 = 0;
let DAT_0062d0c4 = 0;
let DAT_0062d7d0 = 0;
let DAT_0062d7d4 = 0;
let DAT_0062d7e0 = 0;
let DAT_0062d7e4 = 0;
let DAT_0062d7e8 = 0;
let DAT_0062d7ec = 0;
let DAT_0062d85c = 0;
let DAT_0062d858 = 0;
let DAT_0062d860 = 0;
let DAT_0062d864 = 0;
let DAT_0062d868 = 0;
let DAT_0062d86c = null;
let DAT_0062d870 = null;
let DAT_006665fa = 0;
let DAT_006665fc = 0;
let DAT_006ab198 = 0;
let DAT_006ad2f7 = 0;
let DAT_006c8ffc = 0;
let DAT_006c91e4 = 0;
let DAT_006c91e8 = 0;
let DAT_006c91ec = 0;
let DAT_006c91f0 = 0;
let DAT_006c91f4 = 0;
let DAT_006a1864 = 0;
let DAT_006a8c00 = 0;
let DAT_0069b03c = 0;
let DAT_0068aee0 = 0;
let DAT_0068aedc = 0;
let DAT_0068acfc = 0;

let DAT_0064b1b8 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1bc = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1c0 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1c1 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1c2 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1c4 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1c5 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1c6 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1c9 = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1ca = new Uint8Array(0x14 * 0x3e);
let DAT_0064b1cb = new Uint8Array(0x14 * 0x3e);
let DAT_0064b251 = 0;
let DAT_0064b340 = 0;
let DAT_0064b341 = 0;
let DAT_0064b347 = 0;
let DAT_0064b3fb = 0;
let DAT_0064b44b = 0;
let DAT_0064b45f = 0;
let DAT_0064b487 = 0;
let DAT_0064b527 = 0;
let DAT_0064b984 = new Uint8Array(8);
let DAT_0064b98c = 0;
let DAT_0064b9a0 = new Uint8Array(32);
let DAT_0064b9c0 = new Uint8Array(32);
let DAT_0064ba28 = new Uint8Array(0x1c);
let DAT_0064bc60 = new Uint8Array(100);
let DAT_0064bcc8 = 0;
let DAT_0064bccc = 0;
let DAT_0064bcd1 = 0;
let DAT_0064bcd2 = 0;
let DAT_0064bcf8 = new Uint8Array(0x790);
let DAT_0064c488 = new Uint8Array(0x43 * 8);
let DAT_0064c48e = new Uint8Array(0x43 * 8);
let DAT_0064c49c = 0;
let DAT_0064c4d6 = 0;
let DAT_0064c546 = 0;
let DAT_0064c59e = 0;
let DAT_0064c5c0 = new Uint8Array(200);
let DAT_0064c5e0 = 0;
let DAT_0064c630 = 0;
let DAT_0064c6a0 = new Uint8Array(8 * 0x594);
let DAT_0064c6aa = new Uint8Array(8 * 0x594);
let DAT_0064c6a2 = new Uint8Array(8 * 0x594);
let DAT_0064c6a6 = new Uint8Array(8 * 0x594);
let DAT_0064c6b0 = new Uint8Array(8 * 0x594);
let DAT_0064c6b3 = new Uint8Array(8 * 0x594);
let DAT_0064c6b4 = new Uint8Array(8 * 0x594);
let DAT_0064c6b5 = new Uint8Array(8 * 0x594);
let DAT_0064c6be = new Uint8Array(8 * 0x594);
let DAT_0064c6c0 = new Uint8Array(8 * 0x594);
let DAT_0064c6c1 = new Uint8Array(8 * 0x594);
let DAT_0064c6c3 = new Uint8Array(8 * 0x594);
let DAT_0064c6e0 = new Uint8Array(8 * 0x594);
let DAT_0064c6f8 = new Uint8Array(8 * 0x594);
let DAT_0064c6b1 = new Uint8Array(8 * 0x594);
let DAT_0064c6f8 = new Uint8Array(8 * 0x594);
let DAT_0064c714 = new Uint8Array(8 * 0x594);
let DAT_0064c70a = new Uint8Array(8 * 0x594);
let DAT_0064c7a8 = new Uint8Array(8 * 0x594);
let DAT_0064c7a9 = new Uint8Array(8 * 0x594);
let DAT_0064c832 = new Uint8Array(8 * 0x594);
let DAT_0064c932 = new Uint8Array(8 * 0x594);
let DAT_0064f340 = new Uint8Array(256 * 0x58);
let DAT_0064f344 = new Uint8Array(256 * 0x58);
let DAT_0064f346 = new Uint8Array(256 * 0x58);
let DAT_0064f348 = new Uint8Array(256 * 0x58);
let DAT_0064f349 = new Uint8Array(256 * 0x58);
let DAT_0064f360 = new Uint8Array(256 * 0x58);
let DAT_0064f37a = new Uint8Array(256 * 0x58);
let DAT_0064f379 = new Uint8Array(256 * 0x58);
let DAT_0064f38c = new Uint8Array(256 * 0x58);
let DAT_0064f38e = new Uint8Array(256 * 0x58);
let DAT_0064f392 = new Uint8Array(256 * 0x58);
let DAT_0064f393 = new Uint8Array(256 * 0x58);
let DAT_0064f394 = new Uint8Array(256 * 0x58);
let DAT_006560f0 = new Uint8Array(2048 * 0x20);
let DAT_006560f2 = new Uint8Array(2048 * 0x20);
let DAT_006560f4 = new Uint8Array(2048 * 0x20);
let DAT_006560f6 = new Uint8Array(2048 * 0x20);
let DAT_006560f7 = new Uint8Array(2048 * 0x20);
let DAT_0065610a = new Uint8Array(2048 * 0x20);
let DAT_00655b1e = new Uint8Array(100);
let DAT_00655b82 = new Uint8Array(100);
let DAT_00655be6 = new Uint8Array(0x1c * 2);
let DAT_00655c22 = new Uint8Array(8);
let DAT_00666130 = new Uint8Array(0x40 * 0x10);
let DAT_00666134 = new Uint8Array(0x40 * 0x10);
let DAT_00666137 = new Uint8Array(0x40 * 0x10);
let DAT_00627680 = new Uint8Array(100 * 0x10);
let DAT_00627684 = new Uint8Array(100 * 0x10);
let DAT_00627689 = new Uint8Array(100 * 0x10);
let DAT_0062768a = new Uint8Array(100 * 0x10);
let DAT_0062768b = new Uint8Array(100 * 0x10);
let DAT_0062768c = new Uint8Array(100 * 0x10);
let DAT_0062768d = new Uint8Array(100 * 0x10);
let DAT_0062768e = new Uint8Array(100 * 0x10);
let DAT_0062768f = new Uint8Array(100 * 0x10);
let DAT_00627cc0 = new Uint8Array(0xb * 0x18);
let DAT_00628350 = new Int8Array([-1, 1, 2, 1, -1, -1, -2, -1]);
let DAT_00628360 = new Int8Array([-1, -1, 0, 1, 1, 1, 0, -1]);
let DAT_006554fa = new Uint8Array(0x30 * 22);
let DAT_006ad30c = new Uint8Array(1024);
let DAT_006ad558 = new Int32Array(8);
let DAT_0064c5e0 = 0;
let DAT_0064c630 = 0;
let DAT_0064c6a6 = new Uint8Array(8 * 0x594);
let DAT_0064c932 = new Uint8Array(8 * 0x594);
let DAT_006451d8 = new Uint8Array(0x100);
let DAT_00646cb8 = new Uint8Array(0x4000);
let DAT_006468f0 = new Uint8Array(0x100);
let DAT_0063fc58 = new Uint8Array(0x100);
let DAT_00655b0a = 0;
let DAT_00654fa8 = 0;
let DAT_006ad6a0 = 0;
let DAT_006ad69c = 0;
let DAT_0068aee8 = new Int32Array(8);
let DAT_00646cb8 = new Uint8Array(0x4000);

// Diff engine state variables
let DAT_0067a400 = 0;
let DAT_0067a404 = 0;
let DAT_0067a408 = 0;
let DAT_0067a410 = new Uint8Array(0x17 * 0x18);
let DAT_0067a414 = new Int32Array(0x17 * 6);
let DAT_0067a41c = new Uint8Array(0x17 * 0x18);
let DAT_0067a420 = new Uint8Array(0x17 * 0x18);
let DAT_0067a424 = new Array(0x17 * 6);
let DAT_0067a428 = 0;
let DAT_0067a434 = 0;
let DAT_0067a438 = 0;
let DAT_0067a43c = null;
let DAT_0067a440 = 0;
let DAT_0067a44c = 0;
let DAT_0067a454 = null;
let DAT_0067a458 = 0;
let DAT_0067a464 = 0;
let DAT_0067a46c = null;
let DAT_0067a4b8 = 0;
let DAT_0067a4c4 = 0;
let DAT_0067a4cc = null;
let DAT_0067a4e8 = 0;
let DAT_0067a4f4 = 0;
let DAT_0067a4fc = null;
let DAT_0067a518 = 0;
let DAT_0067a524 = 0;
let DAT_0067a52c = null;
let DAT_0067a530 = 0;
let DAT_0067a53c = 0;
let DAT_0067a544 = null;
let DAT_0067a588 = 0;
let DAT_0067a638 = 0;
let DAT_0067a644 = 0;
let DAT_0067a64c = null;
let DAT_0067a798 = 0;
let DAT_0067a7a0 = 0;
let DAT_0067a7a8 = 0;
let DAT_0067a8bc = 0;
let DAT_0067a8c0 = 0;
let DAT_0067a994 = 0;
let DAT_0067a998 = 0;
let DAT_0067a99c = 0;
let DAT_0067a9a0 = 0;
let DAT_0067a9a4 = 0;
let DAT_0067a9b0 = 0;
let DAT_0067a9c4 = 0;
let DAT_0067a9c8 = 0;
let DAT_0067a9dc = null;
let DAT_0067a01c = 0;
let DAT_00679640 = "";
let DAT_00679fe8 = null;
let DAT_00679fec = 0;
let DAT_00679ff0 = 0;
let DAT_00679ff4 = 0;
let DAT_00679ff8 = 0;
let DAT_0067a000 = 0;
let DAT_0067a98c = new Int32Array(4);


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0157 — draw_best_city_sprite
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0157(param_1, param_2, param_3, param_4, param_5) {
  let iVar1;
  let local_30;
  let local_2c;
  let local_28;
  let local_20;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  local_14 = FUN_005c62ee();
  if (local_14 === 0) {
    local_14 = 0;
  } else {
    local_14 = local_14 + -0x48;
  }
  if (local_14 + 0x154 === 0) {  // *(int *)(local_14 + 0x154)
    local_2c = -4; // 0xfffffffc
  } else {
    local_2c = -2; // 0xfffffffe
  }
  local_c = 0;
  local_30 = -1;
  for (local_28 = 0; local_28 < DAT_00655b18; local_28 = local_28 + 1) {
    if ((DAT_0064f394[local_28 * 0x58] !== 0) &&
       (s8(DAT_0064f348[local_28 * 0x58]) === param_1)) {
      local_8 = s8(DAT_0064f349[local_28 * 0x58]);
      iVar1 = FUN_0043d20a(local_28, 1);
      if (iVar1 !== 0) {
        local_8 = local_8 + 200;
      }
      if (DAT_0064f379[local_28 * 0x58] === 0xFF) { // -1 as unsigned byte
        local_8 = local_8 + 100;
      }
      if (local_c < local_8) {
        local_c = local_8;
        local_30 = local_28;
      }
    }
  }
  if (-1 < local_30) {
    local_20 = param_3;
    if (local_14 + 0x154 === 0) {
      local_18 = 0x18;
    } else {
      local_18 = 0x24;
    }
    if ((param_2 & 1) !== 0) {
      local_20 = param_3 + local_18 + 2;
    }
    iVar1 = FUN_00472cf0(0x30, local_2c);
    FUN_0056d289(DAT_0067a7a8, local_30, 0, local_20, param_4 - ((iVar1 - param_5) / 2) | 0, local_2c);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0720 — lookup_tech_by_name
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0720(param_1) {
  let iVar1;
  let local_c;
  let local_8;

  if (param_1 === DAT_0062d0a4) {
    local_c = -2;
  } else if (param_1 === DAT_0062d0a8) {
    local_c = -1;
  } else {
    local_c = -3;
    for (local_8 = 0; (local_c < 0 && (local_8 < 100)); local_8 = local_8 + 1) {
      if (param_1 === DAT_00627680[local_8 * 0x10]) {
        local_c = local_8;
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b07d1 — lookup_terrain_by_name
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b07d1(param_1) {
  let iVar1;
  let local_c;
  let local_8;

  // __strcmpi = case-insensitive compare
  if (param_1.toLowerCase() === DAT_0062d0ac.toLowerCase()) {
    local_c = -1;
  } else if (param_1.toLowerCase() === DAT_0062d0b0.toLowerCase()) {
    local_c = -2;
  } else {
    local_c = -3;
    for (local_8 = 0; (local_c < 0 && (local_8 < 0xb)); local_8 = local_8 + 1) {
      // _strcmp = case-sensitive, references DAT_00627cc0 (terrain names)
      if (param_1 === DAT_00627cc0[local_8 * 0x18]) {
        local_c = local_8;
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// _E2 — CRT init stub
// ═══════════════════════════════════════════════════════════════════

export function _E2() {
  _E1();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// _E1 — CRT init no-op
// ═══════════════════════════════════════════════════════════════════

export function _E1() {
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0905 — diff_engine_alloc_mirror
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0905() {
  let sVar1;
  let uVar2;
  let local_8;

  if (DAT_0062d0bc !== null) {
    FUN_004b0a0a();
  }
  DAT_0067a400 = 0;
  for (local_8 = 0; local_8 < 0x17; local_8 = local_8 + 1) {
    DAT_0067a400 = DAT_0067a400 + DAT_0067a414[local_8 * 6];
  }
  DAT_0062d0bc = new Uint8Array(DAT_0067a400);
  if (DAT_0062d0bc === null) {
    uVar2 = 0;
  } else {
    DAT_0062d0bc.fill(0);
    sVar1 = DAT_0067a588;
    if (DAT_006ad2f7 !== 0) {
      sVar1 = DAT_0067a400;
    }
    DAT_0067a408 = sVar1;
    FUN_004b0a41();
    uVar2 = 1;
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0a0a — diff_engine_free_mirror
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0a0a() {
  DAT_0062d0bc = null;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0a41 — diff_engine_copy_sections
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0a41() {
  let local_c;
  let local_8;

  local_8 = DAT_0062d0bc;
  let local_8_offset = 0;
  for (local_c = 0; local_c < 0x17; local_c = local_c + 1) {
    // FID_conflict__memcpy(local_8, DAT_0067a424[local_c * 6], DAT_0067a410[local_c * 0x18])
    let src = DAT_0067a424[local_c * 6];
    let size = DAT_0067a410[local_c * 0x18];
    if (src && DAT_0062d0bc) {
      for (let i = 0; i < size; i++) {
        DAT_0062d0bc[local_8_offset + i] = src[i] || 0;
      }
    }
    local_8_offset = local_8_offset + DAT_0067a414[local_c * 6];
  }
  DAT_00679fe8 = DAT_0062d0bc;
  DAT_0067a404 = 0;
  DAT_00679fec = 0;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0ad0 — diff_engine_invert_mirror
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0ad0() {
  let uVar1;
  let local_c;

  FUN_004b0a41();
  DAT_00679fe8 = DAT_0062d0bc;
  uVar1 = DAT_0067a400 >>> 2;
  for (local_c = 0; local_c < uVar1; local_c = local_c + 1) {
    // Invert each dword: ~*DAT_00679fe8
    if (DAT_0062d0bc) {
      let off = local_c * 4;
      DAT_0062d0bc[off] = (~DAT_0062d0bc[off]) & 0xFF;
      DAT_0062d0bc[off + 1] = (~DAT_0062d0bc[off + 1]) & 0xFF;
      DAT_0062d0bc[off + 2] = (~DAT_0062d0bc[off + 2]) & 0xFF;
      DAT_0062d0bc[off + 3] = (~DAT_0062d0bc[off + 3]) & 0xFF;
    }
  }
  DAT_00679fe8 = DAT_0062d0bc;
  DAT_0067a404 = 0;
  DAT_00679fec = 0;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0b53 — diff_engine_scan_and_send
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0b53(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: multiplayer diff engine — scans mirror buffer, compresses changed regions,
  // and sends network packets. Heavy pointer arithmetic on flat memory buffers.
  // Core logic preserved but pointer-based buffer scanning cannot translate directly to JS.
  let local_4c;

  if (DAT_00655b02 < 3) {
    local_4c = 0;
  } else if ((param_4 === 0) && (DAT_006ad308 === 1)) {
    local_4c = 0;
  } else {
    local_4c = 0;
    let local_10 = 0;
    let local_c = 0;
    let local_24 = DAT_00679fe8;
    DAT_0062d0c4 = DAT_0062d0c4 + 1;
    if ((param_2 & 1) !== 0) {
      FUN_004b0ad0();
    }
    if ((param_2 & 4) === 0) {
      if ((param_2 & 8) !== 0) {
        local_10 = param_3;
      }
    } else {
      local_c = FUN_00421bb0();
      local_c = param_3 + local_c;
    }
    // The inner scanning loop operates on raw memory pointers comparing dwords.
    // It detects changed regions, optionally RLE-compresses them, and sends via network.
    // This is inherently a flat-memory operation that requires the actual binary layout.
    // Preserving the structure but the buffer operations are no-ops in JS context.
    if ((param_2 & 1) !== 0) {
      // DEVIATION: XD_FlushSendBuffer(5000) — Win32 network flush
    }
    DAT_00679fec = 0;
  }
  return local_4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b12b3 — diff_engine_check_section_changed
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b12b3(param_1) {
  let uVar1;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_0067a424[param_1 * 6] !== 0) && (DAT_0062d0bc !== null)) {
    local_14 = DAT_0067a424[param_1 * 6];
    // local_c = mirror buffer at offset DAT_0067a420[param_1 * 0x18]
    let mirrorOffset = DAT_0067a420[param_1 * 0x18];
    uVar1 = DAT_0067a414[param_1 * 6];
    if ((uVar1 & 3) !== 0) {
      FUN_005dae6b(7, 0, 0, 0x1a7);
    }
    for (local_10 = 0; local_10 < (uVar1 >>> 2); local_10 = local_10 + 1) {
      // Compare dword at local_14[local_10*4] vs DAT_0062d0bc[mirrorOffset + local_10*4]
      if (local_14 && DAT_0062d0bc) {
        let off = local_10 * 4;
        if (local_14[off] !== DAT_0062d0bc[mirrorOffset + off] ||
            local_14[off+1] !== DAT_0062d0bc[mirrorOffset + off+1] ||
            local_14[off+2] !== DAT_0062d0bc[mirrorOffset + off+2] ||
            local_14[off+3] !== DAT_0062d0bc[mirrorOffset + off+3]) {
          return 1;
        }
      }
    }
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1396 — diff_engine_checksum
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1396(param_1, param_2) {
  let uVar1;
  let local_8;

  if (param_2 === 0) {
    local_8 = 0;
  } else {
    local_8 = 0;
    uVar1 = param_2 >>> 31;
    if ((((param_2 ^ uVar1) - uVar1) & 3 ^ uVar1) === uVar1) {
      // Aligned to 4 bytes: add as 32-bit ints
      let local_c = 0;
      for (let local_14 = 0; local_14 < (param_2 >> 2); local_14 = local_14 + 1) {
        if (param_1) {
          let off = local_14 * 4;
          let val = (param_1[off] | (param_1[off+1] << 8) | (param_1[off+2] << 16) | (param_1[off+3] << 24));
          local_8 = (local_8 + val) | 0;
        }
      }
    } else if ((((param_2 ^ uVar1) - uVar1) & 1 ^ uVar1) === uVar1) {
      // Aligned to 2 bytes: add as 16-bit shorts
      for (let local_1c = 0; local_1c < (param_2 >> 2); local_1c = local_1c + 1) {
        if (param_1) {
          let off = local_1c * 2;
          local_8 = (local_8 + (param_1[off] | (param_1[off+1] << 8))) | 0;
        }
      }
    } else {
      // Byte-by-byte
      for (let local_24 = 0; local_24 < param_2; local_24 = local_24 + 1) {
        if (param_1) {
          local_8 = (local_8 + (param_1[local_24] & 0xFF)) | 0;
        }
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b14a4 — diff_engine_calc_total_size
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b14a4() {
  let local_c;
  let local_8;

  local_8 = 0;
  for (local_c = 0; local_c < 0x18; local_c = local_c + 1) {
    if (local_c === 5) {
      local_8 = DAT_00655b16 * 0x20 + local_8;
    } else if (local_c === 6) {
      local_8 = DAT_00655b18 * 0x58 + local_8;
    } else {
      local_8 = local_8 + DAT_0067a410[local_c * 0x18];
    }
  }
  return local_8 + 0x1e0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b153c — diff_engine_serialize_game
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b153c(param_1) {
  let uVar2;
  let local_14 = [0];
  let local_c;
  let local_8;

  local_14[0] = 0;
  local_c = DAT_0067a428 + DAT_0067a4b8 + DAT_0067a458 + DAT_0067a440 + DAT_0067a4e8 + DAT_0067a518
            + DAT_0067a638 + 0x8c;
  if (local_c < 0) {
    FUN_005dae6b(7, 0, 0, 0x226);
  }
  let pvVar1 = new Uint8Array(local_c);
  param_1[0] = pvVar1;
  local_8 = param_1[0];
  if (local_8 === null) {
    // debug_log: Failed to allocated buffer for game state
    uVar2 = 0;
  } else {
    DAT_0067a434 = FUN_004b1396(DAT_0067a43c, DAT_0067a428);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a428, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a43c, DAT_0067a428);
    DAT_0067a4c4 = FUN_004b1396(DAT_0067a4cc, DAT_0067a4b8);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a4b8, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a4cc, DAT_0067a4b8);
    DAT_0067a464 = FUN_004b1396(DAT_0067a46c, DAT_0067a458);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a458, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a46c, DAT_0067a458);
    DAT_0067a44c = FUN_004b1396(DAT_0067a454, DAT_0067a440);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a440, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a454, DAT_0067a440);
    DAT_0067a4f4 = FUN_004b1396(DAT_0067a4fc, DAT_0067a4e8);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a4e8, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a4fc, DAT_0067a4e8);
    DAT_0067a524 = FUN_004b1396(DAT_0067a52c, DAT_0067a518);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a518, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a52c, DAT_0067a518);
    DAT_0067a644 = FUN_004b1396(DAT_0067a64c, DAT_0067a638);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a638, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a64c, DAT_0067a638);
    uVar2 = FUN_005dfd8f(param_1, local_14[0]);
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b187f — diff_engine_append_data
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b187f(param_1, param_2, param_3, param_4, param_5) {
  if (param_3 < (param_2[0] + param_5)) {
    FUN_005dae6b(7, 0, 0, 0x20d);
  }
  // memcpy(param_1 + *param_2, param_4, param_5)
  if (param_1 && param_4) {
    for (let i = 0; i < param_5; i++) {
      param_1[param_2[0] + i] = param_4[i] || 0;
    }
  }
  param_2[0] = param_2[0] + param_5;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b18e1 — diff_engine_serialize_partial
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b18e1(param_1) {
  let uVar2;
  let local_14 = [0];
  let local_c;
  let local_8;

  local_14[0] = 0;
  local_c = DAT_0067a428 + 0x28 + DAT_0067a530;
  let pvVar1 = new Uint8Array(local_c);
  param_1[0] = pvVar1;
  local_8 = param_1[0];
  if (local_8 === null) {
    // debug_log: Failed to allocated buffer for game state
    uVar2 = 0;
  } else {
    DAT_0067a434 = FUN_004b1396(DAT_0067a43c, DAT_0067a428);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a428, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a43c, DAT_0067a428);
    DAT_0067a53c = FUN_004b1396(DAT_0067a544, DAT_0067a530);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a530, 0x14);
    FUN_004b187f(local_8, local_14, local_c, DAT_0067a544, DAT_0067a530);
    uVar2 = FUN_005dfd8f(param_1, local_14[0]);
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1a15 — diff_engine_serialize_full_compressed
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1a15(param_1) {
  let uVar1;
  let uVar3;
  let iVar4;
  let local_2c;

  uVar1 = FUN_004b14a4();
  if (uVar1 < 0) {
    FUN_005dae6b(7, 0, 0, 0x27f);
  }
  let pvVar2 = new Uint8Array(uVar1);
  param_1[0] = pvVar2;
  let local_8 = param_1[0];
  if (local_8 === null) {
    // debug_log: Failed to allocated buffer for game state
    local_2c = 0;
  } else {
    let local_c = 0;
    for (let local_28 = 0; local_28 < 0x18; local_28 = local_28 + 1) {
      let local_24 = new Int32Array(5);
      // memcpy(local_24, &DAT_0067a410 + local_28 * 0x18, 0x14)
      for (let i = 0; i < 5; i++) {
        local_24[i] = DAT_0067a410[local_28 * 0x18 + i * 4] || 0;
      }
      if (local_28 === 5) {
        local_24[0] = DAT_00655b16 << 5;
      } else if (local_28 === 6) {
        local_24[0] = DAT_00655b18 * 0x58;
      }
      uVar3 = FUN_004b1396(DAT_0067a424[local_28 * 6], local_24[0]);
      DAT_0067a41c[local_28 * 0x18] = uVar3;
      FUN_004b187f(local_8, { 0: local_c, get [0]() { return local_c; }, set [0](v) { local_c = v; } }, uVar1, local_24, 0x14);
      FUN_004b187f(local_8, { 0: local_c, get [0]() { return local_c; }, set [0](v) { local_c = v; } }, uVar1, DAT_0067a424[local_28 * 6], local_24[0]);
    }
    // RLE compression attempt
    // local_3c = new buffer, compress into it, then shrink
    iVar4 = FUN_004b263e({ 0: local_8, 1: local_c, 2: param_1[0], 3: uVar1, 4: 0 });
    if (iVar4 === 0) {
      local_2c = -1;
    } else {
      local_2c = local_c;
    }
  }
  return local_2c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1c11 — diff_engine_serialize_changed_only
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1c11(param_1) {
  let uVar1;
  let uVar3;
  let local_2c;
  let local_14;

  uVar1 = FUN_004b14a4();
  if (uVar1 < 0) {
    FUN_005dae6b(7, 0, 0, 0x2c6);
  }
  let pvVar2 = new Uint8Array(uVar1);
  param_1[0] = pvVar2;
  let local_8 = param_1[0];
  if (local_8 === null) {
    // debug_log: Failed to allocate buffer
    uVar3 = 0;
  } else {
    let local_10 = [0];
    for (local_2c = 0; local_2c < 0x18; local_2c = local_2c + 1) {
      let local_28 = new Int32Array(5);
      for (let i = 0; i < 5; i++) {
        local_28[i] = DAT_0067a410[local_2c * 0x18 + i * 4] || 0;
      }
      if (local_2c === 5) {
        local_28[0] = DAT_00655b16 << 5;
      } else if (local_2c === 6) {
        local_28[0] = DAT_00655b18 * 0x58;
      }
      local_14 = FUN_004b1396(DAT_0067a424[local_2c * 6], local_28[0]);
      if ((DAT_0067a41c[local_2c * 0x18] !== local_14) && (local_28[0] !== 0)) {
        DAT_0067a41c[local_2c * 0x18] = local_14;
        FUN_004b187f(local_8, local_10, uVar1, local_28, 0x14);
        FUN_004b187f(local_8, local_10, uVar1, DAT_0067a424[local_2c * 6], local_28[0]);
      }
    }
    // _expand to local_10[0]
    if (param_1[0] === null) {
      // debug_log: Failed to re-allocate
      uVar3 = 0;
    } else {
      uVar3 = FUN_005dfd8f(param_1, local_10[0]);
    }
  }
  return uVar3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1de3 — diff_engine_deserialize
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1de3(param_1, param_2) {
  let local_1c;
  let local_18;

  if ((param_1 === null) || (param_1[0] === 0)) {
    FUN_005dae6b(7, 0, 0, 0x2fc);
  }
  local_1c = DAT_00655aea;
  local_18 = DAT_00655af2;
  if (DAT_0067a424[0] === 0) {
    FUN_004b21d7();
  }
  let local_8;
  let local_c;
  if (DAT_006c8ffc === 0) {
    if (param_2 !== 0) {
      local_c = FUN_005dfb61(param_1);
    }
    local_8 = param_1[0];
    local_c = local_c || 0;
  } else {
    let local_30 = param_1[0];
    let sVar3 = 0; // __msize
    let local_2c = local_30 + sVar3;
    local_c = FUN_004b24a2({ 0: local_30, 1: local_2c });
    let local_28 = new Uint8Array(local_c);
    if (local_28 === null) {
      // debug_log: Failed to allocate buffer
      return;
    }
    let local_24 = local_c;
    let iVar4 = FUN_004b251a({ 0: local_30, 1: local_2c, 2: local_28, 3: local_24, 4: 0 });
    if (iVar4 === 0) {
      // debug_log: Failed to RLLBufferDecode
      return;
    }
    param_1[0] = local_28;
    local_8 = param_1[0];
  }
  let local_10 = 0;
  while (local_10 < local_c) {
    let local_14 = local_8;
    let psVar2 = local_8 + 20; // + 5 * sizeof(int)
    local_10 = local_8[0] + local_10 + 0x14;
    if ((local_8[8] < 0) || (local_8[8] > 0x17)) {
      FUN_005dae6b(7, 0, 0, 0x338);
    }
    // memcpy to DAT_0067a424[local_14[2] * 6] from local_8 at psVar2, size local_14[0]
    let uVar5 = FUN_004b1396(local_8, local_14[0] || 0);
    DAT_0067a41c[(local_14[8] || 0) * 0x18] = uVar5;
    local_8 = local_8 + (local_14[0] || 0);
  }
  DAT_00655af2 = local_18;
  DAT_00655aea = local_1c;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// parse_save_block — parse_save_block
// ═══════════════════════════════════════════════════════════════════

export function parse_save_block(param_1, param_2) {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_8;

  if ((param_1 === null) || (param_1[0] === 0)) {
    FUN_005dae6b(7, 0, 0, 0x34b);
  }
  uVar2 = DAT_00655af2;
  uVar1 = DAT_00655aea;
  if (param_2 !== 0) {
    FUN_005dfb61(param_1);
  }
  local_8 = param_1[0];
  FUN_005b8416();
  iVar3 = FUN_004b2123({ 0: local_8 });
  if (iVar3 !== 1) {
    FUN_005dae6b(7, 0, 0, 0x35a);
  }
  iVar3 = FUN_004b2123({ 0: local_8 });
  if (iVar3 !== 0xc) {
    FUN_005dae6b(7, 0, 0, 0x35d);
  }
  DAT_00655aea = uVar1;
  DAT_00655af2 = uVar2;
  FUN_005b7fe0();
  FUN_004b21d7();
  FUN_004b0905();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b2123 — diff_engine_read_section_node
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b2123(param_1) {
  let psVar1;
  let uVar2;

  psVar1 = param_1[0];
  param_1[0] = param_1[0] + 0x14;
  // psVar1[2] is the section type index
  let sectionType = psVar1[8] || 0; // offset 8 = psVar1[2] in int*
  if ((sectionType < 0) || (sectionType > 0x17)) {
    FUN_005dae6b(7, 0, 0, 0x36d);
  }
  // memcpy(DAT_0067a424[sectionType * 6], param_1[0], psVar1[0])
  let size = psVar1[0] || 0;
  let src = param_1[0];
  if (DAT_0067a424[sectionType * 6] && src) {
    for (let i = 0; i < size; i++) {
      DAT_0067a424[sectionType * 6][i] = src[i] || 0;
    }
  }
  uVar2 = FUN_004b1396(param_1[0], size);
  DAT_0067a41c[sectionType * 0x18] = uVar2;
  param_1[0] = param_1[0] + size;
  return sectionType;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b21d7 — diff_engine_init_sections
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b21d7() {
  let local_c;
  let local_8;

  FUN_00497ff3(DAT_0064b984);
  FUN_004b3080(DAT_0062d0b8, 4, 0);
  FUN_004b3080(DAT_00655ae8, 0x14c, 1);
  FUN_004b3080(DAT_0064bcf8, 0x790, 2);
  FUN_004b3080(DAT_0064c6a0, 0x2ca0, 3);
  FUN_004b3080(DAT_00666130, 0x400, 4);
  FUN_004b3080(DAT_006560f0, 0x10000, 5);
  FUN_004b3080(DAT_0064f340, 0x5800, 6);
  FUN_004b3080(DAT_006554f8, 0x3f0, 7);
  FUN_004b3080(DAT_00655c38, 0x4b0, 8);
  FUN_004b3080(DAT_0064bc60, 100, 9);
  FUN_004b3080(DAT_00655128, 0x154, 10);
  FUN_004b3080(DAT_00654b40, 0x494, 0xb);
  FUN_004b3080(DAT_006d1160, 0x10, 0xc);
  FUN_004b3080(DAT_006365e0, DAT_006d116a * DAT_006d116c, 0xd);
  FUN_004b3080(DAT_006365e4, DAT_006d116a * DAT_006d116c, 0xe);
  FUN_004b3080(DAT_006365c4, DAT_006d1164, 0xf);
  FUN_004b3080(DAT_006365c8, DAT_006d1164, 0x10);
  FUN_004b3080(DAT_006365cc, DAT_006d1164, 0x11);
  FUN_004b3080(DAT_006365d0, DAT_006d1164, 0x12);
  FUN_004b3080(DAT_006365d4, DAT_006d1164, 0x13);
  FUN_004b3080(DAT_006365d8, DAT_006d1164, 0x14);
  FUN_004b3080(DAT_006365dc, DAT_006d1164, 0x15);
  FUN_004b3080(DAT_00636598, DAT_006d1164 * 6, 0x16);
  FUN_004b3080(DAT_0064b98c, 50000, 0x17);
  local_c = 0;
  for (local_8 = 0; local_8 < 0x17; local_8 = local_8 + 1) {
    DAT_0067a420[local_8 * 0x18] = local_c;
    local_c = local_c + DAT_0067a414[local_8 * 6];
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b24a2 — rle_calc_decoded_size
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b24a2(param_1) {
  let local_10;
  let local_c;
  let local_8;

  local_8 = param_1[0]; // start pointer
  local_c = 0;
  let end = param_1[1]; // end pointer
  while (local_8 < end) {
    local_10 = local_8[0] | (local_8[1] << 8); // ushort
    if (local_10 < 0x8000) {
      local_8 = local_8 + 3;
    } else {
      local_8 = local_8 + (local_10 & 0x7fff) + 2;
    }
    local_c = local_c + (local_10 & 0x7fff);
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b251a — rle_decode
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b251a(param_1) {
  let uVar1;
  let uVar2;
  let uVar3;

  uVar2 = FUN_004b24a2(param_1);
  if ((param_1[3] - param_1[2]) < uVar2) {
    uVar3 = 0;
  } else {
    let local_10 = param_1[0]; // encoded data pointer
    let local_c = param_1[2]; // output pointer
    let local_c_offset = 0;
    while (local_10 < param_1[1]) {
      uVar1 = local_10[0] | (local_10[1] << 8); // ushort
      let _Src = local_10 + 2; // past the length word
      if (uVar1 < 0x7fff) {
        // RLE run: fill uVar1 bytes with single byte value
        local_10 = local_10 + 3;
        let fillByte = _Src[0] || 0;
        if (local_c) {
          for (let i = 0; i < uVar1; i++) {
            local_c[local_c_offset + i] = fillByte;
          }
        }
      } else {
        // Literal run: copy (uVar1 + 0x8000) bytes
        uVar1 = (uVar1 + 0x8000) & 0xFFFF;
        if (local_c && _Src) {
          for (let i = 0; i < uVar1; i++) {
            local_c[local_c_offset + i] = _Src[i] || 0;
          }
        }
        local_10 = _Src + uVar1;
      }
      local_c_offset = local_c_offset + uVar1;
    }
    param_1[4] = local_c_offset;
    uVar3 = 1;
  }
  return uVar3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b263e — rle_encode
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b263e(param_1) {
  let local_1c_offset = 0; // output position
  let local_20 = param_1[0]; // source start
  let local_24 = local_20 + 1;
  let uVar2 = param_1[1] - param_1[0]; // source size
  let local_c = 0; // output bytes written
  let uVar3 = param_1[3] - param_1[2]; // output buffer size
  let outBuf = param_1[2]; // output buffer

  while (true) {
    if (local_20 >= param_1[1]) {
      param_1[4] = local_c;
      return 1;
    }
    // Scan for run of same byte
    while ((local_24 < param_1[1]) && (local_24[0] === local_20[0])) {
      local_24 = local_24 + 1;
    }
    let local_14 = local_24 - local_20;
    if (3 < local_14) {
      // Encode RLE run
      while (local_14 !== 0) {
        if ((uVar3 < local_c + 2) || (uVar2 <= local_c + 2)) {
          return 0;
        }
        let runLen;
        if (local_14 < 0x8000) {
          runLen = local_14;
          local_14 = 0;
        } else {
          runLen = 0x7fff;
          local_14 = local_14 - 0x7fff;
        }
        // Write run length (ushort) + fill byte
        if (outBuf) {
          outBuf[local_1c_offset] = runLen & 0xFF;
          outBuf[local_1c_offset + 1] = (runLen >> 8) & 0xFF;
        }
        local_c = local_c + 3;
        if ((uVar3 < local_c) || (uVar2 <= local_c)) {
          return 0;
        }
        if (outBuf) {
          outBuf[local_1c_offset + 2] = local_20[0] || 0;
        }
        local_1c_offset = local_1c_offset + 3;
      }
      local_20 = local_24;
    }
    // Scan for non-repeating bytes
    while ((local_24 < param_1[1]) && (local_24[1] !== local_24[0])) {
      local_24 = local_24 + 1;
    }
    local_14 = local_24 - local_20;
    while (local_14 !== 0) {
      local_c = local_c + 2;
      if ((uVar3 < local_c) || (uVar2 <= local_c)) {
        return 0;
      }
      let litLen;
      if (local_14 < 0x8000) {
        litLen = local_14;
        local_14 = 0;
      } else {
        litLen = 0x7fff;
        local_14 = local_14 - 0x7fff;
      }
      // Write literal marker (ushort with high bit set) + literal data
      let marker = (litLen - 0x8000) & 0xFFFF; // short + -0x8000
      if (outBuf) {
        outBuf[local_1c_offset] = marker & 0xFF;
        outBuf[local_1c_offset + 1] = (marker >> 8) & 0xFF;
      }
      local_1c_offset = local_1c_offset + 2;
      local_c = local_c + litLen;
      if ((uVar3 < local_c) || (uVar2 <= local_c)) {
        return 0;
      }
      // memcpy literal data
      if (outBuf && local_20) {
        for (let i = 0; i < litLen; i++) {
          outBuf[local_1c_offset + i] = local_20[i] || 0;
        }
      }
      local_1c_offset = local_1c_offset + litLen;
      local_20 = local_20 + litLen;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b3080 — diff_engine_register_section
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b3080(param_1, param_2, param_3) {
  // in_ECX is the section descriptor array (DAT_0067a410 + param_3 * 0x18)
  // in_ECX[5] = param_1 (data pointer) → DAT_0067a424[param_3 * 6] = param_1
  // in_ECX[0] = param_2 (size) → DAT_0067a410[param_3 * 0x18] = param_2
  // in_ECX[2] = param_3 (index)
  // in_ECX[3] = 0
  // in_ECX[1] = size rounded up to 4-byte alignment → DAT_0067a414[param_3 * 6]
  DAT_0067a424[param_3 * 6] = param_1;
  DAT_0067a410[param_3 * 0x18] = param_2;
  let alignedSize = param_2;
  if ((param_2 & 3) !== 0) {
    alignedSize = (4 - (param_2 & 3)) + alignedSize;
  }
  DAT_0067a414[param_3 * 6] = alignedSize;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b3110 — continent_set_adjacency_bit
// ═══════════════════════════════════════════════════════════════════

// Source: C FUN_004b3110 — set continent tech flag
export function FUN_004b3110(param_1, param_2) {
  let local_c_ref = [0];
  let local_8 = new Uint8Array(4);

  FUN_005ae3bf(param_2, local_c_ref, local_8);
  let local_c = local_c_ref[0];
  DAT_00666137[param_1 * 0x10 + local_c] = DAT_00666137[param_1 * 0x10 + local_c] | local_8[0];
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b315c — continent_calc_adjacency
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b315c() {
  let iVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  for (local_18 = 0; local_18 < 0x40; local_18 = local_18 + 1) {
    for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
      DAT_00666137[local_8 + local_18 * 0x10] = 0;
    }
  }
  for (local_14 = 0; local_14 < DAT_006d1162; local_14 = local_14 + 1) {
    for (local_10 = ((local_14 & 1) !== 0) ? 1 : 0; local_10 < DAT_006d1160; local_10 = local_10 + 2) {
      iVar1 = FUN_005b89e4(local_10, local_14);
      if (iVar1 === 0) {
        uVar2 = FUN_005b8a81(local_10, local_14);
        for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
          uVar3 = FUN_005ae052(s8(DAT_00628350[local_8]) + local_10);
          iVar1 = s8(DAT_00628360[local_8]) + local_14;
          iVar4 = FUN_004087c0(uVar3, iVar1);
          if ((iVar4 !== 0) && (iVar4 = FUN_005b89e4(uVar3, iVar1), iVar4 !== 0)) {
            uVar3 = FUN_005b8a81(uVar3, iVar1);
            FUN_004b3110(uVar2, uVar3);
            local_8 = local_8 + (2 - (local_8 & 1));
          }
        }
      }
    }
    FUN_0040894c();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b32fe — continent_assign_body_ids
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b32fe() {
  let local_44 = 0;
  let local_4c = 0;
  let local_50;
  let local_54;
  let local_40;
  let local_34;
  let local_14;
  let local_18;
  let local_10;
  let local_8;
  let local_30;
  let local_20;
  let local_1c;
  let local_68;
  let local_28;
  let iVar5;
  let uVar6, uVar7, cVar2;
  let bVar3;

  for (local_50 = 0; local_50 < 0x40; local_50 = local_50 + 1) {
    w16(DAT_00666130, local_50 * 0x10, 0);
    w16(DAT_00666134, local_50 * 0x10, 0);
  }
  let uVar4 = FUN_004bb870(0x20000);
  let _Dst = FUN_0046aad0(uVar4);
  if (_Dst === null) {
    FUN_00589ef8(-9, 8, 0, 1, 0);
  } else {
    local_4c = FUN_004bb870(DAT_006d1164 << 2);
    let _Dst_00 = FUN_0046aad0(local_4c);
    if (_Dst_00 === null) {
      FUN_00589ef8(-9, 8, 0, 2, 0);
    } else {
      // Allocate working buffers as typed arrays
      let tileCountBuf = new Int32Array(0x8000); // _Dst = 0x20000 bytes = 0x8000 ints
      let tileLabelBuf = new Uint16Array(DAT_006d1164); // _Dst_00

      FUN_00408830(DAT_00636598 + 3, 0);
      for (local_18 = 1; -1 < local_18; local_18 = local_18 + -1) {
        tileCountBuf.fill(0);
        tileLabelBuf.fill(0);
        local_14 = 0;
        local_54 = 0;
        bVar3 = false;
        for (local_40 = 0; local_40 < DAT_006d1162; local_40 = local_40 + 1) {
          if ((DAT_00655ae8 & 0x8000) !== 0) {
            bVar3 = false;
            local_54 = 0;
          }
          for (local_34 = ((local_40 & 1) !== 0) ? 1 : 0; local_34 < DAT_006d1160; local_34 = local_34 + 2) {
            iVar5 = FUN_005b89e4(local_34, local_40);
            if (iVar5 === local_18) {
              if (local_40 !== 0) {
                for (local_10 = 0; local_10 < 3; local_10 = local_10 + 1) {
                  uVar6 = (local_10 - 2) & 7;
                  uVar7 = FUN_005ae052(s8(DAT_00628350[uVar6]) + local_34);
                  cVar2 = s8(DAT_00628360[uVar6]);
                  iVar5 = FUN_004087c0(uVar7, cVar2 + local_40);
                  if ((iVar5 !== 0)) {
                    let tileIdx = ((DAT_006d1160 & 0xFFFFFFFE) * (cVar2 + local_40) + (uVar7 & 0xFFFFFFFE)) >> 1;
                    uVar6 = tileLabelBuf[tileIdx] || 0;
                    if (uVar6 !== 0) {
                      local_8 = uVar6;
                      if ((local_54 !== 0) && (uVar6 !== local_54)) {
                        if (local_54 <= uVar6) {
                          local_8 = local_54;
                        }
                        if (uVar6 <= local_54) {
                          uVar6 = local_54;
                        }
                        tileCountBuf[local_8] = tileCountBuf[local_8] + tileCountBuf[uVar6];
                        tileCountBuf[uVar6] = 0;
                        // Relabel all tiles with uVar6 to local_8
                        for (local_1c = 0; local_1c <= local_40; local_1c = local_1c + 1) {
                          for (local_68 = ((local_1c & 1) !== 0) ? 1 : 0; local_68 < DAT_006d1160; local_68 = local_68 + 2) {
                            let idx = ((DAT_006d1160 & 0xFFFFFFFE) * local_1c + (local_68 & 0xFFFFFFFE)) >> 1;
                            if (tileLabelBuf[idx] === (uVar6 & 0xFFFF)) {
                              tileLabelBuf[idx] = local_8 & 0xFFFF;
                            }
                          }
                        }
                      }
                      local_54 = local_8;
                    }
                  }
                }
              }
              if (local_54 === 0) {
                if (!bVar3) {
                  local_14 = 0;
                  do {
                    local_14 = local_14 + 1;
                    if (0x7ffe < local_14) break;
                  } while (tileCountBuf[local_14] !== 0);
                }
                local_54 = local_14;
              }
              let tileIdx2 = ((DAT_006d1160 & 0xFFFFFFFE) * local_40 + (local_34 & 0xFFFFFFFE)) >> 1;
              tileLabelBuf[tileIdx2] = local_54 & 0xFFFF;
              tileCountBuf[local_54] = tileCountBuf[local_54] + 1;
              bVar3 = true;
            } else {
              bVar3 = false;
              local_54 = 0;
            }
          }
          FUN_0040894c();
        }
        if (local_18 !== 0) {
          // Merge small bodies (< 9 tiles) into body 0x3f
          local_30 = 0;
          for (local_50 = 0; local_50 < 0x3f; local_50 = local_50 + 1) {
            if (tileCountBuf[local_50] < 9) {
              tileCountBuf[0x3f] = tileCountBuf[0x3f] + tileCountBuf[local_50];
              tileCountBuf[local_50] = -1;
              local_30 = local_30 + 1;
            }
          }
          if (local_30 !== 0) {
            for (local_10 = 0; local_10 < DAT_006d1164; local_10 = local_10 + 1) {
              if (tileCountBuf[tileLabelBuf[local_10]] < 0) {
                tileLabelBuf[local_10] = 0x3f;
              }
            }
            for (local_50 = 0; local_50 < 0x3f; local_50 = local_50 + 1) {
              if (tileCountBuf[local_50] < 0) {
                tileCountBuf[local_50] = 0;
              }
            }
          }
        }
        // Assign body IDs to continent map
        let local_38_offset = 3; // DAT_00636598 + 3
        for (local_10 = 0; local_10 < DAT_006d1164; local_10 = local_10 + 1) {
          if (tileLabelBuf[local_10] !== 0) {
            let label = tileLabelBuf[local_10];
            if (label > 0x3f) {
              if (tileCountBuf[label] < 1) {
                // Negate and use
                label = (-tileCountBuf[label] + 1) & 0xFFFF;
                tileLabelBuf[local_10] = label;
              } else {
                local_14 = 0;
                do {
                  local_14 = local_14 + 1;
                } while (tileCountBuf[local_14] !== 0);
                if ((local_14 < 0x40) &&
                   ((local_18 === 0) || (16 < tileCountBuf[label]))) {
                  tileCountBuf[local_14] = tileCountBuf[label];
                  tileCountBuf[label] = -local_14;
                  tileLabelBuf[local_10] = local_14 & 0xFFFF;
                } else {
                  local_44 = local_44 | (1 << (local_18 & 0x1f));
                  tileLabelBuf[local_10] = 0x3f;
                }
              }
            }
            // Write to continent/body data
            // DAT_00636598[local_10 * 6 + 3] = label
          }
          FUN_0040894c();
        }
        for (local_20 = 0; local_20 < 0x40; local_20 = local_20 + 1) {
          if (local_18 === 0) {
            w16(DAT_00666130, local_20 * 0x10, tileCountBuf[local_20] & 0xFFFF);
          } else {
            w16(DAT_00666134, local_20 * 0x10, tileCountBuf[local_20] & 0xFFFF);
          }
        }
      }
      FUN_004b315c();
    }
  }
  FUN_0046ab00(local_4c);
  FUN_0046aaa0(local_4c);
  FUN_0046ab00(uVar4);
  FUN_0046aaa0(uVar4);
  return local_44;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b3ca0 — static_init_wrapper_3ca0
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b3ca0() { FUN_004b3cba(); FUN_004b3cda(); }

// ═══════════════════════════════════════════════════════════════════
// FUN_004b3cba — static_init_3cba
export function FUN_004b3cba() { FUN_0043c4c0(0, 0x10, 1); }
// FUN_004b3cda — static_atexit_3cda
export function FUN_004b3cda() { /* _atexit stub */ }
// FUN_004b3cf7 — static_dtor_3cf7
export function FUN_004b3cf7() { FUN_0043c520(); }

// FID_conflict___E51 @ 0x004B3D11 — static_init_pair_3d11
export function FID_conflict___E51_3d11() { FUN_004b3d2b(); FUN_004b3d49(); }
// FUN_004b3d2b — static_init_3d2b
export function FUN_004b3d2b() { FUN_0043c460(0, 0x14); }
// FUN_004b3d49 — static_atexit_3d49
export function FUN_004b3d49() { /* _atexit stub */ }
// FUN_004b3d66 — static_dtor_3d66
export function FUN_004b3d66() { FUN_0043c520(); }

// FID_conflict___E51 @ 0x004B3D80 — static_init_pair_3d80
export function FID_conflict___E51_3d80() { FUN_004b3d9a(); FUN_004b3db8(); }
// FUN_004b3d9a — static_init_3d9a
export function FUN_004b3d9a() { FUN_0043c460(0, 0xe); }
// FUN_004b3db8 — static_atexit_3db8
export function FUN_004b3db8() { /* _atexit stub */ }
// FUN_004b3dd5 — static_dtor_3dd5
export function FUN_004b3dd5() { FUN_0043c520(); }

// FID_conflict___E51 @ 0x004B3DEF — static_init_pair_3def
export function FID_conflict___E51_3def() { FUN_004b3e09(); FUN_004b3e27(); }
// FUN_004b3e09 — static_init_3e09
export function FUN_004b3e09() { FUN_0043c460(0, 0x10); }
// FUN_004b3e27 — static_atexit_3e27
export function FUN_004b3e27() { /* _atexit stub */ }
// FUN_004b3e44 — static_dtor_3e44
export function FUN_004b3e44() { FUN_0043c520(); }

// FUN_004b3e5e — static_init_pair_3e5e
export function FUN_004b3e5e() { FUN_004b3e78(); FUN_004b3e98(); }
// FUN_004b3e78 — static_init_3e78
export function FUN_004b3e78() { FUN_0043c4c0(0, 0x18, 1); }
// FUN_004b3e98 — static_atexit_3e98
export function FUN_004b3e98() { /* _atexit stub */ }
// FUN_004b3eb5 — static_dtor_3eb5
export function FUN_004b3eb5() { FUN_0043c520(); }

// FID_conflict___E51 @ 0x004B3ECF — static_init_pair_3ecf
export function FID_conflict___E51_3ecf() { FUN_004b3ee9(); FUN_004b3f07(); }
// FUN_004b3ee9 — static_init_3ee9
export function FUN_004b3ee9() { FUN_0043c460(0, 0x1e); }
// FUN_004b3f07 — static_atexit_3f07
export function FUN_004b3f07() { /* _atexit stub */ }
// FUN_004b3f24 — static_dtor_3f24
export function FUN_004b3f24() { FUN_0043c520(); }

// FID_conflict___E51 @ 0x004B3F3E — static_init_pair_3f3e
export function FID_conflict___E51_3f3e() { FUN_004b3f58(); FUN_004b3f76(); }
// FUN_004b3f58 — static_init_3f58
export function FUN_004b3f58() { FUN_0043c460(0, 0x15); }
// FUN_004b3f76 — static_atexit_3f76
export function FUN_004b3f76() { /* _atexit stub */ }
// FUN_004b3f93 — static_dtor_3f93
export function FUN_004b3f93() { FUN_0043c520(); }

// FID_conflict___E51 @ 0x004B3FAD — static_init_pair_3fad
export function FID_conflict___E51_3fad() { FUN_004b3fc7(); FUN_004b3fe5(); }
// FUN_004b3fc7 — static_init_3fc7
export function FUN_004b3fc7() { FUN_0043c460(0, 0x18); }
// FUN_004b3fe5 — static_atexit_3fe5
export function FUN_004b3fe5() { /* _atexit stub */ }
// FUN_004b4002 — static_dtor_4002
export function FUN_004b4002() { FUN_0043c520(); }

// FUN_004b401c — static_init_parley1
export function FUN_004b401c() { FUN_004b4036(); FUN_004b405b(); }
// FUN_004b4036 — parley1_construct
export function FUN_004b4036() { FUN_004b4108(DAT_0067a7a8); }  // DEVIATION: Win32 UI — parley window 1 init
// FUN_004b405b — parley1_atexit
export function FUN_004b405b() { /* _atexit stub */ }
// FUN_004b4078 — parley1_dtor
export function FUN_004b4078() { FUN_004b4593(); }

// FUN_004b4092 — static_init_parley2
export function FUN_004b4092() { FUN_004b40ac(); FUN_004b40d1(); }
// FUN_004b40ac — parley2_construct
export function FUN_004b40ac() { FUN_004b4108(0); }  // DEVIATION: Win32 UI — parley window 2 init
// FUN_004b40d1 — parley2_atexit
export function FUN_004b40d1() { /* _atexit stub */ }
// FUN_004b40ee — parley2_dtor
export function FUN_004b40ee() { FUN_004b4593(); }


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4108 — parleywin_construct
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4108(param_1) {
  // DEVIATION: Win32 parley (diplomacy) window constructor
  // Uses in_ECX (this pointer) to initialize ~200 fields of a C++ object.
  // All fields are set to 0 or -1 defaults for the diplomacy dialog state.
  let in_ECX = new Int32Array(0x100);
  FUN_0044cba0(); // base window constructor
  in_ECX[0x54] = param_1;
  in_ECX[0x45] = 1;
  FUN_004a733d(); // init property tabs
  let iVar1 = FUN_00407f90(in_ECX[0x54]);
  if (iVar1 < 1) {
    in_ECX[0x47] = 0;
    in_ECX[0x48] = 0;
  } else {
    in_ECX[0x55] = (iVar1 < 0x321) ? 0 : 1;
  }
  in_ECX[0xa4] = 0; in_ECX[0xa8] = 0; in_ECX[0xa9] = 0;
  in_ECX[0xd0] = 0; in_ECX[0xd1] = 0; in_ECX[0xd2] = 0;
  in_ECX[0xd5] = 0; in_ECX[0xd3] = 0; in_ECX[0xd4] = 0;
  in_ECX[0xd6] = 0; in_ECX[0xd7] = 0; in_ECX[0xd8] = 0;
  for (let local_18 = 0; local_18 < 8; local_18 = local_18 + 1) {
    in_ECX[local_18 + 0xaa] = 0;
    in_ECX[local_18 + 0xb2] = 0;
    in_ECX[local_18 + 0xc0] = 0;
    in_ECX[local_18 + 200] = 0;
  }
  in_ECX[0xbd] = 0; in_ECX[0xbe] = 0; in_ECX[0xbf] = 0; in_ECX[0xbc] = 0;
  in_ECX[0xba] = 0; in_ECX[0xbb] = 0; in_ECX[0xa5] = 0;
  in_ECX[0x46] = -1; in_ECX[0x8d] = 0;
  in_ECX[0x83] = 0; in_ECX[0x84] = 1; in_ECX[0x85] = 0; in_ECX[0x82] = -1;
  in_ECX[0x88] = 0; in_ECX[0x8a] = 0; in_ECX[0x89] = 0;
  in_ECX[0x8c] = 0; in_ECX[0x8b] = 0; in_ECX[0x87] = 0; in_ECX[0x86] = 0;
  in_ECX[0x7a] = 0; in_ECX[0x79] = 0; in_ECX[0x95] = 0;
  in_ECX[0x9c] = 0; in_ECX[0xa3] = 0; in_ECX[0xa6] = 0; in_ECX[0xa7] = 0;
  DAT_0062d86c = 0;
  DAT_0062d870 = 0;
  DAT_0069b03c = 0;
  for (let local_18 = 0; local_18 < 2; local_18 = local_18 + 1) {
    in_ECX[local_18 + 0xd9] = 0; in_ECX[local_18 + 0xdb] = 0;
    in_ECX[local_18 + 0xdd] = 0; in_ECX[local_18 + 0xdf] = 0;
    in_ECX[local_18 + 0xe1] = 0; in_ECX[local_18 + 0xe3] = 0;
    in_ECX[local_18 + 0xe5] = 0; in_ECX[local_18 + 0xe7] = 0;
    in_ECX[local_18 + 0xe9] = 0;
  }
  return in_ECX;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4593 — parleywin_destruct
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4593() {
  // DEVIATION: Win32 parley window destructor — uses in_ECX (this pointer)
  // Closes chat log, frees buffers, destroys controls and window
  // in_ECX[0x7b] === 4 means chat mode active
  FUN_004b50cf(); // free controls
  FUN_004083b0(); // destroy window
  FUN_004b4711(); // base dtor
  FUN_004b4727(); // SEH cleanup
  return;
}

// FUN_004b4705 — parleywin_close_chatfile
export function FUN_004b4705() { FUN_005d7c6e(); }
// FUN_004b4711 — parleywin_base_dtor
export function FUN_004b4711() { FUN_0044cba0(); }
// FUN_004b4727 — parleywin_seh_cleanup
export function FUN_004b4727() { return; }


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4735 — parleywin_open
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4735(param_1) {
  // DEVIATION: Win32 UI — opens the parley (diplomacy) window
  // Initializes chat buffers (DAT_0062d870, DAT_0062d86c), reads chatlog file,
  // sets up controls. Uses in_ECX (this pointer), Win32 GetPrivateProfileIntA,
  // WritePrivateProfileStringA, operator_new, memset, file I/O.
  // Mode param_1: 1=negotiate, 2=intelligence, 3=message, 4=chat
  return;
}

// FUN_004b4be3 — parleywin_close_chatfile_2
export function FUN_004b4be3() { FUN_005d7c6e(); }
// FUN_004b4bf9 — parleywin_seh_cleanup_2
export function FUN_004b4bf9() { return; }


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4c09 — parleywin_save_position
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4c09() {
  // DEVIATION: Win32 UI — saves parley window position
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4c81 — parleywin_set_resolution
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4c81() {
  // DEVIATION: Win32 UI — sets hi-res flag on parley window based on screen resolution
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4cf0 — parleywin_calc_layout
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4cf0() {
  // DEVIATION: Win32 UI — calculates parley window layout/sizing (SetRect calls)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4e8a — parleywin_calc_client_rects
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4e8a() {
  // DEVIATION: Win32 UI — calculates inner client area rectangles for parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4fb2 — parleywin_update_scrollbars
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4fb2() {
  // DEVIATION: Win32 UI — updates scrollbar positions in parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b50cf — parleywin_free_controls
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b50cf() {
  // DEVIATION: Win32 UI — frees all UI control widgets in the parley window (buttons, listboxes, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b5c93 — parleywin_create_controls
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b5c93() {
  // DEVIATION: Win32 UI — creates all UI controls for the parley window (buttons, text areas, chat input, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b74c4 — parleywin_button_handler
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b74c4(param_1) {
  // DEVIATION: Win32 UI — handles button clicks in parley window (OK=0x3e9, zoom in/out, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b75fb — parleywin_ok_clicked
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b75fb() {
  FUN_005c62ee();
  FUN_004518d0();
  FUN_004b76d5();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7645 — parleywin_focus_negotiate
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7645() {
  FUN_005c6303(DAT_0067a7a8 + 0x48 * 0); // DEVIATION: Win32 focus call
  FUN_004b76d5();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b768d — parleywin_focus_chat
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b768d() {
  FUN_005c6303(0); // DEVIATION: Win32 focus call
  FUN_004b76d5();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b76d5 — parleywin_close
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b76d5() {
  // DEVIATION: Win32 UI — closes the parley window, cleans up diplomat state, sends cancel message if needed
  DAT_00626a2c = 0;
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7885 — parleywin_repaint
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7885() {
  // DEVIATION: Win32 UI — repaints the parley window (layout, decorations, scrollbars)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b794a — parleywin_paint_decorations
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b794a() {
  // DEVIATION: Win32 UI — paints parley window decorations (borders, civ name tabs, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7c90 — parleywin_paint_border_strip
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7c90(param_1, param_2) {
  // DEVIATION: Win32 UI — paints a decorative border strip in the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7d72 — parleywin_build_title
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7d72() {
  // DEVIATION: Win32 UI — builds the title bar text for the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7eb6 — parleywin_start_session
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7eb6(param_1, param_2) {
  // DEVIATION: Win32 UI — starts a diplomacy/chat/intelligence session in the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b81dd — parley_handle_response
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b81dd() {
  // DEVIATION: Win32 UI — handles diplomacy response messages (accept, reject, counter-offer, declare war, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b8676 — parley_set_negotiation_state
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b8676(param_1) {
  // DEVIATION: Win32 UI — sets the negotiation state (proposal type, scrollbar ranges) based on DAT_0067a9b0
  FUN_005c6303(0); // DEVIATION: Win32 focus call

  if (DAT_0067a9b0 === -1) {
    DAT_0067a994 = 3;
  } else if (DAT_0067a9b0 === 0) {
    DAT_0067a994 = 6;
  } else if (DAT_0067a9b0 === 1) {
    DAT_0067a994 = 0xc;
    if (DAT_0067a9c4 !== 0) {
      DAT_0067a994 = 0xd;
    }
  } else if (DAT_0067a9b0 === 2) {
    if (DAT_0067a9c8 === 0) {
      DAT_0067a994 = 7;
    } else if (DAT_0067a9c8 === 1) {
      DAT_0067a994 = 8;
    } else if (DAT_0067a9c8 === 2) {
      DAT_0067a994 = 9;
    } else if (DAT_0067a9c8 === 3) {
      DAT_0067a994 = 10;
    } else {
      DAT_0067a994 = 0xb;
    }
  } else if (DAT_0067a9b0 === 3) {
    DAT_0067a994 = 5;
  } else if (DAT_0067a9b0 === 4) {
    DAT_0067a994 = 0xf;
  }

  DAT_0067a998 = DAT_0062d7d0 + DAT_0067a994 * 2; // DEVIATION: Win32 UI — array lookup
  DAT_0067a99c = DAT_0062d7d4 + DAT_0067a994 * 2; // DEVIATION: Win32 UI — array lookup
  DAT_0067a9a0 = DAT_0067a998;
  DAT_0067a9a4 = DAT_0067a99c;
  if (param_1 !== 0) {
    FUN_00526ca0(DAT_0067a998, 0);
    FUN_00526ca0(DAT_0067a99c, 1);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b888e — parley_cleanup_side_controls
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b888e(param_1) {
  // DEVIATION: Win32 UI — cleans up (destroys) controls on a side of the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b8e5c — parley_validate_gold_input
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b8e5c(param_1) {
  // DEVIATION: Win32 UI — validates gold amount entered in diplomacy text field
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b90ad — parley_send_chat_message
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b90ad(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 UI — sends a chat message to other players, formats and appends to chat log
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b93a2 — parley_append_chat_text
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b93a2(param_1) {
  // DEVIATION: Win32 UI — appends text to the chat display buffer, trimming old messages if needed
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b9504 — parley_format_civ_name
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b9504(param_1) {
  // DEVIATION: Win32 UI — formats a civilization name for display (leader + nation)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b957e — parleywin_keydown_handler
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b957e(param_1) {
  if (param_1 === 0xd2) {
    FUN_004b75fb();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b95c2 — parleywin_send_on_enter
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b95c2() {
  FUN_004b968a(0, 0xd0);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b95e1 — parleywin_clear_chat
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b95e1() {
  // DEVIATION: Win32 UI — clears the chat input and display buffers
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b9635 — parleywin_preprocess_key
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b9635(param_1, param_2) {
  let uVar1;

  if ((param_2 === 0x1b) || (param_2 === 0xd2)) {
    FUN_004b75fb();
    uVar1 = 0;
  } else {
    uVar1 = 1;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b968a — parley_handle_command
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b968a(param_1, param_2) {
  // DEVIATION: Win32 UI — handles parley window commands (send chat msg, close, scroll, etc.)
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bb370 — widget_read_text
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb370() { FUN_005d84f6(); return; }

// FUN_004bb3b0 — widget_button_dtor
export function FUN_004bb3b0(param_1) { FUN_0040f570(); return null; }

// FUN_004bb400 — widget_listbox_dtor
export function FUN_004bb400(param_1) { FUN_00418870(); return null; }

// FUN_004bb450 — widget_checkbox_dtor
export function FUN_004bb450(param_1) { FUN_0040f930(); return null; }

// FUN_004bb4a0 — widget_scrollbar_dtor
export function FUN_004bb4a0(param_1) { FUN_004bb740(); return null; }

// FUN_004bb4f0 — widget_dropdown_dtor
export function FUN_004bb4f0(param_1) { FUN_0040fbb0(); return null; }

// FUN_004bb540 — widget_get_height
export function FUN_004bb540() { FUN_00407fc0(); return; }

// FUN_004bb570 — widget_set_size
export function FUN_004bb570(param_1) { FUN_005bc713(0, param_1); return; }

// FUN_004bb5b0 — widget_set_readonly
export function FUN_004bb5b0() { return; }

// FUN_004bb5e0 — widget_focus_hwnd
export function FUN_004bb5e0() { FUN_005c90b0(0); return; }

// ═══════════════════════════════════════════════════════════════════
// FUN_004bb620 — widget_create_editbox
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb620(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 UI — creates an edit box widget (Win32 window)
  return;
}


// FUN_004bb6d0 — widget_set_cursor_pos
export function FUN_004bb6d0(param_1) { FUN_005d2f7e(0, param_1); return; }

// FUN_004bb710 — widget_get_text_length
export function FUN_004bb710() { FUN_005d2f7e(0); return; }


// ═══════════════════════════════════════════════════════════════════
// FUN_004bb740 — scrollbar_widget_dtor
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb740() {
  // DEVIATION: Win32 UI — scrollbar widget destructor (frees child windows)
  return;
}

// FUN_004bb7b0 — scrollbar_base_dtor
export function FUN_004bb7b0() { FUN_0040f510(); return; }
// FUN_004bb7c3 — scrollbar_seh_cleanup
export function FUN_004bb7c3() { return; }

// FUN_004bb800 — widget_inflate_rect_neg
export function FUN_004bb800(param_1, param_2, param_3) {
  // DEVIATION: Win32 UI — InflateRect with negated params
  return;
}

// FUN_004bb840 — widget_inflate_rect
export function FUN_004bb840(param_1, param_2, param_3) {
  // DEVIATION: Win32 UI — Win32 InflateRect
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bb870 — alloc_global_memory
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb870(param_1) {
  DAT_00634818 = param_1;
  let iVar1 = FUN_005dce4f(param_1);
  DAT_00634814 = (iVar1 === 0) ? 1 : 0;
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bb8e0 — wonder_view_init
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb8e0(param_1) {
  // DEVIATION: Win32 UI — initializes the wonder view (loads art, plays intro)
  return;
}

// FUN_004bb97b — wonder_view_cleanup_call
export function FUN_004bb97b() { FUN_004bba79(); return; }
// FUN_004bb991 — wonder_view_seh_cleanup
export function FUN_004bb991() { return; }


// ═══════════════════════════════════════════════════════════════════
// FUN_004bb99f — wonder_view_construct
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb99f() {
  // DEVIATION: Win32 UI — constructs the wonder view object
  return null;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bba79 — wonder_view_destruct
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bba79() {
  // DEVIATION: Win32 UI — destructs the wonder view object, calls sub-destructors
  FUN_004bbaf1();
  FUN_004bbb00();
  FUN_004bbb0f();
  FUN_004bbb1e();
  FUN_004bbb31();
  return;
}

// FUN_004bbaf1 — wonder_view_destroy_child1
export function FUN_004bbaf1() { FUN_005c656b(); return; }
// FUN_004bbb00 — wonder_view_destroy_child2
export function FUN_004bbb00() { FUN_005bd915(); return; }
// FUN_004bbb0f — wonder_view_destroy_child3
export function FUN_004bbb0f() { FUN_005dd1a0(); return; }
// FUN_004bbb1e — wonder_view_destroy_base
export function FUN_004bbb1e() { return; }
// FUN_004bbb31 — wonder_view_seh_cleanup_2
export function FUN_004bbb31() { return; }


// ═══════════════════════════════════════════════════════════════════
// load_civ2_art_004bbb3f — load_civ2_art
// ═══════════════════════════════════════════════════════════════════

export function load_civ2_art_004bbb3f(param_1) {
  // DEVIATION: Win32 UI — loads the civ2 wonder art GIF resource and sets up the display surface
  return;
}

// FUN_004bbdbd — wonder_art_cleanup_dll
export function FUN_004bbdbd() { return; }
// FUN_004bbdc9 — wonder_art_cleanup_surface
export function FUN_004bbdc9() { FUN_005bd915(); return; }
// FUN_004bbdd5 — wonder_art_cleanup_cstring
export function FUN_004bbdd5() { FUN_005cde4d(); return; }
// FUN_004bbdeb — wonder_art_seh_cleanup
export function FUN_004bbdeb() { return; }


// ═══════════════════════════════════════════════════════════════════
// FUN_004bbdfb — wonder_view_play_video
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bbdfb() {
  // DEVIATION: Win32 UI — plays the wonder completion video (AVI)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bc0bb — wonder_view_always_false
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bc0bb() {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bc0d3 — wonder_view_refresh_surface
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bc0d3() {
  // DEVIATION: Win32 UI — refreshes wonder view display surface
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bc10f — wonder_view_resize
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bc10f() {
  // DEVIATION: Win32 UI — resizes the wonder view window
  return;
}


// FUN_004bc193 — wonder_view_invalidate_1
export function FUN_004bc193() { return; }

// FUN_004bc1b1 — wonder_view_invalidate_2
export function FUN_004bc1b1() { return; }

// FUN_004bc1cf — wonder_view_conditional_invalidate
export function FUN_004bc1cf(param_1) {
  // DEVIATION: Win32 UI — invalidates wonder view if param_1 is in range 0xd0..0xd2
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bc480 — ai_assess_military_posture
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bc480(param_1) {
  let iVar1;
  let uVar2;
  let local_70;
  let local_6c;
  let aiStack_68 = new Int32Array(8);
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let aiStack_24 = new Int32Array(8);

  local_70 = 0;
  local_48 = 0;
  local_44 = -1;
  for (local_40 = 0; local_40 < DAT_00655b18; local_40 = local_40 + 1) {
    if ((DAT_0064f394[local_40 * 0x58] !== 0) &&
       (s8(DAT_0064f348[local_40 * 0x58]) === param_1)) {
      iVar1 = FUN_0043d20a(local_40, 2);
      if (iVar1 !== 0) {
        local_70 = local_70 + 1;
      }
      iVar1 = FUN_0043d20a(local_40, 1);
      if (iVar1 !== 0) {
        local_44 = local_40;
      }
      local_48 = local_48 + 1;
    }
  }
  if (local_48 < 2) {
    local_48 = 1;
  }
  local_34 = 0;
  for (local_6c = 0; local_6c < DAT_00655b16; local_6c = local_6c + 1) {
    if ((DAT_0065610a[local_6c * 0x20] !== 0) &&
       (s8(DAT_006560f7[local_6c * 0x20]) === param_1)) {
      local_34 = local_34 + 1;
    }
  }
  if (((local_48 + -1 + local_34) / local_48 | 0) <
      ((u8(DAT_0064c6b5[param_1 * 0x594]) < 5 ? 1 : 0) + 2)) {
    uVar2 = 1;
  } else {
    for (local_2c = 0; local_2c < 8; local_2c = local_2c + 1) {
      aiStack_68[local_2c] = 0;
      aiStack_24[local_2c] = 0;
    }
    for (local_2c = 1; local_2c < 8; local_2c = local_2c + 1) {
      iVar1 = _FUN_004bd9f0(local_2c, 0x4b);
      if (iVar1 !== 0) {
        aiStack_68[local_2c] = aiStack_68[local_2c] + 1;
      }
      iVar1 = _FUN_004bd9f0(local_2c, 0x3b);
      if (iVar1 !== 0) {
        aiStack_68[local_2c] = aiStack_68[local_2c] + 1;
      }
      for (local_38 = 0; local_38 < 0x3e; local_38 = local_38 + 1) {
        iVar1 = _FUN_004bd9f0(local_2c, s8(DAT_0064b1cb[local_38 * 0x14]));
        if (iVar1 !== 0) {
          if (DAT_0064b1c1[local_38 * 0x14] === 2) {
            aiStack_68[local_2c] = aiStack_68[local_2c] + 1;
          } else if ((DAT_0064b1ca[local_38 * 0x14] === 0) ||
                    (DAT_0064b1ca[local_38 * 0x14] === 1)) {
            aiStack_24[local_2c] = aiStack_24[local_2c] + 1;
          }
        }
      }
    }
    local_3c = 0;
    local_28 = 0;
    local_30 = 0;
    for (local_2c = 1; local_2c < 8; local_2c = local_2c + 1) {
      if (param_1 !== local_2c) {
        if ((DAT_0064c6c1[param_1 * 0x594 + local_2c * 4] & 0x20) !== 0) {
          local_30 = local_30 + 1;
        }
        if (aiStack_68[param_1] < aiStack_68[local_2c]) {
          local_28 = local_28 + 1;
        }
        if (aiStack_24[param_1] < aiStack_24[local_2c]) {
          local_3c = local_3c + 1;
        }
      }
    }
    iVar1 = FUN_005ae006(DAT_00655b0a);
    if (((iVar1 + -1) / 2 | 0) < local_3c) {
      uVar2 = 2;
    } else {
      iVar1 = FUN_005ae006(DAT_00655b0a);
      if (((iVar1 + -1) / 2 | 0) < local_28) {
        uVar2 = 3;
      } else {
        iVar1 = _FUN_004bd9f0(param_1, 0x2f);
        if ((((iVar1 === 0) || (local_44 < 0)) ||
            (iVar1 = FUN_0043d20a(local_44, 8), iVar1 !== 0)) ||
           (iVar1 = FUN_00453e51(param_1, 6), iVar1 !== 0)) {
          if (local_70 === 0) {
            uVar2 = 4;
          } else if ((local_30 === 0) && (4 < u8(DAT_00655c22[param_1]))) {
            uVar2 = 7;
          } else {
            uVar2 = 6;
          }
        } else {
          uVar2 = 5;
        }
      }
    }
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bc8aa — ai_assess_city_defense
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bc8aa(param_1, param_2) {
  let uVar1;
  let iVar2;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  for (local_c = 1; local_c < 8; local_c = local_c + 1) {
    if ((local_c !== param_1) &&
       (u8(DAT_0064c6b0[param_1 * 0x594]) <= u8(DAT_0064c6b0[local_c * 0x594]))) {
      local_10 = local_10 + 1;
    }
  }
  if (local_10 === 0) {
    uVar1 = 7;
  } else {
    if (u8(DAT_0064c6b5[param_1 * 0x594]) < 5) {
      if ((DAT_0064c6b5[param_1 * 0x594] !== 4) &&
         (u8(DAT_0064c6b3[param_1 * 0x594]) < 6)) {
        return 2;
      }
    } else if (u8(DAT_0064c6b3[param_1 * 0x594]) < 4) {
      return 2;
    }
    local_20 = 0;
    local_14 = 0;
    local_8 = u8(DAT_0064c7a8[param_1 * 0x594]) + u8(DAT_0064c7a9[param_1 * 0x594]);
    if (param_2 === 0) {
      local_1c = 6;
    } else if (param_2 === 1) {
      local_1c = 0xc;
    } else {
      local_1c = 0x1a;
    }
    for (local_18 = 0; local_18 < DAT_00655b18; local_18 = local_18 + 1) {
      if ((DAT_0064f394[local_18 * 0x58] !== 0) &&
         (s8(DAT_0064f348[local_18 * 0x58]) === param_1)) {
        local_20 = local_20 + 1;
        iVar2 = FUN_0043d20a(local_18, local_1c);
        if (iVar2 !== 0) {
          local_14 = local_14 + 1;
        }
        local_8 = local_8 + s8(DAT_0064f37a[local_18 * 0x58]);
      }
    }
    iVar2 = _FUN_004bd9f0(param_1, s8(DAT_0064c48e[local_1c * 8]));
    if ((iVar2 === 0) || ((local_20 / 2 | 0) <= local_14)) {
      iVar2 = _FUN_004bd9f0(param_1, 0x54);
      if ((iVar2 === 0) || (((local_20 + ((local_20 >> 31) & 3)) >> 2) <= local_8)) {
        iVar2 = FUN_005ae006(DAT_00655b0a);
        if (local_10 < (iVar2 / 2 | 0)) {
          uVar1 = 5;
        } else {
          uVar1 = 1;
        }
      } else {
        uVar1 = 4;
      }
    } else {
      uVar1 = 3;
    }
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bcb9b — ai_assess_economy
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bcb9b(param_1, param_2) {
  let iVar1;
  let uVar2;
  let local_d0;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b4;
  let local_b0;
  let aiStack_ac = new Int32Array(39);
  let local_10;
  let local_c;
  let local_8;

  local_b0 = 0;
  local_b4 = 0;
  local_d0 = 0;
  local_c8 = 0;
  local_8 = u8(DAT_0064c7a8[param_1 * 0x594]) + u8(DAT_0064c7a9[param_1 * 0x594]);
  if (param_2 === 0) {
    local_bc = 0x14;
    local_10 = 5;
    local_c = 2;
  } else if (param_2 === 1) {
    local_bc = 6;
    local_10 = 10;
    local_c = 3;
  } else {
    local_bc = 0x16;
    local_10 = 0x16;
    local_c = 4;
  }
  for (local_c4 = 0; local_c4 < 0x27; local_c4 = local_c4 + 1) {
    aiStack_ac[local_c4] = 0;
  }
  for (local_c0 = 0; local_c0 < DAT_00655b18; local_c0 = local_c0 + 1) {
    if ((DAT_0064f394[local_c0 * 0x58] !== 0) &&
       (s8(DAT_0064f348[local_c0 * 0x58]) === param_1)) {
      local_c8 = local_c8 + 1;
      local_8 = local_8 + s8(DAT_0064f37a[local_c0 * 0x58]);
      FUN_004ea1f6(local_c0, s16(DAT_0064f38e, local_c0 * 0x58), 1, 0);
      for (local_c4 = 0; local_c4 < 0x27; local_c4 = local_c4 + 1) {
        iVar1 = FUN_0043d20a(local_c0, local_c4);
        if (iVar1 !== 0) {
          aiStack_ac[local_c4] = aiStack_ac[local_c4] + 1;
        }
      }
      iVar1 = FUN_0043d20a(local_c0, local_10);
      if (iVar1 !== 0) {
        local_d0 = local_d0 + 1;
      }
      if ((DAT_0064f344[local_c0 * 0x58] & 1) === 0) {
        local_b0 = local_b0 + s16(DAT_0064f38c, local_c0 * 0x58);
      }
    }
  }
  for (local_c4 = 0; local_c4 < 0x27; local_c4 = local_c4 + 1) {
    if ((aiStack_ac[local_c4] !== 0) && (iVar1 = FUN_004f00f0(param_1, local_c4), iVar1 !== 0)) {
      local_b4 = local_b4 + aiStack_ac[local_c4] * iVar1;
    }
  }
  if ((local_b0 < local_b4) && (s32(DAT_0064c6a2, param_1 * 0x594) < 100)) {
    uVar2 = 1;
  } else {
    iVar1 = _FUN_004bd9f0(param_1, local_bc);
    if (iVar1 === 0) {
      uVar2 = 2;
    } else if (local_d0 < ((local_c8 / local_c) | 0)) {
      uVar2 = 3;
    } else {
      iVar1 = _FUN_004bd9f0(param_1, 0x54);
      if (iVar1 === 0) {
        uVar2 = 4;
      } else if (local_8 < ((local_c8 + ((local_c8 >> 31) & 3)) >> 2)) {
        uVar2 = 5;
      } else if (local_b0 - local_b4 < 6) {
        uVar2 = 6;
      } else {
        uVar2 = 7;
      }
    }
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bcfcf — ai_assess_diplomacy
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bcfcf(param_1, param_2) {
  let iVar1;
  let uVar2;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = 0;
  local_1c = 0;
  local_10 = 0;
  local_8 = 0;
  for (local_c = 1; local_c < 8; local_c = local_c + 1) {
    if (local_c !== param_1) {
      if ((DAT_0064c6c0[local_c * 4 + param_1 * 0x594] & 1) !== 0) {
        local_8 = local_8 + 1;
      }
      if ((DAT_0064c6c0[local_c * 4 + param_1 * 0x594] & 8) !== 0) {
        local_10 = local_10 + 1;
      }
      if ((DAT_0064c6c1[local_c * 4 + param_1 * 0x594] & 0x20) !== 0) {
        local_14 = local_14 + 1;
      }
      if (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + local_c * 4] & 0x80) !== 0) ||
         (iVar1 = FUN_00453e51(DAT_006d1da0, 0x18), iVar1 !== 0) ||
         (iVar1 = FUN_00453e51(DAT_006d1da0, 9), iVar1 !== 0)) {
        local_1c = local_1c + 1;
      }
    }
  }
  if (local_8 === 0) {
    uVar2 = 1;
  } else {
    if (param_2 === 2) {
      local_18 = 0x1b;
    } else {
      local_18 = 0x58;
    }
    iVar1 = _FUN_004bd9f0(param_1, local_18);
    if (iVar1 === 0) {
      uVar2 = 3;
    } else if ((((local_8 < 2) || (1 < u8(DAT_0064c6be[param_1 * 0x594]))) || (local_10 !== 0)) ||
              ((DAT_0064c6a0[param_1 * 0x594] & 0x100) !== 0 ||
               (6 < u8(DAT_00655c22[param_1])))) {
      if (u8(DAT_0064c6be[param_1 * 0x594]) < 3) {
        if ((local_14 === local_8) && (1 < u8(DAT_0064c6be[param_1 * 0x594]))) {
          uVar2 = 4;
        } else if ((DAT_0064c6a0[param_1 * 0x594] & 0x80) === 0) {
          uVar2 = 6;
        } else if ((local_1c === 0) || ((local_14 === local_8 && (local_1c < local_8)))) {
          uVar2 = 5;
        } else if (local_14 === local_8) {
          uVar2 = 6;
        } else {
          uVar2 = 7;
        }
      } else {
        uVar2 = 4;
      }
    } else {
      uVar2 = 2;
    }
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bd2a3 — ai_assess_tax_rate
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bd2a3(param_1) {
  let bVar1;
  let uVar2;
  let uVar3;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  uVar2 = DAT_00655aee & 4;
  DAT_00655aee = DAT_00655aee & 0xfffb;
  local_18 = 0;
  local_c = 0;
  local_14 = 0;
  local_10 = 0;
  for (local_20 = 0; local_20 < DAT_00655b18; local_20 = local_20 + 1) {
    if ((DAT_0064f394[local_20 * 0x58] !== 0) &&
       (s8(DAT_0064f348[local_20 * 0x58]) === param_1)) {
      if ((uVar2 !== 0) && (4 < u8(DAT_0064c6b5[param_1 * 0x594]))) {
        FUN_004eb4ed(local_20, 1);
      }
      if (s8(DAT_0064f392[local_20 * 0x58]) < s8(DAT_0064f393[local_20 * 0x58])) {
        local_10 = local_10 + 1;
        if ((DAT_0064f344[local_20 * 0x58] & 1) !== 0) {
          local_c = local_c + 1;
        }
      } else if (DAT_0064f392[local_20 * 0x58] === DAT_0064f393[local_20 * 0x58]) {
        local_18 = local_18 + 1;
      }
      if ((DAT_0064f344[local_20 * 0x58] & 2) !== 0) {
        local_14 = local_14 + 1;
      }
    }
  }
  if (u8(DAT_0064c6b5[param_1 * 0x594]) < 5) {
    bVar1 = true;
    if ((((local_10 === 0) && (local_18 !== 0)) && (local_14 === 0)) &&
       (u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594]) === 10)) {
      bVar1 = false;
    }
  } else {
    bVar1 = u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594]) < 9;
  }
  if (local_10 === 0) {
    if (bVar1) {
      if (local_14 === 0) {
        uVar3 = 5;
      } else {
        uVar3 = 6;
      }
    } else {
      uVar3 = 4;
    }
  } else if (bVar1) {
    if ((local_c === 0) || (DAT_0064c6b5[param_1 * 0x594] !== 6)) {
      uVar3 = 3;
    } else {
      uVar3 = 1;
    }
  } else {
    uVar3 = 2;
  }
  return uVar3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bdaa5 — tech_is_descendant_of
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bdaa5(param_1, param_2) {
  let uVar1;
  let iVar2;

  if (param_1 < 0) {
    uVar1 = 0;
  } else if (param_1 === param_2) {
    uVar1 = 1;
  } else {
    iVar2 = FUN_004bdaa5(s8(DAT_0062768e[param_1 * 0x10]), param_2);
    if ((iVar2 === 0) &&
       (iVar2 = FUN_004bdaa5(s8(DAT_0062768f[param_1 * 0x10]), param_2), iVar2 === 0)) {
      uVar1 = 0;
    } else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bdb2c — ai_calc_tech_value
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bdb2c(param_1, param_2) {
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_38 = s8(DAT_006554fa[s16(DAT_0064c6a6, param_1 * 0x594) * 0x30]);
  if (((1 << (param_1 & 0x1f) & DAT_00655b0b) === 0) && (-1 < local_38)) {
    for (local_14 = 1; local_14 < 8; local_14 = local_14 + 1) {
      if ((((1 << (local_14 & 0x1f) & DAT_00655b0b) !== 0) &&
          ((DAT_0064c6c1[param_1 * 0x594 + local_14 * 4] & 0x20) !== 0)) &&
         (u8(DAT_0064c6b0[param_1 * 0x594]) < u8(DAT_0064c6b0[local_14 * 0x594]))) {
        for (local_28 = 1; local_28 < 0x3f; local_28 = local_28 + 1) {
          if ((DAT_0064c932[param_1 * 0x594 + local_28] !== 0) &&
             (DAT_0064c932[local_14 * 0x594 + local_28] !== 0)) {
            if (-1 < local_38) {
              local_38 = local_38 + -1;
            }
            if (6 < u8(DAT_0064c6be[local_14 * 0x594])) {
              local_38 = -1;
            }
          }
        }
      }
    }
  }
  local_8 = s8(DAT_0062768b[param_2 * 0x10]) * local_38 + s8(DAT_0062768a[param_2 * 0x10]);
  iVar4 = FUN_004bdaa5(DAT_0064b44b, param_2);
  if (iVar4 === 0) {
    iVar4 = FUN_004bdaa5(DAT_0064b45f, param_2);
    if ((iVar4 === 0) && (iVar4 = FUN_004bdaa5(DAT_0064b487, param_2), iVar4 === 0)) {
      iVar4 = FUN_004bdaa5(DAT_0064b527, param_2);
      if (iVar4 === 0) {
        local_10 = 0;
      } else {
        local_10 = 1;
      }
    } else {
      local_10 = 2;
    }
  } else {
    local_10 = 3;
  }
  if ((DAT_00655af0 & 4) !== 0) {
    local_10 = local_10 << 1;
  }
  local_34 = 0;
  if (local_10 !== 0) {
    local_34 = 0;
    bVar2 = false;
    for (local_28 = 1; local_28 < 0x3f; local_28 = local_28 + 1) {
      if (DAT_0064c932[param_1 * 0x594 + local_28] !== 0) {
        bVar3 = false;
        for (local_14 = 0; local_14 < 8; local_14 = local_14 + 1) {
          if ((param_1 !== local_14) &&
             ((DAT_0064c932[param_1 * 0x594 + local_28] !== 0 ||
              (s16(DAT_0064c832, param_1 * 0x594 + local_28 * 2) !== 0)))) {
            bVar3 = true;
            if ((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0) {
              bVar2 = true;
            }
            break;
          }
        }
        if (!bVar3) {
          local_34 = 1;
          break;
        }
      }
    }
    if (local_34 === 0) {
      if ((!bVar2) || ((DAT_00655af0 & 4) !== 0)) {
        local_8 = local_8 + 1;
      }
    } else {
      local_8 = local_8 + local_10;
    }
  }
  if (DAT_0064c59e === param_2) {
    local_8 = local_8 + ((s16(DAT_0064c70a, param_1 * 0x594) + ((s16(DAT_0064c70a, param_1 * 0x594) >> 31) & 3)) >> 2);
  }
  if ((1 << (param_1 & 0x1f) & DAT_00655b0b) === 0) {
    if ((DAT_00655b0b & DAT_00655bce) !== 0) {
      iVar4 = FUN_004bdaa5(0x20, param_2);
      if (iVar4 !== 0) {
        local_8 = local_8 + 2;
      }
      for (local_30 = 0x23; local_30 < 0x26; local_30 = local_30 + 1) {
        if (s8(DAT_0064c48e[local_30 * 8]) === param_2) {
          local_8 = local_8 + 3;
        }
      }
    }
    iVar4 = local_8;
    if ((((-1 < DAT_0064b3fb) && ((DAT_00655b0b & DAT_00655b82[DAT_0064b3fb]) !== 0)) &&
        (iVar5 = FUN_004bdaa5(DAT_0064b3fb, param_2), iVar5 !== 0)) &&
       (iVar4 = local_8 + 2, DAT_0064b3fb === param_2)) {
      iVar4 = local_8 + 5;
    }
    local_8 = iVar4;
    for (local_18 = 0; local_18 < 0x1c; local_18 = local_18 + 1) {
      if (s8(DAT_0064ba28[local_18]) === param_2) {
        iVar4 = FUN_00453e51(param_1, local_18);
        if ((iVar4 !== 0) && (param_2 !== 0x25)) {
          local_8 = local_8 + -2;
        }
        iVar4 = FUN_00453e18(local_18);
        if ((-1 < iVar4) &&
           ((DAT_00655b0b & (1 << (DAT_0064f348[iVar4 * 0x58] & 0x1f))) !== 0)) {
          local_8 = local_8 + 2;
        }
      }
    }
  }
  if ((DAT_0064c4d6 === param_2) || (DAT_0064c546 === param_2)) {
    local_24 = 0;
    for (local_2c = 0; local_2c < DAT_00655b18; local_2c = local_2c + 1) {
      iVar4 = local_24;
      if (((DAT_0064f394[local_2c * 0x58] !== 0) &&
          (s8(DAT_0064f348[local_2c * 0x58]) === param_1)) &&
         (iVar4 = s8(DAT_0064f349[local_2c * 0x58]),
         s8(DAT_0064f349[local_2c * 0x58]) <= local_24)) {
        iVar4 = local_24;
      }
      local_24 = iVar4;
    }
    let bVar1 = DAT_0064bcd2;
    if (DAT_0064c4d6 === param_2) {
      bVar1 = DAT_0064bcd1;
    }
    local_3c = u8(bVar1);
    if (local_3c <= local_24) {
      local_8 = local_8 + 2;
    }
  }
  if ((-1 < s8(DAT_006554fa[s16(DAT_0064c6a6, param_1 * 0x594) * 0x30])) &&
     (iVar4 = _FUN_004bd9f0(param_1, 0x55), iVar4 !== 0)) {
    iVar4 = FUN_004bdaa5(0x10, param_2);
    if (iVar4 !== 0) {
      local_8 = local_8 + s8(DAT_006554fa[s16(DAT_0064c6a6, param_1 * 0x594) * 0x30]) + 1;
    }
    if (param_2 === 0x10) {
      local_8 = local_8 + 2;
    }
  }
  iVar5 = _FUN_004bd9f0(param_1, 0x26);
  iVar4 = local_8;
  if ((iVar5 !== 0) && (iVar5 = FUN_004bdaa5(0x25, param_2), iVar5 !== 0)) {
    iVar5 = _FUN_004bd9f0(param_1, 0x39);
    iVar4 = local_8 + 1;
    if (iVar5 !== 0) {
      iVar4 = local_8 + 2;
    }
  }
  local_8 = iVar4;
  // switch on government type
  let govType = s16(DAT_0064c6a6, param_1 * 0x594);
  switch (govType) {
  case 0:
    if (((param_2 === 0x27) || (param_2 === 8)) || (param_2 === 0x56)) { local_8 = local_8 + 2; }
    if (param_2 === 0x37) { local_8 = local_8 + -1; }
    break;
  case 1:
    if (param_2 === 0xc) { local_8 = local_8 + 1; }
    break;
  case 2:
    if (param_2 === 6) { local_8 = local_8 + 1; }
    if (param_2 === 0x52) { local_8 = local_8 + 1; }
    if (param_2 === 0x3c) { local_8 = local_8 + 1; }
    break;
  case 3:
    if (param_2 === 0x2f) { local_8 = local_8 + 2; }
    break;
  case 4:
    if (param_2 === 0x15) { local_8 = local_8 + 2; }
    if (param_2 === 0xf) { local_8 = local_8 + -1; }
    if (param_2 === 0x49) { local_8 = local_8 + 1; }
    if (param_2 === 0x10) { local_8 = local_8 + 1; }
    if (param_2 === 0x2a) { local_8 = local_8 + 1; }
    break;
  case 5:
    if (param_2 === 0x40) { local_8 = local_8 + 1; }
    if (param_2 === 8) { local_8 = local_8 + 1; }
    if (param_2 === 1) { local_8 = local_8 + 1; }
    if (param_2 === 0x2e) { local_8 = local_8 + 1; }
    if (param_2 === 0x37) { local_8 = local_8 + -1; }
    if (param_2 === 0x3c) { local_8 = local_8 + 2; }
    break;
  case 6:
    if (param_2 === 0x40) { local_8 = local_8 + 2; }
    if (param_2 === 0x24) { local_8 = local_8 + 1; }
    if (param_2 === 0x38) { local_8 = local_8 + 1; }
    if (param_2 === 9) { local_8 = local_8 + 1; }
    if (param_2 === 0x37) { local_8 = local_8 + -1; }
    break;
  case 7:
    if (param_2 === 0xf) { local_8 = local_8 + 2; }
    if (param_2 === 0x3c) { local_8 = local_8 + 1; }
    if (param_2 === 0x22) { local_8 = local_8 + 1; }
    break;
  case 8:
    if (param_2 === 0x40) { local_8 = local_8 + 2; }
    if (param_2 === 0x24) { local_8 = local_8 + 1; }
    if (param_2 === 0x38) { local_8 = local_8 + 1; }
    if (param_2 === 9) { local_8 = local_8 + 1; }
    if (param_2 === 8) { local_8 = local_8 + -1; }
    if (param_2 === 0x27) { local_8 = local_8 + -1; }
    break;
  case 9:
    if (param_2 === 0x2a) { local_8 = local_8 + 1; }
    if (param_2 === 0x51) { local_8 = local_8 + 1; }
    if (param_2 === 0x11) { local_8 = local_8 + 1; }
    break;
  case 10:
    if (param_2 === 0x23) { local_8 = local_8 + -2; }
    if (param_2 === 0x37) { local_8 = local_8 + -1; }
    break;
  case 0xb:
    if (local_34 !== 0) { local_8 = local_8 - local_10; }
    if (param_2 === 0x23) { local_8 = local_8 + 1; }
    break;
  case 0xc:
    if (param_2 === 0x37) { local_8 = local_8 + 1; }
    if (local_10 !== 0) { local_8 = local_8 + 1; }
    break;
  case 0xf:
    if (param_2 === 0x4f) { local_8 = local_8 + 1; }
    if (param_2 === 0x34) { local_8 = local_8 + 1; }
    break;
  case 0x10:
    if (param_2 === 0x2e) { local_8 = local_8 + 1; }
    break;
  case 0x11:
    if (1 < local_10) { local_8 = local_8 + 1; }
    if (param_2 === 0x37) { local_8 = local_8 + 1; }
    break;
  case 0x12:
  case 0x13:
    if (param_2 === 0x40) { local_8 = local_8 + 2; }
    if (param_2 === 0x24) { local_8 = local_8 + 1; }
    if (param_2 === 0x38) { local_8 = local_8 + 1; }
    if (param_2 === 9) { local_8 = local_8 + 1; }
    if (param_2 === 0x37) { local_8 = local_8 + -1; }
    break;
  case 0x14:
    if (param_2 === 0x24) { local_8 = local_8 + 2; }
    break;
  }
  if (DAT_00655b82[param_2] === 0) {
    local_8 = local_8 + 1;
  }
  for (local_1c = 0; local_1c < 100; local_1c = local_1c + 1) {
    if (((s8(DAT_0062768e[local_1c * 0x10]) === param_2) ||
        (s8(DAT_0062768f[local_1c * 0x10]) === param_2)) &&
       (iVar4 = _FUN_004bd9f0(param_1, local_1c), iVar4 !== 0)) {
      local_8 = local_8 + -1;
    }
  }
  if (local_8 < 2) {
    local_8 = 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004be6ba — upgrade_units_for_tech
// ═══════════════════════════════════════════════════════════════════

export function FUN_004be6ba(param_1) {
  let iVar1;
  let uVar2;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let acStack_44 = new Uint8Array(0x3e);

  iVar1 = FUN_00453e51(param_1, 0xe);
  if (iVar1 !== 0) {
    for (local_48 = 0; local_48 < 0x3e; local_48 = local_48 + 1) {
      acStack_44[local_48] = 0;
    }
    for (local_54 = 0; local_54 < DAT_00655b16; local_54 = local_54 + 1) {
      if ((DAT_0065610a[local_54 * 0x20] !== 0) &&
         (s8(DAT_006560f7[local_54 * 0x20]) === param_1)) {
        uVar2 = u8(DAT_006560f6[local_54 * 0x20]);
        local_50 = s8(DAT_0064b1c0[uVar2 * 0x14]);
        if ((DAT_0064b1ca[uVar2 * 0x14] === 1) &&
           ((s8(DAT_0064b1c5[uVar2 * 0x14]) < DAT_0064b251 &&
            (iVar1 = _FUN_004bd9f0(param_1, 0x23), iVar1 !== 0)))) {
          local_50 = 0x23;
        }
        if ((-1 < local_50) && (iVar1 = _FUN_004bd9f0(param_1, local_50), iVar1 !== 0)) {
          local_4c = -1;
          for (local_48 = 0; local_48 < 0x3e; local_48 = local_48 + 1) {
            if (((s8(DAT_0064b1cb[local_48 * 0x14]) === local_50) &&
                (DAT_0064b1ca[u8(DAT_006560f6[local_54 * 0x20]) * 0x14] ===
                 DAT_0064b1ca[local_48 * 0x14])) &&
               (s8(DAT_0064b1c9[u8(DAT_006560f6[local_54 * 0x20]) * 0x14]) <=
                s8(DAT_0064b1c9[local_48 * 0x14]))) {
              local_4c = local_48;
            }
          }
          if (-1 < local_4c) {
            if ((acStack_44[u8(DAT_006560f6[local_54 * 0x20])] === 0) &&
               ((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0)) {
              acStack_44[u8(DAT_006560f6[local_54 * 0x20])] = 1;
              FUN_004271e8(0, DAT_0064b1b8[u8(DAT_006560f6[local_54 * 0x20]) * 0x14]);
              FUN_004271e8(1, DAT_0064b1b8[local_4c * 0x14]);
              FUN_004271e8(2, DAT_0064c630);
              if ((DAT_00655b02 < 3) || (DAT_006d1da0 === param_1)) {
                // DEVIATION: show upgrade dialog (Win32 UI)
                FUN_004442a0(0, local_4c, (DAT_00633584 === 0) ? 8 : 0);
              } else {
                FUN_00511880(0x3e, DAT_006ad30c[DAT_006ad558[param_1] * 0x54], 3, 0, local_4c, DAT_00633584);
              }
            }
            DAT_006560f6[local_54 * 0x20] = local_4c & 0xFF;
            DAT_006560f4[local_54 * 0x20] = DAT_006560f4[local_54 * 0x20] & 0xDF; // & 0xdfff as ushort
            FUN_0047cea6(s16(DAT_006560f0, local_54 * 0x20), s16(DAT_006560f2, local_54 * 0x20));
            if (2 < DAT_00655b02) {
              FUN_004b0b53(0xff, 2, 0, 0, 0);
              FUN_0046b14d(0x72, 0xff, s16(DAT_006560f0, local_54 * 0x20),
                           s16(DAT_006560f2, local_54 * 0x20), 0, 0, 0, 0, 0, 0);
            }
          }
        }
      }
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bea84 — handle_tech_government_effects
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bea84(param_1, param_2) {
  let iVar1;
  let uVar2;
  let local_8;

  if (param_2 === 0x36) {
    if ((DAT_0064c6b5[param_1 * 0x594] === 1) &&
       (iVar1 = FUN_00410030(0, 0, 0), iVar1 === 1)) {
      uVar2 = FUN_00493c7d(param_1);
      FUN_0040ff60(0, uVar2);
      FUN_00410030(0, 0, 0);
      FUN_0055c066(param_1, 0);
    }
  } else if ((((param_2 === 0x47) || (param_2 === 0x15)) || (param_2 === 0xf)) || (param_2 === 0x1f)) {
    if ((((DAT_00655aea & 0x100) !== 0) && (param_2 === 0x47)) &&
       (u8(DAT_0064c6b5[param_1 * 0x594]) < 3)) {
      // DEVIATION: tutorial popup
      FUN_004904c0(0, 0, 0, 0);
      return;
    }
    if (param_2 === 0xf) {
      local_8 = 3;
    } else if (param_2 === 0x1f) {
      local_8 = 4;
    } else if (param_2 === 0x47) {
      local_8 = 5;
    } else {
      local_8 = 6;
    }
    if ((param_2 === 0x47) && (DAT_0064c6b5[param_1 * 0x594] === 5)) {
      return;
    }
    if ((param_2 === 0xf) && (DAT_0064c6b5[param_1 * 0x594] === 3)) {
      return;
    }
    if ((param_2 === 0x1f) && (DAT_0064c6b5[param_1 * 0x594] === 4)) {
      return;
    }
    if ((DAT_0064c6b5[param_1 * 0x594] !== 6) && (DAT_0064c6b5[param_1 * 0x594] !== 0)) {
      FUN_004271e8(0, DAT_00627684[param_2 * 0x10]);
      FUN_004271e8(1, DAT_0064b9a0[u8(DAT_0064c6b5[param_1 * 0x594]) * 4]);
      // DEVIATION: show auto-revolution dialog (Win32 UI)
      iVar1 = FUN_00410030(0, 0, 0);
      if (iVar1 === 1) {
        uVar2 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar2);
        FUN_00410030(0, 0, 0);
        FUN_0055c066(param_1, 0);
      }
    }
  }
  if ((DAT_00655aea & 0x100) !== 0) {
    // DEVIATION: tutorial popups for railroads, farmland, trade, seafaring, writing
    if (param_2 === 0x43) { FUN_004904c0(0, 0, 0, 0); }
    if (param_2 === 0x46) { FUN_004904c0(0, 0, 0, 0); }
    if (param_2 === 0x54) { FUN_004904c0(0, 0, 0, 0); }
    if (param_2 === 0x4b) { FUN_004904c0(0, 0, 0, 0); }
    if (param_2 === 0x58) { FUN_004904c0(0, 0, 0, 0); }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bee56 — we_love_the_king_day
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bee56(param_1) {
  let uVar1;
  let iVar2;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  uVar1 = FUN_00410070(param_1);
  FUN_0040ff60(0, uVar1);
  local_18 = -1;
  local_c = 0;
  for (local_14 = 0; local_14 < DAT_00655b18; local_14 = local_14 + 1) {
    if ((DAT_0064f394[local_14 * 0x58] !== 0) &&
       (s8(DAT_0064f348[local_14 * 0x58]) === param_1)) {
      local_8 = s8(DAT_0064f349[local_14 * 0x58]);
      iVar2 = FUN_0043d20a(local_14, 1);
      if (iVar2 !== 0) {
        local_8 = local_8 << 1;
      }
      if (local_8 === 1 || local_8 + -1 < 0) {
        local_1c = 0;
      } else {
        local_1c = Math.floor(Math.random() * local_8);
      }
      if (local_c <= local_1c + 1) {
        local_18 = local_14;
        local_c = local_1c + 1;
      }
    }
  }
  if (-1 < local_18) {
    FUN_0040ff60(1, DAT_0064f360[local_18 * 0x58]);
    if (2 < DAT_00655b02) {
      FUN_00511880(0x54, 0xff, 2, 0, 0, 0);
    }
    FUN_004c4240(0, 0x3c, 8);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004befd1 — format_enabled_item
// ═══════════════════════════════════════════════════════════════════

export function FUN_004befd1(param_1, param_2, param_3, param_4) {
  if (param_3[0] === 0) {
    FUN_0040fea0();
  } else {
    FUN_0040bbe0(0); // &DAT_0062db88
    if (param_4[0] < 4) {
      FUN_0040bbe0(0); // &DAT_0062db8c
    } else {
      param_4[0] = 0;
      FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
      FUN_0040bbb0();
    }
  }
  param_4[0] = param_4[0] + 1;
  param_3[0] = param_3[0] + 1;
  FUN_0040ff00(param_2);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bf05b — handle_tech_discovery
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bf05b(param_1, param_2, param_3, param_4, param_5) {
  let iVar1;
  let uVar2;
  let iVar3;
  let local_334;
  let local_330;
  let local_32c;
  let local_328;
  let local_324 = new Uint8Array(4);
  let local_320;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;

  local_1c = 0;
  FUN_0059db08(0x4000);
  if ((((2 < DAT_00655b02) && (param_5 === 0)) &&
      ((1 << (param_1 & 0x1f) & DAT_00655b0a) !== 0)) &&
     (((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0 && (DAT_006d1da0 !== param_1)))) {
    FUN_0046b14d(0x9b, DAT_006ad30c[DAT_006ad558[param_1] * 0x54], param_1,
                 param_2, param_3, param_4, 0, 0, 0, 0);
    FUN_004bfd9a();
    FUN_004bfdb0();
    return;
  }
  if (s16(DAT_0064c6aa, param_1 * 0x594) === param_2) {
    w16(DAT_0064c6aa, param_1 * 0x594, 0xffff);
  }
  if ((param_2 === 0x59) || (99 < param_2)) {
    DAT_0064c6b1[param_1 * 0x594] = (DAT_0064c6b1[param_1 * 0x594] + 1) & 0xFF;
  } else {
    FUN_005ae3bf(param_2, { val: 0, get 0() { return local_330; }, set 0(v) { local_330 = v; } }, local_324);
    DAT_0064c6f8[param_1 * 0x594 + local_330] =
         DAT_0064c6f8[param_1 * 0x594 + local_330] | local_324[0];
    DAT_0064c714[param_1 * 0x594 + param_2] = param_3 & 0xFF;
    if (DAT_00655b82[param_2] === 0) {
      local_1c = 1;
    }
    DAT_00655b82[param_2] = DAT_00655b82[param_2] | ((1 << (param_1 & 0x1f)) & 0xFF);
  }
  if (DAT_00655af8 !== 0) {
    DAT_0064c6b0[param_1 * 0x594] = (DAT_0064c6b0[param_1 * 0x594] + 1) & 0xFF;
    if ((DAT_00654fa8 === 0) &&
       ((((DAT_006d1da0 === param_1 && (param_3 < 0)) ||
         ((DAT_006d1da0 === param_1 && ((param_1 === param_3 && ((DAT_00655aea & 0x80000) === 0))))))
        || ((DAT_006d1da0 !== param_1 &&
            ((((((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0 ||
                (iVar1 = FUN_00453e51(DAT_006d1da0, 0x18), iVar1 !== 0)) ||
               (iVar1 = FUN_00453e51(DAT_006d1da0, 9), iVar1 !== 0)) ||
              (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 8) !== 0 ||
               (DAT_00655b07 !== 0)))) &&
             ((1 << (param_1 & 0x1f) & DAT_00655b0a) !== 0)))))))) {
      // DEVIATION: display tech discovery announcement (Win32 UI dialogs)
      FUN_00421dd0();
      FUN_0059e6ff(0x140);
      FUN_0040bbb0();
      uVar2 = FUN_00493c7d(param_1);
      FUN_0040bbe0(uVar2);
      FUN_0040fe10();
      if ((param_3 === 0) || (DAT_00628064 !== 2)) {
        FUN_0040bc10(0x5f - (param_3 === 0 ? 1 : 0));
      } else {
        FUN_0040bbe0(0); // s_erhalten
      }
      FUN_0040fe10();
      FUN_0040ff00(DAT_00627684[param_2 * 0x10]);
      if ((param_3 !== 0) && (param_1 !== param_3)) {
        FUN_0040fe10();
        if (DAT_00628064 === 2) {
          FUN_0040bbe0(0); // s_von_den
        } else {
          FUN_0040bc10(0x60);
        }
        FUN_0040fe10();
        if (param_3 < 0) {
          FUN_0040ff00(DAT_0064c5e0);
        } else {
          uVar2 = FUN_00493c7d(param_3);
          FUN_0040bbe0(uVar2);
        }
      }
      FUN_0040bbe0(0); // period
      FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
      if (DAT_00626a24 === 0) {
        FUN_0059ec88(DAT_00646cb8 + s8(DAT_0062768d[param_2 * 0x10]) * 0x3c +
                     s8(DAT_0062768c[param_2 * 0x10]) * 0xf0, 0, 0);
        // DEVIATION: EnableStackedTabs (Win32 property sheet)
      }
      local_328 = 0;
      FUN_0040bbb0();
      if ((DAT_006d1da0 !== param_1) ||
         ((1 << (DAT_006d1da0 & 0x1f) & DAT_00655b0b) === 0)) {
        for (local_334 = 0; local_334 < 0x43; local_334 = local_334 + 1) {
          if (s8(DAT_0064c48e[local_334 * 8]) === param_2) {
            FUN_004befd1(0, DAT_0064c488[local_334 * 8], { 0: local_328, get [0]() { return local_328; }, set [0](v) { local_328 = v; } },
                         { 0: 0 });
          }
        }
        for (local_320 = 0; local_320 < 0x3e; local_320 = local_320 + 1) {
          if (s8(DAT_0064b1cb[local_320 * 0x14]) === param_2) {
            FUN_004befd1(0, DAT_0064b1b8[local_320 * 0x14], { 0: local_328, get [0]() { return local_328; }, set [0](v) { local_328 = v; } },
                         { 0: 0 });
          }
        }
        if (local_328 !== 0) {
          FUN_0040fed0();
          FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
        }
      }
      FUN_0040bc80(0);
    } else if ((((DAT_00654fa8 === 0) && ((1 << (param_1 & 0x1f) & DAT_00655b0b) === 0)) &&
             (local_1c !== 0)) &&
            ((((iVar1 = FUN_0059a791(0, 2), iVar1 === 0 &&
               ((DAT_0064c6c0[DAT_006d1da0 * 4 + param_1 * 0x594] & 1) !== 0)) &&
              (((DAT_0064c6c0[DAT_006d1da0 * 4 + param_1 * 0x594] & 8) === 0 &&
               (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) === 0 &&
                (iVar1 = FUN_00453e51(DAT_006d1da0, 0x18), iVar1 === 0)))))) &&
             (iVar1 = FUN_00453e51(DAT_006d1da0, 9), iVar1 === 0)))) {
      iVar1 = FUN_00458df9(DAT_006d1da0, param_1, -1, -1);
      if (iVar1 !== 0) {
        uVar2 = FUN_00493c7d(param_1);
        FUN_0040ff60(1, uVar2);
        FUN_004271e8(2, DAT_00627684[param_2 * 0x10]);
        FUN_00421ea0(0);
      }
      FUN_0045918e();
    }
    if (((((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0) && (DAT_006d1da0 === param_1)) &&
        (param_3 !== 0)) && (DAT_00654fa8 === 0)) {
      if (((DAT_00626a24 === 0) && ((DAT_00655aea & 0x80000) !== 0)) && (param_4 === 0)) {
        FUN_00566584(param_2);
      }
      FUN_004bea84(param_1, param_2);
    }
    // Find highest tech with prereqs met
    for (local_28 = 0x35; (-1 < local_28 && (DAT_00627689[local_28 * 0x10] === 0));
        local_28 = s8(DAT_0062768e[local_28 * 0x10])) {
    }
    if ((param_2 === 0x23) || (local_28 === param_2)) {
      local_18 = 0;
      for (local_32c = 0; local_32c < DAT_00655b18; local_32c = local_32c + 1) {
        if ((DAT_0064f394[local_32c * 0x58] !== 0) &&
           (s8(DAT_0064f348[local_32c * 0x58]) === (param_1 & 0xff))) {
          iVar1 = FUN_0043d20a(local_32c, 2);
          if (iVar1 !== 0) {
            local_18 = local_18 + 1;
          }
          FUN_0043d289(local_32c, 2, 0);
        }
      }
      if (local_18 !== 0) {
        local_18 = DAT_0064c49c * DAT_0064bccc * local_18;
        if ((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0) {
          FUN_004271e8(0, DAT_00627684[param_2 * 0x10]);
          FUN_00421da0(0, local_18);
          FUN_0043c9d0(0);
          if (DAT_00626a24 === 0) {
            FUN_0059ec88(DAT_00646cb8 + s8(DAT_0062768d[param_2 * 0x10]) * 0x3c +
                         s8(DAT_0062768c[param_2 * 0x10]) * 0xf0, 0, 0);
            FUN_0059ec88(0, 0, 0);
            // DEVIATION: EnableStackedTabs (Win32)
          }
          FUN_0040bc80(0);
        }
        s32_write(DAT_0064c6a2, param_1 * 0x594,
             s32(DAT_0064c6a2, param_1 * 0x594) + local_18);
        if (DAT_006d1da0 === param_1) {
          FUN_00569363(1);
        }
      }
    }
    if (local_1c !== 0) {
      if (((param_2 === 0x3c) &&
          (w16(DAT_0064c6a0, param_1 * 0x594,
                s16(DAT_0064c6a0, param_1 * 0x594) | 0x20), DAT_00654fa8 === 0)) &&
         ((DAT_006d1da0 !== param_1 || (param_3 !== 0)))) {
        FUN_004bee56(param_1);
      }
      DAT_00655b1e[param_2] = DAT_00655b1e[param_2] | (param_1 & 0xFF);
      if (DAT_00654fa8 === 0) {
        for (local_24 = 0; local_24 < 0x1c; local_24 = local_24 + 1) {
          if (((s8(DAT_0064ba28[local_24]) === param_2) &&
              (local_32c = s16(DAT_00655be6, local_24 * 2), -1 < local_32c)) &&
             ((DAT_00655b0b & (1 << (DAT_0064f348[local_32c * 0x58] & 0x1f))) !== 0)) {
            iVar1 = local_24 + 0x27;
            FUN_004271e8(0, DAT_00627684[param_2 * 0x10]);
            FUN_004271e8(1, DAT_0064c488[iVar1 * 8]);
            FUN_0043c9d0(0);
            if (DAT_00626a24 === 0) {
              FUN_0059ec88(DAT_00646cb8 + s8(DAT_0062768d[param_2 * 0x10]) * 0x3c +
                           s8(DAT_0062768c[param_2 * 0x10]) * 0xf0, 0, 0);
              FUN_0059ec88(0, 0, 0);
              // DEVIATION: EnableStackedTabs (Win32)
            }
            if (2 < DAT_00655b02) {
              FUN_00511880(0x4d, 0xff, 2, 0, param_2, iVar1);
            }
            FUN_0040bc80(0);
          }
        }
      }
    }
    FUN_004be6ba(param_1);
    iVar1 = FUN_00453edf(4);
    if ((0 < iVar1) && (iVar3 = _FUN_004bd9f0(iVar1, param_2), iVar3 === 0)) {
      local_18 = 0;
      for (local_20 = 1; local_20 < 8; local_20 = local_20 + 1) {
        iVar3 = _FUN_004bd9f0(local_20, param_2);
        if (iVar3 !== 0) {
          local_18 = local_18 + 1;
        }
      }
      if (1 < local_18) {
        FUN_004bf05b(iVar1, param_2, -2, 0, 0);
      }
    }
    if (2 < DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
    }
    FUN_004bfd9a();
    FUN_004bfdb0();
    return;
  }
  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
  }
  FUN_004bfd9a();
  FUN_004bfdb0();
  return;
}

// FUN_004bfd9a — tech_discovery_cleanup
export function FUN_004bfd9a() { FUN_0059df8a(); return; }
// FUN_004bfdb0 — tech_discovery_seh_cleanup
export function FUN_004bfdb0() { return; }


// ═══════════════════════════════════════════════════════════════════
// FUN_004bfdbe — can_research_tech
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bfdbe(param_1, param_2) {
  let iVar1;

  if (((DAT_00627689[param_2 * 0x10] !== 0) &&
       (iVar1 = _FUN_004bd9f0(param_1, param_2), iVar1 === 0)) &&
      (iVar1 = _FUN_004bd9f0(param_1, s8(DAT_0062768e[param_2 * 0x10])), iVar1 !== 0) &&
      (iVar1 = _FUN_004bd9f0(param_1, s8(DAT_0062768f[param_2 * 0x10])), iVar1 !== 0)) {
    return 1;
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bfe5a — can_build_unit_type
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bfe5a(param_1, param_2, param_3) {
  let cVar1;
  let iVar2;
  let local_14;
  let local_10;

  local_14 = 0;
  cVar1 = s8(DAT_0064b1cb[param_3 * 0x14]);

  // Guard 1: prereq tech check
  let guard1 = (-2 < cVar1) &&
    ((cVar1 < 0) || (iVar2 = _FUN_004bd9f0(param_1, cVar1), iVar2 !== 0));

  // Guard 2: obsolete tech check
  let guard2 = (s8(DAT_0064b1c0[param_3 * 0x14]) < 0) ||
    (iVar2 = _FUN_004bd9f0(param_1, s8(DAT_0064b1c0[param_3 * 0x14])), iVar2 === 0);

  // Guard 3: role-specific checks
  let guard3a = (DAT_0064b1ca[param_3 * 0x14] !== 1 ||
    (DAT_0064b251 <= s8(DAT_0064b1c5[param_3 * 0x14]))) ||
    (iVar2 = _FUN_004bd9f0(param_1, 0x23), iVar2 === 0);

  let guard3b = (DAT_0064b1ca[param_3 * 0x14] !== 0 ||
    (s8(DAT_0064b1c2[param_3 * 0x14]) !== DAT_0064bcc8 * 2)) ||
    ((DAT_0064b340 < s8(DAT_0064b1c4[param_3 * 0x14])) ||
     ((DAT_0064b341 <= s8(DAT_0064b1c5[param_3 * 0x14])) ||
      (iVar2 = _FUN_004bd9f0(param_1, DAT_0064b347), iVar2 === 0)));

  // Guard 4: hp limit / strategic resource checks
  let guard4 = (s8(DAT_0064b1c4[param_3 * 0x14]) < 99) ||
    ((DAT_00655c14 !== -1) && (iVar2 = _FUN_004bd9f0(param_1, 0x3a), iVar2 !== 0));

  // Guard 5: sea unit city requirement
  let guard5 = (param_2 < 0 || (DAT_0064b1c1[param_3 * 0x14] !== 2)) ||
    (((DAT_0064f346[param_2 * 0x58] & 0x20) !== 0) &&
     ((DAT_0064f344[param_2 * 0x58] & 0x80) !== 0));

  if (guard1 && guard2 && guard3a && guard3b && guard4 && guard5) {
    if (((1 << (param_1 & 0x1f) & DAT_00655b0b) === 0) &&
       (((DAT_0064bcc8 < s8(DAT_0064b1c2[param_3 * 0x14])) &&
        (DAT_0064b1c1[param_3 * 0x14] === 0)))) {
      for (local_10 = 0; local_10 < 0x3e; local_10 = local_10 + 1) {
        if (((((local_10 !== param_3) &&
              (DAT_0064b1ca[local_10 * 0x14] === DAT_0064b1ca[param_3 * 0x14])) &&
             (DAT_0064b1c1[local_10 * 0x14] === DAT_0064b1c1[param_3 * 0x14])) &&
            (((DAT_0064bcc8 < s8(DAT_0064b1c2[local_10 * 0x14])) &&
             (iVar2 = _FUN_004bd9f0(param_1, s8(DAT_0064b1cb[local_10 * 0x14])),
             iVar2 !== 0)))) &&
           (((s8(DAT_0064b1c4[param_3 * 0x14]) <= s8(DAT_0064b1c4[local_10 * 0x14])) &&
            (s8(DAT_0064b1c5[param_3 * 0x14]) <= s8(DAT_0064b1c5[local_10 * 0x14]))))) {
          if (DAT_0064b1c4[local_10 * 0x14] !== DAT_0064b1c4[param_3 * 0x14]) {
            return 0;
          }
          if (DAT_0064b1c5[local_10 * 0x14] !== DAT_0064b1c5[param_3 * 0x14]) {
            return 0;
          }
        }
      }
    }
    if ((param_3 !== 8) || (DAT_0064c6b5[param_1 * 0x594] === 4)) {
      local_14 = 1;
    }
  }
  return local_14;
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
// These are functions called from this block but defined elsewhere.
// They are stubbed as no-ops. Wire them up when integrating.
// ═══════════════════════════════════════════════════════════════════

function FUN_005c62ee() { return 0; }  // get_current_window
function FUN_005c6303(p1) { }  // set_focus_window
function FUN_005d7c00() { }  // open_chatlog
function FUN_005d7c6e() { }  // close_chatlog
function FUN_005d84f6() { }  // widget_read_text_impl
function FUN_005d2f7e(p1, p2) { }  // send_msg
function FUN_005bc713(p1, p2) { }  // set_window_size
function FUN_005c90b0(p1) { }  // focus_window_hwnd
function FUN_005dae6b(p1, p2, p3, p4) { }  // assert / debug_log
function FUN_005dce4f(p1) { return 0; }  // global_alloc
function FUN_005dce29(p1) { }  // global_lock
function FUN_005ae3bf(p1, p2, p3) { }  // tech_id_to_byte_and_mask
function FUN_005ae052(p1) { return p1; }  // wrap_x
function FUN_005ae006(p1) { return 0; }  // popcount / count_bits
function FUN_005b89e4(p1, p2) { return 0; }  // is_ocean
function FUN_005b8a81(p1, p2) { return 0; }  // get_continent_id
function FUN_004087c0(p1, p2) { return 1; }  // is_tile_valid
function FUN_0040894c() { }  // yield_processor
function FUN_005bb574() { }  // invalidate_map
function FUN_005bb4ae(p1, p2, p3, p4, p5, p6, p7, p8) { }  // set_window_pos
function FUN_005f22d0(p1, p2) { }  // strcpy
function FUN_005f22e0(p1, p2) { }  // strcat
function FUN_005f35f0() { }  // init_subsystem
function FUN_005d6a2c() { }  // reset_subsystem
function FUN_005bd630() { }  // create_surface
function FUN_005bd915() { }  // destroy_surface
function FUN_005c64da() { }  // init_window_manager
function FUN_005c656b() { }  // destroy_window_manager
function FUN_005dd010() { }  // create_draw_context
function FUN_005dd1a0() { }  // destroy_draw_context
function FUN_005dd2e3(p1, p2, p3, p4, p5) { }  // video_init
function FUN_005dd377(p1) { return 0; }  // video_open
function FUN_005dd3c2() { }  // video_close
function FUN_005dd561(p1) { }  // video_set_target
function FUN_005cde4d() { }  // release_cstring
function FUN_005cedad(p1, p2, p3, p4, p5, p6) { }  // create_bitmap
function FUN_005cef31(p1, p2, p3, p4) { }  // blit_bitmap
function FUN_005cdf50() { }  // destroy_bitmap
function FUN_005cd775(p1, p2) { }  // set_scale
function FUN_005c0034() { }  // begin_paint
function FUN_005c0073(p1) { }  // end_paint
function FUN_005c0333(p1, p2) { }  // select_palette
function FUN_005c041f(p1) { }  // set_draw_mode
function FUN_005c19ad(p1) { }  // set_text_color
function FUN_005c0f57(p1, p2, p3, p4, p5) { }  // draw_text
function FUN_005c61b0() { }  // wait_for_input
function FUN_005d268e(p1) { }  // load_font
function FUN_005bf5e1(p1, p2, p3, p4) { return 0; }  // load_gif_resource
function FUN_005bb6c7(p1, p2) { }  // resize_surface
function FUN_005d8236(p1) { }  // load_image
function FUN_0043c4c0(p1, p2, p3) { }  // static_init_class
function FUN_0043c460(p1, p2) { }  // static_init_class_2
function FUN_0043c520() { }  // static_dtor_class
function FUN_0044cba0() { }  // base_window_dtor
function FUN_0043d20a(p1, p2) { return 0; }  // city_has_building
function FUN_00453e51(p1, p2) { return 0; }  // civ_has_wonder_effect
function FUN_00453e18(p1) { return -1; }  // wonder_city_index
function FUN_004eb4ed(p1, p2) { }  // recalc_city_production
function FUN_00493c7d(p1) { return ""; }  // get_civ_adjective
function FUN_00493ba6(p1) { return ""; }  // get_civ_leader_name
function FUN_00493b10(p1) { return ""; }  // get_civ_nation_name
function FUN_0046b14d(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) { }  // send_network_message
function FUN_00410030(p1, p2, p3) { return 0; }  // show_popup_dialog
function FUN_00410070(p1) { return ""; }  // get_civ_name
function FUN_0056d289(p1, p2, p3, p4, p5, p6) { }  // blit_city_sprite
function FUN_00472cf0(p1, p2) { return 0; }  // calc_sprite_height
function FUN_00497ff3(p1) { }  // init_data_tables
function FUN_004518d0() { }  // dismiss_property_sheet
function FUN_004503d0() { }  // update_display
function FUN_00451900() { }  // close_property_sheet
function FUN_00484d52() { }  // refresh_main_view
function FUN_00408460() { }  // update_window
function FUN_004085f0() { }  // invalidate_window
function FUN_004083b0() { }  // destroy_window
function FUN_00408230(p1) { }  // set_timer
function FUN_00408330(p1) { }  // set_message_handler
function FUN_00408130(p1) { }  // show_window
function FUN_0040bbb0() { }  // clear_text_buffer
function FUN_0040bbe0(p1) { }  // append_text
function FUN_0040bc10(p1) { }  // append_text_id
function FUN_0040bc80(p1) { }  // end_text_display
function FUN_0040fe10() { }  // append_newline
function FUN_0040fea0() { }  // append_period
function FUN_0040fed0() { }  // append_comma
function FUN_0040ff00(p1) { }  // append_name
function FUN_0040ff60(p1, p2) { }  // set_text_param
function FUN_0040fdb0() { }  // clear_rect
function FUN_0040ef70() { return 16; }  // get_font_height
function FUN_0040efd0(p1) { return 0; }  // get_text_width
function FUN_00407f90(p1, p2) { return 0; }  // get_rect_height
function FUN_00407fc0(p1, p2, p3) { return 0; }  // get_rect_width
function FUN_004080c0() { return 640; }  // get_screen_width
function FUN_004080f0(p1) { }  // get_rect
function FUN_00414bb0() { return 480; }  // get_screen_height
function FUN_0040f3e0() { return 0; }  // create_button
function FUN_0040f510() { }  // destroy_control
function FUN_0040f570() { }  // destroy_button
function FUN_0040f610() { }  // destroy_editbox
function FUN_0040f680(p1, p2, p3, p4) { }  // create_button_in_rect
function FUN_0040f730(p1, p2, p3, p4) { }  // setup_editbox
function FUN_0040f880(p1) { }  // set_button_handler
function FUN_0040f930() { }  // destroy_checkbox
function FUN_0040fbb0() { }  // destroy_dropdown
function FUN_00418870() { }  // destroy_listbox
function FUN_004187a0() { return 0; }  // create_listbox
function FUN_00418a00(p1) { }  // set_edit_handler
function FUN_00418a30(p1) { }  // set_edit_text
function FUN_00418a70(p1) { }  // get_edit_text
function FUN_004189c0(p1) { }  // set_edit_limit
function FUN_00419b80() { }  // update_controls
function FUN_0043c5f0() { }  // hide_control
function FUN_00453c40() { }  // show_control_a
function FUN_00453c80() { }  // show_control_b
function FUN_00453aa0(p1) { }  // destroy_panel
function FUN_004519b0(p1, p2, p3) { }  // create_tab_page
function FUN_00451930() { return 0; }  // create_panel
function FUN_00451a60(p1) { }  // set_panel_handler
function FUN_00450340() { }  // flush_resources
function FUN_00450390(p1) { }  // restore_surface
function FUN_00450400() { }  // present_surface
function FUN_004271e8(p1, p2) { }  // set_dialog_param
function FUN_004442a0(p1, p2, p3) { }  // show_upgrade_dialog
function FUN_00511880(p1, p2, p3, p4, p5, p6) { }  // send_advisor_message
function FUN_00526ca0(p1, p2) { }  // set_scrollbar_range
function FUN_00552ed2() { }  // flip_surfaces
function FUN_005520fa(p1) { }  // blit_to_back
function FUN_00552112() { }  // present_back
function FUN_0055339f() { }  // init_gfx_subsystem
function FUN_005534bc(p1, p2, p3, p4, p5, p6, p7, p8, p9) { }  // set_palette_entry
function FUN_0046e020(p1, p2, p3, p4) { }  // play_sound
function FUN_0046e6a9() { }  // stop_music
function FUN_0046e6c8() { }  // resume_music
function FUN_0046efd6() { }  // start_wonder_music
function FUN_0046f06f() { }  // stop_wonder_music
function FUN_004904c0(p1, p2, p3, p4) { }  // show_tutorial
function FUN_004923f0(p1, p2) { }  // handle_scroll_cmd
function FUN_00492a80() { return 0; }  // get_file_size
function FUN_00492ab0() { return 0; }  // get_cursor_pos
function FUN_00497c90(p1) { return 0; }  // get_system_palette
function FUN_00497d00(p1) { }  // set_font_size
function FUN_0059a2e6(p1) { }  // load_music_track
function FUN_0059a791(p1, p2) { return 0; }  // check_game_option
function FUN_0059db08(p1) { }  // alloc_temp_buffer
function FUN_0059df8a() { }  // free_temp_buffer
function FUN_0059e18b(p1, p2, p3, p4, p5) { }  // show_multiline_dialog
function FUN_0059e6ff(p1) { }  // set_dialog_width
function FUN_0059ec88(p1, p2, p3) { }  // show_icon_in_dialog
function FUN_005a9780(p1) { }  // update_parley_bg
function FUN_005a99fc(p1, p2, p3, p4) { }  // paint_border
function FUN_005a9b5d(p1, p2, p3, p4, p5) { }  // blit_border_image
function FUN_004a6980() { return 0; }  // get_tab_height
function FUN_004a733d() { }  // init_property_tabs
function FUN_004aef20(p1) { }  // get_civ2_path
function FUN_004af174(p1, p2) { }  // append_extension
function FUN_004af1d5(p1, p2) { }  // append_number
function FUN_00564713(p1) { return 0; }  // file_exists
function FUN_0043c3f0(p1) { }  // load_resource_dll
function FUN_0043c840(p1, p2) { }  // build_path
function FUN_0043c9d0(p1) { }  // show_info_dialog
function FUN_00421c30() { }  // close_file
function FUN_00421c60(p1, p2) { }  // write_file
function FUN_00421da0(p1, p2) { }  // format_number
function FUN_00421dd0() { }  // begin_dialog
function FUN_00421ea0(p1) { }  // show_message
function FUN_00421f10(p1) { }  // format_year
function FUN_00428b0c(p1) { return ""; }  // get_string_resource
function FUN_004679ab(p1) { return 0; }  // get_leader_face_index
function FUN_00458df9(p1, p2, p3, p4) { return 0; }  // check_steal_tech
function FUN_0045918e() { }  // end_steal_tech
function FUN_00467750(p1, p2, p3) { }  // break_treaty
function FUN_004dd285(p1) { }  // send_diplomat_msg
function FUN_0055c066(p1, p2) { }  // start_revolution
function FUN_00566584(p1) { }  // show_civilopedia
function FUN_00569363(p1) { }  // update_treasury_display
function FUN_00589ef8(p1, p2, p3, p4, p5) { }  // show_error
function FUN_004c4240(p1, p2, p3) { }  // show_celebration_dialog
function FUN_004f00f0(p1, p2) { return 0; }  // get_building_maintenance
function FUN_004ea1f6(p1, p2, p3, p4) { }  // calc_city_trade
function FUN_004bb370_impl(p1, p2) { }  // read_file_block
function FUN_0046aad0(p1) { return null; }  // lock_global_memory
function FUN_0046ab00(p1) { }  // unlock_global_memory
function FUN_0046aaa0(p1) { }  // free_global_memory
function FUN_00408830(p1, p2) { }  // init_tile_scan
function FUN_004b76d5_impl() { return 1; }  // close_parley
function FUN_00421bb0() { return 0; }  // get_tick_count
function FUN_005b8416() { }  // reset_tile_cache
function FUN_0047cea6(p1, p2) { }  // update_unit_at
function FUN_0043d289(p1, p2, p3) { }  // city_set_building
function FUN_00453edf(p1) { return -1; }  // get_wonder_holder
function s32_write(arr, off, val) { w32(arr, off, val); }  // helper
function FUN_005b7fe0() { }  // recalc_map_data
function FUN_0052e971() { }  // update_advisor_display
function FUN_0052dd73() { }  // advisor_button_handler
function FUN_005dfb61(p1) { return 0; }  // decompress_buffer
function FUN_005dfd8f(p1, p2) { return 1; }  // finalize_buffer

// Win32 API stubs (no-ops)
function GetPrivateProfileIntA(p1, p2, p3, p4) { return -1; }
function WritePrivateProfileStringA(p1, p2, p3, p4) { }
function SetRect(p1, p2, p3, p4, p5) { }
function OffsetRect(p1, p2, p3) { }
function InflateRect(p1, p2, p3) { }
function MessageBoxA(p1, p2, p3, p4) { return 0; }
function GlobalCompact(p1) { return 0; }
function Realloc(p1) { return 0; }
