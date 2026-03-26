// ═══════════════════════════════════════════════════════════════════
// block_005E0000.js — Mechanical transpilation of block_005E0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005E0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005E0000.c
//
// This block contains SMEDS32 — MicroProse's multimedia engine:
//   - DirectDraw surface management, palette, DIB creation
//   - AVI video playback (ICM/VFW codec wrappers)
//   - GDI text drawing (8/16/24/32-bit surfaces)
//   - Menu construction/manipulation (Win32 menu API)
//   - Window message dispatch (WndProc chains)
//   - LZW GIF decoder, bitmap/resource loaders
//   - MCI audio/video wrappers
//   - Debug logging (smeds.log)
//
// Nearly ALL functions here are UI/framework (FW category).
// No game-logic (GL) state mutations occur in this block.
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';

// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════

let DAT_006e5020 = 0;        // active dialog/popup instance pointer
let DAT_006e5018 = 0;        // selected item index
let DAT_006e50c4 = 0;        // AVIFileInit'd flag
let DAT_006e4ff0 = 0;        // application hInstance
let DAT_00638d9c = 0;        // menu item ID counter
let DAT_00637ea4 = 0;        // active panel/splitter pointer
let DAT_00637e78 = 0;        // current palette index for text color
let DAT_00638e18 = 0;        // DIB orientation override (-1/0/1)
let DAT_00638e1c = 0;        // bottom-up warning shown flag
let DAT_006394c0 = null;     // DirectDraw interface pointer
let DAT_00638b40 = 0;        // default palette color
let DAT_00638dcc = 0;        // AVI codec initialized flag
let DAT_00638dd0 = 0;        // AVI playback active flag
let DAT_00638dd4 = 0;        // AVI player instance pointer
let DAT_00638dc0 = 0;        // AVI file handle
let DAT_00638dc4 = 0;        // AVI video stream handle
let DAT_00638dc8 = 0;        // AVI audio stream handle
let DAT_00638db0 = 0;        // ICM decompressor handle
let DAT_00638db4 = 0;        // video width
let DAT_00638db8 = 0;        // video height
let DAT_00638da8 = null;     // decompression buffer pointer
let DAT_00638dac = 0;        // decompression buffer size
let DAT_00638de8 = 0;        // frame dirty flag
let DAT_00637efc = 0;        // video playing flag
let DAT_006e50c8 = 0;        // dest rect left
let DAT_006e50cc = 0;        // dest rect top
let DAT_00638dd8 = 0;        // dirty rect left
let DAT_00638ddc = 0;        // dirty rect top
let DAT_00638de0 = 0;        // dirty rect right
let DAT_00638de4 = 0;        // dirty rect bottom
let DAT_00639d0c = null;     // MCI palette handle
let DAT_00639be8 = '\0';     // log file enabled flag
let DAT_006e5368 = 0;        // menu search depth counter
let DAT_00639d74 = 0;        // last active window param
let DAT_006e5224 = 0;        // text color R
let DAT_006e5225 = 0;        // text color G
let DAT_006e5226 = 0;        // text color B
let _DAT_006e5098 = 0;       // AVI format struct fields (overlapping globals)
let _DAT_006e509c = 0;
let _DAT_006e50a0 = 0;
let _DAT_006e50a4 = 0;
let _DAT_006e50a8 = 0;
let _DAT_006e50ac = 0;
let _DAT_006e50bc = 0;
let _DAT_006e5028 = 0;
let _DAT_006e502c = 0;
let _DAT_006e5030 = 0;
let _DAT_006e5034 = 0;
let _DAT_006e5038 = 0;
let _DAT_006e503c = 0;
let _DAT_006e5064 = 0;
let _DAT_006e50d0 = 0;
let _DAT_006e50d4 = 0;
let _DAT_006e50d8 = 0;
let _DAT_006e50dc = 0;
let _DAT_00638dbc = 0;
let _DAT_00638dec = 0;
let _DAT_006e50e8 = 0;
let _DAT_006e5228 = 0;
let DAT_006e50ec = 0;
let DAT_006e50ee = 0;
let DAT_006e50ef = 0;
let PTR_DAT_00637e5c = null;  // current font pointer
let PTR_DAT_00637e64 = null;  // list control vtable pointer
let DAT_006397e8 = [];         // key scancode → virtual key map (256 entries)


