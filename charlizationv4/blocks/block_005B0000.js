// ═══════════════════════════════════════════════════════════════════
// block_005B0000.js — Mechanical transpilation of block_005B0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005B0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005B0000.c
// ═══════════════════════════════════════════════════════════════════



// Re-export fn_utils functions so consumers can import from this block
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_0040f380 } from './block_00400000.js';
import { FUN_00417fa0, FUN_004183d0, FUN_00418770, FUN_00418d60, FUN_00418d90, FUN_004190d0 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421f40, FUN_004274a6 } from './block_00420000.js';
import { FUN_0043c5f0, FUN_0043cf76 } from './block_00430000.js';
import { FUN_00453e51 } from './block_00450000.js';
import { FUN_0046b14d } from './block_00460000.js';
import { FUN_0047ce1e, FUN_0047cea6, FUN_0047e94e } from './block_00470000.js';
import { FUN_004b0b53 } from './block_004B0000.js';
import { FUN_0056baff } from './block_00560000.js';
import { FUN_0059d3c9, FUN_0059df8a } from './block_00590000.js';
import { FUN_005ae31d, FUN_005ae3bf, FUN_005af343, FUN_005af4ae, FUN_005af682 } from './block_005A0000.js';
import { FUN_005c656b, FUN_005cde4d } from './block_005C0000.js';
import { FUN_005d2279, FUN_005d7c6e, FUN_005dae6b } from './block_005D0000.js';

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

function _rand() { return Math.floor(Math.random() * 0x7FFF); }



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

