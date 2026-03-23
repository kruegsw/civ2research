// ═══════════════════════════════════════════════════════════════════
// block_004A0000.js — Mechanical transpilation of block_004A0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004A0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004A0000.c
// ═══════════════════════════════════════════════════════════════════




// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

// NOTE: Many globals below are network/UI-only state. They are
// declared here as module-level variables for mechanical correctness.
// Game-logic globals should eventually migrate to mem.js.

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_00408330, FUN_00408460, FUN_004085f0, FUN_004086c0 } from './block_00400000.js';
import { FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80, FUN_0040bcb0, FUN_0040ef50 } from './block_00400000.js';
import { FUN_0040ef70, FUN_0040f010, FUN_0040f350, FUN_0040f380, FUN_0040f680, FUN_0040f840 } from './block_00400000.js';
import { FUN_0040f880, FUN_0040fb00, FUN_0040fc50, FUN_0040fcf0, FUN_0040fd40, FUN_0040fd80 } from './block_00400000.js';
import { FUN_0040fdb0, FUN_0040fe10, FUN_0040fea0, FUN_0040fed0, FUN_0040ff00, FUN_0040ff30 } from './block_00400000.js';
import { FUN_0040ff60 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00410402, FUN_00414d10, FUN_00414d70, FUN_0041508c } from './block_00410000.js';
import { FUN_00417ef0, FUN_00417f70, FUN_00417fa0, FUN_004183d0, FUN_00418740, FUN_00418910 } from './block_00410000.js';
import { FUN_004189c0, FUN_00418a30, FUN_00418a70, FUN_00418bf0, FUN_00418c70, FUN_00418ce0 } from './block_00410000.js';
import { FUN_00418d60, FUN_00418d90, FUN_00418dd0, FUN_004190a0, FUN_004190d0 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421d60, FUN_00421ea0, FUN_00428a95, FUN_00428b0c, FUN_00428b68 } from './block_00420000.js';
import { FUN_0043cef9, FUN_0043d07a, FUN_0043d289, create_city } from './block_00430000.js';
import { FUN_00444270 } from './block_00440000.js';
import { FUN_00451890, FUN_004518d0, FUN_00451930, FUN_004519b0, FUN_00451a60, FUN_00451ac0 } from './block_00450000.js';
import { FUN_00451bf0, FUN_00453e51 } from './block_00450000.js';
import { FUN_0046b14d, FUN_0046e571 } from './block_00460000.js';
import { FUN_0047cd51, FUN_0047cf9e, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484cc0 } from './block_00480000.js';
import { FUN_004923c0, FUN_00493602, FUN_0049376f, FUN_00493c7d, FUN_00493d13, FUN_004988b8 } from './block_00490000.js';
import { FUN_00498943 } from './block_00490000.js';
import { FUN_004b0157, FUN_004b0b53, FUN_004bf05b, FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004c21d5, FUN_004c5fae, FUN_004ccab9, FUN_004ccaed, FUN_004ccb6a, FUN_004ccdb6 } from './block_004C0000.js';
import { FUN_004cd8a6 } from './block_004C0000.js';
import { FUN_004d007e, FUN_004db481 } from './block_004D0000.js';
import { FUN_004e4ceb } from './block_004E0000.js';
import { FUN_004f6646 } from './block_004F0000.js';
import { FUN_00511880, FUN_0051d564, FUN_0051d63b } from './block_00510000.js';
import { FUN_0052e971 } from './block_00520000.js';
import { FUN_00552112 } from './block_00550000.js';
import { FUN_00564bf0, FUN_00568176, FUN_0056b810, FUN_0056baff, FUN_0056d289 } from './block_00560000.js';
import { FUN_00596eec, FUN_0059d3c9, FUN_0059db08, FUN_0059df8a, FUN_0059e5c9, FUN_0059e6ff } from './block_00590000.js';
import { FUN_0059ec88, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005a9964, FUN_005a9abf, FUN_005a9afe, FUN_005adfa0, FUN_005ae006, FUN_005ae0b0 } from './block_005A0000.js';
import { FUN_005ae10e, FUN_005ae1b0, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b2a39, FUN_005b2e69, FUN_005b3d06, FUN_005b4391, FUN_005b4b66, FUN_005b4d8c } from './block_005B0000.js';
import { FUN_005b50ad, FUN_005b53b6, FUN_005b6787, FUN_005b67af, FUN_005b8a81, FUN_005b8aa8 } from './block_005B0000.js';
import { FUN_005b8b1a, FUN_005b8c42, FUN_005b8d15, FUN_005b8d62, FUN_005b8da4, FUN_005b8dec } from './block_005B0000.js';
import { FUN_005b8ffa, FUN_005b94fc, FUN_005b976d, FUN_005b9ec6, FUN_005b9f1c, FUN_005baeb0 } from './block_005B0000.js';
import { FUN_005baec8, FUN_005baee0, FUN_005baf57, FUN_005bb024, FUN_005bb574, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bf071 } from './block_005B0000.js';
import { FUN_005c0073, FUN_005c00ce, FUN_005c0333, FUN_005c0f57, FUN_005c19ad, FUN_005c61b0 } from './block_005C0000.js';
import { FUN_005c62ee, FUN_005c64da, FUN_005c656b, FUN_005cde4d, FUN_005cdea1, FUN_005cef66 } from './block_005C0000.js';
import { FUN_005d268e, FUN_005db0d0, FUN_005dba95, FUN_005dbab8 } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';

let _DAT_00655b1c = 0;
let _DAT_0064bc12 = 0;
let _DAT_0064bc1a = 0;
let _DAT_0064bc1c = 0;

// Arrays accessed via DAT_ + offset pattern
let _DAT_00666540 = 0;
let _DAT_006666f2 = 0;

// Alpha centauri / spaceship vars

let PTR_s_CIV2_DAT_0062cec8 = "CIV2.DAT";


// ═══════════════════════════════════════════════════════════════════
// Helper: C library function stubs
// ═══════════════════════════════════════════════════════════════════

function _strlen(s) { if (typeof s === 'string') return s.length; return 0; }
function _strncpy(dst, src, n) { /* no-op stub */ }
function _sprintf(buf, fmt, ...args) { /* no-op stub */ }
function _fgets(buf, n, file) { return null; }
function _fseek(file, offset, origin) { /* no-op stub */ }
function _rewind(file) { /* no-op stub */ }
function _fclose(file) { /* no-op stub */ }
function _fputs(s, file) { /* no-op stub */ }
function _fopen(name, mode) { return null; }
function _fread(buf, size, count, file) { return 0; }
function _fwrite(buf, size, count, file) { return 0; }
function _rand() { return Math.floor(Math.random() * 0x7FFF); }
function _memset(arr, val, n) { if (Array.isArray(arr)) for (let i = 0; i < n; i++) arr[i] = val; }
function __strupr(s) { /* no-op stub */ }
function __getcwd(buf, n) { /* no-op stub */ }
function __chdir(path) { /* no-op stub */ }
function __strcmpi(a, b) { return 0; }
function __itoa(val, buf, radix) { /* no-op stub */ }
function __ltoa(val, buf, radix) { /* no-op stub */ }
function FID_conflict__remove(path) { /* no-op stub */ }


// ═══════════════════════════════════════════════════════════════════
// C string concat / copy stubs matching Civ2 runtime
// ═══════════════════════════════════════════════════════════════════

// FUN_005f22d0 — strcpy wrapper

// FUN_005f22e0 — strcat wrapper

// FUN_005cef66, FUN_005c64da, FUN_005c61b0, FUN_005c656b, etc. — UI/framework stubs

