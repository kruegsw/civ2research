// ═══════════════════════════════════════════════════════════════════
// block_005A0000.js — Mechanical transpilation of block_005A0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005A0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005A0000.c
// ═══════════════════════════════════════════════════════════════════


// Aliases for 32-bit read/write (ri = read int32, wi = write int32)



// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
//
// Many of these are UI framework state pointers and are stubbed as
// simple mutable variables. Game-logic globals that appear in mem.js
// are imported above.
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// STUBS: Win32 API and MFC calls — no-ops in JS
// ═══════════════════════════════════════════════════════════════════

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_00408330, FUN_00408460, FUN_00408490 } from './block_00400000.js';
import { FUN_004085f0, FUN_00408680, FUN_004086c0, FUN_00408d33, FUN_0040bbb0, FUN_0040bc10 } from './block_00400000.js';
import { FUN_0040bc80, FUN_0040ef50, FUN_0040ef70, FUN_0040efd0, FUN_0040f380, FUN_0040f3e0 } from './block_00400000.js';
import { FUN_0040f570, FUN_0040f680, FUN_0040f7d0, FUN_0040f840, FUN_0040f880, FUN_0040f8b0 } from './block_00400000.js';
import { FUN_0040f930, FUN_0040f9d0, FUN_0040fad0, FUN_0040fb00, FUN_0040fc50, FUN_0040fcf0 } from './block_00400000.js';
import { FUN_0040fd40, FUN_0040fd80, FUN_0040fdb0, FUN_0040fe10, FUN_0040fe40, FUN_0040ff00 } from './block_00400000.js';
import { FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410402, FUN_00413476, FUN_00414be0, FUN_00414c20, FUN_00414c60 } from './block_00410000.js';
import { FUN_00414ca0, FUN_00414ce0, FUN_00414d10, FUN_00414d40, FUN_00418740, FUN_00418770 } from './block_00410000.js';
import { FUN_004187a0, FUN_00418870, FUN_004189c0, FUN_00418a30, FUN_00418a70, FUN_00418ce0 } from './block_00410000.js';
import { FUN_00418d20, FUN_00418d60, FUN_00418d90, FUN_00418e00, FUN_00418ea0, FUN_00418f40 } from './block_00410000.js';
import { FUN_00419020, FUN_004190a0, FUN_004190d0, FUN_00419b80, FUN_00419c8b, FUN_0041a046 } from './block_00410000.js';
import { FUN_0041a422, FUN_0041a5c4, FUN_0041b8ff, FUN_0041d417, FUN_0041d7ea, FUN_0041dd0e } from './block_00410000.js';
import { FUN_0041e864 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421bd0, FUN_00421da0, FUN_00421e70, FUN_00426fb0, FUN_00426ff0 } from './block_00420000.js';
import { FUN_00428b0c, FUN_0042a768 } from './block_00420000.js';
import { FUN_0043856b, FUN_0043c7c0, FUN_0043ca10 } from './block_00430000.js';
import { FUN_00447210, FUN_004472f0, FUN_0044c5a0, FUN_0044cba0 } from './block_00440000.js';
import { FUN_00451830, FUN_00451860, FUN_004518d0, FUN_00451930, FUN_004519b0, FUN_00451a60 } from './block_00450000.js';
import { FUN_00451ac0, FUN_00451bf0, FUN_00452768, FUN_00452c14, FUN_00453af0, FUN_00453ba0 } from './block_00450000.js';
import { FUN_0046b14d, FUN_0046e020 } from './block_00460000.js';
import { FUN_00472cf0, FUN_0047cf9e, FUN_0047df20, FUN_0047df50, FUN_0047e94e } from './block_00470000.js';
import { FUN_004824e3, FUN_004828a5, FUN_00486e6f, FUN_00487007, FUN_0048710a, FUN_00487371 } from './block_00480000.js';
import { FUN_00489553, FUN_004897fa, FUN_0048a416, FUN_0048a92d, FUN_0048aa24, FUN_0048aedc } from './block_00480000.js';
import { FUN_0048b165, FUN_0048d9ad, FUN_0048da51, FUN_0048dab9 } from './block_00480000.js';
import { FUN_004923c0, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497d00 } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a6980, FUN_004a73d9, FUN_004a9785 } from './block_004A0000.js';
import { FUN_004aa9c0, FUN_004aef20, FUN_004aef36 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004bb540, FUN_004bb5e0, FUN_004bb800 } from './block_004B0000.js';
import { FUN_004ccab9, FUN_004ccdb6, FUN_004ccdef, FUN_004cefe9 } from './block_004C0000.js';
import { FUN_004e4ceb, FUN_004e7240 } from './block_004E0000.js';
import { FUN_004f4793, FUN_004f6244, FUN_004f6564, FUN_004f6646, FUN_004f7bd1, FUN_004f8a9b } from './block_004F0000.js';
import { FUN_004fba0c, FUN_004fba9c, FUN_004fbb2f, FUN_004fbbdd } from './block_004F0000.js';
import { FUN_0051d63b, FUN_0051d7bc, FUN_0051d7d6, FUN_0051d817, FUN_0051dd97, FUN_0051f19c } from './block_00510000.js';
import { FUN_005218cb, FUN_00521fe0, FUN_0052263c, FUN_005226fa, FUN_005227e3, FUN_00522dfa } from './block_00520000.js';
import { FUN_00522f8f } from './block_00520000.js';
import { FUN_00530eb0, FUN_00531010, FUN_005310a0, FUN_005311b0, FUN_005311e0 } from './block_00530000.js';
import { FUN_00543cd6, FUN_0054a4c4 } from './block_00540000.js';
import { FUN_00551d80, FUN_00551dc0, FUN_00552112, FUN_0055a567, FUN_0055a930, FUN_0055ae80 } from './block_00550000.js';
import { FUN_0055af2e } from './block_00550000.js';
import { FUN_00568e86, FUN_00569363, FUN_0056a65e } from './block_00560000.js';
import { FUN_00573e59 } from './block_00570000.js';
import { FUN_00589ef8, FUN_0058b47e } from './block_00580000.js';
import { FUN_0059b293, FUN_0059c276, FUN_0059c2b8, FUN_0059d3c9, FUN_0059db08, FUN_0059db65 } from './block_00590000.js';
import { FUN_0059df8a, FUN_0059dfb9, FUN_0059e18b, FUN_0059e448, FUN_0059e4e6, FUN_0059e5c9 } from './block_00590000.js';
import { FUN_0059e648, FUN_0059e6a9, FUN_0059e6ff, FUN_0059e783, FUN_0059ea99, FUN_0059ec88 } from './block_00590000.js';
import { FUN_0059edf0, FUN_0059f026, FUN_0059f06d, FUN_0059f2a3, FUN_0059f3d7, FUN_0059f64a } from './block_00590000.js';
import { FUN_0059fb78, FUN_0059fc19, FUN_0059fcba, FUN_0059fd2a } from './block_00590000.js';
import { FUN_005b09dc, FUN_005b6787, FUN_005bb3f0, FUN_005bb4ae, FUN_005bc9a3 } from './block_005B0000.js';
import { FUN_005c0034, FUN_005c0073, FUN_005c00ce, FUN_005c0333, FUN_005c041f, FUN_005c0593 } from './block_005C0000.js';
import { FUN_005c0d69, FUN_005c0f57, FUN_005c1167, FUN_005c11b2, FUN_005c19ad, FUN_005c61b0 } from './block_005C0000.js';
import { FUN_005cd775, FUN_005cda06, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d23bb, FUN_005d25a8, FUN_005d25c0, FUN_005d268e, FUN_005d4014, FUN_005d4167 } from './block_005D0000.js';
import { FUN_005d8236, FUN_005dae6b, FUN_005db0d0, send_msg_3CFF, send_msg_3D62 } from './block_005D0000.js';
import { __chdir, _fputs, _sprintf } from './block_005F0000.js';
import { FUN_005f22d0, FUN_005f22e0, _memset, _strncpy } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

function IsIconic() { return 0; } // DEVIATION: Win32 API
function SetRect() {} // DEVIATION: Win32 API
function SetFocus() {} // DEVIATION: Win32 API
function GetAsyncKeyState() { return 0; } // DEVIATION: Win32 API
function MessageBoxA() {} // DEVIATION: Win32 API
function XD_FlushSendBuffer() {} // DEVIATION: network
function operator_new() { return {}; } // DEVIATION: MFC
function operator_delete() {} // DEVIATION: MFC
function _strlen(s) { return typeof s === 'string' ? s.length : 0; }
function _strchr() { return 0; }
function _strcmp() { return 0; }
function __strcmpi() { return 0; }
function __strnicmp() { return 0; }
function _atoi() { return 0; }
function _rand() { return Math.floor(Math.random() * 32768); }
function _isalpha() { return 0; }
function _isdigit() { return 0; }
function FID_conflict___toupper_lk(c) { return c; }
function _eh_vector_constructor_iterator_() {} // DEVIATION: MFC
function _eh_vector_destructor_iterator_() {} // DEVIATION: MFC
function tie() {} // DEVIATION: MFC
function CRichEditDoc_InvalidateObjectCache() {} // DEVIATION: MFC
function CRichEditCntrItem_GetActiveView() { return 0; } // DEVIATION: MFC
function CPropertySheet_EnableStackedTabs() {} // DEVIATION: MFC
function CCheckListBox_GetCheckStyle() { return 0; } // DEVIATION: MFC
function COleControlSite_SetDlgCtrlID() {} // DEVIATION: MFC
function CDialog_SetHelpID() {} // DEVIATION: MFC
function COleClientItem_GetActiveView() { return 0; } // DEVIATION: MFC
function ios_width() { return 0; } // DEVIATION: MFC
function ios_delbuf() {} // DEVIATION: MFC
function _Timevec_destructor() { return 0; } // DEVIATION: MFC


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks (not yet defined)
// These are all thunk_FUN_ or FUN_ calls to code outside this block.
// ═══════════════════════════════════════════════════════════════════

function FUN_005ab07f() { FUN_0059df8a(); }
function FUN_005abfdb() { FUN_0059df8a(); }
function FUN_005aebef() { FUN_0059df8a(); }
function FUN_005aed0d() { FUN_0059df8a(); }

// Stubs for functions from many other blocks
function thunk_load_verify_units() { return 0; }
function thunk_show_messagebox_CF2D() { return 0; }
function FUN_005a9640_impl() {}


// ============================================================
// Function: FUN_005a0fea @ 0x005A0FEA
// Size: 350 bytes
// draw_text_with_shadow — draws text with optional shadow
// ============================================================

export function FUN_005a0fea(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: in_ECX is MFC this-pointer; entire function is UI text rendering
  let in_ECX = G.DAT_006cec84;
  while (param_1 !== null && param_1[0] !== 0) {
    let iVar1 = 0; // *(int *)(in_ECX + 0x1e8 + *(int *)(in_ECX + 0x48) * 4)
    let iVar2 = FUN_0040efd0(param_1);
    if (iVar2 <= iVar1 + -6) break;
    let sVar3 = _strlen(param_1);
    // param_1[sVar3 - 1] = '\0';
    break; // DEVIATION: string mutation not supported
  }
  let local_8, local_c;
  if (param_4 === 0) {
    local_8 = 0; // *(int *)(in_ECX + 0x94)
    local_c = 0; // *(int *)(in_ECX + 0x98)
  } else {
    local_8 = 0; // *(int *)(in_ECX + 0xa0)
    local_c = 0; // *(int *)(in_ECX + 0xa4)
  }
  if (local_c !== local_8) {
    FUN_005c19ad(local_c);
    FUN_005c0f57(0, param_1, param_2 + 2, param_3 + 1, 5);
    FUN_005c19ad(local_8);
    FUN_005c0f57(0, param_1, param_2 + 1, param_3, 5);
  }
  if (param_5 === 0) {
    FUN_005c19ad(local_8);
  } else {
    FUN_005c19ad(0); // *(undefined4 *)(in_ECX + 0x6c)
  }
  FUN_005c0f57(0, param_1, param_2, param_3, 5);
  return;
}


// ============================================================
// Function: FUN_005a1148 @ 0x005A1148
// Size: 195 bytes
// draw_split_text — draws text, split at '|' character
// ============================================================

export function FUN_005a1148(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: in_ECX is MFC this-pointer; UI text rendering with pipe-split
  let in_ECX = G.DAT_006cec84;
  let local_8 = 0;
  let pcVar2 = _strchr(param_1, 0x7c);
  if (pcVar2 !== 0) {
    local_8 = pcVar2 + 1;
    // *pcVar2 = '\0';
  }
  FUN_005a0fea(param_1, 0 + param_2, param_3, param_4, param_5);
  if (local_8 !== 0) {
    let iVar1 = 0; // *(int *)(in_ECX + 0x1e8 + *(int *)(in_ECX + 0x48) * 4)
    let iVar3 = FUN_0040efd0(local_8);
    FUN_005a0fea(local_8, (iVar1 + param_2 + -4) - iVar3, param_3, param_4, param_5);
    // *pcVar2 = '|';
  }
  return;
}


// ============================================================
// Function: FUN_005a120b @ 0x005A120B
// Size: 706 bytes
// draw_list_item — renders a single list item in popup
// ============================================================

export function FUN_005a120b(param_1, param_2) {
  // DEVIATION: in_ECX is MFC this-pointer; UI list item rendering
  let in_ECX = G.DAT_006cec84;
  let local_18;
  if (param_1 === null || param_1 === 0) {
    local_18 = 0;
  } else {
    // Stubbed: complex list item rendering with linked list traversal,
    // rect calculation, drawing callbacks, and selection highlighting
    local_18 = 0;
  }
  return local_18;
}


// ============================================================
// Function: FUN_005a14d2 @ 0x005A14D2
// Size: 660 bytes
// redraw_list_items — redraws all visible list items
// ============================================================

export function FUN_005a14d2() {
  // DEVIATION: in_ECX is MFC this-pointer; UI list redraw
  // Complex: iterates over two tabs (0 and 1), walks linked lists,
  // draws each item, handles scrollbar state, clips regions
  return;
}


