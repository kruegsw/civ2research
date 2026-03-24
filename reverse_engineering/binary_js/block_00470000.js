// ═══════════════════════════════════════════════════════════════════
// block_00470000.js — Mechanical transpilation of block_00470000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00470000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00470000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8, s16, u16, s32, w32 } from './mem.js';

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
let DAT_0064bcfa = new Uint8Array(8 * 0xf2); // per-civ name strings, stride 0xf2
let DAT_0064bd12 = new Uint8Array(8 * 0xf2); // per-civ leader strings, stride 0xf2
let DAT_0064bd2a = new Uint8Array(8 * 0xf2); // per-civ tribe strings, stride 0xf2
let DAT_0064c488 = new Uint8Array(0x218);
let DAT_0064c600 = new Uint8Array(8 * 0x594);
let DAT_0064c6a0 = new Uint8Array(8 * 0x594);
let DAT_0064c6a2 = new Int32Array(8 * 0x594);
let DAT_0064c6a6 = new Int16Array(8 * (0x594 / 2)); // 8 civs * stride 0x2CA (0x594 bytes / 2 bytes-per-int16)
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
let DAT_0064f394 = new Int32Array(128 * 22); // 128 cities * stride 22 (0x58 bytes / 4 bytes-per-int32)
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
let DAT_006554f8 = new Uint8Array(1024);
let DAT_006554fb = new Uint8Array(256);
let DAT_006554fc = new Uint8Array(1024);
let DAT_006554fd = new Uint8Array(256);
let DAT_00655502 = new Int16Array(512);
let DAT_00655504 = new Int16Array(512);
let DAT_00655506 = new Int16Array(512);
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
let DAT_00656106 = new Int16Array(2048 * 16);
let DAT_00656108 = new Int16Array(2048 * 16);
let DAT_0065610a = new Int32Array(2048 * 8); // 2048 units * stride 8 (0x20 bytes / 4 bytes-per-int32)
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
let DAT_0066ca84 = new Int16Array(4096); // 8 views * stride 0x3f0/2 = 4032 elements needed
let DAT_0066ca86 = new Int16Array(4096);
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
  // DEVIATION: SEH/operator_new(0x137c)/class initialization — UI framework
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
  // DEVIATION: MFC class constructor chain — returns in_ECX in original
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
  // DEVIATION: Opens loser.avi and civ2art.dll, calls OpenFile, FUN_005c5fc4,
  // FUN_005bf5e1, FUN_005dd27e, FUN_005dd71e, FUN_005dd377, SetRect, etc.
  // Pure Win32 file/video/UI loading — returns 0 (failure) as no video subsystem
  return 0;
}

// FUN_004708db — play_loser_video_sequence
export function FUN_004708db() {
  // DEVIATION: Plays loser video with ARCHAEOLOGISTS text overlays
  // Win32 rendering: FUN_0046e571, FUN_005c19ad, FUN_005c1167, OffsetRect, etc.
}

// FUN_00470c0c — empty function (C returns void, body is just return)
export function FUN_00470c0c() { }

// FUN_00470c1c — display_archaeologists3_text
export function FUN_00470c1c() {
  // DEVIATION: Reads ARCHAEOLOGISTS3 section from game text, draws with FUN_005c19ad/FUN_005c1167
  // Win32 CharUpperA, FUN_004086c0, FUN_005683c5, FUN_0046e287 calls
}

// FUN_00471020 — delete_video_class
export function FUN_00471020(param_1) {
  FUN_004704ec();
  // operator_delete — no-op in JS
}

// Source: decompiled/block_00470000.c GetActiveView (30 bytes)
// GetActiveView @ 0x00471070 — MFC library function
export function GetActiveView_00471070() {
  // DEVIATION: MFC — CRichEditCntrItem::GetActiveView returns CRichEditView*
  return null;
}

// Source: decompiled/block_00470000.c GetActiveView (30 bytes)
// GetActiveView @ 0x004710A0 — MFC library function (duplicate)
export function GetActiveView_004710A0() {
  // DEVIATION: MFC — CRichEditCntrItem::GetActiveView returns CRichEditView*
  return null;
}

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

// Source: decompiled/block_00470000.c FUN_00471517 (36 bytes)
// FUN_00471517 — destructor_timevec
export function FUN_00471517() {
  // _Timevec::~_Timevec(*(EBP-0x10) + 0xf14); // DEVIATION: C++ destructor
}

// FUN_00471526 — call_FUN_005dd1a0
export function FUN_00471526() { FUN_005dd1a0(); }

// FUN_00471535 — call_FUN_005c656b
export function FUN_00471535() { FUN_005c656b(); }

// FUN_00471544 — call_thunk_0044ca60
export function FUN_00471544() { FUN_0044ca60(); }

// Source: decompiled/block_00470000.c FUN_00471557 (14 bytes)
// FUN_00471557 — seh_epilog
export function FUN_00471557() {
  // DEVIATION: SEH — FS_OFFSET restore
}

// Source: decompiled/block_00470000.c load_civ2_art_00471565 (753 bytes)
// load_civ2_art_00471565 — load_centauri_video_art
export function load_civ2_art_00471565(param_1) {
  let in_ECX = DAT_0062b87c;
  if (param_1 < 1) {
    // in_ECX + 0xf18 = -param_1 + 1  (abs)
  } else {
    // in_ECX + 0xf18 = param_1
  }
  // DEVIATION: Win32 — FUN_005bcaa7(&local_98) screen dimensions query
  // DEVIATION: Win32 — FUN_00564470(s_civ2_civ2_exe_0062b894) change directory
  // DEVIATION: File I/O — FUN_004aef20(local_84) clear string
  // DEVIATION: File I/O — FUN_0043c840(local_84, s_civ2_video_winwin_avi_0062b8a4) build path
  // DEVIATION: File I/O — iVar1 = FUN_00564713(local_84) file_exists check
  let iVar1 = 0; // file won't exist in JS context
  if (iVar1 === 0) {
    return 0;
  }
  // DEVIATION: File I/O — FUN_004aef20(local_118) clear string
  // DEVIATION: File I/O — FUN_0043c840(local_118, s_civ2_civ2art_dll_0062b8bc) build path
  // DEVIATION: File I/O — iVar1 = FUN_00564713(local_118) file_exists check
  iVar1 = 0;
  if (iVar1 === 0) {
    return 0;
  }
  // DEVIATION: Win32 — FUN_004502e0(local_118) load DLL resources
  // DEVIATION: Win32 — FUN_005c5fc4(&DAT_0062b8d0, 0x800, local_98, local_94, local_90 - local_98, (local_8c - local_94) + 5, &DAT_006a8c00, &DAT_006553d8) create surface
  // DEVIATION: Win32 — FUN_00419ba0(0) set palette
  // DEVIATION: Win32 — FUN_005bf5e1(2000, 10, 0xec, in_ECX + 0xb8) timer setup
  // DEVIATION: Win32 — FUN_005dd27e(&DAT_0062b8d4, 0x800, 0, 0) video buffer init
  // DEVIATION: Win32 — FUN_005dd71e(1) video play
  // DEVIATION: File I/O — local_88 = FUN_005dd377(local_84) video open
  let local_88 = -1; // assume video open fails in JS
  if (local_88 === 0) {
    // DEVIATION: Win32 — FUN_005c041f(0) DC setup
    // DEVIATION: Win32 — FUN_00450400() create window
    // DEVIATION: Win32 — CPropertySheet::EnableStackedTabs(in_ECX + 0x4ec, 0x4031c0)
    // DEVIATION: Win32 — FUN_00472910(&LAB_00401d43, 0x2ab) set dialog params
    // DEVIATION: Win32 — SetRect(in_ECX + 0x136c, 2, 100, 0x27e, 0x1e0)
    // DEVIATION: Win32 — FUN_005bd65c(pCVar4, pCVar3) bitmap resize
    // DEVIATION: Win32 — FUN_005dd64c(in_ECX + 0x1324, 0, 0) video position
    // DEVIATION: Win32 — FUN_0043c6c0(0, 0x12, 3) set font
    // DEVIATION: Win32 — FUN_00450340() show window
    return 1;
  } else {
    if (local_88 === -0x7ffbfeac) {
      // DEVIATION: Win32 — FUN_00421ea0(s_VFWNOTREGISTERED_0062b8d8) show dialog
    }
    return 0;
  }
}

// Source: decompiled/block_00470000.c FUN_00471856 (936 bytes)
// FUN_00471856 — play_centauri_video_sequence
export function FUN_00471856() {
  let in_ECX = DAT_0062b87c;
  // DEVIATION: Win32 — FUN_00408650() restore_dc
  // DEVIATION: Win32 — FUN_00419b80() flip_surfaces
  // DEVIATION: Win32 — FUN_00450390(in_ECX + 0xb8) set_background
  // DEVIATION: Win32 — FUN_004085f0() save_dc
  // DEVIATION: Win32 — FUN_00419b80() flip_surfaces
  // DEVIATION: Win32 — FUN_00414ce0() lock_screen
  // DEVIATION: Win32 — FUN_005c19ad(0xff) set text color
  // DEVIATION: Win32 — FUN_004aef20(in_ECX + 0xf24) clear string
  // DEVIATION: Win32 — FUN_0040bbb0() begin_format_string
  // DEVIATION: Win32 — FUN_00421f10(DAT_0064caa4[in_ECX_0xf18 * 0x594]) format year
  // DEVIATION: Win32 — FUN_0040ff60(0, &DAT_00679640) set_format_string
  // DEVIATION: Win32 — FUN_0040bbb0() begin_format_string
  // DEVIATION: Win32 — FUN_0040ff30(DAT_0064caa6[in_ECX_0xf18 * 0x594]) set_format_int (population)
  // DEVIATION: Win32 — FUN_0040bbe0(s_0_000_0062b8ec) append_section_name
  // DEVIATION: Win32 — FUN_0040ff60(1, &DAT_00679640) set_format_string
  // DEVIATION: Win32 — FUN_00410070(in_ECX_0xf18) get_government_name
  // DEVIATION: Win32 — FUN_0040ff60(2, uVar1) set_format_string
  // DEVIATION: Win32 — FUN_0040bbb0() begin_format_string
  // DEVIATION: Win32 — FUN_00421f10(DAT_0064caa2[in_ECX_0xf18 * 0x594]) format year
  // DEVIATION: Win32 — FUN_0040ff60(3, &DAT_00679640) set_format_string
  // DEVIATION: Win32 — FUN_00493b10(in_ECX_0xf18) get_leader_name
  // DEVIATION: Win32 — FUN_0040ff60(4, uVar1) set_format_string
  for (let local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
    // DEVIATION: Win32 — FUN_004aef20(in_ECX + 0xf24) clear string
    // DEVIATION: Win32 — FUN_0040bbb0() begin_format_string
    // DEVIATION: Win32 — FUN_0040bbe0(s_CENTAURI_0062b8f4) append section name
    // DEVIATION: Win32 — FUN_0040ff30(local_8) set_format_int
    let iVar2 = FUN_004a2379(DAT_006558e8, DAT_00679640);
    if (iVar2 === 0) {
      // DEVIATION: Win32 — text loop: FUN_004a23fc(1), FUN_0043c840 for each line until '@'
      // DEVIATION: Win32 — FUN_0040bbb0() begin_format_string
      // DEVIATION: Win32 — FUN_00426ff0(in_ECX + 0xf24, &DAT_00679640) format string
      // DEVIATION: Win32 — FUN_005c0593(in_ECX + 0x4ec, in_ECX + 0x136c, in_ECX + 0x136c) rect copy
      // DEVIATION: Win32 — OffsetRect(in_ECX + 0x136c, 1, 1)
      // DEVIATION: Win32 — FUN_005c19ad(0) set text color black
      // DEVIATION: Win32 — FUN_005c1167(in_ECX + 0xf1c, &DAT_00679640, in_ECX + 0x136c, 0) draw text
      // DEVIATION: Win32 — OffsetRect(in_ECX + 0x136c, -1, -1)
      // DEVIATION: Win32 — FUN_005c19ad(0xf1) set text color white
      // DEVIATION: Win32 — FUN_005c1167(in_ECX + 0xf1c, &DAT_00679640, in_ECX + 0x136c, 0) draw text
      // DEVIATION: Win32 — FUN_005683c5(in_ECX + 0x4ec, in_ECX + 0x136c, 4, 5) draw popup frame
      FUN_004a2020();
      FUN_0046e287(0x168);
    }
  }
  // DEVIATION: Win32 — FUN_005dd3c2() video close
  if (2 < DAT_00655b02) {
    // DEVIATION: Win32 — CPropertySheet::EnableStackedTabs(in_ECX + 0x534, 0x403585)
  }
  // DEVIATION: Win32 — FUN_005c61b0() surface release
  // DEVIATION: Win32 — CPropertySheet::EnableStackedTabs(in_ECX + 0x534, 0)
  // DEVIATION: Win32 — FUN_00414d40() unlock_screen
  // DEVIATION: Win32 — FUN_004503d0() hide_window
  // DEVIATION: Win32 — FUN_00419b80() flip_surfaces
  // DEVIATION: Win32 — FUN_004503d0() hide_window
  // DEVIATION: Win32 — FUN_00450390(&DAT_006a8c00) set_background
  // DEVIATION: Win32 — FUN_00419b80() flip_surfaces
}

// FUN_00471bfe — empty function (C returns void, body is just return)
export function FUN_00471bfe() { }

// FUN_00471c14 — empty function (C returns void, body is just return)
export function FUN_00471c14() { }

