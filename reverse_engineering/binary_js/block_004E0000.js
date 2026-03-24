// ═══════════════════════════════════════════════════════════════════
// block_004E0000.js — Mechanical transpilation of block_004E0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004E0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004E0000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8, s16, u16, s32, u32, w16, w32,
  DAT_006560f0, DAT_0064b1bc, DAT_0064c600, DAT_0064f340,
  DAT_00627cc0, DAT_00627cce, DAT_00627cd4,
  DAT_00636058, DAT_00655b16,
  DAT_0062833c, DAT_00628344,
  getTileOffset, tileRead, tileWrite,
} from './mem.js';

import {
  FUN_004087c0, FUN_005ae052, FUN_005b8931,
  FUN_005b94d5, FUN_005b89bb, FUN_005b89e4,
  FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1,
  FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6,
} from './fn_utils.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_00624ee0 = 0;
let DAT_00627cc4 = new Uint8Array(0x200);
let DAT_00627cca = new Int8Array(0x2000);
let DAT_00627ccd = new Int8Array(0x200);
let DAT_00627ccf = new Int8Array(0x200);
let DAT_00627cd0 = new Int8Array(0x200);
let DAT_00627cd1 = new Int8Array(0x200);
let DAT_0062804c = 0;
let DAT_00628044 = 0;
let DAT_00628048 = 0;
let DAT_00628054 = 0;
let DAT_00628068 = 0;
let DAT_00628350 = new Int8Array(0x100);
let DAT_00628360 = new Int8Array(0x100);
let DAT_00628370 = new Int8Array(0x100);
let DAT_006283a0 = new Int8Array(0x100);
let DAT_00628420 = 0;
let DAT_0062b428 = 0;
let DAT_0062bcd8 = 0;
let DAT_0062d858 = 0;
let DAT_0062d85c = 0;
let DAT_0062d860 = 0;
let DAT_0062d864 = 0;
let DAT_0062eb30 = 0;
let DAT_0062eb34 = 0;
let DAT_0062eb88 = 0;
let DAT_0062ed2c = 0;
let DAT_0062ed34 = 0;
let DAT_0062ed44 = 0;
let DAT_0062edf4 = 0;
let DAT_0062edf8 = 0;
let DAT_0062edfc = 0;
let DAT_0062ee00 = 0;
let DAT_0062ee04 = 0;
let DAT_0062ee08 = 0;
let DAT_0062ee0c = 0;
let DAT_0062ee48 = 0;
let DAT_00631edc = 0;
let DAT_00633678 = 0;
let DAT_00633a74 = 0;
let DAT_00633e00 = 0;
let DAT_00635a3c = 0;
let DAT_0063cc48 = 0;
let DAT_0063cd4c = 0;
let DAT_0063fc58 = 0;
let DAT_00641848 = new Uint8Array(0x4000);
let DAT_00645160 = new Uint8Array(0x4000);
let DAT_00645a84 = new Uint8Array(0x4000);
let DAT_00645fe8 = 0;
let DAT_006469e0 = 0;
let DAT_0064b168 = new Uint8Array(0x200);
let DAT_0064b1b0 = 0;
let DAT_0064b1b4 = 0;
let DAT_0064b1b8 = new Uint8Array(52 * 0x14);
let DAT_0064b1bd = new Uint8Array(52 * 0x14);
let DAT_0064b1c0 = new Int8Array(52 * 0x14);
let DAT_0064b1c1 = new Uint8Array(52 * 0x14);
let DAT_0064b1c2 = new Uint8Array(52 * 0x14);
let DAT_0064b1c4 = new Uint8Array(52 * 0x14);
let DAT_0064b1c8 = new Uint8Array(52 * 0x14);
let DAT_0064b1c9 = new Uint8Array(52 * 0x14);
let DAT_0064b1ca = new Uint8Array(52 * 0x14);
let DAT_0064b1cb = new Uint8Array(52 * 0x14);
let DAT_0064b9bc = 0;
let DAT_0064b9e8 = new Int32Array(8);
let DAT_0064bb08 = 0;
let DAT_0064bc1e = 0;
let DAT_0064bc22 = 0;
let DAT_0064bc60 = 0;
let DAT_0064bcca = 0;
let DAT_0064bccb = 0;
let DAT_0064bccc = 0;
let DAT_0064bccd = 0;
let DAT_0064bcce = 0;
let DAT_0064bccf = 0;
let DAT_0064bcd0 = 0;
let DAT_0064bcd1 = 0;
let DAT_0064bcd5 = 0;
let DAT_0064bcd6 = 0;
let DAT_0064bcd7 = 0;
let DAT_0064bcd8 = 0;
let DAT_0064bcd9 = 0;
let DAT_0064bcda = 0;
let DAT_0064bcdd = 0;
let DAT_0064c488 = new Uint8Array(0x400);
let DAT_0064c48c = new Uint8Array(0x400);
let DAT_0064c48e = new Uint8Array(0x400);
let DAT_0064c6a0 = new Uint8Array(8 * 0x594);
let DAT_0064c6a2 = new Uint8Array(8 * 0x594);
let DAT_0064c6a6 = new Uint8Array(8 * 0x594);
let DAT_0064c6aa = new Uint8Array(8 * 0x594);
let DAT_0064c6ac = new Uint8Array(8 * 0x594);
let DAT_0064c6b0 = new Uint8Array(8 * 0x594);
let DAT_0064c6b3 = new Uint8Array(8 * 0x594);
let DAT_0064c6b4 = new Uint8Array(8 * 0x594);
let DAT_0064c6b5 = new Uint8Array(8 * 0x594);
let DAT_0064c6b7 = new Uint8Array(8 * 0x594);
let DAT_0064c6be = new Uint8Array(8 * 0x594);
let DAT_0064c6c0 = new Uint8Array(8 * 0x594);
let DAT_0064c706 = new Uint8Array(8 * 0x594);
let DAT_0064c708 = new Uint8Array(8 * 0x594);
let DAT_0064c778 = new Uint8Array(8 * 0x594);
let DAT_0064c7a5 = new Uint8Array(8 * 0x594);
let DAT_0064c832 = new Uint8Array(8 * 0x594);
let DAT_0064ca32 = new Uint8Array(8 * 0x594);
let DAT_0064ca74 = new Uint8Array(8 * 0x594);
let DAT_0064ca76 = new Uint8Array(8 * 0x594);
let DAT_0064ca7a = new Uint8Array(8 * 0x594);
let DAT_0064ca7c = new Uint8Array(8 * 0x594);
let DAT_0064ca7e = new Uint8Array(8 * 0x594);
let DAT_0064ca80 = new Uint8Array(8 * 0x594);
let DAT_0064ca82 = new Uint8Array(8 * 0x594);
let DAT_0064f342 = new Uint8Array(0x10000);
let DAT_0064f344 = new Uint8Array(0x10000);
let DAT_0064f345 = new Uint8Array(0x10000);
let DAT_0064f348 = new Uint8Array(0x10000);
let DAT_0064f349 = new Uint8Array(0x10000);
let DAT_0064f34c = new Uint8Array(0x10000);
let DAT_0064f356 = new Uint8Array(0x10000);
let DAT_0064f35a = new Uint8Array(0x10000);
let DAT_0064f35c = new Uint8Array(0x10000);
let DAT_0064f35e = new Uint8Array(0x10000);
let DAT_0064f360 = new Uint8Array(0x10000);
let DAT_0064f370 = new Uint8Array(0x10000);
let DAT_0064f379 = new Int8Array(0x10000);
let DAT_0064f37a = new Uint8Array(0x10000);
let DAT_0064f37b = new Int8Array(0x10000);
let DAT_0064f381 = new Int8Array(0x10000);
let DAT_0064f384 = new Uint8Array(0x10000);
let DAT_0064f38a = new Uint8Array(0x10000);
let DAT_0064f38c = new Uint8Array(0x10000);
let DAT_0064f38e = new Uint8Array(0x10000);
let DAT_0064f390 = new Uint8Array(0x10000);
let DAT_0064f391 = new Uint8Array(0x10000);
let DAT_0064f392 = new Uint8Array(0x10000);
let DAT_0064f393 = new Uint8Array(0x10000);
let DAT_0064f394 = new Uint8Array(0x10000);
let DAT_00654b70 = 0;
let DAT_00654b74 = new Uint8Array(0x200);
let DAT_00654c74 = 0;
let DAT_00654c76 = 0;
let DAT_00654c7c = 0;
let DAT_00654fa4 = 0;
let DAT_00654fa8 = 0;
let DAT_00654fac = 0;
let DAT_00654fae = 0;
let DAT_00655020 = 0;
let DAT_00655280 = 0;
let DAT_006552a4 = 0;
let DAT_00655324 = 0;
let DAT_00655334 = 0;
let DAT_00655344 = 0;
let DAT_006553d8 = 0;
let DAT_006554fa = new Int8Array(0x4000);
let DAT_00655ae8 = 0;
let DAT_00655aea = 0;
let DAT_00655af0 = 0;
let DAT_00655af2 = 0;
let DAT_00655af4 = 0;
let DAT_00655af8 = 0;
let DAT_00655afe = 0;
let DAT_00655b02 = 0;
let DAT_00655b07 = 0;
let DAT_00655b08 = 0;
let DAT_00655b0a = 0;
let DAT_00655b0b = 0;
let DAT_00655b10 = 0;
// DAT_00655b16 imported from mem.js
let DAT_00655b18 = 0;
let DAT_00655b1e = new Uint8Array(0x100);
let DAT_00655b98 = new Uint8Array(0x100);
let DAT_00655bbc = 0;
let DAT_00655bcb = 0;
let DAT_00655bce = 0;
let DAT_00655be6 = new Uint8Array(0x100);
let DAT_00655c14 = 0;
let DAT_00655c18 = 0;
let DAT_00655c20 = 0;
let DAT_00655c21 = 0;
let DAT_00655c22 = new Uint8Array(0x100);
let DAT_00655c31 = 0;
let DAT_006560f2 = new Uint8Array(0x20000);
let DAT_006560f4 = new Uint8Array(0x20000);
let DAT_006560f6 = new Uint8Array(0x20000);
let DAT_006560f7 = new Int8Array(0x20000);
let DAT_006560f9 = new Uint8Array(0x20000);
let DAT_006560fd = new Uint8Array(0x20000);
let DAT_006560ff = new Uint8Array(0x20000);
let DAT_00656100 = new Uint8Array(0x20000);
let DAT_00656102 = new Uint8Array(0x20000);
let DAT_00656106 = new Uint8Array(0x20000);
let DAT_00656108 = new Uint8Array(0x20000);
let DAT_0065610a = new Uint8Array(0x20000);
let DAT_006665fa = 0;
let DAT_006665fc = 0;
let DAT_006665fe = 0;
let DAT_00666600 = 0;
let DAT_0066ca84 = new Uint8Array(0x4000);
let DAT_0066ca88 = 0;
let DAT_0066ca8a = 0;
let DAT_0066ca8c = 0;
let DAT_00673af8 = new Uint8Array(0x100);
let DAT_00673afc = new Uint8Array(0x100);
let DAT_00679640 = 0;
let DAT_0067a8c4 = 0;
let DAT_0067a8c8 = 0;
let DAT_0067a8d4 = 0;
let DAT_0067a8f8 = 0;
let DAT_0067a8fc = 0;
let DAT_0068ad04 = 0;
let DAT_0068ad08 = 0;
let DAT_0068ad14 = 0;
let DAT_0068ad38 = 0;
let DAT_0068ad3c = 0;
let DAT_006a6528 = 0;
let DAT_006a6530 = new Uint8Array(0x100);
let DAT_006a654c = 0;
let DAT_006a6550 = 0;
let DAT_006a6554 = 0;
let DAT_006a6558 = 0;
let DAT_006a655c = 0;
let DAT_006a6560 = 0;
let DAT_006a6564 = 0;
let DAT_006a6568 = 0;
let DAT_006a656c = 0;
let DAT_006a6570 = 0;
let DAT_006a6574 = 0;
let DAT_006a6578 = 0;
let DAT_006a657c = 0;
let DAT_006a6580 = 0;
let DAT_006a6584 = 0;
let DAT_006a6588 = 0;
let DAT_006a6590 = new Int32Array(0x20);
let DAT_006a659c = 0;
let DAT_006a65a0 = 0;
let DAT_006a65a4 = 0;
let DAT_006a65a8 = 0;
let DAT_006a65ac = 0;
let DAT_006a65b0 = 0;
let DAT_006a65b8 = 0;
let DAT_006a65bc = 0;
let DAT_006a65c0 = 0;
let DAT_006a65c4 = 0;
let DAT_006a65c8 = 0;
let DAT_006a65cc = 0;
let DAT_006a65d0 = 0;
let DAT_006a65d4 = 0;
let DAT_006a65d8 = 0;
let DAT_006a65dc = 0;
let DAT_006a65e0 = 0;
let DAT_006a65e4 = 0;
let DAT_006a65e8 = 0;
let DAT_006a65f0 = new Uint8Array(0x100);
let DAT_006a65f8 = 0;
let DAT_006a65fc = 0;
let DAT_006a6600 = 0;
let DAT_006a6604 = 0;
let DAT_006a6608 = 0;
let DAT_006a660c = 0;
let DAT_006a6610 = 0;
let DAT_006a6618 = 0;
let DAT_006a661c = 0;
let DAT_006a6620 = new Uint8Array(0x100);
let DAT_006a6628 = new Uint8Array(0x100);
let DAT_006ad2f7 = 0;
let DAT_006ad308 = 0;
let DAT_006ad30c = new Uint8Array(0x1000);
let DAT_006ad558 = new Int32Array(8);
let DAT_006ad578 = 0;
let DAT_006ad5bc = 0;
let DAT_006ad66c = 0;
let DAT_006ad670 = 0;
let DAT_006ad685 = 0;
let DAT_006ad698 = 0;
let DAT_006ad8bc = 0;
let DAT_006ad8c0 = 0;
let DAT_006ad8c4 = 0;
let DAT_006ad8c8 = 0;
let DAT_006ad8cc = 0;
let DAT_006ad8d0 = 0;
let DAT_006ad8d8 = 0;
let DAT_006ad8dc = 0;
let DAT_006ad8e0 = 0;
let DAT_006ad8e4 = 0;
let DAT_006ad8e8 = 0;
let DAT_006ad8ec = 0;
let DAT_006ad8f0 = 0;
let DAT_006ad8f4 = 0;
let DAT_006ad8f8 = 0;
let DAT_006ad8fc = 0;
let DAT_006ad900 = 0;
let DAT_006ad904 = 0;
let DAT_006c31a9 = 0;
let DAT_006c31ac = 0;
let DAT_006c31b0 = 0;
let DAT_006c31b4 = 0;
let DAT_006c8fa0 = 0;
let DAT_006c8fac = 0;
let DAT_006c90b4 = 0;
let DAT_006c9100 = 0;
let DAT_006cec80 = 0;
let DAT_006ced50 = 0;
let DAT_006d1160 = 0;
let DAT_006d1162 = 0;
let DAT_006d1da0 = 0;
let DAT_006d1da8 = 0;


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

// init_runtime
export function FUN_004e0140() {
  FUN_004e015a();
  FUN_004e0179();
}

// alloc_stack_4K
export function FUN_004e015a() {
  FUN_005786f1(0x1000);
}

// register_atexit
export function FUN_004e0179() {
  _atexit(FUN_004e0196);
}

// atexit_cleanup
export function FUN_004e0196() {
  FUN_00578770();
}

// pick_music_dialog_or_similar
export function FUN_004e01b0() {
  FUN_0059db08(0x4000);
  let local_14 = 0;
  while (true) {
    FUN_0040bc40(0x1001);
    FUN_0059e6ff(0x1b8);
    FUN_0059e5c9(0x10, 0x1b8, 0);
    for (let local_18 = 0; local_18 < 0x1c; local_18 = local_18 + 1) {
      let uVar3 = 0;
      let iVar2 = local_18;
      let uVar1 = FUN_00428b0c(DAT_0064c488[(local_18 + 0x27) * 8], local_18, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    FUN_0059ea99(local_14);
    local_14 = FUN_0040bc80(0);
    if (local_14 < 0) break;
    FUN_004bb8e0(local_14);
  }
  FUN_004e02cb();
  FUN_004e02e1();
}

// dialog_cleanup
export function FUN_004e02cb() {
  FUN_0059df8a();
}

// SEH_restore
export function FUN_004e02e1() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}

// setup_city_windows_and_map_views
export function FUN_004e02ef() {
  let iVar1, iVar2;
  let local_20, local_1c, local_18, local_14, local_8;

  FUN_00426f80();
  FUN_00499a49(); // thunk_citywin_9A49
  FUN_004e7240();
  FUN_004bb570(DAT_00655344);
  FUN_0049994f();
  FUN_0040785b();
  FUN_004e7240();
  DAT_00624ee0 = 0;
  FUN_004bb570(DAT_00655324);
  FUN_005bb574();
  FUN_0056a9f4();
  FUN_004e7240();
  DAT_00633e00 = 0;
  FUN_004bb570(DAT_00655334);
  FUN_005bb574();
  if (DAT_0067a8fc === 0) {
    local_14 = 0x208;
    local_18 = 0x14f;
    local_1c = FUN_0040ef70();
  } else {
    local_14 = 800;
    local_18 = 0x1cc;
    local_1c = FUN_0040ef70();
  }
  DAT_0067a8d4 = DAT_0062d85c * 2 + DAT_0062d864 * 2 + local_1c;
  local_14 = local_14 + (DAT_0062d860 + DAT_0062d858) * 2 + 6;
  local_18 = local_18 + DAT_0062d85c * 2 + DAT_0067a8d4 * 2 + 0xe;
  iVar1 = FUN_004080c0();
  iVar1 = (iVar1 >> 1) - (local_14 >> 1);
  DAT_0067a8c4 = iVar1;
  iVar2 = FUN_00414bb0();
  DAT_0067a8c8 = (iVar2 >> 1) - (local_18 >> 1);
  SetRect(DAT_0067a8f8, iVar1, DAT_0067a8c8, iVar1 + local_14, DAT_0067a8c8 + local_18);
  FUN_004bb570(DAT_0067a8f8);
  if (DAT_0068ad3c === 0) {
    local_14 = 0x208;
    local_18 = 0x14f;
    local_20 = FUN_0040ef70();
  } else {
    local_14 = 800;
    local_18 = 0x1cc;
    local_20 = FUN_0040ef70();
  }
  DAT_0068ad14 = DAT_0062d85c * 2 + DAT_0062d864 * 2 + local_20;
  local_14 = local_14 + (DAT_0062d860 + DAT_0062d858) * 2 + 6;
  local_18 = local_18 + DAT_0062d85c * 2 + DAT_0068ad14 * 2 + 0xe;
  iVar1 = FUN_004080c0();
  iVar1 = (iVar1 >> 1) - (local_14 >> 1);
  DAT_0068ad04 = iVar1;
  iVar2 = FUN_00414bb0();
  DAT_0068ad08 = (iVar2 >> 1) - (local_18 >> 1);
  SetRect(DAT_0068ad38, iVar1, DAT_0068ad08, iVar1 + local_14, DAT_0068ad08 + local_18);
  FUN_004bb570(DAT_0068ad38);
  for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
    if (s16(DAT_0066ca84, local_8 * 0x3f0) !== 0) {
      DAT_0066ca84[local_8 * 0x3f0] = 0;
      DAT_0066ca84[local_8 * 0x3f0 + 1] = 0;
      FUN_004083b0();
    }
  }
  FUN_004132b7();
  FUN_004e7240();
  FUN_004bb570(DAT_006552a4);
  FUN_005bb574();
  FUN_00484d52();
}

// load_game
export function FUN_004e068d() {
  let bVar1, iVar2, local_8;

  FUN_0055ae80(1);
  FUN_0049994f();
  FUN_004b7645();
  FUN_004b768d();
  FUN_004f5dd1();
  FUN_0042a768();
  FUN_0042a768();
  bVar1 = u8(DAT_00655aea) & 8;
  iVar2 = FUN_load_verify_units(0, 0, 0);
  if (iVar2 === 0) {
    if (DAT_00655b02 !== 0) {
      FUN_0041e8fb(1);
    }
    DAT_00654fa4 = u8(DAT_006d1da0);
    DAT_00628048 = u8(DAT_006d1da0);
    DAT_00655b02 = 0;
    DAT_00655b0b = (1 << (u8(DAT_006d1da0) & 0x1f));
    if ((u8(DAT_00655aea) & 8) === 0) {
      FUN_0046e6a9();
    } else {
      if (bVar1 === 0) {
        FUN_005dde9d();
        FUN_005dde57();
        FUN_005ddd4e();
        FUN_0046e4a9();
      }
      FUN_0046e6c8();
    }
    FUN_00498a5c(DAT_006d1da0);
    if (DAT_00655280 === 0) {
      FUN_004e02ef();
      FUN_004e7240();
      FUN_004bb570(DAT_006552a4);
      FUN_00413476();
      FUN_005bb574();
      for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
        if (s16(DAT_0066ca84, local_8 * 0x3f0) !== 0) {
          FUN_00413717();
          FUN_004bb570(DAT_006552a4 + local_8 * 0x10);
          FUN_00413476();
          FUN_005bb574();
        }
      }
    } else {
      FUN_00426f80();
      FUN_004e7240();
      FUN_004bb570(DAT_00655344);
      FUN_0049994f();
      FUN_004e7240();
      DAT_00624ee0 = 0;
      FUN_004bb570(DAT_00655324);
      FUN_005bb574();
      FUN_004e7240();
      DAT_00633e00 = 0;
      FUN_004bb570(DAT_00655334);
      FUN_005bb574();
      FUN_004e7240();
      FUN_004bb570(DAT_006552a4);
      FUN_00413476();
      FUN_005bb574();
      for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
        if (s16(DAT_0066ca84, local_8 * 0x3f0) !== 0) {
          FUN_00413717();
          FUN_004bb570(DAT_006552a4 + local_8 * 0x10);
          FUN_00413476();
          FUN_005bb574();
        }
      }
      FUN_005bb574();
    }
    DAT_006d1da8 = 0;
    FUN_005bb574();
    FUN_004897fa(1);
    FUN_00489a0d(0);
    FUN_004e4ceb();
    FUN_004f7c99();
    FUN_00484d52();
    if (DAT_00655b02 !== 0 && DAT_00654b70 !== 0) {
      FUN_0055af2e(1);
    }
  } else {
    DAT_00655b02 = 0;
    FUN_0055b046(1);
  }
}

// checkbox_set_adapter
export function FUN_004e0a8c(param_1, param_2) {
  FUN_0051d7d6(param_1, param_2 !== 0 ? 1 : 0);
}

// game_options_dialog
export function FUN_004e0ab0() {
  let uVar1, iVar2;

  uVar1 = DAT_00655aea & 8;
  FUN_0051d7bc();
  FUN_004e0a8c(0, DAT_00655aea & 0x10);
  FUN_004e0a8c(1, DAT_00655aea & 8);
  FUN_004e0a8c(2, DAT_00655aea & 0x4000);
  FUN_004e0a8c(3, DAT_00655aea & 0x2000);
  FUN_004e0a8c(4, DAT_00655aea & 0x1000);
  FUN_004e0a8c(5, DAT_00655aea & 0x800);
  FUN_004e0a8c(6, DAT_00655aea & 0x400);
  FUN_004e0a8c(7, DAT_00655aea & 0x200);
  FUN_004e0a8c(8, DAT_00655aea & 0x100);
  FUN_004e0a8c(9, DAT_00655aea & 0x80);
  FUN_004e0a8c(10, DAT_00655aea & 0x40);
  FUN_0040ff60(0, PTR_s_5_4_0f_Multiplayer_26_March_99_0062765c);
  FUN_005f22e0(DAT_0063cc48, DAT_0062eb34);
  FUN_005f22e0(DAT_0063cc48, PTR_s_Patch_3_00627660);
  iVar2 = FUN_00421e70(s_GAMEOPTIONS_0062eb38, 1);
  if (iVar2 === 0) {
    DAT_00655aea = DAT_00655aea & 0xffff8027;
    iVar2 = FUN_0051d817(0);
    if (iVar2 !== 0) {
      DAT_00655aea = DAT_00655aea | 0x10;
    }
    iVar2 = FUN_0051d817(1);
    if (iVar2 === 0) {
      FUN_0046e6a9();
    } else {
      DAT_00655aea = DAT_00655aea | 8;
      if (uVar1 === 0) {
        FUN_005dde9d();
        FUN_005dde57();
        FUN_005ddd4e();
        FUN_0046e4a9();
      }
      FUN_0046e6c8();
    }
    iVar2 = FUN_0051d817(2);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x4000; }
    iVar2 = FUN_0051d817(3);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x2000; }
    iVar2 = FUN_0051d817(4);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x1000; }
    iVar2 = FUN_0051d817(5);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x800; }
    iVar2 = FUN_0051d817(6);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x400; }
    iVar2 = FUN_0051d817(7);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x200; }
    iVar2 = FUN_0051d817(8);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x100; }
    iVar2 = FUN_0051d817(9);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x80; }
    iVar2 = FUN_0051d817(10);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x40; }
    DAT_0064bc1e = DAT_00655aea;
    FUN_004a73d9();
  }
}

// graphic_options_dialog
export function FUN_004e0d71() {
  let uVar1, iVar2;

  uVar1 = DAT_00655aea & 0x200000;
  FUN_0051d7bc();
  FUN_004e0a8c(0, DAT_00655aea & 0x20000);
  FUN_004e0a8c(1, DAT_00655aea & 0x40000);
  FUN_004e0a8c(2, DAT_00655aea & 0x200000);
  FUN_004e0a8c(3, DAT_00655aea & 0x80000);
  FUN_004e0a8c(4, DAT_00655aea & 0x100000);
  FUN_004e0a8c(5, DAT_00655aea & 0x10000);
  iVar2 = FUN_00421e70(s_GRAPHICOPTIONS_0062eb44, 1);
  if (iVar2 === 0) {
    DAT_00655aea = DAT_00655aea & 0xffc0ffff;
    iVar2 = FUN_0051d817(0);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x20000; }
    iVar2 = FUN_0051d817(1);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x40000; }
    iVar2 = FUN_0051d817(2);
    if (iVar2 !== 0) {
      if (uVar1 === 0) {
        iVar2 = FUN_00568176(0x800000);
        if (iVar2 === 0) {
          FUN_00421ea0(s_LOWMEMORY_0062eb54);
        }
      }
      DAT_00655aea = DAT_00655aea | 0x200000;
    }
    iVar2 = FUN_0051d817(3);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x80000; }
    iVar2 = FUN_0051d817(4);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x100000; }
    iVar2 = FUN_0051d817(5);
    if (iVar2 !== 0) { DAT_00655aea = DAT_00655aea | 0x10000; }
    DAT_0064bc1e = DAT_00655aea;
    FUN_004a73d9();
  }
}

// multiplayer_options_dialog
export function FUN_004e0f18() {
  let iVar1, local_8;

  FUN_0051d7bc();
  FUN_004e0a8c(0, DAT_006665fa);
  FUN_004e0a8c(1, DAT_006665fc);
  if (DAT_006ad2f7 !== 0) {
    FUN_004e0a8c(2, DAT_00654fac);
    FUN_004e0a8c(3, DAT_00654fae);
  }
  if ((DAT_00655b02 < 3 || DAT_006ad2f7 === 0) && 2 < DAT_00655b02) {
    local_8 = FUN_00421e70(s_MULTIPLAYEROPTIONS2_0062eb74, 1);
  } else {
    local_8 = FUN_00421e70(s_MULTIPLAYEROPTIONS_0062eb60, 1);
  }
  if (local_8 === 0) {
    iVar1 = FUN_0051d817(0);
    DAT_006665fa = (iVar1 !== 0) ? 1 : 0;
    iVar1 = FUN_0051d817(1);
    DAT_006665fc = (iVar1 !== 0) ? 1 : 0;
    FUN_004a73d9();
    if ((2 < DAT_00655b02 && DAT_006ad2f7 !== 0) || DAT_00655b02 < 3) {
      iVar1 = FUN_0051d817(2);
      DAT_006665fe = (iVar1 !== 0) ? 1 : 0;
      iVar1 = FUN_0051d817(3);
      DAT_00666600 = (iVar1 !== 0) ? 1 : 0;
      if (DAT_00654fac !== DAT_006665fe || DAT_00654fae !== DAT_00666600) {
        if (2 < DAT_00655b02 && 1 < DAT_006ad308) {
          FUN_005f22d0(DAT_0063cc48, DAT_006ad5bc);
          FUN_004aef20(DAT_0063cd4c);
          FUN_004af14b(DAT_0063cd4c, 0x350 - ((DAT_006665fe === 0) ? 1 : 0));
          FUN_005f22e0(DAT_0063cd4c, DAT_0062eb88);
          FUN_004af14b(DAT_0063cd4c, 0x352 - ((DAT_00666600 === 0) ? 1 : 0));
          DAT_006ad66c = DAT_006ad308 + -1;
          DAT_006ad670 = 0;
          FUN_00511880(0x43, 0xff, 2, 0, 0, 0);
          DAT_00635a3c = 0; // was &LAB_004019b5
          DAT_006cec80 = FUN_00421bb0();
          iVar1 = FUN_00426fb0(s_PMCHANGESERVER_0062eb8c, 0x2000001, DAT_0063fc58, 0);
          if (iVar1 < 0 || DAT_006ad670 === -1 || DAT_006ad66c !== 0) {
            DAT_006665fe = DAT_00654fac;
            DAT_00666600 = DAT_00654fae;
            FUN_00511880(0x44, 0xff, 0, 0, 0, 0);
            FUN_00410030(s_PMCHANGENO_0062eb9c, DAT_0063fc58, 0);
            return;
          }
        }
        DAT_00654fac = DAT_006665fe;
        DAT_00654fae = DAT_00666600;
        FUN_004e1314();
        if (2 < DAT_00655b02 && 1 < DAT_006ad308) {
          FUN_0046b14d(0x1b, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x33, 0xff, DAT_00654fac, DAT_00654fae, DAT_00654c7c, 0, 0, 0, 0, 0);
          FUN_00511880(0x45, 0xff, 0, 0, 0, 0);
          FUN_00410030(s_PMCHANGEYES_0062eba8, DAT_0063fc58, 0);
        }
      }
    }
  }
}

