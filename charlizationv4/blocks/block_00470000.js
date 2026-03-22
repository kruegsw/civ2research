// ═══════════════════════════════════════════════════════════════════
// block_00470000.js — Mechanical transpilation of block_00470000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00470000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00470000.c
// ═══════════════════════════════════════════════════════════════════




// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
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
import { FUN_00436287, FUN_0043c520, FUN_0043c690, FUN_0043c790, FUN_0043c840, FUN_0043c910 } from './block_00430000.js';
import { FUN_0043c9d0, FUN_0043cab0, FUN_0043cb30, FUN_0043cf76, FUN_0043d07a } from './block_00430000.js';
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
  // DEVIATION: SEH/operator_new(0x137c)/class initialization — UI framework
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
  // DEVIATION: MFC class constructor chain — returns in_ECX in original
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
  // DEVIATION: Opens loser.avi and civ2art.dll, calls OpenFile, FUN_005c5fc4,
  // FUN_005bf5e1, FUN_005dd27e, FUN_005dd71e, FUN_005dd377, SetRect, etc.
  // Pure Win32 file/video/UI loading — returns 0 (failure) as no video subsystem
  return 0;
}

// FUN_004708db — play_loser_video_sequence
export function FUN_004708db() {
  // DEVIATION: Plays loser video with ARCHAEOLOGISTS text overlays
  // Win32 rendering: FUN_0046e571, FUN_005c19ad, FUN_005c1167, OffsetRect, etc.
}

// FUN_00470c0c — empty function (C returns void, body is just return)
export function FUN_00470c0c() { }

// FUN_00470c1c — display_archaeologists3_text
export function FUN_00470c1c() {
  // DEVIATION: Reads ARCHAEOLOGISTS3 section from game text, draws with FUN_005c19ad/FUN_005c1167
  // Win32 CharUpperA, FUN_004086c0, FUN_005683c5, FUN_0046e287 calls
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
  // DEVIATION: Plays centauri victory sequence with CENTAURI text overlays
  // Win32 rendering: FUN_005c19ad, FUN_005c1167, OffsetRect, FUN_005683c5, etc.
}

// FUN_00471bfe — empty function (C returns void, body is just return)
export function FUN_00471bfe() { }

// FUN_00471c14 — empty function (C returns void, body is just return)
export function FUN_00471c14() { }

// FUN_00471c2a — display_centauri3_credits
export function FUN_00471c2a() {
  // DEVIATION: Displays CENTAURI3 scrolling text credits
  // Win32: FUN_005baec8, FUN_005baeb0, FUN_005baee0, FUN_0043c910, FUN_005683c5
}

// FUN_00471db7 — invalidate_object_cache
export function FUN_00471db7() {
  // CRichEditDoc::InvalidateObjectCache — no-op
}

// load_civ2_art_00471dd8 — load_beaten_video
export function load_civ2_art_00471dd8(param_1) {
  // DEVIATION: Loads civ2art.dll, creates off-screen surface, plays CENTAURI_BEATEN text
  // Win32: FUN_005c5fc4, FUN_005bb3f0, FUN_005bf5e1, FUN_005c19ad, FUN_005c1167, etc.
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
  // DEVIATION: Sets in_ECX+0x118 = param_1 and in_ECX+0xa20 = param_2 (class instance state)
}

// FUN_00472950 — append_extension_to_filename
export function FUN_00472950(param_1, param_2) {
  // DEVIATION: _strrchr(param_1, '.'), if no dot: strcat(".", param_2), __strupr
}