// ============================================================
// Function: FUN_005a1766 @ 0x005A1766
// Size: 62 bytes
// scale_to_page — divides value by page size if multi-column
// ============================================================

export function FUN_005a1766(param_1) {
  // DEVIATION: in_ECX is MFC this-pointer
  // if (*(int *)(in_ECX + 0x38) != 1)
  //   param_1 = param_1 / *(int *)(in_ECX + 0x5c + *(int *)(in_ECX + 0x48) * 4);
  return param_1;
}


// ============================================================
// Function: FUN_005a17a4 @ 0x005A17A4
// Size: 69 bytes
// round_to_page — rounds down to page boundary
// ============================================================

export function FUN_005a17a4(param_1) {
  // DEVIATION: in_ECX is MFC this-pointer
  // if (*(int *)(in_ECX + 0x38) != 1)
  //   param_1 = param_1 - param_1 % *(int *)(in_ECX + 0x5c + *(int *)(in_ECX + 0x48) * 4);
  return param_1;
}


// ============================================================
// Function: FUN_005a17e9 @ 0x005A17E9
// Size: 603 bytes
// scroll_to_item — scrolls list to show given item
// ============================================================

export function FUN_005a17e9(param_1, param_2) {
  // DEVIATION: in_ECX is MFC this-pointer; complex scroll logic
  // with linked list position tracking, scrollbar updates, redraws
  return;
}


// ============================================================
// Function: FUN_005a1a44 @ 0x005A1A44
// Size: 57 bytes
// clamp — clamp value between min and max
// ============================================================

export function FUN_005a1a44(param_1, param_2, param_3) {
  if (param_2 <= param_1) {
    param_2 = param_1;
  }
  if (param_2 <= param_3) {
    param_3 = param_2;
  }
  return param_3;
}


// ============================================================
// Function: FUN_005a1a7d @ 0x005A1A7D
// Size: 469 bytes
// hit_test_list — converts pixel coords to list item index
// ============================================================

export function FUN_005a1a7d(param_1, param_2) {
  // DEVIATION: in_ECX is MFC this-pointer; UI hit testing
  FUN_005a1caf(param_1, param_2);
  // Complex coordinate-to-index mapping with scrollbar checks
  return -1;
}


// ============================================================
// Function: FUN_005a1c52 @ 0x005A1C52
// Size: 93 bytes
// count_items_in_tab — counts list items for given tab index
// ============================================================

export function FUN_005a1c52(param_1) {
  // DEVIATION: in_ECX is MFC this-pointer
  let local_8 = 0;
  // for (local_c = *(int *)(in_ECX + 0x228); local_c != 0; local_c = *(int *)(local_c + 0x10))
  //   if (*(int *)(local_c + 0xc) == param_1) local_8 = local_8 + 1;
  return local_8;
}


// ============================================================
// Function: FUN_005a1caf @ 0x005A1CAF
// Size: 244 bytes
// select_tab_from_coords — picks tab based on mouse coords
// ============================================================

export function FUN_005a1caf(param_1, param_2) {
  // DEVIATION: in_ECX is MFC this-pointer; UI tab selection
  // Checks if mouse coords fall in tab 0 or tab 1 area
  return;
}


// ============================================================
// Function: FUN_005a1da3 @ 0x005A1DA3
// Size: 133 bytes
// scroll_popup_to_index — scrolls the active popup to index
// ============================================================

export function FUN_005a1da3(param_1) {
  if (G.DAT_006cec84 !== 0) {
    // *(undefined4 *)(G.DAT_006cec84 + 0x48) = 0;
    let iVar1 = FUN_0059fc19(param_1);
    // if (*(int *)(G.DAT_006cec84 + 0x210 + *(int *)(G.DAT_006cec84 + 0x48) * 4) != iVar1) {
    //   *(int *)(G.DAT_006cec84 + 0x210 + ...) = iVar1;
    //   FUN_005a14d2();
    // }
  }
  return;
}


// ============================================================
// Function: FUN_005a1e28 @ 0x005A1E28
// Size: 693 bytes
// create_popup_window — creates the popup drawing surface
// ============================================================

export function FUN_005a1e28() {
  // DEVIATION: MFC window creation with operator_new, SEH,
  // CRichEditView, CPropertySheet calls
  // Complex: creates popup window, sets up scrollbar callbacks,
  // applies background bitmap, etc.
  return 0;
}


// ============================================================
// Function: FUN_005a20f4 @ 0x005A20F4
// Size: 40 bytes
// refresh_popup_callback — callback to refresh popup
// ============================================================

export function FUN_005a20f4() {
  if (G.DAT_006cec84 !== 0) {
    FUN_005a577e();
  }
  return;
}


// ============================================================
// Function: FUN_005a211c @ 0x005A211C
// Size: 6616 bytes
// setup_popup_controls — creates all popup sub-controls
// ============================================================

export function FUN_005a211c() {
  // DEVIATION: Massive MFC control creation function (6616 bytes)
  // Creates scrollbars, list items, tabs, buttons, checkboxes.
  // Uses operator_new, _eh_vector_constructor_iterator_, SEH.
  // All UI framework code with in_ECX (this-pointer).
  return;
}


// ============================================================
// Function: FUN_005a3bae @ 0x005A3BAE
// Size: 170 bytes
// on_list_select — handles list item selection
// ============================================================

export function FUN_005a3bae(param_1, param_2) {
  let local_10 = 0;
  if (G.DAT_006cec84 !== 0) {
    let local_c = 0;
    // Walk linked list at G.DAT_006cec84 + 0x228 to find item at index param_2
    // for (local_8 = *(int *)(G.DAT_006cec84 + 0x228); local_8 != 0; local_8 = *(int *)(local_8 + 0x10))
    //   if (param_2 == local_c) local_10 = local_8;
    //   local_c = local_c + 1;
    // *(undefined4 *)(G.DAT_006cec84 + 0xd8) = 0xffffffff;
    // if (local_10 != 0) *(undefined4 *)(G.DAT_006cec84 + 0xd8) = *(undefined4 *)(local_10 + 4);
    // *(uint *)(G.DAT_006cec84 + 0x3c) = *(uint *)(G.DAT_006cec84 + 0x3c) | 0x2000;
    FUN_005a3c58();
  }
  return;
}


// ============================================================
// Function: FUN_005a3c58 @ 0x005A3C58
// Size: 43 bytes
// invalidate_popup — marks popup for redraw
// ============================================================

export function FUN_005a3c58() {
  // G.DAT_006cec84[0xf] = G.DAT_006cec84[0xf] | 0x400;
  // CRichEditDoc::InvalidateObjectCache(*(G.DAT_006cec84) + 0x48);
  CRichEditDoc_InvalidateObjectCache();
  return;
}


// ============================================================
// Function: FUN_005a3c83 @ 0x005A3C83
// Size: 71 bytes
// invalidate_if_no_icons — invalidate popup if not icon mode
// ============================================================

export function FUN_005a3c83() {
  if (G.DAT_006cec84 !== 0) {
    // if ((*(byte *)(G.DAT_006cec84 + 0x3d) & 4) == 0) {
    //   *(uint *)(G.DAT_006cec84 + 0x3c) |= 0x2000;
    FUN_005a3c58();
    // }
  }
  return;
}


// ============================================================
// Function: FUN_005a3cca @ 0x005A3CCA
// Size: 297 bytes
// on_tab_click — handles tab click in popup
// ============================================================

export function FUN_005a3cca(param_1) {
  let bVar1 = false;
  // local_c = *(undefined4 **)(G.DAT_006cec84 + 0x234);
  // Walk linked list to find tab at index param_1 - 300
  // Set G.DAT_006cec84 + 0xd8, call callback if set, redraw
  // if (*(int *)(G.DAT_006cec84 + 0x23c) != 0) {
  //   iVar2 = callback(*local_c);
  //   FUN_005a577e();
  //   if (iVar2 != 0) {
  //     *(uint *)(G.DAT_006cec84 + 0x3c) |= 0x2000;
  //     FUN_005a3c58();
  //   }
  // } else if (bVar1) { FUN_005a577e(); }
  return;
}


// ============================================================
// Function: FUN_005a3df3 @ 0x005A3DF3
// Size: 99 bytes
// on_help_click — handles help button in popup tabs
// ============================================================

// Source: decompiled/block_005A0000.c FUN_005a3df3 (75 bytes)
export function FUN_005a3df3() {
  if (ri(G.DAT_006cec84, 0x240) !== 0) {
    // let iVar1 = (ri(G.DAT_006cec84, 0x240))(0); // DEVIATION: MFC — callback function pointer
    let iVar1 = 0; // DEVIATION: callback not available in JS
    if (iVar1 === 0) {
      FUN_005a577e();
    } else {
      wi(G.DAT_006cec84, 0x3c, ri(G.DAT_006cec84, 0x3c) | 0x2000); // game state: set flag
      FUN_005a3c58();
    }
  }
}


// ============================================================
// Function: FUN_005a3e56 @ 0x005A3E56
// Size: 548 bytes
// on_button_click — handles button press in popup
// ============================================================

export function FUN_005a3e56(param_1) {
  if (G.DAT_006cec84 !== 0) {
    G.DAT_006cec80 = FUN_00421bb0();
    param_1 = param_1 + -100;
    let local_18;
    // if (param_1 < *(int *)(G.DAT_006cec84 + 0x30))
    //   local_18 = *(int *)(G.DAT_006cec84 + 0x2ac + param_1 * 8);
    // else
    //   *(int *)(G.DAT_006cec84 + 0xdc) = (param_1 - *(int *)(G.DAT_006cec84 + 0x30)) + 1;
    //   local_18 = 0;
    local_18 = 0;
    // if (local_18 == 1) *(uint *)(G.DAT_006cec84 + 0x3c) |= 0x80;
    // if (local_18 == 0 && has tabs && selected tab != 0) {
    //   find tab index, call FUN_005a3cca(index + 300);
    // }
    // if (local_18 == 2) *(undefined4 *)(G.DAT_006cec84 + 0xd8) = 0xffffffff;
    // else { set d8 based on selection }
    FUN_005a3c58();
  }
  return;
}


// ============================================================
// Function: FUN_005a407f @ 0x005A407F
// Size: 2181 bytes
// on_key_navigate — handles keyboard navigation in popup list
// ============================================================

export function FUN_005a407f(param_1) {
  if (G.DAT_006cec84 === 0) {
    return;
  }
  // DEVIATION: 2181-byte switch statement handling arrow keys,
  // page up/down, home/end for list navigation across tabs.
  // Uses goto labels for up/down traversal with linked lists.
  // Entirely UI keyboard navigation.
  return;
}


// ============================================================
// Function: FUN_005a49c1 @ 0x005A49C1
// Size: 1069 bytes
// on_alpha_key — handles alphabetic key press for quick-select
// ============================================================

export function FUN_005a49c1(param_1) {
  // DEVIATION: 1069-byte function searching list items by first letter,
  // scrolling to match. Uses _isalpha, FID_conflict___toupper_lk,
  // linked list traversal, and multiple code paths for different
  // popup modes (list, combobox, tabs).
  return;
}


// ============================================================
// Function: FUN_005a4df3 @ 0x005A4DF3
// Size: 236 bytes
// on_mouse_down — handles mouse button press in list area
// ============================================================

export function FUN_005a4df3(param_1, param_2) {
  if (G.DAT_006cec84 !== 0) {
    FUN_005a1caf(param_1, param_2);
    // *(undefined4 *)(G.DAT_006cec84 + 0x218 + *(int *)(G.DAT_006cec84 + 0x48) * 4) = 0;
    // if (list mode && items exist) {
    //   iVar1 = FUN_005a1a7d(param_1, param_2);
    //   if (iVar1 >= 0) {
    //     set drag flag, capture mouse, scroll to item
    //   }
    // }
  }
  return;
}


// ============================================================
// Function: FUN_005a4edf @ 0x005A4EDF
// Size: 1130 bytes
// on_mouse_move_drag — handles mouse drag in list area
// ============================================================

export function FUN_005a4edf(param_1, param_2) {
  // DEVIATION: 1130-byte drag scrolling with boundary handling.
  // Complex switch on hit-test result (-4 to -1 for edges,
  // >= 0 for item hit), with multi-column scroll logic.
  return;
}


// ============================================================
// Function: FUN_005a535e @ 0x005A535E
// Size: 90 bytes
// on_mouse_up — handles mouse button release
// ============================================================

export function FUN_005a535e(param_1, param_2) {
  if (G.DAT_006cec84 !== 0) {
    FUN_005a4edf(param_1, param_2);
    // *(undefined4 *)(G.DAT_006cec84 + 0x218 + *(int *)(G.DAT_006cec84 + 0x48) * 4) = 0;
    FUN_00414d40();
  }
  return;
}


// ============================================================
// Function: FUN_005a53b8 @ 0x005A53B8
// Size: 220 bytes
// on_double_click — handles double-click in list
// ============================================================

export function FUN_005a53b8(param_1, param_2) {
  if (G.DAT_006cec84 !== 0) {
    FUN_005a1caf(param_1, param_2);
    // if (list mode && items exist && not icon mode) {
    //   iVar1 = FUN_005a1a7d(param_1, param_2);
    //   if (iVar1 >= 0) {
    //     set drag flag;
    //     FUN_005a535e(param_1, param_2);
    //     *(uint *)(G.DAT_006cec84 + 0x3c) |= 0x2000;
    //     FUN_005a3c58();
    //   }
    // }
  }
  return;
}


// ============================================================
// Function: FUN_005a5494 @ 0x005A5494
// Size: 152 bytes
// on_scrollbar_0 — horizontal scrollbar handler (tab 0)
// ============================================================

export function FUN_005a5494(param_1) {
  if (G.DAT_006cec84 !== 0) {
    // *(undefined4 *)(G.DAT_006cec84 + 0x48) = 0;
    // iVar1 = FUN_0059fc19(*(int *)(G.DAT_006cec84 + 0x5c + 0) * param_1);
    // if (*(int *)(G.DAT_006cec84 + 0x210 + 0) != iVar1) {
    //   *(int *)(G.DAT_006cec84 + 0x210 + 0) = iVar1;
    //   FUN_005a14d2();
    // }
  }
  return;
}


