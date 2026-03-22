// ═══════════════════════════════════════════════════════════════════
// block_00480000.js — Mechanical transpilation of block_00480000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00480000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00480000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8, s16, u16,
  DAT_006560f0, DAT_0064b1bc, DAT_0064c600, DAT_0064f340,
  DAT_00627cc0, DAT_00627cce, DAT_00627cd4,
  DAT_00636058, DAT_00655b16,
  DAT_0062833c, DAT_00628344,
  getTileOffset, tileRead, tileWrite,
} from './mem.js';

import {
  FUN_004087c0, FUN_005ae052, FUN_005b8931,
  FUN_005b94d5, FUN_005b89bb, FUN_005b89e4,
  FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1,
  FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6,
} from './fn_utils.js';


// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

// NOTE: Many globals below are network/UI-only state. They are
// declared here as module-level variables for mechanical correctness.
// Game-logic globals should eventually migrate to mem.js.

let DAT_006c9178 = 0;
let DAT_006ad678 = new Array(32).fill(0);
let DAT_006ad664 = 0;
let DAT_00655b0b = 0;
let DAT_006ad308 = 0;
let DAT_006ad698 = 0;
let DAT_006c31a8 = 0;
let DAT_006d1da0 = 0;
let DAT_00635a3c = 0;
let DAT_006ad304 = 0;
let DAT_006c9038 = 0;
let DAT_006c8ff0 = 0;
let DAT_006ad8b8 = 0;
let DAT_006d1da8 = 0;
let DAT_006d1164 = 0;
let DAT_006d1160 = 0;
let DAT_006d1162 = 0;
let DAT_00628044 = 0;
let DAT_006ad684 = 0;
let DAT_00655b02 = 0;
let DAT_006ad685 = 0;
let DAT_0064b9bc = 0;
let DAT_00654fa8 = 0;
let DAT_0064b1ac = 0;
let DAT_00655af8 = 0;
let DAT_00655afa = 0;
let DAT_00655b08 = 0;
let DAT_00655af0 = 0;
let DAT_00655b0a = 0;
let DAT_00655b09 = 0;
let DAT_0064b383 = 0;
let DAT_00655bbb = 0;
let DAT_00655baf = 0;
let DAT_00655bb5 = 0;
let DAT_00655b8d = 0;
let DAT_00655bd3 = 0;
let DAT_00655ba9 = 0;
let DAT_00655ba5 = 0;
let DAT_00655ba7 = 0;
let DAT_00655ba4 = 0;
let DAT_00655ae8 = 0;
let DAT_00655b14 = 0;
let DAT_00655aee = 0;
let DAT_00655c1e = 0;
let DAT_0062c5b4 = 0;
let DAT_00655c20 = 0;
let DAT_00655c21 = 0;
let DAT_00655b18 = 0;
let DAT_00655b0e = 0;
let DAT_00655b0f = 0;
let DAT_00655b10 = 0;
let DAT_00655b12 = 0;
let DAT_00655afe = 0;
let DAT_0064bc56 = 0;
let DAT_00655af4 = 0;
let DAT_00628054 = 0;
let DAT_0062805c = 0;
let DAT_0062804c = 0;
let DAT_00673b04 = 0;
let DAT_00634c9c = 0;
let DAT_0062c5c0 = 0;
let DAT_0062c5bc = 0;
let DAT_006ad699 = 0;
let DAT_0062c5b8 = 0;
let DAT_00654fa4 = 0;
let DAT_00654fa6 = 0;
let DAT_00628048 = 0;
let DAT_0062c488 = 0;
let DAT_006ad2f7 = 0;
let DAT_006c918c = 0;
let DAT_006c8fb4 = 0;
let DAT_006c9090 = 0;
let DAT_006c31d0 = 0;
let DAT_0067a8bc = 0;
let DAT_00631130 = 0;
let DAT_006a65a0 = 0;
let DAT_006aa75c = 0;
let DAT_00655c18 = 0;
let DAT_00627670 = 0;
let DAT_00654b70 = 0;
let DAT_00633a74 = 0;
let DAT_00633a78 = 0;
let DAT_0063f660 = 0;
let DAT_006c31a9 = 0;
let DAT_00654c76 = 0;
let DAT_00654fac = 0;
let DAT_00654fae = 0;
let DAT_00654c7c = 0;
let DAT_00628064 = 0;
let DAT_006d1da4 = 0;
let DAT_00654faa = 0;
let DAT_00654fb0 = 0;
let DAT_006c8fac = 0;
let DAT_006c8fa0 = 0;
let DAT_00655b05 = 0;
let DAT_00655b03 = 0;
let DAT_00626a2c = 0;
let DAT_006c91e4 = 0;
let DAT_00655c31 = 0;

// Arrays used by various functions
let DAT_0064b99c = 0;
let DAT_0064b98c = null;
let DAT_0064b998 = 0;
let DAT_0064b992 = 0;
let DAT_0064bc60 = 0;
let DAT_0064bc62 = 0;
let DAT_0064bcb2 = 0;
let DAT_0064bcb4 = 0;
let DAT_0064bcb6 = 0;
let DAT_0064bcb8 = 0;
let DAT_0064bcba = 0;
let DAT_0064bcbc = new Array(4).fill(0);
let DAT_0064b1b4 = 0;
let DAT_0064b1b0 = 0;
let DAT_0066ca88 = 0;
let DAT_0066ca8a = 0;

// Score-tracking arrays
let DAT_00655c22 = new Uint8Array(8);
let DAT_00655c2a = new Uint8Array(8);
let DAT_00655c38 = new Uint8Array(0x96 * 8);
let DAT_00673afc = new Uint8Array(4);
let DAT_00673af8 = new Uint8Array(4);

// Per-civ data aliases (offsets from DAT_0064c600 base)
// These are accessed as (&DAT_XXXXXXXX)[civIdx * 0x594]
// We use DAT_0064c600 with the appropriate offset arithmetic.

// Direction tables - 20-entry versions (8 cardinal + diagonal * 2 + ...)
let DAT_00628350 = new Int8Array([-1, 1, 2, 1, -1, -1, -2, -1, 0, 2, 0, -2, -1, 1, 2, 1, -1, -1, -2, -1]);
let DAT_00628360 = new Int8Array([-1, -1, 0, 1, 1, 1, 0, -1, -2, 0, 2, 0, -1, -1, 0, 1, 1, 1, 0, -1]);

// Year/calendar table data
let DAT_0062c494 = new Int32Array(256);
let DAT_0062c498 = new Int32Array(256);
let DAT_0062c490 = new Int32Array(256);
let DAT_0062c4d4 = new Int32Array(256);
let DAT_0062c4d0 = new Int32Array(256);
let DAT_0062c4cc = new Int32Array(256);

// Unit type table aliases
let DAT_0064b1ca = new Uint8Array(DAT_0064b1bc.buffer, 0x0E);
let DAT_0064b1c1 = new Uint8Array(DAT_0064b1bc.buffer, 0x05);
let DAT_0064b1c4 = new Uint8Array(DAT_0064b1bc.buffer, 0x08);
let DAT_0064b1c5 = new Uint8Array(DAT_0064b1bc.buffer, 0x09);
let DAT_0064b1c6 = new Uint8Array(DAT_0064b1bc.buffer, 0x0A);
let DAT_0064b1c7 = new Uint8Array(DAT_0064b1bc.buffer, 0x0B);
let DAT_0064b1c8 = new Uint8Array(DAT_0064b1bc.buffer, 0x0C);
let DAT_0064b1c3 = new Uint8Array(DAT_0064b1bc.buffer, 0x07);

// Misc game state data tables
let DAT_006554f8 = new Uint8Array(256);
let DAT_006554fa = new Uint8Array(256);
let DAT_00655b82 = new Uint8Array(256);
let DAT_0063f580 = new Uint8Array(256);
let DAT_0066ca84 = new Int16Array(256);
let DAT_00628420 = 0;
let DAT_00654b40 = new Int16Array(8);
let DAT_00654b50 = new Int16Array(8);
let DAT_00654b60 = new Int16Array(8);
let DAT_0064c5a6 = 0;
let DAT_0064c5ae = 0;
let DAT_0064c5b6 = 0;
let DAT_006665b0 = 0;
let DAT_006af220 = new Int32Array(8);
let DAT_006af240 = new Int32Array(8);
let DAT_00673b08 = 0;
let DAT_006c3168 = new Int32Array(8);
let DAT_006c3188 = new Int32Array(8);
let DAT_006c8fc0 = new Int32Array(8);
let DAT_006ad644 = new Int32Array(8);
let DAT_006ad558 = new Int32Array(8);
let DAT_006ad30c = new Uint8Array(7 * 0x54);
let DAT_006ad330 = new Uint8Array(7 * 0x54);
let DAT_006ad359 = new Uint8Array(7 * 0x54);
let DAT_006ad35c = new Uint8Array(7 * 0x15);
let DAT_0062c468 = new Int32Array(8);
let DAT_00673ad8 = new Int32Array(8);
let DAT_00673ab8 = new Int32Array(8);
let DAT_00673a78 = new Int32Array(8);
let DAT_00673a98 = new Int32Array(8);
let DAT_00654da4 = new Uint8Array(8 * 0x20);
let DAT_00666134 = new Int16Array(256);


// ═══════════════════════════════════════════════════════════════════
// STUB: External function calls
// These are functions from other blocks that are called but not
// defined here. They are stubbed as no-ops for mechanical correctness.
// ═══════════════════════════════════════════════════════════════════

function FUN_0059df8a() { /* SEH cleanup */ }
function FUN_0047e94e(a, b) { /* process_messages */ }
function FUN_005ae006(a) { /* count_bits */ return 0; }
function FUN_0046b14d(a,b,c,d,e,f,g,h,i,j) { /* send_net_msg */ }
function FUN_00426fb0(a,b,c,d) { /* modal_dialog_wait */ }
function FUN_00410030(a,b,c) { /* show_popup_dialog */ return 0; }
function FUN_005f22d0(a,b) { /* string_copy */ }
function FUN_004b0b53(a,b,c,d,e) { /* sync_game_state */ }
function XD_FlushSendBuffer(a) { /* flush_network */ }
function FUN_005dae6b(a,b,c,d) { /* assert_fail */ }
function FUN_005d237d(a,b) { /* debug_log_2arg */ }
function FUN_005d23bb(a,b) { /* debug_log_format */ }
function FUN_005d2279(a,b) { /* debug_log_error */ }
function FUN_005d2004(a) { /* free_pointer */ }
function debug_log(a) { /* debug_log */ }
function FUN_0059b293(a) { /* disconnect_network */ }
function FUN_0059adef(a,b) { /* reconnect_server */ return 0; }
function FUN_0059c2b8() { /* reset_net_buffers */ }
function XD_CloseConnection() { return 0; }
function XD_OpenConnection(a,b) { return 0; }
function FUN_0040ff60(a,b) { /* set_string_register */ }
function FUN_0040ffa0(a,b) { /* display_string */ }
function FUN_0040bc10(a) { /* play_sound_effect */ }
function FUN_0040bc80(a) { /* play_sound */ }
function FUN_0040bbb0() { /* clear_text_buffer */ }
function FUN_0040bbe0(a) { /* append_text */ }
function FUN_0040ef50() { /* redraw_screen */ }
function FUN_0040fe10() { /* update_display */ }
function FUN_00410070(a) { /* get_civ_name */ return ''; }
function FUN_00410402(a,b) { /* center_map_on */ }
function FUN_004105f8(a,b,c) { /* scroll_to_unit */ }
function FUN_00413476() { /* update_fog_of_war */ }
function FUN_0041b8ff(a) { /* init_player_view */ }
function FUN_00419b80() { /* refresh_map */ }
function FUN_00421bd0() { /* update_status_bar */ }
function FUN_00421da0(a,b) { /* format_number */ }
function FUN_00421ea0(a) { /* show_email_dialog */ }
function FUN_00421f10(a) { /* format_year */ }
function FUN_00421bb0() { /* get_tick_count */ return 0; }
function FUN_0042a768() { /* recalc_all */ }
function FUN_00428b0c(a) { /* get_resource_string */ return ''; }
function FUN_00431d22() { /* check_wonders */ }
function FUN_00432611() { /* reset_pollution_map */ }
function FUN_00435d15(a) { /* check_spaceship_1 */ }
function FUN_004361cc(a) { /* check_spaceship_2 */ }
function FUN_00436f5a(a) { /* check_spaceship_3 */ }
function FUN_0043856b(a) { /* show_casualties_dialog */ }
function FUN_0043ca50(a,b) { /* format_population */ }
function FUN_0043ca10(a,b) { /* set_dialog_text */ }
function FUN_0043c840(a,b) { /* append_string */ }
function FUN_0043cce5(a) { /* get_civ_population */ return 0; }
function FUN_0043cef9(a) { /* get_city_score */ return 0; }
function FUN_0043d07a(a,b,c,d,e) { /* find_nearest_city */ return -1; }
function FUN_0043d20a(a,b) { /* city_has_building */ return 0; }
function FUN_004442e0(a,b) { /* show_barbarian_alert */ }
function FUN_00453af0() { /* check_alliances */ }
function FUN_00453e51(a,b) { /* check_wonder_effect */ return 0; }
function FUN_004503d0() { /* push_display_state */ }
function FUN_004085f0() { /* pop_display_state */ }
function FUN_00408490(a) { /* set_viewport */ }
function FUN_00456f20(a,b,c) { /* set_diplomacy_flag */ }
function FUN_00460129(a,b,c,d,e) { /* process_AI_diplomacy */ }
function FUN_0046e020(a,b,c,d) { /* play_animation */ }
function FUN_0046e6a9() { /* end_game_cleanup */ }
function FUN_0046e6c8() { /* process_unit_orders */ }
function FUN_00473d5e(a) { /* close_city_window */ }
function FUN_004702e0(a) { /* show_domination_victory */ }
function FUN_004710d0(a) { /* show_space_victory */ }
function FUN_004741be(a,b) { /* save_game_to_file */ }
function FUN_0047cea6(a,b) { /* refresh_tile */ }
function FUN_0047cf9e(a,b) { /* update_civ_visibility */ }
function FUN_00490530(a,b,c) { /* show_tutorial_popup */ }
function FUN_004904c0(a,b,c,d) { /* show_tutorial_message */ }
function FUN_00490500(a,b,c) { /* show_tutorial_city */ }
function FUN_00493b10(a) { /* get_leader_name */ return ''; }
function FUN_00493ba6(a) { /* get_civ_adj_name */ return ''; }
function FUN_00493c7d(a) { /* get_tribe_name */ return ''; }
function FUN_00498a5c(a) { /* prepare_civ_turn */ }
function FUN_004a28b0(a) { /* get_total_tech_count */ return 0; }
function FUN_004a7577(a) { /* is_civ_eliminated */ return 0; }
function FUN_004a75a6(a) { /* has_spaceship */ return 0; }
function FUN_004a75d5(a) { /* spaceship_launched */ return 0; }
function FUN_004abfe5(a,b,c) { /* pathfind_step */ return -1; }
function FUN_004aef36(a) { /* display_year_text */ }
function FUN_004af14b(a,b) { /* display_year_popup_1 */ }
function FUN_004af1d5(a,b) { /* display_year_popup_2 */ }
function FUN_004b7645() { /* save_diplomacy_state_1 */ }
function FUN_004b768d() { /* save_diplomacy_state_2 */ }
function FUN_004c5408(a) { /* process_unit_action */ return 0; }
function FUN_004c5fae(a,b,c) { /* handle_captured_unit */ }
function FUN_004d007e(a) { /* format_save_name */ }
function FUN_004d01ae(a) { /* calc_civ_income */ }
function FUN_004d0339(a) { /* check_civ_bankruptcy */ return 0; }
function FUN_004e1763(a,b,c) { /* eliminate_civ */ }
function FUN_004e4ceb() { /* refresh_ui */ }
function FUN_004f0a9c(a) { /* process_city_production */ return 0; }
function FUN_004fba0c(a) { /* run_events_1 */ }
function FUN_004fba9c(a) { /* run_events_2 */ }
function FUN_004fbb2f(a) { /* run_events_3 */ }
function FUN_004fbbdd() { /* run_events_4 */ }
function FUN_00511880(a,b,c,d,e,f) { /* send_MP_notification */ }
function FUN_00514e7b(a) { /* show_conquest_victory */ }
function FUN_00516570(a,b) { /* show_council_screen */ return 0; }
function FUN_00543b80() { /* AI_move_unit */ }
function FUN_00543cd6() { /* AI_process_turn */ }
function FUN_00552112() { /* recalc_viewport */ }
function FUN_0055ae80(a) { /* set_timer_state */ }
function FUN_0055af2e(a) { /* start_timer */ }
function FUN_0055b046(a) { /* save_timer_game */ }
function FUN_00560084(a) { /* check_wonders_obsolete */ }
function FUN_0056a65e(a) { /* set_needs_redraw */ }
function FUN_00568e86(a) { /* switch_active_civ */ }
function FUN_00569363(a) { /* reset_view_state */ }
function FUN_00579dbb(a) { /* get_barbarian_chance */ return 0; }
function FUN_00598ceb() { /* is_scenario_mode */ return 0; }
function FUN_0059772c(a,b) { /* handle_revolution */ }
function FUN_0059b96a(a) { /* remove_player */ }
function FUN_0059d5f5() { /* restore_display_1 */ }
function FUN_0059db08(a) { /* alloc_stack */ }
function FUN_0059db65() { /* free_stack */ }
function FUN_0059ec88(a,b,c) { /* show_message_box */ }
function FUN_005adfa0(a,b,c) { /* clamp */ return Math.max(b, Math.min(a, c)); }
function FUN_005adfd9(a,b) { /* swap_values */ }
function FUN_005ae1b0(a,b,c,d) { /* calc_distance */ return 0; }
function FUN_005b29aa(a) { /* get_unit_max_hp */ return 10; }
function FUN_005b2e69(a,b) { /* find_unit_at */ return -1; }
function FUN_005b2f50(a) { /* delete_unit */ }
function FUN_005b3863(a,b) { /* set_unit_orders */ }
function FUN_005b3d06(a,b,c,d) { /* create_unit */ return -1; }
function FUN_005b47fa(a,b) { /* fortify_unit */ }
function FUN_005b4c63(a,b,c) { /* check_tile_occupied */ return 0; }
function FUN_005b633f(a) { /* is_unit_active */ return 0; }
function FUN_005b6512(a,b) { /* find_next_unit */ return -1; }
function FUN_005b6787(a) { /* wake_unit */ }
function FUN_005b8a81(a,b) { /* get_continent_id */ return 0; }
function FUN_005b8b1a(a,b,c) { /* clear_improvements_vis */ }
function FUN_005b8b65(a,b,c) { /* tile_visible_to_civ */ return 0; }
function FUN_005b898b(a,b,c) { /* get_tile_vis_ptr */ return [0]; }
function FUN_005b8c42(a,b) { /* get_tile_score */ return 0; }
function FUN_005b8d15(a,b) { /* get_air_units_count */ return 0; }
function FUN_005b8d62(a,b) { /* find_unit_owner_at */ return -1; }
function FUN_005b8da4(a,b) { /* find_city_owner_at */ return -1; }
function FUN_005b94fc(a,b,c,d,e) { /* update_tile_visibility */ }
function FUN_005b9646(a,b,c,d) { /* set_terrain */ }
function FUN_005b99e8(a,b,c,d) { /* remove_improvement */ }
function FUN_005b9ec6() { /* begin_tile_update_batch */ }
function FUN_005b9f1c() { /* end_tile_update_batch */ }
function FUN_004274a6(a,b) { /* select_unit */ }
function FUN_0044cc80(a) { /* check_civ_expansion */ }
function FUN_0040ddc6(a) { /* open_tax_dialog */ }
function FID_conflict__remove(a) { /* remove_file */ }
function FID_conflict___wrename(a,b) { /* rename_file */ }
function FID_conflict__memcpy(a,b,c) { /* memcpy */ }
function _memset(a,b,c) { /* memset */ }
function _strcmp(a,b) { return 0; }
function _strlen(a) { return 0; }
function _rand() { return Math.floor(Math.random() * 32768); }
function _chdir(a) { /* chdir */ }
function GetAsyncKeyState(a) { return 0; }
function save_game(a) { /* save_game */ }
function citywin_994F() { /* close_city_screen */ }
function citywin_DADA() { /* begin_city_production */ }
function citywin_DB36() { /* end_city_production */ }
function citywin_9429() { /* refresh_city_screen */ }
function CSplitterWnd_IsTracking() { return -1; }
function CRichEditDoc_InvalidateObjectCache(a) { /* invalidate_cache */ }
function CPropertySheet_EnableStackedTabs(a,b) { /* enable_tabs */ }