// adjust_barbarian_difficulty
export function FUN_004e1314() {
  let local_8;

  if (DAT_00655b02 === 0 || DAT_00654fae === 0 || DAT_00628068 !== 0) {
    if (DAT_00655b02 !== 0 && DAT_00654fae === 0 && DAT_00628068 === 1) {
      DAT_00628068 = 0;
      for (local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
        if (DAT_0064b1c1[local_8 * 0x14] === 0) {
          DAT_0064b1c2[local_8 * 0x14] = s8(DAT_0064b1c2[local_8 * 0x14]) / 2;
        }
      }
      FUN_0056a65e(1);
    }
  } else {
    DAT_00628068 = 1;
    for (local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
      if (DAT_0064b1c1[local_8 * 0x14] === 0) {
        DAT_0064b1c2[local_8 * 0x14] = DAT_0064b1c2[local_8 * 0x14] * 2;
      }
    }
    FUN_0056a65e(1);
  }
}

// message_options_dialog
export function FUN_004e1452() {
  let iVar1;

  FUN_0051d7bc();
  FUN_0051d7d6(0, ~DAT_00655af2 & 1);
  FUN_0051d7d6(1, (DAT_00655af2 & 2) === 0 ? 1 : 0);
  FUN_0051d7d6(2, (DAT_00655af2 & 4) === 0 ? 1 : 0);
  FUN_0051d7d6(3, (DAT_00655af2 & 8) === 0 ? 1 : 0);
  FUN_0051d7d6(4, (DAT_00655af2 & 0x10) === 0 ? 1 : 0);
  FUN_0051d7d6(5, (DAT_00655af2 & 0x20) === 0 ? 1 : 0);
  FUN_0051d7d6(6, (DAT_00655af2 & 0x40) === 0 ? 1 : 0);
  FUN_0051d7d6(7, (DAT_00655af2 & 0x80) === 0 ? 1 : 0);
  FUN_0051d7d6(8, (DAT_00655af2 & 0x100) === 0 ? 1 : 0);
  FUN_0051d7d6(9, (DAT_00655af2 & 0x200) === 0 ? 1 : 0);
  FUN_0051d7d6(10, (DAT_00655af2 & 0x400) === 0 ? 1 : 0);
  iVar1 = FUN_00421e70(s_MESSAGEOPTIONS_0062ebb4, 1);
  if (iVar1 === 0) {
    DAT_00655af2 = 0;
    iVar1 = FUN_0051d817(0);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 1; }
    iVar1 = FUN_0051d817(1);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 2; }
    iVar1 = FUN_0051d817(2);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 4; }
    iVar1 = FUN_0051d817(3);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 8; }
    iVar1 = FUN_0051d817(4);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 0x10; }
    iVar1 = FUN_0051d817(5);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 0x20; }
    iVar1 = FUN_0051d817(6);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 0x40; }
    iVar1 = FUN_0051d817(7);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 0x80; }
    iVar1 = FUN_0051d817(8);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 0x100; }
    iVar1 = FUN_0051d817(9);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 0x200; }
    iVar1 = FUN_0051d817(10);
    if (iVar1 === 0) { DAT_00655af2 = DAT_00655af2 | 0x400; }
    DAT_0064bc22 = DAT_00655af2;
    FUN_004a73d9();
  }
}

// kill_or_retire_civ (NOTE: very large function, ~200 lines C)
export function FUN_004e1763(param_1, param_2, param_3) {
  // This is a massive function handling civ elimination.
  // Mechanical transpilation is provided but many external calls are stubs.
  let sVar1, sVar2, bVar3, iVar4, iVar5, uVar6, iVar7, iVar8, uVar9;
  let local_34, local_30, local_28, local_20, local_1c, local_18, local_14, local_c;

  bVar3 = false;
  DAT_006ad8ec = 1;
  if (DAT_00655b02 < 3 || DAT_006ad2f7 !== 0) {
    DAT_00655b0b = DAT_00655b0b & ~(1 << (u8(param_1) & 0x1f));
    if (2 < DAT_00655b02) {
      FUN_0046b14d(0x31, 0, 0, param_1, 0, 0, 0, 0, 0, 0);
    }
    if (DAT_00654c76 !== 0 || param_2 !== 0) {
      FUN_005b9ec6();
      // Unit cleanup loop
      for (local_34 = 0; local_34 < DAT_00655b16; local_34 = local_34 + 1) {
        if (DAT_0065610a[local_34 * 0x20] !== 0) {
          if (s8(DAT_006560f7[local_34 * 0x20]) === param_1 ||
              (u16(DAT_006560f4, local_34 * 0x20) & 2) === 0 ||
              s8(DAT_006560fd[local_34 * 0x20]) !== param_1) {
            if (s8(DAT_006560f7[local_34 * 0x20]) === param_1) {
              if (param_1 >= 0 && local_34 < 0x800) {
                if (s16(DAT_0064c706, param_1 * 0x594) !== 0 &&
                    s8(DAT_0064b1ca[u8(DAT_006560f6[local_34 * 0x20]) * 0x14]) < 5) {
                  let v = s16(DAT_0064c706, param_1 * 0x594);
                  // write back v - 1
                  DAT_0064c706[param_1 * 0x594] = (v - 1) & 0xff;
                  DAT_0064c706[param_1 * 0x594 + 1] = ((v - 1) >> 8) & 0xff;
                }
                if (DAT_0064c778[param_1 * 0x594 + u8(DAT_006560f6[local_34 * 0x20])] !== 0) {
                  DAT_0064c778[param_1 * 0x594 + u8(DAT_006560f6[local_34 * 0x20])] =
                    DAT_0064c778[param_1 * 0x594 + u8(DAT_006560f6[local_34 * 0x20])] - 1;
                }
                if (DAT_0064b9e8[param_1] !== 0) {
                  DAT_0064b9e8[param_1] = DAT_0064b9e8[param_1] - 1;
                }
              }
              if (s16(DAT_00656106, local_34 * 0x20) >= 0) {
                let nextIdx = s16(DAT_00656106, local_34 * 0x20);
                DAT_00656108[nextIdx * 0x20] = DAT_00656108[local_34 * 0x20];
                DAT_00656108[nextIdx * 0x20 + 1] = DAT_00656108[local_34 * 0x20 + 1];
                bVar3 = true;
              }
              if (s16(DAT_00656108, local_34 * 0x20) >= 0) {
                let prevIdx = s16(DAT_00656108, local_34 * 0x20);
                DAT_00656106[prevIdx * 0x20] = DAT_00656106[local_34 * 0x20];
                DAT_00656106[prevIdx * 0x20 + 1] = DAT_00656106[local_34 * 0x20 + 1];
                bVar3 = true;
              }
              if (!bVar3) {
                iVar4 = FUN_004087c0(s16(DAT_006560f0, local_34 * 0x20), s16(DAT_006560f2, local_34 * 0x20));
                if (iVar4 !== 0) {
                  FUN_005b94fc(s16(DAT_006560f0, local_34 * 0x20), s16(DAT_006560f2, local_34 * 0x20), 1, 0, 1);
                }
              }
              DAT_00656106[local_34 * 0x20] = 0xff;
              DAT_00656106[local_34 * 0x20 + 1] = 0xff;
              DAT_00656108[local_34 * 0x20] = 0xff;
              DAT_00656108[local_34 * 0x20 + 1] = 0xff;
              let coordVal = (s8(DAT_006560f7[local_34 * 0x20]) * 4 + 4) * -0x19;
              DAT_006560f0[local_34 * 0x20] = coordVal & 0xff;
              DAT_006560f0[local_34 * 0x20 + 1] = (coordVal >> 8) & 0xff;
              DAT_006560f2[local_34 * 0x20] = coordVal & 0xff;
              DAT_006560f2[local_34 * 0x20 + 1] = (coordVal >> 8) & 0xff;
              DAT_0065610a[local_34 * 0x20] = 0;
              DAT_0065610a[local_34 * 0x20 + 1] = 0;
              DAT_0065610a[local_34 * 0x20 + 2] = 0;
              DAT_0065610a[local_34 * 0x20 + 3] = 0;
              if (DAT_00655b16 + -1 === local_34) {
                DAT_00655b16 = DAT_00655b16 + -1;
              }
              for (local_18 = 0; local_18 < DAT_00655b16; local_18 = local_18 + 1) {
                if (DAT_006560ff[local_18 * 0x20] === 0x03 &&
                    s16(DAT_00656102, local_18 * 0x20) === local_34) {
                  DAT_006560ff[local_18 * 0x20] = 0xff;
                }
              }
            }
          } else {
            let flagVal = u16(DAT_006560f4, local_34 * 0x20) & 0xfffd;
            DAT_006560f4[local_34 * 0x20] = flagVal & 0xff;
            DAT_006560f4[local_34 * 0x20 + 1] = (flagVal >> 8) & 0xff;
            let civIdx = s8(DAT_006560fd[local_34 * 0x20]);
            let off = civIdx * 4 + param_1 * 0x594;
            let dipVal = (DAT_0064c6c0[off] | (DAT_0064c6c0[off+1]<<8) | (DAT_0064c6c0[off+2]<<16) | (DAT_0064c6c0[off+3]<<24)) & 0xfeffffff;
            DAT_0064c6c0[off] = dipVal & 0xff;
            DAT_0064c6c0[off+1] = (dipVal >> 8) & 0xff;
            DAT_0064c6c0[off+2] = (dipVal >> 16) & 0xff;
            DAT_0064c6c0[off+3] = (dipVal >> 24) & 0xff;
            FUN_004c5fae(local_34, 0, civIdx);
          }
        }
      }
      // City cleanup loop
      for (local_30 = 0; local_30 < DAT_00655b18; local_30 = local_30 + 1) {
        if (DAT_0064f394[local_30 * 0x58] !== 0 &&
            s8(DAT_0064f348[local_30 * 0x58]) === param_1) {
          iVar4 = s16(DAT_0064f340, local_30 * 0x58);
          iVar5 = s16(DAT_0064f342, local_30 * 0x58);
          param_1 = s8(DAT_0064f348[local_30 * 0x58]);
          let cityNumV = s16(DAT_0064c708, param_1 * 0x594);
          DAT_0064c708[param_1 * 0x594] = (cityNumV - 1) & 0xff;
          DAT_0064c708[param_1 * 0x594 + 1] = ((cityNumV - 1) >> 8) & 0xff;
          DAT_0064f394[local_30 * 0x58] = 0;
          DAT_0064f394[local_30 * 0x58 + 1] = 0;
          DAT_0064f394[local_30 * 0x58 + 2] = 0;
          DAT_0064f394[local_30 * 0x58 + 3] = 0;
          if (DAT_00655b18 + -1 === local_30) {
            DAT_00655b18 = DAT_00655b18 + -1;
          }
          for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
            if (DAT_0064f394[local_c * 0x58] !== 0) {
              local_34 = s8(DAT_0064f37a[local_c * 0x58]);
              while (local_34 = local_34 + -1, local_34 >= 0) {
                if (s16(DAT_0064f384, local_c * 0x58 + local_34 * 2) === local_30) {
                  FUN_00440325(local_c, local_34);
                }
              }
            }
          }
          for (local_c = 0; local_c < 0x1c; local_c = local_c + 1) {
            if (s16(DAT_00655be6, local_c * 2) === local_30) {
              DAT_00655be6[local_c * 2] = 0xfe;
              DAT_00655be6[local_c * 2 + 1] = 0xff;
            }
          }
          local_28 = 0;
          FUN_005b94fc(iVar4, iVar5, 2, 0, 1);
          for (local_c = 0; local_c < 0x2d; local_c = local_c + 1) {
            uVar6 = FUN_005ae052(s8(DAT_00628370[local_c]) + iVar4);
            iVar7 = s8(DAT_006283a0[local_c]) + iVar5;
            iVar8 = FUN_004087c0(uVar6, iVar7);
            if (iVar8 !== 0) {
              let isZE = FUN_005b89e4(uVar6, iVar7);
              if (isZE === 0) {
                uVar9 = FUN_005b8c18(uVar6, iVar7, 1);
                FUN_005b98b7(uVar6, iVar7, uVar9 | 8);
                if (local_c < 0x15) {
                  let owner = FUN_005b8af0(uVar6, iVar7);
                  if (owner === param_1) {
                    FUN_005b9c49(uVar6, iVar7, 0, 1);
                  }
                  let controlCiv = FUN_005b8da4(uVar6, iVar7);
                  if (0 < controlCiv && controlCiv !== param_1) {
                    local_14 = u8(controlCiv);
                    local_28 = local_28 | (1 << (local_14 & 0x1f));
                  }
                }
              }
            }
          }
          if (local_28 !== 0) {
            for (local_34 = FUN_005b2e69(iVar4, iVar5); local_34 >= 0;
                 local_34 = FUN_005b2c82(local_34)) {
              DAT_006560f9[local_34 * 0x20] = DAT_006560f9[local_34 * 0x20] | u8(local_28);
            }
          }
        }
      }
      // Recalculate visibility
      for (local_30 = 0; local_30 < DAT_00655b18; local_30 = local_30 + 1) {
        sVar1 = s16(DAT_0064f340, local_30 * 0x58);
        sVar2 = s16(DAT_0064f342, local_30 * 0x58);
        for (local_c = 0; local_c < 0x2d; local_c = local_c + 1) {
          uVar6 = FUN_005ae052(s8(DAT_00628370[local_c]) + sVar1);
          iVar4 = s8(DAT_006283a0[local_c]) + sVar2;
          iVar5 = FUN_004087c0(uVar6, iVar4);
          if (iVar5 !== 0) {
            uVar9 = FUN_005b8c18(uVar6, iVar4, 1);
            FUN_005b98b7(uVar6, iVar4, uVar9 & 7);
            if (local_c < 0x15) {
              FUN_005b9c49(uVar6, iVar4, param_1, 1);
            }
          }
        }
      }
      FUN_004a74bc(param_1);
      DAT_00655b0a = DAT_00655b0a & ~(1 << (u8(param_1) & 0x1f));
      for (local_1c = 0; local_1c < DAT_006d1160; local_1c = local_1c + 1) {
        for (local_20 = 0; local_20 < DAT_006d1162; local_20 = local_20 + 1) {
          FUN_005b976d(local_1c, local_20, 1 << (u8(param_1) & 0x1f), 0, 1);
        }
      }
      FUN_005b9f1c();
    }
    FUN_00498943();
    DAT_00654b74[param_1 * 0x20] = 0;
    FUN_004988b8();
    if (2 < DAT_00655b02) {
      FUN_0046e6a9();
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    if ((~(1 << (u8(param_1) & 0x1f)) & DAT_00655b0b) === 0) {
      DAT_006ad8ec = 0;
    } else {
      if (param_3 !== 0) {
        new_civ(param_1);
      }
      if (2 < DAT_00655b02) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      }
      FUN_0047cf9e(DAT_006d1da0, 1);
      DAT_006ad8ec = 0;
    }
  } else {
    DAT_006ad8ec = 0;
    DAT_006c90b4 = -2;
    FUN_0046b14d(0x34, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    iVar4 = FUN_00421bb0();
    while (DAT_006c90b4 === -2) {
      iVar5 = FUN_00421bb0();
      if (iVar5 - iVar4 >= 0xe10) break;
      FUN_0047e94e(1, 1);
    }
    if (DAT_006c90b4 === -2) {
      debug_log("KillOrRetire: Connection to server timeout");
      FUN_00410030(s_SERVERCONNECTTIME_0062ebf4, DAT_0063fc58, 0);
      DAT_00628044 = 0;
    } else {
      debug_log("KillOrRetire: Received NM_KILL_O response");
    }
    while (DAT_006c8fac !== 0 || DAT_006c8fa0 !== 0) {
      FUN_0047e94e(1, 0);
    }
  }
}

// quit_or_retire_dialog
export function FUN_004e22c9(param_1) {
  let iVar1, uVar2, local_8;

  if (DAT_00655b02 < 3 || DAT_006ad698 === 0) {
    if (param_1 === 0) {
      iVar1 = FUN_00410030(s_REALLYQUIT_0062ec50, DAT_0063fc58, 0);
      if (iVar1 === 0) return;
    } else {
      iVar1 = FUN_00410030(s_REALLYRETIRE_0062ec40, DAT_0063fc58, 0);
      if (iVar1 === 0) return;
      FUN_00431d22();
      if ((DAT_00655af0 & 0x20) === 0) {
        FUN_00435d15(DAT_006d1da0);
        FUN_004361cc(DAT_006d1da0);
        FUN_00436f5a(DAT_006d1da0);
      }
    }
    if (DAT_00655b02 === 0) {
      FUN_0046e6a9();
      FUN_00484d3b();
    } else {
      if (DAT_00655b02 === 1) {
        local_8 = DAT_00655b0b;
        DAT_00655b0b = DAT_006c31a9;
      }
      if (2 < DAT_00655b02) {
        if (DAT_00633a74 !== 0) {
          FUN_005d2004(DAT_00633a74);
          DAT_00633a74 = 0;
        }
        FUN_004b7645();
        FUN_004b768d();
        uVar2 = FUN_00410070(DAT_006d1da0);
        FUN_0040ff60(0, uVar2);
        uVar2 = FUN_00493ba6(DAT_006d1da0);
        FUN_0040ff60(1, uVar2);
        uVar2 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(2, uVar2);
        uVar2 = FUN_00493c7d(DAT_006d1da0);
        FUN_0040ff60(3, uVar2);
        if (DAT_00654c76 === 0) {
          FUN_00511880(1, 0xff, 4, 0, 0, 0);
        } else {
          FUN_00511880(0, 0xff, 4, 0, 0, 0);
        }
      }
      DAT_00628054 = 0;
      FUN_0041033a();
      if ((~(1 << (u8(DAT_006d1da0) & 0x1f)) & DAT_00655b0b) === 0) {
        if (DAT_00655b02 < 3) {
          DAT_00655b0b = DAT_00655b0b & ~(1 << (u8(DAT_006d1da0) & 0x1f));
        } else {
          FUN_0046b14d(0x31, 0, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0);
        }
        FUN_00484d3b();
        FUN_0046e6a9();
      } else {
        FUN_004e1763(DAT_006d1da0, 0, 0);
        if (2 < DAT_00655b02) {
          FUN_00484d3b();
        }
      }
      DAT_0064b9bc = 0;
      DAT_006ad685 = 1;
      if (DAT_00655b02 === 1) {
        DAT_006c31a9 = DAT_00655b0b;
        DAT_00655b0b = local_8;
      }
    }
  }
}

// reveal_hidden_terrain (cheat)
export function FUN_004e2597() {
  DAT_0062804c = 0;
  DAT_0062bcd8 = 1;
  FUN_0047cf9e(DAT_006d1da0, 1);
  FUN_00421ea0(s_HIDDENTERRAIN_0062ec5c);
  DAT_0062bcd8 = 0;
  FUN_0047cf9e(DAT_006d1da0, 1);
}

// pick_music_dialog
export function FUN_004e25ef() {
  let iVar1, local_18, local_14;

  FUN_0059db08(0x4000);
  local_14 = 0;
  while (local_14 < 5) {
    local_14 = local_14 + 1;
    local_18 = FUN_005ddeff();
    if (local_18 === 0x18 || local_18 === 0x12 || local_18 === 0xc || local_18 === 10) break;
    if (local_18 === -1) {
      FUN_005dde57();
    }
    Sleep(200);
  }
  if (local_18 === -1) {
    FUN_00421ea0(s_NOPICKMUSICNEW_0062ec6c);
    FUN_004e27df();
    FUN_004e27f5();
    return;
  }
  if (local_18 === 0x18) {
    FUN_0040ffa0(s_PICKMUSICFANWORLDS_0062ec7c, 1);
  } else if (local_18 === 0x12) {
    FUN_0040ffa0(s_PICKMUSICSCENARIO_0062ec90, 1);
  } else if (local_18 === 0xc) {
    FUN_0040ffa0(s_PICKMUSICGOLD_0062eca4, 1);
  } else {
    if (local_18 !== 10) {
      FUN_00421ea0(s_NOPICKMUSICNEW_0062ecc0);
      FUN_004e27df();
      FUN_004e27f5();
      return;
    }
    FUN_0040ffa0(s_PICKMUSIC_0062ecb4, 1);
  }
  if (1 < DAT_0062b428) {
    FUN_0059ea99(DAT_0062b428 + -2);
  }
  iVar1 = FUN_0040bc80(0);
  if (iVar1 >= 0) {
    FUN_0046e571(iVar1 + 2, 1);
    FUN_004e27df();
    FUN_004e27f5();
    return;
  }
  FUN_004e27df();
  FUN_004e27f5();
}

// dialog_destructor_2
export function FUN_004e27df() {
  FUN_0059df8a();
}

// SEH_restore_2
export function FUN_004e27f5() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}