// ============================================================
// Function: FUN_005a552c @ 0x005A552C
// Size: 133 bytes
// on_scrollbar_1_item — scrollbar handler for tab 1
// ============================================================

export function FUN_005a552c(param_1) {
  if (G.DAT_006cec84 !== 0) {
    // *(undefined4 *)(G.DAT_006cec84 + 0x48) = 1;
    // iVar1 = FUN_0059fc19(param_1);
    // if (*(int *)(G.DAT_006cec84 + 0x210 + 4) != iVar1) {
    //   *(int *)(G.DAT_006cec84 + 0x210 + 4) = iVar1;
    //   FUN_005a14d2();
    // }
  }
  return;
}


// ============================================================
// Function: FUN_005a55b1 @ 0x005A55B1
// Size: 152 bytes
// on_scrollbar_1_page — scrollbar handler for tab 1 by page
// ============================================================

export function FUN_005a55b1(param_1) {
  if (G.DAT_006cec84 !== 0) {
    // *(undefined4 *)(G.DAT_006cec84 + 0x48) = 1;
    // iVar1 = FUN_0059fc19(*(int *)(G.DAT_006cec84 + 0x5c + 4) * param_1);
    // if (*(int *)(G.DAT_006cec84 + 0x210 + 4) != iVar1) {
    //   *(int *)(G.DAT_006cec84 + 0x210 + 4) = iVar1;
    //   FUN_005a14d2();
    // }
  }
  return;
}


// ============================================================
// Function: FUN_005a5649 @ 0x005A5649
// Size: 309 bytes
// draw_popup_background — draws popup background (solid or tiled)
// ============================================================

export function FUN_005a5649(param_1, param_2) {
  // DEVIATION: in_ECX is MFC this-pointer
  // Checks in_ECX[1] for custom bitmap, draws background using
  // solid fill (FUN_0040fdb0) or tiled bitmap (FUN_005a9b5d / FUN_0055a930)
  return;
}


// ============================================================
// Function: FUN_005a577e @ 0x005A577E
// Size: 1964 bytes
// redraw_popup — full popup redraw
// ============================================================

export function FUN_005a577e() {
  // DEVIATION: 1964-byte function. Massive redraw:
  // draws border, title text with shadow, buttons, tab labels,
  // list items, icons, scrollbars. Calls FUN_005a1e28, FUN_005a211c,
  // FUN_005a14d2, FUN_005a5649, FUN_005a99fc, FUN_005a9b5d,
  // FUN_005a9730, FUN_005c19ad, FUN_005c0f57, etc.
  return;
}


// ============================================================
// Function: FUN_005a5f34 @ 0x005A5F34
// Size: 999 bytes
// show_popup_modal — displays popup and runs message loop
// ============================================================

export function FUN_005a5f34(param_1, param_2) {
  // DEVIATION: 999-byte function. Creates popup, runs modal event loop,
  // returns result. Uses win32 message pump (FUN_0040ef50),
  // callback loop (FUN_005a3c58), text input (FUN_005a96b0),
  // checkbox state (ios_width), and result extraction.
  return 0;
}


// ============================================================
// Function: FUN_005a632a @ 0x005A632A
// Size: 2287 bytes
// parse_popup_script — reads popup definition from text file
// ============================================================

export function FUN_005a632a(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: 2287-byte text parser. Reads @OPTIONS, @PROMPT, @TITLE,
  // @BUTTON, @COLUMNS, @HEIGHT, @WIDTH, @LENGTH, @CHECKBOX, @LISTBOX,
  // @SYSTEM, @DEFAULT, @SMALLFONT directives from game text files.
  // Calls FUN_005f22d0, FUN_004a2379, FUN_004a23fc, FUN_0059dfb9,
  // FUN_0059e18b, FUN_00426ff0, FUN_0059e6a9, FUN_0059f2a3,
  // FUN_0059e4e6, ios_delbuf, FUN_0059e6ff, FUN_0059e5c9,
  // FUN_0059edf0, FUN_0059f026, FUN_0059f06d, etc.
  return 0;
}


// ============================================================
// Function: FUN_005a6c23 @ 0x005A6C23
// Size: 34 bytes
// push_parent_window — saves and sets custom parent window
// ============================================================

export function FUN_005a6c23(param_1) {
  G.DAT_006359c8 = G.DAT_006359c4;
  G.DAT_006359c4 = param_1;
  return;
}


// ============================================================
// Function: FUN_005a6c45 @ 0x005A6C45
// Size: 26 bytes
// pop_parent_window — restores previous parent window
// ============================================================

export function FUN_005a6c45() {
  G.DAT_006359c4 = G.DAT_006359c8;
  return;
}


// ============================================================
// Function: FID_conflict__vector_deleting_destructor_ @ 0x005A9320
// Size: 110 bytes
// vector_deleting_destructor (0x3c stride)
// ============================================================

export function FID_conflict__vector_deleting_destructor__9320(param_1) {
  // DEVIATION: MFC vector destructor
  if ((param_1 & 2) === 0) {
    FUN_0040f930();
    if ((param_1 & 1) !== 0) {
      operator_delete();
    }
  } else {
    _eh_vector_destructor_iterator_();
    operator_delete();
  }
  return;
}


// ============================================================
// Function: FID_conflict__vector_deleting_destructor_ @ 0x005A93B0
// Size: 110 bytes
// vector_deleting_destructor (0x48 stride)
// ============================================================

export function FID_conflict__vector_deleting_destructor__93B0(param_1) {
  // DEVIATION: MFC vector destructor
  if ((param_1 & 2) === 0) {
    FUN_00418870();
    if ((param_1 & 1) !== 0) {
      operator_delete();
    }
  } else {
    _eh_vector_destructor_iterator_();
    operator_delete();
  }
  return;
}


// ============================================================
// Function: FID_conflict__vector_deleting_destructor_ @ 0x005A9440
// Size: 110 bytes
// vector_deleting_destructor (0x3c stride, variant 2)
// ============================================================

export function FID_conflict__vector_deleting_destructor__9440(param_1) {
  // DEVIATION: MFC vector destructor
  if ((param_1 & 2) === 0) {
    FUN_0040f570();
    if ((param_1 & 1) !== 0) {
      operator_delete();
    }
  } else {
    _eh_vector_destructor_iterator_();
    operator_delete();
  }
  return;
}


// ============================================================
// Function: FUN_005a94d0 @ 0x005A94D0
// Size: 57 bytes
// scalar_deleting_destructor_94d0
// ============================================================

export function FUN_005a94d0(param_1) {
  // DEVIATION: MFC scalar destructor
  FUN_00418ea0();
  if ((param_1 & 1) !== 0) {
    operator_delete();
  }
  return;
}


// ============================================================
// Function: FID_conflict__vector_deleting_destructor_ @ 0x005A9520
// Size: 110 bytes
// vector_deleting_destructor (0x40 stride)
// ============================================================

export function FID_conflict__vector_deleting_destructor__9520(param_1) {
  // DEVIATION: MFC vector destructor
  if ((param_1 & 2) === 0) {
    FUN_00453ba0();
    if ((param_1 & 1) !== 0) {
      operator_delete();
    }
  } else {
    _eh_vector_destructor_iterator_();
    operator_delete();
  }
  return;
}


// ============================================================
// Function: FUN_005a95b0 @ 0x005A95B0
// Size: 57 bytes
// scalar_deleting_destructor_95b0
// ============================================================

export function FUN_005a95b0(param_1) {
  // DEVIATION: MFC scalar destructor
  FUN_0044cba0();
  if ((param_1 & 1) !== 0) {
    operator_delete();
  }
  return;
}


// ============================================================
// Function: FUN_005a9600 @ 0x005A9600
// Size: 43 bytes
// set_icon_bitmap — sets icon bitmap for popup item
// ============================================================

export function FUN_005a9600(param_1) {
  // DEVIATION: in_ECX is MFC this-pointer
  // FUN_005bc9a3(*(undefined4 *)(in_ECX + 8), param_1);
  FUN_005bc9a3(0, param_1);
  return;
}


// ============================================================
// Function: FUN_005a9640 @ 0x005A9640
// Size: 32 bytes
// disable_item — clears item enabled flag
// ============================================================

export function FUN_005a9640() {
  // DEVIATION: in_ECX is MFC this-pointer
  // *(undefined4 *)(in_ECX + 0x34) = 0;
  return;
}


// ============================================================
// Function: FUN_005a9670 @ 0x005A9670
// Size: 47 bytes
// get_item_text — sends message to get item text
// ============================================================

export function FUN_005a9670(param_1, param_2) {
  // DEVIATION: in_ECX is MFC this-pointer
  // send_msg_3CFF(*(undefined4 *)(in_ECX + 0x1c), param_1, param_2);
  send_msg_3CFF(0, param_1, param_2);
  return;
}


// ============================================================
// Function: FUN_005a96b0 @ 0x005A96B0
// Size: 43 bytes
// get_selected_text — sends message to get selection text
// ============================================================

export function FUN_005a96b0(param_1) {
  // DEVIATION: in_ECX is MFC this-pointer
  // send_msg_3D62(*(undefined4 *)(in_ECX + 0x1c), param_1);
  send_msg_3D62(0, param_1);
  return;
}


// ============================================================
// Function: FUN_005a96f0 @ 0x005A96F0
// Size: 47 bytes
// is_popup_closable — returns whether popup can be dismissed
// ============================================================

export function FUN_005a96f0() {
  // DEVIATION: in_ECX is MFC this-pointer
  // return (*(byte *)(in_ECX + 0x3d) & 1) != 0;
  return false;
}


// ============================================================
// Function: FUN_005a9730 @ 0x005A9730
// Size: 55 bytes
// draw_icon — draws icon at position
// ============================================================

export function FUN_005a9730(param_1, param_2, param_3, param_4) {
  // DEVIATION: in_ECX is MFC this-pointer
  // FUN_0059f3d7(*(undefined4 *)(in_ECX + 8), param_1, param_2, param_3, param_4);
  FUN_0059f3d7(0, param_1, param_2, param_3, param_4);
  return;
}


// ============================================================
// Function: FUN_005a9780 @ 0x005A9780
// Size: 24 bytes
// set_global_ui_state — sets G.DAT_00635c64
// ============================================================

export function FUN_005a9780(param_1) {
  G.DAT_00635c64 = param_1;
  return;
}


// ============================================================
// Function: FUN_005a9798 @ 0x005A9798
// Size: 52 bytes
// draw_colored_rect — draws a colored rectangle
// ============================================================

export function FUN_005a9798(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005c19ad(param_6);
  FUN_005c11b2(param_2, param_3, param_4, param_5);
  return;
}


// ============================================================
// Function: FUN_005a97cc @ 0x005A97CC
// Size: 69 bytes
// draw_horizontal_line — draws a 1-pixel horizontal line
// ============================================================

export function FUN_005a97cc(param_1, param_2, param_3, param_4, param_5) {
  let local_14 = [0, 0, 0, 0];
  FUN_00408680(local_14, param_2, param_4, param_3 + 1, param_4 + 1);
  FUN_0040fdb0(param_1, local_14, param_5);
  return;
}


// ============================================================
// Function: FUN_005a9811 @ 0x005A9811
// Size: 71 bytes
// draw_horizontal_bar — draws a horizontal bar of given width
// ============================================================

export function FUN_005a9811(param_1, param_2, param_3, param_4, param_5) {
  let local_14 = [0, 0, 0, 0];
  FUN_00408680(local_14, param_2, param_3, param_4 + param_2, param_3 + 1);
  FUN_0040fdb0(param_1, local_14, param_5);
  return;
}


// ============================================================
// Function: FUN_005a9858 @ 0x005A9858
// Size: 69 bytes
// draw_vertical_line — draws a 1-pixel vertical line
// ============================================================

export function FUN_005a9858(param_1, param_2, param_3, param_4, param_5) {
  let local_14 = [0, 0, 0, 0];
  FUN_00408680(local_14, param_2, param_3, param_2 + 1, param_4 + 1);
  FUN_0040fdb0(param_1, local_14, param_5);
  return;
}


// ============================================================
// Function: FUN_005a989d @ 0x005A989D
// Size: 71 bytes
// draw_vertical_bar — draws a vertical bar of given height
// ============================================================

export function FUN_005a989d(param_1, param_2, param_3, param_4, param_5) {
  let local_14 = [0, 0, 0, 0];
  FUN_00408680(local_14, param_2, param_3, param_2 + 1, param_4 + param_3);
  FUN_0040fdb0(param_1, local_14, param_5);
  return;
}


// ============================================================
// Function: FUN_005a98e4 @ 0x005A98E4
// Size: 128 bytes
// draw_rect_outline — draws rectangle outline
// ============================================================

export function FUN_005a98e4(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005a97cc(param_1, param_2, param_4, param_3, param_6);
  FUN_005a97cc(param_1, param_2, param_4, param_5, param_6);
  FUN_005a9858(param_1, param_2, param_3, param_5, param_6);
  FUN_005a9858(param_1, param_4, param_3, param_5, param_6);
  return;
}


// ============================================================
// Function: FUN_005a9964 @ 0x005A9964
// Size: 152 bytes
// draw_rect_outline_wh — draws rectangle outline (width/height)
// ============================================================

export function FUN_005a9964(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005a97cc(param_1, param_2, param_4 + param_2 + -1, param_3, param_6);
  FUN_005a97cc(param_1, param_2, param_4 + param_2 + -1, param_5 + param_3 + -1, param_6);
  FUN_005a9858(param_1, param_2, param_3, param_5 + param_3 + -1, param_6);
  FUN_005a9858(param_1, param_4 + param_2 + -1, param_3, param_5 + param_3 + -1, param_6);
  return;
}


// ============================================================
// Function: FUN_005a99fc @ 0x005A99FC
// Size: 167 bytes
// draw_3d_border — draws 3D raised/lowered border
// ============================================================

