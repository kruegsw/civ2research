// ═══════════════════════════════════════════════════════════════════
// block_00470000.js — Mechanical transpilation of block_00470000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00470000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00470000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8, s16, u16 } from './mem.js';

import {
  FUN_004087c0, FUN_005ae052, FUN_005b8931,
  FUN_005b94d5, FUN_005b89bb, FUN_005b89e4,
  FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1,
  FUN_004bd9f0, FUN_005b68f6,
} from './fn_utils.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_0062b804 = 0;
let DAT_0062b87c = 0;
let DAT_0062bcd8 = 0;
let DAT_0062bcb0 = 0;
let DAT_0062bcec = 0;
let DAT_0062c5b4 = 0;
let DAT_0062d0bc = 0;
let DAT_0062ee08 = 0;
let DAT_00626a2c = 0;
let DAT_00627670 = 0;
let DAT_00627fd8 = 0;
let DAT_00627fdc = 0;
let DAT_00628044 = 0;
let DAT_00628048 = 0;
let DAT_0062804c = 0;
let DAT_00628054 = 0;
let DAT_00628338 = new Int8Array([1, 2, 2, 1]);
let DAT_0062833b = new Int8Array(16).fill(0);
let DAT_0062833c = new Int8Array([-1, 1, -1, 1]);
let DAT_00628343 = new Int8Array(16).fill(0);
let DAT_00628344 = new Int8Array([-1, -1, 1, 1]);
let DAT_00628350 = new Int8Array([-1, 1, 2, 1, -1, -1, -2, -1, 0, 2, 0, -2, -1, 1, 2, 1, -1, -1, -2, -1]);
let DAT_00628360 = new Int8Array([-1, -1, 0, 1, 1, 1, 0, -1, -2, 0, 2, 0, -1, -1, 0, 1, 1, 1, 0, -1]);
let DAT_00628370 = new Int8Array(32).fill(0);
let DAT_006283a0 = new Int8Array(32).fill(0);
let DAT_00628420 = 0;
let DAT_00631130 = 0;
let DAT_00631138 = 0;
let DAT_0063113c = 0;
let DAT_00633e40 = 0;
let DAT_00633e44 = 0;
let DAT_00633e48 = -1;
let DAT_00633e4c = 0;
let DAT_00633e50 = 0;
let DAT_00633e54 = -1;
let DAT_00634c9c = 0;
let DAT_00635a3c = 0;
let DAT_00636058 = 0;
let DAT_006365e0 = null;
let DAT_006365e4 = null;
let DAT_00639e60 = [];
let DAT_00639f14 = 0;
let DAT_0063f278 = 0;
let DAT_0064b168 = new Uint8Array(0x40);
let DAT_0064b1ac = 0;
let DAT_0064b1b0 = 0;
let DAT_0064b1b4 = 0;
let DAT_0064b1bc = new Uint8Array(52 * 0x14);
let DAT_0064b1c1 = new Uint8Array(52);
let DAT_0064b1c4 = new Uint8Array(52);
let DAT_0064b383 = 0;
let DAT_0064b984 = 0;
let DAT_0064b99c = 0;
let DAT_0064b998 = 0;
let DAT_0064b9bc = 0;
let DAT_0064ba10 = new Int32Array(8);
let DAT_0064ba28 = new Uint8Array(0x1c);
let DAT_0064ba48 = new Int32Array(8);
let DAT_0064ba4c = new Int32Array(8);
let DAT_0064ba50 = new Int32Array(8);
let DAT_0064ba54 = new Int32Array(8);
let DAT_0064ba58 = new Int32Array(8);
let DAT_0064ba5c = new Int32Array(8);
let DAT_0064bb08 = new Uint8Array(260);
let DAT_0064bc1e = 0;
let DAT_0064bc56 = 0;
let DAT_0064bc60 = 0;
let DAT_0064bc62 = new Uint8Array(100);
let DAT_0064bcb4 = 0;
let DAT_0064bcf8 = new Uint8Array(0x790);
let DAT_0064bcfa = new Uint8Array(256);
let DAT_0064bd12 = new Uint8Array(256);
let DAT_0064bd2a = new Uint8Array(256);
let DAT_0064c488 = new Uint8Array(0x218);
let DAT_0064c600 = new Uint8Array(8 * 0x594);
let DAT_0064c6a0 = new Uint8Array(8 * 0x594);
let DAT_0064c6a2 = new Int32Array(8 * 0x594);
let DAT_0064c6a6 = new Int16Array(256);
let DAT_0064c6bc = new Int16Array(256);
let DAT_0064c6c0 = new Uint8Array(8 * 0x594);
let DAT_0064c6e0 = new Uint8Array(8 * 0x594);
let DAT_0064c6f8 = new Uint8Array(8 * 0x594);
let DAT_0064c706 = new Uint8Array(8 * 0x594);
let DAT_0064c714 = new Uint8Array(8 * 0x594);
let DAT_0064c778 = new Uint8Array(8 * 0x594);
let DAT_0064c7b6 = new Uint8Array(8 * 0x594);
let DAT_0064c7f4 = new Uint8Array(8 * 0x594);
let DAT_0064c832 = new Uint8Array(8 * 0x594);
let DAT_0064caa2 = new Int16Array(256);
let DAT_0064caa4 = new Int16Array(256);
let DAT_0064caa6 = new Int16Array(256);
let DAT_0064ca92 = new Uint8Array(8 * 0x594);
let DAT_0064f340 = new Uint8Array(256 * 0x58);
let DAT_0064f342 = new Int16Array(256);
let DAT_0064f348 = new Uint8Array(256 * 0x58);
let DAT_0064f34c = new Uint8Array(256 * 0x58);
let DAT_0064f34d = new Uint8Array(256 * 0x58);
let DAT_0064f360 = new Uint8Array(256 * 0x58);
let DAT_0064f379 = new Uint8Array(256 * 0x58);
let DAT_0064f394 = new Int32Array(256);
let DAT_0064c5a6 = 0;
let DAT_00654b40 = new Uint8Array(0x494);
let DAT_00654b70 = 0;
let DAT_00654c74 = 0;
let DAT_00654c76 = 0;
let DAT_00654c78 = 0;
let DAT_00654c7a = 0;
let DAT_00654c7c = 0;
let DAT_00654fa4 = 0;
let DAT_00654fa6 = 0;
let DAT_00654fa8 = 0;
let DAT_00654fac = 0;
let DAT_00654fae = 0;
let DAT_00654fb0 = 0;
let DAT_00654fd8 = 0;
let DAT_00654fe0 = new Int32Array(16);
let DAT_00655020 = new Uint8Array(260);
let DAT_00655128 = new Uint8Array(0x152);
let DAT_00655280 = 0;
let DAT_00655284 = 0;
let DAT_00655288 = 0;
let DAT_0065528c = 0;
let DAT_00655290 = 0;
let DAT_00655294 = 0;
let DAT_006552a4 = new Uint8Array(8 * 0x10);
let DAT_00655324 = 0;
let DAT_00655334 = 0;
let DAT_00655344 = 0;
let DAT_00655490 = new Uint8Array(0x68);
let DAT_006554f8 = new Uint8Array(256);
let DAT_006554fb = new Uint8Array(256);
let DAT_006554fc = new Uint8Array(256);
let DAT_006554fd = new Uint8Array(256);
let DAT_00655502 = new Int16Array(256);
let DAT_00655504 = new Int16Array(256);
let DAT_00655506 = new Int16Array(256);
let DAT_0065550c = new Int16Array(256);
let DAT_00655ae8 = 0;
let DAT_00655aea = 0;
let DAT_00655aee = 0;
let DAT_00655af0 = 0;
let DAT_00655af2 = 0;
let DAT_00655af4 = 0;
let DAT_00655af8 = 0;
let DAT_00655afa = 0;
let DAT_00655afe = 0;
let DAT_00655b00 = 0;
let DAT_00655b02 = 0;
let DAT_00655b03 = 0;
let DAT_00655b04 = 0;
let DAT_00655b05 = 0;
let DAT_00655b07 = 0;
let DAT_00655b08 = 0;
let DAT_00655b09 = 0;
let DAT_00655b0a = 0;
let DAT_00655b0b = 0;
let DAT_00655b0d = 0;
let DAT_00655b0e = 0;
let DAT_00655b0f = 0;
let DAT_00655b10 = 0;
let DAT_00655b12 = 0;
let DAT_00655b14 = 0;
let DAT_00655b16 = 0;
let DAT_00655b18 = 0;
let DAT_00655b1e = new Uint8Array(256);
let DAT_00655b82 = new Uint8Array(256);
let DAT_00655b8d = 0;
let DAT_00655b91 = 0;
let DAT_00655baf = 0;
let DAT_00655bb5 = 0;
let DAT_00655bbb = 0;
let DAT_00655ba4 = 0;
let DAT_00655ba5 = 0;
let DAT_00655ba7 = 0;
let DAT_00655ba9 = 0;
let DAT_00655bd3 = 0;
let DAT_00655be6 = new Uint8Array(0x4c);
let DAT_00655c18 = 0;
let DAT_00655c1e = 0;
let DAT_00655c20 = 0;
let DAT_00655c21 = 0;
let DAT_00655c38 = new Uint8Array(0x4b0);
let DAT_006560f0 = new Uint8Array(4096 * 0x20);
let DAT_006560f2 = new Int16Array(4096);
let DAT_006560f6 = new Uint8Array(4096 * 0x20);
let DAT_006560f7 = new Uint8Array(4096 * 0x20);
let DAT_006560f8 = new Uint8Array(4096 * 0x20);
let DAT_006560f9 = new Uint8Array(4096 * 0x20);
let DAT_006560ff = new Uint8Array(4096 * 0x20);
let DAT_00656100 = new Uint8Array(4096 * 0x20);
let DAT_00656106 = new Int16Array(4096);
let DAT_00656108 = new Int16Array(4096);
let DAT_0065610a = new Int32Array(4096);
let DAT_006558e8 = new Uint8Array(260);
let DAT_00655020_str = '';
let DAT_00666100 = 0;
let DAT_00666102 = 0;
let DAT_00666104 = 0;
let DAT_00666106 = 0;
let DAT_00666108 = 0;
let DAT_00666110 = 0;
let DAT_00666112 = 0;
let DAT_00666117 = 0;
let DAT_00666126 = -1;
let DAT_00666128 = -1;
let DAT_00666130 = new Uint8Array(0x400);
let DAT_00666548 = 0;
let DAT_0066654a = 0;
let DAT_0066654c = 0;
let DAT_0066654e = 0;
let DAT_00666570 = new Uint8Array(32);
let DAT_006660f0 = 0;
let DAT_006660f2 = 0;
let DAT_006660f4 = 0;
let DAT_006660f6 = 0;
let DAT_006660f7 = 0;
let DAT_006660f8 = 0;
let DAT_006660f9 = 0;
let DAT_006660fd = 0;
let DAT_006660fe = 0;
let DAT_006660ff = 0;
let DAT_0066c4e8 = new Uint8Array(260);
let DAT_0066c4e9 = new Uint8Array(260);
let DAT_0066c4f8 = new Uint8Array(0x105);
let DAT_0066c600 = new Uint8Array(0x6a);
let DAT_0066c602 = new Int16Array(4);
let DAT_0066c60a = new Int16Array(4);
let DAT_0066c612 = new Int16Array(8 * 4);
let DAT_0066c652 = new Int16Array(4);
let DAT_0066c65a = new Int16Array(4);
let DAT_0066c662 = new Int16Array(4);
let DAT_0066c670 = 0;
let DAT_0066c720 = new Uint8Array(4);
let DAT_0066c7a8 = new Uint8Array(8 * 0x3f0);
let DAT_0066c988 = 0;
let DAT_0066c990 = 0;
let DAT_0066ca54 = 0;
let DAT_0066ca58 = 0;
let DAT_0066ca5c = 0;
let DAT_0066ca68 = 0;
let DAT_0066ca84 = new Int16Array(256);
let DAT_0066ca86 = new Int16Array(256);
let DAT_0066ca88 = new Int16Array(256);
let DAT_0066ca8a = new Int16Array(256);
let DAT_0066ca8c = new Int16Array(256);
let DAT_0066cae0 = 0;
let DAT_0066ed98 = new Int16Array(4096);
let DAT_0066fd98 = new Int16Array(4096);
let DAT_00670da0 = new Int16Array(4096);
let DAT_00671da0 = new Int16Array(4096);
let DAT_00673b04 = 0;
let DAT_00673f14 = 0;
let DAT_00679640 = new Uint8Array(260);
let DAT_006a1870 = 0;
let DAT_006a65a0 = 0;
let DAT_006a8c00 = 0;
let DAT_006aa75c = 0;
let DAT_006aa760 = 0;
let DAT_006ab180 = 0;
let DAT_006ab184 = 0;
let DAT_006ab188 = 0;
let DAT_006ab18c = 0;
let DAT_006acb38 = 0;
let DAT_006ad108 = 0;
let DAT_006ad10c = null;
let DAT_006ad2f0 = 0;
let DAT_006ad2f7 = 0;
let DAT_006ad304 = 0;
let DAT_006ad308 = 0;
let DAT_006ad578 = 0;
let DAT_006ad57c = new Uint8Array(32);
let DAT_006ad59c = new Uint8Array(32);
let DAT_006ad5bc = new Uint8Array(32);
let DAT_006ad5fc = new Uint8Array(32);
let DAT_006ad640 = 0;
let DAT_006ad664 = 0;
let DAT_006ad66c = 0;
let DAT_006ad670 = 0;
let DAT_006ad678 = new Uint8Array(32);
let DAT_006ad684 = 0;
let DAT_006ad685 = 0;
let DAT_006ad698 = 0;
let DAT_006ad699 = 0;
let DAT_006ad6a4 = 0;
let DAT_006ad6a8 = 0;
let DAT_006ad6ac = 0;
let DAT_006ad6ae = new Uint8Array(260);
let DAT_006ad7b2 = new Uint8Array(260);
let DAT_006ad8b8 = 0;
let DAT_006ad908 = 0;
let DAT_006ad90c = 0;
let DAT_006ad910 = 0;
let DAT_006ad914 = 0;
let DAT_006ad918 = 0;
let DAT_006ad91c = 0;
let DAT_006ad920 = new Int32Array(100 * 16);
let DAT_006ad924 = new Int32Array(100 * 16);
let DAT_006ad928 = new Int32Array(100 * 16);
let DAT_006ad92c = new Int32Array(100 * 16);
let DAT_006ad930 = new Int32Array(100 * 16);
let DAT_006ad934 = new Int32Array(100 * 16);
let DAT_006ad940 = new Uint8Array(100 * 0x40);
let DAT_0062bcb8 = new Int32Array(4);
let DAT_0062bcc8 = new Int32Array(4);
let DAT_006c3164 = 0;
let DAT_006c31a9 = 0;
let DAT_006c31a8 = 0;
let DAT_006c31c4 = 0;
let DAT_006c31c8 = 0;
let DAT_006c31d0 = 0;
let DAT_006c3168 = new Int32Array(8);
let DAT_006c3188 = new Int32Array(8);
let DAT_006c8fa0 = 0;
let DAT_006c8fac = 0;
let DAT_006c8fb4 = 0;
let DAT_006c8fc0 = new Int32Array(8);
let DAT_006c8fe0 = new Int32Array(256);
let DAT_006c8ff0 = 0;
let DAT_006c9038 = 0;
let DAT_006c9090 = 0;
let _DAT_006c90a0 = 0;
let DAT_006c90b4 = 0;
let DAT_006c90c0 = 0;
let DAT_006c90c8 = 0;
let DAT_006c90d0 = 0;
let DAT_006c90d8 = 0;
let DAT_006c90e0 = 0;
let DAT_006c90e8 = 0;
let DAT_006c90f0 = 0;
let DAT_006c90f8 = 0;
let DAT_006c9100 = 0;
let DAT_006c9108 = 0;
let DAT_006c9110 = 0;
let DAT_006c9118 = 0;
let DAT_006c9120 = 0;
let DAT_006c914c = 0;
let DAT_006c9164 = 0;
let DAT_006c9168 = 0;
let DAT_006c9178 = 0;
let DAT_006c918c = 0;
let DAT_006c926c = 0;
let DAT_006ced20 = new Int32Array(256);
let DAT_006d1160 = 0;
let DAT_006d1162 = 0;
let DAT_006d1164 = 0;
let DAT_006d116a = 0;
let DAT_006d116c = 0;
let DAT_006d1166 = 0;
let DAT_006d1da0 = 0;
let DAT_006d1da8 = 0;
let DAT_0067a420 = new Int32Array(256);
let DAT_0067a424 = new Int32Array(256);
let DAT_0067a8bc = 0;
let DAT_0067a8c0 = 0;
let DAT_0067a994 = 0;
let DAT_0067a9b8 = 0;
let DAT_0067a9bc = 0;
let DAT_0067a9dc = null;
let DAT_0067ab64 = 0;
let DAT_0067ab67 = 0;
let DAT_0067ab94 = 0;
let DAT_006553d8 = 0;
let DAT_00655b02_val = 0;
let DAT_00627684 = new Int32Array(100 * 4);
let DAT_0063cc48 = new Uint8Array(260);
let DAT_00655020_dat = new Uint8Array(260);
let DAT_006ad30c = new Uint8Array(7 * 0x54);
let DAT_006ad35c = new Uint8Array(7 * 0x15);
let _DAT_0066c990 = 0;
let _DAT_006ad578 = 0;
let DAT_0062c468 = new Int32Array(8);
let DAT_00673ad8 = new Int32Array(8);
let DAT_00673ab8 = new Int32Array(8);
let DAT_00673a78 = new Int32Array(8);
let DAT_00673a98 = new Int32Array(8);

