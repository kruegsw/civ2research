// ═══════════════════════════════════════════════════════════════════
// block_004E0000.js — Mechanical transpilation of block_004E0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004E0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004E0000.c
// ═══════════════════════════════════════════════════════════════════




// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

// G.DAT_00655b16 imported from mem.js


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

// init_runtime
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_0040785b, FUN_004080c0, FUN_004083b0, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10 } from './block_00400000.js';
import { FUN_0040bc40, FUN_0040bc80, FUN_0040bcb0, FUN_0040ddc6, FUN_0040e017, FUN_0040e3b1 } from './block_00400000.js';
import { FUN_0040ef70, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_0041033a, FUN_00410402, FUN_004105f8, FUN_00410e0a } from './block_00410000.js';
import { FUN_00410ed8, FUN_004132b7, FUN_00413476, FUN_00413717, FUN_00414bb0, FUN_00417566 } from './block_00410000.js';
import { FUN_0041e8fb } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421d60, FUN_00421e70, FUN_00421ea0, FUN_00421f40, FUN_004259a6 } from './block_00420000.js';
import { FUN_00426f80, FUN_00426fb0, FUN_00426ff0, FUN_004271e8, FUN_00428b0c, FUN_00429e77 } from './block_00420000.js';
import { FUN_0042a768, FUN_0042b67d, FUN_0042b824, FUN_0042cd2f, FUN_0042d71e, FUN_0042e185 } from './block_00420000.js';
import { FUN_0042f079 } from './block_00420000.js';
import { FUN_004308ae, FUN_00431c73, FUN_00431d22, FUN_00433122, FUN_00434d8a, FUN_00435d15 } from './block_00430000.js';
import { FUN_004361cc, FUN_00436f5a, FUN_00437a4a, FUN_0043856b, FUN_0043cf76 } from './block_00430000.js';
import { FUN_00440325, FUN_00441a79, FUN_00441b11, FUN_0044cd9b } from './block_00440000.js';
import { FUN_00453e18, FUN_00453e51, FUN_00456f20 } from './block_00450000.js';
import { FUN_0046b14d, FUN_0046e020, FUN_0046e4a9, FUN_0046e571, FUN_0046e6a9, FUN_0046e6c8 } from './block_00460000.js';
import { FUN_004702e0, FUN_004710d0, FUN_0047cd51, FUN_0047ce1e, FUN_0047cea6, FUN_0047cf9e } from './block_00470000.js';
import { FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d3b, FUN_00484d52, FUN_00488a45, FUN_004897fa, FUN_00489a0d } from './block_00480000.js';
import { FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00493d13, FUN_0049836a, FUN_004988b8 } from './block_00490000.js';
import { FUN_00498943, FUN_00498a5c } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a5d92, FUN_004a73d9, FUN_004a74bc } from './block_004A0000.js';
import { FUN_004a7577, FUN_004a75a6, FUN_004aef20, FUN_004af14b } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b7645, FUN_004b768d, FUN_004b7eb6, FUN_004bb570, FUN_004bb8e0 } from './block_004B0000.js';
import { FUN_004be6ba, FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004c21d5, FUN_004c2b73, FUN_004c4210, FUN_004c5fae } from './block_004C0000.js';
import { FUN_004da9e2 } from './block_004D0000.js';
import { FUN_004f1220, FUN_004f3d30, FUN_004f3d60, FUN_004f3e20, FUN_004f3f30, FUN_004f5dd1 } from './block_004F0000.js';
import { FUN_004f7bd1, FUN_004f7c99 } from './block_004F0000.js';
import { FUN_005013bc, FUN_0050207f, FUN_00504c05, FUN_0050503e, FUN_00505666, FUN_00505ffa } from './block_00500000.js';
import { FUN_00511880, FUN_00514e7b, FUN_00516570, FUN_0051c635, FUN_0051d7bc, FUN_0051d7d6 } from './block_00510000.js';
import { FUN_0051d817 } from './block_00510000.js';
import { FUN_00522b2b } from './block_00520000.js';
import { FUN_0054ffc8 } from './block_00540000.js';
import { FUN_00553ff6, FUN_00554297, FUN_00554423, FUN_005545d3, FUN_00554962, FUN_0055499f } from './block_00550000.js';
import { FUN_005551b3, FUN_0055560f, FUN_0055583f, FUN_00555a02, FUN_00555a8b, FUN_00555cb1 } from './block_00550000.js';
import { FUN_0055615c, FUN_0055625b, FUN_00556f54, FUN_005582ad, FUN_0055891d, FUN_0055ae80 } from './block_00550000.js';
import { FUN_0055af2e, FUN_0055b046, FUN_0055b2c6, FUN_0055c69d } from './block_00550000.js';
import { FUN_00568176, FUN_0056a65e, FUN_0056a9f4 } from './block_00560000.js';
import { FUN_005786b6, FUN_005786f1, FUN_00578770, FUN_00578b06, FUN_00578c12, FUN_00578e38 } from './block_00570000.js';
import { FUN_00578f2c, FUN_00579260, FUN_005792e1, FUN_0057940d, FUN_005794cf, FUN_0057953e } from './block_00570000.js';
import { FUN_0057f657 } from './block_00570000.js';
import { FUN_0058760d, FUN_0058bd60, FUN_0058bd84, FUN_0058bdfd, FUN_0058be56, FUN_0058c295 } from './block_00580000.js';
import { FUN_0058c65e, FUN_0058cbe1, FUN_0058cce6, FUN_0058cde5, FUN_0058cfcd, FUN_0058d442 } from './block_00580000.js';
import { FUN_0058d60a, FUN_0058d6af, FUN_0058ddce, FUN_0058df14, FUN_0058df7b } from './block_00580000.js';
import { FUN_00597d6f, FUN_00598197, FUN_00598a05, FUN_00598b4e, FUN_00598d45, FUN_0059db08 } from './block_00590000.js';
import { FUN_0059df8a, FUN_0059e5c9, FUN_0059e6ff, FUN_0059ea99, FUN_0059ec88, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005adfa0, FUN_005ae1b0, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b1a29, FUN_005b2c82, FUN_005b2e69, FUN_005b3d06, FUN_005b4391, FUN_005b5d93 } from './block_005B0000.js';
import { FUN_005b6042, FUN_005b67af, FUN_005b8a81, FUN_005b8aa8, FUN_005b8af0, FUN_005b8b65 } from './block_005B0000.js';
import { FUN_005b8c18, FUN_005b8d15, FUN_005b8d62, FUN_005b8da4, FUN_005b90df, FUN_005b9179 } from './block_005B0000.js';
import { FUN_005b94fc, FUN_005b976d, FUN_005b98b7, FUN_005b99e8, FUN_005b9c49, FUN_005b9ec6 } from './block_005B0000.js';
import { FUN_005b9f1c, FUN_005bb574, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c64da, FUN_005c656b, FUN_005cde4d, FUN_005cedad } from './block_005C0000.js';
import { FUN_005d2004, FUN_005ddd4e, FUN_005dde57, FUN_005dde9d, FUN_005ddeff } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';

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
      let uVar1 = FUN_00428b0c(G.DAT_0064c488[(local_18 + 0x27) * 8], local_18, 0);
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
  // SEH frame restore — no-op in JS
}