export function FUN_005a99fc(param_1, param_2, param_3, param_4) {
  FUN_005a97cc(param_1, param_2[0], param_2[2] + -1, param_2[1], param_3);
  FUN_005a9858(param_1, param_2[0], param_2[1], param_2[3] + -1, param_3);
  FUN_005a97cc(param_1, param_2[0], param_2[2] + -1, param_2[3] + -1, param_4);
  FUN_005a9858(param_1, param_2[2] + -1, param_2[1], param_2[3] + -1, param_4);
  return;
}


// ============================================================
// Function: FUN_005a9aa3 @ 0x005A9AA3
// Size: 28 bytes
// fill_rect_wrapper — wraps FUN_005c041f
// ============================================================

export function FUN_005a9aa3(param_1, param_2) {
  FUN_005c041f(param_2);
  return;
}


// ============================================================
// Function: FUN_005a9abf @ 0x005A9ABF
// Size: 63 bytes
// fill_rect_xywh — fills rectangle given x,y,w,h
// ============================================================

export function FUN_005a9abf(param_1, param_2, param_3, param_4, param_5, param_6) {
  let local_14 = [0, 0, 0, 0];
  FUN_004086c0(local_14, param_2, param_3, param_4, param_5);
  FUN_005c0333(local_14, param_6);
  return;
}


// ============================================================
// Function: FUN_005a9afe @ 0x005A9AFE
// Size: 95 bytes
// blit_rect — copies rectangle between surfaces
// ============================================================

export function FUN_005a9afe(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  let local_24 = [0, 0, 0, 0];
  let local_14 = [0, 0, 0, 0];
  FUN_004086c0(local_14, param_3, param_4, param_7, param_8);
  FUN_004086c0(local_24, param_5, param_6, param_7, param_8);
  FUN_005c0593(param_2, local_14, local_24);
  return;
}


// ============================================================
// Function: FUN_005a9b5d @ 0x005A9B5D
// Size: 391 bytes
// tile_blit — tiles a bitmap into a destination area
// ============================================================

export function FUN_005a9b5d(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  let pCVar2 = COleClientItem_GetActiveView(param_2);
  let pCVar3 = COleClientItem_GetActiveView(param_2);
  if (pCVar2 !== 0 && pCVar3 !== 0) {
    let local_34;
    if (param_3 === param_7 || param_3 - param_7 < 0) {
      local_34 = ~(param_3 - param_7) + 1;
    } else {
      local_34 = param_3 - param_7;
    }
    let local_38;
    if (param_4 === param_8 || param_4 - param_8 < 0) {
      local_38 = ~(param_4 - param_8) + 1;
    } else {
      local_38 = param_4 - param_8;
    }
    let local_2c = local_38 % pCVar3;
    let pCVar4 = param_3 + param_5;
    let pCVar5 = param_4 + param_6;
    let local_8 = param_4;
    while (local_8 < pCVar5) {
      let local_30 = param_3;
      let local_28 = local_34 % pCVar2;
      while (local_30 < pCVar4) {
        let pCVar6 = pCVar2 + (local_30 - local_28);
        if (pCVar4 <= pCVar6) {
          pCVar6 = pCVar4;
        }
        let pCVar7 = pCVar3 + (local_8 - local_2c);
        if (pCVar5 <= pCVar7) {
          pCVar7 = pCVar5;
        }
        FUN_005a9afe(param_2, param_1, local_28, local_2c, local_30, local_8,
                     pCVar6 - local_30, pCVar7 - local_8);
        let iVar1 = local_30 - local_28;
        local_28 = 0;
        local_30 = pCVar2 + iVar1;
      }
      let iVar1 = local_8 - local_2c;
      local_2c = 0;
      local_8 = pCVar3 + iVar1;
    }
  }
  return;
}


// ============================================================
// Function: FUN_005a9ce9 @ 0x005A9CE9
// Size: 183 bytes
// draw_3d_border_and_shrink — draws border then shrinks rect
// ============================================================

export function FUN_005a9ce9(param_1, param_2, param_3, param_4) {
  FUN_005a97cc(param_1, param_2[0], param_2[2] + -1, param_2[1], param_3);
  FUN_005a97cc(param_1, param_2[0], param_2[2] + -1, param_2[3] + -1, param_4);
  FUN_005a9858(param_1, param_2[0], param_2[1], param_2[3] + -1, param_3);
  FUN_005a9858(param_1, param_2[2] + -1, param_2[1], param_2[3] + -1, param_4);
  FUN_004bb800(param_2, 1, 1);
  return;
}


// ============================================================
// Function: FUN_005a9f30 @ 0x005A9F30
// Size: 212 bytes
// check_all_players_ready_production — MP production sync
// ============================================================

export function FUN_005a9f30() {
  FUN_0047e94e(1, 0);
  if (G.DAT_006c9210 !== 0 || G.DAT_006ad308 < 2) {
    let bVar1 = true;
    for (let local_c = 1; local_c < 8; local_c = local_c + 1) {
      if (((1 << (local_c & 0x1f)) & G.DAT_00655b0a) !== 0 &&
          ((1 << (local_c & 0x1f)) & G.DAT_00655b0b) !== 0 &&
          G.DAT_006ced20[local_c] === 0) {
        bVar1 = false;
        break;
      }
    }
    if (bVar1) {
      G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
      CRichEditDoc_InvalidateObjectCache();
    }
  }
  return;
}


// ============================================================
// Function: FUN_005aa004 @ 0x005AA004
// Size: 225 bytes
// check_all_players_ready_moves — MP move sync
// ============================================================

export function FUN_005aa004() {
  FUN_0047e94e(1, 0);
  if (G.DAT_006c921c !== 0 || G.DAT_006ad308 < 2) {
    let bVar1 = true;
    for (let local_c = 1; local_c < 8; local_c = local_c + 1) {
      if (((1 << (local_c & 0x1f)) & G.DAT_00655b0a) !== 0 &&
          ((1 << (local_c & 0x1f)) & G.DAT_00655b0b) !== 0 &&
          G.DAT_006ced20[local_c] === 0) {
        bVar1 = false;
        break;
      }
    }
    if (bVar1 || G.DAT_006ad308 < 2) {
      G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
      CRichEditDoc_InvalidateObjectCache();
    }
  }
  return;
}


// ============================================================
// Function: wait_production_005aa0e5 @ 0x005AA0E5
// Size: 3994 bytes
// wait_production_server — server-side multiplayer turn loop
// ============================================================

