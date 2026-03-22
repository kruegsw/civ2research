// ═══════════════════════════════════════════════════════════════════
// block_00470000.js — Mechanical transpilation of block_00470000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00470000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00470000.c
// ═══════════════════════════════════════════════════════════════════


import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_0040733c, FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_004083b0, FUN_00408460 } from './block_00400000.js';
import { FUN_00408490, FUN_004085f0, FUN_00408650, FUN_004086c0, FUN_0040bbb0, FUN_0040bbe0 } from './block_00400000.js';
import { FUN_0040bc80, FUN_0040bcb0, FUN_0040ddc6, FUN_0040decc, FUN_0040ef70, FUN_0040efd0 } from './block_00400000.js';
import { FUN_0040fb00, FUN_0040fbb0, FUN_0040ff30, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_00410402, FUN_004105f8, FUN_00414ce0, FUN_00414d10 } from './block_00410000.js';
import { FUN_00414d40, FUN_00415133, FUN_00417ef0, FUN_00419b80, FUN_00419ba0, FUN_00419be0 } from './block_00410000.js';
import { FUN_00419ed3, FUN_0041a046, FUN_0041a422, FUN_0041a5c4, FUN_0041e864 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421bd0, FUN_00421d60, FUN_00421ea0, FUN_00421f10, FUN_004257fe } from './block_00420000.js';
import { FUN_00426f80, FUN_00426fb0, FUN_00426ff0, FUN_004271e8, FUN_00428b0c } from './block_00420000.js';
import { FUN_00436287, FUN_0043cf76 } from './block_00430000.js';
import { FUN_00444270, FUN_0044c730, FUN_0044ca60, FUN_0044cba0 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_00450390, FUN_004503d0, FUN_00450400 } from './block_00450000.js';
import { FUN_00453af0, FUN_00453c40, FUN_00453c80, FUN_0045b0d6 } from './block_00450000.js';
import { FUN_00467580, FUN_00467750, FUN_00467825, FUN_00468bb9, FUN_0046b14d, FUN_0046e020 } from './block_00460000.js';
import { FUN_0046e287, FUN_0046e4a9, FUN_0046e571, FUN_0046e6a9, FUN_0046e6c8 } from './block_00460000.js';
import { FUN_004823d6, FUN_0048308f, FUN_00484cc0, FUN_00484d52, FUN_0048de75 } from './block_00480000.js';
import { FUN_00493b10, FUN_00493ba6, FUN_00493c7d, FUN_00497da0, FUN_00497e0f, FUN_00498159 } from './block_00490000.js';
import { FUN_00498784, FUN_0049882b } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a76f5, FUN_004aef20, FUN_004aef36 } from './block_004A0000.js';
import { FUN_004af01a, FUN_004af03b, FUN_004af122, FUN_004af14b, FUN_004af1d5 } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004b1de3, FUN_004b24a2, FUN_004b251a, FUN_004b7645, FUN_004b81dd } from './block_004B0000.js';
import { FUN_004b90ad, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004cef35 } from './block_004C0000.js';
import { FUN_004dd285 } from './block_004D0000.js';
import { FUN_004e1763, FUN_004e2803, FUN_004e4ceb, FUN_004e7270 } from './block_004E0000.js';
import { FUN_004f1220, FUN_004fa5d9, FUN_004fa617, FUN_004fbd2b, FUN_004fc516 } from './block_004F0000.js';
import { FUN_00511a0e, FUN_00511ba2, FUN_005149d6 } from './block_00510000.js';
import { FUN_005233fc, FUN_00523d8a } from './block_00520000.js';
import { FUN_00552112, FUN_00552ed2, FUN_0055339f, FUN_0055ae80, FUN_0055af2e, FUN_0055b046 } from './block_00550000.js';
import { FUN_0055c3d3 } from './block_00550000.js';
import { FUN_00560d95, FUN_00562021, FUN_00564470, FUN_00564713, FUN_005683c5, FUN_00569363 } from './block_00560000.js';
import { FUN_0056a65e, FUN_0056baff, FUN_0056c705, FUN_0056d289, FUN_0056f113 } from './block_00560000.js';
import { FUN_0057940d, FUN_0057ed3f, FUN_0057f657 } from './block_00570000.js';
import { FUN_005802fd, FUN_0058878e, FUN_00589ef8 } from './block_00580000.js';
import { FUN_00594d42, FUN_0059511c, FUN_0059b571, FUN_0059b7fc, FUN_0059b96a, FUN_0059c575 } from './block_00590000.js';
import { FUN_0059db08, FUN_0059db65, FUN_0059df8a, FUN_0059ec88 } from './block_00590000.js';
import { FUN_005ae006, FUN_005ae1b0, FUN_005ae296, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b2590, FUN_005b2c82, FUN_005b2d39, FUN_005b2e69, FUN_005b345f, FUN_005b389f } from './block_005B0000.js';
import { FUN_005b3ae0, FUN_005b3d06, FUN_005b4391, FUN_005b48b1, FUN_005b490e, FUN_005b496e } from './block_005B0000.js';
import { FUN_005b50ad, FUN_005b542e, FUN_005b5bab, FUN_005b5d93, FUN_005b6042, FUN_005b633f } from './block_005B0000.js';
import { FUN_005b6787, FUN_005b8635, FUN_005b8783, FUN_005b898b, FUN_005b8b65, FUN_005b8ffa } from './block_005B0000.js';
import { FUN_005b94fc, FUN_005b9646, FUN_005b976d, FUN_005b98b7, FUN_005b99e8, FUN_005b9b35 } from './block_005B0000.js';
import { FUN_005b9c49, FUN_005b9d81, FUN_005ba206, FUN_005baeb0, FUN_005baec8, FUN_005baee0 } from './block_005B0000.js';
import { FUN_005baf57, FUN_005bb3f0, FUN_005bcaa7, FUN_005bd630, FUN_005bd65c, FUN_005bd915 } from './block_005B0000.js';
import { FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0073, FUN_005c041f, FUN_005c0479, FUN_005c0593, FUN_005c0bf2, FUN_005c0cc5 } from './block_005C0000.js';
import { FUN_005c1020, FUN_005c1167, FUN_005c19ad, FUN_005c5fc4, FUN_005c61b0, FUN_005c64da } from './block_005C0000.js';
import { FUN_005c656b, FUN_005cd775, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d22b7, FUN_005d22f9, FUN_005d687b, FUN_005dae6b, FUN_005dd010, FUN_005dd1a0 } from './block_005D0000.js';
import { FUN_005dd27e, FUN_005dd377, FUN_005dd3c2, FUN_005dd64c, FUN_005dd71e } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';

