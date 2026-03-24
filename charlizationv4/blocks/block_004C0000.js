// ═══════════════════════════════════════════════════════════════════
// block_004C0000.js — Mechanical transpilation of block_004C0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004C0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004C0000.c
// ═══════════════════════════════════════════════════════════════════




// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// C runtime / Win32 stubs
// ═══════════════════════════════════════════════════════════════════
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_00408460, FUN_004085f0, FUN_004086c0, FUN_0040bbb0 } from './block_00400000.js';
import { FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80, FUN_0040ef50, FUN_0040f3e0, FUN_0040f570 } from './block_00400000.js';
import { FUN_0040f680, FUN_0040f880, FUN_0040fdb0, FUN_0040fe10, FUN_0040fea0, FUN_0040fed0 } from './block_00400000.js';
import { FUN_0040ff00, FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_004105f8, FUN_00414dd0, FUN_0041508c, FUN_00415133 } from './block_00410000.js';
import { FUN_00418770, FUN_004187a0, FUN_00418870, FUN_004190a0, FUN_0041f8d9 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421d30, FUN_00421d60, FUN_00421da0, FUN_00421ea0, FUN_00426fb0 } from './block_00420000.js';
import { FUN_004271e8, FUN_004274a6, FUN_00428b0c } from './block_00420000.js';
import { FUN_0043060b, FUN_0043c460, FUN_0043c520, FUN_0043c810, FUN_0043c990, FUN_0043c9d0 } from './block_00430000.js';
import { FUN_0043cc00, FUN_0043cf76, FUN_0043d07a, FUN_0043d20a, FUN_0043d289, create_city } from './block_00430000.js';
import { FUN_00442541, FUN_00444270, FUN_004442a0, FUN_004442e0 } from './block_00440000.js';
import { FUN_00453e18, FUN_00453e51, FUN_00456f20, FUN_0045705e, FUN_00458a3b, FUN_0045ac71 } from './block_00450000.js';
import { FUN_00467750, FUN_00467825, FUN_0046b14d, FUN_0046e020, FUN_0046e287 } from './block_00460000.js';
import { FUN_00472cf0, FUN_0047ce1e, FUN_0047cea6, FUN_0047df20, FUN_0047df50, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d52 } from './block_00480000.js';
import { FUN_004904c0, FUN_00492ae0, FUN_0049301b, FUN_00493c7d, FUN_00493d13, FUN_00497d00 } from './block_00490000.js';
import { FUN_00498159 } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a6b80, FUN_004a6bdc, FUN_004a6e39 } from './block_004A0000.js';
import { FUN_004a7577, FUN_004adafc, FUN_004aef20, FUN_004aef36, FUN_004af01a, FUN_004af03b } from './block_004A0000.js';
import { FUN_004af122 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004bb620, FUN_004bb800, FUN_004bdaa5, FUN_004bdb2c, FUN_004bea84 } from './block_004B0000.js';
import { FUN_004bee56, FUN_004bf05b, FUN_004bfdbe } from './block_004B0000.js';
import { FUN_004d007e } from './block_004D0000.js';
import { FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004fa4be, FUN_004fa569, FUN_004fa5d9, FUN_004fa617 } from './block_004F0000.js';
import { FUN_00511880, FUN_0051d63b } from './block_00510000.js';
import { FUN_00552112, FUN_00552ed2, FUN_00553379, FUN_0055339f, FUN_0055c69d } from './block_00550000.js';
import { FUN_00566584, FUN_00569363, FUN_0056a65e, FUN_0056b810, FUN_0056c705 } from './block_00560000.js';
import { FUN_00579ed0, FUN_0057a27a, FUN_0057b5df, FUN_0057ed3f, FUN_0057f9e3 } from './block_00570000.js';
import { FUN_00589ef8 } from './block_00580000.js';
import { FUN_0059062c, FUN_00598ceb, FUN_0059a2e6, FUN_0059d3c9, FUN_0059db08, FUN_0059db65 } from './block_00590000.js';
import { FUN_0059df8a, FUN_0059e18b, FUN_0059e4e6, FUN_0059e783, FUN_0059e8db, FUN_0059e9f3 } from './block_00590000.js';
import { FUN_0059ea4d, FUN_0059ec88, FUN_0059edf0, FUN_0059f2a3 } from './block_00590000.js';
import { FUN_005a5f34, FUN_005a632a, FUN_005a99fc, FUN_005a9b5d, FUN_005ad998, FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005ae1b0, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b29d7, FUN_005b2a39, FUN_005b2c3d, FUN_005b2c82, FUN_005b2d39, FUN_005b2e69 } from './block_005B0000.js';
import { FUN_005b36df, FUN_005b3ae0, FUN_005b4391, FUN_005b48b1, FUN_005b490e, FUN_005b4b66 } from './block_005B0000.js';
import { FUN_005b50ad, FUN_005b5bab, FUN_005b6042, FUN_005b6787, FUN_005b8a81, FUN_005b8b1a } from './block_005B0000.js';
import { FUN_005b8b65, FUN_005b8d15, FUN_005b8d62, FUN_005b8da4, FUN_005b94fc, FUN_005b9646 } from './block_005B0000.js';
import { FUN_005b976d, FUN_005b99e8, FUN_005b9ec6, FUN_005b9f1c, FUN_005baeb0, FUN_005baec8 } from './block_005B0000.js';
import { FUN_005baee0, FUN_005bb4ae, FUN_005bb574, FUN_005bd270 } from './block_005B0000.js';
import { FUN_005c61b0, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

function _rand() { return Math.floor(Math.random() * 32768); }
function _strlen(s) { return typeof s === 'string' ? s.length : 0; }
function _strcmp(a, b) { return a === b ? 0 : (a < b ? -1 : 1); }
function _sprintf() { /* stub */ }
function _fgets() { return null; }
function _fputs() { return 0; }
function _fclose() { /* stub */ }
function _atol(s) { return parseInt(s, 10) || 0; }
function __itoa() { /* stub */ }
function __getcwd() { /* stub */ }
function __chdir() { /* stub */ }
function __strupr() { /* stub */ }
function __strcmpi() { return 0; }
function __strnicmp() { return 0; }
function _strncpy() { /* stub */ }
function FID_conflict__remove() { return 0; }
function FID_conflict___wrename() { return 0; }
function FID_conflict__memcpy() { /* stub */ }
function MessageBoxA() { /* Win32 stub — no-op */ }
function SendMessageA() { /* Win32 stub — no-op */ }
function debug_log() { /* stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_004c02d8 — can_research_wonder (check if wonder buildable)
// Source: block_004C0000.c line 10
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c02d8(param_1, param_2) {
  let iVar1;
  let local_c;

  local_c = 0;
  if ((((((G.DAT_00655af0 & 0x80) === 0) || ((G.DAT_0064bc60 & 4) === 0)) || (G.DAT_00655b07 !== 0)) ||
      (((G.DAT_0064bc60 & 0x8000) !== 0 && (param_2 === 0x17)))) &&
     ((G.DAT_00655be6[param_2] === -1 &&
      (iVar1 = FUN_004bd9f0(param_1, s8(G.DAT_0064c48e[(param_2 + 0x27) * 8])),
      iVar1 !== 0)))) {
    local_c = 1;
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c03ae — can_research_advance (check if tech researchable)
// Source: block_004C0000.c line 34
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c03ae(param_1, param_2, param_3) {
  let iVar1;
  let local_8;

  local_8 = 0;
  if (param_3 < 0x27) {
    iVar1 = FUN_004bd9f0(param_1, s8(G.DAT_0064c48e[param_3 * 8]));
    if (iVar1 !== 0) {
      if (param_2 < 0) {
        local_8 = 1;
      }
      else {
        iVar1 = FUN_0043d20a(param_2, param_3);
        if (((((iVar1 === 0) &&
              (((param_3 !== 0x1e && (param_3 !== 0x1f)) ||
               ((G.DAT_0064f344[param_2 * 0x58] & 0x80) !== 0)))) &&
             (((param_3 !== 0x22 && (param_3 !== 0x1c)) ||
              (((G.DAT_0064f346[param_2 * 0x58] & 0x20) !== 0 &&
               ((G.DAT_0064f344[param_2 * 0x58] & 0x80) !== 0)))))) &&
            ((((param_3 !== 3 || (iVar1 = FUN_00453e51(param_1, 0), iVar1 === 0)) &&
              ((param_3 !== 0xb || (iVar1 = FUN_00453e51(param_1, 10), iVar1 === 0)))) &&
             ((param_3 !== 7 || (iVar1 = FUN_0043d20a(param_2, 1), iVar1 === 0)))))) &&
           (((((param_3 !== 10 ||
               ((iVar1 = FUN_0043d20a(param_2, 5), iVar1 !== 0 &&
                (iVar1 = FUN_004bd9f0(param_1, G.DAT_0064c4b6), iVar1 !== 0)))) &&
              ((param_3 !== 0x16 ||
               ((iVar1 = FUN_0043d20a(param_2, 10), iVar1 !== 0 &&
                (iVar1 = FUN_004bd9f0(param_1, G.DAT_0064c4de), iVar1 !== 0)))))) &&
             (((param_3 !== 0xc ||
               ((iVar1 = FUN_0043d20a(param_2, 6), iVar1 !== 0 &&
                (iVar1 = FUN_004bd9f0(param_1, G.DAT_0064c4be), iVar1 !== 0)))) &&
              (((param_3 !== 0x1a ||
                (((iVar1 = FUN_00453e51(param_1, 0x1a), iVar1 === 0 &&
                  (iVar1 = FUN_0043d20a(param_2, 0xc), iVar1 !== 0)) &&
                 (iVar1 = FUN_004bd9f0(param_1, G.DAT_0064c4ee), iVar1 !== 0)))) &&
               ((param_3 !== 0x17 || (iVar1 = FUN_0043d20a(param_2, 9), iVar1 !== 0)))))))) &&
            ((((param_3 !== 0x21 || (iVar1 = FUN_00453e51(param_1, 0x15), iVar1 === 0)) &&
              ((((param_3 !== 0x10 ||
                 ((iVar1 = FUN_0043d20a(param_2, 0xf), iVar1 !== 0 &&
                  (iVar1 = FUN_004bd9f0(param_1, G.DAT_0064c506), iVar1 !== 0)))) &&
                ((param_3 !== 0x14 || ((G.DAT_0064f345[param_2 * 0x58] & 8) !== 0)))) &&
               (((((param_3 !== 0x13 && (param_3 !== 0x14)) && (param_3 !== 0x1d)) && (param_3 !== 0x15)
                 ) || (((iVar1 = FUN_0043d20a(param_2, 0xf), iVar1 !== 0 ||
                        (iVar1 = FUN_0043d20a(param_2, 0x10), iVar1 !== 0)) &&
                       ((param_3 === 0x1d ||
                        ((((iVar1 = FUN_00453e51(param_1, 0x16), iVar1 === 0 &&
                           (iVar1 = FUN_0043d20a(param_2, 0x14), iVar1 === 0)) &&
                          ((iVar1 = FUN_0043d20a(param_2, 0x15), iVar1 === 0 ||
                           (param_3 === 0x14)))) &&
                         (iVar1 = FUN_0043d20a(param_2, 0x1d), iVar1 === 0)))))))))))) &&
             (((param_3 < 0x23 || (0x25 < param_3)) ||
              ((((G.DAT_00655ae8 & 0x80) === 0 && (G.DAT_00655c18 !== -1)) &&
               (((0 < G.DAT_00655afa || ((G.DAT_00655af0 & 0x80) !== 0)) &&
                (iVar1 = FUN_004a7577(param_1), iVar1 === 0)))))))))))) {
          local_8 = 1;
        }
      }
    }
  }
  else {
    local_8 = FUN_004c02d8(param_1, param_3 + -0x27);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c09b0 — ai_pick_research_target
// Source: block_004C0000.c line 108
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c09b0(param_1) {
  let iVar1;
  let iVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_c = -1;
  local_18 = -1;
  local_14 = 0;
  for (local_10 = 0; local_10 < 100; local_10 = local_10 + 1) {
    iVar1 = FUN_004bfdbe(param_1, local_10);
    if (((iVar1 !== 0) &&
        ((G.DAT_0062768e[local_10 * 0x10] !== -2 || (G.DAT_0062768f[local_10 * 0x10] !== -2)))) &&
       (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0 ||
        (((local_14 === 0 || (G.DAT_00655b08 === 0)) ||
         ((local_10 - u8(G.DAT_0064c6b0[param_1 * 0x594])) % 3 !== 0)))))) {
      local_14 = local_14 + 1;
      if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) {
        iVar1 = FUN_004bdb2c(param_1, local_10);
        if (iVar1 === 1 || iVar1 + -1 < 0) {
          local_8 = 0;
        }
        else {
          local_8 = _rand();
          iVar1 = FUN_004bdb2c(param_1, local_10);
          local_8 = local_8 % iVar1;
        }
      }
      else {
        iVar1 = _rand();
        iVar2 = FUN_004bdb2c(param_1, local_10);
        local_8 = iVar1 % 3 + iVar2 + -1;
      }
      if (local_c < local_8) {
        local_c = local_8;
        local_18 = local_10;
      }
    }
  }
  return local_18;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c0b51 — draw_research_item_text (UI)
// Source: block_004C0000.c line 162
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c0b51(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let local_20 = new Array(16).fill(0);
  let local_10;
  let local_c;
  let local_8;

  local_c = param_5;
  if ((param_4 & 1) !== 0) {
    local_c = param_5 + 0x26;
  }
  local_8 = ((0x14 - param_7) / 2) | 0;
  local_10 = param_6 - local_8;
  FUN_005cef31(local_20, param_2, local_c, local_10);
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c0be8 — draw_research_item_text_2 (UI)
// Source: block_004C0000.c line 189
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c0be8(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let local_28 = new Array(16).fill(0);
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_18 = 0xfffffffe;
  local_10 = param_5;
  if ((param_4 & 1) !== 0) {
    local_10 = param_5 + 0x26;
  }
  local_14 = param_6;
  local_8 = FUN_00472cf0(0x30, 0xfffffffe);
  local_c = ((local_8 - param_7) / 2) | 0;
  local_14 = local_14 - local_c;
  FUN_0047df20(local_18);
  FUN_005cef31(local_28, param_2, local_10, local_14);
  FUN_0047df50();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c0c83 — draw_research_item_text_3 (UI)
// Source: block_004C0000.c line 223
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c0c83(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let local_20 = new Array(16).fill(0);
  let local_10;
  let local_c;
  let local_8;

  local_c = param_5;
  if ((param_4 & 1) !== 0) {
    local_c = param_5 + 0x26;
  }
  local_8 = ((0x14 - param_7) / 2) | 0;
  local_10 = param_6 - local_8;
  FUN_005cef31(local_20, param_2, local_c, local_10);
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c0cf7 — show_research_goal_dialog (UI heavy)
// Source: block_004C0000.c line 250
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c0cf7(param_1, param_2, param_3) {
  // This function is primarily UI — research goal selection dialog.
  // It uses CPropertySheet, MFC dialogs, and string formatting.
  // Mechanical transpilation of the full logic follows.

  let iVar2;
  let aiStack_4c0 = new Array(99).fill(0);
  let aiStack_334 = new Array(4).fill(0);
  let local_324;
  let local_320;
  let local_31c;
  let local_318;
  let local_314;
  let local_310;
  let local_30c;
  let local_22c = 0;
  let local_14;

  FUN_0059db08(0x2000);
  aiStack_334[1] = 0;

  let continueOuter = true;
  while (continueOuter) {
    let breakInner = false;
    while (!breakInner) {
      local_318 = 0;
      FUN_0040ffa0(0 /*s_RESEARCHGOAL*/, 1);
      if (aiStack_334[1] === 0) {
        FUN_0059e4e6(2);
        if (G.DAT_00626a24 === 0) {
          FUN_0043c990(0x4b, 0);
          // CPropertySheet::EnableStackedTabs — UI stub
        }
        for (local_31c = 0; local_31c < 100; local_31c = local_31c + 1) {
          if (((G.DAT_00627689[local_31c * 0x10] !== 0) &&
              (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) &&
             ((param_2 === 0 ||
              ((s16(G.DAT_0064c6aa, param_1 * 0x594) !== local_31c &&
               ((G.DAT_0062768e[local_31c * 0x10] !== -2 ||
                (G.DAT_0062768f[local_31c * 0x10] !== -2)))))))) {
            FUN_0040bbb0();
            FUN_0040ff00(G.DAT_00627684[local_31c]);
            if (local_31c === 0x59) {
              FUN_0040fe10();
              FUN_0040ff30(u8(G.DAT_0064c6b1[param_1 * 0x594]) + 1);
            }
            FUN_0059edf0(0 /*&G.DAT_00679640*/, local_31c, 0);
            local_318 = local_318 + 1;
          }
        }
      }
      else if (aiStack_334[1] === 1) {
        if (G.DAT_00626a24 === 0) {
          FUN_0043c990(0x4b, 0);
        }
        for (local_30c = 0; local_30c < 0x3e; local_30c = local_30c + 1) {
          local_31c = s8(G.DAT_0064b1cb[local_30c * 0x14]);
          if (((-1 < local_31c) && (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) &&
             ((param_2 === 0 || (s16(G.DAT_0064c6aa, param_1 * 0x594) !== local_31c)))) {
            FUN_0040bbb0();
            FUN_0040ff00(G.DAT_0064b1b8[local_30c]);
            FUN_0040fe10();
            FUN_0040bbe0(0 /*&G.DAT_0062dbd8*/);
            FUN_0040fea0();
            FUN_0040ff00(G.DAT_00627684[local_31c]);
            FUN_0040fed0();
            FUN_0059edf0(0 /*&G.DAT_00679640*/, local_30c, 0);
            local_318 = local_318 + 1;
          }
        }
      }
      else if (aiStack_334[1] === 2) {
        if (G.DAT_00626a24 === 0) {
          FUN_0043c990(0x4b, 0);
        }
        for (local_320 = 0; local_320 < 0x43; local_320 = local_320 + 1) {
          local_31c = s8(G.DAT_0064c48e[local_320 * 8]);
          if (((-1 < local_31c) && (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) &&
             ((param_2 === 0 || (s16(G.DAT_0064c6aa, param_1 * 0x594) !== local_31c)))) {
            FUN_0040bbb0();
            FUN_0040ff00(G.DAT_0064c488[local_320]);
            FUN_0040fe10();
            FUN_0040bbe0(0 /*&G.DAT_0062dbdc*/);
            FUN_0040fea0();
            FUN_0040ff00(G.DAT_00627684[local_31c]);
            FUN_0040fed0();
            FUN_0059edf0(0 /*&G.DAT_00679640*/, local_320, 0);
            local_318 = local_318 + 1;
          }
        }
      }
      if (local_318 === 0) {
        FUN_004c193a();
        FUN_004c1950();
        return;
      }
      local_310 = 0;
      if (aiStack_334[1] !== 0) {
        FUN_0059f2a3(FUN_00428b0c(0));
        aiStack_334[local_310 + 2] = 0;
        local_310 = local_310 + 1;
      }
      if (aiStack_334[1] !== 1) {
        FUN_0059f2a3(FUN_00428b0c(0));
        aiStack_334[local_310 + 2] = 1;
        local_310 = local_310 + 1;
      }
      if (aiStack_334[1] !== 2) {
        FUN_0059f2a3(FUN_00428b0c(0));
        aiStack_334[local_310 + 2] = 2;
        local_310 = local_310 + 1;
      }
      local_324 = FUN_0040bc80(0);
      if (local_324 < 0) {
        FUN_004c193a();
        FUN_004c1950();
        return;
      }
      if (local_22c !== 1) { breakInner = true; break; }
      if (G.DAT_00626a24 === 0) {
        if (aiStack_334[1] === 0) {
          FUN_00566584(local_324);
        }
        else if (aiStack_334[1] === 1) {
          local_31c = s8(G.DAT_0064b1cb[local_324 * 0x14]);
          local_30c = local_324;
          FUN_0040ffa0(0 /*s_HELPON*/, 1);
          FUN_0059edf0(FUN_00428b0c(G.DAT_0064b1b8[local_30c]), 0, 0);
          FUN_0059edf0(FUN_00428b0c(G.DAT_00627684[local_31c]), 1, 0);
          local_324 = FUN_0040bc80(0);
          if (local_324 === 0) {
            FUN_005ad998(local_30c);
          }
          if (local_324 === 1) {
            FUN_00566584(local_31c);
          }
        }
        else if (aiStack_334[1] === 2) {
          local_31c = s8(G.DAT_0064c48e[local_324 * 8]);
          local_320 = local_324;
          FUN_0040ffa0(0 /*s_HELPON*/, 1);
          FUN_0059edf0(FUN_00428b0c(G.DAT_0064c488[local_320]), 0, 0);
          FUN_0059edf0(FUN_00428b0c(G.DAT_00627684[local_31c]), 1, 0);
          local_324 = FUN_0040bc80(0);
          if (local_324 === 0) {
            FUN_0059a2e6(local_320);
          }
          if (local_324 === 1) {
            FUN_00566584(local_31c);
          }
        }
      }
    }
    if ((local_22c < 2) || (3 < local_22c)) { continueOuter = false; break; }
    aiStack_334[1] = aiStack_334[local_22c];
  }

  if (aiStack_334[1] === 1) {
    local_324 = s8(G.DAT_0064b1cb[local_324 * 0x14]);
  }
  else if (aiStack_334[1] === 2) {
    local_324 = s8(G.DAT_0064c48e[local_324 * 8]);
  }
  local_318 = 0;
  local_314 = 0;
  local_31c = 0;

  // do-while loop with goto restructured
  let doLoop = true;
  while (doLoop) {
    if (99 < local_31c) {
      FUN_004271e8(0, G.DAT_00627684[local_324]);
      if (local_314 === 0) {
        if (param_3 === 0) {
          FUN_00421ea0(0 /*s_RESEARCHNONE*/);
        }
        else {
          FUN_00421ea0(0 /*s_STEALNONE*/);
        }
        FUN_004c193a();
        FUN_004c1950();
        return;
      }
      if (param_3 === 0) {
        FUN_0043c9d0(0 /*s_RESEARCHTHESE*/);
      }
      else {
        FUN_0043c9d0(0 /*s_STEALTHESE*/);
      }
      for (local_14 = 0; local_14 < local_314; local_14 = local_14 + 1) {
        local_31c = aiStack_4c0[local_14];
        FUN_0040bbb0();
        FUN_0040ff00(G.DAT_00627684[local_31c]);
        if ((local_14 < local_314 + -1) && (2 < local_314)) {
          FUN_00421d30();
        }
        else if (local_314 + -2 === local_14) {
          FUN_0040fe10();
        }
        if (local_314 + -2 === local_14) {
          FUN_0040bc10(0xb5);
        }
        if (local_314 + -1 === local_14) {
          FUN_0043c810();
        }
        FUN_0059e18b(0 /*&G.DAT_00679640*/, 0xffffffff, 0xffffffff, 0xffffffff, 0);
      }
      FUN_0040bc80(0);
      FUN_004c193a();
      FUN_004c1950();
      return;
    }
    if ((G.DAT_00627689[local_31c * 0x10] !== 0) &&
       (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) {
      if (param_3 === 0) {
        iVar2 = FUN_004bd9f0(param_1, s8(G.DAT_0062768e[local_31c * 0x10]));
        if (((iVar2 !== 0) &&
            (iVar2 = FUN_004bd9f0(param_1, s8(G.DAT_0062768f[local_31c * 0x10])),
            iVar2 !== 0)) &&
           ((param_2 === 0 || (s16(G.DAT_0064c6aa, param_1 * 0x594) !== local_31c)))) {
          if (((local_318 !== 0) && (G.DAT_00655b08 !== 0)) && ((G.DAT_00655af0 & 0x80) === 0)) {
            iVar2 = (local_31c - (u8(G.DAT_0064c6b0[param_1 * 0x594]) + param_2)) % 3;
            // goto joined_r0x004c1729
            if (iVar2 !== 0) {
              // LAB_004c1734
              if ((G.DAT_0062768e[local_31c * 0x10] !== -2) || (G.DAT_0062768f[local_31c * 0x10] !== -2)) {
                local_318 = local_318 + 1;
                iVar2 = FUN_004bdaa5(local_324, local_31c);
                if (iVar2 !== 0) {
                  aiStack_4c0[local_314] = local_31c;
                  local_314 = local_314 + 1;
                }
              }
            }
          }
          else {
            // LAB_004c1734
            if ((G.DAT_0062768e[local_31c * 0x10] !== -2) || (G.DAT_0062768f[local_31c * 0x10] !== -2)) {
              local_318 = local_318 + 1;
              iVar2 = FUN_004bdaa5(local_324, local_31c);
              if (iVar2 !== 0) {
                aiStack_4c0[local_314] = local_31c;
                local_314 = local_314 + 1;
              }
            }
          }
        }
      }
      else {
        iVar2 = FUN_004bd9f0(param_3, local_31c);
        // joined_r0x004c1729
        if (iVar2 !== 0) {
          // LAB_004c1734
          if ((G.DAT_0062768e[local_31c * 0x10] !== -2) || (G.DAT_0062768f[local_31c * 0x10] !== -2)) {
            local_318 = local_318 + 1;
            iVar2 = FUN_004bdaa5(local_324, local_31c);
            if (iVar2 !== 0) {
              aiStack_4c0[local_314] = local_31c;
              local_314 = local_314 + 1;
            }
          }
        }
      }
    }
    local_31c = local_31c + 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c193a — cleanup_research_dialog_1
// Source: block_004C0000.c line 530
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c193a() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c1950 — cleanup_research_dialog_2 (SEH cleanup)
// Source: decompiled/block_004C0000.c FUN_004c1950 (14 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c1950() {
  // DEVIATION: Win32 — SEH handler cleanup (*unaff_FS_OFFSET = *(unaff_EBP + -0xc))
  // No game state affected — pure structured exception handling teardown
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c195e — choose_research_dialog
// Source: block_004C0000.c line 561
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c195e(param_1, param_2) {
  let iVar1;
  let local_630;
  let local_628;
  let local_624;
  let local_620;
  let aiStack_61c = new Array(5).fill(0);
  let local_608;
  let local_604;
  let local_524 = 0;
  let local_30c;
  let local_14;

  FUN_0059db08(0x4000);
  FUN_0059db08(0x4000);
  local_604 = FUN_004c09b0(param_1);
  if ((param_2 !== 0) ||
     (((iVar1 = local_604, G.DAT_00655af8 !== 0 &&
       ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0)) && (G.DAT_00654fa8 === 0)))) {
    let looping = true;
    while (looping) {
      iVar1 = local_604;
      if (((G.DAT_00655aea[1] & 2) !== 0) && (param_2 === 0)) {
        FUN_0040bbb0();
        FUN_0040ff00(G.DAT_00627684[iVar1]);
        if (iVar1 === 0x59) {
          FUN_0040fe10();
          FUN_0040ff30(u8(G.DAT_0064c6b1[param_1 * 0x594]) + 1);
        }
        FUN_0040ff60(0, 0 /*&G.DAT_00679640*/);
        local_630 = 0;
        local_620 = 0;
        for (local_608 = 0; local_608 < 0x3e; local_608 = local_608 + 1) {
          if ((s8(G.DAT_0064b1cb[local_608 * 0x14]) === iVar1) && (local_620 < 5)) {
            aiStack_61c[local_620] = local_608;
            local_620 = local_620 + 1;
          }
        }
        for (local_628 = 1; local_628 < 0x43; local_628 = local_628 + 1) {
          if ((s8(G.DAT_0064c48e[local_628 * 8]) === iVar1) && (local_620 < 5)) {
            aiStack_61c[local_620] = -local_628;
            local_620 = local_620 + 1;
          }
        }
        if (local_620 === 0) {
          for (local_30c = 0; local_30c < 100; local_30c = local_30c + 1) {
            if ((G.DAT_00627689[local_30c * 0x10] !== 0) &&
               (((s8(G.DAT_0062768e[local_30c * 0x10]) === iVar1 ||
                 (s8(G.DAT_0062768f[local_30c * 0x10]) === iVar1)) && (local_620 < 5)))) {
              aiStack_61c[local_620] = local_30c;
              local_620 = local_620 + 1;
            }
          }
          if (local_620 !== 0) {
            local_630 = 2;
          }
        }
        else {
          local_630 = 1;
        }
        FUN_0040bbb0();
        FUN_0040bbe0(0 /*s_SCIENCE*/);
        FUN_0040ff30(local_630);
        // CSocket::Create — UI stub
        // C: FUN_0059ec88(&G.DAT_00646cb8 + (char)G.DAT_0062768d[iVar1*0x10]*0x3c +
        //                 (char)G.DAT_0062768c[iVar1*0x10]*0xf0, (G.DAT_00633584==0)-1 & 8, 0)
        FUN_0059ec88(G.DAT_00646cb8 +
                     s8(G.DAT_0062768d[iVar1 * 0x10]) * 0x3c +
                     s8(G.DAT_0062768c[iVar1 * 0x10]) * 0xf0,
                     (G.DAT_00633584 !== 0) ? 8 : 0,
                     0);
        if (local_630 !== 0) {
          FUN_0040bbb0();
          for (local_14 = 0; local_14 < local_620; local_14 = local_14 + 1) {
            if (local_630 === 1) {
              local_608 = aiStack_61c[local_14];
              if (local_608 < 0) {
                FUN_0040ff00(G.DAT_0064c488[local_608 * -1]);
              }
              else {
                FUN_0040ff00(G.DAT_0064b1b8[local_608]);
              }
            }
            else {
              FUN_0040ff00(G.DAT_00627684[aiStack_61c[local_14]]);
            }
            if (local_14 < local_620 + -1) {
              if (local_620 < 3) {
                FUN_0040fe10();
              }
              else {
                FUN_00421d30();
              }
              if (local_620 + -2 === local_14) {
                FUN_0040bc10(0xdb);
                FUN_0040fe10();
              }
            }
            else {
              FUN_0043c810();
            }
          }
          FUN_0059e18b(0 /*&G.DAT_00679640*/, 0xffffffff, 0xffffffff, 0xffffffff, 0);
        }
        iVar1 = FUN_00421bb0();
        FUN_005a5f34(0, iVar1 + -300);
      }
      iVar1 = FUN_004bd9f0(param_1, 0x26);
      // C: FUN_004271e8(0, *(undefined4*)(G.DAT_00628420 + 0xc4 + (uint)(iVar1==0)*-4))
      FUN_004271e8(0, G.DAT_00628420 + 0xc4 + ((iVar1 === 0) ? -4 : 0));
      FUN_0043c9d0(0 /*s_RESEARCH*/);
      if ((G.DAT_00655aea[1] & 2) !== 0) {
        FUN_0059e783(5, 0xfffffc19);
      }
      // CPropertySheet::EnableStackedTabs — UI stub
      FUN_0043c990(0x4b, 0);
      local_620 = 0;
      for (local_624 = 0; local_624 < 100; local_624 = local_624 + 1) {
        if (((((G.DAT_00627689[local_624 * 0x10] !== 0) &&
              (iVar1 = FUN_004bd9f0(param_1, local_624), iVar1 === 0)) &&
             ((iVar1 = FUN_004bd9f0(param_1, s8(G.DAT_0062768e[local_624 * 0x10])),
              iVar1 !== 0 &&
              (iVar1 = FUN_004bd9f0(param_1, s8(G.DAT_0062768f[local_624 * 0x10])),
              iVar1 !== 0)))) &&
            ((G.DAT_0062768e[local_624 * 0x10] !== -2 || (G.DAT_0062768f[local_624 * 0x10] !== -2)))
            ) && ((local_620 === 0 ||
                  ((((G.DAT_00655b08 === 0 || (param_2 !== 0)) || ((G.DAT_00655af0 & 0x80) !== 0)) ||
                   ((local_624 - u8(G.DAT_0064c6b0[param_1 * 0x594])) % 3 !== 0)))))) {
          FUN_0040bbb0();
          FUN_0040ff00(G.DAT_00627684[local_624]);
          if (local_624 === 0x59) {
            FUN_0040fe10();
            FUN_0040ff30(u8(G.DAT_0064c6b1[param_1 * 0x594]) + 1);
          }
          FUN_0059edf0(0 /*&G.DAT_00679640*/, local_624, 0);
          local_620 = local_620 + 1;
        }
      }
      iVar1 = local_604;
      if (local_620 === 0) { looping = false; break; }
      iVar1 = FUN_005a5f34(0, 300);
      if ((G.DAT_00655aea[1] & 2) !== 0) {
        FUN_0059db65();
        FUN_00484d52();
      }
      if (local_524 === 2) {
        FUN_004c0cf7(param_1, 0, 0);
      }
      else {
        if (local_524 === 0) { looping = false; break; }
        FUN_00566584(iVar1);
      }
    }
  }
  local_604 = iVar1;
  w16(G.DAT_0064c6aa, param_1 * 0x594, local_604);
  FUN_004c217c();
  FUN_004c2188();
  FUN_004c219e();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c217c — cleanup_choose_research_1
// Source: block_004C0000.c line 741
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c217c() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c2188 — cleanup_choose_research_2
// Source: block_004C0000.c line 755
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c2188() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c219e — cleanup_choose_research_3 (SEH)
// Source: decompiled/block_004C0000.c FUN_004c219e (15 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c219e() {
  // DEVIATION: Win32 — SEH handler cleanup (*unaff_FS_OFFSET = *(unaff_EBP + -0xc))
  // No game state affected — pure structured exception handling teardown
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c21ad — choose_research_wrapper
// Source: block_004C0000.c line 786
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c21ad(param_1) {
  FUN_004c195e(param_1, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c21d5 — complete_research_advance
// Source: block_004C0000.c line 800
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c21d5(param_1, param_2) {
  let sVar1;
  let iVar2;
  let local_30c;

  // C: block_004C0000.c lines 817-834
  FUN_0059db08(0x4000);
  sVar1 = s16(G.DAT_0064c6aa, param_1 * 0x594);
  if (s16(G.DAT_0064c6aa, param_1 * 0x594) < 0) {
    FUN_004c21ad(param_1);
    sVar1 = s16(G.DAT_0064c6aa, param_1 * 0x594);
  }
  local_30c = sVar1;
  if (local_30c < 0) {
    FUN_004c2763();
    FUN_004c2779();
    return;
  }
  if (G.DAT_0062db00 !== 2) {
    w16(G.DAT_0064c6a8, param_1 * 0x594, 0);
  }
  w16(G.DAT_0064c6aa, param_1 * 0x594, 0xffff);
  FUN_004bf05b(param_1, local_30c, param_2, 0, 0);
  if ((G.DAT_00655af8 !== 0) && ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0)) {
    if ((G.DAT_006d1da0 === param_1) && (G.DAT_00654fa8 === 0)) {
      let uVar3 = FUN_00493d13(param_1);
      FUN_00421d60(0, uVar3);
      iVar2 = FUN_004bd9f0(param_1, 0x26);
      // C: FUN_004271e8(1, *(undefined4*)(G.DAT_00628420 + 0xc4 + (uint)(iVar2==0)*-4))
      FUN_004271e8(1, G.DAT_00628420 + 0xc4 + ((iVar2 === 0) ? -4 : 0));
      FUN_0040bbb0();
      FUN_0040ff00(G.DAT_00627684[local_30c]);
      if (local_30c === 0x59) {
        FUN_0040fe10();
        FUN_0040ff30(G.DAT_0064c6b1[param_1 * 0x594]);
      }
      FUN_00421d60(2, 0 /*&G.DAT_00679640*/);
      FUN_0043c9d0(0 /*s_CIVADVANCE*/);
      // C: FUN_0059ec88(&G.DAT_00646cb8 + (char)G.DAT_0062768c[local_30c*0x10]*0xf0 +
      //                 (char)G.DAT_0062768d[local_30c*0x10]*0x3c, 0, 0)
      FUN_0059ec88(G.DAT_00646cb8 +
                   s8(G.DAT_0062768c[local_30c * 0x10]) * 0xf0 +
                   s8(G.DAT_0062768d[local_30c * 0x10]) * 0x3c,
                   0, 0);
      // CPropertySheet::EnableStackedTabs — UI stub
      FUN_0040bc80(0);
      if ((G.DAT_00655aea[2] & 8) !== 0) {
        FUN_00566584(local_30c);
      }
      if ((((local_30c === 0x3c) && ((u16(G.DAT_0064c6a0, param_1 * 0x594) & 0x20) !== 0)) &&
          (G.DAT_006d1da0 === param_1)) && (G.DAT_00654fa8 === 0)) {
        FUN_004bee56(param_1);
      }
      if (G.DAT_0064b1df === local_30c) {
        FUN_00410030(0 /*s_NEWXFORM*/, 0, 8);
      }
      if (local_30c === 0x12) {
        FUN_00410030(0 /*s_NEWFORTRESS*/, 0, 0);
      }
      if (G.DAT_0064c58e === local_30c) {
        FUN_00410030(0 /*s_NEWAIRLIFT*/, 0, 8);
      }
      if (local_30c === 0x43) {
        FUN_00410030(0 /*s_NEWRAILROAD*/, 0, 8);
      }
      if (G.DAT_0064c54e === local_30c) {
        FUN_0043c9d0(0 /*s_NEWFARMLAND*/);
        FUN_0059ec88(0, 0, 0);
        FUN_0059ec88(0, 0, 0);
        FUN_0040bc80(0);
      }
      if (G.DAT_0064b2cf === local_30c) {
        FUN_004c4210(0, G.DAT_0064bcdb);
        FUN_00410030(0 /*s_NEWPARADROP*/, 0, 8);
      }
      if (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_00655af8 !== 0)) {
        FUN_004c21ad(param_1);
        FUN_004bea84(param_1, local_30c);
      }
      FUN_004c2763();
      FUN_004c2779();
      return;
    }
    FUN_004c2763();
    FUN_004c2779();
    return;
  }
  iVar2 = FUN_005b8d15_CSplitterWnd_IsTracking();
  FUN_00442541(param_1, 0xffffffff);
  if (((G.DAT_00655af8 !== 0) && (-1 < iVar2)) &&
     ((iVar2 < G.DAT_00655b18 &&
      ((s32(G.DAT_0064f394, iVar2 * 0x58) !== 0 &&
       (s8(G.DAT_0064f348[iVar2 * 0x58]) === param_1)))))) {
    FUN_004eb4ed(iVar2, 0);
  }
  FUN_004c2763();
  FUN_004c2779();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c2763 — cleanup_complete_research_1
// Source: block_004C0000.c line 919
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c2763() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c2779 — cleanup_complete_research_2 (SEH)
// Source: decompiled/block_004C0000.c FUN_004c2779 (15 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c2779() {
  // DEVIATION: Win32 — SEH handler cleanup (*unaff_FS_OFFSET = *(unaff_EBP + -0xc))
  // No game state affected — pure structured exception handling teardown
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c2788 — calculate_research_cost
// Source: block_004C0000.c line 950
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c2788(param_1) {
  let uVar1;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;

  uVar1 = u8(G.DAT_0064c6b0[param_1 * 0x594]) +
          u8(G.DAT_0064c6b2[param_1 * 0x594]);
  if (uVar1 < 2) {
    uVar1 = 1;
  }
  local_14 = FUN_005adfa0(G.DAT_00655b08, 0, 4);
  if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) {
    local_14 = 0xe - local_14;
  }
  else {
    local_14 = local_14 * 2 + 6;
  }
  if (((G.DAT_00655af0 & 0x80) === 0) || (G.DAT_0064bcb4 === 0)) {
    if (uVar1 < u8(G.DAT_0064c6b0[G.DAT_00655c20 * 0x594]) +
                u8(G.DAT_0064c6b2[G.DAT_00655c20 * 0x594])) {
      if (G.DAT_00655b08 !== 0) {
        local_14 = local_14 + -1;
      }
      if (((G.DAT_00655b08 === 5) &&
          (uVar1 + 4 <
           u8(G.DAT_0064c6b0[G.DAT_00655c20 * 0x594]) +
           u8(G.DAT_0064c6b2[G.DAT_00655c20 * 0x594]))) && (0x96 < G.DAT_00655af8)) {
        local_14 = local_14 + -1;
      }
    }
    else {
      local_14 = local_14 +
                 ((uVar1 - (u8(G.DAT_0064c6b0[G.DAT_00655c20 * 0x594]) +
                             u8(G.DAT_0064c6b2[G.DAT_00655c20 * 0x594]))) / 3) | 0;
    }
    local_10 = 0;
    if (0x13 < uVar1) {
      local_10 = FUN_005adfa0(uVar1 - ((G.DAT_00655af8 +
                                                  (G.DAT_00655af8 >> 31 & 7)) >> 3), 0, 6);
    }
    local_14 = local_14 + local_10;
  }
  if ((G.DAT_00655af0 & 0x80) === 0) {
    if (G.DAT_0064bcd3 !== 10) {
      local_14 = (G.DAT_0064bcd3 * local_14 / 10) | 0;
    }
  }
  else if (G.DAT_0064bcb2 !== 10) {
    local_14 = (G.DAT_0064bcb2 * local_14 / 10) | 0;
  }
  local_1c = (local_14 * 3) >> 2;
  if (u8(G.DAT_0064c6b0[param_1 * 0x594]) + u8(G.DAT_0064c6b2[param_1 * 0x594]) < 0x14) {
    local_1c = (((u8(G.DAT_0064c6b0[param_1 * 0x594]) +
                 u8(G.DAT_0064c6b2[param_1 * 0x594])) * local_1c) / 0x14) | 0;
  }
  local_14 = local_14 + local_1c;
  if (0x43 < G.DAT_00655b1a) {
    local_14 = ((local_14 * 0x43) / G.DAT_00655b1a) | 0;
  }
  if ((G.DAT_00655af0 & 4) !== 0) {
    local_14 = (local_14 * 5 + (local_14 * 5 >> 31 & 3)) >> 2;
  }
  if ((G.DAT_00655af0 & 8) !== 0) {
    local_14 = ((local_14 << 2) / 5) | 0;
  }
  if (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) && (local_14 < (0xb - uVar1))) {
    local_14 = 0xb - uVar1;
  }
  local_18 = local_14 * uVar1;
  if ((local_18 < 1) || (32000 < local_18)) {
    local_18 = 32000;
  }
  return local_18;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c2b73 — add_research_points
// Source: block_004C0000.c line 1038
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004c2b73 (458 bytes)
export function FUN_004c2b73(param_1, param_2) {
  let sVar1;
  let iVar2;

  if (0 < param_2) {
    // C: *(short *)(&G.DAT_0064c6a8 + param_1 * 0x594) += (short)param_2
    w16(G.DAT_0064c6a8, param_1 * 0x594,
         s16(G.DAT_0064c6a8, param_1 * 0x594) + (param_2 & 0xFFFF));
    if (-1 < s16(G.DAT_0064c6aa, param_1 * 0x594)) {
      sVar1 = s16(G.DAT_0064c6a8, param_1 * 0x594);
      iVar2 = FUN_004c2788(param_1);
      if (iVar2 <= sVar1) {
        FUN_004c21d5(param_1, 0);
      }
      if ((u16(G.DAT_0064c6a0, param_1 * 0x594) & 0x20) !== 0) {
        w16(G.DAT_0064c6a0, param_1 * 0x594,
             u16(G.DAT_0064c6a0, param_1 * 0x594) & 0xffdf);
        FUN_004c21d5(param_1, 0);
      }
    }
    if ((s16(G.DAT_0064c6a8, param_1 * 0x594) !== 0) &&
       (s16(G.DAT_0064c6aa, param_1 * 0x594) < 0)) {
      if (((G.DAT_00655aea[1] & 1) !== 0) &&
         (((u8(G.DAT_0064c6b0[param_1 * 0x594]) < 2 &&
          ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0))))) {
        FUN_004904c0(0 /*PTR_s_TUTORIAL*/, 0 /*s_FIRSTCIV*/, 0, 0);
      }
      FUN_004c21ad(param_1);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c4210 — set_paradrop_range
// Source: block_004C0000.c line 1079
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c4210(param_1, param_2) {
  G.DAT_0063cc30[param_1] = u8(param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c4240 — show_popup_message_1
// Source: block_004C0000.c line 1093
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c4240(param_1, param_2, param_3) {
  FUN_004a6b80(G.DAT_006359d4, param_1, 0, param_2, param_3);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c4280 — refresh_display
// Source: block_004C0000.c line 1107
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c4280() {
  FUN_0041f8d9();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c42a0 — execute_worker_order
// Source: block_004C0000.c line 1121
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c42a0(param_1, param_2) {
  let cVar1;
  let cVar2;
  let iVar3;
  let bVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let pbVar8;
  let iVar9;
  let uVar10;
  let local_14;
  let local_8;

  iVar3 = param_1;
  local_8 = 1;
  cVar1 = s8(G.DAT_006560f7[param_1 * 0x20]);
  iVar5 = s16(G.DAT_006560f0, param_1 * 0x20);
  iVar6 = s16(G.DAT_006560f2, param_1 * 0x20);
  bVar4 = FUN_005b89bb(iVar5, iVar6);
  uVar10 = u8(bVar4);
  cVar2 = s8(G.DAT_006560ff[param_1 * 0x20]);
  G.DAT_006560ff[param_1 * 0x20] = param_2;
  switch (param_2) {
  case 4:
    local_8 = ((s8(G.DAT_00627cc8[uVar10 * 0x18]) / 2) | 0) + 3;
    break;
  case 5:
    uVar7 = FUN_005b94d5(iVar5, iVar6);
    local_8 = (((uVar7 & 0x10) === 0 ? -2 : 0) + 4) *
              s8(G.DAT_00627cc8[uVar10 * 0x18]);
    pbVar8 = FUN_005b8931(iVar5, iVar6);
    // C: if ((*pbVar8 & 0x80) != 0) — reads tile byte 0 via pointer
    if ((tileRead(pbVar8, 0) & 0x80) !== 0) {
      local_8 = local_8 + 2;
    }
    break;
  case 6:
    local_8 = s8(G.DAT_00627cd2[uVar10 * 0x18]);
    break;
  case 7:
    local_8 = s8(G.DAT_00627cd3[uVar10 * 0x18]);
    break;
  case 8:
    local_8 = s8(G.DAT_00627cc8[uVar10 * 0x18]) * G.DAT_0064bcd4;
    break;
  case 9:
    local_8 = 4;
    break;
  case 10:
    local_8 = 4;
    break;
  }
  G.DAT_0062804c = 0;
  FUN_005b6787(param_1);
  local_14 = -1;
  param_1 = FUN_005b2d39(param_1);

  // Restructured do-while with goto LAB_004c44ea
  let reachedLabel = false;
  while (true) {
    if (param_1 < 0) {
      reachedLabel = true;
    }
    else if (((s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 5) &&
        (s8(G.DAT_006560ff[param_1 * 0x20]) === param_2)) && (param_1 !== iVar3)) {
      local_14 = param_1;
      reachedLabel = true;
    }
    else {
      param_1 = FUN_005b2c82(param_1);
      continue;
    }

    if (reachedLabel) {
      // LAB_004c44ea
      if (-1 < local_14) {
        G.DAT_006560fd[iVar3 * 0x20] =
             G.DAT_006560fd[iVar3 * 0x20] + G.DAT_006560fd[local_14 * 0x20];
        G.DAT_006560fd[local_14 * 0x20] = 0;
      }
      G.DAT_006560fd[iVar3 * 0x20] = G.DAT_006560fd[iVar3 * 0x20] + 1;
      if (s8(G.DAT_006560f6[iVar3 * 0x20]) === 1) {
        G.DAT_006560fd[iVar3 * 0x20] = G.DAT_006560fd[iVar3 * 0x20] + 1;
      }
      if (s8(G.DAT_006560fd[iVar3 * 0x20]) < local_8) {
        FUN_0047ce1e(iVar5, iVar6, 0, G.DAT_006d1da0, 1);
        if (G.DAT_006560ff[iVar3 * 0x20] !== cVar2) {
          FUN_citywin_C494(iVar3, 0xffffff9d, 0xffffff9d);
        }
      }
      else {
        for (param_1 = FUN_005b2d39(iVar3); -1 < param_1;
            param_1 = FUN_005b2c82(param_1)) {
          if ((s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 5) &&
             (s8(G.DAT_006560ff[param_1 * 0x20]) === param_2)) {
            G.DAT_006560fd[param_1 * 0x20] = 0;
            G.DAT_006560ff[param_1 * 0x20] = 0xff;
          }
        }
        switch (param_2) {
        case 4:
          iVar9 = FUN_005b8ca6(iVar5, iVar6);
          if (iVar9 < 0) {
            FUN_005b94fc(iVar5, iVar6, 0x40, 1, 1);
            FUN_005b94fc(iVar5, iVar6, 2, 0, 1);
          }
          break;
        case 5:
          uVar10 = FUN_005b94d5(iVar5, iVar6);
          if (((uVar10 & 0x10) === 0) && (iVar9 = FUN_005b8ca6(iVar5, iVar6), iVar9 < 0)) {
            FUN_005b94fc(iVar5, iVar6, 0x10, 1, 1);
          }
          else {
            iVar9 = FUN_004bd9f0(cVar1, 0x43);
            if (iVar9 !== 0) {
              FUN_005b94fc(iVar5, iVar6, 0x30, 1, 1);
            }
          }
          break;
        case 6:
        case 7:
          if (s8(G.DAT_00627cc8[uVar10 * 0x18 + param_2]) < 0) {
            if (param_2 === 6) {
              uVar10 = FUN_005b94d5(iVar5, iVar6);
              if ((uVar10 & 4) === 0) {
                FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
                FUN_005b94fc(iVar5, iVar6, 4, 1, 1);
              }
              else {
                iVar9 = FUN_004bd9f0(cVar1, 0x46);
                if (iVar9 !== 0) {
                  FUN_005b94fc(iVar5, iVar6, 0xc, 1, 1);
                }
              }
            }
            else {
              FUN_005b94fc(iVar5, iVar6, 4, 0, 1);
              FUN_005b94fc(iVar5, iVar6, 8, 1, 1);
            }
          }
          else {
            FUN_005b9646(iVar5, iVar6, s8(G.DAT_00627cc8[uVar10 * 0x18 + param_2]), 1);
            cVar1 = s8(G.DAT_00627cc8[uVar10 * 0x18 + param_2]);
            if ((s8(G.DAT_00627cce[cVar1 * 0x18]) !== -2) &&
               (uVar10 = FUN_005b94d5(iVar5, iVar6), (uVar10 & 4) !== 0)) {
              FUN_005b94fc(iVar5, iVar6, 0xc, 0, 1);
            }
            if ((s8(G.DAT_00627ccf[cVar1 * 0x18]) !== -2) &&
               (bVar4 = FUN_005b94d5(iVar5, iVar6), (bVar4 & 0xc) === 8)) {
              FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
            }
          }
          break;
        case 8:
          FUN_005b9646(iVar5, iVar6, s8(G.DAT_00627ccd[uVar10 * 0x18]), 1);
          cVar1 = s8(G.DAT_00627ccd[uVar10 * 0x18]);
          if ((s8(G.DAT_00627cce[cVar1 * 0x18]) !== -2) &&
             (uVar10 = FUN_005b94d5(iVar5, iVar6), (uVar10 & 4) !== 0)) {
            FUN_005b94fc(iVar5, iVar6, 0xc, 0, 1);
          }
          if ((s8(G.DAT_00627ccf[cVar1 * 0x18]) !== -2) &&
             (bVar4 = FUN_005b94d5(iVar5, iVar6), (bVar4 & 0xc) === 8)) {
            FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
          }
          break;
        case 9:
          uVar10 = FUN_005b94d5(iVar5, iVar6);
          if ((uVar10 & 0x80) !== 0) {
            G.DAT_00655b12 = G.DAT_00655b12 + -1;
          }
          FUN_005b94fc(iVar5, iVar6, 0x80, 0, 1);
          break;
        case 10:
          iVar9 = FUN_005b8ca6(iVar5, iVar6);
          if (iVar9 < 0) {
            FUN_005b94fc(iVar5, iVar6, 0x42, 1, 1);
          }
          break;
        }
        FUN_005b8b1a(iVar5, iVar6, s8(G.DAT_006560f7[iVar3 * 0x20]));
        FUN_0047ce1e(iVar5, iVar6, 1, G.DAT_006d1da0, 1);
        if (s8(G.DAT_006560f7[iVar3 * 0x20]) === G.DAT_006d1da0) {
          FUN_0056a65e(1);
        }
        if (G.DAT_006560ff[iVar3 * 0x20] !== cVar2) {
          FUN_citywin_C494(iVar3, 0xffffff9d, 0xffffff9d);
        }
        FUN_citywin_C6EF(iVar5, iVar6);
      }
      return;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c4ada — unit_fortify_order
// Source: block_004C0000.c line 1312
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c4ada(param_1) {
  let bVar1;
  let iVar2;
  let local_c;
  let local_8;

  G.DAT_0062804c = 0;
  G.DAT_006560ff[param_1 * 0x20] = 2;
  if (((G.DAT_00655b0b & (1 << (G.DAT_006560f7[param_1 * 0x20] & 0x1f))) === 0) &&
     (-1 < s8(G.DAT_00656100[param_1 * 0x20]))) {
    iVar2 = FUN_0043cf76(s16(G.DAT_006560f0, param_1 * 0x20),
                               s16(G.DAT_006560f2, param_1 * 0x20));
    if (iVar2 < 0) {
      bVar1 = FUN_005b94d5(s16(G.DAT_006560f0, param_1 * 0x20),
                                 s16(G.DAT_006560f2, param_1 * 0x20));
      if ((((bVar1 & 0x42) === 0x40) &&
          (iVar2 = FUN_0043d07a(s16(G.DAT_006560f0, param_1 * 0x20),
                                      s16(G.DAT_006560f2, param_1 * 0x20),
                                      s8(G.DAT_006560f7[param_1 * 0x20]), 0xffffffff,
                                      0xffffffff), -1 < iVar2)) &&
         (s8(G.DAT_0064f349[iVar2 * 0x58]) > 2)) {
        if (G.DAT_00656100[param_1 * 0x20] === -1) {
          local_8 = 0xffffffff;
        }
        else {
          local_8 = u8(G.DAT_00656100[param_1 * 0x20]);
        }
        local_c = iVar2;
        G.DAT_00656100[param_1 * 0x20] = local_c;
        if (-1 < local_8) {
          FUN_citywin_C679(local_8);
        }
        FUN_citywin_C679(iVar2);
      }
    }
    else if (s8(G.DAT_0064f349[iVar2 * 0x58]) > 2) {
      if (G.DAT_00656100[param_1 * 0x20] === -1) {
        local_8 = 0xffffffff;
      }
      else {
        local_8 = u8(G.DAT_00656100[param_1 * 0x20]);
      }
      local_c = iVar2;
      G.DAT_00656100[param_1 * 0x20] = local_c;
      if (-1 < local_8) {
        FUN_citywin_C679(local_8);
      }
      FUN_citywin_C679(iVar2);
    }
  }
  FUN_0047cea6(s16(G.DAT_006560f0, param_1 * 0x20),
                     s16(G.DAT_006560f2, param_1 * 0x20));
  FUN_citywin_C494(param_1, 0xffffff9d, 0xffffff9d);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c4d1e — settle_city
// Source: block_004C0000.c line 1377
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c4d1e(param_1, param_2, param_3) {
  let iVar1;
  let iVar2;
  let local_10;

  iVar1 = s16(G.DAT_006560f0, param_1 * 0x20);
  iVar2 = s16(G.DAT_006560f2, param_1 * 0x20);
  if ((G.DAT_00655b07 !== 0) || (s8(G.DAT_006560f7[param_1 * 0x20]) === G.DAT_006d1da0)) {
    FUN_004105f8(iVar1, iVar2, s8(G.DAT_006560f7[param_1 * 0x20]));
  }
  if ((-1 < param_2) ||
     (param_2 = create_city(iVar1, iVar2, s8(G.DAT_006560f7[param_1 * 0x20])),
     -1 < param_2)) {
    if (param_3 !== 0) {
      FUN_005f22d0(0 /*&G.DAT_0064f360 + param_2 * 0x58*/, param_3);
    }
    FUN_005b4391(param_1, 1);
    FUN_005b94fc(iVar1, iVar2, 0x7c, 0, 1);
    for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
      FUN_005b8b1a(iVar1, iVar2, local_10);
    }
    FUN_0047ce1e(iVar1, iVar2, 1, G.DAT_006d1da0, 1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c4e6d — unit_goto_order
// Source: block_004C0000.c line 1412
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c4e6d(param_1) {
  let bVar1;
  let bVar2;
  let iVar3;

  G.DAT_0062804c = 0;
  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  bVar2 = G.DAT_006560ff[param_1 * 0x20];
  G.DAT_0062d044 = s8(bVar1);
  if ((bVar2 & 0x10) !== 0) {
    G.DAT_0062d044 = -1;
  }
  iVar3 = FUN_004adafc(param_1);
  if ((iVar3 < 0) || (iVar3 === 8)) {
    if ((iVar3 !== 8) &&
       (G.DAT_006560ff[param_1 * 0x20] = 0xff,
       s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 4)) {
      G.DAT_006560fd[param_1 * 0x20] = G.DAT_00655af8 & 7;
    }
  }
  else {
    iVar3 = FUN_0059062c(param_1, iVar3, 3);
    if (iVar3 === 0) {
      return;
    }
    w16(G.DAT_006560f4, param_1 * 0x20,
         s16(G.DAT_006560f4, param_1 * 0x20) & 0xff7f);
    if (((s16(G.DAT_006560f0, param_1 * 0x20) === s16(G.DAT_00656102, param_1 * 0x20))
        && (s16(G.DAT_006560f2, param_1 * 0x20) === s16(G.DAT_00656104, param_1 * 0x20)
           )) && ((bVar2 & 0x10) === 0)) {
      G.DAT_006560ff[param_1 * 0x20] = 0xff;
      w16(G.DAT_006560f4, param_1 * 0x20,
           s16(G.DAT_006560f4, param_1 * 0x20) | 0x80);
      if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) &&
         (((s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 2 ||
           ((s8(G.DAT_006560fe[param_1 * 0x20]) > 9 &&
            (iVar3 = FUN_005b4b66(s16(G.DAT_006560f0, param_1 * 0x20),
                                        s16(G.DAT_006560f2, param_1 * 0x20),
                                        s8(bVar1)), iVar3 === 0)))) &&
          (FUN_005b6787(param_1),
          s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 4)))) {
        G.DAT_006560fd[param_1 * 0x20] = G.DAT_00655af8 & 7;
      }
    }
  }
  G.DAT_0062d044 = 0xffffffff;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c50d0 — unit_pillage_improvements
// Source: block_004C0000.c line 1470
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c50d0(param_1, param_2) {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let pbVar5;

  iVar2 = s16(G.DAT_006560f0, param_1 * 0x20);
  iVar3 = s16(G.DAT_006560f2, param_1 * 0x20);
  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  iVar4 = FUN_0043d07a(iVar2, iVar3, 0xffffffff, 0xffffffff, 0xffffffff);
  if ((((iVar4 < 0) || (s8(G.DAT_0064f348[iVar4 * 0x58]) === s8(bVar1))) ||
      ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0)) ||
     (iVar4 = FUN_00579ed0(s8(bVar1), s8(G.DAT_0064f348[iVar4 * 0x58]), 0xe),
     iVar4 === 0)) {
    iVar4 = FUN_005b8931(iVar2, iVar3);
    // C: pbVar5 = (byte *)(iVar4 + 1) — tile byte[1] = improvements
    let improv = tileRead(iVar4, 1);
    if (param_2 < 1) {
      if ((s8(G.DAT_006560f6[param_1 * 0x20]) === 9) && ((improv & 0x10) !== 0)) {
        if ((improv & 0x20) === 0) {
          FUN_005b94fc(iVar2, iVar3, 0x10, 0, 1);
        }
        else {
          FUN_005b94fc(iVar2, iVar3, 0x20, 0, 1);
        }
      }
      else if ((improv & 0xc) === 0) {
        if ((improv & 0x40) === 0) {
          if ((improv & 0x20) === 0) {
            FUN_005b94fc(iVar2, iVar3, 0x10, 0, 1);
          }
          else {
            FUN_005b94fc(iVar2, iVar3, 0x20, 0, 1);
          }
        }
        else {
          FUN_005b94fc(iVar2, iVar3, 0x42, 0, 1);
        }
      }
      else if ((improv & 8) === 0) {
        FUN_005b94fc(iVar2, iVar3, 4, 0, 1);
      }
      else {
        FUN_005b94fc(iVar2, iVar3, 8, 0, 1);
      }
    }
    else {
      FUN_005b94fc(iVar2, iVar3, param_2, 0, 1);
    }
    iVar4 = FUN_0043d07a(iVar2, iVar3, 0xffffffff, 0xffffffff, 0xffffffff);
    if (-1 < iVar4) {
      FUN_005b8b1a(iVar2, iVar3, s8(G.DAT_006560f7[param_1 * 0x20]));
      FUN_005b8b1a(iVar2, iVar3, s8(G.DAT_0064f348[iVar4 * 0x58]));
      FUN_00467825(s8(G.DAT_006560f7[param_1 * 0x20]),
                         s8(G.DAT_0064f348[iVar4 * 0x58]), 0x2000);
      if (G.DAT_0064f348[iVar4 * 0x58] !== G.DAT_006560f7[param_1 * 0x20]) {
        FUN_0049301b(s8(G.DAT_006560f7[param_1 * 0x20]), iVar2, iVar3, 0, 4);
      }
    }
    FUN_0047ce1e(iVar2, iVar3, 1, G.DAT_006d1da0, 1);
    FUN_005b6787(param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c5408 — process_unit_order
// Source: block_004C0000.c line 1544
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c5408(param_1) {
  let local_8;

  local_8 = 1;
  let order = s8(G.DAT_006560ff[param_1 * 0x20]);
  switch (order) {
  case 1:
    FUN_004c4ada(param_1);
    break;
  case 4:
  case 5:
  case 6:
  case 7:
  case 8:
  case 9:
  case 10:
    FUN_004c42a0(param_1, order);
    break;
  case 0xb:
  case 0x1b:
    FUN_004c4e6d(param_1);
    break;
  default:
    local_8 = 0;
    break;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c54da — unit_return_to_nearest_city
// Source: block_004C0000.c line 1580
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c54da(param_1) {
  let iVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let uVar11;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_20;
  let local_14;
  let local_c;
  let local_8;

  iVar5 = param_1;
  local_8 = 999;
  let bVar1 = G.DAT_006560f6[param_1 * 0x20];
  iVar6 = s16(G.DAT_006560f0, param_1 * 0x20);
  iVar7 = s16(G.DAT_006560f2, param_1 * 0x20);
  let bVar2 = G.DAT_006560f7[param_1 * 0x20];
  local_20 = -1;
  if (s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) {
    local_20 = FUN_005b8a81(iVar6, iVar7);
  }
  G.DAT_0063f660 = 9999;
  local_14 = -1;
  for (local_30 = 0; local_30 < G.DAT_00655b18; local_30 = local_30 + 1) {
    if ((((s32(G.DAT_0064f394, local_30 * 0x58) !== 0) &&
         (G.DAT_0064f348[local_30 * 0x58] === bVar2)) &&
        ((local_20 < 0 ||
         (iVar8 = FUN_005b8a81(s16(G.DAT_0064f340, local_30 * 0x58),
                                     s16(G.DAT_0064f342, local_30 * 0x58)),
         iVar8 === local_20)))) &&
       (iVar8 = FUN_005ae1b0(iVar6, iVar7, s16(G.DAT_0064f340, local_30 * 0x58),
                                   s16(G.DAT_0064f342, local_30 * 0x58)),
       iVar8 < G.DAT_0063f660)) {
      local_14 = local_30;
      G.DAT_0063f660 = iVar8;
    }
  }
  if (s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 1) {
    for (param_1 = 0; param_1 < G.DAT_00655b16; param_1 = param_1 + 1) {
      if (((G.DAT_0065610a[param_1 * 8] !== 0) &&
          (G.DAT_006560f7[param_1 * 0x20] === bVar2)) &&
         ((((G.DAT_0064b1bc[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x80) !== 0 ||
           (((G.DAT_0064b1bd[u8(bVar1) * 0x14] & 0x10) !== 0 &&
            ((G.DAT_0064b1bc[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 8) !== 0)))) &&
          (iVar8 = FUN_005ae1b0(iVar6, iVar7, s16(G.DAT_006560f0, param_1 * 0x20),
                                      s16(G.DAT_006560f2, param_1 * 0x20)),
          iVar8 < local_8)))) {
        local_38 = s16(G.DAT_006560f0, param_1 * 0x20);
        local_40 = s16(G.DAT_006560f2, param_1 * 0x20);
        local_8 = iVar8;
      }
    }
    iVar8 = FUN_005b8d15(iVar6, iVar7);
    if (-1 < iVar8) {
      if ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0) {
        return;
      }
      FUN_005b6787(iVar5);
      return;
    }
  }
  local_c = 999;
  local_3c = iVar7;
  local_34 = iVar6;
  if (G.DAT_0063f660 < 999) {
    local_34 = s16(G.DAT_0064f340, local_14 * 0x58);
    local_3c = s16(G.DAT_0064f342, local_14 * 0x58);
    local_c = G.DAT_0063f660;
  }
  if (local_8 < local_c) {
    local_34 = local_38;
    local_3c = local_40;
    local_c = local_8;
  }
  if (local_c < 999) {
    if (((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0) &&
       (s8(G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar5 * 0x20]) * 0x14]) !== 0)) {
      let cVar3 = s8(G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar5 * 0x20]) * 0x14]);
      let cVar4 = s8(G.DAT_006560fd[iVar5 * 0x20]);
      iVar8 = FUN_005b2a39(iVar5);
      iVar9 = FUN_005b2c3d(iVar5);
      uVar11 = G.DAT_0064bcc8;
      iVar10 = FUN_005ae1b0(iVar6, iVar7, local_34, local_3c);
      if (((cVar3 - (cVar4 + 1)) * iVar8 + iVar9) / uVar11 < iVar10) {
        return;
      }
    }
    if ((iVar6 === local_34) && (iVar7 === local_3c)) {
      FUN_005b6787(iVar5);
    }
    else {
      G.DAT_006560ff[iVar5 * 0x20] = 0xb;
      w16(G.DAT_00656102, iVar5 * 0x20, local_34);
      w16(G.DAT_00656104, iVar5 * 0x20, local_3c);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// handle_incident_terror — handle espionage incident / declare war
// Source: block_004C0000.c line 1699
// ═══════════════════════════════════════════════════════════════════

export function handle_incident_terror(param_1, param_2) {
  let iVar2;
  let uVar3;
  let uVar4;

  if ((G.DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) === 0) {
    if ((G.DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0xe) === 0) {
      FUN_00456f20(param_2, param_1, 0x14);
    }
    else {
      let uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(0, uVar1);
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar1);
      if ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0) {
        if (G.DAT_00654fa8 !== 0) { return; }
        if (s8(G.DAT_0064c6b5[param_1 * 0x594]) === 4) { return; }
        if ((G.DAT_00655b02 < 3) || (G.DAT_006d1da0 === param_2)) {
          if ((G.DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
            iVar2 = FUN_00410030(0 /*s_PRETEXT*/, 0, 0);
            if (iVar2 === 1) {
              FUN_00467825(param_1, param_2, 0x2000);
              w16(G.DAT_0064ca82, param_1 * 2 + param_2 * 0x594, G.DAT_00655af8);
            }
          }
          else {
            iVar2 = FUN_00410030(0 /*s_PRETEXTALLIED*/, 0, 0);
            if (iVar2 === 1) {
              FUN_00467750(param_1, param_2, 8);
              w16(G.DAT_0064ca82, param_1 * 2 + param_2 * 0x594, G.DAT_00655af8);
            }
          }
        }
        else {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          FUN_0046b14d(0xa4, 0, param_1, param_2, 0, 0, 0, 0, 0, 0);
        }
      }
      if (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) &&
         ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) === 0)) {
        if ((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 8) === 0) {
          if (s8(G.DAT_0064c6b5[param_1 * 0x594]) === 4) {
            G.DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] =
                 G.DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] | 0x10;
            FUN_00456f20(param_2, param_1, 10);
            if (G.DAT_00654fa8 === 0) {
              uVar1 = FUN_00410070(param_1);
              FUN_0040ff60(0, uVar1);
              FUN_00410030(0 /*s_INCIDENTTERROR*/, 0, 0);
            }
          }
          else {
            if (G.DAT_00654fa8 === 0) {
              FUN_00410030(0 /*s_INCIDENTWAR*/, 0, 0);
            }
            FUN_0045ac71(param_1, param_2, 0xffffffff);
          }
        }
        else {
          if ((G.DAT_0062dcf4 === 2) &&
             (u8(G.DAT_0064c6b0[param_1 * 0x594]) < u8(G.DAT_0064c6b0[param_2 * 0x594]))) {
            if (G.DAT_00654fa8 !== 0) { return; }
            FUN_0045705e(param_1, param_2);
            FUN_00458a3b(param_1, param_2);
            iVar2 = _rand();
            FUN_00456f20(param_2, param_1, iVar2 % 0xf + 5);
            FUN_00410030(0 /*s_WIMPOUT*/, 0, 0);
            return;
          }
          if (G.DAT_00654fa8 === 0) {
            FUN_00410030(0 /*s_INCIDENTALLIED*/, 0, 0);
          }
          FUN_0045ac71(param_1, param_2, 0xffffffff);
        }
      }
      if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) {
        if (s8(G.DAT_0064c6b5[param_1 * 0x594]) !== 6) {
          uVar3 = _rand();
          uVar4 = uVar3 >> 31;
          if (((uVar3 ^ uVar4) - uVar4 & 1 ^ uVar4) === uVar4) {
            return;
          }
          if (s8(G.DAT_0064c6b5[param_1 * 0x594]) !== 5) {
            return;
          }
        }
        if (((G.DAT_00655af0 & 0x80) === 0) || ((G.DAT_0064bc60 & 1) === 0)) {
          if (G.DAT_00654fa8 === 0) {
            let uV = FUN_00410070(param_1);
            FUN_0040ff60(0, uV);
            FUN_00410030(0 /*s_SENATESCANDAL*/, 0, 0);
          }
          FUN_0055c69d(param_1, 0);
        }
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c5fae — spy_mission_result (diplomat/spy attempt)
// Source: block_004C0000.c line 1822
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c5fae(param_1, param_2, param_3) {
  let bVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_1c;
  let local_8;

  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  iVar2 = s8(bVar1);
  if (-1 < param_2) {
    G.DAT_006560f8[param_1 * 0x20] = G.DAT_006560f8[param_1 * 0x20] + G.DAT_0064bcc8;
  }
  if (s8(G.DAT_006560f6[param_1 * 0x20]) === 0x2f) {
    local_8 = (param_2 < 0 ? 1 : 0) + 2;
    if ((s16(G.DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
      local_8 = local_8 * 2;
    }
    if (0 < param_2) {
      local_8 = (local_8 / 2) | 0;
    }
    if (local_8 < 2) {
      uVar3 = _rand();
      uVar7 = uVar3 >> 31;
      if (((uVar3 ^ uVar7) - uVar7 & 1 ^ uVar7) === uVar7) {
        local_8 = local_8 + 1;
      }
    }
    if (local_8 === 1 || local_8 - 1 < 0) {
      local_1c = 0;
    }
    else {
      local_1c = _rand();
      local_1c = local_1c % local_8;
    }
    if (local_1c !== 0) {
      iVar4 = s16(G.DAT_006560f0, param_1 * 0x20);
      iVar5 = s16(G.DAT_006560f2, param_1 * 0x20);
      iVar6 = FUN_0043d07a(iVar4, iVar5, iVar2, 0xffffffff, 0xffffffff);
      if (-1 < iVar6) {
        FUN_005b36df(param_1, s16(G.DAT_0064f340, iVar6 * 0x58),
                           s16(G.DAT_0064f342, iVar6 * 0x58), 1);
        FUN_005b6787(param_1);
        FUN_0047cea6(iVar4, iVar5);
        FUN_0047cea6(s16(G.DAT_0064f340, iVar6 * 0x58),
                           s16(G.DAT_0064f342, iVar6 * 0x58));
        if (2 < G.DAT_00655b02) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          FUN_0046b14d(0x72, 0xff, iVar4, iVar5, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x72, 0xff, s16(G.DAT_0064f340, iVar6 * 0x58),
                             s16(G.DAT_0064f342, iVar6 * 0x58), 0, 0, 0, 0, 0, 0);
        }
        FUN_0040ff60(1, 0 /*&G.DAT_0064f360 + iVar6 * 0x58*/);
      }
      if (-1 < param_2) {
        if ((G.DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) {
          if ((s16(G.DAT_006560f4, param_1 * 0x20) & 0x2000) === 0) {
            if (G.DAT_006d1da0 === iVar2) {
              FUN_00410030(0 /*s_BOND007*/, 0, 8);
            }
            else if (2 < G.DAT_00655b02) {
              FUN_00511880(0x26, 0, 2, 0, G.DAT_006560f6[param_1 * 0x20], 8);
            }
          }
          else if (G.DAT_006d1da0 === iVar2) {
            FUN_00410030(0, 0, 8);
          }
          else if (2 < G.DAT_00655b02) {
            FUN_00511880(0x27, 0, 2, 0, G.DAT_006560f6[param_1 * 0x20], 8);
          }
        }
        w16(G.DAT_006560f4, param_1 * 0x20,
             s16(G.DAT_006560f4, param_1 * 0x20) | 0x2000);
      }
      return 0;
    }
    if (((G.DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) && (-1 < param_2)) {
      if (G.DAT_006d1da0 === iVar2) {
        FUN_00410030(0 /*s_BONDGLORY*/, 0, 8);
      }
      else if (G.DAT_00655b02 === 3) {
        FUN_00511880(0x28, 0, 0, 0, G.DAT_006560f6[param_1 * 0x20], 8);
      }
    }
  }
  FUN_005b6042(param_1, 1);
  if ((0 < param_3) && (-1 < param_2)) {
    handle_incident_terror(iVar2, param_3);
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c64aa — spy_caught_check
// Source: block_004C0000.c line 1938
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c64aa(param_1, param_2) {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;

  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  bVar2 = G.DAT_006560f6[param_1 * 0x20];
  iVar3 = FUN_004c5fae(param_1, 0xffffffff, param_2);
  if (iVar3 === 0) {
    uVar4 = 0;
  }
  else {
    if ((G.DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) {
      FUN_00410030(0 /*s_NAILED*/, 0, 8);
    }
    uVar4 = 1;
  }
  return uVar4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c654d — check_incident_warning
// Source: block_004C0000.c line 1968
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c654d(param_1, param_2) {
  let iVar1;
  let bVar2;

  if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) {
    bVar2 = false;
  }
  else if ((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0xe) === 0) {
    bVar2 = false;
  }
  else {
    iVar1 = FUN_00421ea0(0 /*s_INCIDENT*/);
    bVar2 = iVar1 !== 1;
  }
  return bVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c65d2 — calculate_city_resistance
// Source: block_004C0000.c line 1994
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c65d2(param_1, param_2, param_3) {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0x10;
  for (local_c = 0; local_c < G.DAT_00655b18; local_c = local_c + 1) {
    if ((((s32(G.DAT_0064f394, local_c * 0x58) !== 0) &&
         (s8(G.DAT_0064f348[local_c * 0x58]) === param_1)) &&
        (iVar1 = FUN_0043d20a(local_c, 1), iVar1 !== 0)) &&
       (iVar1 = FUN_005ae31d(s16(G.DAT_0064f340, local_c * 0x58),
                                   s16(G.DAT_0064f342, local_c * 0x58), param_2, param_3),
       iVar1 < local_8)) {
      local_8 = iVar1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c66ba — civil_war_city_transfer
// Source: block_004C0000.c line 2022
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c66ba(param_1, param_2, param_3) {
  // Large UI-heavy function handling civil war city transfers.
  // Abbreviated — key game logic preserved.
  let bVar1 = G.DAT_0064f348[param_1 * 0x58];
  let iVar4 = s8(bVar1);
  let sVar2 = s16(G.DAT_0064f340, param_1 * 0x58);
  let sVar3 = s16(G.DAT_0064f342, param_1 * 0x58);
  let local_20;
  let local_8;
  let iVar6, iVar7;

  if (-1 < param_2) {
    FUN_005b9ec6();
    for (local_8 = 0; local_8 < 0x15; local_8 = local_8 + 1) {
      let uVar5 = FUN_005ae052(s8(G.DAT_00628370[local_8]) + sVar2);
      iVar6 = s8(G.DAT_006283a0[local_8]) + sVar3;
      iVar7 = FUN_004087c0(uVar5, iVar6);
      if (iVar7 !== 0) {
        FUN_005b976d(uVar5, iVar6, 1 << (u8(param_2) & 0x1f), 1, 1);
        FUN_005b8b1a(uVar5, iVar6, param_2);
      }
    }
    FUN_005b9f1c();
    // C lines 2051-2079: UI notification + network message block
    if ((G.DAT_00654fa8 === 0) &&
       (((((((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0 ||
            ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) ||
           ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0)) ||
          ((iVar6 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar6 !== 0 ||
           (iVar6 = FUN_00453e51(G.DAT_006d1da0, 9), iVar6 !== 0)))) ||
         (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + iVar4 * 4] & 0x80) !== 0 ||
          ((iVar6 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar6 !== 0 ||
           (iVar6 = FUN_00453e51(G.DAT_006d1da0, 9), iVar6 !== 0)))))) || (G.DAT_00655b07 !== 0))
       )) {
      if (((G.DAT_00655b07 !== 0) ||
          ((1 << (u8(G.DAT_006d1da0) & 0x1f) & s8(G.DAT_0064f34c[param_1 * 0x58])) !== 0)) ||
         (s8(G.DAT_0064f348[param_1 * 0x58]) === (G.DAT_006d1da0 & 0xff))) {
        FUN_004105f8(s16(G.DAT_0064f340, param_1 * 0x58),
                           s16(G.DAT_0064f342, param_1 * 0x58),
                           s8(G.DAT_0064f348[param_1 * 0x58]));
      }
      let uVar5_n = FUN_00493c7d(iVar4);
      FUN_0040ff60(0, uVar5_n);
      FUN_0040ff60(1, 0 /*&G.DAT_0064f360 + param_1 * 0x58*/);
      uVar5_n = FUN_00410070(param_2);
      FUN_0040ff60(2, uVar5_n);
      FUN_00421ea0(0 /*s_CIVILWAR_0062dd84*/);
      if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) && (2 < G.DAT_00655b02)) {
        FUN_00511880(0x5e, G.DAT_006ad30c + s32(G.DAT_006ad558, iVar4 * 4) * 0x54, 3, 0, 0, 0);
      }
    }
    local_20 = G.DAT_00655b16;
    while (local_20 = local_20 + -1, -1 < local_20) {
      if (((G.DAT_0065610a[local_20 * 8] !== 0) &&
          (s8(G.DAT_006560f7[local_20 * 0x20]) === iVar4)) &&
         ((iVar6 = FUN_005ae31d(s16(G.DAT_006560f0, local_20 * 0x20),
                                      s16(G.DAT_006560f2, local_20 * 0x20), sVar2,
                                      sVar3), iVar6 < 2 &&
          ((iVar6 === 0 ||
           (iVar7 = FUN_005b8ca6(s16(G.DAT_006560f0, local_20 * 0x20),
                                       s16(G.DAT_006560f2, local_20 * 0x20)), iVar7 < 0)
           ))))) {
        G.DAT_0064c778[iVar4 * 0x594 + u8(G.DAT_006560f6[local_20 * 0x20])] =
             G.DAT_0064c778[iVar4 * 0x594 + u8(G.DAT_006560f6[local_20 * 0x20])] + -1;
        G.DAT_0064c778[param_2 * 0x594 + u8(G.DAT_006560f6[local_20 * 0x20])] =
             G.DAT_0064c778[param_2 * 0x594 + u8(G.DAT_006560f6[local_20 * 0x20])] + 1;
        G.DAT_006560f7[local_20 * 0x20] = param_2;
        G.DAT_00656100[local_20 * 0x20] = param_1;
        G.DAT_006560f8[local_20 * 0x20] = 0;
        if ((s8(G.DAT_006560ff[local_20 * 0x20]) !== 1) &&
           (s8(G.DAT_006560ff[local_20 * 0x20]) !== 2)) {
          G.DAT_006560ff[local_20 * 0x20] = 0xff;
        }
        FUN_005b99e8(s16(G.DAT_006560f0, local_20 * 0x20),
                           s16(G.DAT_006560f2, local_20 * 0x20), param_2, 1);
        if (iVar6 !== 0) {
          FUN_0047cea6(s16(G.DAT_006560f0, local_20 * 0x20),
                             s16(G.DAT_006560f2, local_20 * 0x20));
        }
      }
    }
    FUN_0057b5df(param_1, param_2, param_3);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c6bf5 — spy_city_mission (large spy/diplomat city action)
// Source: block_004C0000.c line 2123
// This function is ~10K bytes of spy mission logic with heavy UI.
// The game logic is preserved; UI calls are stubs.
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c6bf5(param_1, param_2) {
  let iVar3;
  let local_3f8;
  let local_3f4;
  let local_3f0 = new Array(16).fill(0);
  let local_3ac;
  let local_3a8;
  let local_3a4;
  let local_3a0;
  let local_398;
  let local_394;
  let local_390;
  let local_38c;
  let local_388;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70 = "";
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  FUN_0059db08(0x4000);
  G.DAT_0062804c = 0;
  let local_3b0 = s8(G.DAT_006560f7[param_1 * 0x20]);
  local_80 = s8(G.DAT_0064f348[param_2 * 0x58]);
  local_398 = u8(G.DAT_006560f6[param_1 * 0x20]);
  FUN_00467825(local_3b0, local_80, 1);
  local_38c = (G.DAT_006560f6[param_1 * 0x20] === 0x2f) ? 1 : 0;

  if (((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
     (G.DAT_006d1da0 === local_3b0)) {
    let uVar2 = FUN_00410070(local_3b0);
    FUN_0040ff60(0, uVar2);
    FUN_004271e8(1, G.DAT_0064b1b8[local_398]);
    FUN_0040ff60(2, 0 /*&G.DAT_0064f360 + param_2 * 0x58*/);
    FUN_0040ffa0(0 /*s_SPYMENU*/, 1);
    FUN_0059ec88(0, 0, 0);
    // CPropertySheet::EnableStackedTabs — UI stub
    iVar3 = FUN_004a2379(0 /*&G.DAT_006558e8*/, 0 /*s_SPYOPTIONS*/);
    if (iVar3 !== 0) { FUN_004c9504(); FUN_004c951a(); return; }
    FUN_004a23fc(1);
    if (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + local_80 * 4] & 0x80) === 0) &&
       (iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 === 0)) {
      if (local_38c !== 0) {
        FUN_004aef36(0); FUN_004af01a(0); FUN_0040bc10(0xed); FUN_004af03b(0);
      }
      FUN_0059edf0(0, 0, 0);
    }
    FUN_004a23fc(1);
    if (local_38c !== 0) {
      FUN_004aef36(0); FUN_004af01a(0); FUN_0040bc10(0xed); FUN_004af03b(0);
    }
    FUN_0059edf0(0, 1, 0);
    FUN_004a23fc(1);
    if (((G.DAT_0064f344[param_2 * 0x58] & 8) === 0) || (local_38c !== 0)) {
      FUN_0059edf0(0, 2, 0);
    }
    FUN_004a23fc(1);
    FUN_0059edf0(0, 3, 0);
    FUN_004a23fc(1);
    if ((local_38c !== 0) && (s8(G.DAT_0064f349[param_2 * 0x58]) > 1)) {
      FUN_0059edf0(0, 4, 0);
    }
    FUN_004a23fc(1);
    if ((((local_38c !== 0) && (iVar3 = FUN_004bd9f0(local_3b0, 0x49), iVar3 !== 0)) &&
        (iVar3 = FUN_004bd9f0(local_3b0, 0x3a), iVar3 !== 0)) &&
       (iVar3 = FUN_00453e18(0x17), iVar3 !== -1)) {
      FUN_0059edf0(0, 5, 0);
    }
    FUN_004a23fc(1);
    iVar3 = FUN_0043d20a(param_2, 1);
    if (iVar3 === 0) {
      FUN_0059edf0(0, 6, 0);
    }
    if (((2 < G.DAT_00655b02) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
       ((iVar3 = FUN_0043d20a(param_2, 1), iVar3 !== 0 &&
        ((G.DAT_0064c6c3[local_80 * 4 + local_3b0 * 0x594] & 1) === 0)))) {
      FUN_0059edf0(FUN_00428b0c(0), 7, 0);
    }
    FUN_004a2020();
    local_3ac = FUN_0040bc80(0);
    if (local_3ac < 0) { FUN_004c9504(); FUN_004c951a(); return; }
  }
  else {
    local_3ac = 2;
    if ((((G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0x10) !== 0) &&
        (iVar3 = _rand(), iVar3 % 3 === 0)) && (local_38c !== 0)) {
      local_3ac = 4;
    }
    if ((G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 4) !== 0) {
      local_3ac = 2;
    }
    if ((((3 < G.DAT_00655b08) ||
         ((G.DAT_00655b08 === 3 && (5 < s16(G.DAT_0064c6bc, local_80 * 0x594))))) &&
        (local_3ac === 2)) &&
       (((G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0x2010) !== 0 &&
        (s8(G.DAT_0064c6b5[local_80 * 0x594]) !== 6)))) {
      local_3ac = 6;
    }
    if ((G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 8) !== 0) {
      local_3ac = 2;
    }
    if (((((G.DAT_0064f344[param_2 * 0x58] & 8) !== 0) && (local_38c === 0)) && (local_3ac === 2))) {
      local_3ac = 3;
      if ((G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0xe) !== 0) {
        local_3ac = 0;
      }
    }
  }

  // LAB_004c72a8: switch dispatch with goto loop
  let switchLoop = true;
  while (switchLoop) {
    switchLoop = false;
    G.DAT_0062dcf4 = local_3ac;
    switch (local_3ac) {
    case 0:
      if ((G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0x80) === 0) {
        G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] =
             G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] | 0x80;
        if ((G.DAT_006d1da0 === local_3b0) || (G.DAT_006d1da0 === local_80)) {
          FUN_0046e020(0x44, 0, 0, 0);
        }
        if ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) === 0) {
          FUN_005b6042(param_1, 1);
        }
        else {
          FUN_0043060b(local_3b0, local_80);
          if (local_38c === 0) {
            FUN_005b4391(param_1, 1);
          }
          else {
            G.DAT_006560f8[param_1 * 0x20] = G.DAT_006560f8[param_1 * 0x20] + 1;
          }
        }
        if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) {
          FUN_0040ff60(0, FUN_00493c7d(local_3b0));
          if ((G.DAT_00655b02 < 3) || (G.DAT_006d1da0 === local_80)) {
            FUN_00410030(0 /*s_ENEMYEMBASSY*/, 0, 8);
          }
          else {
            FUN_00511880(0x55, 0, 1, 0, 0, 0);
          }
        }
        break;
      }
      local_3ac = 1;
      switchLoop = true;
      continue;
    case 1:
      if ((G.DAT_006d1da0 === local_3b0) || (G.DAT_006d1da0 === local_80)) {
        FUN_0046e020(0x44, 1, 0, 0);
      }
      if ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) === 0) {
        FUN_005b6042(param_1, 1);
      }
      else {
        FUN_handle_city_disorder_00509590(param_2);
        if (local_38c === 0) {
          FUN_004c5fae(param_1, 0, 0xffffffff);
        }
        else if ((G.DAT_0064f346[param_2 * 0x58] & 0x40) === 0) {
          G.DAT_006560f8[param_1 * 0x20] = G.DAT_006560f8[param_1 * 0x20] + 1;
        }
        G.DAT_0064f344[param_2 * 0x58] =
             G.DAT_0064f344[param_2 * 0x58] | 0x400000;
      }
      if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) {
        FUN_0040ff60(0, FUN_00493c7d(local_3b0));
        FUN_0040ff60(1, 0 /*&G.DAT_0064f360 + param_2 * 0x58*/);
        if ((G.DAT_00655b02 < 3) || (G.DAT_006d1da0 === local_80)) {
          FUN_00410030(0 /*s_ENEMYINVESTIGATE*/, 0, 8);
        }
        else {
          FUN_00511880(0x56, 0, 2, 0, 0, 0);
        }
      }
      break;
    case 2: {
      iVar3 = FUN_004c654d(local_3b0, local_80);
      if (iVar3 !== 0) break;
      local_20 = -1;
      iVar3 = _rand();
      local_8c = iVar3 % 100;
      for (local_3a0 = 0; local_3a0 < 100; local_3a0 = local_3a0 + 1) {
        local_90 = (local_8c + local_3a0) % 100;
        if ((((G.DAT_0062768e[local_90 * 0x10] !== -2) || (G.DAT_0062768f[local_90 * 0x10] !== -2)) &&
            (iVar3 = FUN_004bd9f0(local_3b0, local_90), iVar3 === 0)) &&
           (iVar3 = FUN_004bd9f0(local_80, local_90), iVar3 !== 0)) {
          local_20 = local_90;
          iVar3 = FUN_00598ceb();
          if ((((iVar3 === 0) ||
               ((G.DAT_00655b08 < 2 && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) === 0)))) ||
              (G.DAT_0064c5a6 === local_90)) ||
             (((G.DAT_0064c5ae === local_90 || (G.DAT_0064c5b6 === local_90)) || (local_90 === 0x20))))
          break;
        }
      }
      if (-1 < local_20) {
        local_88 = 0;
        if ((G.DAT_0064f344[param_2 * 0x58] & 8) === 0) {
          if (((G.DAT_00654fa8 === 0) && (local_38c !== 0)) &&
             ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
            local_3ac = FUN_00426fb0(0 /*s_STEALSPECIFIC*/, 1, 0, 8);
            if (local_3ac < 0) break;
            if (local_3ac === 1) {
              iVar3 = FUN_004c64aa(param_1, local_80);
              if (iVar3 === 0) {
                if (G.DAT_006d1da0 === local_3b0) {
                  FUN_0046e020(0x44, 1, 0, 0);
                }
                FUN_0057a27a(local_3b0, local_80);
                FUN_004c5fae(param_1, 1, local_80);
                G.DAT_0064f344[param_2 * 0x58] = G.DAT_0064f344[param_2 * 0x58] | 8;
              }
              break;
            }
          }
        }
        else {
          if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
            FUN_0040ff60(0, FUN_00493c7d(local_80));
            FUN_0040ff60(1, 0 /*&G.DAT_0064f360 + param_2 * 0x58*/);
            local_3ac = FUN_00414dd0(0 /*s_STEALHARD*/, param_2);
            if (local_3ac !== 1) break;
          }
          iVar3 = FUN_004c64aa(param_1, local_80);
          if (iVar3 !== 0) break;
          local_88 = 1;
        }
        // steal tech from city units
        local_84 = param_1;
        local_14 = 0;
        param_1 = FUN_005b2e69(s16(G.DAT_0064f340, param_2 * 0x58),
                                     s16(G.DAT_0064f342, param_2 * 0x58));
        // LAB_004c7ad5: check for counter-spy units
        while (param_1 >= 0) {
          if (s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 6) {
            let local_39c = 0x14;
            if ((G.DAT_006560f6[param_1 * 0x20] === 0x2f) &&
               (local_39c = 0x28, (s16(G.DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0)) {
              local_39c = 0x3c;
            }
            iVar3 = _rand();
            if (iVar3 % 100 < local_39c) {
              local_14 = 1;
              local_390 = u8(G.DAT_006560f6[param_1 * 0x20]);
              break;
            }
          }
          param_1 = FUN_005b2c82(param_1);
        }
        // LAB_004c7b9b: steal result
        iVar3 = local_84;
        if (local_14 === 0) {
          FUN_0040ff60(0, FUN_00493c7d(local_3b0));
          FUN_004271e8(1, G.DAT_00627684[local_20]);
          if ((((G.DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
              (2 < G.DAT_00655b02)) && (G.DAT_006d1da0 !== local_80)) {
            FUN_00511880(0x57, 0, 2, 0, 0, 0);
          }
          if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
            FUN_0046e020(0x44, 1, 0, 0);
            FUN_00410030(0 /*s_STEAL*/, 0, 8);
          }
          FUN_004bf05b(local_3b0, local_20, local_80, 0, 0);
          G.DAT_0064f344[param_2 * 0x58] = G.DAT_0064f344[param_2 * 0x58] | 8;
          FUN_004c5fae(iVar3, local_88, local_80);
        }
        else {
          FUN_005b6787(local_84);
          FUN_0047cea6(s16(G.DAT_0064f340, param_2 * 0x58),
                             s16(G.DAT_0064f342, param_2 * 0x58));
          FUN_004271e8(1, G.DAT_0064b1b8[local_390]);
          FUN_0040ff60(2, FUN_00410070(local_3b0));
          if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
            FUN_0046e020(0x44, 1, 0, 0);
            FUN_00410030(0 /*s_CURSES*/, 0, 8);
          }
          if ((((G.DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
              (2 < G.DAT_00655b02)) && (G.DAT_006d1da0 !== local_80)) {
            FUN_00511880(0x58, 0, 3, 0, 0, 0);
          }
        }
        break;
      }
      if ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0) {
        G.DAT_006560f8[param_1 * 0x20] = G.DAT_006560f8[param_1 * 0x20] + G.DAT_0064bcc8;
        if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
          FUN_00410030(0 /*s_NOSTEAL*/, 0, 8);
        }
        break;
      }
      if ((G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0xe) === 0) {
        local_3ac = 3;
      }
      else {
        local_3ac = 0;
      }
      switchLoop = true;
      continue;
    }
    case 3: {
      local_88 = 0;
      iVar3 = FUN_004c654d(local_3b0, local_80);
      if (iVar3 !== 0) break;
      FUN_004aef20(0 /*local_70*/);
      if (s8(G.DAT_0064f379[param_2 * 0x58]) < 0) {
        FUN_004af122(0, G.DAT_0064c488[s8(G.DAT_0064f379[param_2 * 0x58]) * -1]);
      }
      else {
        FUN_004af122(0, G.DAT_0064b1b8[s8(G.DAT_0064f379[param_2 * 0x58])]);
      }
      local_74 = 0;
      local_8c = _rand();
      local_8c = local_8c % 0x27;
      local_3a8 = 0;
      // LAB_004c7f43: find building to sabotage
      while (local_3a8 <= 0x26) {
        local_78 = (local_3a8 + local_8c) % 0x27;
        if (((local_78 !== 0) && (local_78 !== 1)) &&
           ((local_78 !== 0x11 && (iVar3 = FUN_0043d20a(param_2, local_78), iVar3 !== 0)))) {
          local_74 = local_78;
          break;
        }
        local_3a8 = local_3a8 + 1;
      }
      // LAB_004c7fc1: sabotage dialog / execution
      if ((((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
          (local_38c !== 0)) && (0 < local_74)) {
        local_3ac = FUN_00426fb0(0 /*s_SABOTAGESPECIFIC*/, 1, 0, 8);
        if (local_3ac < 0) { FUN_004c9504(); FUN_004c951a(); return; }
        if (local_3ac === 1) {
          FUN_0040ffa0(0 /*s_SABOTAGE*/, 1);
          FUN_0059ec88(0, 0, 0);
          // CPropertySheet — UI
          for (local_3a8 = 1; local_3a8 < 0x27; local_3a8 = local_3a8 + 1) {
            if ((local_3a8 !== 1) && (iVar3 = FUN_0043d20a(param_2, local_3a8), iVar3 !== 0)) {
              FUN_0059edf0(FUN_00428b0c(G.DAT_0064c488[local_3a8]), local_3a8, 0);
            }
          }
          FUN_0040bbb0();
          FUN_0040bbe0(0 /*local_70*/);
          FUN_0040fe10();
          FUN_0040fea0();
          FUN_0040bc10(0x78);
          FUN_0040fed0();
          FUN_0059edf0(0, 0, 0);
          local_74 = FUN_0040bc80(0);
          if (local_74 < 0) { FUN_004c9504(); FUN_004c951a(); return; }
          if (local_74 === 0x11) {
            FUN_004cc870(0 /*s_SABOTAGENO*/, 0x11, 8);
            FUN_004c9504(); FUN_004c951a(); return;
          }
          iVar3 = FUN_0043d20a(param_2, 1);
          if (((((iVar3 !== 0) || (local_74 === 8)) &&
               (local_3ac = FUN_00410030(0 /*s_SABOTAGEHARD*/, 0, 8),
               local_3ac !== 1)) ||
              ((iVar3 = FUN_004c64aa(param_1, local_80), iVar3 !== 0 ||
               ((iVar3 = FUN_0043d20a(param_2, 1), iVar3 !== 0 &&
                (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 !== 0)))))) ||
             (((local_74 === 8 && (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 !== 0)) ||
              ((local_74 === 0x11 &&
               ((iVar3 = FUN_004c64aa(param_1, local_80), iVar3 !== 0 ||
                (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 !== 0))))))))
          { FUN_004c9504(); FUN_004c951a(); return; }
          local_88 = 1;
        }
      }
      // sabotage production check
      if ((local_88 === 0) && (s16(G.DAT_0064f35c, param_2 * 0x58) !== 0)) {
        local_1c = 2;
        if (local_38c !== 0) { local_1c = 3; }
        if ((s16(G.DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
          local_1c = local_1c + 1;
        }
        if (local_1c - 1 < 1) {
          local_3f4 = 0;
        }
        else {
          local_3f4 = _rand();
          local_3f4 = local_3f4 % local_1c;
        }
        if (local_3f4 === 0) {
          local_74 = 0;
        }
      }
      // sabotage result
      if (((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0) ||
         ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) {
        if ((G.DAT_006d1da0 === local_3b0) || (G.DAT_006d1da0 === local_80)) {
          iVar3 = FUN_004bd9f0(local_3b0, 0x23);
          if ((iVar3 === 0) || (G.DAT_006d1da0 !== local_3b0)) {
            FUN_0046e020(0x44, 1, 0, 0);
          }
          else {
            FUN_0046e020(0x27, 1, 0, 0);
          }
        }
        if (local_74 === 0) {
          w16(G.DAT_0064f35c, param_2 * 0x58, 0);
          FUN_citywin_C679(param_2);
          FUN_0040ff60(0, 0 /*local_70*/);
          if (((G.DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
              ((2 < G.DAT_00655b02 && (G.DAT_006d1da0 !== local_80)))) {
            FUN_00511880(0x5a, 0, 1, 0, local_3b0, 0);
          }
          if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
            FUN_00421ea0(0 /*s_SABOTAGETWO*/);
          }
        }
        else {
          FUN_0043d289(param_2, local_74, 0);
          FUN_0047cea6(s16(G.DAT_0064f340, param_2 * 0x58),
                             s16(G.DAT_0064f342, param_2 * 0x58));
          FUN_004271e8(0, G.DAT_0064c488[local_74]);
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          if ((((G.DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
              (2 < G.DAT_00655b02)) && (G.DAT_006d1da0 !== local_80)) {
            FUN_0046b14d(0x72, 0, s16(G.DAT_0064f340, param_2 * 0x58),
                               s16(G.DAT_0064f342, param_2 * 0x58), 0, 0, 0, 0, 0, 0);
            FUN_0046b14d(0x8a, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            FUN_00511880(0x59, 0, 1, 0, local_74, local_3b0);
          }
          if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
            FUN_citywin_C679(param_2);
            FUN_00410030(0 /*s_SABOTAGEONE*/, 0, 8);
          }
        }
      }
      FUN_004c5fae(param_1, local_88, local_80);
      break;
    }
    case 4:
      iVar3 = FUN_004c654d(local_3b0, local_80);
      if (iVar3 === 0) {
        if (s8(G.DAT_0064f349[param_2 * 0x58]) < 2) {
          w16(G.DAT_0064f35a, param_2 * 0x58, 0);
        }
        else {
          G.DAT_0064f349[param_2 * 0x58] = G.DAT_0064f349[param_2 * 0x58] + -1;
        }
        FUN_0043cc00(param_2, local_3b0);
        FUN_0047cea6(s16(G.DAT_0064f340, param_2 * 0x58),
                           s16(G.DAT_0064f342, param_2 * 0x58));
        FUN_0040ff60(0, 0 /*&G.DAT_0064f360 + param_2 * 0x58*/);
        FUN_0040ff60(1, FUN_00410070(local_3b0));
        if ((((G.DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
            (2 < G.DAT_00655b02)) && (G.DAT_006d1da0 !== local_80)) {
          FUN_00511880(0x5b, 0, 2, 0, 0, 0);
        }
        if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
          FUN_0046e020(0x44, 1, 0, 0);
          FUN_00410030(0 /*s_WATERSUPPLY*/, 0, 8);
        }
        iVar3 = local_80;
        let uVar4 = _rand();
        let uVar5 = uVar4 >> 31;
        FUN_004c5fae(param_1, ((uVar4 ^ uVar5) - uVar5 & 1 ^ uVar5) - uVar5, iVar3);
      }
      break;
    case 5:
      if (((((G.DAT_00654fa8 === 0) &&
            (iVar3 = FUN_00410030(0 /*s_MAJORINCIDENT*/, 0, 8),
            iVar3 === 1)) && (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0)) &&
          ((iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0 &&
           (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0)))) &&
         ((iVar3 = FUN_0043d20a(param_2, 1), iVar3 === 0 ||
          (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0)))) {
        FUN_0057f9e3(local_3b0, s16(G.DAT_0064f340, param_2 * 0x58),
                           s16(G.DAT_0064f342, param_2 * 0x58), 0);
        FUN_0040ff60(0, 0 /*&G.DAT_0064f360 + param_2 * 0x58*/);
        FUN_0040ff60(1, FUN_00410070(local_3b0));
        FUN_0040ff60(2, FUN_00493c7d(local_3b0));
        FUN_0040bbb0();
        FUN_0040bbe0(0 /*s_PLANTEDNUKE*/);
        local_3f0[0xf] = 0;
        if (s8(G.DAT_0064c6b5[local_3b0 * 0x594]) !== 4) {
          local_1c = 2;
          if ((s16(G.DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
            local_1c = 4;
          }
          if (local_1c === 1 || local_1c + -1 < 0) {
            local_3f8 = 0;
          }
          else {
            local_3f8 = _rand();
            local_3f8 = local_3f8 % local_1c;
          }
          if (local_3f8 === 0) {
            FUN_0040bbe0(0);
            local_3f0[0xf] = 1;
            for (local_3a4 = 1; local_3a4 < 8; local_3a4 = local_3a4 + 1) {
              if (local_3b0 !== local_3a4) {
                FUN_00456f20(local_3a4, local_3b0, 100);
                FUN_00467825(local_3b0, local_3a4, 0x2000);
              }
            }
          }
        }
        FUN_004cc870(0, 0x3e, 8);
        if (((1 << (u8(local_80) & 0x1f) & G.DAT_00655b0b) !== 0) && (2 < G.DAT_00655b02)) {
          if (local_3f0[0xf] === 0) {
            FUN_00511880(0x5c, 0, 3, 0, 0, 0);
          }
          else {
            FUN_00511880(0x5d, 0, 3, 0, 0, 0);
          }
        }
      }
      break;
    case 6: {
      if (s8(G.DAT_0064c6b5[local_80 * 0x594]) === 6) {
        if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
          FUN_00410030(0 /*s_NOREVOLT*/, 0, 0);
        }
        break;
      }
      local_7c = FUN_004c65d2(local_80, s16(G.DAT_006560f0, param_1 * 0x20),
                                    s16(G.DAT_006560f2, param_1 * 0x20));
      if (local_7c < 2) {
        if ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0) break;
        local_3ac = 2;
        switchLoop = true;
        continue;
      }
      if ((s8(G.DAT_0064c6b5[local_80 * 0x594]) === 3) && (9 < local_7c)) {
        local_7c = 10;
      }
      iVar3 = FUN_0043d20a(param_2, 7);
      if (iVar3 !== 0) {
        local_7c = (local_7c / 2) | 0;
      }
      local_388 = s8(G.DAT_0064f349[param_2 * 0x58]) *
                  (((s32(G.DAT_0064c6a2, local_80 * 0x594) + 1000) / (local_7c + 3)) | 0);
      if (local_388 < 0) {
        local_388 = 30000;
      }
      if ((G.DAT_0064f344[param_2 * 0x58] & 1) !== 0) {
        local_388 = (local_388 / 2) | 0;
      }
      iVar3 = FUN_005b8d62(s16(G.DAT_0064f340, param_2 * 0x58),
                                 s16(G.DAT_0064f342, param_2 * 0x58));
      if (iVar3 < 0) {
        local_388 = (local_388 / 2) | 0;
      }
      if (s8(G.DAT_0064f34a[param_2 * 0x58]) === local_3b0) {
        local_388 = (local_388 / 2) | 0;
      }
      if (local_38c !== 0) {
        if ((s16(G.DAT_006560f4, param_1 * 0x20) & 0x2000) === 0) {
          local_388 = local_388 - ((local_388 / 6) | 0);
        }
        else {
          local_388 = local_388 - ((local_388 / 3) | 0);
        }
      }
      let bVar6 = (G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0xe) === 0;
      local_18 = bVar6 ? 0 : 1;
      if ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0) {
        // LAB_004c8f6f: incite revolt execution
        if ((G.DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & G.DAT_00655b0b) !== 0)) {
          FUN_0040ff60(0, 0 /*&G.DAT_0064f360 + param_2 * 0x58*/);
          FUN_00421da0(0, local_388);
          FUN_0043c9d0(0 /*s_DISSIDENTS*/);
          if (local_388 <= s32(G.DAT_0064c6a2, local_3b0 * 0x594)) {
            iVar3 = FUN_004a2379(0, 0 /*s_DISSIDENTOPTIONS*/);
            if (iVar3 !== 0) break;
            FUN_004a23fc(1);
            FUN_0059edf0(0, 0, 0);
            FUN_004a23fc(1);
            if (local_18 === 0) { FUN_0059edf0(0, 1, 0); }
            FUN_004a23fc(1);
            if (local_18 !== 0) { FUN_0059edf0(0, 1, 0); }
            FUN_004a23fc(1);
            if (((local_18 !== 0) && (local_388 * 2 <= s32(G.DAT_0064c6a2, local_3b0 * 0x594)))
               && (local_388 < 0x3a99)) {
              FUN_0059edf0(0, 2, 0);
            }
            FUN_004a2020();
          }
          local_3ac = FUN_0040bc80(0);
        }
        else {
          local_3ac = 1;
        }
        if (0 < local_3ac) {
          w32(G.DAT_0064c6a2, local_3b0 * 0x594,
               s32(G.DAT_0064c6a2, local_3b0 * 0x594) - local_388 * local_3ac);
          w16(G.DAT_0064c6bc, local_3b0 * 0x594,
               s16(G.DAT_0064c6bc, local_3b0 * 0x594) + 2);
          if (G.DAT_006d1da0 === local_3b0) {
            FUN_00569363(1);
          }
          FUN_004c5fae(param_1, 0, 0);
          if (local_3ac === 1) {
            handle_incident_terror(local_3b0, local_80);
          }
          if (local_3ac === 2) {
            G.DAT_0064c6c0[local_80 * 0x594 + local_3b0 * 4] =
                 G.DAT_0064c6c0[local_80 * 0x594 + local_3b0 * 4] | 0x10;
            G.DAT_0064f34a[param_2 * 0x58] = local_3b0;
          }
          if ((G.DAT_006d1da0 === local_3b0) || (G.DAT_006d1da0 === local_80)) {
            FUN_0046e020(0x44, 1, 0, 0);
          }
          FUN_004c66ba(param_2, local_3b0, local_3ac);
        }
        break;
      }
      local_394 = local_388 * 2;
      if (((local_394 <= s32(G.DAT_0064c6a2, local_3b0 * 0x594)) && (local_18 === 0)) &&
         (-1 < local_394)) {
        // goto LAB_004c8f6f — same as above human player path
        local_3ac = 1; // AI always incites
        if (0 < local_3ac) {
          w32(G.DAT_0064c6a2, local_3b0 * 0x594,
               s32(G.DAT_0064c6a2, local_3b0 * 0x594) - local_388 * local_3ac);
          w16(G.DAT_0064c6bc, local_3b0 * 0x594,
               s16(G.DAT_0064c6bc, local_3b0 * 0x594) + 2);
          if (G.DAT_006d1da0 === local_3b0) {
            FUN_00569363(1);
          }
          FUN_004c5fae(param_1, 0, 0);
          if (local_3ac === 1) {
            handle_incident_terror(local_3b0, local_80);
          }
          if ((G.DAT_006d1da0 === local_3b0) || (G.DAT_006d1da0 === local_80)) {
            FUN_0046e020(0x44, 1, 0, 0);
          }
          FUN_004c66ba(param_2, local_3b0, local_3ac);
        }
        break;
      }
      local_3ac = 2;
      switchLoop = true;
      continue;
    }
    case 7:
      if ((G.DAT_006d1da0 === local_3b0) || (G.DAT_006d1da0 === local_80)) {
        FUN_0046e020(0x44, 0, 0, 0);
      }
      local_3f0[9] = 5; local_3f0[10] = 4; local_3f0[0xb] = 3;
      local_3f0[0xc] = 2; local_3f0[0xd] = 1; local_3f0[0xe] = 0;
      local_3f0[0] = 0; local_3f0[1] = 0; local_3f0[2] = 0;
      local_3f0[3] = 0; local_3f0[4] = 1; local_3f0[5] = 2;
      local_3f0[6] = 2; local_3f0[7] = 3; local_3f0[8] = 4;
      if (local_38c === 0) {
        G.DAT_006560fe[param_1 * 0x20] = 5;
      }
      else {
        G.DAT_006560fe[param_1 * 0x20] = 10;
      }
      G.DAT_006560fe[param_1 * 0x20] =
           local_3f0[G.DAT_00655b08 + 9] + G.DAT_006560fe[param_1 * 0x20];
      if ((s16(G.DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
        G.DAT_006560fe[param_1 * 0x20] = G.DAT_006560fe[param_1 * 0x20] + 2;
      }
      G.DAT_006560fe[param_1 * 0x20] =
           G.DAT_006560fe[param_1 * 0x20] -
           local_3f0[u8(G.DAT_0064c6e0[local_80 * 0x594 + local_3b0])];
      let cVar1 = G.DAT_006560fe[param_1 * 0x20];
      iVar3 = _rand();
      G.DAT_006560fe[param_1 * 0x20] = cVar1 + (iVar3 % 6);
      G.DAT_006560fd[param_1 * 0x20] = local_80;
      w16(G.DAT_006560f4, param_1 * 0x20, s16(G.DAT_006560f4, param_1 * 0x20) | 2);
      G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] =
           G.DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] | 0x1000000;
      FUN_00410030(0 /*s_CHATSPYSTART*/, 0, 8);
      break;
    default:
      break;
    }
  }
  // switchD_004c94cc_default:
  FUN_004c9504();
  FUN_004c951a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c9504 — cleanup_spy_mission_1
// Source: block_004C0000.c line 2881
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c9504() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c951a — cleanup_spy_mission_2 (SEH)
// Source: decompiled/block_004C0000.c FUN_004c951a (14 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c951a() {
  // DEVIATION: Win32 — SEH handler cleanup (*unaff_FS_OFFSET = *(unaff_EBP + -0xc))
  // No game state affected — pure structured exception handling teardown
}


// ═══════════════════════════════════════════════════════════════════
// pick_up_unit_004c9528 — bribe/pick_up_unit
// Source: block_004C0000.c line 2912
// ═══════════════════════════════════════════════════════════════════

export function pick_up_unit_004c9528(param_1, param_2) {
  let bVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let local_18;
  let local_10;
  let local_c;

  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  iVar2 = s8(bVar1);
  iVar3 = FUN_005b50ad(param_1, 2);
  if (1 < iVar3) { return; }
  if (s8(G.DAT_0064c6b5[iVar2 * 0x594]) === 6) {
    if (G.DAT_00654fa8 !== 0) { return; }
    if ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) === 0) { return; }
    if ((2 < G.DAT_00655b02) && (G.DAT_006d1da0 !== param_2)) {
      FUN_00511880(0x21, 0, 0, 0, 0, 0);
      return;
    }
    FUN_00410030(0 /*s_INCORRUPTIBLE*/, 0, 0);
    return;
  }
  if (((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) === 0) &&
     (iVar3 = FUN_004bd9f0(param_2, G.DAT_0064b563), iVar3 === 0)) {
    return;
  }
  local_c = FUN_004c65d2(iVar2, s16(G.DAT_006560f0, param_1 * 0x20),
                               s16(G.DAT_006560f2, param_1 * 0x20));
  if ((s8(G.DAT_0064c6b5[param_2 * 0x594]) === 3) && (9 < local_c)) {
    local_c = 10;
  }
  local_18 = s8(G.DAT_0064b1c8[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) *
             (((s32(G.DAT_0064c6a2, iVar2 * 0x594) + 0x2ee) / (local_c + 2)) | 0);
  if (local_18 < 0) {
    local_18 = 30000;
  }
  if (s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 5) {
    local_18 = (local_18 / 2) | 0;
  }
  if ((s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 7) &&
     ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) === 0)) {
    return;
  }
  uVar4 = FUN_00410070(iVar2);
  FUN_0040ff60(0, uVar4);
  FUN_004271e8(1, G.DAT_0064b1b8[u8(G.DAT_006560f6[param_1 * 0x20])]);
  if ((G.DAT_00654fa8 === 0) && ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0)) {
    FUN_00421da0(0, local_18);
    FUN_0040bbb0();
    FUN_0040bbe0(0 /*s_DESERT*/);
    if (G.DAT_006d1da0 === param_2) {
      if (local_18 <= s32(G.DAT_0064c6a2, param_2 * 0x594)) {
        FUN_0040bbe0(0);
      }
      iVar6 = FUN_004442e0(0 /*&G.DAT_00679640*/, param_1);
    }
    else {
      if (G.DAT_00655b02 < 3) {
        // goto LAB_004c99a0 — fall through
      } else {
        if (s32(G.DAT_0064c6a2, param_2 * 0x594) < local_18) {
          FUN_00511880(0x23, 0, 2, 1, G.DAT_006d1da0, param_1);
        }
        else {
          FUN_00511880(0x24, 0, 2, 1, G.DAT_006d1da0, param_1);
        }
        G.DAT_006a1870 = -1;
        iVar3 = FUN_00421bb0();
        while (true) {
          iVar5 = FUN_00421bb0();
          iVar6 = G.DAT_006a1870;
          if (!(iVar5 - iVar3 < G.DAT_006ad8b8 * 0x3c && (G.DAT_006a1870 === -1))) break;
          FUN_0047e94e(1, 0);
        }
        if (iVar6 !== 1) { return; }
      }
    }
  }
  else if (s32(G.DAT_0064c6a2, param_2 * 0x594) / 2 < local_18) {
    return;
  }

  // LAB_004c99a0
  if ((G.DAT_00655b02 < 3) || (G.DAT_006ad2f7 !== 0)) {
    w32(G.DAT_0064c6a2, param_2 * 0x594, s32(G.DAT_0064c6a2, param_2 * 0x594) - local_18);
    G.DAT_0064c778[iVar2 * 0x594 + u8(G.DAT_006560f6[param_1 * 0x20])] =
         G.DAT_0064c778[iVar2 * 0x594 + u8(G.DAT_006560f6[param_1 * 0x20])] + -1;
    G.DAT_0064c778[param_2 * 0x594 + u8(G.DAT_006560f6[param_1 * 0x20])] =
         G.DAT_0064c778[param_2 * 0x594 + u8(G.DAT_006560f6[param_1 * 0x20])] + 1;
    w16(G.DAT_0064c6bc, param_2 * 0x594, s16(G.DAT_0064c6bc, param_2 * 0x594) + 1);
    G.DAT_006560f7[param_1 * 0x20] = param_2;
    G.DAT_00656100[param_1 * 0x20] = 0xff;
    G.DAT_006560f8[param_1 * 0x20] = 0;
    G.DAT_006560ff[param_1 * 0x20] = 0xff;
    iVar3 = FUN_0043d07a(s16(G.DAT_006560f0, param_1 * 0x20),
                               s16(G.DAT_006560f2, param_1 * 0x20), 0xffffffff, 0xffffffff,
                               0xffffffff);
    if ((-1 < iVar3) && (s8(G.DAT_0064f348[iVar3 * 0x58]) === param_2)) {
      local_10 = iVar3;
      G.DAT_00656100[param_1 * 0x20] = local_10;
    }
    FUN_005b490e(param_1, iVar2);
    FUN_005b99e8(s16(G.DAT_006560f0, param_1 * 0x20),
                       s16(G.DAT_006560f2, param_1 * 0x20), param_2, 1);
    FUN_004b0b53(0xff, 2, 0, 0, 1);
  }
  else {
    FUN_0046b14d(99, 0, param_1, param_2, local_18, 0, 0, 0, 0, 0);
    iVar3 = FUN_00421bb0();
    while ((s8(G.DAT_006560f7[param_1 * 0x20]) !== param_2 &&
           (iVar6 = FUN_00421bb0(), iVar6 - iVar3 < 0xe10))) {
      FUN_0047e94e(1, 1);
    }
    if (s8(G.DAT_006560f7[param_1 * 0x20]) !== param_2) {
      debug_log(0 /*s_Pick_Up_Unit...*/);
      FUN_00410030(0 /*s_SERVERCONNECTTIME*/, 0, 0);
      G.DAT_00628044 = 0;
    }
  }
  if ((G.DAT_006d1da0 === iVar2) || (G.DAT_006d1da0 === param_2)) {
    FUN_0046e020(0x44, 1, 0, 0);
  }
  if ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0) {
    if (G.DAT_006d1da0 === param_2) {
      FUN_00569363(1);
    }
    else if (2 < G.DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x7a, 0, 0x44, 1, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x78, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  if ((G.DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) {
    uVar4 = FUN_00493c7d(param_2);
    FUN_0040ff60(2, uVar4);
    if (G.DAT_006d1da0 === iVar2) {
      FUN_004105f8(s16(G.DAT_006560f0, param_1 * 0x20),
                         s16(G.DAT_006560f2, param_1 * 0x20), iVar2);
      FUN_004442e0(0 /*s_DESERTED*/, param_1);
    }
    else if ((2 < G.DAT_00655b02) && (G.DAT_006d1da0 !== iVar2)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x71, 0, s16(G.DAT_006560f0, param_1 * 0x20),
                         s16(G.DAT_006560f2, param_1 * 0x20), iVar2, 0, 0, 0, 0, 0);
      FUN_00511880(0x22, 0, 3, 0, param_1, 0);
    }
  }
  FUN_0047cea6(s16(G.DAT_006560f0, param_1 * 0x20),
                     s16(G.DAT_006560f2, param_1 * 0x20));
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x72, 0xff, s16(G.DAT_006560f0, param_1 * 0x20),
                       s16(G.DAT_006560f2, param_1 * 0x20), 0, 0, 0, 0, 0, 0);
  }
  if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 === iVar2)) {
    FUN_0046e287(0x1e);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c9ebd — sabotage_or_bribe_unit
// Source: block_004C0000.c line 3102
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c9ebd(param_1, param_2, param_3) {
  let iVar1 = FUN_005b50ad(param_2, 2);
  if (iVar1 < 2) {
    if ((((1 << (u8(param_3) & 0x1f) & G.DAT_00655b0b) === 0) ||
        (s8(G.DAT_006560f6[param_1 * 0x20]) !== 0x2f)) || ((G.DAT_00655ae8 & 0x10) === 0)) {
      pick_up_unit_004c9528(param_2, param_3);
      return 0;
    }
    else {
      iVar1 = FUN_004cc8b0(0 /*s_SABOTAGEOPTIONS*/, 1, param_1);
      if (iVar1 < 0) { return 0; }
      else if (iVar1 === 0) {
        pick_up_unit_004c9528(param_2, param_3);
        return 0;
      }
      else {
        if ((G.DAT_006d1da0 === s8(G.DAT_006560f7[param_2 * 0x20])) || (G.DAT_006d1da0 === param_3)) {
          FUN_0046e020(0x43, 1, 0, 0);
        }
        FUN_0040ff60(0, FUN_00410070(s8(G.DAT_006560f7[param_2 * 0x20])));
        FUN_004271e8(1, G.DAT_0064b1b8[u8(G.DAT_006560f6[param_2 * 0x20])]);
        FUN_0040ff60(2, FUN_00410070(param_3));
        FUN_004271e8(3, G.DAT_0064b1b8[u8(G.DAT_006560f6[param_1 * 0x20])]);
        FUN_004442e0(0 /*s_BLEWITUP*/, param_1);
        if ((2 < G.DAT_00655b02) &&
           ((G.DAT_00655b0b & (1 << (G.DAT_006560f7[param_2 * 0x20] & 0x1f))) !== 0)) {
          FUN_00511880(0x25, 0, 4, 0, param_1, 0);
        }
        let iX = s16(G.DAT_006560f0, param_2 * 0x20);
        let iY = s16(G.DAT_006560f2, param_2 * 0x20);
        FUN_0057ed3f(iX, iY, 0);
        if (2 < G.DAT_00655b02) {
          FUN_0046b14d(0x7c, 0xff, iX, iY, 0, 0, 0, 0, 0, 0);
        }
        let iVar4 = FUN_005b29d7(param_2);
        G.DAT_006560fa[param_2 * 0x20] = ((iVar4 / 2) | 0) + G.DAT_006560fa[param_2 * 0x20];
        FUN_0047cea6(iX, iY);
        if (2 < G.DAT_00655b02) {
          FUN_004b0b53(0xff, 2, 0, 0, 1);
          FUN_0046b14d(0x72, 0xff, iX, iY, 0, 0, 0, 0, 0, 0);
        }
        FUN_004c5fae(param_1, 0, 0xffffffff);
        return 1;
      }
    }
  }
  else {
    return 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ca1cd — airlift_unit
// Source: block_004C0000.c line 3178
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ca1cd(param_1, param_2, param_3, param_4, param_5) {
  let iVar1;
  let local_8;

  // C: *(uint *)(&G.DAT_0064f344 + param_2 * 0x58) |= 0x10000
  // In the C this is a 32-bit OR on the city flags dword. 0x10000 is the "airlifted" bit.
  G.DAT_0064f344[param_2 * 0x58] = G.DAT_0064f344[param_2 * 0x58] | 0x10000;
  G.DAT_0064f344[param_3 * 0x58] = G.DAT_0064f344[param_3 * 0x58] | 0x10000;
  FUN_005b6787(param_1);
  G.DAT_006560ff[param_1 * 0x20] = 0xff;
  FUN_005b36df(param_1, s16(G.DAT_0064f340, param_3 * 0x58),
                     s16(G.DAT_0064f342, param_3 * 0x58), 1);
  FUN_citywin_C494(param_1, 0xffffffff, 0xffffffff);
  if (param_4 !== 0) {
    for (local_8 = 0; local_8 < param_4; local_8 = local_8 + 1) {
      iVar1 = _rand();
      if (iVar1 % 6 === 0) {
        if ((s8(G.DAT_006560f7[param_1 * 0x20]) === G.DAT_006d1da0) && (G.DAT_00654fa8 === 0)) {
          FUN_0040ff60(0, FUN_00493c7d(param_5));
          FUN_004442a0(0 /*s_SHOTDOWN*/, 0x1b, (G.DAT_00633584 === 0) ? 0 : 8);
        }
        FUN_005b4391(param_1, 1);
        return;
      }
    }
  }
  if ((s8(G.DAT_006560f7[param_1 * 0x20]) === G.DAT_006d1da0) && (G.DAT_00654fa8 === 0)) {
    FUN_0040ff60(0, 0 /*&G.DAT_0064f360 + param_2 * 0x58*/);
    FUN_0040ff60(1, 0 /*&G.DAT_0064f360 + param_3 * 0x58*/);
    FUN_004442e0(0 /*s_AIRLIFT*/, param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ca39e — paradrop_unit
// Source: block_004C0000.c line 3221
// Very large function (2572 bytes). Stubbed with key logic.
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ca39e(param_1, param_2, param_3) {
  let bVar1 = G.DAT_006560f7[param_1 * 0x20];
  let uVar4 = s8(bVar1);
  let sVar2 = s16(G.DAT_006560f0, param_1 * 0x20);
  let sVar3 = s16(G.DAT_006560f2, param_1 * 0x20);
  FUN_004c4210(0, G.DAT_0064bcdb);
  let iVar5 = FUN_005b89e4(param_2, param_3);
  if (iVar5 === 0) {
    let local_20 = FUN_005b8d62(param_2, param_3);
    if (local_20 < 0 || local_20 === uVar4) {
      iVar5 = FUN_005ae1b0(s16(G.DAT_006560f0, param_1 * 0x20),
                                 s16(G.DAT_006560f2, param_1 * 0x20), param_2, param_3);
      if (G.DAT_0064bcdb < iVar5) {
        if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
          FUN_004442e0(0 /*s_PARADROPTARGET1*/, param_1);
        }
      }
      else {
        local_20 = FUN_005b8a1d(param_2, param_3);
        iVar5 = FUN_0043cf76(param_2, param_3);
        if ((-1 < iVar5) && (local_20 !== uVar4) &&
           ((G.DAT_0064c6c0[local_20 * 4 + uVar4 * 0x594] & 0xe) !== 0)) {
          if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) {
            FUN_005b6787(param_1);
            return;
          }
          let iVar6 = FUN_00579ed0(uVar4, local_20, 0xe);
          if (iVar6 !== 0) {
            return;
          }
        }
        let aiStack_60 = new Array(8).fill(0);
        let aiStack_40 = new Array(8).fill(0);
        let local_1c;
        let local_6c;
        let local_68;
        let local_64;
        let local_10;
        let local_c;
        let local_8;
        for (let local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (((2 < G.DAT_00655b02) || (G.DAT_006d1da0 === local_18)) &&
             (((1 << (u8(local_18) & 0x1f) & G.DAT_00655b0a) !== 0 &&
              ((1 << (u8(local_18) & 0x1f) & G.DAT_00655b0b) !== 0)))) {
            aiStack_60[local_18] = 0;
            aiStack_40[local_18] = aiStack_60[local_18];
            if ((uVar4 === local_18) || (G.DAT_00655b07 !== 0)) {
              aiStack_60[local_18] = 1;
            }
            if (((-1 < iVar5) && (local_20 !== uVar4))) {
              let iV6b = FUN_005b8b65(param_2, param_3, local_18);
              if ((iV6b !== 0) &&
                 (((G.DAT_0064c6c0[uVar4 * 4 + local_18 * 0x594] & 0x80) !== 0 ||
                  ((G.DAT_0064c6c0[local_20 * 4 + local_18 * 0x594] & 0x80) !== 0)))) {
                aiStack_60[local_18] = 1;
              }
            }
            for (let local_14 = 0; local_14 < 9; local_14 = local_14 + 1) {
              let uVar7b = FUN_005ae052(s8(G.DAT_00628350[local_14]) + param_2);
              local_1c = s8(G.DAT_00628360[local_14]) + param_3;
              let iV6c = FUN_004087c0(uVar7b, local_1c);
              if (iV6c !== 0) {
                let uVar8 = FUN_005b8da4(uVar7b, local_1c);
                if (uVar8 === local_18) {
                  aiStack_60[local_18] = 1;
                }
              }
            }
            if ((aiStack_60[local_18] !== 0) &&
               (((uVar4 === local_18 || ((G.DAT_00655aea[1] & 0x10) !== 0)) || (-1 < iVar5)))) {
              aiStack_40[local_18] = 1;
            }
          }
        }
        let uVar7 = FUN_00410070(uVar4);
        FUN_0040ff60(0, uVar7);
        FUN_004271e8(1, G.DAT_0064b1b8[u8(G.DAT_006560f6[param_1 * 0x20])]);
        local_10 = FUN_0043d07a(param_2, param_3, 0xffffffff, 0xffffffff, 0xffffffff);
        FUN_0040ff60(2, 0 /*&G.DAT_0064f360 + local_10 * 0x58*/);
        if (((aiStack_60[G.DAT_006d1da0] !== 0) &&
            (FUN_004105f8(param_2, param_3, uVar4),
            (1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0)) && (G.DAT_00654fa8 === 0)) {
          FUN_004442e0(0 /*s_PARADROP*/, param_1);
        }
        if (2 < G.DAT_00655b02) {
          for (let local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if ((((1 << (u8(local_18) & 0x1f) & G.DAT_00655b0a) !== 0) &&
                ((1 << (u8(local_18) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
               ((G.DAT_006d1da0 !== local_18 &&
                (((aiStack_60[local_18] !== 0 && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0))
                 && (G.DAT_00654fa8 === 0)))))) {
              FUN_00511880(0x15, 0, 3, 0, param_1, 0);
            }
          }
        }
        local_c = 0;
        local_64 = 0xffffffff;
        for (let local_14 = 0; local_14 < 8; local_14 = local_14 + 1) {
          uVar7 = FUN_005ae052(s8(G.DAT_00628350[local_14]) + param_2);
          local_1c = s8(G.DAT_00628360[local_14]) + param_3;
          let iV6 = FUN_004087c0(uVar7, local_1c);
          if (iV6 !== 0) {
            local_8 = _rand();
            local_8 = local_8 % 6;
            if ((G.DAT_00628350[local_14] !== 0) && (G.DAT_00628360[local_14] !== 0)) {
              local_8 = local_8 + 3;
            }
            iV6 = FUN_005b8da4(uVar7, local_1c);
            if (iV6 < 0) {
              local_8 = local_8 + 200;
            }
            if (local_c < local_8) {
              local_c = local_8;
              local_64 = local_14 ^ 4;
              local_6c = local_1c;
              local_68 = uVar7;
            }
          }
        }
        if (local_64 < 0) {
          for (let local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            aiStack_40[local_18] = 0;
          }
        }
        G.DAT_006560ff[param_1 * 0x20] = 0xff;
        FUN_005b5bab(param_1, 0);
        if (((G.DAT_006d1da0 === uVar4) || (G.DAT_00655b07 !== 0)) ||
           (((1 << (u8(G.DAT_006d1da0) & 0x1f) & u8(G.DAT_006560f9[param_1 * 0x20])) !== 0
            || (s8(G.DAT_006560f7[param_1 * 0x20]) === (G.DAT_006d1da0 & 0xff))))) {
          FUN_0047cea6(sVar2, sVar3);
        }
        if (aiStack_40[G.DAT_006d1da0] !== 0) {
          FUN_0056c705(param_1, local_68, local_6c, local_64, 0xffffffff, 0xffffffff);
        }
        FUN_005b48b1(param_1);
        if ((G.DAT_00655afe === param_1) && (G.DAT_006d1da0 === uVar4)) {
          G.DAT_0064b1b4 = param_2;
          G.DAT_0064b1b0 = param_3;
        }
        FUN_005b3ae0(param_1, param_2, param_3, 0);
        if (2 < G.DAT_00655b02) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          for (let local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (((G.DAT_006d1da0 !== local_18) &&
                ((1 << (u8(local_18) & 0x1f) & G.DAT_00655b0a) !== 0)) &&
               ((1 << (u8(local_18) & 0x1f) & G.DAT_00655b0b) !== 0)) {
              if (((G.DAT_00655b07 !== 0) ||
                  ((1 << (u8(local_18) & 0x1f) & u8(G.DAT_006560f9[param_1 * 0x20])) !== 0
                  )) || (s8(G.DAT_006560f7[param_1 * 0x20]) === (local_18 & 0xff))) {
                FUN_0046b14d(0x72, 0, param_2, param_3, 0, 0, 0, 0, 0, 0);
              }
              if (aiStack_40[local_18] !== 0) {
                FUN_0046b14d(0x70, 0, param_1, param_2, param_3, local_64, 0xffffffff, 0, 0, 0);
              }
            }
          }
        }
        w16(G.DAT_006560f4, param_1 * 0x20,
             s16(G.DAT_006560f4, param_1 * 0x20) | 0x10);
        if ((-1 < iVar5) && (local_20 !== uVar4)) {
          if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) {
            FUN_005b6787(param_1);
          }
          G.DAT_006560fa[param_1 * 0x20] = 0;
          G.DAT_00655b00 = param_1;
          FUN_0057b5df(iVar5, uVar4, 0);
          param_1 = G.DAT_00655b00;
        }
        FUN_004274a6(param_1, 1);
        FUN_citywin_C494(param_1, sVar2, sVar3);
        w16(G.DAT_006560f4, param_1 * 0x20,
             s16(G.DAT_006560f4, param_1 * 0x20) & 0xfeff);
        FUN_0056a65e(1);
      }
    }
    else if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
      FUN_004442e0(0 /*s_PARADROPTARGET2*/, param_1);
    }
  }
  else if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
    FUN_004442e0(0 /*s_PARADROPTARGET*/, param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc870 — show_popup_a
// Source: block_004C0000.c line 3432
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc870(param_1, param_2, param_3) {
  FUN_004a6bdc(G.DAT_006359d4, param_1, 0, param_2, param_3);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc8b0 — show_popup_b
// Source: block_004C0000.c line 3446
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc8b0(param_1, param_2, param_3) {
  FUN_004a6e39(G.DAT_006359d4, param_1, param_2, param_3);
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31 — library init stub (first instance)
// Source: block_004C0000.c line 3460
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E31_a() {
  FUN_004cc90a();
  FUN_004cc924();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc90a — library init sub_a
// Source: block_004C0000.c line 3483
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc90a() {
  FUN_0055339f();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc924 — library atexit registration_a
// Source: decompiled/block_004C0000.c FUN_004cc924 (29 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc924() {
  // DEVIATION: Win32 — _atexit(FUN_004cc941)
  // CRT process-exit callback registration — no game state affected
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc941 — library destructor_a
// Source: decompiled/block_004C0000.c FUN_004cc941 (26 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc941() {
  // DEVIATION: MFC — COleCntrFrameWnd::~COleCntrFrameWnd(&G.DAT_006a18c0)
  // MFC OLE container frame destructor — no game state affected
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31_b — library init stub (second instance)
// Source: block_004C0000.c line 3533
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E31_b() {
  FUN_004cc975();
  FUN_004cc98f();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc975 — library init sub_b
// Source: block_004C0000.c line 3548
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc975() {
  FUN_004187a0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc98f — library atexit registration_b
// Source: decompiled/block_004C0000.c FUN_004cc98f (29 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc98f() {
  // DEVIATION: Win32 — _atexit(FUN_004cc9ac)
  // CRT process-exit callback registration — no game state affected
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc9ac — library destructor_b
// Source: block_004C0000.c line 3576
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc9ac() {
  FUN_00418870();
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E51 — library init stub
// Source: block_004C0000.c line 3599
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E51() {
  FUN_004cc9e0();
  FUN_004cc9fe();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc9e0 — library init sub_c
// Source: block_004C0000.c line 3614
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc9e0() {
  FUN_0043c460(0, 0x10);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc9fe — library atexit registration_c
// Source: decompiled/block_004C0000.c FUN_004cc9fe (29 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc9fe() {
  // DEVIATION: Win32 — _atexit(FUN_004cca1b)
  // CRT process-exit callback registration — no game state affected
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cca1b — library destructor_c
// Source: block_004C0000.c line 3642
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cca1b() {
  FUN_0043c520();
}


// ═══════════════════════════════════════════════════════════════════
// show_messagebox_CA35 — show message box (Win32)
// Source: block_004C0000.c line 3656
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c show_messagebox_CA35 (132 bytes)
export function show_messagebox_CA35(param_1, param_2) {
  // C: Memory allocation with overflow check
  // C: If param_2 > param_1's capacity (*(ushort*)(param_1+0x10)):
  //    Shows "out of memory" MessageBoxA and returns 0
  // C: Otherwise calls FUN_00498159(param_1, param_2) to allocate
  // DEVIATION: Win32 MessageBoxA — skip overflow dialog
  return FUN_00498159(param_1, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccab9 — init_rules_edit_sections
// Source: block_004C0000.c line 3688
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ccab9(param_1, param_2) {
  G.DAT_006a1880[0] = param_1;
  G.DAT_006a1884[0] = param_2;
  G.DAT_006a1888[0] = 0;
  G.DAT_006a188c[0] = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccaed — add_rules_edit_section
// Source: block_004C0000.c line 3705
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ccaed(param_1, param_2) {
  let local_8;

  for (local_8 = 0; (G.DAT_006a1880[local_8 * 8] !== 0 && (local_8 < 7));
      local_8 = local_8 + 1) {
  }
  if (local_8 < 7) {
    G.DAT_006a1880[local_8 * 8] = param_1;
    G.DAT_006a1884[local_8 * 8] = param_2;
    G.DAT_006a1888[local_8 * 8] = 0;
    G.DAT_006a188c[local_8 * 8] = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccb6a — draw_border_frame (UI)
// Source: block_004C0000.c line 3729
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ccb6a(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 GDI border frame rendering (588 bytes)
  // Calls: FUN_004086c0, FUN_00407f90, FUN_005a9b5d, FUN_00407fc0,
  //        FUN_005a99fc, FUN_004bb800. Pure UI drawing — no game state.
  let local_14 = [];
  let local_18;
  param_2 = param_2 - param_6;
  param_3 = param_3 - param_6;
  FUN_004086c0(local_14, param_2, param_3, param_4 + param_6 * 2, param_5 + param_6 * 2);
  let uVar1 = FUN_00407f90(local_14);
  FUN_005a9b5d(param_1, 0, param_2, param_3 + 2, uVar1, param_6 + -4, 0, 2);
  let iVar2 = FUN_00407fc0(local_14);
  iVar2 = iVar2 - (param_6 + -2);
  FUN_005a9b5d(param_1, 0, param_2, iVar2 + param_3, uVar1, param_6 + -4, 0, iVar2);
  uVar1 = FUN_00407fc0(local_14);
  FUN_005a9b5d(param_1, 0, param_2 + 2, param_3, param_6 + -4, uVar1, 2, 0);
  iVar2 = FUN_00407f90(local_14);
  iVar2 = iVar2 - (param_6 + -2);
  FUN_005a9b5d(param_1, 0, iVar2 + param_2, param_3, param_6 + -4, uVar1, iVar2, 0);
  for (local_18 = 0; local_18 < 2; local_18 = local_18 + 1) {
    FUN_005a99fc(param_1, local_14, 0x25, 0x12);
    FUN_004bb800(local_14, 1, 1);
  }
  FUN_004bb800(local_14, param_6 + -4, 0);
  for (local_18 = 0; local_18 < 2; local_18 = local_18 + 1) {
    FUN_005a99fc(param_1, local_14, 0x12, 0x25);
    FUN_004bb800(local_14, 1, 1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccdb6 — format_number_to_string
// Source: block_004C0000.c line 3773
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ccdb6(param_1) {
  let local_18 = String(param_1);
  FUN_005f22e0(0 /*&G.DAT_00679640*/, local_18);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccdef — format_tech_name
// Source: block_004C0000.c line 3790
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004ccdef (318 bytes)
export function FUN_004ccdef(param_1, param_2) {
  // C: Appends tech name to G.DAT_00679640 string buffer
  if (param_1 === -2) {
    // C: "no" or "nil" string based on param_2
    FUN_005f22e0(G.DAT_00679640, (param_2 !== 0) ? G.DAT_0062e024 : G.DAT_0062e024 + 8);
  } else if (param_1 === -1) {
    // C: "nil" or "no" string
    FUN_005f22e0(G.DAT_00679640, (param_2 !== 0) ? G.DAT_0062e030 : G.DAT_0062e030 + 8);
  } else if (param_1 < 100) {
    // C: Tech name from G.DAT_00627680 table (stride 0x10)
    FUN_005f22e0(G.DAT_00679640, G.DAT_00627680[param_1 * 0x10]);
    if (param_2 !== 0) {
      FUN_005f22e0(G.DAT_00679640, G.DAT_0062e03c);
    }
    // C: Pad with spaces via FUN_004190a0(3 - min(strlen, 3))
    let sVar1 = 3; // DEVIATION: string length check simplified
    FUN_004190a0(3 - sVar1);
  } else {
    // C: "Future Tech" or similar
    FUN_005f22e0(G.DAT_00679640, (param_2 !== 0) ? G.DAT_0062e040 : G.DAT_0062e040 + 8);
  }
}


// ═══════════════════════════════════════════════════════════════════
// show_messagebox_CF2D — save RULES.TXT changes
// Source: block_004C0000.c line 3829
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c show_messagebox_CF2D (1149 bytes)
// Source: decompiled/block_004C0000.c show_messagebox_CF2D (1149 bytes)
export function show_messagebox_CF2D() {
  let iVar1;
  let pcVar2;
  let local_278 = 0;
  let local_274 = '';
  let local_224 = null; // DEVIATION: FILE*
  let local_220 = null; // DEVIATION: FILE*
  let local_21c = '';
  let local_118 = '';
  let local_108 = 0;
  let local_104 = '';

  local_108 = 0;
  local_278 = 0;
  local_224 = null;
  local_220 = null;
  FUN_005f22d0(local_118, "RULES."); // DEVIATION: string build
  FUN_005f22e0(local_118, G.DAT_0062cd24); // DEVIATION: append extension
  _getcwd(local_21c, 0x104); // DEVIATION: save current dir
  _chdir(G.DAT_0064bb08); // DEVIATION: chdir to game dir
  iVar1 = _strcmp(G.DAT_0064bb08, G.DAT_00655020);
  if (iVar1 === 0 || (iVar1 = FUN_00415133(local_118), iVar1 === 0)) {
    _chdir(G.DAT_00655020); // DEVIATION: chdir to install dir
    local_220 = FUN_0041508c(local_118, "r"); // DEVIATION: fopen read
    iVar1 = _strcmp(G.DAT_0064bb08, G.DAT_00655020);
    if (iVar1 === 0) {
      iVar1 = FUN_00415133("RULES.BAK");
      if (iVar1 !== 0 && (iVar1 = FID_conflict__remove("RULES.BAK"), iVar1 !== 0)) {
        // goto cleanup
      } else {
        local_224 = FUN_0041508c("RULES.BAK", "w"); // DEVIATION: fopen write
        // DEVIATION: MessageBoxA — "Saving changes in file RULES.BAK"
      }
    } else {
      _chdir(G.DAT_0064bb08); // DEVIATION: chdir
      local_224 = FUN_0041508c(local_118, "w"); // DEVIATION: fopen write
    }
  } else {
    iVar1 = FUN_00415133("RULES.BAK");
    if ((iVar1 !== 0 && (iVar1 = FID_conflict__remove("RULES.BAK"), iVar1 !== 0)) ||
       (iVar1 = FID_conflict___wrename(local_118, "RULES.BAK"), iVar1 !== 0)) {
      // goto cleanup
    } else {
      local_220 = FUN_0041508c("RULES.BAK", "r"); // DEVIATION: fopen
      local_224 = FUN_0041508c(local_118, "w"); // DEVIATION: fopen
    }
  }
  if (local_220 !== null && local_224 !== null) {
    // Iterate section table
    for (; ri(G.DAT_006a1880, local_108 * 8) !== 0; local_108 = local_108 + 1) {
      local_274 = '@';
      FUN_005f22e0(local_274, ri(G.DAT_006a1880, local_108 * 8)); // DEVIATION: append section name
      _strupr(local_274); // DEVIATION: uppercase
      do {
        pcVar2 = _fgets(local_104, 0x100, local_220); // DEVIATION: fgets
        if (pcVar2 === null || (iVar1 = _fputs(local_104, local_224), iVar1 === -1)) {
          // goto cleanup
          break;
        }
        FUN_0056b810(local_104); // trim
        FUN_004d007e(local_104); // trim
        iVar1 = _strcmpi(local_104, local_274);
      } while (iVar1 !== 0);
      if (ri(G.DAT_006a1880, local_108 * 8 + 4) !== 0) {
        // Call section callback: (*(code*)(G.DAT_006a1884 + local_108 * 8))(local_224, local_220)
        // DEVIATION: function pointer callback
      }
      do {
        pcVar2 = _fgets(local_104, 0x100, local_220);
        if (pcVar2 === null) break;
        let sVar3 = _strlen(local_104);
      } while (1 < _strlen(local_104));
      iVar1 = _fputs(local_104, local_224);
      if (iVar1 === -1) break;
    }
    // Copy remaining content
    do {
      pcVar2 = _fgets(local_104, 0x100, local_220);
      if (pcVar2 === null) {
        local_278 = 1;
        break;
      }
      iVar1 = _fputs(local_104, local_224);
    } while (iVar1 !== -1);
  }
  // Cleanup
  if (local_220 !== null) { _fclose(local_220); } // DEVIATION: fclose
  if (local_224 !== null) { _fclose(local_224); } // DEVIATION: fclose
  _chdir(local_21c); // DEVIATION: restore dir
  return local_278;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cd3d7 — edit_city_txt_entry
// Source: block_004C0000.c line 3935
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cd3d7 (1171 bytes)
export function FUN_004cd3d7(param_1, param_2, param_3) {
  let iVar1;
  let pcVar2;
  let local_274 = 0;
  let local_270 = '';
  let local_220 = null; // DEVIATION: FILE*
  let local_21c = null; // DEVIATION: FILE*
  let local_218 = '';
  let local_114 = '';
  let local_14 = '';

  local_220 = null;
  local_21c = null;
  local_274 = 0;
  FUN_005f22d0(local_14, "CITY."); // DEVIATION: string build
  FUN_005f22e0(local_14, G.DAT_0062cd24); // DEVIATION: append extension
  _getcwd(local_218, 0x104); // DEVIATION: save dir
  _chdir(G.DAT_0064bb08); // DEVIATION: chdir
  iVar1 = _strcmp(G.DAT_0064bb08, G.DAT_00655020);
  if (iVar1 !== 0 &&
     (iVar1 = FUN_00415133("CITY.TMP"), iVar1 === 0 ||
      (iVar1 = FID_conflict__remove("CITY.TMP"), iVar1 === 0))) {
    iVar1 = FUN_00415133(local_14);
    if (iVar1 === 0) {
      iVar1 = FUN_00415133("CITY.BAK");
      if (iVar1 === 0) {
        _chdir(G.DAT_00655020); // DEVIATION: chdir
        local_21c = FUN_0041508c(local_14, "r"); // DEVIATION: fopen
        _chdir(G.DAT_0064bb08); // DEVIATION: chdir
        local_220 = FUN_0041508c(local_14, "w"); // DEVIATION: fopen
      } else {
        local_21c = FUN_0041508c("CITY.BAK", "r"); // DEVIATION: fopen
        local_220 = FUN_0041508c(local_14, "w"); // DEVIATION: fopen
      }
    } else {
      iVar1 = FID_conflict___wrename(local_14, "CITY.TMP"); // DEVIATION: rename
      if (iVar1 !== 0) {
        // goto cleanup
        if (local_21c !== null) { _fclose(local_21c); }
        if (local_220 !== null) { _fclose(local_220); }
        iVar1 = FUN_00415133("CITY.TMP");
        if (iVar1 !== 0) { FID_conflict__remove("CITY.TMP"); }
        _chdir(local_218);
        return local_274;
      }
      local_21c = FUN_0041508c("CITY.TMP", "r"); // DEVIATION: fopen
      local_220 = FUN_0041508c(local_14, "w"); // DEVIATION: fopen
    }
    if (local_21c !== null && local_220 !== null) {
      // Build section marker "@" + param_1
      local_270 = '@';
      FUN_005f22e0(local_270, param_1); // DEVIATION: append section name
      _strupr(local_270); // DEVIATION: uppercase
      // Copy lines until section found
      do {
        pcVar2 = _fgets(local_114, 0x100, local_21c); // DEVIATION: fgets
        if (pcVar2 === null || (iVar1 = _fputs(local_114, local_220), iVar1 === -1)) {
          break; // goto cleanup
        }
        FUN_0056b810(local_114); // trim
        FUN_004d007e(local_114); // trim
        iVar1 = _strcmpi(local_114, local_270);
      } while (iVar1 !== 0);
      // Search for matching key line, replace with param_3
      do {
        pcVar2 = _fgets(local_114, 0x100, local_21c); // DEVIATION: fgets
        if (pcVar2 === null) break;
        if (local_114[0] === '@') {
          iVar1 = _fputs(local_114, local_220); // DEVIATION: fputs
          // goto copy_remaining
          if (iVar1 !== -1) {
            // Copy remaining file content
            while (true) {
              pcVar2 = _fgets(local_114, 0x100, local_21c);
              if (pcVar2 === null) { local_274 = 1; break; }
              iVar1 = _fputs(local_114, local_220);
              if (iVar1 === -1) break;
            }
          }
          break;
        }
        let _MaxCount = _strlen(param_2);
        iVar1 = _strnicmp(local_114, param_2, _MaxCount);
        if (iVar1 === 0) {
          iVar1 = _fputs(param_3, local_220); // DEVIATION: write replacement
          if (iVar1 !== -1) {
            iVar1 = _fputs("\n", local_220); // DEVIATION: newline
            // goto copy_remaining
            if (iVar1 !== -1) {
              while (true) {
                pcVar2 = _fgets(local_114, 0x100, local_21c);
                if (pcVar2 === null) { local_274 = 1; break; }
                iVar1 = _fputs(local_114, local_220);
                if (iVar1 === -1) break;
              }
            }
          }
          break;
        }
        iVar1 = _fputs(local_114, local_220); // DEVIATION: copy unchanged line
      } while (iVar1 !== -1);
    }
  }
  // Cleanup
  if (local_21c !== null) { _fclose(local_21c); } // DEVIATION: fclose
  if (local_220 !== null) { _fclose(local_220); } // DEVIATION: fclose
  iVar1 = FUN_00415133("CITY.TMP");
  if (iVar1 !== 0) { FID_conflict__remove("CITY.TMP"); } // DEVIATION: delete temp
  _chdir(local_218); // DEVIATION: restore dir
  return local_274;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cd8a6 — update_city_txt_leaders
// Source: block_004C0000.c line 4046
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cd8a6 (1069 bytes)
export function FUN_004cd8a6() {
  let iVar1;
  let pcVar2;
  let local_234, local_230 = 0, local_22c;
  let local_228 = null; // DEVIATION: FILE*
  let local_224 = null; // DEVIATION: FILE*
  let local_220 = '';
  let local_11c = 0;
  let local_118 = '';
  let local_117 = '';
  let local_18 = '';
  let local_8;

  local_230 = 0;
  local_228 = null;
  local_224 = null;
  FUN_005f22d0(local_18, "CITY."); // DEVIATION: string build
  FUN_005f22e0(local_18, G.DAT_0062cd24); // DEVIATION: append ext
  _getcwd(local_220, 0x104); // DEVIATION: save dir
  _chdir(G.DAT_0064bb08); // DEVIATION: chdir
  iVar1 = _strcmp(G.DAT_0064bb08, G.DAT_00655020);
  if (iVar1 !== 0) {
    iVar1 = FUN_00415133(local_18);
    if (iVar1 === 0) {
      local_230 = 1; // no file to update
    } else {
      iVar1 = FUN_00415133("CITY.TMP");
      if ((iVar1 === 0 || (iVar1 = FID_conflict__remove("CITY.TMP"), iVar1 === 0)) &&
         (iVar1 = FID_conflict___wrename(local_18, "CITY.TMP"), iVar1 === 0)) {
        local_224 = FUN_0041508c("CITY.TMP", "r"); // DEVIATION: fopen
        local_228 = FUN_0041508c(local_18, "w"); // DEVIATION: fopen
        if (local_224 !== null && local_228 !== null) {
          do {
            while (true) {
              pcVar2 = _fgets(local_118, 0x100, local_224); // DEVIATION: fgets
              if (pcVar2 === null) { local_230 = 1; break; }
              if (local_118[0] !== '@' || (iVar1 = _strnicmp(local_117, "RAND", 4), iVar1 === 0)) {
                break; // not a section header or is @RAND — write as-is
              }
              // It's a @SECTION line (not @RAND) — look up personality
              for (local_11c = 0; local_11c < 0x15; local_11c = local_11c + 1) {
                local_22c = 1;
                while (local_22c < 8 && s16(G.DAT_0064c6a6, local_22c * 0x594) !== local_11c) {
                  local_22c = local_22c + 1;
                }
                if (local_22c < 8) {
                  local_8 = G.DAT_0064bd12 + local_22c * 0xf2;
                } else {
                  if (s16(G.DAT_00655504, local_11c * 0x30) < 1) {
                    local_234 = -(s16(G.DAT_00655504, local_11c * 0x30));
                  } else {
                    local_234 = s16(G.DAT_00655504, local_11c * 0x30);
                  }
                  local_8 = FUN_00428b0c(local_234);
                }
                let _MaxCount = _strlen(local_8);
                iVar1 = _strnicmp(local_117, local_8, _MaxCount);
                if (iVar1 === 0) {
                  _sprintf(local_118, "@%s", G.DAT_006a1d88 + (local_11c * 5 + 0xd2) * 8);
                  _strupr(local_118); // DEVIATION: uppercase
                  iVar1 = _fputs(local_118, local_228); // DEVIATION: fputs
                  if (iVar1 === -1) { break; } // goto cleanup
                  break;
                }
              }
              if (local_11c === 0x15) {
                iVar1 = _fputs(local_118, local_228); // write unchanged
                if (iVar1 === -1) { break; }
              }
            }
            iVar1 = _fputs(local_118, local_228); // DEVIATION: fputs
          } while (iVar1 !== -1);
        }
      }
    }
  }
  // Cleanup
  if (local_224 !== null) { _fclose(local_224); } // DEVIATION: fclose
  if (local_228 !== null) { _fclose(local_228); } // DEVIATION: fclose
  iVar1 = FUN_00415133("CITY.TMP");
  if (iVar1 !== 0) { FID_conflict__remove("CITY.TMP"); } // DEVIATION: delete temp
  _chdir(local_220); // DEVIATION: restore dir
  return local_230;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdcf6 — is_numeric_char
// Source: block_004C0000.c line 4151
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdcf6(param_1, param_2) {
  if ((((param_2 < 0x30) || (0x39 < param_2)) && (param_2 !== 0x2d)) && (param_2 !== 0xd6)) {
    return 0;
  }
  else {
    return 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdd3d — show_checkbox_dialog (UI)
// Source: block_004C0000.c line 4172
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdd3d(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 checkbox dialog (489 bytes)
  // Modifies G.DAT_00631ed8 and G.DAT_00631edc based on checkbox state
  let iVar1;
  let local_314;
  let local_2e0 = 0;
  let local_2cc = 0;
  let local_22c = 0;
  let local_14;

  FUN_0059db08(0x4000);
  if (G.DAT_006a4f88 === 0) {
    local_314 = 0;
  }
  else {
    local_314 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_314);
  iVar1 = FUN_005a632a(G.DAT_006359d4, param_1, param_2, 0, 0, 0, 0, param_4);
  if (iVar1 === 0) {
    if ((local_2cc & 4) !== 0) {
      for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
        FUN_0059ea4d(local_14, 1 << (u8(local_14) & 0x1f) & G.DAT_00631ed8);
      }
    }
    for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
      FUN_0059e8db(local_14, (1 << (u8(local_14) & 0x1f) & param_3) !== 0);
    }
    FUN_0040bc80(0);
    G.DAT_00631edc = local_22c;
    if ((local_2cc & 4) !== 0) {
      G.DAT_00631ed8 = 0;
      for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
        iVar1 = FUN_0059e9f3(local_14);
        if (iVar1 !== 0) {
          G.DAT_00631ed8 = G.DAT_00631ed8 | 1 << (u8(local_14) & 0x1f);
        }
      }
    }
  }
  FUN_0059d3c9(0);
  FUN_004cdf26();
  FUN_004cdf3c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdf26 — cleanup_checkbox_dialog_1
// Source: block_004C0000.c line 4235
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdf26() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdf3c — cleanup_checkbox_dialog_2 (SEH)
// Source: decompiled/block_004C0000.c FUN_004cdf3c (15 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdf3c() {
  // DEVIATION: Win32 — SEH handler cleanup (*unaff_FS_OFFSET = *(unaff_EBP + -0xc))
  // No game state affected — pure structured exception handling teardown
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdf4b — clamp_value
// Source: block_004C0000.c line 4266
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdf4b(param_1, param_2, param_3) {
  if (param_1 < param_2) {
    G.DAT_0062e014 = 1;
  }
  else {
    param_2 = param_1;
    if (param_3 < param_1) {
      G.DAT_0062e014 = 1;
      param_2 = param_3;
    }
  }
  return param_2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdfa4 — setup_cheat_dialog (UI)
// Source: block_004C0000.c line 4291
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cdfa4 (498 bytes)
export function FUN_004cdfa4(param_1, param_2, param_3, param_4, param_5, param_6,
                             param_7, param_8, param_9) {
  // C: Dialog setup function — initializes dialog state globals
  if (param_1 === 0) {
    // C: FUN_005f22d0(&G.DAT_006a19f4, ""); — empty title
  } else {
    // C: FUN_005f22d0(&G.DAT_006a19f4, param_1); — set title
  }
  // C: Set dialog pointers
  G.DAT_006a19d4 = param_2;
  G.DAT_006a19d8 = param_8;
  G.DAT_006a19dc = param_9;
  G.DAT_006a19e0 = param_7;
  G.DAT_006a1abc = 0;
  G.DAT_006a1b68 = 0;
  // C: Override with default sounds if flag 4
  if ((param_2 & 4) !== 0) {
    G.DAT_006a19d8 = G.DAT_00633598;
    G.DAT_006a19dc = G.DAT_0063359c;
  }
  // C: Window style flags
  let local_8 = ((param_2 & 8) === 0) ? 0x202 : 0x802;
  if (G.DAT_006a19d8 !== 0) { local_8 = local_8 | 0x400; }
  if (param_7 !== 0) { local_8 = local_8 | 0x1000; }
  // C: Position adjustments
  if ((param_2 & 2) === 0) {
    param_5 = param_5 + G.DAT_006a19dc * 2;
    param_6 = param_6 + G.DAT_006a19d8 + G.DAT_006a19dc;
  }
  if ((param_2 & 1) !== 0) {
    param_3 = (G.DAT_006ab198 >> 1) - (param_5 >> 1);
    param_4 = (G.DAT_006ab19c >> 1) - (param_6 >> 1);
  }
  // DEVIATION: MFC — FUN_005bb4ae creates window, FUN_00497d00 loads sound, FUN_004cff70 loads icon
  FUN_005bb4ae(0, local_8, param_3, param_4, param_5, param_6, 0, 0);
  if (G.DAT_006a19d8 !== 0) { FUN_00497d00(G.DAT_006a19d8); }
  if (G.DAT_006a19e0 !== 0) { FUN_004cff70(G.DAT_006a19e0); }
  FUN_00552ed2(); // DEVIATION: MFC — show dialog
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce196 — load_popup_texts
// Source: block_004C0000.c line 4361
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004ce196 (349 bytes)
export function FUN_004ce196() {
  let iVar1;
  let local_108;
  let local_104 = '';

  // C: Clear popup text array
  for (local_108 = 0; local_108 < 0x14; local_108 = local_108 + 1) {
    wi(G.DAT_006a1d78, local_108 * 4, 0);
  }
  FUN_004cef35(); // load popup menu items
  local_108 = 0;
  do {
    if (0x13 < local_108) {
      G.DAT_006a4f98 = 1;
      G.DAT_006a4f9c = 0;
      // CRichEditDoc_InvalidateObjectCache(G.DAT_006a1908); // DEVIATION: MFC
      return;
    }
    iVar1 = FUN_004cffb0(local_108, local_104, 0x100);
    if (iVar1 === 0) {
      wi(G.DAT_006a1d78, local_108 * 4, 0);
    } else {
      let sVar1 = _strlen(local_104);
      let uVar3 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
      wi(G.DAT_006a1d78, local_108 * 4, uVar3);
      if (ri(G.DAT_006a1d78, local_108 * 4) === 0) {
        wi(G.DAT_006a1d78, local_108 * 4, 0);
        G.DAT_006a4f98 = 1;
        G.DAT_006a4f9c = 0;
        return;
      }
      FUN_005f22d0(ri(G.DAT_006a1d78, local_108 * 4), local_104); // DEVIATION: string copy
    }
    local_108 = local_108 + 1;
  } while (true);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce2f3 — clear_popup_state
// Source: block_004C0000.c line 4408
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce2f3() {
  G.DAT_006a4f98 = 0;
  G.DAT_006a4f9c = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce322 — init_popup_window
// Source: block_004C0000.c line 4424
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce322() {
  // DEVIATION: MFC window initialization (104 bytes)
  FUN_00552112();
  FUN_0040fdb0(0 /*&G.DAT_006a18c0*/, 0 /*&G.DAT_006a1b7c*/, 0x1d);
  FUN_005baeb0(0);
  FUN_005baec8(0 /*&G.DAT_006a4f90*/);
  FUN_005baee0(0x29, 0x12, 1, 1);
  FUN_00408460();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce38a — show_popup_text_window (UI)
// Source: block_004C0000.c line 4447
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004ce38a (867 bytes)
export function FUN_004ce38a(param_1, param_2) {
  let local_ac;

  // DEVIATION: SEH (FS_OFFSET restore)
  // DEVIATION: MFC — FUN_0040f3e0 dialog constructor
  G.DAT_006a4f9c = 1;
  G.DAT_006a1d78 = param_1;
  // DEVIATION: MFC — _Timevec destructors, dialog layout
  FUN_004cdfa4(param_2, 0xd, 0, 0x14, 600, 0, 0, 0, 0); // dialog setup
  // DEVIATION: MFC — layout calculations using G.DAT_006a19e4/e8/ec/f0
  // DEVIATION: MFC — FUN_004bb620 creates text control
  // C: iterate param_1 text array (up to 20 entries)
  for (local_ac = 0; local_ac < 0x14 && ri(param_1, local_ac * 4) !== 0; local_ac++) {
    if (local_ac !== 0) {
      FUN_00492ae0(0); // DEVIATION: UI — add separator
    }
    FUN_00492ae0(ri(param_1, local_ac * 4)); // DEVIATION: UI — add text line
  }
  // DEVIATION: MFC — OK/Cancel buttons, dialog show, message loop
  // C: while (G.DAT_006a4f9c !== 0) { FUN_0040ef50(); }
  FUN_00553379(); // DEVIATION: UI cleanup
  // DEVIATION: MFC — destructor chain
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce6ed — cleanup_popup_1
// Source: block_004C0000.c line 4525
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce6ed() {
  FUN_0040f570();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce6f9 — cleanup_popup_2
// Source: block_004C0000.c line 4539
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce6f9() {
  FUN_0040f570();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce70c — cleanup_popup_3 (SEH)
// Source: decompiled/block_004C0000.c FUN_004ce70c (15 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce70c() {
  // DEVIATION: Win32 — SEH handler cleanup (*unaff_FS_OFFSET = *(unaff_EBP + -0xc))
  // No game state affected — pure structured exception handling teardown
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce71b — validate_city_name
// Source: block_004C0000.c line 4570
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004ce71b (290 bytes)
export function FUN_004ce71b(param_1) {
  let iVar1;

  // C: Search GAME.TXT for city name to check if it's valid
  iVar1 = FUN_004a2379(0, 0); // DEVIATION: file search
  if (iVar1 === 0) {
    // C: Iterate lines until param_1 matches (case-insensitive)
    // Found — valid city name
    FUN_004a2020(); // DEVIATION: close file
    return true;
  }
  // C: Not found — show "NOCITY" confirmation dialog
  FUN_0059d3c9(0); // DEVIATION: sound
  FUN_0040ff60(0, param_1); // DEVIATION: UI
  iVar1 = FUN_00444270("NOCITY"); // DEVIATION: UI confirm
  FUN_0059d3c9(0);
  return iVar1 === 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce83d — send_listbox_reset_messages (Win32)
// Source: block_004C0000.c line 4622
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce83d() {
  // DEVIATION: Win32 SendMessageA loop — resets listbox controls (103 bytes)
  // Iterates G.DAT_006a4f88 controls sending LB_RESETCONTENT. No game state.
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce8a4 — read_profile_int
// Source: decompiled/block_004C0000.c FUN_004ce8a4 (95 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce8a4(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — reads INI/registry profile integer value
  // C source:
  //   __itoa(param_3, local_1c, 10);
  //   local_8 = thunk_FUN_0051d63b(param_1, param_2, 6, local_1c, local_120);
  //   lVar1 = _atol(local_120);
  //   *param_4 = lVar1;
  //   return local_8;
  // Entire function is Win32 GetPrivateProfileString wrapper — no game state
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce903 — allocate_and_copy_string
// Source: block_004C0000.c line 4670
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004ce903 (139 bytes)
export function FUN_004ce903(param_1, param_2, param_3) {
  let sVar1;
  let iVar2;
  let local_c;

  sVar1 = _strlen(param_1);
  if (param_3 < sVar1 + 1) {
    sVar1 = _strlen(param_1);
    local_c = sVar1 + 1;
  } else {
    local_c = param_3;
  }
  iVar2 = FUN_00498159(param_2 + 0x2f4, local_c); // DEVIATION: MFC heap alloc
  if (iVar2 === 0) {
    FUN_00589ef8(-9, 3, 0, 0, 0); // DEVIATION: error handler
  }
  FUN_005f22d0(iVar2, param_1); // DEVIATION: string copy
  return iVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce98e — copy_dialog_template_strings
// Source: block_004C0000.c line 4700
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004ce98e (1367 bytes)
// Source: decompiled/block_004C0000.c FUN_004ce98e (1367 bytes)
export function FUN_004ce98e(param_1, param_2) {
  let _Dst;
  let uVar1;
  let local_10;
  let local_c;

  // First pass: copy linked list nodes
  for (local_c = ri(param_2, 0x30c); local_c !== 0; local_c = ri(local_c, 0x1bc)) {
    _Dst = FUN_004fa617(); // DEVIATION: allocate event struct
    if (_Dst === 0 || _Dst === null) {
      FUN_00589ef8(-9, 3, 0, 0, 0); // DEVIATION: error
    }
    FID_conflict__memcpy(_Dst, local_c, 0x1bc); // DEVIATION: memcpy
  }
  // Second pass: update string pointers in parallel
  local_c = ri(param_2, 0x30c);
  local_10 = ri(param_1, 0x30c);
  do {
    if (local_c === 0) { return; }
    // Copy string fields via FUN_004ce903
    if (ri(local_c, 8) !== 0) {
      uVar1 = FUN_004ce903(ri(local_c, 8), param_1, 0xf);
      wi(local_10, 8, uVar1);
    }
    if (ri(local_c, 0x10) !== 0) {
      uVar1 = FUN_004ce903(ri(local_c, 0x10), param_1, 0x18);
      wi(local_10, 0x10, uVar1);
    }
    if (ri(local_c, 0x14) !== 0) {
      uVar1 = FUN_004ce903(ri(local_c, 0x14), param_1, 0x18);
      wi(local_10, 0x14, uVar1);
    }
    if (ri(local_c, 0x20) !== 0) {
      uVar1 = FUN_004ce903(ri(local_c, 0x20), param_1, 0x18);
      wi(local_10, 0x20, uVar1);
    }
    // Copy 20 entries at +0x38..+0x84
    for (let local_8 = 0; local_8 < 0x14; local_8 = local_8 + 1) {
      if (ri(local_c, local_8 * 4 + 0x38) !== 0) {
        uVar1 = FUN_004ce903(ri(local_c, local_8 * 4 + 0x38), param_1, 1);
        wi(local_10, local_8 * 4 + 0x38, uVar1);
      }
    }
    // Copy remaining string fields
    let offsets = [0x88, 0x90, 0xc4, 0xcc, 0xd4, 0xdc, 0x13c, 0x140, 0x148, 0x174, 0x184];
    let sizes =   [0x18, 0xf,  0x18, 0x18, 0x18, 0xf,  0x18,  0x18,  0xf,   0x18,  1];
    for (let idx = 0; idx < offsets.length; idx++) {
      if (ri(local_c, offsets[idx]) !== 0) {
        uVar1 = FUN_004ce903(ri(local_c, offsets[idx]), param_1, sizes[idx]);
        wi(local_10, offsets[idx], uVar1);
      }
    }
    local_c = ri(local_c, 0x1bc); // next in source list
    local_10 = ri(local_10, 0x1bc); // next in dest list
  } while (true);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cef35 — refresh_dialog_templates
// Source: block_004C0000.c line 4848
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cef35 (144 bytes)
export function FUN_004cef35() {
  // DEVIATION: SEH (FS_OFFSET restore)
  // C: FUN_004fa4be(50000) — allocate 50000 bytes temp buffer
  // C: FUN_004fa5d9(50000) — initialize temp buffer
  // C: FUN_004ce98e(local_320, &G.DAT_0064b690) — copy event data to temp
  // C: FUN_004fa5d9(50000) — reinit
  // C: FUN_004ce98e(&G.DAT_0064b690, local_320) — copy temp back to events
  FUN_004ce98e(0, G.DAT_0064b690); // copy network events
  FUN_004ce98e(G.DAT_0064b690, 0); // copy back
  FUN_004cefc5(); // cleanup
  FUN_004cefdb(); // SEH restore
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cefc5 — cleanup_dialog_template_1
// Source: block_004C0000.c line 4880
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cefc5() {
  FUN_004fa569();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cefdb — cleanup_dialog_template_2 (SEH)
// Source: decompiled/block_004C0000.c FUN_004cefdb (14 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cefdb() {
  // DEVIATION: Win32 — SEH handler cleanup (*unaff_FS_OFFSET = *(unaff_EBP + -0xc))
  // No game state affected — pure structured exception handling teardown
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cefe9 — rename_leader_in_dialogs
// Source: block_004C0000.c line 4911
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cefe9 (347 bytes)
// Source: decompiled/block_004C0000.c FUN_004cefe9 (347 bytes)
export function FUN_004cefe9(param_1, param_2) {
  let iVar1;
  let local_c;
  let local_8 = 0;

  for (local_c = G.DAT_0064b99c; local_c !== 0; local_c = ri(local_c, 0x1bc)) {
    if (ri(local_c, 8) !== 0) {
      iVar1 = _strcmp(ri(local_c, 8), param_1);
      if (iVar1 === 0) { _strncpy(ri(local_c, 8), param_2, 0xf); local_8 = local_8 + 1; }
    }
    if (ri(local_c, 0x90) !== 0) {
      iVar1 = _strcmp(ri(local_c, 0x90), param_1);
      if (iVar1 === 0) { _strncpy(ri(local_c, 0x90), param_2, 0xf); local_8 = local_8 + 1; }
    }
    if (ri(local_c, 0xdc) !== 0) {
      iVar1 = _strcmp(ri(local_c, 0xdc), param_1);
      if (iVar1 === 0) { _strncpy(ri(local_c, 0xdc), param_2, 0xf); local_8 = local_8 + 1; }
    }
    if (ri(local_c, 0x148) !== 0) {
      iVar1 = _strcmp(ri(local_c, 0x148), param_1);
      if (iVar1 === 0) { _strncpy(ri(local_c, 0x148), param_2, 0xf); local_8 = local_8 + 1; }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cf144 — rename_title_in_dialogs
// Source: block_004C0000.c line 4959
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cf144 (630 bytes)
export function FUN_004cf144(param_1, param_2) {
  let iVar1;
  let local_c;
  let local_8 = 0;

  for (local_c = G.DAT_0064b99c; local_c !== 0; local_c = ri(local_c, 0x1bc)) {
    let offsets = [0x14, 0x20, 0x88, 0xc4, 0xcc, 0xd4, 0x140, 0x174];
    for (let idx = 0; idx < offsets.length; idx++) {
      if (ri(local_c, offsets[idx]) !== 0) {
        iVar1 = _strcmp(ri(local_c, offsets[idx]), param_1);
        if (iVar1 === 0) {
          _strncpy(ri(local_c, offsets[idx]), param_2, 0x18);
          local_8 = local_8 + 1;
        }
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cf3ba — rename_tribe_in_dialogs
// Source: block_004C0000.c line 5035
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cf3ba (201 bytes)
export function FUN_004cf3ba(param_1, param_2) {
  let iVar1;
  let local_c;
  let local_8 = 0;

  for (local_c = G.DAT_0064b99c; local_c !== 0; local_c = ri(local_c, 0x1bc)) {
    if (ri(local_c, 0x10) !== 0) {
      iVar1 = _strcmp(ri(local_c, 0x10), param_1);
      if (iVar1 === 0) { _strncpy(ri(local_c, 0x10), param_2, 0x18); local_8 = local_8 + 1; }
    }
    if (ri(local_c, 0x13c) !== 0) {
      iVar1 = _strcmp(ri(local_c, 0x13c), param_1);
      if (iVar1 === 0) { _strncpy(ri(local_c, 0x13c), param_2, 0x18); local_8 = local_8 + 1; }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cff70 — set_dialog_icon
// Source: block_004C0000.c line 5069
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cff70(param_1) {
  // DEVIATION: MFC — FUN_005bd270(ECX+8, param_1) — sets dialog bitmap (43 bytes)
  FUN_005bd270(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cffb0 — get_dialog_text
// Source: decompiled/block_004C0000.c FUN_004cffb0 (51 bytes)
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cffb0(param_1, param_2, param_3) {
  // DEVIATION: MFC — send_msg_2DED(*(in_ECX + 0x1c), param_1, param_2, param_3)
  // MFC dialog text retrieval via Windows message dispatch — no game state affected
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cfff0 — trim_trailing_whitespace (004d007e is similar)
// Source: block_004C0000.c line 5101
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_004C0000.c FUN_004cfff0 (142 bytes)
export function FUN_004cfff0(param_1) {
  let sVar1;
  let local_8;

  sVar1 = _strlen(param_1);
  if (sVar1 !== 0) {
    for (local_8 = param_1 + (sVar1 - 1);
        param_1 <= local_8 &&
        ((local_8 === ' ' || local_8 === '\t') && local_8 !== param_1);
        local_8 = local_8 - 1) {
      // C: *local_8 = '\0' — truncate string at trailing whitespace
    }
  }
  // JS equivalent for string types:
  if (typeof param_1 === 'string') {
    return param_1.trimEnd();
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks referenced but not yet defined.
// These are no-ops that allow the module to load without errors.
// ═══════════════════════════════════════════════════════════════════

function FUN_005b8d15_CSplitterWnd_IsTracking() { return -1; }
function FUN_citywin_C494() { /* city_window_update */ }
function FUN_citywin_C6EF() { /* city_window_refresh */ }
function FUN_citywin_C679() { /* city_window_mark_dirty */ }
function FUN_handle_city_disorder_00509590() { /* investigate_city */ }
function FUN_005ae052_local() { return 0; /* wrap_x — use imported */ }
function FUN_004440d6() { /* unknown */ }
function FUN_005b8d15_fn() { return -1; }
function FUN_004c4210_fn() { }
// FUN_00627cce_fn removed — replaced by direct G.DAT_00627cce[...] array access from mem.js
function send_msg_2DED() { /* network msg stub */ }
// FUN_004274a6 (duplicate stub removed)
// FUN_005b48b1 (duplicate stub removed)
// FUN_005b5bab (duplicate stub removed)
// FUN_005b3ae0 (duplicate stub removed)
// FUN_0056c705 (duplicate stub removed)
// FUN_004d007e (duplicate stub removed)
function FUN_006560fe_arr() { return 0; /* G.DAT_006560fe array accessor */ }
