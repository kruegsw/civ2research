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


// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_004085f0, FUN_0040f3e0, FUN_0040f570, FUN_0040f610 } from './block_00400000.js';
import { FUN_0040f680, FUN_0040f730, FUN_0040f880 } from './block_00400000.js';
import { FUN_00414d10, FUN_00417ef0, FUN_004187a0, FUN_00418870 } from './block_00410000.js';
import { FUN_0043c520, FUN_0043c690 } from './block_00430000.js';
import { FUN_0044c5a0, FUN_0044cba0 } from './block_00440000.js';
import { FUN_00450400 } from './block_00450000.js';
import { FUN_004bb740 } from './block_004B0000.js';
import { FUN_004d8af0 } from './block_004D0000.js';
import { FUN_00518e80 } from './block_00510000.js';
import { FUN_00531010, FUN_005311b0, FUN_005311e0 } from './block_00530000.js';
import { FUN_005a9600 } from './block_005A0000.js';
import { FUN_005bb3f0, FUN_005bb4ae, FUN_005bb621, FUN_005bb6c7, FUN_005bb910, FUN_005bb950 } from './block_005B0000.js';
import { FUN_005bbb5a, FUN_005bc1b5, FUN_005bc9d3, FUN_005bca3d, FUN_005bd610, FUN_005bd65c } from './block_005B0000.js';
import { FUN_005c041f, FUN_005c0593, FUN_005c0979, FUN_005c1167, FUN_005c19ad, FUN_005c5410 } from './block_005C0000.js';
import { FUN_005c54d0, FUN_005c5520, FUN_005c5540, FUN_005c5560, FUN_005c5580, FUN_005c55a0 } from './block_005C0000.js';
import { FUN_005c55d0, FUN_005c5640, FUN_005c5660, FUN_005c56a0, FUN_005c5740, FUN_005c5c86 } from './block_005C0000.js';
import { FUN_005c5e60, FUN_005c5e80, FUN_005c5ec0, FUN_005c5ee0, FUN_005c61b0, FUN_005c63af } from './block_005C0000.js';
import { FUN_005c64da, FUN_005c656b, FUN_005c6b63, FUN_005c6b93, FUN_005c6da8, FUN_005cac22 } from './block_005C0000.js';
import { FUN_005cbdd0 } from './block_005C0000.js';
import { FUN_005d2279, FUN_005d268e, FUN_005d4167, FUN_005d52a2, FUN_005d5643, FUN_005d57b1 } from './block_005D0000.js';
import { FUN_005d5b88, FUN_005d5d11, FUN_005d5f91, FUN_005d6c99, FUN_005d8236, FUN_005dab5a } from './block_005D0000.js';
import { FUN_005dabe5, FUN_005dac39, FUN_005dae6b, FUN_005db2f8, FUN_005dcdf9, FUN_005dce29 } from './block_005D0000.js';
import { FUN_005dce4f, FUN_005dce96, FUN_005dfa4d } from './block_005D0000.js';
import { FUN_005f01ad, FUN_005f029e, FUN_005f0391, FUN_005f04c0, FUN_005f0520 } from './block_005F0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';

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
let PTR_DAT_00637e5c = null;  // current font pointer
let PTR_DAT_00637e64 = null;  // list control vtable pointer


