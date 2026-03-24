// ═══════════════════════════════════════════════════════════════════
// block_00420000.js — Mechanical transpilation of block_00420000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00420000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00420000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8, s16, u16, s32, tileRead } from './mem.js';

// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_00679640 = 0;
let DAT_006359d4 = 0;
let DAT_0063cc48 = new Uint8Array(0x1040); // string table entries
let DAT_0063cc30 = new Int32Array(16);     // number table entries
let DAT_006ad8b8 = 0;
let DAT_006ad2f8 = 0;
let DAT_006ad228 = 0;
let DAT_006c31d4 = 0;
let DAT_006c3164 = 0;
let DAT_006ad2f6 = 0;
let DAT_006d1160 = 0;
let DAT_006d1162 = 0;
let DAT_006ad57c = 0;
let DAT_00635a34 = 0;
let DAT_00635a38 = 0;
let DAT_00635a3c = 0;
let _DAT_006ad674 = 0;
let DAT_006c8ff4 = 0;
let DAT_006c900c = 0;
let DAT_006c9024 = 0;
let DAT_006c9004 = 0;
let DAT_006c9010 = 0;
let DAT_006c9038 = 0;
let DAT_006c902c = 0;
let DAT_006c8ff0 = 0;
let DAT_006ad300 = 0;
let DAT_006ad6ac = 0;
let DAT_006ad678 = new Array(256).fill(0);
let DAT_006ad108 = null;
let _DAT_006cec80 = 0;
let PTR_DAT_00635a48 = null;
let PTR_s_5_4_0f_Multiplayer_26_March_99_0062765c = "";
let DAT_0064c6a0 = new Uint8Array(0x3000);
let DAT_0064c6a6 = new Uint8Array(0x3000);
let DAT_006554fc = new Uint8Array(0x600);
let DAT_0064ca92 = new Uint8Array(0x3000);
let DAT_0064bd12 = new Uint8Array(0x800);
let DAT_00654fe0 = new Int32Array(64);
let DAT_0065550c = new Uint8Array(0x600);
let DAT_00655502 = new Uint8Array(0x600);
let DAT_00655504 = new Uint8Array(0x600);
let DAT_00655506 = new Uint8Array(0x600);
let DAT_0062b420 = 0;
let DAT_00655afe = 0;
let DAT_00655b16 = 0;
let DAT_0065610a = new Uint8Array(0x400);
let DAT_006560f7 = new Uint8Array(0x2000);
let DAT_006560f6 = new Uint8Array(0x2000);
let DAT_00655af0 = 0;
let DAT_00655af2 = 0;
let DAT_0064bc1e = 0;
let DAT_0064bc22 = 0;
let DAT_0064bcb8 = 0;
let DAT_0064bcba = 0;
let DAT_00655aea = 0;
let DAT_006d1da0 = 0;
let DAT_00654fa6 = 0;
let DAT_00654fa4 = 0;
let DAT_006ad640 = 0;
let DAT_0064bb08 = "";
let DAT_00655020 = "";
let DAT_0064bc60 = 0;
let DAT_006ad5fc = "";
let DAT_006ad59c = "";
let DAT_006ad5dc = "";
let DAT_00654c74 = 0;
let DAT_0064bc62 = "";
let DAT_00655af8 = 0;
let DAT_00655b08 = 0;
let DAT_00655b09 = 0;
let DAT_00654c7c = 0;
let DAT_00654fac = 0;
let DAT_00654fae = 0;
let DAT_00654b70 = 0;
let DAT_00655b0a = 0;
let DAT_00655b02 = 0;
let DAT_006c31a9 = 0;
let DAT_006ad308 = 0;
let DAT_006d1da8 = 0;
let DAT_00628420 = new Uint8Array(0x800); // base pointer for string table offsets
let DAT_006a1d7c = 0;
let DAT_006a4f88 = 0;
let DAT_006a4f88_buf = new Uint8Array(0x300); // backing buffer for struct writes
let DAT_006365c0 = [null, null, null, null, null, null, null, null]; // vis layer pointers
let DAT_006a4f90 = 0;
let DAT_006a1d80 = 0;
let DAT_0062e018 = 0;
let DAT_0062e01c = 0;
let DAT_0063359c = 0;
let DAT_006ab19c = 0;
let DAT_006ab198 = 0;
let DAT_0063eaa0 = 0;
let DAT_0063ec38 = 0;
let DAT_0063ec34 = 0;
let DAT_0063ec3c = 0;
let DAT_0063ef6c = 0;
let DAT_0064c6b5 = new Uint8Array(0x3000);
let DAT_0064c6a8 = new Uint8Array(0x3000);
let DAT_0064c6aa = new Uint8Array(0x3000);
let DAT_0064f394 = new Uint8Array(0x4000);
let DAT_0064f348 = new Uint8Array(0x4000);
let DAT_0064f38a = new Uint8Array(0x4000);
let DAT_0064f38c = new Uint8Array(0x4000);
let DAT_0064f360 = new Uint8Array(0x4000);
let DAT_0064f349 = new Uint8Array(0x4000);
let DAT_0064f34d = new Uint8Array(0x4000);
let DAT_0064f34c = new Uint8Array(0x4000);
let DAT_0064f344 = new Uint8Array(0x4000);
let DAT_00655b18 = 0;
let DAT_00627684 = new Uint8Array(0x1000);
let DAT_0063edd4 = 0;
let DAT_006488d8 = 0;
let DAT_0063edcc = 0;
let DAT_0063efa8 = 0;
let DAT_0063efa4 = 0;
let DAT_0063ef70 = 0;
let DAT_0063ef74 = 0;
let DAT_0063ef80 = 0;
let _DAT_0063ef78 = 0;
let _DAT_0063ef7c = 0;
let _DAT_0063ef90 = 0;
let DAT_0063ef94 = 0;
let DAT_0063ef98 = 0;
let DAT_0063ef8c = 0;
let _DAT_0063ef68 = 0;
let DAT_00655afa = 0;
let DAT_00655b1e = new Uint8Array(256);
let DAT_0064b168 = new Uint8Array(0x100);
let DAT_006560f0 = new Uint8Array(0x2000);
let DAT_006560f2 = new Uint8Array(0x2000);
let DAT_006560f9 = new Uint8Array(0x2000);
let DAT_006560ff = new Uint8Array(0x2000);
let DAT_0064b1bc = new Uint8Array(0x400);
let DAT_0064b1bd = new Uint8Array(0x400);
let DAT_0064b1c1 = new Uint8Array(0x400);
let DAT_0064b1c4 = new Uint8Array(0x400);
let DAT_0064b1c5 = new Uint8Array(0x400);
let DAT_0064b1c2 = new Uint8Array(0x400);
let DAT_0064b1c6 = new Uint8Array(0x400);
let DAT_0064b1c7 = new Uint8Array(0x400);
let DAT_0064b1c8 = new Uint8Array(0x400);
let DAT_0064b1c9 = new Uint8Array(0x400);
let DAT_0064b1ca = new Uint8Array(0x400);
let DAT_0064b1b8 = new Uint8Array(0x400);
let DAT_0064c6c0 = new Uint8Array(0x3000);
let DAT_0064c6c1 = new Uint8Array(0x3000);
let DAT_0064c488 = new Uint8Array(0x400);
let DAT_0064c48c = new Uint8Array(0x400);
let DAT_0064c600 = new Uint8Array(0x3000);
let DAT_0064c706 = new Uint8Array(0x3000);
let DAT_0064c778 = new Uint8Array(0x3000);
let DAT_0064c7b6 = new Uint8Array(0x3000);
let DAT_0064c7f4 = new Uint8Array(0x3000);
let DAT_0064c6a2 = new Uint8Array(0x3000);
let DAT_006554f8 = new Uint8Array(0x600);
let DAT_006554f9 = new Uint8Array(0x600);
let DAT_006554fa = new Uint8Array(0x600);
let DAT_0064f35c = new Uint8Array(0x4000);
let DAT_0064f370 = new Uint8Array(0x4000);
let DAT_0064f379 = new Uint8Array(0x4000);
let DAT_0064f37b = new Uint8Array(0x4000);
let DAT_0064f37e = new Uint8Array(0x4000);
let DAT_0064f38e = new Uint8Array(0x4000);
let DAT_0064f390 = new Uint8Array(0x4000);
let DAT_0064f391 = new Uint8Array(0x4000);
let DAT_0064f392 = new Uint8Array(0x4000);
let DAT_0064f393 = new Uint8Array(0x4000);
let DAT_006ad558 = new Int32Array(16);
let DAT_006ad30c = new Uint8Array(0x400);
let DAT_0064bcc8 = 0;
let DAT_0064bccc = 0;
let DAT_0064b114 = 0;
let DAT_0064b9a0 = new Uint8Array(0x40);
let DAT_0064b9c0 = new Uint8Array(0x40);
let DAT_00655b0b = 0;
let DAT_00655b07 = 0;
let DAT_00655aee = 0;
let DAT_006a6604 = 0;
let DAT_0063e4c0 = 0;
let DAT_0063e4b8 = null;
let DAT_00625e60 = 0;
let DAT_00625e64 = 0;
let DAT_0063e4c8 = "";
let DAT_0063e4f4 = 0;
let DAT_0063efac = 0;
let DAT_0063fe50 = new Uint8Array(0x2000);
let DAT_0063eb10 = new Uint8Array(0x200);
let DAT_0063eb58 = 0;
let DAT_0063eac0 = 0;
let DAT_0063eab8 = 0;
let DAT_0063e4f0 = 0;
let DAT_0063e4f8 = 0;
let PTR_DAT_006359f0 = 0;
let DAT_00628370 = new Uint8Array(0x40);
let DAT_006283a0 = new Uint8Array(0x40);
let DAT_00628350 = new Uint8Array(0x10);
let DAT_00628360 = new Uint8Array(0x10);

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
let DAT_00625e70 = new Int32Array(8);
let DAT_00625e74 = new Int32Array(8);
let DAT_00625e78 = 0;
let DAT_00625e7c = 0;
let DAT_00625e80 = 0;
let DAT_00625e84 = 0;
let DAT_00625e90 = 0;
let DAT_00625d6c = ""; // separator string for restarts/bloodlust
let DAT_00625d70 = ""; // separator string for timer ":"
let DAT_0063fc58 = 0; // dialog layout data