// String literal stubs
let PTR_s_CIVILIZE_0062b990 = 'CIVILIZE';
let PTR_FUN_0061d1e4 = 0;
let s_ARCHAEOLOGISTS_0062b840 = 'ARCHAEOLOGISTS';
let s_ARCHAEOLOGISTS3_0062b854 = 'ARCHAEOLOGISTS3';
let s_CENTAURI_0062b888 = 'CENTAURI';
let s_CENTAURI_0062b8f4 = 'CENTAURI';
let s_CENTAURI3_0062b904 = 'CENTAURI3';
let s_CENTAURI_BEATEN_0062b934 = 'CENTAURI_BEATEN';
let s_VFWNOTREGISTERED_0062b82c = 'VFWNOTREGISTERED';
let s_VFWNOTREGISTERED_0062b8d8 = 'VFWNOTREGISTERED';
let s_DANGER_0062b978 = 'DANGER';
let s_DANGERHEX_0062b980 = 'DANGERHEX';


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════


// FUN_004702e0 — init_video_player (loser video)
export function FUN_004702e0(param_1) {
  // SEH/operator_new/class initialization — UI framework, stubbed
  DAT_0062b804 = FUN_004703d4();
  if (DAT_0062b804 !== 0) {
    let iVar2 = load_civ2_art_004705d7(param_1);
    if (iVar2 !== 0) {
      FUN_004708db();
    }
    if (DAT_0062b804 !== 0) {
      FUN_00471020(1);
    }
    DAT_0062b804 = 0;
  }
}

