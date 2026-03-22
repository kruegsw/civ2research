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
let DAT_006ad8d8_dup = 0;   // (alias for re-entrancy guard)
let DAT_006ad699 = 0;       // AI processing flag
let DAT_006ad69a = 0;       // map batch update flag
let DAT_006ad2f7 = 0;       // server flag
let DAT_006365f4 = 0;       // map batch counter
let DAT_006d1164 = 0;       // total tile count (mapW/2 * mapH)
let DAT_006d116a = 0;       // map chunk width
let DAT_006d116c = 0;       // map chunk height
let DAT_006d1168 = 0;       // resource seed
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
let DAT_006365c0 = [];      // vis layer pointers array
let DAT_006365f8 = [5, 4, 5, 4, 4, 4, 4, 6]; // batch param counts per type
let DAT_006d1188 = 0;       // dummy tile data
let DAT_006d1190 = 0;       // map batch buffer base
let DAT_006d1db8 = [];      // window stack array

// String constants (stubbed)
let s_DEBUG_006359dc = 'DEBUG';
let s_NOTICE_00635fd8 = 'NOTICE';
let s_EDITORSA_GIF_00635fe4 = 'EDITORSA.GIF';
let DAT_00635fe0 = 0;
let DAT_00635df8 = [];
let DAT_00635dfc = [];
let DAT_00635e00 = 0;
let DAT_00635e04 = 0;
let DAT_00635e08 = 0;
let DAT_00635e0c = 0;
let DAT_00635e10 = 0;
let DAT_00635e14 = 0;
let DAT_00635e18 = 0;
let DAT_00635e20 = 0;
let DAT_00635e24 = 0;
let DAT_00635e28 = 0;
let DAT_00635e2c = 0;
let DAT_00635e30 = 0;
let DAT_00635e34 = 0;
let DAT_00635e38 = 0;
let DAT_00635e3c = 0;
let DAT_00635e40 = 0;
let DAT_00635e44 = 0;
let DAT_00635e48 = 0;
let DAT_00635e4c = 0;
let DAT_00635e50 = 0;
let DAT_00635e54 = 0;
let DAT_00635e58 = 0;
let DAT_00635e5c = 0;
let DAT_00635e60 = [];
let DAT_00635e64 = [];
let DAT_00635ef0 = 0;
let DAT_00635f00 = 0;
let DAT_00641848 = [];
let DAT_00679640 = 0;
let DAT_0064b1b4 = 0;
let DAT_0064b1b0 = 0;
let DAT_006560f6 = [];  // unit type array (byte per unit, stride 0x20)
let DAT_006560f7 = [];  // unit owner array
let DAT_006560f2 = [];  // unit Y array (short)
let DAT_006560f4 = [];  // unit flags array (short)
let DAT_006560f8 = [];  // unit damage taken
let DAT_006560f9 = [];  // unit seen-by bitmask
let DAT_006560fa = [];  // unit fuel used
let DAT_006560fb = [];  // unit vet/escort byte
let DAT_006560fc = [];  // unit status byte
let DAT_006560fd = [];  // unit commodity/route
let DAT_006560fe = [];  // unit goto turns
let DAT_006560ff = [];  // unit orders byte
let DAT_00656100 = [];  // unit home city
let DAT_00656102 = [];  // unit goto target (short)
let DAT_00656104 = [];  // unit goto target Y (short)
let DAT_00656106 = [];  // unit stack prev link (short)
let DAT_00656108 = [];  // unit stack next link (short)
let DAT_0065610a = [];  // unit serial number (int)
let DAT_0064b1b8 = [];  // unit type name string ptr
let DAT_0064b1c1 = [];  // unit type domain
let DAT_0064b1c2 = [];  // unit type move rate
let DAT_0064b1c3 = [];  // unit type range
let DAT_0064b1c4 = [];  // unit type attack
let DAT_0064b1c5 = [];  // unit type defense
let DAT_0064b1c6 = [];  // unit type hit points
let DAT_0064b1c8 = [];  // unit type shield cost
let DAT_0064b1c9 = [];  // unit type carry capacity
let DAT_0064b1ca = [];  // unit type role
let DAT_0064b1bd = [];  // unit type flagsB
let DAT_0064b9e8 = [];  // civ total unit count (int per civ)
let DAT_0064c6c0 = [];  // diplomacy table
let DAT_0064c706 = [];  // civ support units count (short)
let DAT_0064c708 = [];  // civ city count (short)
let DAT_0064c778 = [];  // civ per-type unit count
let DAT_0064ca32 = [];  // city improvements
let DAT_0064f348 = [];  // city owner byte
let DAT_0064f349 = [];  // city shields stored
let DAT_0064f360 = [];  // city name strings
let DAT_0064b168 = [];  // commodity name ptrs
let DAT_00627684 = [];  // terrain type data
let DAT_00655b0b = 0;   // human civ bitmask
let DAT_00666137 = [];  // tech known bitmask table
let DAT_006c90e0_val = 0;
let DAT_0064c6b5 = [];  // civ tech count
let DAT_00627cc0 = [];  // terrain improvement data
let PTR_s_TUTORIAL_00627678 = 0;