// main_menu_command_handler (massive switch dispatch)
export function FUN_004e2803(param_1, param_2) {
  let SVar1, iVar2;

  iVar2 = XD_InFlushSendBuffer();
  if (iVar2 === 0 && DAT_006ad8bc === 0 && DAT_006ad8c0 === 0 &&
      DAT_006ad8c4 === 0 && DAT_006ad8c8 === 0 && DAT_006ad8cc === 0 &&
      DAT_006ad8d0 === 0 && DAT_006ad8d8 === 0 &&
      DAT_006ad8dc === 0 && DAT_006ad8e0 === 0 && DAT_006ad8e4 === 0 && DAT_006ad8e8 === 0 &&
      DAT_006ad8ec === 0 && DAT_006ad8f0 === 0 &&
      DAT_006ad8f4 === 0 &&
      DAT_006ad8f8 === 0 && DAT_006ad8fc === 0 && DAT_006ad900 === 0 && DAT_006ad904 === 0) {
    if (DAT_0062edf8 === 0) {
      iVar2 = FUN_00410e0a();
      if (iVar2 === 0 || (FUN_00410ed8(), param_2 !== 0x441)) {
        // Giant switch/if-else on param_2 — abbreviated for mechanical correctness
        // Full dispatch is present in the C source (lines 1167-1653)
        // This is a UI menu dispatcher; all branches call thunk stubs
        if (param_2 < 0x111) {
          if (param_2 === 0x110) { FUN_save_game(0); }
          else if (param_2 === 0x101) { FUN_004e0ab0(); }
          else if (param_2 === 0x102) { FUN_004e0d71(); }
          else if (param_2 === 0x103) { FUN_004e1452(); }
          else if (param_2 === 0x104) { FUN_004e0f18(); }
          else if (param_2 === 0x105) { FUN_004259a6(0); }
          else if (param_2 === 0x106) { FUN_004e25ef(); }
        } else if (param_2 === 0x120) { FUN_004e068d(); }
        else if (param_2 === 0x130) { FUN_00522b2b(); }
        else if (param_2 === 0x131) { FUN_0049836a(DAT_006d1da0); }
        else if (param_2 === 0x132) { FUN_0055b2c6(); }
        else if (param_2 === 0x1f0) { FUN_004e22c9(1); }
        else if (param_2 === 0x1f1) { FUN_004e22c9(0); }
        // C line 1219: quit multiplayer
        else if (param_2 === 0x1f2 && DAT_00655b02 === 1) {
          iVar2 = FUN_00410030("REALLYQUIT", DAT_0063fc58, 0);
          if (iVar2 === 0) return;
          FUN_0046e6a9(); FUN_00484d3b(); return;
        }
        else if (param_2 === 0x201) { FUN_0040ddc6(DAT_006d1da0); }
        else if (param_2 === 0x205) { FUN_0044cd9b(DAT_006d1da0); }
        else if (param_2 === 0x210) { FUN_0040e017(); }
        else if (param_2 === 0x220) { FUN_0040e3b1(); }
        else if (param_2 === 0x301) { FUN_00489a0d(1); }
        else if (param_2 === 0x302) { FUN_004897fa(0); }
        else if (param_2 === 0x310) {
          if (DAT_0066ca8c < 8) { DAT_0066ca8c = DAT_0066ca8c + 1; FUN_0047cd51(DAT_006d1da0, 1); }
        } else if (param_2 === 0x311) {
          if (DAT_0066ca8c > -7) { DAT_0066ca8c = DAT_0066ca8c + -1; FUN_0047cd51(DAT_006d1da0, 1); }
        } else if (param_2 === 800) { DAT_0066ca8c = 8; FUN_0047cd51(DAT_006d1da0, 1); }
        else if (param_2 === 0x321) { DAT_0066ca8c = 0; DAT_0066ca88 = DAT_0064b1b4; DAT_0066ca8a = DAT_0064b1b0; FUN_0047cd51(DAT_006d1da0, 1); }
        else if (param_2 === 0x322) { DAT_0066ca8c = -3; FUN_0047cd51(DAT_006d1da0, 1); }
        else if (param_2 === 0x324) { DAT_0066ca8c = -7; FUN_0047cd51(DAT_006d1da0, 1); }
        else if (param_2 === 0x327) {
          DAT_00655aea = DAT_00655aea ^ 0x20;
          FUN_0057940d(0x327, (DAT_00655aea & 0x20) >> 5);
          FUN_0047cf9e(DAT_006d1da0, 1);
          DAT_0064bc1e = DAT_00655aea;
          FUN_004a73d9();
        } else if (param_2 === 0x328) { FUN_004e02ef(); }
        else if (param_2 === 0x330) { FUN_004e2597(); }
        else if (param_2 === 0x340) { FUN_00410402(DAT_0064b1b4, DAT_0064b1b0); }
        // Orders menu
        else if (param_2 === 0x401) { FUN_0058be56(); }
        else if (param_2 === 0x410) { FUN_0058c65e(5); }
        else if (param_2 === 0x411) { FUN_0058c65e(6); }
        else if (param_2 === 0x412) { FUN_0058c65e(7); }
        else if (param_2 === 0x413) { FUN_0058c65e(8); }
        else if (param_2 === 0x417) { FUN_0058c65e(10); }
        else if (param_2 === 0x418) { FUN_0058c65e(4); }
        else if (param_2 === 0x41b) { FUN_0058df14(); }
        else if (param_2 === 0x420) { FUN_0058c65e(9); }
        else if (param_2 === 0x421) { FUN_0058cfcd(); }
        else if (param_2 === 0x430) { FUN_0058ddce(); }
        else if (param_2 === 0x440) { FUN_0058d6af(); }
        else if (param_2 === 0x441) { FUN_0058d60a(); }
        else if (param_2 === 0x442) { FUN_0058df7b(); }
        else if (param_2 === 0x445) { FUN_0058cbe1(); }
        else if (param_2 === 0x450) { FUN_0058cce6(); }
        else if (param_2 === 0x451) { FUN_0058cde5(); }
        else if (param_2 === 0x460) { FUN_0058c295(); }
        else if (param_2 === 0x468) { FUN_0058d442(); }
        else if (param_2 === 0x470) { FUN_0058bdfd(); }
        else if (param_2 === 0x480) { FUN_0058bd60(); }
        else if (param_2 === 0x490) { FUN_0058bd84(); }
        // Advisors
        else if (param_2 === 0x500) {
          // DEVIATION: C checks GetAsyncKeyState(0x10) — shift+click passes param 1 instead of 0
          // if (((DAT_00655aea & 0x8000) === 0) || (DAT_00655b02 !== 0) || !GetAsyncKeyState(0x10)) {
          //   FUN_00516570(DAT_006d1da0, 0);
          // } else {
          //   FUN_00516570(DAT_006d1da0, 1);
          // }
          FUN_00516570(DAT_006d1da0, 0);
        }
        else if (param_2 === 0x501) { FUN_0042d71e(DAT_006d1da0); }
        else if (param_2 === 0x502) { FUN_0042f079(DAT_006d1da0); }
        else if (param_2 === 0x503) { FUN_004308ae(DAT_006d1da0); }
        else if (param_2 === 0x504) { FUN_0042e185(DAT_006d1da0); }
        else if (param_2 === 0x505) { FUN_0042cd2f(DAT_006d1da0); }
        else if (param_2 === 0x506) { FUN_0042b67d(DAT_006d1da0); }
        else if (param_2 === 0x507) { FUN_004b7eb6(0, 4); }
        else if (param_2 === 0x508) { FUN_0043856b(DAT_006d1da0); }
        // World
        else if (param_2 === 0x601) {
          // DEVIATION: C checks GetAsyncKeyState(0x10) for shift-key cheat
          // SVar1 = GetAsyncKeyState(0x10);
          // if (((SVar1 >> 8) & 0xff) === 0 || (DAT_00655aea & 0x8000) === 0 || DAT_00655b02 !== 0) {
          //   FUN_00431c73(DAT_006d1da0);
          // } else {
          //   FUN_004e01b0();
          // }
          FUN_00431c73(DAT_006d1da0);
        }
        else if (param_2 === 0x602) {
          // DEVIATION: C checks GetAsyncKeyState(0x10) for shift-key cheat
          // SVar1 = GetAsyncKeyState(0x10);
          // if (((SVar1 >> 8) & 0xff) === 0 || (DAT_00655aea & 0x8000) === 0 || DAT_00655b02 !== 0) {
          //   FUN_00433122(DAT_006d1da0);
          // } else {
          //   FUN_004702e0(DAT_006d1da0);
          // }
          FUN_00433122(DAT_006d1da0);
        }
        else if (param_2 === 0x603) {
          // DEVIATION: C checks GetAsyncKeyState(0x10) for shift-key cheat
          // SVar1 = GetAsyncKeyState(0x10);
          // if (((SVar1 >> 8) & 0xff) === 0 || (DAT_00655aea & 0x8000) === 0 || DAT_00655b02 !== 0) {
          //   FUN_00435d15(DAT_006d1da0);
          //   if (DAT_00655b07 !== 0) { FUN_004361cc(DAT_006d1da0); FUN_00431d22(); }
          // } else {
          //   FUN_00514e7b(DAT_006d1da0);
          // }
          FUN_00435d15(DAT_006d1da0);
          if (DAT_00655b07 !== 0) {
            FUN_004361cc(DAT_006d1da0);
            FUN_00431d22();
          }
        }
        else if (param_2 === 0x605) {
          // DEVIATION: C checks GetAsyncKeyState(0x10) for shift-key cheat
          // SVar1 = GetAsyncKeyState(0x10);
          // if (((SVar1 >> 8) & 0xff) === 0 || (DAT_00655aea & 0x8000) === 0 || DAT_00655b02 !== 0) {
          //   FUN_00434d8a(DAT_006d1da0);
          // } else {
          //   FUN_004710d0(-(DAT_006d1da0 + 1 & 7));
          // }
          FUN_00434d8a(DAT_006d1da0);
        }
        else if (param_2 === 0x606) {
          // DEVIATION: C checks GetAsyncKeyState(0x10) for shift-key cheat
          // SVar1 = GetAsyncKeyState(0x10);
          // if (((SVar1 >> 8) & 0xff) === 0 || (DAT_00655aea & 0x8000) === 0 || DAT_00655b02 !== 0) {
          //   FUN_00598b4e(DAT_006d1da0);
          // } else {
          //   FUN_004710d0(DAT_006d1da0);
          // }
          FUN_00598b4e(DAT_006d1da0);
        }
        // Cheats (C lines 1434-1568 — all require cheat mode + single player)
        else if (param_2 === 0x701) { if (DAT_00655b02 === 0 || DAT_0062eb30 !== 0) FUN_00554297(); }
        // NOTE: No case 0x702 in C — param_2 < 0x702 is only used as a boundary check
        else if (param_2 === 0x711) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_005551b3(); }
        else if (param_2 === 0x712) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_0055560f(); }
        else if (param_2 === 0x713) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_0055583f(); }
        else if (param_2 === 0x721) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_00555a02(); }
        else if (param_2 === 0x722) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_00555a8b(); }
        else if (param_2 === 0x731) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_00554423(); }
        else if (param_2 === 0x732) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_005545d3(); }
        else if (param_2 === 0x740) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_00554962(); }
        else if (param_2 === 0x741) { /* C: scenario — DEVIATION */ }
        else if (param_2 === 0x748) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) { DAT_00633678 = -1; FUN_0055499f(); } }
        else if (param_2 === 0x750) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) { FUN_00555cb1(); FUN_00489a0d(0); } }
        else if (param_2 === 0x751) { /* C: scenario — DEVIATION */ }
        else if (param_2 === 0x752) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_0055615c(); }
        else if (param_2 === 0x755) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_0055625b(); }
        else if (param_2 === 0x756) { /* C: scenario — DEVIATION */ }
        else if (param_2 === 0x760) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_set_city_shields(); }
        else if (param_2 === 0x765) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_00556f54(); }
        else if (param_2 === 0x766) { /* C: scenario — DEVIATION */ }
        else if (param_2 === 0x768) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_005582ad(); }
        else if (param_2 === 0x770) { if ((DAT_00655ae8 & 0x8000) !== 0 && DAT_00655b02 === 0) FUN_0055891d(); }
        else if (param_2 === 0x771) { /* C: scenario — DEVIATION */ }
        // Civilopedia
        else if (param_2 === 0x801) { FUN_00553ff6(); }
        else if (param_2 === 0x802) { FUN_00417566(); }
        else if (param_2 === 0x803) { FUN_00429e77(); }
        else if (param_2 === 0x804) { FUN_0058760d(); }
        else if (param_2 === 0x805) { FUN_004da9e2(); }
        else if (param_2 === 0x806) { FUN_0051c635(); }
        else if (param_2 === 0x807) { FUN_004a5d92(); }
        else if (param_2 === 0x808) { FUN_005b1a29(); }
        else if (param_2 === 0x809) { FUN_0054ffc8(); }
        else if (param_2 === 0x901) { FUN_004f7bd1(1, 1); }
        else if (param_2 === 0x903) { FUN_004f7bd1(2, 1); }
        else if (param_2 === 0x905) { FUN_004f7bd1(3, 1); }
        else if (param_2 === 0x907) { FUN_004f7bd1(4, 1); }
        else if (param_2 === 0x909) { FUN_004f7bd1(6, 1); }
        else if (param_2 === 0x90b) { FUN_004f7bd1(5, 1); }
        else if (param_2 === 0x90d) { FUN_004f7bd1(7, 1); }
        else if (param_2 === 0x9f0) {
          if (DAT_00655b02 < 3) {
            iVar2 = FUN_00421e70(s_NEWCREDITS_0062ed20, 1);
            if (iVar2 >= 0) FUN_00437a4a(iVar2);
            FUN_004a2020();
          }
        }
      }
    } else {
      FUN_005013bc();
    }
  } else {
    debug_log("Mainmenu: menu exec blocked by lock");
    DAT_006c31ac = 5;
    DAT_006c31b0 = param_1;
    DAT_006c31b4 = param_2;
  }
}