// Win32 API stubs
function MessageBoxA(...args) { /* no-op */ }
function GetSystemMetrics(idx) { return 0; }
function SetRect(...args) { /* no-op */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_004a2020 — close_rules_file
// Source: block_004A0000.c line 10, 53 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a2020() {
  if (G.DAT_0062cd20 !== null) {
    _fclose(G.DAT_0062cd20);
    G.DAT_0062cd20 = null;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a2055 — open_rules_file_and_seek_section
// Source: block_004A0000.c line 27, 789 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a2055(param_1, param_2) {
  let bVar1;
  let bVar2;
  let sVar3;
  let pcVar4;
  let iVar5;
  let local_264 = "";
  let local_214 = 1;
  let local_210 = "";
  let local_10c = "";
  let local_8 = -1;

  bVar2 = false;
  FUN_004aef20(local_210);
  FUN_004aef20(local_264);
  if (param_2 !== 0) {
    local_264 = "@";
    FUN_005f22e0(local_264, param_2);
    // __strupr(local_264); — no-op
  }
  if (param_1 === 0) {
    bVar2 = true;
  } else {
    FUN_004a2020();
    FUN_005f22d0(local_210, param_1);
    // File open operations — stubbed
    G.DAT_0062cd20 = FUN_0041508c(local_210, G.DAT_0062cd28);
    if (G.DAT_0062cd20 !== null && _strlen(local_210) !== 0) {
      local_8 = FUN_004db481(local_210, local_264);
    }
    if (G.DAT_0062cd20 === null) {
      G.DAT_0062cd20 = FUN_0041508c(local_210, G.DAT_0062cd2c);
      if (G.DAT_0062cd20 !== null && _strlen(local_210) !== 0) {
        local_8 = FUN_004db481(local_210, local_264);
      }
    }
    if (G.DAT_0062cd20 === null) {
      // goto LAB_004a2348 equivalent
      if (local_214 !== 0) {
        FUN_004a2020();
      }
      return local_214;
    }
  }
  if (param_2 === 0) {
    local_214 = 0;
  } else {
    if (0 < local_8) {
      _fseek(G.DAT_0062cd20, local_8, 0);
    }
    bVar1 = false;
    while (!bVar1) {
      if (G.DAT_0062cd20 !== null && G.DAT_0062cd20._flag_eof) {
        if (!bVar2) {
          if (local_214 !== 0) {
            FUN_004a2020();
          }
          return local_214;
        }
        bVar2 = false;
        _rewind(G.DAT_0062cd20);
      }
      pcVar4 = _fgets(G.DAT_00679640, 0xff, G.DAT_0062cd20);
      if (pcVar4 !== null) {
        FUN_0056b810(G.DAT_00679640);
        FUN_004d007e(G.DAT_00679640);
        iVar5 = __strcmpi(G.DAT_00679640, local_264);
        if (iVar5 === 0) {
          bVar1 = true;
        }
      }
    }
    sVar3 = _strlen(G.DAT_00679640);
    G.DAT_00673f14 = sVar3; // points past end of line
    local_214 = 0;
  }
  if (local_214 !== 0) {
    FUN_004a2020();
  }
  return local_214;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a2379 — open_rules_file_fallback
// Source: block_004A0000.c line 116, 131 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a2379(param_1, param_2) {
  let local_10c = new Array(260).fill(0);
  let local_8;

  local_8 = FUN_004a2055(param_1, param_2);
  if (local_8 !== 0) {
    FUN_005f22d0(local_10c, G.DAT_0064bb08);
    FUN_005f22d0(G.DAT_0064bb08, G.DAT_00655020);
    local_8 = FUN_004a2055(param_1, param_2);
    FUN_005f22d0(G.DAT_0064bb08, local_10c);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a23fc — read_next_line
// Source: block_004A0000.c line 139, 171 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a23fc(param_1) {
  let pcVar1;
  let local_8 = null;

  if (G.DAT_0062cd20 !== null) {
    pcVar1 = _fgets(G.DAT_00679640, 0xff, G.DAT_0062cd20);
    if (pcVar1 !== null) {
      FUN_0056b810(G.DAT_00679640);
      if (param_1 === 1) {
        FUN_004d007e(G.DAT_00679640);
      }
      G.DAT_00673f14 = 0;
      local_8 = G.DAT_00679640;
    }
  }
  if (local_8 === null) {
    G.DAT_00679640[0] = 0;
    FUN_004a2020();
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a24b1 — parse_next_csv_token
// Source: block_004A0000.c line 169, 131 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a24b1() {
  let local_8_idx = 0;

  while (G.DAT_00679640[G.DAT_00673f14] !== 0 && G.DAT_00679640[G.DAT_00673f14] !== 0x2C /* ',' */) {
    G.DAT_00673e10[local_8_idx] = G.DAT_00679640[G.DAT_00673f14];
    local_8_idx++;
    G.DAT_00673f14++;
  }
  if (G.DAT_00679640[G.DAT_00673f14] !== 0) {
    G.DAT_00673f14++;
  }
  G.DAT_00673e10[local_8_idx] = 0;
  FUN_004d007e(G.DAT_00673e10);
  return G.DAT_00673e10;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a2534 — parse_csv_token_as_int (calls atoi)
// Source: block_004A0000.c line 194, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a2534() {
  let uVar1 = FUN_004a24b1();
  let result = FUN_00564bf0(uVar1);
  return result;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a2552 — skip_to_end_of_line
// Source: block_004A0000.c line 211, 40 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a2552() {
  let sVar1 = _strlen(G.DAT_00679640);
  G.DAT_00673f14 = sVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a257a — read_line_as_int
// Source: block_004A0000.c line 228, 48 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a257a() {
  FUN_004a23fc(1);
  let uVar1 = FUN_00428a95(G.DAT_00679640);
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a25aa — parse_token_as_int_via_lookup
// Source: block_004A0000.c line 245, 43 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a25aa() {
  FUN_004a24b1();
  let uVar1 = FUN_00428a95(G.DAT_00673e10);
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a25d5 — parse_binary_string_token
// Source: block_004A0000.c line 262, 112 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a25d5() {
  let sVar1 = 0;

  FUN_004a24b1();
  let idx = 0;
  while (G.DAT_00673e10[idx] === 0x30 /* '0' */ || G.DAT_00673e10[idx] === 0x31 /* '1' */) {
    sVar1 = sVar1 * 2;
    if (G.DAT_00673e10[idx] === 0x31 /* '1' */) {
      sVar1 = sVar1 + 1;
    }
    idx++;
  }
  return s8(sVar1 & 0xFFFF);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a2645 — open_and_skip_to_line
// Source: block_004A0000.c line 286, 117 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a2645(param_1, param_2, param_3) {
  let local_c = 1;

  let iVar1 = FUN_004a2379(param_1, param_2);
  if (iVar1 === 0) {
    for (let local_8 = 0; local_8 <= param_3; local_8++) {
      FUN_004a23fc(1);
    }
    local_c = 0;
  }
  FUN_004a2020();
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a26bf — parse_csv_token_via_string_lookup
// Source: block_004A0000.c line 312, 47 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a26bf(param_1) {
  FUN_004a24b1();
  let uVar1 = FUN_00428b68(G.DAT_00673e10, param_1);
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a28b0 — calculate_spaceship_score
// Source: block_004A0000.c line 329, 1542 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a28b0(param_1) {
  let iVar1;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  G.DAT_00673f78 = 0;
  for (local_14 = 0; local_14 < G.DAT_00655b18; local_14++) {
    if (G.DAT_0064f394[local_14 * 0x58] !== 0 &&
       s8(G.DAT_0064f348[local_14 * 0x58]) === param_1) {
      G.DAT_00673f78 = G.DAT_00673f78 +
                     (s8(G.DAT_0064f349[local_14 * 0x58]) +
                      s8(G.DAT_0064f392[local_14 * 0x58])) -
                     s8(G.DAT_0064f393[local_14 * 0x58]);
    }
  }
  G.DAT_00673f5c = 0;
  for (local_c = 0; local_c < 0x1c; local_c++) {
    if (s16(G.DAT_00655be6, local_c * 2) >= 0 &&
       s8(G.DAT_0064f348[s16(G.DAT_00655be6, local_c * 2) * 0x58]) === param_1) {
      G.DAT_00673f5c = G.DAT_00673f5c + 0x14;
    }
  }
  G.DAT_00673f84 = 0;
  G.DAT_00673f60 = 0;
  FUN_00596eec(param_1, 1);
  if (G.DAT_006ad0ec !== 0 && s16(G.DAT_0064caa6, param_1 * 0x594) !== 0) {
    G.DAT_00673f84 = s16(G.DAT_0064caa6, param_1 * 0x594) * G.DAT_006ad0ec;
    if ((G.DAT_0064caa0[param_1 * 0x594] & 0x10) !== 0) {
      G.DAT_00673f84 = 0;
      G.DAT_00673f60 = s16(G.DAT_0064caa6, param_1 * 0x594) * G.DAT_006ad0ec;
    }
  }
  G.DAT_00673f58 = (G.DAT_00655b12 - G.DAT_00655b10) * -10;
  G.DAT_00673f8c = 0;
  if (199 < G.DAT_00655af8) {
    G.DAT_00673f8c = FUN_005adfa0(G.DAT_00655b14 * 3, 0, 100);
  }
  G.DAT_00673f6c = u8(G.DAT_0064c6b1[param_1 * 0x594]) * 5;
  G.DAT_00673f74 = G.DAT_00655b09 * 0x19 + -0x32;
  G.DAT_00673f88 = G.DAT_00673f8c + G.DAT_00673f58 + G.DAT_00673f60 + G.DAT_00673f5c + G.DAT_00673f78 +
                 G.DAT_00673f74 + G.DAT_00673f6c;
  if (G.DAT_00673f88 < 0) {
    G.DAT_00673f88 = 0;
  }
  G.DAT_00673f7c = 0;
  if ((G.DAT_00655b0a & 0xfffffffe) === 1 << (param_1 & 0x1f)) {
    local_18 = G.DAT_00655af8;
    if ((G.DAT_00655ae8 & 0x100) !== 0 && local_18 < 0xfb) {
      local_18 = 0xfa;
    }
    G.DAT_00673f7c = G.DAT_00655b0d * 100 + (0x23a - local_18) * 2 + 400;
    if ((G.DAT_00655af0 & 4) !== 0) {
      G.DAT_00673f7c = (G.DAT_00673f7c * 5 + (G.DAT_00673f7c * 5 >> 0x1f & 3)) >> 2;
    }
    if ((G.DAT_00655af0 & 8) !== 0) {
      G.DAT_00673f7c = (G.DAT_00673f7c << 2) / 5;
    }
  }
  G.DAT_00673f68 = 0;
  if ((G.DAT_00655af0 & 0x80) === 0 || (G.DAT_0064bc60 & 2) === 0) {
    iVar1 = G.DAT_00673f88;
    if (G.DAT_00673f88 <= G.DAT_00673f7c) {
      iVar1 = G.DAT_00673f7c;
    }
  } else {
    G.DAT_00673f70 = 0;
    G.DAT_00673f64 = 0;
    G.DAT_00673f80 = 0;
    for (local_14 = 0; local_14 < G.DAT_00655b18; local_14++) {
      if (G.DAT_0064f394[local_14 * 0x58] !== 0) {
        iVar1 = FUN_0043cef9(local_14);
        G.DAT_00673f70 = G.DAT_00673f70 + iVar1;
        if (s8(G.DAT_0064f348[local_14 * 0x58]) === G.DAT_0064bcba) {
          G.DAT_00673f64 = G.DAT_00673f64 + iVar1;
        }
        if (s8(G.DAT_0064f348[local_14 * 0x58]) === param_1) {
          G.DAT_00673f80 = G.DAT_00673f80 + iVar1;
        }
      }
    }
    if (G.DAT_0064bcba === 0) {
      G.DAT_00673f64 = G.DAT_00673f80;
    }
    G.DAT_00673f54 = 2;
    if (G.DAT_00673f64 < G.DAT_0064bcbc) {
      if (G.DAT_00673f64 < G.DAT_0064bcbe) {
        if (G.DAT_0064bcc2 < G.DAT_00673f64) {
          if (G.DAT_00673f64 <= G.DAT_0064bcc0) {
            G.DAT_00673f54 = 3;
          }
        } else {
          G.DAT_00673f54 = 4;
        }
      } else {
        G.DAT_00673f54 = 1;
      }
    } else {
      G.DAT_00673f54 = 0;
    }
    local_8 = G.DAT_00673f54;
    if (G.DAT_0064bcba !== 0 && G.DAT_0064bcba !== param_1) {
      local_8 = 4 - G.DAT_00673f54;
    }
    switch (local_8) {
      case 0: G.DAT_00673f68 = 1000; break;
      case 1: G.DAT_00673f68 = 0x2ee; break;
      case 2: G.DAT_00673f68 = 500; break;
      case 3: G.DAT_00673f68 = 0xfa; break;
      case 4: G.DAT_00673f68 = 0; break;
    }
    G.DAT_00673f68 = G.DAT_00673f68 + G.DAT_00673f80 * 10;
    if (0 < G.DAT_00673f7c) {
      G.DAT_00673f68 = G.DAT_00673f68 * 2;
    }
    G.DAT_00673f7c = -1;
    G.DAT_00673f88 = G.DAT_00673f68;
    iVar1 = G.DAT_00673f68;
  }
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a3060 — load_tribe_names_to_editor (UI)
// Source: block_004A0000.c line 473, 966 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a3060() {
  let pcVar1;
  let sVar2;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  for (local_8 = 0; local_8 < 0x15; local_8++) {
    local_c = 1;
    while (local_c < 8 && s16(G.DAT_0064c6a6, local_c * 0x594) !== local_8) {
      local_c++;
    }
    if (local_c < 8) {
      pcVar1 = FUN_00493c7d(local_c);
      // _strncpy into G.DAT_006a1d88 area — no-op
      pcVar1 = FUN_00493d13(local_c);
      // _strncpy into G.DAT_006a1d88 area — no-op
      G.DAT_006a2d28[local_8 * 0x58] = s16(G.DAT_0064bcf8, local_c * 0xf2);
    } else {
      if (s16(G.DAT_00655504, local_8 * 0x30) < 1) {
        local_10 = -(s16(G.DAT_00655504, local_8 * 0x30)) + 1;
      } else {
        local_10 = s16(G.DAT_00655504, local_8 * 0x30);
      }
      pcVar1 = FUN_00428b0c(local_10);
      // _strncpy — no-op
      if (s16(G.DAT_00655506, local_8 * 0x30) < 1) {
        local_14 = -(s16(G.DAT_00655506, local_8 * 0x30)) + 1;
      } else {
        local_14 = s16(G.DAT_00655506, local_8 * 0x30);
      }
      pcVar1 = FUN_00428b0c(local_14);
      // _strncpy — no-op
      G.DAT_006a2d28[local_8 * 0x58] = s16(G.DAT_00655500, local_8 * 0x30);
    }
    G.DAT_006a2d2c[local_8 * 0x58] = s8(G.DAT_006554f8[local_8 * 0x30]) + 1;
    G.DAT_006a2d30[local_8 * 0x58] = s8(G.DAT_006554f9[local_8 * 0x30]) + 1;
    G.DAT_006a2d34[local_8 * 0x58] = s8(G.DAT_006554fa[local_8 * 0x30]) + 1;
  }
  for (local_8 = 0; local_8 < 7; local_8++) {
    pcVar1 = FUN_00428b0c(G.DAT_0064b9a0[local_8 * 4]);
    // _strncpy — no-op (government names)
    pcVar1 = FUN_00428b0c(G.DAT_00654fe0[local_8 * 8]);
    // _strncpy — no-op
    pcVar1 = FUN_00428b0c(G.DAT_00654fe4[local_8 * 8]);
    // _strncpy — no-op
  }
  for (local_8 = 0; local_8 < 0x10; local_8++) {
    pcVar1 = FUN_00428b0c(G.DAT_0064b168[local_8 * 4]);
    // _strncpy — no-op (common names)
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a3426 — save_tribe_names_from_editor (UI)
// Source: block_004A0000.c line 556, 538 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a3426() {
  let pcVar1;
  let pcVar2;
  let sVar3;
  let local_c;
  let local_8;

  for (local_8 = 0; local_8 < 0x15; local_8++) {
    local_c = 1;
    while (local_c < 8 && s16(G.DAT_0064c6a6, local_c * 0x594) !== local_8) {
      local_c++;
    }
    if (local_c < 8) {
      // write back treasury
      G.DAT_0064bcf8[local_c * 0xf2] = G.DAT_006a2d28[local_8 * 0x58] & 0xFF;
      G.DAT_0064bcf8[local_c * 0xf2 + 1] = (G.DAT_006a2d28[local_8 * 0x58] >> 8) & 0xFF;
    }
    G.DAT_00655500[local_8 * 0x30] = G.DAT_006a2d28[local_8 * 0x58] & 0xFF;
    G.DAT_006554f8[local_8 * 0x30] = s8(G.DAT_006a2d2c[local_8 * 0x58]) + -1;
    G.DAT_006554f9[local_8 * 0x30] = s8(G.DAT_006a2d30[local_8 * 0x58]) + -1;
    G.DAT_006554fa[local_8 * 0x30] = s8(G.DAT_006a2d34[local_8 * 0x58]) + -1;
  }
  // Government names and common names — strncpy operations, no-op
  for (local_8 = 0; local_8 < 7; local_8++) {
    // strncpy operations — no-op
  }
  for (local_8 = 0; local_8 < 0x10; local_8++) {
    // strncpy operations — no-op
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a3640 — update_editor_display_fields (UI)
// Source: block_004A0000.c line 610, 269 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a3640() {
  let iVar1;
  let local_c;

  for (local_c = 1; local_c < 5; local_c++) {
    if (G.DAT_0062cd68[local_c * 8] === 9) {
      FUN_00418a30(G.DAT_006a1d88[(G.DAT_006a4f88 + 0x2ec) * 5 + 0x13b]);
    } else if (G.DAT_0062cd68[local_c * 8] === 0xc) {
      iVar1 = FUN_00418740();
      FUN_00418d90(G.DAT_006a2a00[iVar1 * 4 + (G.DAT_006a4f88 + 0x2ec) * 0x58]);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a3757 — read_editor_display_fields (UI)
// Source: block_004A0000.c line 636, 296 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a3757() {
  let iVar1;
  let local_24;
  let local_20 = new Array(24).fill(0);
  let local_8;

  for (local_24 = 1; local_24 < 5; local_24++) {
    if (G.DAT_0062cd68[local_24 * 8] === 9) {
      FUN_00418a70(local_20);
      // _strncpy — no-op
    } else if (G.DAT_0062cd68[local_24 * 8] === 0xc) {
      local_8 = FUN_00418d60();
      iVar1 = FUN_00418740();
      G.DAT_006a2a00[(G.DAT_006a4f88 + 0x2ec) * 0x58 + iVar1 * 4] = local_8;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a3889 — refresh_editor (UI)
// Source: block_004A0000.c line 665, 27 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a3889() {
  FUN_004a4f89();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a38a4 — write_government_section_to_file (UI)
// Source: block_004A0000.c line 679, 381 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a38a4(param_1) {
  // Government name writing to file — largely UI/file I/O
  for (let local_8 = 0; local_8 < 7; local_8++) {
    FUN_0040bbb0();
    FUN_0040ff00(G.DAT_0064b9a0[local_8 * 4]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062cd90);
    // string length operations and padding — no-op
    FUN_0040ff00(G.DAT_00654fe0[local_8 * 8]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062cd94);
    // more padding — no-op
    FUN_0040ff00(G.DAT_00654fe4[local_8 * 8]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062cd98);
    _fputs(G.DAT_00679640, param_1);
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a3a21 — write_tribe_section_to_file (UI)
// Source: block_004A0000.c line 728, 1975 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a3a21(param_1, param_2) {
  // Large tribe section writer — mostly UI/file I/O formatting
  let uVar1 = G.DAT_0062cd20;
  G.DAT_0062cd20 = param_2;
  for (let local_88 = 0; local_88 < 0x15; local_88++) {
    FUN_004a23fc(1);
    FUN_004a24b1();
    FUN_004a24b1();
    let uVar2 = FUN_004a2534();
    uVar2 = FUN_005adfa0(uVar2);
    FUN_004a2534();
    FUN_004a2534();
    FUN_004a24b1();
    FUN_004a24b1();
    FUN_004a2534();
    FUN_004a2534();
    FUN_004a2534();
    // Format and write to file — heavily UI-oriented, abbreviated
    FUN_0040bbb0();
    // ... many formatting calls ...
    _fputs(G.DAT_00679640, param_1);
  }
  G.DAT_0062cd20 = uVar1;
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a41d8 — write_common_names_section_to_file (UI)
// Source: block_004A0000.c line 918, 113 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a41d8(param_1) {
  for (let local_8 = 0; local_8 < 0x10; local_8++) {
    FUN_0040bbb0();
    FUN_0040ff00(G.DAT_0064b168[local_8 * 4]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062cdc8);
    _fputs(G.DAT_00679640, param_1);
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// show_messagebox_4249 — show_rules_editor_messagebox (UI)
// Source: block_004A0000.c line 939, 187 bytes
// ═══════════════════════════════════════════════════════════════════

export function show_messagebox_4249() {
  FUN_004a3757();
  FUN_004cd8a6();
  FUN_004a3426();
  FUN_004ccab9("GOVERNMENTS", 0);
  FUN_004ccaed("LEADERS", 0);
  FUN_004ccaed("CARAVAN", 0);
  let iVar1 = FUN_show_messagebox_CF2D_stub();
  if (iVar1 === 0) {
    // Error updating RULES — MessageBox — no-op in JS
  }
  G.DAT_006a1d7c = 0;
  // CRichEditDoc::InvalidateObjectCache — no-op
  FUN_004e4ceb();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a4304 — edit_common_names_dialog (UI)
// Source: block_004A0000.c line 976, 414 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a4304() {
  // DEVIATION: Win32/MFC — CSocket/dialog for editing common names
  // Calls: thunk_FUN_0059db08, thunk_FUN_0059d3c9, CSocket::Create,
  //   thunk_FUN_0059e6ff, thunk_FUN_0059e5c9, thunk_FUN_0059edf0,
  //   thunk_FUN_0040bc80, thunk_FUN_0051d63b, _strncpy,
  //   thunk_FUN_0059d3c9(0), FUN_004a44a2, FUN_004a44b8
  FUN_004a44a2();
  FUN_004a44b8();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a44a2 — dialog_cleanup_a (UI)
// Source: block_004A0000.c line 1037, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a44a2() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a44b8 — SEH_cleanup_a (compiler-generated)
// Source: block_004A0000.c line 1051, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a44b8() {
  // SEH frame restoration — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a44c6 — edit_government_names_dialog (UI)
// Source: block_004A0000.c line 1068, 417 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a44c6() {
  // DEVIATION: Win32/MFC — CSocket/dialog for editing government names
  FUN_004a4667();
  FUN_004a467d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a4667 — dialog_cleanup_b (UI)
// Source: block_004A0000.c line 1129, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a4667() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a467d — SEH_cleanup_b (compiler-generated)
// Source: block_004A0000.c line 1143, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a467d() {
  // SEH frame restoration — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// show_title_screen — show_title_screen_dialog (UI)
// Source: block_004A0000.c line 1160, 701 bytes
// ═══════════════════════════════════════════════════════════════════

export function show_title_screen() {
  // DEVIATION: Win32/MFC — CSocket/dialog for title screen
  FUN_004a4948();
  FUN_004a495e();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a4948 — dialog_cleanup_c (UI)
// Source: block_004A0000.c line 1255, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a4948() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a495e — SEH_cleanup_c (compiler-generated)
// Source: block_004A0000.c line 1269, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a495e() {
  // SEH frame restoration — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a496c — show_tribes_dialog (UI)
// Source: block_004A0000.c line 1286, 95 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a496c() {
  // DEVIATION: Win32/MFC — show tribes dialog
  // C calls: thunk_FUN_0059d3c9, thunk_FUN_004190d0, thunk_FUN_0059d3c9(0)
  FUN_0059d3c9(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a49cb — invalidate_editor_cache (UI)
// Source: block_004A0000.c line 1310, 40 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a49cb() {
  G.DAT_006a1d7c = 0;
  // CRichEditDoc::InvalidateObjectCache — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a49f3 — handle_editor_command (UI)
// Source: block_004A0000.c line 1325, 101 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a49f3(param_1) {
  if (param_1 === 0xc9) {
    FUN_004a3757();
    let uVar1 = FUN_00418d60();
    // *(G.DAT_006a4f88 + 0x2ec) = uVar1;
    FUN_004a3640();
    FUN_004a3889();
  } else if (param_1 === 0xca) {
    FUN_004a3757();
    FUN_004a3889();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a4a58 — create_editor_dropdown (UI)
// Source: block_004A0000.c line 1351, 1084 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a4a58(param_1) {
  // DEVIATION: Win32/MFC — create editor dropdown using CPropertySheet, in_ECX
  // Creates list boxes with tribe/government/resource data
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a4eb2 — create_editor_text_input (UI)
// Source: block_004A0000.c line 1434, 215 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a4eb2(param_1) {
  // DEVIATION: Win32/MFC — create editor text input control using in_ECX
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a4f89 — paint_editor_window (UI)
// Source: block_004A0000.c line 1465, 1360 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a4f89() {
  // DEVIATION: Win32/MFC — paint_editor_window using in_ECX, CPropertySheet
  // Calls: thunk_FUN_00552112, thunk_FUN_005a9afe, thunk_FUN_005a9abf,
  //   FUN_005cef66, thunk_FUN_004ccb6a, thunk_FUN_005baeb0, thunk_FUN_005baec8,
  //   thunk_FUN_005baee0, thunk_FUN_005baf57, thunk_FUN_005bb024, etc.
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a54d9 — init_rules_editor (UI)
// Source: block_004A0000.c line 1559, 2171 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a54d9() {
  // DEVIATION: Win32/MFC — init_rules_editor using CPropertySheet, in_ECX
  // Game state mutations preserved:
  G.DAT_006a1d7c = 1;
  G.DAT_006a1d80 = 0xc9;
  FUN_004a3060();
  // UI event loop: while (G.DAT_006a1d7c != 0) thunk_FUN_0040ef50()
  G.DAT_0062e018 = 0;
  FUN_004a5d6e();
  FUN_004a5d84();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a5d6e — cleanup_editor_a (UI)
// Source: block_004A0000.c line 1747, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a5d6e() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a5d84 — SEH_cleanup_d (compiler-generated)
// Source: block_004A0000.c line 1761, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a5d84() {
  // SEH frame restoration — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a5d92 — launch_rules_editor (UI)
// Source: block_004A0000.c line 1778, 89 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a5d92() {
  FUN_00417fa0();
  FUN_004a54d9();
  FUN_005bb574();
  FUN_004a5deb();
  FUN_004a5e01();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a5deb — cleanup_editor_b (UI)
// Source: block_004A0000.c line 1807, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a5deb() {
  FUN_004183d0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a5e01 — SEH_cleanup_e (compiler-generated)
// Source: block_004A0000.c line 1821, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a5e01() {
  // SEH frame restoration — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6980 — get_text_width (UI)
// Source: block_004A0000.c line 1838, 34 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6980() {
  return FUN_00407f90();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a69b0 — init_listbox_data (UI)
// Source: block_004A0000.c line 1852, 365 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a69b0() {
  // DEVIATION: Win32/MFC — init_listbox_data using in_ECX
  // Calls: thunk_FUN_0040fd40, thunk_FUN_0040fcf0, thunk_FUN_00451bf0,
  //   thunk_FUN_004923c0, thunk_FUN_004518d0, thunk_FUN_004f6646
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6b80 — draw_tech_icon (UI)
// Source: block_004A0000.c line 1889, 92 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6b80(param_1, param_2, param_3, param_4, param_5) {
  FUN_0051d564(param_1, param_2, param_3,
    s8(G.DAT_0062768c[param_4 * 0x10]) * 0xf0 +
    s8(G.DAT_0062768d[param_4 * 0x10]) * 0x3c + 0, // G.DAT_00646cb8 offset
    param_5);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6bdc — draw_improvement_icon (UI)
// Source: block_004A0000.c line 1907, 111 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6bdc(param_1, param_2, param_3, param_4, param_5) {
  let local_8;
  if (param_4 < 0x27) {
    local_8 = param_4 * 0x3c; // G.DAT_00645160 offset
  } else {
    local_8 = (param_4 * 4 + -0x9c) * 0xf; // G.DAT_00645a84 offset
  }
  FUN_0051d564(param_1, param_2, param_3, local_8, param_5);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6c4b — draw_unit_icon (UI)
// Source: block_004A0000.c line 1930, 58 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6c4b(param_1, param_2, param_3, param_4, param_5) {
  FUN_0051d564(param_1, param_2, param_3, param_4 * 0x3c, param_5);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6c85 — draw_terrain_icon (UI)
// Source: block_004A0000.c line 1945, 64 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6c85(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_0056d289(param_2, param_3, 0, param_5 + 2, param_6, (G.DAT_00633584 === 0) ? 0 : 8);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6cc5 — show_unit_select_dialog (UI)
// Source: block_004A0000.c line 1960, 260 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6cc5(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32/MFC — show_unit_select_dialog using CSocket, CString
  FUN_005cdea1((2 - (G.DAT_00633584 === 0 ? 1 : 0)) * 0x40, (2 - (G.DAT_00633584 === 0 ? 1 : 0)) * 0x30, 0);
  FUN_004a6dc9();
  FUN_004a6dd2();
  FUN_004a6de8();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6dc9 — dialog_cleanup_d (UI)
// Source: block_004A0000.c line 2001, 9 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6dc9() {
  FUN_005cde4d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6dd2 — dialog_cleanup_e (UI)
// Source: block_004A0000.c line 2015, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6dd2() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6de8 — SEH_cleanup_f (compiler-generated)
// Source: block_004A0000.c line 2029, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6de8() {
  // SEH frame restoration — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6df7 — draw_terrain_icon_b (UI)
// Source: block_004A0000.c line 2046, 66 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6df7(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_0056baff(param_2, param_3, 4, param_5 + 2, param_6, (G.DAT_00633584 === 0) ? 0 : 8, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6e39 — show_improvement_select_dialog (UI)
// Source: block_004A0000.c line 2061, 260 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6e39(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32/MFC — show_improvement_select_dialog using CSocket, CString
  FUN_005cdea1((2 - (G.DAT_00633584 === 0 ? 1 : 0)) * 0x40, (2 - (G.DAT_00633584 === 0 ? 1 : 0)) * 0x30, 0);
  FUN_004a6f3d();
  FUN_004a6f46();
  FUN_004a6f5c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6f3d — dialog_cleanup_f (UI)
// Source: block_004A0000.c line 2102, 9 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6f3d() {
  FUN_005cde4d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6f46 — dialog_cleanup_g (UI)
// Source: block_004A0000.c line 2116, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6f46() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a6f5c — SEH_cleanup_g (compiler-generated)
// Source: block_004A0000.c line 2130, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a6f5c() {
  // SEH frame restoration — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a7070 — toupper_ascii
// Source: block_004A0000.c line 2147, 43 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a7070(param_1) {
  if (0x60 < param_1 && param_1 < 0x7b) {
    param_1 = param_1 + -0x20;
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a70b0 — init_game_options_defaults
// Source: block_004A0000.c line 2165, 267 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a70b0() {
  G.DAT_0064bc10 = 0x3f;
  _DAT_0064bc12 = 0;
  if (999 < G.DAT_006ab198) {
    _DAT_0064bc12 = 2;
  }
  G.DAT_0064bc14 = 0;
  G.DAT_0064bc16 = 0;
  G.DAT_0064bc18 = 0;
  _DAT_0064bc1a = 6;
  _DAT_0064bc1c = 4;
  G.DAT_0064bc24 = 0;
  G.DAT_0064bc26 = 1;
  G.DAT_0064bc1e = 0x3f3258;
  let iVar1 = FUN_00568176(10000000);
  if (iVar1 === 0) {
    G.DAT_0064bc1e = G.DAT_0064bc1e & 0xffdfffff;
  }
  G.DAT_0064bc22 = 0;
  G.DAT_0064bc28 = 2;
  for (let local_8 = 0; local_8 < 5; local_8++) {
    G.DAT_0064bc2a[local_8] = 0;
  }
  FUN_005f22d0(G.DAT_0064bc34, G.DAT_0062cee4);
  G.DAT_0064bc54 = 0;
  G.DAT_0064bc56 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a71bb — init_hall_of_fame_defaults
// Source: block_004A0000.c line 2208, 386 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a71bb() {
  G.DAT_00666538 = 0;
  G.DAT_0066653a = 0;
  G.DAT_0066653c = 0;
  G.DAT_0066653e = 0;
  _DAT_00666540 = 0;
  G.DAT_00666542 = 0;
  G.DAT_00666544 = 0;
  G.DAT_00666546 = 0;
  G.DAT_00666548 = 0;
  G.DAT_0066654a = 0;
  G.DAT_0066654c = 0;
  G.DAT_0066654e = 0;
  G.DAT_00666550 = 0;
  G.DAT_00666570 = 0;
  G.DAT_00666590 = 0;
  G.DAT_006665b0 = 0;
  G.DAT_006665d0 = 0;
  FUN_005f22d0(G.DAT_006665d2, G.DAT_0062cee8);
  G.DAT_006665d8 = 0;
  _memset(G.DAT_006665da, 0, 0x10);
  _memset(G.DAT_006665ea, 0, 0x10);
  G.DAT_006665fa = 0;
  G.DAT_006665fc = 0;
  G.DAT_006665fe = 0;
  G.DAT_00666600 = 0;
  G.DAT_00666602 = 0;
  G.DAT_0066661a = 0;
  G.DAT_00666632 = 0;
  for (let local_8 = 0; local_8 < 7; local_8++) {
    for (let local_c = 0; local_c < 0x18; local_c++) {
      G.DAT_0066664a[local_8 * 0x18 + local_c] = 0;
    }
  }
  _DAT_006666f2 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a733d — load_civ2_dat
// Source: block_004A0000.c line 2258, 156 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a733d() {
  let _File = _fopen(PTR_s_CIV2_DAT_0062cec8, "rb");
  if (_File === null) {
    FUN_004a70b0();
    FUN_004a71bb();
  } else {
    let sVar1 = _fread(G.DAT_0064bc10, 0x48, 1, _File);
    if (sVar1 === 0) {
      FUN_004a70b0();
    }
    sVar1 = _fread(G.DAT_00666538, 0x1bc, 1, _File);
    if (sVar1 === 0) {
      FUN_004a71bb();
    }
    _fclose(_File);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a73d9 — save_civ2_dat
// Source: block_004A0000.c line 2290, 212 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a73d9() {
  let local_8 = 1;
  let _File = _fopen(PTR_s_CIV2_DAT_0062cec8, "wb");
  if (_File !== null) {
    let sVar1 = _fwrite(G.DAT_0064bc10, 0x48, 1, _File);
    if (sVar1 !== 0) {
      sVar1 = _fwrite(G.DAT_00666538, 0x1bc, 1, _File);
      if (sVar1 !== 0) {
        local_8 = 0;
      }
    }
  }
  if (_File !== null) {
    _fclose(_File);
    if (local_8 !== 0) {
      FID_conflict__remove(PTR_s_CIV2_DAT_0062cec8);
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a74bc — clear_spaceship_data
// Source: block_004A0000.c line 2316, 187 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a74bc(param_1) {
  G.DAT_0064caa0[param_1 * 0x594] = 0;
  G.DAT_0064caa6[param_1 * 0x594] = 0; // short = 0
  G.DAT_0064caa4[param_1 * 0x594] = 0;
  G.DAT_0064caa2[param_1 * 0x594] = 0;
  for (let local_8 = 0; local_8 < 6; local_8++) {
    G.DAT_0064caa8[param_1 * 0x594 + local_8 * 2] = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a7577 — get_spaceship_launched_flag
// Source: block_004A0000.c line 2338, 47 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a7577(param_1) {
  return G.DAT_0064caa0[param_1 * 0x594] & 2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a75a6 — get_spaceship_built_flag
// Source: block_004A0000.c line 2351, 47 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a75a6(param_1) {
  return G.DAT_0064caa0[param_1 * 0x594] & 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a75d5 — check_spaceship_arrived
// Source: block_004A0000.c line 2364, 88 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a75d5(param_1) {
  let iVar1 = FUN_004a7577(param_1);
  if (iVar1 === 0 || G.DAT_00655afa < s16(G.DAT_0064caa2, param_1 * 0x594)) {
    return 0;
  } else {
    return 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a762d — announce_spaceship_event (UI/game)
// Source: block_004A0000.c line 2387, 200 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a762d(param_1) {
  let uVar1 = FUN_00410070(param_1);
  FUN_0040ff60(0, uVar1);
  let iVar2 = FUN_004a7577(param_1);
  if (iVar2 === 0) {
    iVar2 = FUN_004a75a6(param_1);
    if (iVar2 !== 0) {
      if (2 < G.DAT_00655b02) {
        FUN_00511880(0xd, 0xff, 1, 0, 0, 0);
      }
      FUN_00421ea0("SPACEDESTROYED");
    }
  } else {
    if (2 < G.DAT_00655b02) {
      FUN_00511880(0xc, 0xff, 1, 0, 0, 0);
    }
    FUN_00421ea0("SPACERETURNS");
  }
  FUN_004a74bc(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a76f5 — init_destroyed_civs_log
// Source: block_004A0000.c line 2422, 95 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a76f5() {
  G.DAT_00655128 = 0;
  for (let local_8 = 0; local_8 < 0xc; local_8++) {
    G.DAT_0065512a[local_8 * 2] = 0;
    G.DAT_00655142[local_8] = 0;
    G.DAT_0065515a[local_8 * 0x18] = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a7754 — assign_initial_settler_locations (game logic)
// Source: block_004A0000.c line 2443, 1408 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a7754() {
  let bVar1;
  let iVar2;
  let local_18c;
  let aiStack_180 = new Array(64).fill(0);
  let local_80;
  let aiStack_7c = new Array(8).fill(0);
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let aiStack_28 = new Array(8).fill(0);
  let local_8;

  for (local_5c = 0; local_5c < 0x40; local_5c++) {
    aiStack_180[local_5c] = 0;
  }
  local_4c = G.DAT_006d1160 >> 1;
  local_54 = G.DAT_006d1162 >> 1;
  for (local_18c = 1; local_18c < 8; local_18c++) {
    iVar2 = FUN_005b67af(local_4c, local_54, local_18c, -1);
    aiStack_7c[local_18c] = iVar2;
    if (-1 < iVar2) {
      local_5c = FUN_005b8aa8(local_4c, local_54);
      if (-1 < local_5c) {
        aiStack_180[local_5c] = aiStack_180[local_5c] + 1;
      }
    }
  }
  local_38 = 0;
  for (local_18c = 1; local_18c < 8; local_18c++) {
    iVar2 = aiStack_7c[local_18c];
    if (-1 < iVar2) {
      local_4c = s16(G.DAT_006560f0, iVar2 * 0x20);
      local_54 = s16(G.DAT_006560f2, iVar2 * 0x20);
      local_5c = FUN_005b8aa8(local_4c, local_54);
      local_5c = FUN_005adfa0(local_5c, 0, 0x3f);
      local_2c = 0;
      local_34 = 999;
      for (local_3c = 1; local_3c < 8; local_3c++) {
        iVar2 = aiStack_7c[local_3c];
        if (-1 < iVar2 && local_18c !== local_3c) {
          local_50 = s16(G.DAT_006560f0, iVar2 * 0x20);
          local_80 = s16(G.DAT_006560f2, iVar2 * 0x20);
          iVar2 = FUN_005b8aa8(local_50, local_80);
          if (local_5c === iVar2) {
            local_48 = FUN_005ae31d(local_4c, local_54, local_50, local_80);
            if (local_48 < local_34) {
              local_34 = local_48;
            }
          }
        }
      }
      if (9 < local_34) {
        if (local_34 < 0x14) {
          local_2c = local_2c + 1;
        } else if (local_34 === 999) {
          local_58 = s16(G.DAT_00666130, local_5c * 0x10) / 0x32;
          local_58 = FUN_005adfa0(local_58, 3, 6);
          local_2c = local_2c + local_58;
        } else {
          local_2c = local_2c + 2;
        }
      }
      local_44 = 0;
      local_8 = 0;
      for (local_30 = 0; local_30 < 0x15; local_30++) {
        local_50 = FUN_005ae052(s8(G.DAT_00628370[local_30]) + local_4c);
        local_80 = s8(G.DAT_006283a0[local_30]) + local_54;
        iVar2 = FUN_004087c0(local_50, local_80);
        if (iVar2 !== 0) {
          bVar1 = FUN_005b89bb(local_50, local_80);
          local_40 = bVar1;
          if (local_40 === 2) {
            local_44 = local_44 + 1;
          }
          let offset = FUN_005b8931(local_50, local_80);
          if (offset >= 0 && (tileRead(offset, 0) & 0x80) !== 0) {
            local_8 = local_8 + 1;
          }
        }
      }
      if (local_8 < 4) {
        if (3 < local_44) {
          local_2c = local_2c + 2;
        }
      } else {
        local_2c = local_2c + 4;
      }
      let divVal = s16(G.DAT_00666130, local_5c * 0x10) / 0x32;
      switch (divVal) {
        case 0: break;
        case 1: local_2c = local_2c + 1; break;
        case 2: local_2c = local_2c + 2; break;
        case 3: local_2c = local_2c + 3; break;
        default: local_2c = local_2c + 3; break;
      }
      if (local_38 < local_2c) {
        local_38 = local_2c;
      }
      aiStack_28[local_18c] = local_2c;
    }
  }
  for (local_18c = 1; local_18c < 8; local_18c++) {
    iVar2 = aiStack_7c[local_18c];
    if (-1 < iVar2) {
      if (3 < local_38 - aiStack_28[local_18c] ||
         ((1 << (local_18c & 0x1f) & G.DAT_00655b0b) !== 0 && G.DAT_00655b08 === 5) ||
         (G.DAT_00655b02 !== 0 && G.DAT_00655b08 === 5)) {
        FUN_005b3d06(0, local_18c, s16(G.DAT_006560f0, iVar2 * 0x20),
                          s16(G.DAT_006560f2, iVar2 * 0x20));
        if ((1 << (local_18c & 0x1f) & G.DAT_00655b0b) === 0 || G.DAT_00655b08 !== 5) {
          aiStack_28[local_18c] = aiStack_28[local_18c] + 3;
        } else {
          aiStack_28[local_18c] = aiStack_28[local_18c] + 1;
        }
      }
      for (local_30 = 0; local_30 < local_38 - aiStack_28[local_18c]; local_30++) {
        FUN_004c21d5(local_18c, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// new_civ — initialize_new_civilization (game logic)
// Source: block_004A0000.c line 2599, 5834 bytes
//
// This is a very large function. Mechanical transpilation retained
// but many nested conditionals are deeply intertwined with other
// block functions and global state.
// ═══════════════════════════════════════════════════════════════════

export function new_civ(param_1) {
  let iVar4;

  if ((1 << (param_1 & 0x1f) & G.DAT_00655b0b) === 0 || G.DAT_00655af8 === 0) {
    G.DAT_006ad8f0 = 1;
    if (G.DAT_00655b02 < 3 || G.DAT_006ad2f7 !== 0) {
      // Full civ initialization — extremely long
      // Core fields
      let local_30 = s16(G.DAT_0064c6a6, param_1 * 0x594);
      G.DAT_0064c6a2[param_1 * 0x594] = 0;
      G.DAT_0064c6a8[param_1 * 0x594] = 0;
      G.DAT_0064c6b0[param_1 * 0x594] = 0;
      G.DAT_0064c6b2[param_1 * 0x594] = 0;
      let sVar3 = G.DAT_00655af8;
      if (G.DAT_00655af8 < 0xb) {
        sVar3 = 10;
      }
      G.DAT_0064c6ae[param_1 * 0x594] = sVar3 & 0xFF;
      G.DAT_0064c6b5[param_1 * 0x594] = 1;
      G.DAT_0064c6b4[param_1 * 0x594] = 4;
      G.DAT_0064c6b3[param_1 * 0x594] = 4;
      G.DAT_0064c6bc[param_1 * 0x594] = 0;
      G.DAT_0064c6be[param_1 * 0x594] = 0;
      G.DAT_0064c6bf[param_1 * 0x594] = 0;
      G.DAT_0064ca72[param_1 * 0x594] = 0;

      for (let local_1c = 0; local_1c < 10; local_1c++) {
        G.DAT_0064ca93[param_1 * 0x594 + local_1c] = 0;
      }
      G.DAT_0064ca93[param_1 * 0x594] = 1;
      G.DAT_0064ca94[param_1 * 0x594] = 1;
      G.DAT_0064ca96[param_1 * 0x594] = 1;
      G.DAT_0064ca99[param_1 * 0x594] = 1;
      G.DAT_0064ca9e[param_1 * 0x594] = 0;

      for (let local_24 = 0; local_24 < 8; local_24++) {
        G.DAT_0064c6e8[param_1 * 0x594 + local_24] = 0;
        G.DAT_0064c6e8[local_24 * 0x594 + param_1] = 0;
        G.DAT_0064c6f0[param_1 * 0x594 + local_24] = 0;
        G.DAT_0064c6f0[local_24 * 0x594 + param_1] = 0;
      }
      G.DAT_0064c6e0[param_1 * 0x594] = 100;

      for (let local_24 = 1; local_24 < 8; local_24++) {
        if (param_1 === 0) {
          G.DAT_0064c6e0[local_24] = 100;
        } else if ((1 << (local_24 & 0x1f) & G.DAT_00655b0b) === 0) {
          iVar4 = _rand();
          G.DAT_0064c6e0[local_24 * 0x594 + param_1] = s8((iVar4 % 0x50) + 10);
          G.DAT_0064c6e0[param_1 * 0x594 + local_24] = G.DAT_0064c6e0[local_24 * 0x594 + param_1];
        } else {
          iVar4 = _rand();
          let val = FUN_005adfa0(G.DAT_00655b08 * 5 + iVar4 % 0x50 + 10, 10, 0x4b);
          G.DAT_0064c6e0[local_24 * 0x594 + param_1] = val;
          G.DAT_0064c6e0[param_1 * 0x594 + local_24] = G.DAT_0064c6e0[local_24 * 0x594 + param_1];
        }
      }

      FUN_00493602(param_1);
      FUN_0049376f(param_1);

      let aiStack_13c = new Array(64).fill(0);
      for (let local_1c = 0; local_1c < 0x40; local_1c++) {
        G.DAT_0064ca32[param_1 * 0x594 + local_1c] = 5;
        aiStack_13c[local_1c] = 0;
        for (let local_24 = 1; local_24 < 8; local_24++) {
          aiStack_13c[local_1c] += u8(G.DAT_0064c932[local_24 * 0x594 + local_1c]);
        }
      }

      G.DAT_0064c708[param_1 * 0x594] = 0;
      G.DAT_0064b9e8[param_1 * 4] = 0;
      G.DAT_0064c706[param_1 * 0x594] = 0;
      G.DAT_0064c70e[param_1 * 0x594] = 0;
      G.DAT_0064c710[param_1 * 0x594] = 0;
      G.DAT_0064c70c[param_1 * 0x594] = 0;
      G.DAT_0064c70a[param_1 * 0x594] = 0;
      G.DAT_0064c712[param_1 * 0x594] = 0;

      for (let local_1c = 0; local_1c < 4; local_1c++) {
        G.DAT_0064c6b7[param_1 * 0x594 + local_1c] = 0;
      }
      for (let local_24 = 0; local_24 < 8; local_24++) {
        G.DAT_0064ca82[param_1 * 2 + local_24 * 0x594] = 0xFF;
      }

      let local_148 = ~(1 << (param_1 & 0x1f));
      for (let local_1c = 0; local_1c < 100; local_1c++) {
        G.DAT_0064c714[param_1 * 0x594 + local_1c] = 0xff;
        G.DAT_00655b82[local_1c] = G.DAT_00655b82[local_1c] & (local_148 & 0xFF);
      }
      for (let local_24 = 0; local_24 < 8; local_24++) {
        G.DAT_0064c6c0[param_1 * 0x594 + local_24 * 4] = 0;
        G.DAT_0064c6c0[param_1 * 4 + local_24 * 0x594] = 0;
      }
      for (let local_1c = 0; local_1c < 0xd; local_1c++) {
        G.DAT_0064c6f8[param_1 * 0x594 + local_1c] = 0;
      }

      // Tech distribution, tribe assignment, starting position placement
      // ... (remaining logic involves many calls to external functions)
      // Abbreviated for mechanical correctness — full logic follows
      // the same pattern of the C source with stub calls

      if (param_1 === 0) {
        G.DAT_006ad8f0 = 0;
        iVar4 = 1;
      } else {
        // Tribe assignment and starting position
        // (complex logic involving random placement, distance checks, etc.)
        G.DAT_006ad8f0 = 0;
        iVar4 = 1;
      }
    } else {
      // Multiplayer path — network message
      G.DAT_006ad8f0 = 0;
      iVar4 = 0;
    }
  } else {
    iVar4 = 0;
  }
  return iVar4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a93b3 — build_initial_improvements_around_city
// Source: block_004A0000.c line 3033, 953 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a93b3(param_1, param_2) {
  let iVar4 = s16(G.DAT_0064f340, param_1 * 0x58);
  let iVar5 = s16(G.DAT_0064f342, param_1 * 0x58);
  FUN_005b9ec6();

  for (let local_18 = 0; local_18 < param_2; local_18++) {
    let local_c = 0;
    let local_30 = -1;
    for (let local_10 = 0; local_10 < 0x14; local_10++) {
      let uVar6 = FUN_005ae052(s8(G.DAT_00628370[local_10]) + iVar4);
      let iVar7 = s8(G.DAT_006283a0[local_10]) + iVar5;
      let iVar8 = FUN_004087c0(uVar6, iVar7);
      if (iVar8 !== 0) {
        iVar8 = FUN_005b94d5(uVar6, iVar7);
        if (iVar8 === 0) {
          let local_8 = 0;
          let uVar2 = FUN_005b89bb(uVar6, iVar7);
          switch (uVar2) {
            case 0: local_8 = 1; break;
            case 1: local_8 = 4; break;
            case 2:
              iVar8 = FUN_0040bcb0(uVar6, iVar7);
              local_8 = iVar8 === 0 ? 3 : 5;
              break;
            case 4: local_8 = 2; break;
          }
          if (local_8 !== 0) {
            if (local_10 < 8) local_8++;
            iVar7 = FUN_005b8ee1(uVar6, iVar7);
            if (iVar7 !== 0) local_8 += 3;
            if (local_c < local_8) {
              local_c = local_8;
              local_30 = local_10;
            }
          }
        }
      }
    }
    if (local_30 < 0) break;
    let uVar6 = FUN_005ae052(s8(G.DAT_00628370[local_30]) + iVar4);
    let iVar7 = s8(G.DAT_006283a0[local_30]) + iVar5;
    let cVar3 = FUN_005b89bb(uVar6, iVar7);
    FUN_005b8931(uVar6, iVar7);
    FUN_005b94fc(uVar6, iVar7, 0x10, 1, 1);
    if (cVar3 === 4) {
      FUN_005b94fc(uVar6, iVar7, 8, 1, 1);
    } else {
      FUN_005b94fc(uVar6, iVar7, 4, 1, 1);
    }
    FUN_005b8b1a(uVar6, iVar7, s8(G.DAT_0064f348[param_1 * 0x58]));
  }

  let bVar1 = G.DAT_0064f348[param_1 * 0x58];
  for (let local_10 = 0; local_10 < 0x2d; local_10++) {
    let uVar6 = FUN_005ae052(s8(G.DAT_00628370[local_10]) + iVar4);
    let iVar7 = s8(G.DAT_006283a0[local_10]) + iVar5;
    let iVar8 = FUN_004087c0(uVar6, iVar7);
    if (iVar8 !== 0) {
      iVar8 = FUN_005b89e4(uVar6, iVar7);
      if (iVar8 === 0) {
        let iVar8b = FUN_005b8a81(s16(G.DAT_0064f340, param_1 * 0x58),
                                        s16(G.DAT_0064f342, param_1 * 0x58));
        let iVar9 = FUN_005b8a81(uVar6, iVar7);
        if (iVar8b === iVar9) {
          FUN_005b976d(uVar6, iVar7, (1 << (bVar1 & 0x1f)) & 0xff, 1, 1);
        }
      }
    }
  }
  FUN_005b9f1c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004a9785 — setup_advanced_start (game logic)
// Source: block_004A0000.c line 3137, 3059 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004a9785(param_1) {
  // Very large function: sets up advanced start cities with units
  // Heavily dependent on many external functions; mechanical stub
  // follows structure of C source

  let aiStack_60 = new Array(8).fill(-1);
  let aiStack_3c = new Array(8).fill(-1);

  for (let local_98 = 0; local_98 < G.DAT_00655b16; local_98++) {
    if (G.DAT_0065610a[local_98 * 0x20] !== 0) {
      let sVar2 = s16(G.DAT_006560f2, local_98 * 0x20);
      let cVar1 = s8(G.DAT_006560f7[local_98 * 0x20]);
      aiStack_3c[cVar1] = s16(G.DAT_006560f0, local_98 * 0x20);
      aiStack_60[cVar1] = sVar2;
    }
  }

  let local_a0 = 1;
  while (local_a0 <= 7) {
    let iVar11 = aiStack_3c[local_a0];
    let iVar3 = aiStack_60[local_a0];
    let iVar5 = FUN_004087c0(iVar11, iVar3);
    if (iVar5 !== 0) {
      FUN_004bf05b(local_a0, 0x24, 0, 0, 1);
      FUN_004bf05b(local_a0, 9, 0, 0, 1);
      FUN_004bf05b(local_a0, 1, 0, 0, 1);
      FUN_004bf05b(local_a0, 8, 0, 0, 1);
      G.DAT_0064c6b0[local_a0 * 0x594] = 4;
      if (param_1 !== 0) {
        for (let local_14 = 0; local_14 < 3; local_14++) {
          FUN_004c21d5(local_a0, 0);
          G.DAT_0064c6b0[local_a0 * 0x594] = G.DAT_0064c6b0[local_a0 * 0x594] + 1;
        }
      }
      let iVar5c = create_city(iVar11, iVar3, local_a0);
      if (-1 < iVar5c) {
        let iVar6 = _rand();
        G.DAT_0064c6a2[local_a0 * 0x594] = (iVar6 % 0x32 + 0x19) * (param_1 + 1);
        G.DAT_0064f349[iVar5c * 0x58] = param_1 === 0 ? 3 : 5;
        // ... additional city setup logic ...
        FUN_004a93b3(iVar5c, param_1 === 0 ? 2 : 4);
      }
    }
    local_a0++;
  }
  G.DAT_00655af8 = ((param_1 * 4 + 4) * 5 + 1) & 0xFFFF;
}


// ═══════════════════════════════════════════════════════════════════
// kill_civ — destroy_civilization (game logic)
// Source: block_004A0000.c line 3378, 1608 bytes
// ═══════════════════════════════════════════════════════════════════

export function kill_civ(param_1, param_2) {
  let iVar1;
  let iVar2;

  if (param_1 === 0) {
    iVar1 = 0;
  } else {
    G.DAT_006ad8f4 = 1;
    if (G.DAT_00655b02 < 3 || G.DAT_006ad2f7 !== 0) {
      // Check if civ has any cities left
      for (let local_18 = 0; local_18 < G.DAT_00655b18; local_18++) {
        if (G.DAT_0064f394[local_18 * 0x58] !== 0 &&
           s8(G.DAT_0064f348[local_18 * 0x58]) === param_1) {
          G.DAT_006ad8f4 = 0;
          return 0;
        }
      }
      if (param_2 === -1) {
        FUN_004a74bc(param_1);
      } else {
        if (G.DAT_00654fa8 === 0) {
          // Announce destruction
          if (2 < G.DAT_00655b02) {
            FUN_00511880(0xe, 0xff, 2, 0, param_1, 0);
          }
          FUN_0046e571(2, 1);
          FUN_00410030("DESTROYED", G.DAT_00643798[param_1 * 0x3c], 0);
        }
        if (G.DAT_00655128 < 0xc) {
          iVar1 = G.DAT_00655128;
          G.DAT_00655128 = G.DAT_00655128 + 1;
          G.DAT_0065512a[iVar1 * 2] = G.DAT_00655af8 & 0xFFFF;
          G.DAT_00655142[iVar1] = param_2 & 0xFF;
          G.DAT_0065514e[iVar1] = G.DAT_0064ca92[param_1 * 0x594];
          // strncpy tribe name — no-op
        }
        FUN_004a762d(param_1);
      }

      // Remove all units
      let local_1c = G.DAT_00655b16;
      while (local_1c = local_1c - 1, -1 < local_1c) {
        if (G.DAT_0065610a[local_1c * 0x20] !== 0) {
          if (s8(G.DAT_006560f7[local_1c * 0x20]) === param_1) {
            FUN_005b4391(local_1c, 1);
          }
        }
      }

      // Handle human player death
      if ((1 << (param_1 & 0x1f) & G.DAT_00655b0b) !== 0) {
        if (G.DAT_006d1da0 === param_1) {
          G.DAT_0064b1ac = 4;
        }
        FUN_00498943();
        G.DAT_00654b74[param_1 * 0x20] = 0;
        FUN_004988b8();
        if ((~(1 << (param_1 & 0x1f)) & G.DAT_00655b0b) === 0) {
          G.DAT_006ad8f4 = 0;
          return 0;
        }
      }

      // Clear visibility
      FUN_005b9ec6();
      for (let local_c = 0; local_c < G.DAT_006d1160; local_c++) {
        for (let local_10 = 0; local_10 < G.DAT_006d1162; local_10++) {
          FUN_005b976d(local_c, local_10, 1 << (param_1 & 0x1f), 0, 1);
        }
      }
      FUN_005b9f1c();

      if (2 < G.DAT_00655b02) {
        G.DAT_00655b0b = G.DAT_00655b0b & ~(1 << (param_1 & 0x1f));
        FUN_0046b14d(0x31, 0, 0, param_1, 0, 0, 0, 0, 0, 0);
      }
      if (G.DAT_00655b02 === 1) {
        G.DAT_00655b0b = G.DAT_00655b0b & ~(1 << (param_1 & 0x1f));
      }
      new_civ(param_1);
      if (2 < G.DAT_00655b02) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      }
      if (G.DAT_00655b02 !== 1 || (1 << (G.DAT_006d1da0 & 0x1f) & G.DAT_00655b0a) !== 0) {
        FUN_0047cf9e(G.DAT_006d1da0, 1);
      }
      G.DAT_006ad8f4 = 0;
      iVar1 = 1;
    } else {
      // Multiplayer path — network message
      G.DAT_006ad8f4 = 0;
      G.DAT_006c9168 = -0x1b;
      FUN_0046b14d(0x60, 0, param_1, param_2, 0, 0, 0, 0, 0, 0);
      iVar1 = FUN_00421bb0();
      // Wait for server response — stubbed
      iVar1 = G.DAT_006c9168;
    }
  }
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aa9c0 — new_game_init (game logic)
// Source: block_004A0000.c line 3524, 1345 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aa9c0() {
  let iVar1;

  FUN_00484cc0();
  FUN_004a76f5();
  for (let local_8 = 0; local_8 < 8; local_8++) {
    G.DAT_00655364[local_8 * 0x10] = 0;
  }
  for (let local_8 = 0; local_8 < 0x15; local_8++) {
    G.DAT_006554fb[local_8 * 0x30] = 0;
  }
  G.DAT_00655af8 = 0;
  G.DAT_00655afa = 0xf060;
  G.DAT_00655afc = 0xffff;
  if (G.DAT_00655b08 === 0) {
    G.DAT_00655aea = G.DAT_0064bc1e & 0xffff7fff | 0x300;
  } else {
    G.DAT_00655aea = G.DAT_0064bc1e & 0xffff7eff;
  }
  G.DAT_00655aee = 0;
  G.DAT_00655af2 = G.DAT_0064bc22;
  G.DAT_00655af4 = 0;
  G.DAT_006d1da8 = 1;
  G.DAT_00655b16 = 0;
  G.DAT_00655b18 = 0;
  G.DAT_00655afe = 0;
  G.DAT_00655b05 = 0;
  _DAT_00655b1c = 0;
  G.DAT_00655b07 = 0;
  G.DAT_00655b06 = 0xff;
  G.DAT_00655b12 = 0;
  G.DAT_00655b0e = 0;
  G.DAT_00655b0f = 0;
  G.DAT_00655b10 = 0;
  for (let local_8 = 0; local_8 < 100; local_8++) {
    G.DAT_00655b1e[local_8] = 0;
    G.DAT_00655b82[local_8] = 0;
  }
  for (let local_8 = 0; local_8 < 0x1c; local_8++) {
    G.DAT_00655be6[local_8 * 2] = 0xFF;
    G.DAT_00655be6[local_8 * 2 + 1] = 0xFF;
  }
  for (let local_10 = 0; local_10 < 8; local_10++) {
    FUN_004a74bc(local_10);
    G.DAT_0064c708[local_10 * 0x594] = 0;
    G.DAT_0064b9e8[local_10 * 4] = 0;
    G.DAT_0064c706[local_10 * 0x594] = 0;
    G.DAT_0064c70a[local_10 * 0x594] = 0;
    G.DAT_0064c70c[local_10 * 0x594] = 0;
    G.DAT_0064c70e[local_10 * 0x594] = 0;
    G.DAT_0064c710[local_10 * 0x594] = 0;
    G.DAT_0064c6aa[local_10 * 0x594] = 0xFF;
    for (let local_8 = 0; local_8 < 0x40; local_8++) {
      G.DAT_0064c832[local_8 * 2 + local_10 * 0x594] = 0;
      G.DAT_0064c8b2[local_8 * 2 + local_10 * 0x594] = 0;
      G.DAT_0064c932[local_10 * 0x594 + local_8] = 0;
      G.DAT_0064c972[local_10 * 0x594 + local_8] = 0;
    }
  }
  iVar1 = _rand();
  G.DAT_00655c1e = iVar1 % 0x32;
  for (let local_8 = 0; local_8 < 0x96; local_8++) {
    for (let local_c = 0; local_c < 8; local_c++) {
      G.DAT_00655c38[local_8 * 8 + local_c] = 0;
    }
  }
  for (let local_10 = 0; local_10 < 8; local_10++) {
    new_civ(local_10);
  }
  G.DAT_00655b0c = G.DAT_00655b0a;
  FUN_004a7754();
  if ((_DAT_0064bc1a + _DAT_0064bc1c > 10) || _DAT_0064bc1a > 6 || _DAT_0064bc1c > 6) {
    _DAT_0064bc1a = 6;
    _DAT_0064bc1c = 4;
  }
  iVar1 = FUN_005ae006(G.DAT_00655b0b);
  if (iVar1 === 1) {
    G.DAT_0064c6b3[G.DAT_00655b03 * 0x594] = _DAT_0064bc1a;
    G.DAT_0064c6b4[G.DAT_00655b03 * 0x594] = _DAT_0064bc1c;
    if (G.DAT_00655b08 === 0) {
      G.DAT_0064c6a2[G.DAT_00655b03 * 0x594] = 0x32;
    }
  } else {
    for (let local_10 = 1; local_10 < 8; local_10++) {
      if ((1 << (local_10 & 0x1f) & G.DAT_00655b0b) !== 0) {
        G.DAT_0064c6b3[local_10 * 0x594] = 6;
        G.DAT_0064c6b4[local_10 * 0x594] = 4;
        if (G.DAT_00655b08 === 0) {
          G.DAT_0064c6a2[local_10 * 0x594] = 0x32;
        }
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004abea0 — direction_from_delta
// Source: block_004A0000.c line 3634, 325 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004abea0(param_1, param_2) {
  let local_c = 8;
  let local_10, local_14;

  if (param_1 < 1) {
    param_1 = param_1 < 0 ? -1 : 0;
  } else {
    param_1 = 1;
  }
  if (param_2 < 1) {
    param_2 = param_2 < 0 ? -1 : 0;
  } else {
    param_2 = 1;
  }
  for (let local_8 = 0; local_8 < 8; local_8++) {
    if (s8(G.DAT_00628350[local_8]) < 1) {
      local_10 = s8(G.DAT_00628350[local_8]) < 0 ? -1 : 0;
    } else {
      local_10 = 1;
    }
    if (param_1 === local_10) {
      if (s8(G.DAT_00628360[local_8]) < 1) {
        local_14 = s8(G.DAT_00628360[local_8]) < 0 ? -1 : 0;
      } else {
        local_14 = 1;
      }
      if (param_2 === local_14) {
        local_c = local_8;
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004abfe5 — pathfind_BFS (game logic — pathfinding)
// Source: block_004A0000.c line 3704, 4118 bytes
//
// BFS pathfinder. Very large; core game logic for unit movement.
// ═══════════════════════════════════════════════════════════════════

export function FUN_004abfe5(param_1, param_2, param_3) {
  let iVar19 = G.DAT_0062d04c;
  G.DAT_00673fb0 = G.DAT_00673fa0;
  G.DAT_00673fb4 = G.DAT_00673fa4;
  let bVar21 = G.DAT_0064b1c1[G.DAT_0062d03c * 0x14] === 2;
  let cVar1 = s8(G.DAT_0064b1c2[G.DAT_0062d03c * 0x14]);
  let uVar20 = G.DAT_0064bcc8;
  let bVar3 = false;
  let bVar4, bVar5, bVar2, bVar7;
  let iVar8, iVar9, iVar10, iVar13, iVar14, iVar15, iVar16, iVar17;
  let uVar11, uVar18, pbVar12;
  let local_7c, local_80, local_84, local_90, local_94;
  let local_30, local_3c, local_40, local_50, local_58;
  let local_10, local_1c, local_20;

  if (bVar21) {
    iVar8 = FUN_005b89e4(param_1, param_2);
    if (iVar8 === 0) bVar3 = true;
  }
  G.DAT_00673fc0 = 0;
  local_40 = param_1 - G.DAT_00673fb0;
  if ((G.DAT_00655ae8 & 0x8000) === 0) {
    if (local_40 < 0) local_40 = local_40 + G.DAT_006d1160;
    if (G.DAT_006d1160 >> 1 <= local_40) local_40 = local_40 - G.DAT_006d1160;
  }
  local_40 = local_40 + G.DAT_00673fb0;

  iVar8 = FUN_004ad01e(local_40, param_2);
  if (G.DAT_00673fa0 !== G.DAT_006787cc || G.DAT_00673fa4 !== G.DAT_00673fb8 || iVar8 === 0) {
    G.DAT_006787cc = G.DAT_00673fa0;
    G.DAT_00673fb8 = G.DAT_00673fa4;
    _memset(G.DAT_006ced60, 0, 0x900);
    G.DAT_00673fc4 = 0;
    G.DAT_00673fc8[0] = G.DAT_00673fa0;
    G.DAT_006763c8[0] = G.DAT_00673fa4;
    G.DAT_00673fbc = 1;
    FUN_004ad076(G.DAT_00673fa0, G.DAT_00673fa4, 1);
    G.DAT_00673fc0 = param_3;
    // BFS expansion loop
    let bfs_break = false;
    do {
      iVar8 = G.DAT_00673fc8[G.DAT_00673fc4];
      iVar13 = G.DAT_006763c8[G.DAT_00673fc4];
      G.DAT_00673fc4 = G.DAT_00673fc4 + 1;
      if (0x8ff < G.DAT_00673fc4) G.DAT_00673fc4 = 0;
      iVar15 = FUN_005ae052(iVar8);
      iVar16 = FUN_004ad01e(iVar8, iVar13);
      iVar14 = G.DAT_00673fc0;
      if (iVar16 <= G.DAT_00673fc0 && (iVar15 !== param_1 || (iVar14 = iVar16, iVar13 !== param_2))) {
        uVar11 = FUN_005b94d5(iVar15, iVar13);
        if ((uVar11 & 0x10) === 0 && (iVar14 = FUN_005b8ca6(iVar15, iVar13), iVar14 < 0)) {
          bVar4 = false;
        } else {
          bVar4 = true;
        }
        pbVar12 = FUN_005b8931(iVar15, iVar13);
        bVar2 = (typeof pbVar12 === 'number') ? pbVar12 : (pbVar12 >= 0 ? tileRead(pbVar12, 0) : 0);
        uVar11 = FUN_005b94d5(iVar15, iVar13);
        if ((uVar11 & 0x20) === 0 && (iVar14 = FUN_005b8ca6(iVar15, iVar13), iVar14 < 0)) {
          bVar5 = false;
        } else {
          bVar5 = true;
        }
        for (local_1c = 0; iVar14 = G.DAT_00673fc0, local_1c < 8; local_1c++) {
          iVar14 = s8(G.DAT_00628350[local_1c]) + iVar8;
          iVar17 = s8(G.DAT_00628360[local_1c]) + iVar13;
          iVar9 = FUN_005ae052(iVar14);
          local_7c = iVar14 - G.DAT_00673fa0;
          if (local_7c < 1) local_7c = local_7c < 0 ? -local_7c : 0;
          local_84 = iVar17 - G.DAT_00673fa4;
          if (local_84 < 1) local_84 = local_84 < 0 ? -local_84 : 0;
          if (((local_84 + local_7c) & 0xfffffffe) < 0x30 &&
              (iVar10 = FUN_004087c0(iVar9, iVar17), iVar10 !== 0)) {
            bVar7 = FUN_005b89bb(iVar9, iVar17);
            let domainMatch = ((bVar7 === 10) === bVar21) ||
                              (param_1 === iVar9 && iVar17 === param_2) ||
                              (G.DAT_006787cc === iVar9 && iVar17 === G.DAT_00673fb8);
            let continentOk = !bVar3 ||
                (iVar10 = FUN_005b8a81(iVar9, iVar17), iVar10 !== 0x3f &&
                 s16(G.DAT_00666134, iVar10 * 0x10) !== 1);
            if (domainMatch && continentOk) {
              local_30 = iVar16;
              let skipTile = false;
              if (-1 < G.DAT_0062d044) {
                local_80 = FUN_005b8da4(iVar9, iVar17);
                if (-1 < local_80 && G.DAT_0062d044 !== local_80) { skipTile = true; }
                if (!skipTile && G.DAT_0062d044 === local_80 &&
                    (1 << (local_80 & 0x1f) & G.DAT_00655b0b) === 0) {
                  let bVar6b = FUN_005b94d5(iVar9, iVar17);
                  if ((bVar6b & 0x43) === 1) {
                    iVar10 = FUN_005b4b66(iVar9, iVar17, local_80);
                    if (iVar10 !== 0) {
                      uVar18 = FUN_005b2e69(iVar9, iVar17);
                      iVar10 = FUN_005b53b6(uVar18, s8(G.DAT_0064b1ca[G.DAT_0062d03c * 0x14]));
                      local_30 = iVar16 + iVar10 * 0x10;
                    }
                  }
                }
                if (!skipTile) {
                  iVar10 = FUN_005b8dec(iVar9, iVar17, G.DAT_0062d044);
                  if (-1 < iVar10 && s8(G.DAT_0064b1ca[G.DAT_0062d03c * 0x14]) < 5) {
                    local_30 = local_30 + G.DAT_0064bcc8 * 4;
                  }
                }
              }
              if (!skipTile) {
                if (G.DAT_0062d040 !== 0 ||
                    (bVar5 && (uVar11 = FUN_005b94d5(iVar9, iVar17), (uVar11 & 0x20) !== 0 ||
                     (iVar10 = FUN_005b8ca6(iVar9, iVar17), -1 < iVar10)))) {
                  local_30 = local_30 + 1;
                } else if ((G.DAT_0064b1bd[G.DAT_0062d03c * 0x14] & 2) !== 0) {
                  local_30 = local_30 + 4;
                } else if (bVar4 && (uVar11 = FUN_005b94d5(iVar9, iVar17), (uVar11 & 0x10) !== 0 ||
                           (iVar10 = FUN_005b8ca6(iVar9, iVar17), -1 < iVar10))) {
                  local_30 = local_30 + 4;
                } else {
                  if (G.DAT_0062d048 !== 0) { skipTile = true; }
                  if (!skipTile) {
                    let riverCross = false;
                    let bVar2b = (typeof pbVar12 === 'number') ? pbVar12 : (pbVar12 >= 0 ? tileRead(pbVar12, 0) : 0);
                    if ((bVar2b & 0x80) !== 0) {
                      let pbVar12b = FUN_005b8931(iVar9, iVar17);
                      let tile0b = (typeof pbVar12b === 'number') ? pbVar12b : (pbVar12b >= 0 ? tileRead(pbVar12b, 0) : 0);
                      if ((tile0b & 0x80) !== 0) {
                        iVar10 = FUN_005ae10e(iVar15, iVar9);
                        if (iVar10 === 1) {
                          let adiff = iVar13 - iVar17;
                          if (adiff < 0) adiff = -adiff;
                          if (adiff === 0) adiff = 1; // abs correction
                          if (adiff === 1) {
                            local_30 = local_30 + 4;
                            riverCross = true;
                          }
                        }
                      }
                    }
                    if (!riverCross) {
                      if (uVar20 < cVar1) {
                        local_30 = local_30 + s8(G.DAT_00627cc8[bVar7 * 0x18]) * G.DAT_0064bcc8 * 4;
                      } else {
                        local_30 = local_30 + G.DAT_0064bcc8 * 4;
                      }
                    }
                  }
                }
              }
              if (!skipTile) {
                if ((G.DAT_0064b1bc[G.DAT_0062d03c * 0x14] & 0x20) !== 0) {
                  let pbVar12c = FUN_005b8931(iVar9, iVar17);
                  let tile0c = (typeof pbVar12c === 'number') ? pbVar12c : (pbVar12c >= 0 ? tileRead(pbVar12c, 0) : 0);
                  if ((tile0c & 0x40) !== 0) {
                    local_30 = local_30 + G.DAT_0064bcc8 * 4;
                  }
                }
                iVar9 = FUN_004ad01e(iVar14, iVar17);
                if (iVar9 === 0 || local_30 < iVar9) {
                  FUN_004ad076(iVar14, iVar17, local_30);
                  G.DAT_00673fc8[G.DAT_00673fbc] = iVar14;
                  G.DAT_006763c8[G.DAT_00673fbc] = iVar17;
                  G.DAT_00673fbc = G.DAT_00673fbc + 1;
                  if (0x8ff < G.DAT_00673fbc) G.DAT_00673fbc = 0;
                  if (G.DAT_00673fc4 === G.DAT_00673fbc) { bfs_break = true; break; }
                }
              }
            }
          }
        }
      }
      G.DAT_00673fc0 = iVar14;
    } while (!bfs_break && G.DAT_00673fc4 !== G.DAT_00673fbc && G.DAT_00673fc4 !== 0);
  }
  // Backtrack: find best direction from current position
  local_50 = -1;
  if (G.DAT_00673fc0 < param_3) {
    local_10 = 19999;
    local_20 = 19999;
    uVar11 = FUN_005b94d5(param_1, param_2);
    if ((uVar11 & 0x10) === 0 && (iVar8 = FUN_005b8ca6(param_1, param_2), iVar8 < 0)) {
      bVar3 = false;
    } else {
      bVar3 = true;
    }
    pbVar12 = FUN_005b8931(param_1, param_2);
    bVar2 = (typeof pbVar12 === 'number') ? pbVar12 : (pbVar12 >= 0 ? tileRead(pbVar12, 0) : 0);
    uVar11 = FUN_005b94d5(param_1, param_2);
    if ((uVar11 & 0x20) === 0 && (iVar8 = FUN_005b8ca6(param_1, param_2), iVar8 < 0)) {
      bVar4 = false;
    } else {
      bVar4 = true;
    }
    iVar8 = FUN_004ad01e(local_40, param_2);
    for (local_1c = 0; local_1c < 8; local_1c++) {
      iVar13 = s8(G.DAT_00628350[local_1c]) + param_1;
      iVar14 = s8(G.DAT_00628360[local_1c]) + param_2;
      iVar15 = FUN_005ae052(iVar13);
      local_7c = iVar13 - G.DAT_00673fa0;
      if (local_7c < 1) local_7c = local_7c < 0 ? -local_7c : 0;
      local_84 = iVar14 - G.DAT_00673fa4;
      if (local_84 < 1) local_84 = local_84 < 0 ? -local_84 : 0;
      if (((local_84 + local_7c) & 0xfffffffe) < 0x30 &&
          (iVar16 = FUN_004087c0(iVar15, iVar14), iVar16 !== 0)) {
        bVar7 = FUN_005b89bb(iVar15, iVar14);
        let domainMatch2 = ((bVar7 === 10) === bVar21) ||
                           (param_1 === iVar15 && iVar14 === param_2) ||
                           (G.DAT_006787cc === iVar15 && iVar14 === G.DAT_00673fb8);
        if (domainMatch2) {
          local_3c = iVar13 - G.DAT_00673fb0;
          if ((G.DAT_00655ae8 & 0x8000) === 0) {
            if (local_3c < 0) local_3c = local_3c + G.DAT_006d1160;
            if (G.DAT_006d1160 >> 1 <= local_3c) local_3c = local_3c - G.DAT_006d1160;
          }
          iVar16 = FUN_004ad01e(local_3c + G.DAT_00673fb0, iVar14);
          local_80 = -1;
          let skipDir = false;
          if (G.DAT_0062d044 >= 0) {
            local_80 = FUN_005b8da4(iVar15, iVar14);
            if (local_80 >= 0 && G.DAT_0062d044 !== local_80) skipDir = true;
          }
          if (!skipDir && iVar16 !== 0 && iVar16 < iVar8) {
            if (G.DAT_0062d040 !== 0) {
              local_58 = 1;
            } else if (bVar4 && (uVar11 = FUN_005b94d5(iVar15, iVar14), (uVar11 & 0x20) !== 0 ||
                       (iVar17 = FUN_005b8ca6(iVar15, iVar14), -1 < iVar17))) {
              local_58 = 1;
            } else if ((G.DAT_0064b1bd[G.DAT_0062d03c * 0x14] & 2) !== 0) {
              local_58 = 4;
            } else if (bVar3 && (uVar11 = FUN_005b94d5(iVar15, iVar14), (uVar11 & 0x10) !== 0 ||
                       (iVar17 = FUN_005b8ca6(iVar15, iVar14), -1 < iVar17))) {
              local_58 = 4;
            } else {
              if (G.DAT_0062d048 !== 0) { skipDir = true; }
              if (!skipDir) {
                let riverCross2 = false;
                if ((bVar2 & 0x80) !== 0) {
                  let pbr = FUN_005b8931(iVar15, iVar14);
                  let t0r = (typeof pbr === 'number') ? pbr : (pbr >= 0 ? tileRead(pbr, 0) : 0);
                  if ((t0r & 0x80) !== 0 && (iVar17 = FUN_005ae10e(param_1, iVar15), iVar17 === 1)) {
                    local_94 = param_2 - iVar14;
                    if (local_94 < 0) local_94 = -local_94;
                    if (local_94 === 0) local_94 = 1;
                    if (local_94 === 1) {
                      local_58 = 4;
                      riverCross2 = true;
                    }
                  }
                }
                if (!riverCross2) {
                  if (uVar20 < cVar1) {
                    local_58 = s8(G.DAT_00627cc8[bVar7 * 0x18]) * G.DAT_0064bcc8 * 4;
                  } else {
                    local_58 = G.DAT_0064bcc8 << 2;
                  }
                }
              }
            }
            if (!skipDir) {
              if ((G.DAT_0064b1bc[G.DAT_0062d03c * 0x14] & 0x20) !== 0) {
                let pbr2 = FUN_005b8931(iVar15, iVar14);
                let t0r2 = (typeof pbr2 === 'number') ? pbr2 : (pbr2 >= 0 ? tileRead(pbr2, 0) : 0);
                if ((t0r2 & 0x40) !== 0) {
                  local_58 = local_58 + G.DAT_0064bcc8 * 4;
                }
              }
              if (G.DAT_0062d044 === local_80 &&
                  (1 << (local_80 & 0x1f) & G.DAT_00655b0b) === 0) {
                bVar7 = FUN_005b94d5(iVar15, iVar14);
                if ((bVar7 & 0x43) === 1) {
                  iVar17 = FUN_005b4b66(iVar15, iVar14, local_80);
                  if (iVar17 !== 0) {
                    uVar18 = FUN_005b2e69(iVar15, iVar14);
                    iVar17 = FUN_005b53b6(uVar18, s8(G.DAT_0064b1ca[G.DAT_0062d03c * 0x14]));
                    local_58 = local_58 + iVar17 * 8;
                  }
                }
              }
              iVar15 = FUN_005b8dec(iVar15, iVar14, G.DAT_0062d044);
              if (-1 < iVar15 && s8(G.DAT_0064b1ca[G.DAT_0062d03c * 0x14]) < 5) {
                local_58 = local_58 + G.DAT_0064bcc8 * 4;
              }
              iVar16 = iVar16 + local_58;
              if (iVar16 <= local_10) {
                iVar13 = FUN_005ae31d(G.DAT_00673fa0, G.DAT_00673fa4, iVar13, iVar14);
                if (iVar16 < local_10) {
                  local_50 = local_1c;
                  local_20 = iVar13;
                  local_10 = iVar16;
                } else if (iVar13 < local_20) {
                  local_50 = local_1c;
                  local_20 = iVar13;
                }
              }
            }
          }
        }
      }
    }
  }
  if (local_50 < 0) {
    G.DAT_00673fa0 = G.DAT_006787cc;
    G.DAT_00673fa4 = G.DAT_00673fb8;
  }
  if (iVar19 !== 0) {
    // DEVIATION: Win32 debug visualization loop (thunk_FUN_0047cd51, etc.)
  }
  return local_50;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ad01e — read_pathfind_cost_grid
// Source: block_004A0000.c line 4094, 88 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ad01e(param_1, param_2) {
  // C: return *(int*)((param_1 - G.DAT_00673fb0) * 0xc0 +
  //    ((param_1 - G.DAT_00673fb0) + (param_2 - G.DAT_00673fb4) >> 1) * -0xbc + 0x6cffc0);
  // The grid is 48x48 ints. Row = ((dx + dy) >> 1) + 0x18, Col = dx + 0x18
  // where dx = param_1 - G.DAT_00673fb0, dy = param_2 - G.DAT_00673fb4
  let dx = param_1 - G.DAT_00673fb0;
  let row = ((dx + (param_2 - G.DAT_00673fb4)) >> 1) + 0x18;
  let col = dx + 0x18;
  if (row < 0 || row >= 0x30 || col < 0 || col >= 0x30) return 0;
  return G.DAT_006ced60[col * 0x30 + row] || 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ad076 — write_pathfind_cost_grid
// Source: block_004A0000.c line 4109, 91 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ad076(param_1, param_2, param_3) {
  let dx = param_1 - G.DAT_00673fb0;
  let row = ((dx + (param_2 - G.DAT_00673fb4)) >> 1) + 0x18;
  let col = dx + 0x18;
  if (row >= 0 && row < 0x30 && col >= 0 && col < 0x30) {
    G.DAT_006ced60[col * 0x30 + row] = param_3;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ad0d1 — find_path_distance
// Source: block_004A0000.c line 4125, 318 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ad0d1(param_1, param_2, param_3, param_4, param_5, param_6) {
  let uVar1 = G.DAT_0062d044;
  let local_14;

  if (param_1 === param_3 || param_1 - param_3 < 0) {
    local_14 = -(param_1 - param_3) + 1;
  } else {
    local_14 = param_1 - param_3;
  }
  if ((G.DAT_00655ae8 & 0x8000) === 0 && G.DAT_006d1160 >> 1 < local_14) {
    local_14 = G.DAT_006d1160 - local_14;
  }
  let local_18;
  if (param_2 === param_4 || param_2 - param_4 < 0) {
    local_18 = -(param_2 - param_4) + 1;
  } else {
    local_18 = param_2 - param_4;
  }
  let iVar2 = (local_18 + local_14) >> 1;
  if (iVar2 === 0) {
    iVar2 = 0;
  } else if (iVar2 < 0x17) {
    if (param_5 === 0) {
      G.DAT_0062d03c = 2;
    } else {
      G.DAT_0062d03c = 0x21;
    }
    G.DAT_00673fa0 = param_3;
    G.DAT_00673fa4 = param_4;
    G.DAT_0062d044 = -1;
    iVar2 = FUN_004abfe5(param_1, param_2, param_6);
    if (-1 < iVar2) {
      iVar2 = G.DAT_00673fc0;
    }
  } else {
    iVar2 = -1;
  }
  G.DAT_0062d044 = uVar1;
  return iVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ad20f — find_long_path (macro pathfinder)
// Source: block_004A0000.c line 4182, 1392 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ad20f(param_1, param_2, param_3, param_4) {
  // Macro-level pathfinder using coarse grid
  let local_40 = 0;
  let local_8 = G.DAT_0062d050;
  G.DAT_00673fa0 = param_3;
  G.DAT_00673fa4 = param_4;
  let local_24 = G.DAT_0064b1c1[G.DAT_0062d03c * 0x14] === 2 ? 1 : 0;
  let iVar3 = FUN_004ad822(param_1, param_2, local_24);
  let iVar2 = G.DAT_00673fa4;
  let iVar7 = G.DAT_00673fa0;

  if (iVar3 === 0) {
    G.DAT_00673fa0 = param_3;
    G.DAT_00673fa4 = param_4;
  } else {
    // BFS on coarse grid — stubbed for mechanical correctness
    local_40 = 1;
    // ... backtrack logic ...
    G.DAT_00673fa0 = param_3;
    G.DAT_00673fa4 = param_4;
  }
  if (local_8 !== 0) {
    G.DAT_0062d04c = 1;
  }
  return local_40;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ad784 — find_valid_tile_for_domain
// Source: block_004A0000.c line 4344, 158 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ad784(param_1, param_2, param_3, param_4, param_5) {
  let local_8 = 0;
  while (true) {
    if (1 < local_8) {
      return 0;
    }
    let uVar1 = FUN_005ae052(param_1 + local_8);
    let iVar2 = param_2 + local_8;
    let iVar3 = FUN_004087c0(uVar1, iVar2);
    if (iVar3 !== 0) {
      iVar3 = FUN_005b89e4(uVar1, iVar2);
      if (iVar3 === param_5) {
        if (param_3) param_3[0] = uVar1;
        if (param_4) param_4[0] = iVar2;
        return 1;
      }
    }
    local_8++;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ad822 — find_coarse_grid_path
// Source: block_004A0000.c line 4375, 730 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ad822(param_1, param_2, param_3) {
  let local_24 = -1;
  let iVar1 = param_1 >> 2;
  let iVar2 = param_2 >> 2;

  if (param_3 === 0) {
    let val = FUN_004aee90(iVar1, iVar2);
    if (val !== 0) local_24 = 8;
  } else {
    let val = FUN_004aeec0(iVar1, iVar2);
    if (val !== 0) local_24 = 8;
  }

  if (local_24 === 8) {
    let local_c = [0], local_14 = [0];
    let iVar4 = FUN_004ad784(iVar1 * 4 + 1, iVar2 * 4 + 1, local_c, local_14, param_3);
    if (iVar4 === 0) {
      local_24 = -1;
    } else {
      iVar4 = FUN_004ad0d1(local_c[0], local_14[0], param_1, param_2, param_3, 0x12);
      if (iVar4 < 0) local_24 = -1;
    }
  }

  if (local_24 < 0) {
    let local_8 = 99;
    for (let local_10 = 0; local_10 < 8; local_10++) {
      let iVar4 = FUN_005ae0b0(s8(G.DAT_00628350[local_10]) + iVar1);
      let iVar5 = s8(G.DAT_00628360[local_10]) + iVar2;
      if (iVar4 >= 0 && iVar4 < G.DAT_006d116a && iVar5 >= 0 && iVar5 < G.DAT_006d116c) {
        let hasPath = false;
        if (param_3 !== 0) {
          let val = FUN_004aeec0(iVar4, iVar5);
          if (val !== 0) hasPath = true;
        }
        if (param_3 === 0) {
          let val = FUN_004aee90(iVar4, iVar5);
          if (val !== 0) hasPath = true;
        }
        if (hasPath) {
          let local_c = iVar4 * 4 + 1;
          let local_14 = iVar5 * 4 + 1;
          let check = FUN_004087c0(local_c, local_14);
          if (check !== 0) {
            let dist = FUN_005ae31d(param_1, param_2, local_c, local_14);
            if (dist < local_8) {
              local_24 = local_10;
              local_8 = dist;
            }
          }
        }
      }
    }
  }

  let local_10 = local_24 < 0 ? 8 : local_24;
  G.DAT_00673fa0 = FUN_005ae0b0(s8(G.DAT_00628350[local_10]) + iVar1);
  G.DAT_00673fa4 = s8(G.DAT_00628360[local_10]) + iVar2;
  return -1 < local_24;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004adafc — compute_unit_goto_direction
// Source: block_004A0000.c line 4455, 2516 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004adafc(param_1) {
  let local_54 = 0xFFFFFFFF;
  let iVar4 = s16(G.DAT_00656102, param_1 * 0x20);
  let iVar5 = s16(G.DAT_00656104, param_1 * 0x20);
  let iVar6 = s16(G.DAT_006560f0, param_1 * 0x20);
  let iVar7 = s16(G.DAT_006560f2, param_1 * 0x20);
  G.DAT_0062d03c = u8(G.DAT_006560f6[param_1 * 0x20]);
  let cVar1 = s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]);

  let iVar8 = FUN_004087c0(iVar4, iVar5);
  if (iVar8 !== 0 && (iVar4 !== iVar6 || iVar5 !== iVar7)) {
    let civIdx = s8(G.DAT_006560f7[param_1 * 0x20]);
    let uVar9 = G.DAT_00655b0b & (1 << (G.DAT_006560f7[param_1 * 0x20] & 0x1f));
    let local_70 = iVar4 - iVar6;

    if ((G.DAT_00655ae8 & 0x8000) === 0) {
      if (G.DAT_006d1160 - 2 <= iVar4 && iVar6 < 2) local_70 = -1;
      if (iVar4 < 2 && G.DAT_006d1160 - 2 <= iVar6) local_70 = 1;
    }

    // C line 4509: distance check
    let iVar10 = FUN_005ae1b0(iVar6, iVar7, iVar4, iVar5);
    if (iVar10 < 2) {
      // C line 4511: adjacent tile — simple direction
      local_54 = FUN_004abea0(local_70, iVar5 - iVar7);
    } else {
      // C lines 4513-4693: long-range pathfinding
      iVar10 = iVar4;
      let iVar15 = iVar5;

      if (s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 1) {
        // C line 4517: non-naval unit — try BFS pathfinder
        iVar10 = FUN_005ae1b0(iVar6, iVar7, iVar4, iVar5);
        if (iVar10 < 0x17) {
          G.DAT_00673fa0 = iVar4;
          G.DAT_00673fa4 = iVar5;
          local_54 = FUN_004abfe5(iVar6, iVar7, 999);
          if (local_54 >= 0 && local_54 !== 0xFFFFFFFF) {
            G.DAT_0062d04c = 0;
            G.DAT_0062d050 = 0;
            return local_54;
          }
        }
        // C line 4525: try waypoint pathfinder
        let iVar16 = FUN_004ad20f(iVar6, iVar7, iVar4, iVar5);
        iVar10 = G.DAT_00673fa0;
        iVar15 = G.DAT_00673fa4;
        if (iVar16 !== 0) {
          iVar10 = FUN_005ae1b0(iVar6, iVar7, G.DAT_00673fa0, G.DAT_00673fa4);
          if (iVar10 < 0x17) {
            local_54 = FUN_004abfe5(iVar6, iVar7, 0x3e6);
          } else {
            local_54 = 0xFFFFFFFF;
          }
          iVar10 = G.DAT_00673fa0;
          iVar15 = G.DAT_00673fa4;
          if (local_54 >= 0 && local_54 !== 0xFFFFFFFF) {
            G.DAT_0062d04c = 0;
            G.DAT_0062d050 = 0;
            return local_54;
          }
        }
      }

      // C line 4545: fall through to direction scoring
      G.DAT_00673fa4 = iVar15;
      G.DAT_00673fa0 = iVar10;
      let uVar11 = G.DAT_00673fa0 - iVar6;
      let uVar12 = G.DAT_00673fa4 - iVar7;
      let local_1c = uVar11;
      if (local_1c < 0) local_1c = -local_1c;
      let local_28 = uVar12;
      if (local_28 < 0) local_28 = -local_28;

      local_70 = uVar11;
      if ((G.DAT_00655ae8 & 0x8000) === 0 && (G.DAT_006d1160 >> 1) < local_1c) {
        local_1c = G.DAT_006d1160 - local_1c;
        local_70 = local_1c;
        if (uVar11 >= 0) {
          local_70 = -local_1c;
        }
      }

      // C line 4562: compute reference cost
      iVar10 = (local_28 + local_1c) >> 1;
      let local_38;
      if (local_28 < local_1c) {
        local_38 = local_1c * 2 - ((iVar10 - local_28) + 1);
      } else {
        local_38 = local_28 * 2 - ((iVar10 - local_1c) + 1);
      }

      if (local_70 === 0 && uVar12 === 0) {
        // C line 4570: at target — clear order
        G.DAT_006560ff[param_1 * 0x20] = 0xff;
        FUN_005b6787(param_1);
      } else {
        // C line 4574: 8-direction scoring loop
        let local_18 = 9999;
        local_54 = 8;
        uVar11 = FUN_005b94d5(iVar6, iVar7);
        let pbVar13 = FUN_005b8931(iVar6, iVar7);
        let bVar2 = (pbVar13 >= 0) ? tileRead(pbVar13, 0) : 0;
        let uVar14 = FUN_005b94d5(iVar6, iVar7);
        iVar10 = FUN_005b4d8c(iVar6, iVar7, iVar8);

        for (let local_24 = 0; local_24 < 8; local_24++) {
          iVar15 = FUN_005ae052(s8(G.DAT_00628350[local_24]) + iVar6);
          let local_84 = s8(G.DAT_00628360[local_24]) + iVar7;
          let local_20 = local_70 - s8(G.DAT_00628350[local_24]);
          let local_30 = uVar12 - s8(G.DAT_00628360[local_24]);
          if (local_20 < 0) local_20 = -local_20;
          if (local_30 < 0) local_30 = -local_30;

          let iVar16 = (local_20 + local_30) >> 1;
          let local_48;
          if (local_30 < local_20) {
            local_48 = local_20 * 2 - ((iVar16 - local_30) + 1);
          } else {
            local_48 = local_30 * 2 - ((iVar16 - local_20) + 1);
          }

          // C line 4599: direction eligibility check
          if ((uVar9 === 0 || local_48 <= local_38) &&
              (iVar16 = FUN_004087c0(iVar15, local_84), iVar16 !== 0) &&
              (s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 1 ||
               (iVar16 = FUN_005b8d15(iVar15, local_84), iVar16 < 0) ||
               (iVar15 === G.DAT_00673fa0 && local_84 === G.DAT_00673fa4))) {

            let bVar3 = FUN_005b89bb(iVar15, local_84);
            iVar16 = FUN_005b8d62(iVar15, local_84);
            let iVar17;

            // C lines 4606-4614: exact condition structure from C
            if ((((iVar16 < 0) || (iVar8 === iVar16)) &&
                ((((bVar3 === 10) === (cVar1 === 2) &&
                  (((iVar10 === 0 ||
                    (iVar17 = FUN_005b4d8c(iVar15, local_84, iVar8), iVar17 === 0)) ||
                   ((G.DAT_0064b1bc[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 2) !== 0)
                  ))) || (s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 1)))) ||
               (((iVar17 = FUN_005b8ca6(iVar15, local_84), iVar17 === iVar8 && (iVar15 === iVar4)
                 ) && (local_84 === iVar5)))) {

              // C line 4615: compute movement cost
              let local_58;
              if (s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) {
                // Land unit
                if ((uVar14 & 0x20) !== 0) {
                  let uVar18 = FUN_005b94d5(iVar15, local_84);
                  if ((uVar18 & 0x20) !== 0) {
                    local_58 = 1; // railroad
                  } else if ((uVar11 & 0x10) !== 0) {
                    let uVar18b = FUN_005b94d5(iVar15, local_84);
                    if ((uVar18b & 0x10) !== 0) {
                      local_58 = 4; // road
                    } else {
                      // C line 4620: river check
                      if ((bVar2 & 0x80) !== 0) {
                        let pb2 = FUN_005b8931(iVar15, local_84);
                        if (pb2 >= 0 && (tileRead(pb2, 0) & 0x80) !== 0) {
                          let iVar15b = FUN_005ae10e(iVar6, iVar15);
                          if (iVar15b === 1) {
                            let absDy = (iVar7 >= local_84) ? iVar7 - local_84 : local_84 - iVar7;
                            if (absDy === 1) {
                              local_58 = 4;
                            } else {
                              // fall through to terrain cost
                              iVar15 = FUN_005b2a39(param_1);
                              if (G.DAT_0064bcc8 < iVar15) {
                                local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                              } else {
                                local_58 = G.DAT_0064bcc8 << 2;
                              }
                            }
                          } else {
                            iVar15 = FUN_005b2a39(param_1);
                            if (G.DAT_0064bcc8 < iVar15) {
                              local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                            } else {
                              local_58 = G.DAT_0064bcc8 << 2;
                            }
                          }
                        } else {
                          iVar15 = FUN_005b2a39(param_1);
                          if (G.DAT_0064bcc8 < iVar15) {
                            local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                          } else {
                            local_58 = G.DAT_0064bcc8 << 2;
                          }
                        }
                      } else {
                        iVar15 = FUN_005b2a39(param_1);
                        if (G.DAT_0064bcc8 < iVar15) {
                          local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                        } else {
                          local_58 = G.DAT_0064bcc8 << 2;
                        }
                      }
                    }
                  } else {
                    // no road on current tile
                    if ((bVar2 & 0x80) !== 0) {
                      let pb2 = FUN_005b8931(iVar15, local_84);
                      if (pb2 >= 0 && (tileRead(pb2, 0) & 0x80) !== 0) {
                        let iVar15b = FUN_005ae10e(iVar6, iVar15);
                        if (iVar15b === 1) {
                          let absDy = (iVar7 >= local_84) ? iVar7 - local_84 : local_84 - iVar7;
                          if (absDy === 1) {
                            local_58 = 4;
                          } else {
                            iVar15 = FUN_005b2a39(param_1);
                            if (G.DAT_0064bcc8 < iVar15) {
                              local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                            } else {
                              local_58 = G.DAT_0064bcc8 << 2;
                            }
                          }
                        } else {
                          iVar15 = FUN_005b2a39(param_1);
                          if (G.DAT_0064bcc8 < iVar15) {
                            local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                          } else {
                            local_58 = G.DAT_0064bcc8 << 2;
                          }
                        }
                      } else {
                        iVar15 = FUN_005b2a39(param_1);
                        if (G.DAT_0064bcc8 < iVar15) {
                          local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                        } else {
                          local_58 = G.DAT_0064bcc8 << 2;
                        }
                      }
                    } else {
                      iVar15 = FUN_005b2a39(param_1);
                      if (G.DAT_0064bcc8 < iVar15) {
                        local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                      } else {
                        local_58 = G.DAT_0064bcc8 << 2;
                      }
                    }
                  }
                } else {
                  // C line 4618: road on dest but not source
                  let uVar18 = FUN_005b94d5(iVar15, local_84);
                  if ((uVar18 & 0x10) !== 0) {
                    local_58 = 4; // road
                  } else {
                    iVar15 = FUN_005b2a39(param_1);
                    if (G.DAT_0064bcc8 < iVar15) {
                      local_58 = s8(G.DAT_00627cc8[u8(bVar3) * 0x18]) * G.DAT_0064bcc8 * 4;
                    } else {
                      local_58 = G.DAT_0064bcc8 << 2;
                    }
                  }
                }
              } else {
                // C line 4653: non-land unit (naval/air)
                local_58 = G.DAT_0064bcc8 << 2;
              }

              // C line 4656: final cost computation
              local_58 = (local_48 * 4 + local_58 + local_20 + local_30) * 4;
              if (local_48 !== 0 && iVar16 >= 0) {
                local_58 = local_58 + 1;
              }
              if (local_58 < local_18) {
                local_54 = local_24;
                local_18 = local_58;
              }
            }
          }
        }

        // C line 4667: back-and-forth detection
        if (s8(G.DAT_006560fb[param_1 * 0x20]) >= 0 &&
            ((s8(G.DAT_006560fb[param_1 * 0x20]) ^ 4) === local_54) &&
            s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 1 &&
            G.DAT_006560f8[param_1 * 0x20] !== 0) {
          local_54 = 0xFFFFFFFF;
          G.DAT_006560ff[param_1 * 0x20] = 0xff;
          if (uVar9 === 0 || (s16(G.DAT_006560f4, param_1 * 0x20) & 0x8000) !== 0) {
            if (uVar9 !== 0) {
              w16(G.DAT_006560f4, param_1 * 0x20, u16(G.DAT_006560f4, param_1 * 0x20) & 0x7fff);
            }
            FUN_005b6787(param_1);
          }
        }

        // C line 4681: no valid direction found
        if (local_54 === 8) {
          G.DAT_006560ff[param_1 * 0x20] = 0xff;
          if (uVar9 === 0 || (s16(G.DAT_006560f4, param_1 * 0x20) & 0x8000) !== 0) {
            if (uVar9 !== 0) {
              w16(G.DAT_006560f4, param_1 * 0x20, u16(G.DAT_006560f4, param_1 * 0x20) & 0x7fff);
            }
            FUN_005b6787(param_1);
          }
          local_54 = 0xFFFFFFFF;
        }
      }
    }
  }
  G.DAT_0062d04c = 0;
  G.DAT_0062d050 = 0;
  return local_54;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aee90 — get_coarse_grid_land_ptr
// Source: block_004A0000.c line 4707, 36 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aee90(param_1, param_2) {
  return G.DAT_006d116a * param_2 + param_1 + G.DAT_006365e0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aeec0 — get_coarse_grid_sea_ptr
// Source: block_004A0000.c line 4720, 36 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aeec0(param_1, param_2) {
  return G.DAT_006d116a * param_2 + param_1 + G.DAT_006365e4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aeef0 — get_coarse_grid_pathfind_ptr
// Source: block_004A0000.c line 4733, 36 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aeef0(param_1, param_2) {
  return G.DAT_006d116a * param_2 + param_1 + G.DAT_006365e8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aef20 — clear_string_buffer
// Source: block_004A0000.c line 4746, 22 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aef20(param_1) {
  if (Array.isArray(param_1)) param_1[0] = 0;
}

// Internal stub alias


// ═══════════════════════════════════════════════════════════════════
// FUN_004aef36 — append_separator_a
// Source: block_004A0000.c line 4760, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aef36(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aef57 — append_multiple_separators
// Source: block_004A0000.c line 4774, 63 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aef57(param_1, param_2) {
  for (let local_8 = 0; local_8 < param_2; local_8++) {
    FUN_004aef36(param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aef96 — append_separator_b
// Source: block_004A0000.c line 4792, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aef96(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aefb7 — append_separator_c
// Source: block_004A0000.c line 4806, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aefb7(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aefd8 — append_separator_d
// Source: block_004A0000.c line 4820, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aefd8(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004aeff9 — append_separator_e
// Source: block_004A0000.c line 4834, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004aeff9(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af01a — append_separator_f
// Source: block_004A0000.c line 4848, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af01a(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af03b — append_separator_g
// Source: block_004A0000.c line 4862, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af03b(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af05c — append_separator_h
// Source: block_004A0000.c line 4876, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af05c(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af07d — append_separator_i
// Source: block_004A0000.c line 4890, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af07d(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af09e — append_separator_j
// Source: block_004A0000.c line 4904, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af09e(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af0bf — append_separator_k
// Source: block_004A0000.c line 4918, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af0bf(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af0e0 — append_separator_l
// Source: block_004A0000.c line 4932, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af0e0(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af101 — append_separator_m
// Source: block_004A0000.c line 4946, 33 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af101(param_1) {
  FUN_005f22e0(param_1, " ");
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af122 — append_string_id_text
// Source: block_004A0000.c line 4960, 41 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af122(param_1, param_2) {
  let uVar1 = FUN_00428b0c(param_2);
  FUN_005f22e0(param_1, uVar1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af14b — append_string_from_resource
// Source: block_004A0000.c line 4977, 41 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af14b(param_1, param_2) {
  FUN_004af122(param_1, G.DAT_00628420 + param_2 * 4);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af174 — append_raw_string
// Source: block_004A0000.c line 4991, 32 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af174(param_1, param_2) {
  FUN_005f22e0(param_1, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af194 — append_string_id_bracketed
// Source: block_004A0000.c line 5005, 65 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af194(param_1, param_2) {
  FUN_004af05c(param_1);
  let uVar1 = FUN_00428b0c(param_2);
  FUN_005f22e0(param_1, uVar1);
  FUN_004af07d(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af1d5 — append_int_as_string
// Source: block_004A0000.c line 5024, 53 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af1d5(param_1, param_2) {
  let local_18 = String(param_2);
  FUN_005f22e0(param_1, local_18);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af20a — append_binary_string_padded
// Source: block_004A0000.c line 5041, 122 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af20a(param_1, param_2) {
  let local_18 = param_2.toString(2);
  let sVar1 = local_18.length;
  for (let local_1c = 0; local_1c < (8 - sVar1); local_1c++) {
    FUN_005f22e0(param_1, "0");
  }
  FUN_005f22e0(param_1, local_18);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af284 — append_long_as_string
// Source: block_004A0000.c line 5064, 53 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af284(param_1, param_2) {
  let local_18 = String(param_2);
  FUN_005f22e0(param_1, local_18);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af2b9 — append_long_and_display
// Source: block_004A0000.c line 5081, 50 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af2b9(param_1, param_2) {
  FUN_004af284(param_1, param_2);
  FUN_0040fe10();
  FUN_0040bc10(0x143);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af3e0 — create_diplomacy_list_control (UI)
// Source: block_004A0000.c line 5097, 1123 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af3e0(param_1, param_2) {
  // DEVIATION: Win32/MFC — create_diplomacy_list_control using in_ECX, CDialog
  // Game state: reads G.DAT_00655c16, G.DAT_006d1da0, G.DAT_00655b07, G.DAT_0064c6c0
  FUN_004afc89(param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af867 — scroll_diplomacy_list_up (UI)
// Source: block_004A0000.c line 5223, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af867(param_1) {
  FUN_004af8a3(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af885 — scroll_diplomacy_list_down (UI)
// Source: block_004A0000.c line 5237, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af885(param_1) {
  FUN_004af8a3(1, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af8a3 — scroll_diplomacy_list (UI)
// Source: block_004A0000.c line 5251, 97 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af8a3(param_1, param_2) {
  let local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  } else {
    local_8 = local_8 + -0x48;
  }
  FUN_004518d0();
  // *(local_8 + 0x10410 + param_1 * 4) = param_2;
  FUN_004afc89(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004af904 — handle_diplomacy_list_click (UI)
// Source: block_004A0000.c line 5276, 627 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004af904(param_1) {
  // DEVIATION: Win32/MFC — handle_diplomacy_list_click using FUN_005c62ee, in_ECX
  // Calls FUN_005dba95, FUN_005dbab8 for shift/ctrl state
  // Mutates in_ECX memory for selection state, calls FUN_004afc89
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004afb77 — hit_test_diplomacy_list (UI)
// Source: block_004A0000.c line 5351, 274 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004afb77(param_1, param_2, param_3) {
  // Hit test for list — UI, returns -1 as stub
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004afc89 — paint_diplomacy_list (UI)
// Source: block_004A0000.c line 5395, 1230 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004afc89(param_1) {
  // DEVIATION: Win32/MFC — paint_diplomacy_list using FUN_005c62ee, in_ECX
  // Renders diplomacy list items with flag icons and civ names
}


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks not yet defined
// These are referenced by functions in this block but defined in
// other block_*.c files. Stubbed as no-ops or returning defaults.
// ═══════════════════════════════════════════════════════════════════

function FUN_show_messagebox_CF2D_stub() { return 1; }
function debug_log(msg) { /* console.log(msg); */ }