export function wait_production_005aa0e5() {
  // SEH frame setup
  // DEVIATION: Win32 — thunk_FUN_0059db08(0x4000);
  FUN_0059db08(0x4000);
  let uVar3 = FUN_00493c7d(G.DAT_006d1da0, G.DAT_006d1da0);
  FUN_005d23bb("Server: %s (%d)", uVar3);

  let local_330; // function-level scope (shared across all loops, per C semantics)
  for (local_330 = 1; local_330 < 8; local_330 = local_330 + 1) {
    if (((G.DAT_006d1da0 !== local_330) && ((1 << (local_330 & 0x1f) & G.DAT_00655b0a) !== 0))
       && ((1 << (local_330 & 0x1f) & G.DAT_00655b0b) !== 0)) {
      uVar3 = FUN_00493c7d(local_330, local_330);
      FUN_005d23bb("Client: %s (%d)", uVar3);
    }
  }

  FUN_0059c2b8();
  FUN_00487007();
  FUN_0042a768();
  FUN_0042a768();
  FUN_004e4ceb();
  FUN_004897fa(1);
  FUN_00413476();

  let local_18 = 0;
  for (let local_328 = 0; local_328 < G.DAT_00655b16; local_328 = local_328 + 1) {
    if ((s32(G.DAT_006560f0, local_328 * 0x20 + 0x1a) !== 0) &&
       (s8(G.DAT_006560f0[local_328 * 0x20 + 7]) === G.DAT_006d1da0)) {
      FUN_00410402(s16(G.DAT_006560f0, local_328 * 0x20),
                   s16(G.DAT_006560f0, local_328 * 0x20 + 2));
      local_18 = local_18 + 1;
      break;
    }
  }
  if (local_18 === 0) {
    for (let local_328 = 0; local_328 < G.DAT_00655b18; local_328 = local_328 + 1) {
      if ((s32(G.DAT_0064f340, local_328 * 0x58 + 0x54) !== 0) &&
         (s8(G.DAT_0064f340[local_328 * 0x58 + 8]) === G.DAT_006d1da0)) {
        FUN_00410402(s16(G.DAT_0064f340, local_328 * 0x58),
                     s16(G.DAT_0064f340, local_328 * 0x58 + 2));
        break;
      }
    }
  }

  let bVar1 = G.DAT_00628048;
  if (G.DAT_00628048 !== 0) {
    let found = false;
    do {
      if ((1 << (G.DAT_00628048 & 0x1f) & G.DAT_00655b0a) !== 0) { found = true; break; }
      G.DAT_00628048 = G.DAT_00628048 + 1;
      if (G.DAT_00628048 === 8) {
        G.DAT_00628048 = 0;
      }
    } while (G.DAT_00628048 !== bVar1);
    if (!found) {
      G.DAT_0064b1ac = 1;
    }
  }

  // Main server turn loop (do-while)
  do {
    G.DAT_00655b0b = G.DAT_006c31a8 | G.DAT_00655b0b;
    G.DAT_006c31a8 = 0;
    _memset(G.DAT_0064ba48, -1, 0xc0);
    FUN_0048710a(0xfffffffd);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(60000);

    // DEVIATION: Win32 message loop — wait for network send/receive
    while ((G.DAT_006c8fac !== 0 || (G.DAT_006c8fa0 !== 0))) {
      FUN_0047e94e(1, 0);
    }

    FUN_0048a92d();
    if (G.DAT_00628048 === 0) {
      FUN_00487371(0xfffffffd);
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(60000);
    }

    let iVar4 = FUN_0048aedc();
    if ((iVar4 !== 0) || (G.DAT_0064b1ac !== 0)) {
      G.DAT_00628044 = 0;
      break;
    }

    if ((G.DAT_00627670 !== 0) && ((G.DAT_00628048 === 0 || (G.DAT_0062c488 !== 0)))) {
      FUN_004fba0c(G.DAT_00655af8);
      FUN_004fba9c(G.DAT_00655af8);
      FUN_004fbb2f(G.DAT_00655af8);
      FUN_004fbbdd();
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }

    G.DAT_00655b0b = (G.DAT_006c31a8 | G.DAT_00655b0b) & (G.DAT_00654fb0 & 0xff);
    G.DAT_006c31a8 = 0;
    G.DAT_006ad699 = 0;

    for (local_330 = 0; (G.DAT_00628044 !== 0 && (local_330 < 8)); local_330 = local_330 + 1) {
      G.DAT_00655b05 = (local_330 & 0xff);
      if (((1 << (local_330 & 0x1f) & G.DAT_00655b0a) !== 0) &&
         ((1 << (local_330 & 0x1f) & G.DAT_00655b0b) === 0)) {
        FUN_00489553(local_330);
        FUN_004b0b53(0xff, 2, 0, 0, 0);
      }
    }

    G.DAT_006ad699 = 1;
    XD_FlushSendBuffer(60000);
    FUN_0059c276();

    for (local_330 = 0; local_330 < 8; local_330 = local_330 + 1) {
      G.DAT_006ced20[local_330] = 0;
    }

    FUN_0046b14d(0x8b, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    G.DAT_006d1da0 = G.DAT_006ad35c[G.DAT_006ad304 * 0x15]; // (&G.DAT_006ad35c)[G.DAT_006ad304 * 0x15]
    G.DAT_00655b03 = (G.DAT_006d1da0 & 0xff);
    G.DAT_00655b05 = (G.DAT_006d1da0 & 0xff);

    if (G.DAT_00628048 === 0) {
      FUN_00486e6f();
    }

    FUN_00489553(G.DAT_006d1da0);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    G.DAT_006ced20[G.DAT_006d1da0] = G.DAT_006ced20[G.DAT_006d1da0] + 1;

    G.DAT_00635a3c = 0x00403233; // &LAB_00403233 — callback label
    FUN_00410030("WAITPRODUCTION", G.DAT_0063fc58, 0);

    // Wait loop: poll network until all human players ready (production sync)
    let local_2c = 0;
    while (local_2c === 0) {
      FUN_0047e94e(1, 0);
      if (G.DAT_006ad308 < 2) {
        local_2c = 1;
        break;
      }
      local_2c = 1;
      for (local_330 = 1; local_330 < 8; local_330 = local_330 + 1) {
        if ((((1 << (local_330 & 0x1f) & G.DAT_00655b0a) !== 0) &&
            ((1 << (local_330 & 0x1f) & G.DAT_00655b0b) !== 0)) &&
           (G.DAT_006ced20[local_330] === 0)) {
          local_2c = 0;
          break;
        }
      }
    }

    // LAB_005aa7ee
    G.DAT_006c9210 = 0;
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(60000);
    FUN_0046b14d(0x8d, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);

    G.DAT_006d1da0 = G.DAT_006ad35c[G.DAT_006ad304 * 0x15];
    G.DAT_00655b03 = (G.DAT_006d1da0 & 0xff);
    G.DAT_006ad699 = 0;

    if (G.DAT_00628048 === 0) {
      FUN_0048710a(0xffffffff);
    }

    for (local_330 = 0; (G.DAT_00628044 !== 0 && (local_330 < 8)); local_330 = local_330 + 1) {
      if (((1 << (local_330 & 0x1f) & G.DAT_00655b0a) !== 0) &&
         ((1 << (local_330 & 0x1f) & G.DAT_00655b0b) === 0)) {
        G.DAT_00655b05 = (local_330 & 0xff);
        G.DAT_006ad578 = local_330;
        FUN_004e4ceb();
        FUN_00568e86(local_330);
        if ((((G.DAT_00628048 === 0) || (G.DAT_0062c488 !== 0)) && (G.DAT_00628048 !== 0)) &&
           (G.DAT_0062c488 !== 0)) {
          FUN_00413476();
          FUN_0047cf9e(G.DAT_006d1da0, 1);
          FUN_00419b80();
        }
        FUN_00543cd6();
      }
    }

    for (local_330 = 0; local_330 < 8; local_330 = local_330 + 1) {
      G.DAT_006ced20[local_330] = 0;
      G.DAT_006ad644[local_330] = 0;
    }

    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x8e, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(60000);

    G.DAT_00655b05 = (G.DAT_006d1da0 & 0xff);
    G.DAT_006ad699 = 1;

    if (G.DAT_00628044 === 0) {
      FUN_0046b14d(0x31, 0, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0);
      break;
    }

    if ((G.DAT_00654b60[G.DAT_006d1da0] === 0) && (G.DAT_00654fa8 === 0)) {
      FUN_0041b8ff(G.DAT_006d1da0);
      G.DAT_00654b60[G.DAT_006d1da0] = 1;
    }

    if (G.DAT_00654b70 !== 0) {
      G.DAT_00633a78 = (G.DAT_00654b70 / 1000) | 0;
      G.DAT_0066c990 = 0xffffffff;
    }

    G.DAT_006ad578 = G.DAT_006d1da0;
    FUN_004e4ceb();
    G.DAT_0066c990 = 0xffffffff;
    FUN_00552112();

    // DEVIATION: Win32 — local rect + FUN_00408490 call
    let local_28 = G.DAT_0066ca54;
    let local_24 = G.DAT_0066ca58;
    let local_20 = G.DAT_0066ca5c;
    let local_1c = G.DAT_0066ca68;
    FUN_00408490(local_28);

    FUN_00413476();
    FUN_0047cf9e(G.DAT_006d1da0, 1);
    FUN_00568e86(G.DAT_006d1da0);

    let local_14 = G.DAT_006af220[G.DAT_006d1da0] - G.DAT_006af240[G.DAT_006d1da0];

    if (G.DAT_00654fa8 === 0) {
      G.DAT_00635a3c = 0x00403c74; // &LAB_00403c74 — callback label
      uVar3 = FUN_00493ba6(G.DAT_006d1da0);
      FUN_0040ff60(0, uVar3);
      uVar3 = FUN_00493b10(G.DAT_006d1da0);
      FUN_0040ff60(1, uVar3);

      if (G.DAT_006af240[G.DAT_006d1da0] < G.DAT_006af220[G.DAT_006d1da0]) {
        G.DAT_006af240[G.DAT_006d1da0] = G.DAT_006af220[G.DAT_006d1da0];
        FUN_00421da0(0, local_14);
        if (local_14 === 1) {
          FUN_0043ca10(G.DAT_006359d4, "CASUALTY");
        } else {
          FUN_0043ca10(G.DAT_006359d4, "CASUALTIES");
        }
        // DEVIATION: Win32 — FUN_0059ec88, CPropertySheet, FUN_00421bd0, FUN_0046e020, FUN_0040bc80
        FUN_0059ec88(G.DAT_0063fc58, 0, 0);
        CPropertySheet_EnableStackedTabs(0, 0);
        FUN_00421bd0();
        FUN_0046e020(0x30, 0, 0, 0);
        let local_248_result = FUN_0040bc80(0);
        if (local_248_result !== 0) {
          FUN_0043856b(G.DAT_006d1da0);
        }
      } else {
        FUN_0043ca10(G.DAT_006359d4, "OURTURNTOMOVE");
        // DEVIATION: Win32 — FUN_0059ec88, CPropertySheet, FUN_00421bd0, FUN_0046e020, FUN_0040bc80
        FUN_0059ec88(G.DAT_0063fc58, 0, 0);
        CPropertySheet_EnableStackedTabs(0, 0);
        FUN_00421bd0();
        FUN_0046e020(0x30, 0, 0, 0);
        FUN_0040bc80(0);
      }
    }

    if (G.DAT_00654fa8 === 0) {
      FUN_0048aa24();
      if (G.DAT_00654b70 !== 0) {
        FUN_0055af2e(1);
      }
      FUN_0048a416();
    } else {
      G.DAT_00673b08 = (G.DAT_00655b0b & 0xff);
      G.DAT_00655b0b = 0;
      if (G.DAT_00654b70 !== 0) {
        FUN_0055af2e(1);
      }
      FUN_00543cd6();
      G.DAT_00655b0b = G.DAT_00673b08;
      // DEVIATION: Win32 — GetAsyncKeyState(0x1b) for ESC key
      let SVar2 = GetAsyncKeyState(0x1b);
      if ((SVar2 & 0x8001) !== 0) {
        G.DAT_00654faa = 1;
      }
      G.DAT_00654faa = G.DAT_00654faa + -1;
      if (G.DAT_00654faa === 0) {
        G.DAT_00654fa8 = 0;
      }
    }

    if (G.DAT_00654b70 !== 0) {
      FUN_0055ae80(1);
    }
    FUN_0056a65e(1);
    FUN_004b0b53(0xff, 2, 0, 0, 0);

    G.DAT_00654fa4 = 0;
    G.DAT_00628048 = 0;
    G.DAT_00654fa6 = 0;
    G.DAT_0062c488 = 0;
    G.DAT_00655aee = G.DAT_00655aee & 0xfffe;
    G.DAT_006ced20[G.DAT_006d1da0] = G.DAT_006ced20[G.DAT_006d1da0] + 1;
    XD_FlushSendBuffer(60000);

    G.DAT_00635a3c = 0x004030ee; // &LAB_004030ee — callback label
    FUN_00410030("WAITHUMANMOVES", G.DAT_0063fc58, 0);

    // Wait loop: poll network until all human players done with moves
    let local_30 = 0;
    while (local_30 === 0) {
      FUN_0047e94e(1, 0);
      if (G.DAT_006ad308 < 2) {
        local_30 = 1;
        break;
      }
      local_30 = 1;
      for (local_330 = 1; local_330 < 8; local_330 = local_330 + 1) {
        if ((((1 << (local_330 & 0x1f) & G.DAT_00655b0a) !== 0) &&
            ((1 << (local_330 & 0x1f) & G.DAT_00655b0b) !== 0)) &&
           (G.DAT_006ced20[local_330] === 0)) {
          local_30 = 0;
          break;
        }
      }
    }

    // LAB_005aaef1
    G.DAT_006c921c = 0;
    FUN_0048dab9();

    if ((G.DAT_006ad685 === 0) || (G.DAT_006ad578 === G.DAT_006d1da0)) {
      for (let local_328 = 0; local_328 < G.DAT_00655b16; local_328 = local_328 + 1) {
        if ((s32(G.DAT_006560f0, local_328 * 0x20 + 0x1a) !== 0) &&
           (s8(G.DAT_006560f0[local_328 * 0x20 + 7]) === local_330)) {
          FUN_005b6787(local_328);
        }
      }
      let local_32c = G.DAT_00655b18;
      while (local_32c = local_32c + -1, -1 < local_32c) {
        if (s32(G.DAT_0064f340, local_32c * 0x58 + 0x54) !== 0) {
          let flags = u32(G.DAT_0064f340, local_32c * 0x58 + 4);
          w32(G.DAT_0064f340, local_32c * 0x58 + 4, flags & 0xffbfffff);
        }
      }
    }

    FUN_00453af0();
    if (G.DAT_00628044 === 0) break;
    if ((G.DAT_00628044 !== 0) && (G.DAT_0064b1ac !== 0)) {
      G.DAT_00628044 = 0;
      break;
    }
  } while (G.DAT_00628044 !== 0);

  FUN_0055ae80(0);
  FUN_004824e3();
  if (G.DAT_0064b1ac !== 0) {
    FUN_0048b165();
  }

  // SEH frame teardown
  FUN_005ab07f();
  FUN_005ab095();
  return;
}


// ============================================================
// Function: FUN_005ab095 @ 0x005AB095
// Size: 14 bytes
// restore_seh_frame — restores SEH exception handler
// ============================================================

export function FUN_005ab095() {
  // DEVIATION: SEH frame restoration, no-op in JS
  return;
}


// ============================================================
// Function: FUN_005ab0a3 @ 0x005AB0A3
// Size: 125 bytes
// check_wait_production — callback for production wait dialog
// ============================================================

export function FUN_005ab0a3() {
  FUN_0047e94e(1, 0);
  FUN_0048da51(G.DAT_006ad35c);
  if (G.DAT_006c9214 !== 0 || G.DAT_006c918c !== 0 ||
      G.DAT_00628044 === 0 || G.DAT_006c8fb4 !== 0) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache();
  }
  return;
}


// ============================================================
// Function: FUN_005ab120 @ 0x005AB120
// Size: 125 bytes
// check_wait_moves — callback for moves wait dialog
// ============================================================

export function FUN_005ab120() {
  FUN_0047e94e(1, 0);
  FUN_0048da51(G.DAT_006ad35c);
  if (G.DAT_006c9218 !== 0 || G.DAT_006c918c !== 0 ||
      G.DAT_00628044 === 0 || G.DAT_006c8fb4 !== 0) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache();
  }
  return;
}


// ============================================================
// Function: FUN_005ab19d @ 0x005AB19D
// Size: 157 bytes
// check_wait_turn — callback for turn wait dialog
// ============================================================

export function FUN_005ab19d() {
  FUN_0047e94e(1, 0);
  FUN_0048da51(G.DAT_006ad35c);
  if (G.DAT_006c920c !== 0 || G.DAT_006ad698 === 1 || G.DAT_006c918c !== 0 ||
      G.DAT_006ad685 === 1 || G.DAT_00628044 === 0 || G.DAT_006c8fb4 !== 0) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache();
  }
  return;
}


// ============================================================
// Function: FUN_005ab23a @ 0x005AB23A
// Size: 155 bytes
// check_wait_turn_2 — variant of turn wait callback
// ============================================================

export function FUN_005ab23a() {
  FUN_0047e94e(1, 0);
  FUN_0048da51(G.DAT_006ad35c);
  if (G.DAT_006c920c !== 0 || G.DAT_006ad698 !== 0 || G.DAT_006c918c !== 0 ||
      G.DAT_006ad685 !== 0 || G.DAT_00628044 === 0 || G.DAT_006c8fb4 !== 0) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache();
  }
  return;
}


// ============================================================
// Function: wait_production_005ab2d5 @ 0x005AB2D5
// Size: 3334 bytes
// wait_production_client — client-side multiplayer turn loop
// ============================================================

