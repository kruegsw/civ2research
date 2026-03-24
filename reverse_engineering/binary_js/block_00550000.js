// ═══════════════════════════════════════════════════════════════════
// block_00550000.js — Mechanical transpilation of block_00550000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00550000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00550000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8, s16, s32, u16, u32, w16, w32,
  DAT_006ab180, DAT_006ab198, DAT_006ab19c,
  DAT_00633580, DAT_00633584, DAT_00633588, DAT_0063358c,
  DAT_00633590, DAT_00633594, DAT_00633598, DAT_0063359c,
  DAT_006335a0, DAT_006335a4,
  DAT_0063357c,
  DAT_006359d4, DAT_006359dc,
  DAT_006ab190, DAT_006ab178, DAT_006ab1a0,
  DAT_006335c0, DAT_006335c4, DAT_006335c8, DAT_006335cc,
  DAT_006335d0, DAT_006335d4, DAT_006335d8, DAT_006335dc,
  DAT_006335a8, DAT_006335ac, DAT_006335b0, DAT_006335b4,
  DAT_006335b8, DAT_006335bc, DAT_006335e0,
  DAT_006335f8,
  DAT_00654fa8, DAT_00654faa, DAT_00655b05, DAT_00655b0b,
  DAT_00655b02, DAT_006ad684, DAT_006ad578,
  DAT_0064c6c0, DAT_006d1da0, DAT_006c31a9,
  DAT_006ad330, DAT_006ad558,
  DAT_00628064,
  DAT_00654b70,
  DAT_00633a78,
  DAT_0064bb08, DAT_00655020,
  DAT_00655aea, DAT_00655af0, DAT_00655af4,
  DAT_00673d38,
  DAT_00654c7e,
  DAT_0064b1b4, DAT_0064b1b0,
  DAT_00627cc4, DAT_00627cce,
  DAT_00633678, DAT_00631edc, DAT_00631ed8,
  DAT_00655b12,
  DAT_00628350, DAT_00628360,
  DAT_0064b1c0, DAT_0064b1cb,
  DAT_0063367c, DAT_00633680, DAT_00633684,
  DAT_00633688, DAT_0063368c, DAT_00633690,
  DAT_0064b1b8, DAT_0064b1ca, DAT_0064b1c1,
  DAT_00628420,
  DAT_00655b06, DAT_00655b07,
  DAT_0064b9bc,
  DAT_00655b0a, DAT_00655b03,
  DAT_00655af8, DAT_00655afa,
  DAT_00655b18,
  DAT_0064f394, DAT_0064f348, DAT_0064f340, DAT_0064f342,
  DAT_0064f344, DAT_0064f360, DAT_0064f34c, DAT_0064f34d,
  DAT_0064f349, DAT_0064f374, DAT_0064f379, DAT_0064f35c,
  DAT_006560f0, DAT_006560f4, DAT_006560f6, DAT_006560f7,
  DAT_006560f8, DAT_006560f9, DAT_006560fa, DAT_006560fd,
  DAT_006560ff, DAT_00656100,
  DAT_0065610a,
  DAT_0064c6a0, DAT_0064c6a2, DAT_0064c6a6, DAT_0064c6a8,
  DAT_0064c6aa, DAT_0064c6b0, DAT_0064c6b1, DAT_0064c6b4,
  DAT_0064c6b5, DAT_0064c6b6, DAT_0064c6be, DAT_0064c6bf,
  DAT_0064c6e0, DAT_0064c6f8,
  DAT_0064c708, DAT_0064c70e,
  DAT_0064c778, DAT_0064c7a5,
  DAT_0064c832, DAT_0064c8b2, DAT_0064c932,
  DAT_0064ca32, DAT_0064ca74, DAT_0064ca80, DAT_0064ca7e,
  DAT_0064ca82, DAT_0064ca92, DAT_0064cab4, DAT_0064cab6,
  DAT_0064cab8, DAT_0064cab9,
  DAT_00627689, DAT_00627684, DAT_0062768e, DAT_0062768f,
  DAT_00655b82,
  DAT_0062804c,
  DAT_00655be6,
  DAT_0064bc60, DAT_0064bc62, DAT_0064bcba, DAT_0064bcb2,
  DAT_0064bcb4, DAT_0064bcb6, DAT_0064bcb8, DAT_0064bcbc,
  DAT_0064bcbe, DAT_0064bcc0, DAT_0064bcc2,
  DAT_006554f8, DAT_006554fc,
  DAT_00655502, DAT_00655504, DAT_00655506, DAT_0065550c,
  DAT_00654fe0,
  DAT_0064bcfa, DAT_0064bd12, DAT_0064bd2a,
  DAT_0063cc48, DAT_0063cd4c, DAT_0063ce50,
  DAT_00636598, DAT_006d1164,
  DAT_006365e0, DAT_006365e4,
  DAT_0062d040, DAT_006d116a, DAT_006d116c,
  DAT_006283d0, DAT_006283e0,
  DAT_006e4ff0,
  DAT_006ab5ac, DAT_006ab5b4,
  DAT_00633a74, DAT_00633a7c, DAT_00633a80, DAT_00633a84,
  DAT_00633a88, DAT_00633a8c, DAT_00633a90,
  DAT_006ad2f7, DAT_006ad308, DAT_006ad685, DAT_006ad698,
  DAT_006ad678,
  DAT_0066c988, DAT_0066c990,
  DAT_0066ca54, DAT_0066ca58, DAT_0066ca5c, DAT_0066ca68,
  DAT_0066ca90, DAT_0066ca94, DAT_0066caa0, DAT_0066caa4,
  DAT_0066c7a8, DAT_006aa864,
  DAT_006ab4b8, DAT_006ab498,
  DAT_0064b168, DAT_0064b9a0,
  DAT_00628054,
  DAT_00654c76,
  DAT_00655aee,
  DAT_00655b08, DAT_00655b91,
  DAT_00655c22, DAT_00655c31,
  DAT_00628370, DAT_006283a0,
  DAT_006ab5e0, DAT_006ab5e4, DAT_006ab5e8, DAT_006ab5ec,
  DAT_00633ac8,
  DAT_00627670,
  DAT_0063f278, DAT_00626a2c,
  DAT_006c91e4, DAT_0067a8c0,
  DAT_00635a3c, DAT_0063e4e8,
  DAT_006ad30c, DAT_0064c6c1, DAT_0064c6c2,
  DAT_00655b16, DAT_0064b1c4, DAT_0064b1c5,
  DAT_00627879, DAT_006560f2,
} from './mem.js';

import {
  FUN_005b89e4,
} from './fn_utils.js';


// ============================================================
// Function: FUN_00550017 @ 0x00550017
// Size: 12 bytes
// thunk_destructor_wrapper
// ============================================================

export function FUN_00550017() {
  FUN_004183d0();
  return;
}



// ============================================================
// Function: FUN_0055002d @ 0x0055002D
// Size: 14 bytes
// seh_epilog_restore_fs
// ============================================================
// Source: decompiled/block_00550000.c FUN_0055002d (14 bytes)

export function FUN_0055002d() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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

// Source: decompiled/block_00550000.c egptr (28 bytes)
export function egptr(thisObj) {
  // DEVIATION: MFC — streambuf::egptr() returns *(this + 0x2c)
  return 0;
}



// ============================================================
// Function: FUN_00551d50 @ 0x00551D50
// Size: 37 bytes
// send_msg_3DBF_wrapper
// ============================================================

// Source: decompiled/block_00550000.c FUN_00551d50 (37 bytes)
export function FUN_00551d50() {
  // DEVIATION: Win32 — send_msg_3DBF(*(in_ECX + 0x1c)); network message send
  return;
}



// ============================================================
// Function: FUN_00551d80 @ 0x00551D80
// Size: 43 bytes
// send_msg_3E92_wrapper
// ============================================================

// Source: decompiled/block_00550000.c FUN_00551d80 (43 bytes)
export function FUN_00551d80(param_1) {
  // DEVIATION: Win32 — send_msg_3E92(*(in_ECX + 0x1c), param_1); network message send
  return;
}



// ============================================================
// Function: FUN_00551dc0 @ 0x00551DC0
// Size: 33 bytes
// set_ecx_offset_0x30
// ============================================================

// Source: decompiled/block_00550000.c FUN_00551dc0 (33 bytes)
export function FUN_00551dc0(param_1) {
  // DEVIATION: MFC — *(in_ECX + 0x30) = param_1; UI object member setter
  return;
}



// ============================================================
// Function: FUN_00551df0 @ 0x00551DF0
// Size: 33 bytes
// set_ecx_offset_0x34
// ============================================================

// Source: decompiled/block_00550000.c FUN_00551df0 (33 bytes)
export function FUN_00551df0(param_1) {
  // DEVIATION: MFC — *(in_ECX + 0x34) = param_1; UI object member setter
  return;
}



// ============================================================
// Function: FUN_00551e20 @ 0x00551E20
// Size: 41 bytes
// call_419130_with_6359d4
// ============================================================

export function FUN_00551e20(param_1, param_2, param_3) {
  FUN_00419130(DAT_006359d4, param_1, param_2, param_3);
  return;
}



// ============================================================
// Function: FUN_00551e60 @ 0x00551E60
// Size: 41 bytes
// call_419130_with_DEBUG
// ============================================================

