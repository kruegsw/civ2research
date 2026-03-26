// ═══════════════════════════════════════════════════════════════════
// block_00410000.js — Mechanical transpilation of block_00410000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00410000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00410000.c
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
import { FUN_004079a6, FUN_00407b31, FUN_00407f90, FUN_00407fc0, FUN_00408090, FUN_004080c0 } from './block_00400000.js';
import { FUN_004080f0, FUN_00408130, FUN_00408170, FUN_00408230, FUN_004082f0, FUN_00408330 } from './block_00400000.js';
import { FUN_00408370, FUN_004083b0, FUN_00408460, FUN_004085f0, FUN_004086c0, FUN_00408d33 } from './block_00400000.js';
import { FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc40, FUN_0040bc80, FUN_0040bcb0 } from './block_00400000.js';
import { FUN_0040ddc6, FUN_0040e017, FUN_0040e3b1, FUN_0040ef50, FUN_0040ef70, FUN_0040f010 } from './block_00400000.js';
import { FUN_0040f350, FUN_0040f3e0, FUN_0040f480, FUN_0040f510, FUN_0040f570, FUN_0040f610 } from './block_00400000.js';
import { FUN_0040f680, FUN_0040f730, FUN_0040f840, FUN_0040f880, FUN_0040fdb0, FUN_0040fe10 } from './block_00400000.js';
import { FUN_0040fe40, FUN_0040fea0, FUN_0040fed0, FUN_0040ff00, FUN_0040ff30, FUN_0040ff60 } from './block_00400000.js';
import { FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00421bb0, FUN_00421bd0, FUN_00421c30, FUN_00421c60, FUN_00421ca0, FUN_00421d30 } from './block_00420000.js';
import { FUN_00421d60, FUN_00421da0, FUN_00421dd0, FUN_00421e40, FUN_00421e70, FUN_00421ea0 } from './block_00420000.js';
import { FUN_00421ed0, FUN_00421f10, FUN_00421f40, FUN_00428a0f, FUN_00428a78, FUN_00428a95 } from './block_00420000.js';
import { FUN_00428b0c, FUN_00428b68, FUN_00429e77, FUN_0042a768, FUN_0042b67d, FUN_0042cd2f } from './block_00420000.js';
import { FUN_0042d71e, FUN_0042e185, FUN_0042f079 } from './block_00420000.js';
import { FUN_004308ae, FUN_00431c73, FUN_00431d22, FUN_00433122, FUN_00434d8a, FUN_00435d15 } from './block_00430000.js';
import { FUN_004361cc, FUN_00436bb7, FUN_00437a4a, FUN_0043856b, FUN_0043cef9, FUN_0043cf76 } from './block_00430000.js';
import { FUN_0044b49e, FUN_0044cc80, FUN_0044cd9b } from './block_00440000.js';
import { FUN_00453f90 } from './block_00450000.js';
import { FUN_00467825, FUN_0046a740, FUN_0046b14d, FUN_0046e020, FUN_0046e4a9, FUN_0046e6a9 } from './block_00460000.js';
import { FUN_0046e6c8 } from './block_00460000.js';
import { FUN_004729ab, FUN_00473e55, FUN_00479ede, FUN_0047a540, FUN_0047a6b0, FUN_0047cbb4 } from './block_00470000.js';
import { FUN_0047cd51, FUN_0047cf9e, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d3b, FUN_00484d52, FUN_00484fec, FUN_004897fa, FUN_00489a0d, FUN_0048b340 } from './block_00480000.js';
import { FUN_0048bfec, FUN_0048c9f3 } from './block_00480000.js';
import { FUN_00491c20, FUN_00493602, FUN_0049376f, FUN_00493b10, FUN_00493ba6, FUN_00493c7d } from './block_00490000.js';
import { FUN_00493d13, FUN_00493e83, FUN_004941ee, FUN_0049836a, FUN_00498784, FUN_00498a5c } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a24b1, FUN_004a2534, FUN_004a257a } from './block_004A0000.js';
import { FUN_004a25aa, FUN_004a25d5, FUN_004a26bf, FUN_004a5d92, FUN_004a6cc5, FUN_004a733d } from './block_004A0000.js';
import { FUN_004a73d9, FUN_004a9785, FUN_004aa9c0, FUN_004aef20, FUN_004aef57, FUN_004af174 } from './block_004A0000.js';
import { FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b0720, FUN_004b07d1, FUN_004b0a0a, FUN_004b4735, FUN_004b7645, FUN_004b768d } from './block_004B0000.js';
import { FUN_004b7eb6 } from './block_004B0000.js';
import { FUN_004c4e6d, FUN_004ca39e, FUN_004ccab9, FUN_004ccb6a, FUN_004ccdb6, FUN_004ccdef } from './block_004C0000.js';
import { FUN_004da9e2, FUN_004db23f, FUN_004db450 } from './block_004D0000.js';
import { FUN_004e068d, FUN_004e0ab0, FUN_004e0d71, FUN_004e0f18, FUN_004e1314, FUN_004e1452 } from './block_004E0000.js';
import { FUN_004e22c9, FUN_004e2597, FUN_004e4ceb } from './block_004E0000.js';
import { FUN_004f4b9f, FUN_004f5dd1, FUN_004fa5d9 } from './block_004F0000.js';
import { FUN_005013bc } from './block_00500000.js';
import { FUN_00516570, FUN_0051c635, FUN_0051d3e0, FUN_0051d564, FUN_0051d63b, FUN_0051d7bc } from './block_00510000.js';
import { FUN_0051d7d6, FUN_0051d817, FUN_0051d9a0, FUN_0051dd97, FUN_0051f19c } from './block_00510000.js';
import { FUN_0052182c, FUN_005218cb, FUN_00521fe0, FUN_0052263c, FUN_005226fa, FUN_005227e3 } from './block_00520000.js';
import { FUN_00522b2b, FUN_00522dfa, FUN_00522f8f, FUN_00523d8a } from './block_00520000.js';
import { FUN_0054ffc8 } from './block_00540000.js';
import { FUN_00551fed, FUN_00552112, FUN_0055318c, FUN_0055324c, FUN_005534bc, FUN_00553ff6 } from './block_00550000.js';
import { FUN_00554297, FUN_00554423, FUN_005545d3, FUN_00554962, FUN_0055499f, FUN_005551b3 } from './block_00550000.js';
import { FUN_0055560f, FUN_0055583f, FUN_00555a02, FUN_00555a8b, FUN_00555cb1, FUN_0055615c } from './block_00550000.js';
import { FUN_0055625b, FUN_00556f54, FUN_005582ad, FUN_0055891d, FUN_0055a41d, FUN_0055a567 } from './block_00550000.js';
import { FUN_0055a5e4, FUN_0055a64a, FUN_0055ae80, FUN_0055b2c6, FUN_0055b3c8, FUN_0055b3fd } from './block_00550000.js';
import { FUN_00568381, FUN_00568f43, FUN_0056a65e, FUN_0056aacb, FUN_0056ac46, FUN_0056d289 } from './block_00560000.js';
import { FUN_00573e59, FUN_00578c12, FUN_005792e1, FUN_005793a3, FUN_0057940d } from './block_00570000.js';
import { FUN_0058760d, FUN_00589a5b, FUN_00589c79, FUN_00589d80, FUN_00589ef8, FUN_0058bd60 } from './block_00580000.js';
import { FUN_0058bd84, FUN_0058bdfd, FUN_0058be56, FUN_0058c295, FUN_0058c65e, FUN_0058cbe1 } from './block_00580000.js';
import { FUN_0058cce6, FUN_0058cde5, FUN_0058cfcd, FUN_0058d442, FUN_0058d60a, FUN_0058d6af } from './block_00580000.js';
import { FUN_0058ddce, FUN_0058df14, FUN_0058df7b } from './block_00580000.js';
import { FUN_0059062c, FUN_00598b4e, FUN_0059a6f0, FUN_0059a998, FUN_0059b293, FUN_0059d3c9 } from './block_00590000.js';
import { FUN_0059d401, FUN_0059d487, FUN_0059d4df, FUN_0059db08, FUN_0059df8a, FUN_0059e783 } from './block_00590000.js';
import { FUN_0059e7ad, FUN_0059e8db, FUN_0059e9f3, FUN_0059ea4d, FUN_0059ea99, FUN_0059ec88 } from './block_00590000.js';
import { FUN_0059edf0, FUN_0059f06d } from './block_00590000.js';
import { FUN_005a5f34, FUN_005a632a, FUN_005a6c23, FUN_005a6c45, FUN_005a9abf, FUN_005a9afe } from './block_005A0000.js';
import { FUN_005adfa0, FUN_005ae1b0 } from './block_005A0000.js';
import { FUN_005b1a29, FUN_005b2e69, FUN_005b8416, FUN_005b85fe, FUN_005b8783, FUN_005b8b65 } from './block_005B0000.js';
import { FUN_005b8d62, FUN_005b8da4, FUN_005b976d, FUN_005b9ec6, FUN_005b9f1c, FUN_005badf0 } from './block_005B0000.js';
import { FUN_005baeb0, FUN_005baec8, FUN_005baee0, FUN_005bb024, FUN_005bb574, FUN_005bbb32 } from './block_005B0000.js';
import { FUN_005bc3f1, FUN_005bc96b, FUN_005bcfdd, FUN_005bd533, FUN_005bd550, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bd915, FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0bf2, FUN_005c61b0, FUN_005c62ee, FUN_005c64da, FUN_005c656b, FUN_005c841d } from './block_005C0000.js';
import { FUN_005cd775, FUN_005cde4d, FUN_005cdea1, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d1f50, FUN_005d2004, FUN_005d2279, FUN_005d237d, FUN_005d2550, FUN_005d2568 } from './block_005D0000.js';
import { FUN_005d2590, FUN_005d25a8, FUN_005d268e, FUN_005d2d3d, FUN_005d356e, FUN_005d3c40 } from './block_005D0000.js';
import { FUN_005d417f, FUN_005d4197, FUN_005d41af, FUN_005d48d0, FUN_005d687b, FUN_005d7c00 } from './block_005D0000.js';
import { FUN_005d8236 } from './block_005D0000.js';
import { FUN_005f2260 } from './block_005F0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_006076a0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

let _DAT_0066ca84 = 0;
let _DAT_0066c98c = 0;
let _DAT_006c31b0 = 0;
let _DAT_006c31b4 = 0;
let _DAT_006c31b8 = 0;
let _DAT_006c31cc = 0;
let _DAT_0062514c = 0;
let _DAT_00655af6 = 0;

// String constants (stub)
const s_CITYINFO_00624f6c = 'CITYINFO';
const s_REALLYQUIT_00625084 = 'REALLYQUIT';
const s_HOTSEAT1_006252a4 = 'HOTSEAT1';
const s_HOTSEATNOT_006252b0 = 'HOTSEATNOT';
const s_COSMIC_006252cc = 'COSMIC';
const s_CIVILIZE_006252d4 = 'CIVILIZE';
const s_IMPROVE_006252ec = 'IMPROVE';
const s_ENDWONDER_006252f4 = 'ENDWONDER';
const s_UNITS_00625300 = 'UNITS';
const s_TERRAIN_00625310 = 'TERRAIN';
const s_GOVERNMENTS_00625318 = 'GOVERNMENTS';
const s_LEADERS_00625324 = 'LEADERS';
const s_CARAVAN_0062532c = 'CARAVAN';
const s_ORDERS_00625334 = 'ORDERS';
const s_DIFFICULTY_0062533c = 'DIFFICULTY';
const s_ATTITUDES_00625348 = 'ATTITUDES';
const s_DIFFICULTY_006254a8 = 'DIFFICULTY';
const s_ENEMIES_006254b4 = 'ENEMIES';
const s_BARBARITY_006254bc = 'BARBARITY';
const s_RULES_006254c8 = 'RULES';
const s_ADVANCED_006254d0 = 'ADVANCED';
const s_ACCELERATED_006254dc = 'ACCELERATED';
const s_GENDER_006254e8 = 'GENDER';
const s_SIZEOFMAP_0062553c = 'SIZEOFMAP';
const s_CUSTOMLAND_0062555c = 'CUSTOMLAND';
const s_CUSTOMFORM_00625568 = 'CUSTOMFORM';
const s_CUSTOMCLIMATE_00625574 = 'CUSTOMCLIMATE';
const s_CUSTOMTEMP_00625584 = 'CUSTOMTEMP';
const s_CUSTOMAGE_00625590 = 'CUSTOMAGE';
const s_CUSTOMCITY_00625524 = 'CUSTOMCITY';
const s_OPPONENT_00625530 = 'OPPONENT';
const s_CUSTOMTRIBE_00625500 = 'CUSTOMTRIBE';
const s_CUSTOMTRIBE2_0062550c = 'CUSTOMTRIBE2';
const s_MAINMENU_0062565c = 'MAINMENU';
const s_SCENARIOLOADED_006255ec = 'SCENARIOLOADED';
const s_DIFFICULTY_006255fc = 'DIFFICULTY';
const s_GENDER_00625608 = 'GENDER';
const s_GENDER_0062563c = 'GENDER';
const s_FAILEDTOLOAD_006255ac = 'FAILEDTOLOAD';
const s_FAILEDTOLOAD_006255bc = 'FAILEDTOLOAD';
const s_USESEED_006255cc = 'USESEED';
const s_USESTARTLOC_006255d4 = 'USESTARTLOC';
const s_HERALDWARNING_00625458 = 'HERALDWARNING';
const s_WRONGXDAEMONVERSION_00625678 = 'WRONGXDAEMONVERSION';
const s_NEWCREDITS_0062568c = 'NEWCREDITS';
const s_SIMULTUT_0062587c = 'SIMULTUT';
const s_CIVILIZE_006251d0 = 'CIVILIZE';
const s_STRINGHEAP_00625410 = 'STRINGHEAP';
const s_STRINGHEAP_00625618 = 'STRINGHEAP';
const s_EDITORPT_GIF_00625258 = 'EDITORPT.GIF';
const s_RULES_006253f0 = 'RULES';
const s_RULES_00625654 = 'RULES';
const PTR_FUN_0061c058 = 0;
const PTR_DAT_00637e6c = 0;
const PTR_DAT_00637e70 = 0;
const PTR_DAT_006359f0 = 0;
const PTR_s_LABELS_00627674 = 0;


// ═══════════════════════════════════════════════════════════════════
// C standard library stubs
// ═══════════════════════════════════════════════════════════════════

function _rand() { return Math.floor(Math.random() * 0x7FFF); }
function _strlen(s) { return s ? s.length : 0; }
function _atoi(s) { return parseInt(s, 10) || 0; }
function _sprintf() { /* no-op stub */ }
function _strncpy() { /* no-op stub */ }
function _fputs() { /* no-op stub */ }
function _fopen() { return null; }
function _fclose() { /* no-op */ }
function _memset() { /* no-op */ }
function _isalpha(c) { return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A) ? 1 : 0; }
function _atexit() { /* no-op */ }
function __getcwd() { /* no-op */ }
function __chdir() { /* no-op */ }

// Win32 API stubs
function GetAsyncKeyState() { return 0; }
function GetPrivateProfileIntA() { return 0; }
function WritePrivateProfileStringA() { /* no-op */ }
function SetFocus() { /* no-op */ }
function MessageBoxA() { /* no-op */ }
function timeBeginPeriod() { /* no-op */ }
function timeEndPeriod() { /* no-op */ }
function XD_InFlushSendBuffer() { return 0; }
function XD_FlushSendBuffer() { /* no-op */ }
function XD_GetXDaemonVersion() { /* no-op */ }
function XD_LaunchedByLobby() { return -3; }
function XD_LobbySendMessage() { return 0; }
function CString_CString() { /* no-op */ }
function operator_new(sz) { return new Uint8Array(sz); }
function FID_conflict___toupper_lk(c) { return (c >= 0x61 && c <= 0x7A) ? c - 0x20 : c; }
function CSplitterWnd_IsTracking() { return 0; }
function CPropertySheet_EnableStackedTabs() { /* no-op */ }
function CRichEditDoc_InvalidateObjectCache() { /* no-op */ }
function COleCntrFrameWnd_destroy() { /* no-op */ }
function CSocket_Create() { return 0; }
function Realloc() { return 0; }
function _Timevec_destroy() { /* no-op */ }
function _eh_vector_constructor_iterator_() { /* no-op */ }
function _eh_vector_destructor_iterator_() { /* no-op */ }


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks not yet defined.
// ═══════════════════════════════════════════════════════════════════

function FUN_00509590() { /* stub – handle_city_disorder */ }
function FUN_005ab2d5() { return 0; /* stub – wait_production */ }
function FUN_005aa0e5() { /* stub – wait_production */ }
function show_messagebox_CF2D() { return 0; /* stub */ }
function show_open_dialog_31D2() { return 0; /* stub */ }
function debug_log() { /* stub */ }
function save_game() { /* stub */ }
function load_labels_txt() { /* stub */ }
function load_verify_units() { return 0; /* stub */ }
function load_civ2_art_005681c9() { /* stub */ }
function load_city_preferences() { /* stub */ }
function create_font_8200() { return 0; /* stub */ }
function gdi_847F() { return 0; /* stub */ }
function update_palette_C280() { /* stub */ }
function register_wndclass_2740() { return 0; /* stub */ }
function register_wndclass_3130() { return 0; /* stub */ }
function register_wndclass_37A0() { return 0; /* stub */ }
function send_msg_2D7F() { /* stub */ }
function send_msg_2D4D() { /* stub */ }
function send_msg_2DA1() { /* stub */ }
function send_msg_35C8() { /* stub */ }
function send_msg_357E() { /* stub */ }
function send_msg_360A() { /* stub */ }
function send_msg_36B1() { /* stub */ }
function send_msg_36F6() { /* stub */ }
function send_msg_3C50() { /* stub */ }
function send_msg_3C9A() { /* stub */ }
function send_msg_3CDC() { /* stub */ }
function citywin_9545() { /* stub */ }
function citywin_994F() { /* stub */ }
function citywin_B9A4() { /* stub */ }
function citywin_BA07() { /* stub */ }
function citywin_BA6A() { /* stub */ }
function citywin_BC4F() { /* stub */ }
function citywin_BD13() { /* stub */ }
function citywin_BF72() { /* stub */ }
function citywin_DCB6() { /* stub */ }
function citywin_DEA8() { /* stub */ }
function city_button_buy() { /* stub */ }
function city_button_change() { /* stub */ }
function city_button_rename() { /* stub */ }
function city_button_view() { /* stub */ }
function set_city_shields() { /* stub */ }
// FUN_004361cc (duplicate stub removed)
// FUN_00516570 (duplicate stub removed)
// FUN_0055b3fd (duplicate stub removed)


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS — block 0x00410000..0x0041FFFF
// ═══════════════════════════════════════════════════════════════════

// FUN_00410030 — show_dialog_wrapper
export function FUN_00410030(param_1, param_2, param_3) {
  FUN_0051d564(G.DAT_006359d4, param_1, 0, param_2, param_3);
}

// FUN_00410070 — get_civ_name_color
export function FUN_00410070(param_1) {
  return FUN_00493d13(param_1);
}

// FUN_004100a0 — draw_helper_wrapper
export function FUN_004100a0(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_0056d289(param_2, param_3, 0, param_5 + 2, param_6, 0);
}