// build_main_menu — very large menu construction function (UI only)
// Source: decompiled/block_004E0000.c FUN_004e3a86 (4575 bytes)
export function FUN_004e3a86() {
  let iVar1;
  let uVar2;
  let uVar3;

  FUN_005786b6(0x1bbc);
  iVar1 = FUN_004a2379(0, 0);
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(1,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x101,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x102,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x103,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x104,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x105,uVar2,uVar3);
    FUN_00578c12(1,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x106,uVar2,uVar3);
    FUN_00578c12(1,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x110,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x120,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x130,uVar2,uVar3);
    FUN_00578c12(1,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x131,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x132,uVar2,uVar3);
    FUN_00578c12(1,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x1f0,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(1,0x1f1,uVar2,uVar3);
  iVar1 = FUN_004a2379(0, "");
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(2,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(2,0x201,uVar2,uVar3);
    FUN_00578c12(2,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(2,0x205,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(2,0x210,uVar2,uVar3);
    FUN_00578c12(2,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(2,0x220,uVar2,uVar3);
  iVar1 = FUN_004a2379(0, 0);
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(3,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x301,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x302,uVar2,uVar3);
    FUN_00578c12(3,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x310,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x311,uVar2,uVar3);
    FUN_00578c12(3,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,800,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x321,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x322,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x324,uVar2,uVar3);
    FUN_00578c12(3,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x327,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x328,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x330,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(3,0x340,uVar2,uVar3);
  FUN_0057940d(0x327, (DAT_00655aea & 0x20) >> 5);
  iVar1 = FUN_004a2379(0, "");
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(4,uVar2);
    uVar2 = FUN_004a23fc(1,0x3c);
    FUN_00578c12(4,0x401,uVar2,uVar3);
    uVar2 = FUN_004a23fc(1,0x3c);
    FUN_00578c12(4,0x410,uVar2,uVar3);
    uVar2 = FUN_004a23fc(1,0x3c);
    FUN_00578c12(4,0x411,uVar2,uVar3);
    uVar2 = FUN_004a23fc(1,0x3c);
    FUN_00578c12(4,0x412,uVar2,uVar3);
    uVar2 = FUN_004a23fc(1,0x3c);
    FUN_00578c12(4,0x413,uVar2,uVar3);
    FUN_00578c12(4,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x417,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x418,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x41b,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x420,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x421,uVar2,uVar3);
    FUN_00578c12(4,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x430,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x440,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x441,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x442,uVar2,uVar3);
    uVar2 = FUN_004a23fc(1,0x3c);
    FUN_00578c12(4,0x445,uVar2,uVar3);
    FUN_00578c12(4,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x450,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x451,uVar2,uVar3);
    FUN_00578c12(4,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x460,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x468,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x470,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(4,0x480,uVar2,uVar3);
    FUN_00578c12(4,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1);
    FUN_00578c12(4,0x490,uVar2,uVar3);
  iVar1 = FUN_004a2379(0, "");
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(5,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x507,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x500,uVar2,uVar3);
    FUN_00578c12(5,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x501,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x502,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x503,uVar2,uVar3);
    FUN_00578c12(5,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x504,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x505,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x506,uVar2,uVar3);
    FUN_00578c12(5,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(5,0x508,uVar2,uVar3);
  iVar1 = FUN_004a2379(0, "");
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(6,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(6,0x601,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(6,0x602,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(6,0x603,uVar2,uVar3);
    FUN_00578c12(6,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(6,0x605,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(6,0x606,uVar2,uVar3);
  iVar1 = FUN_004a2379(0, "");
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(7,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x701,uVar2,uVar3);
    FUN_00578c12(7,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x711,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x712,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x713,uVar2,uVar3);
    FUN_00578c12(7,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x721,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x722,uVar2,uVar3);
    FUN_00578c12(7,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x731,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x732,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x740,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x748,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x750,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x752,uVar2,uVar3);
    FUN_00578c12(7,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x755,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x760,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x765,uVar2,uVar3);
    FUN_00578c12(7,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x768,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(7,0x770,uVar2,uVar3);
  FUN_005794cf(7,local_8);
  FUN_0057940d(0x701,local_c);
  FUN_005792e1(0x701,DAT_00655b02 != '\0' && DAT_0062eb30 == 0);
  iVar1 = FUN_004a2379(0, "");
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(8,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x801,uVar2,uVar3);
    FUN_00578c12(8,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x802,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x803,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x804,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x805,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x806,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x807,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x808,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(8,0x809,uVar2,uVar3);
  FUN_0057940d(0x801,local_10);
  FUN_005794cf(8,local_14);
  FUN_005792e1(0x801,DAT_00655b02 != '\0');
  iVar1 = FUN_004a2379(0, "");
  if (iVar1 === 0) {
    uVar2 = FUN_004a23fc(1);
    FUN_00578b06(9,uVar2);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x901,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x903,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x905,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x907,uVar2,uVar3);
    FUN_00578c12(9,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x909,uVar2,uVar3);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x90b,uVar2,uVar3);
    FUN_00578c12(9,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x90d,uVar2,uVar3);
    FUN_00578c12(9,0,0,0);
    uVar3 = 0;
    uVar2 = FUN_004a23fc(1,0);
    FUN_00578c12(9,0x9f0,uVar2,uVar3);
  FUN_00579260(0x441,1);
  FUN_00579260(0x413,1);
  FUN_00579260(0x442,1);
  FUN_00579260(0x417,1);
  FUN_00579260(0x418,1);
  FUN_00579260(0x41b,1);
  FUN_004a2020();
  FUN_00578f2c(DAT_006553d8);
  FUN_00578e38(FUN_004e2803);
}

// menu_item_set_label_and_enable
export function FUN_004e4c92(param_1, param_2, param_3) {
  let local_54 = new Uint8Array(80);
  FUN_0040bbb0();
  FUN_0040bc10(param_2);
  FUN_00426ff0(DAT_00679640, local_54);
  FUN_0057953e(param_1, local_54);
  FUN_005792e1(param_1, param_3);
}

// update_menu_state — large function updating all menu enables/disables
// Source: decompiled/block_004E0000.c FUN_004e4ceb (3761 bytes)
export function FUN_004e4ceb() {
  let cVar1, cVar2, bVar3, bVar4;
  let iVar5, iVar6, iVar7, iVar8, iVar11, iVar13;
  let uVar9, uVar10, uVar14, bVar15;
  let local_3c, local_40, local_44, local_48, local_4c;
  let local_50, local_54, local_58, local_5c, local_60;
  let local_64, local_68, local_6c, local_70;
  let local_8;

  // C line 2153: menu mode flags
  FUN_005792e1(0x606, DAT_00655ae8 & 0x80);
  if (DAT_00655b02 === 0) {
    FUN_005792e1(0x130, 1); FUN_005792e1(0x132, 1); FUN_005792e1(0x507, 1);
    FUN_005792e1(0x104, 1); FUN_005792e1(0x105, 1);
    FUN_005792e1(0x120, 0); FUN_005792e1(0x9f0, 0);
  } else {
    FUN_005792e1(0x9f0, 1); FUN_005792e1(0x104, 0); FUN_005792e1(0x105, 0);
    if (DAT_0062eb30 === 0) { FUN_005792e1(0x701, 1); }
    FUN_005792e1(0x120, 1);
    if ((DAT_00654c74 === 0) || (DAT_00655b02 !== 1)) { FUN_005792e1(0x130, 1); }
    else { FUN_005792e1(0x130, 0); }
    if (DAT_00655b02 === 1) { FUN_005792e1(0x205, 1); }
    else { FUN_005792e1(0x205, 0); }
    FUN_005792e1(0x507, DAT_00655b02 < 3 ? 1 : 0);
    if (DAT_00655b02 === 2) {
      FUN_005792e1(0x132, 1); FUN_005792e1(0x110, 1);
    } else {
      if (DAT_006ad2f7 === 0) { FUN_005792e1(0x132, 1); }
      else { FUN_005792e1(0x132, 0); }
      FUN_005792e1(0x110, 0);
    }
    FUN_005792e1(0x1f1, 0); FUN_005792e1(0x1f0, 0);
  }
  // C line 2200: unit presence flags
  FUN_005792e1(0x302, DAT_006d1da8 === 0 ? 1 : 0);
  FUN_005792e1(0x301, DAT_006d1da8 === 1 ? 1 : 0);
  // C line 2202: revolution menu enabled if gov is Anarchy or scenario bypass
  if (((DAT_00655af0 & 0x80) === 0 || (DAT_0064bc60 & 0x10) === 0) &&
     DAT_0064c6b5[DAT_006d1da0 * 0x594] !== 0) {
    local_3c = 0;
  } else { local_3c = 1; }
  FUN_005792e1(0x220, local_3c);
  // C line 2210: active unit menu
  if (DAT_006d1da8 === 0 || DAT_00655b16 === 0 || DAT_00655afe < 0 ||
     DAT_00655b16 < DAT_00655afe ||
     ri(DAT_006560f0, (DAT_00655afe & 0xFFFF) * 0x20 + 0x1a) === 0) {
    FUN_005794cf(4, 1); FUN_005792e1(0x460, 0); FUN_005792e1(0x468, 0);
  } else {
    iVar13 = DAT_00655afe & 0xFFFF;
    iVar5 = rs(DAT_006560f0, iVar13 * 0x20);
    iVar6 = rs(DAT_006560f0, iVar13 * 0x20 + 2);
    iVar7 = s8(DAT_006560f0[iVar13 * 0x20 + 7]);
    bVar4 = FUN_005b89bb(iVar5, iVar6);
    uVar14 = u8(bVar4);
    bVar15 = uVar14 === 10;
    cVar1 = s8(DAT_0064b1bc[u8(DAT_006560f0[iVar13 * 0x20 + 6]) * 0x14 + 0x0E]);
    FUN_005794cf(4, 0);
    FUN_00579260(0x401, cVar1 !== 5 ? 1 : 0);
    FUN_004e4c92(0x401, 0x32, cVar1 !== 5 ? 1 : 0);
    FUN_004e4c92(0x410, 0x34, cVar1 !== 5 ? 1 : 0);
    FUN_004e4c92(0x411, 0x36, cVar1 !== 5 ? 1 : 0);
    FUN_004e4c92(0x412, 0x38, cVar1 !== 5 ? 1 : 0);
    FUN_00579260(0x450, cVar1 === 5 ? 1 : 0);
    // C line 2233: fortress enable
    if (cVar1 === 5 && (iVar8 = FUN_004bd9f0(iVar7, 0x12), iVar8 !== 0)) { local_40 = 0; }
    else { local_40 = 1; }
    FUN_00579260(0x418, local_40);
    // C line 2240: airstrip enable
    if (cVar1 === 5 && (iVar8 = FUN_004bd9f0(iVar7, 0x42), iVar8 !== 0)) { local_44 = 0; }
    else { local_44 = 1; }
    FUN_00579260(0x417, local_44);
    FUN_00579260(0x430, cVar1 === 5 ? 1 : 0);
    FUN_00579260(0x41b, cVar1 !== 5 ? 1 : 0);
    // C line 2249: automation
    iVar8 = FUN_004bd9f0(iVar7, 0xd);
    if (iVar8 === 0 && (DAT_0064b1bc[u8(DAT_006560f0[iVar13 * 0x20 + 6]) * 0x14 + 1] & 1) === 0) {
      local_48 = 1;
    } else { local_48 = 0; }
    FUN_00579260(0x441, local_48);
    FUN_005792e1(0x441, (DAT_0064b1bc[u8(DAT_006560f0[iVar13 * 0x20 + 6]) * 0x14] & 0x01) === 0 ? 1 : 0);
    // C line 2261: airlift
    iVar8 = FUN_004bd9f0(iVar7, 0x42);
    FUN_00579260(0x442, iVar8 === 0 ? 1 : 0);
    iVar8 = FUN_005b8ca6(iVar5, iVar6);
    FUN_005792e1(0x442, iVar8 < 0 ? 1 : 0);
    if (cVar1 === 5) {
      // C line 2266: settler-specific menu logic
      bVar3 = true;
      for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
        uVar9 = FUN_005ae052(s8(DAT_00628350[local_8]) + iVar5);
        cVar2 = s8(DAT_00628360[local_8]);
        iVar8 = FUN_004087c0(uVar9, cVar2 + iVar6);
        if (iVar8 !== 0 && (iVar8 = FUN_005b8ca6(uVar9, cVar2 + iVar6), -1 < iVar8)) {
          bVar3 = false;
        }
      }
      iVar8 = FUN_0043cf76(iVar5, iVar6);
      if (iVar8 < 0) {
        iVar11 = FUN_005b89e4(iVar5, iVar6);
        if (iVar11 === 0 && bVar3) { local_4c = 0; } else { local_4c = 1; }
        FUN_005792e1(0x401, local_4c);
      } else {
        FUN_004e4c92(0x401, 0x33, s8(DAT_0064f340[iVar8 * 0x58 + 9]) > 9 ? 1 : 0);
      }
      uVar10 = FUN_005b94d5(iVar5, iVar6);
      if ((uVar10 & 0x80) === 0) { FUN_005792e1(0x420, 1); }
      bVar4 = FUN_005b94d5(iVar5, iVar6);
      if ((bVar4 & 0x42) === 0x40 || (iVar11 = FUN_005b8d15(iVar5, iVar6), -1 < iVar11) ||
         bVar15 || -1 < iVar8) {
        FUN_005792e1(0x418, 1);
      }
      bVar4 = FUN_005b94d5(iVar5, iVar6);
      if ((bVar4 & 0x42) === 0x40 || (iVar11 = FUN_005b8d15(iVar5, iVar6), -1 < iVar11) ||
         bVar15 || -1 < iVar8) {
        FUN_005792e1(0x417, 1);
      }
      uVar10 = FUN_005b94d5(iVar5, iVar6);
      if ((uVar10 & 0x10) === 0 || (iVar11 = FUN_004bd9f0(iVar7, 0x43), iVar11 === 0)) {
        if (bVar15 || -1 < iVar8 ||
           (uVar10 = FUN_005b94d5(iVar5, iVar6), (uVar10 & 0x10) !== 0) ||
           (iVar11 = FUN_005b8931(iVar5, iVar6),
            (tileRead(iVar11, 0) & 0x80) !== 0 &&
            (iVar11 = FUN_004bd9f0(iVar7, 7), iVar11 === 0))) {
          local_54 = 1;
        } else { local_54 = 0; }
        FUN_005792e1(0x410, local_54);
      } else {
        uVar10 = FUN_005b94d5(iVar5, iVar6);
        if ((uVar10 & 0x20) !== 0 || -1 < iVar8 || bVar15) { local_50 = 1; }
        else { local_50 = 0; }
        FUN_004e4c92(0x410, 0x35, local_50);
      }
      // C line 2326: irrigate/mine/transform menu labels
      iVar11 = s8(DAT_00627cc0[uVar14 * 0x18 + 0x0E]);
      if (iVar11 < 0) {
        uVar10 = FUN_005b94d5(iVar5, iVar6);
        if ((uVar10 & 4) === 0) {
          if (iVar11 === -1 || bVar15 || -1 < iVar8) { local_5c = 1; } else { local_5c = 0; }
          FUN_005792e1(0x411, local_5c);
        } else {
          iVar11 = FUN_004bd9f0(iVar7, 0x46);
          if (iVar11 === 0 || bVar15 || -1 < iVar8) { local_58 = 1; } else { local_58 = 0; }
          FUN_004e4c92(0x411, 0x3d, local_58);
        }
      } else {
        FUN_004271e8(0, DAT_00627cc0[iVar11 * 0x18 + 4]);
        FUN_004e4c92(0x411, 0x37, 0);
      }
      iVar11 = s8(DAT_00627cc0[uVar14 * 0x18 + 0x0F]);
      if (iVar11 < 0) {
        if (iVar11 === -1 || bVar15 || -1 < iVar8) { local_60 = 1; } else { local_60 = 0; }
        FUN_005792e1(0x412, local_60);
      } else {
        FUN_004271e8(0, DAT_00627cc0[iVar11 * 0x18 + 4]);
        FUN_004e4c92(0x412, 0x39, 0);
      }
      iVar7 = FUN_004bfe5a(iVar7, -1, 1);
      FUN_00579260(0x413, iVar7 === 0 ? 1 : 0);
      if (s8(DAT_00627cc0[uVar14 * 0x18 + 0x0D]) < 0) {
        FUN_005792e1(0x413, 1);
      } else {
        FUN_004271e8(0, DAT_00627cc0[s8(DAT_00627cc0[uVar14 * 0x18 + 0x0D]) * 0x18 + 4]);
        FUN_004e4c92(0x413, 0x3c, DAT_006560f0[iVar13 * 0x20 + 6] !== 1 ? 1 : 0);
      }
    } else {
      FUN_005792e1(0x413, 1); FUN_005792e1(0x418, 1); FUN_005792e1(0x420, 1);
    }
    // C line 2383: home city
    iVar7 = FUN_005b8ca6(iVar5, iVar6);
    if (iVar7 < 0) { FUN_004e4c92(0x445, 0x3b, 0); }
    else {
      iVar5 = FUN_005b8ca6(iVar5, iVar6);
      FUN_004e4c92(0x445, 0x3a, iVar5 < 0 ? 1 : 0);
    }
    // C line 2391: clean pollution
    FUN_005792e1(0x430, DAT_0064b1bc[u8(DAT_006560f0[iVar13 * 0x20 + 6]) * 0x14 + 0x0D] === 0 ? 1 : 0);
    FUN_00579260(0x421, cVar1 === 5 ? 1 : 0);
    if (DAT_0064b1bc[u8(DAT_006560f0[iVar13 * 0x20 + 6]) * 0x14 + 8] === 0 ||
       s8(DAT_0064b1bc[u8(DAT_006560f0[iVar13 * 0x20 + 6]) * 0x14 + 5]) !== 0) {
      FUN_005792e1(0x421, 1);
    }
  }
  // C line 2399: cheat/scenario menus
  if ((DAT_00655ae8 & 0x8000) === 0 || DAT_00655b02 !== 0) { local_64 = 1; }
  else { local_64 = 0; }
  FUN_005794cf(7, local_64);
  if ((DAT_00655ae8 & 0x8000) === 0 || DAT_00655b02 !== 0) { local_68 = 0; }
  else { local_68 = 1; }
  FUN_0057940d(0x701, local_68);
  FUN_005792e1(0x701, DAT_00655b02 !== 0 && DAT_0062eb30 === 0 ? 1 : 0);
  if (2 < DAT_00655b02 && DAT_006ad558[0] !== DAT_006d1da0) {
    FUN_005794cf(4, 1);
  }
  // C line 2417: scenario editor menu
  if ((DAT_00655ae8 & 0x8000) === 0 || DAT_00655b02 !== 0 || (DAT_00655af0 & 0x80) === 0) {
    local_6c = 0;
  } else { local_6c = 1; }
  FUN_0057940d(0x801, local_6c);
  if ((DAT_00655ae8 & 0x8000) === 0 || DAT_00655b02 !== 0 ||
     (DAT_00655af0 & 0x80) === 0) {
    local_70 = 1;
  } else { local_70 = 0; }
  FUN_005794cf(8, local_70);
  FUN_005792e1(0x801, DAT_00655b02 !== 0 ? 1 : 0);
  FUN_00578f2c(0);
  return;
}

// manage_window_wrapper
// Source: decompiled/block_004E0000.c FUN_004e7240 (48 bytes)
export function FUN_004e7240() {
  // let in_ECX = 0; // DEVIATION: MFC (in_ECX this pointer)
  // manage_window_C692(ri(in_ECX, 8)); // DEVIATION: MFC — ShowWindow SW_RESTORE
}

// acquire_wonder
export function FUN_004e7270(param_1, param_2, param_3, param_4, param_5) {
  let iVar2, iVar3, local_c;

  local_c = 0;
  DAT_006ad8e8 = 1;
  if (DAT_00655b02 < 3 || (FUN_00421f40() !== 0)) {
    if (s16(DAT_00655be6, param_3 * 2) === -1) {
      local_c = 1;
      DAT_00655be6[param_3 * 2] = param_2 & 0xff;
      DAT_00655be6[param_3 * 2 + 1] = (param_2 >> 8) & 0xff;
      let flagVal = (DAT_0064f344[param_2 * 0x58] | (DAT_0064f344[param_2 * 0x58+1]<<8) | (DAT_0064f344[param_2 * 0x58+2]<<16) | (DAT_0064f344[param_2 * 0x58+3]<<24)) | 0x100;
      DAT_0064f344[param_2 * 0x58] = flagVal & 0xff;
      DAT_0064f344[param_2 * 0x58+1] = (flagVal >> 8) & 0xff;
      DAT_0064f344[param_2 * 0x58+2] = (flagVal >> 16) & 0xff;
      DAT_0064f344[param_2 * 0x58+3] = (flagVal >> 24) & 0xff;
      FUN_0043d289(param_2, param_5, 1);
      if (((1 << (u8(param_1) & 0x1f)) & DAT_00655b0b) !== 0 || 0x22 < param_5) {
        DAT_0064f35c[param_2 * 0x58] = 0;
        DAT_0064f35c[param_2 * 0x58 + 1] = 0;
      }
    }
    if (2 < DAT_00655b02 && local_c !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8e8 = 0;
  } else {
    DAT_006ad8e8 = 0;
    DAT_006c9100 = -2;
    FUN_0046b14d(0x47, 0, param_1, param_2, param_3, param_4, param_5, 0, 0, 0);
    iVar2 = FUN_00421bb0();
    while (DAT_006c9100 === -2) {
      iVar3 = FUN_00421bb0();
      if (iVar3 - iVar2 >= 0xe10) break;
      FUN_0047e94e(1, 1);
    }
    if (DAT_006c9100 === -2) {
      debug_log("Acquire Wonder: Connection to server timeout");
      local_c = 0;
    } else {
      while (DAT_006c8fac !== 0 || (local_c = DAT_006c9100, DAT_006c8fa0 !== 0)) {
        FUN_0047e94e(1, 0);
      }
    }
  }
  return local_c;
}

// get_attitude_level
export function FUN_004e7458(param_1, param_2) {
  if (param_2 < 0) {
    if (param_2 < -0x22) { return 2; }
    else { return 1; }
  }
  return 0;
}

// set_city_attitude_data
export function FUN_004e7492(param_1) {
  DAT_006a65a4 = FUN_004e7458(param_1, s8(DAT_0064f379[param_1 * 0x58]));
  DAT_006a6528 = s16(DAT_0064f35c, param_1 * 0x58);
}

// get_rush_buy_cost
export function FUN_004e74df(param_1, param_2) {
  let iVar1;
  let uVar2 = DAT_006a6528;

  if (DAT_00655b08 !== 0) {
    iVar1 = FUN_004e7458(param_1, param_2);
    uVar2 = DAT_006a6528;
    if (iVar1 !== DAT_006a65a4) {
      uVar2 = DAT_006a6528 - ((DAT_0064bcda * (DAT_006a6528 & 0xffff)) / 100) | 0;
    }
  }
  return uVar2;
}

// city_set_specialist_type
export function FUN_004e7549(param_1, param_2, param_3) {
  if (param_2 < 0x10) {
    let bVar1 = (param_2 * 2) & 0xff;
    let off = param_1 * 0x58;
    let val = DAT_0064f356[off] | (DAT_0064f356[off+1]<<8) | (DAT_0064f356[off+2]<<16) | (DAT_0064f356[off+3]<<24);
    val = val & ~(3 << (bVar1 & 0x1f));
    val = val | (param_3 << (bVar1 & 0x1f));
    DAT_0064f356[off] = val & 0xff;
    DAT_0064f356[off+1] = (val >> 8) & 0xff;
    DAT_0064f356[off+2] = (val >> 16) & 0xff;
    DAT_0064f356[off+3] = (val >> 24) & 0xff;
  }
}

// city_get_specialist_type
export function FUN_004e75a6(param_1, param_2) {
  if (param_2 < 0x10) {
    let off = param_1 * 0x58;
    let val = DAT_0064f356[off] | (DAT_0064f356[off+1]<<8) | (DAT_0064f356[off+2]<<16) | (DAT_0064f356[off+3]<<24);
    return (val >> ((param_2 * 2) & 0x1f)) & 3;
  }
  return 1;
}

// count_specialists_of_type
export function FUN_004e75ea(param_1, param_2) {
  let local_c = 0;
  for (let local_8 = 0; local_8 < 0x10; local_8 = local_8 + 1) {
    let iVar1 = FUN_004e75a6(param_1, local_8);
    if (iVar1 === param_2) {
      local_c = local_c + 1;
    }
  }
  return local_c;
}

// evaluate_city_tiles (unit movement check per tile)
export function FUN_004e7641(param_1) {
  let bVar1, iVar2, uVar3, iVar4, iVar6, uVar7;
  let local_18, local_8;

  bVar1 = DAT_0064f348[param_1 * 0x58];
  iVar2 = s8(bVar1);
  local_8 = 0;
  while (true) {
    if (0x18 < local_8) return;
    uVar3 = FUN_005ae052(s8(DAT_00628370[local_8]) + s16(DAT_0064f340, param_1 * 0x58));
    iVar4 = s16(DAT_0064f342, param_1 * 0x58) + s8(DAT_006283a0[local_8]);
    let pbVar5 = local_8;
    DAT_006a6530[pbVar5] = 0;
    iVar6 = FUN_004087c0(uVar3, iVar4);
    if (iVar6 === 0 || 0x14 < local_8) {
      DAT_006a6530[pbVar5] = DAT_006a6530[pbVar5] | 1;
    } else {
      iVar6 = FUN_005b8b65(uVar3, iVar4, iVar2);
      if (iVar6 === 0) {
        DAT_006a6530[pbVar5] = DAT_006a6530[pbVar5] | 1;
      } else {
        if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 && DAT_0062edf8 !== 0) {
          uVar7 = FUN_005b94d5(uVar3, iVar4);
          if ((uVar7 & 0x80) !== 0) {
            DAT_00655b10 = DAT_00655b10 + 1;
          }
        }
        local_18 = FUN_005b2e69(uVar3, iVar4);
        let didGoto = false;
        while (true) {
          if (local_18 < 0 || s8(DAT_006560f7[local_18 * 0x20]) === iVar2 ||
              (FUN_005b89e4(uVar3, iVar4) !== 0 ||
               ((DAT_0064c6c0[s8(DAT_006560f7[local_18 * 0x20]) * 4 + iVar2 * 0x594] & 8) !== 0))) {
            didGoto = true;
            break;
          }
          if (DAT_0064b1c4[u8(DAT_006560f6[local_18 * 0x20]) * 0x14] !== 0) break;
          local_18 = FUN_005b2c82(local_18);
        }
        if (!didGoto) {
          DAT_006a6530[pbVar5] = DAT_006a6530[pbVar5] | 4;
          if ((DAT_00655b0b & (1 << (DAT_006560f7[local_18 * 0x20] & 0x1f))) !== 0) {
            DAT_006a6530[pbVar5] = DAT_006a6530[pbVar5] | 0x20;
          }
        }
        // LAB_004e7898
        iVar4 = FUN_005b8ca6(uVar3, iVar4);
        if (iVar4 >= 0) {
          DAT_006a6530[pbVar5] = DAT_006a6530[pbVar5] | 8;
        }
      }
    }
    local_8 = local_8 + 1;
  }
}

// city_has_tile_flag
export function FUN_004e78ce(param_1, param_2) {
  let off = param_1 * 0x58;
  let val = DAT_0064f370[off] | (DAT_0064f370[off+1]<<8) | (DAT_0064f370[off+2]<<16) | (DAT_0064f370[off+3]<<24);
  return (val & (1 << (param_2 & 0x1f))) !== 0 ? 1 : 0;
}

// city_set_tile_flag
export function FUN_004e790c(param_1, param_2, param_3) {
  let uVar1 = 1 << (param_2 & 0x1f);
  let off = param_1 * 0x58;
  let val = DAT_0064f370[off] | (DAT_0064f370[off+1]<<8) | (DAT_0064f370[off+2]<<16) | (DAT_0064f370[off+3]<<24);
  if (param_3 === 0) {
    val = val & ~uVar1;
  } else {
    val = val | uVar1;
  }
  DAT_0064f370[off] = val & 0xff;
  DAT_0064f370[off+1] = (val >> 8) & 0xff;
  DAT_0064f370[off+2] = (val >> 16) & 0xff;
  DAT_0064f370[off+3] = (val >> 24) & 0xff;
}

// Source: decompiled/block_004E0000.c FUN_004e7967 (1048 bytes)
export function FUN_004e7967(param_1) {
  let cVar1, cVar2, sVar3, sVar4, iVar5, iVar6, iVar7, iVar8;
  let local_2c, local_1c, local_8;

  iVar5 = s16(DAT_0064f340, param_1 * 0x58);
  iVar6 = s16(DAT_0064f342, param_1 * 0x58);
  iVar7 = FUN_0043d20a(param_1, 1);
  if (iVar7 === 0) {
    DAT_006a6588 = 0x20;
  } else {
    DAT_006a6588 = 0;
  }
  DAT_006a6600 = -1;
  for (local_2c = 0; local_2c < DAT_00655b18; local_2c = local_2c + 1) {
    if (s32(DAT_0064f394, local_2c * 0x58) !== 0 && local_2c !== param_1) {
      iVar7 = FUN_005ae31d(s16(DAT_0064f340, param_1 * 0x58),
                            s16(DAT_0064f342, param_1 * 0x58),
                            s16(DAT_0064f340, local_2c * 0x58),
                            s16(DAT_0064f342, local_2c * 0x58));
      if (DAT_0064f348[local_2c * 0x58] === DAT_0064f348[param_1 * 0x58] &&
          (iVar8 = FUN_0043d20a(local_2c, 1), iVar8 !== 0)) {
        if (iVar7 < DAT_006a6588 || DAT_006a6600 < 0) {
          DAT_006a6600 = local_2c;
        }
        if (iVar7 < DAT_006a6588) {
          DAT_006a6588 = iVar7;
        }
      }
      if (iVar7 < 6) {
        for (local_8 = 0; local_8 < 0x15; local_8 = local_8 + 1) {
          iVar7 = FUN_004e78ce(local_2c, local_8);
          if (iVar7 !== 0 || local_8 === 0x14) {
            sVar3 = s16(DAT_0064f340, local_2c * 0x58);
            cVar1 = s8(DAT_00628370[local_8]);
            sVar4 = s16(DAT_0064f342, local_2c * 0x58);
            cVar2 = s8(DAT_006283a0[local_8]);
            iVar7 = FUN_005ae31d(iVar5, iVar6, sVar3 + cVar1, sVar4 + cVar2);
            if (iVar7 < 3) {
              for (local_1c = 0; local_1c < 0x14; local_1c = local_1c + 1) {
                if (s8(DAT_00628370[local_1c]) === (sVar3 + cVar1) - iVar5 &&
                    s8(DAT_006283a0[local_1c]) === (sVar4 + cVar2) - iVar6) {
                  DAT_006a6530[local_1c] = DAT_006a6530[local_1c] | 0x10;
                }
              }
            }
          }
        }
      }
    }
  }
  DAT_006a6574 = (DAT_006a6588 === 0) ? 1 : 0;
  if (DAT_006a6574 !== 0 &&
      (iVar7 = FUN_004bd9f0(s8(DAT_0064f348[param_1 * 0x58]), 0x43), iVar7 !== 0)) {
    DAT_006a6574 = DAT_006a6574 + 1;
  }
  if (DAT_006a6600 >= 0 && param_1 !== DAT_006a6600) {
    iVar7 = FUN_0043d20a(param_1, 0x20);
    if (iVar7 !== 0 && (iVar7 = FUN_0043d20a(DAT_006a6600, 0x20), iVar7 !== 0)) {
      DAT_006a6574 = 1;
    }
    iVar7 = FUN_005b8a81(iVar5, iVar6);
    sVar3 = s16(DAT_0064f340, DAT_006a6600 * 0x58);
    sVar4 = s16(DAT_0064f342, DAT_006a6600 * 0x58);
    iVar8 = FUN_005b8a81(sVar3, sVar4);
    if (iVar8 === iVar7) {
      DAT_006a6574 = FUN_00488a45(s8(DAT_0064f348[param_1 * 0x58]), iVar5, iVar6, sVar3, sVar4);
    }
  }
}

// check_city_support_limit
export function FUN_004e7d7f(param_1, param_2, param_3) {
  DAT_006a660c = DAT_006a660c + 1;
  switch (param_3) {
    case 0: case 1:
      if (s8(DAT_0064f349[param_1 * 0x58]) < DAT_006a660c) {
        DAT_006a6568 = DAT_006a6568 + 1;
        return DAT_006a6568;
      }
      break;
    case 2:
      if (DAT_0064bcd5 < DAT_006a660c) {
        DAT_006a6568 = DAT_006a6568 + 1;
        return DAT_006a6568;
      }
      break;
    case 3:
      if (DAT_0064bcd6 < DAT_006a660c) {
        DAT_006a6568 = DAT_006a6568 + 1;
        return DAT_006a6568;
      }
      break;
    case 4:
      if ((DAT_0064b1bd[u8(DAT_006560f6[param_2 * 0x20]) * 0x14] & 8) === 0 &&
          DAT_0064bcd7 < DAT_006a660c) {
        DAT_006a6568 = DAT_006a6568 + 1;
        return DAT_006a6568;
      }
      break;
    default:
      DAT_006a6568 = DAT_006a6568 + 1;
      return DAT_006a6568;
  }
  return 0;
}

// calc_unit_support_cost
export function FUN_004e7eb1(param_1, param_2) {
  let bVar1 = DAT_0064bccd;
  if (2 < u8(DAT_0064c6b5[param_2 * 0x594])) {
    bVar1 = DAT_0064bcce;
  }
  let local_c = bVar1;
  DAT_006a6608 = local_c;
  DAT_006a6560 = DAT_0064bccb;
  if (((1 << (u8(param_2) & 0x1f)) & DAT_00655b0b) === 0) {
    DAT_006a6560 = -(DAT_00655b08) + 0xd;
    if (DAT_00655b08 < 3) {
      DAT_006a6560 = -(DAT_00655b08) + 0xe;
    }
    if (DAT_00655b08 === 0) {
      DAT_006a6560 = DAT_006a6560 + 1;
    }
    if (200 < DAT_00655af8 && 1 < DAT_00655b08 &&
        (DAT_00655b0b & (1 << (DAT_00655c31 & 0x1f))) !== 0) {
      let local_8 = 2;
      if (DAT_00655c14 !== -1 && (~DAT_00655b0b & s8(DAT_00655bcb)) !== 0) {
        local_8 = 1;
        if ((DAT_00655b0b & DAT_00655bcb) === 0 || (DAT_00655b0b & DAT_00655bbc) === 0) {
          local_8 = 0;
        }
      }
      let iVar2 = local_8;
      if (DAT_00655c18 !== -1 && (~DAT_00655b0b & s8(DAT_00655bce)) !== 0) {
        iVar2 = local_8 + -1;
        if ((DAT_00655b0b & DAT_00655bce) === 0) {
          iVar2 = local_8 + -2;
        }
      }
      local_8 = iVar2;
      iVar2 = FUN_005adfa0(local_8, 0, 2);
      DAT_006a6560 = DAT_006a6560 - iVar2;
    }
    if (DAT_0064bccb !== 10) {
      DAT_006a6560 = ((DAT_0064bccb * DAT_006a6560) / 10) | 0;
      if ((DAT_006a6560 & 1) !== 0) {
        DAT_006a6560 = DAT_006a6560 + 1;
      }
    }
  }
}

// Source: decompiled/block_004E0000.c FUN_004e80b1 (1497 bytes)
export function FUN_004e80b1(param_1) {
  let bVar2, iVar3, iVar4, iVar5;
  let local_18, local_c, local_8;

  let bVar1_owner = DAT_0064f348[param_1 * 0x58];
  iVar3 = s8(bVar1_owner);
  let uVar1 = DAT_0064c6b5[iVar3 * 0x594];
  FUN_004e7eb1(param_1, iVar3);
  DAT_006a657c = DAT_0064bccc;
  if (((1 << (bVar1_owner & 0x1f)) & DAT_00655b0b) === 0) {
    DAT_006a657c = 0xd - DAT_00655b08;
    if (DAT_00655b08 === 0) {
      DAT_006a657c = 0xe;
    }
    if (DAT_00655b08 < 3) {
      DAT_006a657c = DAT_006a657c + 1;
    }
    if (199 < DAT_00655af8 && 1 < DAT_00655b08 &&
        (DAT_00655b0b & (1 << (DAT_00655c31 & 0x1f))) !== 0) {
      local_8 = 2;
      if (DAT_00655c14 !== -1 && (~DAT_00655b0b & s8(DAT_00655bcb)) !== 0) {
        local_8 = 1;
        if ((DAT_00655b0b & DAT_00655bcb) === 0 || (DAT_00655b0b & DAT_00655bbc) === 0) {
          local_8 = 0;
        }
      }
      iVar4 = local_8;
      if (DAT_00655c18 !== -1 && (~DAT_00655b0b & s8(DAT_00655bce)) !== 0) {
        iVar4 = local_8 + -1;
        if ((DAT_00655b0b & DAT_00655bce) === 0) {
          iVar4 = local_8 + -2;
        }
      }
      local_8 = iVar4;
      iVar4 = FUN_005adfa0(local_8, 0, 2);
      DAT_006a657c = DAT_006a657c - iVar4;
    }
    if (DAT_0064bccc !== 10) {
      DAT_006a657c = ((DAT_0064bccc * DAT_006a657c) / 10) | 0;
      if ((DAT_006a657c & 1) !== 0) {
        DAT_006a657c = DAT_006a657c + 1;
      }
    }
  }
  DAT_006a6568 = 0;
  DAT_006a660c = 0;
  DAT_006a65d8 = 0;
  DAT_006a65e4 = 0;
  DAT_006a655c = 0;
  local_18 = 0;
  while (true) {
    if (DAT_00655b16 <= local_18) {
      return;
    }
    if (s32(DAT_0065610a, local_18 * 0x20) !== 0 &&
        s8(DAT_006560f7[local_18 * 0x20]) === iVar3 &&
        u8(DAT_00656100[local_18 * 0x20]) === param_1) {
      w16(DAT_006560f4, local_18 * 0x20, u16(DAT_006560f4, local_18 * 0x20) & 0xf3ff);
      if (s8(DAT_0064b1ca[u8(DAT_006560f6[local_18 * 0x20]) * 0x14]) < 6) {
        iVar4 = FUN_004e7d7f(param_1, local_18, uVar1);
        if (iVar4 !== 0) {
          w16(DAT_006560f4, local_18 * 0x20, u16(DAT_006560f4, local_18 * 0x20) | 0x800);
        }
        iVar4 = DAT_006a65e4;
        if (DAT_0064b1c4[u8(DAT_006560f6[local_18 * 0x20]) * 0x14] !== 0) {
          if (DAT_0064b1c1[u8(DAT_006560f6[local_18 * 0x20]) * 0x14] === 1) {
            if (s8(DAT_0064b1ca[u8(DAT_006560f6[local_18 * 0x20]) * 0x14]) !== 3) {
              DAT_006a65e4 = DAT_006a65e4 + 1;
            }
            if (s16(DAT_006560f0, local_18 * 0x20) === s16(DAT_0064f340, param_1 * 0x58) ||
                s16(DAT_006560f2, local_18 * 0x20) === s16(DAT_0064f342, param_1 * 0x58)) {
              DAT_006a655c = DAT_006a655c + 1;
            }
          } else if (s16(DAT_006560f0, local_18 * 0x20) === s16(DAT_0064f340, param_1 * 0x58) &&
                     s16(DAT_006560f2, local_18 * 0x20) === s16(DAT_0064f342, param_1 * 0x58)) {
            DAT_006a655c = DAT_006a655c + 1;
          } else {
            iVar5 = FUN_005b8ca6(s16(DAT_006560f0, local_18 * 0x20),
                                  s16(DAT_006560f2, local_18 * 0x20));
            if (iVar5 < 0) {
              DAT_006a65e4 = DAT_006a65e4 + 1;
              bVar2 = FUN_005b94d5(s16(DAT_006560f0, local_18 * 0x20),
                                    s16(DAT_006560f2, local_18 * 0x20));
              if ((bVar2 & 0x42) === 0x40) {
                for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
                  if (s32(DAT_0064f394, local_c * 0x58) !== 0 &&
                      s8(DAT_0064f348[local_c * 0x58]) === iVar3 &&
                      (iVar5 = FUN_005ae1b0(s16(DAT_006560f0, local_18 * 0x20),
                                             s16(DAT_006560f2, local_18 * 0x20),
                                             s16(DAT_0064f340, local_c * 0x58),
                                             s16(DAT_0064f342, local_c * 0x58)),
                       iVar5 < 4)) {
                    DAT_006a65e4 = DAT_006a65e4 + -1;
                    break;
                  }
                }
              }
            }
          }
        }
        if (DAT_006a65e4 !== iVar4) {
          w16(DAT_006560f4, local_18 * 0x20, u16(DAT_006560f4, local_18 * 0x20) | 0x400);
        }
        if (s8(DAT_0064b1ca[u8(DAT_006560f6[local_18 * 0x20]) * 0x14]) === 5) {
          DAT_006a65d8 = DAT_006a65d8 + 1;
        }
      }
    }
    local_18 = local_18 + 1;
  }
}

// Source: decompiled/block_004E0000.c FUN_004e868f (1528 bytes)
export function FUN_004e868f(param_1, param_2, param_3) {
  let bVar1, iVar2, uVar3, iVar4, iVar5, uVar7;
  let local_10;

  iVar2 = s8(DAT_0064f348[param_1 * 0x58]);
  uVar3 = FUN_005ae052(s16(DAT_0064f340, param_1 * 0x58) + s8(DAT_00628370[param_2]));
  iVar4 = s16(DAT_0064f342, param_1 * 0x58) + s8(DAT_006283a0[param_2]);
  iVar5 = FUN_004087c0(uVar3, iVar4);
  if (iVar5 === 0) {
    local_10 = 0;
  } else {
    if (DAT_0062edf4 !== 0) {
      FUN_005b9c49(uVar3, iVar4, iVar2, 1);
      iVar5 = FUN_005b8da4(uVar3, iVar4);
      if (iVar5 < 0) {
        FUN_005b99e8(uVar3, iVar4, iVar2, 1);
      }
    }
    bVar1 = FUN_005b89bb(uVar3, iVar4);
    uVar7 = u8(bVar1);
    iVar5 = FUN_005b8ee1(uVar3, iVar4);
    local_10 = s8(DAT_00627cca[(iVar5 * 0xb + uVar7) * 0x18 + param_3]);
    if (DAT_00655b02 !== 0 && DAT_00654fac !== 0) {
      local_10 = local_10 << 1;
    }
    bVar1 = FUN_005b94d5(uVar3, iVar4);
    if (uVar7 === 10) {
      if (param_3 === 0 && (iVar5 = FUN_0043d20a(param_1, 0x1e), iVar5 !== 0)) {
        local_10 = local_10 + 1;
      }
      if (param_3 === 1 && (iVar5 = FUN_0043d20a(param_1, 0x1f), iVar5 !== 0)) {
        local_10 = local_10 + 1;
      }
      if (param_3 === 2 && (iVar5 = FUN_00453e18(2), iVar5 === param_1)) {
        local_10 = local_10 + 1;
      }
    } else if (param_3 === 0) {
      if ((bVar1 & 6) === 0) {
        FUN_004e8c8c(param_1, iVar2, 0, uVar3, iVar4);
      } else {
        local_10 = local_10 + s8(DAT_00627cd0[uVar7 * 0x18]);
        iVar5 = FUN_0043d20a(param_1, 0x18);
        if (iVar5 !== 0) {
          if ((bVar1 & 10) === 0) {
            FUN_004e8c8c(param_1, iVar2, 0, uVar3, iVar4);
          } else {
            local_10 = local_10 + (local_10 >> 1);
          }
        }
      }
    } else if (param_3 === 1) {
      if (((bVar1 & 0xc) === 8) || ((bVar1 & 2) !== 0 && DAT_00627cd0[uVar7 * 0x18] === 0)) {
        local_10 = local_10 + s8(DAT_00627cd1[uVar7 * 0x18]);
      } else if ((bVar1 & 0xc) === 0) {
        FUN_004e8c8c(param_1, iVar2, 1, uVar3, iVar4);
      }
      if (uVar7 === 2 && (iVar5 = FUN_0040bcb0(uVar3, iVar4), iVar5 === 0)) {
        local_10 = 0;
      }
      if (param_2 === 0x14 && local_10 === 0) {
        local_10 = 1;
      }
    } else if (param_3 === 2) {
      let pbVar6 = FUN_005b8931(uVar3, iVar4);
      if ((pbVar6 & 0x80) !== 0) {
        local_10 = local_10 + 1;
      }
      if ((bVar1 & 0x12) === 0) {
        if (uVar7 < 3 || local_10 !== 0) {
          FUN_004e8db5(param_1, iVar2, uVar3, iVar4);
        }
      } else if (uVar7 < 3 || local_10 !== 0) {
        local_10 = local_10 + 1;
      }
      if (local_10 !== 0 && (iVar5 = FUN_00453e18(2), iVar5 === param_1)) {
        local_10 = local_10 + 1;
      }
    }
    if (param_3 === 1 && (iVar5 = FUN_00453e18(8), iVar5 === param_1)) {
      local_10 = local_10 + 1;
    }
    if (param_3 === 1) {
      if ((bVar1 & 0x20) === 0 &&
          ((bVar1 & 2) === 0 || (iVar5 = FUN_004bd9f0(iVar2, 0x43), iVar5 === 0))) {
        if ((bVar1 & 0x22) === 0 && (iVar5 = FUN_004bd9f0(iVar2, 0x43), iVar5 !== 0) &&
            uVar7 !== 10) {
          FUN_004e8db5(param_1, iVar2, uVar3, iVar4);
        }
      } else {
        local_10 = local_10 + (local_10 >> 1);
      }
    }
    if (2 < local_10 && (DAT_0064f344[param_1 * 0x58] & 2) === 0) {
      if (DAT_0062edf8 !== 0) {
        let v = s16(DAT_0064ca76, iVar2 * 0x594);
        w16(DAT_0064ca76, iVar2 * 0x594, v + -1);
      }
      if (u8(DAT_0064c6b5[iVar2 * 0x594]) < 2) {
        local_10 = local_10 + -1;
      }
    }
    if (local_10 !== 0 && param_3 === 2) {
      if (DAT_0062edf8 !== 0) {
        let v1 = s16(DAT_0064ca7e, iVar2 * 0x594);
        w16(DAT_0064ca7e, iVar2 * 0x594, v1 + 1);
        let v2 = s16(DAT_0064ca80, iVar2 * 0x594);
        w16(DAT_0064ca80, iVar2 * 0x594, v2 + 1);
      }
      let we = (DAT_0064f344[param_1 * 0x58] | (DAT_0064f344[param_1 * 0x58+1]<<8) | (DAT_0064f344[param_1 * 0x58+2]<<16) | (DAT_0064f344[param_1 * 0x58+3]<<24));
      let govLevel = u8(DAT_0064c6b5[iVar2 * 0x594]);
      let thresh = (((-((we & 2) === 0 ? 1 : 0)) & 3) + 2) & 0xff;
      if (thresh <= govLevel) {
        local_10 = local_10 + 1;
      }
    }
    if (param_3 === 2 && (bVar1 & 0x12) !== 0 &&
        (iVar2 = FUN_0043d20a(param_1, 0x19), iVar2 !== 0)) {
      local_10 = local_10 + ((local_10 / 2) | 0);
    }
    if ((bVar1 & 0x80) !== 0) {
      local_10 = (local_10 + 1) >> 1;
      DAT_006a65d4 = DAT_006a65d4 + 1;
      DAT_0062ee0c = 1;
      DAT_006a65e0 = uVar3;
      DAT_006a65e8 = iVar4;
    }
    if (local_10 < 1) {
      local_10 = 0;
    }
  }
  return local_10;
}

// check_tile_improvement_needed
export function FUN_004e8c8c(param_1, param_2, param_3, param_4, param_5) {
  if (DAT_0062edf4 !== 0 && DAT_0062edf8 !== 0 && DAT_0062ee0c === 0) {
    let bVar1 = FUN_005b89bb(param_4, param_5);
    let uVar3 = u8(bVar1);
    if (s8(DAT_00627cce[uVar3 * 0x18 + param_3]) !== -1 &&
        s8(DAT_00627cd4[uVar3 * 0x18 + param_3]) !== 0 &&
        (param_3 !== 0 || FUN_0058c56c(param_4, param_5) !== 0)) {
      let uVar4 = u8(DAT_0064c6b5[param_2 * 0x594]);
      if (u8(DAT_0064c6b5[param_2 * 0x594]) < 2) { uVar4 = 1; }
      if (s8(DAT_00627cd4[uVar3 * 0x18 + param_3]) <= uVar4) {
        DAT_006a65d4 = DAT_006a65d4 + 1;
        DAT_0062ee0c = 1;
        DAT_006a65e0 = param_4;
        DAT_006a65e8 = param_5;
      }
    }
  }
}

// check_road_needed_for_trade
// Source: decompiled/block_004E0000.c FUN_004e8db5 (152 bytes)
export function FUN_004e8db5(param_1, param_2, param_3, param_4) {
  if (DAT_0062edf4 !== 0 && DAT_0062edf8 !== 0 && DAT_0062ee0c === 0) {
    // C: pbVar1 = FUN_005b8931(param_3, param_4); (*pbVar1 & 0x80) == 0
    let iVar2 = FUN_005b8931(param_3, param_4);
    if ((tileRead(iVar2, 0) & 0x80) === 0 || FUN_004bd9f0(param_2, 7) !== 0) {
      DAT_0062ee0c = 1;
      DAT_006a65e0 = param_3;
      DAT_006a65e8 = param_4;
    }
  }
}

// Source: decompiled/block_004E0000.c FUN_004e8e4d (130 bytes)
// NOTE: C code uses (&DAT_006a65b8)[i] and (&DAT_006a65c8)[i] which alias
// adjacent globals: b8/bc/c0 and c8/cc/d0. Unrolled to use explicit scalars.
export function FUN_004e8e4d(param_1, param_2, param_3) {
  DAT_0062edf4 = param_3;
  // local_8 = 0: food
  DAT_006a65b8 = FUN_004e868f(param_1, param_2, 0);
  if (DAT_0062edf4 !== 0) {
    DAT_006a65c8 = DAT_006a65c8 + DAT_006a65b8;
  }
  // local_8 = 1: shields
  DAT_006a65bc = FUN_004e868f(param_1, param_2, 1);
  if (DAT_0062edf4 !== 0) {
    DAT_006a65cc = DAT_006a65cc + DAT_006a65bc;
  }
  // local_8 = 2: trade
  DAT_006a65c0 = FUN_004e868f(param_1, param_2, 2);
  if (DAT_0062edf4 !== 0) {
    DAT_006a65d0 = DAT_006a65d0 + DAT_006a65c0;
  }
  DAT_0062edf4 = 0;
}

// city_clear_all_improvements
export function FUN_004e8ecf(param_1) {
  let local_c = 0;
  for (let local_8 = 0; local_8 < 0x14; local_8 = local_8 + 1) {
    let uVar1 = FUN_004f3d30(param_1, local_8);
    local_c = local_c | (uVar1 & 0x20);
    if (uVar1 !== 0) {
      FUN_004e790c(param_1, local_8, 0);
    }
  }
  return local_c;
}

// Source: decompiled/block_004E0000.c FUN_004e8f42 (2002 bytes)
export function FUN_004e8f42(param_1) {
  let bVar1, bVar3, iVar4, iVar5, iVar6;
  let local_80, local_7c, local_6c, local_68, local_64, local_60, local_5c;
  let aiStack_58 = new Array(20);
  let local_8;

  local_7c = 0;
  DAT_006a65dc = 0;
  bVar1 = DAT_0064f348[param_1 * 0x58];
  DAT_006a654c = s8(DAT_0064f349[param_1 * 0x58]) + 1;
  local_60 = (DAT_0064f370[param_1*0x58] | (DAT_0064f370[param_1*0x58+1]<<8) | (DAT_0064f370[param_1*0x58+2]<<16) | (DAT_0064f370[param_1*0x58+3]<<24)) >>> 0x1a;
  if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0) {
    if ((DAT_0064f344[param_1 * 0x58] & 1) === 0) {
      if (DAT_0062edfc !== 0 && local_60 !== 0) {
        if ((DAT_0064f345[param_1 * 0x58] & 0x40) === 0) {
          local_60 = local_60 - 1;
        } else {
          let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) | 0x8000;
          w32(DAT_0064f344, param_1 * 0x58, ff);
        }
      }
    } else {
      w32(DAT_0064f370, param_1 * 0x58, 0);
    }
  }
  if (local_60 === 0) {
    let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) & 0xffff7fff;
    w32(DAT_0064f344, param_1 * 0x58, ff);
  }
  iVar4 = FUN_004e8ecf(param_1);
  // C: (&DAT_006a65c8)[local_64] = 0 for 0..2 — aliases c8/cc/d0
  DAT_006a65c8 = 0;
  DAT_006a65cc = 0;
  DAT_006a65d0 = 0;
  for (local_64 = 0; local_64 < 0x14; local_64 = local_64 + 1) {
    iVar5 = FUN_004f3d30(param_1, local_64);
    aiStack_58[local_64] = iVar5;
  }
  local_8 = 0;
  if ((((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0 || ((DAT_00655af8 + param_1 & 3) !== 0) ||
      (DAT_0064f344[param_1 * 0x58] & 1) !== 0) || iVar4 !== 0) {
    for (local_64 = 0; local_64 < 0x15; local_64 = local_64 + 1) {
      iVar4 = FUN_004e78ce(param_1, local_64);
      if (iVar4 !== 0) {
        DAT_006a654c = DAT_006a654c - 1;
      }
    }
    if (DAT_006a654c < 0) {
      DAT_006a65dc = 1;
      DAT_006a654c = s8(DAT_0064f349[param_1 * 0x58]) + 1;
    } else {
      DAT_006a654c = s8(DAT_0064f349[param_1 * 0x58]) + 1;
      for (local_64 = 0; local_64 < 0x15; local_64 = local_64 + 1) {
        if (local_64 === 0) {
          local_80 = 0x14;
        } else {
          local_80 = local_64 + -1;
        }
        iVar4 = FUN_004e78ce(param_1, local_80);
        if (iVar4 !== 0) {
          FUN_004e8e4d(param_1, local_80, 1);
          aiStack_58[local_80] = 1;
          local_7c = local_7c | (1 << (local_80 & 0x1f));
          DAT_006a654c = DAT_006a654c - 1;
          if (DAT_006a654c === 0) break;
        }
      }
    }
    if (DAT_006a654c === local_60 || DAT_006a654c === 0) {
      // goto LAB_004e9651
      w32(DAT_0064f370, param_1 * 0x58, DAT_006a654c * 0x4000000 + local_7c);
      if (DAT_006a65c8 < (s8(DAT_0064f349[param_1 * 0x58]) * DAT_0064bcca + DAT_006a65d8 * DAT_006a6608)) {
        if (s16(DAT_0064f35a, param_1 * 0x58) === 0) {
          w16(DAT_0064f35a, param_1 * 0x58, s16(DAT_0064f35a, param_1 * 0x58) + -1);
        }
      } else if (s16(DAT_0064f35a, param_1 * 0x58) < 0) {
        w16(DAT_0064f35a, param_1 * 0x58, 0);
      }
      return;
    }
  }
  if (0 < DAT_006a654c && local_8 === 0) {
    local_7c = local_7c | 0x100000;
    FUN_004e8e4d(param_1, 0x14, 1);
    local_8 = 1;
    DAT_006a654c = DAT_006a654c - 1;
  }
  local_5c = 0;
  bVar3 = DAT_0064bcca;
  if (DAT_0064bcca < 2) {
    bVar3 = 1;
  }
  while ((DAT_006a65c8 + ((DAT_006a654c / bVar3) | 0) <
          (s8(DAT_0064f349[param_1 * 0x58]) * DAT_0064bcca + DAT_006a65d8 * DAT_006a6608) ||
         s8(DAT_0064f349[param_1 * 0x58]) < 3) &&
         (DAT_006a654c !== local_60 && (DAT_006a654c - local_60) >= 0 && local_5c >= 0)) {
    local_5c = -1;
    local_6c = 0;
    local_68 = 0;
    for (local_64 = 0; local_64 < 0x14; local_64 = local_64 + 1) {
      if (aiStack_58[local_64] === 0) {
        iVar4 = FUN_004e868f(param_1, local_64, 0);
        iVar5 = FUN_004e868f(param_1, local_64, 1);
        if (DAT_006a654c !== 1 || DAT_006a65cc !== 0 || iVar5 * 2 !== 0) {
          iVar6 = FUN_004e868f(param_1, local_64, 2);
          iVar6 = iVar5 * 2 + iVar6;
          if (local_68 < iVar4 || (iVar4 === local_68 && local_6c < iVar6)) {
            local_5c = local_64;
            local_6c = iVar6;
            local_68 = iVar4;
          }
        }
      }
    }
    if (local_5c >= 0) {
      aiStack_58[local_5c] = 1;
      FUN_004e8e4d(param_1, local_5c, 1);
      local_7c = local_7c | (1 << (local_5c & 0x1f));
      DAT_006a654c = DAT_006a654c - 1;
    }
  }
  if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 &&
      (DAT_0064f344[param_1 * 0x58] & 1) !== 0 && DAT_0062edfc !== 0) {
    let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) | 0x8000;
    w32(DAT_0064f344, param_1 * 0x58, ff);
    local_60 = local_60 + 1;
  }
  while (DAT_006a654c !== local_60 && (DAT_006a654c - local_60) >= 0) {
    local_5c = -1;
    local_6c = 0;
    for (local_64 = 0; local_64 < 0x14; local_64 = local_64 + 1) {
      if (aiStack_58[local_64] === 0) {
        FUN_004e8e4d(param_1, local_64, 0);
        iVar4 = FUN_005adfa0((DAT_006a65c8 - s8(DAT_0064f349[param_1 * 0x58]) * DAT_0064bcca) - DAT_006a65d8 * DAT_006a6608, 1, 99);
        iVar4 = (((0x10 / iVar4) | 0) * DAT_006a65b8) | 0;
        let cVar2 = s8(DAT_0064f349[param_1 * 0x58]);
        iVar5 = FUN_005adfa0(DAT_006a65cc - DAT_006a6568, 1, 99);
        iVar5 = (((cVar2 * 3) / iVar5) | 0) * DAT_006a65bc;
        cVar2 = s8(DAT_0064f349[param_1 * 0x58]);
        iVar6 = FUN_005adfa0(DAT_006a65d0, 1, 99);
        iVar4 = iVar4 + iVar5 + (((cVar2 * 2) / iVar6) | 0) * DAT_006a65c0;
        if (local_6c < iVar4) {
          local_5c = local_64;
          local_6c = iVar4;
        }
      }
    }
    if (local_5c < 0) break;
    aiStack_58[local_5c] = 1;
    FUN_004e8e4d(param_1, local_5c, 1);
    local_7c = local_7c | (1 << (local_5c & 0x1f));
    DAT_006a654c = DAT_006a654c - 1;
  }
  // LAB_004e9651
  w32(DAT_0064f370, param_1 * 0x58, DAT_006a654c * 0x4000000 + local_7c);
  if (DAT_006a65c8 < (s8(DAT_0064f349[param_1 * 0x58]) * DAT_0064bcca + DAT_006a65d8 * DAT_006a6608)) {
    if (s16(DAT_0064f35a, param_1 * 0x58) === 0) {
      w16(DAT_0064f35a, param_1 * 0x58, s16(DAT_0064f35a, param_1 * 0x58) + -1);
    }
  } else if (s16(DAT_0064f35a, param_1 * 0x58) < 0) {
    w16(DAT_0064f35a, param_1 * 0x58, 0);
  }
}

// city_adjust_stored_food
export function FUN_004e9719(param_1, param_2) {
  let off = param_1 * 0x58;
  if (param_2 < 0) {
    for (let p = param_2; p !== 0; p = p + 1) {
      let val = DAT_0064f370[off] | (DAT_0064f370[off+1]<<8) | (DAT_0064f370[off+2]<<16) | (DAT_0064f370[off+3]<<24);
      if (val > 0x3ffffff) {
        val = val + -0x4000000;
        DAT_0064f370[off] = val & 0xff;
        DAT_0064f370[off+1] = (val >> 8) & 0xff;
        DAT_0064f370[off+2] = (val >> 16) & 0xff;
        DAT_0064f370[off+3] = (val >> 24) & 0xff;
      }
    }
  } else {
    for (let p = param_2; p !== 0; p = p + -1) {
      let val = DAT_0064f370[off] | (DAT_0064f370[off+1]<<8) | (DAT_0064f370[off+2]<<16) | (DAT_0064f370[off+3]<<24);
      val = val + 0x4000000;
      DAT_0064f370[off] = val & 0xff;
      DAT_0064f370[off+1] = (val >> 8) & 0xff;
      DAT_0064f370[off+2] = (val >> 16) & 0xff;
      DAT_0064f370[off+3] = (val >> 24) & 0xff;
    }
  }
}

// city_reassign_specialists
export function FUN_004e97ae(param_1) {
  DAT_006a6604 = DAT_006a654c;
  for (let local_8 = 0; local_8 < DAT_006a6604; local_8 = local_8 + 1) {
    let iVar1 = FUN_004e75a6(param_1, local_8);
    if (iVar1 === 0) {
      FUN_004e7549(param_1, local_8, 1);
    }
  }
  for (let local_8 = DAT_006a6604; local_8 < 0x10; local_8 = local_8 + 1) {
    FUN_004e7549(param_1, local_8, 0);
  }
}

// get_difficulty_modifier
export function FUN_004e9849(param_1, param_2) {
  let local_8 = 4;
  if (0 < param_2) { local_8 = 5; }
  if (1 < param_2) { local_8 = local_8 + 1; }
  if (2 < param_2) { local_8 = local_8 + 1; }
  if (4 < param_2) { local_8 = local_8 + 1; }
  return local_8;
}

// Source: decompiled/block_004E0000.c FUN_004e989a (890 bytes)
export function FUN_004e989a(param_1, param_2, param_3, param_4) {
  let bVar1, iVar2, iVar3, bVar5;
  let local_28, local_24, local_20, local_1c, local_18, local_10, local_c;

  if (param_2 < 1) {
    local_c = 0;
  } else {
    bVar1 = DAT_0064f348[param_1 * 0x58];
    iVar2 = s8(bVar1);
    local_20 = u8(DAT_0064c6b5[iVar2 * 0x594]);
    bVar5 = (local_20 === 3);
    if ((DAT_0064f344[param_1 * 0x58] & 2) !== 0) {
      local_20 = local_20 + 1;
    }
    if ((DAT_0062edf8 !== 0 && param_4 !== 0) || !bVar5) {
      local_18 = DAT_006a6588;
      if (param_3 !== 0 && 0x10 < DAT_006a6588) {
        local_18 = 0x10;
      }
      local_1c = local_18;
      if (local_20 < 2 && local_18 !== 0 && ((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0) {
        local_1c = FUN_005adfa0(DAT_00655b08 + local_18, 0, 0x20);
      }
      iVar3 = FUN_004e9849(param_1, local_20);
      local_10 = ((local_1c * param_2 * 3) / (iVar3 * 0x14)) | 0;
    }
    if ((DAT_0062edf8 !== 0 && param_4 !== 0) || bVar5) {
      let uVar4 = DAT_0064bcd8;
      iVar3 = FUN_004e9849(param_1, local_20);
      local_24 = ((uVar4 * param_2 * 3) / (iVar3 * 0x14)) | 0;
    }
    if (bVar5) {
      local_c = local_24;
    } else {
      local_c = local_10;
    }
    local_c = FUN_005adfa0(local_c, 0, param_2);
    iVar3 = FUN_0043d20a(param_1, 7);
    if (iVar3 !== 0 || (iVar3 = FUN_0043d20a(param_1, 1), iVar3 !== 0)) {
      local_c = local_c >> 1;
    }
    if (DAT_0062edf8 !== 0 && param_4 !== 0) {
      for (local_28 = 1; local_28 < 6; local_28 = local_28 + 1) {
        local_20 = local_28;
        if (local_28 === 3) {
          let v = s16(DAT_0064ca7a, iVar2 * 0x594);
          w16(DAT_0064ca7a, iVar2 * 0x594, v - local_24);
        } else if (local_28 !== 4) {
          if ((DAT_0064f344[param_1 * 0x58] & 2) !== 0) {
            local_20 = local_28 + 1;
          }
          local_1c = local_18;
          if (local_20 < 2 && local_18 !== 0 && ((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0) {
            local_1c = FUN_005adfa0(DAT_00655b08 + local_18, 0, 0x20);
          }
          iVar3 = FUN_004e9849(param_1, local_20);
          let v2 = s16(DAT_0064ca74, local_28 * 2 + iVar2 * 0x594);
          w16(DAT_0064ca74, local_28 * 2 + iVar2 * 0x594, v2 - (((local_1c * param_2 * 3) / (iVar3 * 0x14)) | 0));
        }
      }
    }
  }
  return local_c;
}

// Source: decompiled/block_004E0000.c FUN_004e9c14 (1053 bytes)
export function FUN_004e9c14(param_1) {
  let iVar1, iVar2;
  let local_c = 0;
  let local_8 = 0;

  iVar1 = s8(DAT_0064f348[param_1 * 0x58]);
  DAT_006a65f8 = 1;
  iVar2 = FUN_0043d20a(param_1, 0xf);
  if (iVar2 !== 0) { local_8 = 2; }
  iVar2 = FUN_0043d20a(param_1, 0x10);
  if (iVar2 !== 0) { local_8 = local_8 + 2; }
  iVar2 = FUN_0043d20a(param_1, 0x13);
  if (iVar2 !== 0) { local_c = 2; }
  iVar2 = FUN_0043d20a(param_1, 0x14);
  if (iVar2 === 0) {
    iVar2 = FUN_0043d20a(param_1, 0x15);
    if (iVar2 === 0) {
      iVar2 = FUN_00453e51(s8(DAT_0064f348[param_1 * 0x58]), 0x16);
      if (iVar2 !== 0) {
        local_c = 2;
        DAT_006a65f8 = 2;
      }
    } else {
      local_c = 2;
      DAT_006a65f8 = 2;
    }
  } else {
    local_c = 2;
    DAT_006a65f8 = 2;
  }
  iVar2 = FUN_0043d20a(param_1, 0x12);
  if (iVar2 !== 0) { DAT_006a65f8 = 3; }
  iVar2 = FUN_0043d20a(param_1, 0x1d);
  if (iVar2 !== 0) { local_c = 2; DAT_006a65f8 = 3; }
  if (local_8 <= local_c) { local_c = local_8; }
  DAT_006a65cc = DAT_006a65cc + ((DAT_006a65cc * local_8) >> 2) + ((DAT_006a65cc * local_c) >> 2);
  DAT_006a65c4 = 0;
  iVar2 = FUN_0043d20a(param_1, 0xd);
  if (iVar2 === 0) {
    iVar2 = FUN_004bd9f0(iVar1, 0x25);
    if (iVar2 !== 0) { DAT_006a65c4 = DAT_006a65c4 + 1; }
    iVar2 = FUN_004bd9f0(iVar1, 5);
    if (iVar2 !== 0) { DAT_006a65c4 = DAT_006a65c4 + 1; }
    iVar2 = FUN_004bd9f0(iVar1, 0x30);
    if (iVar2 !== 0) { DAT_006a65c4 = DAT_006a65c4 + 1; }
    iVar2 = FUN_004bd9f0(iVar1, 0x3e);
    if (iVar2 !== 0) { DAT_006a65c4 = DAT_006a65c4 + 1; }
    if (DAT_006a65c4 !== 0) {
      iVar2 = FUN_004bd9f0(iVar1, 0x4a);
      if (iVar2 === 0) { DAT_006a65c4 = DAT_006a65c4 + 1; }
    }
    if (DAT_006a65c4 !== 0) {
      iVar2 = FUN_004bd9f0(iVar1, 0x1a);
      if (iVar2 !== 0) { DAT_006a65c4 = DAT_006a65c4 + -1; }
    }
    if (DAT_006a65c4 !== 0) {
      iVar2 = FUN_0043d20a(param_1, 0x1d);
      if (iVar2 !== 0) { DAT_006a65c4 = DAT_006a65c4 + -1; }
    }
  }
  DAT_006a6584 = ((DAT_006a65cc / DAT_006a65f8) | 0) + -0x14;
  iVar2 = FUN_0043d20a(param_1, 0x1d);
  if (iVar2 !== 0) { DAT_006a6584 = 0; }
  DAT_006a6584 = DAT_006a6584 + (s8(DAT_0064f349[param_1 * 0x58]) * DAT_006a65c4 >> 2);
  iVar2 = FUN_004e989a(param_1, DAT_006a65cc - DAT_006a6568, 1, 1);
  iVar2 = ((((3 - DAT_006a6574) * iVar2) / 3) | 0) /
          ((((u8(DAT_0064c6b5[iVar1 * 0x594])) >> 1) + 1)) | 0;
  DAT_006a656c = DAT_006a65cc - (DAT_006a6568 + 1);
  if (iVar2 <= DAT_006a656c) { DAT_006a656c = iVar2; }
  if (DAT_006a656c < 1) { DAT_006a656c = 0; }
  if (iVar1 === 0 || DAT_0064c6b5[iVar1 * 0x594] === 6 ||
      DAT_0064c6b5[iVar1 * 0x594] === 4 ||
      (s8(DAT_0064f379[param_1 * 0x58]) === -1 && DAT_006a6600 < 0)) {
    DAT_006a656c = 0;
  }
  DAT_006a65cc = DAT_006a65cc - DAT_006a656c;
}

// Source: decompiled/block_004E0000.c FUN_004ea031 (453 bytes)
export function FUN_004ea031(param_1, param_2) {
  let iVar1;

  DAT_006a6550 = FUN_005adfa0(DAT_006a6550, 0, s8(DAT_0064f349[param_1 * 0x58]));
  while (DAT_006a659c !== 0 && DAT_006a65a8 < DAT_006a659c) {
    DAT_006a659c = DAT_006a659c + -1;
    DAT_006a65a8 = DAT_006a65a8 + 1;
  }
  DAT_006a65a8 = FUN_005adfa0(DAT_006a65a8, 0, s8(DAT_0064f349[param_1 * 0x58]));
  while (true) {
    iVar1 = FUN_005adfa0(s8(DAT_0064f349[param_1 * 0x58]) - DAT_006a654c, 0, 99);
    if (DAT_006a65a8 + DAT_006a6550 <= iVar1) break;
    if (DAT_006a659c === 0) {
      DAT_006a6550 = DAT_006a6550 + -1;
      DAT_006a6550 = FUN_005adfa0(DAT_006a6550, 0, s8(DAT_0064f349[param_1 * 0x58]));
    } else {
      DAT_006a659c = DAT_006a659c + -1;
    }
    DAT_006a65a8 = DAT_006a65a8 + -1;
    DAT_006a65a8 = FUN_005adfa0(DAT_006a65a8, 0, s8(DAT_0064f349[param_1 * 0x58]));
  }
  while (DAT_006a659c !== 0 &&
         DAT_006a65a8 + DAT_006a6550 < s8(DAT_0064f349[param_1 * 0x58]) - DAT_006a654c) {
    DAT_006a659c = DAT_006a659c + -1;
    DAT_006a65a8 = DAT_006a65a8 + 1;
  }
  if (param_2 >= 0) {
    DAT_006a6620[param_2] = DAT_006a6550 & 0xff;
    DAT_006a65f0[param_2] = DAT_006a65a8 & 0xff;
    DAT_006a6628[param_2] = DAT_006a659c & 0xff;
  }
}

// Source: decompiled/block_004E0000.c FUN_004ea1f6 (1769 bytes)
export function FUN_004ea1f6(param_1, param_2, param_3, param_4) {
  let bVar1, iVar2, iVar3, iVar4;
  let local_18, local_14, local_c;
  let local_8;

  if (param_3 === 1 && s8(DAT_0064f379[param_1 * 0x58]) === -0x26) {
    local_c = param_2;
    param_2 = s16(DAT_0064f38e, param_1 * 0x58);
  }
  bVar1 = DAT_0064f348[param_1 * 0x58];
  iVar2 = s8(bVar1);
  local_18 = u8(DAT_0064c6b3[iVar2 * 0x594]);
  if (DAT_0064c6b5[iVar2 * 0x594] === 4 && DAT_0064bcdd < local_18) {
    local_18 = DAT_0064bcdd;
  }
  DAT_006a65fc = FUN_005adfa0(((param_2 * (10 - (u8(DAT_0064c6b3[iVar2 * 0x594]) + u8(DAT_0064c6b4[iVar2 * 0x594]))) + 4) / 10) | 0, 0, param_2);
  DAT_006a6578 = FUN_005adfa0(((param_2 * local_18 + 4) / 10) | 0, 0, param_2 - DAT_006a65fc);
  DAT_006a6554 = param_2 - (DAT_006a6578 + DAT_006a65fc);
  if (DAT_0062edf8 !== 0) {
    let v = s16(DAT_0064ca7c, iVar2 * 0x594);
    w16(DAT_0064ca7c, iVar2 * 0x594, v + ((DAT_006a65fc / 2) | 0));
    iVar3 = (s8(DAT_006554fa[s16(DAT_0064c6a6, iVar2 * 0x594) * 0x30]) + 3) * DAT_006a6578;
    v = s16(DAT_0064ca7c, iVar2 * 0x594);
    w16(DAT_0064ca7c, iVar2 * 0x594, v - (((iVar3 + ((iVar3 >> 0x1f) & 3)) >> 2) | 0));
  }
  if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 &&
      DAT_0064c6b5[iVar2 * 0x594] === 4) {
    DAT_006a6578 = DAT_006a6578 + DAT_006a65fc;
    DAT_006a65fc = 0;
  }
  iVar3 = FUN_004e75ea(param_1, 1);
  DAT_006a65fc = DAT_006a65fc + iVar3 * 2;
  iVar3 = FUN_004e75ea(param_1, 2);
  DAT_006a6554 = DAT_006a6554 + iVar3 * 3;
  iVar3 = FUN_004e75ea(param_1, 3);
  DAT_006a6578 = DAT_006a6578 + iVar3 * 3;
  if (DAT_0064c6b5[iVar2 * 0x594] === 4) {
    DAT_006a6578 = DAT_006a6578 - (((DAT_0064bcd9 * DAT_006a6578) / 100) | 0);
  }
  DAT_006a6618 = 0;
  iVar3 = FUN_0043d20a(param_1, 4);
  if (iVar3 !== 0) {
    iVar3 = FUN_004bd9f0(iVar2, 0x38);
    if (iVar3 !== 0) { DAT_006a6618 = DAT_006a6618 + 1; }
    iVar3 = FUN_004bd9f0(iVar2, 9);
    if (iVar3 !== 0) { DAT_006a6618 = DAT_006a6618 + 1; }
    iVar3 = FUN_00453e51(iVar2, 5);
    if (iVar3 !== 0) { DAT_006a6618 = DAT_006a6618 << 1; }
  }
  iVar3 = FUN_0043d20a(param_1, 0xe);
  if (iVar3 !== 0) {
    DAT_006a6618 = DAT_006a6618 + 3;
    iVar3 = FUN_004bd9f0(iVar2, 0x18);
    if (iVar3 !== 0) { DAT_006a6618 = DAT_006a6618 + 1; }
  }
  iVar3 = FUN_004bd9f0(iVar2, 0x37);
  if (iVar3 !== 0 &&
      ((iVar3 = FUN_0043d20a(param_1, 0xb), iVar3 !== 0) ||
       (iVar3 = FUN_00453e51(iVar2, 10), iVar3 !== 0))) {
    iVar3 = FUN_004bd9f0(iVar2, 0xf);
    iVar4 = FUN_004bd9f0(iVar2, 0x52);
    DAT_006a6618 = DAT_006a6618 + ((iVar3 === 0) ? 1 : 0) + (3 - ((iVar4 === 0) ? 1 : 0));
  }
  iVar3 = FUN_00453e51(iVar2, 0xf);
  if (iVar3 !== 0) { DAT_006a6618 = DAT_006a6618 + 2; }
  if (DAT_0064c6b5[iVar2 * 0x594] === 4) {
    DAT_006a6554 = DAT_006a6554 + DAT_006a6618;
  }
  iVar3 = FUN_0043d20a(param_1, 5);
  local_8 = (iVar3 !== 0) ? 1 : 0;
  iVar3 = FUN_0043d20a(param_1, 10);
  if (iVar3 !== 0) { local_8 = local_8 + 1; }
  iVar3 = FUN_0043d20a(param_1, 0x16);
  if (iVar3 !== 0) { local_8 = local_8 + 1; }
  DAT_006a65fc = DAT_006a65fc + ((DAT_006a65fc * local_8) >> 1);
  DAT_006a6554 = DAT_006a6554 + ((DAT_006a6554 * local_8) >> 1);
  if (DAT_0062edf8 !== 0) {
    let v = s16(DAT_0064ca7c, iVar2 * 0x594);
    w16(DAT_0064ca7c, iVar2 * 0x594, v + (((local_8 + 2) * DAT_006a6618) >> 1));
  }
  iVar3 = FUN_0043d20a(param_1, 6);
  local_8 = (iVar3 !== 0) ? 1 : 0;
  iVar3 = FUN_0043d20a(param_1, 0xc);
  if (iVar3 !== 0) { local_8 = local_8 + 1; }
  iVar3 = FUN_0043d20a(param_1, 0x1a);
  if (iVar3 !== 0 || (iVar2 = FUN_00453e51(iVar2, 0x1a), iVar2 !== 0)) {
    local_8 = local_8 + 1;
  }
  local_14 = DAT_006a6578 * local_8;
  iVar2 = s8(bVar1);
  let iVar2b = FUN_00453e18(0x10);
  if (iVar2b !== param_1) {
    local_14 = local_14 >> 1;
  }
  DAT_006a6578 = DAT_006a6578 + local_14;
  iVar2b = FUN_00453e18(0xb);
  if (iVar2b === param_1) {
    DAT_006a6578 = DAT_006a6578 << 1;
  }
  if (s8(DAT_0064f379[param_1 * 0x58]) === -0x26) {
    if (param_3 === 0) {
      if (DAT_006a6568 < DAT_006a65cc) {
        DAT_006a6554 = DAT_006a6554 + (DAT_006a65cc - DAT_006a6568);
      }
    } else {
      if (param_3 === 1) {
        FUN_004ea1f6(param_1, local_c, 2, s16(DAT_0064f38c, param_1 * 0x58) - DAT_006a6554);
        return;
      }
      if (param_3 === 2) {
        DAT_006a6554 = DAT_006a6554 + param_4;
      }
    }
  }
  w16(DAT_0064f38a, param_1 * 0x58, DAT_006a6578 & 0xffff);
  w16(DAT_0064f38c, param_1 * 0x58, DAT_006a6554 & 0xffff);
  w16(DAT_0064f38e, param_1 * 0x58, param_2 & 0xffff);
}

// Source: decompiled/block_004E0000.c FUN_004ea8e4 (2627 bytes)
export function FUN_004ea8e4(param_1) {
  let bVar1, cVar2, iVar3, iVar4, iVar5, iVar6;
  let local_28, local_20, local_1c, local_18, local_14, local_10, local_8;

  bVar1 = DAT_0064f348[param_1 * 0x58];
  iVar3 = s8(bVar1);
  DAT_006a6580 = FUN_004e989a(param_1, DAT_006a65d0, 0, 0);
  if (DAT_0064c6b5[iVar3 * 0x594] === 4) { DAT_006a6580 = 0; }
  if (DAT_0064c6b5[iVar3 * 0x594] === 6) { DAT_006a6580 = 0; }
  w16(DAT_0064f35e, param_1 * 0x58, (DAT_006a65d0 - DAT_006a6580) & 0xffff);
  FUN_0043d400(param_1);
  for (local_8 = 0; local_8 < s8(DAT_0064f37a[param_1 * 0x58]); local_8 = local_8 + 1) {
    iVar4 = s16(DAT_0064f384, param_1 * 0x58 + local_8 * 2);
    local_18 = (s16(DAT_0064f35e, param_1 * 0x58) + s16(DAT_0064f35e, iVar4 * 0x58) + 4) >> 3;
    cVar2 = s8(DAT_0064f381[param_1 * 0x58 + local_8]);
    local_14 = FUN_00488a45(s8(DAT_0064f348[param_1 * 0x58]),
                             s16(DAT_0064f340, param_1 * 0x58),
                             s16(DAT_0064f342, param_1 * 0x58),
                             s16(DAT_0064f340, iVar4 * 0x58),
                             s16(DAT_0064f342, iVar4 * 0x58));
    iVar5 = FUN_0043d20a(param_1, 0x20);
    if (iVar5 !== 0 && (iVar5 = FUN_0043d20a(iVar4, 0x20), iVar5 !== 0) && local_14 < 2) {
      local_14 = 1;
    }
    iVar5 = FUN_0043d20a(param_1, 0x19);
    if (iVar5 !== 0) { local_14 = local_14 + 1; }
    if (local_14 !== 0) { local_18 = local_18 + ((local_14 * local_18) >> 1); }
    if (cVar2 < 0) { local_18 = 0; }
    if (s8(DAT_0064f348[iVar4 * 0x58]) === iVar3) { local_18 = local_18 >> 1; }
    DAT_006a6590[local_8] = local_18;
    DAT_006a65d0 = DAT_006a65d0 + local_18;
  }
  DAT_006a6580 = FUN_004e989a(param_1, DAT_006a65d0, 0, 1);
  if (DAT_0064c6b5[iVar3 * 0x594] === 4) { DAT_006a6580 = 0; }
  if (DAT_0064c6b5[iVar3 * 0x594] === 6) { DAT_006a6580 = 0; }
  iVar4 = DAT_006a65d0 - DAT_006a6580;
  FUN_004ea1f6(param_1, iVar4, 0, 0);
  DAT_006a6550 = 0;
  if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0) {
    DAT_006a65a8 = (s8(DAT_0064f349[param_1 * 0x58]) + -1) - (DAT_0064bccf - 5);
  } else {
    local_1c = DAT_0064bcd0 + DAT_00655b08 * -2;
    if ((DAT_00655af0 & 4) !== 0) { local_1c = local_1c + 2; }
    iVar5 = (((((u8(DAT_0064c6b5[iVar3 * 0x594])) >> 1) + 2) * local_1c) / 2) | 0;
    if (iVar5 < 2) { iVar5 = 1; }
    local_20 = DAT_0064bccf - DAT_00655b08;
    if (local_20 < 3 && (iVar6 = FUN_0043d20a(param_1, 1), iVar6 !== 0) &&
        DAT_006a65e4 === 0 && DAT_006a655c === 0) {
      local_20 = 2;
    }
    DAT_006a65a8 = (s8(DAT_0064f349[param_1 * 0x58]) + -1) - (local_20 + -2);
    if (DAT_0064c6b5[iVar3 * 0x594] !== 3) {
      DAT_006a65a8 = DAT_006a65a8 +
                     (((s16(DAT_0064c708, iVar3 * 0x594) - iVar5) + param_1 % iVar5) / iVar5) | 0;
    }
  }
  DAT_006a659c = 0;
  if (s8(DAT_0064f349[param_1 * 0x58]) < DAT_006a65a8) {
    DAT_006a659c = DAT_006a65a8 - s8(DAT_0064f349[param_1 * 0x58]);
    DAT_006a65a8 = s8(DAT_0064f349[param_1 * 0x58]);
  }
  FUN_004ea031(param_1, 0);
  DAT_006a6550 = DAT_006a65fc >> 1;
  FUN_004ea031(param_1, 1);
  iVar5 = FUN_0043d20a(param_1, 0xe);
  if (iVar5 !== 0) {
    DAT_006a65a8 = DAT_006a65a8 + -3;
    iVar5 = FUN_004bd9f0(iVar3, 0x18);
    if (iVar5 !== 0) { DAT_006a65a8 = DAT_006a65a8 + -1; }
  }
  iVar5 = FUN_004bd9f0(iVar3, 0x37);
  if (iVar5 !== 0 &&
      ((iVar5 = FUN_0043d20a(param_1, 0xb), iVar5 !== 0) ||
       (iVar5 = FUN_00453e51(iVar3, 10), iVar5 !== 0))) {
    iVar5 = FUN_004bd9f0(iVar3, 0xf);
    iVar6 = FUN_004bd9f0(iVar3, 0x52);
    DAT_006a65a8 = DAT_006a65a8 - (((iVar5 === 0) ? 1 : 0) + (3 - ((iVar6 === 0) ? 1 : 0)));
  }
  iVar5 = FUN_0043d20a(param_1, 4);
  if (iVar5 !== 0) {
    iVar5 = FUN_004bd9f0(iVar3, 0x38);
    local_1c = (iVar5 !== 0) ? 1 : 0;
    iVar5 = FUN_004bd9f0(iVar3, 9);
    if (iVar5 !== 0) { local_1c = local_1c + 1; }
    iVar5 = FUN_00453e51(iVar3, 5);
    if (iVar5 !== 0) { local_1c = local_1c << 1; }
    DAT_006a65a8 = DAT_006a65a8 - local_1c;
  }
  iVar5 = FUN_0043d20a(param_1, 7);
  if ((iVar5 !== 0 || (iVar5 = FUN_0043d20a(param_1, 1), iVar5 !== 0)) &&
      DAT_0064c6b5[iVar3 * 0x594] === 6) {
    DAT_006a6550 = DAT_006a6550 + 1;
  }
  FUN_004ea031(param_1, 2);
  if (DAT_0064c6b5[iVar3 * 0x594] === 4) {
    DAT_006a659c = 0;
    DAT_006a65a8 = 0;
  } else if (u8(DAT_0064c6b5[iVar3 * 0x594]) < 5) {
    DAT_006a6564 = 0;
    for (local_28 = FUN_005b2e69(s16(DAT_0064f340, param_1 * 0x58),
                                  s16(DAT_0064f342, param_1 * 0x58));
        local_28 >= 0; local_28 = FUN_005b2c82(local_28)) {
      iVar5 = DAT_006a6564;
      if (DAT_0064b1c4[u8(DAT_006560f6[local_28 * 0x20]) * 0x14] !== 0) {
        DAT_006a6564 = DAT_006a6564 + 1;
        if (DAT_0064c6b5[iVar3 * 0x594] === 3) {
          DAT_006a6564 = iVar5 + 2;
        }
      }
    }
    local_1c = 3;
    if (DAT_0064c6b5[iVar3 * 0x594] === 3) { local_1c = 6; }
    if (local_1c <= DAT_006a6564) { DAT_006a6564 = local_1c; }
    iVar5 = FUN_005adfa0(DAT_006a6564, 0, DAT_006a65a8);
    DAT_006a65a8 = DAT_006a65a8 - iVar5;
  } else {
    iVar5 = FUN_00453e51(iVar3, 0x15);
    if (iVar5 === 0 && (iVar5 = FUN_0043d20a(param_1, 0x21), iVar5 === 0)) {
      local_10 = 1;
    } else {
      local_10 = 0;
    }
    if (DAT_0064c6b5[iVar3 * 0x594] === 6) { local_10 = local_10 + 1; }
    if (local_10 !== 0) {
      local_1c = DAT_006a65e4;
      if (DAT_006a65e4 !== 0 && DAT_0064c6b5[iVar3 * 0x594] === 5) {
        local_1c = DAT_006a65e4 + -1;
      }
      DAT_006a65a8 = DAT_006a65a8 + local_10 * local_1c;
    }
  }
  FUN_004ea031(param_1, 3);
  iVar5 = FUN_00453e51(iVar3, 1);
  if (iVar5 !== 0) {
    DAT_006a6550 = DAT_006a6550 + 1;
    iVar5 = FUN_00453e18(1);
    if (iVar5 === param_1) { DAT_006a6550 = DAT_006a6550 + 2; }
  }
  iVar5 = FUN_00453e51(iVar3, 0x1b);
  if (iVar5 !== 0) { DAT_006a6550 = DAT_006a6550 + 1; }
  iVar5 = FUN_00453e18(0xd);
  if (iVar5 === param_1) { DAT_006a65a8 = 0; }
  iVar3 = FUN_00453e51(iVar3, 0xf);
  if (iVar3 !== 0) { DAT_006a65a8 = DAT_006a65a8 + -2; }
  FUN_004ea031(param_1, 4);
  w16(DAT_0064f38a, param_1 * 0x58, DAT_006a6578 & 0xffff);
  w16(DAT_0064f38c, param_1 * 0x58, DAT_006a6554 & 0xffff);
  w16(DAT_0064f38e, param_1 * 0x58, iVar4 & 0xffff);
  DAT_0064f390[param_1 * 0x58] = DAT_006a65c8 & 0xff;
  DAT_0064f391[param_1 * 0x58] = DAT_006a65cc & 0xff;
  DAT_0064f392[param_1 * 0x58] = DAT_006a6550 & 0xff;
  DAT_0064f393[param_1 * 0x58] = DAT_006a65a8 & 0xff;
  return DAT_006a6550 - DAT_006a65a8;
}

// Source: decompiled/block_004E0000.c FUN_004eb327 (378 bytes)
export function FUN_004eb327(param_1) {
  let local_c, local_8;

  DAT_006a65b0 = 0;
  DAT_006a6558 = 0;
  DAT_006a6570 = -1;
  for (local_8 = 0; local_8 < s8(DAT_0064f37a[param_1 * 0x58]); local_8 = local_8 + 1) {
    if (s8(DAT_0064f381[param_1 * 0x58 + local_8]) < 0) {
      DAT_006a65b0 = DAT_006a65b0 + 1;
      DAT_006a6570 = s16(DAT_0064f384, param_1 * 0x58 + local_8 * 2);
    }
  }
  DAT_006a65c8 = DAT_006a65c8 - DAT_006a65b0;
  for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
    if (s32(DAT_0064f394, local_c * 0x58) !== 0) {
      for (local_8 = 0; local_8 < s8(DAT_0064f37a[local_c * 0x58]); local_8 = local_8 + 1) {
        if (s16(DAT_0064f384, local_8 * 2 + local_c * 0x58) === param_1 &&
            s8(DAT_0064f381[local_c * 0x58 + local_8]) < 0) {
          DAT_006a65c8 = DAT_006a65c8 + 1;
          DAT_006a6558 = DAT_006a6558 + 1;
        }
      }
    }
  }
}

// city_full_recalc_wrapper
export function FUN_004eb4a1(param_1) {
  FUN_004e8f42(param_1);
  FUN_004eb327(param_1);
  FUN_004e97ae(param_1);
  FUN_004e9c14(param_1);
  FUN_004ea8e4(param_1);
}

// city_calc_happiness_value
export function FUN_004eb4ed(param_1, param_2) {
  if (param_1 === -1) return 0;
  if (param_2 === 0) {
    return DAT_006a6550 - DAT_006a65a8;
  }
  DAT_0062ee08 = param_1;
  FUN_004e7641(param_1);
  FUN_004e7967(param_1);
  FUN_004e80b1(param_1);
  return FUN_004eb4a1(param_1);
}

// Source: decompiled/block_004E0000.c FUN_004eb571 (628 bytes)
export function FUN_004eb571(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 API (dialog/MFC — SEH frame setup, CPropertySheet)
  let iVar1, uVar2, uVar3, uVar4;

  FUN_0059db08(0x4000);
  if (DAT_00654fa8 !== 0) {
    FUN_004eb7e5();
    FUN_004eb7fb();
    return;
  }
  if (DAT_006a65ac === 0 && param_3 === 0) {
    FUN_004eb7e5();
    FUN_004eb7fb();
    return;
  }
  FUN_00421d60(0, DAT_0064f360[param_2 * 0x58]);
  FUN_0040bbb0();
  FUN_0040bbe0(param_1);
  iVar1 = _strcmp(param_1, s_BUILT_0062ee40);
  if (iVar1 === 0 && (DAT_0064f344[param_2 * 0x58] & 0x10) !== 0) {
    FUN_0040bbe0(DAT_0062ee48);
  }
  FUN_0043c9d0(DAT_00679640);
  FUN_004105f8(s16(DAT_0064f340, param_2 * 0x58),
               s16(DAT_0064f342, param_2 * 0x58),
               s8(DAT_0064f348[param_2 * 0x58]));
  if (DAT_006a65a0 === 0) {
    uVar4 = 0;
    uVar3 = 1;
    uVar2 = FUN_00428b0c(DAT_00628420 + 0x80, 1, 0);
    FUN_0059edf0(uVar2, uVar3, uVar4);
    uVar4 = 0;
    uVar3 = 0;
    uVar2 = FUN_00428b0c(DAT_00628420 + 0x84, 0, 0);
    FUN_0059edf0(uVar2, uVar3, uVar4);
    if ((DAT_00655af2 & 0x400) === 0) {
      FUN_0059ea99(0);
    } else {
      FUN_0059ea99(1);
    }
  }
  if (param_4 !== 0) {
    FUN_0059ec88(param_4, 0, 0);
    // DEVIATION: Win32 API (CPropertySheet::EnableStackedTabs)
  }
  iVar1 = FUN_0040bc80(0);
  if (0 < iVar1) {
    DAT_006a65a0 = 1;
  }
  FUN_004eb7e5();
  FUN_004eb7fb();
}

// dialog_destructor_3
export function FUN_004eb7e5() {
  FUN_0059df8a();
}

// SEH_restore_3
export function FUN_004eb7fb() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}

// Source: decompiled/block_004E0000.c FUN_004eb80a (915 bytes)
export function FUN_004eb80a(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 API (dialog/MFC — SEH frame, CString, CPropertySheet, operator_new)
  let iVar2, uVar5, uVar6, uVar7;

  FUN_005c64da();
  // DEVIATION: Win32 API (CString::CString)
  if (DAT_00654fa8 !== 0) {
    FUN_004ebbad();
    FUN_004ebbb9();
    FUN_004ebbcf();
    return;
  }
  if (param_4 === 0) {
    if (DAT_006a65ac === 0) {
      FUN_004ebbad();
      FUN_004ebbb9();
      FUN_004ebbcf();
      return;
    }
    param_5 = s8(DAT_0064f348[param_2 * 0x58]);
    FUN_004105f8(s16(DAT_0064f340, param_2 * 0x58),
                 s16(DAT_0064f342, param_2 * 0x58), param_5);
    FUN_00421d60(0, DAT_0064f360[param_2 * 0x58]);
  }
  // DEVIATION: Win32 API (operator_new, thunk_FUN_004f3d60)
  let local_498 = FUN_004f3d60();
  iVar2 = FUN_004bd9f0(param_5, 0x25);
  if (iVar2 !== 0) {
    param_3 = param_3 + 1;
  }
  let local_4a8;
  if (param_3 < 1) {
    local_4a8 = (~param_3 + 1) >>> 0;
  } else {
    local_4a8 = param_3;
  }
  // DEVIATION: Win32 API (FUN_005bf5e1, COleClientItem, FUN_005cedad)
  FUN_0043c9d0(param_1);
  FUN_0059ec88(0, 0, 0);
  if (param_4 === 0 && DAT_006a65a0 === 0) {
    uVar7 = 0;
    uVar6 = 1;
    uVar5 = FUN_00428b0c(DAT_00628420 + 0x80, 1, 0);
    FUN_0059edf0(uVar5, uVar6, uVar7);
    uVar7 = 0;
    uVar6 = 0;
    uVar5 = FUN_00428b0c(DAT_00628420 + 0x84, 0, 0);
    FUN_0059edf0(uVar5, uVar6, uVar7);
    if ((DAT_00655af2 & 0x400) === 0) {
      FUN_0059ea99(0);
    } else {
      FUN_0059ea99(1);
    }
  }
  iVar2 = FUN_0040bc80(0);
  if (param_4 === 0 && 0 < iVar2) {
    DAT_006a65a0 = 1;
  }
  if (local_498 !== 0) {
    FUN_004f3e20(1);
  }
  FUN_004ebbad();
  FUN_004ebbb9();
  FUN_004ebbcf();
}

// CString_destructor
export function FUN_004ebbad() {
  FUN_005cde4d();
}

// scope_cleanup
export function FUN_004ebbb9() {
  FUN_005c656b();
}

// SEH_restore_4
export function FUN_004ebbcf() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}

// Source: decompiled/block_004E0000.c FUN_004ebbde (1512 bytes)
export function FUN_004ebbde(param_1) {
  let bVar1, iVar2, iVar3, iVar4;
  let local_30, local_2c, local_24, local_20;
  let local_1c = new Uint8Array(6);
  let local_8;

  bVar1 = DAT_0064f348[param_1 * 0x58];
  iVar2 = s8(bVar1);
  FUN_004e7eb1(param_1, iVar2);
  if (s16(DAT_0064f35a, param_1 * 0x58) < 0) {
    local_30 = -1;
    for (local_2c = 0; local_2c < DAT_00655b16; local_2c = local_2c + 1) {
      if (s32(DAT_0065610a, local_2c * 0x20) !== 0 &&
          s8(DAT_0064b1ca[u8(DAT_006560f6[local_2c * 0x20]) * 0x14]) === 5 &&
          u8(DAT_00656100[local_2c * 0x20]) === param_1) {
        local_30 = local_2c;
        break;
      }
    }
    FUN_005f22d0(local_1c, s_FAMINE0_0062ee4c);
    if (local_30 < 0) {
      local_1c[5] = 0x31; // '1'
    } else {
      FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[local_30 * 0x20]) * 0x14]);
    }
    if (DAT_006a6570 >= 0) {
      local_1c[5] = 0x32; // '2'
      FUN_0040ff60(1, DAT_0064f360[DAT_006a6570 * 0x58]);
    }
    if (DAT_00654fa8 === 0) {
      FUN_004eb571(local_1c, param_1, 0, 0);
    }
    if (DAT_006a65b0 < 1) {
      if (local_30 < 0) {
        DAT_0064f349[param_1 * 0x58] = DAT_0064f349[param_1 * 0x58] + -1;
        local_20 = s16(DAT_0064f340, param_1 * 0x58);
        local_24 = s16(DAT_0064f342, param_1 * 0x58);
        if (s8(DAT_0064f349[param_1 * 0x58]) < 1) {
          delete_city(param_1, 0);
          kill_civ(iVar2, 0);
          return 1;
        }
      } else if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0 ||
                 (DAT_00655b0b & DAT_0064f34c[param_1 * 0x58]) !== 0) {
        FUN_005b5d93(local_30, 1);
      }
    } else {
      iVar2 = s8(DAT_0064f37a[param_1 * 0x58]);
      while (local_8 = iVar2 + -1, local_8 >= 0) {
        iVar3 = iVar2 + 0x64f380;
        iVar2 = local_8;
        if (s8(DAT_0064f381[param_1 * 0x58 + local_8]) < 0 &&
            s16(DAT_0064f384, local_8 * 2 + param_1 * 0x58) === DAT_006a6570) {
          FUN_00440325(param_1, local_8);
          iVar2 = local_8;
        }
      }
    }
    w16(DAT_0064f35a, param_1 * 0x58, 0);
    FUN_0047ce1e(local_20, local_24, 0, DAT_006d1da0, 1);
    if (DAT_0062ee00 !== 0) {
      DAT_0062ee04 = 1;
    }
  } else {
    iVar3 = (s8(DAT_0064f349[param_1 * 0x58]) + 1) * DAT_006a6560;
    if (iVar3 - s16(DAT_0064f35a, param_1 * 0x58) === 0 ||
        iVar3 < s16(DAT_0064f35a, param_1 * 0x58)) {
      if (DAT_0062ee00 !== 0) {
        FUN_00504c05(1);
      }
      iVar3 = FUN_00441a79(param_1);
      DAT_0064f349[param_1 * 0x58] = DAT_0064f349[param_1 * 0x58] + 1;
      iVar4 = FUN_0043d20a(param_1, 3);
      if (iVar4 === 0 && (iVar2 = FUN_00453e51(iVar2, 0), iVar2 === 0)) {
        w16(DAT_0064f35a, param_1 * 0x58, 0);
      } else {
        w16(DAT_0064f35a, param_1 * 0x58,
            (s8(DAT_0064f349[param_1 * 0x58]) + 1) * ((DAT_0064bccb >> 1) & 0xffff));
      }
      if (iVar3 !== 0) {
        DAT_0064f349[param_1 * 0x58] = DAT_0064f349[param_1 * 0x58] + -1;
        FUN_004271e8(1, DAT_0064c488[iVar3 * 8]);
        if ((((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 ||
            (u8(DAT_00655aea) & 1) === 0 || (DAT_00655af4 & 8) !== 0) || iVar3 !== 9) {
          if (s8(DAT_0064f379[param_1 * 0x58]) !== -iVar3 && (DAT_00655af2 & 1) === 0) {
            FUN_004f3f30(s_FURTHERGROWTH_0062ee60, param_1, DAT_00645160[iVar3 * 0x3c]);
          }
        } else {
          FUN_004c4210(0, DAT_0064bcd1);
          FUN_004f3f30(s_AQUEDUCT_0062ee54, param_1, 0x64537c);
          DAT_00655af4 = DAT_00655af4 | 8;
        }
      }
      if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 &&
          DAT_0064f349[param_1 * 0x58] === 2) {
        FUN_00441b11(param_1, 99);
      }
      if (DAT_0062ee00 !== 0) {
        FUN_00504c05(1);
        FUN_0050207f(1, 0);
        DAT_0062ee04 = 1;
      }
    }
    FUN_0047ce1e(s16(DAT_0064f340, param_1 * 0x58),
                 s16(DAT_0064f342, param_1 * 0x58), 0, DAT_006d1da0, 1);
  }
  return 0;
}

// caravan_set_destination
export function FUN_004ec1c6(param_1, param_2) {
  // Lines 4710-4744 in C source.
  // Sets caravan destination from city trade routes.
  DAT_006560fd[param_2 * 0x20] = 0xff;
  let iVar1 = _rand();
  let local_8 = 0;
  while (true) {
    if (2 < local_8) {
      // LAB_004ec264
      if (s8(DAT_006560fd[param_2 * 0x20]) < 0) {
        iVar1 = _rand();
        iVar1 = iVar1 % 3;
        if (s8(DAT_0064f37b[param_1 * 0x58 + iVar1]) < 1) {
          DAT_006560fd[param_2 * 0x20] = (~DAT_0064f37b[param_1 * 0x58 + iVar1] + 1) & 0xff;
        } else {
          DAT_006560fd[param_2 * 0x20] = DAT_0064f37b[param_1 * 0x58 + iVar1];
        }
      }
      let off = param_1 * 0x58;
      let flagVal = (DAT_0064f344[off] | (DAT_0064f344[off+1]<<8) | (DAT_0064f344[off+2]<<16) | (DAT_0064f344[off+3]<<24)) | 0x1000;
      DAT_0064f344[off] = flagVal & 0xff;
      DAT_0064f344[off+1] = (flagVal >> 8) & 0xff;
      DAT_0064f344[off+2] = (flagVal >> 16) & 0xff;
      DAT_0064f344[off+3] = (flagVal >> 24) & 0xff;
      return;
    }
    let iVar2 = (iVar1 % 3 + local_8) % 3;
    if (s8(DAT_0064f37b[param_1 * 0x58 + iVar2]) >= 0) {
      DAT_006560fd[param_2 * 0x20] = DAT_0064f37b[param_1 * 0x58 + iVar2];
      break;
    }
    local_8 = local_8 + 1;
  }
  // Fall through to LAB_004ec264 logic
  if (s8(DAT_006560fd[param_2 * 0x20]) < 0) {
    iVar1 = _rand() % 3;
    if (s8(DAT_0064f37b[param_1 * 0x58 + iVar1]) < 1) {
      DAT_006560fd[param_2 * 0x20] = (~DAT_0064f37b[param_1 * 0x58 + iVar1] + 1) & 0xff;
    } else {
      DAT_006560fd[param_2 * 0x20] = DAT_0064f37b[param_1 * 0x58 + iVar1];
    }
  }
  let off2 = param_1 * 0x58;
  let flagVal2 = (DAT_0064f344[off2] | (DAT_0064f344[off2+1]<<8) | (DAT_0064f344[off2+2]<<16) | (DAT_0064f344[off2+3]<<24)) | 0x1000;
  DAT_0064f344[off2] = flagVal2 & 0xff;
  DAT_0064f344[off2+1] = (flagVal2 >> 8) & 0xff;
  DAT_0064f344[off2+2] = (flagVal2 >> 16) & 0xff;
  DAT_0064f344[off2+3] = (flagVal2 >> 24) & 0xff;
}

// civ_revolution_check
export function FUN_004ec312(param_1) {
  if ((u16(DAT_0064c6a0, param_1 * 0x594) & 0x10) === 0) {
    DAT_0064c6be[param_1 * 0x594] = u8(DAT_0064c6be[param_1 * 0x594]) >> 1;
    let val = u16(DAT_0064c6a0, param_1 * 0x594) | 0x10;
    DAT_0064c6a0[param_1 * 0x594] = val & 0xff;
    DAT_0064c6a0[param_1 * 0x594 + 1] = (val >> 8) & 0xff;
    for (let local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
      if (local_8 !== param_1) {
        FUN_00456f20(local_8, param_1, -25);
        let doff = param_1 * 4 + local_8 * 0x594;
        let dval = (DAT_0064c6c0[doff] | (DAT_0064c6c0[doff+1]<<8) | (DAT_0064c6c0[doff+2]<<16) | (DAT_0064c6c0[doff+3]<<24)) & 0xffffffef;
        DAT_0064c6c0[doff] = dval & 0xff;
        DAT_0064c6c0[doff+1] = (dval >> 8) & 0xff;
        DAT_0064c6c0[doff+2] = (dval >> 16) & 0xff;
        DAT_0064c6c0[doff+3] = (dval >> 24) & 0xff;
      }
    }
  }
}

// Source: decompiled/block_004E0000.c FUN_004ec3fe (10931 bytes)
// NOTE: This is the largest function in the block. The full mechanical
// transpilation covers all game-state branches. UI-only notification
// branches are marked with DEVIATION comments.
export function FUN_004ec3fe(param_1) {
  let bVar1, uVar2, iVar3, iVar4, uVar5;
  let local_978, local_974, local_970, local_96c, local_968, local_964;
  let local_29c;
  let local_84, local_80, local_7c, local_78, local_74, local_70, local_6c;
  let local_68, local_64, local_60, local_5c, local_58, local_54, local_50;
  let local_4c, local_48, local_44, local_40, local_3c, local_38, local_34;
  let local_30, local_2c, local_28, local_24, local_20, local_1c, local_18, local_14;

  local_24 = -1;
  local_14 = 0;
  DAT_006a6610 = -1;
  local_84 = s8(DAT_0064f348[param_1 * 0x58]) & 0xff;
  local_2c = DAT_006a65cc - DAT_006a6568;
  if ((DAT_0064f344[param_1 * 0x58] & 1) !== 0) { local_2c = 0; }
  if (local_2c < 1) { local_2c = 0; }
  if (s8(DAT_0064f379[param_1 * 0x58]) !== -0x26) {
    let v = s16(DAT_0064f35c, param_1 * 0x58);
    w16(DAT_0064f35c, param_1 * 0x58, v + local_2c);
  }
  if (local_84 === 0) {
    local_60 = FUN_005b8a81(s16(DAT_0064f340, param_1 * 0x58), s16(DAT_0064f342, param_1 * 0x58));
    if (0x10 < u16(DAT_0064c832, local_84 * 0x594 + local_60 * 2)) {
      iVar3 = FUN_005b8d62(s16(DAT_0064f340, param_1 * 0x58), s16(DAT_0064f342, param_1 * 0x58));
      if (iVar3 >= 0) {
        w16(DAT_0064f35c, param_1 * 0x58, 0);
      }
    }
  }
  let prodType = s8(DAT_0064f379[param_1 * 0x58]);
  if (prodType < 0) {
    // Building/wonder production
    if (prodType < 1) {
      local_24 = ~prodType + 1;
    } else {
      local_24 = prodType;
    }
    local_3c = -1;
    local_58 = u8(DAT_0064c48c[local_24 * 8]) * DAT_006a657c;
    if (0x26 < local_24) { local_3c = local_24 + -0x27; }
    if (DAT_00654fa8 === 0) {
      if ((local_3c >= 0 && s16(DAT_00655be6, local_3c * 2) !== -1) ||
          (local_3c < 0 && (iVar3 = FUN_0043d20a(param_1, local_24), iVar3 !== 0))) {
        FUN_004271e8(1, DAT_0064c488[local_24 * 8]);
        if ((DAT_00655af2 & 8) === 0) {
          if (local_3c < 0) { local_96c = DAT_00645160[local_24 * 0x3c]; }
          else { local_96c = DAT_00645a84[local_3c * 0x3c]; }
          FUN_004f3f30(s_BADBUILD_0062eec4, param_1, local_96c);
        }
      }
    }
    if ((local_24 < 0x23 || 0x25 < local_24 ||
        ((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) ||
       (FUN_004a7577(local_84) === 0 && FUN_00598a05(local_84, local_24) === 0)) {
      if (local_58 <= s16(DAT_0064f35c, param_1 * 0x58) && local_24 !== 0x26) {
        let ff = s32(DAT_0064f344, param_1 * 0x58) & 0xfffffeff;
        w32(DAT_0064f344, param_1 * 0x58, ff);
        local_14 = 0;
        if (local_3c < 0) {
          iVar3 = FUN_0043d20a(param_1, local_24);
          if (iVar3 !== 0) { local_24 = -1; }
        } else {
          if (s16(DAT_00655be6, local_3c * 2) === -1 &&
              ((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) {
            for (local_6c = 0; local_6c < DAT_00655b18; local_6c = local_6c + 1) {
              if (s32(DAT_0064f394, local_6c * 0x58) !== 0 &&
                  (DAT_00655b0b & (1 << (DAT_0064f348[local_6c * 0x58] & 0x1f))) !== 0 &&
                  DAT_0064f379[local_6c * 0x58] === DAT_0064f379[param_1 * 0x58]) {
                let cost = u8(DAT_0064c48c[local_24 * 8]) * DAT_0064bccc;
                if (cost - s16(DAT_0064f35c, local_6c * 0x58) === 0 ||
                    cost < s16(DAT_0064f35c, local_6c * 0x58)) {
                  FUN_004eef15();
                  return;
                }
              }
            }
          }
          if ((DAT_00655b02 < 3 && s16(DAT_00655be6, local_3c * 2) === -1) ||
             (2 < DAT_00655b02 &&
              (local_14 = FUN_004e7270(local_84, param_1, local_3c, local_58, local_24), local_14 !== 0))) {
            if (DAT_00655b02 < 3) {
              w16(DAT_00655be6, local_3c * 2, param_1);
              let ff2 = s32(DAT_0064f344, param_1 * 0x58) | 0x100;
              w32(DAT_0064f344, param_1 * 0x58, ff2);
            }
          } else {
            local_3c = -1;
            local_24 = -1;
            if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) {
              FUN_00441b11(param_1, 99);
            }
          }
        }
        if (0x22 < local_24 && local_24 < 0x26 &&
            ((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) {
          iVar3 = FUN_004a7577(local_84);
          if (iVar3 !== 0) {
            FUN_00441b11(param_1, 99);
            // goto LAB_004ee539
          } else {
            local_48 = FUN_00597d6f(local_84, local_24 + -0x23);
            if (local_48 < 0) {
              FUN_00441b11(param_1, 99);
              // goto LAB_004ee539
            } else {
              local_70 = local_48 + 0x23;
              DAT_0064f379[param_1 * 0x58] = (-(local_70)) & 0xff;
              local_58 = u8(DAT_0064c48c[local_70 * 8]) * DAT_006a657c;
              local_24 = local_70;
              if (s16(DAT_0064f35c, param_1 * 0x58) < local_58) {
                // goto LAB_004ee539 (fall through to end)
                local_24 = -1; // force skip
              }
            }
          }
        }
        if (local_24 >= 0) {
          if (DAT_0062ee00 !== 0) { FUN_0050503e(1); }
          if (local_3c === 0x17) {
            for (local_30 = 1; local_30 < 8; local_30 = local_30 + 1) {
              uVar2 = FUN_005adfa0(((u8(DAT_0064c6be[local_30 * 0x594]) + 1) / 2) | 0, 0, 6);
              DAT_0064c6be[local_30 * 0x594] = uVar2;
            }
            // DEVIATION: Win32 API (Manhattan Project notification UI)
          }
          if (local_14 === 0) {
            FUN_0043d289(param_1, local_24, 1);
            let v = s16(DAT_0064f35c, param_1 * 0x58);
            w16(DAT_0064f35c, param_1 * 0x58, v - local_58);
          }
          if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0 && local_24 < 0x23) {
            if (local_24 === 1) {
              DAT_0064f379[param_1 * 0x58] = DAT_0064f379[param_1 * 0x58] + -1;
            }
            FUN_00441b11(param_1, 99);
          } else {
            if (DAT_006d1da0 === local_84 || 0x22 < local_24) { local_5c = 1; }
            else { local_5c = 0; }
            if (DAT_00654fa8 !== 0) { local_5c = 0; }
            if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) {
              DAT_0064f34c[param_1 * 0x58] = 0xff;
            }
            FUN_004271e8(1, DAT_0064c488[local_24 * 8]);
            uVar5 = FUN_00410070(local_84);
            FUN_0040ff60(2, uVar5);
            // DEVIATION: Win32 API (various notification UI)
            if (local_5c !== 0) {
              if (local_3c < 0) { FUN_0046e020(2, 1, 0, 0); }
              else { FUN_0046e020(0x30, 1, 0, 0); }
            }
            if (DAT_006d1da0 === local_84 && DAT_00654fa8 === 0) {
              if (2 < DAT_00655b02 && 0x22 < local_24) {
                FUN_0040ff60(0, DAT_0064f360[param_1 * 0x58]);
                FUN_00511880(0x47, 0xff, 4, 0, local_3c, local_24);
              }
              if ((DAT_00655af2 & 2) === 0) {
                if (local_3c < 0) { local_970 = DAT_00645160[local_24 * 0x3c]; }
                else { local_970 = DAT_00645a84[local_3c * 0x3c]; }
                FUN_004eb571(s_BUILT_0062eee8, param_1, 1, local_970);
              }
            }
            // C line 5093: tech adviser prompt after wonder completion (human player)
            if (local_5c !== 0 && -1 < local_3c && DAT_006d1da0 === local_84 &&
               DAT_00654fa8 === 0 && (DAT_00655ae8 & 0x20000) !== 0) {
              FUN_004bb8e0(local_3c);
            }
            if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) !== 0) {
              DAT_006a6610 = local_24;
            }
            if (local_14 === 0) { w16(DAT_0064f35c, param_1 * 0x58, 0); }
            if ((DAT_0064f344[param_1 * 0x58] & 0x10) !== 0 ||
                ((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) {
              FUN_00441b11(param_1, 99);
            }
          }
          if (0x22 < local_24 && local_24 < 0x26) {
            local_48 = local_24 + -0x23;
            local_48 = FUN_00598197(local_84, local_48);
          }
          if (local_24 === 1) {
            for (local_6c = 0; local_6c < DAT_00655b18; local_6c = local_6c + 1) {
              if (s32(DAT_0064f394, local_6c * 0x58) !== 0 &&
                  s8(DAT_0064f348[local_6c * 0x58]) === local_84) {
                FUN_0043d289(local_6c, 1, 0);
              }
            }
            FUN_0043d289(param_1, 1, 1);
            w16(DAT_0064c6ac, local_84 * 0x594, s16(DAT_0064f340, param_1 * 0x58));
            // DEVIATION: Win32 API (move capital notification)
          }
          if (local_3c === 0x12) { FUN_004c21d5(local_84, 0); FUN_004c21d5(local_84, 0); }
          if (local_3c === 0xe) { FUN_004be6ba(local_84); }
          if (local_3c === 0x14) { FUN_004ec312(local_84); }
          if (local_3c === 0x19) { FUN_004f1220(); }
          if (DAT_0062ee00 !== 0) { FUN_0050503e(1); FUN_00505ffa(1); }
          if (local_3c >= 0) {
            local_4c = param_1;
            for (local_6c = 0; local_6c < DAT_00655b18; local_6c = local_6c + 1) {
              if (s32(DAT_0064f394, local_6c * 0x58) !== 0 && local_6c !== local_4c &&
                  (DAT_00655b0b & (1 << (DAT_0064f348[local_6c * 0x58] & 0x1f))) === 0 &&
                  s8(DAT_0064f379[local_6c * 0x58]) === -local_24) {
                FUN_00441b11(local_6c, 99);
              }
            }
            FUN_004eb4ed(local_4c, 0);
          }
        }
      }
    } else {
      FUN_004271e8(1, DAT_0064c488[local_24 * 8]);
      FUN_004f3f30(s_BADSPACE_0062eed0, param_1, DAT_00645160[local_24 * 0x3c]);
    }
  } else {
    // Unit production
    local_64 = s8(DAT_0064f379[param_1 * 0x58]);
    if (s8(DAT_0064b1c0[local_64 * 0x14]) >= 0 &&
        (iVar3 = FUN_004bd9f0(local_84, s8(DAT_0064b1c0[local_64 * 0x14])), iVar3 !== 0)) {
      for (local_20 = 0; local_20 < 0x3e; local_20 = local_20 + 1) {
        if (DAT_0064b1cb[local_20 * 0x14] === DAT_0064b1c0[local_64 * 0x14] &&
            DAT_0064b1ca[local_20 * 0x14] === DAT_0064b1ca[local_64 * 0x14]) {
          if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) !== 0) {
            FUN_004271e8(1, DAT_0064b1b8[local_64 * 0x14]);
            FUN_004271e8(2, DAT_0064b1b8[local_20 * 0x14]);
            FUN_004f3f30(s_UPGRADED_0062ee70, param_1, DAT_00641848[local_20 * 0x3c]);
          }
          local_64 = local_20;
          DAT_0064f379[param_1 * 0x58] = local_64 & 0xff;
          break;
        }
      }
    }
    local_58 = s8(DAT_0064b1c8[local_64 * 0x14]) * DAT_006a657c;
    if (local_58 <= s16(DAT_0064f35c, param_1 * 0x58)) {
      let ff = s32(DAT_0064f344, param_1 * 0x58) & 0xfffffeff;
      w32(DAT_0064f344, param_1 * 0x58, ff);
      if (DAT_0062ee00 !== 0) { FUN_0050503e(1); }
      if (s8(DAT_0064b1ca[local_64 * 0x14]) === 5 &&
          s8(DAT_0064f349[param_1 * 0x58]) === 1 && DAT_00655b08 === 0) {
        FUN_004eef15();
        return;
      }
      let v = s16(DAT_0064f35c, param_1 * 0x58);
      w16(DAT_0064f35c, param_1 * 0x58, v - local_58);
      if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) !== 0 ||
          s8(DAT_0064b1ca[local_64 * 0x14]) !== 6) {
        local_80 = FUN_005b3d06(local_64, local_84,
                                s16(DAT_0064f340, param_1 * 0x58),
                                s16(DAT_0064f342, param_1 * 0x58));
        if (local_80 < 0) {
          // goto LAB_004ee539
        } else {
          if (s8(DAT_0064b1ca[local_64 * 0x14]) === 6 &&
              DAT_0064c6b5[local_84 * 0x594] === 3) {
            w16(DAT_006560f4, local_80 * 0x20, u16(DAT_006560f4, local_80 * 0x20) | 0x2000);
          } else if (DAT_0064b1c1[local_64 * 0x14] === 0 || (DAT_00655ae8 & 0x10) === 0) {
            iVar3 = FUN_0043d20a(param_1, 2);
            if ((iVar3 !== 0 || (iVar3 = FUN_00453e51(local_84, 7), iVar3 !== 0)) &&
                s8(DAT_0064b1ca[local_64 * 0x14]) < 6 &&
                (DAT_0064b1bd[local_64 * 0x14] & 0x10) === 0) {
              w16(DAT_006560f4, local_80 * 0x20, u16(DAT_006560f4, local_80 * 0x20) | 0x2000);
            }
          }
          if (s8(DAT_0064b1ca[local_64 * 0x14]) === 4) {
            DAT_006560fd[local_80 * 0x20] = (-1 - (param_1 & 0x3f)) & 0xff;
          }
        }
      }
      if (s8(DAT_0064b1ca[local_64 * 0x14]) === 5) {
        if (s8(DAT_0064f349[param_1 * 0x58]) === 1 &&
            s16(DAT_0064c708, local_84 * 0x594) === 1) {
          FUN_004eef15();
          return;
        }
        if (s8(DAT_0064f349[param_1 * 0x58]) === 1 &&
            ((1 << (local_84 & 0x1f)) & DAT_00655b0b) !== 0) {
          FUN_0040ff60(0, DAT_0064f360[param_1 * 0x58]);
          FUN_004271e8(1, DAT_0064b1b8[local_64 * 0x14]);
          if (DAT_00654fa8 !== 0 || (iVar3 = FUN_00421ea0(s_GHOSTTOWN_0062ee7c), iVar3 === 0)) {
            FUN_005b4391(local_80, 1);
            FUN_004eef15();
            return;
          }
        }
        DAT_0064f349[param_1 * 0x58] = DAT_0064f349[param_1 * 0x58] + -1;
        if (s8(DAT_0064f349[param_1 * 0x58]) < 1) {
          local_50 = s16(DAT_0064f340, param_1 * 0x58);
          local_54 = s16(DAT_0064f342, param_1 * 0x58);
          FUN_0040ff60(0, DAT_0064f360[param_1 * 0x58]);
          FUN_004271e8(1, DAT_0064b1b8[local_64 * 0x14]);
          FUN_004271e8(3, DAT_00628420 + 0x2ec);
          delete_city(param_1, 0);
          iVar3 = kill_civ(local_84, 0);
          if (iVar3 === 0) {
            FUN_005b3d06(local_64, local_84, local_50, local_54);
            if ((DAT_00655af2 & 4) === 0 && DAT_006a65ac !== 0) {
              FUN_00421ea0(s_BUILT_0062ee88);
            }
          }
          DAT_0062ee00 = 0;
          DAT_006a65ac = 0;
          FUN_0047cea6(local_50, local_54);
          FUN_004eef15();
          return;
        }
      }
      if (DAT_0062ee00 !== 0) {
        FUN_00505666(1);
        FUN_citywin_8ADC(1);
      }
      if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) {
        if (s8(DAT_0064b1ca[local_64 * 0x14]) === 7) {
          FUN_004ec1c6(param_1, local_80);
        }
        // Source: block_004E0000.c lines 5293-5365 — diplomat/spy target selection
        if (s8(DAT_0064b1ca[local_64 * 0x14]) === 6) {
          let local_7c = -1;
          let local_1c_d = 0x7fff;
          let local_68 = 0;
          let local_28 = 0;
          let local_964 = 0;
          for (let local_6c = 0; local_6c < DAT_00655b18; local_6c = local_6c + 1) {
            if (ri(DAT_0064f340, local_6c * 0x58 + 0x54) !== 0 &&
               s8(DAT_0064f340[local_6c * 0x58 + 8]) !== local_84 &&
               (DAT_0064c600[s8(DAT_0064f340[local_6c * 0x58 + 8]) * 4 + local_84 * 0x594 + 0xC0] & 6) === 0) {
              local_80 = FUN_005b67af(s16(DAT_0064f340, local_6c * 0x58),
                                      s16(DAT_0064f340, local_6c * 0x58 + 2),
                                      local_84, -1);
              // C: abs(DAT_006ced50 - 3)
              if (DAT_006ced50 === 3 || DAT_006ced50 - 3 < 0) {
                DAT_006ced50 = -(DAT_006ced50 - 3);
              } else {
                DAT_006ced50 = DAT_006ced50 - 3;
              }
              if (-1 < local_80) {
                if ((DAT_0064f340[local_6c * 0x58 + 4] & 8) !== 0 && DAT_006ced50 < 4) {
                  DAT_006ced50 = 3;
                }
                if (DAT_006ced50 <= local_1c_d) {
                  if (local_1c_d === DAT_006ced50) {
                    if (local_68 + 1 === 1 || local_68 < 0) {
                      local_964 = 0;
                      local_68 = local_68 + 1;
                    } else {
                      local_68 = local_68 + 2;
                      local_964 = _rand() % local_68;
                    }
                    if (local_964 !== 0) continue; // goto LAB_004ecd0c
                  }
                  iVar3 = FUN_005b89e4(rs(DAT_006560f0, local_80 * 0x20),
                                        rs(DAT_006560f0, local_80 * 0x20 + 2));
                  if (iVar3 === 0) {
                    iVar3 = FUN_005b8a81(s16(DAT_0064f340, local_6c * 0x58),
                                          s16(DAT_0064f340, local_6c * 0x58 + 2));
                    let iVar4 = FUN_005b8a81(rs(DAT_006560f0, local_80 * 0x20),
                                              rs(DAT_006560f0, local_80 * 0x20 + 2));
                    if (iVar3 === iVar4) {
                      if (local_1c_d < DAT_006ced50) {
                        local_68 = 1;
                        local_1c_d = DAT_006ced50;
                      }
                      local_7c = local_6c;
                      local_28 = local_80;
                    }
                  }
                }
              }
            }
            // LAB_004ecd0c
          }
          if (local_1c_d < 4 && (_rand() % 10 <= DAT_00655b08)) {
            local_80 = FUN_005b3d06(local_64, local_84,
                                    rs(DAT_006560f0, local_28 * 0x20),
                                    rs(DAT_006560f0, local_28 * 0x20 + 2));
          } else {
            local_80 = FUN_005b3d06(local_64, local_84,
                                    s16(DAT_0064f340, param_1 * 0x58),
                                    s16(DAT_0064f342, param_1 * 0x58));
          }
          if (DAT_0064c6b5[local_84 * 0x594] === 3) {
            w16(DAT_006560f4, local_80 * 0x20, u16(DAT_006560f4, local_80 * 0x20) | 0x2000);
          }
        }
        if (s8(DAT_0064b1c4[local_64 * 0x14]) > 0x62 &&
            DAT_0064c778[local_84 * 0x594 + local_64] === 1) {
          for (local_74 = 1; local_74 < 8; local_74 = local_74 + 1) {
            w16(DAT_0064ca82, local_74 * 0x594 + local_84 * 2, 0xffff);
          }
        }
        FUN_00441b11(param_1, 99);
      } else {
        if (s8(DAT_0064b1ca[local_64 * 0x14]) >= 5) {
          FUN_004271e8(1, DAT_0064b1b8[local_64 * 0x14]);
          if (s8(DAT_0064b1ca[local_64 * 0x14]) === 7) {
            // DEVIATION: Win32 API (caravan dialog — FUN_0059db08 etc)
            // Game state: assign cargo
            DAT_006560fd[local_80 * 0x20] = 0xff;
          }
          if ((DAT_00655af2 & 4) === 0) {
            FUN_004f3f30(s_BUILT_0062eebc, param_1, DAT_00641848[local_64 * 0x3c]);
          }
        }
        w16(DAT_0064f35c, param_1 * 0x58, 0);
        if ((DAT_0064f344[param_1 * 0x58] & 0x10) !== 0) {
          FUN_00441b11(param_1, 99);
        }
        if (DAT_0062ee00 !== 0) { FUN_0050503e(1); }
      }
    }
  }
  // LAB_004ee539
  if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) !== 0 &&
      (DAT_0064f344[param_1 * 0x58] & 0x10) !== 0 &&
      (s16(DAT_0064f35c, param_1 * 0x58) === 0 ||
       (s8(DAT_0064f379[param_1 * 0x58]) < 0 && local_24 < 0))) {
    FUN_00441b11(param_1, 99);
    if (DAT_0064f379[param_1 * 0x58] === 0x63) { // 'c' = 99
      let ff = s32(DAT_0064f344, param_1 * 0x58) & 0xfcffffef;
      w32(DAT_0064f344, param_1 * 0x58, ff);
    }
  }
  if (((1 << (local_84 & 0x1f)) & DAT_00655b0b) === 0) {
    if ((DAT_0064f344[param_1 * 0x58] & 0x20) !== 0 ||
        (iVar3 = FUN_005b8d62(s16(DAT_0064f340, param_1 * 0x58),
                               s16(DAT_0064f342, param_1 * 0x58)), iVar3 < 0)) {
      FUN_00441b11(param_1, 99);
    }
    local_34 = 0;
    if (s8(DAT_0064f379[param_1 * 0x58]) < 0) {
      if (s8(DAT_0064f379[param_1 * 0x58]) < 1) {
        local_24 = ~s8(DAT_0064f379[param_1 * 0x58]) + 1;
      } else {
        local_24 = s8(DAT_0064f379[param_1 * 0x58]);
      }
    } else {
      local_24 = 0;
    }
    if (local_24 === 0) {
      bVar1 = DAT_0064b1c8[s8(DAT_0064f379[param_1 * 0x58]) * 0x14];
    } else {
      bVar1 = DAT_0064c48c[local_24 * 8];
    }
    local_978 = u8(bVar1);
    local_58 = local_978 * DAT_006a657c;
    // Source: block_004E0000.c lines 5514-5619 — AI buy-rush logic
    let local_60 = FUN_005b8aa8(s16(DAT_0064f340, param_1 * 0x58),
                                 s16(DAT_0064f342, param_1 * 0x58));
    let local_38;
    if (local_60 < 0) { local_38 = 0; }
    else { local_38 = u8(DAT_0064ca32[local_84 * 0x594 + local_60]); }
    // C line 5522: buy-rush if strategy matches production type
    if ((local_38 === 0 || local_38 === 1 || local_38 === 4) &&
       local_2c !== 0 && -1 < s8(DAT_0064f379[param_1 * 0x58]) &&
       s8(DAT_0064b1ca[s8(DAT_0064f379[param_1 * 0x58]) * 0x14]) === local_38) {
      local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 6;
    }
    // C line 5527: wonder buy-rush
    if (0x26 < local_24) {
      let local_18 = ((local_24 - 0x27) / 7) | 0;
      if (DAT_0064c6b7[local_84 * 0x594 + local_18] === 0 ||
         u8(DAT_0064c6b7[local_84 * 0x594 + local_18]) < u8(DAT_00673af8[local_18])) {
        local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 6;
      } else if (u8(DAT_00673afc[local_18]) + 1 < u8(DAT_0064c6b7[local_84 * 0x594 + local_18])) {
        local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 8;
      } else {
        local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 7;
      }
      if (0x9c3 < s32(DAT_0064c6a2, local_84 * 0x594)) {
        local_34 = local_34 << 1;
      }
    }
    // C line 5544: spaceship part buy-rush
    if (0x22 < local_24 && local_24 < 0x27) {
      for (let local_74 = 1; local_74 < 8; local_74 = local_74 + 1) {
        if (((1 << (local_74 & 0x1f)) & DAT_00655b0b) !== 0 &&
           (iVar3 = FUN_004a75a6(local_74), iVar3 !== 0)) {
          local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 7;
          break;
        }
      }
      iVar3 = FUN_00598d45(local_84);
      if (iVar3 !== 0) { local_34 = local_34 << 1; }
    }
    // C line 5557: disorder buy-rush
    if ((DAT_0064f344[param_1 * 0x58] & 1) !== 0 && local_24 !== 0 &&
       s16(DAT_0064f35c, param_1 * 0x58) !== 0) {
      local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 3;
    }
    // C line 5561: under threat / losing territory buy-rush
    iVar3 = FUN_005b8d62(s16(DAT_0064f340, param_1 * 0x58), s16(DAT_0064f342, param_1 * 0x58));
    if ((iVar3 < 0 || (DAT_0064f344[param_1 * 0x58] & 0x20) !== 0) &&
       -1 < s8(DAT_0064f379[param_1 * 0x58]) && s16(DAT_0064f35c, param_1 * 0x58) !== 0) {
      local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 3;
    }
    // C line 5568: settlers buy-rush
    if (local_24 === 1 && s16(DAT_0064f35c, param_1 * 0x58) !== 0) {
      local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 3;
    }
    // C line 5571: specific building buy-rush
    if (DAT_0064f379[param_1 * 0x58] === 0x2D && DAT_0064c7a5[local_84 * 0x594] === 0 &&
       s16(DAT_0064f35c, param_1 * 0x58) !== 0) {
      local_34 = s32(DAT_0064c6a2, local_84 * 0x594) >> 4;
    }
    // C line 5575: extra bonus for rich civs
    if (2000 < s32(DAT_0064c6a2, local_84 * 0x594)) {
      local_34 = local_34 + (s32(DAT_0064c6a2, local_84 * 0x594) >> 9);
    }
    // C line 5578: clamp and apply
    local_34 = FUN_005adfa0(0, local_34, local_58 - s16(DAT_0064f35c, param_1 * 0x58));
    let v2 = s16(DAT_0064f35c, param_1 * 0x58);
    w16(DAT_0064f35c, param_1 * 0x58, v2 + local_34);
    let local_44 = (((DAT_00655b08 * local_34) / 10) | 0) /
               (8 - u8(DAT_00655c22[DAT_00655c20])) | 0;
    if (s32(DAT_0064c6a2, DAT_00655c21 * 0x594) < s32(DAT_0064c6a2, local_84 * 0x594)) {
      if (999 < s32(DAT_0064c6a2, local_84 * 0x594)) { local_44 = (local_44 / 2) | 0; }
      if (1999 < s32(DAT_0064c6a2, local_84 * 0x594)) { local_44 = 0; }
    }
    let treasury = s32(DAT_0064c6a2, local_84 * 0x594);
    w32(DAT_0064c6a2, local_84 * 0x594, treasury - (local_34 - local_44));
    // C line 5594: almost-wonder notification
    if (s8(DAT_0064f379[param_1 * 0x58]) < -0x26) {
      let local_70;
      if (s8(DAT_0064f379[param_1 * 0x58]) < 1) {
        local_70 = -(s8(DAT_0064f379[param_1 * 0x58]));
      } else {
        local_70 = s8(DAT_0064f379[param_1 * 0x58]);
      }
      local_58 = u8(DAT_0064c48c[local_70 * 8]) * DAT_006a657c;
      if (local_58 <= (s16(DAT_0064f35c, param_1 * 0x58) + DAT_006a65cc) - DAT_006a6568 &&
         s16(DAT_00655b98, local_70 * 2) === -1 && DAT_00654fa8 === 0) {
        // DEVIATION: UI — wonder almost complete notification
        let uVar5 = FUN_00493c7d(local_84);
        FUN_0040ff60(1, uVar5);
        FUN_004271e8(2, DAT_0064c488[local_70 * 8]);
        if (DAT_00654fa8 === 0 && 2 < DAT_00655b02) {
          FUN_00511880(0x4a, 0xff, 3, 0, local_70, 0);
        }
        FUN_0059db08(0x4000);
        FUN_0043c9d0("ALMOSTWONDER"); // DEVIATION: UI dialog
        FUN_0059ec88(DAT_00645160[local_70 * 0x3c], 0, 0); // DEVIATION: UI
        FUN_0040bc80(0); // DEVIATION: UI
      }
    }
  }
  let ff3 = s32(DAT_0064f344, param_1 * 0x58) & 0xffffffdf;
  w32(DAT_0064f344, param_1 * 0x58, ff3);
  FUN_004eef15();
}

// dialog_destructor_5
export function FUN_004eeee7() {
  FUN_0059df8a();
}

// dialog_destructor_6
export function FUN_004eeef3() {
  FUN_0059df8a();
}

// dialog_destructor_7
export function FUN_004eeeff() {
  FUN_0059df8a();
}

// SEH_restore_5
export function FUN_004eef15() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}

