// ═══════════════════════════════════════════════════════════════════
// block_00550000.js — Mechanical transpilation of block_00550000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00550000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00550000.c
// ═══════════════════════════════════════════════════════════════════




// ============================================================
// Function: FUN_00550017 @ 0x00550017
// Size: 12 bytes
// thunk_destructor_wrapper
// ============================================================

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_004080c0, FUN_00408230, FUN_004082b0 } from './block_00400000.js';
import { FUN_004083b0, FUN_004083f0, FUN_00408460, FUN_00408490, FUN_004085f0, FUN_004086c0 } from './block_00400000.js';
import { FUN_0040894c, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc40, FUN_0040bc80 } from './block_00400000.js';
import { FUN_0040ddc6, FUN_0040ef70, FUN_0040efd0, FUN_0040fe10, FUN_0040fe40, FUN_0040fea0 } from './block_00400000.js';
import { FUN_0040fed0, FUN_0040ff00, FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_0041033a, FUN_00413476, FUN_00414bb0, FUN_00414d10 } from './block_00410000.js';
import { FUN_00414d40, FUN_00417ef0, FUN_004183d0, FUN_004190d0, FUN_00419100, FUN_00419130 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421d60, FUN_00421da0, FUN_00421e70, FUN_00421ea0, FUN_00421ed0 } from './block_00420000.js';
import { FUN_00426fb0, FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_00437c6f, FUN_0043c460, FUN_0043c520, FUN_0043c790, FUN_0043c8d0, FUN_0043c9d0 } from './block_00430000.js';
import { FUN_0043cef9, FUN_0043cf76, FUN_0043d07a, FUN_0043d20a, FUN_0043d289 } from './block_00430000.js';
import { FUN_00444270, FUN_004442e0, FUN_0044c5a0, FUN_0044cba0, FUN_0044f799 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_004503d0, FUN_00451900, FUN_00451930 } from './block_00450000.js';
import { FUN_004519b0, FUN_00451a60, FUN_00453aa0, FUN_00453e51, FUN_0045b0d6 } from './block_00450000.js';
import { FUN_00460129, FUN_00467580, FUN_00467750, FUN_00467825, FUN_00467af0, FUN_0046b14d } from './block_00460000.js';
import { FUN_0046e020, FUN_0046e6a9 } from './block_00460000.js';
import { FUN_00472b0a, FUN_004741be, FUN_0047ce1e, FUN_0047cea6, FUN_0047cf9e, FUN_0047df50 } from './block_00470000.js';
import { FUN_0047e94e } from './block_00470000.js';
import { FUN_004824e3, FUN_00484d3b, FUN_00484d52, FUN_00484fec, FUN_004897fa } from './block_00480000.js';
import { FUN_004904c0, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00493d13, FUN_00497d00 } from './block_00490000.js';
import { FUN_004a6980, FUN_004a7577, FUN_004ad0d1, FUN_004af14b } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b7645, FUN_004b768d, FUN_004b7eb6, FUN_004bb540, FUN_004bb800 } from './block_004B0000.js';
import { FUN_004bdb2c, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004c195e, FUN_004c21d5, FUN_004c2788, FUN_004c5408, FUN_004cff70 } from './block_004C0000.js';
import { FUN_004e1763, FUN_004e4ceb, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004f8d51, FUN_004fa569, FUN_004fbe84 } from './block_004F0000.js';
import { FUN_00511880, FUN_00518ec0, FUN_0051d63b, FUN_0051d75d, FUN_0051d7d6, FUN_0051d817 } from './block_00510000.js';
import { FUN_0051ea8e } from './block_00510000.js';
import { FUN_00538a29 } from './block_00530000.js';
import { FUN_00564713, FUN_0056a65e, FUN_0056ac67 } from './block_00560000.js';
import { FUN_0059d5f5, FUN_0059db08, FUN_0059db65, FUN_0059df8a, FUN_0059ea99, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005a9780, FUN_005a99fc, FUN_005a9afe, FUN_005a9b5d, FUN_005adfa0, FUN_005ae0b0 } from './block_005A0000.js';
import { FUN_005ae3bf } from './block_005A0000.js';
import { FUN_005b29aa, FUN_005b2c3d, FUN_005b2c82, FUN_005b2e69, FUN_005b345f, FUN_005b3d06 } from './block_005B0000.js';
import { FUN_005b47fa, FUN_005b49cf, FUN_005b4c63, FUN_005b50ad, FUN_005b6458, FUN_005b6787 } from './block_005B0000.js';
import { FUN_005b6aea, FUN_005b898b, FUN_005b8a81, FUN_005b8b1a, FUN_005b8b65, FUN_005b8c42 } from './block_005B0000.js';
import { FUN_005b8d62, FUN_005baeb0, FUN_005baec8, FUN_005baee0, FUN_005bb4ae, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005bcaa7, FUN_005bd630, FUN_005bd65c, FUN_005bd915, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0034, FUN_005c0073, FUN_005c0f57, FUN_005c19ad, FUN_005c62ee, FUN_005c64da } from './block_005C0000.js';
import { FUN_005c656b, FUN_005cd775, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d1f50, FUN_005d2004 } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';

export function FUN_00550017() {
  FUN_004183d0();
  return;
}



// ============================================================
// Function: FUN_0055002d @ 0x0055002D
// Size: 14 bytes
// seh_epilog_restore_fs
// ============================================================

