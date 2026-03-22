// ═══════════════════════════════════════════════════════════════════
// block_004C0000.js — Mechanical transpilation of block_004C0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004C0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004C0000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8, s16, u16, w16,
} from './mem.js';

import {
  FUN_004087c0, FUN_005ae052, FUN_005b8931,
  FUN_005b94d5, FUN_005b89bb, FUN_005b89e4,
  FUN_005b8a1d, FUN_005b8ca6,
  FUN_004bd9f0,
} from './fn_utils.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_00655af0 = 0;
let DAT_0064bc60 = 0;
let DAT_00655b07 = 0;
let DAT_00655be6 = new Int16Array(100);
let DAT_0064c48e = new Int8Array(0x43 * 8);
let DAT_0064c488 = new Array(0x43).fill(0);
let DAT_0064c4b6 = 0;
let DAT_0064c4de = 0;
let DAT_0064c4be = 0;
let DAT_0064c4ee = 0;
let DAT_0064c506 = 0;
let DAT_00655ae8 = 0;
let DAT_00655c18 = 0;
let DAT_00655afa = 0;
let DAT_0064f344 = new Uint8Array(256 * 0x58);
let DAT_0064f345 = new Uint8Array(256 * 0x58);
let DAT_0064f346 = new Uint8Array(256 * 0x58);
let DAT_0064f348 = new Uint8Array(256 * 0x58);
let DAT_0064f349 = new Int8Array(256 * 0x58);
let DAT_0064f34a = new Uint8Array(256 * 0x58);
let DAT_0064f34c = new Uint8Array(256 * 0x58);
let DAT_0064f340 = new Int16Array(256 * 0x2C);
let DAT_0064f342 = new Int16Array(256 * 0x2C);
let DAT_0064f35a = new Uint16Array(256 * 0x2C);
let DAT_0064f35c = new Int16Array(256 * 0x2C);
let DAT_0064f360 = new Uint8Array(256 * 0x58);
let DAT_0064f379 = new Int8Array(256 * 0x58);
let DAT_0064f394 = new Int32Array(256 * 0x16);
let DAT_0062768e = new Int8Array(100 * 0x10);
let DAT_0062768f = new Int8Array(100 * 0x10);
let DAT_00627689 = new Int8Array(100 * 0x10);
let DAT_0062768c = new Int8Array(100 * 0x10);
let DAT_0062768d = new Int8Array(100 * 0x10);
let DAT_00627684 = new Array(100).fill(0);
let DAT_00627680 = 0;
let DAT_00655b0b = 0;
let DAT_00655b08 = 0;
let DAT_0064c6b0 = new Uint8Array(8 * 0x594);
let DAT_0064c6b1 = new Uint8Array(8 * 0x594);
let DAT_0064c6b2 = new Uint8Array(8 * 0x594);
let DAT_0064c6b5 = new Int8Array(8 * 0x594);
let DAT_0064c6aa = new Int16Array(8 * 0x2CA);
let DAT_0064c6a0 = new Uint16Array(8 * 0x2CA);
let DAT_0064c6a2 = new Int32Array(8 * 0x165);
let DAT_0064c6a6 = new Int16Array(8 * 0x2CA);
let DAT_0064c6a8 = new Int16Array(8 * 0x2CA);
let DAT_0064c6bc = new Int16Array(8 * 0x2CA);
let DAT_0064c6c0 = new Uint8Array(8 * 0x594);
let DAT_0064c6c1 = new Uint8Array(8 * 0x594);
let DAT_0064c6c3 = new Uint8Array(8 * 0x594);
let DAT_0064c6e0 = new Uint8Array(8 * 0x594);
let DAT_0064c778 = new Int8Array(8 * 0x594);
let DAT_0064ca82 = new Uint16Array(8 * 0x2CA);
let DAT_006560f0 = new Int16Array(2048 * 0x10);
let DAT_006560f2 = new Int16Array(2048 * 0x10);
let DAT_006560f4 = new Uint16Array(2048 * 0x10);
let DAT_006560f6 = new Uint8Array(2048 * 0x20);
let DAT_006560f7 = new Uint8Array(2048 * 0x20);
let DAT_006560f8 = new Uint8Array(2048 * 0x20);
let DAT_006560f9 = new Uint8Array(2048 * 0x20);
let DAT_006560fa = new Int8Array(2048 * 0x20);
let DAT_006560fd = new Int8Array(2048 * 0x20);
let DAT_006560fe = new Int8Array(2048 * 0x20);
let DAT_006560ff = new Int8Array(2048 * 0x20);
let DAT_00656100 = new Int8Array(2048 * 0x20);
let DAT_00656102 = new Int16Array(2048 * 0x10);
let DAT_00656104 = new Int16Array(2048 * 0x10);
let DAT_0065610a = new Int32Array(2048 * 8);
let DAT_0064b1bc = new Uint8Array(62 * 0x14);
let DAT_0064b1bd = new Uint8Array(62 * 0x14);
let DAT_0064b1b8 = new Array(62).fill(0);
let DAT_0064b1ca = new Int8Array(62 * 0x14);
let DAT_0064b1cb = new Int8Array(62 * 0x14);
let DAT_0064b1c1 = new Int8Array(62 * 0x14);
let DAT_0064b1c3 = new Int8Array(62 * 0x14);
let DAT_0064b1c8 = new Int8Array(62 * 0x14);
let DAT_0064b1df = 0;
let DAT_0064b2cf = 0;
let DAT_0064bcdb = 0;
let DAT_0064bcc8 = 0;
let DAT_0064bcd3 = 0;
let DAT_0064bcd4 = 0;
let DAT_0064bcb2 = 0;
let DAT_0064bcb4 = 0;
let DAT_0064c58e = 0;
let DAT_0064c54e = 0;
let DAT_0064c5a6 = 0;
let DAT_0064c5ae = 0;
let DAT_0064c5b6 = 0;
let DAT_0064b563 = 0;
let DAT_00655b18 = 0;
let DAT_00655b16 = 0;
let DAT_00655b0a = 0;
let DAT_00655af8 = 0;
let DAT_00655afe = 0;
let DAT_00655b00 = 0;
let DAT_00655b02 = 0;
let DAT_00655b07_byte = 0;
let DAT_00655b12 = 0;
let DAT_00655b1a = 0;
let DAT_00655b91 = 0;
let DAT_00655aea = new Uint8Array(4);
let DAT_00655c20 = 0;
let DAT_006d1da0 = 0;
let DAT_00654fa8 = 0;
let DAT_0062804c = 0;
let DAT_0062d044 = 0;
let DAT_0062db00 = 0;
let DAT_0062dcf4 = 0;
let DAT_0062e014 = 0;
let DAT_00628044 = 0;
let DAT_00628420 = 0;
let DAT_00633584 = 0;
let DAT_00633598 = 0;
let DAT_0063359c = 0;
let DAT_0063f660 = 0;
let DAT_00626a24 = 0;
let DAT_0063cc30 = new Uint32Array(64);
let DAT_00627cc8 = new Int8Array(11 * 0x18);
let DAT_00627ccd = new Int8Array(11 * 0x18);
let DAT_00627ccf = new Int8Array(11 * 0x18);
let DAT_00627cd2 = new Int8Array(11 * 0x18);
let DAT_00627cd3 = new Int8Array(11 * 0x18);
let DAT_00628350 = new Int8Array(16);
let DAT_00628360 = new Int8Array(16);
let DAT_00628370 = new Int8Array(0x15);
let DAT_006283a0 = new Int8Array(0x15);
let DAT_006ad30c = new Uint8Array(256);
let DAT_006ad558 = new Int32Array(64);
let DAT_006ad8b8 = 0;
let DAT_006ad2f7 = 0;
let DAT_006a1870 = 0;
let DAT_0064b1b0 = 0;
let DAT_0064b1b4 = 0;
let DAT_006a4f88 = 0;
let DAT_006a4f98 = 0;
let DAT_006a4f9c = 0;
let DAT_006a1880 = new Uint8Array(64);
let DAT_006a1884 = new Uint8Array(64);
let DAT_006a1888 = new Uint8Array(64);
let DAT_006a188c = new Uint8Array(64);
let DAT_006a19d4 = 0;
let DAT_006a19d8 = 0;
let DAT_006a19dc = 0;
let DAT_006a19e0 = 0;
let DAT_006a19e4 = 0;
let DAT_006a19e8 = 0;
let DAT_006a19ec = 0;
let DAT_006a19f0 = 0;
let DAT_006a1d78 = 0;
let DAT_006a1908 = 0;
let DAT_0064b690 = 0;
let DAT_0064b984 = 0;
let DAT_0064b99c = 0;
let DAT_0064b9bc = 0;
let DAT_00631ed8 = 0;
let DAT_00631edc = 0;
let DAT_006ab198 = 0;
let DAT_006ab19c = 0;
let DAT_00655504 = new Int16Array(64);
let DAT_0064bd12 = 0;
let DAT_006a1d88 = 0;
let DAT_006359d4 = 0;
let DAT_0064bb08 = 0;
let DAT_00655020 = 0;
let DAT_0064bcfa = 0;


