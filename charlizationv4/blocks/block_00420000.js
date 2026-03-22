// ═══════════════════════════════════════════════════════════════════
// block_00420000.js — Mechanical transpilation of block_00420000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00420000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00420000.c
// ═══════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_00408130, FUN_00408330, FUN_004083f0 } from './block_00400000.js';
import { FUN_00408460, FUN_004085f0, FUN_00408680, FUN_004086c0, FUN_0040bbb0, FUN_0040bbe0 } from './block_00400000.js';
import { FUN_0040bc10, FUN_0040bc40, FUN_0040bc80, FUN_0040ef50, FUN_0040ef70, FUN_0040efd0 } from './block_00400000.js';
import { FUN_0040f010, FUN_0040f350, FUN_0040f380, FUN_0040f680, FUN_0040f7d0, FUN_0040f840 } from './block_00400000.js';
import { FUN_0040f880, FUN_0040fc50, FUN_0040fcf0, FUN_0040fd40, FUN_0040fd80, FUN_0040fdb0 } from './block_00400000.js';
import { FUN_0040fe10, FUN_0040fe40, FUN_0040fea0, FUN_0040fed0, FUN_0040ff00, FUN_0040ff30 } from './block_00400000.js';
import { FUN_0040ff60, FUN_0040ffa0, FUN_0040ffe0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00414d70, FUN_00415133, FUN_00417ef0, FUN_00417f70 } from './block_00410000.js';
import { FUN_00417fa0, FUN_004183d0, FUN_00418bf0, FUN_00418c70, FUN_00418ce0, FUN_00418d60 } from './block_00410000.js';
import { FUN_00418d90, FUN_00418dd0, FUN_004190d0, FUN_00419100, FUN_00419b80, FUN_00419ba0 } from './block_00410000.js';
import { FUN_00419be0, FUN_00419c8b, FUN_0041e864 } from './block_00410000.js';
import { FUN_0043c260, FUN_0043c3f0, FUN_0043c460, FUN_0043c4c0, FUN_0043c5c0, FUN_0043c5f0 } from './block_00430000.js';
import { FUN_0043ca80, FUN_0043cc00, FUN_0043cf76 } from './block_00430000.js';
import { FUN_00445e46, FUN_00448f92 } from './block_00440000.js';
import { FUN_00453e51, FUN_0045705e } from './block_00450000.js';
import { FUN_004679ab, FUN_0046b14d, FUN_0046e020, FUN_0046e6a9 } from './block_00460000.js';
import { FUN_00472d20, FUN_0047ce1e, FUN_0047cea6, FUN_0047cf22, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d52, FUN_00484fec, FUN_00485208 } from './block_00480000.js';
import { FUN_0049301b, FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497ea0, FUN_004980ec } from './block_00490000.js';
import { FUN_00498159, FUN_0049882b } from './block_00490000.js';
import { FUN_004a2020, FUN_004aef20, FUN_004aef36, FUN_004aef96, FUN_004af01a, FUN_004af03b } from './block_004A0000.js';
import { FUN_004af122, FUN_004af14b, FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b21d7 } from './block_004B0000.js';
import { FUN_004c0cf7, FUN_004c2788, FUN_004ccb6a } from './block_004C0000.js';
import { FUN_004e4ceb, FUN_004e75a6, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004f00f0 } from './block_004F0000.js';
import { FUN_0051d564, FUN_0051d63b, FUN_0051f19c } from './block_00510000.js';
import { FUN_00548b70, FUN_00548c78 } from './block_00540000.js';
import { FUN_00552112, FUN_00552ed2, FUN_00553379, FUN_005534bc, FUN_0055d8d8 } from './block_00550000.js';
import { FUN_00566584, FUN_0056baff, FUN_0056d289 } from './block_00560000.js';
import { FUN_00573e59 } from './block_00570000.js';
import { FUN_0059baf0, FUN_0059c276, FUN_0059d3c9, FUN_0059db08, FUN_0059db65, FUN_0059df8a } from './block_00590000.js';
import { FUN_0059dfb9, FUN_0059e0eb, FUN_0059e18b, FUN_0059e585, FUN_0059e5c9, FUN_0059e6a9 } from './block_00590000.js';
import { FUN_0059e6ff, FUN_0059ea99, FUN_0059ec88, FUN_0059edf0, FUN_0059fb78, FUN_0059fc19 } from './block_00590000.js';
import { FUN_0059fd2a } from './block_00590000.js';
import { FUN_005a577e, FUN_005a5f34, FUN_005a632a, FUN_005a9abf, FUN_005a9afe, FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005b2c82, FUN_005b2d39, FUN_005b2e69, FUN_005b496e, FUN_005b50ad, FUN_005b898b } from './block_005B0000.js';
import { FUN_005b8b1a, FUN_005b8b65, FUN_005b8da4, FUN_005b976d, FUN_005b9d81, FUN_005b9ec6 } from './block_005B0000.js';
import { FUN_005b9f1c, FUN_005baeb0, FUN_005baec8, FUN_005baee0, FUN_005bb024, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005bd630, FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c5aeb, FUN_005c61b0, FUN_005c62ee, FUN_005c64da, FUN_005c656b, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005cef66 } from './block_005C0000.js';
import { FUN_005d1f50, FUN_005d2004, FUN_005d2279, FUN_005d2550, FUN_005d2568, FUN_005d2590 } from './block_005D0000.js';
import { FUN_005d25a8, FUN_005d268e, FUN_005d7c6e, FUN_005d8236, FUN_005d83d6, FUN_005d8476 } from './block_005D0000.js';
import { FUN_005d8721, FUN_005dae6b, FUN_005db0d0 } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_005f35f0 } from './block_00600000.js';

function stub(name) { return function (...args) { return 0; }; }


let _DAT_006ad674 = 0;
let _DAT_006cec80 = 0;
let PTR_DAT_00635a48 = null;
let PTR_s_5_4_0f_Multiplayer_26_March_99_0062765c = "";
let _DAT_0063ef78 = 0;
let _DAT_0063ef7c = 0;
let _DAT_0063ef90 = 0;
let _DAT_0063ef68 = 0;
let PTR_DAT_006359f0 = 0;