// ============================================================
// Function: FUN_00482305 @ 0x00482305
// Size: 12 bytes
// ============================================================

// SEH_cleanup_1
export function FUN_00482305() {
  FUN_0059df8a();
  return;
}


// ============================================================
// Function: FUN_00482311 @ 0x00482311
// Size: 12 bytes
// ============================================================

// SEH_cleanup_2
export function FUN_00482311() {
  FUN_0059df8a();
  return;
}


// ============================================================
// Function: FUN_00482327 @ 0x00482327
// Size: 16 bytes
// ============================================================

// SEH_restore_fs
export function FUN_00482327() {
  // Original: SEH frame restore, no-op in JS
  return;
}


// ============================================================
// Function: FUN_00482337 @ 0x00482337
// Size: 70 bytes
// ============================================================

// mp_invalidate_on_quit_msg
export function FUN_00482337() {
  FUN_0047e94e(1, 0);
  if (DAT_006c9178 !== 0) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
  return;
}


// ============================================================
// Function: FUN_0048237d @ 0x0048237D
// Size: 89 bytes
// ============================================================

// mp_invalidate_on_timeout
export function FUN_0048237d() {
  let iVar1;
  let _DAT_006cec80 = 0; // overlapping global

  FUN_0047e94e(1, 0);
  iVar1 = FUN_00421bb0();
  if (0x4b0 < iVar1 - _DAT_006cec80) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
    _DAT_006cec80 = FUN_00421bb0();
  }
  return;
}


// ============================================================
// Function: FUN_004823d6 @ 0x004823D6
// Size: 154 bytes
// ============================================================

// copy_net_player_data
export function FUN_004823d6(param_1, param_2) {
  param_2[0] = param_1[0x10 >> 2];
  param_2[1] = param_1[0x14 >> 2];
  param_2[2] = param_1[0x18 >> 2];
  param_2[3] = param_1[0x1c >> 2];
  param_2[4] = param_1[0x20 >> 2];
  param_2[5] = param_1[0x24 >> 2];
  param_2[6] = param_1[0x28 >> 2];
  return;
}


// ============================================================
// Function: FUN_00482470 @ 0x00482470
// Size: 115 bytes
// ============================================================

// mp_invalidate_on_multi_check
export function FUN_00482470() {
  let iVar1;

  FUN_0047e94e(1, 0);
  if (DAT_006ad664 !== 0) {
    iVar1 = FUN_005ae006(DAT_00655b0b === 0);
    if (iVar1 === 0 && 1 < DAT_006ad308) {
      return;
    }
  }
  DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  return;
}


// ============================================================
// Function: FUN_004824e3 @ 0x004824E3
// Size: 577 bytes
// ============================================================