// FUN_004100cf — show_city_info_dialog
export function FUN_004100cf(param_1) {
  FUN_0059db08(0x4000);
  FUN_005cdea1(0x40, 0x30, 0);
  FUN_0040ff60(0, G.DAT_0064f360[param_1 * 0x58]);
  FUN_0040bbb0();
  let uVar1 = FUN_00410070(s8(G.DAT_0064f348[param_1 * 0x58]));
  FUN_0040bbe0(uVar1);
  if (((G.DAT_00655af0 & 0x80) !== 0) && ((G.DAT_0064bc60 & 2) !== 0)) {
    let iVar2 = FUN_0043cef9(param_1);
    if (iVar2 !== 0) {
      FUN_0040fe10();
      FUN_0040bc10(0x1b0);
      if (1 < iVar2) {
        FUN_0040bbe0(0x624f68); // G.DAT_00624f68
        FUN_0040ff30(iVar2);
      }
    }
  }
  FUN_0040ff60(1, G.DAT_00679640);
  for (let local_34c = 0; local_34c < 3; local_34c = local_34c + 1) {
    let local_14 = s8(G.DAT_0064f37e[param_1 * 0x58 + local_34c]) & 0xFF;
    FUN_0040bbb0();
    if (s8(local_14) < 0) {
      FUN_0040fea0();
    }
    let local_350;
    if (s8(local_14) < 1) {
      local_350 = (~local_14 + 1) >>> 0;
    } else {
      local_350 = local_14;
    }
    FUN_0040ff00(G.DAT_0064b168[local_350]);
    if (s8(local_14) < 0) {
      FUN_0040fed0();
    }
    FUN_0040ff60(local_34c + 2, G.DAT_00679640);
  }
  FUN_00414dd0(s_CITYINFO_00624f6c, param_1);
  FUN_004102d5();
  FUN_004102e1();
  FUN_004102f4();
}

// FUN_004102d5 — cleanup_dialog_buffer
export function FUN_004102d5() {
  FUN_0059df8a();
}

// FUN_004102e1 — restore_gdi_state
export function FUN_004102e1() {
  FUN_005cde4d();
}

// Source: decompiled/block_00410000.c FUN_004102f4 (14 bytes)
// FUN_004102f4 — restore_seh_frame (no-op in JS)
export function FUN_004102f4() {
  // DEVIATION: Win32 — *unaff_FS_OFFSET = *(unaff_EBP + -0xc) — SEH frame restore
}

// FUN_00410302 — redraw_map_window
export function FUN_00410302() {
  FUN_0047cbb4(G.DAT_0064b1b4 | 0, G.DAT_0064b1b0 | 0, 0, G.DAT_006d1da0, 1);
}

// FUN_0041033a — redraw_all_map_windows
export function FUN_0041033a() {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if ((local_8 === 0) || (G.DAT_0066ca84[(local_8 * 0x3f0) / 2] !== 0)) {
      FUN_00410302();
    }
  }
}

// FUN_004103ae — refresh_map_window
export function FUN_004103ae() {
  citywin_9545();
  FUN_005c62ee();
  FUN_0047cd51(G.DAT_006d1da0, 1);
}

// FUN_00410402 — set_map_center
export function FUN_00410402(param_1, param_2) {
  let in_ECX = 0; // thiscall context — stub
  let uVar2 = FUN_005ae052(param_1);
  // *(in_ECX + 0x2e0) = uVar2; *(in_ECX + 0x2e2) = param_2; — window state
  let uVar1 = G.DAT_0062804c;
  G.DAT_0062804c = 0;
  FUN_0047cd51(G.DAT_006d1da0, 1);
  G.DAT_0062804c = uVar1;
}

// FUN_00410464 — scroll_map_if_needed
export function FUN_00410464(param_1, param_2) {
  // DEVIATION: thiscall — in_ECX is a window object pointer
  let local_c = 0;
  let in_ECX = 0;
  let iVar1 = 0; // *(in_ECX + 0x2e8)
  let iVar2 = 0; // *(in_ECX + 0x2ec)
  if ((((G.DAT_00655ae8 & 0x8000) === 0) && (param_1 <= 0 * 2)) &&
     ((G.DAT_006d1160 | 0) + 0 * -2 <= iVar1)) {
    param_1 = param_1 + (G.DAT_006d1160 | 0);
  }
  let iVar3 = 0; // *(in_ECX + 0x300)
  let iVar4 = 0; // *(in_ECX + 0x2f4)
  if (0 === 0) { // *(in_ECX + 0x330)
    if ((G.DAT_00655ae8 & 0x8000) !== 0) {
      param_1 = FUN_005adfa0(param_1, 2, (G.DAT_006d1160 | 0) + -3);
    }
    if ((param_1 <= iVar1 + 1) || (iVar3 * 2 + iVar1 + -3 <= param_1)) {
      local_c = 1;
    }
  }
  if ((0 === 0) && // *(in_ECX + 0x334)
     ((param_2 = FUN_005adfa0(param_2, 2, (G.DAT_006d1162 | 0) + -3), param_2 <= iVar2 + 1 ||
      (iVar4 + -1 <= param_2)))) {
    local_c = 1;
  }
  if (local_c !== 0) {
    G.DAT_0062805c = 1;
    G.DAT_00628054 = G.DAT_006d1da8 === 0 ? 1 : 0;
    FUN_00410402(param_1, param_2);
  }
  return local_c;
}

// FUN_004105f8 — scroll_all_maps
export function FUN_004105f8(param_1, param_2, param_3) {
  let local_c = 1;
  G.DAT_006ad908 = 1;
  let uVar1;
  if (param_3 < 0) {
    uVar1 = 3;
  } else if (G.DAT_006d1da0 === param_3) {
    uVar1 = 1;
  } else {
    uVar1 = 2;
  }
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if ((local_8 === 0) || (G.DAT_0066ca84[(local_8 * 0x3f0) / 2] !== 0)) {
      if ((uVar1 & G.DAT_0066ca86[local_8 * 0x3f0]) === 0) {
        local_c = 0;
      } else {
        let uVar2 = FUN_00410464(param_1, param_2);
        local_c = local_c & uVar2;
      }
    }
  }
  G.DAT_006ad908 = 0;
  return local_c;
}

// FUN_004106fd — hit_test_map_direction
export function FUN_004106fd(param_1, param_2, param_3, param_4) {
  // DEVIATION: thiscall — in_ECX is a window object pointer
  let iVar1;
  let in_ECX = 0;
  let local_18 = [0, 0];
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  FUN_0047a6b0(local_18, { v: local_8 }, param_3, param_4);
  local_8 = local_18[1] || 0; // out param
  if (((param_1 | 0) < local_18[0]) || ((param_2 | 0) < local_8)) {
    iVar1 = 8;
  } else if (((param_1 | 0) < 0 + local_18[0]) && // *(in_ECX + 0x308)
            ((param_2 | 0) < 0 + local_8)) { // *(in_ECX + 0x30c)
    local_c = (param_1 | 0) - local_18[0];
    local_10 = (param_2 | 0) - local_8;
    param_1 = (param_1 | 0) - 0; // *(in_ECX + 0x124)
    param_2 = (param_2 | 0) - 0; // *(in_ECX + 0x128)
    if (((param_1 | 0) < 0) || ((param_2 | 0) < 0)) {
      iVar1 = 8;
    } else if (((param_1 | 0) < 0) && ((param_2 | 0) < 0)) { // *(in_ECX + 0x12c), *(in_ECX + 0x130)
      iVar1 = FUN_005c0bf2(local_c, local_10);
      iVar1 = (iVar1 + -10) >> 4;
    } else {
      iVar1 = 8;
    }
  } else {
    iVar1 = 8;
  }
  return iVar1;
}

// FUN_00410835 — update_cursor_shape
export function FUN_00410835(param_1, param_2) {
  let iVar1;
  let local_20 = 0;
  let local_1c = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = FUN_005c62ee();
  if (local_c === 0) {
    local_c = 0;
  } else {
    local_c = local_c + -0x48;
  }
  if ((G.DAT_0062edf8 === 0) && (0x1fe !== 0x1fe)) { // *(local_c + 0x358) check
    iVar1 = FUN_00410e0a();
    if (iVar1 === 0) {
      local_10 = 0x201;
      if (((((G.DAT_00655aea & 0x80) !== 0) && (G.DAT_006d1da8 === 1)) &&
          (local_1c = G.DAT_00655afe | 0, -1 < local_1c)) &&
         ((local_14 = FUN_004106fd(param_1, param_2,
                                    G.DAT_006560f0[(local_1c * 0x20) / 2] | 0,
                                    G.DAT_006560f2[(local_1c * 0x20) / 2] | 0),
          -1 < local_14 && (local_14 < 8)))) {
        local_10 = ((local_14 + 1) & 7) + 500;
      }
    } else {
      local_10 = 0x202;
      local_1c = G.DAT_00655afe | 0;
      iVar1 = FUN_0047a540({ v: local_20 }, { v: local_18 }, param_1, param_2);
      if (iVar1 !== 0) {
        return;
      }
      iVar1 = FUN_004087c0(local_20, local_18);
      if (iVar1 === 0) {
        return;
      }
      iVar1 = FUN_005ae1b0(local_20, local_18, G.DAT_006560f0[(local_1c * 0x20) / 2] | 0,
                           G.DAT_006560f2[(local_1c * 0x20) / 2] | 0);
      if ((G.DAT_0064bcdb & 0xff) < iVar1) {
        local_10 = 0x203;
      } else {
        iVar1 = FUN_005b89e4(local_20, local_18);
        if (iVar1 === 0) {
          local_14 = FUN_005b8d62(local_20, local_18);
          if ((-1 < local_14) && (s8(G.DAT_006560f7[local_1c * 0x20]) !== local_14)) {
            local_10 = 0x203;
          }
        } else {
          local_10 = 0x203;
        }
      }
    }
    // *(local_c + 0x358) state update — DEVIATION: thiscall
    FUN_00414b70(local_10, 1);
  }
}

// FUN_00410a64 — cancel_pending_timer
export function FUN_00410a64() {
  if (-1 < G.DAT_00624f54) {
    FUN_005d2004(G.DAT_00624f54);
    G.DAT_00624f54 = -1;
  }
  if ((-1 < G.DAT_00624f58) && (G.DAT_0066cb00 === 0x1fe)) { // (&G.DAT_0066cb00)[G.DAT_00624f58 * 0xfc]
    G.DAT_0066cb00 = 0x201; // (&G.DAT_0066cb00)[G.DAT_00624f58 * 0xfc]
    FUN_00414b70(0x201, 1);
    FUN_00414d40();
  }
  G.DAT_00624f58 = -1;
}

// FUN_00410b23 — start_goto_mode
export function FUN_00410b23() {
  if (-1 < G.DAT_00624f54) {
    FUN_005d2004(G.DAT_00624f54);
    G.DAT_00624f54 = -1;
    if (-1 < G.DAT_00624f58) {
      G.DAT_0066cb00 = 0x1fe; // (&G.DAT_0066cb00)[G.DAT_00624f58 * 0xfc]
      FUN_00414b70(0x1fe, 1);
      FUN_00414ce0();
    }
  }
}

// FUN_00410bc3 — handle_map_mouse_down
export function FUN_00410bc3() {
  if ((G.DAT_0062edf8 === 0) && ((G.DAT_00655b02 === 0) || (G.DAT_006ad8d4 === 0))) {
    G.DAT_006ad8d4 = 1;
    let local_8 = FUN_005c62ee();
    if (local_8 === 0) {
      local_8 = 0;
    } else {
      local_8 = local_8 + -0x48;
    }
    FUN_00410a64();
    if ((G.DAT_006d1da8 === 1) && (FUN_00410e0a() === 0)) {
      G.DAT_00624f58 = 0; // DEVIATION: thiscall — *(local_8 + 0x2d8)
      let SVar1 = GetAsyncKeyState(0x10); // DEVIATION: Win32
      if (s8((SVar1 & 0xffff) >> 8) === 0) {
        G.DAT_00624f54 = FUN_005d1f50(0, 400, 1);
      } else {
        G.DAT_0066cb00 = 0x1fe; // (&G.DAT_0066cb00)[G.DAT_00624f58 * 0xfc]
        FUN_00414b70(0x1fe, 1);
        FUN_00414ce0();
      }
    }
    G.DAT_006ad8d4 = 0;
  }
}

// FUN_00410cfa — handle_map_mouse_up
export function FUN_00410cfa() {
  if ((G.DAT_0062edf8 === 0) && ((G.DAT_00655b02 === 0) || (G.DAT_006ad8d4 === 0))) {
    G.DAT_006ad8d4 = 1;
    FUN_005c62ee();
    if (-1 < G.DAT_00624f54) {
      FUN_00410a64();
    }
    FUN_00414d40();
    G.DAT_006ad8d4 = 0;
  }
}

// FUN_00410d98 — center_on_tile
export function FUN_00410d98(param_1, param_2) {
  let iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 !== 0) {
    G.DAT_00628054 = 0;
    FUN_00410302();
    G.DAT_0064b1b4 = param_1 & 0xFFFF;
    G.DAT_0064b1b0 = param_2 & 0xFFFF;
    FUN_0056a65e(1);
    G.DAT_00628054 = 1;
    FUN_00410302();
  }
  return iVar1 !== 0;
}

// FUN_00410e0a — is_goto_or_airlift_mode
export function FUN_00410e0a() {
  if ((G.DAT_0066cb00 === 0x202) || (G.DAT_0066cb00 === 0x203)) {
    return 1;
  }
  return 0;
}

// FUN_00410e46 — set_all_windows_goto_mode
export function FUN_00410e46() {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if ((local_8 === 0) || (G.DAT_0066ca84[(local_8 * 0x3f0) / 2] !== 0)) {
      G.DAT_0066cb00 = 0x202; // (&G.DAT_0066cb00)[local_8 * 0xfc]
      FUN_00414b70(0x202, 1);
    }
  }
}

// FUN_00410ed8 — cancel_goto_mode
export function FUN_00410ed8() {
  let iVar1 = FUN_00410e0a();
  if (iVar1 !== 0) {
    for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
      if ((local_8 === 0) || (G.DAT_0066ca84[(local_8 * 0x3f0) / 2] !== 0)) {
        G.DAT_0066cb00 = 0x201; // (&G.DAT_0066cb00)[local_8 * 0xfc]
        FUN_00414b70(0x201, 1);
      }
    }
  }
}

// map_window_click — handle left/right click on map
export function map_window_click(param_1, param_2, param_3) {
  let iVar1;
  let local_24 = 0;
  let local_20 = 0;
  let local_1c = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  if ((G.DAT_00655b02 !== 0) && (G.DAT_006ad8d4 !== 0)) return;
  iVar1 = XD_InFlushSendBuffer(); // DEVIATION: Win32
  if (iVar1 === 0 &&
      G.DAT_006ad8bc === 0 && G.DAT_006ad8c0 === 0 && G.DAT_006ad8c4 === 0 &&
      G.DAT_006ad8c8 === 0 && G.DAT_006ad8cc === 0 && G.DAT_006ad8d0 === 0 &&
      G.DAT_006ad8d8 === 0 && G.DAT_006ad8dc === 0 && G.DAT_006ad8e0 === 0 &&
      G.DAT_006ad8e4 === 0 && G.DAT_006ad8e8 === 0 && G.DAT_006ad8ec === 0 &&
      G.DAT_006ad8f0 === 0 && G.DAT_006ad8f4 === 0 && G.DAT_006ad8f8 === 0 &&
      G.DAT_006ad8fc === 0 && G.DAT_006ad900 === 0 && G.DAT_006ad904 === 0) {
    G.DAT_006ad8d4 = 1;
    if (G.DAT_0062edf8 === 0) {
      local_c = FUN_005c62ee();
      if (local_c === 0) {
        local_c = 0;
      } else {
        local_c = local_c + -0x48;
      }
      local_8 = 0; // DEVIATION: thiscall — (*(local_c + 0x358) === 0x1fe) ? 1 : 0
      local_20 = FUN_00410e0a();
      FUN_00410a64();
      if (param_3 === 0) {
        FUN_00410ed8();
      }
      iVar1 = FUN_0047a540({ v: local_24 }, { v: local_10 }, param_1, param_2);
      if (iVar1 === 0) {
        G.DAT_0062bcb0 = 1;
        iVar1 = FUN_004087c0(local_24, local_10);
        if (iVar1 !== 0) {
          G.DAT_00624f5c = local_24;
          G.DAT_00624f60 = local_10;
          if ((local_20 !== 0) && (param_3 !== 0)) {
            G.DAT_00628054 = 0;
            FUN_00410302();
            FUN_00410402(local_24, local_10);
            G.DAT_0062bcb0 = 0;
            G.DAT_006ad8d4 = 0;
            return;
          }
          if ((G.DAT_006d1da8 === 0) || (param_3 !== 0)) {
            if (0 === 0) { // DEVIATION: thiscall — *(local_c + 0x2d8) === 0
              FUN_004897fa(0);
              FUN_00410d98(local_24, local_10);
            }
            if (param_3 === 0) {
              local_18 = FUN_0043cf76(local_24, local_10);
              if (-1 < local_18) {
                if (((s8(G.DAT_0064f348[local_18 * 0x58]) === G.DAT_006d1da0) ||
                    (G.DAT_00655b07 !== 0)) || ((G.DAT_0064f346[local_18 * 0x58] & 0x40) !== 0)) {
                  FUN_00509590(local_18);
                } else {
                  iVar1 = FUN_004bd9f0(G.DAT_006d1da0, 0x54);
                  if (((iVar1 !== 0) &&
                      (iVar1 = FUN_005b8b65(local_24, local_10, G.DAT_006d1da0), iVar1 !== 0)) &&
                     ((((1 << ((G.DAT_006d1da0 & 0xff) & 0x1f) &
                        s8(G.DAT_0064f34c[local_18 * 0x58])) !== 0 ||
                       (s8(G.DAT_0064f348[local_18 * 0x58]) === (G.DAT_006d1da0 & 0xff))) ||
                      (((G.DAT_00655af0 & 0x80) !== 0 && ((G.DAT_0064bc60 & 8) !== 0)))))) {
                    FUN_004100cf(local_18);
                  }
                }
                G.DAT_0062bcb0 = 0;
                G.DAT_006ad8d4 = 0;
                return;
              }
              FUN_0058d442();
            }
          } else {
            if (local_8 !== 0) {
              local_1c = G.DAT_00655afe | 0;
              if (-1 < local_1c) {
                G.DAT_00656102[local_1c * 0x20] = local_24 & 0xFFFF;
                G.DAT_00656104[local_1c * 0x20] = local_10 & 0xFFFF;
                G.DAT_006560ff[local_1c * 0x20] = 0xb;
                FUN_004c4e6d(local_1c);
              }
              G.DAT_0062bcb0 = 0;
              G.DAT_006ad8d4 = 0;
              return;
            }
            if (local_20 !== 0) {
              FUN_004ca39e(G.DAT_00655afe | 0, local_24, local_10);
              G.DAT_0062bcb0 = 0;
              G.DAT_006ad8d4 = 0;
              return;
            }
            // DEVIATION: thiscall — *(local_c + 0x358) checks
            if ((499 < 0x201) && (0x201 < 0x1fc)) {
              local_14 = 0x201 + -0x1f5;
              if (local_14 < 0) {
                local_14 = 7;
              }
              FUN_0059062c(G.DAT_00655afe | 0, local_14, 3);
              G.DAT_0062bcb0 = 0;
              G.DAT_006ad8d4 = 0;
              return;
            }
            local_18 = FUN_0043cf76(local_24, local_10);
            if (-1 < local_18) {
              if (((s8(G.DAT_0064f348[local_18 * 0x58]) === G.DAT_006d1da0) ||
                  (G.DAT_00655b07 !== 0)) || ((G.DAT_0064f346[local_18 * 0x58] & 0x40) !== 0)) {
                FUN_00509590(local_18);
              } else {
                iVar1 = FUN_004bd9f0(G.DAT_006d1da0, 0x54);
                if (((iVar1 !== 0) &&
                    (iVar1 = FUN_005b8b65(local_24, local_10, G.DAT_006d1da0), iVar1 !== 0)) &&
                   ((((1 << ((G.DAT_006d1da0 & 0xff) & 0x1f) &
                      s8(G.DAT_0064f34c[local_18 * 0x58])) !== 0 ||
                     (s8(G.DAT_0064f348[local_18 * 0x58]) === (G.DAT_006d1da0 & 0xff))) ||
                    (((G.DAT_00655af0 & 0x80) !== 0 && ((G.DAT_0064bc60 & 8) !== 0)))))) {
                  FUN_004100cf(local_18);
                }
              }
              G.DAT_0062bcb0 = 0;
              G.DAT_006ad8d4 = 0;
              return;
            }
            local_1c = FUN_005b2e69(local_24, local_10);
            if ((-1 < local_1c) && (s8(G.DAT_006560f7[local_1c * 0x20]) === G.DAT_006d1da0)) {
              FUN_004897fa(0);
              FUN_00410d98(local_24, local_10);
              FUN_0058d442();
            }
            G.DAT_00628054 = 0;
            FUN_0041033a();
          }
          FUN_00410402(local_24, local_10);
        }
        G.DAT_0062bcb0 = 0;
        G.DAT_006ad8d4 = 0;
      } else {
        G.DAT_006ad8d4 = 0;
      }
    } else {
      FUN_005013bc();
      G.DAT_006ad8d4 = 0;
    }
  } else {
    debug_log('Map 3: map_window_click blocked');
    G.DAT_006c31ac = 1;
    _DAT_006c31b0 = param_1;
    _DAT_006c31b4 = param_2;
    _DAT_006c31b8 = param_3;
    _DAT_006c31cc = FUN_005c62ee();
    if (_DAT_006c31cc === 0) {
      _DAT_006c31cc = 0;
    } else {
      _DAT_006c31cc = _DAT_006c31cc + -0x48;
    }
  }
}

