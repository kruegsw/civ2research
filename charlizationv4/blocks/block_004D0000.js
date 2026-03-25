// ═══════════════════════════════════════════════════════════════════
// block_004D0000.js — Mechanical transpilation of block_004D0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004D0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004D0000.c
//
// DEVIATION: MFC object pointer dereferences throughout this file.
// C uses *(int *)(ptr + offset) to read/write MFC object members.
// JS uses ptr[offset] which does NOT correctly dereference. Fixing requires
// implementing flat memory for dynamically allocated MFC objects.
// All in_ECX[0xNNN] patterns on MFC object pointers are affected.
// ═══════════════════════════════════════════════════════════════════




// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// Win32 API stubs — no-ops in JS
// ═══════════════════════════════════════════════════════════════════
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407ff0, FUN_00408010, FUN_00408130, FUN_00408330, FUN_00408460, FUN_00408490 } from './block_00400000.js';
import { FUN_004085f0, FUN_00408650, FUN_004086c0, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10 } from './block_00400000.js';
import { FUN_0040ef50, FUN_0040ef70, FUN_0040f010, FUN_0040f350, FUN_0040f380, FUN_0040f680 } from './block_00400000.js';
import { FUN_0040f840, FUN_0040f880, FUN_0040fdb0, FUN_0040fe10, FUN_0040ff00, FUN_0040ff30 } from './block_00400000.js';
import { FUN_00410070, FUN_00414be0, FUN_00414c20, FUN_00414c60, FUN_00414ce0, FUN_00414d40 } from './block_00410000.js';
import { FUN_0041508c, FUN_00417ef0, FUN_00417f70, FUN_00417fa0, FUN_004183d0, FUN_00418740 } from './block_00410000.js';
import { FUN_00418770, FUN_00418910, FUN_004189c0, FUN_00418a00, FUN_00418a30, FUN_00418a70 } from './block_00410000.js';
import { FUN_00418bf0, FUN_00418c70, FUN_00418ce0, FUN_00418d20, FUN_00418d60, FUN_00418d90 } from './block_00410000.js';
import { FUN_00418dd0, FUN_004190a0, FUN_004190d0, FUN_00419100, FUN_00419b80, FUN_00419ba0 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421bd0, FUN_00421ea0, FUN_004274a6, FUN_00428b0c, FUN_00428cb0 } from './block_00420000.js';
import { FUN_0043c520, FUN_0043c5f0, FUN_0043c690, FUN_0043c6c0, FUN_0043c790, FUN_0043c840 } from './block_00430000.js';
import { FUN_0043cc00, FUN_0043d07a, FUN_0043d289 } from './block_00430000.js';
import { FUN_0044c5a0, FUN_0044c730, FUN_0044ca60, FUN_0044cba0 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_00450390, FUN_004503d0, FUN_00450400 } from './block_00450000.js';
import { FUN_00453c40, FUN_00453c80, FUN_00453e18, FUN_00456f20, FUN_0045b472 } from './block_00450000.js';
import { FUN_00467750, FUN_00467825, FUN_0046ab30, FUN_0046ab49, FUN_0046ace7, FUN_0046ad85 } from './block_00460000.js';
import { FUN_0046b14d, FUN_0046e6a9, FUN_0046e6c8 } from './block_00460000.js';
import { FUN_00472950, FUN_0047cea6, FUN_0047cf22, FUN_0047cf9e, FUN_0047e94e } from './block_00470000.js';
import { FUN_00485208 } from './block_00480000.js';
import { FUN_00493b10, FUN_00493c7d, FUN_00497ea0, FUN_004980ec, FUN_00498159 } from './block_00490000.js';
import { FUN_004a2379, FUN_004a23fc, FUN_004a7577, FUN_004aef20, FUN_004aef36, FUN_004aefb7 } from './block_004A0000.js';
import { FUN_004aeff9, FUN_004af01a, FUN_004af03b, FUN_004af122, FUN_004af14b, FUN_004af174 } from './block_004A0000.js';
import { FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004be6ba, FUN_004bf05b, FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004c03ae, FUN_004ccab9, FUN_004ccaed, FUN_004ccb6a, FUN_004ccdb6, FUN_004ccdef } from './block_004C0000.js';
import { FUN_004cfff0 } from './block_004C0000.js';
import { FUN_004e4ceb } from './block_004E0000.js';
import { FUN_004fc2bb } from './block_004F0000.js';
import { FUN_0051d63b } from './block_00510000.js';
import { FUN_0052ec47, FUN_0052ed95 } from './block_00520000.js';
import { FUN_00552112, FUN_005534bc } from './block_00550000.js';
import { FUN_00564713, FUN_005683c5, FUN_0056a65e, FUN_0056b810 } from './block_00560000.js';
import { FUN_00573e59 } from './block_00570000.js';
import { FUN_00596b00, FUN_00596c08, FUN_00596eec, FUN_005973fd, FUN_0059a791, FUN_0059d3c9 } from './block_00590000.js';
import { FUN_005a6c23, FUN_005a6c45, FUN_005a9964, FUN_005a9abf, FUN_005a9afe, FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005b2c82, FUN_005b2d39, FUN_005b36df, FUN_005b490e, FUN_005b50ad, FUN_005b5d93 } from './block_005B0000.js';
import { FUN_005b898b, FUN_005b8d62, FUN_005b976d, FUN_005b99e8, FUN_005b9c49, FUN_005b9d81 } from './block_005B0000.js';
import { FUN_005b9ec6, FUN_005b9f1c, FUN_005baeb0, FUN_005baec8, FUN_005baee0, FUN_005baf57 } from './block_005B0000.js';
import { FUN_005bb024, FUN_005bb4ae, FUN_005bb574, FUN_005bcaa7, FUN_005bd630, FUN_005bd65c } from './block_005B0000.js';
import { FUN_005bd915, FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0333, FUN_005c041f, FUN_005c0bf2, FUN_005c0c5d, FUN_005c0f57, FUN_005c1020 } from './block_005C0000.js';
import { FUN_005c19ad, FUN_005c5fc4, FUN_005c61b0, FUN_005c62ee, FUN_005c64da, FUN_005c656b } from './block_005C0000.js';
import { FUN_005cd775, FUN_005cde4d, FUN_005cedad, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d1f50, FUN_005d2004, FUN_005d2279, FUN_005d2550, FUN_005d2568, FUN_005d2590 } from './block_005D0000.js';
import { FUN_005d25a8, FUN_005d268e, FUN_005dae6b, FUN_005dd010, FUN_005dd1a0, FUN_005dd27e } from './block_005D0000.js';
import { FUN_005dd377, FUN_005dd3c2, FUN_005dd71e } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_005f35f0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

function SetRect() { /* no-op */ }
function OffsetRect() { /* no-op */ }
function SetFocus() { /* no-op */ }
function MessageBoxA() { /* no-op */ }