// ═══════════════════════════════════════════════════════════════════
// STUB: External functions referenced from other blocks.
// These are no-ops unless hooked up to actual implementations.
// ═══════════════════════════════════════════════════════════════════

function FUN_005d7c6e() {}
function FUN_005c656b() {}
function FUN_005d83d6(p1) {}
function FUN_005d8476() {}
function FUN_005d8721() {}
function invalidate_ABC7(p1) {}
function FUN_005f22d0(...args) {}
function FUN_005f22e0(...args) {}
function FUN_005f35f0() {}
function FUN_005c64da() {}
function FUN_005d2279() {}
function FUN_005d1f50(p1, p2, p3) { return 0; }
function FUN_005d2004(p1) {}
function FUN_005bf071(...args) { return 0; }
function FUN_005bf5e1(...args) {}
function FUN_005d268e(p1) {}
function FUN_005d25a8(p1) {}
function FUN_005d2550(p1) {}
function FUN_005d2568(p1, p2, p3) {}
function FUN_005d2590(p1) {}
function FUN_005bd630() { return 0; }
function FUN_005bb574() {}
function FUN_005bb9c0() {}
function FUN_005c61b0() {}
function FUN_005c62ee() { return 0; }
function FUN_005c5aeb() {}
function FUN_005d8236(p1) {}
function FUN_005db0d0(p1) {}
function FUN_005cef66(...args) {}
function FUN_005cef31(...args) {}
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
function FUN_0059df8a() {}
function FUN_0059db08(...args) { return 0; }
function FUN_0059db65() {}
function FUN_0059c276() {}
function FUN_0059baf0() {}
function FUN_0059dfb9(a, b, c, d) {}
function FUN_0059e6ff() {}
function FUN_0059e6a9() {}
function FUN_0059e585() {}
function FUN_0059e5c9() {}
function FUN_0059ea99() {}
function FUN_005a577e() {}
function FUN_0059fd2a() {}
function FUN_0059e18b(a, b, c, d, e) { return [0]; }
function FUN_0059e0eb(a, b) {}
function FUN_0059fb78(p1) { return 0; }
function FUN_0059fc19(p1) { return 0; }
function FUN_0059ec88() {}
function FUN_0059edf0(...args) {}
function FUN_0059d3c9(p1) {}
function FUN_005a632a() {}
function FUN_005a5f34() { return 0; }
function FUN_005a9afe(...args) {}
function FUN_005a9abf(...args) {}
function FUN_004087c0(p1, p2) { return 0; }
function FUN_005ae052(p1) { return 0; }
function FUN_0040ffe0(a, b, c, d) { return 0; }
function FUN_0040ff60() {}
function FUN_0040ff00(p1) {}
function FUN_0040ff30(p1) {}
function FUN_0040ffa0(a, b) {}
function FUN_0040fea0() {}
function FUN_0040fed0() {}
function FUN_0040fe10() {}
function FUN_0040fe40() {}
function FUN_0040fcf0(p1) {}
function FUN_0040fd40(a, b) {}
function FUN_0040fd80(p1) {}
function FUN_0040fc50(a, b, c, d) {}
function FUN_0040fdb0(a, b, c) {}
function FUN_0040f010(p1) {}
function FUN_0040f680(a, b, c, d) {}
function FUN_0040f880(p1) {}
function FUN_0040f7d0() {}
function FUN_0040f840() {}
function FUN_0040f350(p1) {}
function FUN_0040f380() {}
function FUN_0040ef70() { return 0; }
function FUN_0040ef50() {}
function FUN_0040efd0(p1) { return 0; }
function FUN_0040bbb0() {}
function FUN_0040bbe0(p1) {}
function FUN_0040bc10(p1) {}
function FUN_0040bc40() {}
function FUN_0040bbb0_2() {}
function FUN_0040bc80(...args) { return 0; }
function FUN_0047e94e(a, b) {}
function FUN_0047cea6(a, b) {}
function FUN_0047ce1e(a, b, c, d, e) {}
function FUN_0047cf22(a, b) {}
function FUN_0046b14d(...args) {}
function FUN_0046e020(a, b) {}
function FUN_0046e6a9() {}
function FUN_0051d564(a, b, c, d, e) { return 0; }
function FUN_0051d63b(a, b, c, d, e) {}
function FUN_0051f19c() { return 0; }
function FUN_004aef96(p1) {}
function FUN_004aef20(...args) {}
function FUN_004af14b(a, b) {}
function FUN_004aef36(p1) {}
function FUN_004af01a(p1) {}
function FUN_004af03b(p1) {}
function FUN_004af1d5(a, b) {}
function FUN_004af122(a, b) {}
function FUN_005dae6b() {}
function FUN_00410030() {}
function FUN_00410070(p1) { return ""; }
function FUN_005534bc(...args) {}
function FUN_00552112() {}
function FUN_00552ed2() {}
function FUN_00553379() {}
function FUN_005a1c52(p1) { return 0; }
function FUN_0059e356() { return 0; }
function FUN_004729ab() {}
function FUN_004b21d7() {}
function FUN_004b0b53(a, b, c, d, e) {}
function FUN_00419100(a, b, c) { return 0; }
function FUN_004190d0(a, b) {}
function FUN_00419b80() {}
function FUN_00419ba0() {}
function FUN_00419be0() {}
function FUN_00419c8b() {}
function FUN_0041e864() {}
function FUN_00415133() { return 0; }
function FUN_00414d70(p1) {}
function FUN_004086c0(...args) {}
function FUN_00408680(...args) {}
function FUN_00408460() {}
function FUN_00408330(p1) {}
function FUN_00408130(p1) {}
function FUN_004085f0() {}
function FUN_004083f0() {}
function FUN_00407ff0() {}
function FUN_00407fc0(p1) { return 0; }
function FUN_00407f90(a, b) { return 0; }
function FUN_00417ef0(a, b) {}
function FUN_00417f70() { return 0; }
function FUN_00417fa0() {}
function FUN_004183d0() {}
function FUN_00418bf0(a, b, c) {}
function FUN_00418c70(p1) {}
function FUN_00418ce0(p1) {}
function FUN_00418dd0(p1) {}
function FUN_00418d60() { return 0; }
function FUN_00418d90(p1) {}
function FUN_00484d52() {}
function FUN_00484fec(p1) { return 0; }
function FUN_00485208(a, b) {}
function FUN_004980ec(p1) {}
function FUN_00497ea0(a, b, c) {}
function FUN_00498159(a, b) { return null; }
function FUN_004a2020() {}
function FUN_0049882b() {}
function FUN_0049301b(a, b, c, d, e) {}
function FUN_00493c7d(p1) { return ""; }
function FUN_00493ba6(p1) { return ""; }
function FUN_00493b10(p1) { return ""; }
function FUN_004bd9f0(a, b) { return 0; }
function FUN_004c2788(...args) { return 0; }
function FUN_004c0cf7(a, b, c) {}
function FUN_004ccb6a(...args) {}
function FUN_004e4ceb() {}
function FUN_004e75a6(a, b) {}
function FUN_004eb4ed(a, b) {}
function FUN_004f00f0(a, b) { return 0; }
function FUN_00445e46() { return 0; }
function FUN_00448f92(...args) {}
function FUN_00453e51(a, b) { return 0; }
function FUN_00472d20(a, b) { return 0; }
function FUN_004679ab(p1) { return 0; }
function FUN_0043cf76(a, b) { return -1; }
function FUN_0043cc00(a, b) {}
function FUN_0043d20a(a, b) { return 0; }
function FUN_0043c4c0(a, b, c) {}
function FUN_0043c460(a, b) {}
function FUN_0043c520() {}
function FUN_0043c260() {}
function FUN_0043c3f0(p1) {}
function FUN_0043c5c0() { return 0; }
function FUN_0043c5f0() {}
function FUN_0043c790(a, b, c) {}
function FUN_0043c7c0(a, b, c) {}
function FUN_0043c870(p1) {}
function FUN_0043c8a0(p1) {}
function FUN_0043c8d0(...args) { return 0; }
function FUN_0043c910(...args) {}
function FUN_0043ca80(p1) {}
function FUN_0043cab0(p1) { return 0; }
function FUN_0043cb30(...args) { return 0; }
function FUN_00509590(p1) {}
function FUN_00548b70(...args) { return 0; }
function FUN_00548c78(...args) {}
function FUN_00566584(p1) {}
function FUN_00573e59(a, b) {}
function FUN_0055d8d8(a, b, c, d) {}
function FUN_0056d289(...args) {}
function FUN_0056baff(...args) {}
function FUN_00456e46(...args) {}
function FUN_0045705e(a, b) {}
function FUN_005adfa0(...args) { return 0; }
function FUN_005b89e4(a, b) { return 0; }
function FUN_005b8931(a, b) { return 0; }
function FUN_005b898b(a, b, c) { return 0; }
function FUN_005b8ca6(a, b) { return -1; }
function FUN_005b8da4(a, b) { return 0; }
function FUN_005b8b65(a, b, c) { return 0; }
function FUN_005b976d(a, b, c, d, e) {}
function FUN_005b8b1a(a, b, c) {}
function FUN_005b9ec6() {}
function FUN_005b9f1c() {}
function FUN_005b9d81(a, b, c, d, e, f) {}
function FUN_005b496e(a, b) {}
function FUN_005b50ad(a, b) { return 0; }
function FUN_005b2e69(a, b) { return -1; }
function FUN_005b2d39(p1) { return -1; }
function FUN_005b2c82(p1) { return -1; }
function FUN_005baeb0(p1) {}
function FUN_005baec8(p1) {}
function FUN_005baee0(a, b, c, d) {}
function FUN_005bb024(...args) {}
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
// Source: decompiled/block_00420000.c FUN_0042021d (14 bytes)
export function FUN_0042021d() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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
  FUN_005bb9c0();
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
  // DEVIATION: Win32 API — uses in_ECX as this pointer for MFC list control
  // C: if ((param_1 < *(int *)(in_ECX + 0x38)) && (-1 < param_1)) {
  //     *(int *)(*(int *)(in_ECX + 0x48) + 0x18 + param_1 * 0xa4) = 1;
  //     invalidate_ABC7(*(int *)(*(int *)(in_ECX + 0x48) + param_1 * 0xa4));
  //   }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421d30 — append_newline_to_buffer (thunk to FUN_004aef96)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421d30() {
  FUN_004aef96(DAT_00679640);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421d60 — set_string_table_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421d60(param_1, param_2) {
  // C: FUN_005f22d0(&DAT_0063cc48 + param_1 * 0x104, param_2);
  FUN_005f22d0(DAT_0063cc48 + param_1 * 0x104, param_2);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421da0 — set_number_table_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421da0(param_1, param_2) {
  // C: *(undefined4 *)(&DAT_0063cc30 + param_1 * 4) = param_2;
  DAT_0063cc30[param_1] = param_2;
}

// DAT_006ad7b2 referenced by FUN_00421fcd
let DAT_006ad7b2 = "";

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
  DAT_00635a34 = param_1;
  DAT_00635a38 = param_2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421e70 — add_dialog_string
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421e70(param_1, param_2) {
  FUN_00419100(DAT_006359d4, param_1, param_2);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421ea0 — set_dialog_string
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421ea0(param_1) {
  FUN_004190d0(DAT_006359d4, param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421ed0 — show_dialog_4param
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421ed0(param_1, param_2, param_3, param_4) {
  FUN_0051d63b(DAT_006359d4, param_1, param_2, param_3, param_4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421f10 — set_year_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421f10(param_1) {
  FUN_00485208(DAT_00679640, param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421f40 — get_byte_at_offset_0x1ef (this pointer)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421f40() {
  // DEVIATION: Win32 API — uses in_ECX as this pointer
  // C: return *(undefined1 *)(in_ECX + 0x1ef);
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00421f70 — init_connection_object
// ═══════════════════════════════════════════════════════════════════
export function FUN_00421f70() {
  // DEVIATION: Win32 API — uses in_ECX as this pointer
  // C: *(undefined4 *)(in_ECX + 4) = 1;
  //    *(undefined4 *)(in_ECX + 0x14c) = 0;
  //    *(undefined4 *)(in_ECX + 0x174) = 0;
  //    return in_ECX;
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
  // DEVIATION: Win32 API — Entire function is multiplayer connection setup
  // using Win32/MFC/DirectPlay. 8475 bytes of MP lobby code including:
  // - XD_OpenConnection, XD_FlushSendBuffer, XD_CloseConnection, XD_LobbySendMessage
  // - CSocket::Create, FUN_00426fb0 modal dialogs
  // - Game profile dialog (FUN_004259a6)
  // - Title screen loading, save file loading
  // Game-state writes preserved as comments:
  // DAT_006ad2f6 = 1/0 (connection flag)
  // DAT_006d1160, DAT_006d1162 (map dimensions from server)
  // DAT_006ad57c = 0 (connection param)
  // DAT_00655aea = DAT_0064bc1e & 0xffff7fff
  // DAT_00655af2 = DAT_0064bc22
  // DAT_006c9038 = 0
  // _DAT_006cec80 = FUN_00421bb0()
  // _DAT_006ad674 = FUN_00421bb0()
  // DAT_00635a3c = various label addresses
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
// Source: decompiled/block_00420000.c FUN_0042414b (17 bytes)
export function FUN_0042414b() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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
  if (((DAT_006c8ff0 !== 0) || (DAT_006c900c !== 0)) || (DAT_006c8ff4 !== 0) || (DAT_006c9024 !== 0)) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004241f8 — animate_waiting_indicator
// ═══════════════════════════════════════════════════════════════════
export function FUN_004241f8() {
  let iVar1 = FUN_00421bb0();
  iVar1 = iVar1 - _DAT_006ad674;
  FUN_0047e94e(1, 0);
  if ((DAT_006c9004 === 0) && (DAT_006c900c === 0)) {
    if (2 < iVar1) {
      // String animation logic for waiting indicator
      // Uses MFC string manipulation — stubbed
      FUN_005a577e();
      _DAT_006ad674 = FUN_00421bb0();
    }
  } else {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042433c — network_data_received_check
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042433c() {
  FUN_0047e94e(1, 0);
  if (((DAT_006c8ff0 !== 0) || (DAT_006c900c !== 0)) || (DAT_006c9010 !== 0)) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042439c — join_wait_check
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042439c() {
  FUN_0047e94e(1, 0);
  if ((DAT_006c9038 !== 0) || (DAT_006c900c !== 0)) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004243ef — error_check_handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_004243ef() {
  FUN_0047e94e(1, 0);
  if (((DAT_006c902c !== 0) || (DAT_006c900c !== 0)) || (DAT_006c8ff4 !== 0)) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042444f — timeout_check_handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042444f() {
  let iVar1 = FUN_00421bb0();
  iVar1 = iVar1 - _DAT_006ad674;
  FUN_0047e94e(1, 0);
  if ((DAT_006ad300 === -1) && (0x4d8 < iVar1)) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  } else if (DAT_006ad300 !== -1) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004244e0 — update_listbox_selection (MFC UI — stubbed)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004244e0() {
  // DEVIATION: Win32 API — MFC listbox selection management
  // Uses in_ECX as this pointer, traverses linked list at DAT_006c31d4
  // Calls: FUN_005a1c52, FUN_0040fd40, FUN_00424688, FUN_0059fb78, FUN_0059fc19, FUN_0040fcf0
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00424688 — find_player_in_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_00424688(param_1, param_2) {
  // DEVIATION: Win32 API — uses in_ECX as this pointer
  // Traverses DAT_006c31d4 linked list comparing strings
  // C: local_c = *(int *)(in_ECX + 0x14c);
  //    local_8 = DAT_006c31d4;
  //    while (local_8 != 0) {
  //      if (strcmp(local_8+0x70, param_1)==0 && strcmp(local_8+0x90, param_2)==0) break;
  //      local_c = *(int *)(local_c + 0x10);
  //      local_8 = *(int *)(local_8 + 0x20);
  //    }
  //    return local_c or *(int *)(in_ECX + 0x14c);
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042472a — init_player_strings (MFC UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042472a() {
  // DEVIATION: Win32 API — uses in_ECX as this pointer
  // Initializes player name strings from DAT_006c31d4 linked list
  // C: if (DAT_006c31d4 == 0) { zero out 4 string slots }
  //    else { FUN_004247b2 to fill from list }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004247b2 — lookup_player_by_id
// ═══════════════════════════════════════════════════════════════════
export function FUN_004247b2(param_1, param_2, param_3) {
  // DEVIATION: Win32 API — linked list traversal to find player
  // Searches DAT_006c31d4 list, copies name strings to param_2/param_3
  let local_8 = DAT_006c31d4;
  // C: while (local_8 != 0 && *(int *)(param_1 + 4) != *(int *)(local_8 + 0x2c))
  //      local_8 = *(int *)(local_8 + 0x20);
  // if (local_8 == 0) { fallback to Nth entry }
  // FUN_005f22d0(param_2, local_8 + 0x70);
  // FUN_005f22d0(param_3, local_8 + 0x90);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042486f — create_listbox_columns (MFC UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042486f() {
  // DEVIATION: Win32 API — MFC listbox column creation
  // Creates 9 columns using FUN_0059e18b with button labels from DAT_00625d14-DAT_00625d34
  // Uses in_ECX as this pointer, calls FUN_0059fd2a, Timevec::~_Timevec
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00424ae9 — update_game_info_display (MFC UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00424ae9() {
  // DEVIATION: Win32 API — MFC game info display update
  // Reads game state: DAT_006c31d4, DAT_006ad108, DAT_00655af0, DAT_00655afc,
  //   DAT_0064bcb4, DAT_0064bcb6, DAT_00655b08
  // Formats game info strings and updates list control columns
  // Calls: FUN_004aef20, FUN_004af14b, FUN_004aef36, FUN_004af01a,
  //   FUN_004af03b, FUN_004af1d5, FUN_00484fec, FUN_00485208,
  //   FUN_005f22e0, FUN_005f22d0, FUN_0059e0eb, FUN_0059fb78, FUN_0040fcf0, FUN_005a577e
  // Uses in_ECX via DAT_006ad108
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004253ef — free_player_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004253ef() {
  // DEVIATION: Win32 API — uses in_ECX as this pointer
  // Frees linked list: traverses in_ECX[0x53], calls operator_delete on each node
  // Calls: FUN_0042472a, operator_delete
  // Zeroes: in_ECX[0x53]=0, *in_ECX+0x28=0, *in_ECX+0x228=0, *in_ECX+0x220=0
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004254a8 — add_item_to_player_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004254a8(param_1, param_2) {
  // DEVIATION: Win32 API — appends to linked list using in_ECX as this
  // Allocates node (operator_new(0x18)), copies string (param_1), stores param_2
  // Updates *in_ECX+0x28 count, *in_ECX+0x118 max width
  // Calls: operator_new, _strlen, FUN_005f22d0, FUN_0040efd0, FUN_0059e356
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00425607 — start_timer
// ═══════════════════════════════════════════════════════════════════
export function FUN_00425607(param_1) {
  // DEVIATION: Win32 API — SetTimer via FUN_005d1f50
  // Uses in_ECX as this pointer
  // C: if (*(int *)(in_ECX + 0x174) != 0) FUN_00425650();
  //    uVar1 = FUN_005d1f50(param_1, 0x32, 1);
  //    *(undefined4 *)(in_ECX + 0x174) = uVar1;
  FUN_005d1f50(param_1, 0x32, 1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00425650 — stop_timer
// ═══════════════════════════════════════════════════════════════════
export function FUN_00425650() {
  // DEVIATION: Win32 API — KillTimer via FUN_005d2004
  // Uses in_ECX as this pointer
  // C: if (*(int *)(in_ECX + 0x174) != 0) {
  //      FUN_005d2004(*(undefined4 *)(in_ECX + 0x174));
  //      *(undefined4 *)(in_ECX + 0x174) = 0;
  //    }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00425695 — refresh_server_list
// ═══════════════════════════════════════════════════════════════════
export function FUN_00425695() {
  FUN_0046b14d(1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0042570c();
  // DEVIATION: Win32 API — Timer management
  // C: if (*(int *)(DAT_006ad108 + 0x174) != 0) FUN_005d2004(...);
  //    uVar1 = FUN_005d1f50(&LAB_0040130c, 0xfa, 1);
  //    *(undefined4 *)(DAT_006ad108 + 0x174) = uVar1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042570c — prune_stale_servers
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042570c() {
  // Prunes stale server entries from DAT_006c31d4 linked list
  let bVar2 = false;
  let local_c = DAT_006c31d4;
  let iVar3 = FUN_00421bb0();
  // DEVIATION: Win32 API — linked list with pointer manipulation
  // C: while (local_c != 0) {
  //   if (DAT_006ad8b8 * 0x3c < iVar3 - *(int *)(local_c + 0x28)) {
  //     // unlink node from doubly-linked list
  //     if (DAT_006c31d4 == local_c) DAT_006c31d4 = *(void **)(local_c + 0x20);
  //     if (*(int *)(local_c + 0x24) != 0) *(int *)(*(int *)(local_c+0x24)+0x20) = *(int *)(local_c+0x20);
  //     if (*(int *)(local_c + 0x20) != 0) *(int *)(*(int *)(local_c+0x20)+0x24) = *(int *)(local_c+0x24);
  //     pvVar1 = *(void **)(local_c + 0x20);
  //     operator_delete(local_c);
  //     bVar2 = true;
  //     local_c = pvVar1;
  //   } else {
  //     local_c = *(void **)(local_c + 0x20);
  //   }
  // }
  if (bVar2) {
    FUN_004257fe();
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004257fe — rebuild_server_list_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_004257fe() {
  // DEVIATION: Win32 API — rebuilds MFC server list display
  // Game state: traverses DAT_006c31d4, updates DAT_006ad108[1] counter
  // Counts players from byte fields at offset 0xb4, 0xb5 in each node
  // Calls: FUN_004253ef, FUN_004254a8, FUN_004244e0, FUN_00424ae9,
  //   FUN_0042472a, FUN_0040bbb0, FUN_0040bc10
  if (DAT_006ad108 !== null) {
    FUN_004253ef();
    if (DAT_006c31d4 === 0) {
      // DEVIATION: Win32 API — FUN_0040bbb0/bc10 for empty list display
    } else {
      // Traverse list, count players, mark disabled entries
    }
    FUN_004244e0();
    FUN_00424ae9();
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004259a6 — show_game_profile_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_004259a6(param_1) {
  // DEVIATION: Win32 API — game profile dialog (1423 bytes)
  let local_3c = [0, 1, 3, 7, 0xf, 0x1f, 0x3f, 0x7f, 0xff, 0];

  // String 0: game name (C line 2161-2162)
  FUN_004aef20(DAT_0063cc48);
  FUN_005f22e0(DAT_0063cc48, DAT_006ad59c);

  // String 1: password status (C line 2163-2164)
  let _str1 = DAT_0063cc48 + 0x104;  // &DAT_0063cd4c
  FUN_004aef20(_str1);
  FUN_004af14b(_str1, (DAT_00654c74 === 0 ? 1 : 0) + 0x277);

  // String 2: scenario name (C line 2165-2166)
  let _str2 = DAT_0063cc48 + 0x208;  // &DAT_0063ce50
  FUN_004aef20(_str2);
  FUN_005f22e0(_str2, DAT_006ad5dc);

  // String 3: game description + year (C lines 2167-2179)
  let _str3 = DAT_0063cc48 + 0x30c;  // &DAT_0063cf54
  FUN_004aef20(_str3);
  let sVar1 = _strlen(DAT_0064bc62);
  if (sVar1 === 0) {
    FUN_004af14b(_str3, 0x34c);
  } else {
    FUN_005f22d0(_str3, DAT_0064bc62);
  }
  FUN_004aef36(_str3);
  FUN_004af01a(_str3);
  let uVar2_year = FUN_00484fec(DAT_00655af8 | 0);
  FUN_00485208(_str3, uVar2_year);
  FUN_004af03b(_str3);

  // String 4: difficulty + barbarians (C lines 2180-2185)
  let _str4 = DAT_0063cc48 + 0x410;  // &DAT_0063d058
  FUN_004aef20(_str4);
  FUN_004af14b(_str4, DAT_00655b08 + 0x279);
  FUN_004aef36(_str4);
  FUN_004af01a(_str4);
  FUN_004af14b(_str4, 0x34e - (DAT_00654c7c === 0 ? 1 : 0));
  FUN_004af03b(_str4);

  // String 5: restarts + bloodlust (C lines 2190-2193)
  let _str5 = DAT_0063cc48 + 0x514;  // &DAT_0063d15c
  FUN_004aef20(_str5);
  FUN_004af14b(_str5, 0x350 - (DAT_00654fac === 0 ? 1 : 0));
  FUN_005f22e0(_str5, DAT_00625d6c);
  FUN_004af14b(_str5, 0x352 - (DAT_00654fae === 0 ? 1 : 0));

  // String 6: barbarian level (C lines 2194-2195)
  let _str6 = DAT_0063cc48 + 0x618;  // &DAT_0063d260
  FUN_004aef20(_str6);
  FUN_004af14b(_str6, DAT_00655b09 + 0x27f);

  // String 7: timer (C lines 2196-2212)
  let _str7 = DAT_0063cc48 + 0x71c;  // &DAT_0063d364
  FUN_004aef20(_str7);
  if (DAT_00654b70 === 0) {
    FUN_004af14b(_str7, 0x285);
  } else {
    let iVar3 = ((DAT_00654b70 / 1000) | 0) / 0x3c | 0;
    let local_c = ((DAT_00654b70 / 1000) | 0) % 0x3c;
    if (iVar3 < 10) {
      FUN_004af1d5(_str7, 0);
    }
    FUN_004af1d5(_str7, iVar3);
    FUN_005f22e0(_str7, DAT_00625d70);
    if (local_c < 10) {
      FUN_004af1d5(_str7, 0);
    }
    FUN_004af1d5(_str7, local_c);
  }

  // String 8: player count (C lines 2213-2221)
  let _str8 = DAT_0063cc48 + 0x820;  // &DAT_0063d468
  FUN_004aef20(_str8);
  let local_14 = 0;
  local_3c[9] = DAT_00655b0a;
  let local_10;
  for (local_10 = 1; local_3c[9] = local_3c[9] >> 1, local_10 < 8; local_10 = local_10 + 1) {
    if ((local_3c[9] & 1) !== 0) {
      local_14 = local_14 + 1;
    }
  }
  FUN_004af1d5(_str8, local_14);

  // String 9: slot count (C lines 2222-2244)
  let _str9 = DAT_0063cc48 + 0x924;  // &DAT_0063d56c
  FUN_004aef20(_str9);
  let local_8 = 0;
  if (DAT_00655b02 === 0) {
    local_8 = 1;
  } else if (DAT_00655b02 === 1) {
    local_8 = DAT_006c31a9;
  } else {
    local_8 = local_3c[DAT_006ad308];
  }
  local_14 = 0;
  local_3c[9] = local_8;
  for (local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
    if ((local_3c[9] & 1) !== 0) {
      local_14 = local_14 + 1;
    }
    local_3c[9] = local_3c[9] >> 1;
  }
  if (param_1 !== 0) {
    local_14 = local_14 - 1;
  }
  FUN_004af1d5(_str9, local_14);

  // String 10: map width / 2 (C lines 2186-2187)
  let _str10 = DAT_0063cc48 + 0xa28;  // &DAT_0063d670
  FUN_004aef20(_str10);
  FUN_004af1d5(_str10, (DAT_006d1160 | 0) / 2 | 0);

  // String 11: map height (C lines 2188-2189)
  let _str11 = DAT_0063cc48 + 0xb2c;  // &DAT_0063d774
  FUN_004aef20(_str11);
  FUN_004af1d5(_str11, DAT_006d1162 | 0);

  // DEVIATION: Win32 API — show dialog
  DAT_00635a3c = 0; // &LAB_00403c74
  let uVar2 = FUN_0051d564(DAT_006359d4, s_GAMEPROFILE_00625d74, param_1 !== 0, DAT_0063fc58, 0);
  return uVar2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426f30 — scalar_deleting_destructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426f30(param_1) {
  FUN_0059df8a();
  if ((param_1 & 1) !== 0) {
    // DEVIATION: Win32 API — operator_delete(in_ECX)
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426f80 — manage_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426f80() {
  // DEVIATION: Win32 API — uses in_ECX as this pointer
  // C: manage_window_C5DA(*(undefined4 *)(in_ECX + 8));
  manage_window_C5DA(0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426fb0 — show_modal_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426fb0(param_1, param_2, param_3, param_4) {
  return FUN_0051d564(DAT_006359d4, param_1, param_2, param_3, param_4);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00426ff0 — format_template_string (percent substitution)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00426ff0(param_1, param_2) {
  // Template string processor: %STRING0..%STRING9, %NUMBER0..%NUMBER9, %HX0..%HX9, %%
  // param_1 = template string, param_2 = output buffer
  let s_STRING_00625e40 = "STRING";
  let s_NUMBER_00625e48 = "NUMBER";
  let DAT_00625e50 = "HX";
  let DAT_00625e54 = "0";
  let DAT_00625e58 = "%";

  param_2[0] = 0; // *param_2 = 0
  let local_34;
  do {
    let pcVar1 = _strchr(param_1, 0x25); // '%'
    if (pcVar1 !== null) {
      // *pcVar1 = '\0' — split string at %
    }
    if (param_1 !== '' && param_1[0] !== 0) {
      FUN_005f22e0(param_2, param_1);
    }
    local_34 = pcVar1;
    if (pcVar1 !== null) {
      local_34 = pcVar1 + 1;
      let iVar2 = __strnicmp(local_34, s_STRING_00625e40, 6);
      if (iVar2 === 0) {
        iVar2 = _atoi(pcVar1 + 7);
        FUN_005f22e0(param_2, DAT_0063cc48 + iVar2 * 0x104);
        param_1 = pcVar1 + 8;
        if (9 < iVar2) {
          param_1 = pcVar1 + 9;
        }
      } else {
        iVar2 = _strncmp(local_34, s_NUMBER_00625e48, 6);
        if (iVar2 === 0) {
          iVar2 = _atoi(pcVar1 + 7);
          let local_2c = [];
          __ltoa(DAT_0063cc30[iVar2], local_2c, 10);
          FUN_005f22e0(param_2, local_2c);
          param_1 = pcVar1 + 8;
        } else {
          iVar2 = _strncmp(local_34, DAT_00625e50, 3);
          if (iVar2 === 0) {
            iVar2 = _atoi(pcVar1 + 4);
            let local_2c = [];
            __ltoa(DAT_0063cc30[iVar2], local_2c, 0x10);
            for (let local_30 = 0; local_30 < 4 - _strlen(local_2c); local_30 = local_30 + 1) {
              FUN_005f22e0(param_2, DAT_00625e54);
            }
            FUN_005f22e0(param_2, local_2c);
            param_1 = pcVar1 + 5;
          } else {
            param_1 = local_34;
            if (local_34[0] === '%') {
              FUN_005f22e0(param_2, DAT_00625e58);
              param_1 = pcVar1 + 2;
            }
          }
        }
      }
    }
  } while (local_34 !== null);
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
  // C: FUN_004271e8(param_1, *(undefined4 *)(DAT_00628420 + param_2 * 4));
  FUN_004271e8(param_1, s32(DAT_00628420, param_2 * 4));
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
  if (((DAT_006560ff[param_1 * 0x20] & 0xf) === 0xb) &&
     (DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0x07)) {
    DAT_006560ff[param_1 * 0x20] = 0xff;
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004273e6 — cancel_fortified_units_at_tile
// ═══════════════════════════════════════════════════════════════════
export function FUN_004273e6(param_1) {
  for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
    if ((DAT_006560ff[param_1 * 0x20] === 0x03) &&
       ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0) ||
        (FUN_005b89e4(s16(DAT_006560f0, param_1 * 0x20),
                      s16(DAT_006560f2, param_1 * 0x20)) === 0))) {
      DAT_006560ff[param_1 * 0x20] = 0xff;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004274a6 — update_visibility_and_diplomacy_on_move (large fn)
// Handles vision updates, ZOC, diplomacy triggers when a unit moves.
// ═══════════════════════════════════════════════════════════════════
export function FUN_004274a6(param_1, param_2) {
  let bVar6 = false;
  let iVar8 = s16(DAT_006560f0, param_1 * 0x20);
  let iVar9 = s16(DAT_006560f2, param_1 * 0x20);
  let bVar1 = DAT_006560f7[param_1 * 0x20];
  let uVar10 = s8(bVar1);
  let uVar11 = DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 1;
  let uVar12 = DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 8;
  let cVar2 = DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14];
  let iVar13 = FUN_005b89e4(iVar8, iVar9);
  let uVar23 = (1 << (bVar1 & 0x1f)) & 0xff;
  let local_30 = 0;
  let bVar24 = DAT_006d1da0 === uVar10;

  if (uVar10 === 0) {
    let iVar14 = FUN_005b8931(iVar8, iVar9);
    DAT_006560f9[param_1 * 0x20] = u8(iVar14 + 4) | DAT_006560f9[param_1 * 0x20];
  }

  let cVar7 = DAT_00655b07;
  let bVar5;
  if ((DAT_00655b07 === 0) && (((DAT_00655af0 & 0x80) === 0 || ((DAT_0064bc60 & 8) === 0)))) {
    bVar5 = false;
  } else {
    bVar5 = true;
  }

  FUN_005b9ec6();

  // Near-tile visibility loop (25 tiles)
  for (let local_10 = 0; local_10 < 0x19; local_10 = local_10 + 1) {
    let uVar15 = FUN_005ae052(s8(DAT_00628370[local_10]) + iVar8);
    let iVar14 = s8(DAT_006283a0[local_10]) + iVar9;
    let iVar16 = FUN_004087c0(uVar15, iVar14);
    if ((iVar16 !== 0) &&
       (((local_10 < 8 || (local_10 === 0x14)) ||
        ((uVar11 !== 0 &&
         ((cVar2 === 1 ||
          (FUN_005b89e4(uVar15, iVar14) === (cVar2 === 2 ? 1 : 0))))))))) {
      iVar16 = FUN_005b8931(uVar15, iVar14);
      if (uVar10 !== 0) {
        let pcVar18 = FUN_005b898b(uVar15, iVar14, uVar10);
        // C: *(char *)(iVar16 + 1) != *pcVar18 — dereference both sides
        // C: uVar23 & *(byte *)(iVar16 + 4) — dereference tile byte 4
        let _tileByte1 = tileRead(iVar16, 1);
        let _visByte = (DAT_006365c0[uVar10] !== null) ? DAT_006365c0[uVar10][pcVar18] : 0;
        if ((bVar24) && (!bVar5) &&
           ((_tileByte1 !== _visByte) || ((uVar23 & tileRead(iVar16, 4)) === 0))) {
          if (local_10 < 8) {
            local_30 = local_30 | 5;
          } else {
            local_30 = local_30 | 10;
          }
        }
        // C: *(undefined1 *)(iVar16 + 1) — pass dereferenced byte, not offset
        FUN_005b9d81(uVar15, iVar14, tileRead(iVar16, 1), uVar10, 0, 1);
      }
      FUN_005b976d(uVar15, iVar14, uVar23, 1, 1);
    }
  }

  // Adjacent tile diplomacy/combat loop (8 neighbors)
  for (let local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
    let uVar15 = FUN_005ae052(s8(DAT_00628350[local_10]) + iVar8);
    let iVar14 = s8(DAT_00628360[local_10]) + iVar9;
    let iVar16 = FUN_004087c0(uVar15, iVar14);
    if (iVar16 !== 0) {
      iVar16 = FUN_0043cf76(uVar15, iVar14);
      if ((-1 < iVar16) && (s8(DAT_0064f348[iVar16 * 0x58]) !== uVar10)) {
        let uVar17 = s8(DAT_0064f348[iVar16 * 0x58]);
        // C lines 2571-2577: visibility check before FUN_0043cc00
        if ((bVar24) && (!bVar5)) {
          if ((uVar23 & s8(DAT_0064f34c[iVar16 * 0x58])) === 0) {
            local_30 = local_30 | 5;
          } else if (DAT_0064f34d[iVar16 * 0x58 + uVar10] !== DAT_0064f349[iVar16 * 0x58]) {
            local_30 = local_30 | 1;
          }
        }
        FUN_0043cc00(iVar16, uVar10);
        if (uVar12 === 0) {
          FUN_005b496e(param_1, uVar17);
        }
        if ((cVar2 === 0) && ((DAT_0064c6c0[uVar10 * 4 + uVar17 * 0x594] & 4) === 0)) {
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
            if (uVar17b !== uVar10 && ((DAT_0064c6c0[uVar17b * 4 + uVar10 * 0x594] & 1) === 0)) {
              if (!bVar6) {
                FUN_0047cea6(iVar8, iVar9);
                if (2 < DAT_00655b02) {
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
          let bVar3 = DAT_006560f7[iVar20 * 0x20];
          let uVar17 = s8(bVar3);
          if (uVar17 !== uVar10) {
            let uVar22 = u8(DAT_006560f6[iVar20 * 0x20]);
            if ((uVar12 === 0) || ((DAT_0064b1bd[uVar22 * 0x14] & 0x40) !== 0)) {
              let iVar21 = FUN_005b8ca6(iVar8, iVar9);
              if (iVar21 < 0) {
                FUN_005b496e(param_1, uVar17);
              }
              if ((DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 8) === 0) {
                FUN_004273e6(iVar20);
              }
              if (((1 << (bVar3 & 0x1f)) & DAT_00655b0b) === 0) {
                if ((iVar19 !== 0) || (iVar13 === 0)) {
                  FUN_0042738c(iVar20);
                }
              } else if (iVar19 === iVar13) {
                FUN_0042738c(iVar20);
              }
            }
            if (((DAT_0064b1bc[uVar22 * 0x14] & 8) === 0) ||
               (FUN_005b50ad(iVar20, 2) > 1) ||
               ((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x40) !== 0)) {
              if (iVar16 < 0) {
                if ((bVar24) && (cVar7 === 0) &&
                   ((uVar23 & u8(DAT_006560f9[iVar20 * 0x20])) === 0)) {
                  local_30 = local_30 | 1;
                }
                FUN_005b496e(iVar20, uVar10);
              }
              if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0) {
                if (((iVar13 !== 0) || (iVar19 === 0)) || (cVar2 === 1)) {
                  FUN_0042738c(param_1);
                }
              } else if ((iVar19 === iVar13) || (cVar2 === 1)) {
                FUN_0042738c(param_1);
              }
              if (((iVar19 !== 0) && (uVar17 !== 0)) &&
                 ((DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 4) === 0)) {
                FUN_0049301b(uVar10, uVar15, iVar14, 2,
                             3 - ((DAT_0064b1bc[uVar22 * 0x14] & 8) === 0 ? 1 : 0));
              }
            }
            if (((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0) &&
                (iVar13 === 0)) &&
               ((iVar19 === 0 && ((DAT_0064b1c1[uVar22 * 0x14] !== 1 || (-1 < iVar16)))))) {
              if ((!bVar6) && (cVar7 === 0)) {
                FUN_0047cea6(iVar8, iVar9);
                if (2 < DAT_00655b02) {
                  FUN_004b0b53(0xff, 2, 0, 0, 0);
                  FUN_0046b14d(0x72, 0xff, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
                }
                bVar6 = true;
              }
              if ((param_2 !== 0) && (DAT_006560f6[param_1 * 0x20] !== 0x09)) {
                FUN_0055d8d8(uVar10, uVar17, uVar15, iVar14);
              }
              if (s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) < 6) {
                FUN_0049301b(uVar17, uVar15, iVar14, 1, 2 - (uVar10 === 0 ? 1 : 0));
              }
              if ((DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 4) === 0) {
                let local_8 = 1;
                if (((uVar17 !== 0) && (DAT_0064b1ca[uVar22 * 0x14] !== 6)) &&
                   ((DAT_006560ff[iVar20 * 0x20] !== 0x02 ||
                    (DAT_0064b1ca[uVar22 * 0x14] !== 0x01)))) {
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
      let uVar15 = FUN_005ae052(s8(DAT_00628370[local_10]) + iVar8);
      let iVar13b = s8(DAT_006283a0[local_10]) + iVar9;
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
                if ((uVar23 & s8(DAT_0064f34c[iVar16 * 0x58])) === 0) {
                  local_30 = local_30 | 10;
                } else if (DAT_0064f34d[iVar16 * 0x58 + uVar10] !== DAT_0064f349[iVar16 * 0x58]) {
                  local_30 = local_30 | 2;
                }
              }
              FUN_0043cc00(iVar16, uVar10);
            }
            if ((-1 < iVar14b) &&
               ((DAT_0064b1bc[u8(DAT_006560f6[iVar14b * 0x20]) * 0x14] & 8) === 0)) {
              if (iVar16 < 0) {
                if ((bVar24) && (cVar7 === 0) &&
                   ((uVar23 & u8(DAT_006560f9[param_1 * 0x20])) === 0)) {
                  local_30 = local_30 | 2;
                }
                FUN_005b496e(iVar14b, uVar10);
              }
              let iVar19 = FUN_005b89e4(uVar15, iVar13b);
              if (((iVar19 !== 0) && (uVar17 !== 0)) &&
                 ((DAT_0064c6c0[uVar17 * 4 + uVar10 * 0x594] & 4) === 0)) {
                FUN_0049301b(uVar10, uVar15, iVar13b, 2, 2);
              }
            }
          }
          if ((-1 < iVar14b) && (uVar12 === 0)) {
            let uVar22 = u8(DAT_006560f6[iVar14b * 0x20]);
            if ((DAT_0064b1bc[uVar22 * 0x14] & 1) !== 0 &&
               ((DAT_0064b1c1[uVar22 * 0x14] === 1 ||
                (FUN_005b89e4(iVar8, iVar9) === (DAT_0064b1c1[uVar22 * 0x14] === 2 ? 1 : 0))))) {
              FUN_0042738c(iVar14b);
              FUN_004273e6(iVar14b);
              let iVar14c = FUN_005b8ca6(iVar8, iVar9);
              if (iVar14c < 0) {
                FUN_005b496e(param_1, uVar17);
              }
              let iVar13c = FUN_005b89e4(uVar15, iVar13b);
              if (((iVar13c === 0) && (uVar17 !== 0)) &&
                 ((DAT_0064c6c0[uVar10 * 4 + uVar17 * 0x594] & 4) === 0)) {
                FUN_0049301b(uVar17, iVar8, iVar9, 2, 2);
              }
            }
          }
          if ((-1 < iVar16) && (FUN_005b8b65(iVar8, iVar9, uVar17) !== 0) &&
             ((DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0 &&
              (uVar12 === 0)))) {
            FUN_005b496e(param_1, uVar17);
          }
        }
      }
    }
  }

  // MP visibility notification
  if (DAT_00655af8 === 0) {
    FUN_005b9f1c();
  } else {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    if (((1 << (bVar1 & 0x1f)) & DAT_00655b0b) === 0 && (DAT_006d1da0 !== uVar10)) {
      for (let local_50 = 1; local_50 < 8; local_50 = local_50 + 1) {
        if (((1 << (u8(local_50) & 0x1f)) & DAT_00655b0b) !== 0 &&
           ((DAT_00655b07 !== 0 ||
             ((1 << (u8(local_50) & 0x1f)) & u8(DAT_006560f9[param_1 * 0x20])) !== 0) ||
            (s8(DAT_006560f7[param_1 * 0x20]) === (local_50 & 0xff)))) {
          if (DAT_006d1da0 === local_50) {
            FUN_0047cf22(iVar8, iVar9);
          } else if (2 < DAT_00655b02) {
            FUN_0046b14d(0x75, DAT_006ad30c + s32(DAT_006ad558, local_50 * 4) * 0x54,
                         iVar8, iVar9, 0, 0, 0, 0, 0, 0);
          }
        }
      }
      if ((!bVar6) && (FUN_0047cea6(iVar8, iVar9), 2 < DAT_00655b02)) {
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
      if (DAT_006d1da0 === uVar10) {
        FUN_0047ce1e(iVar8, iVar9, local_5c, uVar10, 1);
      } else if (2 < DAT_00655b02) {
        FUN_0046b14d(0x76, DAT_006ad30c + s32(DAT_006ad558, uVar10 * 4) * 0x54,
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
  if (DAT_00625e64 === 0) {
    DAT_00625e64 = 1;
    FUN_00497ea0(DAT_0063e4c0, 2, param_1);
  } else {
    FUN_004980ec(DAT_0063e4c0);
    FUN_00497ea0(DAT_0063e4c0, 2, param_1);
  }
  DAT_00625e60 = 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428a78 — close_text_file
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428a78() {
  FUN_004980ec(DAT_0063e4c0);
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
    DAT_0063e4b8 = FUN_00498159(DAT_0063e4c0, sVar1 + 1);
    FUN_005f22d0(DAT_0063e4b8, param_1);
    iVar2 = DAT_00625e60;
    DAT_00625e60 = DAT_00625e60 + 1;
  }
  return iVar2;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428b0c — get_string_by_index (text pool lookup)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428b0c(param_1) {
  // Traverses null-terminated string pool
  // Returns pointer to nth string in pool
  let local_8 = DAT_0063e4c8;
  for (; param_1 !== 0; param_1 = param_1 - 1) {
    // Skip to end of current string (past non-null chars)
    for (; local_8[0] !== 0; local_8 = local_8 + 1) {
    }
    // Skip past null chars to start of next string
    for (; local_8[0] === 0; local_8 = local_8 + 1) {
    }
  }
  return local_8;
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
  DAT_0063e4b8 = FUN_00498159(DAT_0063e4c0, local_8);
  _memset(DAT_0063e4b8, 0, local_8);
  _strncpy(DAT_0063e4b8, param_1, local_8);
  sVar2 = _strlen(param_1);
  if (sVar2 === 0) {
    // *DAT_0063e4b8 = ' ';
  }
  let iVar1 = DAT_00625e60;
  DAT_00625e60 = DAT_00625e60 + 1;
  return iVar1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428cb0 — init_text_object
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428cb0() {
  // DEVIATION: Win32 API — uses in_ECX as this pointer
  // C: *(undefined4 *)(in_ECX + 4) = 0;
  //    *(undefined4 *)(in_ECX + 8) = 0;
  //    *(undefined2 *)(in_ECX + 0xe) = 0;
  //    return in_ECX;
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
  DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(DAT_006a4f88 + 0x48);
  FUN_004e4ceb();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428d48 — load_city_graphics
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428d48() {
  let local_8;
  if (DAT_006a4f88 === 0) {
    local_8 = 0;
  } else {
    local_8 = DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_00625e90, s_CITIES_00625e88);
  FUN_0059d3c9(0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428da7 — invalidate_city_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428da7() {
  DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache(DAT_006a4f88 + 0x48);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428dcf — rename_city (city editor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428dcf() {
  // DEVIATION: Win32 API — uses MFC dialog for city rename
  // C: uVar1 = FUN_00428b0c(*(undefined4 *)(DAT_00628420 + 0x7d8), 1, &LAB_0040123a);
  //    FUN_00573e59(&DAT_0063fe50 + *(int *)(DAT_006a4f88 + 0x2f4) * 0x3c +
  //                *(int *)(DAT_006a4f88 + 0x2ec) * 0x1e0 +
  //                *(int *)(DAT_006a4f88 + 0x2f0) * 0x78, uVar1);
  //    FUN_00428d00();
  let uVar1 = FUN_00428b0c(s32(DAT_00628420, 0x7d8), 1, 0x0040123a);
  // C: first arg = &DAT_0063fe50 + offset calc from DAT_006a4f88 struct fields
  let _off573 = s32(DAT_006a4f88_buf, 0x2f4) * 0x3c +
                s32(DAT_006a4f88_buf, 0x2ec) * 0x1e0 +
                s32(DAT_006a4f88_buf, 0x2f0) * 0x78;
  FUN_00573e59(DAT_0063fe50 + _off573, uVar1);
  FUN_00428d00();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428e50 — city_misc_editor_menu
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428e50() {
  // DEVIATION: Win32 API — MFC dialog for city misc editing
  let local_8 = 2;
  let local_14;
  if (DAT_006a4f88 === 0) {
    local_14 = 0;
  } else {
    local_14 = DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_14);
  let iVar1 = FUN_00419100(s_DEBUG_006359dc, s_CITYMISC_00625e98, 1);
  if (iVar1 !== -1) {
    let local_10 = null;
    switch(iVar1) {
    case 0:
      local_10 = 0x6465d8; // &DAT_006465d8
      break;
    case 1:
      local_10 = 0x647fa0; // &DAT_00647fa0
      break;
    default:
      if (iVar1 < 10) {
        local_10 = 0x6442f8 + (iVar1 * 8 - 0x10) * 0xf;
      } else {
        local_10 = 0x644334 + (iVar1 * 8 - 0x60) * 0xf;
      }
      local_8 = 3;
      break;
    case 10:
      local_10 = 0x646650; // &DAT_00646650
      break;
    case 0xb:
      local_10 = 0x647fdc; // &DAT_00647fdc
      break;
    }
    if (local_10 !== null) {
      let uVar2 = FUN_00428b0c(s32(DAT_00628420, 0x7d8), local_8, 0x0040123a);
      // DEVIATION: Win32 API — FUN_00573e59 edits city data
      FUN_00573e59(local_10, uVar2);
    }
  }
  FUN_0059d3c9(0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00428fd2 — update_city_editor_selection
// ═══════════════════════════════════════════════════════════════════
export function FUN_00428fd2() {
  // DEVIATION: Win32 API — uses MFC FUN_00418d60 for dropdown selection
  let uVar1 = FUN_00418d60();
  // C: *(undefined4 *)(DAT_006a4f88 + 0x2ec) = uVar1;
  DAT_006a4f88_buf[0x2ec] = uVar1 & 0xFF;
  DAT_006a4f88_buf[0x2ed] = (uVar1 >>> 8) & 0xFF;
  DAT_006a4f88_buf[0x2ee] = (uVar1 >>> 16) & 0xFF;
  DAT_006a4f88_buf[0x2ef] = (uVar1 >>> 24) & 0xFF;
  let uVar1b = FUN_00418d60();
  // C: *(undefined4 *)(DAT_006a4f88 + 0x2f0) = uVar1b;
  DAT_006a4f88_buf[0x2f0] = uVar1b & 0xFF;
  DAT_006a4f88_buf[0x2f1] = (uVar1b >>> 8) & 0xFF;
  DAT_006a4f88_buf[0x2f2] = (uVar1b >>> 16) & 0xFF;
  DAT_006a4f88_buf[0x2f3] = (uVar1b >>> 24) & 0xFF;
  let uVar1c = FUN_00418d60();
  // C: *(undefined4 *)(DAT_006a4f88 + 0x2f4) = uVar1c;
  DAT_006a4f88_buf[0x2f4] = uVar1c & 0xFF;
  DAT_006a4f88_buf[0x2f5] = (uVar1c >>> 8) & 0xFF;
  DAT_006a4f88_buf[0x2f6] = (uVar1c >>> 16) & 0xFF;
  DAT_006a4f88_buf[0x2f7] = (uVar1c >>> 24) & 0xFF;
  FUN_00428d00();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042903e — create_city_editor_buttons
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042903e(param_1) {
  // DEVIATION: Win32 API — creates MFC buttons for city editor
  // Uses in_ECX, DAT_00628420 offset table, DAT_006a1d80 button ID counter
  // Calls: FUN_004086c0, FUN_00418bf0, FUN_00418c70, FUN_00418dd0, FUN_00418ce0, FUN_00428b0c
  // param_1: 0=6 buttons, 1=4 buttons, 2=2 buttons
  // DAT_006a1d80 incremented
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004293a8 — draw_city_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_004293a8() {
  // DEVIATION: Win32 API — city editor rendering (MFC/GDI)
  // Calls: FUN_00552112, FUN_005a9afe/FUN_005a9abf (bitmap draw),
  //   FUN_005cef66 (sprite), FUN_004ccb6a, FUN_005baeb0/FUN_005baec8/FUN_005baee0,
  //   FUN_005bb024 (text draw), FUN_00428b0c, FUN_00414d70, FUN_00408460
  // Reads: DAT_0062e018, DAT_006a1d7c, DAT_00628420 offsets
  // Uses in_ECX as window handle
  FUN_00552112();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429671 — init_city_editor_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429671() {
  // DEVIATION: Win32 API — city editor MFC window initialization
  // Game state: DAT_006a1d7c = 1, DAT_006a4f88 = in_ECX, DAT_0062e018, DAT_006a1d80 = 0xc9
  // Creates 5 buttons (3 top, 2 side), sets up GIF backgrounds
  // Calls: FUN_005c64da, FUN_005bd630, FUN_00417ef0, FUN_005d268e/FUN_005d25a8/FUN_005d2550/
  //   FUN_005d2568/FUN_005d2590, FUN_005bf071, FUN_005534bc, FUN_0042903e(0..2),
  //   FUN_004086c0, FUN_0040f680, FUN_0040f880, FUN_0040f840, FUN_0040f350,
  //   FUN_00418d90, FUN_00408330, FUN_00428fd2, FUN_005bb574, FUN_004085f0, FUN_005c61b0
  // Main loop: while (DAT_006a1d7c != 0) FUN_0040ef50();
  // Cleanup: if (DAT_0062e018 != 0) FUN_0040f010(1); DAT_0062e018 = 0;
  DAT_006a1d7c = 1;
  DAT_006a4f88 = 0; // would be in_ECX
  DAT_006a1d80 = 0xc9;
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
// Source: decompiled/block_00420000.c FUN_00429e69 (14 bytes)
export function FUN_00429e69() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00429e77 — open_city_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00429e77() {
  // DEVIATION: Win32 API — opens city editor with SEH
  // C: FUN_00417fa0(); FUN_00429671(); FUN_005bb574();
  //    FUN_00429ed0(); FUN_00429ee6();
  FUN_00417fa0();
  FUN_00429671();
  FUN_005bb574();
  FUN_00429ed0();
  FUN_00429ee6();
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
// Source: decompiled/block_00420000.c FUN_00429ee6 (14 bytes)
export function FUN_00429ee6() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
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
  Timevec_destructor(DAT_0063e4f0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042a768 — close_credits_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042a768(in_ECX) {
  // C: uses in_ECX as this pointer (__thiscall)
  // C: if (-1 < *(int *)(in_ECX + 0x450)) {
  //      *(undefined4 *)(in_ECX + 0x450) = 0xffffffff;
  //      FUN_005c5aeb();
  //      FUN_004083f0();
  //      FUN_00553379();
  //    }
  if (in_ECX && -1 < s32(in_ECX, 0x450)) {
    in_ECX[0x450] = 0xff; in_ECX[0x451] = 0xff; in_ECX[0x452] = 0xff; in_ECX[0x453] = 0xff;
    FUN_005c5aeb();
    FUN_004083f0();
    FUN_00553379();
  }
}

// ═══════════════════════════════════════════════════════════════════
// show_credits — display credits/background image
// ═══════════════════════════════════════════════════════════════════
export function show_credits(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 API — creates MFC window with GIF background
  // Game state accessed: DAT_0063359c, DAT_006ab19c, DAT_006ab198
  // Uses in_ECX for window object, calls:
  //   FUN_005c64da, FUN_0042a768, FUN_005d8236(&DAT_0063eaa0),
  //   GetSystemMetrics(2), FUN_005bf071/FUN_005bf5e1 (GIF load),
  //   COleClientItem::GetActiveView, FUN_005534bc, FUN_0043c5c0
  //   FUN_005c656b, SEH cleanup
  // param_1 sign-extended: if <0, negate+1; if ==10000, load scredits.gif; else param_1+0x31
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
// Source: decompiled/block_00420000.c FUN_0042abb1 (16 bytes)
export function FUN_0042abb1() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042abc1 — draw_credits_background
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042abc1() {
  // DEVIATION: Win32 API — draws credits background
  // C: FUN_005a9afe(in_ECX + 0x2d8);
  // Uses in_ECX as this pointer
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ac18 — redraw_credits_full
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ac18() {
  // DEVIATION: Win32 API — redraws credits with full parameters
  // C: FUN_0042abc1(0, 0, *(int *)(in_ECX + 0x48c), *(int *)(in_ECX + 0x474));
  // Uses in_ECX as this pointer
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ac4e — handle_credits_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ac4e() {
  // DEVIATION: Win32 API — credits window click handler
  // C: local_8 = FUN_005c62ee();
  //    if (local_8 == 0) local_8 = 0; else local_8 -= 0x48;
  //    if (*(int *)(local_8 + 0x4a0) == 0) FUN_0042a768();
  //    else CRichEditDoc::InvalidateObjectCache(local_8 + 0x48);
  let local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  } else {
    local_8 = local_8 - 0x48;
  }
  // DEVIATION: Win32 API — window invalidation
  FUN_0042a768();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042acb0 — create_advisor_scrollbar
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042acb0() {
  // DEVIATION: Win32 API — creates advisor window scrollbar
  // Calls: FUN_004086c0, FUN_00407fc0, FUN_0043c790, FUN_00428b0c,
  //   FUN_0040f680, FUN_0040f880, FUN_0040f7d0, FUN_0040f840
  // Uses in_ECX, DAT_00628420 + 0x51c
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ad8f — draw_science_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ad8f() {
  // DEVIATION: Win32 API — science advisor window drawing (1969 bytes)
  // Game state reads: DAT_0063ef6c (current civ), DAT_00655b18 (city count),
  //   DAT_0064f394/DAT_0064f348/DAT_0064f38a (city data), DAT_00655afa,
  //   DAT_0063ec34/DAT_0063ec38/DAT_0063ec3c (window dims), DAT_00655b1e,
  //   DAT_0064c6b5 (government), DAT_0064c6aa/DAT_0064c6a8 (research),
  //   DAT_00627684 (icon table), DAT_0063efa8 (scrollbar created flag)
  // Game state writes: DAT_0063ef80, _DAT_0063ef78, _DAT_0063ef7c,
  //   DAT_0063ef74, _DAT_0063ef68, DAT_0063ef70, DAT_0063efa8
  // Calls many drawing/UI functions (FUN_005baeb0, FUN_005baec8, etc.)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b540 — scroll_science_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b540(param_1) {
  DAT_0063ef70 = DAT_0063ef74 * param_1;
  FUN_0042ad8f();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b563 — science_advisor_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b563(param_1, param_2) {
  if ((-1 < param_2 - _DAT_0063ef78) &&
     ((param_2 - _DAT_0063ef78) / DAT_0063ef80 < DAT_0063ef74) &&
     (-1 < param_1 - 2)) {
    let iVar1 = (param_2 - _DAT_0063ef78) / DAT_0063ef80;
    let iVar2 = ((param_1 - 2) / DAT_0063ef98);
    if (iVar2 < 3) {
      iVar2 = DAT_0063ef74 * iVar2 + DAT_0063ef70;
      let local_10 = 0;
      for (let local_14 = 0; local_14 < 100; local_14 = local_14 + 1) {
        let iVar3 = FUN_004bd9f0(DAT_0063ef6c, local_14);
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
  FUN_004c0cf7(DAT_0063ef6c, 1, 0);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b67d — open_science_advisor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b67d(param_1) {
  // DEVIATION: Win32 API — opens science advisor dialog (423 bytes)
  show_credits(6, 6, 0, 600, 400, 0, 0);
  DAT_0063ef6c = param_1;
  // DEVIATION: Win32 API — FUN_004086c0 creates rect, FUN_00407fc0, FUN_0043c790
  // Creates scrollbar (FUN_0040f680/f880/f7d0/f840), text button (FUN_0043c790)
  // FUN_00428b0c for button labels from DAT_00628420
  // CPropertySheet::EnableStackedTabs for tab setup
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042b824 — show_supply_details
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042b824(param_1, param_2) {
  // DEVIATION: Win32 API — supply chain details dialog (1022 bytes)
  // Game state reads: DAT_00655b18, DAT_0064f394, DAT_0064f348, DAT_0064f34d,
  //   DAT_0064f37e, DAT_0064f37b, DAT_0064f360, DAT_0064f349, DAT_00655b07,
  //   DAT_0064b168 (resource name table)
  // Calls: FUN_0059db08, FUN_004271e8, FUN_0040ffa0, FUN_0043d20a,
  //   FUN_0040bbb0/bbe0/fea0/fed0/fe10/ff30/ff00/bc10, FUN_0059edf0,
  //   FUN_00410070, FUN_00421d30, FUN_00421e70, FUN_0040bc80
  // FUN_0042bc22/FUN_0042bc38 for cleanup
  FUN_0042bc22();
  FUN_0042bc38();
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
// Source: decompiled/block_00420000.c FUN_0042bc38 (15 bytes)
export function FUN_0042bc38() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bc47 — open_supply_search_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bc47(param_1) {
  // DEVIATION: Win32 API — supply search dialog (292 bytes)
  // Checks FUN_004bd9f0(param_1, 0x54) for available resources
  // Loops showing supply categories via FUN_00428b0c + FUN_0059edf0
  // Calls FUN_0042b824 when resource selected
  // FUN_0042bd6b/FUN_0042bd81 for cleanup
  let iVar1 = FUN_004bd9f0(param_1, 0x54);
  if (iVar1 === 0) {
    FUN_0042bd6b();
    FUN_0042bd81();
    return;
  }
  // DEVIATION: Win32 API — dialog loop
  FUN_0042bd6b();
  FUN_0042bd81();
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
// Source: decompiled/block_00420000.c FUN_0042bd81 (14 bytes)
export function FUN_0042bd81() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042bd8f — draw_trade_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042bd8f() {
  // DEVIATION: Win32 API — trade advisor window drawing (3931 bytes)
  // Game state reads: DAT_0063ef6c, DAT_00655b18, DAT_0064f394, DAT_0064f348,
  //   DAT_0064f38c, DAT_0064f38a, DAT_0064f344, DAT_0064c6b5, DAT_0064c488,
  //   DAT_0063ec34/ec38/ec3c, DAT_00628420
  // Game state writes: DAT_0063ef80, _DAT_0063ef78, _DAT_0063ef7c,
  //   DAT_0063ef74, _DAT_0063ef68, DAT_0063ef70, DAT_0063efa8
  // Shows city list with trade routes, income/costs, building maintenance
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ccf4 — scroll_trade_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ccf4(param_1) {
  DAT_0063ef70 = param_1;
  FUN_0042bd8f();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042cd11 — show_supply_search_for_current_civ
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042cd11() {
  FUN_0042bc47(DAT_0063ef6c);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042cd2f — open_trade_advisor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042cd2f(param_1) {
  // DEVIATION: Win32 API — opens trade advisor dialog (423 bytes)
  show_credits(5, 5, 0, 600, 400, 0, 0);
  DAT_0063ef6c = param_1;
  // DEVIATION: Win32 API — same pattern as FUN_0042b67d
  // Creates scrollbar, text button with labels from DAT_00628420
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042ced6 — draw_city_status_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042ced6() {
  // DEVIATION: Win32 API — city status advisor window drawing (1858 bytes)
  // Game state reads: DAT_0063ef6c, DAT_00655b18, DAT_0064f394, DAT_0064f348,
  //   DAT_0064f360 (city names), DAT_0064f390/f391/f38e (yields),
  //   DAT_0064f379 (production), DAT_0064f35c (research),
  //   DAT_0064c488/c48c, DAT_0064b1b8/b1c8, DAT_0064bccc, DAT_0064c6b5
  // Game state writes: DAT_0063ef80, _DAT_0063ef78, _DAT_0063ef7c,
  //   DAT_0063ef74, _DAT_0063ef68, DAT_0063ef70, DAT_0063efa8
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042d618 — scroll_city_status_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042d618(param_1) {
  DAT_0063ef70 = param_1;
  FUN_0042ced6();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042d635 — city_status_advisor_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042d635(param_1, param_2) {
  if ((-1 < param_2 - _DAT_0063ef78) &&
     ((param_2 - _DAT_0063ef78) / DAT_0063ef80 < DAT_0063ef74)) {
    let iVar1 = (param_2 - _DAT_0063ef78) / DAT_0063ef80;
    let local_8 = 0;
    for (let local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
      if (((s32(DAT_0064f394, local_c * 0x58) !== 0) &&
          (s8(DAT_0064f348[local_c * 0x58]) === DAT_0063ef6c))) {
        if (local_8 === iVar1 + DAT_0063ef70) {
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
  DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(DAT_0063eb10, 0x4029f5);
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042d781 — draw_citizen_icons
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042d781(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let local_54 = new Uint8Array(16);
  let local_44 = new Uint8Array(16);
  let local_34 = new Uint8Array(16);
  let local_24 = new Uint8Array(16);
  let local_10 = FUN_00548b70(s8(DAT_0064f349[param_1 * 0x58]), 0x1c, param_4, 0, 0);
  let local_8 = 0;
  // C: DAT_006a6604 = *(uint *)(&DAT_0064f370 + param_1 * 0x58) >> 0x1a;
  // Must read 4 bytes as little-endian uint32, not a single byte
  let _off = param_1 * 0x58;
  DAT_006a6604 = (DAT_0064f370[_off] | (DAT_0064f370[_off+1]<<8) | (DAT_0064f370[_off+2]<<16) | (DAT_0064f370[_off+3]<<24)) >>> 0x1a;

  for (let local_c = 0; local_c < param_5; local_c = local_c + 1) {
    FUN_00448f92(s8(DAT_0064f348[param_1 * 0x58]), local_24, DAT_0063eb10, param_2, param_3);
    FUN_005cef31(local_24, DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
    local_8 = local_8 + 1;
  }

  for (let local_c = 0;
      local_c < (s8(DAT_0064f349[param_1 * 0x58]) - (param_6 + DAT_006a6604 + param_5));
      local_c = local_c + 1) {
    FUN_00448f92(s8(DAT_0064f348[param_1 * 0x58]), local_34, DAT_0063eb10, param_2, param_3);
    FUN_005cef31(local_34, DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
    local_8 = local_8 + 1;
  }

  for (let local_c = 0; local_c < param_6; local_c = local_c + 1) {
    let local_14 = (local_c < param_6 - param_7) ? 4 : 6;
    FUN_00448f92(s8(DAT_0064f348[param_1 * 0x58]), local_44, DAT_0063eb10, param_2, param_3);
    FUN_005cef31(local_44, DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
    local_8 = local_8 + 1;
  }

  for (let local_c = 0; local_c < DAT_006a6604; local_c = local_c + 1) {
    FUN_00448f92(s8(DAT_0064f348[param_1 * 0x58]), local_54, DAT_0063eb10, param_2, param_3);
    FUN_004e75a6(param_1, local_c);
    FUN_005cef31(local_54, DAT_0063eb10, param_2, param_3);
    param_2 = param_2 + local_10;
  }
  return local_10;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042da1d — draw_happiness_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042da1d() {
  // DEVIATION: Win32 API — happiness advisor window drawing (1634 bytes)
  // Game state reads: DAT_0063ef6c, DAT_00655aee, DAT_00655b18, DAT_0064f394,
  //   DAT_0064f348, DAT_0064f349, DAT_0064f360, DAT_0064f392, DAT_0064f393,
  //   DAT_0064c6b5
  // Game state writes: DAT_00655aee &= 0xfffb, DAT_0063ef80, _DAT_0063ef78,
  //   _DAT_0063ef7c, DAT_0063ef74, _DAT_0063ef68, DAT_0063ef70, DAT_0063efa8
  // Calls FUN_0042d781 for citizen icons, FUN_004eb4ed for recalc
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e07f — scroll_happiness_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e07f(param_1) {
  DAT_0063ef70 = param_1;
  FUN_0042da1d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e09c — happiness_advisor_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e09c(param_1, param_2) {
  if ((-1 < param_2 - _DAT_0063ef78) &&
     ((param_2 - _DAT_0063ef78) / DAT_0063ef80 < DAT_0063ef74)) {
    let iVar1 = (param_2 - _DAT_0063ef78) / DAT_0063ef80;
    let local_8 = 0;
    for (let local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
      if (((s32(DAT_0064f394, local_c * 0x58) !== 0) &&
          (s8(DAT_0064f348[local_c * 0x58]) === DAT_0063ef6c))) {
        if (local_8 === iVar1 + DAT_0063ef70) {
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
  DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(DAT_0063eb10, 0x402838);
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e1e8 — append_unit_flag_string
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e1e8(param_1) {
  if (DAT_0063e4f4 !== 0) {
    FUN_00421d30();
  }
  DAT_0063e4f4 = 1;
  FUN_0040bc10(param_1);
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042e220 — draw_military_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042e220() {
  // DEVIATION: Win32 API — military advisor window drawing (3523 bytes)
  // Game state reads: DAT_0063ef6c, DAT_0063efac (view mode toggle),
  //   DAT_0064b1bc/bd/c1/c2/c4/c5/c6/c7/c8/c9 (unit type stats),
  //   DAT_0064c778/c7f4/c7b6 (civ unit counts), DAT_0064c6c0 (diplomacy),
  //   DAT_006d1da0 (current player), DAT_0063e4f4 (string state),
  //   DAT_00628420 (string table)
  // Game state writes: DAT_0063ef80, _DAT_0063ef78, _DAT_0063ef7c,
  //   DAT_0063ef74, _DAT_0063ef68, DAT_0063ef70, DAT_0063efa8, DAT_0063e4f4
  // Two view modes: own units (DAT_0063efac==0) or foreign units (!=0)
  // Calls FUN_0042e1e8 for unit flag strings, FUN_00453e51 for tech checks
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042efe3 — scroll_military_advisor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042efe3(param_1) {
  DAT_0063ef70 = param_1;
  FUN_0042e220();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042f000 — toggle_military_advisor_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042f000() {
  DAT_0063efac = (DAT_0063efac === 0) ? 1 : 0;
  if (DAT_0063efac === 0) {
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
  // DEVIATION: Win32 API — opens military advisor dialog (538 bytes)
  show_credits(2, 2, 0, 600, 400, 0, 0);
  DAT_0063ef6c = param_1;
  DAT_0063efac = 0;
  // DEVIATION: Win32 API — creates scrollbar, 2 toggle buttons
  // FUN_004086c0, FUN_00407fc0, FUN_0043c790 for layout
  // FUN_0040f680/f880/f7d0/f840 for controls
  // FUN_0043c5f0 for toggle button state
  // CPropertySheet::EnableStackedTabs for tab setup
  FUN_005bb574();
  FUN_004085f0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0042f293 — draw_foreign_minister_advisor (large UI function)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0042f293() {
  // DEVIATION: Win32 API — foreign minister advisor window drawing (4042 bytes)
  // Game state reads: DAT_0063ef6c (current civ), DAT_0063efac (view mode),
  //   DAT_0064c6a6 (leader index), DAT_006554f8/f9/fa (govt modifiers),
  //   DAT_0064c6c0/c1 (diplomacy states), DAT_0064c6aa (research),
  //   DAT_0064c706 (treasury), DAT_006d1da0 (active player),
  //   DAT_0064c6b5 (government), DAT_00655b08 (difficulty),
  //   DAT_00655b0a (active civs bitmask), DAT_00655afa (year),
  //   DAT_006d1da0 (current player), DAT_00627684 (wonder icons),
  //   DAT_0064b168/b9a0/b9c0 (resource data), DAT_0064b114
  // Game state writes: DAT_0063ef80, _DAT_0063ef78, _DAT_0063ef7c,
  //   DAT_0063ef74, _DAT_0063ef68, _DAT_0063ef90, DAT_0063ef94,
  //   DAT_0063ef98, DAT_0063ef8c, DAT_0063ef70, DAT_0063efa8
  // Shows diplomatic relations, tech knowledge per civ
}