// ═══════════════════════════════════════════════════════════════════
// FUN_005b02a5 — editor_set_scroll_mode (UI)
// Source: block_005B0000.c line 10
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b02a5() {
  let iVar1;

  iVar1 = FUN_00418d60();
  if (iVar1 === 0) {
    FUN_0043c5f0();
    FUN_0043c5f0();
  }
  else if (iVar1 === 1) {
    FUN_0043c5f0();
    FUN_0040f380();
  }
  else if (iVar1 === 2) {
    FUN_0040f380();
    FUN_0043c5f0();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b0373 — editor_command_handler (UI)
// Source: block_005B0000.c line 38
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b0373(param_1) {
  let iVar1;
  let local_8;

  if (param_1 === 0xc9) {
    iVar1 = FUN_005af4ae();
    if (iVar1 === 0) {
      let uVar2 = FUN_00418d60();
      // *(DAT_006a4f88 + 0x2ec) = uVar2  — skipped (UI struct write)
      FUN_005af343();
      FUN_005b02a5();
      FUN_005af682();
    }
    else {
      FUN_00418d90(0); // stub
      FUN_005af343();
      FUN_005af682();
      if (DAT_006a4f88 === 0) {
        local_8 = 0;
      }
      else {
        local_8 = DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_8);
      FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00635fd8);
      FUN_0059d3c9(0);
      let hWnd = FUN_00418770();
      SetFocus(hWnd);
    }
  }
  else if (param_1 === 0xcd) {
    FUN_005b02a5();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b0473 — editor_create_controls (UI)
// Source: block_005B0000.c line 85
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b0473(param_1) {
  // Entirely UI — creates editor dropdown/listbox controls
  // Stubbed: no game logic
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b08e8 — editor_create_button (UI)
// Source: block_005B0000.c line 170
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b08e8(param_1) {
  // UI button creation — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b09dc — editor_paint (UI)
// Source: block_005B0000.c line 204
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b09dc() {
  // UI paint handler — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1037 — editor_dialog_init (UI)
// Source: block_005B0000.c line 315
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1037() {
  // Editor dialog initialization — entirely UI
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a05 — editor_cleanup_1 (FW)
// Source: block_005B0000.c line 526
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a05() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a1b — editor_seh_restore (FW)
// Source: block_005B0000.c line 540
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a1b() {
  // SEH chain restore — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a29 — editor_open (UI)
// Source: block_005B0000.c line 557
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
// Source: block_005B0000.c line 586
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a82() {
  FUN_004183d0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1a98 — editor_seh_restore_2 (FW)
// Source: block_005B0000.c line 600
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1a98() {
  // SEH chain restore — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2590 — validate_unit_stack (GL)
// Source: block_005B0000.c line 617
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
      sVar1 = s8(DAT_00656108[param_1 * 0x20]) | (DAT_00656108[param_1 * 0x20 + 1] << 8);
      if (sVar1 & 0x8000) sVar1 |= 0xFFFF0000;
      do {
        local_24 = sVar1 & 0xFFFF;
        if (local_24 & 0x8000) local_24 = local_24 | 0xFFFF0000;
        local_24 = (local_24 << 16 >> 16); // sign extend
        if (local_14 < 0) break;
        let x = s8(DAT_006560f0[local_14 * 0x20]) | (DAT_006560f0[local_14 * 0x20 + 1] << 8);
        if (x & 0x8000) x |= 0xFFFF0000;
        let y = s8(DAT_006560f2[local_14 * 0x20]) | (DAT_006560f2[local_14 * 0x20 + 1] << 8);
        if (y & 0x8000) y |= 0xFFFF0000;
        pick_up_unit_005b319e(local_14, 0);
        FUN_005b345f(local_14, x, y, 0);
        local_14 = local_24;
        sVar1 = s8(DAT_00656108[local_24 * 0x20]) | (DAT_00656108[local_24 * 0x20 + 1] << 8);
        if (sVar1 & 0x8000) sVar1 |= 0xFFFF0000;
      } while (local_24 !== param_1);
    }
    // Validate prev-links for dead units
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let prevLink = s8(DAT_00656106[local_24 * 0x20]) | (DAT_00656106[local_24 * 0x20 + 1] << 8);
      if (prevLink & 0x8000) prevLink |= 0xFFFF0000;
      if (prevLink < 0) break;
      iVar3 = prevLink;
      let serial = DAT_0065610a[prevLink * 0x20] | (DAT_0065610a[prevLink * 0x20 + 1] << 8) |
                   (DAT_0065610a[prevLink * 0x20 + 2] << 16) | (DAT_0065610a[prevLink * 0x20 + 3] << 24);
      if (serial === 0) {
        FUN_005d2279('Dead unit in unit stack (id = %d)', local_24);
        local_8 = 0;
        DAT_00656106[local_24 * 0x20] = 0xff;
        DAT_00656106[local_24 * 0x20 + 1] = 0xff;
        let nextOfPrev = s8(DAT_00656108[iVar3 * 0x20]) | (DAT_00656108[iVar3 * 0x20 + 1] << 8);
        if (nextOfPrev & 0x8000) nextOfPrev |= 0xFFFF0000;
        if (nextOfPrev === local_24) {
          DAT_00656108[iVar3 * 0x20] = 0xff;
          DAT_00656108[iVar3 * 0x20 + 1] = 0xff;
        }
      }
    }
    // Validate next-links for dead units
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let nextLink = s8(DAT_00656108[local_24 * 0x20]) | (DAT_00656108[local_24 * 0x20 + 1] << 8);
      if (nextLink & 0x8000) nextLink |= 0xFFFF0000;
      if (nextLink < 0) break;
      iVar3 = nextLink;
      let serial = DAT_0065610a[local_24 * 0x20] | (DAT_0065610a[local_24 * 0x20 + 1] << 8) |
                   (DAT_0065610a[local_24 * 0x20 + 2] << 16) | (DAT_0065610a[local_24 * 0x20 + 3] << 24);
      if (serial === 0) {
        FUN_005d2279('Dead unit in unit stack (id = %d)', local_24);
        local_8 = 0;
        DAT_00656108[local_24 * 0x20] = 0xff;
        DAT_00656108[local_24 * 0x20 + 1] = 0xff;
        let prevOfNext = s8(DAT_00656106[iVar3 * 0x20]) | (DAT_00656106[iVar3 * 0x20 + 1] << 8);
        if (prevOfNext & 0x8000) prevOfNext |= 0xFFFF0000;
        if (prevOfNext === local_24) {
          DAT_00656106[iVar3 * 0x20] = 0xff;
          DAT_00656106[iVar3 * 0x20 + 1] = 0xff;
        }
      }
    }
    // Validate prev-link location consistency
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let prevLink = s8(DAT_00656106[local_24 * 0x20]) | (DAT_00656106[local_24 * 0x20 + 1] << 8);
      if (prevLink & 0x8000) prevLink |= 0xFFFF0000;
      if (prevLink < 0) break;
      iVar3 = prevLink;
      // Check x/y match between linked units
      // (simplified — original does short reads and compares)
    }
    // Validate next-link location consistency (similar pattern)
  }
  else {
    local_8 = 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b29aa — get_unit_type_hit_points (GL)
// Source: block_005B0000.c line 722
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b29aa(param_1) {
  return s8(DAT_0064b1c6[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b29d7 — get_unit_remaining_moves (GL)
// Source: block_005B0000.c line 735
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b29d7(param_1) {
  let iVar1;

  if ((DAT_00655ae8 & 0x10) === 0) {
    DAT_006560fa[param_1 * 0x20] = 0;
  }
  iVar1 = FUN_005b29aa(param_1);
  iVar1 = iVar1 - u8(DAT_006560fa[param_1 * 0x20]);
  if (iVar1 < 1) {
    iVar1 = 0;
  }
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2a39 — get_unit_move_cost (GL)
// Source: block_005B0000.c line 758
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2a39(param_1) {
  let iVar1, iVar2;
  let uVar3;
  let local_14;
  let local_10;

  local_10 = s8(DAT_0064b1c2[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]);
  if (local_10 === 0) {
    uVar3 = 0;
  }
  else {
    if (DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x02) {
      iVar1 = s8(DAT_006560f7[param_1 * 0x20]);
      iVar2 = FUN_004bd9f0(iVar1, 0x3b);
      if (iVar2 !== 0) {
        local_10 = local_10 + DAT_0064bcc8;
      }
      iVar2 = FUN_00453e51(iVar1, 0xc);
      if (iVar2 !== 0) {
        local_10 = local_10 + DAT_0064bcc8 * 2;
      }
      iVar1 = FUN_00453e51(iVar1, 3);
      if (iVar1 !== 0 && (DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x20) === 0) {
        local_10 = local_10 + DAT_0064bcc8;
      }
    }
    uVar3 = local_10;
    if (DAT_006560fa[param_1 * 0x20] !== 0 && (DAT_00655ae8 & 0x10) !== 0 &&
        DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0x01) {
      iVar1 = FUN_005b29aa(param_1);
      if (iVar1 < 2) {
        iVar1 = 1;
      }
      iVar2 = FUN_005b29d7(param_1);
      local_10 = Math.trunc(iVar2 * local_10 / iVar1);
      if (local_10 % DAT_0064bcc8 !== 0) {
        local_10 = local_10 + (DAT_0064bcc8 - local_10 % DAT_0064bcc8);
      }
      if (DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x02) {
        local_14 = DAT_0064bcc8 * 2;
      }
      else {
        local_14 = DAT_0064bcc8;
      }
      uVar3 = local_14;
      if (local_14 <= local_10) {
        uVar3 = local_10;
      }
    }
  }
  return uVar3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2c3d — get_unit_moves_remaining (GL)
// Source: block_005B0000.c line 822
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2c3d(param_1) {
  let iVar1;

  iVar1 = FUN_005b2a39(param_1);
  iVar1 = iVar1 - u8(DAT_006560f8[param_1 * 0x20]);
  if (iVar1 < 1) {
    iVar1 = 0;
  }
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2c82 — get_next_unit_in_stack (GL)
// Source: block_005B0000.c line 842
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2c82(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    let nextLink = s8(DAT_00656108[param_1 * 0x20]) | (DAT_00656108[param_1 * 0x20 + 1] << 8);
    if (nextLink & 0x8000) nextLink |= 0xFFFF0000;
    param_1 = nextLink;
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2cc3 — get_last_unit_in_stack (GL)
// Source: block_005B0000.c line 859
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2cc3(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    let nextLink = s8(DAT_00656108[param_1 * 0x20]) | (DAT_00656108[param_1 * 0x20 + 1] << 8);
    if (nextLink & 0x8000) nextLink |= 0xFFFF0000;
    while (-1 < nextLink && nextLink !== param_1) {
      param_1 = nextLink;
      nextLink = s8(DAT_00656108[param_1 * 0x20]) | (DAT_00656108[param_1 * 0x20 + 1] << 8);
      if (nextLink & 0x8000) nextLink |= 0xFFFF0000;
    }
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2d39 — get_first_unit_in_stack (GL)
// Source: block_005B0000.c line 879
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2d39(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    let prevLink = s8(DAT_00656106[param_1 * 0x20]) | (DAT_00656106[param_1 * 0x20 + 1] << 8);
    if (prevLink & 0x8000) prevLink |= 0xFFFF0000;
    while (-1 < prevLink && prevLink !== param_1) {
      param_1 = prevLink;
      prevLink = s8(DAT_00656106[param_1 * 0x20]) | (DAT_00656106[param_1 * 0x20 + 1] << 8);
      if (prevLink & 0x8000) prevLink |= 0xFFFF0000;
    }
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2daf — find_first_unit_at_xy_for_civ (GL)
// Source: block_005B0000.c line 899
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2daf(param_1, param_2, param_3) {
  let uVar1;
  let local_c;
  let local_8;

  local_8 = -1;
  for (local_c = 0; local_8 < 0 && local_c < DAT_00655b16; local_c = local_c + 1) {
    let serial = DAT_0065610a[local_c * 0x20] | (DAT_0065610a[local_c * 0x20 + 1] << 8) |
                 (DAT_0065610a[local_c * 0x20 + 2] << 16) | (DAT_0065610a[local_c * 0x20 + 3] << 24);
    if (serial !== 0) {
      let ux = s8(DAT_006560f0[local_c * 0x20]) | (DAT_006560f0[local_c * 0x20 + 1] << 8);
      if (ux & 0x8000) ux |= 0xFFFF0000;
      let uy = s8(DAT_006560f2[local_c * 0x20]) | (DAT_006560f2[local_c * 0x20 + 1] << 8);
      if (uy & 0x8000) uy |= 0xFFFF0000;
      if (ux === param_2 && uy === param_3 && s8(DAT_006560f7[local_c * 0x20]) === param_1) {
        local_8 = local_c;
      }
    }
  }
  uVar1 = FUN_005b2d39(local_8);
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2e69 — find_first_unit_at_xy (GL)
// Source: block_005B0000.c line 926
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2e69(param_1, param_2) {
  let iVar1;
  let uVar2;
  let local_c;
  let local_8;

  local_8 = -1;
  if (DAT_00636058 === 0 || (iVar1 = FUN_005b8d62(param_1, param_2), -1 < iVar1)) {
    for (local_c = 0; local_8 < 0 && local_c < DAT_00655b16; local_c = local_c + 1) {
      let serial = DAT_0065610a[local_c * 0x20] | (DAT_0065610a[local_c * 0x20 + 1] << 8) |
                   (DAT_0065610a[local_c * 0x20 + 2] << 16) | (DAT_0065610a[local_c * 0x20 + 3] << 24);
      if (serial !== 0) {
        let ux = s8(DAT_006560f0[local_c * 0x20]) | (DAT_006560f0[local_c * 0x20 + 1] << 8);
        if (ux & 0x8000) ux |= 0xFFFF0000;
        let uy = s8(DAT_006560f2[local_c * 0x20]) | (DAT_006560f2[local_c * 0x20 + 1] << 8);
        if (uy & 0x8000) uy |= 0xFFFF0000;
        if (ux === param_1 && uy === param_2) {
          local_8 = local_c;
        }
      }
    }
    if (-1 < local_8) {
      FUN_005b2590(local_8);
    }
    uVar2 = FUN_005b2d39(local_8);
  }
  else {
    uVar2 = 0xffffffff;
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2f50 — set_unit_order_sentry (GL)
// Source: block_005B0000.c line 961
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2f50(param_1) {
  if (DAT_006560ff[param_1 * 0x20] !== 0x03) {
    DAT_00656102[param_1 * 0x20] = 0xff;
    DAT_00656102[param_1 * 0x20 + 1] = 0xff;
  }
  DAT_006560ff[param_1 * 0x20] = 3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2f92 — get_nth_unit_in_stack (GL)
// Source: block_005B0000.c line 978
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2f92(param_1, param_2) {
  let local_c;
  let local_8;

  local_8 = -1;
  local_c = -1;
  for (param_1 = FUN_005b2d39(param_1); local_c < 0 && -1 < param_1;
      param_1 = FUN_005b2c82(param_1)) {
    local_8 = local_8 + 1;
    if (local_8 === param_2) {
      local_c = param_1;
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3007 — count_units_prev_chain (GL)
// Source: block_005B0000.c line 1003
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3007(param_1) {
  let local_8;

  local_8 = -1;
  while (-1 < param_1) {
    local_8 = local_8 + 1;
    let prevLink = s8(DAT_00656106[param_1 * 0x20]) | (DAT_00656106[param_1 * 0x20 + 1] << 8);
    if (prevLink & 0x8000) prevLink |= 0xFFFF0000;
    param_1 = prevLink;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3046 — find_nth_unit_of_role (GL)
// Source: block_005B0000.c line 1022
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3046(param_1, param_2, param_3) {
  let local_10;
  let local_c;
  let local_8;

  local_8 = -1;
  local_c = -1;
  for (local_10 = FUN_005b2d39(param_1); local_c < 0 && -1 < local_10;
      local_10 = FUN_005b2c82(local_10)) {
    if (DAT_0064b1ca[u8(DAT_006560f6[local_10 * 0x20]) * 0x14] === param_3) {
      local_8 = local_8 + 1;
      if (local_8 === param_2) {
        local_c = local_10;
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b30e9 — count_units_in_stack (GL)
// Source: block_005B0000.c line 1048
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b30e9(param_1) {
  let local_8;

  local_8 = 0;
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    local_8 = local_8 + 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3136 — count_units_of_type_in_stack (GL)
// Source: block_005B0000.c line 1067
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3136(param_1, param_2) {
  let local_8;

  local_8 = 0;
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    if (DAT_006560f6[param_1 * 0x20] === param_2) {
      local_8 = local_8 + 1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// pick_up_unit_005b319e — remove unit from map stack (GL)
// Source: block_005B0000.c line 1088
// ═══════════════════════════════════════════════════════════════════

export function pick_up_unit_005b319e(param_1, param_2) {
  // Complex function: removes unit from its tile stack, updates linked list
  // Involves multiplayer sync — client/server path
  DAT_006ad8d8 = 1;
  // Simplified stub — full implementation requires all unit/tile array access
  DAT_006ad8d8 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b345f — put_down_unit_at (GL)
// Source: block_005B0000.c line 1155
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b345f(param_1, param_2, param_3, param_4) {
  // Places unit at x,y coordinates, updating stack links and tile data
  DAT_006ad8dc = 1;
  // Stub
  DAT_006ad8dc = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b36df — relocate_unit (GL)
// Source: block_005B0000.c line 1220
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b36df(param_1, param_2, param_3, param_4) {
  DAT_006ad8e4 = 1;
  if (DAT_00655b02 < 3) {
    pick_up_unit_005b319e(param_1, 0);
    FUN_005b345f(param_1, param_2, param_3, 0);
    if (2 < DAT_00655b02 && param_4 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8e4 = 0;
  }
  else {
    DAT_006ad8e4 = 0;
    // Multiplayer path — stubbed
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3863 — restack_unit_at_current_pos (GL)
// Source: block_005B0000.c line 1264
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3863(param_1, param_2) {
  let ux = s8(DAT_006560f0[param_1 * 0x20]) | (DAT_006560f0[param_1 * 0x20 + 1] << 8);
  if (ux & 0x8000) ux |= 0xFFFF0000;
  let uy = s8(DAT_006560f2[param_1 * 0x20]) | (DAT_006560f2[param_1 * 0x20 + 1] << 8);
  if (uy & 0x8000) uy |= 0xFFFF0000;
  FUN_005b36df(param_1, ux, uy, param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b389f — move_unit_to_bottom_of_stack (GL)
// Source: block_005B0000.c line 1279
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b389f(param_1, param_2) {
  // Moves unit to bottom of stack — complex linked list manipulation
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3ae0 — relocate_all_units_in_stack (GL)
// Source: block_005B0000.c line 1341
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3ae0(param_1, param_2, param_3, param_4) {
  let iVar1;
  let local_8;

  local_8 = FUN_005b2d39(param_1);
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
// Source: block_005B0000.c line 1367
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3b78(param_1, param_2) {
  // Unloads sea units from stack — complex logic
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3cd4 — unload_and_get_first (GL)
// Source: block_005B0000.c line 1407
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3cd4(param_1, param_2) {
  FUN_005b3b78(param_1, param_2);
  return FUN_005b2d39(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3d06 — create_unit (GL)
// Source: block_005B0000.c line 1424
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3d06(param_1, param_2, param_3, param_4) {
  // Creates a new unit — complex function with multiplayer sync
  // Stubbed — returns -1 (failure)
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4391 — delete_unit (GL)
// Source: block_005B0000.c line 1562
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4391(param_1, param_2) {
  // Deletes a unit — complex with civ bookkeeping
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b47fa — delete_all_units_in_stack (GL)
// Source: block_005B0000.c line 1659
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
// FUN_005b488a — clear_unit_seen_by (GL)
// Source: block_005B0000.c line 1684
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b488a(param_1) {
  if (-1 < param_1) {
    DAT_006560f9[param_1 * 0x20] = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b48b1 — clear_seen_by_for_stack (GL)
// Source: block_005B0000.c line 1700
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b48b1(param_1) {
  let iVar1;

  for (iVar1 = FUN_005b2d39(param_1); -1 < iVar1; iVar1 = FUN_005b2c82(iVar1)) {
    FUN_005b488a(iVar1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b490e — mark_unit_seen_by_civ (GL)
// Source: block_005B0000.c line 1718
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b490e(param_1, param_2) {
  if (-1 < param_2 && s8(DAT_006560f7[param_1 * 0x20]) !== param_2 && -1 < param_1) {
    DAT_006560f9[param_1 * 0x20] =
         DAT_006560f9[param_1 * 0x20] | (1 << (param_2 & 0x1f));
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b496e — mark_stack_seen_by_civ (GL)
// Source: block_005B0000.c line 1735
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b496e(param_1, param_2) {
  let iVar1;

  for (iVar1 = FUN_005b2d39(param_1); -1 < iVar1; iVar1 = FUN_005b2c82(iVar1)) {
    FUN_005b490e(iVar1, param_2);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b49cf — check_nearby_enemy (GL)
// Source: block_005B0000.c line 1753
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
  for (local_8 = 0; DAT_006ced4c < 0 && local_8 < 8; local_8 = local_8 + 1) {
    uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
    iVar3 = s8(DAT_00628360[local_8]) + param_2;
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if (iVar4 !== 0) {
      if (iVar1 < 0) {
        local_c = FUN_005b89e4(uVar2, iVar3);
      }
      else {
        local_c = local_1c;
      }
      local_20 = FUN_005b8ca6(uVar2, iVar3);
      if (local_20 < 0) {
        local_20 = FUN_005b8d62(uVar2, iVar3);
      }
      else {
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
// FUN_005b4b66 — check_nearby_enemy_simple (GL)
// Source: block_005B0000.c line 1802
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4b66(param_1, param_2, param_3) {
  let uVar2;
  let iVar3;
  let local_8;

  DAT_006ced4c = -1;
  for (local_8 = 0; DAT_006ced4c < 0 && local_8 < 8; local_8 = local_8 + 1) {
    uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
    let cVar1 = s8(DAT_00628360[local_8]);
    iVar3 = FUN_004087c0(uVar2, cVar1 + param_2);
    if (iVar3 !== 0) {
      iVar3 = FUN_005b8d62(uVar2, cVar1 + param_2);
      if (-1 < iVar3 && param_3 !== iVar3 &&
         (DAT_0064c6c0[param_3 * 0x594 + iVar3 * 4] & 8) === 0) {
        DAT_006ced4c = iVar3;
      }
    }
  }
  return -1 < DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4c63 — check_nearby_enemy_same_continent (GL)
// Source: block_005B0000.c line 1831
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4c63(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3, iVar4;
  let local_8;

  DAT_006ced4c = -1;
  iVar1 = FUN_005b89e4(param_1, param_2);
  for (local_8 = 0; DAT_006ced4c < 0 && local_8 < 8; local_8 = local_8 + 1) {
    uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
    iVar3 = s8(DAT_00628360[local_8]) + param_2;
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if (iVar4 !== 0) {
      iVar4 = FUN_005b8d62(uVar2, iVar3);
      if (-1 < iVar4 && iVar4 !== param_3) {
        iVar3 = FUN_005b89e4(uVar2, iVar3);
        if (iVar3 === iVar1 && (DAT_0064c6c0[iVar4 * 4 + param_3 * 0x594] & 8) === 0) {
          DAT_006ced4c = iVar4;
        }
      }
    }
  }
  return -1 < DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4d8c — check_unclaimed_tile_contested (GL)
// Source: block_005B0000.c line 1863
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4d8c(param_1, param_2, param_3) {
  let iVar1;
  let local_8;

  local_8 = 0;
  DAT_006ced4c = 0xffffffff;
  iVar1 = FUN_005b8ca6(param_1, param_2);
  if (iVar1 < 0) {
    local_8 = FUN_005b4c63(param_1, param_2, param_3);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4de2 — is_civ_adjacent (GL)
// Source: block_005B0000.c line 1885
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4de2(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3;
  let bVar4;
  let local_8;

  bVar4 = false;
  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 !== 0) {
    for (local_8 = 0; bVar4 === false && local_8 < 8; local_8 = local_8 + 1) {
      uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
      iVar1 = s8(DAT_00628360[local_8]) + param_2;
      iVar3 = FUN_004087c0(uVar2, iVar1);
      if (iVar3 !== 0) {
        iVar3 = FUN_005b8d62(uVar2, iVar1);
        bVar4 = iVar3 === param_3;
        iVar1 = FUN_005b8ca6(uVar2, iVar1);
        if (iVar1 === param_3) {
          bVar4 = true;
        }
      }
    }
  }
  return bVar4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4ee2 — set_seen_by_bitmask_for_stack (GL)
// Source: block_005B0000.c line 1921
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4ee2(param_1, param_2) {
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    DAT_006560f9[param_1 * 0x20] = DAT_006560f9[param_1 * 0x20] | param_2;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4f3c — get_civs_adjacent_mask (GL)
// Source: block_005B0000.c line 1937
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4f3c(param_1, param_2) {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  iVar1 = FUN_005b8a1d(param_1, param_2);
  if (-1 < iVar1) {
    local_8 = 1 << (iVar1 & 0x1f);
  }
  for (local_c = 1; local_c < 8; local_c = local_c + 1) {
    iVar1 = FUN_005b4de2(param_1, param_2, local_c);
    if (iVar1 !== 0) {
      local_8 = local_8 | (1 << (local_c & 0x1f));
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4fca — mark_adjacent_civs_seen (GL)
// Source: block_005B0000.c line 1966
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4fca(param_1) {
  let iVar1;
  let local_8;

  let ux = s8(DAT_006560f0[param_1 * 0x20]) | (DAT_006560f0[param_1 * 0x20 + 1] << 8);
  if (ux & 0x8000) ux |= 0xFFFF0000;
  let uy = s8(DAT_006560f2[param_1 * 0x20]) | (DAT_006560f2[param_1 * 0x20 + 1] << 8);
  if (uy & 0x8000) uy |= 0xFFFF0000;

  for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
    iVar1 = FUN_005b4de2(ux, uy, local_8);
    if (iVar1 !== 0) {
      FUN_005b496e(param_1, local_8);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b503b — stack_has_unit_type (GL)
// Source: block_005B0000.c line 1989
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b503b(param_1, param_2) {
  param_1 = FUN_005b2d39(param_1);
  while (true) {
    if (param_1 < 0) {
      return 0;
    }
    if (u8(DAT_006560f6[param_1 * 0x20]) === param_2) break;
    param_1 = FUN_005b2c82(param_1);
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b50ad — count_stack_property (GL)
// Source: block_005B0000.c line 2010
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b50ad(param_1, param_2) {
  let local_8;

  local_8 = 0;
  if (param_2 !== 0xb) {
    param_1 = FUN_005b2d39(param_1);
  }
  while (-1 < param_1 && local_8 < 0x800) {
    let unitType = u8(DAT_006560f6[param_1 * 0x20]);
    switch (param_2) {
    case 0:
      local_8 = local_8 + s8(DAT_0064b1c8[unitType * 0x14]);
      break;
    case 1:
      local_8 = local_8 + s8(DAT_0064b1c5[unitType * 0x14]);
      break;
    case 2:
    case 0xb:
      local_8 = local_8 + 1;
      break;
    case 3:
      local_8 = local_8 + s8(DAT_0064b1c4[unitType * 0x14]);
      break;
    case 4: {
      let prevLink = s8(DAT_00656106[param_1 * 0x20]) | (DAT_00656106[param_1 * 0x20 + 1] << 8);
      if (prevLink & 0x8000) prevLink |= 0xFFFF0000;
      if (-1 < prevLink && DAT_0064b1ca[unitType * 0x14] === 0x01) {
        local_8 = local_8 + 1;
      }
      break;
    }
    case 5:
      if (DAT_0064b1c1[unitType * 0x14] === 0x02) {
        local_8 = local_8 + 1;
      }
      break;
    case 6:
      if (DAT_0064b1c1[unitType * 0x14] === 0x02) {
        local_8 = local_8 + s8(DAT_0064b1c9[unitType * 0x14]);
      }
      else if (DAT_0064b1c1[unitType * 0x14] === 0x00) {
        local_8 = local_8 + -1;
      }
      break;
    case 7:
      if (DAT_0064b1c1[unitType * 0x14] === 0x01 &&
          0x01 < s8(DAT_0064b1c3[unitType * 0x14])) {
        local_8 = local_8 + 1;
      }
      break;
    case 8:
      if ((DAT_0064b1bd[unitType * 0x14] & 0x10) !== 0) {
        local_8 = local_8 + 1;
      }
      break;
    case 9:
      if ((DAT_0064b1bc[unitType * 0x14] & 0x80) !== 0) {
        local_8 = local_8 + 1;
      }
      break;
    case 10:
      if ((DAT_0064b1bc[unitType * 0x14] & 8) !== 0) {
        local_8 = local_8 + 1;
      }
      break;
    }
    if (param_2 === 0xb) {
      let nextLink = s8(DAT_00656108[param_1 * 0x20]) | (DAT_00656108[param_1 * 0x20 + 1] << 8);
      if (nextLink & 0x8000) nextLink |= 0xFFFF0000;
      param_1 = nextLink;
    }
    else {
      param_1 = FUN_005b2c82(param_1);
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b53b6 — count_units_of_role_in_stack (GL)
// Source: block_005B0000.c line 2092
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b53b6(param_1, param_2) {
  let local_8;

  local_8 = 0;
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    if (s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === param_2) {
      local_8 = local_8 + 1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b542e — stack_ship (GL)
// Source: block_005B0000.c line 2113
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b542e(param_1, param_2, param_3) {
  // Very complex function: loads units onto ships from a stack
  // Contains goto/labeled block pattern. Stubbed.
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b5bab — stack_unit (GL)
// Source: block_005B0000.c line 2302
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b5bab(param_1, param_2) {
  // Stacks a unit onto a ship or into sentry
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b5d93 — delete_unit_safely (GL)
// Source: block_005B0000.c line 2353
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b5d93(param_1, param_2) {
  // Deletes unit, unloading cargo first if needed
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6042 — delete_unit_visible (GL)
// Source: block_005B0000.c line 2425
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6042(param_1, param_2) {
  // Deletes unit and updates tile visibility
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b620a — unload_all_ships_in_stack (GL)
// Source: block_005B0000.c line 2475
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b620a(param_1, param_2) {
  // Unloads all ships and returns max capacity
  // Stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b62ee — set_order_for_stack (GL)
// Source: block_005B0000.c line 2507
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b62ee(param_1, param_2) {
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    DAT_006560ff[param_1 * 0x20] = param_2;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b633f — is_unit_needs_orders (GL)
// Source: block_005B0000.c line 2523
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b633f(param_1) {
  let iVar1;
  let local_8;

  local_8 = 0;
  if (-1 < param_1 && param_1 < DAT_00655b16) {
    let serial = DAT_0065610a[param_1 * 0x20] | (DAT_0065610a[param_1 * 0x20 + 1] << 8) |
                 (DAT_0065610a[param_1 * 0x20 + 2] << 16) | (DAT_0065610a[param_1 * 0x20 + 3] << 24);
    if (serial !== 0) {
      let ux = s8(DAT_006560f0[param_1 * 0x20]) | (DAT_006560f0[param_1 * 0x20 + 1] << 8);
      if (ux & 0x8000) ux |= 0xFFFF0000;
      let uy = s8(DAT_006560f2[param_1 * 0x20]) | (DAT_006560f2[param_1 * 0x20 + 1] << 8);
      if (uy & 0x8000) uy |= 0xFFFF0000;
      iVar1 = FUN_004087c0(ux, uy);
      if (iVar1 !== 0) {
        if (s8(DAT_006560f7[param_1 * 0x20]) === DAT_00655b05 &&
            DAT_006560ff[param_1 * 0x20] !== 0x03 &&
            DAT_006560ff[param_1 * 0x20] !== 0x02) {
          iVar1 = FUN_005b2c3d(param_1);
          let flags = (DAT_006560f4[param_1 * 0x20]) | (DAT_006560f4[param_1 * 0x20 + 1] << 8);
          if (iVar1 !== 0 && (flags & 2) === 0) {
            local_8 = 1;
          }
          else {
            local_8 = 0;
          }
        }
        else {
          local_8 = 0;
        }
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6458 — is_unit_can_move (GL)
// Source: block_005B0000.c line 2555
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6458(param_1) {
  let iVar1;
  let local_8;

  local_8 = 0;
  if (-1 < param_1 && param_1 < DAT_00655b16) {
    let serial = DAT_0065610a[param_1 * 0x20] | (DAT_0065610a[param_1 * 0x20 + 1] << 8) |
                 (DAT_0065610a[param_1 * 0x20 + 2] << 16) | (DAT_0065610a[param_1 * 0x20 + 3] << 24);
    if (serial !== 0) {
      let ux = s8(DAT_006560f0[param_1 * 0x20]) | (DAT_006560f0[param_1 * 0x20 + 1] << 8);
      if (ux & 0x8000) ux |= 0xFFFF0000;
      if (-1 < ux) {
        if (DAT_006560ff[param_1 * 0x20] === 0x03 ||
           (iVar1 = FUN_005b2c3d(param_1), iVar1 === 0)) {
          local_8 = 0;
        }
        else {
          local_8 = 1;
        }
      }
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6512 — find_next_active_unit (GL)
// Source: block_005B0000.c line 2583
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6512(param_1, param_2) {
  // Complex: finds next unit needing orders, cycling through all units
  // Stubbed
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6787 — refresh_unit_move_points (GL)
// Source: block_005B0000.c line 2651
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6787(param_1) {
  let uVar1;

  uVar1 = FUN_005b2a39(param_1);
  DAT_006560f8[param_1 * 0x20] = uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b67af — find_nearest_unit (GL)
// Source: block_005B0000.c line 2668
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b67af(param_1, param_2, param_3, param_4) {
  let iVar1;
  let local_10;
  let local_c;

  local_c = -1;
  DAT_006ced50 = 9999;
  for (local_10 = 0; local_10 < DAT_00655b16; local_10 = local_10 + 1) {
    let serial = DAT_0065610a[local_10 * 0x20] | (DAT_0065610a[local_10 * 0x20 + 1] << 8) |
                 (DAT_0065610a[local_10 * 0x20 + 2] << 16) | (DAT_0065610a[local_10 * 0x20 + 3] << 24);
    if (serial !== 0) {
      if ((param_3 < 0 || s8(DAT_006560f7[local_10 * 0x20]) === (param_3 & 0xff)) &&
         local_10 !== param_4) {
        let ux = s8(DAT_006560f0[local_10 * 0x20]) | (DAT_006560f0[local_10 * 0x20 + 1] << 8);
        if (ux & 0x8000) ux |= 0xFFFF0000;
        let uy = s8(DAT_006560f2[local_10 * 0x20]) | (DAT_006560f2[local_10 * 0x20 + 1] << 8);
        if (uy & 0x8000) uy |= 0xFFFF0000;
        iVar1 = FUN_005ae31d(param_1, param_2, ux, uy);
        if (iVar1 <= DAT_006ced50) {
          local_c = local_10;
          DAT_006ced50 = iVar1;
        }
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6898 — get_unit_home_city_name (GL)
// Source: block_005B0000.c line 2698
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6898(param_1) {
  if (s8(DAT_00656100[param_1 * 0x20]) === -1) {
    return FUN_00428b0c(DAT_00628420 + 0x38);
  }
  else {
    return DAT_0064f360[u8(DAT_00656100[param_1 * 0x20]) * 0x58];
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6a58 — clear_unit_orders (GL)
// Source: block_005B0000.c line 2760
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6a58(param_1) {
  if (-1 < param_1) {
    DAT_006560ff[param_1 * 0x20] = 0xff;
    let flags = (DAT_006560f4[param_1 * 0x20]) | (DAT_006560f4[param_1 * 0x20 + 1] << 8);
    flags = flags & 0x7fff;
    DAT_006560f4[param_1 * 0x20] = flags & 0xff;
    DAT_006560f4[param_1 * 0x20 + 1] = (flags >> 8) & 0xff;
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6aa0 — always_returns_one (FW)
// Source: block_005B0000.c line 2778
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6aa0() {
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6ab5 — draw_unit_name_text (UI)
// Source: block_005B0000.c line 2791
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6ab5(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_0056baff(param_2, param_3, 4, param_5 + 2, param_6, DAT_0063605c, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6aea — show_unit_list_popup (UI)
// Source: block_005B0000.c line 2806
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6aea(param_1, param_2, param_3) {
  // UI popup for unit list — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6d9f — close_text_popup (UI)
// Source: block_005B0000.c line 2889
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6d9f() {
  FUN_0059df8a();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6dab — cleanup_dialog (FW)
// Source: block_005B0000.c line 2903
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6dab() {
  FUN_005cde4d();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6dbe — seh_restore_3 (FW)
// Source: block_005B0000.c line 2917
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6dbe() {
  // SEH chain restore — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b7fe0 — allocate_map_data (GL)
// Source: block_005B0000.c line 2934
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b7fe0() {
  // Allocates all map tile data arrays
  // Heavy Win32 memory allocation — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8416 — free_map_data (GL)
// Source: block_005B0000.c line 3032
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8416() {
  // Frees all map tile data arrays
  // Win32 memory deallocation — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b85fe — init_resource_seed (GL)
// Source: block_005B0000.c line 3091
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b85fe() {
  let uVar1;

  uVar1 = FUN_00421bb0();
  DAT_006d1168 = uVar1 & 0x7fff;
  if (DAT_006d1168 === 0) {
    DAT_006d1168 = 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8635 — save_map_data (GL)
// Source: block_005B0000.c line 3111
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8635(param_1, param_2) {
  // File I/O: writes map data to save file — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8783 — load_map_data (GL)
// Source: block_005B0000.c line 3154
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8783(param_1, param_2) {
  // File I/O: reads map data from save file — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b898b — get_vis_layer_offset (GL)
// Source: block_005B0000.c line 3232
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b898b(param_1, param_2, param_3) {
  return (DAT_006d1160 >> 1) * param_2 + DAT_006365c0[param_3] + (param_1 >> 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8a81 — get_tile_city_id (GL)
// Source: block_005B0000.c line 3305
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8a81(param_1, param_2) {
  let iVar1;

  iVar1 = FUN_005b8931(param_1, param_2);
  // Return byte at offset +3 in tile data
  return 0; // stub — needs tile data array access
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8aa8 — get_city_id_if_not_ocean (GL)
// Source: block_005B0000.c line 3321
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8aa8(param_1, param_2) {
  let iVar1;
  let local_8;

  local_8 = 0xffffffff;
  iVar1 = FUN_005b89e4(param_1, param_2);
  if (iVar1 === 0) {
    local_8 = FUN_005b8a81(param_1, param_2);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8af0 — get_tile_improvements_high (GL)
// Source: block_005B0000.c line 3342
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8af0(param_1, param_2) {
  let iVar1;

  iVar1 = FUN_005b8931(param_1, param_2);
  // Return (byte at offset +2) >> 5
  return 0; // stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8b1a — update_visibility_for_civ (GL)
// Source: block_005B0000.c line 3358
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8b1a(param_1, param_2, param_3) {
  if (param_3 !== 0) {
    let iVar1 = FUN_005b8931(param_1, param_2);
    FUN_005b9d81(param_1, param_2, 0); // stub — needs tile byte read
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8b65 — is_tile_visible_to_civ (GL)
// Source: block_005B0000.c line 3377
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8b65(param_1, param_2, param_3) {
  if (param_3 < 0) {
    return 1;
  }
  else {
    let iVar2 = FUN_005b8931(param_1, param_2);
    // return (byte at offset +4) & (1 << param_3)
    return 0; // stub
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8bac — set_tile_visibility (GL)
// Source: block_005B0000.c line 3400
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8bac(param_1, param_2, param_3, param_4) {
  if (-1 < param_3) {
    if (param_4 === 0) {
      FUN_005b976d(param_1, param_2, 1 << (param_3 & 0x1f), 0, 1);
    }
    else {
      FUN_005b976d(param_1, param_2, 1 << (param_3 & 0x1f), 1, 1);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8c18 — get_tile_river_mask (GL)
// Source: block_005B0000.c line 3421
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8c18(param_1, param_2) {
  let iVar1;

  iVar1 = FUN_005b8931(param_1, param_2);
  // return (byte at offset +5) & 0xf
  return 0; // stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8c42 — get_tile_combined_improvement (GL)
// Source: block_005B0000.c line 3437
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8c42(param_1, param_2) {
  let local_8;

  local_8 = FUN_005b8af0(param_1, param_2);
  if (local_8 === 0) {
    local_8 = FUN_005b8c18(param_1, param_2);
    if (local_8 !== 0 && local_8 < 9) {
      local_8 = 8;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8d15 — get_tile_fortress_owner (GL)
// Source: block_005B0000.c line 3487
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8d15(param_1, param_2) {
  let bVar1;
  let uVar2;

  bVar1 = FUN_005b94d5(param_1, param_2);
  if ((bVar1 & 0x42) === 0x42) {
    uVar2 = FUN_005b8a1d(param_1, param_2);
  }
  else {
    uVar2 = 0xffffffff;
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8d62 — get_tile_unit_owner (GL)
// Source: block_005B0000.c line 3510
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8d62(param_1, param_2) {
  let uVar1;
  let uVar2;

  uVar1 = FUN_005b94d5(param_1, param_2);
  if ((uVar1 & 1) === 0) {
    uVar2 = 0xffffffff;
  }
  else {
    uVar2 = FUN_005b8a1d(param_1, param_2);
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8da4 — get_tile_owner (GL)
// Source: block_005B0000.c line 3533
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8da4(param_1, param_2) {
  let iVar1;

  iVar1 = FUN_005b8ca6(param_1, param_2);
  if (iVar1 < 0) {
    iVar1 = FUN_005b8d62(param_1, param_2);
  }
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8dec — get_zone_of_control_owner (GL)
// Source: block_005B0000.c line 3552
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8dec(param_1, param_2, param_3) {
  let iVar1;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 !== 0 && 0 < param_3) {
    iVar1 = FUN_005b89e4(param_1, param_2);
    if (iVar1 === 0) {
      iVar1 = FUN_005b8af0(param_1, param_2);
      if (0 < iVar1 && iVar1 !== param_3) {
        if ((DAT_0064c6c0[param_3 * 0x594 + iVar1 * 4] & 8) !== 0) {
          return -1;
        }
        if ((DAT_0064c6c0[param_3 * 0x594 + iVar1 * 4] & 4) !== 0) {
          return iVar1;
        }
      }
    }
  }
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8ffa — has_hut_on_tile (GL)
// Source: block_005B0000.c line 3627
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8ffa(param_1, param_2) {
  let iVar1;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 === 0) {
    return 0;
  }
  iVar1 = FUN_005b89e4(param_1, param_2);
  if (iVar1 === 0) {
    iVar1 = FUN_005b8a1d(param_1, param_2);
    if (iVar1 < 0) {
      let uVar3 = param_1 - ((param_1 + param_2) >> 1);
      if (((param_1 + param_2) >> 1 & 3) + (uVar3 & 3) * 4 ===
          (((param_1 + param_2) >> 3) * 0xb + (uVar3 >> 2) * 0xd + DAT_006d1168 + 8 & 0x1f)) {
        return 1;
      }
      return 0;
    }
    return 0;
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b90df — reveal_tile_and_neighbors (GL)
// Source: block_005B0000.c line 3671
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b90df(param_1, param_2) {
  let iVar1;
  let uVar2;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 !== 0) {
    uVar2 = FUN_005b94d5(param_1, param_2);
    if ((uVar2 & 0x80) === 0) {
      FUN_005b94fc(param_1, param_2, 0x80, 1, 1);
      for (local_8 = 1; local_8 < 8; local_8 = local_8 + 1) {
        FUN_005b8b1a(param_1, param_2, local_8);
      }
      DAT_00655b12 = DAT_00655b12 + 1;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9179 — nuke_tile (GL)
// Source: block_005B0000.c line 3696
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9179(param_1, param_2) {
  // Nuclear detonation effects on tile and neighbors
  // Stubbed — very complex with random terrain changes
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9431 — has_tech_bit (GL)
// Source: block_005B0000.c line 3778
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9431(param_1, param_2) {
  let local_c = 0;
  let local_8 = 0;
  FUN_005ae3bf(param_2, { val: local_c }, { val: local_8 });
  return (local_8 & DAT_00666137[local_c + param_1 * 0x10]) !== 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b947f — count_techs_known (GL)
// Source: block_005B0000.c line 3795
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b947f(param_1) {
  let iVar1;
  let local_8;

  local_8 = 0;
  for (let local_c = 1; local_c < 0x3f; local_c = local_c + 1) {
    iVar1 = FUN_005b9431(local_c, param_1);
    if (iVar1 !== 0) {
      local_8 = local_8 + 1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b94fc — set_tile_status_bit (GL)
// Source: block_005B0000.c line 3835
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b94fc(param_1, param_2, param_3, param_4, param_5) {
  // Sets/clears bits in tile status byte (+1), with multiplayer sync
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9646 — set_tile_terrain_type (GL)
// Source: block_005B0000.c line 3872
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9646(param_1, param_2, param_3, param_4) {
  // Sets terrain type in tile byte 0, with multiplayer sync
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b976d — set_tile_vis_bit (GL)
// Source: block_005B0000.c line 3905
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b976d(param_1, param_2, param_3, param_4, param_5) {
  // Sets/clears bits in tile vis byte (+4), with multiplayer sync
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b98b7 — set_tile_river_bits (GL)
// Source: block_005B0000.c line 3942
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b98b7(param_1, param_2, param_3, param_4) {
  // Sets river/resource bits in tile byte +5 low nibble
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b99e8 — set_tile_owner (GL)
// Source: block_005B0000.c line 3975
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b99e8(param_1, param_2, param_3, param_4) {
  // Sets tile owner in byte +5 high nibble
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9b35 — set_tile_city_id (GL)
// Source: block_005B0000.c line 4011
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9b35(param_1, param_2, param_3, param_4) {
  // Sets city ID in tile byte +3
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9c49 — set_tile_improvements (GL)
// Source: block_005B0000.c line 4043
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9c49(param_1, param_2, param_3, param_4) {
  // Sets improvement bits in tile byte +2 high 3 bits
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9d81 — set_vis_layer_byte (GL)
// Source: block_005B0000.c line 4076
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9d81(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Sets a byte in vis layer array
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9ec6 — begin_map_batch_update (GL)
// Source: block_005B0000.c line 4116
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9ec6() {
  if (2 < DAT_00655b02) {
    DAT_006ad699 = 0;
    DAT_006ad69a = 1;
    // memset batch buffer
    DAT_006d1190 = 0;
    DAT_006365f4 = 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9f1c — end_map_batch_update (GL)
// Source: block_005B0000.c line 4136
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9f1c() {
  if (2 < DAT_00655b02) {
    DAT_006ad699 = 1;
    DAT_006ad69a = 0;
    if (DAT_006ad2f7 === 0) {
      if (1 < DAT_006365f4) {
        FUN_0046b14d(0x59, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(5000);
        DAT_006d1190 = 0;
        DAT_006365f4 = 1;
      }
    }
    else {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9fde — queue_map_batch_change (GL)
// Source: block_005B0000.c line 4170
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9fde(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Queues tile changes into batch buffer for multiplayer sync
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005ba206 — apply_map_batch_update (GL)
// Source: block_005B0000.c line 4233
// ═══════════════════════════════════════════════════════════════════

export function FUN_005ba206(param_1) {
  // Applies queued map changes from batch buffer
  // Stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bad40 — parse_binary_string (FW)
// Source: block_005B0000.c line 4298
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bad40(param_1) {
  // Parses a binary string (0s and 1s) into an integer
  // Stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005badf0 — build_file_path (FW)
// Source: block_005B0000.c line 4328
// ═══════════════════════════════════════════════════════════════════

export function FUN_005badf0(param_1, param_2, param_3) {
  // Builds file path with directory separator
  // Stubbed
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baeb0 — set_text_render_self (UI)
// Source: block_005B0000.c line 4353
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baeb0(param_1) {
  DAT_006366a8 = param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baec8 — set_text_render_dest (UI)
// Source: block_005B0000.c line 4367
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baec8(param_1) {
  DAT_006366ac = param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baee0 — set_text_render_colors (UI)
// Source: block_005B0000.c line 4381
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baee0(param_1, param_2, param_3, param_4) {
  DAT_006366b0 = param_1;
  DAT_006366b4 = param_2;
  if (-1 < param_3) {
    DAT_006366b8 = param_3;
  }
  if (-1 < param_4) {
    DAT_006366bc = param_4;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baf24 — set_text_bold (UI)
// Source: block_005B0000.c line 4402
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baf24(param_1) {
  DAT_006366c0 = (param_1 !== 0) ? 1 : 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baf57 — draw_text_with_shadow (UI)
// Source: block_005B0000.c line 4416
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baf57(param_1, param_2, param_3, param_4) {
  // UI text rendering with shadow — stubbed
  return param_3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb024 — draw_text_centered (UI)
// Source: block_005B0000.c line 4444
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb024(param_1, param_2, param_3, param_4, param_5) {
  // UI centered text — stubbed
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb0af — draw_text_right_aligned (UI)
// Source: block_005B0000.c line 4470
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb0af(param_1, param_2, param_3, param_4, param_5) {
  // UI right-aligned text — stubbed
  return param_3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb3f0 — create_port_with_blit (UI)
// Source: block_005B0000.c line 4496
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb3f0(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // UI: create offscreen port — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb463 — create_port_with_blit_and_pal (UI)
// Source: block_005B0000.c line 4518
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb463(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005bb3f0(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb4ae — create_port_with_blit_2 (UI)
// Source: block_005B0000.c line 4534
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb4ae(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // UI port creation — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb525 — create_port_with_blit_2_and_pal (UI)
// Source: block_005B0000.c line 4556
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb525(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  FUN_005bb4ae(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  FUN_00579b40(param_9);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb574 — refresh_window (UI)
// Source: block_005B0000.c line 4573
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb574() {
  // UI window refresh — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb5be — handle_scroll_input (UI)
// Source: block_005B0000.c line 4596
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb5be(param_1) {
  // UI scroll handler — stubbed
  return false;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb621 — resize_window (UI/Win32)
// Source: block_005B0000.c line 4619
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb621(param_1, param_2) { /* Win32 UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb6c7 — clamp_scroll_position (UI)
// Source: block_005B0000.c line 4654
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb6c7(param_1, param_2) { /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb760 — create_map_port (UI)
// Source: block_005B0000.c line 4687
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb760(param_1, param_2, param_3, param_4, param_5, param_6) { /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb7c3 — create_map_port_with_pal (UI)
// Source: block_005B0000.c line 4708
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb7c3(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  FUN_005bb760(param_1, param_2, param_3, param_4, param_5, param_6);
  FUN_00579b40(param_7);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb80a — create_map_port_2 (UI)
// Source: block_005B0000.c line 4724
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb80a(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb871 — create_map_port_2_with_pal (UI)
// Source: block_005B0000.c line 4745
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb871(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005bb80a(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb8c0 — get_viewport_ptr (UI)
// Source: block_005B0000.c line 4761
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb8c0() { return 0; /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb8e0 — set_scroll_pos (UI)
// Source: block_005B0000.c line 4776
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb8e0(param_1, param_2) { /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb910 — get_scroll_min (UI)
// Source: block_005B0000.c line 4792
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb910(param_1, param_2) { /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb950 — get_scroll_max (UI)
// Source: block_005B0000.c line 4809
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb950(param_1, param_2) { /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb990 — call_repaint_callback (UI)
// Source: block_005B0000.c line 4826
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb990() { /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb9c0 — flush_mouse_and_keyboard_messages (UI/Win32)
// Source: block_005B0000.c line 4844
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb9c0() { /* Win32 PeekMessage — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bba1d — flush_all_messages (UI/Win32)
// Source: block_005B0000.c line 4866
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bba1d() { /* Win32 PeekMessage — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// gdi_BA4F — process_one_message (UI/Win32)
// Source: block_005B0000.c line 4885
// ═══════════════════════════════════════════════════════════════════

export function gdi_BA4F() { return 0; /* Win32 message pump — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// gdi_BAB8 — process_paint_message (UI/Win32)
// Source: block_005B0000.c line 4915
// ═══════════════════════════════════════════════════════════════════

export function gdi_BAB8() { return false; /* Win32 — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bbb0a — flush_all_and_gdi_flush (UI/Win32)
// Source: block_005B0000.c line 4936
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bbb0a() { /* Win32 — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bbb32 — flush_paint_and_gdi_flush (UI/Win32)
// Source: block_005B0000.c line 4955
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bbb32() { /* Win32 — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bbb5a — launch_external_program (UI/Win32)
// Source: block_005B0000.c line 4974
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bbb5a(param_1) { /* WinExec — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// gdi_BB76 — process_timer_message (UI/Win32)
// Source: block_005B0000.c line 4988
// ═══════════════════════════════════════════════════════════════════

export function gdi_BB76() { return false; /* Win32 — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bbbce — flush_timer_messages (UI/Win32)
// Source: block_005B0000.c line 5009
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bbbce() { /* Win32 — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// create_window_BC10 — create game window (UI/Win32)
// Source: block_005B0000.c line 5030
// ═══════════════════════════════════════════════════════════════════

export function create_window_BC10(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  return null; // Win32 CreateWindowExA — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005bbfee — enable_window (UI/Win32)
// Source: block_005B0000.c line 5203
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bbfee(param_1, param_2) { /* EnableWindow — no-op */ }

export function FUN_005bc019(param_1, param_2) { /* SetWindowLong — no-op */ }
export function FUN_005bc032(param_1) { return 0; /* IsWindowVisible — no-op */ }
export function send_msg_C07E(param_1) { /* SendMessage WM_CLOSE — no-op */ }
export function manage_window_C0AB(param_1) { return 0; /* DestroyWindow — no-op */ }
export function FUN_005bc173() { /* window stack iteration — no-op */ }
export function FUN_005bc1b5(param_1) { /* push window stack — no-op */ }
export function FUN_005bc1db(param_1) { /* pop window stack — no-op */ }
export function update_palette_C280(param_1, param_2) { /* palette update — no-op */ }
export function invalidate_C35E(param_1, param_2, param_3, param_4) { /* brush creation — no-op */ }
export function FUN_005bc3bf(param_1, param_2) { /* set field +0x24 — no-op */ }
export function FUN_005bc3d8(param_1, param_2) { /* set field +0x28 — no-op */ }
export function FUN_005bc3f1(param_1, param_2) { /* set field +0x2c — no-op */ }
export function manage_window_C40A(param_1) { /* ShowWindow SW_SHOW — no-op */ }
export function manage_window_C44D(param_1) { /* ShowWindow SW_HIDE — no-op */ }
export function FUN_005bc476(param_1, param_2) { /* SetWindowTextA — no-op */ }
export function FUN_005bc4a1(param_1, param_2, param_3) { /* MoveWindow — no-op */ }
export function FUN_005bc505(param_1, param_2, param_3) { /* resize window — no-op */ }
export function manage_window_C5DA(param_1) { /* ShowWindow SW_MAXIMIZE — no-op */ }
export function FUN_005bc603(param_1) { return 0; /* IsZoomed — no-op */ }
export function manage_window_C636(param_1) { /* ShowWindow SW_MINIMIZE — no-op */ }
export function FUN_005bc65f(param_1) { return 0; /* IsIconic — no-op */ }
export function manage_window_C692(param_1) { /* ShowWindow SW_RESTORE — no-op */ }
export function FUN_005bc6bb(param_1, param_2) { /* ValidateRect — no-op */ }
export function invalidate_C6E6(param_1, param_2) { /* InvalidateRect — no-op */ }
export function FUN_005bc713(param_1, param_2) { /* MoveWindow with rect — no-op */ }
export function gdi_C763(param_1, param_2, param_3) { /* center window — no-op */ }
export function FUN_005bc933(param_1) { return 0; /* GetClientRect width — no-op */ }
export function FUN_005bc96b(param_1) { return 0; /* GetClientRect height — no-op */ }
export function FUN_005bc9a3(param_1, param_2) { /* GetWindowRect — no-op */ }
export function FUN_005bc9d3(param_1) { return 0; /* get window border width — no-op */ }
export function FUN_005bca3d(param_1) { return 0; /* get window border height — no-op */ }
export function FUN_005bcaa7(param_1) { /* get screen rect — no-op */ }
export function FUN_005bcad7(param_1, param_2, param_3, param_4, param_5) { /* ClientToScreen — no-op */ }
export function FUN_005bcb26(param_1, param_2, param_3, param_4, param_5) { /* MapWindowPoints — no-op */ }
export function FUN_005bcb85(param_1, param_2) { /* GetWindowRect + MapWindowPoints — no-op */ }
export function update_palette_CC11(p1, p2, p3, p4, p5, p6, p7, p8) { /* BitBlt — no-op */ }
export function blit_CC8D(p1, p2, p3, p4, p5, p6, p7, p8) { /* BitBlt — no-op */ }
export function update_palette_CCE2(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) { /* StretchBlt — no-op */ }
export function stretch_blit_CD66(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) { /* StretchBlt — no-op */ }
export function FUN_005bcdc3(param_1, param_2) { /* SelectPalette — no-op */ }
export function FUN_005bcdfc(param_1, param_2) { /* SetMenu — no-op */ }
export function invalidate_CE5F(param_1, param_2) { /* LoadIcon + InvalidateRect — no-op */ }
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
export function FUN_005bd298(param_1, param_2, param_3, param_4) { return 0; /* wait for mouse click — no-op */ }
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
export function FUN_005bd7db(param_1, param_2, param_3, param_4) { /* load CvPic image — no-op */ }
export function FUN_005bd813(param_1) { /* port init fields — no-op */ }
export function FUN_005bd915() { /* port destructor — no-op */ }
export function FUN_005bd987(param_1, param_2, param_3, param_4) { return 0; /* load LBM image — no-op */ }
export function FUN_005bdf7f(param_1, param_2, param_3, param_4, param_5) { /* decode image row — no-op */ }
export function FUN_005be1b3(param_1, param_2, param_3, param_4) { /* decode planar row — no-op */ }
export function FUN_005be2c4(param_1, param_2, param_3, param_4) { return 0; /* load TGA resource — no-op */ }
export function FUN_005be595(param_1, param_2, param_3, param_4) { /* load TGA file — no-op */ }
export function FUN_005be940() { FUN_005d7c6e(); }
export function FUN_005be956() { /* SEH restore — no-op */ }
export function FUN_005be967(param_1, param_2, param_3, param_4) { return 0; /* load PCX resource — no-op */ }
export function FUN_005bec8c(param_1, param_2, param_3, param_4) { /* load PCX file — no-op */ }
export function FUN_005bf04a() { FUN_005d7c6e(); }
export function FUN_005bf060() { /* SEH restore — no-op */ }
export function FUN_005bf071(param_1, param_2, param_3, param_4) { /* load GIF file — no-op */ }
export function FUN_005bf5ba() { FUN_005d7c6e(); }
export function FUN_005bf5d0() { /* SEH restore — no-op */ }
export function FUN_005bf5e1(param_1, param_2, param_3, param_4) { return 0; /* load GIF resource — no-op */ }
export function FUN_005bf930(param_1, param_2, param_3, param_4) { return 0; /* load CvPic resource — no-op */ }
export function FUN_005bfad9(param_1, param_2, param_3, param_4) { return 0; /* load BMP resource — no-op */ }
export function FUN_005bfcff(param_1, param_2, param_3, param_4) { /* load BMP file — no-op */ }
export function FUN_005c000d() { FUN_005d7c6e(); }
export function FUN_005c0023() { /* SEH restore — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
//
// Functions called from this block but defined in other blocks.
// Stubbed as no-ops or simple returns.
// ═══════════════════════════════════════════════════════════════════

function FUN_00418d60() { return 0; } // MFC dialog — get selected radio
function FUN_0043c5f0() { /* UI callback */ }
function FUN_0040f380() { /* UI callback */ }
function FUN_005af4ae() { return 0; } // editor check state
function FUN_005af343() { /* editor update */ }
function FUN_005af682() { /* editor refresh */ }
function FUN_00418d90(v) { /* MFC set radio selection */ }
function FUN_0059d3c9(v) { /* set active window */ }
function FUN_004190d0(a, b) { /* MFC show text */ }
function FUN_00418770() { return 0; } // MFC get HWND
function SetFocus(h) { /* Win32 — no-op */ }
function FUN_00417fa0() { /* MFC begin wait cursor */ }
function FUN_004183d0() { /* MFC end wait cursor */ }
function FUN_005dae6b(a, b, c, d) { /* assert/error handler */ }
function FUN_005d2279(fmt, ...args) { /* debug_log printf */ }
function debug_log(s) { /* debug log */ }
function FUN_004bd9f0(a, b) { return 0; } // has_wonder
function FUN_00453e51(a, b) { return 0; } // has_tech_advance
function FUN_005ae31d(a, b, c, d) { return 9999; } // map_distance
function FUN_005ae3bf(a, b, c) { /* decode tech index to byte/bit */ }
function FUN_004b0b53(a, b, c, d, e) { /* sync unit data */ }
function XD_FlushSendBuffer(t) { /* network flush */ }
function FUN_0046b14d(a, b, c, d, e, f, g, h, i, j) { /* send network message */ }
function FUN_00421f40() { return 1; } // is_server
function FUN_00421bb0() { return Date.now() & 0xFFFF; } // GetTickCount
function FUN_0047e94e(a, b) { /* pump messages while waiting */ }
function FUN_00410030(a, b, c) { /* show error dialog */ }
function FUN_00428b0c(v) { return 0; } // load string resource
function FUN_0043cf76(a, b) { return -1; } // find city at xy
function FUN_0043d07a(a, b, c, d, e) { return -1; } // find city near xy
function FUN_004274a6(a, b) { /* unit sprite update */ }
function FUN_00490530(a, b, c) { /* tutorial event */ }
function FUN_0047cea6(a, b) { /* refresh tile display */ }
function FUN_0047ce1e(a, b, c, d, e) { /* update city display */ }
function FUN_005c656b() { /* cleanup resources */ }
function FUN_005cde4d() { /* cleanup dialog */ }
function FUN_005bb574_ext() { /* refresh window */ }
function FUN_005c64da() { /* init resources */ }
function FUN_005bd630_ext() { return 0; } // port init
function FUN_005d268e(v) { /* property sheet init */ }
function FUN_005d25a8(v) { /* property sheet setup */ }
function FUN_005d2550(v) { /* property sheet config */ }
function FUN_005d2568(a, b, c) { /* property sheet config */ }
function FUN_005d2590(v) { /* property sheet config */ }
function FUN_005bf071_ext(a, b, c, d) { /* load GIF */ }
function FUN_005b9fde_ext(a, b, c, d, e, f) { /* queue batch change */ }
function FUN_005ba206_ext(v) { /* apply batch */ }
function FUN_0059df8a() { /* close text popup */ }
function FUN_0056baff(a, b, c, d, e, f, g) { /* draw text string */ }
function FUN_00579b40(v) { /* apply palette */ }
function FUN_005c5760(a, b, c, d, e, f, g) { /* create port */ }
function FUN_005bd65c_ext(a, b) { /* set port size */ }
function FUN_005c0cc5(v) { /* finalize port */ }
function FUN_005e1880(a, b) { /* port set title */ }
function FUN_005c57f9(a, b, c, d, e, f, g, h) { /* create port variant */ }
function FUN_005c589a(a, b, c, d, e, f) { /* create map port */ }
function FUN_005c1b0d(a, b) { /* map port size */ }
function FUN_005c592b(a, b, c, d, e, f, g) { /* create map port variant */ }
function FUN_005c0105(v) { return 0; } // check scroll
function FUN_005bb8e0_ext(a, b) { /* set scroll position */ }
function FUN_005bb910_ext(a, b) { /* get scroll min */ }
function FUN_005bb950_ext(a, b) { /* get scroll max */ }
function FUN_005bc505_ext(a, b, c) { /* resize window */ }
function FUN_005bc9d3_ext(v) { return 0; } // window border
function FUN_005bca3d_ext(v) { return 0; } // window border
function FUN_005c019d(v) { return 1; } // port allocate
function FUN_005c019d_ext(v) { return 1; }
function FUN_005c01c1() { /* port finalize */ }
function FUN_005c02e0() { /* port cleanup */ }
function FUN_005c54f0() { return 0; } // port check
function FUN_005c5410(v) { return v; } // byte swap short
function FUN_005c5430(v) { return v; } // byte swap long
function FUN_005c5470() { return 0; } // get file data ptr
function FUN_005c54a0() { /* close file */ }
function FUN_005c54d0(v) { return v; } // byte swap ushort
function FUN_005c5520(v) { /* free resource */ }
function FUN_005c5540(a, b) { return 0; } // find resource
function FUN_005c5560(v) { return 0; } // lock resource
function FUN_005c5580(v) { /* unlock resource */ }
function FUN_005c55a0(v) { return v; } // align to 4 bytes
function FUN_005c6b93(a, b, c, d) { /* set palette entry */ }
function FUN_005c6da8(a, b, c) { /* load palette range */ }
function FUN_005c19ad(v) { /* set font color */ }
function FUN_005c0f57(a, b, c, d, e) { /* draw text at position */ }
function FUN_005c19d3(a, b) { return 0; } // get scanline ptr
function FUN_005d7c00() { /* file open */ }
function FUN_005d7c6e() { /* file close */ }
function Realloc(v) { return 0; } // file load
function FUN_005db2f8(v) { return 0; } // find bitmap resource
function FUN_005db5e9(v) { return 0; } // get resource size
function FUN_005dced3(a, b, c) { /* memcpy */ }
function FUN_005dce4f(v) { return 0; } // malloc
function FUN_005dcdf9(v) { return 0; } // lock memory
function FUN_005dce29(v) { return 0; } // unlock memory
function FUN_005dce96(v) { /* free memory */ }
function FUN_005e388f(v) { return 0; } // release DIB
function FUN_005e392a(v) { return 0; } // get DIB pitch
function FUN_005e395a(v) { return 0; } // is DIB bottom-up
function FUN_005e3988(v) { /* flip DIB */ }
function FUN_005e4d60(a, b, c, d, e, f, g) { /* LZW decode GIF */ }
function FUN_005e1c70() { /* idle handler */ }
function FUN_005d237d(fmt, ...args) { /* debug log printf */ }
function FUN_005f22d0(a, b) { /* strcpy */ }
function FUN_005f22e0(a, b) { /* strcat */ }
function FUN_005c0d12(v) { /* set port clip */ }
function FUN_005bb990_ext() { /* repaint callback */ }
function thunk_citywin_C494(a, b, c) { /* city window refresh */ }
function thunk_citywin_C679(v) { /* city window update */ }
function thunk_kill_civ(a, b) { /* eliminate civilization */ }
function FUN_005b8a81_ext(a, b) { return 0; }