// Source: decompiled/block_004E0000.c FUN_004eef23 (1621 bytes)
export function FUN_004eef23(param_1) {
  let bVar1, bVar2, bVar3, bVar4, bVar5;
  let iVar6, iVar7, iVar8;
  let local_28, local_20, local_14, local_8;

  bVar1 = DAT_0064f348[param_1 * 0x58];
  iVar6 = s8(bVar1);
  bVar2 = DAT_0064c6b5[iVar6 * 0x594];
  // LAB_004eef5f (loop restart label)
  while (true) {
    DAT_006a660c = 0;
    DAT_006a6568 = 0;
    local_28 = 0;
    let broke = false;
    while (true) {
      let iVar8_save = local_28;
      if (DAT_00655b16 <= local_28) { return; }
      if (s32(DAT_0065610a, local_28 * 0x20) !== 0 &&
          s8(DAT_006560f7[local_28 * 0x20]) === iVar6 &&
          u8(DAT_00656100[local_28 * 0x20]) === param_1 &&
          s8(DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]) < 6) {
        FUN_004e7d7f(param_1, local_28, bVar2);
        if (DAT_006a65cc < DAT_006a6568 ||
            ((DAT_0064f344[param_1 * 0x58] & 1) !== 0 && ((DAT_00655af8 + local_28 & 7) === 0) &&
             ((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 && 4 < bVar2)) {
          bVar3 = DAT_006a6568 <= DAT_006a65cc;
          local_14 = -1;
          local_8 = -1;
          for (local_28 = 0; local_28 < DAT_00655b16; local_28 = local_28 + 1) {
            if (s32(DAT_0065610a, local_28 * 0x20) !== 0 &&
                u8(DAT_00656100[local_28 * 0x20]) === param_1 &&
                s8(DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]) < 6) {
              if (bVar3) {
                if (s8(DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14]) > 4 ||
                    (iVar7 = FUN_005b8ca6(s16(DAT_006560f0, local_28 * 0x20),
                                           s16(DAT_006560f2, local_28 * 0x20)), iVar7 >= 0)) {
                  continue;
                }
                bVar5 = FUN_005b94d5(s16(DAT_006560f0, local_28 * 0x20),
                                      s16(DAT_006560f2, local_28 * 0x20));
                if ((bVar5 & 0x42) === 0x40) {
                  bVar4 = false;
                  for (local_20 = 0; local_20 < DAT_00655b18; local_20 = local_20 + 1) {
                    if (s32(DAT_0064f394, local_20 * 0x58) !== 0 &&
                        DAT_0064f348[local_20 * 0x58] === DAT_0064f348[param_1 * 0x58] &&
                        (iVar7 = FUN_005ae1b0(s16(DAT_006560f0, local_28 * 0x20),
                                               s16(DAT_006560f2, local_28 * 0x20),
                                               s16(DAT_0064f340, local_20 * 0x58),
                                               s16(DAT_0064f342, local_20 * 0x58)), iVar7 < 4)) {
                      bVar4 = true;
                      break;
                    }
                  }
                  if (bVar4) continue;
                }
              }
              iVar7 = FUN_005ae31d(s16(DAT_006560f0, local_28 * 0x20),
                                    s16(DAT_006560f2, local_28 * 0x20),
                                    s16(DAT_0064f340, param_1 * 0x58),
                                    s16(DAT_0064f342, param_1 * 0x58));
              if (local_14 < iVar7) {
                local_8 = local_28;
                local_14 = iVar7;
              }
            }
          }
          if (DAT_006a65cc < DAT_006a6568) {
            if (local_14 >= 0) { broke = true; break; }
          } else if ((DAT_00655af0 & 1) === 0 ||
                     u8(DAT_0064c6b0[DAT_00655c20 * 0x594]) <= u8(DAT_0064c6b0[iVar6 * 0x594])) {
            if (0 < local_14 &&
                DAT_0064b1c1[u8(DAT_006560f6[local_8 * 0x20]) * 0x14] === 0) {
              iVar8_save = FUN_0043cf76(s16(DAT_006560f0, local_8 * 0x20),
                                         s16(DAT_006560f2, local_8 * 0x20));
              if (iVar8_save >= 0) {
                let v = s16(DAT_0064f35c, iVar8_save * 0x58);
                w16(DAT_0064f35c, iVar8_save * 0x58,
                    ((s8(DAT_0064b1c8[u8(DAT_006560f6[local_8 * 0x20]) * 0x14]) * DAT_006a657c) / 2 | 0) + v);
              }
              FUN_005b4391(local_8, 1);
              let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) & 0xffefdffe;
              w32(DAT_0064f344, param_1 * 0x58, ff);
              continue; // goto LAB_004eef5f (restart outer while)
            }
          } else {
            w16(DAT_0064ca80, iVar6 * 0x594, 0xfc19);
            w16(DAT_0064ca7e, iVar6 * 0x594, 0xfc19);
          }
        }
      }
      local_28 = iVar8_save + 1;
    }
    if (!broke) return;
    // broke out: disband the unit
    if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0) {
      FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[local_8 * 0x20]) * 0x14]);
      FUN_004f3f30(s_SUPPORT_0062ef20, param_1,
                   DAT_00641848[u8(DAT_006560f6[local_8 * 0x20]) * 0x3c]);
    }
    FUN_005b6042(local_8, 1);
    if (DAT_0062ee00 !== 0) {
      FUN_00505666(1);
      FUN_citywin_8ADC(1);
    }
    // goto LAB_004eef5f (loop continues)
  }
}

