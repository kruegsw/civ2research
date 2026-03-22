// ═══════════════════════════════════════════════════════════════════
// block_004B0000.js — Mechanical transpilation of block_004B0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004B0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004B0000.c
// ═══════════════════════════════════════════════════════════════════


// Re-export FUN_004bd9f0 (already defined in fn_utils.js)
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0 as _FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_004080c0, FUN_004080f0, FUN_00408130, FUN_00408230 } from './block_00400000.js';
import { FUN_00408330, FUN_004083b0, FUN_00408460, FUN_004085f0, FUN_00408830, FUN_0040894c } from './block_00400000.js';
import { FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80, FUN_0040ef70, FUN_0040efd0 } from './block_00400000.js';
import { FUN_0040f3e0, FUN_0040f510, FUN_0040f570, FUN_0040f610, FUN_0040f680, FUN_0040f730 } from './block_00400000.js';
import { FUN_0040f880, FUN_0040f930, FUN_0040fbb0, FUN_0040fdb0, FUN_0040fe10, FUN_0040fea0 } from './block_00400000.js';
import { FUN_0040fed0, FUN_0040ff00, FUN_0040ff60 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00414bb0, FUN_004187a0, FUN_00418870, FUN_004189c0 } from './block_00410000.js';
import { FUN_00418a00, FUN_00418a30, FUN_00418a70, FUN_00419b80 } from './block_00410000.js';
import { FUN_00421c30, FUN_00421c60, FUN_00421da0, FUN_00421dd0, FUN_00421ea0, FUN_00421f10 } from './block_00420000.js';
import { FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_0043c3f0, FUN_0043c460, FUN_0043c4c0, FUN_0043c5f0 } from './block_00430000.js';
import { FUN_004442a0, FUN_0044cba0 } from './block_00440000.js';
import { FUN_00450340, FUN_00450390, FUN_004503d0, FUN_00450400, FUN_004518d0, FUN_00451900 } from './block_00450000.js';
import { FUN_00451930, FUN_004519b0, FUN_00451a60, FUN_00453aa0, FUN_00453c40, FUN_00453c80 } from './block_00450000.js';
import { FUN_00453e18, FUN_00453e51, FUN_00458df9, FUN_0045918e } from './block_00450000.js';
import { FUN_00467750, FUN_004679ab, FUN_0046aaa0, FUN_0046aad0, FUN_0046ab00, FUN_0046b14d } from './block_00460000.js';
import { FUN_0046e020, FUN_0046e6a9, FUN_0046e6c8, FUN_0046efd6, FUN_0046f06f } from './block_00460000.js';
import { FUN_00472cf0 } from './block_00470000.js';
import { FUN_00484d52 } from './block_00480000.js';
import { FUN_004904c0, FUN_004923f0, FUN_00492a80, FUN_00492ab0, FUN_00493b10, FUN_00493ba6 } from './block_00490000.js';
import { FUN_00493c7d, FUN_00497c90, FUN_00497d00, FUN_00497ff3 } from './block_00490000.js';
import { FUN_004a6980, FUN_004a733d, FUN_004aef20, FUN_004af174, FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004c4240 } from './block_004C0000.js';
import { FUN_004dd285 } from './block_004D0000.js';
import { FUN_004ea1f6, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004f00f0 } from './block_004F0000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_00526ca0, FUN_0052dd73, FUN_0052e971 } from './block_00520000.js';
import { FUN_005520fa, FUN_00552112, FUN_00552ed2, FUN_0055339f, FUN_005534bc, FUN_0055c066 } from './block_00550000.js';
import { FUN_00564713, FUN_00566584, FUN_00569363, FUN_0056d289 } from './block_00560000.js';
import { FUN_00589ef8 } from './block_00580000.js';
import { FUN_0059a2e6, FUN_0059a791, FUN_0059db08, FUN_0059df8a, FUN_0059e18b, FUN_0059e6ff } from './block_00590000.js';
import { FUN_0059ec88 } from './block_00590000.js';
import { FUN_005a9780, FUN_005a99fc, FUN_005a9b5d, FUN_005ae006, FUN_005ae3bf } from './block_005A0000.js';
import { FUN_005b7fe0, FUN_005b8a81, FUN_005bb4ae, FUN_005bb574, FUN_005bb6c7, FUN_005bc713 } from './block_005B0000.js';
import { FUN_005bd630, FUN_005bd915, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0034, FUN_005c0073, FUN_005c0333, FUN_005c041f, FUN_005c0f57, FUN_005c19ad } from './block_005C0000.js';
import { FUN_005c61b0, FUN_005c62ee, FUN_005c6303, FUN_005c64da, FUN_005c656b, FUN_005c90b0 } from './block_005C0000.js';
import { FUN_005cd775, FUN_005cde4d, FUN_005cdf50, FUN_005cedad, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d268e, FUN_005d2f7e, FUN_005d6a2c, FUN_005d7c00, FUN_005d7c6e, FUN_005d8236 } from './block_005D0000.js';
import { FUN_005d84f6, FUN_005dae6b, FUN_005dce29, FUN_005dce4f, FUN_005dd010, FUN_005dd1a0 } from './block_005D0000.js';
import { FUN_005dd2e3, FUN_005dd377, FUN_005dd3c2, FUN_005dd561, FUN_005dfb61, FUN_005dfd8f } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_005f35f0 } from './block_00600000.js';