function stub(name) { return function (...args) { return 0; }; }


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let _DAT_006c90a0 = 0;
let _DAT_0066c990 = 0;
let _DAT_006ad578 = 0;

// String literal stubs
let PTR_s_CIVILIZE_0062b990 = 'CIVILIZE';
let PTR_FUN_0061d1e4 = 0;
let s_ARCHAEOLOGISTS_0062b840 = 'ARCHAEOLOGISTS';
let s_ARCHAEOLOGISTS3_0062b854 = 'ARCHAEOLOGISTS3';
let s_CENTAURI_0062b888 = 'CENTAURI';
let s_CENTAURI_0062b8f4 = 'CENTAURI';
let s_CENTAURI3_0062b904 = 'CENTAURI3';
let s_CENTAURI_BEATEN_0062b934 = 'CENTAURI_BEATEN';
let s_VFWNOTREGISTERED_0062b82c = 'VFWNOTREGISTERED';
let s_VFWNOTREGISTERED_0062b8d8 = 'VFWNOTREGISTERED';
let s_DANGER_0062b978 = 'DANGER';
let s_DANGERHEX_0062b980 = 'DANGERHEX';


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════


// FUN_004702e0 — init_video_player (loser video)
export function FUN_004702e0(param_1) {
  // SEH/operator_new/class initialization — UI framework, stubbed
  G.DAT_0062b804 = FUN_004703d4();
  if (G.DAT_0062b804 !== 0) {
    let iVar2 = load_civ2_art_004705d7(param_1);
    if (iVar2 !== 0) {
      FUN_004708db();
    }
    if (G.DAT_0062b804 !== 0) {
      FUN_00471020(1);
    }
    G.DAT_0062b804 = 0;
  }
}

// FUN_004703d4 — init_video_class
export function FUN_004703d4() {
  // MFC class constructor chain — stubbed
  FUN_0044c730();
  FUN_005c64da();
  FUN_005dd010();
  FUN_004502b0();
  FUN_0043c690();
  FUN_005bd630();
  return 0; // returns in_ECX in original
}

// FUN_004704ec — destructor_chain
export function FUN_004704ec() {
  FUN_0047056b();
  FUN_0047057a();
  FUN_00470589();
  FUN_00470598();
  FUN_004705a7();
  FUN_004705b6();
  FUN_004705c9();
}

// FUN_0047056b — call_FUN_005bd915
export function FUN_0047056b() { FUN_005bd915(); }

// FUN_0047057a — call_thunk_0043c520
export function FUN_0047057a() { FUN_0043c520(); }

// FUN_00470589 — destructor_timevec
export function FUN_00470589() { /* _Timevec::~_Timevec — no-op */ }

// FUN_00470598 — call_FUN_005dd1a0
export function FUN_00470598() { FUN_005dd1a0(); }

// FUN_004705a7 — call_FUN_005c656b
export function FUN_004705a7() { FUN_005c656b(); }

// FUN_004705b6 — call_thunk_0044ca60
export function FUN_004705b6() { FUN_0044ca60(); }

// FUN_004705c9 — seh_epilog
export function FUN_004705c9() { /* SEH frame restore — no-op */ }

// load_civ2_art_004705d7 — load_video_art_resources
export function load_civ2_art_004705d7(param_1) {
  // Opens loser.avi and civ2art.dll, sets up video display
  // Pure UI/file loading — stubbed
  return 0;
}

// FUN_004708db — play_loser_video_sequence
export function FUN_004708db() {
  // Plays loser video with ARCHAEOLOGISTS text — pure UI
}

// FUN_00470c0c — noop_stub
export function FUN_00470c0c() { }

// FUN_00470c1c — display_archaeologists3_text
export function FUN_00470c1c() {
  // Reads ARCHAEOLOGISTS3 section from game text — pure UI
}