// Source: decompiled/block_004E0000.c handle_city_disorder_004ef578 (1614 bytes)
export function handle_city_disorder_004ef578(param_1) {
  let bVar1, iVar2, iVar3, uVar4;

  bVar1 = DAT_0064f348[param_1 * 0x58];
  iVar2 = s8(bVar1);
  if (iVar2 !== 0) {
    iVar3 = DAT_006a6550 - DAT_006a65a8;
    if (iVar3 < 0) {
      if (DAT_006d1da0 === iVar2 && DAT_00654fa8 === 0 && (DAT_00655af2 & 0x10) === 0) {
        FUN_0046e020(0xe, 1, 0, 0);
        FUN_004eb80a(s_DISORDER_0062ef28, param_1, 0x48, 0, 0);
      }
      if ((DAT_0064f344[param_1 * 0x58] & 1) === 0) {
        let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) | 0x4001;
        w32(DAT_0064f344, param_1 * 0x58, ff);
        if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0) {
          FUN_00441b11(param_1, 99);
        }
        FUN_0047ce1e(s16(DAT_0064f340, param_1 * 0x58),
                     s16(DAT_0064f342, param_1 * 0x58), 0, DAT_006d1da0, 1);
      } else {
        if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0) {
          FUN_00441b11(param_1, 99);
        }
        if ((DAT_0064f345[param_1 * 0x58] & 0x20) !== 0) {
          let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) | 0x100000;
          w32(DAT_0064f344, param_1 * 0x58, ff);
        }
        let ff2 = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) | 0x2000;
        w32(DAT_0064f344, param_1 * 0x58, ff2);
        if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0 &&
            DAT_0064c6b5[iVar2 * 0x594] === 6 &&
            ((DAT_00655af0 & 0x80) === 0 || (DAT_0064bc60 & 0x10) === 0)) {
          FUN_004f3f30(s_REVOLT_0062ef34, param_1, DAT_006469e0);
          let av = u16(DAT_0064c6a0, iVar2 * 0x594) & 0xfffe;
          w16(DAT_0064c6a0, iVar2 * 0x594, av);
          FUN_0055c69d(iVar2, 0);
          av = u16(DAT_0064c6a0, iVar2 * 0x594) | 1;
          w16(DAT_0064c6a0, iVar2 * 0x594, av);
        }
      }
    } else {
      if (DAT_006a6550 === DAT_006a65a8 && 0 < DAT_006a65cc - DAT_006a6568 &&
          DAT_006a661c >= 0) {
        let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) | 0x4000;
        w32(DAT_0064f344, param_1 * 0x58, ff);
      } else {
        let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) & 0xffffbfff;
        w32(DAT_0064f344, param_1 * 0x58, ff);
      }
      if (iVar3 >= 0 && (DAT_0064f344[param_1 * 0x58] & 1) !== 0) {
        let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) & 0xffefdffe;
        w32(DAT_0064f344, param_1 * 0x58, ff);
        if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0) {
          FUN_00441b11(param_1, 99);
        } else if ((DAT_00655af2 & 0x20) === 0) {
          FUN_004eb571(s_RESTORED_0062ef3c, param_1, 0, 0);
        }
        FUN_0047ce1e(s16(DAT_0064f340, param_1 * 0x58),
                     s16(DAT_0064f342, param_1 * 0x58), 0, DAT_006d1da0, 1);
      }
      if (DAT_0064c6b5[iVar2 * 0x594] !== 0) {
        let v = s32(DAT_0064c6a2, iVar2 * 0x594);
        w32(DAT_0064c6a2, iVar2 * 0x594, v + DAT_006a6554);
      }
    }
    if (DAT_006a65a8 === 0 && s8(DAT_0064f349[param_1 * 0x58]) > 2 &&
        (s8(DAT_0064f349[param_1 * 0x58]) + 1) >> 1 <= DAT_006a6550 &&
        DAT_0064c6b5[iVar2 * 0x594] !== 0) {
      if ((DAT_0064f344[param_1 * 0x58] & 2) === 0) {
        if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0) {
          uVar4 = FUN_00493ba6(iVar2);
          FUN_00421d60(1, uVar4);
          if ((DAT_00655af2 & 0x40) === 0) {
            if (DAT_006a65ac !== 0) { FUN_0046e571(3, 0); }
            FUN_004eb80a(s_WELOVEKING_0062ef48, param_1, 0x4a, 0, 0);
          }
        }
        let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) | 2;
        w32(DAT_0064f344, param_1 * 0x58, ff);
      } else if (4 < u8(DAT_0064c6b5[iVar2 * 0x594]) &&
                 (s8(DAT_0064f349[param_1 * 0x58]) * DAT_0064bcca + DAT_006a65d8 * DAT_006a6608) < DAT_006a65c8 &&
                 (iVar2 = FUN_00441a79(param_1), iVar2 === 0)) {
        DAT_0064f349[param_1 * 0x58] = DAT_0064f349[param_1 * 0x58] + 1;
      }
    } else if ((DAT_0064f344[param_1 * 0x58] & 2) !== 0) {
      if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0 &&
          DAT_0064c6b5[iVar2 * 0x594] !== 0 && (DAT_0064f344[param_1 * 0x58] & 1) === 0) {
        uVar4 = FUN_00493ba6(iVar2);
        FUN_00421d60(1, uVar4);
        if ((DAT_00655af2 & 0x40) === 0) {
          FUN_004eb571(s_WEDONTLOVEKING_0062ef54, param_1, 0, 0);
        }
      }
      let ff = (DAT_0064f344[param_1*0x58] | (DAT_0064f344[param_1*0x58+1]<<8) | (DAT_0064f344[param_1*0x58+2]<<16) | (DAT_0064f344[param_1*0x58+3]<<24)) & 0xfffffffd;
      w32(DAT_0064f344, param_1 * 0x58, ff);
    }
  }
}