let s_WAITINGFORSERVER_00625c24 = "WAITINGFORSERVER";
let s_WAITTOJOIN_00625c70 = "WAITTOJOIN";
let s_TITLE_GIF_00625ca4 = "TITLE.GIF";
let s_WAITINGONJOIN_00625cd0 = "WAITINGONJOIN";
let s_WAITINGONJOIN_00625cf8 = "WAITINGONJOIN";
let s_WAITINGFORSERVER_00625b24 = "WAITINGFORSERVER";
let s_WAITINGFORSERVER_00625b38 = "WAITINGFORSERVER";
let s_IPOFGAME_00625a08 = "IPOFGAME";
let s_GAMEPROFILE_00625d74 = "GAMEPROFILE";
let s_EDITORSQ_GIF_00625ea4 = "EDITORSQ.GIF";
let s_SUPPLYSHOW_00625ef0 = "SUPPLYSHOW";
let s_SUPPLYNONE_00625f00 = "SUPPLYNONE";
let s_SUPPLYSEARCH_00625f0c = "SUPPLYSEARCH";
let s_CITIES_00625e88 = "CITIES";
let s_CITYMISC_00625e98 = "CITYMISC";
let s_TILES_DLL_00625ed4 = "TILES.DLL";
let s_scredits_gif_00625ee0 = "scredits.gif";
let s_DEBUG_006359dc = "DEBUG";

// ═══════════════════════════════════════════════════════════════════
// STUB: External functions referenced from other blocks.
// These are no-ops unless hooked up to actual implementations.
// ═══════════════════════════════════════════════════════════════════

function invalidate_ABC7(p1) {}
function operator_new(size) { return new Uint8Array(size); }
function operator_delete(p) {}
function XD_OpenConnection(p1, p2) { return 0; }
function XD_FlushSendBuffer(p1) {}
function XD_CloseConnection() {}
function XD_LobbySendMessage(p1) { return 0; }
function debug_log() {}
function _strlen(s) { return typeof s === 'string' ? s.length : 0; }
function _strcmp(a, b) { return a === b ? 0 : 1; }
function __strnicmp(a, b, n) { return 0; }
function _strncmp(a, b, n) { return 0; }
function _strchr(s, c) { return null; }
function _atoi(s) { return 0; }
function __ltoa(val, buf, radix) {}
function __strupr(s) {}
function __chdir(p) { return 0; }
function _atexit(fn) {}
function _memset(p, v, n) {}
function _strncpy(dst, src, n) {}
function GetSystemMetrics(p) { return 0; }
function ios_delbuf(p1, p2) {}
function CPropertySheet_EnableStackedTabs(p1, p2) {}
function CRichEditDoc_InvalidateObjectCache(p1) {}

// Thunk stubs — these all delegate to other functions
function FUN_0040bbb0_2() {}
function FUN_0043d20a(a, b) { return 0; }
function FUN_0043c520() {}
function FUN_0043c790(a, b, c) {}
function FUN_0043c7c0(a, b, c) {}
function FUN_0043c870(p1) {}
function FUN_0043c8a0(p1) {}
function FUN_0043c8d0(...args) { return 0; }
function FUN_0043c910(...args) {}
function FUN_0043cab0(p1) { return 0; }
function FUN_0043cb30(...args) { return 0; }
function FUN_00509590(p1) {}
function FUN_00456e46(...args) {}
function FUN_005cef66_stub(...args) {}
function manage_window_C5DA(p1) {}
function CDaoFieldInfo_destructor(p1) {}
function Timevec_destructor(p1) { return 0; }
function COleClientItem_GetActiveView(p1) { return 0; }