// FUN_004116c1 — left_click_wrapper
export function FUN_004116c1(param_1, param_2) {
  map_window_click(param_1, param_2, 0);
}

// FUN_004116e3 — right_click_wrapper
export function FUN_004116e3(param_1, param_2) {
  map_window_click(param_1, param_2, 1);
}

// map_double_click — handle double-click on map
export function map_double_click(param_1, param_2) {
  let bVar1 = false;
  if ((G.DAT_00655b02 !== 0) && (G.DAT_006ad8d4 !== 0)) {
    bVar1 = true;
  }
  let iVar5 = XD_InFlushSendBuffer();
  if (iVar5 !== 0) {
    debug_log('Map 3: map_double_click blocked');
    G.DAT_006c31ac = 2;
    _DAT_006c31b0 = param_1;
    _DAT_006c31b4 = param_2;
    _DAT_006c31cc = FUN_005c62ee();
    if (_DAT_006c31cc === 0) {
      _DAT_006c31cc = 0;
    } else {
      _DAT_006c31cc = _DAT_006c31cc + -0x48;
    }
    return;
  }
  if (G.DAT_006ad8bc !== 0 || G.DAT_006ad8c0 !== 0 || G.DAT_006ad8c4 !== 0 ||
      G.DAT_006ad8c8 !== 0 || G.DAT_006ad8cc !== 0 || G.DAT_006ad8d0 !== 0 ||
      G.DAT_006ad8d8 !== 0 || G.DAT_006ad8dc !== 0 || G.DAT_006ad8e0 !== 0 ||
      G.DAT_006ad8e4 !== 0 || G.DAT_006ad8e8 !== 0 || G.DAT_006ad8ec !== 0 ||
      G.DAT_006ad8f0 !== 0 || G.DAT_006ad8f4 !== 0 || G.DAT_006ad8f8 !== 0 ||
      G.DAT_006ad8fc !== 0 || G.DAT_006ad900 !== 0 || G.DAT_006ad904 !== 0) return;
  if (!bVar1) G.DAT_006ad8d4 = 1;
  if (G.DAT_0062edf8 !== 0) {
    FUN_005013bc();
    if (!bVar1) G.DAT_006ad8d4 = 0;
    return;
  }
  FUN_005c62ee();
  let uVar3 = G.DAT_00624f60;
  let uVar2 = G.DAT_00624f5c;
  iVar5 = FUN_004087c0(G.DAT_00624f5c, G.DAT_00624f60);
  if (iVar5 !== 0) {
    iVar5 = FUN_005b8da4(uVar2, uVar3);
    if (iVar5 < 0) {
      iVar5 = FUN_005b8b65(uVar2, uVar3, G.DAT_006d1da0);
      if (iVar5 !== 0) {
        let bVar4 = FUN_005b89bb(uVar2, uVar3);
        let local_8;
        if (bVar4 === 2) {
          let r = FUN_0040bcb0(uVar2, uVar3);
          local_8 = (r !== 0) ? 1 : 0;
        } else {
          local_8 = FUN_005b8ee1(uVar2, uVar3);
        }
        FUN_00491c20(local_8 * 0xb + bVar4);
      }
    }
  }
  if (!bVar1) G.DAT_006ad8d4 = 0;
}

// FUN_00411a13 — move_unit_in_direction
export function FUN_00411a13(param_1) {
  let uVar2 = FUN_005ae052(s8(G.DAT_00628350[param_1]) + G.DAT_0064b1b4);
  let cVar1 = G.DAT_00628360[param_1];
  let iVar4 = G.DAT_0064b1b0;
  let iVar3 = FUN_00410d98(uVar2, cVar1 + iVar4);
  if (iVar3 !== 0) {
    FUN_00410464(uVar2, cVar1 + iVar4);
  }
}

// FUN_00411a85 — handle_unit_keyboard_command
export function FUN_00411a85(param_1, param_2) {
  if ((param_1 === 0xd) || (param_1 === 0x20)) {
    if (((G.DAT_00655aee & 1) === 0) || (param_1 !== 0xd)) {
      let iVar1 = FUN_0043cf76(G.DAT_0064b1b4, G.DAT_0064b1b0);
      if (-1 < iVar1) {
        if (((s8(G.DAT_0064f348[iVar1 * 0x58]) === G.DAT_006d1da0) || (G.DAT_00655b07 !== 0)) ||
           ((G.DAT_0064f346[iVar1 * 0x58] & 0x40) !== 0)) {
          FUN_00509590(iVar1);
        } else {
          let iVar2 = FUN_004bd9f0(G.DAT_006d1da0, 0x54);
          if ((iVar2 !== 0) || (((G.DAT_00655af0 & 0x80) !== 0 && ((G.DAT_0064bc60 & 8) !== 0)))) {
            FUN_004100cf(iVar1);
          }
        }
      }
    } else {
      G.DAT_0064b9bc = 0;
    }
  } else if (param_1 === 0x43) {
    FUN_00410402(G.DAT_0064b1b4, G.DAT_0064b1b0);
  }
}

// FUN_00411bd7 — open_cheat_menu
export function FUN_00411bd7() {
  FUN_0044cc80(G.DAT_006d1da0);
}

// FUN_00411bf5 — handle_active_unit_keyboard
export function FUN_00411bf5(param_1, param_2) {
  let iVar1 = G.DAT_00655afe | 0;
  if (((G.DAT_00655b02 < 3) || (s8(G.DAT_006560f7[iVar1 * 0x20]) === G.DAT_006d1da0)) ||
     (param_1 === 0xd)) {
    switch (param_1) {
    case 0xd:
      iVar1 = FUN_0043cf76(G.DAT_0064b1b4, G.DAT_0064b1b0);
      if (-1 < iVar1) {
        if (((s8(G.DAT_0064f348[iVar1 * 0x58]) === G.DAT_006d1da0) || (G.DAT_00655b07 !== 0)) ||
           ((G.DAT_0064f346[iVar1 * 0x58] & 0x40) !== 0)) {
          FUN_00509590(iVar1);
        } else {
          let iVar2 = FUN_004bd9f0(G.DAT_006d1da0, 0x54);
          if ((iVar2 !== 0) || (((G.DAT_00655af0 & 0x80) !== 0 && ((G.DAT_0064bc60 & 8) !== 0)))) {
            FUN_004100cf(iVar1);
          }
        }
      }
      break;
    case 0x20: FUN_0058bd60(); break;
    case 0x42: FUN_0058be56(); break;
    case 0x43:
      FUN_00410402(G.DAT_006560f0[(iVar1 * 0x20) / 2], G.DAT_006560f2[(iVar1 * 0x20) / 2]);
      break;
    case 0x45: FUN_0058c65e(10); break;
    case 0x46:
      if (G.DAT_0064b1ca[u8(G.DAT_006560f6[iVar1 * 0x20]) * 0x14] === 5) {
        FUN_0058c65e(4);
      } else {
        FUN_0058cce6();
      }
      break;
    case 0x47: FUN_0058d6af(); break;
    case 0x48: FUN_0058cbe1(); break;
    case 0x49: FUN_0058c65e(6); break;
    case 0x4b: FUN_0058df14(); break;
    case 0x4c: FUN_0058df7b(); break;
    case 0x4d: FUN_0058c65e(7); break;
    case 0x4f: FUN_0058c65e(8); break;
    case 0x50:
      if ((param_2 === 0x70) && ((G.DAT_0064b1bd[u8(G.DAT_006560f6[iVar1 * 0x20]) * 0x14] & 1) !== 0)) {
        FUN_0058d60a();
      } else if (G.DAT_0064b1ca[u8(G.DAT_006560f6[iVar1 * 0x20]) * 0x14] === 5) {
        FUN_0058c65e(9);
      } else if (param_2 === 0x50) {
        FUN_0058cfcd();
      }
      break;
    case 0x51:
      if (((G.DAT_00655aea >> 8 & 0x80) !== 0) && (G.DAT_00655b02 === 0)) {
        FUN_00411bd7();
      }
      break;
    case 0x52: FUN_0058c65e(5); break;
    case 0x53: FUN_0058cde5(); break;
    case 0x55: FUN_0058ddce(); break;
    case 0x57: FUN_0058bdfd(); break;
    }
  }
}

// map_ascii — handle ASCII key on map window
export function map_ascii(param_1) {
  let bVar2 = param_1;
  if (G.DAT_006252c4 === 0) return;
  if ((G.DAT_00655b02 !== 0) && (G.DAT_006ad8d4 !== 0)) return;
  if (G.DAT_006c31ac === 4) {
    debug_log('Map 3: map_ascii blocked');
    G.DAT_006c31c4 = 3;
    G.DAT_006c31c8 = param_1;
    return;
  }
  G.DAT_006ad8d4 = 1;
  if (G.DAT_0062edf8 !== 0) {
    if (param_1 === 0xd || param_1 === 0x1b || param_1 === 10) {
      G.DAT_006ad8d4 = 0;
      return;
    }
    FUN_005013bc();
    G.DAT_006ad8d4 = 0;
    return;
  }
  let iVar3 = CSplitterWnd_IsTracking();
  if ((iVar3 === 0) && ((G.DAT_00655aea & 0x40) !== 0)) {
    // City screen keyboard shortcuts
    switch (param_1) {
    case 0xd: case 0x45: case 0x58: case 0x65: case 0x78:
      citywin_BC4F(0); break;
    case 0x41: case 0x43: case 0x61: case 99:
      city_button_change(0); break;
    case 0x42: case 0x62: city_button_buy(0); break;
    case 0x48: case 0x68: citywin_BA6A(0); break;
    case 0x49: case 0x69: citywin_B9A4(0); break;
    case 0x4d: case 0x6d: citywin_BA07(0); break;
    case 0x52: case 0x72: city_button_rename(0); break;
    case 0x56: case 0x76: city_button_view(0); break;
    default:
      // fall through to map key handling below
      handleMapAsciiDefault(param_1, bVar2);
      G.DAT_006ad8d4 = 0;
      return;
    }
  } else {
    handleMapAsciiDefault(param_1, bVar2);
  }
  G.DAT_006ad8d4 = 0;
}

function handleMapAsciiDefault(param_1, bVar2) {
  FUN_00410a64();
  let iVar3 = FUN_00410e0a();
  if ((iVar3 !== 0) && (FUN_00410ed8(), param_1 === 0x70)) return;
  if (_isalpha(param_1)) {
    param_1 = FID_conflict___toupper_lk(param_1) & 0xFF;
  }
  let bVar1 = false;
  switch (bVar2) {
  case 0x43: FUN_0040e017(); break;
  case 0x44: FUN_0058c295(); break;
  case 0x48: if (G.DAT_00655b02 !== 1) FUN_0044cd9b(G.DAT_006d1da0); break;
  case 0x52: FUN_0040e3b1(); break;
  case 0x53: if (G.DAT_00655b02 !== 2) save_game(0); break;
  case 0x54: FUN_0040ddc6(G.DAT_006d1da0); break;
  case 0x58: G.DAT_0066ca8c = -3; FUN_0047cd51(G.DAT_006d1da0, 1); break;
  case 0x5a:
    G.DAT_0066ca8c = 0;
    G.DAT_0066ca88 = G.DAT_0064b1b4;
    G.DAT_0066ca8a = G.DAT_0064b1b0;
    FUN_0047cd51(G.DAT_006d1da0, 1);
    break;
  default: bVar1 = true; break;
  }
  if (bVar1) {
    switch (param_1) {
    case 0x41: FUN_0058d442(); break;
    case 0x54: FUN_004e2597(); break;
    case 0x56:
      if (G.DAT_006d1da8 === 1) FUN_004897fa(0);
      else FUN_00489a0d(1);
      break;
    case 0x58:
      if (-7 < G.DAT_0066ca8c) { G.DAT_0066ca8c = G.DAT_0066ca8c + -1; FUN_0047cd51(G.DAT_006d1da0, 1); }
      break;
    case 0x5a:
      if (G.DAT_0066ca8c < 8) { G.DAT_0066ca8c = G.DAT_0066ca8c + 1; FUN_0047cd51(G.DAT_006d1da0, 1); }
      break;
    }
    if ((((G.DAT_00655aea >> 8 & 0x80) !== 0) && (G.DAT_00655b02 === 0)) && (param_1 === 0x59)) {
      G.DAT_00655b07 = G.DAT_00655b07 === 0 ? 1 : 0;
      FUN_0047cf9e(G.DAT_006d1da0, 1);
    }
    if (G.DAT_006d1da8 === 0) {
      FUN_00411a85(param_1, bVar2);
    } else {
      FUN_00411bf5(param_1, bVar2);
    }
  }
}

// map_key — handle virtual key on map window
export function map_key(param_1) {
  let iVar2;
  let local_8;
  if (G.DAT_006252c4 === 0) return;
  if (((G.DAT_00655b02 !== 0) && (G.DAT_0062edf8 !== 0)) && ((param_1 === 0xd2 || (param_1 === 0xd0)))) {
    iVar2 = CSplitterWnd_IsTracking(); // DEVIATION: Win32
    if (iVar2 === 0) { citywin_BC4F(0); return; }
    return;
  }
  if ((G.DAT_00655b02 !== 0) && (G.DAT_006ad8d4 !== 0)) return;
  iVar2 = XD_InFlushSendBuffer(); // DEVIATION: Win32
  if (iVar2 !== 0 || G.DAT_006ad8bc !== 0 || G.DAT_006ad8c0 !== 0 ||
      G.DAT_006ad8c4 !== 0 || G.DAT_006ad8c8 !== 0 || G.DAT_006ad8cc !== 0 ||
      G.DAT_006ad8d0 !== 0 || G.DAT_006ad8d8 !== 0 || G.DAT_006ad8dc !== 0 ||
      G.DAT_006ad8e0 !== 0 || G.DAT_006ad8e4 !== 0 || G.DAT_006ad8e8 !== 0 ||
      G.DAT_006ad8ec !== 0 || G.DAT_006ad8f0 !== 0 || G.DAT_006ad8f4 !== 0 ||
      G.DAT_006ad8f8 !== 0 || G.DAT_006ad8fc !== 0 || G.DAT_006ad900 !== 0 ||
      G.DAT_006ad904 !== 0) {
    debug_log('Map 3: map_key blocked');
    G.DAT_006c31ac = 4;
    _DAT_006c31b0 = param_1;
    G.DAT_006c31c4 = 0;
    return;
  }
  G.DAT_006ad8d4 = 1;
  local_8 = -1;
  if (G.DAT_0062edf8 !== 0) {
    if ((param_1 !== 0xd2) && (param_1 !== 0xd0)) {
      FUN_005013bc(); G.DAT_006ad8d4 = 0; return;
    }
    iVar2 = CSplitterWnd_IsTracking();
    if (iVar2 !== 0) { G.DAT_006ad8d4 = 0; return; }
    citywin_BC4F(0); G.DAT_006ad8d4 = 0; return;
  }
  if (param_1 === 0x100) { G.DAT_006ad8d4 = 0; return; }
  if (param_1 === 0) { G.DAT_006ad8d4 = 0; return; }
  FUN_00410a64();
  FUN_00410ed8();
  iVar2 = CSplitterWnd_IsTracking(); // DEVIATION: Win32
  if ((iVar2 === 0) && ((G.DAT_00655aea & 0x40) !== 0)) {
    switch (param_1) {
    case 0xa2: case 0xa6: case 0xc1: case 0xc3:
      citywin_BD13(0); G.DAT_006ad8d4 = 0; return;
    case 0xa4: case 0xa8: case 0xc0: case 0xc2:
      citywin_BF72(0); G.DAT_006ad8d4 = 0; return;
    }
  }
  if (param_1 < 0xd3) {
    if (param_1 === 0xd2) {
      iVar2 = CSplitterWnd_IsTracking(); // DEVIATION: Win32
      if (iVar2 === 0) {
        citywin_994F();
      }
    } else {
      switch (param_1) {
      case 0xb0: FUN_0042d71e(G.DAT_006d1da0); break;
      case 0xb1: FUN_0042f079(G.DAT_006d1da0); break;
      case 0xb2: FUN_004308ae(G.DAT_006d1da0); break;
      case 0xb3: FUN_0042e185(G.DAT_006d1da0); break;
      case 0xb4: FUN_0042cd2f(G.DAT_006d1da0); break;
      case 0xb5: FUN_0042b67d(G.DAT_006d1da0); break;
      case 0xb6: FUN_00431c73(G.DAT_006d1da0); break;
      case 0xb7: FUN_00433122(G.DAT_006d1da0); break;
      case 0xb8:
        FUN_00435d15(G.DAT_006d1da0);
        if (G.DAT_00655b07 !== 0) {
          FUN_004361cc(G.DAT_006d1da0);
          FUN_00431d22();
        }
        break;
      case 0xba: FUN_00434d8a(G.DAT_006d1da0); break;
      case 0xbb:
        if ((G.DAT_00655ae8 & 0x80) === 0) {
          FUN_00598b4e(G.DAT_006d1da0);
        }
        break;
      }
    }
  } else if (param_1 < 0x355) {
    if (param_1 === 0x354) {
      let SVar1 = GetAsyncKeyState(0x10); // DEVIATION: Win32
      if ((((G.DAT_00655aea & 0x8000) === 0) || (G.DAT_00655b02 !== 0)) ||
         (s8((SVar1 & 0xffff) >> 8) === 0)) {
        FUN_00516570(G.DAT_006d1da0, 0);
      } else {
        FUN_00516570(G.DAT_006d1da0, 1);
      }
    } else {
      switch (param_1) {
      case 0x243:
        if (2 < G.DAT_00655b02) { FUN_004b7eb6(0, 4); }
        break;
      case 0x244: FUN_0043856b(G.DAT_006d1da0); break;
      case 0x245: FUN_004e1452(); break;
      case 0x246:
        if (G.DAT_00655b02 === 0) { FUN_00553ff6(); }
        break;
      case 0x247:
        G.DAT_00655aea = G.DAT_00655aea ^ 0x20;
        FUN_0057940d(0x327, (G.DAT_00655aea & 0x20) >> 5);
        FUN_0047cf9e(G.DAT_006d1da0, 1);
        G.DAT_0064bc1e = G.DAT_00655aea;
        FUN_004a73d9();
        break;
      case 0x248:
        if ((G.DAT_00655b02 === 1) &&
           (iVar2 = FUN_00410030(s_REALLYQUIT_00625084, G.DAT_0063fc58, 0), iVar2 !== 0)) {
          FUN_0046e6a9();
          FUN_00484d3b();
        }
        break;
      case 0x24a:
        if ((G.DAT_00654c74 !== 0) && (G.DAT_00655b02 === 1)) {
          FUN_00522b2b();
        }
        break;
      case 0x24b:
        if ((G.DAT_00655b02 === 0) || (G.DAT_0062eb30 !== 0)) {
          FUN_00554297();
        }
        break;
      case 0x24c:
        if (G.DAT_00655b02 === 0) { FUN_004e068d(); }
        break;
      case 0x24e: FUN_0058bd84(); break;
      case 0x24f: FUN_004e0ab0(); break;
      case 0x250: FUN_004e0d71(); break;
      case 0x251: FUN_004e22c9(0); break;
      case 0x252: FUN_004e22c9(1); break;
      case 0x253:
        if (G.DAT_00655b02 !== 2) { save_game(0); }
        break;
      case 0x254:
        if (((G.DAT_00655b02 !== 0) && (G.DAT_00655b02 !== 2)) && (G.DAT_006ad2f7 !== 0)) {
          FUN_0055b2c6();
        }
        break;
      case 599: FUN_0049836a(G.DAT_006d1da0); break;
      case 600:
        G.DAT_0066ca8c = -7; // 0xfff9 as signed
        FUN_0047cd51(G.DAT_006d1da0, 1);
        break;
      case 0x259:
        if (G.DAT_00655b02 !== 0) { FUN_004e0f18(); }
        break;
      case 0x25a:
        G.DAT_0066ca8c = 8;
        FUN_0047cd51(G.DAT_006d1da0, 1);
        break;
      }
    }
  }
  if (((G.DAT_00655aea & 0x8000) !== 0) && (G.DAT_00655b02 === 0)) {
    if (param_1 < 0x332) {
      if (param_1 === 0x331) {
        FUN_00417566();
      } else {
        switch (param_1) {
        case 0x1b0: FUN_005551b3(); break;
        case 0x1b1: FUN_0055560f(); break;
        case 0x1b2: FUN_0055583f(); break;
        case 0x1b3: FUN_00555a02(); break;
        case 0x1b4: FUN_00555a8b(); break;
        case 0x1b5: FUN_00554423(); break;
        case 0x1b6: FUN_00554962(); break;
        case 0x1b7:
          G.DAT_00633678 = -1;
          FUN_0055499f();
          break;
        case 0x1b8: FUN_0055615c(); break;
        }
      }
    } else {
      switch (param_1) {
      case 0x332: FUN_00429e77(); break;
      case 0x333: FUN_0058760d(); break;
      case 0x334: FUN_004da9e2(); break;
      case 0x335: FUN_0051c635(); break;
      case 0x336: FUN_004a5d92(); break;
      case 0x337: FUN_005b1a29(); break;
      case 0x338: FUN_0054ffc8(); break;
      case 0x343: set_city_shields(); break;
      case 0x344: FUN_00555cb1(); break;
      case 0x34b: FUN_00556f54(); break;
      case 0x350: FUN_005582ad(); break;
      case 0x353: FUN_0055891d(); break;
      case 0x355: FUN_0055625b(); break;
      case 0x3b5: FUN_005545d3(); break;
      case 0x3b7: FUN_0055499f(); break;
      }
    }
  }
  // Direction keys
  switch (param_1) {
  case 0xa1: case 199: local_8 = 4; break;
  case 0xa2: case 0xc1: local_8 = 3; break;
  case 0xa3: case 0xc6: local_8 = 2; break;
  case 0xa4: case 0xc2: local_8 = 5; break;
  case 0xa6: case 0xc3: local_8 = 1; break;
  case 0xa7: case 0xc4: local_8 = 6; break;
  case 0xa8: case 0xc0: local_8 = 7; break;
  case 0xa9: case 0xc5: local_8 = 0; break;
  }
  if ((((-1 < G.DAT_00655afe) && (G.DAT_00655afe < G.DAT_00655b16)) &&
      (G.DAT_0065610a[(G.DAT_00655afe * 0x20) / 4] !== 0)) && (-1 < local_8)) {
    if (G.DAT_006d1da8 === 1) {
      FUN_0059062c(G.DAT_00655afe, local_8, 3);
    } else {
      FUN_00411a13(local_8);
    }
  }
  G.DAT_006ad8d4 = 0;
}