// Source: decompiled/block_00470000.c FUN_00471c2a (397 bytes)
// FUN_00471c2a — display_centauri3_credits
export function FUN_00471c2a() {
  // *(DAT_0062b87c + 0xa98) = 0;  // DEVIATION: class instance state
  // DEVIATION: Win32 — FUN_004aef20(DAT_0062b87c + 0xf24) clear string
  // DEVIATION: Win32 — FUN_0040bbb0() begin_format_string
  let iVar1 = FUN_004a2379(DAT_006558e8, s_CENTAURI3_0062b904);
  if (iVar1 === 0) {
    let local_1c = 0xc;
    // DEVIATION: Win32 — FUN_005baec8(DAT_0062b87c + 0xf1c) set_font
    // DEVIATION: Win32 — FUN_005baeb0(DAT_0062b87c + 0x4ec) set_draw_surface
    // DEVIATION: Win32 — FUN_005baee0(0xff, 0, 1, 1) set_text_style
    let done = false;
    while (!done) {
      let pcVar2 = FUN_004a23fc(1);
      if (pcVar2 === '@' || (typeof pcVar2 === 'string' && pcVar2.charAt(0) === '@')) {
        done = true;
        break;
      }
      // DEVIATION: Win32 — FUN_004aef20(DAT_0062b87c + 0xf24) clear string
      // DEVIATION: Win32 — FUN_0043c840(DAT_0062b87c + 0xf24, DAT_00673f14) append line
      // DEVIATION: Win32 — FUN_00426ff0(DAT_0062b87c + 0xf24, &DAT_00679640) format string
      // DEVIATION: Win32 — FUN_00407f90(DAT_0062b87c + 0x136c) get_rect_x
      // DEVIATION: Win32 — FUN_0043c910(&DAT_00679640, *(DAT_0062b87c + 0x136c), local_1c, uVar3) draw_text_ex
      // DEVIATION: Win32 — _Timevec::~_Timevec destructor call returns text height in extraout_EAX
      let extraout_EAX = 16; // typical text line height
      local_1c = local_1c + extraout_EAX;
    }
    // DEVIATION: Win32 — local_14 = *(DAT_0062b87c + 0x136c)
    // DEVIATION: Win32 — local_c = *(DAT_0062b87c + 0x1374)
    // DEVIATION: Win32 — local_10 = 0xc
    // DEVIATION: Win32 — local_8 = local_1c
    // DEVIATION: Win32 — FUN_005683c5(DAT_0062b87c + 0x4ec, &local_14, 4, 5) draw popup frame
    FUN_004a2020();
  }
}

// Source: decompiled/block_00470000.c FUN_00471db7 (30 bytes)
// FUN_00471db7 — invalidate_object_cache
export function FUN_00471db7() {
  // CRichEditDoc::InvalidateObjectCache(DAT_0062b87c + 0x534); // DEVIATION: MFC
}

// load_civ2_art_00471dd8 — load_beaten_video
export function load_civ2_art_00471dd8(param_1) {
  // DEVIATION: Loads civ2art.dll, creates off-screen surface, plays CENTAURI_BEATEN text
  // Win32: FUN_005c5fc4, FUN_005bb3f0, FUN_005bf5e1, FUN_005c19ad, FUN_005c1167, etc.
}

// FUN_00472393 — call_thunk_0043c520
export function FUN_00472393() { FUN_0043c520(); }

// FUN_0047239f — call_FUN_005bd915
export function FUN_0047239f() { FUN_005bd915(); }

// FUN_004723ab — call_FUN_005c656b
export function FUN_004723ab() { FUN_005c656b(); }

// FUN_004723b7 — call_thunk_0044ca60
export function FUN_004723b7() { FUN_0044ca60(); }

// Source: decompiled/block_00470000.c FUN_004723c3 (30 bytes)
// FUN_004723c3 — destructor_timevec
export function FUN_004723c3() {
  // _Timevec::~_Timevec(EBP-0x4d4); // DEVIATION: C++ destructor
}

// FUN_004723cf — call_thunk_0044cba0
export function FUN_004723cf() { FUN_0044cba0(); }

// Source: decompiled/block_00470000.c FUN_004723e5 (14 bytes)
// FUN_004723e5 — seh_epilog
export function FUN_004723e5() {
  // DEVIATION: SEH — FS_OFFSET restore
}

// FUN_004728c0 — delete_centauri_class
export function FUN_004728c0(param_1) {
  FUN_0047147a();
  // operator_delete — no-op in JS
}

// FUN_00472910 — set_dialog_params
export function FUN_00472910(param_1, param_2) {
  // DEVIATION: Sets in_ECX+0x118 = param_1 and in_ECX+0xa20 = param_2 (class instance state)
}

// FUN_00472950 — append_extension_to_filename
export function FUN_00472950(param_1, param_2) {
  // DEVIATION: _strrchr(param_1, '.'), if no dot: strcat(".", param_2), __strupr
}

// FUN_004729ab — copy_and_replace_extension
export function FUN_004729ab(param_1, param_2, param_3) {
  // DEVIATION: strcpy(param_1, param_2), _strrchr for '.', truncate, strcat(".", param_3), __strupr
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
  // DEVIATION: Pure rendering function — draws a number at a tile position
  // C: checks FUN_0047c3e0, calls FUN_0047a6b0 for screen coords,
  //    FUN_00472cf0 for scaling, __itoa for number formatting,
  //    FUN_005c19ad/FUN_005c1020/FUN_0043c790/FUN_00408490 for drawing
  let iVar1 = FUN_0047c3e0(param_1, param_2);
  if (iVar1 !== 0) {
    let local_6c = { v: 0 };
    let local_68 = { v: 0 };
    FUN_0047a6b0(local_68, local_6c, param_1, param_2);
    let uVar2 = FUN_00472cf0(0x40, DAT_0066ca8c);
    let uVar3 = FUN_00472cf0(0x20, DAT_0066ca8c);
    // DEVIATION: itoa(param_3, local_64, 10) + text drawing calls omitted
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
// C: *param_2 = (short)*param_1; param_2[2] = (short)param_1[2]; etc.
export function FUN_0047314e(param_1, param_2) {
  // param_1 is pointer to 4 int32s, param_2 is pointer to 4 int16s
  // In our JS model these are passed as typed array references
  param_2[0] = (param_1[0] << 16 >> 16);   // sign-extend to short
  param_2[2] = (param_1[2] << 16 >> 16);
  param_2[1] = (param_1[1] << 16 >> 16);
  param_2[3] = (param_1[3] << 16 >> 16);
}

// Helper for array-based version with offsets
function FUN_0047314e_arr(src, srcOff, dst, dstOff) {
  dst[dstOff + 0] = (src[srcOff + 0] << 16 >> 16);
  dst[dstOff + 2] = (src[srcOff + 2] << 16 >> 16);
  dst[dstOff + 1] = (src[srcOff + 1] << 16 >> 16);
  dst[dstOff + 3] = (src[srcOff + 3] << 16 >> 16);
}

// FUN_00473190 — copy_4_shorts_to_4_ints
// C: *param_2 = (int)*param_1; param_2[2] = (int)param_1[2]; etc.
export function FUN_00473190(param_1, param_2) {
  param_2[0] = param_1[0];
  param_2[2] = param_1[2];
  param_2[1] = param_1[1];
  param_2[3] = param_1[3];
}

function FUN_00473190_arr(src, srcOff, dst, dstOff) {
  dst[dstOff + 0] = src[srcOff + 0];
  dst[dstOff + 2] = src[srcOff + 2];
  dst[dstOff + 1] = src[srcOff + 1];
  dst[dstOff + 3] = src[srcOff + 3];
}

// show_open_dialog_31D2 — show_file_dialog
export function show_open_dialog_31D2(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 GetOpenFileNameA/GetSaveFileNameA + CommDlgExtendedError
  return false;
}

// FUN_004732a6 — read_unit_and_city_data
export function FUN_004732a6(param_1, param_2) {
  if (param_1 < 0x2a) {
    if (param_1 === 0x29) {
      for (let local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
        // DEVIATION: File I/O — _fread(&DAT_006560f0 + local_8 * 0x20, 0x1e, 1, param_2)
      }
      if (DAT_00655b18 !== 0) {
        // DEVIATION: File I/O — _fread(&DAT_0064f340, DAT_00655b18 * 0x58, 1, param_2)
      }
      for (let local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
        if (DAT_0065610a[local_8 * 8] !== 0) {
          DAT_0065610a[local_8 * 8] = DAT_00627fd8;
          DAT_00627fd8 = DAT_00627fd8 + 1;
        }
      }
      for (let local_8 = 0; local_8 < DAT_00655b18; local_8 = local_8 + 1) {
        if (s32(DAT_0064f394, local_8 * 0x58) !== 0) {
          w32(DAT_0064f394, local_8 * 0x58, DAT_00627fdc);
          DAT_00627fdc = DAT_00627fdc + 1;
        }
      }
    } else {
      for (let local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
        // DEVIATION: File I/O — _fread(&DAT_006560f0 + local_8 * 0x20, 0x1a, 1, param_2)
      }
      for (let local_8 = 0; local_8 < DAT_00655b18; local_8 = local_8 + 1) {
        // DEVIATION: File I/O — _fread(&DAT_0064f340 + local_8 * 0x58, 0x54, 1, param_2)
      }
      for (let local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
        DAT_0065610a[local_8 * 8] = DAT_00627fd8;
        DAT_00627fd8 = DAT_00627fd8 + 1;
      }
      for (let local_8 = 0; local_8 < DAT_00655b18; local_8 = local_8 + 1) {
        w32(DAT_0064f394, local_8 * 0x58, DAT_00627fdc);
        DAT_00627fdc = DAT_00627fdc + 1;
      }
    }
  } else {
    if (DAT_00655b16 !== 0) {
      // DEVIATION: File I/O — _fread(&DAT_006560f0, DAT_00655b16 << 5, 1, param_2)
    }
    if (DAT_00655b18 !== 0) {
      // DEVIATION: File I/O — _fread(&DAT_0064f340, DAT_00655b18 * 0x58, 1, param_2)
    }
    for (let local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
      if (DAT_0065610a[local_8 * 8] !== 0) {
        DAT_0065610a[local_8 * 8] = DAT_00627fd8;
        DAT_00627fd8 = DAT_00627fd8 + 1;
      }
    }
    for (let local_8 = 0; local_8 < DAT_00655b18; local_8 = local_8 + 1) {
      if (s32(DAT_0064f394, local_8 * 0x58) !== 0) {
        w32(DAT_0064f394, local_8 * 0x58, DAT_00627fdc);
        DAT_00627fdc = DAT_00627fdc + 1;
      }
    }
  }
  return 1;
}

// load_game_file — load_game_state_from_file
export function load_game_file(param_1, param_2) {
  if (param_1 < 0x28) {
    if ((param_1 !== 0x26) && (param_1 !== 0x27)) {
      return 0;
    }
    // Zero out per-civ diplomacy arrays
    for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
      for (let local_10 = 0; local_10 < 0x3e; local_10 = local_10 + 1) {
        DAT_0064c778[local_c * 0x594 + local_10] = 0;
        DAT_0064c7b6[local_c * 0x594 + local_10] = 0;
        DAT_0064c7f4[local_c * 0x594 + local_10] = 0;
      }
    }
    // Zero out per-tech ownership arrays
    for (let local_10 = 0; local_10 < 100; local_10 = local_10 + 1) {
      DAT_00655b1e[local_10] = 0;
      DAT_00655b82[local_10] = 0;
      for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
        DAT_0064c714[local_c * 0x594 + local_10] = 0;
      }
    }
    // Zero out per-civ government arrays
    for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
      for (let local_10 = 0; local_10 < 0xd; local_10 = local_10 + 1) {
        DAT_0064c6f8[local_c * 0x594 + local_10] = 0;
      }
    }
    // DEVIATION: File I/O — _fread(&DAT_00655ae8, 0x36, 1, param_2) game header (short format)
    // DEVIATION: File I/O — _fread(&DAT_00655b1e, 0x5d, 1, param_2) tech ownership
    // DEVIATION: File I/O — _fread(&DAT_00655b82, 0x5d, 1, param_2) tech discovery mask
    // DEVIATION: File I/O — _fread(&DAT_00655be6, 0x4c, 1, param_2) event flags
    let iVar2 = FUN_005ae006(DAT_00655b0a);
    let local_14 = iVar2 - 1;
    if ((DAT_00655b0a & 1) !== 0) {
      local_14 = iVar2 - 2;
    }
    if (DAT_00655b0d !== local_14) {
      FUN_005d22b7("load_gpk: Fixing up game enemies", DAT_00655b0d, DAT_00655b0a);
      DAT_00655b0d = local_14 & 0xff;
    }
    // DEVIATION: File I/O — _fread(&DAT_0064bcf8, 0x790, 1, param_2) tech data
    for (let local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
      // DEVIATION: File I/O — _fread(&DAT_0064c6a0 + local_10 * 0x594, 0x58, 1, param_2) civ header
      // DEVIATION: File I/O — _fread(&DAT_0064c6f8 + local_10 * 0x594, 0xc, 1, param_2) government data
      // DEVIATION: File I/O — _fread(&DAT_0064c706 + local_10 * 0x594, 0xe, 1, param_2) diplomacy data
      // DEVIATION: File I/O — _fread(&DAT_0064c714 + local_10 * 0x594, 0x5d, 1, param_2) tech known
      // DEVIATION: File I/O — _fread(&DAT_0064c778 + local_10 * 0x594, 0x36, 1, param_2) unit type counts
      // DEVIATION: File I/O — _fread(&DAT_0064c7b6 + local_10 * 0x594, 0x36, 1, param_2) improvement counts
      // DEVIATION: File I/O — _fread(&DAT_0064c7f4 + local_10 * 0x594, 0x36, 1, param_2) building counts
      // DEVIATION: File I/O — _fread(local_8, 1, 1, param_2) padding byte
      // DEVIATION: File I/O — _fread(&DAT_0064c832 + local_10 * 0x594, 0x402, 1, param_2) contact/treaty data
    }
  } else {
    // Version >= 0x28: single bulk read for game header + tech ownership
    // DEVIATION: File I/O — _fread(&DAT_00655ae8, 0x14a, 1, param_2) game header (full format)
    let iVar2 = FUN_005ae006(DAT_00655b0a);
    let local_14 = iVar2 - 1;
    if ((DAT_00655b0a & 1) !== 0) {
      local_14 = iVar2 - 2;
    }
    if (DAT_00655b0d !== local_14) {
      FUN_005d22b7("load_gpk: Fixing up game enemies", DAT_00655b0d, DAT_00655b0a);
      DAT_00655b0d = local_14 & 0xff;
    }
    // DEVIATION: File I/O — _fread(&DAT_0064bcf8, 0x790, 1, param_2) tech data
    // DEVIATION: File I/O — _fread(&DAT_0064c6a0, 0x2ca0, 1, param_2) all civ data (8 * 0x594)
  }
  return 1;
}