// FUN_00471020 — delete_video_class
export function FUN_00471020(param_1) {
  FUN_004704ec();
  // operator_delete — no-op in JS
}

// GetActiveView @ 0x00471070 — MFC library function
export function GetActiveView_00471070() { return null; }

// GetActiveView @ 0x004710A0 — MFC library function (duplicate)
export function GetActiveView_004710A0() { return null; }

// FUN_004710d0 — init_centauri_video
export function FUN_004710d0(param_1) {
  if (param_1 < 0) {
    load_civ2_art_00471dd8(param_1);
    return;
  }
  // Allocates new video class, loads centauri video
  G.DAT_0062b87c = FUN_00471362();
  if (G.DAT_0062b87c === 0) return;
  let iVar2 = load_civ2_art_00471565(param_1);
  if (iVar2 === 0) {
    // Show message dialog with unit/year info — UI
    FUN_0047132e();
  } else {
    FUN_00471856();
  }
  if (G.DAT_0062b87c !== 0) {
    FUN_004728c0(1);
  }
  G.DAT_0062b87c = 0;
}

// FUN_0047132e — call_FUN_0059df8a
export function FUN_0047132e() { FUN_0059df8a(); }

// FUN_00471354 — seh_epilog
export function FUN_00471354() { /* SEH frame restore — no-op */ }

// FUN_00471362 — init_centauri_class
export function FUN_00471362() {
  FUN_0044c730();
  FUN_005c64da();
  FUN_005dd010();
  FUN_004502b0();
  FUN_0043c690();
  FUN_005bd630();
  return 0;
}

// FUN_0047147a — destructor_chain_centauri
export function FUN_0047147a() {
  FUN_004714f9();
  FUN_00471508();
  FUN_00471517();
  FUN_00471526();
  FUN_00471535();
  FUN_00471544();
  FUN_00471557();
}

// FUN_004714f9 — call_FUN_005bd915
export function FUN_004714f9() { FUN_005bd915(); }

// FUN_00471508 — call_thunk_0043c520
export function FUN_00471508() { FUN_0043c520(); }

// FUN_00471517 — destructor_timevec
export function FUN_00471517() { /* no-op */ }

// FUN_00471526 — call_FUN_005dd1a0
export function FUN_00471526() { FUN_005dd1a0(); }

// FUN_00471535 — call_FUN_005c656b
export function FUN_00471535() { FUN_005c656b(); }

// FUN_00471544 — call_thunk_0044ca60
export function FUN_00471544() { FUN_0044ca60(); }

// FUN_00471557 — seh_epilog
export function FUN_00471557() { /* no-op */ }

// load_civ2_art_00471565 — load_centauri_video_art
export function load_civ2_art_00471565(param_1) {
  // Opens civ2 video/win AVI and civ2art.dll — pure UI/file
  return 0;
}

// FUN_00471856 — play_centauri_video_sequence
export function FUN_00471856() {
  // Plays centauri victory sequence with text overlays — pure UI
}

// FUN_00471bfe — noop_stub
export function FUN_00471bfe() { }

// FUN_00471c14 — noop_stub
export function FUN_00471c14() { }

// FUN_00471c2a — display_centauri3_credits
export function FUN_00471c2a() {
  // Displays CENTAURI3 scrolling text — pure UI
}

// FUN_00471db7 — invalidate_object_cache
export function FUN_00471db7() {
  // CRichEditDoc::InvalidateObjectCache — no-op
}

// load_civ2_art_00471dd8 — load_beaten_video
export function load_civ2_art_00471dd8(param_1) {
  // Loads and plays CENTAURI_BEATEN video — pure UI
}

// FUN_00472393 — call_thunk_0043c520
export function FUN_00472393() { FUN_0043c520(); }

// FUN_0047239f — call_FUN_005bd915
export function FUN_0047239f() { FUN_005bd915(); }

// FUN_004723ab — call_FUN_005c656b
export function FUN_004723ab() { FUN_005c656b(); }

// FUN_004723b7 — call_thunk_0044ca60
export function FUN_004723b7() { FUN_0044ca60(); }

// FUN_004723c3 — destructor_timevec
export function FUN_004723c3() { /* no-op */ }

// FUN_004723cf — call_thunk_0044cba0
export function FUN_004723cf() { FUN_0044cba0(); }

// FUN_004723e5 — seh_epilog
export function FUN_004723e5() { /* no-op */ }

// FUN_004728c0 — delete_centauri_class
export function FUN_004728c0(param_1) {
  FUN_0047147a();
  // operator_delete — no-op in JS
}

// FUN_00472910 — set_dialog_params
export function FUN_00472910(param_1, param_2) {
  // Sets in_ECX+0x118 and in_ECX+0xa20 — UI state, stubbed
}

// FUN_00472950 — append_extension_to_filename
export function FUN_00472950(param_1, param_2) {
  // Appends extension to filename if none present, then uppercases — pure string op
  // stubbed: Win32 file path manipulation
}

// FUN_004729ab — copy_and_replace_extension
export function FUN_004729ab(param_1, param_2, param_3) {
  // Copies param_2 to param_1, replaces extension — pure string op
}

