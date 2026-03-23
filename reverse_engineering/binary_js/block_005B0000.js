// ═══════════════════════════════════════════════════════════════════
// block_005B0000.js — Mechanical transpilation of block_005B0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005B0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005B0000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8,
  DAT_006d1160, DAT_006d1162,
  DAT_00655ae8,
  DAT_006560f0,
  DAT_0064b1bc,
  DAT_0064bcc8,
  DAT_00655b16,
  DAT_00636058,
  DAT_0064c600,
  DAT_00627cce, DAT_00627cd4,
  DAT_00655b12,
  DAT_00628350, DAT_00628360,
  DAT_006d1168,
  DAT_0064f340,
  tileRead, tileWrite,
} from './mem.js';

import {
  FUN_004087c0,
  FUN_005ae052,
  FUN_005b8931,
  FUN_005b94d5,
  FUN_005b89bb,
  FUN_005b89e4,
  FUN_005b8a1d,
  FUN_005b8ca6,
  FUN_005b8ee1,
  FUN_005b68f6,
} from './fn_utils.js';

// Re-export fn_utils functions so consumers can import from this block
export {
  FUN_004087c0,
  FUN_005ae052,
  FUN_005b8931,
  FUN_005b94d5,
  FUN_005b89bb,
  FUN_005b89e4,
  FUN_005b8a1d,
  FUN_005b8ca6,
  FUN_005b8ee1,
  FUN_005b68f6,
};

// ═══════════════════════════════════════════════════════════════════
// BYTE-ARRAY ACCESS HELPERS
//
// The C code accesses unit/city/civ data through flat byte arrays with
// stride arithmetic. These helpers read/write 16-bit and 32-bit values
// from Uint8Arrays in little-endian format, matching x86 memory layout.
// ═══════════════════════════════════════════════════════════════════

function rs(arr, off) {
  // Read signed 16-bit (little-endian) from byte array
  const v = arr[off] | (arr[off + 1] << 8);
  return (v & 0x8000) ? (v | 0xFFFF0000) : v;
}

function ru(arr, off) {
  // Read unsigned 16-bit (little-endian)
  return arr[off] | (arr[off + 1] << 8);
}

function ws(arr, off, val) {
  // Write 16-bit (little-endian)
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
}

function ri(arr, off) {
  // Read signed 32-bit (little-endian)
  return arr[off] | (arr[off + 1] << 8) | (arr[off + 2] << 16) | (arr[off + 3] << 24);
}

function wi(arr, off, val) {
  // Write 32-bit (little-endian)
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
  arr[off + 2] = (val >> 16) & 0xFF;
  arr[off + 3] = (val >> 24) & 0xFF;
}

// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════

let DAT_006a4f88 = 0;      // cheat editor instance pointer
let DAT_006a1d7c = 0;       // cheat editor dirty flag
let DAT_006a1d80 = 0;       // cheat editor control ID counter
let DAT_006a4f90 = 0;       // cheat editor property sheet
let DAT_0062e018 = 0;       // cheat editor bitmap
let DAT_0062e01c = 0;       // cheat editor bitmap param
let DAT_00628420 = 0;       // string resource table pointer
let DAT_006ad918 = 0;       // unit stack validation skip flag
let DAT_006ad8d8 = 0;       // pick_up_unit lock flag
let DAT_006ad8dc = 0;       // put_down_unit lock flag
let DAT_006ad8e4 = 0;       // relocate_unit lock flag
let DAT_006ad8e0 = 0;       // move_to_bottom lock flag
let DAT_006ad8bc = 0;       // create_unit lock flag
let DAT_006ad8c0 = 0;       // delete_unit lock flag
let DAT_006ad8f8 = 0;       // stack_ship lock flag
let DAT_006ad8fc = 0;       // stack_unit lock flag
let DAT_006ad900 = 0;       // delete_safely lock flag
let DAT_006ad904 = 0;       // delete_visible lock flag
let DAT_006ad684 = 0;       // movement damage flag
let DAT_00655b02 = 0;       // game mode / multiplayer flag
let DAT_00655b05 = 0;       // active player byte
let DAT_006c90e0 = 0;       // network pick_up ack
let DAT_006c90e8 = 0;       // network put_down ack
let DAT_006c90f8 = 0;       // network relocate ack
let DAT_006c90f0 = 0;       // network move_to_bottom ack
let DAT_006c90d8 = 0;       // network create_unit ack
let DAT_006c90c0 = 0;       // network delete_unit ack
let DAT_006c9108 = 0;       // network stack_ship ack
let DAT_006c9110 = 0;       // network stack_unit ack
let DAT_006c9118 = 0;       // network delete_safely ack
let DAT_006c9120 = 0;       // network delete_visible ack
let DAT_006c8fac = 0;       // network send pending
let DAT_006c8fa0 = 0;       // network receive pending
let DAT_00628044 = 0;       // game running flag
let DAT_00627fd8 = 0;       // next unit serial number
let DAT_00655af8 = 0;       // tutorial enabled
let DAT_00655af4 = 0;       // tutorial flags
let DAT_00655afe = 0;       // current active unit
let DAT_006ced4c = 0;       // nearby enemy civ result
let DAT_006ced50 = 0;       // nearest unit distance result
let DAT_006d1da0 = 0;       // current player civ index
let DAT_006ad699 = 0;       // AI processing flag
let DAT_006ad69a = 0;       // map batch update flag
let DAT_006ad2f7 = 0;       // server flag
let DAT_006365f4 = 0;       // map batch counter
let DAT_006d1164 = 0;       // total tile count (mapW/2 * mapH)
let DAT_006d116a = 0;       // map chunk width
let DAT_006d116c = 0;       // map chunk height
let DAT_006d1170 = 0;       // tile data alloc handle
let DAT_00636598 = 0;       // tile data pointer
let DAT_006365e0 = 0;       // vis layer 1 ptr
let DAT_006d1174 = 0;       // vis layer 1 handle
let DAT_006365e4 = 0;       // vis layer 2 ptr
let DAT_006d1178 = 0;       // vis layer 2 handle
let DAT_006365e8 = 0;       // vis layer 3 ptr
let DAT_006d117c = 0;       // vis layer 3 handle
let DAT_006365ec = 0;       // vis layer 4 ptr
let DAT_006d1180 = 0;       // vis layer 4 handle
let DAT_006365f0 = 0;       // map allocated flag
let DAT_006366a8 = 0;       // text render param
let DAT_006366ac = 0;       // text render param
let DAT_006366b0 = 0;       // text render color fg
let DAT_006366b4 = 0;       // text render color shadow
let DAT_006366b8 = 0;       // text render shadow offset x
let DAT_006366bc = 0;       // text render shadow offset y
let DAT_006366c0 = 0;       // text render bold flag
let DAT_006366cc = 0;       // window stack count
let DAT_00637ea4 = 0;       // active window client area ptr
let DAT_00637efc = 0;       // idle handler flag
let DAT_00638b48 = 0;       // palette mode (0=RGB, 1=indexed)
let DAT_006e4ff0 = 0;       // HINSTANCE of application
let DAT_00637e58 = 0;       // active port pointer
let DAT_0063605c = 0;       // unit name string index
let DAT_006365c0 = [null, null, null, null, null, null, null, null]; // vis layer pointers (Uint8Arrays)
let DAT_006365f8 = [5, 4, 5, 4, 4, 4, 4, 6]; // batch param counts per type
let DAT_006d1188 = new Uint8Array(6); // dummy tile data (6 bytes)
let DAT_006d1190 = new Int32Array(0x100); // map batch buffer
let DAT_006d1db8 = [];      // window stack array
let DAT_00655b0b = 0;       // human civ bitmask
let DAT_00655aea = 0;       // tutorial feature bits
let DAT_0064b1b4 = 0;       // viewport center x
let DAT_0064b1b0 = 0;       // viewport center y
let DAT_0064b9e8 = [];      // civ total unit count
let DAT_0064c6c0 = [];      // diplomacy table
let DAT_0064c706 = [];      // civ support units count
let DAT_0064c708 = [];      // civ city count
let DAT_0064c778 = [];      // civ per-type unit count
let DAT_0064ca32 = [];      // city improvements
let DAT_0064f348 = [];      // city owner byte
let DAT_0064f349 = [];      // city size byte
let DAT_0064f360 = [];      // city name strings
let DAT_00666137 = [];      // tech known bitmask table