// FUN_00473c12 — write_null_terminated_string
export function FUN_00473c12(param_1, param_2) {
  // DEVIATION: fputs(param_1, param_2) + fputc(0, param_2) — file I/O helper
  return 0;
}

// FUN_00473c68 — read_null_terminated_string
export function FUN_00473c68(param_1) {
  // DEVIATION: Reads null-terminated string from file via _fgetc loop,
  // allocates buffer via FUN_00498159, copies with FUN_005f22d0
  return 0;
}

// Source: decompiled/block_00470000.c FUN_00473d5e (247 bytes)
// FUN_00473d5e — set_save_extension_by_gametype
export function FUN_00473d5e(param_1) {
  if (param_1 === 0) {
    if (DAT_00655b02 === 0) {
      FUN_005f22d0(DAT_0066c4e8, ".sav"); // C: DAT_0062ba40
    } else if (DAT_00655b02 === 1) {
      FUN_005f22d0(DAT_0066c4e8, ".hot"); // C: DAT_0062ba48
    } else if (DAT_00655b02 === 2) {
      FUN_005f22d0(DAT_0066c4e8, ".eml"); // C: DAT_0062ba50
    } else if (DAT_00655b02 === 3 || DAT_00655b02 === 4 || DAT_00655b02 === 5 || DAT_00655b02 === 6) {
      FUN_005f22d0(DAT_0066c4e8, ".net"); // C: DAT_0062ba58
    }
  } else {
    FUN_005f22d0(DAT_0066c4e8, ".scn"); // C: DAT_0062ba38
  }
}

// FUN_00473e55 — build_file_filter_string
export function FUN_00473e55(param_1, param_2, param_3) {
  // DEVIATION: Builds file filter string for Win32 open/save dialog
  // Uses FUN_00473ff2 to append .sav/.hot/.eml/.net/.scn/.mp filter entries
  return DAT_0066c4f8;
}

// FUN_00473ff2 — append_file_filter_entry
export function FUN_00473ff2(param_1, param_2) {
  // DEVIATION: Appends file filter entry based on param_1 (0=.sav, 1=.hot, 2=.eml, 3-6=.net)
  // Uses FUN_004af14b for string resource and FUN_005f22e0 for strcat
  return null;
}

// Source: decompiled/block_00470000.c FUN_004741be (4499 bytes)
// FUN_004741be — save_game_to_file
export function FUN_004741be(param_1, param_2) {
  let local_118 = 1;
  let local_114;
  if (DAT_00655b02 === 1) {
    local_114 = DAT_00655b0b;
    DAT_00655b0b = DAT_006c31a9;
  }
  FUN_00473d5e(param_2);
  // DEVIATION: File I/O — FUN_005f22d0(local_108, param_1) strcpy
  // DEVIATION: File I/O — pcVar1 = _strchr(local_108, 0x2e)
  // DEVIATION: File I/O — if (pcVar1 == null) FUN_005f22e0(local_108, &DAT_0066c4e8) append extension
  // DEVIATION: File I/O — local_11c = _fopen(local_108, &DAT_0062bad4) open file for write
  // NOTE: File I/O skipped in JS, but state mutations below must still execute.
  // DEVIATION: File I/O — FUN_00497e0f(PTR_s_CIVILIZE_0062b990, local_11c) write file header
  DAT_00655b04 = DAT_006d1da0 & 0xff;
  // DEVIATION: File I/O — local_110[0] = 0x2c; _fwrite(local_110, 2, 1, local_11c) write version
  if (param_2 === 0) {
    DAT_00655af0 = DAT_00655af0 & 0xffbf;
  } else {
    DAT_00655af0 = DAT_00655af0 | 0x40;
    for (let local_124 = 0; local_124 < 100; local_124 = local_124 + 1) {
      DAT_00655b82[local_124] = 0;
      for (let local_128 = 1; local_128 < 8; local_128 = local_128 + 1) {
        let iVar3 = FUN_004bd9f0(local_128, local_124);
        if (iVar3 !== 0) {
          DAT_00655b82[local_124] = DAT_00655b82[local_124] | (1 << (local_128 & 0x1f));
        }
      }
      if (DAT_00655b82[local_124] !== 0) {
        let iVar3 = FUN_005ae006(s8(DAT_00655b82[local_124]));
        if (iVar3 === 1) {
          for (let local_128 = 1; local_128 < 8; local_128 = local_128 + 1) {
            let iVar3_inner = FUN_004bd9f0(local_128, local_124);
            if (iVar3_inner !== 0) {
              DAT_00655b1e[local_124] = local_128 & 0xff;
            }
          }
        } else {
          DAT_00655b1e[local_124] = 8;
        }
      }
    }
    for (let local_128 = 1; local_128 < 8; local_128 = local_128 + 1) {
      // DAT_0064c6a0[local_128 * 0x594] &= 0xff96 — clear certain civ flags
      let val = u16(DAT_0064c6a0[local_128 * 0x594], DAT_0064c6a0[local_128 * 0x594 + 1]);
      val = val & 0xff96;
      DAT_0064c6a0[local_128 * 0x594] = val & 0xff;
      DAT_0064c6a0[local_128 * 0x594 + 1] = (val >> 8) & 0xff;
    }
  }
  if ((param_2 !== 0) || ((DAT_00655af0 & 0x80) !== 0)) {
    for (let local_128 = 1; local_128 < 8; local_128 = local_128 + 1) {
      let civSlot = DAT_0064c6a6[local_128 * (0x594 / 2)];
      if (DAT_00655506[civSlot * 0x18] >= 0) {
        // FUN_004aef20 clears string, FUN_004af122 writes civ name by tech ID
        FUN_004aef20(DAT_0064bd2a.subarray(local_128 * 0xf2));
        FUN_004af122(DAT_0064bd2a.subarray(local_128 * 0xf2), DAT_00655506[civSlot * 0x18]);
      }
      if (DAT_00655504[civSlot * 0x18] >= 0) {
        FUN_004aef20(DAT_0064bd12.subarray(local_128 * 0xf2));
        FUN_004af122(DAT_0064bd12.subarray(local_128 * 0xf2), DAT_00655504[civSlot * 0x18]);
      }
      if (DAT_00655502[civSlot * 0x18] >= 0) {
        FUN_004aef20(DAT_0064bcfa.subarray(local_128 * 0xf2));
        FUN_004af122(DAT_0064bcfa.subarray(local_128 * 0xf2), DAT_00655502[civSlot * 0x18]);
      }
    }
  }
  // DEVIATION: File I/O — _fwrite(&DAT_00655ae8, 0x14a, 1, local_11c) game header
  // DEVIATION: File I/O — _fwrite(&DAT_0064bcf8, 0x790, 1, local_11c) tech data
  // DEVIATION: File I/O — _fwrite(&DAT_0064c6a0, 0x2ca0, 1, local_11c) civ data
  // DEVIATION: File I/O — FUN_005b8635(local_11c, 0) write map data
  // DEVIATION: File I/O — _fwrite(DAT_006365e0, DAT_006d116a * DAT_006d116c, 1, local_11c) visibility layer 1
  // DEVIATION: File I/O — _fwrite(DAT_006365e4, DAT_006d116a * DAT_006d116c, 1, local_11c) visibility layer 2
  // DEVIATION: File I/O — _fwrite(&DAT_00666130, 0x400, 1, local_11c) city names
  // DEVIATION: File I/O — _fwrite(&DAT_006560f0, DAT_00655b16 << 5, 1, local_11c) units
  // DEVIATION: File I/O — _fwrite(&DAT_0064f340, DAT_00655b18 * 0x58, 1, local_11c) cities
  // DEVIATION: File I/O — wonder data loop: _fwrite DAT_006554fb/fd/fc per wonder
  // DEVIATION: File I/O — _fwrite(&DAT_0064b1b4, 2, 1, local_11c) cursor x
  // DEVIATION: File I/O — _fwrite(&DAT_0064b1b0, 2, 1, local_11c) cursor y
  // DEVIATION: File I/O — transport data write (single or multi-player)
  if (DAT_00655b02 === 0) {
    // single player: write one transport block
    // DEVIATION: File I/O — _fwrite(&DAT_006554f8 + ... * 0x30, 0x30, 1, local_11c)
  } else {
    let local_128_saved = DAT_00655b03;
    for (let local_10c = 0; local_10c < 8; local_10c = local_10c + 1) {
      if ((1 << (local_10c & 0x1f) & DAT_00655b0b) !== 0) {
        DAT_00655b03 = local_10c;
        // DEVIATION: File I/O — _fwrite transport block per player
      }
    }
    DAT_00655b03 = local_128_saved;
  }
  // DEVIATION: File I/O — _fwrite(&DAT_00655c38, 0x4b0, 1, local_11c) replay data
  DAT_00655284 = DAT_006ab180;
  DAT_00655288 = DAT_006ab184;
  DAT_0065528c = DAT_006ab188;
  DAT_00655290 = DAT_006ab18c;
  FUN_00472f7b();
  // DEVIATION: File I/O — _fwrite(&DAT_0066c600, 0x6a, 1, local_11c) scroll params
  // DEVIATION: File I/O — per-view scroll data loop (8 views)
  // DEVIATION: File I/O — _fwrite(&DAT_0064bc60, 100, 1, local_11c) scenario data (if applicable)
  // DEVIATION: File I/O — _fwrite(&DAT_00655128, 0x152, 1, local_11c) wonder effects
  if (DAT_00655b02 !== 0) {
    let local_12c = DAT_00654fa4;
    DAT_00654fa4 = DAT_006ad578;
    // DEVIATION: File I/O — _fwrite(&DAT_00654b40, 0x494, 1, local_11c) MP state
    DAT_00654fa4 = local_12c;
  }
  if ((DAT_00627670 !== 0) && (param_2 === 0)) {
    // DEVIATION: File I/O — _fputs(&DAT_0062bad8, local_11c) event marker
    // DEVIATION: File I/O — count events, _fwrite count, _fwrite each event (0x1bc bytes)
    // DEVIATION: File I/O — write event strings via FUN_00473c12 for each event field
  }
  local_118 = 0;
  if (DAT_00655b02 === 1) {
    DAT_00655b0b = local_114;
  }
  // DEVIATION: File I/O — if (local_11c !== null) _fclose(local_11c)
  return local_118;
}

// FUN_0047543c — quick_load_verify
export function FUN_0047543c(param_1) {
  // DEVIATION: Opens file, reads CIVILIZE header via FUN_00497da0,
  // checks version range (< 0x26 → old, 0x26-0x2c → load, > 0x2c → too new)
  // Calls load_game_file + FUN_005b8783 for valid versions
  return 0;
}