export function FUN_00551e60(param_1, param_2, param_3) {
  FUN_00419130(DAT_006359dc, param_1, param_2, param_3);
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

// Source: decompiled/block_00550000.c FUN_00551ed8 (29 bytes)
export function FUN_00551ed8() {
  // DEVIATION: Win32 — _atexit(FUN_00551ef5); C runtime shutdown hook
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

// Source: decompiled/block_00550000.c FUN_00551f47 (29 bytes)
export function FUN_00551f47() {
  // DEVIATION: Win32 — _atexit(FUN_00551f64); C runtime shutdown hook
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

// Source: decompiled/block_00550000.c FUN_00551fb6 (29 bytes)
export function FUN_00551fb6() {
  // DEVIATION: Win32 — _atexit(FUN_00551fd3); C runtime shutdown hook
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

  FUN_005bcaa7(DAT_006ab180);
  DAT_006ab198 = FUN_00407f90(DAT_006ab180);
  DAT_006ab19c = FUN_00407fc0(DAT_006ab180);
  DAT_00633580 = 0x10;
  if (999 < DAT_006ab198) {
    DAT_00633580 = 0x18;
  }
  DAT_00633584 = (999 < DAT_006ab198) ? 1 : 0;
  FUN_00417ef0(0, DAT_00633580);
  FUN_00417ef0(0, (DAT_00633580 * 2) / 3);
  FUN_00417ef0(0, DAT_00633580);
  iVar1 = FUN_0040ef70();
  DAT_00633598 = iVar1 + DAT_0063358c * 2 + DAT_00633588 * 2;
  DAT_0063359c = DAT_00633588 * 2 + DAT_0063358c * 2;
  iVar1 = GetSystemMetrics(7);
  DAT_006335a0 = iVar1 * 2;
  iVar1 = GetSystemMetrics(8);
  DAT_006335a4 = iVar1 * 2;
  return;
}



// ============================================================
// Function: FUN_005520fa @ 0x005520FA
// Size: 24 bytes
// set_dialog_font
// ============================================================

export function FUN_005520fa(param_1) {
  DAT_0063357c = param_1;
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
  local_120 = DAT_00633590;
  local_140 = DAT_00633594;
  local_144 = DAT_00633588;

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

// Source: decompiled/block_00550000.c FUN_00552ed2 (675 bytes)
export function FUN_00552ed2() {
  // DEVIATION: MFC — CRichEditCntrItem dialog setup: creates button windows,
  // positions controls relative to in_ECX object members, calls operator_new,
  // FUN_00451930, FUN_004519b0, FUN_00451a60 for each button. All UI layout.
  return;
}



// ============================================================
// Function: FUN_0055318c @ 0x0055318C
// Size: 192 bytes
// dialog_add_button
// ============================================================

// Source: decompiled/block_00550000.c FUN_0055318c (192 bytes)
export function FUN_0055318c(param_1, param_2) {
  // DEVIATION: MFC — Adds a button to dialog if count < 6. Stores callback (param_1),
  // text (param_2) in in_ECX object fields at offsets 0x200+. All UI layout.
  return;
}



// ============================================================
// Function: FUN_0055324c @ 0x0055324C
// Size: 139 bytes
// dialog_set_title
// ============================================================

// Source: decompiled/block_00550000.c FUN_0055324c (139 bytes)
export function FUN_0055324c(param_1) {
  // DEVIATION: MFC — memset(in_ECX+0x134, 0, 0x84), strncpy(in_ECX+0x134, param_1, 0x83),
  // then calls FUN_00552112 to redraw title bar. All UI layout.
  return;
}



// ============================================================
// Function: FUN_005532d7 @ 0x005532D7
// Size: 162 bytes
// dialog_destroy_buttons
// ============================================================

// Source: decompiled/block_00550000.c FUN_005532d7 (162 bytes)
export function FUN_005532d7() {
  // DEVIATION: MFC — Loops 0..5, destroys button windows at in_ECX+0x218+i*0x1c
  // via FUN_00453aa0(1), then zeros the pointer. All UI cleanup.
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

// Source: decompiled/block_00550000.c FUN_0055339f (146 bytes)
export function FUN_0055339f() {
  // DEVIATION: MFC — COleCntrFrameWnd constructor: calls FUN_0044c5a0(),
  // sets vtable pointer, zeros 6 button slots at in_ECX[i*7+0x86]. All UI init.
  return;
}



// ============================================================
// Function: COleCntrFrameWnd_destructor @ 0x00553444
// Size: 87 bytes
// ~COleCntrFrameWnd
// ============================================================

// Source: decompiled/block_00550000.c ~COleCntrFrameWnd (87 bytes)
export function COleCntrFrameWnd_destructor() {
  // DEVIATION: MFC — ~COleCntrFrameWnd destructor: sets vtable to PTR_FUN_0061d6dc,
  // calls FUN_005532d7 (destroy buttons), FUN_004083b0 (base cleanup),
  // FUN_0055349b (FUN_0044cba0), then SEH epilog FUN_005534ae. All UI teardown.
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

// Source: decompiled/block_00550000.c FUN_005534ae (14 bytes)
export function FUN_005534ae() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}



// ============================================================
// Function: FUN_005534bc @ 0x005534BC
// Size: 588 bytes
// create_dialog_window
// ============================================================

// Source: decompiled/block_00550000.c FUN_005534bc (588 bytes)
export function FUN_005534bc(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // DEVIATION: MFC — Creates and positions a dialog window. Sets title from param_1
  // or DAT_006335e0, stores display params in in_ECX members (0x114..0x2d4),
  // computes window flags, calls FUN_005bb4ae to create window, FUN_00497d00/FUN_004cff70
  // for sizing, then FUN_00552ed2 (button setup), FUN_00553d30/FUN_00553d70 (callbacks).
  // All UI/window creation — no game state globals written.
  return;
}



// ============================================================
// Function: FUN_00553d30 @ 0x00553D30
// Size: 45 bytes
// set_dialog_proc_at_0x60
// ============================================================

// Source: decompiled/block_00550000.c FUN_00553d30 (45 bytes)
export function FUN_00553d30(param_1) {
  // DEVIATION: MFC — Swaps function pointer: old = *(in_ECX + 0x60); *(in_ECX + 0x60) = param_1; return old;
  return 0;
}



// ============================================================
// Function: FUN_00553d70 @ 0x00553D70
// Size: 45 bytes
// set_dialog_proc_at_0x64
// ============================================================

// Source: decompiled/block_00550000.c FUN_00553d70 (45 bytes)
export function FUN_00553d70(param_1) {
  // DEVIATION: MFC — Swaps function pointer: old = *(in_ECX + 100); *(in_ECX + 100) = param_1; return old;
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
  // Uses DAT_006335f8 as valid character lookup table
  let str = param_1.toUpperCase();
  let i = 0;
  while (i < str.length && DAT_006335f8[str.charCodeAt(i)] !== 0) {
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

  if (((DAT_00655aea & 0x8000) === 0) && ((DAT_00655af0 & 0x10) === 0)) {
    iVar1 = FUN_00410030("REALLYCHEAT", 0, 0);
    if (iVar1 === 0) {
      return;
    }
    DAT_00655af0 = DAT_00655af0 | 0x10;
    DAT_00655aea = DAT_00655aea | 0x8000;
    iVar1 = FUN_00553dfd();
    if (iVar1 !== 0) {
      FUN_004190d0("", "WARNING");
      DAT_00655af0 = DAT_00655af0 | 0x80;
    }
  } else if (((DAT_00655aea & 0x8000) === 0) ||
            (((DAT_00655af0 & 0x80) === 0 || (iVar1 = strcmp(DAT_0064bb08, DAT_00655020), iVar1 === 0)
             ))) {
    iVar1 = strcmp(DAT_0064bb08, DAT_00655020);
    if (iVar1 === 0) {
      FUN_004190d0("", "WARNING");
    }
    iVar1 = FUN_00553dfd();
    if (iVar1 === 0) {
      return;
    }
    DAT_00655aea = DAT_00655aea | 0x8000;
    DAT_00655af0 = DAT_00655af0 | 0x80;
  } else {
    DAT_00655af0 = DAT_00655af0 & 0xff7f;
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

// Source: decompiled/block_00550000.c FUN_00554288 (15 bytes)
export function FUN_00554288() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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
    if (DAT_00673d38[local_c] !== 0) {
      local_8 = local_8 + 1;
    }
  }
  if (local_8 === 0) {
    if (((DAT_00655aea & 0x8000) === 0) && ((DAT_00655af0 & 0x10) === 0)) {
      iVar3 = FUN_00410030("REALLYCHEAT", 0, 0);
      if (iVar3 === 0) {
        return;
      }
      uVar2 = DAT_00655af0 | 0x10;
      uVar1 = DAT_00655af0 & 0x80;
      DAT_00655af0 = uVar2;
      if (uVar1 !== 0) {
        FUN_004190d0("", "WARNING");
      }
    }
    DAT_00655aea = DAT_00655aea ^ 0x8000;
    if ((DAT_00655b02 === 0) || ((DAT_00655aea & 0x8000) === 0)) {
      if (DAT_00655b02 !== 0) {
        FUN_0055ae80(1);
        DAT_00654b70 = DAT_00654c7e;
        FUN_0055b046(1);
      }
    } else {
      FUN_0055ae80(1);
      DAT_00654c7e = DAT_00654b70;
      DAT_00654b70 = 0;
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

  if (DAT_0064c6b1[param_1 * 0x594] === 0) {
    for (local_c = 0; local_c < 100; local_c = local_c + 1) {
      FUN_004bf05b(param_1, local_c, 0, 0, 0);
    }
    DAT_0064c6b1[param_1 * 0x594] = 1;
    FUN_00444270("GAVETECH");
  } else {
    for (local_c = 0; local_c < 0xd; local_c = local_c + 1) {
      DAT_0064c6f8[param_1 * 0x594 + local_c] = 0;
    }
    for (local_c = 0; local_c < 100; local_c = local_c + 1) {
      DAT_00655b82[local_c] = DAT_00655b82[local_c] & ~(1 << (u8(param_1) & 0x1f));
    }
    DAT_0064c6b1[param_1 * 0x594] = 0;
    DAT_0064c6b0[param_1 * 0x594] = 1;
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
  DAT_0062804c = 0;
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

// Source: decompiled/block_00550000.c FUN_00554954 (14 bytes)
export function FUN_00554954() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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

// Source: decompiled/block_00550000.c FUN_0055499f (2032 bytes)
export function FUN_0055499f() {
  // Cheat terrain editor dialog — interactive UI that modifies tile properties.
  // Reads current tile at (DAT_0064b1b4, DAT_0064b1b0) via FUN_005b8931,
  // presents terrain type list (CSocket::Create) and checkbox properties,
  // then writes modified tile bytes (terrain type, special bits, visibility).
  // Modifies: tile bytes (*pbVar3, pbVar3[1], pbVar3[3]),
  //   DAT_00655b12 (visible tile count), DAT_00631ed8/DAT_00633678 (terrain state).
  // DEVIATION: MFC — All UI dialog creation/interaction (CSocket::Create,
  //   FUN_0059db08, FUN_0059edf0, FUN_0040bc80, FUN_0051d7d6, FUN_0051d817,
  //   FUN_00419100, FUN_005b8b65, FUN_005b8b1a, FUN_0047ce1e, FUN_0047cea6)
  //   requires interactive user input, cannot be transpiled headlessly.
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

// Source: decompiled/block_00550000.c FUN_005551a5 (14 bytes)
export function FUN_005551a5() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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

// Source: decompiled/block_00550000.c FUN_00555601 (14 bytes)
export function FUN_00555601() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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
  // Writes DAT_00655b07, DAT_00655b06, DAT_006d1da0, DAT_00655b0b
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

// Source: decompiled/block_00550000.c FUN_00555831 (14 bytes)
export function FUN_00555831() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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
  // Writes DAT_00655b0b, DAT_00655b03, DAT_00655b05, DAT_006d1da0
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

// Source: decompiled/block_00550000.c FUN_005559f4 (14 bytes)
export function FUN_005559f4() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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

  FUN_00421da0(0, DAT_00655af8);
  iVar1 = FUN_0051d75d(DAT_006359dc, "GAMEYEAR", DAT_00655af8, local_8);
  if (iVar1 === 0) {
    DAT_00655af8 = local_8[0];
    DAT_00655afa = FUN_00484fec(local_8[0]);
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

// Source: decompiled/block_00550000.c FUN_00555ca3 (14 bytes)
export function FUN_00555ca3() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}



// ============================================================
// Function: FUN_00555cb1 @ 0x00555CB1
// Size: 60 bytes
// cheat_view_unit_at_cursor
// ============================================================

export function FUN_00555cb1() {
  let uVar1;

  uVar1 = FUN_005b2e69(DAT_0064b1b4, DAT_0064b1b0);
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

// Source: decompiled/block_00550000.c FUN_00555d70 (857 bytes)
export function FUN_00555d70() {
  // Cheat foreign affairs map: draws trade route markers and unit assignment grid.
  // Reads DAT_0064cab4/cab6/cab8/cab9 (trade route data per civ),
  // DAT_0064ca32 (unit type assignments), DAT_006d1da0 (current civ).
  // Clears duplicate trade route overlaps: (&DAT_0064cab8)[...] = 0xff
  // Renders via FUN_00472b0a (place marker), FUN_005baeb0/FUN_005baec8/
  // FUN_005baee0/FUN_0043c8d0 (grid rendering).
  // DEVIATION: MFC — All rendering calls require GDI/canvas context.
  // Game state write: dedup sets (&DAT_0064cab8)[idx] = 0xff for overlapping routes.
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

  for (local_c = 0; local_c < DAT_0066caa0; local_c = local_c + 2) {
    for (local_10 = 0; local_10 < DAT_0066caa4; local_10 = local_10 + 1) {
      iVar1 = DAT_0066ca90 + local_c;
      iVar2 = DAT_0066ca94 + local_10;
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
    FUN_00467580(0, s32(DAT_0064c6a2, iVar1 * 0x594));
    iVar3 = FUN_0051d75d(DAT_006359dc, "MONEY", s32(DAT_0064c6a2, iVar1 * 0x594), { value: 0 });
    if (iVar3 === 0) {
      local_8 = iVar3; // placeholder
      if (30000 < local_8) {
        local_8 = 30000;
      }
      if (local_8 < 0) {
        local_8 = 0;
      }
      w32(DAT_0064c6a2, iVar1 * 0x594, local_8);
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

// Source: decompiled/block_00550000.c FUN_0055625b (1892 bytes)
export function FUN_0055625b() {
  // Cheat unit editor dialog — interactive UI loop (FUN_00421ea0 "UNITEDIT").
  // Modifies unit data: DAT_006560f4 (flags, toggle veteran 0x2000),
  // DAT_006560f8 (move points), DAT_006560fa (HP), DAT_00656100 (home city),
  // DAT_006560ff (cargo type), DAT_006560fd (supply route).
  // DEVIATION: MFC — All dialog creation/interaction requires Win32 UI.
  // Interactive loop driven by user button presses (cases 0-6).
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

// Source: decompiled/block_00550000.c FUN_005569d5 (14 bytes)
export function FUN_005569d5() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}



// ============================================================
// Function: set_city_shields @ 0x005569E3
// Size: 1357 bytes
// cheat_edit_city_dialog
// ============================================================

// Source: decompiled/block_00550000.c set_city_shields (1357 bytes)
export function set_city_shields() {
  // Cheat city editor dialog — interactive UI loop (FUN_00421ea0 "CITYEDIT").
  // Modifies city data: DAT_0064f349 (city size), DAT_0064f35c (shields),
  // DAT_0064f344 (flags, toggle capital 0x4000000), DAT_0064f374 (buildings),
  // DAT_00655be6 (wonder assignments).
  // DEVIATION: MFC — All dialog creation/interaction requires Win32 UI.
  // Interactive loop driven by user button presses (cases 0-6).
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

// Source: decompiled/block_00550000.c FUN_00556f46 (14 bytes)
export function FUN_00556f46() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}



// ============================================================
// Function: FUN_00556f54 @ 0x00556F54
// Size: 3764 bytes
// cheat_edit_king_dialog
// ============================================================

// Source: decompiled/block_00550000.c FUN_00556f54 (3764 bytes)
export function FUN_00556f54() {
  // Cheat king/civ editor dialog — interactive UI loop (FUN_00421ea0 "EDITKING").
  // Modifies civ data: DAT_0064c6c0 (treaties, flags 0x10/0x80),
  // DAT_0064ca82 (last contact year), DAT_0064c6e0 (attitudes),
  // DAT_0064c6be/c6bf (betrayal), DAT_0064c6a8 (research progress),
  // DAT_0064c6aa (current research), DAT_0064c6a0 (civ flags, toggle 0x200),
  // DAT_006554fc (female leader), DAT_0064ca92 (leader personality),
  // DAT_0064bcfa/bd12/bd2a (leader names), DAT_0064c6f8/c6b0 (tech counts).
  // Uses FUN_00467750/FUN_00467825 for treaty manipulation.
  // DEVIATION: MFC — All dialog creation/interaction requires Win32 UI.
  // Interactive loop with 13 cases (0-12).
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

// Source: decompiled/block_00550000.c FUN_00557e1e (14 bytes)
export function FUN_00557e1e() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}



// ============================================================
// Function: FUN_00557e2c @ 0x00557E2C
// Size: 843 bytes
// cheat_edit_victory_dialog
// ============================================================

// Source: decompiled/block_00550000.c FUN_00557e2c (843 bytes)
export function FUN_00557e2c() {
  // Cheat victory conditions editor — interactive UI loop (FUN_00421ea0 "EDITVICTORY").
  // Modifies: DAT_0064bc60 (victory flags, toggle bits 2/4),
  // DAT_0064bcba (victory civ selection), DAT_0064bcbc..DAT_0064bcc2 (objective flags),
  // DAT_0064bcb4 (victory objective values via FUN_00518ec0).
  // DEVIATION: MFC — All dialog creation/interaction requires Win32 UI.
  // Interactive loop with cases 1-7.
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

// Source: decompiled/block_00550000.c FUN_0055818d (14 bytes)
export function FUN_0055818d() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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
          FUN_00421da0(0, ((DAT_0064bc60) & 0x10) >>> 4);
          FUN_00421da0(1, ((DAT_0064bc60) & 0x20) >>> 5);
          FUN_00421da0(2, ((DAT_0064bc60) & 0x40) >>> 6);
          FUN_00421da0(3, ((DAT_0064bc60) & 0x8000) >>> 0xf);
          iVar1 = FUN_00421ea0("EDITRULES");
          if (iVar1 === 0) {
            return;
          }
          if (iVar1 !== 1) break;
          DAT_0064bc60 = DAT_0064bc60 ^ 0x10;
        }
        if (iVar1 !== 2) break;
        DAT_0064bc60 = DAT_0064bc60 ^ 0x20;
      }
      if (iVar1 !== 3) break;
      DAT_0064bc60 = DAT_0064bc60 ^ 0x40;
    }
    if (iVar1 !== 4) break;
    DAT_0064bc60 = DAT_0064bc60 ^ 0x8000;
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
    DAT_00655afa = FUN_00484fec(DAT_00655af8);
    FUN_0056a65e(1);
    FUN_citywin_9429();
    FUN_00421da0(0, DAT_0064bcb2);
    FUN_00421da0(1, DAT_0064bcb4);
    FUN_00421da0(2, DAT_0064bcb6);
    FUN_00421da0(3, DAT_0064bcb8);
    FUN_00421da0(4, DAT_0064bc60 & 1);
    if ((DAT_00655af0 & 0x80) === 0) {
      uVar1 = FUN_00428b0c(DAT_00628420[0x68c]);
      FUN_0040ff60(0, uVar1);
    } else {
      uVar1 = FUN_00428b0c(DAT_00628420[0x688]);
      FUN_0040ff60(0, uVar1);
    }
    FUN_0040ff60(1, DAT_0064bc62);
    iVar2 = FUN_00421ea0("EDITSCEN");
    if (iVar2 === 0) break;
    if (iVar2 === 1) {
      iVar2 = FUN_00518ec0("EDITPARADIGM", DAT_0064bcb2, local_c);
      if (iVar2 === 0) {
        DAT_0064bcb2 = local_c[0];
      }
    } else if (iVar2 === 2) {
      iVar2 = FUN_00518ec0("EDITINCREMENT", DAT_0064bcb4, local_c);
      if (iVar2 === 0) {
        DAT_0064bcb4 = local_c[0];
      }
    } else if (iVar2 === 3) {
      iVar2 = FUN_00518ec0("EDITSTARTYEAR", DAT_0064bcb6, local_c);
      if (iVar2 === 0) {
        DAT_0064bcb6 = local_c[0];
      }
    } else if (iVar2 === 4) {
      iVar2 = FUN_00518ec0("EDITMAXTURNS", DAT_0064bcb8, local_c);
      if (iVar2 === 0) {
        DAT_0064bcb8 = local_c[0];
      }
    } else if (iVar2 === 5) {
      local_10 = DAT_00636598;
      for (local_8 = 0; local_8 < DAT_006d1164; local_8 = local_8 + 1) {
        // Clear fog top nibble for revealed tiles
        if ((u8(local_10[5]) & 0xf0) === 0xf0) {
          local_10[5] = u8(local_10[5]) & 0xf;
        }
        local_10 = local_10 + 6;
      }
      FUN_0047cf9e(DAT_006d1da0, 1);
    } else if (iVar2 === 6) {
      local_10 = DAT_00636598;
      for (local_8 = 0; local_8 < DAT_006d1164; local_8 = local_8 + 1) {
        if (((u8(local_10[5]) & 0xf0) !== 0xf0) && ((u8(local_10[1]) & 3) === 0)) {
          local_10[5] = u8(local_10[5]) | 0xf0;
        }
        local_10 = local_10 + 6;
      }
      FUN_0047cf9e(DAT_006d1da0, 1);
    } else if (iVar2 === 7) {
      // Reveal all tiles to all civs
      local_34 = FUN_005b8931(0, 0);
      for (local_140 = 1; local_140 < 8; local_140 = local_140 + 1) {
        iVar2 = FUN_005b898b(0, 0, local_140);
        aiStack_30[local_140] = iVar2;
      }
      for (local_8 = 0; local_8 < DAT_006d1164; local_8 = local_8 + 1) {
        local_34[4] = 0xff;
        for (local_140 = 1; local_140 < 8; local_140 = local_140 + 1) {
          aiStack_30[local_140] = local_34[1];
          aiStack_30[local_140] = aiStack_30[local_140] + 1;
        }
        local_34 = local_34 + 6;
      }
      for (local_13c = 0; local_13c < DAT_00655b18; local_13c = local_13c + 1) {
        if (s32(DAT_0064f394, local_13c * 0x58) !== 0) {
          DAT_0064f34c[local_13c * 0x58] = 0xff;
          for (local_140 = 0; local_140 < 8; local_140 = local_140 + 1) {
            DAT_0064f34d[local_13c * 0x58 + local_140] = DAT_0064f349[local_13c * 0x58];
          }
          iVar2 = FUN_005b8931(
            (DAT_0064f340[local_13c * 0x58] | (DAT_0064f340[local_13c * 0x58 + 1] << 8)) << 16 >> 16,
            (DAT_0064f342[local_13c * 0x58] | (DAT_0064f342[local_13c * 0x58 + 1] << 8)) << 16 >> 16
          );
          iVar2[4] = 0xff;
        }
      }
      DAT_0064bc60 = DAT_0064bc60 | 8;
      FUN_0047cf9e(DAT_006d1da0, 1);
    } else if (iVar2 === 8) {
      // Restore default visibility
      local_34 = FUN_005b8931(0, 0);
      for (local_8 = 0; local_8 < DAT_006d1164; local_8 = local_8 + 1) {
        local_34[4] = 0;
        if (((u8(local_34[1]) & 3) !== 0) && ((u8(local_34[5]) >>> 4) < 8)) {
          local_140 = u8(local_34[5]) >>> 4;
          local_34[4] = (1 << (local_140 & 0x1f));
        }
        local_34 = local_34 + 6;
      }
      DAT_0064bc60 = DAT_0064bc60 & 0xfff7;
      FUN_0047cf9e(DAT_006d1da0, 1);
    } else if (iVar2 === 9) {
      iVar2 = FUN_00421ed0("SCENNAME", 0x18, DAT_0064bc62, local_138);
      if (iVar2 === 0) {
        FUN_005f22d0(DAT_0064bc62, local_138);
      }
    } else if (iVar2 === 10) {
      DAT_0064bc60 = DAT_0064bc60 ^ 1;
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

// Source: decompiled/block_00550000.c FUN_00559c54 (29 bytes)
export function FUN_00559c54() {
  // DEVIATION: Win32 — _atexit(FUN_00559c71); registers CMiniFrameWnd destructor at exit
  return;
}



// ============================================================
// Function: FUN_00559c71 @ 0x00559C71
// Size: 26 bytes
// atexit_destroy_miniframe
// ============================================================

// Source: decompiled/block_00550000.c FUN_00559c71 (26 bytes)
export function FUN_00559c71() {
  // DEVIATION: MFC — CMiniFrameWnd::~CMiniFrameWnd(&DAT_006ab1b8); static object destructor
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

// Source: decompiled/block_00550000.c FUN_00559cbf (29 bytes)
export function FUN_00559cbf() {
  // DEVIATION: Win32 — _atexit(FUN_00559cdc); registers FUN_005bd915 destructor at exit
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

// Source: decompiled/block_00550000.c FUN_00559cf6 (199 bytes)
export function FUN_00559cf6(param_1, param_2) {
  // DEVIATION: MFC — Intro video/animation setup: calls FUN_005bd630 (init video),
  // FUN_005c64da (create surface), FUN_00407ff0 (get DC), FUN_005bf5e1 (load bitmap
  // from DAT_006ab498+900), FUN_005bd65c(param_1, param_2) (set playback params),
  // FUN_0055a930 (blit setup with DAT_006ab4b8), FUN_004083f0 (release DC).
  // Then cleanup: FUN_00559dbd (FUN_005c656b), FUN_00559dc9 (FUN_005bd915).
  // All multimedia/rendering — no game state globals written.
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

// Source: decompiled/block_00550000.c FUN_00559ddf (14 bytes)
export function FUN_00559ddf() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}



// ============================================================
// Function: FUN_00559ded @ 0x00559DED
// Size: 79 bytes
// init_intro_display_defaults
// ============================================================

// Source: decompiled/block_00550000.c FUN_00559ded (79 bytes)
export function FUN_00559ded() {
  // DEVIATION: MFC — Sets default display dimensions on in_ECX object:
  // *(in_ECX + 0x2dc) = 100; *(in_ECX + 0x2d8) = 100;
  // *(in_ECX + 0x2e0) = 1; *(in_ECX + 0x2e4) = 0;
  return;
}



// ============================================================
// Function: FUN_00559e3c @ 0x00559E3C
// Size: 118 bytes
// CMiniFrameWnd_constructor
// ============================================================

// Source: decompiled/block_00550000.c FUN_00559e3c (118 bytes)
export function FUN_00559e3c() {
  // DEVIATION: MFC — CMiniFrameWnd constructor: calls FUN_0055339f (COleCntrFrameWnd ctor),
  // FUN_004502b0 (init bitmap/palette), sets vtable to PTR_FUN_0061d6e0,
  // calls FUN_00559ded (set default display dims 100x100). All UI init.
  return;
}



// ============================================================
// Function: CMiniFrameWnd_destructor @ 0x00559ED4
// Size: 92 bytes
// ~CMiniFrameWnd
// ============================================================

// Source: decompiled/block_00550000.c ~CMiniFrameWnd (92 bytes)
export function CMiniFrameWnd_destructor() {
  // DEVIATION: MFC — ~CMiniFrameWnd destructor: sets vtable to PTR_FUN_0061d6e0,
  // calls FUN_00559ded (reset display dims), FUN_00559f30 (_Timevec destructor),
  // FUN_00559f3f (~COleCntrFrameWnd), then SEH epilog FUN_00559f52. All UI teardown.
  return;
}



// ============================================================
// Function: FUN_00559f30 @ 0x00559F30
// Size: 15 bytes
// destroy_timevec_sub
// ============================================================

// Source: decompiled/block_00550000.c FUN_00559f30 (15 bytes)
export function FUN_00559f30() {
  // DEVIATION: MFC — _Timevec::~_Timevec(*(unaff_EBP + -0x10) + 0x2f8); bitmap cleanup
  return;
}



// ============================================================
// Function: FUN_00559f3f @ 0x00559F3F
// Size: 9 bytes
// destroy_olecntr_sub
// ============================================================

// Source: decompiled/block_00550000.c FUN_00559f3f (9 bytes)
export function FUN_00559f3f() {
  // DEVIATION: MFC — COleCntrFrameWnd::~COleCntrFrameWnd(*(unaff_EBP + -0x10)); base destructor
  return;
}



// ============================================================
// Function: FUN_00559f52 @ 0x00559F52
// Size: 14 bytes
// seh_epilog_15
// ============================================================

// Source: decompiled/block_00550000.c FUN_00559f52 (14 bytes)
export function FUN_00559f52() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}



// ============================================================
// Function: FUN_00559f60 @ 0x00559F60
// Size: 111 bytes
// blit_intro_rect
// ============================================================

// Source: decompiled/block_00550000.c FUN_00559f60 (111 bytes)
export function FUN_00559f60(param_1) {
  // DEVIATION: MFC — BitBlt wrapper: computes source rect from param_1 and
  // in_ECX offsets (0x124, 0x128), calls FUN_005a9afe(&DAT_006ab4b8, ...)
  // to blit intro display. All rendering.
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

// Source: decompiled/block_00550000.c FUN_0055a00b (70 bytes)
export function FUN_0055a00b(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: MFC — Sets RECT: FUN_004086c0(param_1,
  //   *(in_ECX + 0x124) + param_2, *(in_ECX + 0x128) + param_3,
  //   param_4, param_5). UI layout helper.
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
  FUN_004086c0(param_1, param_2, param_3, param_4 + 0x10 + DAT_006335a0,
               param_5 + 0x10 + DAT_006335a4);
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
      param_1 = ((DAT_006ab198 + -0x280 + ((DAT_006ab198 + -0x280) >> 31 & 7)) >> 3) + 1;
      break;
    case 2:
      iVar1 = FUN_004080c0();
      param_1 = ((iVar1 - (param_2 + 0x10)) / 2) | 0;
      break;
    case 3:
      iVar1 = FUN_004080c0();
      param_1 = ((iVar1 - (param_2 + 0x10)) -
                ((DAT_006ab198 + -0x280 + ((DAT_006ab198 + -0x280) >> 31 & 7)) >> 3)) + -1;
      break;
    case 4:
      param_1 = FUN_004080c0();
      param_1 = param_1 - (param_2 + 0x10);
      if (param_1 < 0) {
        param_1 = 0;
      }
      break;
    case 6:
      param_1 = ((DAT_006ab19c + -0x1e0 + ((DAT_006ab19c + -0x1e0) >> 31 & 7)) >> 3) + 1;
      break;
    case 7:
      iVar1 = FUN_00414bb0();
      param_1 = ((iVar1 - (param_2 + 0x10)) / 2) | 0;
      break;
    case 8:
      iVar1 = FUN_00414bb0();
      param_1 = ((iVar1 - (param_2 + 0x10)) -
                ((DAT_006ab19c + -0x1e0 + ((DAT_006ab19c + -0x1e0) >> 31 & 7)) >> 3)) + -1;
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

// Source: decompiled/block_00550000.c FUN_0055a41d (330 bytes)
export function FUN_0055a41d(param_1, param_2, param_3) {
  // DEVIATION: MFC — Opens advisor/info dialog: if in_ECX+0x2e4 != 0,
  // computes display size via FUN_0055a329, position via FUN_0055a192,
  // creates bordered rect via FUN_0055a10d, creates dialog via FUN_005534bc,
  // then calls FUN_00408230/CPropertySheet::EnableStackedTabs/FUN_004082b0/
  // FUN_005bb574/FUN_004085f0 for tab setup. All UI/window creation.
  return;
}



// ============================================================
// Function: FUN_0055a567 @ 0x0055A567
// Size: 61 bytes
// close_advisor_dialog_if_open
// ============================================================

// Source: decompiled/block_00550000.c FUN_0055a567 (61 bytes)
export function FUN_0055a567() {
  // DEVIATION: MFC — Closes advisor dialog: if *(in_ECX + 0x2e4) != 0,
  // calls FUN_004083b0 (destroy window), FUN_004083f0 (release DC),
  // FUN_00484d52 (cleanup palette). All UI teardown.
  return;
}



// ============================================================
// Function: FUN_0055a5a4 @ 0x0055A5A4
// Size: 64 bytes
// close_and_unload_advisor
// ============================================================

// Source: decompiled/block_00550000.c FUN_0055a5a4 (64 bytes)
export function FUN_0055a5a4() {
  // DEVIATION: MFC — Closes advisor and unloads DLL: if *(in_ECX + 0x2e4) != 0,
  // calls FUN_004083b0, FUN_004083f0, then FUN_0055a64a (unload DLL). All UI teardown.
  return;
}



// ============================================================
// Function: FUN_0055a5e4 @ 0x0055A5E4
// Size: 102 bytes
// load_intro_dll
// ============================================================

// Source: decompiled/block_00550000.c FUN_0055a5e4 (102 bytes)
export function FUN_0055a5e4() {
  // DEVIATION: Win32 — Loads civ2_intro.dll: calls FUN_005f22d0 to build path
  // "civ2_intro.dll", FUN_00564713 to check existence, FUN_004502e0 to load,
  // then sets *(in_ECX + 0x2e4) = 1. All DLL loading.
  return;
}



// ============================================================
// Function: FUN_0055a64a @ 0x0055A64A
// Size: 65 bytes
// unload_intro_dll
// ============================================================

// Source: decompiled/block_00550000.c FUN_0055a64a (65 bytes)
export function FUN_0055a64a() {
  // DEVIATION: Win32 — Unloads intro DLL: if *(in_ECX + 0x2e4) != 0,
  // calls FUN_00450340 (FreeLibrary wrapper), then *(in_ECX + 0x2e4) = 0.
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

  DAT_0062d040 = 1;
  for (local_3c = 0; local_3c < 2; local_3c = local_3c + 1) {
    if (local_3c === 0) {
      local_8 = DAT_006365e0;
    } else {
      local_8 = DAT_006365e4;
    }
    local_2c = (local_3c !== 0) ? 1 : 0;
    _memset(local_8, 0, DAT_006d116a * DAT_006d116c);
    for (local_34 = 0; local_34 < DAT_006d116a; local_34 = local_34 + 1) {
      for (local_20 = 0; local_20 < DAT_006d116c; local_20 = local_20 + 1) {
        local_1c = local_34 * 4 + 1;
        local_24 = local_20 * 4 + 1;
        local_18 = FUN_0055ac37(local_1c, local_24, { value: 0 }, { value: 0 }, local_2c);
        if (-1 < local_18) {
          for (local_44 = 0; local_44 < 4; local_44 = local_44 + 1) {
            local_10 = FUN_005ae052(s8(DAT_006283d0[local_44]) * 4 + local_1c);
            local_14 = s8(DAT_006283e0[local_44]) * 4 + local_24;
            iVar1 = FUN_004087c0(local_10, local_14);
            if ((iVar1 !== 0) &&
                (local_c = FUN_0055ac37(local_10, local_14, { value: 0 }, { value: 0 }, local_2c),
                 local_c === local_18) &&
                (local_38 = FUN_004ad0d1(local_28, local_30, local_40, local_48, local_2c, 5),
                 0 < local_38) && (local_38 < 5)) {
              local_8[DAT_006d116a * local_20 + local_34] =
                   local_8[DAT_006d116a * local_20 + local_34] |
                   (1 << (local_44 & 0x1f));
              local_10 = FUN_005ae0b0(s8(DAT_006283d0[local_44]) + local_34);
              local_14 = s8(DAT_006283e0[local_44]) + local_20;
              if ((-1 < local_10) && (-1 < local_14) &&
                  (local_10 < DAT_006d116a && (local_14 < DAT_006d116c))) {
                local_8[DAT_006d116a * local_14 + local_10] =
                     local_8[DAT_006d116a * local_14 + local_10] |
                     (1 << ((local_44 - 4) & 7));
              }
            }
          }
        }
      }
      FUN_0040894c();
    }
  }
  DAT_0062d040 = 0;
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

// Source: decompiled/block_00550000.c FUN_0055add0 (140 bytes)
export function FUN_0055add0(param_1, param_2) {
  // DEVIATION: Win32 — App entry point:
  // CreateMutexA(NULL, 1, "Civilization II Once Only") — single instance check
  // If GetLastError() == 0xb7 (already exists): FindWindowA("MSWindowClass"),
  //   BringWindowToTop(hWnd)
  // Else: FUN_005dbb20(param_1, param_2) (app init), FUN_004c4280() (main loop),
  //   FUN_005dbb4f() (cleanup)
  return 0;
}



// ============================================================
// Function: FUN_0055ae80 @ 0x0055AE80
// Size: 174 bytes
// stop_turn_timer
// ============================================================

export function FUN_0055ae80(param_1) {
  if (DAT_006ad578 === DAT_006d1da0) {
    FUN_citywin_994F();
    FUN_00437c6f();
    FUN_0044f799();
    FUN_004f8d51();
  }
  if (DAT_00633a74 !== 0) {
    FUN_005d2004(DAT_00633a74);
    DAT_00633a74 = 0;
    FUN_0056ac67(100, 0xffffffff);
    if (((param_1 !== 0) && (2 < DAT_00655b02)) && (DAT_0064b9bc !== 0)) {
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

  if (DAT_006ad578 === DAT_006d1da0) {
    FUN_citywin_994F();
    FUN_00437c6f();
    FUN_0044f799();
    FUN_004f8d51();
  }
  DAT_00633a78 = (DAT_00654b70 / 1000) | 0;
  DAT_006ab5ac = 0;
  DAT_0066c990 = 0xffffffff;
  FUN_00552112();
  local_14 = DAT_0066ca54;
  local_10 = DAT_0066ca58;
  local_c = DAT_0066ca5c;
  local_8 = DAT_0066ca68;
  FUN_00408490(local_14);
  if (DAT_00633a74 !== 0) {
    FUN_005d2004(DAT_00633a74);
  }
  DAT_00633a74 = FUN_005d1f50(0, 500, 1);
  DAT_00633a7c = FUN_00421bb0();
  if ((param_1 !== 0) && (2 < DAT_00655b02)) {
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
  if ((DAT_00633a78 !== 0) && (DAT_0066c988 !== 0)) {
    if (DAT_00633a74 !== 0) {
      FUN_005d2004(DAT_00633a74);
    }
    DAT_00633a74 = FUN_005d1f50(0, 500, 1);
    DAT_00633a7c = FUN_00421bb0();
    if ((param_1 !== 0) && (2 < DAT_00655b02)) {
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
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (DAT_00654b70 !== 0) {
    DAT_006ab5ac = DAT_006ab5ac ^ 1;
    if (DAT_006ab5ac !== 0) {
      if (DAT_00633a78 !== 0) {
        FUN_00421bb0();
        iVar1 = 0; // __ftol placeholder
        DAT_00633a78 = DAT_00633a78 - iVar1;
        if (DAT_00633a78 < 0) {
          DAT_00633a78 = 0;
        }
        DAT_00633a7c = FUN_00421bb0();
      }
      if (DAT_00633a78 === 0) {
        FUN_citywin_994F();
        FUN_00437c6f();
        FUN_0044f799();
        FUN_004f8d51();
        DAT_0064b9bc = 0;
        FUN_0056ac67(100, 0xffffffff);
        return;
      }
      FUN_00552112();
      local_14 = DAT_0066ca54;
      local_10 = DAT_0066ca58;
      local_c = DAT_0066ca5c;
      local_8 = DAT_0066ca68;
      FUN_00408490(local_14);
    }
    iVar1 = ((DAT_00633a78 * 100000) / DAT_00654b70) | 0;
    if (iVar1 < 0x21) {
      local_18 = 0x6a;
    } else if (iVar1 < 0x42) {
      local_18 = 0x7a;
    } else {
      local_18 = 0x2a;
    }
    if (((local_18 === 0x6a) || (DAT_00633a78 < 0x1e)) && (DAT_006ab5ac !== 0)) {
      local_18 = -1;
    }
    FUN_0056ac67(iVar1, local_18);
    if (DAT_00633a74 !== 0) {
      FUN_005d2004(DAT_00633a74);
    }
    DAT_00633a74 = FUN_005d1f50(0, 500, 1);
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
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_0055ae80(1);
  GetAsyncKeyState(0x1b);
  iVar1 = FUN_0051ea8e(1);
  if (iVar1 === 0) {
    if (DAT_00654b70 === 0) {
      DAT_0066c988 = 0;
      FUN_00552112();
      local_14 = DAT_0066ca54;
      local_10 = DAT_0066ca58;
      local_c = DAT_0066ca5c;
      local_8 = DAT_0066ca68;
      FUN_00408490(local_14);
    } else {
      DAT_0066c988 = 1;
      FUN_0055af2e(1);
    }
    if (2 < DAT_00655b02) {
      FUN_0046b14d(0x6c, 0xff, DAT_00654b70, 0, 0, 0, 0, 0, 0, 0);
    }
  } else {
    FUN_0055b046(1);
  }
  if (DAT_00654fa8 !== 0) {
    DAT_0064b9bc = 0;
  }
  return;
}



// ============================================================
// Function: FUN_0055b3c8 @ 0x0055B3C8
// Size: 53 bytes
// cancel_drag_timeout
// ============================================================

export function FUN_0055b3c8() {
  if (DAT_00633a80 !== 0) {
    FUN_005d2004(DAT_00633a80);
    DAT_00633a80 = 0;
  }
  return;
}



// ============================================================
// Function: FUN_0055b3fd @ 0x0055B3FD
// Size: 84 bytes
// start_drag_timeout
// ============================================================

export function FUN_0055b3fd() {
  if (2 < DAT_00655b02) {
    if (DAT_00633a80 !== 0) {
      FUN_005d2004(DAT_00633a80);
    }
    DAT_00633a80 = FUN_005d1f50(FUN_0055b5fa, 500, 1);
  }
  return;
}



// ============================================================
// Function: FUN_0055b451 @ 0x0055B451
// Size: 45 bytes
// check_drag_pending
// ============================================================

export function FUN_0055b451() {
  if (DAT_00633a84 !== 0) {
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
  DAT_00633a84 = 1;
  DAT_00633a88 = FUN_00421bb0();
  DAT_00633a8c = 0;
  DAT_00633a90 = FUN_005c62ee();
  if (DAT_006ad2f7 !== 0) {
    FUN_0046b14d(0x5d, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  DAT_006ab5b4 = SetWindowsHookExA(7, 0, DAT_006e4ff0, 0);
  return;
}



// ============================================================
// Function: FUN_0055b515 @ 0x0055B515
// Size: 137 bytes
// exit_window_drag
// ============================================================

export function FUN_0055b515() {
  debug_log("EXIT_WINDOW_DRAG");
  DAT_00633a84 = 0;
  DAT_00633a88 = 0;
  DAT_00633a8c = 0;
  DAT_00633a90 = 0;
  UnhookWindowsHookEx(DAT_006ab5b4);
  if (DAT_006ad2f7 !== 0) {
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
  if (DAT_00633a84 !== 0) {
    if (DAT_00633a90 !== 0) {
      // Post WM_LBUTTONUP — Win32, no-op
      FUN_00414d40();
    }
    DAT_00633a84 = 0;
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

  if ((((2 < DAT_00655b02) && (DAT_006ad308 !== 1)) && (DAT_00633a84 !== 0)) &&
     ((iVar1 = FUN_00421bb0(), DAT_00633a88 + 0x26c < iVar1 && (DAT_006ad685 === 0)))) {
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

  if (DAT_00633a84 !== 0) {
    iVar1 = FUN_00421bb0();
    if (DAT_00633a88 + 0x7c < iVar1) {
      DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
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

  if ((DAT_00655b02 < 3) || (DAT_006ad698 === 0)) {
    if (DAT_00655b02 === 0) {
      FUN_0046e6a9();
      FUN_00484d3b();
    } else {
      if (2 < DAT_00655b02) {
        if (DAT_00633a74 !== 0) {
          FUN_005d2004(DAT_00633a74);
          DAT_00633a74 = 0;
        }
        FUN_004b7645();
        FUN_004b768d();
        uVar1 = FUN_00410070(DAT_006d1da0);
        FUN_0040ff60(0, uVar1);
        uVar1 = FUN_00493ba6(DAT_006d1da0);
        FUN_0040ff60(1, uVar1);
        uVar1 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(2, uVar1);
        uVar1 = FUN_00493c7d(DAT_006d1da0);
        FUN_0040ff60(3, uVar1);
        if (DAT_00654c76 === 0) {
          FUN_00511880(1, 0xff, 4, 0, 0, 0);
        } else {
          FUN_00511880(0, 0xff, 4, 0, 0, 0);
        }
      }
      DAT_00628054 = 0;
      FUN_0041033a();
      if ((~(1 << (u8(DAT_006d1da0) & 0x1f)) & DAT_00655b0b) === 0) {
        DAT_00655b0b = DAT_00655b0b & ~(1 << (u8(DAT_006d1da0) & 0x1f));
        if (2 < DAT_00655b02) {
          FUN_0046b14d(0x31, 0, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0);
        }
        FUN_00484d3b();
        FUN_0046e6a9();
      } else {
        FUN_004e1763(DAT_006d1da0, 0, 0);
      }
      FUN_00484d3b();
      DAT_0064b9bc = 0;
      DAT_006ad685 = 1;
      FUN_0055ae80(0);
      if (DAT_006ad2f7 === 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0xa2, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
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

  DAT_006ab5e4 = -1;
  DAT_00633ac8 = 0;
  DAT_006ab5e0 = 0;
  DAT_006ab5e8 = 0;
  DAT_006ab5ec = 0;
  if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) === 0) {
    for (local_18 = 0; local_18 < DAT_00655b18; local_18 = local_18 + 1) {
      if ((s32(DAT_0064f394, local_18 * 0x58) !== 0) &&
         (s8(DAT_0064f348[local_18 * 0x58]) === param_1)) {
        local_1c = 0;
        local_8 = 0;
        while (local_8 < 0x14) {
          uVar1 = FUN_005ae052(
            s16(DAT_0064f340, local_18 * 0x58) + s8(DAT_00628370[local_8])
          );
          iVar2 = s16(DAT_0064f342, local_18 * 0x58) +
                  s8(DAT_006283a0[local_8]);
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
            if ((s8(DAT_0064b1ca[u8(DAT_006560f6[local_20 * 0x20]) * 0x14]) < 5) &&
                ((u16(DAT_006560f4, local_20 * 0x20) & 4) === 0)) {
              if (local_18 !== DAT_006ab5e4) {
                DAT_00633ac8 = DAT_00633ac8 + 1;
              }
              DAT_006ab5e4 = local_18;
              if ((u16(DAT_006560f4, local_20 * 0x20) & 0x20) === 0) {
                w16(DAT_006560f4, local_20 * 0x20, u16(DAT_006560f4, local_20 * 0x20) | 0x20);
              } else {
                DAT_006ab5ec = DAT_006ab5ec + 1;
              }
              w16(DAT_006560f4, local_20 * 0x20, u16(DAT_006560f4, local_20 * 0x20) | 4);
              iVar2 = DAT_006ab5e8;
              local_1c = local_1c + 1;
              DAT_006ab5e0 = DAT_006ab5e0 + 1;
              DAT_006ab5e8 = DAT_006ab5e8 + 1;
              if ((uVar4 & 0x10) !== 0) {
                DAT_006ab5e8 = iVar2 + 2;
              }
              if ((uVar4 & 0x20) !== 0) {
                DAT_006ab5e8 = DAT_006ab5e8 + 1;
              }
              if ((uVar4 & 8) !== 0) {
                DAT_006ab5e8 = DAT_006ab5e8 + 1;
              }
              if ((uVar4 & 4) !== 0) {
                DAT_006ab5e8 = DAT_006ab5e8 + 1;
              }
              if ((uVar4 & 0x40) !== 0) {
                DAT_006ab5e8 = DAT_006ab5e8 + 2;
              }
            }
          }
          local_8 = local_8 + 1;
        }
        if (3 < local_1c) {
          DAT_006ab5ec = DAT_006ab5ec + 1;
        }
      }
    }
  } else {
    DAT_006ab5e8 = 0;
  }
  return DAT_006ab5e8;
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

  if (u8(DAT_0064c6b5[param_1 * 0x594]) < 5) {
    return 0;
  }
  if (((DAT_00655af0 & 0x80) !== 0) && ((DAT_0064bc60 & 1) !== 0)) {
    return 0;
  }
  local_8 = 0;
  if ((DAT_0064c6c1[param_1 * 4 + param_2 * 0x594] & 0x10) !== 0) {
    local_8 = 0x19;
  }
  iVar1 = FUN_00453e51(param_1, 0x18);
  if (iVar1 !== 0) {
    local_8 = 0x32;
  }
  iVar2 = FUN_005adfa0(local_8 + u8(DAT_0064c6be[param_2 * 0x594]) * 0xf, 0, 0x4b);
  if (u8(DAT_0064c6b6[param_1 * 0x594]) < iVar2) {
    return 0;
  }
  if (u8(DAT_0064c6b5[param_1 * 0x594]) < 6) {
    if ((u16(DAT_0064c6a0, param_1 * 0x594) & 4) === 0) {
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

  cVar1 = DAT_0064c6b5[param_1 * 0x594];
  DAT_0064c6b5[param_1 * 0x594] = param_2;
  if (DAT_0064c6b5[param_1 * 0x594] !== cVar1) {
    if ((DAT_0064c6b5[param_1 * 0x594] === 0) ||
       ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0)) {
      for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
        w32(DAT_0064c6c0, local_8 * 0x594 + param_1 * 4,
             u32(DAT_0064c6c0, local_8 * 0x594 + param_1 * 4) & 0xffffffef);
      }
    }
    if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) {
      DAT_00655aee = DAT_00655aee & 0xfffb;
      for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
        if (((s32(DAT_0064f394, local_c * 0x58) !== 0) &&
            (s8(DAT_0064f348[local_c * 0x58]) === param_1)) &&
            (FUN_004eb4ed(local_c, 1), DAT_0064f379[local_c * 0x58] === 8) &&
           (DAT_0064c6b5[param_1 * 0x594] !== 4)) {
          DAT_0064f379[local_c * 0x58] = 0xb;
        }
      }
    }
  }
  if (((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) && (0 < param_2) &&
     (DAT_00654fa8 === 0)) {
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
      if (DAT_00627879 === 0) {
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

  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    return;
  }
  if ((2 < DAT_00655b02) && (DAT_006d1da0 !== param_1)) {
    FUN_0046b14d(0x9f, DAT_006ad30c[DAT_006ad558[param_1] * 0x54], param_2,
                 0, 0, 0, 0, 0, 0, 0);
    return;
  }
  FUN_0043c9d0("PICKGOVT");
  for (local_14 = (param_2 === 0) ? 1 : 0; local_14 < 7; local_14 = local_14 + 1) {
    if ((param_2 !== 0) || (iVar1 = FUN_0055c277(param_1, local_14), iVar1 !== 0)) {
      FUN_0040bbb0();
      FUN_0040ff00(DAT_0064b9a0[local_14 * 4]);
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
    FUN_004271e8(3, DAT_0064b9a0[iVar1 * 4]);
    FUN_00410030("NEWGOVT", 0, 0);
    if (((4 < iVar1) && ((DAT_00655aea & 0x100) !== 0)) && ((DAT_00655af4 & 0x20) === 0)) {
      FUN_004271e8(0, DAT_0064b9a0[iVar1 * 4]);
      FUN_004904c0(0, "DEMOCRATS", 0, 0);
      DAT_00655af4 = DAT_00655af4 | 0x20;
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

// Source: decompiled/block_00550000.c FUN_0055c68f (14 bytes)
export function FUN_0055c68f() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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

  uVar3 = u8(DAT_0064c6b5[param_1 * 0x594]);
  if (param_2 !== 0) {
    DAT_0064c6a0[param_1 * 0x594] = DAT_0064c6a0[param_1 * 0x594] | 8;
  }
  if ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) {
    if ((uVar3 !== param_2) || ((DAT_0064c6a0[param_1 * 0x594] & 1) !== 0)) {
      uVar1 = FUN_00493d13(param_1);
      FUN_00421d60(0, uVar1);
      FUN_004271e8(1, DAT_0064b9a0[param_2 * 4]);
      uVar1 = FUN_00493b10(param_1);
      FUN_0040ff60(2, uVar1);
      uVar1 = FUN_00493ba6(param_1);
      FUN_0040ff60(3, uVar1);
      local_10 = 0;
      if (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0) ||
         (((iVar2 = FUN_00453e51(DAT_006d1da0, 0x18), iVar2 !== 0 ||
           (iVar2 = FUN_00453e51(DAT_006d1da0, 9), iVar2 !== 0)) || (DAT_00655b07 !== 0)))) {
        if (((DAT_0064c6a0[param_1 * 0x594] & 1) === 0) || (DAT_00654fa8 !== 0)) {
          if (DAT_00654fa8 === 0) {
            FUN_00410030("OVERTHROWN", 0, (DAT_00633584 === 0) ? 0 : 8);
            DAT_0064c6a0[param_1 * 0x594] = DAT_0064c6a0[param_1 * 0x594] | 1;
          }
        } else {
          FUN_00410030("CHANGED", 0, (DAT_00633584 === 0) ? 0 : 8);
          DAT_0064c6a0[param_1 * 0x594] = DAT_0064c6a0[param_1 * 0x594] & 0xfffe;
        }
        if (param_2 < 4) {
          local_8 = param_2;
        } else {
          local_8 = param_2 - 1;
        }
        DAT_0064c6b4[param_1 * 0x594] = 4 - (local_8 >> 1);
      }
      if (2 < DAT_00655b02) {
        for (local_c = 1; local_c < 8; local_c = local_c + 1) {
          if ((((1 << (u8(local_c) & 0x1f) & DAT_00655b0b) !== 0) &&
              (DAT_006d1da0 !== local_c)) &&
             ((DAT_00655b07 !== 0 ||
              ((((DAT_0064c6c0[local_c * 0x594 + param_1 * 4] & 0x80) !== 0 ||
                (iVar2 = FUN_00453e51(local_c, 0x18), iVar2 !== 0)) ||
               (iVar2 = FUN_00453e51(local_c, 9), iVar2 !== 0)))))) {
            if (((DAT_0064c6a0[param_1 * 0x594] & 1) === 0) || (DAT_00654fa8 !== 0)) {
              FUN_00511880(0x2c, DAT_006ad30c[DAT_006ad558[local_c] * 0x54],
                           1, 0, uVar3, (DAT_00633584 === 0) ? 0 : 8);
              DAT_0064c6a0[param_1 * 0x594] = DAT_0064c6a0[param_1 * 0x594] | 1;
              local_10 = local_10 + 1;
            } else {
              FUN_00511880(0x2b, DAT_006ad30c[DAT_006ad558[local_c] * 0x54],
                           4, 0, param_2, (DAT_00633584 === 0) ? 0 : 8);
              DAT_0064c6a0[param_1 * 0x594] = DAT_0064c6a0[param_1 * 0x594] & 0xfffe;
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
        DAT_0064c6b4[param_1 * 0x594] = 4 - (local_8 >> 1);
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

  bVar1 = DAT_0064c6c0[param_2 * 4 + param_1 * 0x594];
  if ((DAT_0064c6c1[param_2 * 4 + param_1 * 0x594] & 8) !== 0) {
    return 1;
  }
  if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x10) !== 0) {
    return 1;
  }
  for (local_20 = 1; local_20 < 8; local_20 = local_20 + 1) {
    if ((1 << (u8(local_20) & 0x1f) & DAT_00655b0b) !== 0) {
      iVar3 = FUN_00467af0(param_1, local_20);
      if (((iVar3 !== 0) &&
          (u16(DAT_0064c70e, param_2 * 0x594) < u16(DAT_0064c70e, local_20 * 0x594))) &&
         ((DAT_0064c6c0[param_2 * 4 + local_20 * 0x594] & 8) === 0)) {
        return 0;
      }
      iVar3 = FUN_00467af0(param_2, local_20);
      if (((iVar3 !== 0) &&
          (u16(DAT_0064c70e, param_1 * 0x594) < u16(DAT_0064c70e, local_20 * 0x594))) &&
         ((DAT_0064c6c0[param_1 * 4 + local_20 * 0x594] & 8) === 0)) {
        return 0;
      }
    }
  }
  if (u8(DAT_0064c7a5[param_1 * 0x594]) < u8(DAT_0064c7a5[param_2 * 0x594])) {
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
      if (((((DAT_0064c6c0[local_10 * 4 + param_1 * 0x594] & 8) !== 0) &&
           ((DAT_0064c6c0[local_10 * 4 + param_2 * 0x594] & 8) !== 0)) &&
          ((1 << (u8(local_10) & 0x1f) & DAT_00655b0b) !== 0)) &&
         ((iVar3 = local_c + 1,
          (u8(DAT_00655c22[param_1]) < u8(DAT_00655c22[local_10]) &&
           (u8(DAT_00655c22[param_2]) < u8(DAT_00655c22[local_10])))))) {
        iVar3 = local_c + 2;
      }
      local_c = iVar3;
      if ((((DAT_0064c6c0[local_10 * 4 + param_1 * 0x594] & 8) !== 0) &&
          ((DAT_0064c6c1[local_10 * 4 + param_2 * 0x594] & 0x20) !== 0)) &&
         ((1 << (u8(local_10) & 0x1f) & DAT_00655b0b) !== 0)) {
        local_c = local_c + -1;
      }
      if (((DAT_00655c22[local_10] === 7) && (199 < DAT_00655af8)) &&
         ((DAT_0064c6c1[local_10 * 4 + param_2 * 0x594] & 0x20) !== 0)) {
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
    if ((DAT_0064c932[param_1 * 0x594 + local_18] !== 0) &&
       (u16(DAT_0064c8b2, local_18 * 2 + param_1 * 0x594) +
        u16(DAT_0064c832, local_18 * 2 + param_1 * 0x594) <
        u16(DAT_0064c8b2, local_18 * 2 + param_2 * 0x594))) {
      return 0;
    }
    if ((s16(DAT_0064c8b2, local_18 * 2 + param_1 * 0x594) !== 0) &&
       (s16(DAT_0064c832, local_18 * 2 + param_2 * 0x594) !== 0)) {
      local_1c = local_1c + u16(DAT_0064c8b2, param_1 * 0x594 + local_18 * 2);
      local_24 = local_24 + (u16(DAT_0064c8b2, param_2 * 0x594 + local_18 * 2) >> 1) +
                 u16(DAT_0064c832, param_2 * 0x594 + local_18 * 2);
      local_8 = local_8 + u8(DAT_0064c932[param_1 * 0x594 + local_18]);
    }
  }
  if (((local_1c << 2) / local_24 <
       (local_c - s8(DAT_006554f8[s16(DAT_0064c6a6, param_1 * 0x594) * 0x30])) + 4) &&
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
  if (((DAT_00655af0 & 0x80) !== 0) && ((DAT_0064bc60 & 0x20) !== 0)) {
    return 0;
  }
  if ((((DAT_00655b0b & (1 << (DAT_00655c31 & 0x1f))) === 0) ||
      (((DAT_00655b08 === 0 || (s16(DAT_0064c708, DAT_00655c31 * 0x594) < 5)) ||
       (DAT_00655af8 < 0xc9)))) ||
     ((u8(DAT_0064c6b0[DAT_00655c31 * 0x594]) <= u8(DAT_0064c6b0[param_1 * 0x594]) ||
       (u8(DAT_0064c6b0[DAT_00655c31 * 0x594]) <= u8(DAT_0064c6b0[param_2 * 0x594]))))) {
    bVar1 = false;
  } else {
    bVar1 = true;
  }
  for (local_1c = 0; local_1c < 100; local_1c = local_1c + 1) {
    if ((DAT_0062768e[local_1c * 0x10] !== -2) || (DAT_0062768f[local_1c * 0x10] !== -2)) {
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
    if (((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) !== 0) &&
       (((u8(DAT_0064c6b0[param_1 * 0x594]) + (6 - DAT_00655b08) * 2 <
          u8(DAT_0064c6b0[param_2 * 0x594])) || (bVar1)) &&
        ((DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 4) === 0))) {
      FUN_00467825(param_1, param_2, 0x40000);
      FUN_004bf05b(param_1, local_20, param_2, 0, 0);
      return 1;
    }
  } else if ((((local_10 === 2) && ((DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 8) !== 0)) &&
             (((u8(DAT_0064c6b0[param_2 * 0x594]) + (6 - DAT_00655b08) * 2 <
                u8(DAT_0064c6b0[param_1 * 0x594])) || (bVar1)))) &&
            ((DAT_0064c6c2[param_1 * 4 + param_2 * 0x594] & 4) === 0)) {
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

  if ((u32(DAT_0064c6c0, param_2 * 4 + param_1 * 0x594) & 0x2008) !== 0) {
    return 0;
  }
  if ((DAT_0064c6c1[param_2 * 4 + param_3 * 0x594] & 0x20) === 0) {
    if (((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x10) !== 0) &&
       ((DAT_0064c6c0[param_2 * 4 + param_3 * 0x594] & 0x10) !== 0)) {
      w32(DAT_0064c6c0, param_2 * 4 + param_1 * 0x594,
           u32(DAT_0064c6c0, param_2 * 4 + param_1 * 0x594) | 0x20);
      w32(DAT_0064c6c0, param_3 * 0x594 + param_2 * 4,
           u32(DAT_0064c6c0, param_3 * 0x594 + param_2 * 4) | 0x20);
    }
    return 0;
  }
  if ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0) {
    if ((DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 0x10) === 0) {
      if (s16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2) - DAT_00655af8 < 6) {
        return 0;
      }
      if ((u8(DAT_00655c22[param_2]) < 7) && (_rand() % 3 !== 0)) {
        return 0;
      }
    }
    w16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2, DAT_00655af8);
    w16(DAT_0064ca82, param_2 * 0x594 + param_3 * 2, DAT_00655af8);
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
  if (DAT_00655af8 === 0) {
    return;
  }
  if ((DAT_00627670 !== 0) && (iVar3 = FUN_004fbe84(param_1, param_2), iVar3 === 0)) {
    return;
  }
  if (((DAT_00655b02 === 0) || ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0)) ||
     ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) === 0)) {
    if ((((2 < DAT_00655b02) && ((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0)) &&
        (DAT_006d1da0 !== param_1)) &&
       ((((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
         ((DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 1) !== 0)) ||
        ((s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2) < 0 ||
         (0xf < DAT_00655af8 - s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2))))))) {
      FUN_0046b14d(0x99, DAT_006ad30c[DAT_006ad558[param_1] * 0x54],
                   param_1, param_2, param_3, param_4, 0, 0, 0, 0);
      return;
    }
    if ((((2 < DAT_00655b02) && ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0)) &&
        (DAT_006d1da0 !== param_2)) &&
       ((((DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & 1) === 0 ||
         ((DAT_0064c6c2[param_2 * 0x594 + param_1 * 4] & 1) !== 0)) ||
        ((s16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2) < 0 ||
         (0xf < DAT_00655af8 - s16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2))))))) {
      FUN_0046b14d(0x99, DAT_006ad30c[DAT_006ad558[param_2] * 0x54],
                   param_2, param_1, param_3, param_4, 0, 0, 0, 0);
      return;
    }
    if ((((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) && (DAT_006d1da0 === param_1)) &&
       (((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
        ((((DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 1) !== 0 ||
          (s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2) < 0)) ||
         (0xf < DAT_00655af8 - s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2))))))) {
      if ((2 < DAT_00655b02) && (DAT_006d1da0 !== param_1)) {
        return;
      }
      FUN_00460129(param_1, param_2, param_3, param_4, 0);
    }
    if ((((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0) && (DAT_006d1da0 === param_2)) &&
       (((DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & 1) === 0 ||
        ((((DAT_0064c6c2[param_2 * 0x594 + param_1 * 4] & 1) !== 0 ||
          (s16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2) < 0)) ||
         (0xf < DAT_00655af8 - s16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2))))))) {
      if ((2 < DAT_00655b02) && (DAT_006d1da0 !== param_2)) {
        return;
      }
      FUN_00460129(param_2, param_1, param_3, param_4, 0);
    }
  }
  else if (DAT_00655b02 < 3) {
    if ((((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) && (DAT_006d1da0 === param_1)) &&
       (((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
        ((((DAT_0064c6c2[param_1 * 0x594 + param_2 * 4] & 1) !== 0 ||
          (s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2) < 0)) ||
         (0xf < DAT_00655af8 - s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2))))))) {
      FUN_00460129(param_1, param_2, param_3, param_4, 0);
    }
    if ((((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0) && (DAT_006d1da0 === param_2)) &&
       ((((DAT_0064c6c0[param_2 * 0x594 + param_1 * 4] & 1) === 0 ||
         (((DAT_0064c6c2[param_2 * 0x594 + param_1 * 4] & 1) !== 0 ||
          (s16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2) < 0)))) ||
        (0xf < DAT_00655af8 - s16(DAT_0064ca82, param_2 * 0x594 + param_1 * 2))))) {
      FUN_00460129(param_2, param_1, param_3, param_4, 0);
    }
  }
  else if ((((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) !== 0) &&
           ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) !== 0)) &&
          (((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0 ||
           ((s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2) < 0 ||
            (0xf < DAT_00655af8 - s16(DAT_0064ca82, param_1 * 0x594 + param_2 * 2))))))) {
    DAT_0063f278 = -1;
    DAT_00626a2c = 1;
    FUN_00511880(0x3d, DAT_006ad30c[DAT_006ad558[param_2] * 0x54], 0, 0, param_1, 0);
    uVar4 = FUN_00493b10(param_2);
    FUN_0040ff60(1, uVar4);
    uVar4 = FUN_00493c7d(param_2);
    FUN_0040ff60(2, uVar4);
    DAT_00635a3c = 0; // &LAB_0040326a — code pointer, no-op
    DAT_0063e4e8 = FUN_00421bb0();
    iVar3 = FUN_00426fb0("PARLEYWAITING", 0x2000001, 0, 0);
    if (DAT_006ad698 === 0) {
      if (DAT_006c91e4 === 0) {
        if (iVar3 === -1) {
          FUN_0046b14d(0x81, DAT_006ad30c[DAT_006ad558[param_2] * 0x54], 0, 0, 0, 0, 0, 0, 0, 0);
          DAT_0067a8c0 = -1;
          DAT_00626a2c = 0;
        }
        else if (DAT_0063f278 < 1) {
          DAT_00635a3c = 0; // &LAB_00403c74
          FUN_00410030("PARLEYGOAWAY", 0, 0);
          DAT_00626a2c = 0;
        }
        else if (DAT_0063f278 === 1) {
          DAT_0063f278 = -1;
          DAT_0067a8c0 = param_2;
          DAT_00635a3c = 0; // &LAB_0040326a
          DAT_0063e4e8 = FUN_00421bb0();
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          FUN_00410030("PARLEYOK", 0, 0);
          if (DAT_006ad698 === 0) {
            if (DAT_006c91e4 === 0) {
              FUN_004b7eb6(param_2, 3);
            }
            else {
              DAT_0067a8c0 = -1;
              DAT_006c91e4 = 0;
              uVar4 = FUN_00493c7d(param_2);
              FUN_0040ff60(0, uVar4);
              DAT_00635a3c = 0; // &LAB_00403c74
              FUN_00410030("PARLEYCANCEL", 0, 0);
              DAT_00626a2c = 0;
            }
          }
          else {
            DAT_0067a8c0 = -1;
            DAT_00635a3c = 0; // &LAB_00403c74
            FUN_00410030("PARLEYBUSY", 0, 0);
            DAT_00626a2c = 0;
          }
        }
        else {
          DAT_00635a3c = 0; // &LAB_00403c74
          FUN_00410030("PARLEYBUSY", 0, 0);
          DAT_00626a2c = 0;
        }
      }
      else {
        DAT_006c91e4 = 0;
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(0, uVar4);
        DAT_00635a3c = 0; // &LAB_00403c74
        FUN_00410030("PARLEYCANCEL", 0, 0);
        DAT_0067a8c0 = -1;
        DAT_00626a2c = 0;
      }
    }
    else {
      DAT_00635a3c = 0; // &LAB_00403c74
      FUN_00410030("PARLEYBUSY", 0, 0);
      DAT_00626a2c = 0;
    }
  }
  if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0) {
    FUN_00467825(param_1, param_2, 0x4000);
  }
  bVar6 = (DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 1) === 0;
  FUN_00467825(param_1, param_2, 0x401);
  if (((((1 << (u8(param_1) & 0x1f) & DAT_00655b0b) === 0) &&
       ((1 << (u8(param_2) & 0x1f) & DAT_00655b0b) === 0)) &&
      (((DAT_00655af8 + param_2 + param_1 & 3) === 0 || (bVar6)))) &&
     ((((DAT_00655af0 & 0x80) === 0 || ((DAT_0064bc60 & 0x8000) === 0)) ||
      ((((param_1 !== 3 || (param_2 !== 1)) && ((param_1 !== 1 || (param_2 !== 3)))) ||
       (4 < DAT_00655af8)))))) {
    iVar3 = FUN_0055cbd5(param_1, param_2);
    if (((((iVar3 === 0) || (iVar3 = FUN_00453e51(param_2, 6), iVar3 !== 0)) ||
         (iVar3 = FUN_00453e51(param_2, 0x18), iVar3 !== 0)) ||
        ((4 < u8(DAT_0064c6b5[param_1 * 0x594]) &&
         ((DAT_0064c6c1[param_1 * 0x594 + param_2 * 4] & 8) === 0)))) &&
       (((iVar3 = FUN_0055cbd5(param_2, param_1), iVar3 === 0 ||
         ((iVar3 = FUN_00453e51(param_1, 6), iVar3 !== 0 ||
          (iVar3 = FUN_00453e51(param_1, 0x18), iVar3 !== 0)))) ||
        ((4 < u8(DAT_0064c6b5[param_2 * 0x594]) &&
         ((DAT_0064c6c1[param_2 * 0x594 + param_1 * 4] & 8) === 0)))))) {
      FUN_0055d1e2(param_1, param_2);
      if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 4) === 0) {
        if ((DAT_00654fa8 === 0) && ((DAT_0064c6c1[param_1 * 0x594 + param_2 * 4] & 8) !== 0)) {
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
        if ((DAT_00654fa8 === 0) && ((DAT_0064c6c1[param_2 * 0x594 + param_1 * 4] & 8) !== 0)) {
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
        if ((DAT_00654fa8 === 0) && ((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          FUN_00410030("ALLYMAKESPEACE", 0, 0);
        }
        else if ((DAT_00654fa8 === 0) &&
                ((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 8) !== 0)) {
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(1, uVar4);
          FUN_00410030("ALLYMAKESPEACE", 0, 0);
        }
        else if ((DAT_00654fa8 === 0) &&
                (((((((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0) ||
                   (iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                  (iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0)) ||
                 (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                  (iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0)))) ||
                ((iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0) ||
                 (DAT_00655b07 !== 0))))) {
          uVar4 = FUN_00493c7d(param_1);
          FUN_0040ff60(0, uVar4);
          uVar4 = FUN_00493c7d(param_2);
          FUN_0040ff60(1, uVar4);
          FUN_00410030("SIGNPEACE", 0, 0);
        }
        FUN_00467825(param_1, param_2, 4);
      }
      else {
        bVar7 = (DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) !== 0;
        bVar1 = false;
        bVar6 = bVar7;
        if ((DAT_00655c22[param_1] === 7) && (3 < u8(DAT_00655c22[param_2]))) {
          bVar6 = false;
          bVar1 = true;
        }
        if ((DAT_00655c22[param_2] === 7) && (3 < u8(DAT_00655c22[param_1]))) {
          bVar6 = false;
          bVar1 = true;
        }
        local_14 = 0;
        local_2c = -1;
        bVar2 = false;
        for (local_28 = 1; local_28 < 8; local_28 = local_28 + 1) {
          if ((local_28 !== param_1) && (local_28 !== param_2)) {
            if (((DAT_0064c6c0[param_1 * 0x594 + local_28 * 4] & 8) === 0) &&
               ((DAT_0064c6c0[param_2 * 0x594 + local_28 * 4] & 8) === 0)) {
              if (((((1 << (u8(local_28) & 0x1f) & DAT_00655b0b) === 0) ||
                   (DAT_00655c22[local_28] !== 7)) || (DAT_00655b08 === 0)) ||
                 ((s16(DAT_0064c708, local_28 * 0x594) < 5 || (DAT_00655af8 < 0xc9)))) {
                bVar2 = false;
              }
              else {
                bVar2 = true;
              }
              if (bVar2) {
                local_2c = local_28;
                break;
              }
              if (DAT_00655b08 !== 0) {
                if (bVar6) {
                  if (((DAT_0064c6c0[param_1 * 0x594 + local_28 * 4] & 4) === 0) &&
                     ((DAT_0064c6c0[param_2 * 0x594 + local_28 * 4] & 4) === 0)) {
                    local_2c = local_28;
                    break;
                  }
                }
                else if (((!bVar1) && (iVar3 = FUN_00467af0(param_1, local_28), iVar3 !== 0)) &&
                        (((u8(DAT_00655c22[param_1]) <= u8(DAT_00655c22[local_28])) &&
                         ((iVar3 = FUN_00467af0(param_2, local_28), iVar3 !== 0 &&
                          (u8(DAT_00655c22[param_2]) <= u8(DAT_00655c22[local_28]))))))) {
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
        if ((((DAT_00655af0 & 0x80) !== 0) && ((DAT_0064bc60 & 0x8000) !== 0)) &&
           ((((param_1 === 6 && (param_2 === 7)) || ((param_1 === 7 && (param_2 === 6)))) &&
            (1 < DAT_00655af8)))) {
          local_2c = 0;
        }
        if ((local_2c < 1) ||
           ((((!bVar2 || (u8(DAT_0064c6be[DAT_00655b03 * 0x594]) < local_14)) &&
             (local_14 !== 0)) && (!bVar6)))) {
          if (((bVar7) && (DAT_00654fa8 === 0)) &&
             (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0 ||
              (((iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0 ||
                (iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0)) ||
               (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                (((iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0 ||
                  (iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0)) ||
                 (DAT_00655b07 !== 0)))))))))) {
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
            if (((((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0) ||
                 (iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                ((iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0 ||
                 (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                  (iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0)))))) ||
               (((iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0 || (DAT_00655b07 !== 0)) ||
                (((1 << (u8(local_2c) & 0x1f) & DAT_00655b0b) !== 0 &&
                  (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 1) !== 0 ||
                   ((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 1) !== 0)))))))) {
              uVar4 = FUN_00493c7d(param_1);
              FUN_0040ff60(0, uVar4);
              uVar4 = FUN_00493c7d(param_2);
              FUN_0040ff60(1, uVar4);
              if ((DAT_00654fa8 === 0) && (bVar2)) {
                iVar3 = FUN_0043d07a(param_3, param_4, param_1, 0xffffffff, param_2);
                if (-1 < iVar3) {
                  FUN_0040ff60(2, DAT_0064f360 + iVar3 * 0x58);
                }
                uVar4 = FUN_00410070(local_2c);
                FUN_0040ff60(3, uVar4);
                FUN_00410030("SIGNNATO", 0, 0);
              }
              else if (DAT_00654fa8 === 0) {
                uVar4 = FUN_00493c7d(local_2c);
                FUN_0040ff60(2, uVar4);
                FUN_00410030("SIGNALLIED", 0, 0);
              }
              local_1c = FUN_0055d685(param_1, local_2c, param_2);
              uVar5 = FUN_0055d685(param_2, local_2c, param_1);
              local_1c = local_1c | uVar5;
            }
            if ((((1 << (u8(local_2c) & 0x1f) & DAT_00655b0b) !== 0) &&
                (iVar3 = FUN_004a7577(local_2c), iVar3 === 0)) && (local_1c === 0)) {
              if ((DAT_0064c6c1[param_1 * 0x594 + local_2c * 4] & 0x20) === 0) {
                FUN_00467825(param_1, local_2c, 0x10000);
              }
              if ((DAT_0064c6c1[param_1 * 0x594 + local_2c * 4] & 0x20) === 0) {
                FUN_00467825(param_2, local_2c, 0x10000);
              }
            }
          }
          FUN_00467825(param_1, param_2, 8);
        }
      }
    }
    else if (((DAT_0064c6c1[param_1 * 0x594 + param_2 * 4] & 0x20) === 0) || (bVar6)) {
      if ((DAT_00654fa8 === 0) && ((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 8) !== 0)) {
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
      else if ((DAT_00654fa8 === 0) &&
              ((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 8) !== 0)) {
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
      else if ((DAT_00654fa8 === 0) &&
              (((((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_1 * 4] & 0x80) !== 0 ||
                 (iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                (iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0)) ||
               (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + param_2 * 4] & 0x80) !== 0 ||
                 (iVar3 = FUN_00453e51(DAT_006d1da0, 0x18), iVar3 !== 0)) ||
                ((iVar3 = FUN_00453e51(DAT_006d1da0, 9), iVar3 !== 0) || (DAT_00655b07 !== 0))))))
      {
        uVar4 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar4);
        uVar4 = FUN_00493c7d(param_2);
        FUN_0040ff60(1, uVar4);
        if (((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 4) === 0) ||
           ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) !== 0)) {
          FUN_00410030("DECLAREWAR", 0, 0);
        }
        else {
          FUN_00410030("CANCELPEACE", 0, 0);
        }
      }
      FUN_00467750(param_1, param_2, 4);
      FUN_00467825(param_1, param_2, 0x2000);
      if ((DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 0x10) !== 0) {
        FUN_00467750(param_1, param_2, 0x10);
        w32(DAT_0064c6c0, param_2 * 4 + param_1 * 0x594,
             u32(DAT_0064c6c0, param_2 * 4 + param_1 * 0x594) | 0x800);
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

  if (((DAT_00655af0 & 0x80) !== 0) && ((DAT_0064bc60 & 0x10) !== 0) &&
     (DAT_0064c6b5[param_1 * 0x594] !== 0)) {
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
  if (((DAT_00655af0 & 1) !== 0) &&
     (bVar1 = DAT_0064c6b0[DAT_00655b03 * 0x594], u8(DAT_00655c22[param_1]) < 6)) {
    if (6 < (bVar1 - u8(DAT_0064c6b0[param_1 * 0x594]))) {
      // C: *(undefined2 *)(&DAT_0064ca80 + param_1 * 0x594) = 0xfffe;
      DAT_0064ca80[param_1 * 0x594] = 0xFE;
      DAT_0064ca80[param_1 * 0x594 + 1] = 0xFF;
    }
    if (8 < (bVar1 - u8(DAT_0064c6b0[param_1 * 0x594]))) {
      // C: *(undefined2 *)(&DAT_0064ca7e + param_1 * 0x594) = 0xffff;
      DAT_0064ca7e[param_1 * 0x594] = 0xFF;
      DAT_0064ca7e[param_1 * 0x594 + 1] = 0xFF;
    }
  }
  // C: *(short *)(&DAT_0064ca74 + param_1 * 0x594) — must read as signed 16-bit
  if ((0 < s16(DAT_0064ca74, param_1 * 0x594)) &&
     (local_8 = 3, u8(DAT_0064c6b5[param_1 * 0x594]) < 6)) {
    local_8 = 1;
  }
  sVar2 = -999;
  local_18 = 1;
  for (local_14 = 1; local_14 <= local_8; local_14 = local_14 + 1) {
    iVar3 = FUN_0055c277(param_1, local_14);
    // C: *(short *)(&DAT_0064ca74 + local_14 * 2 + param_1 * 0x594)
    if ((iVar3 !== 0) && (sVar2 <= s16(DAT_0064ca74, local_14 * 2 + param_1 * 0x594))) {
      sVar2 = s16(DAT_0064ca74, local_14 * 2 + param_1 * 0x594);
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
    if ((local_10 !== param_1) && ((DAT_0064c6c1[local_10 * 4 + param_1 * 0x594] & 0x20) !== 0)) {
      local_14 = local_14 + 1;
    }
  }
  local_10 = 1;
  do {
    if (7 < local_10) {
      return;
    }
    if (((local_10 !== param_1) && ((DAT_0064c6c0[local_10 * 4 + param_1 * 0x594] & 8) !== 0)) &&
       ((u16(DAT_0064c70e, local_10 * 0x594) <= u16(DAT_0064c70e, param_1 * 0x594) || (local_14 === 0)))) {
      for (local_2c = 1; local_2c < 8; local_2c = local_2c + 1) {
        if (((((local_2c !== param_1) && (local_2c !== local_10)) &&
             ((DAT_0064c6c1[local_2c * 4 + local_10 * 0x594] & 0x20) !== 0)) &&
            (((DAT_0064c6c1[local_2c * 4 + local_10 * 0x594] & 2) !== 0 &&
             (u16(DAT_0064c70e, local_10 * 0x594) <= u16(DAT_0064c70e, local_2c * 0x594))))) &&
           (u8(DAT_00655c22[local_10]) <= u8(DAT_00655c22[local_2c]))) {
          local_34 = -1;
          local_c = 0;
          for (local_30 = 0; local_30 < DAT_00655b16; local_30 = local_30 + 1) {
            if (((s32(DAT_0065610a, local_30 * 0x20) !== 0) &&
                (s8(DAT_006560f7[local_30 * 0x20]) === param_1)) &&
               ((s8(DAT_0064b1ca[u8(DAT_006560f6[local_30 * 0x20]) * 0x14]) < 2 &&
                (DAT_0064b1c1[u8(DAT_006560f6[local_30 * 0x20]) * 0x14] === 0)))) {
              iVar3 = s16(DAT_006560f0, local_30 * 0x20);
              iVar4 = s16(DAT_006560f2, local_30 * 0x20);
              iVar5 = FUN_004087c0(iVar3, iVar4);
              if ((((iVar5 === 0) && (iVar5 = FUN_005b8ca6(iVar3, iVar4), -1 < iVar5)) &&
                  (iVar5 = FUN_005b50ad(local_30, 2), 1 < iVar5)) &&
                 ((iVar3 = FUN_005b8a81(iVar3, iVar4),
                  DAT_0064ca32[param_1 * 0x594 + iVar3] === 4 ||
                  ((DAT_0064ca32[param_1 * 0x594 + iVar3] === 5 && (local_14 === 0)))))) {
                cVar1 = s8(DAT_0064b1c4[u8(DAT_006560f6[local_30 * 0x20]) * 0x14]);
                cVar2 = s8(DAT_0064b1c5[u8(DAT_006560f6[local_30 * 0x20]) * 0x14]);
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
            for (local_28 = 0; local_28 < DAT_00655b18; local_28 = local_28 + 1) {
              if ((s32(DAT_0064f394, local_28 * 0x58) !== 0) &&
                 (s8(DAT_0064f348[local_28 * 0x58]) === local_10)) {
                iVar3 = (DAT_0064f340[local_28 * 0x58] | (DAT_0064f340[local_28 * 0x58 + 1] << 8)) << 16 >> 16;
                iVar4 = (DAT_0064f342[local_28 * 0x58] | (DAT_0064f342[local_28 * 0x58 + 1] << 8)) << 16 >> 16;
                iVar5 = FUN_005b8d62(iVar3, iVar4);
                if (((-1 < iVar5) &&
                    ((((DAT_0064f344[local_28 * 0x58] & 0x80) !== 0 &&
                      (iVar5 = FUN_005b8a81(iVar3, iVar4),
                      DAT_0064ca32[local_10 * 0x594 + iVar5] === 1)) &&
                     (iVar5 = FUN_005b4c63(iVar3, iVar4, local_10), iVar5 === 0)))) &&
                   (iVar5 = FUN_0043cf76(
                     (DAT_006560f0[local_34 * 0x20] | (DAT_006560f0[local_34 * 0x20 + 1] << 8)) << 16 >> 16,
                     (DAT_006560f2[local_34 * 0x20] | (DAT_006560f2[local_34 * 0x20 + 1] << 8)) << 16 >> 16),
                   -1 < iVar5)) {
                  FUN_005b319e(local_34, 1);
                  DAT_0064c778[param_1 * 0x594 + u8(DAT_006560f6[local_34 * 0x20])] =
                       DAT_0064c778[param_1 * 0x594 + u8(DAT_006560f6[local_34 * 0x20])] + -1;
                  DAT_006560f7[local_34 * 0x20] = u8(local_10);
                  DAT_00656100[local_34 * 0x20] = u8(local_28);
                  DAT_006560f9[local_34 * 0x20] = 0;
                  DAT_0064c778[local_10 * 0x594 + u8(DAT_006560f6[local_34 * 0x20])] =
                       DAT_0064c778[local_10 * 0x594 + u8(DAT_006560f6[local_34 * 0x20])] + 1;
                  FUN_005b345f(local_34, iVar3, iVar4, 1);
                  FUN_citywin_C679(local_28);
                  FUN_0047cea6(
                    (DAT_0064f340[local_28 * 0x58] | (DAT_0064f340[local_28 * 0x58 + 1] << 8)) << 16 >> 16,
                    (DAT_0064f342[local_28 * 0x58] | (DAT_0064f342[local_28 * 0x58 + 1] << 8)) << 16 >> 16);
                  FUN_citywin_C679(iVar5);
                  FUN_0047cea6(
                    (DAT_0064f340[iVar5 * 0x58] | (DAT_0064f340[iVar5 * 0x58 + 1] << 8)) << 16 >> 16,
                    (DAT_0064f342[iVar5 * 0x58] | (DAT_0064f342[iVar5 * 0x58 + 1] << 8)) << 16 >> 16);
                  if (((1 << (u8(local_2c) & 0x1f) & DAT_00655b0b) !== 0) &&
                     (DAT_00654fa8 === 0)) {
                    uVar6 = FUN_00493c7d(param_1);
                    FUN_0040ff60(0, uVar6);
                    FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[local_34 * 0x20]) * 0x14]);
                    uVar6 = FUN_00493c7d(local_10);
                    FUN_0040ff60(2, uVar6);
                    if (DAT_006d1da0 === local_2c) {
                      FUN_004442e0("MILITARYAID1", local_34);
                    }
                    else if (2 < DAT_00655b02) {
                      FUN_00511880(0x51, DAT_006ad30c[DAT_006ad558[local_2c] * 0x54], 3, 0, local_34, 0);
                    }
                  }
                  if (((1 << (u8(local_10) & 0x1f) & DAT_00655b0b) !== 0) &&
                     (DAT_00654fa8 === 0)) {
                    uVar6 = FUN_00493c7d(param_1);
                    FUN_0040ff60(0, uVar6);
                    FUN_004271e8(1, DAT_0064b1b8[u8(DAT_006560f6[local_34 * 0x20]) * 0x14]);
                    FUN_0040ff60(2, DAT_0064f360 + local_28 * 0x58);
                    uVar6 = FUN_00493c7d(local_2c);
                    FUN_0040ff60(3, uVar6);
                    if (DAT_006d1da0 === local_10) {
                      FUN_004442e0("MILITARYAID2", local_34);
                    }
                    else if (2 < DAT_00655b02) {
                      FUN_00511880(0x52, DAT_006ad30c[DAT_006ad558[local_10] * 0x54], 4, 0, local_34, 0);
                    }
                  }
                  if (DAT_00655b02 < 3) {
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

function FUN_004183d0() { /* stub */ }
function FUN_004fa569() { /* stub */ }
function FUN_00419130() { /* stub */ }
function FUN_0043c460() { /* stub */ }
function FUN_0043c520() { /* stub */ }
function FUN_005bcaa7() { /* stub */ }
function FUN_00407f90() { return 0; }
function FUN_00407fc0() { return 0; }
function FUN_00417ef0() { /* stub */ }
function FUN_0040ef70() { return 0; }
function GetSystemMetrics() { return 0; }
function FUN_005c0034() { /* stub */ }
function FUN_005a9b5d() { /* stub */ }
function FUN_005a99fc() { /* stub */ }
function FUN_004bb800() { /* stub */ }
function FUN_004086c0() { /* stub */ }
function FUN_005cd775() { /* stub */ }
function FUN_005cef31() { /* stub */ }
function FUN_0047df50() { /* stub */ }
function FUN_005f22d0() { /* stub */ }
function FUN_005f22e0() { /* stub */ }
function FUN_004af14b() { /* stub */ }
function FUN_00493d13() { return ""; }
function FUN_0040efd0() { return 0; }
function FUN_005c19ad() { /* stub */ }
function FUN_005c0f57() { /* stub */ }
function FUN_005c0073() { /* stub */ }
function FUN_005c62ee() { return 0; }
function FUN_00408490() { /* stub */ }
function FUN_004083b0() { /* stub */ }
function FUN_0044cba0() { /* stub */ }
function FUN_004083f0() { /* stub */ }
function FUN_00497d00() { /* stub */ }
function FUN_004cff70() { /* stub */ }
function FUN_004502b0() { /* stub */ }
function FUN_0044c5a0() { /* stub */ }
function FUN_00453aa0() { /* stub */ }
function FUN_004a6980() { return 0; }
function FUN_004bb540() { return 0; }
function FUN_00451930() { return 0; }
function FUN_004519b0() { /* stub */ }
function FUN_00451a60() { /* stub */ }
function FUN_00408230() { /* stub */ }
function FUN_004082b0() { /* stub */ }
function FUN_005bb574() { /* stub */ }
function FUN_004085f0() { /* stub */ }
function FUN_004503d0() { /* stub */ }
function FUN_00451900() { /* stub */ }
function FUN_00484d52() { /* stub */ }
function FUN_004080c0() { return 640; }
function FUN_00414bb0() { return 480; }
function FUN_005a9afe() { /* stub */ }
function FUN_005a9780() { /* stub */ }
function FUN_005baeb0() { /* stub */ }
function FUN_005baec8() { /* stub */ }
function FUN_005baee0() { /* stub */ }
function FUN_0043c8d0() { /* stub */ }
function FUN_00408460() { /* stub */ }
function FUN_00410030() { return 0; }
function FUN_004190d0() { /* stub */ }
function FUN_004e4ceb() { /* stub */ }
function strcmp() { return 0; }
function FUN_0059db08() { /* stub */ }
function FUN_0040bbb0() { /* stub */ }
function FUN_00410070() { return ""; }
function FUN_0040bbe0() { /* stub */ }
function FUN_0059edf0() { /* stub */ }
function FUN_0059ea99() { /* stub */ }
function FUN_0040bc80() { return -1; }
function FUN_0059df8a() { /* stub */ }
// FUN_0055ae80 — defined above as exported function
// FUN_0055b046 — defined above as exported function
function FUN_00421da0() { /* stub */ }
function FUN_004c21d5() { /* stub */ }
function FUN_004bf05b() { /* stub */ }
function FUN_00444270() { /* stub */ }
function FUN_citywin_9429() { /* stub */ }
function FUN_004bd9f0() { return 0; }
function FUN_0040ff00() { /* stub */ }
function FUN_0040fe10() { /* stub */ }
function FUN_005ae3bf() { /* stub */ }
function FUN_0040ffa0() { /* stub */ }
function FUN_004087c0() { return 0; }
function FUN_005b8ca6() { return -1; }
function FUN_005b89bb() { return 0; }
function FUN_005b8931() { return 0; }
function FUN_005b898b() { return 0; }
function FUN_005b8a81() { return 0; }
function FUN_005b8d62() { return -1; }
function FUN_0051d7d6() { /* stub */ }
function FUN_00419100() { return 0; }
function FUN_0051d817() { return 0; }
function FUN_005b8b65() { return 0; }
function FUN_005b8b1a() { /* stub */ }
function FUN_0047ce1e() { /* stub */ }
function FUN_0047cea6() { /* stub */ }
function FUN_005ae052() { return 0; }
function FUN_005ae0b0() { return 0; }
function FUN_0059d5f5() { /* stub */ }
function FUN_0059db65() { /* stub */ }
function FUN_00428b0c() { return ""; }
function FUN_00421ea0() { return 0; }
function FUN_004bd9f0_wrapper() { return 0; }
function FUN_005b3d06() { return -1; }
function FUN_0040bc10() { /* stub */ }
function FUN_0040bc40() { /* stub */ }
function FUN_00493c7d() { return ""; }
function FUN_00493b10() { return ""; }
function FUN_00493ba6() { return ""; }
function FUN_0040ff60() { /* stub */ }
function FUN_00413476() { /* stub */ }
function FUN_0047cf9e() { /* stub */ }
function FUN_004897fa() { /* stub */ }
function FUN_0051d75d() { return -1; }
function FUN_00484fec() { return 0; }
function FUN_0056a65e() { /* stub */ }
function FUN_00467580() { /* stub */ }
function FUN_005b2e69() { return -1; }
function FUN_005b47fa() { /* stub */ }
function FUN_00472b0a() { /* stub */ }
function FUN_005b8c42() { return 0; }
function FUN_0043cf76() { return -1; }
function FUN_0043d07a() { return -1; }
function FUN_005b50ad() { return 0; }
function FUN_005b6aea() { return -1; }
function FUN_0040fea0() { /* stub */ }
function FUN_0040fed0() { /* stub */ }
function FUN_005b29aa() { return 0; }
function FUN_00518ec0() { return -1; }
function FUN_0043d20a() { return 0; }
function FUN_0043d289() { /* stub */ }
function FUN_0043c9d0() { /* stub */ }
function FUN_005f22d0_wrapper() { /* stub */ }
function FUN_00421ed0() { return -1; }
function FUN_00421e70() { return -1; }
function FUN_00467750() { /* stub */ }
function FUN_00467825() { /* stub */ }
function FUN_00467af0() { return 0; }
function FUN_004271e8() { /* stub */ }
function FUN_0055c3d3_wrapper() { /* stub */ }
function FUN_004e1763() { /* stub */ }
function FUN_0046e020() { /* stub */ }
function FUN_004904c0() { /* stub */ }
function FUN_0046b14d() { /* stub */ }
function FUN_00511880() { /* stub */ }
function FUN_004eb4ed() { /* stub */ }
function FUN_0040ddc6() { /* stub */ }
function FUN_005adfa0() { return 0; }
function FUN_00453e51() { return 0; }
function FUN_004bdb2c() { return 0; }
function _rand() { return Math.floor(Math.random() * 32768); }
function FUN_004fbe84() { return 1; }
function FUN_00460129() { /* stub */ }
function FUN_0045b0d6() { /* stub */ }
function FUN_004a7577() { return 0; }
function FUN_004b7eb6() { /* stub */ }
function FUN_00426fb0() { return -1; }
function FUN_005b2c82() { return -1; }
function FUN_005b94d5() { return 0; }
function FUN_004ad0d1() { return 0; }
function FUN_0040894c() { /* stub */ }
function FUN_005bd630() { /* stub */ }
function FUN_005bd915() { /* stub */ }
function FUN_005c64da() { /* stub */ }
function FUN_00407ff0() { /* stub */ }
function FUN_005bf5e1() { /* stub */ }
function FUN_005bd65c() { /* stub */ }
function FUN_005c656b() { /* stub */ }
function FUN_00450340() { /* stub */ }
function FUN_004502e0() { /* stub */ }
function FUN_00564713() { return 0; }
function FUN_save_game() { /* stub */ }
function debug_log() { /* stub */ }
function FUN_005d2004() { /* stub */ }
function FUN_005d1f50() { return 0; }
function FUN_00421bb0() { return 0; }
function FUN_0056ac67() { /* stub */ }
function FUN_citywin_994F() { /* stub */ }
function FUN_00437c6f() { /* stub */ }
function FUN_0044f799() { /* stub */ }
function FUN_004f8d51() { /* stub */ }
function FUN_0051ea8e() { return 0; }
function GetAsyncKeyState() { return 0; }
function _memset(buf, val, len) { if (buf && buf.fill) buf.fill(val, 0, len); }
function XD_FlushSendBuffer() { /* stub */ }
function FUN_004b7645() { /* stub */ }
function FUN_004b768d() { /* stub */ }
function FUN_0041033a() { /* stub */ }
function FUN_00484d3b() { /* stub */ }
function FUN_0046e6a9() { /* stub */ }
function FUN_004b0b53() { /* stub */ }
function FUN_004824e3() { /* stub */ }
function SetWindowsHookExA() { return 0; }
function UnhookWindowsHookEx() { /* stub */ }
function FUN_00414d10() { return 0; }
function FUN_00414d40() { /* stub */ }
function FUN_0040ff30() { /* stub */ }
function FUN_0040fe40() { /* stub */ }
function FUN_00421d60() { /* stub */ }
function FUN_005b4c63() { return 0; }
function FUN_005b319e() { /* stub */ }
function FUN_005b345f() { /* stub */ }
function FUN_citywin_C679() { /* stub */ }
function FUN_004442e0() { /* stub */ }
function FUN_005b6787() { /* stub */ }
function FUN_005b49cf() { return 0; }
function FUN_00538a29() { return 0; }
function FUN_005b2c3d() { return 0; }
function FUN_004c5408() { return 0; }
function FUN_005b6458() { return 0; }
function FUN_0047e94e() { /* stub */ }
function FUN_005bb4ae() { /* stub */ }
function FUN_0043c790() { /* stub */ }
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
function FUN_0043cef9() { return 0; }
function FUN_004c195e() { /* stub */ }
function FUN_004c2788() { return 0; }
function FUN_0051d63b() { return -1; }
function FUN_004741be() { /* stub */ }
function FUN_0040ff60_wrapper() { /* stub */ }
function FUN_00421da0_wrapper() { /* stub */ }
function delete_city() { /* stub */ }
function kill_civ() { /* stub */ }
function pick_up_unit_005b319e() { /* stub */ }