// ═══════════════════════════════════════════════════════════════════
// FUN_005e00bb — dialog ok/cancel handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e00bb(param_1) {
  if (param_1 === 0x65) {
    CRichEditDoc_InvalidateObjectCache(G.DAT_006e5020 + 0x48);
  } else if (param_1 === 0x66) {
    G.DAT_006e5018 = 0xffffffff;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006e5020 + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e010a — set selected item index
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e010a(param_1, param_2) {
  G.DAT_006e5018 = param_2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0122 — set selected item and invalidate
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0122(param_1, param_2) {
  G.DAT_006e5018 = param_2;
  CRichEditDoc_InvalidateObjectCache(G.DAT_006e5020 + 0x48);
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
export function FUN_005e0854() {
  // SEH frame teardown — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e0863 — show modal dialog (advisor/help style)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0863() {
  // UI dialog setup with buttons — DEVIATION: Win32 API
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
export function FUN_005e0a80() {
  // SEH frame teardown — no-op
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
  let iVar1 = Math.floor(Math.random() * 0x7FFF);
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
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0bc0(param_1, param_2, param_3, param_4, param_5) {
  // UI list control initialization — DEVIATION: Win32 API
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
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e0f2a(param_1) {
  // Win32 CreateMenu — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10a2 — load menu resource
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e10a2(param_1) {
  // Win32 LoadMenuA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10c7 — destroy menu
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e10c7(param_1) {
  // Win32 DestroyMenu — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10eb — empty function (no-op)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e10eb() {
  // no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e10fb — draw menu bar
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e10fb(param_1) {
  // Win32 DrawMenuBar — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1118 — enable/disable menu item by position
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1118(param_1, param_2, param_3, param_4) {
  // Win32 EnableMenuItem — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e11be — check/uncheck menu item
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e11be(param_1, param_2, param_3, param_4) {
  // Win32 CheckMenuItem — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1226 — remove/delete menu item
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1226(param_1, param_2, param_3) {
  // Win32 RemoveMenu/DeleteMenu — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_128C — insert menu item with auto column break
// ═══════════════════════════════════════════════════════════════════
export function build_menu_128C(param_1, param_2, param_3, param_4) {
  // Win32 InsertMenuA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_13B1 — insert menu item with explicit ID
// ═══════════════════════════════════════════════════════════════════
export function build_menu_13B1(param_1, param_2, param_3, param_4, param_5) {
  // Win32 InsertMenuA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e14c8 — modify menu item text
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e14c8(param_1, param_2, param_3, param_4) {
  // Win32 ModifyMenuA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// show_popup_menu_154A — show popup/context menu
// ═══════════════════════════════════════════════════════════════════
export function show_popup_menu_154A(param_1, param_2, param_3, param_4) {
  // Win32 TrackPopupMenu — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1599 — get submenu by index
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1599(param_1, param_2) {
  // Win32 GetSubMenu — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e15ce — enable/disable menu item by command ID
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e15ce(param_1, param_2, param_3) {
  // Win32 EnableMenuItem — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1619 — check/uncheck menu item by command ID
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1619(param_1, param_2, param_3) {
  // Win32 CheckMenuItem — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1664 — delete menu item by command ID
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1664(param_1, param_2) {
  // Win32 DeleteMenu — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e168e — modify menu item text by command ID
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e168e(param_1, param_2, param_3) {
  // Win32 ModifyMenuA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e16c0 — empty function (no-op)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e16c0() {}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e16d0 — empty function (no-op)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e16d0() {}

// ═══════════════════════════════════════════════════════════════════
// build_menu_16E0 — append menu item to submenu with column break
// ═══════════════════════════════════════════════════════════════════
export function build_menu_16E0(param_1, param_2, param_3, param_4) {
  // Win32 AppendMenuA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_1768 — append menu item with column break
// ═══════════════════════════════════════════════════════════════════
export function build_menu_1768(param_1, param_2, param_3) {
  // Win32 AppendMenuA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e17db — delete menu item by command (duplicate of 1664)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e17db(param_1, param_2) {
  // Win32 DeleteMenu — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// build_menu_1805 — append separator to menu
// ═══════════════════════════════════════════════════════════════════
export function build_menu_1805(param_1) {
  // Win32 AppendMenuA separator — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1880 — set window long (timer proc install)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1880(param_1, param_2) {
  // Win32 SetWindowLongA — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e18b7 — set timer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e18b7(param_1, param_2, param_3) {
  // Win32 SetTimer — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e18de — kill timer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e18de(param_1, param_2) {
  // Win32 KillTimer — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e18ff — main window WndProc (paint, resize, close)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e18ff(param_1, param_2, param_3, param_4) {
  // Win32 WndProc — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1c70 — render AVI frame (current player instance)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1c70() {
  FUN_005e2cd1(G.DAT_00638dd4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e1c8e — open AVI file for playback
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e1c8e(param_1, param_2) {
  // AVI file open + ICM codec setup — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e22ed — start AVI playback
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e22ed(param_1) {
  // AVI playback start — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e250c — ICDecompressEx begin wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e250c(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14) {
  // ICSendMessage 0x403c — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2583 — ICDecompressEx query wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e2583(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14) {
  // ICSendMessage 0x403d — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e25fa — play AVI range
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e25fa(param_1, param_2, param_3) {
  // AVI play range — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2675 — stop AVI playback
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e2675(param_1) {
  // AVI stop playback — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e26f6 — reset AVI to beginning
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e26f6(param_1) {
  // AVI reset — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2799 — close/cleanup AVI resources
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e2799(param_1) {
  // AVI close — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e28cd — seek AVI to specific frame
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e28cd(param_1, param_2, param_3) {
  // AVI seek — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// show_messagebox_2997 — decompress and display AVI frame
// ═══════════════════════════════════════════════════════════════════
export function show_messagebox_2997(param_1, param_2) {
  // AVI frame decompress + display — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2c5a — ICDecompressEx wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e2c5a(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14) {
  // ICSendMessage 0x403e — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e2cd1 — AVI frame timer/sync handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e2cd1(param_1) {
  // AVI frame sync — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e30a1 — update AVI palette from codec
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e30a1(param_1) {
  // AVI palette update — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e32b2 — set AVI display mode (normal/doubled)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e32b2(param_1, param_2) {
  // AVI display mode — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3550 — call video-end callback (vtable dispatch)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3550(in_ECX) {
  // callback dispatch — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3580 — call frame-reached callback (vtable dispatch)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3580(in_ECX) {
  // callback dispatch — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_35B0 — create 8-bit DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_35B0(param_1) {
  // Win32 CreateDIBSection (8-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3877 — set DIB orientation override
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3877(param_1) {
  G.DAT_00638e18 = param_1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e388f — destroy DIB surface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e388f(param_1) {
  // Win32 DeleteObject/DeleteDC — DEVIATION: Win32 API
  return 0;
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
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3988(param_1) {
  // pixel row flip — DEVIATION: Win32 API
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
export function FUN_005e3aa8() {
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3ACB — read DIB color table entries
// ═══════════════════════════════════════════════════════════════════
export function handle_colortable_3ACB(param_1, param_2, param_3, param_4) {
  // Win32 GetDIBColorTable — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3B4C — write DIB color table entries
// ═══════════════════════════════════════════════════════════════════
export function handle_colortable_3B4C(param_1, param_2, param_3, param_4) {
  // Win32 SetDIBColorTable — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3bdc — set full 256-entry color table
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3bdc(param_1, param_2) {
  handle_colortable_3B4C(param_1, param_2, 0, 0x100);
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3C03 — set DIB color table from HPALETTE
// ═══════════════════════════════════════════════════════════════════
export function handle_colortable_3C03(param_1, param_2) {
  // Win32 GetPaletteEntries + SetDIBColorTable — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e3cb4 — draw string on 8-bit DIB surface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e3cb4(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // GDI DrawTextA on DIB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3ECA — draw formatted text on 8-bit DIB
// ═══════════════════════════════════════════════════════════════════
export function handle_colortable_3ECA(param_1, param_2, param_3, param_4, param_5) {
  // GDI DrawTextA on DIB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_3FEB — draw single-line text on 8-bit DIB
// ═══════════════════════════════════════════════════════════════════
export function handle_colortable_3FEB(param_1, param_2, param_3, param_4, param_5) {
  // GDI DrawTextA on DIB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// handle_colortable_40FB — draw line on 8-bit DIB
// ═══════════════════════════════════════════════════════════════════
export function handle_colortable_40FB(param_1, param_2, param_3, param_4, param_5) {
  // GDI LineTo on DIB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_41BA — create 16-bit (555) DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_41BA(param_1) {
  // Win32 CreateDIBSection (16-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_43C5 — create 24-bit DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_43C5(param_1) {
  // Win32 CreateDIBSection (24-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// create_dib_45B5 — create 32-bit DIB section
// ═══════════════════════════════════════════════════════════════════
export function create_dib_45B5(param_1) {
  // Win32 CreateDIBSection (32-bit) — DEVIATION: Win32 API
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e47a5 — draw string with explicit RGB on DIB
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e47a5(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) {
  // GDI DrawTextA with RGB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e49a0 — draw formatted text with explicit RGB
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e49a0(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // GDI DrawTextA with RGB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4aa6 — draw single-line text with explicit RGB
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4aa6(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // GDI DrawTextA with RGB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4b9b — draw line with explicit RGB on DIB
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4b9b(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // GDI LineTo with RGB — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4c3f — fill rect with solid brush (RGB)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4c3f(param_1, param_2, param_3, param_4, param_5) {
  // Win32 FillRect — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4cc8 — get pixel value for RGB on surface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4cc8(param_1, param_2, param_3, param_4, param_5, param_6) {
  // GDI GetPixel/SetPixel — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4d60 — LZW GIF decompressor setup
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4d60(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // GIF LZW decompression — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4e60 — fill rect on 8-bit raw buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4e60(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // raw pixel fill — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4ef8 — fill rect on 16-bit raw buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4ef8(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) {
  // raw 16-bit pixel fill — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e4f9b — copy rect between 8-bit raw buffers
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e4f9b(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12) {
  // raw pixel copy — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5056 — copy rect between 16-bit raw buffers
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5056(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12) {
  // raw 16-bit pixel copy — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e511c — transpose pixel copy (column → row)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e511c(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12) {
  // pixel transpose — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e518e — sprite blit with transparency (8-bit, RLE)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e518e(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14, param_15, param_16) {
  // sprite blit — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e52bf — sprite blit mask fill (8-bit, RLE)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e52bf(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14, param_15, param_16, param_17) {
  // sprite mask blit — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e53f3 — LZW GIF decode core
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e53f3(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // GIF LZW decode core — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5869 — fill horizontal line on raw buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5869(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // horizontal line fill — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e58e7 — fill vertical line on raw buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e58e7(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // vertical line fill — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e593a — copy with palette offset (top-down)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e593a(param_1, param_2, param_3, param_4, param_5, param_6) {
  // palette offset copy — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e59b3 — copy with palette offset (bottom-up)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e59b3(param_1, param_2, param_3, param_4, param_5, param_6) {
  // palette offset copy (flipped) — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5a39 — RLE decode with palette offset (top-down)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5a39(param_1, param_2, param_3, param_4, param_5, param_6) {
  // RLE decode + palette — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5b1e — RLE decode with palette offset (bottom-up)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5b1e(param_1, param_2, param_3, param_4, param_5, param_6) {
  // RLE decode + palette (flipped) — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5c10 — 16-bit RLE decode with palette offset (top-down)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5c10(param_1, param_2, param_3, param_4, param_5, param_6) {
  // 16-bit RLE decode — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5d4f — 16-bit RLE decode with palette offset (bottom-up)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5d4f(param_1, param_2, param_3, param_4, param_5, param_6) {
  // 16-bit RLE decode (flipped) — DEVIATION: Win32 API
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
export function FUN_005e5ee0() {}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5ef6 — release DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5ef6(in_ECX) {
  // DDSurface release — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5f78 — create DDSurface from width/height
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5f78(param_1, param_2) {
  // DDSurface create — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5fb4 — create DDSurface from rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5fb4(param_1) {
  FUN_005e6018(param_1, 0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e5fda — create DDSurface with system memory flag
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e5fda(param_1, param_2, param_3) {
  // DDSurface create w/ sysmem — DEVIATION: Win32 API
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
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6188(in_ECX) {
  // DDSurface lock — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e61e9 — restore lost DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e61e9(in_ECX) {
  // DDSurface restore — DEVIATION: Win32 API
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
  // DDSurface from primary — DEVIATION: Win32 API
  return false;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e635f — attach existing DDSurface pointer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e635f(param_1, param_2, param_3) {
  // DDSurface attach — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6450 — reset DDSurface dimensions and clip
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6450(param_1) {
  // DDSurface dimension reset — DEVIATION: Win32 API
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
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e658a(param_1, param_2) {
  // DDSurface get pixel — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e65f1 — set pixel value on DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e65f1(param_1, param_2, param_3) {
  // DDSurface set pixel — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6651 — load bitmap resource into DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6651(param_1, param_2, param_3, param_4) {
  // bitmap resource load — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6893 — load GIF resource into DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6893(param_1, param_2, param_3, param_4) {
  // GIF resource load — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6bc5 — load CvPic resource into DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6bc5(param_1, param_2, param_3, param_4) {
  // CvPic resource load — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6d4c — load 24-bit bitmap as 16-bit DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6d4c(param_1) {
  // 24→16 bit bitmap load — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6f25 — set DDSurface fill color
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6f25(param_1, param_2, param_3) {
  // DDSurface fill color set — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6f57 — reset clip rect to full surface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6f57(in_ECX) {
  // DDSurface clip reset — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6f96 — set clip rect (intersected with full rect)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6f96(param_1) {
  // DDSurface set clip — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e6ff1 — get current clip rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e6ff1(param_1) {
  // DDSurface get clip — DEVIATION: Win32 API
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e7028 — compute pixel address in DDSurface
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e7028(param_1, param_2, param_3) {
  // pixel address calc — DEVIATION: Win32 API
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005e7052 — fill rect on DDSurface (clipped)
// ═══════════════════════════════════════════════════════════════════
export function FUN_005e7052(param_1, param_2) { /* DDraw fill — DEVIATION: Win32 API */ }

// FUN_005e70d7 — fill current clip rect
export function FUN_005e70d7(param_1) { /* DDraw fill clip — DEVIATION: Win32 API */ }

// FUN_005e7102 — fill rect with RGB color (dispatches by bpp)
export function FUN_005e7102(param_1, param_2, param_3, param_4) { /* DDraw fill RGB — DEVIATION: Win32 API */ }

// FUN_005e7257 — fill current clip rect with RGB
export function FUN_005e7257(param_1, param_2, param_3) { /* DDraw fill clip RGB — DEVIATION: Win32 API */ }

// FUN_005e728a — blt between DDSurfaces (clipped)
export function FUN_005e728a(param_1, param_2, param_3) { /* DDraw blt — DEVIATION: Win32 API */ }

// FUN_005e7355 — blt with flip detection
export function FUN_005e7355(param_1, param_2, param_3) { /* DDraw blt flip — DEVIATION: Win32 API */ }

// FUN_005e747c — blt with source surface pointer
export function FUN_005e747c(param_1, param_2, param_3) { /* DDraw blt src — DEVIATION: Win32 API */ }

// FUN_005e74c8 — transparent blt between DDSurfaces
export function FUN_005e74c8(param_1, param_2, param_3) { /* DDraw transparent blt — DEVIATION: Win32 API */ }

// FUN_005e7593 — transparent blt with source pointer
export function FUN_005e7593(param_1, param_2, param_3) { /* DDraw transparent blt src — DEVIATION: Win32 API */ }

// FUN_005e75df — draw string on DDSurface (current font)
export function FUN_005e75df(param_1, param_2, param_3, param_4) { /* DDraw drawstring — DEVIATION: Win32 API */ }

// FUN_005e76dd — draw text in rect on DDSurface
export function FUN_005e76dd(param_1, param_2, param_3) { /* DDraw drawtext rect — DEVIATION: Win32 API */ }

// FUN_005e77ed — draw string on DDSurface (explicit font)
export function FUN_005e77ed(param_1, param_2, param_3, param_4, param_5) { /* DDraw drawstring font — DEVIATION: Win32 API */ }

// FUN_005e78c6 — draw text in rect (explicit font)
export function FUN_005e78c6(param_1, param_2, param_3, param_4) { /* DDraw drawtext font — DEVIATION: Win32 API */ }

// FUN_005e79b1 — draw single-line text on DDSurface
export function FUN_005e79b1(param_1, param_2, param_3) { /* DDraw drawtext single — DEVIATION: Win32 API */ }

// FUN_005e7a30 — draw single-line text (explicit font)
export function FUN_005e7a30(param_1, param_2, param_3, param_4) { /* DDraw drawtext single font — DEVIATION: Win32 API */ }

// FUN_005e7a8e — draw string with shadow on DDSurface
export function FUN_005e7a8e(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { /* DDraw shadow string — DEVIATION: Win32 API */ }

// FUN_005e7b98 — draw text in rect with shadow
export function FUN_005e7b98(param_1, param_2, param_3, param_4, param_5, param_6) { /* DDraw shadow rect — DEVIATION: Win32 API */ }

// FUN_005e7cb4 — draw string with shadow (explicit font)
export function FUN_005e7cb4(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { /* DDraw shadow font — DEVIATION: Win32 API */ }

// FUN_005e7d99 — draw text rect with shadow (explicit font)
export function FUN_005e7d99(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { /* DDraw shadow rect font — DEVIATION: Win32 API */ }

// FUN_005e7e90 — draw single-line text with shadow
export function FUN_005e7e90(param_1, param_2, param_3, param_4, param_5, param_6) { /* DDraw shadow single — DEVIATION: Win32 API */ }

// FUN_005e7f1b — draw single-line text with shadow (explicit font)
export function FUN_005e7f1b(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { /* DDraw shadow single font — DEVIATION: Win32 API */ }

// FUN_005e7f85 — draw line on DDSurface
export function FUN_005e7f85(param_1, param_2, param_3, param_4) { /* DDraw line — DEVIATION: Win32 API */ }

// FUN_005e806d — draw rect outline on DDSurface
export function FUN_005e806d(param_1) { /* DDraw rect outline — DEVIATION: Win32 API */ }

// FUN_005e8122 — draw line with RGB on DDSurface
export function FUN_005e8122(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { /* DDraw line RGB — DEVIATION: Win32 API */ }

// FUN_005e8216 — draw rect outline with RGB
export function FUN_005e8216(param_1, param_2, param_3, param_4) { /* DDraw rect outline RGB — DEVIATION: Win32 API */ }

// CReObject — MFC CReObject constructor
export function CReObject(obj) { return obj; }

// FUN_005e833b — font cleanup
export function FUN_005e833b() { /* font cleanup — DEVIATION: Win32 API */ }

// FUN_005e83c8 — font release (partial)
export function FUN_005e83c8() { /* font release — DEVIATION: Win32 API */ }

// FUN_005e8401 — rotate palette entries
export function FUN_005e8401(param_1, param_2, param_3) { /* palette rotate — DEVIATION: Win32 API */ }

// FUN_005e866c — save palette range for scaling
export function FUN_005e866c(param_1, param_2, param_3) { /* palette save — DEVIATION: Win32 API */ }

// FUN_005e86f2 — save palette with background color
export function FUN_005e86f2(param_1, param_2, param_3, param_4, param_5, param_6) { /* palette save bg — DEVIATION: Win32 API */ }

// FUN_005e8739 — restore saved palette
export function FUN_005e8739() { /* palette restore — DEVIATION: Win32 API */ }

// FUN_005e87a2 — scale palette toward background
export function FUN_005e87a2(param_1) { /* palette scale — DEVIATION: Win32 API */ }

// FUN_005e8990 — set palette entries on DDPalette
export function FUN_005e8990(param_1, param_2, param_3) { /* DDPalette set — DEVIATION: Win32 API */ }

// register_wndclass_89D0 — register window class + DirectDraw init
export function register_wndclass_89D0() { /* DDraw init — DEVIATION: Win32 API */ return 1; }

// FUN_005e8b04 — DirectDraw shutdown
export function FUN_005e8b04() { /* DDraw shutdown — DEVIATION: Win32 API */ }

// FUN_005e8b54 — create DDPalette from RGB data
export function FUN_005e8b54(param_1, param_2, param_3) { /* DDPalette create — DEVIATION: Win32 API */ return 0; }

// FUN_005e8c29 — release COM object (IUnknown::Release)
export function FUN_005e8c29(param_1) { /* COM release — DEVIATION: Win32 API */ }

// FUN_005e8c54 — set DDPalette entries
export function FUN_005e8c54(param_1, param_2, param_3, param_4) { /* DDPalette set entries — DEVIATION: Win32 API */ }

// FUN_005e8d58 — get DDPalette entries
export function FUN_005e8d58(param_1, param_2, param_3, param_4) { /* DDPalette get entries — DEVIATION: Win32 API */ }

// FUN_005e8e06 — set DDSurface color key
export function FUN_005e8e06(param_1, param_2) { /* DDSurface colorkey — DEVIATION: Win32 API */ }

// FUN_005e8e4f — get DDSurface palette
export function FUN_005e8e4f(param_1) { return 0; }

// FUN_005e8eb0 — create primary DDSurface
export function FUN_005e8eb0(param_1) { return 0; }

// FUN_005e8f4b — get attached back buffer
export function FUN_005e8f4b(param_1) { return 0; }

// FUN_005e8fb7 — create offscreen DDSurface (low-level)
export function FUN_005e8fb7(param_1, param_2) { return 0; }

// FUN_005e906b — release DDSurface (IUnknown::Release)
export function FUN_005e906b(param_1) { /* DDSurface release — DEVIATION: Win32 API */ }

// FUN_005e9091 — restore lost DDSurface
export function FUN_005e9091(param_1) { return 0; }

// FUN_005e910b — get DDSurface pitch
export function FUN_005e910b(param_1) { return 0; }

// FUN_005e9150 — detect DDSurface pixel format
export function FUN_005e9150(param_1) { return 0; }

// FUN_005e924e — lock DDSurface (low-level)
export function FUN_005e924e(param_1) { return 0; }

// FUN_005e92c9 — unlock DDSurface
export function FUN_005e92c9(param_1) { return 0; }

// FUN_005e92fd — set dirty rect on DDSurface
export function FUN_005e92fd(param_1, param_2, param_3) { /* DDSurface dirty rect — DEVIATION: Win32 API */ }

// FUN_005e9331 — map RGB to DDSurface native pixel value
export function FUN_005e9331(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005e9455 — blt DDSurface to DDSurface (retry on busy)
export function FUN_005e9455(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005e9506 — transparent blt (retry on busy)
export function FUN_005e9506(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005e95a4 — fast blt (BltFast, retry on busy)
export function FUN_005e95a4(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005e965c — transparent fast blt
export function FUN_005e965c(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005e96fe — flip DDSurface (page flip)
export function FUN_005e96fe(param_1) { return 0; }

// FUN_005e9783 — color fill DDSurface (retry on busy)
export function FUN_005e9783(param_1, param_2, param_3) { return 0; }

// blit_9838 — blit DIB to DDSurface via GDI BitBlt
export function blit_9838(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { /* GDI→DD blit — DEVIATION: Win32 API */ }

// stretch_blit_98BA — stretch blit DIB to DDSurface
export function stretch_blit_98BA(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) { /* GDI→DD stretchblit — DEVIATION: Win32 API */ }

// FUN_005e9944 — set DDPalette entry (single)
export function FUN_005e9944(param_1, param_2) { /* DDPalette single — DEVIATION: Win32 API */ }

// FUN_005e997c — draw string on DDSurface via GetDC
export function FUN_005e997c(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { return 0; }

// FUN_005e9bd7 — draw formatted text on DDSurface via GetDC
export function FUN_005e9bd7(param_1, param_2, param_3, param_4, param_5) { return 0; }

// FUN_005e9d31 — draw single-line text on DDSurface via GetDC
export function FUN_005e9d31(param_1, param_2, param_3, param_4, param_5) { return 0; }

// FUN_005e9e87 — draw line on DDSurface via GetDC
export function FUN_005e9e87(param_1, param_2, param_3, param_4, param_5) { return 0; }

// FUN_005e9f8a — draw string with RGB on DDSurface via GetDC
export function FUN_005e9f8a(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) { return 0; }

// FUN_005ea1dd — draw formatted text with RGB via GetDC
export function FUN_005ea1dd(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { return 0; }

// FUN_005ea32f — draw single-line text with RGB via GetDC
export function FUN_005ea32f(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { return 0; }

// FUN_005ea47d — draw line with RGB on DDSurface via GetDC
export function FUN_005ea47d(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { return 0; }

// FUN_005ea578 — check DDSurface valid
export function FUN_005ea578(param_1) { return 0; }

// FUN_005ea5c5 — check DDSurface lost
export function FUN_005ea5c5(param_1) { return 0; }

// FUN_005ea610 — set DirectDraw exclusive/normal mode
export function FUN_005ea610(param_1) { /* DDraw mode — DEVIATION: Win32 API */ }

// FUN_005ea677 — get display bit depth
export function FUN_005ea677() { return 8; }

// FUN_005ea6c4 — get DirectDraw vertical blank status
export function FUN_005ea6c4() { return 0; }

// FUN_005ea711 — get monitor refresh frequency
export function FUN_005ea711() { return 0; }

// FUN_005ea779 — empty function (no-op)
export function FUN_005ea779() {}

// FUN_005ea7a0 — set window long (panel attach)
export function FUN_005ea7a0(param_1, param_2) { /* SetWindowLongA — DEVIATION: Win32 API */ }

// FUN_005ea7d7 — find child window by class type
export function FUN_005ea7d7(param_1, param_2) { return 0; }

// FUN_005ea825 — get next sibling window (wrap around)
export function FUN_005ea825(param_1) { return 0; }

// FUN_005ea87c — get previous sibling window (wrap around)
export function FUN_005ea87c(param_1) { return 0; }

// FUN_005ea8d3 — tab-navigate between child windows
export function FUN_005ea8d3(param_1, param_2, param_3) { /* tab nav — DEVIATION: Win32 API */ }

// FUN_005eabcc — handle tab key in dialog
export function FUN_005eabcc(param_1) { /* tab handler — DEVIATION: Win32 API */ }

// FUN_005eac6d — find scrollbar child window
export function FUN_005eac6d(param_1) { return 0; }

// FUN_005eacc0 — panel window WndProc
export function FUN_005eacc0(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005eb2f0 — dispatch scroll-end callback
export function FUN_005eb2f0(in_ECX) { /* callback — DEVIATION: Win32 API */ }

// FUN_005eb330 — dispatch scroll-start callback
export function FUN_005eb330(in_ECX) { /* callback — DEVIATION: Win32 API */ }

// FUN_005eb370 — set window user data
export function FUN_005eb370(param_1, param_2) { /* SetWindowLongA — DEVIATION: Win32 API */ }

// FUN_005eb393 — set window user data + WndProc
export function FUN_005eb393(param_1, param_2) { /* SetWindowLongA — DEVIATION: Win32 API */ }

// FUN_005eb3ca — set window user data (slot 4)
export function FUN_005eb3ca(param_1, param_2) { /* SetWindowLongA — DEVIATION: Win32 API */ }

// FUN_005eb3ed — translate virtual key to internal code
export function FUN_005eb3ed(param_1) {
  let local_8 = G.DAT_006397e8[(param_1 & 0xFF)] || 0;
  if (local_8 !== 0) {
    let iVar1 = FUN_005ecf20();
    if (iVar1 !== 0) local_8 = local_8 | 0x200;
    iVar1 = FUN_005ecef0();
    if (iVar1 !== 0) local_8 = local_8 | 0x100;
  }
  return local_8;
}

// FUN_005eb447 — subpanel window WndProc (scrollbars, menus, input)
export function FUN_005eb447(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005ec1a1 — menu command dispatch
export function FUN_005ec1a1(param_1, param_2) { /* menu dispatch — DEVIATION: Win32 API */ }

// FUN_005ec23a — recursive menu item ID search
export function FUN_005ec23a(param_1, param_2) { return 0; }

// FUN_005ec317 — child panel WndProc (scrollbar variant)
export function FUN_005ec317(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005eceda — empty function (no-op)
export function FUN_005eceda() {}

// FUN_005ecef0 — is shift key pressed
export function FUN_005ecef0() { return false; }

// FUN_005ecf20 — is control key pressed
export function FUN_005ecf20() { return false; }

// FUN_005ecf50 — dispatch mouse move callback
export function FUN_005ecf50(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ecf90 — dispatch left mouse down callback
export function FUN_005ecf90(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ecfd0 — dispatch left mouse up callback (release)
export function FUN_005ecfd0(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed010 — dispatch left click callback
export function FUN_005ed010(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed050 — dispatch right mouse down callback
export function FUN_005ed050(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed090 — dispatch right mouse up callback (release)
export function FUN_005ed090(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed0d0 — dispatch right click callback
export function FUN_005ed0d0(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed110 — dispatch double-click callback
export function FUN_005ed110(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed150 — dispatch key down callback
export function FUN_005ed150(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed190 — dispatch key up callback
export function FUN_005ed190(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed1d0 — dispatch key repeat callback
export function FUN_005ed1d0(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed210 — dispatch char callback
export function FUN_005ed210(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed250 — dispatch close query callback
export function FUN_005ed250() { return 0; }

// FUN_005ed290 — dispatch maximize callback
export function FUN_005ed290() { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed2c0 — dispatch restore callback
export function FUN_005ed2c0() { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed2f0 — dispatch activate callback
export function FUN_005ed2f0() { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed320 — dispatch size callback
export function FUN_005ed320(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed360 — dispatch move callback
export function FUN_005ed360(param_1, param_2) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed3a0 — dispatch timer callback
export function FUN_005ed3a0(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed3e0 — dispatch horizontal scroll callback
export function FUN_005ed3e0(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed420 — dispatch horizontal scroll thumb callback
export function FUN_005ed420(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed460 — dispatch vertical scroll callback
export function FUN_005ed460(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed4a0 — dispatch vertical scroll thumb callback
export function FUN_005ed4a0(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed4e0 — dispatch custom message callback
export function FUN_005ed4e0(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed520 — dispatch palette changed callback
export function FUN_005ed520() { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed550 — dispatch query new palette callback
export function FUN_005ed550() { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed580 — empty function (no-op for resize)
export function FUN_005ed580() {}

// FUN_005ed5a0 — dispatch menu select callback
export function FUN_005ed5a0(param_1, param_2) { return false; }

// FUN_005ed5f0 — dispatch menu command callback
export function FUN_005ed5f0(param_1) { return false; }

// CSplitterWnd_IsTracking (multiple overloads at different offsets)
export function CSplitterWnd_IsTracking_b0(obj) { return obj ? obj[0xb0 / 4] : 0; }
export function CSplitterWnd_IsTracking_b4(obj) { return obj ? obj[0xb4 / 4] : 0; }
export function CSplitterWnd_IsTracking_90(obj) { return obj ? obj[0x90 / 4] : 0; }
export function CSplitterWnd_IsTracking_94(obj) { return obj ? obj[0x94 / 4] : 0; }
export function CSplitterWnd_IsTracking_b8(obj) { return obj ? obj[0xb8 / 4] : 0; }

// FUN_005ed6e0 — dispatch MCI notify callback
export function FUN_005ed6e0() { /* callback — DEVIATION: Win32 API */ }

// FUN_005ed710 — transparent sprite blit via GDI (mask method)
export function FUN_005ed710(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // GDI transparent blit via mask — DEVIATION: Win32 API
}

// FUN_005ed920 — open debug log file
export function FUN_005ed920() { return 1; }

// FUN_005eda65 — close debug log file
export function FUN_005eda65() { return 1; }

// FUN_005edb15 — write string to debug log
export function FUN_005edb15(param_1) { return 1; }

// FUN_005edbb2 — output debug string
export function FUN_005edbb2(param_1) { return 1; }

// FUN_005edc6c — ADPCM-style audio decode (replace)
export function FUN_005edc6c(param_1, param_2, param_3, param_4, param_5) { return 0; }

// FUN_005edcac — ADPCM-style audio decode (add with clamp)
export function FUN_005edcac(param_1, param_2, param_3, param_4, param_5) { return 0; }

// show_messagebox_DD00 — fatal error messagebox + DebugBreak
export function show_messagebox_DD00(param_1, param_2) {
  // MessageBoxA + DebugBreak — DEVIATION: Win32 API
}

// FUN_005edd2b — read line from memory buffer
export function FUN_005edd2b(param_1, param_2) { return null; }

// FUN_005eddaa — stack trace placeholder
export function FUN_005eddaa(param_1) {
  // sprintf "Stack trace not yet available" — DEVIATION: Win32 API
}

// FUN_005eddd0 — check if AVI video driver available
export function FUN_005eddd0() { return false; }

// FUN_005ede3b — close MCI AVI device
export function FUN_005ede3b() { /* MCI close — DEVIATION: Win32 API */ }

// FUN_005ede94 — close MCI device by handle
export function FUN_005ede94(param_1) { /* MCI close — DEVIATION: Win32 API */ }

// FUN_005edebf — open MCI AVI device for playback
export function FUN_005edebf(param_1, param_2) { return null; }

// FUN_005edfcd — set MCI playback mode (normal/fullscreen)
export function FUN_005edfcd(param_1, param_2) { /* MCI mode — DEVIATION: Win32 API */ }

// FUN_005ee002 — MCI play command
export function FUN_005ee002(param_1, param_2) { /* MCI play — DEVIATION: Win32 API */ }

// FUN_005ee04c — MCI get source rect
export function FUN_005ee04c(param_1, param_2) { /* MCI get rect — DEVIATION: Win32 API */ }

// FUN_005ee088 — MCI stop command
export function FUN_005ee088(param_1) { /* MCI stop — DEVIATION: Win32 API */ }

// FUN_005ee0b1 — create movie player window
export function FUN_005ee0b1(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { return null; }

// FUN_005ee450 — destroy movie player
export function FUN_005ee450(param_1) { /* movie destroy — DEVIATION: Win32 API */ }

// FUN_005ee49a — set MCI playback to 2x size
export function FUN_005ee49a(param_1) { /* MCI 2x — DEVIATION: Win32 API */ }

// FUN_005ee4fd — MCI resume playback
export function FUN_005ee4fd(param_1) { /* MCI resume — DEVIATION: Win32 API */ }

// FUN_005ee528 — MCI seek to position
export function FUN_005ee528(param_1, param_2) { /* MCI seek — DEVIATION: Win32 API */ }

// FUN_005ee559 — MCI get current position
export function FUN_005ee559(param_1) { return 0; }

// FUN_005ee591 — set MCI palette from HPALETTE
export function FUN_005ee591(param_1, param_2) { /* MCI palette — DEVIATION: Win32 API */ }

// FUN_005ee6b1 — MCIWnd close current
export function FUN_005ee6b1() { /* MCIWnd close — DEVIATION: Win32 API */ }

// FUN_005ee6e3 — MCIWnd open file
export function FUN_005ee6e3(param_1, param_2) { /* MCIWnd open — DEVIATION: Win32 API */ }

// FUN_005ee757 — MCIWnd create (no file)
export function FUN_005ee757() { /* MCIWnd create — DEVIATION: Win32 API */ }

// FUN_005ee7b1 — MCIWnd open file (child of parent)
export function FUN_005ee7b1(param_1, param_2) { /* MCIWnd open child — DEVIATION: Win32 API */ }

// FUN_005ee825 — MCIWnd create (child, no file)
export function FUN_005ee825(param_1) { /* MCIWnd create child — DEVIATION: Win32 API */ }

// FUN_005ee87f — MCIWnd open device
export function FUN_005ee87f(param_1) { /* MCIWnd device — DEVIATION: Win32 API */ }

// FUN_005ee8c6 — MCIWnd play
export function FUN_005ee8c6() { /* MCIWnd play — DEVIATION: Win32 API */ }

// FUN_005ee8f1 — MCIWnd stop
export function FUN_005ee8f1() { /* MCIWnd stop — DEVIATION: Win32 API */ }

// FUN_005ee91c — MCIWnd seek
export function FUN_005ee91c(param_1) { /* MCIWnd seek — DEVIATION: Win32 API */ }

// FUN_005ee94b — MCIWnd close and destroy
export function FUN_005ee94b() { /* MCIWnd destroy — DEVIATION: Win32 API */ }

// FUN_005ee991 — MCIWnd seek to end
export function FUN_005ee991() { /* MCIWnd seek end — DEVIATION: Win32 API */ }

// FUN_005ee9bc — MCIWnd pause
export function FUN_005ee9bc() { /* MCIWnd pause — DEVIATION: Win32 API */ }

// FUN_005ee9e7 — MCIWnd step
export function FUN_005ee9e7() { /* MCIWnd step — DEVIATION: Win32 API */ }

// FUN_005eea12 — MCIWnd get client rect
export function FUN_005eea12(param_1) { /* GetClientRect — DEVIATION: Win32 API */ }

// FUN_005eea3a — MCIWnd center in parent
export function FUN_005eea3a() { /* MCIWnd center — DEVIATION: Win32 API */ }

// FUN_005eeadd — MCIWnd set size
export function FUN_005eeadd(param_1, param_2) { /* MCIWnd size — DEVIATION: Win32 API */ }

// FUN_005eeb11 — MCIWnd set position
export function FUN_005eeb11(param_1, param_2) { /* MCIWnd pos — DEVIATION: Win32 API */ }

// FUN_005eeb45 — MCIWnd show and realize
export function FUN_005eeb45() { /* MCIWnd show — DEVIATION: Win32 API */ }

// FUN_005eeb7e — MCIWnd hide
export function FUN_005eeb7e() { /* MCIWnd hide — DEVIATION: Win32 API */ }

// FUN_005eeba2 — MCIWnd set volume
export function FUN_005eeba2(param_1) { /* MCIWnd volume — DEVIATION: Win32 API */ }

// FUN_005eebd6 — MCIWnd read palette
export function FUN_005eebd6() { /* MCIWnd palette — DEVIATION: Win32 API */ }

// CSplitterWnd_IsTracking_EC80 (at 0x5EEC80)
export function CSplitterWnd_IsTracking_EC80(obj) { return obj ? obj[0xb0 / 4] : 0; }

// FUN_005eeca0 — init sound object
export function FUN_005eeca0(in_ECX) { return in_ECX; }

// FUN_005eecc3 — open sound file
export function FUN_005eecc3(param_1) { /* sound open — DEVIATION: Win32 API */ return null; }

// FUN_005eed1b — close sound file
export function FUN_005eed1b() { /* sound close — DEVIATION: Win32 API */ }

// FUN_005eed43 — is sound playing
export function FUN_005eed43() { return false; }

// FUN_005eed76 — open audio stream
export function FUN_005eed76(param_1) { return 0; }

// FUN_005eedd1 — get audio position
export function FUN_005eedd1() { FUN_005d5643(); }

// FUN_005eedec — play audio range
export function FUN_005eedec(param_1, param_2) { return 0; }

// FUN_005eee4f — start audio playback
export function FUN_005eee4f() { FUN_005d5f91(); return 0; }

// FUN_005eee6d — returns 0 (DEVIATION: Win32 API — audio)
export function FUN_005eee6d() { return 0; }

// FUN_005eee86 — empty function (no-op)
export function FUN_005eee86() {}

// show_messagebox_EEB0 — show message box with icon/buttons mapping
export function show_messagebox_EEB0(param_1, param_2, param_3) {
  // MessageBoxA with icon/button translation — DEVIATION: Win32 API
  return 0;
}

// show_messagebox_F0B9 — show message box with custom title
export function show_messagebox_F0B9(param_1, param_2, param_3, param_4) {
  // MessageBoxA with custom title — DEVIATION: Win32 API
  return 0;
}

// FUN_005ef320 — set class long (attach panel to window)
export function FUN_005ef320(param_1, param_2) { /* SetClassLongA — DEVIATION: Win32 API */ }

// FUN_005ef356 — create DirectDraw fullscreen window
export function FUN_005ef356(param_1, param_2, param_3, param_4) { return null; }

// FUN_005ef41e — set DirectDraw cooperative level
export function FUN_005ef41e(param_1, param_2) { return 0; }

// FUN_005ef4e3 — set display mode
export function FUN_005ef4e3(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005ef58e — restore display mode
export function FUN_005ef58e() { return 0; }

// FUN_005ef5db — destroy DirectDraw window
export function FUN_005ef5db(param_1) { return 0; }

// FUN_005ef65a — show window
export function FUN_005ef65a(param_1) { return param_1 !== 0; }

// FUN_005ef699 — hide window
export function FUN_005ef699(param_1) { return param_1 !== 0; }

// FUN_005ef6cb — DirectDraw window WndProc
export function FUN_005ef6cb(param_1, param_2, param_3, param_4) { return 0; }

// FUN_005efca3 — call display mode callback
export function FUN_005efca3(param_1, param_2) { return 1; }

// FUN_005efcde — enumerate display modes
export function FUN_005efcde(param_1, param_2) { /* DDraw enum modes — DEVIATION: Win32 API */ }

// FUN_005efd70 — dispatch activate/deactivate callback
export function FUN_005efd70(param_1) { /* callback — DEVIATION: Win32 API */ }

// FUN_005efdc0 — game screen object constructor
export function FUN_005efdc0(in_ECX) { return in_ECX; }

// FUN_005efeb0 — game screen object destructor
export function FUN_005efeb0() { /* destructor — DEVIATION: Win32 API */ }

// FUN_005eff2b — font cleanup thunk
export function FUN_005eff2b() { FUN_005f04c0(); }

// FUN_005eff3a — CString cleanup thunk
export function FUN_005eff3a() { /* CString cleanup — DEVIATION: Win32 API */ }

// FUN_005eff62 — DDSurface cleanup thunk
export function FUN_005eff62() { FUN_005e5ee0(); }

// FUN_005eff75 — SEH frame restore (no-op)
export function FUN_005eff75() {}

// FUN_005eff83 — create fullscreen game screen
export function FUN_005eff83(param_1, param_2, param_3, param_4, param_5, param_6) { return 1; }

// FUN_005effec — create windowed game screen
export function FUN_005effec(param_1, param_2, param_3, param_4, param_5) { return 1; }


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION DECLARATIONS
//
// Functions called from this block but defined elsewhere.
// ═══════════════════════════════════════════════════════════════════

function CRichEditDoc_InvalidateObjectCache(ptr) { /* MFC — no-op */ }
function measure_text_858E(font, str) { return 0; }
function gdi_847F(font) { return 0; }
function gdi_8514(font) { return 0; }
function create_window_931B() { return 0; }
function debug_log(msg) {}
function fill_rect_BE88() { return 0; }
function gdi_D149() {}
function FUN_005eb447_deviation_win32() { return 0; }
function FUN_005eed76_deviation_win32() { return 0; }
function FUN_005eedec_deviation_win32() { return 0; }
function FUN_005eee4f_deviation_win32() {}