// Source: decompiled/block_00470000.c FUN_00475666 (7734 bytes)
// FUN_00475666 — full_load_game
export function FUN_00475666(param_1) {
  let local_338 = 1;
  let local_110 = 0;
  let local_334 = DAT_00655b02;
  FUN_00473d5e(0);
  // DEVIATION: File I/O — FUN_005f22d0(local_218, param_1) strcpy
  // DEVIATION: File I/O — pcVar2 = _strchr(local_218, 0x2e); if null, append extension
  // DEVIATION: File I/O — _File = _fopen(local_218, &DAT_0062bae4) open for read
  // DEVIATION: File I/O — if (_File == null) goto LAB_00477352
  // DEVIATION: File I/O — iVar3 = FUN_00497da0(local_324, _File) read header
  // DEVIATION: File I/O — if (iVar3 == 0) goto LAB_00477352
  // DEVIATION: File I/O — iVar3 = _strcmp(PTR_s_CIVILIZE_0062b990, local_324) check magic
  // DEVIATION: File I/O — if (iVar3 != 0) { local_338 = 1; goto LAB_00477352; }
  // DEVIATION: File I/O — _fread(&local_32c, 2, 1, _File) read version
  let local_32c = 0x2c; // assume valid version for state logic
  if ((local_32c & 0xffff) > 0x2c) {
    local_338 = 4;
    // goto end
  } else if ((local_32c & 0xffff) < 0x26 || (local_32c & 0xffff) === 0x29 ||
             (local_32c & 0xffff) === 0x2a || (local_32c & 0xffff) === 0x2b) {
    local_338 = 2;
    // goto end
  } else {
    FUN_00484d52();
    // DEVIATION: File I/O — FUN_005f22d0(&DAT_0064bb08, param_1) save directory
    // DEVIATION: File I/O — local_10c = _strrchr(&DAT_0064bb08, 0x5c); *local_10c = '\0'; __chdir
    // DEVIATION: File I/O — check for GAME.TXT, set DAT_006558e8 path
    // DEVIATION: File I/O — extract filename to DAT_006ad6ae
    // DEVIATION: File I/O — path comparison logic for DAT_006ad7b2

    FUN_0041e864(1);
    local_338 = 3;
    FUN_00484d52();
    // DEVIATION: File I/O — iVar3 = load_game_file(local_32c & 0xffff, _File) read game state
    // if (iVar3 == 0) goto end;

    if (DAT_00655b02 !== 0) {
      DAT_00655aea = DAT_00655aea & 0xffff7fff;
    }
    let local_220;
    if (((DAT_00655af0 & 0x40) === 0) && ((DAT_00655af0 & 0x80) === 0)) {
      local_220 = 0;
    } else {
      local_220 = 1;
    }
    if (local_220 !== 0) {
      DAT_00655af0 = DAT_00655af0 | 0x80;
    }
    if ((DAT_00655af0 & 0x40) !== 0) {
      DAT_00655aea = DAT_00655aea & 0xffff7fff;
      DAT_00655b07 = 0;
      DAT_00655af0 = DAT_00655af0 & 0xffef;
    }
    DAT_00655af0 = DAT_00655af0 & 0xffbf;
    // DEVIATION: File I/O — FUN_005b8783(_File, 0) read map data
    // DEVIATION: File I/O — _fread(DAT_006365e0, DAT_006d116a * DAT_006d116c, 1, _File) visibility 1
    // DEVIATION: File I/O — _fread(DAT_006365e4, DAT_006d116a * DAT_006d116c, 1, _File) visibility 2
    FUN_00484d52();
    // DEVIATION: File I/O — _fread(&DAT_00666130, 0x400, 1, _File) city names
    // DEVIATION: File I/O — FUN_004732a6(local_32c & 0xffff, _File) read unit/city data
    // DEVIATION: File I/O — wonder data loop: _fread DAT_006554fb/fd/fc per wonder
    // DEVIATION: File I/O — _fread(&DAT_0064b1b4, 2, 1, _File) cursor x
    // DEVIATION: File I/O — _fread(&DAT_0064b1b0, 2, 1, _File) cursor y
    let cVar1 = DAT_00655b03;
    DAT_00655b03 = cVar1;

    // local_728 is a 0x30-byte-per-civ transport buffer on the C stack.
    // local_71c is at local_728 + 12 (as shorts), so local_71c[i] = short at local_728[12 + i*2].
    // For multiplayer, local_728 + civIdx * 0x30 is per-civ transport data,
    // and local_71c[civIdx * 0x18 + i] reads short at that civ's transport[12 + i*2].
    let local_728 = new Int16Array(21 * 0x18 + 6); // max civSlot (up to 21) * 0x18 shorts + offset 6
    // local_71c starts at short index 6 within each 0x18-short (0x30-byte) block
    // For single player: local_71c[i] = local_728[6 + i]
    // For multiplayer: local_71c[civIdx * 0x18 + i] = local_728[civIdx * 0x18 + 6 + i]
    if (DAT_00655b02 === 0) {
      // DEVIATION: File I/O — _fread(local_728, 0x30, 1, _File) single player transport
    } else {
      for (let local_21c = 0; DAT_00655b03 = cVar1, local_21c < 8; local_21c = local_21c + 1) {
        if ((1 << (local_21c & 0x1f) & DAT_00655b0b) !== 0) {
          DAT_00655b03 = local_21c;
          // DEVIATION: File I/O — _fread(local_728 + DAT_0064c6a6[local_21c * (0x594 / 2)] * 0x30, 0x30, 1, _File)
          DAT_00655b03 = cVar1;
        }
      }
    }
    // DEVIATION: File I/O — _fread(&DAT_00655c38, 0x4b0, 1, _File) replay data
    // DEVIATION: File I/O — _fread(&DAT_0066c600, 0x6a, 1, _File) scroll params
    FUN_00473064();
    FUN_00484d52();
    // DEVIATION: File I/O — per-view scroll data loop (8 views): _fread DAT_0066ca84..0066ca8c

    if ((local_220 === 0) && ((DAT_00655af0 & 0x80) === 0)) {
      FUN_00484cc0();
    } else {
      // DEVIATION: File I/O — _fread(&DAT_0064bc60, 100, 1, _File) scenario data
    }
    if (local_110 === 0) {
      // DEVIATION: File I/O — _fread(&DAT_00655128, 0x152, 1, _File) wonder effects
    } else {
      FUN_004a76f5();
    }
    DAT_006d1da0 = DAT_00655b04;
    if (((local_32c & 0xffff) < 0x29) || (DAT_00655b02 === 0)) {
      FUN_00498784();
      DAT_00654c74 = 1;
      DAT_00654c76 = DAT_00666548;
      DAT_00654c78 = DAT_0066654a;
      DAT_00654c7a = DAT_0066654c;
      DAT_00654fac = 0;
      DAT_00654fae = 0;
      DAT_0066654e = 0;
      DAT_00654fa4 = DAT_006d1da0 & 0xff;
      DAT_00628048 = DAT_006d1da0 & 0xff;
    } else {
      // DEVIATION: File I/O — _memset(&DAT_00654b40, 0, 0x494)
      // DEVIATION: File I/O — _fread(&DAT_00654b40, 0x494, 1, _File) MP state
      if (DAT_00654fa4 === 0) {
        DAT_00654fa4 = DAT_00655b05;
      }
      if (DAT_00654fa4 === 0) {
        for (let local_328 = 1; local_328 < 8; local_328 = local_328 + 1) {
          if ((1 << (local_328 & 0x1f) & DAT_00655b0a) !== 0) {
            DAT_00654fa4 = local_328;
            break;
          }
        }
      }
      DAT_00628048 = DAT_00654fa4;
      FUN_0049882b();
    }
    DAT_00627670 = 0;
    // DEVIATION: File I/O — _fread(local_114, 4, 1, _File) check for event marker
    // DEVIATION: File I/O — if event marker matches, read events:
    //   _fread(&local_328, 4, 1, _File) event count
    //   FUN_004fa5d9(50000) allocate event buffer
    //   for each event: FUN_004fa617() + _fread(_DstBuf, 0x1bc, 1, _File)
    //   for each event: FUN_00473c68(_File) to read string fields
    //   FUN_004cef35() init events
    //   DAT_00627670 = 1

    FUN_00484d52();
    FUN_00419ed3();

    // Fix up visibility/technology data — negate tech discovery to mark as "known"
    // local_71c references: local_71c[i] = local_728 short at index (6 + i)
    // where 6 = 12 bytes / 2 bytes-per-short (local_71c is at local_728 + 0xC)
    if ((local_220 === 0) && ((DAT_00655af0 & 0x80) === 0)) {
      if (DAT_00655b02 === 0) {
        // Single player: negate DAT_00655502 for current civ
        let civSlot = DAT_0064c6a6[cVar1 * (0x594 / 2)];
        DAT_00655502[civSlot * 0x18] = -DAT_00655502[civSlot * 0x18];
        // local_71c[0] = local_728[6], local_71c[1] = local_728[7]
        if (local_728[6] < 0) {
          DAT_00655504[civSlot * 0x18] = -DAT_00655504[civSlot * 0x18];
        }
        if (local_728[7] < 0) {
          DAT_00655506[civSlot * 0x18] = -DAT_00655506[civSlot * 0x18];
        }
        // DAT_0065550c negation loop: local_71c[local_738 + local_21c * 2 + 4]
        // = local_728[6 + local_738 + local_21c * 2 + 4] = local_728[10 + local_21c * 2 + local_738]
        // C byte offset: local_21c * 4 + civSlot * 0x30 + local_738 * 2
        // Int16Array element index: local_21c * 2 + civSlot * 0x18 + local_738
        for (let local_21c = 0; local_21c < 7; local_21c = local_21c + 1) {
          for (let local_738 = 0; local_738 < 2; local_738 = local_738 + 1) {
            if (local_728[6 + local_738 + local_21c * 2 + 4] < 0) {
              let elemIdx = local_21c * 2 + civSlot * 0x18 + local_738;
              DAT_0065550c[elemIdx] = -DAT_0065550c[elemIdx];
            }
          }
        }
      } else {
        // Multiplayer: negate per active player
        for (let local_748 = 0; DAT_00655b03 = cVar1, local_748 < 8; local_748 = local_748 + 1) {
          if ((1 << (local_748 & 0x1f) & DAT_00655b0b) !== 0) {
            DAT_00655b03 = local_748;
            let civSlot = DAT_0064c6a6[local_748 * (0x594 / 2)];
            DAT_00655502[civSlot * 0x18] = -DAT_00655502[civSlot * 0x18];
            // local_71c[civSlot * 0x18] = local_728[6 + civSlot * 0x18]
            if (local_728[6 + civSlot * 0x18] < 0) {
              DAT_00655504[civSlot * 0x18] = -DAT_00655504[civSlot * 0x18];
            }
            // local_71c[civSlot * 0x18 + 1] = local_728[6 + civSlot * 0x18 + 1]
            if (local_728[6 + civSlot * 0x18 + 1] < 0) {
              DAT_00655506[civSlot * 0x18] = -DAT_00655506[civSlot * 0x18];
            }
            // DAT_0065550c negation loop
            // local_71c[local_21c * 2 + local_738 + civSlot * 0x18 + 4]
            // = local_728[6 + local_21c * 2 + local_738 + civSlot * 0x18 + 4]
            // C byte offset: local_21c * 4 + civSlot * 0x30 + local_738 * 2
            // Int16Array element index: local_21c * 2 + civSlot * 0x18 + local_738
            for (let local_21c = 0; local_21c < 7; local_21c = local_21c + 1) {
              for (let local_738 = 0; local_738 < 2; local_738 = local_738 + 1) {
                if (local_728[6 + local_21c * 2 + local_738 + civSlot * 0x18 + 4] < 0) {
                  let elemIdx = local_21c * 2 + civSlot * 0x18 + local_738;
                  DAT_0065550c[elemIdx] = -DAT_0065550c[elemIdx];
                }
              }
            }
          }
        }
      }
    } else {
      // Scenario mode: fix up civ discovery flags
      for (let local_748 = 1; local_748 < 8; local_748 = local_748 + 1) {
        let civIdx = DAT_0064c6a6[local_748 * (0x594 / 2)];
        let civFlags = u16(DAT_0064c6a0[local_748 * 0x594], DAT_0064c6a0[local_748 * 0x594 + 1]);
        if ((civFlags & 0x200) === 0) {
          DAT_006554fc[civIdx * 0x30] = 0;
        } else {
          DAT_006554fc[civIdx * 0x30] = 1;
        }
        DAT_0064ca92[local_748 * 0x594] = DAT_0064c6a6[local_748 * (0x594 / 2)];
        if (DAT_006554fc[civIdx * 0x30] !== 0) {
          DAT_0064ca92[local_748 * 0x594] = DAT_0064ca92[local_748 * 0x594] + 0x15;
        }
        // Compare civ name to determine if defaults apply
        let absLeader;
        if (DAT_00655504[civIdx * 0x18] < 1) {
          absLeader = -DAT_00655504[civIdx * 0x18];
        } else {
          absLeader = DAT_00655504[civIdx * 0x18];
        }
        let pcVar2 = FUN_00428b0c(absLeader);
        // Compare civ leader name to default — if match, copy default diplomacy values
        let iVar3 = _strcmp(DAT_0064bd12.subarray(local_748 * 0xf2), pcVar2);
        if (iVar3 === 0) {
          for (let local_21c = 0; local_21c < 7; local_21c = local_21c + 1) {
            for (let local_738 = 0; local_738 < 2; local_738 = local_738 + 1) {
              DAT_0065550c[local_21c * 2 + civIdx * 0x18 + local_738] =
                DAT_00654fe0[local_738 + local_21c * 2] & 0xffff;
            }
          }
        }

        // Negate discovery entries
        DAT_00655502[civIdx * 0x18] = -DAT_00655502[civIdx * 0x18];
        DAT_00655504[civIdx * 0x18] = -DAT_00655504[civIdx * 0x18];
        DAT_00655506[civIdx * 0x18] = -DAT_00655506[civIdx * 0x18];
      }
    }

    FUN_00484d52();
    // Rebuild per-civ unit and city type counts
    for (let local_748 = 0; local_748 < 8; local_748 = local_748 + 1) {
      for (let local_730 = 0; local_730 < 0x3e; local_730 = local_730 + 1) {
        DAT_0064c7f4[local_748 * 0x594 + local_730] = 0;
        DAT_0064c778[local_748 * 0x594 + local_730] = 0;
      }
      for (let local_744 = 0; local_744 < DAT_00655b16; local_744 = local_744 + 1) {
        if ((DAT_0065610a[local_744 * 8] !== 0) &&
            (s8(DAT_006560f7[local_744 * 0x20]) === local_748)) {
          DAT_0064c778[local_748 * 0x594 + DAT_006560f6[local_744 * 0x20]] =
            DAT_0064c778[local_748 * 0x594 + DAT_006560f6[local_744 * 0x20]] + 1;
        }
      }
      for (let local_73c = 0; local_73c < DAT_00655b18; local_73c = local_73c + 1) {
        if ((s32(DAT_0064f394, local_73c * 0x58) !== 0) &&
            (s8(DAT_0064f348[local_73c * 0x58]) === local_748) &&
            (s8(DAT_0064f379[local_73c * 0x58]) >= 0)) {
          DAT_0064c7f4[local_748 * 0x594 + s8(DAT_0064f379[local_73c * 0x58])] =
            DAT_0064c7f4[local_748 * 0x594 + s8(DAT_0064f379[local_73c * 0x58])] + 1;
        }
      }
    }
    DAT_0062ee08 = 0xffffffff;
    FUN_0041a046(1);
    FUN_0041a422(1);
    FUN_0041a5c4(1);
    FUN_004a2020();
    DAT_00655280 = 1;
    // DEVIATION: Win32 — viewport comparison logic to decide if DAT_00655280 = 0
    let iVar3 = FUN_00407f90(DAT_00655284);
    let iVar7 = FUN_00407f90(DAT_006ab180);
    if (iVar3 === iVar7) {
      let iVar3b = FUN_00407fc0(DAT_00655284);
      let iVar7b = FUN_00407fc0(DAT_006ab180);
      if ((iVar3b !== iVar7b) || (local_220 !== 0)) {
        DAT_00655280 = 0;
      }
    } else {
      DAT_00655280 = 0;
    }
    local_338 = 0;
  }

  // LAB_00477352:
  // DEVIATION: File I/O — if (_File != null) _fclose(_File)
  if ((local_338 === 0) && (DAT_00655b02 !== local_334)) {
    DAT_00654c74 = 1;
    if (local_334 === 0) {
      DAT_00654fac = 0;
      DAT_00654fae = 0;
    }
    DAT_0066654e = 0;
    if (DAT_00655b0b === 0) {
      if ((DAT_00628048 === 0) || ((1 << (DAT_00628048 & 0x1f) & DAT_00655b0a) === 0)) {
        for (let local_330 = 1; local_330 < 8; local_330 = local_330 + 1) {
          if ((1 << (local_330 & 0x1f) & DAT_00655b0a) !== 0) {
            DAT_00655b0b = 1 << (local_330 & 0x1f);
            break;
          }
        }
      } else {
        DAT_00655b0b = 1 << (DAT_00628048 & 0x1f);
      }
    }
    if (local_334 !== 0) {
      DAT_00655b02 = local_334;
    }
  }
  return local_338;
}

