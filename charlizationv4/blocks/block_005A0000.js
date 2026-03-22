// ═══════════════════════════════════════════════════════════════════
// block_005A0000.js — Mechanical transpilation of block_005A0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005A0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005A0000.c
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
import { FUN_0043856b } from './block_00430000.js';
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
import { FUN_005d8236, FUN_005dae6b, FUN_005db0d0 } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';

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

function IsIconic() { return 0; }
function SetRect() {}
function SetFocus() {}
function GetAsyncKeyState() { return 0; }
function MessageBoxA() {}
function XD_FlushSendBuffer() {}
function operator_new() { return {}; }
function operator_delete() {}
function _strlen(s) { return typeof s === 'string' ? s.length : 0; }
function _strchr() { return 0; }
function _strcmp() { return 0; }
function __strcmpi() { return 0; }
function __strnicmp() { return 0; }
function _strncpy() {}
function _sprintf() {}
function _fputs() {}
function _atoi() { return 0; }
function _rand() { return Math.floor(Math.random() * 32768); }
function _isalpha() { return 0; }
function _isdigit() { return 0; }
function _memset() {}
function __chdir() {}
function FID_conflict___toupper_lk(c) { return c; }
function _eh_vector_constructor_iterator_() {}
function _eh_vector_destructor_iterator_() {}
function tie() {}


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks (not yet defined)
// These are all thunk_FUN_ or FUN_ calls to code outside this block.
// ═══════════════════════════════════════════════════════════════════

function FUN_005ab07f() { FUN_0059df8a(); }
function FUN_005abfdb() { FUN_0059df8a(); }
function FUN_005aebef() { FUN_0059df8a(); }
function FUN_005aed0d() { FUN_0059df8a(); }

// Stubs for functions from many other blocks
function FUN_0043c7c0() {}
function FUN_0043ca10() {}
function thunk_load_verify_units() { return 0; }
function thunk_show_messagebox_CF2D() { return 0; }
function send_msg_3CFF() {}
function send_msg_3D62() {}
function FUN_005a9640_impl() {}


// ============================================================
// Function: FUN_005a0fea @ 0x005A0FEA
// Size: 350 bytes
// draw_text_with_shadow — draws text with optional shadow
// ============================================================

export function FUN_005a0fea(param_1, param_2, param_3, param_4, param_5) {
  // UI text rendering — uses in_ECX (this pointer), stubbed
  // Original draws text with shadow colors at offsets
  return;
}


// ============================================================
// Function: FUN_005a1148 @ 0x005A1148
// Size: 195 bytes
// draw_split_text — draws text, split at '|' character
// ============================================================

export function FUN_005a1148(param_1, param_2, param_3, param_4, param_5) {
  // UI text rendering with pipe-split alignment, stubbed
  return;
}


// ============================================================
// Function: FUN_005a120b @ 0x005A120B
// Size: 706 bytes
// draw_list_item — renders a single list item in popup
// ============================================================

export function FUN_005a120b(param_1, param_2) {
  // UI list item rendering, stubbed
  return 0;
}


// ============================================================
// Function: FUN_005a14d2 @ 0x005A14D2
// Size: 660 bytes
// redraw_list_items — redraws all visible list items
// ============================================================

export function FUN_005a14d2() {
  // UI list redraw, stubbed
  return;
}


// ============================================================
// Function: FUN_005a1766 @ 0x005A1766
// Size: 62 bytes
// scale_to_page — divides value by page size if multi-column
// ============================================================

export function FUN_005a1766(param_1) {
  // Uses in_ECX as this pointer; stubbed since UI-only
  return param_1;
}


// ============================================================
// Function: FUN_005a17a4 @ 0x005A17A4
// Size: 69 bytes
// round_to_page — rounds down to page boundary
// ============================================================

export function FUN_005a17a4(param_1) {
  // Uses in_ECX as this pointer; stubbed since UI-only
  return param_1;
}


// ============================================================
// Function: FUN_005a17e9 @ 0x005A17E9
// Size: 603 bytes
// scroll_to_item — scrolls list to show given item
// ============================================================