// FUN_00472a60 — show_danger_dialog
export function FUN_00472a60(param_1, param_2, param_3, param_4) {
  FUN_00421d60(0, param_1);
  FUN_00467580(0, param_2);
  FUN_00467580(1, param_3);
  FUN_00467580(2, param_4);
  FUN_00444270(s_DANGER_0062b978);
}

// FUN_00472ab5 — show_dangerhex_dialog
export function FUN_00472ab5(param_1, param_2, param_3, param_4) {
  FUN_00421d60(0, param_1);
  FUN_00467580(0, param_2);
  FUN_00467580(1, param_3);
  FUN_00467580(2, param_4);
  FUN_00444270(s_DANGERHEX_0062b980);
}

// FUN_00472b0a — draw_number_on_tile
export function FUN_00472b0a(param_1, param_2, param_3, param_4) {
  let iVar1 = FUN_0047c3e0(param_1, param_2);
  if (iVar1 !== 0) {
    // Draws a number at tile position — pure rendering
    let local_68 = 0, local_6c = 0;
    FUN_0047a6b0_stub(local_68, local_6c, param_1, param_2);
    let uVar2 = FUN_00472cf0(0x40, G.DAT_0066ca8c);
    let uVar3 = FUN_00472cf0(0x20, G.DAT_0066ca8c);
    // itoa + drawing calls — pure UI
  }
}

// FUN_00472cf0 — scale_by_zoom
export function FUN_00472cf0(param_1, param_2) {
  param_1 = (param_2 + 8) * param_1;
  return (param_1 + (param_1 >> 0x1f & 7)) >> 3;
}

// FUN_00472d20 — init_sound_params
export function FUN_00472d20(param_1, param_2) {
  G.DAT_006660f6 = param_1;
  G.DAT_006660f7 = param_2;
  G.DAT_006660f0 = 0xffce;
  G.DAT_006660f2 = 0xffce;
  G.DAT_006660f4 = 0;
  G.DAT_00666100 = 0xff;
  G.DAT_006660f8 = 0;
  G.DAT_006660f9 = 0;
  G.DAT_006660fe = 0;
  G.DAT_006660fd = 0;
  G.DAT_00666106 = 0xffff;
  G.DAT_00666108 = 0xffff;
  G.DAT_006660ff = 0xff;
  G.DAT_00666102 = 0xffff;
  G.DAT_00666104 = 0xffff;
  return 0x800;
}

// FUN_00472e1d — init_sound_and_play
export function FUN_00472e1d(param_1, param_2, param_3, param_4) {
  let uVar1 = FUN_00472d20(param_1, param_2);
  FUN_005b345f(uVar1, param_3, param_4, 1);
  return uVar1;
}

// FUN_00472e5c — stop_sound
export function FUN_00472e5c() {
  if (G.DAT_006660f7 >= 0) {
    FUN_005b4391(0x800, 1);
    G.DAT_006660f7 = -1;
  }
}

// FID_conflict___E31 @ 0x00472F10 — static_init_sound
export function FID_conflict___E31_472F10() {
  FUN_00472f2a();
  FUN_00472f44();
}

// FUN_00472f2a — call_FUN_005bd630
export function FUN_00472f2a() { FUN_005bd630(); }

// FUN_00472f44 — register_atexit_sound
export function FUN_00472f44() { /* _atexit(FUN_00472f61) — no-op */ }

// FUN_00472f61 — atexit_callback_sound
export function FUN_00472f61() { FUN_005bd915(); }

// FUN_00472f7b — copy_scroll_params_int_to_short
export function FUN_00472f7b() {
  G.DAT_0066c600[0] = G.DAT_00655280 & 0xff;
  G.DAT_0066c600[1] = (G.DAT_00655280 >> 8) & 0xff;
  FUN_0047314e(G.DAT_00655284, G.DAT_0066c602);
  FUN_0047314e(G.DAT_00655294, G.DAT_0066c60a);
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    FUN_0047314e_arr(G.DAT_006552a4, local_8 * 0x10, G.DAT_0066c612, local_8 * 8);
  }
  FUN_0047314e(G.DAT_00655324, G.DAT_0066c652);
  FUN_0047314e(G.DAT_00655334, G.DAT_0066c65a);
  FUN_0047314e(G.DAT_00655344, G.DAT_0066c662);
}

// FUN_00473064 — copy_scroll_params_short_to_int
export function FUN_00473064() {
  G.DAT_00655280 = G.DAT_0066c600[0] | (G.DAT_0066c600[1] << 8);
  FUN_00473190(G.DAT_0066c602, G.DAT_00655284);
  FUN_00473190(G.DAT_0066c60a, G.DAT_00655294);
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    FUN_00473190_arr(G.DAT_0066c612, local_8 * 8, G.DAT_006552a4, local_8 * 0x10);
  }
  FUN_00473190(G.DAT_0066c652, G.DAT_00655324);
  FUN_00473190(G.DAT_0066c65a, G.DAT_00655334);
  FUN_00473190(G.DAT_0066c662, G.DAT_00655344);
}

// FUN_0047314e — copy_4_ints_to_4_shorts
export function FUN_0047314e(param_1, param_2) {
  // Copies 4 int32s to 4 int16s — stubbed (data format conversion)
}