// FUN_004729ab — copy_and_replace_extension
export function FUN_004729ab(param_1, param_2, param_3) {
  // DEVIATION: strcpy(param_1, param_2), _strrchr for '.', truncate, strcat(".", param_3), __strupr
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
  // DEVIATION: Pure rendering function — draws a number at a tile position
  // C: checks FUN_0047c3e0, calls FUN_0047a6b0 for screen coords,
  //    FUN_00472cf0 for scaling, __itoa for number formatting,
  //    FUN_005c19ad/FUN_005c1020/FUN_0043c790/FUN_00408490 for drawing
  let iVar1 = FUN_0047c3e0(param_1, param_2);
  if (iVar1 !== 0) {
    let local_6c = { v: 0 };
    let local_68 = { v: 0 };
    FUN_0047a6b0(local_68, local_6c, param_1, param_2);
    let uVar2 = FUN_00472cf0(0x40, G.DAT_0066ca8c);
    let uVar3 = FUN_00472cf0(0x20, G.DAT_0066ca8c);
    // DEVIATION: itoa(param_3, local_64, 10) + text drawing calls omitted
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
// C: *param_2 = (short)*param_1; param_2[2] = (short)param_1[2]; etc.
export function FUN_0047314e(param_1, param_2) {
  // param_1 is pointer to 4 int32s, param_2 is pointer to 4 int16s
  // In our JS model these are passed as typed array references
  param_2[0] = (param_1[0] << 16 >> 16);   // sign-extend to short
  param_2[2] = (param_1[2] << 16 >> 16);
  param_2[1] = (param_1[1] << 16 >> 16);
  param_2[3] = (param_1[3] << 16 >> 16);
}

// Helper for array-based version with offsets
function FUN_0047314e_arr(src, srcOff, dst, dstOff) {
  dst[dstOff + 0] = (src[srcOff + 0] << 16 >> 16);
  dst[dstOff + 2] = (src[srcOff + 2] << 16 >> 16);
  dst[dstOff + 1] = (src[srcOff + 1] << 16 >> 16);
  dst[dstOff + 3] = (src[srcOff + 3] << 16 >> 16);
}

// FUN_00473190 — copy_4_shorts_to_4_ints
// C: *param_2 = (int)*param_1; param_2[2] = (int)param_1[2]; etc.
export function FUN_00473190(param_1, param_2) {
  param_2[0] = param_1[0];
  param_2[2] = param_1[2];
  param_2[1] = param_1[1];
  param_2[3] = param_1[3];
}

function FUN_00473190_arr(src, srcOff, dst, dstOff) {
  dst[dstOff + 0] = src[srcOff + 0];
  dst[dstOff + 2] = src[srcOff + 2];
  dst[dstOff + 1] = src[srcOff + 1];
  dst[dstOff + 3] = src[srcOff + 3];
}

// show_open_dialog_31D2 — show_file_dialog
export function show_open_dialog_31D2(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 GetOpenFileNameA/GetSaveFileNameA + CommDlgExtendedError
  return false;
}

// FUN_004732a6 — read_unit_and_city_data
export function FUN_004732a6(param_1, param_2) {
  // DEVIATION: Reads unit/city records from binary save file via _fread
  // Handles version < 0x2a, == 0x29, >= 0x2a formats for G.DAT_006560f0 (units) and
  // G.DAT_0064f340 (cities), assigns sequential IDs to G.DAT_0065610a and G.DAT_0064f394
  return 1;
}

// load_game_file — load_game_state_from_file
export function load_game_file(param_1, param_2) {
  // DEVIATION: Reads all game state sections from binary save file via _fread
  // Sections: G.DAT_00655ae8 (game header), G.DAT_00655b1e/G.DAT_00655b82 (unit ownership),
  // G.DAT_00655be6 (events), G.DAT_0064bcf8 (tech), G.DAT_0064c6a0 (civ data 0x594 per civ),
  // G.DAT_0064c6f8/G.DAT_0064c706/G.DAT_0064c714/G.DAT_0064c778/G.DAT_0064c7b6/G.DAT_0064c7f4/G.DAT_0064c832
  return 1;
}

// FUN_00473c12 — write_null_terminated_string
export function FUN_00473c12(param_1, param_2) {
  // DEVIATION: fputs(param_1, param_2) + fputc(0, param_2) — file I/O helper
  return 0;
}

// FUN_00473c68 — read_null_terminated_string
export function FUN_00473c68(param_1) {
  // DEVIATION: Reads null-terminated string from file via _fgetc loop,
  // allocates buffer via FUN_00498159, copies with FUN_005f22d0
  return 0;
}

// FUN_00473d5e — set_save_extension_by_gametype
export function FUN_00473d5e(param_1) {
  // DEVIATION: Sets G.DAT_0066c4e8 to file extension string via FUN_005f22d0
  // C: if param_1 != 0: copies ".scn" extension
  //    else: based on G.DAT_00655b02 (0=".sav", 1=".hot", 2=".eml", 3-6=".net")
}

// FUN_00473e55 — build_file_filter_string
export function FUN_00473e55(param_1, param_2, param_3) {
  // DEVIATION: Builds file filter string for Win32 open/save dialog
  // Uses FUN_00473ff2 to append .sav/.hot/.eml/.net/.scn/.mp filter entries
  return G.DAT_0066c4f8;
}

// FUN_00473ff2 — append_file_filter_entry
export function FUN_00473ff2(param_1, param_2) {
  // DEVIATION: Appends file filter entry based on param_1 (0=.sav, 1=.hot, 2=.eml, 3-6=.net)
  // Uses FUN_004af14b for string resource and FUN_005f22e0 for strcat
  return null;
}

// FUN_004741be — save_game_to_file
export function FUN_004741be(param_1, param_2) {
  // DEVIATION: Full save game — 4499 bytes of _fwrite calls
  // Writes header, game state (G.DAT_00655ae8 0x14a bytes), tech (G.DAT_0064bcf8 0x790),
  // civ data (G.DAT_0064c6a0 0x2ca0), map data via FUN_005b8635, visibility,
  // units (G.DAT_006560f0), cities (G.DAT_0064f340), wonders, events, scroll state, etc.
  return 0;
}

// FUN_0047543c — quick_load_verify
export function FUN_0047543c(param_1) {
  // DEVIATION: Opens file, reads CIVILIZE header via FUN_00497da0,
  // checks version range (< 0x26 → old, 0x26-0x2c → load, > 0x2c → too new)
  // Calls load_game_file + FUN_005b8783 for valid versions
  return 0;
}

// FUN_00475666 — full_load_game
export function FUN_00475666(param_1) {
  // DEVIATION: Full load game — 7734 bytes of _fread + state fixup
  // Reads all save file sections, fixes unit ownership, city assignments,
  // technology visibility, scroll state, wonder effects, event scripts, etc.
  // Calls FUN_00484cc0, FUN_004a76f5, FUN_00498784, FUN_0049882b, etc.
  return 0;
}

// save_game — save_game_ui_flow
export function save_game(param_1) {
  // DEVIATION: Complete save game UI flow — 2038 bytes
  // Shows Win32 file dialog via show_open_dialog_31D2, builds filename,
  // calls FUN_004741be, shows success/error dialog
}

// load_verify_units — load_game_ui_flow
export function load_verify_units(param_1, param_2, param_3) {
  // DEVIATION: Complete load game UI flow — 2391 bytes
  // Shows Win32 file dialog, calls FUN_00475666, verifies unit positions,
  // loads events, initializes turn, shows success/error dialogs
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
  // DEVIATION: thunk_FUN_00410402(param_1, in_ECX+0x2e2) — map scroll via class instance
}

// FUN_00479eae — scroll_map_by_row
export function FUN_00479eae(param_1) {
  // DEVIATION: thunk_FUN_00410402(in_ECX+0x2e0, param_1) — map scroll via class instance
}

// FUN_00479ede — set_map_mode
export function FUN_00479ede(param_1) {
  // DEVIATION: Sets map display params in class instance (in_ECX+0x2d8/0x2de/0x358/0x2e0/0x2e2/etc.)
  // Initializes viewport center based on param_1 and G.DAT_006d1160/G.DAT_006d1162
}

// FUN_00479fbe — compute_map_viewport
export function FUN_00479fbe() {
  // DEVIATION: Computes tile sizes via FUN_00472cf0(0x40/0x20), viewport dimensions,
  // scroll limits, wrapping constraints — 1410 bytes of geometry math on class instance state
}

// FUN_0047a540 — screen_to_tile
export function FUN_0047a540(param_1, param_2, param_3, param_4) {
  // DEVIATION: Converts screen pixel coords to tile coords using class instance viewport state
  // Returns 0 on success, 1 if out of bounds
  return 1;
}

// FUN_0047a6b0 — tile_to_screen
export function FUN_0047a6b0(param_1, param_2, param_3, param_4) {
  // DEVIATION: Converts tile coordinates to screen pixel coordinates
  // Uses in_ECX+0x310/0x314/0x2e8/0x2ec/0x330/0x334/0x124/0x128
}

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
  // DEVIATION: 4431-byte terrain rendering function
  // Draws base terrain, coast transitions, overlays, improvements (road/rail/irrigation/mining),
  // rivers, goody huts, resources, fortress, pollution, farmland, airbase, city flag
  // Calls FUN_005cef31 ~25 times for sprite blitting, FUN_005b8931/FUN_005b94d5 for tile data
}

// FUN_0047ba1d — draw_city_on_tile
export function FUN_0047ba1d(param_1, param_2, param_3, param_4) {
  // DEVIATION: Draws city sprite on tile — checks visibility, calls FUN_0056d289
  // C: FUN_0043cf76 find city, FUN_005b8b65 visibility check, G.DAT_0064f348 owner check
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
  // DEVIATION: Draws unit at position using FUN_0047a6b0 + FUN_0056baff
  if (G.DAT_0062804c === 0 || G.DAT_00628054 === 0 || G.DAT_006d1da8 !== 1) {
    // C: FUN_0047a6b0 for screen coords, local_c -= in_ECX+0x314, FUN_0056baff for sprite
  }
}

// FUN_0047bd04 — draw_unit_with_checks
export function FUN_0047bd04(param_1, param_2, param_3) {
  // DEVIATION: Checks G.DAT_00633e48/G.DAT_00633e54 selection state, calls FUN_0047bbea/FUN_0047bba5
}

// FUN_0047be63 — draw_units_on_tile
export function FUN_0047be63(param_1, param_2, param_3, param_4) {
  // DEVIATION: Iterates units on tile via FUN_005b2e69/FUN_005b2c82, draws visible ones
  // Checks FUN_005b8ca6, G.DAT_006d1da8, FUN_005b633f for visibility
}

// FUN_0047c103 — draw_single_map_tile
export function FUN_0047c103(param_1, param_2, param_3) {
  // DEVIATION: Draws terrain (FUN_0047a8c9) + city (FUN_0047ba1d) + units (FUN_0047be63)
  // for a single tile, with fog-of-war overlay check
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
  // DEVIATION: Calls FUN_0047c37f with in_ECX viewport bounds (0x2e8/0x2ec/0x2f8/0x300/0x2fc/0x304)
  // Without class instance state, always returns 1 (tile visible)
  return 1;
}

// FUN_0047c443 — draw_city_names
export function FUN_0047c443(param_1, param_2, param_3) {
  // DEVIATION: 871-byte function, iterates G.DAT_00655b18 cities, checks visibility,
  // draws name labels using FUN_005baec8/FUN_005baee0/FUN_005baf57
}

// FUN_0047c7aa — compute_tile_area_rect
export function FUN_0047c7aa(param_1, param_2, param_3, param_4) {
  // DEVIATION: Computes screen rect via FUN_0047a6b0 + viewport scaling + FUN_0047df80
}

// FUN_0047c869 — draw_map_area
export function FUN_0047c869(param_1, param_2, param_3, param_4) {
  // DEVIATION: Draws tiles in diamond pattern — nested loop over -(param_3*2+2) to +(param_3*2+2)
  // Calls FUN_005ae052 for wrapping, FUN_0047c3e0 for visibility, FUN_0047c103 for each tile
}

// FUN_0047c9d4 — draw_full_viewport
export function FUN_0047c9d4(param_1) {
  // DEVIATION: Draws all tiles in viewport — iterates in_ECX+0x2ec to +0x2fc+0x304+1 rows
  // Calls FUN_005ae052 + FUN_0047c103 for each, then FUN_0047c443 for city names
}

// FUN_0047caea — invalidate_tile_area
export function FUN_0047caea(param_1, param_2, param_3) {
  // DEVIATION: Calls FUN_0047c7aa + FUN_00408490 to invalidate screen region
}

// FUN_0047cb26 — invalidate_single_tile
export function FUN_0047cb26(param_1, param_2) {
  FUN_0047caea(param_1, param_2, 0);
}

// FUN_0047cb50 — refresh_status_displays
export function FUN_0047cb50() {
  // DEVIATION: UI refresh calls
  FUN_00407ff0(); // update_info_panel
  if (G.DAT_00655b02 > 2) {
    FUN_0047e94e(1, 0);
  }
  FUN_00408460(); // invalidate_all
  FUN_00407ff0(); // update_info_panel
  if (G.DAT_00655b02 > 2) {
    FUN_0047e94e(1, 0);
  }
}

// FUN_0047cbb4 — redraw_map_area
export function FUN_0047cbb4(param_1, param_2, param_3, param_4, param_5) {
  if (G.DAT_00628044 !== 0) {
    G.DAT_006ad908 = 1;
    let local_20;
    if (G.DAT_00655b07 === 0) {
      local_20 = param_4;
    } else {
      local_20 = 0xffffffff;
    }
    FUN_0047c869(param_1, param_2, param_3, local_20);
    // DEVIATION: cursor drawing via FUN_0047a6b0/FUN_005cef31 omitted (rendering)
    // C checks: G.DAT_006d1da8 == 0 && G.DAT_00628054 != 0 && G.DAT_0062804c != 0
    //           && in_ECX+0x2d8 == 0 && FUN_0047c3e0(G.DAT_0064b1b4, G.DAT_0064b1b0)
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
    // DEVIATION: FUN_00552ed2 save_screen_state, FUN_00479fbe compute_map_viewport,
    //            FUN_00552112 update_minimap — rendering calls
    FUN_00552ed2();
    FUN_00479fbe();
    FUN_00552112();
    let local_8;
    if (G.DAT_00655b07 === 0) {
      local_8 = param_1;
    } else {
      local_8 = 0xffffffff;
    }
    FUN_0047c9d4(local_8);
    if (param_2 !== 0) {
      FUN_0047cb50();
      // DEVIATION: in_ECX+0x2d8 check and FUN_0040733c call omitted (UI)
    }
    if (G.DAT_0062bcb0 === 0 && G.DAT_006ad684 === 0) {
      FUN_00421bd0(); // update_status_bar
    }
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
  // DEVIATION: MFC class constructor — returns class pointer
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
  // DEVIATION: Win32 IntersectRect(param_1, param_2, param_3)
}

// FUN_0047dfb0 — scale_param_by_zoom
export function FUN_0047dfb0(param_1) {
  // DEVIATION: thunk_FUN_00472cf0(param_1, (int)*(short*)(in_ECX + 0x2e4))
  return 0;
}

// FUN_0047dff0 — set_zoom_draw_scale
export function FUN_0047dff0() {
  // DEVIATION: thunk_FUN_0047df20((int)*(short*)(in_ECX + 0x2e4))
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
  let iVar1;
  if (G.DAT_006ad914 === G.DAT_006ad910 && G.DAT_006ad90c !== 0) {
    // Queue full — flush
    // DEVIATION: debug_log call omitted (s_STACKED_DRAW_stack_full__Flushin_0062bcf0)
    if (G.DAT_006ad918 !== 0) {
      G.DAT_006ad914 = (G.DAT_006ad910 + 1) % 100;
    } else {
      G.DAT_006ad910 = 0;
      G.DAT_006ad914 = 0;
    }
    G.DAT_006ad90c = (G.DAT_006ad918 !== 0) ? 1 : 0;
    FUN_0047e0e5(0xa3, new Int32Array(7), 0);
    iVar1 = FUN_0047e0e5(0x74, new Int32Array(7), 0);
  } else {
    // DEVIATION: assert checks on G.DAT_006ad910 and G.DAT_006ad914 omitted
    // Store command type
    G.DAT_006ad920[G.DAT_006ad914 * 16] = param_1;
    // Store 7 params
    for (let local_8 = 0; local_8 < 7; local_8 = local_8 + 1) {
      G.DAT_006ad924[local_8 + G.DAT_006ad914 * 16] = param_2[local_8];
    }
    // For command 0x70, copy extra 0x20 bytes of data
    if (param_1 === 0x70 && param_3 !== 0) {
      for (let i = 0; i < 0x20; i++) {
        G.DAT_006ad940[G.DAT_006ad914 * 0x40 + i] = param_3[i];
      }
    }
    G.DAT_006ad90c = G.DAT_006ad90c + 1;
    if (G.DAT_006ad91c < G.DAT_006ad90c) {
      G.DAT_006ad91c = G.DAT_006ad90c;
    }
    iVar1 = ((G.DAT_006ad914 + 1) / 100) | 0;
    G.DAT_006ad914 = (G.DAT_006ad914 + 1) % 100;
  }
  return iVar1;
}

// FUN_0047e2b3 — dequeue_and_execute_draw
export function FUN_0047e2b3() {
  // Processes queued draw operations — switch on command type
  let iVar6;
  switch (G.DAT_006ad920[G.DAT_006ad910 * 16]) {
    case 0x70: {
      // Move unit animation
      let unitIdx = G.DAT_006ad924[G.DAT_006ad910 * 16];
      iVar6 = G.DAT_006ad928[G.DAT_006ad910 * 16];
      let iVar1 = G.DAT_006ad92c[G.DAT_006ad910 * 16];
      let uVar4 = G.DAT_006ad930[G.DAT_006ad910 * 16];
      FUN_005b2590(unitIdx);
      let iVar2 = FUN_0047e030(iVar6, iVar1);
      if (iVar2 !== 0) {
        // DEVIATION: FID_conflict__memcpy to G.DAT_00666110 omitted (UI state copy)
        // DEVIATION: G.DAT_00666126/G.DAT_00666128 set, FUN_004105f8 center-on-tile call omitted
        // DEVIATION: FUN_0046e020 sound call omitted
        // DEVIATION: FUN_005b8931 tile layer access omitted
        // DEVIATION: FUN_005b2e69/FUN_005b50ad unit counting omitted
        // DEVIATION: G.DAT_00633e4c/G.DAT_00633e50/G.DAT_00633e54 selection state updates omitted
        G.DAT_00636058 = 1;
        FUN_0056c705(0x801, iVar6, iVar1, uVar4, G.DAT_006ad6a4, G.DAT_006ad6a8);
        G.DAT_00636058 = 0;
        // DEVIATION: post-move visibility/stack flag updates omitted (rendering)
      }
      break;
    }
    case 0x71: {
      // Center on tile if visible
      let vis = FUN_005b8b65(G.DAT_006ad924[G.DAT_006ad910 * 16],
                             G.DAT_006ad928[G.DAT_006ad910 * 16], G.DAT_006d1da0);
      if (vis !== 0) {
        FUN_004105f8(G.DAT_006ad924[G.DAT_006ad910 * 16],
                     G.DAT_006ad928[G.DAT_006ad910 * 16],
                     G.DAT_006ad92c[G.DAT_006ad910 * 16]);
      }
      break;
    }
    case 0x72:
      // Redraw tile 1x all views
      FUN_0047cea6(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16]);
      break;
    case 0x73:
      // Play combat animation — DEVIATION: pure rendering
      FUN_005802fd(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16],
                   G.DAT_006ad92c[G.DAT_006ad910 * 16], G.DAT_006ad930[G.DAT_006ad910 * 16]);
      break;
    case 0x74:
      // Full redraw all views
      FUN_0047cf9e(G.DAT_006d1da0, 1);
      break;
    case 0x75:
      // Redraw tile 3x all views
      FUN_0047cf22(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16]);
      break;
    case 0x76:
      // Redraw all views with params
      FUN_0047ce1e(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16],
                   G.DAT_006ad92c[G.DAT_006ad910 * 16], G.DAT_006ad930[G.DAT_006ad910 * 16], 1);
      break;
    case 0x7c: {
      // Draw explosion if visible
      let vis7c = FUN_0047e030(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16]);
      if (vis7c !== 0) {
        FUN_0057ed3f(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16],
                     G.DAT_006ad92c[G.DAT_006ad910 * 16]);
      }
      break;
    }
    case 0x7d: {
      // Draw nuke if visible
      let vis7d = FUN_0047e030(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16]);
      if (vis7d !== 0) {
        FUN_0057f657(G.DAT_006ad924[G.DAT_006ad910 * 16], G.DAT_006ad928[G.DAT_006ad910 * 16]);
      }
      break;
    }
    case 0xa3:
      // Increment network sync counter
      G.DAT_006c926c = G.DAT_006c926c + 1;
      break;
  }
  G.DAT_006ad90c = G.DAT_006ad90c - 1;
  iVar6 = G.DAT_006ad910 + 1;
  G.DAT_006ad910 = iVar6 % 100;
  return (iVar6 / 100) | 0;
}