// FUN_004703d4 — init_video_class
export function FUN_004703d4() {
  // MFC class constructor chain — stubbed
  FUN_0044c730();
  FUN_005c64da();
  FUN_005dd010();
  FUN_004502b0();
  FUN_0043c690();
  FUN_005bd630();
  return 0; // returns in_ECX in original
}

// FUN_004704ec — destructor_chain
export function FUN_004704ec() {
  FUN_0047056b();
  FUN_0047057a();
  FUN_00470589();
  FUN_00470598();
  FUN_004705a7();
  FUN_004705b6();
  FUN_004705c9();
}

// FUN_0047056b — call_FUN_005bd915
export function FUN_0047056b() { FUN_005bd915(); }

// FUN_0047057a — call_thunk_0043c520
export function FUN_0047057a() { FUN_0043c520(); }

// FUN_00470589 — destructor_timevec
export function FUN_00470589() { /* _Timevec::~_Timevec — no-op */ }

// FUN_00470598 — call_FUN_005dd1a0
export function FUN_00470598() { FUN_005dd1a0(); }

// FUN_004705a7 — call_FUN_005c656b
export function FUN_004705a7() { FUN_005c656b(); }

// FUN_004705b6 — call_thunk_0044ca60
export function FUN_004705b6() { FUN_0044ca60(); }

// FUN_004705c9 — seh_epilog
export function FUN_004705c9() { /* SEH frame restore — no-op */ }

// load_civ2_art_004705d7 — load_video_art_resources
export function load_civ2_art_004705d7(param_1) {
  // Opens loser.avi and civ2art.dll, sets up video display
  // Pure UI/file loading — stubbed
  return 0;
}

// FUN_004708db — play_loser_video_sequence
export function FUN_004708db() {
  // Plays loser video with ARCHAEOLOGISTS text — pure UI
}

// FUN_00470c0c — noop_stub
export function FUN_00470c0c() { }

// FUN_00470c1c — display_archaeologists3_text
export function FUN_00470c1c() {
  // Reads ARCHAEOLOGISTS3 section from game text — pure UI
}

// FUN_00471020 — delete_video_class
export function FUN_00471020(param_1) {
  FUN_004704ec();
  // operator_delete — no-op in JS
}

// GetActiveView @ 0x00471070 — MFC library function
export function GetActiveView_00471070() { return null; }

// GetActiveView @ 0x004710A0 — MFC library function (duplicate)
export function GetActiveView_004710A0() { return null; }

// FUN_004710d0 — init_centauri_video
export function FUN_004710d0(param_1) {
  if (param_1 < 0) {
    load_civ2_art_00471dd8(param_1);
    return;
  }
  // Allocates new video class, loads centauri video
  DAT_0062b87c = FUN_00471362();
  if (DAT_0062b87c === 0) return;
  let iVar2 = load_civ2_art_00471565(param_1);
  if (iVar2 === 0) {
    // Show message dialog with unit/year info — UI
    FUN_0047132e();
  } else {
    FUN_00471856();
  }
  if (DAT_0062b87c !== 0) {
    FUN_004728c0(1);
  }
  DAT_0062b87c = 0;
}

// FUN_0047132e — call_FUN_0059df8a
export function FUN_0047132e() { FUN_0059df8a(); }

// FUN_00471354 — seh_epilog
export function FUN_00471354() { /* SEH frame restore — no-op */ }

// FUN_00471362 — init_centauri_class
export function FUN_00471362() {
  FUN_0044c730();
  FUN_005c64da();
  FUN_005dd010();
  FUN_004502b0();
  FUN_0043c690();
  FUN_005bd630();
  return 0;
}

// FUN_0047147a — destructor_chain_centauri
export function FUN_0047147a() {
  FUN_004714f9();
  FUN_00471508();
  FUN_00471517();
  FUN_00471526();
  FUN_00471535();
  FUN_00471544();
  FUN_00471557();
}

// FUN_004714f9 — call_FUN_005bd915
export function FUN_004714f9() { FUN_005bd915(); }

// FUN_00471508 — call_thunk_0043c520
export function FUN_00471508() { FUN_0043c520(); }

// FUN_00471517 — destructor_timevec
export function FUN_00471517() { /* no-op */ }

// FUN_00471526 — call_FUN_005dd1a0
export function FUN_00471526() { FUN_005dd1a0(); }

// FUN_00471535 — call_FUN_005c656b
export function FUN_00471535() { FUN_005c656b(); }

// FUN_00471544 — call_thunk_0044ca60
export function FUN_00471544() { FUN_0044ca60(); }

// FUN_00471557 — seh_epilog
export function FUN_00471557() { /* no-op */ }

// load_civ2_art_00471565 — load_centauri_video_art
export function load_civ2_art_00471565(param_1) {
  // Opens civ2 video/win AVI and civ2art.dll — pure UI/file
  return 0;
}

// FUN_00471856 — play_centauri_video_sequence
export function FUN_00471856() {
  // Plays centauri victory sequence with text overlays — pure UI
}

// FUN_00471bfe — noop_stub
export function FUN_00471bfe() { }