// ═══════════════════════════════════════════════════════════════════
// FUN_005b02a5 — editor_set_scroll_mode (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b02a5() {
  let iVar1 = FUN_00418d60();
  if (iVar1 === 0) { FUN_0043c5f0(); FUN_0043c5f0(); }
  else if (iVar1 === 1) { FUN_0043c5f0(); FUN_0040f380(); }
  else if (iVar1 === 2) { FUN_0040f380(); FUN_0043c5f0(); }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b0373 — editor_command_handler (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b0373 (256 bytes)
export function FUN_005b0373(param_1) {
  let iVar1;
  let local_8;

  if (param_1 === 0xc9) {
    iVar1 = FUN_005af4ae(); // check if multi-player
    if (iVar1 === 0) {
      // let uVar2 = FUN_00418d60(); // DEVIATION: MFC — get selected tab index
      // wi(DAT_006a4f88, 0x2ec, uVar2); // DEVIATION: MFC — store tab index
      FUN_005af343(); // update display
      FUN_005b02a5(); // refresh view
      FUN_005af682(); // finalize
    } else {
      // FUN_00418d90(ri(DAT_006a4f88, 0x2ec)); // DEVIATION: MFC — set tab
      FUN_005af343(); // update display
      FUN_005af682(); // finalize
      local_8 = (DAT_006a4f88 === 0) ? 0 : DAT_006a4f88 + 0x48;
      FUN_0059d3c9(local_8); // DEVIATION: sound
      FUN_004190d0("DEBUG", "NOTICE"); // DEVIATION: Win32 — show dialog
      FUN_0059d3c9(0); // DEVIATION: sound off
      // let hWnd = FUN_00418770(); // DEVIATION: MFC — get HWND
      // SetFocus(hWnd); // DEVIATION: Win32 — SetFocus
    }
  } else if (param_1 === 0xcd) {
    FUN_005b02a5(); // refresh view
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b0473 — editor_create_controls (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b0473 (1111 bytes)
export function FUN_005b0473(param_1) {
  let iVar1, iVar2;
  let uVar3;
  let local_20, local_24;
  let local_14 = new Uint8Array(16);

  // iVar1 = ri(DAT_00635df8, param_1 * 8) + ri(in_ECX, 0x124); // DEVIATION: MFC
  // iVar2 = ri(DAT_00635dfc, param_1 * 8) + ri(in_ECX, 0x128); // DEVIATION: MFC
  if (param_1 === 0) {
    // FUN_004086c0(local_14, iVar1 - 0xf, iVar2, 0x82, ri(in_ECX, 0x2e8) << 3); // DEVIATION: MFC
  } else {
    // FUN_004086c0(local_14, iVar1 - 0x1e, iVar2, 0xa0, ri(in_ECX, 0x2e8) << 3); // DEVIATION: MFC
  }
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = DAT_006a1d80 + 1;
  // let local_2c = (in_ECX === 0) ? 0 : in_ECX + 0x48; // DEVIATION: MFC
  // FUN_00418bf0(local_2c, iVar1, local_14); // DEVIATION: MFC — create listbox
  // FUN_00418c70(DAT_006a4f90); // DEVIATION: MFC — set font
  // FUN_00418dd0(0x0040326f); // DEVIATION: MFC — set handler
  switch (param_1) {
  case 0: // unit types
    for (local_20 = 0; local_20 < 0x3e; local_20 = local_20 + 1) {
      uVar3 = FUN_00428b0c(DAT_0064b1b8[local_20 * 0x14]); // unit name
      // FUN_00418ce0(uVar3); // DEVIATION: MFC — add listbox item
    }
    break;
  case 1: // techs (part 1)
  case 2: // techs (part 2)
    uVar3 = FUN_00428b0c(DAT_00628420[0x7c0 / 4]); // header 1
    // FUN_00418ce0(uVar3); // DEVIATION: MFC
    uVar3 = FUN_00428b0c(DAT_00628420[0x7c4 / 4]); // header 2
    // FUN_00418ce0(uVar3); // DEVIATION: MFC
    for (local_24 = 0; local_24 < 100; local_24 = local_24 + 1) {
      uVar3 = FUN_00428b0c(DAT_00627684[local_24 * 0x10]); // tech name
      // FUN_00418ce0(uVar3); // DEVIATION: MFC
    }
    break;
  case 3: // governments
    let govResources = [0x794, 0x798, 0x7e0, 0x7e4, 0x7e8, 0x7ec, 0x7f0, 0x7f4];
    for (let r of govResources) {
      uVar3 = FUN_00428b0c(DAT_00628420[r / 4]);
      // FUN_00418ce0(uVar3); // DEVIATION: MFC
    }
    break;
  case 4: // misc
    let miscResources = [0x7f8, 0x7fc, 0x800];
    for (let r of miscResources) {
      uVar3 = FUN_00428b0c(DAT_00628420[r / 4]);
      // FUN_00418ce0(uVar3); // DEVIATION: MFC
    }
    break;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b08e8 — editor_create_button (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b08e8 (244 bytes)
export function FUN_005b08e8(param_1) {
  let local_14 = new Uint8Array(16);

  // FUN_004086c0(local_14, DAT_00635e20[param_1 * 2] + ri(in_ECX, 0x124),
  //              DAT_00635e24[param_1 * 2] + ri(in_ECX, 0x128), 0x30,
  //              ri(in_ECX, 0x2e8) + 6); // DEVIATION: MFC — calc button rect
  let iVar1 = DAT_006a1d80;
  DAT_006a1d80 = DAT_006a1d80 + 1;
  // let local_24 = (in_ECX === 0) ? 0 : in_ECX + 0x48; // DEVIATION: MFC
  // FUN_00418910(local_24, iVar1, local_14, DAT_00635fe0); // DEVIATION: MFC — create button
  // FUN_004189c0(3); // DEVIATION: MFC — set button type
  // FUN_00418a00(0x00401019); // DEVIATION: MFC — set handler
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b09dc — editor_paint (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b09dc (1627 bytes)
export function FUN_005b09dc() {
  let uVar1;
  let local_28 = new Uint8Array(16);
  let local_18;
  let local_14, local_10, local_c, local_8;

  FUN_00552112(); // DEVIATION: MFC — begin paint
  if (DAT_0062e018 === 0 || DAT_006a1d7c === 0) {
    // FUN_0040fdb0(in_ECX, in_ECX + 700, 0x1d); // DEVIATION: MFC — fill background
  } else {
    // FUN_005a9afe(DAT_0062e018, in_ECX, 0, 0, ri(in_ECX, 0x124), ri(in_ECX, 0x128),
    //             ri(in_ECX, 0x2d8), ri(in_ECX, 0x2dc)); // DEVIATION: MFC — draw bitmap
  }
  local_8 = 0x20; // DEVIATION: ri(in_ECX, 0x124) + 0x20
  local_c = 0x20; // DEVIATION: ri(in_ECX, 0x128) + 0x20
  // local_18 = DAT_00641848 + ri(in_ECX, 0x2ec) * 0x3c; // DEVIATION: MFC — sprite ptr
  uVar1 = FUN_00417f70(); // get tile size
  // FUN_005a9abf(in_ECX, local_8, local_c, 0x40, 0x40, uVar1); // DEVIATION: blit
  // FUN_005cef66(local_28, in_ECX, 0, local_8, local_c + 8); // DEVIATION: draw
  // FUN_004ccb6a(in_ECX, local_8, local_c, 0x40, 0x40, 6); // DEVIATION: border
  // FUN_004ccb6a(in_ECX, 0x79, 0x4f, 0x14d, 0x47, 6); // DEVIATION: border for parameter area
  // FUN_005baeb0(in_ECX); // DEVIATION: MFC
  // FUN_005baec8(DAT_006a4f90); // DEVIATION: MFC
  // FUN_005baee0(0x29, 0x12, 1, 1); // DEVIATION: MFC
  // Draw 13 parameter labels using FUN_0040bbb0/FUN_0040bc10/FUN_005bb024
  let labelCodes = [0x1e9, 0x7e, 0x1de, 0x1df, 0x1e0, 0x1e1, 0x1e2, 0x1e3, 0x1e4, 0x1e5, 0x1e6, 0x1e7, 0x1e8];
  let labelOffsets = [
    [0x00635e04, 0], [0x00635e00, 0x32], [0x00635e08, 0x32], [0x00635e10, 0x32],
    [0x00635e18, 0x32], [0x00635e20, 0x18], [0x00635e28, 0x18], [0x00635e30, 0x18],
    [0x00635e38, 0x18], [0x00635e40, 0x18], [0x00635e48, 0x18], [0x00635e50, 0x18],
    [0x00635e58, 0x18]
  ];
  for (let li = 0; li < 13; li++) {
    FUN_0040bbb0(); // DEVIATION: MFC — begin text
    FUN_0040bc10(labelCodes[li]); // DEVIATION: MFC — load text by resource ID
    // FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0); // DEVIATION: MFC — draw text
  }
  FUN_00408460(); // DEVIATION: MFC — invalidate
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1037 — editor_dialog_init (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b1037 (2484 bytes)
export function FUN_005b1037() {
  let iVar4, iVar5;
  let local_468;

  // DEVIATION: SEH, GDI init
  FUN_005c64da(); // DEVIATION: GDI init
  DAT_006a1d7c = 1;
  // DAT_006a4f88 = in_ECX; // DEVIATION: MFC
  // local_468 = FUN_005bd630(); // DEVIATION: MFC — create DC (operator_new 0x48)
  local_468 = 0;
  DAT_0062e018 = local_468;
  // FUN_00417ef0(0, DAT_0062e01c); // DEVIATION: MFC
  // FUN_005d268e, FUN_005d25a8, FUN_005d2550, FUN_005d2568, FUN_005d2590 — font/palette init
  // in_ECX[0x2d8] = 0x230; in_ECX[0x2dc] = 0x17c; in_ECX[0x2ec] = 0; // DEVIATION: MFC
  DAT_006a1d80 = 0xc9;
  FUN_005bf071("EDITORSA.GIF", 10, 0xc0, new Uint8Array(1076)); // DEVIATION: load editor bitmap
  // in_ECX[0x2e8] = FUN_0040ef70(); // DEVIATION: MFC — font height
  // Dialog setup via FUN_00428b0c + FUN_005534bc (title bar)
  // FUN_004086c0 — calculate rectangles for controls
  // 5 tab pages created via FUN_005b0473(0..4) + FUN_005b08e8(0..12)
  iVar4 = DAT_006a1d80;
  DAT_006a1d80 = DAT_006a1d80 + 1;
  for (let tabIdx = 0; tabIdx < 5; tabIdx++) {
    FUN_005b0473(tabIdx); // create tab content
  }
  for (let btnIdx = 0; btnIdx < 13; btnIdx++) {
    FUN_005b08e8(btnIdx); // create parameter buttons
  }
  FUN_005b09dc(); // paint editor
  FUN_005869d4(); // DEVIATION: display params (from block_00580000)
  // Button layout: OK, Cancel buttons via FUN_0040f680/FUN_0040f880
  // FUN_0040f840(); FUN_0040f350(0); // DEVIATION: MFC — default/show
  // CPropertySheet_EnableStackedTabs(in_ECX, 0x401c0d); // DEVIATION: MFC
  // FUN_005bb574(); FUN_004085f0(); FUN_005c61b0(); // DEVIATION: MFC — show dialog
  // while (DAT_006a1d7c !== 0) { FUN_0040ef50(); } // DEVIATION: MFC — message loop
  if (DAT_0062e018 !== 0) {
    // FUN_0040f010(1); // DEVIATION: MFC — destroy DC
  }
  DAT_0062e018 = 0;
  // DEVIATION: SEH cleanup chain
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a05 — editor_cleanup_1 (FW)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a05() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a1b — editor_seh_restore (FW)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a1b() {
  // SEH chain restore — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a29 — editor_open (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a29() {
  FUN_00417fa0();
  FUN_005b1037();
  FUN_005bb574();
  FUN_005b1a82();
  FUN_005b1a98();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a82 — editor_cleanup_2 (FW)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a82() {
  FUN_004183d0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a98 — editor_seh_restore_2 (FW)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a98() {
  // SEH chain restore — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2590 — validate_unit_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2590(param_1) {
  let sVar1, sVar2;
  let iVar3;
  let local_24;
  let local_14;
  let local_8;

  if (param_1 < 0 || 0x801 < param_1) {
    FUN_005dae6b(7, 'id > 0 && id < MAX_UNITS + 2', 'Unit.cpp', 0x11);
  }
  local_8 = 1;
  if (DAT_006ad918 === 0) {
    iVar3 = FUN_005b50ad(param_1, 0xb);
    if (0x7ff < iVar3) {
      FUN_005d2279('Infinite unit stack (id = %d)', param_1);
      local_8 = 0;
      local_14 = param_1;
      sVar1 = rs(DAT_006560f0, param_1 * 0x20 + 0x18);
      do {
        local_24 = sVar1;
        if (local_14 < 0) break;
        let sx = rs(DAT_006560f0, local_14 * 0x20);
        let sy = rs(DAT_006560f0, local_14 * 0x20 + 2);
        pick_up_unit_005b319e(local_14, 0);
        FUN_005b345f(local_14, sx, sy, 0);
        local_14 = local_24;
        sVar1 = rs(DAT_006560f0, local_24 * 0x20 + 0x18);
      } while (local_24 !== param_1);
    }
    // Validate prev-links for dead units
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let prevLink = rs(DAT_006560f0, local_24 * 0x20 + 0x16);
      if (prevLink < 0) break;
      iVar3 = prevLink;
      let serial = ri(DAT_006560f0, prevLink * 0x20 + 0x1a);
      if (serial === 0) {
        FUN_005d2279('Dead unit in unit stack (id = %d)', local_24);
        local_8 = 0;
        ws(DAT_006560f0, local_24 * 0x20 + 0x16, 0xffff);
        let nextOfPrev = rs(DAT_006560f0, iVar3 * 0x20 + 0x18);
        if (nextOfPrev === local_24) {
          ws(DAT_006560f0, iVar3 * 0x20 + 0x18, 0xffff);
        }
      }
    }
    // Validate next-links for dead units
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let nextLink = rs(DAT_006560f0, local_24 * 0x20 + 0x18);
      if (nextLink < 0) break;
      iVar3 = nextLink;
      let serial = ri(DAT_006560f0, local_24 * 0x20 + 0x1a);
      if (serial === 0) {
        FUN_005d2279('Dead unit in unit stack (id = %d)', local_24);
        local_8 = 0;
        ws(DAT_006560f0, local_24 * 0x20 + 0x18, 0xffff);
        let prevOfNext = rs(DAT_006560f0, iVar3 * 0x20 + 0x16);
        if (prevOfNext === local_24) {
          ws(DAT_006560f0, iVar3 * 0x20 + 0x16, 0xffff);
        }
      }
    }
    // Validate prev-link location consistency
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let prevLink = rs(DAT_006560f0, local_24 * 0x20 + 0x16);
      if (prevLink < 0) break;
      iVar3 = prevLink;
      if (rs(DAT_006560f0, prevLink * 0x20) !== rs(DAT_006560f0, local_24 * 0x20) ||
          rs(DAT_006560f0, prevLink * 0x20 + 2) !== rs(DAT_006560f0, local_24 * 0x20 + 2)) {
        FUN_005d2279('Crossed locations in unit stack', local_24);
        local_8 = 0;
        ws(DAT_006560f0, local_24 * 0x20 + 0x16, 0xffff);
        let nextOfPrev = rs(DAT_006560f0, iVar3 * 0x20 + 0x18);
        if (nextOfPrev === local_24) {
          ws(DAT_006560f0, iVar3 * 0x20 + 0x18, 0xffff);
        }
      }
    }
    // Validate next-link location consistency
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let nextLink = rs(DAT_006560f0, local_24 * 0x20 + 0x18);
      if (nextLink < 0) break;
      iVar3 = nextLink;
      if (rs(DAT_006560f0, nextLink * 0x20) !== rs(DAT_006560f0, local_24 * 0x20) ||
          rs(DAT_006560f0, nextLink * 0x20 + 2) !== rs(DAT_006560f0, local_24 * 0x20 + 2)) {
        FUN_005d2279('Crossed locations in unit stack', local_24);
        local_8 = 0;
        ws(DAT_006560f0, local_24 * 0x20 + 0x18, 0xffff);
        let prevOfNext = rs(DAT_006560f0, iVar3 * 0x20 + 0x16);
        if (prevOfNext === local_24) {
          ws(DAT_006560f0, iVar3 * 0x20 + 0x16, 0xffff);
        }
      }
    }
  } else {
    local_8 = 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b29aa — get_unit_type_hit_points (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b29aa(param_1) {
  return s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 0x0A]);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b29d7 — get_unit_hp_remaining (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b29d7(param_1) {
  let iVar1;
  if ((DAT_00655ae8 & 0x10) === 0) {
    DAT_006560f0[param_1 * 0x20 + 0x0A] = 0;
  }
  iVar1 = FUN_005b29aa(param_1);
  iVar1 = iVar1 - u8(DAT_006560f0[param_1 * 0x20 + 0x0A]);
  if (iVar1 < 1) iVar1 = 0;
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2a39 — get_unit_total_moves (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2a39(param_1) {
  let iVar1, iVar2;
  let uVar3;
  let local_14;
  let local_10;
  let unitType = u8(DAT_006560f0[param_1 * 0x20 + 6]);

  local_10 = s8(DAT_0064b1bc[unitType * 0x14 + 6]);
  if (local_10 === 0) {
    uVar3 = 0;
  } else {
    if (DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) {
      iVar1 = s8(DAT_006560f0[param_1 * 0x20 + 7]);
      iVar2 = FUN_004bd9f0(iVar1, 0x3b);
      if (iVar2 !== 0) local_10 = local_10 + DAT_0064bcc8;
      iVar2 = FUN_00453e51(iVar1, 0xc);
      if (iVar2 !== 0) local_10 = local_10 + DAT_0064bcc8 * 2;
      iVar1 = FUN_00453e51(iVar1, 3);
      if (iVar1 !== 0 && (DAT_0064b1bc[unitType * 0x14] & 0x20) === 0) {
        local_10 = local_10 + DAT_0064bcc8;
      }
    }
    uVar3 = local_10;
    if (DAT_006560f0[param_1 * 0x20 + 0x0A] !== 0 &&
        (DAT_00655ae8 & 0x10) !== 0 &&
        DAT_0064b1bc[unitType * 0x14 + 5] !== 0x01) {
      iVar1 = FUN_005b29aa(param_1);
      if (iVar1 < 2) iVar1 = 1;
      iVar2 = FUN_005b29d7(param_1);
      local_10 = Math.trunc((iVar2 * local_10) / iVar1);
      if (local_10 % DAT_0064bcc8 !== 0) {
        local_10 = local_10 + (DAT_0064bcc8 - local_10 % DAT_0064bcc8);
      }
      if (DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) {
        local_14 = DAT_0064bcc8 * 2;
      } else {
        local_14 = DAT_0064bcc8;
      }
      uVar3 = local_14;
      if (local_14 <= local_10) uVar3 = local_10;
    }
  }
  return uVar3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2c3d — get_unit_moves_remaining (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2c3d(param_1) {
  let iVar1 = FUN_005b2a39(param_1);
  iVar1 = iVar1 - u8(DAT_006560f0[param_1 * 0x20 + 8]);
  if (iVar1 < 1) iVar1 = 0;
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2c82 — get_next_unit_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2c82(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    param_1 = rs(DAT_006560f0, param_1 * 0x20 + 0x18);
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2cc3 — get_last_unit_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2cc3(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    let next = rs(DAT_006560f0, param_1 * 0x20 + 0x18);
    while (-1 < next && next !== param_1) {
      param_1 = next;
      next = rs(DAT_006560f0, param_1 * 0x20 + 0x18);
    }
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2d39 — get_first_unit_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2d39(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    let prev = rs(DAT_006560f0, param_1 * 0x20 + 0x16);
    while (-1 < prev && prev !== param_1) {
      param_1 = prev;
      prev = rs(DAT_006560f0, param_1 * 0x20 + 0x16);
    }
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2daf — find_first_unit_at_xy_for_civ (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2daf(param_1, param_2, param_3) {
  let local_c;
  let local_8 = -1;
  for (local_c = 0; local_8 < 0 && local_c < DAT_00655b16; local_c++) {
    if (ri(DAT_006560f0, local_c * 0x20 + 0x1a) !== 0 &&
        rs(DAT_006560f0, local_c * 0x20) === param_2 &&
        rs(DAT_006560f0, local_c * 0x20 + 2) === param_3 &&
        s8(DAT_006560f0[local_c * 0x20 + 7]) === param_1) {
      local_8 = local_c;
    }
  }
  return FUN_005b2d39(local_8);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2e69 — find_first_unit_at_xy (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2e69(param_1, param_2) {
  let iVar1;
  let uVar2;
  let local_c;
  let local_8 = -1;

  if (DAT_00636058 === 0 || (iVar1 = FUN_005b8d62(param_1, param_2), -1 < iVar1)) {
    for (local_c = 0; local_8 < 0 && local_c < DAT_00655b16; local_c++) {
      if (ri(DAT_006560f0, local_c * 0x20 + 0x1a) !== 0 &&
          rs(DAT_006560f0, local_c * 0x20) === param_1 &&
          rs(DAT_006560f0, local_c * 0x20 + 2) === param_2) {
        local_8 = local_c;
      }
    }
    if (-1 < local_8) FUN_005b2590(local_8);
    uVar2 = FUN_005b2d39(local_8);
  } else {
    uVar2 = -1;
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2f50 — set_unit_order_goto (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2f50(param_1) {
  if (DAT_006560f0[param_1 * 0x20 + 0x0F] !== 0x03) {
    ws(DAT_006560f0, param_1 * 0x20 + 0x12, 0xffff);
  }
  DAT_006560f0[param_1 * 0x20 + 0x0F] = 3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2f92 — get_nth_unit_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2f92(param_1, param_2) {
  let local_8 = -1;
  let local_c = -1;
  for (param_1 = FUN_005b2d39(param_1); local_c < 0 && -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    local_8++;
    if (local_8 === param_2) local_c = param_1;
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3007 — count_units_prev_chain (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3007(param_1) {
  let local_8 = -1;
  while (-1 < param_1) {
    local_8++;
    param_1 = rs(DAT_006560f0, param_1 * 0x20 + 0x16);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3046 — find_nth_unit_of_role (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3046(param_1, param_2, param_3) {
  let local_10;
  let local_8 = -1;
  let local_c = -1;
  for (local_10 = FUN_005b2d39(param_1); local_c < 0 && -1 < local_10; local_10 = FUN_005b2c82(local_10)) {
    if (DAT_0064b1bc[u8(DAT_006560f0[local_10 * 0x20 + 6]) * 0x14 + 0x0E] === param_3) {
      local_8++;
      if (local_8 === param_2) local_c = local_10;
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b30e9 — count_units_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b30e9(param_1) {
  let local_8 = 0;
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    local_8++;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3136 — count_units_of_type_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3136(param_1, param_2) {
  let local_8 = 0;
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    if (DAT_006560f0[param_1 * 0x20 + 6] === param_2) local_8++;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// pick_up_unit_005b319e — remove unit from tile stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function pick_up_unit_005b319e(param_1, param_2) {
  let sVar1, sVar2;
  let iVar4;

  DAT_006ad8d8 = 1;
  if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    sVar1 = rs(DAT_006560f0, param_1 * 0x20 + 0x16);
    if (-1 < sVar1) {
      ws(DAT_006560f0, sVar1 * 0x20 + 0x18, ru(DAT_006560f0, param_1 * 0x20 + 0x18));
    }
    sVar2 = rs(DAT_006560f0, param_1 * 0x20 + 0x18);
    if (-1 < sVar2) {
      ws(DAT_006560f0, sVar2 * 0x20 + 0x16, ru(DAT_006560f0, param_1 * 0x20 + 0x16));
    }
    ws(DAT_006560f0, param_1 * 0x20 + 0x16, 0xffff);
    ws(DAT_006560f0, param_1 * 0x20 + 0x18, 0xffff);

    if (sVar2 < 0 && sVar1 < 0) {
      iVar4 = FUN_004087c0(rs(DAT_006560f0, param_1 * 0x20), rs(DAT_006560f0, param_1 * 0x20 + 2));
      if (iVar4 !== 0) {
        let tOff = FUN_005b8931(rs(DAT_006560f0, param_1 * 0x20), rs(DAT_006560f0, param_1 * 0x20 + 2));
        // Clear unit-present bit (bit 0) on tile byte[1]
        tileWrite(tOff, 1, u8(tileRead(tOff, 1)) & 0xfe);
      }
    }
    // Move unit to off-map holding position
    let ownerCiv = s8(DAT_006560f0[param_1 * 0x20 + 7]);
    let offX = (ownerCiv * 4 + 4) * -0x19;
    let offY = offX;
    ws(DAT_006560f0, param_1 * 0x20, offX & 0xFFFF);
    ws(DAT_006560f0, param_1 * 0x20 + 2, offY & 0xFFFF);

    if (2 < DAT_00655b02 && param_2 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8d8 = 0;
  } else {
    // Multiplayer client path
    DAT_006ad8d8 = 0;
    DAT_006c90e0 = -2;
    FUN_0046b14d(0x3f, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    // while (DAT_006c90e0 === -2) { // DEVIATION: Win32 — network wait loop
    //   FUN_00421bb0(); // DEVIATION: Win32 — message pump
    //   FUN_0047e94e(1, 0); // DEVIATION: Win32 — process messages
    // }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b345f — put_down_unit_at (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b345f(param_1, param_2, param_3, param_4) {
  let iVar2;
  let local_14;

  DAT_006ad8dc = 1;
  if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    iVar2 = FUN_005b2daf(s8(DAT_006560f0[param_1 * 0x20 + 7]), param_2, param_3);
    ws(DAT_006560f0, param_1 * 0x20, param_2 & 0xFFFF);
    ws(DAT_006560f0, param_1 * 0x20 + 2, param_3 & 0xFFFF);
    ws(DAT_006560f0, param_1 * 0x20 + 0x16, 0xffff);
    ws(DAT_006560f0, param_1 * 0x20 + 0x18, iVar2 & 0xFFFF);

    if (iVar2 < 0) {
      iVar2 = FUN_004087c0(param_2, param_3);
      if (iVar2 !== 0) {
        iVar2 = FUN_005b8931(param_2, param_3);
        // Set unit-present bit (bit 0) on tile byte[1]
        tileWrite(iVar2, 1, u8(tileRead(iVar2, 1)) | 1);
        local_14 = s8(DAT_006560f0[param_1 * 0x20 + 7]);
        if (local_14 < 0 || 8 < local_14) local_14 = 0xf;
        // Set owner high nibble on tile byte[5]
        iVar2 = FUN_005b8931(param_2, param_3);
        tileWrite(iVar2, 5, u8(tileRead(iVar2, 5)) & 0xf);
        tileWrite(iVar2, 5, u8(tileRead(iVar2, 5)) | ((local_14 << 4) & 0xFF));
      }
    } else {
      ws(DAT_006560f0, iVar2 * 0x20 + 0x16, param_1 & 0xFFFF);
    }

    if (2 < DAT_00655b02 && param_4 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8dc = 0;
  } else {
    // Multiplayer client path
    DAT_006ad8dc = 0;
    DAT_006c90e8 = -2;
    FUN_0046b14d(0x41, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b36df — relocate_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b36df(param_1, param_2, param_3, param_4) {
  DAT_006ad8e4 = 1;
  if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    pick_up_unit_005b319e(param_1, 0);
    FUN_005b345f(param_1, param_2, param_3, 0);
    if (2 < DAT_00655b02 && param_4 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8e4 = 0;
  } else {
    DAT_006ad8e4 = 0;
    DAT_006c90f8 = -2;
    FUN_0046b14d(0x45, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3863 — restack_unit_at_current_pos (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3863(param_1, param_2) {
  FUN_005b36df(param_1, rs(DAT_006560f0, param_1 * 0x20), rs(DAT_006560f0, param_1 * 0x20 + 2), param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b389f — move_unit_to_bottom_of_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b389f(param_1, param_2) {
  let uVar1, uVar2;
  let local_14;

  if (rs(DAT_006560f0, param_1 * 0x20 + 0x18) >= 0) {
    DAT_006ad8e0 = 1;
    if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
      if (rs(DAT_006560f0, param_1 * 0x20 + 0x18) >= 0) {
        uVar1 = ru(DAT_006560f0, param_1 * 0x20);
        uVar2 = ru(DAT_006560f0, param_1 * 0x20 + 2);
        local_14 = FUN_005b2d39(param_1);
        if (local_14 === param_1) local_14 = FUN_005b2c82(param_1);
        pick_up_unit_005b319e(param_1, 0);
        let last = FUN_005b2cc3(local_14);
        ws(DAT_006560f0, last * 0x20 + 0x18, param_1 & 0xFFFF);
        ws(DAT_006560f0, param_1 * 0x20 + 0x16, last & 0xFFFF);
        ws(DAT_006560f0, param_1 * 0x20 + 0x18, 0xffff);
        ws(DAT_006560f0, param_1 * 0x20, uVar1);
        ws(DAT_006560f0, param_1 * 0x20 + 2, uVar2);
      }
      if (2 < DAT_00655b02 && param_2 !== 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        XD_FlushSendBuffer(5000);
      }
      DAT_006ad8e0 = 0;
    } else {
      DAT_006ad8e0 = 0;
      DAT_006c90f0 = -2;
      FUN_0046b14d(0x43, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3ae0 — relocate_all_units_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3ae0(param_1, param_2, param_3, param_4) {
  let iVar1;
  let local_8 = FUN_005b2d39(param_1);
  while (-1 < local_8) {
    iVar1 = FUN_005b2c82(local_8);
    FUN_005b36df(local_8, param_2, param_3, 0);
    local_8 = iVar1;
  }
  if (2 < DAT_00655b02 && param_4 !== 0) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3b78 — unload_ships_from_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3b78(param_1, param_2) {
  let sVar1, sVar2;
  let iVar3;
  let local_10 = -1;

  if (-1 < param_1) {
    sVar1 = rs(DAT_006560f0, param_1 * 0x20);
    sVar2 = rs(DAT_006560f0, param_1 * 0x20 + 2);
    iVar3 = FUN_005b2d39(param_1);
    while (param_1 = iVar3, -1 < param_1) {
      iVar3 = FUN_005b2c82(param_1);
      if (DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
        local_10 = param_1;
        let ownerCiv = s8(DAT_006560f0[param_1 * 0x20 + 7]);
        let offCoord = (ownerCiv * 4 + 4) * -0x4b;
        FUN_005b36df(param_1, offCoord, offCoord, param_2);
      }
    }
    if (-1 < local_10) {
      param_1 = FUN_005b2d39(local_10);
      while (-1 < param_1) {
        iVar3 = FUN_005b2c82(param_1);
        FUN_005b36df(param_1, sVar1, sVar2, param_2);
        param_1 = iVar3;
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3cd4 — unload_and_get_first (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3cd4(param_1, param_2) {
  FUN_005b3b78(param_1, param_2);
  return FUN_005b2d39(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3d06 — create_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3d06(param_1, param_2, param_3, param_4) {
  let iVar3, iVar4;
  let local_10;
  let local_c;

  DAT_006ad8bc = 1;
  if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    // Find empty slot
    for (local_10 = 0; local_10 < DAT_00655b16 && ri(DAT_006560f0, local_10 * 0x20 + 0x1a) !== 0; local_10++) {}
    if (DAT_00655b16 === local_10) {
      if (0x7ff < DAT_00655b16) {
        DAT_006ad8bc = 0;
        return -1;
      }
      DAT_00655b16 = DAT_00655b16 + 1;
    }
    // Update civ bookkeeping
    // C: (char)(&DAT_0064b1ca)[param_1 * 0x14] < '\x05'
    if (s8(DAT_0064b1bc[param_1 * 0x14 + 0x0E]) < 5) {
      // C: *(short *)(&DAT_0064c706 + param_2 * 0x594) += 1
      ws(DAT_0064c706, param_2 * 0x594, rs(DAT_0064c706, param_2 * 0x594) + 1);
    }
    // C: (&DAT_0064c778)[param_2 * 0x594 + param_1] += 1
    DAT_0064c778[param_2 * 0x594 + param_1] = (DAT_0064c778[param_2 * 0x594 + param_1] + 1) & 0xFF;
    // C: *(int *)(&DAT_0064b9e8 + param_2 * 4) += 1
    wi(DAT_0064b9e8, param_2 * 4, ri(DAT_0064b9e8, param_2 * 4) + 1);

    // Initialize unit fields
    DAT_006560f0[local_10 * 0x20 + 6] = param_1 & 0xFF;           // unit type
    DAT_006560f0[local_10 * 0x20 + 7] = param_2 & 0xFF;           // owner
    wi(DAT_006560f0, local_10 * 0x20 + 0x1a, DAT_00627fd8);       // serial
    DAT_00627fd8++;
    DAT_006560f0[local_10 * 0x20 + 8] = 0;                         // moves spent
    if (DAT_00655b02 >= 3 && DAT_006ad684 !== 0) {
      DAT_006560f0[local_10 * 0x20 + 8] = FUN_005b2a39(local_10) & 0xFF;
    }
    DAT_006560f0[local_10 * 0x20 + 0x0A] = 0;                     // hp lost
    DAT_006560f0[local_10 * 0x20 + 0x0C] = 0x58;                   // shield charge (default)
    ws(DAT_006560f0, local_10 * 0x20 + 4, 0);                      // status flags
    DAT_006560f0[local_10 * 0x20 + 9] = 0;                         // visibility
    DAT_006560f0[local_10 * 0x20 + 0x0F] = 0xff;                   // orders (none)
    DAT_006560f0[local_10 * 0x20 + 0x10] = 0xff;                   // home city (none)
    // Find home city at param_3, param_4
    iVar3 = FUN_0043d07a(param_3, param_4, -1, -1, -1);
    if (param_2 !== 0 && -1 < iVar3) {
      if (s8(DAT_0064f340[iVar3 * 0x58 + 8]) === (param_2 & 0xff)) {
        DAT_006560f0[local_10 * 0x20 + 0x10] = iVar3 & 0xFF;
      }
    }
    DAT_006560f0[local_10 * 0x20 + 0x0D] = 0;                     // commodity
    DAT_006560f0[local_10 * 0x20 + 0x0E] = 0;                     // counter2
    DAT_006560f0[local_10 * 0x20 + 0x0B] = 0xff;                   // last direction
    ws(DAT_006560f0, local_10 * 0x20 + 0x16, 0xffff);              // prev link
    ws(DAT_006560f0, local_10 * 0x20 + 0x18, 0xffff);              // next link
    ws(DAT_006560f0, local_10 * 0x20, 0xffff);                     // x
    ws(DAT_006560f0, local_10 * 0x20 + 2, 0xffff);                 // y
    ws(DAT_006560f0, local_10 * 0x20 + 0x12, 0xffff);              // goto x
    ws(DAT_006560f0, local_10 * 0x20 + 0x14, 0xffff);              // goto y
    FUN_005b345f(local_10, param_3, param_4, 0);
    FUN_004274a6(local_10, 1);

    if (2 < DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8bc = 0;
  } else {
    // Multiplayer client path
    DAT_006ad8bc = 0;
    DAT_006c90d8 = -2;
    FUN_0046b14d(0x3d, 0, param_1, param_2, param_3, param_4, 0, 0, 0, 0);
    local_10 = DAT_006c90d8;
  }
  return local_10;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4391 — delete_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4391(param_1, param_2) {
  let bVar1;
  let sVar2, sVar3;
  let iVar5;
  let local_20;
  let local_10;

  if (-1 < param_1 && ri(DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0) {
    DAT_006ad8c0 = 1;
    if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
      sVar2 = rs(DAT_006560f0, param_1 * 0x20);
      sVar3 = rs(DAT_006560f0, param_1 * 0x20 + 2);
      bVar1 = u8(DAT_006560f0[param_1 * 0x20 + 6]);

      if (DAT_006560f0[param_1 * 0x20 + 0x10] === 0xFF) {
        local_20 = -1;
      } else {
        local_20 = u8(DAT_006560f0[param_1 * 0x20 + 0x10]);
      }

      iVar5 = s8(DAT_006560f0[param_1 * 0x20 + 7]);
      if (-1 < iVar5 && param_1 < 0x800) {
        // C: *(short *)(&DAT_0064c706 + iVar5 * 0x594) -= 1
        if (rs(DAT_0064c706, iVar5 * 0x594) !== 0 &&
            s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 0x0E]) < 5) {
          ws(DAT_0064c706, iVar5 * 0x594, rs(DAT_0064c706, iVar5 * 0x594) - 1);
        }
        // C: (&DAT_0064c778)[iVar5 * 0x594 + unitType] -= 1
        if (DAT_0064c778[iVar5 * 0x594 + u8(DAT_006560f0[param_1 * 0x20 + 6])] !== 0) {
          DAT_0064c778[iVar5 * 0x594 + u8(DAT_006560f0[param_1 * 0x20 + 6])] =
            DAT_0064c778[iVar5 * 0x594 + u8(DAT_006560f0[param_1 * 0x20 + 6])] - 1;
        }
        // C: *(int *)(&DAT_0064b9e8 + iVar5 * 4) -= 1
        if (ri(DAT_0064b9e8, iVar5 * 4) !== 0) {
          wi(DAT_0064b9e8, iVar5 * 4, ri(DAT_0064b9e8, iVar5 * 4) - 1);
        }
      }

      pick_up_unit_005b319e(param_1, 0);
      wi(DAT_006560f0, param_1 * 0x20 + 0x1a, 0); // serial = 0 (dead)

      if (DAT_00655b16 - 1 === param_1) {
        DAT_00655b16 = DAT_00655b16 - 1;
      }

      // Clear goto orders targeting this unit
      for (local_10 = 0; local_10 < DAT_00655b16; local_10++) {
        if (DAT_006560f0[local_10 * 0x20 + 0x0F] === 0x03 &&
            rs(DAT_006560f0, local_10 * 0x20 + 0x12) === param_1) {
          DAT_006560f0[local_10 * 0x20 + 0x0F] = 0xff;
        }
      }

      if (param_2 !== 0) {
        FUN_0047cea6(-1, sVar2, sVar3);
        if (-1 < local_20) FUN_0047ce1e(local_20);
      }

      // Check if civ should be killed (settler was last unit + no cities)
      // C: *(short *)(&DAT_0064c708 + iVar5 * 0x594) == 0
      if (s8(DAT_0064b1bc[bVar1 * 0x14 + 0x0E]) === 5 &&
          rs(DAT_0064c708, iVar5 * 0x594) === 0 &&
          DAT_0064c778[iVar5 * 0x594 + bVar1] === 0) {
        kill_civ(iVar5, -1);
      }

      if (2 < DAT_00655b02 && param_2 !== 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x87, 0xff, -1, sVar2, sVar3, 0, 0, 0, 0, 0);
        if (0 < local_20) {
          FUN_0046b14d(0x88, 0xff, local_20, 0, 0, 0, 0, 0, 0, 0);
        }
        XD_FlushSendBuffer(5000);
      }
      DAT_006ad8c0 = 0;
    } else {
      DAT_006ad8c0 = 0;
      DAT_006c90c0 = -2;
      FUN_0046b14d(0x37, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b47fa — delete_all_units_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b47fa(param_1, param_2) {
  let iVar1;
  param_1 = FUN_005b2d39(param_1);
  while (-1 < param_1) {
    iVar1 = FUN_005b2c82(param_1);
    FUN_005b4391(param_1, 0);
    param_1 = iVar1;
  }
  if (2 < DAT_00655b02 && param_2 !== 0) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b488a — clear_unit_visibility (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b488a(param_1) {
  if (-1 < param_1) {
    DAT_006560f0[param_1 * 0x20 + 9] = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b48b1 — clear_stack_visibility (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b48b1(param_1) {
  for (let iVar1 = FUN_005b2d39(param_1); -1 < iVar1; iVar1 = FUN_005b2c82(iVar1)) {
    FUN_005b488a(iVar1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b490e — set_unit_seen_by (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b490e(param_1, param_2) {
  if (-1 < param_2 && s8(DAT_006560f0[param_1 * 0x20 + 7]) !== param_2 && -1 < param_1) {
    DAT_006560f0[param_1 * 0x20 + 9] = DAT_006560f0[param_1 * 0x20 + 9] | (1 << (param_2 & 0x1f));
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b496e — set_stack_seen_by (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b496e(param_1, param_2) {
  for (let iVar1 = FUN_005b2d39(param_1); -1 < iVar1; iVar1 = FUN_005b2c82(iVar1)) {
    FUN_005b490e(iVar1, param_2);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b49cf — check_adjacent_enemy_zoc (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b49cf(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3, iVar4;
  let local_20;
  let local_1c;
  let local_c;
  let local_8;

  local_1c = FUN_005b89e4(param_1, param_2);
  iVar1 = FUN_005b8ca6(param_1, param_2);
  DAT_006ced4c = -1;
  for (local_8 = 0; DAT_006ced4c < 0 && local_8 < 8; local_8++) {
    uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
    iVar3 = s8(DAT_00628360[local_8]) + param_2;
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if (iVar4 !== 0) {
      if (iVar1 < 0) {
        local_c = FUN_005b89e4(uVar2, iVar3);
      } else {
        local_c = local_1c;
      }
      local_20 = FUN_005b8ca6(uVar2, iVar3);
      if (local_20 < 0) {
        local_20 = FUN_005b8d62(uVar2, iVar3);
      } else {
        local_1c = local_c;
      }
      if (-1 < local_20 && local_20 !== param_3 && local_c === local_1c &&
          (DAT_0064c6c0[param_3 * 0x594 + local_20 * 4] & 8) === 0) {
        DAT_006ced4c = local_20;
      }
    }
  }
  return -1 < DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4b66 — check_adjacent_enemy_units (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4b66(param_1, param_2, param_3) {
  let uVar2;
  let iVar3;
  let local_8;

  DAT_006ced4c = -1;
  for (local_8 = 0; DAT_006ced4c < 0 && local_8 < 8; local_8++) {
    uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
    let dy = s8(DAT_00628360[local_8]);
    iVar3 = FUN_004087c0(uVar2, dy + param_2);
    if (iVar3 !== 0) {
      iVar3 = FUN_005b8d62(uVar2, dy + param_2);
      if (-1 < iVar3 && param_3 !== iVar3 &&
          (DAT_0064c6c0[param_3 * 0x594 + iVar3 * 4] & 8) === 0) {
        DAT_006ced4c = iVar3;
      }
    }
  }
  return -1 < DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4c63 — check_adjacent_enemy_same_domain (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4c63(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3, iVar4;
  let local_8;

  DAT_006ced4c = -1;
  iVar1 = FUN_005b89e4(param_1, param_2);
  for (local_8 = 0; DAT_006ced4c < 0 && local_8 < 8; local_8++) {
    uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
    iVar3 = s8(DAT_00628360[local_8]) + param_2;
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if (iVar4 !== 0) {
      iVar4 = FUN_005b8d62(uVar2, iVar3);
      if (-1 < iVar4 && iVar4 !== param_3) {
        let ocean2 = FUN_005b89e4(uVar2, iVar3);
        if (ocean2 === iVar1 && (DAT_0064c6c0[iVar4 * 4 + param_3 * 0x594] & 8) === 0) {
          DAT_006ced4c = iVar4;
        }
      }
    }
  }
  return -1 < DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4d8c — check_zoc_for_uncitied_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4d8c(param_1, param_2, param_3) {
  let iVar1;
  let local_8 = 0;
  DAT_006ced4c = -1;
  iVar1 = FUN_005b8ca6(param_1, param_2);
  if (iVar1 < 0) {
    local_8 = FUN_005b4c63(param_1, param_2, param_3) ? 1 : 0;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4de2 — check_civ_adjacent (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4de2(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3;
  let bVar4 = false;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 !== 0) {
    for (let local_8 = 0; !bVar4 && local_8 < 8; local_8++) {
      uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
      iVar1 = s8(DAT_00628360[local_8]) + param_2;
      iVar3 = FUN_004087c0(uVar2, iVar1);
      if (iVar3 !== 0) {
        iVar3 = FUN_005b8d62(uVar2, iVar1);
        if (iVar3 === param_3) bVar4 = true;
        iVar1 = FUN_005b8ca6(uVar2, iVar1);
        if (iVar1 === param_3) bVar4 = true;
      }
    }
  }
  return bVar4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4ee2 — or_visibility_for_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4ee2(param_1, param_2) {
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    DAT_006560f0[param_1 * 0x20 + 9] = DAT_006560f0[param_1 * 0x20 + 9] | param_2;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4f3c — get_civs_present_bitmask (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4f3c(param_1, param_2) {
  let iVar1;
  let local_8 = 0;
  iVar1 = FUN_005b8a1d(param_1, param_2);
  if (-1 < iVar1) {
    local_8 = 1 << (iVar1 & 0x1f);
  }
  for (let local_c = 1; local_c < 8; local_c++) {
    iVar1 = FUN_005b4de2(param_1, param_2, local_c);
    if (iVar1 !== 0) {
      local_8 = local_8 | (1 << (local_c & 0x1f));
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4fca — set_visibility_for_adjacent_civs (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4fca(param_1) {
  for (let local_8 = 1; local_8 < 8; local_8++) {
    let iVar1 = FUN_005b4de2(rs(DAT_006560f0, param_1 * 0x20), rs(DAT_006560f0, param_1 * 0x20 + 2), local_8);
    if (iVar1 !== 0) {
      FUN_005b496e(param_1, local_8);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b503b — has_unit_of_type_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b503b(param_1, param_2) {
  param_1 = FUN_005b2d39(param_1);
  while (true) {
    if (param_1 < 0) return 0;
    if (u8(DAT_006560f0[param_1 * 0x20 + 6]) === param_2) return 1;
    param_1 = FUN_005b2c82(param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b50ad — aggregate_stack_property (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b50ad(param_1, param_2) {
  let local_8 = 0;
  if (param_2 !== 0xb) {
    param_1 = FUN_005b2d39(param_1);
  }
  while (-1 < param_1 && local_8 < 0x800) {
    let unitType = u8(DAT_006560f0[param_1 * 0x20 + 6]);
    switch (param_2) {
      case 0: local_8 += s8(DAT_0064b1bc[unitType * 0x14 + 0x0C]); break;
      case 1: local_8 += s8(DAT_0064b1bc[unitType * 0x14 + 9]); break;
      case 2: case 0xb: local_8++; break;
      case 3: local_8 += s8(DAT_0064b1bc[unitType * 0x14 + 8]); break;
      case 4:
        if (rs(DAT_006560f0, param_1 * 0x20 + 0x16) >= 0 && DAT_0064b1bc[unitType * 0x14 + 0x0E] === 0x01) local_8++;
        break;
      case 5:
        if (DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) local_8++;
        break;
      case 6:
        if (DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) local_8 += s8(DAT_0064b1bc[unitType * 0x14 + 0x0D]);
        else if (DAT_0064b1bc[unitType * 0x14 + 5] === 0x00) local_8 += -1;
        break;
      case 7:
        if (DAT_0064b1bc[unitType * 0x14 + 5] === 0x01 && s8(DAT_0064b1bc[unitType * 0x14 + 7]) > 1) local_8++;
        break;
      case 8:
        if ((DAT_0064b1bc[unitType * 0x14 + 1] & 0x10) !== 0) local_8++;
        break;
      case 9:
        if ((DAT_0064b1bc[unitType * 0x14] & 0x80) !== 0) local_8++;
        break;
      case 10:
        if ((DAT_0064b1bc[unitType * 0x14] & 8) !== 0) local_8++;
        break;
    }
    if (param_2 === 0xb) {
      param_1 = rs(DAT_006560f0, param_1 * 0x20 + 0x18);
    } else {
      param_1 = FUN_005b2c82(param_1);
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b53b6 — count_units_of_role_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b53b6(param_1, param_2) {
  let local_8 = 0;
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    if (s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 0x0E]) === param_2) local_8++;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b542e — stack_ship (GL)
// Very complex — loads units onto ships with goto orders
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b542e(param_1, param_2, param_3) {
  let iVar3, iVar4, iVar5;
  let uVar6;
  let bVar1, bVar9;
  let local_3c;
  let local_38;
  let local_30;
  let local_28;
  let local_18;
  let local_10 = 0;
  let iVar7;
  let cVar2;

  if (param_1 < -1 || 0x801 < param_1) {
    FUN_005dae6b(7, 'ship > -1 && ship < MAX_UNITS + 2', 'Unit.cpp', 0x61d);
  }
  DAT_006ad8f8 = 1;
  if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    if (param_2 !== 0) FUN_005b3b78(param_1, 0);
    local_30 = FUN_005b2d39(param_1);
    if (local_30 === param_1) local_30 = FUN_005b2c82(param_1);

    iVar3 = rs(DAT_006560f0, param_1 * 0x20);
    iVar4 = rs(DAT_006560f0, param_1 * 0x20 + 2);
    iVar5 = FUN_004087c0(iVar3, iVar4);
    if (iVar5 !== 0) local_10 = FUN_005b89e4(iVar3, iVar4) ? 1 : 0;

    if (param_2 === 0) {
      for (local_38 = local_30; -1 < local_38; local_38 = FUN_005b2c82(local_38)) {
        let flags = ru(DAT_006560f0, local_38 * 0x20 + 4);
        ws(DAT_006560f0, local_38 * 0x20 + 4, flags & 0xefff);
      }
    } else {
      let ownerCiv = s8(DAT_006560f0[param_1 * 0x20 + 7]);
      let offCoord = (ownerCiv * 5 + 5) * -0x28;
      FUN_005b36df(param_1, offCoord, offCoord, 0);
    }

    let unitType = u8(DAT_006560f0[param_1 * 0x20 + 6]);
    local_28 = s8(DAT_0064b1bc[unitType * 0x14 + 0x0D]);
    uVar6 = DAT_0064b1bc[unitType * 0x14] & 0x80;
    bVar1 = false;
    if (local_28 === 0 && uVar6 === 0 && (DAT_0064b1bc[unitType * 0x14] & 8) !== 0) bVar1 = true;
    if (uVar6 !== 0 || bVar1) local_28 = 0x14;
    if (DAT_006560f0[param_1 * 0x20 + 7] === 0) local_28 = 0x14;

    local_18 = 0;
    while (true) {
      let domain;
      if (uVar6 !== 0 || bVar1) {
        local_3c = 1;
      } else {
        local_3c = 2;
      }
      if (local_3c <= local_18 || (local_38 = local_30, iVar7 = local_38, local_28 === 0)) break;

      // Inner loop over units in stack
      while (true) {
        local_38 = iVar7;
        if (local_38 < 0 || local_28 === 0) break;
        iVar7 = FUN_005b2c82(local_38);
        bVar9 = false;

        let expectedDomain;
        if (uVar6 !== 0 || bVar1) {
          expectedDomain = 0x01;
        } else {
          expectedDomain = 0x00;
        }

        let unitDomain = DAT_0064b1bc[u8(DAT_006560f0[local_38 * 0x20 + 6]) * 0x14 + 5];
        if (unitDomain === expectedDomain) {
          // Check eligibility based on pass (local_18)
          if (bVar1 && (DAT_0064b1bc[u8(DAT_006560f0[local_38 * 0x20 + 6]) * 0x14 + 1] & 0x10) === 0) {
            // Not eligible — skip
          } else if (local_18 === 0) {
            if (uVar6 !== 0 || bVar1) {
              bVar9 = true;
            } else if (DAT_006560f0[local_38 * 0x20 + 0x0F] === 0x03 &&
                       rs(DAT_006560f0, local_38 * 0x20 + 0x12) === param_1) {
              bVar9 = true;
            }
          } else if (local_18 === 1) {
            if ((DAT_00655b0b & (1 << (DAT_006560f0[local_38 * 0x20 + 7] & 0x1f))) === 0) {
              bVar9 = true;
            } else if (local_10 !== 0) {
              bVar9 = true;
            }
          }
        }

        if (param_2 === 0 && (ru(DAT_006560f0, local_38 * 0x20 + 4) & 0x1000) !== 0) {
          bVar9 = false;
        }

        if (bVar9) {
          if (local_30 === local_38) local_30 = iVar7;
          if (uVar6 !== 0 || bVar1) {
            if (DAT_006560f0[local_38 * 0x20 + 0x0F] !== 0x03) {
              DAT_006560f0[local_38 * 0x20 + 0x0F] = 0xff;
            }
          } else {
            FUN_005b2f50(local_38);
            ws(DAT_006560f0, local_38 * 0x20 + 0x12, param_1 & 0xFFFF);
          }
          if (param_2 === 0) {
            let flags = ru(DAT_006560f0, local_38 * 0x20 + 4);
            ws(DAT_006560f0, local_38 * 0x20 + 4, flags | 0x1000);
          } else {
            let ownerCiv = s8(DAT_006560f0[local_38 * 0x20 + 7]);
            let offCoord = (ownerCiv * 5 + 5) * -0x28;
            FUN_005b36df(local_38, offCoord, offCoord, 0);
          }
          local_28--;
        }
      }
      local_18++;
    }

    if (2 < DAT_00655b02 && param_3 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8f8 = 0;
  } else {
    DAT_006ad8f8 = 0;
    DAT_006c9108 = -2;
    FUN_0046b14d(0x49, 0, param_1, param_2, 0, 0, 0, 0, 0, 0);
    local_28 = DAT_006c9108;
  }
  return local_28;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b5bab — stack_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b5bab(param_1, param_2) {
  if (-1 < param_1) {
    DAT_006ad8fc = 1;
    if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
      if (DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
        FUN_005b542e(param_1, 1, 0);
      } else {
        let ownerCiv = s8(DAT_006560f0[param_1 * 0x20 + 7]);
        let offCoord = (ownerCiv * 5 + 5) * -0x28;
        FUN_005b36df(param_1, offCoord, offCoord, 0);
      }
      if (2 < DAT_00655b02 && param_2 !== 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        XD_FlushSendBuffer(5000);
      }
      DAT_006ad8fc = 0;
    } else {
      DAT_006ad8fc = 0;
      DAT_006c9110 = -2;
      FUN_0046b14d(0x4b, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b5d93 — delete_safely (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b5d93(param_1, param_2) {
  let iVar2;
  let bVar4 = false;

  DAT_006ad900 = 1;
  if (2 < DAT_00655b02 && FUN_00421f40() === 0) {
    DAT_006ad900 = 0;
    DAT_006c9118 = -2;
    FUN_0046b14d(0x4d, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    return;
  }

  let local_10 = rs(DAT_006560f0, param_1 * 0x20);
  let local_14 = rs(DAT_006560f0, param_1 * 0x20 + 2);

  if (DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
    iVar2 = FUN_004087c0(local_10, local_14);
    if (iVar2 === 0) {
      let ownerCiv = s8(DAT_006560f0[param_1 * 0x20 + 7]);
      if (-local_10 === (ownerCiv * 5 + 5) * 0x28) {
        FUN_005b47fa(param_1, 0);
        // goto cleanup
        if (2 < DAT_00655b02 && param_2 !== 0) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          XD_FlushSendBuffer(5000);
        }
        DAT_006ad900 = 0;
        return;
      }
      bVar4 = true;
    } else {
      iVar2 = FUN_005b89e4(local_10, local_14);
      bVar4 = iVar2 !== 0;
    }
  }

  if (bVar4) {
    FUN_005b542e(param_1, 0, 0);
    FUN_005b47fa(param_1, 0);
    FUN_0047cea6(-1, local_10, local_14);
  } else {
    FUN_005b4391(param_1, 0);
  }

  if (2 < DAT_00655b02 && param_2 !== 0) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  DAT_006ad900 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6042 — delete_visible (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6042(param_1, param_2) {
  DAT_006ad904 = 1;
  if (DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    let iVar2 = rs(DAT_006560f0, param_1 * 0x20);
    let iVar3 = rs(DAT_006560f0, param_1 * 0x20 + 2);
    FUN_005b5d93(param_1, 0);
    let iVar4 = FUN_004087c0(iVar2, iVar3);
    if (iVar4 !== 0) {
      FUN_0047cea6(iVar2, iVar3);
    }
    if (2 < DAT_00655b02 && param_2 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x72, 0xff, iVar2, iVar3, 0, 0, 0, 0, 0, 0);
    }
    DAT_006ad904 = 0;
  } else {
    DAT_006ad904 = 0;
    DAT_006c9120 = -2;
    FUN_0046b14d(0x4f, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b620a — embark_all_ships (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b620a(param_1, param_2) {
  let iVar1;
  let local_10;
  let local_8 = 0;

  FUN_005b3b78(param_1, 0);
  for (local_10 = FUN_005b2d39(param_1); -1 < local_10; local_10 = FUN_005b2c82(local_10)) {
    if (DAT_0064b1bc[u8(DAT_006560f0[local_10 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
      iVar1 = FUN_005b542e(local_10, 0, 0);
      if (local_8 < iVar1) local_8 = iVar1;
    }
  }
  if (2 < DAT_00655b02 && param_2 !== 0) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b62ee — set_orders_for_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b62ee(param_1, param_2) {
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    DAT_006560f0[param_1 * 0x20 + 0x0F] = param_2;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b633f — is_unit_active_for_player (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b633f(param_1) {
  let iVar1;
  let local_8 = 0;
  if (-1 < param_1 && param_1 < DAT_00655b16 &&
      ri(DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0) {
    iVar1 = FUN_004087c0(rs(DAT_006560f0, param_1 * 0x20), rs(DAT_006560f0, param_1 * 0x20 + 2));
    if (iVar1 !== 0) {
      if (s8(DAT_006560f0[param_1 * 0x20 + 7]) === DAT_00655b05 &&
          DAT_006560f0[param_1 * 0x20 + 0x0F] !== 0x03 &&
          DAT_006560f0[param_1 * 0x20 + 0x0F] !== 0x02) {
        iVar1 = FUN_005b2c3d(param_1);
        if (iVar1 !== 0 && (ru(DAT_006560f0, param_1 * 0x20 + 4) & 2) === 0) {
          local_8 = 1;
        }
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6458 — is_unit_movable (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6458(param_1) {
  let iVar1;
  let local_8 = 0;
  if (-1 < param_1 && param_1 < DAT_00655b16 &&
      ri(DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0 &&
      rs(DAT_006560f0, param_1 * 0x20) >= 0) {
    if (DAT_006560f0[param_1 * 0x20 + 0x0F] === 0x03) {
      local_8 = 0;
    } else {
      iVar1 = FUN_005b2c3d(param_1);
      local_8 = iVar1 === 0 ? 0 : 1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6512 — find_next_active_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6512(param_1, param_2) {
  let iVar1;
  let local_20 = -1;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c = -1;
  let local_8 = 9999;

  local_18 = DAT_0064b1b4;
  local_1c = DAT_0064b1b0;
  if (-1 < param_1 && param_1 < DAT_00655b16 &&
      ri(DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0 && DAT_00655b05 !== 0) {
    local_18 = rs(DAT_006560f0, param_1 * 0x20);
    local_1c = rs(DAT_006560f0, param_1 * 0x20 + 2);
    local_c = DAT_00655afe;
  }

  for (local_14 = 0; local_14 < 3; local_14++) {
    if (-1 < local_20) break;
    for (param_1 = 0; param_1 < DAT_00655b16; param_1++) {
      if (ri(DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0) {
        iVar1 = FUN_005b633f(param_1);
        if (iVar1 !== 0 && (ru(DAT_006560f0, param_1 * 0x20 + 4) & 0x4000) === 0) {
          if (param_2 !== 1 || s8(DAT_006560f0[param_1 * 0x20 + 7]) === DAT_006d1da0) {
            iVar1 = FUN_005ae31d(local_18, local_1c, rs(DAT_006560f0, param_1 * 0x20), rs(DAT_006560f0, param_1 * 0x20 + 2));
            local_10 = iVar1 * 2 + 1;
            if (DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] !== 0x02) {
              local_10 = iVar1 * 2;
            }
            if (local_10 < local_8) {
              local_8 = local_10;
              local_20 = param_1;
            } else if (local_10 === local_8 && DAT_00655afe === param_1) {
              local_20 = param_1;
            }
          }
        }
      }
    }
    if (-1 < local_20) break;
    for (param_1 = 0; param_1 < DAT_00655b16; param_1++) {
      if (ri(DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0 && (local_14 !== 0 || param_1 !== local_c)) {
        let flags = ru(DAT_006560f0, param_1 * 0x20 + 4);
        ws(DAT_006560f0, param_1 * 0x20 + 4, flags & 0xbfff);
      }
    }
  }
  return local_20;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6787 — reset_unit_moves_spent (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6787(param_1) {
  DAT_006560f0[param_1 * 0x20 + 8] = FUN_005b2a39(param_1) & 0xFF;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b67af — find_nearest_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b67af(param_1, param_2, param_3, param_4) {
  let iVar1;
  let local_10;
  let local_c = -1;
  DAT_006ced50 = 9999;
  for (local_10 = 0; local_10 < DAT_00655b16; local_10++) {
    if (ri(DAT_006560f0, local_10 * 0x20 + 0x1a) !== 0 &&
        (param_3 < 0 || s8(DAT_006560f0[local_10 * 0x20 + 7]) === (param_3 & 0xff)) &&
        local_10 !== param_4) {
      iVar1 = FUN_005ae31d(param_1, param_2, rs(DAT_006560f0, local_10 * 0x20), rs(DAT_006560f0, local_10 * 0x20 + 2));
      if (iVar1 <= DAT_006ced50) {
        local_c = local_10;
        DAT_006ced50 = iVar1;
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6898 — get_unit_home_city_name (MIXED)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b6898 (89 bytes)
// Source: decompiled/block_005B0000.c FUN_005b6898 (89 bytes)
export function FUN_005b6898(param_1) {
  let puVar1;
  if (DAT_006560f0[param_1 * 0x20 + 0x10] === 0xFF) {
    puVar1 = FUN_00428b0c(DAT_00628420[0x38 / 4]); // DEVIATION: resource string "NONE"
  } else {
    puVar1 = DAT_0064f340 + u8(DAT_006560f0[param_1 * 0x20 + 0x10]) * 0x58 + 0x20; // city name
  }
  return puVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6a58 — clear_unit_orders (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6a58(param_1) {
  if (-1 < param_1) {
    DAT_006560f0[param_1 * 0x20 + 0x0F] = 0xff;
    let flags = ru(DAT_006560f0, param_1 * 0x20 + 4);
    ws(DAT_006560f0, param_1 * 0x20 + 4, flags & 0x7fff);
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6aa0 — always_returns_1 (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6aa0() {
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6ab5 — draw_unit_name (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6ab5(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_0056baff(param_2, param_3, 4, param_5 + 2, param_6, DAT_0063605c, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6aea — show_unit_list_dialog (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b6aea (693 bytes)
export function FUN_005b6aea(param_1, param_2, param_3) {
  let uVar1;
  let local_34c;
  let local_344;

  // DEVIATION: SEH, CString constructor
  FUN_0059db08(0x4000);
  FUN_005cdea1(0x42, 0x30, 0); // DEVIATION: GDI
  DAT_0063605c = -1;
  FUN_0040bc40(0x20001 - (param_3 === 0 ? 1 : 0)); // DEVIATION: MFC — dialog flags
  FUN_0059e6a9(param_2); // DEVIATION: set title
  FUN_0059e6ff(0x154); // DEVIATION: set height
  // CPropertySheet::EnableStackedTabs — 4 handlers // DEVIATION: MFC
  local_344 = 0;
  // Walk unit stack via linked list
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    local_344 = local_344 + 1;
    if (local_344 < 10) {
      FUN_0040bbb0(); // DEVIATION: MFC — begin text
      uVar1 = FUN_00493d13(s8(DAT_006560f0[param_1 * 0x20 + 7])); // get civ name
      FUN_00414d70(uVar1); // DEVIATION: MFC — set title
      FUN_0040fe10(); // DEVIATION: MFC — newline
      if ((ru(DAT_006560f0, param_1 * 0x20 + 4) & 0x2000) !== 0) {
        FUN_0040bc10(0xd); // DEVIATION: MFC — "veteran" text
        FUN_0040fe10();
      }
      FUN_0040ff00(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 0x0C]); // unit type icon
      FUN_0040fe10();
      FUN_0040fea0(); // DEVIATION: MFC
      if (DAT_006560f0[param_1 * 0x20 + 0x10] === 0xFF) {
        local_34c = 0xFFFFFFFF;
      } else {
        local_34c = u8(DAT_006560f0[param_1 * 0x20 + 0x10]);
      }
      FUN_0043ca80(local_34c); // DEVIATION: MFC — show home city
      if (s8(DAT_0064b1bc[u8(DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 0x0E]) === 7) {
        // Caravan — show cargo
        FUN_00421d30(); // DEVIATION: MFC
        if (s8(DAT_006560f0[param_1 * 0x20 + 0x0D]) < 0) {
          FUN_0040ff00(DAT_00628420[0x300 / 4]); // "no cargo"
        } else {
          FUN_0040ff00(DAT_0064b168[s8(DAT_006560f0[param_1 * 0x20 + 0x0D]) * 4]); // cargo name
        }
      }
      FUN_0040fed0(); // DEVIATION: MFC — end line
      FUN_0059ec88(0 /*local_4c*/, param_1, 0); // DEVIATION: display
    }
  }
  FUN_0040bc80(0); // DEVIATION: MFC — show dialog
  // DEVIATION: SEH cleanup
  FUN_005b6d9f();
  FUN_005b6dab();
  FUN_005b6dbe();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6d9f — cleanup_unit_dialog_1 (FW)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6d9f() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6dab — cleanup_unit_dialog_2 (FW)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6dab() {
  FUN_005cde4d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6dbe — seh_restore (FW)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6dbe() {
  // SEH restore — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b7fe0 — allocate_map_tiles (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b7fe0 (1078 bytes)
export function FUN_005b7fe0() {
  let uVar1;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  DAT_006d116a = (DAT_006d1160 + 3) >> 2;
  DAT_006d116c = (DAT_006d1162 + 3) >> 2;
  DAT_006d1164 = ((DAT_006d1160 / 2) | 0) * DAT_006d1162;
  // Allocate tile data buffer
  local_8 = DAT_006d1164 * 6;
  if ((local_8 & 3) !== 0) { local_8 = (4 - (local_8 & 3)) + local_8; }
  DAT_006d1170 = FUN_004bb870(local_8); // DEVIATION: Win32 GlobalAlloc
  if (DAT_006d1170 === 0) { FUN_00589ef8(-9, 5, 0, DAT_006d1160, DAT_006d1162); }
  DAT_00636598 = FUN_0046aad0(DAT_006d1170); // DEVIATION: GlobalLock
  if (DAT_00636598 === 0) { FUN_00589ef8(-10, 5, 0, DAT_006d1160, DAT_006d1162); }
  // Initialize all tiles to terrain type 10 (ocean), zero flags
  local_14 = DAT_00636598;
  for (local_c = 0; local_c < DAT_006d1164; local_c = local_c + 1) {
    // local_14[0] = 10; // terrain type = ocean
    // local_14[1] = 0;  // improvements
    // local_14[2] = 0;  // improvements2
    // local_14[3] = 0;  // continent
    // local_14[4] = 0;  // visibility
    // local_14[5] = 0;  // site quality
    // local_14 = local_14 + 6; // advance to next tile
    // DEVIATION: In JS, tile init handled by initMapTiles in mem.js
  }
  // Allocate visibility layers (7 civs)
  local_8 = DAT_006d1164;
  if ((local_8 & 3) !== 0) { local_8 = (4 - (local_8 & 3)) + local_8; }
  for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
    uVar1 = FUN_004bb870(local_8); // DEVIATION: GlobalAlloc
    wi(0x6365a0, local_18 * 4, uVar1);
    if (ri(0x6365a0, local_18 * 4) === 0) { FUN_00589ef8(-9, 5, 0, 0xea, local_18); }
    uVar1 = FUN_0046aad0(ri(0x6365a0, local_18 * 4)); // DEVIATION: GlobalLock
    wi(DAT_006365c0, local_18 * 4, uVar1);
    if (ri(DAT_006365c0, local_18 * 4) === 0) { FUN_00589ef8(-10, 5, 0, 0xea, local_18); }
    _memset(ri(DAT_006365c0, local_18 * 4), 0, DAT_006d1164); // DEVIATION: memset
  }
  // Allocate 4 quarter-resolution visibility chunk layers
  local_8 = DAT_006d116a * DAT_006d116c;
  if ((local_8 & 3) !== 0) { local_8 = (4 - (local_8 & 3)) + local_8; }
  DAT_006d1174 = FUN_004bb870(local_8);
  if (DAT_006d1174 === 0) { FUN_00589ef8(-9, 5, 0, DAT_006d116a, 0); }
  DAT_006365e0 = FUN_0046aad0(DAT_006d1174);
  if (DAT_006365e0 === 0) { FUN_00589ef8(-10, 5, 0, DAT_006d116a, 0); }
  DAT_006d1178 = FUN_004bb870(local_8);
  if (DAT_006d1178 === 0) { FUN_00589ef8(-9, 5, 0, DAT_006d116a, 1); }
  DAT_006365e4 = FUN_0046aad0(DAT_006d1178);
  if (DAT_006365e4 === 0) { FUN_00589ef8(-10, 5, 0, DAT_006d116a, 1); }
  DAT_006d117c = FUN_004bb870(local_8);
  if (DAT_006d117c === 0) { FUN_00589ef8(-9, 5, 0, DAT_006d116a, 2); }
  DAT_006365e8 = FUN_0046aad0(DAT_006d117c);
  if (DAT_006365e8 === 0) { FUN_00589ef8(-10, 5, 0, DAT_006d116a, 2); }
  DAT_006d1180 = FUN_004bb870(local_8);
  if (DAT_006d1180 === 0) { FUN_00589ef8(-9, 5, 0, DAT_006d116a, 3); }
  DAT_006365ec = FUN_0046aad0(DAT_006d1180);
  if (DAT_006365ec === 0) { FUN_00589ef8(-10, 5, 0, DAT_006d116a, 3); }
  DAT_006365f0 = 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8416 — deallocate_map_tiles (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b8416 (488 bytes)
// Source: decompiled/block_005B0000.c FUN_005b8416 (488 bytes)
export function FUN_005b8416() {
  let uVar1;
  let local_8;

  if (DAT_006365f0 !== 0) {
    // Free 4 chunk layers
    if (DAT_006365ec !== 0) { DAT_006365ec = FUN_0046ab00(DAT_006d1180); } // DEVIATION: GlobalUnlock
    if (DAT_006d1180 !== 0) { DAT_006d1180 = FUN_0046aaa0(DAT_006d1180); } // DEVIATION: GlobalFree
    if (DAT_006365e8 !== 0) { DAT_006365e8 = FUN_0046ab00(DAT_006d117c); }
    if (DAT_006d117c !== 0) { DAT_006d117c = FUN_0046aaa0(DAT_006d117c); }
    if (DAT_006365e4 !== 0) { DAT_006365e4 = FUN_0046ab00(DAT_006d1178); }
    if (DAT_006d1178 !== 0) { DAT_006d1178 = FUN_0046aaa0(DAT_006d1178); }
    if (DAT_006365e0 !== 0) { DAT_006365e0 = FUN_0046ab00(DAT_006d1174); }
    if (DAT_006d1174 !== 0) { DAT_006d1174 = FUN_0046aaa0(DAT_006d1174); }
    // Free tile data
    if (DAT_00636598 !== 0) { DAT_00636598 = FUN_0046ab00(DAT_006d1170); }
    if (DAT_006d1170 !== 0) { DAT_006d1170 = FUN_0046aaa0(DAT_006d1170); }
    // Free 7 visibility layers
    for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
      if (ri(DAT_006365c0, local_8 * 4) !== 0) {
        uVar1 = FUN_0046ab00(ri(0x6365a0, local_8 * 4)); // DEVIATION: GlobalUnlock
        wi(DAT_006365c0, local_8 * 4, uVar1);
      }
      if (ri(0x6365a0, local_8 * 4) !== 0) {
        uVar1 = FUN_0046aaa0(ri(0x6365a0, local_8 * 4)); // DEVIATION: GlobalFree
        wi(0x6365a0, local_8 * 4, uVar1);
      }
    }
    DAT_006365f0 = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b85fe — generate_resource_seed (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b85fe() {
  let uVar1 = FUN_00421bb0();
  DAT_006d1168 = uVar1 & 0x7fff;
  if (DAT_006d1168 === 0) DAT_006d1168 = 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8635 — save_map_data (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b8635 (309 bytes)
export function FUN_005b8635(param_1, param_2) {
  let sVar1;
  let local_10;
  let local_c = 1;

  sVar1 = _fwrite(DAT_006d1160, 0xe, 1, param_1); // DEVIATION: fwrite — map header (14 bytes)
  if (sVar1 !== 0) {
    if (param_2 === 0) {
      // Save visibility layers (7 civs)
      for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
        sVar1 = _fwrite(ri(DAT_006365c0, local_10 * 4), DAT_006d1164, 1, param_1); // DEVIATION: fwrite
        if (sVar1 === 0) { return 1; }
      }
    } else {
      // Save starting positions
      sVar1 = _fwrite(DAT_00627fe0, 0x2a, 1, param_1); // DEVIATION: fwrite — starting positions X
      if (sVar1 === 0) { return 1; }
      sVar1 = _fwrite(DAT_00628010, 0x2a, 1, param_1); // DEVIATION: fwrite — starting positions Y
      if (sVar1 === 0) { return 1; }
    }
    // Save tile data
    sVar1 = _fwrite(DAT_00636598, DAT_006d1164 * 6, 1, param_1); // DEVIATION: fwrite — all tiles
    if (sVar1 !== 0) { local_c = 0; }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_005B0000.c FUN_005b8783 (405 bytes)
export function FUN_005b8783(param_1, param_2) {
  let sVar1;
  let local_34;
  let local_30 = 1;
  let local_28 = new Uint8Array(36);

  sVar1 = _fread(local_28, 0xe, 1, param_1); // DEVIATION: fread — map header
  if (sVar1 !== 0) {
    if (param_2 === 0) {
      // Initialize starting positions to -1
      for (local_34 = 0; local_34 < 0x15; local_34 = local_34 + 1) {
        w16(DAT_00627fe0, local_34 * 2, 0xffff);
        w16(DAT_00628010, local_34 * 2, 0xffff);
      }
    } else {
      // Read starting positions
      sVar1 = _fread(DAT_00627fe0, 0x2a, 1, param_1); // DEVIATION: fread
      if (sVar1 === 0) { return 1; }
      sVar1 = _fread(DAT_00628010, 0x2a, 1, param_1); // DEVIATION: fread
      if (sVar1 === 0) { return 1; }
    }
    FUN_005b8416(); // deallocate old map
    FID_conflict__memcpy(DAT_006d1160, local_28, 0xe); // DEVIATION: memcpy — copy header
    FUN_005b7fe0(); // allocate new map
    if (param_2 === 0) {
      // Read visibility layers
      for (local_34 = 1; local_34 < 8; local_34 = local_34 + 1) {
        sVar1 = _fread(ri(DAT_006365c0, local_34 * 4), DAT_006d1164, 1, param_1); // DEVIATION: fread
        if (sVar1 === 0) { return 1; }
      }
    }
    // Read tile data
    sVar1 = _fread(DAT_00636598, DAT_006d1164 * 6, 1, param_1); // DEVIATION: fread
    if (sVar1 !== 0) { local_30 = 0; }
  }
  return local_30;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b898b — get_visibility_offset (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b898b (48 bytes)
// Returns offset into visibility layer array for tile (x, y, civLayer)
export function FUN_005b898b(param_1, param_2, param_3) {
  return (DAT_006d1160 >> 1) * param_2 + (param_1 >> 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8a81 — get_tile_continent_id (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b8a81 (39 bytes)
export function FUN_005b8a81(param_1, param_2) {
  let iVar1;
  iVar1 = FUN_005b8931(param_1, param_2);
  return tileRead(iVar1, 3);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8aa8 — get_continent_for_land_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8aa8(param_1, param_2) {
  let local_8 = -1;
  let iVar1 = FUN_005b89e4(param_1, param_2);
  if (iVar1 === 0) {
    local_8 = FUN_005b8a81(param_1, param_2);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8af0 — get_tile_river_group (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b8af0 (42 bytes)
export function FUN_005b8af0(param_1, param_2) {
  let iVar1;
  iVar1 = FUN_005b8931(param_1, param_2);
  return u8(tileRead(iVar1, 2)) >> 5;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8b1a — update_visibility_for_tile (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b8b1a (75 bytes)
export function FUN_005b8b1a(param_1, param_2, param_3) {
  let iVar1;
  if (param_3 !== 0) {
    iVar1 = FUN_005b8931(param_1, param_2);
    FUN_005b9d81(param_1, param_2, tileRead(iVar1, 1), param_3, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8b65 — check_tile_visibility (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b8b65 (71 bytes)
export function FUN_005b8b65(param_1, param_2, param_3) {
  let uVar1;
  let iVar2;
  if (param_3 < 0) {
    uVar1 = 1;
  } else {
    iVar2 = FUN_005b8931(param_1, param_2);
    uVar1 = u8(tileRead(iVar2, 4)) & (1 << (param_3 & 0x1f));
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8bac — set_tile_visibility (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8bac(param_1, param_2, param_3, param_4) {
  if (-1 < param_3) {
    if (param_4 === 0) {
      FUN_005b976d(param_1, param_2, 1 << (param_3 & 0x1f), 0, 1);
    } else {
      FUN_005b976d(param_1, param_2, 1 << (param_3 & 0x1f), 1, 1);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8c18 — get_tile_owner_low_nibble (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b8c18 (42 bytes)
export function FUN_005b8c18(param_1, param_2) {
  let iVar1;
  iVar1 = FUN_005b8931(param_1, param_2);
  return u8(tileRead(iVar1, 5)) & 0xf;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8c42 — get_tile_effective_owner (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8c42(param_1, param_2) {
  let local_8 = FUN_005b8af0(param_1, param_2);
  if (local_8 === 0) {
    local_8 = FUN_005b8c18(param_1, param_2);
    if (local_8 !== 0 && local_8 < 9) local_8 = 8;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8d15 — find_fortress_owner (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8d15(param_1, param_2) {
  let bVar1 = FUN_005b94d5(param_1, param_2);
  if ((bVar1 & 0x42) === 0x42) {
    return FUN_005b8a1d(param_1, param_2);
  }
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8d62 — get_unit_owner_at_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8d62(param_1, param_2) {
  let uVar1 = FUN_005b94d5(param_1, param_2);
  if ((uVar1 & 1) === 0) {
    return -1;
  }
  return FUN_005b8a1d(param_1, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8da4 — get_owner_at_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8da4(param_1, param_2) {
  let iVar1 = FUN_005b8ca6(param_1, param_2);
  if (iVar1 < 0) iVar1 = FUN_005b8d62(param_1, param_2);
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8dec — check_tile_diplomacy (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8dec(param_1, param_2, param_3) {
  let iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 !== 0 && 0 < param_3) {
    iVar1 = FUN_005b89e4(param_1, param_2);
    if (iVar1 === 0) {
      iVar1 = FUN_005b8af0(param_1, param_2);
      if (0 < iVar1 && iVar1 !== param_3) {
        if ((DAT_0064c6c0[param_3 * 0x594 + iVar1 * 4] & 8) !== 0) return -1;
        if ((DAT_0064c6c0[param_3 * 0x594 + iVar1 * 4] & 4) !== 0) return iVar1;
      }
    }
  }
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8ffa — check_hut_at_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8ffa(param_1, param_2) {
  let iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 === 0) return 0;
  iVar1 = FUN_005b89e4(param_1, param_2);
  if (iVar1 !== 0) return 0;
  iVar1 = FUN_005b8a1d(param_1, param_2);
  if (iVar1 >= 0) return 0;
  let uVar3 = param_1 - ((param_1 + param_2) >> 1);
  if (((param_1 + param_2) >> 1 & 3) + (uVar3 & 3) * 4 ===
      (((param_1 + param_2) >> 3) * 0xb + (uVar3 >> 2) * 0xd + DAT_006d1168 + 8 & 0x1f)) {
    return 1;
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b90df — add_pollution_to_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b90df(param_1, param_2) {
  let iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 !== 0) {
    let uVar2 = FUN_005b94d5(param_1, param_2);
    if ((uVar2 & 0x80) === 0) {
      FUN_005b94fc(param_1, param_2, 0x80, 1, 1);
      for (let local_8 = 1; local_8 < 8; local_8++) {
        FUN_005b8b1a(param_1, param_2, local_8);
      }
      DAT_00655b12 = DAT_00655b12 + 1;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9179 — global_warming_effect (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9179 (696 bytes)
export function FUN_005b9179(param_1, param_2) {
  let bVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let uVar5, uVar6;
  let local_18;
  let local_8;

  iVar2 = FUN_004087c0(param_1, param_2);
  if (iVar2 !== 0) {
    FUN_005b9ec6();
    for (local_8 = 0; local_8 < 9; local_8++) {
      uVar3 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
      iVar2 = s8(DAT_00628360[local_8]) + param_2;
      iVar4 = FUN_004087c0(uVar3, iVar2);
      if (iVar4 !== 0) {
        iVar4 = FUN_0043cf76(uVar3, iVar2);
        if (iVar4 < 0) {
          let isOcean = FUN_005b89e4(uVar3, iVar2);
          if (isOcean === 0) {
            let tOff = FUN_005b8931(uVar3, iVar2);
            bVar1 = FUN_005b94d5(uVar3, iVar2);
            if ((bVar1 & 0x42) === 0x40) {
              FUN_005b94fc(uVar3, iVar2, 0x40, 0, 1);
            }
            uVar5 = _rand();
            uVar6 = uVar5 >> 31;
            if (((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6) {
              FUN_005b94fc(uVar3, iVar2, 0x20, 0, 1);
            }
            if ((u8(tileRead(tOff, 1)) & 8) === 0 || (u8(tileRead(tOff, 1)) & 4) === 0) {
              uVar5 = _rand();
              uVar6 = uVar5 >> 31;
              if (((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6) {
                FUN_005b94fc(uVar3, iVar2, 8, 0, 1);
              }
              uVar5 = _rand();
              uVar6 = uVar5 >> 31;
              if (((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6) {
                FUN_005b94fc(uVar3, iVar2, 4, 0, 1);
              }
            } else {
              uVar5 = _rand();
              uVar6 = uVar5 >> 31;
              if (((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6) {
                FUN_005b94fc(uVar3, iVar2, 8, 0, 1);
              }
            }
            for (local_18 = 1; local_18 < 8; local_18++) {
              FUN_005b8b1a(uVar3, iVar2, local_18);
            }
            iVar4 = _rand();
            if (iVar4 % 3 !== 0) {
              FUN_005b90df(uVar3, iVar2);
            }
            FUN_0047cea6(uVar3, iVar2);
          }
        } else {
          // Reduce city size by half
          DAT_0064f340[iVar4 * 0x58 + 9] =
            DAT_0064f340[iVar4 * 0x58 + 9] - (s8(DAT_0064f340[iVar4 * 0x58 + 9]) >> 1);
          FUN_0047ce1e(uVar3, iVar2, 0, DAT_006d1da0, 1);
        }
      }
    }
    FUN_005b9f1c();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9431 — check_tech_known_for_city (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9431 (78 bytes)
export function FUN_005b9431(param_1, param_2) {
  // FUN_005ae3bf converts tech ID to byte_index and bit_mask
  let local_c = param_2 >> 3;      // byte index
  let local_8 = 1 << (param_2 & 7); // bit mask
  return ((local_8 & DAT_00666137[local_c + param_1 * 0x10]) !== 0) ? 1 : 0; // C: bool return = int 0/1
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b947f — count_cities_with_tech (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b947f(param_1) {
  let local_8 = 0;
  for (let local_c = 1; local_c < 0x3f; local_c++) {
    let iVar1 = FUN_005b9431(local_c, param_1);
    if (iVar1 !== 0) local_8++;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b94fc — set_tile_improvement_bits (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b94fc (330 bytes)
export function FUN_005b94fc(param_1, param_2, param_3, param_4, param_5) {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = tileRead(iVar2, 1);
  if (param_4 === 0) {
    tileWrite(iVar2, 1, u8(tileRead(iVar2, 1)) & (~param_3 & 0xFF));
  } else {
    tileWrite(iVar2, 1, u8(tileRead(iVar2, 1)) | (param_3 & 0xFF));
  }
  if (param_5 !== 0 && tileRead(iVar2, 1) !== cVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(0, param_1, param_2, param_3, param_4, 0);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x90, 0, param_1, param_2, param_3, param_4, 1, 0, 0, 0);
      } else {
        FUN_0046b14d(0x90, 0xff, param_1, param_2, param_3, param_4, 0, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9646 — set_tile_terrain (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9646 (295 bytes)
export function FUN_005b9646(param_1, param_2, param_3, param_4) {
  let bVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  bVar1 = tileRead(iVar2, 0);
  tileWrite(iVar2, 0, u8(tileRead(iVar2, 0)) & 0xf0);
  tileWrite(iVar2, 0, u8(tileRead(iVar2, 0)) | (param_3 & 0xFF));
  if (param_4 !== 0 && tileRead(iVar2, 0) !== bVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(1, param_1, param_2, param_3, 0, 0);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x91, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      } else {
        FUN_0046b14d(0x91, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b976d — set_tile_visibility_bits (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b976d (330 bytes)
export function FUN_005b976d(param_1, param_2, param_3, param_4, param_5) {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = tileRead(iVar2, 4);
  if (param_4 === 0) {
    tileWrite(iVar2, 4, u8(tileRead(iVar2, 4)) & (~param_3 & 0xFF));
  } else {
    tileWrite(iVar2, 4, u8(tileRead(iVar2, 4)) | (param_3 & 0xFF));
  }
  if (param_5 !== 0 && tileRead(iVar2, 4) !== cVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(2, param_1, param_2, param_3, param_4, 0);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x92, 0, param_1, param_2, param_3, param_4, 1, 0, 0, 0);
      } else {
        FUN_0046b14d(0x92, 0xff, param_1, param_2, param_3, param_4, 0, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b98b7 — set_tile_owner_low_nibble (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b98b7 (305 bytes)
export function FUN_005b98b7(param_1, param_2, param_3, param_4) {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = tileRead(iVar2, 5);
  tileWrite(iVar2, 5, u8(tileRead(iVar2, 5)) & 0xf0);
  tileWrite(iVar2, 5, u8(tileRead(iVar2, 5)) | (param_3 & 0xf));
  if (param_4 !== 0 && tileRead(iVar2, 5) !== cVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(3, param_1, param_2, param_3, 0, 0);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x93, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      } else {
        FUN_0046b14d(0x93, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b99e8 — set_tile_owner_high_nibble (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b99e8 (333 bytes)
export function FUN_005b99e8(param_1, param_2, param_3, param_4) {
  let cVar1;
  let iVar2;

  if (param_3 < 0 || 8 < param_3) {
    param_3 = 0xf;
  }
  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = tileRead(iVar2, 5);
  tileWrite(iVar2, 5, u8(tileRead(iVar2, 5)) & 0xf);
  tileWrite(iVar2, 5, u8(tileRead(iVar2, 5)) | ((param_3 << 4) & 0xFF));
  if (param_4 !== 0 && tileRead(iVar2, 5) !== cVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(4, param_1, param_2, param_3, 0, 0);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x94, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      } else {
        FUN_0046b14d(0x94, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9b35 — set_tile_continent (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9b35 (276 bytes)
export function FUN_005b9b35(param_1, param_2, param_3, param_4) {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = tileRead(iVar2, 3);
  tileWrite(iVar2, 3, param_3 & 0xFF);
  if (param_4 !== 0 && tileRead(iVar2, 3) !== cVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(5, param_1, param_2, param_3, 0, 0);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x95, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      } else {
        FUN_0046b14d(0x95, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9c49 — set_tile_river_group (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9c49 (312 bytes)
export function FUN_005b9c49(param_1, param_2, param_3, param_4) {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = tileRead(iVar2, 2);
  tileWrite(iVar2, 2, u8(tileRead(iVar2, 2)) & 0x1f);
  tileWrite(iVar2, 2, (((param_3 & 7) << 5) | u8(tileRead(iVar2, 2))) & 0xFF);
  if (param_4 !== 0 && tileRead(iVar2, 2) !== cVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(6, param_1, param_2, param_3, 0, 0);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x96, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      } else {
        FUN_0046b14d(0x96, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9d81 — set_vis_layer_data (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9d81 (325 bytes)
export function FUN_005b9d81(param_1, param_2, param_3, param_4, param_5, param_6) {
  let bVar1;
  let addr;

  addr = FUN_005b898b(param_1, param_2, param_4);
  if (addr < 0 || !DAT_006365c0[param_4]) {
    return; // out of bounds
  }
  bVar1 = DAT_006365c0[param_4][addr];
  if (param_5 === 0) {
    DAT_006365c0[param_4][addr] = param_3 & 0xFF;
  } else {
    DAT_006365c0[param_4][addr] = (DAT_006365c0[param_4][addr] | param_3) & 0xFF;
  }
  if (param_6 !== 0 && DAT_006365c0[param_4][addr] !== bVar1 && 2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0 && DAT_006ad69a !== 0) {
      FUN_005b9fde(7, param_1, param_2, param_3, param_4, param_5);
    } else if (DAT_006ad699 !== 0) {
      if (DAT_006ad2f7 === 0) {
        FUN_0046b14d(0x97, 0, param_1, param_2, param_3, param_4, param_5, 1, 0, 0);
      } else {
        FUN_0046b14d(0x97, 0xff, param_1, param_2, param_3, param_4, param_5, 0, 0, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9ec6 — begin_map_batch_update (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9ec6 (86 bytes)
export function FUN_005b9ec6() {
  if (2 < DAT_00655b02) {
    DAT_006ad699 = 0;
    DAT_006ad69a = 1;
    DAT_006d1190.fill(0);
    DAT_006365f4 = 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9f1c — end_map_batch_update (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9f1c (194 bytes)
export function FUN_005b9f1c() {
  if (2 < DAT_00655b02) {
    DAT_006ad699 = 1;
    DAT_006ad69a = 0;
    if (DAT_006ad2f7 === 0) {
      if (1 < DAT_006365f4) {
        FUN_0046b14d(0x59, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(5000);
        DAT_006d1190.fill(0);
        DAT_006365f4 = 1;
      }
    } else {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9fde — queue_map_batch_entry (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005b9fde (515 bytes)
export function FUN_005b9fde(param_1, param_2, param_3, param_4, param_5, param_6) {
  if (DAT_006ad2f7 !== 0) {
    FUN_005dae6b(7, '!gNetMgr.bServer', 'Map.cpp', 0x3de);
  }
  if (0x100 - DAT_006365f4 < DAT_006365f8[param_1] + 1) {
    FUN_0046b14d(0x59, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
    DAT_006d1190[0] = 0;
    DAT_006365f4 = 1;
  }
  DAT_006d1190[0] = DAT_006d1190[0] + 1;
  DAT_006d1190[DAT_006365f4] = param_1;
  DAT_006365f4 = DAT_006365f4 + 1;
  switch (param_1) {
    case 0:
    case 2:
      DAT_006d1190[DAT_006365f4] = param_2; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_3; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_4; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_5; DAT_006365f4++;
      break;
    case 1:
    case 3:
    case 4:
    case 5:
    case 6:
      DAT_006d1190[DAT_006365f4] = param_2; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_3; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_4; DAT_006365f4++;
      break;
    case 7:
      DAT_006d1190[DAT_006365f4] = param_2; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_3; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_4; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_5; DAT_006365f4++;
      DAT_006d1190[DAT_006365f4] = param_6; DAT_006365f4++;
      break;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005ba206 — apply_map_batch (GL)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005ba206 (510 bytes)
export function FUN_005ba206(param_1) {
  let iVar1;
  let uVar2;
  let local_28;
  let local_24;
  let local_20 = [0, 0, 0, 0];
  let local_10;
  let local_8;

  local_8 = 0;
  if (2 < DAT_00655b02) {
    if (DAT_006ad2f7 === 0) {
      FUN_005dae6b(7, 'gNetMgr.bServer', 'Map.cpp', 0x416);
    }
    uVar2 = DAT_006ad699;
    DAT_006ad699 = 0;
    iVar1 = local_8;
    local_8 = local_8 + 1;
    for (local_28 = param_1[iVar1]; 0 < local_28; local_28 = local_28 - 1) {
      iVar1 = param_1[local_8];
      for (local_24 = 0; local_8 = local_8 + 1, local_24 < DAT_006365f8[iVar1] - 1; local_24++) {
        local_20[local_24] = param_1[local_8];
      }
      switch (iVar1) {
        case 0: FUN_005b94fc(local_20[0], local_20[1], local_20[2], local_20[3], 1); break;
        case 1: FUN_005b9646(local_20[0], local_20[1], local_20[2], 1); break;
        case 2: FUN_005b976d(local_20[0], local_20[1], local_20[2], local_20[3], 1); break;
        case 3: FUN_005b98b7(local_20[0], local_20[1], local_20[2], 1); break;
        case 4: FUN_005b99e8(local_20[0], local_20[1], local_20[2], 1); break;
        case 5: FUN_005b9b35(local_20[0], local_20[1], local_20[2], 1); break;
        case 6: FUN_005b9c49(local_20[0], local_20[1], local_20[2], 1); break;
        case 7: FUN_005b9d81(local_20[0], local_20[1], local_20[2], local_20[3], local_10, 1); break;
      }
    }
    DAT_006ad699 = uVar2;
    FUN_004b0b53(0xff, 2, 0, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bad40 — parse_binary_string (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bad40(param_1) {
  let local_8 = 0;
  for (let i = 0; i < param_1.length; i++) {
    let c = param_1.charCodeAt(i);
    let upper = c >= 0x61 && c <= 0x7a ? c - 0x20 : c;
    if (upper === 0x30 || upper === 0x31) {
      local_8 = local_8 * 2 + upper - 0x30;
    } else {
      break;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005badf0 — build_path (FW)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005badf0 (145 bytes)
export function FUN_005badf0(param_1, param_2, param_3) {
  let local_58;
  let local_54 = '';

  FUN_005f22d0(local_54, param_2); // copy directory
  // Walk to end of string
  for (local_58 = local_54; local_58.length > 0 && local_58[local_58.length - 1] !== '\0'; ) { break; }
  // Add backslash if not present
  if (local_54.length === 0 || local_54[local_54.length - 1] !== '\\') {
    FUN_005f22e0(local_54, "\\"); // append backslash
  }
  FUN_005f22d0(param_1, local_54); // copy to output
  FUN_005f22e0(param_1, param_3); // append filename
  _strupr(param_1); // DEVIATION: uppercase
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baeb0 — set_text_render_target (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baeb0(param_1) { DAT_006366a8 = param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUN_005baec8 — set_text_render_psheet (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baec8(param_1) { DAT_006366ac = param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUN_005baee0 — set_text_render_params (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baee0(param_1, param_2, param_3, param_4) {
  DAT_006366b0 = param_1;
  DAT_006366b4 = param_2;
  if (-1 < param_3) DAT_006366b8 = param_3;
  if (-1 < param_4) DAT_006366bc = param_4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baf24 — set_text_bold (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baf24(param_1) {
  DAT_006366c0 = param_1 !== 0 ? 1 : 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baf57 — draw_text (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005baf57 (205 bytes)
export function FUN_005baf57(param_1, param_2, param_3, param_4) {
  let iVar1;

  if (-1 < DAT_006366b4) {
    FUN_005c19ad(DAT_006366b4); // DEVIATION: GDI — set shadow color
    FUN_005c0f57(DAT_006366ac, param_2, DAT_006366b8 + DAT_006366c0 + param_3, DAT_006366bc + param_4, 5); // DEVIATION: GDI — draw text shadow
  }
  if (-1 < DAT_006366b0) {
    FUN_005c19ad(DAT_006366b0); // DEVIATION: GDI — set text color
    if (DAT_006366c0 !== 0) {
      FUN_005c0f57(DAT_006366ac, param_2, param_3 + 1, param_4, 5); // DEVIATION: GDI — draw outline
    }
    FUN_005c0f57(DAT_006366ac, param_2, param_3, param_4, 5); // DEVIATION: GDI — draw text
  }
  iVar1 = FUN_0040efd0(param_2); // DEVIATION: MFC — get text width
  return param_3 + iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb024 — draw_text_centered (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005bb024 (139 bytes)
export function FUN_005bb024(param_1, param_2, param_3, param_4, param_5) {
  let local_8 = FUN_0040efd0(param_2); // DEVIATION: MFC — get text width
  if (-1 < DAT_006366b4) {
    if (DAT_006366b8 < 1) {
      local_8 = local_8 + (~DAT_006366b8 + 1); // abs(shadow offset)
    } else {
      local_8 = local_8 + DAT_006366b8;
    }
  }
  local_8 = local_8 + DAT_006366c0;
  FUN_005baf57(param_1, param_2, param_3 + ((param_5 >> 1) - (local_8 >> 1)), param_4); // centered text
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb0af — draw_text_right_aligned (UI)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005bb0af (131 bytes)
export function FUN_005bb0af(param_1, param_2, param_3, param_4, param_5) {
  let local_8 = FUN_0040efd0(param_2); // DEVIATION: MFC — get text width
  if (-1 < DAT_006366b4) {
    if (DAT_006366b8 < 1) {
      local_8 = local_8 + (~DAT_006366b8 + 1);
    } else {
      local_8 = local_8 + DAT_006366b8;
    }
  }
  param_3 = param_3 + (param_5 - (local_8 + DAT_006366c0)); // right-aligned text
  FUN_005baf57(param_1, param_2, param_3, param_4);
  return param_3;
}


// ═══════════════════════════════════════════════════════════════════
// Remaining functions: UI/GDI/Window management — DEVIATION: Win32 API
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005B0000.c FUN_005bb3f0 (115 bytes)
export function FUN_005bb3f0(p1, p2, p3, p4, p5, p6, p7) {
  FUN_005c5760(p1, p2, p3, p4, p5, p6, p7); // DEVIATION: GDI — create window class
  FUN_005bd65c(p5, p6); // DEVIATION: GDI — create bitmap
  FUN_005c0cc5(p7); // DEVIATION: GDI — set palette
  let uVar1 = FUN_00414d10(); // DEVIATION: MFC — get main window
  FUN_005e1880(0 /*in_ECX*/, uVar1); // DEVIATION: MFC — register window
}
export function FUN_005bb463(p1, p2, p3, p4, p5, p6, p7, p8) { /* DEVIATION: Win32 API */ }
// Source: decompiled/block_005B0000.c FUN_005bb4ae (119 bytes)
export function FUN_005bb4ae(p1, p2, p3, p4, p5, p6, p7, p8) {
  FUN_005bb3f0(p1, p2, p3, p4, p5, p6, p7); // create window class
  FUN_00579b40(p8); // DEVIATION: MFC — set parent window
}
export function FUN_005bb525(p1, p2, p3, p4, p5, p6, p7, p8, p9) { /* DEVIATION: Win32 API */ }
export function FUN_005bb574() { /* DEVIATION: Win32 API */ }
export function FUN_005bb5be(param_1) { return false; /* DEVIATION: Win32 API */ }
// Source: decompiled/block_005B0000.c FUN_005bb621 (166 bytes)
export function FUN_005bb621(param_1, param_2) {
  // let pCVar1 = CRichEditCntrItem_GetActiveView(in_ECX); // DEVIATION: MFC
  // if (pCVar1 === param_1 && CRichEditCntrItem_GetActiveView(in_ECX) === param_2) { return; }
  // SetRect(&local_14, 0, 0, param_1, param_2); // DEVIATION: Win32
  // (*(code *)**(in_ECX))(&local_14); // DEVIATION: MFC — vtable call
  let uVar2 = FUN_005bb8c0(); // DEVIATION: MFC
  FUN_005c0d12(uVar2); // DEVIATION: GDI — set palette
  // DAT_00637ea4 = (in_ECX === 0) ? 0 : in_ECX + 0x48; // DEVIATION: MFC
  FUN_005bb990(); // DEVIATION: MFC — repaint
  FUN_00408460(); // DEVIATION: MFC — invalidate
}

// Source: decompiled/block_005B0000.c FUN_005bb6c7 (153 bytes)
export function FUN_005bb6c7(param_1, param_2) {
  let local_14 = [0], local_10 = [0], local_c = [0], local_8 = [0];
  FUN_005bb910(local_10, local_14); // get min scroll position
  FUN_005bb950(local_8, local_c); // get max scroll position
  // Clamp param_1 to [local_10, local_8]
  if (param_1 < local_10[0]) { param_1 = local_10[0]; }
  if (local_8[0] < param_1) { param_1 = local_8[0]; }
  // Clamp param_2 to [local_14, local_c]
  if (param_2 < local_14[0]) { param_2 = local_14[0]; }
  if (local_c[0] < param_2) { param_2 = local_c[0]; }
  FUN_005bb8e0(param_1, param_2); // set scroll position
}
export function FUN_005bb760(p1, p2, p3, p4, p5, p6) { /* DEVIATION: Win32 API */ }
export function FUN_005bb7c3(p1, p2, p3, p4, p5, p6, p7) { /* DEVIATION: Win32 API */ }
// Source: decompiled/block_005B0000.c FUN_005bb80a (103 bytes)
export function FUN_005bb80a(p1, p2, p3, p4, p5, p6, p7) {
  FUN_005c592b(p1, p2, p3, p4, p5, p6, p7); // DEVIATION: GDI — create sprite window class
  FUN_005c1b0d(p5, p6); // DEVIATION: GDI — create surface
  let uVar1 = FUN_00414d10(); // DEVIATION: MFC — get main window
  FUN_005e1880(0 /*in_ECX*/, uVar1); // DEVIATION: MFC — register window
}
export function FUN_005bb871(p1, p2, p3, p4, p5, p6, p7, p8) { /* DEVIATION: Win32 API */ }
export function FUN_005bb8c0() { return 0; /* DEVIATION: Win32 API */ }
export function FUN_005bb8e0(param_1, param_2) { /* DEVIATION: Win32 API */ }
export function FUN_005bb910(param_1, param_2) { /* DEVIATION: Win32 API */ }
export function FUN_005bb950(param_1, param_2) { /* DEVIATION: Win32 API */ }
export function FUN_005bb990() { /* DEVIATION: Win32 API */ }
export function FUN_005bb9c0() { /* Win32 PeekMessage — no-op */ }
export function FUN_005bba1d() { /* Win32 PeekMessage — no-op */ }
// Source: decompiled/block_005B0000.c gdi_BA4F (100 bytes)
export function gdi_BA4F() {
  // let BVar1 = PeekMessageA(local_20, 0, 0, 0, 1); // DEVIATION: Win32 — check message queue
  // if (BVar1 === 0) {
  //   FUN_00407ff0(); // DEVIATION: MFC — idle processing
  //   if (DAT_00637efc !== 0) { FUN_005e1c70(); } // DEVIATION: timer callback
  //   return 0;
  // } else {
  //   TranslateMessage(local_20); // DEVIATION: Win32
  //   DispatchMessageA(local_20); // DEVIATION: Win32
  //   return 1;
  // }
  return 0;
}
export function gdi_BAB8() { return false; /* Win32 — no-op */ }
export function FUN_005bbb0a() { /* Win32 — no-op */ }
export function FUN_005bbb32() { /* Win32 — no-op */ }
export function FUN_005bbb5a(param_1) { /* WinExec — no-op */ }
export function gdi_BB76() { return false; /* Win32 — no-op */ }
export function FUN_005bbbce() { /* Win32 — no-op */ }
// Source: decompiled/block_005B0000.c create_window_BC10 (990 bytes)
export function create_window_BC10(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let uVar1;
  let puVar2;
  let iVar3;
  let local_34, local_30, local_2c, local_28, local_24;
  let local_20 = 0;
  let local_18 = 0x2000000;
  let local_14, local_10 = 0, local_c = 0;

  uVar1 = FUN_005dce4f(0x4c); // DEVIATION: Win32 — allocate window struct (76 bytes)
  puVar2 = FUN_005dcdf9(uVar1); // DEVIATION: Win32 — lock memory
  // puVar2[0] = uVar1; // store handle
  local_14 = 0; // GetSystemMetrics(4); // DEVIATION: Win32 — caption height

  // Compute window style from param_2 flags
  if ((param_2 & 4) !== 0) {
    local_18 = 0x2040000;
    // local_c = GetSystemMetrics(0x20) * 2; // DEVIATION: Win32 — dialog frame width
    // local_10 = GetSystemMetrics(0x21) * 2; // DEVIATION: Win32 — dialog frame height
  } else if ((param_2 & 2) !== 0 && (param_2 & 0x40) === 0) {
    local_18 = 0x2400000;
    // local_c = GetSystemMetrics(7) * 2; // DEVIATION: Win32 — border width
    // local_10 = GetSystemMetrics(8) * 2; // DEVIATION: Win32 — border height
  } else if ((param_2 & 2) !== 0 && (param_2 & 0x40) !== 0) {
    local_18 = 0x2800000;
    // local_c = GetSystemMetrics(7) * 2;
    // local_10 = GetSystemMetrics(8) * 2;
  } else if ((param_2 & 1) !== 0) {
    local_18 = 0x2800000;
    // local_c = GetSystemMetrics(7) * 2;
    // local_10 = GetSystemMetrics(8) * 2;
    local_14 = local_14 + 1;
  }
  if ((param_2 & 8) !== 0) { local_18 = local_18 | 0x20000; param_2 = param_2 | 0x40; }
  if ((param_2 & 0x10) !== 0) { local_18 = local_18 | 0x10000; param_2 = param_2 | 0x40; }
  if ((param_2 & 0x20) !== 0) { local_18 = local_18 | 0x80000; param_2 = param_2 | 0x40; }
  if ((param_2 & 0x40) === 0) { local_14 = 0; }
  else { local_18 = local_18 | 0xc00000; }
  if ((param_2 & 0x80) !== 0) {
    local_18 = local_18 | 0x200000;
    // iVar3 = GetSystemMetrics(2); local_c = local_c + iVar3 - 1; // DEVIATION: Win32 — scrollbar
  }
  if ((param_2 & 0x100) !== 0) {
    local_18 = local_18 | 0x100000;
    // iVar3 = GetSystemMetrics(3); local_10 = local_10 + iVar3 - 1; // DEVIATION: Win32 — scrollbar
  }
  if ((param_2 & 0x200) !== 0 && param_7 !== 0) { local_18 = local_18 | 0x44000000; local_20 = 4; }
  if ((param_2 & 0x800) !== 0) { local_18 = (local_18 & 0xbfffffff) | 0x80000000; }

  // Window struct fields
  puVar2 = new Array(19).fill(0);
  puVar2[0xc] = ((param_2 & 0x400) !== 0) ? 1 : 0;
  puVar2[0xd] = ((param_2 & 0x1000) !== 0) ? 1 : 0;

  // Calculate window position
  local_24 = (param_7 === 0) ? 0 : param_7; // DEVIATION: parent HWND
  local_28 = (param_6 === -1) ? -0x80000000 : local_10 + local_14 + param_6 - 1;
  local_2c = (param_5 === -1) ? -0x80000000 : local_c + param_5;
  local_30 = (param_4 === -1) ? -0x80000000 : param_4;
  local_34 = (param_3 === -1) ? -0x80000000 : param_3;

  // pHVar4 = CreateWindowExA(local_20, "MSWindowClass", param_1, local_18,
  //                          local_34, local_30, local_2c, local_28,
  //                          local_24, 0, DAT_006e4ff0, 0); // DEVIATION: Win32 CreateWindowEx
  // puVar2[1] = pHVar4; // HWND
  // FUN_005bc1b5(puVar2[1]); // DEVIATION: register window
  // puVar2[2] = GetDC(puVar2[1]); // DEVIATION: Win32 — get device context
  // puVar2[7] = LoadCursorA(0, 0x7f00); // DEVIATION: Win32 — load arrow cursor
  puVar2[6] = 0; puVar2[8] = 0; puVar2[0x11] = 0;
  puVar2[5] = 0; puVar2[3] = 0; puVar2[9] = 0;
  puVar2[10] = 0; puVar2[0xb] = 0;
  puVar2[0x12] = param_2; // store flags
  puVar2[0xe] = 0; puVar2[0xf] = 0; puVar2[4] = 0;
  puVar2[0x10] = 8; // bit depth
  return puVar2;
}
export function FUN_005bbfee(param_1, param_2) { /* EnableWindow — no-op */ }
export function FUN_005bc019(param_1, param_2) { /* SetWindowLong — no-op */ }
export function FUN_005bc032(param_1) { return 0; /* IsWindowVisible — no-op */ }
export function send_msg_C07E(param_1) { /* SendMessage WM_CLOSE — no-op */ }
// Source: decompiled/block_005B0000.c manage_window_C0AB (200 bytes)
export function manage_window_C0AB(param_1) {
  if (param_1 !== null && param_1 !== 0) {
    FUN_005bc1db(param_1[1]); // unregister window from stack
    if (param_1[0x11] === 0) {
      if (param_1[1] !== 0) {
        // SetWindowLongA(param_1[1], 4, 0); // DEVIATION: Win32
        // ShowWindow(param_1[1], 0); // DEVIATION: Win32 — hide
        // SetMenu(param_1[1], 0); // DEVIATION: Win32 — remove menu
        // DestroyWindow(param_1[1]); // DEVIATION: Win32 — destroy
      }
      param_1[1] = 0;
    }
    if (param_1[5] !== 0) {
      // DeleteObject(param_1[5]); // DEVIATION: Win32 — delete bitmap
    }
    let uVar1 = param_1[0];
    FUN_005dce29(uVar1); // DEVIATION: Win32 — unlock memory
    FUN_005dce96(uVar1); // DEVIATION: Win32 — free memory
  }
  return 0;
}
export function FUN_005bc173() { /* window stack iteration — no-op */ }
export function FUN_005bc1b5(param_1) { /* push window stack — no-op */ }
// Source: decompiled/block_005B0000.c FUN_005bc1db (165 bytes)
export function FUN_005bc1db(param_1) {
  let local_8;

  // Find window in stack
  for (local_8 = 0; local_8 < DAT_006366cc && ri(DAT_006d1db8, local_8 * 4) !== param_1;
      local_8 = local_8 + 1) {
  }
  // Shift remaining entries down
  if (local_8 < DAT_006366cc - 1) {
    for (; local_8 < DAT_006366cc - 1; local_8 = local_8 + 1) {
      wi(DAT_006d1db8, local_8 * 4, ri(DAT_006d1db8, (local_8 + 1) * 4));
    }
  }
  DAT_006366cc = DAT_006366cc - 1;
  if (DAT_006366cc < 0) {
    debug_log("Error: MS window stack inaccurate");
  }
}
// Source: decompiled/block_005B0000.c update_palette_C280 (222 bytes)
export function update_palette_C280(param_1, param_2) {
  // if (ri(param_1, 0x14) !== 0) { DeleteObject(ri(param_1, 0x14)); } // DEVIATION: Win32
  if (DAT_00638b48 === 0) {
    // let local_10 = GetWindowLongA(ri(param_1, 4), 0); // DEVIATION: Win32
    // FUN_00511320(); // DEVIATION: MFC
    // FUN_00497c40(param_2, local_c, local_14, local_8); // get RGB from palette index
    // let pHVar1 = CreateSolidBrush(local_c[0] | (local_14[0] << 8) | (local_8[0] << 16)); // DEVIATION: Win32
    // wi(param_1, 0x14, pHVar1);
  } else {
    // if (ri(param_1, 0x18) !== 0) { RealizePalette(ri(param_1, 8)); } // DEVIATION: Win32
    // let pHVar1 = CreateSolidBrush(param_2 | 0x1000000); // DEVIATION: Win32
    // wi(param_1, 0x14, pHVar1);
  }
  // InvalidateRect(ri(param_1, 4), 0, 0); // DEVIATION: Win32
}
export function invalidate_C35E(p1, p2, p3, p4) { /* brush creation — no-op */ }
export function FUN_005bc3bf(param_1, param_2) { /* set field +0x24 — no-op */ }
export function FUN_005bc3d8(param_1, param_2) { /* set field +0x28 — no-op */ }
export function FUN_005bc3f1(param_1, param_2) { /* set field +0x2c — no-op */ }
export function manage_window_C40A(param_1) { /* ShowWindow SW_SHOW — no-op */ }
export function manage_window_C44D(param_1) { /* ShowWindow SW_HIDE — no-op */ }
export function FUN_005bc476(param_1, param_2) { /* SetWindowTextA — no-op */ }
// Source: decompiled/block_005B0000.c FUN_005bc4a1 (100 bytes)
export function FUN_005bc4a1(param_1, param_2, param_3) {
  if (param_1 !== 0) {
    // GetWindowRect(ri(param_1, 4), &local_14); // DEVIATION: Win32
    // let nHeight = FUN_00407fc0(&local_14); // DEVIATION: MFC — get height
    // let nWidth = FUN_00407f90(&local_14); // DEVIATION: MFC — get width
    // MoveWindow(ri(param_1, 4), param_2, param_3, nWidth, nHeight, 1); // DEVIATION: Win32
  }
}

// Source: decompiled/block_005B0000.c FUN_005bc505 (213 bytes)
export function FUN_005bc505(param_1, param_2, param_3) {
  if (param_1 !== 0) {
    // GetWindowRect(ri(param_1, 4), &local_24); // DEVIATION: Win32
    // MapWindowPoints(0, GetParent(ri(param_1, 4)), &local_24, 2); // DEVIATION: Win32
    // MoveWindow(ri(param_1, 4), local_24.left, local_24.top, param_2, param_3, 1); // DEVIATION: Win32
    // FUN_005bc621(param_2, param_3); // DEVIATION: resize handler
  }
}
export function manage_window_C5DA(param_1) { /* ShowWindow SW_MAXIMIZE — no-op */ }
export function FUN_005bc603(param_1) { return 0; /* IsZoomed — no-op */ }
export function manage_window_C636(param_1) { /* ShowWindow SW_MINIMIZE — no-op */ }
export function FUN_005bc65f(param_1) { return 0; /* IsIconic — no-op */ }
export function manage_window_C692(param_1) { /* ShowWindow SW_RESTORE — no-op */ }
export function FUN_005bc6bb(param_1, param_2) { /* ValidateRect — no-op */ }
export function invalidate_C6E6(param_1, param_2) { /* InvalidateRect — no-op */ }
export function FUN_005bc713(param_1, param_2) { /* MoveWindow with rect — no-op */ }
// Source: decompiled/block_005B0000.c gdi_C763 (464 bytes)
export function gdi_C763(param_1, param_2, param_3) {
  if (param_1 !== 0) {
    // GetWindowRect(ri(param_1, 4), &local_34); // DEVIATION: Win32
    // let hWnd = GetParent(ri(param_1, 4)); // DEVIATION: Win32
    // if (hWnd === 0) {
    //   // Center on screen
    //   let iVar1 = GetSystemMetrics(0); // screen width // DEVIATION: Win32
    //   let iVar2 = GetSystemMetrics(1); // screen height // DEVIATION: Win32
    //   let iVar3 = FUN_00407f90(&local_34); // window width
    //   local_20 = (iVar1 - iVar3) >> 1;
    //   iVar1 = FUN_00407fc0(&local_34); // window height
    //   local_24 = (iVar2 - iVar1) >> 1;
    // } else {
    //   // Center on parent
    //   GetWindowRect(hWnd, &local_14); // DEVIATION: Win32
    //   local_20 = (FUN_00407f90(&local_14) - FUN_00407f90(&local_34)) >> 1;
    //   local_24 = (FUN_00407fc0(&local_14) - FUN_00407fc0(&local_34)) >> 1;
    //   MapWindowPoints(hWnd, 0, &local_1c, 1); // DEVIATION: Win32
    //   local_20 = local_20 + local_1c.x;
    //   local_24 = local_24 + local_1c.y;
    // }
    // if (param_2 !== -1) { local_20 = param_2; }
    // if (param_3 !== -1) { local_24 = param_3; }
    // MoveWindow(ri(param_1, 4), local_20, local_24, width, height, 1); // DEVIATION: Win32
  }
}
export function FUN_005bc933(param_1) { return 0; /* GetClientRect width — no-op */ }
export function FUN_005bc96b(param_1) { return 0; /* GetClientRect height — no-op */ }
export function FUN_005bc9a3(param_1, param_2) { /* GetWindowRect — no-op */ }
// Source: decompiled/block_005B0000.c FUN_005bc9d3 (106 bytes)
export function FUN_005bc9d3(param_1) {
  if (param_1 === 0) { return 0; }
  // let windowWidth = FUN_00407f90(GetWindowRect(ri(param_1, 4))); // DEVIATION: Win32
  // let clientWidth = FUN_00407f90(GetClientRect(ri(param_1, 4))); // DEVIATION: Win32
  // return windowWidth - clientWidth; // border width
  return 0;
}

// Source: decompiled/block_005B0000.c FUN_005bca3d (106 bytes)
export function FUN_005bca3d(param_1) {
  if (param_1 === 0) { return 0; }
  // let windowHeight = FUN_00407fc0(GetWindowRect(ri(param_1, 4))); // DEVIATION: Win32
  // let clientHeight = FUN_00407fc0(GetClientRect(ri(param_1, 4))); // DEVIATION: Win32
  // return windowHeight - clientHeight; // border height
  return 0;
}
export function FUN_005bcaa7(param_1) { /* get screen rect — no-op */ }
export function FUN_005bcad7(p1, p2, p3, p4, p5) { /* ClientToScreen — no-op */ }
export function FUN_005bcb26(p1, p2, p3, p4, p5) { /* MapWindowPoints — no-op */ }
// Source: decompiled/block_005B0000.c FUN_005bcb85 (140 bytes)
export function FUN_005bcb85(param_1, param_2) {
  // GetWindowRect(ri(param_1, 4), param_2); // DEVIATION: Win32
  // MapWindowPoints(0, GetParent(ri(param_1, 4)), param_2, 2); // DEVIATION: Win32
}
// Source: decompiled/block_005B0000.c update_palette_CC11 (124 bytes)
export function update_palette_CC11(p1, p2, p3, p4, p5, p6, p7, p8) {
  // BitBlt(ri(p1, 8), p2, p3, p4, p5, ri(p6, 8), p7, p8, 0xcc0020); // DEVIATION: Win32 BitBlt
}
export function blit_CC8D(p1, p2, p3, p4, p5, p6, p7, p8) { /* BitBlt — no-op */ }
// Source: decompiled/block_005B0000.c update_palette_CCE2 (132 bytes)
export function update_palette_CCE2(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
  // StretchBlt(ri(p1, 8), p2, p3, p4, p5, ri(p6, 8), p7, p8, p9, p10, 0xcc0020); // DEVIATION: Win32 StretchBlt
}
export function stretch_blit_CD66(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) { /* StretchBlt — no-op */ }
export function FUN_005bcdc3(param_1, param_2) { /* SelectPalette — no-op */ }
export function FUN_005bcdfc(param_1, param_2) { /* SetMenu — no-op */ }
// Source: decompiled/block_005B0000.c invalidate_CE5F (143 bytes)
export function invalidate_CE5F(param_1, param_2) {
  // if (param_2 === 0) {
  //   let hIcon = LoadIconA(DAT_006e4ff0, 0x65); // DEVIATION: Win32 — load app icon
  //   SendMessageA(ri(param_1, 4), 0x80, 0, hIcon); // DEVIATION: Win32 — WM_SETICON
  // } else {
  //   let hIcon = LoadIconA(DAT_006e4ff0, param_2); // DEVIATION: Win32
  //   SendMessageA(ri(param_1, 4), 0x80, 0, hIcon); // DEVIATION: Win32
  // }
  // InvalidateRect(ri(param_1, 4), 0, 1); // DEVIATION: Win32 — repaint
}
export function FUN_005bceee(param_1) { return null; /* LoadCursorA — no-op */ }
export function FUN_005bcf1c(param_1) { /* DestroyCursor — no-op */ }
export function FUN_005bcf40(param_1) { /* SetCursor — no-op */ }
export function FUN_005bcf5a(param_1, param_2, param_3) { /* SetCursor with save — no-op */ }
export function FUN_005bcfa0() { /* ShowCursor(1) — no-op */ }
export function FUN_005bcfb8() { /* ShowCursor(0) loop — no-op */ }
export function FUN_005bcfdd(param_1, param_2, param_3) { /* set cursor by ID — no-op */ }
export function FUN_005bd023(param_1, param_2) { /* set + apply cursor — no-op */ }
export function FUN_005bd05f(param_1, param_2) { /* load cursor by ID — no-op */ }
export function FUN_005bd0e7(param_1) { /* SetFocus + BringWindowToTop — no-op */ }
export function FUN_005bd120(param_1) { /* SetFocus — no-op */ }
export function FUN_005bd14c(param_1, param_2) { /* disable parent window — no-op */ }
export function FUN_005bd1c5(param_1, param_2) { /* enable parent window — no-op */ }
export function FUN_005bd248(param_1, param_2) { /* set field +0x38 — no-op */ }
export function FUN_005bd270(param_1, param_2) { /* set field +0x3c — no-op */ }
export function FUN_005bd298(p1, p2, p3, p4) { return 0; /* wait for mouse click — no-op */ }
export function gdi_D39E(param_1) { return 0; /* check key state — no-op */ }
export function FUN_005bd48f(param_1, param_2, param_3) { /* GetCursorPos — no-op */ }
export function FUN_005bd4cd() { return false; /* GetAsyncKeyState LMB — no-op */ }
export function FUN_005bd500() { return false; /* GetAsyncKeyState RMB — no-op */ }
export function FUN_005bd533(param_1) { /* SetCapture — no-op */ }
export function FUN_005bd550() { /* ReleaseCapture — no-op */ }
export function FUN_005bd566(param_1, param_2) { /* set topmost child window — no-op */ }
export function FUN_005bd610() { return 0; /* get vtable ptr — no-op */ }
export function FUN_005bd630() { return null; /* port vtable init — no-op */ }
export function FUN_005bd65c(param_1, param_2) { /* set port rect — no-op */ }
export function FUN_005bd696(param_1) { return 1; /* port allocate DIB — no-op */ }
export function FUN_005bd7db(p1, p2, p3, p4) { /* load CvPic image — no-op */ }
export function FUN_005bd813(param_1) { /* port init fields — no-op */ }
export function FUN_005bd915() { /* port destructor — no-op */ }
// Source: decompiled/block_005B0000.c FUN_005bd987 (1508 bytes)
export function FUN_005bd987(param_1, param_2, param_3, param_4) {
  let iVar5;
  let local_40, local_1c;
  let local_5c = '';

  // C: local_38 = "LBMS" (magic bytes)
  local_40 = FUN_005c5540("LBMS", param_1); // find LBM resource
  if (local_40 === 0) {
    FUN_005d2279("Error: LBM resource not found.", param_1);
    FUN_005dae6b(3, "ERR_RESOURCENOTFOUND", "Port.cpp", 0xfa);
    return 0;
  }
  local_1c = FUN_005c5560(local_40); // DEVIATION: get resource data
  FUN_005dced3(local_1c, local_5c, 8); // DEVIATION: read 8-byte header
  iVar5 = _strncmp(local_5c, "FORM", 4); // check IFF magic
  if (iVar5 === 0) {
    local_1c = local_1c + 8; // skip FORM header
    FUN_005dced3(local_1c, local_5c, 4); // read format type
    let local_14 = (_strncmp(local_5c, "ILBM", 4) === 0) ? 1 : 0; // is ILBM?
    let local_10 = (_strncmp(local_5c, "PBM ", 4) === 0) ? 1 : 0; // is PBM?
    if (local_14 !== 0 || local_10 !== 0) {
      // C: Parse IFF chunks — BMHD, CMAP, BODY
      // Iterates chunks by reading 4-byte type + 4-byte size
      // BMHD chunk: reads width, height, bit depth, compression flag
      // CMAP chunk: reads RGB palette entries via FUN_005c6da8
      // BODY chunk: decompresses image data
      // C lines 6855-6980 — chunk iteration loop with _strncmp checks
      // FUN_005c019d — create bitmap surface
      // FUN_005e3aa0 / FUN_005e3b0a — decompress RLE/raw image data
      // FUN_005c0cc5(param_4) — set palette
      // FUN_005e395a / FUN_005e3988 — finalize bitmap
      // DEVIATION: Full LBM/IFF parsing requires binary resource access
    } else {
      FUN_005d2279("Error: Resource is not IFF ILBM/PBM.", param_1);
      FUN_005dae6b(4, "ERR_BADPICFORMAT", "Port.cpp", 0x109);
    }
  } else {
    FUN_005d2279("Error: Resource is not IFF.", param_1);
    FUN_005dae6b(4, "ERR_BADPICFORMAT", "Port.cpp", 0x104);
  }
  FUN_005c5580(local_40); // DEVIATION: free resource
  return 0;
}
export function FUN_005bdf7f(p1, p2, p3, p4, p5) { /* decode image row — no-op */ }
export function FUN_005be1b3(p1, p2, p3, p4) { /* decode planar row — no-op */ }
export function FUN_005be2c4(p1, p2, p3, p4) { return 0; /* load TGA resource — no-op */ }
export function FUN_005be595(p1, p2, p3, p4) { /* load TGA file — no-op */ }
export function FUN_005be940() { FUN_005d7c6e(); }
export function FUN_005be956() { /* SEH restore — no-op */ }
export function FUN_005be967(p1, p2, p3, p4) { return 0; /* load PCX resource — no-op */ }
export function FUN_005bec8c(p1, p2, p3, p4) { /* load PCX file — no-op */ }
export function FUN_005bf04a() { FUN_005d7c6e(); }
export function FUN_005bf060() { /* SEH restore — no-op */ }
// Source: decompiled/block_005B0000.c FUN_005bf071 (1353 bytes)
export function FUN_005bf071(param_1, param_2, param_3, param_4) {
  let iVar1;
  let uVar2, uVar3;
  let local_cc, local_c8, local_c4;
  let local_28, local_24;
  let local_20, local_1c, local_18, local_14;

  // DEVIATION: SEH (FS_OFFSET)
  FUN_005d7c00(); // DEVIATION: MFC — lock critical section
  iVar1 = Realloc(param_1); // DEVIATION: Win32 — find GIF resource
  if (iVar1 === 0) {
    // FUN_005bf5ba(); FUN_005bf5d0(); // DEVIATION: cleanup
    return;
  }
  uVar2 = FUN_00492a80(); // DEVIATION: get resource size
  local_cc = FUN_005dce4f(uVar2); // DEVIATION: Win32 — GlobalAlloc
  // FUN_00407ff0(); // DEVIATION: MFC — message pump
  if (local_cc === 0) { return; }
  local_c8 = FUN_005dcdf9(local_cc); // DEVIATION: Win32 — GlobalLock
  uVar2 = FUN_00492a80(); // DEVIATION: get resource size
  FUN_004bb370(local_c8, uVar2); // DEVIATION: copy resource data
  local_c8 = FUN_005dce29(local_cc); // DEVIATION: Win32 — GlobalUnlock
  if (local_cc === 0) {
    FUN_005d237d("Error: GIF resource not found.", param_1);
    FUN_005dae6b(3, "ERR_RESOURCENOTFOUND", "Port.cpp", 0x382);
    return;
  }
  local_20 = FUN_005dcdf9(local_cc); // DEVIATION: Win32 — GlobalLock (get data ptr)
  // Validate GIF header
  iVar1 = _strncmp(local_20, "GIF", 3);
  if (iVar1 !== 0) {
    FUN_005d237d("Error: Resource is not a GIF.", param_1);
    FUN_005dce29(local_cc); FUN_005dce96(local_cc); // DEVIATION: unlock + free
    FUN_005dae6b(4, "ERR_BADPICFORMAT", "Port.cpp", 0x38d);
    return;
  }
  // Check for global color table
  if ((local_20[10] & 0x80) === 0) {
    FUN_005d237d("Error: GIF contains no global color table.", param_1);
    FUN_005dce29(local_cc); FUN_005dce96(local_cc);
    FUN_005dae6b(4, "ERR_BADPICFORMAT", "Port.cpp", 0x396);
    return;
  }
  // Read color table
  uVar3 = 1 << ((local_20[10] & 7) + 1); // number of colors
  local_1c = local_20 + 0xd; // color table start (after 13-byte header)
  if (param_4 !== 0) {
    if (0x100 < param_3 + param_2) { param_3 = 0x100 - param_2; }
    if (uVar3 <= param_3) { param_3 = uVar3; }
    FUN_005c6da8(param_2, param_3, local_1c); // DEVIATION: set palette entries
  }
  // Skip to image data
  local_1c = local_20 + uVar3 * 3 + 0xd;
  while (local_1c[0] === 0) { local_1c = local_1c + 1; } // skip zero bytes
  if (local_1c[0] !== 0x2c && local_1c[0] !== 0x21) { // ',' = image block, '!' = extension
    FUN_005d237d("Error: GIF Image Block not found.", param_1);
    FUN_005dce29(local_cc); FUN_005dce96(local_cc);
    FUN_005dae6b(4, "ERR_BADPICFORMAT", "Port.cpp", 0x3b3);
    return;
  }
  // Parse image descriptor
  local_18 = local_1c + 1;
  local_28 = FUN_005c54d0(local_1c[5] | (local_1c[6] << 8)); // image width
  local_c4 = FUN_005c54d0(local_18[6] | (local_18[7] << 8)); // image height
  if ((local_18[8] & 0x80) !== 0) {
    debug_log("Warning: Skipping local color table");
  }
  // SetRect(&local_dc, 0, 0, local_28, local_c4); // DEVIATION: Win32
  iVar1 = FUN_005c019d(0 /*&local_dc*/); // DEVIATION: create bitmap surface
  if (iVar1 === 0) {
    FUN_005dce29(local_cc); FUN_005dce96(local_cc);
    return;
  }
  // Decompress LZW image data
  local_24 = local_18[9]; // minimum code size
  local_14 = local_18 + 10; // start of LZW data
  // FUN_005e4d60(local_14, param_2, local_24, 0, local_28, local_c4, 0); // DEVIATION: LZW decompress
  FUN_005c0cc5(param_4); // DEVIATION: set palette
  // iVar1 = FUN_005e395a(0); // DEVIATION: finalize bitmap
  // if (iVar1 === 0) { FUN_005e3988(0); } // DEVIATION: cleanup
  FUN_005dce29(local_cc); FUN_005dce96(local_cc); // DEVIATION: unlock + free
  // FUN_00421c30(); // DEVIATION: MFC — update display
  // DEVIATION: SEH cleanup
  // FUN_005bf5ba(); FUN_005bf5d0();
}
export function FUN_005bf5ba() { FUN_005d7c6e(); }
export function FUN_005bf5d0() { /* SEH restore — no-op */ }
export function FUN_005bf5e1(p1, p2, p3, p4) { return 0; /* load GIF resource — no-op */ }
export function FUN_005bf930(p1, p2, p3, p4) { return 0; /* load CvPic resource — no-op */ }
export function FUN_005bfad9(p1, p2, p3, p4) { return 0; /* load BMP resource — no-op */ }
export function FUN_005bfcff(p1, p2, p3, p4) { /* load BMP file — no-op */ }
export function FUN_005c000d() { FUN_005d7c6e(); }
export function FUN_005c0023() { /* SEH restore — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
//
// Functions called from other blocks that are not yet transpiled.
// These are no-ops or return sensible defaults.
// ═══════════════════════════════════════════════════════════════════

function FUN_00418d60() { return 0; }
function FUN_0043c5f0() {}
function FUN_0040f380() {}
function FUN_005af4ae() { return 0; }
function FUN_00418d90(a) {}
function FUN_005af343() {}
function FUN_005af682() {}
function FUN_0059d3c9(a) {}
function FUN_004190d0(a, b) {}
function FUN_00418770() { return 0; }
function SetFocus(a) {}
function FUN_00417fa0() {}
function FUN_004183d0() {}
function FUN_005c656b() {}
function FUN_005dae6b(a, b, c, d) {}
function FUN_005d2279(a, b) {}
function FUN_004bd9f0(a, b) { return 0; }
function FUN_00453e51(a, b) { return 0; }
function FUN_00421f40() { return 1; }  // Return 1 = "is server"
function FUN_004b0b53(a, b, c, d, e) {}
function XD_FlushSendBuffer(a) {}
function FUN_0046b14d(a, b, c, d, e, f, g, h, i, j) {}
function FUN_00421bb0() { return Date.now(); }
function FUN_0047e94e(a, b) {}
function FUN_004274a6(a, b) {}
function FUN_0043d07a(a, b, c, d, e) { return -1; }
function FUN_005ae31d(a, b, c, d) { return Math.abs(a - c) + Math.abs(b - d); }
function FUN_005ae3bf(a, b, c) {}
function FUN_0043cf76(a, b) { return -1; }
function FUN_0047cea6(a, b, c) {}
function FUN_0047ce1e(a, b, c, d, e) {}
function FUN_0056baff(a, b, c, d, e, f, g) {}
function FUN_0059df8a() {}
function FUN_005cde4d() {}
function FUN_005d7c6e() {}
function kill_civ(a, b) {} // kill_civ
function FUN_00410030(a, b, c) {} // show message box
function FUN_00490530(a, b, c) {} // tutorial popup
function _rand() { return (Math.random() * 0x7FFF) | 0; }
function debug_log(a) {}