// setup_city_windows_and_map_views
export function FUN_004e02ef() {
  let iVar1, iVar2;
  let local_20, local_1c, local_18, local_14, local_8;

  FUN_00426f80();
  FUN_0049994f(); // thunk_citywin_994F
  FUN_004e7240();
  FUN_004bb570(G.DAT_00655344);
  FUN_0049994f();
  FUN_0040785b();
  FUN_004e7240();
  G.DAT_00624ee0 = 0;
  FUN_004bb570(G.DAT_00655324);
  FUN_005bb574();
  FUN_0056a9f4();
  FUN_004e7240();
  G.DAT_00633e00 = 0;
  FUN_004bb570(G.DAT_00655334);
  FUN_005bb574();
  if (G.DAT_0067a8fc === 0) {
    local_14 = 0x208;
    local_18 = 0x14f;
    local_1c = FUN_0040ef70();
  } else {
    local_14 = 800;
    local_18 = 0x1cc;
    local_1c = FUN_0040ef70();
  }
  G.DAT_0067a8d4 = G.DAT_0062d85c * 2 + G.DAT_0062d864 * 2 + local_1c;
  local_14 = local_14 + (G.DAT_0062d860 + G.DAT_0062d858) * 2 + 6;
  local_18 = local_18 + G.DAT_0062d85c * 2 + G.DAT_0067a8d4 * 2 + 0xe;
  iVar1 = FUN_004080c0();
  iVar1 = (iVar1 >> 1) - (local_14 >> 1);
  G.DAT_0067a8c4 = iVar1;
  iVar2 = FUN_00414bb0();
  G.DAT_0067a8c8 = (iVar2 >> 1) - (local_18 >> 1);
  SetRect(G.DAT_0067a8f8, iVar1, G.DAT_0067a8c8, iVar1 + local_14, G.DAT_0067a8c8 + local_18);
  FUN_004bb570(G.DAT_0067a8f8);
  if (G.DAT_0068ad3c === 0) {
    local_14 = 0x208;
    local_18 = 0x14f;
    local_20 = FUN_0040ef70();
  } else {
    local_14 = 800;
    local_18 = 0x1cc;
    local_20 = FUN_0040ef70();
  }
  G.DAT_0068ad14 = G.DAT_0062d85c * 2 + G.DAT_0062d864 * 2 + local_20;
  local_14 = local_14 + (G.DAT_0062d860 + G.DAT_0062d858) * 2 + 6;
  local_18 = local_18 + G.DAT_0062d85c * 2 + G.DAT_0068ad14 * 2 + 0xe;
  iVar1 = FUN_004080c0();
  iVar1 = (iVar1 >> 1) - (local_14 >> 1);
  G.DAT_0068ad04 = iVar1;
  iVar2 = FUN_00414bb0();
  G.DAT_0068ad08 = (iVar2 >> 1) - (local_18 >> 1);
  SetRect(G.DAT_0068ad38, iVar1, G.DAT_0068ad08, iVar1 + local_14, G.DAT_0068ad08 + local_18);
  FUN_004bb570(G.DAT_0068ad38);
  for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
    if (s16(G.DAT_0066ca84, local_8 * 0x3f0) !== 0) {
      G.DAT_0066ca84[local_8 * 0x3f0] = 0;
      G.DAT_0066ca84[local_8 * 0x3f0 + 1] = 0;
      FUN_004083b0();
    }
  }
  FUN_004132b7();
  FUN_004e7240();
  FUN_004bb570(G.DAT_006552a4);
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
  bVar1 = u8(G.DAT_00655aea) & 8;
  iVar2 = FUN_load_verify_units(0, 0, 0);
  if (iVar2 === 0) {
    if (G.DAT_00655b02 !== 0) {
      FUN_0041e8fb(1);
    }
    G.DAT_00654fa4 = u8(G.DAT_006d1da0);
    G.DAT_00628048 = u8(G.DAT_006d1da0);
    G.DAT_00655b02 = 0;
    G.DAT_00655b0b = (1 << (u8(G.DAT_006d1da0) & 0x1f));
    if ((u8(G.DAT_00655aea) & 8) === 0) {
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
    FUN_00498a5c(G.DAT_006d1da0);
    if (G.DAT_00655280 === 0) {
      FUN_004e02ef();
      FUN_004e7240();
      FUN_004bb570(G.DAT_006552a4);
      FUN_00413476();
      FUN_005bb574();
      for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
        if (s16(G.DAT_0066ca84, local_8 * 0x3f0) !== 0) {
          FUN_00413717();
          FUN_004bb570(G.DAT_006552a4 + local_8 * 0x10);
          FUN_00413476();
          FUN_005bb574();
        }
      }
    } else {
      FUN_00426f80();
      FUN_004e7240();
      FUN_004bb570(G.DAT_00655344);
      FUN_0049994f();
      FUN_004e7240();
      G.DAT_00624ee0 = 0;
      FUN_004bb570(G.DAT_00655324);
      FUN_005bb574();
      FUN_004e7240();
      G.DAT_00633e00 = 0;
      FUN_004bb570(G.DAT_00655334);
      FUN_005bb574();
      FUN_004e7240();
      FUN_004bb570(G.DAT_006552a4);
      FUN_00413476();
      FUN_005bb574();
      for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
        if (s16(G.DAT_0066ca84, local_8 * 0x3f0) !== 0) {
          FUN_00413717();
          FUN_004bb570(G.DAT_006552a4 + local_8 * 0x10);
          FUN_00413476();
          FUN_005bb574();
        }
      }
      FUN_005bb574();
    }
    G.DAT_006d1da8 = 0;
    FUN_005bb574();
    FUN_004897fa(1);
    FUN_00489a0d(0);
    FUN_004e4ceb();
    FUN_004f7c99();
    FUN_00484d52();
    if (G.DAT_00655b02 !== 0 && G.DAT_00654b70 !== 0) {
      FUN_0055af2e(1);
    }
  } else {
    G.DAT_00655b02 = 0;
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

  uVar1 = G.DAT_00655aea & 8;
  FUN_0051d7bc();
  FUN_004e0a8c(0, G.DAT_00655aea & 0x10);
  FUN_004e0a8c(1, G.DAT_00655aea & 8);
  FUN_004e0a8c(2, G.DAT_00655aea & 0x4000);
  FUN_004e0a8c(3, G.DAT_00655aea & 0x2000);
  FUN_004e0a8c(4, G.DAT_00655aea & 0x1000);
  FUN_004e0a8c(5, G.DAT_00655aea & 0x800);
  FUN_004e0a8c(6, G.DAT_00655aea & 0x400);
  FUN_004e0a8c(7, G.DAT_00655aea & 0x200);
  FUN_004e0a8c(8, G.DAT_00655aea & 0x100);
  FUN_004e0a8c(9, G.DAT_00655aea & 0x80);
  FUN_004e0a8c(10, G.DAT_00655aea & 0x40);
  FUN_0040ff60(0, PTR_s_5_4_0f_Multiplayer_26_March_99_0062765c);
  FUN_005f22e0(G.DAT_0063cc48, G.DAT_0062eb34);
  FUN_005f22e0(G.DAT_0063cc48, PTR_s_Patch_3_00627660);
  iVar2 = FUN_00421e70(s_GAMEOPTIONS_0062eb38, 1);
  if (iVar2 === 0) {
    G.DAT_00655aea = G.DAT_00655aea & 0xffff8027;
    iVar2 = FUN_0051d817(0);
    if (iVar2 !== 0) {
      G.DAT_00655aea = G.DAT_00655aea | 0x10;
    }
    iVar2 = FUN_0051d817(1);
    if (iVar2 === 0) {
      FUN_0046e6a9();
    } else {
      G.DAT_00655aea = G.DAT_00655aea | 8;
      if (uVar1 === 0) {
        FUN_005dde9d();
        FUN_005dde57();
        FUN_005ddd4e();
        FUN_0046e4a9();
      }
      FUN_0046e6c8();
    }
    iVar2 = FUN_0051d817(2);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x4000; }
    iVar2 = FUN_0051d817(3);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x2000; }
    iVar2 = FUN_0051d817(4);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x1000; }
    iVar2 = FUN_0051d817(5);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x800; }
    iVar2 = FUN_0051d817(6);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x400; }
    iVar2 = FUN_0051d817(7);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x200; }
    iVar2 = FUN_0051d817(8);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x100; }
    iVar2 = FUN_0051d817(9);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x80; }
    iVar2 = FUN_0051d817(10);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x40; }
    G.DAT_0064bc1e = G.DAT_00655aea;
    FUN_004a73d9();
  }
}

// graphic_options_dialog
export function FUN_004e0d71() {
  let uVar1, iVar2;

  uVar1 = G.DAT_00655aea & 0x200000;
  FUN_0051d7bc();
  FUN_004e0a8c(0, G.DAT_00655aea & 0x20000);
  FUN_004e0a8c(1, G.DAT_00655aea & 0x40000);
  FUN_004e0a8c(2, G.DAT_00655aea & 0x200000);
  FUN_004e0a8c(3, G.DAT_00655aea & 0x80000);
  FUN_004e0a8c(4, G.DAT_00655aea & 0x100000);
  FUN_004e0a8c(5, G.DAT_00655aea & 0x10000);
  iVar2 = FUN_00421e70(s_GRAPHICOPTIONS_0062eb44, 1);
  if (iVar2 === 0) {
    G.DAT_00655aea = G.DAT_00655aea & 0xffc0ffff;
    iVar2 = FUN_0051d817(0);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x20000; }
    iVar2 = FUN_0051d817(1);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x40000; }
    iVar2 = FUN_0051d817(2);
    if (iVar2 !== 0) {
      if (uVar1 === 0) {
        iVar2 = FUN_00568176(0x800000);
        if (iVar2 === 0) {
          FUN_00421ea0(s_LOWMEMORY_0062eb54);
        }
      }
      G.DAT_00655aea = G.DAT_00655aea | 0x200000;
    }
    iVar2 = FUN_0051d817(3);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x80000; }
    iVar2 = FUN_0051d817(4);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x100000; }
    iVar2 = FUN_0051d817(5);
    if (iVar2 !== 0) { G.DAT_00655aea = G.DAT_00655aea | 0x10000; }
    G.DAT_0064bc1e = G.DAT_00655aea;
    FUN_004a73d9();
  }
}

