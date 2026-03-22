// ═══════════════════════════════════════════════════════════════════
// block_00400000.js — Mechanical transpilation of block_00400000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00400000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00400000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8,
  getTileOffset, tileRead, tileWrite,
} from './mem.js';

import {
  FUN_004087c0 as fn_004087c0,
  FUN_005ae052,
  FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4,
  FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1,
  FUN_004bd9f0,
} from './fn_utils.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_00624ee0 = 0;   // map view disabled flag
let DAT_00624ee8 = 0;   // land mass setting
let DAT_00624eec = 0;   // landform setting
let DAT_00624ef0 = 0;   // climate setting
let DAT_00624ef4 = 0;   // temperature setting
let DAT_00624ef8 = 0;   // age setting
let DAT_00624efc = 0;
let DAT_00624f00 = 0;
let DAT_00624f04 = 0;
let DAT_00624f10 = new Int32Array(3);
let DAT_00624f1c = 0;
let DAT_00624f20 = 0;
let DAT_00624f30 = 0;
let DAT_00627cca = new Uint8Array(0x16 * 0x18);
let DAT_00627ccb = new Uint8Array(0x16 * 0x18);
let DAT_00627ccc = new Uint8Array(0x16 * 0x18);
let DAT_00627ccf = new Int8Array(0x16 * 0x18);
let DAT_00627fe0 = new Uint8Array(0x15 * 2);
let DAT_00628010 = new Uint8Array(0x15 * 2);
let DAT_00628044 = 0;
let DAT_00628048 = 0;
let DAT_0062804c = 0;
let DAT_00628054 = 0;
let DAT_00628060 = 0;
// DAT_00628350 / DAT_00628360 imported from mem.js
let DAT_00628351 = new Int8Array(8);  // offset by 1 from DAT_00628350
let DAT_00628361 = new Int8Array(8);  // offset by 1 from DAT_00628360
let DAT_00628370 = new Int8Array(0x15);
let DAT_006283a0 = new Int8Array(0x15);
let DAT_00628420 = 0;
let DAT_0062edf8 = 0;
let DAT_00633584 = 0;
let DAT_00633598 = 0;
let DAT_0063359c = 0;
let DAT_006335a0 = 0;
let DAT_006335a4 = 0;
let DAT_006359d4 = 0;
let DAT_006359f0 = 0;   // PTR_DAT_006359f0
let DAT_00635c64 = 0;
let DAT_00636598 = null; // tile data pointer (Uint8Array)
let DAT_00637e60 = 0;   // PTR_DAT_00637e60
let DAT_00637e68 = 0;   // PTR_DAT_00637e68
let DAT_0063c800 = 0;
let DAT_0063c804 = 0;
let DAT_0063c808 = 0;
let DAT_0063c80c = 0;
let DAT_0063c810 = 0;
let DAT_0063c814 = 0;
let DAT_0063c818 = 0;
let DAT_0063c870 = 0;
let DAT_0063c93c = 0;
let DAT_0063c940 = 0;
let DAT_0063c944 = 0;
let DAT_0063c948 = 0;
let _DAT_0063caf0 = 0;
let DAT_0063caf4 = 0;
let DAT_0063cb94 = 0;
let DAT_0063cb98 = 0;
let DAT_0063cb9c = 0;
let DAT_0063cba0 = 0;
let DAT_0063cba4 = 0;
let DAT_0063cbb0 = 0;
let DAT_0063cbb4 = null; // pointer to tax rate dialog state (Int32Array or object)
let DAT_0063cc48 = 0;
let DAT_0063fc58 = 0;
let DAT_00646878 = 0;
let DAT_0064b1b0 = 0;
let DAT_0064b1b4 = 0;
let DAT_0064b9a0 = new Int32Array(8);
let _DAT_0064bc1a = 0;
let _DAT_0064bc1c = 0;
let DAT_0064bc60 = 0;
let DAT_0064bcf4 = 0;
let DAT_0064c6a0 = new Uint8Array(8 * 0x594);
let DAT_0064c6b3 = new Uint8Array(8 * 0x594);
let DAT_0064c6b4 = new Uint8Array(8 * 0x594);
let DAT_0064c6b5 = new Uint8Array(8 * 0x594);
let DAT_0064f340 = new Uint8Array(256 * 0x58);
let DAT_0064f342 = new Uint8Array(256 * 0x58);
let DAT_0064f344 = new Uint8Array(256 * 0x58);
let DAT_0064f348 = new Int8Array(256 * 0x58);
let DAT_0064f34c = new Int8Array(256 * 0x58);
let DAT_0064f360 = new Uint8Array(256 * 0x58);
let DAT_0064f38a = new Uint8Array(256 * 0x58);
let DAT_0064f38c = new Uint8Array(256 * 0x58);
let DAT_0064f38e = new Uint8Array(256 * 0x58);
let DAT_0064f394 = new Int32Array(256);
let DAT_00655280 = 0;
let DAT_00655324 = 0;
let DAT_00655328 = 0;
let DAT_00655360 = new Int32Array(16);
let DAT_00655aee = 0;
let DAT_00655af0 = 0;
let DAT_00655af8 = 0;
let DAT_00655b02 = 0;
let DAT_00655b07 = 0;
let DAT_00655b0b = 0;
let DAT_00655b18 = 0;
let DAT_00666130 = new Uint8Array(0x40 * 0x10);
let DAT_00666132 = new Uint8Array(0x40 * 0x10);
let DAT_0066ca84 = new Uint8Array(8 * 0x3f0);
let DAT_0066ca88 = 0;
let DAT_0066ca8a = 0;
let DAT_0066ca90 = 0;
let DAT_0066ca94 = 0;
let DAT_0066ca98 = 0;
let DAT_0066ca9c = 0;
let DAT_0066cad0 = 0;
let DAT_0066cad4 = 0;
let DAT_0066cad8 = 0;
let DAT_0066cadc = 0;
let DAT_00679640 = 0;
let DAT_006ab198 = 0;
let DAT_006ab19c = 0;
let DAT_006ab1a0 = 0;
let DAT_006acbb0 = 0;
let DAT_006ad30c = 0;
let DAT_006ad558 = new Int32Array(8);
let DAT_006d1164 = 0;   // total tile count
let DAT_006d1166 = 0;
let DAT_006d1188 = new Uint8Array(6);
let DAT_006d1da0 = 0;   // current player civ index
let DAT_006d1da8 = 0;
let s_FINDCITY_00624f24 = "FINDCITY";
let s_REVOLUTION_00624f34 = "REVOLUTION";
let s_STARTREV_00624f40 = "STARTREV";
let PTR_DAT_00637e60 = 0;
let PTR_DAT_00637e68 = 0;
let PTR_FUN_0061c054 = 0;


// ═══════════════════════════════════════════════════════════════════
// Win32 API stubs (no-ops in JS)
// ═══════════════════════════════════════════════════════════════════

function SetRect(rect, l, t, r, b) { /* stub */ }
function GetSystemMetrics(idx) { return 0; /* stub */ }
function _atexit(fn) { /* stub */ }
function _rand() { return Math.floor(Math.random() * 0x7FFF); }
function operator_new(size) { return {}; /* stub */ }
function operator_delete(ptr) { /* stub */ }
function FID_conflict__memcpy(dst, src, len) { /* stub */ }


// ═══════════════════════════════════════════════════════════════════
// MFC / C++ library stubs (no-ops)
// ═══════════════════════════════════════════════════════════════════

function COleCntrFrameWnd_dtor(ptr) { /* stub */ }
function CPropertySheet_EnableStackedTabs(thisPtr, param_1) { /* stub */ }
function COleControlSite_SetDlgCtrlID(thisPtr, param_1) { return 0; /* stub */ }
function _Timevec_dtor(thisPtr) { /* stub */ }
function CRichEditDoc_InvalidateObjectCache(ptr) { /* stub */ }
function _eh_vector_constructor_iterator_(ptr, size, count, ctor, dtor) { /* stub */ }
function _eh_vector_destructor_iterator_(ptr, size, count, dtor) { /* stub */ }

// GDI / window management stubs
function manage_window_C636(p) { /* stub */ }
function manage_window_C0AB(p) { return 0; /* stub */ }
function manage_window_C40A(p) { /* stub */ }
function manage_window_944B(p) { /* stub */ }
function manage_window_8B2D(p) { /* stub */ }
function invalidate_8B00(p) { /* stub */ }
function invalidate_CE5F(p1, p2) { /* stub */ }
function measure_text_858E(p1, p2) { return 0; /* stub */ }
function measure_text_BF40(p1, p2, p3, p4, p5) { /* stub */ }
function draw_text_9740(p1, p2, p3, p4, p5) { return 0; /* stub */ }
function create_window_C0F0(p1, p2, p3, p4) { return 0; /* stub */ }
function register_wndclass_CF17(p1, p2, p3, p4) { return 0; /* stub */ }
function gdi_BA4F() { /* stub */ }
function gdi_8514(p) { /* stub */ }
function CONCAT31(a, b) { return (a << 8) | b; }