// FUN_00471c14 — noop_stub
export function FUN_00471c14() { }

// FUN_00471c2a — display_centauri3_credits
export function FUN_00471c2a() {
  // Displays CENTAURI3 scrolling text — pure UI
}

// FUN_00471db7 — invalidate_object_cache
export function FUN_00471db7() {
  // CRichEditDoc::InvalidateObjectCache — no-op
}

// load_civ2_art_00471dd8 — load_beaten_video
export function load_civ2_art_00471dd8(param_1) {
  // Loads and plays CENTAURI_BEATEN video — pure UI
}

// FUN_00472393 — call_thunk_0043c520
export function FUN_00472393() { FUN_0043c520(); }

// FUN_0047239f — call_FUN_005bd915
export function FUN_0047239f() { FUN_005bd915(); }

// FUN_004723ab — call_FUN_005c656b
export function FUN_004723ab() { FUN_005c656b(); }

// FUN_004723b7 — call_thunk_0044ca60
export function FUN_004723b7() { FUN_0044ca60(); }

// FUN_004723c3 — destructor_timevec
export function FUN_004723c3() { /* no-op */ }

// FUN_004723cf — call_thunk_0044cba0
export function FUN_004723cf() { FUN_0044cba0(); }

// FUN_004723e5 — seh_epilog
export function FUN_004723e5() { /* no-op */ }

// FUN_004728c0 — delete_centauri_class
export function FUN_004728c0(param_1) {
  FUN_0047147a();
  // operator_delete — no-op in JS
}

// FUN_00472910 — set_dialog_params
export function FUN_00472910(param_1, param_2) {
  // Sets in_ECX+0x118 and in_ECX+0xa20 — UI state, stubbed
}

// FUN_00472950 — append_extension_to_filename
export function FUN_00472950(param_1, param_2) {
  // Appends extension to filename if none present, then uppercases — pure string op
  // stubbed: Win32 file path manipulation
}

// FUN_004729ab — copy_and_replace_extension
export function FUN_004729ab(param_1, param_2, param_3) {
  // Copies param_2 to param_1, replaces extension — pure string op
}

// FUN_00472a60 — show_danger_dialog
export function FUN_00472a60(param_1, param_2, param_3, param_4) {
  FUN_00421d60(0, param_1);
  FUN_00467580(0, param_2);
  FUN_00467580(1, param_3);
  FUN_00467580(2, param_4);
  FUN_00444270(s_DANGER_0062b978);
}

// FUN_00472ab5 — show_dangerhex_dialog
export function FUN_00472ab5(param_1, param_2, param_3, param_4) {
  FUN_00421d60(0, param_1);
  FUN_00467580(0, param_2);
  FUN_00467580(1, param_3);
  FUN_00467580(2, param_4);
  FUN_00444270(s_DANGERHEX_0062b980);
}

// FUN_00472b0a — draw_number_on_tile
export function FUN_00472b0a(param_1, param_2, param_3, param_4) {
  let iVar1 = FUN_0047c3e0(param_1, param_2);
  if (iVar1 !== 0) {
    // Draws a number at tile position — pure rendering
    let local_68 = 0, local_6c = 0;
    FUN_0047a6b0_stub(local_68, local_6c, param_1, param_2);
    let uVar2 = FUN_00472cf0(0x40, DAT_0066ca8c);
    let uVar3 = FUN_00472cf0(0x20, DAT_0066ca8c);
    // itoa + drawing calls — pure UI
  }
}

// FUN_00472cf0 — scale_by_zoom
export function FUN_00472cf0(param_1, param_2) {
  param_1 = (param_2 + 8) * param_1;
  return (param_1 + (param_1 >> 0x1f & 7)) >> 3;
}

// FUN_00472d20 — init_sound_params
export function FUN_00472d20(param_1, param_2) {
  DAT_006660f6 = param_1;
  DAT_006660f7 = param_2;
  DAT_006660f0 = 0xffce;
  DAT_006660f2 = 0xffce;
  DAT_006660f4 = 0;
  DAT_00666100 = 0xff;
  DAT_006660f8 = 0;
  DAT_006660f9 = 0;
  DAT_006660fe = 0;
  DAT_006660fd = 0;
  DAT_00666106 = 0xffff;
  DAT_00666108 = 0xffff;
  DAT_006660ff = 0xff;
  DAT_00666102 = 0xffff;
  DAT_00666104 = 0xffff;
  return 0x800;
}

// FUN_00472e1d — init_sound_and_play
export function FUN_00472e1d(param_1, param_2, param_3, param_4) {
  let uVar1 = FUN_00472d20(param_1, param_2);
  FUN_005b345f(uVar1, param_3, param_4, 1);
  return uVar1;
}

// FUN_00472e5c — stop_sound
export function FUN_00472e5c() {
  if (DAT_006660f7 >= 0) {
    FUN_005b4391(0x800, 1);
    DAT_006660f7 = -1;
  }
}

// FID_conflict___E31 @ 0x00472F10 — static_init_sound
export function FID_conflict___E31_472F10() {
  FUN_00472f2a();
  FUN_00472f44();
}

// FUN_00472f2a — call_FUN_005bd630
export function FUN_00472f2a() { FUN_005bd630(); }

// FUN_00472f44 — register_atexit_sound
export function FUN_00472f44() { /* _atexit(FUN_00472f61) — no-op */ }

// FUN_00472f61 — atexit_callback_sound
export function FUN_00472f61() { FUN_005bd915(); }

// FUN_00472f7b — copy_scroll_params_int_to_short
export function FUN_00472f7b() {
  DAT_0066c600[0] = DAT_00655280 & 0xff;
  DAT_0066c600[1] = (DAT_00655280 >> 8) & 0xff;
  FUN_0047314e(DAT_00655284, DAT_0066c602);
  FUN_0047314e(DAT_00655294, DAT_0066c60a);
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    FUN_0047314e_arr(DAT_006552a4, local_8 * 0x10, DAT_0066c612, local_8 * 8);
  }
  FUN_0047314e(DAT_00655324, DAT_0066c652);
  FUN_0047314e(DAT_00655334, DAT_0066c65a);
  FUN_0047314e(DAT_00655344, DAT_0066c662);
}

// FUN_00473064 — copy_scroll_params_short_to_int
export function FUN_00473064() {
  DAT_00655280 = DAT_0066c600[0] | (DAT_0066c600[1] << 8);
  FUN_00473190(DAT_0066c602, DAT_00655284);
  FUN_00473190(DAT_0066c60a, DAT_00655294);
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    FUN_00473190_arr(DAT_0066c612, local_8 * 8, DAT_006552a4, local_8 * 0x10);
  }
  FUN_00473190(DAT_0066c652, DAT_00655324);
  FUN_00473190(DAT_0066c65a, DAT_00655334);
  FUN_00473190(DAT_0066c662, DAT_00655344);
}

// FUN_0047314e — copy_4_ints_to_4_shorts
export function FUN_0047314e(param_1, param_2) {
  // Copies 4 int32s to 4 int16s — stubbed (data format conversion)
}

// Helper for array-based version
function FUN_0047314e_arr(src, srcOff, dst, dstOff) { /* stubbed */ }

// FUN_00473190 — copy_4_shorts_to_4_ints
export function FUN_00473190(param_1, param_2) {
  // Copies 4 int16s to 4 int32s — stubbed
}

function FUN_00473190_arr(src, srcOff, dst, dstOff) { /* stubbed */ }

// show_open_dialog_31D2 — show_file_dialog
export function show_open_dialog_31D2(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // Win32 GetOpenFileNameA/GetSaveFileNameA — stubbed
  return false;
}

// FUN_004732a6 — read_unit_and_city_data
export function FUN_004732a6(param_1, param_2) {
  // Reads unit/city records from save file based on version — file I/O
  return 1;
}

// load_game_file — load_game_state_from_file
export function load_game_file(param_1, param_2) {
  // Reads all game state sections from binary save file — file I/O
  return 1;
}

// FUN_00473c12 — write_null_terminated_string
export function FUN_00473c12(param_1, param_2) {
  // fputs + fputc(0) — file I/O helper
  return 0;
}