// Helper for array-based version
function FUN_0047314e_arr(src, srcOff, dst, dstOff) { /* stubbed */ }

// FUN_00473190 — copy_4_shorts_to_4_ints
export function FUN_00473190(param_1, param_2) {
  // Copies 4 int16s to 4 int32s — stubbed
}

function FUN_00473190_arr(src, srcOff, dst, dstOff) { /* stubbed */ }

// show_open_dialog_31D2 — show_file_dialog
export function show_open_dialog_31D2(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // Win32 GetOpenFileNameA/GetSaveFileNameA — stubbed
  return false;
}

// FUN_004732a6 — read_unit_and_city_data
export function FUN_004732a6(param_1, param_2) {
  // Reads unit/city records from save file based on version — file I/O
  return 1;
}

// load_game_file — load_game_state_from_file
export function load_game_file(param_1, param_2) {
  // Reads all game state sections from binary save file — file I/O
  return 1;
}

// FUN_00473c12 — write_null_terminated_string
export function FUN_00473c12(param_1, param_2) {
  // fputs + fputc(0) — file I/O helper
  return 0;
}

// FUN_00473c68 — read_null_terminated_string
export function FUN_00473c68(param_1) {
  // Reads null-terminated string from file, allocates memory
  return 0;
}

// FUN_00473d5e — set_save_extension_by_gametype
export function FUN_00473d5e(param_1) {
  // Sets G.DAT_0066c4e8 to appropriate file extension based on game type
  if (param_1 !== 0) {
    // scenario
  } else {
    // Based on G.DAT_00655b02 (game type)
  }
}

// FUN_00473e55 — build_file_filter_string
export function FUN_00473e55(param_1, param_2, param_3) {
  // Builds file filter for open/save dialog — pure UI/string
  return G.DAT_0066c4f8;
}

// FUN_00473ff2 — append_file_filter_entry
export function FUN_00473ff2(param_1, param_2) {
  // Appends .sav/.hot/.eml/.net filter entries — string building
  return null;
}

// FUN_004741be — save_game_to_file
export function FUN_004741be(param_1, param_2) {
  // Full save game implementation — writes all sections to file
  // Pure file I/O, returns 0 on success, 1 on failure
  return 0;
}

// FUN_0047543c — quick_load_verify
export function FUN_0047543c(param_1) {
  // Opens file, reads header, validates version — file I/O
  return 0;
}

// FUN_00475666 — full_load_game
export function FUN_00475666(param_1) {
  // Full load game: reads all sections, fixes up data, recalculates derived state
  // Pure file I/O + state fixup
  return 0;
}

// save_game — save_game_ui_flow
export function save_game(param_1) {
  // Complete save game UI flow: shows dialog, builds filename, calls FUN_004741be
  // Pure UI flow
}

// load_verify_units — load_game_ui_flow
export function load_verify_units(param_1, param_2, param_3) {
  // Complete load game UI flow: shows dialog, calls FUN_00475666, verifies units
  // Pure UI flow
}

// FUN_004786f8 — call_FUN_005c656b
export function FUN_004786f8() { FUN_005c656b(); }

// FUN_0047870e — seh_epilog
export function FUN_0047870e() { /* no-op */ }

// FUN_00479d20 — static_init_views
export function FUN_00479d20() {
  FUN_00479d3a();
  FUN_00479d65();
}

// FUN_00479d3a — eh_vector_constructor_views
export function FUN_00479d3a() {
  // _eh_vector_constructor_iterator_ — MFC internal, no-op
}

// FUN_00479d65 — register_atexit_views
export function FUN_00479d65() { /* _atexit — no-op */ }

// FUN_00479d82 — atexit_destructor_views
export function FUN_00479d82() {
  // _eh_vector_destructor_iterator_ — no-op
}

// FID_conflict___E31 @ 0x00479DA8 — static_init_A
export function FID_conflict___E31_479DA8() {
  FUN_00479dc2();
  FUN_00479ddc();
}

// FUN_00479dc2 — call_thunk_0040fb00
export function FUN_00479dc2() { FUN_0040fb00(); }

// FUN_00479ddc — register_atexit_A
export function FUN_00479ddc() { /* _atexit — no-op */ }

// FUN_00479df9 — atexit_callback_A
export function FUN_00479df9() { FUN_0040fbb0(); }

// FID_conflict___E31 @ 0x00479E13 — static_init_B
export function FID_conflict___E31_479E13() {
  FUN_00479e2d();
  FUN_00479e47();
}

// FUN_00479e2d — call_thunk_0040fb00
export function FUN_00479e2d() { FUN_0040fb00(); }

// FUN_00479e47 — register_atexit_B
export function FUN_00479e47() { /* _atexit — no-op */ }

// FUN_00479e64 — atexit_callback_B
export function FUN_00479e64() { FUN_0040fbb0(); }

// FUN_00479e7e — scroll_map_by_column
export function FUN_00479e7e(param_1) {
  // thunk_FUN_00410402 — map scroll UI, stubbed
}

// FUN_00479eae — scroll_map_by_row
export function FUN_00479eae(param_1) {
  // thunk_FUN_00410402 — map scroll UI, stubbed
}

// FUN_00479ede — set_map_mode
export function FUN_00479ede(param_1) {
  // Sets map display parameters — in_ECX state, UI
}