export function wait_production_005ab2d5() {
  let local_14 = 1;
  // SEH frame setup
  // DEVIATION: Win32 — thunk_FUN_0059db08(0x4000);
  FUN_0059db08(0x4000);
  let local_20 = 1;

  let uVar3 = FUN_00493c7d(G.DAT_006ad35c, G.DAT_006ad35c);
  FUN_005d23bb("Server: %s (%d)", uVar3);

  for (let local_31c = 1; local_31c < 8; local_31c = local_31c + 1) {
    if (((s32(G.DAT_006ad30c, G.DAT_006ad558[local_31c] * 0x54) !== 0) &&
        ((1 << (local_31c & 0x1f) & G.DAT_00655b0a) !== 0)) &&
       ((1 << (local_31c & 0x1f) & G.DAT_00655b0b) !== 0)) {
      uVar3 = FUN_00493c7d(local_31c, local_31c);
      FUN_005d23bb("Client: %s (%d)", uVar3);
    }
  }

  FUN_0059c2b8();
  G.DAT_006d1da0 = G.DAT_006ad35c[G.DAT_006ad304 * 0x15]; // (&G.DAT_006ad35c)[G.DAT_006ad304 * 0x15]
  G.DAT_00628048 = G.DAT_00654fa4;
  G.DAT_0062c488 = G.DAT_00654fa6;
  FUN_0042a768();
  FUN_0042a768();
  FUN_004e4ceb();
  G.DAT_00655b03 = (G.DAT_006d1da0 & 0xff);
  G.DAT_00655b05 = (G.DAT_006d1da0 & 0xff);
  FUN_00413476();

  let local_1c = 0;
  for (let local_318 = 0; local_318 < G.DAT_00655b16; local_318 = local_318 + 1) {
    if ((s32(G.DAT_006560f0, local_318 * 0x20 + 0x1a) !== 0) &&
       (s8(G.DAT_006560f0[local_318 * 0x20 + 7]) === G.DAT_006d1da0)) {
      FUN_00410402(s16(G.DAT_006560f0, local_318 * 0x20),
                   s16(G.DAT_006560f0, local_318 * 0x20 + 2));
      local_1c = local_1c + 1;
      break;
    }
  }
  if (local_1c === 0) {
    for (let local_318 = 0; local_318 < G.DAT_00655b18; local_318 = local_318 + 1) {
      if ((s32(G.DAT_0064f340, local_318 * 0x58 + 0x54) !== 0) &&
         (s8(G.DAT_0064f340[local_318 * 0x58 + 8]) === G.DAT_006d1da0)) {
        FUN_00410402(s16(G.DAT_0064f340, local_318 * 0x58),
                     s16(G.DAT_0064f340, local_318 * 0x58 + 2));
        break;
      }
    }
  }

  FUN_00569363(1);
  FUN_00568e86(G.DAT_006d1da0);
  FUN_004897fa(1);

  let cVar1 = G.DAT_00628048;
  if ((1 << (G.DAT_006d1da0 & 0x1f) & G.DAT_00655b0b) === 0) {
    FUN_0048d9ad(G.DAT_006ad35c);
    G.DAT_00635a3c = 0x00401c35; // &LAB_00401c35 — callback label
    FUN_00426fb0("CLIENTHOTWAIT", 0x2000000, G.DAT_0063fc58, 0);
    cVar1 = G.DAT_00628048;
  }

  // Main client turn loop (do-while)
  do {
    G.DAT_00628048 = cVar1;

    for (let local_318 = 0; local_318 < G.DAT_00655b16; local_318 = local_318 + 1) {
      if ((s32(G.DAT_006560f0, local_318 * 0x20 + 0x1a) !== 0) &&
         (s8(G.DAT_006560f0[local_318 * 0x20 + 7]) === G.DAT_006d1da0)) {
        FUN_005b6787(local_318);
      }
    }

    if (local_14 === 0) {
      FUN_0048d9ad(G.DAT_006ad35c);
      G.DAT_00635a3c = 0x00402450; // &LAB_00402450 — callback label
      FUN_00410030("WAITHUMANMOVES", G.DAT_0063fc58, 0);
    }

    FUN_0048d9ad(G.DAT_006ad35c);

    // Wait for server to signal move done, reload, disconnect, etc.
    while ((((G.DAT_006c920c === 0 && (G.DAT_006ad698 === 0)) && (G.DAT_006c918c === 0)) &&
           ((G.DAT_006ad685 === 0 && (G.DAT_00628044 !== 0))))) {
      FUN_0047e94e(1, 0);
      FUN_0048da51(G.DAT_006ad35c);
      let iVar4 = FUN_0048dab9();
      if (iVar4 !== 0) {
        // Early return — SEH cleanup
        FUN_005abfdb();
        FUN_005abff1();
        return;
      }
    }

    if (G.DAT_006ad698 !== 0) {
      let iVar4 = FUN_004828a5();
      if (iVar4 === 0) {
        FUN_005abfdb();
        FUN_005abff1();
        return;
      }
      if (G.DAT_006ad2f7 !== 0) {
        FUN_005abfdb();
        FUN_005abff1();
        return;
      }
      if (((G.DAT_006c920c === 0) && (G.DAT_006c918c === 0)) &&
         ((G.DAT_006ad685 === 0 && (cVar1 = G.DAT_00628048, G.DAT_00628044 !== 0)))) {
        continue; // goto LAB_005ab60f
      }
    }

    if ((G.DAT_006c918c === 0) && (G.DAT_00628044 !== 0)) {
      G.DAT_006c9038 = 0;
      G.DAT_006c920c = 0;
      G.DAT_006d1da0 = G.DAT_006ad35c[G.DAT_006ad304 * 0x15];
      G.DAT_00655b03 = (G.DAT_006d1da0 & 0xff);
      G.DAT_00655b05 = (G.DAT_006d1da0 & 0xff);

      if (G.DAT_00654b70 !== 0) {
        G.DAT_00633a78 = (G.DAT_00654b70 / 1000) | 0;
        G.DAT_0066c990 = 0xffffffff;
      }

      // DEVIATION: Win32 message loop — wait for network send/receive
      while ((G.DAT_006c8fac !== 0 || (G.DAT_006c8fa0 !== 0))) {
        FUN_0047e94e(1, 0);
      }

      G.DAT_006ad578 = G.DAT_006d1da0;
      FUN_00413476();
      FUN_0047cf9e(G.DAT_006d1da0, 1);
      FUN_00569363(1);
      FUN_00568e86(G.DAT_006d1da0);

      if (G.DAT_00654fa8 === 0) {
        // Normal (non-autoplay) path
        if (G.DAT_00628048 === 0) {
          FUN_00486e6f();
        }
        if ((G.DAT_00628048 === 0) || (G.DAT_0062c488 !== 0)) {
          FUN_00489553(G.DAT_006d1da0);
          FUN_004b0b53(0xff, 2, 0, 0, 0);
        }
        XD_FlushSendBuffer(60000);
        FUN_0048aa24();
        FUN_0046b14d(0x8c, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);

        FUN_0048d9ad(G.DAT_006ad35c);
        G.DAT_00635a3c = 0x004028c4; // &LAB_004028c4 — callback label
        FUN_00410030("WAITPRODUCTION", G.DAT_0063fc58, 0);

        // Wait for production done
        while (((G.DAT_006c9214 === 0 && (G.DAT_006c918c === 0)) && (G.DAT_00628044 !== 0))) {
          FUN_0047e94e(1, 0);
          FUN_0048da51(G.DAT_006ad35c);
          let iVar4 = FUN_0048dab9();
          if (iVar4 !== 0) {
            FUN_005abfdb();
            FUN_005abff1();
            return;
          }
        }

        if ((G.DAT_006c918c === 0) && (G.DAT_00628044 !== 0)) {
          G.DAT_006c9214 = 0;

          FUN_0048d9ad(G.DAT_006ad35c);
          G.DAT_00635a3c = 0x00401695; // &LAB_00401695 — callback label
          FUN_00410030("WAITAIMOVES", G.DAT_0063fc58, 0);

          // Wait for AI moves done
          while (((G.DAT_006c9218 === 0 && (G.DAT_006c918c === 0)) && (G.DAT_00628044 !== 0))) {
            FUN_0047e94e(1, 0);
            FUN_0048da51(G.DAT_006ad35c);
            let iVar4 = FUN_0048dab9();
            if (iVar4 !== 0) {
              FUN_005abfdb();
              FUN_005abff1();
              return;
            }
          }

          if ((G.DAT_006c918c === 0) && (G.DAT_00628044 !== 0)) {
            G.DAT_006c9218 = 0;

            if ((G.DAT_00654b60[G.DAT_006d1da0] === 0) && (G.DAT_00654fa8 === 0)) {
              FUN_0041b8ff(G.DAT_006d1da0);
              G.DAT_00654b60[G.DAT_006d1da0] = 1;
            }

            let local_18 = G.DAT_006af220[G.DAT_006d1da0] - G.DAT_006af240[G.DAT_006d1da0];

            if (G.DAT_00654fa8 === 0) {
              G.DAT_00635a3c = 0x00403c74; // &LAB_00403c74 — callback label
              let uVar3 = FUN_00493ba6(G.DAT_006d1da0);
              FUN_0040ff60(0, uVar3);
              uVar3 = FUN_00493b10(G.DAT_006d1da0);
              FUN_0040ff60(1, uVar3);

              if (local_18 < 1) {
                FUN_0043ca10(G.DAT_006359d4, "OURTURNTOMOVE");
                // DEVIATION: Win32 — dialog display
                FUN_0059ec88(G.DAT_0063fc58, 0, 0);
                CPropertySheet_EnableStackedTabs(0, 0);
                FUN_00421bd0();
                FUN_0046e020(0x30, 0, 0, 0);
                FUN_0040bc80(0);
              } else {
                G.DAT_006af240[G.DAT_006d1da0] = G.DAT_006af220[G.DAT_006d1da0];
                FUN_00421da0(0, local_18);
                if (local_18 === 1) {
                  FUN_0043ca10(G.DAT_006359d4, "CASUALTY");
                } else {
                  FUN_0043ca10(G.DAT_006359d4, "CASUALTIES");
                }
                // DEVIATION: Win32 — dialog display
                FUN_0059ec88(G.DAT_0063fc58, 0, 0);
                CPropertySheet_EnableStackedTabs(0, 0);
                FUN_00421bd0();
                FUN_0046e020(0x30, 0, 0, 0);
                let local_238_result = FUN_0040bc80(0);
                if (local_238_result !== 0) {
                  FUN_0043856b(G.DAT_006d1da0);
                }
              }
            }

            if (G.DAT_00654b70 !== 0) {
              FUN_0055af2e(1);
            }
            FUN_0048a416();
          } else {
            G.DAT_006c918c = 0;
          }
        } else {
          local_20 = 0;
        }
      } else {
        // Autoplay path
        G.DAT_00673b08 = (G.DAT_00655b0b & 0xff);
        G.DAT_00655b0b = 0;
        if ((G.DAT_00628048 === 0) || (G.DAT_0062c488 !== 0)) {
          FUN_00489553(G.DAT_006d1da0);
        }
        FUN_0046b14d(0x8c, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);

        FUN_0048d9ad(G.DAT_006ad35c);
        G.DAT_00635a3c = 0x004028c4; // &LAB_004028c4 — callback label
        FUN_00410030("WAITPRODUCTION", G.DAT_0063fc58, 0);

        // Wait for production done (autoplay)
        while (((G.DAT_006c9214 === 0 && (G.DAT_006c918c === 0)) && (G.DAT_00628044 !== 0))) {
          FUN_0047e94e(1, 0);
          FUN_0048da51(G.DAT_006ad35c);
          let iVar4 = FUN_0048dab9();
          if (iVar4 !== 0) {
            FUN_005abfdb();
            FUN_005abff1();
            return;
          }
        }

        if ((G.DAT_006c918c === 0) && (G.DAT_00628044 !== 0)) {
          G.DAT_006c9214 = 0;
          if (G.DAT_00654b70 !== 0) {
            FUN_0055af2e(1);
          }
          FUN_00543cd6();
          G.DAT_00655b0b = G.DAT_00673b08;
          // DEVIATION: Win32 — GetAsyncKeyState(0x1b) for ESC key
          let SVar2 = GetAsyncKeyState(0x1b);
          if ((SVar2 & 0x8001) !== 0) {
            G.DAT_00654faa = 1;
          }
        } else {
          local_20 = 0;
        }
      }
    } else {
      local_20 = 0;
    }

    FUN_0055ae80(1);
    FUN_0056a65e(1);
    FUN_00453af0();

    if (G.DAT_0064b1ac !== 0) {
      G.DAT_00628044 = 0;
    }

    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x8f, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(60000);

    G.DAT_00654fa4 = 0;
    G.DAT_00628048 = 0;
    G.DAT_00654fa6 = 0;
    G.DAT_0062c488 = 0;
    local_14 = 0;
    cVar1 = 0;

    if (G.DAT_00628044 === 0) {
      FUN_0046b14d(0x2d, 0, G.DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
      XD_FlushSendBuffer(60000);
      FUN_0059b293(1);
      if (G.DAT_0064b1ac !== 0) {
        FUN_0048b165();
      }
      // SEH frame teardown
      FUN_005abfdb();
      FUN_005abff1();
      return;
    }
  } while (true);
}


// ============================================================
// Function: FUN_005abff1 @ 0x005ABFF1
// Size: 15 bytes
// restore_seh_frame_2 — restores SEH exception handler
// ============================================================

export function FUN_005abff1() {
  // DEVIATION: SEH frame restoration, no-op in JS
  return;
}


// ============================================================
// Function: FUN_005ac840 @ 0x005AC840
// Size: 365 bytes
// pedia_init_unit_list — initializes pedia unit list view
// ============================================================

export function FUN_005ac840() {
  // DEVIATION: in_ECX is pedia window this-pointer
  // Validates current selection index, copies unit type list
  // to display buffer, sets scrollbar range, calls
  // FUN_0040fd40, FUN_0040fcf0, FUN_00451bf0, FUN_004923c0,
  // FUN_004518d0, FUN_004f6646
  return;
}


// ============================================================
// Function: FUN_005ac9ad @ 0x005AC9AD
// Size: 4075 bytes
// pedia_draw_unit_stats — draws unit stats in civilopedia
// ============================================================

export function FUN_005ac9ad() {
  // DEVIATION: 4075-byte function drawing unit stats in civilopedia
  // Uses in_ECX as pedia window this-pointer
  // Draws attack, defense, HP, firepower, movement, cost,
  // prereq tech, and unit ability flags
  // Calls FUN_005c00ce, FUN_005c0073, FUN_00451bf0, FUN_004f6564,
  // FUN_00407f90, FUN_00407fc0, FUN_0040ef70, FUN_005cda06,
  // FUN_005cd775, FUN_00451830, FUN_00451860, FUN_005cef31,
  // FUN_005c19ad, FUN_005c0f57, FUN_0040bbb0, FUN_0040bc10,
  // FUN_0040fe40, FUN_0040efd0, FUN_0040ff00, SetRect,
  // FUN_00452c14, _sprintf, FUN_004a2379, FUN_004a23fc,
  // FUN_004aef20, FUN_005f22d0, FUN_005f22e0, FUN_004aef36,
  // FUN_004a2020, _strlen, FUN_00407f90, FUN_005c1167,
  // FUN_00452768, FUN_00408490
  return;
}


// ============================================================
// Function: FUN_005ad998 @ 0x005AD998
// Size: 342 bytes
// pedia_select_unit — selects unit in civilopedia
// ============================================================

export function FUN_005ad998(param_1) {
  if (G.DAT_006a677c !== 0 && G.DAT_006ad908 === 0) {
    // DEVIATION: in_ECX is pedia window this-pointer
    // Searches unit list for param_1, sets selection index,
    // calls FUN_004f7bd1, FUN_004f4793, FUN_00451bf0,
    // FUN_004f8a9b, FUN_005f22d0, FUN_004f6244, FUN_005ac9ad,
    // FUN_004085f0, FUN_00408460, FUN_004518d0,
    // CPropertySheet_EnableStackedTabs, FUN_005c61b0
  }
  return;
}


// ============================================================
// Function: FUN_005adfa0 @ 0x005ADFA0
// Size: 57 bytes
// clamp_value — clamps value between min and max
// ============================================================

export function FUN_005adfa0(param_1, param_2, param_3) {
  if (param_2 <= param_1) {
    param_2 = param_1;
  }
  if (param_2 <= param_3) {
    param_3 = param_2;
  }
  return param_3;
}


// ============================================================
// Function: FUN_005adfd9 @ 0x005ADFD9
// Size: 45 bytes
// swap_values — swaps two memory values
// ============================================================

export function FUN_005adfd9(param_1, param_2) {
  let uVar1 = param_1[0];
  param_1[0] = param_2[0];
  param_2[0] = uVar1;
  return;
}


// ============================================================
// Function: FUN_005ae006 @ 0x005AE006
// Size: 76 bytes
// popcount_byte — counts set bits in low 8 bits
// ============================================================

export function FUN_005ae006(param_1) {
  let local_8 = 0;
  for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
    if ((param_1 & 1) !== 0) {
      local_8 = local_8 + 1;
    }
    param_1 = param_1 >> 1;
  }
  return local_8;
}


// ============================================================
// Function: FUN_005ae052 @ 0x005AE052
// Size: 94 bytes
// wrap_x — wraps X coordinate for round earth
// ============================================================
// Already in fn_utils.js — re-export for completeness

// (re-export removed)
// ============================================================
// Function: FUN_005ae0b0 @ 0x005AE0B0
// Size: 94 bytes
// wrap_x_half — wraps half-width X coordinate
// ============================================================