// FUN_00473c68 — read_null_terminated_string
export function FUN_00473c68(param_1) {
  // Reads null-terminated string from file, allocates memory
  return 0;
}

// FUN_00473d5e — set_save_extension_by_gametype
export function FUN_00473d5e(param_1) {
  // Sets DAT_0066c4e8 to appropriate file extension based on game type
  if (param_1 !== 0) {
    // scenario
  } else {
    // Based on DAT_00655b02 (game type)
  }
}

// FUN_00473e55 — build_file_filter_string
export function FUN_00473e55(param_1, param_2, param_3) {
  // Builds file filter for open/save dialog — pure UI/string
  return DAT_0066c4f8;
}

// FUN_00473ff2 — append_file_filter_entry
export function FUN_00473ff2(param_1, param_2) {
  // Appends .sav/.hot/.eml/.net filter entries — string building
  return null;
}

// FUN_004741be — save_game_to_file
export function FUN_004741be(param_1, param_2) {
  // Full save game implementation — writes all sections to file
  // Pure file I/O, returns 0 on success, 1 on failure
  return 0;
}

// FUN_0047543c — quick_load_verify
export function FUN_0047543c(param_1) {
  // Opens file, reads header, validates version — file I/O
  return 0;
}

// FUN_00475666 — full_load_game
export function FUN_00475666(param_1) {
  // Full load game: reads all sections, fixes up data, recalculates derived state
  // Pure file I/O + state fixup
  return 0;
}

// save_game — save_game_ui_flow
export function save_game(param_1) {
  // Complete save game UI flow: shows dialog, builds filename, calls FUN_004741be
  // Pure UI flow
}

// load_verify_units — load_game_ui_flow
export function load_verify_units(param_1, param_2, param_3) {
  // Complete load game UI flow: shows dialog, calls FUN_00475666, verifies units
  // Pure UI flow
}

// FUN_004786f8 — call_FUN_005c656b
export function FUN_004786f8() { FUN_005c656b(); }

// FUN_0047870e — seh_epilog
export function FUN_0047870e() { /* no-op */ }

// FUN_00479d20 — static_init_views
export function FUN_00479d20() {
  FUN_00479d3a();
  FUN_00479d65();
}

// FUN_00479d3a — eh_vector_constructor_views
export function FUN_00479d3a() {
  // _eh_vector_constructor_iterator_ — MFC internal, no-op
}

// FUN_00479d65 — register_atexit_views
export function FUN_00479d65() { /* _atexit — no-op */ }

// FUN_00479d82 — atexit_destructor_views
export function FUN_00479d82() {
  // _eh_vector_destructor_iterator_ — no-op
}

// FID_conflict___E31 @ 0x00479DA8 — static_init_A
export function FID_conflict___E31_479DA8() {
  FUN_00479dc2();
  FUN_00479ddc();
}

// FUN_00479dc2 — call_thunk_0040fb00
export function FUN_00479dc2() { FUN_0040fb00(); }

// FUN_00479ddc — register_atexit_A
export function FUN_00479ddc() { /* _atexit — no-op */ }

// FUN_00479df9 — atexit_callback_A
export function FUN_00479df9() { FUN_0040fbb0(); }

// FID_conflict___E31 @ 0x00479E13 — static_init_B
export function FID_conflict___E31_479E13() {
  FUN_00479e2d();
  FUN_00479e47();
}

// FUN_00479e2d — call_thunk_0040fb00
export function FUN_00479e2d() { FUN_0040fb00(); }

// FUN_00479e47 — register_atexit_B
export function FUN_00479e47() { /* _atexit — no-op */ }

// FUN_00479e64 — atexit_callback_B
export function FUN_00479e64() { FUN_0040fbb0(); }

// FUN_00479e7e — scroll_map_by_column
export function FUN_00479e7e(param_1) {
  // thunk_FUN_00410402 — map scroll UI, stubbed
}

// FUN_00479eae — scroll_map_by_row
export function FUN_00479eae(param_1) {
  // thunk_FUN_00410402 — map scroll UI, stubbed
}

// FUN_00479ede — set_map_mode
export function FUN_00479ede(param_1) {
  // Sets map display parameters — in_ECX state, UI
}

// FUN_00479fbe — compute_map_viewport
export function FUN_00479fbe() {
  // Computes tile sizes, viewport dimensions, scroll limits
  // Pure UI/rendering geometry — stubbed
}

// FUN_0047a540 — screen_to_tile
export function FUN_0047a540(param_1, param_2, param_3, param_4) {
  // Converts screen coordinates to tile coordinates
  // Returns 0 on success, 1 if out of bounds — pure geometry
  return 1;
}

// FUN_0047a6b0 — tile_to_screen
export function FUN_0047a6b0(param_1, param_2, param_3, param_4) {
  // Converts tile coordinates to screen pixel coordinates — pure geometry
}

// Stub for internal calls
function FUN_0047a6b0_stub(p1, p2, p3, p4) { /* stubbed */ }

// FUN_0047a747 — count_coast_neighbors
export function FUN_0047a747(param_1, param_2) {
  let local_8 = 0;
  for (let local_c = 0; local_c < 4; local_c = local_c + 1) {
    DAT_0066c720[local_c] = 0;
  }
  let iVar2 = FUN_004087c0(param_1, param_2);
  if (iVar2 === 0) {
    local_8 = 0;
  } else {
    for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
      let uVar3 = FUN_005ae052(s8(DAT_00628350[local_c]) + param_1);
      let cVar1 = s8(DAT_00628360[local_c]);
      let iVar2_inner = FUN_004087c0(uVar3, cVar1 + param_2);
      let local_14;
      if (iVar2_inner === 0) {
        local_14 = 7;
      } else {
        local_14 = s8(FUN_005b89bb(uVar3, cVar1 + param_2));
      }
      if (local_14 !== 10) {
        local_8 = local_8 + 1;
        if ((local_c & 1) === 0) {
          let iVar_d = local_c >> 1;
          let uVar4 = (iVar_d + 1) & 3;
          DAT_0066c720[iVar_d] = DAT_0066c720[iVar_d] | 4;
          DAT_0066c720[uVar4] = DAT_0066c720[uVar4] | 1;
        } else {
          let uVar4 = ((local_c + 1) & 6) >> 1;
          DAT_0066c720[uVar4] = DAT_0066c720[uVar4] | 2;
        }
      }
    }
  }
  return local_8;
}

// FUN_0047a8c9 — draw_terrain_tile
export function FUN_0047a8c9(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // Large terrain rendering function — pure rendering, stubbed
  // Draws base terrain, overlays, improvements, rivers, resources etc.
}

// FUN_0047ba1d — draw_city_on_tile
export function FUN_0047ba1d(param_1, param_2, param_3, param_4) {
  // Draws a city sprite on a map tile — rendering
}

// FUN_0047bba5 — draw_unit_default
export function FUN_0047bba5() {
  FUN_0056baff();
}

// FUN_0047bbea — draw_unit_conditional
export function FUN_0047bbea() {
  if (DAT_0062804c === 0 || DAT_00628054 === 0 || DAT_006d1da8 !== 1) {
    FUN_0056baff();
  }
}

// FUN_0047bc59 — draw_unit_at_position
export function FUN_0047bc59(param_1) {
  if (DAT_0062804c === 0 || DAT_00628054 === 0 || DAT_006d1da8 !== 1) {
    // Calculates screen position and draws unit — rendering
  }
}

// FUN_0047bd04 — draw_unit_with_checks
export function FUN_0047bd04(param_1, param_2, param_3) {
  // Checks unit selection state and draws accordingly — rendering
}

// FUN_0047be63 — draw_units_on_tile
export function FUN_0047be63(param_1, param_2, param_3, param_4) {
  // Iterates units on tile, draws visible ones — rendering
}

// FUN_0047c103 — draw_single_map_tile
export function FUN_0047c103(param_1, param_2, param_3) {
  // Draws terrain + city + units for a single tile — rendering
}