// FUN_00479fbe — compute_map_viewport
export function FUN_00479fbe() {
  // Computes tile sizes, viewport dimensions, scroll limits
  // Pure UI/rendering geometry — stubbed
}

// FUN_0047a540 — screen_to_tile
export function FUN_0047a540(param_1, param_2, param_3, param_4) {
  // Converts screen coordinates to tile coordinates
  // Returns 0 on success, 1 if out of bounds — pure geometry
  return 1;
}

// FUN_0047a6b0 — tile_to_screen
export function FUN_0047a6b0(param_1, param_2, param_3, param_4) {
  // Converts tile coordinates to screen pixel coordinates — pure geometry
}

// Stub for internal calls
function FUN_0047a6b0_stub(p1, p2, p3, p4) { /* stubbed */ }

// FUN_0047a747 — count_coast_neighbors
export function FUN_0047a747(param_1, param_2) {
  let local_8 = 0;
  for (let local_c = 0; local_c < 4; local_c = local_c + 1) {
    G.DAT_0066c720[local_c] = 0;
  }
  let iVar2 = FUN_004087c0(param_1, param_2);
  if (iVar2 === 0) {
    local_8 = 0;
  } else {
    for (let local_c = 0; local_c < 8; local_c = local_c + 1) {
      let uVar3 = FUN_005ae052(s8(G.DAT_00628350[local_c]) + param_1);
      let cVar1 = s8(G.DAT_00628360[local_c]);
      let iVar2_inner = FUN_004087c0(uVar3, cVar1 + param_2);
      let local_14;
      if (iVar2_inner === 0) {
        local_14 = 7;
      } else {
        local_14 = s8(FUN_005b89bb(uVar3, cVar1 + param_2));
      }
      if (local_14 !== 10) {
        local_8 = local_8 + 1;
        if ((local_c & 1) === 0) {
          let iVar_d = local_c >> 1;
          let uVar4 = (iVar_d + 1) & 3;
          G.DAT_0066c720[iVar_d] = G.DAT_0066c720[iVar_d] | 4;
          G.DAT_0066c720[uVar4] = G.DAT_0066c720[uVar4] | 1;
        } else {
          let uVar4 = ((local_c + 1) & 6) >> 1;
          G.DAT_0066c720[uVar4] = G.DAT_0066c720[uVar4] | 2;
        }
      }
    }
  }
  return local_8;
}

// FUN_0047a8c9 — draw_terrain_tile
export function FUN_0047a8c9(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // Large terrain rendering function — pure rendering, stubbed
  // Draws base terrain, overlays, improvements, rivers, resources etc.
}

// FUN_0047ba1d — draw_city_on_tile
export function FUN_0047ba1d(param_1, param_2, param_3, param_4) {
  // Draws a city sprite on a map tile — rendering
}

// FUN_0047bba5 — draw_unit_default
export function FUN_0047bba5() {
  FUN_0056baff();
}

// FUN_0047bbea — draw_unit_conditional
export function FUN_0047bbea() {
  if (G.DAT_0062804c === 0 || G.DAT_00628054 === 0 || G.DAT_006d1da8 !== 1) {
    FUN_0056baff();
  }
}

// FUN_0047bc59 — draw_unit_at_position
export function FUN_0047bc59(param_1) {
  if (G.DAT_0062804c === 0 || G.DAT_00628054 === 0 || G.DAT_006d1da8 !== 1) {
    // Calculates screen position and draws unit — rendering
  }
}

// FUN_0047bd04 — draw_unit_with_checks
export function FUN_0047bd04(param_1, param_2, param_3) {
  // Checks unit selection state and draws accordingly — rendering
}

// FUN_0047be63 — draw_units_on_tile
export function FUN_0047be63(param_1, param_2, param_3, param_4) {
  // Iterates units on tile, draws visible ones — rendering
}

// FUN_0047c103 — draw_single_map_tile
export function FUN_0047c103(param_1, param_2, param_3) {
  // Draws terrain + city + units for a single tile — rendering
}

// FUN_0047c2f2 — is_x_in_range_wrapping
export function FUN_0047c2f2(param_1, param_2, param_3) {
  if ((G.DAT_00655ae8 & 0x8000) === 0) {
    if (param_1 < param_2) {
      param_1 = param_1 + G.DAT_006d1160;
    }
    if (param_2 + param_3 <= param_1) {
      param_1 = param_1 - G.DAT_006d1160;
    }
  }
  if (param_1 < param_2) return 0;
  if ((param_2 + param_3) - param_1 < 1) return 0;
  return 1;
}

// FUN_0047c37f — is_tile_in_rect
export function FUN_0047c37f(param_1, param_2, param_3, param_4, param_5, param_6) {
  let iVar1 = FUN_0047c2f2(param_1, param_3, param_5);
  if (iVar1 === 0) return 0;
  if (param_2 < param_4) return 0;
  if (param_2 < param_6 + param_4) return 1;
  return 0;
}

// FUN_0047c3e0 — is_tile_in_viewport
export function FUN_0047c3e0(param_1, param_2) {
  // Checks if tile is within current map viewport — uses in_ECX state
  // Stubbed: always returns 1
  return 1;
}