export function FUN_005ae0b0(param_1) {
  if ((G.DAT_00655ae8 & 0x8000) === 0) {
    if (param_1 < 0) {
      param_1 = G.DAT_006d116a + param_1;
    } else if (G.DAT_006d116a <= param_1) {
      param_1 = param_1 - G.DAT_006d116a;
    }
  }
  return param_1;
}


// ============================================================
// Function: FUN_005ae10e @ 0x005AE10E
// Size: 111 bytes
// distance_x — calculates wrapped X distance
// ============================================================

export function FUN_005ae10e(param_1, param_2) {
  let local_8;

  if (param_1 === param_2 || param_1 - param_2 < 0) {
    local_8 = ~(param_1 - param_2) + 1;
  } else {
    local_8 = param_1 - param_2;
  }
  if ((G.DAT_00655ae8 & 0x8000) === 0 && (G.DAT_006d1160 >> 1) < local_8) {
    local_8 = G.DAT_006d1160 - local_8;
  }
  return local_8;
}


// ============================================================
// Function: FUN_005ae17d @ 0x005AE17D
// Size: 51 bytes
// distance_x_half — half of wrapped X distance
// ============================================================

export function FUN_005ae17d(param_1, param_2) {
  let iVar1 = FUN_005ae10e(param_1, param_2);
  return (iVar1 + 1) >> 1;
}


// ============================================================
// Function: FUN_005ae1b0 @ 0x005AE1B0
// Size: 157 bytes
// distance_tiles — calculates tile distance between two points
// ============================================================

export function FUN_005ae1b0(param_1, param_2, param_3, param_4) {
  let local_c;
  let local_8;

  if (param_1 === param_3 || param_1 - param_3 < 0) {
    local_8 = ~(param_1 - param_3) + 1;
  } else {
    local_8 = param_1 - param_3;
  }
  if ((G.DAT_00655ae8 & 0x8000) === 0 && (G.DAT_006d1160 >> 1) < local_8) {
    local_8 = G.DAT_006d1160 - local_8;
  }
  if (param_2 === param_4 || param_2 - param_4 < 0) {
    local_c = ~(param_2 - param_4) + 1;
  } else {
    local_c = param_2 - param_4;
  }
  return (local_c + local_8) >> 1;
}


// ============================================================
// Function: FUN_005ae24d @ 0x005AE24D
// Size: 73 bytes
// distance_abs — absolute distance from signed deltas
// ============================================================

export function FUN_005ae24d(param_1, param_2) {
  if (param_1 < 1) {
    param_1 = ~param_1 + 1;
  }
  if (param_2 < 1) {
    param_2 = ~param_2 + 1;
  }
  return (param_1 + param_2) >> 1;
}


// ============================================================
// Function: FUN_005ae296 @ 0x005AE296
// Size: 135 bytes
// diagonal_distance — diagonal (Chebyshev-like) distance
// ============================================================

export function FUN_005ae296(param_1, param_2) {
  let local_8;

  if (param_1 < 1) {
    param_1 = ~param_1 + 1;
  }
  if (param_2 < 1) {
    param_2 = ~param_2 + 1;
  }
  let iVar1 = (param_2 + param_1) >> 1;
  if (param_2 < param_1) {
    local_8 = param_1 - (((iVar1 - param_2) + 1) >> 1);
  } else {
    local_8 = param_2 - (((iVar1 - param_1) + 1) >> 1);
  }
  return local_8;
}


// ============================================================
// Function: FUN_005ae31d @ 0x005AE31D
// Size: 94 bytes
// compute_real_distance — computes real distance with wrapping
// ============================================================

export function FUN_005ae31d(param_1, param_2, param_3, param_4) {
  let uVar1 = FUN_005ae10e(param_1, param_3);
  let local_c;
  if (param_2 === param_4 || param_2 - param_4 < 0) {
    local_c = ~(param_2 - param_4) + 1;
  } else {
    local_c = param_2 - param_4;
  }
  return FUN_005ae296(uVar1, local_c);
}


// ============================================================
// Function: FUN_005ae37b @ 0x005AE37B
// Size: 68 bytes
// is_adjacent_direction — checks if two directions are adjacent
// ============================================================

export function FUN_005ae37b(param_1, param_2) {
  let local_8 = 0;
  if (((param_2 + 1) & 7) === param_1 || ((param_2 - 1) & 7) === param_1) {
    local_8 = 1;
  }
  return local_8;
}


// ============================================================
// Function: FUN_005ae3bf @ 0x005AE3BF
// Size: 45 bytes
// tech_id_to_byte_mask — converts tech ID to byte index + bit mask
// ============================================================

export function FUN_005ae3bf(param_1, param_2, param_3) {
  param_2[0] = param_1 >> 3;
  param_3[0] = 1 << (param_1 & 7);
  return;
}


// ============================================================
// Function: FUN_005ae3ec @ 0x005AE3EC
// Size: 98 bytes
// shift_value — shifts value left (positive) or right (negative)
// ============================================================

export function FUN_005ae3ec(param_1, param_2) {
  if (param_2 !== 0) {
    if (param_2 < 1) {
      let local_8 = param_2 & 0xFF;
      if (param_2 < 1) {
        local_8 = (~(param_2 & 0xFF) + 1) & 0xFF;
      }
      param_1 = param_1 >> (local_8 & 0x1f);
    } else {
      param_1 = param_1 << (param_2 & 0x1f);
    }
  }
  return param_1;
}


// ============================================================
// Function: FUN_005ae580 @ 0x005AE580
// Size: 1602 bytes
// start_pbem_game — Play-By-Email game setup and main loop
// ============================================================

export function FUN_005ae580() {
  // SEH frame setup
  // DEVIATION: Win32 — thunk_FUN_0059db08(0x4000);
  FUN_0059db08(0x4000);

  for (let local_310 = 0; local_310 < 8; local_310 = local_310 + 1) {
    G.DAT_00654b60[local_310] = 0;
    G.DAT_00654da4[local_310 * 0x20] = 0;
  }
  G.DAT_00654b70 = 0;
  G.DAT_00655b02 = 2;

  // Main PBEM menu loop
  let continueLoop = true;
  while (continueLoop) {
    // LAB_005ae610
    G.DAT_00631eec = 3;
    FUN_0052263c(0xffffffff, 0);
    FUN_0040ffa0("PBEM1", 1);
    FUN_0059ea99(G.DAT_00666542);
    FUN_005f22d0(G.DAT_0064bb08, G.DAT_00655020);

    let iVar1_height = -(((((G.DAT_006ab19c - 0x1e0 + ((G.DAT_006ab19c - 0x1e0) >> 31 & 7)) >>> 0) >> 3) + 1) | 0);
    let uVar2 = FUN_005226fa(0, iVar1_height);
    FUN_0059e783(uVar2, iVar1_height);
    let iVar1 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();

    if (iVar1 < 0) {
      // User cancelled — SEH cleanup and return
      FUN_005aebef();
      FUN_005aec05();
      return;
    }

    G.DAT_00666542 = (iVar1 & 0xffff);

    if ((-1 < iVar1) && (iVar1 < 3)) {
      __chdir(G.DAT_00655020);
      FUN_0041e864(1);
    }

    G.DAT_00627670 = 0;
    let local_18;

    switch (iVar1) {
    case 0: {
      let iVar1_r = FUN_0041d417();
      if (iVar1_r !== 0) continue; // goto LAB_005ae610
      local_18 = 0;
      let r = _rand();
      G.DAT_00624ee8 = r % 3 + -1;
      G.DAT_00624eec = 0;
      r = _rand();
      if (r % 3 === 0) {
        G.DAT_00624eec = G.DAT_00624ee8;
      }
      r = _rand();
      G.DAT_00624ef0 = r % 3 + -1;
      r = _rand();
      G.DAT_00624ef4 = r % 3 + -1;
      r = _rand();
      G.DAT_00624ef8 = r % 3 + -1;
      iVar1 = FUN_0051dd97(0, 2);
      break;
    }
    case 1: {
      let iVar1_r = FUN_0041dd0e();
      if (iVar1_r !== 0) continue; // goto LAB_005ae610
      local_18 = 1;
      if (G.DAT_006d1166 !== 0) {
        local_18 = 2;
      }
      let r = _rand();
      G.DAT_00624ee8 = r % 3 + -1;
      G.DAT_00624eec = 0;
      r = _rand();
      if (r % 3 === 0) {
        G.DAT_00624eec = G.DAT_00624ee8;
      }
      r = _rand();
      G.DAT_00624ef0 = r % 3 + -1;
      r = _rand();
      G.DAT_00624ef4 = r % 3 + -1;
      r = _rand();
      G.DAT_00624ef8 = r % 3 + -1;
      iVar1 = FUN_0051dd97(local_18, 2);
      break;
    }
    case 2: {
      let iVar1_r = FUN_0041d417();
      if (iVar1_r !== 0) continue; // goto LAB_005ae610
      local_18 = 0;
      iVar1_r = FUN_0041d7ea();
      if (iVar1_r !== 0) continue; // goto LAB_005ae610
      iVar1 = FUN_0051dd97(0, 2);
      break;
    }
    case 3: {
      G.DAT_006a9110 = 0;
      let iVar1_r = FUN_005218cb(2);
      if (iVar1_r === 0) {
        if (G.DAT_006a9110 !== 0) {
          G.DAT_00655aea = G.DAT_00655aea & 0xfffeffff;
        }
        G.DAT_00655b02 = 2;
        let iVar1_w = FUN_005227e3();
        if (iVar1_w === 0) {
          FUN_005f22d0(G.DAT_0064bb08, G.DAT_00655020);
        } else {
          let iVar1_l = FUN_00521fe0(iVar1_w);
          if (iVar1_l === 0) {
            FUN_004a73d9();
            FUN_005aebef();
            FUN_005aec05();
            return;
          }
          FUN_005f22d0(G.DAT_0064bb08, G.DAT_00655020);
        }
      } else {
        FUN_005f22d0(G.DAT_0064bb08, G.DAT_00655020);
      }
      continue; // goto LAB_005ae610
    }
    case 4: {
      // switchD_005aea9a_caseD_4 — load PBEM save
      G.DAT_006a9110 = 0;
      let iVar1_r = thunk_load_verify_units(0, 2, 1);
      if (iVar1_r === 0) {
        if (G.DAT_00655b02 === 2) {
          FUN_004a73d9();
          FUN_005aebef();
          FUN_005aec05();
          return;
        }
        FUN_00410030("EMAILNOT", G.DAT_0063fc58, 0);
        if (G.DAT_006a9110 !== 0) {
          G.DAT_00655aea = G.DAT_00655aea & 0xfffeffff;
        }
      } else if (G.DAT_006a9110 !== 0) {
        G.DAT_00655aea = G.DAT_00655aea & 0xfffeffff;
      }
      continue; // goto LAB_005ae610
    }
    default: {
      // switchD_005aea9a_default — fall through to post-switch game setup
      iVar1 = 0; // force the post-switch path
      break;
    }
    }

    // Post-switch: if iVar1 === 0, do game setup
    if (iVar1 === 0) {
      // switchD_005aea9a_default path — wrapped in loop for goto restart
      let defaultRestart = true;
      while (defaultRestart) {
        defaultRestart = false;
        G.DAT_00655b0a = 0;
        G.DAT_00655b0b = 0;
        let iVar1_w = FUN_005227e3();
        if (iVar1_w !== 0) {
          FUN_00522dfa();
          let local_310 = 0;
          while (true) {
            if (iVar1_w <= local_310) {
              FUN_00522f8f(iVar1_w);
              FUN_004a73d9();
              FUN_0041a046(1);
              FUN_0041a5c4(1);
              FUN_0041a422(1);
              FUN_00419c8b();
              FUN_00408d33(local_18);
              FUN_004aa9c0();
              if (G.DAT_00631ee8 !== 0) {
                FUN_004a9785(G.DAT_00631ee8 + -1);
              }
              G.DAT_00655b02 = 2;
              if (G.DAT_00628048 !== 0) {
                G.DAT_00655b03 = G.DAT_00628048;
                G.DAT_006d1da0 = G.DAT_00628048;
              }
              // SEH frame teardown
              FUN_005aebef();
              FUN_005aec05();
              return;
            }
            let iVar3 = FUN_0051f19c(local_310, 2, 0);
            while (iVar3 !== 0) {
              local_310 = local_310 + -1;
              if (local_310 < 0) { defaultRestart = true; break; } // goto switchD_005aea9a_default
            iVar3 = FUN_0051f19c(local_310, 2, 0);
            }
            if (defaultRestart) break; // re-enter default block
            local_310 = local_310 + 1;
          }
        }
      } // end defaultRestart loop
    }
    // If iVar1 !== 0, loop back to LAB_005ae610
    continue;
  }
}


// ============================================================
// Function: FUN_005aec05 @ 0x005AEC05
// Size: 15 bytes
// restore_seh_frame_3 — restores SEH exception handler
// ============================================================

export function FUN_005aec05() {
  // DEVIATION: SEH frame restoration, no-op in JS
  return;
}


// ============================================================
// Function: FUN_005aec14 @ 0x005AEC14
// Size: 249 bytes
// get_email_address — prompts user for email address (PBEM)
// ============================================================

export function FUN_005aec14(param_1, param_2) {
  // DEVIATION: 249-byte function with SEH frame
  // Calls FUN_0059db08, FUN_005a632a, FUN_005a5f34, FUN_005f22d0,
  // FUN_005aed0d, FUN_005aed23
  return;
}


// ============================================================
// Function: FUN_005aed23 @ 0x005AED23
// Size: 14 bytes
// restore_seh_frame_4 — restores SEH exception handler
// ============================================================

export function FUN_005aed23() {
  // DEVIATION: SEH frame restoration, no-op in JS
  return;
}


// ============================================================
// Function: FUN_005aef20 @ 0x005AEF20
// Size: 544 bytes
// backup_unit_data — copies unit type data to editor buffers
// ============================================================