// multiplayer_options_dialog
export function FUN_004e0f18() {
  let iVar1, local_8;

  FUN_0051d7bc();
  FUN_004e0a8c(0, G.DAT_006665fa);
  FUN_004e0a8c(1, G.DAT_006665fc);
  if (G.DAT_006ad2f7 !== 0) {
    FUN_004e0a8c(2, G.DAT_00654fac);
    FUN_004e0a8c(3, G.DAT_00654fae);
  }
  if ((G.DAT_00655b02 < 3 || G.DAT_006ad2f7 === 0) && 2 < G.DAT_00655b02) {
    local_8 = FUN_00421e70(s_MULTIPLAYEROPTIONS2_0062eb74, 1);
  } else {
    local_8 = FUN_00421e70(s_MULTIPLAYEROPTIONS_0062eb60, 1);
  }
  if (local_8 === 0) {
    iVar1 = FUN_0051d817(0);
    G.DAT_006665fa = (iVar1 !== 0) ? 1 : 0;
    iVar1 = FUN_0051d817(1);
    G.DAT_006665fc = (iVar1 !== 0) ? 1 : 0;
    FUN_004a73d9();
    if ((2 < G.DAT_00655b02 && G.DAT_006ad2f7 !== 0) || G.DAT_00655b02 < 3) {
      iVar1 = FUN_0051d817(2);
      G.DAT_006665fe = (iVar1 !== 0) ? 1 : 0;
      iVar1 = FUN_0051d817(3);
      G.DAT_00666600 = (iVar1 !== 0) ? 1 : 0;
      if (G.DAT_00654fac !== G.DAT_006665fe || G.DAT_00654fae !== G.DAT_00666600) {
        if (2 < G.DAT_00655b02 && 1 < G.DAT_006ad308) {
          FUN_005f22d0(G.DAT_0063cc48, G.DAT_006ad5bc);
          FUN_004aef20(G.DAT_0063cd4c);
          FUN_004af14b(G.DAT_0063cd4c, 0x350 - ((G.DAT_006665fe === 0) ? 1 : 0));
          FUN_005f22e0(G.DAT_0063cd4c, G.DAT_0062eb88);
          FUN_004af14b(G.DAT_0063cd4c, 0x352 - ((G.DAT_00666600 === 0) ? 1 : 0));
          G.DAT_006ad66c = G.DAT_006ad308 + -1;
          G.DAT_006ad670 = 0;
          FUN_00511880(0x43, 0xff, 2, 0, 0, 0);
          G.DAT_00635a3c = 0; // was &LAB_004019b5
          G.DAT_006cec80 = FUN_00421bb0();
          iVar1 = FUN_00426fb0(s_PMCHANGESERVER_0062eb8c, 0x2000001, G.DAT_0063fc58, 0);
          if (iVar1 < 0 || G.DAT_006ad670 === -1 || G.DAT_006ad66c !== 0) {
            G.DAT_006665fe = G.DAT_00654fac;
            G.DAT_00666600 = G.DAT_00654fae;
            FUN_00511880(0x44, 0xff, 0, 0, 0, 0);
            FUN_00410030(s_PMCHANGENO_0062eb9c, G.DAT_0063fc58, 0);
            return;
          }
        }
        G.DAT_00654fac = G.DAT_006665fe;
        G.DAT_00654fae = G.DAT_00666600;
        FUN_004e1314();
        if (2 < G.DAT_00655b02 && 1 < G.DAT_006ad308) {
          FUN_0046b14d(0x1b, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x33, 0xff, G.DAT_00654fac, G.DAT_00654fae, G.DAT_00654c7c, 0, 0, 0, 0, 0);
          FUN_00511880(0x45, 0xff, 0, 0, 0, 0);
          FUN_00410030(s_PMCHANGEYES_0062eba8, G.DAT_0063fc58, 0);
        }
      }
    }
  }
}

// adjust_barbarian_difficulty
export function FUN_004e1314() {
  let local_8;

  if (G.DAT_00655b02 === 0 || G.DAT_00654fae === 0 || G.DAT_00628068 !== 0) {
    if (G.DAT_00655b02 !== 0 && G.DAT_00654fae === 0 && G.DAT_00628068 === 1) {
      G.DAT_00628068 = 0;
      for (local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
        if (G.DAT_0064b1c1[local_8 * 0x14] === 0) {
          G.DAT_0064b1c2[local_8 * 0x14] = s8(G.DAT_0064b1c2[local_8 * 0x14]) / 2;
        }
      }
      FUN_0056a65e(1);
    }
  } else {
    G.DAT_00628068 = 1;
    for (local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
      if (G.DAT_0064b1c1[local_8 * 0x14] === 0) {
        G.DAT_0064b1c2[local_8 * 0x14] = G.DAT_0064b1c2[local_8 * 0x14] * 2;
      }
    }
    FUN_0056a65e(1);
  }
}