// FUN_0047c443 — draw_city_names
export function FUN_0047c443(param_1, param_2, param_3) {
  // Draws city name labels on visible cities — rendering
}

// FUN_0047c7aa — compute_tile_area_rect
export function FUN_0047c7aa(param_1, param_2, param_3, param_4) {
  // Computes screen rectangle for a tile area — geometry
}

// FUN_0047c869 — draw_map_area
export function FUN_0047c869(param_1, param_2, param_3, param_4) {
  // Draws map tiles in a diamond pattern around a center — rendering
}

// FUN_0047c9d4 — draw_full_viewport
export function FUN_0047c9d4(param_1) {
  // Draws all visible tiles in the viewport — rendering
}

// FUN_0047caea — invalidate_tile_area
export function FUN_0047caea(param_1, param_2, param_3) {
  // Invalidates screen region for a tile area — rendering
}

// FUN_0047cb26 — invalidate_single_tile
export function FUN_0047cb26(param_1, param_2) {
  FUN_0047caea(param_1, param_2, 0);
}

// FUN_0047cb50 — refresh_status_displays
export function FUN_0047cb50() {
  // Updates info panels and status bar — UI
}

// FUN_0047cbb4 — redraw_map_area
export function FUN_0047cbb4(param_1, param_2, param_3, param_4, param_5) {
  if (G.DAT_00628044 !== 0) {
    G.DAT_006ad908 = 1;
    let local_20 = (G.DAT_00655b07 === 0) ? param_4 : -1;
    FUN_0047c869(param_1, param_2, param_3, local_20);
    // Additional cursor drawing logic — rendering
    if (param_5 !== 0) {
      FUN_0047caea(param_1, param_2, param_3);
    }
    G.DAT_006ad908 = 0;
  }
}

// FUN_0047cced — redraw_tile_1x
export function FUN_0047cced(param_1, param_2) {
  FUN_0047cbb4(param_1, param_2, 0, G.DAT_006d1da0, 1);
}

// FUN_0047cd1f — redraw_tile_3x
export function FUN_0047cd1f(param_1, param_2) {
  FUN_0047cbb4(param_1, param_2, 1, G.DAT_006d1da0, 1);
}

// FUN_0047cd51 — full_map_redraw
export function FUN_0047cd51(param_1, param_2) {
  if (G.DAT_00628044 !== 0) {
    G.DAT_006ad908 = 1;
    // viewport recalc + full redraw — rendering
    G.DAT_006ad908 = 0;
  }
}

// FUN_0047ce1e — redraw_all_views
export function FUN_0047ce1e(param_1, param_2, param_3, param_4, param_5) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || G.DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cbb4(param_1, param_2, param_3, param_4, param_5);
    }
  }
}

// FUN_0047cea6 — redraw_tile_1x_all_views
export function FUN_0047cea6(param_1, param_2) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || G.DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cced(param_1, param_2);
    }
  }
}

// FUN_0047cf22 — redraw_tile_3x_all_views
export function FUN_0047cf22(param_1, param_2) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || G.DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cd1f(param_1, param_2);
    }
  }
}

// FUN_0047cf9e — full_redraw_all_views
export function FUN_0047cf9e(param_1, param_2) {
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (local_8 === 0 || G.DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) {
      FUN_0047cd51(param_1, param_2);
    }
  }
}

// FUN_0047dce0 — init_bitmap_button_class
export function FUN_0047dce0() {
  // MFC class constructor — returns class pointer, stubbed
  FUN_0055339f();
  FUN_0043c690();
  FUN_0043c690();
  FUN_005bd630();
  FUN_005bd630();
  return null;
}

// ~CBitmapButton @ 0x0047DE10 — MFC library destructor
export function CBitmapButton_destructor() {
  FUN_0047de82();
  FUN_0047de91();
  FUN_0047dea0();
  FUN_0047deaf();
  FUN_0047debe();
  FUN_0047ded1();
}

// FUN_0047de82 — call_FUN_005bd915
export function FUN_0047de82() { FUN_005bd915(); }

// FUN_0047de91 — call_FUN_005bd915
export function FUN_0047de91() { FUN_005bd915(); }

// FUN_0047dea0 — call_thunk_0043c520
export function FUN_0047dea0() { FUN_0043c520(); }

// FUN_0047deaf — call_thunk_0043c520
export function FUN_0047deaf() { FUN_0043c520(); }

// FUN_0047debe — destructor_oleframe
export function FUN_0047debe() { /* COleCntrFrameWnd::~COleCntrFrameWnd — no-op */ }

// FUN_0047ded1 — seh_epilog
export function FUN_0047ded1() { /* no-op */ }

// FUN_0047df20 — set_draw_scale
export function FUN_0047df20(param_1) {
  FUN_005cd775(param_1 + 8, 8);
}

// FUN_0047df50 — reset_draw_scale
export function FUN_0047df50() {
  FUN_005cd775(1, 1);
}

// FUN_0047df80 — intersect_rect
export function FUN_0047df80(param_1, param_2, param_3) {
  // Win32 IntersectRect — geometry, stubbed
}

// FUN_0047dfb0 — scale_param_by_zoom
export function FUN_0047dfb0(param_1) {
  // thunk_FUN_00472cf0(param_1, zoom_level) — rendering
  return 0;
}