// Source: decompiled/block_00470000.c save_game (2038 bytes)
// save_game — save_game_ui_flow
export function save_game(param_1) {
  if (DAT_00654fd8 !== 0) {
    // DEVIATION: Win32 — FUN_0055ae80(1) enable_input
    let loop = true;
    while (loop) {
      FUN_00473d5e(param_1);
      // DEVIATION: Win32 — FUN_004aef20(&local_10c) clear string
      // DEVIATION: Win32 — FUN_004af14b(&local_10c, (-(param_1 === 0 ? 1 : 0) & 0xffffff4f) + 0x19f)
      // DEVIATION: Win32 — FUN_004aef36(&local_10c) trim string
      // DEVIATION: Win32 — FUN_004af01a(&local_10c) uppercase string
      // DEVIATION: Win32 — FUN_0043c840(&local_10c, &DAT_0062bb08) string concat
      // DEVIATION: Win32 — FUN_0043c840(&local_10c, &DAT_0066c4e9) string concat
      // DEVIATION: Win32 — FUN_004af03b(&local_10c) lowercase string
      // DEVIATION: Win32 — build default filename with leader name, year, extension
      // DEVIATION: Win32 — FUN_0040bbb0() begin_format_string
      // DEVIATION: Win32 — FUN_00421f10(DAT_00655afa) format year
      // DEVIATION: Win32 — FUN_004af1d5 append year number
      // DEVIATION: Win32 — GetLocalTime for email save timestamp
      // DEVIATION: Win32 — scenario filename fixup for param_1 != 0 && DAT_0064bcb4 < 0
      // DEVIATION: Win32 — __chdir(&DAT_0064bb08)
      FUN_00473e55(1, param_1, 0);
      // DEVIATION: Win32 — FUN_00428b0c(...) get string resource for dialog title
      // DEVIATION: Win32 — iVar3 = show_open_dialog_31D2(&DAT_006553d8, ...) file save dialog
      let iVar3 = 0; // dialog would be shown, returns 0 if cancelled
      if (iVar3 !== 0) {
        // DEVIATION: Win32 — __chdir(&DAT_00655020)
        let saveResult = FUN_004741be(/* acStack_211 + 1 */ '', param_1);
        if (saveResult === 0) {
          if (param_1 === 0) {
            if (DAT_00655b02 === 2) {
              // DEVIATION: Win32 — FUN_0040ff60(0, filename) + FUN_00421ea0(s_EMAILSAVED) dialog
            } else {
              // DEVIATION: Win32 — FUN_00493ba6/FUN_00493b10/FUN_00493c7d adjective/leader/plural
              // DEVIATION: Win32 — FUN_0040ff60 x3 set format strings
              // DEVIATION: Win32 — FUN_0040bbb0 + FUN_00421f10(DAT_00655afa) format year
              // DEVIATION: Win32 — FUN_0040ff60(3, &DAT_00679640) set year
              // DEVIATION: Win32 — FUN_004271e8(4, DAT_0064ba10[DAT_00655b08]) format difficulty
              // DEVIATION: Win32 — FUN_00421ea0(s_SAVEOK) show save OK dialog
            }
          } else {
            // DEVIATION: Win32 — FUN_0040ff60(0, &DAT_0064bc62) + FUN_00421ea0(s_SCENOK) scenario OK
          }
        } else {
          // DEVIATION: Win32 — FUN_00421d60(0, error msg) + FUN_00421ea0(s_SAVEERROR) error dialog
        }
        break;
      }
      // DEVIATION: Win32 — __chdir(&DAT_00655020)
      if (DAT_00655b02 !== 2) {
        loop = false;
      }
    }
    // DEVIATION: Win32 — FUN_0055b046(1) disable_input
  }
}

// Source: decompiled/block_00470000.c load_verify_units (2391 bytes)
// load_verify_units — load_game_ui_flow
export function load_verify_units(param_1, param_2, param_3) {
  // DEVIATION: SEH — FS_OFFSET setup
  let local_760 = 1;
  // DEVIATION: Win32 — FUN_005c64da() GDI init
  if (param_1 === 0) {
    FUN_00473d5e(0);
    DAT_006ad6ac = 1;
  } else {
    FUN_00473d5e(1);
    DAT_006ad6ac = 2;
  }
  // DEVIATION: Win32 — build file filter strings via FUN_004aef20, FUN_004af14b, etc.
  // DEVIATION: Win32 — FUN_005f22d0(local_864, &DAT_0062bb68) default filename
  // DEVIATION: Win32 — FUN_005f22e0(local_864, &DAT_0066c4e9) append extension
  // DEVIATION: Win32 — __chdir(&DAT_0064bb08)
  FUN_00473e55(0, param_1, 0);
  // DEVIATION: Win32 — FUN_00428b0c for dialog title string
  // DEVIATION: Win32 — iVar3 = show_open_dialog_31D2(&DAT_006553d8, ...) file open dialog
  let iVar3 = 0; // dialog would be shown
  if (iVar3 === 0) {
    // DEVIATION: Win32 — __chdir(&DAT_00655020)
  } else {
    // DEVIATION: Win32 — __chdir(&DAT_00655020)
    // Close extra views
    for (let local_11c = 1; local_11c < 8; local_11c = local_11c + 1) {
      if (DAT_0066ca84[local_11c * (0x3f0 / 2)] !== 0) {
        DAT_0066ca84[local_11c * (0x3f0 / 2)] = 0;
        FUN_004083b0();
      }
    }
    // DEVIATION: Win32 — check for ALT scenario file: _strstr, FindFirstFileA, rand() selection
    // DEVIATION: Win32 — FUN_0046e020(0xffffff95/94/6a, 0, 0, 0) play sound effects
    let local_14 = FUN_00475666(/* local_864 */ param_2);
    if (local_14 === 0) {
      FUN_00484d52();
      if ((DAT_00627670 === 0) && ((DAT_00655af0 & 0x80) !== 0)) {
        DAT_00627670 = 0;
        // DEVIATION: File I/O — __chdir(&DAT_0064bb08)
        // DEVIATION: File I/O — check for EVENTS.TXT, load via FUN_004fc516
        // DEVIATION: File I/O — if events loaded: FUN_004cef35(), DAT_00627670 = 1
      }
      if (DAT_00627670 === 0) {
        FUN_004fa5d9(50000);
      }
      DAT_00655aea = DAT_0064bc1e;
      FUN_005d687b(8);
      FUN_0046e4a9();
      if ((DAT_00655aea & 8) !== 0) {
        if (DAT_00627670 === 0) {
          FUN_0046e6c8();
        } else {
          FUN_004fbd2b();
          FUN_0046e6c8();
        }
      }
      if (param_3 !== 0) {
        FUN_00484d52();
        // DEVIATION: Win32 — check TITLE.GIF, load and display via FUN_005bf071, palette setup
      }
      // DEVIATION: Win32 — __chdir(&DAT_00655020)
      local_760 = 0;
      // DEVIATION: Win32 — FUN_00493ba6/b10/c7d for civ name display
      // DEVIATION: Win32 — FUN_0040ff60 set format strings
      // DEVIATION: Win32 — FUN_0040bbb0 + FUN_00421f10(DAT_00655afa) format year
      // DEVIATION: Win32 — FUN_004271e8(4, DAT_0064ba10[DAT_00655b08]) format difficulty
      if (((DAT_00655aea & 0x8000) === 0) || (DAT_00655b02 !== 0)) {
        // local_ac4 = 0;
      } else {
        // local_ac4 = 1;
      }
      // DEVIATION: Win32 — FUN_0057940d(0x701, local_ac4) set_game_speed
      if ((param_1 === 0) && (DAT_00655b02 === 0)) {
        // DEVIATION: Win32 — FUN_00421ea0(s_LOADOK) show load OK dialog
      }
      DAT_006ad2f7 = 1;
      // Verify unit positions
      for (let local_868 = 0; local_868 < DAT_00655b16; local_868 = local_868 + 1) {
        if (DAT_0065610a[local_868 * 8] === 0) {
          DAT_00656108[local_868 * 16] = 0xffff;
          DAT_00656106[local_868 * 16] = 0xffff;
        } else {
          FUN_005b2590(local_868);
          let unitX = s16(DAT_006560f0[local_868 * 0x20], DAT_006560f0[local_868 * 0x20 + 1]);
          let unitY = s16(DAT_006560f0[local_868 * 0x20 + 2], DAT_006560f0[local_868 * 0x20 + 3]);
          if (unitX < 0 || unitY < 0) {
            FUN_005d22f9(/* s_Stacked_Unit_in_save... */ '', local_868,
                         DAT_006560f6[local_868 * 0x20],
                         s8(DAT_006560f7[local_868 * 0x20]));
            FUN_005b4391(local_868, 0);
          }
        }
      }
      // DEVIATION: Win32 — FUN_0040bbb0() + FUN_0040bbe0(local_864) append filename
    } else {
      switch (local_14) {
        case 1:
          // DEVIATION: Win32 — FUN_00421ea0(s_LOADNOTSAVE) not a save file
          break;
        case 2:
          // DEVIATION: Win32 — FUN_00421ea0(s_LOADOLDSAVE) old save version
          break;
        case 3:
          // DEVIATION: Win32 — FUN_00421d60 + FUN_00421ea0(s_LOADBADSAVE) corrupt save
          break;
        case 4:
          // DEVIATION: Win32 — FUN_00421d60 + FUN_00421ea0(s_LOADNEWSAVE) too new
          break;
      }
    }
  }
  if (local_760 !== 0) {
    DAT_006ad6ac = 0;
  }
  // DEVIATION: SEH — cleanup + FS_OFFSET restore
  FUN_004786f8();
  FUN_0047870e();
}

// FUN_004786f8 — call_FUN_005c656b
export function FUN_004786f8() { FUN_005c656b(); }

// Source: decompiled/block_00470000.c FUN_0047870e (14 bytes)
// FUN_0047870e — seh_epilog
export function FUN_0047870e() {
  // DEVIATION: SEH — FS_OFFSET restore
}

// FUN_00479d20 — static_init_views
export function FUN_00479d20() {
  FUN_00479d3a();
  FUN_00479d65();
}

// Source: decompiled/block_00470000.c FUN_00479d3a (43 bytes)
// FUN_00479d3a — eh_vector_constructor_views
export function FUN_00479d3a() {
  // _eh_vector_constructor_iterator_(DAT_0066c7a8, 0x3f0, 8, LAB_004037f6, LAB_0040340e); // DEVIATION: MFC — init 8 objects at DAT_0066c7a8, stride 0x3f0
}

// FUN_00479d65 — register_atexit_views
export function FUN_00479d65() { /* _atexit — no-op */ }

// Source: decompiled/block_00470000.c FUN_00479d82 (38 bytes)
// FUN_00479d82 — atexit_destructor_views
export function FUN_00479d82() {
  // _eh_vector_destructor_iterator_(DAT_0066c7a8, 0x3f0, 8, LAB_0040340e); // DEVIATION: MFC — destroy 8 objects
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
  // DEVIATION: thunk_FUN_00410402(param_1, in_ECX+0x2e2) — map scroll via class instance
}

// FUN_00479eae — scroll_map_by_row
export function FUN_00479eae(param_1) {
  // DEVIATION: thunk_FUN_00410402(in_ECX+0x2e0, param_1) — map scroll via class instance
}

// FUN_00479ede — set_map_mode
export function FUN_00479ede(param_1) {
  // DEVIATION: Sets map display params in class instance (in_ECX+0x2d8/0x2de/0x358/0x2e0/0x2e2/etc.)
  // Initializes viewport center based on param_1 and DAT_006d1160/DAT_006d1162
}

// FUN_00479fbe — compute_map_viewport
export function FUN_00479fbe() {
  // DEVIATION: Computes tile sizes via FUN_00472cf0(0x40/0x20), viewport dimensions,
  // scroll limits, wrapping constraints — 1410 bytes of geometry math on class instance state
}

// FUN_0047a540 — screen_to_tile
export function FUN_0047a540(param_1, param_2, param_3, param_4) {
  // DEVIATION: Converts screen pixel coords to tile coords using class instance viewport state
  // Returns 0 on success, 1 if out of bounds
  return 1;
}

// FUN_0047a6b0 — tile_to_screen
export function FUN_0047a6b0(param_1, param_2, param_3, param_4) {
  // DEVIATION: Converts tile coordinates to screen pixel coordinates
  // Uses in_ECX+0x310/0x314/0x2e8/0x2ec/0x330/0x334/0x124/0x128
}

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

