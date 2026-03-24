// ═══════════════════════════════════════════════════════════════════
// block_005F0000.js — Mechanical transpilation of block_005F0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005F0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005F0000.c
//
// This block is almost entirely CRT library functions (malloc, free,
// printf, fopen, memcpy, strlen, etc.), MSVC exception handling
// infrastructure, and MFC/Win32 UI widget code. None of these are
// game logic — they are framework/runtime support. All are marked
// with DEVIATION: Win32 API or DEVIATION: C runtime as appropriate.
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';


// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════

let DAT_00639dc8 = 0;       // active control instance pointer
let DAT_00639e40 = 0;       // SEH context ECX
let DAT_00639e3c = 0;       // SEH context EAX
let DAT_00639e44 = 0;       // SEH context EBP
let DAT_00639e50 = 0;       // rand seed
let DAT_0063a018 = 0;       // saved exception record
let DAT_0063a01c = 0;       // saved context record
let DAT_0063a020 = 0;       // SE translator function
let DAT_0063a024 = 0;       // terminate handler
let DAT_0063a068 = 0;       // LCMapStringW availability flag
let DAT_0063a06c = 0;       // LCMapStringA availability flag
let DAT_0063a078 = 0;       // locale info pointer
let DAT_0063a088 = 0;       // system code page
let DAT_0063a29c = 0;       // MB_CUR_MAX value
let DAT_0063ac54 = 0x480;   // SBH threshold
let DAT_0063ac50 = 0;       // SBH decommit page counter
let DAT_0063ac48 = 0;       // SBH region initialized flag
let DAT_006e5474 = 0;       // debug heap total alloc bytes
let DAT_006e547c = 0;       // debug heap current alloc bytes
let DAT_006e5480 = 0;       // debug heap peak alloc bytes
let DAT_006e5470 = 0;       // debug heap last block pointer
let DAT_006e5478 = 0;       // debug heap first block pointer
let DAT_00639f70 = 0;       // CRT debug flags
let DAT_00639f74 = 0;       // allocation request counter
let DAT_00639f78 = 0;       // allocation break request
let DAT_006e6b68 = 0;       // onexit table pointer
let DAT_006e6b54 = 0;       // onexit table end pointer
let DAT_006e6b48 = 0;       // client dump hook
let DAT_006e6b30 = 0;       // report hook
let DAT_006e6b2c = 0;       // max open file handles
let DAT_006e69e0 = 0;       // max streams
let DAT_006e69e4 = 0;       // process heap handle
let DAT_006e5694 = 0;       // stream table pointer
let DAT_006e6b3c = 0;       // command line pointer
let DAT_00639fc0 = 0;       // environment strings pointer
let DAT_00639fcc = 0;       // console app flag
let DAT_00639fd0 = 0;       // console output flag
let DAT_00639f14 = 0;       // errno
let DAT_00639f18 = 0;       // doserrno
let DAT_00639f5c = 0;       // exit flag
let DAT_00639f54 = 0;       // cexit flag
let DAT_00639f60 = 0;       // memory leak dump done flag
let DAT_0063a428 = 1;       // new handler mode
let DAT_006e54a0 = 0;       // new handler function pointer
let DAT_006e54a4 = 0;       // fltout result pointer
let DAT_0063aef8 = 0;       // cfltcvt _g mode flag
let DAT_0063aefc = 0;       // cfltcvt exponent
let DAT_0063af00 = 0;       // cfltcvt precision crop flag
let DAT_0063a2a0 = 0x2e;    // decimal point character '.'
let DAT_00639fa8 = 0;       // user math error handler
let DAT_0063af94 = 0;       // env strings W availability
let DAT_0063af98 = 0;       // env strings A availability
let DAT_0063b0a4 = 0;       // multibyte code page
let DAT_0063b0a8 = 0;       // multibyte LCID
let DAT_0063b0bc = 0;       // MBCS fallback flag
let DAT_0063b248 = 0;       // NMSG banner callback
let DAT_00639f20 = 0;       // OS version info


// ═══════════════════════════════════════════════════════════════════
// UI WIDGET / CONTROL FUNCTIONS (0x005F0056 - 0x005F1A40)
//
// These are MFC-style UI control/widget methods. They operate on
// `in_ECX` (the `this` pointer in __thiscall convention). In JS
// they take an explicit `self` parameter.
// ═══════════════════════════════════════════════════════════════════


// FUN_005f0056 — ui_control_init_surface
export function FUN_005f0056(self) {
  FUN_005ef65a(self[0x2c]);
  if (self[0x2e] === 0) {
    let uVar1 = FUN_005e0cc0();
    FUN_005e8e06(self[0], uVar1);
    self[0x2e] = 1;
  }
}

// FUN_005f00b8 — ui_control_redraw
export function FUN_005f00b8(self) {
  let local_14 = { left: 0, top: 0, right: self[0x2c] + 0xc, bottom: self[0x2c] + 8 };
  FUN_005ef65a(self[0x2c]);
  let iVar1 = FUN_005e6297(local_14, self[0x2d]);
  if (iVar1 === 1) {
    if (self[0x2e] === 0) {
      let uVar2 = FUN_005e0cc0();
      FUN_005e8e06(self[0], uVar2);
      self[0x2e] = 1;
    }
    FUN_005f02f3(self);
  }
}

// FUN_005f0169 — ui_control_handle_input
export function FUN_005f0169(self, param_1, param_2, param_3) {
  let uVar1 = FUN_005ef4e3(self[0xb0 / 4], param_1, param_2, param_3);
  FUN_005f00b8(self);
  return uVar1;
}

// FUN_005f01ad — ui_control_set_index
export function FUN_005f01ad(self, param_1) {
  self[0x2b] = param_1;
  if (self[0] === 0) {
    self[0x2e] = 0;
  } else {
    let uVar1 = FUN_005e0cc0();
    FUN_005e8e06(self[0], uVar1);
    self[0x2e] = 1;
  }
}

// FUN_005f0213 — ui_control_paint
export function FUN_005f0213(self) {
  let local_14 = { left: 0, top: 0, right: self[2], bottom: self[1] };
  let uVar1 = FUN_005e8f4b(self[0], local_14, self);
  FUN_005e635f(uVar1, local_14, self);
}

// FUN_005f0266 — ui_list_add_item
export function FUN_005f0266(self, param_1) {
  FUN_005f05b0(self);
  FUN_005f05f0(self, param_1);
}

// FUN_005f029e — ui_list_clear_all
export function FUN_005f029e(self) {
  let local_8 = FUN_005f0590(self);
  while (local_8 !== 0) {
    FUN_005f0c69(self);
    local_8 = FUN_005f0590(self);
  }
}

// FUN_005f02f3 — ui_list_iterate_paint
export function FUN_005f02f3(self) {
  let local_8 = FUN_005f0590(self);
  while (local_8 !== 0) {
    FUN_005f15f2(self);
    local_8 = FUN_005f05d0(self);
  }
}

// FUN_005f0342 — ui_list_iterate_hide
export function FUN_005f0342(self) {
  let local_8 = FUN_005f0590(self);
  while (local_8 !== 0) {
    FUN_005f1683(self);
    local_8 = FUN_005f05d0(self);
  }
}

// FUN_005f0391 — ui_control_dispatch_message
export function FUN_005f0391(self, param_1, param_2, param_3) {
  if (self[0xcc / 4] !== 0 && param_1 === 0x200) {
    let p_Var1 = FUN_005f0620(self[0xcc / 4]);
    if (param_2 < p_Var1[0] || p_Var1[2] < param_2 || param_3 < p_Var1[1] || p_Var1[3] < param_3) {
      FUN_005f130f(self, 0xfff0, param_2, param_3);
      self[0xcc / 4] = 0;
    }
  }
  let iVar2 = FUN_005f0590(self);
  while (true) {
    if (iVar2 === 0) return 0;
    let iVar3 = FUN_005f130f(self, param_1, param_2, param_3);
    if (iVar3 !== 0) break;
    iVar2 = FUN_005f05d0(self);
  }
  if (param_1 === 0x200) {
    self[0xcc / 4] = iVar2;
  }
  return 1;
}

// FUN_005f04c0 — ui_linked_list_destructor_wrapper
export function FUN_005f04c0(self) {
  FUN_005f04fe(self);
  FUN_005f0511();
}

// FUN_005f04fe — ui_linked_list_clear
export function FUN_005f04fe(self) {
  FUN_005f0724(self);
}

