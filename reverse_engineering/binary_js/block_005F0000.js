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
// game logic — they are framework/runtime support. All are stubbed
// as no-ops or minimal implementations where needed.
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
export function FUN_005f0511() { }

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
export function CDataBoundProperty_destructor(self) { }

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
export function FUN_005f11e8() { }

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
  // CSplitterWnd::IsTracking stub
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

// FUN_005f17bc — no-op stub
export function FUN_005f17bc() { }

// FUN_005f17d4 — invoke_paint_child_callback
export function FUN_005f17d4(self, param_1, param_2) {
  // invoke callback if set
}

// FUN_005f1811 — invoke_lbutton_callback
export function FUN_005f1811(self, param_1, param_2) { }

// FUN_005f184e — invoke_click_callback
export function FUN_005f184e(self, param_1, param_2) { }

// FUN_005f188b — invoke_rbutton_callback
export function FUN_005f188b(self, param_1, param_2) { }

// FUN_005f18c8 — no-op stub
export function FUN_005f18c8() { }

// FUN_005f18e0 — no-op stub
export function FUN_005f18e0() { }

// FUN_005f18f8 — no-op stub
export function FUN_005f18f8() { }

// FUN_005f1910 — no-op stub
export function FUN_005f1910() { }

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

// CSplitterWnd::IsTracking — stub
export function CSplitterWnd_IsTracking(self) {
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// CRT LIBRARY FUNCTIONS
//
// All functions below are MSVC CRT / Win32 / MFC library code.
// They are stubbed as no-ops or minimal implementations.
// ═══════════════════════════════════════════════════════════════════


// __onexit — register exit callback (stub)
export function __onexit(_Func) { return _Func; }

// _atexit — register atexit callback (stub)
export function _atexit(param_1) { return 0; }

// ___onexitinit — initialize onexit table (stub)
export function ___onexitinit() { }

// __global_unwind2 — SEH global unwind (stub)
export function __global_unwind2(param_1) { }

// __local_unwind2 — SEH local unwind (stub)
export function __local_unwind2(param_1, param_2) { }

// __abnormal_termination — SEH check (stub)
export function __abnormal_termination() { return 0; }

// FUN_005f1d95 — save SEH context registers (stub)
export function FUN_005f1d95(param_1) { }

// FUN_005f1d9e — save SEH context (stub)
export function FUN_005f1d9e() { }

// _JumpToContinuation — SEH jump (stub)
export function _JumpToContinuation(param_1, param_2) { }

// _CallMemberFunction0 — thunk (stub)
export function _CallMemberFunction0(param_1, param_2) { }

// FID_conflict:_CallMemberFunction1 (two copies) — thunk (stub)
export function FID_conflict__CallMemberFunction1(param_1, param_2) { }

// _UnwindNestedFrames — SEH unwind (stub)
export function _UnwindNestedFrames(param_1, param_2) { }

// ___CxxFrameHandler — C++ exception handler (stub)
export function ___CxxFrameHandler(param_1, param_2, param_3, param_4) { return 1; }

// ___CxxLongjmpUnwind@4 — longjmp unwind (stub)
export function ___CxxLongjmpUnwind_4(param_1) { }

// _CallCatchBlock2 — catch block caller (stub)
export function _CallCatchBlock2(param_1, param_2, param_3, param_4, param_5) { return 0; }

// CatchGuardHandler — catch guard (stub)
export function CatchGuardHandler(param_1, param_2, param_3, param_4) { return 1; }

// _CallSETranslator — SE translator (stub)
export function _CallSETranslator(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { return 0; }

// TranslatorGuardHandler — translator guard (stub)
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

// FUN_005f22d0 — strcpy (stub)
export function FUN_005f22d0(param_1, param_2) { return param_1; }

// FUN_005f22e0 — strcat (stub)
export function FUN_005f22e0(param_1, param_2) { return param_1; }

// operator_delete — (stub)
export function operator_delete(param_1) { }

// operator_new — (stub)
export function operator_new(param_1) { return {}; }

// eh_vector_destructor_iterator — (stub)
export function _eh_vector_destructor_iterator_(param_1, param_2, param_3, param_4) { }

// __ArrayUnwind — (stub)
export function __ArrayUnwind(param_1, param_2, param_3, param_4) { }

// FID_conflict:ArrayUnwindFilter — (stub)
export function FID_conflict_ArrayUnwindFilter(param_1) { return 0; }

// eh_vector_constructor_iterator — (stub)
export function _eh_vector_constructor_iterator_(param_1, param_2, param_3, param_4, param_5) { }

// FUN_005f26e0 — toupper_offset (subtract 0x20)
export function FUN_005f26e0(param_1) { return param_1 - 0x20; }

// FID_conflict:__toupper_lk / _toupper — (stub, use JS)
export function FID_conflict___toupper_lk(_C) {
  if (_C >= 0x61 && _C <= 0x7a) return _C - 0x20;
  return _C;
}

// _isalpha — (stub)
export function _isalpha(_C) { return ((_C >= 0x41 && _C <= 0x5a) || (_C >= 0x61 && _C <= 0x7a)) ? 1 : 0; }

// _isupper — (stub)
export function _isupper(_C) { return (_C >= 0x41 && _C <= 0x5a) ? 1 : 0; }

// _islower — (stub)
export function _islower(_C) { return (_C >= 0x61 && _C <= 0x7a) ? 1 : 0; }

// _isdigit — (stub)
export function _isdigit(_C) { return (_C >= 0x30 && _C <= 0x39) ? 1 : 0; }

// _isxdigit — (stub)
export function _isxdigit(_C) {
  return ((_C >= 0x30 && _C <= 0x39) || (_C >= 0x41 && _C <= 0x46) || (_C >= 0x61 && _C <= 0x66)) ? 1 : 0;
}

// _isspace — (stub)
export function _isspace(_C) { return (_C === 0x20 || (_C >= 0x09 && _C <= 0x0d)) ? 1 : 0; }

// _ispunct — (stub)
export function _ispunct(_C) { return 0; }

// _isalnum — (stub)
export function _isalnum(_C) { return (_isalpha(_C) || _isdigit(_C)) ? 1 : 0; }

// _isprint — (stub)
export function _isprint(_C) { return (_C >= 0x20 && _C <= 0x7e) ? 1 : 0; }

// _isgraph — (stub)
export function _isgraph(_C) { return (_C >= 0x21 && _C <= 0x7e) ? 1 : 0; }

// _iscntrl — (stub)
export function _iscntrl(_C) { return (_C < 0x20 || _C === 0x7f) ? 1 : 0; }

// ___isascii — (stub)
export function ___isascii(_C) { return (_C < 0x80) ? 1 : 0; }

// FUN_005f2be0 — toascii
export function FUN_005f2be0(param_1) { return param_1 & 0x7f; }

// ___iscsymf — (stub)
export function ___iscsymf(_C) { return (_isalpha(_C) || _C === 0x5f) ? 1 : 0; }

// ___iscsym — (stub)
export function ___iscsym(_C) { return (_isalnum(_C) || _C === 0x5f) ? 1 : 0; }

// __fsopen — file open (stub)
export function __fsopen(_Filename, _Mode, _ShFlag) { return null; }

// _fopen — file open (stub)
export function _fopen(_Filename, _Mode) { return null; }

// _fclose — file close (stub)
export function _fclose(_File) { return -1; }

// _strncpy — (stub)
export function _strncpy(_Dest, _Source, _Count) { return _Dest; }

// _sprintf — (stub)
export function _sprintf(_Dest, _Format) { return 0; }

// _atol — (stub)
export function _atol(_Str) { return 0; }

// _atoi — (stub)
export function _atoi(_Str) { return 0; }

// __atoi64 — (stub)
export function __atoi64(_String) { return 0; }

// _fputs — (stub)
export function _fputs(_Str, _File) { return 0; }

// _strlen — (stub)
export function _strlen(_Str) { return 0; }

// _memset — (stub)
export function _memset(_Dst, _Val, _Size) { return _Dst; }

// _strcmp — (stub)
export function _strcmp(_Str1, _Str2) { return 0; }

// FUN_005f35f0 — stack probe (no-op)
export function FUN_005f35f0() { }

// _strchr — (stub)
export function _strchr(_Str, _Val) { return null; }

// _strncmp — (stub)
export function _strncmp(_Str1, _Str2, _MaxCount) { return 0; }

// _fread — (stub)
export function _fread(_DstBuf, _ElementSize, _Count, _File) { return 0; }

// _fwrite — (stub)
export function _fwrite(_Str, _Size, _Count, _File) { return 0; }

// __chdir — (stub)
export function __chdir(_Path) { return 0; }

// _strrchr — (stub)
export function _strrchr(_Str, _Ch) { return null; }

// _fgets — (stub)
export function _fgets(_Buf, _MaxCount, _File) { return null; }

// __filbuf — (stub)
export function __filbuf(_File) { return -1; }

// _fputc — (stub)
export function _fputc(_Ch, _File) { return _Ch; }

// _putc — (stub)
export function _putc(_Ch, _File) { return _fputc(_Ch, _File); }

// _fgetc — (stub)
export function _fgetc(_File) { return -1; }

// _getc — (stub)
export function _getc(_File) { return _fgetc(_File); }

// __strnicmp — (stub)
export function __strnicmp(_Str1, _Str2, _MaxCount) { return 0; }

// __cinit — CRT init (stub)
export function __cinit(param_1) { return 0; }

// _exit — (stub)
export function _exit_fn(_Code) { }

// __exit — (stub)
export function __exit(param_1) { }

// __cexit — (stub)
export function __cexit() { }

// __c_exit — (stub)
export function __c_exit() { }

// doexit — (stub)
export function doexit(param_1, param_2, param_3) { }

// __initterm — call initializer table (stub)
export function __initterm(param_1, param_2) { }

// _strstr — (stub)
export function _strstr(_Str, _SubStr) { return null; }

// _malloc — (stub)
export function _malloc(_Size) { return null; }

// __malloc_dbg — (stub)
export function __malloc_dbg(param_1, param_2, param_3, param_4) { return null; }

// __nh_malloc — (stub)
export function __nh_malloc(_Size, _NhFlag) { return null; }

// __nh_malloc_dbg — (stub)
export function __nh_malloc_dbg(param_1, param_2, param_3, param_4, param_5) { return 0; }

// __heap_alloc — (stub)
export function __heap_alloc(_Size) { return null; }

// __heap_alloc_dbg — (stub)
export function __heap_alloc_dbg(param_1, param_2, param_3, param_4) { return null; }

// _calloc — (stub)
export function _calloc(_Count, _Size) { return null; }

// __calloc_dbg — (stub)
export function __calloc_dbg(param_1, param_2, param_3, param_4, param_5) { return null; }

// FID_conflict:__expand / _realloc — (stub)
export function FID_conflict___expand(_Memory, _NewSize) { return null; }

// __realloc_dbg — (stub)
export function __realloc_dbg(param_1, param_2, param_3, param_4, param_5) { return 0; }

// realloc_help — (stub)
export function realloc_help(param_1, param_2, param_3, param_4, param_5, param_6) { return null; }

// FUN_005f4f70 — free wrapper (stub)
export function FUN_005f4f70(param_1) { }

// __free_dbg — (stub)
export function __free_dbg(param_1, param_2) { }

// __msize — (stub)
export function __msize(_Memory) { return 0; }

// __msize_dbg — (stub)
export function __msize_dbg(param_1, param_2) { return 0; }

// FUN_005f5550 — set debug break request (stub)
export function FUN_005f5550(param_1) { let old = DAT_00639f78; DAT_00639f78 = param_1; return old; }

// __CrtSetDbgBlockType — (stub)
export function __CrtSetDbgBlockType(param_1, param_2) { }

// FUN_005f5620 — set alloc hook (stub)
export function FUN_005f5620(param_1) { return null; }

// _CheckBytes — (stub)
export function _CheckBytes(param_1, param_2, param_3) { return 1; }

// __CrtCheckMemory — (stub)
export function __CrtCheckMemory() { return 1; }

// __CrtSetDbgFlag — (stub)
export function __CrtSetDbgFlag(param_1) { let old = DAT_00639f70; if (param_1 !== -1) DAT_00639f70 = param_1; return old; }

// __CrtDoForAllClientObjects — (stub)
export function __CrtDoForAllClientObjects(param_1, param_2) { }

// __CrtIsValidPointer — (stub)
export function __CrtIsValidPointer(param_1, param_2, param_3) { return param_1 !== 0 ? 1 : 0; }

// __CrtIsValidHeapPointer — (stub)
export function __CrtIsValidHeapPointer(param_1) { return param_1 !== 0 ? 1 : 0; }

// __CrtIsMemoryBlock — (stub)
export function __CrtIsMemoryBlock(param_1, param_2, param_3, param_4, param_5) { return 0; }

// FUN_005f5d30 — set dump client hook (stub)
export function FUN_005f5d30(param_1) { let old = DAT_006e6b48; DAT_006e6b48 = param_1; return old; }

// __CrtMemCheckpoint — (stub)
export function __CrtMemCheckpoint(param_1) { }

// __CrtMemDifference — (stub)
export function __CrtMemDifference(param_1, param_2, param_3) { return 0; }

// __CrtMemDumpAllObjectsSince — (stub)
export function __CrtMemDumpAllObjectsSince(param_1) { }

// __printMemBlockData — (stub)
export function __printMemBlockData(param_1) { }

// __CrtDumpMemoryLeaks — (stub)
export function __CrtDumpMemoryLeaks() { return 0; }

// __CrtMemDumpStatistics — (stub)
export function __CrtMemDumpStatistics(param_1) { }

// FID_conflict:_memcpy (second copy) — (stub, same as first)
export function FID_conflict__memcpy_2(_Dst, _Src, _Size) { return FID_conflict__memcpy(_Dst, _Src, _Size); }

// FID_conflict:__wrename / _rename — (stub)
export function FID_conflict___wrename(_OldFilename, _NewFilename) { return 0; }

// FID_conflict:_remove / __wremove — (stub)
export function FID_conflict__remove(_Filename) { return 0; }

// FID_conflict:__unlink — (stub)
export function FID_conflict___unlink(_Filename) { return 0; }

// _rewind — (stub)
export function _rewind(_File) { }

// _fseek — (stub)
export function _fseek(_File, _Offset, _Origin) { return -1; }

// _ftell — (stub)
export function _ftell(_File) { return -1; }

// _printf — (stub)
export function _printf(_Format) { return 0; }

// __ftol — float to long (stub)
export function __ftol() { return 0; }

// __fpmath — FP math init (stub)
export function __fpmath(param_1) { }

// FUN_005f6cc0 — no-op
export function FUN_005f6cc0() { }

// __cfltcvt_init — float conversion init (stub)
export function __cfltcvt_init() { }

// FUN_005f6d20 — set user math error handler (stub)
export function FUN_005f6d20(param_1) { let old = DAT_00639fa8; DAT_00639fa8 = param_1; return old; }

// _memcmp — (stub)
export function _memcmp(_Buf1, _Buf2, _Size) { return 0; }

// __strcmpi — case-insensitive strcmp (stub)
export function __strcmpi(_Str1, _Str2) { return 0; }

// entry — program entry point (stub)
export function entry() { }

// __amsg_exit — runtime error exit (stub)
export function __amsg_exit(param_1) { }

// FUN_005f7120 — abs (integer)
export function FUN_005f7120(param_1) {
  return (param_1 ^ (param_1 >> 0x1f)) - (param_1 >> 0x1f);
}

// __getcwd — (stub)
export function __getcwd(_DstBuf, _SizeInBytes) { return null; }

// __getdcwd — (stub)
export function __getdcwd(_Drive, _DstBuf, _SizeInBytes) { return null; }

// __validdrive — (stub)
export function __validdrive(param_1) { return 1; }

// _time — (stub)
export function _time(_Time) { return 0; }

// _strncat — (stub)
export function _strncat(_Dest, _Source, _Count) { return _Dest; }

// __assert — assertion (stub — logs to console)
export function __assert(param_1, param_2, param_3) {
  // In original: shows message box, then aborts
}

// ___InternalCxxFrameHandler — C++ EH (stub)
export function ___InternalCxxFrameHandler(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { return 1; }

// FindHandler — C++ EH (stub)
export function FindHandler(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { }

// FindHandlerForForeignException — C++ EH (stub)
export function FindHandlerForForeignException(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { }

// GetRangeOfTrysToCheck — C++ EH (stub)
export function GetRangeOfTrysToCheck(param_1, param_2, param_3, param_4, param_5) { return null; }

// TypeMatch — C++ EH (stub)
export function TypeMatch(param_1, param_2, param_3) { return 0; }

// ___FrameUnwindToState — C++ EH (stub)
export function ___FrameUnwindToState(param_1, param_2, param_3, param_4) { }

// FID_conflict:ArrayUnwindFilter (second copy) — (stub)
export function FID_conflict_ArrayUnwindFilter_2(param_1) { return 0; }

// CatchIt — C++ EH (stub)
export function CatchIt(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10) { }

// CallCatchBlock — C++ EH (stub)
export function CallCatchBlock(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { return null; }

// ExFilterRethrow — C++ EH (stub)
export function ExFilterRethrow(param_1) { return 0; }

// BuildCatchObject — C++ EH (stub)
export function BuildCatchObject(param_1, param_2, param_3, param_4) { }

// DestructExceptionObject — C++ EH (stub)
export function DestructExceptionObject(param_1, param_2) { }

// AdjustPointer — C++ EH (stub)
export function AdjustPointer(param_1, param_2) { return param_1; }

// __CallSettingFrame@12 — SEH frame setup (stub)
export function __CallSettingFrame_12(param_1, param_2, param_3) { }

// terminate — (stub)
export function terminate() { }

// unexpected — (stub)
export function unexpected() { terminate(); }

// _inconsistency — (stub)
export function _inconsistency() { terminate(); }

// __CrtDbgBreak — (stub)
export function __CrtDbgBreak() { }

// __CrtSetReportMode — (stub)
export function __CrtSetReportMode(param_1, param_2) { return -1; }

// __CrtSetReportFile — (stub)
export function __CrtSetReportFile(param_1, param_2) { return -2; }

// FUN_005f8b40 — set report hook (stub)
export function FUN_005f8b40(param_1) { let old = DAT_006e6b30; DAT_006e6b30 = param_1; return old; }

// __CrtDbgReport — (stub)
export function __CrtDbgReport(param_1, param_2, param_3, param_4, param_5) { return 0; }

// _CrtMessageWindow — (stub)
export function _CrtMessageWindow() { return false; }

// FUN_005f9355 — SEH local unwind dispatch (stub)
export function FUN_005f9355(param_1) { }

// ___crtLCMapStringW — locale map (stub)
export function ___crtLCMapStringW(_LocaleName, _DWMapFlag, _LpSrcStr, _CchSrc, _LpDestStr, _CchDest) { return 0; }

// wcsncnt — wide char count (stub)
export function wcsncnt(param_1, param_2) { return param_2; }

// ___crtLCMapStringA — locale map (stub)
export function ___crtLCMapStringA(_Plocinfo, _LocaleName, _DwMapFlag, _LpSrcStr, _CchSrc, _LpDestStr, _CchDest, _Code_page, _BError) { return 0; }

// _strncnt — string count (stub)
export function _strncnt(_String, _Cnt) { return _Cnt; }

// __isctype — char type check (stub)
export function __isctype(_C, _Type) { return 0; }

// __openfile — file open internal (stub)
export function __openfile(_Filename, _Mode, _ShFlag, _File) { return null; }

// __getstream — get FILE stream (stub)
export function __getstream() { return null; }

// __close — close file handle (stub)
export function __close(_FileHandle) { return -1; }

// __freebuf — free file buffer (stub)
export function __freebuf(_File) { }

// _fflush — flush file (stub)
export function _fflush(_File) { return 0; }

// __flush — flush internal (stub)
export function __flush(_File) { return 0; }

// __flushall — flush all files (stub)
export function __flushall() { return 0; }

// flsall — flush all internal (stub)
export function flsall(param_1) { return 0; }

// __flsbuf — flush buffer (stub)
export function __flsbuf(_Ch, _File) { return -1; }

// __output — printf core (stub)
export function __output(param_1, param_2, param_3) { return 0; }

// write_char — output single char (stub)
export function write_char(param_1, param_2, param_3) { }

// write_multi_char — output repeated char (stub)
export function write_multi_char(param_1, param_2, param_3, param_4) { }

// write_string — output string (stub)
export function write_string(param_1, param_2, param_3, param_4) { }

// get_int_arg — varargs int (stub)
export function get_int_arg(param_1) { return 0; }

// get_int64_arg — varargs int64 (stub)
export function get_int64_arg(param_1) { return 0; }

// get_short_arg — varargs short (stub)
export function get_short_arg(param_1) { return 0; }

// __allmul — 64-bit multiply (stub)
export function __allmul(param_1, param_2, param_3, param_4) { return 0; }

// __stbuf — setup temp buffer (stub)
export function __stbuf(_File) { return 0; }

// __ftbuf — free temp buffer (stub)
export function __ftbuf(_Flag, _File) { }

// __read — read from file (stub)
export function __read(_FileHandle, _DstBuf, _MaxCharCount) { return -1; }

// __write — write to file (stub)
export function __write(_FileHandle, _Buf, _MaxCharCount) { return -1; }

// __dosmaperr — map DOS error to errno (stub)
export function __dosmaperr(param_1) { DAT_00639f18 = param_1; }

// __mbctoupper — multibyte toupper (stub)
export function __mbctoupper(_Ch) {
  if (_Ch >= 0x61 && _Ch <= 0x7a) return _Ch - 0x20;
  return _Ch;
}

// __ioinit — IO init (stub)
export function __ioinit() { return 0; }

// __ioterm — IO term (stub)
export function __ioterm() { }

// __getbuf — get file buffer (stub)
export function __getbuf(_File) { }

// FUN_005fc5c0 — tolower_offset (add 0x20)
export function FUN_005fc5c0(param_1) { return param_1 + 0x20; }

// _tolower — (stub)
export function _tolower(_C) {
  if (_C >= 0x41 && _C <= 0x5a) return _C + 0x20;
  return _C;
}

// FUN_005fc720 — set new handler (stub)
export function FUN_005fc720(param_1) { let old = DAT_006e54a0; DAT_006e54a0 = param_1; return old; }

// FUN_005fc750 — get new handler (stub)
export function FUN_005fc750() { return DAT_006e54a0; }

// __callnewh — call new handler (stub)
export function __callnewh(_Size) { return 0; }

// __malloc_base — (stub)
export function __malloc_base(param_1) { return null; }

// __nh_malloc_base — (stub)
export function __nh_malloc_base(param_1, param_2) { return 0; }

// __heap_alloc_base — (stub)
export function __heap_alloc_base(param_1) { return null; }

// FUN_005fc8f0 — returns 1 (ValidateRead/Write stub)
export function FUN_005fc8f0() { return 1; }

// __expand_base — (stub)
export function __expand_base(param_1, param_2) { return null; }

// __realloc_base — (stub)
export function __realloc_base(param_1, param_2) { return null; }

// __free_base — (stub)
export function __free_base(param_1) { }

// __heapchk — (stub)
export function __heapchk() { return -2; }

// __heapset — (stub)
export function __heapset(_Fill) { return __heapchk(); }

// __heap_init — (stub)
export function __heap_init() { return 1; }

// __heap_term — (stub)
export function __heap_term() { }

// FUN_005fcdc0 — get SBH threshold
export function FUN_005fcdc0() { return DAT_0063ac54; }

// __set_sbh_threshold — (stub)
export function __set_sbh_threshold(param_1) { return true; }

// ___sbh_new_region — (stub)
export function ___sbh_new_region() { return null; }

// ___sbh_release_region — (stub)
export function ___sbh_release_region(param_1) { }

// ___sbh_decommit_pages — (stub)
export function ___sbh_decommit_pages(param_1) { }

// ___sbh_find_block — (stub)
export function ___sbh_find_block(param_1, param_2, param_3) { return 0; }

// ___sbh_free_block — (stub)
export function ___sbh_free_block(param_1, param_2, param_3) { }

// ___sbh_alloc_block — (stub)
export function ___sbh_alloc_block(param_1) { return null; }

// ___sbh_alloc_block_from_page — (stub)
export function ___sbh_alloc_block_from_page(param_1, param_2, param_3) { return 0; }

// ___sbh_resize_block — (stub)
export function ___sbh_resize_block(param_1, param_2, param_3, param_4) { return 0; }

// ___sbh_heap_check — (stub)
export function ___sbh_heap_check() { return 0; }

// __lseek — (stub)
export function __lseek(_FileHandle, _Offset, _Origin) { return -1; }

// ___initstdio — (stub)
export function ___initstdio() { }

// ___endstdio — (stub)
export function ___endstdio() { }

// __setdefaultprecision — (stub)
export function __setdefaultprecision() { }

// __ms_p5_test_fdiv — Pentium FDIV bug test (stub)
export function __ms_p5_test_fdiv() { return 0; }

// __ms_p5_mp_test_fdiv — Pentium FDIV multiprocessor test (stub)
export function __ms_p5_mp_test_fdiv() { }

// __forcdecpt — force decimal point (stub)
export function __forcdecpt(_Buf) { }

// __cropzeros — crop trailing zeros (stub)
export function __cropzeros(_Buf) { }

// __positive — check if positive (stub)
export function __positive(arg) { return 1; }

// __fassign — float assign (stub)
export function __fassign(flag, argument, number) { }

// __cftoe — float to E format (stub)
export function __cftoe(_Value, _Buf, _SizeInBytes, _Dec, _Caps) { return 0; }

// __cftof — float to F format (stub)
export function __cftof(_Value, _Buf, _SizeInBytes, _Dec) { return 0; }

// __cftog — float to G format (stub)
export function __cftog(param_1, param_2, param_3, param_4) { }

// __cftoe_g — float to E format (g variant) (stub)
export function __cftoe_g(param_1, param_2, param_3, param_4) { return 0; }

// __cftof_g — float to F format (g variant) (stub)
export function __cftof_g(param_1, param_2, param_3) { return 0; }

// __cfltcvt — float conversion dispatch (stub)
export function __cfltcvt(arg, buffer, sizeInBytes, format, precision, caps) { return 0; }

// __shift — shift string right (stub)
export function __shift(param_1, param_2) { }

// __XcptFilter — exception filter (stub)
export function __XcptFilter(_ExceptionNum, _ExceptionPtr) { return 0; }

// xcptlookup — exception table lookup (stub)
export function xcptlookup(param_1) { return null; }

// __ismbbkalnum — multibyte alnum (stub)
export function __ismbbkalnum(_C) { return 0; }

// __ismbbkprint — multibyte printable (stub)
export function __ismbbkprint(_C) { return 0; }

// __ismbbkpunct — multibyte punct (stub)
export function __ismbbkpunct(_C) { return 0; }

// __ismbbalnum — multibyte alnum (stub)
export function __ismbbalnum(_C) { return 0; }

// __ismbbalpha — multibyte alpha (stub)
export function __ismbbalpha(_C) { return 0; }

// __ismbbgraph — multibyte graph (stub)
export function __ismbbgraph(_C) { return 0; }

// __ismbbprint — multibyte print (stub)
export function __ismbbprint(_C) { return 0; }

// __ismbbpunct — multibyte punct (stub)
export function __ismbbpunct(_C) { return 0; }

// __ismbblead — multibyte lead byte (stub)
export function __ismbblead(_C) { return 0; }

// __ismbbtrail — multibyte trail byte (stub)
export function __ismbbtrail(_C) { return 0; }

// __ismbbkana — multibyte kana (stub)
export function __ismbbkana(_C) { return 0; }

// x_ismbbtype — multibyte type check (stub)
export function x_ismbbtype(param_1, param_2, param_3) { return 0; }

// __setenvp — set environment (stub)
export function __setenvp() { return 0; }

// __setargv — set argv (stub)
export function __setargv() { return 0; }

// parse_cmdline — parse command line (stub)
export function parse_cmdline(param_1, param_2, param_3, param_4, param_5) { }

// ___crtGetEnvironmentStringsW — (stub)
export function ___crtGetEnvironmentStringsW() { return null; }

// ___crtGetEnvironmentStringsA — (stub)
export function ___crtGetEnvironmentStringsA() { return null; }

// __setmbcp — set multibyte code page (stub)
export function __setmbcp(_CodePage) { return 0; }

// getSystemCP — get system code page (stub)
export function getSystemCP(param_1) { return param_1; }

// _CPtoLCID — code page to LCID (stub)
export function _CPtoLCID(param_1) { return 0; }

// setSBCS — set single byte char set (stub)
export function setSBCS() { }

// FUN_005fffa0 — get multibyte code page
export function FUN_005fffa0() { return DAT_0063b0a4; }

// ___initmbctable — init MB char table (stub)
export function ___initmbctable() { __setmbcp(-3); }

// __FF_MSGBANNER — runtime error message banner (stub)
export function __FF_MSGBANNER() { }


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
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