// city_end_of_turn_science
export function FUN_004efbc6(param_1) {
  let bVar1 = DAT_0064f348[param_1 * 0x58];
  let iVar2 = s8(bVar1);
  if (s16(DAT_0064c6aa, iVar2 * 0x594) >= 0 &&
      ((1 << (bVar1 & 0x1f)) & DAT_00655b0b) !== 0 && DAT_00655b08 === 0 &&
      s16(DAT_0064c6aa, iVar2 * 0x594) !== 0x59 &&
      DAT_00655b1e[s16(DAT_0064c6aa, iVar2 * 0x594)] !== 0) {
    DAT_006a6578 = DAT_006a6578 << 1;
  }
  if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 && 1 < DAT_00655b08) {
    let iVar3 = FUN_00598d45(iVar2);
    if (iVar3 !== 0) {
      for (let local_8 = 0x23; local_8 < 0x26; local_8 = local_8 + 1) {
        iVar3 = FUN_004bd9f0(iVar2, s8(DAT_0064c48e[local_8 * 8]));
        if (iVar3 === 0) {
          DAT_006a6578 = DAT_006a6578 << 1;
          break;
        }
      }
    }
  }
  if (DAT_0064c6b5[iVar2 * 0x594] !== 0) {
    FUN_004c2b73(iVar2, DAT_006a6578);
  }
}