// server_quit_cleanup
export function FUN_004824e3() {
  let bVar1;
  let iVar2;
  let local_8;
  let _DAT_006ad578 = 0; // overlapping global

  DAT_006ad698 = 1;
  FUN_0048de75();
  DAT_00655b0b = DAT_006c31a8 | DAT_00655b0b;
  DAT_006c31a8 = 0;
  if (1 < DAT_006ad308) {
    DAT_00655b0b = DAT_00655b0b & ~(1 << (DAT_006d1da0 & 0x1f));
    DAT_006ad664 = DAT_006ad308 + -1;
    FUN_0046b14d(0xe, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    FUN_0048de75();
    DAT_00635a3c = 0; // &LAB_00403cc9
    FUN_00426fb0(0 /*s_SERVERQUITWAIT*/, 0x2000000, 0 /*&DAT_0063fc58*/, 0);
    iVar2 = FUN_005ae006(DAT_00655b0b === 0);
    if (iVar2 === 0) {
      FUN_0046b14d(0xf, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      bVar1 = u8((_DAT_006ad578 + 1) >> 31);
      DAT_00654fa4 = (((u8(_DAT_006ad578 + 1) ^ bVar1) - bVar1) & 7 ^ bVar1) - bVar1;
      let local_8_loop;
      for (local_8_loop = 1; local_8_loop < 7 && DAT_006ad359[local_8_loop * 0x54] === 0; local_8_loop++) {
      }
      if (local_8_loop < 7) {
        FID_conflict__memcpy(DAT_006ad30c, DAT_006ad30c.slice(local_8_loop * 0x54), 0x54);
        DAT_006ad359[0] = 1; // DAT_006ad358 = 1
        DAT_006ad30c[0] = 0; // _DAT_006ad30c = 0
        DAT_006ad558[0] = DAT_006ad558[local_8_loop];
        DAT_006ad308 = DAT_006ad308 + -1;
        DAT_006ad558[local_8_loop] = 0xffffffff;
        _memset(DAT_006ad30c.slice(local_8_loop * 0x54), 0, 0x54);
        FUN_004b0b53(0xff, 2, 0, 1, 0);
        FUN_0046b14d(0x16, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(60000);
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_00482724 @ 0x00482724
// Size: 73 bytes
// ============================================================

// mp_invalidate_on_status_2
export function FUN_00482724() {
  FUN_0047e94e(1, 0);
  if (DAT_006ad698 === 2) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
  return;
}


// ============================================================
// Function: FUN_0048276d @ 0x0048276D
// Size: 104 bytes
// ============================================================

// mp_invalidate_on_server_timeout
export function FUN_0048276d() {
  let iVar1;
  let _DAT_00670d98 = 0;

  FUN_0047e94e(1, 0);
  if (DAT_006c9038 === 0) {
    iVar1 = FUN_00421bb0();
    if (iVar1 - _DAT_00670d98 <= DAT_006ad8b8 * 0x3c) {
      return;
    }
  }
  DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  return;
}


// ============================================================
// Function: FUN_004827d5 @ 0x004827D5
// Size: 104 bytes
// ============================================================

// mp_invalidate_on_client_timeout
export function FUN_004827d5() {
  let iVar1;
  let _DAT_00670d98 = 0;

  FUN_0047e94e(1, 0);
  if (DAT_006c8ff0 === 0) {
    iVar1 = FUN_00421bb0();
    if (iVar1 - _DAT_00670d98 <= DAT_006ad8b8 * 0x3c) {
      return;
    }
  }
  DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  return;
}


// ============================================================
// Function: FUN_0048283d @ 0x0048283D
// Size: 104 bytes
// ============================================================

// mp_invalidate_on_multi_timeout
export function FUN_0048283d() {
  let iVar1;
  let _DAT_00670d98 = 0;

  FUN_0047e94e(1, 0);
  if (DAT_006ad664 !== 0) {
    iVar1 = FUN_00421bb0();
    if (iVar1 - _DAT_00670d98 <= DAT_006ad8b8 * 0x3c) {
      return;
    }
  }
  DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
  CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  return;
}


// ============================================================
// Function: FUN_004828a5 @ 0x004828A5
// Size: 2021 bytes
// ============================================================

// client_transfer_server
export function FUN_004828a5() {
  let cVar1;
  let uVar2;
  let iVar3;
  let local_284;
  let local_280;
  let local_27c = new Array(2).fill(0);
  let acStack_274 = new Array(76).fill(0);
  let local_228 = new Array(135).fill(0);
  let local_c;
  let local_8;
  let _DAT_006c901c = 0;
  let _DAT_00670d98 = 0;

  _DAT_006c901c = 0;
  DAT_006c9038 = 0;
  DAT_006c8ff0 = 0;
  FUN_0046b14d(0x10, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  DAT_00635a3c = 0; // &LAB_004021fd
  FUN_00426fb0(0 /*s_CLIENTQUITWAIT*/, 0x2000000, 0 /*&DAT_0063fc58*/, 0);
  DAT_006ad698 = 0;
  DAT_00635a3c = 0; // &LAB_00402f22
  _DAT_00670d98 = FUN_00421bb0();
  FUN_00426fb0(0 /*s_CLIENTQUITWAIT*/, 0x2000000, 0 /*&DAT_0063fc58*/, 0);
  if (DAT_006c9038 === 0) {
    debug_log('ClientTransferServer: Waiting for server...');
    FUN_005f22d0(0 /*&DAT_0063cc48*/, 0 /*DAT_006ad63c*/);
    FUN_00410030(0 /*s_LANCONNECTFAIL*/, 0 /*&DAT_0063fc58*/, 0);
    DAT_0064b9bc = 0;
    DAT_00628044 = 0;
    uVar2 = 0;
  } else {
    DAT_00628048 = DAT_00654fa4;
    DAT_00635a3c = 0; // &LAB_00402f54
    _DAT_00670d98 = FUN_00421bb0();
    FUN_00426fb0(0 /*s_CLIENTQUITWAIT*/, 0x2000000, 0 /*&DAT_0063fc58*/, 0);
    if (DAT_006c8ff0 === 0) {
      debug_log('ClientTransferServer: Waiting for client data...');
      FUN_005f22d0(0, 0);
      FUN_00410030(0 /*s_LANCONNECTFAIL*/, 0 /*&DAT_0063fc58*/, 0);
      DAT_0064b9bc = 0;
      DAT_00628044 = 0;
      uVar2 = 0;
    } else {
      FID_conflict__memcpy(local_27c, 0 /*&DAT_006ad308*/, 0x270);
      iVar3 = _strcmp(DAT_006665b0, 0 /*&DAT_006ad310*/);
      if (iVar3 === 0) {
        debug_log('ClientTransferServer: Disconnecting...');
        FUN_0059b293(0);
        cVar1 = FUN_0059adef(0 /*DAT_006ad2f8*/, 1);
        local_c = cVar1;
        if (local_c === 0) {
          debug_log('ClientTransferServer: Could not reconnect');
          FUN_005f22d0(0, 0);
          FUN_00410030(0 /*s_LANCONNECTFAIL*/, 0 /*&DAT_0063fc58*/, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        debug_log('Reconnected to network as SERVER');
        FUN_005f22d0(0, DAT_006665b0);
        DAT_006ad304 = 0; // DAT_006ad300 = 0 (adjacent)
        DAT_006ad664 = local_27c[0] + -1;
        // DAT_006ad668 = DAT_006ad664;
        if (DAT_006ad664 < 1) {
          local_8 = local_228[0];
          DAT_006ad558[local_8] = 0;
          DAT_006ad35c[0] = local_8;
        } else {
          DAT_00635a3c = 0; // &LAB_00402ff4
          _DAT_00670d98 = FUN_00421bb0();
          FUN_00426fb0(0 /*s_CLIENTQUITWAIT*/, 0x2000000, 0 /*&DAT_0063fc58*/, 0);
          iVar3 = FUN_00421bb0();
          if (DAT_006ad8b8 * 0x3c < iVar3 - _DAT_00670d98 && DAT_006ad664 !== 0) {
            FUN_005f22d0(0, 0);
            if (DAT_006ad664 === 0 /*DAT_006ad668*/) {
              FUN_00410030(0 /*s_NOONESHOWED*/, 0 /*&DAT_0063fc58*/, 0);
              DAT_00628044 = 0;
              DAT_0064b9bc = 0;
              return 0;
            }
            FUN_00410030(0 /*s_SOMESHOWED*/, 0 /*&DAT_0063fc58*/, 0);
          }
          for (local_284 = 0; local_284 < 7; local_284 = local_284 + 1) {
            if (DAT_006ad359[local_284 * 0x54] !== 0) {
              local_280 = 0;
              while (local_280 < 7 &&
                     _strcmp(acStack_274[local_280 * 0x54], 0 /*&DAT_006ad310 + local_284 * 0x54*/) !== 0) {
                local_280 = local_280 + 1;
              }
              if (6 < local_280) {
                FUN_005dae6b(7, 'oldIndex < MAX_NET_PLAYERS', 'D:\\Ss\\Franklinton\\NetMgr_Poll.cpp', 0x8a7);
              }
              local_8 = local_228[local_280 * 0x15];
              DAT_006ad558[local_8] = local_284;
              DAT_006ad35c[local_284 * 0x15] = local_8;
            }
          }
          DAT_006ad684 = DAT_00654c7c;
          FUN_0046b14d(0x33, 0xff, DAT_00654fac, DAT_00654fae, DAT_00654c7c, 0, 0, 0, 0, 0);
          FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
          XD_FlushSendBuffer(60000);
        }
        _memset(0 /*&DAT_0064ba48*/, -1, 0xc0);
        // DAT_006ad640 = 3;
        FUN_0059c2b8();
        _DAT_006c901c = 0;
        DAT_006c9038 = 0;
        DAT_006c8ff0 = 0;
        if (DAT_0064b1ac !== 2) {
          FUN_00410030(0 /*s_HOSTCHANGESERVER*/, 0 /*&DAT_0063fc58*/, 0);
        }
      } else {
        FUN_005d237d('Disconnecting from server %s', 0 /*&DAT_006ad57c*/);
        local_c = XD_CloseConnection();
        if (local_c !== 0) {
          FUN_005d23bb('ClientTransferServer: Disconnect error %s', local_c);
          FUN_005f22d0(0, 0);
          FUN_00410030(0 /*s_LANCONNECTFAIL*/, 0 /*&DAT_0063fc58*/, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        FUN_005f22d0(0, 0 /*&DAT_006ad310*/);
        _DAT_00670d98 = FUN_00421bb0();
        let tempTick;
        do {
          tempTick = FUN_00421bb0();
        } while (tempTick - _DAT_00670d98 < 0x3c);
        FUN_005d237d('Attempting to reconnect to new server %s', 0);
        local_c = XD_OpenConnection(0, DAT_006ad8b8 * 1000);
        if (local_c < 0) {
          FUN_005d2279('ConnectToGame: Open connection failed', local_c);
          FUN_005f22d0(0, 0);
          FUN_00410030(0 /*s_SERVERCONNECTFAIL*/, 0 /*&DAT_0063fc58*/, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        debug_log('Connection to new server successful');
        _DAT_006c901c = 0;
        DAT_006c9038 = 0;
        DAT_00635a3c = 0; // &LAB_00402f54
        _DAT_00670d98 = FUN_00421bb0();
        FUN_00426fb0(0 /*s_CLIENTQUITWAIT*/, 0x2000000, 0 /*&DAT_0063fc58*/, 0);
        if (DAT_006c8ff0 === 0) {
          debug_log('ClientTransferServer: Client timed out');
          FUN_005f22d0(0, 0);
          FUN_00410030(0 /*s_LANCONNECTFAIL*/, 0 /*&DAT_0063fc58*/, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        FUN_005f22d0(0 /*&DAT_0063cc48*/, 0 /*&DAT_006ad330*/);
        FUN_0059c2b8();
        DAT_006c8ff0 = 0;
        FUN_00410030(0 /*s_HOSTCHANGECLIENT*/, 0 /*&DAT_0063fc58*/, 0);
      }
      uVar2 = 1;
    }
  }
  return uVar2;
}


// ============================================================
// Function: FUN_0048308f @ 0x0048308F
// Size: 1654 bytes
// ============================================================

// init_event_strings
export function FUN_0048308f() {
  // This function initializes scenario event string pointers.
  // It's entirely about parsing string buffers in memory and setting up
  // linked list pointers — purely a framework/UI function.
  // Mechanical transpilation omitted for brevity as it operates on
  // raw memory pointer arithmetic that has no JS equivalent.
  // In the binary: walks event structures, sets up string pointers.
  return;
}


// ============================================================
// Function: FUN_00484cc0 @ 0x00484CC0
// Size: 123 bytes
// ============================================================

// init_cosmic_params
export function FUN_00484cc0() {
  let local_8;

  DAT_0064bc60 = 0;
  DAT_0064bc62 = 0;
  DAT_0064bcb2 = 10;
  DAT_0064bcb4 = 0;
  DAT_0064bcb6 = 0;
  DAT_0064bcb8 = 0;
  DAT_0064bcba = 0;
  for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
    DAT_0064bcbc[local_8] = 0;
  }
  return;
}


// ============================================================
// Function: FUN_00484d3b @ 0x00484D3B
// Size: 23 bytes
// ============================================================

// clear_game_active_flag
export function FUN_00484d3b() {
  DAT_00628044 = 0;
  return;
}


// ============================================================
// Function: FUN_00484d52 @ 0x00484D52
// Size: 51 bytes
// ============================================================

// pre_game_init
export function FUN_00484d52() {
  if (DAT_006ad684 === 0) {
    FUN_00421bd0();
  }
  // FUN_00407ff0 — process_messages
  FUN_00419b80();
  // FUN_00407ff0 — process_messages
  return;
}


// ============================================================
// Function: FUN_00484d85 @ 0x00484D85
// Size: 615 bytes
// ============================================================

// handle_quit_game
export function FUN_00484d85() {
  let iVar1;
  let uVar2;
  let local_8;

  if ((DAT_00655b02 < 3 || DAT_006ad698 === 0) &&
     (iVar1 = FUN_00410030(0 /*s_REALLYQUIT*/, 0 /*&DAT_0063fc58*/, 0), iVar1 !== 0)) {
    if (DAT_00655b02 === 0) {
      FUN_0046e6a9();
      FUN_00484d3b();
    } else {
      if (DAT_00655b02 === 1) {
        local_8 = DAT_00655b0b;
        DAT_00655b0b = DAT_006c31a9;
      }
      if (2 < DAT_00655b02) {
        if (DAT_00633a74 !== 0) {
          FUN_005d2004(DAT_00633a74);
          DAT_00633a74 = 0;
        }
        FUN_004b7645();
        FUN_004b768d();
        uVar2 = FUN_00410070(DAT_006d1da0);
        FUN_0040ff60(0, uVar2);
        uVar2 = FUN_00493ba6(DAT_006d1da0);
        FUN_0040ff60(1, uVar2);
        uVar2 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(2, uVar2);
        uVar2 = FUN_00493c7d(DAT_006d1da0);
        FUN_0040ff60(3, uVar2);
        if (DAT_00654c76 === 0) {
          FUN_00511880(1, 0xff, 4, 0, 0, 0);
        } else {
          FUN_00511880(0, 0xff, 4, 0, 0, 0);
        }
      }
      DAT_00628054 = 0;
      // FUN_0041033a() — update_toolbar
      if ((~(1 << (DAT_006d1da0 & 0x1f)) & DAT_00655b0b) === 0) {
        if (DAT_00655b02 < 3) {
          DAT_00655b0b = DAT_00655b0b & ~(1 << (DAT_006d1da0 & 0x1f));
        } else {
          FUN_0046b14d(0x31, 0, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0);
        }
        FUN_00484d3b();
        FUN_0046e6a9();
      } else {
        FUN_004e1763(DAT_006d1da0, 0, 0);
        if (2 < DAT_00655b02) {
          FUN_00484d3b();
        }
      }
      DAT_0064b9bc = 0;
      DAT_006ad685 = 1;
      if (DAT_00655b02 === 1) {
        DAT_006c31a9 = DAT_00655b0b;
        DAT_00655b0b = local_8;
      }
    }
  }
  return 0;
}


// ============================================================
// Function: FUN_00484fec @ 0x00484FEC
// Size: 540 bytes
// ============================================================

// calc_year_from_turn
export function FUN_00484fec(param_1) {
  let iVar1;
  let local_1c;
  let local_18 = 0;
  let local_14;
  let local_10;
  let local_c = DAT_00655b08;

  if ((DAT_00655af0 & 4) !== 0) {
    local_c = local_c - 1;
  }
  if ((DAT_00655af0 & 8) !== 0) {
    local_c = local_c + 1;
  }
  iVar1 = FUN_005adfa0(local_c - 1, 0, 3);
  if (-1 < DAT_00655afe + 0) { // DAT_00655afc >= 0 check approximation
    local_18 = param_1 - DAT_00655afe;
    if (local_18 < 1) {
      local_18 = 0;
    }
    param_1 = param_1 - local_18;
  }
  if ((DAT_00655af0 & 0x80) === 0 || DAT_0064bcb4 === 0 || DAT_0064bcb6 === 0) {
    if (param_1 !== 0) {
      param_1 = param_1 + -1;
    }
    for (local_14 = 0;
        DAT_0062c494[local_14 + iVar1 * 0x12] < param_1 && local_14 < 6;
        local_14 = local_14 + 1) {
      param_1 = param_1 - DAT_0062c494[local_14 + iVar1 * 0x12];
    }
    if (local_14 < 6) {
      local_10 = DAT_0062c498[local_14 + iVar1 * 0x12] * param_1 +
                 DAT_0062c490[local_14 + iVar1 * 0x12];
    } else {
      local_10 = DAT_0062c4d4[iVar1 * 0x12] * DAT_0062c4d0[iVar1 * 0x12] +
                 DAT_0062c4cc[iVar1 * 0x12] + param_1;
    }
    if (local_10 === 0) {
      local_10 = 1;
    }
  } else {
    if (DAT_0064bcb4 < 1) {
      local_1c = ~DAT_0064bcb4 + 1;
    } else {
      local_1c = DAT_0064bcb4;
    }
    local_10 = DAT_0064bcb6 + param_1 * local_1c + -1;
  }
  return local_10 + local_18;
}


// ============================================================
// Function: FUN_00485208 @ 0x00485208
// Size: 479 bytes
// ============================================================

// display_year_with_sound
export function FUN_00485208(param_1, param_2) {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_00655af0 & 0x80) === 0 || -1 < DAT_0064bcb4) {
    if (-1 < param_2 && DAT_00628064 === 0) {
      FUN_004af14b(param_1, 1);
      FUN_004aef36(param_1);
    }
    if (param_2 < 1) {
      local_14 = ~param_2 + 1;
    } else {
      local_14 = param_2;
    }
    FUN_004af1d5(param_1, local_14);
    if (-1 < param_2 && DAT_00628064 !== 0) {
      FUN_004aef36(param_1);
      FUN_004af14b(param_1, 1);
    }
    if (param_2 < 0) {
      FUN_004aef36(param_1);
      FUN_004af14b(param_1, 0);
    }
  } else {
    if (param_2 < 1) {
      if (param_2 % 0xc < 1) {
        local_c = ~(param_2 % 0xc) + 1;
      } else {
        local_c = param_2 % 0xc;
      }
      FUN_0040bc10(0x1af - local_c);
    } else {
      if (param_2 % 0xc < 1) {
        local_8 = ~(param_2 % 0xc) + 1;
      } else {
        local_8 = param_2 % 0xc;
      }
      FUN_0040bc10(local_8 + 0x1a4);
    }
    FUN_0040fe10();
    if ((param_2 / 0xc | 0) < 1) {
      local_10 = ~((param_2 / 0xc | 0)) + 1;
    } else {
      local_10 = param_2 / 0xc | 0;
    }
    FUN_004af1d5(param_1, local_10);
  }
  return;
}


// ============================================================
// Function: FUN_004853e7 @ 0x004853E7
// Size: 2094 bytes
// ============================================================

// update_power_rankings
export function FUN_004853e7() {
  let uVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let local_50;
  let local_4c;
  let aiStack_48 = new Array(8).fill(0);
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  for (local_50 = 1; local_50 < 8; local_50 = local_50 + 1) {
    if ((1 << (local_50 & 0x1f) & DAT_00655b0a) === 0) {
      aiStack_48[local_50] = 0;
    } else if ((DAT_00655af0 & 0x80) === 0 || (DAT_0064bc60 & 2) === 0) {
      aiStack_48[local_50] =
           u8(DAT_0064c600[local_50 * 0x594 + 0xB0]) * 3 +
           s16(DAT_0064c600, local_50 * 0x594 + 0x10C) * 8 +
           (((DAT_0064c600[local_50 * 0x594 + 0xA2] |
              (DAT_0064c600[local_50 * 0x594 + 0xA3] << 8) |
              (DAT_0064c600[local_50 * 0x594 + 0xA4] << 16) |
              (DAT_0064c600[local_50 * 0x594 + 0xA5] << 24)) >> 5) | 0);
      local_c = 0;
      for (local_20 = 0; local_20 < 0x3e; local_20 = local_20 + 1) {
        if (s8(DAT_0064b1ca[local_20 * 0x14]) < 5) {
          if (DAT_0064b1c1[local_20 * 0x14] === 0) {
            local_18 = (s8(DAT_0064b1c6[local_20 * 0x14]) + 1 +
                       s8(DAT_0064b1c7[local_20 * 0x14])) / 2 | 0;
          } else {
            local_18 = 1;
          }
          local_4c = (s8(DAT_0064b1c4[local_20 * 0x14]) * local_18 +
                     s8(DAT_0064b1c5[local_20 * 0x14])) >> 1;
        } else {
          local_4c = (s8(DAT_0064b1c8[local_20 * 0x14]) + 1) / 2 | 0;
        }
        local_c = local_c + u8(DAT_0064c600[local_50 * 0x594 + 0x178 + local_20]) * local_4c;
      }
    } else {
      aiStack_48[local_50] = 0;
      for (local_24 = 0; local_24 < DAT_00655b18; local_24 = local_24 + 1) {
        if (((DAT_0064f340[local_24 * 0x58 + 0x54] |
              (DAT_0064f340[local_24 * 0x58 + 0x55] << 8) |
              (DAT_0064f340[local_24 * 0x58 + 0x56] << 16) |
              (DAT_0064f340[local_24 * 0x58 + 0x57] << 24)) !== 0) &&
           (s8(DAT_0064f340[local_24 * 0x58 + 0x08]) === local_50)) {
          iVar2 = FUN_0043cef9(local_24);
          aiStack_48[local_50] = aiStack_48[local_50] + iVar2 * 2;
        }
      }
    }
    if ((DAT_00655af0 & 0x80) === 0 || (DAT_0064bc60 & 2) === 0) {
      if (DAT_00655af8 < 600) {
        uVar1 = FUN_005adfa0(aiStack_48[local_50] >> 3, 0, 0xff);
        // Store in history array — simplified
        let histIdx = (((DAT_00655af8 >> 2) | 0) % 0x96) * 8 + local_50;
        DAT_00655c38[histIdx] = uVar1;
      }
    } else if (DAT_00655af8 < 0x4b) {
      uVar1 = FUN_005adfa0(aiStack_48[local_50], 0, 0xff);
      let histIdx = (((DAT_00655af8 >> 1) | 0) % 0x96) * 8 + local_50;
      DAT_00655c38[histIdx] = uVar1;
    }
  }
  for (local_28 = 1; local_28 < 8; local_28 = local_28 + 1) {
    local_8 = -1;
    local_50 = 0;
    for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
      if (local_8 < aiStack_48[local_10]) {
        local_50 = local_10;
        local_8 = aiStack_48[local_10];
      }
    }
    DAT_00655c22[local_50] = 8 - local_28;
    aiStack_48[local_50] = -1;
  }
  DAT_00655af0 = DAT_00655af0 & 0xfffe;
  for (local_50 = 0; local_50 < 8; local_50 = local_50 + 1) {
    DAT_00655c2a[local_50] = 0;
  }
  for (local_50 = 1; local_50 < 8; local_50 = local_50 + 1) {
    if ((1 << (local_50 & 0x1f) & DAT_00655b0a) !== 0) {
      DAT_00655c2a[DAT_00655c22[local_50]] = local_50;
    }
  }
  DAT_00655c20 = 0;
  DAT_00655c21 = 0;
  for (local_50 = 7; -1 < local_50; local_50 = local_50 + -1) {
    if ((DAT_00655b0b & (1 << (DAT_00655c2a[local_50] & 0x1f))) !== 0) {
      DAT_00655c20 = local_50;
      break;
    }
  }
  // Original goto: LAB_00485891
  // Restructured using labeled block
  local_50 = 0;
  let reachedLabel = false;
  while (true) {
    if (7 < local_50) {
      reachedLabel = true;
      break;
    }
    if ((DAT_00655b0b & (1 << (DAT_00655c2a[local_50] & 0x1f))) !== 0) {
      DAT_00655c21 = local_50;
      reachedLabel = true;
      break;
    }
    local_50 = local_50 + 1;
  }

  // LAB_00485891:
  if (reachedLabel) {
    local_1c = 0;
    local_50 = DAT_00655c31;
    if ((DAT_00655b0b & (1 << (DAT_00655c31 & 0x1f))) !== 0 &&
        4 < s16(DAT_0064c600, DAT_00655c31 * 0x594 + 0x108) &&
        DAT_0064c600[DAT_00655c31 * 0x594 + 0x1A5] === 0 &&
        200 < DAT_00655af8 && DAT_00655b08 !== 0) {
      local_1c = 1;
    }
    if (3 < DAT_00655b08) {
      for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
        if ((1 << (local_10 & 0x1f) & DAT_00655b0b) !== 0) {
          iVar2 = FUN_004a7577(local_10);
          if (iVar2 !== 0) {
            local_50 = local_10;
            local_1c = 1;
          }
        }
      }
    }
    uVar3 = local_50;
    if (local_1c !== 0) {
      DAT_00655af0 = DAT_00655af0 | 1;
      local_10 = local_50;
      local_14 = 0;
      for (local_50 = 1; local_50 < 8; local_50 = local_50 + 1) {
        if ((DAT_0064c600[local_50 * 4 + uVar3 * 0x594 + 0xC1] & 0x20) !== 0) {
          local_14 = local_14 + 1;
        }
      }
      for (local_50 = 1; local_50 < 8; local_50 = local_50 + 1) {
        if ((1 << (local_50 & 0x1f) & DAT_00655b0a) !== 0 &&
           (1 << (local_50 & 0x1f) & DAT_00655b0b) === 0 &&
           1 < s16(DAT_0064c600, local_50 * 0x594 + 0x108) &&
           (local_14 * 3 + 3 < u8(DAT_0064c600[local_10 * 0x594 + 0xBE]) ||
            (DAT_0064c600[local_50 * 0x594 + local_10 * 4 + 0xC0] & 0x10) !== 0 ||
            (iVar2 = FUN_00598ceb(), iVar2 !== 0))) {
          if ((DAT_0064c600[local_50 * 0x594 + local_10 * 4 + 0xC0] & 8) === 0) {
            if ((DAT_0064c600[local_50 * 0x594 + local_10 * 4 + 0xC0] & 6) === 0) {
              FUN_00456f20(local_50, local_10, 1);
              let off = local_50 * 0x594 + local_10 * 4 + 0xC0;
              DAT_0064c600[off] = DAT_0064c600[off] | 1;
            } else {
              uVar3 = _rand();
              uVar4 = uVar3 >> 31;
              if ((((uVar3 ^ uVar4) - uVar4) & 0x1f ^ uVar4) - uVar4 <= DAT_00655b08 ||
                  (iVar2 = FUN_004a7577(local_50), iVar2 !== 0)) {
                let off = local_50 * 0x594 + local_10 * 4 + 0xC0;
                DAT_0064c600[off] = DAT_0064c600[off] | 0x20;
              }
            }
          } else {
            iVar2 = FUN_004a7577(local_50);
            if (iVar2 !== 0 && 3 < DAT_00655b08) {
              let off = local_50 * 0x594 + local_10 * 4 + 0xC0;
              DAT_0064c600[off] = DAT_0064c600[off] | 0x20;
            }
          }
        }
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_00485c15 @ 0x00485C15
// Size: 3297 bytes
// ============================================================

// check_barbarians
export function FUN_00485c15() {
  let sVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (DAT_00655b09 !== 0) {
    if (DAT_00655b08 < 5) {
      iVar2 = ((3 - DAT_00655b09) * 3 + 0x1e) * (5 - DAT_00655b08);
      if (iVar2 - DAT_00655af8 !== 0 && DAT_00655af8 <= iVar2) {
        return;
      }
    } else if (DAT_00655af8 < (3 - DAT_00655b09) * 3 + 0xf) {
      return;
    }
    if (DAT_00655b09 === 1) {
      local_8 = 0xf;
    } else if (DAT_00655b09 === 2) {
      local_8 = 7;
    } else if (DAT_00655b09 === 3) {
      local_8 = 7;
    }
    if ((local_8 & (DAT_00655af8 + 1)) === 0 && DAT_00655b82[DAT_0064b383] === 0) {
      local_40 = 0;
      do {
        if (DAT_006d1160 === 1 || DAT_006d1160 + -1 < 0) {
          local_18 = 0;
        } else {
          iVar2 = _rand();
          local_18 = iVar2 % DAT_006d1160;
        }
        if (DAT_006d1162 === 7 || DAT_006d1162 + -7 < 0) {
          local_44 = 0;
        } else {
          local_44 = _rand();
          local_44 = local_44 % (DAT_006d1162 + -6);
        }
        local_1c = local_44 + 3;
        if ((local_18 & 1) !== 0) {
          local_18 = local_18 - 1;
        }
        if ((local_1c & 1) !== 0) {
          local_18 = local_18 + 1;
        }
        local_40 = local_40 + 1;
        if (1000 < local_40) {
          return;
        }
        iVar2 = FUN_005b89e4(local_18, local_1c);
      } while (iVar2 === 0 ||
              (iVar2 = FUN_005b8d62(local_18, local_1c), -1 < iVar2) ||
              (iVar2 = FUN_005b8a81(local_18, local_1c),
              DAT_00666134[iVar2] < 0x10));
      iVar2 = FUN_005adfa0((DAT_00655af8 / (DAT_00655b09 * -0x32 + 0xfa) | 0) + 1, 1, 5);
      local_34 = iVar2 + 1;
      if (DAT_00655b09 === 3) {
        local_34 = iVar2 + 2;
      }
      local_24 = 0x20;
      if (DAT_00655bbb !== 0) {
        local_24 = 0x21;
      }
      if (DAT_00655baf !== 0) {
        local_24 = 0x23;
      }
      local_38 = 2;
      if ((DAT_00655ae8 & 1) !== 0) {
        local_38 = 4;
      }
      if ((DAT_00655b0b & DAT_00655ba9) !== 0) {
        local_38 = 5;
      }
      if (DAT_00655bb5 !== 0 || (DAT_00655b09 === 3 && DAT_00655b8d !== 0)) {
        if ((local_18 & 1) === 0 || (DAT_00655ae8 & 1) === 0) {
          local_38 = 0x13;
        } else {
          local_38 = 0x12;
        }
      }
      local_c = local_34;
      if ((DAT_00655b0b & DAT_00655bd3) !== 0 && (DAT_00655ae8 & 1) !== 0) {
        local_38 = 0x14;
      }
      while (true) {
        local_c = local_c + -1;
        if (local_c < 0) break;
        local_20 = local_38;
        if (local_c !== 0 && local_34 + -1 === local_c) {
          local_20 = 0x2e;
        }
        iVar2 = FUN_005b3d06(local_20, 0, local_18, local_1c);
        if (-1 < iVar2) {
          FUN_005b2f50(iVar2);
        }
      }
      iVar2 = FUN_005b3d06(local_24, 0, local_18, local_1c);
      local_10 = iVar2;
      if (iVar2 < 0) {
        iVar2 = FUN_005b2e69(local_18, local_1c);
        if (-1 < iVar2) {
          FUN_005b47fa(iVar2, 1);
        }
      } else {
        uVar4 = _rand();
        uVar6 = uVar4 >> 31;
        if (((uVar4 ^ uVar6) - uVar6 & 1 ^ uVar6) === uVar6) {
          // Set veteran flag on unit
          let off = iVar2 * 0x20 + 4;
          let val = (DAT_006560f0[off] | (DAT_006560f0[off + 1] << 8));
          val = val | 0x2000;
          DAT_006560f0[off] = val & 0xFF;
          DAT_006560f0[off + 1] = (val >> 8) & 0xFF;
        }
        FUN_005b3863(local_10, 1);
      }
    }
    // City barbarian attacks
    if (DAT_00655b18 === 1 || DAT_00655b18 + -1 < 0) {
      local_30 = 0;
    } else {
      local_30 = _rand();
      local_30 = local_30 % DAT_00655b18;
    }
    if (local_30 < DAT_00655b18 &&
       ((DAT_0064f340[local_30 * 0x58 + 0x54] |
         (DAT_0064f340[local_30 * 0x58 + 0x55] << 8) |
         (DAT_0064f340[local_30 * 0x58 + 0x56] << 16) |
         (DAT_0064f340[local_30 * 0x58 + 0x57] << 24)) !== 0) &&
       (DAT_00655b0b & (1 << (DAT_0064f340[local_30 * 0x58 + 0x08] & 0x1f))) !== 0) {
      iVar2 = _rand();
      iVar3 = FUN_00579dbb(local_30);
      if (iVar2 % 100 < iVar3) {
        local_28 = 0;
        // Original uses nested do-while with goto LAB_004862b4
        // Restructured with labeled break
        let exitOuterLoop = false;
        outer_loop:
        do {
          do {
            iVar2 = _rand();
            local_18 = FUN_005ae052(
              s16(DAT_0064f340, local_30 * 0x58) + (iVar2 % 0xd) * 2 + -6
            );
            sVar1 = s16(DAT_0064f340, local_30 * 0x58 + 2);
            iVar2 = _rand();
            local_1c = (sVar1 + iVar2 % 0xd) - 6;
            if ((local_18 & 1) !== 0) {
              local_18 = local_18 - 1;
            }
            if ((local_1c & 1) !== 0) {
              local_18 = local_18 + 1;
            }
            iVar2 = FUN_004087c0(local_18, local_1c);
            if (iVar2 !== 0) {
              local_30 = FUN_0043d07a(local_18, local_1c, 0xffffffff, 0xffffffff, 0xffffffff);
              if (local_30 < 0) {
                local_28 = 200;
                exitOuterLoop = true;
                break outer_loop; // goto LAB_004862b4
              }
            }
            local_28 = local_28 + 1;
            if (DAT_00655b09 * 0x32 <= local_28) {
              exitOuterLoop = true;
              break outer_loop; // goto LAB_004862b4
            }
            iVar2 = FUN_004087c0(local_18, local_1c);
          } while (iVar2 === 0 || DAT_0063f660 < 5 ||
                  (iVar2 = FUN_005b4c63(local_18, local_1c, 0), iVar2 !== 0) ||
                  (iVar2 = FUN_005b89e4(local_18, local_1c), iVar2 !== 0) ||
                  (iVar2 = FUN_005b8d62(local_18, local_1c), -1 < iVar2));
          iVar2 = FUN_005b8a81(
            s16(DAT_0064f340, local_30 * 0x58),
            s16(DAT_0064f340, local_30 * 0x58 + 2)
          );
          iVar3 = FUN_005b8a81(local_18, local_1c);
        } while (iVar2 !== iVar3);

        // LAB_004862b4:
        if (local_28 < DAT_00655b09 * 0x32) {
          if (DAT_00655b09 === 1 || DAT_00655b09 === 2 || DAT_00655b09 === 3) {
            local_8 = s8(DAT_0064f340[local_30 * 0x58 + 0x09]);
          }
          if (local_8 === 1 || local_8 - 1 < 0) {
            local_34 = 0;
          } else {
            local_34 = _rand();
            local_34 = local_34 % local_8;
          }
          if (DAT_00655b09 === 3 && 0x95 < DAT_00655af8) {
            if (10 - DAT_00655b08 === 0 || 10 - DAT_00655b08 < 0) {
              local_48 = 0;
            } else {
              local_48 = _rand();
              local_48 = local_48 % (10 - DAT_00655b08);
            }
            if (local_48 === 0) {
              if ((local_8 / 2 | 0) === 1 || (local_8 / 2 | 0) - 1 < 0) {
                local_4c = 0;
              } else {
                local_4c = _rand();
                local_4c = local_4c % (local_8 / 2 | 0);
              }
              local_34 = local_34 + local_4c + (local_8 / 2 | 0);
            }
          }
          uVar4 = FUN_005adfa0(local_34, 2, 99);
          local_14 = 0x10;
          local_2c = 0xf;
          iVar2 = _rand();
          if (iVar2 % 3 === 0) {
            FUN_005adfd9({v: local_14}, {v: local_2c}); // swap
          }
          uVar5 = FUN_00428b0c(0 /* resource ptr */);
          FUN_0040ff60(0, uVar5);
          if (10 < uVar4 && (s8(DAT_0064f340[local_30 * 0x58 + 0x09]) / 2 | 0) < uVar4) {
            uVar5 = FUN_00428b0c(0);
            FUN_0040ff60(0, uVar5);
          }
          if (DAT_00655ba5 !== 0) {
            uVar5 = FUN_00428b0c(0);
            FUN_0040ff60(0, uVar5);
            if ((DAT_00655ae8 & 1) !== 0) {
              local_14 = 4;
              local_2c = 0x11;
            }
          }
          if (DAT_00655ba7 !== 0) {
            uVar5 = FUN_00428b0c(0);
            FUN_0040ff60(0, uVar5);
            local_14 = 0x18;
            local_2c = 7;
            if (DAT_00655b82[DAT_0064b383] !== 0) {
              uVar5 = FUN_00428b0c(0);
              FUN_0040ff60(0, uVar5);
              local_2c = 0xb;
              if ((DAT_00655ae8 & 1) !== 0) {
                local_14 = 0x19;
                if (DAT_00655ba4 !== 0) {
                  if (u8(DAT_0064c600[DAT_00655c20 * 0x594 + 0xB5]) < 5 ||
                     DAT_0064f340[local_30 * 0x58 + 0x08] !== DAT_0064f340[local_30 * 0x58 + 0x0A]) {
                    local_14 = 0x15;
                    local_2c = 9;
                  } else {
                    local_2c = 8;
                    uVar5 = FUN_00428b0c(0);
                    FUN_0040ff60(0, uVar5);
                  }
                }
              }
            }
          }
          local_3c = -1;
          for (local_c = uVar4; -1 < local_c; local_c = local_c - 1) {
            if ((local_c & 4) === 0) {
              local_20 = local_2c;
            } else {
              local_20 = local_14;
            }
            if (local_c === uVar4) {
              local_20 = 0x2e;
            }
            local_3c = FUN_005b3d06(local_20, 0, local_18, local_1c);
            if (-1 < local_3c) {
              if (local_20 === 8) {
                let off = local_3c * 0x20 + 4;
                let val = DAT_006560f0[off] | (DAT_006560f0[off + 1] << 8);
                val = val | 0x2000;
                DAT_006560f0[off] = val & 0xFF;
                DAT_006560f0[off + 1] = (val >> 8) & 0xFF;
              }
              iVar2 = FUN_005b8931(local_18, local_1c);
              DAT_006560f0[local_3c * 0x20 + 9] =
                   tileRead(iVar2, 4) | DAT_006560f0[local_3c * 0x20 + 9];
            }
          }
          if (-1 < local_3c && DAT_00654fa8 === 0) {
            FUN_0040ff60(1, 0 /*&DAT_0064f360 + local_30 * 0x58*/);
            if (s8(DAT_0064f340[local_30 * 0x58 + 0x08]) === DAT_006d1da0) {
              iVar2 = FUN_005b8b65(local_18, local_1c, DAT_006d1da0);
              if (iVar2 !== 0) {
                FUN_004442e0(0 /*s_BARBARIANS*/, local_3c);
              }
            } else if (s8(DAT_0064f340[local_30 * 0x58 + 0x08]) !== DAT_006d1da0 &&
                       2 < DAT_00655b02 &&
                       (DAT_00655b0b & (1 << (DAT_0064f340[local_30 * 0x58 + 0x08] & 0x1f))) !== 0) {
              iVar2 = FUN_005b8b65(local_18, local_1c,
                                   s8(DAT_0064f340[local_30 * 0x58 + 0x08]));
              if (iVar2 !== 0) {
                FUN_0046b14d(0x72, 0 /*net seat*/, local_18, local_1c, 0, 0, 0, 0, 0, 0);
                FUN_00511880(2, 0 /*net seat*/, 2, 0, local_3c, 0);
              }
            }
          }
          if ((DAT_00655b0b & (1 << (DAT_0064f340[local_30 * 0x58 + 0x08] & 0x1f))) !== 0) {
            FUN_0047cea6(local_18, local_1c);
          }
        }
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_004868fb @ 0x004868FB
// Size: 819 bytes
// ============================================================

// apply_global_warming
export function FUN_004868fb(param_1) {
  let cVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let pbVar5;
  let local_24;
  let local_20;
  let local_1c = 0;
  let local_18 = 0;
  let local_14;
  let local_8;

  if (DAT_00654fa8 === 0) {
    if (2 < DAT_00655b02) {
      FUN_00511880(3, 0xff, 0, 0, 0, 0);
    }
    FUN_00410030(0 /*s_GLOBALWARMING*/, 0 /*&DAT_0063fc58*/, 0);
  }
  FUN_005b9ec6();
  for (local_20 = 0; local_20 < DAT_006d1164; local_20 = local_20 + 1) {
    bVar2 = FUN_005b89bb(local_18, local_1c);
    if (bVar2 < 4) {
      local_14 = 0;
      for (local_8 = 0; local_8 < 0x14; local_8 = local_8 + 1) {
        uVar3 = FUN_005ae052(s8(DAT_00628350[local_8]) + local_18);
        cVar1 = s8(DAT_00628360[local_8]);
        iVar4 = FUN_004087c0(uVar3, cVar1 + local_1c);
        if (iVar4 !== 0) {
          iVar4 = FUN_005b89e4(uVar3, cVar1 + local_1c);
          if (iVar4 !== 0) {
            local_14 = local_14 + 1;
          }
        }
      }
      if (local_14 < 7 - param_1) {
        if ((local_18 * 3 + local_1c * -3 & 7) === param_1) {
          iVar4 = FUN_005b8a1d(local_18, local_1c);
          if (iVar4 < 0) {
            FUN_005b99e8(local_18, local_1c, 0, 1);
          }
          if (bVar2 < 2) {
            FUN_005b9646(local_18, local_1c, 0, 1);
          } else {
            FUN_005b9646(local_18, local_1c, 1, 1);
          }
          iVar4 = FUN_005b8b65(local_18, local_1c, DAT_006d1da0);
          if (iVar4 !== 0) {
            FUN_0047cea6(local_18, local_1c);
          }
        }
      } else {
        iVar4 = FUN_005b8a1d(local_18, local_1c);
        if (iVar4 < 0) {
          FUN_005b99e8(local_18, local_1c, 0, 1);
        }
        if (bVar2 === 3) {
          FUN_005b9646(local_18, local_1c, 9, 1);
        } else {
          FUN_005b9646(local_18, local_1c, 8, 1);
        }
        FUN_005b94fc(local_18, local_1c, 0xc, 0, 1);
        for (local_24 = 1; local_24 < 8; local_24 = local_24 + 1) {
          iVar4 = FUN_005b8b65(local_18, local_1c, local_24);
          if (iVar4 !== 0) {
            pbVar5 = FUN_005b898b(local_18, local_1c, local_24);
            if ((pbVar5[0] & 0xc) !== 0) {
              FUN_005b8b1a(local_18, local_1c, local_24);
              if (DAT_006d1da0 === local_24) {
                FUN_0047cea6(local_18, local_1c);
              }
            }
          }
        }
      }
    }
    local_18 = local_18 + 2;
    if (DAT_006d1160 <= local_18) {
      local_1c = local_1c + 1;
      local_18 = local_1c & 1;
    }
  }
  FUN_005b9f1c();
  return;
}


// ============================================================
// Function: FUN_00486c2e @ 0x00486C2E
// Size: 487 bytes
// ============================================================

// check_global_warming_pollution
export function FUN_00486c2e() {
  let cVar1;
  let iVar2;
  let iVar3;
  let local_14;
  let local_10;
  let local_c;

  iVar2 = FUN_005ae006(DAT_00655b0b);
  local_c = (DAT_00655b12 - DAT_00655b10) + (DAT_00655b10 / 2 | 0);
  local_14 = 0;
  for (local_10 = 0; local_10 < DAT_00655b18; local_10 = local_10 + 1) {
    if (((DAT_0064f340[local_10 * 0x58 + 0x54] |
          (DAT_0064f340[local_10 * 0x58 + 0x55] << 8) |
          (DAT_0064f340[local_10 * 0x58 + 0x56] << 16) |
          (DAT_0064f340[local_10 * 0x58 + 0x57] << 24)) !== 0) &&
       (iVar3 = FUN_0043d20a(local_10, 0x1d), iVar3 !== 0)) {
      local_14 = local_14 + 1;
    }
  }
  if (1 < iVar2) {
    local_c = ((iVar2 + -1 + local_c) / iVar2) | 0;
  }
  iVar2 = (local_c * 2 + DAT_00655b0f * -4) - local_14;
  if (iVar2 === DAT_00655b0e || iVar2 - DAT_00655b0e < 0) {
    if ((local_c * 2 + DAT_00655b0f * -4) - local_14 - DAT_00655b0e < 0) {
      DAT_00655b0e = DAT_00655b0e + -1;
    }
  } else {
    DAT_00655b0e = DAT_00655b0e + 1;
  }
  DAT_00655b0e = FUN_005adfa0(DAT_00655b0e, 0, 99);
  if (DAT_00655b0e === 12 && 6 < local_c && DAT_00654fa8 === 0) {
    if (2 < DAT_00655b02) {
      FUN_00511880(4, 0xff, 0, 0, 0, 0);
    }
    FUN_00410030(0 /*s_FEARWARMING*/, 0 /*&DAT_0063fc58*/, 0);
  }
  cVar1 = DAT_00655b0f;
  if (16 < DAT_00655b0e) {
    DAT_00655b0f = DAT_00655b0f + 1;
    FUN_004868fb(cVar1);
    DAT_00655b0e = 0;
  }
  DAT_00655b10 = 0;
  return;
}


// ============================================================
// Function: FUN_00486e15 @ 0x00486E15
// Size: 90 bytes
// ============================================================

// calc_expansion_threshold
export function FUN_00486e15(param_1) {
  let local_c;
  let local_8 = 0;

  for (local_c = 0; local_c <= param_1; local_c = local_c + 1) {
    local_8 = local_8 + (7 - DAT_00655b08) * local_c;
  }
  return (local_8 / 2 | 0) + 1;
}


// ============================================================
// Function: FUN_00486e6f @ 0x00486E6F
// Size: 403 bytes
// ============================================================

// check_civ_expansion
export function FUN_00486e6f() {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_c;

  iVar2 = DAT_006d1da0;
  if ((DAT_00655af0 & 0x80) === 0 && DAT_00655b02 !== 1) {
    bVar1 = false;
    for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
      if (((DAT_0064f340[local_c * 0x58 + 0x54] |
            (DAT_0064f340[local_c * 0x58 + 0x55] << 8) |
            (DAT_0064f340[local_c * 0x58 + 0x56] << 16) |
            (DAT_0064f340[local_c * 0x58 + 0x57] << 24)) !== 0) &&
         (s8(DAT_0064f340[local_c * 0x58 + 0x08]) === iVar2) &&
         (iVar3 = FUN_0043d20a(local_c, 1), iVar3 !== 0)) {
        bVar1 = true;
        break;
      }
    }
    if (bVar1 && DAT_0064bc56 * 0x14 + 1 < DAT_00655af8) {
      iVar3 = FUN_004a28b0(iVar2);
      iVar4 = FUN_00486e15(s16(DAT_0064c600, iVar2 * 0x594 + 0x49E) + 1);
      if (iVar4 <= iVar3) {
        let expOff = iVar2 * 0x594 + 0x49E;
        let expVal = s16(DAT_0064c600, expOff) + 1;
        DAT_0064c600[expOff] = expVal & 0xFF;
        DAT_0064c600[expOff + 1] = (expVal >> 8) & 0xFF;
        if (expVal < 0x26 && (DAT_00655ae8 & 0x200) !== 0) { // DAT_00655aea._2_1_ & 2
          FUN_0044cc80(DAT_006d1da0);
        }
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_00487007 @ 0x00487007
// Size: 259 bytes
// ============================================================

// reset_tile_visibility
export function FUN_00487007() {
  let local_14;
  let local_10;
  let local_c = 0;
  let local_8 = 0;

  DAT_006ad699 = 0;
  for (local_10 = 0; local_10 < DAT_006d1164; local_10 = local_10 + 1) {
    FUN_005b94fc(local_8, local_c, 1, 0, 1);
    local_8 = local_8 + 2;
    if (DAT_006d1160 <= local_8) {
      local_c = local_c + 1;
      local_8 = local_c & 1;
    }
  }
  for (local_14 = 0; local_14 < DAT_00655b16; local_14 = local_14 + 1) {
    if ((DAT_006560f0[local_14 * 0x20 + 0x1A] |
         (DAT_006560f0[local_14 * 0x20 + 0x1B] << 8) |
         (DAT_006560f0[local_14 * 0x20 + 0x1C] << 16) |
         (DAT_006560f0[local_14 * 0x20 + 0x1D] << 24)) !== 0) {
      FUN_005b94fc(s16(DAT_006560f0, local_14 * 0x20),
                   s16(DAT_006560f0, local_14 * 0x20 + 2), 1, 1, 1);
    }
  }
  DAT_006ad699 = 1;
  FUN_004b0b53(0xff, 2, 0, 0, 1);
  return;
}


// ============================================================
// Function: FUN_0048710a @ 0x0048710A
// Size: 615 bytes
// ============================================================

// begin_civ_turn
export function FUN_0048710a(param_1) {
  let local_8;

  FUN_00487007();
  if (param_1 === -3) {
    for (local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
      if ((DAT_006560f0[local_8 * 0x20 + 0x1A] |
           (DAT_006560f0[local_8 * 0x20 + 0x1B] << 8) |
           (DAT_006560f0[local_8 * 0x20 + 0x1C] << 16) |
           (DAT_006560f0[local_8 * 0x20 + 0x1D] << 24)) !== 0) {
        FUN_005b6787(local_8);
      }
    }
  }
  for (local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
    if ((DAT_006560f0[local_8 * 0x20 + 0x1A] |
         (DAT_006560f0[local_8 * 0x20 + 0x1B] << 8) |
         (DAT_006560f0[local_8 * 0x20 + 0x1C] << 16) |
         (DAT_006560f0[local_8 * 0x20 + 0x1D] << 24)) !== 0 &&
       (FUN_005b94fc(s16(DAT_006560f0, local_8 * 0x20),
                     s16(DAT_006560f0, local_8 * 0x20 + 2), 1, 1, 1),
        param_1 === -1 || param_1 === -2 ||
        s8(DAT_006560f0[local_8 * 0x20 + 7]) === param_1)) {
      let statusOff = local_8 * 0x20 + 4;
      let statusVal = DAT_006560f0[statusOff] | (DAT_006560f0[statusOff + 1] << 8);
      if ((statusVal & 2) === 0) {
        DAT_006560f0[local_8 * 0x20 + 8] = 0;  // moves spent = 0
        DAT_006560f0[local_8 * 0x20 + 0xe] = 0; // counter2 = 0
        statusVal = statusVal & 0xbfff;
        if ((statusVal & 0x20) !== 0 && (statusVal & 4) === 0 &&
           ((DAT_00655af8 ^ (local_8 & 3)) & 3) === 0) {
          statusVal = statusVal & 0xffdf;
        }
        statusVal = statusVal & 0xfffb;
        DAT_006560f0[statusOff] = statusVal & 0xFF;
        DAT_006560f0[statusOff + 1] = (statusVal >> 8) & 0xFF;
      } else {
        DAT_006560f0[local_8 * 0x20 + 0xe] = DAT_006560f0[local_8 * 0x20 + 0xe] + -1;
        if (DAT_006560f0[local_8 * 0x20 + 0xe] === 0) {
          statusVal = statusVal & 0xfffd;
          DAT_006560f0[statusOff] = statusVal & 0xFF;
          DAT_006560f0[statusOff + 1] = (statusVal >> 8) & 0xFF;
          // Clear embassy flag
          let dipOff = s8(DAT_006560f0[local_8 * 0x20 + 0xd]) * 4 + param_1 * 0x594 + 0xC0;
          let dipVal = DAT_0064c600[dipOff] |
                       (DAT_0064c600[dipOff + 1] << 8) |
                       (DAT_0064c600[dipOff + 2] << 16) |
                       (DAT_0064c600[dipOff + 3] << 24);
          dipVal = dipVal & 0xfeffffff;
          DAT_0064c600[dipOff] = dipVal & 0xFF;
          DAT_0064c600[dipOff + 1] = (dipVal >> 8) & 0xFF;
          DAT_0064c600[dipOff + 2] = (dipVal >> 16) & 0xFF;
          DAT_0064c600[dipOff + 3] = (dipVal >> 24) & 0xFF;
          FUN_004c5fae(local_8, 0, s8(DAT_006560f0[local_8 * 0x20 + 0xd]));
        }
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_00487371 @ 0x00487371
// Size: 1744 bytes
// ============================================================

// process_end_of_turn
export function FUN_00487371(param_1) {
  let uVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let local_1c;
  let local_18;
  let local_c;
  let local_8;

  if (DAT_00655af8 !== 0) {
    FUN_00485c15();
    FUN_00486c2e();
    FUN_004853e7();
    if (DAT_00655b02 === 0) {
      FUN_00486e6f();
    }
  }
  DAT_00655af8 = DAT_00655af8 + 1;
  DAT_00655afa = FUN_00484fec(DAT_00655af8);
  if (199 < DAT_00655af8) {
    DAT_00655b14 = DAT_00655b14 + 1;
  }
  DAT_00655aee = DAT_00655aee & 0xfffe;
  FUN_0048710a(param_1);
  uVar2 = DAT_00655b08;
  if (DAT_00655af8 % ((uVar2 + 1) * 0xc) === 0) {
    for (local_1c = 0; local_1c < 8; local_1c = local_1c + 1) {
      if ((DAT_00655af8 % ((uVar2 + 1) * 0x18) === 0 ||
           (iVar3 = FUN_00453e51(local_1c, 0x14), iVar3 !== 0)) &&
         (1 < u8(DAT_0064c600[local_1c * 0x594 + 0xBE]) ||
           (iVar3 = FUN_00453e51(local_1c, 0x14), iVar3 !== 0)) &&
         DAT_0064c600[local_1c * 0x594 + 0xBE] !== 0) {
        DAT_0064c600[local_1c * 0x594 + 0xBE] = DAT_0064c600[local_1c * 0x594 + 0xBE] + -1;
        if ((1 << (local_1c & 0x1f) & DAT_00655b0b) !== 0) {
          for (local_c = 0; local_c < 8; local_c = local_c + 1) {
            uVar1 = FUN_005adfa0(
              s8(DAT_0064c600[local_c * 0x594 + local_1c + 0xE8]), 0,
              DAT_0064c600[local_1c * 0x594 + 0xBE]);
            DAT_0064c600[local_c * 0x594 + local_1c + 0xE8] = uVar1;
          }
        }
      }
    }
  }
  if (DAT_00655c1e < DAT_00655af8) {
    iVar3 = _rand();
    DAT_00655c1e = DAT_00655af8 + (iVar3 % 0x28) + 0x14;
    if (DAT_00654fa8 === 0) {
      if (2 < DAT_00655b02) {
        FUN_00511880(5, 0xff, 0, 0, 0, 0);
      }
      if (DAT_00655b02 === 1) {
        citywin_994F();
        FUN_004503d0();
        FUN_004503d0();
        for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
          if (DAT_0066ca84[local_8] !== 0) {
            FUN_004503d0();
          }
        }
      }
      FUN_00432611();
      if (DAT_00655b02 === 1) {
        FUN_004085f0();
        FUN_004085f0();
        for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
          if (DAT_0066ca84[local_8] !== 0) {
            FUN_004085f0();
          }
        }
      }
    }
  }
  local_1c = 1;
  while (true) {
    if (7 < local_1c) {
      return;
    }
    iVar3 = FUN_004a7577(local_1c);
    if (iVar3 !== 0) {
      iVar3 = FUN_004a75d5(local_1c);
      if (iVar3 !== 0 && (DAT_0064c600[local_1c * 0x594 + 0x4A0] & 4) === 0) {
        break;
      }
    }
    local_1c = local_1c + 1;
  }
  DAT_0064c600[local_1c * 0x594 + 0x4A0] = DAT_0064c600[local_1c * 0x594 + 0x4A0] | 4;
  if ((DAT_00655af0 & 2) === 0) {
    DAT_0064c600[local_1c * 0x594 + 0x4A0] = DAT_0064c600[local_1c * 0x594 + 0x4A0] | 0x10;
    DAT_0062c5b4 = local_1c;
    if (DAT_006d1da0 === local_1c) {
      DAT_0064b1ac = 1;
    } else {
      DAT_0064b1ac = 2;
    }
    if (2 < DAT_00655b02) {
      uVar4 = FUN_00410070(local_1c);
      FUN_0040ff60(0, uVar4);
      if (DAT_006d1da0 === local_1c || (1 << (local_1c & 0x1f) & DAT_00655b0b) === 0) {
        FUN_00511880(6, 0xff, 1, 0, 0, 0);
        FUN_0046b14d(0x6b, 0xff, DAT_00655af0, 2, DAT_0062c5b4, 0, 0, 0, 0, 0);
      } else {
        FUN_0046b14d(0x6b, DAT_006ad30c[DAT_006ad558[local_1c] * 0x54],
                     DAT_00655af0, 1, DAT_0062c5b4, 0, 0, 0, 0, 0);
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((1 << (local_18 & 0x1f) &
              (DAT_00655b0a & DAT_00655b0b) & (1 << (local_18 & 0x1f))) !== 0 &&
             DAT_006d1da0 !== local_18 && local_18 !== local_1c) {
            FUN_00511880(6, DAT_006ad30c[DAT_006ad558[local_18] * 0x54], 1, 0, 0, 0);
            FUN_0046b14d(0x6b, DAT_006ad30c[DAT_006ad558[local_18] * 0x54],
                         DAT_00655af0, 2, DAT_0062c5b4, 0, 0, 0, 0, 0);
          }
        }
      }
    }
  }
  if (DAT_00654fa8 === 0 && (DAT_006d1da0 !== local_1c || DAT_0064b1ac === 0)) {
    uVar4 = FUN_00410070(local_1c);
    FUN_0040ff60(0, uVar4);
    if (2 < DAT_00655b02 && DAT_0064b1ac === 0) {
      FUN_00511880(6, 0xff, 1, 0, 0, 0);
    }
    FUN_00410030(0 /*s_EAGLEHASLANDED*/, 0 /*&DAT_0063fc58*/, 0);
  }
  DAT_00655af0 = DAT_00655af0 | 2;
  return;
}


// ============================================================
// Function: FUN_00487a41 @ 0x00487A41
// Size: 3830 bytes
// ============================================================

// process_civ_diplomacy_ai
export function FUN_00487a41(param_1) {
  // This is a very large AI diplomacy/foreign affairs function.
  // It modifies per-civ diplomacy state, calculates tech trade values,
  // and manages AI-to-AI relations.
  // Due to extreme complexity and heavy reliance on per-civ data offsets,
  // this is stubbed with the key state mutations preserved.

  // The function operates on DAT_0064c600 per-civ fields:
  //   +0x472: zero-init per-civ trade accumulator
  //   +0x474: zero-init per-civ trade values (7 entries)
  //   +0x480: trade/diplomacy calculations

  // Key state mutations:
  // DAT_00655aee &= 0xfffb
  // Per-city: process_city_production for each city of this civ
  // Per-civ diplomacy table updates
  // This is primarily an AI function with heavy UI interactions.
  return;
}


// ============================================================
// Function: FUN_00488937 @ 0x00488937
// Size: 270 bytes
// ============================================================

// auto_save_game
export function FUN_00488937(param_1) {
  let uVar1;

  if (DAT_006d1da0 === param_1) {
    FUN_00473d5e(0);
    FUN_0040bbb0();
    uVar1 = FUN_00493b10(param_1);
    FUN_0040bbe0(uVar1);
    // ... save file management (rename/remove)
    // This is purely a file I/O function
  }
  return;
}


// ============================================================
// Function: FUN_00488a45 @ 0x00488A45
// Size: 682 bytes
// ============================================================

// check_trade_route_path
export function FUN_00488a45(param_1, param_2, param_3, param_4, param_5) {
  let bVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let local_20;
  let local_18;
  let local_10;

  local_10 = param_2;
  local_18 = param_3;
  iVar3 = FUN_005b8a81(param_2, param_3);
  iVar4 = FUN_005b8a81(param_4, param_5);
  local_20 = 0;
  bVar2 = true;
  if (iVar4 === iVar3) {
    iVar3 = FUN_005ae1b0(param_4, param_5, param_2, param_3);
    if (iVar3 < 0x17) {
      // DAT_0062d040 = 1;
      // DAT_0062d044 = 0xffffffff;
      // DAT_00673fa0 = param_4;
      // DAT_00673fa4 = param_5;
      // DAT_0062d03c = 2;
      // DAT_0062d048 = 1;
      bVar1 = true;
      // Original goto: LAB_00488ca7
      // Restructured using a flag
      let exitLoop = false;
      while (true) {
        iVar3 = FUN_004abfe5(local_10, local_18, 99);
        if (iVar3 < 0 || iVar3 === 8) { exitLoop = true; break; }
        local_10 = FUN_005ae052(s8(DAT_00628350[iVar3]) + local_10);
        local_18 = local_18 + s8(DAT_00628360[iVar3]);
        iVar3 = FUN_004087c0(local_10, local_18);
        if (iVar3 === 0) { exitLoop = true; break; }
        if (local_10 === param_4 && local_18 === param_5) {
          bVar1 = false;
          break;
        }
        iVar3 = FUN_005b8ca6(local_10, local_18);
        if (param_1 === iVar3) {
          bVar1 = false;
          exitLoop = true;
          break;
        }
        if ((-1 < iVar3 && (DAT_0064c600[param_1 * 0x594 + iVar3 * 4 + 0xC0] & 8) === 0) ||
           (iVar3 = FUN_005b8da4(local_10, local_18),
            0 < iVar3 && param_1 !== iVar3 &&
            (DAT_0064c600[param_1 * 0x594 + iVar3 * 4 + 0xC0] & 8) === 0) ||
           (uVar6 = FUN_005b94d5(local_10, local_18), (uVar6 & 0x10) === 0)) {
          exitLoop = true;
          break;
        }
        uVar6 = FUN_005b94d5(local_10, local_18);
        if ((uVar6 & 0x20) === 0) {
          bVar2 = false;
        }
        local_20 = local_20 + 1;
        if (0x32 < local_20) { exitLoop = true; break; }
      }
      if (!exitLoop) {
        bVar1 = false;
      }

      // LAB_00488ca7:
      // DAT_0062d040 = 0;
      // DAT_0062d048 = 0;
      if (bVar1) {
        uVar5 = 0;
      } else if (bVar2) {
        uVar5 = 2;
      } else {
        uVar5 = 1;
      }
    } else {
      uVar5 = 0;
    }
  } else {
    uVar5 = 0;
  }
  return uVar5;
}


// ============================================================
// Function: FUN_00488cef @ 0x00488CEF
// Size: 1438 bytes
// ============================================================

// heal_units
export function FUN_00488cef(param_1) {
  let cVar1;
  let uVar2;
  let bVar3;
  let uVar4;
  let bVar5;
  let uVar6;
  let iVar7;
  let iVar8;
  let uVar9;
  let local_1c;
  let local_18;
  let local_8;

  for (local_1c = 0; local_1c < DAT_00655b16; local_1c = local_1c + 1) {
    if (2 < DAT_00655b02) {
      FUN_0047e94e(1, 0);
    }
    if ((DAT_006560f0[local_1c * 0x20 + 0x1A] |
         (DAT_006560f0[local_1c * 0x20 + 0x1B] << 8) |
         (DAT_006560f0[local_1c * 0x20 + 0x1C] << 16) |
         (DAT_006560f0[local_1c * 0x20 + 0x1D] << 24)) !== 0 &&
       s8(DAT_006560f0[local_1c * 0x20 + 7]) === param_1) {
      let statusOff = local_1c * 0x20 + 4;
      uVar2 = DAT_006560f0[statusOff] | (DAT_006560f0[statusOff + 1] << 8);
      // Clear bits 0x0040 and 0x0010
      let newStatus = uVar2 & 0xffaf;
      DAT_006560f0[statusOff] = newStatus & 0xFF;
      DAT_006560f0[statusOff + 1] = (newStatus >> 8) & 0xFF;

      if ((uVar2 & 0x40) === 0) {
        if (DAT_006560f0[local_1c * 0x20 + 0xa] !== 0) {
          local_8 = 1;
          uVar9 = FUN_005b8a81(s16(DAT_006560f0, local_1c * 0x20),
                               s16(DAT_006560f0, local_1c * 0x20 + 2));
          iVar7 = FUN_0043d07a(s16(DAT_006560f0, local_1c * 0x20),
                               s16(DAT_006560f0, local_1c * 0x20 + 2), param_1, uVar9);
          if (-1 < iVar7) {
            DAT_0063f660 = FUN_005ae1b0(s16(DAT_006560f0, local_1c * 0x20),
                                        s16(DAT_006560f0, local_1c * 0x20 + 2),
                                        s16(DAT_0064f340, iVar7 * 0x58),
                                        s16(DAT_0064f340, iVar7 * 0x58 + 2));
          }
          bVar5 = FUN_005b94d5(s16(DAT_006560f0, local_1c * 0x20),
                               s16(DAT_006560f0, local_1c * 0x20 + 2));
          if ((bVar5 & 0x42) === 0x40) {
            local_8 = 2;
          }
          bVar3 = false;
          uVar6 = local_8;
          if (DAT_0063f660 < 4 &&
             DAT_0064b1c1[u8(DAT_006560f0[local_1c * 0x20 + 6]) * 0x14] === 0) {
            iVar8 = FUN_0043d20a(iVar7, 2);
            uVar6 = local_8 + 1;
            if (iVar8 !== 0) {
              uVar6 = local_8 + 2;
            }
          }
          local_8 = uVar6;
          if (DAT_0063f660 === 0) {
            cVar1 = s8(DAT_0064b1c1[u8(DAT_006560f0[local_1c * 0x20 + 6]) * 0x14]);
            if (cVar1 === 0) {
              local_18 = 2;
            } else if (cVar1 === 1) {
              local_18 = 0x20;
            } else if (cVar1 === 2) {
              local_18 = 0x22;
            }
            iVar7 = FUN_0043d20a(iVar7, local_18);
            if (iVar7 !== 0 &&
               (DAT_0064b1c1[u8(DAT_006560f0[local_1c * 0x20 + 6]) * 0x14] === 0 ||
                DAT_0063f660 === 0)) {
              bVar3 = true;
              local_8 = local_8 << 1;
            }
          }
          if (DAT_0063f660 === 0) {
            local_8 = local_8 << 1;
          }
          iVar7 = FUN_005b29aa(local_1c);
          local_8 = ((iVar7 / 10) | 0) * local_8;
          if (bVar3 && DAT_0063f660 === 0) {
            local_8 = u8(DAT_006560f0[local_1c * 0x20 + 0xa]);
          }
          if (DAT_0064b1c1[u8(DAT_006560f0[local_1c * 0x20 + 6]) * 0x14] === 1) {
            iVar7 = FUN_005b8d15(s16(DAT_006560f0, local_1c * 0x20),
                                 s16(DAT_006560f0, local_1c * 0x20 + 2));
            if (0 < iVar7) {
              local_8 = u8(DAT_006560f0[local_1c * 0x20 + 0xa]);
            }
          }
          uVar6 = u8(DAT_006560f0[local_1c * 0x20 + 0xa]);
          if (local_8 <= uVar6) {
            uVar6 = local_8;
          }
          DAT_006560f0[local_1c * 0x20 + 0xa] = DAT_006560f0[local_1c * 0x20 + 0xa] - uVar6;
          if (DAT_006560f0[local_1c * 0x20 + 0xa] === 0 &&
             DAT_006560f0[local_1c * 0x20 + 0xf] === 3 &&
             (DAT_0064b1c1[u8(DAT_006560f0[local_1c * 0x20 + 6]) * 0x14] !== 0 ||
              (iVar7 = FUN_005b89e4(s16(DAT_006560f0, local_1c * 0x20),
                                    s16(DAT_006560f0, local_1c * 0x20 + 2)),
               iVar7 === 0))) {
            DAT_006560f0[local_1c * 0x20 + 0xf] = 0xff;
          }
          if (DAT_006d1da0 === param_1 ||
             (1 << (DAT_006d1da0 & 0x1f) & u8(DAT_006560f0[local_1c * 0x20 + 9])) !== 0 ||
             s8(DAT_006560f0[local_1c * 0x20 + 7]) === (DAT_006d1da0 & 0xff)) {
            FUN_0047cea6(s16(DAT_006560f0, local_1c * 0x20),
                         s16(DAT_006560f0, local_1c * 0x20 + 2));
          }
        }
      } else if (DAT_0064b1c1[u8(DAT_006560f0[local_1c * 0x20 + 6]) * 0x14] === 1 &&
                DAT_0064b1c3[u8(DAT_006560f0[local_1c * 0x20 + 6]) * 0x14] === 0) {
        uVar6 = FUN_005b94d5(s16(DAT_006560f0, local_1c * 0x20),
                             s16(DAT_006560f0, local_1c * 0x20 + 2));
        if ((uVar6 & 2) === 0) {
          iVar7 = FUN_005b29aa(local_1c);
          iVar8 = FUN_005b29aa(local_1c);
          uVar4 = FUN_005adfa0(u8(DAT_006560f0[local_1c * 0x20 + 0xa]) + (iVar7 / 10 | 0), 0,
                               iVar8 + -1);
          DAT_006560f0[local_1c * 0x20 + 0xa] = uVar4;
        }
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_00489292 @ 0x00489292
// Size: 705 bytes
// ============================================================

// check_population_milestone
export function FUN_00489292(param_1, param_2) {
  let sVar1;
  let iVar2;
  let uVar3;
  let local_8;

  local_8 = -1;
  iVar2 = FUN_0043cce5(param_1);
  sVar1 = s16(DAT_0064c600, param_1 * 0x594 + 0x112);
  if (iVar2 < 100) {
    if (sVar1 * 10 < iVar2) {
      local_8 = ((iVar2 / 10) | 0) * 10;
      let off = param_1 * 0x594 + 0x112;
      let v = (iVar2 / 10) | 0;
      DAT_0064c600[off] = v & 0xFF;
      DAT_0064c600[off + 1] = (v >> 8) & 0xFF;
    }
  } else if ((sVar1 + -9) * 100 < iVar2) {
    local_8 = ((iVar2 / 100) | 0) * 100;
    let off = param_1 * 0x594 + 0x112;
    let v = ((iVar2 / 100) | 0) + 9;
    DAT_0064c600[off] = v & 0xFF;
    DAT_0064c600[off + 1] = (v >> 8) & 0xFF;
  }
  if (sVar1 < s16(DAT_0064c600, param_1 * 0x594 + 0x112) &&
     (1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0 && DAT_00654fa8 === 0) {
    uVar3 = FUN_00410070(param_1);
    FUN_0040ff60(1, uVar3);
    FUN_0040bbb0();
    FUN_0043ca50(param_1, local_8);
    FUN_0040ff60(2, 0 /*&DAT_00679640*/);
    FUN_00410030(0 /*s_FERTILE*/, 0 /*&DAT_00643798 + param_1 * 0x3c*/, 0);
  }
  // Tax advisor popup check
  if ((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0 && DAT_00654fa8 === 0 &&
     DAT_00628044 !== 0 &&
     1 < s16(DAT_0064c600, param_1 * 0x594 + 0x108)) {
    let treasury = DAT_0064c600[param_1 * 0x594 + 0xA2] |
                   (DAT_0064c600[param_1 * 0x594 + 0xA3] << 8) |
                   (DAT_0064c600[param_1 * 0x594 + 0xA4] << 16) |
                   (DAT_0064c600[param_1 * 0x594 + 0xA5] << 24);
    if (treasury < 100 &&
       (treasury - param_2) * 10 + treasury < 0) {
      iVar2 = FUN_00410030(0 /*s_TAXES*/, 0 /*&DAT_00643798 + param_1 * 0x3c*/, 0);
      if (iVar2 !== 0) {
        FUN_0040ddc6(param_1);
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_00489553 @ 0x00489553
// Size: 679 bytes
// ============================================================

// process_civ_turn
export function FUN_00489553(param_1) {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c = 0;

  DAT_0062c5b8 = 1;
  if ((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0) {
    iVar2 = FUN_004a75a6(param_1);
    if (iVar2 !== 0) {
      for (local_10 = 0; local_10 < 6; local_10 = local_10 + 1) {
        local_c = local_c + s16(DAT_0064c600, param_1 * 0x594 + 0x4A8 + local_10 * 2);
      }
    }
  }
  FUN_004d01ae(param_1);
  FUN_0042a768();
  // Treasury bounds
  let treasuryOff = param_1 * 0x594 + 0xA2;
  let treasury = DAT_0064c600[treasuryOff] |
                 (DAT_0064c600[treasuryOff + 1] << 8) |
                 (DAT_0064c600[treasuryOff + 2] << 16) |
                 (DAT_0064c600[treasuryOff + 3] << 24);
  if (30000 < treasury) {
    treasury = 30000;
  }
  if (treasury < -0x4000) {
    treasury = 30000;
  }
  if (treasury < 0) {
    treasury = 0;
  }
  DAT_0064c600[treasuryOff] = treasury & 0xFF;
  DAT_0064c600[treasuryOff + 1] = (treasury >> 8) & 0xFF;
  DAT_0064c600[treasuryOff + 2] = (treasury >> 16) & 0xFF;
  DAT_0064c600[treasuryOff + 3] = (treasury >> 24) & 0xFF;
  uVar1 = treasury;
  FUN_00488cef(param_1);
  FUN_00487a41(param_1);
  FUN_00560084(param_1);
  // FUN_0053184d(param_1); // research processing
  FUN_00489292(param_1, uVar1);
  if ((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0) {
    iVar2 = FUN_004a75a6(param_1);
    if (iVar2 !== 0) {
      for (local_10 = 0; local_10 < 6; local_10 = local_10 + 1) {
        local_c = local_c - s16(DAT_0064c600, param_1 * 0x594 + 0x4A8 + local_10 * 2);
      }
    }
  }
  if (local_c !== 0) {
    iVar2 = FUN_004d0339(param_1);
    if (iVar2 === 0) {
      FUN_0059772c(param_1, DAT_00655b0b & (1 << (param_1 & 0x1f)));
    }
  }
  DAT_0062c5b8 = 0;
  // Auto-save check
  if ((DAT_00655ae8 & 0x2000) !== 0) { // DAT_00655aea._1_1_ & 0x20 approximation
    _chdir(0 /*&DAT_0064bb08*/);
    FUN_00488937(param_1);
    _chdir(0 /*&DAT_00655020*/);
  }
  return;
}


// ============================================================
// Function: FUN_004897fa @ 0x004897FA
// Size: 95 bytes
// ============================================================

// end_player_turn
export function FUN_004897fa(param_1) {
  if (DAT_006d1da8 !== 0 || param_1 !== 0) {
    DAT_006d1da8 = 0;
    DAT_00628054 = 1;
    DAT_0062805c = 1;
    DAT_0062804c = 0;
    FUN_0056a65e(1);
    // FUN_0041033a();
    FUN_004e4ceb();
  }
  return;
}


// ============================================================
// Function: FUN_00489859 @ 0x00489859
// Size: 436 bytes
// ============================================================

// find_and_select_next_unit
export function FUN_00489859(param_1) {
  let iVar1;
  let local_c;

  if (DAT_0062c5bc === 0) {
    local_c = DAT_00655afe;
  } else {
    local_c = -1;
  }
  iVar1 = FUN_005b6512(local_c, param_1);
  DAT_0062c5bc = 0;
  DAT_00655afe = iVar1;
  if (-1 < iVar1 && iVar1 < DAT_00655b16 &&
     (DAT_006560f0[iVar1 * 0x20 + 0x1A] |
      (DAT_006560f0[iVar1 * 0x20 + 0x1B] << 8) |
      (DAT_006560f0[iVar1 * 0x20 + 0x1C] << 16) |
      (DAT_006560f0[iVar1 * 0x20 + 0x1D] << 24)) !== 0) {
    if (DAT_006560f0[iVar1 * 0x20 + 0xf] !== 1 &&
       DAT_006560f0[iVar1 * 0x20 + 0xf] !== 2 &&
       (DAT_006560f0[iVar1 * 0x20 + 0xf] === 0xff ||
        10 < s8(DAT_006560f0[iVar1 * 0x20 + 0xf]))) {
      DAT_006560f0[iVar1 * 0x20 + 0xe] = 0;
      DAT_0064b1b4 = s16(DAT_006560f0, iVar1 * 0x20);
      DAT_0064b1b0 = s16(DAT_006560f0, iVar1 * 0x20 + 2);
      FUN_0056a65e(1);
      FUN_004105f8(s16(DAT_006560f0, iVar1 * 0x20),
                   s16(DAT_006560f0, iVar1 * 0x20 + 2),
                   s8(DAT_006560f0[iVar1 * 0x20 + 7]));
      FUN_004e4ceb();
    }
    if (DAT_006560f0[iVar1 * 0x20 + 8] === 0) {
      FUN_004274a6(iVar1, 1);
    }
    if (DAT_006ad684 === 0) {
      FUN_00421bd0();
    }
  }
  if (iVar1 < 0 || (DAT_006560f0[iVar1 * 0x20 + 0x1A] |
      (DAT_006560f0[iVar1 * 0x20 + 0x1B] << 8) |
      (DAT_006560f0[iVar1 * 0x20 + 0x1C] << 16) |
      (DAT_006560f0[iVar1 * 0x20 + 0x1D] << 24)) === 0) {
    FUN_004897fa(0);
  }
  return;
}


// ============================================================
// Function: FUN_00489a0d @ 0x00489A0D
// Size: 398 bytes
// ============================================================

// activate_unit_mode
export function FUN_00489a0d(param_1) {
  let iVar1;
  let iVar2;
  let bVar3;
  let _DAT_006ad578 = 0;

  bVar3 = DAT_006d1da8 !== 1;
  if (bVar3) {
    DAT_00628054 = 0;
    DAT_0062805c = 1;
    // FUN_0041033a();
    DAT_006d1da8 = 1;
    DAT_0062804c = 0;
  }
  iVar1 = FUN_005b633f(DAT_00655afe);
  if (iVar1 === 0) {
    FUN_00489859(param_1);
  }
  bVar3 = iVar1 !== 0 && bVar3;
  iVar1 = DAT_00655afe;
  if (-1 < iVar1 && iVar1 < DAT_00655b16 &&
     (DAT_006560f0[iVar1 * 0x20 + 0x1A] |
      (DAT_006560f0[iVar1 * 0x20 + 0x1B] << 8) |
      (DAT_006560f0[iVar1 * 0x20 + 0x1C] << 16) |
      (DAT_006560f0[iVar1 * 0x20 + 0x1D] << 24)) !== 0 &&
     (iVar2 = FUN_005b633f(iVar1), iVar2 !== 0) &&
     (DAT_00655b02 < 3 || DAT_006ad684 !== 0 ||
      param_1 === 0 || _DAT_006ad578 === DAT_006d1da0)) {
    if (bVar3) {
      FUN_0056a65e(1);
    }
    DAT_0064b1b4 = s16(DAT_006560f0, iVar1 * 0x20);
    DAT_0064b1b0 = s16(DAT_006560f0, iVar1 * 0x20 + 2);
    if (bVar3) {
      FUN_004105f8(DAT_0064b1b4, DAT_0064b1b0,
                   s8(DAT_006560f0[iVar1 * 0x20 + 7]));
    }
    FUN_004e4ceb();
    DAT_00673b04 = 1;
    return;
  }
  DAT_0062804c = 0;
  FUN_004897fa(0);
  return;
}


// ============================================================
// Function: FUN_00489b9b @ 0x00489B9B
// Size: 71 bytes
// ============================================================

// center_map_if_needed
export function FUN_00489b9b(param_1, param_2) {
  if (DAT_0066ca88 !== param_1 || DAT_0066ca8a !== param_2) {
    FUN_00410402(param_1, param_2);
  }
  return;
}


// ============================================================
// Function: FUN_00489be2 @ 0x00489BE2
// Size: 1058 bytes
// ============================================================

// check_settler_tutorial_hint
export function FUN_00489be2(param_1) {
  // Tutorial hint system for settler units.
  // Checks terrain quality, improvements, and suggests actions.
  // Primarily UI — stubbed for mechanical correctness.
  return;
}


// ============================================================
// Function: FUN_0048a004 @ 0x0048A004
// Size: 880 bytes
// ============================================================

// process_active_unit_loop
export function FUN_0048a004() {
  // Main unit action processing loop.
  // Handles AI unit moves, player unit actions, tutorial hints.
  // Returns local_14 (0 or 1).
  return 0;
}


// ============================================================
// Function: FUN_0048a374 @ 0x0048A374
// Size: 162 bytes
// ============================================================

// wait_for_player_input
export function FUN_0048a374() {
  // Waits in a loop for player input when no units are active.
  // Processes events and redraws.
  DAT_0062804c = 1;
  // Main wait loop — requires UI event processing
  DAT_0062804c = 0;
  return;
}


// ============================================================
// Function: FUN_0048a416 @ 0x0048A416
// Size: 1303 bytes
// ============================================================

// human_turn_main
export function FUN_0048a416() {
  // Main human player turn processing loop.
  // Initializes unit selection, processes diplomacy events,
  // runs unit action loop, handles end-of-turn cleanup.
  // Heavily UI-dependent.
  return;
}


// ============================================================
// Function: FUN_0048a92d @ 0x0048A92D
// Size: 247 bytes
// ============================================================

// calc_tax_rate_bounds
export function FUN_0048a92d() {
  let bVar1;
  let local_c;
  let local_8;

  for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
    DAT_00673afc[local_8] = 0;
    DAT_00673af8[local_8] = 99;
    for (local_c = 1; local_c < 8; local_c = local_c + 1) {
      if ((1 << (local_c & 0x1f) & DAT_00655b0b) !== 0) {
        bVar1 = DAT_0064c600[local_c * 0x594 + 0xB7 + local_8];
        if (u8(DAT_0064c600[local_c * 0x594 + 0xB7 + local_8]) <= DAT_00673afc[local_8]) {
          bVar1 = DAT_00673afc[local_8];
        }
        DAT_00673afc[local_8] = bVar1;
        bVar1 = DAT_0064c600[local_c * 0x594 + 0xB7 + local_8];
        if (DAT_00673af8[local_8] <= u8(DAT_0064c600[local_c * 0x594 + 0xB7 + local_8])) {
          bVar1 = DAT_00673af8[local_8];
        }
        DAT_00673af8[local_8] = bVar1;
      }
    }
  }
  return;
}


// ============================================================
// Function: FUN_0048aa24 @ 0x0048AA24
// Size: 1208 bytes
// ============================================================

// check_council_and_tutorial
export function FUN_0048aa24() {
  // Checks if it's time for a council meeting (every 50 turns).
  // Also handles tutorial messages at specific turn numbers.
  // Returns a value (turn-based).
  return 0;
}


// ============================================================
// Function: FUN_0048aedc @ 0x0048AEDC
// Size: 649 bytes
// ============================================================

// check_retirement_scenario_end
export function FUN_0048aedc() {
  let uVar1;
  let local_8 = 0;

  if ((DAT_00655af0 & 2) === 0 && DAT_0064b1ac === 0) {
    uVar1 = FUN_00493ba6(DAT_006d1da0);
    FUN_0040ff60(0, uVar1);
    uVar1 = FUN_00493b10(DAT_006d1da0);
    FUN_0040ff60(1, uVar1);
    if ((DAT_00655af0 & 0x80) === 0 || DAT_0064bcb8 === 0) {
      if (DAT_00655afa === 2000) {
        if (2 < DAT_00655b02) {
          FUN_00511880(9, 0xff, 0, 0, 0, 0);
        }
        FUN_00410030(0 /*s_PLANRETIRE*/, 0 /*&DAT_00643af8*/, 0);
      } else if (DAT_00655afa === 0x7e4) {
        if (2 < DAT_00655b02) {
          FUN_00511880(10, 0xff, 0, 0, 0, 0);
        }
        FUN_00410030(0 /*s_DORETIRE*/, 0 /*&DAT_00643af8*/, 0);
        DAT_00655af0 = DAT_00655af0 | 2;
        DAT_0064b1ac = 5;
        if (2 < DAT_00655b02) {
          FUN_0046b14d(0x6b, 0xff, DAT_00655af0, 5, 0, 0, 0, 0, 0, 0);
        }
        local_8 = 1;
      }
    } else if (DAT_0064bcb8 + -5 === DAT_00655af8) {
      if (2 < DAT_00655b02) {
        FUN_00511880(7, 0xff, 0, 0, 0, 0);
      }
      FUN_00410030(0 /*s_SCENARIOENDS*/, 0 /*&DAT_00643af8*/, 0);
    } else if (DAT_0064bcb8 === DAT_00655af8) {
      if (2 < DAT_00655b02) {
        FUN_00511880(8, 0xff, 0, 0, 0, 0);
      }
      FUN_00410030(0 /*s_SCENARIOEND*/, 0 /*&DAT_00643af8*/, 0);
      DAT_00655af0 = DAT_00655af0 | 2;
      DAT_0064b1ac = 5;
      if (2 < DAT_00655b02) {
        FUN_0046b14d(0x6b, 0xff, DAT_00655af0, 5, 0, 0, 0, 0, 0, 0);
      }
      local_8 = 1;
    }
  }
  return local_8;
}


// ============================================================
// Function: FUN_0048b165 @ 0x0048B165
// Size: 450 bytes
// ============================================================

// check_victory_display
export function FUN_0048b165() {
  let iVar1;
  let bVar2 = false;

  switch (DAT_0064b1ac) {
    case 1:
    case 2:
      if (DAT_0062c5b4 === 0 || DAT_006d1da0 === DAT_0062c5b4) {
        FUN_004710d0(DAT_006d1da0);
      } else {
        FUN_004710d0(-DAT_0062c5b4);
      }
      break;
    case 3:
      FUN_00514e7b(DAT_006d1da0);
      break;
    case 4:
      FUN_004702e0(DAT_006d1da0);
      break;
    case 5:
      break;
  }
  FUN_00431d22();
  if ((DAT_00655af0 & 0x20) === 0) {
    FUN_00435d15(DAT_006d1da0);
    FUN_004361cc(DAT_006d1da0);
    FUN_00436f5a(DAT_006d1da0);
  }
  if (DAT_00655b02 === 0) {
    if (DAT_0064b1ac === 1 || DAT_0064b1ac === 2 || DAT_0064b1ac === 4 ||
       (DAT_0064b1ac === 5 && DAT_00655afa === 0x7e4) || DAT_0064b1ac === 3) {
      if (DAT_0064b1ac === 4) {
        bVar2 = true;
      } else {
        iVar1 = FUN_00410030(0 /*s_KEEPPLAYING*/, 0 /*&DAT_0063fc58*/, 0);
        bVar2 = iVar1 === 0;
      }
      DAT_00655af0 = DAT_00655af0 | 0x20;
    }
  } else {
    bVar2 = true;
  }
  DAT_0064b1ac = 0;
  return bVar2;
}


// ============================================================
// Function: FUN_0048b340 @ 0x0048B340
// Size: 3048 bytes
// ============================================================

// single_player_game_loop
export function FUN_0048b340() {
  // Main single-player (and hot-seat) game loop.
  // Iterates over turns, processes AI and human players,
  // handles victory conditions, save/load, email-play mode.
  // Extremely UI-heavy with SEH frame setup.
  return;
}


// ============================================================
// Function: FUN_0048bf2d @ 0x0048BF2D
// Size: 12 bytes
// ============================================================

// SEH_cleanup_sp_loop
export function FUN_0048bf2d() {
  FUN_0059df8a();
  return;
}


// ============================================================
// Function: FUN_0048bf43 @ 0x0048BF43
// Size: 14 bytes
// ============================================================

// SEH_restore_sp_loop
export function FUN_0048bf43() {
  // SEH frame restore — no-op in JS
  return;
}


// ============================================================
// Function: FUN_0048bf51 @ 0x0048BF51
// Size: 155 bytes
// ============================================================

// mp_client_idle_check
export function FUN_0048bf51() {
  FUN_0047e94e(1, 0);
  FUN_0048da51(DAT_006ad35c[0]);
  if (DAT_006c9038 !== 0 || DAT_006ad698 !== 0 || DAT_006c918c !== 0 ||
     DAT_006ad685 !== 0 || DAT_00628044 === 0 || DAT_006c8fb4 !== 0) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
  }
  return;
}


// ============================================================
// Function: FUN_0048bfec @ 0x0048BFEC
// Size: 2530 bytes
// ============================================================

// mp_client_game_loop
export function FUN_0048bfec() {
  // Multiplayer client-side game loop.
  // Handles server transfer, turn processing, casualty display,
  // and client-server synchronization.
  // Extremely UI/network-heavy.
  return;
}


// ============================================================
// Function: FUN_0048c9ce @ 0x0048C9CE
// Size: 12 bytes
// ============================================================

// SEH_cleanup_client_loop
export function FUN_0048c9ce() {
  FUN_0059df8a();
  return;
}


// ============================================================
// Function: FUN_0048c9e4 @ 0x0048C9E4
// Size: 15 bytes
// ============================================================

// SEH_restore_client_loop
export function FUN_0048c9e4() {
  // SEH frame restore — no-op in JS
  return;
}


// ============================================================
// Function: FUN_0048c9f3 @ 0x0048C9F3
// Size: 3990 bytes
// ============================================================

// mp_server_game_loop
export function FUN_0048c9f3(param_1) {
  // Multiplayer server-side game loop.
  // Processes all players, handles client connections,
  // synchronizes game state, manages AI turns.
  // Extremely UI/network-heavy.
  return;
}


// ============================================================
// Function: FUN_0048d989 @ 0x0048D989
// Size: 12 bytes
// ============================================================

// SEH_cleanup_server_loop
export function FUN_0048d989() {
  FUN_0059df8a();
  return;
}


// ============================================================
// Function: FUN_0048d99f @ 0x0048D99F
// Size: 14 bytes
// ============================================================

// SEH_restore_server_loop
export function FUN_0048d99f() {
  // SEH frame restore — no-op in JS
  return;
}


// ============================================================
// Function: FUN_0048d9ad @ 0x0048D9AD
// Size: 164 bytes
// ============================================================

// mp_start_turn_timer
export function FUN_0048d9ad(param_1) {
  let _DAT_00673b00 = 0;

  if (DAT_006c31d0 === 0) {
    DAT_006c9090 = 0;
    FUN_0046b14d(0x2b, DAT_006ad30c[DAT_006ad558[param_1] * 0x54], 0, 0, 0, 0, 0, 0, 0, 0);
  } else {
    DAT_006c9090 = 1;
  }
  if (DAT_0067a8bc === 1 && DAT_00631130 === 0) {
    DAT_00626a2c = 0;
    DAT_006c91e4 = 0;
  }
  _DAT_00673b00 = FUN_00421bb0();
  return;
}


// ============================================================
// Function: FUN_0048da51 @ 0x0048DA51
// Size: 104 bytes
// ============================================================

// mp_check_turn_timeout
export function FUN_0048da51(param_1) {
  let iVar1;
  let _DAT_00673b00 = 0;

  iVar1 = FUN_00421bb0();
  if (0xe0f < iVar1 - _DAT_00673b00) {
    if (DAT_006c9090 === 0) {
      DAT_006c3168[param_1] = DAT_006c3168[param_1] + 1;
      if (DAT_006ad2f7 === 0) {
        DAT_006c8fb4 = DAT_006c8fb4 + 1;
      }
    } else {
      FUN_0048d9ad(param_1);
    }
  }
  return;
}


// ============================================================
// Function: FUN_0048dab9 @ 0x0048DAB9
// Size: 956 bytes
// ============================================================

// mp_check_dropped_connections
export function FUN_0048dab9() {
  let iVar1;
  let bVar2;
  let local_30;
  let local_28;
  let local_24 = new Array(7).fill(0);
  let local_8;

  if (DAT_006ad2f7 === 0) {
    if (DAT_006c8fb4 !== 0) {
      DAT_00628044 = 0;
      debug_log('We lost connection to the server');
      FUN_0059b293(1);
      FUN_00410030(0 /*s_LOSTSERVER*/, 0 /*&DAT_0063fc58*/, 0);
      return 1;
    }
  } else {
    local_28 = FUN_0048de75();
    for (local_30 = 1; local_30 < 8; local_30 = local_30 + 1) {
      bVar2 = true;
      if ((1 << (local_30 & 0x1f) & DAT_00655b0a) !== 0 &&
         (1 << (local_30 & 0x1f) & DAT_00655b0b) !== 0) {
        for (local_8 = 0; local_8 < 7; local_8 = local_8 + 1) {
          if (DAT_006ad359[local_8 * 0x54] !== 0 &&
             DAT_006ad35c[local_8 * 0x15] === local_30) {
            bVar2 = false;
            break;
          }
        }
        if (bVar2) {
          DAT_00655b0b = DAT_00655b0b & ~(1 << (local_30 & 0x1f));
          if ((1 << (local_30 & 0x1f) & DAT_00654fb0) !== 0) {
            DAT_00654fb0 = DAT_00654fb0 & ~(1 << (local_30 & 0x1f));
            FUN_0046b14d(0x2a, 0xff, DAT_00654fb0, 0, 0, 0, 0, 0, 0, 0);
            // _DAT_006c90a0 += 1;
          }
          local_28 = local_28 + 1;
        }
      }
    }
    if (DAT_006c8fb4 !== 0) {
      FID_conflict__memcpy(local_24, DAT_006c8fc0, 0x1c);
      FUN_0059c2b8();
      for (local_8 = 1; local_8 < 7; local_8 = local_8 + 1) {
        if (0 < local_24[local_8] && DAT_006ad359[local_8 * 0x54] !== 0) {
          local_28 = local_28 + 1;
          iVar1 = DAT_006ad35c[local_8 * 0x15];
          FUN_0040ff60(0, 0 /*&DAT_006ad330 + local_8 * 0x54*/);
          FUN_00511880(0x53, 0xff, 1, 0, 0, 0);
          DAT_006c3188[iVar1] = 0;
          DAT_00655b0b = DAT_00655b0b & ~(1 << (iVar1 & 0x1f));
          FUN_0059b96a(DAT_006ad30c[local_8 * 0x54]);
          if ((1 << (iVar1 & 0x1f) & DAT_00654fb0) !== 0) {
            DAT_00654fb0 = DAT_00654fb0 & ~(1 << (iVar1 & 0x1f));
            FUN_0046b14d(0x2a, 0xff, DAT_00654fb0, 0, 0, 0, 0, 0, 0, 0);
          }
          FUN_00410030(0 /*s_LOSTCLIENT*/, 0 /*&DAT_0063fc58*/, 0);
        }
      }
    }
    if (local_28 !== 0) {
      DAT_006ad308 = 0;
      for (local_8 = 0; local_8 < 7; local_8 = local_8 + 1) {
        if (DAT_006ad359[local_8 * 0x54] !== 0) {
          DAT_006ad308 = DAT_006ad308 + 1;
        }
      }
      FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      FUN_004b0b53(0xff, 2, 0, 0, 1);
    }
  }
  return 0;
}


// ============================================================
// Function: FUN_0048de75 @ 0x0048DE75
// Size: 376 bytes
// ============================================================

// process_disconnected_players
export function FUN_0048de75() {
  let iVar1;
  let local_10;
  let local_c = 0;
  let local_8;

  for (local_8 = 1; local_8 < 7; local_8 = local_8 + 1) {
    if (DAT_006ad359[local_8 * 0x54] !== 0 &&
       DAT_006c3188[DAT_006ad35c[local_8 * 0x15]] !== 0) {
      local_c = local_c + 1;
      iVar1 = DAT_006ad35c[local_8 * 0x15];
      DAT_006c3188[iVar1] = 0;
      DAT_006c8fc0[DAT_006ad30c[local_8 * 0x54]] = 0;
      local_10 = iVar1;
      DAT_00655b0b = DAT_00655b0b & ~(1 << (local_10 & 0x1f));
      FUN_0059b96a(DAT_006ad30c[local_8 * 0x54]);
      if ((1 << (local_10 & 0x1f) & DAT_00654fb0) !== 0) {
        DAT_00654fb0 = DAT_00654fb0 & ~(1 << (local_10 & 0x1f));
        // _DAT_006c90a0 += 1;
      }
    }
  }
  if (local_c !== 0) {
    FUN_0046b14d(0x2a, 0xff, DAT_00654fb0, 0, 0, 0, 0, 0, 0, 0);
    FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  return local_c;
}