// FUN_005f0511 — SEH_epilog (no-op in JS)
// Source: decompiled/block_005F0000.c FUN_005f0511 (14 bytes)
export function FUN_005f0511() {
  // DEVIATION: Win32 -- SEH epilog
}

// FUN_005f0520 — ui_linked_list_constructor
export function FUN_005f0520(self) {
  FUN_005f06ee(self);
  return self;
}

// FUN_005f0590 — linked_list_get_first
export function FUN_005f0590(self) {
  return FUN_005f0770(self);
}

// FUN_005f05b0 — linked_list_get_last
export function FUN_005f05b0(self) {
  return FUN_005f07b3(self);
}

// FUN_005f05d0 — linked_list_get_next
export function FUN_005f05d0(self) {
  return FUN_005f0833(self);
}

// FUN_005f05f0 — linked_list_append
export function FUN_005f05f0(self, param_1) {
  FUN_005f08fb(self, param_1);
}

// FUN_005f0620 — ios_lockptr (returns offset 0x38 from this)
export function FUN_005f0620(self) {
  return self + 0x38;
}

// FUN_005f0640 — linked_list_node_init
export function FUN_005f0640(self) {
  self[0] = 0;
  self[1] = 0;
  self[2] = 0;
  return self;
}

// ~CDataBoundProperty — destructor (no-op)
// Source: decompiled/block_005F0000.c ~CDataBoundProperty (22 bytes)
export function CDataBoundProperty_destructor(self) { // C: return; (truly empty function) }

// FUN_005f068c — node_set_next
export function FUN_005f068c(self, param_1) {
  self[1] = param_1;
}

// FUN_005f06ad — node_set_prev
export function FUN_005f06ad(self, param_1) {
  self[2] = param_1;
}

// FUN_005f06ce — node_set_data
export function FUN_005f06ce(self, param_1) {
  self[0] = param_1;
}

// FUN_005f06ee — linked_list_init
export function FUN_005f06ee(self) {
  self[0] = 0;
  self[1] = 0;
  self[2] = 0;
  return self;
}

// FUN_005f0724 — linked_list_clear_recursive
export function FUN_005f0724(self) {
  FUN_005f0e13(self);
}

// FUN_005f0742 — linked_list_is_empty
export function FUN_005f0742(self) {
  return self[0] === 0;
}

// FUN_005f0770 — linked_list_move_to_first
export function FUN_005f0770(self) {
  if (self[0] === 0) {
    return 0;
  } else {
    self[2] = self[0];
    return FUN_005f0e50(self);
  }
}

// FUN_005f07b3 — linked_list_move_to_last
export function FUN_005f07b3(self) {
  if (self[1] === 0) {
    return 0;
  } else {
    self[2] = self[1];
    return FUN_005f0e50(self);
  }
}

// pDNameNode::length — linked_list_length_check
export function FUN_005f07f9(self) {
  if (self[2] === 0) {
    return 0;
  } else {
    return FUN_005f0e50(self);
  }
}

// FUN_005f0833 — linked_list_advance
export function FUN_005f0833(self) {
  if (self[2] === 0) {
    return 0;
  } else {
    let uVar1 = FUN_005f0e70(self);
    self[2] = uVar1;
    if (self[2] === 0) {
      return 0;
    } else {
      return FUN_005f0e50(self);
    }
  }
}

// FUN_005f0897 — linked_list_retreat
export function FUN_005f0897(self) {
  if (self[2] === 0) {
    return 0;
  } else {
    let uVar1 = FUN_005f0e90(self);
    self[2] = uVar1;
    if (self[2] === 0) {
      return 0;
    } else {
      return FUN_005f0e50(self);
    }
  }
}

// FUN_005f08fb — linked_list_push_back
export function FUN_005f08fb(self, param_1) {
  let local_1c = { 0: 0, 1: 0, 2: 0 }; // new node
  let iVar2 = FUN_005f0742(self);
  if (iVar2 === 0) {
    FUN_005f06ce(local_1c, param_1);
    FUN_005f06ad(local_1c, self[1]);
    FUN_005f068c(local_1c, local_1c);
    self[1] = local_1c;
    self[2] = self[1];
  } else {
    self[0] = local_1c;
    self[1] = local_1c;
    self[2] = local_1c;
    FUN_005f06ce(local_1c, param_1);
  }
}

// FUN_005f0a04 — linked_list_insert
export function FUN_005f0a04(self, param_1) {
  let iVar1 = FUN_005f0742(self);
  if (iVar1 === 0) {
    if (self[2] === 0) {
      FUN_005f08fb(self, param_1);
    } else if (self[2] === self[0]) {
      let local_24 = { 0: 0, 1: 0, 2: 0 };
      FUN_005f06ad(self, local_24);
      FUN_005f06ce(local_24, param_1);
      FUN_005f068c(local_24, self[2]);
      self[2] = local_24;
      self[0] = self[2];
    } else {
      let local_2c = { 0: 0, 1: 0, 2: 0 };
      let uVar3 = FUN_005f0e90(self);
      FUN_005f068c(local_2c, local_2c);
      FUN_005f06ad(local_2c, local_2c);
      FUN_005f06ce(local_2c, param_1);
      FUN_005f06ad(local_2c, uVar3);
      FUN_005f068c(local_2c, self[2]);
      self[2] = local_2c;
    }
  } else {
    FUN_005f08fb(self, param_1);
  }
}

// FUN_005f0bce — linked_list_find
export function FUN_005f0bce(self, param_1) {
  let local_8 = FUN_005f0770(self);
  while (true) {
    if (local_8 === 0) return 0;
    if (local_8 === param_1) break;
    local_8 = FUN_005f0833(self);
  }
  return local_8;
}

// FUN_005f0c21 — linked_list_count
export function FUN_005f0c21(self) {
  let local_c = 0;
  let local_8 = FUN_005f0770(self);
  while (local_8 !== 0) {
    local_c = local_c + 1;
    local_8 = FUN_005f0833(self);
  }
  return local_c;
}

// FUN_005f0c69 — linked_list_remove_current
export function FUN_005f0c69(self) {
  if (self[2] !== 0 && !FUN_005f0742(self)) {
    let iVar1 = FUN_005f0e90(self);
    let iVar2 = FUN_005f0e70(self);
    if (iVar1 === 0 && iVar2 === 0) {
      self[0] = 0;
      self[1] = 0;
      self[2] = 0;
    } else if (iVar1 === 0) {
      self[0] = iVar2;
      FUN_005f06ad(self, 0);
      self[2] = self[0];
    } else if (iVar2 === 0) {
      self[1] = iVar1;
      FUN_005f068c(self, 0);
      self[2] = self[1];
    } else {
      FUN_005f068c(self, iVar2);
      FUN_005f06ad(self, iVar1);
      self[2] = iVar2;
    }
  }
}

// FUN_005f0e13 — linked_list_clear_all
export function FUN_005f0e13(self) {
  FUN_005f0770(self);
  while (self[2] !== 0) {
    FUN_005f0c69(self);
  }
}

// FUN_005f0e50 — node_get_data
export function FUN_005f0e50(self) {
  return self[0];
}

// FUN_005f0e70 — node_get_next
export function FUN_005f0e70(self) {
  return self[1];
}

// FUN_005f0e90 — node_get_prev
export function FUN_005f0e90(self) {
  return self[2];
}

// scalar_deleting_destructor — CDataBoundProperty (no-op)
export function CDataBoundProperty_scalar_deleting_destructor(self, param_1) {
  CDataBoundProperty_destructor(self);
  return self;
}

// FUN_005f0ef0 — get_active_control
export function FUN_005f0ef0() {
  return DAT_00639dc8;
}

// FUN_005f0f05 — set_active_control
export function FUN_005f0f05(param_1) {
  DAT_00639dc8 = param_1;
}

// FUN_005f0f1d — dd_control_constructor
export function FUN_005f0f1d(self) {
  FUN_005f0520(self);
  self[2] = 0;
  self[3] = 0;
  self[9] = 0;
  self[8] = 0;
  self[9] = 0;
  self[10] = 0;
  self[0xb] = 0;
  self[7] = 0;
  return self;
}

// FUN_005f0fe9 — dd_control_constructor_with_parent
export function FUN_005f0fe9(self, param_1) {
  FUN_005f0520(self);
  self[2] = param_1;
  self[3] = 0;
  self[9] = 0;
  self[8] = 0;
  self[9] = 0;
  self[10] = 0;
  self[0xb] = 0;
  self[7] = 0;
  return self;
}

// FUN_005f10b6 — dd_control_constructor_with_child
export function FUN_005f10b6(self, param_1) {
  FUN_005f0520(self);
  self[2] = 0;
  self[3] = param_1;
  self[9] = 0;
  self[8] = 0;
  self[9] = 0;
  self[10] = 0;
  self[0xb] = 0;
  self[7] = 0;
  return self;
}

// FUN_005f1183 — dd_control_destructor
export function FUN_005f1183(self) {
  FUN_005f195a(self);
  FUN_005f11d2(self);
  FUN_005f11e8();
}

// FUN_005f11d2 — dd_control_cleanup
export function FUN_005f11d2(self) {
  FUN_005f04c0(self);
}

// FUN_005f11e8 — SEH_epilog2 (no-op)
// Source: decompiled/block_005F0000.c FUN_005f11e8 (14 bytes)
export function FUN_005f11e8() {
  // DEVIATION: Win32 -- SEH epilog
}

// FUN_005f11f6 — CTestCmdUI_set_state
export function FUN_005f11f6(self, param_1) {
  self[3] = 0;
  self[2] = param_1;
}

// CTestCmdUI::Enable
export function CTestCmdUI_Enable(self, param_1) {
  self[3] = param_1;
  self[2] = 0;
}

// FUN_005f124c — dd_control_setup_rect
export function FUN_005f124c(self, param_1, param_2) {
  self[1] = param_1;
  self[0xe] = param_2[0];
  self[0xf] = param_2[1];
  self[0x10] = param_2[2];
  self[0x11] = param_2[3];
  let uVar1 = FUN_005f1514(self);
  self[2] = uVar1;
  if (self[3] === 0) {
    if (self[2] !== 0) {
      FUN_005f0266(self, self);
    }
  } else {
    FUN_005f1928(self, self);
  }
}

// FUN_005f130f — dd_control_process_message
export function FUN_005f130f(self, param_1, param_2, param_3) {
  let cVar1 = FUN_005f1a40(self, param_1, param_2, param_3);
  if (cVar1 === 0) {
    FUN_005f0f05(self);
    if (param_1 === 0x100 && self[0xd] !== 0) {
      return 1;
    } else if (param_1 === 0x102 && self[0xd] !== 0) {
      return 1;
    } else if (param_1 === 0xfff0) {
      return 1;
    } else if (param_2 < self[0xe] || param_3 < self[0xf] || self[0x10] < param_2 || self[0x11] < param_3) {
      return 0;
    } else {
      // mouse messages within bounds
      return 1;
    }
  } else {
    return 1;
  }
}

// FUN_005f1514 — find_parent_window
export function FUN_005f1514(self) {
  if (self[2] === 0) {
    if (self[3] === 0) {
      return 0;
    } else {
      let uVar1 = FUN_005f1514(self);
      self[2] = uVar1;
      return self[2];
    }
  } else {
    return self[2];
  }
}

// FUN_005f156d — ensure_parent_window
export function FUN_005f156d(self) {
  if (self[2] === 0) {
    let uVar1 = FUN_005f1514(self);
    self[2] = uVar1;
  }
  // DEVIATION: Win32 API — CSplitterWnd::IsTracking
}

// FUN_005f15a9 — assert_parent_window
export function FUN_005f15a9(self) {
  let iVar1 = FUN_005f1514(self);
  // assertion — no-op in JS
}

// FUN_005f15f2 — child_control_paint
export function FUN_005f15f2(self) {
  // virtual call: paint with rect
  FUN_005f19ef(self);
}

// FUN_005f1622 — control_show
export function FUN_005f1622(self) {
  if (self[0xd] === 0) {
    if (self[3] === 0) {
      FUN_005f0342(self);
    } else {
      FUN_005f19a6(self);
    }
    self[0xd] = 1;
  }
}

// FUN_005f1683 — control_hide
export function FUN_005f1683(self) {
  if (self[0xd] !== 0) {
    FUN_005f19a6(self);
    self[0xd] = 0;
  }
}

// FUN_005f16c4 — set_callback_show
export function FUN_005f16c4(self, param_1) { self[8] = param_1; }

// FUN_005f16e5 — set_callback_click
export function FUN_005f16e5(self, param_1) { self[9] = param_1; }

// FUN_005f1706 — set_callback_paint_child
export function FUN_005f1706(self, param_1) { self[10] = param_1; }

// FUN_005f1727 — set_callback_lbutton
export function FUN_005f1727(self, param_1) { self[0xb] = param_1; }

// FUN_005f1748 — set_callback_rbutton
export function FUN_005f1748(self, param_1) { self[0xc] = param_1; }

// FUN_005f1769 — invoke_show_callback
export function FUN_005f1769(self) {
  if (self[8] !== 0) {
    // (*callback)(self[1])
  }
}

// FUN_005f179c — show_wrapper
export function FUN_005f179c(self) { FUN_005f1622(self); }

// FUN_005f17bc — DEVIATION: Win32 API
// Source: decompiled/block_005F0000.c FUN_005f17bc (24 bytes)
export function FUN_005f17bc() { // C: return; (truly empty function) }

// FUN_005f17d4 — invoke_paint_child_callback
// Source: decompiled/block_005F0000.c FUN_005f17d4 (61 bytes)
export function FUN_005f17d4(self, param_1, param_2) {
  // DEVIATION: MFC
}

// FUN_005f1811 — invoke_lbutton_callback
// Source: decompiled/block_005F0000.c FUN_005f1811 (61 bytes)
export function FUN_005f1811(self, param_1, param_2) {
  // DEVIATION: MFC
}

// FUN_005f184e — invoke_click_callback
// Source: decompiled/block_005F0000.c FUN_005f184e (61 bytes)
export function FUN_005f184e(self, param_1, param_2) {
  // DEVIATION: MFC
}

// FUN_005f188b — invoke_rbutton_callback
// Source: decompiled/block_005F0000.c FUN_005f188b (61 bytes)
export function FUN_005f188b(self, param_1, param_2) {
  // DEVIATION: MFC
}

// FUN_005f18c8 — DEVIATION: Win32 API
// Source: decompiled/block_005F0000.c FUN_005f18c8 (24 bytes)
export function FUN_005f18c8() { // C: return; (truly empty function) }

// FUN_005f18e0 — DEVIATION: Win32 API
// Source: decompiled/block_005F0000.c FUN_005f18e0 (24 bytes)
export function FUN_005f18e0() { // C: return; (truly empty function) }

// FUN_005f18f8 — DEVIATION: Win32 API
// Source: decompiled/block_005F0000.c FUN_005f18f8 (24 bytes)
export function FUN_005f18f8() { // C: return; (truly empty function) }

// FUN_005f1910 — DEVIATION: Win32 API
// Source: decompiled/block_005F0000.c FUN_005f1910 (24 bytes)
export function FUN_005f1910() { // C: return; (truly empty function) }

// FUN_005f1928 — child_list_add
export function FUN_005f1928(self, param_1) {
  FUN_005f05b0(self);
  FUN_005f05f0(self, param_1);
}

// FUN_005f195a — child_list_clear
export function FUN_005f195a(self) {
  let local_8 = FUN_005f0590(self);
  while (local_8 !== 0) {
    FUN_005f0c69(self);
    local_8 = FUN_005f0590(self);
  }
}

// FUN_005f19a6 — child_list_hide_all
export function FUN_005f19a6(self) {
  let local_8 = FUN_005f0590(self);
  while (local_8 !== 0) {
    FUN_005f1683(self);
    local_8 = FUN_005f05d0(self);
  }
}

// FUN_005f19ef — child_list_paint_all
export function FUN_005f19ef(self) {
  let local_8 = FUN_005f0590(self);
  while (local_8 !== 0) {
    FUN_005f15f2(self);
    local_8 = FUN_005f05d0(self);
  }
}

// FUN_005f1a40 — dd_control_check_children
export function FUN_005f1a40(self, param_1, param_2, param_3) {
  if (self[7] !== 0 && param_1 === 0x200) {
    let p_Var1 = FUN_005f0620(self[7]);
    if (param_2 < p_Var1[0] || p_Var1[2] < param_2 || param_3 < p_Var1[1] || p_Var1[3] < param_3) {
      FUN_005f130f(self, 0xfff0, param_2, param_3);
      self[7] = 0;
    }
  }
  let iVar2 = FUN_005f0590(self);
  while (true) {
    if (iVar2 === 0) return 0;
    let iVar3 = FUN_005f130f(self, param_1, param_2, param_3);
    if (iVar3 !== 0) break;
    iVar2 = FUN_005f05d0(self);
  }
  if (param_1 === 0x200) {
    self[7] = iVar2;
  }
  return 1;
}

// CSplitterWnd::IsTracking — DEVIATION: Win32 API
// Source: decompiled/block_005F0000.c IsTracking (31 bytes)
export function CSplitterWnd_IsTracking(self) {
  // DEVIATION: MFC
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// CRT LIBRARY FUNCTIONS
//
// All functions below are MSVC CRT / Win32 / MFC library code.
// They are marked with DEVIATION: C runtime as appropriate.
// ═══════════════════════════════════════════════════════════════════


// Source: decompiled/block_005F0000.c __onexit (181 bytes)
// __onexit — register exit callback (DEVIATION: C runtime)
export function __onexit(_Func) {
  // DEVIATION: C runtime  return _Func;
}

// _atexit — register atexit callback (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _atexit (48 bytes)
export function _atexit(param_1) {
  // DEVIATION: C runtime  return 0;
}

// ___onexitinit — initialize onexit table (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___onexitinit (85 bytes)
export function ___onexitinit() {
  // DEVIATION: C runtime
}

// __global_unwind2 — SEH global unwind (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __global_unwind2 (32 bytes)
export function __global_unwind2(param_1) {
  // DEVIATION: C runtime
}

// __local_unwind2 — SEH local unwind (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __local_unwind2 (104 bytes)
export function __local_unwind2(param_1, param_2) {
  // DEVIATION: C runtime — SEH local unwind
}

// __abnormal_termination — SEH check (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __abnormal_termination (35 bytes)
export function __abnormal_termination() {
  // DEVIATION: C runtime — SEH status check  return 0;
}

// FUN_005f1d95 — save SEH context registers (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FUN_005f1d95 (9 bytes)
export function FUN_005f1d95(param_1) {
  // DEVIATION: C runtime
}

// FUN_005f1d9e — save SEH context (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FUN_005f1d9e (24 bytes)
export function FUN_005f1d9e() {
  // DEVIATION: C runtime
}

// _JumpToContinuation — SEH jump (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _JumpToContinuation (47 bytes)
export function _JumpToContinuation(param_1, param_2) {
  // DEVIATION: C runtime — SEH jump
}

// _CallMemberFunction0 — thunk (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _CallMemberFunction0 (7 bytes)
export function _CallMemberFunction0(param_1, param_2) {
  // DEVIATION: C runtime
}

// FID_conflict:_CallMemberFunction1 (two copies) — thunk (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FID_conflict:_CallMemberFunction1 (7 bytes)
export function FID_conflict__CallMemberFunction1(param_1, param_2) {
  // DEVIATION: C runtime
}

// _UnwindNestedFrames — SEH unwind (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _UnwindNestedFrames (81 bytes)
export function _UnwindNestedFrames(param_1, param_2) {
  // DEVIATION: C runtime — SEH frame unwind
}

// ___CxxFrameHandler — C++ exception handler (DEVIATION: C runtime)
export function ___CxxFrameHandler(param_1, param_2, param_3, param_4) { return 1; }

// ___CxxLongjmpUnwind@4 — longjmp unwind (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___CxxLongjmpUnwind@4 (49 bytes)
export function ___CxxLongjmpUnwind_4(param_1) {
  // DEVIATION: C runtime
}

// _CallCatchBlock2 — catch block caller (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _CallCatchBlock2 (102 bytes)
export function _CallCatchBlock2(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime — C++ EH catch block caller  return 0;
}

// CatchGuardHandler — catch guard (DEVIATION: C runtime)
export function CatchGuardHandler(param_1, param_2, param_3, param_4) { return 1; }

// _CallSETranslator — SE translator (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _CallSETranslator (209 bytes)
export function _CallSETranslator(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: C runtime — SE translator  return 0;
}

// TranslatorGuardHandler — translator guard (DEVIATION: C runtime)
export function TranslatorGuardHandler(param_1, param_2, param_3, param_4) { return 1; }

// FID_conflict:_memcpy — memcpy/memmove (use JS)
export function FID_conflict__memcpy(_Dst, _Src, _Size) {
  if (ArrayBuffer.isView(_Dst) && ArrayBuffer.isView(_Src)) {
    _Dst.set(_Src.subarray(0, _Size));
  }
  return _Dst;
}

// FUN_005f2260 — srand (set rand seed)
export function FUN_005f2260(param_1) {
  DAT_00639e50 = param_1;
}

// _rand — linear congruential PRNG
export function _rand() {
  DAT_00639e50 = (DAT_00639e50 * 0x343fd + 0x269ec3) | 0;
  return (DAT_00639e50 >>> 0x10) & 0x7fff;
}

// FUN_005f22d0 — strcpy (DEVIATION: C runtime)
export function FUN_005f22d0(param_1, param_2) { return param_1; }

// FUN_005f22e0 — strcat (DEVIATION: C runtime)
export function FUN_005f22e0(param_1, param_2) { return param_1; }

// operator_delete — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c operator_delete (162 bytes)
export function operator_delete(param_1) {
  // DEVIATION: C runtime
}

// operator_new — (DEVIATION: C runtime)
export function operator_new(param_1) { return {}; }

// eh_vector_destructor_iterator — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c `eh_vector_destructor_iterator' (148 bytes)
export function _eh_vector_destructor_iterator_(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime — EH vector destructor
}

// __ArrayUnwind — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ArrayUnwind (108 bytes)
export function __ArrayUnwind(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime — array unwind
}

// FID_conflict:ArrayUnwindFilter — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FID_conflict:ArrayUnwindFilter (65 bytes)
export function FID_conflict_ArrayUnwindFilter(param_1) {
  // DEVIATION: C runtime  return 0;
}

// eh_vector_constructor_iterator — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c `eh_vector_constructor_iterator' (152 bytes)
export function _eh_vector_constructor_iterator_(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime — EH vector constructor
}

// FUN_005f26e0 — toupper_offset (subtract 0x20)
export function FUN_005f26e0(param_1) { return param_1 - 0x20; }

// FID_conflict:__toupper_lk / _toupper — (DEVIATION: C runtime, use JS)
export function FID_conflict___toupper_lk(_C) {
  if (_C >= 0x61 && _C <= 0x7a) return _C - 0x20;
  return _C;
}

// _isalpha — (DEVIATION: C runtime)
export function _isalpha(_C) { return ((_C >= 0x41 && _C <= 0x5a) || (_C >= 0x61 && _C <= 0x7a)) ? 1 : 0; }

// _isupper — (DEVIATION: C runtime)
export function _isupper(_C) { return (_C >= 0x41 && _C <= 0x5a) ? 1 : 0; }

// _islower — (DEVIATION: C runtime)
export function _islower(_C) { return (_C >= 0x61 && _C <= 0x7a) ? 1 : 0; }

// _isdigit — (DEVIATION: C runtime)
export function _isdigit(_C) { return (_C >= 0x30 && _C <= 0x39) ? 1 : 0; }

// _isxdigit — (DEVIATION: C runtime)
export function _isxdigit(_C) {
  return ((_C >= 0x30 && _C <= 0x39) || (_C >= 0x41 && _C <= 0x46) || (_C >= 0x61 && _C <= 0x66)) ? 1 : 0;
}

// _isspace — (DEVIATION: C runtime)
export function _isspace(_C) { return (_C === 0x20 || (_C >= 0x09 && _C <= 0x0d)) ? 1 : 0; }

// _ispunct — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _ispunct (68 bytes)
export function _ispunct(_C) {
  // DEVIATION: C runtime  return 0;
}

// _isalnum — (DEVIATION: C runtime)
export function _isalnum(_C) { return (_isalpha(_C) || _isdigit(_C)) ? 1 : 0; }

// _isprint — (DEVIATION: C runtime)
export function _isprint(_C) { return (_C >= 0x20 && _C <= 0x7e) ? 1 : 0; }

// _isgraph — (DEVIATION: C runtime)
export function _isgraph(_C) { return (_C >= 0x21 && _C <= 0x7e) ? 1 : 0; }

// _iscntrl — (DEVIATION: C runtime)
export function _iscntrl(_C) { return (_C < 0x20 || _C === 0x7f) ? 1 : 0; }

// ___isascii — (DEVIATION: C runtime)
export function ___isascii(_C) { return (_C < 0x80) ? 1 : 0; }

// FUN_005f2be0 — toascii
export function FUN_005f2be0(param_1) { return param_1 & 0x7f; }

// ___iscsymf — (DEVIATION: C runtime)
export function ___iscsymf(_C) { return (_isalpha(_C) || _C === 0x5f) ? 1 : 0; }

// ___iscsym — (DEVIATION: C runtime)
export function ___iscsym(_C) { return (_isalnum(_C) || _C === 0x5f) ? 1 : 0; }

// __fsopen — file open (DEVIATION: C runtime)
export function __fsopen(_Filename, _Mode, _ShFlag) {
  // DEVIATION: C runtime
  return null;
}

// _fopen — file open (DEVIATION: C runtime)
export function _fopen(_Filename, _Mode) {
  // DEVIATION: C runtime
  return null;
}

// _fclose — file close (DEVIATION: C runtime)
export function _fclose(_File) { return -1; }

// _strncpy — (DEVIATION: C runtime)
export function _strncpy(_Dest, _Source, _Count) { return _Dest; }

// _sprintf — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _sprintf (236 bytes)
export function _sprintf(_Dest, _Format) {
  // DEVIATION: C runtime  return 0;
}

// _atol — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _atol (282 bytes)
export function _atol(_Str) {
  // DEVIATION: C runtime  return 0;
}

// _atoi — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _atoi (28 bytes)
export function _atoi(_Str) {
  // DEVIATION: C runtime  return 0;
}

// __atoi64 — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __atoi64 (324 bytes)
export function __atoi64(_String) {
  // DEVIATION: C runtime  return 0;
}

// _fputs — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _fputs (202 bytes)
export function _fputs(_Str, _File) {
  // DEVIATION: C runtime  return 0;
}

// _strlen — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _strlen (123 bytes)
export function _strlen(_Str) {
  // DEVIATION: C runtime  return 0;
}

// _memset — (DEVIATION: C runtime)
export function _memset(_Dst, _Val, _Size) { return _Dst; }

// _strcmp — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _strcmp (129 bytes)
export function _strcmp(_Str1, _Str2) {
  // DEVIATION: C runtime  return 0;
}

// FUN_005f35f0 — stack probe (no-op)
// Source: decompiled/block_005F0000.c FUN_005f35f0 (47 bytes)
export function FUN_005f35f0() {
  // DEVIATION: C runtime
}

// _strchr — (DEVIATION: C runtime)
export function _strchr(_Str, _Val) {
  // DEVIATION: C runtime
  return null;
}

// _strncmp — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _strncmp (56 bytes)
export function _strncmp(_Str1, _Str2, _MaxCount) {
  // DEVIATION: C runtime  return 0;
}

// _fread — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _fread (456 bytes)
export function _fread(_DstBuf, _ElementSize, _Count, _File) {
  // DEVIATION: C runtime  return 0;
}

// _fwrite — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _fwrite (536 bytes)
export function _fwrite(_Str, _Size, _Count, _File) {
  // DEVIATION: C runtime  return 0;
}

// __chdir — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __chdir (226 bytes)
export function __chdir(_Path) {
  // DEVIATION: C runtime  return 0;
}

// _strrchr — (DEVIATION: C runtime)
export function _strrchr(_Str, _Ch) {
  // DEVIATION: C runtime
  return null;
}

// _fgets — (DEVIATION: C runtime)
export function _fgets(_Buf, _MaxCount, _File) {
  // DEVIATION: C runtime
  return null;
}

// __filbuf — (DEVIATION: C runtime)
export function __filbuf(_File) { return -1; }

// _fputc — (DEVIATION: C runtime)
export function _fputc(_Ch, _File) { return _Ch; }

// _putc — (DEVIATION: C runtime)
export function _putc(_Ch, _File) { return _fputc(_Ch, _File); }

// _fgetc — (DEVIATION: C runtime)
export function _fgetc(_File) { return -1; }

// _getc — (DEVIATION: C runtime)
export function _getc(_File) { return _fgetc(_File); }

// __strnicmp — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __strnicmp (173 bytes)
export function __strnicmp(_Str1, _Str2, _MaxCount) {
  // DEVIATION: C runtime  return 0;
}

// __cinit — CRT init (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cinit (66 bytes)
export function __cinit(param_1) {
  // DEVIATION: C runtime  return 0;
}

// _exit — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _exit (27 bytes)
export function _exit_fn(_Code) {
  // DEVIATION: C runtime
}

// __exit — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __exit (27 bytes)
export function __exit(param_1) {
  // DEVIATION: C runtime
}

// __cexit — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cexit (25 bytes)
export function __cexit() {
  // DEVIATION: C runtime
}

// __c_exit — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __c_exit (25 bytes)
export function __c_exit() {
  // DEVIATION: C runtime
}

// doexit — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c doexit (251 bytes)
export function doexit(param_1, param_2, param_3) {
  // DEVIATION: C runtime
}

// __initterm — call initializer table (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __initterm (49 bytes)
export function __initterm(param_1, param_2) {
  // DEVIATION: C runtime
}

// _strstr — (DEVIATION: C runtime)
export function _strstr(_Str, _SubStr) {
  // DEVIATION: C runtime
  return null;
}

// _malloc — (DEVIATION: C runtime)
export function _malloc(_Size) {
  // DEVIATION: C runtime
  return null;
}

// __malloc_dbg — (DEVIATION: C runtime)
export function __malloc_dbg(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime
  return null;
}

// __nh_malloc — (DEVIATION: C runtime)
export function __nh_malloc(_Size, _NhFlag) {
  // DEVIATION: C runtime
  return null;
}

// __nh_malloc_dbg — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __nh_malloc_dbg (101 bytes)
export function __nh_malloc_dbg(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime  return 0;
}

// __heap_alloc — (DEVIATION: C runtime)
export function __heap_alloc(_Size) {
  // DEVIATION: C runtime
  return null;
}

// __heap_alloc_dbg — (DEVIATION: C runtime)
export function __heap_alloc_dbg(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime
  return null;
}

// _calloc — (DEVIATION: C runtime)
export function _calloc(_Count, _Size) {
  // DEVIATION: C runtime
  return null;
}

// __calloc_dbg — (DEVIATION: C runtime)
export function __calloc_dbg(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime
  return null;
}

// FID_conflict:__expand / _realloc — (DEVIATION: C runtime)
export function FID_conflict___expand(_Memory, _NewSize) {
  // DEVIATION: C runtime
  return null;
}

// __realloc_dbg — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __realloc_dbg (55 bytes)
export function __realloc_dbg(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime  return 0;
}

// realloc_help — (DEVIATION: C runtime)
export function realloc_help(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: C runtime
  return null;
}

// __expand_dbg — (DEVIATION: C runtime)
export function __expand_dbg(param_1, param_2, param_3, param_4, param_5) {
  let uVar1 = realloc_help(param_1, param_2, param_3, param_4, param_5, 0);
  return uVar1;
}

// FUN_005f4f70 — free wrapper (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FUN_005f4f70 (25 bytes)
export function FUN_005f4f70(param_1) {
  // DEVIATION: C runtime
}

// __free_dbg — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __free_dbg (1057 bytes)
export function __free_dbg(param_1, param_2) {
  // DEVIATION: C runtime
}

// __msize — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __msize (30 bytes)
export function __msize(_Memory) {
  // DEVIATION: C runtime  return 0;
}

// __msize_dbg — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __msize_dbg (358 bytes)
export function __msize_dbg(param_1, param_2) {
  // DEVIATION: C runtime  return 0;
}

// FUN_005f5550 — set debug break request (DEVIATION: C runtime)
export function FUN_005f5550(param_1) { let old = DAT_00639f78; DAT_00639f78 = param_1; return old; }

// __CrtSetDbgBlockType — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtSetDbgBlockType (160 bytes)
export function __CrtSetDbgBlockType(param_1, param_2) {
  // DEVIATION: C runtime
}

// FUN_005f5620 — set alloc hook (DEVIATION: C runtime)
export function FUN_005f5620(param_1) {
  // DEVIATION: C runtime
  return null;
}

// _CheckBytes — (DEVIATION: C runtime)
export function _CheckBytes(param_1, param_2, param_3) { return 1; }

// __CrtCheckMemory — (DEVIATION: C runtime)
export function __CrtCheckMemory() { return 1; }

// __CrtSetDbgFlag — (DEVIATION: C runtime)
export function __CrtSetDbgFlag(param_1) { let old = DAT_00639f70; if (param_1 !== -1) DAT_00639f70 = param_1; return old; }

// __CrtDoForAllClientObjects — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtDoForAllClientObjects (105 bytes)
export function __CrtDoForAllClientObjects(param_1, param_2) {
  // DEVIATION: C runtime
}

// __CrtIsValidPointer — (DEVIATION: C runtime)
export function __CrtIsValidPointer(param_1, param_2, param_3) { return param_1 !== 0 ? 1 : 0; }

// __CrtIsValidHeapPointer — (DEVIATION: C runtime)
export function __CrtIsValidHeapPointer(param_1) { return param_1 !== 0 ? 1 : 0; }

// __CrtIsMemoryBlock — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtIsMemoryBlock (255 bytes)
export function __CrtIsMemoryBlock(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime  return 0;
}

// FUN_005f5d30 — set dump client hook (DEVIATION: C runtime)
export function FUN_005f5d30(param_1) { let old = DAT_006e6b48; DAT_006e6b48 = param_1; return old; }

// __CrtMemCheckpoint — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtMemCheckpoint (316 bytes)
export function __CrtMemCheckpoint(param_1) {
  // DEVIATION: C runtime
}

// __CrtMemDifference — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtMemDifference (312 bytes)
export function __CrtMemDifference(param_1, param_2, param_3) {
  // DEVIATION: C runtime  return 0;
}

// __CrtMemDumpAllObjectsSince — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtMemDumpAllObjectsSince (704 bytes)
export function __CrtMemDumpAllObjectsSince(param_1) {
  // DEVIATION: C runtime
}

// __printMemBlockData — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __printMemBlockData (252 bytes)
export function __printMemBlockData(param_1) {
  // DEVIATION: C runtime
}

// __CrtDumpMemoryLeaks — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtDumpMemoryLeaks (132 bytes)
export function __CrtDumpMemoryLeaks() {
  // DEVIATION: C runtime  return 0;
}

// __CrtMemDumpStatistics — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtMemDumpStatistics (199 bytes)
export function __CrtMemDumpStatistics(param_1) {
  // DEVIATION: C runtime
}

// FID_conflict:_memcpy (second copy) — (DEVIATION: C runtime, same as first)
export function FID_conflict__memcpy_2(_Dst, _Src, _Size) { return FID_conflict__memcpy(_Dst, _Src, _Size); }

// FID_conflict:__wrename / _rename — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FID_conflict:__wrename (96 bytes)
export function FID_conflict___wrename(_OldFilename, _NewFilename) {
  // DEVIATION: C runtime  return 0;
}

// FID_conflict:_remove / __wremove — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FID_conflict:_remove (92 bytes)
export function FID_conflict__remove(_Filename) {
  // DEVIATION: C runtime  return 0;
}

// FID_conflict:__unlink — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FID_conflict:__unlink (28 bytes)
export function FID_conflict___unlink(_Filename) {
  // DEVIATION: C runtime  return 0;
}

// _rewind — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _rewind (192 bytes)
export function _rewind(_File) {
  // DEVIATION: C runtime
}

// _fseek — (DEVIATION: C runtime)
export function _fseek(_File, _Offset, _Origin) { return -1; }

// _ftell — (DEVIATION: C runtime)
export function _ftell(_File) { return -1; }

// _printf — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _printf (141 bytes)
export function _printf(_Format) {
  // DEVIATION: C runtime  return 0;
}

// __ftol — float to long (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ftol (39 bytes)
export function __ftol() {
  // DEVIATION: C runtime  return 0;
}

// __fpmath — FP math init (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __fpmath (38 bytes)
export function __fpmath(param_1) {
  // DEVIATION: C runtime
}

// FUN_005f6cc0 — DEVIATION: Win32 API
// Source: decompiled/block_005F0000.c FUN_005f6cc0 (16 bytes)
export function FUN_005f6cc0() { // C: return; (truly empty function) }

// __cfltcvt_init — float conversion init (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cfltcvt_init (71 bytes)
export function __cfltcvt_init() {
  // DEVIATION: C runtime
}

// FUN_005f6d20 — set user math error handler (DEVIATION: C runtime)
export function FUN_005f6d20(param_1) { let old = DAT_00639fa8; DAT_00639fa8 = param_1; return old; }

// _memcmp — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _memcmp (172 bytes)
export function _memcmp(_Buf1, _Buf2, _Size) {
  // DEVIATION: C runtime  return 0;
}

// __strcmpi — case-insensitive strcmp (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __strcmpi (140 bytes)
export function __strcmpi(_Str1, _Str2) {
  // DEVIATION: C runtime  return 0;
}

// entry — program entry point (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c entry (494 bytes)
export function entry() {
  // DEVIATION: C runtime — CRT entry point with SEH
}

// __amsg_exit — runtime error exit (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __amsg_exit (55 bytes)
export function __amsg_exit(param_1) {
  // DEVIATION: C runtime
}

// FUN_005f7120 — abs (integer)
export function FUN_005f7120(param_1) {
  return (param_1 ^ (param_1 >> 0x1f)) - (param_1 >> 0x1f);
}

// __getcwd — (DEVIATION: C runtime)
export function __getcwd(_DstBuf, _SizeInBytes) {
  // DEVIATION: C runtime
  return null;
}

// __getdcwd — (DEVIATION: C runtime)
export function __getdcwd(_Drive, _DstBuf, _SizeInBytes) {
  // DEVIATION: C runtime
  return null;
}

// __validdrive — (DEVIATION: C runtime)
export function __validdrive(param_1) { return 1; }

// _time — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _time (390 bytes)
export function _time(_Time) {
  // DEVIATION: C runtime  return 0;
}

// _strncat — (DEVIATION: C runtime)
export function _strncat(_Dest, _Source, _Count) { return _Dest; }

// __assert — assertion (DEVIATION: Win32 API — logs to console)
// Source: decompiled/block_005F0000.c __assert (951 bytes)
export function __assert(param_1, param_2, param_3) {
  // DEVIATION: Win32
}

// ___InternalCxxFrameHandler — C++ EH (DEVIATION: C runtime)
export function ___InternalCxxFrameHandler(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { return 1; }

// FindHandler — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FindHandler (675 bytes)
export function FindHandler(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: C runtime
}

// FindHandlerForForeignException — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FindHandlerForForeignException (288 bytes)
export function FindHandlerForForeignException(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: C runtime
}

// GetRangeOfTrysToCheck — C++ EH (DEVIATION: C runtime)
export function GetRangeOfTrysToCheck(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime
  return null;
}

// TypeMatch — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c TypeMatch (195 bytes)
export function TypeMatch(param_1, param_2, param_3) {
  // DEVIATION: C runtime  return 0;
}

// ___FrameUnwindToState — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___FrameUnwindToState (234 bytes)
export function ___FrameUnwindToState(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime — C++ EH frame unwind
}

// Source: decompiled/block_005F0000.c FID_conflict:ArrayUnwindFilter (65 bytes)
// FID_conflict:ArrayUnwindFilter (second copy) — C++ EH
export function FID_conflict_ArrayUnwindFilter_2(param_1) {
  // DEVIATION: C runtime — exception filter
  if (param_1[0] === (-0x1f928c9d | 0)) {
    terminate();
  }
  return 0;
}

// CatchIt — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c CatchIt (209 bytes)
export function CatchIt(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) {
  // DEVIATION: C runtime
}

// CallCatchBlock — C++ EH (DEVIATION: C runtime)
export function CallCatchBlock(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: C runtime
  return null;
}

// ExFilterRethrow — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ExFilterRethrow (96 bytes)
export function ExFilterRethrow(param_1) {
  // DEVIATION: C runtime  return 0;
}

// BuildCatchObject — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c BuildCatchObject (699 bytes)
export function BuildCatchObject(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime — C++ EH build catch object
}

// DestructExceptionObject — C++ EH (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c DestructExceptionObject (124 bytes)
export function DestructExceptionObject(param_1, param_2) {
  // DEVIATION: C runtime — C++ EH destruct exception
}

// AdjustPointer — C++ EH (DEVIATION: C runtime)
export function AdjustPointer(param_1, param_2) { return param_1; }

// __CallSettingFrame@12 — SEH frame setup (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CallSettingFrame@12 (72 bytes)
export function __CallSettingFrame_12(param_1, param_2, param_3) {
  // DEVIATION: C runtime
}

// terminate — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c terminate (105 bytes)
export function terminate() {
  // DEVIATION: C runtime — C++ terminate handler
}

// unexpected — (DEVIATION: C runtime)
export function unexpected() { terminate(); }

// _inconsistency — (DEVIATION: C runtime)
export function _inconsistency() { terminate(); }

// __CrtDbgBreak — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtDbgBreak (17 bytes)
export function __CrtDbgBreak() {
  // DEVIATION: C runtime
}

// __CrtSetReportMode — (DEVIATION: C runtime)
export function __CrtSetReportMode(param_1, param_2) { return -1; }

// __CrtSetReportFile — (DEVIATION: C runtime)
export function __CrtSetReportFile(param_1, param_2) { return -2; }

// FUN_005f8b40 — set report hook (DEVIATION: C runtime)
export function FUN_005f8b40(param_1) { let old = DAT_006e6b30; DAT_006e6b30 = param_1; return old; }

// __CrtDbgReport — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __CrtDbgReport (998 bytes)
export function __CrtDbgReport(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime  return 0;
}

// _CrtMessageWindow — (DEVIATION: C runtime)
export function _CrtMessageWindow() {
  // DEVIATION: C runtime
  return false;
}

// FUN_005f9355 — SEH local unwind dispatch (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c FUN_005f9355 (27 bytes)
export function FUN_005f9355(param_1) {
  // DEVIATION: C runtime
}

// ___crtLCMapStringW — locale map (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___crtLCMapStringW (760 bytes)
export function ___crtLCMapStringW(_LocaleName, _DWMapFlag, _LpSrcStr, _CchSrc, _LpDestStr, _CchDest) {
  // DEVIATION: C runtime  return 0;
}

// wcsncnt — wide char count (DEVIATION: C runtime)
export function wcsncnt(param_1, param_2) { return param_2; }

// ___crtLCMapStringA — locale map (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___crtLCMapStringA (791 bytes)
export function ___crtLCMapStringA(_Plocinfo, _LocaleName, _DwMapFlag, _LpSrcStr, _CchSrc, _LpDestStr, _CchDest, _Code_page, _BError) {
  // DEVIATION: C runtime  return 0;
}

// _strncnt — string count (DEVIATION: C runtime)
export function _strncnt(_String, _Cnt) { return _Cnt; }

// __isctype — char type check (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __isctype (182 bytes)
export function __isctype(_C, _Type) {
  // DEVIATION: C runtime  return 0;
}

// __openfile — file open internal (DEVIATION: C runtime)
export function __openfile(_Filename, _Mode, _ShFlag, _File) {
  // DEVIATION: C runtime
  return null;
}

// __getstream — get FILE stream (DEVIATION: C runtime)
export function __getstream() {
  // DEVIATION: C runtime
  return null;
}

// __close — close file handle (DEVIATION: C runtime)
export function __close(_FileHandle) { return -1; }

// __freebuf — free file buffer (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __freebuf (138 bytes)
export function __freebuf(_File) {
  // DEVIATION: C runtime
}

// _fflush — flush file (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _fflush (126 bytes)
export function _fflush(_File) {
  // DEVIATION: C runtime  return 0;
}

// __flush — flush internal (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __flush (186 bytes)
export function __flush(_File) {
  // DEVIATION: C runtime  return 0;
}

// __flushall — flush all files (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __flushall (26 bytes)
export function __flushall() {
  // DEVIATION: C runtime  return 0;
}

// flsall — flush all internal (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c flsall (247 bytes)
export function flsall(param_1) {
  // DEVIATION: C runtime  return 0;
}

// __flsbuf — flush buffer (DEVIATION: C runtime)
export function __flsbuf(_Ch, _File) { return -1; }

// __output — printf core (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __output (3177 bytes)
export function __output(param_1, param_2, param_3) {
  // DEVIATION: C runtime  return 0;
}

// write_char — output single char (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c write_char (117 bytes)
export function write_char(param_1, param_2, param_3) {
  // DEVIATION: C runtime
}

// write_multi_char — output repeated char (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c write_multi_char (75 bytes)
export function write_multi_char(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime
}

// write_string — output string (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c write_string (87 bytes)
export function write_string(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime
}

// get_int_arg — varargs int (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c get_int_arg (30 bytes)
export function get_int_arg(param_1) {
  // DEVIATION: C runtime  return 0;
}

// get_int64_arg — varargs int64 (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c get_int64_arg (35 bytes)
export function get_int64_arg(param_1) {
  // DEVIATION: C runtime  return 0;
}

// get_short_arg — varargs short (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c get_short_arg (31 bytes)
export function get_short_arg(param_1) {
  // DEVIATION: C runtime  return 0;
}

// __allmul — 64-bit multiply (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __allmul (52 bytes)
export function __allmul(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime  return 0;
}

// __stbuf — setup temp buffer (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __stbuf (330 bytes)
export function __stbuf(_File) {
  // DEVIATION: C runtime  return 0;
}

// __ftbuf — free temp buffer (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ftbuf (182 bytes)
export function __ftbuf(_Flag, _File) {
  // DEVIATION: C runtime
}

// __read — read from file (DEVIATION: C runtime)
export function __read(_FileHandle, _DstBuf, _MaxCharCount) { return -1; }

// __write — write to file (DEVIATION: C runtime)
export function __write(_FileHandle, _Buf, _MaxCharCount) { return -1; }

// __dosmaperr — map DOS error to errno (DEVIATION: C runtime)
export function __dosmaperr(param_1) { DAT_00639f18 = param_1; }

// __mbctoupper — multibyte toupper (DEVIATION: C runtime)
export function __mbctoupper(_Ch) {
  if (_Ch >= 0x61 && _Ch <= 0x7a) return _Ch - 0x20;
  return _Ch;
}

// __ioinit — IO init (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ioinit (808 bytes)
export function __ioinit() {
  // DEVIATION: C runtime  return 0;
}

// __ioterm — IO term (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ioterm (104 bytes)
export function __ioterm() {
  // DEVIATION: C runtime
}

// __getbuf — get file buffer (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __getbuf (188 bytes)
export function __getbuf(_File) {
  // DEVIATION: C runtime
}

// FUN_005fc5c0 — tolower_offset (add 0x20)
export function FUN_005fc5c0(param_1) { return param_1 + 0x20; }

// _tolower — (DEVIATION: C runtime)
export function _tolower(_C) {
  if (_C >= 0x41 && _C <= 0x5a) return _C + 0x20;
  return _C;
}

// FUN_005fc720 — set new handler (DEVIATION: C runtime)
export function FUN_005fc720(param_1) { let old = DAT_006e54a0; DAT_006e54a0 = param_1; return old; }

// FUN_005fc750 — get new handler (DEVIATION: C runtime)
export function FUN_005fc750() { return DAT_006e54a0; }

// __callnewh — call new handler (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __callnewh (62 bytes)
export function __callnewh(_Size) {
  // DEVIATION: C runtime  return 0;
}

// __malloc_base — (DEVIATION: C runtime)
export function __malloc_base(param_1) {
  // DEVIATION: C runtime
  return null;
}

// __nh_malloc_base — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __nh_malloc_base (150 bytes)
export function __nh_malloc_base(param_1, param_2) {
  // DEVIATION: C runtime  return 0;
}

// __heap_alloc_base — (DEVIATION: C runtime)
export function __heap_alloc_base(param_1) {
  // DEVIATION: C runtime
  return null;
}

// FUN_005fc8f0 — returns 1 (DEVIATION: C runtime — ValidateRead/Write)
export function FUN_005fc8f0() { return 1; }

// __expand_base — (DEVIATION: C runtime)
export function __expand_base(param_1, param_2) {
  // DEVIATION: C runtime
  return null;
}

// __realloc_base — (DEVIATION: C runtime)
export function __realloc_base(param_1, param_2) {
  // DEVIATION: C runtime
  return null;
}

// __free_base — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __free_base (105 bytes)
export function __free_base(param_1) {
  // DEVIATION: C runtime
}

// __heapchk — (DEVIATION: C runtime)
export function __heapchk() { return -2; }

// __heapset — (DEVIATION: C runtime)
export function __heapset(_Fill) { return __heapchk(); }

// __heap_init — (DEVIATION: C runtime)
export function __heap_init() { return 1; }

// __heap_term — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __heap_term (93 bytes)
export function __heap_term() {
  // DEVIATION: C runtime
}

// FUN_005fcdc0 — get SBH threshold
export function FUN_005fcdc0() { return DAT_0063ac54; }

// __set_sbh_threshold — (DEVIATION: C runtime)
export function __set_sbh_threshold(param_1) { return true; }

// ___sbh_new_region — (DEVIATION: C runtime)
export function ___sbh_new_region() {
  // DEVIATION: C runtime
  return null;
}

// ___sbh_release_region — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___sbh_release_region (132 bytes)
export function ___sbh_release_region(param_1) {
  // DEVIATION: C runtime
}

// ___sbh_decommit_pages — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___sbh_decommit_pages (376 bytes)
export function ___sbh_decommit_pages(param_1) {
  // DEVIATION: C runtime
}

// ___sbh_find_block — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___sbh_find_block (162 bytes)
export function ___sbh_find_block(param_1, param_2, param_3) {
  // DEVIATION: C runtime  return 0;
}

// ___sbh_free_block — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___sbh_free_block (136 bytes)
export function ___sbh_free_block(param_1, param_2, param_3) {
  // DEVIATION: C runtime
}

// ___sbh_alloc_block — (DEVIATION: C runtime)
export function ___sbh_alloc_block(param_1) {
  // DEVIATION: C runtime
  return null;
}

// ___sbh_alloc_block_from_page — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___sbh_alloc_block_from_page (763 bytes)
export function ___sbh_alloc_block_from_page(param_1, param_2, param_3) {
  // DEVIATION: C runtime  return 0;
}

// ___sbh_resize_block — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___sbh_resize_block (439 bytes)
export function ___sbh_resize_block(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime  return 0;
}

// ___sbh_heap_check — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___sbh_heap_check (617 bytes)
export function ___sbh_heap_check() {
  // DEVIATION: C runtime  return 0;
}

// __lseek — (DEVIATION: C runtime)
export function __lseek(_FileHandle, _Offset, _Origin) { return -1; }

// ___initstdio — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___initstdio (338 bytes)
export function ___initstdio() {
  // DEVIATION: C runtime
}

// ___endstdio — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c ___endstdio (36 bytes)
export function ___endstdio() {
  // DEVIATION: C runtime
}

// __setdefaultprecision — (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __setdefaultprecision (29 bytes)
export function __setdefaultprecision() {
  // DEVIATION: C runtime
}

// __ms_p5_test_fdiv — Pentium FDIV bug test (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ms_p5_test_fdiv (94 bytes)
export function __ms_p5_test_fdiv() {
  // DEVIATION: C runtime  return 0;
}

// __ms_p5_mp_test_fdiv — Pentium FDIV multiprocessor test (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ms_p5_mp_test_fdiv (86 bytes)
export function __ms_p5_mp_test_fdiv() {
  // DEVIATION: C runtime
}

// __forcdecpt — force decimal point (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __forcdecpt (179 bytes)
export function __forcdecpt(_Buf) {
  // DEVIATION: C runtime
}

// __cropzeros — crop trailing zeros (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cropzeros (223 bytes)
export function __cropzeros(_Buf) {
  // DEVIATION: C runtime
}

// __positive — check if positive (DEVIATION: C runtime)
export function __positive(arg) { return 1; }

// __fassign — float assign (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __fassign (83 bytes)
export function __fassign(flag, argument, number) {
  // DEVIATION: C runtime
}

// __cftoe — float to E format (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cftoe (458 bytes)
export function __cftoe(_Value, _Buf, _SizeInBytes, _Dec, _Caps) {
  // DEVIATION: C runtime  return 0;
}

// __cftof — float to F format (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cftof (393 bytes)
export function __cftof(_Value, _Buf, _SizeInBytes, _Dec) {
  // DEVIATION: C runtime  return 0;
}

// __cftog — float to G format (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cftog (281 bytes)
export function __cftog(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime
}

// __cftoe_g — float to E format (g variant) (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cftoe_g (63 bytes)
export function __cftoe_g(param_1, param_2, param_3, param_4) {
  // DEVIATION: C runtime  return 0;
}

// __cftof_g — float to F format (g variant) (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cftof_g (59 bytes)
export function __cftof_g(param_1, param_2, param_3) {
  // DEVIATION: C runtime  return 0;
}

// __cfltcvt — float conversion dispatch (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __cfltcvt (119 bytes)
export function __cfltcvt(arg, buffer, sizeInBytes, format, precision, caps) {
  // DEVIATION: C runtime  return 0;
}

// __shift — shift string right (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __shift (54 bytes)
export function __shift(param_1, param_2) {
  // DEVIATION: C runtime
}

// __XcptFilter — exception filter (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __XcptFilter (500 bytes)
export function __XcptFilter(_ExceptionNum, _ExceptionPtr) {
  // DEVIATION: C runtime  return 0;
}

// xcptlookup — exception table lookup (DEVIATION: C runtime)
export function xcptlookup(param_1) {
  // DEVIATION: C runtime
  return null;
}

// __ismbbkalnum — multibyte alnum (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbkalnum (32 bytes)
export function __ismbbkalnum(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbkprint — multibyte printable (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbkprint (32 bytes)
export function __ismbbkprint(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbkpunct — multibyte punct (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbkpunct (32 bytes)
export function __ismbbkpunct(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbalnum — multibyte alnum (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbalnum (35 bytes)
export function __ismbbalnum(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbalpha — multibyte alpha (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbalpha (35 bytes)
export function __ismbbalpha(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbgraph — multibyte graph (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbgraph (35 bytes)
export function __ismbbgraph(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbprint — multibyte print (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbprint (35 bytes)
export function __ismbbprint(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbpunct — multibyte punct (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbpunct (32 bytes)
export function __ismbbpunct(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbblead — multibyte lead byte (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbblead (32 bytes)
export function __ismbblead(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbtrail — multibyte trail byte (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbtrail (32 bytes)
export function __ismbbtrail(_C) {
  // DEVIATION: C runtime  return 0;
}

// __ismbbkana — multibyte kana (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __ismbbkana (68 bytes)
export function __ismbbkana(_C) {
  // DEVIATION: C runtime  return 0;
}

// x_ismbbtype — multibyte type check (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c x_ismbbtype (110 bytes)
export function x_ismbbtype(param_1, param_2, param_3) {
  // DEVIATION: C runtime  return 0;
}

// __setenvp — set environment (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __setenvp (318 bytes)
export function __setenvp() {
  // DEVIATION: C runtime  return 0;
}

// __setargv — set argv (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __setargv (204 bytes)
export function __setargv() {
  // DEVIATION: C runtime  return 0;
}

// parse_cmdline — parse command line (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c parse_cmdline (958 bytes)
export function parse_cmdline(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: C runtime
}

// ___crtGetEnvironmentStringsW — (DEVIATION: C runtime)
export function ___crtGetEnvironmentStringsW() {
  // DEVIATION: C runtime
  return null;
}

// ___crtGetEnvironmentStringsA — (DEVIATION: C runtime)
export function ___crtGetEnvironmentStringsA() {
  // DEVIATION: C runtime
  return null;
}

// __setmbcp — set multibyte code page (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __setmbcp (815 bytes)
export function __setmbcp(_CodePage) {
  // DEVIATION: C runtime  return 0;
}

// getSystemCP — get system code page (DEVIATION: C runtime)
export function getSystemCP(param_1) { return param_1; }

// _CPtoLCID — code page to LCID (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c _CPtoLCID (107 bytes)
export function _CPtoLCID(param_1) {
  // DEVIATION: C runtime  return 0;
}

// setSBCS — set single byte char set (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c setSBCS (120 bytes)
export function setSBCS() {
  // DEVIATION: C runtime
}

// FUN_005fffa0 — get multibyte code page
export function FUN_005fffa0() { return DAT_0063b0a4; }

// ___initmbctable — init MB char table (DEVIATION: C runtime)
export function ___initmbctable() { __setmbcp(-3); }

// __FF_MSGBANNER — runtime error message banner (DEVIATION: C runtime)
// Source: decompiled/block_005F0000.c __FF_MSGBANNER (95 bytes)
export function __FF_MSGBANNER() {
  // DEVIATION: C runtime
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION DECLARATIONS
//
// Functions called from this block but defined in other blocks.
// ═══════════════════════════════════════════════════════════════════

function FUN_005ef65a() { }       // surface lock/prepare (block_005E0000)
function FUN_005e0cc0() { return 0; }  // get DC (block_005E0000)
function FUN_005e8e06() { }       // release DC (block_005E0000)
function FUN_005e6297() { return 0; }  // intersect rect (block_005E0000)
function FUN_005ef4e3() { return 0; }  // handle input (block_005E0000)
function FUN_005e8f4b() { return 0; }  // create compatible DC (block_005E0000)
function FUN_005e635f() { }       // blit surface (block_005E0000)