// FUN_0047c2f2 — is_x_in_range_wrapping
export function FUN_0047c2f2(param_1, param_2, param_3) {
  if ((DAT_00655ae8 & 0x8000) === 0) {
    if (param_1 < param_2) {
      param_1 = param_1 + DAT_006d1160;
    }
    if (param_2 + param_3 <= param_1) {
      param_1 = param_1 - DAT_006d1160;
    }
  }
  if (param_1 < param_2) return 0;
  if ((param_2 + param_3) - param_1 < 1) return 0;
  return 1;
}

// FUN_0047c37f — is_tile_in_rect
export function FUN_0047c37f(param_1, param_2, param_3, param_4, param_5, param_6) {
  let iVar1 = FUN_0047c2f2(param_1, param_3, param_5);
  if (iVar1 === 0) return 0;
  if (param_2 < param_4) return 0;
  if (param_2 < param_6 + param_4) return 1;
  return 0;
}

// FUN_0047c3e0 — is_tile_in_viewport
export function FUN_0047c3e0(param_1, param_2) {
  // Checks if tile is within current map viewport — uses in_ECX state
  // Stubbed: always returns 1
  return 1;
}

// FUN_0047c443 — draw_city_names
export function FUN_0047c443(param_1, param_2, param_3) {
  // Draws city name labels on visible cities — rendering
}

// FUN_0047c7aa — compute_tile_area_rect
export function FUN_0047c7aa(param_1, param_2, param_3, param_4) {
  // Computes screen rectangle for a tile area — geometry
}

// FUN_0047c869 — draw_map_area
export function FUN_0047c869(param_1, param_2, param_3, param_4) {
  // Draws map tiles in a diamond pattern around a center — rendering
}

// FUN_0047c9d4 — draw_full_viewport
export function FUN_0047c9d4(param_1) {
  // Draws all visible tiles in the viewport — rendering
}

// FUN_0047caea — invalidate_tile_area
export function FUN_0047caea(param_1, param_2, param_3) {
  // Invalidates screen region for a tile area — rendering
}

// FUN_0047cb26 — invalidate_single_tile
export function FUN_0047cb26(param_1, param_2) {
  FUN_0047caea(param_1, param_2, 0);
}

// FUN_0047cb50 — refresh_status_displays
export function FUN_0047cb50() {
  // Updates info panels and status bar — UI
}

// FUN_0047cbb4 — redraw_map_area
export function FUN_0047cbb4(param_1, param_2, param_3, param_4, param_5) {
  if (DAT_00628044 !== 0) {
    DAT_006ad908 = 1;
    let local_20 = (DAT_00655b07 === 0) ? param_4 : -1;
    FUN_0047c869(param_1, param_2, param_3, local_20);
    // Additional cursor drawing logic — rendering
    if (param_5 !== 0) {
      FUN_0047caea(param_1, param_2, param_3);
    }
    DAT_006ad908 = 0;
  }
}

// FUN_0047cced — redraw_tile_1x
export function FUN_0047cced(param_1, param_2) {
  FUN_0047cbb4(param_1, param_2, 0, DAT_006d1da0, 1);
}

// FUN_0047cd1f — redraw_tile_3x
export function FUN_0047cd1f(param_1, param_2) {
  FUN_0047cbb4(param_1, param_2, 1, DAT_006d1da0, 1);
}

// FUN_0047cd51 — full_map_redraw
export function FUN_0047cd51(param_1, param_2) {
  if (DAT_00628044 !== 0) {
    DAT_006ad908 = 1;
    // viewport recalc + full redraw — rendering
    DAT_006ad908 = 0;
  }
}

// FUN_0047ce1e — redraw_all_views
export function FUN_0047ce1e(param_1, param_2, param_3, param_4, param_5) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cbb4(param_1, param_2, param_3, param_4, param_5);
    }
  }
}

// FUN_0047cea6 — redraw_tile_1x_all_views
export function FUN_0047cea6(param_1, param_2) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cced(param_1, param_2);
    }
  }
}

// FUN_0047cf22 — redraw_tile_3x_all_views
export function FUN_0047cf22(param_1, param_2) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cd1f(param_1, param_2);
    }
  }
}

// FUN_0047cf9e — full_redraw_all_views
export function FUN_0047cf9e(param_1, param_2) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cd51(param_1, param_2);
    }
  }
}

// FUN_0047dce0 — init_bitmap_button_class
export function FUN_0047dce0() {
  // MFC class constructor — returns class pointer, stubbed
  FUN_0055339f();
  FUN_0043c690();
  FUN_0043c690();
  FUN_005bd630();
  FUN_005bd630();
  return null;
}

// ~CBitmapButton @ 0x0047DE10 — MFC library destructor
export function CBitmapButton_destructor() {
  FUN_0047de82();
  FUN_0047de91();
  FUN_0047dea0();
  FUN_0047deaf();
  FUN_0047debe();
  FUN_0047ded1();
}

// FUN_0047de82 — call_FUN_005bd915
export function FUN_0047de82() { FUN_005bd915(); }

// FUN_0047de91 — call_FUN_005bd915
export function FUN_0047de91() { FUN_005bd915(); }

// FUN_0047dea0 — call_thunk_0043c520
export function FUN_0047dea0() { FUN_0043c520(); }

// FUN_0047deaf — call_thunk_0043c520
export function FUN_0047deaf() { FUN_0043c520(); }

// FUN_0047debe — destructor_oleframe
export function FUN_0047debe() { /* COleCntrFrameWnd::~COleCntrFrameWnd — no-op */ }

// FUN_0047ded1 — seh_epilog
export function FUN_0047ded1() { /* no-op */ }

// FUN_0047df20 — set_draw_scale
export function FUN_0047df20(param_1) {
  FUN_005cd775(param_1 + 8, 8);
}

// FUN_0047df50 — reset_draw_scale
export function FUN_0047df50() {
  FUN_005cd775(1, 1);
}

// FUN_0047df80 — intersect_rect
export function FUN_0047df80(param_1, param_2, param_3) {
  // Win32 IntersectRect — geometry, stubbed
}

// FUN_0047dfb0 — scale_param_by_zoom
export function FUN_0047dfb0(param_1) {
  // thunk_FUN_00472cf0(param_1, zoom_level) — rendering
  return 0;
}

// FUN_0047dff0 — set_zoom_draw_scale
export function FUN_0047dff0() {
  // thunk_FUN_0047df20(zoom_level) — rendering
}

// FUN_0047e030 — is_tile_visible_to_player
export function FUN_0047e030(param_1, param_2) {
  let iVar1 = FUN_005b8b65(param_1, param_2, DAT_006d1da0);
  if (iVar1 !== 0) {
    for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
      if ((local_8 === 0 || DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) &&
          FUN_0047c3e0(param_1, param_2) !== 0) {
        return 1;
      }
    }
  }
  return 0;
}

// FUN_0047e0e5 — enqueue_stacked_draw
export function FUN_0047e0e5(param_1, param_2, param_3) {
  // Network draw queue — queues render operations for multiplayer sync
  if (DAT_006ad914 === DAT_006ad910 && DAT_006ad90c !== 0) {
    // Queue full — flush
    if (DAT_006ad918 !== 0) {
      DAT_006ad914 = (DAT_006ad910 + 1) % 100;
    } else {
      DAT_006ad910 = 0;
      DAT_006ad914 = 0;
    }
    DAT_006ad90c = DAT_006ad918 !== 0 ? 1 : 0;
    FUN_0047e0e5(0xa3, [], 0);
    return FUN_0047e0e5(0x74, [], 0);
  }
  // Enqueue draw command
  DAT_006ad90c = DAT_006ad90c + 1;
  if (DAT_006ad91c < DAT_006ad90c) {
    DAT_006ad91c = DAT_006ad90c;
  }
  let iVar1 = (DAT_006ad914 + 1) / 100;
  DAT_006ad914 = (DAT_006ad914 + 1) % 100;
  return iVar1;
}

// FUN_0047e2b3 — dequeue_and_execute_draw
export function FUN_0047e2b3() {
  // Processes queued draw operations — large switch statement
  // Handles move units, redraw tiles, combat animations, etc.
  // Pure rendering/network — stubbed
  DAT_006ad90c = DAT_006ad90c - 1;
  let iVar6 = DAT_006ad910 + 1;
  DAT_006ad910 = iVar6 % 100;
  return (iVar6 / 100) | 0;
}