// FUN_0047e94e — network_poll_dispatch
export function FUN_0047e94e(param_1, param_2) {
  // DEVIATION: Massive network message dispatcher (14034 bytes, 160+ message types)
  // Handles Win32 XD_InFlushSendBuffer/XD_FlushSendBuffer, network packet parsing,
  // game state sync, unit commands, city operations, diplomacy, combat results, etc.
  // All logic is Win32 network I/O and UI dispatch — not applicable to JS engine.
  // Game state mutations in this function occur via calls to functions defined
  // in other blocks (FUN_005b3d06 create_unit, FUN_005b389f disband_unit, etc.)
  // which are separately transpiled.
}

// FUN_00482305 — seh_helper_A (referenced within FUN_0047e94e)
export function FUN_00482305() { /* DEVIATION: SEH cleanup — no-op in JS */ }

// FUN_00482311 — seh_helper_B (referenced within FUN_0047e94e)
export function FUN_00482311() { /* DEVIATION: SEH cleanup — no-op in JS */ }

// FUN_00482327 — seh_epilog_poll (referenced within FUN_0047e94e)
export function FUN_00482327() { /* DEVIATION: SEH epilog — no-op in JS */ }


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
// These are called from this block but defined elsewhere.
// ═══════════════════════════════════════════════════════════════════

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