// ═══════════════════════════════════════════════════════════════════
// FUN_004201ef — thunk to FUN_005d7c6e
// ═══════════════════════════════════════════════════════════════════
export function FUN_004201ef() {
  FUN_005d7c6e();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004201fb — thunk to FUN_005c656b
// ═══════════════════════════════════════════════════════════════════
export function FUN_004201fb() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00420207 — thunk to FUN_0059df8a
// ═══════════════════════════════════════════════════════════════════
export function FUN_00420207() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042021d — SEH cleanup (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042021d() {
  // SEH frame cleanup — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421bb0 — get_tick_count (time function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421bb0() {
  return Date.now() & 0x7FFFFFFF;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421bd0 — thunk to FUN_005bb9c0
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421bd0() {
  // FUN_005bb9c0() — stub
}

// ═══════════════════════════════════════════════════════════════════
// Realloc — CMemFile::Realloc (library function)
// ═══════════════════════════════════════════════════════════════════
export function Realloc(param_1) {
  FUN_005d83d6(param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421c30 — thunk to FUN_005d8476
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421c30() {
  FUN_005d8476();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421c60 — thunk to FUN_005d8721
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421c60() {
  FUN_005d8721();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421ca0 — invalidate_list_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421ca0(param_1) {
  // Uses in_ECX (this pointer) — not applicable in JS
  // Stub: sets flag and invalidates
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421d30 — append_newline_to_buffer (thunk to FUN_004aef96)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421d30() {
  FUN_004aef96(G.DAT_00679640);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421d60 — set_string_table_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421d60(param_1, param_2) {
  FUN_005f22d0(G.DAT_0063cc48, param_1 * 0x104, param_2);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421da0 — set_number_table_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421da0(param_1, param_2) {
  G.DAT_0063cc30[param_1] = param_2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421dd0 — invalidate_rect (thunk to FUN_0059dfb9)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421dd0() {
  FUN_0059dfb9(0, 0, 0, 0);
}

// ═══════════════════════════════════════════════════════════════════
// Create — CSocket::Create (Win32 network — no-op stub)
// ═══════════════════════════════════════════════════════════════════
export function CSocket_Create(param_1, param_2, param_3) {
  let iVar1 = FUN_0040ffe0(param_1, param_2, 0, param_3);
  return iVar1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421e40 — set_connection_params
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421e40(param_1, param_2) {
  G.DAT_00635a34 = param_1;
  G.DAT_00635a38 = param_2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421e70 — add_dialog_string
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421e70(param_1, param_2) {
  FUN_00419100(G.DAT_006359d4, param_1, param_2);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421ea0 — set_dialog_string
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421ea0(param_1) {
  FUN_004190d0(G.DAT_006359d4, param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421ed0 — show_dialog_4param
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421ed0(param_1, param_2, param_3, param_4) {
  FUN_0051d63b(G.DAT_006359d4, param_1, param_2, param_3, param_4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421f10 — set_year_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421f10(param_1) {
  FUN_00485208(G.DAT_00679640, param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421f40 — get_byte_at_offset_0x1ef (this pointer)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421f40() {
  // Uses in_ECX — stub
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421f70 — init_connection_object
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421f70() {
  // Uses in_ECX — stub
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421fad — thunk to FUN_0059baf0
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421fad() {
  FUN_0059baf0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421fcd — multiplayer_connection_setup (massive MP lobby fn)
// This is a ~8K byte function handling the entire MP connection flow.
// Heavily depends on Win32/MFC UI and networking — stubbed.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421fcd(param_1) {
  // Multiplayer connection setup — Win32/MFC/DirectPlay
  // Not applicable to WebSocket architecture — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00424101 — thunk to FUN_005c656b (destructor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00424101() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042410d — thunk to FUN_0059df8a (destructor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042410d() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00424129 — thunk to FUN_005c656b (destructor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00424129() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00424135 — thunk to FUN_0059df8a (destructor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00424135() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042414b — SEH cleanup (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042414b() {
  // SEH frame cleanup — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042415c — timer_handler_setup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042415c() {
  FUN_0047e94e(1, 0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042417a — network_status_check
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042417a() {
  FUN_00421bb0();
  FUN_0047e94e(1, 0);
  if (((G.DAT_006c8ff0 !== 0) || (G.DAT_006c900c !== 0)) || (G.DAT_006c8ff4 !== 0) || (G.DAT_006c9024 !== 0)) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004241f8 — animate_waiting_indicator
// ═══════════════════════════════════════════════════════════════════
export function FUN_004241f8() {
  let iVar1 = FUN_00421bb0();
  iVar1 = iVar1 - _DAT_006ad674;
  FUN_0047e94e(1, 0);
  if ((G.DAT_006c9004 === 0) && (G.DAT_006c900c === 0)) {
    if (2 < iVar1) {
      // String animation logic for waiting indicator
      // Uses MFC string manipulation — stubbed
      FUN_005a577e();
      _DAT_006ad674 = FUN_00421bb0();
    }
  } else {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042433c — network_data_received_check
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042433c() {
  FUN_0047e94e(1, 0);
  if (((G.DAT_006c8ff0 !== 0) || (G.DAT_006c900c !== 0)) || (G.DAT_006c9010 !== 0)) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042439c — join_wait_check
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042439c() {
  FUN_0047e94e(1, 0);
  if ((G.DAT_006c9038 !== 0) || (G.DAT_006c900c !== 0)) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004243ef — error_check_handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_004243ef() {
  FUN_0047e94e(1, 0);
  if (((G.DAT_006c902c !== 0) || (G.DAT_006c900c !== 0)) || (G.DAT_006c8ff4 !== 0)) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042444f — timeout_check_handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042444f() {
  let iVar1 = FUN_00421bb0();
  iVar1 = iVar1 - _DAT_006ad674;
  FUN_0047e94e(1, 0);
  if ((G.DAT_006ad300 === -1) && (0x4d8 < iVar1)) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  } else if (G.DAT_006ad300 !== -1) {
    G.DAT_006ad678[0xf] = G.DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(G.DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004244e0 — update_listbox_selection (MFC UI — stubbed)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004244e0() {
  // MFC listbox UI management — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00424688 — find_player_in_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_00424688(param_1, param_2) {
  // Uses in_ECX, linked list traversal, strcmp — stubbed
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042472a — init_player_strings (MFC UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042472a() {
  // MFC UI string init — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004247b2 — lookup_player_by_id
// ═══════════════════════════════════════════════════════════════════
export function FUN_004247b2(param_1, param_2, param_3) {
  // Linked list traversal with strcmp — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042486f — create_listbox_columns (MFC UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042486f() {
  // MFC listbox column creation — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00424ae9 — update_game_info_display (MFC UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00424ae9() {
  // MFC game info list update — returns 1
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004253ef — free_player_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004253ef() {
  // MFC linked list cleanup — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004254a8 — add_item_to_player_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004254a8(param_1, param_2) {
  // MFC linked list append — no-op stub
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00425607 — start_timer
// ═══════════════════════════════════════════════════════════════════
export function FUN_00425607(param_1) {
  // Win32 timer setup — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00425650 — stop_timer
// ═══════════════════════════════════════════════════════════════════
export function FUN_00425650() {
  // Win32 timer kill — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00425695 — refresh_server_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_00425695() {
  FUN_0046b14d(1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0042570c();
  // Timer management — stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042570c — prune_stale_servers
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042570c() {
  // Linked list traversal to prune stale server entries
  // Operates on G.DAT_006c31d4 linked list — stubbed
  let bVar2 = false;
  let local_c = G.DAT_006c31d4;
  let iVar3 = FUN_00421bb0();
  // Prune loop — stubbed due to pointer manipulation
  if (bVar2) {
    FUN_004257fe();
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004257fe — rebuild_server_list_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_004257fe() {
  // MFC list rebuild — no-op stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004259a6 — show_game_profile_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_004259a6(param_1) {
  // MFC dialog with game settings — returns dialog result
  let local_3c = [0, 1, 3, 7, 0xf, 0x1f, 0x3f, 0x7f, 0xff, 0];

  FUN_004aef20(G.DAT_0063cc48);
  FUN_005f22e0(G.DAT_0063cc48, G.DAT_006ad59c);

  // ... many string formatting operations ...
  // Builds game profile dialog strings and shows dialog

  G.DAT_00635a3c = 0; // &LAB_00403c74
  let uVar2 = FUN_0051d564(G.DAT_006359d4, s_GAMEPROFILE_00625d74, param_1 !== 0, 0, 0);
  return uVar2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426f30 — scalar_deleting_destructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426f30(param_1) {
  FUN_0059df8a();
  if ((param_1 & 1) !== 0) {
    // operator_delete(in_ECX) — stub
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426f80 — manage_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426f80() {
  // Uses in_ECX — manage_window_C5DA call — stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426fb0 — show_modal_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426fb0(param_1, param_2, param_3, param_4) {
  FUN_0051d564(G.DAT_006359d4, param_1, param_2, param_3, param_4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426ff0 — format_template_string (percent substitution)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426ff0(param_1, param_2) {
  // Template string processor: %STRING0..%STRING9, %NUMBER0..%NUMBER9, %HX0..%HX9, %%
  // param_1 = template string, param_2 = output buffer
  // Stubbed — requires full string manipulation
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004271e8 — set_string_from_text_id
// ═══════════════════════════════════════════════════════════════════
export function FUN_004271e8(param_1, param_2) {
  let uVar1 = FUN_00428b0c(param_2);
  FUN_00421d60(param_1, uVar1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00427211 — set_string_from_table_index
// ═══════════════════════════════════════════════════════════════════
export function FUN_00427211(param_1, param_2) {
  FUN_004271e8(param_1, G.DAT_00628420 + param_2 * 4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004272d0 — reveal_tile_for_civ
// ═══════════════════════════════════════════════════════════════════
export function FUN_004272d0(param_1, param_2, param_3) {
  if (-1 < param_3) {
    FUN_005b9ec6();
    FUN_005b976d(param_1, param_2, (1 << (u8(param_3) & 0x1f)) & 0xff, 1, 1);
    FUN_005b8b1a(param_1, param_2, param_3);
    let iVar1 = FUN_0043cf76(param_1, param_2);
    if (iVar1 < 0) {
      let uVar2 = FUN_005b2e69(param_1, param_2);
      FUN_005b496e(uVar2, param_3);
    } else {
      FUN_0043cc00(iVar1, param_3);
    }
    FUN_005b9f1c();
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042738c — check_disband_obsolete_unit
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042738c(param_1) {
  if (((G.DAT_006560ff[param_1 * 0x20] & 0xf) === 0xb) &&
     (G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0x07)) {
    G.DAT_006560ff[param_1 * 0x20] = 0xff;
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004273e6 — cancel_fortified_units_at_tile
// ═══════════════════════════════════════════════════════════════════
export function FUN_004273e6(param_1) {
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    if ((G.DAT_006560ff[param_1 * 0x20] === 0x03) &&
       ((G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0) ||
        (FUN_005b89e4(s16(G.DAT_006560f0, param_1 * 0x20),
                      s16(G.DAT_006560f2, param_1 * 0x20)) === 0))) {
      G.DAT_006560ff[param_1 * 0x20] = 0xff;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004274a6 — update_visibility_and_diplomacy_on_move (large fn)
// Handles vision updates, ZOC, diplomacy triggers when a unit moves.
// ═══════════════════════════════════════════════════════════════════
export function FUN_004274a6(param_1, param_2) {
  let bVar6 = false;
  let iVar8 = s16(G.DAT_006560f0, param_1 * 0x20);
  let iVar9 = s16(G.DAT_006560f2, param_1 * 0x20);
  let bVar1 = G.DAT_006560f7[param_1 * 0x20];
  let uVar10 = s8(bVar1);
  let uVar11 = G.DAT_0064b1bc[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 1;
  let uVar12 = G.DAT_0064b1bc[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 8;
  let cVar2 = G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14];
  let iVar13 = FUN_005b89e4(iVar8, iVar9);
  let uVar23 = (1 << (bVar1 & 0x1f)) & 0xff;
  let local_30 = 0;
  let bVar24 = G.DAT_006d1da0 === uVar10;

  if (uVar10 === 0) {
    let iVar14 = FUN_005b8931(iVar8, iVar9);
    // ORs visibility byte
  }

  let cVar7 = G.DAT_00655b07;
  let bVar5;
  if ((G.DAT_00655b07 === 0) && (((G.DAT_00655af0 & 0x80) === 0 || ((G.DAT_0064bc60 & 8) === 0)))) {
    bVar5 = false;
  } else {
    bVar5 = true;
  }

  FUN_005b9ec6();

  // Near-tile visibility loop (25 tiles)
  for (let local_10 = 0; local_10 < 0x19; local_10 = local_10 + 1) {
    let uVar15 = FUN_005ae052(s8(G.DAT_00628370[local_10]) + iVar8);
    let iVar14 = s8(G.DAT_006283a0[local_10]) + iVar9;
    let iVar16 = FUN_004087c0(uVar15, iVar14);
    if ((iVar16 !== 0) &&
       (((local_10 < 8 || (local_10 === 0x14)) ||
        ((uVar11 !== 0 &&
         ((cVar2 === 1 ||
          (FUN_005b89e4(uVar15, iVar14) === (cVar2 === 2 ? 1 : 0))))))))) {
      iVar16 = FUN_005b8931(uVar15, iVar14);
      if (uVar10 !== 0) {
        FUN_005b9d81(uVar15, iVar14, 0, uVar10, 0, 1);
      }
      FUN_005b976d(uVar15, iVar14, uVar23, 1, 1);
    }
  }

  // Adjacent tile diplomacy/combat loop (8 neighbors)
  for (let local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
    let uVar15 = FUN_005ae052(s8(G.DAT_00628350[local_10]) + iVar8);
    let iVar14 = s8(G.DAT_00628360[local_10]) + iVar9;
    let iVar16 = FUN_004087c0(uVar15, iVar14);
    if (iVar16 !== 0) {
      iVar16 = FUN_0043cf76(uVar15, iVar14);
      if ((-1 < iVar16) && (s8(G.DAT_0064f348[iVar16 * 0x58]) !== uVar10)) {
        let uVar17 = s8(G.DAT_0064f348[iVar16 * 0x58]);
        FUN_0043cc00(iVar16, uVar10);
        if (uVar12 === 0) {
          FUN_005b496e(param_1, uVar17);
        }
        if ((cVar2 === 0) && ((G.DAT_0064c6c0[uVar10 * 4 + uVar17 * 0x594] & 4) === 0)) {
          FUN_0049301b(uVar17, uVar15, iVar14, 0, 4);
          FUN_0049301b(uVar17, uVar15, iVar14, 1, 2);
        }
      }
      let iVar19 = FUN_005b89e4(uVar15, iVar14);
      if ((uVar12 === 0) || (iVar19 !== 0)) {
        let iVar20 = FUN_005b2e69(uVar15, iVar14);
        if (iVar20 < 0) {
          iVar16 = FUN_005b89e4(iVar8, iVar9);
          if (((iVar16 === 0) && (FUN_005b8ca6(uVar15, iVar14) >= 0))) {
            let uVar17b = FUN_005b8ca6(uVar15, iVar14);
            if (uVar17b !== uVar10 && ((G.DAT_0064c6c0[uVar17b * 4 + uVar10 * 0x594] & 1) === 0)) {
              if (!bVar6) {
                FUN_0047cea6(iVar8, iVar9);
                if (2 < G.DAT_00655b02) {
                  FUN_004b0b53(0xff, 2, 0, 0, 0);
                  FUN_0046b14d(0x72, 0xff, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
                }
                bVar6 = true;
              }
              if (param_2 !== 0) {
                FUN_0055d8d8(uVar10, uVar17b, uVar15, iVar14);
              }
            }
          }
        } else {
          let bVar3 = G.DAT_006560f7[iVar20 * 0x20];
          let uVar17 = s8(bVar3);
          if (uVar17 !== uVar10) {
            let uVar22 = u8(G.DAT_006560f6[iVar20 * 0x20]);
            if ((uVar12 === 0) || ((G.DAT_0064b1bd[uVar22 * 0x14] & 0x40) !== 0)) {
              let iVar21 = FUN_005b8ca6(iVar8, iVar9);
              if (iVar21 < 0) {
                FUN_005b496e(param_1, uVar17);
              }
              if ((G.DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 8) === 0) {
                FUN_004273e6(iVar20);
              }
              if (((1 << (bVar3 & 0x1f)) & G.DAT_00655b0b) === 0) {
                if ((iVar19 !== 0) || (iVar13 === 0)) {
                  FUN_0042738c(iVar20);
                }
              } else if (iVar19 === iVar13) {
                FUN_0042738c(iVar20);
              }
            }
            if (((G.DAT_0064b1bc[uVar22 * 0x14] & 8) === 0) ||
               (FUN_005b50ad(iVar20, 2) > 1) ||
               ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x40) !== 0)) {
              if (iVar16 < 0) {
                if ((bVar24) && (cVar7 === 0) &&
                   ((uVar23 & u8(G.DAT_006560f9[iVar20 * 0x20])) === 0)) {
                  local_30 = local_30 | 1;
                }
                FUN_005b496e(iVar20, uVar10);
              }
              if (((1 << (bVar1 & 0x1f)) & G.DAT_00655b0b) === 0) {
                if (((iVar13 !== 0) || (iVar19 === 0)) || (cVar2 === 1)) {
                  FUN_0042738c(param_1);
                }
              } else if ((iVar19 === iVar13) || (cVar2 === 1)) {
                FUN_0042738c(param_1);
              }
              if (((iVar19 !== 0) && (uVar17 !== 0)) &&
                 ((G.DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 4) === 0)) {
                FUN_0049301b(uVar10, uVar15, iVar14, 2,
                             3 - ((G.DAT_0064b1bc[uVar22 * 0x14] & 8) === 0 ? 1 : 0));
              }
            }
            if (((G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0) &&
                (iVar13 === 0)) &&
               ((iVar19 === 0 && ((G.DAT_0064b1c1[uVar22 * 0x14] !== 1 || (-1 < iVar16)))))) {
              if ((!bVar6) && (cVar7 === 0)) {
                FUN_0047cea6(iVar8, iVar9);
                if (2 < G.DAT_00655b02) {
                  FUN_004b0b53(0xff, 2, 0, 0, 0);
                  FUN_0046b14d(0x72, 0xff, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
                }
                bVar6 = true;
              }
              if ((param_2 !== 0) && (G.DAT_006560f6[param_1 * 0x20] !== 0x09)) {
                FUN_0055d8d8(uVar10, uVar17, uVar15, iVar14);
              }
              if (s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) < 6) {
                FUN_0049301b(uVar17, uVar15, iVar14, 1, 2 - (uVar10 === 0 ? 1 : 0));
              }
              if ((G.DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 4) === 0) {
                let local_8 = 1;
                if (((uVar17 !== 0) && (G.DAT_0064b1ca[uVar22 * 0x14] !== 6)) &&
                   ((G.DAT_006560ff[iVar20 * 0x20] !== 0x02 ||
                    (G.DAT_0064b1ca[uVar22 * 0x14] !== 0x01)))) {
                  local_8 = 3;
                }
                FUN_0049301b(uVar10, uVar15, iVar14, 0, local_8);
              }
            }
          }
        }
      }
    }
  }

  // Extended range visibility loop (tiles 8-24)
  for (let local_10 = 8; local_10 < 0x19; local_10 = local_10 + 1) {
    if (local_10 !== 0x14) {
      let uVar15 = FUN_005ae052(s8(G.DAT_00628370[local_10]) + iVar8);
      let iVar13b = s8(G.DAT_006283a0[local_10]) + iVar9;
      let iVar14 = FUN_004087c0(uVar15, iVar13b);
      if (iVar14 !== 0) {
        let iVar14b = FUN_005b2e69(uVar15, iVar13b);
        let uVar17 = FUN_005b8da4(uVar15, iVar13b);
        let iVar16 = FUN_0043cf76(uVar15, iVar13b);
        if (uVar17 !== uVar10) {
          if ((uVar11 !== 0) &&
             ((cVar2 === 1 ||
              (FUN_005b89e4(uVar15, iVar13b) === (cVar2 === 2 ? 1 : 0))))) {
            if (-1 < iVar16) {
              if ((bVar24) && (!bVar5)) {
                if ((uVar23 & s8(G.DAT_0064f34c[iVar16 * 0x58])) === 0) {
                  local_30 = local_30 | 10;
                } else if (G.DAT_0064f34d[iVar16 * 0x58 + uVar10] !== G.DAT_0064f349[iVar16 * 0x58]) {
                  local_30 = local_30 | 2;
                }
              }
              FUN_0043cc00(iVar16, uVar10);
            }
            if ((-1 < iVar14b) &&
               ((G.DAT_0064b1bc[u8(G.DAT_006560f6[iVar14b * 0x20]) * 0x14] & 8) === 0)) {
              if (iVar16 < 0) {
                if ((bVar24) && (cVar7 === 0) &&
                   ((uVar23 & u8(G.DAT_006560f9[param_1 * 0x20])) === 0)) {
                  local_30 = local_30 | 2;
                }
                FUN_005b496e(iVar14b, uVar10);
              }
              let iVar19 = FUN_005b89e4(uVar15, iVar13b);
              if (((iVar19 !== 0) && (uVar17 !== 0)) &&
                 ((G.DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 4) === 0)) {
                FUN_0049301b(uVar10, uVar15, iVar13b, 2, 2);
              }
            }
          }
          if ((-1 < iVar14b) && (uVar12 === 0)) {
            let uVar22 = u8(G.DAT_006560f6[iVar14b * 0x20]);
            if ((G.DAT_0064b1bc[uVar22 * 0x14] & 1) !== 0 &&
               ((G.DAT_0064b1c1[uVar22 * 0x14] === 1 ||
                (FUN_005b89e4(iVar8, iVar9) === (G.DAT_0064b1c1[uVar22 * 0x14] === 2 ? 1 : 0))))) {
              FUN_0042738c(iVar14b);
              FUN_004273e6(iVar14b);
              let iVar14c = FUN_005b8ca6(iVar8, iVar9);
              if (iVar14c < 0) {
                FUN_005b496e(param_1, uVar17);
              }
              let iVar13c = FUN_005b89e4(uVar15, iVar13b);
              if (((iVar13c === 0) && (uVar17 !== 0)) &&
                 ((G.DAT_0064c6c0[uVar10 * 4 + uVar17 * 0x594] & 4) === 0)) {
                FUN_0049301b(uVar17, iVar8, iVar9, 2, 2);
              }
            }
          }
          if ((-1 < iVar16) && (FUN_005b8b65(iVar8, iVar9, uVar17) !== 0) &&
             ((G.DAT_0064b1c4[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0 &&
              (uVar12 === 0)))) {
            FUN_005b496e(param_1, uVar17);
          }
        }
      }
    }
  }

  // MP visibility notification
  if (G.DAT_00655af8 === 0) {
    FUN_005b9f1c();
  } else {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    if (((1 << (bVar1 & 0x1f)) & G.DAT_00655b0b) === 0 && (G.DAT_006d1da0 !== uVar10)) {
      for (let local_50 = 1; local_50 < 8; local_50 = local_50 + 1) {
        if (((1 << (u8(local_50) & 0x1f)) & G.DAT_00655b0b) !== 0 &&
           ((G.DAT_00655b07 !== 0 ||
             ((1 << (u8(local_50) & 0x1f)) & u8(G.DAT_006560f9[param_1 * 0x20])) !== 0) ||
            (s8(G.DAT_006560f7[param_1 * 0x20]) === (local_50 & 0xff)))) {
          if (G.DAT_006d1da0 === local_50) {
            FUN_0047cf22(iVar8, iVar9);
          } else if (2 < G.DAT_00655b02) {
            FUN_0046b14d(0x75, G.DAT_006ad30c[G.DAT_006ad558[local_50] * 0x54],
                         iVar8, iVar9, 0, 0, 0, 0, 0, 0);
          }
        }
      }
      if ((!bVar6) && (FUN_0047cea6(iVar8, iVar9), 2 < G.DAT_00655b02)) {
        FUN_0046b14d(0x72, 0xff, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
      }
    } else {
      let local_5c = 2;
      if ((uVar11 === 0) || ((local_30 & 2) === 0)) {
        local_5c = 1;
        if ((local_30 & 4) !== 0) {
          local_5c = 2;
        }
      } else if ((local_30 & 8) !== 0) {
        local_5c = 3;
      }
      if ((local_30 === 0) && (local_5c = 0, bVar6)) {
        FUN_005b9f1c();
        return;
      }
      if (G.DAT_006d1da0 === uVar10) {
        FUN_0047ce1e(iVar8, iVar9, local_5c, uVar10, 1);
      } else if (2 < G.DAT_00655b02) {
        FUN_0046b14d(0x76, G.DAT_006ad30c[G.DAT_006ad558[uVar10] * 0x54],
                     iVar8, iVar9, local_5c, uVar10, 0, 0, 0, 0);
      }
    }
    FUN_005b9f1c();
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004289e0 — init_text_system
// ═══════════════════════════════════════════════════════════════════
export function FUN_004289e0() {
  FUN_004289f5();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004289f5 — init_text_system_inner
// ═══════════════════════════════════════════════════════════════════
export function FUN_004289f5() {
  FUN_00428cb0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428a0f — open_text_file
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428a0f(param_1) {
  if (G.DAT_00625e64 === 0) {
    G.DAT_00625e64 = 1;
    FUN_00497ea0(G.DAT_0063e4c0, 2, param_1);
  } else {
    FUN_004980ec(G.DAT_0063e4c0);
    FUN_00497ea0(G.DAT_0063e4c0, 2, param_1);
  }
  G.DAT_00625e60 = 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428a78 — close_text_file
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428a78() {
  FUN_004980ec(G.DAT_0063e4c0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428a95 — add_string_to_pool
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428a95(param_1) {
  let sVar1 = _strlen(param_1);
  let iVar2;
  if (sVar1 === 0) {
    iVar2 = 0;
  } else {
    sVar1 = _strlen(param_1);
    G.DAT_0063e4b8 = FUN_00498159(G.DAT_0063e4c0, sVar1 + 1);
    FUN_005f22d0(G.DAT_0063e4b8, param_1);
    iVar2 = G.DAT_00625e60;
    G.DAT_00625e60 = G.DAT_00625e60 + 1;
  }
  return iVar2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428b0c — get_string_by_index (text pool lookup)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428b0c(param_1) {
  // Traverses null-terminated string pool
  // Returns pointer to nth string in pool
  let local_8 = G.DAT_0063e4c8;
  // Stub — returns empty string
  return "";
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428b68 — add_string_with_padding
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428b68(param_1, param_2) {
  let sVar2 = _strlen(param_1);
  let local_8;
  if (param_2 < sVar2 + 1) {
    local_8 = _strlen(param_1) + 1;
  } else {
    local_8 = param_2;
  }
  G.DAT_0063e4b8 = FUN_00498159(G.DAT_0063e4c0, local_8);
  _memset(G.DAT_0063e4b8, 0, local_8);
  _strncpy(G.DAT_0063e4b8, param_1, local_8);
  sVar2 = _strlen(param_1);
  if (sVar2 === 0) {
    // *G.DAT_0063e4b8 = ' ';
  }
  let iVar1 = G.DAT_00625e60;
  G.DAT_00625e60 = G.DAT_00625e60 + 1;
  return iVar1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428cb0 — init_text_object
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428cb0() {
  // Uses in_ECX — stub
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428d00 — redraw_city_editor (thunk to FUN_004293a8)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428d00() {
  FUN_004293a8();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428d1b — close_city_misc_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428d1b() {
  G.DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(G.DAT_006a4f88 + 0x48);
  FUN_004e4ceb();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428d48 — load_city_graphics
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428d48() {
  let local_8;
  if (G.DAT_006a4f88 === 0) {
    local_8 = 0;
  } else {
    local_8 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(G.DAT_00625e90, s_CITIES_00625e88);
  FUN_0059d3c9(0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428da7 — invalidate_city_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428da7() {
  G.DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(G.DAT_006a4f88 + 0x48);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428dcf — rename_city (city editor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428dcf() {
  // City rename via editor — stubbed (MFC UI)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428e50 — city_misc_editor_menu
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428e50() {
  // City miscellaneous editor — switch on selection — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428fd2 — update_city_editor_selection
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428fd2() {
  // Updates 3 selection values in city editor — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042903e — create_city_editor_buttons
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042903e(param_1) {
  // MFC button creation for city editor — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004293a8 — draw_city_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_004293a8() {
  // City editor rendering — MFC/GDI drawing — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429671 — init_city_editor_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429671() {
  // City editor initialization — MFC window creation — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429e53 — thunk to FUN_005c656b
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429e53() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429e69 — SEH cleanup (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429e69() {
  // SEH frame cleanup — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429e77 — open_city_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429e77() {
  // Opens city editor with error handling — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429ed0 — thunk to FUN_004183d0
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429ed0() {
  FUN_004183d0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429ee6 — SEH cleanup (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429ee6() {
  // SEH frame cleanup — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a380 — init_terrain_system
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a380() {
  FUN_0042a39a();
  FUN_0042a3ba();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a39a — init_terrain_type_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a39a() {
  FUN_0043c4c0(0, 0x18, 1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a3ba — register_terrain_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a3ba() {
  _atexit(FUN_0042a3d7);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a3d7 — cleanup_terrain
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a3d7() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E51_0042a3f1 — static_init_1
// ═══════════════════════════════════════════════════════════════════
export function FID_conflict___E51_0042a3f1() {
  FUN_0042a40b();
  FUN_0042a429();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a40b — init_improvement_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a40b() {
  FUN_0043c460(0, 0x12);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a429 — register_improvement_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a429() {
  _atexit(FUN_0042a446);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a446 — cleanup_improvements
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a446() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a460 — init_wonder_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a460() {
  FUN_0042a47a();
  FUN_0042a49a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a47a — init_wonder_type_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a47a() {
  FUN_0043c4c0(0, 0x10, 1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a49a — register_wonder_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a49a() {
  _atexit(FUN_0042a4b7);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a4b7 — cleanup_wonders
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a4b7() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a4d1 — init_advance_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a4d1() {
  FUN_0042a4eb();
  FUN_0042a50b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a4eb — init_advance_type_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a4eb() {
  FUN_0043c4c0(0, 0xe, 1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a50b — register_advance_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a50b() {
  _atexit(FUN_0042a528);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a528 — cleanup_advances
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a528() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a542 — init_unit_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a542() {
  FUN_0042a55c();
  FUN_0042a57c();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a55c — init_unit_type_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a55c() {
  FUN_0043c4c0(0, 0xc, 1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a57c — register_unit_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a57c() {
  _atexit(FUN_0042a599);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a599 — cleanup_units
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a599() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E51_0042a5b3 — static_init_2
// ═══════════════════════════════════════════════════════════════════
export function FID_conflict___E51_0042a5b3() {
  FUN_0042a5cd();
  FUN_0042a5eb();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a5cd — init_wonder_effect_table
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a5cd() {
  FUN_0043c460(0, 0x10);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a5eb — register_wonder_effect_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a5eb() {
  _atexit(FUN_0042a608);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a608 — cleanup_wonder_effects
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a608() {
  FUN_0043c520();
}

// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31_0042a622 — static_init_3
// ═══════════════════════════════════════════════════════════════════
export function FID_conflict___E31_0042a622() {
  FUN_0042a63c();
  FUN_0042a656();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a63c — init_dao_field_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a63c() {
  FUN_0043c260();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a656 — register_dao_field_1_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a656() {
  _atexit(FUN_0042a673);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a673 — cleanup_dao_field_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a673() {
  CDaoFieldInfo_destructor(0x0063eb10);
}

// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31_0042a68d — static_init_4
// ═══════════════════════════════════════════════════════════════════
export function FID_conflict___E31_0042a68d() {
  FUN_0042a6a7();
  FUN_0042a6c1();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a6a7 — init_dao_field_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a6a7() {
  FUN_0043c260();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a6c1 — register_dao_field_2_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a6c1() {
  _atexit(FUN_0042a6de);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a6de — cleanup_dao_field_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a6de() {
  CDaoFieldInfo_destructor(0x0063e4f8);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a6f8 — init_tiles_dll
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a6f8() {
  FUN_0042a712();
  FUN_0042a731();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a712 — load_tiles_dll
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a712() {
  FUN_0043c3f0(s_TILES_DLL_00625ed4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a731 — register_tiles_dll_cleanup
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a731() {
  _atexit(FUN_0042a74e);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a74e — cleanup_tiles_dll
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a74e() {
  Timevec_destructor(G.DAT_0063e4f0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a768 — close_credits_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a768() {
  // Uses in_ECX — credits window close — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// show_credits — display credits/background image
// ═══════════════════════════════════════════════════════════════════
export function show_credits(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // Win32 window with GIF display — MFC/GDI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ab9b — thunk to FUN_005c656b
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ab9b() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042abb1 — SEH cleanup (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042abb1() {
  // SEH frame cleanup — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042abc1 — draw_credits_background
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042abc1() {
  // MFC/GDI drawing — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ac18 — redraw_credits_full
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ac18() {
  // MFC/GDI drawing — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ac4e — handle_credits_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ac4e() {
  // Credits click handler — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042acb0 — create_advisor_scrollbar
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042acb0() {
  // MFC scrollbar creation — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ad8f — draw_science_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ad8f() {
  // Science advisor window drawing — MFC/GDI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b540 — scroll_science_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b540(param_1) {
  G.DAT_0063ef70 = G.DAT_0063ef74 * param_1;
  FUN_0042ad8f();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b563 — science_advisor_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b563(param_1, param_2) {
  if ((-1 < param_2 - _DAT_0063ef78) &&
     ((param_2 - _DAT_0063ef78) / G.DAT_0063ef80 < G.DAT_0063ef74) &&
     (-1 < param_1 - 2)) {
    let iVar1 = (param_2 - _DAT_0063ef78) / G.DAT_0063ef80;
    let iVar2 = ((param_1 - 2) / G.DAT_0063ef98);
    if (iVar2 < 3) {
      iVar2 = G.DAT_0063ef74 * iVar2 + G.DAT_0063ef70;
      let local_10 = 0;
      for (let local_14 = 0; local_14 < 100; local_14 = local_14 + 1) {
        let iVar3 = FUN_004bd9f0(G.DAT_0063ef6c, local_14);
        if (iVar3 !== 0) {
          if (local_10 === iVar2 + iVar1) {
            FUN_00566584(local_14);
            return;
          }
          local_10 = local_10 + 1;
        }
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b65b — show_unit_advisor_for_civ
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b65b() {
  FUN_004c0cf7(G.DAT_0063ef6c, 1, 0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b67d — open_science_advisor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b67d(param_1) {
  // MFC dialog — stubbed
  show_credits(6, 6, 0, 600, 400, 0, 0);
  G.DAT_0063ef6c = param_1;
  // ... creates buttons and shows dialog
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b824 — show_supply_details
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b824(param_1, param_2) {
  // Supply chain details dialog — MFC — stubbed
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bc22 — thunk to FUN_0059df8a
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bc22() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bc38 — SEH cleanup (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bc38() {
  // SEH frame cleanup — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bc47 — open_supply_search_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bc47(param_1) {
  // Supply search dialog — MFC — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bd6b — thunk to FUN_0059df8a
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bd6b() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bd81 — SEH cleanup (no-op in JS)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bd81() {
  // SEH frame cleanup — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bd8f — draw_trade_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bd8f() {
  // Trade advisor window drawing — MFC/GDI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ccf4 — scroll_trade_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ccf4(param_1) {
  G.DAT_0063ef70 = param_1;
  FUN_0042bd8f();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042cd11 — show_supply_search_for_current_civ
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042cd11() {
  FUN_0042bc47(G.DAT_0063ef6c);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042cd2f — open_trade_advisor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042cd2f(param_1) {
  // MFC dialog — stubbed
  show_credits(5, 5, 0, 600, 400, 0, 0);
  G.DAT_0063ef6c = param_1;
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ced6 — draw_city_status_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ced6() {
  // City status advisor window drawing — MFC/GDI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042d618 — scroll_city_status_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042d618(param_1) {
  G.DAT_0063ef70 = param_1;
  FUN_0042ced6();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042d635 — city_status_advisor_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042d635(param_1, param_2) {
  if ((-1 < param_2 - _DAT_0063ef78) &&
     ((param_2 - _DAT_0063ef78) / G.DAT_0063ef80 < G.DAT_0063ef74)) {
    let iVar1 = (param_2 - _DAT_0063ef78) / G.DAT_0063ef80;
    let local_8 = 0;
    for (let local_c = 0; local_c < G.DAT_00655b18; local_c = local_c + 1) {
      if (((G.DAT_0064f394[local_c * 0x58] !== 0) &&
          (s8(G.DAT_0064f348[local_c * 0x58]) === G.DAT_0063ef6c))) {
        if (local_8 === iVar1 + G.DAT_0063ef70) {
          FUN_00509590(local_c);
          return;
        }
        local_8 = local_8 + 1;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042d71e — open_happiness_advisor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042d71e(param_1) {
  show_credits(1, 1, 0, 600, 400, 0, 0);
  G.DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(G.DAT_0063eb10, 0x4029f5);
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042d781 — draw_citizen_icons
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042d781(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let local_10 = FUN_00548b70(s8(G.DAT_0064f349[param_1 * 0x58]), 0x1c, param_4, 0, 0);
  let local_8 = 0;
  G.DAT_006a6604 = (G.DAT_0064f370[param_1 * 0x58] >>> 0) >>> 0x1a;

  for (let local_c = 0; local_c < param_5; local_c = local_c + 1) {
    FUN_00448f92(s8(G.DAT_0064f348[param_1 * 0x58]), 0, G.DAT_0063eb10, param_2, param_3);
    FUN_005cef31(0, G.DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
    local_8 = local_8 + 1;
  }

  for (let local_c = 0;
      local_c < (s8(G.DAT_0064f349[param_1 * 0x58]) - (param_6 + G.DAT_006a6604 + param_5));
      local_c = local_c + 1) {
    FUN_00448f92(s8(G.DAT_0064f348[param_1 * 0x58]), 0, G.DAT_0063eb10, param_2, param_3);
    FUN_005cef31(0, G.DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
    local_8 = local_8 + 1;
  }

  for (let local_c = 0; local_c < param_6; local_c = local_c + 1) {
    let local_14 = (local_c < param_6 - param_7) ? 4 : 6;
    FUN_00448f92(s8(G.DAT_0064f348[param_1 * 0x58]), 0, G.DAT_0063eb10, param_2, param_3);
    FUN_005cef31(0, G.DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
    local_8 = local_8 + 1;
  }

  for (let local_c = 0; local_c < G.DAT_006a6604; local_c = local_c + 1) {
    FUN_00448f92(s8(G.DAT_0064f348[param_1 * 0x58]), 0, G.DAT_0063eb10, param_2, param_3);
    FUN_004e75a6(param_1, local_c);
    FUN_005cef31(0, G.DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
  }
  return local_10;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042da1d — draw_happiness_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042da1d() {
  // Happiness advisor window drawing — MFC/GDI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e07f — scroll_happiness_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e07f(param_1) {
  G.DAT_0063ef70 = param_1;
  FUN_0042da1d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e09c — happiness_advisor_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e09c(param_1, param_2) {
  if ((-1 < param_2 - _DAT_0063ef78) &&
     ((param_2 - _DAT_0063ef78) / G.DAT_0063ef80 < G.DAT_0063ef74)) {
    let iVar1 = (param_2 - _DAT_0063ef78) / G.DAT_0063ef80;
    let local_8 = 0;
    for (let local_c = 0; local_c < G.DAT_00655b18; local_c = local_c + 1) {
      if (((G.DAT_0064f394[local_c * 0x58] !== 0) &&
          (s8(G.DAT_0064f348[local_c * 0x58]) === G.DAT_0063ef6c))) {
        if (local_8 === iVar1 + G.DAT_0063ef70) {
          FUN_00509590(local_c);
          return;
        }
        local_8 = local_8 + 1;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e185 — open_attitude_advisor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e185(param_1) {
  show_credits(4, 4, 0, 600, 400, 0, 0);
  G.DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(G.DAT_0063eb10, 0x402838);
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e1e8 — append_unit_flag_string
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e1e8(param_1) {
  if (G.DAT_0063e4f4 !== 0) {
    FUN_00421d30();
  }
  G.DAT_0063e4f4 = 1;
  FUN_0040bc10(param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e220 — draw_military_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e220() {
  // Military advisor window drawing — MFC/GDI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042efe3 — scroll_military_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042efe3(param_1) {
  G.DAT_0063ef70 = param_1;
  FUN_0042e220();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042f000 — toggle_military_advisor_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042f000() {
  G.DAT_0063efac = (G.DAT_0063efac === 0) ? 1 : 0;
  if (G.DAT_0063efac === 0) {
    FUN_0043c5f0();
    FUN_0040f380();
  } else {
    FUN_0043c5f0();
    FUN_0040f380();
  }
  FUN_0042e220();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042f079 — open_military_advisor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042f079(param_1) {
  show_credits(2, 2, 0, 600, 400, 0, 0);
  G.DAT_0063ef6c = param_1;
  G.DAT_0063efac = 0;
  // ... creates buttons and shows dialog — stubbed
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042f293 — draw_foreign_minister_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042f293() {
  // Foreign minister advisor window drawing — MFC/GDI — stubbed
}