// Source: decompiled/block_00470000.c FUN_0047a8c9 (4431 bytes)
// FUN_0047a8c9 — draw_terrain_tile
export function FUN_0047a8c9(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  let local_50, local_18, local_70, local_5c;
  // DEVIATION: Win32 — in_ECX is class instance pointer for viewport state
  // Compute tile pixel dimensions
  // if (*(short*)(in_ECX + 0x2e4) == param_7) use cached values, else compute:
  local_50 = FUN_00472cf0(0x40, param_7);
  local_18 = FUN_00472cf0(0x20, param_7);
  local_70 = local_50 >> 1;
  local_5c = local_18 >> 1;

  let local_9c;
  if (param_8 < 0) {
    let iVar3 = FUN_004087c0(param_4, param_5);
    local_9c = (iVar3 === 0) ? 1 : 0;
  } else {
    local_9c = (0x14 < param_8) ? 1 : 0;
    if (local_9c === 0) {
      let iVar3 = FUN_004087c0(param_4, param_5);
      local_9c = (iVar3 === 0) ? 1 : 0;
    }
  }
  // DEVIATION: Win32 — FUN_0047df20(param_7) set_draw_scale
  if ((-1 < param_6) || (local_9c !== 0)) {
    if (local_9c === 0) {
      let iVar3 = FUN_005b8b65(param_4, param_5, param_6);
      local_9c = (iVar3 === 0) ? 1 : 0;
    }
    if (local_9c !== 0) {
      // DEVIATION: Win32 — FUN_005cef31(local_bc, param_1, param_2, param_3) draw fog tile
      // DEVIATION: Win32 — FUN_0047df50() reset_draw_scale
      return;
    }
  }
  let iVar3 = FUN_004087c0(param_4, param_5);
  let local_a4, local_6c, local_88, local_20, local_80;
  if (iVar3 === 0) {
    local_9c = 1;
    local_a4 = 7;
    local_6c = 7;
    local_88 = 0;
    local_20 = 0;
    local_80 = null;
  } else {
    local_9c = 0;
    local_80 = FUN_005b8931(param_4, param_5);
    local_a4 = local_80 & 0xff;
    local_6c = local_a4 & 0xf;
    local_20 = local_a4 & 0x80;
    if (param_6 < 1) {
      local_88 = (local_80 >> 8) & 0xff;
    } else {
      let pbVar4 = FUN_005b898b(param_4, param_5, param_6);
      local_88 = pbVar4 & 0xff;
    }
  }
  let auStack_14 = [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff];
  let local_8c;
  if (local_6c === 10) {
    // Ocean tile
    if (param_7 < -3) {
      // DEVIATION: Win32 — FUN_005cef31(local_cc, param_1, param_2, param_3) draw base ocean
    } else {
      local_8c = FUN_0047a747(param_4, param_5);
      for (let local_1c = 0; local_1c < 4; local_1c = local_1c + 1) {
        let local_24 = (DAT_0062bcb8[local_1c] + 1) * (local_70 >> 1) + param_2;
        let local_44 = DAT_0062bcc8[local_1c] * (local_5c >> 1) + param_3;
        // DEVIATION: Win32 — FUN_005cef31(local_dc, param_1, local_24, local_44) draw coast quadrant
      }
      for (let local_54 = 0; local_54 < 4; local_54 = local_54 + 1) {
        let local_ac = FUN_005ae052(s8(DAT_0062833c[local_54]) + param_4);
        let local_60 = s8(DAT_00628344[local_54]) + param_5;
        let iVar3_inner = FUN_004087c0(local_ac, local_60);
        if ((iVar3_inner !== 0) && ((FUN_005b8931(local_ac, local_60) & 0x80) !== 0)) {
          // DEVIATION: Win32 — FUN_005cef31(local_ec, param_1, param_2, param_3) river mouth overlay
        }
      }
    }
  } else {
    // Land tile
    local_8c = 0;
    let local_78 = 0;
    if (param_7 < -4) {
      local_78 = 0xf;
    } else {
      for (let local_54 = 0; local_54 < 4; local_54 = local_54 + 1) {
        let local_ac = FUN_005ae052(s8(DAT_0062833c[local_54]) + param_4);
        let local_60 = s8(DAT_00628344[local_54]) + param_5;
        let iVar3_inner = FUN_004087c0(local_ac, local_60);
        if (iVar3_inner !== 0) {
          let local_74 = FUN_005b8931(local_ac, local_60);
          let bVar1 = local_74 & 0xff;
          let local_a0 = bVar1 & 0xf;
          if (local_a0 === local_6c) {
            local_8c = local_8c + s8(DAT_00628338[local_54]);
          } else if (local_a0 === 10) {
            auStack_14[local_54] = 0xc;
          } else {
            auStack_14[local_54] = local_a0;
          }
          if (((bVar1 & 0x80) !== 0) || (local_a0 === 10)) {
            local_78 = local_78 + s8(DAT_00628338[local_54]);
          }
        }
      }
    }
    // DEVIATION: Win32 — FUN_005cef31(local_fc, param_1, param_2, param_3) draw base terrain
    if (-5 < param_7) {
      // Draw terrain transitions for adjacent different terrain types
      for (let local_84 = 0; local_84 < 4; local_84 = local_84 + 1) {
        if (auStack_14[local_84] >= 0) {
          let local_4c = ((local_84 < 2) ? local_70 : 0) + param_2;
          let local_58 = ((((local_84 + 1) & 3) < 2) ? 0 : local_5c) + param_3;
          // DEVIATION: Win32 — FUN_005cef31(local_10c, param_1, local_4c, local_58) draw transition
        }
      }
    }
    // Draw terrain-specific overlays (jungle=3, swamp=5, tundra=4)
    if (local_6c === 3) {
      // DEVIATION: Win32 — FUN_005cef31(local_11c, param_1, param_2, param_3) jungle overlay
    } else if (local_6c === 5) {
      // DEVIATION: Win32 — FUN_005cef31(local_12c, param_1, param_2, param_3) swamp overlay
    } else if (local_6c === 4) {
      // DEVIATION: Win32 — FUN_005cef31(local_13c, param_1, param_2, param_3) tundra overlay
    }
    // Draw farmland (irrigation + railroad)
    if (((-4 < param_7) && (DAT_0062bcd8 === 0)) && (((local_88 & 0xff) & 0xc) === 0xc)) {
      // DEVIATION: Win32 — FUN_005cef31(local_14c, param_1, param_2, param_3) farmland
    }
    // Draw river
    if (((-7 < param_7) && (local_20 !== 0)) && (DAT_0062bcd8 === 0)) {
      // DEVIATION: Win32 — FUN_005cef31(local_15c, param_1, param_2, param_3) river
    }
    // Draw roads/railroads
    if (-4 < param_7) {
      let local_3c = 0;
      if (((local_88 & 0xff) & 0x42) === 2) {
        for (let local_54 = 2; local_54 < 5; local_54 = local_54 + 2) {
          let local_ac = FUN_005ae052(s8(DAT_00628350[local_54]) + param_4);
          let local_60 = s8(DAT_00628360[local_54]) + param_5;
          let iVar3_inner = FUN_004087c0(local_ac, local_60);
          let uVar2 = local_3c;
          if ((iVar3_inner !== 0)) {
            let local_68 = FUN_005b94d5(local_ac, local_60);
            uVar2 = local_3c;
            if ((local_68 & 4) !== 0) {
              uVar2 = local_3c | 1;
              if ((local_68 & 8) !== 0) {
                uVar2 = local_3c | 3;
              }
            }
          }
          local_3c = uVar2;
        }
      }
      if (DAT_0062bcd8 === 0) {
        if ((((local_88 & 0xff) & 0xc) === 4) || (local_3c === 1)) {
          // DEVIATION: Win32 — FUN_005cef31(local_16c, param_1, param_2, param_3) irrigation
        } else if ((local_3c & 2) !== 0) {
          // DEVIATION: Win32 — FUN_005cef31(local_17c, param_1, param_2, param_3) railroad irrigation
        }
      }
    }
    // Draw special resource on grassland
    if (((-4 < param_7) && (local_6c === 2)) &&
        (FUN_0040bcb0(param_4, param_5) !== 0)) {
      // DEVIATION: Win32 — FUN_005cef31(local_18c, param_1, param_2, param_3) special resource
    }
  }
  // Draw goody hut / hut
  if (((-4 < param_7) && (local_9c === 0)) &&
      (FUN_005b8ee1(param_4, param_5) !== 0)) {
    // DEVIATION: Win32 — FUN_005cef31(local_19c, param_1, param_2, param_3) goody hut
  }
  // Draw road/railroad network
  if (((-4 < param_7) && (DAT_0062bcd8 === 0)) &&
      (((local_88 & 0x10) !== 0) || (FUN_005b8ca6(param_4, param_5) >= 0))) {
    let local_90 = 0;
    let local_94 = 0;
    let local_40;
    if (((local_88 & 0x20) === 0) && (FUN_005b8ca6(param_4, param_5) < 0)) {
      local_40 = 0;
    } else {
      local_40 = 1;
    }
    for (let local_54 = 0; local_54 < 8; local_54 = local_54 + 1) {
      let local_ac = FUN_005ae052(s8(DAT_00628350[local_54]) + param_4);
      let local_60 = s8(DAT_00628360[local_54]) + param_5;
      let iVar3_inner = FUN_004087c0(local_ac, local_60);
      if (iVar3_inner !== 0) {
        let local_68;
        if (param_6 < 1) {
          local_68 = FUN_005b94d5(local_ac, local_60);
        } else {
          let pbVar4 = FUN_005b898b(local_ac, local_60, param_6);
          local_68 = pbVar4 & 0xff;
        }
        if (((local_68 & 0x12) !== 0) &&
            ((local_90 = local_90 + 1, local_40 === 0 || ((local_68 & 0x22) === 0)))) {
          // DEVIATION: Win32 — FUN_005cef31(local_1ac, param_1, param_2, param_3) road segment
        }
      }
    }
    if (local_40 !== 0) {
      for (let local_54 = 0; local_54 < 8; local_54 = local_54 + 1) {
        let local_ac = FUN_005ae052(s8(DAT_00628350[local_54]) + param_4);
        let local_60 = s8(DAT_00628360[local_54]) + param_5;
        let iVar3_inner = FUN_004087c0(local_ac, local_60);
        if (iVar3_inner !== 0) {
          let local_68;
          if (param_6 < 1) {
            local_68 = FUN_005b94d5(local_ac, local_60);
          } else {
            let pbVar4 = FUN_005b898b(local_ac, local_60, param_6);
            local_68 = pbVar4 & 0xff;
          }
          if ((local_68 & 0x22) !== 0) {
            local_94 = local_94 + 1;
            // DEVIATION: Win32 — FUN_005cef31(local_1bc, param_1, param_2, param_3) railroad segment
          }
        }
      }
    }
    let cityIdx = FUN_005b8ca6(param_4, param_5);
    if (cityIdx < 0) {
      if (local_40 === 0) {
        if (local_90 === 0) {
          // DEVIATION: Win32 — FUN_005cef31(local_1dc, param_1, param_2, param_3) isolated road dot
        }
      } else if (local_94 === 0) {
        // DEVIATION: Win32 — FUN_005cef31(local_1cc, param_1, param_2, param_3) isolated rail dot
      }
    }
  }
  // Draw mining
  if (((-4 < param_7) && (DAT_0062bcd8 === 0)) && (((local_88 & 0xff) & 0xc) === 8)) {
    // DEVIATION: Win32 — FUN_005cef31(local_1ec, param_1, param_2, param_3) mining
  }
  // Draw pollution, fortress, airbase, city flag
  if ((-5 < param_7) && (local_9c === 0)) {
    if ((local_88 & 0x80) !== 0) {
      // DEVIATION: Win32 — FUN_005cef31(local_1fc, param_1, param_2, param_3) pollution
    }
    if ((FUN_005b8ffa(param_4, param_5) !== 0) && (DAT_0062bcd8 === 0)) {
      // DEVIATION: Win32 — FUN_005cef31(local_20c, param_1, param_2, param_3) resource icon
    }
    if ((((local_88 & 0xff) & 0x42) === 0x40) && (DAT_0062bcd8 === 0)) {
      // DEVIATION: Win32 — FUN_005cef31(local_21c, param_1, param_2, param_3 - local_5c) fortress
    }
    if ((((local_88 & 0xff) & 0x42) === 0x42) && (DAT_0062bcd8 === 0)) {
      // Airbase with flag
      local_8c = 0;
      for (let local_98 = FUN_005b2e69(param_4, param_5); local_98 >= 0;
           local_98 = FUN_005b2c82(local_98)) {
        if (DAT_0064b1c1[DAT_006560f6[local_98 * 0x20] * 0x14] === 1) {
          local_8c = 1;
          break;
        }
      }
      // DEVIATION: Win32 — FUN_005cef31(local_22c, param_1, param_2, param_3 - local_5c) airbase
      // DEVIATION: Win32 — FUN_004086c0(local_34, param_2, param_3 - local_5c, local_50, local_5c + local_18) set_rect
      // DEVIATION: Win32 — FUN_005b8a1d + FUN_0043cab0 get unit color
      // DEVIATION: Win32 — FUN_005c0479(local_34, 0x106, uVar5) draw flag
    }
  }
  // Draw fog-of-war quadrant overlays
  if ((-4 < param_7) && (-1 < param_6)) {
    for (let local_54 = 0; local_54 < 4; local_54 = local_54 + 1) {
      let local_ac = FUN_005ae052(s8(DAT_0062833c[local_54]) + param_4);
      let local_60 = s8(DAT_00628344[local_54]) + param_5;
      let local_64 = 0;
      if (param_8 < 0) {
        let iVar3_inner = FUN_004087c0(local_ac, local_60);
        if (iVar3_inner === 0) {
          local_64 = 1;
        }
      } else {
        if (param_8 < 0x15) {
          let iVar3_inner = FUN_004087c0(local_ac, local_60);
          if (iVar3_inner === 0) {
            local_64 = 1;
          }
          if (local_64 === 0) {
            // Manhattan distance check for fog boundary
            let dx = s8(DAT_0062833c[local_54]) + s8(DAT_00628370[param_8]);
            let local_7c = (dx < 1) ? (-dx + 1) : dx;
            let dy = s8(DAT_00628344[local_54]) + s8(DAT_006283a0[param_8]);
            let local_a8 = (dy < 1) ? (-dy + 1) : dy;
            let dist = FUN_005ae296(local_7c, local_a8);
            if (2 < dist) {
              local_64 = 1;
            }
          }
        } else {
          local_64 = 1;
        }
      }
      if (local_64 === 0) {
        let iVar3_inner = FUN_005b8b65(local_ac, local_60, param_6);
        local_64 = (iVar3_inner === 0) ? 1 : 0;
      }
      if (local_64 !== 0) {
        let local_4c = ((local_54 < 2) ? local_70 : 0) + param_2;
        let local_58 = ((((local_54 + 1) & 3) < 2) ? 0 : local_5c) + param_3;
        // DEVIATION: Win32 — FUN_005cef31(local_23c, param_1, local_4c, local_58) fog quadrant
      }
    }
  }
  // DEVIATION: Win32 — FUN_0047df50() reset_draw_scale
}