export { _FUN_004bd9f0 as FUN_004bd9f0 };


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════



// Diff engine state variables


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
  // Stub: high-res flag at offset 0x154
  local_2c = -4; // 0xfffffffc
  local_c = 0;
  local_30 = -1;
  for (local_28 = 0; local_28 < G.DAT_00655b18; local_28 = local_28 + 1) {
    if ((G.DAT_0064f394[local_28 * 0x58] !== 0) &&
       (s8(G.DAT_0064f348[local_28 * 0x58]) === param_1)) {
      local_8 = s8(G.DAT_0064f349[local_28 * 0x58]);
      iVar1 = FUN_0043d20a(local_28, 1);
      if (iVar1 !== 0) {
        local_8 = local_8 + 200;
      }
      if (G.DAT_0064f379[local_28 * 0x58] === 0xFF) { // -1 as unsigned byte
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
    local_18 = 0x18;
    if ((param_2 & 1) !== 0) {
      local_20 = param_3 + local_18 + 2;
    }
    iVar1 = FUN_00472cf0(0x30, local_2c);
    FUN_0056d289(G.DAT_0067a7a8, local_30, 0, local_20, param_4 - ((iVar1 - param_5) / 2) | 0, local_2c);
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

  if (param_1 === G.DAT_0062d0a4) {
    local_c = -2;
  } else if (param_1 === G.DAT_0062d0a8) {
    local_c = -1;
  } else {
    local_c = -3;
    for (local_8 = 0; (local_c < 0 && (local_8 < 100)); local_8 = local_8 + 1) {
      if (param_1 === G.DAT_00627680[local_8 * 0x10]) {
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

  if (param_1.toLowerCase() === G.DAT_0062d0ac.toLowerCase()) {
    local_c = -1;
  } else if (param_1.toLowerCase() === G.DAT_0062d0b0.toLowerCase()) {
    local_c = -2;
  } else {
    local_c = -3;
    for (local_8 = 0; (local_c < 0 && (local_8 < 0xb)); local_8 = local_8 + 1) {
      // Note: original uses _strcmp (case sensitive) for terrain names
      if (param_1 === G.DAT_00627680[local_8 * 0x18]) {
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

  if (G.DAT_0062d0bc !== null) {
    FUN_004b0a0a();
  }
  G.DAT_0067a400 = 0;
  for (local_8 = 0; local_8 < 0x17; local_8 = local_8 + 1) {
    G.DAT_0067a400 = G.DAT_0067a400 + G.DAT_0067a414[local_8 * 6];
  }
  G.DAT_0062d0bc = new Uint8Array(G.DAT_0067a400);
  if (G.DAT_0062d0bc === null) {
    uVar2 = 0;
  } else {
    G.DAT_0062d0bc.fill(0);
    sVar1 = G.DAT_0067a588;
    if (G.DAT_006ad2f7 !== 0) {
      sVar1 = G.DAT_0067a400;
    }
    G.DAT_0067a408 = sVar1;
    FUN_004b0a41();
    uVar2 = 1;
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0a0a — diff_engine_free_mirror
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0a0a() {
  G.DAT_0062d0bc = null;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0a41 — diff_engine_copy_sections
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0a41() {
  let local_c;

  // Stub: copies game state sections into mirror buffer
  G.DAT_00679fe8 = G.DAT_0062d0bc;
  G.DAT_0067a404 = 0;
  G.DAT_00679fec = 0;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0ad0 — diff_engine_invert_mirror
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0ad0() {
  let uVar1;
  let local_c;

  FUN_004b0a41();
  G.DAT_00679fe8 = G.DAT_0062d0bc;
  // Stub: inverts all mirror data dword-by-dword
  G.DAT_00679fe8 = G.DAT_0062d0bc;
  G.DAT_0067a404 = 0;
  G.DAT_00679fec = 0;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b0b53 — diff_engine_scan_and_send
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b0b53(param_1, param_2, param_3, param_4, param_5) {
  let local_4c;

  if (G.DAT_00655b02 < 3) {
    local_4c = 0;
  } else if ((param_4 === 0) && (G.DAT_006ad308 === 1)) {
    local_4c = 0;
  } else {
    // Stub: core multiplayer diff engine — scans, compresses, and sends state diffs
    local_4c = 0;
  }
  return local_4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b12b3 — diff_engine_check_section_changed
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b12b3(param_1) {
  // Stub: checks if a game state section differs from the mirror
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1396 — diff_engine_checksum
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1396(param_1, param_2) {
  let local_8 = 0;
  // Stub: computes additive checksum over a data buffer
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
      local_8 = G.DAT_00655b16 * 0x20 + local_8;
    } else if (local_c === 6) {
      local_8 = G.DAT_00655b18 * 0x58 + local_8;
    } else {
      local_8 = local_8 + G.DAT_0067a410[local_c * 0x18];
    }
  }
  return local_8 + 0x1e0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b153c — diff_engine_serialize_game
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b153c(param_1) {
  // Stub: serializes full game state with checksums into a buffer
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b187f — diff_engine_append_data
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b187f(param_1, param_2, param_3, param_4, param_5) {
  // Stub: appends param_5 bytes from param_4 into buffer at param_1+*param_2
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b18e1 — diff_engine_serialize_partial
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b18e1(param_1) {
  // Stub: serializes partial game state (2 sections) with checksums
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1a15 — diff_engine_serialize_full_compressed
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1a15(param_1) {
  // Stub: serializes all sections then RLE-compresses the result
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1c11 — diff_engine_serialize_changed_only
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1c11(param_1) {
  // Stub: serializes only sections whose checksum has changed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b1de3 — diff_engine_deserialize
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b1de3(param_1, param_2) {
  // Stub: deserializes game state from a buffer, optionally decompressing
  return;
}


// ═══════════════════════════════════════════════════════════════════
// parse_save_block — parse_save_block
// ═══════════════════════════════════════════════════════════════════

export function parse_save_block(param_1, param_2) {
  // Stub: parses a save data block, validates block types, and reinitializes diff engine
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b2123 — diff_engine_read_section_node
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b2123(param_1) {
  // Stub: reads a section header+data node from serialized data
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b21d7 — diff_engine_init_sections
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b21d7() {
  let local_c;
  let local_8;

  FUN_00497ff3(G.DAT_0064b984);
  FUN_004b3080(G.DAT_0062d0b8, 4, 0);
  FUN_004b3080(G.DAT_00655ae8, 0x14c, 1);
  FUN_004b3080(G.DAT_0064bcf8, 0x790, 2);
  FUN_004b3080(G.DAT_0064c6a0, 0x2ca0, 3);
  FUN_004b3080(G.DAT_00666130, 0x400, 4);
  FUN_004b3080(G.DAT_006560f0, 0x10000, 5);
  FUN_004b3080(G.DAT_0064f340, 0x5800, 6);
  FUN_004b3080(G.DAT_006554f8, 0x3f0, 7);
  FUN_004b3080(G.DAT_00655c38, 0x4b0, 8);
  FUN_004b3080(G.DAT_0064bc60, 100, 9);
  FUN_004b3080(G.DAT_00655128, 0x154, 10);
  FUN_004b3080(G.DAT_00654b40, 0x494, 0xb);
  FUN_004b3080(G.DAT_006d1160, 0x10, 0xc);
  FUN_004b3080(G.DAT_006365e0, G.DAT_006d116a * G.DAT_006d116c, 0xd);
  FUN_004b3080(G.DAT_006365e4, G.DAT_006d116a * G.DAT_006d116c, 0xe);
  FUN_004b3080(G.DAT_006365c4, G.DAT_006d1164, 0xf);
  FUN_004b3080(G.DAT_006365c8, G.DAT_006d1164, 0x10);
  FUN_004b3080(G.DAT_006365cc, G.DAT_006d1164, 0x11);
  FUN_004b3080(G.DAT_006365d0, G.DAT_006d1164, 0x12);
  FUN_004b3080(G.DAT_006365d4, G.DAT_006d1164, 0x13);
  FUN_004b3080(G.DAT_006365d8, G.DAT_006d1164, 0x14);
  FUN_004b3080(G.DAT_006365dc, G.DAT_006d1164, 0x15);
  FUN_004b3080(G.DAT_00636598, G.DAT_006d1164 * 6, 0x16);
  FUN_004b3080(G.DAT_0064b98c, 50000, 0x17);
  local_c = 0;
  for (local_8 = 0; local_8 < 0x17; local_8 = local_8 + 1) {
    G.DAT_0067a420[local_8 * 0x18] = local_c;
    local_c = local_c + G.DAT_0067a414[local_8 * 6];
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b24a2 — rle_calc_decoded_size
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b24a2(param_1) {
  // Stub: calculates decoded size of an RLE-encoded buffer
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b251a — rle_decode
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b251a(param_1) {
  // Stub: decodes RLE-compressed data
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b263e — rle_encode
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b263e(param_1) {
  // Stub: RLE-encodes data, returns 1 on success, 0 on buffer overflow
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b3080 — diff_engine_register_section
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b3080(param_1, param_2, param_3) {
  // Stub: registers a game state section with the diff engine (uses ECX as this pointer)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b3110 — continent_set_adjacency_bit
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b3110(param_1, param_2) {
  let local_c;
  let local_8 = new Uint8Array(4);

  FUN_005ae3bf(param_2, { val: 0 }, local_8);
  G.DAT_00666137[param_1 * 0x10 + local_c] = G.DAT_00666137[param_1 * 0x10 + local_c] | local_8[0];
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
      G.DAT_00666137[local_8 + local_18 * 0x10] = 0;
    }
  }
  for (local_14 = 0; local_14 < G.DAT_006d1162; local_14 = local_14 + 1) {
    for (local_10 = ((local_14 & 1) !== 0) ? 1 : 0; local_10 < G.DAT_006d1160; local_10 = local_10 + 2) {
      iVar1 = FUN_005b89e4(local_10, local_14);
      if (iVar1 === 0) {
        uVar2 = FUN_005b8a81(local_10, local_14);
        for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
          uVar3 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + local_10);
          iVar1 = s8(G.DAT_00628360[local_8]) + local_14;
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
  // Stub: flood-fill assigns continent/ocean body IDs to all tiles
  return 0;
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
export function FUN_004b4036() { FUN_004b4108(G.DAT_0067a7a8); }  // Stub: parley window 1 init
// FUN_004b405b — parley1_atexit
export function FUN_004b405b() { /* _atexit stub */ }
// FUN_004b4078 — parley1_dtor
export function FUN_004b4078() { FUN_004b4593(); }

// FUN_004b4092 — static_init_parley2
export function FUN_004b4092() { FUN_004b40ac(); FUN_004b40d1(); }
// FUN_004b40ac — parley2_construct
export function FUN_004b40ac() { FUN_004b4108(0); }  // Stub: parley window 2 init
// FUN_004b40d1 — parley2_atexit
export function FUN_004b40d1() { /* _atexit stub */ }
// FUN_004b40ee — parley2_dtor
export function FUN_004b40ee() { FUN_004b4593(); }


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4108 — parleywin_construct
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4108(param_1) {
  // Stub: constructs the parley (diplomacy) window object, initializes many fields
  return null;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4593 — parleywin_destruct
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4593() {
  // Stub: destructs the parley window, frees chat buffers, closes log file
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
  // Stub: opens the parley (diplomacy) window with mode param_1 (1=negotiate, 2=intelligence, 3=message, 4=chat)
  // Initializes chat buffers, reads chatlog, sets up controls
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
  // Stub: saves parley window position to the window object
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4c81 — parleywin_set_resolution
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4c81() {
  // Stub: sets hi-res flag on parley window based on screen resolution
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4cf0 — parleywin_calc_layout
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4cf0() {
  // Stub: calculates parley window layout/sizing (SetRect calls)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4e8a — parleywin_calc_client_rects
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4e8a() {
  // Stub: calculates inner client area rectangles for parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b4fb2 — parleywin_update_scrollbars
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b4fb2() {
  // Stub: updates scrollbar positions in parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b50cf — parleywin_free_controls
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b50cf() {
  // Stub: frees all UI control widgets in the parley window (buttons, listboxes, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b5c93 — parleywin_create_controls
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b5c93() {
  // Stub: creates all UI controls for the parley window (buttons, text areas, chat input, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b74c4 — parleywin_button_handler
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b74c4(param_1) {
  // Stub: handles button clicks in parley window (OK=0x3e9, zoom in/out, etc.)
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
  FUN_005c6303(G.DAT_0067a7a8 + 0x48 * 0); // Stub
  FUN_004b76d5();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b768d — parleywin_focus_chat
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b768d() {
  FUN_005c6303(0); // Stub
  FUN_004b76d5();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b76d5 — parleywin_close
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b76d5() {
  // Stub: closes the parley window, cleans up diplomat state, sends cancel message if needed
  G.DAT_00626a2c = 0;
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7885 — parleywin_repaint
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7885() {
  // Stub: repaints the parley window (layout, decorations, scrollbars)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b794a — parleywin_paint_decorations
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b794a() {
  // Stub: paints parley window decorations (borders, civ name tabs, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7c90 — parleywin_paint_border_strip
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7c90(param_1, param_2) {
  // Stub: paints a decorative border strip in the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7d72 — parleywin_build_title
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7d72() {
  // Stub: builds the title bar text for the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b7eb6 — parleywin_start_session
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b7eb6(param_1, param_2) {
  // Stub: starts a diplomacy/chat/intelligence session in the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b81dd — parley_handle_response
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b81dd() {
  // Stub: handles diplomacy response messages (accept, reject, counter-offer, declare war, etc.)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b8676 — parley_set_negotiation_state
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b8676(param_1) {
  // Stub: sets the negotiation state (proposal type, scrollbar ranges) based on G.DAT_0067a9b0
  FUN_005c6303(0); // Stub

  if (G.DAT_0067a9b0 === -1) {
    G.DAT_0067a994 = 3;
  } else if (G.DAT_0067a9b0 === 0) {
    G.DAT_0067a994 = 6;
  } else if (G.DAT_0067a9b0 === 1) {
    G.DAT_0067a994 = 0xc;
    if (G.DAT_0067a9c4 !== 0) {
      G.DAT_0067a994 = 0xd;
    }
  } else if (G.DAT_0067a9b0 === 2) {
    if (G.DAT_0067a9c8 === 0) {
      G.DAT_0067a994 = 7;
    } else if (G.DAT_0067a9c8 === 1) {
      G.DAT_0067a994 = 8;
    } else if (G.DAT_0067a9c8 === 2) {
      G.DAT_0067a994 = 9;
    } else if (G.DAT_0067a9c8 === 3) {
      G.DAT_0067a994 = 10;
    } else {
      G.DAT_0067a994 = 0xb;
    }
  } else if (G.DAT_0067a9b0 === 3) {
    G.DAT_0067a994 = 5;
  } else if (G.DAT_0067a9b0 === 4) {
    G.DAT_0067a994 = 0xf;
  }

  G.DAT_0067a998 = G.DAT_0062d7d0 + G.DAT_0067a994 * 2; // Stub: array lookup
  G.DAT_0067a99c = G.DAT_0062d7d4 + G.DAT_0067a994 * 2; // Stub: array lookup
  G.DAT_0067a9a0 = G.DAT_0067a998;
  G.DAT_0067a9a4 = G.DAT_0067a99c;
  if (param_1 !== 0) {
    FUN_00526ca0(G.DAT_0067a998, 0);
    FUN_00526ca0(G.DAT_0067a99c, 1);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b888e — parley_cleanup_side_controls
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b888e(param_1) {
  // Stub: cleans up (destroys) controls on a side of the parley window
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b8e5c — parley_validate_gold_input
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b8e5c(param_1) {
  // Stub: validates gold amount entered in diplomacy text field
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b90ad — parley_send_chat_message
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b90ad(param_1, param_2, param_3, param_4) {
  // Stub: sends a chat message to other players, formats and appends to chat log
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b93a2 — parley_append_chat_text
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b93a2(param_1) {
  // Stub: appends text to the chat display buffer, trimming old messages if needed
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004b9504 — parley_format_civ_name
// ═══════════════════════════════════════════════════════════════════

export function FUN_004b9504(param_1) {
  // Stub: formats a civilization name for display (leader + nation)
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
  // Stub: clears the chat input and display buffers
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
  // Stub: handles parley window commands (send chat msg, close, scroll, etc.)
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
  // Stub: creates an edit box widget (Win32 window)
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
  // Stub: scrollbar widget destructor (frees child windows)
  return;
}

// FUN_004bb7b0 — scrollbar_base_dtor
export function FUN_004bb7b0() { FUN_0040f510(); return; }
// FUN_004bb7c3 — scrollbar_seh_cleanup
export function FUN_004bb7c3() { return; }

// FUN_004bb800 — widget_inflate_rect_neg
export function FUN_004bb800(param_1, param_2, param_3) {
  // Stub: InflateRect with negated params
  return;
}

// FUN_004bb840 — widget_inflate_rect
export function FUN_004bb840(param_1, param_2, param_3) {
  // Stub: Win32 InflateRect
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bb870 — alloc_global_memory
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb870(param_1) {
  G.DAT_00634818 = param_1;
  let iVar1 = FUN_005dce4f(param_1);
  G.DAT_00634814 = (iVar1 === 0) ? 1 : 0;
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bb8e0 — wonder_view_init
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bb8e0(param_1) {
  // Stub: initializes the wonder view (loads art, plays intro)
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
  // Stub: constructs the wonder view object
  return null;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bba79 — wonder_view_destruct
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bba79() {
  // Stub: destructs the wonder view object, calls sub-destructors
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
  // Stub: loads the civ2 wonder art GIF resource and sets up the display surface
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
  // Stub: plays the wonder completion video (AVI)
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
  // Stub: refreshes wonder view display surface
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bc10f — wonder_view_resize
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bc10f() {
  // Stub: resizes the wonder view window
  return;
}


// FUN_004bc193 — wonder_view_invalidate_1
export function FUN_004bc193() { return; }

// FUN_004bc1b1 — wonder_view_invalidate_2
export function FUN_004bc1b1() { return; }

// FUN_004bc1cf — wonder_view_conditional_invalidate
export function FUN_004bc1cf(param_1) {
  // Stub: invalidates wonder view if param_1 is in range 0xd0..0xd2
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
  for (local_40 = 0; local_40 < G.DAT_00655b18; local_40 = local_40 + 1) {
    if ((G.DAT_0064f394[local_40 * 0x58] !== 0) &&
       (s8(G.DAT_0064f348[local_40 * 0x58]) === param_1)) {
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
  for (local_6c = 0; local_6c < G.DAT_00655b16; local_6c = local_6c + 1) {
    if ((G.DAT_0065610a[local_6c * 0x20] !== 0) &&
       (s8(G.DAT_006560f7[local_6c * 0x20]) === param_1)) {
      local_34 = local_34 + 1;
    }
  }
  if (((local_48 + -1 + local_34) / local_48 | 0) <
      ((u8(G.DAT_0064c6b5[param_1 * 0x594]) < 5 ? 1 : 0) + 2)) {
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
        iVar1 = _FUN_004bd9f0(local_2c, s8(G.DAT_0064b1cb[local_38 * 0x14]));
        if (iVar1 !== 0) {
          if (G.DAT_0064b1c1[local_38 * 0x14] === 2) {
            aiStack_68[local_2c] = aiStack_68[local_2c] + 1;
          } else if ((G.DAT_0064b1ca[local_38 * 0x14] === 0) ||
                    (G.DAT_0064b1ca[local_38 * 0x14] === 1)) {
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
        if ((G.DAT_0064c6c1[param_1 * 0x594 + local_2c * 4] & 0x20) !== 0) {
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
    iVar1 = FUN_005ae006(G.DAT_00655b0a);
    if (((iVar1 + -1) / 2 | 0) < local_3c) {
      uVar2 = 2;
    } else {
      iVar1 = FUN_005ae006(G.DAT_00655b0a);
      if (((iVar1 + -1) / 2 | 0) < local_28) {
        uVar2 = 3;
      } else {
        iVar1 = _FUN_004bd9f0(param_1, 0x2f);
        if ((((iVar1 === 0) || (local_44 < 0)) ||
            (iVar1 = FUN_0043d20a(local_44, 8), iVar1 !== 0)) ||
           (iVar1 = FUN_00453e51(param_1, 6), iVar1 !== 0)) {
          if (local_70 === 0) {
            uVar2 = 4;
          } else if ((local_30 === 0) && (4 < u8(G.DAT_00655c22[param_1]))) {
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
       (u8(G.DAT_0064c6b0[param_1 * 0x594]) <= u8(G.DAT_0064c6b0[local_c * 0x594]))) {
      local_10 = local_10 + 1;
    }
  }
  if (local_10 === 0) {
    uVar1 = 7;
  } else {
    if (u8(G.DAT_0064c6b5[param_1 * 0x594]) < 5) {
      if ((G.DAT_0064c6b5[param_1 * 0x594] !== 4) &&
         (u8(G.DAT_0064c6b3[param_1 * 0x594]) < 6)) {
        return 2;
      }
    } else if (u8(G.DAT_0064c6b3[param_1 * 0x594]) < 4) {
      return 2;
    }
    local_20 = 0;
    local_14 = 0;
    local_8 = u8(G.DAT_0064c7a8[param_1 * 0x594]) + u8(G.DAT_0064c7a9[param_1 * 0x594]);
    if (param_2 === 0) {
      local_1c = 6;
    } else if (param_2 === 1) {
      local_1c = 0xc;
    } else {
      local_1c = 0x1a;
    }
    for (local_18 = 0; local_18 < G.DAT_00655b18; local_18 = local_18 + 1) {
      if ((G.DAT_0064f394[local_18 * 0x58] !== 0) &&
         (s8(G.DAT_0064f348[local_18 * 0x58]) === param_1)) {
        local_20 = local_20 + 1;
        iVar2 = FUN_0043d20a(local_18, local_1c);
        if (iVar2 !== 0) {
          local_14 = local_14 + 1;
        }
        local_8 = local_8 + s8(G.DAT_0064f37a[local_18 * 0x58]);
      }
    }
    iVar2 = _FUN_004bd9f0(param_1, s8(G.DAT_0064c48e[local_1c * 8]));
    if ((iVar2 === 0) || ((local_20 / 2 | 0) <= local_14)) {
      iVar2 = _FUN_004bd9f0(param_1, 0x54);
      if ((iVar2 === 0) || (((local_20 + ((local_20 >> 31) & 3)) >> 2) <= local_8)) {
        iVar2 = FUN_005ae006(G.DAT_00655b0a);
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
  // Stub: AI assesses economic status (building costs, maintenance, treasury)
  return 7;
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
      if ((G.DAT_0064c6c0[local_c * 4 + param_1 * 0x594] & 1) !== 0) {
        local_8 = local_8 + 1;
      }
      if ((G.DAT_0064c6c0[local_c * 4 + param_1 * 0x594] & 8) !== 0) {
        local_10 = local_10 + 1;
      }
      if ((G.DAT_0064c6c1[local_c * 4 + param_1 * 0x594] & 0x20) !== 0) {
        local_14 = local_14 + 1;
      }
      if (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + local_c * 4] & 0x80) !== 0) ||
         (iVar1 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar1 !== 0) ||
         (iVar1 = FUN_00453e51(G.DAT_006d1da0, 9), iVar1 !== 0)) {
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
    } else if ((((local_8 < 2) || (1 < u8(G.DAT_0064c6be[param_1 * 0x594]))) || (local_10 !== 0)) ||
              ((G.DAT_0064c6a0[param_1 * 0x594] & 0x100) !== 0 ||
               (6 < u8(G.DAT_00655c22[param_1])))) {
      if (u8(G.DAT_0064c6be[param_1 * 0x594]) < 3) {
        if ((local_14 === local_8) && (1 < u8(G.DAT_0064c6be[param_1 * 0x594]))) {
          uVar2 = 4;
        } else if ((G.DAT_0064c6a0[param_1 * 0x594] & 0x80) === 0) {
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

  uVar2 = G.DAT_00655aee & 4;
  G.DAT_00655aee = G.DAT_00655aee & 0xfffb;
  local_18 = 0;
  local_c = 0;
  local_14 = 0;
  local_10 = 0;
  for (local_20 = 0; local_20 < G.DAT_00655b18; local_20 = local_20 + 1) {
    if ((G.DAT_0064f394[local_20 * 0x58] !== 0) &&
       (s8(G.DAT_0064f348[local_20 * 0x58]) === param_1)) {
      if ((uVar2 !== 0) && (4 < u8(G.DAT_0064c6b5[param_1 * 0x594]))) {
        FUN_004eb4ed(local_20, 1);
      }
      if (s8(G.DAT_0064f392[local_20 * 0x58]) < s8(G.DAT_0064f393[local_20 * 0x58])) {
        local_10 = local_10 + 1;
        if ((G.DAT_0064f344[local_20 * 0x58] & 1) !== 0) {
          local_c = local_c + 1;
        }
      } else if (G.DAT_0064f392[local_20 * 0x58] === G.DAT_0064f393[local_20 * 0x58]) {
        local_18 = local_18 + 1;
      }
      if ((G.DAT_0064f344[local_20 * 0x58] & 2) !== 0) {
        local_14 = local_14 + 1;
      }
    }
  }
  if (u8(G.DAT_0064c6b5[param_1 * 0x594]) < 5) {
    bVar1 = true;
    if ((((local_10 === 0) && (local_18 !== 0)) && (local_14 === 0)) &&
       (u8(G.DAT_0064c6b3[param_1 * 0x594]) + u8(G.DAT_0064c6b4[param_1 * 0x594]) === 10)) {
      bVar1 = false;
    }
  } else {
    bVar1 = u8(G.DAT_0064c6b3[param_1 * 0x594]) + u8(G.DAT_0064c6b4[param_1 * 0x594]) < 9;
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
    if ((local_c === 0) || (G.DAT_0064c6b5[param_1 * 0x594] !== 6)) {
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
    iVar2 = FUN_004bdaa5(s8(G.DAT_0062768e[param_1 * 0x10]), param_2);
    if ((iVar2 === 0) &&
       (iVar2 = FUN_004bdaa5(s8(G.DAT_0062768f[param_1 * 0x10]), param_2), iVar2 === 0)) {
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
  // Stub: calculates the AI-perceived value of a technology for a given civ
  // Uses leader personality, tech tree position, military/diplomatic value, civ-specific biases
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004be6ba — upgrade_units_for_tech
// ═══════════════════════════════════════════════════════════════════

export function FUN_004be6ba(param_1) {
  // Stub: when a tech with unit upgrade effects is discovered, upgrades all eligible units
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bea84 — handle_tech_government_effects
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bea84(param_1, param_2) {
  // Stub: handles government-related effects when a tech is discovered (auto-revolution prompts, tutorials)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bee56 — we_love_the_king_day
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bee56(param_1) {
  // Stub: triggers "We Love the King Day" celebration, picks a random city
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004befd1 — format_enabled_item
// ═══════════════════════════════════════════════════════════════════

export function FUN_004befd1(param_1, param_2, param_3, param_4) {
  // Stub: formats an enabled building/unit item for the tech discovery dialog
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bf05b — handle_tech_discovery
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bf05b(param_1, param_2, param_3, param_4, param_5) {
  // Stub: main tech discovery handler — sets tech bits, displays announcements, triggers side effects
  // (unit upgrades, government changes, wonder obsolescence, barracks sell-off, etc.)
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

  if (((G.DAT_00627689[param_2 * 0x10] !== 0) &&
       (iVar1 = _FUN_004bd9f0(param_1, param_2), iVar1 === 0)) &&
      (iVar1 = _FUN_004bd9f0(param_1, s8(G.DAT_0062768e[param_2 * 0x10])), iVar1 !== 0) &&
      (iVar1 = _FUN_004bd9f0(param_1, s8(G.DAT_0062768f[param_2 * 0x10])), iVar1 !== 0)) {
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
  cVar1 = s8(G.DAT_0064b1cb[param_3 * 0x14]);

  // Guard 1: prereq tech check
  let guard1 = (-2 < cVar1) &&
    ((cVar1 < 0) || (iVar2 = _FUN_004bd9f0(param_1, cVar1), iVar2 !== 0));

  // Guard 2: obsolete tech check
  let guard2 = (s8(G.DAT_0064b1c0[param_3 * 0x14]) < 0) ||
    (iVar2 = _FUN_004bd9f0(param_1, s8(G.DAT_0064b1c0[param_3 * 0x14])), iVar2 === 0);

  // Guard 3: role-specific checks
  let guard3a = (G.DAT_0064b1ca[param_3 * 0x14] !== 1 ||
    (G.DAT_0064b251 <= s8(G.DAT_0064b1c5[param_3 * 0x14]))) ||
    (iVar2 = _FUN_004bd9f0(param_1, 0x23), iVar2 === 0);

  let guard3b = (G.DAT_0064b1ca[param_3 * 0x14] !== 0 ||
    (s8(G.DAT_0064b1c2[param_3 * 0x14]) !== G.DAT_0064bcc8 * 2)) ||
    ((G.DAT_0064b340 < s8(G.DAT_0064b1c4[param_3 * 0x14])) ||
     ((G.DAT_0064b341 <= s8(G.DAT_0064b1c5[param_3 * 0x14])) ||
      (iVar2 = _FUN_004bd9f0(param_1, G.DAT_0064b347), iVar2 === 0)));

  // Guard 4: hp limit / strategic resource checks
  let guard4 = (s8(G.DAT_0064b1c4[param_3 * 0x14]) < 99) ||
    ((G.DAT_00655c14 !== -1) && (iVar2 = _FUN_004bd9f0(param_1, 0x3a), iVar2 !== 0));

  // Guard 5: sea unit city requirement
  let guard5 = (param_2 < 0 || (G.DAT_0064b1c1[param_3 * 0x14] !== 2)) ||
    (((G.DAT_0064f346[param_2 * 0x58] & 0x20) !== 0) &&
     ((G.DAT_0064f344[param_2 * 0x58] & 0x80) !== 0));

  if (guard1 && guard2 && guard3a && guard3b && guard4 && guard5) {
    if (((1 << (param_1 & 0x1f) & G.DAT_00655b0b) === 0) &&
       (((G.DAT_0064bcc8 < s8(G.DAT_0064b1c2[param_3 * 0x14])) &&
        (G.DAT_0064b1c1[param_3 * 0x14] === 0)))) {
      for (local_10 = 0; local_10 < 0x3e; local_10 = local_10 + 1) {
        if (((((local_10 !== param_3) &&
              (G.DAT_0064b1ca[local_10 * 0x14] === G.DAT_0064b1ca[param_3 * 0x14])) &&
             (G.DAT_0064b1c1[local_10 * 0x14] === G.DAT_0064b1c1[param_3 * 0x14])) &&
            (((G.DAT_0064bcc8 < s8(G.DAT_0064b1c2[local_10 * 0x14])) &&
             (iVar2 = _FUN_004bd9f0(param_1, s8(G.DAT_0064b1cb[local_10 * 0x14])),
             iVar2 !== 0)))) &&
           (((s8(G.DAT_0064b1c4[param_3 * 0x14]) <= s8(G.DAT_0064b1c4[local_10 * 0x14])) &&
            (s8(G.DAT_0064b1c5[param_3 * 0x14]) <= s8(G.DAT_0064b1c5[local_10 * 0x14]))))) {
          if (G.DAT_0064b1c4[local_10 * 0x14] !== G.DAT_0064b1c4[param_3 * 0x14]) {
            return 0;
          }
          if (G.DAT_0064b1c5[local_10 * 0x14] !== G.DAT_0064b1c5[param_3 * 0x14]) {
            return 0;
          }
        }
      }
    }
    if ((param_3 !== 8) || (G.DAT_0064c6b5[param_1 * 0x594] === 4)) {
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

function FUN_0043c520() { }  // static_dtor_class
function FUN_0043d20a(p1, p2) { return 0; }  // city_has_building
function FUN_0043c840(p1, p2) { }  // build_path
function FUN_0043c9d0(p1) { }  // show_info_dialog
function FUN_004bb370_impl(p1, p2) { }  // read_file_block
function FUN_004b76d5_impl() { return 1; }  // close_parley

// Win32 API stubs (no-ops)
function GetPrivateProfileIntA(p1, p2, p3, p4) { return -1; }
function WritePrivateProfileStringA(p1, p2, p3, p4) { }
function SetRect(p1, p2, p3, p4, p5) { }
function OffsetRect(p1, p2, p3) { }
function InflateRect(p1, p2, p3) { }
function MessageBoxA(p1, p2, p3, p4) { return 0; }
function GlobalCompact(p1) { return 0; }
function Realloc(p1) { return 0; }