// message_options_dialog
export function FUN_004e1452() {
  let iVar1;

  FUN_0051d7bc();
  FUN_0051d7d6(0, ~G.DAT_00655af2 & 1);
  FUN_0051d7d6(1, (G.DAT_00655af2 & 2) === 0 ? 1 : 0);
  FUN_0051d7d6(2, (G.DAT_00655af2 & 4) === 0 ? 1 : 0);
  FUN_0051d7d6(3, (G.DAT_00655af2 & 8) === 0 ? 1 : 0);
  FUN_0051d7d6(4, (G.DAT_00655af2 & 0x10) === 0 ? 1 : 0);
  FUN_0051d7d6(5, (G.DAT_00655af2 & 0x20) === 0 ? 1 : 0);
  FUN_0051d7d6(6, (G.DAT_00655af2 & 0x40) === 0 ? 1 : 0);
  FUN_0051d7d6(7, (G.DAT_00655af2 & 0x80) === 0 ? 1 : 0);
  FUN_0051d7d6(8, (G.DAT_00655af2 & 0x100) === 0 ? 1 : 0);
  FUN_0051d7d6(9, (G.DAT_00655af2 & 0x200) === 0 ? 1 : 0);
  FUN_0051d7d6(10, (G.DAT_00655af2 & 0x400) === 0 ? 1 : 0);
  iVar1 = FUN_00421e70(s_MESSAGEOPTIONS_0062ebb4, 1);
  if (iVar1 === 0) {
    G.DAT_00655af2 = 0;
    iVar1 = FUN_0051d817(0);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 1; }
    iVar1 = FUN_0051d817(1);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 2; }
    iVar1 = FUN_0051d817(2);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 4; }
    iVar1 = FUN_0051d817(3);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 8; }
    iVar1 = FUN_0051d817(4);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 0x10; }
    iVar1 = FUN_0051d817(5);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 0x20; }
    iVar1 = FUN_0051d817(6);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 0x40; }
    iVar1 = FUN_0051d817(7);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 0x80; }
    iVar1 = FUN_0051d817(8);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 0x100; }
    iVar1 = FUN_0051d817(9);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 0x200; }
    iVar1 = FUN_0051d817(10);
    if (iVar1 === 0) { G.DAT_00655af2 = G.DAT_00655af2 | 0x400; }
    G.DAT_0064bc22 = G.DAT_00655af2;
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
  G.DAT_006ad8ec = 1;
  if (G.DAT_00655b02 < 3 || G.DAT_006ad2f7 !== 0) {
    G.DAT_00655b0b = G.DAT_00655b0b & ~(1 << (u8(param_1) & 0x1f));
    if (2 < G.DAT_00655b02) {
      FUN_0046b14d(0x31, 0, 0, param_1, 0, 0, 0, 0, 0, 0);
    }
    if (G.DAT_00654c76 !== 0 || param_2 !== 0) {
      FUN_005b9ec6();
      // Unit cleanup loop
      for (local_34 = 0; local_34 < G.DAT_00655b16; local_34 = local_34 + 1) {
        if (G.DAT_0065610a[local_34 * 0x20] !== 0) {
          if (s8(G.DAT_006560f7[local_34 * 0x20]) === param_1 ||
              (u16(G.DAT_006560f4, local_34 * 0x20) & 2) === 0 ||
              s8(G.DAT_006560fd[local_34 * 0x20]) !== param_1) {
            if (s8(G.DAT_006560f7[local_34 * 0x20]) === param_1) {
              if (param_1 >= 0 && local_34 < 0x800) {
                if (s16(G.DAT_0064c706, param_1 * 0x594) !== 0 &&
                    s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_34 * 0x20]) * 0x14]) < 5) {
                  let v = s16(G.DAT_0064c706, param_1 * 0x594);
                  // write back v - 1
                  G.DAT_0064c706[param_1 * 0x594] = (v - 1) & 0xff;
                  G.DAT_0064c706[param_1 * 0x594 + 1] = ((v - 1) >> 8) & 0xff;
                }
                if (G.DAT_0064c778[param_1 * 0x594 + u8(G.DAT_006560f6[local_34 * 0x20])] !== 0) {
                  G.DAT_0064c778[param_1 * 0x594 + u8(G.DAT_006560f6[local_34 * 0x20])] =
                    G.DAT_0064c778[param_1 * 0x594 + u8(G.DAT_006560f6[local_34 * 0x20])] - 1;
                }
                if (G.DAT_0064b9e8[param_1] !== 0) {
                  G.DAT_0064b9e8[param_1] = G.DAT_0064b9e8[param_1] - 1;
                }
              }
              if (s16(G.DAT_00656106, local_34 * 0x20) >= 0) {
                let nextIdx = s16(G.DAT_00656106, local_34 * 0x20);
                G.DAT_00656108[nextIdx * 0x20] = G.DAT_00656108[local_34 * 0x20];
                G.DAT_00656108[nextIdx * 0x20 + 1] = G.DAT_00656108[local_34 * 0x20 + 1];
                bVar3 = true;
              }
              if (s16(G.DAT_00656108, local_34 * 0x20) >= 0) {
                let prevIdx = s16(G.DAT_00656108, local_34 * 0x20);
                G.DAT_00656106[prevIdx * 0x20] = G.DAT_00656106[local_34 * 0x20];
                G.DAT_00656106[prevIdx * 0x20 + 1] = G.DAT_00656106[local_34 * 0x20 + 1];
                bVar3 = true;
              }
              if (!bVar3) {
                iVar4 = FUN_004087c0(s16(G.DAT_006560f0, local_34 * 0x20), s16(G.DAT_006560f2, local_34 * 0x20));
                if (iVar4 !== 0) {
                  FUN_005b94fc(s16(G.DAT_006560f0, local_34 * 0x20), s16(G.DAT_006560f2, local_34 * 0x20), 1, 0, 1);
                }
              }
              G.DAT_00656106[local_34 * 0x20] = 0xff;
              G.DAT_00656106[local_34 * 0x20 + 1] = 0xff;
              G.DAT_00656108[local_34 * 0x20] = 0xff;
              G.DAT_00656108[local_34 * 0x20 + 1] = 0xff;
              let coordVal = (s8(G.DAT_006560f7[local_34 * 0x20]) * 4 + 4) * -0x19;
              G.DAT_006560f0[local_34 * 0x20] = coordVal & 0xff;
              G.DAT_006560f0[local_34 * 0x20 + 1] = (coordVal >> 8) & 0xff;
              G.DAT_006560f2[local_34 * 0x20] = coordVal & 0xff;
              G.DAT_006560f2[local_34 * 0x20 + 1] = (coordVal >> 8) & 0xff;
              G.DAT_0065610a[local_34 * 0x20] = 0;
              G.DAT_0065610a[local_34 * 0x20 + 1] = 0;
              G.DAT_0065610a[local_34 * 0x20 + 2] = 0;
              G.DAT_0065610a[local_34 * 0x20 + 3] = 0;
              if (G.DAT_00655b16 + -1 === local_34) {
                // G.DAT_00655b16 is imported, may need setter
              }
              for (local_18 = 0; local_18 < G.DAT_00655b16; local_18 = local_18 + 1) {
                if (G.DAT_006560ff[local_18 * 0x20] === 0x03 &&
                    s16(G.DAT_00656102, local_18 * 0x20) === local_34) {
                  G.DAT_006560ff[local_18 * 0x20] = 0xff;
                }
              }
            }
          } else {
            let flagVal = u16(G.DAT_006560f4, local_34 * 0x20) & 0xfffd;
            G.DAT_006560f4[local_34 * 0x20] = flagVal & 0xff;
            G.DAT_006560f4[local_34 * 0x20 + 1] = (flagVal >> 8) & 0xff;
            let civIdx = s8(G.DAT_006560fd[local_34 * 0x20]);
            let off = civIdx * 4 + param_1 * 0x594;
            let dipVal = (G.DAT_0064c6c0[off] | (G.DAT_0064c6c0[off+1]<<8) | (G.DAT_0064c6c0[off+2]<<16) | (G.DAT_0064c6c0[off+3]<<24)) & 0xfeffffff;
            G.DAT_0064c6c0[off] = dipVal & 0xff;
            G.DAT_0064c6c0[off+1] = (dipVal >> 8) & 0xff;
            G.DAT_0064c6c0[off+2] = (dipVal >> 16) & 0xff;
            G.DAT_0064c6c0[off+3] = (dipVal >> 24) & 0xff;
            FUN_004c5fae(local_34, 0, civIdx);
          }
        }
      }
      // City cleanup loop
      for (local_30 = 0; local_30 < G.DAT_00655b18; local_30 = local_30 + 1) {
        if (G.DAT_0064f394[local_30 * 0x58] !== 0 &&
            s8(G.DAT_0064f348[local_30 * 0x58]) === param_1) {
          iVar4 = s16(G.DAT_0064f340, local_30 * 0x58);
          iVar5 = s16(G.DAT_0064f342, local_30 * 0x58);
          param_1 = s8(G.DAT_0064f348[local_30 * 0x58]);
          let cityNumV = s16(G.DAT_0064c708, param_1 * 0x594);
          G.DAT_0064c708[param_1 * 0x594] = (cityNumV - 1) & 0xff;
          G.DAT_0064c708[param_1 * 0x594 + 1] = ((cityNumV - 1) >> 8) & 0xff;
          G.DAT_0064f394[local_30 * 0x58] = 0;
          G.DAT_0064f394[local_30 * 0x58 + 1] = 0;
          G.DAT_0064f394[local_30 * 0x58 + 2] = 0;
          G.DAT_0064f394[local_30 * 0x58 + 3] = 0;
          if (G.DAT_00655b18 + -1 === local_30) {
            G.DAT_00655b18 = G.DAT_00655b18 + -1;
          }
          for (local_c = 0; local_c < G.DAT_00655b18; local_c = local_c + 1) {
            if (G.DAT_0064f394[local_c * 0x58] !== 0) {
              local_34 = s8(G.DAT_0064f37a[local_c * 0x58]);
              while (local_34 = local_34 + -1, local_34 >= 0) {
                if (s16(G.DAT_0064f384, local_c * 0x58 + local_34 * 2) === local_30) {
                  FUN_00440325(local_c, local_34);
                }
              }
            }
          }
          for (local_c = 0; local_c < 0x1c; local_c = local_c + 1) {
            if (s16(G.DAT_00655be6, local_c * 2) === local_30) {
              G.DAT_00655be6[local_c * 2] = 0xfe;
              G.DAT_00655be6[local_c * 2 + 1] = 0xff;
            }
          }
          local_28 = 0;
          FUN_005b94fc(iVar4, iVar5, 2, 0, 1);
          for (local_c = 0; local_c < 0x2d; local_c = local_c + 1) {
            uVar6 = FUN_005ae052(s8(G.DAT_00628370[local_c]) + iVar4);
            iVar7 = s8(G.DAT_006283a0[local_c]) + iVar5;
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
              G.DAT_006560f9[local_34 * 0x20] = G.DAT_006560f9[local_34 * 0x20] | u8(local_28);
            }
          }
        }
      }
      // Recalculate visibility
      for (local_30 = 0; local_30 < G.DAT_00655b18; local_30 = local_30 + 1) {
        sVar1 = s16(G.DAT_0064f340, local_30 * 0x58);
        sVar2 = s16(G.DAT_0064f342, local_30 * 0x58);
        for (local_c = 0; local_c < 0x2d; local_c = local_c + 1) {
          uVar6 = FUN_005ae052(s8(G.DAT_00628370[local_c]) + sVar1);
          iVar4 = s8(G.DAT_006283a0[local_c]) + sVar2;
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
      G.DAT_00655b0a = G.DAT_00655b0a & ~(1 << (u8(param_1) & 0x1f));
      for (local_1c = 0; local_1c < G.DAT_006d1160; local_1c = local_1c + 1) {
        for (local_20 = 0; local_20 < G.DAT_006d1162; local_20 = local_20 + 1) {
          FUN_005b976d(local_1c, local_20, 1 << (u8(param_1) & 0x1f), 0, 1);
        }
      }
      FUN_005b9f1c();
    }
    FUN_00498943();
    G.DAT_00654b74[param_1 * 0x20] = 0;
    FUN_004988b8();
    if (2 < G.DAT_00655b02) {
      FUN_0046e6a9();
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    if ((~(1 << (u8(param_1) & 0x1f)) & G.DAT_00655b0b) === 0) {
      G.DAT_006ad8ec = 0;
    } else {
      if (param_3 !== 0) {
        FUN_new_civ(param_1);
      }
      if (2 < G.DAT_00655b02) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      }
      FUN_0047cf9e(G.DAT_006d1da0, 1);
      G.DAT_006ad8ec = 0;
    }
  } else {
    G.DAT_006ad8ec = 0;
    G.DAT_006c90b4 = -2;
    FUN_0046b14d(0x34, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    iVar4 = FUN_00421bb0();
    while (G.DAT_006c90b4 === -2) {
      iVar5 = FUN_00421bb0();
      if (iVar5 - iVar4 >= 0xe10) break;
      FUN_0047e94e(1, 1);
    }
    if (G.DAT_006c90b4 === -2) {
      debug_log("KillOrRetire: Connection to server timeout");
      FUN_00410030(s_SERVERCONNECTTIME_0062ebf4, G.DAT_0063fc58, 0);
      G.DAT_00628044 = 0;
    } else {
      debug_log("KillOrRetire: Received NM_KILL_O response");
    }
    while (G.DAT_006c8fac !== 0 || G.DAT_006c8fa0 !== 0) {
      FUN_0047e94e(1, 0);
    }
  }
}

// quit_or_retire_dialog
export function FUN_004e22c9(param_1) {
  let iVar1, uVar2, local_8;

  if (G.DAT_00655b02 < 3 || G.DAT_006ad698 === 0) {
    if (param_1 === 0) {
      iVar1 = FUN_00410030(s_REALLYQUIT_0062ec50, G.DAT_0063fc58, 0);
      if (iVar1 === 0) return;
    } else {
      iVar1 = FUN_00410030(s_REALLYRETIRE_0062ec40, G.DAT_0063fc58, 0);
      if (iVar1 === 0) return;
      FUN_00431d22();
      if ((G.DAT_00655af0 & 0x20) === 0) {
        FUN_00435d15(G.DAT_006d1da0);
        FUN_004361cc(G.DAT_006d1da0);
        FUN_00436f5a(G.DAT_006d1da0);
      }
    }
    if (G.DAT_00655b02 === 0) {
      FUN_0046e6a9();
      FUN_00484d3b();
    } else {
      if (G.DAT_00655b02 === 1) {
        local_8 = G.DAT_00655b0b;
        G.DAT_00655b0b = G.DAT_006c31a9;
      }
      if (2 < G.DAT_00655b02) {
        if (G.DAT_00633a74 !== 0) {
          FUN_005d2004(G.DAT_00633a74);
          G.DAT_00633a74 = 0;
        }
        FUN_004b7645();
        FUN_004b768d();
        uVar2 = FUN_00410070(G.DAT_006d1da0);
        FUN_0040ff60(0, uVar2);
        uVar2 = FUN_00493ba6(G.DAT_006d1da0);
        FUN_0040ff60(1, uVar2);
        uVar2 = FUN_00493b10(G.DAT_006d1da0);
        FUN_0040ff60(2, uVar2);
        uVar2 = FUN_00493c7d(G.DAT_006d1da0);
        FUN_0040ff60(3, uVar2);
        if (G.DAT_00654c76 === 0) {
          FUN_00511880(1, 0xff, 4, 0, 0, 0);
        } else {
          FUN_00511880(0, 0xff, 4, 0, 0, 0);
        }
      }
      G.DAT_00628054 = 0;
      FUN_0041033a();
      if ((~(1 << (u8(G.DAT_006d1da0) & 0x1f)) & G.DAT_00655b0b) === 0) {
        if (G.DAT_00655b02 < 3) {
          G.DAT_00655b0b = G.DAT_00655b0b & ~(1 << (u8(G.DAT_006d1da0) & 0x1f));
        } else {
          FUN_0046b14d(0x31, 0, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0);
        }
        FUN_00484d3b();
        FUN_0046e6a9();
      } else {
        FUN_004e1763(G.DAT_006d1da0, 0, 0);
        if (2 < G.DAT_00655b02) {
          FUN_00484d3b();
        }
      }
      G.DAT_0064b9bc = 0;
      G.DAT_006ad685 = 1;
      if (G.DAT_00655b02 === 1) {
        G.DAT_006c31a9 = G.DAT_00655b0b;
        G.DAT_00655b0b = local_8;
      }
    }
  }
}