// ═══════════════════════════════════════════════════════════════════
// C runtime / Win32 stubs
// ═══════════════════════════════════════════════════════════════════
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
function FUN_005f22d0() { /* strcpy stub */ }
function FUN_005f22e0() { /* strcat stub */ }
function debug_log() { /* stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_004c02d8 — can_research_wonder (check if wonder buildable)
// Source: block_004C0000.c line 10
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c02d8(param_1, param_2) {
  let iVar1;
  let local_c;

  local_c = 0;
  if ((((((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 4) === 0)) || (DAT_00655b07 !== 0)) ||
      (((DAT_0064bc60 & 0x8000) !== 0 && (param_2 === 0x17)))) &&
     ((DAT_00655be6[param_2] === -1 &&
      (iVar1 = FUN_004bd9f0(param_1, s8(DAT_0064c48e[(param_2 + 0x27) * 8])),
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
    iVar1 = FUN_004bd9f0(param_1, s8(DAT_0064c48e[param_3 * 8]));
    if (iVar1 !== 0) {
      if (param_2 < 0) {
        local_8 = 1;
      }
      else {
        iVar1 = FUN_0043d20a(param_2, param_3);
        if (((((iVar1 === 0) &&
              (((param_3 !== 0x1e && (param_3 !== 0x1f)) ||
               ((DAT_0064f344[param_2 * 0x58] & 0x80) !== 0)))) &&
             (((param_3 !== 0x22 && (param_3 !== 0x1c)) ||
              (((DAT_0064f346[param_2 * 0x58] & 0x20) !== 0 &&
               ((DAT_0064f344[param_2 * 0x58] & 0x80) !== 0)))))) &&
            ((((param_3 !== 3 || (iVar1 = FUN_00453e51(param_1, 0), iVar1 === 0)) &&
              ((param_3 !== 0xb || (iVar1 = FUN_00453e51(param_1, 10), iVar1 === 0)))) &&
             ((param_3 !== 7 || (iVar1 = FUN_0043d20a(param_2, 1), iVar1 === 0)))))) &&
           (((((param_3 !== 10 ||
               ((iVar1 = FUN_0043d20a(param_2, 5), iVar1 !== 0 &&
                (iVar1 = FUN_004bd9f0(param_1, DAT_0064c4b6), iVar1 !== 0)))) &&
              ((param_3 !== 0x16 ||
               ((iVar1 = FUN_0043d20a(param_2, 10), iVar1 !== 0 &&
                (iVar1 = FUN_004bd9f0(param_1, DAT_0064c4de), iVar1 !== 0)))))) &&
             (((param_3 !== 0xc ||
               ((iVar1 = FUN_0043d20a(param_2, 6), iVar1 !== 0 &&
                (iVar1 = FUN_004bd9f0(param_1, DAT_0064c4be), iVar1 !== 0)))) &&
              (((param_3 !== 0x1a ||
                (((iVar1 = FUN_00453e51(param_1, 0x1a), iVar1 === 0 &&
                  (iVar1 = FUN_0043d20a(param_2, 0xc), iVar1 !== 0)) &&
                 (iVar1 = FUN_004bd9f0(param_1, DAT_0064c4ee), iVar1 !== 0)))) &&
               ((param_3 !== 0x17 || (iVar1 = FUN_0043d20a(param_2, 9), iVar1 !== 0)))))))) &&
            ((((param_3 !== 0x21 || (iVar1 = FUN_00453e51(param_1, 0x15), iVar1 === 0)) &&
              ((((param_3 !== 0x10 ||
                 ((iVar1 = FUN_0043d20a(param_2, 0xf), iVar1 !== 0 &&
                  (iVar1 = FUN_004bd9f0(param_1, DAT_0064c506), iVar1 !== 0)))) &&
                ((param_3 !== 0x14 || ((DAT_0064f345[param_2 * 0x58] & 8) !== 0)))) &&
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
              ((((DAT_00655ae8 & 0x80) === 0 && (DAT_00655c18 !== -1)) &&
               (((0 < DAT_00655afa || ((DAT_00655af0 & 0x80) !== 0)) &&
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
        ((DAT_0062768e[local_10 * 0x10] !== -2 || (DAT_0062768f[local_10 * 0x10] !== -2)))) &&
       (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0 ||
        (((local_14 === 0 || (DAT_00655b08 === 0)) ||
         ((local_10 - u8(DAT_0064c6b0[param_1 * 0x594])) % 3 !== 0)))))) {
      local_14 = local_14 + 1;
      if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
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
        if (DAT_00626a24 === 0) {
          FUN_0043c990(0x4b, 0);
          // CPropertySheet::EnableStackedTabs — UI stub
        }
        for (local_31c = 0; local_31c < 100; local_31c = local_31c + 1) {
          if (((DAT_00627689[local_31c * 0x10] !== 0) &&
              (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) &&
             ((param_2 === 0 ||
              ((s16(DAT_0064c6aa, param_1 * 0x594) !== local_31c &&
               ((DAT_0062768e[local_31c * 0x10] !== -2 ||
                (DAT_0062768f[local_31c * 0x10] !== -2)))))))) {
            FUN_0040bbb0();
            FUN_0040ff00(DAT_00627684[local_31c]);
            if (local_31c === 0x59) {
              FUN_0040fe10();
              FUN_0040ff30(u8(DAT_0064c6b1[param_1 * 0x594]) + 1);
            }
            FUN_0059edf0(0 /*&DAT_00679640*/, local_31c, 0);
            local_318 = local_318 + 1;
          }
        }
      }
      else if (aiStack_334[1] === 1) {
        if (DAT_00626a24 === 0) {
          FUN_0043c990(0x4b, 0);
        }
        for (local_30c = 0; local_30c < 0x3e; local_30c = local_30c + 1) {
          local_31c = s8(DAT_0064b1cb[local_30c * 0x14]);
          if (((-1 < local_31c) && (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) &&
             ((param_2 === 0 || (s16(DAT_0064c6aa, param_1 * 0x594) !== local_31c)))) {
            FUN_0040bbb0();
            FUN_0040ff00(DAT_0064b1b8[local_30c]);
            FUN_0040fe10();
            FUN_0040bbe0(0 /*&DAT_0062dbd8*/);
            FUN_0040fea0();
            FUN_0040ff00(DAT_00627684[local_31c]);
            FUN_0040fed0();
            FUN_0059edf0(0 /*&DAT_00679640*/, local_30c, 0);
            local_318 = local_318 + 1;
          }
        }
      }
      else if (aiStack_334[1] === 2) {
        if (DAT_00626a24 === 0) {
          FUN_0043c990(0x4b, 0);
        }
        for (local_320 = 0; local_320 < 0x43; local_320 = local_320 + 1) {
          local_31c = s8(DAT_0064c48e[local_320 * 8]);
          if (((-1 < local_31c) && (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) &&
             ((param_2 === 0 || (s16(DAT_0064c6aa, param_1 * 0x594) !== local_31c)))) {
            FUN_0040bbb0();
            FUN_0040ff00(DAT_0064c488[local_320]);
            FUN_0040fe10();
            FUN_0040bbe0(0 /*&DAT_0062dbdc*/);
            FUN_0040fea0();
            FUN_0040ff00(DAT_00627684[local_31c]);
            FUN_0040fed0();
            FUN_0059edf0(0 /*&DAT_00679640*/, local_320, 0);
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
      if (DAT_00626a24 === 0) {
        if (aiStack_334[1] === 0) {
          FUN_00566584(local_324);
        }
        else if (aiStack_334[1] === 1) {
          local_31c = s8(DAT_0064b1cb[local_324 * 0x14]);
          local_30c = local_324;
          FUN_0040ffa0(0 /*s_HELPON*/, 1);
          FUN_0059edf0(FUN_00428b0c(DAT_0064b1b8[local_30c]), 0, 0);
          FUN_0059edf0(FUN_00428b0c(DAT_00627684[local_31c]), 1, 0);
          local_324 = FUN_0040bc80(0);
          if (local_324 === 0) {
            FUN_005ad998(local_30c);
          }
          if (local_324 === 1) {
            FUN_00566584(local_31c);
          }
        }
        else if (aiStack_334[1] === 2) {
          local_31c = s8(DAT_0064c48e[local_324 * 8]);
          local_320 = local_324;
          FUN_0040ffa0(0 /*s_HELPON*/, 1);
          FUN_0059edf0(FUN_00428b0c(DAT_0064c488[local_320]), 0, 0);
          FUN_0059edf0(FUN_00428b0c(DAT_00627684[local_31c]), 1, 0);
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
    local_324 = s8(DAT_0064b1cb[local_324 * 0x14]);
  }
  else if (aiStack_334[1] === 2) {
    local_324 = s8(DAT_0064c48e[local_324 * 8]);
  }
  local_318 = 0;
  local_314 = 0;
  local_31c = 0;

  // do-while loop with goto restructured
  let doLoop = true;
  while (doLoop) {
    if (99 < local_31c) {
      FUN_004271e8(0, DAT_00627684[local_324]);
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
        FUN_0040ff00(DAT_00627684[local_31c]);
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
        FUN_0059e18b(0 /*&DAT_00679640*/, 0xffffffff, 0xffffffff, 0xffffffff, 0);
      }
      FUN_0040bc80(0);
      FUN_004c193a();
      FUN_004c1950();
      return;
    }
    if ((DAT_00627689[local_31c * 0x10] !== 0) &&
       (iVar2 = FUN_004bd9f0(param_1, local_31c), iVar2 === 0)) {
      if (param_3 === 0) {
        iVar2 = FUN_004bd9f0(param_1, s8(DAT_0062768e[local_31c * 0x10]));
        if (((iVar2 !== 0) &&
            (iVar2 = FUN_004bd9f0(param_1, s8(DAT_0062768f[local_31c * 0x10])),
            iVar2 !== 0)) &&
           ((param_2 === 0 || (s16(DAT_0064c6aa, param_1 * 0x594) !== local_31c)))) {
          if (((local_318 !== 0) && (DAT_00655b08 !== 0)) && ((DAT_00655af0 & 0x80) === 0)) {
            iVar2 = (local_31c - (u8(DAT_0064c6b0[param_1 * 0x594]) + param_2)) % 3;
            // goto joined_r0x004c1729
            if (iVar2 !== 0) {
              // LAB_004c1734
              if ((DAT_0062768e[local_31c * 0x10] !== -2) || (DAT_0062768f[local_31c * 0x10] !== -2)) {
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
            if ((DAT_0062768e[local_31c * 0x10] !== -2) || (DAT_0062768f[local_31c * 0x10] !== -2)) {
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
          if ((DAT_0062768e[local_31c * 0x10] !== -2) || (DAT_0062768f[local_31c * 0x10] !== -2)) {
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
// Source: block_004C0000.c line 544
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c1950() {
  // SEH handler cleanup — no-op in JS
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
     (((iVar1 = local_604, DAT_00655af8 !== 0 &&
       ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0)) && (DAT_00654fa8 === 0)))) {
    let looping = true;
    while (looping) {
      iVar1 = local_604;
      if (((DAT_00655aea[1] & 2) !== 0) && (param_2 === 0)) {
        FUN_0040bbb0();
        FUN_0040ff00(DAT_00627684[iVar1]);
        if (iVar1 === 0x59) {
          FUN_0040fe10();
          FUN_0040ff30(u8(DAT_0064c6b1[param_1 * 0x594]) + 1);
        }
        FUN_0040ff60(0, 0 /*&DAT_00679640*/);
        local_630 = 0;
        local_620 = 0;
        for (local_608 = 0; local_608 < 0x3e; local_608 = local_608 + 1) {
          if ((s8(DAT_0064b1cb[local_608 * 0x14]) === iVar1) && (local_620 < 5)) {
            aiStack_61c[local_620] = local_608;
            local_620 = local_620 + 1;
          }
        }
        for (local_628 = 1; local_628 < 0x43; local_628 = local_628 + 1) {
          if ((s8(DAT_0064c48e[local_628 * 8]) === iVar1) && (local_620 < 5)) {
            aiStack_61c[local_620] = -local_628;
            local_620 = local_620 + 1;
          }
        }
        if (local_620 === 0) {
          for (local_30c = 0; local_30c < 100; local_30c = local_30c + 1) {
            if ((DAT_00627689[local_30c * 0x10] !== 0) &&
               (((s8(DAT_0062768e[local_30c * 0x10]) === iVar1 ||
                 (s8(DAT_0062768f[local_30c * 0x10]) === iVar1)) && (local_620 < 5)))) {
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
        FUN_0059ec88(0, 0, 0);
        if (local_630 !== 0) {
          FUN_0040bbb0();
          for (local_14 = 0; local_14 < local_620; local_14 = local_14 + 1) {
            if (local_630 === 1) {
              local_608 = aiStack_61c[local_14];
              if (local_608 < 0) {
                FUN_0040ff00(DAT_0064c488[local_608 * -1]);
              }
              else {
                FUN_0040ff00(DAT_0064b1b8[local_608]);
              }
            }
            else {
              FUN_0040ff00(DAT_00627684[aiStack_61c[local_14]]);
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
          FUN_0059e18b(0 /*&DAT_00679640*/, 0xffffffff, 0xffffffff, 0xffffffff, 0);
        }
        iVar1 = FUN_00421bb0();
        FUN_005a5f34(0, iVar1 + -300);
      }
      iVar1 = FUN_004bd9f0(param_1, 0x26);
      FUN_004271e8(0, 0 /*icon ptr*/);
      FUN_0043c9d0(0 /*s_RESEARCH*/);
      if ((DAT_00655aea[1] & 2) !== 0) {
        FUN_0059e783(5, 0xfffffc19);
      }
      // CPropertySheet::EnableStackedTabs — UI stub
      FUN_0043c990(0x4b, 0);
      local_620 = 0;
      for (local_624 = 0; local_624 < 100; local_624 = local_624 + 1) {
        if (((((DAT_00627689[local_624 * 0x10] !== 0) &&
              (iVar1 = FUN_004bd9f0(param_1, local_624), iVar1 === 0)) &&
             ((iVar1 = FUN_004bd9f0(param_1, s8(DAT_0062768e[local_624 * 0x10])),
              iVar1 !== 0 &&
              (iVar1 = FUN_004bd9f0(param_1, s8(DAT_0062768f[local_624 * 0x10])),
              iVar1 !== 0)))) &&
            ((DAT_0062768e[local_624 * 0x10] !== -2 || (DAT_0062768f[local_624 * 0x10] !== -2)))
            ) && ((local_620 === 0 ||
                  ((((DAT_00655b08 === 0 || (param_2 !== 0)) || ((DAT_00655af0 & 0x80) !== 0)) ||
                   ((local_624 - u8(DAT_0064c6b0[param_1 * 0x594])) % 3 !== 0)))))) {
          FUN_0040bbb0();
          FUN_0040ff00(DAT_00627684[local_624]);
          if (local_624 === 0x59) {
            FUN_0040fe10();
            FUN_0040ff30(u8(DAT_0064c6b1[param_1 * 0x594]) + 1);
          }
          FUN_0059edf0(0 /*&DAT_00679640*/, local_624, 0);
          local_620 = local_620 + 1;
        }
      }
      iVar1 = local_604;
      if (local_620 === 0) { looping = false; break; }
      iVar1 = FUN_005a5f34(0, 300);
      if ((DAT_00655aea[1] & 2) !== 0) {
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
  w16(DAT_0064c6aa, param_1 * 0x594, local_604);
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
// Source: block_004C0000.c line 769
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c219e() {
  // SEH handler cleanup — no-op in JS
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
  sVar1 = s16(DAT_0064c6aa, param_1 * 0x594);
  if (s16(DAT_0064c6aa, param_1 * 0x594) < 0) {
    FUN_004c21ad(param_1);
    sVar1 = s16(DAT_0064c6aa, param_1 * 0x594);
  }
  local_30c = sVar1;
  if (local_30c < 0) {
    FUN_004c2763();
    FUN_004c2779();
    return;
  }
  if (DAT_0062db00 !== 2) {
    w16(DAT_0064c6a8, param_1 * 0x594, 0);
  }
  w16(DAT_0064c6aa, param_1 * 0x594, 0xffff);
  FUN_004bf05b(param_1, local_30c, param_2, 0, 0);
  if ((DAT_00655af8 !== 0) && ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0)) {
    if ((DAT_006d1da0 === param_1) && (DAT_00654fa8 === 0)) {
      let uVar3 = FUN_00493d13(param_1);
      FUN_00421d60(0, uVar3);
      iVar2 = FUN_004bd9f0(param_1, 0x26);
      FUN_004271e8(1, 0 /*icon ptr*/);
      FUN_0040bbb0();
      FUN_0040ff00(DAT_00627684[local_30c]);
      if (local_30c === 0x59) {
        FUN_0040fe10();
        FUN_0040ff30(DAT_0064c6b1[param_1 * 0x594]);
      }
      FUN_00421d60(2, 0 /*&DAT_00679640*/);
      FUN_0043c9d0(0 /*s_CIVADVANCE*/);
      FUN_0059ec88(0, 0, 0);
      // CPropertySheet::EnableStackedTabs — UI stub
      FUN_0040bc80(0);
      if ((DAT_00655aea[2] & 8) !== 0) {
        FUN_00566584(local_30c);
      }
      if ((((local_30c === 0x3c) && ((u16(DAT_0064c6a0, param_1 * 0x594) & 0x20) !== 0)) &&
          (DAT_006d1da0 === param_1)) && (DAT_00654fa8 === 0)) {
        FUN_004bee56(param_1);
      }
      if (DAT_0064b1df === local_30c) {
        FUN_00410030(0 /*s_NEWXFORM*/, 0, 8);
      }
      if (local_30c === 0x12) {
        FUN_00410030(0 /*s_NEWFORTRESS*/, 0, 0);
      }
      if (DAT_0064c58e === local_30c) {
        FUN_00410030(0 /*s_NEWAIRLIFT*/, 0, 8);
      }
      if (local_30c === 0x43) {
        FUN_00410030(0 /*s_NEWRAILROAD*/, 0, 8);
      }
      if (DAT_0064c54e === local_30c) {
        FUN_0043c9d0(0 /*s_NEWFARMLAND*/);
        FUN_0059ec88(0, 0, 0);
        FUN_0059ec88(0, 0, 0);
        FUN_0040bc80(0);
      }
      if (DAT_0064b2cf === local_30c) {
        FUN_004c4210(0, DAT_0064bcdb);
        FUN_00410030(0 /*s_NEWPARADROP*/, 0, 8);
      }
      if (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) && (DAT_00655af8 !== 0)) {
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
  if (((DAT_00655af8 !== 0) && (-1 < iVar2)) &&
     ((iVar2 < DAT_00655b18 &&
      ((DAT_0064f394[iVar2 * 0x16] !== 0 &&
       (s8(DAT_0064f348[iVar2 * 0x58]) === param_1)))))) {
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
// Source: block_004C0000.c line 933
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c2779() {
  // SEH handler cleanup — no-op in JS
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

  uVar1 = u8(DAT_0064c6b0[param_1 * 0x594]) +
          u8(DAT_0064c6b2[param_1 * 0x594]);
  if (uVar1 < 2) {
    uVar1 = 1;
  }
  local_14 = FUN_005adfa0(DAT_00655b08, 0, 4);
  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    local_14 = 0xe - local_14;
  }
  else {
    local_14 = local_14 * 2 + 6;
  }
  if (((DAT_00655af0 & 0x80) === 0) || (DAT_0064bcb4 === 0)) {
    if (uVar1 < u8(DAT_0064c6b0[DAT_00655c20 * 0x594]) +
                u8(DAT_0064c6b2[DAT_00655c20 * 0x594])) {
      if (DAT_00655b08 !== 0) {
        local_14 = local_14 + -1;
      }
      if (((DAT_00655b08 === 5) &&
          (uVar1 + 4 <
           u8(DAT_0064c6b0[DAT_00655c20 * 0x594]) +
           u8(DAT_0064c6b2[DAT_00655c20 * 0x594]))) && (0x96 < DAT_00655af8)) {
        local_14 = local_14 + -1;
      }
    }
    else {
      local_14 = local_14 +
                 ((uVar1 - (u8(DAT_0064c6b0[DAT_00655c20 * 0x594]) +
                             u8(DAT_0064c6b2[DAT_00655c20 * 0x594]))) / 3) | 0;
    }
    local_10 = 0;
    if (0x13 < uVar1) {
      local_10 = FUN_005adfa0(uVar1 - ((DAT_00655af8 +
                                                  (DAT_00655af8 >> 31 & 7)) >> 3), 0, 6);
    }
    local_14 = local_14 + local_10;
  }
  if ((DAT_00655af0 & 0x80) === 0) {
    if (DAT_0064bcd3 !== 10) {
      local_14 = (DAT_0064bcd3 * local_14 / 10) | 0;
    }
  }
  else if (DAT_0064bcb2 !== 10) {
    local_14 = (DAT_0064bcb2 * local_14 / 10) | 0;
  }
  local_1c = (local_14 * 3) >> 2;
  if (u8(DAT_0064c6b0[param_1 * 0x594]) + u8(DAT_0064c6b2[param_1 * 0x594]) < 0x14) {
    local_1c = (((u8(DAT_0064c6b0[param_1 * 0x594]) +
                 u8(DAT_0064c6b2[param_1 * 0x594])) * local_1c) / 0x14) | 0;
  }
  local_14 = local_14 + local_1c;
  if (0x43 < DAT_00655b1a) {
    local_14 = ((local_14 * 0x43) / DAT_00655b1a) | 0;
  }
  if ((DAT_00655af0 & 4) !== 0) {
    local_14 = (local_14 * 5 + (local_14 * 5 >> 31 & 3)) >> 2;
  }
  if ((DAT_00655af0 & 8) !== 0) {
    local_14 = ((local_14 << 2) / 5) | 0;
  }
  if (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) && (local_14 < (0xb - uVar1))) {
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
    // C: *(short *)(&DAT_0064c6a8 + param_1 * 0x594) += (short)param_2
    w16(DAT_0064c6a8, param_1 * 0x594,
         s16(DAT_0064c6a8, param_1 * 0x594) + (param_2 & 0xFFFF));
    if (-1 < s16(DAT_0064c6aa, param_1 * 0x594)) {
      sVar1 = s16(DAT_0064c6a8, param_1 * 0x594);
      iVar2 = FUN_004c2788(param_1);
      if (iVar2 <= sVar1) {
        FUN_004c21d5(param_1, 0);
      }
      if ((u16(DAT_0064c6a0, param_1 * 0x594) & 0x20) !== 0) {
        w16(DAT_0064c6a0, param_1 * 0x594,
             u16(DAT_0064c6a0, param_1 * 0x594) & 0xffdf);
        FUN_004c21d5(param_1, 0);
      }
    }
    if ((s16(DAT_0064c6a8, param_1 * 0x594) !== 0) &&
       (s16(DAT_0064c6aa, param_1 * 0x594) < 0)) {
      if (((DAT_00655aea[1] & 1) !== 0) &&
         (((u8(DAT_0064c6b0[param_1 * 0x594]) < 2 &&
          ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0))))) {
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
  DAT_0063cc30[param_1] = u8(param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004c4240 — show_popup_message_1
// Source: block_004C0000.c line 1093
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c4240(param_1, param_2, param_3) {
  FUN_004a6b80(DAT_006359d4, param_1, 0, param_2, param_3);
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
  cVar1 = s8(DAT_006560f7[param_1 * 0x20]);
  iVar5 = s16(DAT_006560f0, param_1 * 0x20);
  iVar6 = s16(DAT_006560f2, param_1 * 0x20);
  bVar4 = FUN_005b89bb(iVar5, iVar6);
  uVar10 = u8(bVar4);
  cVar2 = s8(DAT_006560ff[param_1 * 0x20]);
  DAT_006560ff[param_1 * 0x20] = param_2;
  switch (param_2) {
  case 4:
    local_8 = ((s8(DAT_00627cc8[uVar10 * 0x18]) / 2) | 0) + 3;
    break;
  case 5:
    uVar7 = FUN_005b94d5(iVar5, iVar6);
    local_8 = (((uVar7 & 0x10) === 0 ? -2 : 0) + 4) *
              s8(DAT_00627cc8[uVar10 * 0x18]);
    pbVar8 = FUN_005b8931(iVar5, iVar6);
    // In C, *pbVar8 reads byte 0 from tile. In JS we approximate:
    // Checking if tile byte 0 has bit 0x80 set
    if (pbVar8 >= 0) {
      let tileB0 = 0; // would be tileRead(pbVar8, 0)
      if ((tileB0 & 0x80) !== 0) {
        local_8 = local_8 + 2;
      }
    }
    break;
  case 6:
    local_8 = s8(DAT_00627cd2[uVar10 * 0x18]);
    break;
  case 7:
    local_8 = s8(DAT_00627cd3[uVar10 * 0x18]);
    break;
  case 8:
    local_8 = s8(DAT_00627cc8[uVar10 * 0x18]) * DAT_0064bcd4;
    break;
  case 9:
    local_8 = 4;
    break;
  case 10:
    local_8 = 4;
    break;
  }
  DAT_0062804c = 0;
  FUN_005b6787(param_1);
  local_14 = -1;
  param_1 = FUN_005b2d39(param_1);

  // Restructured do-while with goto LAB_004c44ea
  let reachedLabel = false;
  while (true) {
    if (param_1 < 0) {
      reachedLabel = true;
    }
    else if (((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 5) &&
        (s8(DAT_006560ff[param_1 * 0x20]) === param_2)) && (param_1 !== iVar3)) {
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
        DAT_006560fd[iVar3 * 0x20] =
             DAT_006560fd[iVar3 * 0x20] + DAT_006560fd[local_14 * 0x20];
        DAT_006560fd[local_14 * 0x20] = 0;
      }
      DAT_006560fd[iVar3 * 0x20] = DAT_006560fd[iVar3 * 0x20] + 1;
      if (s8(DAT_006560f6[iVar3 * 0x20]) === 1) {
        DAT_006560fd[iVar3 * 0x20] = DAT_006560fd[iVar3 * 0x20] + 1;
      }
      if (s8(DAT_006560fd[iVar3 * 0x20]) < local_8) {
        FUN_0047ce1e(iVar5, iVar6, 0, DAT_006d1da0, 1);
        if (DAT_006560ff[iVar3 * 0x20] !== cVar2) {
          FUN_citywin_C494(iVar3, 0xffffff9d, 0xffffff9d);
        }
      }
      else {
        for (param_1 = FUN_005b2d39(iVar3); -1 < param_1;
            param_1 = FUN_005b2c82(param_1)) {
          if ((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 5) &&
             (s8(DAT_006560ff[param_1 * 0x20]) === param_2)) {
            DAT_006560fd[param_1 * 0x20] = 0;
            DAT_006560ff[param_1 * 0x20] = 0xff;
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
          if (s8(DAT_00627cc8[uVar10 * 0x18 + param_2]) < 0) {
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
            FUN_005b9646(iVar5, iVar6, s8(DAT_00627cc8[uVar10 * 0x18 + param_2]), 1);
            cVar1 = s8(DAT_00627cc8[uVar10 * 0x18 + param_2]);
            if ((s8(DAT_00627cce_fn(cVar1 * 0x18)) !== -2) &&
               (uVar10 = FUN_005b94d5(iVar5, iVar6), (uVar10 & 4) !== 0)) {
              FUN_005b94fc(iVar5, iVar6, 0xc, 0, 1);
            }
            if ((s8(DAT_00627ccf[cVar1 * 0x18]) !== -2) &&
               (bVar4 = FUN_005b94d5(iVar5, iVar6), (bVar4 & 0xc) === 8)) {
              FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
            }
          }
          break;
        case 8:
          FUN_005b9646(iVar5, iVar6, s8(DAT_00627ccd[uVar10 * 0x18]), 1);
          cVar1 = s8(DAT_00627ccd[uVar10 * 0x18]);
          if ((s8(DAT_00627cce_fn(cVar1 * 0x18)) !== -2) &&
             (uVar10 = FUN_005b94d5(iVar5, iVar6), (uVar10 & 4) !== 0)) {
            FUN_005b94fc(iVar5, iVar6, 0xc, 0, 1);
          }
          if ((s8(DAT_00627ccf[cVar1 * 0x18]) !== -2) &&
             (bVar4 = FUN_005b94d5(iVar5, iVar6), (bVar4 & 0xc) === 8)) {
            FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
          }
          break;
        case 9:
          uVar10 = FUN_005b94d5(iVar5, iVar6);
          if ((uVar10 & 0x80) !== 0) {
            DAT_00655b12 = DAT_00655b12 + -1;
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
        FUN_005b8b1a(iVar5, iVar6, s8(DAT_006560f7[iVar3 * 0x20]));
        FUN_0047ce1e(iVar5, iVar6, 1, DAT_006d1da0, 1);
        if (s8(DAT_006560f7[iVar3 * 0x20]) === DAT_006d1da0) {
          FUN_0056a65e(1);
        }
        if (DAT_006560ff[iVar3 * 0x20] !== cVar2) {
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

  DAT_0062804c = 0;
  DAT_006560ff[param_1 * 0x20] = 2;
  if (((DAT_00655b0b & (1 << (DAT_006560f7[param_1 * 0x20] & 0x1f))) === 0) &&
     (-1 < s8(DAT_00656100[param_1 * 0x20]))) {
    iVar2 = FUN_0043cf76(s16(DAT_006560f0, param_1 * 0x20),
                               s16(DAT_006560f2, param_1 * 0x20));
    if (iVar2 < 0) {
      bVar1 = FUN_005b94d5(s16(DAT_006560f0, param_1 * 0x20),
                                 s16(DAT_006560f2, param_1 * 0x20));
      if ((((bVar1 & 0x42) === 0x40) &&
          (iVar2 = FUN_0043d07a(s16(DAT_006560f0, param_1 * 0x20),
                                      s16(DAT_006560f2, param_1 * 0x20),
                                      s8(DAT_006560f7[param_1 * 0x20]), 0xffffffff,
                                      0xffffffff), -1 < iVar2)) &&
         (s8(DAT_0064f349[iVar2 * 0x58]) > 2)) {
        if (DAT_00656100[param_1 * 0x20] === -1) {
          local_8 = 0xffffffff;
        }
        else {
          local_8 = u8(DAT_00656100[param_1 * 0x20]);
        }
        local_c = iVar2;
        DAT_00656100[param_1 * 0x20] = local_c;
        if (-1 < local_8) {
          FUN_citywin_C679(local_8);
        }
        FUN_citywin_C679(iVar2);
      }
    }
    else if (s8(DAT_0064f349[iVar2 * 0x58]) > 2) {
      if (DAT_00656100[param_1 * 0x20] === -1) {
        local_8 = 0xffffffff;
      }
      else {
        local_8 = u8(DAT_00656100[param_1 * 0x20]);
      }
      local_c = iVar2;
      DAT_00656100[param_1 * 0x20] = local_c;
      if (-1 < local_8) {
        FUN_citywin_C679(local_8);
      }
      FUN_citywin_C679(iVar2);
    }
  }
  FUN_0047cea6(s16(DAT_006560f0, param_1 * 0x20),
                     s16(DAT_006560f2, param_1 * 0x20));
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

  iVar1 = s16(DAT_006560f0, param_1 * 0x20);
  iVar2 = s16(DAT_006560f2, param_1 * 0x20);
  if ((DAT_00655b07 !== 0) || (s8(DAT_006560f7[param_1 * 0x20]) === DAT_006d1da0)) {
    FUN_004105f8(iVar1, iVar2, s8(DAT_006560f7[param_1 * 0x20]));
  }
  if ((-1 < param_2) ||
     (param_2 = FUN_create_city(iVar1, iVar2, s8(DAT_006560f7[param_1 * 0x20])),
     -1 < param_2)) {
    if (param_3 !== 0) {
      FUN_005f22d0(0 /*&DAT_0064f360 + param_2 * 0x58*/, param_3);
    }
    FUN_005b4391(param_1, 1);
    FUN_005b94fc(iVar1, iVar2, 0x7c, 0, 1);
    for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
      FUN_005b8b1a(iVar1, iVar2, local_10);
    }
    FUN_0047ce1e(iVar1, iVar2, 1, DAT_006d1da0, 1);
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

  DAT_0062804c = 0;
  bVar1 = DAT_006560f7[param_1 * 0x20];
  bVar2 = DAT_006560ff[param_1 * 0x20];
  DAT_0062d044 = s8(bVar1);
  if ((bVar2 & 0x10) !== 0) {
    DAT_0062d044 = -1;
  }
  iVar3 = FUN_004adafc(param_1);
  if ((iVar3 < 0) || (iVar3 === 8)) {
    if ((iVar3 !== 8) &&
       (DAT_006560ff[param_1 * 0x20] = 0xff,
       s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 4)) {
      DAT_006560fd[param_1 * 0x20] = DAT_00655af8 & 7;
    }
  }
  else {
    iVar3 = FUN_0059062c(param_1, iVar3, 3);
    if (iVar3 === 0) {
      return;
    }
    w16(DAT_006560f4, param_1 * 0x20,
         s16(DAT_006560f4, param_1 * 0x20) & 0xff7f);
    if (((s16(DAT_006560f0, param_1 * 0x20) === s16(DAT_00656102, param_1 * 0x20))
        && (s16(DAT_006560f2, param_1 * 0x20) === s16(DAT_00656104, param_1 * 0x20)
           )) && ((bVar2 & 0x10) === 0)) {
      DAT_006560ff[param_1 * 0x20] = 0xff;
      w16(DAT_006560f4, param_1 * 0x20,
           s16(DAT_006560f4, param_1 * 0x20) | 0x80);
      if (((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0) &&
         (((s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 2 ||
           ((s8(DAT_006560fe[param_1 * 0x20]) > 9 &&
            (iVar3 = FUN_005b4b66(s16(DAT_006560f0, param_1 * 0x20),
                                        s16(DAT_006560f2, param_1 * 0x20),
                                        s8(bVar1)), iVar3 === 0)))) &&
          (FUN_005b6787(param_1),
          s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 4)))) {
        DAT_006560fd[param_1 * 0x20] = DAT_00655af8 & 7;
      }
    }
  }
  DAT_0062d044 = 0xffffffff;
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

  iVar2 = s16(DAT_006560f0, param_1 * 0x20);
  iVar3 = s16(DAT_006560f2, param_1 * 0x20);
  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar4 = FUN_0043d07a(iVar2, iVar3, 0xffffffff, 0xffffffff, 0xffffffff);
  if ((((iVar4 < 0) || (s8(DAT_0064f348[iVar4 * 0x58]) === s8(bVar1))) ||
      ((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0)) ||
     (iVar4 = FUN_00579ed0(s8(bVar1), s8(DAT_0064f348[iVar4 * 0x58]), 0xe),
     iVar4 === 0)) {
    iVar4 = FUN_005b8931(iVar2, iVar3);
    // pbVar5 = iVar4 + 1 — tile byte[1] = improvements
    let improv = 0; // would be tileRead(iVar4, 1)
    if (param_2 < 1) {
      if ((s8(DAT_006560f6[param_1 * 0x20]) === 9) && ((improv & 0x10) !== 0)) {
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
      FUN_005b8b1a(iVar2, iVar3, s8(DAT_006560f7[param_1 * 0x20]));
      FUN_005b8b1a(iVar2, iVar3, s8(DAT_0064f348[iVar4 * 0x58]));
      FUN_00467825(s8(DAT_006560f7[param_1 * 0x20]),
                         s8(DAT_0064f348[iVar4 * 0x58]), 0x2000);
      if (DAT_0064f348[iVar4 * 0x58] !== DAT_006560f7[param_1 * 0x20]) {
        FUN_0049301b(s8(DAT_006560f7[param_1 * 0x20]), iVar2, iVar3, 0, 4);
      }
    }
    FUN_0047ce1e(iVar2, iVar3, 1, DAT_006d1da0, 1);
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
  let order = s8(DAT_006560ff[param_1 * 0x20]);
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
  let bVar1 = DAT_006560f6[param_1 * 0x20];
  iVar6 = s16(DAT_006560f0, param_1 * 0x20);
  iVar7 = s16(DAT_006560f2, param_1 * 0x20);
  let bVar2 = DAT_006560f7[param_1 * 0x20];
  local_20 = -1;
  if (s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0) {
    local_20 = FUN_005b8a81(iVar6, iVar7);
  }
  DAT_0063f660 = 9999;
  local_14 = -1;
  for (local_30 = 0; local_30 < DAT_00655b18; local_30 = local_30 + 1) {
    if ((((DAT_0064f394[local_30 * 0x16] !== 0) &&
         (DAT_0064f348[local_30 * 0x58] === bVar2)) &&
        ((local_20 < 0 ||
         (iVar8 = FUN_005b8a81(s16(DAT_0064f340, local_30 * 0x58),
                                     s16(DAT_0064f342, local_30 * 0x58)),
         iVar8 === local_20)))) &&
       (iVar8 = FUN_005ae1b0(iVar6, iVar7, s16(DAT_0064f340, local_30 * 0x58),
                                   s16(DAT_0064f342, local_30 * 0x58)),
       iVar8 < DAT_0063f660)) {
      local_14 = local_30;
      DAT_0063f660 = iVar8;
    }
  }
  if (s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 1) {
    for (param_1 = 0; param_1 < DAT_00655b16; param_1 = param_1 + 1) {
      if (((DAT_0065610a[param_1 * 8] !== 0) &&
          (DAT_006560f7[param_1 * 0x20] === bVar2)) &&
         ((((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x80) !== 0 ||
           (((DAT_0064b1bd[u8(bVar1) * 0x14] & 0x10) !== 0 &&
            ((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 8) !== 0)))) &&
          (iVar8 = FUN_005ae1b0(iVar6, iVar7, s16(DAT_006560f0, param_1 * 0x20),
                                      s16(DAT_006560f2, param_1 * 0x20)),
          iVar8 < local_8)))) {
        local_38 = s16(DAT_006560f0, param_1 * 0x20);
        local_40 = s16(DAT_006560f2, param_1 * 0x20);
        local_8 = iVar8;
      }
    }
    iVar8 = FUN_005b8d15(iVar6, iVar7);
    if (-1 < iVar8) {
      if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) {
        return;
      }
      FUN_005b6787(iVar5);
      return;
    }
  }
  local_c = 999;
  local_3c = iVar7;
  local_34 = iVar6;
  if (DAT_0063f660 < 999) {
    local_34 = s16(DAT_0064f340, local_14 * 0x58);
    local_3c = s16(DAT_0064f342, local_14 * 0x58);
    local_c = DAT_0063f660;
  }
  if (local_8 < local_c) {
    local_34 = local_38;
    local_3c = local_40;
    local_c = local_8;
  }
  if (local_c < 999) {
    if (((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) &&
       (s8(DAT_0064b1c3[u8(DAT_006560f6[iVar5 * 0x20]) * 0x14]) !== 0)) {
      let cVar3 = s8(DAT_0064b1c3[u8(DAT_006560f6[iVar5 * 0x20]) * 0x14]);
      let cVar4 = s8(DAT_006560fd[iVar5 * 0x20]);
      iVar8 = FUN_005b2a39(iVar5);
      iVar9 = FUN_005b2c3d(iVar5);
      uVar11 = DAT_0064bcc8;
      iVar10 = FUN_005ae1b0(iVar6, iVar7, local_34, local_3c);
      if (((cVar3 - (cVar4 + 1)) * iVar8 + iVar9) / uVar11 < iVar10) {
        return;
      }
    }
    if ((iVar6 === local_34) && (iVar7 === local_3c)) {
      FUN_005b6787(iVar5);
    }
    else {
      DAT_006560ff[iVar5 * 0x20] = 0xb;
      s16(DAT_00656102, iVar5 * 0x20) = local_34;
      s16(DAT_00656104, iVar5 * 0x20) = local_3c;
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

  if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x20) === 0) {
    if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 0xe) === 0) {
      FUN_00456f20(param_2, param_1, 0x14);
    }
    else {
      let uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(0, uVar1);
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar1);
      if ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0) {
        if (DAT_00654fa8 !== 0) { return; }
        if (s8(DAT_0064c6b5[param_1 * 0x594]) === 4) { return; }
        if ((DAT_00655b02 < 3) || (DAT_006d1da0 === param_2)) {
          if ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) === 0) {
            iVar2 = FUN_00410030(0 /*s_PRETEXT*/, 0, 0);
            if (iVar2 === 1) {
              FUN_00467825(param_1, param_2, 0x2000);
              w16(DAT_0064ca82, param_1 * 2 + param_2 * 0x594, DAT_00655af8);
            }
          }
          else {
            iVar2 = FUN_00410030(0 /*s_PRETEXTALLIED*/, 0, 0);
            if (iVar2 === 1) {
              FUN_00467750(param_1, param_2, 8);
              w16(DAT_0064ca82, param_1 * 2 + param_2 * 0x594, DAT_00655af8);
            }
          }
        }
        else {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          FUN_0046b14d(0xa4, 0, param_1, param_2, 0, 0, 0, 0, 0, 0);
        }
      }
      if (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) &&
         ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) === 0)) {
        if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 8) === 0) {
          if (s8(DAT_0064c6b5[param_1 * 0x594]) === 4) {
            DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] =
                 DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] | 0x10;
            FUN_00456f20(param_2, param_1, 10);
            if (DAT_00654fa8 === 0) {
              uVar1 = FUN_00410070(param_1);
              FUN_0040ff60(0, uVar1);
              FUN_00410030(0 /*s_INCIDENTTERROR*/, 0, 0);
            }
          }
          else {
            if (DAT_00654fa8 === 0) {
              FUN_00410030(0 /*s_INCIDENTWAR*/, 0, 0);
            }
            FUN_0045ac71(param_1, param_2, 0xffffffff);
          }
        }
        else {
          if ((DAT_0062dcf4 === 2) &&
             (u8(DAT_0064c6b0[param_1 * 0x594]) < u8(DAT_0064c6b0[param_2 * 0x594]))) {
            if (DAT_00654fa8 !== 0) { return; }
            FUN_0045705e(param_1, param_2);
            FUN_00458a3b(param_1, param_2);
            iVar2 = _rand();
            FUN_00456f20(param_2, param_1, iVar2 % 0xf + 5);
            FUN_00410030(0 /*s_WIMPOUT*/, 0, 0);
            return;
          }
          if (DAT_00654fa8 === 0) {
            FUN_00410030(0 /*s_INCIDENTALLIED*/, 0, 0);
          }
          FUN_0045ac71(param_1, param_2, 0xffffffff);
        }
      }
      if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) {
        if (s8(DAT_0064c6b5[param_1 * 0x594]) !== 6) {
          uVar3 = _rand();
          uVar4 = uVar3 >> 31;
          if (((uVar3 ^ uVar4) - uVar4 & 1 ^ uVar4) === uVar4) {
            return;
          }
          if (s8(DAT_0064c6b5[param_1 * 0x594]) !== 5) {
            return;
          }
        }
        if (((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 1) === 0)) {
          if (DAT_00654fa8 === 0) {
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

  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar2 = s8(bVar1);
  if (-1 < param_2) {
    DAT_006560f8[param_1 * 0x20] = DAT_006560f8[param_1 * 0x20] + DAT_0064bcc8;
  }
  if (s8(DAT_006560f6[param_1 * 0x20]) === 0x2f) {
    local_8 = (param_2 < 0 ? 1 : 0) + 2;
    if ((s16(DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
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
      iVar4 = s16(DAT_006560f0, param_1 * 0x20);
      iVar5 = s16(DAT_006560f2, param_1 * 0x20);
      iVar6 = FUN_0043d07a(iVar4, iVar5, iVar2, 0xffffffff, 0xffffffff);
      if (-1 < iVar6) {
        FUN_005b36df(param_1, s16(DAT_0064f340, iVar6 * 0x58),
                           s16(DAT_0064f342, iVar6 * 0x58), 1);
        FUN_005b6787(param_1);
        FUN_0047cea6(iVar4, iVar5);
        FUN_0047cea6(s16(DAT_0064f340, iVar6 * 0x58),
                           s16(DAT_0064f342, iVar6 * 0x58));
        if (2 < DAT_00655b02) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          FUN_0046b14d(0x72, 0xff, iVar4, iVar5, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x72, 0xff, s16(DAT_0064f340, iVar6 * 0x58),
                             s16(DAT_0064f342, iVar6 * 0x58), 0, 0, 0, 0, 0, 0);
        }
        FUN_0040ff60(1, 0 /*&DAT_0064f360 + iVar6 * 0x58*/);
      }
      if (-1 < param_2) {
        if ((DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0)) {
          if ((s16(DAT_006560f4, param_1 * 0x20) & 0x2000) === 0) {
            if (DAT_006d1da0 === iVar2) {
              FUN_00410030(0 /*s_BOND007*/, 0, 8);
            }
            else if (2 < DAT_00655b02) {
              FUN_00511880(0x26, 0, 2, 0, DAT_006560f6[param_1 * 0x20], 8);
            }
          }
          else if (DAT_006d1da0 === iVar2) {
            FUN_00410030(0, 0, 8);
          }
          else if (2 < DAT_00655b02) {
            FUN_00511880(0x27, 0, 2, 0, DAT_006560f6[param_1 * 0x20], 8);
          }
        }
        w16(DAT_006560f4, param_1 * 0x20,
             s16(DAT_006560f4, param_1 * 0x20) | 0x2000);
      }
      return 0;
    }
    if (((DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0)) && (-1 < param_2)) {
      if (DAT_006d1da0 === iVar2) {
        FUN_00410030(0 /*s_BONDGLORY*/, 0, 8);
      }
      else if (DAT_00655b02 === 3) {
        FUN_00511880(0x28, 0, 0, 0, DAT_006560f6[param_1 * 0x20], 8);
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

  bVar1 = DAT_006560f7[param_1 * 0x20];
  bVar2 = DAT_006560f6[param_1 * 0x20];
  iVar3 = FUN_004c5fae(param_1, 0xffffffff, param_2);
  if (iVar3 === 0) {
    uVar4 = 0;
  }
  else {
    if ((DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0)) {
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

  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    bVar2 = false;
  }
  else if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0xe) === 0) {
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
  for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
    if ((((DAT_0064f394[local_c * 0x16] !== 0) &&
         (s8(DAT_0064f348[local_c * 0x58]) === param_1)) &&
        (iVar1 = FUN_0043d20a(local_c, 1), iVar1 !== 0)) &&
       (iVar1 = FUN_005ae31d(s16(DAT_0064f340, local_c * 0x58),
                                   s16(DAT_0064f342, local_c * 0x58), param_2, param_3),
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
  let bVar1 = DAT_0064f348[param_1 * 0x58];
  let iVar4 = s8(bVar1);
  let sVar2 = s16(DAT_0064f340, param_1 * 0x58);
  let sVar3 = s16(DAT_0064f342, param_1 * 0x58);
  let local_20;
  let local_8;
  let iVar6, iVar7;

  if (-1 < param_2) {
    FUN_005b9ec6();
    for (local_8 = 0; local_8 < 0x15; local_8 = local_8 + 1) {
      let uVar5 = FUN_005ae052(s8(DAT_00628370[local_8]) + sVar2);
      iVar6 = s8(DAT_006283a0[local_8]) + sVar3;
      iVar7 = FUN_004087c0(uVar5, iVar6);
      if (iVar7 !== 0) {
        FUN_005b976d(uVar5, iVar6, 1 << (u8(param_2) & 0x1f), 1, 1);
        FUN_005b8b1a(uVar5, iVar6, param_2);
      }
    }
    FUN_005b9f1c();
    // UI notifications omitted for brevity — they are no-ops in JS context
    local_20 = DAT_00655b16;
    while (local_20 = local_20 + -1, -1 < local_20) {
      if (((DAT_0065610a[local_20 * 8] !== 0) &&
          (s8(DAT_006560f7[local_20 * 0x20]) === iVar4)) &&
         ((iVar6 = FUN_005ae31d(s16(DAT_006560f0, local_20 * 0x20),
                                      s16(DAT_006560f2, local_20 * 0x20), sVar2,
                                      sVar3), iVar6 < 2 &&
          ((iVar6 === 0 ||
           (iVar7 = FUN_005b8ca6(s16(DAT_006560f0, local_20 * 0x20),
                                       s16(DAT_006560f2, local_20 * 0x20)), iVar7 < 0)
           ))))) {
        DAT_0064c778[iVar4 * 0x594 + u8(DAT_006560f6[local_20 * 0x20])] =
             DAT_0064c778[iVar4 * 0x594 + u8(DAT_006560f6[local_20 * 0x20])] + -1;
        DAT_0064c778[param_2 * 0x594 + u8(DAT_006560f6[local_20 * 0x20])] =
             DAT_0064c778[param_2 * 0x594 + u8(DAT_006560f6[local_20 * 0x20])] + 1;
        DAT_006560f7[local_20 * 0x20] = param_2;
        DAT_00656100[local_20 * 0x20] = param_1;
        DAT_006560f8[local_20 * 0x20] = 0;
        if ((s8(DAT_006560ff[local_20 * 0x20]) !== 1) &&
           (s8(DAT_006560ff[local_20 * 0x20]) !== 2)) {
          DAT_006560ff[local_20 * 0x20] = 0xff;
        }
        FUN_005b99e8(s16(DAT_006560f0, local_20 * 0x20),
                           s16(DAT_006560f2, local_20 * 0x20), param_2, 1);
        if (iVar6 !== 0) {
          FUN_0047cea6(s16(DAT_006560f0, local_20 * 0x20),
                             s16(DAT_006560f2, local_20 * 0x20));
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
  DAT_0062804c = 0;
  let local_3b0 = s8(DAT_006560f7[param_1 * 0x20]);
  local_80 = s8(DAT_0064f348[param_2 * 0x58]);
  local_398 = u8(DAT_006560f6[param_1 * 0x20]);
  FUN_00467825(local_3b0, local_80, 1);
  local_38c = (DAT_006560f6[param_1 * 0x20] === 0x2f) ? 1 : 0;

  if (((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) &&
     (DAT_006d1da0 === local_3b0)) {
    let uVar2 = FUN_00410070(local_3b0);
    FUN_0040ff60(0, uVar2);
    FUN_004271e8(1, DAT_0064b1b8[local_398]);
    FUN_0040ff60(2, 0 /*&DAT_0064f360 + param_2 * 0x58*/);
    FUN_0040ffa0(0 /*s_SPYMENU*/, 1);
    FUN_0059ec88(0, 0, 0);
    // CPropertySheet::EnableStackedTabs — UI stub
    iVar3 = FUN_004a2379(0 /*&DAT_006558e8*/, 0 /*s_SPYOPTIONS*/);
    if (iVar3 !== 0) { FUN_004c9504(); FUN_004c951a(); return; }
    FUN_004a23fc(1);
    if (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + local_80 * 4] & 0x80) === 0) &&
       (iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 === 0)) {
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
    if (((DAT_0064f344[param_2 * 0x58] & 8) === 0) || (local_38c !== 0)) {
      FUN_0059edf0(0, 2, 0);
    }
    FUN_004a23fc(1);
    FUN_0059edf0(0, 3, 0);
    FUN_004a23fc(1);
    if ((local_38c !== 0) && (s8(DAT_0064f349[param_2 * 0x58]) > 1)) {
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
    if (((2 < DAT_00655b02) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) &&
       ((iVar3 = FUN_0043d20a(param_2, 1), iVar3 !== 0 &&
        ((DAT_0064c6c3[local_80 * 4 + local_3b0 * 0x594] & 1) === 0)))) {
      FUN_0059edf0(FUN_00428b0c(0), 7, 0);
    }
    FUN_004a2020();
    local_3ac = FUN_0040bc80(0);
    if (local_3ac < 0) { FUN_004c9504(); FUN_004c951a(); return; }
  }
  else {
    local_3ac = 2;
    if ((((DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0x10) !== 0) &&
        (iVar3 = _rand(), iVar3 % 3 === 0)) && (local_38c !== 0)) {
      local_3ac = 4;
    }
    if ((DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 4) !== 0) {
      local_3ac = 2;
    }
    if ((((3 < DAT_00655b08) ||
         ((DAT_00655b08 === 3 && (5 < s16(DAT_0064c6bc, local_80 * 0x594))))) &&
        (local_3ac === 2)) &&
       (((DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0x2010) !== 0 &&
        (s8(DAT_0064c6b5[local_80 * 0x594]) !== 6)))) {
      local_3ac = 6;
    }
    if ((DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 8) !== 0) {
      local_3ac = 2;
    }
    if (((((DAT_0064f344[param_2 * 0x58] & 8) !== 0) && (local_38c === 0)) && (local_3ac === 2))) {
      local_3ac = 3;
      if ((DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0xe) !== 0) {
        local_3ac = 0;
      }
    }
  }

  // LAB_004c72a8: switch dispatch with goto loop
  let switchLoop = true;
  while (switchLoop) {
    switchLoop = false;
    DAT_0062dcf4 = local_3ac;
    switch (local_3ac) {
    case 0:
      if ((DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0x80) === 0) {
        DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] =
             DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] | 0x80;
        if ((DAT_006d1da0 === local_3b0) || (DAT_006d1da0 === local_80)) {
          FUN_0046e020(0x44, 0, 0, 0);
        }
        if ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) === 0) {
          FUN_005b6042(param_1, 1);
        }
        else {
          FUN_0043060b(local_3b0, local_80);
          if (local_38c === 0) {
            FUN_005b4391(param_1, 1);
          }
          else {
            DAT_006560f8[param_1 * 0x20] = DAT_006560f8[param_1 * 0x20] + 1;
          }
        }
        if ((DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) {
          FUN_0040ff60(0, FUN_00493c7d(local_3b0));
          if ((DAT_00655b02 < 3) || (DAT_006d1da0 === local_80)) {
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
      if ((DAT_006d1da0 === local_3b0) || (DAT_006d1da0 === local_80)) {
        FUN_0046e020(0x44, 1, 0, 0);
      }
      if ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) === 0) {
        FUN_005b6042(param_1, 1);
      }
      else {
        FUN_handle_city_disorder_00509590(param_2);
        if (local_38c === 0) {
          FUN_004c5fae(param_1, 0, 0xffffffff);
        }
        else if ((DAT_0064f346[param_2 * 0x58] & 0x40) === 0) {
          DAT_006560f8[param_1 * 0x20] = DAT_006560f8[param_1 * 0x20] + 1;
        }
        DAT_0064f344[param_2 * 0x58] =
             DAT_0064f344[param_2 * 0x58] | 0x400000;
      }
      if ((DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) {
        FUN_0040ff60(0, FUN_00493c7d(local_3b0));
        FUN_0040ff60(1, 0 /*&DAT_0064f360 + param_2 * 0x58*/);
        if ((DAT_00655b02 < 3) || (DAT_006d1da0 === local_80)) {
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
        if ((((DAT_0062768e[local_90 * 0x10] !== -2) || (DAT_0062768f[local_90 * 0x10] !== -2)) &&
            (iVar3 = FUN_004bd9f0(local_3b0, local_90), iVar3 === 0)) &&
           (iVar3 = FUN_004bd9f0(local_80, local_90), iVar3 !== 0)) {
          local_20 = local_90;
          iVar3 = FUN_00598ceb();
          if ((((iVar3 === 0) ||
               ((DAT_00655b08 < 2 && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) === 0)))) ||
              (DAT_0064c5a6 === local_90)) ||
             (((DAT_0064c5ae === local_90 || (DAT_0064c5b6 === local_90)) || (local_90 === 0x20))))
          break;
        }
      }
      if (-1 < local_20) {
        local_88 = 0;
        if ((DAT_0064f344[param_2 * 0x58] & 8) === 0) {
          if (((DAT_00654fa8 === 0) && (local_38c !== 0)) &&
             ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
            local_3ac = FUN_00426fb0(0 /*s_STEALSPECIFIC*/, 1, 0, 8);
            if (local_3ac < 0) break;
            if (local_3ac === 1) {
              iVar3 = FUN_004c64aa(param_1, local_80);
              if (iVar3 === 0) {
                if (DAT_006d1da0 === local_3b0) {
                  FUN_0046e020(0x44, 1, 0, 0);
                }
                FUN_0057a27a(local_3b0, local_80);
                FUN_004c5fae(param_1, 1, local_80);
                DAT_0064f344[param_2 * 0x58] = DAT_0064f344[param_2 * 0x58] | 8;
              }
              break;
            }
          }
        }
        else {
          if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
            FUN_0040ff60(0, FUN_00493c7d(local_80));
            FUN_0040ff60(1, 0 /*&DAT_0064f360 + param_2 * 0x58*/);
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
        param_1 = FUN_005b2e69(s16(DAT_0064f340, param_2 * 0x58),
                                     s16(DAT_0064f342, param_2 * 0x58));
        // LAB_004c7ad5: check for counter-spy units
        while (param_1 >= 0) {
          if (s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 6) {
            let local_39c = 0x14;
            if ((DAT_006560f6[param_1 * 0x20] === 0x2f) &&
               (local_39c = 0x28, (s16(DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0)) {
              local_39c = 0x3c;
            }
            iVar3 = _rand();
            if (iVar3 % 100 < local_39c) {
              local_14 = 1;
              local_390 = u8(DAT_006560f6[param_1 * 0x20]);
              break;
            }
          }
          param_1 = FUN_005b2c82(param_1);
        }
        // LAB_004c7b9b: steal result
        iVar3 = local_84;
        if (local_14 === 0) {
          FUN_0040ff60(0, FUN_00493c7d(local_3b0));
          FUN_004271e8(1, DAT_00627684[local_20]);
          if ((((DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) &&
              (2 < DAT_00655b02)) && (DAT_006d1da0 !== local_80)) {
            FUN_00511880(0x57, 0, 2, 0, 0, 0);
          }
          if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
            FUN_0046e020(0x44, 1, 0, 0);
            FUN_00410030(0 /*s_STEAL*/, 0, 8);
          }
          FUN_004bf05b(local_3b0, local_20, local_80, 0, 0);
          DAT_0064f344[param_2 * 0x58] = DAT_0064f344[param_2 * 0x58] | 8;
          FUN_004c5fae(iVar3, local_88, local_80);
        }
        else {
          FUN_005b6787(local_84);
          FUN_0047cea6(s16(DAT_0064f340, param_2 * 0x58),
                             s16(DAT_0064f342, param_2 * 0x58));
          FUN_004271e8(1, DAT_0064b1b8[local_390]);
          FUN_0040ff60(2, FUN_00410070(local_3b0));
          if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
            FUN_0046e020(0x44, 1, 0, 0);
            FUN_00410030(0 /*s_CURSES*/, 0, 8);
          }
          if ((((DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) &&
              (2 < DAT_00655b02)) && (DAT_006d1da0 !== local_80)) {
            FUN_00511880(0x58, 0, 3, 0, 0, 0);
          }
        }
        break;
      }
      if ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0) {
        DAT_006560f8[param_1 * 0x20] = DAT_006560f8[param_1 * 0x20] + DAT_0064bcc8;
        if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
          FUN_00410030(0 /*s_NOSTEAL*/, 0, 8);
        }
        break;
      }
      if ((DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0xe) === 0) {
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
      if (s8(DAT_0064f379[param_2 * 0x58]) < 0) {
        FUN_004af122(0, DAT_0064c488[s8(DAT_0064f379[param_2 * 0x58]) * -1]);
      }
      else {
        FUN_004af122(0, DAT_0064b1b8[s8(DAT_0064f379[param_2 * 0x58])]);
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
      if ((((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) &&
          (local_38c !== 0)) && (0 < local_74)) {
        local_3ac = FUN_00426fb0(0 /*s_SABOTAGESPECIFIC*/, 1, 0, 8);
        if (local_3ac < 0) { FUN_004c9504(); FUN_004c951a(); return; }
        if (local_3ac === 1) {
          FUN_0040ffa0(0 /*s_SABOTAGE*/, 1);
          FUN_0059ec88(0, 0, 0);
          // CPropertySheet — UI
          for (local_3a8 = 1; local_3a8 < 0x27; local_3a8 = local_3a8 + 1) {
            if ((local_3a8 !== 1) && (iVar3 = FUN_0043d20a(param_2, local_3a8), iVar3 !== 0)) {
              FUN_0059edf0(FUN_00428b0c(DAT_0064c488[local_3a8]), local_3a8, 0);
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
      if ((local_88 === 0) && (s16(DAT_0064f35c, param_2 * 0x58) !== 0)) {
        local_1c = 2;
        if (local_38c !== 0) { local_1c = 3; }
        if ((s16(DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
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
      if (((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0) ||
         ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) {
        if ((DAT_006d1da0 === local_3b0) || (DAT_006d1da0 === local_80)) {
          iVar3 = FUN_004bd9f0(local_3b0, 0x23);
          if ((iVar3 === 0) || (DAT_006d1da0 !== local_3b0)) {
            FUN_0046e020(0x44, 1, 0, 0);
          }
          else {
            FUN_0046e020(0x27, 1, 0, 0);
          }
        }
        if (local_74 === 0) {
          s16(DAT_0064f35c, param_2 * 0x58) = 0;
          FUN_citywin_C679(param_2);
          FUN_0040ff60(0, 0 /*local_70*/);
          if (((DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) &&
              ((2 < DAT_00655b02 && (DAT_006d1da0 !== local_80)))) {
            FUN_00511880(0x5a, 0, 1, 0, local_3b0, 0);
          }
          if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
            FUN_00421ea0(0 /*s_SABOTAGETWO*/);
          }
        }
        else {
          FUN_0043d289(param_2, local_74, 0);
          FUN_0047cea6(s16(DAT_0064f340, param_2 * 0x58),
                             s16(DAT_0064f342, param_2 * 0x58));
          FUN_004271e8(0, DAT_0064c488[local_74]);
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          if ((((DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) &&
              (2 < DAT_00655b02)) && (DAT_006d1da0 !== local_80)) {
            FUN_0046b14d(0x72, 0, s16(DAT_0064f340, param_2 * 0x58),
                               s16(DAT_0064f342, param_2 * 0x58), 0, 0, 0, 0, 0, 0);
            FUN_0046b14d(0x8a, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            FUN_00511880(0x59, 0, 1, 0, local_74, local_3b0);
          }
          if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
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
        if (s8(DAT_0064f349[param_2 * 0x58]) < 2) {
          s16(DAT_0064f35a, param_2 * 0x58) = 0;
        }
        else {
          DAT_0064f349[param_2 * 0x58] = DAT_0064f349[param_2 * 0x58] + -1;
        }
        FUN_0043cc00(param_2, local_3b0);
        FUN_0047cea6(s16(DAT_0064f340, param_2 * 0x58),
                           s16(DAT_0064f342, param_2 * 0x58));
        FUN_0040ff60(0, 0 /*&DAT_0064f360 + param_2 * 0x58*/);
        FUN_0040ff60(1, FUN_00410070(local_3b0));
        if ((((DAT_00654fa8 === 0) && ((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0)) &&
            (2 < DAT_00655b02)) && (DAT_006d1da0 !== local_80)) {
          FUN_00511880(0x5b, 0, 2, 0, 0, 0);
        }
        if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
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
      if (((((DAT_00654fa8 === 0) &&
            (iVar3 = FUN_00410030(0 /*s_MAJORINCIDENT*/, 0, 8),
            iVar3 === 1)) && (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0)) &&
          ((iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0 &&
           (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0)))) &&
         ((iVar3 = FUN_0043d20a(param_2, 1), iVar3 === 0 ||
          (iVar3 = FUN_004c64aa(param_1, local_80), iVar3 === 0)))) {
        FUN_0057f9e3(local_3b0, s16(DAT_0064f340, param_2 * 0x58),
                           s16(DAT_0064f342, param_2 * 0x58), 0);
        FUN_0040ff60(0, 0 /*&DAT_0064f360 + param_2 * 0x58*/);
        FUN_0040ff60(1, FUN_00410070(local_3b0));
        FUN_0040ff60(2, FUN_00493c7d(local_3b0));
        FUN_0040bbb0();
        FUN_0040bbe0(0 /*s_PLANTEDNUKE*/);
        local_3f0[0xf] = 0;
        if (s8(DAT_0064c6b5[local_3b0 * 0x594]) !== 4) {
          local_1c = 2;
          if ((s16(DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
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
        if (((1 << (u8(local_80) & 0x1f) & DAT_00655b0b) !== 0) && (2 < DAT_00655b02)) {
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
      if (s8(DAT_0064c6b5[local_80 * 0x594]) === 6) {
        if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
          FUN_00410030(0 /*s_NOREVOLT*/, 0, 0);
        }
        break;
      }
      local_7c = FUN_004c65d2(local_80, s16(DAT_006560f0, param_1 * 0x20),
                                    s16(DAT_006560f2, param_1 * 0x20));
      if (local_7c < 2) {
        if ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0) break;
        local_3ac = 2;
        switchLoop = true;
        continue;
      }
      if ((s8(DAT_0064c6b5[local_80 * 0x594]) === 3) && (9 < local_7c)) {
        local_7c = 10;
      }
      iVar3 = FUN_0043d20a(param_2, 7);
      if (iVar3 !== 0) {
        local_7c = (local_7c / 2) | 0;
      }
      local_388 = s8(DAT_0064f349[param_2 * 0x58]) *
                  (((DAT_0064c6a2[local_80 * 0x165] + 1000) / (local_7c + 3)) | 0);
      if (local_388 < 0) {
        local_388 = 30000;
      }
      if ((DAT_0064f344[param_2 * 0x58] & 1) !== 0) {
        local_388 = (local_388 / 2) | 0;
      }
      iVar3 = FUN_005b8d62(s16(DAT_0064f340, param_2 * 0x58),
                                 s16(DAT_0064f342, param_2 * 0x58));
      if (iVar3 < 0) {
        local_388 = (local_388 / 2) | 0;
      }
      if (s8(DAT_0064f34a[param_2 * 0x58]) === local_3b0) {
        local_388 = (local_388 / 2) | 0;
      }
      if (local_38c !== 0) {
        if ((s16(DAT_006560f4, param_1 * 0x20) & 0x2000) === 0) {
          local_388 = local_388 - ((local_388 / 6) | 0);
        }
        else {
          local_388 = local_388 - ((local_388 / 3) | 0);
        }
      }
      let bVar6 = (DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] & 0xe) === 0;
      local_18 = bVar6 ? 0 : 1;
      if ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0) {
        // LAB_004c8f6f: incite revolt execution
        if ((DAT_00654fa8 === 0) && ((1 << (u8(local_3b0) & 0x1f) & DAT_00655b0b) !== 0)) {
          FUN_0040ff60(0, 0 /*&DAT_0064f360 + param_2 * 0x58*/);
          FUN_00421da0(0, local_388);
          FUN_0043c9d0(0 /*s_DISSIDENTS*/);
          if (local_388 <= DAT_0064c6a2[local_3b0 * 0x165]) {
            iVar3 = FUN_004a2379(0, 0 /*s_DISSIDENTOPTIONS*/);
            if (iVar3 !== 0) break;
            FUN_004a23fc(1);
            FUN_0059edf0(0, 0, 0);
            FUN_004a23fc(1);
            if (local_18 === 0) { FUN_0059edf0(0, 1, 0); }
            FUN_004a23fc(1);
            if (local_18 !== 0) { FUN_0059edf0(0, 1, 0); }
            FUN_004a23fc(1);
            if (((local_18 !== 0) && (local_388 * 2 <= DAT_0064c6a2[local_3b0 * 0x165]))
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
          DAT_0064c6a2[local_3b0 * 0x165] =
               DAT_0064c6a2[local_3b0 * 0x165] - local_388 * local_3ac;
          w16(DAT_0064c6bc, local_3b0 * 0x594,
               s16(DAT_0064c6bc, local_3b0 * 0x594) + 2);
          if (DAT_006d1da0 === local_3b0) {
            FUN_00569363(1);
          }
          FUN_004c5fae(param_1, 0, 0);
          if (local_3ac === 1) {
            handle_incident_terror(local_3b0, local_80);
          }
          if (local_3ac === 2) {
            DAT_0064c6c0[local_80 * 0x594 + local_3b0 * 4] =
                 DAT_0064c6c0[local_80 * 0x594 + local_3b0 * 4] | 0x10;
            DAT_0064f34a[param_2 * 0x58] = local_3b0;
          }
          if ((DAT_006d1da0 === local_3b0) || (DAT_006d1da0 === local_80)) {
            FUN_0046e020(0x44, 1, 0, 0);
          }
          FUN_004c66ba(param_2, local_3b0, local_3ac);
        }
        break;
      }
      local_394 = local_388 * 2;
      if (((local_394 <= DAT_0064c6a2[local_3b0 * 0x165]) && (local_18 === 0)) &&
         (-1 < local_394)) {
        // goto LAB_004c8f6f — same as above human player path
        local_3ac = 1; // AI always incites
        if (0 < local_3ac) {
          DAT_0064c6a2[local_3b0 * 0x165] =
               DAT_0064c6a2[local_3b0 * 0x165] - local_388 * local_3ac;
          w16(DAT_0064c6bc, local_3b0 * 0x594,
               s16(DAT_0064c6bc, local_3b0 * 0x594) + 2);
          if (DAT_006d1da0 === local_3b0) {
            FUN_00569363(1);
          }
          FUN_004c5fae(param_1, 0, 0);
          if (local_3ac === 1) {
            handle_incident_terror(local_3b0, local_80);
          }
          if ((DAT_006d1da0 === local_3b0) || (DAT_006d1da0 === local_80)) {
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
      if ((DAT_006d1da0 === local_3b0) || (DAT_006d1da0 === local_80)) {
        FUN_0046e020(0x44, 0, 0, 0);
      }
      local_3f0[9] = 5; local_3f0[10] = 4; local_3f0[0xb] = 3;
      local_3f0[0xc] = 2; local_3f0[0xd] = 1; local_3f0[0xe] = 0;
      local_3f0[0] = 0; local_3f0[1] = 0; local_3f0[2] = 0;
      local_3f0[3] = 0; local_3f0[4] = 1; local_3f0[5] = 2;
      local_3f0[6] = 2; local_3f0[7] = 3; local_3f0[8] = 4;
      if (local_38c === 0) {
        DAT_006560fe[param_1 * 0x20] = 5;
      }
      else {
        DAT_006560fe[param_1 * 0x20] = 10;
      }
      DAT_006560fe[param_1 * 0x20] =
           local_3f0[DAT_00655b08 + 9] + DAT_006560fe[param_1 * 0x20];
      if ((s16(DAT_006560f4, param_1 * 0x20) & 0x2000) !== 0) {
        DAT_006560fe[param_1 * 0x20] = DAT_006560fe[param_1 * 0x20] + 2;
      }
      DAT_006560fe[param_1 * 0x20] =
           DAT_006560fe[param_1 * 0x20] -
           local_3f0[u8(DAT_0064c6e0[local_80 * 0x594 + local_3b0])];
      let cVar1 = DAT_006560fe[param_1 * 0x20];
      iVar3 = _rand();
      DAT_006560fe[param_1 * 0x20] = cVar1 + (iVar3 % 6);
      DAT_006560fd[param_1 * 0x20] = local_80;
      w16(DAT_006560f4, param_1 * 0x20, s16(DAT_006560f4, param_1 * 0x20) | 2);
      DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] =
           DAT_0064c6c0[local_80 * 4 + local_3b0 * 0x594] | 0x1000000;
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
// Source: block_004C0000.c line 2895
// ═══════════════════════════════════════════════════════════════════

export function FUN_004c951a() {
  // SEH handler cleanup — no-op in JS
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

  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar2 = s8(bVar1);
  iVar3 = FUN_005b50ad(param_1, 2);
  if (1 < iVar3) { return; }
  if (s8(DAT_0064c6b5[iVar2 * 0x594]) === 6) {
    if (DAT_00654fa8 !== 0) { return; }
    if ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) === 0) { return; }
    if ((2 < DAT_00655b02) && (DAT_006d1da0 !== param_2)) {
      FUN_00511880(0x21, 0, 0, 0, 0, 0);
      return;
    }
    FUN_00410030(0 /*s_INCORRUPTIBLE*/, 0, 0);
    return;
  }
  if (((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) === 0) &&
     (iVar3 = FUN_004bd9f0(param_2, DAT_0064b563), iVar3 === 0)) {
    return;
  }
  local_c = FUN_004c65d2(iVar2, s16(DAT_006560f0, param_1 * 0x20),
                               s16(DAT_006560f2, param_1 * 0x20));
  if ((s8(DAT_0064c6b5[param_2 * 0x594]) === 3) && (9 < local_c)) {
    local_c = 10;
  }
  local_18 = s8(DAT_0064b1c8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) *
             (((DAT_0064c6a2[iVar2 * 0x165] + 0x2ee) / (local_c + 2)) | 0);
  if (local_18 < 0) {
    local_18 = 30000;
  }
  if (s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) !== 5) {
    local_18 = (local_18 / 2) | 0;
  }
  if ((s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 7) &&
     ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) === 0)) {
    return;
  }
  uVar4 = FUN_00410070(iVar2);
  FUN_0040ff60(0, uVar4);
  FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[param_1 * 0x20])]);
  if ((DAT_00654fa8 === 0) && ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0)) {
    FUN_00421da0(0, local_18);
    FUN_0040bbb0();
    FUN_0040bbe0(0 /*s_DESERT*/);
    if (DAT_006d1da0 === param_2) {
      if (local_18 <= DAT_0064c6a2[param_2 * 0x165]) {
        FUN_0040bbe0(0);
      }
      iVar6 = FUN_004442e0(0 /*&DAT_00679640*/, param_1);
    }
    else {
      if (DAT_00655b02 < 3) {
        // goto LAB_004c99a0 — fall through
      } else {
        if (DAT_0064c6a2[param_2 * 0x165] < local_18) {
          FUN_00511880(0x23, 0, 2, 1, DAT_006d1da0, param_1);
        }
        else {
          FUN_00511880(0x24, 0, 2, 1, DAT_006d1da0, param_1);
        }
        DAT_006a1870 = -1;
        iVar3 = FUN_00421bb0();
        while (true) {
          iVar5 = FUN_00421bb0();
          iVar6 = DAT_006a1870;
          if (!(iVar5 - iVar3 < DAT_006ad8b8 * 0x3c && (DAT_006a1870 === -1))) break;
          FUN_0047e94e(1, 0);
        }
        if (iVar6 !== 1) { return; }
      }
    }
  }
  else if (DAT_0064c6a2[param_2 * 0x165] / 2 < local_18) {
    return;
  }

  // LAB_004c99a0
  if ((DAT_00655b02 < 3) || (DAT_006ad2f7 !== 0)) {
    DAT_0064c6a2[param_2 * 0x165] = DAT_0064c6a2[param_2 * 0x165] - local_18;
    DAT_0064c778[iVar2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20])] =
         DAT_0064c778[iVar2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20])] + -1;
    DAT_0064c778[param_2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20])] =
         DAT_0064c778[param_2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20])] + 1;
    w16(DAT_0064c6bc, param_2 * 0x594, s16(DAT_0064c6bc, param_2 * 0x594) + 1);
    DAT_006560f7[param_1 * 0x20] = param_2;
    DAT_00656100[param_1 * 0x20] = 0xff;
    DAT_006560f8[param_1 * 0x20] = 0;
    DAT_006560ff[param_1 * 0x20] = 0xff;
    iVar3 = FUN_0043d07a(s16(DAT_006560f0, param_1 * 0x20),
                               s16(DAT_006560f2, param_1 * 0x20), 0xffffffff, 0xffffffff,
                               0xffffffff);
    if ((-1 < iVar3) && (s8(DAT_0064f348[iVar3 * 0x58]) === param_2)) {
      local_10 = iVar3;
      DAT_00656100[param_1 * 0x20] = local_10;
    }
    FUN_005b490e(param_1, iVar2);
    FUN_005b99e8(s16(DAT_006560f0, param_1 * 0x20),
                       s16(DAT_006560f2, param_1 * 0x20), param_2, 1);
    FUN_004b0b53(0xff, 2, 0, 0, 1);
  }
  else {
    FUN_0046b14d(99, 0, param_1, param_2, local_18, 0, 0, 0, 0, 0);
    iVar3 = FUN_00421bb0();
    while ((s8(DAT_006560f7[param_1 * 0x20]) !== param_2 &&
           (iVar6 = FUN_00421bb0(), iVar6 - iVar3 < 0xe10))) {
      FUN_0047e94e(1, 1);
    }
    if (s8(DAT_006560f7[param_1 * 0x20]) !== param_2) {
      debug_log(0 /*s_Pick_Up_Unit...*/);
      FUN_00410030(0 /*s_SERVERCONNECTTIME*/, 0, 0);
      DAT_00628044 = 0;
    }
  }
  if ((DAT_006d1da0 === iVar2) || (DAT_006d1da0 === param_2)) {
    FUN_0046e020(0x44, 1, 0, 0);
  }
  if ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0) {
    if (DAT_006d1da0 === param_2) {
      FUN_00569363(1);
    }
    else if (2 < DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x7a, 0, 0x44, 1, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x78, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  if ((DAT_00654fa8 === 0) && ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0)) {
    uVar4 = FUN_00493c7d(param_2);
    FUN_0040ff60(2, uVar4);
    if (DAT_006d1da0 === iVar2) {
      FUN_004105f8(s16(DAT_006560f0, param_1 * 0x20),
                         s16(DAT_006560f2, param_1 * 0x20), iVar2);
      FUN_004442e0(0 /*s_DESERTED*/, param_1);
    }
    else if ((2 < DAT_00655b02) && (DAT_006d1da0 !== iVar2)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x71, 0, s16(DAT_006560f0, param_1 * 0x20),
                         s16(DAT_006560f2, param_1 * 0x20), iVar2, 0, 0, 0, 0, 0);
      FUN_00511880(0x22, 0, 3, 0, param_1, 0);
    }
  }
  FUN_0047cea6(s16(DAT_006560f0, param_1 * 0x20),
                     s16(DAT_006560f2, param_1 * 0x20));
  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x72, 0xff, s16(DAT_006560f0, param_1 * 0x20),
                       s16(DAT_006560f2, param_1 * 0x20), 0, 0, 0, 0, 0, 0);
  }
  if (((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0) && (DAT_006d1da0 === iVar2)) {
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
    if ((((1 << (u8(param_3) & 0x1f) & DAT_00655b0b) === 0) ||
        (s8(DAT_006560f6[param_1 * 0x20]) !== 0x2f)) || ((DAT_00655ae8 & 0x10) === 0)) {
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
        if ((DAT_006d1da0 === s8(DAT_006560f7[param_2 * 0x20])) || (DAT_006d1da0 === param_3)) {
          FUN_0046e020(0x43, 1, 0, 0);
        }
        FUN_0040ff60(0, FUN_00410070(s8(DAT_006560f7[param_2 * 0x20])));
        FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[param_2 * 0x20])]);
        FUN_0040ff60(2, FUN_00410070(param_3));
        FUN_004271e8(3, DAT_0064b1b8[u8(DAT_006560f6[param_1 * 0x20])]);
        FUN_004442e0(0 /*s_BLEWITUP*/, param_1);
        if ((2 < DAT_00655b02) &&
           ((DAT_00655b0b & (1 << (DAT_006560f7[param_2 * 0x20] & 0x1f))) !== 0)) {
          FUN_00511880(0x25, 0, 4, 0, param_1, 0);
        }
        let iX = s16(DAT_006560f0, param_2 * 0x20);
        let iY = s16(DAT_006560f2, param_2 * 0x20);
        FUN_0057ed3f(iX, iY, 0);
        if (2 < DAT_00655b02) {
          FUN_0046b14d(0x7c, 0xff, iX, iY, 0, 0, 0, 0, 0, 0);
        }
        let iVar4 = FUN_005b29d7(param_2);
        DAT_006560fa[param_2 * 0x20] = ((iVar4 / 2) | 0) + DAT_006560fa[param_2 * 0x20];
        FUN_0047cea6(iX, iY);
        if (2 < DAT_00655b02) {
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

  // C: *(uint *)(&DAT_0064f344 + param_2 * 0x58) |= 0x10000
  // In the C this is a 32-bit OR on the city flags dword. 0x10000 is the "airlifted" bit.
  DAT_0064f344[param_2 * 0x58] = DAT_0064f344[param_2 * 0x58] | 0x10000;
  DAT_0064f344[param_3 * 0x58] = DAT_0064f344[param_3 * 0x58] | 0x10000;
  FUN_005b6787(param_1);
  DAT_006560ff[param_1 * 0x20] = 0xff;
  FUN_005b36df(param_1, s16(DAT_0064f340, param_3 * 0x58),
                     s16(DAT_0064f342, param_3 * 0x58), 1);
  FUN_citywin_C494(param_1, 0xffffffff, 0xffffffff);
  if (param_4 !== 0) {
    for (local_8 = 0; local_8 < param_4; local_8 = local_8 + 1) {
      iVar1 = _rand();
      if (iVar1 % 6 === 0) {
        if ((s8(DAT_006560f7[param_1 * 0x20]) === DAT_006d1da0) && (DAT_00654fa8 === 0)) {
          FUN_0040ff60(0, FUN_00493c7d(param_5));
          FUN_004442a0(0 /*s_SHOTDOWN*/, 0x1b, (DAT_00633584 === 0) ? 0 : 8);
        }
        FUN_005b4391(param_1, 1);
        return;
      }
    }
  }
  if ((s8(DAT_006560f7[param_1 * 0x20]) === DAT_006d1da0) && (DAT_00654fa8 === 0)) {
    FUN_0040ff60(0, 0 /*&DAT_0064f360 + param_2 * 0x58*/);
    FUN_0040ff60(1, 0 /*&DAT_0064f360 + param_3 * 0x58*/);
    FUN_004442e0(0 /*s_AIRLIFT*/, param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ca39e — paradrop_unit
// Source: block_004C0000.c line 3221
// Very large function (2572 bytes). Stubbed with key logic.
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ca39e(param_1, param_2, param_3) {
  let bVar1 = DAT_006560f7[param_1 * 0x20];
  let uVar4 = s8(bVar1);
  let sVar2 = s16(DAT_006560f0, param_1 * 0x20);
  let sVar3 = s16(DAT_006560f2, param_1 * 0x20);
  FUN_004c4210(0, DAT_0064bcdb);
  let iVar5 = FUN_005b89e4(param_2, param_3);
  if (iVar5 === 0) {
    let local_20 = FUN_005b8d62(param_2, param_3);
    if (local_20 < 0 || local_20 === uVar4) {
      iVar5 = FUN_005ae1b0(s16(DAT_006560f0, param_1 * 0x20),
                                 s16(DAT_006560f2, param_1 * 0x20), param_2, param_3);
      if (DAT_0064bcdb < iVar5) {
        if ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0) {
          FUN_004442e0(0 /*s_PARADROPTARGET1*/, param_1);
        }
      }
      else {
        local_20 = FUN_005b8a1d(param_2, param_3);
        iVar5 = FUN_0043cf76(param_2, param_3);
        if ((-1 < iVar5) && (local_20 !== uVar4) &&
           ((DAT_0064c6c0[local_20 * 4 + uVar4 * 0x594] & 0xe) !== 0)) {
          if ((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0) {
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
          if (((2 < DAT_00655b02) || (DAT_006d1da0 === local_18)) &&
             (((1 << (u8(local_18) & 0x1f) & DAT_00655b0a) !== 0 &&
              ((1 << (u8(local_18) & 0x1f) & DAT_00655b0b) !== 0)))) {
            aiStack_60[local_18] = 0;
            aiStack_40[local_18] = aiStack_60[local_18];
            if ((uVar4 === local_18) || (DAT_00655b07 !== 0)) {
              aiStack_60[local_18] = 1;
            }
            if (((-1 < iVar5) && (local_20 !== uVar4))) {
              let iV6b = FUN_005b8b65(param_2, param_3, local_18);
              if ((iV6b !== 0) &&
                 (((DAT_0064c6c0[uVar4 * 4 + local_18 * 0x594] & 0x80) !== 0 ||
                  ((DAT_0064c6c0[local_20 * 4 + local_18 * 0x594] & 0x80) !== 0)))) {
                aiStack_60[local_18] = 1;
              }
            }
            for (let local_14 = 0; local_14 < 9; local_14 = local_14 + 1) {
              let uVar7b = FUN_005ae052(s8(DAT_00628350[local_14]) + param_2);
              local_1c = s8(DAT_00628360[local_14]) + param_3;
              let iV6c = FUN_004087c0(uVar7b, local_1c);
              if (iV6c !== 0) {
                let uVar8 = FUN_005b8da4(uVar7b, local_1c);
                if (uVar8 === local_18) {
                  aiStack_60[local_18] = 1;
                }
              }
            }
            if ((aiStack_60[local_18] !== 0) &&
               (((uVar4 === local_18 || ((DAT_00655aea[1] & 0x10) !== 0)) || (-1 < iVar5)))) {
              aiStack_40[local_18] = 1;
            }
          }
        }
        let uVar7 = FUN_00410070(uVar4);
        FUN_0040ff60(0, uVar7);
        FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[param_1 * 0x20])]);
        local_10 = FUN_0043d07a(param_2, param_3, 0xffffffff, 0xffffffff, 0xffffffff);
        FUN_0040ff60(2, 0 /*&DAT_0064f360 + local_10 * 0x58*/);
        if (((aiStack_60[DAT_006d1da0] !== 0) &&
            (FUN_004105f8(param_2, param_3, uVar4),
            (1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0)) && (DAT_00654fa8 === 0)) {
          FUN_004442e0(0 /*s_PARADROP*/, param_1);
        }
        if (2 < DAT_00655b02) {
          for (let local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if ((((1 << (u8(local_18) & 0x1f) & DAT_00655b0a) !== 0) &&
                ((1 << (u8(local_18) & 0x1f) & DAT_00655b0b) !== 0)) &&
               ((DAT_006d1da0 !== local_18 &&
                (((aiStack_60[local_18] !== 0 && ((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0))
                 && (DAT_00654fa8 === 0)))))) {
              FUN_00511880(0x15, 0, 3, 0, param_1, 0);
            }
          }
        }
        local_c = 0;
        local_64 = 0xffffffff;
        for (let local_14 = 0; local_14 < 8; local_14 = local_14 + 1) {
          uVar7 = FUN_005ae052(s8(DAT_00628350[local_14]) + param_2);
          local_1c = s8(DAT_00628360[local_14]) + param_3;
          let iV6 = FUN_004087c0(uVar7, local_1c);
          if (iV6 !== 0) {
            local_8 = _rand();
            local_8 = local_8 % 6;
            if ((DAT_00628350[local_14] !== 0) && (DAT_00628360[local_14] !== 0)) {
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
        DAT_006560ff[param_1 * 0x20] = 0xff;
        FUN_005b5bab(param_1, 0);
        if (((DAT_006d1da0 === uVar4) || (DAT_00655b07 !== 0)) ||
           (((1 << (u8(DAT_006d1da0) & 0x1f) & u8(DAT_006560f9[param_1 * 0x20])) !== 0
            || (s8(DAT_006560f7[param_1 * 0x20]) === (DAT_006d1da0 & 0xff))))) {
          FUN_0047cea6(sVar2, sVar3);
        }
        if (aiStack_40[DAT_006d1da0] !== 0) {
          FUN_0056c705(param_1, local_68, local_6c, local_64, 0xffffffff, 0xffffffff);
        }
        FUN_005b48b1(param_1);
        if ((DAT_00655afe === param_1) && (DAT_006d1da0 === uVar4)) {
          DAT_0064b1b4 = param_2;
          DAT_0064b1b0 = param_3;
        }
        FUN_005b3ae0(param_1, param_2, param_3, 0);
        if (2 < DAT_00655b02) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          for (let local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (((DAT_006d1da0 !== local_18) &&
                ((1 << (u8(local_18) & 0x1f) & DAT_00655b0a) !== 0)) &&
               ((1 << (u8(local_18) & 0x1f) & DAT_00655b0b) !== 0)) {
              if (((DAT_00655b07 !== 0) ||
                  ((1 << (u8(local_18) & 0x1f) & u8(DAT_006560f9[param_1 * 0x20])) !== 0
                  )) || (s8(DAT_006560f7[param_1 * 0x20]) === (local_18 & 0xff))) {
                FUN_0046b14d(0x72, 0, param_2, param_3, 0, 0, 0, 0, 0, 0);
              }
              if (aiStack_40[local_18] !== 0) {
                FUN_0046b14d(0x70, 0, param_1, param_2, param_3, local_64, 0xffffffff, 0, 0, 0);
              }
            }
          }
        }
        w16(DAT_006560f4, param_1 * 0x20,
             s16(DAT_006560f4, param_1 * 0x20) | 0x10);
        if ((-1 < iVar5) && (local_20 !== uVar4)) {
          if ((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0) {
            FUN_005b6787(param_1);
          }
          DAT_006560fa[param_1 * 0x20] = 0;
          DAT_00655b00 = param_1;
          FUN_0057b5df(iVar5, uVar4, 0);
          param_1 = DAT_00655b00;
        }
        FUN_004274a6(param_1, 1);
        FUN_citywin_C494(param_1, sVar2, sVar3);
        w16(DAT_006560f4, param_1 * 0x20,
             s16(DAT_006560f4, param_1 * 0x20) & 0xfeff);
        FUN_0056a65e(1);
      }
    }
    else if ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0) {
      FUN_004442e0(0 /*s_PARADROPTARGET2*/, param_1);
    }
  }
  else if ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0) {
    FUN_004442e0(0 /*s_PARADROPTARGET*/, param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc870 — show_popup_a
// Source: block_004C0000.c line 3432
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc870(param_1, param_2, param_3) {
  FUN_004a6bdc(DAT_006359d4, param_1, 0, param_2, param_3);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc8b0 — show_popup_b
// Source: block_004C0000.c line 3446
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc8b0(param_1, param_2, param_3) {
  FUN_004a6e39(DAT_006359d4, param_1, param_2, param_3);
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
// Source: block_004C0000.c line 3497
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc924() {
  // _atexit(FUN_004cc941) — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cc941 — library destructor_a
// Source: block_004C0000.c line 3511
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc941() {
  // COleCntrFrameWnd::~COleCntrFrameWnd — MFC destructor, no-op
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
// Source: block_004C0000.c line 3562
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc98f() {
  // _atexit(FUN_004cc9ac) — no-op in JS
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
// Source: block_004C0000.c line 3628
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cc9fe() {
  // _atexit(FUN_004cca1b) — no-op in JS
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

export function show_messagebox_CA35(param_1, param_2) {
  // Win32 MessageBoxA wrapper — stub
  return FUN_00498159(param_1, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccab9 — init_rules_edit_sections
// Source: block_004C0000.c line 3688
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ccab9(param_1, param_2) {
  DAT_006a1880[0] = param_1;
  DAT_006a1884[0] = param_2;
  DAT_006a1888[0] = 0;
  DAT_006a188c[0] = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccaed — add_rules_edit_section
// Source: block_004C0000.c line 3705
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ccaed(param_1, param_2) {
  let local_8;

  for (local_8 = 0; (DAT_006a1880[local_8 * 8] !== 0 && (local_8 < 7));
      local_8 = local_8 + 1) {
  }
  if (local_8 < 7) {
    DAT_006a1880[local_8 * 8] = param_1;
    DAT_006a1884[local_8 * 8] = param_2;
    DAT_006a1888[local_8 * 8] = 0;
    DAT_006a188c[local_8 * 8] = 0;
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
  FUN_005f22e0(0 /*&DAT_00679640*/, local_18);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ccdef — format_tech_name
// Source: block_004C0000.c line 3790
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ccdef(param_1, param_2) {
  // Tech name formatting — UI string building
  if (param_1 === -2) {
    FUN_005f22e0(0 /*&DAT_00679640*/, 0);
  }
  else if (param_1 === -1) {
    FUN_005f22e0(0 /*&DAT_00679640*/, 0);
  }
  else if (param_1 < 100) {
    FUN_005f22e0(0 /*&DAT_00679640*/, 0 /*&DAT_00627680 + param_1 * 0x10*/);
    if (param_2 !== 0) {
      FUN_005f22e0(0 /*&DAT_00679640*/, 0);
    }
  }
  else {
    FUN_005f22e0(0 /*&DAT_00679640*/, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// show_messagebox_CF2D — save RULES.TXT changes
// Source: block_004C0000.c line 3829
// ═══════════════════════════════════════════════════════════════════

export function show_messagebox_CF2D() {
  // File I/O function that saves RULES.TXT changes.
  // Uses _fgets, _fputs, _fclose, __getcwd, __chdir etc.
  // Not applicable in browser JS context — stub.
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cd3d7 — edit_city_txt_entry
// Source: block_004C0000.c line 3935
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cd3d7(param_1, param_2, param_3) {
  // File I/O: edits CITY.TXT entries. Not applicable in JS — stub.
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cd8a6 — update_city_txt_leaders
// Source: block_004C0000.c line 4046
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cd8a6() {
  // File I/O: updates CITY.TXT leader names. Stub.
  return 0;
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
  // Modifies DAT_00631ed8 and DAT_00631edc based on checkbox state
  let iVar1;
  let local_314;
  let local_2e0 = 0;
  let local_2cc = 0;
  let local_22c = 0;
  let local_14;

  FUN_0059db08(0x4000);
  if (DAT_006a4f88 === 0) {
    local_314 = 0;
  }
  else {
    local_314 = DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_314);
  iVar1 = FUN_005a632a(DAT_006359d4, param_1, param_2, 0, 0, 0, 0, param_4);
  if (iVar1 === 0) {
    if ((local_2cc & 4) !== 0) {
      for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
        FUN_0059ea4d(local_14, 1 << (u8(local_14) & 0x1f) & DAT_00631ed8);
      }
    }
    for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
      FUN_0059e8db(local_14, (1 << (u8(local_14) & 0x1f) & param_3) !== 0);
    }
    FUN_0040bc80(0);
    DAT_00631edc = local_22c;
    if ((local_2cc & 4) !== 0) {
      DAT_00631ed8 = 0;
      for (local_14 = 0; local_14 < local_2e0; local_14 = local_14 + 1) {
        iVar1 = FUN_0059e9f3(local_14);
        if (iVar1 !== 0) {
          DAT_00631ed8 = DAT_00631ed8 | 1 << (u8(local_14) & 0x1f);
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
// Source: block_004C0000.c line 4249
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdf3c() {
  // SEH cleanup — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdf4b — clamp_value
// Source: block_004C0000.c line 4266
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdf4b(param_1, param_2, param_3) {
  if (param_1 < param_2) {
    DAT_0062e014 = 1;
  }
  else {
    param_2 = param_1;
    if (param_3 < param_1) {
      DAT_0062e014 = 1;
      param_2 = param_3;
    }
  }
  return param_2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cdfa4 — setup_cheat_dialog (UI)
// Source: block_004C0000.c line 4291
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cdfa4(param_1, param_2, param_3, param_4, param_5, param_6,
                             param_7, param_8, param_9) {
  // Cheat/scenario editor dialog setup — UI, no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce196 — load_popup_texts
// Source: block_004C0000.c line 4361
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce196() {
  // Loads text strings for popup dialogs — UI init
  DAT_006a4f98 = 1;
  DAT_006a4f9c = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce2f3 — clear_popup_state
// Source: block_004C0000.c line 4408
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce2f3() {
  DAT_006a4f98 = 0;
  DAT_006a4f9c = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce322 — init_popup_window
// Source: block_004C0000.c line 4424
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce322() {
  // DEVIATION: MFC window initialization (104 bytes)
  FUN_00552112();
  FUN_0040fdb0(0 /*&DAT_006a18c0*/, 0 /*&DAT_006a1b7c*/, 0x1d);
  FUN_005baeb0(0);
  FUN_005baec8(0 /*&DAT_006a4f90*/);
  FUN_005baee0(0x29, 0x12, 1, 1);
  FUN_00408460();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce38a — show_popup_text_window (UI)
// Source: block_004C0000.c line 4447
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce38a(param_1, param_2) {
  // MFC popup text display — UI, no-op
  DAT_006a4f9c = 1;
  DAT_006a1d78 = param_1;
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
// Source: block_004C0000.c line 4553
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce70c() {
  // SEH cleanup — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce71b — validate_city_name
// Source: block_004C0000.c line 4570
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce71b(param_1) {
  // City name validation dialog — UI
  return true;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce83d — send_listbox_reset_messages (Win32)
// Source: block_004C0000.c line 4622
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce83d() {
  // DEVIATION: Win32 SendMessageA loop — resets listbox controls (103 bytes)
  // Iterates DAT_006a4f88 controls sending LB_RESETCONTENT. No game state.
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce8a4 — read_profile_int
// Source: block_004C0000.c line 4648
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce8a4(param_1, param_2, param_3, param_4) {
  // Registry/INI read — stub
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce903 — allocate_and_copy_string
// Source: block_004C0000.c line 4670
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce903(param_1, param_2, param_3) {
  // Memory allocation + string copy — stub
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ce98e — copy_dialog_template_strings
// Source: block_004C0000.c line 4700
// ═══════════════════════════════════════════════════════════════════

export function FUN_004ce98e(param_1, param_2) {
  // DEVIATION: Deep copy of MFC dialog template linked list (1367 bytes)
  // Iterates source dialog linked list, allocates copies via FUN_004fa617.
  // Pure UI infrastructure — no game state modifications.
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cef35 — refresh_dialog_templates
// Source: block_004C0000.c line 4848
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cef35() {
  // Dialog template management — UI init, stub
  FUN_004cefc5();
  FUN_004cefdb();
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
// Source: block_004C0000.c line 4894
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cefdb() {
  // SEH cleanup — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cefe9 — rename_leader_in_dialogs
// Source: block_004C0000.c line 4911
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cefe9(param_1, param_2) {
  // Renames leader name strings in dialog linked list — stub
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cf144 — rename_title_in_dialogs
// Source: block_004C0000.c line 4959
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cf144(param_1, param_2) {
  // Renames title strings in dialog linked list — stub
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cf3ba — rename_tribe_in_dialogs
// Source: block_004C0000.c line 5035
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cf3ba(param_1, param_2) {
  // Renames tribe name strings in dialog linked list — stub
  return 0;
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
// Source: block_004C0000.c line 5085
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cffb0(param_1, param_2, param_3) {
  // send_msg_2DED — MFC dialog text retrieval, no-op
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004cfff0 — trim_trailing_whitespace (004d007e is similar)
// Source: block_004C0000.c line 5101
// ═══════════════════════════════════════════════════════════════════

export function FUN_004cfff0(param_1) {
  // String trimming — modifies C string in place
  if (typeof param_1 === 'string') {
    return param_1.trimEnd();
  }
}


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks referenced but not yet defined.
// These are no-ops that allow the module to load without errors.
// ═══════════════════════════════════════════════════════════════════

function FUN_0043d20a() { return 0; }
function FUN_00453e51() { return 0; }
function FUN_004a7577() { return 0; }
function FUN_004bfdbe() { return 0; }
function FUN_004bdb2c() { return 0; }
function FUN_004bdaa5() { return 0; }
function FUN_0059db08() { /* stack allocation — no-op */ }
function FUN_0040ffa0() { /* UI string format */ }
function FUN_0059e4e6() { /* UI */ }
function FUN_0043c990() { /* UI */ }
function FUN_0040bbb0() { /* UI string builder reset */ }
function FUN_0040ff00() { /* UI string append */ }
function FUN_0040fe10() { /* UI line break */ }
function FUN_0040ff30() { /* UI append int */ }
function FUN_0059edf0() { /* UI listbox add */ }
function FUN_0040bbe0() { /* UI append text */ }
function FUN_0040fea0() { /* UI */ }
function FUN_0040fed0() { /* UI */ }
function FUN_0059f2a3() { /* UI tab add */ }
function FUN_00428b0c() { return 0; /* string resource load */ }
function FUN_0040bc80() { return -1; /* dialog show/wait */ }
function FUN_00566584() { /* show civilopedia */ }
function FUN_005ad998() { /* show unit help */ }
function FUN_0059a2e6() { /* show wonder help */ }
function FUN_0059df8a() { /* dialog cleanup */ }
function FUN_0040ff60() { /* set format param */ }
function FUN_0059ec88() { /* show bitmap */ }
function FUN_0043c9d0() { /* set dialog title */ }
function FUN_0059e783() { /* UI scroll */ }
function FUN_0059db65() { /* UI */ }
function FUN_00484d52() { /* UI */ }
function FUN_005a5f34() { return 0; /* timer/wait */ }
function FUN_00421bb0() { return 0; /* get_tick_count */ }
function FUN_004bf05b() { /* grant_tech */ }
function FUN_00493d13() { return 0; /* get civ name */ }
function FUN_00421d60() { /* UI set format */ }
function FUN_004271e8() { /* UI set icon */ }
function FUN_004bee56() { /* democracy check */ }
function FUN_00410030() { return 0; /* show message dialog */ }
function FUN_004bea84() { /* ai_research_follow_up */ }
function FUN_005b8d15_CSplitterWnd_IsTracking() { return -1; }
function FUN_005b8d15() { return -1; }
function FUN_00442541() { /* update display */ }
function FUN_004eb4ed() { /* city production update */ }
function FUN_005adfa0() { return 0; /* difficulty_scale */ }
function FUN_004904c0() { /* show tutorial */ }
function FUN_005b6787() { /* clear_unit_orders */ }
function FUN_005b2d39() { return -1; /* first unit at tile */ }
function FUN_005b2c82() { return -1; /* next unit at tile */ }
function FUN_005b94fc() { /* set_tile_improvements */ }
function FUN_005b9646() { /* transform_terrain */ }
function FUN_005b8b1a() { /* update_visibility */ }
function FUN_0047ce1e() { /* refresh_tile */ }
function FUN_0056a65e() { /* update_status */ }
function FUN_citywin_C494() { /* city_window_update */ }
function FUN_citywin_C6EF() { /* city_window_refresh */ }
function FUN_citywin_C679() { /* city_window_mark_dirty */ }
function FUN_0043cf76() { return -1; /* find_city_at_tile */ }
function FUN_0043d07a() { return -1; /* find_city_near */ }
function FUN_0047cea6() { /* redraw_tile */ }
function FUN_004adafc() { return -1; /* pathfind_move */ }
function FUN_0059062c() { return 0; /* try_move */ }
function FUN_005b4b66() { return 0; /* check_can_enter */ }
function FUN_005b4391() { /* kill_unit */ }
function FUN_00579ed0() { return 0; /* check_peace_treaty */ }
function FUN_005b8a81() { return -1; /* get_continent */ }
function FUN_005ae1b0() { return 0; /* tile_distance */ }
function FUN_005ae31d() { return 0; /* tile_distance_2 */ }
function FUN_005b2a39() { return 0; /* get_unit_move_rate */ }
function FUN_005b2c3d() { return 0; /* get_unit_moves_remaining */ }
function FUN_005b8d62() { return -1; /* get_tile_owner */ }
function FUN_00493c7d() { return 0; /* get_civ_adjective */ }
function FUN_00410070() { return 0; /* get_civ_name_string */ }
function FUN_00456f20() { /* modify_attitude */ }
function FUN_00467825() { /* set_contact_flag */ }
function FUN_00467750() { /* clear_contact_flag */ }
function FUN_004b0b53() { /* broadcast_network_msg */ }
function FUN_0046b14d() { /* send_network_event */ }
function FUN_00511880() { /* send_advisor_msg */ }
function FUN_0045ac71() { /* declare_war */ }
function FUN_0045705e() { /* break_alliance */ }
function FUN_00458a3b() { /* update_diplomacy */ }
function FUN_0055c69d() { /* revolution */ }
function FUN_005b6042() { /* disband_unit */ }
function FUN_005b36df() { /* teleport_unit */ }
function FUN_005b5bab() { /* set_unit_visibility */ }
function FUN_005b48b1() { /* update_unit_fog */ }
function FUN_005b3ae0() { /* move_unit_to_tile */ }
function FUN_004274a6() { /* activate_unit */ }
function FUN_0056c705() { /* animate_unit_move */ }
function FUN_005b50ad() { return 0; /* count_units_at_tile */ }
function FUN_004442e0() { return 0; /* show_unit_dialog */ }
function FUN_004442a0() { /* show_combat_dialog */ }
function FUN_004105f8() { /* center_map_on */ }
function FUN_0049301b() { /* notify_war_declaration */ }
function FUN_0057b5df() { /* transfer_city */ }
function FUN_005b9ec6() { /* begin_visibility_update */ }
function FUN_005b9f1c() { /* end_visibility_update */ }
function FUN_005b976d() { /* set_tile_visibility_bit */ }
function FUN_005b99e8() { /* update_unit_civ_visibility */ }
function FUN_005b490e() { /* remove_unit_from_civ */ }
function FUN_0046e020() { /* play_sound_event */ }
function FUN_0043060b() { /* ai_embassy_action */ }
function FUN_handle_city_disorder_00509590() { /* investigate_city */ }
function FUN_0057a27a() { /* diplomacy_notify */ }
function FUN_0043d289() { /* remove_building */ }
function FUN_0043cc00() { /* destroy_city_walls */ }
function FUN_0057f9e3() { /* plant_nuke */ }
function FUN_0057ed3f() { /* nuclear_explosion */ }
function FUN_005b29d7() { return 0; /* get_unit_hp */ }
function FUN_00569363() { /* update_treasury_display */ }
function FUN_00421ea0() { return 0; /* yes_no_dialog */ }
function FUN_0040bc10() { /* UI append separator */ }
function FUN_0043c810() { /* UI end list */ }
function FUN_0059e18b() { /* UI display formatted */ }
function FUN_00421d30() { /* UI append comma */ }
function FUN_00421da0() { /* UI format number */ }
function FUN_004a2379() { return 0; /* init_option_list */ }
function FUN_004a23fc() { return 0; /* add_option */ }
function FUN_004a2020() { /* finalize_options */ }
function FUN_004aef36() { /* option_text_start */ }
function FUN_004af01a() { /* option_text_middle */ }
function FUN_004af03b() { /* option_text_end */ }
function FUN_004af122() { /* option_set_icon */ }
function FUN_004aef20() { /* init_temp_string */ }
function FUN_00426fb0() { return 0; /* two_choice_dialog */ }
function FUN_00414dd0() { return 0; /* modal_dialog */ }
function FUN_00598ceb() { return 0; /* check_scenario_flag */ }
function FUN_004a6b80() { /* popup_show */ }
function FUN_004a6bdc() { /* popup_show_2 */ }
function FUN_004a6e39() { /* popup_show_3 */ }
function FUN_0055339f() { /* library init */ }
function FUN_004187a0() { /* library init */ }
function FUN_00418870() { /* library cleanup */ }
function FUN_0043c460() { /* library init */ }
function FUN_0043c520() { /* library cleanup */ }
function FUN_00498159() { return 0; /* allocate */ }
function FUN_0040f570() { /* cleanup */ }
function FUN_004fa569() { /* free */ }
function FUN_004fa617() { return 0; /* alloc dialog node */ }
function FUN_004fa4be() { /* init alloc */ }
function FUN_004fa5d9() { /* init alloc 2 */ }
function FUN_0047e94e() { /* process_messages */ }
function FUN_0046e287() { /* delay_animation */ }
function FUN_0041f8d9() { /* invalidate_display */ }
function FUN_005cef31() { /* draw_text_rect */ }
function FUN_00472cf0() { return 20; /* get_text_height */ }
function FUN_0047df20() { /* set_text_color */ }
function FUN_0047df50() { /* restore_text_color */ }
function FUN_005ae052_local() { return 0; /* wrap_x — use imported */ }
function FUN_00415133() { return 0; /* file_exists */ }
function FUN_0041508c() { return 0; /* fopen */ }
function FUN_0056b810() { /* trim_line */ }
function FUN_004d007e() { /* normalize_line */ }
function FUN_004190a0() { /* pad_spaces */ }
function FUN_005a632a() { return 0; /* dialog_init */ }
function FUN_0059ea4d() { /* checkbox_set */ }
function FUN_0059e8db() { /* checkbox_enable */ }
function FUN_0059e9f3() { return 0; /* checkbox_get */ }
function FUN_0059d3c9() { /* set_dialog_parent */ }
function FUN_005bb4ae() { /* create_window */ }
function FUN_00497d00() { /* set_scroll_info */ }
function FUN_00552ed2() { /* show_window */ }
function FUN_00552112() { /* init_window_class */ }
function FUN_0040fdb0() { /* register_handler */ }
function FUN_005baeb0() { /* set_window_property */ }
function FUN_005baec8() { /* set_window_data */ }
function FUN_005baee0() { /* set_window_size */ }
function FUN_00408460() { /* show_window_2 */ }
function FUN_005bb574() { /* center_window */ }
function FUN_005c61b0() { /* update_window */ }
function FUN_0040ef50() { /* process_messages_2 */ }
function FUN_00553379() { /* destroy_window */ }
function FUN_004085f0() { /* finalize_window */ }
function FUN_004bb620() { /* create_control */ }
function FUN_00492ae0() { /* append_text */ }
function FUN_004086c0() { /* set_rect */ }
function FUN_0040f680() { /* create_button */ }
function FUN_0040f880() { /* set_button_handler */ }
function FUN_004bb800() { /* offset_rect */ }
function FUN_005a99fc() { /* draw_line */ }
function FUN_005a9b5d() { /* draw_rect_border */ }
function FUN_00407f90() { return 0; /* rect_width */ }
function FUN_00407fc0() { return 0; /* rect_height */ }
function FUN_004440d6() { /* unknown */ }
function FUN_00444270() { return 0; /* input dialog */ }
function FUN_0040f3e0() { /* init dialog */ }
function FUN_005bd270() { /* set bitmap */ }
function FUN_0051d63b() { return 0; /* registry read */ }
function FUN_00589ef8() { /* error handler */ }
function FUN_00418770() { return 0; /* get listbox hwnd */ }
function FUN_005b8d15_fn() { return -1; }
function FUN_004c4210_fn() { }
function FUN_00627cce_fn() { return 0; /* DAT_00627cce accessor */ }
function FUN_create_city() { return -1; /* create_city */ }
function send_msg_2DED() { /* network msg stub */ }
function FUN_005b8b65() { return 0; /* check_tile_visible */ }
function FUN_005b8da4() { return -1; /* get_tile_owner_2 */ }
// FUN_004274a6 (duplicate stub removed)
// FUN_005b48b1 (duplicate stub removed)
// FUN_005b5bab (duplicate stub removed)
// FUN_005b3ae0 (duplicate stub removed)
// FUN_0056c705 (duplicate stub removed)
function FUN_00453e18() { return -1; /* find_wonder_owner */ }
function FUN_005b2e69() { return -1; /* first_unit_at_city */ }
// FUN_004d007e (duplicate stub removed)
function FUN_006560fe_arr() { return 0; /* DAT_006560fe array accessor */ }