// FUN_0047dff0 — set_zoom_draw_scale
export function FUN_0047dff0() {
  // thunk_FUN_0047df20(zoom_level) — rendering
}

// FUN_0047e030 — is_tile_visible_to_player
export function FUN_0047e030(param_1, param_2) {
  let iVar1 = FUN_005b8b65(param_1, param_2, G.DAT_006d1da0);
  if (iVar1 !== 0) {
    for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
      if ((local_8 === 0 || G.DAT_0066ca84[local_8 * (0x3f0 / 2)] !== 0) &&
          FUN_0047c3e0(param_1, param_2) !== 0) {
        return 1;
      }
    }
  }
  return 0;
}

// FUN_0047e0e5 — enqueue_stacked_draw
export function FUN_0047e0e5(param_1, param_2, param_3) {
  // Network draw queue — queues render operations for multiplayer sync
  if (G.DAT_006ad914 === G.DAT_006ad910 && G.DAT_006ad90c !== 0) {
    // Queue full — flush
    if (G.DAT_006ad918 !== 0) {
      G.DAT_006ad914 = (G.DAT_006ad910 + 1) % 100;
    } else {
      G.DAT_006ad910 = 0;
      G.DAT_006ad914 = 0;
    }
    G.DAT_006ad90c = G.DAT_006ad918 !== 0 ? 1 : 0;
    FUN_0047e0e5(0xa3, [], 0);
    return FUN_0047e0e5(0x74, [], 0);
  }
  // Enqueue draw command
  G.DAT_006ad90c = G.DAT_006ad90c + 1;
  if (G.DAT_006ad91c < G.DAT_006ad90c) {
    G.DAT_006ad91c = G.DAT_006ad90c;
  }
  let iVar1 = (G.DAT_006ad914 + 1) / 100;
  G.DAT_006ad914 = (G.DAT_006ad914 + 1) % 100;
  return iVar1;
}

// FUN_0047e2b3 — dequeue_and_execute_draw
export function FUN_0047e2b3() {
  // Processes queued draw operations — large switch statement
  // Handles move units, redraw tiles, combat animations, etc.
  // Pure rendering/network — stubbed
  G.DAT_006ad90c = G.DAT_006ad90c - 1;
  let iVar6 = G.DAT_006ad910 + 1;
  G.DAT_006ad910 = iVar6 % 100;
  return (iVar6 / 100) | 0;
}

// FUN_0047e94e — network_poll_dispatch
export function FUN_0047e94e(param_1, param_2) {
  // Massive network message dispatcher (14000+ bytes)
  // Handles 160+ message types: game state sync, unit commands,
  // city operations, diplomacy, combat, etc.
  // Pure network/UI — stubbed for game logic extraction
}

// FUN_00482305 — seh_helper_A (referenced within FUN_0047e94e)
export function FUN_00482305() { /* SEH cleanup — no-op */ }

// FUN_00482311 — seh_helper_B (referenced within FUN_0047e94e)
export function FUN_00482311() { /* SEH cleanup — no-op */ }

// FUN_00482327 — seh_epilog_poll (referenced within FUN_0047e94e)
export function FUN_00482327() { /* SEH epilog — no-op */ }


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
// These are called from this block but defined elsewhere.
// ═══════════════════════════════════════════════════════════════════

function FUN_0043c690() { /* string class init */ }
function FUN_0043c520() { /* string class destroy */ }
function FUN_0043c840() { /* string_concat */ }
function FUN_0043c790() { /* offset_rect */ }
function FUN_0043c910() { /* draw_text_ex */ }
function FUN_0043c9d0() { /* find_text_section */ }
function FUN_0043cab0() { /* get_unit_color */ }
function FUN_0043cb30() { /* get_player_color */ }
function FUN_0043d07a() { /* find_city_at_ex */ }
function FUN_004087c0_stub() { /* is_valid_tile */ }
function FUN_00467580_stub() { /* param stub */ }
function debug_log() { /* console.log equivalent */ }

// Win32 API stubs — no-ops
function XD_InFlushSendBuffer() { return 0; }
function XD_FlushSendBuffer() { return 0; }
function FID_conflict__memcpy(dst, src, len) { /* memcpy — no-op stub */ }
function FID_conflict___expand(ptr, size) { return ptr; }
function operator_new(size) { return {}; }
function operator_delete(ptr) { /* free — no-op */ }

// City window stubs
function FUN_00471dd8_stub() { }
function thunk_map_window_click() { }
function thunk_map_double_click() { }
function thunk_map_key() { }
function thunk_map_ascii() { }
function thunk_city_mouse() { }
function thunk_city_button_buy() { }
function thunk_city_button_change() { }
function thunk_city_button_view() { }
function thunk_city_button_rename() { }
function thunk_citywin_9429() { }
function thunk_citywin_C494() { }
function thunk_citywin_C679() { }
function thunk_citywin_C449() { }
function thunk_parse_save_block() { }
function thunk_create_city() { return -1; }
function thunk_delete_city() { }
function thunk_new_civ() { return 0; }
function thunk_kill_civ() { return 0; }
function thunk_pick_up_unit_005b319e() { }

// G.DAT_0066ca8c declared above in globals section