// FUN_004131c0 — toggle_grid_overlay
export function FUN_004131c0() {
  if (2 < G.DAT_00655b02) {
    FUN_0047e94e(1, 1);
  }
  if (((G.DAT_0062805c === 0) && (G.DAT_0064b9bc !== 0)) && (G.DAT_00628044 !== 0)) {
    if (G.DAT_0062804c !== 0) {
      G.DAT_00628054 = G.DAT_00628054 === 0 ? 1 : 0;
      FUN_0041033a();
    }
  } else {
    G.DAT_0062805c = 0;
  }
}

// FUN_0041325d — toggle_minimap
export function FUN_0041325d() {
  if ((G.DAT_0062804c !== 0) && (G.DAT_00628044 !== 0)) {
    G.DAT_00628058 = G.DAT_00628058 === 0 ? 1 : 0;
    FUN_00568f43(1);
  }
}

// FUN_004132b7 — resize_map_view
export function FUN_004132b7() {
  let iVar1 = FUN_004080c0();
  let iVar2 = FUN_00407f90(G.DAT_00655324);
  let local_14 = FUN_00414bb0();
  local_14 = local_14 + 1;
  let local_c = 0;
  if (G.DAT_00628060 !== 0) {
    local_c = G.DAT_0064bcf4 + 1;
    local_14 = local_14 - (G.DAT_0064bcf4 + 1);
  }
  FUN_004086c0(G.DAT_006552a4, 0, local_c, iVar1 - iVar2, local_14);
}

// FUN_00413350 — check_map_tab_selection
export function FUN_00413350() {
  let local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  } else {
    local_8 = local_8 + -0x48;
  }
  // DEVIATION: thiscall — *(local_8 + 0x2d8) is window tab index
  let bVar1 = true; // *(local_8 + 0x2d8) === 0
  if (bVar1) {
    FUN_00408090();
  } else {
    // *(local_8 + 0x2dc) = 0; — DEVIATION: thiscall
  }
  return !bVar1;
}

// FUN_004133c2 — select_map_tab
export function FUN_004133c2() {
  let local_8 = FUN_005c62ee();
  if (local_8 === 0) local_8 = 0; else local_8 = local_8 + -0x48;
  FUN_004080f0(G.DAT_006552a4);
}

// FUN_0041341c — select_map_tab_2
export function FUN_0041341c() {
  let local_8 = FUN_005c62ee();
  if (local_8 === 0) local_8 = 0; else local_8 = local_8 + -0x48;
  FUN_004080f0(G.DAT_006552a4);
}

// FUN_00413476 — update_status_bar
export function FUN_00413476() {
  // DEVIATION: thiscall — in_ECX is window object pointer
  let in_ECX = 0;
  let local_8 = 0; // (*(in_ECX + 0x2de) & 1) ? 1 : 0
  if (0) { // (*(in_ECX + 0x2de) & 2) !== 0
    local_8 = local_8 + 2;
  }
  FUN_0040bbb0();
  if (0 === 0) { // *(in_ECX + 0x2d8) === 0
    if (G.DAT_00628064 !== 1) {
      let uVar2 = FUN_00410070(G.DAT_006d1da0);
      FUN_00414d70(uVar2);
      if (G.DAT_00628064 === 2) {
        FUN_0040bbe0(0x625090); // &G.DAT_00625090
      }
      FUN_0040fe10();
    }
    let bVar1 = false;
    for (let local_c = 1; local_c < 8; local_c = local_c + 1) {
      if (G.DAT_0066ca84[(local_c * 0x3f0) / 2] !== 0) {
        bVar1 = true;
        break;
      }
    }
  } else {
    // bVar1 = true when not tab 0
  }
  FUN_0040bc10(4);
  // if (bVar1) { FUN_0040fe40(); FUN_0040bc10(local_8 + 300); }
  FUN_0055324c(G.DAT_00679640);
}

// FUN_004135ab — handle_status_bar_click
export function FUN_004135ab(param_1) {
  if ((G.DAT_00655b02 === 0) || (G.DAT_006ad8d4 === 0)) {
    G.DAT_006ad8d4 = 1;
    let local_8 = FUN_005c62ee();
    if (local_8 === 0) {
      local_8 = 0;
    } else {
      local_8 = local_8 + -0x48;
    }
    switch (param_1) {
    case 1:
      // *(local_8 + 0x2dc) = 0; — DEVIATION: thiscall
      FUN_004083b0();
      FUN_00413476();
      FUN_005bb574();
      break;
    case 2:
      // DEVIATION: thiscall — *(local_8 + 0x2e4) increment/check
      FUN_0047cd51(G.DAT_006d1da0, 1);
      break;
    case 3:
      // DEVIATION: thiscall — *(local_8 + 0x2e4) decrement/check
      FUN_0047cd51(G.DAT_006d1da0, 1);
      break;
    case 4:
      // *(local_8 + 0x2de) = (*(local_8 + 0x2de) + 1) & 3; — DEVIATION: thiscall
      FUN_00413476();
      FUN_0047cd51(G.DAT_006d1da0, 1);
      break;
    }
    G.DAT_006ad8d4 = 0;
  }
}

// FUN_00413717 — init_map_window
export function FUN_00413717() {
  // DEVIATION: thiscall — in_ECX is CPropertySheet* window object
  let in_ECX = 0;
  FUN_00479ede(0); // *(in_ECX + 0x2d8)
  if ((G.DAT_00628048 === 0) || (G.DAT_00655280 === 0)) {
    // *(in_ECX + 0x2e4) = 0;
    if (999 < G.DAT_006ab198) {
      // *(in_ECX + 0x2e4) = 2;
    }
    if (0 === 0) { // *(in_ECX + 0x2d8) === 0
      FUN_004132b7();
    }
  }
  // *(in_ECX + 0x2de) = 3 or 2 depending on tab
  // DEVIATION: thiscall — window position/size setup
  let local_8 = 0; // window x
  let local_c = 0; // window y
  let local_10 = 0; // width
  let local_14 = 0; // height
  // DEVIATION: thiscall — window creation calls
  let uVar1 = FUN_00428b0c(0, 6, local_8, local_c, local_10, local_14, 6, 0, 0);
  FUN_005534bc(uVar1, 6, local_8, local_c, local_10, local_14, 6, 0, 0);
  FUN_00408370(0x100, 0x80);
  // DEVIATION: Win32 — CPropertySheet::EnableStackedTabs
  FUN_00408130(0);
  FUN_00408170(0);
  FUN_00414c20(0);
  FUN_00414c60(0);
  FUN_00414be0(0);
  FUN_00414ca0(0); // map_double_click callback
  // DEVIATION: Win32 — tie(map_ascii), SetDlgCtrlID
  FUN_00408230(0);
  FUN_004082f0(0);
  FUN_00408330(0);
  FUN_00413476();
  FUN_0055318c(0, 2); // &G.DAT_00648820
  FUN_0055318c(0, 3); // &G.DAT_00647788
  // DEVIATION: Win32 — EnableStackedTabs
  FUN_005bb574();
  if (G.DAT_00655b02 !== 1) {
    FUN_004085f0();
  }
}

// FUN_00413a90 — init_all_map_windows
export function FUN_00413a90() {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    FUN_00479ede(local_8);
    if (G.DAT_00628048 === 0) {
      if (local_8 === 0) {
        _DAT_0066ca84 = 1;
      } else {
        G.DAT_0066ca84[(local_8 * 0x3f0) / 2] = 0;
      }
    }
    if ((local_8 === 0) || (G.DAT_0066ca84[(local_8 * 0x3f0) / 2] !== 0)) {
      FUN_00413717();
    }
  }
  _DAT_0066c98c = 1;
  if (G.DAT_00654b70 !== 0) G.DAT_0066c988 = 1;
  G.DAT_00637ef8 = 1;
  G.DAT_0063cbc4 = FUN_005d1f50(0, 0x96, 0xffffffff);
  G.DAT_0063cbc0 = FUN_005d1f50(0, 500, 0xffffffff);
  G.DAT_00637ef8 = 0;
}

// FUN_00413bd1 — destroy_all_map_windows
export function FUN_00413bd1() {
  G.DAT_00637ef8 = 1;
  FUN_005d2004(G.DAT_0063cbc4);
  FUN_005d2004(G.DAT_0063cbc0);
  G.DAT_00637ef8 = 0;
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if ((local_8 === 0) || (G.DAT_0066ca84[(local_8 * 0x3f0) / 2] !== 0)) {
      FUN_004083b0();
    }
  }
}

// FUN_00414b70 — send_window_message
export function FUN_00414b70(param_1, param_2) {
  FUN_005bcfdd(0, param_1, param_2);
}

// FUN_00414bb0 — get_window_height
export function FUN_00414bb0() {
  return FUN_005bc96b(0);
}