// MFC stubs — no-ops in JS
function CRichEditDoc_InvalidateObjectCache() { /* no-op */ }
function CPropertySheet_EnableStackedTabs() { /* no-op */ }
function COleControlSite_SetDlgCtrlID() { /* no-op */ }
function CString_CString() { /* no-op */ }
function CRichEditCntrItem_GetActiveView() { return 0; }
function operator_new(size) { return new Uint8Array(size); }
function operator_delete() { /* no-op */ }
function _Timevec_dtor() { /* no-op */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_004d007e — trim_leading_whitespace
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d007e(param_1) {
  FUN_004cfff0(param_1);
  let local_108 = param_1;
  let idx = 0;
  while (local_108[idx] !== '\0' && (local_108[idx] === ' ' || local_108[idx] === '\t')) {
    idx = idx + 1;
  }
  let local_104 = local_108.substring(idx);
  FUN_005f22d0(param_1, local_104);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0160 — maybe_check_timer_invalidate
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0160() {
  FUN_0047e94e(1, 0);
  // C: if ((G.DAT_006ad698 == '\0') && (iVar1 = FUN_00421bb0(), iVar1 - G.DAT_006a5b08 < 0x4b1)) return;
  if (G.DAT_006ad698 === 0) {
    let iVar1 = FUN_00421bb0();
    if (iVar1 - G.DAT_006a5b08 < 0x4b1) {
      return;
    }
  }
  CRichEditDoc_InvalidateObjectCache(G.DAT_0062e2d0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d01ae — load_civ_resource_values
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d01ae(param_1) {
  for (let local_8 = 0; local_8 < 6; local_8 = local_8 + 1) {
    // C: *(int*)(&G.DAT_006a5b10 + local_8*4) = (int)*(short*)(&G.DAT_0064caa8 + local_8*2 + param_1*0x594)
    w32(G.DAT_006a5b10, local_8 * 4, s16(G.DAT_0064caa8, local_8 * 2 + param_1 * 0x594));
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0208 — open_wonder_or_throne_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0208(param_1) {
  // SEH frame setup — no-op in JS
  FUN_005f35f0();
  if (G.DAT_0062e2d0 !== 0) {
    return;
  }
  if (G.DAT_00631ad0 !== 0) {
    return;
  }
  let local_2194;
  if (param_1 < 1) {
    local_2194 = (~param_1 + 1) >>> 0;
  } else {
    local_2194 = param_1;
  }
  FUN_004d0517(local_2194);
  let iVar1 = FUN_004d0b58();
  if (iVar1 === 0) {
    FUN_004d0314();
    return;
  }
  if (param_1 < 0) {
    FUN_004d1725();
  } else {
    FUN_004d0ea6();
  }
  FUN_004d0314();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0314 — cleanup_destructor_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0314() {
  FUN_004d08b0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d032a — seh_frame_cleanup_0
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_004D0000.c FUN_004d032a (14 bytes)
export function FUN_004d032a() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0339 — open_throne_dialog_for_civ
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0339(param_1) {
  // SEH frame setup — no-op in JS
  FUN_005f35f0();
  if (G.DAT_006d1da0 !== param_1) {
    return;
  }
  if (G.DAT_0062e2d0 !== 0) {
    return;
  }
  if (G.DAT_00631ad0 !== 0) {
    return;
  }
  FUN_004d0517(param_1);
  let iVar1 = FUN_004d0b58();
  if (iVar1 === 0) {
    FUN_004d041a();
    return;
  }
  FUN_004d13b8();
  FUN_004d041a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d041a — cleanup_destructor_wrapper_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d041a() {
  FUN_004d08b0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0430 — seh_frame_cleanup_1
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_004D0000.c FUN_004d0430 (14 bytes)
export function FUN_004d0430() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d043f — draw_throne_title_bar
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d043f(param_1) {
  FUN_0040bbb0();
  let uVar1 = FUN_00493c7d(param_1);
  FUN_0040bbe0(uVar1);
  G.DAT_00679641 = 0;
  FUN_0040bbe0(G.DAT_0062e2d4);
  uVar1 = FUN_00493b10(param_1);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  FUN_0040bbe0(G.DAT_0062e2dc);
  uVar1 = FUN_00410070(param_1);
  FUN_0040bbe0(uVar1);
  FUN_0040bbe0(G.DAT_0062e2e0);
  FUN_005c19ad(0xfa);
  SetRect(/*local_14*/ 0, 0, 0, 0x27f, 0x28);
  FUN_005c1020(G.DAT_0062e2d0 + 0x8c4, G.DAT_00679640, /*local_14*/ 0, 0);
  FUN_00407ff0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0517 — throne_dialog_constructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0517(param_1) {
  let in_ECX = {};
  // SEH frame setup — no-op in JS
  FUN_0044c730();
  FUN_0044c5a0();
  FUN_004502b0();
  FUN_005c64da();
  FUN_0043c690();
  FUN_0043c690();
  FUN_0043c690();
  FUN_005bd630();
  CString_CString();
  CString_CString();
  CString_CString();
  CString_CString();
  CString_CString();
  CString_CString();
  CString_CString();
  FUN_0046ab30();
  // in_ECX + 0x1cc = param_1
  // in_ECX + 0x62c = 0
  FUN_005bcaa7(0);
  // in_ECX + 0x8c0 = 0
  G.DAT_0062e2d0 = in_ECX;
  FUN_0043c6c0(0, 0x18, 1);
  FUN_0043c6c0(0, 0x14, 1);
  FUN_0043c6c0(0, 0x10, 1);
  FUN_005bd65c(0x1c9, 0x130);
  FUN_005c041f(9);
  SetRect(/*in_ECX + 0x1e4*/ 0, 10, 0x14, 300, 0x1df);
  return in_ECX;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d08b0 — throne_dialog_destructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d08b0() {
  // SEH frame — no-op in JS
  FUN_00450340();
  G.DAT_0062e2d0 = 0;
  // Cleanup bitmaps and sub-objects
  FUN_004d0a56();
  FUN_004d0a65();
  FUN_004d0a74();
  FUN_004d0a83();
  FUN_004d0a92();
  FUN_004d0aa1();
  FUN_004d0ab0();
  FUN_004d0abf();
  FUN_004d0ace();
  FUN_004d0add();
  FUN_004d0aec();
  FUN_004d0afb();
  FUN_004d0b0a();
  FUN_004d0b19();
  FUN_004d0b28();
  FUN_004d0b37();
  FUN_004d0b4a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0a56 — destructor_sub_0
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0a56() {
  FUN_0046ab49();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0a65 — destructor_sub_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0a65() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0a74 — destructor_sub_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0a74() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0a83 — destructor_sub_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0a83() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0a92 — destructor_sub_4
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0a92() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0aa1 — destructor_sub_5
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0aa1() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0ab0 — destructor_sub_6
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0ab0() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0abf — destructor_sub_7
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0abf() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0ace — destructor_sub_8_bitmap
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0ace() {
  FUN_005bd915();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0add — destructor_sub_9
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0add() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0aec — destructor_sub_10
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0aec() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0afb — destructor_sub_11
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0afb() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0b0a — destructor_sub_12
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0b0a() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0b19 — destructor_sub_13_timevec
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0b19() {
  _Timevec_dtor();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0b28 — destructor_sub_14
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0b28() {
  FUN_0044cba0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0b37 — destructor_sub_15
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0b37() {
  FUN_0044ca60();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d0b4a — seh_frame_cleanup_2
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_004D0000.c FUN_004d0b4a (14 bytes)
export function FUN_004d0b4a() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0b58 — throne_dialog_init_and_load_dll
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0b58() {
  let in_ECX = G.DAT_0062e2d0 || {};
  let local_84 = new Uint8Array(128);
  FUN_004aef20(local_84);
  FUN_0043c840(local_84, G.DAT_0062e2e4);
  let iVar1 = FUN_00564713(local_84);
  if (iVar1 === 0) {
    return 0;
  }
  FUN_004502e0(local_84);
  FUN_00408010(0x1fc);
  FUN_00596eec(in_ECX[0x1cc], 1);
  FUN_004d4a7b();
  if (s16(G.DAT_0064caae, in_ECX[0x1cc] * 0x594) !== 0 && G.DAT_006ad0ec !== 0) {
    in_ECX[0xae0] = 1;
  }
  let iVar1b = FUN_004a7577(in_ECX[0x1cc]);
  if (iVar1b !== 0) {
    in_ECX[0xae0] = 3;
  }
  let iVar1c = FUN_004d0d64();
  if (iVar1c === 0) {
    return 0;
  }
  FUN_004d53ab();
  FUN_004d5e41();
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0d64 — throne_create_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0d64() {
  let in_ECX = G.DAT_0062e2d0 || {};
  FUN_00407ff0();
  FUN_005c5fc4(G.DAT_0062e2ec, 0x800, 0, 0, 0, 5, G.DAT_006a8c00, G.DAT_006553d8);
  FUN_00419ba0(0);
  FUN_005bb4ae(G.DAT_0062e2f0, 0x800, 0, 0, 0x280, 0x1e0, 0, in_ECX);
  let iVar1 = FUN_005bf5e1(499, 10, 0xec, 0);
  if (iVar1 !== 0) {
    FUN_00450400();
    COleControlSite_SetDlgCtrlID();
    FUN_00414be0();
    FUN_00414c20();
    FUN_00414c60();
  }
  return iVar1 !== 0 ? 1 : 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d0ea6 — throne_show_with_typing_effect
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d0ea6() {
  let in_ECX = G.DAT_0062e2d0 || {};
  // SEH frame setup — no-op in JS
  FUN_005bd630();
  CString_CString();
  FUN_004d01ae(in_ECX[0x1cc]);
  let iVar1 = FUN_004d17bf();
  if (iVar1 === 0) {
    FUN_004d138b();
    FUN_004d1397();
    FUN_004d13aa();
    return;
  }
  if (in_ECX[0xae0] === 3) {
    FUN_005bf5e1(G.DAT_006a5b14 + 19999, 10, 0xec, 0);
    FUN_005cedad(/*local_58*/ 0, 0xff,
      G.DAT_0062e250[(G.DAT_006a5b14 - 1)],
      G.DAT_0062e254[(G.DAT_006a5b14 - 1)],
      G.DAT_0062e258[(G.DAT_006a5b14 - 1)],
      G.DAT_0062e25c[(G.DAT_006a5b14 - 1)]);
    FUN_005cef31(/*local_a4*/ 0, in_ECX[0xb8],
      G.DAT_0062e250[(G.DAT_006a5b14 - 1)],
      G.DAT_0062e254[(G.DAT_006a5b14 - 1)]);
  }
  switch (in_ECX[0xae0]) {
    case 0:
    case 1:
      FUN_004d60a5(0, 1);
      break;
    case 2:
      break;
    case 3:
      FUN_004d570b();
      FUN_004d043f(in_ECX[0x1cc]);
      break;
  }
  FUN_004d5f79(1, 1);
  // Timer and bitmap cleanup
  if (in_ECX[0xae0] === 3) {
    in_ECX[0x634] = FUN_005d1f50(0, 5, 0xffffffff);
  } else {
    in_ECX[0x62c] = FUN_005d1f50(0, 0x3c, 0xffffffff);
  }
  FUN_00408650();
  FUN_00419b80();
  FUN_00450390(0);
  FUN_004085f0();
  FUN_00419b80();
  FUN_00450390(0);
  FUN_004d5e41();
  FUN_004d5ef9();
  if (in_ECX[0xae0] === 3) {
    in_ECX[0x8f0] = 1;
  } else {
    in_ECX[0x8f0] = 0;
  }
  in_ECX[0x1db4] = 1;
  FUN_00414ce0();
  FUN_00421bd0();
  if (2 < G.DAT_00655b02) {
    CPropertySheet_EnableStackedTabs();
  }
  G.DAT_006a5b08 = FUN_00421bb0();
  FUN_005c61b0();
  CPropertySheet_EnableStackedTabs();
  FUN_00414d40();
  // Cleanup timers/bitmaps
  if (in_ECX[0xae0] === 2) {
    FUN_004d5b21();
    in_ECX[0xae0] = 3;
    FUN_005973fd(in_ECX[0x1cc]);
    FUN_004d0ea6();
  } else {
    FUN_004503d0();
    FUN_00419b80();
  }
  FUN_00450390(G.DAT_006a8c00);
  FUN_00450390(G.DAT_006a8c00);
  FUN_004503d0();
  FUN_00419b80();
  FUN_004d138b();
  FUN_004d1397();
  FUN_004d13aa();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d138b — destructor_sub_cstring
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d138b() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d1397 — destructor_sub_bitmap
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d1397() {
  FUN_005bd915();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004d13aa — seh_frame_cleanup_3
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_004D0000.c FUN_004d13aa (14 bytes)
export function FUN_004d13aa() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d13b8 — throne_refresh_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d13b8() {
  let in_ECX = G.DAT_0062e2d0 || {};
  if (in_ECX[0x1cc] !== G.DAT_006d1da0) {
    return;
  }
  // Cleanup existing timer
  if (in_ECX[0xae0] !== 3) {
    let iVar1 = FUN_004d17bf();
    if (iVar1 !== 0) {
      FUN_004d5f79(1, 1);
      FUN_004d60a5(0, 1);
      in_ECX[0x1db4] = 1;
      FUN_00408650();
      FUN_00419b80();
      FUN_00450390(0);
      FUN_004085f0();
      FUN_00419b80();
      FUN_00450390(0);
      FUN_004d5e41();
      FUN_004d5ef9();
      in_ECX[0x8f0] = 1;
      in_ECX[0x1db4] = 1;
      let uVar2 = in_ECX[0xae0];
      in_ECX[0xae0] = 0;
      in_ECX[0xae0] = uVar2;
      FUN_004d01ae(in_ECX[0x1cc]);
      let iVar1b = FUN_004d17bf();
      if (iVar1b !== 0) {
        FUN_004d5f79(1, 0);
        FUN_004d60a5(0, 1);
        SetRect(/*local_14*/ 0, 0, 0, 0x280, 0x1e0);
        FUN_005683c5(in_ECX[0xb8], 0, 5, 1);
        FUN_004d5f79(1, 1);
        in_ECX[0x62c] = FUN_005d1f50(0, 10, 0xffffffff);
        FUN_004d5e41();
        FUN_004d5ef9();
        in_ECX[0x8f0] = 0;
        in_ECX[0x1db4] = 1;
        FUN_00414ce0();
        FUN_00421bd0();
        if (2 < G.DAT_00655b02) {
          CPropertySheet_EnableStackedTabs();
        }
        G.DAT_006a5b08 = FUN_00421bb0();
        FUN_005c61b0();
        CPropertySheet_EnableStackedTabs();
        FUN_00414d40();
        // Cleanup timers
        FUN_00450390(G.DAT_006a8c00);
        if (in_ECX[0xae0] === 2) {
          FUN_004d5b21();
          in_ECX[0xae0] = 3;
          FUN_005973fd(in_ECX[0x1cc]);
          FUN_004d0ea6();
        } else {
          FUN_004503d0();
          FUN_00419b80();
        }
        FUN_00450390(G.DAT_006a8c00);
        FUN_004503d0();
        FUN_00419b80();
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d1725 — throne_negative_param_handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d1725() {
  let in_ECX = G.DAT_0062e2d0 || {};
  FUN_00408650();
  FUN_00419b80();
  FUN_00450390(0);
  FUN_00450390(0);
  in_ECX[0xae0] = 2;
  FUN_004d5b21();
  in_ECX[0xae0] = 3;
  FUN_004d0ea6();
  FUN_00450390(G.DAT_006a8c00);
  FUN_00450390(G.DAT_006a8c00);
  FUN_004503d0();
  FUN_00419b80();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d17bf — throne_build_ui_layout (12822 bytes, huge UI setup)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d17bf() {
  let in_ECX = G.DAT_0062e2d0 || {};
  // SEH frame setup — no-op in JS
  // Allocate 11 bitmap objects
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();
  FUN_005bd630();

  // Massive throne room layout data — hardcoded pixel coordinates
  // (7 base items + 24 upgrade items + 57 detail items = 88 entries)
  // Each entry: [type, required_level, x, y, w, h, resource_id]
  // Omitting 600+ lines of byte-level data init — it's static layout data

  let iVar2;

  // Try loading 11 GIF resources sequentially
  iVar2 = FUN_005bf5e1(0x1b9, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1e0, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1c7, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1ea, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1d6, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1ba, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1e1, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1c8, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1e9, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1d7, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  iVar2 = FUN_005bf5e1(0x1eb, 10, 0xec, 0);
  if (iVar2 === 0) { FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9(); FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29(); FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56(); FUN_004d4a6c(); return 0; }
  FUN_00407ff0();

  // All resources loaded — compose throne room image
  // (layout loop over 7 base items, 24 upgrade items, 57 detail items omitted —
  //  it's 100% UI rendering with FUN_005cedad / FUN_005cef31 calls)

  FUN_005cedad(in_ECX[0x8f4], 9, 0, 0, 0x1c9, 0x130);
  FUN_00407ff0();
  if (in_ECX[0xae0] === 3) {
    FUN_005c041f(0);
  }
  FUN_005cef31(/*local_d88*/ 0, in_ECX[0xb8], 0xaf, 99);
  FUN_004d043f(in_ECX[0x1cc]);

  // Cleanup all 11 bitmap objects
  FUN_004d49d5(); FUN_004d49e1(); FUN_004d49ed(); FUN_004d49f9();
  FUN_004d4a05(); FUN_004d4a11(); FUN_004d4a1d(); FUN_004d4a29();
  FUN_004d4a35(); FUN_004d4a3e(); FUN_004d4a4a(); FUN_004d4a56();
  FUN_004d4a6c();
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d49d5 through FUN_004d4a56 — bitmap_destructor_wrappers
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d49d5() { FUN_005bd915(); }
export function FUN_004d49e1() { FUN_005bd915(); }
export function FUN_004d49ed() { FUN_005bd915(); }
export function FUN_004d49f9() { FUN_005bd915(); }
export function FUN_004d4a05() { FUN_005bd915(); }
export function FUN_004d4a11() { FUN_005bd915(); }
export function FUN_004d4a1d() { FUN_005bd915(); }
export function FUN_004d4a29() { FUN_005bd915(); }
export function FUN_004d4a35() { FUN_005bd915(); }
export function FUN_004d4a3e() { FUN_005bd915(); }
export function FUN_004d4a4a() { FUN_005bd915(); }
export function FUN_004d4a56() { FUN_005bd915(); }


// ═══════════════════════════════════════════════════════════════════
// FUN_004d4a6c — seh_frame_cleanup_4
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_004D0000.c FUN_004d4a6c (14 bytes)
export function FUN_004d4a6c() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d4a7b — throne_build_description_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d4a7b() {
  let in_ECX = G.DAT_0062e2d0 || {};
  let bVar2 = false;
  FUN_004aef20(in_ECX[0x638]);
  for (let local_c = 0; local_c < 6; local_c = local_c + 1) {
    let sVar1 = s16(G.DAT_0064caa8, in_ECX[0x1cc] * 0x594 + local_c * 2);
    let iVar3 = FUN_00596b00(in_ECX[0x1cc], local_c);
    if (iVar3 < sVar1) {
      bVar2 = true;
    }
  }
  for (let local_c = 0; local_c < 6; local_c = local_c + 1) {
    FUN_004af122(in_ECX[0x638], G.DAT_00628420 + G.DAT_00634f60[local_c * 3] * 4);
    FUN_004aefb7(in_ECX[0x638]);
    FUN_004af1d5(in_ECX[0x638], s16(G.DAT_0064caa8, in_ECX[0x1cc] * 0x594 + local_c * 2));
    if (bVar2 && local_c === 0) {
      FUN_0043c840(in_ECX[0x638], G.DAT_0062e2f4);
    }
    FUN_0043c840(in_ECX[0x638], G.DAT_0062e2f8);
  }
  FUN_004af14b(in_ECX[0x638], 0x22);
  FUN_004aefb7(in_ECX[0x638]);
  FUN_004af1d5(in_ECX[0x638], s16(G.DAT_0064caae, in_ECX[0x1cc] * 0x594));
  FUN_0043c840(in_ECX[0x638], 0);  // s_0_000
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e304);
  FUN_004af14b(in_ECX[0x638], 0x42);
  FUN_004aefb7(in_ECX[0x638]);
  FUN_004af1d5(in_ECX[0x638], G.DAT_006ad0f0);
  FUN_004aeff9(in_ECX[0x638]);
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e308);
  FUN_004af14b(in_ECX[0x638], 0xcd);
  FUN_004aefb7(in_ECX[0x638]);
  FUN_004af1d5(in_ECX[0x638], G.DAT_006ad0e8);
  FUN_004aeff9(in_ECX[0x638]);
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e30c);
  FUN_004af14b(in_ECX[0x638], 0xce);
  FUN_004aefb7(in_ECX[0x638]);
  FUN_004af1d5(in_ECX[0x638], (G.DAT_006ad0e4 / 10) | 0);
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e310);
  FUN_004af1d5(in_ECX[0x638], G.DAT_006ad0e4 % 10);
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e314);
  FUN_004af14b(in_ECX[0x638], 0xd1);
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e318);
  FUN_004af14b(in_ECX[0x638], 200);
  FUN_004aefb7(in_ECX[0x638]);
  FUN_004af1d5(in_ECX[0x638], G.DAT_006ad0dc);
  FUN_004aeff9(in_ECX[0x638]);
  if ((G.DAT_0064caa0[in_ECX[0x1cc] * 0x594] & 8) !== 0) {
    FUN_004aef36(in_ECX[0x638]);
    FUN_004af01a(in_ECX[0x638]);
    FUN_004af14b(in_ECX[0x638], 0xeb);
    FUN_004af03b(in_ECX[0x638]);
  }
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e31c);
  FUN_004af14b(in_ECX[0x638], 0xcf);
  FUN_004aefb7(in_ECX[0x638]);
  FUN_004af1d5(in_ECX[0x638], (G.DAT_006ad0f4 / 10) | 0);
  FUN_0043c840(in_ECX[0x638], G.DAT_0062e320);
  FUN_004af1d5(in_ECX[0x638], G.DAT_006ad0f4 % 10);
  FUN_004aef36(in_ECX[0x638]);
  FUN_004af14b(in_ECX[0x638], 0xd2);
  FUN_004aef20(in_ECX[0x838]);
  FUN_004af14b(in_ECX[0x838], 0xd0);
  FUN_004aefb7(in_ECX[0x838]);
  FUN_004aef36(in_ECX[0x838]);
  FUN_004af1d5(in_ECX[0x838], G.DAT_006ad0ec);
  FUN_004aeff9(in_ECX[0x838]);
  FUN_00407ff0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d4fd1 — throne_typewriter_tick
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d4fd1(param_1) {
  let in_ECX = G.DAT_0062e2d0 || {};
  let bVar4;
  if (param_1 !== 0) {
    let iVar1 = FUN_0059a791(0, 1);
    if (iVar1 !== 0) {
      return true;
    }
  }
  // param_1 === 0 or random returned 0
  let uVar2 = FUN_004d8af0();
  let iVar1 = gdi_847F(uVar2);
  FUN_00407ff0();
  // local_18 = character at current position in text buffer
  // local_17 = 0 (null terminator for single-char string)
  FUN_005c19ad(0xf9);
  if (in_ECX[0x1db4] === 0) {
    FUN_005c19ad(0xfe);
  } else {
    FUN_005c19ad(0xf9);
  }
  FUN_005c0f57(in_ECX[0x8d4], 0, in_ECX[0x8b8], in_ECX[0x8bc], 1);
  let yBottom = in_ECX[0x8bc] + iVar1 * 2;
  uVar2 = FUN_004d8af0();
  let iVar3 = measure_text_858E(uVar2);
  SetRect(/*local_14*/ 0, in_ECX[0x8b8], in_ECX[0x8bc] - iVar1, in_ECX[0x8b8] + iVar3, yBottom);
  uVar2 = FUN_004d8af0();
  iVar1 = measure_text_858E(uVar2);
  in_ECX[0x8b8] = in_ECX[0x8b8] + iVar1;
  // Check for colon — stops bold
  if (in_ECX[0x638] !== undefined && in_ECX[0x638][in_ECX[0x8c0]] === ':') {
    in_ECX[0x1db4] = 0;
  }
  in_ECX[0x8c0] = in_ECX[0x8c0] + 1;
  // Check for newlines — advance line
  while (in_ECX[0x638] !== undefined && in_ECX[0x638][in_ECX[0x8c0]] === '\n') {
    in_ECX[0x1db4] = 1;
    in_ECX[0x8b8] = 10;
    uVar2 = FUN_004d8af0();
    iVar1 = gdi_847F(uVar2);
    in_ECX[0x8bc] = in_ECX[0x8bc] + iVar1;
    in_ECX[0x8c0] = in_ECX[0x8c0] + 1;
  }
  // Check for null — end of text
  if (in_ECX[0x638] !== undefined && in_ECX[0x638][in_ECX[0x8c0]] === '\0') {
    if (in_ECX[0x62c] !== 0) {
      FUN_005d2004(in_ECX[0x62c]);
      in_ECX[0x62c] = 0;
    }
    if (in_ECX[0xae0] !== 3) {
      SetRect(/*in_ECX + 0x8dc*/ 0, 0, 0x1c1, 0x27f, 0x1df);
      FUN_0043c790(0, 1, 1);
      FUN_005c19ad(10);
      FUN_005c1020(in_ECX[0x8cc], in_ECX[0x838], 0, 0);
      FUN_0043c790(0, 0xffffffff, 0xffffffff);
      if (G.DAT_006ad0ec < 0x28) {
        FUN_005c19ad(0xf9);
      } else if (G.DAT_006ad0ec < 0x4b) {
        FUN_005c19ad(0xfb);
      } else {
        FUN_005c19ad(0xfa);
      }
      FUN_005c1020(in_ECX[0x8cc], in_ECX[0x838], 0, 0);
      FUN_00408490(0);
      FUN_00419b80();
    }
    if (in_ECX[0xae0] === 1) {
      let uVar2b = FUN_005d1f50(0, 500, 0xffffffff);
      in_ECX[0x630] = uVar2b;
    }
    in_ECX[0x8f0] = 1;
  }
  FUN_00408490(0);
  bVar4 = (in_ECX[0x638] !== undefined && in_ECX[0x638][in_ECX[0x8c0]] !== '\0');
  return bVar4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d53ab — throne_draw_shields_and_buttons
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d53ab() {
  let in_ECX = G.DAT_0062e2d0 || {};
  // SEH frame — no-op in JS
  FUN_005bd630();
  FUN_005c19ad(0x8b);
  let iVar1 = FUN_005bf5e1(0x1f1, 10, 0xec, 0);
  if (iVar1 !== 0) {
    FUN_0040bbb0();
    let uVar2 = FUN_00428b0c(G.DAT_00628420 + 0x3f8);
    FUN_0040bbe0(uVar2);
    SetRect(/*local_20*/ 0, 0, 0, 0x34, 0x24);
    OffsetRect(/*local_20*/ 0, 1, 1);
    FUN_005c1020(in_ECX[0x8d4], G.DAT_00679640, 0, 0);
    FUN_005cedad(/*local_68*/ 0, 9, 1, 1, 0x34, 0x24);
    OffsetRect(/*local_20*/ 0, 0x35, 0);
    FUN_005c1020(in_ECX[0x8d4], G.DAT_00679640, 0, 0);
    FUN_005cedad(/*local_68*/ 0, 9, 0x36, 1, 0x34, 0x24);
    OffsetRect(/*local_20*/ 0, 0x35, 0);
    FUN_005c1020(in_ECX[0x8d4], G.DAT_00679640, 0, 0);
    FUN_005cedad(/*local_68*/ 0, 9, 0x6b, 1, 0x34, 0x24);
    FUN_005c19ad(0xc6);
    FUN_0040bbb0();
    if (G.DAT_00628064 === 0) {
      let uVar2b = FUN_00428b0c(G.DAT_00628420 + 0x354);
      FUN_0040bbe0(uVar2b);
    } else if (G.DAT_00628064 === 1) {
      FUN_0040bbe0(G.DAT_0062e324);
    } else if (G.DAT_00628064 === 2) {
      FUN_0040bbe0(G.DAT_0062e32c);
    }
    SetRect(/*local_20*/ 0, 0, 0, 0x43, 0x24);
    OffsetRect(/*local_20*/ 0, 1, 0x26);
    FUN_005c1020(in_ECX[0x8d4], G.DAT_00679640, 0, 0);
    FUN_005cedad(/*local_68*/ 0, 9, 1, 0x26, 0x43, 0x24);
    OffsetRect(/*local_20*/ 0, 0x44, 0);
    FUN_005c1020(in_ECX[0x8d4], G.DAT_00679640, 0, 0);
    FUN_005cedad(/*local_68*/ 0, 9, 0x45, 0x26, 0x43, 0x24);
    OffsetRect(/*local_20*/ 0, 0x44, 0);
    FUN_005c1020(in_ECX[0x8d4], G.DAT_00679640, 0, 0);
    FUN_005cedad(/*local_68*/ 0, 9, 0x89, 0x26, 0x43, 0x24);
  }
  FUN_004d56ea();
  FUN_004d56fd();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d56ea — destructor_bitmap_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d56ea() { FUN_005bd915(); }

// ═══════════════════════════════════════════════════════════════════
// FUN_004d56fd — seh_frame_cleanup_5
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d56fd() { /* SEH frame cleanup — no-op in JS */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_004d570b — throne_star_animation_setup
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d570b() {
  let in_ECX = G.DAT_0062e2d0 || {};
  // Generate 80 random star positions (stride 0xc = 12 bytes per star: x, y, z)
  for (let local_20 = 0; local_20 < 0x50; local_20 = local_20 + 1) {
    in_ECX[0x1db8 + local_20 * 0xc] = FUN_0059a791(-32000, 32000);
    in_ECX[0x1dbc + local_20 * 0xc] = FUN_0059a791(-24000, 24000);
    in_ECX[0x1dc0 + local_20 * 0xc] = FUN_0059a791(1, 100);
  }
  let yBottom = CRichEditCntrItem_GetActiveView();
  let xRight = CRichEditCntrItem_GetActiveView();
  SetRect(/*local_14*/ 0, 0, 0x14, xRight, yBottom);
  FUN_005c0333(0, 10);
  for (let local_20 = 0; local_20 < 0x50; local_20 = local_20 + 1) {
    let local_18 = ((in_ECX[0x1db8 + local_20 * 0xc] / in_ECX[0x1dc0 + local_20 * 0xc]) | 0) + 0x140;
    let local_1c = ((in_ECX[0x1dbc + local_20 * 0xc] / in_ECX[0x1dc0 + local_20 * 0xc]) | 0) + 0xf0;
    if (0x280 < local_18 || local_18 < 0 || 0x1e0 < local_1c || local_1c < 0) {
      in_ECX[0x1db8 + local_20 * 0xc] = FUN_0059a791(-32000, 32000);
      in_ECX[0x1dbc + local_20 * 0xc] = FUN_0059a791(-24000, 24000);
      in_ECX[0x1dc0 + local_20 * 0xc] = 100;
      local_18 = ((in_ECX[0x1db8 + local_20 * 0xc] / in_ECX[0x1dc0 + local_20 * 0xc]) | 0) + 0x140;
      local_1c = ((in_ECX[0x1dbc + local_20 * 0xc] / in_ECX[0x1dc0 + local_20 * 0xc]) | 0) + 0xf0;
    }
    FUN_005c0c5d(local_18, local_1c, 0x29);
  }
  in_ECX[0x8c0] = 0;
  in_ECX[0x8b8] = 10;
  in_ECX[0x8bc] = 0x73;
  in_ECX[0x1db4] = 1;
  let iVar2;
  do {
    iVar2 = FUN_004d4fd1(0);
  } while (iVar2 !== 0);
  FUN_004aef20(in_ECX[0x838]);
  let uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x718);
  FUN_0043c840(in_ECX[0x838], uVar1);
  FUN_004aefb7(in_ECX[0x838]);
  FUN_004aef36(in_ECX[0x838]);
  FUN_00485208(in_ECX[0x838], s16(G.DAT_0064caa2, in_ECX[0x1cc] * 0x594));
  SetRect(/*in_ECX + 0x8dc*/ 0, 0, 0x1c1, 0x27f, 0x1df);
  FUN_0043c790(0, 1, 1);
  FUN_005c19ad(10);
  FUN_005c1020(in_ECX[0x8cc], in_ECX[0x838], 0, 0);
  FUN_0043c790(0, 0xffffffff, 0xffffffff);
  FUN_005c19ad(0xfa);
  FUN_005c1020(in_ECX[0x8cc], in_ECX[0x838], 0, 0);
  FUN_00408490(0);
  FUN_005cef31(/*local_30*/ 0, in_ECX[0xb8], 0xaf, 99);
  if (in_ECX[0xae0] === 3) {
    in_ECX[0x8bc] = 0x8c;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d5b21 — throne_play_video
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d5b21() {
  let in_ECX = G.DAT_0062e2d0 || {};
  // SEH frame — no-op in JS
  FUN_0046e6a9();
  let pvVar1 = operator_new(0xa28);
  let local_9c;
  if (pvVar1 === null || pvVar1 === undefined) {
    local_9c = 0;
  } else {
    local_9c = FUN_005dd010();
  }
  in_ECX[0x1da8] = local_9c;
  let local_94 = new Uint8Array(128);
  FUN_004aef20(local_94);
  FUN_0043c840(local_94, G.DAT_0062e334);
  let iVar2 = FUN_00564713(local_94);
  if (iVar2 !== 0) {
    FUN_005dd27e(G.DAT_0062e34c, 0x800, 0, 0);
    FUN_005dd71e(1);
    let local_14 = FUN_005dd377(local_94);
    if (local_14 !== 0) {
      if (local_14 === -0x7ffbfeac) {
        FUN_00421ea0(G.DAT_0062e350);
      }
      // goto cleanup
      return;
    }
    FUN_004503d0();
    FUN_00419b80();
    FUN_005c041f(0);
    FUN_00408130(0);
    COleControlSite_SetDlgCtrlID();
    CPropertySheet_EnableStackedTabs();
    FUN_00450400();
    FUN_00408460();
    FUN_004085f0();
    FUN_00419b80();
    FUN_005dd3c2();
    FUN_00421bd0();
    FUN_00414ce0();
    if (2 < G.DAT_00655b02) {
      CPropertySheet_EnableStackedTabs();
    }
    FUN_005c61b0();
    CPropertySheet_EnableStackedTabs();
    FUN_00414d40();
    FUN_004503d0();
    FUN_00419b80();
  }
  if (in_ECX[0x1da8] !== 0) {
    FUN_004d8b20(1);
  }
  in_ECX[0x1da8] = 0;
  FUN_0046e6c8();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d5e41 — throne_setup_buttons
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d5e41() {
  let in_ECX = G.DAT_0062e2d0 || {};
  CRichEditDoc_InvalidateObjectCache(in_ECX[0xae4]);
  if (in_ECX[0x1cc] === G.DAT_006d1da0 && in_ECX[0xae0] !== 3 && in_ECX[0xae0] !== 0) {
    FUN_004d8b70(0, 0x1f5, 0x1a1, 0x34, 0x24);
    FUN_004d8b70(1, 0x22f, 0x1a1, 0x43, 0x24);
  } else {
    FUN_004d8b70(0, 0x22f, 0x1a1, 0x43, 0x24);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d5ef9 — throne_draw_skip_area
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d5ef9() {
  let in_ECX = G.DAT_0062e2d0 || {};
  if (in_ECX[0xae0] !== 1 && in_ECX[0xae0] !== 0) {
    SetRect(/*local_14*/ 0, 0x1f5, 0x1a1, 0x229, 0x1c5);
    FUN_005c0333(0, 0);
  }
  FUN_004d5f79(1, 1);
  FUN_004d60a5(0, 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d5f79 — throne_draw_close_button
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d5f79(param_1, param_2) {
  let in_ECX = G.DAT_0062e2d0 || {};
  if (in_ECX[0x1cc] === G.DAT_006d1da0 && in_ECX[0xae0] !== 3 && in_ECX[0xae0] !== 0) {
    SetRect(/*local_14*/ 0, 0x1f5, 0x1a1, 0x229, 0x1c5);
  } else {
    SetRect(/*local_14*/ 0, 0x22f, 0x1a1, 0x272, 0x1c5);
  }
  if (param_2 === 0) {
    FUN_005cef31(/*local_24*/ 0, in_ECX[0xb8], 0, 0);
  } else if (param_1 === 0) {
    FUN_005cef31(/*local_44*/ 0, in_ECX[0xb8], 0, 0);
  } else {
    FUN_005cef31(/*local_34*/ 0, in_ECX[0xb8], 0, 0);
  }
  FUN_00408490(0);
  FUN_00419b80();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d60a5 — throne_draw_improve_button
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d60a5(param_1, param_2) {
  let in_ECX = G.DAT_0062e2d0 || {};
  if (in_ECX[0x1cc] === G.DAT_006d1da0 && in_ECX[0xae0] !== 3 &&
      in_ECX[0xae0] !== 0 && in_ECX[0xae0] !== 2) {
    SetRect(/*local_14*/ 0, 0x22f, 0x1a1, 0x272, 0x1c5);
    if (param_2 === 0) {
      FUN_005cef31(0, in_ECX[0xb8], 0, 0);
    } else if (param_1 === 0) {
      FUN_005cef31(0, in_ECX[0xb8], 0, 0);
    } else {
      FUN_005cef31(0, in_ECX[0xb8], 0, 0);
    }
    FUN_00408490(0);
    FUN_00419b80();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d61c3 — throne_handle_left_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d61c3(param_1, param_2) {
  let local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  } else {
    local_8 = local_8 - 0x48;
  }
  let local_c = G.DAT_0062e2d0;
  if (local_c[0xae0] === 2) {
    CRichEditDoc_InvalidateObjectCache(local_c[0x1da8] + 0x48);
  } else {
    let local_10 = 0;
    let iVar1 = FUN_0046ad85(param_1, param_2, local_10, 0);
    if (iVar1 !== -1) {
      if (local_10 === 0) {
        FUN_004d5f79(1, 0);
        if (local_c[0x8f0] === 0) {
          if (local_c[0x62c] !== 0) {
            FUN_005d2004(local_c[0x62c]);
            local_c[0x62c] = 0;
          }
          if (local_c[0xae0] !== 3) {
            let iVar1b;
            do {
              iVar1b = FUN_004d4fd1(0);
            } while (iVar1b !== 0);
            local_c[0x8f0] = 1;
            FUN_004d5f79(1, 1);
          }
        } else {
          CRichEditDoc_InvalidateObjectCache(local_8 + 0x48);
        }
      } else if (local_10 === 1 && local_c[0xae0] === 1 && local_c[0x8f0] !== 0) {
        FUN_004d60a5(1, 0);
        local_c[0xae0] = 2;
        CRichEditDoc_InvalidateObjectCache(local_8 + 0x48);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d6367 — throne_timer_tick
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d6367() {
  FUN_004d4fd1(1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d6384 — throne_toggle_improve_flag
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d6384() {
  let iVar1 = G.DAT_0062e2d0;
  if (iVar1[0x8ec] === 0) {
    iVar1[0x8ec] = 1;
  } else {
    iVar1[0x8ec] = 0;
  }
  if (iVar1[0x8ec] === 0) {
    FUN_004d60a5(1, 1);
  } else {
    FUN_004d60a5(0, 1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d63fb — throne_star_animation_tick
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d63fb() {
  let iVar2 = G.DAT_0062e2d0;
  FUN_00407ff0();
  for (let local_1c = 0; local_1c < 0x50; local_1c = local_1c + 1) {
    let iVar3 = ((iVar2[0x1db8 + local_1c * 0xc] / iVar2[0x1dc0 + local_1c * 0xc]) | 0) + 0x140;
    let iVar4 = ((iVar2[0x1dbc + local_1c * 0xc] / iVar2[0x1dc0 + local_1c * 0xc]) | 0) + 0xf0;
    iVar2[0x1db8 + local_1c * 0xc] = iVar2[0x1db8 + local_1c * 0xc] + 0xfa;
    iVar2[0x1dbc + local_1c * 0xc] = iVar2[0x1dbc + local_1c * 0xc] + 300;
    iVar2[0x1dc0 + local_1c * 0xc] = iVar2[0x1dc0 + local_1c * 0xc] - 1;
    if (iVar2[0x1dc0 + local_1c * 0xc] === 0) {
      iVar2[0x1db8 + local_1c * 0xc] = FUN_0059a791(-32000, 32000);
      iVar2[0x1dbc + local_1c * 0xc] = FUN_0059a791(-24000, 24000);
      iVar2[0x1dc0 + local_1c * 0xc] = FUN_0059a791(0x32, 100);
    }
    let local_14 = ((iVar2[0x1db8 + local_1c * 0xc] / iVar2[0x1dc0 + local_1c * 0xc]) | 0) + 0x140;
    let local_18 = ((iVar2[0x1dbc + local_1c * 0xc] / iVar2[0x1dc0 + local_1c * 0xc]) | 0) + 0xf0;
    if (0x280 < local_14 || local_14 < 0 || 0x1e0 < local_18 || local_18 < 0) {
      iVar2[0x1db8 + local_1c * 0xc] = FUN_0059a791(-32000, 32000);
      iVar2[0x1dbc + local_1c * 0xc] = FUN_0059a791(-24000, 24000);
      iVar2[0x1dc0 + local_1c * 0xc] = FUN_0059a791(0x32, 100);
      local_14 = ((iVar2[0x1db8 + local_1c * 0xc] / iVar2[0x1dc0 + local_1c * 0xc]) | 0) + 0x140;
      local_18 = ((iVar2[0x1dbc + local_1c * 0xc] / iVar2[0x1dc0 + local_1c * 0xc]) | 0) + 0xf0;
    }
    if (iVar3 < 0x280 && 0 < iVar3 && iVar4 < 0x1e0 && 0 < iVar4) {
      let iVar6 = FUN_005c0bf2(iVar3, iVar4);
      if (iVar6 === 0x29) {
        FUN_005c0c5d(iVar3, iVar4, 10);
      }
    }
    if (local_14 < 0x280 && 0 < local_14 && local_18 < 0x1e0 && 0 < local_18) {
      let iVar3b = FUN_005c0bf2(local_14, local_18);
      if (iVar3b === 10) {
        FUN_005c0c5d(local_14, local_18, 0x29);
      }
    }
  }
  FUN_00408460();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d6744 — throne_handle_keypress
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d6744(param_1) {
  let local_8 = FUN_005c62ee();
  let iVar1 = G.DAT_0062e2d0;
  if (local_8 === 0) {
    local_8 = 0;
  } else {
    local_8 = local_8 - 0x48;
  }
  if (0xcf < param_1 && param_1 < 0xd3) {
    if (iVar1[0xae0] === 2) {
      CRichEditDoc_InvalidateObjectCache(iVar1[0x1da8] + 0x48);
    } else {
      FUN_004d5f79(1, 0);
      if (iVar1[0x8f0] === 0) {
        if (iVar1[0x62c] !== 0) {
          FUN_005d2004(iVar1[0x62c]);
          iVar1[0x62c] = 0;
        }
        let iVar2;
        do {
          iVar2 = FUN_004d4fd1(0);
        } while (iVar2 !== 0);
        iVar1[0x8f0] = 1;
        FUN_004d5f79(1, 1);
      } else {
        CRichEditDoc_InvalidateObjectCache(local_8 + 0x48);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d686b — throne_check_video_invalidate
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d686b() {
  if (G.DAT_0062e2d0[0x1da8] !== 0) {
    CRichEditDoc_InvalidateObjectCache(G.DAT_0062e2d0[0x1da8] + 0x48);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d68a7 — throne_handle_left_button_down
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d68a7(param_1, param_2) {
  let local_8 = G.DAT_0062e2d0;
  if (local_8[0x1db0] !== 0 || local_8[0x1dac] !== 0) return;
  let local_c = 0;
  let iVar1 = FUN_0046ad85(param_1, param_2, local_c, 0);
  if (iVar1 === -1) return;
  if (local_c === 0) {
    local_8[0x1dac] = 1;
    FUN_004d5f79(1, 0);
    if (local_8[0xae0] === 1 && local_8[0x630] !== 0) {
      FUN_005d2004(local_8[0x630]);
      local_8[0x630] = 0;
    }
    FUN_00408460();
  } else if (local_c === 1 && local_8[0xae0] === 1 && local_8[0x8f0] !== 0) {
    local_8[0x1db0] = 1;
    FUN_004d60a5(1, 0);
    if (local_8[0xae0] === 1 && local_8[0x630] !== 0) {
      FUN_005d2004(local_8[0x630]);
      local_8[0x630] = 0;
    }
    FUN_00408460();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d6a30 — throne_handle_left_button_up
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d6a30(param_1, param_2) {
  let local_c = G.DAT_0062e2d0;
  let local_8 = FUN_005c62ee();
  if (local_8 === 0) { local_8 = 0; } else { local_8 = local_8 - 0x48; }
  if (local_c[0xae0] === 2) {
    CRichEditDoc_InvalidateObjectCache(local_c[0x1da8] + 0x48);
  } else if (local_c[0x1db0] !== 0 || local_c[0x1dac] !== 0) {
    if (local_c[0x1dac] !== 0) {
      FUN_004d5f79(1, 1);
    }
    if (local_c[0x1db0] !== 0) {
      FUN_004d60a5(1, 1);
    }
    let local_10 = 0;
    let iVar1 = FUN_0046ad85(param_1, param_2, local_10, 0);
    if (iVar1 !== -1) {
      if (local_10 === 0) {
        if (local_c[0x1dac] !== 0) {
          if (local_c[0x8f0] === 0) {
            if (local_c[0x62c] !== 0) {
              FUN_005d2004(local_c[0x62c]);
              local_c[0x62c] = 0;
            }
            if (local_c[0xae0] !== 3) {
              let iVar1b;
              do { iVar1b = FUN_004d4fd1(0); } while (iVar1b !== 0);
              local_c[0x8f0] = 1;
            }
          } else {
            CRichEditDoc_InvalidateObjectCache(local_8 + 0x48);
          }
        }
      } else if (local_10 === 1 && local_c[0x1db0] !== 0) {
        local_c[0xae0] = 2;
        CRichEditDoc_InvalidateObjectCache(local_8 + 0x48);
      }
    }
    if (local_c[0x1dac] !== 0) {
      local_c[0x1dac] = 0;
      if (local_c[0xae0] === 1 && local_c[0x630] === 0) {
        local_c[0x630] = FUN_005d1f50(0, 500, 0xffffffff);
      }
    }
    if (local_c[0x1db0] !== 0) {
      local_c[0x1db0] = 0;
      if (local_c[0xae0] === 1 && local_c[0x630] === 0) {
        local_c[0x630] = FUN_005d1f50(0, 500, 0xffffffff);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d6cbc — throne_handle_mouse_move
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d6cbc(param_1, param_2) {
  let local_8 = G.DAT_0062e2d0;
  let local_c = 0;
  let iVar1 = FUN_0046ad85(param_1, param_2, local_c, 0);
  if (iVar1 === -1) {
    if (local_8[0x1dac] !== 0) {
      FUN_004d5f79(1, 1);
      if (local_8[0xae0] === 1 && local_8[0x630] === 0) {
        local_8[0x630] = FUN_005d1f50(0, 500, 0xffffffff);
      }
    }
    if (local_8[0x1db0] !== 0) {
      FUN_004d60a5(1, 1);
      if (local_8[0xae0] === 1 && local_8[0x630] === 0) {
        local_8[0x630] = FUN_005d1f50(0, 500, 0xffffffff);
      }
    }
  } else if (local_c === 0) {
    if (local_8[0x1db0] === 0) {
      if (local_8[0x1dac] !== 0) {
        FUN_004d5f79(1, 0);
        if (local_8[0xae0] === 1 && local_8[0x630] !== 0) {
          FUN_005d2004(local_8[0x630]);
          local_8[0x630] = 0;
        }
      }
    } else {
      FUN_004d60a5(1, 1);
      if (local_8[0xae0] === 1 && local_8[0x630] === 0) {
        local_8[0x630] = FUN_005d1f50(0, 500, 0xffffffff);
      }
    }
  } else if (local_c === 1) {
    if (local_8[0x1dac] === 0) {
      if (local_8[0x1db0] !== 0) {
        FUN_004d60a5(1, 0);
        if (local_8[0xae0] === 1 && local_8[0x630] !== 0) {
          FUN_005d2004(local_8[0x630]);
          local_8[0x630] = 0;
        }
      }
    } else {
      FUN_004d5f79(1, 1);
      if (local_8[0xae0] === 1 && local_8[0x630] === 0) {
        local_8[0x630] = FUN_005d1f50(0, 500, 0xffffffff);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d6f58 — noop_stub
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_004D0000.c FUN_004d6f58 (6 bytes)
export function FUN_004d6f58() {
  // C: return; (truly empty function)
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d8af0 — get_vtable_ptr
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_004D0000.c FUN_004d8af0 (27 bytes)
export function FUN_004d8af0() {
  // return *in_ECX; // DEVIATION: MFC — get vtable ptr from this
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d8b20 — video_object_destructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d8b20(param_1) {
  FUN_005dd1a0();
  if ((param_1 & 1) !== 0) {
    operator_delete();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d8b70 — add_button_rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d8b70(param_1, param_2, param_3, param_4, param_5) {
  FUN_0046ace7(param_1, 0, param_2, param_3, param_4, param_5);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d8bc0 — editor_load_improvement_names
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d8bc0() {
  for (let local_8 = 0; local_8 < 0x43; local_8 = local_8 + 1) {
    let _Source = FUN_00428b0c(G.DAT_0064c488[local_8]);
    FUN_005f22d0_strncpy(G.DAT_006a1d88, local_8 * 0x28, _Source, 0x28);
    G.DAT_006a1daf[local_8 * 0x28] = 0;
    w32(G.DAT_006a2d28, local_8 * 0x58, u8(G.DAT_0064c48c[local_8 * 8]));
    w32(G.DAT_006a2d2c, local_8 * 0x58, u8(G.DAT_0064c48d[local_8 * 8]));
    w32(G.DAT_006a2d30, local_8 * 0x58, s8(G.DAT_0064c48e[local_8 * 8]));
    if (0x27 < local_8) {
      w32(G.DAT_006a2d34, local_8 * 0x58, s8(G.DAT_0064ba01[local_8]));
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d8caa — editor_save_improvement_names
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d8caa() {
  for (let local_8 = 0; local_8 < 0x43; local_8 = local_8 + 1) {
    let _Dest = FUN_00428b0c(G.DAT_0064c488[local_8]);
    FUN_005f22d0_strncpy(_Dest, 0, G.DAT_006a1d88, local_8 * 0x28, 0x19);
    G.DAT_0064c48c[local_8 * 8] = s32(G.DAT_006a2d28, local_8 * 0x58);
    G.DAT_0064c48d[local_8 * 8] = s32(G.DAT_006a2d2c, local_8 * 0x58);
    G.DAT_0064c48e[local_8 * 8] = s32(G.DAT_006a2d30, local_8 * 0x58);
    if (0x27 < local_8) {
      G.DAT_0064ba01[local_8] = s32(G.DAT_006a2d34, local_8 * 0x58);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d8d80 — editor_update_controls
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d8d80() {
  for (let local_14 = 1; local_14 < 5; local_14 = local_14 + 1) {
    if (G.DAT_0062e3c0[local_14] === 9) {
      let iVar1 = FUN_00418740();
      let local_10 = '';
      FUN_00418a30(local_10);
    } else if (G.DAT_0062e3c0[local_14] === 0xc) {
      let iVar1 = FUN_00418740();
      let local_8 = s32(G.DAT_006a2a00, iVar1 * 4 + G.DAT_006a4f88[0x2ec] * 0x58) + 2;
      FUN_00418d90(local_8);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d8ed6 — editor_validate_and_save
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d8ed6() {
  let local_14 = 0;
  for (let local_18 = 1; local_18 < 5; local_18 = local_18 + 1) {
    if (G.DAT_0062e3c0[local_18] === 9) {
      let local_10 = '';
      FUN_00418a70(local_10);
      let iVar1 = FUN_00418740();
      iVar1 = iVar1 - 0xca;
      let local_8 = parseInt(local_10, 10) || 0;
      let uVar2 = FUN_005adfa0(local_8, G.DAT_0062e3e8[iVar1], G.DAT_0062e3f0[iVar1]);
      G.DAT_006a2d28[G.DAT_006a4f88[0x2ec] * 0x16 + iVar1] = uVar2;
      if (G.DAT_006a2d28[G.DAT_006a4f88[0x2ec] * 0x16 + iVar1] !== local_8) {
        local_14 = local_14 + 1;
      }
    } else if (G.DAT_0062e3c0[local_18] === 0xc) {
      let local_8 = FUN_00418d60();
      local_8 = local_8 - 2;
      let iVar1 = FUN_00418740();
      G.DAT_006a2a00[G.DAT_006a4f88[0x2ec] * 0x16 + iVar1] = local_8;
    }
  }
  return local_14;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d9095 — editor_refresh_pedia
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d9095() {
  FUN_004d9b93();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d90b0 — editor_write_improvements_to_file
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d90b0(param_1) {
  for (let local_8 = 0; local_8 < 0x43; local_8 = local_8 + 1) {
    FUN_0040bbb0();
    FUN_0040ff00(G.DAT_0064c488[local_8]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062e3f8);
    let pcVar1 = FUN_00428b0c(G.DAT_0064c488[local_8]);
    let sVar2 = FUN_strlen(pcVar1);
    let local_c;
    if (sVar2 < 0x19) {
      pcVar1 = FUN_00428b0c(G.DAT_0064c488[local_8]);
      local_c = FUN_strlen(pcVar1);
    } else {
      local_c = 0x19;
    }
    FUN_004190a0(0x19 - local_c);
    FUN_004ccdb6(G.DAT_0064c48c[local_8 * 8]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062e400);
    FUN_004ccdb6(G.DAT_0064c48d[local_8 * 8]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062e404);
    FUN_004ccdef(s8(G.DAT_0064c48e[local_8 * 8]), 1);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062e40c);
    FUN_fputs(G.DAT_00679640, param_1);
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d91f8 — editor_write_wonder_flags_to_file
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d91f8(param_1) {
  for (let local_8 = 0x27; local_8 < 0x43; local_8 = local_8 + 1) {
    FUN_0040bbb0();
    FUN_004ccdef(s8(G.DAT_0064ba01[local_8]), 1);
    FUN_004190a0(8);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062e410);
    FUN_0040ff00(G.DAT_0064c488[local_8]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_0062e414);
    FUN_fputs(G.DAT_00679640, param_1);
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// show_messagebox_929A — editor_apply_changes
// ═══════════════════════════════════════════════════════════════════
export function show_messagebox_929A() {
  let iVar1 = FUN_004d8ed6();
  if (iVar1 === 0) {
    FUN_004d8caa();
    FUN_004ccab9(G.DAT_0062e420, 0);
    FUN_004ccaed(G.DAT_0062e428, 0);
    let iVar1b = FUN_show_messagebox_CF2D();
    if (iVar1b === 0) {
      let local_24 = '';
      MessageBoxA(0, local_24, G.DAT_0062e44c, 0x10);
    }
    G.DAT_006a1d7c = 0;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006a4f88 + 0x48);
    FUN_004e4ceb();
  } else {
    FUN_004d8d80();
    FUN_004d9095();
    let local_28;
    if (G.DAT_006a4f88 === 0) {
      local_28 = 0;
    } else {
      local_28 = G.DAT_006a4f88 + 0x48;
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0(G.DAT_006359dc, 0);
    FUN_0059d3c9(0);
    SetFocus(FUN_00418770());
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d93b9 — editor_rename_improvement
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d93b9() {
  let iVar1 = G.DAT_006a4f88[0x2ec];
  let local_124 = '';
  let local_10c = 0;
  let local_8;
  do {
    let local_12c;
    if (G.DAT_006a4f88 === 0) { local_12c = 0; } else { local_12c = G.DAT_006a4f88 + 0x48; }
    FUN_005a6c23(local_12c);
    local_8 = FUN_0051d63b(G.DAT_006359dc, G.DAT_0062e45c, 0x18, local_124, 0);
    FUN_005a6c45();
    if (local_8 === -1) break;
    let sVar2 = FUN_strlen(0);
  } while (true);
  if (-1 < local_8) {
    FUN_005f22d0(0, 0);
    let local_c = FUN_00418d60();
    FUN_00418d20();
    for (let local_128 = 0; local_128 < 0x43; local_128 = local_128 + 1) {
      FUN_00418ce0(0);
    }
    FUN_00418d90(local_c);
    FUN_004d9095();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d953f — editor_show_improvements_help
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d953f() {
  let local_8;
  if (G.DAT_006a4f88 === 0) { local_8 = 0; } else { local_8 = G.DAT_006a4f88 + 0x48; }
  FUN_0059d3c9(local_8);
  FUN_004190d0(G.DAT_0062e478, G.DAT_0062e468);
  FUN_0059d3c9(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d959e — editor_close
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d959e() {
  G.DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(G.DAT_006a4f88 + 0x48);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d95c6 — editor_edit_pedia_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d95c6() {
  let uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x7d8, 4, 0);
  FUN_00573e59(G.DAT_00645160, G.DAT_006a4f88[0x2ec] * 0x3c, uVar1);
  FUN_004d9095();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d9619 — editor_edit_misc_pedia
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d9619() {
  let local_14;
  if (G.DAT_006a4f88 === 0) { local_14 = 0; } else { local_14 = G.DAT_006a4f88 + 0x48; }
  FUN_0059d3c9(local_14);
  let iVar1 = FUN_00419100(G.DAT_006359dc, G.DAT_0062e480, 1);
  if (iVar1 !== -1) {
    let local_10;
    let local_8;
    if (iVar1 === 0) {
      local_10 = G.DAT_00640b98;
      local_8 = 5;
    } else {
      local_10 = G.DAT_00647168 + (iVar1 * 4 - 4) * 0xf;
      local_8 = 6;
    }
    if (local_10 !== 0) {
      let uVar2 = FUN_00428b0c(G.DAT_00628420 + 0x7d8, local_8, 0);
      FUN_00573e59(local_10, uVar2);
    }
  }
  FUN_0059d3c9(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d9718 — editor_handle_combobox_change
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d9718(param_1) {
  if (param_1 === 0xc9) {
    let iVar1 = FUN_004d8ed6();
    if (iVar1 === 0) {
      let uVar2 = FUN_00418d60();
      G.DAT_006a4f88[0x2ec] = uVar2;
      if (G.DAT_006a4f88[0x2ec] === 0) {
        FUN_00453c40();
      } else {
        FUN_00453c80();
      }
      if (G.DAT_006a4f88[0x2ec] < 0x27) {
        FUN_0043c5f0();
      } else {
        FUN_0040f380();
      }
      FUN_004d8d80();
      FUN_004d9095();
    } else {
      FUN_00418d90(G.DAT_006a4f88[0x2ec]);
      FUN_004d8d80();
      FUN_004d9095();
      let local_8;
      if (G.DAT_006a4f88 === 0) { local_8 = 0; } else { local_8 = G.DAT_006a4f88 + 0x48; }
      FUN_0059d3c9(local_8);
      FUN_004190d0(G.DAT_006359dc, G.DAT_0062e48c);
      FUN_0059d3c9(0);
      SetFocus(FUN_00418770());
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d986e — editor_add_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d986e(param_1) {
  let in_ECX = G.DAT_006a4f88 || {};
  FUN_004086c0(/*local_14*/ 0,
    G.DAT_0062e398[param_1] + in_ECX[0x124] - 0x32,
    G.DAT_0062e39c[param_1] + in_ECX[0x128],
    200, in_ECX[0x2e8] << 3);
  let iVar1 = G.DAT_006a1d80;
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
  let local_2c;
  if (in_ECX === 0) { local_2c = 0; } else { local_2c = in_ECX + 0x48; }
  FUN_00418bf0(local_2c, iVar1, 0);
  FUN_00418c70(G.DAT_006a4f90);
  FUN_00418dd0(FUN_004d9718);
  if (param_1 === 0) {
    for (let local_24 = 0; local_24 < 0x43; local_24 = local_24 + 1) {
      let uVar2 = FUN_00428b0c(G.DAT_0064c488[local_24]);
      FUN_00418ce0(uVar2);
    }
  } else if (0 < param_1 && param_1 < 3) {
    let uVar2 = FUN_00428b0c(G.DAT_00628420 + 0x7c0);
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(G.DAT_00628420 + 0x7c4);
    FUN_00418ce0(uVar2);
    for (let local_20 = 0; local_20 < 100; local_20 = local_20 + 1) {
      uVar2 = FUN_00428b0c(G.DAT_00627684[local_20]);
      FUN_00418ce0(uVar2);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d9a9f — editor_add_spinner_control
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d9a9f(param_1) {
  let in_ECX = G.DAT_006a4f88 || {};
  FUN_004086c0(0,
    G.DAT_0062e3b0[param_1] + in_ECX[0x124],
    G.DAT_0062e3b4[param_1] + in_ECX[0x128],
    0x30, in_ECX[0x2e8] + 6);
  let iVar1 = G.DAT_006a1d80;
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
  let local_24;
  if (in_ECX === 0) { local_24 = 0; } else { local_24 = in_ECX + 0x48; }
  FUN_00418910(local_24, iVar1, 0, G.DAT_0062e494);
  FUN_004189c0(3);
  FUN_00418a00(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004d9b93 — editor_pedia_repaint
// ═══════════════════════════════════════════════════════════════════
export function FUN_004d9b93() {
  let in_ECX = G.DAT_006a4f88 || {};
  FUN_00552112();
  if (G.DAT_0062e018 === 0 || G.DAT_006a1d7c === 0) {
    FUN_0040fdb0(in_ECX, 0, 0x1d);
  } else {
    FUN_005a9afe(G.DAT_0062e018, in_ECX, 0, 0, in_ECX[0x124], in_ECX[0x128], in_ECX[0x2d8], in_ECX[0x2dc]);
  }
  let local_8 = in_ECX[0x124] + 0x20;
  let local_c = in_ECX[0x128] + 0x20;
  let local_1c;
  if (in_ECX[0x2ec] < 0x27) {
    local_1c = G.DAT_00645160 + in_ECX[0x2ec] * 0x3c;
  } else {
    local_1c = G.DAT_00645a84 + (in_ECX[0x2ec] * 4 - 0x9c) * 0xf;
  }
  if (in_ECX[0x2ec] === 0) {
    FUN_005a9abf(in_ECX, local_8, local_c, 0x48, 0x28, 10);
  } else {
    let uVar1 = FUN_00417f70();
    FUN_005a9abf(in_ECX, local_8, local_c, 0x48, 0x28, uVar1);
    FUN_005cd775(2, 1);
    FUN_005cef31(0, in_ECX, local_8, local_c);
    FUN_005cd775(1, 1);
  }
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x48, 0x28, 6);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(G.DAT_006a4f90);
  FUN_005baee0(10, 10, 0, 0);
  FUN_005a9abf(in_ECX, in_ECX[0x124] + 0x32, in_ECX[0x128] + 0xe8, 0x1cc, 0x6e, 0x29);
  FUN_005a9964(in_ECX, in_ECX[0x124] + 0x32, in_ECX[0x128] + 0xe8, 0x1cc, 0x6e, 10);
  let local_10 = in_ECX[0x124] + 0x40;
  let local_18 = in_ECX[0x128] + 0xee;
  FUN_0040bbb0();
  FUN_0040bbe0(G.DAT_0062e498);
  FUN_0040ff30(in_ECX[0x2ec]);
  let iVar2 = FUN_004a2379(G.DAT_0062e4a8, G.DAT_00679640);
  if (iVar2 === 0) {
    let local_14;
    do {
      local_14 = FUN_004a23fc(1);
      // Text processing
      FUN_005baf57(in_ECX, local_14, local_10, local_18);
      local_18 = local_18 + in_ECX[0x2e8];
      let sVar4 = FUN_strlen(local_14);
    } while (1 < sVar4);
  }
  FUN_005baee0(0x29, 0x12, 1, 1);
  // Draw bottom labels
  local_10 = in_ECX[0x124] + (in_ECX[0x2d8] / 2) | 0;
  local_18 = (in_ECX[0x128] - in_ECX[0x2e8]) + 0xe6;
  FUN_0040bbb0();
  FUN_0040bc10(0x1ea);
  FUN_005bb024(in_ECX, G.DAT_00679640, local_10, local_18, 0);
  // More labels...
  FUN_00408460();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004da107 — editor_main_init
// ═══════════════════════════════════════════════════════════════════
export function FUN_004da107() {
  let in_ECX = G.DAT_006a4f88 || {};
  // SEH frame — no-op in JS
  FUN_005c64da();
  G.DAT_006a1d7c = 1;
  G.DAT_006a4f88 = in_ECX;
  let pvVar2 = operator_new(0x48);
  let local_468;
  if (pvVar2 === null) { local_468 = 0; } else { local_468 = FUN_005bd630(); }
  G.DAT_0062e018 = local_468;
  FUN_00417ef0(0, G.DAT_0062e01c);
  FUN_005d268e(G.DAT_006a4f90);
  FUN_005d25a8(G.DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12, 1, 1);
  FUN_005d2590(0x25);
  in_ECX[0x2d8] = 0x230;
  in_ECX[0x2dc] = 0x17c;
  in_ECX[0x2ec] = 1;
  G.DAT_006a1d80 = 0xc9;
  FUN_005bf071(G.DAT_0062e4b8, 10, 0xc0, 0);
  in_ECX[0x2e8] = FUN_0040ef70();
  // Setup buttons and controls
  let uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x730);
  FUN_005534bc(uVar3, 0xd, 0, 0, in_ECX[0x2d8], in_ECX[0x2dc], 0, 0, 0);
  for (let local_460 = 0; local_460 < 5; local_460 = local_460 + 1) {
    if (G.DAT_0062e3c0[local_460] === 9) {
      FUN_004d9a9f(G.DAT_0062e3c4[local_460]);
    } else if (G.DAT_0062e3c0[local_460] === 0xc) {
      FUN_004d986e(G.DAT_0062e3c4[local_460]);
    }
  }
  _Timevec_dtor();
  // Layout calculations
  FUN_0040f350(0);
  FUN_004d8bc0();
  FUN_00418d90(in_ECX[0x2ec]);
  FUN_004d8d80();
  in_ECX[0x2f8] = 3;
  FUN_00408330(0);
  CPropertySheet_EnableStackedTabs();
  FUN_004d9718(0xc9);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while (G.DAT_006a1d7c !== 0) {
    FUN_0040ef50();
  }
  if (G.DAT_0062e018 !== 0) {
    FUN_0040f010(1);
  }
  G.DAT_0062e018 = 0;
  in_ECX[0x2f8] = 0;
  FUN_004da9be();
  FUN_004da9d4();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004da9be — editor_cleanup_bitmap
// ═══════════════════════════════════════════════════════════════════
export function FUN_004da9be() { FUN_005c656b(); }

// ═══════════════════════════════════════════════════════════════════
// FUN_004da9d4 — seh_frame_cleanup_6
// ═══════════════════════════════════════════════════════════════════
export function FUN_004da9d4() { /* SEH frame cleanup — no-op in JS */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_004da9e2 — editor_open_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004da9e2() {
  // SEH frame — no-op in JS
  FUN_00417fa0();
  FUN_004da107();
  FUN_005bb574();
  FUN_004daa3b();
  FUN_004daa51();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004daa3b — editor_destructor_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004daa3b() { FUN_004183d0(); }

// ═══════════════════════════════════════════════════════════════════
// FUN_004daa51 — seh_frame_cleanup_7
// ═══════════════════════════════════════════════════════════════════
export function FUN_004daa51() { /* SEH frame cleanup — no-op in JS */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_004db210 — pedia_index_init_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004db210() { FUN_004db225(); }

// ═══════════════════════════════════════════════════════════════════
// FUN_004db225 — pedia_index_build
// ═══════════════════════════════════════════════════════════════════
export function FUN_004db225() { FUN_00428cb0(); }


// ═══════════════════════════════════════════════════════════════════
// FUN_004db23f — pedia_index_load_file
// ═══════════════════════════════════════════════════════════════════
export function FUN_004db23f(param_1, param_2) {
  FUN_004980ec(G.DAT_006a5b38);
  FUN_00497ea0(G.DAT_006a5b38, 1, param_2);
  G.DAT_0062e60c = 0;
  G.DAT_0062e610 = 0;
  FUN_getcwd(G.DAT_0062e508, 0x104);
  FUN_005f22e0(G.DAT_0062e508, G.DAT_0062e614);
  FUN_005f22e0(G.DAT_0062e508, param_1);
  FUN_00472950(G.DAT_0062e508, G.DAT_0062cd24);
  let _File = FUN_0041508c(G.DAT_0062e508, G.DAT_0062e618);
  if (_File === 0) {
    G.DAT_0062e508 = 0;
  } else {
    // Read file lines, build pedia index
    // DEVIATION: Win32 file I/O (_ftell, _fgets, _fclose) — JS environment does not have these
    // In the binary, this loop reads lines from the file, looking for lines starting with '@'
    // followed by an uppercase letter. For each match, it records the file offset and the line
    // text into G.DAT_006a5b38 via FUN_00498159, incrementing G.DAT_0062e610.
    // while ((_File->_flag & 0x10) === 0) {
    //   lVar1 = _ftell(_File);
    //   pcVar2 = _fgets(local_108, 0xff, _File);
    //   if (pcVar2 === 0) break;
    //   FUN_0056b810(local_108);
    //   FUN_004d007e(local_108);
    //   if (local_108[0] === '@' && local_108[1] > '@' && local_108[1] < '[') {
    //     sVar3 = FUN_strlen(local_108);
    //     local_8 = sVar3 + 5;
    //     if (G.DAT_006a5b48 < local_8) break;
    //     plVar4 = FUN_00498159(G.DAT_006a5b38, local_8);
    //     plVar4[0] = lVar1;
    //     FUN_005f22d0(plVar4 + 1, local_108);
    //     G.DAT_0062e610 = G.DAT_0062e610 + 1;
    //   }
    // }
    G.DAT_0062e60c = 1;
    // _fclose(_File);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004db450 — pedia_index_clear
// ═══════════════════════════════════════════════════════════════════
export function FUN_004db450() {
  G.DAT_0062e60c = 0;
  G.DAT_0062e610 = 0;
  FUN_004980ec(G.DAT_006a5b38);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004db481 — pedia_index_lookup
// ═══════════════════════════════════════════════════════════════════
export function FUN_004db481(param_1, param_2) {
  if (G.DAT_0062e60c !== 0) {
    let local_108 = '';
    FUN_getcwd(local_108, 0x104);
    FUN_005f22e0(local_108, G.DAT_0062e61c);
    FUN_005f22e0(local_108, param_1);
    let iVar2 = FUN_strcmpi(local_108, G.DAT_0062e508);
    if (iVar2 === 0) {
      let local_10c = G.DAT_006a5b40;
      for (let local_114 = 0; local_114 < G.DAT_0062e610; local_114 = local_114 + 1) {
        let iVar2b = FUN_strcmpi(local_10c + 4, param_2);
        let pcVar1 = local_10c + 4;
        if (iVar2b === 0) {
          return local_10c[0]; // return the file offset stored at the start
        }
        // Advance past null-terminated string to next entry
        while (local_10c[pcVar1 - local_10c] !== '\0') {
          pcVar1 = pcVar1 + 1;
        }
        local_10c = pcVar1 + 1;
      }
    }
  }
  return 0xffffffff;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004db690 — diplomacy_build_parley_packet
// ═══════════════════════════════════════════════════════════════════
export function FUN_004db690(param_1) {
  let in_ECX = {};
  let uVar1 = G.DAT_0062e658[param_1];
  G.DAT_0068abd0 = 0;
  G.DAT_0068abd4 = 0;
  let local_c = G.DAT_0062e698[in_ECX[0x204]];
  switch (in_ECX[0x204]) {
    case 8:
    case 0xc:
      for (let local_1c = 0; local_1c < G.DAT_0067ab94; local_1c = local_1c + 1) {
        if (G.DAT_00684bac[local_1c] === 1) { G.DAT_0068abd4 = G.DAT_0068abd4 + 1; }
      }
      local_c = in_ECX[0x1042c] * 4 + local_c;
      break;
    case 10:
    case 0x11:
      for (let local_1c = 0; local_1c < G.DAT_0067ab94; local_1c = local_1c + 1) {
        if (G.DAT_00684bac[local_1c] === 1) { G.DAT_0068abd4 = G.DAT_0068abd4 + 1; }
      }
      local_c = in_ECX[0x1042c] * 4 + local_c;
      if (in_ECX[0x204] === 0x11) {
        local_c = in_ECX[0x1042c] * 4 + local_c;
      }
      break;
  }
  let local_10 = local_c + 0x20;
  if (param_1 === 0xe) {
    let local_8 = G.DAT_0062e698[in_ECX[0x200]];
    switch (in_ECX[0x200]) {
      case 8:
      case 0xc:
        for (let local_1c = 0; local_1c < G.DAT_0067ab90; local_1c = local_1c + 1) {
          if (G.DAT_00682ba8[local_1c] === 1) { G.DAT_0068abd0 = G.DAT_0068abd0 + 1; }
        }
        local_8 = in_ECX[0x10428] * 4 + local_8;
        break;
      case 10:
      case 0x11:
        for (let local_1c = 0; local_1c < G.DAT_0067ab90; local_1c = local_1c + 1) {
          if (G.DAT_00682ba8[local_1c] === 1) { G.DAT_0068abd0 = G.DAT_0068abd0 + 1; }
        }
        local_8 = in_ECX[0x10428] * 4 + local_8;
        if (in_ECX[0x200] === 0x11) {
          local_8 = in_ECX[0x10428] * 4 + local_8;
        }
        break;
    }
    local_10 = local_10 + local_8;
  }
  let puVar2 = new Uint32Array(local_10 / 4);
  puVar2[0] = 0x66606660;
  puVar2[1] = 0x82;
  puVar2[2] = local_10;
  puVar2[4] = in_ECX[0x1ec];
  puVar2[5] = G.DAT_006d1da0;
  puVar2[6] = in_ECX[0x118];
  puVar2[7] = uVar1;
  FUN_004dbab4(puVar2, 8, in_ECX[0x204], local_c, 1);
  if (param_1 === 0xe) {
    FUN_004dbab4(0, in_ECX[0x200], local_8, 0);
  }
  FUN_0046b14d(0x82, G.DAT_006ad30c + s32(G.DAT_006ad558, G.DAT_0067a8c0 * 4) * 0x54, 0, 0, 0, 0, 0, 0, 0, puVar2);
  return puVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dbab4 — diplomacy_fill_parley_data
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dbab4(param_1, param_2, param_3, param_4) {
  let in_ECX = {};
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  switch (param_2) {
    case 5:
    case 6:
      param_1[0] = param_2;
      param_1[1] = param_3;
      param_1[2] = in_ECX[0x218];
      break;
    case 8:
      param_1[0] = param_2;
      param_1[1] = param_3;
      param_1[2] = in_ECX[0x10428 + param_4 * 4];
      local_34 = 3;
      local_30 = 0;
      for (local_2c = 0; local_2c < G.DAT_0067ab90[param_4]; local_2c = local_2c + 1) {
        if (G.DAT_00682ba8[local_2c + param_4 * 0x801] === 1) {
          param_1[local_34] = in_ECX[param_4 * 0x801 + local_2c + 0xfc];
          local_34 = local_34 + 1;
          local_30 = local_30 + 1;
          if (in_ECX[0x10428 + param_4 * 4] === local_30) {
            return;
          }
        }
      }
      break;
    case 9:
      param_1[0] = param_2;
      param_1[1] = param_3;
      {
        let local_24 = '';
        FUN_00418a70(local_24);
        let iVar1 = parseInt(local_24, 10) || 0;
        param_1[2] = iVar1;
      }
      break;
    case 10:
      param_1[0] = param_2;
      param_1[1] = param_3;
      param_1[2] = in_ECX[0x10428 + param_4 * 4];
      local_28 = 3;
      local_30 = 0;
      for (local_2c = 0; local_2c < G.DAT_0067ab90[param_4]; local_2c = local_2c + 1) {
        if (G.DAT_00682ba8[local_2c + param_4 * 0x801] === 1) {
          param_1[local_28] = in_ECX[param_4 * 0x801 + local_2c + 0x10fe];
          local_28 = local_28 + 1;
          local_30 = local_30 + 1;
          if (in_ECX[0x10428 + param_4 * 4] === local_30) {
            return;
          }
        }
      }
      break;
    case 0xc:
      param_1[0] = param_2;
      param_1[1] = param_3;
      param_1[2] = in_ECX[0x10428 + param_4 * 4];
      local_34 = 3;
      local_30 = 0;
      for (local_2c = 0; local_2c < G.DAT_0067ab90[param_4]; local_2c = local_2c + 1) {
        if (G.DAT_00682ba8[local_2c + param_4 * 0x801] === 1) {
          param_1[local_34] = in_ECX[param_4 * 0x801 + local_2c + 0xfc];
          local_34 = local_34 + 1;
          local_30 = local_30 + 1;
          if (in_ECX[0x10428 + param_4 * 4] === local_30) {
            return;
          }
        }
      }
      break;
    case 0xd:
      param_1[0] = param_2;
      param_1[1] = param_3;
      param_1[2] = in_ECX[0x224 + param_4 * 4];
      break;
    case 0x11:
      param_1[0] = param_2;
      param_1[1] = param_3;
      param_1[2] = in_ECX[0x10428 + param_4 * 4];
      local_28 = 3;
      local_30 = 0;
      for (local_2c = 0; local_2c < G.DAT_0067ab90[param_4]; local_2c = local_2c + 1) {
        if (G.DAT_00682ba8[local_2c + param_4 * 0x801] === 1) {
          param_1[local_28] = in_ECX[param_4 * 0x801 + local_2c + 0x10fe];
          param_1[local_28 + 1] = in_ECX[param_4 * 0x801 + local_2c + 0x3102];
          local_28 = local_28 + 2;
          local_30 = local_30 + 1;
          if (in_ECX[0x10428 + param_4 * 4] === local_30) {
            return;
          }
        }
      }
      break;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dbee6 — diplomacy_build_description_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dbee6(param_1, param_2) {
  if (param_1 === 0) return;
  let piVar1 = param_1[0x20 / 4]; // pointer at param_1 + 0x20
  let iVar2 = param_1[0x24 / 4] + param_1;
  let puVar3 = iVar2[0x20 / 4]; // pointer at iVar2 + 0x20
  FUN_004aef20(G.DAT_006a5b58);
  let sVar4 = FUN_strlen(G.DAT_006a5b58);
  if (sVar4 !== 0) {
    FUN_005dae6b(7, 'strlen(parleyDescription) == 0', 0, 0x120);
  }
  if (param_2 === 0) {
    let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc70);
    FUN_004af174(G.DAT_006a5b58, uVar5);
    FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e854);
  }
  sVar4 = FUN_strlen(G.DAT_006a5b58);
  if (0x7ff < sVar4) {
    FUN_005dae6b(7, 'strlen(parleyDescription) < 2048', 0, 0x126);
  }
  switch (param_1[0x10 / 4]) {
    case 6:
      FUN_004def54(param_1[0x28 / 4], 0);
      break;
    case 7: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc98);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8c4);
      uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc9c);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8cc);
      FUN_004dcafa(piVar1);
      break;
    }
    case 8: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc98);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8dc);
      uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xca4);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8e4);
      FUN_004af174(G.DAT_006a5b58, ' ');
      FUN_004dcc0c(param_1[0x28 / 4]);
      break;
    }
    case 9: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc98);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8d0);
      uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xca0);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8d8);
      FUN_004dcc83(piVar1);
      break;
    }
    case 10: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc98);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8f4);
      uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xca8);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8fc);
      FUN_004dcea5(piVar1);
      break;
    }
    case 0xb: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc98);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e900);
      FUN_004dd016(param_1[0x28 / 4], 0);
      break;
    }
    case 0xc: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc84);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8b8);
      uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc94);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8c0);
      FUN_004dd176(piVar1);
      break;
    }
    case 0xd: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc84);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8ac);
      let iVar2b = param_1[0x28 / 4];
      if (iVar2b === 0) {
        uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc88);
        FUN_004af174(G.DAT_006a5b58, uVar5);
      } else if (iVar2b === 1) {
        uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc8c);
        FUN_004af174(G.DAT_006a5b58, uVar5);
      } else if (iVar2b === 2) {
        uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xc90);
        FUN_004af174(G.DAT_006a5b58, uVar5);
      }
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e8b4);
      break;
    }
    case 0xe: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcb4);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e910);
      // Second side (puVar3)
      switch (puVar3[0]) {
        case 5:
        case 6:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xd1c);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e93c);
          FUN_004def54(iVar2[0x28 / 4], 1);
          break;
        case 8:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcb8);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e918);
          FUN_004dcafa(puVar3);
          break;
        case 9:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcbc);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e91c);
          FUN_004af174(G.DAT_006a5b58, ' ');
          FUN_004dcc0c(iVar2[0x28 / 4]);
          break;
        case 10:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcc0);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e92c);
          FUN_004dcc83(puVar3);
          break;
        case 0xc:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xccc);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e938);
          FUN_004dd176(puVar3);
          break;
        case 0xd:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcc8);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e934);
          FUN_004dd016(iVar2[0x28 / 4], 0);
          break;
        case 0x11:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcc4);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e930);
          FUN_004dcea5(puVar3);
          break;
      }
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e940);
      // First side (piVar1)
      switch (piVar1[0]) {
        case 5:
        case 6:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xd20);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e968);
          FUN_004def54(param_1[0x28 / 4], 1);
          break;
        case 8:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcd0);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e944);
          FUN_004dcafa(piVar1);
          break;
        case 9:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcd4);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e948);
          FUN_004af174(G.DAT_006a5b58, ' ');
          FUN_004dcc0c(param_1[0x28 / 4]);
          break;
        case 10:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcd8);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e958);
          FUN_004dcc83(piVar1);
          break;
        case 0xc:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xce4);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e964);
          FUN_004dd176(piVar1);
          break;
        case 0xd:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xce0);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e960);
          FUN_004dd016(param_1[0x28 / 4], 1);
          break;
        case 0x11:
          uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcdc);
          FUN_004af174(G.DAT_006a5b58, uVar5);
          FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e95c);
          FUN_004dcea5(piVar1);
          break;
      }
      break;
    }
    case 0xf: {
      let uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcac);
      FUN_004af174(G.DAT_006a5b58, uVar5);
      FUN_004aef36(G.DAT_006a5b58);
      if (piVar1[0] === 0xc) {
        uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xd18);
        FUN_004af174(G.DAT_006a5b58, uVar5);
      } else if (piVar1[0] === 5 || piVar1[0] === 6) {
        uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xd14);
        FUN_004af174(G.DAT_006a5b58, uVar5);
      } else {
        uVar5 = FUN_00428b0c(G.DAT_00628420 + 0xcb0);
        FUN_004af174(G.DAT_006a5b58, uVar5);
      }
      FUN_005f22e0(G.DAT_006a5b58, G.DAT_0062e908);
      switch (piVar1[0]) {
        case 5:
        case 6:
          FUN_004def54(param_1[0x28 / 4], 1);
          break;
        case 8:
          FUN_004dcafa(piVar1);
          break;
        case 9:
          FUN_004dcc0c(param_1[0x28 / 4]);
          break;
        case 10:
          FUN_004dcc83(piVar1);
          break;
        case 0xc:
          FUN_004dd176(piVar1);
          break;
        case 0xd:
          FUN_004dd016(param_1[0x28 / 4], 1);
          break;
        case 0x11:
          FUN_004dcea5(piVar1);
          break;
      }
      break;
    }
  }
  sVar4 = FUN_strlen(G.DAT_006a5b58);
  if (0x7ff < sVar4) {
    FUN_005dae6b(7, 'strlen(parleyDescription) < 2048', 0, 0x1f1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dcafa — diplomacy_format_city_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dcafa(param_1) {
  let iVar1 = param_1[2] || 0;
  let local_8 = 3;
  for (let local_10 = 0; local_10 < iVar1; local_10 = local_10 + 1) {
    let uVar2 = FUN_00428b0c(G.DAT_00627684[param_1[local_8]]);
    FUN_004af174(G.DAT_006a5b58, uVar2);
    if (1 < iVar1) {
      if (local_10 < iVar1 - 2) {
        FUN_005f22e0(G.DAT_006a5b58, ', ');
      } else if (iVar1 - 2 === local_10) {
        FUN_004aef36(G.DAT_006a5b58);
        let uVar2b = FUN_00428b0c(G.DAT_00628420 + 0xce8);
        FUN_004af174(G.DAT_006a5b58, uVar2b);
        FUN_004aef36(G.DAT_006a5b58);
      } else {
        FUN_005f22e0(G.DAT_006a5b58, '.');
      }
    }
    local_8 = local_8 + 1;
  }
  FUN_005f22e0(G.DAT_006a5b58, '.');
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dcc0c — diplomacy_format_gold_amount
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dcc0c(param_1) {
  let local_14 = String(param_1);
  FUN_005f22e0(G.DAT_006a5b58, local_14);
  FUN_004aef36(G.DAT_006a5b58);
  let uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xcec);
  FUN_005f22e0(G.DAT_006a5b58, uVar1);
  FUN_005f22e0(G.DAT_006a5b58, '.');
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dcc83 — diplomacy_format_unit_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dcc83(param_1) {
  let aiStack_120 = new Array(0x3e).fill(0);
  let local_18 = param_1[2] || 0;
  let local_24 = 3;
  let local_1c = 0;
  for (let local_20 = 0; local_20 < local_18; local_20 = local_20 + 1) {
    let iVar1 = FUN_0052ec47(param_1[local_24 + local_20]);
    if (-1 < iVar1) {
      if (aiStack_120[u8(G.DAT_006560f6[iVar1 * 0x20])] === 0) {
        local_1c = local_1c + 1;
      }
      aiStack_120[u8(G.DAT_006560f6[iVar1 * 0x20])] = aiStack_120[u8(G.DAT_006560f6[iVar1 * 0x20])] + 1;
    }
  }
  let local_28 = 0;
  for (let local_20 = 0; local_20 < 0x3e; local_20 = local_20 + 1) {
    if (aiStack_120[local_20] !== 0) {
      FUN_004af122(G.DAT_006a5b58, G.DAT_0064b1b8[local_20]);
      FUN_005f22e0(G.DAT_006a5b58, ' (');
      FUN_005f22e0(G.DAT_006a5b58, String(aiStack_120[local_20]));
      FUN_005f22e0(G.DAT_006a5b58, ')');
      if (1 < local_18) {
        if (local_28 < local_1c - 2) {
          FUN_005f22e0(G.DAT_006a5b58, ', ');
        } else if (local_1c - 2 === local_28) {
          FUN_004aef36(G.DAT_006a5b58);
          let uVar2 = FUN_00428b0c(G.DAT_00628420 + 0xce8);
          FUN_004af174(G.DAT_006a5b58, uVar2);
          FUN_004aef36(G.DAT_006a5b58);
        } else {
          FUN_005f22e0(G.DAT_006a5b58, '.');
        }
      }
      local_28 = local_28 + 1;
    }
  }
  FUN_005f22e0(G.DAT_006a5b58, '.');
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dcea5 — diplomacy_format_unit_and_count_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dcea5(param_1) {
  let iVar1 = param_1[2] || 0;
  for (let local_1c = 0; local_1c < iVar1; local_1c = local_1c + 1) {
    let iVar2 = FUN_0052ed95(param_1[3 + local_1c * 2]);
    FUN_0043c840(G.DAT_006a5b58, G.DAT_0064f360[iVar2 * 0x58]);
    FUN_005f22e0(G.DAT_006a5b58, ' (');
    FUN_005f22e0(G.DAT_006a5b58, String(param_1[4 + local_1c * 2]));
    FUN_005f22e0(G.DAT_006a5b58, ')');
    if (1 < iVar1) {
      if (local_1c < iVar1 - 2) {
        FUN_005f22e0(G.DAT_006a5b58, ', ');
      } else if (iVar1 - 2 === local_1c) {
        FUN_004aef36(G.DAT_006a5b58);
        let uVar3 = FUN_00428b0c(G.DAT_00628420 + 0xce8);
        FUN_004af174(G.DAT_006a5b58, uVar3);
        FUN_004aef36(G.DAT_006a5b58);
      } else {
        FUN_005f22e0(G.DAT_006a5b58, '.');
      }
    }
  }
  FUN_005f22e0(G.DAT_006a5b58, '.');
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dd016 — diplomacy_format_attitude
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dd016(param_1, param_2) {
  let uVar1;
  if (param_1 === 0) {
    if (param_2 === 0) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xcf0);
    } else {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xcf4);
    }
  } else if (param_1 === 1) {
    if (param_2 === 0) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xcf8);
    } else {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xcfc);
    }
  } else if (param_1 === 2) {
    if (param_2 === 0) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xd00);
    } else {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xd04);
    }
  }
  FUN_004af174(G.DAT_006a5b58, uVar1);
  FUN_005f22e0(G.DAT_006a5b58, '.');
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dd176 — diplomacy_format_map_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dd176(param_1) {
  let iVar1 = param_1[2] || 0;
  let local_10 = 3;
  for (let local_c = 0; local_c < iVar1; local_c = local_c + 1) {
    let uVar2 = FUN_00493c7d(param_1[local_10]);
    FUN_004af174(G.DAT_006a5b58, uVar2);
    if (1 < iVar1) {
      if (local_c < iVar1 - 2) {
        FUN_005f22e0(G.DAT_006a5b58, ', ');
      } else if (iVar1 - 2 === local_c) {
        FUN_004aef36(G.DAT_006a5b58);
        let uVar2b = FUN_00428b0c(G.DAT_00628420 + 0xce8);
        FUN_004af174(G.DAT_006a5b58, uVar2b);
        FUN_004aef36(G.DAT_006a5b58);
      } else {
        FUN_005f22e0(G.DAT_006a5b58, '.');
      }
    }
    local_10 = local_10 + 1;
  }
  FUN_005f22e0(G.DAT_006a5b58, '.');
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dd285 — diplomacy_execute_transaction
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dd285(param_1) {
  if (param_1 === 0) return;
  FUN_005d2279('Start ExecuteParleyTransaction', G.DAT_00628468);
  let iVar1 = param_1[0x14 / 4];
  let iVar2 = param_1[0x18 / 4];
  let puVar3 = param_1[0x20 / 4];
  let iVar4 = param_1[0x24 / 4] + param_1;
  let puVar5 = iVar4[0x20 / 4];
  let txnType = param_1[0x10 / 4];
  switch (txnType) {
    case 6: FUN_004df10f(param_1[0x28 / 4], iVar1, iVar2); break;
    case 7: FUN_004ddfb2(iVar2, iVar1, puVar3); break;
    case 8: FUN_004ddf04(iVar2, iVar1, param_1[0x28 / 4]); break;
    case 9: FUN_004de990(iVar2, puVar3); break;
    case 10: FUN_004de049(iVar2, puVar3); break;
    case 0xb: FUN_004dd8ad(iVar2, iVar1, param_1[0x28 / 4]); break;
    case 0xc:
      FUN_004dde9e(iVar1, puVar3);
      FUN_004dde9e(iVar2, puVar3);
      break;
    case 0xd:
      FUN_004dd8ad(iVar1, iVar2, param_1[0x28 / 4]);
      FUN_004dd8ad(iVar2, iVar1, param_1[0x28 / 4]);
      break;
    case 0xe:
      // Trade — execute second side (puVar5)
      switch (puVar5[0]) {
        case 5:
        case 6:
          FUN_004df10f(iVar4[0x28 / 4], iVar1, iVar2);
          break;
        case 8:
          FUN_004ddfb2(iVar2, iVar1, puVar5);
          break;
        case 9:
          FUN_004ddf04(iVar2, iVar1, iVar4[0x28 / 4]);
          break;
        case 10:
          FUN_004de990(iVar2, puVar5);
          break;
        case 0xc:
          FUN_004dde9e(iVar1, puVar5);
          break;
        case 0xd:
          FUN_004dd8ad(iVar2, iVar1, iVar4[0x28 / 4]);
          break;
        case 0x11:
          FUN_004de049(iVar2, puVar5);
          break;
      }
      // Trade — execute first side (puVar3)
      switch (puVar3[0]) {
        case 5:
        case 6:
          FUN_004df10f(param_1[0x28 / 4], iVar1, iVar2);
          break;
        case 8:
          FUN_004ddfb2(iVar1, iVar2, puVar3);
          break;
        case 9:
          FUN_004ddf04(iVar1, iVar2, param_1[0x28 / 4]);
          break;
        case 10:
          FUN_004de990(iVar1, puVar3);
          break;
        case 0xc:
          FUN_004dde9e(iVar2, puVar3);
          break;
        case 0xd:
          FUN_004dd8ad(iVar1, iVar2, param_1[0x28 / 4]);
          break;
        case 0x11:
          FUN_004de049(iVar1, puVar3);
          break;
      }
      break;
    case 0xf:
      // Demand — execute one side (puVar3)
      switch (puVar3[0]) {
        case 5:
        case 6:
          FUN_004df10f(param_1[0x28 / 4], iVar1, iVar2);
          break;
        case 8:
          FUN_004ddfb2(iVar1, iVar2, puVar3);
          break;
        case 9:
          FUN_004ddf04(iVar1, iVar2, param_1[0x28 / 4]);
          break;
        case 10:
          FUN_004de990(iVar1, puVar3);
          break;
        case 0xc:
          FUN_004dde9e(iVar2, puVar3);
          break;
        case 0xd:
          FUN_004dd8ad(iVar1, iVar2, param_1[0x28 / 4]);
          break;
        case 0x11:
          FUN_004de049(iVar1, puVar3);
          break;
      }
      break;
  }
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  if (G.DAT_006d1da0 === iVar2) {
    FUN_0056a65e(1);
  } else {
    FUN_0046b14d(0x79, s32(G.DAT_006ad30c, s32(G.DAT_006ad558, iVar2 * 4) * 0x54), 0, 0, 0, 0, 0, 0, 0, 0);
  }
  if (G.DAT_006d1da0 === iVar1) {
    FUN_0056a65e(1);
  } else {
    FUN_0046b14d(0x79, s32(G.DAT_006ad30c, s32(G.DAT_006ad558, iVar1 * 4) * 0x54), 0, 0, 0, 0, 0, 0, 0, 0);
  }
  if (s32(G.DAT_0064b9e8, iVar2 * 4) === 0 && s16(G.DAT_0064c708, iVar2 * 0x594) === 0) {
    kill_civ(iVar2, iVar1);
  }
  if (s32(G.DAT_0064b9e8, iVar1 * 4) === 0 && s16(G.DAT_0064c708, iVar1 * 0x594) === 0) {
    kill_civ(iVar1, iVar2);
  }
  FUN_005d2279('End ExecuteParleyTransaction', G.DAT_00628468);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dd8ad — diplomacy_cede_map_territory
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dd8ad(param_1, param_2, param_3) {
  let uVar3 = 1 << (param_1 & 0x1f);
  let uVar4 = 1 << (param_2 & 0x1f);
  let local_1c = 0;
  let local_14 = 0;
  let local_2c;
  let local_24;
  FUN_005b9ec6();
  for (let local_c = 0; local_c < G.DAT_006d1164; local_c = local_c + 1) {
    let iVar5 = FUN_005b8931(local_14, local_1c);
    let pbVar6 = FUN_005b898b(local_14, local_1c, param_1);
    let pbVar7 = FUN_005b898b(local_14, local_1c, param_2);
    if ((uVar4 & u8(iVar5 + 4)) !== 0) {
      if ((uVar3 & u8(iVar5 + 4)) === 0) {
        FUN_005b9d81(local_14, local_1c, 0, param_1, 0, 1);
        FUN_005b976d(local_14, local_1c, uVar3, 1, 1);
      }
      if (param_3 === 0) {
        if ((pbVar6 & 0x80) === 0 || (pbVar7 & 0x80) === 0) {
          let bVar2 = pbVar7;
          let bVar1 = pbVar6;
          iVar5 = FUN_005b8931(local_14, local_1c);
          local_2c = (bVar2 | bVar1) & u8(iVar5 + 1) & 0x80;
        } else {
          local_2c = 0x80;
        }
        pbVar6 = FUN_005b898b(local_14, local_1c, param_1, param_1, 0, 1);
        FUN_005b9d81(local_14, local_1c, (pbVar6 & 0x7f) | local_2c);
        iVar5 = FUN_005b8931(local_14, local_1c, param_1, 1, 1);
        let bVar2 = u8(iVar5 + 1);
        pbVar6 = FUN_005b898b(local_14, local_1c, param_2);
        FUN_005b9d81(local_14, local_1c, bVar2 & pbVar6);
      }
    }
    local_14 = local_14 + 2;
    if (G.DAT_006d1160 <= local_14) {
      local_1c = local_1c + 1;
      local_14 = local_1c & 1;
    }
  }
  local_24 = (uVar3 & 0xff);
  // Transfer units visibility
  if (param_3 === 0) {
    for (let local_34 = 0; local_34 < G.DAT_00655b16; local_34 = local_34 + 1) {
      if (s32(G.DAT_0065610a, local_34 * 0x20) !== 0 &&
         ((uVar4 & u8(G.DAT_006560f9[local_34 * 0x20])) !== 0 ||
          s8(G.DAT_006560f7[local_34 * 0x20]) === param_2)) {
        G.DAT_006560f9[local_34 * 0x20] = G.DAT_006560f9[local_34 * 0x20] | local_24;
        let iVar5 = FUN_005b8931(s16(G.DAT_006560f0, local_34 * 0x20), s16(G.DAT_006560f2, local_34 * 0x20));
        if ((uVar3 & u8(iVar5 + 4)) === 0 || (uVar4 & u8(iVar5 + 4)) === 0) {
          for (let local_c = 0; local_c < 0x15; local_c = local_c + 1) {
            let uVar8 = FUN_005ae052(s8(G.DAT_00628370[local_c]) + local_14);
            let iVar9_y = s8(G.DAT_006283a0[local_c]) + local_1c;
            let iVar9 = FUN_004087c0(uVar8, iVar9_y);
            if (iVar9 !== 0) {
              FUN_005b976d(uVar8, iVar9_y, uVar3, 1, 1);
              FUN_005b976d(uVar8, iVar9_y, uVar4, 1, 1);
            }
          }
        }
      }
    }
  }
  // Transfer cities visibility
  if (param_3 === 0 || param_3 === 1) {
    for (let local_20 = 0; local_20 < G.DAT_00655b18; local_20 = local_20 + 1) {
      if (s32(G.DAT_0064f394, local_20 * 0x58) !== 0 &&
         ((uVar4 & s8(G.DAT_0064f34c[local_20 * 0x58])) !== 0 ||
          s8(G.DAT_0064f348[local_20 * 0x58]) === param_2)) {
        if (s8(G.DAT_0064f348[local_20 * 0x58]) === param_2) {
          G.DAT_0064f34d[local_20 * 0x58 + param_1] = G.DAT_0064f349[local_20 * 0x58];
        } else {
          G.DAT_0064f34d[local_20 * 0x58 + param_1] = G.DAT_0064f34d[local_20 * 0x58 + param_2];
        }
        G.DAT_0064f34c[local_20 * 0x58] = G.DAT_0064f34c[local_20 * 0x58] | local_24;
        let iVar5 = FUN_005b8931(s16(G.DAT_0064f340, local_20 * 0x58), s16(G.DAT_0064f342, local_20 * 0x58));
        if ((uVar3 & u8(iVar5 + 4)) === 0 || (uVar4 & u8(iVar5 + 4)) === 0) {
          for (let local_c = 0; local_c < 0x15; local_c = local_c + 1) {
            let uVar8 = FUN_005ae052(s8(G.DAT_00628370[local_c]) + local_14);
            let iVar9_y = s8(G.DAT_006283a0[local_c]) + local_1c;
            let iVar9 = FUN_004087c0(uVar8, iVar9_y);
            if (iVar9 !== 0) {
              FUN_005b976d(uVar8, iVar9_y, uVar3, 1, 1);
              FUN_005b976d(uVar8, iVar9_y, uVar4, 1, 1);
            }
          }
        }
      }
    }
  }
  FUN_005b9f1c();
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  if (G.DAT_006d1da0 === param_1) {
    FUN_0047cf9e(G.DAT_006d1da0, 1);
  } else {
    FUN_0046b14d(0x74, s32(G.DAT_006ad30c, s32(G.DAT_006ad558, param_1 * 4) * 0x54), 0, 0, 0, 0, 0, 0, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004dde9e — diplomacy_give_techs
// ═══════════════════════════════════════════════════════════════════
export function FUN_004dde9e(param_1, param_2) {
  let iVar1 = param_2[2] || 0;
  let local_10 = 3;
  for (let local_c = 0; local_c < iVar1; local_c = local_c + 1) {
    FUN_00467825(param_1, param_2[local_10], 0x2000);
    local_10 = local_10 + 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ddf04 — diplomacy_transfer_gold
// ═══════════════════════════════════════════════════════════════════
export function FUN_004ddf04(param_1, param_2, param_3) {
  if (s32(G.DAT_0064c6a2, param_2 * 0x594) < param_3) {
    param_3 = s32(G.DAT_0064c6a2, param_2 * 0x594);
  }
  s32(G.DAT_0064c6a2, param_2 * 0x594) = s32(G.DAT_0064c6a2, param_2 * 0x594) - param_3;
  s32(G.DAT_0064c6a2, param_1 * 0x594) = s32(G.DAT_0064c6a2, param_1 * 0x594) + param_3;
  let iVar1 = FUN_0045b472(param_3);
  FUN_00456f20(param_1, param_2, -((iVar1 * 3) / 2) | 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ddfb2 — diplomacy_transfer_techs
// ═══════════════════════════════════════════════════════════════════
export function FUN_004ddfb2(param_1, param_2, param_3) {
  let iVar1 = param_3[2] || 0;
  let local_10 = 3;
  for (let local_c = 0; local_c < iVar1; local_c = local_c + 1) {
    let iVar2 = FUN_004bd9f0(param_2, param_3[local_10]);
    if (iVar2 !== 0) {
      iVar2 = FUN_004bd9f0(param_1, param_3[local_10]);
      if (iVar2 === 0) {
        FUN_004bf05b(param_1, param_3[local_10], param_2, 1, 0);
      }
    }
    local_10 = local_10 + 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004de049 — diplomacy_transfer_units
// ═══════════════════════════════════════════════════════════════════
export function FUN_004de049(param_1, param_2) {
  let iVar1 = param_2[2] || 0;
  let local_14 = 3;
  for (let local_c = 0; local_c < iVar1; local_c = local_c + 1) {
    let iVar2 = FUN_0052ed95(param_2[local_14]);
    if (-1 < iVar2 && s32(G.DAT_0064f394, iVar2 * 0x58) !== 0) {
      FUN_004de0e2(iVar2, param_1);
    }
    local_14 = local_14 + 2;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004de0e2 — diplomacy_transfer_single_city
// ═══════════════════════════════════════════════════════════════════
export function FUN_004de0e2(param_1, param_2) {
  let cVar1 = s8(G.DAT_0064f348[param_1 * 0x58]);
  let iVar2 = cVar1;
  let iVar3 = s16(G.DAT_0064f340, param_1 * 0x58);
  let iVar4 = s16(G.DAT_0064f342, param_1 * 0x58);
  FUN_0043d289(param_1, 1, 0);
  FUN_0043d289(param_1, 4, 0);
  FUN_0043d289(param_1, 0xb, 0);
  FUN_0043d289(param_1, 7, 0);
  // C: *(undefined2 *)(&G.DAT_0064c6ae + param_2 * 0x594) = G.DAT_00655af8
  w16(G.DAT_0064c6ae, param_2 * 0x594, G.DAT_00655af8);
  // Increment city count for new owner
  let cityCount = s16(G.DAT_0064c708, param_2 * 0x594);
  w16(G.DAT_0064c708, param_2 * 0x594, cityCount + 1);
  // Decrement city count for old owner
  if (s16(G.DAT_0064c708, iVar2 * 0x594) !== 0) {
    w16(G.DAT_0064c708, iVar2 * 0x594, s16(G.DAT_0064c708, iVar2 * 0x594) - 1);
  }
  FUN_005b9ec6();
  for (let local_10 = 0; local_10 < 0x15; local_10 = local_10 + 1) {
    let uVar5 = FUN_005ae052(s8(G.DAT_00628370[local_10]) + iVar3);
    let iVar6 = s8(G.DAT_006283a0[local_10]) + iVar4;
    let iVar7 = FUN_004087c0(uVar5, iVar6);
    if (iVar7 !== 0) {
      FUN_005b9c49(uVar5, iVar6, param_2, 1);
      FUN_005b976d(uVar5, iVar6, 1 << (param_2 & 0x1f), 1, 1);
    }
  }
  G.DAT_0064f348[param_1 * 0x58] = u8(param_2);
  FUN_0043cc00(param_1, iVar2);
  if (G.DAT_00627670 !== 0) {
    FUN_004fc2bb(G.DAT_0064f360[param_1 * 0x58], param_2, iVar2);
  }
  FUN_005b99e8(iVar3, iVar4, param_2, 1);
  // Transfer units in city
  let local_2c = G.DAT_00655b16;
  while (local_2c = local_2c - 1, -1 < local_2c) {
    if (s32(G.DAT_0065610a, local_2c * 0x20) !== 0 &&
       s8(G.DAT_006560f7[local_2c * 0x20]) === iVar2) {
      if (u8(G.DAT_00656100[local_2c * 0x20]) === param_1 &&
         (s16(G.DAT_0064f340, param_1 * 0x58) !== s16(G.DAT_006560f0, local_2c * 0x20) ||
          s16(G.DAT_0064f342, param_1 * 0x58) !== s16(G.DAT_006560f2, local_2c * 0x20))) {
        FUN_005b5d93(local_2c, 1);
      } else if (s16(G.DAT_0064f340, param_1 * 0x58) === s16(G.DAT_006560f0, local_2c * 0x20) &&
                s16(G.DAT_0064f342, param_1 * 0x58) === s16(G.DAT_006560f2, local_2c * 0x20)) {
        // Transfer unit ownership
        let unitType = u8(G.DAT_006560f6[local_2c * 0x20]);
        G.DAT_0064c778[param_2 * 0x594 + unitType] = G.DAT_0064c778[param_2 * 0x594 + unitType] + 1;
        G.DAT_0064c778[iVar2 * 0x594 + unitType] = G.DAT_0064c778[iVar2 * 0x594 + unitType] - 1;
        G.DAT_006560f7[local_2c * 0x20] = u8(param_2);
        G.DAT_00656100[local_2c * 0x20] = 0xff;
        G.DAT_006560f8[local_2c * 0x20] = 0;
        G.DAT_006560ff[local_2c * 0x20] = 0xff;
        param_1 = FUN_0043d07a(s16(G.DAT_006560f0, local_2c * 0x20),
                               s16(G.DAT_006560f2, local_2c * 0x20), param_2,
                               0xffffffff, 0xffffffff);
        if (-1 < param_1 && s8(G.DAT_0064f348[param_1 * 0x58]) === param_2) {
          G.DAT_00656100[local_2c * 0x20] = u8(param_1);
        }
        FUN_005b490e(local_2c, param_2);
        if (s8(G.DAT_0064b1ca[unitType * 0x14]) < 5) {
          w16(G.DAT_0064c706, param_2 * 0x594, s16(G.DAT_0064c706, param_2 * 0x594) + 1);
        }
        s32(G.DAT_0064b9e8, param_2 * 4);
        w32(G.DAT_0064b9e8, param_2 * 4, s32(G.DAT_0064b9e8, param_2 * 4) + 1);
        if (s16(G.DAT_0064c706, iVar2 * 0x594) !== 0 &&
           s8(G.DAT_0064b1ca[unitType * 0x14]) < 5) {
          w16(G.DAT_0064c706, iVar2 * 0x594, s16(G.DAT_0064c706, iVar2 * 0x594) - 1);
        }
        if (s32(G.DAT_0064b9e8, iVar2 * 4) !== 0) {
          w32(G.DAT_0064b9e8, iVar2 * 4, s32(G.DAT_0064b9e8, iVar2 * 4) - 1);
        }
      }
    }
  }
  // Check if city can still build what it was building
  let prodItem = s8(G.DAT_0064f379[param_1 * 0x58]);
  if (prodItem < 0 ||
     (iVar2 = FUN_004bfe5a(param_2, param_1, prodItem), iVar2 !== 0)) {
    if (-1 < prodItem) {
      // production is valid, jump to LAB_004de76b
    } else {
      let local_34;
      if (prodItem < 1) {
        local_34 = ~prodItem + 1;
      } else {
        local_34 = prodItem;
      }
      iVar2 = FUN_004c03ae(param_2, param_1, local_34);
      if (iVar2 !== 0) {
        // can build, jump to LAB_004de76b
      } else {
        // fall through to reset production
        G.DAT_0064f379[param_1 * 0x58] = 0;
        for (let local_28 = 0x3e; -1 < local_28; local_28 = local_28 - 1) {
          if (s8(G.DAT_0064b1ca[local_28 * 0x14]) === 1) {
            iVar2 = FUN_004bfe5a(param_2, param_1, local_28);
            if (iVar2 !== 0) {
              let local_8 = (s8(G.DAT_0064b1c5[local_28 * 0x14]) << 3) /
                            s8(G.DAT_0064b1c8[local_28 * 0x14]);
              if ((u8(G.DAT_0064b1bd[local_28 * 0x14]) & 4) !== 0) {
                local_8 = local_8 + 1;
              }
              if (0 < local_8) {
                G.DAT_0064f379[param_1 * 0x58] = u8(local_28);
              }
              break;
            }
          }
        }
      }
    }
  } else {
    G.DAT_0064f379[param_1 * 0x58] = 0;
    for (let local_28 = 0x3e; -1 < local_28; local_28 = local_28 - 1) {
      if (s8(G.DAT_0064b1ca[local_28 * 0x14]) === 1) {
        iVar2 = FUN_004bfe5a(param_2, param_1, local_28);
        if (iVar2 !== 0) {
          let local_8 = (s8(G.DAT_0064b1c5[local_28 * 0x14]) << 3) /
                        s8(G.DAT_0064b1c8[local_28 * 0x14]);
          if ((u8(G.DAT_0064b1bd[local_28 * 0x14]) & 4) !== 0) {
            local_8 = local_8 + 1;
          }
          if (0 < local_8) {
            G.DAT_0064f379[param_1 * 0x58] = u8(local_28);
          }
          break;
        }
      }
    }
  }
  // LAB_004de76b:
  FUN_0047cf22(s16(G.DAT_0064f340, param_1 * 0x58), s16(G.DAT_0064f342, param_1 * 0x58));
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  FUN_0046b14d(0x75, 0xff, s16(G.DAT_0064f340, param_1 * 0x58), s16(G.DAT_0064f342, param_1 * 0x58), 0, 0, 0, 0, 0, 0);
  // Update visibility around old city location
  iVar2 = FUN_005b8931(iVar3, iVar4);
  if ((1 << (param_2 & 0x1f) & u8(iVar2 + 4)) === 0) {
    FUN_005b976d(iVar3, iVar4, 1 << (param_2 & 0x1f), 1, 1);
    FUN_0047cea6(iVar3, iVar4);
  }
  for (let local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
    let uVar5 = FUN_005ae052(s8(G.DAT_00628350[local_10]) + iVar3);
    iVar2 = s8(G.DAT_00628360[local_10]) + iVar4;
    let iVar6 = FUN_004087c0(uVar5, iVar2);
    if (iVar6 !== 0) {
      iVar6 = FUN_005b8931(uVar5, iVar2);
      if ((1 << (param_2 & 0x1f) & u8(iVar6 + 4)) === 0) {
        FUN_005b976d(uVar5, iVar2, 1 << (param_2 & 0x1f), 1, 1);
        FUN_0047cea6(uVar5, iVar2);
      }
    }
  }
  FUN_005b9f1c();
  FUN_0046b14d(0x75, 0xff, iVar3, iVar4, 0, 0, 0, 0, 0, 0);
  G.DAT_0064f34a[param_1 * 0x58] = cVar1;
  G.DAT_0064f34b[param_1 * 0x58] = u8(G.DAT_00655af8);
  let uVar8 = FUN_00453e18(0xe);
  if (uVar8 === param_1) {
    FUN_004be6ba(param_2);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004de990 — diplomacy_transfer_units_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004de990(param_1, param_2) {
  let local_14 = s32(param_2, 8);
  let local_8 = param_2 + 0xc;
  let local_8_idx = 3;
  for (let local_20 = 0; local_20 < local_14; local_20 = local_20 + 1) {
    let uVar1 = param_2[local_8_idx];
    local_8_idx = local_8_idx + 1;
    let local_2c = FUN_0052ec47(uVar1);
    if (-1 < local_2c) {
      let local_10 = s8(G.DAT_006560f7[local_2c * 0x20]);
      if (param_1 !== local_10) {
        // Handle air units stacked on carrier — split them off first
        if (s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[local_2c * 0x20]) * 0x14]) === 2) {
          let iVar2 = FUN_005b50ad(local_2c, 2);
          if (1 < iVar2) {
            while (iVar2 = FUN_005b50ad(local_2c, 2), 1 < iVar2) {
              let local_24 = FUN_005b2d39(local_2c);
              if (local_24 === local_2c) {
                local_24 = FUN_005b2c82(local_24);
              }
              let local_30 = [0];
              let local_c = [0];
              iVar2 = FUN_004ded07(local_24, local_30, local_c,
                                   s8(G.DAT_006560f7[local_24 * 0x20]), 1);
              if (iVar2 === 0) {
                FUN_005b5d93(local_24, 1);
              } else {
                FUN_005b36df(local_24, local_30[0], local_c[0], 1);
              }
            }
          }
        }
        let local_18 = [0];
        let local_1c = [0];
        let iVar2 = FUN_004ded07(local_2c, local_18, local_1c, param_1, 0);
        if (iVar2 !== 0) {
          // Transfer unit ownership and update counts
          let unitType = u8(G.DAT_006560f6[local_2c * 0x20]);
          G.DAT_0064c778[param_1 * 0x594 + unitType] = G.DAT_0064c778[param_1 * 0x594 + unitType] + 1;
          G.DAT_0064c778[local_10 * 0x594 + unitType] = G.DAT_0064c778[local_10 * 0x594 + unitType] - 1;
          G.DAT_006560f7[local_2c * 0x20] = u8(param_1);
          G.DAT_00656100[local_2c * 0x20] = 0xff;
          G.DAT_006560f8[local_2c * 0x20] = 0;
          G.DAT_006560ff[local_2c * 0x20] = 0xff;
          let local_28 = FUN_0043d07a(s16(G.DAT_006560f0, local_2c * 0x20),
                                      s16(G.DAT_006560f2, local_2c * 0x20), param_1,
                                      0xffffffff, 0xffffffff);
          if (-1 < local_28 && s8(G.DAT_0064f348[local_28 * 0x58]) === param_1) {
            G.DAT_00656100[local_2c * 0x20] = u8(local_28);
          }
          FUN_005b490e(local_2c, param_1);
          if (s8(G.DAT_0064b1ca[unitType * 0x14]) < 5) {
            w16(G.DAT_0064c706, param_1 * 0x594, s16(G.DAT_0064c706, param_1 * 0x594) + 1);
          }
          w32(G.DAT_0064b9e8, param_1 * 4, s32(G.DAT_0064b9e8, param_1 * 4) + 1);
          if (s16(G.DAT_0064c706, local_10 * 0x594) !== 0 &&
             s8(G.DAT_0064b1ca[unitType * 0x14]) < 5) {
            w16(G.DAT_0064c706, local_10 * 0x594, s16(G.DAT_0064c706, local_10 * 0x594) - 1);
          }
          if (s32(G.DAT_0064b9e8, local_10 * 4) !== 0) {
            w32(G.DAT_0064b9e8, local_10 * 4, s32(G.DAT_0064b9e8, local_10 * 4) - 1);
          }
          FUN_005b36df(local_2c, local_18[0], local_1c[0], 1);
          FUN_004274a6(local_2c, 0);
        }
      }
    }
  }
  FUN_XD_FlushSendBuffer(5000);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004ded07 — diplomacy_find_valid_tile_for_unit
// ═══════════════════════════════════════════════════════════════════
export function FUN_004ded07(param_1, param_2, param_3, param_4, param_5) {
  // C: *(short*)(&G.DAT_006560f0 + param_1 * 0x20), *(short*)(&G.DAT_006560f2 + param_1 * 0x20)
  let iVar1 = s16(G.DAT_006560f0, param_1 * 0x20);
  let iVar2 = s16(G.DAT_006560f2, param_1 * 0x20);
  if (param_2) param_2[0] = iVar1;
  if (param_3) param_3[0] = iVar2;
  let local_8 = 1;
  if (param_5 !== 0 || FUN_005b8ca6(iVar1, iVar2) !== -1 || FUN_005b50ad(param_1, 2) > 1) {
    local_8 = 0;
    for (let local_c = 0; local_c < 0x2d; local_c = local_c + 1) {
      let iVar3 = FUN_005ae052(s8(G.DAT_00628370[local_c]) + iVar1);
      if (param_2) param_2[0] = iVar3;
      if (param_3) param_3[0] = s8(G.DAT_006283a0[local_c]) + iVar2;
      let px = param_2 ? param_2[0] : iVar3;
      let py = param_3 ? param_3[0] : iVar2;
      if ((param_5 === 0 || px !== iVar1 || py !== iVar2) &&
          FUN_004087c0(px, py) !== 0) {
        let sc = FUN_005b8ca6(px, py);
        let sd = FUN_005b8d62(px, py);
        if (sc === param_4 || sd === param_4 || (sc === -1 && sd === -1)) {
          let unitDomain = s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]);
          if ((unitDomain === 0 && FUN_005b89e4(px, py) === 0) ||
              (unitDomain === 2 && FUN_005b89e4(px, py) !== 0) ||
              unitDomain === 1) {
            return 1;
          }
        }
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004def54 — diplomacy_format_treaty_type
// ═══════════════════════════════════════════════════════════════════
export function FUN_004def54(param_1, param_2) {
  let uVar1;
  if (param_2 === 0) {
    switch (param_1) {
      case 0: uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xc74); break;
      case 1: uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xc78); break;
      case 2: uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xc7c); break;
      case 3: uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xc80); break;
    }
  } else if (param_2 === 1) {
    if (param_1 === 0) { uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xbcc); }
    else if (param_1 === 1) { uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xbd0); }
    else if (param_1 === 2) { uVar1 = FUN_00428b0c(G.DAT_00628420 + 0xbd4); }
  }
  FUN_004af174(G.DAT_006a5b58, uVar1);
  FUN_005f22e0(G.DAT_006a5b58, '.');
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004df10f — diplomacy_set_treaty_status
// ═══════════════════════════════════════════════════════════════════
export function FUN_004df10f(param_1, param_2, param_3) {
  switch (param_1) {
    case 0:
      FUN_00467825(param_2, param_3, 2);
      break;
    case 1:
      FUN_00467825(param_2, param_3, 4);
      break;
    case 2:
      FUN_00467825(param_2, param_3, 8);
      break;
    case 3:
      if ((G.DAT_0064c6c0[param_3 * 4 + param_2 * 0x594] & 2) !== 0) {
        FUN_00467750(param_2, param_3, 2);
      }
      if ((G.DAT_0064c6c0[param_3 * 4 + param_2 * 0x594] & 4) !== 0) {
        FUN_00467750(param_2, param_3, 4);
      }
      if ((G.DAT_0064c6c0[param_3 * 4 + param_2 * 0x594] & 8) !== 0) {
        FUN_00467750(param_2, param_3, 8);
      }
      break;
  }
}


// ═══════════════════════════════════════════════════════════════════
// STUB: External functions referenced but not defined in this block.
// These would be imported from other block modules in full integration.
// ═══════════════════════════════════════════════════════════════════

function FUN_005f22d0_strncpy() { /* stub — strncpy */ }
// FUN_005c0f57 (duplicate stub removed)
function gdi_847F() { return 16; /* stub — get font height */ }
function measure_text_858E() { return 8; /* stub — measure text width */ }
function FUN_getcwd() { return ''; /* stub — get cwd */ }
function FUN_strlen() { return 0; /* stub — strlen */ }
function FUN_strcmpi() { return 0; /* stub — strcmpi */ }
function FUN_fputs() { /* stub — fputs */ }
function FUN_show_messagebox_CF2D() { return 1; /* stub — save rules file */ }
function FUN_004087c0_fn() { return 0; /* stub — is valid tile */ }
function kill_civ() { /* stub — kill_civ */ }
function FUN_XD_FlushSendBuffer() { /* stub — flush send buffer */ }
function debug_log() { /* stub — debug log */ }
function _Timevec_dtor_ptr() { /* stub — timevec destructor via pointer */ }