export function FUN_005aef20() {
  for (let local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
    let _Source = FUN_00428b0c(0); // *(undefined4 *)(&G.DAT_0064b1b8 + local_8 * 0x14)
    _strncpy(0, _Source, 0x28); // &G.DAT_006a1d88 + local_8 * 0x28
    // (&G.DAT_006a1daf)[local_8 * 0x28] = 0;
    // Copy unit type fields from DAT_0064b1xx to G.DAT_006a2d28 editor buffer
    // 13 fields per unit type (prereq, domain, role, etc.)
  }
  return;
}


// ============================================================
// Function: FUN_005af140 @ 0x005AF140
// Size: 515 bytes
// restore_unit_data — copies editor buffers back to unit tables
// ============================================================

export function FUN_005af140() {
  for (let local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
    let _Dest = FUN_00428b0c(0); // *(undefined4 *)(&G.DAT_0064b1b8 + local_8 * 0x14)
    _strncpy(_Dest, 0, 0xf); // &G.DAT_006a1d88 + local_8 * 0x28
    // Copy editor buffer fields back to DAT_0064b1xx unit type tables
    // 13 fields per unit type
  }
  return;
}


// ============================================================
// Function: FUN_005af343 @ 0x005AF343
// Size: 353 bytes
// populate_unit_editor_controls — fills editor controls with values
// ============================================================

export function FUN_005af343() {
  for (let local_14 = 1; local_14 < 0xd; local_14 = local_14 + 1) {
    if (G.DAT_00635e60[local_14 * 2] === 9) {
      let iVar1 = FUN_00418740();
      let local_10 = "";
      _sprintf(local_10, 0, 0); // format number
      FUN_00418a30(local_10);
    } else if (G.DAT_00635e60[local_14 * 2] === 0xc) {
      let iVar1 = FUN_00418740();
      let local_8 = 0; // *(int *)(&G.DAT_006a2a00 + iVar1 * 4 + *(int *)(G.DAT_006a4f88 + 0x2ec) * 0x58)
      if (local_14 === 1 || local_14 === 2) {
        local_8 = local_8 + 2;
      }
      FUN_00418d90(local_8);
    }
  }
  return;
}


// ============================================================
// Function: FUN_005af4ae @ 0x005AF4AE
// Size: 458 bytes
// read_unit_editor_controls — reads values from editor controls
// ============================================================

export function FUN_005af4ae() {
  let local_14 = 0;
  for (let local_18 = 1; local_18 < 0xd; local_18 = local_18 + 1) {
    if (G.DAT_00635e60[local_18 * 2] === 9) {
      let iVar1 = FUN_00418740();
      iVar1 = iVar1 + -0xca;
      let local_10 = "";
      FUN_00418a70(local_10);
      let local_8 = _atoi(local_10);
      let uVar2 = FUN_005adfa0(local_8, 0, 0); // clamped
      // Store result in editor buffer
      // if (stored != local_8) local_14 = local_14 + 1;
    } else if (G.DAT_00635e60[local_18 * 2] === 0xc) {
      let local_8 = FUN_00418d60();
      if (local_18 === 1 || local_18 === 2) {
        local_8 = local_8 + -2;
      }
      let iVar1 = FUN_00418740();
      // Store in editor buffer
    }
  }
  return local_14;
}


// ============================================================
// Function: FUN_005af682 @ 0x005AF682
// Size: 27 bytes
// refresh_unit_editor — redraws unit editor display
// ============================================================

export function FUN_005af682() {
  FUN_005b09dc();
  return;
}


// ============================================================
// Function: FUN_005af69d @ 0x005AF69D
// Size: 838 bytes
// write_units_to_file — writes unit data to RULES.TXT format
// ============================================================

export function FUN_005af69d(param_1) {
  for (let local_c = 0; local_c < 0x3e; local_c = local_c + 1) {
    FUN_0040bbb0();
    FUN_0040ff00(0); // *(undefined4 *)(&G.DAT_0064b1b8 + local_c * 0x14)
    FUN_005f22e0(0, 0); // &G.DAT_00679640, &G.DAT_00635f0c
    let pcVar1 = FUN_00428b0c(0);
    let sVar2 = _strlen(pcVar1);
    let local_10;
    if (sVar2 < 0xd) {
      pcVar1 = FUN_00428b0c(0);
      local_10 = _strlen(pcVar1);
    } else {
      local_10 = 0xd;
    }
    FUN_004190a0(0xd - local_10);
    // Write 13 comma-separated fields per unit type
    FUN_004ccdef(0, 1); // domain
    FUN_004ccdb6(0);     // role
    FUN_005f22e0(0, 0);
    FUN_004ccdb6(0);     // cost
    FUN_005f22e0(0, 0);
    FUN_0040ff30(0);     // prereq
    FUN_005f22e0(0, 0);
    FUN_004ccdb6(0);     // attack
    FUN_005f22e0(0, 0);
    FUN_0040ff30(0);     // defense
    FUN_005f22e0(0, 0);
    FUN_004ccdb6(0);     // movement
    FUN_005f22e0(0, 0);
    FUN_0040ff30(0);     // firepower
    FUN_005f22e0(0, 0);
    FUN_004ccdb6(0);     // hp
    FUN_005f22e0(0, 0);
    FUN_0040ff30(0);     // obsolete
    FUN_005f22e0(0, 0);
    FUN_004ccdb6(0);     // flags1
    FUN_005f22e0(0, 0);
    FUN_004ccdef(0, 1);  // flags2
    FUN_0040fe10();
    // Write 15 ability flag bits
    for (let local_8 = 0xe; -1 < local_8; local_8 = local_8 + -1) {
      FUN_005f22e0(0, 0); // "0," or "1,"
    }
    FUN_005f22e0(0, 0); // newline
    _fputs(0, param_1);
  }
  return 1;
}


// ============================================================
// Function: show_messagebox_F9E3 @ 0x005AF9E3
// Size: 487 bytes
// apply_unit_changes — applies unit editor changes, saves files
// ============================================================

export function show_messagebox_F9E3() {
  let iVar1 = FUN_005af4ae();
  if (iVar1 === 0) {
    let local_8 = 0;
    for (let local_c = 0; local_c < 0x3e; local_c = local_c + 1) {
      let pcVar4 = 0; // &G.DAT_006a1d88 + local_c * 0x28
      let pcVar2 = FUN_00428b0c(0);
      let cmp = _strcmp(pcVar2, pcVar4);
      if (cmp !== 0) {
        let uVar3 = FUN_00428b0c(0, 0);
        let r = FUN_004cefe9(uVar3);
        local_8 = local_8 + r;
      }
    }
    if (local_8 !== 0) {
      let r = FUN_0054a4c4();
      if (r === 0) {
        _sprintf(0, 0, 0); // error message
        let iVar2 = FUN_00414d10();
        MessageBoxA(0, 0, 0, 0x10); // DEVIATION: Win32
      }
    }
    FUN_005af140();
    FUN_004ccab9(0, 0);
    let r2 = thunk_show_messagebox_CF2D();
    if (r2 === 0) {
      _sprintf(0, 0, 0); // error message
      let iVar2 = FUN_00414d10();
      MessageBoxA(0, 0, 0, 0x10); // DEVIATION: Win32
    }
    G.DAT_006a1d7c = 0;
    CRichEditDoc_InvalidateObjectCache();
    FUN_004e4ceb();
  } else {
    FUN_005af343();
    FUN_005af682();
    let local_50;
    if (G.DAT_006a4f88 === 0) {
      local_50 = 0;
    } else {
      local_50 = G.DAT_006a4f88 + 0x48;
    }
    FUN_0059d3c9(local_50);
    FUN_004190d0(0, 0);
    FUN_0059d3c9(0);
    let hWnd = FUN_00418770();
    SetFocus(hWnd); // DEVIATION: Win32
  }
  return;
}


// ============================================================
// Function: FUN_005afbca @ 0x005AFBCA
// Size: 369 bytes
// rename_unit_type — shows dialog to rename a unit type
// ============================================================

export function FUN_005afbca() {
  let local_10 = 0; // *(int *)(G.DAT_006a4f88 + 0x2ec)
  _strncpy(0, 0, 0xf); // local_128, &G.DAT_006a1d88 + local_10 * 0x28
  // local_11a = 0;
  let keepLooping = true;
  while (keepLooping) {
    let local_12c;
    if (G.DAT_006a4f88 === 0) {
      local_12c = 0;
    } else {
      local_12c = G.DAT_006a4f88 + 0x48;
    }
    FUN_005a6c23(local_12c);
    let local_8 = FUN_0051d63b(0, 0, 0xe, 0, 0);
    FUN_005a6c45();
    if (local_8 === -1) break;
    let sVar1 = _strlen(0);
    if (sVar1 !== 0) keepLooping = false;
  }
  if (0 <= 0) { // -1 < local_8
    FUN_005f22d0(0, 0);
    let local_c = FUN_00418d60();
    FUN_00418d20();
    for (let i = 0; i < 0x3e; i = i + 1) {
      FUN_00418ce0(0);
    }
    FUN_00418d90(local_c);
    FUN_005af682();
  }
  return;
}


// ============================================================
// Function: FUN_005afd3b @ 0x005AFD3B
// Size: 95 bytes
// show_unit_help — shows unit help text
// ============================================================

export function FUN_005afd3b() {
  let local_8;
  if (G.DAT_006a4f88 === 0) {
    local_8 = 0;
  } else {
    local_8 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(0, 0);
  FUN_0059d3c9(0);
  return;
}


// ============================================================
// Function: FUN_005afd9a @ 0x005AFD9A
// Size: 40 bytes
// mark_unit_editor_clean — clears dirty flag
// ============================================================

export function FUN_005afd9a() {
  G.DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(); // (G.DAT_006a4f88 + 0x48)
  return;
}


// ============================================================
// Function: FUN_005afdc2 @ 0x005AFDC2
// Size: 83 bytes
// assign_unit_sprite — assigns sprite to unit type
// ============================================================

export function FUN_005afdc2() {
  let uVar1 = FUN_00428b0c(0, 0xb, 0); // *(undefined4 *)(G.DAT_00628420 + 0x7d8)
  FUN_00573e59(0, uVar1); // &G.DAT_00641848 + *(int *)(G.DAT_006a4f88 + 0x2ec) * 0x3c
  FUN_005af682();
  return;
}


// ============================================================
// Function: FUN_005afe15 @ 0x005AFE15
// Size: 111 bytes
// export_unit_to_scenario — exports unit type to scenario file
// ============================================================

export function FUN_005afe15() {
  FUN_005af4ae();
  let uVar1 = FUN_00428b0c(0, 0); // *(undefined4 *)(G.DAT_00628420 + 0x7dc), name
  let local_84 = "";
  _sprintf(local_84, 0, uVar1);
  FUN_0058b47e(local_84, 0); // *(undefined4 *)(G.DAT_006a4f88 + 0x2ec)
  return;
}


// ============================================================
// Function: FUN_005afe84 @ 0x005AFE84
// Size: 36 bytes
// set_checkbox — sets checkbox state in dialog
// ============================================================

export function FUN_005afe84(param_1, param_2) {
  FUN_0051d7d6(param_1, param_2 !== 0 ? 1 : 0);
  return;
}


// ============================================================
// Function: FUN_005afea8 @ 0x005AFEA8
// Size: 1021 bytes
// show_abilities_dialog — shows unit abilities checkbox dialog
// ============================================================

export function FUN_005afea8() {
  let iVar1 = 0; // *(int *)(G.DAT_006a4f88 + 0x2ec)
  FUN_0051d7bc();
  FUN_005afe84(0, 0);   // bit 0
  FUN_005afe84(1, 0);   // bit 1
  FUN_005afe84(2, 0);   // bit 2
  FUN_005afe84(3, 0);   // bit 3
  FUN_005afe84(4, 0);   // bit 4
  FUN_005afe84(5, 0);   // bit 5
  FUN_005afe84(6, 0);   // bit 6
  FUN_005afe84(7, 0);   // bit 7
  FUN_005afe84(8, 0);   // bit 8
  FUN_005afe84(9, 0);   // bit 9
  FUN_005afe84(10, 0);  // bit 10
  FUN_005afe84(0xb, 0); // bit 11
  FUN_005afe84(0xc, 0); // bit 12
  FUN_005afe84(0xd, 0); // bit 13
  FUN_005afe84(0xe, 0); // bit 14
  FUN_0040ff60(0, 0);
  let local_10;
  if (G.DAT_006a4f88 === 0) {
    local_10 = 0;
  } else {
    local_10 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_10);
  let iVar2 = FUN_00421e70(0, 1);
  if (iVar2 === 0) {
    let local_8 = 0;
    // Read back 15 checkboxes into bitmask
    let r;
    r = FUN_0051d817(0);
    if (r !== 0) local_8 = local_8 | 1;
    r = FUN_0051d817(1);
    if (r !== 0) local_8 = local_8 | 2;
    r = FUN_0051d817(2);
    if (r !== 0) local_8 = local_8 | 4;
    r = FUN_0051d817(3);
    if (r !== 0) local_8 = local_8 | 8;
    r = FUN_0051d817(4);
    if (r !== 0) local_8 = local_8 | 0x10;
    r = FUN_0051d817(5);
    if (r !== 0) local_8 = local_8 | 0x20;
    r = FUN_0051d817(6);
    if (r !== 0) local_8 = local_8 | 0x40;
    r = FUN_0051d817(7);
    if (r !== 0) local_8 = local_8 | 0x80;
    r = FUN_0051d817(8);
    if (r !== 0) local_8 = local_8 | 0x100;
    r = FUN_0051d817(9);
    if (r !== 0) local_8 = local_8 | 0x200;
    r = FUN_0051d817(10);
    if (r !== 0) local_8 = local_8 | 0x400;
    r = FUN_0051d817(0xb);
    if (r !== 0) local_8 = local_8 | 0x800;
    r = FUN_0051d817(0xc);
    if (r !== 0) local_8 = local_8 | 0x1000;
    r = FUN_0051d817(0xd);
    if (r !== 0) local_8 = local_8 | 0x2000;
    r = FUN_0051d817(0xe);
    if (r !== 0) local_8 = local_8 | 0x4000;
    // *(uint *)(&G.DAT_006a2d58 + iVar1 * 0x58) = local_8;
  }
  FUN_0059d3c9(0);
  return;
}