export function FUN_005b0373(param_1) {
  // Entirely UI/editor — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b0473 — editor_create_controls (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b0473(param_1) {
  // Entirely UI — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b08e8 — editor_create_button (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b08e8(param_1) {
  // UI button creation — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b09dc — editor_paint (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b09dc() {
  // UI paint handler — stubbed
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b1037 — editor_dialog_init (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b1037() {
  // Editor dialog initialization — entirely UI — stubbed
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
  if (G.DAT_006ad918 === 0) {
    iVar3 = FUN_005b50ad(param_1, 0xb);
    if (0x7ff < iVar3) {
      FUN_005d2279('Infinite unit stack (id = %d)', param_1);
      local_8 = 0;
      local_14 = param_1;
      sVar1 = rs(G.DAT_006560f0, param_1 * 0x20 + 0x18);
      do {
        local_24 = sVar1;
        if (local_14 < 0) break;
        let sx = rs(G.DAT_006560f0, local_14 * 0x20);
        let sy = rs(G.DAT_006560f0, local_14 * 0x20 + 2);
        pick_up_unit_005b319e(local_14, 0);
        FUN_005b345f(local_14, sx, sy, 0);
        local_14 = local_24;
        sVar1 = rs(G.DAT_006560f0, local_24 * 0x20 + 0x18);
      } while (local_24 !== param_1);
    }
    // Validate prev-links for dead units
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let prevLink = rs(G.DAT_006560f0, local_24 * 0x20 + 0x16);
      if (prevLink < 0) break;
      iVar3 = prevLink;
      let serial = ri(G.DAT_006560f0, prevLink * 0x20 + 0x1a);
      if (serial === 0) {
        FUN_005d2279('Dead unit in unit stack (id = %d)', local_24);
        local_8 = 0;
        ws(G.DAT_006560f0, local_24 * 0x20 + 0x16, 0xffff);
        let nextOfPrev = rs(G.DAT_006560f0, iVar3 * 0x20 + 0x18);
        if (nextOfPrev === local_24) {
          ws(G.DAT_006560f0, iVar3 * 0x20 + 0x18, 0xffff);
        }
      }
    }
    // Validate next-links for dead units
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let nextLink = rs(G.DAT_006560f0, local_24 * 0x20 + 0x18);
      if (nextLink < 0) break;
      iVar3 = nextLink;
      let serial = ri(G.DAT_006560f0, local_24 * 0x20 + 0x1a);
      if (serial === 0) {
        FUN_005d2279('Dead unit in unit stack (id = %d)', local_24);
        local_8 = 0;
        ws(G.DAT_006560f0, local_24 * 0x20 + 0x18, 0xffff);
        let prevOfNext = rs(G.DAT_006560f0, iVar3 * 0x20 + 0x16);
        if (prevOfNext === local_24) {
          ws(G.DAT_006560f0, iVar3 * 0x20 + 0x16, 0xffff);
        }
      }
    }
    // Validate prev-link location consistency
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let prevLink = rs(G.DAT_006560f0, local_24 * 0x20 + 0x16);
      if (prevLink < 0) break;
      iVar3 = prevLink;
      if (rs(G.DAT_006560f0, prevLink * 0x20) !== rs(G.DAT_006560f0, local_24 * 0x20) ||
          rs(G.DAT_006560f0, prevLink * 0x20 + 2) !== rs(G.DAT_006560f0, local_24 * 0x20 + 2)) {
        FUN_005d2279('Crossed locations in unit stack', local_24);
        local_8 = 0;
        ws(G.DAT_006560f0, local_24 * 0x20 + 0x16, 0xffff);
        let nextOfPrev = rs(G.DAT_006560f0, iVar3 * 0x20 + 0x18);
        if (nextOfPrev === local_24) {
          ws(G.DAT_006560f0, iVar3 * 0x20 + 0x18, 0xffff);
        }
      }
    }
    // Validate next-link location consistency
    local_24 = param_1;
    iVar3 = local_24;
    while (true) {
      local_24 = iVar3;
      let nextLink = rs(G.DAT_006560f0, local_24 * 0x20 + 0x18);
      if (nextLink < 0) break;
      iVar3 = nextLink;
      if (rs(G.DAT_006560f0, nextLink * 0x20) !== rs(G.DAT_006560f0, local_24 * 0x20) ||
          rs(G.DAT_006560f0, nextLink * 0x20 + 2) !== rs(G.DAT_006560f0, local_24 * 0x20 + 2)) {
        FUN_005d2279('Crossed locations in unit stack', local_24);
        local_8 = 0;
        ws(G.DAT_006560f0, local_24 * 0x20 + 0x18, 0xffff);
        let prevOfNext = rs(G.DAT_006560f0, iVar3 * 0x20 + 0x16);
        if (prevOfNext === local_24) {
          ws(G.DAT_006560f0, iVar3 * 0x20 + 0x16, 0xffff);
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
  return s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 0x0A]);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b29d7 — get_unit_hp_remaining (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b29d7(param_1) {
  let iVar1;
  if ((G.DAT_00655ae8 & 0x10) === 0) {
    G.DAT_006560f0[param_1 * 0x20 + 0x0A] = 0;
  }
  iVar1 = FUN_005b29aa(param_1);
  iVar1 = iVar1 - u8(G.DAT_006560f0[param_1 * 0x20 + 0x0A]);
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
  let unitType = u8(G.DAT_006560f0[param_1 * 0x20 + 6]);

  local_10 = s8(G.DAT_0064b1bc[unitType * 0x14 + 6]);
  if (local_10 === 0) {
    uVar3 = 0;
  } else {
    if (G.DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) {
      iVar1 = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
      iVar2 = FUN_004bd9f0(iVar1, 0x3b);
      if (iVar2 !== 0) local_10 = local_10 + G.DAT_0064bcc8;
      iVar2 = FUN_00453e51(iVar1, 0xc);
      if (iVar2 !== 0) local_10 = local_10 + G.DAT_0064bcc8 * 2;
      iVar1 = FUN_00453e51(iVar1, 3);
      if (iVar1 !== 0 && (G.DAT_0064b1bc[unitType * 0x14] & 0x20) === 0) {
        local_10 = local_10 + G.DAT_0064bcc8;
      }
    }
    uVar3 = local_10;
    if (G.DAT_006560f0[param_1 * 0x20 + 0x0A] !== 0 &&
        (G.DAT_00655ae8 & 0x10) !== 0 &&
        G.DAT_0064b1bc[unitType * 0x14 + 5] !== 0x01) {
      iVar1 = FUN_005b29aa(param_1);
      if (iVar1 < 2) iVar1 = 1;
      iVar2 = FUN_005b29d7(param_1);
      local_10 = Math.trunc((iVar2 * local_10) / iVar1);
      if (local_10 % G.DAT_0064bcc8 !== 0) {
        local_10 = local_10 + (G.DAT_0064bcc8 - local_10 % G.DAT_0064bcc8);
      }
      if (G.DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) {
        local_14 = G.DAT_0064bcc8 * 2;
      } else {
        local_14 = G.DAT_0064bcc8;
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
  iVar1 = iVar1 - u8(G.DAT_006560f0[param_1 * 0x20 + 8]);
  if (iVar1 < 1) iVar1 = 0;
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2c82 — get_next_unit_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2c82(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    param_1 = rs(G.DAT_006560f0, param_1 * 0x20 + 0x18);
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b2cc3 — get_last_unit_in_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b2cc3(param_1) {
  if (-1 < param_1) {
    FUN_005b2590(param_1);
    let next = rs(G.DAT_006560f0, param_1 * 0x20 + 0x18);
    while (-1 < next && next !== param_1) {
      param_1 = next;
      next = rs(G.DAT_006560f0, param_1 * 0x20 + 0x18);
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
    let prev = rs(G.DAT_006560f0, param_1 * 0x20 + 0x16);
    while (-1 < prev && prev !== param_1) {
      param_1 = prev;
      prev = rs(G.DAT_006560f0, param_1 * 0x20 + 0x16);
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
  for (local_c = 0; local_8 < 0 && local_c < G.DAT_00655b16; local_c++) {
    if (ri(G.DAT_006560f0, local_c * 0x20 + 0x1a) !== 0 &&
        rs(G.DAT_006560f0, local_c * 0x20) === param_2 &&
        rs(G.DAT_006560f0, local_c * 0x20 + 2) === param_3 &&
        s8(G.DAT_006560f0[local_c * 0x20 + 7]) === param_1) {
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

  if (G.DAT_00636058 === 0 || (iVar1 = FUN_005b8d62(param_1, param_2), -1 < iVar1)) {
    for (local_c = 0; local_8 < 0 && local_c < G.DAT_00655b16; local_c++) {
      if (ri(G.DAT_006560f0, local_c * 0x20 + 0x1a) !== 0 &&
          rs(G.DAT_006560f0, local_c * 0x20) === param_1 &&
          rs(G.DAT_006560f0, local_c * 0x20 + 2) === param_2) {
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
  if (G.DAT_006560f0[param_1 * 0x20 + 0x0F] !== 0x03) {
    ws(G.DAT_006560f0, param_1 * 0x20 + 0x12, 0xffff);
  }
  G.DAT_006560f0[param_1 * 0x20 + 0x0F] = 3;
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
    param_1 = rs(G.DAT_006560f0, param_1 * 0x20 + 0x16);
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
    if (G.DAT_0064b1bc[u8(G.DAT_006560f0[local_10 * 0x20 + 6]) * 0x14 + 0x0E] === param_3) {
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
    if (G.DAT_006560f0[param_1 * 0x20 + 6] === param_2) local_8++;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// pick_up_unit_005b319e — remove unit from tile stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function pick_up_unit_005b319e(param_1, param_2) {
  let sVar1, sVar2;
  let iVar4;

  G.DAT_006ad8d8 = 1;
  if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    sVar1 = rs(G.DAT_006560f0, param_1 * 0x20 + 0x16);
    if (-1 < sVar1) {
      ws(G.DAT_006560f0, sVar1 * 0x20 + 0x18, ru(G.DAT_006560f0, param_1 * 0x20 + 0x18));
    }
    sVar2 = rs(G.DAT_006560f0, param_1 * 0x20 + 0x18);
    if (-1 < sVar2) {
      ws(G.DAT_006560f0, sVar2 * 0x20 + 0x16, ru(G.DAT_006560f0, param_1 * 0x20 + 0x16));
    }
    ws(G.DAT_006560f0, param_1 * 0x20 + 0x16, 0xffff);
    ws(G.DAT_006560f0, param_1 * 0x20 + 0x18, 0xffff);

    if (sVar2 < 0 && sVar1 < 0) {
      iVar4 = FUN_004087c0(rs(G.DAT_006560f0, param_1 * 0x20), rs(G.DAT_006560f0, param_1 * 0x20 + 2));
      if (iVar4 !== 0) {
        let tOff = FUN_005b8931(rs(G.DAT_006560f0, param_1 * 0x20), rs(G.DAT_006560f0, param_1 * 0x20 + 2));
        if (tOff >= 0) {
          // Clear unit-present bit on tile improvements byte
          FUN_005b94fc(rs(G.DAT_006560f0, param_1 * 0x20), rs(G.DAT_006560f0, param_1 * 0x20 + 2), 1, 0, 0);
        }
      }
    }
    // Move unit to off-map holding position
    let ownerCiv = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
    let offX = (ownerCiv * 4 + 4) * -0x19;
    let offY = offX;
    ws(G.DAT_006560f0, param_1 * 0x20, offX & 0xFFFF);
    ws(G.DAT_006560f0, param_1 * 0x20 + 2, offY & 0xFFFF);

    if (2 < G.DAT_00655b02 && param_2 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    G.DAT_006ad8d8 = 0;
  } else {
    // Multiplayer client path
    G.DAT_006ad8d8 = 0;
    G.DAT_006c90e0 = -2;
    FUN_0046b14d(0x3f, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    // Wait for server response — simplified
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b345f — put_down_unit_at (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b345f(param_1, param_2, param_3, param_4) {
  let iVar2;
  let local_14;

  G.DAT_006ad8dc = 1;
  if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    iVar2 = FUN_005b2daf(s8(G.DAT_006560f0[param_1 * 0x20 + 7]), param_2, param_3);
    ws(G.DAT_006560f0, param_1 * 0x20, param_2 & 0xFFFF);
    ws(G.DAT_006560f0, param_1 * 0x20 + 2, param_3 & 0xFFFF);
    ws(G.DAT_006560f0, param_1 * 0x20 + 0x16, 0xffff);
    ws(G.DAT_006560f0, param_1 * 0x20 + 0x18, iVar2 & 0xFFFF);

    if (iVar2 < 0) {
      let valid = FUN_004087c0(param_2, param_3);
      if (valid !== 0) {
        // Set unit-present bit on tile
        FUN_005b94fc(param_2, param_3, 1, 1, 0);
        local_14 = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
        if (local_14 < 0 || 8 < local_14) local_14 = 0xf;
        FUN_005b99e8(param_2, param_3, local_14, 0);
      }
    } else {
      ws(G.DAT_006560f0, iVar2 * 0x20 + 0x16, param_1 & 0xFFFF);
    }

    if (2 < G.DAT_00655b02 && param_4 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    G.DAT_006ad8dc = 0;
  } else {
    // Multiplayer client path
    G.DAT_006ad8dc = 0;
    G.DAT_006c90e8 = -2;
    FUN_0046b14d(0x41, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b36df — relocate_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b36df(param_1, param_2, param_3, param_4) {
  G.DAT_006ad8e4 = 1;
  if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    pick_up_unit_005b319e(param_1, 0);
    FUN_005b345f(param_1, param_2, param_3, 0);
    if (2 < G.DAT_00655b02 && param_4 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    G.DAT_006ad8e4 = 0;
  } else {
    G.DAT_006ad8e4 = 0;
    G.DAT_006c90f8 = -2;
    FUN_0046b14d(0x45, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b3863 — restack_unit_at_current_pos (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b3863(param_1, param_2) {
  FUN_005b36df(param_1, rs(G.DAT_006560f0, param_1 * 0x20), rs(G.DAT_006560f0, param_1 * 0x20 + 2), param_2);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b389f — move_unit_to_bottom_of_stack (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b389f(param_1, param_2) {
  let uVar1, uVar2;
  let local_14;

  if (rs(G.DAT_006560f0, param_1 * 0x20 + 0x18) >= 0) {
    G.DAT_006ad8e0 = 1;
    if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
      if (rs(G.DAT_006560f0, param_1 * 0x20 + 0x18) >= 0) {
        uVar1 = ru(G.DAT_006560f0, param_1 * 0x20);
        uVar2 = ru(G.DAT_006560f0, param_1 * 0x20 + 2);
        local_14 = FUN_005b2d39(param_1);
        if (local_14 === param_1) local_14 = FUN_005b2c82(param_1);
        pick_up_unit_005b319e(param_1, 0);
        let last = FUN_005b2cc3(local_14);
        ws(G.DAT_006560f0, last * 0x20 + 0x18, param_1 & 0xFFFF);
        ws(G.DAT_006560f0, param_1 * 0x20 + 0x16, last & 0xFFFF);
        ws(G.DAT_006560f0, param_1 * 0x20 + 0x18, 0xffff);
        ws(G.DAT_006560f0, param_1 * 0x20, uVar1);
        ws(G.DAT_006560f0, param_1 * 0x20 + 2, uVar2);
      }
      if (2 < G.DAT_00655b02 && param_2 !== 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        XD_FlushSendBuffer(5000);
      }
      G.DAT_006ad8e0 = 0;
    } else {
      G.DAT_006ad8e0 = 0;
      G.DAT_006c90f0 = -2;
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
  if (2 < G.DAT_00655b02 && param_4 !== 0) {
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
    sVar1 = rs(G.DAT_006560f0, param_1 * 0x20);
    sVar2 = rs(G.DAT_006560f0, param_1 * 0x20 + 2);
    iVar3 = FUN_005b2d39(param_1);
    while (param_1 = iVar3, -1 < param_1) {
      iVar3 = FUN_005b2c82(param_1);
      if (G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
        local_10 = param_1;
        let ownerCiv = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
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

  G.DAT_006ad8bc = 1;
  if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    // Find empty slot
    for (local_10 = 0; local_10 < G.DAT_00655b16 && ri(G.DAT_006560f0, local_10 * 0x20 + 0x1a) !== 0; local_10++) {}
    if (G.DAT_00655b16 === local_10) {
      if (0x7ff < G.DAT_00655b16) {
        G.DAT_006ad8bc = 0;
        return -1;
      }
      G.DAT_00655b16 = G.DAT_00655b16 + 1;
    }
    // Update civ bookkeeping
    if (s8(G.DAT_0064b1bc[param_1 * 0x14 + 0x0E]) < 5) {
      // Increment support unit count for this civ
    }

    // Initialize unit fields
    G.DAT_006560f0[local_10 * 0x20 + 6] = param_1 & 0xFF;           // unit type
    G.DAT_006560f0[local_10 * 0x20 + 7] = param_2 & 0xFF;           // owner
    wi(G.DAT_006560f0, local_10 * 0x20 + 0x1a, G.DAT_00627fd8);       // serial
    G.DAT_00627fd8++;
    G.DAT_006560f0[local_10 * 0x20 + 8] = 0;                         // moves spent
    if (G.DAT_00655b02 >= 3 && G.DAT_006ad684 !== 0) {
      G.DAT_006560f0[local_10 * 0x20 + 8] = FUN_005b2a39(local_10) & 0xFF;
    }
    G.DAT_006560f0[local_10 * 0x20 + 0x0A] = 0;                     // hp lost
    G.DAT_006560f0[local_10 * 0x20 + 0x0C] = 0x58;                   // shield charge (default)
    ws(G.DAT_006560f0, local_10 * 0x20 + 4, 0);                      // status flags
    G.DAT_006560f0[local_10 * 0x20 + 9] = 0;                         // visibility
    G.DAT_006560f0[local_10 * 0x20 + 0x0F] = 0xff;                   // orders (none)
    G.DAT_006560f0[local_10 * 0x20 + 0x10] = 0xff;                   // home city (none)
    // Find home city at param_3, param_4
    iVar3 = FUN_0043d07a(param_3, param_4, -1, -1, -1);
    if (param_2 !== 0 && -1 < iVar3) {
      if (s8(G.DAT_0064f340[iVar3 * 0x58 + 8]) === (param_2 & 0xff)) {
        G.DAT_006560f0[local_10 * 0x20 + 0x10] = iVar3 & 0xFF;
      }
    }
    G.DAT_006560f0[local_10 * 0x20 + 0x0D] = 0;                     // commodity
    G.DAT_006560f0[local_10 * 0x20 + 0x0E] = 0;                     // counter2
    G.DAT_006560f0[local_10 * 0x20 + 0x0B] = 0xff;                   // last direction
    ws(G.DAT_006560f0, local_10 * 0x20 + 0x16, 0xffff);              // prev link
    ws(G.DAT_006560f0, local_10 * 0x20 + 0x18, 0xffff);              // next link
    ws(G.DAT_006560f0, local_10 * 0x20, 0xffff);                     // x
    ws(G.DAT_006560f0, local_10 * 0x20 + 2, 0xffff);                 // y
    ws(G.DAT_006560f0, local_10 * 0x20 + 0x12, 0xffff);              // goto x
    ws(G.DAT_006560f0, local_10 * 0x20 + 0x14, 0xffff);              // goto y
    FUN_005b345f(local_10, param_3, param_4, 0);
    FUN_004274a6(local_10, 1);

    if (2 < G.DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    G.DAT_006ad8bc = 0;
  } else {
    // Multiplayer client path
    G.DAT_006ad8bc = 0;
    G.DAT_006c90d8 = -2;
    FUN_0046b14d(0x3d, 0, param_1, param_2, param_3, param_4, 0, 0, 0, 0);
    local_10 = G.DAT_006c90d8;
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

  if (-1 < param_1 && ri(G.DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0) {
    G.DAT_006ad8c0 = 1;
    if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
      sVar2 = rs(G.DAT_006560f0, param_1 * 0x20);
      sVar3 = rs(G.DAT_006560f0, param_1 * 0x20 + 2);
      bVar1 = u8(G.DAT_006560f0[param_1 * 0x20 + 6]);

      if (G.DAT_006560f0[param_1 * 0x20 + 0x10] === 0xFF) {
        local_20 = -1;
      } else {
        local_20 = u8(G.DAT_006560f0[param_1 * 0x20 + 0x10]);
      }

      iVar5 = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
      if (-1 < iVar5 && param_1 < 0x800) {
        // Decrement civ unit counts (simplified)
      }

      pick_up_unit_005b319e(param_1, 0);
      wi(G.DAT_006560f0, param_1 * 0x20 + 0x1a, 0); // serial = 0 (dead)

      if (G.DAT_00655b16 - 1 === param_1) {
        G.DAT_00655b16 = G.DAT_00655b16 - 1;
      }

      // Clear goto orders targeting this unit
      for (local_10 = 0; local_10 < G.DAT_00655b16; local_10++) {
        if (G.DAT_006560f0[local_10 * 0x20 + 0x0F] === 0x03 &&
            rs(G.DAT_006560f0, local_10 * 0x20 + 0x12) === param_1) {
          G.DAT_006560f0[local_10 * 0x20 + 0x0F] = 0xff;
        }
      }

      if (param_2 !== 0) {
        FUN_0047cea6(-1, sVar2, sVar3);
        if (-1 < local_20) FUN_0047ce1e(local_20);
      }

      if (2 < G.DAT_00655b02 && param_2 !== 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x87, 0xff, -1, sVar2, sVar3, 0, 0, 0, 0, 0);
        if (0 < local_20) {
          FUN_0046b14d(0x88, 0xff, local_20, 0, 0, 0, 0, 0, 0, 0);
        }
        XD_FlushSendBuffer(5000);
      }
      G.DAT_006ad8c0 = 0;
    } else {
      G.DAT_006ad8c0 = 0;
      G.DAT_006c90c0 = -2;
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
  if (2 < G.DAT_00655b02 && param_2 !== 0) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b488a — clear_unit_visibility (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b488a(param_1) {
  if (-1 < param_1) {
    G.DAT_006560f0[param_1 * 0x20 + 9] = 0;
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
  if (-1 < param_2 && s8(G.DAT_006560f0[param_1 * 0x20 + 7]) !== param_2 && -1 < param_1) {
    G.DAT_006560f0[param_1 * 0x20 + 9] = G.DAT_006560f0[param_1 * 0x20 + 9] | (1 << (param_2 & 0x1f));
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
  G.DAT_006ced4c = -1;
  for (local_8 = 0; G.DAT_006ced4c < 0 && local_8 < 8; local_8++) {
    uVar2 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + param_1);
    iVar3 = s8(G.DAT_00628360[local_8]) + param_2;
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
          (G.DAT_0064c6c0[param_3 * 0x594 + local_20 * 4] & 8) === 0) {
        G.DAT_006ced4c = local_20;
      }
    }
  }
  return -1 < G.DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4b66 — check_adjacent_enemy_units (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4b66(param_1, param_2, param_3) {
  let uVar2;
  let iVar3;
  let local_8;

  G.DAT_006ced4c = -1;
  for (local_8 = 0; G.DAT_006ced4c < 0 && local_8 < 8; local_8++) {
    uVar2 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + param_1);
    let dy = s8(G.DAT_00628360[local_8]);
    iVar3 = FUN_004087c0(uVar2, dy + param_2);
    if (iVar3 !== 0) {
      iVar3 = FUN_005b8d62(uVar2, dy + param_2);
      if (-1 < iVar3 && param_3 !== iVar3 &&
          (G.DAT_0064c6c0[param_3 * 0x594 + iVar3 * 4] & 8) === 0) {
        G.DAT_006ced4c = iVar3;
      }
    }
  }
  return -1 < G.DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4c63 — check_adjacent_enemy_same_domain (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4c63(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3, iVar4;
  let local_8;

  G.DAT_006ced4c = -1;
  iVar1 = FUN_005b89e4(param_1, param_2);
  for (local_8 = 0; G.DAT_006ced4c < 0 && local_8 < 8; local_8++) {
    uVar2 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + param_1);
    iVar3 = s8(G.DAT_00628360[local_8]) + param_2;
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if (iVar4 !== 0) {
      iVar4 = FUN_005b8d62(uVar2, iVar3);
      if (-1 < iVar4 && iVar4 !== param_3) {
        let ocean2 = FUN_005b89e4(uVar2, iVar3);
        if (ocean2 === iVar1 && (G.DAT_0064c6c0[iVar4 * 4 + param_3 * 0x594] & 8) === 0) {
          G.DAT_006ced4c = iVar4;
        }
      }
    }
  }
  return -1 < G.DAT_006ced4c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b4d8c — check_zoc_for_uncitied_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b4d8c(param_1, param_2, param_3) {
  let iVar1;
  let local_8 = 0;
  G.DAT_006ced4c = -1;
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
      uVar2 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + param_1);
      iVar1 = s8(G.DAT_00628360[local_8]) + param_2;
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
    G.DAT_006560f0[param_1 * 0x20 + 9] = G.DAT_006560f0[param_1 * 0x20 + 9] | param_2;
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
    let iVar1 = FUN_005b4de2(rs(G.DAT_006560f0, param_1 * 0x20), rs(G.DAT_006560f0, param_1 * 0x20 + 2), local_8);
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
    if (u8(G.DAT_006560f0[param_1 * 0x20 + 6]) === param_2) return 1;
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
    let unitType = u8(G.DAT_006560f0[param_1 * 0x20 + 6]);
    switch (param_2) {
      case 0: local_8 += s8(G.DAT_0064b1bc[unitType * 0x14 + 0x0C]); break;
      case 1: local_8 += s8(G.DAT_0064b1bc[unitType * 0x14 + 9]); break;
      case 2: case 0xb: local_8++; break;
      case 3: local_8 += s8(G.DAT_0064b1bc[unitType * 0x14 + 8]); break;
      case 4:
        if (rs(G.DAT_006560f0, param_1 * 0x20 + 0x16) >= 0 && G.DAT_0064b1bc[unitType * 0x14 + 0x0E] === 0x01) local_8++;
        break;
      case 5:
        if (G.DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) local_8++;
        break;
      case 6:
        if (G.DAT_0064b1bc[unitType * 0x14 + 5] === 0x02) local_8 += s8(G.DAT_0064b1bc[unitType * 0x14 + 0x0D]);
        else if (G.DAT_0064b1bc[unitType * 0x14 + 5] === 0x00) local_8 += -1;
        break;
      case 7:
        if (G.DAT_0064b1bc[unitType * 0x14 + 5] === 0x01 && s8(G.DAT_0064b1bc[unitType * 0x14 + 7]) > 1) local_8++;
        break;
      case 8:
        if ((G.DAT_0064b1bc[unitType * 0x14 + 1] & 0x10) !== 0) local_8++;
        break;
      case 9:
        if ((G.DAT_0064b1bc[unitType * 0x14] & 0x80) !== 0) local_8++;
        break;
      case 10:
        if ((G.DAT_0064b1bc[unitType * 0x14] & 8) !== 0) local_8++;
        break;
    }
    if (param_2 === 0xb) {
      param_1 = rs(G.DAT_006560f0, param_1 * 0x20 + 0x18);
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
    if (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 0x0E]) === param_2) local_8++;
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
  G.DAT_006ad8f8 = 1;
  if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    if (param_2 !== 0) FUN_005b3b78(param_1, 0);
    local_30 = FUN_005b2d39(param_1);
    if (local_30 === param_1) local_30 = FUN_005b2c82(param_1);

    iVar3 = rs(G.DAT_006560f0, param_1 * 0x20);
    iVar4 = rs(G.DAT_006560f0, param_1 * 0x20 + 2);
    iVar5 = FUN_004087c0(iVar3, iVar4);
    if (iVar5 !== 0) local_10 = FUN_005b89e4(iVar3, iVar4) ? 1 : 0;

    if (param_2 === 0) {
      for (local_38 = local_30; -1 < local_38; local_38 = FUN_005b2c82(local_38)) {
        let flags = ru(G.DAT_006560f0, local_38 * 0x20 + 4);
        ws(G.DAT_006560f0, local_38 * 0x20 + 4, flags & 0xefff);
      }
    } else {
      let ownerCiv = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
      let offCoord = (ownerCiv * 5 + 5) * -0x28;
      FUN_005b36df(param_1, offCoord, offCoord, 0);
    }

    let unitType = u8(G.DAT_006560f0[param_1 * 0x20 + 6]);
    local_28 = s8(G.DAT_0064b1bc[unitType * 0x14 + 0x0D]);
    uVar6 = G.DAT_0064b1bc[unitType * 0x14] & 0x80;
    bVar1 = false;
    if (local_28 === 0 && uVar6 === 0 && (G.DAT_0064b1bc[unitType * 0x14] & 8) !== 0) bVar1 = true;
    if (uVar6 !== 0 || bVar1) local_28 = 0x14;
    if (G.DAT_006560f0[param_1 * 0x20 + 7] === 0) local_28 = 0x14;

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

        let unitDomain = G.DAT_0064b1bc[u8(G.DAT_006560f0[local_38 * 0x20 + 6]) * 0x14 + 5];
        if (unitDomain === expectedDomain) {
          // Check eligibility based on pass (local_18)
          if (bVar1 && (G.DAT_0064b1bc[u8(G.DAT_006560f0[local_38 * 0x20 + 6]) * 0x14 + 1] & 0x10) === 0) {
            // Not eligible — skip
          } else if (local_18 === 0) {
            if (uVar6 !== 0 || bVar1) {
              bVar9 = true;
            } else if (G.DAT_006560f0[local_38 * 0x20 + 0x0F] === 0x03 &&
                       rs(G.DAT_006560f0, local_38 * 0x20 + 0x12) === param_1) {
              bVar9 = true;
            }
          } else if (local_18 === 1) {
            if ((G.DAT_00655b0b & (1 << (G.DAT_006560f0[local_38 * 0x20 + 7] & 0x1f))) === 0) {
              bVar9 = true;
            } else if (local_10 !== 0) {
              bVar9 = true;
            }
          }
        }

        if (param_2 === 0 && (ru(G.DAT_006560f0, local_38 * 0x20 + 4) & 0x1000) !== 0) {
          bVar9 = false;
        }

        if (bVar9) {
          if (local_30 === local_38) local_30 = iVar7;
          if (uVar6 !== 0 || bVar1) {
            if (G.DAT_006560f0[local_38 * 0x20 + 0x0F] !== 0x03) {
              G.DAT_006560f0[local_38 * 0x20 + 0x0F] = 0xff;
            }
          } else {
            FUN_005b2f50(local_38);
            ws(G.DAT_006560f0, local_38 * 0x20 + 0x12, param_1 & 0xFFFF);
          }
          if (param_2 === 0) {
            let flags = ru(G.DAT_006560f0, local_38 * 0x20 + 4);
            ws(G.DAT_006560f0, local_38 * 0x20 + 4, flags | 0x1000);
          } else {
            let ownerCiv = s8(G.DAT_006560f0[local_38 * 0x20 + 7]);
            let offCoord = (ownerCiv * 5 + 5) * -0x28;
            FUN_005b36df(local_38, offCoord, offCoord, 0);
          }
          local_28--;
        }
      }
      local_18++;
    }

    if (2 < G.DAT_00655b02 && param_3 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    G.DAT_006ad8f8 = 0;
  } else {
    G.DAT_006ad8f8 = 0;
    G.DAT_006c9108 = -2;
    FUN_0046b14d(0x49, 0, param_1, param_2, 0, 0, 0, 0, 0, 0);
    local_28 = G.DAT_006c9108;
  }
  return local_28;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b5bab — stack_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b5bab(param_1, param_2) {
  if (-1 < param_1) {
    G.DAT_006ad8fc = 1;
    if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
      if (G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
        FUN_005b542e(param_1, 1, 0);
      } else {
        let ownerCiv = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
        let offCoord = (ownerCiv * 5 + 5) * -0x28;
        FUN_005b36df(param_1, offCoord, offCoord, 0);
      }
      if (2 < G.DAT_00655b02 && param_2 !== 0) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        XD_FlushSendBuffer(5000);
      }
      G.DAT_006ad8fc = 0;
    } else {
      G.DAT_006ad8fc = 0;
      G.DAT_006c9110 = -2;
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

  G.DAT_006ad900 = 1;
  if (2 < G.DAT_00655b02 && FUN_00421f40() === 0) {
    G.DAT_006ad900 = 0;
    G.DAT_006c9118 = -2;
    FUN_0046b14d(0x4d, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    return;
  }

  let local_10 = rs(G.DAT_006560f0, param_1 * 0x20);
  let local_14 = rs(G.DAT_006560f0, param_1 * 0x20 + 2);

  if (G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
    iVar2 = FUN_004087c0(local_10, local_14);
    if (iVar2 === 0) {
      let ownerCiv = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
      if (-local_10 === (ownerCiv * 5 + 5) * 0x28) {
        FUN_005b47fa(param_1, 0);
        // goto cleanup
        if (2 < G.DAT_00655b02 && param_2 !== 0) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          XD_FlushSendBuffer(5000);
        }
        G.DAT_006ad900 = 0;
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

  if (2 < G.DAT_00655b02 && param_2 !== 0) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  G.DAT_006ad900 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6042 — delete_visible (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6042(param_1, param_2) {
  G.DAT_006ad904 = 1;
  if (G.DAT_00655b02 < 3 || FUN_00421f40() !== 0) {
    let iVar2 = rs(G.DAT_006560f0, param_1 * 0x20);
    let iVar3 = rs(G.DAT_006560f0, param_1 * 0x20 + 2);
    FUN_005b5d93(param_1, 0);
    let iVar4 = FUN_004087c0(iVar2, iVar3);
    if (iVar4 !== 0) {
      FUN_0047cea6(iVar2, iVar3);
    }
    if (2 < G.DAT_00655b02 && param_2 !== 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x72, 0xff, iVar2, iVar3, 0, 0, 0, 0, 0, 0);
    }
    G.DAT_006ad904 = 0;
  } else {
    G.DAT_006ad904 = 0;
    G.DAT_006c9120 = -2;
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
    if (G.DAT_0064b1bc[u8(G.DAT_006560f0[local_10 * 0x20 + 6]) * 0x14 + 5] === 0x02) {
      iVar1 = FUN_005b542e(local_10, 0, 0);
      if (local_8 < iVar1) local_8 = iVar1;
    }
  }
  if (2 < G.DAT_00655b02 && param_2 !== 0) {
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
    G.DAT_006560f0[param_1 * 0x20 + 0x0F] = param_2;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b633f — is_unit_active_for_player (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b633f(param_1) {
  let iVar1;
  let local_8 = 0;
  if (-1 < param_1 && param_1 < G.DAT_00655b16 &&
      ri(G.DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0) {
    iVar1 = FUN_004087c0(rs(G.DAT_006560f0, param_1 * 0x20), rs(G.DAT_006560f0, param_1 * 0x20 + 2));
    if (iVar1 !== 0) {
      if (s8(G.DAT_006560f0[param_1 * 0x20 + 7]) === G.DAT_00655b05 &&
          G.DAT_006560f0[param_1 * 0x20 + 0x0F] !== 0x03 &&
          G.DAT_006560f0[param_1 * 0x20 + 0x0F] !== 0x02) {
        iVar1 = FUN_005b2c3d(param_1);
        if (iVar1 !== 0 && (ru(G.DAT_006560f0, param_1 * 0x20 + 4) & 2) === 0) {
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
  if (-1 < param_1 && param_1 < G.DAT_00655b16 &&
      ri(G.DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0 &&
      rs(G.DAT_006560f0, param_1 * 0x20) >= 0) {
    if (G.DAT_006560f0[param_1 * 0x20 + 0x0F] === 0x03) {
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

  local_18 = G.DAT_0064b1b4;
  local_1c = G.DAT_0064b1b0;
  if (-1 < param_1 && param_1 < G.DAT_00655b16 &&
      ri(G.DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0 && G.DAT_00655b05 !== 0) {
    local_18 = rs(G.DAT_006560f0, param_1 * 0x20);
    local_1c = rs(G.DAT_006560f0, param_1 * 0x20 + 2);
    local_c = G.DAT_00655afe;
  }

  for (local_14 = 0; local_14 < 3; local_14++) {
    if (-1 < local_20) break;
    for (param_1 = 0; param_1 < G.DAT_00655b16; param_1++) {
      if (ri(G.DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0) {
        iVar1 = FUN_005b633f(param_1);
        if (iVar1 !== 0 && (ru(G.DAT_006560f0, param_1 * 0x20 + 4) & 0x4000) === 0) {
          if (param_2 !== 1 || s8(G.DAT_006560f0[param_1 * 0x20 + 7]) === G.DAT_006d1da0) {
            iVar1 = FUN_005ae31d(local_18, local_1c, rs(G.DAT_006560f0, param_1 * 0x20), rs(G.DAT_006560f0, param_1 * 0x20 + 2));
            local_10 = iVar1 * 2 + 1;
            if (G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5] !== 0x02) {
              local_10 = iVar1 * 2;
            }
            if (local_10 < local_8) {
              local_8 = local_10;
              local_20 = param_1;
            } else if (local_10 === local_8 && G.DAT_00655afe === param_1) {
              local_20 = param_1;
            }
          }
        }
      }
    }
    if (-1 < local_20) break;
    for (param_1 = 0; param_1 < G.DAT_00655b16; param_1++) {
      if (ri(G.DAT_006560f0, param_1 * 0x20 + 0x1a) !== 0 && (local_14 !== 0 || param_1 !== local_c)) {
        let flags = ru(G.DAT_006560f0, param_1 * 0x20 + 4);
        ws(G.DAT_006560f0, param_1 * 0x20 + 4, flags & 0xbfff);
      }
    }
  }
  return local_20;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6787 — reset_unit_moves_spent (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6787(param_1) {
  G.DAT_006560f0[param_1 * 0x20 + 8] = FUN_005b2a39(param_1) & 0xFF;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b67af — find_nearest_unit (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b67af(param_1, param_2, param_3, param_4) {
  let iVar1;
  let local_10;
  let local_c = -1;
  G.DAT_006ced50 = 9999;
  for (local_10 = 0; local_10 < G.DAT_00655b16; local_10++) {
    if (ri(G.DAT_006560f0, local_10 * 0x20 + 0x1a) !== 0 &&
        (param_3 < 0 || s8(G.DAT_006560f0[local_10 * 0x20 + 7]) === (param_3 & 0xff)) &&
        local_10 !== param_4) {
      iVar1 = FUN_005ae31d(param_1, param_2, rs(G.DAT_006560f0, local_10 * 0x20), rs(G.DAT_006560f0, local_10 * 0x20 + 2));
      if (iVar1 <= G.DAT_006ced50) {
        local_c = local_10;
        G.DAT_006ced50 = iVar1;
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6898 — get_unit_home_city_name (MIXED)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6898(param_1) {
  if (G.DAT_006560f0[param_1 * 0x20 + 0x10] === 0xFF) {
    return 'NONE';
  } else {
    return u8(G.DAT_006560f0[param_1 * 0x20 + 0x10]);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6a58 — clear_unit_orders (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6a58(param_1) {
  if (-1 < param_1) {
    G.DAT_006560f0[param_1 * 0x20 + 0x0F] = 0xff;
    let flags = ru(G.DAT_006560f0, param_1 * 0x20 + 4);
    ws(G.DAT_006560f0, param_1 * 0x20 + 4, flags & 0x7fff);
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
  FUN_0056baff(param_2, param_3, 4, param_5 + 2, param_6, G.DAT_0063605c, 0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b6aea — show_unit_list_dialog (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b6aea(param_1, param_2, param_3) {
  // UI dialog — stubbed
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

export function FUN_005b7fe0() {
  // Map memory allocation — uses OS memory functions
  // In JS, tile data is managed via mem.js initMapTiles
  // Stubbed — map allocation handled by engine init
  G.DAT_006d116a = (G.DAT_006d1160 + 3) >> 2;
  G.DAT_006d116c = (G.DAT_006d1162 + 3) >> 2;
  G.DAT_006d1164 = (G.DAT_006d1160 / 2) * G.DAT_006d1162;
  G.DAT_006365f0 = 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8416 — deallocate_map_tiles (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8416() {
  if (G.DAT_006365f0 !== 0) {
    // Free map memory — no-op in JS (GC handles it)
    G.DAT_006365f0 = 0;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b85fe — generate_resource_seed (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b85fe() {
  let uVar1 = FUN_00421bb0();
  G.DAT_006d1168 = uVar1 & 0x7fff;
  if (G.DAT_006d1168 === 0) G.DAT_006d1168 = 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8635 — save_map_data (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8635(param_1, param_2) {
  // File I/O — stubbed (save handled by engine)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8783 — load_map_data (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8783(param_1, param_2) {
  // File I/O — stubbed (load handled by engine)
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b898b — get_visibility_offset (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b898b(param_1, param_2, param_3) {
  return (G.DAT_006d1160 >> 1) * param_2 + G.DAT_006365c0[param_3] + (param_1 >> 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8a81 — get_tile_continent_id (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8a81(param_1, param_2) {
  // Source: decompiled/block_005B0000.c FUN_005b8a81 (39 bytes)
  const iVar1 = FUN_005b8931(param_1, param_2);
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

export function FUN_005b8af0(param_1, param_2) {
  // Source: decompiled/block_005B0000.c FUN_005b8af0 (42 bytes)
  const iVar1 = FUN_005b8931(param_1, param_2);
  return (tileRead(iVar1, 2) & 0xFF) >> 5;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8b1a — update_visibility_for_tile (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8b1a(param_1, param_2, param_3) {
  if (param_3 !== 0) {
    FUN_005b9d81(param_1, param_2, FUN_005b94d5(param_1, param_2), 0, 1, 0);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8b65 — check_tile_visibility (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8b65(param_1, param_2, param_3) {
  // Source: decompiled/block_005B0000.c FUN_005b8b65 (71 bytes)
  if (param_3 < 0) return 1;
  const iVar2 = FUN_005b8931(param_1, param_2);
  return tileRead(iVar2, 4) & (1 << (param_3 & 0x1f));
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

export function FUN_005b8c18(param_1, param_2) {
  // Source: decompiled/block_005B0000.c FUN_005b8c18 (42 bytes)
  const iVar1 = FUN_005b8931(param_1, param_2);
  return tileRead(iVar1, 5) & 0x0F;
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
        if ((G.DAT_0064c6c0[param_3 * 0x594 + iVar1 * 4] & 8) !== 0) return -1;
        if ((G.DAT_0064c6c0[param_3 * 0x594 + iVar1 * 4] & 4) !== 0) return iVar1;
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
      (((param_1 + param_2) >> 3) * 0xb + (uVar3 >> 2) * 0xd + G.DAT_006d1168 + 8 & 0x1f)) {
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
      G.DAT_00655b12 = G.DAT_00655b12 + 1;
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9179 — global_warming_effect (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9179(param_1, param_2) {
  // Source: decompiled/block_005B0000.c FUN_005b9179 (696 bytes)
  let iVar2 = FUN_004087c0(param_1, param_2);
  if (iVar2 !== 0) {
    FUN_005b9ec6();
    for (let local_8 = 0; local_8 < 9; local_8++) {
      let uVar3 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + param_1);
      iVar2 = s8(G.DAT_00628360[local_8]) + param_2;
      let iVar4 = FUN_004087c0(uVar3, iVar2);
      if (iVar4 !== 0) {
        iVar4 = FUN_0043cf76(uVar3, iVar2);
        if (iVar4 < 0) {
          let isOcean = FUN_005b89e4(uVar3, iVar2);
          if (isOcean === 0) {
            iVar4 = FUN_005b8931(uVar3, iVar2);
            let bVar1 = FUN_005b94d5(uVar3, iVar2);
            if ((bVar1 & 0x42) === 0x40) {
              FUN_005b94fc(uVar3, iVar2, 0x40, 0, 1);
            }
            if (_rand() & 1) {
              FUN_005b94fc(uVar3, iVar2, 0x20, 0, 1);
            }
            if (((tileRead(iVar4, 1) & 8) === 0) || ((tileRead(iVar4, 1) & 4) === 0)) {
              if (_rand() & 1) {
                FUN_005b94fc(uVar3, iVar2, 8, 0, 1);
              }
              if (_rand() & 1) {
                FUN_005b94fc(uVar3, iVar2, 4, 0, 1);
              }
            } else {
              if (_rand() & 1) {
                FUN_005b94fc(uVar3, iVar2, 8, 0, 1);
              }
            }
            for (let local_18 = 1; local_18 < 8; local_18++) {
              FUN_005b8b1a(uVar3, iVar2, local_18);
            }
            iVar4 = _rand();
            if (iVar4 % 3 !== 0) {
              FUN_005b90df(uVar3, iVar2);
            }
            FUN_0047cea6(uVar3, iVar2);
          }
        } else {
          G.DAT_0064f349[iVar4 * 0x58] =
            G.DAT_0064f349[iVar4 * 0x58] - (s8(G.DAT_0064f349[iVar4 * 0x58]) >> 1);
          FUN_0047ce1e(uVar3, iVar2, 0, G.DAT_006d1da0, 1);
        }
      }
    }
    FUN_005b9f1c();
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9431 — check_tech_known_for_city (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9431(param_1, param_2) {
  // Source: decompiled/block_005B0000.c FUN_005b9431 (78 bytes)
  let local_c = [0];
  let local_8 = [0];
  FUN_005ae3bf(param_2, local_c, local_8);
  return (local_8[0] & (G.DAT_00666137[local_c[0] + param_1 * 0x10] & 0xFF)) !== 0;
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

export function FUN_005b94fc(param_1, param_2, param_3, param_4, param_5) {
  // Source: decompiled/block_005B0000.c FUN_005b94fc (330 bytes)
  const iVar2 = FUN_005b8931(param_1, param_2);
  const cVar1 = tileRead(iVar2, 1);
  if (param_4 === 0) {
    tileWrite(iVar2, 1, tileRead(iVar2, 1) & ~(param_3 & 0xFF));
  } else {
    tileWrite(iVar2, 1, tileRead(iVar2, 1) | (param_3 & 0xFF));
  }
  if (param_5 !== 0 && tileRead(iVar2, 1) !== cVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(0, param_1, param_2, param_3, param_4, 0);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b9646(param_1, param_2, param_3, param_4) {
  // Source: decompiled/block_005B0000.c FUN_005b9646 (295 bytes)
  const iVar2 = FUN_005b8931(param_1, param_2);
  const bVar1 = tileRead(iVar2, 0);
  let val = tileRead(iVar2, 0) & 0xF0;
  val = val | (param_3 & 0xFF);
  tileWrite(iVar2, 0, val);
  if (param_4 !== 0 && tileRead(iVar2, 0) !== bVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(1, param_1, param_2, param_3, 0, 0);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b976d(param_1, param_2, param_3, param_4, param_5) {
  // Source: decompiled/block_005B0000.c FUN_005b976d (330 bytes)
  const iVar2 = FUN_005b8931(param_1, param_2);
  const cVar1 = tileRead(iVar2, 4);
  if (param_4 === 0) {
    tileWrite(iVar2, 4, tileRead(iVar2, 4) & ~(param_3 & 0xFF));
  } else {
    tileWrite(iVar2, 4, tileRead(iVar2, 4) | (param_3 & 0xFF));
  }
  if (param_5 !== 0 && tileRead(iVar2, 4) !== cVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(2, param_1, param_2, param_3, param_4, 0);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b98b7(param_1, param_2, param_3, param_4) {
  // Source: decompiled/block_005B0000.c FUN_005b98b7 (305 bytes)
  const iVar2 = FUN_005b8931(param_1, param_2);
  const cVar1 = tileRead(iVar2, 5);
  let val = tileRead(iVar2, 5) & 0xF0;
  val = val | (param_3 & 0x0F);
  tileWrite(iVar2, 5, val);
  if (param_4 !== 0 && tileRead(iVar2, 5) !== cVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(3, param_1, param_2, param_3, 0, 0);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b99e8(param_1, param_2, param_3, param_4) {
  // Source: decompiled/block_005B0000.c FUN_005b99e8 (333 bytes)
  if (param_3 < 0 || 8 < param_3) {
    param_3 = 0x0F;
  }
  const iVar2 = FUN_005b8931(param_1, param_2);
  const cVar1 = tileRead(iVar2, 5);
  let val = tileRead(iVar2, 5) & 0x0F;
  val = val | ((param_3 << 4) & 0xFF);
  tileWrite(iVar2, 5, val);
  if (param_4 !== 0 && tileRead(iVar2, 5) !== cVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(4, param_1, param_2, param_3, 0, 0);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b9b35(param_1, param_2, param_3, param_4) {
  // Source: decompiled/block_005B0000.c FUN_005b9b35 (276 bytes)
  const iVar2 = FUN_005b8931(param_1, param_2);
  const cVar1 = tileRead(iVar2, 3);
  tileWrite(iVar2, 3, param_3 & 0xFF);
  if (param_4 !== 0 && tileRead(iVar2, 3) !== cVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(5, param_1, param_2, param_3, 0, 0);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b9c49(param_1, param_2, param_3, param_4) {
  // Source: decompiled/block_005B0000.c FUN_005b9c49 (312 bytes)
  const iVar2 = FUN_005b8931(param_1, param_2);
  const cVar1 = tileRead(iVar2, 2);
  let val = tileRead(iVar2, 2) & 0x1F;
  val = ((param_3 & 7) << 5) | val;
  tileWrite(iVar2, 2, val);
  if (param_4 !== 0 && tileRead(iVar2, 2) !== cVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(6, param_1, param_2, param_3, 0, 0);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b9d81(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Source: decompiled/block_005B0000.c FUN_005b9d81 (325 bytes)
  // Uses FUN_005b898b to get offset into visibility layer buffer (param_4 = layer)
  const visOffset = FUN_005b898b(param_1, param_2, param_4);
  if (!G._visData) return; // vis layer buffer not initialized
  const bVar1 = G._visData[visOffset] || 0;
  if (param_5 === 0) {
    G._visData[visOffset] = param_3 & 0xFF;
  } else {
    G._visData[visOffset] = ((G._visData[visOffset] || 0) | (param_3 & 0xFF));
  }
  if (param_6 !== 0 && (G._visData[visOffset] || 0) !== bVar1 && 2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0 && G.DAT_006ad69a !== 0) {
      FUN_005b9fde(7, param_1, param_2, param_3, param_4, param_5);
    } else if (G.DAT_006ad699 !== 0) {
      if (G.DAT_006ad2f7 === 0) {
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

export function FUN_005b9ec6() {
  if (2 < G.DAT_00655b02) {
    G.DAT_006ad699 = 0;
    G.DAT_006ad69a = 1;
    G.DAT_006365f4 = 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b9f1c — end_map_batch_update (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b9f1c() {
  if (2 < G.DAT_00655b02) {
    G.DAT_006ad699 = 1;
    G.DAT_006ad69a = 0;
    if (G.DAT_006ad2f7 === 0) {
      if (1 < G.DAT_006365f4) {
        FUN_0046b14d(0x59, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(5000);
        G.DAT_006365f4 = 1;
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

// DAT_006365f8 lookup: number of int32 words per batch operation type (types 0-7)
const _DAT_006365f8 = [5, 4, 5, 4, 4, 4, 4, 6];

// Batch buffer: DAT_006d1190 is a flat int32 array, _DAT_006d1190 (word 0) is the entry count
if (!G._batchBuf) G._batchBuf = new Int32Array(0x100);

export function FUN_005b9fde(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Source: decompiled/block_005B0000.c FUN_005b9fde (515 bytes)
  if (G.DAT_006ad2f7 !== 0) {
    FUN_005dae6b(7, 0, 0, 0x3de);
  }
  if (0x100 - G.DAT_006365f4 < _DAT_006365f8[param_1] + 1) {
    FUN_0046b14d(0x59, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    // XD_FlushSendBuffer(5000) — network flush, no-op in JS
    G._batchBuf[0] = 0;
    G.DAT_006365f4 = 1;
  }
  G._batchBuf[0] = G._batchBuf[0] + 1;
  G._batchBuf[G.DAT_006365f4] = param_1;
  G.DAT_006365f4 = G.DAT_006365f4 + 1;
  switch (param_1) {
    case 0:
    case 2:
      G._batchBuf[G.DAT_006365f4] = param_2; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_3; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_4; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_5; G.DAT_006365f4++;
      break;
    case 1:
    case 3:
    case 4:
    case 5:
    case 6:
      G._batchBuf[G.DAT_006365f4] = param_2; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_3; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_4; G.DAT_006365f4++;
      break;
    case 7:
      G._batchBuf[G.DAT_006365f4] = param_2; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_3; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_4; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_5; G.DAT_006365f4++;
      G._batchBuf[G.DAT_006365f4] = param_6; G.DAT_006365f4++;
      break;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005ba206 — apply_map_batch (GL)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005ba206(param_1) {
  // Source: decompiled/block_005B0000.c FUN_005ba206 (510 bytes)
  // param_1 is a batch buffer (Int32Array or array-like with int32 entries)
  let local_8 = 0;
  if (2 < G.DAT_00655b02) {
    if (G.DAT_006ad2f7 === 0) {
      FUN_005dae6b(7, 0, 0, 0x416);
    }
    const uVar2 = G.DAT_006ad699;
    G.DAT_006ad699 = 0;
    // Read entry count from first int32 slot
    let entryCount = param_1[local_8];
    local_8 = local_8 + 1;
    for (let local_28 = entryCount; 0 < local_28; local_28--) {
      let iVar1 = param_1[local_8];
      local_8++;
      const local_20 = [];
      let local_24 = 0;
      const numParams = _DAT_006365f8[iVar1] - 1;
      for (; local_24 < numParams; local_24++) {
        local_20[local_24] = param_1[local_8];
        local_8++;
      }
      switch (iVar1) {
        case 0:
          FUN_005b94fc(local_20[0], local_20[1], local_20[2], local_20[3], 1);
          break;
        case 1:
          FUN_005b9646(local_20[0], local_20[1], local_20[2], 1);
          break;
        case 2:
          FUN_005b976d(local_20[0], local_20[1], local_20[2], local_20[3], 1);
          break;
        case 3:
          FUN_005b98b7(local_20[0], local_20[1], local_20[2], 1);
          break;
        case 4:
          FUN_005b99e8(local_20[0], local_20[1], local_20[2], 1);
          break;
        case 5:
          FUN_005b9b35(local_20[0], local_20[1], local_20[2], 1);
          break;
        case 6:
          FUN_005b9c49(local_20[0], local_20[1], local_20[2], 1);
          break;
        case 7:
          // local_20[4] overflows into local_10 on the C stack
          FUN_005b9d81(local_20[0], local_20[1], local_20[2], local_20[3], local_20[4], 1);
          break;
      }
    }
    G.DAT_006ad699 = uVar2;
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

export function FUN_005badf0(param_1, param_2, param_3) {
  // Builds a file path from directory + filename
  return param_2 + '\\' + param_3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baeb0 — set_text_render_target (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baeb0(param_1) { G.DAT_006366a8 = param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUN_005baec8 — set_text_render_psheet (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baec8(param_1) { G.DAT_006366ac = param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUN_005baee0 — set_text_render_params (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baee0(param_1, param_2, param_3, param_4) {
  G.DAT_006366b0 = param_1;
  G.DAT_006366b4 = param_2;
  if (-1 < param_3) G.DAT_006366b8 = param_3;
  if (-1 < param_4) G.DAT_006366bc = param_4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baf24 — set_text_bold (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baf24(param_1) {
  G.DAT_006366c0 = param_1 !== 0 ? 1 : 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005baf57 — draw_text (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005baf57(param_1, param_2, param_3, param_4) { return param_3; /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb024 — draw_text_centered (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb024(param_1, param_2, param_3, param_4, param_5) { return 0; /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_005bb0af — draw_text_right_aligned (UI)
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb0af(param_1, param_2, param_3, param_4, param_5) { return param_3; /* UI — stubbed */ }


// ═══════════════════════════════════════════════════════════════════
// Remaining functions: UI/GDI/Window management — all stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_005bb3f0(p1, p2, p3, p4, p5, p6, p7) { /* UI — stubbed */ }
export function FUN_005bb463(p1, p2, p3, p4, p5, p6, p7, p8) { /* UI — stubbed */ }
export function FUN_005bb4ae(p1, p2, p3, p4, p5, p6, p7, p8) { /* UI — stubbed */ }
export function FUN_005bb525(p1, p2, p3, p4, p5, p6, p7, p8, p9) { /* UI — stubbed */ }
export function FUN_005bb574() { /* UI — stubbed */ }
export function FUN_005bb5be(param_1) { return false; /* UI — stubbed */ }
export function FUN_005bb621(param_1, param_2) { /* Win32 UI — stubbed */ }
export function FUN_005bb6c7(param_1, param_2) { /* UI — stubbed */ }
export function FUN_005bb760(p1, p2, p3, p4, p5, p6) { /* UI — stubbed */ }
export function FUN_005bb7c3(p1, p2, p3, p4, p5, p6, p7) { /* UI — stubbed */ }
export function FUN_005bb80a(p1, p2, p3, p4, p5, p6, p7) { /* UI — stubbed */ }
export function FUN_005bb871(p1, p2, p3, p4, p5, p6, p7, p8) { /* UI — stubbed */ }
export function FUN_005bb8c0() { return 0; /* UI — stubbed */ }
export function FUN_005bb8e0(param_1, param_2) { /* UI — stubbed */ }
export function FUN_005bb910(param_1, param_2) { /* UI — stubbed */ }
export function FUN_005bb950(param_1, param_2) { /* UI — stubbed */ }
export function FUN_005bb990() { /* UI — stubbed */ }
export function FUN_005bb9c0() { /* Win32 PeekMessage — no-op */ }
export function FUN_005bba1d() { /* Win32 PeekMessage — no-op */ }
export function gdi_BA4F() { return 0; /* Win32 message pump — no-op */ }
export function gdi_BAB8() { return false; /* Win32 — no-op */ }
export function FUN_005bbb0a() { /* Win32 — no-op */ }
export function FUN_005bbb32() { /* Win32 — no-op */ }
export function FUN_005bbb5a(param_1) { /* WinExec — no-op */ }
export function gdi_BB76() { return false; /* Win32 — no-op */ }
export function FUN_005bbbce() { /* Win32 — no-op */ }
export function create_window_BC10(p1, p2, p3, p4, p5, p6, p7) { return null; /* Win32 CreateWindow — no-op */ }
export function FUN_005bbfee(param_1, param_2) { /* EnableWindow — no-op */ }
export function FUN_005bc019(param_1, param_2) { /* SetWindowLong — no-op */ }
export function FUN_005bc032(param_1) { return 0; /* IsWindowVisible — no-op */ }
export function send_msg_C07E(param_1) { /* SendMessage WM_CLOSE — no-op */ }
export function manage_window_C0AB(param_1) { return 0; /* DestroyWindow — no-op */ }
export function FUN_005bc173() { /* window stack iteration — no-op */ }
export function FUN_005bc1b5(param_1) { /* push window stack — no-op */ }
export function FUN_005bc1db(param_1) { /* pop window stack — no-op */ }
export function update_palette_C280(param_1, param_2) { /* palette update — no-op */ }
export function invalidate_C35E(p1, p2, p3, p4) { /* brush creation — no-op */ }
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
export function FUN_005bcad7(p1, p2, p3, p4, p5) { /* ClientToScreen — no-op */ }
export function FUN_005bcb26(p1, p2, p3, p4, p5) { /* MapWindowPoints — no-op */ }
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
export function FUN_005bd987(p1, p2, p3, p4) { return 0; /* load LBM image — no-op */ }
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
export function FUN_005bf071(p1, p2, p3, p4) { /* load GIF file — no-op */ }
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

function SetFocus(a) {}
function XD_FlushSendBuffer(a) {}
function FUN_0043d07a(a, b, c, d, e) { return -1; }
function debug_log(a) {}