export function FUN_005a17e9(param_1, param_2) {
  // UI list scrolling, stubbed
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
  // UI hit testing for list items, stubbed
  return -1;
}


// ============================================================
// Function: FUN_005a1c52 @ 0x005A1C52
// Size: 93 bytes
// count_items_in_tab — counts list items for given tab index
// ============================================================

export function FUN_005a1c52(param_1) {
  // Uses in_ECX linked list traversal, stubbed
  return 0;
}


// ============================================================
// Function: FUN_005a1caf @ 0x005A1CAF
// Size: 244 bytes
// select_tab_from_coords — picks tab based on mouse coords
// ============================================================

export function FUN_005a1caf(param_1, param_2) {
  // UI tab selection from coordinates, stubbed
  return;
}


// ============================================================
// Function: FUN_005a1da3 @ 0x005A1DA3
// Size: 133 bytes
// scroll_popup_to_index — scrolls the active popup to index
// ============================================================

export function FUN_005a1da3(param_1) {
  if (G.DAT_006cec84 !== 0) {
    // Stubbed: sets scroll position and redraws
  }
  return;
}


// ============================================================
// Function: FUN_005a1e28 @ 0x005A1E28
// Size: 693 bytes
// create_popup_window — creates the popup drawing surface
// ============================================================