// ═══════════════════════════════════════════════════════════════════
// FUN_005e00bb — dialog ok/cancel handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e00bb(param_1) {
  if (param_1 === 0x65) {
    CRichEditDoc_InvalidateObjectCache(DAT_006e5020 + 0x48);
  } else if (param_1 === 0x66) {
    DAT_006e5018 = 0xffffffff;
    CRichEditDoc_InvalidateObjectCache(DAT_006e5020 + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e010a — set selected item index
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e010a(param_1, param_2) {
  DAT_006e5018 = param_2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0122 — set selected item and invalidate
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0122(param_1, param_2) {
  DAT_006e5018 = param_2;
  CRichEditDoc_InvalidateObjectCache(DAT_006e5020 + 0x48);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0148 — measure multiline text (underscore-delimited)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0148(param_1, param_2) {
  let uVar1;
  let local_98 = 1;
  let local_c = 0;
  let local_8 = 0;
  let local_90 = new Array(128).fill(0);
  let local_94 = 0; // index into param_1
  while (param_1[local_94] !== 0) {
    if (param_1[local_94] === 0x5F) { // '_'
      local_90[local_c] = 0;
      uVar1 = FUN_004d8af0(local_90);
      let local_10 = measure_text_858E(uVar1);
      if (local_8 < local_10) {
        local_8 = local_10;
      }
      local_c = 0;
      local_98 = local_98 + 1;
    }
    local_90[local_c] = param_1[local_94];
    local_c = local_c + 1;
    local_94 = local_94 + 1;
  }
  param_2[0] = local_8;
  return local_98;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0215 — measure text lines needed
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0215(param_1, param_2) {
  let uVar1 = FUN_004d8af0(param_1);
  let iVar2 = measure_text_858E(uVar1);
  return (iVar2 / param_2 | 0) + 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0248 — show text popup (no parent)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0248(param_1, param_2) {
  FUN_005e026a(param_1, param_2, 0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e026a — show text popup dialog (full setup)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e026a(param_1, param_2, param_3) {
  // DEVIATION: Win32 API — large UI dialog setup, no game logic
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0802 — cleanup helper (thunk)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0802() {
  FUN_004bb740();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e080e — cleanup helper (thunk)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e080e() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e081a — cleanup helper (thunk)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e081a() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0826 — cleanup helper (thunk)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0826() {
  FUN_0044cba0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0832 — cleanup helper (thunk)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0832() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e083e — cleanup helper (thunk)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e083e() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0854 — SEH frame restore (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005E0000.c FUN_005e0854 (15 bytes)
export function FUN_005e0854() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0863 — show modal dialog (advisor/help style)
// Source: decompiled/block_005E0000.c FUN_005e0863 (442 bytes)
export function FUN_005e0863() {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a31 — dialog cleanup thunk
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0a31() {
  FUN_00418870();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a3a — dialog cleanup thunk
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0a3a() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a46 — dialog cleanup thunk
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0a46() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a52 — dialog cleanup thunk
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0a52() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a5e — dialog cleanup thunk
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0a5e() {
  FUN_0044cba0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a6a — dialog cleanup thunk
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0a6a() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a80 — SEH frame restore (no-op)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005E0000.c FUN_005e0a80 (15 bytes)
export function FUN_005e0a80() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0a8f — show messagebox wrapper (3 params)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0a8f(param_1, param_2, param_3) {
  show_messagebox_EEB0(param_1, param_2, param_3);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0ab3 — show messagebox wrapper (4 params)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0ab3(param_1, param_2, param_3, param_4) {
  show_messagebox_F0B9(param_1, param_2, param_3, param_4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0adb — show popup wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0adb(param_1) {
  FUN_005bbb5a(param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0af7 — point-in-rect test
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0af7(param_1, param_2, param_3) {
  if (param_2 < param_1[0] || param_1[2] < param_2 || param_3 < param_1[1] || param_1[3] < param_3) {
    return 0;
  }
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0b50 — random number in range [0, param_1)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0b50(param_1) {
  let iVar1 = _rand(); // C: _rand() — deterministic LCG PRNG
  return ((iVar1 * param_1 + ((iVar1 * param_1 >> 0x1f) & 0x7FFF)) >> 0xf) | 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0b80 — byte swap (LE/BE)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0b80(param_1) {
  return ((param_1 & 0xFF) << 8) | ((param_1 >> 8) & 0xFF);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0ba0 — get object field at offset 0x38
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0ba0(in_ECX) {
  return in_ECX[0x38 / 4];
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0bc0 — init list control widget
// Source: decompiled/block_005E0000.c FUN_005e0bc0 (194 bytes)
export function FUN_005e0bc0(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0c90 — set color index on surface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0c90(param_1, uVar1) {
  uVar1 = FUN_005e0cc0();
  FUN_005e9944(param_1, uVar1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0cc0 — get first field of ECX object
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0cc0(in_ECX) {
  return in_ECX ? in_ECX[0] : 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0ce0 — recursive menu builder from format string
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0ce0(param_1, param_2) {
  // Win32 menu parsing — DEVIATION: Win32 API
  return param_2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0f2a — create menu bar from format string
// Source: decompiled/block_005E0000.c FUN_005e0f2a (376 bytes)
export function FUN_005e0f2a(param_1) {
  // DEVIATION: Win32 — CreateMenu + menu construction
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10a2 — load menu resource
// Source: decompiled/block_005E0000.c FUN_005e10a2 (37 bytes)
export function FUN_005e10a2(param_1) {
  // DEVIATION: Win32 — LoadMenuA resource
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10c7 — destroy menu
// Source: decompiled/block_005E0000.c FUN_005e10c7 (36 bytes)
export function FUN_005e10c7(param_1) {
  // DEVIATION: Win32 — DestroyMenu
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10eb — empty function (no-op)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005E0000.c FUN_005e10eb (16 bytes)
export function FUN_005e10eb() {
  // C: return; (truly empty function)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10fb — draw menu bar
// Source: decompiled/block_005E0000.c FUN_005e10fb (29 bytes)
export function FUN_005e10fb(param_1) {
  // DEVIATION: Win32 — DrawMenuBar
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1118 — enable/disable menu item by position
// Source: decompiled/block_005E0000.c FUN_005e1118 (166 bytes)
export function FUN_005e1118(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — EnableMenuItem
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e11be — check/uncheck menu item
// Source: decompiled/block_005E0000.c FUN_005e11be (104 bytes)
export function FUN_005e11be(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — CheckMenuItem
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1226 — remove/delete menu item
// Source: decompiled/block_005E0000.c FUN_005e1226 (102 bytes)
export function FUN_005e1226(param_1, param_2, param_3) {
  // DEVIATION: Win32 — DeleteMenu/RemoveMenu
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_128C — insert menu item with auto column break
// Source: decompiled/block_005E0000.c build_menu_128C (293 bytes)
export function build_menu_128C(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — InsertMenuA
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_13B1 — insert menu item with explicit ID
// Source: decompiled/block_005E0000.c build_menu_13B1 (279 bytes)
export function build_menu_13B1(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — InsertMenuA
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e14c8 — modify menu item text
// Source: decompiled/block_005E0000.c FUN_005e14c8 (130 bytes)
export function FUN_005e14c8(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — ModifyMenuA
}

// ═══════════════════════════════════════════════════════════════════
// show_popup_menu_154A — show popup/context menu
// Source: decompiled/block_005E0000.c show_popup_menu_154A (79 bytes)
export function show_popup_menu_154A(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — TrackPopupMenu
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1599 — get submenu by index
// Source: decompiled/block_005E0000.c FUN_005e1599 (48 bytes)
export function FUN_005e1599(param_1, param_2) {
  // DEVIATION: Win32 — GetSubMenu
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e15ce — enable/disable menu item by command ID
// Source: decompiled/block_005E0000.c FUN_005e15ce (75 bytes)
export function FUN_005e15ce(param_1, param_2, param_3) {
  // DEVIATION: Win32 — EnableMenuItem
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1619 — check/uncheck menu item by command ID
// Source: decompiled/block_005E0000.c FUN_005e1619 (75 bytes)
export function FUN_005e1619(param_1, param_2, param_3) {
  // DEVIATION: Win32 — CheckMenuItem
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1664 — delete menu item by command ID
// Source: decompiled/block_005E0000.c FUN_005e1664 (42 bytes)
export function FUN_005e1664(param_1, param_2) {
  // DEVIATION: Win32 — DeleteMenu/RemoveMenu
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e168e — modify menu item text by command ID
// Source: decompiled/block_005E0000.c FUN_005e168e (50 bytes)
export function FUN_005e168e(param_1, param_2, param_3) {
  // DEVIATION: Win32 — ModifyMenuA
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e16c0 — empty function (no-op)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005E0000.c FUN_005e16c0 (16 bytes)
export function FUN_005e16c0() {
  // C: return; (truly empty function)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e16d0 — empty function (no-op)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005E0000.c FUN_005e16d0 (16 bytes)
export function FUN_005e16d0() {
  // C: return; (truly empty function)
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_16E0 — append menu item to submenu with column break
// Source: decompiled/block_005E0000.c build_menu_16E0 (136 bytes)
export function build_menu_16E0(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — AppendMenuA
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_1768 — append menu item with column break
// Source: decompiled/block_005E0000.c build_menu_1768 (115 bytes)
export function build_menu_1768(param_1, param_2, param_3) {
  // DEVIATION: Win32 — AppendMenuA
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e17db — delete menu item by command (duplicate of 1664)
// Source: decompiled/block_005E0000.c FUN_005e17db (42 bytes)
export function FUN_005e17db(param_1, param_2) {
  // DEVIATION: Win32 — DeleteMenu/RemoveMenu
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_1805 — append separator to menu
// Source: decompiled/block_005E0000.c build_menu_1805 (111 bytes)
export function build_menu_1805(param_1) {
  // DEVIATION: Win32 — AppendMenuA
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1880 — set window long (timer proc install)
// Source: decompiled/block_005E0000.c FUN_005e1880 (55 bytes)
export function FUN_005e1880(param_1, param_2) {
  // DEVIATION: Win32 — SetWindowLongA
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e18b7 — set timer
// Source: decompiled/block_005E0000.c FUN_005e18b7 (39 bytes)
export function FUN_005e18b7(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SetTimer
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e18de — kill timer
// Source: decompiled/block_005E0000.c FUN_005e18de (33 bytes)
export function FUN_005e18de(param_1, param_2) {
  // DEVIATION: Win32 — KillTimer
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e18ff — main window WndProc (paint, resize, close)
// Source: decompiled/block_005E0000.c FUN_005e18ff (861 bytes)
export function FUN_005e18ff(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — SetWindowLongA
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1c70 — render AVI frame (current player instance)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1c70() {
  FUN_005e2cd1(DAT_00638dd4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1c8e — open AVI file for playback
// Source: decompiled/block_005E0000.c FUN_005e1c8e (1631 bytes)
export function FUN_005e1c8e(param_1, param_2) {
  // DEVIATION: Win32 — AVI file open + codec setup
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e22ed — start AVI playback
// Source: decompiled/block_005E0000.c FUN_005e22ed (543 bytes)
export function FUN_005e22ed(param_1) {
  // DEVIATION: Win32 — ICM decompression message
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e250c — ICDecompressEx begin wrapper
// Source: decompiled/block_005E0000.c FUN_005e250c (119 bytes)
export function FUN_005e250c(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14) {
  // DEVIATION: Win32 — ICM decompression message
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2583 — ICDecompressEx query wrapper
// Source: decompiled/block_005E0000.c FUN_005e2583 (119 bytes)
export function FUN_005e2583(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14) {
  // DEVIATION: Win32 — ICM decompression message
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e25fa — play AVI range
// Source: decompiled/block_005E0000.c FUN_005e25fa (123 bytes)
export function FUN_005e25fa(param_1, param_2, param_3) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2675 — stop AVI playback
// Source: decompiled/block_005E0000.c FUN_005e2675 (129 bytes)
export function FUN_005e2675(param_1) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e26f6 — reset AVI to beginning
// Source: decompiled/block_005E0000.c FUN_005e26f6 (163 bytes)
export function FUN_005e26f6(param_1) {
  // DEVIATION: Win32 — AVI playback control
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2799 — close/cleanup AVI resources
// Source: decompiled/block_005E0000.c FUN_005e2799 (308 bytes)
export function FUN_005e2799(param_1) {
  // DEVIATION: Win32 — AVI/ICM resource cleanup
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e28cd — seek AVI to specific frame
// Source: decompiled/block_005E0000.c FUN_005e28cd (202 bytes)
export function FUN_005e28cd(param_1, param_2, param_3) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// show_messagebox_2997 — decompress and display AVI frame
// Source: decompiled/block_005E0000.c show_messagebox_2997 (702 bytes)
export function show_messagebox_2997(param_1, param_2) {
  // DEVIATION: Win32 — MessageBoxA dialog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2c5a — ICDecompressEx wrapper
// Source: decompiled/block_005E0000.c FUN_005e2c5a (119 bytes)
export function FUN_005e2c5a(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14) {
  // DEVIATION: Win32 — ICM decompression message
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2cd1 — AVI frame timer/sync handler
// Source: decompiled/block_005E0000.c FUN_005e2cd1 (976 bytes)
export function FUN_005e2cd1(param_1) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e30a1 — update AVI palette from codec
// Source: decompiled/block_005E0000.c FUN_005e30a1 (529 bytes)
export function FUN_005e30a1(param_1) {
  // DEVIATION: Win32 — ICM decompression message
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e32b2 — set AVI display mode (normal/doubled)
// Source: decompiled/block_005E0000.c FUN_005e32b2 (666 bytes)
export function FUN_005e32b2(param_1, param_2) {
  // DEVIATION: Win32 — ICM decompression message
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3550 — call video-end callback (vtable dispatch)
// Source: decompiled/block_005E0000.c FUN_005e3550 (47 bytes)
export function FUN_005e3550(in_ECX) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3580 — call frame-reached callback (vtable dispatch)
// Source: decompiled/block_005E0000.c FUN_005e3580 (47 bytes)
export function FUN_005e3580(in_ECX) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_35B0 — create 8-bit DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_35B0(param_1) {
  // DEVIATION: Win32 — GDI/DirectDraw API
  // Win32 CreateDIBSection (8-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3877 — set DIB orientation override
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3877(param_1) {
  DAT_00638e18 = param_1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e388f — destroy DIB surface
// Source: decompiled/block_005E0000.c FUN_005e388f (155 bytes)
export function FUN_005e388f(param_1) {
  // DEVIATION: Win32 — GDI resource cleanup
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e392a — get DIB stride (field at offset 0x20)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e392a(param_1) {
  if (param_1 === 0) return 0;
  return param_1[0x20 / 4];
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e395a — check if DIB is top-down (field 0x14 === 1)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e395a(param_1) {
  return param_1[0x14 / 4] === 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3988 — flip DIB vertically
// Source: decompiled/block_005E0000.c FUN_005e3988 (249 bytes)
export function FUN_005e3988(param_1) {
  // DEVIATION: Win32 — memory copy/set operations
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3a81 — get DIB bits pointer (field 0x24)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3a81(param_1) {
  if (param_1 === 0) return 0;
  return param_1[0x24 / 4];
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3aa8 — returns 0 (DEVIATION: Win32 API)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005E0000.c FUN_005e3aa8 (35 bytes)
export function FUN_005e3aa8() {
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3ACB — read DIB color table entries
// Source: decompiled/block_005E0000.c handle_colortable_3ACB (129 bytes)
export function handle_colortable_3ACB(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — GetDIBColorTable
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3B4C — write DIB color table entries
// Source: decompiled/block_005E0000.c handle_colortable_3B4C (144 bytes)
export function handle_colortable_3B4C(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — SetDIBColorTable
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3bdc — set full 256-entry color table
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3bdc(param_1, param_2) {
  handle_colortable_3B4C(param_1, param_2, 0, 0x100);
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3C03 — set DIB color table from HPALETTE
// Source: decompiled/block_005E0000.c handle_colortable_3C03 (177 bytes)
export function handle_colortable_3C03(param_1, param_2) {
  // DEVIATION: Win32 — GetPaletteEntries + SetDIBColorTable
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3cb4 — draw string on 8-bit DIB surface
// Source: decompiled/block_005E0000.c FUN_005e3cb4 (534 bytes)
export function FUN_005e3cb4(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — GetDIBColorTable
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3ECA — draw formatted text on 8-bit DIB
// Source: decompiled/block_005E0000.c handle_colortable_3ECA (289 bytes)
export function handle_colortable_3ECA(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — GetDIBColorTable
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3FEB — draw single-line text on 8-bit DIB
// Source: decompiled/block_005E0000.c handle_colortable_3FEB (272 bytes)
export function handle_colortable_3FEB(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — GetDIBColorTable
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_40FB — draw line on 8-bit DIB
// Source: decompiled/block_005E0000.c handle_colortable_40FB (191 bytes)
export function handle_colortable_40FB(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — GetDIBColorTable
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_41BA — create 16-bit (555) DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_41BA(param_1) {
  // DEVIATION: Win32 — GDI/DirectDraw API
  // Win32 CreateDIBSection (16-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_43C5 — create 24-bit DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_43C5(param_1) {
  // DEVIATION: Win32 — GDI/DirectDraw API
  // Win32 CreateDIBSection (24-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_45B5 — create 32-bit DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_45B5(param_1) {
  // DEVIATION: Win32 — GDI/DirectDraw API
  // Win32 CreateDIBSection (32-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e47a5 — draw string with explicit RGB on DIB
// Source: decompiled/block_005E0000.c FUN_005e47a5 (507 bytes)
export function FUN_005e47a5(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) {
  // DEVIATION: Win32 — GDI text drawing with color
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e49a0 — draw formatted text with explicit RGB
// Source: decompiled/block_005E0000.c FUN_005e49a0 (262 bytes)
export function FUN_005e49a0(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — GDI text drawing with color
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4aa6 — draw single-line text with explicit RGB
// Source: decompiled/block_005E0000.c FUN_005e4aa6 (245 bytes)
export function FUN_005e4aa6(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — GDI text drawing with color
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4b9b — draw line with explicit RGB on DIB
// Source: decompiled/block_005E0000.c FUN_005e4b9b (164 bytes)
export function FUN_005e4b9b(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — GDI line drawing
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4c3f — fill rect with solid brush (RGB)
// Source: decompiled/block_005E0000.c FUN_005e4c3f (137 bytes)
export function FUN_005e4c3f(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — GDI FillRect
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4cc8 — get pixel value for RGB on surface
// Source: decompiled/block_005E0000.c FUN_005e4cc8 (141 bytes)
export function FUN_005e4cc8(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — GDI pixel operations
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4d60 — LZW GIF decompressor setup
// Source: decompiled/block_005E0000.c FUN_005e4d60 (250 bytes)
export function FUN_005e4d60(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4e60 — fill rect on 8-bit raw buffer
// Source: decompiled/block_005E0000.c FUN_005e4e60 (152 bytes)
export function FUN_005e4e60(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4ef8 — fill rect on 16-bit raw buffer
// Source: decompiled/block_005E0000.c FUN_005e4ef8 (163 bytes)
export function FUN_005e4ef8(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4f9b — copy rect between 8-bit raw buffers
// Source: decompiled/block_005E0000.c FUN_005e4f9b (187 bytes)
export function FUN_005e4f9b(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5056 — copy rect between 16-bit raw buffers
// Source: decompiled/block_005E0000.c FUN_005e5056 (198 bytes)
export function FUN_005e5056(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e511c — transpose pixel copy (column → row)
// Source: decompiled/block_005E0000.c FUN_005e511c (114 bytes)
export function FUN_005e511c(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e518e — sprite blit with transparency (8-bit, RLE)
// Source: decompiled/block_005E0000.c FUN_005e518e (305 bytes)
export function FUN_005e518e(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14, param_15, param_16) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e52bf — sprite blit mask fill (8-bit, RLE)
// Source: decompiled/block_005E0000.c FUN_005e52bf (308 bytes)
export function FUN_005e52bf(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14, param_15, param_16, param_17) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e53f3 — LZW GIF decode core
// Source: decompiled/block_005E0000.c FUN_005e53f3 (1142 bytes)
export function FUN_005e53f3(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5869 — fill horizontal line on raw buffer
// Source: decompiled/block_005E0000.c FUN_005e5869 (126 bytes)
export function FUN_005e5869(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e58e7 — fill vertical line on raw buffer
// Source: decompiled/block_005E0000.c FUN_005e58e7 (83 bytes)
export function FUN_005e58e7(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e593a — copy with palette offset (top-down)
// Source: decompiled/block_005E0000.c FUN_005e593a (121 bytes)
export function FUN_005e593a(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e59b3 — copy with palette offset (bottom-up)
// Source: decompiled/block_005E0000.c FUN_005e59b3 (134 bytes)
export function FUN_005e59b3(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5a39 — RLE decode with palette offset (top-down)
// Source: decompiled/block_005E0000.c FUN_005e5a39 (229 bytes)
export function FUN_005e5a39(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5b1e — RLE decode with palette offset (bottom-up)
// Source: decompiled/block_005E0000.c FUN_005e5b1e (242 bytes)
export function FUN_005e5b1e(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5c10 — 16-bit RLE decode with palette offset (top-down)
// Source: decompiled/block_005E0000.c FUN_005e5c10 (319 bytes)
export function FUN_005e5c10(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5d4f — 16-bit RLE decode with palette offset (bottom-up)
// Source: decompiled/block_005E0000.c FUN_005e5d4f (332 bytes)
export function FUN_005e5d4f(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5ea0 — init DirectDraw surface object
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5ea0(in_ECX) {
  // DDSurface init — DEVIATION: Win32 API
  return in_ECX;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5ee0 — DDSurface destructor (no-op body)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005E0000.c FUN_005e5ee0 (22 bytes)
export function FUN_005e5ee0() {
  // C: return; (truly empty function)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5ef6 — release DDSurface
// Source: decompiled/block_005E0000.c FUN_005e5ef6 (130 bytes)
export function FUN_005e5ef6(in_ECX) {
  // DEVIATION: Win32 — C++ memory management
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5f78 — create DDSurface from width/height
// Source: decompiled/block_005E0000.c FUN_005e5f78 (60 bytes)
export function FUN_005e5f78(param_1, param_2) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5fb4 — create DDSurface from rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5fb4(param_1) {
  FUN_005e6018(param_1, 0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5fda — create DDSurface with system memory flag
// Source: decompiled/block_005E0000.c FUN_005e5fda (62 bytes)
export function FUN_005e5fda(param_1, param_2, param_3) {
  // DEVIATION: Win32 — framework API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6018 — create offscreen DDSurface (full)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6018(param_1, param_2) {
  // DDSurface create full — DEVIATION: Win32 API
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6188 — lock DDSurface for pixel access
// Source: decompiled/block_005E0000.c FUN_005e6188 (97 bytes)
export function FUN_005e6188(in_ECX) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e61e9 — restore lost DDSurface
// Source: decompiled/block_005E0000.c FUN_005e61e9 (92 bytes)
export function FUN_005e61e9(in_ECX) {
  // DEVIATION: Win32 — vtable callback dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6245 — RGB to 16-bit 565 pixel
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6245(param_1, param_2, param_3) {
  return (((param_1 & 0xFF) << 8) | ((param_3 & 0xFF) >> 3)) & 0xF8FF | ((param_2 & 0xFC) << 3);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e626c — RGB to 16-bit 555 pixel
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e626c(param_1, param_2, param_3) {
  return (((param_1 & 0xF8) >> 1) << 8) | ((param_3 & 0xFF) >> 3) | ((param_2 & 0xF8) << 2);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6297 — create DDSurface from primary (flip chain)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6297(param_1, param_2) {
  // DEVIATION: Win32 — GDI/DirectDraw API
  // DDSurface from primary — DEVIATION: Win32 API
  return false;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e635f — attach existing DDSurface pointer
// Source: decompiled/block_005E0000.c FUN_005e635f (241 bytes)
export function FUN_005e635f(param_1, param_2, param_3) {
  // DEVIATION: Win32 — C++ memory management
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6450 — reset DDSurface dimensions and clip
// Source: decompiled/block_005E0000.c FUN_005e6450 (278 bytes)
export function FUN_005e6450(param_1) {
  // DEVIATION: Win32 — C++ memory management
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6566 — create DDSurface from rect (wrapper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6566(param_1) {
  FUN_005e5fb4(param_1);
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e658a — get pixel value from DDSurface
// Source: decompiled/block_005E0000.c FUN_005e658a (103 bytes)
export function FUN_005e658a(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e65f1 — set pixel value on DDSurface
// Source: decompiled/block_005E0000.c FUN_005e65f1 (96 bytes)
export function FUN_005e65f1(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6651 — load bitmap resource into DDSurface
// Source: decompiled/block_005E0000.c FUN_005e6651 (578 bytes)
export function FUN_005e6651(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — memory copy/set operations
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6893 — load GIF resource into DDSurface
// Source: decompiled/block_005E0000.c FUN_005e6893 (818 bytes)
export function FUN_005e6893(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6bc5 — load CvPic resource into DDSurface
// Source: decompiled/block_005E0000.c FUN_005e6bc5 (391 bytes)
export function FUN_005e6bc5(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6d4c — load 24-bit bitmap as 16-bit DDSurface
// Source: decompiled/block_005E0000.c FUN_005e6d4c (453 bytes)
export function FUN_005e6d4c(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6f25 — set DDSurface fill color
// Source: decompiled/block_005E0000.c FUN_005e6f25 (50 bytes)
export function FUN_005e6f25(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6f57 — reset clip rect to full surface
// Source: decompiled/block_005E0000.c FUN_005e6f57 (63 bytes)
export function FUN_005e6f57(in_ECX) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6f96 — set clip rect (intersected with full rect)
// Source: decompiled/block_005E0000.c FUN_005e6f96 (91 bytes)
export function FUN_005e6f96(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6ff1 — get current clip rect
// Source: decompiled/block_005E0000.c FUN_005e6ff1 (55 bytes)
export function FUN_005e6ff1(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e7028 — compute pixel address in DDSurface
// Source: decompiled/block_005E0000.c FUN_005e7028 (42 bytes)
export function FUN_005e7028(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e7052 — fill rect on DDSurface (clipped)
// Source: decompiled/block_005E0000.c FUN_005e7052 (133 bytes)
export function FUN_005e7052(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e70d7 (43 bytes)
export function FUN_005e70d7(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7102 (308 bytes)
export function FUN_005e7102(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7257 (51 bytes)
export function FUN_005e7257(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e728a (198 bytes)
export function FUN_005e728a(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7355 (290 bytes)
export function FUN_005e7355(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e747c (76 bytes)
export function FUN_005e747c(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e74c8 (198 bytes)
export function FUN_005e74c8(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7593 (76 bytes)
export function FUN_005e7593(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e75df (254 bytes)
export function FUN_005e75df(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e76dd (272 bytes)
export function FUN_005e76dd(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e77ed (217 bytes)
export function FUN_005e77ed(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e78c6 (235 bytes)
export function FUN_005e78c6(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e79b1 (127 bytes)
export function FUN_005e79b1(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7a30 (94 bytes)
export function FUN_005e7a30(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7a8e (266 bytes)
export function FUN_005e7a8e(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7b98 (284 bytes)
export function FUN_005e7b98(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7cb4 (229 bytes)
export function FUN_005e7cb4(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7d99 (247 bytes)
export function FUN_005e7d99(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7e90 (139 bytes)
export function FUN_005e7e90(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7f1b (106 bytes)
export function FUN_005e7f1b(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e7f85 (232 bytes)
export function FUN_005e7f85(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e806d (181 bytes)
export function FUN_005e806d(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e8122 (244 bytes)
export function FUN_005e8122(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e8216 (229 bytes)
export function FUN_005e8216(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — object method dispatch
}

// CReObject — MFC CReObject constructor
// Source: decompiled/block_005E0000.c CReObject (64 bytes)
export function CReObject(obj) {
  // DEVIATION: MFC — CReObject::CReObject constructor
  // C: *(uint*)(this) = 0; *(uint*)(this+0x20) = 0; *(uint*)(this+0x24) = 0; *(uint*)(this+0x28) = 0;
  if (obj) {
    obj[0] = 0;
    obj[0x20 / 4] = 0;
    obj[0x24 / 4] = 0;
    obj[0x28 / 4] = 0;
  }
  return obj;
}

// Source: decompiled/block_005E0000.c FUN_005e833b (141 bytes)
export function FUN_005e833b() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e83c8 (57 bytes)
export function FUN_005e83c8() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e8401 (619 bytes)
export function FUN_005e8401(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e866c (134 bytes)
export function FUN_005e866c(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e86f2 (71 bytes)
export function FUN_005e86f2(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e8739 (105 bytes)
export function FUN_005e8739() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e87a2 (484 bytes)
export function FUN_005e87a2(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005e8990 (50 bytes)
export function FUN_005e8990(param_1, param_2, param_3) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c register_wndclass_89D0 (308 bytes)
export function register_wndclass_89D0() {
  // DEVIATION: Win32 — RegisterClassA
}

// Source: decompiled/block_005E0000.c FUN_005e8b04 (80 bytes)
export function FUN_005e8b04() {
  // DEVIATION: Win32 — COM vtable call
}

// Source: decompiled/block_005E0000.c FUN_005e8b54 (213 bytes)
export function FUN_005e8b54(param_1, param_2, param_3) {
  // DEVIATION: Win32 — palette operations
}

// Source: decompiled/block_005E0000.c FUN_005e8c29 (43 bytes)
export function FUN_005e8c29(param_1) {
  // DEVIATION: Win32 — COM vtable call
}

// Source: decompiled/block_005E0000.c FUN_005e8c54 (260 bytes)
export function FUN_005e8c54(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — COM vtable call
}

// Source: decompiled/block_005E0000.c FUN_005e8d58 (174 bytes)
export function FUN_005e8d58(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — COM vtable call
}

// Source: decompiled/block_005E0000.c FUN_005e8e06 (73 bytes)
export function FUN_005e8e06(param_1, param_2) {
  // DEVIATION: Win32 — COM vtable call
}

// FUN_005e8e4f — get DDSurface palette
// Source: decompiled/block_005E0000.c FUN_005e8e4f (97 bytes)
export function FUN_005e8e4f(param_1) {
  // DEVIATION: Win32 — DDSurface GetPalette via COM vtable
  return 0;
}

// FUN_005e8eb0 — create primary DDSurface
// Source: decompiled/block_005E0000.c FUN_005e8eb0 (155 bytes)
export function FUN_005e8eb0(param_1) {
  // DEVIATION: Win32 — DDraw CreatePrimarySurface via COM vtable
  return 0;
}

// FUN_005e8f4b — get attached back buffer
// Source: decompiled/block_005E0000.c FUN_005e8f4b (108 bytes)
export function FUN_005e8f4b(param_1) {
  // DEVIATION: Win32 — DDraw GetAttachedSurface (back buffer) via COM vtable
  return 0;
}

// FUN_005e8fb7 — create offscreen DDSurface (low-level)
// Source: decompiled/block_005E0000.c FUN_005e8fb7 (180 bytes)
export function FUN_005e8fb7(param_1, param_2) {
  // DEVIATION: Win32 — DDraw CreateOffscreenSurface via COM vtable
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005e906b (38 bytes)
export function FUN_005e906b(param_1) {
  // DEVIATION: Win32 — COM vtable call
}

// FUN_005e9091 — restore lost DDSurface
// Source: decompiled/block_005E0000.c FUN_005e9091 (122 bytes)
export function FUN_005e9091(param_1) {
  // DEVIATION: Win32 — DDSurface Restore via COM vtable
  return 0;
}

// FUN_005e910b — get DDSurface pitch
// Source: decompiled/block_005E0000.c FUN_005e910b (69 bytes)
export function FUN_005e910b(param_1) {
  // DEVIATION: Win32 — DDSurface GetPitch via COM vtable
  return 0;
}

// FUN_005e9150 — detect DDSurface pixel format
// Source: decompiled/block_005E0000.c FUN_005e9150 (249 bytes)
export function FUN_005e9150(param_1) {
  // DEVIATION: Win32 — DDSurface detect pixel format via COM vtable
  return 0;
}

// FUN_005e924e — lock DDSurface (low-level)
// Source: decompiled/block_005E0000.c FUN_005e924e (123 bytes)
export function FUN_005e924e(param_1) {
  // DEVIATION: Win32 — DDSurface Lock via COM vtable
  return 0;
}

// FUN_005e92c9 — unlock DDSurface
// Source: decompiled/block_005E0000.c FUN_005e92c9 (52 bytes)
export function FUN_005e92c9(param_1) {
  // DEVIATION: Win32 — DDSurface Unlock via COM vtable
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005e92fd (52 bytes)
export function FUN_005e92fd(param_1, param_2, param_3) {
  // DEVIATION: Win32 — COM vtable call
}

// FUN_005e9331 — map RGB to DDSurface native pixel value
// Source: decompiled/block_005E0000.c FUN_005e9331 (292 bytes)
export function FUN_005e9331(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DDSurface map RGB to native pixel via GetDC/SetPixel/Lock
  return 0;
}

// FUN_005e9455 — blt DDSurface to DDSurface (retry on busy)
// Source: decompiled/block_005E0000.c FUN_005e9455 (167 bytes)
export function FUN_005e9455(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DDSurface Blt with retry on DDERR_WASSTILLDRAWING
  return 0;
}

// FUN_005e9506 — transparent blt (retry on busy)
// Source: decompiled/block_005E0000.c FUN_005e9506 (148 bytes)
export function FUN_005e9506(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DDSurface transparent Blt with retry
  return 0;
}

// FUN_005e95a4 — fast blt (BltFast, retry on busy)
// Source: decompiled/block_005E0000.c FUN_005e95a4 (174 bytes)
export function FUN_005e95a4(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DDSurface BltFast with retry
  return 0;
}

// FUN_005e965c — transparent fast blt
// Source: decompiled/block_005E0000.c FUN_005e965c (152 bytes)
export function FUN_005e965c(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DDSurface transparent BltFast with retry
  return 0;
}

// FUN_005e96fe — flip DDSurface (page flip)
// Source: decompiled/block_005E0000.c FUN_005e96fe (123 bytes)
export function FUN_005e96fe(param_1) {
  // DEVIATION: Win32 — DDSurface Flip (page flip) with retry
  return 0;
}

// FUN_005e9783 — color fill DDSurface (retry on busy)
// Source: decompiled/block_005E0000.c FUN_005e9783 (171 bytes)
export function FUN_005e9783(param_1, param_2, param_3) {
  // DEVIATION: Win32 — DDSurface color fill via Blt with retry
  return 0;
}

// Source: decompiled/block_005E0000.c blit_9838 (130 bytes)
export function blit_9838(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — GDI BitBlt
}

// Source: decompiled/block_005E0000.c stretch_blit_98BA (138 bytes)
export function stretch_blit_98BA(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) {
  // DEVIATION: Win32 — GDI StretchBlt
}

// Source: decompiled/block_005E0000.c FUN_005e9944 (56 bytes)
export function FUN_005e9944(param_1, param_2) {
  // DEVIATION: Win32 — COM vtable call
}

// FUN_005e997c — draw string on DDSurface via GetDC
// Source: decompiled/block_005E0000.c FUN_005e997c (598 bytes)
export function FUN_005e997c(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — draw string on DDSurface via GetDC + DrawTextA
  return 0;
}

// FUN_005e9bd7 — draw formatted text on DDSurface via GetDC
// Source: decompiled/block_005E0000.c FUN_005e9bd7 (341 bytes)
export function FUN_005e9bd7(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — draw formatted text on DDSurface via GetDC + DrawTextA
  return 0;
}

// FUN_005e9d31 — draw single-line text on DDSurface via GetDC
// Source: decompiled/block_005E0000.c FUN_005e9d31 (337 bytes)
export function FUN_005e9d31(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — draw single-line text on DDSurface via GetDC + DrawTextA
  return 0;
}

// FUN_005e9e87 — draw line on DDSurface via GetDC
// Source: decompiled/block_005E0000.c FUN_005e9e87 (254 bytes)
export function FUN_005e9e87(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — draw line on DDSurface via GetDC + LineTo
  return 0;
}

// FUN_005e9f8a — draw string with RGB on DDSurface via GetDC
// Source: decompiled/block_005E0000.c FUN_005e9f8a (590 bytes)
export function FUN_005e9f8a(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) {
  // DEVIATION: Win32 — draw string with RGB on DDSurface via GetDC
  return 0;
}

// FUN_005ea1dd — draw formatted text with RGB via GetDC
// Source: decompiled/block_005E0000.c FUN_005ea1dd (333 bytes)
export function FUN_005ea1dd(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — draw formatted text with RGB via GetDC
  return 0;
}

// FUN_005ea32f — draw single-line text with RGB via GetDC
// Source: decompiled/block_005E0000.c FUN_005ea32f (329 bytes)
export function FUN_005ea32f(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — draw single-line text with RGB via GetDC
  return 0;
}

// FUN_005ea47d — draw line with RGB on DDSurface via GetDC
// Source: decompiled/block_005E0000.c FUN_005ea47d (246 bytes)
export function FUN_005ea47d(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — draw line with RGB on DDSurface via GetDC
  return 0;
}

// FUN_005ea578 — check DDSurface valid
// Source: decompiled/block_005E0000.c FUN_005ea578 (72 bytes)
export function FUN_005ea578(param_1) {
  // DEVIATION: Win32 — DDSurface check valid via COM IsLost
  return 0;
}

// FUN_005ea5c5 — check DDSurface lost
// Source: decompiled/block_005E0000.c FUN_005ea5c5 (70 bytes)
export function FUN_005ea5c5(param_1) {
  // DEVIATION: Win32 — DDSurface check lost via COM IsLost
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005ea610 (103 bytes)
export function FUN_005ea610(param_1) {
  // DEVIATION: Win32 — COM vtable call
}

// FUN_005ea677 — get display bit depth
// Source: decompiled/block_005E0000.c FUN_005ea677 (77 bytes)
export function FUN_005ea677() {
  // DEVIATION: Win32 — DDraw GetDisplayBitDepth via COM vtable
  // C: Queries DAT_006394c0 COM interface for display caps, returns bit depth byte
  return 8;
}

// FUN_005ea6c4 — get DirectDraw vertical blank status
// Source: decompiled/block_005E0000.c FUN_005ea6c4 (77 bytes)
export function FUN_005ea6c4() {
  // DEVIATION: Win32 — DDraw GetVerticalBlankStatus via COM vtable
  return 0;
}

// FUN_005ea711 — get monitor refresh frequency
// Source: decompiled/block_005E0000.c FUN_005ea711 (104 bytes)
export function FUN_005ea711() {
  // DEVIATION: Win32 — DDraw GetMonitorFrequency via COM vtable
  return 0;
}

// FUN_005ea779 — empty function (no-op)
// Source: decompiled/block_005E0000.c FUN_005ea779 (34 bytes)
export function FUN_005ea779() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005E0000.c FUN_005ea7a0 (55 bytes)
export function FUN_005ea7a0(param_1, param_2) {
  // DEVIATION: Win32 — SetWindowLongA
}

// FUN_005ea7d7 — find child window by class type
// Source: decompiled/block_005E0000.c FUN_005ea7d7 (78 bytes)
export function FUN_005ea7d7(param_1, param_2) {
  // DEVIATION: Win32 — find child window by class type via GetClassName loop
  return 0;
}

// FUN_005ea825 — get next sibling window (wrap around)
// Source: decompiled/block_005E0000.c FUN_005ea825 (87 bytes)
export function FUN_005ea825(param_1) {
  // DEVIATION: Win32 — get next sibling window via GetWindow(GW_HWNDNEXT) with wrap
  return 0;
}

// FUN_005ea87c — get previous sibling window (wrap around)
// Source: decompiled/block_005E0000.c FUN_005ea87c (87 bytes)
export function FUN_005ea87c(param_1) {
  // DEVIATION: Win32 — get prev sibling window via GetWindow(GW_HWNDPREV) with wrap
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005ea8d3 (756 bytes)
export function FUN_005ea8d3(param_1, param_2, param_3) {
  // DEVIATION: Win32 — window enumeration
}

// Source: decompiled/block_005E0000.c FUN_005eabcc (161 bytes)
export function FUN_005eabcc(param_1) {
  // DEVIATION: Win32 — framework API
}

// FUN_005eac6d — find scrollbar child window
// Source: decompiled/block_005E0000.c FUN_005eac6d (83 bytes)
export function FUN_005eac6d(param_1) {
  // DEVIATION: Win32 — find scrollbar child window via GetClassName loop
  return 0;
}

// FUN_005eacc0 — panel window WndProc
// Source: decompiled/block_005E0000.c FUN_005eacc0 (1566 bytes)
export function FUN_005eacc0(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — panel WndProc — dispatches WM_SIZE/WM_COMMAND/WM_KEYDOWN/scroll/mouse/etc.
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005eb2f0 (51 bytes)
export function FUN_005eb2f0(in_ECX) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005eb330 (51 bytes)
export function FUN_005eb330(in_ECX) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005eb370 (35 bytes)
export function FUN_005eb370(param_1, param_2) {
  // DEVIATION: Win32 — SetWindowLongA
}

// Source: decompiled/block_005E0000.c FUN_005eb393 (55 bytes)
export function FUN_005eb393(param_1, param_2) {
  // DEVIATION: Win32 — SetWindowLongA
}

// Source: decompiled/block_005E0000.c FUN_005eb3ca (35 bytes)
export function FUN_005eb3ca(param_1, param_2) {
  // DEVIATION: Win32 — SetWindowLongA
}

// FUN_005eb3ed — translate virtual key to internal code
export function FUN_005eb3ed(param_1) {
  let local_8 = DAT_006397e8[(param_1 & 0xFF)] || 0;
  if (local_8 !== 0) {
    let iVar1 = FUN_005ecf20();
    if (iVar1 !== 0) local_8 = local_8 | 0x200;
    iVar1 = FUN_005ecef0();
    if (iVar1 !== 0) local_8 = local_8 | 0x100;
  }
  return local_8;
}

// FUN_005eb447 — subpanel window WndProc (scrollbars, menus, input)
// Source: decompiled/block_005E0000.c FUN_005eb447 (3277 bytes)
export function FUN_005eb447(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — subpanel WndProc — scrollbars, menus, mouse input, keyboard dispatch
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005ec1a1 (153 bytes)
export function FUN_005ec1a1(param_1, param_2) {
  // DEVIATION: Win32 — window enumeration
}

// FUN_005ec23a — recursive menu item ID search
// Source: decompiled/block_005E0000.c FUN_005ec23a (221 bytes)
export function FUN_005ec23a(param_1, param_2) {
  // DEVIATION: Win32 — recursive menu item ID search via GetMenuItemCount/GetMenuItemID
  return 0;
}

// FUN_005ec317 — child panel WndProc (scrollbar variant)
// Source: decompiled/block_005E0000.c FUN_005ec317 (2883 bytes)
export function FUN_005ec317(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — child panel WndProc — scroll, input dispatch, MCI notify
  return 0;
}

// FUN_005eceda — empty function (no-op)
// Source: decompiled/block_005E0000.c FUN_005eceda (16 bytes)
export function FUN_005eceda() {
  // C: return; (truly empty function)
}

// FUN_005ecef0 — is shift key pressed
// Source: decompiled/block_005E0000.c FUN_005ecef0 (48 bytes)
export function FUN_005ecef0() {
  // DEVIATION: Win32 — GetKeyState(VK_SHIFT)
  // C: SVar1 = GetKeyState(0x10); return ((int)SVar1 & 0x8000) != 0;
  return false;
}

// FUN_005ecf20 — is control key pressed
// Source: decompiled/block_005E0000.c FUN_005ecf20 (48 bytes)
export function FUN_005ecf20() {
  // DEVIATION: Win32 — GetKeyState(VK_CONTROL)
  // C: SVar1 = GetKeyState(0x11); return ((int)SVar1 & 0x8000) != 0;
  return false;
}

// Source: decompiled/block_005E0000.c FUN_005ecf50 (52 bytes)
export function FUN_005ecf50(param_1, param_2) {
  // DEVIATION: Win32 — vtable callback dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ecf90 (54 bytes)
export function FUN_005ecf90(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ecfd0 (54 bytes)
export function FUN_005ecfd0(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed010 (54 bytes)
export function FUN_005ed010(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed050 (54 bytes)
export function FUN_005ed050(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed090 (54 bytes)
export function FUN_005ed090(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed0d0 (54 bytes)
export function FUN_005ed0d0(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed110 (54 bytes)
export function FUN_005ed110(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed150 (50 bytes)
export function FUN_005ed150(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed190 (50 bytes)
export function FUN_005ed190(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed1d0 (50 bytes)
export function FUN_005ed1d0(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed210 (50 bytes)
export function FUN_005ed210(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// FUN_005ed250 — dispatch close query callback
// Source: decompiled/block_005E0000.c FUN_005ed250 (48 bytes)
export function FUN_005ed250() {
  // DEVIATION: Win32 — dispatch close query callback via in_ECX+0x30 vtable
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005ed290 (41 bytes)
export function FUN_005ed290() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed2c0 (41 bytes)
export function FUN_005ed2c0() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed2f0 (41 bytes)
export function FUN_005ed2f0() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed320 (50 bytes)
export function FUN_005ed320(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed360 (54 bytes)
export function FUN_005ed360(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed3a0 (50 bytes)
export function FUN_005ed3a0(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed3e0 (50 bytes)
export function FUN_005ed3e0(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed420 (50 bytes)
export function FUN_005ed420(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed460 (50 bytes)
export function FUN_005ed460(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed4a0 (50 bytes)
export function FUN_005ed4a0(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed4e0 (50 bytes)
export function FUN_005ed4e0(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed520 (41 bytes)
export function FUN_005ed520() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ed550 (41 bytes)
export function FUN_005ed550() {
  // DEVIATION: Win32 — object method dispatch
}

// FUN_005ed580 — empty function (no-op for resize)
// Source: decompiled/block_005E0000.c FUN_005ed580 (24 bytes)
export function FUN_005ed580() {
  // C: return; (truly empty function)
}

// FUN_005ed5a0 — dispatch menu select callback
// Source: decompiled/block_005E0000.c FUN_005ed5a0 (69 bytes)
export function FUN_005ed5a0(param_1, param_2) {
  // DEVIATION: Win32 — dispatch menu select callback via in_ECX+0x98 vtable
  return false;
}

// FUN_005ed5f0 — dispatch menu command callback
// Source: decompiled/block_005E0000.c FUN_005ed5f0 (65 bytes)
export function FUN_005ed5f0(param_1) {
  // DEVIATION: Win32 — dispatch menu command callback via in_ECX+0x9c vtable
  return false;
}

// CSplitterWnd_IsTracking (multiple overloads at different offsets)
// Source: decompiled/block_005E0000.c IsTracking@0x005ED640 (31 bytes)
export function CSplitterWnd_IsTracking_b0(obj) { return obj ? obj[0xb0 / 4] : 0; }
// Source: decompiled/block_005E0000.c IsTracking@0x005ED660 (31 bytes)
export function CSplitterWnd_IsTracking_b4(obj) { return obj ? obj[0xb4 / 4] : 0; }
// Source: decompiled/block_005E0000.c IsTracking@0x005ED680 (31 bytes)
export function CSplitterWnd_IsTracking_90(obj) { return obj ? obj[0x90 / 4] : 0; }
// Source: decompiled/block_005E0000.c IsTracking@0x005ED6A0 (31 bytes)
export function CSplitterWnd_IsTracking_94(obj) { return obj ? obj[0x94 / 4] : 0; }
// Source: decompiled/block_005E0000.c IsTracking@0x005ED6C0 (31 bytes)
export function CSplitterWnd_IsTracking_b8(obj) { return obj ? obj[0xb8 / 4] : 0; }

// FUN_005ed6e0 — dispatch MCI notify callback
// Source: decompiled/block_005E0000.c FUN_005ed6e0 (47 bytes)
export function FUN_005ed6e0() {
  // DEVIATION: Win32 — dispatch MCI notify callback via in_ECX+0xbc vtable
}

// Source: decompiled/block_005E0000.c FUN_005ed710 (517 bytes)
export function FUN_005ed710(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — GDI resource cleanup
}

// FUN_005ed920 — open debug log file
// Source: decompiled/block_005E0000.c FUN_005ed920 (325 bytes)
export function FUN_005ed920() {
  // DEVIATION: Win32 — CreateFileA("smeds.log"), WriteFile, OutputDebugStringA
  // C: Opens smeds.log, writes SMEDS32 version header, sets DAT_00639be8 flag
  DAT_00639be8 = '\x01';
  return 1;
}

// FUN_005eda65 — close debug log file
// Source: decompiled/block_005E0000.c FUN_005eda65 (176 bytes)
export function FUN_005eda65() {
  // DEVIATION: Win32 — CreateFileA("smeds.log"), WriteFile "LOG CLOSED", CloseHandle
  return 1;
}

// FUN_005edb15 — write string to debug log
// Source: decompiled/block_005E0000.c FUN_005edb15 (157 bytes)
export function FUN_005edb15(param_1) {
  // DEVIATION: Win32 — CreateFileA("smeds.log"), SetFilePointer, WriteFile(param_1), CloseHandle
  return 1;
}

// FUN_005edbb2 — output debug string
// Source: decompiled/block_005E0000.c FUN_005edbb2 (39 bytes)
export function FUN_005edbb2(param_1) {
  // DEVIATION: Win32 — OutputDebugStringA(param_1)
  return 1;
}

// FUN_005edc6c — ADPCM-style audio decode (replace)
// Source: decompiled/block_005E0000.c FUN_005edc6c (64 bytes)
export function FUN_005edc6c(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — ADPCM-style audio decode (replace mode), byte-level XOR+copy
  return 0;
}

// FUN_005edcac — ADPCM-style audio decode (add with clamp)
// Source: decompiled/block_005E0000.c FUN_005edcac (80 bytes)
export function FUN_005edcac(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — ADPCM-style audio decode (add with clamp), byte-level XOR+add
  return 0;
}

// Source: decompiled/block_005E0000.c show_messagebox_DD00 (43 bytes)
export function show_messagebox_DD00(param_1, param_2) {
  // DEVIATION: Win32 — MessageBoxA + DebugBreak fatal error
}

// FUN_005edd2b — read line from memory buffer
// Source: decompiled/block_005E0000.c FUN_005edd2b (127 bytes)
export function FUN_005edd2b(param_1, param_2) {
  // DEVIATION: Win32 — reads line from memory buffer until \n or \r, uses IsBadHugeReadPtr
  return null;
}

// Source: decompiled/block_005E0000.c FUN_005eddaa (33 bytes)
export function FUN_005eddaa(param_1) {
  // DEVIATION: Win32 — sprintf
}

// FUN_005eddd0 — check if AVI video driver available
// Source: decompiled/block_005E0000.c FUN_005eddd0 (107 bytes)
export function FUN_005eddd0() {
  // DEVIATION: Win32 — mciSendCommandA(0, MCI_OPEN, ..., "avivideo") to check driver
  return false;
}

// Source: decompiled/block_005E0000.c FUN_005ede3b (89 bytes)
export function FUN_005ede3b() {
  // DEVIATION: Win32 — MCI command
}

// Source: decompiled/block_005E0000.c FUN_005ede94 (43 bytes)
export function FUN_005ede94(param_1) {
  // DEVIATION: Win32 — MCI command
}

// FUN_005edebf — open MCI AVI device for playback
// Source: decompiled/block_005E0000.c FUN_005edebf (270 bytes)
export function FUN_005edebf(param_1, param_2) {
  // DEVIATION: Win32 — mciSendCommandA MCI_OPEN avivideo, allocate player struct
  return null;
}

// Source: decompiled/block_005E0000.c FUN_005edfcd (53 bytes)
export function FUN_005edfcd(param_1, param_2) {
  // DEVIATION: Win32 — framework API
}

// Source: decompiled/block_005E0000.c FUN_005ee002 (74 bytes)
export function FUN_005ee002(param_1, param_2) {
  // DEVIATION: Win32 — MCI command
}

// Source: decompiled/block_005E0000.c FUN_005ee04c (60 bytes)
export function FUN_005ee04c(param_1, param_2) {
  // DEVIATION: Win32 — MCI command
}

// Source: decompiled/block_005E0000.c FUN_005ee088 (41 bytes)
export function FUN_005ee088(param_1) {
  // DEVIATION: Win32 — MCI command
}

// FUN_005ee0b1 — create movie player window
// Source: decompiled/block_005E0000.c FUN_005ee0b1 (927 bytes)
export function FUN_005ee0b1(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — CreateWindowExA("MSMovieClass"), GetDC, LoadCursorA, setup player struct
  return null;
}

// Source: decompiled/block_005E0000.c FUN_005ee450 (74 bytes)
export function FUN_005ee450(param_1) {
  // DEVIATION: Win32 — framework API
}

// Source: decompiled/block_005E0000.c FUN_005ee49a (99 bytes)
export function FUN_005ee49a(param_1) {
  // DEVIATION: Win32 — MCI command
}

// Source: decompiled/block_005E0000.c FUN_005ee4fd (43 bytes)
export function FUN_005ee4fd(param_1) {
  // DEVIATION: Win32 — MCI command
}

// Source: decompiled/block_005E0000.c FUN_005ee528 (49 bytes)
export function FUN_005ee528(param_1, param_2) {
  // DEVIATION: Win32 — MCI command
}

// FUN_005ee559 — MCI get current position
// Source: decompiled/block_005E0000.c FUN_005ee559 (56 bytes)
export function FUN_005ee559(param_1) {
  // DEVIATION: Win32 — mciSendCommandA(MCI_STATUS, MCI_STATUS_POSITION)
  return 0;
}

// Source: decompiled/block_005E0000.c FUN_005ee591 (288 bytes)
export function FUN_005ee591(param_1, param_2) {
  // DEVIATION: Win32 — MCI command
}

// Source: decompiled/block_005E0000.c FUN_005ee6b1 (50 bytes)
export function FUN_005ee6b1() {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005ee6e3 (116 bytes)
export function FUN_005ee6e3(param_1, param_2) {
  // DEVIATION: Win32 — MCIWnd create
}

// Source: decompiled/block_005E0000.c FUN_005ee757 (90 bytes)
export function FUN_005ee757() {
  // DEVIATION: Win32 — MCIWnd create
}

// Source: decompiled/block_005E0000.c FUN_005ee7b1 (116 bytes)
export function FUN_005ee7b1(param_1, param_2) {
  // DEVIATION: Win32 — MCIWnd create
}

// Source: decompiled/block_005E0000.c FUN_005ee825 (90 bytes)
export function FUN_005ee825(param_1) {
  // DEVIATION: Win32 — MCIWnd create
}

// Source: decompiled/block_005E0000.c FUN_005ee87f (71 bytes)
export function FUN_005ee87f(param_1) {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005ee8c6 (43 bytes)
export function FUN_005ee8c6() {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005ee8f1 (43 bytes)
export function FUN_005ee8f1() {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005ee91c (47 bytes)
export function FUN_005ee91c(param_1) {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005ee94b (70 bytes)
export function FUN_005ee94b() {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005ee991 (43 bytes)
export function FUN_005ee991() {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005ee9bc (43 bytes)
export function FUN_005ee9bc() {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005ee9e7 (43 bytes)
export function FUN_005ee9e7() {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005eea12 (40 bytes)
export function FUN_005eea12(param_1) {
  // DEVIATION: Win32 — GetClientRect
}

// Source: decompiled/block_005E0000.c FUN_005eea3a (163 bytes)
export function FUN_005eea3a() {
  // DEVIATION: Win32 — GetClientRect
}

// Source: decompiled/block_005E0000.c FUN_005eeadd (52 bytes)
export function FUN_005eeadd(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005eeb11 (52 bytes)
export function FUN_005eeb11(param_1, param_2) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005eeb45 (57 bytes)
export function FUN_005eeb45() {
  // DEVIATION: Win32 — ShowWindow
}

// Source: decompiled/block_005E0000.c FUN_005eeb7e (36 bytes)
export function FUN_005eeb7e() {
  // DEVIATION: Win32 — ShowWindow
}

// Source: decompiled/block_005E0000.c FUN_005eeba2 (52 bytes)
export function FUN_005eeba2(param_1) {
  // DEVIATION: Win32 — SendMessageA
}

// Source: decompiled/block_005E0000.c FUN_005eebd6 (159 bytes)
export function FUN_005eebd6() {
  // DEVIATION: Win32 — SendMessageA
}

// CSplitterWnd_IsTracking_EC80 (at 0x5EEC80)
// Source: decompiled/block_005E0000.c IsTracking@0x005EEC80 (31 bytes)
export function CSplitterWnd_IsTracking_EC80(obj) { return obj ? obj[0xb0 / 4] : 0; }

// FUN_005eeca0 — init sound object
// Source: decompiled/block_005E0000.c FUN_005eeca0 (35 bytes)
export function FUN_005eeca0(in_ECX) {
  // C: *(uint*)(in_ECX + 4) = 0; return in_ECX;
  if (in_ECX) in_ECX[1] = 0;
  return in_ECX;
}

// Source: decompiled/block_005E0000.c FUN_005eecc3 (88 bytes)
export function FUN_005eecc3(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// Source: decompiled/block_005E0000.c FUN_005eed1b (40 bytes)
export function FUN_005eed1b() {
  // DEVIATION: Win32 — object method dispatch
}

// FUN_005eed43 — is sound playing
// Source: decompiled/block_005E0000.c FUN_005eed43 (51 bytes)
export function FUN_005eed43() {
  // DEVIATION: Win32 — checks in_ECX flags: (*in_ECX & 4) != 0
  return false;
}

// FUN_005eed76 — open audio stream
// Source: decompiled/block_005E0000.c FUN_005eed76 (91 bytes)
export function FUN_005eed76(param_1) {
  // DEVIATION: Win32 — open audio stream via FUN_005d52a2
  return 0;
}

// FUN_005eedd1 — get audio position
// Source: decompiled/block_005E0000.c FUN_005eedd1 (27 bytes)
export function FUN_005eedd1() {
  FUN_005d5643();
}

// FUN_005eedec — play audio range
// Source: decompiled/block_005E0000.c FUN_005eedec (99 bytes)
export function FUN_005eedec(param_1, param_2) {
  // DEVIATION: Win32 — play audio range via FUN_005d5d11
  return 0;
}

// FUN_005eee4f — start audio playback
// Source: decompiled/block_005E0000.c FUN_005eee4f (30 bytes)
export function FUN_005eee4f() {
  FUN_005d5f91();
  return 0;
}

// FUN_005eee6d — returns 0 (DEVIATION: Win32 API — audio)
// Source: decompiled/block_005E0000.c FUN_005eee6d (25 bytes)
export function FUN_005eee6d() {
  return 0;
}

// FUN_005eee86 — empty function (no-op)
// Source: decompiled/block_005E0000.c FUN_005eee86 (22 bytes)
export function FUN_005eee86() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005E0000.c show_messagebox_EEB0 (402 bytes)
export function show_messagebox_EEB0(param_1, param_2, param_3) {
  // DEVIATION: Win32 — MessageBoxA dialog
}

// Source: decompiled/block_005E0000.c show_messagebox_F0B9 (401 bytes)
export function show_messagebox_F0B9(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — MessageBoxA dialog
}

// Source: decompiled/block_005E0000.c FUN_005ef320 (54 bytes)
export function FUN_005ef320(param_1, param_2) {
  // DEVIATION: Win32 — SetClassLongA
}

// FUN_005ef356 — create DirectDraw fullscreen window
// Source: decompiled/block_005E0000.c FUN_005ef356 (200 bytes)
export function FUN_005ef356(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — CreateWindowExA("MSDirectWindow"), allocate DDWindow struct
  return null;
}

// FUN_005ef41e — set DirectDraw cooperative level
// Source: decompiled/block_005E0000.c FUN_005ef41e (192 bytes)
export function FUN_005ef41e(param_1, param_2) {
  // DEVIATION: Win32 — DDraw SetCooperativeLevel via COM vtable
  return 0;
}

// FUN_005ef4e3 — set display mode
// Source: decompiled/block_005E0000.c FUN_005ef4e3 (171 bytes)
export function FUN_005ef4e3(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DDraw SetDisplayMode via COM vtable + MoveWindow
  return 0;
}

// FUN_005ef58e — restore display mode
// Source: decompiled/block_005E0000.c FUN_005ef58e (77 bytes)
export function FUN_005ef58e() {
  // DEVIATION: Win32 — DDraw RestoreDisplayMode via COM vtable
  return 0;
}

// FUN_005ef5db — destroy DirectDraw window
// Source: decompiled/block_005E0000.c FUN_005ef5db (127 bytes)
export function FUN_005ef5db(param_1) {
  // DEVIATION: Win32 — ShowWindow(0), DestroyWindow, free DDWindow struct
  return 0;
}

// FUN_005ef65a — show window
// Source: decompiled/block_005E0000.c FUN_005ef65a (63 bytes)
export function FUN_005ef65a(param_1) {
  // DEVIATION: Win32 — ShowWindow(SW_SHOW), UpdateWindow
  return param_1 !== 0;
}

// FUN_005ef699 — hide window
// Source: decompiled/block_005E0000.c FUN_005ef699 (50 bytes)
export function FUN_005ef699(param_1) {
  // DEVIATION: Win32 — ShowWindow(SW_HIDE)
  return param_1 !== 0;
}

// FUN_005ef6cb — DirectDraw window WndProc
// Source: decompiled/block_005E0000.c FUN_005ef6cb (1456 bytes)
export function FUN_005ef6cb(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DirectDraw window WndProc: handles WM_DESTROY/WM_CLOSE/WM_TIMER/WM_KEYDOWN/mouse/paint/palette
  return 0;
}

// FUN_005efca3 — call display mode callback
// Source: decompiled/block_005E0000.c FUN_005efca3 (59 bytes)
export function FUN_005efca3(param_1, param_2) {
  // DEVIATION: Win32 — display mode enumeration callback (stores mode info)
  return 1;
}

// Source: decompiled/block_005E0000.c FUN_005efcde (133 bytes)
export function FUN_005efcde(param_1, param_2) {
  // DEVIATION: Win32 — COM vtable call
}

// Source: decompiled/block_005E0000.c FUN_005efd70 (56 bytes)
export function FUN_005efd70(param_1) {
  // DEVIATION: Win32 — object method dispatch
}

// FUN_005efdc0 — game screen object constructor
// Source: decompiled/block_005E0000.c FUN_005efdc0 (194 bytes)
export function FUN_005efdc0(in_ECX) {
  // DEVIATION: Win32 — game screen object constructor, initializes 20+ fields to 0/null
  return in_ECX;
}

// Source: decompiled/block_005E0000.c FUN_005efeb0 (123 bytes)
// FUN_005efeb0 — game screen object destructor
export function FUN_005efeb0() {
  // DEVIATION: Win32 — game screen destructor: releases DDSurfaces, fonts, palette
}

// FUN_005eff2b — font cleanup thunk
// Source: decompiled/block_005E0000.c FUN_005eff2b (15 bytes)
export function FUN_005eff2b() {
  FUN_005f04c0();
}

// Source: decompiled/block_005E0000.c FUN_005eff3a (40 bytes)
export function FUN_005eff3a() {
  // DEVIATION: Win32 — framework API
}

// FUN_005eff62 — DDSurface cleanup thunk
// Source: decompiled/block_005E0000.c FUN_005eff62 (9 bytes)
export function FUN_005eff62() {
  FUN_005e5ee0();
}

// FUN_005eff75 — SEH frame restore (no-op)
// Source: decompiled/block_005E0000.c FUN_005eff75 (14 bytes)
export function FUN_005eff75() {
  // DEVIATION: Win32 — SEH epilog
}

// FUN_005eff83 — create fullscreen game screen
// Source: decompiled/block_005E0000.c FUN_005eff83 (105 bytes)
export function FUN_005eff83(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — create fullscreen game screen via FUN_005ef356/FUN_005ef41e/FUN_005ef4e3
  return 1;
}

// FUN_005effec — create windowed game screen
// Source: decompiled/block_005E0000.c FUN_005effec (106 bytes)
export function FUN_005effec(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — create windowed game screen via FUN_005ef356/FUN_005ef41e
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION DECLARATIONS
//
// Functions called from this block but defined elsewhere.
// ═══════════════════════════════════════════════════════════════════

function CRichEditDoc_InvalidateObjectCache(ptr) { /* MFC — no-op */ }
function FUN_004d8af0(str) { return str; }
function measure_text_858E(font, str) { return 0; }
function gdi_847F(font) { return 0; }
function gdi_8514(font) { return 0; }
function FUN_004bb740() {}
function FUN_0040f570() {}
function FUN_0044cba0() {}
function FUN_0043c520() {}
function FUN_005c656b() {}
function FUN_00418870() {}
function FUN_005bbb5a(p) {}
function FUN_005c64da() {}
function FUN_0043c690() {}
function FUN_0044c5a0() {}
function FUN_0040f3e0() {}
function FUN_00531010() {}
function FUN_005f22d0(dst, src) {}
function FUN_005f22e0(dst, src) {}
function FUN_00417ef0(a, b) {}
function FUN_005d8236(buf) {}
function FUN_005d4167(buf) {}
function FUN_005d268e(buf) {}
function FUN_004187a0() {}
function FUN_00450400() {}
function FUN_005bb3f0() {}
function FUN_005bb4ae() {}
function FUN_005a9600() {}
function FUN_00407fc0(p) { return 0; }
function FUN_00407f90(p) { return 0; }
function FUN_00518e80() {}
function FUN_005c041f(n) {}
function FUN_005dfa4d() {}
function FUN_005c19ad() {}
function FUN_005c1167() {}
function FUN_005311b0(fn) {}
function FUN_005311e0(fn) {}
function FUN_0040f680() {}
function FUN_0040f880(fn) {}
function FUN_004085f0() {}
function FUN_005c61b0() {}
function FUN_0040f610() {}
function FUN_0040f730() {}
function create_window_931B() { return 0; }
function FUN_005dcdf9(h) { return 0; }
function FUN_005dce4f(sz) { return 0; }
function FUN_005dce29(h) {}
function FUN_005dce96(h) { return 0; }
function FUN_005c55a0(w) { return w; }
function debug_log(msg) {}
function FUN_005c5640() { return 0; }
function FUN_005c5660() { return 0; }
function FUN_005c56a0() { return 0; }
function FUN_005c55d0() { return 0; }
function FUN_005c5740(r) { return 0; }
function FUN_005c5560(h) { return 0; }
function FUN_005c5520(h) {}
function FUN_005c5580(h) {}
function FUN_005c5540() { return 0; }
function FUN_005c54d0(v) { return v; }
function FUN_005c5410(v) { return v; }
function FUN_005db2f8(id) { return 0; }
function FUN_005d2279(fmt) {}
function FUN_005dae6b() {}
function FUN_005bd65c(w, h) {}
function FUN_005bb621(w, h) {}
function FUN_005c0979() {}
function FUN_005c0593() {}
function FUN_00414d10() { return 0; }
function fill_rect_BE88() { return 0; }
function FUN_005bb6c7(w, h) {}
function FUN_005c6da8() {}
function FUN_005c6b63() {}
function FUN_005c6b93() {}
function FUN_005d57b1(ms) {}
function FUN_005bd610() { return 0; }
function FUN_005bca3d() { return 0; }
function FUN_005bc9d3() { return 0; }
function FUN_005bb910() {}
function FUN_005bb950() {}
function FUN_005c5c86() {}
function FUN_005cac22() {}
function FUN_005cbdd0() { return '\0'; }
function FUN_005c5e60() { return 0; }
function FUN_005c5e80() { return 0; }
function FUN_005c5ee0() { return 0; }
function FUN_005c5ec0() { return 0; }
function FUN_005c63af() {}
function FUN_005dab5a() { return 0; }
function FUN_005dac39() { return 0; }
function FUN_005dabe5() { return 0; }
function FUN_005d6c99() {}
function gdi_D149() {}
function FUN_005bc1b5() {}
function FUN_005d52a2() { return 0; }
function FUN_005d5b88() {}
function FUN_005d5643() {}
function FUN_005d5d11() { return 0; }
function FUN_005d5f91() {}
function FUN_005f0391() { return '\0'; }
function FUN_005f0520() {}
function FUN_005f04c0() {}
function FUN_005f01ad() {}
function FUN_005f029e() {}
function FUN_005eb447_deviation_win32() { return 0; }
function FUN_005eed76_deviation_win32() { return 0; }
function FUN_005eedec_deviation_win32() { return 0; }
function FUN_005eee4f_deviation_win32() {}