// Source: decompiled/block_00410000.c FUN_00414be0 (43 bytes)
// FUN_00414be0 — set_paint_callback
export function FUN_00414be0(param_1) {
  // DEVIATION: Win32 — thiscall: in_ECX is 'this' pointer
  // let uVar1 = *in_ECX;
  // *in_ECX = param_1;
  // return uVar1;
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00414c20 (45 bytes)
// FUN_00414c20 — set_resize_callback
export function FUN_00414c20(param_1) {
  // DEVIATION: Win32 — thiscall: swaps in_ECX[1] with param_1
  // let uVar1 = *(in_ECX + 4);
  // *(in_ECX + 4) = param_1;
  // return uVar1;
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00414c60 (45 bytes)
// FUN_00414c60 — set_key_callback
export function FUN_00414c60(param_1) {
  // DEVIATION: Win32 — thiscall: swaps in_ECX[2] with param_1
  // let uVar1 = *(in_ECX + 8);
  // *(in_ECX + 8) = param_1;
  // return uVar1;
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00414ca0 (45 bytes)
// FUN_00414ca0 — set_dblclick_callback
export function FUN_00414ca0(param_1) {
  // DEVIATION: Win32 — thiscall: swaps in_ECX[7] (offset 0x1c) with param_1
  // let uVar1 = *(in_ECX + 0x1c);
  // *(in_ECX + 0x1c) = param_1;
  // return uVar1;
  return 0;
}

// FUN_00414ce0 — start_cursor_blink
export function FUN_00414ce0() {
  let uVar1 = FUN_00414d10();
  FUN_005bd533(uVar1);
}

// Source: decompiled/block_00410000.c FUN_00414d10 (28 bytes)
// FUN_00414d10 — get_window_handle
export function FUN_00414d10() {
  // DEVIATION: Win32 — thiscall: returns *(in_ECX + 8)
  return 0;
}

// FUN_00414d40 — stop_cursor_blink
export function FUN_00414d40() {
  let uVar1 = FUN_00414d10();
  FUN_005bd550(uVar1);
}

// FUN_00414d70 — set_status_text
export function FUN_00414d70(param_1) {
  FUN_004af174(G.DAT_00679640, param_1);
}

// Source: decompiled/block_00410000.c EnableStackedTabs (36 bytes)
// EnableStackedTabs — CPropertySheet::EnableStackedTabs
export function EnableStackedTabs(param_1) {
  // DEVIATION: MFC — sets this->m_bStacked (offset 0x2a8) = param_1
  // *(this + 0x2a8) = param_1;
}

// FUN_00414dd0 — show_city_info_text
export function FUN_00414dd0(param_1, param_2) {
  FUN_004a6cc5(G.DAT_006359d4, param_1, 0, param_2);
}

// Source: decompiled/block_00410000.c IsTracking (31 bytes)
// IsTracking — CSplitterWnd::IsTracking
export function IsTracking() {
  // DEVIATION: MFC — returns *(this + 0x15a4)
  return 0;
}

// FUN_00414e30 — bubble_sort_bytes
export function FUN_00414e30(param_1, param_2, param_3) {
  let bVar2;
  do {
    bVar2 = false;
    for (let local_c = 0; (!bVar2 && (local_c < param_1 - 1)); local_c = local_c + 1) {
      if (s8(param_3[local_c + 1]) < s8(param_3[local_c])) {
        let uVar1 = param_3[local_c];
        param_3[local_c] = param_3[local_c + 1];
        param_3[local_c + 1] = uVar1;
        uVar1 = param_2[local_c];
        param_2[local_c] = param_2[local_c + 1];
        param_2[local_c + 1] = uVar1;
        bVar2 = true;
      }
    }
  } while (bVar2);
}

// FUN_00414f02 — bubble_sort_ints
export function FUN_00414f02(param_1, param_2, param_3) {
  let bVar2;
  do {
    bVar2 = false;
    for (let local_c = 0; (!bVar2 && (local_c < param_1 - 1)); local_c = local_c + 1) {
      if (param_3[local_c + 1] < param_3[local_c]) {
        let uVar1 = param_3[local_c];
        param_3[local_c] = param_3[local_c + 1];
        param_3[local_c + 1] = uVar1;
        uVar1 = param_2[local_c];
        param_2[local_c] = param_2[local_c + 1];
        param_2[local_c + 1] = uVar1;
        bVar2 = true;
      }
    }
  } while (bVar2);
}

// FUN_00415040 — build_file_path
export function FUN_00415040(param_1, param_2) {
  if (G.DAT_00625114 === 0) {
    FUN_005f22d0(param_1, param_2);
  } else {
    FUN_005badf0(param_1, G.DAT_006250d8, param_2);
  }
  return param_1;
}

// FUN_0041508c — open_rules_file
export function FUN_0041508c(param_1, param_2) {
  let local_8c = FUN_00415040({}, param_1);
  FUN_005f22d0(G.DAT_006347c0, local_8c);
  let pFVar1 = _fopen(local_8c, param_2);
  G.DAT_00634810 = (pFVar1 === null) ? 1 : 0;
  return pFVar1;
}

// Source: decompiled/block_00410000.c FUN_00415105 (46 bytes)
// FUN_00415105 — get_file_length
export function FUN_00415105(param_1) {
  let _FileHandle = FUN_006076a0(param_1);
  // DEVIATION: Win32 — __filelength(_FileHandle)
  return 0;
}

// FUN_00415133 — check_file_exists
export function FUN_00415133(param_1) {
  let _File = FUN_0041508c(param_1, 'r');
  if (_File !== null) {
    _fclose(_File);
  }
  return _File !== null;
}

// FUN_004151e0 — copy_tech_data_to_editor
export function FUN_004151e0() {
  for (let local_8 = 0; local_8 < 100; local_8 = local_8 + 1) {
    // Copy tech names and prerequisites to editor arrays
    G.DAT_006a2d28[local_8 * 0x58] = s8(G.DAT_0062768e[local_8 * 0x10]);
    G.DAT_006a2d2c[local_8 * 0x58] = s8(G.DAT_0062768f[local_8 * 0x10]);
    G.DAT_006a2d30[local_8 * 0x58] = s8(G.DAT_0062768d[local_8 * 0x10]);
    G.DAT_006a2d34[local_8 * 0x58] = s8(G.DAT_0062768c[local_8 * 0x10]);
    G.DAT_006a2d38[local_8 * 0x58] = s8(G.DAT_0062768a[local_8 * 0x10]);
    G.DAT_006a2d3c[local_8 * 0x58] = s8(G.DAT_0062768b[local_8 * 0x10]);
  }
}

// FUN_00415307 — copy_editor_data_to_tech
export function FUN_00415307() {
  for (let local_8 = 0; local_8 < 100; local_8 = local_8 + 1) {
    G.DAT_0062768e[local_8 * 0x10] = G.DAT_006a2d28[local_8 * 0x58];
    G.DAT_0062768f[local_8 * 0x10] = G.DAT_006a2d2c[local_8 * 0x58];
    G.DAT_0062768d[local_8 * 0x10] = G.DAT_006a2d30[local_8 * 0x58];
    G.DAT_0062768c[local_8 * 0x10] = G.DAT_006a2d34[local_8 * 0x58];
    G.DAT_0062768a[local_8 * 0x10] = G.DAT_006a2d38[local_8 * 0x58];
    G.DAT_0062768b[local_8 * 0x10] = G.DAT_006a2d3c[local_8 * 0x58];
  }
}

// FUN_0041541a — update_editor_controls
export function FUN_0041541a() {
  // DEVIATION: thiscall — editor window state
  for (let local_14 = 1; local_14 < 7; local_14 = local_14 + 1) {
    if (G.DAT_00625160[local_14 * 2] === 9) {
      let iVar1 = FUN_00418740();
      let local_10 = '';
      _sprintf(local_10, '%d', s32(G.DAT_006a2a00, iVar1 * 4 + G.DAT_006a4f90 * 0x58)); // approximation
      FUN_00418a30(local_10);
    } else if (G.DAT_00625160[local_14 * 2] === 0xc) {
      let iVar1 = FUN_00418740();
      let local_8 = s32(G.DAT_006a2a00, iVar1 * 4 + G.DAT_006a4f90 * 0x58);
      if (local_14 < 3) {
        local_8 = local_8 + 2;
      }
      FUN_00418d90(local_8);
    }
  }
}

// FUN_0041557b — validate_editor_changes
export function FUN_0041557b() {
  let local_14 = 0;
  for (let local_18 = 1; local_18 < 7; local_18 = local_18 + 1) {
    if (G.DAT_00625160[local_18 * 2] === 9) {
      let local_10 = '';
      FUN_00418a70(local_10);
      let local_8 = _atoi(local_10);
      let iVar1 = FUN_00418740();
      iVar1 = iVar1 + -0xca;
      let uVar2 = FUN_005adfa0(local_8, G.DAT_00625188[iVar1], G.DAT_00625190[iVar1]);
      // G.DAT_006a2d28[G.DAT_006a4f90 * 0x16 + iVar1] = uVar2;
      iVar1 = FUN_00418740();
      if (s32(G.DAT_006a2a00, iVar1 * 4 + G.DAT_006a4f90 * 0x58) !== local_8) {
        local_14 = local_14 + 1;
      }
    } else if (G.DAT_00625160[local_18 * 2] === 0xc) {
      local_8 = FUN_00418d60();
      if (local_18 < 3) {
        local_8 = local_8 + -2;
      }
      let iVar1 = FUN_00418740();
      G.DAT_006a2a00[G.DAT_006a4f90 * 0x16 + iVar1] = local_8;
    }
  }
  return local_14;
}

// FUN_00415765 — refresh_editor_display
export function FUN_00415765() { FUN_00416828(); }

// Source: decompiled/block_00410000.c FUN_00415780 (466 bytes)
// FUN_00415780 — export_tech_tree_to_file
export function FUN_00415780(param_1) {
  for (let local_8 = 0; local_8 < 100; local_8 = local_8 + 1) {
    FUN_0040bbb0();
    FUN_0040ff00(G.DAT_00627684[local_8 * 0x10]);
    FUN_005f22e0(G.DAT_00679640, G.DAT_006251ac);
    let pcVar1 = FUN_00428b0c(G.DAT_00627684[local_8 * 0x10]);
    let sVar2 = _strlen(pcVar1);
    let local_c;
    if (sVar2 < 0x13) {
      pcVar1 = FUN_00428b0c(G.DAT_00627684[local_8 * 0x10]);
      local_c = _strlen(pcVar1);
    } else {
      local_c = 0x13;
    }
    FUN_004190a0(0x13 - local_c);
    FUN_0040ff30(s8(G.DAT_0062768a[local_8 * 0x10]));
    FUN_005f22e0(G.DAT_00679640, G.DAT_006251b0);
    FUN_004ccdb6(s8(G.DAT_0062768b[local_8 * 0x10]));
    FUN_005f22e0(G.DAT_00679640, G.DAT_006251b4);
    FUN_004ccdef(s8(G.DAT_0062768e[local_8 * 0x10]), 1);
    FUN_0040fe10();
    FUN_004ccdef(s8(G.DAT_0062768f[local_8 * 0x10]), 1);
    FUN_0040fe10();
    FUN_0040ff30(s8(G.DAT_0062768d[local_8 * 0x10]));
    FUN_005f22e0(G.DAT_00679640, G.DAT_006251b8);
    FUN_0040ff30(s8(G.DAT_0062768c[local_8 * 0x10]));
    FUN_005f22e0(G.DAT_00679640, s___006251bc);
    FUN_004ccdef(local_8, 0);
    FUN_005f22e0(G.DAT_00679640, G.DAT_006251c4);
    _fputs(G.DAT_00679640, param_1);
  }
  return 1;
}

// FUN_00415952 — count_active_techs
export function FUN_00415952() {
  G.DAT_00655b1a = 0;
  for (let local_10 = 0; local_10 < 100; local_10 = local_10 + 1) {
    if (G.DAT_00627689[local_10 * 0x10] !== 0) {
      G.DAT_00655b1a = G.DAT_00655b1a + 1;
      for (let local_c = 0; local_c < 2; local_c = local_c + 1) {
        let local_14 = s8(G.DAT_0062768e[local_c + local_10 * 0x10]);
        let bVar1 = false;
        while ((-1 < local_14 && (!bVar1))) {
          if (G.DAT_00627689[local_14 * 0x10] === 0) {
            local_14 = s8(G.DAT_0062768e[local_14 * 0x10]);
          } else {
            bVar1 = true;
          }
        }
        G.DAT_0062768e[local_c + local_10 * 0x10] = local_14 & 0xFF;
      }
    }
  }
}

// show_messagebox_5A40 — rules editor save dialog
export function show_messagebox_5A40() {
  let iVar1 = FUN_0041557b();
  if (iVar1 === 0) {
    FUN_00415307();
    FUN_00415952();
    FUN_004ccab9(s_CIVILIZE_006251d0, 0);
    // DEVIATION: Win32 — MessageBoxA confirmation dialog, file save via FUN_0041508c
  }
}

// Source: decompiled/block_00410000.c FUN_00415b52 (769 bytes)
// FUN_00415b52 — show_tech_prerequisites (rules editor treeview population)
export function FUN_00415b52() {
  // DEVIATION: Win32 — populates treeview with tech prerequisites
  // Reads: G.DAT_0064b1cb (improvements), G.DAT_0062768e/f (tech prereqs), G.DAT_00627684 (tech names)
  // Reads: *(G.DAT_006a4f88 + 0x2ec) for current selected tech index
  // Reads: *(G.DAT_00628420 + 0x808), *(G.DAT_00628420 + 0x80c), *(G.DAT_00628420 + 0x1ec) for string table
  // Calls: FUN_00419060, FUN_00419020, FUN_00428b0c, _sprintf
  let bVar2 = false;
  let bVar1 = false;
  FUN_00419060();
  // for (local_60 = 0; local_60 < 0x3e; local_60++) — iterates improvements
  //   checks if improvement's tech req matches selected tech
  //   adds improvement name to treeview via FUN_00419020
  // for (local_64 = 0; local_64 < 100; local_64++) — iterates techs
  //   checks if tech's prereq1/prereq2 matches selected tech
  //   adds tech name to treeview via FUN_00419020
}

// Source: decompiled/block_00410000.c FUN_00415e53 (731 bytes)
// FUN_00415e53 — rename_tech_dialog
export function FUN_00415e53() {
  // DEVIATION: Win32/MFC — rules editor tech rename dialog
  // Reads: *(G.DAT_006a4f88 + 0x2ec) for current tech index
  // Writes: G.DAT_006a1d88[iVar1 * 0x28] — renames tech name string
  // let iVar1 = *(G.DAT_006a4f88 + 0x2ec);
  // _strncpy(local_12c, G.DAT_006a1d88 + iVar1 * 0x28, 0x14);
  // Shows input dialog via FUN_0051d63b, then:
  // FUN_005f22d0(G.DAT_006a1d88 + iVar1 * 0x28, local_118);  // game state write
  // Refreshes combo boxes: FUN_00418d60, FUN_00418d20, FUN_00418ce0, FUN_00418d90
  // Calls: FUN_00415b52, FUN_00415765
}

// Source: decompiled/block_00410000.c FUN_0041612e (95 bytes)
// FUN_0041612e — show_advances_help
export function FUN_0041612e() {
  // DEVIATION: Win32 — shows advances help in rules editor
  // let local_8 = (G.DAT_006a4f88 === 0) ? 0 : G.DAT_006a4f88 + 0x48;
  // FUN_0059d3c9(local_8);
  // FUN_004190d0(&G.DAT_0062523c, "ADVANCES");
  // FUN_0059d3c9(0);
}

// FUN_0041618d — invalidate_editor_cache
export function FUN_0041618d() {
  G.DAT_006a1d7c = 0;
  CRichEditDoc_InvalidateObjectCache();
}

// Source: decompiled/block_00410000.c FUN_004161b5 (136 bytes)
// FUN_004161b5 — show_tech_icon
export function FUN_004161b5() {
  // DEVIATION: Win32 — displays tech icon in rules editor
  // Reads: *(G.DAT_006a4f88 + 0x2ec) — selected tech index
  // Reads: G.DAT_006a2d34, G.DAT_006a2d30 — tech icon positions (stride 0x58)
  // Renders: G.DAT_00646cb8 + row*0xf0 + col*0x3c — tech icon bitmap
  // let uVar1 = FUN_00428b0c(*(G.DAT_00628420 + 0x7d8), 0, &LAB_00401d8e);
  // FUN_00573e59(G.DAT_00646cb8 + G.DAT_006a2d34[selected*0x58]*0xf0 + G.DAT_006a2d30[selected*0x58]*0x3c, uVar1);
  // FUN_00415765();
}

// Source: decompiled/block_00410000.c FUN_0041623d (279 bytes)
// FUN_0041623d — handle_editor_list_selection
export function FUN_0041623d(param_1) {
  // DEVIATION: Win32 — rules editor list selection handler
  // if (param_1 === 0xc9) {
  //   if (FUN_0041557b() === 0) {
  //     *(G.DAT_006a4f88 + 0x2ec) = FUN_00418d60();  // set selected tech
  //     FUN_0041541a(); FUN_00415b52(); FUN_00415765();
  //   } else {
  //     FUN_00418d90(*(G.DAT_006a4f88 + 0x2ec));
  //     FUN_0041541a(); FUN_00415765();
  //     FUN_0059d3c9(...); FUN_004190d0("DEBUG","NOTICE"); FUN_0059d3c9(0);
  //     SetFocus(FUN_00418770());
  //   }
  // } else if (param_1 === 0xcc || param_1 === 0xcd) {
  //   FUN_0041557b(); FUN_00415b52(); FUN_00415765();
  // }
}

// Source: decompiled/block_00410000.c FUN_00416354 (962 bytes)
// FUN_00416354 — create_editor_dropdown
export function FUN_00416354(param_1) {
  // DEVIATION: Win32/MFC — creates dropdown controls for rules editor
  // Reads: G.DAT_00625128, G.DAT_0062512c — control position offsets
  // Reads: in_ECX + 0x124, in_ECX + 0x128, in_ECX + 0x2e8 — window dimensions
  // Writes: G.DAT_006a1d80 = G.DAT_006a1d80 + 1 — control ID counter
  let iVar1 = G.DAT_006a1d80;
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
  // DEVIATION: Win32 — FUN_004086c0 creates RECT, FUN_00418bf0 creates combo control
  // FUN_00418c70, FUN_00418dd0 set combo callbacks
  // switch(param_1) populates combo items via FUN_00418ce0:
  //   case 0: 100 tech names from G.DAT_00627684
  //   case 1,2: "None"/"All" + 100 tech names
  //   case 3: 4 government-related strings from G.DAT_00628420
  //   case 4: 5 category strings from G.DAT_00628420
}

// Source: decompiled/block_00410000.c FUN_00416734 (244 bytes)
// FUN_00416734 — create_editor_spinner
export function FUN_00416734(param_1) {
  // DEVIATION: Win32 — creates spinner (edit+updown) controls for rules editor
  // Reads: G.DAT_00625150/G.DAT_00625154 — control position offsets
  // Reads: in_ECX + 0x124, in_ECX + 0x128, in_ECX + 0x2e8 — window dimensions
  // Writes: G.DAT_006a1d80 = G.DAT_006a1d80 + 1 — control ID counter
  let iVar1 = G.DAT_006a1d80;
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
  // DEVIATION: Win32 — FUN_004086c0 creates RECT
  // FUN_00418910 creates listbox control
  // FUN_004189c0(4) sets style, FUN_00418a00 sets callback
}

// FUN_00416828 — paint_rules_editor (UI stub)
export function FUN_00416828() {
  FUN_00552112();
  FUN_00408460();
}

// Source: decompiled/block_00410000.c FUN_00416c9e (2186 bytes)
// FUN_00416c9e — create_rules_editor_window
export function FUN_00416c9e() {
  // DEVIATION: Win32/MFC — creates the rules editor window and all controls
  FUN_005c64da();
  G.DAT_006a1d7c = 1;
  G.DAT_006a4f88 = 0; // DEVIATION: Win32 — C sets G.DAT_006a4f88 = in_ECX (CPropertySheet*)
  // DEVIATION: Win32 — operator_new(0x48), FUN_005bd630() creates sub-object
  G.DAT_0062e018 = 0; // DEVIATION: Win32 — C sets to FUN_005bd630() result
  // DEVIATION: Win32 — FUN_00417ef0(0, G.DAT_0062e01c) creates font
  // DEVIATION: Win32 — FUN_005d268e, FUN_005d25a8, FUN_005d2550, FUN_005d2568, FUN_005d2590
  G.DAT_006a1d80 = 0xc9;
  // DEVIATION: Win32 — FUN_005bf071 loads EDITORPT.GIF
  // DEVIATION: Win32 — FUN_005534bc creates main dialog
  // Creates 7 controls via FUN_00416734/FUN_00416354, treeview via FUN_00418f40
  // Creates 5 buttons via FUN_0040f680/FUN_0040f880, FUN_0040f840
  // FUN_0040f350(0), FUN_004151e0, FUN_00418d90, FUN_0041541a
  // EnableStackedTabs, FUN_0041623d(0xc9), FUN_005bb574, FUN_004085f0
  // FUN_005c61b0 — enters message loop
  // while (G.DAT_006a1d7c !== 0) { FUN_0040ef50(); }
  // if (G.DAT_0062e018 !== 0) { FUN_0040f010(1); }
  G.DAT_0062e018 = 0;
  FUN_00417542();
  // DEVIATION: Win32 — FUN_00417558() SEH restore
}

// FUN_00417542 — close_modal_dialog
export function FUN_00417542() { FUN_005c656b(); }

// Source: decompiled/block_00410000.c FUN_00417558 (14 bytes)
// FUN_00417558 — restore_seh_2
export function FUN_00417558() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_00417566 — open_rules_editor
export function FUN_00417566() {
  FUN_00417fa0();
  FUN_00416c9e();
  FUN_005bb574();
  FUN_004175bf();
  FUN_004175d5();
}

// FUN_004175bf — destroy_editor_controls
export function FUN_004175bf() { FUN_004183d0(); }

// Source: decompiled/block_00410000.c FUN_004175d5 (14 bytes)
// FUN_004175d5 — restore_seh_3
export function FUN_004175d5() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// Source: decompiled/block_00410000.c FUN_00417ef0 (93 bytes)
// FUN_00417ef0 — create_or_replace_font
export function FUN_00417ef0(param_1, param_2) {
  // DEVIATION: Win32 — thiscall: operates on in_ECX (font handle pair)
  // if (*in_ECX !== 0) { FUN_005c841d(*in_ECX); }
  // *in_ECX = create_font_8200(param_1, param_2, 0);
  // in_ECX[1] = gdi_847F(*in_ECX);
}

// Source: decompiled/block_00410000.c FUN_00417f70 (28 bytes)
// FUN_00417f70 — get_editor_color
export function FUN_00417f70() {
  // DEVIATION: Win32 — thiscall: returns *(in_ECX + 0x30) (color byte)
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00417fa0 (498 bytes)
// FUN_00417fa0 — construct_editor_controls
export function FUN_00417fa0() {
  // DEVIATION: MFC — constructs CPropertySheet-derived object with embedded controls
  // Calls _eh_vector_constructor_iterator_ to init arrays of dropdown/spinner/edit controls
  // Calls FUN_0040f3e0 x16 to init 16 embedded CWnd objects
  // Calls FUN_00418e00 x3 to init 3 edit controls
  // Sets *in_ECX = &PTR_FUN_0061c058 (vtable pointer)
  return 0;
}

// Source: decompiled/block_00410000.c FUN_004183d0 (335 bytes)
// FUN_004183d0 — destruct_editor_controls
export function FUN_004183d0() {
  // DEVIATION: Win32 — MFC destructor chain, SEH protected
  // Destroys 3 edit controls, 16 CWnd objects, 2 control arrays, 1 base frame
  FUN_0041851f();
  FUN_0041852e();
  FUN_0041853d();
  FUN_0041854c();
  FUN_0041855b();
  FUN_0041856a();
  FUN_00418579();
  FUN_00418588();
  FUN_00418597();
  FUN_004185a6();
  FUN_004185b5();
  FUN_004185c4();
  FUN_004185d3();
  FUN_004185e2();
  FUN_004185f1();
  FUN_00418600();
  FUN_0041860f();
  FUN_0041861e();
  FUN_0041862d();
  FUN_0041863c();
  FUN_00418654();
  FUN_0041866c();
  // DEVIATION: Win32 — FUN_0041867f() SEH restore
}

// FUN_0041851f..FUN_0041863c — destructor chain helpers
// Source: decompiled/block_00410000.c FUN_0041851f (15 bytes)
export function FUN_0041851f() { FUN_00418ea0(); }
// Source: decompiled/block_00410000.c FUN_0041852e (15 bytes)
export function FUN_0041852e() { FUN_00418ea0(); }
// Source: decompiled/block_00410000.c FUN_0041853d (15 bytes)
export function FUN_0041853d() { FUN_00418ea0(); }
export function FUN_0041854c() { FUN_0040f570(); }
export function FUN_0041855b() { FUN_0040f570(); }
export function FUN_0041856a() { FUN_0040f570(); }
export function FUN_00418579() { FUN_0040f570(); }
export function FUN_00418588() { FUN_0040f570(); }
export function FUN_00418597() { FUN_0040f570(); }
export function FUN_004185a6() { FUN_0040f570(); }
export function FUN_004185b5() { FUN_0040f570(); }
export function FUN_004185c4() { FUN_0040f570(); }
export function FUN_004185d3() { FUN_0040f570(); }
export function FUN_004185e2() { FUN_0040f570(); }
export function FUN_004185f1() { FUN_0040f570(); }
export function FUN_00418600() { FUN_0040f570(); }
export function FUN_0041860f() { FUN_0040f570(); }
export function FUN_0041861e() { FUN_0040f570(); }
export function FUN_0041862d() { FUN_0040f570(); }
export function FUN_0041863c() { _eh_vector_destructor_iterator_(); }
export function FUN_00418654() { _eh_vector_destructor_iterator_(); }
export function FUN_0041866c() { COleCntrFrameWnd_destroy(); }
// Source: decompiled/block_00410000.c FUN_0041867f (14 bytes)
export function FUN_0041867f() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// Source: decompiled/block_00410000.c FUN_00418740 (28 bytes)
// FUN_00418740 — get_control_id
export function FUN_00418740() {
  // DEVIATION: Win32 — thiscall: returns *(in_ECX + 4)
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00418770 (28 bytes)
// FUN_00418770 — get_hwnd
export function FUN_00418770() {
  // DEVIATION: Win32 — thiscall: returns *(in_ECX + 0x1c)
  return 0;
}

// Source: decompiled/block_00410000.c FUN_004187a0 (137 bytes)
// FUN_004187a0 — construct_dropdown_control
export function FUN_004187a0() {
  // DEVIATION: Win32 — thiscall constructor, SEH protected
  // FUN_0040f480() — base class constructor
  // *(in_ECX + 0x30) = 0; *(in_ECX + 0x2c) = 0;
  // *(in_ECX + 0x44) = 0; *(in_ECX + 0x34) = 0;
  // *(in_ECX + 0x38) = 0; *(in_ECX + 0x39) = 0;
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00418870 (90 bytes)
// FUN_00418870 — destruct_dropdown_control
export function FUN_00418870() {
  // DEVIATION: Win32 — MFC control destructor, SEH protected
  // if (*(in_ECX + 0x1c) !== 0) { FUN_005d2d3d(*(in_ECX + 0x1c)); }
  FUN_004188ca();
  // DEVIATION: Win32 — FUN_004188dd() SEH restore
}

// FUN_004188ca — destroy_base_control
export function FUN_004188ca() { FUN_0040f510(); }

// Source: decompiled/block_00410000.c FUN_004188dd (14 bytes)
// FUN_004188dd — restore_seh_4
export function FUN_004188dd() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// Source: decompiled/block_00410000.c FUN_00418910 (130 bytes)
// FUN_00418910 — create_listbox_control
export function FUN_00418910(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — thiscall: creates listbox control
  // if (*(in_ECX + 0x1c) !== 0) { FUN_0040f610(); }
  // *(in_ECX + 0x40) = PTR_DAT_00637e6c;
  // FUN_0040f730(param_1, 4, param_2, param_3);
  // *(in_ECX + 0x1c) = register_wndclass_2740(param_3, in_ECX, 1, 1, *(in_ECX + 0x40));
  // send_msg_2D7F(*(in_ECX + 0x1c), param_4);
}

// Source: decompiled/block_00410000.c FUN_004189c0 (43 bytes)
// FUN_004189c0 — set_listbox_style
export function FUN_004189c0(param_1) {
  // DEVIATION: Win32 — send_msg_2DA1(*(in_ECX + 0x1c), param_1)
}

// Source: decompiled/block_00410000.c FUN_00418a00 (33 bytes)
// FUN_00418a00 — set_listbox_callback
export function FUN_00418a00(param_1) {
  // DEVIATION: Win32 — thiscall: *(in_ECX + 0x34) = param_1
}

// Source: decompiled/block_00410000.c FUN_00418a30 (43 bytes)
// FUN_00418a30 — set_listbox_text
export function FUN_00418a30(param_1) {
  // DEVIATION: Win32 — send_msg_2D7F(*(in_ECX + 0x1c), param_1)
}

// Source: decompiled/block_00410000.c FUN_00418a70 (43 bytes)
// FUN_00418a70 — get_listbox_text
export function FUN_00418a70(param_1) {
  // DEVIATION: Win32 — send_msg_2D4D(*(in_ECX + 0x1c), param_1)
}

// Source: decompiled/block_00410000.c FUN_00418ab0 (103 bytes)
// FUN_00418ab0 — construct_spinner_control
export function FUN_00418ab0() {
  // DEVIATION: Win32 — thiscall constructor, SEH protected
  // FUN_0040f480() — base class constructor
  // *(in_ECX + 0x30) = 0; *(in_ECX + 0x34) = 0;
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00418b50 (90 bytes)
// FUN_00418b50 — destruct_spinner_control
export function FUN_00418b50() {
  // DEVIATION: Win32 — MFC control destructor, SEH protected
  // if (*(in_ECX + 0x1c) !== 0) { FUN_005d356e(*(in_ECX + 0x1c)); }
  FUN_00418baa();
  // DEVIATION: Win32 — FUN_00418bbd() SEH restore
}

// FUN_00418baa — destroy_base_control_2
export function FUN_00418baa() { FUN_0040f510(); }

// Source: decompiled/block_00410000.c FUN_00418bbd (14 bytes)
// FUN_00418bbd — restore_seh_5
export function FUN_00418bbd() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// Source: decompiled/block_00410000.c FUN_00418bf0 (101 bytes)
// FUN_00418bf0 — create_combo_control
export function FUN_00418bf0(param_1, param_2, param_3) {
  // DEVIATION: Win32 — thiscall: creates combo box control
  // if (*(in_ECX + 0x1c) !== 0) { FUN_0040f610(); }
  // FUN_0040f730(param_1, 10, param_2, param_3);
  // *(in_ECX + 0x1c) = register_wndclass_3130(param_3, in_ECX, 1);
  // *(in_ECX + 0x2c) = 0;
}

// Source: decompiled/block_00410000.c FUN_00418c70 (48 bytes)
// FUN_00418c70 — refresh_combo_data
export function FUN_00418c70() {
  // DEVIATION: Win32 — thiscall
  // let uVar1 = FUN_00418cb0();
  // send_msg_35C8(*(in_ECX + 0x1c), uVar1);
}

// Source: decompiled/block_00410000.c FUN_00418cb0 (27 bytes)
// FUN_00418cb0 — get_combo_data_ptr
export function FUN_00418cb0() {
  // DEVIATION: Win32 — thiscall: returns *in_ECX
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00418ce0 (49 bytes)
// FUN_00418ce0 — add_combo_item
export function FUN_00418ce0(param_1) {
  // DEVIATION: Win32 — thiscall
  // send_msg_357E(*(in_ECX + 0x1c), param_1);
  // *(in_ECX + 0x2c) = *(in_ECX + 0x2c) + 1;
}

// Source: decompiled/block_00410000.c FUN_00418d20 (47 bytes)
// FUN_00418d20 — reset_combo
export function FUN_00418d20() {
  // DEVIATION: Win32 — thiscall
  // send_msg_360A(*(in_ECX + 0x1c));
  // *(in_ECX + 0x2c) = 0;
}

// Source: decompiled/block_00410000.c FUN_00418d60 (37 bytes)
// FUN_00418d60 — get_combo_selection
export function FUN_00418d60() {
  // DEVIATION: Win32 — thiscall: send_msg_36B1(*(in_ECX + 0x1c))
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00418d90 (43 bytes)
// FUN_00418d90 — set_combo_selection
export function FUN_00418d90(param_1) {
  // DEVIATION: Win32 — thiscall: send_msg_36F6(*(in_ECX + 0x1c), param_1)
}

// Source: decompiled/block_00410000.c FUN_00418dd0 (33 bytes)
// FUN_00418dd0 — set_combo_callback
export function FUN_00418dd0(param_1) {
  // DEVIATION: Win32 — thiscall: *(in_ECX + 0x34) = param_1
}

// Source: decompiled/block_00410000.c FUN_00418e00 (103 bytes)
// FUN_00418e00 — construct_edit_control
export function FUN_00418e00() {
  // DEVIATION: Win32 — thiscall constructor, SEH protected
  // FUN_0040f480() — base class constructor
  // *(in_ECX + 0x30) = 0; *(in_ECX + 0x34) = 0;
  return 0;
}

// Source: decompiled/block_00410000.c FUN_00418ea0 (90 bytes)
// FUN_00418ea0 — destruct_edit_control
export function FUN_00418ea0() {
  // DEVIATION: Win32 — MFC control destructor, SEH protected
  // if (*(in_ECX + 0x1c) !== 0) { FUN_005d3c40(*(in_ECX + 0x1c)); }
  FUN_00418efa();
  // DEVIATION: Win32 — FUN_00418f0d() SEH restore
}

// FUN_00418efa — destroy_base_control_3
export function FUN_00418efa() { FUN_0040f510(); }

// Source: decompiled/block_00410000.c FUN_00418f0d (14 bytes)
// FUN_00418f0d — restore_seh_6
export function FUN_00418f0d() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// Source: decompiled/block_00410000.c FUN_00418f40 (121 bytes)
// FUN_00418f40 — create_treeview_control
export function FUN_00418f40(param_1, param_2, param_3) {
  // DEVIATION: Win32 — thiscall: creates treeview control
  // if (*(in_ECX + 0x1c) !== 0) { FUN_0040f610(); }
  // *(in_ECX + 0x38) = PTR_DAT_00637e70;
  // FUN_0040f730(param_1, 7, param_2, param_3);
  // *(in_ECX + 0x1c) = register_wndclass_37A0(param_3, in_ECX, 1, 0, *(in_ECX + 0x38));
  // *(in_ECX + 0x2c) = 0;
}

// Source: decompiled/block_00410000.c FUN_00418fe0 (48 bytes)
// FUN_00418fe0 — refresh_treeview_data
export function FUN_00418fe0() {
  // DEVIATION: Win32 — thiscall
  // let uVar1 = FUN_00418cb0();
  // send_msg_3C9A(*(in_ECX + 0x1c), uVar1);
}

// Source: decompiled/block_00410000.c FUN_00419020 (49 bytes)
// FUN_00419020 — add_treeview_item
export function FUN_00419020(param_1) {
  // DEVIATION: Win32 — thiscall
  // send_msg_3C50(*(in_ECX + 0x1c), param_1);
  // *(in_ECX + 0x2c) = *(in_ECX + 0x2c) + 1;
}

// Source: decompiled/block_00410000.c FUN_00419060 (47 bytes)
// FUN_00419060 — reset_treeview
export function FUN_00419060() {
  // DEVIATION: Win32 — thiscall
  // send_msg_3CDC(*(in_ECX + 0x1c));
  // *(in_ECX + 0x2c) = 0;
}

// FUN_004190a0 — append_padding_spaces
export function FUN_004190a0(param_1) {
  FUN_004aef57(G.DAT_00679640, param_1);
}

// FUN_004190d0 — show_help_text
export function FUN_004190d0(param_1, param_2) {
  FUN_00419100(param_1, param_2, 0);
}

// FUN_00419100 — show_help_text_2
export function FUN_00419100(param_1, param_2, param_3) {
  FUN_00419130(param_1, param_2, 0, param_3);
}

// FUN_00419130 — show_help_text_3
export function FUN_00419130(param_1, param_2, param_3, param_4) {
  FUN_0051d3e0(param_1, param_2, param_3, 0, 0, 0, param_4);
}

// FUN_00419170 — hotseat_game_loop
export function FUN_00419170() {
  // DEVIATION: Win32/MFC — SEH frame, CString, dialog management
  FUN_0059db08(0x4000);
  FUN_005c64da();
  for (let local_310 = 0; local_310 < 8; local_310 = local_310 + 1) {
    G.DAT_00654b60[local_310] = 0;
  }
  G.DAT_00654b70 = 0;
  G.DAT_00655b02 = 1;
  // DEVIATION: Win32 — main hotseat loop with palette setup, dialog prompts,
  // new game/load game/scenario dispatch. Returns on exit.
  // Key game state mutations: G.DAT_00655b02=1, G.DAT_00654b70=0, G.DAT_00654b60 zeroed,
  // G.DAT_0066653c, G.DAT_00627670, G.DAT_00624ee8-G.DAT_00624ef8 randomized,
  // G.DAT_006a9110, G.DAT_00655aea, G.DAT_00655b0a, G.DAT_00655b0b, G.DAT_00654fb0 set.
  // Calls: FUN_005bf5e1, FUN_00419be0, FUN_00419ba0, FUN_00419b80,
  // FUN_0052263c, FUN_0040ffa0, FUN_0059ea99, FUN_005f22d0, FUN_005226fa,
  // FUN_0059e783, FUN_0040bc80, FUN_0046e020, FUN_0055a567,
  // FUN_0041e864, FUN_0041d417, FUN_0041dd0e, FUN_0041d7ea, FUN_005218cb,
  // FUN_0051dd97, FUN_005227e3, FUN_00521fe0, FUN_00522dfa, FUN_0051f19c,
  // FUN_00522f8f, FUN_004a73d9, FUN_0041a046, FUN_0041a5c4, FUN_0041a422,
  // FUN_00419c8b, FUN_00408d33, FUN_004aa9c0, FUN_004a9785, FUN_0040bbb0,
  // FUN_0040bc10, FUN_00578c12, load_verify_units, FUN_00410030
}

// FUN_00419940 — close_hotseat_modal
export function FUN_00419940() { FUN_005c656b(); }

// FUN_0041994c — cleanup_hotseat_buffer
export function FUN_0041994c() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_00419962 (15 bytes)
// FUN_00419962 — restore_seh_hotseat
export function FUN_00419962() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_00419b80 — init_palette_subsystem
export function FUN_00419b80() { FUN_005bbb32(); }

// FUN_00419ba0 — set_palette
export function FUN_00419ba0(param_1) {
  update_palette_C280(0, param_1);
}

// FUN_00419be0 — load_palette_file
export function FUN_00419be0(param_1) {
  FUN_005bc3f1(0, param_1);
}

// FID_conflict:_$E31 — static initializer
export function FID_conflict___E31() {
  FUN_00419c3a();
  FUN_00419c54();
}

// FUN_00419c3a — static_init_gdi
export function FUN_00419c3a() { FUN_005bd630(); }

// FUN_00419c54 — register_atexit
export function FUN_00419c54() { _atexit(FUN_00419c71); }

// FUN_00419c71 — atexit_cleanup
export function FUN_00419c71() { FUN_005bd915(); }

// FUN_00419c8b — init_sound_and_music
export function FUN_00419c8b() {
  FUN_0046e020(0xffffff95, 0, 1, 0);
  FUN_0046e020(0x6c, 0, 0, 0);
}

// FUN_00419cbb — parse_cosmic_value_clamped
export function FUN_00419cbb(param_1, param_2) {
  FUN_004a23fc(1);
  let uVar1 = FUN_004a2534();
  return FUN_005adfa0(uVar1, param_1, param_2);
}

// FUN_00419cf4 — parse_cosmic_value
export function FUN_00419cf4(param_1, param_2) {
  let uVar1 = FUN_004a2534();
  return FUN_005adfa0(uVar1, param_1, param_2);
}

// FUN_00419d23 — parse_cosmic_parameters
export function FUN_00419d23() {
  FUN_004a2379(G.DAT_006559e8, s_COSMIC_006252cc);
  G.DAT_0064bcc8 = FUN_00419cbb(1, 10);
  G.DAT_0064bcc9 = FUN_00419cbb(1, 100);
  G.DAT_0064bcca = FUN_00419cbb(0, 10);
  G.DAT_0064bccb = FUN_00419cbb(4, 0x14);
  if ((G.DAT_0064bccb & 1) !== 0) G.DAT_0064bccb = G.DAT_0064bccb + 1;
  G.DAT_0064bccc = FUN_00419cbb(4, 0x14);
  G.DAT_0064bccd = FUN_00419cbb(0, 10);
  G.DAT_0064bcce = FUN_00419cbb(0, 10);
  G.DAT_0064bccf = FUN_00419cbb(4, 0xc);
  G.DAT_0064bcd0 = FUN_00419cbb(10, 100);
  G.DAT_0064bcd1 = FUN_00419cbb(4, 0x32);
  G.DAT_0064bcd2 = FUN_00419cbb(4, 0x32);
  G.DAT_0064bcd3 = FUN_00419cbb(3, 10);
  G.DAT_0064bcd4 = FUN_00419cbb(5, 100);
  G.DAT_0064bcd5 = FUN_00419cbb(0, 8);
  G.DAT_0064bcd6 = FUN_00419cbb(0, 8);
  G.DAT_0064bcd7 = FUN_00419cbb(0, 8);
  G.DAT_0064bcd8 = FUN_00419cbb(1, 0x14);
  G.DAT_0064bcd9 = FUN_00419cbb(0, 100);
  G.DAT_0064bcda = FUN_00419cbb(0, 100);
  G.DAT_0064bcdb = FUN_00419cbb(4, 100);
  G.DAT_0064bcdc = FUN_00419cbb(0x19, 200);
  G.DAT_0064bcdd = FUN_00419cbb(0, 10);
}

// FUN_00419ed3 — normalize_leader_values
export function FUN_00419ed3() {
  for (let local_8 = 0; local_8 < 0x15; local_8 = local_8 + 1) {
    G.DAT_00655502[local_8 * 0x30] = G.DAT_00655508[u8(G.DAT_006554fc[local_8 * 0x30]) * 2 + local_8 * 0x30];
    if (G.DAT_00655504[local_8 * 0x30] < 1) {
      G.DAT_00655504[local_8 * 0x30] = (-G.DAT_00655504[local_8 * 0x30]) & 0xFFFF;
    }
    if (G.DAT_00655506[local_8 * 0x30] < 1) {
      G.DAT_00655506[local_8 * 0x30] = (-G.DAT_00655506[local_8 * 0x30]) & 0xFFFF;
    }
    for (let local_10 = 0; local_10 < 7; local_10 = local_10 + 1) {
      for (let local_c = 0; local_c < 2; local_c = local_c + 1) {
        if (G.DAT_0065550c[local_8 * 0x30 + local_c * 2 + local_10 * 4] < 1) {
          G.DAT_0065550c[local_8 * 0x30 + local_c * 2 + local_10 * 4] =
            (-G.DAT_0065550c[local_8 * 0x30 + local_c * 2 + local_10 * 4]) & 0xFFFF;
        }
      }
    }
  }
}

// FUN_0041a046 — parse_advances_from_rules
export function FUN_0041a046(param_1) {
  FUN_004a2379(G.DAT_006559e8, s_CIVILIZE_006252d4);
  G.DAT_00655b1a = 0;
  let local_14;
  for (local_14 = 0; local_14 < 100; local_14 = local_14 + 1) {
    G.DAT_0062768f[local_14 * 0x10] = 0xfe;
    G.DAT_0062768e[local_14 * 0x10] = G.DAT_0062768f[local_14 * 0x10];
    if (G.DAT_0062768e[local_14 * 0x10] === 0xfe) {
      G.DAT_00627689[local_14 * 0x10] = 0;
    } else {
      G.DAT_00627689[local_14 * 0x10] = 1;
    }
  }
  for (local_14 = 0; local_14 < 100; local_14 = local_14 + 1) {
    FUN_004a23fc(1);
    let sVar3 = _strlen(G.DAT_00679640);
    if ((sVar3 === 0) || (G.DAT_00679640 === 0x3b)) break; // ';'
    if (param_1 === 0) {
      let uVar4 = FUN_004a26bf(0x14);
      G.DAT_00627684[local_14 * 4] = uVar4;
    } else {
      FUN_004a24b1();
    }
    let uVar2 = FUN_004a2534();
    G.DAT_0062768a[local_14 * 0x10] = uVar2;
    uVar2 = FUN_004a2534();
    G.DAT_0062768b[local_14 * 0x10] = uVar2;
    for (let local_c = 0; local_c < 2; local_c = local_c + 1) {
      let uVar4 = FUN_004a24b1();
      uVar2 = FUN_004b0720(uVar4);
      G.DAT_0062768e[local_14 * 0x10 + local_c] = uVar2;
      if (s8(G.DAT_0062768e[local_14 * 0x10 + local_c]) === -3) {
        FUN_00589ef8(-4, 3, G.DAT_00679640, local_14, local_c);
      }
    }
    uVar2 = FUN_004a2534();
    G.DAT_0062768d[local_14 * 0x10] = uVar2;
    uVar2 = FUN_004a2534();
    G.DAT_0062768c[local_14 * 0x10] = uVar2;
    if (s8(G.DAT_0062768e[local_14 * 0x10]) === -2) {
      G.DAT_00627689[local_14 * 0x10] = 0;
    } else {
      G.DAT_00627689[local_14 * 0x10] = 1;
    }
  }
  for (; local_14 < 100; local_14 = local_14 + 1) {
    if (param_1 === 0) {
      _sprintf(G.DAT_00673e10, 'Advance %d', local_14 + 1);
      let uVar4 = FUN_00428b68(G.DAT_00673e10, 0x14);
      G.DAT_00627684[local_14 * 4] = uVar4;
    }
    G.DAT_0062768a[local_14 * 0x10] = 3;
    G.DAT_0062768b[local_14 * 0x10] = 0;
    for (let local_c = 0; local_c < 2; local_c = local_c + 1) {
      G.DAT_0062768e[local_14 * 0x10 + local_c] = 0xfe;
    }
    G.DAT_0062768d[local_14 * 0x10] = 0;
    G.DAT_0062768c[local_14 * 0x10] = 0;
    if (s8(G.DAT_0062768e[local_14 * 0x10]) === -2) {
      G.DAT_00627689[local_14 * 0x10] = 0;
    } else {
      G.DAT_00627689[local_14 * 0x10] = 1;
    }
  }
  for (local_14 = 0; local_14 < 100; local_14 = local_14 + 1) {
    if (G.DAT_00627689[local_14 * 0x10] !== 0) {
      G.DAT_00655b1a = G.DAT_00655b1a + 1;
      for (let local_c = 0; local_c < 2; local_c = local_c + 1) {
        let local_18 = s8(G.DAT_0062768e[local_14 * 0x10 + local_c]);
        let bVar1 = false;
        while ((-1 < local_18 && (!bVar1))) {
          if (G.DAT_00627689[local_18 * 0x10] === 0) {
            local_18 = s8(G.DAT_0062768e[local_18 * 0x10]);
          } else {
            bVar1 = true;
          }
        }
        G.DAT_0062768e[local_14 * 0x10 + local_c] = local_18 & 0xFF;
      }
    }
  }
}

// FUN_0041a422 — parse_improvements_from_rules
export function FUN_0041a422(param_1) {
  FUN_004a2379(G.DAT_006559e8, s_IMPROVE_006252ec);
  for (let local_8 = 0; local_8 < 0x43; local_8 = local_8 + 1) {
    FUN_004a23fc(1);
    if (param_1 === 0) {
      let uVar2 = FUN_004a26bf(0x19);
      w32(G.DAT_0064c488, local_8 * 8, uVar2);
    } else {
      FUN_004a24b1();
    }
    let uVar1 = FUN_004a2534();
    G.DAT_0064c48c[local_8 * 8] = uVar1;
    uVar1 = FUN_004a2534();
    G.DAT_0064c48d[local_8 * 8] = uVar1;
    let uVar2 = FUN_004a24b1();
    uVar1 = FUN_004b0720(uVar2);
    G.DAT_0064c48e[local_8 * 8] = uVar1;
    if (s8(G.DAT_0064c48e[local_8 * 8]) === -3) {
      FUN_00589ef8(-5, 3, G.DAT_00679640, local_8, 0);
    }
    while ((-1 < s8(G.DAT_0064c48e[local_8 * 8]) &&
           (G.DAT_00627689[s8(G.DAT_0064c48e[local_8 * 8]) * 0x10] === 0))) {
      G.DAT_0064c48e[local_8 * 8] = G.DAT_0062768e[s8(G.DAT_0064c48e[local_8 * 8]) * 0x10];
    }
  }
  FUN_004a2379(0, s_ENDWONDER_006252f4);
  for (let local_8 = 0; local_8 < 0x1c; local_8 = local_8 + 1) {
    FUN_004a23fc(1);
    let uVar2 = FUN_004a24b1();
    let uVar1 = FUN_004b0720(uVar2);
    G.DAT_0064ba28[local_8] = uVar1;
    if (s8(G.DAT_0064ba28[local_8]) === -3) {
      FUN_00589ef8(-4, 3, G.DAT_00679640, local_8, 0);
    }
  }
}

// FUN_0041a5c4 — parse_units_from_rules
export function FUN_0041a5c4(param_1) {
  G.DAT_00628068 = 0;
  let local_8;
  for (local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
    G.DAT_0064b1cb[local_8 * 0x14] = 0xfe;
  }
  FUN_004a2379(0, s_UNITS_00625300);
  for (local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
    FUN_004a23fc(1);
    let sVar3 = _strlen(G.DAT_00679640);
    if ((sVar3 === 0) || (G.DAT_00679640 === 0x3b)) break; // ';'
    if (param_1 === 0) {
      let uVar5 = FUN_004a26bf(0xf);
      G.DAT_0064b1b8[local_8 * 0x14 / 4] = uVar5;
      G.DAT_0066be90[local_8] = G.DAT_0063e4b8;
    } else {
      FUN_004a24b1();
    }
    let uVar5 = FUN_004a24b1();
    let uVar1 = FUN_004b0720(uVar5);
    G.DAT_0064b1c0[local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    G.DAT_0064b1c1[local_8 * 0x14] = uVar1;
    let cVar2 = FUN_004a2534();
    G.DAT_0064b1c2[local_8 * 0x14] = (cVar2 * G.DAT_0064bcc8) & 0xFF;
    uVar1 = FUN_004a2534();
    G.DAT_0064b1c3[local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    G.DAT_0064b1c4[local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    G.DAT_0064b1c5[local_8 * 0x14] = uVar1;
    cVar2 = FUN_004a2534();
    G.DAT_0064b1c6[local_8 * 0x14] = (cVar2 * 10) & 0xFF;
    uVar1 = FUN_004a2534();
    G.DAT_0064b1c7[local_8 * 0x14] = uVar1;
    uVar1 = FUN_00419cf4(1, 200);
    G.DAT_0064b1c8[local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    G.DAT_0064b1c9[local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    G.DAT_0064b1ca[local_8 * 0x14] = uVar1;
    uVar5 = FUN_004a24b1();
    uVar1 = FUN_004b0720(uVar5);
    G.DAT_0064b1cb[local_8 * 0x14] = uVar1;
    let uVar4 = FUN_004a25d5();
    G.DAT_0064b1bc[local_8 * 0x14 / 4] = uVar4 & 0xffff;
    if ((s8(G.DAT_0064b1c0[local_8 * 0x14]) === -3) || (s8(G.DAT_0064b1cb[local_8 * 0x14]) === -3)) {
      FUN_00589ef8(-6, 3, G.DAT_00679640, local_8, 0);
    }
  }
  for (; local_8 < 0x3e; local_8 = local_8 + 1) {
    if (param_1 === 0) {
      _sprintf(G.DAT_00673e10, 'Unit %d', local_8 + 1);
      let uVar5 = FUN_00428b68(G.DAT_00673e10, 0xf);
      G.DAT_0064b1b8[local_8 * 0x14 / 4] = uVar5;
    }
    G.DAT_0064b1c0[local_8 * 0x14] = 0xfe;
    G.DAT_0064b1c1[local_8 * 0x14] = 0;
    G.DAT_0064b1c2[local_8 * 0x14] = 0;
    G.DAT_0064b1c3[local_8 * 0x14] = 0;
    G.DAT_0064b1c4[local_8 * 0x14] = 1;
    G.DAT_0064b1c5[local_8 * 0x14] = 0;
    G.DAT_0064b1c6[local_8 * 0x14] = 0;
    G.DAT_0064b1c7[local_8 * 0x14] = 0;
    G.DAT_0064b1c8[local_8 * 0x14] = 1;
    G.DAT_0064b1c9[local_8 * 0x14] = 0;
    G.DAT_0064b1ca[local_8 * 0x14] = 0;
    G.DAT_0064b1cb[local_8 * 0x14] = 0xfe;
    G.DAT_0064b1bc[local_8 * 0x14 / 4] = 0;
    if ((s8(G.DAT_0064b1c0[local_8 * 0x14]) === -3) || (s8(G.DAT_0064b1cb[local_8 * 0x14]) === -3)) {
      FUN_00589ef8(-6, 3, G.DAT_00679640, local_8, 0);
    }
  }
}

// FUN_0041a95f — parse_terrain_from_rules
export function FUN_0041a95f() {
  FUN_004a2379(0, s_TERRAIN_00625310);
  for (let local_c = 0; local_c < 0x21; local_c = local_c + 1) {
    FUN_004a23fc(1);
    let uVar2 = FUN_004a26bf(0xf);
    G.DAT_00627cc4[local_c * 6] = uVar2;
    let uVar1 = FUN_004a2534();
    G.DAT_00627cc8[local_c * 0x18] = uVar1;
    uVar1 = FUN_004a2534();
    G.DAT_00627cc9[local_c * 0x18] = uVar1;
    for (let local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
      uVar1 = FUN_004a2534();
      G.DAT_00627cca[local_c * 0x18 + local_8] = uVar1;
    }
    if (local_c < 0xb) {
      for (let local_8 = 0; local_8 < 2; local_8 = local_8 + 1) {
        uVar2 = FUN_004a24b1();
        uVar1 = FUN_004b07d1(uVar2);
        G.DAT_00627cce[local_c * 0x18 + local_8] = uVar1;
        uVar1 = FUN_004a2534();
        G.DAT_00627cd0[local_c * 0x18 + local_8] = uVar1;
        uVar1 = FUN_004a2534();
        G.DAT_00627cd2[local_c * 0x18 + local_8] = uVar1;
        uVar1 = FUN_004a2534();
        G.DAT_00627cd4[local_c * 0x18 + local_8] = uVar1;
        if (s8(G.DAT_00627cce[local_c * 0x18 + local_8]) === -3) {
          FUN_00589ef8(-7, 3, G.DAT_00679640, local_c, local_8);
        }
      }
      uVar2 = FUN_004a24b1();
      uVar1 = FUN_004b07d1(uVar2);
      G.DAT_00627ccd[local_c * 0x18] = uVar1;
      if (s8(G.DAT_00627ccd[local_c * 0x18]) === -3) {
        FUN_00589ef8(-7, 3, G.DAT_00679640, local_c, 99);
      }
    }
  }
}

// FUN_0041ab18 — parse_governments_and_leaders
export function FUN_0041ab18(param_1) {
  FUN_004a2379(0, s_GOVERNMENTS_00625318);
  for (let local_10 = 0; local_10 < 7; local_10 = local_10 + 1) {
    FUN_004a23fc(1);
    let uVar6 = FUN_004a26bf(0xf);
    G.DAT_0064b9a0[local_10] = uVar6;
    uVar6 = FUN_004a26bf(0xf);
    G.DAT_00654fe0[local_10 * 2] = uVar6;
    uVar6 = FUN_004a26bf(0xf);
    G.DAT_00654fe4[local_10 * 2] = uVar6;
  }
  FUN_004a2379(0, s_LEADERS_00625324);
  for (let local_10 = 0; local_10 < 0x15; local_10 = local_10 + 1) {
    FUN_004a23fc(1);
    let uVar5 = G.DAT_00655508[local_10 * 0x30 / 2];
    let uVar4 = G.DAT_0065550a[local_10 * 0x30 / 2];
    let uVar3 = FUN_004a26bf(0x18);
    G.DAT_00655508[local_10 * 0x30 / 2] = uVar3;
    uVar3 = FUN_004a26bf(0x18);
    G.DAT_0065550a[local_10 * 0x30 / 2] = uVar3;
    if (param_1 === 0) {
      G.DAT_00655508[local_10 * 0x30 / 2] = uVar5;
      G.DAT_0065550a[local_10 * 0x30 / 2] = uVar4;
    }
    let uVar1 = G.DAT_006554fc[local_10 * 0x30];
    let uVar6 = FUN_004a2534(0, 1);
    let uVar2 = FUN_005adfa0(uVar6);
    G.DAT_006554fc[local_10 * 0x30] = uVar2;
    if (param_1 === 0) {
      G.DAT_006554fc[local_10 * 0x30] = uVar1;
    } else {
      G.DAT_00655502[local_10 * 0x30 / 2] =
        G.DAT_00655508[u8(G.DAT_006554fc[local_10 * 0x30]) * 2 + local_10 * 0x30 / 2];
    }
    uVar5 = G.DAT_006554fe[local_10 * 0x30 / 2];
    uVar4 = FUN_004a2534();
    G.DAT_006554fe[local_10 * 0x30 / 2] = uVar4;
    if (param_1 === 0) {
      G.DAT_006554fe[local_10 * 0x30 / 2] = uVar5;
    } else {
      uVar5 = FUN_005adfa0(G.DAT_006554fe[local_10 * 0x30 / 2] | 0, 1, 7);
      G.DAT_006554fe[local_10 * 0x30 / 2] = uVar5;
    }
    uVar5 = G.DAT_00655500[local_10 * 0x30 / 2];
    uVar4 = FUN_004a2534();
    G.DAT_00655500[local_10 * 0x30 / 2] = uVar4;
    if (param_1 === 0) {
      G.DAT_00655500[local_10 * 0x30 / 2] = uVar5;
    } else {
      uVar5 = FUN_005adfa0(G.DAT_00655500[local_10 * 0x30 / 2] | 0, 0, 3);
      G.DAT_00655500[local_10 * 0x30 / 2] = uVar5;
    }
    uVar5 = G.DAT_00655504[local_10 * 0x30 / 2];
    uVar4 = G.DAT_00655506[local_10 * 0x30 / 2];
    uVar3 = FUN_004a26bf(0x18);
    G.DAT_00655504[local_10 * 0x30 / 2] = uVar3;
    uVar3 = FUN_004a26bf(0x18);
    G.DAT_00655506[local_10 * 0x30 / 2] = uVar3;
    if (param_1 === 0) {
      G.DAT_00655504[local_10 * 0x30 / 2] = uVar5;
      G.DAT_00655506[local_10 * 0x30 / 2] = uVar4;
    }
    uVar1 = G.DAT_006554f8[local_10 * 0x30];
    uVar2 = FUN_004a2534();
    G.DAT_006554f8[local_10 * 0x30] = uVar2;
    if (param_1 === 0) { G.DAT_006554f8[local_10 * 0x30] = uVar1; }
    uVar1 = G.DAT_006554f9[local_10 * 0x30];
    uVar2 = FUN_004a2534();
    G.DAT_006554f9[local_10 * 0x30] = uVar2;
    if (param_1 === 0) { G.DAT_006554f9[local_10 * 0x30] = uVar1; }
    uVar1 = G.DAT_006554fa[local_10 * 0x30];
    uVar2 = FUN_004a2534();
    G.DAT_006554fa[local_10 * 0x30] = uVar2;
    if (param_1 === 0) { G.DAT_006554fa[local_10 * 0x30] = uVar1; }
    for (let local_18 = 0; local_18 < 7; local_18 = local_18 + 1) {
      for (let local_1c = 0; local_1c < 2; local_1c = local_1c + 1) {
        if (param_1 !== 0) {
          G.DAT_0065550c[local_18 * 2 + local_10 * 0x18 + local_1c] =
            G.DAT_00654fe0[local_1c + local_18 * 2] & 0xFFFF;
        }
      }
    }
    let iVar7;
    do {
      iVar7 = FUN_004a2534();
      if (0 < iVar7) {
        uVar5 = G.DAT_0065550c[iVar7 * 2 + local_10 * 0x18];
        uVar4 = G.DAT_0065550e[iVar7 * 2 + local_10 * 0x18];
        uVar3 = FUN_004a25aa();
        G.DAT_0065550c[iVar7 * 2 + local_10 * 0x18] = uVar3;
        uVar3 = FUN_004a25aa();
        G.DAT_0065550e[iVar7 * 2 + local_10 * 0x18] = uVar3;
        if (param_1 === 0) {
          G.DAT_0065550c[iVar7 * 2 + local_10 * 0x18] = uVar5;
          G.DAT_0065550e[iVar7 * 2 + local_10 * 0x18] = uVar4;
        }
      }
    } while (0 < iVar7);
  }
}

// FUN_0041b00e — parse_all_rules
export function FUN_0041b00e(param_1) {
  FUN_00419d23();
  FUN_0041a046(0);
  FUN_0041a422(0);
  FUN_0041a5c4(0);
  FUN_0041a95f();
  FUN_0041ab18(param_1);
  FUN_004a2379(0, s_CARAVAN_0062532c);
  for (let local_8 = 0; local_8 < 0x10; local_8 = local_8 + 1) {
    FUN_004a23fc(1);
    let uVar1 = FUN_004a26bf(10);
    G.DAT_0064b168[local_8] = uVar1;
  }
  FUN_004a2379(0, s_ORDERS_00625334);
  for (let local_8 = 1; local_8 < 0xd; local_8 = local_8 + 1) {
    FUN_004a23fc(1);
    let uVar1 = FUN_004a25aa();
    G.DAT_00655490[local_8 * 8] = uVar1;
    FUN_004a24b1();
  }
  FUN_004a2379(0, s_DIFFICULTY_0062533c);
  for (let local_8 = 0; local_8 < 6; local_8 = local_8 + 1) {
    let uVar1 = FUN_004a257a();
    G.DAT_0064ba10[local_8] = uVar1;
  }
  FUN_004a2379(0, s_ATTITUDES_00625348);
  for (let local_8 = 0; local_8 < 9; local_8 = local_8 + 1) {
    let uVar1 = FUN_004a257a();
    G.DAT_0064b9c0[local_8] = uVar1;
  }
  FUN_004a2020();
}

// FUN_0041b177 — select_language
export function FUN_0041b177() {
  // DEVIATION: Win32/MFC — SEH frame, dialog management
  FUN_0059db08(0x4000);
  let local_328 = 1;
  let local_2c = 1;
  let local_32c = 1;
  let iVar1 = FUN_004a2379(0, 0); // INTER.DAT section
  if (iVar1 === 0) {
    FUN_004a23fc(1);
    local_328 = FUN_004a2534();
    FUN_004a23fc(1);
    local_2c = FUN_004a2534();
    FUN_004a23fc(1);
    local_32c = FUN_004a2534();
    FUN_004a2020();
  }
  if (((local_328 === 0) && (local_2c === 0)) && (local_32c === 0)) {
    local_32c = 1; local_2c = 1; local_328 = 1;
  }
  // DEVIATION: Win32 — language selection dialog with GetPrivateProfileIntA/WritePrivateProfileStringA
  let local_330 = 0;
  G.DAT_00628064 = local_330;
  // Set language suffix based on selection
  FUN_0041b46a();
  FUN_0041b480();
}

// FUN_0041b46a — cleanup_language_buffer
export function FUN_0041b46a() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0041b480 (15 bytes)
// FUN_0041b480 — restore_seh_language
export function FUN_0041b480() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_0041b48f — shutdown_game
export function FUN_0041b48f() {
  if (G.DAT_006252c4 !== 0) FUN_0041f878();
  FUN_0041b8b0();
  G.DAT_0062c5b0 = 1;
}

// FUN_0041b4c0 — init_game_engine
export function FUN_0041b4c0() {
  FUN_005f22d0(G.DAT_006558e8, 0);
  FUN_005f22d0(G.DAT_006559e8, s_RULES_006253f0);
  __getcwd(G.DAT_00655020, 0x104);
  FUN_005f22d0(G.DAT_0064bb08, G.DAT_00655020);
  for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
    G.DAT_0066ca84[(local_c * 0x3f0) / 2] = 0;
    G.DAT_0066c988 = 0;
  }
  timeBeginPeriod(4);
  // ... initialization chain
  FUN_0041b00e(1);
  load_civ2_art_005681c9();
  load_city_preferences();
  FUN_00498784();
  G.DAT_00654fa8 = 0;
  G.DAT_00654fa4 = 0;
  G.DAT_00654fa6 = 0;
  return 0;
}

// FUN_0041b8b0 — cleanup_subsystems
export function FUN_0041b8b0() {
  FUN_00484d52();
  FUN_005d48d0();
  FUN_00484d52();
  FUN_00568381();
  FUN_00484d52();
  FUN_004db450();
  FUN_0046a740();
  FUN_00428a78();
  FUN_00484d52();
  FUN_00589c79();
  FUN_00484d52();
  timeEndPeriod(4);
}

// FUN_0041b8ff — show_science_advisor_report
export function FUN_0041b8ff(param_1) {
  let local_3c = 100;
  let local_38 = 0;
  let aiStack_34 = new Array(12).fill(0);
  while ((0 < local_3c && (local_38 < 0xc))) {
    if (((G.DAT_0062768e[local_3c * 0x10] !== 0xfe) || (G.DAT_0062768f[local_3c * 0x10] !== 0xfe)) &&
       (FUN_004bd9f0(param_1, local_3c) !== 0)) {
      aiStack_34[local_38] = local_3c;
      local_38 = local_38 + 1;
    }
    local_3c = local_3c + -1;
  }
  let uVar2 = FUN_00493b10(param_1);
  FUN_0040ff60(0, uVar2);
  uVar2 = FUN_00493c7d(param_1);
  FUN_0040ff60(1, uVar2);
  FUN_0040bbb0();
  local_3c = local_38;
  if (0 < local_38) {
    while (local_3c = local_3c + -1, -1 < local_3c) {
      FUN_0040ff00(G.DAT_00627684[aiStack_34[local_3c] * 0x10 / 4]);
      FUN_00421d30();
      FUN_0040fe10();
    }
  }
  FUN_0040ff60(2, G.DAT_00679640);
  if (2 < G.DAT_00655b02) {
    G.DAT_00635a3c = 0; // &LAB_00403c74
  }
  FUN_00410030(0, G.DAT_0063fc58, 0); // s_DIFFICULTY_006254a0
}

// FUN_0041ba52 — new_game_setup_wizard
export function FUN_0041ba52(param_1) {
  // DEVIATION: Win32/MFC — SEH frame, dialog management, 6555 bytes of UI code
  FUN_0059db08(0x2000);
  FUN_00419ed3();
  _DAT_00655af6 = 0;
  // DEVIATION: Win32 — extensive new game setup wizard:
  // Difficulty selection → opponent count → barbarity → rules config → gender →
  // accelerated startup → tribe selection → map customization.
  // Key game state mutations: G.DAT_00655b08, G.DAT_0064bc14, G.DAT_0064bc24,
  // G.DAT_00655b0d, G.DAT_00655b09, G.DAT_0064bc28, G.DAT_00655ae8, G.DAT_0064bc54,
  // G.DAT_0064bc56, G.DAT_00631ed8, G.DAT_00631edc, G.DAT_00655aea, G.DAT_0064bc1e,
  // G.DAT_006d1168, G.DAT_0064bc2a-G.DAT_0064bc32, G.DAT_0064bc62, G.DAT_0064bcb2,
  // G.DAT_0064bcb8, G.DAT_0064bcba, G.DAT_0064bc16, G.DAT_0064bc18, G.DAT_0064bc22,
  // G.DAT_0064bc26, G.DAT_00655b0a, G.DAT_00655b0b, G.DAT_00655af2.
  // Calls: FUN_0055a41d, FUN_0040ffa0, FUN_0059ea99, FUN_0059e783,
  // FUN_0040bc80, FUN_0046e020, FUN_0055a567, FUN_0051d7bc, FUN_0051d7d6,
  // FUN_005a632a, FUN_0059ea4d, FUN_005a5f34, FUN_0059e7ad, FUN_0059e8db,
  // FUN_004b0720, FUN_004a2379, FUN_004a23fc, FUN_004a24b1, FUN_004a2534,
  // FUN_0059ec88, FUN_0059d3c9, FUN_005a9afe, FUN_005a9abf, FUN_00473e55,
  // FUN_004729ab, FUN_0059f06d, FUN_005a6c23, FUN_005a6c45, FUN_00498a5c
}

// FUN_0041d3f2 — cleanup_setup_buffer
export function FUN_0041d3f2() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0041d408 (15 bytes)
// FUN_0041d408 — restore_seh_setup
export function FUN_0041d408() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_0041d417 — map_size_dialog
export function FUN_0041d417() {
  // DEVIATION: Win32/MFC — SEH frame, dialog management
  FUN_0059db08(0x4000);
  // DEVIATION: Win32 — map size selection dialog
  // Key game state mutations: G.DAT_006d1160, G.DAT_006d1162, G.DAT_006d1164
  // Calls: FUN_0055a41d, FUN_0040ffa0, FUN_0059ea99, FUN_0059e783,
  // FUN_0040bc80, FUN_0046e020, FUN_0055a567, FUN_0059e9f3
  return 0;
}

// FUN_0041d7c5 — cleanup_mapsize_buffer
export function FUN_0041d7c5() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0041d7db (15 bytes)
// FUN_0041d7db — restore_seh_mapsize
export function FUN_0041d7db() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_0041d7ea — custom_world_params_dialog
export function FUN_0041d7ea() {
  // DEVIATION: Win32/MFC — SEH frame, dialog management
  FUN_0059db08(0x4000);
  // DEVIATION: Win32 — custom world parameters dialog (land mass, form, climate, temp, age)
  // Key game state: G.DAT_00624ee8..DAT_00624ef8
  // Calls: FUN_0055a41d, FUN_0040ffa0, FUN_0059ea99, FUN_0059e783,
  // FUN_0040bc80, FUN_0046e020, FUN_0055a567
  return 0;
}

// FUN_0041dc9e — cleanup_custom_buffer
export function FUN_0041dc9e() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0041dcb4 (15 bytes)
// FUN_0041dcb4 — restore_seh_custom
export function FUN_0041dcb4() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_0041dcc3 — clear_start_positions
export function FUN_0041dcc3() {
  for (let local_8 = 0; local_8 < 0x15; local_8 = local_8 + 1) {
    G.DAT_00627fe0[local_8] = 0xffff;
    G.DAT_00628010[local_8] = 0xffff;
  }
}

// FUN_0041dd0e — load_premade_map
export function FUN_0041dd0e() {
  // DEVIATION: Win32/MFC — file dialog, map loading
  // Calls: show_open_dialog_31D2, FUN_005218cb, FUN_0051d9a0, FUN_005d25a8,
  // FUN_005d2590, FUN_005d356e, FUN_005d3c40, FUN_005d687b, FUN_005d2d3d,
  // FUN_0040bbb0, FUN_0040bc10, FUN_00578c12, FUN_0041dcc3, FUN_00410030
  // Key: Opens file dialog to select .mp file, loads premade map
  // Returns 0 on success, non-zero to go back to menu
  return 0;
}

// FUN_0041dfe1 — load_scenario_dialog
export function FUN_0041dfe1() {
  // DEVIATION: Win32/MFC — SEH frame, dialog management, scenario loading
  FUN_0059db08(0x4000);
  FUN_005c64da();
  // DEVIATION: Win32 — scenario selection dialog
  // Calls: show_open_dialog_31D2, FUN_005218cb, FUN_0051d9a0, FUN_005c61b0,
  // FUN_005c841d, FUN_005cd775, FUN_005cef31, FUN_0040bbb0, FUN_0040bc10,
  // FUN_00578c12, FUN_00410030, FUN_0041e864, FUN_0041e8fb
  // Key: Opens scenario file dialog, loads scenario, optionally lets player pick civ
  // Game state: G.DAT_006a9110, G.DAT_00655aea, G.DAT_00655b02, G.DAT_006d1166
}

// FUN_0041e7b2 — close_scenario_modal
export function FUN_0041e7b2() { FUN_005c656b(); }

// FUN_0041e7be — cleanup_scenario_buffer
export function FUN_0041e7be() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0041e7d4 (15 bytes)
// FUN_0041e7d4 — restore_seh_scenario
export function FUN_0041e7d4() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_0041e7e3 — reload_labels_and_strings
export function FUN_0041e7e3() {
  let iVar1 = FUN_004a2379(PTR_s_LABELS_00627674, s_STRINGHEAP_00625618);
  if (iVar1 === 0) {
    FUN_004a23fc(1);
    iVar1 = FUN_004a2534();
    if (G.DAT_006252c0 < iVar1) G.DAT_006252c0 = iVar1;
  }
  FUN_00428a0f(G.DAT_006252c0);
  FUN_00428a95('<nil>');
  FUN_0046a740();
  load_labels_txt();
  FUN_0059d401();
}

// FUN_0041e864 — reload_rules_for_scenario
export function FUN_0041e864(param_1) {
  FUN_0041e7e3();
  FUN_0044b49e();
  __chdir(G.DAT_0064bb08);
  let local_108 = {};
  FUN_005f22d0(local_108, 'RULES.');
  FUN_005f22e0(local_108, G.DAT_0062cd24);
  let iVar1 = FUN_00415133(local_108);
  if (iVar1 === 0) __chdir(G.DAT_00655020);
  FUN_0041b00e(param_1);
  __chdir(G.DAT_00655020);
  FUN_00421bd0();
}

// FUN_0041e8fb — pick_civ_for_scenario
export function FUN_0041e8fb(param_1) {
  // DEVIATION: Win32/MFC — SEH frame, dialog management
  FUN_0059db08(0x4000);
  // DEVIATION: Win32 — civ selection dialog for scenario loading
  // Calls: FUN_0055a41d, FUN_0040ffa0, FUN_0040bc40, FUN_0059edf0,
  // FUN_0059ea99, FUN_0059e783, FUN_0040bc80, FUN_0046e020, FUN_0055a567,
  // FUN_004a2379, FUN_004a23fc, FUN_004a24b1, FUN_004a2534
  // Key game state: G.DAT_006d1da0, G.DAT_00655b03, G.DAT_00655b0a, G.DAT_00655b0b
}

// FUN_0041eec6 — cleanup_pick_buffer
export function FUN_0041eec6() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0041eedc (15 bytes)
// FUN_0041eedc — restore_seh_pick
export function FUN_0041eedc() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_0041eeeb — single_player_main_menu
export function FUN_0041eeeb() {
  // DEVIATION: Win32/MFC — SEH frame, dialog management
  FUN_0059db08(0x4000);
  FUN_005c64da();
  // DEVIATION: Win32 — main menu: new game / load game / load scenario / start premade / quit
  // Calls: FUN_0055a41d, FUN_0040ffa0, FUN_0059ea99, FUN_0059e783,
  // FUN_0040bc80, FUN_0046e020, FUN_0055a567, FUN_0041ba52, FUN_005218cb,
  // FUN_0041dfe1, FUN_00410030, load_verify_units, FUN_0051d9a0,
  // FUN_005d25a8, FUN_005227e3, FUN_00521fe0, FUN_004a73d9, FUN_0055a5e4,
  // FUN_0055a64a, FUN_0046e6c8, FUN_004e4ceb, XD_GetXDaemonVersion
  // Key game state: G.DAT_006a9110, G.DAT_00655aea, G.DAT_00655b02, G.DAT_00654fb0,
  // G.DAT_00655b0a, G.DAT_00655b0b, G.DAT_006d1166
  // Returns: 0 to continue game, non-zero to exit
  return 0;
}

// FUN_0041f66e — close_sp_modal
export function FUN_0041f66e() { FUN_005c656b(); }

// FUN_0041f67a — cleanup_sp_buffer
export function FUN_0041f67a() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0041f690 (15 bytes)
// FUN_0041f690 — restore_seh_sp
export function FUN_0041f690() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// FUN_0041f69f — setup_initial_game_state
export function FUN_0041f69f() {
  G.DAT_006252c4 = 1;
  if ((((G.DAT_00628048 === 0) && (G.DAT_00655af8 === 0)) && (G.DAT_00655b02 !== 0)) &&
     ((G.DAT_00654c78 !== 0 || (G.DAT_00655b08 === 0)))) {
    let local_10 = 0;
    let local_c = 0;
    FUN_005b9ec6();
    for (let local_8 = 0; local_8 < G.DAT_006d1164; local_8 = local_8 + 1) {
      let iVar1 = FUN_005b8931(local_c, local_10);
      if ((G.DAT_00655b0b & u8(iVar1 + 4)) !== 0) {
        FUN_005b976d(local_c, local_10, G.DAT_00655b0b, 1, 1);
      }
      local_c = local_c + 2;
      if (G.DAT_006d1160 <= local_c) {
        local_10 = local_10 + 1;
        local_c = local_10 & 1;
      }
    }
    FUN_005b9f1c();
  }
  if ((G.DAT_00655b02 !== 0) && ((G.DAT_00654c78 !== 0 || (G.DAT_00655b08 === 0)))) {
    for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
      if ((1 << (local_c & 0x1f) & G.DAT_00655b0b) !== 0) {
        for (let local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
          if ((1 << (local_10 & 0x1f) & G.DAT_00655b0b) !== 0) {
            FUN_00467825(local_c, local_10, 1);
          }
        }
      }
    }
  }
  if (2 < G.DAT_00655b02) {
    G.DAT_006d1da0 = G.DAT_006ad35c[G.DAT_006ad304 * 0x15];
  }
}

// FUN_0041f878 — teardown_game_session
export function FUN_0041f878() {
  FUN_00484d52();
  if (G.DAT_00655b02 === 1) FUN_005793a3(0x1f2);
  FUN_00413bd1();
  citywin_DEA8();
  FUN_0056ac46();
  FUN_00407b31();
  FUN_005b8416();
  FUN_00484d52();
  G.DAT_006252c4 = 0;
}

// FUN_0041f8d9 — multiplayer_main_loop
export function FUN_0041f8d9() {
  // DEVIATION: Win32/MFC — SEH frame, dialog management
  FUN_0059db08(0x4000);
  FUN_005c64da();
  debug_log('5.4.0f Multiplayer 26 March 99');
  FUN_0059a998();
  let iVar2 = FUN_0041b4c0();
  if (iVar2 !== 0) {
    FUN_0041b8b0();
    FUN_004201fb();
    FUN_00420207();
    FUN_0042021d();
    return;
  }
  _memset(0, 0, 0xc4); // G.DAT_006ad22c
  // DEVIATION: Win32 — XD_LaunchedByLobby, lobby message handling
  iVar2 = XD_LaunchedByLobby(0, 0); // DEVIATION: Win32
  if ((iVar2 === 2) || (iVar2 === 1)) {
    G.DAT_006ad228 = iVar2;
  } else {
    G.DAT_006ad228 = -1;
  }
  G.DAT_006c3160 = 0;
  // DEVIATION: Win32 — GetPrivateProfileIntA for simultaneous/maxplayers
  G.DAT_006c3164 = 7;
  FUN_005f22d0(G.DAT_006ad59c, G.DAT_00666550);
  while (true) {
    G.DAT_00628044 = 1;
    G.DAT_006ad6ac = 0;
    G.DAT_006ad6ae = 0;
    G.DAT_006ad7b2 = 0;
    for (let local_748 = 0; local_748 < 8; local_748 = local_748 + 1) {
      G.DAT_006af220[local_748] = 0;
      G.DAT_006af240[local_748] = 0;
      G.DAT_006af260[local_748] = 0;
      G.DAT_006af280[local_748] = 0;
    }
    FUN_00498784();
    FUN_004fa5d9(50000);
    for (let local_748 = 0; local_748 < 0x800; local_748 = local_748 + 1) {
      G.DAT_0065610a[local_748 * 0x20 / 4] = 0;
      G.DAT_00656106[local_748 * 0x20 / 2] = -1;
      G.DAT_00656108[local_748 * 0x20 / 2] = -1;
    }
    G.DAT_00655b16 = 0;
    for (let local_740 = 0; local_740 < 0x100; local_740 = local_740 + 1) {
      w32(G.DAT_0064f394, local_740 * 0x58, 0);
    }
    G.DAT_00655b18 = 0;
    iVar2 = FUN_0041eeeb();
    if (iVar2 !== 0) break;
    FUN_004079a6();
    FUN_0056aacb();
    FUN_00413a90();
    citywin_DCB6();
    if (2 < G.DAT_00655b02) {
      FUN_004b4735(4);
      FUN_004b4735(3);
    }
    FUN_004f4b9f();
    FUN_005bf5e1(0x5a, 10, 0xc0, 0);
    FUN_00419be0(0); // &G.DAT_0063cbd0
    FUN_00419ba0(0x9e);
    if (G.DAT_00655b02 !== 0) {
      if ((G.DAT_00655b02 < 3) || (FUN_00421f40() !== 0)) {
        FUN_004e1314();
      }
      if ((2 < G.DAT_00655b02) && (FUN_00421f40() !== 0)) {
        G.DAT_006ad684 = G.DAT_00654c7c & 0xff;
        FUN_0046b14d(0x33, 0xff, G.DAT_00654fac | 0, G.DAT_00654fae | 0, G.DAT_00654c7c | 0, 0, 0, 0, 0, 0);
      }
    }
    if (2 < G.DAT_00655b02) {
      FUN_005792e1(0x120, 1);
      G.DAT_00635a40 = 0; // &LAB_00403c74
      if (FUN_00421f40() !== 0) {
        FUN_00523d8a(0xff);
      }
      G.DAT_006ad699 = 1;
      XD_FlushSendBuffer(180000); // DEVIATION: Win32
      FUN_0055b3fd();
    }
    FUN_0041f69f();
    if (((((G.DAT_00655aea >> 8 & 1) !== 0) && (2 < G.DAT_00655b02)) && (G.DAT_006ad684 !== 0)) &&
       (G.DAT_006252c8 === 0)) {
      FUN_00410030(s_SIMULTUT_0062587c, 0, 0); // G.DAT_00643af8
      G.DAT_006252c8 = 1;
    }
    FUN_005d8236(G.DAT_006cec90);
    G.DAT_00654fd8 = 1;
    if (G.DAT_00655b02 < 3) {
      FUN_0048b340();
    } else {
      if (G.DAT_006ad2f7 === 0) {
        XD_FlushSendBuffer(5000); // DEVIATION: Win32
        while (G.DAT_006c9250 === 0) {
          FUN_0047e94e(1, 0);
        }
      } else {
        FUN_0046b14d(0x9c, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(5000); // DEVIATION: Win32
      }
      if (G.DAT_006ad684 === 0) {
        if (G.DAT_006ad2f7 === 0) {
          iVar2 = FUN_0048bfec();
          if (iVar2 !== 0) {
            FUN_0048c9f3(1);
          }
        } else {
          FUN_0048c9f3(0);
        }
      } else if (G.DAT_006ad2f7 === 0) {
        iVar2 = FUN_005ab2d5();
        if (iVar2 !== 0) {
          FUN_005aa0e5();
        }
      } else {
        FUN_005aa0e5();
      }
    }
    FUN_004a73d9();
    G.DAT_00635a40 = 0;
    G.DAT_00627670 = 0;
    FUN_0055ae80(1);
    FUN_0055b3c8();
    if (2 < G.DAT_00655b02) {
      FUN_005d7c00();
      FUN_004b0a0a();
      if (G.DAT_006ad2f7 !== 0) {
        FUN_0059b293(1);
      }
      for (let local_7e8 = 0; local_7e8 < 8; local_7e8 = local_7e8 + 1) {
        G.DAT_0068aee8[local_7e8] = 0;
        G.DAT_0068af08[local_7e8] = 0;
      }
      G.DAT_0068aedc = 0;
      G.DAT_0068aee4 = 0;
      G.DAT_0068aee0 = 0;
      FUN_004b7645();
      FUN_004b768d();
      FUN_004201ef();
    }
    FUN_004f5dd1();
    FUN_0042a768();
    FUN_0042a768();
    if (G.DAT_0062c5b0 !== 0) {
      FUN_004201fb();
      FUN_00420207();
      FUN_0042021d();
      return;
    }
    FUN_0041f878();
    if (G.DAT_006ad228 !== -1) {
      FUN_004201fb();
      FUN_00420207();
      FUN_0042021d();
      return;
    }
  }
  FUN_0041b8b0();
  FUN_004201fb();
  FUN_00420207();
  FUN_0042021d();
}

// Source: decompiled/block_00420000.c FUN_004201ef (12 bytes)
// FUN_004201ef — cleanup_mp_chat_log (referenced but out-of-block)
export function FUN_004201ef() {
  // DEVIATION: Win32 — FUN_005d7c6e() -> FUN_00421c30()
}

// FUN_004201fb — close_mp_modal (referenced but out-of-block)
export function FUN_004201fb() { FUN_005c656b(); }

// FUN_00420207 — cleanup_mp_buffer
export function FUN_00420207() { FUN_0059df8a(); }

// Source: decompiled/block_00410000.c FUN_0042021d (15 bytes)
// FUN_0042021d — restore_seh_mp
export function FUN_0042021d() { /* DEVIATION: Win32 — SEH frame restore, no-op in JS */ }

// Stub for FUN_00589c79 referenced from FUN_0041b8b0