// FUN_0047ba1d — draw_city_on_tile
export function FUN_0047ba1d(param_1, param_2, param_3, param_4) {
  // DEVIATION: Draws city sprite on tile — checks visibility, calls FUN_0056d289
  // C: FUN_0043cf76 find city, FUN_005b8b65 visibility check, DAT_0064f348 owner check
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
  // DEVIATION: Draws unit at position using FUN_0047a6b0 + FUN_0056baff
  if (DAT_0062804c === 0 || DAT_00628054 === 0 || DAT_006d1da8 !== 1) {
    // C: FUN_0047a6b0 for screen coords, local_c -= in_ECX+0x314, FUN_0056baff for sprite
  }
}

// FUN_0047bd04 — draw_unit_with_checks
export function FUN_0047bd04(param_1, param_2, param_3) {
  // DEVIATION: Checks DAT_00633e48/DAT_00633e54 selection state, calls FUN_0047bbea/FUN_0047bba5
}

// FUN_0047be63 — draw_units_on_tile
export function FUN_0047be63(param_1, param_2, param_3, param_4) {
  // DEVIATION: Iterates units on tile via FUN_005b2e69/FUN_005b2c82, draws visible ones
  // Checks FUN_005b8ca6, DAT_006d1da8, FUN_005b633f for visibility
}

// FUN_0047c103 — draw_single_map_tile
export function FUN_0047c103(param_1, param_2, param_3) {
  // DEVIATION: Draws terrain (FUN_0047a8c9) + city (FUN_0047ba1d) + units (FUN_0047be63)
  // for a single tile, with fog-of-war overlay check
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
  // DEVIATION: Calls FUN_0047c37f with in_ECX viewport bounds (0x2e8/0x2ec/0x2f8/0x300/0x2fc/0x304)
  // Without class instance state, always returns 1 (tile visible)
  return 1;
}

// FUN_0047c443 — draw_city_names
export function FUN_0047c443(param_1, param_2, param_3) {
  // DEVIATION: 871-byte function, iterates DAT_00655b18 cities, checks visibility,
  // draws name labels using FUN_005baec8/FUN_005baee0/FUN_005baf57
}

// FUN_0047c7aa — compute_tile_area_rect
export function FUN_0047c7aa(param_1, param_2, param_3, param_4) {
  // DEVIATION: Computes screen rect via FUN_0047a6b0 + viewport scaling + FUN_0047df80
}

// FUN_0047c869 — draw_map_area
export function FUN_0047c869(param_1, param_2, param_3, param_4) {
  // DEVIATION: Draws tiles in diamond pattern — nested loop over -(param_3*2+2) to +(param_3*2+2)
  // Calls FUN_005ae052 for wrapping, FUN_0047c3e0 for visibility, FUN_0047c103 for each tile
}

// FUN_0047c9d4 — draw_full_viewport
export function FUN_0047c9d4(param_1) {
  // DEVIATION: Draws all tiles in viewport — iterates in_ECX+0x2ec to +0x2fc+0x304+1 rows
  // Calls FUN_005ae052 + FUN_0047c103 for each, then FUN_0047c443 for city names
}

// FUN_0047caea — invalidate_tile_area
export function FUN_0047caea(param_1, param_2, param_3) {
  // DEVIATION: Calls FUN_0047c7aa + FUN_00408490 to invalidate screen region
}

// FUN_0047cb26 — invalidate_single_tile
export function FUN_0047cb26(param_1, param_2) {
  FUN_0047caea(param_1, param_2, 0);
}

// FUN_0047cb50 — refresh_status_displays
export function FUN_0047cb50() {
  // DEVIATION: UI refresh calls
  FUN_00407ff0(); // update_info_panel
  if (DAT_00655b02 > 2) {
    FUN_0047e94e(1, 0);
  }
  FUN_00408460(); // invalidate_all
  FUN_00407ff0(); // update_info_panel
  if (DAT_00655b02 > 2) {
    FUN_0047e94e(1, 0);
  }
}

// FUN_0047cbb4 — redraw_map_area
export function FUN_0047cbb4(param_1, param_2, param_3, param_4, param_5) {
  if (DAT_00628044 !== 0) {
    DAT_006ad908 = 1;
    let local_20;
    if (DAT_00655b07 === 0) {
      local_20 = param_4;
    } else {
      local_20 = 0xffffffff;
    }
    FUN_0047c869(param_1, param_2, param_3, local_20);
    // DEVIATION: cursor drawing via FUN_0047a6b0/FUN_005cef31 omitted (rendering)
    // C checks: DAT_006d1da8 == 0 && DAT_00628054 != 0 && DAT_0062804c != 0
    //           && in_ECX+0x2d8 == 0 && FUN_0047c3e0(DAT_0064b1b4, DAT_0064b1b0)
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
    // DEVIATION: FUN_00552ed2 save_screen_state, FUN_00479fbe compute_map_viewport,
    //            FUN_00552112 update_minimap — rendering calls
    FUN_00552ed2();
    FUN_00479fbe();
    FUN_00552112();
    let local_8;
    if (DAT_00655b07 === 0) {
      local_8 = param_1;
    } else {
      local_8 = 0xffffffff;
    }
    FUN_0047c9d4(local_8);
    if (param_2 !== 0) {
      FUN_0047cb50();
      // DEVIATION: in_ECX+0x2d8 check and FUN_0040733c call omitted (UI)
    }
    if (DAT_0062bcb0 === 0 && DAT_006ad684 === 0) {
      FUN_00421bd0(); // update_status_bar
    }
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
  // DEVIATION: MFC class constructor — returns class pointer
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

// Source: decompiled/block_00470000.c FUN_0047debe (19 bytes)
// FUN_0047debe — destructor_oleframe
export function FUN_0047debe() {
  // COleCntrFrameWnd::~COleCntrFrameWnd(*(EBP-0x10)); // DEVIATION: MFC destructor
}

// Source: decompiled/block_00470000.c FUN_0047ded1 (14 bytes)
// FUN_0047ded1 — seh_epilog
export function FUN_0047ded1() {
  // DEVIATION: SEH — FS_OFFSET restore
}

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
  // DEVIATION: Win32 IntersectRect(param_1, param_2, param_3)
}

// FUN_0047dfb0 — scale_param_by_zoom
export function FUN_0047dfb0(param_1) {
  // DEVIATION: thunk_FUN_00472cf0(param_1, (int)*(short*)(in_ECX + 0x2e4))
  return 0;
}

// FUN_0047dff0 — set_zoom_draw_scale
export function FUN_0047dff0() {
  // DEVIATION: thunk_FUN_0047df20((int)*(short*)(in_ECX + 0x2e4))
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
  let iVar1;
  if (DAT_006ad914 === DAT_006ad910 && DAT_006ad90c !== 0) {
    // Queue full — flush
    // DEVIATION: debug_log call omitted (s_STACKED_DRAW_stack_full__Flushin_0062bcf0)
    if (DAT_006ad918 !== 0) {
      DAT_006ad914 = (DAT_006ad910 + 1) % 100;
    } else {
      DAT_006ad910 = 0;
      DAT_006ad914 = 0;
    }
    DAT_006ad90c = (DAT_006ad918 !== 0) ? 1 : 0;
    FUN_0047e0e5(0xa3, new Int32Array(7), 0);
    iVar1 = FUN_0047e0e5(0x74, new Int32Array(7), 0);
  } else {
    // DEVIATION: assert checks on DAT_006ad910 and DAT_006ad914 omitted
    // Store command type
    DAT_006ad920[DAT_006ad914 * 16] = param_1;
    // Store 7 params
    for (let local_8 = 0; local_8 < 7; local_8 = local_8 + 1) {
      DAT_006ad924[local_8 + DAT_006ad914 * 16] = param_2[local_8];
    }
    // For command 0x70, copy extra 0x20 bytes of data
    if (param_1 === 0x70 && param_3 !== 0) {
      for (let i = 0; i < 0x20; i++) {
        DAT_006ad940[DAT_006ad914 * 0x40 + i] = param_3[i];
      }
    }
    DAT_006ad90c = DAT_006ad90c + 1;
    if (DAT_006ad91c < DAT_006ad90c) {
      DAT_006ad91c = DAT_006ad90c;
    }
    iVar1 = ((DAT_006ad914 + 1) / 100) | 0;
    DAT_006ad914 = (DAT_006ad914 + 1) % 100;
  }
  return iVar1;
}

// FUN_0047e2b3 — dequeue_and_execute_draw
export function FUN_0047e2b3() {
  // Processes queued draw operations — switch on command type
  let iVar6;
  switch (DAT_006ad920[DAT_006ad910 * 16]) {
    case 0x70: {
      // Move unit animation
      let unitIdx = DAT_006ad924[DAT_006ad910 * 16];
      iVar6 = DAT_006ad928[DAT_006ad910 * 16];
      let iVar1 = DAT_006ad92c[DAT_006ad910 * 16];
      let uVar4 = DAT_006ad930[DAT_006ad910 * 16];
      FUN_005b2590(unitIdx);
      let iVar2 = FUN_0047e030(iVar6, iVar1);
      if (iVar2 !== 0) {
        // DEVIATION: FID_conflict__memcpy to DAT_00666110 omitted (UI state copy)
        // DEVIATION: DAT_00666126/DAT_00666128 set, FUN_004105f8 center-on-tile call omitted
        // DEVIATION: FUN_0046e020 sound call omitted
        // DEVIATION: FUN_005b8931 tile layer access omitted
        // DEVIATION: FUN_005b2e69/FUN_005b50ad unit counting omitted
        // DEVIATION: DAT_00633e4c/DAT_00633e50/DAT_00633e54 selection state updates omitted
        DAT_00636058 = 1;
        FUN_0056c705(0x801, iVar6, iVar1, uVar4, DAT_006ad6a4, DAT_006ad6a8);
        DAT_00636058 = 0;
        // DEVIATION: post-move visibility/stack flag updates omitted (rendering)
      }
      break;
    }
    case 0x71: {
      // Center on tile if visible
      let vis = FUN_005b8b65(DAT_006ad924[DAT_006ad910 * 16],
                             DAT_006ad928[DAT_006ad910 * 16], DAT_006d1da0);
      if (vis !== 0) {
        FUN_004105f8(DAT_006ad924[DAT_006ad910 * 16],
                     DAT_006ad928[DAT_006ad910 * 16],
                     DAT_006ad92c[DAT_006ad910 * 16]);
      }
      break;
    }
    case 0x72:
      // Redraw tile 1x all views
      FUN_0047cea6(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16]);
      break;
    case 0x73:
      // Play combat animation — DEVIATION: pure rendering
      FUN_005802fd(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16],
                   DAT_006ad92c[DAT_006ad910 * 16], DAT_006ad930[DAT_006ad910 * 16]);
      break;
    case 0x74:
      // Full redraw all views
      FUN_0047cf9e(DAT_006d1da0, 1);
      break;
    case 0x75:
      // Redraw tile 3x all views
      FUN_0047cf22(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16]);
      break;
    case 0x76:
      // Redraw all views with params
      FUN_0047ce1e(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16],
                   DAT_006ad92c[DAT_006ad910 * 16], DAT_006ad930[DAT_006ad910 * 16], 1);
      break;
    case 0x7c: {
      // Draw explosion if visible
      let vis7c = FUN_0047e030(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16]);
      if (vis7c !== 0) {
        FUN_0057ed3f(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16],
                     DAT_006ad92c[DAT_006ad910 * 16]);
      }
      break;
    }
    case 0x7d: {
      // Draw nuke if visible
      let vis7d = FUN_0047e030(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16]);
      if (vis7d !== 0) {
        FUN_0057f657(DAT_006ad924[DAT_006ad910 * 16], DAT_006ad928[DAT_006ad910 * 16]);
      }
      break;
    }
    case 0xa3:
      // Increment network sync counter
      DAT_006c926c = DAT_006c926c + 1;
      break;
  }
  DAT_006ad90c = DAT_006ad90c - 1;
  iVar6 = DAT_006ad910 + 1;
  DAT_006ad910 = iVar6 % 100;
  return (iVar6 / 100) | 0;
}