// Source: decompiled/block_004E0000.c FUN_004efd44 (940 bytes)
export function FUN_004efd44(param_1) {
  let cVar1, iVar2, uVar3, iVar4, uVar5;
  let local_20, local_1c, local_14;

  cVar1 = s8(DAT_0064f348[param_1 * 0x58]);
  local_14 = (u8(DAT_0064c6b0[cVar1 * 0x594]) * DAT_00655b08) >> 1;
  if ((DAT_00655af0 & 0x80) !== 0 && (DAT_0064bc60 & 0x40) !== 0) {
    local_14 = 0;
    DAT_006a6584 = 0;
  }
  iVar2 = FUN_0043d20a(param_1, 0x1d);
  if (iVar2 !== 0) {
    while (0xff < local_14) { local_14 = (local_14 / 2) | 0; }
  }
  if (-local_14 === -0xff || -local_14 + 0xff < 0) {
    local_1c = 0;
  } else {
    local_1c = _rand();
    local_1c = local_1c % (0x100 - local_14);
  }
  if (local_1c < DAT_006a6584 * 2) {
    iVar2 = _rand();
    uVar3 = FUN_005ae052(s16(DAT_0064f340, param_1 * 0x58) +
                          s8(DAT_00628370[iVar2 % 0x14]));
    iVar2 = s16(DAT_0064f342, param_1 * 0x58) +
            s8(DAT_006283a0[iVar2 % 0x14]);
    iVar4 = FUN_004087c0(uVar3, iVar2);
    if (iVar4 !== 0) {
      uVar5 = FUN_005b94d5(uVar3, iVar2);
      if ((uVar5 & 0x82) === 0) {
        iVar4 = FUN_005b89e4(uVar3, iVar2);
        if (iVar4 === 0) {
          FUN_005b90df(uVar3, iVar2);
          iVar4 = FUN_005b8b65(uVar3, iVar2, DAT_006d1da0);
          if (iVar4 !== 0) {
            FUN_00410402(uVar3, iVar2);
            if ((DAT_00655af2 & 0x100) === 0) {
              FUN_004eb571(s_POLLUTION_0062ef64, param_1, 0, 0);
            }
          }
        }
      }
    }
  }
  iVar2 = param_1 * 0xb;
  if ((DAT_0064f344[param_1 * 0x58] & 1) !== 0) {
    iVar4 = FUN_0043d20a(param_1, 0x15);
    iVar2 = 0;
    if (iVar4 !== 0) {
      iVar2 = FUN_004bd9f0(cVar1, 0x20);
      if (iVar2 === 0) {
        iVar2 = 5 - DAT_00655b08;
        if (iVar2 < 1) {
          local_20 = 0;
        } else {
          local_20 = _rand();
          iVar2 = (local_20 / (6 - DAT_00655b08)) | 0;
          local_20 = local_20 % (6 - DAT_00655b08);
        }
        if (local_20 === 0) {
          iVar2 = FUN_005b8b65(s16(DAT_0064f340, param_1 * 0x58),
                                s16(DAT_0064f342, param_1 * 0x58), DAT_006d1da0);
          if (iVar2 !== 0) {
            FUN_004105f8(s16(DAT_0064f340, param_1 * 0x58),
                         s16(DAT_0064f342, param_1 * 0x58),
                         s8(DAT_0064f348[param_1 * 0x58]));
          }
          FUN_0057f657(s16(DAT_0064f340, param_1 * 0x58),
                       s16(DAT_0064f342, param_1 * 0x58));
          FUN_005b9179(s16(DAT_0064f340, param_1 * 0x58),
                       s16(DAT_0064f342, param_1 * 0x58));
          FUN_0043d289(param_1, 0x15, 0);
          iVar2 = DAT_00654fa8;
          if (iVar2 === 0) {
            iVar2 = FUN_004f3f30(s_CHERNOBYL_0062ef70, param_1, DAT_00645fe8);
          }
        }
      }
    }
  }
  return iVar2;
}


// ═══════════════════════════════════════════════════════════════════
// STUB: External functions referenced by this block but defined
// elsewhere. These no-op stubs prevent runtime errors during
// mechanical integration.
// ═══════════════════════════════════════════════════════════════════

function _atexit(fn) { /* Win32 stub */ }
function _rand() { return Math.floor(Math.random() * 0x7fff); }
function _strcmp(a, b) { return a === b ? 0 : 1; }
function Sleep(ms) { /* Win32 stub */ }
function SetRect() { /* Win32 stub */ }
function GetAsyncKeyState() { return 0; /* Win32 stub */ }
function XD_FlushSendBuffer() { /* network stub */ }
function XD_InFlushSendBuffer() { return 0; /* network stub */ }
function debug_log(msg) { /* stub */ }
function operator_new(size) { return {}; /* stub */ }

// String literal stubs (referenced as identifiers in C)
const PTR_s_5_4_0f_Multiplayer_26_March_99_0062765c = "5.4.0f Multiplayer 26 March 99";
const PTR_s_Patch_3_00627660 = "Patch 3";
const s_GAMEOPTIONS_0062eb38 = "GAMEOPTIONS";
const s_GRAPHICOPTIONS_0062eb44 = "GRAPHICOPTIONS";
const s_LOWMEMORY_0062eb54 = "LOWMEMORY";
const s_MULTIPLAYEROPTIONS_0062eb60 = "MULTIPLAYEROPTIONS";
const s_MULTIPLAYEROPTIONS2_0062eb74 = "MULTIPLAYEROPTIONS2";
const s_PMCHANGESERVER_0062eb8c = "PMCHANGESERVER";
const s_PMCHANGENO_0062eb9c = "PMCHANGENO";
const s_PMCHANGEYES_0062eba8 = "PMCHANGEYES";
const s_MESSAGEOPTIONS_0062ebb4 = "MESSAGEOPTIONS";
const s_SERVERCONNECTTIME_0062ebf4 = "SERVERCONNECTTIME";
const s_REALLYRETIRE_0062ec40 = "REALLYRETIRE";
const s_REALLYQUIT_0062ec50 = "REALLYQUIT";
const s_HIDDENTERRAIN_0062ec5c = "HIDDENTERRAIN";
const s_NOPICKMUSICNEW_0062ec6c = "NOPICKMUSICNEW";
const s_PICKMUSICFANWORLDS_0062ec7c = "PICKMUSICFANWORLDS";
const s_PICKMUSICSCENARIO_0062ec90 = "PICKMUSICSCENARIO";
const s_PICKMUSICGOLD_0062eca4 = "PICKMUSICGOLD";
const s_PICKMUSIC_0062ecb4 = "PICKMUSIC";
const s_NOPICKMUSICNEW_0062ecc0 = "NOPICKMUSICNEW";
const s_REALLYQUIT_0062ed14 = "REALLYQUIT";
const s_NEWCREDITS_0062ed20 = "NEWCREDITS";
const s_FAMINE0_0062ee4c = "FAMINE0";
const s_BUILT_0062ee40 = "BUILT";
const s_FURTHERGROWTH_0062ee60 = "FURTHERGROWTH";
const s_AQUEDUCT_0062ee54 = "AQUEDUCT";
const s_UPGRADED_0062ee70 = "UPGRADED";
const s_GHOSTTOWN_0062ee7c = "GHOSTTOWN";
const s_BUILT_0062ee88 = "BUILT";
const s_CARAVANBUILT_0062ee90 = "CARAVANBUILT";
const s_NOFOODREPORT_0062eea0 = "NOFOODREPORT";
const s_CARACONFIRM_0062eeb0 = "CARACONFIRM";
const s_BUILT_0062eebc = "BUILT";
const s_BADBUILD_0062eec4 = "BADBUILD";
const s_BADSPACE_0062eed0 = "BADSPACE";
const s_MANHATTAN_0062eedc = "MANHATTAN";
const s_BUILT_0062eee8 = "BUILT";
const s_BUILT2_0062eef0 = "BUILT2";
const s_BADSPACE_0062eef8 = "BADSPACE";
const s_MOVECAPITAL_0062ef04 = "MOVECAPITAL";
const s_ALMOSTWONDER_0062ef10 = "ALMOSTWONDER";
const s_SUPPORT_0062ef20 = "SUPPORT";
const s_DISORDER_0062ef28 = "DISORDER";
const s_REVOLT_0062ef34 = "REVOLT";
const s_RESTORED_0062ef3c = "RESTORED";
const s_WELOVEKING_0062ef48 = "WELOVEKING";
const s_WEDONTLOVEKING_0062ef54 = "WEDONTLOVEKING";
const s_POLLUTION_0062ef64 = "POLLUTION";
const s_CHERNOBYL_0062ef70 = "CHERNOBYL";

// Stub functions from other blocks
function FUN_005786f1() {}
function FUN_00578770() {}
function FUN_0059db08() {}
function FUN_0040bc40() {}
function FUN_0059e6ff() {}
function FUN_0059e5c9() {}
function FUN_00428b0c() { return 0; }
function FUN_0059edf0() {}
function FUN_0059ea99() {}
function FUN_0040bc80() { return -1; }
function FUN_004bb8e0() {}
function FUN_0059df8a() {}
function FUN_00426f80() {}
function FUN_0049994f() {} // thunk_citywin_994F
function FUN_00499a49() {} // thunk_citywin_9A49
function FUN_004bb570() {}
function FUN_0040785b() {}
function FUN_005bb574() {}
function FUN_0056a9f4() {}
function FUN_0040ef70() { return 0; }
function FUN_004080c0() { return 640; }
function FUN_00414bb0() { return 480; }
function FUN_004083b0() {}
function FUN_004132b7() {}
function FUN_00413476() {}
function FUN_00413717() {}
function FUN_00484d52() {}
function FUN_0055ae80() {}
function FUN_004b7645() {}
function FUN_004b768d() {}
function FUN_004f5dd1() {}
function FUN_0042a768() {}
function FUN_load_verify_units() { return 0; }
function FUN_0041e8fb() {}
function FUN_0046e6a9() {}
function FUN_005dde9d() {}
function FUN_005dde57() {}
function FUN_005ddd4e() {}
function FUN_0046e4a9() {}
function FUN_0046e6c8() {}
function FUN_00498a5c() {}
function FUN_004897fa() {}
function FUN_00489a0d() {}
function FUN_004f7c99() {}
function FUN_0055af2e() {}
function FUN_0055b046() {}
function FUN_0051d7bc() {}
function FUN_0051d7d6() {}
function FUN_0051d817() { return 0; }
function FUN_0040ff60() {}
function FUN_005f22e0() {}
function FUN_00421e70() { return -1; }
function FUN_004a73d9() {}
function FUN_00568176() { return 1; }
function FUN_00421ea0() { return 0; }
function FUN_0056a65e() {}
function FUN_0046b14d() {}
function FUN_005f22d0() {}
function FUN_004aef20() {}
function FUN_004af14b() {}
function FUN_00511880() {}
function FUN_00410030() { return 0; }
function FUN_00421bb0() { return 0; }
function FUN_00426fb0() { return 0; }
function FUN_00421f40() { return 0; }
function FUN_005ddeff() { return -1; }
function FUN_0040ffa0() {}
function FUN_0046e571() {}
function FUN_save_game() {}
function FUN_004259a6() {}
function FUN_00522b2b() {}
function FUN_0049836a() {}
function FUN_0055b2c6() {}
function FUN_0040ddc6() {}
function FUN_0044cd9b() {}
function FUN_0040e017() {}
function FUN_0040e3b1() {}
function FUN_0047cd51() {}
function FUN_0047cf9e() {}
function FUN_0057940d() {}
function FUN_00410402() {}
function FUN_0058be56() {}
function FUN_0058c65e() {}
function FUN_0058df14() {}
function FUN_0058cfcd() {}
function FUN_0058ddce() {}
function FUN_0058d6af() {}
function FUN_0058d60a() {}
function FUN_0058df7b() {}
function FUN_0058cbe1() {}
function FUN_0058cce6() {}
function FUN_0058cde5() {}
function FUN_0058c295() {}
function FUN_0058d442() {}
function FUN_0058bdfd() {}
function FUN_0058bd60() {}
function FUN_0058bd84() {}
function FUN_00516570() {}
function FUN_0042d71e() {}
function FUN_0042f079() {}
function FUN_004308ae() {}
function FUN_0042e185() {}
function FUN_0042cd2f() {}
function FUN_0042b67d() {}
function FUN_004b7eb6() {}
function FUN_0043856b() {}
function FUN_00431c73() {}
function FUN_00433122() {}
function FUN_00435d15() {}
function FUN_004361cc() {}
function FUN_00436f5a() {}
function FUN_00434d8a() {}
function FUN_00598b4e() {}
function FUN_004702e0() {}
function FUN_004710d0() {}
function FUN_00554297() {}
function FUN_005551b3() {}
function FUN_0055560f() {}
function FUN_0055583f() {}
function FUN_00555a02() {}
function FUN_00555a8b() {}
function FUN_00554423() {}
function FUN_005545d3() {}
function FUN_00554962() {}
function FUN_0055499f() {}
function FUN_00555cb1() {}
function FUN_0055615c() {}
function FUN_0055625b() {}
function FUN_00556f54() {}
function FUN_set_city_shields() {}
function FUN_005582ad() {}
function FUN_0055891d() {}
function FUN_00553ff6() {}
function FUN_00417566() {}
function FUN_00429e77() {}
function FUN_0058760d() {}
function FUN_004da9e2() {}
function FUN_0051c635() {}
function FUN_004a5d92() {}
function FUN_005b1a29() {}
function FUN_0054ffc8() {}
function FUN_004f7bd1() {}
function FUN_00437a4a() {}
function FUN_004a2020() {}
function FUN_005013bc() {}
function FUN_005786b6() {}
function FUN_004a2379() { return 0; }
function FUN_004a23fc() { return 0; }
function FUN_00578b06() {}
function FUN_00578c12() {}
function FUN_00578e38() {}
function FUN_00578f2c() {}
function FUN_00579260() {}
function FUN_005792e1() {}
function FUN_005794cf() {}
function FUN_0057953e() {}
function FUN_0040bbb0() {}
function FUN_0040bbe0() {}
function FUN_0040bc10() {}
function FUN_00426ff0() {}
function FUN_00431d22() {}
function FUN_00484d3b() {}
function FUN_005d2004() {}
function FUN_00410070() { return 0; }
function FUN_00493ba6() { return 0; }
function FUN_00493b10() { return 0; }
function FUN_00493c7d() { return 0; }
function FUN_0041033a() {}
function FUN_004b0b53() {}
function new_civ() {}
function FUN_0047e94e() {}
function FUN_00498943() {}
function FUN_004988b8() {}
function FUN_005b9ec6() {}
function FUN_005b94fc() {}
function FUN_005b8c18() { return 0; }
function FUN_005b98b7() {}
function FUN_005b8af0() { return 0; }
function FUN_005b9c49() {}
function FUN_005b8da4() { return 0; }
function FUN_005b2e69() { return -1; }
function FUN_005b2c82() { return -1; }
function FUN_004a74bc() {}
function FUN_005b976d() {}
function FUN_005b9f1c() {}
function FUN_004c5fae() {}
function FUN_00440325() {}
function FUN_00410e0a() { return 0; }
function FUN_00410ed8() {}
function FUN_00514e7b() {}
function FUN_005adfa0(a, b, c) { return Math.max(b, Math.min(c, a)); }
function FUN_005ae31d() { return 0; }
function FUN_005ae1b0() { return 0; }
function FUN_0043d20a() { return 0; }
function FUN_0043d289() {}
function FUN_0043d400() {}
function FUN_00488a45() { return 0; }
function FUN_004e9849_stub() { return 4; }
function FUN_004bfe5a() { return 0; }
function FUN_004271e8() {}
function FUN_005b94d5_stub() { return 0; }
function FUN_005b8931_stub() { return 0; }
function FUN_005b8d15() { return -1; }
function FUN_005b8d62() { return -1; }
function FUN_005b8a81() { return 0; }
function FUN_005b8aa8() { return -1; }
function FUN_005b8b65() { return 0; }
function FUN_00453e18() { return -1; }
function FUN_00453e51() { return 0; }
function FUN_0040bcb0() { return 0; }
function FUN_004f3d30() { return 0; }
function FUN_0043cf76() { return -1; }
function FUN_005b3d06() { return -1; }
function FUN_005b4391() {}
function FUN_005b5d93() {}
function FUN_005b6042() {}
function FUN_005b67af() { return -1; }
function FUN_00441a79() { return 0; }
function FUN_00441b11() {}
function FUN_004eb571_stub() {}
function FUN_004f3f30() { return 0; }
function FUN_004f3d60() { return 0; }
function FUN_004f3e20() {}
function FUN_00504c05() {}
function FUN_0050207f() {}
function FUN_0050503e() {}
function FUN_00505666() {}
function FUN_00505ffa() {}
function FUN_citywin_8ADC() {}
function FUN_0047ce1e() {}
function FUN_0047cea6() {}
function delete_city() {}
function kill_civ() {}
function FUN_004c4210() {}
function FUN_005b90df() {}
function FUN_005b9179() {}
function FUN_0057f657() {}
function FUN_004105f8() {}
function FUN_00421d60() {}
function FUN_0043c9d0() {}
function FUN_0059ec88() {}
function FUN_005c64da() {}
function FUN_005c656b() {}
function FUN_005cde4d() {}
function FUN_005cedad() {}
function FUN_005bf5e1() {}
function FUN_005b99e8() {}
function FUN_00456f20() {}
function FUN_0055c69d() {}
function FUN_004be6ba() {}
function FUN_004c21d5() {}
function FUN_004f1220() {}
function FUN_004c2b73() {}
function FUN_00598d45() { return 0; }
function FUN_00597d6f() { return -1; }
function FUN_00598197() { return -1; }
function FUN_00598a05() { return 0; }
function FUN_004a7577() { return 0; }
function FUN_004a75a6() { return 0; }
function FUN_0042b824() {}
function FUN_00493d13() { return 0; }
function FUN_0046e020() {}