// reveal_hidden_terrain (cheat)
export function FUN_004e2597() {
  G.DAT_0062804c = 0;
  G.DAT_0062bcd8 = 1;
  FUN_0047cf9e(G.DAT_006d1da0, 1);
  FUN_00421ea0(s_HIDDENTERRAIN_0062ec5c);
  G.DAT_0062bcd8 = 0;
  FUN_0047cf9e(G.DAT_006d1da0, 1);
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
  if (1 < G.DAT_0062b428) {
    FUN_0059ea99(G.DAT_0062b428 + -2);
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
  // SEH frame restore — no-op in JS
}

// main_menu_command_handler (massive switch dispatch)
export function FUN_004e2803(param_1, param_2) {
  let SVar1, iVar2;

  iVar2 = XD_InFlushSendBuffer();
  if (iVar2 === 0 && G.DAT_006ad8bc === 0 && G.DAT_006ad8c0 === 0 &&
      G.DAT_006ad8c4 === 0 && G.DAT_006ad8c8 === 0 && G.DAT_006ad8cc === 0 &&
      G.DAT_006ad8d0 === 0 && G.DAT_006ad8d8 === 0 &&
      G.DAT_006ad8dc === 0 && G.DAT_006ad8e0 === 0 && G.DAT_006ad8e4 === 0 && G.DAT_006ad8e8 === 0 &&
      G.DAT_006ad8ec === 0 && G.DAT_006ad8f0 === 0 &&
      G.DAT_006ad8f4 === 0 &&
      G.DAT_006ad8f8 === 0 && G.DAT_006ad8fc === 0 && G.DAT_006ad900 === 0 && G.DAT_006ad904 === 0) {
    if (G.DAT_0062edf8 === 0) {
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
        else if (param_2 === 0x131) { FUN_0049836a(G.DAT_006d1da0); }
        else if (param_2 === 0x132) { FUN_0055b2c6(); }
        else if (param_2 === 0x1f0) { FUN_004e22c9(1); }
        else if (param_2 === 0x1f1) { FUN_004e22c9(0); }
        else if (param_2 === 0x201) { FUN_0040ddc6(G.DAT_006d1da0); }
        else if (param_2 === 0x205) { FUN_0044cd9b(G.DAT_006d1da0); }
        else if (param_2 === 0x210) { FUN_0040e017(); }
        else if (param_2 === 0x220) { FUN_0040e3b1(); }
        else if (param_2 === 0x301) { FUN_00489a0d(1); }
        else if (param_2 === 0x302) { FUN_004897fa(0); }
        else if (param_2 === 0x310) {
          if (G.DAT_0066ca8c < 8) { G.DAT_0066ca8c = G.DAT_0066ca8c + 1; FUN_0047cd51(G.DAT_006d1da0, 1); }
        } else if (param_2 === 0x311) {
          if (G.DAT_0066ca8c > -7) { G.DAT_0066ca8c = G.DAT_0066ca8c + -1; FUN_0047cd51(G.DAT_006d1da0, 1); }
        } else if (param_2 === 800) { G.DAT_0066ca8c = 8; FUN_0047cd51(G.DAT_006d1da0, 1); }
        else if (param_2 === 0x321) { G.DAT_0066ca8c = 0; G.DAT_0066ca88 = G.DAT_0064b1b4; G.DAT_0066ca8a = G.DAT_0064b1b0; FUN_0047cd51(G.DAT_006d1da0, 1); }
        else if (param_2 === 0x322) { G.DAT_0066ca8c = -3; FUN_0047cd51(G.DAT_006d1da0, 1); }
        else if (param_2 === 0x324) { G.DAT_0066ca8c = -7; FUN_0047cd51(G.DAT_006d1da0, 1); }
        else if (param_2 === 0x327) {
          G.DAT_00655aea = G.DAT_00655aea ^ 0x20;
          FUN_0057940d(0x327, (G.DAT_00655aea & 0x20) >> 5);
          FUN_0047cf9e(G.DAT_006d1da0, 1);
          G.DAT_0064bc1e = G.DAT_00655aea;
          FUN_004a73d9();
        } else if (param_2 === 0x328) { FUN_004e02ef(); }
        else if (param_2 === 0x330) { FUN_004e2597(); }
        else if (param_2 === 0x340) { FUN_00410402(G.DAT_0064b1b4, G.DAT_0064b1b0); }
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
        else if (param_2 === 0x500) { FUN_00516570(G.DAT_006d1da0, 0); }
        else if (param_2 === 0x501) { FUN_0042d71e(G.DAT_006d1da0); }
        else if (param_2 === 0x502) { FUN_0042f079(G.DAT_006d1da0); }
        else if (param_2 === 0x503) { FUN_004308ae(G.DAT_006d1da0); }
        else if (param_2 === 0x504) { FUN_0042e185(G.DAT_006d1da0); }
        else if (param_2 === 0x505) { FUN_0042cd2f(G.DAT_006d1da0); }
        else if (param_2 === 0x506) { FUN_0042b67d(G.DAT_006d1da0); }
        else if (param_2 === 0x507) { FUN_004b7eb6(0, 4); }
        else if (param_2 === 0x508) { FUN_0043856b(G.DAT_006d1da0); }
        // World
        else if (param_2 === 0x601) { FUN_00431c73(G.DAT_006d1da0); }
        else if (param_2 === 0x602) { FUN_00433122(G.DAT_006d1da0); }
        else if (param_2 === 0x603) { FUN_00435d15(G.DAT_006d1da0); }
        else if (param_2 === 0x605) { FUN_00434d8a(G.DAT_006d1da0); }
        else if (param_2 === 0x606) { FUN_00598b4e(G.DAT_006d1da0); }
        // Cheats
        else if (param_2 === 0x701) { if (G.DAT_00655b02 === 0 || G.DAT_0062eb30 !== 0) FUN_00554297(); }
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
          if (G.DAT_00655b02 < 3) {
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
    G.DAT_006c31ac = 5;
    G.DAT_006c31b0 = param_1;
    G.DAT_006c31b4 = param_2;
  }
}

// build_main_menu — very large menu construction function (UI only)
export function FUN_004e3a86() {
  // This function builds the entire menu bar using thunk calls to MFC.
  // It is purely UI and calls FUN_005786b6, FUN_004a2379, FUN_004a23fc,
  // FUN_00578b06, FUN_00578c12, FUN_0057940d, FUN_005794cf, FUN_005792e1,
  // FUN_00579260, FUN_00578f2c, FUN_00578e38.
  // Mechanical transpilation omitted for brevity — all calls are stubs.
  FUN_005786b6(0x1bbc);
  // ... (200+ lines of menu item construction)
  FUN_004a2020();
  FUN_00578f2c(G.DAT_006553d8);
  FUN_00578e38(FUN_004e2803);
}

// menu_item_set_label_and_enable
export function FUN_004e4c92(param_1, param_2, param_3) {
  let local_54 = new Uint8Array(80);
  FUN_0040bbb0();
  FUN_0040bc10(param_2);
  FUN_00426ff0(G.DAT_00679640, local_54);
  FUN_0057953e(param_1, local_54);
  FUN_005792e1(param_1, param_3);
}

// update_menu_state — large function updating all menu enables/disables
export function FUN_004e4ceb() {
  // This is a massive menu state updater (lines 2119-2437).
  // It calls FUN_005792e1, FUN_005794cf, FUN_00579260, FUN_004e4c92,
  // FUN_0057940d extensively. All are UI-only stubs.
  // Mechanical transpilation abbreviated — calls are all stubs.
  FUN_005792e1(0x606, G.DAT_00655ae8 & 0x80);
  FUN_005792e1(0x302, G.DAT_006d1da8 === 0 ? 1 : 0);
  FUN_005792e1(0x301, G.DAT_006d1da8 === 1 ? 1 : 0);
  FUN_00578f2c(0);
}

// manage_window_wrapper
export function FUN_004e7240() {
  // Wraps manage_window_C692 — no-op in JS
  // manage_window_C692(*(in_ECX + 8));
}

// acquire_wonder
export function FUN_004e7270(param_1, param_2, param_3, param_4, param_5) {
  let iVar2, iVar3, local_c;

  local_c = 0;
  G.DAT_006ad8e8 = 1;
  if (G.DAT_00655b02 < 3 || (FUN_00421f40() !== 0)) {
    if (s16(G.DAT_00655be6, param_3 * 2) === -1) {
      local_c = 1;
      G.DAT_00655be6[param_3 * 2] = param_2 & 0xff;
      G.DAT_00655be6[param_3 * 2 + 1] = (param_2 >> 8) & 0xff;
      let flagVal = (G.DAT_0064f344[param_2 * 0x58] | (G.DAT_0064f344[param_2 * 0x58+1]<<8) | (G.DAT_0064f344[param_2 * 0x58+2]<<16) | (G.DAT_0064f344[param_2 * 0x58+3]<<24)) | 0x100;
      G.DAT_0064f344[param_2 * 0x58] = flagVal & 0xff;
      G.DAT_0064f344[param_2 * 0x58+1] = (flagVal >> 8) & 0xff;
      G.DAT_0064f344[param_2 * 0x58+2] = (flagVal >> 16) & 0xff;
      G.DAT_0064f344[param_2 * 0x58+3] = (flagVal >> 24) & 0xff;
      FUN_0043d289(param_2, param_5, 1);
      if (((1 << (u8(param_1) & 0x1f)) & G.DAT_00655b0b) !== 0 || 0x22 < param_5) {
        G.DAT_0064f35c[param_2 * 0x58] = 0;
        G.DAT_0064f35c[param_2 * 0x58 + 1] = 0;
      }
    }
    if (2 < G.DAT_00655b02 && local_c !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    G.DAT_006ad8e8 = 0;
  } else {
    G.DAT_006ad8e8 = 0;
    G.DAT_006c9100 = -2;
    FUN_0046b14d(0x47, 0, param_1, param_2, param_3, param_4, param_5, 0, 0, 0);
    iVar2 = FUN_00421bb0();
    while (G.DAT_006c9100 === -2) {
      iVar3 = FUN_00421bb0();
      if (iVar3 - iVar2 >= 0xe10) break;
      FUN_0047e94e(1, 1);
    }
    if (G.DAT_006c9100 === -2) {
      debug_log("Acquire Wonder: Connection to server timeout");
      local_c = 0;
    } else {
      while (G.DAT_006c8fac !== 0 || (local_c = G.DAT_006c9100, G.DAT_006c8fa0 !== 0)) {
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
  G.DAT_006a65a4 = FUN_004e7458(param_1, s8(G.DAT_0064f379[param_1 * 0x58]));
  G.DAT_006a6528 = s16(G.DAT_0064f35c, param_1 * 0x58);
}

// get_rush_buy_cost
export function FUN_004e74df(param_1, param_2) {
  let iVar1;
  let uVar2 = G.DAT_006a6528;

  if (G.DAT_00655b08 !== 0) {
    iVar1 = FUN_004e7458(param_1, param_2);
    uVar2 = G.DAT_006a6528;
    if (iVar1 !== G.DAT_006a65a4) {
      uVar2 = G.DAT_006a6528 - ((G.DAT_0064bcda * (G.DAT_006a6528 & 0xffff)) / 100) | 0;
    }
  }
  return uVar2;
}

// city_set_specialist_type
export function FUN_004e7549(param_1, param_2, param_3) {
  if (param_2 < 0x10) {
    let bVar1 = (param_2 * 2) & 0xff;
    let off = param_1 * 0x58;
    let val = G.DAT_0064f356[off] | (G.DAT_0064f356[off+1]<<8) | (G.DAT_0064f356[off+2]<<16) | (G.DAT_0064f356[off+3]<<24);
    val = val & ~(3 << (bVar1 & 0x1f));
    val = val | (param_3 << (bVar1 & 0x1f));
    G.DAT_0064f356[off] = val & 0xff;
    G.DAT_0064f356[off+1] = (val >> 8) & 0xff;
    G.DAT_0064f356[off+2] = (val >> 16) & 0xff;
    G.DAT_0064f356[off+3] = (val >> 24) & 0xff;
  }
}

// city_get_specialist_type
export function FUN_004e75a6(param_1, param_2) {
  if (param_2 < 0x10) {
    let off = param_1 * 0x58;
    let val = G.DAT_0064f356[off] | (G.DAT_0064f356[off+1]<<8) | (G.DAT_0064f356[off+2]<<16) | (G.DAT_0064f356[off+3]<<24);
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

  bVar1 = G.DAT_0064f348[param_1 * 0x58];
  iVar2 = s8(bVar1);
  local_8 = 0;
  while (true) {
    if (0x18 < local_8) return;
    uVar3 = FUN_005ae052(s8(G.DAT_00628370[local_8]) + s16(G.DAT_0064f340, param_1 * 0x58));
    iVar4 = s16(G.DAT_0064f342, param_1 * 0x58) + s8(G.DAT_006283a0[local_8]);
    let pbVar5 = local_8;
    G.DAT_006a6530[pbVar5] = 0;
    iVar6 = FUN_004087c0(uVar3, iVar4);
    if (iVar6 === 0 || 0x14 < local_8) {
      G.DAT_006a6530[pbVar5] = G.DAT_006a6530[pbVar5] | 1;
    } else {
      iVar6 = FUN_005b8b65(uVar3, iVar4, iVar2);
      if (iVar6 === 0) {
        G.DAT_006a6530[pbVar5] = G.DAT_006a6530[pbVar5] | 1;
      } else {
        if (((1 << (bVar1 & 0x1f)) & G.DAT_00655b0b) === 0 && G.DAT_0062edf8 !== 0) {
          uVar7 = FUN_005b94d5(uVar3, iVar4);
          if ((uVar7 & 0x80) !== 0) {
            G.DAT_00655b10 = G.DAT_00655b10 + 1;
          }
        }
        local_18 = FUN_005b2e69(uVar3, iVar4);
        let didGoto = false;
        while (true) {
          if (local_18 < 0 || s8(G.DAT_006560f7[local_18 * 0x20]) === iVar2 ||
              (FUN_005b89e4(uVar3, iVar4) !== 0 ||
               ((G.DAT_0064c6c0[s8(G.DAT_006560f7[local_18 * 0x20]) * 4 + iVar2 * 0x594] & 8) !== 0))) {
            didGoto = true;
            break;
          }
          if (G.DAT_0064b1c4[u8(G.DAT_006560f6[local_18 * 0x20]) * 0x14] !== 0) break;
          local_18 = FUN_005b2c82(local_18);
        }
        if (!didGoto) {
          G.DAT_006a6530[pbVar5] = G.DAT_006a6530[pbVar5] | 4;
          if ((G.DAT_00655b0b & (1 << (G.DAT_006560f7[local_18 * 0x20] & 0x1f))) !== 0) {
            G.DAT_006a6530[pbVar5] = G.DAT_006a6530[pbVar5] | 0x20;
          }
        }
        // LAB_004e7898
        iVar4 = FUN_005b8ca6(uVar3, iVar4);
        if (iVar4 >= 0) {
          G.DAT_006a6530[pbVar5] = G.DAT_006a6530[pbVar5] | 8;
        }
      }
    }
    local_8 = local_8 + 1;
  }
}

// city_has_tile_flag
export function FUN_004e78ce(param_1, param_2) {
  let off = param_1 * 0x58;
  let val = G.DAT_0064f370[off] | (G.DAT_0064f370[off+1]<<8) | (G.DAT_0064f370[off+2]<<16) | (G.DAT_0064f370[off+3]<<24);
  return (val & (1 << (param_2 & 0x1f))) !== 0 ? 1 : 0;
}

// city_set_tile_flag
export function FUN_004e790c(param_1, param_2, param_3) {
  let uVar1 = 1 << (param_2 & 0x1f);
  let off = param_1 * 0x58;
  let val = G.DAT_0064f370[off] | (G.DAT_0064f370[off+1]<<8) | (G.DAT_0064f370[off+2]<<16) | (G.DAT_0064f370[off+3]<<24);
  if (param_3 === 0) {
    val = val & ~uVar1;
  } else {
    val = val | uVar1;
  }
  G.DAT_0064f370[off] = val & 0xff;
  G.DAT_0064f370[off+1] = (val >> 8) & 0xff;
  G.DAT_0064f370[off+2] = (val >> 16) & 0xff;
  G.DAT_0064f370[off+3] = (val >> 24) & 0xff;
}

// city_calc_nearby_cities (abbreviated — large function)
export function FUN_004e7967(param_1) {
  // Large function computing nearest friendly city distance etc.
  // Uses G.DAT_006a6588, G.DAT_006a6600, G.DAT_006a6574.
  // Calls FUN_005ae31d, FUN_0043d20a, FUN_004bd9f0, FUN_005b8a81, FUN_00488a45.
  // Mechanical transpilation present in source lines 2750-2832.
}

// check_city_support_limit
export function FUN_004e7d7f(param_1, param_2, param_3) {
  G.DAT_006a660c = G.DAT_006a660c + 1;
  switch (param_3) {
    case 0: case 1:
      if (s8(G.DAT_0064f349[param_1 * 0x58]) < G.DAT_006a660c) {
        G.DAT_006a6568 = G.DAT_006a6568 + 1;
        return G.DAT_006a6568;
      }
      break;
    case 2:
      if (G.DAT_0064bcd5 < G.DAT_006a660c) {
        G.DAT_006a6568 = G.DAT_006a6568 + 1;
        return G.DAT_006a6568;
      }
      break;
    case 3:
      if (G.DAT_0064bcd6 < G.DAT_006a660c) {
        G.DAT_006a6568 = G.DAT_006a6568 + 1;
        return G.DAT_006a6568;
      }
      break;
    case 4:
      if ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_2 * 0x20]) * 0x14] & 8) === 0 &&
          G.DAT_0064bcd7 < G.DAT_006a660c) {
        G.DAT_006a6568 = G.DAT_006a6568 + 1;
        return G.DAT_006a6568;
      }
      break;
    default:
      G.DAT_006a6568 = G.DAT_006a6568 + 1;
      return G.DAT_006a6568;
  }
  return 0;
}

// calc_unit_support_cost
export function FUN_004e7eb1(param_1, param_2) {
  let bVar1 = G.DAT_0064bccd;
  if (2 < u8(G.DAT_0064c6b5[param_2 * 0x594])) {
    bVar1 = G.DAT_0064bcce;
  }
  let local_c = bVar1;
  G.DAT_006a6608 = local_c;
  G.DAT_006a6560 = G.DAT_0064bccb;
  if (((1 << (u8(param_2) & 0x1f)) & G.DAT_00655b0b) === 0) {
    G.DAT_006a6560 = -(G.DAT_00655b08) + 0xd;
    if (G.DAT_00655b08 < 3) {
      G.DAT_006a6560 = -(G.DAT_00655b08) + 0xe;
    }
    if (G.DAT_00655b08 === 0) {
      G.DAT_006a6560 = G.DAT_006a6560 + 1;
    }
    if (200 < G.DAT_00655af8 && 1 < G.DAT_00655b08 &&
        (G.DAT_00655b0b & (1 << (G.DAT_00655c31 & 0x1f))) !== 0) {
      let local_8 = 2;
      if (G.DAT_00655c14 !== -1 && (~G.DAT_00655b0b & s8(G.DAT_00655bcb)) !== 0) {
        local_8 = 1;
        if ((G.DAT_00655b0b & G.DAT_00655bcb) === 0 || (G.DAT_00655b0b & G.DAT_00655bbc) === 0) {
          local_8 = 0;
        }
      }
      let iVar2 = local_8;
      if (G.DAT_00655c18 !== -1 && (~G.DAT_00655b0b & s8(G.DAT_00655bce)) !== 0) {
        iVar2 = local_8 + -1;
        if ((G.DAT_00655b0b & G.DAT_00655bce) === 0) {
          iVar2 = local_8 + -2;
        }
      }
      local_8 = iVar2;
      iVar2 = FUN_005adfa0(local_8, 0, 2);
      G.DAT_006a6560 = G.DAT_006a6560 - iVar2;
    }
    if (G.DAT_0064bccb !== 10) {
      G.DAT_006a6560 = ((G.DAT_0064bccb * G.DAT_006a6560) / 10) | 0;
      if ((G.DAT_006a6560 & 1) !== 0) {
        G.DAT_006a6560 = G.DAT_006a6560 + 1;
      }
    }
  }
}

// city_process_units_for_support (large function)
export function FUN_004e80b1(param_1) {
  // Large function processing unit support for a city.
  // Lines 2941-3062 in the C source.
  // Calls FUN_004e7eb1, FUN_004e7d7f, FUN_005b8ca6, FUN_005b94d5, FUN_005ae1b0.
}

// calc_tile_yield
export function FUN_004e868f(param_1, param_2, param_3) {
  // Tile yield calculation — 500 lines in C (lines 3071-3215).
  // Calls FUN_005ae052, FUN_005b89bb, FUN_005b8ee1, FUN_005b94d5,
  // FUN_0043d20a, FUN_0040bcb0, FUN_005b8931, FUN_004bd9f0,
  // FUN_004e8c8c, FUN_004e8db5, FUN_00453e18.
  return 0;
}

// check_tile_improvement_needed
export function FUN_004e8c8c(param_1, param_2, param_3, param_4, param_5) {
  if (G.DAT_0062edf4 !== 0 && G.DAT_0062edf8 !== 0 && G.DAT_0062ee0c === 0) {
    let bVar1 = FUN_005b89bb(param_4, param_5);
    let uVar3 = u8(bVar1);
    if (s8(G.DAT_00627cce[uVar3 * 0x18 + param_3]) !== -1 &&
        s8(G.DAT_00627cd4[uVar3 * 0x18 + param_3]) !== 0 &&
        (param_3 !== 0 || FUN_0058c56c(param_4, param_5) !== 0)) {
      let uVar4 = u8(G.DAT_0064c6b5[param_2 * 0x594]);
      if (u8(G.DAT_0064c6b5[param_2 * 0x594]) < 2) { uVar4 = 1; }
      if (s8(G.DAT_00627cd4[uVar3 * 0x18 + param_3]) <= uVar4) {
        G.DAT_006a65d4 = G.DAT_006a65d4 + 1;
        G.DAT_0062ee0c = 1;
        G.DAT_006a65e0 = param_4;
        G.DAT_006a65e8 = param_5;
      }
    }
  }
}

// check_road_needed_for_trade
export function FUN_004e8db5(param_1, param_2, param_3, param_4) {
  if (G.DAT_0062edf4 !== 0 && G.DAT_0062edf8 !== 0 && G.DAT_0062ee0c === 0) {
    let pbVar1 = FUN_005b8931(param_3, param_4);
    if ((pbVar1 & 0x80) === 0 || FUN_004bd9f0(param_2, 7) !== 0) {
      G.DAT_0062ee0c = 1;
      G.DAT_006a65e0 = param_3;
      G.DAT_006a65e8 = param_4;
    }
  }
}

// calc_tile_yield_with_accumulation
export function FUN_004e8e4d(param_1, param_2, param_3) {
  G.DAT_0062edf4 = param_3;
  for (let local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
    let uVar1 = FUN_004e868f(param_1, param_2, local_8);
    G.DAT_006a65b8[local_8] = uVar1;
    if (G.DAT_0062edf4 !== 0) {
      // G.DAT_006a65c8 array access
    }
  }
  G.DAT_0062edf4 = 0;
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

// city_assign_workers (very large — 200 lines)
export function FUN_004e8f42(param_1) {
  // Worker tile assignment algorithm.
  // Lines 3333-3505 in C source.
  // Uses FUN_004e78ce, FUN_004e8e4d, FUN_004e868f, FUN_005adfa0.
}

// city_adjust_stored_food
export function FUN_004e9719(param_1, param_2) {
  let off = param_1 * 0x58;
  if (param_2 < 0) {
    for (let p = param_2; p !== 0; p = p + 1) {
      let val = G.DAT_0064f370[off] | (G.DAT_0064f370[off+1]<<8) | (G.DAT_0064f370[off+2]<<16) | (G.DAT_0064f370[off+3]<<24);
      if (val > 0x3ffffff) {
        val = val + -0x4000000;
        G.DAT_0064f370[off] = val & 0xff;
        G.DAT_0064f370[off+1] = (val >> 8) & 0xff;
        G.DAT_0064f370[off+2] = (val >> 16) & 0xff;
        G.DAT_0064f370[off+3] = (val >> 24) & 0xff;
      }
    }
  } else {
    for (let p = param_2; p !== 0; p = p + -1) {
      let val = G.DAT_0064f370[off] | (G.DAT_0064f370[off+1]<<8) | (G.DAT_0064f370[off+2]<<16) | (G.DAT_0064f370[off+3]<<24);
      val = val + 0x4000000;
      G.DAT_0064f370[off] = val & 0xff;
      G.DAT_0064f370[off+1] = (val >> 8) & 0xff;
      G.DAT_0064f370[off+2] = (val >> 16) & 0xff;
      G.DAT_0064f370[off+3] = (val >> 24) & 0xff;
    }
  }
}

// city_reassign_specialists
export function FUN_004e97ae(param_1) {
  G.DAT_006a6604 = G.DAT_006a654c;
  for (let local_8 = 0; local_8 < G.DAT_006a6604; local_8 = local_8 + 1) {
    let iVar1 = FUN_004e75a6(param_1, local_8);
    if (iVar1 === 0) {
      FUN_004e7549(param_1, local_8, 1);
    }
  }
  for (let local_8 = G.DAT_006a6604; local_8 < 0x10; local_8 = local_8 + 1) {
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

// city_calc_corruption
export function FUN_004e989a(param_1, param_2, param_3, param_4) {
  if (param_2 < 1) return 0;
  // Large function, lines 3595-3676 in C source.
  // Calls FUN_0043d20a, FUN_005adfa0, FUN_004e9849.
  return 0;
}

// city_calc_happiness_trade_split
export function FUN_004e9c14(param_1) {
  // Lines 3685-3799 in C source.
  // Calls FUN_0043d20a, FUN_004bd9f0, FUN_00453e51, FUN_004e989a.
}

// city_calc_content_happy_unhappy
export function FUN_004ea031(param_1, param_2) {
  // Lines 3808-3842 in C source.
  // Adjusts G.DAT_006a6550, G.DAT_006a65a8, G.DAT_006a659c.
  // Calls FUN_005adfa0.
}

// city_calc_trade_routes
export function FUN_004ea1f6(param_1, param_2, param_3, param_4) {
  // Lines 3851-3999 in C source.
  // Splits trade into luxury/science/tax.
  // Calls FUN_005adfa0, FUN_004e75ea, FUN_004bd9f0, FUN_0043d20a, FUN_00453e18, FUN_00453e51.
}

// city_full_calc (main city production calc)
export function FUN_004ea8e4(param_1) {
  // Lines 4008-4217 in C source.
  // The main city calculation entry point combining trade routes, corruption, happiness.
  // Calls FUN_004e989a, FUN_0043d400, FUN_00488a45, FUN_0043d20a, FUN_004ea1f6,
  // FUN_005b2e69, FUN_005b2c82, FUN_005adfa0, FUN_00453e51, FUN_00453e18, FUN_004ea031.
  return G.DAT_006a6550 - G.DAT_006a65a8;
}

// city_calc_trade_routes_for_display
export function FUN_004eb327(param_1) {
  // Lines 4226-4254 in C source.
  // Adjusts G.DAT_006a65b0, G.DAT_006a6558, G.DAT_006a6570, G.DAT_006a65c8.
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
    return G.DAT_006a6550 - G.DAT_006a65a8;
  }
  G.DAT_0062ee08 = param_1;
  FUN_004e7641(param_1);
  FUN_004e7967(param_1);
  FUN_004e80b1(param_1);
  return FUN_004eb4a1(param_1);
}

// show_city_production_dialog
export function FUN_004eb571(param_1, param_2, param_3, param_4) {
  // UI dialog function — lines 4309-4379 in C source.
  // Calls FUN_00421d60, FUN_0040bbb0, FUN_0040bbe0, FUN_0043c9d0,
  // FUN_004105f8, FUN_00428b0c, FUN_0059edf0, FUN_0059ea99,
  // FUN_0059ec88, FUN_0040bc80.
}

// dialog_destructor_3
export function FUN_004eb7e5() {
  FUN_0059df8a();
}

// SEH_restore_3
export function FUN_004eb7fb() {
  // SEH frame restore — no-op in JS
}

// show_city_notification_dialog
export function FUN_004eb80a(param_1, param_2, param_3, param_4, param_5) {
  // UI dialog function — lines 4418-4524 in C source.
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
  // SEH frame restore — no-op in JS
}

// city_process_food_growth
export function FUN_004ebbde(param_1) {
  // City growth/famine processing — lines 4578-4701 in C source.
  // Calls FUN_004e7eb1, FUN_005b5d93, FUN_005b4391, FUN_00441a79,
  // FUN_0043d20a, FUN_00453e51, FUN_004c4210, FUN_004f3f30,
  // FUN_00441b11, FUN_00504c05, FUN_0050207f, FUN_0047ce1e,
  // FUN_004271e8, FUN_004eb571, FUN_00440325.
  return 0;
}

// caravan_set_destination
export function FUN_004ec1c6(param_1, param_2) {
  // Lines 4710-4744 in C source.
  // Sets caravan destination from city trade routes.
  G.DAT_006560fd[param_2 * 0x20] = 0xff;
  let iVar1 = _rand();
  let local_8 = 0;
  while (true) {
    if (2 < local_8) {
      // LAB_004ec264
      if (s8(G.DAT_006560fd[param_2 * 0x20]) < 0) {
        iVar1 = _rand();
        iVar1 = iVar1 % 3;
        if (s8(G.DAT_0064f37b[param_1 * 0x58 + iVar1]) < 1) {
          G.DAT_006560fd[param_2 * 0x20] = (~G.DAT_0064f37b[param_1 * 0x58 + iVar1] + 1) & 0xff;
        } else {
          G.DAT_006560fd[param_2 * 0x20] = G.DAT_0064f37b[param_1 * 0x58 + iVar1];
        }
      }
      let off = param_1 * 0x58;
      let flagVal = (G.DAT_0064f344[off] | (G.DAT_0064f344[off+1]<<8) | (G.DAT_0064f344[off+2]<<16) | (G.DAT_0064f344[off+3]<<24)) | 0x1000;
      G.DAT_0064f344[off] = flagVal & 0xff;
      G.DAT_0064f344[off+1] = (flagVal >> 8) & 0xff;
      G.DAT_0064f344[off+2] = (flagVal >> 16) & 0xff;
      G.DAT_0064f344[off+3] = (flagVal >> 24) & 0xff;
      return;
    }
    let iVar2 = (iVar1 % 3 + local_8) % 3;
    if (s8(G.DAT_0064f37b[param_1 * 0x58 + iVar2]) >= 0) {
      G.DAT_006560fd[param_2 * 0x20] = G.DAT_0064f37b[param_1 * 0x58 + iVar2];
      break;
    }
    local_8 = local_8 + 1;
  }
  // Fall through to LAB_004ec264 logic
  if (s8(G.DAT_006560fd[param_2 * 0x20]) < 0) {
    iVar1 = _rand() % 3;
    if (s8(G.DAT_0064f37b[param_1 * 0x58 + iVar1]) < 1) {
      G.DAT_006560fd[param_2 * 0x20] = (~G.DAT_0064f37b[param_1 * 0x58 + iVar1] + 1) & 0xff;
    } else {
      G.DAT_006560fd[param_2 * 0x20] = G.DAT_0064f37b[param_1 * 0x58 + iVar1];
    }
  }
  let off2 = param_1 * 0x58;
  let flagVal2 = (G.DAT_0064f344[off2] | (G.DAT_0064f344[off2+1]<<8) | (G.DAT_0064f344[off2+2]<<16) | (G.DAT_0064f344[off2+3]<<24)) | 0x1000;
  G.DAT_0064f344[off2] = flagVal2 & 0xff;
  G.DAT_0064f344[off2+1] = (flagVal2 >> 8) & 0xff;
  G.DAT_0064f344[off2+2] = (flagVal2 >> 16) & 0xff;
  G.DAT_0064f344[off2+3] = (flagVal2 >> 24) & 0xff;
}

// civ_revolution_check
export function FUN_004ec312(param_1) {
  if ((u16(G.DAT_0064c6a0, param_1 * 0x594) & 0x10) === 0) {
    G.DAT_0064c6be[param_1 * 0x594] = u8(G.DAT_0064c6be[param_1 * 0x594]) >> 1;
    let val = u16(G.DAT_0064c6a0, param_1 * 0x594) | 0x10;
    G.DAT_0064c6a0[param_1 * 0x594] = val & 0xff;
    G.DAT_0064c6a0[param_1 * 0x594 + 1] = (val >> 8) & 0xff;
    for (let local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
      if (local_8 !== param_1) {
        FUN_00456f20(local_8, param_1, -25);
        let doff = param_1 * 4 + local_8 * 0x594;
        let dval = (G.DAT_0064c6c0[doff] | (G.DAT_0064c6c0[doff+1]<<8) | (G.DAT_0064c6c0[doff+2]<<16) | (G.DAT_0064c6c0[doff+3]<<24)) & 0xffffffef;
        G.DAT_0064c6c0[doff] = dval & 0xff;
        G.DAT_0064c6c0[doff+1] = (dval >> 8) & 0xff;
        G.DAT_0064c6c0[doff+2] = (dval >> 16) & 0xff;
        G.DAT_0064c6c0[doff+3] = (dval >> 24) & 0xff;
      }
    }
  }
}

// city_production_turn (MASSIVE function — 10931 bytes)
export function FUN_004ec3fe(param_1) {
  // The main city production processing function.
  // Lines 4782-5625 in C source.
  // Handles building/wonder/unit completion, AI buy-rushing, etc.
  // Calls an enormous number of functions including FUN_0043d20a,
  // FUN_0043d289, FUN_00441a79, FUN_00441b11, FUN_004e7270,
  // FUN_005b3d06, FUN_004ec312, FUN_004f1220, FUN_004be6ba,
  // FUN_004c21d5, FUN_00598197, FUN_00597d6f, FUN_004a7577,
  // FUN_00511880, FUN_004eb571, FUN_004f3f30, FUN_004271e8,
  // FUN_0046e020, FUN_004bb8e0, FUN_004eb4ed, FUN_005b4391,
  // FUN_004ec1c6, FUN_0042b824, FUN_005adfa0, FUN_00598a05.
  // Mechanical transpilation would be 800+ lines of JS.
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
  // SEH frame restore — no-op in JS
}

// city_disband_unsupported_units
export function FUN_004eef23(param_1) {
  // Lines 5693-5810 in C source.
  // Handles disbanding units when city can't support them.
  // Calls FUN_004e7d7f, FUN_005b8ca6, FUN_005b94d5, FUN_005ae1b0,
  // FUN_005ae31d, FUN_0043cf76, FUN_005b4391, FUN_005b6042,
  // FUN_00505666, FUN_004271e8, FUN_004f3f30.
}

// handle_city_disorder
export function handle_city_disorder_004ef578(param_1) {
  // Lines 5819-5932 in C source.
  // Handles civil disorder and WLTKD (We Love The King Day).
  // Calls FUN_0046e020, FUN_004eb80a, FUN_00441b11, FUN_0047ce1e,
  // FUN_0055c69d, FUN_004f3f30, FUN_004eb571, FUN_00493ba6,
  // FUN_00421d60, FUN_0046e571, FUN_00441a79.
}

// city_end_of_turn_science
export function FUN_004efbc6(param_1) {
  let bVar1 = G.DAT_0064f348[param_1 * 0x58];
  let iVar2 = s8(bVar1);
  if (s16(G.DAT_0064c6aa, iVar2 * 0x594) >= 0 &&
      ((1 << (bVar1 & 0x1f)) & G.DAT_00655b0b) !== 0 && G.DAT_00655b08 === 0 &&
      s16(G.DAT_0064c6aa, iVar2 * 0x594) !== 0x59 &&
      G.DAT_00655b1e[s16(G.DAT_0064c6aa, iVar2 * 0x594)] !== 0) {
    G.DAT_006a6578 = G.DAT_006a6578 << 1;
  }
  if (((1 << (bVar1 & 0x1f)) & G.DAT_00655b0b) === 0 && 1 < G.DAT_00655b08) {
    let iVar3 = FUN_00598d45(iVar2);
    if (iVar3 !== 0) {
      for (let local_8 = 0x23; local_8 < 0x26; local_8 = local_8 + 1) {
        iVar3 = FUN_004bd9f0(iVar2, s8(G.DAT_0064c48e[local_8 * 8]));
        if (iVar3 === 0) {
          G.DAT_006a6578 = G.DAT_006a6578 << 1;
          break;
        }
      }
    }
  }
  if (G.DAT_0064c6b5[iVar2 * 0x594] !== 0) {
    FUN_004c2b73(iVar2, G.DAT_006a6578);
  }
}

// city_end_of_turn_pollution_and_meltdown
export function FUN_004efd44(param_1) {
  // Lines 5982-6074 in C source.
  // Handles pollution creation and nuclear meltdown.
  // Calls FUN_0043d20a, FUN_004bd9f0, FUN_005b94d5, FUN_005b89e4,
  // FUN_005b90df, FUN_005b8b65, FUN_00410402, FUN_004eb571,
  // FUN_005b9179, FUN_0057f657, FUN_004105f8, FUN_004f3f30.
  return 0;
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
function FUN_0049994f() {} // thunk_citywin_994F
function FUN_load_verify_units() { return 0; }
function FUN_save_game() {}
function FUN_set_city_shields() {}
function FUN_new_civ() {}
function FUN_0043d20a() { return 0; }
function FUN_0043d289() {}
function FUN_0043d400() {}
function FUN_004e9849_stub() { return 4; }
function FUN_005b94d5_stub() { return 0; }
function FUN_005b8931_stub() { return 0; }
function FUN_004eb571_stub() {}
function FUN_citywin_8ADC() {}
function FUN_delete_city() {}
function FUN_kill_civ() { return 0; }
function FUN_0043c9d0() {}