export function FUN_0055002d() {
  // SEH epilog — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00551cd0 @ 0x00551CD0
// Size: 57 bytes
// scalar_deleting_destructor
// ============================================================

export function FUN_00551cd0(param_1) {
  FUN_004fa569();
  // operator_delete — no-op in JS
  return;
}



// ============================================================
// Function: egptr @ 0x00551D20
// Size: 28 bytes
// streambuf_egptr (library)
// ============================================================

export function egptr(thisObj) {
  // Library function — no-op
  return 0;
}



// ============================================================
// Function: FUN_00551d50 @ 0x00551D50
// Size: 37 bytes
// send_msg_3DBF_wrapper
// ============================================================

export function FUN_00551d50() {
  // in_ECX + 0x1c → send_msg_3DBF — network/UI, no-op
  return;
}



// ============================================================
// Function: FUN_00551d80 @ 0x00551D80
// Size: 43 bytes
// send_msg_3E92_wrapper
// ============================================================

export function FUN_00551d80(param_1) {
  // network/UI message send — no-op
  return;
}



// ============================================================
// Function: FUN_00551dc0 @ 0x00551DC0
// Size: 33 bytes
// set_ecx_offset_0x30
// ============================================================

export function FUN_00551dc0(param_1) {
  // in_ECX + 0x30 = param_1 — UI object setter, no-op
  return;
}



// ============================================================
// Function: FUN_00551df0 @ 0x00551DF0
// Size: 33 bytes
// set_ecx_offset_0x34
// ============================================================

export function FUN_00551df0(param_1) {
  // in_ECX + 0x34 = param_1 — UI object setter, no-op
  return;
}



// ============================================================
// Function: FUN_00551e20 @ 0x00551E20
// Size: 41 bytes
// call_419130_with_6359d4
// ============================================================

export function FUN_00551e20(param_1, param_2, param_3) {
  FUN_00419130(G.DAT_006359d4, param_1, param_2, param_3);
  return;
}



// ============================================================
// Function: FUN_00551e60 @ 0x00551E60
// Size: 41 bytes
// call_419130_with_DEBUG
// ============================================================

export function FUN_00551e60(param_1, param_2, param_3) {
  FUN_00419130(G.DAT_006359dc, param_1, param_2, param_3);
  return;
}



// ============================================================
// Function: FID_conflict___E51_00551EA0 @ 0x00551EA0
// Size: 26 bytes
// static_init_block_1
// ============================================================

export function FID_conflict___E51_00551EA0() {
  FUN_00551eba();
  FUN_00551ed8();
  return;
}



// ============================================================
// Function: FUN_00551eba @ 0x00551EBA
// Size: 30 bytes
// static_init_alloc_16
// ============================================================

export function FUN_00551eba() {
  FUN_0043c460(0, 0x10);
  return;
}



// ============================================================
// Function: FUN_00551ed8 @ 0x00551ED8
// Size: 29 bytes
// register_atexit_551ef5
// ============================================================

export function FUN_00551ed8() {
  // _atexit(FUN_00551ef5) — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00551ef5 @ 0x00551EF5
// Size: 26 bytes
// atexit_cleanup_1
// ============================================================

export function FUN_00551ef5() {
  FUN_0043c520();
  return;
}



// ============================================================
// Function: FID_conflict___E51_00551F0F @ 0x00551F0F
// Size: 26 bytes
// static_init_block_2
// ============================================================

export function FID_conflict___E51_00551F0F() {
  FUN_00551f29();
  FUN_00551f47();
  return;
}



// ============================================================
// Function: FUN_00551f29 @ 0x00551F29
// Size: 30 bytes
// static_init_alloc_10
// ============================================================

export function FUN_00551f29() {
  FUN_0043c460(0, 10);
  return;
}



// ============================================================
// Function: FUN_00551f47 @ 0x00551F47
// Size: 29 bytes
// register_atexit_551f64
// ============================================================

export function FUN_00551f47() {
  // _atexit — no-op
  return;
}



// ============================================================
// Function: FUN_00551f64 @ 0x00551F64
// Size: 26 bytes
// atexit_cleanup_2
// ============================================================

export function FUN_00551f64() {
  FUN_0043c520();
  return;
}



// ============================================================
// Function: FID_conflict___E51_00551F7E @ 0x00551F7E
// Size: 26 bytes
// static_init_block_3
// ============================================================

export function FID_conflict___E51_00551F7E() {
  FUN_00551f98();
  FUN_00551fb6();
  return;
}



// ============================================================
// Function: FUN_00551f98 @ 0x00551F98
// Size: 30 bytes
// static_init_alloc_16b
// ============================================================

export function FUN_00551f98() {
  FUN_0043c460(0, 0x10);
  return;
}



// ============================================================
// Function: FUN_00551fb6 @ 0x00551FB6
// Size: 29 bytes
// register_atexit_551fd3
// ============================================================

export function FUN_00551fb6() {
  // _atexit — no-op
  return;
}



// ============================================================
// Function: FUN_00551fd3 @ 0x00551FD3
// Size: 26 bytes
// atexit_cleanup_3
// ============================================================

export function FUN_00551fd3() {
  FUN_0043c520();
  return;
}



// ============================================================
// Function: FUN_00551fed @ 0x00551FED
// Size: 269 bytes
// init_dialog_metrics
// ============================================================

export function FUN_00551fed() {
  let iVar1;

  FUN_005bcaa7(G.DAT_006ab180);
  G.DAT_006ab198 = FUN_00407f90(G.DAT_006ab180);
  G.DAT_006ab19c = FUN_00407fc0(G.DAT_006ab180);
  G.DAT_00633580 = 0x10;
  if (999 < G.DAT_006ab198) {
    G.DAT_00633580 = 0x18;
  }
  G.DAT_00633584 = (999 < G.DAT_006ab198) ? 1 : 0;
  FUN_00417ef0(0, G.DAT_00633580);
  FUN_00417ef0(0, (G.DAT_00633580 * 2) / 3);
  FUN_00417ef0(0, G.DAT_00633580);
  iVar1 = FUN_0040ef70();
  G.DAT_00633598 = iVar1 + G.DAT_0063358c * 2 + G.DAT_00633588 * 2;
  G.DAT_0063359c = G.DAT_00633588 * 2 + G.DAT_0063358c * 2;
  iVar1 = GetSystemMetrics(7);
  G.DAT_006335a0 = iVar1 * 2;
  iVar1 = GetSystemMetrics(8);
  G.DAT_006335a4 = iVar1 * 2;
  return;
}



// ============================================================
// Function: FUN_005520fa @ 0x005520FA
// Size: 24 bytes
// set_dialog_font
// ============================================================

export function FUN_005520fa(param_1) {
  G.DAT_0063357c = param_1;
  return;
}



// ============================================================
// Function: FUN_00552112 @ 0x00552112
// Size: 3401 bytes
// draw_dialog_frame_and_title
// ============================================================

export function FUN_00552112() {
  let uVar1;
  let iVar2;
  let iVar3;
  let sVar4;
  let in_ECX = 0; // this pointer placeholder
  let local_168;
  let local_164;
  let local_160 = new Uint8Array(16);
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
  let local_13c;
  let local_138;
  let local_134;
  let local_130;
  let local_12c;
  let local_128;
  let local_124;
  let local_120;
  let local_11c;
  let local_118;
  let local_114 = "";
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_005c0034();
  local_120 = G.DAT_00633590;
  local_140 = G.DAT_00633594;
  local_144 = G.DAT_00633588;

  // DEVIATION: UI drawing — dialog window frames (borders, title text, timer)
  // All calls in this function are Win32 GDI/MFC rendering primitives
  return;
}



// ============================================================
// Function: FUN_00552e5b @ 0x00552E5B
// Size: 119 bytes
// dialog_button_callback
// ============================================================

export function FUN_00552e5b(param_1) {
  let local_8;

  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  } else {
    local_8 = local_8 + -0x48;
  }
  // Callback dispatch — UI, no-op
  return;
}



// ============================================================
// Function: FUN_00552ed2 @ 0x00552ED2
// Size: 675 bytes
// dialog_create_buttons
// ============================================================

export function FUN_00552ed2() {
  // MFC CRichEditCntrItem dialog setup — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055318c @ 0x0055318C
// Size: 192 bytes
// dialog_add_button
// ============================================================

export function FUN_0055318c(param_1, param_2) {
  // Dialog button creation — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055324c @ 0x0055324C
// Size: 139 bytes
// dialog_set_title
// ============================================================

export function FUN_0055324c(param_1) {
  // Set dialog title text — UI, no-op
  return;
}



// ============================================================
// Function: FUN_005532d7 @ 0x005532D7
// Size: 162 bytes
// dialog_destroy_buttons
// ============================================================

export function FUN_005532d7() {
  // Destroy 6 dialog buttons — UI, no-op
  return;
}



// ============================================================
// Function: FUN_00553379 @ 0x00553379
// Size: 38 bytes
// dialog_cleanup
// ============================================================

export function FUN_00553379() {
  FUN_005532d7();
  FUN_004083b0();
  return;
}



// ============================================================
// Function: FUN_0055339f @ 0x0055339F
// Size: 146 bytes
// COleCntrFrameWnd_constructor
// ============================================================

export function FUN_0055339f() {
  // MFC COleCntrFrameWnd constructor — UI, no-op
  return;
}



// ============================================================
// Function: COleCntrFrameWnd_destructor @ 0x00553444
// Size: 87 bytes
// ~COleCntrFrameWnd
// ============================================================

export function COleCntrFrameWnd_destructor() {
  // MFC destructor — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055349b @ 0x0055349B
// Size: 9 bytes
// thunk_destructor_sub
// ============================================================

export function FUN_0055349b() {
  FUN_0044cba0();
  return;
}



// ============================================================
// Function: FUN_005534ae @ 0x005534AE
// Size: 14 bytes
// seh_epilog_2
// ============================================================

export function FUN_005534ae() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_005534bc @ 0x005534BC
// Size: 588 bytes
// create_dialog_window
// ============================================================

export function FUN_005534bc(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // Creates and positions a dialog window with MFC — UI, no-op
  return;
}



// ============================================================
// Function: FUN_00553d30 @ 0x00553D30
// Size: 45 bytes
// set_dialog_proc_at_0x60
// ============================================================

export function FUN_00553d30(param_1) {
  // Swaps function pointer at in_ECX + 0x60 — UI callback, no-op
  return 0;
}



// ============================================================
// Function: FUN_00553d70 @ 0x00553D70
// Size: 45 bytes
// set_dialog_proc_at_0x64
// ============================================================

export function FUN_00553d70(param_1) {
  // Swaps function pointer at in_ECX + 100 — UI callback, no-op
  return 0;
}



// ============================================================
// Function: FUN_00553db0 @ 0x00553DB0
// Size: 77 bytes
// validate_folder_name
// ============================================================

export function FUN_00553db0(param_1) {
  // Converts string to uppercase and checks for invalid characters
  // Returns first invalid char code, 0 if all valid
  // Uses G.DAT_006335f8 as valid character lookup table
  let str = param_1.toUpperCase();
  let i = 0;
  while (i < str.length && G.DAT_006335f8[str.charCodeAt(i)] !== 0) {
    i++;
  }
  return i < str.length ? str.charCodeAt(i) : 0;
}



// ============================================================
// Function: FUN_00553dfd @ 0x00553DFD
// Size: 505 bytes
// cheat_create_scenario_folder
// ============================================================

export function FUN_00553dfd() {
  // Creates a new scenario folder via dialog — UI/filesystem, no-op
  return 1;
}



// ============================================================
// Function: FUN_00553ff6 @ 0x00553FF6
// Size: 335 bytes
// cheat_toggle_scenario_mode
// ============================================================

export function FUN_00553ff6() {
  let iVar1;

  if (((G.DAT_00655aea & 0x8000) === 0) && ((G.DAT_00655af0 & 0x10) === 0)) {
    iVar1 = FUN_00410030("REALLYCHEAT", 0, 0);
    if (iVar1 === 0) {
      return;
    }
    G.DAT_00655af0 = G.DAT_00655af0 | 0x10;
    G.DAT_00655aea = G.DAT_00655aea | 0x8000;
    iVar1 = FUN_00553dfd();
    if (iVar1 !== 0) {
      FUN_004190d0("", "WARNING");
      G.DAT_00655af0 = G.DAT_00655af0 | 0x80;
    }
  } else if (((G.DAT_00655aea & 0x8000) === 0) ||
            (((G.DAT_00655af0 & 0x80) === 0 || (iVar1 = strcmp(G.DAT_0064bb08, G.DAT_00655020), iVar1 === 0)
             ))) {
    iVar1 = strcmp(G.DAT_0064bb08, G.DAT_00655020);
    if (iVar1 === 0) {
      FUN_004190d0("", "WARNING");
    }
    iVar1 = FUN_00553dfd();
    if (iVar1 === 0) {
      return;
    }
    G.DAT_00655aea = G.DAT_00655aea | 0x8000;
    G.DAT_00655af0 = G.DAT_00655af0 | 0x80;
  } else {
    G.DAT_00655af0 = G.DAT_00655af0 & 0xff7f;
  }
  FUN_004e4ceb();
  return;
}



// ============================================================
// Function: FUN_00554145 @ 0x00554145
// Size: 301 bytes
// cheat_pick_civ_dialog
// ============================================================

export function FUN_00554145(param_1) {
  // Dialog to pick a civ from list of active civs — UI
  // Returns selected civ index or -1
  return -1;
}



// ============================================================
// Function: FUN_00554272 @ 0x00554272
// Size: 12 bytes
// dialog_destroy_wrapper_1
// ============================================================

export function FUN_00554272() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00554288 @ 0x00554288
// Size: 15 bytes
// seh_epilog_3
// ============================================================

export function FUN_00554288() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00554297 @ 0x00554297
// Size: 396 bytes
// cheat_toggle_cheat_mode
// ============================================================

export function FUN_00554297() {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_c;
  let local_8;

  local_8 = 0;
  for (local_c = 0; local_c < 8; local_c = local_c + 1) {
    if (G.DAT_00673d38[local_c * 4] !== 0) {
      local_8 = local_8 + 1;
    }
  }
  if (local_8 === 0) {
    if (((G.DAT_00655aea & 0x8000) === 0) && ((G.DAT_00655af0 & 0x10) === 0)) {
      iVar3 = FUN_00410030("REALLYCHEAT", 0, 0);
      if (iVar3 === 0) {
        return;
      }
      uVar2 = G.DAT_00655af0 | 0x10;
      uVar1 = G.DAT_00655af0 & 0x80;
      G.DAT_00655af0 = uVar2;
      if (uVar1 !== 0) {
        FUN_004190d0("", "WARNING");
      }
    }
    G.DAT_00655aea = G.DAT_00655aea ^ 0x8000;
    if ((G.DAT_00655b02 === 0) || ((G.DAT_00655aea & 0x8000) === 0)) {
      if (G.DAT_00655b02 !== 0) {
        FUN_0055ae80(1);
        G.DAT_00654b70 = G.DAT_00654c7e;
        FUN_0055b046(1);
      }
    } else {
      FUN_0055ae80(1);
      G.DAT_00654c7e = G.DAT_00654b70;
      G.DAT_00654b70 = 0;
    }
    FUN_004e4ceb();
  } else {
    FUN_00421da0(0, local_8);
    if (local_8 === 1) {
      FUN_00410030("PASSWORDNOCHEAT1", 0, 0);
    } else {
      FUN_00410030("PASSWORDNOCHEAT2", 0, 0);
    }
  }
  return;
}



// ============================================================
// Function: FUN_00554423 @ 0x00554423
// Size: 61 bytes
// cheat_change_money
// ============================================================

export function FUN_00554423() {
  let iVar1;

  iVar1 = FUN_00554145(0);
  if (-1 < iVar1) {
    FUN_004c21d5(iVar1, 0);
  }
  return;
}



// ============================================================
// Function: FUN_00554460 @ 0x00554460
// Size: 371 bytes
// cheat_toggle_all_tech
// ============================================================

export function FUN_00554460(param_1) {
  let local_c;

  if (G.DAT_0064c6b1[param_1 * 0x594] === 0) {
    for (local_c = 0; local_c < 100; local_c = local_c + 1) {
      FUN_004bf05b(param_1, local_c, 0, 0, 0);
    }
    G.DAT_0064c6b1[param_1 * 0x594] = 1;
    FUN_00444270("GAVETECH");
  } else {
    for (local_c = 0; local_c < 0xd; local_c = local_c + 1) {
      G.DAT_0064c6f8[param_1 * 0x594 + local_c] = 0;
    }
    for (local_c = 0; local_c < 100; local_c = local_c + 1) {
      G.DAT_00655b82[local_c] = G.DAT_00655b82[local_c] & ~(1 << (u8(param_1) & 0x1f));
    }
    G.DAT_0064c6b1[param_1 * 0x594] = 0;
    G.DAT_0064c6b0[param_1 * 0x594] = 1;
    FUN_00444270("TOOKTECH");
  }
  FUN_citywin_9429();
  return;
}



// ============================================================
// Function: FUN_005545d3 @ 0x005545D3
// Size: 870 bytes
// cheat_edit_tech_dialog
// ============================================================

export function FUN_005545d3() {
  // DEVIATION: MFC dialog for editing individual techs per civ
  // Requires CSocket::Create, FUN_0059db08, and Win32 dialog infrastructure
  // Game-logic callbacks: FUN_004bf05b, FUN_005ae3bf, FUN_004bd9f0, FUN_00554460
  let iVar1;
  let iVar2;
  let iVar3;
  let local_318;
  let local_314;
  let local_310;
  let local_14;

  local_14 = -1;
  G.DAT_0062804c = 0;
  iVar1 = FUN_00554145(0);
  if (-1 < iVar1) {
    // DEVIATION: dialog loop requires Win32 UI — game logic preserved in called functions
    return;
  }
  return;
}



// ============================================================
// Function: FUN_0055493e @ 0x0055493E
// Size: 12 bytes
// dialog_destroy_wrapper_2
// ============================================================

export function FUN_0055493e() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00554954 @ 0x00554954
// Size: 14 bytes
// seh_epilog_4
// ============================================================

export function FUN_00554954() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00554962 @ 0x00554962
// Size: 61 bytes
// cheat_change_govt
// ============================================================

export function FUN_00554962() {
  let iVar1;

  iVar1 = FUN_00554145(0);
  if (-1 < iVar1) {
    FUN_0055c3d3(iVar1, 1);
  }
  return;
}



// ============================================================
// Function: FUN_0055499f @ 0x0055499F
// Size: 2032 bytes
// cheat_edit_terrain_dialog
// ============================================================

export function FUN_0055499f() {
  // Complex terrain editing dialog with checkboxes for tile properties
  // UI-only, no-op in JS
  return;
}



// ============================================================
// Function: FUN_0055518f @ 0x0055518F
// Size: 12 bytes
// dialog_destroy_wrapper_3
// ============================================================

export function FUN_0055518f() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_005551a5 @ 0x005551A5
// Size: 14 bytes
// seh_epilog_5
// ============================================================

export function FUN_005551a5() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_005551b3 @ 0x005551B3
// Size: 1059 bytes
// cheat_create_unit_dialog
// ============================================================

export function FUN_005551b3() {
  // Dialog to create a unit from list and place on map — UI
  // DEVIATION: MFC dialog for creating units — requires Win32 UI infrastructure
  // Game-logic callbacks: FUN_005b3d06, FUN_0047cea6
  return;
}



// ============================================================
// Function: FUN_005555eb @ 0x005555EB
// Size: 12 bytes
// dialog_destroy_wrapper_4
// ============================================================

export function FUN_005555eb() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00555601 @ 0x00555601
// Size: 14 bytes
// seh_epilog_6
// ============================================================

export function FUN_00555601() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_0055560f @ 0x0055560F
// Size: 524 bytes
// cheat_change_active_civ
// ============================================================

export function FUN_0055560f() {
  let uVar1;
  let iVar2;
  let local_30c;
  let local_308;

  // Dialog to select active civ (including observer/spectator modes)
  // Writes G.DAT_00655b07, G.DAT_00655b06, G.DAT_006d1da0, G.DAT_00655b0b
  // UI-driven, no-op
  return;
}



// ============================================================
// Function: FUN_0055581b @ 0x0055581B
// Size: 12 bytes
// dialog_destroy_wrapper_5
// ============================================================

export function FUN_0055581b() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00555831 @ 0x00555831
// Size: 14 bytes
// seh_epilog_7
// ============================================================

export function FUN_00555831() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_0055583f @ 0x0055583F
// Size: 415 bytes
// cheat_select_human_civ
// ============================================================

export function FUN_0055583f() {
  let uVar1;
  let iVar2;
  let local_30c;
  let local_308;

  // Dialog to pick which civ is human-controlled
  // Writes G.DAT_00655b0b, G.DAT_00655b03, G.DAT_00655b05, G.DAT_006d1da0
  // UI-driven, no-op
  return;
}



// ============================================================
// Function: FUN_005559de @ 0x005559DE
// Size: 12 bytes
// dialog_destroy_wrapper_6
// ============================================================

export function FUN_005559de() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_005559f4 @ 0x005559F4
// Size: 14 bytes
// seh_epilog_8
// ============================================================

export function FUN_005559f4() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00555a02 @ 0x00555A02
// Size: 137 bytes
// cheat_set_game_year
// ============================================================

export function FUN_00555a02() {
  let iVar1;
  let local_8 = [0, 0];

  FUN_00421da0(0, G.DAT_00655af8);
  iVar1 = FUN_0051d75d(G.DAT_006359dc, "GAMEYEAR", G.DAT_00655af8, local_8);
  if (iVar1 === 0) {
    G.DAT_00655af8 = local_8[0];
    G.DAT_00655afa = FUN_00484fec(local_8[0]);
    FUN_0056a65e(1);
    FUN_citywin_9429();
  }
  return;
}



// ============================================================
// Function: FUN_00555a8b @ 0x00555A8B
// Size: 514 bytes
// cheat_destroy_civ
// ============================================================

export function FUN_00555a8b() {
  let uVar1;
  let iVar2;
  let local_310;
  let local_308;

  // Dialog to select and destroy a civ — kills all cities and units
  // Calls delete_city and kill_civ
  // UI-driven, no-op
  return;
}



// ============================================================
// Function: FUN_00555c8d @ 0x00555C8D
// Size: 12 bytes
// dialog_destroy_wrapper_7
// ============================================================

export function FUN_00555c8d() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00555ca3 @ 0x00555CA3
// Size: 14 bytes
// seh_epilog_9
// ============================================================

export function FUN_00555ca3() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00555cb1 @ 0x00555CB1
// Size: 60 bytes
// cheat_view_unit_at_cursor
// ============================================================

export function FUN_00555cb1() {
  let uVar1;

  uVar1 = FUN_005b2e69(G.DAT_0064b1b4, G.DAT_0064b1b0);
  FUN_005b47fa(uVar1, 1);
  return;
}



// ============================================================
// Function: FUN_00555ced @ 0x00555CED
// Size: 131 bytes
// get_unit_icon_index
// ============================================================

export function FUN_00555ced(param_1) {
  let local_8;

  local_8 = 0x29;
  if (param_1 === 5) {
    local_8 = 0x2a;
  }
  if (param_1 === 0x15) {
    local_8 = 0x1d;
  }
  if (param_1 === 0) {
    local_8 = 0x6a;
  }
  if (param_1 === 1) {
    local_8 = 0x7a;
  }
  if (param_1 === 4) {
    local_8 = 0x55;
  }
  if (param_1 === 2) {
    local_8 = 0x5e;
  }
  return local_8;
}



// ============================================================
// Function: FUN_00555d70 @ 0x00555D70
// Size: 857 bytes
// cheat_show_foreign_affairs_map
// ============================================================

export function FUN_00555d70() {
  // Draws foreign affairs map overlay showing trade routes and unit positions
  // UI/rendering — no-op
  return;
}



// ============================================================
// Function: FUN_005560c9 @ 0x005560C9
// Size: 147 bytes
// cheat_reveal_map_rect
// ============================================================

export function FUN_005560c9() {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_10;
  let local_c;

  for (local_c = 0; local_c < G.DAT_0066caa0; local_c = local_c + 2) {
    for (local_10 = 0; local_10 < G.DAT_0066caa4; local_10 = local_10 + 1) {
      iVar1 = G.DAT_0066ca90 + local_c;
      iVar2 = G.DAT_0066ca94 + local_10;
      uVar3 = FUN_005b8c42(iVar1, iVar2, 0x6a);
      FUN_00472b0a(iVar1, iVar2, uVar3);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055615c @ 0x0055615C
// Size: 255 bytes
// cheat_set_civ_money
// ============================================================

export function FUN_0055615c() {
  let iVar1;
  let uVar2;
  let iVar3;
  let local_8;

  iVar1 = FUN_00554145(0);
  if (-1 < iVar1) {
    uVar2 = FUN_00410070(iVar1);
    FUN_0040ff60(0, uVar2);
    FUN_00467580(0, G.DAT_0064c6a2[iVar1 * 0x594]);
    iVar3 = FUN_0051d75d(G.DAT_006359dc, "MONEY", G.DAT_0064c6a2[iVar1 * 0x594], { value: 0 });
    if (iVar3 === 0) {
      local_8 = iVar3; // placeholder
      if (30000 < local_8) {
        local_8 = 30000;
      }
      if (local_8 < 0) {
        local_8 = 0;
      }
      G.DAT_0064c6a2[iVar1 * 0x594] = local_8;
      FUN_citywin_9429();
      FUN_0056a65e(1);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055625b @ 0x0055625B
// Size: 1892 bytes
// cheat_edit_unit_dialog
// ============================================================

export function FUN_0055625b() {
  // Complex unit editing dialog — toggle veteran, set HP, change home city,
  // set cargo type, etc. All UI-driven, no-op
  return;
}



// ============================================================
// Function: FUN_005569bf @ 0x005569BF
// Size: 12 bytes
// dialog_destroy_wrapper_8
// ============================================================

export function FUN_005569bf() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_005569d5 @ 0x005569D5
// Size: 14 bytes
// seh_epilog_10
// ============================================================

export function FUN_005569d5() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: set_city_shields @ 0x005569E3
// Size: 1357 bytes
// cheat_edit_city_dialog
// ============================================================

export function set_city_shields() {
  // Complex city editing dialog — set size, shields, buildings, copy city,
  // toggle capital, etc. All UI-driven, no-op
  return;
}



// ============================================================
// Function: FUN_00556f30 @ 0x00556F30
// Size: 12 bytes
// dialog_destroy_wrapper_9
// ============================================================

export function FUN_00556f30() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00556f46 @ 0x00556F46
// Size: 14 bytes
// seh_epilog_11
// ============================================================

export function FUN_00556f46() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00556f54 @ 0x00556F54
// Size: 3764 bytes
// cheat_edit_king_dialog
// ============================================================

export function FUN_00556f54() {
  // Large dialog for editing civ properties — treaties, attitudes,
  // research progress, leader names, tech copying, etc.
  // All UI-driven, no-op
  return;
}



// ============================================================
// Function: FUN_00557e08 @ 0x00557E08
// Size: 12 bytes
// dialog_destroy_wrapper_10
// ============================================================

export function FUN_00557e08() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00557e1e @ 0x00557E1E
// Size: 14 bytes
// seh_epilog_12
// ============================================================

export function FUN_00557e1e() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00557e2c @ 0x00557E2C
// Size: 843 bytes
// cheat_edit_victory_dialog
// ============================================================

export function FUN_00557e2c() {
  // Victory conditions editing dialog — change victory civ,
  // toggle conquest/space flags, edit objectives
  // UI-driven, no-op
  return;
}



// ============================================================
// Function: FUN_00558177 @ 0x00558177
// Size: 12 bytes
// dialog_destroy_wrapper_11
// ============================================================

export function FUN_00558177() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_0055818d @ 0x0055818D
// Size: 14 bytes
// seh_epilog_13
// ============================================================

export function FUN_0055818d() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_0055819b @ 0x0055819B
// Size: 274 bytes
// cheat_edit_rules_dialog
// ============================================================

export function FUN_0055819b() {
  let iVar1;

  while (true) {
    while (true) {
      while (true) {
        while (true) {
          FUN_00421da0(0, ((G.DAT_0064bc60) & 0x10) >>> 4);
          FUN_00421da0(1, ((G.DAT_0064bc60) & 0x20) >>> 5);
          FUN_00421da0(2, ((G.DAT_0064bc60) & 0x40) >>> 6);
          FUN_00421da0(3, ((G.DAT_0064bc60) & 0x8000) >>> 0xf);
          iVar1 = FUN_00421ea0("EDITRULES");
          if (iVar1 === 0) {
            return;
          }
          if (iVar1 !== 1) break;
          G.DAT_0064bc60 = G.DAT_0064bc60 ^ 0x10;
        }
        if (iVar1 !== 2) break;
        G.DAT_0064bc60 = G.DAT_0064bc60 ^ 0x20;
      }
      if (iVar1 !== 3) break;
      G.DAT_0064bc60 = G.DAT_0064bc60 ^ 0x40;
    }
    if (iVar1 !== 4) break;
    G.DAT_0064bc60 = G.DAT_0064bc60 ^ 0x8000;
  }
  return;
}



// ============================================================
// Function: FUN_005582ad @ 0x005582AD
// Size: 1648 bytes
// cheat_edit_scenario_dialog
// ============================================================

export function FUN_005582ad() {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_140;
  let local_13c;
  let local_138 = new Uint8Array(260);
  let local_34;
  let aiStack_30 = new Array(8).fill(0);
  let local_10;
  let local_c = [0, 0, 0, 0];
  let local_8;

  while (true) {
    G.DAT_00655afa = FUN_00484fec(G.DAT_00655af8);
    FUN_0056a65e(1);
    FUN_citywin_9429();
    FUN_00421da0(0, G.DAT_0064bcb2);
    FUN_00421da0(1, G.DAT_0064bcb4);
    FUN_00421da0(2, G.DAT_0064bcb6);
    FUN_00421da0(3, G.DAT_0064bcb8);
    FUN_00421da0(4, G.DAT_0064bc60 & 1);
    if ((G.DAT_00655af0 & 0x80) === 0) {
      uVar1 = FUN_00428b0c(G.DAT_00628420[0x68c]);
      FUN_0040ff60(0, uVar1);
    } else {
      uVar1 = FUN_00428b0c(G.DAT_00628420[0x688]);
      FUN_0040ff60(0, uVar1);
    }
    FUN_0040ff60(1, G.DAT_0064bc62);
    iVar2 = FUN_00421ea0("EDITSCEN");
    if (iVar2 === 0) break;
    if (iVar2 === 1) {
      iVar2 = FUN_00518ec0("EDITPARADIGM", G.DAT_0064bcb2, local_c);
      if (iVar2 === 0) {
        G.DAT_0064bcb2 = local_c[0];
      }
    } else if (iVar2 === 2) {
      iVar2 = FUN_00518ec0("EDITINCREMENT", G.DAT_0064bcb4, local_c);
      if (iVar2 === 0) {
        G.DAT_0064bcb4 = local_c[0];
      }
    } else if (iVar2 === 3) {
      iVar2 = FUN_00518ec0("EDITSTARTYEAR", G.DAT_0064bcb6, local_c);
      if (iVar2 === 0) {
        G.DAT_0064bcb6 = local_c[0];
      }
    } else if (iVar2 === 4) {
      iVar2 = FUN_00518ec0("EDITMAXTURNS", G.DAT_0064bcb8, local_c);
      if (iVar2 === 0) {
        G.DAT_0064bcb8 = local_c[0];
      }
    } else if (iVar2 === 5) {
      local_10 = G.DAT_00636598;
      for (local_8 = 0; local_8 < G.DAT_006d1164; local_8 = local_8 + 1) {
        // Clear fog top nibble for revealed tiles
        if ((u8(local_10[5]) & 0xf0) === 0xf0) {
          local_10[5] = u8(local_10[5]) & 0xf;
        }
        local_10 = local_10 + 6;
      }
      FUN_0047cf9e(G.DAT_006d1da0, 1);
    } else if (iVar2 === 6) {
      local_10 = G.DAT_00636598;
      for (local_8 = 0; local_8 < G.DAT_006d1164; local_8 = local_8 + 1) {
        if (((u8(local_10[5]) & 0xf0) !== 0xf0) && ((u8(local_10[1]) & 3) === 0)) {
          local_10[5] = u8(local_10[5]) | 0xf0;
        }
        local_10 = local_10 + 6;
      }
      FUN_0047cf9e(G.DAT_006d1da0, 1);
    } else if (iVar2 === 7) {
      // Reveal all tiles to all civs
      local_34 = FUN_005b8931(0, 0);
      for (local_140 = 1; local_140 < 8; local_140 = local_140 + 1) {
        iVar2 = FUN_005b898b(0, 0, local_140);
        aiStack_30[local_140] = iVar2;
      }
      for (local_8 = 0; local_8 < G.DAT_006d1164; local_8 = local_8 + 1) {
        local_34[4] = 0xff;
        for (local_140 = 1; local_140 < 8; local_140 = local_140 + 1) {
          aiStack_30[local_140] = local_34[1];
          aiStack_30[local_140] = aiStack_30[local_140] + 1;
        }
        local_34 = local_34 + 6;
      }
      for (local_13c = 0; local_13c < G.DAT_00655b18; local_13c = local_13c + 1) {
        if (G.DAT_0064f394[local_13c * 0x58] !== 0) {
          G.DAT_0064f34c[local_13c * 0x58] = 0xff;
          for (local_140 = 0; local_140 < 8; local_140 = local_140 + 1) {
            G.DAT_0064f34d[local_13c * 0x58 + local_140] = G.DAT_0064f349[local_13c * 0x58];
          }
          iVar2 = FUN_005b8931(
            (G.DAT_0064f340[local_13c * 0x58] | (G.DAT_0064f340[local_13c * 0x58 + 1] << 8)) << 16 >> 16,
            (G.DAT_0064f342[local_13c * 0x58] | (G.DAT_0064f342[local_13c * 0x58 + 1] << 8)) << 16 >> 16
          );
          iVar2[4] = 0xff;
        }
      }
      G.DAT_0064bc60 = G.DAT_0064bc60 | 8;
      FUN_0047cf9e(G.DAT_006d1da0, 1);
    } else if (iVar2 === 8) {
      // Restore default visibility
      local_34 = FUN_005b8931(0, 0);
      for (local_8 = 0; local_8 < G.DAT_006d1164; local_8 = local_8 + 1) {
        local_34[4] = 0;
        if (((u8(local_34[1]) & 3) !== 0) && ((u8(local_34[5]) >>> 4) < 8)) {
          local_140 = u8(local_34[5]) >>> 4;
          local_34[4] = (1 << (local_140 & 0x1f));
        }
        local_34 = local_34 + 6;
      }
      G.DAT_0064bc60 = G.DAT_0064bc60 & 0xfff7;
      FUN_0047cf9e(G.DAT_006d1da0, 1);
    } else if (iVar2 === 9) {
      iVar2 = FUN_00421ed0("SCENNAME", 0x18, G.DAT_0064bc62, local_138);
      if (iVar2 === 0) {
        FUN_005f22d0(G.DAT_0064bc62, local_138);
      }
    } else if (iVar2 === 10) {
      G.DAT_0064bc60 = G.DAT_0064bc60 ^ 1;
    } else if (iVar2 === 0xb) {
      FUN_00557e2c();
    } else {
      if (iVar2 !== 0xc) {
        return;
      }
      FUN_0055819b();
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055891d @ 0x0055891D
// Size: 26 bytes
// cheat_save_as_scenario
// ============================================================

export function FUN_0055891d() {
  FUN_save_game(1);
  return;
}



// ============================================================
// Function: FID_conflict___E31_00559C20 @ 0x00559C20
// Size: 26 bytes
// static_init_miniframe
// ============================================================

export function FID_conflict___E31_00559C20() {
  FUN_00559c3a();
  FUN_00559c54();
  return;
}



// ============================================================
// Function: FUN_00559c3a @ 0x00559C3A
// Size: 26 bytes
// init_miniframe_wnd
// ============================================================

export function FUN_00559c3a() {
  FUN_00559e3c();
  return;
}



// ============================================================
// Function: FUN_00559c54 @ 0x00559C54
// Size: 29 bytes
// register_atexit_miniframe
// ============================================================

export function FUN_00559c54() {
  // _atexit — no-op
  return;
}



// ============================================================
// Function: FUN_00559c71 @ 0x00559C71
// Size: 26 bytes
// atexit_destroy_miniframe
// ============================================================

export function FUN_00559c71() {
  // CMiniFrameWnd destructor — no-op
  return;
}



// ============================================================
// Function: FID_conflict___E31_00559C8B @ 0x00559C8B
// Size: 26 bytes
// static_init_block_4
// ============================================================

export function FID_conflict___E31_00559C8B() {
  FUN_00559ca5();
  FUN_00559cbf();
  return;
}



// ============================================================
// Function: FUN_00559ca5 @ 0x00559CA5
// Size: 26 bytes
// init_intro_video_object
// ============================================================

export function FUN_00559ca5() {
  FUN_005bd630();
  return;
}



// ============================================================
// Function: FUN_00559cbf @ 0x00559CBF
// Size: 29 bytes
// register_atexit_intro
// ============================================================

export function FUN_00559cbf() {
  // _atexit — no-op
  return;
}



// ============================================================
// Function: FUN_00559cdc @ 0x00559CDC
// Size: 26 bytes
// atexit_destroy_intro
// ============================================================

export function FUN_00559cdc() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_00559cf6 @ 0x00559CF6
// Size: 199 bytes
// play_intro_video
// ============================================================

export function FUN_00559cf6(param_1, param_2) {
  // Plays intro video sequence — multimedia, no-op
  return;
}



// ============================================================
// Function: FUN_00559dbd @ 0x00559DBD
// Size: 12 bytes
// cleanup_video_1
// ============================================================

export function FUN_00559dbd() {
  FUN_005c656b();
  return;
}



// ============================================================
// Function: FUN_00559dc9 @ 0x00559DC9
// Size: 12 bytes
// cleanup_video_2
// ============================================================

export function FUN_00559dc9() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_00559ddf @ 0x00559DDF
// Size: 14 bytes
// seh_epilog_14
// ============================================================

export function FUN_00559ddf() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00559ded @ 0x00559DED
// Size: 79 bytes
// init_intro_display_defaults
// ============================================================

export function FUN_00559ded() {
  // Sets default display dimensions (100x100) and flags — UI, no-op
  return;
}



// ============================================================
// Function: FUN_00559e3c @ 0x00559E3C
// Size: 118 bytes
// CMiniFrameWnd_constructor
// ============================================================

export function FUN_00559e3c() {
  // MFC CMiniFrameWnd constructor — UI, no-op
  return;
}



// ============================================================
// Function: CMiniFrameWnd_destructor @ 0x00559ED4
// Size: 92 bytes
// ~CMiniFrameWnd
// ============================================================

export function CMiniFrameWnd_destructor() {
  // MFC destructor — no-op
  return;
}



// ============================================================
// Function: FUN_00559f30 @ 0x00559F30
// Size: 15 bytes
// destroy_timevec_sub
// ============================================================

export function FUN_00559f30() {
  // Destructor helper — no-op
  return;
}



// ============================================================
// Function: FUN_00559f3f @ 0x00559F3F
// Size: 9 bytes
// destroy_olecntr_sub
// ============================================================

export function FUN_00559f3f() {
  // Destructor helper — no-op
  return;
}



// ============================================================
// Function: FUN_00559f52 @ 0x00559F52
// Size: 14 bytes
// seh_epilog_15
// ============================================================

export function FUN_00559f52() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_00559f60 @ 0x00559F60
// Size: 111 bytes
// blit_intro_rect
// ============================================================

export function FUN_00559f60(param_1) {
  // BitBlt wrapper for intro display — UI, no-op
  return;
}



// ============================================================
// Function: FUN_00559fcf @ 0x00559FCF
// Size: 60 bytes
// paint_intro_and_blit
// ============================================================

export function FUN_00559fcf(param_1) {
  FUN_005a9780();
  FUN_005baeb0();
  FUN_00559f60(param_1);
  return;
}



// ============================================================
// Function: FUN_0055a00b @ 0x0055A00B
// Size: 70 bytes
// set_rect_from_offset
// ============================================================

export function FUN_0055a00b(param_1, param_2, param_3, param_4, param_5) {
  // Sets a RECT relative to stored offset — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055a051 @ 0x0055A051
// Size: 144 bytes
// refresh_intro_display
// ============================================================

export function FUN_0055a051() {
  FUN_00552ed2();
  FUN_00559cf6(0, 0); // placeholder args
  FUN_0055a00b(0, 0, 0, 0, 0);
  FUN_005a9780();
  FUN_00552112();
  FUN_00559fcf(0);
  FUN_00408460();
  return;
}



// ============================================================
// Function: FUN_0055a0e1 @ 0x0055A0E1
// Size: 44 bytes
// init_intro_palette
// ============================================================

export function FUN_0055a0e1() {
  FUN_004503d0();
  FUN_00451900();
  FUN_00484d52();
  return 0;
}



// ============================================================
// Function: FUN_0055a10d @ 0x0055A10D
// Size: 81 bytes
// calc_dialog_rect_with_border
// ============================================================

export function FUN_0055a10d(param_1, param_2, param_3, param_4, param_5) {
  FUN_004086c0(param_1, param_2, param_3, param_4 + 0x10 + G.DAT_006335a0,
               param_5 + 0x10 + G.DAT_006335a4);
  return;
}



// ============================================================
// Function: FUN_0055a15e @ 0x0055A15E
// Size: 26 bytes
// refresh_intro_display_1
// ============================================================

export function FUN_0055a15e() {
  FUN_0055a051();
  return;
}



// ============================================================
// Function: FUN_0055a178 @ 0x0055A178
// Size: 26 bytes
// refresh_intro_display_2
// ============================================================

export function FUN_0055a178() {
  FUN_0055a051();
  return;
}



// ============================================================
// Function: FUN_0055a192 @ 0x0055A192
// Size: 352 bytes
// calc_dialog_position
// ============================================================

export function FUN_0055a192(param_1, param_2) {
  let iVar1;

  switch (param_1) {
    case 0:
    case 5:
      param_1 = 0;
      break;
    case 1:
      param_1 = ((G.DAT_006ab198 + -0x280 + ((G.DAT_006ab198 + -0x280) >> 31 & 7)) >> 3) + 1;
      break;
    case 2:
      iVar1 = FUN_004080c0();
      param_1 = ((iVar1 - (param_2 + 0x10)) / 2) | 0;
      break;
    case 3:
      iVar1 = FUN_004080c0();
      param_1 = ((iVar1 - (param_2 + 0x10)) -
                ((G.DAT_006ab198 + -0x280 + ((G.DAT_006ab198 + -0x280) >> 31 & 7)) >> 3)) + -1;
      break;
    case 4:
      param_1 = FUN_004080c0();
      param_1 = param_1 - (param_2 + 0x10);
      if (param_1 < 0) {
        param_1 = 0;
      }
      break;
    case 6:
      param_1 = ((G.DAT_006ab19c + -0x1e0 + ((G.DAT_006ab19c + -0x1e0) >> 31 & 7)) >> 3) + 1;
      break;
    case 7:
      iVar1 = FUN_00414bb0();
      param_1 = ((iVar1 - (param_2 + 0x10)) / 2) | 0;
      break;
    case 8:
      iVar1 = FUN_00414bb0();
      param_1 = ((iVar1 - (param_2 + 0x10)) -
                ((G.DAT_006ab19c + -0x1e0 + ((G.DAT_006ab19c + -0x1e0) >> 31 & 7)) >> 3)) + -1;
      break;
    case 9:
      param_1 = FUN_00414bb0();
      param_1 = param_1 - (param_2 + 0x10);
      if (param_1 < 0) {
        param_1 = 0;
      }
      break;
  }
  return param_1;
}



// ============================================================
// Function: FUN_0055a329 @ 0x0055A329
// Size: 186 bytes
// get_dialog_default_size
// ============================================================

export function FUN_0055a329(param_1, param_2) {
  let uVar1;

  switch (param_2) {
    case 1:
      if (param_1 === 0) {
        uVar1 = 0x178;
      } else {
        uVar1 = 0xe3;
      }
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      if (param_1 === 0) {
        uVar1 = 0x247;
      } else {
        uVar1 = 0x101;
      }
      break;
    case 6:
    case 7:
    case 8:
    case 9:
      if (param_1 === 0) {
        uVar1 = 0x248;
      } else {
        uVar1 = 0x102;
      }
      break;
    case 10:
    case 0xb:
    case 0xc:
    case 0xd:
      if (param_1 === 0) {
        uVar1 = 0x196;
      } else {
        uVar1 = 0x102;
      }
      break;
    default:
      uVar1 = 100;
      break;
  }
  return uVar1;
}



// ============================================================
// Function: FUN_0055a41d @ 0x0055A41D
// Size: 330 bytes
// open_advisor_dialog
// ============================================================

export function FUN_0055a41d(param_1, param_2, param_3) {
  // Opens an advisor/info dialog with dynamic sizing — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055a567 @ 0x0055A567
// Size: 61 bytes
// close_advisor_dialog_if_open
// ============================================================

export function FUN_0055a567() {
  // Closes advisor dialog — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055a5a4 @ 0x0055A5A4
// Size: 64 bytes
// close_and_unload_advisor
// ============================================================

export function FUN_0055a5a4() {
  // Closes advisor and unloads DLL — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055a5e4 @ 0x0055A5E4
// Size: 102 bytes
// load_intro_dll
// ============================================================

export function FUN_0055a5e4() {
  // Loads civ2_intro.dll for advisor animations — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055a64a @ 0x0055A64A
// Size: 65 bytes
// unload_intro_dll
// ============================================================

export function FUN_0055a64a() {
  // Unloads intro DLL — UI, no-op
  return;
}



// ============================================================
// Function: FUN_0055a930 @ 0x0055A930
// Size: 56 bytes
// setup_blit_rect_same_src_dst
// ============================================================

export function FUN_0055a930(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005a9afe(param_1, param_2, param_3, param_4, param_3, param_4, param_5, param_6);
  return;
}



// ============================================================
// Function: FUN_0055a980 @ 0x0055A980
// Size: 695 bytes
// build_trade_route_map
// ============================================================

export function FUN_0055a980() {
  let iVar1;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  G.DAT_0062d040 = 1;
  for (local_3c = 0; local_3c < 2; local_3c = local_3c + 1) {
    if (local_3c === 0) {
      local_8 = G.DAT_006365e0;
    } else {
      local_8 = G.DAT_006365e4;
    }
    local_2c = (local_3c !== 0) ? 1 : 0;
    // memset local_8 to 0
    for (local_34 = 0; local_34 < G.DAT_006d116a; local_34 = local_34 + 1) {
      for (local_20 = 0; local_20 < G.DAT_006d116c; local_20 = local_20 + 1) {
        local_1c = local_34 * 4 + 1;
        local_24 = local_20 * 4 + 1;
        local_18 = FUN_0055ac37(local_1c, local_24, { value: 0 }, { value: 0 }, local_2c);
        if (-1 < local_18) {
          for (local_44 = 0; local_44 < 4; local_44 = local_44 + 1) {
            local_10 = FUN_005ae052(s8(G.DAT_006283d0[local_44]) * 4 + local_1c);
            local_14 = s8(G.DAT_006283e0[local_44]) * 4 + local_24;
            iVar1 = FUN_004087c0(local_10, local_14);
            if ((iVar1 !== 0) &&
                (local_c = FUN_0055ac37(local_10, local_14, { value: 0 }, { value: 0 }, local_2c),
                 local_c === local_18) &&
                (local_38 = FUN_004ad0d1(local_28, local_30, local_40, local_48, local_2c, 5),
                 0 < local_38) && (local_38 < 5)) {
              // Set bit in trade route map
              local_10 = FUN_005ae0b0(s8(G.DAT_006283d0[local_44]) + local_34);
              local_14 = s8(G.DAT_006283e0[local_44]) + local_20;
              if ((-1 < local_10) && (-1 < local_14) &&
                  (local_10 < G.DAT_006d116a && (local_14 < G.DAT_006d116c))) {
                // Set reverse direction bit
              }
            }
          }
        }
      }
      FUN_0040894c();
    }
  }
  G.DAT_0062d040 = 0;
  return;
}



// ============================================================
// Function: FUN_0055ac37 @ 0x0055AC37
// Size: 180 bytes
// find_trade_route_tile
// ============================================================

export function FUN_0055ac37(param_1, param_2, param_3, param_4, param_5) {
  let uVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let local_8;

  local_8 = 0;
  while (true) {
    if (1 < local_8) {
      return 0xffffffff;
    }
    uVar1 = FUN_005ae052(param_1 + local_8);
    iVar2 = param_2 + local_8;
    iVar3 = FUN_004087c0(uVar1, iVar2);
    if ((iVar3 !== 0) && (iVar3 = FUN_005b89e4(uVar1, iVar2), iVar3 === param_5)) break;
    local_8 = local_8 + 1;
  }
  uVar4 = FUN_005b8a81(uVar1, iVar2);
  if (param_3) param_3.value = uVar1;
  if (param_4) param_4.value = iVar2;
  return uVar4;
}



// ============================================================
// Function: FUN_0055add0 @ 0x0055ADD0
// Size: 140 bytes
// app_main_entry
// ============================================================

export function FUN_0055add0(param_1, param_2) {
  // Win32 entry point — CreateMutex, FindWindow, etc. — no-op
  return 0;
}



// ============================================================
// Function: FUN_0055ae80 @ 0x0055AE80
// Size: 174 bytes
// stop_turn_timer
// ============================================================

export function FUN_0055ae80(param_1) {
  if (G.DAT_006ad578 === G.DAT_006d1da0) {
    FUN_citywin_994F();
    FUN_00437c6f();
    FUN_0044f799();
    FUN_004f8d51();
  }
  if (G.DAT_00633a74 !== 0) {
    FUN_005d2004(G.DAT_00633a74);
    G.DAT_00633a74 = 0;
    FUN_0056ac67(100, 0xffffffff);
    if (((param_1 !== 0) && (2 < G.DAT_00655b02)) && (G.DAT_0064b9bc !== 0)) {
      FUN_0046b14d(0x6e, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055af2e @ 0x0055AF2E
// Size: 280 bytes
// start_turn_timer
// ============================================================

export function FUN_0055af2e(param_1) {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (G.DAT_006ad578 === G.DAT_006d1da0) {
    FUN_citywin_994F();
    FUN_00437c6f();
    FUN_0044f799();
    FUN_004f8d51();
  }
  G.DAT_00633a78 = (G.DAT_00654b70 / 1000) | 0;
  G.DAT_006ab5ac = 0;
  G.DAT_0066c990 = 0xffffffff;
  FUN_00552112();
  local_14 = G.DAT_0066ca54;
  local_10 = G.DAT_0066ca58;
  local_c = G.DAT_0066ca5c;
  local_8 = G.DAT_0066ca68;
  FUN_00408490(local_14);
  if (G.DAT_00633a74 !== 0) {
    FUN_005d2004(G.DAT_00633a74);
  }
  G.DAT_00633a74 = FUN_005d1f50(0, 500, 1);
  G.DAT_00633a7c = FUN_00421bb0();
  if ((param_1 !== 0) && (2 < G.DAT_00655b02)) {
    FUN_0046b14d(0x6d, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  return;
}



// ============================================================
// Function: FUN_0055b046 @ 0x0055B046
// Size: 181 bytes
// resume_turn_timer
// ============================================================

export function FUN_0055b046(param_1) {
  FUN_citywin_994F();
  FUN_00437c6f();
  FUN_0044f799();
  FUN_004f8d51();
  if ((G.DAT_00633a78 !== 0) && (G.DAT_0066c988 !== 0)) {
    if (G.DAT_00633a74 !== 0) {
      FUN_005d2004(G.DAT_00633a74);
    }
    G.DAT_00633a74 = FUN_005d1f50(0, 500, 1);
    G.DAT_00633a7c = FUN_00421bb0();
    if ((param_1 !== 0) && (2 < G.DAT_00655b02)) {
      FUN_0046b14d(0x6f, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055b0fb @ 0x0055B0FB
// Size: 459 bytes
// tick_turn_timer
// ============================================================

export function FUN_0055b0fb() {
  let iVar1;
  let local_18;

  if (G.DAT_00654b70 !== 0) {
    G.DAT_006ab5ac = G.DAT_006ab5ac ^ 1;
    if (G.DAT_006ab5ac !== 0) {
      if (G.DAT_00633a78 !== 0) {
        FUN_00421bb0();
        iVar1 = 0; // __ftol placeholder
        G.DAT_00633a78 = G.DAT_00633a78 - iVar1;
        if (G.DAT_00633a78 < 0) {
          G.DAT_00633a78 = 0;
        }
        G.DAT_00633a7c = FUN_00421bb0();
      }
      if (G.DAT_00633a78 === 0) {
        FUN_citywin_994F();
        FUN_00437c6f();
        FUN_0044f799();
        FUN_004f8d51();
        G.DAT_0064b9bc = 0;
        FUN_0056ac67(100, 0xffffffff);
        return;
      }
      FUN_00552112();
      FUN_00408490(0);
    }
    iVar1 = ((G.DAT_00633a78 * 100000) / G.DAT_00654b70) | 0;
    if (iVar1 < 0x21) {
      local_18 = 0x6a;
    } else if (iVar1 < 0x42) {
      local_18 = 0x7a;
    } else {
      local_18 = 0x2a;
    }
    if (((local_18 === 0x6a) || (G.DAT_00633a78 < 0x1e)) && (G.DAT_006ab5ac !== 0)) {
      local_18 = -1;
    }
    FUN_0056ac67(iVar1, local_18);
    if (G.DAT_00633a74 !== 0) {
      FUN_005d2004(G.DAT_00633a74);
    }
    G.DAT_00633a74 = FUN_005d1f50(0, 500, 1);
  }
  return;
}



// ============================================================
// Function: FUN_0055b2c6 @ 0x0055B2C6
// Size: 258 bytes
// toggle_turn_timer
// ============================================================

export function FUN_0055b2c6() {
  let iVar1;

  FUN_0055ae80(1);
  GetAsyncKeyState(0x1b);
  iVar1 = FUN_0051ea8e(1);
  if (iVar1 === 0) {
    if (G.DAT_00654b70 === 0) {
      G.DAT_0066c988 = 0;
      FUN_00552112();
      FUN_00408490(0);
    } else {
      G.DAT_0066c988 = 1;
      FUN_0055af2e(1);
    }
    if (2 < G.DAT_00655b02) {
      FUN_0046b14d(0x6c, 0xff, G.DAT_00654b70, 0, 0, 0, 0, 0, 0, 0);
    }
  } else {
    FUN_0055b046(1);
  }
  if (G.DAT_00654fa8 !== 0) {
    G.DAT_0064b9bc = 0;
  }
  return;
}



// ============================================================
// Function: FUN_0055b3c8 @ 0x0055B3C8
// Size: 53 bytes
// cancel_drag_timeout
// ============================================================

export function FUN_0055b3c8() {
  if (G.DAT_00633a80 !== 0) {
    FUN_005d2004(G.DAT_00633a80);
    G.DAT_00633a80 = 0;
  }
  return;
}



// ============================================================
// Function: FUN_0055b3fd @ 0x0055B3FD
// Size: 84 bytes
// start_drag_timeout
// ============================================================

export function FUN_0055b3fd() {
  if (2 < G.DAT_00655b02) {
    if (G.DAT_00633a80 !== 0) {
      FUN_005d2004(G.DAT_00633a80);
    }
    G.DAT_00633a80 = FUN_005d1f50(FUN_0055b5fa, 500, 1);
  }
  return;
}



// ============================================================
// Function: FUN_0055b451 @ 0x0055B451
// Size: 45 bytes
// check_drag_pending
// ============================================================

export function FUN_0055b451() {
  if (G.DAT_00633a84 !== 0) {
    FUN_0055b5fa(0, 0);
  }
  return 0;
}



// ============================================================
// Function: FUN_0055b47e @ 0x0055B47E
// Size: 151 bytes
// enter_window_drag
// ============================================================

export function FUN_0055b47e() {
  debug_log("ENTER_WINDOW_DRAG");
  G.DAT_00633a84 = 1;
  G.DAT_00633a88 = FUN_00421bb0();
  G.DAT_00633a8c = 0;
  G.DAT_00633a90 = FUN_005c62ee();
  if (G.DAT_006ad2f7 !== 0) {
    FUN_0046b14d(0x5d, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  G.DAT_006ab5b4 = SetWindowsHookExA(7, 0, G.DAT_006e4ff0, 0);
  return;
}



// ============================================================
// Function: FUN_0055b515 @ 0x0055B515
// Size: 137 bytes
// exit_window_drag
// ============================================================

export function FUN_0055b515() {
  debug_log("EXIT_WINDOW_DRAG");
  G.DAT_00633a84 = 0;
  G.DAT_00633a88 = 0;
  G.DAT_00633a8c = 0;
  G.DAT_00633a90 = 0;
  UnhookWindowsHookEx(G.DAT_006ab5b4);
  if (G.DAT_006ad2f7 !== 0) {
    FUN_0046b14d(0x5e, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  return;
}



// ============================================================
// Function: FUN_0055b59e @ 0x0055B59E
// Size: 92 bytes
// force_release_drag
// ============================================================

export function FUN_0055b59e() {
  if (G.DAT_00633a84 !== 0) {
    if (G.DAT_00633a90 !== 0) {
      // Post WM_LBUTTONUP — Win32, no-op
      FUN_00414d40();
    }
    G.DAT_00633a84 = 0;
  }
  return;
}



// ============================================================
// Function: FUN_0055b5fa @ 0x0055B5FA
// Size: 120 bytes
// drag_timeout_callback
// ============================================================

export function FUN_0055b5fa() {
  let iVar1;

  if ((((2 < G.DAT_00655b02) && (G.DAT_006ad308 !== 1)) && (G.DAT_00633a84 !== 0)) &&
     ((iVar1 = FUN_00421bb0(), G.DAT_00633a88 + 0x26c < iVar1 && (G.DAT_006ad685 === 0)))) {
    FUN_0055b59e();
  }
  FUN_0055b3fd();
  return;
}



// ============================================================
// Function: FUN_0055b677 @ 0x0055B677
// Size: 80 bytes
// check_drag_hold_time
// ============================================================

export function FUN_0055b677() {
  let iVar1;

  if (G.DAT_00633a84 !== 0) {
    iVar1 = FUN_00421bb0();
    if (G.DAT_00633a88 + 0x7c < iVar1) {
      G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
      // CRichEditDoc::InvalidateObjectCache — no-op
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055b6c7 @ 0x0055B6C7
// Size: 586 bytes
// resign_game
// ============================================================

export function FUN_0055b6c7() {
  let uVar1;

  if ((G.DAT_00655b02 < 3) || (G.DAT_006ad698 === 0)) {
    if (G.DAT_00655b02 === 0) {
      FUN_0046e6a9();
      FUN_00484d3b();
    } else {
      if (2 < G.DAT_00655b02) {
        if (G.DAT_00633a74 !== 0) {
          FUN_005d2004(G.DAT_00633a74);
          G.DAT_00633a74 = 0;
        }
        FUN_004b7645();
        FUN_004b768d();
        uVar1 = FUN_00410070(G.DAT_006d1da0);
        FUN_0040ff60(0, uVar1);
        uVar1 = FUN_00493ba6(G.DAT_006d1da0);
        FUN_0040ff60(1, uVar1);
        uVar1 = FUN_00493b10(G.DAT_006d1da0);
        FUN_0040ff60(2, uVar1);
        uVar1 = FUN_00493c7d(G.DAT_006d1da0);
        FUN_0040ff60(3, uVar1);
        if (G.DAT_00654c76 === 0) {
          FUN_00511880(1, 0xff, 4, 0, 0, 0);
        } else {
          FUN_00511880(0, 0xff, 4, 0, 0, 0);
        }
      }
      G.DAT_00628054 = 0;
      FUN_0041033a();
      if ((~(1 << (u8(G.DAT_006d1da0) & 0x1f)) & G.DAT_00655b0b) === 0) {
        G.DAT_00655b0b = G.DAT_00655b0b & ~(1 << (u8(G.DAT_006d1da0) & 0x1f));
        if (2 < G.DAT_00655b02) {
          FUN_0046b14d(0x31, 0, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0);
        }
        FUN_00484d3b();
        FUN_0046e6a9();
      } else {
        FUN_004e1763(G.DAT_006d1da0, 0, 0);
      }
      FUN_00484d3b();
      G.DAT_0064b9bc = 0;
      G.DAT_006ad685 = 1;
      FUN_0055ae80(0);
      if (G.DAT_006ad2f7 === 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0xa2, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(5000);
      } else {
        FUN_004824e3();
      }
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055bbc0 @ 0x0055BBC0
// Size: 820 bytes
// count_supply_demand
// ============================================================

export function FUN_0055bbc0(param_1, param_2) {
  let uVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  G.DAT_006ab5e4 = -1;
  G.DAT_00633ac8 = 0;
  G.DAT_006ab5e0 = 0;
  G.DAT_006ab5e8 = 0;
  G.DAT_006ab5ec = 0;
  if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) === 0) {
    for (local_18 = 0; local_18 < G.DAT_00655b18; local_18 = local_18 + 1) {
      if ((G.DAT_0064f394[local_18 * 0x58] !== 0) &&
         (s8(G.DAT_0064f348[local_18 * 0x58]) === param_1)) {
        local_1c = 0;
        local_8 = 0;
        while (local_8 < 0x14) {
          uVar1 = FUN_005ae052(
            (G.DAT_0064f340[local_18 * 0x58] | (G.DAT_0064f340[local_18 * 0x58 + 1] << 8)) + s8(G.DAT_00628370[local_8])
          );
          iVar2 = ((G.DAT_0064f342[local_18 * 0x58] | (G.DAT_0064f342[local_18 * 0x58 + 1] << 8)) << 16 >> 16) +
                  s8(G.DAT_006283a0[local_8]);
          iVar3 = FUN_004087c0(uVar1, iVar2);
          if (((iVar3 === 0) || (iVar3 = FUN_005b89e4(uVar1, iVar2), iVar3 !== 0)) ||
             (iVar3 = FUN_005b8ca6(uVar1, iVar2), -1 < iVar3) ||
             (iVar3 = FUN_005b8d62(uVar1, iVar2), iVar3 !== param_2)) {
            local_8 = local_8 + 1;
            continue;
          }
          uVar4 = FUN_005b94d5(uVar1, iVar2);
          for (local_20 = FUN_005b2e69(uVar1, iVar2); -1 < local_20;
              local_20 = FUN_005b2c82(local_20)) {
            if ((s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_20 * 0x20]) * 0x14]) < 5) &&
                ((G.DAT_006560f4[local_20 * 0x20] & 4) === 0)) {
              if (local_18 !== G.DAT_006ab5e4) {
                G.DAT_00633ac8 = G.DAT_00633ac8 + 1;
              }
              G.DAT_006ab5e4 = local_18;
              if ((G.DAT_006560f4[local_20 * 0x20] & 0x20) === 0) {
                G.DAT_006560f4[local_20 * 0x20] = G.DAT_006560f4[local_20 * 0x20] | 0x20;
              } else {
                G.DAT_006ab5ec = G.DAT_006ab5ec + 1;
              }
              G.DAT_006560f4[local_20 * 0x20] = G.DAT_006560f4[local_20 * 0x20] | 4;
              iVar2 = G.DAT_006ab5e8;
              local_1c = local_1c + 1;
              G.DAT_006ab5e0 = G.DAT_006ab5e0 + 1;
              G.DAT_006ab5e8 = G.DAT_006ab5e8 + 1;
              if ((uVar4 & 0x10) !== 0) {
                G.DAT_006ab5e8 = iVar2 + 2;
              }
              if ((uVar4 & 0x20) !== 0) {
                G.DAT_006ab5e8 = G.DAT_006ab5e8 + 1;
              }
              if ((uVar4 & 8) !== 0) {
                G.DAT_006ab5e8 = G.DAT_006ab5e8 + 1;
              }
              if ((uVar4 & 4) !== 0) {
                G.DAT_006ab5e8 = G.DAT_006ab5e8 + 1;
              }
              if ((uVar4 & 0x40) !== 0) {
                G.DAT_006ab5e8 = G.DAT_006ab5e8 + 2;
              }
            }
          }
          local_8 = local_8 + 1;
        }
        if (3 < local_1c) {
          G.DAT_006ab5ec = G.DAT_006ab5ec + 1;
        }
      }
    }
  } else {
    G.DAT_006ab5e8 = 0;
  }
  return G.DAT_006ab5e8;
}



// ============================================================
// Function: FUN_0055bef9 @ 0x0055BEF9
// Size: 365 bytes
// check_will_sneak_attack
// ============================================================

export function FUN_0055bef9(param_1, param_2) {
  let iVar1;
  let iVar2;
  let local_8;

  if (u8(G.DAT_0064c6b5[param_1 * 0x594]) < 5) {
    return 0;
  }
  if (((G.DAT_00655af0 & 0x80) !== 0) && ((G.DAT_0064bc60 & 1) !== 0)) {
    return 0;
  }
  local_8 = 0;
  if ((G.DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0) {
    local_8 = 0x19;
  }
  iVar1 = FUN_00453e51(param_1, 0x18);
  if (iVar1 !== 0) {
    local_8 = 0x32;
  }
  iVar2 = FUN_005adfa0(local_8 + u8(G.DAT_0064c6be[param_2 * 0x594]) * 0xf, 0, 0x4b);
  if (u8(G.DAT_0064c6b6[param_1 * 0x594]) < iVar2) {
    return 0;
  }
  if (u8(G.DAT_0064c6b5[param_1 * 0x594]) < 6) {
    if ((G.DAT_0064c6a0[param_1 * 0x594] & 4) === 0) {
      return 0;
    } else {
      return 1;
    }
  }
  return 1;
}



// ============================================================
// Function: FUN_0055c066 @ 0x0055C066
// Size: 529 bytes
// set_government_type
// ============================================================

export function FUN_0055c066(param_1, param_2) {
  let cVar1;
  let local_c;
  let local_8;

  cVar1 = G.DAT_0064c6b5[param_1 * 0x594];
  G.DAT_0064c6b5[param_1 * 0x594] = param_2;
  if (G.DAT_0064c6b5[param_1 * 0x594] !== cVar1) {
    if ((G.DAT_0064c6b5[param_1 * 0x594] === 0) ||
       ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0)) {
      for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
        G.DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] =
             G.DAT_0064c6c0[local_8 * 0x594 + param_1 * 4] & 0xffffffef;
      }
    }
    if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) {
      G.DAT_00655aee = G.DAT_00655aee & 0xfffb;
      for (local_c = 0; local_c < G.DAT_00655b18; local_c = local_c + 1) {
        if (((G.DAT_0064f394[local_c * 0x58] !== 0) &&
            (s8(G.DAT_0064f348[local_c * 0x58]) === param_1)) &&
            (FUN_004eb4ed(local_c, 1), G.DAT_0064f379[local_c * 0x58] === 8) &&
           (G.DAT_0064c6b5[param_1 * 0x594] !== 4)) {
          G.DAT_0064f379[local_c * 0x58] = 0xb;
        }
      }
    }
  }
  if (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) && (0 < param_2) &&
     (G.DAT_00654fa8 === 0)) {
    FUN_0040ddc6(param_1);
  }
  return;
}



// ============================================================
// Function: FUN_0055c277 @ 0x0055C277
// Size: 323 bytes
// can_use_government
// ============================================================

export function FUN_0055c277(param_1, param_2) {
  let iVar1;
  let iVar2;
  let local_8;

  local_8 = 1;
  iVar1 = FUN_00453e51(param_1, 0x13);
  switch (param_2) {
    case 2:
      iVar2 = FUN_004bd9f0(param_1, 0x36);
      if ((iVar2 === 0) && (iVar1 === 0)) {
        local_8 = 0;
      }
      break;
    case 3:
      iVar2 = FUN_004bd9f0(param_1, 0xf);
      if ((iVar2 === 0) && (iVar1 === 0)) {
        local_8 = 0;
      }
      break;
    case 4:
      iVar2 = FUN_004bd9f0(param_1, 0x1f);
      if ((iVar2 === 0) && (iVar1 === 0)) {
        local_8 = 0;
      }
      if (G.DAT_00627879 === 0) {
        local_8 = 0;
      }
      break;
    case 5:
      iVar2 = FUN_004bd9f0(param_1, 0x47);
      if ((iVar2 === 0) && (iVar1 === 0)) {
        local_8 = 0;
      }
      break;
    case 6:
      iVar2 = FUN_004bd9f0(param_1, 0x15);
      if ((iVar2 === 0) && (iVar1 === 0)) {
        local_8 = 0;
      }
      break;
  }
  return local_8;
}



// ============================================================
// Function: FUN_0055c3d3 @ 0x0055C3D3
// Size: 678 bytes
// change_government_dialog
// ============================================================

export function FUN_0055c3d3(param_1, param_2) {
  let iVar1;
  let uVar2;
  let local_14;

  if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) {
    return;
  }
  if ((2 < G.DAT_00655b02) && (G.DAT_006d1da0 !== param_1)) {
    FUN_0046b14d(0x9f, G.DAT_006ad30c[G.DAT_006ad558[param_1 * 4] * 0x54], param_2,
                 0, 0, 0, 0, 0, 0, 0);
    return;
  }
  FUN_0043c9d0("PICKGOVT");
  for (local_14 = (param_2 === 0) ? 1 : 0; local_14 < 7; local_14 = local_14 + 1) {
    if ((param_2 !== 0) || (iVar1 = FUN_0055c277(param_1, local_14), iVar1 !== 0)) {
      FUN_0040bbb0();
      FUN_0040ff00(G.DAT_0064b9a0[local_14 * 4]);
      FUN_0059edf0(0, local_14, 0);
    }
  }
  iVar1 = FUN_0040bc80(0);
  if (-1 < iVar1) {
    FUN_0055c066(param_1, iVar1);
    FUN_0046e020(0x14, 1, 0, 0);
    uVar2 = FUN_00493b10(param_1);
    FUN_0040ff60(0, uVar2);
    uVar2 = FUN_00493ba6(param_1);
    FUN_0040ff60(1, uVar2);
    uVar2 = FUN_00410070(param_1);
    FUN_0040ff60(2, uVar2);
    FUN_004271e8(3, G.DAT_0064b9a0[iVar1 * 4]);
    FUN_00410030("NEWGOVT", 0, 0);
    if (((4 < iVar1) && ((G.DAT_00655aea & 0x100) !== 0)) && ((G.DAT_00655af4 & 0x20) === 0)) {
      FUN_004271e8(0, G.DAT_0064b9a0[iVar1 * 4]);
      FUN_004904c0(0, "DEMOCRATS", 0, 0);
      G.DAT_00655af4 = G.DAT_00655af4 | 0x20;
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055c679 @ 0x0055C679
// Size: 12 bytes
// dialog_destroy_wrapper_12
// ============================================================

export function FUN_0055c679() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_0055c68f @ 0x0055C68F
// Size: 14 bytes
// seh_epilog_16
// ============================================================

export function FUN_0055c68f() {
  // SEH epilog — no-op
  return;
}



// ============================================================
// Function: FUN_0055c69d @ 0x0055C69D
// Size: 1336 bytes
// ai_revolution_notification
// ============================================================

export function FUN_0055c69d(param_1, param_2) {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_10;
  let local_c;
  let local_8;

  uVar3 = u8(G.DAT_0064c6b5[param_1 * 0x594]);
  if (param_2 !== 0) {
    G.DAT_0064c6a0[param_1 * 0x594] = G.DAT_0064c6a0[param_1 * 0x594] | 8;
  }
  if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) {
    if ((uVar3 !== param_2) || ((G.DAT_0064c6a0[param_1 * 0x594] & 1) !== 0)) {
      uVar1 = FUN_00493d13(param_1);
      FUN_00421d60(0, uVar1);
      FUN_004271e8(1, G.DAT_0064b9a0[param_2 * 4]);
      uVar1 = FUN_00493b10(param_1);
      FUN_0040ff60(2, uVar1);
      uVar1 = FUN_00493ba6(param_1);
      FUN_0040ff60(3, uVar1);
      local_10 = 0;
      if (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0) ||
         (((iVar2 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar2 !== 0 ||
           (iVar2 = FUN_00453e51(G.DAT_006d1da0, 9), iVar2 !== 0)) || (G.DAT_00655b07 !== 0)))) {
        if (((G.DAT_0064c6a0[param_1 * 0x594] & 1) === 0) || (G.DAT_00654fa8 !== 0)) {
          if (G.DAT_00654fa8 === 0) {
            FUN_00410030("OVERTHROWN", 0, (G.DAT_00633584 === 0) ? 0 : 8);
            G.DAT_0064c6a0[param_1 * 0x594] = G.DAT_0064c6a0[param_1 * 0x594] | 1;
          }
        } else {
          FUN_00410030("CHANGED", 0, (G.DAT_00633584 === 0) ? 0 : 8);
          G.DAT_0064c6a0[param_1 * 0x594] = G.DAT_0064c6a0[param_1 * 0x594] & 0xfffe;
        }
        if (param_2 < 4) {
          local_8 = param_2;
        } else {
          local_8 = param_2 - 1;
        }
        G.DAT_0064c6b4[param_1 * 0x594] = 4 - (local_8 >> 1);
      }
      if (2 < G.DAT_00655b02) {
        for (local_c = 1; local_c < 8; local_c = local_c + 1) {
          if ((((1 << (u8(local_c) & 0x1f) & G.DAT_00655b0b) !== 0) &&
              (G.DAT_006d1da0 !== local_c)) &&
             ((G.DAT_00655b07 !== 0 ||
              ((((G.DAT_0064c6c0[local_c * 0x594 + param_1 * 4] & 0x80) !== 0 ||
                (iVar2 = FUN_00453e51(local_c, 0x18), iVar2 !== 0)) ||
               (iVar2 = FUN_00453e51(local_c, 9), iVar2 !== 0)))))) {
            if (((G.DAT_0064c6a0[param_1 * 0x594] & 1) === 0) || (G.DAT_00654fa8 !== 0)) {
              FUN_00511880(0x2c, G.DAT_006ad30c[G.DAT_006ad558[local_c * 4] * 0x54],
                           1, 0, uVar3, (G.DAT_00633584 === 0) ? 0 : 8);
              G.DAT_0064c6a0[param_1 * 0x594] = G.DAT_0064c6a0[param_1 * 0x594] | 1;
              local_10 = local_10 + 1;
            } else {
              FUN_00511880(0x2b, G.DAT_006ad30c[G.DAT_006ad558[local_c * 4] * 0x54],
                           4, 0, param_2, (G.DAT_00633584 === 0) ? 0 : 8);
              G.DAT_0064c6a0[param_1 * 0x594] = G.DAT_0064c6a0[param_1 * 0x594] & 0xfffe;
              local_10 = local_10 + 1;
            }
          }
        }
      }
      if (local_10 !== 0) {
        if (param_2 < 4) {
          local_8 = param_2;
        } else {
          local_8 = param_2 - 1;
        }
        G.DAT_0064c6b4[param_1 * 0x594] = 4 - (local_8 >> 1);
      }
    }
  } else if (param_2 !== 0) {
    FUN_0055c3d3(param_1, 0);
    return;
  }
  FUN_0055c066(param_1, param_2);
  return;
}



// ============================================================
// Function: FUN_0055cbd5 @ 0x0055CBD5
// Size: 1549 bytes
// should_declare_war
// ============================================================

export function FUN_0055cbd5(param_1, param_2) {
  let bVar1;
  let uVar2;
  let iVar3;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  bVar1 = G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594];
  if ((G.DAT_0064c6c1[param_2 * 4 + param_1 * 0x594] & 8) !== 0) {
    return 1;
  }
  if ((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x10) !== 0) {
    return 1;
  }
  for (local_20 = 1; local_20 < 8; local_20 = local_20 + 1) {
    if ((1 << (u8(local_20) & 0x1f) & G.DAT_00655b0b) !== 0) {
      iVar3 = FUN_00467af0(param_1, local_20);
      if (((iVar3 !== 0) &&
          (G.DAT_0064c70e[param_2 * 0x594] < G.DAT_0064c70e[local_20 * 0x594])) &&
         ((G.DAT_0064c6c0[param_2 * 4 + local_20 * 0x594] & 8) === 0)) {
        return 0;
      }
      iVar3 = FUN_00467af0(param_2, local_20);
      if (((iVar3 !== 0) &&
          (G.DAT_0064c70e[param_1 * 0x594] < G.DAT_0064c70e[local_20 * 0x594])) &&
         ((G.DAT_0064c6c0[param_1 * 4 + local_20 * 0x594] & 8) === 0)) {
        return 0;
      }
    }
  }
  if (u8(G.DAT_0064c7a5[param_1 * 0x594]) < u8(G.DAT_0064c7a5[param_2 * 0x594])) {
    return 0;
  }
  local_c = 0;
  for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
    if ((local_10 !== param_1) && (local_10 !== param_2)) {
      iVar3 = FUN_00467af0(param_1, local_10);
      if (iVar3 !== 0) {
        local_c = local_c + 1;
      }
      iVar3 = local_c;
      if (((((G.DAT_0064c6c0[local_10 * 4 + param_1 * 0x594] & 8) !== 0) &&
           ((G.DAT_0064c6c0[local_10 * 4 + param_2 * 0x594] & 8) !== 0)) &&
          ((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
         ((iVar3 = local_c + 1,
          (u8(G.DAT_00655c22[param_1]) < u8(G.DAT_00655c22[local_10]) &&
           (u8(G.DAT_00655c22[param_2]) < u8(G.DAT_00655c22[local_10])))))) {
        iVar3 = local_c + 2;
      }
      local_c = iVar3;
      if ((((G.DAT_0064c6c0[local_10 * 4 + param_1 * 0x594] & 8) !== 0) &&
          ((G.DAT_0064c6c1[local_10 * 4 + param_2 * 0x594] & 0x20) !== 0)) &&
         ((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0b) !== 0)) {
        local_c = local_c + -1;
      }
      if (((G.DAT_00655c22[local_10] === 7) && (199 < G.DAT_00655af8)) &&
         ((G.DAT_0064c6c1[local_10 * 4 + param_2 * 0x594] & 0x20) !== 0)) {
        local_c = local_c + -1;
      }
    }
  }
  iVar3 = FUN_00467af0(param_1, param_2);
  if (iVar3 === 0) {
    local_c = local_c + 1;
  }
  if ((bVar1 & 8) !== 0) {
    local_c = local_c + 1;
  }
  local_8 = 0;
  local_1c = 0;
  local_24 = 1;
  for (local_18 = 1; local_18 < 0x3f; local_18 = local_18 + 1) {
    if ((G.DAT_0064c932[param_1 * 0x594 + local_18] !== 0) &&
       (G.DAT_0064c8b2[local_18 * 2 + param_1 * 0x594] +
        G.DAT_0064c832[local_18 * 2 + param_1 * 0x594] <
        G.DAT_0064c8b2[local_18 * 2 + param_2 * 0x594])) {
      return 0;
    }
    if ((G.DAT_0064c8b2[local_18 * 2 + param_1 * 0x594] !== 0) &&
       (G.DAT_0064c832[local_18 * 2 + param_2 * 0x594] !== 0)) {
      local_1c = local_1c + G.DAT_0064c8b2[param_1 * 0x594 + local_18 * 2];
      local_24 = local_24 + (G.DAT_0064c8b2[param_2 * 0x594 + local_18 * 2] >> 1) +
                 G.DAT_0064c832[param_2 * 0x594 + local_18 * 2];
      local_8 = local_8 + u8(G.DAT_0064c932[param_1 * 0x594 + local_18]);
    }
  }
  if (((local_1c << 2) / local_24 <
       (local_c - s8(G.DAT_006554f8[G.DAT_0064c6a6[param_1 * 0x594] * 0x30])) + 4) &&
      (local_8 !== 0)) {
    return 0;
  }
  return 1;
}



// ============================================================
// Function: FUN_0055d1e2 @ 0x0055D1E2
// Size: 1182 bytes
// try_tech_exchange
// ============================================================

export function FUN_0055d1e2(param_1, param_2) {
  let bVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;

  local_14 = 0;
  local_18 = 0;
  local_10 = 0;
  if (((G.DAT_00655af0 & 0x80) !== 0) && ((G.DAT_0064bc60 & 0x20) !== 0)) {
    return 0;
  }
  if ((((G.DAT_00655b0b & (1 << (G.DAT_00655c31 & 0x1f))) === 0) ||
      (((G.DAT_00655b08 === 0 || (G.DAT_0064c708[G.DAT_00655c31 * 0x594] < 5)) ||
       (G.DAT_00655af8 < 0xc9)))) ||
     ((u8(G.DAT_0064c6b0[G.DAT_00655c31 * 0x594]) <= u8(G.DAT_0064c6b0[param_1 * 0x594]) ||
       (u8(G.DAT_0064c6b0[G.DAT_00655c31 * 0x594]) <= u8(G.DAT_0064c6b0[param_2 * 0x594]))))) {
    bVar1 = false;
  } else {
    bVar1 = true;
  }
  for (local_1c = 0; local_1c < 100; local_1c = local_1c + 1) {
    if ((G.DAT_0062768e[local_1c * 0x10] !== -2) || (G.DAT_0062768f[local_1c * 0x10] !== -2)) {
      iVar3 = FUN_004bd9f0(param_1, local_1c);
      if ((iVar3 === 0) && (iVar3 = FUN_004bd9f0(param_2, local_1c), iVar3 !== 0)) {
        iVar3 = _rand();
        iVar4 = FUN_004bdb2c(param_1, local_1c);
        iVar4 = iVar3 % 3 + iVar4;
        if (((local_10 & 1) === 0) || (local_14 < iVar4)) {
          local_20 = local_1c;
          local_10 = local_10 | 1;
          local_14 = iVar4;
        }
      } else {
        iVar3 = FUN_004bd9f0(param_2, local_1c);
        if ((iVar3 === 0) && (iVar3 = FUN_004bd9f0(param_1, local_1c), iVar3 !== 0)) {
          iVar3 = _rand();
          iVar4 = FUN_004bdb2c(param_2, local_1c);
          iVar4 = iVar3 % 3 + iVar4;
          if (((local_10 & 2) === 0) || (local_18 < iVar4)) {
            local_24 = local_1c;
            local_10 = local_10 | 2;
            local_18 = iVar4;
          }
        }
      }
    }
  }
  if (local_10 === 3) {
    FUN_004bf05b(param_1, local_20, param_2, 0, 0);
    FUN_004bf05b(param_2, local_24, param_1, 0, 0);
    return 1;
  }
  if (local_10 === 1) {
    if (((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) !== 0) &&
       (((u8(G.DAT_0064c6b0[param_1 * 0x594]) + (6 - G.DAT_00655b08) * 2 <
          u8(G.DAT_0064c6b0[param_2 * 0x594])) || (bVar1)) &&
        ((G.DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 4) === 0))) {
      FUN_00467825(param_1, param_2, 0x40000);
      FUN_004bf05b(param_1, local_20, param_2, 0, 0);
      return 1;
    }
  } else if ((((local_10 === 2) && ((G.DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0)) &&
             (((u8(G.DAT_0064c6b0[param_2 * 0x594]) + (6 - G.DAT_00655b08) * 2 <
                u8(G.DAT_0064c6b0[param_1 * 0x594])) || (bVar1)))) &&
            ((G.DAT_0064c6c2[param_1 * 4 + param_2 * 0x594] & 4) === 0)) {
    FUN_00467825(param_1, param_2, 0x40000);
    FUN_004bf05b(param_2, local_24, param_1, 0, 0);
    return 1;
  }
  return 0;
}



// ============================================================
// Function: FUN_0055d685 @ 0x0055D685
// Size: 595 bytes
// try_join_war
// ============================================================

export function FUN_0055d685(param_1, param_2, param_3) {
  let uVar1;
  let iVar2;

  if ((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x2008) !== 0) {
    return 0;
  }
  if ((G.DAT_0064c6c1[param_2 * 4 + param_3 * 0x594] & 0x20) === 0) {
    if (((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x10) !== 0) &&
       ((G.DAT_0064c6c0[param_2 * 4 + param_3 * 0x594] & 0x10) !== 0)) {
      G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] =
           G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] | 0x20;
      G.DAT_0064c6c0[param_3 * 0x594 + param_2 * 4] =
           G.DAT_0064c6c0[param_3 * 0x594 + param_2 * 4] | 0x20;
    }
    return 0;
  }
  if ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0) {
    if ((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x10) === 0) {
      if (G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2] - G.DAT_00655af8 < 6) {
        return 0;
      }
      if ((u8(G.DAT_00655c22[param_2]) < 7) && (_rand() % 3 !== 0)) {
        return 0;
      }
    }
    G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2] = G.DAT_00655af8;
    G.DAT_0064ca82[param_2 * 0x594 + param_3 * 2] = G.DAT_00655af8;
  }
  uVar1 = FUN_00493c7d(param_1);
  FUN_0040ff60(0, uVar1);
  uVar1 = FUN_00493c7d(param_3);
  FUN_0040ff60(1, uVar1);
  uVar1 = FUN_00493c7d(param_2);
  FUN_0040ff60(2, uVar1);
  FUN_00410030("JOINWAR", 0, 0);
  FUN_00467825(param_1, param_2, 0x2000);
  return 1;
}



// ============================================================
// Function: FUN_0055d8d8 @ 0x0055D8D8
// Size: 7326 bytes
// check_diplomatic_contact
// ============================================================

export function FUN_0055d8d8(param_1, param_2, param_3, param_4) {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let bVar6;
  let bVar7;
  let local_2c;
  let local_28;
  let local_1c;
  let local_14;

  if (param_1 === 0) {
    return;
  }
  if (param_2 === 0) {
    return;
  }
  if (G.DAT_00655af8 === 0) {
    return;
  }
  if ((G.DAT_00627670 !== 0) && (iVar3 = FUN_004fbe84(param_1, param_2), iVar3 === 0)) {
    return;
  }
  if (((G.DAT_00655b02 === 0) || ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0)) ||
     ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) === 0)) {
    if ((((2 < G.DAT_00655b02) && ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
        (G.DAT_006d1da0 !== param_1)) &&
       ((((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
         ((G.DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 1) !== 0)) ||
        ((G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2] < 0 ||
         (0xf < G.DAT_00655af8 - G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2])))))) {
      FUN_0046b14d(0x99, G.DAT_006ad30c[G.DAT_006ad558[param_1 * 4] * 0x54],
                   param_1, param_2, param_3, param_4, 0, 0, 0, 0);
      return;
    }
    if ((((2 < G.DAT_00655b02) && ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
        (G.DAT_006d1da0 !== param_2)) &&
       ((((G.DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & 1) === 0 ||
         ((G.DAT_0064c6c2[param_2 * 0x594 + param_1 * 4] & 1) !== 0)) ||
        ((G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2] < 0 ||
         (0xf < G.DAT_00655af8 - G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2])))))) {
      FUN_0046b14d(0x99, G.DAT_006ad30c[G.DAT_006ad558[param_2 * 4] * 0x54],
                   param_2, param_1, param_3, param_4, 0, 0, 0, 0);
      return;
    }
    if ((((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 === param_1)) &&
       (((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
        ((((G.DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 1) !== 0 ||
          (G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2] < 0)) ||
         (0xf < G.DAT_00655af8 - G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2])))))) {
      if ((2 < G.DAT_00655b02) && (G.DAT_006d1da0 !== param_1)) {
        return;
      }
      FUN_00460129(param_1, param_2, param_3, param_4, 0);
    }
    if ((((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 === param_2)) &&
       (((G.DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & 1) === 0 ||
        ((((G.DAT_0064c6c2[param_2 * 0x594 + param_1 * 4] & 1) !== 0 ||
          (G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2] < 0)) ||
         (0xf < G.DAT_00655af8 - G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2])))))) {
      if ((2 < G.DAT_00655b02) && (G.DAT_006d1da0 !== param_2)) {
        return;
      }
      FUN_00460129(param_2, param_1, param_3, param_4, 0);
    }
  }
  else if (G.DAT_00655b02 < 3) {
    if ((((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 === param_1)) &&
       (((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
        ((((G.DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 1) !== 0 ||
          (G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2] < 0)) ||
         (0xf < G.DAT_00655af8 - G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2])))))) {
      FUN_00460129(param_1, param_2, param_3, param_4, 0);
    }
    if ((((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 === param_2)) &&
       ((((G.DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & 1) === 0 ||
         (((G.DAT_0064c6c2[param_2 * 0x594 + param_1 * 4] & 1) !== 0 ||
          (G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2] < 0)))) ||
        (0xf < G.DAT_00655af8 - G.DAT_0064ca82[param_2 * 0x594 + param_1 * 2])))) {
      FUN_00460129(param_2, param_1, param_3, param_4, 0);
    }
  }
  else if ((((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0) &&
           ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0)) &&
          (((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
           ((G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2] < 0 ||
            (0xf < G.DAT_00655af8 - G.DAT_0064ca82[param_1 * 0x594 + param_2 * 2])))))) {
    G.DAT_0063f278 = -1;
    G.DAT_00626a2c = 1;
    FUN_00511880(0x3d, G.DAT_006ad30c[G.DAT_006ad558[param_2 * 4] * 0x54], 0, 0, param_1, 0);
    uVar4 = FUN_00493b10(param_2);
    FUN_0040ff60(1, uVar4);
    uVar4 = FUN_00493c7d(param_2);
    FUN_0040ff60(2, uVar4);
    G.DAT_00635a3c = 0; // &LAB_0040326a — code pointer, no-op
    G.DAT_0063e4e8 = FUN_00421bb0();
    iVar3 = FUN_00426fb0("PARLEYWAITING", 0x2000001, 0, 0);
    if (G.DAT_006ad698 === 0) {
      if (G.DAT_006c91e4 === 0) {
        if (iVar3 === -1) {
          FUN_0046b14d(0x81, G.DAT_006ad30c[G.DAT_006ad558[param_2 * 4] * 0x54], 0, 0, 0, 0, 0, 0, 0, 0);
          G.DAT_0067a8c0 = -1;
          G.DAT_00626a2c = 0;
        }
        else if (G.DAT_0063f278 < 1) {
          G.DAT_00635a3c = 0; // &LAB_00403c74
          FUN_00410030("PARLEYGOAWAY", 0, 0);
          G.DAT_00626a2c = 0;
        }
        else if (G.DAT_0063f278 === 1) {
          G.DAT_0063f278 = -1;
          G.DAT_0067a8c0 = param_2;
          G.DAT_00635a3c = 0; // &LAB_0040326a
          G.DAT_0063e4e8 = FUN_00421bb0();
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          FUN_00410030("PARLEYOK", 0, 0);
          if (G.DAT_006ad698 === 0) {
            if (G.DAT_006c91e4 === 0) {
              FUN_004b7eb6(param_2, 3);
            }
            else {
              G.DAT_0067a8c0 = -1;
              G.DAT_006c91e4 = 0;
              uVar4 = FUN_00493c7d(param_2);
              FUN_0040ff60(0, uVar4);
              G.DAT_00635a3c = 0; // &LAB_00403c74
              FUN_00410030("PARLEYCANCEL", 0, 0);
              G.DAT_00626a2c = 0;
            }
          }
          else {
            G.DAT_0067a8c0 = -1;
            G.DAT_00635a3c = 0; // &LAB_00403c74
            FUN_00410030("PARLEYBUSY", 0, 0);
            G.DAT_00626a2c = 0;
          }
        }
        else {
          G.DAT_00635a3c = 0; // &LAB_00403c74
          FUN_00410030("PARLEYBUSY", 0, 0);
          G.DAT_00626a2c = 0;
        }
      }
      else {
        G.DAT_006c91e4 = 0;
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(0, uVar4);
        G.DAT_00635a3c = 0; // &LAB_00403c74
        FUN_00410030("PARLEYCANCEL", 0, 0);
        G.DAT_0067a8c0 = -1;
        G.DAT_00626a2c = 0;
      }
    }
    else {
      G.DAT_00635a3c = 0; // &LAB_00403c74
      FUN_00410030("PARLEYBUSY", 0, 0);
      G.DAT_00626a2c = 0;
    }
  }
  if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0) {
    FUN_00467825(param_1, param_2, 0x4000);
  }
  bVar6 = (G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0;
  FUN_00467825(param_1, param_2, 0x401);
  if (((((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) &&
       ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) === 0)) &&
      (((G.DAT_00655af8 + param_2 + param_1 & 3) === 0 || (bVar6)))) &&
     ((((G.DAT_00655af0 & 0x80) === 0 || ((G.DAT_0064bc60 & 0x8000) === 0)) ||
      ((((param_1 !== 3 || (param_2 !== 1)) && ((param_1 !== 1 || (param_2 !== 3)))) ||
       (4 < G.DAT_00655af8)))))) {
    iVar3 = FUN_0055cbd5(param_1, param_2);
    if (((((iVar3 === 0) || (iVar3 = FUN_00453e51(param_2, 6), iVar3 !== 0)) ||
         (iVar3 = FUN_00453e51(param_2, 0x18), iVar3 !== 0)) ||
        ((4 < u8(G.DAT_0064c6b5[param_1 * 0x594]) &&
         ((G.DAT_0064c6c1[param_1 * 0x594 + param_2 * 4] & 8) === 0)))) &&
       (((iVar3 = FUN_0055cbd5(param_2, param_1), iVar3 === 0 ||
         ((iVar3 = FUN_00453e51(param_1, 6), iVar3 !== 0 ||
          (iVar3 = FUN_00453e51(param_1, 0x18), iVar3 !== 0)))) ||
        ((4 < u8(G.DAT_0064c6b5[param_2 * 0x594]) &&
         ((G.DAT_0064c6c1[param_2 * 0x594 + param_1 * 4] & 8) === 0)))))) {
      FUN_0055d1e2(param_1, param_2);
      if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 4) === 0) {
        if ((G.DAT_00654fa8 === 0) && ((G.DAT_0064c6c1[param_1 * 0x594 + param_2 * 4] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(1, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(2, uVar4);
          iVar3 = FUN_00453e51(param_2, 0x18);
          if (iVar3 === 0) {
            iVar3 = FUN_00453e51(param_2, 6);
            if (iVar3 !== 0) {
              FUN_00410030("WALLFORCE", 0, 0);
            }
          }
          else {
            FUN_00410030("UNFORCE", 0, 0);
          }
        }
        if ((G.DAT_00654fa8 === 0) && ((G.DAT_0064c6c1[param_2 * 0x594 + param_1 * 4] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(2, uVar4);
          iVar3 = FUN_00453e51(param_1, 0x18);
          if (iVar3 === 0) {
            iVar3 = FUN_00453e51(param_1, 6);
            if (iVar3 !== 0) {
              FUN_00410030("WALLFORCE", 0, 0);
            }
          }
          else {
            FUN_00410030("UNFORCE", 0, 0);
          }
        }
        if ((G.DAT_00654fa8 === 0) && ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          FUN_00410030("ALLYMAKESPEACE", 0, 0);
        }
        else if ((G.DAT_00654fa8 === 0) &&
                ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(1, uVar4);
          FUN_00410030("ALLYMAKESPEACE", 0, 0);
        }
        else if ((G.DAT_00654fa8 === 0) &&
                (((((((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0) ||
                   (iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                  (iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0)) ||
                 (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                  (iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0)))) ||
                ((iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0) ||
                 (G.DAT_00655b07 !== 0))))) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          FUN_00410030("SIGNPEACE", 0, 0);
        }
        FUN_00467825(param_1, param_2, 4);
      }
      else {
        bVar7 = (G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) !== 0;
        bVar1 = false;
        bVar6 = bVar7;
        if ((G.DAT_00655c22[param_1] === 7) && (3 < u8(G.DAT_00655c22[param_2]))) {
          bVar6 = false;
          bVar1 = true;
        }
        if ((G.DAT_00655c22[param_2] === 7) && (3 < u8(G.DAT_00655c22[param_1]))) {
          bVar6 = false;
          bVar1 = true;
        }
        local_14 = 0;
        local_2c = -1;
        bVar2 = false;
        for (local_28 = 1; local_28 < 8; local_28 = local_28 + 1) {
          if ((local_28 !== param_1) && (local_28 !== param_2)) {
            if (((G.DAT_0064c6c0[param_1 * 0x594 + local_28 * 4] & 8) === 0) &&
               ((G.DAT_0064c6c0[param_2 * 0x594 + local_28 * 4] & 8) === 0)) {
              if (((((1 << (u8(local_28) & 0x1f) & G.DAT_00655b0b) === 0) ||
                   (G.DAT_00655c22[local_28] !== 7)) || (G.DAT_00655b08 === 0)) ||
                 ((G.DAT_0064c708[local_28 * 0x594] < 5 || (G.DAT_00655af8 < 0xc9)))) {
                bVar2 = false;
              }
              else {
                bVar2 = true;
              }
              if (bVar2) {
                local_2c = local_28;
                break;
              }
              if (G.DAT_00655b08 !== 0) {
                if (bVar6) {
                  if (((G.DAT_0064c6c0[param_1 * 0x594 + local_28 * 4] & 4) === 0) &&
                     ((G.DAT_0064c6c0[param_2 * 0x594 + local_28 * 4] & 4) === 0)) {
                    local_2c = local_28;
                    break;
                  }
                }
                else if (((!bVar1) && (iVar3 = FUN_00467af0(param_1, local_28), iVar3 !== 0)) &&
                        (((u8(G.DAT_00655c22[param_1]) <= u8(G.DAT_00655c22[local_28])) &&
                         ((iVar3 = FUN_00467af0(param_2, local_28), iVar3 !== 0 &&
                          (u8(G.DAT_00655c22[param_2]) <= u8(G.DAT_00655c22[local_28]))))))) {
                  local_2c = local_28;
                  break;
                }
              }
            }
            else {
              local_14 = local_14 + 1;
            }
          }
        }
        if ((((G.DAT_00655af0 & 0x80) !== 0) && ((G.DAT_0064bc60 & 0x8000) !== 0)) &&
           ((((param_1 === 6 && (param_2 === 7)) || ((param_1 === 7 && (param_2 === 6)))) &&
            (1 < G.DAT_00655af8)))) {
          local_2c = 0;
        }
        if ((local_2c < 1) ||
           ((((!bVar2 || (u8(G.DAT_0064c6be[G.DAT_00655b03 * 0x594]) < local_14)) &&
             (local_14 !== 0)) && (!bVar6)))) {
          if (((bVar7) && (G.DAT_00654fa8 === 0)) &&
             (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0 ||
              (((iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0 ||
                (iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0)) ||
               (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                (((iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0 ||
                  (iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0)) ||
                 (G.DAT_00655b07 !== 0)))))))))) {
            uVar4 = FUN_00493c7d(param_1);
            FUN_0040ff60(0, uVar4);
            uVar4 = FUN_00493c7d(param_2);
            FUN_0040ff60(1, uVar4);
            FUN_00410030("CANCELALLIED", 0, 0);
          }
          FUN_00467750(param_1, param_2, 8);
        }
        else {
          if (!bVar7) {
            local_1c = 0;
            if (((((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0) ||
                 (iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                ((iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0 ||
                 (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                  (iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0)))))) ||
               (((iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0 || (G.DAT_00655b07 !== 0)) ||
                (((1 << (u8(local_2c) & 0x1f) & G.DAT_00655b0b) !== 0 &&
                  (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 1) !== 0 ||
                   ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 1) !== 0)))))))) {
              uVar4 = FUN_00493c7d(param_1);
              FUN_0040ff60(0, uVar4);
              uVar4 = FUN_00493c7d(param_2);
              FUN_0040ff60(1, uVar4);
              if ((G.DAT_00654fa8 === 0) && (bVar2)) {
                iVar3 = FUN_0043d07a(param_3, param_4, param_1, 0xffffffff, param_2);
                if (-1 < iVar3) {
                  FUN_0040ff60(2, G.DAT_0064f360 + iVar3 * 0x58);
                }
                uVar4 = FUN_00410070(local_2c);
                FUN_0040ff60(3, uVar4);
                FUN_00410030("SIGNNATO", 0, 0);
              }
              else if (G.DAT_00654fa8 === 0) {
                uVar4 = FUN_00493c7d(local_2c);
                FUN_0040ff60(2, uVar4);
                FUN_00410030("SIGNALLIED", 0, 0);
              }
              local_1c = FUN_0055d685(param_1, local_2c, param_2);
              uVar5 = FUN_0055d685(param_2, local_2c, param_1);
              local_1c = local_1c | uVar5;
            }
            if ((((1 << (u8(local_2c) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                (iVar3 = FUN_004a7577(local_2c), iVar3 === 0)) && (local_1c === 0)) {
              if ((G.DAT_0064c6c1[param_1 * 0x594 + local_2c * 4] & 0x20) === 0) {
                FUN_00467825(param_1, local_2c, 0x10000);
              }
              if ((G.DAT_0064c6c1[param_1 * 0x594 + local_2c * 4] & 0x20) === 0) {
                FUN_00467825(param_2, local_2c, 0x10000);
              }
            }
          }
          FUN_00467825(param_1, param_2, 8);
        }
      }
    }
    else if (((G.DAT_0064c6c1[param_1 * 0x594 + param_2 * 4] & 0x20) === 0) || (bVar6)) {
      if ((G.DAT_00654fa8 === 0) && ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 8) !== 0)) {
        iVar3 = FUN_0055cbd5(param_1, param_2);
        if (iVar3 === 0) {
          FUN_0045b0d6(param_1, param_2);
        }
        uVar4 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar4);
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(1, uVar4);
        FUN_00410030("ALLYMAKESWAR", 0, 0);
      }
      else if ((G.DAT_00654fa8 === 0) &&
              ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 8) !== 0)) {
        iVar3 = FUN_0055cbd5(param_2, param_1);
        if (iVar3 === 0) {
          FUN_0045b0d6(param_2, param_1);
        }
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(0, uVar4);
        uVar4 = FUN_00493c7d(param_1);
        FUN_0040ff60(1, uVar4);
        FUN_00410030("ALLYMAKESWAR", 0, 0);
      }
      else if ((G.DAT_00654fa8 === 0) &&
              (((((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0 ||
                 (iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                (iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0)) ||
               (((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                 (iVar3 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                ((iVar3 = FUN_00453e51(G.DAT_006d1da0, 9), iVar3 !== 0) || (G.DAT_00655b07 !== 0))))))
      {
        uVar4 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar4);
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(1, uVar4);
        if (((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 4) === 0) ||
           ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) !== 0)) {
          FUN_00410030("DECLAREWAR", 0, 0);
        }
        else {
          FUN_00410030("CANCELPEACE", 0, 0);
        }
      }
      FUN_00467750(param_1, param_2, 4);
      FUN_00467825(param_1, param_2, 0x2000);
      if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 0x10) !== 0) {
        FUN_00467750(param_1, param_2, 0x10);
        G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] =
             G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] | 0x800;
      }
    }
  }
  return;
}



// ============================================================
// Function: FUN_0055f5a3 @ 0x0055F5A3
// Size: 558 bytes
// ai_choose_government
// ============================================================

export function FUN_0055f5a3(param_1, param_2) {
  let bVar1;
  let sVar2;
  let iVar3;
  let local_18;
  let local_14;
  let local_8;

  if (((G.DAT_00655af0 & 0x80) !== 0) && ((G.DAT_0064bc60 & 0x10) !== 0) &&
     (G.DAT_0064c6b5[param_1 * 0x594] !== 0)) {
    return;
  }
  local_8 = 6;
  if (param_2 !== 0) {
    local_8 = 5;
    iVar3 = _rand();
    if (iVar3 % 3 !== 0) {
      local_8 = 4;
    }
  }
  if (((G.DAT_00655af0 & 1) !== 0) &&
     (bVar1 = G.DAT_0064c6b0[G.DAT_00655b03 * 0x594], u8(G.DAT_00655c22[param_1]) < 6)) {
    if (6 < (bVar1 - u8(G.DAT_0064c6b0[param_1 * 0x594]))) {
      G.DAT_0064ca80[param_1 * 0x594] = 0xfffe;
    }
    if (8 < (bVar1 - u8(G.DAT_0064c6b0[param_1 * 0x594]))) {
      G.DAT_0064ca7e[param_1 * 0x594] = 0xffff;
    }
  }
  if ((0 < G.DAT_0064ca74[param_1 * 0x594]) &&
     (local_8 = 3, u8(G.DAT_0064c6b5[param_1 * 0x594]) < 6)) {
    local_8 = 1;
  }
  sVar2 = -999;
  local_18 = 1;
  for (local_14 = 1; local_14 <= local_8; local_14 = local_14 + 1) {
    iVar3 = FUN_0055c277(param_1, local_14);
    if ((iVar3 !== 0) && (sVar2 <= G.DAT_0064ca74[local_14 * 2 + param_1 * 0x594])) {
      sVar2 = G.DAT_0064ca74[local_14 * 2 + param_1 * 0x594];
      local_18 = local_14;
    }
  }
  FUN_0055c69d(param_1, local_18);
  return;
}



// ============================================================
// Function: FUN_0055f7d1 @ 0x0055F7D1
// Size: 2222 bytes
// ai_military_aid_transfer
// ============================================================

export function FUN_0055f7d1(param_1) {
  let cVar1;
  let cVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_14;
  let local_10;
  let local_c;

  local_14 = 0;
  for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
    if ((local_10 !== param_1) && ((G.DAT_0064c6c1[local_10 * 4 + param_1 * 0x594] & 0x20) !== 0)) {
      local_14 = local_14 + 1;
    }
  }
  local_10 = 1;
  do {
    if (7 < local_10) {
      return;
    }
    if (((local_10 !== param_1) && ((G.DAT_0064c6c0[local_10 * 4 + param_1 * 0x594] & 8) !== 0)) &&
       ((G.DAT_0064c70e[local_10 * 0x594] <= G.DAT_0064c70e[param_1 * 0x594] || (local_14 === 0)))) {
      for (local_2c = 1; local_2c < 8; local_2c = local_2c + 1) {
        if (((((local_2c !== param_1) && (local_2c !== local_10)) &&
             ((G.DAT_0064c6c1[local_2c * 4 + local_10 * 0x594] & 0x20) !== 0)) &&
            (((G.DAT_0064c6c1[local_2c * 4 + local_10 * 0x594] & 2) !== 0 &&
             (G.DAT_0064c70e[local_10 * 0x594] <= G.DAT_0064c70e[local_2c * 0x594])))) &&
           (u8(G.DAT_00655c22[local_10]) <= u8(G.DAT_00655c22[local_2c]))) {
          local_34 = -1;
          local_c = 0;
          for (local_30 = 0; local_30 < G.DAT_00655b16; local_30 = local_30 + 1) {
            if (((G.DAT_0065610a[local_30 * 0x20] !== 0) &&
                (s8(G.DAT_006560f7[local_30 * 0x20]) === param_1)) &&
               ((s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_30 * 0x20]) * 0x14]) < 2 &&
                (G.DAT_0064b1c1[u8(G.DAT_006560f6[local_30 * 0x20]) * 0x14] === 0)))) {
              iVar3 = (G.DAT_006560f0[local_30 * 0x20] | (G.DAT_006560f0[local_30 * 0x20 + 1] << 8)) << 16 >> 16;
              iVar4 = (G.DAT_006560f2[local_30 * 0x20] | (G.DAT_006560f2[local_30 * 0x20 + 1] << 8)) << 16 >> 16;
              iVar5 = FUN_004087c0(iVar3, iVar4);
              if ((((iVar5 === 0) && (iVar5 = FUN_005b8ca6(iVar3, iVar4), -1 < iVar5)) &&
                  (iVar5 = FUN_005b50ad(local_30, 2), 1 < iVar5)) &&
                 ((iVar3 = FUN_005b8a81(iVar3, iVar4),
                  G.DAT_0064ca32[param_1 * 0x594 + iVar3] === 4 ||
                  ((G.DAT_0064ca32[param_1 * 0x594 + iVar3] === 5 && (local_14 === 0)))))) {
                cVar1 = s8(G.DAT_0064b1c4[u8(G.DAT_006560f6[local_30 * 0x20]) * 0x14]);
                cVar2 = s8(G.DAT_0064b1c5[u8(G.DAT_006560f6[local_30 * 0x20]) * 0x14]);
                iVar3 = FUN_005b29aa(local_30);
                iVar3 = (cVar2 + cVar1 * 2) * iVar3;
                if (local_c < iVar3) {
                  local_34 = local_30;
                  local_c = iVar3;
                }
              }
            }
          }
          if (-1 < local_34) {
            for (local_28 = 0; local_28 < G.DAT_00655b18; local_28 = local_28 + 1) {
              if ((G.DAT_0064f394[local_28 * 0x58] !== 0) &&
                 (s8(G.DAT_0064f348[local_28 * 0x58]) === local_10)) {
                iVar3 = (G.DAT_0064f340[local_28 * 0x58] | (G.DAT_0064f340[local_28 * 0x58 + 1] << 8)) << 16 >> 16;
                iVar4 = (G.DAT_0064f342[local_28 * 0x58] | (G.DAT_0064f342[local_28 * 0x58 + 1] << 8)) << 16 >> 16;
                iVar5 = FUN_005b8d62(iVar3, iVar4);
                if (((-1 < iVar5) &&
                    ((((G.DAT_0064f344[local_28 * 0x58] & 0x80) !== 0 &&
                      (iVar5 = FUN_005b8a81(iVar3, iVar4),
                      G.DAT_0064ca32[local_10 * 0x594 + iVar5] === 1)) &&
                     (iVar5 = FUN_005b4c63(iVar3, iVar4, local_10), iVar5 === 0)))) &&
                   (iVar5 = FUN_0043cf76(
                     (G.DAT_006560f0[local_34 * 0x20] | (G.DAT_006560f0[local_34 * 0x20 + 1] << 8)) << 16 >> 16,
                     (G.DAT_006560f2[local_34 * 0x20] | (G.DAT_006560f2[local_34 * 0x20 + 1] << 8)) << 16 >> 16),
                   -1 < iVar5)) {
                  FUN_005b319e(local_34, 1);
                  G.DAT_0064c778[param_1 * 0x594 + u8(G.DAT_006560f6[local_34 * 0x20])] =
                       G.DAT_0064c778[param_1 * 0x594 + u8(G.DAT_006560f6[local_34 * 0x20])] + -1;
                  G.DAT_006560f7[local_34 * 0x20] = u8(local_10);
                  G.DAT_00656100[local_34 * 0x20] = u8(local_28);
                  G.DAT_006560f9[local_34 * 0x20] = 0;
                  G.DAT_0064c778[local_10 * 0x594 + u8(G.DAT_006560f6[local_34 * 0x20])] =
                       G.DAT_0064c778[local_10 * 0x594 + u8(G.DAT_006560f6[local_34 * 0x20])] + 1;
                  FUN_005b345f(local_34, iVar3, iVar4, 1);
                  FUN_citywin_C679(local_28);
                  FUN_0047cea6(
                    (G.DAT_0064f340[local_28 * 0x58] | (G.DAT_0064f340[local_28 * 0x58 + 1] << 8)) << 16 >> 16,
                    (G.DAT_0064f342[local_28 * 0x58] | (G.DAT_0064f342[local_28 * 0x58 + 1] << 8)) << 16 >> 16);
                  FUN_citywin_C679(iVar5);
                  FUN_0047cea6(
                    (G.DAT_0064f340[iVar5 * 0x58] | (G.DAT_0064f340[iVar5 * 0x58 + 1] << 8)) << 16 >> 16,
                    (G.DAT_0064f342[iVar5 * 0x58] | (G.DAT_0064f342[iVar5 * 0x58 + 1] << 8)) << 16 >> 16);
                  if (((1 << (u8(local_2c) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                     (G.DAT_00654fa8 === 0)) {
                    uVar6 = FUN_00493c7d(param_1);
                    FUN_0040ff60(0, uVar6);
                    FUN_004271e8(1, G.DAT_0064b1b8[u8(G.DAT_006560f6[local_34 * 0x20]) * 0x14]);
                    uVar6 = FUN_00493c7d(local_10);
                    FUN_0040ff60(2, uVar6);
                    if (G.DAT_006d1da0 === local_2c) {
                      FUN_004442e0("MILITARYAID1", local_34);
                    }
                    else if (2 < G.DAT_00655b02) {
                      FUN_00511880(0x51, G.DAT_006ad30c[G.DAT_006ad558[local_2c * 4] * 0x54], 3, 0, local_34, 0);
                    }
                  }
                  if (((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                     (G.DAT_00654fa8 === 0)) {
                    uVar6 = FUN_00493c7d(param_1);
                    FUN_0040ff60(0, uVar6);
                    FUN_004271e8(1, G.DAT_0064b1b8[u8(G.DAT_006560f6[local_34 * 0x20]) * 0x14]);
                    FUN_0040ff60(2, G.DAT_0064f360 + local_28 * 0x58);
                    uVar6 = FUN_00493c7d(local_2c);
                    FUN_0040ff60(3, uVar6);
                    if (G.DAT_006d1da0 === local_10) {
                      FUN_004442e0("MILITARYAID2", local_34);
                    }
                    else if (2 < G.DAT_00655b02) {
                      FUN_00511880(0x52, G.DAT_006ad30c[G.DAT_006ad558[local_10 * 4] * 0x54], 4, 0, local_34, 0);
                    }
                  }
                  if (G.DAT_00655b02 < 3) {
                    return;
                  }
                  FUN_004b0b53(0xff, 2, 0, 0, 0);
                  XD_FlushSendBuffer(5000);
                  return;
                }
              }
            }
          }
        }
      }
    }
    local_10 = local_10 + 1;
  } while (true);
}


// ═══════════════════════════════════════════════════════════════════
// STUBS — External functions called but not defined in this block
// ═══════════════════════════════════════════════════════════════════

function GetSystemMetrics() { return 0; }
function strcmp() { return 0; }
// FUN_0055ae80 — defined above as exported function
// FUN_0055b046 — defined above as exported function
function FUN_citywin_9429() { /* stub */ }
function FUN_004bd9f0_wrapper() { return 0; }
function FUN_005f22d0_wrapper() { /* stub */ }
function FUN_0055c3d3_wrapper() { /* stub */ }
function _rand() { return Math.floor(Math.random() * 32768); }
function FUN_save_game() { /* stub */ }
function debug_log() { /* stub */ }
function FUN_citywin_994F() { /* stub */ }
function GetAsyncKeyState() { return 0; }
function XD_FlushSendBuffer() { /* stub */ }
function SetWindowsHookExA() { return 0; }
function UnhookWindowsHookEx() { /* stub */ }
function FUN_005b319e() { /* stub */ }
function FUN_citywin_C679() { /* stub */ }
function FUN_0055a930_wrapper() { /* stub */ }
function FUN_005534bc_wrapper() { /* stub */ }
function FUN_00552ed2_wrapper() { /* stub */ }
function FUN_00553d30_wrapper() { /* stub */ }
function FUN_00553d70_wrapper() { /* stub */ }
function FUN_00552112_wrapper() { /* stub */ }
function FUN_00559fcf_wrapper() { /* stub */ }
function FUN_0055a00b_wrapper() { /* stub */ }
function FUN_0055a051_wrapper() { /* stub */ }
function FUN_0055a10d_wrapper() { /* stub */ }
function FUN_00559cf6_wrapper() { /* stub */ }
function FUN_00559ded_wrapper() { /* stub */ }
function FUN_0040ff60_wrapper() { /* stub */ }
function FUN_00421da0_wrapper() { /* stub */ }
function FUN_thunk_delete_city() { /* stub */ }
function FUN_thunk_kill_civ() { /* stub */ }
function FUN_thunk_pick_up_unit_005b319e() { /* stub */ }