// Source: decompiled/block_00470000.c FUN_0047e94e (14034 bytes)
// FUN_0047e94e — network_poll_dispatch
export function FUN_0047e94e(param_1, param_2) {
  // DEVIATION: Win32 — SEH frame setup
  let local_1c = 0;
  let local_44 = 0;
  // DEVIATION: Win32 — check 16 send buffer slots (in_ECX + 0x7b4..0x7fc) for pending messages
  // DEVIATION: Win32 — if any pending or XD_InFlushSendBuffer() != 0, return early

  // DEVIATION: Win32 — check in_ECX + 0x160a4 for queued UI commands (map click, key, city operations)
  // If queued command exists and DAT_0062bcec == 0 and XD_InFlushSendBuffer() == 0:
  //   DAT_0062bcec = 1;
  //   Process queued command (cases 1-10: map_click, map_double_click, map_key, minimap_click,
  //     city_mouse, city_button_buy/change/view/rename)
  //   DAT_0062bcec = 0;

  // in_ECX + 0x580 += 1 (poll counter)
  // if (in_ECX + 0x584 < in_ECX + 0x580) in_ECX + 0x584 = in_ECX + 0x580 (max poll counter)

  // Main message processing loop
  let looping = true;
  while (looping) {
    if (param_1 === 0) {
      // End of polling — process chat and AI turn
      if ((param_2 === 0) && (local_1c !== 0)) {
        // DEVIATION: Win32 — FUN_004257fe() chat_message_display
      }
      if ((param_2 === 0) && (DAT_00631130 !== 0)) {
        FUN_00511ba2();
      }
      // in_ECX + 0x580 -= 1
      // DEVIATION: SEH — cleanup
      return;
    }

    // DEVIATION: Win32 — process draw queue if in_ECX + 0x810 == 0 && in_ECX + 0x800 == 0 && in_ECX + 0x804 > 0
    // DEVIATION: Win32 — if (DAT_006c8fa0 < 0x12d && DAT_006c8fac < 0x22) FUN_00453af0() process_messages; param_1--
    // DEVIATION: Win32 — cVar3 = FUN_005149d6(&local_58, &local_20, &local_5c, local_740) poll_network_message
    // if (cVar3 == 0) goto end_of_polling above

    // For the JS transpilation, there are no network messages to process
    looping = false;
    break;

    // ===== Below is the full message dispatch switch, commented as DEVIATION since it requires
    // Win32 network infrastructure (XD_InFlushSendBuffer, XD_FlushSendBuffer, etc.)
    // All game state mutations are preserved as comments showing what DAT_ globals are written.

    // DEVIATION: Win32 — if (local_20 == null) FUN_005dae6b assert
    // DEVIATION: Win32 — if (*local_20 == 0x66606660) — Civ2 message magic
    //   DAT_006c8fe0[local_20[1]] += 1
    //   switch(local_20[1]):
    //     case 0x00: Process sub-message (case 1: send keepalive, case 2: FUN_0059b571 process_turn_data)
    //     case 0x04: memcpy player data (in_ECX + 0x200)
    //     case 0x05: store tick count
    //     case 0x06: DAT_006ad6ac = local_20[4]; copy filenames to DAT_006ad6ae, DAT_006ad7b2
    //     case 0x07-0x09: FUN_004b1de3 process_save_block (delta compression)
    //     case 0x0a: parse_save_block (delta compression)
    //     case 0x0e-0x0f: in_ECX + 0x590 += 1 (sync counter)
    //     case 0x10: DAT_006ad664 -= 1
    //     case 0x12: send message type 0x13 back
    //     case 0x13: copy player names to DAT_006ad57c/59c/5bc/5fc
    //     case 0x15/0x5c: Delta sync — copies game state blocks with DAT_ mutations:
    //       Saves/restores DAT_00655afe, DAT_00655b00, DAT_00655b02, DAT_00655b03, DAT_00655b04,
    //       DAT_00655b05, DAT_00655aea, DAT_00655af2 around block 1
    //       Copies unit positions to DAT_0066fd98/DAT_00670da0/DAT_0066ed98/DAT_00671da0 for block 5
    //       Sets DAT_00628048 = DAT_00654fa4 for block 0xb
    //     case 0x17: memcpy to DAT_0064bcc8 (0x29 bytes)
    //     case 0x18: memcpy to DAT_00627680 (0x640 bytes)
    //     case 0x19: memcpy to DAT_0064c488 (0x218 bytes)
    //     case 0x1a: memcpy to DAT_0064ba28 (0x1c bytes)
    //     case 0x1b: memcpy to DAT_0064b1b8 (0x4d8 bytes)
    //     case 0x1c: memcpy to DAT_00627cc0 (0x318 bytes)
    //     case 0x1d: memcpy to DAT_0064b9a0 (0x1c bytes)
    //     case 0x1e: memcpy to DAT_00654fe0 (0x38 bytes)
    //     case 0x1f: memcpy to DAT_006554f8 (0x3f0 bytes)
    //     case 0x20: memcpy to DAT_0064c6a0 (0x7524 bytes)
    //     case 0x21: memcpy to DAT_0064b168 (0x40 bytes)
    //     case 0x22: memcpy to DAT_00655490 (0x68 bytes)
    //     case 0x23: memcpy to DAT_0064ba10 (0x18 bytes)
    //     case 0x24: memcpy to DAT_0064b9c0 (0x24 bytes)
    //     case 0x25: DAT_00627670 = local_40; DAT_0064b998 = local_3c; if events: FUN_0048308f()
    //     case 0x28: DAT_006ad640 = local_40
    //     case 0x2a: DAT_00654fb0 = local_40; DAT_00655b0b &= local_40; _DAT_006c90a0 += 1
    //     case 0x2d: DAT_006c3188[local_40] = 1; FUN_0048de75()
    //     case 0x2e: Player join — FUN_005233fc, FUN_004b0b53, FUN_00523d8a, send multiple messages
    //     case 0x2f: Join request — FUN_0059b7fc, FUN_0056f113
    //     case 0x30: DAT_00654fb0 seat assignment; _DAT_006c90a0 += 1
    //     case 0x31: DAT_00654fb0 seat removal; DAT_00655b0b &= DAT_00654fb0; _DAT_006c90a0 += 1
    //     case 0x32: DAT_006c8fc0[local_58] = -1; FUN_0059b96a disconnect
    //     case 0x33: DAT_00654fac, DAT_00654fae, DAT_006ad684, DAT_00654c7c assignments
    //     case 0x34: FUN_004e1763 change_government
    //     case 0x35: DAT_006c90b4 = 1
    //     case 0x37: FUN_005b4391 disband_unit
    //     case 0x38: DAT_006c90c0 = 1
    //     case 0x39: delete_city
    //     case 0x3a: DAT_006c90c8 = 1; memcpy city data
    //     case 0x3b: create_city
    //     case 0x3c: DAT_006c90d0 = local_40; memcpy city data; DAT_00655b18 = local_3c
    //     case 0x3d: FUN_005b3d06 create_unit
    //     case 0x3e: DAT_006c90d8 = local_40; DAT_00655b16 = local_3c
    //     case 0x3f: pick_up_unit
    //     case 0x40: DAT_006c90e0 = 1
    //     case 0x41: FUN_005b345f place_unit
    //     case 0x42: DAT_006c90e8 = 1
    //     case 0x43: FUN_005b389f disband_unit
    //     case 0x44: DAT_006c90f0 = 1
    //     case 0x45: FUN_005b36df (unit operation)
    //     case 0x46: DAT_006c90f8 = 1
    //     case 0x47: FUN_004e7270 move_unit_network
    //     case 0x48: DAT_006c9100 = local_40
    //     case 0x49: FUN_005b542e upgrade_unit
    //     case 0x4a: DAT_006c9108 = local_40
    //     case 0x4b: FUN_005b5bab fortify_unit
    //     case 0x4c: DAT_006c9110 = 1
    //     case 0x4d: FUN_005b5d93 pillage_tile
    //     case 0x4e: DAT_006c9118 = 1
    //     case 0x4f: FUN_005b6042 airlift_unit
    //     case 0x50: DAT_006c9120 = 1
    //     case 0x51: FUN_00594d42 process_combat
    //     case 0x52: FUN_0059511c process_unit_command
    //     case 0x53: DAT_0064ba4c[local_40] = local_3c
    //     case 0x54: DAT_0064ba48[local_40] += 1
    //     case 0x55: Set DAT_0064ba50/54/58/5c/4c/48 for research progress
    //     case 0x56-0x57: DAT_006ad66c -= 1; if local_40==2: DAT_006ad670 = -1
    //     case 0x58: FUN_004f1220 process_trade_route
    //     case 0x59: FUN_005ba206 process_save_replay
    //     case 0x5a: Complex unit bribe — FUN_005b5bab, FUN_005b48b1, FUN_005b496e,
    //       FUN_005b3ae0, FUN_005b389f, FUN_005b490e, FUN_005b99e8, FUN_004b0b53
    //       Mutates: DAT_0064c6a2, DAT_0064c778, DAT_0064c6bc, DAT_006560f7/100/f8/ff,
    //       DAT_006560f0/f2
    //     case 0x5b: DAT_006c914c = 1
    //     case 0x5d: DAT_006c31d0 = 1
    //     case 0x5e: DAT_006c31d0 = 0
    //     case 0x5f: new_civ
    //     case 0x60: kill_civ
    //     case 0x61: DAT_006c9164 = local_40
    //     case 0x62: DAT_006c9168 = local_40
    //     case 0x63 (99): Unit nationality change — complex mutations to DAT_0064c6a2,
    //       DAT_0064c778, DAT_0064c6bc, DAT_006560f7/100/f8/ff, FUN_005b490e, FUN_005b99e8
    //     case 0x64 (100): FUN_0059c575 process_battle_result
    //     case 0x65: Full game sync receive — FUN_0059db08, DAT_006c9178=0, DAT_00635a3c assignment
    //     case 0x68: FUN_004b90ad process_trade
    //     case 0x69: End of turn — reset draw queue, DAT_00655b05, _DAT_006ad578,
    //       FUN_004e4ceb end_turn_update, _DAT_0066c990=-1, FUN_00552112 update_minimap
    //     case 0x6a: FUN_00511a0e process_game_command
    //     case 0x6b: DAT_00655af0 = local_40; DAT_0064b1ac = local_3c; DAT_0062c5b4 = local_38
    //     case 0x6c: DAT_00654b70, DAT_0066c988 assignments; FUN_00552112/FUN_0055af2e
    //     case 0x6d: DAT_0066c988 update; FUN_0055af2e
    //     case 0x6e: FUN_0055ae80(0) enable_input
    //     case 0x6f: FUN_0055b046(0) disable_input
    //     case 0x70: FUN_0047e0e5 enqueue move animation (with city entry check)
    //     case 0x71: FUN_0047e0e5 enqueue center-on-tile
    //     case 0x72: FUN_0047e0e5 conditional redraw if visible
    //     case 0x73: FUN_0047e0e5 enqueue combat animation
    //     case 0x74: FUN_0047e0e5 enqueue full redraw
    //     case 0x75: FUN_0047e0e5 conditional 3x redraw if visible
    //     case 0x76: FUN_0047e0e5 conditional area redraw if visible
    //     case 0x77: DAT_006acb38 = local_40
    //     case 0x78: FUN_00569363(1) accept_treaty
    //     case 0x79: FUN_0056a65e(1) reject_treaty
    //     case 0x7a: FUN_0046e020 play_sound
    //     case 0x7b: DAT_006a1870 = local_40
    //     case 0x7c-0x7d: FUN_0047e0e5 enqueue explosion/nuke animation
    //     case 0x7e: FUN_0045b0d6 set_tax_rates
    //     case 0x7f: FUN_00436287 revolution
    //     case 0x80: DAT_0063f278 = local_40
    //     case 0x81: Diplomacy init — FUN_004b7645; DAT_00626a2c = 0
    //     case 0x82-0x85: FUN_004b81dd diplomacy_message
    //     case 0x86: FUN_004dd285 process_cheat
    //     case 0x87: citywin_C494
    //     case 0x88: citywin_C679
    //     case 0x89: citywin_C449
    //     case 0x8a: citywin_9429 (if DAT_006aa760 == 0)
    //     case 0x8c/0x8f: DAT_006ced20[local_40] += 1; (0x8f also: FUN_005b6787 per unit)
    //     case 0x90: FUN_005b94fc reveal_tile
    //     case 0x91: FUN_005b9646 update_tile_improvement
    //     case 0x92: FUN_005b976d set_tile_terrain
    //     case 0x93: FUN_005b98b7 set_tile_special
    //     case 0x94: FUN_005b99e8 update_tile_owner
    //     case 0x95: FUN_005b9b35 update_tile_road
    //     case 0x96: FUN_005b9c49 update_tile_irrigation
    //     case 0x97: FUN_005b9d81 update_tile_mining
    //     case 0x98: DAT_0064c6e0[local_40 * 0x594 + local_3c] = local_38 (civ attitude)
    //     case 0x99: DAT_0062c468/DAT_00673ad8/ab8/a78/a98 assignments (trade route)
    //     case 0x9a: DAT_006ad6a4 = local_40; DAT_006ad6a8 = local_3c (animation params)
    //     case 0x9b: FUN_004bf05b process_spy
    //     case 0x9d: FUN_0040ddc6 advisor_popup_A
    //     case 0x9e: FUN_0040decc advisor_popup_B
    //     case 0x9f: FUN_0055c3d3 change_production
    //     case 0xa0: FUN_00560d95 set_diplomacy_A
    //     case 0xa1: FUN_00562021 set_diplomacy_B
    //     case 0xa2: DAT_006c3168[local_40] += 1
    //     case 0xa3: FUN_0047e0e5 enqueue sync counter
    //     case 0xa4: Pre-war dialog — FUN_00467825/FUN_00467750
    //     case 0xa5-0xa8: Diplomacy scroll responses — FUN_00453c40/c80, FUN_0058878e, FUN_00468bb9
    //       DAT_0067ab67, DAT_0067ab64 assignments
    //
    //   operator_delete(local_20)
    //   continue loop (goto LAB_0047efdc)
  }
}

// FUN_00482305 — seh_helper_A (referenced within FUN_0047e94e)
export function FUN_00482305() { /* DEVIATION: SEH cleanup — no-op in JS */ }

// FUN_00482311 — seh_helper_B (referenced within FUN_0047e94e)
export function FUN_00482311() { /* DEVIATION: SEH cleanup — no-op in JS */ }

// FUN_00482327 — seh_epilog_poll (referenced within FUN_0047e94e)
export function FUN_00482327() { /* DEVIATION: SEH epilog — no-op in JS */ }


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
function FUN_005ae006(param_1) {
  let local_8 = 0;
  for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
    if ((param_1 & 1) !== 0) {
      local_8 = local_8 + 1;
    }
    param_1 = param_1 >> 1;
  }
  return local_8;
}
function _strcmp(a, b) {
  // Compare null-terminated Uint8Array string against JS string (or two Uint8Arrays)
  if (a instanceof Uint8Array && typeof b === 'string') {
    for (let i = 0; i < a.length && i < b.length; i++) {
      if (a[i] === 0) return b.length > 0 ? -1 : 0;
      if (a[i] !== b.charCodeAt(i)) return a[i] < b.charCodeAt(i) ? -1 : 1;
    }
    return 0;
  }
  return a === b ? 0 : 1;
}
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
function FUN_004af122(param_1, param_2) {
  // Appends civ name string by ID: FUN_005f22e0(param_1, FUN_00428b0c(param_2))
  // In stub environment, FUN_00428b0c and FUN_005f22e0 are no-ops,
  // but the clear + append effectively writes the civ name into the byte buffer.
  let uVar1 = FUN_00428b0c(param_2);
  FUN_005f22e0(param_1, uVar1);
}
function FUN_004aef20(param_1) {
  // Clears null-terminated string: sets first byte to 0
  if (param_1 && param_1.length > 0) param_1[0] = 0;
}
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