export function FUN_005a1e28() {
  // MFC window creation, uses operator_new, SEH, stubbed
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
  // Massive MFC control creation function (scrollbars, list items,
  // tabs, buttons). Entirely UI framework. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a3bae @ 0x005A3BAE
// Size: 170 bytes
// on_list_select — handles list item selection
// ============================================================

export function FUN_005a3bae(param_1, param_2) {
  if (G.DAT_006cec84 !== 0) {
    let local_10 = 0;
    let local_c = 0;
    // Walk linked list to find item at index param_2
    // Sets G.DAT_006cec84 + 0xd8 to item value
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
  // Sets redraw flag and invalidates window
  return;
}


// ============================================================
// Function: FUN_005a3c83 @ 0x005A3C83
// Size: 71 bytes
// invalidate_if_no_icons — invalidate popup if not icon mode
// ============================================================

export function FUN_005a3c83() {
  if (G.DAT_006cec84 !== 0) {
    FUN_005a3c58();
  }
  return;
}


// ============================================================
// Function: FUN_005a3cca @ 0x005A3CCA
// Size: 297 bytes
// on_tab_click — handles tab click in popup
// ============================================================

export function FUN_005a3cca(param_1) {
  // Walks linked list, calls callback, possibly redraws. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a3df3 @ 0x005A3DF3
// Size: 99 bytes
// on_help_click — handles help button in popup tabs
// ============================================================

export function FUN_005a3df3() {
  // Calls callback function pointer if set, stubbed
  return;
}


// ============================================================
// Function: FUN_005a3e56 @ 0x005A3E56
// Size: 548 bytes
// on_button_click — handles button press in popup
// ============================================================

export function FUN_005a3e56(param_1) {
  if (G.DAT_006cec84 !== 0) {
    // Complex button handler: sets result, walks lists. Stubbed.
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
  // Large switch statement handling arrow keys, page up/down,
  // home/end for list navigation. Uses goto labels for up/down
  // traversal. Entirely UI. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a49c1 @ 0x005A49C1
// Size: 1069 bytes
// on_alpha_key — handles alphabetic key press for quick-select
// ============================================================

export function FUN_005a49c1(param_1) {
  // Searches list items by first letter, scrolls to match.
  // Entirely UI. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a4df3 @ 0x005A4DF3
// Size: 236 bytes
// on_mouse_down — handles mouse button press in list area
// ============================================================

export function FUN_005a4df3(param_1, param_2) {
  // Hit-tests click against list items, starts drag. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a4edf @ 0x005A4EDF
// Size: 1130 bytes
// on_mouse_move_drag — handles mouse drag in list area
// ============================================================

export function FUN_005a4edf(param_1, param_2) {
  // Drag scrolling with boundary handling. Stubbed.
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
    // Clears drag state
  }
  return;
}


// ============================================================
// Function: FUN_005a53b8 @ 0x005A53B8
// Size: 220 bytes
// on_double_click — handles double-click in list
// ============================================================

export function FUN_005a53b8(param_1, param_2) {
  // Double-click selects and closes popup. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a5494 @ 0x005A5494
// Size: 152 bytes
// on_scrollbar_0 — horizontal scrollbar handler (tab 0)
// ============================================================

export function FUN_005a5494(param_1) {
  if (G.DAT_006cec84 !== 0) {
    // Scrolls tab 0 to position param_1. Stubbed.
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
    // Scrolls tab 1 to item param_1. Stubbed.
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
    // Scrolls tab 1 by page. Stubbed.
  }
  return;
}


// ============================================================
// Function: FUN_005a5649 @ 0x005A5649
// Size: 309 bytes
// draw_popup_background — draws popup background (solid or tiled)
// ============================================================

export function FUN_005a5649(param_1, param_2) {
  // Draws background using solid fill or tiled bitmap. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a577e @ 0x005A577E
// Size: 1964 bytes
// redraw_popup — full popup redraw
// ============================================================

export function FUN_005a577e() {
  // Massive redraw function: draws border, title, buttons,
  // list items, tabs, icons. Entirely UI rendering. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a5f34 @ 0x005A5F34
// Size: 999 bytes
// show_popup_modal — displays popup and runs message loop
// ============================================================

export function FUN_005a5f34(param_1, param_2) {
  // Creates popup, runs modal event loop, returns result.
  // Uses win32 message pump. Stubbed.
  return 0;
}


// ============================================================
// Function: FUN_005a632a @ 0x005A632A
// Size: 2287 bytes
// parse_popup_script — reads popup definition from text file
// ============================================================

export function FUN_005a632a(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // Parses @OPTIONS, @PROMPT, @TITLE, @BUTTON, @COLUMNS,
  // @HEIGHT, @WIDTH, @LENGTH, @CHECKBOX, @LISTBOX, @SYSTEM,
  // @DEFAULT, @SMALLFONT directives from game text files.
  // Entirely UI/text-parsing. Stubbed.
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
  // MFC vector destructor, stubbed
  return;
}


// ============================================================
// Function: FID_conflict__vector_deleting_destructor_ @ 0x005A93B0
// Size: 110 bytes
// vector_deleting_destructor (0x48 stride)
// ============================================================

export function FID_conflict__vector_deleting_destructor__93B0(param_1) {
  // MFC vector destructor, stubbed
  return;
}


// ============================================================
// Function: FID_conflict__vector_deleting_destructor_ @ 0x005A9440
// Size: 110 bytes
// vector_deleting_destructor (0x3c stride, variant 2)
// ============================================================

export function FID_conflict__vector_deleting_destructor__9440(param_1) {
  // MFC vector destructor, stubbed
  return;
}


// ============================================================
// Function: FUN_005a94d0 @ 0x005A94D0
// Size: 57 bytes
// scalar_deleting_destructor_94d0
// ============================================================

export function FUN_005a94d0(param_1) {
  // MFC scalar destructor, stubbed
  return;
}


// ============================================================
// Function: FID_conflict__vector_deleting_destructor_ @ 0x005A9520
// Size: 110 bytes
// vector_deleting_destructor (0x40 stride)
// ============================================================

export function FID_conflict__vector_deleting_destructor__9520(param_1) {
  // MFC vector destructor, stubbed
  return;
}


// ============================================================
// Function: FUN_005a95b0 @ 0x005A95B0
// Size: 57 bytes
// scalar_deleting_destructor_95b0
// ============================================================

export function FUN_005a95b0(param_1) {
  // MFC scalar destructor, stubbed
  return;
}


// ============================================================
// Function: FUN_005a9600 @ 0x005A9600
// Size: 43 bytes
// set_icon_bitmap — sets icon bitmap for popup item
// ============================================================

export function FUN_005a9600(param_1) {
  // Sets bitmap on icon view item via in_ECX. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a9640 @ 0x005A9640
// Size: 32 bytes
// disable_item — clears item enabled flag
// ============================================================

export function FUN_005a9640() {
  // Sets in_ECX + 0x34 = 0. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a9670 @ 0x005A9670
// Size: 47 bytes
// get_item_text — sends message to get item text
// ============================================================

export function FUN_005a9670(param_1, param_2) {
  // Sends window message to retrieve item text. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a96b0 @ 0x005A96B0
// Size: 43 bytes
// get_selected_text — sends message to get selection text
// ============================================================

export function FUN_005a96b0(param_1) {
  // Sends window message for selected text. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a96f0 @ 0x005A96F0
// Size: 47 bytes
// is_popup_closable — returns whether popup can be dismissed
// ============================================================

export function FUN_005a96f0() {
  // Checks in_ECX byte flag. Stubbed.
  return false;
}


// ============================================================
// Function: FUN_005a9730 @ 0x005A9730
// Size: 55 bytes
// draw_icon — draws icon at position
// ============================================================

export function FUN_005a9730(param_1, param_2, param_3, param_4) {
  // Calls drawing function via in_ECX. Stubbed.
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
  // Creates rect and fills. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a9811 @ 0x005A9811
// Size: 71 bytes
// draw_horizontal_bar — draws a horizontal bar of given width
// ============================================================

export function FUN_005a9811(param_1, param_2, param_3, param_4, param_5) {
  // Creates rect and fills. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a9858 @ 0x005A9858
// Size: 69 bytes
// draw_vertical_line — draws a 1-pixel vertical line
// ============================================================

export function FUN_005a9858(param_1, param_2, param_3, param_4, param_5) {
  // Creates rect and fills. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a989d @ 0x005A989D
// Size: 71 bytes
// draw_vertical_bar — draws a vertical bar of given height
// ============================================================

export function FUN_005a989d(param_1, param_2, param_3, param_4, param_5) {
  // Creates rect and fills. Stubbed.
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
  FUN_005a97cc(param_1, param_2, param_4 + param_2 - 1, param_3, param_6);
  FUN_005a97cc(param_1, param_2, param_4 + param_2 - 1, param_5 + param_3 - 1, param_6);
  FUN_005a9858(param_1, param_2, param_3, param_5 + param_3 - 1, param_6);
  FUN_005a9858(param_1, param_4 + param_2 - 1, param_3, param_5 + param_3 - 1, param_6);
  return;
}


// ============================================================
// Function: FUN_005a99fc @ 0x005A99FC
// Size: 167 bytes
// draw_3d_border — draws 3D raised/lowered border
// ============================================================

export function FUN_005a99fc(param_1, param_2, param_3, param_4) {
  // param_2 is a rect array [x, y, x2, y2]
  // Draws light edges on top/left, dark on bottom/right
  // Stubbed since purely graphical
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
  // Creates rect from coordinates, fills with color. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a9afe @ 0x005A9AFE
// Size: 95 bytes
// blit_rect — copies rectangle between surfaces
// ============================================================

export function FUN_005a9afe(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // Blits rectangle from source to destination. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005a9b5d @ 0x005A9B5D
// Size: 391 bytes
// tile_blit — tiles a bitmap into a destination area
// ============================================================

export function FUN_005a9b5d(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // Tiles source bitmap into destination area with wrapping.
  // Stubbed since purely graphical.
  return;
}


// ============================================================
// Function: FUN_005a9ce9 @ 0x005A9CE9
// Size: 183 bytes
// draw_3d_border_and_shrink — draws border then shrinks rect
// ============================================================

export function FUN_005a9ce9(param_1, param_2, param_3, param_4) {
  // Draws 3D border and calls FUN_004bb800 to shrink rect.
  // Stubbed.
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
          ((1 << (local_c & 0x1f)) & G.DAT_00655b0b) !== 0) {
        // Check G.DAT_006ced20 array — stubbed
        bVar1 = false;
        break;
      }
    }
    if (bVar1) {
      // Set redraw flags
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
          ((1 << (local_c & 0x1f)) & G.DAT_00655b0b) !== 0) {
        bVar1 = false;
        break;
      }
    }
    if (bVar1 || G.DAT_006ad308 < 2) {
      // Set redraw flags
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
  // Massive multiplayer server turn loop:
  // - Waits for all players to submit production
  // - Processes AI moves
  // - Handles end-of-turn, casualty reports, timer
  // - Network message dispatch (XD_FlushSendBuffer)
  // Entirely multiplayer framework. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005ab07f @ 0x005AB07F  (already defined above as stub)
// Size: 12 bytes
// cleanup_dialog_1 — calls FUN_0059df8a
// ============================================================
// (defined in stubs section above)


// ============================================================
// Function: FUN_005ab095 @ 0x005AB095
// Size: 14 bytes
// restore_seh_frame — restores SEH exception handler
// ============================================================

export function FUN_005ab095() {
  // SEH frame restoration, no-op in JS
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
  // Checks various network state flags, redraws if needed
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
  // Checks network state flags, redraws if needed
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
  // Checks network + disconnect flags, redraws if needed
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
  // Checks network + disconnect flags, redraws if needed
  return;
}


// ============================================================
// Function: wait_production_005ab2d5 @ 0x005AB2D5
// Size: 3334 bytes
// wait_production_client — client-side multiplayer turn loop
// ============================================================

export function wait_production_005ab2d5() {
  // Client-side multiplayer turn loop:
  // - Waits for server signals
  // - Handles hot-seat transitions
  // - Processes production/AI/moves phases
  // - Network sync and timer
  // Entirely multiplayer framework. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005abfdb @ 0x005ABFDB  (already defined above as stub)
// Size: 12 bytes
// cleanup_dialog_2 — calls FUN_0059df8a
// ============================================================
// (defined in stubs section above)


// ============================================================
// Function: FUN_005abff1 @ 0x005ABFF1
// Size: 15 bytes
// restore_seh_frame_2 — restores SEH exception handler
// ============================================================

export function FUN_005abff1() {
  // SEH frame restoration, no-op in JS
  return;
}


// ============================================================
// Function: FUN_005ac840 @ 0x005AC840
// Size: 365 bytes
// pedia_init_unit_list — initializes pedia unit list view
// ============================================================

export function FUN_005ac840() {
  // Initializes pedia scrollbar and unit list display.
  // Uses in_ECX as pedia window. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005ac9ad @ 0x005AC9AD
// Size: 4075 bytes
// pedia_draw_unit_stats — draws unit stats in civilopedia
// ============================================================

export function FUN_005ac9ad() {
  // Draws unit attack, defense, HP, firepower, movement, cost,
  // prereq tech, and unit ability flags in the civilopedia.
  // Entirely UI rendering. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005ad998 @ 0x005AD998
// Size: 342 bytes
// pedia_select_unit — selects unit in civilopedia
// ============================================================

export function FUN_005ad998(param_1) {
  if (G.DAT_006a677c !== 0 && G.DAT_006ad908 === 0) {
    // Searches unit list for param_1, sets selection, redraws.
    // Stubbed.
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
  // In C: swaps *param_1 and *param_2
  // In JS: would need array/object references to work
  let temp = param_1[0];
  param_1[0] = param_2[0];
  param_2[0] = temp;
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

// FUN_005ae052 available via fn_utils import


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
  FUN_005ae296(uVar1, local_c);
  return;
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
  // param_2 and param_3 are output pointers
  // In JS we return { byteIndex, bitMask }
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
  // PBEM main loop: presents menu (new game, load scenario,
  // load game, etc.), creates game, handles multiple rounds
  // of player setup. Entirely game-setup UI. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005aebef @ 0x005AEBEF  (already defined above as stub)
// Size: 12 bytes
// cleanup_dialog_3 — calls FUN_0059df8a
// ============================================================
// (defined in stubs section above)


// ============================================================
// Function: FUN_005aec05 @ 0x005AEC05
// Size: 15 bytes
// restore_seh_frame_3 — restores SEH exception handler
// ============================================================

export function FUN_005aec05() {
  // SEH frame restoration, no-op in JS
  return;
}


// ============================================================
// Function: FUN_005aec14 @ 0x005AEC14
// Size: 249 bytes
// get_email_address — prompts user for email address (PBEM)
// ============================================================

export function FUN_005aec14(param_1, param_2) {
  // Shows email address dialog for PBEM setup.
  // Stores result in per-player data. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005aed0d @ 0x005AED0D  (already defined above as stub)
// Size: 12 bytes
// cleanup_dialog_4 — calls FUN_0059df8a
// ============================================================
// (defined in stubs section above)


// ============================================================
// Function: FUN_005aed23 @ 0x005AED23
// Size: 14 bytes
// restore_seh_frame_4 — restores SEH exception handler
// ============================================================

export function FUN_005aed23() {
  // SEH frame restoration, no-op in JS
  return;
}


// ============================================================
// Function: FUN_005aef20 @ 0x005AEF20
// Size: 544 bytes
// backup_unit_data — copies unit type data to editor buffers
// ============================================================

export function FUN_005aef20() {
  // Copies all 62 unit type records from G.DAT_0064b1bc tables
  // into editor working buffers at G.DAT_006a1d88 / G.DAT_006a2d28.
  // Used by cheat mode unit editor. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005af140 @ 0x005AF140
// Size: 515 bytes
// restore_unit_data — copies editor buffers back to unit tables
// ============================================================

export function FUN_005af140() {
  // Reverse of FUN_005aef20: copies editor working buffers
  // back to the game's unit type tables. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005af343 @ 0x005AF343
// Size: 353 bytes
// populate_unit_editor_controls — fills editor controls with values
// ============================================================

export function FUN_005af343() {
  // Reads unit stats from editor buffer, populates edit controls
  // and combo boxes. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005af4ae @ 0x005AF4AE
// Size: 458 bytes
// read_unit_editor_controls — reads values from editor controls
// ============================================================

export function FUN_005af4ae() {
  // Reads edit controls and combo boxes, validates ranges,
  // stores values back to editor buffer. Returns count of
  // out-of-range values that were clamped.
  return 0;
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
  // Formats all 62 unit types as comma-separated lines and
  // writes them to param_1 (FILE*). Used by cheat mode save.
  // Entirely file I/O. Stubbed.
  return 1;
}


// ============================================================
// Function: show_messagebox_F9E3 @ 0x005AF9E3
// Size: 487 bytes
// apply_unit_changes — applies unit editor changes, saves files
// ============================================================

export function show_messagebox_F9E3() {
  // Validates unit editor changes, writes to EVENTS.TXT and
  // RULES.TXT, shows error message boxes if file I/O fails.
  // Stubbed.
  return;
}


// ============================================================
// Function: FUN_005afbca @ 0x005AFBCA
// Size: 369 bytes
// rename_unit_type — shows dialog to rename a unit type
// ============================================================

export function FUN_005afbca() {
  // Shows text input dialog for unit rename, updates editor
  // list. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005afd3b @ 0x005AFD3B
// Size: 95 bytes
// show_unit_help — shows unit help text
// ============================================================

export function FUN_005afd3b() {
  // Opens help viewer for unit type. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005afd9a @ 0x005AFD9A
// Size: 40 bytes
// mark_unit_editor_clean — clears dirty flag
// ============================================================

export function FUN_005afd9a() {
  G.DAT_006a1d7c = 0;
  // Invalidates object cache (MFC call). Stubbed.
  return;
}


// ============================================================
// Function: FUN_005afdc2 @ 0x005AFDC2
// Size: 83 bytes
// assign_unit_sprite — assigns sprite to unit type
// ============================================================

export function FUN_005afdc2() {
  // Copies sprite name from string resource to unit editor
  // buffer. Stubbed.
  return;
}


// ============================================================
// Function: FUN_005afe15 @ 0x005AFE15
// Size: 111 bytes
// export_unit_to_scenario — exports unit type to scenario file
// ============================================================

export function FUN_005afe15() {
  // Reads values from editor, formats string, writes to
  // scenario file. Stubbed.
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
  // Creates dialog with 15 checkboxes for unit ability flags,
  // reads back results as bitmask. Stubbed.
  return;
}