// ═══════════════════════════════════════════════════════════════════
// FUN_004087c0 — is_tile_valid (bounds check)
// Already in fn_utils.js, re-exported under original name
// ═══════════════════════════════════════════════════════════════════
export function FUN_004087c0(param_1, param_2) {
  return fn_004087c0(param_1, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31 — CRT initializer (library function)
// ═══════════════════════════════════════════════════════════════════
export function FID_conflict___E31() {
  FUN_00406a9a();
  FUN_00406ab4();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406a9a — CRT init helper
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406a9a() {
  FUN_0055339f();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406ab4 — register atexit handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406ab4() {
  _atexit(FUN_00406ad1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406ad1 — CRT destructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406ad1() {
  COleCntrFrameWnd_dtor(DAT_0063c818);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406aeb — set_map_view_disabled
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406aeb() {
  DAT_00624ee0 = 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406b02 — enable_map_view_and_refresh
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406b02() {
  FUN_citywin_9545();
  DAT_00624ee0 = 0;
  FUN_0040733c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406b28 — disable_map_and_manage_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406b28() {
  DAT_00624ee0 = 1;
  FUN_00408090();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406b4c — calculate_map_tile_sizes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406b4c() {
  let iVar1;
  let iVar2;
  let iVar3;

  iVar1 = DAT_0063c948;
  iVar2 = (DAT_0063c944 / DAT_006d1160) | 0;
  if (iVar2 < 2) {
    iVar2 = 1;
  }
  iVar3 = (DAT_0063c948 / DAT_006d1162) | 0;
  if (iVar3 < 2) {
    iVar3 = 1;
  }
  if (iVar3 <= iVar2) {
    iVar2 = iVar3;
  }
  DAT_0063c804 = iVar2;
  if (iVar3 <= iVar2) {
    DAT_0063c804 = iVar3;
  }
  DAT_0063c800 = iVar2 * 2;
  iVar2 = ((DAT_0063c944 - (DAT_0063c800 / 2) | 0) / DAT_0063c800) | 0;
  DAT_0063c80c = (DAT_006d1160 / 2) | 0;
  if (iVar2 <= (DAT_006d1160 / 2) | 0) {
    DAT_0063c80c = iVar2;
  }
  DAT_0063c808 = DAT_006d1162;
  if ((DAT_0063c948 / DAT_0063c804) | 0 <= DAT_006d1162) {
    DAT_0063c808 = (DAT_0063c948 / DAT_0063c804) | 0;
  }
  iVar2 = FUN_005adfa0(DAT_0063c944 - DAT_0063c80c * DAT_0063c800, 0, 999);
  _DAT_0063caf0 = FUN_005adfa0(iVar1 - DAT_0063c808 * DAT_0063c804, 0, 999);
  DAT_0063caf4 = iVar2 >> 1;
  _DAT_0063caf0 = _DAT_0063caf0 >> 1;
  if (DAT_0063c808 < DAT_006d1162) {
    DAT_0063c810 = DAT_0066ca8a - (DAT_0063c808 >> 1);
    DAT_0063c810 = FUN_005adfa0(DAT_0063c810, 0, DAT_0066cad4 - DAT_0063c808);
  } else {
    DAT_0063c810 = 0;
  }
  DAT_0063c814 = FUN_005ae052(DAT_0066ca88 - DAT_0063c80c);
  if ((DAT_00655ae8 & 0x8000) !== 0) {
    if (DAT_0063c80c < DAT_006d1160) {
      DAT_0063c814 = FUN_005adfa0(DAT_0063c814, 0, DAT_0066cad0 - DAT_0063c80c);
    } else {
      DAT_0063c814 = 0;
    }
  }
  if ((DAT_0063c814 & 1) !== 0) {
    DAT_0063c814 = DAT_0063c814 - 1;
  }
  if ((DAT_0063c810 & 1) !== 0) {
    DAT_0063c814 = DAT_0063c814 + 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406db8 — tile_to_screen_coords
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406db8(param_1, param_2, param_3, param_4) {
  let local_8;

  local_8 = param_1 - DAT_0063c814;
  if (((DAT_00655ae8 & 0x8000) === 0) && (local_8 < 0)) {
    local_8 = local_8 + DAT_006d1160;
  }
  param_4.value = (param_2 - DAT_0063c810) * DAT_0063c804 + _DAT_0063caf0;
  param_3.value = (local_8 >> 1) * DAT_0063c800 + DAT_0063caf4;
  if ((param_2 & 1) !== 0) {
    param_3.value = param_3.value + (DAT_0063c800 >> 1);
  }
  param_3.value = param_3.value + DAT_0063c93c;
  param_4.value = param_4.value + DAT_0063c940;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00406e61 — get_tile_cursor_icon
// ═══════════════════════════════════════════════════════════════════
export function FUN_00406e61(param_1, param_2) {
  let iVar1;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 === 0) {
    local_8 = 10;
  } else {
    iVar1 = FUN_005b8b65(param_1, param_2, DAT_006d1da0);
    if ((iVar1 === 0) && (DAT_00655b07 === 0)) {
      local_8 = 10;
    } else {
      iVar1 = FUN_0043cf76(param_1, param_2);
      if ((iVar1 < 0) ||
         (((DAT_00655b07 === 0 &&
           ((1 << (u8(DAT_006d1da0) & 0x1f) & s8(DAT_0064f34c[iVar1 * 0x58])) === 0)) &&
          (s8(DAT_0064f348[iVar1 * 0x58]) !== (DAT_006d1da0 & 0xff))))) {
        if ((((DAT_0062804c === 0) || ((DAT_006d1da8 === 0) !== (DAT_00628054 !== 0))) ||
            (DAT_0064b1b4 !== param_1)) || (DAT_0064b1b0 !== param_2)) {
          iVar1 = FUN_005b89e4(param_1, param_2);
          if (iVar1 === 0) {
            local_8 = 0x30;
          } else {
            local_8 = 0x5d;
          }
        } else {
          local_8 = 0x29;
        }
      } else {
        local_8 = DAT_00655360[s8(DAT_0064f348[iVar1 * 0x58])];
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040701e — draw_movement_line
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040701e() {
  let local_24;
  let local_20;
  let local_1c;
  let local_18 = { value: 0 };
  let local_14 = [0, 0, 0, 0];

  if ((DAT_0066cad8 === 0) && (DAT_0066cadc === 0)) {
    let p3a = { value: 0 };
    let p4a = { value: 0 };
    FUN_00406db8(DAT_0066ca90, DAT_0066ca94, p3a, p4a);
    local_18.value = p3a.value;
    local_20 = p4a.value;
    let p3b = { value: 0 };
    let p4b = { value: 0 };
    FUN_00406db8(DAT_0066ca98, DAT_0066ca9c, p3b, p4b);
    local_1c = p3b.value;
    local_24 = p4b.value;
    if (local_18.value < local_1c) {
      FUN_00408680(local_14, local_18.value, local_20, local_1c + 1, local_24 + 1);
      FUN_00408700(local_14, 0x29);
    } else {
      FUN_00408680(local_14, local_1c, local_20, local_18.value + 1, local_24 + 1);
      FUN_00408700(local_14, 0x29);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004070f1 — draw_tiles_in_radius
// ═══════════════════════════════════════════════════════════════════
export function FUN_004070f1(param_1, param_2, param_3, param_4) {
  let iVar1;
  let iVar2;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_34;
  let local_30;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14 = [0, 0, 0, 0];

  local_20 = 999;
  local_30 = -1;
  local_3c = 999;
  local_40 = -1;
  if (DAT_00624ee0 === 0) {
    FUN_005a9780(DAT_0063c818);
    for (local_44 = param_3 * -2; local_44 <= param_3 * 2; local_44 = local_44 + 2) {
      local_28 = FUN_005ae052(param_1 + local_44);
      if ((-1 < local_28) && (local_28 < DAT_006d1160)) {
        for (local_48 = param_3 * -2; local_48 <= param_3 * 2; local_48 = local_48 + 1) {
          iVar1 = FUN_005ae24d(local_44, local_48);
          if (((iVar1 <= param_3) && (local_34 = param_2 + local_48, -1 < local_34)) &&
             (local_34 < DAT_006d1162)) {
            if ((local_28 & 1) !== 0) {
              local_28 = local_28 - 1;
            }
            if ((local_34 & 1) !== 0) {
              local_34 = local_34 + 1;
            }
            iVar1 = FUN_004087c0(local_28, local_34);
            if (iVar1 !== 0) {
              let p3 = { value: 0 };
              let p4 = { value: 0 };
              FUN_00406db8(local_28, local_34, p3, p4);
              local_1c = p3.value;
              local_24 = p4.value;
              local_18 = FUN_00406e61(local_28, local_34);
              FUN_00408780(local_1c, local_24, DAT_0063c800, DAT_0063c804, local_18);
              if (param_4 !== 0) {
                iVar1 = local_1c + DAT_0063c800 + -1;
                iVar2 = local_24 + DAT_0063c804 + -1;
                if (local_1c < local_20) {
                  local_20 = local_1c;
                }
                if (local_30 < iVar1) {
                  local_30 = iVar1;
                }
                if (local_24 < local_3c) {
                  local_3c = local_24;
                }
                if (local_40 < iVar2) {
                  local_40 = iVar2;
                }
              }
            }
          }
        }
      }
    }
    if ((param_4 !== 0) && (-1 < local_30)) {
      FUN_0040701e();
      FUN_004086c0(local_14, local_20, local_3c, (local_30 - local_20) + 1,
                   (local_40 - local_3c) + 1);
      FUN_00408490(local_14);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040733c — redraw_full_map
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040733c() {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_24;
  let local_20;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_00624ee0 === 0) && (DAT_00628044 !== 0)) {
    FUN_00552ed2();
    FUN_005a9780(DAT_0063c818);
    FUN_00406b4c();
    FUN_00408750(0);
    local_10 = DAT_0063c940 + _DAT_0063caf0;
    for (local_20 = 0; local_20 < DAT_0063c808; local_20 = local_20 + 1) {
      uVar1 = local_20 + DAT_0063c810;
      if ((uVar1 & 1) === 0) {
        local_24 = 0;
      } else {
        local_24 = DAT_0063c800 >> 1;
      }
      local_c = DAT_0063c93c + DAT_0063caf4 + local_24;
      for (local_1c = 0; local_1c < DAT_0063c80c; local_1c = local_1c + 1) {
        local_14 = FUN_005ae052(local_1c * 2 + DAT_0063c814);
        if ((local_14 & 1) !== 0) {
          local_14 = local_14 - 1;
        }
        if ((uVar1 & 1) !== 0) {
          local_14 = local_14 + 1;
        }
        iVar2 = FUN_004087c0(local_14, uVar1);
        if (iVar2 !== 0) {
          uVar3 = FUN_00406e61(local_14, uVar1);
          FUN_00408780(local_c, local_10, DAT_0063c800, DAT_0063c804, uVar3);
          local_c = local_c + DAT_0063c800;
        }
      }
      local_10 = local_10 + DAT_0063c804;
    }
    FUN_00407ff0();
    FUN_0040701e();
    FUN_00552112();
    FUN_00408460();
    FUN_00407ff0();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004074dc — screen_click_to_tile
// ═══════════════════════════════════════════════════════════════════
export function FUN_004074dc(param_1, param_2) {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_14;
  let local_10;

  param_1 = param_1 - DAT_0063c93c;
  param_2 = param_2 - DAT_0063c940;
  if ((((-1 < param_1) && (-1 < param_2)) && (param_1 < DAT_0063c944)) && (param_2 < DAT_0063c948))
  {
    if (DAT_0062edf8 === 0) {
      uVar1 = FUN_005adfa0(DAT_0063c810 + ((param_2 - _DAT_0063caf0) / DAT_0063c804) | 0,
                           DAT_0063c810, DAT_0063c810 + DAT_0063c808 + -1);
      if ((uVar1 & 1) === 0) {
        local_14 = 0;
      } else {
        local_14 = DAT_0063c800 >> 1;
      }
      uVar2 = FUN_005adfa0((((param_1 - (DAT_0063caf4 + local_14)) / DAT_0063c800) | 0) * 2 +
                           DAT_0063c814, DAT_0063c814, DAT_0063c80c * 2 + -2 + DAT_0063c814);
      local_10 = FUN_005ae052(uVar2);
      if ((local_10 & 1) !== 0) {
        local_10 = local_10 - 1;
      }
      if ((uVar1 & 1) !== 0) {
        local_10 = local_10 + 1;
      }
      iVar3 = FUN_004087c0(local_10, uVar1);
      if (iVar3 !== 0) {
        FUN_00410402(local_10, uVar1);
      }
    } else {
      FUN_005013bc();
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00407658 — screen_right_click_to_tile
// ═══════════════════════════════════════════════════════════════════
export function FUN_00407658(param_1, param_2) {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;

  param_1 = param_1 - DAT_0063c93c;
  param_2 = param_2 - DAT_0063c940;
  if ((((-1 < param_1) && (-1 < param_2)) && (param_1 < DAT_0063c944)) && (param_2 < DAT_0063c948))
  {
    if (DAT_0062edf8 === 0) {
      uVar1 = FUN_005adfa0(DAT_0063c810 + ((param_2 - _DAT_0063caf0) / DAT_0063c804) | 0,
                           DAT_0063c810, DAT_0063c810 + DAT_0063c808 + -1);
      if ((uVar1 & 1) === 0) {
        local_1c = 0;
      } else {
        local_1c = DAT_0063c800 >> 1;
      }
      uVar2 = FUN_005adfa0((((param_1 - (DAT_0063caf4 + local_1c)) / DAT_0063c800) | 0) * 2 +
                           DAT_0063c814, DAT_0063c814, DAT_0063c80c * 2 + -2 + DAT_0063c814);
      local_18 = FUN_005ae052(uVar2);
      if ((local_18 & 1) !== 0) {
        local_18 = local_18 - 1;
      }
      if ((uVar1 & 1) !== 0) {
        local_18 = local_18 + 1;
      }
      iVar3 = FUN_004087c0(local_18, uVar1);
      if (iVar3 !== 0) {
        local_10 = -1;
        for (local_c = 1; local_c < 8; local_c = local_c + 1) {
          // *(short *)(&DAT_0066ca84 + local_c * 0x3f0)
          if (DAT_0066ca84[local_c * 0x3f0] === 0 && DAT_0066ca84[local_c * 0x3f0 + 1] === 0) {
            local_10 = local_c;
            break;
          }
        }
        if (0 < local_10) {
          FUN_00413717();
          FUN_00410402(local_18, uVar1);
        }
      }
    } else {
      FUN_005013bc();
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040785b — setup_main_window_rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040785b() {
  let iVar1;
  let local_18;
  let local_14;
  let local_10;

  iVar1 = FUN_004080c0();
  local_14 = 0xa0;
  local_18 = 100;
  if ((1000 < DAT_006acbb0 + iVar1) && (local_14 = 0xf0, DAT_00628060 !== 0)) {
    local_18 = 0x96;
  }
  if (local_18 < DAT_006d1162) {
    local_18 = DAT_006d1162;
  }
  local_14 = local_14 + DAT_0063359c * 2;
  local_10 = 0;
  if (DAT_00628060 !== 0) {
    local_10 = DAT_0064bcf4 + 1;
  }
  FUN_004086c0(DAT_00655324, iVar1 - (DAT_006335a0 + local_14), local_10,
               local_14 + DAT_006335a0, local_18 + DAT_0063359c + DAT_00633598 + DAT_006335a4);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040795a — invalidate_main_rect_A
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040795a() {
  FUN_004080f0(DAT_00655324);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00407980 — invalidate_main_rect_B
// ═══════════════════════════════════════════════════════════════════
export function FUN_00407980() {
  FUN_004080f0(DAT_00655324);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004079a6 — init_map_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_004079a6() {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;

  DAT_00624ee0 = 0;
  if ((DAT_00628048 === 0) || (DAT_00655280 === 0)) {
    FUN_0040785b();
  }
  uVar9 = 0;
  uVar8 = 0;
  uVar7 = 6;
  iVar1 = FUN_00407fc0(DAT_00655324, 6, 0, 0);
  iVar1 = iVar1 - DAT_006335a4;
  iVar2 = FUN_00407f90(DAT_00655324, iVar1);
  iVar2 = iVar2 - DAT_006335a0;
  uVar4 = 6;
  uVar5 = DAT_00655324;
  uVar6 = DAT_00655328;
  uVar3 = FUN_00428b0c(0, 6, DAT_00655324, DAT_00655328, iVar2);
  FUN_005534bc(uVar3, uVar4, uVar5, uVar6, iVar2, iVar1, uVar7, uVar8, uVar9);
  FUN_00408370(0x28, 0x19);
  CPropertySheet_EnableStackedTabs(DAT_0063c818, 0x402581);
  FUN_00408130(0);  // LAB_004022de
  FUN_00408170(0);  // LAB_00401942
  COleControlSite_SetDlgCtrlID(DAT_0063c870, 0x402cd4);
  // tie(thunk_map_ascii) — library function, no-op
  FUN_00408010(0x1ff);
  FUN_00408050(1);
  FUN_00408270(0);  // LAB_00403d05
  FUN_004082b0(0);  // LAB_00401956
  FUN_00408230(0);  // LAB_0040322e
  FUN_004082f0(0);  // LAB_004012a8
  FUN_00408330(0);  // LAB_00403931
  FUN_005bb574();
  if (DAT_00655b02 !== 1) {
    FUN_004085f0();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00407b31 — disable_map_and_invalidate
// ═══════════════════════════════════════════════════════════════════
export function FUN_00407b31() {
  DAT_00624ee0 = 1;
  FUN_004083b0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00407f90 — get_rect_width
// ═══════════════════════════════════════════════════════════════════
export function FUN_00407f90(param_1, param_2) {
  // Original: return param_1[2] - *param_1
  // In JS, param_1 is treated as a struct-like with array indexing
  return 0; // stub: requires pointer arithmetic
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00407fc0 — get_rect_height
// ═══════════════════════════════════════════════════════════════════
export function FUN_00407fc0(param_1) {
  // Original: return *(int *)(param_1 + 0xc) - *(int *)(param_1 + 4)
  return 0; // stub: requires pointer arithmetic
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00407ff0 — call_draw_sprites
// ═══════════════════════════════════════════════════════════════════
export function FUN_00407ff0() {
  FUN_005bbbce();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408010 — set_window_style
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408010(param_1) {
  // Original uses in_ECX (this pointer), stub
  FUN_005bd05f(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408050 — invalidate_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408050(param_1) {
  // Original uses in_ECX (this pointer), stub
  invalidate_CE5F(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408090 — manage_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408090() {
  // Original uses in_ECX (this pointer), stub
  manage_window_C636(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004080c0 — get_window_extent
// ═══════════════════════════════════════════════════════════════════
export function FUN_004080c0() {
  // Original uses in_ECX (this pointer), stub
  FUN_005bc933(0);
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004080f0 — invalidate_rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_004080f0(param_1) {
  // Original uses in_ECX (this pointer), stub
  FUN_005bcb85(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408130 — set_callback_0c
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408130(param_1) {
  // Original: swaps in_ECX + 0xc with param_1
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408170 — set_callback_18
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408170(param_1) {
  // Original: swaps in_ECX + 0x18 with param_1
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408230 — set_callback_30
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408230(param_1) {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408270 — set_callback_34
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408270(param_1) {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004082b0 — set_callback_38
// ═══════════════════════════════════════════════════════════════════
export function FUN_004082b0(param_1) {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004082f0 — set_callback_40
// ═══════════════════════════════════════════════════════════════════
export function FUN_004082f0(param_1) {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408330 — set_callback_44
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408330(param_1) {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408370 — set_tile_dimensions
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408370(param_1, param_2) {
  // Original: in_ECX + 0x7c = param_1; in_ECX + 0x80 = param_2
  // stub - uses this pointer
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004083b0 — invalidate_and_reset
// ═══════════════════════════════════════════════════════════════════
export function FUN_004083b0() {
  FUN_00408420();
  FUN_004083f0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004083f0 — reset_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_004083f0() {
  FUN_005bd65c(0, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408420 — swap_window_buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408420() {
  // Original uses in_ECX (this pointer), stub
  // uVar1 = manage_window_C0AB(*(in_ECX + 8))
  // *(in_ECX + 8) = uVar1
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408460 — flush_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408460() {
  FUN_00408490(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408490 — blit_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408490(param_1) {
  // Original uses in_ECX (this pointer)
  // Involves FUN_005c0979 and FUN_00408580
  // stub — UI display logic
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408580 — blit_rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408580(param_1) {
  // Original uses in_ECX (this pointer)
  FUN_005bc6bb(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004085f0 — show_scrollbars
// ═══════════════════════════════════════════════════════════════════
export function FUN_004085f0() {
  FUN_00408620();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408620 — manage_scrollbar_visibility
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408620() {
  FUN_00408650();
  FUN_005c5b7f();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408650 — manage_window_C40A_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408650() {
  // Original uses in_ECX (this pointer), stub
  manage_window_C40A(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408680 — SetRect_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408680(param_1, param_2, param_3, param_4, param_5) {
  SetRect(param_1, param_2, param_3, param_4, param_5);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004086c0 — SetRect_with_width_height
// ═══════════════════════════════════════════════════════════════════
export function FUN_004086c0(param_1, param_2, param_3, param_4, param_5) {
  SetRect(param_1, param_2, param_3, param_4 + param_2, param_5 + param_3);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408700 — draw_rect_border
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408700(param_1, param_2) {
  FUN_005a98e4(DAT_00635c64, param_1[0], param_1[1], param_1[2] + -1, param_1[3] + -1, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408750 — set_fill_color
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408750(param_1) {
  FUN_005a9aa3(DAT_00635c64, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408780 — draw_tile
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408780(param_1, param_2, param_3, param_4, param_5) {
  FUN_005a9abf(DAT_00635c64, param_1, param_2, param_3, param_4, param_5);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408830 — fill_tile_data_column
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408830(param_1, param_2) {
  let local_8;
  // param_1 is an offset into tile data, param_2 is the fill value
  // Iterates through all tiles, setting one byte every 6 bytes
  for (local_8 = 0; local_8 < DAT_006d1164; local_8 = local_8 + 1) {
    if (DAT_00636598) {
      DAT_00636598[param_1 + local_8 * 6] = param_2;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408873 — fill_tile_data_rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408873(param_1, param_2, param_3, param_4, param_5, param_6) {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = ((DAT_006d1160 * param_3 + param_2) * 6) & 0xffff;
  for (local_10 = 0; local_10 < param_5; local_10 = local_10 + 1) {
    local_8 = local_14;
    for (local_c = 0; local_c < param_4; local_c = local_c + 1) {
      if (DAT_00636598) {
        DAT_00636598[param_1 + local_8] = param_6;
      }
      local_8 = local_8 + 6;
    }
    local_14 = local_14 + DAT_006d1160 * 6;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408903 — copy_tile_data_column
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408903(param_1, param_2) {
  let local_8;
  // param_1 = dest offset, param_2 = src offset
  // Copies one byte per tile entry (every 6 bytes)
  for (local_8 = 0; local_8 < DAT_006d1164; local_8 = local_8 + 1) {
    if (DAT_00636598) {
      DAT_00636598[param_1 + local_8 * 6] = DAT_00636598[param_2 + local_8 * 6];
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040894c — progress_update_and_draw_sprites
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040894c() {
  FUN_00407ff0();
  if (2 < DAT_00655b02) {
    FUN_0047e94e(1, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040897f — calculate_city_site_values
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040897f() {
  let bVar1;
  let pbVar2;
  let iVar3;
  let local_84;
  let aiStack_80 = new Array(22).fill(0);
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  for (local_28 = 0; local_28 < 0x40; local_28 = local_28 + 1) {
    // *(short *)(&DAT_00666132 + local_28 * 0x10) = 0
    DAT_00666132[local_28 * 0x10] = 0;
    DAT_00666132[local_28 * 0x10 + 1] = 0;
  }
  for (local_1c = 0; local_1c < 0x16; local_1c = local_1c + 1) {
    iVar3 = local_1c % 0xb;
    aiStack_80[local_1c] =
         s8(DAT_00627cca[local_1c * 0x18]) * 3 + s8(DAT_00627ccc[local_1c * 0x18]);
    if (iVar3 !== 2) {
      aiStack_80[local_1c] = aiStack_80[local_1c] + s8(DAT_00627ccb[local_1c * 0x18]) * 2;
    }
    if (DAT_00627ccf[iVar3 * 0x18] === -2) {
      if (iVar3 === 4) {
        aiStack_80[local_1c] = aiStack_80[local_1c] + 3;
      } else {
        aiStack_80[local_1c] = aiStack_80[local_1c] + 1;
      }
    } else if (s8(DAT_00627cce[iVar3 * 0x18]) === -2) {
      aiStack_80[local_1c] = aiStack_80[local_1c] + 2;
    }
  }
  for (local_24 = 0; local_24 < DAT_006d1162; local_24 = local_24 + 1) {
    for (local_20 = (local_24 & 1) !== 0 ? 1 : 0; local_20 < DAT_006d1160;
        local_20 = local_20 + 2) {
      bVar1 = FUN_005b89bb(local_20, local_24);
      local_1c = bVar1;
      if ((local_1c === 2) || (local_1c === 1)) {
        local_c = 0;
        for (local_10 = 0; local_10 < 0x15; local_10 = local_10 + 1) {
          local_8 = 0;
          local_14 = FUN_005ae052(s8(DAT_00628370[local_10]) + local_20);
          local_18 = s8(DAT_006283a0[local_10]) + local_24;
          iVar3 = FUN_004087c0(local_14, local_18);
          if (iVar3 !== 0) {
            bVar1 = FUN_005b89bb(local_14, local_18);
            local_84 = bVar1;
            if ((local_84 === 2) && (iVar3 = FUN_0040bcb0(local_14, local_18), iVar3 !== 0)) {
              local_8 = local_8 + 2;
            }
            iVar3 = FUN_005b8ee1(local_14, local_18);
            if ((iVar3 !== 0) && (local_10 !== 0x14)) {
              local_84 = local_84 + 0xb;
            }
            local_8 = local_8 + aiStack_80[local_84];
            // pbVar2 = FUN_005b8931(local_14, local_18)
            let tileOff = FUN_005b8931(local_14, local_18);
            let byte0 = tileRead(tileOff, 0);
            if ((byte0 & 0x80) !== 0) {
              local_8 = local_8 + 1;
            }
            if (((local_10 < 8) || (iVar3 = local_8, local_10 === 0x14)) &&
               (iVar3 = local_8 * 2, local_10 === 0x14)) {
              local_8 = local_8 * 4;
              let tileOff2 = FUN_005b8931(local_14, local_18);
              let byte02 = tileRead(tileOff2, 0);
              iVar3 = local_8;
              if ((byte02 & 0x80) !== 0) {
                iVar3 = local_8 + ((local_8 / 2) | 0);
              }
            }
            local_8 = iVar3;
            local_c = local_c + local_8;
          }
        }
        if ((local_1c !== 1) && (iVar3 = FUN_0040bcb0(local_20, local_24), iVar3 === 0)) {
          local_c = local_c + -0x10;
        }
        iVar3 = FUN_005adfa0((local_c + -0x78) >> 3, 1, 0xf);
        local_8 = (iVar3 >> 1) + 8;
        local_28 = FUN_005b8a81(local_20, local_24);
        if (-1 < local_28) {
          // *(short *)(&DAT_00666132 + local_28 * 0x10) += 1
          let val = DAT_00666132[local_28 * 0x10] | (DAT_00666132[local_28 * 0x10 + 1] << 8);
          val = val + 1;
          DAT_00666132[local_28 * 0x10] = val & 0xff;
          DAT_00666132[local_28 * 0x10 + 1] = (val >> 8) & 0xff;
        }
        let tileOff3 = FUN_005b8931(local_20, local_24);
        tileWrite(tileOff3, 5, (local_8 + -0x10) & 0xff);
      } else {
        let tileOff4 = FUN_005b8931(local_20, local_24);
        tileWrite(tileOff4, 5, 0xf0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00408d33 — generate_map (main map generation)
// This is a very large function (6004 bytes). Many details are
// map generation logic involving terrain assignment, temperature
// zones, coastlines, rivers, etc.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00408d33(param_1) {
  let bVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let puVar5;
  let uVar6;
  let iVar7;
  let local_3ec;
  let local_3e4;
  let local_3dc;
  let local_3d4;
  let local_3bc;
  let local_3b8;
  let local_3b4;
  let local_3b0;
  let local_3ac;
  let local_398;
  let local_390;
  let local_388 = new Array(11).fill(0);
  let local_35c;
  let local_358;
  let local_354;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;  // pointer offset
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;  // pointer offset
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  FUN_0059db08(0x4000);
  FUN_0040bc40(8);
  FUN_0059e783(-(((((DAT_006ab198 + -0x280 + ((DAT_006ab198 + -0x280) >> 31 & 7)) >>> 0) >> 3) + 1) | 0),
               -(((((DAT_006ab19c + -0x1e0 + ((DAT_006ab19c + -0x1e0) >> 31 & 7)) >>> 0) >> 3) + 1) | 0));
  uVar2 = FUN_00428b0c(0);
  FUN_0059e6a9(uVar2);
  FUN_0059e6ff(0x100);
  FUN_0059e18b(DAT_00624efc, 0xffffffff, 0xffffffff, 0xffffffff, 0);
  FUN_0040bbb0();
  FUN_0040bbe0(DAT_00624f00);
  FUN_0040bc10(8);
  FUN_0059e18b(DAT_00679640, 0xffffffff, 0xffffffff, 0xffffffff, 0);
  FUN_0059e18b(DAT_00624f04, 0xffffffff, 0xffffffff, 0xffffffff, 0);
  FUN_0040bc80(0);
  FUN_00408010(0x200);
  FUN_00408010(0x200);
  FUN_00484d52();

  if (param_1 === 0) {
    for (local_398 = 0; local_398 < 0x15; local_398 = local_398 + 1) {
      DAT_00627fe0[local_398 * 2] = 0xff;
      DAT_00627fe0[local_398 * 2 + 1] = 0xff;
      DAT_00628010[local_398 * 2] = 0xff;
      DAT_00628010[local_398 * 2 + 1] = 0xff;
    }
    FUN_005b85fe();
    if ((DAT_00655ae8 & 0x8000) !== 0) {
      DAT_00624ef4 = DAT_00624ef4 << 1;
      DAT_00624ef0 = DAT_00624ef0 << 1;
    }
    DAT_006d1166 = DAT_00655ae8 & 0x8000;
    FUN_005b7fe0();
    DAT_0063cba4 = 0;
    FUN_00408830(0, 10);     // fill terrain column with ocean(10)
    FUN_00408830(1, 0);      // fill improvements column with 0
    DAT_0063cba0 = 0;
    DAT_0063cb94 = DAT_006d1162 + -1;
    DAT_0063cb9c = 3;
    DAT_0063cb98 = DAT_006d1160 + -3;
    uVar3 = _rand();
    uVar6 = uVar3 >> 31;
    local_44 = ((uVar3 ^ uVar6) - uVar6 & 1 ^ uVar6) - uVar6;
    if (local_44 === 0) {
      DAT_0063cb94 = DAT_006d1162 + -5;
    } else {
      DAT_0063cba0 = 4;
    }
    iVar4 = DAT_00624eec;
    if (DAT_00624eec < 1) {
      iVar4 = 0;
    }
    local_20 = ((DAT_006d1162 * DAT_006d1160) >> 1) / 400;
    local_14 = ((local_20 * ((DAT_00624ee8 * 8 + 8 + iVar4 * 8) * 5 + 0x50) * 8) / 10) | 0;
    do {
      FUN_0040a572(0);
    } while (DAT_0063cba4 < local_14);

    FUN_004b32fe();
    local_358 = 0;
    for (local_48 = 0; local_48 < 0x40; local_48 = local_48 + 1) {
      let v = DAT_00666130[local_48 * 0x10] | (DAT_00666130[local_48 * 0x10 + 1] << 8);
      if (v !== 0) {
        local_358 = local_358 + 1;
      }
    }
    local_24 = 0x40 - (local_358 + 1);
    if (0 < local_24) {
      for (local_48 = 0; local_48 < local_24; local_48 = local_48 + 1) {
        FUN_0040a572(1);
      }
    }

    // Smooth coastlines
    for (local_354 = 1; local_354 < DAT_006d1162 + -2; local_354 = local_354 + 1) {
      for (local_5c = local_354 & 1; local_5c < DAT_006d1160 + -2; local_5c = local_5c + 2) {
        local_38 = 0;
        let t1 = FUN_005b8931(local_5c, local_354);
        if (tileRead(t1, 1) !== 0) {
          local_38 = local_38 | 1;
        }
        let t2 = FUN_005b8931(local_5c + 1, local_354 + 1);
        if (tileRead(t2, 1) !== 0) {
          local_38 = local_38 | 2;
        }
        let t3 = FUN_005b8931(local_5c + 1, local_354 - 1);
        if (tileRead(t3, 1) !== 0) {
          local_38 = local_38 | 4;
        }
        let t4 = FUN_005b8931(local_5c + 2, local_354);
        if (tileRead(t4, 1) !== 0) {
          local_38 = local_38 | 8;
        }
        if ((local_38 === 6) || (local_38 === 9)) {
          tileWrite(FUN_005b8931(local_5c + 1, local_354 + 1), 1, 1);
          tileWrite(FUN_005b8931(local_5c + 1, local_354 - 1), 1, 1);
          tileWrite(FUN_005b8931(local_5c + 2, local_354), 1, 1);
          if ((local_5c < 2) || (local_354 < 2)) {
            if (local_354 < 2) {
              if (1 < local_5c) {
                local_5c = local_5c - 2;
              }
            } else {
              local_354 = local_354 - 1;
              local_5c = local_5c + 1;
            }
          } else {
            local_5c = local_5c - 1;
            local_354 = local_354 - 1;
          }
        }
      }
    }

    FUN_0040894c();

    // Determine polar cap size
    if ((DAT_00655ae8 & 0x8000) === 0) {
      local_4c = (DAT_006d1162 / 0xc) | 0;
    } else {
      local_4c = ((DAT_006d1162 + ((DAT_006d1162 >> 31) & 7)) >>> 0) >> 3;
    }
    if (local_4c < 3) {
      local_4c = 2;
    }

    // Assign terrain types based on land mass indicators
    local_50 = 0;   // offset into tile data
    local_354 = 0;
    local_5c = 0;
    for (local_30 = 0; local_30 < DAT_006d1164; local_30 = local_30 + 1) {
      local_35c = DAT_00636598 ? DAT_00636598[local_50 * 6 + 1] : 0;
      if (local_35c === 0) {
        local_38 = 10;
      } else if (local_35c === 1) {
        local_58 = DAT_00624ef0 * -3;
        if ((DAT_00655ae8 & 0x8000) !== 0) {
          local_58 = DAT_00624ef0 * -6;
        }
        iVar7 = (DAT_006d1162 >> 1) + 8;
        uVar3 = _rand();
        uVar6 = uVar3 >> 31;
        iVar4 = local_354 + (((uVar3 ^ uVar6) - uVar6 & 0xf ^ uVar6) - uVar6) + 1;
        if (iVar7 === iVar4 || iVar7 - iVar4 < 0) {
          iVar4 = DAT_006d1162;
          uVar3 = _rand();
          uVar6 = uVar3 >> 31;
          local_28 = ~(((iVar4 >> 1) + 8) -
                    (local_354 + (((uVar3 ^ uVar6) - uVar6 & 0xf ^ uVar6) - uVar6) + 1)) + 1;
        } else {
          iVar4 = DAT_006d1162;
          uVar3 = _rand();
          uVar6 = uVar3 >> 31;
          local_28 = ((iVar4 >> 1) + 8) -
                   (local_354 + (((uVar3 ^ uVar6) - uVar6 & 0xf ^ uVar6) - uVar6) + 1);
        }
        local_28 = local_28 + local_58;
        if (local_28 < 1) {
          local_28 = 0;
        }
        local_28 = (local_28 / local_4c) | 0;
        switch(local_28) {
        case 0:
          local_38 = 0; break;
        case 1: case 2: case 3:
          local_38 = 1; break;
        case 4:
          uVar3 = _rand();
          uVar6 = uVar3 >> 31;
          if (((uVar3 ^ uVar6) - uVar6 & 1 ^ uVar6) === uVar6) {
            local_38 = 1;
          } else {
            local_38 = 6;
          }
          break;
        case 5: case 6:
          local_38 = 6; break;
        default:
          local_38 = 7;
        }
      } else if (local_35c === 2) {
        local_38 = 4;
      } else {
        local_38 = 5;
      }
      if (DAT_00636598) {
        DAT_00636598[local_50 * 6] = local_38;
      }
      local_50 = local_50 + 1;
      local_5c = local_5c + 2;
      if (DAT_006d1160 <= local_5c) {
        local_354 = local_354 + 1;
        local_5c = local_354 & 1;
      }
      FUN_0040894c();
    }

    // Forward temperature pass
    local_50 = 0;
    local_34 = DAT_006d1164 - 1;
    for (local_354 = 0; local_354 < DAT_006d1162; local_354 = local_354 + 1) {
      if ((DAT_006d1162 >> 1) === local_354 || ((DAT_006d1162 >> 1) - local_354) < 0) {
        local_28 = ~(((DAT_006d1162 >> 1) - local_354)) + 1;
      } else {
        local_28 = ((DAT_006d1162 >> 1) - local_354);
      }
      if ((DAT_006d1162 >> 2) === local_28 || ((DAT_006d1162 >> 2) - local_28) < 0) {
        local_3ac = ~(((DAT_006d1162 >> 2) - local_28)) + 1;
      } else {
        local_3ac = ((DAT_006d1162 >> 2) - local_28);
      }
      if (DAT_00624ef4 * 4 + 4 + local_3ac < 1) {
        local_54 = 0;
      } else {
        if ((DAT_006d1162 >> 2) === local_28 || ((DAT_006d1162 >> 2) - local_28) < 0) {
          local_3b0 = ~(((DAT_006d1162 >> 2) - local_28)) + 1;
        } else {
          local_3b0 = ((DAT_006d1162 >> 2) - local_28);
        }
        local_54 = _rand();
        local_54 = local_54 % (DAT_00624ef4 * 4 + local_3b0 + 5);
      }
      for (local_5c = (local_354 & 1) !== 0 ? 1 : 0; local_5c < DAT_006d1160;
          local_5c = local_5c + 2) {
        bVar1 = DAT_00636598 ? DAT_00636598[local_50 * 6] : 10;
        if (bVar1 === 10) {
          if ((DAT_006d1162 >> 2) === local_28 || ((DAT_006d1162 >> 2) - local_28) < 0) {
            local_3b4 = ~(((DAT_006d1162 >> 2) - local_28)) + 1;
          } else {
            local_3b4 = ((DAT_006d1162 >> 2) - local_28);
          }
          if (local_54 < DAT_00624ef4 * 4 + 4 + local_3b4) {
            local_54 = local_54 + 1;
          }
        } else if (0 < local_54) {
          if (DAT_00624ef4 * -2 !== -6 && -1 < DAT_00624ef4 * -2 + 6) {
            iVar4 = _rand();
            local_54 = local_54 - iVar4 % (DAT_00624ef4 * -2 + 7);
          }
          switch(bVar1) {
          case 0:
            if (DAT_00636598) DAT_00636598[local_50 * 6] = 1; break;
          case 1:
            if (DAT_00636598) DAT_00636598[local_50 * 6] = 2; break;
          case 4:
            if (DAT_00636598) DAT_00636598[local_50 * 6] = 3; break;
          case 5:
            local_54 = local_54 + -3; break;
          case 6:
            if (DAT_00636598) DAT_00636598[local_50 * 6] = 3; break;
          }
        }
        local_50 = local_50 + 1;
      }

      // Reverse temperature pass
      local_54 = 0;
      for (local_5c = DAT_006d1160 - ((local_354 & 1) + 1); -1 < local_5c;
          local_5c = local_5c - 2) {
        bVar1 = DAT_00636598 ? DAT_00636598[local_34 * 6] : 10;
        if (bVar1 === 10) {
          if (local_54 < ((local_28 >> 1) + DAT_00624ef4 + 1)) {
            local_54 = local_54 + 1;
          }
        } else if (0 < local_54) {
          iVar4 = -(DAT_00624ef4 * 2 + 2);
          if (iVar4 !== -6 && -1 < iVar4 + 6) {
            iVar4 = _rand();
            local_54 = local_54 - iVar4 % (7 - (DAT_00624ef4 * 2 + 2));
          }
          switch(bVar1) {
          case 0:
            if (DAT_00636598) DAT_00636598[local_34 * 6] = 1; break;
          case 1:
            if (DAT_00636598) DAT_00636598[local_34 * 6] = 2; break;
          case 2:
            if (local_28 < ((DAT_006d1162 * 3) / 10) | 0) {
              if (local_28 < 10) {
                if (DAT_00636598) DAT_00636598[local_34 * 6] = 9;
              } else {
                if (DAT_00636598) DAT_00636598[local_34 * 6] = 8;
              }
            } else {
              if (DAT_00636598) DAT_00636598[local_34 * 6] = 3;
            }
            local_54 = local_54 + -2;
            break;
          case 4:
            if (DAT_00636598) DAT_00636598[local_34 * 6] = 3; break;
          case 5:
            local_54 = local_54 + -3; break;
          case 6:
            if (DAT_00636598) DAT_00636598[local_34 * 6] = 1; break;
          case 8:
            if (DAT_00636598) DAT_00636598[local_34 * 6] = 3; break;
          }
        }
        local_34 = local_34 + -1;
      }
      FUN_0040894c();
    }

    // Random terrain mutation pass
    for (local_48 = 0; local_48 < (DAT_00624ef8 * 5 + 10) * 0xa0; local_48 = local_48 + 1) {
      if ((local_48 & 1) === 0) {
        if (DAT_006d1162 === 1 || DAT_006d1162 + -1 < 0) {
          local_354 = 0;
        } else {
          iVar4 = _rand();
          local_354 = iVar4 % DAT_006d1162;
        }
        if ((DAT_006d1160 / 2) | 0 === 1 || (DAT_006d1160 / 2) | 0 + -1 < 0) {
          local_3b8 = 0;
        } else {
          local_3b8 = _rand();
          local_3b8 = local_3b8 % ((DAT_006d1160 / 2) | 0);
        }
        local_5c = (local_354 & 1) + local_3b8 * 2;
      } else {
        uVar3 = _rand();
        uVar6 = uVar3 >> 31;
        iVar4 = ((uVar3 ^ uVar6) - uVar6 & 7 ^ uVar6) - uVar6;
        local_5c = FUN_005ae052(s8(DAT_00628350[iVar4]) + local_5c);
        local_354 = local_354 + s8(DAT_00628360[iVar4]);
      }
      if ((DAT_006d1162 >> 1) === local_354 || ((DAT_006d1162 >> 1) - local_354) < 0) {
        local_28 = ~(((DAT_006d1162 >> 1) - local_354)) + 1;
      } else {
        local_28 = ((DAT_006d1162 >> 1) - local_354);
      }
      iVar4 = FUN_004087c0(local_5c, local_354);
      if (iVar4 !== 0) {
        let tOff = FUN_005b8931(local_5c, local_354);
        let curTerr = tileRead(tOff, 0);
        switch(curTerr) {
        case 0: tileWrite(tOff, 0, 1); break;
        case 1: tileWrite(tOff, 0, 4); break;
        case 2: tileWrite(tOff, 0, 3); break;
        case 3:
          if (local_28 < ((DAT_006d1162 * 3) / 10) | 0) {
            tileWrite(tOff, 0, 9);
          } else {
            tileWrite(tOff, 0, 1);
          }
          break;
        case 4: tileWrite(tOff, 0, 5); break;
        case 5: FUN_0040ab41(local_5c, local_354); break;
        case 6: tileWrite(tOff, 0, 4); break;
        case 7: tileWrite(tOff, 0, 5); break;
        case 8: tileWrite(tOff, 0, 2); break;
        case 9: tileWrite(tOff, 0, 8); break;
        }
      }
    }
    FUN_0040894c();

    // Ocean smoothing pass
    for (local_48 = 0; local_48 < (3 - (DAT_00624ef8 + 2)) * 800; local_48 = local_48 + 1) {
      if ((local_48 & 1) === 0) {
        if (DAT_006d1162 === 1 || DAT_006d1162 + -1 < 0) {
          local_354 = 0;
        } else {
          iVar4 = _rand();
          local_354 = iVar4 % DAT_006d1162;
        }
        if ((DAT_006d1160 / 2) | 0 === 1 || (DAT_006d1160 / 2) | 0 + -1 < 0) {
          local_3bc = 0;
        } else {
          local_3bc = _rand();
          local_3bc = local_3bc % ((DAT_006d1160 / 2) | 0);
        }
        local_5c = (local_354 & 1) + local_3bc * 2;
        local_390 = 0xffffffff;
      } else {
        uVar3 = _rand();
        uVar6 = uVar3 >> 31;
        iVar4 = ((uVar3 ^ uVar6) - uVar6 & 7 ^ uVar6) - uVar6;
        local_5c = FUN_005ae052(s8(DAT_00628350[iVar4]) + local_5c);
        local_354 = local_354 + s8(DAT_00628360[iVar4]);
      }
      iVar4 = FUN_004087c0(local_5c, local_354);
      if ((iVar4 !== 0) && (iVar4 = FUN_005b89e4(local_5c, local_354), iVar4 === 0)) {
        bVar1 = FUN_005b89bb(local_5c, local_354);
        local_40 = bVar1;
        if ((local_390 < 0) || (local_390 !== local_40)) {
          local_2c = (2 < local_40) ? 1 : 0;
          let tOff = FUN_005b8931(local_5c, local_354);
          for (local_40 = 0; local_40 < 0xb; local_40 = local_40 + 1) {
            local_388[local_40] = 0;
          }
          if (DAT_00624ef4 === -1) {
            local_388[0] = local_388[0] + 1;
            local_388[1] = local_388[1] + 1;
            local_388[8] = local_388[8] + -1;
          } else if (DAT_00624ef4 === 1) {
            local_388[2] = local_388[2] + 1;
            local_388[8] = local_388[8] + 1;
            if (-1 < DAT_00624ef0) {
              local_388[9] = local_388[9] + 1;
            }
          }
          if (DAT_00624ef0 === -1) {
            local_388[6] = local_388[6] + 1;
            local_388[3] = local_388[3] + 1;
            local_388[0] = local_388[0] + -1;
          } else if (DAT_00624ef0 === 1) {
            local_388[1] = local_388[1] + 1;
            local_388[6] = local_388[6] + -1;
            local_388[7] = local_388[7] + -1;
            if (DAT_00624ef4 === -1) {
              local_388[2] = local_388[2] + -1;
              local_388[9] = local_388[9] + -1;
            }
          }
          for (local_30 = 0; local_30 < 8; local_30 = local_30 + 1) {
            uVar2 = FUN_005ae052(s8(DAT_00628350[local_30]) + local_5c);
            local_3c = s8(DAT_00628360[local_30]) + local_354;
            iVar4 = FUN_004087c0(uVar2, local_3c);
            if (iVar4 !== 0) {
              bVar1 = FUN_005b89bb(uVar2, local_3c);
              local_40 = bVar1;
              if (local_40 !== 10) {
                if (((2 < local_40) && (local_2c !== 0)) && (local_388[local_40] !== 0)) {
                  local_388[local_40] = local_388[local_40] + 1;
                }
                if ((local_30 & 1) === 0) {
                  local_388[local_40] = local_388[local_40] + 1;
                }
                local_388[local_40] = local_388[local_40] + 1;
              }
            }
          }
          local_1c = 0;
          for (local_40 = 0; local_40 < 0xb; local_40 = local_40 + 1) {
            if (local_1c < local_388[local_40]) {
              local_1c = local_388[local_40];
              tileWrite(tOff, 0, local_40);
              local_390 = local_40;
            }
          }
        }
      }
    }
    FUN_0040894c();
    FUN_0040ac5a();
    FUN_0040894c();
  }

  // Round earth polar caps
  if ((DAT_00655ae8 & 0x8000) === 0) {
    for (local_5c = 0; local_5c < DAT_006d1160; local_5c = local_5c + 2) {
      iVar4 = FUN_005b89e4(local_5c + 1, 1);
      if (iVar4 === 0) {
        let tOff = FUN_005b8931(local_5c, 0);
        tileWrite(tOff, 0, 7);
      }
      iVar4 = FUN_005b89e4(local_5c, DAT_006d1162 + -2);
      if (iVar4 === 0) {
        let tOff = FUN_005b8931(local_5c + 1, DAT_006d1162 + -1);
        tileWrite(tOff, 0, 7);
      }
    }
  }
  FUN_004b32fe();
  FUN_0055a980();
  FUN_0040897f();

  if ((DAT_00655ae8 & 0x8000) === 0) {
    for (local_5c = 0; local_5c < DAT_006d1160; local_5c = local_5c + 2) {
      let tOff1 = FUN_005b8931(local_5c, 0);
      tileWrite(tOff1, 0, 7);
      let tOff2 = FUN_005b8931(local_5c + 1, DAT_006d1162 + -1);
      tileWrite(tOff2, 0, 7);
    }
    if (param_1 === 0) {
      for (local_48 = 0; local_48 < (DAT_006d1160 >> 3); local_48 = local_48 + 1) {
        let halfW = (DAT_006d1160 / 2) | 0;
        if (halfW === 1 || halfW + -1 < 0) { local_3d4 = 0; }
        else { local_3d4 = _rand(); local_3d4 = local_3d4 % halfW; }
        tileWrite(FUN_005b8931(local_3d4 * 2, 0), 0, 6);

        if (halfW === 1 || halfW + -1 < 0) { local_3dc = 0; }
        else { local_3dc = _rand(); local_3dc = local_3dc % halfW; }
        tileWrite(FUN_005b8931(local_3dc * 2 + 1, 1), 0, 6);

        if (halfW === 1 || halfW + -1 < 0) { local_3e4 = 0; }
        else { local_3e4 = _rand(); local_3e4 = local_3e4 % halfW; }
        tileWrite(FUN_005b8931(local_3e4 * 2 + 1, DAT_006d1162 + -1), 0, 6);

        if (halfW === 1 || halfW + -1 < 0) { local_3ec = 0; }
        else { local_3ec = _rand(); local_3ec = local_3ec % halfW; }
        tileWrite(FUN_005b8931(local_3ec * 2, DAT_006d1162 + -2), 0, 6);
      }
    }
  }

  FUN_00408830(1, 0);    // clear improvements

  // Place special resources on ocean
  if (DAT_00628060 === 0) {
    local_50 = 0;
    local_354 = 0;
    local_5c = 0;
    for (local_48 = 0; local_48 < DAT_006d1164; local_48 = local_48 + 1) {
      let curByte = DAT_00636598 ? DAT_00636598[local_50 * 6] : 10;
      if ((curByte === 10) && (iVar4 = FUN_005b8ee1(local_5c, local_354), iVar4 !== 0)) {
        local_18 = 0;
        for (local_30 = 0; (local_18 === 0 && (local_30 < 0x14)); local_30 = local_30 + 1) {
          uVar2 = FUN_005ae052(s8(DAT_00628370[local_30]) + local_5c);
          local_3c = s8(DAT_006283a0[local_30]) + local_354;
          iVar4 = FUN_004087c0(uVar2, local_3c);
          if ((iVar4 !== 0) && (iVar4 = FUN_005b89e4(uVar2, local_3c), iVar4 === 0)) {
            local_18 = 1;
          }
        }
        if (local_18 === 0) {
          if (DAT_00636598) DAT_00636598[local_50 * 6] = DAT_00636598[local_50 * 6] | 0x40;
        }
      }
      local_50 = local_50 + 1;
      local_5c = local_5c + 2;
      if (DAT_006d1160 <= local_5c) {
        local_354 = local_354 + 1;
        local_5c = local_354 & 1;
      }
      FUN_0040894c();
    }
  }

  // Copy first tile to dummy tile
  // FID_conflict__memcpy(&DAT_006d1188, DAT_00636598, 6);
  FUN_00408010(0x201);
  FUN_00484d52();
  FUN_0040a54e();
  FUN_0040a564();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a54e — cleanup_exception_A
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a54e() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a564 — cleanup_exception_B
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a564() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a572 — generate_continent
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a572(param_1) {
  let iVar1;
  let local_28;
  let local_24;
  let local_20;
  let local_8;

  FUN_00408830(5, 0);   // clear byte[5] column
  do {
    if (DAT_006d1160 === 0x11 || DAT_006d1160 + -0x11 < 0) {
      local_20 = 0;
    } else {
      local_20 = _rand();
      local_20 = local_20 % (DAT_006d1160 + -0x10);
    }
    local_20 = local_20 + 8;
    if (DAT_006d1162 === 9 || DAT_006d1162 + -9 < 0) {
      local_24 = 0;
    } else {
      local_24 = _rand();
      local_24 = local_24 % (DAT_006d1162 + -8);
    }
    local_24 = local_24 + 4;
    if (param_1 === 0) {
      if (DAT_00624eec === -1 || DAT_00624eec + 1 < 0) {
        local_28 = 0;
      } else {
        local_28 = _rand();
        local_28 = local_28 % (DAT_00624eec + 2);
      }
      if (local_28 !== 0) break;
    }
    iVar1 = FUN_005b8931(local_20, local_24);
  } while (tileRead(iVar1, 1) !== 0);

  if (param_1 === 0) {
    if (DAT_00624eec < 1) {
      FUN_0040a763(local_20, local_24);
    } else {
      FUN_0040a92f(local_20, local_24);
    }
  } else {
    iVar1 = _rand();
    FUN_0040aaa4(local_20, local_24);
    if (6 < iVar1 % 10) {
      FUN_0040aaa4(local_20, local_24);
    }
    if (8 < iVar1 % 10) {
      FUN_0040aaa4(local_20, local_24);
    }
  }

  // Copy generated tiles to improvement layer
  let off1c = 5;
  let off18 = 1;
  for (local_8 = 0; local_8 < DAT_006d1164; local_8 = local_8 + 1) {
    if (DAT_00636598 && DAT_00636598[local_8 * 6 + 5] !== 0) {
      DAT_00636598[local_8 * 6 + 1] = DAT_00636598[local_8 * 6 + 1] + 1;
      DAT_0063cba4 = DAT_0063cba4 + 1;
    }
  }
  FUN_0040894c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a763 — grow_small_continent
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a763(param_1, param_2) {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_8;

  uVar1 = _rand();
  uVar3 = uVar1 >> 31;
  local_8 = ((uVar1 ^ uVar3) - uVar3 & 0x3f ^ uVar3) - uVar3;
  iVar2 = FUN_005b8931(param_1, param_2);
  if (tileRead(iVar2, 1) !== 0) {
    local_8 = local_8 >> 1;
  }
  local_8 = local_8 + 1;
  while (true) {
    if (local_8 === 0) break;
    iVar2 = FUN_0040a824(param_1, param_2);
    if (iVar2 === 0) break;
    FUN_0040a892(param_1, param_2);
    uVar1 = _rand();
    uVar3 = uVar1 >> 31;
    iVar2 = (((uVar1 ^ uVar3) - uVar3 & 3 ^ uVar3) - uVar3) * 2;
    param_1 = param_1 + s8(DAT_00628351[iVar2]);
    param_2 = param_2 + s8(DAT_00628361[iVar2]);
    local_8 = local_8 + -1;
  }
  FUN_0040894c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a824 — is_in_map_gen_bounds
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a824(param_1, param_2) {
  let uVar1;

  if (((DAT_00655ae8 & 0x8000) === 0) || ((DAT_0063cb9c <= param_1 && (param_1 <= DAT_0063cb98)))) {
    if ((param_2 < DAT_0063cba0) || (DAT_0063cb94 < param_2)) {
      uVar1 = 0;
    } else {
      uVar1 = 1;
    }
  } else {
    uVar1 = 0;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a892 — mark_continent_triangle
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a892(param_1, param_2) {
  FUN_0040a8db(param_1, param_2);
  FUN_0040a8db(param_1 + 1, param_2 + -1);
  FUN_0040a8db(param_1 + 1, param_2 + 1);
  FUN_0040894c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a8db — mark_tile_as_land
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a8db(param_1, param_2) {
  let uVar1;
  let iVar2;

  uVar1 = FUN_005ae052(param_1);
  iVar2 = FUN_0040a824(uVar1, param_2);
  if (iVar2 !== 0) {
    iVar2 = FUN_005b8931(uVar1, param_2);
    tileWrite(iVar2, 5, 1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040a92f — grow_large_continent
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040a92f(param_1, param_2) {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_8;

  local_8 = _rand();
  local_8 = local_8 % 0x30;
  iVar1 = FUN_005b8931(param_1, param_2);
  if (tileRead(iVar1, 1) !== 0) {
    local_8 = local_8 >> 1;
  }
  local_8 = local_8 + 1;
  while (true) {
    if (local_8 === 0) break;
    iVar1 = FUN_0040a824(param_1, param_2);
    if (iVar1 === 0) break;
    FUN_0040a892(param_1, param_2);
    uVar2 = _rand();
    uVar3 = uVar2 >> 31;
    if (((uVar2 ^ uVar3) - uVar3 & 3 ^ uVar3) === uVar3) {
      FUN_0040a892(param_1 + 2, param_2);
    }
    uVar2 = _rand();
    uVar3 = uVar2 >> 31;
    if (((uVar2 ^ uVar3) - uVar3 & 3 ^ uVar3) === uVar3) {
      FUN_0040a892(param_1 + -2, param_2);
    }
    uVar2 = _rand();
    uVar3 = uVar2 >> 31;
    if (((uVar2 ^ uVar3) - uVar3 & 3 ^ uVar3) === uVar3) {
      FUN_0040a892(param_1, param_2 + 2);
    }
    uVar2 = _rand();
    uVar3 = uVar2 >> 31;
    if (((uVar2 ^ uVar3) - uVar3 & 3 ^ uVar3) === uVar3) {
      FUN_0040a892(param_1, param_2 + -2);
    }
    uVar2 = _rand();
    uVar3 = uVar2 >> 31;
    iVar1 = (((uVar2 ^ uVar3) - uVar3 & 3 ^ uVar3) - uVar3) * 2;
    param_1 = param_1 + s8(DAT_00628351[iVar1]);
    param_2 = param_2 + s8(DAT_00628361[iVar1]);
    local_8 = local_8 + -1;
  }
  FUN_0040894c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040aaa4 — grow_small_island
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040aaa4(param_1, param_2) {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_8;

  uVar1 = _rand();
  uVar3 = uVar1 >> 31;
  local_8 = (((uVar1 ^ uVar3) - uVar3 & 0xf ^ uVar3) - uVar3) + 1;
  while (true) {
    if (local_8 === 0) break;
    iVar2 = FUN_0040a824(param_1, param_2);
    if (iVar2 === 0) break;
    FUN_0040a8db(param_1, param_2);
    uVar1 = _rand();
    uVar3 = uVar1 >> 31;
    iVar2 = (((uVar1 ^ uVar3) - uVar3 & 3 ^ uVar3) - uVar3) * 2;
    param_1 = param_1 + s8(DAT_00628350[iVar2]);
    param_2 = param_2 + s8(DAT_00628360[iVar2]);
    local_8 = local_8 + -1;
  }
  FUN_0040894c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ab41 — try_create_lake
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ab41(param_1, param_2) {
  let iVar1;
  let uVar2;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 === 0) {
    uVar2 = 0;
  } else if ((((param_1 < 2) || (param_2 < 2)) || (DAT_006d1160 + -2 <= param_1)) ||
          (DAT_006d1162 + -2 <= param_2)) {
    uVar2 = 0;
  } else {
    iVar1 = FUN_005b89e4(param_1 + -2, param_2);
    if (iVar1 === 0) {
      iVar1 = FUN_005b89e4(param_1 + 2, param_2);
      if (iVar1 === 0) {
        iVar1 = FUN_005b89e4(param_1, param_2 + -2);
        if (iVar1 === 0) {
          iVar1 = FUN_005b89e4(param_1, param_2 + 2);
          if (iVar1 === 0) {
            let tOff = FUN_005b8931(param_1, param_2);
            tileWrite(tOff, 0, 10);
            uVar2 = 1;
          } else {
            uVar2 = 0;
          }
        } else {
          uVar2 = 0;
        }
      } else {
        uVar2 = 0;
      }
    } else {
      uVar2 = 0;
    }
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ac5a — generate_rivers
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ac5a() {
  let bVar1;
  let cVar2;
  let bVar3;
  let uVar4;
  let iVar5;
  let pbVar6;
  let uVar7;
  let uVar8;
  let iVar9;
  let iVar10;
  let uVar11;
  let local_44;
  let local_3c;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_20;
  let local_14;
  let local_c;

  local_34 = 0;
  local_30 = 0;
  do {
    FUN_00408903(5, 0);   // copy terrain to byte[5]
    local_30 = local_30 + 1;
    local_2c = 0;
    do {
      if (DAT_006d1162 === 1 || DAT_006d1162 + -1 < 0) {
        local_28 = 0;
      } else {
        iVar5 = _rand();
        local_28 = iVar5 % DAT_006d1162;
      }
      uVar4 = local_28;
      if ((DAT_006d1160 / 2) | 0 === 1 || (DAT_006d1160 / 2) | 0 + -1 < 0) {
        local_44 = 0;
      } else {
        local_44 = _rand();
        local_44 = local_44 % ((DAT_006d1160 / 2) | 0);
      }
      local_20 = local_44 * 2;
      if ((local_28 & 1) !== 0) {
        local_20 = local_20 + 1;
      }
      iVar5 = local_20;
      let tOff = FUN_005b8931(local_20, local_28);
      bVar1 = tileRead(tOff, 0);
    } while ((bVar1 === 5) || (bVar1 === 10));

    uVar7 = _rand();
    local_3c = uVar7 >> 31;
    local_3c = ((uVar7 ^ local_3c) - local_3c & 3 ^ local_3c) - local_3c;

    do {
      switch(bVar1) {
      case 0:
        bVar1 = 1;
        iVar9 = _rand();
        if ((1 < iVar9 % 10) || (3 < local_2c)) {
          bVar1 = 2;
        }
        break;
      case 1:
        iVar9 = _rand();
        if (3 < iVar9 % 10) {
          bVar1 = 2;
        }
        break;
      case 3:
        iVar9 = _rand();
        if (2 < iVar9 % 10) {
          bVar1 = 2;
        }
        break;
      case 4:
      case 5:
        bVar1 = 2;
        break;
      case 6:
        bVar1 = 1;
        break;
      case 7:
        bVar1 = 6;
        break;
      case 8:
        iVar9 = _rand();
        if (3 < iVar9 % 10) {
          bVar1 = 9;
        }
        break;
      }
      bVar1 = bVar1 | 0x80;
      let tOff2 = FUN_005b8931(local_20, local_28);
      tileWrite(tOff2, 0, bVar1);
      local_2c = local_2c + 1;
      bVar3 = false;
      for (local_14 = 0; (!bVar3 && (local_14 < 4)); local_14 = local_14 + 1) {
        uVar8 = FUN_005ae052(s8(DAT_0062833c[local_14]) + local_20);
        cVar2 = s8(DAT_00628344[local_14]);
        iVar9 = FUN_004087c0(uVar8, cVar2 + local_28);
        if ((iVar9 !== 0) && (iVar9 = FUN_005b89e4(uVar8, cVar2 + local_28), iVar9 !== 0)) {
          bVar3 = true;
        }
      }
      uVar7 = _rand();
      uVar11 = uVar7 >> 31;
      local_3c = (local_3c + (((uVar7 ^ uVar11) - uVar11 & 1 ^ uVar11) - uVar11)) - (local_2c & 1) & 3;
      local_20 = FUN_005ae052(s8(DAT_0062833c[local_3c]) + local_20);
      local_28 = local_28 + s8(DAT_00628344[local_3c]);
      iVar9 = FUN_004087c0(local_20, local_28);
      if (iVar9 !== 0) {
        let tOff3 = FUN_005b8931(local_20, local_28);
        bVar1 = tileRead(tOff3, 5);
      }
    } while (((!bVar3) && (iVar9 = FUN_004087c0(local_20, local_28), iVar9 !== 0)) &&
            ((bVar1 & 0x80) === 0));

    if (((bVar3) || ((bVar1 & 0x80) !== 0)) && (5 - ((local_30 / 800) | 0) <= local_2c)) {
      local_34 = local_34 + 1;
      for (local_14 = 0; local_14 < 0x14; local_14 = local_14 + 1) {
        uVar8 = FUN_005ae052(s8(DAT_00628370[local_14]) + iVar5);
        iVar9 = s8(DAT_006283a0[local_14]) + uVar4;
        iVar10 = FUN_004087c0(uVar8, iVar9);
        if (iVar10 !== 0) {
          if ((DAT_006d1162 >> 1) === iVar9 || ((DAT_006d1162 >> 1) - iVar9) < 0) {
            local_c = ~(((DAT_006d1162 >> 1) - iVar9)) + 1;
          } else {
            local_c = ((DAT_006d1162 >> 1) - iVar9);
          }
          let tOff4 = FUN_005b8931(uVar8, iVar9);
          let terrByte = tileRead(tOff4, 0);
          if (((terrByte & 0xf) === 3) && (local_c < ((DAT_006d1162 * 3) / 10) | 0)) {
            _rand();
          }
        }
      }
    } else {
      FUN_00408903(0, 5);   // restore terrain from byte[5]
    }
    FUN_0040894c();
  } while ((local_30 < 0x400) && (local_34 < DAT_00624ee8 * 2 + DAT_00624ef4 * 2 + 0xc));
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bbb0 — text_buffer_init
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bbb0() {
  FUN_004aef20(DAT_00679640);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bbe0 — text_buffer_append
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bbe0(param_1) {
  FUN_005f22e0(DAT_00679640, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bc10 — text_buffer_load_string
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bc10(param_1) {
  FUN_004af14b(DAT_00679640, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bc40 — set_draw_mode
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bc40(param_1) {
  FUN_0059dfb9(0, 0, 0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bc80 — list_dialog_select
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bc80(param_1) {
  return FUN_005a5f34(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bcb0 — is_even_tile (checkerboard pattern)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bcb0(param_1, param_2) {
  return ((-((param_2 + param_1) >> 1) - param_1) & 2) === 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bd10 — get_max_tax_rate
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bd10(param_1) {
  let uVar1;

  if (u8(DAT_0064c6b5[param_1 * 0x594]) < 2) {
    uVar1 = 6;
  } else if (DAT_0064c6b5[param_1 * 0x594] === 2) {
    uVar1 = 7;
  } else if (u8(DAT_0064c6b5[param_1 * 0x594]) < 6) {
    uVar1 = 8;
  } else {
    uVar1 = 10;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bdac — balance_tax_rates
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bdac(param_1, param_2, param_3, param_4, param_5, param_6) {
  // param_1..param_6 are objects with .value property (pass by reference)
  let iVar1;

  iVar1 = DAT_0063cbb4[0x2dc / 4];
  while (param_3.value + param_2.value + param_1.value < 10) {
    if (((param_2.value < iVar1) && (param_2.value < param_4.value)) && (param_5.value === 0)) {
      param_2.value = param_2.value + 1;
    } else if ((param_3.value < iVar1) && (param_6.value === 0)) {
      param_3.value = param_3.value + 1;
    } else if ((param_2.value < iVar1) && (param_5.value === 0)) {
      param_2.value = param_2.value + 1;
    } else {
      param_1.value = param_1.value + 1;
    }
  }
  while (10 < param_3.value + param_2.value + param_1.value) {
    if ((param_2.value === 0) || (param_5.value !== 0)) {
      if ((param_3.value === 0) || (param_6.value !== 0)) {
        param_1.value = param_1.value + -1;
      } else {
        param_3.value = param_3.value + -1;
      }
    } else {
      param_2.value = param_2.value + -1;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040bed1 — refresh_tax_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040bed1() {
  FUN_0040c7d0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040beec — set_tax_rate
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040beec(param_1) {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (DAT_0063cbb4[0x2dc / 4] < param_1) {
    DAT_0063cbb4[0x348 / 4] = 1;
  }
  local_8 = param_1;
  local_c = param_1;
  local_8 = FUN_005adfa0(param_1, 0, DAT_0063cbb4[0x2dc / 4]);
  local_10 = DAT_0063cbb4[0x2e8 / 4];
  local_14 = DAT_0063cbb4[0x2e4 / 4];
  let p8 = { value: local_8 };
  let p10 = { value: local_10 };
  let p14 = { value: local_14 };
  let p2f4 = { value: DAT_0063cbb4[0x2f4 / 4] };
  let p350 = { value: DAT_0063cbb4[0x350 / 4] };
  let p354 = { value: DAT_0063cbb4[0x354 / 4] };
  FUN_0040bdac(p8, p10, p14, p2f4, p350, p354);
  local_8 = p8.value;
  local_10 = p10.value;
  local_14 = p14.value;
  DAT_0063cbb4[0x2e0 / 4] = local_8;
  if (local_c !== local_8) {
    FUN_0040fcf0(local_8);
    FUN_0040f380();
  }
  if (DAT_0063cbb4[0x2e8 / 4] !== local_10) {
    DAT_0063cbb4[0x2e8 / 4] = local_10;
    FUN_0040fcf0(local_10);
    FUN_0040f380();
  }
  if (DAT_0063cbb4[0x2e4 / 4] !== local_14) {
    DAT_0063cbb4[0x2e4 / 4] = local_14;
    FUN_0040fcf0(local_14);
    FUN_0040f380();
  }
  FUN_0040c480();
  FUN_0040bed1();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040c07f — set_luxury_rate
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040c07f(param_1) {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (DAT_0063cbb4[0x2dc / 4] < param_1) {
    DAT_0063cbb4[0x348 / 4] = 1;
  }
  local_8 = param_1;
  local_c = param_1;
  local_8 = FUN_005adfa0(param_1, 0, DAT_0063cbb4[0x2dc / 4]);
  local_10 = DAT_0063cbb4[0x2e4 / 4];
  local_14 = DAT_0063cbb4[0x2e0 / 4];
  let p8 = { value: local_8 };
  let p10 = { value: local_10 };
  let p14 = { value: local_14 };
  let p2f0 = { value: DAT_0063cbb4[0x2f0 / 4] };
  let p354 = { value: DAT_0063cbb4[0x354 / 4] };
  let p34c = { value: DAT_0063cbb4[0x34c / 4] };
  FUN_0040bdac(p8, p10, p14, p2f0, p354, p34c);
  local_8 = p8.value;
  local_10 = p10.value;
  local_14 = p14.value;
  DAT_0063cbb4[0x2e8 / 4] = local_8;
  if (local_c !== local_8) {
    FUN_0040fcf0(local_8);
    FUN_0040f380();
  }
  if (DAT_0063cbb4[0x2e4 / 4] !== local_10) {
    DAT_0063cbb4[0x2e4 / 4] = local_10;
    FUN_0040fcf0(local_10);
    FUN_0040f380();
  }
  if (DAT_0063cbb4[0x2e0 / 4] !== local_14) {
    DAT_0063cbb4[0x2e0 / 4] = local_14;
    FUN_0040fcf0(local_14);
    FUN_0040f380();
  }
  FUN_0040c480();
  FUN_0040bed1();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040c212 — set_science_rate
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040c212(param_1) {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (DAT_0063cbb4[0x2dc / 4] < param_1) {
    DAT_0063cbb4[0x348 / 4] = 1;
  }
  local_8 = param_1;
  local_c = param_1;
  local_8 = FUN_005adfa0(param_1, 0, DAT_0063cbb4[0x2dc / 4]);
  local_10 = DAT_0063cbb4[0x2e0 / 4];
  local_14 = DAT_0063cbb4[0x2e8 / 4];
  let p8 = { value: local_8 };
  let p10 = { value: local_10 };
  let p14 = { value: local_14 };
  let p2ec = { value: DAT_0063cbb4[0x2ec / 4] };
  let p34c = { value: DAT_0063cbb4[0x34c / 4] };
  let p350 = { value: DAT_0063cbb4[0x350 / 4] };
  FUN_0040bdac(p8, p10, p14, p2ec, p34c, p350);
  local_8 = p8.value;
  local_10 = p10.value;
  local_14 = p14.value;
  DAT_0063cbb4[0x2e4 / 4] = local_8;
  if (local_8 !== local_c) {
    FUN_0040fcf0(local_8);
    FUN_0040f380();
  }
  if (DAT_0063cbb4[0x2e0 / 4] !== local_10) {
    DAT_0063cbb4[0x2e0 / 4] = local_10;
    FUN_0040fcf0(local_10);
    FUN_0040f380();
  }
  if (DAT_0063cbb4[0x2e8 / 4] !== local_14) {
    DAT_0063cbb4[0x2e8 / 4] = local_14;
    FUN_0040fcf0(local_14);
    FUN_0040f380();
  }
  FUN_0040c480();
  FUN_0040bed1();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040c3a5 — close_tax_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040c3a5() {
  DAT_0063cbb0 = 0;
  CRichEditDoc_InvalidateObjectCache(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040c3cd — toggle_tax_lock
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040c3cd(param_1, param_2) {
  let local_8;

  DAT_0063cbb4[(0x34c + (param_1 + -300) * 4) / 4] = param_2;
  if (param_2 !== 0) {
    for (local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
      if (param_1 + -300 !== local_8) {
        DAT_0063cbb4[(0x34c + local_8 * 4) / 4] = 0;
        FUN_0040fad0(0);
        FUN_0040f380();
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040c480 — recalc_tax_preview (large function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040c480() {
  // This function recalculates the tax preview in the tax dialog.
  // It iterates all cities, calls production/maintenance functions,
  // and updates the dialog state. Heavily UI-dependent.
  // stub — too dependent on in_ECX (this pointer)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040c7d0 — draw_tax_dialog (large function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040c7d0() {
  // This function draws the entire tax rate dialog.
  // Heavily UI-dependent (drawing bars, labels, etc.)
  // stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040cd64 — open_tax_dialog (very large function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040cd64(param_1) {
  // This function opens and manages the tax rate dialog.
  // Heavily UI-dependent with window creation, event loops, etc.
  // stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040dda0 — cleanup_tax_dialog_A
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040dda0() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ddb6 — cleanup_tax_dialog_B (SEH)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ddb6() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ddc6 — show_tax_dialog_if_human
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ddc6(param_1) {
  FUN_0040f060();

  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    FUN_0040dea8();
    FUN_0040debe();
    return;
  }
  if ((DAT_00655b02 < 3) || (DAT_006d1da0 === param_1)) {
    FUN_0040cd64(param_1);
    FUN_citywin_9429();
  } else {
    FUN_0046b14d(0x9d, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  FUN_0040dea8();
  FUN_0040debe();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040dea8 — cleanup_dialog_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040dea8() {
  FUN_0040f1e0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040debe — cleanup_dialog_seh
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040debe() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040decc — check_and_show_tax_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040decc(param_1) {
  let iVar1;

  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) {
    if ((DAT_00655b02 < 3) || (DAT_006d1da0 === param_1)) {
      iVar1 = FUN_0040bd10(param_1);
      if (iVar1 < u8(DAT_0064c6b4[param_1 * 0x594])) {
        FUN_0040ddc6(param_1);
      }
      if (iVar1 < (10 - (u8(DAT_0064c6b3[param_1 * 0x594]) +
                         u8(DAT_0064c6b4[param_1 * 0x594])))) {
        FUN_0040ddc6(param_1);
      }
      if (iVar1 < u8(DAT_0064c6b3[param_1 * 0x594])) {
        FUN_0040ddc6(param_1);
      }
    } else {
      FUN_0046b14d(0x9e, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040e017 — find_city_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040e017() {
  // Find city dialog — heavily UI dependent. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040e38d — cleanup_find_city_A
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040e38d() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040e3a3 — cleanup_find_city_B (SEH)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040e3a3() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040e3b1 — revolution_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040e3b1() {
  // Revolution dialog — UI dependent. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ef50 — process_messages
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ef50() {
  gdi_BA4F();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ef70 — get_font_height
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ef70() {
  // Original: return *(in_ECX + 4)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040efd0 — measure_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040efd0(param_1) {
  // Original uses in_ECX (this pointer)
  measure_text_858E(0, param_1);
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f010 — destructor_with_delete
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f010(param_1) {
  FUN_005bd915();
  if ((param_1 & 1) !== 0) {
    // operator_delete
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f060 — init_dialog_controls
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f060() {
  // Complex initialization with SEH. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f1e0 — destroy_dialog_controls
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f1e0() {
  FUN_0040f25f();
  FUN_0040f26e();
  FUN_0040f286();
  FUN_0040f295();
  FUN_0040f2a4();
  FUN_0040f2b3();
  FUN_0040f2c6();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f25f — destroy_scrollbar_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f25f() {
  FUN_0040f570();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f26e — destroy_vector_controls
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f26e() {
  // _eh_vector_destructor_iterator_ — stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f286 — destroy_button_control_A
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f286() {
  FUN_0040fbb0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f295 — destroy_button_control_B
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f295() {
  FUN_0040fbb0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f2a4 — destroy_button_control_C
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f2a4() {
  FUN_0040fbb0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f2b3 — destroy_frame_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f2b3() {
  // COleCntrFrameWnd::~COleCntrFrameWnd — stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f2c6 — cleanup_seh
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f2c6() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f350 — set_control_flag
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f350(param_1) {
  // *(in_ECX + 0xc4) = param_1; — this pointer, stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f380 — invalidate_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f380() {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f3e0 — init_scrollbar
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f3e0() {
  FUN_0040f480();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f480 — init_control_fields
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f480() {
  // Initializes control fields to zero. This pointer based. stub
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f510 — destroy_control_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f510() {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f570 — destroy_scrollbar_with_seh
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f570() {
  FUN_0040f5c3();
  FUN_0040f5d6();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f5c3 — destroy_control_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f5c3() {
  FUN_0040f510();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f5d6 — seh_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f5d6() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f610 — destroy_control_if_exists
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f610() {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f680 — create_text_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f680(param_1, param_2, param_3, param_4) {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f730 — init_control_params
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f730(param_1, param_2, param_3, param_4) {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f7d0 — set_control_owner_A
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f7d0() {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f810 — get_control_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f810() {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f840 — set_control_owner_B
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f840() {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f880 — set_control_callback
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f880(param_1) {
  // *(in_ECX + 0x30) = param_1; stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f8b0 — init_control_with_seh
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f8b0() {
  FUN_0040f480();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f930 — destroy_text_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f930() {
  FUN_0040f98a();
  FUN_0040f99d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f98a — destroy_control_wrapper_B
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f98a() {
  FUN_0040f510();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f99d — seh_cleanup_B
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f99d() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040f9d0 — create_checkbox_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040f9d0(param_1, param_2, param_3, param_4, param_5) {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040faa0 — set_control_value_A
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040faa0(param_1) {
  // *(in_ECX + 0x2c) = param_1; stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fad0 — set_control_value_B
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fad0(param_1) {
  // *(in_ECX + 0x30) = param_1; stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fb00 — init_button_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fb00() {
  FUN_0040f480();
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fbb0 — destroy_button_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fbb0() {
  FUN_0040fc0a();
  FUN_0040fc1d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fc0a — destroy_button_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fc0a() {
  FUN_0040f510();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fc1d — seh_cleanup_C
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fc1d() {
  // SEH cleanup — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fc50 — create_slider_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fc50(param_1, param_2, param_3, param_4) {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fcf0 — set_slider_position
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fcf0(param_1) {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fd40 — set_slider_range
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fd40(param_1, param_2) {
  // This pointer based. stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fd80 — set_slider_callback
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fd80(param_1) {
  // *(in_ECX + 0x2c) = param_1; stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fdb0 — draw_background_rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fdb0(param_1, param_2, param_3) {
  let uVar1;
  uVar1 = FUN_00407fc0(param_2, param_3);
  uVar1 = FUN_00407f90(param_2, uVar1);
  FUN_005a9abf(param_1, 0, 0, uVar1, 0, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fe10 — text_newline
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fe10() {
  FUN_004aef36(DAT_00679640);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fe40 — text_start_bold
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fe40() {
  FUN_004aefb7(DAT_00679640);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fe70 — text_end_bold
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fe70() {
  FUN_004aeff9(DAT_00679640);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fea0 — text_start_italic
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fea0() {
  FUN_004af01a(DAT_00679640);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040fed0 — text_end_italic
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040fed0() {
  FUN_004af03b(DAT_00679640);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ff00 — text_set_color
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ff00(param_1) {
  FUN_004af122(DAT_00679640, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ff30 — text_append_number
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ff30(param_1) {
  FUN_004af1d5(DAT_00679640, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ff60 — set_popup_title
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ff60(param_1, param_2) {
  FUN_005f22d0(DAT_0063cc48 + param_1 * 0x104, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ffa0 — open_list_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ffa0(param_1, param_2) {
  FUN_0040ffe0(DAT_006359d4, param_1, 0, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0040ffe0 — open_dialog_generic
// ═══════════════════════════════════════════════════════════════════
export function FUN_0040ffe0(param_1, param_2, param_3, param_4) {
  FUN_005a632a(param_1, param_2, param_3, 0, 0, 0, 0, param_4);
}


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks not yet defined
// ═══════════════════════════════════════════════════════════════════

function FUN_citywin_9545() { /* stub */ }
function FUN_citywin_9429() { /* stub */ }
function FUN_0055339f() { /* stub */ }
function FUN_005bd05f(p1, p2) { /* stub */ }
function FUN_005bc933(p1) { /* stub */ return 0; }
function FUN_005bcb85(p1, p2) { /* stub */ }
function FUN_005bd65c(p1, p2) { /* stub */ }
function FUN_005bbbce() { /* stub */ }
function FUN_005c0979(p1, p2, p3) { /* stub */ }
function FUN_005bc6bb(p1, p2) { /* stub */ }
function FUN_005c5b7f() { /* stub */ }
function FUN_005bb574() { /* stub */ }
function FUN_005a9780(p1) { /* stub */ }
function FUN_005a98e4(p1, p2, p3, p4, p5, p6) { /* stub */ }
function FUN_005a9aa3(p1, p2) { /* stub */ }
function FUN_005a9abf(p1, p2, p3, p4, p5, p6) { /* stub */ }
function FUN_005a9afe(p1, p2, p3, p4, p5, p6, p7, p8) { /* stub */ }
function FUN_005ae24d(p1, p2) { return 0; /* stub */ }
function FUN_005adfa0(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}
function FUN_005b8b65(p1, p2, p3) { return 0; /* stub */ }
function FUN_005b8a81(p1, p2) { return -1; /* stub */ }
function FUN_0043cf76(p1, p2) { return -1; /* stub */ }
function FUN_00552ed2() { /* stub */ }
function FUN_00552112() { /* stub */ }
function FUN_00410402(p1, p2) { /* stub */ }
function FUN_005013bc() { /* stub */ }
function FUN_00413717() { /* stub */ }
function FUN_005534bc(p1, p2, p3, p4, p5, p6, p7, p8, p9) { /* stub */ }
function FUN_00428b0c(...args) { return 0; /* stub */ }
function FUN_0047e94e(p1, p2) { /* stub */ }
function FUN_004b32fe() { /* stub */ }
function FUN_005b85fe() { /* stub */ }
function FUN_005b7fe0() { /* stub */ }
function FUN_0055a980() { /* stub */ }
function FUN_0059db08(p1) { /* stub */ }
function FUN_0059e783(p1, p2) { /* stub */ }
function FUN_0059e6a9(p1) { /* stub */ }
function FUN_0059e6ff(p1) { /* stub */ }
function FUN_0059e18b(p1, p2, p3, p4, p5) { /* stub */ }
function FUN_0059df8a() { /* stub */ }
function FUN_0059dfb9(p1, p2, p3, p4) { /* stub */ }
function FUN_005a5f34(p1, p2) { return 0; /* stub */ }
function FUN_005a632a(p1, p2, p3, p4, p5, p6, p7, p8) { /* stub */ }
function FUN_00484d52() { /* stub */ }
function FUN_005f22e0(p1, p2) { /* stub */ }
function FUN_005f22d0(p1, p2) { /* stub */ }
function FUN_004aef20(p1) { /* stub */ }
function FUN_004aef36(p1) { /* stub */ }
function FUN_004aefb7(p1) { /* stub */ }
function FUN_004aeff9(p1) { /* stub */ }
function FUN_004af01a(p1) { /* stub */ }
function FUN_004af03b(p1) { /* stub */ }
function FUN_004af122(p1, p2) { /* stub */ }
function FUN_004af14b(p1, p2) { /* stub */ }
function FUN_004af1d5(p1, p2) { /* stub */ }
function FUN_005bd630() { return 0; /* stub */ }
function FUN_005bd915() { /* stub */ }
function FUN_005bf5e1(p1, p2, p3, p4) { /* stub */ }
function FUN_005c59c4(p1) { /* stub */ }
function FUN_005c5a27(p1) { /* stub */ }
function FUN_005c61b0() { /* stub */ }
function FUN_005c64da() { /* stub */ }
function FUN_005c656b() { /* stub */ }
function FUN_005cc248(p1) { /* stub */ }
function FUN_005cd139(p1) { /* stub */ }
function FUN_005cd4c7(p1, p2, p3) { /* stub */ }
function FUN_005cd559(p1, p2) { /* stub */ }
function FUN_004ea1f6(p1, p2, p3, p4) { /* stub */ }
function FUN_0043d20a(p1, p2) { return 0; /* stub */ }
function FUN_004f00f0(p1, p2) { return 0; /* stub */ }
function FUN_005baeb0(p1) { /* stub */ }
function FUN_005baec8(p1) { /* stub */ }
function FUN_005baee0(p1, p2, p3, p4) { /* stub */ }
function FUN_005baf57(p1, p2, p3, p4) { /* stub */ }
function FUN_005bb024(p1, p2, p3, p4, p5) { /* stub */ }
function FUN_005bb0af(p1, p2, p3, p4, p5) { /* stub */ }
function FUN_004c2788(p1) { return 1; /* stub */ }
function FUN_0046b14d(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) { /* stub */ }
function FUN_0046e020(p1, p2, p3, p4) { /* stub */ }
function FUN_00410030(p1, p2, p3) { return 0; /* stub */ }
function FUN_00410070(p1) { return 0; /* stub */ }
function FUN_004271e8(p1, p2) { /* stub */ }
function FUN_00493c7d(p1) { return 0; /* stub */ }
function FUN_00493d13(p1) { return 0; /* stub */ }
function FUN_004a73d9() { /* stub */ }
function FUN_0055c066(p1, p2) { /* stub */ }
function FUN_0055c69d(p1, p2) { /* stub */ }
function FUN_004e4ceb() { /* stub */ }
function FUN_004eb4ed(p1, p2) { /* stub */ }
function FUN_00501780(p1) { /* stub */ }
function FUN_0056a65e(p1) { /* stub */ }
function FUN_00436287(p1) { /* stub */ }
function FUN_0043cef9(p1) { return 0; /* stub */ }
function FUN_0059edf0(p1, p2, p3) { /* stub */ }
function FUN_handle_city_disorder_00509590(p1) { /* stub */ }