// FUN_0047e94e — network_poll_dispatch
export function FUN_0047e94e(param_1, param_2) {
  // Massive network message dispatcher (14000+ bytes)
  // Handles 160+ message types: game state sync, unit commands,
  // city operations, diplomacy, combat, etc.
  // Pure network/UI — stubbed for game logic extraction
}

// FUN_00482305 — seh_helper_A (referenced within FUN_0047e94e)
export function FUN_00482305() { /* SEH cleanup — no-op */ }

// FUN_00482311 — seh_helper_B (referenced within FUN_0047e94e)
export function FUN_00482311() { /* SEH cleanup — no-op */ }

// FUN_00482327 — seh_epilog_poll (referenced within FUN_0047e94e)
export function FUN_00482327() { /* SEH epilog — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
// These are called from this block but defined elsewhere.
// ═══════════════════════════════════════════════════════════════════

function FUN_0044c730() { /* MFC class init */ }
function FUN_005c64da() { /* GDI init */ }
function FUN_005dd010() { /* stream init */ }
function FUN_004502b0() { /* dialog init */ }
function FUN_0043c690() { /* string class init */ }
function FUN_005bd630() { /* bitmap init */ }
function FUN_005bd915() { /* bitmap destroy */ }
function FUN_0043c520() { /* string class destroy */ }
function FUN_005dd1a0() { /* stream destroy */ }
function FUN_005c656b() { /* GDI destroy */ }
function FUN_0044ca60() { /* MFC class destroy */ }
function FUN_0044cba0() { /* MFC secondary destroy */ }
function FUN_005bf5e1() { /* timer setup */ }
function FUN_005dd27e() { /* video buffer init */ }
function FUN_005dd71e() { /* video play */ }
function FUN_005dd377() { /* video open */ }
function FUN_005c041f() { /* DC setup */ }
function FUN_005bd65c() { /* bitmap resize */ }
function FUN_005dd64c() { /* video position */ }
function FUN_005c5fc4() { /* surface create */ }
function FUN_005c0593() { /* rect copy */ }
function FUN_005c19ad() { /* set text color */ }
function FUN_005c1167() { /* draw text */ }
function FUN_005c1020() { /* draw text alt */ }
function FUN_005c61b0() { /* surface release */ }
function FUN_005dd3c2() { /* video close */ }
function FUN_005d22b7() { /* debug log format */ }
function FUN_005d22f9() { /* debug log format2 */ }
function FUN_005d687b() { /* game config set */ }
function FUN_005dae6b() { /* assert */ }
function FUN_005f22d0() { /* strcpy */ }
function FUN_005f22e0() { /* strcat */ }
function FUN_005cd775() { /* set draw scale */ }
function FUN_005cef31() { /* blit sprite */ }
function FUN_005c0bf2() { /* compute tile quadrant */ }
function FUN_005c0073() { /* set clip rect */ }
function FUN_005c0479() { /* draw flag */ }
function FUN_005c0cc5() { /* surface lock */ }
function FUN_005bf071() { /* load gif */ }
function FUN_005bb3f0() { /* surface create offscreen */ }
function FUN_005bcaa7() { /* get screen dims */ }
function FUN_0059df8a() { /* dialog close */ }
function FUN_0056baff() { /* draw unit sprite */ }
function FUN_005b345f() { /* place unit */ }
function FUN_005b4391() { /* remove unit */ }
function FUN_005b8b65() { /* is_tile_visible */ }
function FUN_005b8ffa() { /* has_goody_hut */ }
function FUN_005b898b() { /* get_tile_layer */ }
function FUN_005b2e69() { /* get_first_unit_on_tile */ }
function FUN_005b2c82() { /* get_next_unit */ }
function FUN_005b50ad() { /* count_units_at */ }
function FUN_005b2d39() { /* get_top_unit */ }
function FUN_005b633f() { /* can_see_unit */ }
function FUN_005b2590() { /* update_unit_position */ }
function FUN_005ae296() { /* manhattan_distance */ }
function FUN_005ae1b0() { /* tile_distance */ }
function FUN_005ae31d() { /* distance_between_tiles */ }
function FUN_005ae006() { /* count_set_bits */ }
function FUN_0055339f() { /* button class base init */ }
function FUN_0040fb00() { /* static init helper A */ }
function FUN_0040fbb0() { /* static destroy helper A */ }
function FUN_00421d60() { /* set_dialog_param */ }
function FUN_00467580() { /* set_dialog_param_alt */ }
function FUN_00444270() { /* show_popup_dialog */ }
function FUN_00421ea0() { /* show_text_dialog */ }
function FUN_00421f10() { /* format_year */ }
function FUN_004271e8() { /* format_param */ }
function FUN_00428b0c() { /* get_civ_name_string */ }
function FUN_00493b10() { /* get_leader_name */ }
function FUN_00493ba6() { /* get_civ_adjective */ }
function FUN_00493c7d() { /* get_civ_plural */ }
function FUN_004af14b() { /* load_string_resource */ }
function FUN_004af122() { /* load_string_by_id */ }
function FUN_004aef20() { /* clear_string */ }
function FUN_004aef36() { /* trim_string */ }
function FUN_004af01a() { /* uppercase_string */ }
function FUN_004af03b() { /* lowercase_string */ }
function FUN_004af1d5() { /* append_number */ }
function FUN_0043c840() { /* string_concat */ }
function FUN_0043c790() { /* offset_rect */ }
function FUN_0043c910() { /* draw_text_ex */ }
function FUN_0043c9d0() { /* find_text_section */ }
function FUN_0043cab0() { /* get_unit_color */ }
function FUN_0043cb30() { /* get_player_color */ }
function FUN_0043cf76() { /* find_city_at */ }
function FUN_0043d07a() { /* find_city_at_ex */ }
function FUN_00410030() { /* show_yes_no_dialog */ }
function FUN_00410070() { /* get_government_name */ }
function FUN_00410402() { /* scroll_map_to */ }
function FUN_004105f8() { /* center_on_tile */ }
function FUN_00415133() { /* file_exists */ }
function FUN_00414ce0() { /* lock_screen */ }
function FUN_00414d10() { /* get_main_window */ }
function FUN_00414d40() { /* unlock_screen */ }
function FUN_00417ef0() { /* set_font_size */ }
function FUN_00419b80() { /* flip_surfaces */ }
function FUN_00419ba0() { /* set_palette */ }
function FUN_00419be0() { /* restore_palette */ }
function FUN_00419ed3() { /* reset_scroll_state */ }
function FUN_0041a046() { /* init_minimap */ }
function FUN_0041a422() { /* init_statusbar */ }
function FUN_0041a5c4() { /* init_infopanel */ }
function FUN_0041e864() { /* set_game_state */ }
function FUN_00421bb0() { /* get_tick_count */ }
function FUN_00421bd0() { /* update_status_bar */ }
function FUN_00426f80() { /* draw_centered_text */ }
function FUN_00426fb0() { /* show_modal_dialog */ }
function FUN_00426ff0() { /* format_string */ }
function FUN_004083b0() { /* clear_view_buffer */ }
function FUN_00408460() { /* invalidate_all */ }
function FUN_00408490() { /* invalidate_rect */ }
function FUN_004085f0() { /* save_dc */ }
function FUN_00408650() { /* restore_dc */ }
function FUN_004086c0() { /* set_rect */ }
function FUN_004087c0_stub() { /* is_valid_tile */ }
function FUN_0040733c() { /* activate_unit_panel */ }
function FUN_0040bc80() { /* wait_dialog_close */ }
function FUN_0040bcb0() { /* has_special_resource */ }
function FUN_0040bbb0() { /* begin_format_string */ }
function FUN_0040bbe0() { /* append_section_name */ }
function FUN_0040ddc6() { /* advisor_popup_A */ }
function FUN_0040decc() { /* advisor_popup_B */ }
function FUN_0040ef70() { /* get_text_height */ }
function FUN_0040efd0() { /* get_text_width */ }
function FUN_0040ff30() { /* set_format_int */ }
function FUN_0040ff60() { /* set_format_string */ }
function FUN_0040ffa0() { /* show_wait_dialog */ }
function FUN_00407f90() { /* get_rect_x */ }
function FUN_00407fc0() { /* get_rect_y */ }
function FUN_00407ff0() { /* update_info_panel */ }
function FUN_00450340() { /* show_window */ }
function FUN_00450390() { /* set_background */ }
function FUN_004503d0() { /* hide_window */ }
function FUN_00450400() { /* create_window */ }
function FUN_004502e0() { /* load_dll_resources */ }
function FUN_00453af0() { /* process_messages */ }
function FUN_00453c40() { /* diplomacy_scroll_up */ }
function FUN_00453c80() { /* diplomacy_scroll_down */ }
function FUN_004257fe() { /* chat_message_display */ }
function FUN_0045b0d6() { /* set_tax_rates */ }
function FUN_00436287() { /* revolution */ }
function FUN_00467580_stub() { /* param stub */ }
function FUN_00467750() { /* break_treaty */ }
function FUN_00467825() { /* declare_war */ }
function FUN_00468bb9() { /* diplomacy_menu */ }
function FUN_0046b14d() { /* send_network_message */ }
function FUN_0046e020() { /* play_sound */ }
function FUN_0046e287() { /* delay_ms */ }
function FUN_0046e4a9() { /* init_turn */ }
function FUN_0046e571() { /* set_screen_mode */ }
function FUN_0046e6a9() { /* pre_video_setup */ }
function FUN_0046e6c8() { /* start_turn_processing */ }
function FUN_00484cc0() { /* init_scenario_defaults */ }
function FUN_00484d52() { /* yield_to_os */ }
function FUN_00497da0() { /* read_file_header */ }
function FUN_00497e0f() { /* write_file_header */ }
function FUN_00498159() { /* allocate_string_buffer */ }
function FUN_00498784() { /* init_mp_defaults */ }
function FUN_0049882b() { /* init_mp_state */ }
function FUN_004a2020() { /* close_text_file */ }
function FUN_004a2379() { /* find_text_section_alt */ }
function FUN_004a23fc() { /* read_text_line */ }
function FUN_004a76f5() { /* init_wonder_effects */ }
function FUN_004b0b53() { /* sync_game_state */ }
function FUN_004b1de3() { /* process_save_block */ }
function FUN_004b24a2() { /* decompress_delta */ }
function FUN_004b251a() { /* apply_delta */ }
function FUN_004b7645() { /* diplomacy_init */ }
function FUN_004b81dd() { /* diplomacy_message */ }
function FUN_004b90ad() { /* process_trade */ }
function FUN_004bf05b() { /* process_spy */ }
function FUN_004cef35() { /* init_events */ }
function FUN_004dd285() { /* process_cheat */ }
function FUN_004e1763() { /* change_government */ }
function FUN_004e2803() { /* minimap_click */ }
function FUN_004e4ceb() { /* end_turn_update */ }
function FUN_004e7270() { /* move_unit_network */ }
function FUN_004f1220() { /* process_trade_route */ }
function FUN_004fa5d9() { /* alloc_event_buffer */ }
function FUN_004fa617() { /* alloc_event_entry */ }
function FUN_004fbd2b() { /* process_events */ }
function FUN_004fc516() { /* parse_event_file */ }
function FUN_005b3d06() { /* create_unit */ }
function FUN_005b389f() { /* disband_unit */ }
function FUN_005b3ae0() { /* move_unit_to */ }
function FUN_005b48b1() { /* wake_unit */ }
function FUN_005b490e() { /* update_unit_nationality */ }
function FUN_005b496e() { /* set_unit_order */ }
function FUN_005b542e() { /* upgrade_unit */ }
function FUN_005b5bab() { /* fortify_unit */ }
function FUN_005b5d93() { /* pillage_tile */ }
function FUN_005b6042() { /* airlift_unit */ }
function FUN_005b6787() { /* refresh_unit_vision */ }
function FUN_005b8635() { /* write_map_data */ }
function FUN_005b8783() { /* read_map_data */ }
function FUN_005b94fc() { /* reveal_tile */ }
function FUN_005b9646() { /* update_tile_improvement */ }
function FUN_005b976d() { /* set_tile_terrain */ }
function FUN_005b98b7() { /* set_tile_special */ }
function FUN_005b99e8() { /* update_tile_owner */ }
function FUN_005b9b35() { /* update_tile_road */ }
function FUN_005b9c49() { /* update_tile_irrigation */ }
function FUN_005b9d81() { /* update_tile_mining */ }
function FUN_005ba206() { /* process_save_replay */ }
function FUN_0055ae80() { /* enable_input */ }
function FUN_0055af2e() { /* toggle_input_mode */ }
function FUN_0055b046() { /* disable_input */ }
function FUN_0055c3d3() { /* change_production */ }
function FUN_00552112() { /* update_minimap */ }
function FUN_00552ed2() { /* save_screen_state */ }
function FUN_005149d6() { /* poll_network_message */ }
function FUN_00511a0e() { /* process_game_command */ }
function FUN_00511ba2() { /* process_ai_turn */ }
function FUN_00523d8a() { /* sync_client */ }
function FUN_005233fc() { /* validate_player_join */ }
function FUN_00560d95() { /* set_diplomacy_A */ }
function FUN_00562021() { /* set_diplomacy_B */ }
function FUN_00564470() { /* change_directory_str */ }
function FUN_00564713() { /* file_exists_alt */ }
function FUN_00569363() { /* accept_treaty */ }
function FUN_0056a65e() { /* reject_treaty */ }
function FUN_0056c705() { /* animate_unit_move */ }
function FUN_0056d289() { /* draw_city_sprite */ }
function FUN_0056f113() { /* start_multiplayer_game */ }
function FUN_00589ef8() { /* show_error_dialog */ }
function FUN_0058878e() { /* diplomacy_response */ }
function FUN_00594d42() { /* process_combat */ }
function FUN_0059511c() { /* process_unit_command */ }
function FUN_0059b571() { /* process_turn_data */ }
function FUN_0059b7fc() { /* process_join_request */ }
function FUN_0059b96a() { /* disconnect_player */ }
function FUN_0059c575() { /* process_battle_result */ }
function FUN_0059db08() { /* allocate_buffer */ }
function FUN_0059db65() { /* free_buffer */ }
function FUN_0059ec88() { /* show_scenario_dialog */ }
function FUN_005683c5() { /* draw_popup_frame */ }
function FUN_005802fd() { /* play_combat_anim */ }
function FUN_0057940d() { /* set_game_speed */ }
function FUN_0057ed3f() { /* draw_explosion */ }
function FUN_0057f657() { /* draw_nuke */ }
function FUN_004823d6() { /* parse_message_params */ }
function FUN_0048308f() { /* init_event_system */ }
function FUN_0048de75() { /* process_sync */ }
function FUN_005baec8() { /* set_font */ }
function FUN_005baeb0() { /* set_draw_surface */ }
function FUN_005baee0() { /* set_text_style */ }
function FUN_005baf57() { /* draw_text_at */ }
function debug_log() { /* console.log equivalent */ }

// Win32 API stubs — no-ops
function XD_InFlushSendBuffer() { return 0; }
function XD_FlushSendBuffer() { return 0; }
function FID_conflict__memcpy(dst, src, len) { /* memcpy — no-op stub */ }
function FID_conflict___expand(ptr, size) { return ptr; }
function operator_new(size) { return {}; }
function operator_delete(ptr) { /* free — no-op */ }

// City window stubs
function FUN_00471dd8_stub() { }
function thunk_map_window_click() { }
function thunk_map_double_click() { }
function thunk_map_key() { }
function thunk_map_ascii() { }
function thunk_city_mouse() { }
function thunk_city_button_buy() { }
function thunk_city_button_change() { }
function thunk_city_button_view() { }
function thunk_city_button_rename() { }
function thunk_citywin_9429() { }
function thunk_citywin_C494() { }
function thunk_citywin_C679() { }
function thunk_citywin_C449() { }
function thunk_parse_save_block() { }
function thunk_create_city() { return -1; }
function thunk_delete_city() { }
function thunk_new_civ() { return 0; }
function thunk_kill_civ() { return 0; }
function thunk_pick_up_unit_005b319e() { }

// DAT_0066ca8c declared above in globals section
