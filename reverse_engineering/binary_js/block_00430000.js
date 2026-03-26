// ═══════════════════════════════════════════════════════════════════
// block_00430000.js — Mechanical transpilation of block_00430000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00430000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00430000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8, s16, u16, s32, w32 } from './mem.js';

// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════

let DAT_0063ef70 = 0;
let DAT_0063ef74 = 0;
let DAT_0063efac = 0;
let _DAT_0063ef78 = 0;
let DAT_0063ef80 = 0;
let DAT_00625ec4 = 0;
let DAT_0063ef6c = 0;
let DAT_00655b18 = 0;
let DAT_0064f394 = new Uint8Array(0x58 * 256);
let DAT_0064f348 = new Uint8Array(0x58 * 256);
let DAT_0064f360 = new Uint8Array(0x58 * 256);
let DAT_0064f349 = new Uint8Array(0x58 * 256);
let DAT_0064f379 = new Uint8Array(0x58 * 256);
let DAT_0064c488 = new Int32Array(256);
let DAT_00628420 = 0;
let DAT_0063ec38 = 0;
let DAT_0063ec34 = 0;
let DAT_0063ec3c = 0;
let DAT_00655b02 = 0;
let _DAT_00625ec0 = 0;
let DAT_006ad8b8 = 0;
let _DAT_0063e4e8 = 0;
let DAT_0063f278 = 0;
let DAT_006c91e4 = 0;
let DAT_006ad678 = new Int32Array(32);
let DAT_0067a8bc = 0;
let DAT_00655c16 = 0;
let DAT_00655b07 = '\0';
let DAT_00655b0a = 0;
let DAT_00655b0b = 0;
let DAT_00654c78 = 0;
let DAT_00655b08 = 0;
let DAT_0064c6c0 = new Uint8Array(0x594 * 8);
let DAT_0064c6c1 = new Uint8Array(0x594 * 8);
let DAT_0064c6a2 = new Int32Array(8);
let DAT_0064c706 = new Int16Array(0x594 * 8);
let DAT_0064b114 = 0;
let DAT_0064b9c0 = new Int32Array(16);
let DAT_00627670 = 0;
let DAT_006ad558 = new Int32Array(8);
let DAT_006ad30c = new Uint8Array(0x54 * 256);
let DAT_00626a2c = 0;
let DAT_006ad698 = '\0';
let DAT_0067a8c0 = 0;
let DAT_006d1da0 = 0;
let DAT_00635a3c = 0;
let DAT_0063ef98 = 0;
let _DAT_0063ef7c = 0;
let _DAT_0063ef68 = 0;
let DAT_0063efa4 = 0;
let DAT_0063efa8 = 0;
let DAT_00628064 = 0;
let DAT_00655be6 = new Int16Array(0x1c);
let DAT_0064c5c0 = new Int32Array(0x1c * 2);
let DAT_00655af8 = 0;
let DAT_00655afa = 0;
let DAT_00655af0 = 0;
let DAT_0064bc60 = 0;
let DAT_00655c22 = new Uint8Array(8);
let DAT_0064c6be = new Uint8Array(0x594 * 8);
let DAT_0064c6e0 = new Uint8Array(0x594 * 8);
let DAT_00655b90 = '\0';
let DAT_00655c38 = new Uint8Array(0x96 * 8);
let DAT_006366a8 = 0;
let DAT_0063e948 = 0;
let DAT_0063ef60 = 0;
let DAT_00636598 = 0;
let DAT_006d1164 = 0;
let DAT_006a6550 = 0;
let DAT_006a65a8 = 0;
let DAT_006a6604 = 0;
let DAT_006a659c = 0;
let DAT_006a65fc = 0;
let DAT_006a6554 = 0;
let DAT_006a65c8 = 0;
let DAT_006a65cc = 0;
let DAT_006a65d0 = 0;
let DAT_006a65c4 = 0;
let DAT_006a65f8 = 0;
let DAT_00673f78 = 0;
let DAT_00673f5c = 0;
let DAT_00673f60 = 0;
let DAT_00673f84 = 0;
let DAT_00673f58 = 0;
let DAT_00673f8c = 0;
let DAT_00673f6c = 0;
let DAT_00627c14 = 0;
let DAT_00673f74 = 0;
let DAT_00673f88 = 0;
let DAT_00673f7c = 0;
let DAT_00673f70 = 0;
let DAT_0064bcba = 0;
let DAT_00673f64 = 0;
let DAT_00673f80 = 0;
let DAT_00673f54 = 0;
let DAT_0064bcbc = new Int16Array(4);
let DAT_0063e4ec = 0;
let DAT_0063ea18 = 0;
let DAT_006554fc = new Uint8Array(0x30 * 256);
let DAT_0064c6a6 = new Int16Array(0x594 * 8);
let DAT_006554fe = new Int16Array(0x30 * 256);
let DAT_00655358 = new Int32Array(0x10 * 16);
let DAT_00655360 = new Int32Array(0x10 * 16);
let DAT_0064f340 = new Int16Array(0x58 * 256);
let DAT_0064f342 = new Int16Array(0x58 * 256);
let DAT_0064f344 = new Uint8Array(0x58 * 256);
let DAT_0064f346 = new Uint8Array(0x58 * 256);
let DAT_0064f347 = new Uint8Array(0x58 * 256);
let DAT_0064f34a = new Uint8Array(0x58 * 256);
let DAT_0064f34b = new Uint8Array(0x58 * 256);
let DAT_0064f34c = new Uint8Array(0x58 * 256);
let DAT_0064f34d = new Uint8Array(0x58 * 256);
let DAT_0064f356 = new Uint8Array(0x58 * 256);
let DAT_0064f370 = new Uint8Array(0x58 * 256);
let DAT_0064f374 = new Uint8Array(0x58 * 256);
let DAT_0064f37a = new Uint8Array(0x58 * 256);
let DAT_0064f37b = new Uint8Array(0x58 * 256);
let DAT_0064f37c = new Uint8Array(0x58 * 256);
let DAT_0064f37e = new Uint8Array(0x58 * 256);
let DAT_0064f37f = new Uint8Array(0x58 * 256);
let DAT_0064f381 = new Uint8Array(0x58 * 256);
let DAT_0064f384 = new Int16Array(0x58 * 256);
let DAT_0064f38a = new Uint8Array(0x58 * 256);
let DAT_0064f38c = new Uint8Array(0x58 * 256);
let DAT_0064f38e = new Uint8Array(0x58 * 256);
let DAT_0064f390 = new Uint8Array(0x58 * 256);
let DAT_0064f391 = new Uint8Array(0x58 * 256);
let DAT_0064f392 = new Uint8Array(0x58 * 256);
let DAT_0064f393 = new Uint8Array(0x58 * 256);
let DAT_0064f35a = new Uint8Array(0x58 * 256);
let DAT_0064f35c = new Uint8Array(0x58 * 256);
let DAT_0064f35e = new Uint8Array(0x58 * 256);
let DAT_0063f0c8 = new Int16Array(0x48 * 6);
let DAT_0063f0da = new Int16Array(0x48 * 6);
let DAT_0063f0dc = new Int16Array(0x48 * 6);
let DAT_0063f0de = new Int16Array(0x48 * 6);
let DAT_0063f0d8 = new Int16Array(0x48 * 6);
let DAT_0063f0d4 = new Int16Array(0x48 * 6);
let DAT_0063f0cc = new Int16Array(0x48 * 6);
let DAT_0063f0d6 = new Int16Array(0x48 * 6);
let DAT_0063f0ce = new Int16Array(0x48 * 6);
let DAT_0063f0ca = new Int16Array(0x48 * 6);
let DAT_0063f0d0 = new Int16Array(0x48 * 6);
let DAT_0063f0d2 = new Int16Array(0x48 * 6);
let DAT_0064ba10 = new Int32Array(16);
let DAT_0063f660 = 9999;
let DAT_00655504 = new Int16Array(0x30 * 256);
let DAT_006554fd = new Uint8Array(0x30 * 256);
let DAT_00625ec8 = 0;
let DAT_00625ecc = 0;
let DAT_00625ed0 = 0;
let DAT_0063eaa8 = 0;
let DAT_0063eaac = 0;
let DAT_0063eab0 = 0;
let DAT_0063eab4 = 0;
let DAT_0063ea28 = new Int32Array(0x1e);
let DAT_0063efb8 = new Int32Array(0x1e);
let DAT_0063f050 = new Int32Array(0x1e);
let DAT_0063e9a0 = new Int32Array(0x1e);
let DAT_0063f040 = null;
let DAT_0063e958 = 0;
let DAT_0063e954 = 0;
let _DAT_0063e994 = 0;
let DAT_0063e620 = 0;
let DAT_0063e61c = 0;
let DAT_0063e624 = 0;
let DAT_0064c6b5 = new Uint8Array(0x594 * 8);
let DAT_0063e968 = 0;
let DAT_0063e960 = 0;
let _DAT_0063e964 = 0;
let DAT_0063e95c = 0;
let _DAT_0063e950 = 0;
let DAT_006af260 = new Int32Array(8);
let DAT_006af280 = new Int32Array(8);
let DAT_006af220 = new Int32Array(8);
let DAT_006af2a0 = new Int16Array(0x27d8 * 8);
let DAT_006af2a2 = new Int16Array(0x27d8 * 8);
let DAT_006af2a4 = new Int16Array(0x27d8 * 8);
let DAT_006af2a6 = new Int16Array(0x27d8 * 8);
let DAT_006af2a8 = new Int16Array(0x27d8 * 8);
let DAT_006af2aa = new Uint8Array(0x27d8 * 8);
let DAT_0064b1b8 = new Uint8Array(0x14 * 256);
let DAT_0063e7bc = 0;
let _DAT_0063e98c = 0;
let DAT_0063e990 = 0;
let DAT_0064c6b0 = new Uint8Array(0x594 * 8);
let DAT_0064c708 = new Int16Array(0x594 * 8);
let DAT_0064c6ae = new Int16Array(0x594 * 8);
let DAT_0064c6ac = new Int16Array(0x594 * 8);
let DAT_0064c7f4 = new Uint8Array(0x594 * 8);
let DAT_00655c18 = 0;
let DAT_006ad8c4 = 0;
let DAT_006c90d0 = 0;
let DAT_006c8fac = 0;
let DAT_006c8fa0 = 0;
let DAT_00627fdc = 0;
let DAT_0064b1ca = new Uint8Array(0x14 * 256);
let DAT_0064b1c5 = new Uint8Array(0x14 * 256);
let DAT_0064b1c8 = new Uint8Array(0x14 * 256);
let DAT_0064b1bd = new Uint8Array(0x14 * 256);
let _DAT_0063eac8 = 0;
let DAT_0063eaca = 0;
let _DAT_0063eacc = 0;
let _DAT_0063eace = 0;
let _DAT_0063ead0 = 0;
let _DAT_0063ead2 = 0;
let _DAT_0063ead4 = 0;
let _DAT_0063ead6 = 0;
let _DAT_0063ead8 = 0;
let DAT_0063eada = 0;
let _DAT_0063eadc = 0;
let _DAT_0063eade = 0;
let _DAT_0063f230 = 0;
let _DAT_0063f242 = 0;
let DAT_0064bcb4 = 0;
let DAT_0064bcb6 = 0;
let DAT_006d1160 = 0;
let DAT_006d1162 = 0;
let DAT_00628370 = new Int8Array(0x2d);
let DAT_006283a0 = new Int8Array(0x2d);
let DAT_00628350 = new Int8Array(20);
let DAT_00628360 = new Int8Array(20);
let DAT_00666130 = new Int16Array(0x10 * 256);
let DAT_00666134 = new Int16Array(0x10 * 256);
let DAT_0063f540 = new Int32Array(16);
let DAT_0063f668 = new Int32Array(16);
let _DAT_0063f54c = 0;
let _DAT_0063f550 = 0;
let _DAT_0063f560 = 0;
let _DAT_0063f570 = 0;
let DAT_006560f6 = new Uint8Array(0x20 * 256);
let DAT_006560fd = new Uint8Array(0x20 * 256);
let DAT_00656100 = new Uint8Array(0x20 * 256);
let DAT_0065610a = new Int32Array(0x20 * 256);
let DAT_00655b16 = 0;
let DAT_0064bb08 = '';
let DAT_00655020 = '';
let DAT_00679640 = '';
let DAT_00627cce = new Int8Array(0x18 * 16);
let DAT_00628044 = 0;
let DAT_0063eb10 = 0;   // draw surface object
let DAT_0063eac0 = 0;   // font object 1
let DAT_00626258 = '';   // scenario dir path for CITY.TXT
let DAT_00626260 = '';   // game dir path for CITY.TXT
let DAT_00626048 = '';
let DAT_0062604c = '';
let DAT_00626054 = '';
let DAT_00626058 = '';
let DAT_0062605c = '';
let DAT_00626064 = '';
let DAT_0062606c = '';
let DAT_00626070 = '';
let DAT_00626074 = '';
let DAT_00626078 = '';
let DAT_0062607c = '';
let DAT_00626080 = '';
let DAT_00626084 = '';
let DAT_00626088 = '';
let DAT_0062608c = '';
let DAT_00626090 = '';
let DAT_00626098 = '';
let DAT_0062609c = '';
let DAT_006260a4 = '';
let DAT_006260a8 = '';
let DAT_006260b0 = '';
let DAT_006260b4 = '';
let DAT_006260c4 = '';
let DAT_006260b8 = '';
let DAT_00626194 = '';
let DAT_00626198 = '';
let DAT_006261a0 = '';
let DAT_006558e8 = '';
let DAT_0063e4f8 = null;
let DAT_0063eab8 = null;
let DAT_0063e540 = null;
let DAT_00655b0c = 0;
let DAT_00673f68 = 0;

// ═══════════════════════════════════════════════════════════════════
// STUB: External functions referenced but defined elsewhere.
// These are no-ops or return 0. Replace with real imports as needed.
// ═══════════════════════════════════════════════════════════════════

function FUN_0042f293() { /* thunk_FUN_0042f293 - UI redraw */ }
function FUN_004bd9f0(_a, _b) { return 0; /* has_tech_or_wonder */ }
function FUN_00566584(_a) { /* select item */ }
function CRichEditDoc_InvalidateObjectCache(_a) { /* MFC UI invalidate */ }
function FUN_0059db08(_a) { /* stack alloc */ }
function FUN_00493c7d(_a) { return ''; /* get_civ_name */ }
function FUN_0040ff60(_a, _b) { /* set_text_param */ }
// FUN_0043c9d0 defined as export below
function FUN_0040bbb0() { /* clear_text_buffer */ }
function FUN_0040bbe0(_a) { /* append_text */ }
// FUN_0043d20a defined as export below
function FUN_0040fe10() { /* text_newline */ }
function FUN_0040fea0() { /* text_paren_open */ }
function FUN_0040bc10(_a) { /* append_localized_string */ }
function FUN_0040fed0() { /* text_paren_close */ }
function FUN_0040ff00(_a) { /* append_text_ref */ }
function FUN_0059edf0(_a, _b, _c) { /* add_list_item_icon */ }
// FUN_0043c630 defined as export below
function FUN_0040bc80(_a) { return 0; /* show_dialog_get_result */ }
// FUN_0043c660 defined as export below
// FUN_004305e7 defined as export below
function FUN_0059df8a() { /* stack dealloc */ }
function FUN_00414d10() { return 0; /* get_main_window */ }
function BringWindowToTop(_a) { /* Win32 API stub */ }
function FUN_005adfa0(_a, _b, _c) { return Math.max(_b, Math.min(_a, _c)); /* clamp */ }
function FUN_004271e8(_a, _b) { /* set_dialog_icon */ }
function FUN_0040ffa0(_a, _b) { /* show_text_dialog */ }
function CPropertySheet_EnableStackedTabs(_a, _b) { /* MFC UI stub */ }
// FUN_0043c990 defined as export below
function FUN_00453e51(_a, _b) { return 0; /* has_advance */ }
function FUN_00493ba6(_a) { return ''; /* get_leader_name */ }
function FUN_00493b10(_a) { return ''; /* get_tribe_name */ }
function FUN_0045705e(_a, _b) { /* set_attitude_text */ }
function FUN_004679ab(_a) { return 0; /* get_attitude_index */ }
function FUN_00421d30() { /* append_separator */ }
// FUN_0043c8a0 defined as export below
function FUN_0040ff30(_a) { /* append_number */ }
function FUN_00421ea0(_a) { /* show_message */ }
function FUN_00410030(_a, _b, _c) { /* show_popup_message */ }
function FUN_004fbe84(_a, _b) { return 0; /* check_peace_treaty */ }
function FUN_00467825(_a, _b, _c) { /* set_diplomacy_state */ }
function FUN_00511880(_a, _b, _c, _d, _e, _f) { /* send_network_msg */ }
function FUN_00426fb0(_a, _b, _c, _d) { return 0; /* show_waiting_dialog */ }
function FUN_0046b14d(_a, _b, _c, _d, _e, _f, _g, _h, _i, _j) { /* send_game_event */ }
function FUN_004b7eb6(_a, _b) { /* start_diplomacy */ }
function FUN_00460129(_a, _b, _c, _d, _e) { /* initiate_contact */ }
// FUN_0043060b defined as export below
function FUN_00421bb0() { return 0; /* get_tick_count */ }
function FUN_0047e94e(_a, _b) { /* process_messages */ }
function FUN_00552ed2() { /* UI setup 1 */ }
function FUN_00552112() { /* UI setup 2 */ }
function FUN_0042ac18() { /* UI setup 3 */ }
function FUN_005baeb0(_a) { /* set_draw_surface */ }
function FUN_005baec8(_a) { /* set_font */ }
function FUN_005baee0(_a, _b, _c, _d) { /* set_font_params */ }
// FUN_0043c910 defined as export below
function FUN_0040efd0(_a) { return 0; /* get_text_width */ }
function FUN_005cef31(_a, _b, _c, _d) { /* draw_wonder_icon */ }
// FUN_0043c8d0 defined as export below
function FUN_00408680(_a, _b, _c, _d, _e) { /* set_rect */ }
// FUN_0043cab0 defined as export below
// FUN_0043c7c0 defined as export below
// FUN_0043cb30 defined as export below
function FUN_0040fc50(_a, _b, _c, _d) { /* add_scrollbar */ }
function FUN_0040fd40(_a, _b) { /* set_scroll_range */ }
function FUN_0040fcf0(_a) { /* set_scroll_pos */ }
function FUN_005db0d0(_a) { /* set_scroll_page */ }
function FUN_0040fd80(_a) { /* set_scroll_callback */ }
function FUN_0040f380() { /* finalize_scrollbar */ }
function FUN_00408460() { /* end_draw */ }
function FUN_004a2645(_a, _b, _c) { return 0; /* find_text_section */ }
function FUN_004a2379(_a, _b) { return 0; /* open_text_file_section */ }
function FUN_004a23fc(_a) { return 0; /* read_next_line */ }
function FUN_0059a791(_a, _b) { return 0; /* random_range */ }
function FUN_0059e18b(_a, _b, _c, _d, _e) { /* draw_list_item */ }
function FUN_0040fe40() { /* text_space */ }
// FUN_0043c810 defined as export below
function FUN_00410070(_a) { return ''; /* get_civ_adjective */ }
function FUN_005f22d0(_dst, _src) { /* strcpy equivalent */ }
function FUN_005f22e0(_dst, _src) { /* strcat equivalent */ }
function FUN_0042acb0() { /* UI setup dialog */ }
function FUN_005bb574() { /* finalize_dialog_setup */ }
function FUN_004085f0() { /* begin_draw */ }
function FUN_0042a768() { /* cleanup_dialog */ }
// FUN_004331d1 defined as export below
function FUN_005a97cc(_a, _b, _c, _d, _e) { /* draw_line */ }
function FUN_004eb4ed(_a, _b) { /* compute_city_output */ }
// FUN_0043cce5 defined as export below
// FUN_0043ca50 defined as export below
function FUN_004aef20(_a) { /* init_string_buffer */ }
function FUN_004af14b(_a, _b) { /* append_localized_to_buf */ }
// FUN_0043c840 defined as export below
// FUN_0043c870 defined as export below
function FUN_0056d289(_a, _b, _c, _d, _e, _f) { /* draw_city_icon */ }
function FUN_0042d781(_a, _b, _c, _d, _e, _f, _g) { /* draw_city_bar */ }
function FUN_004a28b0(_a) { /* count_units_for_civ */ }
function FUN_004e75a6(_a, _b) { return 0; /* get_specialist_type */ }
function FUN_0046e571(_a, _b) { /* play_sound */ }
// FUN_00436e28 defined as export below
// FUN_00436dd7 defined as export below
// FUN_00436ed2 defined as export below
// FUN_00436bb7 defined as export below
// FUN_004371c8 defined as export below
function FUN_00428cb0() { /* cleanup_replay */ }
function FUN_00497ea0(_a, _b, _c) { /* init_memory_pool */ }
function FUN_004980ec(_a) { /* free_memory_pool */ }
function FUN_00498159(_a, _b) { return ''; /* alloc_from_pool */ }
// FUN_004372cd defined as export below
// FUN_0043742f defined as export below
// FUN_0043720f defined as export below
function FUN_0040f010(_a) { /* destroy_bitmap */ }
// FUN_0043c740 defined as export below
// FUN_0043cbb0 defined as export below
function FUN_005bd630() { return 0; /* create_bitmap_obj */ }
function FUN_005c64da() { return 0; /* create_window_obj */ }
function FUN_005bf5e1(_a, _b, _c, _d) { /* setup_window */ }
function FUN_005534bc(_a, _b, _c, _d, _e, _f, _g, _h, _i) { /* setup_dialog_frame */ }
function FUN_005a9afe(_a, _b, _c, _d, _e, _f, _g, _h) { /* blit_surface */ }
function FUN_0040fdb0(_a, _b, _c) { /* set_dialog_rect */ }
function FUN_004086c0(_a, _b, _c, _d, _e) { /* init_rect */ }
function FUN_005a9798(_a, _b, _c, _d, _e, _f) { /* draw_line_on_surface */ }
function FUN_00484fec(_a) { return ''; /* get_year_string */ }
function FUN_00421f10(_a) { /* append_year_text */ }
function FUN_005c0073(_a) { /* finalize_graph_area */ }
function FUN_0059dfb9(_a, _b, _c, _d) { /* display_surface */ }
function FUN_00407fc0(_a) { return 0; /* get_rect_height */ }
// FUN_0043c790 defined as export below
function FUN_00428b0c(_a) { return ''; /* get_string_resource */ }
function FUN_0040f680(_a, _b, _c, _d) { /* add_button */ }
function FUN_0040f880(_a) { /* set_button_callback */ }
function FUN_0040f7d0() { /* setup_button_style */ }
function FUN_0040f840() { /* finalize_button */ }
function FUN_00407f90(_a, _b) { return 0; /* get_rect_width */ }
function FUN_0042abc1(_a, _b, _c, _d) { /* setup_partial_redraw */ }
function FUN_00408490(_a) { /* partial_draw_end */ }
function FUN_005c61b0() { /* run_dialog_message_loop */ }
function FUN_00472d20(_a, _b) { return 0; /* get_unit_type_sprite */ }
function FUN_0056baff(_a, _b, _c, _d, _e, _f, _g) { /* draw_unit_sprite */ }
function FUN_005baf57(_a, _b, _c, _d) { /* draw_text_with_font */ }
function FUN_005bb024(_a, _b, _c, _d, _e) { /* draw_text_centered_with_font */ }
function FUN_005bb0af(_a, _b, _c, _d, _e) { /* draw_text_right_with_font */ }
function FUN_005b8aa8(_a, _b) { return 0; /* get_continent_id */ }
function FUN_005b8ca6(_a, _b) { return 0; /* get_continent_id_2 */ }
function FUN_005ae31d(_a, _b, _c, _d) { return 9999; /* tile_distance */ }
function FUN_005ae3bf(_a, _b, _c) { /* building_to_byte_bit */ }
function FUN_005b8a81(_a, _b) { return 0; /* get_terrain_type */ }
function FUN_004087c0(_a, _b) { return 0; /* is_tile_valid */ }
function FUN_005b89bb(_a, _b) { return 0; /* get_base_terrain */ }
function FUN_005b8ee1(_a, _b) { return 0; /* has_river */ }
function FUN_005b8931(_a, _b) { return 0; /* get_tile_flags_ptr */ }
function FUN_005b94d5(_a, _b) { return 0; /* get_tile_improvements */ }
function FUN_005ae052(_a) { return _a; /* wrap_x_coordinate */ }
function FUN_005b9ec6() { /* begin_visibility_update */ }
function FUN_005b9f1c() { /* end_visibility_update */ }
function FUN_005b9c49(_a, _b, _c, _d) { /* update_tile_visibility */ }
function FUN_005b98b7(_a, _b, _c) { /* set_tile_owner */ }
function FUN_005b8c18(_a, _b, _c) { return 0; /* get_tile_owner_bits */ }
function FUN_005b94fc(_a, _b, _c, _d, _e) { /* set_tile_improvement */ }
function FUN_005b976d(_a, _b, _c, _d, _e) { /* set_tile_visibility */ }
function FUN_005b8b1a(_a, _b, _c) { /* reveal_tile_to_civ */ }
function FUN_005b89e4(_a, _b) { return 0; /* has_special_resource */ }
function FUN_005b3d06(_a, _b, _c, _d) { /* place_initial_improvement */ }
function FUN_004bfe5a(_a, _b, _c) { return 0; /* can_city_build */ }
function FUN_004b0b53(_a, _b, _c, _d, _e) { /* send_mp_city_update */ }
function XD_FlushSendBuffer(_a) { /* flush network buffer */ }
function FUN_00444270(_a) { /* show_advisor_message */ }
function FUN_00421f40() { return '\0'; /* is_local_player_turn */ }
function debug_log(_a) { /* log debug message */ }
function FUN_005d1f50(_a, _b, _c) { return -1; /* create_timer */ }
function FUN_005d2004(_a) { /* destroy_timer */ }
function FUN_00484d52() { /* play_credits_music */ }
function FUN_0055339f() { /* init_obj */ }
// FUN_0043c690 defined as export below
// FUN_0043c6c0 defined as export below
// FUN_0043c520 defined as export below
function FUN_005c841d(_a) { /* delete_gdi_obj */ }
function FUN_00414f02(_a, _b, _c) { /* sort_indices_by_values */ }
function FUN_00414ca0(_a) { /* set_scroll_callback_2 */ }
function FUN_00426ff0(_a, _b) { /* format_string */ }
function _strlen(_a) { return 0; /* string length */ }
function FUN_005ae3ec(_a, _b) { return _a; /* shift_value */ }
function FUN_004af1d5(_a, _b) { /* append_int_to_str */ }
function FUN_004af284(_a, _b) { /* append_number_to_global_buf */ }
function FUN_004af2b9(_a, _b) { /* append_gold_to_global_buf */ }
// FUN_0043cda6 defined as export below
// FUN_0043f444 defined as export below
function FUN_004af174(_a, _b) { /* append_string */ }
function FUN_004af122(_a, _b) { /* init_string_with_number */ }
function FUN_004a2020() { /* close_text_file */ }
// FUN_0043d07a defined as export below
// FUN_0043d289 defined as export below
// FUN_0043d400 defined as export below
// FUN_0043f7a7 defined as export below
// FUN_0043f493 defined as export below
// FUN_0043cc7e defined as export below
function FUN_00410402(_a, _b) { /* scroll_map_to */ }
function FUN_0040fe70() { /* text_percent */ }
// FUN_0043c950 defined as export below
function CSocket_Create(_a, _b, _c, _d) { return 0; /* create dialog */ }
function FUN_0059e4e6(_a) { /* set_dialog_style */ }
function FUN_0059ea99(_a) { /* set_dialog_selection */ }
function FUN_005bd65c(_a, _b) { /* set_bitmap_size */ }
function FUN_005c0cc5(_a) { /* set_bitmap_palette */ }
function FUN_005c041f(_a) { /* set_bitmap_bg */ }
function FUN_005cedad(_a, _b, _c, _d, _e, _f) { /* render_to_bitmap */ }
function FUN_005cde4d() { /* cleanup_cstring */ }
function FUN_005bbfee(_a, _b) { /* toggle_list_scroll */ }
function FUN_005bd915() { /* cleanup_bitmap_data */ }
function FUN_005bca3d(_a) { /* release_surface */ }
function manage_window_8B58(_a) { /* manage_window */ }
function create_font_8200(_a, _b, _c) { return 0; /* create_font_handle */ }
function gdi_847F(_a) { return 0; /* get_font_height */ }
function FUN_005db140(_a) { return 0; /* load_resource */ }
function FUN_005db55b(_a) { /* free_resource */ }
function FUN_00448f92(_a) { return 0; /* get_government_name */ }
function FUN_004aefd8(_a) { /* append_ordinal_suffix */ }
// FUN_0043ca10 defined as export below


// ═══════════════════════════════════════════════════════════════════
// FUN_00430267 — set scroll offset and redraw
// ═══════════════════════════════════════════════════════════════════
export function FUN_00430267(param_1) {
  DAT_0063ef70 = DAT_0063ef74 * param_1;
  FUN_0042f293();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043028a — handle list click (select item at position)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043028a(param_1, param_2) {
  let uVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let bVar5;
  let local_18;
  let local_14;

  uVar1 = DAT_0063efac;
  if ((param_2 - _DAT_0063ef78) >= 0) {
    iVar2 = ((param_2 - _DAT_0063ef78) / DAT_0063ef80) | 0;
    if (iVar2 < DAT_0063ef74) {
      if ((param_1 - 2) >= 0) {
        iVar3 = (((param_1 - 2) / DAT_0063ef98) | 0);
        if (iVar3 < 3) {
          iVar3 = DAT_0063ef74 * iVar3 + DAT_0063ef70;
          local_14 = 0;
          for (local_18 = 0; local_18 < 100; local_18 = local_18 + 1) {
            iVar4 = FUN_004bd9f0(uVar1, local_18);
            if (iVar4 !== 0) {
              bVar5 = local_14 === iVar3 + iVar2;
              local_14 = local_14 + 1;
              if (bVar5) {
                FUN_00566584(local_18);
                CRichEditDoc_InvalidateObjectCache(null);
                DAT_00625ec4 = 1;
                return;
              }
            }
          }
        }
      }
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043039d — draw intelligence city list
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043039d() {
  let iVar1;
  let uVar2;
  let iVar3;
  let local_310;
  let local_30c;

  FUN_0059db08(0x4000);
  iVar1 = DAT_0063efac;
  uVar2 = FUN_00493c7d(DAT_0063efac);
  FUN_0040ff60(0, uVar2);
  FUN_0043c9d0('INTELLCITY');
  for (local_30c = 0; local_30c < DAT_00655b18; local_30c = local_30c + 1) {
    if ((DAT_0064f394[(local_30c * 0x58) / 4] !== 0) &&
       (s8(DAT_0064f348[local_30c * 0x58]) === iVar1)) {
      FUN_0040bbb0();
      FUN_0040bbe0(DAT_0064f360[local_30c * 0x58]);
      iVar3 = FUN_0043d20a(local_30c, 1);
      if (iVar3 !== 0) {
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040bc10(0x99);
        FUN_0040fed0();
      }
      if (s8(DAT_0064f379[local_30c * 0x58]) < -0x26) {
        if (s8(DAT_0064f379[local_30c * 0x58]) < 0x01) {
          local_310 = ~s8(DAT_0064f379[local_30c * 0x58]) + 1;
        } else {
          local_310 = s8(DAT_0064f379[local_30c * 0x58]);
        }
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040bc10(0xf4);
        FUN_0040fe10();
        FUN_0040ff00(u32(DAT_0064c488, local_310 * 8));
        FUN_0040fed0();
      }
      FUN_0059edf0(DAT_00679640, local_30c, 0);
    }
  }
  FUN_0043c630();
  FUN_0040bc80(0);
  FUN_0043c660();
  CRichEditDoc_InvalidateObjectCache(null);
  DAT_00625ec4 = 1;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004305e7 — stack dealloc helper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004305e7() {
  FUN_0059df8a();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004305fd — SEH cleanup (no-op in JS)
// Source: decompiled/block_00430000.c FUN_004305fd (14 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004305fd() {
  // DEVIATION: Win32 — SEH epilog
  // C: *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043060b — open foreign intelligence report dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043060b(param_1, param_2) {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14 = new Uint8Array(16);

  // thunk_show_credits(3,3,1,600,400,0,0) - UI stub
  DAT_0063ef6c = param_1;
  DAT_0063efac = param_2;
  FUN_004086c0(local_14, 2, 0, 0x129, 0x18);
  iVar1 = DAT_0063ec38;
  iVar2 = FUN_00407fc0(local_14);
  FUN_0043c790(local_14, DAT_0063ec34, (iVar1 - iVar2) + 0x18e);
  FUN_0043c790(local_14, 299, 0);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x51c);
  FUN_0040f680(null, 100, local_14, uVar3);
  FUN_0040f880(null);
  FUN_0040f7d0();
  FUN_0040f840();
  FUN_0043c790(local_14, -299, 0);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x314);
  FUN_0040f680(null, 0x65, local_14, uVar3);
  FUN_0040f880(null);
  CPropertySheet_EnableStackedTabs(null, 0x402766);
  FUN_005bb574();
  FUN_004085f0();
  do {
    DAT_00625ec4 = 0;
    if (2 < DAT_00655b02) {
      CPropertySheet_EnableStackedTabs(null, 0x402789);
    }
    _DAT_00625ec0 = FUN_00421bb0();
    FUN_005c61b0();
    CPropertySheet_EnableStackedTabs(null, 0);
  } while (DAT_00625ec4 !== 0);
  FUN_0042a768();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00430822 — check if diplomacy timer expired
// ═══════════════════════════════════════════════════════════════════
export function FUN_00430822() {
  let iVar1;

  FUN_0047e94e(1, 0);
  iVar1 = FUN_00421bb0();
  if (((DAT_006ad8b8 * 0x3c <= iVar1 - _DAT_0063e4e8) || (DAT_0063f278 !== -1)) ||
     (DAT_006c91e4 !== 0)) {
    DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
    CRichEditDoc_InvalidateObjectCache(DAT_006ad678[0] + 0x48);
    if (DAT_0063f278 === -1) {
      DAT_0063f278 = 0;
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004308ae — foreign advisor report dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_004308ae(param_1) {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_330;
  let local_32c = [0, 5, 0x11, 0x1f, 0x32, 0x44, 0x52, 0x5f, 100];
  let local_320;
  let local_31c;
  let local_318;
  let local_314;
  let local_2d3 = 0;
  let local_234 = 0;
  let local_1c;
  let local_18;
  let local_14;

  FUN_0059db08(0x4000);
  if ((2 < DAT_00655b02) && (DAT_0067a8bc === 0)) {
    iVar1 = FUN_00414d10();
    BringWindowToTop(iVar1 + 4);
    return;
  }

  let _continue_outer = true;
  while (_continue_outer) {
    let _break_inner = false;
    while (true) {
      iVar1 = FUN_005adfa0(DAT_00655c22[param_1], 1, 7);
      FUN_004271e8(0, DAT_00628420 + 0x38c + iVar1 * 4);
      iVar1 = FUN_005adfa0(DAT_0064c6be[param_1 * 0x594], 0, 7);
      FUN_004271e8(1, DAT_00628420 + 0x370 + iVar1 * 4);
      if (DAT_00655b02 === 0) {
        FUN_0040ffa0('REPORTFOREIGN', 0x2000001);
      } else {
        FUN_0040ffa0('REPORTFOREIGNMULTI', 0x2000001);
      }
      CPropertySheet_EnableStackedTabs(null, 0x402e91);
      FUN_0043c990(0x4b, 0);
      local_314 = 0;
      iVar1 = FUN_00453e51(param_1, 0x18);
      if ((iVar1 === 0) && (iVar1 = FUN_00453e51(param_1, 9), iVar1 === 0)) {
        local_31c = 0;
      } else {
        local_31c = 1;
      }
      if (((DAT_00655c16 === -1) && (iVar1 = FUN_00453e51(param_1, 9), iVar1 === 0)) &&
         (DAT_00655b07 === '\0')) {
        local_14 = 0;
      } else {
        local_14 = 1;
      }
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((local_18 !== param_1) && ((1 << (local_18 & 0x1f) & DAT_00655b0a) !== 0)) {
          if ((((1 << (param_1 & 0x1f) & DAT_00655b0b) === 0) ||
              ((1 << (local_18 & 0x1f) & DAT_00655b0b) === 0)) ||
             ((DAT_00654c78 === 0 && (DAT_00655b08 !== 0)))) {
            local_1c = 0;
          } else {
            local_1c = 1;
          }
          if (((local_14 !== 0) || (local_1c !== 0)) ||
             (((DAT_0064c6c0[local_18 * 4 + param_1 * 0x594]) & 1) !== 0)) {
            local_314 = local_314 + 1;
            FUN_0040bbb0();
            uVar2 = FUN_00493ba6(local_18);
            FUN_0040bbe0(uVar2);
            FUN_0040fe10();
            uVar2 = FUN_00493b10(local_18);
            FUN_0040bbe0(uVar2);
            FUN_0040fe10();
            FUN_0040bc10(0x8c);
            FUN_0040fe10();
            uVar2 = FUN_00493c7d(local_18);
            FUN_0040bbe0(uVar2);
            FUN_0040fe10();
            FUN_0045705e(param_1, local_18);
            local_318 = FUN_004679ab(DAT_0064b114);
            FUN_0040fea0();
            FUN_0040ff00(DAT_0064b9c0[local_318 * 4]);
            if ((DAT_0064c6c1[local_18 * 4 + param_1 * 0x594] & 0x20) === 0) {
              if ((DAT_0064c6c0[local_18 * 4 + param_1 * 0x594] & 8) === 0) {
                if ((DAT_0064c6c0[local_18 * 4 + param_1 * 0x594] & 4) === 0) {
                  if ((DAT_0064c6c0[local_18 * 4 + param_1 * 0x594] & 2) !== 0) {
                    FUN_00421d30();
                    FUN_0040bc10(0x8f);
                  }
                } else {
                  FUN_00421d30();
                  FUN_0040bc10(0x8e);
                }
              } else {
                FUN_00421d30();
                FUN_0040bc10(0x8d);
              }
            } else {
              FUN_00421d30();
              FUN_0040bc10(0x90);
            }
            if (((DAT_0064c6c0[local_18 * 4 + param_1 * 0x594] & 0x80) === 0) && (local_31c === 0)) {
              FUN_00421d30();
              FUN_0040bc10(0x91);
            } else {
              FUN_00421d30();
              FUN_0043c8a0(DAT_0064c6a2[(local_18 * 0x594) / 4]);
              if (DAT_00655b08 < 2) {
                FUN_00421d30();
                FUN_0040ff30(DAT_0064c706[local_18 * 0x594]);
                FUN_0040fe10();
                FUN_0040bc10(0x19);
              }
            }
            FUN_0040fed0();
            FUN_0059edf0(DAT_00679640, local_18, 0);
          }
        }
      }
      if (local_314 === 0) {
        FUN_00421ea0('NOFOREIGN');
        return;
      }
      local_18 = FUN_0040bc80(0);
      if ((local_2d3 & 0x20) !== 0) {
        local_234 = 2;
      }
      if (local_234 === 0) {
        return;
      }
      if (local_234 !== 1) break;
      if ((((DAT_0064c6c0[local_18 * 4 + param_1 * 0x594] & 0x80) === 0) && (local_31c === 0)) &&
         (DAT_00655b07 === '\0')) {
        FUN_00410030('NOINTEL', null, 0);
      } else {
        FUN_0043060b(param_1, local_18);
      }
    }
    if (local_234 === 2) {
      // break out of outer loop
      _break_inner = true;
    } else if (local_234 === 3) {
      FUN_0040bbb0();
      uVar2 = FUN_00493ba6(local_18);
      FUN_0040bbe0(uVar2);
      FUN_0040fe10();
      uVar2 = FUN_00493b10(local_18);
      FUN_0040bbe0(uVar2);
      FUN_0040fe10();
      FUN_0040bc10(0x8c);
      FUN_0040fe10();
      uVar2 = FUN_00493c7d(local_18);
      FUN_0040bbe0(uVar2);
      FUN_0040ff60(0, DAT_00679640);
      local_318 = CSocket_Create(null, 0x625f7c, 0x625f6c, 1);
      if (local_318 === 0) {
        FUN_0059e4e6(3);
        for (local_318 = 0; local_318 < 9; local_318 = local_318 + 1) {
          uVar3 = 0;
          iVar1 = local_318;
          uVar2 = FUN_00428b0c(DAT_0064b9c0[local_318 * 4], local_318, 0);
          FUN_0059edf0(uVar2, iVar1, uVar3);
        }
        if (DAT_0064c6e0[param_1 * 0x594 + local_18] === 0) {
          local_330 = 0;
        } else {
          local_330 = FUN_004679ab(DAT_0064c6e0[param_1 * 0x594 + local_18]);
        }
        FUN_0059ea99(local_330);
        local_318 = FUN_0040bc80(0);
        if (local_318 >= 0) {
          DAT_0064c6e0[param_1 * 0x594 + local_18] = local_32c[local_318];
          FUN_0046b14d(0x98, 0xff, param_1, local_18, local_32c[local_318], 0, 0, 0, 0, 0);
        }
      }
      _continue_outer = true;
      continue;
    } else {
      // goto LAB_0043153e equivalent — break out
      _break_inner = true;
      _continue_outer = false;
    }

    if (_break_inner && local_234 === 2) {
      // handle diplomacy request
      if ((DAT_00627670 === 0) || (iVar1 = FUN_004fbe84(param_1, local_18), iVar1 !== 0)) {
        if ((((1 << (param_1 & 0x1f) & DAT_00655b0b) === 0) ||
            ((1 << (local_18 & 0x1f) & DAT_00655b0b) !== 0)) &&
           (((1 << (param_1 & 0x1f) & DAT_00655b0b) === 0 || (2 < DAT_00655b02)))) {
          if ((((1 << (param_1 & 0x1f) & DAT_00655b0b) !== 0) &&
              ((1 << (local_18 & 0x1f) & DAT_00655b0b) !== 0)) && (2 < DAT_00655b02)) {
            FUN_00467825(param_1, local_18, 0x401);
            DAT_0063f278 = -1;
            DAT_00626a2c = 1;
            FUN_00511880(0x3d, DAT_006ad30c + s32(DAT_006ad558, local_18 * 4) * 0x54, 0, 0, param_1, 0);
            uVar2 = FUN_00493b10(local_18);
            FUN_0040ff60(1, uVar2);
            uVar2 = FUN_00493c7d(local_18);
            FUN_0040ff60(2, uVar2);
            DAT_00635a3c = null;
            _DAT_0063e4e8 = FUN_00421bb0();
            local_320 = FUN_00426fb0('PARLEYWAITING', 0x2000001, null, 0);
            if (DAT_006c91e4 === 0) {
              if (local_320 === -1) {
                FUN_0046b14d(0x81, DAT_006ad30c + s32(DAT_006ad558, local_18 * 4) * 0x54, 0, 0, 0, 0, 0, 0, 0, 0);
                DAT_0067a8c0 = -1;
                DAT_00626a2c = 0;
              } else if (DAT_0063f278 < 1) {
                DAT_00635a3c = null;
                FUN_00410030('PARLEYGOAWAY', null, 0);
                DAT_00626a2c = 0;
              } else if (DAT_0063f278 === 1) {
                DAT_0063f278 = -1;
                DAT_0067a8c0 = local_18;
                DAT_00635a3c = null;
                _DAT_0063e4e8 = FUN_00421bb0();
                uVar2 = FUN_00493c7d(param_1);
                FUN_0040ff60(0, uVar2);
                FUN_00410030('PARLEYOK', null, 0);
                if (DAT_006ad698 === '\0') {
                  if (DAT_006c91e4 === 0) {
                    FUN_004b7eb6(local_18, 3);
                  } else {
                    DAT_0067a8c0 = -1;
                    DAT_006c91e4 = 0;
                    uVar2 = FUN_00493c7d(local_18);
                    FUN_0040ff60(0, uVar2);
                    DAT_00635a3c = null;
                    FUN_00410030('PARLEYCANCEL', null, 0);
                    DAT_00626a2c = 0;
                  }
                } else {
                  DAT_0067a8c0 = -1;
                  DAT_00635a3c = null;
                  FUN_00410030('PARLEYBUSY', null, 0);
                  DAT_00626a2c = 0;
                }
              } else {
                DAT_00635a3c = null;
                FUN_00410030('PARLEYBUSY', null, 0);
                DAT_00626a2c = 0;
              }
            } else {
              DAT_006c91e4 = 0;
              uVar2 = FUN_00493c7d(local_18);
              FUN_0040ff60(0, uVar2);
              DAT_00635a3c = null;
              FUN_00410030('PARLEYCANCEL', null, 0);
              DAT_0067a8c0 = -1;
              DAT_00626a2c = 0;
            }
          }
        } else {
          FUN_00467825(param_1, local_18, 0x401);
          FUN_00460129(param_1, local_18, -1, -1, 1);
        }
      } else {
        FUN_00421ea0('PEACENOBETRAY');
      }
    }
    _continue_outer = false;
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043154f — stack dealloc helper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043154f() {
  FUN_0059df8a();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00431565 — SEH cleanup (no-op in JS)
// Source: decompiled/block_00430000.c FUN_00431565 (14 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00431565() {
  // DEVIATION: Win32 — SEH epilog
  // C: *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00431573 — draw wonders of the world report
// ═══════════════════════════════════════════════════════════════════
export function FUN_00431573() {
  let extraout_EAX;
  let uVar1;
  let iVar2;
  let local_88;
  let local_84 = new Uint8Array(16);
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28 = new Uint8Array(16);
  let local_18;
  let aiStack_14 = [0, 0, 0, 0];

  local_74 = DAT_0063ef6c;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_58 = DAT_0063ec38 + 2;
  local_6c = DAT_0063ec38 + 0x174;
  // _Timevec::~_Timevec - get font height
  extraout_EAX = 16; // placeholder
  local_30 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x29, 0x12, 2, 1);
  for (local_2c = 0; local_2c < 4; local_2c = local_2c + 1) {
    aiStack_14[local_2c] = 0;
  }
  local_34 = 0;
  for (local_3c = 0; local_3c < 0x1c; local_3c = local_3c + 1) {
    if (DAT_00655be6[local_3c * 2] !== -1) {
      local_2c = (local_3c / 7) | 0;
      iVar2 = local_34 + 1;
      if (aiStack_14[local_2c] === 0) {
        iVar2 = local_34 + 2;
      }
      local_34 = iVar2;
      aiStack_14[local_2c] = aiStack_14[local_2c] + 1;
    }
  }
  if (local_34 === 0) {
    FUN_0040bbb0();
    uVar1 = FUN_00428b0c(DAT_00628420 + 0x550);
    FUN_0040bbe0(uVar1);
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_58, DAT_0063ec3c);
    local_58 = local_58 + local_30 + 4;
    FUN_0040bbb0();
    FUN_0040bbe0('');
    FUN_0040bc10(0x125);
    FUN_0040bbe0('');
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_58, DAT_0063ec3c);
    local_58 = local_58 + local_30;
  }
  local_30 = 0x28;
  DAT_0063ef80 = 0x28;
  _DAT_0063ef78 = local_58;
  _DAT_0063ef7c = local_6c - local_58;
  DAT_0063ef74 = FUN_005adfa0(((local_6c - local_58) / 0x28) | 0, 1, 99);
  local_18 = DAT_0063ef74;
  _DAT_0063ef68 = FUN_005adfa0(((DAT_0063ef74 - 1 + local_34) / DAT_0063ef74) | 0, 1, 99);
  uVar1 = FUN_005adfa0(local_34 - 1, 0, 999);
  DAT_0063ef70 = FUN_005adfa0(DAT_0063ef70, 0, uVar1);
  local_70 = local_58;
  local_54 = 0;
  for (local_2c = 0; local_2c < 4; local_2c = local_2c + 1) {
    aiStack_14[local_2c] = 0;
  }
  local_68 = DAT_0063ef70;
  for (local_3c = 0; local_3c < 0x1c; local_3c = local_3c + 1) {
    if (DAT_00655be6[local_3c * 2] !== -1) {
      local_60 = local_3c + 0x27;
      local_2c = (local_3c / 7) | 0;
      if (aiStack_14[local_2c] === 0) {
        aiStack_14[local_2c] = aiStack_14[local_2c] + 1;
        if ((local_68 <= local_54) && (local_54 < local_68 + local_18)) {
          iVar2 = FUN_004a2645(null, 'WONDERS', local_2c);
          if (iVar2 === 0) {
            local_40 = local_70 + 0xf;
            FUN_005baee0(0x29, 0x12, 1, 1);
            FUN_0043c910(DAT_00679640, DAT_0063ec34, local_40, DAT_0063ec3c - (DAT_0063efa4 + 2));
          }
          local_70 = local_70 + local_30;
        }
        local_54 = local_54 + 1;
      }
      if ((local_68 <= local_54) && (local_54 < local_68 + local_18)) {
        local_4c = local_70 + 2;
        FUN_0040bbb0();
        if (((local_2c === 0) || ((local_3c === 0x13 || (local_3c === 0x14)))) && (DAT_00628064 === 0)) {
          FUN_0040bc10(0xd7);
          FUN_0040fe10();
        }
        FUN_0040ff00(u32(DAT_0064c488, local_60 * 8));
        FUN_0040fe10();
        if (DAT_00655be6[local_3c * 2] < 0) {
          FUN_0040fea0();
          FUN_0040bc10(0xac);
          FUN_0040fed0();
          local_38 = 0;
        } else {
          if ((local_2c === 0) && (DAT_00628064 === 0)) {
            local_88 = 0xad;
          } else {
            local_88 = 0xd8;
          }
          FUN_0040bc10(local_88);
          FUN_0040fe10();
          local_50 = DAT_00655be6[local_3c * 2];
          FUN_0040bbe0(DAT_0064f360[local_50 * 0x58]);
          FUN_0040fe10();
          FUN_0040fea0();
          uVar1 = FUN_00410070(s8(DAT_0064f348[local_50 * 0x58]));
          FUN_0040bbe0(uVar1);
          FUN_0040fed0();
          local_38 = s8(DAT_0064f348[local_50 * 0x58]);
        }
        FUN_005baec8(DAT_0063eac0);
        uVar1 = FUN_0043cb30(local_38, 0x12, 1, 1);
        FUN_005baee0(uVar1);
        local_48 = FUN_0040efd0(DAT_00679640);
        local_48 = local_48 + 0x43;
        local_44 = DAT_0063ec3c - (DAT_0063efa4 + 2);
        local_64 = ((local_44 >> 1) + DAT_0063ec34) - (local_48 >> 1);
        FUN_005cef31(local_84, null, local_64, local_70 + 10);
        local_64 = local_64 + 0x42;
        local_40 = local_70 + 8;
        FUN_0043c8d0(DAT_00679640, local_64, local_40);
        local_70 = local_70 + local_30;
        local_5c = local_70 - 2;
        FUN_00408680(local_28, DAT_0063ec34 + 2, local_4c,
                     ((DAT_0063ec3c + DAT_0063ec34) - DAT_0063efa4) - 4, local_5c);
        uVar1 = FUN_0043cab0(local_38);
        FUN_0043c7c0(null, local_28, uVar1);
      }
      local_54 = local_54 + 1;
    }
  }
  if (DAT_0063efa8 === 0) {
    FUN_00408680(local_28, (DAT_0063ec34 + DAT_0063ec3c - DAT_0063efa4) - 2, local_58, DAT_0063ec34 + DAT_0063ec3c - 2, local_6c);
    FUN_0040fc50(null, 200, local_28, 1);
    uVar1 = FUN_005adfa0(local_34 - 1, 0, 999);
    FUN_0040fd40(0, uVar1);
    FUN_0040fcf0(DAT_0063ef70);
    FUN_005db0d0(DAT_0063ef74);
    FUN_0040fd80(null);
    FUN_0040f380();
    DAT_0063efa8 = 1;
  }
  FUN_00408460();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00431c56 — set wonders scroll position and redraw
// ═══════════════════════════════════════════════════════════════════
export function FUN_00431c56(param_1) {
  DAT_0063ef70 = param_1;
  FUN_00431573();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00431c73 — show wonders of the world dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00431c73(param_1) {
  // thunk_show_credits(7,7,1,600,400,0,0)
  DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(null, 0x401b45);
  FUN_005bb574();
  FUN_004085f0();
  if (2 < DAT_00655b02) {
    CPropertySheet_EnableStackedTabs(null, 0x402789);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  CPropertySheet_EnableStackedTabs(null, 0);
  FUN_0042a768();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00431d22 — demographics/power graph dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00431d22() {
  // Large UI function - power graph display
  // Mostly UI drawing code, stubbed for mechanical completeness
  let local_18 = 0;
  let local_14 = 0;
  let local_648, local_650;

  FUN_0055339f();
  FUN_0043c690();
  FUN_0043c690();
  FUN_0059db08(0x4000);
  FUN_0043c6c0(0, 0xc, 1);
  FUN_0043c6c0(0, 0xe, 1);

  local_648 = FUN_005bd630();
  local_18 = local_648;
  local_650 = FUN_005c64da();
  local_14 = local_650;
  FUN_005bf5e1(0x33, 10, 0xc0, local_650);

  let uVar3 = FUN_00428b0c(DAT_00628420 + 0x358);
  FUN_005534bc(uVar3, 0xd, 0, 0x14, 600, 0x1a9, 0, 0, 0);
  let local_620 = {};  // draw surface placeholder
  let local_348 = {};  // font placeholder
  FUN_005baeb0(local_620);
  FUN_005baec8(local_348);
  let local_630 = 0;  // local_4fc
  let local_38_g = 0; // local_4f8
  FUN_00552ed2();
  FUN_00552112();
  FUN_005a9afe(local_18, local_620, 0, 0, local_630, local_38_g, 600, 400);
  let local_2c_g = {};
  let local_28_g = local_38_g + 400;  // local_360 + 400
  FUN_0040fdb0(local_620, local_2c_g, 0x14);
  FUN_004086c0(local_2c_g, local_630 + 8, local_38_g + 2, 0x248, 0x16e);
  FUN_0043c7c0(local_620, local_2c_g, 10);

  let local_30;
  if (((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 2) === 0)) {
    local_30 = (DAT_00655af8 + ((DAT_00655af8 >> 31) & 3)) >> 2;
  } else {
    local_30 = (DAT_00655af8 / 2) | 0;
  }
  local_30 = FUN_005adfa0(local_30, 0, 0x96);

  let local_34;
  if (((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 2) === 0)) {
    local_34 = 0x32;
  } else {
    local_34 = 0x19;
  }

  let local_1c = 0x32;
  for (let local_640 = 1; local_640 < 8; local_640 = local_640 + 1) {
    for (let local_3c = 0; local_3c < local_30; local_3c = local_3c + 1) {
      if (local_1c < u8(DAT_00655c38[local_3c * 8 + local_640])) {
        local_1c = u8(DAT_00655c38[local_3c * 8 + local_640]);
      }
    }
  }

  // Draw grid lines
  for (let local_3c = 0; local_3c <= DAT_00655af8 && local_3c < 0x259;
      local_3c = local_3c + local_34) {
    let local_624;
    if (((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 2) === 0)) {
      local_624 = local_3c;
    } else {
      local_624 = local_3c * 2;
    }
    FUN_005a9798(local_620, local_624 + local_630 + 8, local_38_g + 2,
                 local_624 + local_630 + 8, local_38_g + 0x170, 10);
    if (local_3c % (local_34 * 2) === 0) {
      let local_4c = FUN_00484fec(local_3c + 1);
      FUN_0040bbb0();
      FUN_00421f10(local_4c);
      FUN_005baee0(0x25, 10, 2, 1);
      FUN_0043c8d0(DAT_00679640, local_624 + local_630, local_38_g + 0x172);
    }
  }
  FUN_005c0073(local_2c_g);

  // Draw graph lines per civ
  for (let local_640 = 1; local_640 < 8; local_640 = local_640 + 1) {
    if (((1 << (local_640 & 0x1f)) & DAT_00655b0a) !== 0 ||
       ((1 << (local_640 & 0x1f)) & DAT_00655b0c) !== 0) {
      let local_628 = 0;
      let local_62c = 0;
      for (let local_3c = 0; local_3c < local_30 && local_3c < 0x96; local_3c = local_3c + 1) {
        let local_40 = local_3c * 4;
        let local_44 = ((u8(DAT_00655c38[local_3c * 8 + local_640]) * 0x168) / local_1c) | 0;
        FUN_005a9798(local_620, local_628 + local_630 + 9, (local_38_g - local_62c) + 0x171,
                     local_40 + local_630 + 9, (local_38_g - local_44) + 0x171, 0x12);
        local_628 = local_40;
        local_62c = local_44;
      }
    }
  }
  FUN_005c0073({});  // local_364

  // Draw legend
  FUN_005baec8({});  // local_638
  let local_63c = 0;
  for (let local_640 = 1; local_640 < 8; local_640 = local_640 + 1) {
    if (((1 << (local_640 & 0x1f)) & DAT_00655b0a) !== 0 ||
       ((1 << (local_640 & 0x1f)) & DAT_00655b0c) !== 0) {
      let local_48 = FUN_0043cab0(local_640);
      FUN_005baee0(local_48, 10, 2, 1);
      let iVar1_g = local_63c + 1;
      uVar3 = FUN_00493c7d(local_640, local_630 + 10, local_63c * 0xe + local_38_g + 1);
      FUN_0043c8d0(uVar3);
      let local_628 = 0;
      let local_62c = 0;
      for (let local_3c = 0; (local_63c = iVar1_g, local_3c < local_30 && local_3c < 0x96);
          local_3c = local_3c + 1) {
        let local_40 = local_3c * 4;
        let local_44 = ((u8(DAT_00655c38[local_3c * 8 + local_640]) * 0x168) / local_1c) | 0;
        FUN_005a9798(local_620, local_628 + local_630 + 8, (local_38_g + 0x170) - local_62c,
                     local_40 + local_630 + 8, (local_38_g + 0x170) - local_44, local_48);
        local_628 = local_40;
        local_62c = local_44;
      }
    }
  }

  FUN_004085f0();
  FUN_0059dfb9(local_620, 0, 0, 0x114000);
  FUN_0040bc80(0);
  if (local_18 !== 0) {
    FUN_0040f010(1);
  }
  if (local_14 !== 0) {
    FUN_0043c740(1);
  }
  FUN_0043c520();
  FUN_0043c520();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004325c9 — stack dealloc helper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004325c9() {
  FUN_0059df8a();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004325d5 — destroy font helper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004325d5() {
  FUN_0043c520();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004325e1 — destroy font helper
// ═══════════════════════════════════════════════════════════════════
export function FUN_004325e1() {
  FUN_0043c520();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004325ed — destructor helper (no-op in JS)
// Source: decompiled/block_00430000.c FUN_004325ed (12 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004325ed() {
  // DEVIATION: MFC — COleCntrFrameWnd::~COleCntrFrameWnd((unaff_EBP + -0x61c))
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00432603 — SEH cleanup (no-op in JS)
// Source: decompiled/block_00430000.c FUN_00432603 (14 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00432603() {
  // DEVIATION: Win32 — SEH epilog
  // C: *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00432611 — historians report dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00432611() {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_394;
  let local_390;
  let local_38c;
  let local_388;
  let local_384;
  let local_88;
  let local_84 = new Uint8Array(80);
  let local_34;
  let aiStack_30 = [0, 0, 0, 0, 0, 0, 0, 0];

  FUN_0059db08(0x2000);
  iVar1 = FUN_004a2379(null, 'HISTORIANS');
  if (iVar1 === 0) {
    FUN_004a23fc(1);
    iVar1 = parseInt(DAT_00679640) || 0;
    if (iVar1 !== 0) {
      iVar1 = FUN_0059a791(0, iVar1 - 1);
      for (local_38c = 0; local_38c <= iVar1; local_38c = local_38c + 1) {
        FUN_004a23fc(1);
      }
      FUN_0040ff60(1, DAT_00679640);
      iVar1 = FUN_0059a791(0, 4);
      FUN_004a2645(null, 'HISTORIES', iVar1);
      FUN_0040ff60(2, DAT_00679640);
      FUN_0040ffa0('HISTORY', 0x40000);
      FUN_0059e18b(null, -1, -1, -1, 0);
      for (local_394 = 0; local_394 < 8; local_394 = local_394 + 1) {
        aiStack_30[local_394] = 0;
      }
      for (local_388 = 0; local_388 < DAT_00655b18; local_388 = local_388 + 1) {
        if (DAT_0064f394[(local_388 * 0x58) / 4] !== 0) {
          if (iVar1 === 3) {
            aiStack_30[s8(DAT_0064f348[local_388 * 0x58])] =
                 aiStack_30[s8(DAT_0064f348[local_388 * 0x58])] +
                 ((s8(DAT_0064f349[local_388 * 0x58]) +
                  s8(DAT_0064f392[local_388 * 0x58])) -
                 s8(DAT_0064f393[local_388 * 0x58]));
          } else if (iVar1 === 4) {
            aiStack_30[s8(DAT_0064f348[local_388 * 0x58])] =
                 aiStack_30[s8(DAT_0064f348[local_388 * 0x58])] +
                 s8(DAT_0064f349[local_388 * 0x58]);
          }
        }
      }
      for (local_394 = 0; local_394 < 8; local_394 = local_394 + 1) {
        if (iVar1 === 0) {
          aiStack_30[local_394] = aiStack_30[local_394] + DAT_0064c6a2[(local_394 * 0x594) / 4];
        } else if (iVar1 === 1) {
          aiStack_30[local_394] = aiStack_30[local_394] + DAT_0064c706[local_394 * 0x594];
        } else if (iVar1 === 2) {
          for (local_384 = 0; local_384 < 100; local_384 = local_384 + 1) {
            iVar2 = FUN_004bd9f0(local_394, local_384);
            if (iVar2 !== 0) {
              aiStack_30[local_394] = aiStack_30[local_394] + 1;
            }
          }
        }
      }
      iVar1 = FUN_004a2379(null, 'HISTORYRANK');
      if (iVar1 === 0) {
        for (local_88 = 1; local_88 < 8; local_88 = local_88 + 1) {
          FUN_004a23fc(1);
          FUN_005f22d0(local_84, DAT_00679640);
          local_390 = -1;
          local_34 = 0;
          for (local_394 = 1; local_394 < 8; local_394 = local_394 + 1) {
            if ((local_34 <= aiStack_30[local_394]) &&
               ((1 << (local_394 & 0x1f) & DAT_00655b0a) !== 0)) {
              local_34 = aiStack_30[local_394];
              local_390 = local_394;
            }
          }
          if (local_390 < 0) break;
          aiStack_30[local_390] = -1;
          FUN_0040bbb0();
          FUN_0040bbe0('');
          FUN_0040ff30(local_88);
          FUN_0043c810();
          FUN_0040bc10(0x174);
          FUN_0040fe10();
          FUN_0040bbe0(local_84);
          FUN_0040fe10();
          FUN_0040bc10(0xd9);
          if (DAT_00628064 === 2) {
            FUN_0040fe40();
          } else {
            FUN_0040fe10();
            FUN_0040bc10(0x8c);
            FUN_0040fe10();
          }
          uVar3 = FUN_00493c7d(local_390);
          FUN_0040bbe0(uVar3);
          if (((DAT_006d1da0 === local_390) ||
              (((DAT_0064c6c0[DAT_006d1da0 * 0x594 + local_390 * 4]) & 1) !== 0)) ||
             (DAT_00655b08 === '\0')) {
            FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
          }
        }
        FUN_0040bc80(0);
      }
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00432bf8 — stack dealloc helper
// ═══════════════════════════════════════════════════════════════════
export function FUN_00432bf8() {
  FUN_0059df8a();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00432c0e — SEH cleanup (no-op in JS)
// Source: decompiled/block_00430000.c FUN_00432c0e (14 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00432c0e() {
  // DEVIATION: Win32 — SEH epilog
  // C: *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00432c1c — draw top 5 cities report
// ═══════════════════════════════════════════════════════════════════
export function FUN_00432c1c() {
  let extraout_EAX;
  let uVar1;
  let local_8c = new Uint8Array(16);
  let aiStack_7c = [-1, -1, -1, -1, -1];
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let aiStack_2c = [-1, -1, -1, -1, -1];
  let local_18;
  let local_14 = new Uint8Array(16);

  for (local_34 = 0; local_34 < 5; local_34 = local_34 + 1) {
    aiStack_7c[local_34] = -1;
    aiStack_2c[local_34] = aiStack_7c[local_34];
  }
  local_58 = 0;

  // Main loop with goto restructured
  let _found = false;
  while (local_58 < DAT_00655b18) {
    if (DAT_0064f394[(local_58 * 0x58) / 4] !== 0) {
      _found = true;
      break;
    }
    local_58 = local_58 + 1;
  }

  if (_found) {
    // Calculate score for this city
    local_18 = ((s8(DAT_0064f349[local_58 * 0x58]) +
               s8(DAT_0064f392[local_58 * 0x58])) -
               s8(DAT_0064f393[local_58 * 0x58]));
    for (local_38 = 0; local_38 < 0x1c; local_38 = local_38 + 1) {
      if (DAT_00655be6[local_38 * 2] === local_58) {
        local_18 = local_18 + 10;
      }
    }

    // Insert into sorted top-5
    local_34 = 0;
    while (local_34 < 5) {
      if (local_18 <= aiStack_2c[local_34]) {
        local_34 = local_34 + 1;
        continue;
      }
      for (local_3c = 3; local_34 <= local_3c; local_3c = local_3c - 1) {
        aiStack_2c[local_3c + 1] = aiStack_2c[local_3c];
        aiStack_7c[local_3c + 1] = aiStack_7c[local_3c];
      }
      aiStack_2c[local_34] = local_18;
      aiStack_7c[local_34] = local_58;
      break;
    }

    // Continue scanning remaining cities
    local_58 = local_58 + 1;
    while (local_58 < DAT_00655b18) {
      if (DAT_0064f394[(local_58 * 0x58) / 4] !== 0) {
        local_18 = ((s8(DAT_0064f349[local_58 * 0x58]) +
                   s8(DAT_0064f392[local_58 * 0x58])) -
                   s8(DAT_0064f393[local_58 * 0x58]));
        for (local_38 = 0; local_38 < 0x1c; local_38 = local_38 + 1) {
          if (DAT_00655be6[local_38 * 2] === local_58) {
            local_18 = local_18 + 10;
          }
        }
        local_34 = 0;
        while (local_34 < 5) {
          if (local_18 <= aiStack_2c[local_34]) {
            local_34 = local_34 + 1;
            continue;
          }
          for (local_3c = 3; local_34 <= local_3c; local_3c = local_3c - 1) {
            aiStack_2c[local_3c + 1] = aiStack_2c[local_3c];
            aiStack_7c[local_3c + 1] = aiStack_7c[local_3c];
          }
          aiStack_2c[local_34] = local_18;
          aiStack_7c[local_34] = local_58;
          break;
        }
      }
      local_58 = local_58 + 1;
    }
  }

  // Now draw the top-5 report
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  local_5c = DAT_0063ec38 + 2;
  local_68 = DAT_0063ec38 + 0x174;
  extraout_EAX = 16; // placeholder for font height
  local_30 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar1 = FUN_00428b0c(DAT_00628420 + 0x554);
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
  _DAT_0063ef78 = local_5c + local_30;
  local_5c = _DAT_0063ef78 + 10;
  local_30 = 0x18;
  DAT_0063ef80 = 0x18;
  _DAT_0063ef78 = _DAT_0063ef78 + 0x12;
  _DAT_0063ef7c = local_68 - local_5c;
  for (local_34 = 0; local_34 < 5; local_34 = local_34 + 1) {
    local_58 = aiStack_7c[local_34];
    if (aiStack_7c[local_34] >= 0) {
      local_54 = local_5c;
      FUN_0040bbb0();
      FUN_0040ff30(local_34 + 1);
      FUN_0043c810();
      FUN_0040bbe0(DAT_0064f360[local_58 * 0x58]);
      FUN_0040fe10();
      FUN_0040fea0();
      uVar1 = FUN_00410070(s8(DAT_0064f348[local_58 * 0x58]));
      FUN_0040bbe0(uVar1);
      FUN_0040fed0();
      FUN_005baec8(DAT_0063eac0);
      uVar1 = FUN_0043cb30(s8(DAT_0064f348[local_58 * 0x58]), 0x12, 1, 1);
      FUN_005baee0(uVar1);
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
      local_5c = local_5c + local_30;
      local_64 = DAT_0063ec34 + 5;
      FUN_0056d289(null, local_58, 0x1000, local_64, local_5c - 0xf, 0);
      local_44 = local_64 + 0x42;
      local_48 = DAT_0063ec3c + DAT_0063ec34 - 5;
      local_4c = local_48 - local_44;
      local_50 = ((local_4c >> 1) + local_44);
      FUN_0042d781(local_58, local_44, local_5c, (local_50 - 2) - local_44,
                   s8(DAT_0064f392[local_58 * 0x58]),
                   s8(DAT_0064f393[local_58 * 0x58]), 0);
      local_40 = local_50;
      for (local_38 = 0; local_38 < 0x1c; local_38 = local_38 + 1) {
        if ((DAT_00655be6[local_38 * 2] === local_58) &&
           (0x23 < local_48 - local_40)) {
          FUN_005cef31(local_8c, null, local_40, local_5c + 6);
          local_40 = local_40 + 0x26;
        }
      }
      local_60 = local_5c + 0x20;
      local_5c = local_60;
      FUN_00408680(local_14, DAT_0063ec34 + 3, local_54, DAT_0063ec3c + DAT_0063ec34 - 3, local_60);
      uVar1 = FUN_0043cab0(s8(DAT_0064f348[local_58 * 0x58]));
      FUN_0043c7c0(null, local_14, uVar1);
      local_5c = local_5c + 6;
    }
  }
  FUN_00408460();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00433122 — show top 5 cities dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00433122(param_1) {
  // thunk_show_credits(8,8,1,600,400,0,0)
  DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(null, 0x401bef);
  FUN_005bb574();
  FUN_004085f0();
  if (2 < DAT_00655b02) {
    CPropertySheet_EnableStackedTabs(null, 0x402789);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  CPropertySheet_EnableStackedTabs(null, 0);
  FUN_0042a768();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004331d1 — draw single demographic comparison row
// ═══════════════════════════════════════════════════════════════════
export function FUN_004331d1(param_1, param_2, param_3, param_4, param_5, param_6) {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 1;
  local_14 = -10000;
  local_8 = param_2;
  if (param_3 < 0) {
    param_1[param_2] = -param_1[param_2];
  }
  for (local_c = 1; local_c < 8; local_c = local_c + 1) {
    if ((1 << (local_c & 0x1f) & DAT_00655b0a) !== 0) {
      if ((param_3 < 0) && (param_2 !== local_c)) {
        param_1[local_c] = -param_1[local_c];
      }
      if (param_1[param_2] < param_1[local_c]) {
        local_10 = local_10 + 1;
      }
      if (local_14 < param_1[local_c]) {
        local_14 = param_1[local_c];
        local_8 = local_c;
      }
    }
  }
  if (param_3 < 1) {
    param_3 = ~param_3 + 1;
  }
  if (local_14 < 1) {
    local_14 = ~local_14 + 1;
  }
  FUN_0040bbb0();
  FUN_0040bc10(local_10 + 0x189);
  FUN_0043c8d0(DAT_00679640, param_5, param_3);
  if ((param_2 !== local_8) &&
     ((((((DAT_0064c6c0[DAT_006d1da0 * 0x594 + local_8 * 4]) & 0x80) !== 0 ||
        (iVar1 = FUN_00453e51(DAT_006d1da0, 0x18), iVar1 !== 0)) ||
       (iVar1 = FUN_00453e51(DAT_006d1da0, 9), iVar1 !== 0)) ||
      (((DAT_00655b07 !== '\0' || (iVar1 = FUN_00453e51(param_2, 9), iVar1 !== 0)) ||
       (iVar1 = FUN_00453e51(param_2, 0x18), iVar1 !== 0)))))) {
    FUN_0040bbb0();
    FUN_0040fea0();
    uVar2 = FUN_00493c7d(local_8);
    FUN_0040bbe0(uVar2);
    FUN_0040bbe0('');
    FUN_0043c870(local_14);
    FUN_0040bbe0(param_4);
    FUN_0040fed0();
    uVar2 = FUN_0043cb30(local_8, 0x12, 1, 1);
    FUN_005baee0(uVar2);
    FUN_0043c950(DAT_00679640, param_5, param_3, param_6 - param_5);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00433434 — draw demographics report content
// ═══════════════════════════════════════════════════════════════════
export function FUN_00433434() {
  // Large demographics drawing function - mostly UI
  // Mechanical stub that preserves the computation logic
  let iVar1 = DAT_0063ef6c;
  let aiStack_1f0 = new Array(8).fill(0);
  let aiStack_1d0 = new Array(8).fill(0);
  let aiStack_19c = new Array(8).fill(0);
  let aiStack_174 = new Array(8).fill(0);
  let aiStack_12c = new Array(8).fill(0);
  let aiStack_10c = new Array(8).fill(0);
  let aiStack_154 = new Array(8).fill(0);
  let aiStack_6c = new Array(8).fill(1);
  let aiStack_4c = new Array(8).fill(0);
  let aiStack_28 = new Array(8).fill(0);
  let local_e4 = new Array(8).fill(0);
  let local_e8;
  let local_134;
  let iVar2, iVar4;

  // Count land tiles per civ
  let local_130 = DAT_00636598 + 5;
  for (let local_c4 = 0; local_c4 < DAT_006d1164; local_c4 = local_c4 + 1) {
    local_e8 = u8(local_130) >> 4;
    if (local_e8 < 8) {
      aiStack_1d0[local_e8] = aiStack_1d0[local_e8] + 1;
    }
    local_130 = local_130 + 6;
  }

  // Aggregate city data per civ
  for (let local_1a4 = 0; local_1a4 < DAT_00655b18; local_1a4 = local_1a4 + 1) {
    if (DAT_0064f394[(local_1a4 * 0x58) / 4] !== 0) {
      local_e8 = s8(DAT_0064f348[local_1a4 * 0x58]);
      FUN_004eb4ed(local_1a4, 1);
      aiStack_6c[local_e8] = aiStack_6c[local_e8] + s8(DAT_0064f349[local_1a4 * 0x58]);
      aiStack_19c[local_e8] = aiStack_19c[local_e8] +
           ((s8(DAT_0064f349[local_1a4 * 0x58]) + DAT_006a6550) - DAT_006a65a8);
      aiStack_12c[local_e8] = aiStack_12c[local_e8] + DAT_006a65fc * 2 + DAT_006a6554;
      aiStack_174[local_e8] = aiStack_174[local_e8] + DAT_006a65c8 + s8(DAT_0064f349[local_1a4 * 0x58]) * -2;
      aiStack_10c[local_e8] = aiStack_10c[local_e8] + DAT_006a65cc + DAT_006a65d0 + DAT_006a65c8;
      aiStack_154[local_e8] = aiStack_154[local_e8] + DAT_006a65cc;
      if (DAT_006a65f8 < 2) {
        DAT_006a65f8 = 1;
      }
      local_134 = ((DAT_006a65cc / DAT_006a65f8) | 0) - 0x14 +
                  ((s8(DAT_0064f349[local_1a4 * 0x58]) * DAT_006a65c4 +
                    ((s8(DAT_0064f349[local_1a4 * 0x58]) * DAT_006a65c4) >> 31 & 3)) >> 2);
      if (0 < local_134) {
        aiStack_1f0[local_e8] = aiStack_1f0[local_e8] + local_134;
      }
      iVar2 = FUN_0043d20a(local_1a4, 3);
      if ((iVar2 !== 0) || (iVar2 = FUN_00453e51(local_e8, 0), iVar2 !== 0)) {
        aiStack_4c[local_e8] = aiStack_4c[local_e8] + s8(DAT_0064f349[local_1a4 * 0x58]);
      }
      iVar2 = FUN_0043d20a(local_1a4, 9);
      if (iVar2 !== 0) {
        aiStack_4c[local_e8] = aiStack_4c[local_e8] + s8(DAT_0064f349[local_1a4 * 0x58]);
      }
      iVar2 = FUN_0043d20a(local_1a4, 0x17);
      if (iVar2 !== 0) {
        aiStack_4c[local_e8] = aiStack_4c[local_e8] + s8(DAT_0064f349[local_1a4 * 0x58]);
      }
      iVar2 = FUN_0043d20a(local_1a4, 6);
      if (iVar2 !== 0) {
        aiStack_28[local_e8] = aiStack_28[local_e8] + s8(DAT_0064f349[local_1a4 * 0x58]);
      }
      iVar2 = FUN_0043d20a(local_1a4, 0xc);
      if (iVar2 !== 0) {
        aiStack_28[local_e8] = aiStack_28[local_e8] + s8(DAT_0064f349[local_1a4 * 0x58]);
      }
    }
  }

  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  let local_1a8 = DAT_0063ec38 + 2;
  let local_1b0 = DAT_0063ec38 + 0x174;
  // _Timevec::~_Timevec — get font height
  let local_70 = 16; // extraout_EAX placeholder
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  if (DAT_00628064 === 0) {
    let uVar3 = FUN_00410070(iVar1);
    FUN_0040bbe0(uVar3);
    FUN_0040fe10();
  }
  let uVar3 = FUN_00428b0c(DAT_00628420 + 0x558);
  FUN_0040bbe0(uVar3);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_1a8, DAT_0063ec3c);
  iVar2 = local_1a8 + local_70 + 10;
  local_70 = 0x19;
  DAT_0063ef80 = 0x19;
  _DAT_0063ef7c = local_1b0 - iVar2;
  let local_ec = 0x25;
  let local_178 = DAT_0063ec34 + 2;
  let local_17c = DAT_0063ec34 + 0xb4;
  let local_1a0 = DAT_0063ec34 + 0x142;
  let local_1ac = DAT_0063ec3c + local_178 - 4;
  let local_2c = DAT_0063ec34 + 2;
  let local_8 = DAT_0063ec3c + DAT_0063ec34 - 2;
  _DAT_0063ef78 = iVar2;
  local_1a8 = iVar2;

  // Section 1: Approval rating
  FUN_005baee0(0x25, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5d4);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    iVar4 = aiStack_6c[local_e8];
    if (iVar4 < 2) {
      iVar4 = 1;
    }
    local_e4[local_e8] = ((aiStack_19c[local_e8] * 0x32) / iVar4) | 0;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040fe70();
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_00626048, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 2: Disease (via FUN_0043cce5)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5d8);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    iVar4 = FUN_0043cce5(local_e8);
    local_e4[local_e8] = iVar4;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043ca50(local_e8, -1);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_0062604c, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 3: Literacy (aiStack_12c = GNP accumulator)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5dc);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] = aiStack_12c[local_e8];
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040fe10();
      FUN_0040bc10(0x188);
      FUN_0040fe10();
      FUN_0040bbe0(DAT_00626054);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_00626058, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 4: Manufacturing (aiStack_154)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5e0);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] = aiStack_154[local_e8];
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040fe10();
      FUN_0040bc10(0x182);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  let local_c0 = '';
  FUN_004aef20(local_c0);
  FUN_004af14b(local_c0, 0x182);
  FUN_004331d1(local_e4, iVar1, iVar2, local_c0, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 5: Land area (aiStack_1d0)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5e4);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] = aiStack_1d0[local_e8];
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040bbe0(DAT_0062605c);
      FUN_0040bc10(0x183);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_00626064, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 6: Life expectancy
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5e8);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] =
         ((aiStack_6c[local_e8] * 2 + aiStack_28[local_e8]) * 2) / aiStack_6c[local_e8];
    iVar4 = FUN_004bd9f0(local_e8, 1);
    if (iVar4 !== 0) {
      local_e4[local_e8] = local_e4[local_e8] << 1;
    }
    iVar4 = FUN_004bd9f0(local_e8, 0x58);
    if (iVar4 !== 0) {
      local_e4[local_e8] = local_e4[local_e8] << 1;
    }
    iVar4 = FUN_004bd9f0(local_e8, 0x2b);
    if (iVar4 !== 0) {
      local_e4[local_e8] = local_e4[local_e8] << 1;
    }
    iVar4 = FUN_004bd9f0(local_e8, 0x55);
    if (iVar4 !== 0) {
      local_e4[local_e8] = local_e4[local_e8] << 1;
    }
    iVar4 = FUN_005adfa0(local_e4[local_e8], 0, 100);
    local_e4[local_e8] = iVar4;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040fe70();
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_0062606c, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 7: Family size (disease)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5ec);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] =
         ((aiStack_6c[local_e8] * 0x32) / (aiStack_4c[local_e8] + aiStack_6c[local_e8])) | 0;
    iVar4 = FUN_004bd9f0(local_e8, 0x32);
    if (iVar4 !== 0) {
      local_e4[local_e8] = (local_e4[local_e8] / 2) | 0;
    }
    iVar4 = FUN_00453e51(local_e8, 0x1b);
    if (iVar4 !== 0) {
      local_e4[local_e8] = (local_e4[local_e8] / 2) | 0;
    }
    aiStack_4c[local_e8] = (0x708 / (local_e4[local_e8] + 0x14)) | 0;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040fe70();
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, -iVar2, DAT_00626070, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 8: GNP (aiStack_1f0 = literacy accumulator)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5f0);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] = aiStack_1f0[local_e8];
    aiStack_4c[local_e8] =
         aiStack_4c[local_e8] - (((aiStack_1f0[local_e8] * 10) / aiStack_6c[local_e8]) | 0);
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040bbe0(DAT_00626074);
      FUN_0040bc10(0x184);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  local_c0 = '';
  FUN_004aef20(local_c0);
  FUN_0043c840(local_c0, DAT_00626078);
  FUN_004af14b(local_c0, 0x184);
  FUN_004331d1(local_e4, iVar1, -iVar2, local_c0, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 9: Military service
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5f4);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    iVar4 = FUN_005adfa0(aiStack_4c[local_e8], 0x14, 99);
    local_e4[local_e8] = iVar4;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040fe10();
      FUN_0040bc10(0x185);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  local_c0 = '';
  FUN_004aef20(local_c0);
  FUN_004af14b(local_c0, 0x186);
  FUN_004331d1(local_e4, iVar1, iVar2, local_c0, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 10: Pollution (aiStack_174)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5f8);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] = ((aiStack_174[local_e8] * 0x28) / aiStack_6c[local_e8]) + 0x14;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870((local_e4[local_e8] / 10) | 0);
      FUN_0040bbe0(DAT_0062607c);
      FUN_0043c870(local_e4[local_e8] % 10);
      FUN_0040fe10();
      FUN_0040bc10(0x187);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
    local_e4[local_e8] = (local_e4[local_e8] / 10) | 0;
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_00626080, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 11a: Per-capita income (DAT_0064c706)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x5fc);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] = ((s16(DAT_0064c706, local_e8 * 0x594) * 10) / aiStack_6c[local_e8]) | 0;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040fe10();
      FUN_0040bc10(0x185);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, local_c0, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 11b: GNP per civ (with gov multiplier)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x600);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    if (aiStack_12c[local_e8] <
        ((30000 / (u8(DAT_0064c6b0[local_e8 * 0x594]) + 1)) | 0)) {
      local_e4[local_e8] =
           ((u8(DAT_0064c6b0[local_e8 * 0x594]) * aiStack_12c[local_e8]) /
           aiStack_6c[local_e8]) | 0;
    } else {
      local_e4[local_e8] =
           (((aiStack_12c[local_e8] / aiStack_6c[local_e8]) | 0) *
           u8(DAT_0064c6b0[local_e8 * 0x594]));
    }
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0040bbe0(DAT_00626084);
      FUN_0040bc10(0x189);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_00626088, local_1a0, local_1ac);
  FUN_005a97cc(null, local_2c, local_8, iVar2 + local_70 - 2, 99);
  iVar2 = iVar2 + local_70;

  // Section 11c: Total production (aiStack_10c)
  FUN_005baee0(local_ec, 0x12, -1, -1);
  uVar3 = FUN_00428b0c(DAT_00628420 + 0x604);
  FUN_0043c8d0(uVar3, local_178, iVar2);
  for (local_e8 = 1; local_e8 < 8; local_e8 = local_e8 + 1) {
    local_e4[local_e8] = ((aiStack_10c[local_e8] * 10) / aiStack_6c[local_e8]) | 0;
    if (local_e8 === iVar1) {
      FUN_0040bbb0();
      FUN_0043c870(local_e4[local_e8]);
      FUN_0043c8d0(DAT_00679640, local_17c, iVar2);
    }
  }
  FUN_004331d1(local_e4, iVar1, iVar2, DAT_0062608c, local_1a0, local_1ac);
  FUN_00408460();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00434d8a — show demographics dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00434d8a(param_1) {
  // thunk_show_credits(9,9,1,600,400,0,0)
  DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(null, 0x401cda);
  FUN_005bb574();
  FUN_004085f0();
  if (2 < DAT_00655b02) {
    CPropertySheet_EnableStackedTabs(null, 0x402789);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  CPropertySheet_EnableStackedTabs(null, 0);
  FUN_0042a768();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00434e39 — draw attitude advisor / spaceship content
// ═══════════════════════════════════════════════════════════════════
export function FUN_00434e39() {
  let extraout_EAX;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let uVar1;
  let iVar2;
  let local_70 = DAT_0063ef6c;

  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  let local_5c = DAT_0063ec38 + 2;
  let local_64 = DAT_0063ec38 + 0x174;
  // _Timevec::~_Timevec — get font height
  extraout_EAX = 16; // placeholder
  let local_10 = extraout_EAX;
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar1 = FUN_00428b0c(DAT_00628420 + 0x55c);
  FUN_0040bbe0(uVar1);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
  local_5c = local_5c + local_10;
  FUN_005baec8(DAT_0063eab8);
  // _Timevec::~_Timevec
  extraout_EAX_00 = 14; // placeholder
  local_10 = extraout_EAX_00;
  FUN_0040bbb0();
  uVar1 = FUN_00493ba6(local_70);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  uVar1 = FUN_00493b10(local_70);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar1 = FUN_00493c7d(local_70);
  FUN_0040bbe0(uVar1);
  FUN_00421d30();
  FUN_00421f10(DAT_00655afa);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
  _DAT_0063ef78 = local_5c + local_10 + 4;
  DAT_0063ef80 = local_10;
  _DAT_0063ef7c = local_64 - _DAT_0063ef78;
  let local_60 = DAT_0063ec34 + 2;
  let local_6c = _DAT_0063ef78;

  if ((DAT_00655af0 & 0x20) === 0) {
    if (((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 2) === 0)) {
      // Attitude advisor — people display
      local_5c = _DAT_0063ef78;
      let local_c = FUN_00448f92(local_70);
      let local_38 = local_6c;
      let local_34 = local_60;
      let local_44 = 0;
      let local_20 = 0;
      let local_50 = 0;
      let local_18 = 0x12;
      let local_8 = 0x14;
      let local_14 = 0;
      for (let local_54 = 0; local_54 < DAT_00655b18; local_54 = local_54 + 1) {
        if ((DAT_0064f394[(local_54 * 0x58) / 4] !== 0) &&
           (s8(DAT_0064f348[local_54 * 0x58]) === local_70)) {
          FUN_004eb4ed(local_54, 1);
          let local_4c = DAT_006a6550;
          let local_2c = DAT_006a65a8;
          let local_68_att = (s8(DAT_0064f349[local_54 * 0x58]) - DAT_006a6550 - DAT_006a65a8 -
                       DAT_006a6604 - DAT_006a659c);
          for (let local_30 = 0; local_30 < s8(DAT_0064f349[local_54 * 0x58]);
              local_30 = local_30 + 1) {
            let local_58;
            if (local_30 < local_4c) {
              local_58 = local_44 & 1;
            } else if (local_30 - local_4c < local_68_att) {
              local_58 = (local_44 & 1) + 2;
            } else if ((local_30 - local_4c) - local_68_att < local_2c) {
              local_58 = (local_44 & 1) + 4;
            } else if (((local_30 - local_4c) - local_68_att) - local_2c < DAT_006a659c) {
              local_58 = (local_44 & 1) + 6;
            } else {
              iVar2 = FUN_004e75a6(local_54,
                  ((local_30 - local_4c) - local_68_att) - local_2c - DAT_006a659c);
              local_58 = iVar2 + 7;
            }
            local_44 = local_44 + 1;
            FUN_005cef31({}, null, local_34, local_38);
            local_14 = 0;
            local_34 = local_34 + local_8;
            local_50 = local_50 + 1;
            if (DAT_0063ec3c + DAT_0063ec34 - 0x1d < local_34) {
              local_50 = 0;
              local_20 = local_20 + 1;
              local_14 = 1;
              local_34 = (((local_8 / 2) | 0) * (local_20 & 1)) + local_60;
              local_38 = local_38 + local_18;
              if (6 < local_20 || 0xf0 < local_38) break;
            }
          }
        }
      }
      // LAB_004355c2
      if (local_14 !== 0) {
        local_38 = local_38 - local_18;
      }
      local_6c = local_38 + 0x22;
      FUN_004a28b0(local_70);
      FUN_0040bbb0();
      if (DAT_00628064 !== 1) {
        uVar1 = FUN_00410070(local_70);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
      }
      FUN_0040bc10(0x193);
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040ff30(DAT_00673f78);
      FUN_0040fed0();
      FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      local_6c = local_6c + local_10 + 4;
      local_34 = local_60;
      local_50 = 0;
      local_14 = 0;
      local_38 = local_6c;

      // Wonder display section
      let local_54_w; // declared before loop to avoid temporal dead zone
      for (let local_28 = 0; local_28 < 0x1c; local_28 = local_28 + 1) {
        if (((DAT_00655be6[local_28] >= 0) &&
             (DAT_00655be6[local_28] < DAT_00655b18)) &&
            (DAT_0064f394[(DAT_00655be6[local_28] * 0x58) / 4] !== 0) &&
            (local_54_w = DAT_00655be6[local_28],
             s8(DAT_0064f348[local_54_w * 0x58]) === local_70)) {
          local_54_w = DAT_00655be6[local_28];
          FUN_005cef31({}, null, local_34, local_38);
          let local_40 = local_34 + 0x26;
          FUN_005baee0(0x5e, 0x12, -1, -1);
          uVar1 = FUN_00428b0c(DAT_0064c5c0[local_28 * 2]);
          FUN_0043c8d0(uVar1, local_40, local_38 + 3);
          local_14 = 0;
          local_50 = local_50 + 1;
          local_34 = local_34 + 0xc4;
          if (2 < local_50) {
            local_50 = 0;
            local_34 = local_60;
            local_38 = local_38 + 0x16;
            local_14 = 1;
            if (0x122 < local_38) break;
          }
        }
      }
      if (local_14 === 0) {
        local_38 = local_38 + 0x16;
      }
      local_6c = local_38 + 4;
      FUN_005baee0(0x25, 0x12, -1, -1);
      FUN_0040bbb0();
      if (DAT_00628064 !== 1) {
        uVar1 = FUN_00410070(local_70);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
      }
      FUN_0040bc10(0x194);
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040ff30(DAT_00673f5c);
      FUN_0040fed0();
      FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      local_6c = local_6c + local_10;
      if ((DAT_00673f60 !== 0) || (DAT_00673f84 !== 0)) {
        FUN_0040bbb0();
        FUN_0040bc10(0x195);
        FUN_0040fe40();
        FUN_0040fea0();
        if (DAT_00673f60 === 0) {
          FUN_0040ff30(DAT_00673f84);
          FUN_0040fe10();
          FUN_0040bc10(0x199);
        } else {
          FUN_0040ff30(DAT_00673f60);
        }
        FUN_0040fed0();
        FUN_0043c8d0(DAT_00679640, local_60, local_6c);
        local_6c = local_6c + local_10;
      }
      local_14 = 0;
      FUN_0040bbb0();
      if (DAT_00673f58 !== 0) {
        FUN_0040bc10(0x17c);
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040ff30(DAT_00673f58);
        FUN_0040fed0();
        FUN_0040bbe0(DAT_00626090);
        local_14 = 1;
      }
      if ((199 < DAT_00655af8) && (DAT_00673f8c !== 0)) {
        FUN_0040bc10(0x196);
        FUN_0040fe40();
        FUN_0040fea0();
        FUN_0040bbe0(DAT_00626098);
        FUN_0040ff30(DAT_00673f8c);
        FUN_0040fed0();
        FUN_0040bbe0(DAT_0062609c);
        local_14 = 1;
      }
      if (DAT_00673f6c !== 0) {
        FUN_0040ff00(DAT_00627c14);
        FUN_0040fe40();
        FUN_0040fea0();
        FUN_0040bbe0(DAT_006260a4);
        FUN_0040ff30(DAT_00673f6c);
        FUN_0040fed0();
        FUN_0040bbe0(DAT_006260a8);
        local_14 = 1;
      }
      FUN_0040bc10(0xf);
      FUN_0040fe40();
      FUN_0040fea0();
      if (-1 < DAT_00673f74) {
        FUN_0040bbe0(DAT_006260b0);
      }
      FUN_0040ff30(DAT_00673f74);
      FUN_0040fed0();
      local_14 = 1;
      FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      local_6c = local_6c + local_10;
    } else {
      // Spaceship display
      local_6c = local_5c + local_10 + 0x2a;
      local_5c = _DAT_0063ef78;
      FUN_004a28b0(local_70);
      FUN_0040bbb0();
      FUN_0040bc10(0x1b1);
      FUN_0040fe40();
      FUN_0040ff30(DAT_00673f70);
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
      local_6c = local_6c + local_10;
      if (DAT_0064bcba !== 0) {
        FUN_0040bbb0();
        uVar1 = FUN_00410070(DAT_0064bcba);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        FUN_0040bc10(0x1b2);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f64);
        FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
        local_6c = local_6c + local_10;
      }
      if ((DAT_0064bcba === 0) || (DAT_0064bcba !== local_70)) {
        FUN_0040bbb0();
        uVar1 = FUN_00410070(local_70);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        FUN_0040bc10(0x1b2);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f80);
        FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
        local_6c = local_6c + local_10;
      }
      let local_24;
      if (DAT_0064bcba === 0) {
        local_24 = local_70;
      } else {
        local_24 = DAT_0064bcba;
      }
      local_6c = local_6c + 6;
      FUN_005baee0(0x5e, 0x12, 1, 1);
      for (let local_3c = 0; local_3c < 4; local_3c = local_3c + 1) {
        FUN_0040bbb0();
        uVar1 = FUN_00410070(local_24);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        if (local_3c === 0) {
          FUN_0040bc10(0x1b3);
        } else if (local_3c === 1) {
          FUN_0040bc10(0x1b4);
        } else if (local_3c === 2) {
          FUN_0040bc10(0x1b6);
        } else if (local_3c === 3) {
          FUN_0040bc10(0x1b7);
        }
        FUN_0040fe40();
        FUN_0040ff30(DAT_0064bcbc[local_3c]);
        FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
        local_6c = local_6c + local_10;
      }
      local_6c = local_6c + 6;
      FUN_005baee0(0x7a, 0x12, 1, 1);
      FUN_005baec8(DAT_0063eac0);
      // _Timevec::~_Timevec
      extraout_EAX_01 = 16; // placeholder
      local_10 = extraout_EAX_01;
      FUN_0040bbb0();
      uVar1 = FUN_00410070(local_24);
      FUN_0040bbe0(uVar1);
      FUN_0040fe10();
      FUN_0040bc10(DAT_00673f54 + 0x1b3);
      FUN_0043c910(DAT_00679640, DAT_0063ec34, local_6c, DAT_0063ec3c);
      local_6c = local_6c + local_10 + 6;
    }

    // Score comparison section
    let local_1c = 0;
    let local_48 = 0;
    if (((DAT_00655af0 & 0x80) !== 0) && ((DAT_0064bc60 & 2) !== 0)) {
      DAT_00673f7c = -1;
      DAT_00673f88 = DAT_00673f68;
      local_1c = 1;
    }
    let local_34_sc = local_60;
    while (true) {
      FUN_005baec8(DAT_0063eac0);
      FUN_0040bbb0();
      if (DAT_00673f88 < DAT_00673f7c) {
        FUN_0040bc10(0x198);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f7c);
      } else {
        FUN_0040bc10(0x197);
        FUN_0040fe40();
        FUN_0040ff30(DAT_00673f88);
      }
      if (local_1c === 1) {
        iVar2 = FUN_0040efd0(DAT_00679640);
        local_48 = local_48 + iVar2;
      } else {
        FUN_005baee0(0x25, 0x12, 1, 1);
        local_34_sc = FUN_0043c8d0(DAT_00679640, local_60, local_6c);
      }
      if ((DAT_00655af0 & 0x80) !== 0) {
        local_34_sc = local_34_sc + 0x19;
        FUN_005baee0(0x7a, 0x12, -1, -1);
        FUN_0040bbb0();
        FUN_0040bc10(0x1a2);
        if (local_1c === 1) {
          iVar2 = FUN_0040efd0(DAT_00679640);
          local_48 = local_48 + iVar2 + 0x19;
        } else {
          local_34_sc = FUN_0043c8d0(DAT_00679640, local_34_sc, local_6c);
        }
      }
      local_34_sc = local_34_sc + 0x19;
      if ((DAT_00655af0 & 0x10) !== 0) {
        FUN_005baee0(0x6a, 0x12, -1, -1);
        FUN_0040bbb0();
        FUN_0040bc10(0x19a);
        if (local_1c === 1) {
          iVar2 = FUN_0040efd0(DAT_00679640);
          local_48 = local_48 + iVar2 + 0x19;
        } else {
          FUN_0043c8d0(DAT_00679640, local_34_sc, local_6c);
        }
      }
      if (local_1c !== 1) break;
      local_60 = ((DAT_0063ec3c >> 1) + DAT_0063ec34) - (local_48 >> 1);
      local_1c = 2;
    }
  } else {
    // "No information" case
    local_5c = _DAT_0063ef78;
    FUN_0040bbb0();
    FUN_0040bc10(0x1c9);
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_5c, DAT_0063ec3c);
  }
  FUN_00408460();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00435d15 — show attitude advisor dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00435d15(param_1) {
  // thunk_show_credits(10,10,1,600,400,0,0)
  DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(null, 0x402428);
  FUN_005bb574();
  FUN_004085f0();
  if (2 < DAT_00655b02) {
    CPropertySheet_EnableStackedTabs(null, 0x402789);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  CPropertySheet_EnableStackedTabs(null, 0);
  FUN_0042a768();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00435dc4 — draw hall of fame / score content
// ═══════════════════════════════════════════════════════════════════
export function FUN_00435dc4() {
  // Score/fame calculation and display
  let iVar1 = DAT_0063ef6c;
  let extraout_EAX;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let local_10;
  let local_68;
  let local_74;
  let local_8;

  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  let iVar2 = DAT_0063ec38 + 1;
  let local_80 = DAT_0063ec38 + 0x174;
  extraout_EAX = 16; // placeholder (font height)
  local_10 = extraout_EAX - 3;
  local_68 = DAT_00655b08 + 4;
  if (2 < DAT_00655b08) {
    local_68 = DAT_00655b08 + 5;
  }
  if (3 < DAT_00655b08) {
    local_68 = local_68 + 1;
  }
  if (4 < DAT_00655b08) {
    local_68 = local_68 + 2;
  }
  local_8 = DAT_00673f88;
  if (DAT_00673f88 <= DAT_00673f7c) {
    local_8 = DAT_00673f7c;
  }
  let iVar3 = ((local_68 * local_8) / 100) | 0;
  local_74 = 0;
  for (let local_64 = 1; local_64 < 0x19; local_64 = local_64 + 1) {
    if ((((local_64 * local_64) / 3) | 0) <= iVar3) {
      local_74 = local_64 - 1;
    }
  }
  if (0x17 < local_74) {
    local_74 = 0x17;
  }
  DAT_0063e4ec = local_74;
  DAT_0063ea18 = iVar3;

  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  let uVar4 = FUN_00428b0c(DAT_00628420 + 0x670);
  FUN_0040bbe0(uVar4);
  FUN_0040fe40();
  FUN_0040ff30(iVar3);
  FUN_0040bbe0(DAT_006260b4);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar2, DAT_0063ec3c);
  iVar2 = iVar2 + local_10;
  FUN_0040bbb0();
  FUN_0040bc10(0x19d);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar2, DAT_0063ec3c);
  iVar2 = iVar2 + local_10;
  FUN_0040bbb0();
  FUN_0040bc10(0x19e);
  FUN_0043c910(DAT_00679640, DAT_0063ec34, iVar2, DAT_0063ec3c);
  _DAT_0063ef78 = iVar2 + local_10 + 4;
  DAT_0063ef80 = local_10;
  _DAT_0063ef7c = local_80 - _DAT_0063ef78;

  // Fame title lookup from CITY.TXT
  let local_60 = '';
  if (DAT_006554fc[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] === 0) {
    FUN_005f22d0(local_60, 'MALEFAME');
  } else {
    FUN_005f22d0(local_60, 'FEMALEFAME');
  }
  let local_c = FUN_004a2379(DAT_006558e8, local_60);
  uVar4 = FUN_00493b10(iVar1);
  FUN_0040ff60(0, uVar4);
  for (let local_64 = 0; local_64 <= local_74; local_64 = local_64 + 1) {
    if (local_c === 0) {
      FUN_004a23fc(1);
      FUN_005f22d0(local_60, DAT_00679640);
    } else if (local_74 === local_64) {
      FUN_005f22d0(local_60, '%STRING0');
    } else {
      FUN_005f22d0(local_60, 'Error');
    }
    FUN_00426ff0(local_60, DAT_00679640);
    if (local_64 < local_74) {
      FUN_005baec8(DAT_0063eac0); // DAT_0063e4e0
      FUN_005baee0(0x1d, 0x12, -1, -1);
      extraout_EAX_00 = 12; // placeholder
      local_10 = extraout_EAX_00 - 3;
    } else {
      FUN_005baec8(DAT_0063eac0); // DAT_0063eac0
      extraout_EAX_01 = 16; // placeholder
      local_10 = extraout_EAX_01 - 4;
      FUN_005baee0(0x25, 0x12, -1, -1);
    }
    local_80 = local_80 - local_10;
    FUN_0043c910(DAT_00679640, DAT_0063ec34, local_80, DAT_0063ec3c);
  }
  FUN_00408460();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004361cc — show score dialog with sound
// ═══════════════════════════════════════════════════════════════════
export function FUN_004361cc(param_1) {
  // thunk_show_credits(10,10,1,600,400,0,0)
  DAT_0063ef6c = param_1;
  FUN_0042acb0();
  CPropertySheet_EnableStackedTabs(null, 0x402432);
  FUN_005bb574();
  FUN_0046e571(3, 0);
  FUN_004085f0();
  if (2 < DAT_00655b02) {
    CPropertySheet_EnableStackedTabs(null, 0x402789);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  CPropertySheet_EnableStackedTabs(null, 0);
  FUN_0042a768();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00436287 — check if dialog needs refresh
// ═══════════════════════════════════════════════════════════════════
export function FUN_00436287(param_1) {
  if (param_1 === 0xc) {
    if (DAT_0063e948 === 0xc) {
      FUN_005bb574();
    }
  } else if (DAT_0063ef60 === param_1) {
    FUN_005bb574();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004362e2 — draw hall of fame entries
// ═══════════════════════════════════════════════════════════════════
export function FUN_004362e2() {
  // Hall of fame drawing - mostly UI code
  let iVar1 = DAT_0063efac;
  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  FUN_005baeb0(DAT_0063eb10);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  // ... (extensive UI drawing for each HoF entry)
  FUN_00408460();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00436b92 — set report page to 1 and invalidate
// ═══════════════════════════════════════════════════════════════════
export function FUN_00436b92() {
  DAT_0063ef6c = 1;
  CRichEditDoc_InvalidateObjectCache(null);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00436bb7 — show hall of fame dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00436bb7(param_1) {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14 = new Uint8Array(16);

  FUN_00436e28();
  // thunk_show_credits(8,8,1,600,400,0,0)
  DAT_0063efac = param_1;
  DAT_0063ef6c = 0;
  if (param_1 < 0) {
    FUN_0042acb0();
  } else {
    FUN_004086c0(local_14, 2, 0, 0x129, 0x18);
    iVar1 = DAT_0063ec38;
    iVar2 = FUN_00407fc0(local_14);
    FUN_0043c790(local_14, DAT_0063ec34, (iVar1 - iVar2) + 0x18e);
    FUN_0043c790(local_14, 299, 0);
    uVar3 = FUN_00428b0c(DAT_00628420 + 0x51c);
    FUN_0040f680(null, 100, local_14, uVar3);
    FUN_0040f880(null);
    FUN_0040f7d0();
    FUN_0040f840();
    FUN_0043c790(local_14, -299, 0);
    uVar3 = FUN_00428b0c(DAT_00628420 + 0x6f8);
    FUN_0040f680(null, 0x65, local_14, uVar3);
    FUN_0040f880(null);
  }
  CPropertySheet_EnableStackedTabs(null, 0x402f4a);
  FUN_005bb574();
  FUN_004085f0();
  if (2 < DAT_00655b02) {
    CPropertySheet_EnableStackedTabs(null, 0x402789);
  }
  _DAT_00625ec0 = FUN_00421bb0();
  FUN_005c61b0();
  CPropertySheet_EnableStackedTabs(null, 0);
  FUN_0042a768();
  return DAT_0063ef6c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00436dd7 — initialize hall of fame data
// ═══════════════════════════════════════════════════════════════════
export function FUN_00436dd7() {
  for (let local_8 = 0; local_8 < 6; local_8 = local_8 + 1) {
    DAT_0063f0c8[local_8 * 0x48] = -1;
    DAT_0063f0da[local_8 * 0x48] = -1;
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00436e28 — load hall of fame from file
// ═══════════════════════════════════════════════════════════════════
export function FUN_00436e28() {
  FUN_00436dd7();
  // File I/O stubbed - would read HALLFAME.DAT
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00436ed2 — save hall of fame to file
// Source: decompiled/block_00430000.c FUN_00436ed2 (136 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00436ed2() {
  // DEVIATION: Win32 — file I/O (fopen/fwrite/fclose HALLFAME.DAT)
  // C: _File = _fopen(s_HALLFAME_DAT_00626138, &DAT_00626134);
  // C: if (_File != (FILE *)0x0) {
  // C:   local_8 = 0;
  // C:   while ((local_8 < 6 &&
  // C:          (sVar1 = _fwrite(&DAT_0063f0c8 + local_8 * 0x48, 0x48, 1, _File), sVar1 != 0))) {
  // C:     local_8 = local_8 + 1;
  // C:   }
  // C:   _fclose(_File);
  // C: }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00436f5a — update hall of fame with new entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00436f5a(param_1) {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  local_c = -1;
  iVar2 = DAT_00673f88;
  if (DAT_00673f88 <= DAT_00673f7c) {
    iVar2 = DAT_00673f7c;
  }
  _DAT_0063eac8 = iVar2;
  DAT_0063eaca = DAT_00655b08;
  if ((DAT_00655af0 & 0x10) !== 0) {
    DAT_0063eaca = DAT_0063eaca | 0x80;
  }
  _DAT_0063eacc = DAT_00655af8;
  _DAT_0063eace = DAT_00655afa;
  _DAT_0063ead0 = FUN_0043cce5(param_1);
  if (((DAT_00655af0 & 0x80) === 0) || ((DAT_0064bc60 & 2) === 0)) {
    _DAT_0063ead2 = 0xffff;
  } else {
    _DAT_0063ead2 = DAT_00673f80;
  }
  _DAT_0063ead4 = DAT_0064bcb4;
  _DAT_0063ead6 = DAT_0064bcb6;
  _DAT_0063ead8 = DAT_00655af0 & 0x80;
  DAT_0063eada = DAT_0063ea18;
  _DAT_0063eadc = u8(DAT_006554fc[DAT_0064c6a6[(param_1 * 0x594) / 2] * 0x30]);
  _DAT_0063eade = DAT_0063e4ec;
  uVar1 = FUN_00493b10(param_1);
  FUN_005f22d0(null, uVar1);
  uVar1 = FUN_00493c7d(param_1);
  FUN_005f22d0(null, uVar1);
  FUN_00436e28();
  _DAT_0063f230 = 0xffff;
  _DAT_0063f242 = 0xffff;
  do {
    local_8 = 0;
    while (true) {
      if (5 < local_8) {
        // goto LAB_00437186
        FUN_00436ed2();
        iVar2 = FUN_00436bb7(local_c);
        if (iVar2 === 0) {
          return;
        }
        FUN_00436dd7();
        break; // continue do-while
      }
      if (DAT_0063f0da[local_8 * 0x48] < DAT_0063eada) break;
      local_8 = local_8 + 1;
    }
    if (local_8 <= 5) {
      // Shift entries down: copy entry (local_10-1) to entry (local_10)
      // C: FID_conflict__memcpy(&DAT_0063f0c8 + local_10 * 0x48, &DAT_0063f0c8 + (local_10-1) * 0x48, 0x48)
      for (local_10 = 5; local_8 < local_10; local_10 = local_10 - 1) {
        DAT_0063f0c8[local_10 * 0x48] = DAT_0063f0c8[(local_10 - 1) * 0x48];
        DAT_0063f0ca[local_10 * 0x48] = DAT_0063f0ca[(local_10 - 1) * 0x48];
        DAT_0063f0cc[local_10 * 0x48] = DAT_0063f0cc[(local_10 - 1) * 0x48];
        DAT_0063f0ce[local_10 * 0x48] = DAT_0063f0ce[(local_10 - 1) * 0x48];
        DAT_0063f0d0[local_10 * 0x48] = DAT_0063f0d0[(local_10 - 1) * 0x48];
        DAT_0063f0d2[local_10 * 0x48] = DAT_0063f0d2[(local_10 - 1) * 0x48];
        DAT_0063f0d4[local_10 * 0x48] = DAT_0063f0d4[(local_10 - 1) * 0x48];
        DAT_0063f0d6[local_10 * 0x48] = DAT_0063f0d6[(local_10 - 1) * 0x48];
        DAT_0063f0d8[local_10 * 0x48] = DAT_0063f0d8[(local_10 - 1) * 0x48];
        DAT_0063f0da[local_10 * 0x48] = DAT_0063f0da[(local_10 - 1) * 0x48];
        DAT_0063f0dc[local_10 * 0x48] = DAT_0063f0dc[(local_10 - 1) * 0x48];
        DAT_0063f0de[local_10 * 0x48] = DAT_0063f0de[(local_10 - 1) * 0x48];
      }
      // Insert new entry at position local_8
      // C: FID_conflict__memcpy(&DAT_0063f0c8 + local_8 * 0x48, &DAT_0063eac8, 0x48)
      DAT_0063f0c8[local_8 * 0x48] = _DAT_0063eac8;
      DAT_0063f0ca[local_8 * 0x48] = DAT_0063eaca;
      DAT_0063f0cc[local_8 * 0x48] = _DAT_0063eacc;
      DAT_0063f0ce[local_8 * 0x48] = _DAT_0063eace;
      DAT_0063f0d0[local_8 * 0x48] = _DAT_0063ead0;
      DAT_0063f0d2[local_8 * 0x48] = _DAT_0063ead2;
      DAT_0063f0d4[local_8 * 0x48] = _DAT_0063ead4;
      DAT_0063f0d6[local_8 * 0x48] = _DAT_0063ead6;
      DAT_0063f0d8[local_8 * 0x48] = _DAT_0063ead8;
      DAT_0063f0da[local_8 * 0x48] = DAT_0063eada;
      DAT_0063f0dc[local_8 * 0x48] = _DAT_0063eadc;
      DAT_0063f0de[local_8 * 0x48] = _DAT_0063eade;
      local_c = local_8;
      FUN_00436ed2();
      iVar2 = FUN_00436bb7(local_c);
      if (iVar2 === 0) {
        return;
      }
      FUN_00436dd7();
    }
  } while (true);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004371b3 — init replay
// ═══════════════════════════════════════════════════════════════════
export function FUN_004371b3() {
  FUN_004371c8();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004371c8 — cleanup replay data
// ═══════════════════════════════════════════════════════════════════
export function FUN_004371c8() {
  FUN_00428cb0();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004371e2 — init credits memory pool
// ═══════════════════════════════════════════════════════════════════
export function FUN_004371e2(param_1) {
  FUN_00497ea0(null, 2, param_1);
  DAT_00625ec8 = 0;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043720f — free credits memory pool
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043720f() {
  FUN_004980ec(null);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043722c — add string to credits pool
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043722c(param_1) {
  let iVar1;

  let uVar3 = FUN_00498159(null, param_1.length + 1);
  FUN_005f22d0(uVar3, param_1);
  iVar1 = DAT_00625ec8;
  DAT_00625ec8 = DAT_00625ec8 + 1;
  return iVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437284 — get string from credits pool by index
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437284(param_1) {
  let local_8 = DAT_0063f040;
  // Walk through null-terminated strings
  for (; param_1 !== 0; param_1 = param_1 - 1) {
    while (local_8 && local_8[0] !== '\0') {
      local_8 = local_8 + 1;
    }
    local_8 = local_8 + 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004372cd — load credits from text file
// ═══════════════════════════════════════════════════════════════════
export function FUN_004372cd(param_1) {
  let iVar1;
  let local_8 = 1;

  switch (param_1) {
    case 0:
      iVar1 = FUN_004a2379('CREDITS', 'CREDITS');
      break;
    case 1:
      iVar1 = FUN_004a2379('MPCREDITS', 'CREDITS');
      break;
    case 2:
      iVar1 = FUN_004a2379('FCREDITS', 'CREDITS');
      if (iVar1 !== 0) {
        return 1;
      }
      // fall through to read loop
      while ((iVar1 = FUN_004a23fc(1), iVar1 !== 0 && (DAT_00679640 !== '@'))) {
        FUN_0043722c(DAT_00679640);
      }
      local_8 = 0;
      return local_8;
    case 3:
      iVar1 = FUN_004a2379('SCREDITS', 'CREDITS');
      if (iVar1 !== 0) {
        return 1;
      }
      while ((iVar1 = FUN_004a23fc(1), iVar1 !== 0 && (DAT_00679640 !== '@'))) {
        FUN_0043722c(DAT_00679640);
      }
      local_8 = 0;
      return local_8;
    default:
      return local_8;
  }
  if (iVar1 === 0) {
    while ((iVar1 = FUN_004a23fc(1), iVar1 !== 0 && (DAT_00679640 !== '@'))) {
      FUN_0043722c(DAT_00679640);
    }
    local_8 = 0;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043742f — draw credits page
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043742f(param_1) {
  // Credits drawing function - mostly UI code
  if (DAT_00625ed0 === 0) {
    param_1 = 1;
  }
  if (param_1 === 0) {
    // Partial redraw
  } else {
    FUN_00552ed2();
    FUN_0042ac18();
  }
  // ... (extensive drawing code stubbed)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437a10 — refresh credits display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437a10() {
  FUN_0043742f(1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437a2a — scroll credits and redraw
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437a2a() {
  DAT_00625ecc = DAT_00625ecc + 1;
  FUN_0043742f(0);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437a4a — show credits dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437a4a(param_1) {
  let iVar1;
  let local_c = -1;

  FUN_004371e2(0x1000);
  for (let local_8 = 0; local_8 < 0x1e; local_8 = local_8 + 1) {
    DAT_0063efb8[local_8 * 4] = 0;
    DAT_0063ea28[local_8 * 4] = -1;
  }
  iVar1 = FUN_004372cd(param_1);
  if (iVar1 === 0) {
    DAT_00625ecc = 0;
    DAT_00625ed0 = 0;
    DAT_0063ef6c = 0;
    // thunk_show_credits
    FUN_0042acb0();
    CPropertySheet_EnableStackedTabs(null, 0x401c6c);
    FUN_0046e571(3, 0);
    FUN_005bb574();
    FUN_004085f0();
    FUN_00484d52();
    local_c = FUN_005d1f50(null, 0x32, -1);
    if (2 < DAT_00655b02) {
      CPropertySheet_EnableStackedTabs(null, 0x402789);
    }
    _DAT_00625ec0 = FUN_00421bb0();
    FUN_005c61b0();
    CPropertySheet_EnableStackedTabs(null, 0);
    FUN_0042a768();
  }
  for (let local_8 = 0; local_8 < 0x1e; local_8 = local_8 + 1) {
    if (DAT_0063ea28[local_8 * 4] >= 0) {
      if (DAT_0063efb8[local_8 * 4] !== 0) {
        FUN_0043cbb0(1);
      }
      DAT_0063efb8[local_8 * 4] = 0;
      DAT_0063ea28[local_8 * 4] = -1;
    }
  }
  if (local_c >= 0) {
    FUN_005d2004(local_c);
  }
  FUN_0043720f();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437c6f — invalidate display
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437c6f() {
  CRichEditDoc_InvalidateObjectCache(null);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437c8a — credits auto-scroll timer handler
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437c8a() {
  let iVar1;

  FUN_0047e94e(1, 0);
  iVar1 = FUN_00421bb0();
  if (0x4b0 < iVar1 - _DAT_00625ec0) {
    FUN_00437c6f();
    _DAT_00625ec0 = FUN_00421bb0();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437ccd — set military advisor scroll and redraw
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437ccd(param_1) {
  DAT_0063e958 = param_1;
  FUN_00437cea();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00437cea — draw military advisor / battle log content
// ═══════════════════════════════════════════════════════════════════
export function FUN_00437cea() {
  let iVar1 = DAT_0063e954;
  let iVar2, iVar3, iVar5, iVar6, iVar7, iVar8, iVar9;
  let uVar4;
  let sVar10;

  FUN_00552ed2();
  FUN_00552112();
  FUN_0042ac18();
  iVar2 = DAT_0063e620 + 2;
  iVar3 = DAT_0063e620 + 0x174;
  // _Timevec::~_Timevec
  let extraout_EAX = 16; // placeholder (font height)
  FUN_005baeb0(DAT_0063e4f8);
  FUN_005baec8(DAT_0063eac0);
  FUN_005baee0(0x25, 0x12, 2, 1);
  FUN_0040bbb0();
  uVar4 = FUN_00428b0c(DAT_00628420 + 0x53c);
  FUN_0040bbe0(uVar4);
  FUN_0040fe40();
  uVar4 = FUN_00428b0c(DAT_00628420 + 0xda0);
  FUN_0040bbe0(uVar4);
  FUN_0043c910(DAT_00679640, DAT_0063e61c, iVar2, DAT_0063e624);
  iVar2 = iVar2 + extraout_EAX;
  FUN_0040bbb0();
  iVar5 = FUN_005adfa0(u8(DAT_0064c6b5[iVar1 * 0x594]) - 1, 0, 4);
  FUN_0040bc10(iVar5 + 0x148);
  FUN_0040fe10();
  FUN_0040bc10(0x8c);
  FUN_0040fe10();
  uVar4 = FUN_00493c7d(iVar1);
  FUN_0040bbe0(uVar4);
  FUN_0043c910(DAT_00679640, DAT_0063e61c, iVar2, DAT_0063e624);
  iVar2 = iVar2 + extraout_EAX;
  FUN_0040bbb0();
  uVar4 = FUN_00493ba6(iVar1);
  FUN_0040bbe0(uVar4);
  FUN_0040fe10();
  uVar4 = FUN_00493b10(iVar1);
  FUN_0040bbe0(uVar4);
  FUN_0040fe40();
  FUN_00421f10(DAT_00655afa);
  FUN_0043c910(DAT_00679640, DAT_0063e61c, iVar2, DAT_0063e624);
  iVar2 = iVar2 + extraout_EAX;
  iVar5 = iVar2 + 2;
  DAT_0063e968 = 0x18;
  DAT_0063e960 = iVar2 + 0x1a;
  _DAT_0063e964 = iVar3 - iVar5;
  DAT_0063e95c = FUN_005adfa0(((iVar3 - iVar5) / 0x18) | 0, 1, 99);
  let local_24 = 0;
  if (DAT_006af260[iVar1] < DAT_006af280[iVar1]) {
    local_24 = DAT_006af280[iVar1] - DAT_006af260[iVar1];
  } else if (DAT_006af260[iVar1] < DAT_006af280[iVar1]) {
    local_24 = 300;
  }
  let local_8 = DAT_0063e95c;
  if (local_24 !== 0) {
    _DAT_0063e950 = FUN_005adfa0(((DAT_0063e95c - 1 + local_24) / DAT_0063e95c) | 0, 1, 99);
    uVar4 = FUN_005adfa0(local_24 - 1, 0, 999);
    iVar2 = FUN_005adfa0(DAT_0063e958, 0, uVar4);
    let local_30 = 1;
    let local_38 = (DAT_006af280[iVar1] - 1) - iVar2;
    DAT_0063e958 = iVar2;
    let local_50 = iVar5;
    if (local_38 < 0) {
      local_38 = local_38 + 300;
    }
    while ((local_30 <= DAT_006af220[iVar1] && (local_30 - 1 < iVar2 + local_8)) &&
           ((DAT_006af260[iVar1] !== 0 ||
             (local_38 < DAT_006af280[iVar1])))) {
      iVar6 = ((local_30 + 1) & 1) * 0x40 + DAT_0063e61c;
      uVar4 = FUN_00472d20(DAT_006af2a0[iVar1 * 0x27d8 + local_38 * 0x22],
                           iVar1);
      FUN_0056baff(DAT_0063e4f8, uVar4, 0, iVar6 + 2, local_50, 0, 0);
      FUN_005baec8(DAT_0063eab8);
      FUN_005baee0(0x25, 0x12, 1, 1);
      iVar6 = DAT_0063e61c;
      iVar7 = local_50 + 0x11;
      iVar8 = DAT_0063e61c + 0x8c;
      FUN_0040bbb0();
      uVar4 = FUN_00428b0c(
                  DAT_0064b1b8[DAT_006af2a0[iVar1 * 0x27d8 + local_38 * 0x22] * 0x14]);
      FUN_0040bbe0(uVar4);
      while (iVar9 = FUN_0040efd0(DAT_00679640), 0x60 < iVar9) {
        sVar10 = _strlen(DAT_00679640);
        // truncate string
      }
      FUN_0043c8d0(DAT_00679640, iVar8, iVar7);
      FUN_0040bbb0();
      FUN_00421f10(DAT_006af2a6[iVar1 * 0x27d8 + local_38 * 0x22]);
      while (iVar8 = FUN_0040efd0(DAT_00679640), 0x4c < iVar8) {
        sVar10 = _strlen(DAT_00679640);
        // truncate string
      }
      FUN_0043c8d0(DAT_00679640, iVar6 + 0xec, iVar7);
      FUN_005baee0(0x5e, 10, -1, -1);
      FUN_0040bbb0();
      FUN_0040ff30(DAT_006af2a2[iVar1 * 0x27d8 + local_38 * 0x22]);
      FUN_0040bbe0(DAT_00626194);
      FUN_0040ff30(DAT_006af2a4[iVar1 * 0x27d8 + local_38 * 0x22]);
      iVar8 = FUN_0043d07a(DAT_006af2a2[iVar1 * 0x27d8 + local_38 * 0x22],
                           DAT_006af2a4[iVar1 * 0x27d8 + local_38 * 0x22],
                           -1, -1, -1);
      if (-1 < iVar8) {
        FUN_0040bbe0(DAT_00626198);
        FUN_0040bbe0(DAT_0064f360[iVar8 * 0x58]);
        FUN_0040bbe0(DAT_006261a0);
      }
      while (iVar8 = FUN_0040efd0(DAT_00679640), 0xaa < iVar8) {
        sVar10 = _strlen(DAT_00679640);
        // truncate string
      }
      FUN_0043c8d0(DAT_00679640, iVar6 + 0x138, iVar7);
      FUN_005baee0(DAT_006af2a8[iVar1 * 0x27d8 + local_38 * 0x22], 0x12,
                   -1, -1);
      FUN_0040bbb0();
      FUN_0040bbe0(DAT_006af2aa[local_38 * 0x22 + iVar1 * 0x27d8]);
      while (iVar9 = DAT_0063e7bc - _DAT_0063e98c, iVar8 = FUN_0040efd0(DAT_00679640),
            (iVar9 - 2) - (iVar6 + 0x1e2) < iVar8) {
        sVar10 = _strlen(DAT_00679640);
        // truncate string
      }
      FUN_0043c8d0(DAT_00679640, iVar6 + 0x1e2, iVar7);
      local_30 = local_30 + 1;
      local_38 = local_38 - 1;
      if (local_38 < 0) {
        local_38 = 299;
      }
      local_50 = local_50 + 0x18;
    }
  }
  if (DAT_0063e990 === 0) {
    let local_18 = {};
    FUN_00408680(local_18, (DAT_0063e7bc - _DAT_0063e98c) - 2, iVar5, DAT_0063e7bc - 2, iVar3);
    FUN_0040fc50(DAT_0063e540, 200, local_18, 1);
    FUN_0040fd80(0x401398);
    FUN_00414ca0(0x40320b);
  }
  uVar4 = FUN_005adfa0(local_24 - 1, 0, 999);
  FUN_0040fd40(0, uVar4);
  FUN_0040fcf0(DAT_0063e958);
  FUN_005db0d0(DAT_0063e95c);
  if (DAT_0063e990 === 0) {
    FUN_0040f380();
    DAT_0063e990 = 1;
  }
  FUN_00408460();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043856b — show military advisor dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043856b(param_1) {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14 = new Uint8Array(16);

  if (DAT_0063e948 < 0) {
    // thunk_show_credits(2,0xc,0,600,400,0,0)
    DAT_0063e954 = param_1;
    _DAT_0063e994 = 0;
    FUN_004086c0(local_14, 2, 0, 0x254, 0x18);
    iVar1 = DAT_0063e620;
    iVar2 = FUN_00407fc0(local_14);
    FUN_0043c790(local_14, DAT_0063e61c, (iVar1 - iVar2) + 0x18e);
    uVar3 = FUN_00428b0c(DAT_00628420 + 0x51c);
    FUN_0040f680(null, 100, local_14, uVar3);
    FUN_0040f880(null);
    FUN_0040f7d0();
    FUN_0040f840();
    CPropertySheet_EnableStackedTabs(null, 0x4022cf);
    FUN_005bb574();
    FUN_004085f0();
  } else {
    FUN_005bb574();
    FUN_004085f0();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004386b8 — handle click in battle log list
// ═══════════════════════════════════════════════════════════════════
export function FUN_004386b8(param_1, param_2) {
  let local_c;

  param_2 = param_2 - (DAT_0063e960 - ((DAT_0063e968 / 2) | 0));
  if ((param_2 >= 0) && (param_2 = (param_2 / DAT_0063e968) | 0, param_2 < DAT_0063e95c)) {
    local_c = ((DAT_006af280[DAT_0063e954 * 4] - 1) - DAT_0063e958) - param_2;
    if (local_c < 0) {
      local_c = local_c + 300;
    }
    if ((DAT_006af280[DAT_0063e954 * 4] !== local_c) &&
       (((DAT_006af260[DAT_0063e954 * 4] !== 0 ||
         (0x12a < DAT_006af220[DAT_0063e954 * 4])) ||
        (local_c < DAT_006af280[DAT_0063e954 * 4])))) {
      FUN_00410402(DAT_006af2a2[DAT_0063e954 * 0x27d8 + local_c * 0x22],
                   DAT_006af2a4[DAT_0063e954 * 0x27d8 + local_c * 0x22]);
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// CDaoFieldInfo::~CDaoFieldInfo — MFC destructor (no-op in JS)
// Source: decompiled/block_00430000.c ~CDaoFieldInfo (140 bytes)
// ═══════════════════════════════════════════════════════════════════
export function CDaoFieldInfo_destructor() {
  // DEVIATION: MFC — CDaoFieldInfo::~CDaoFieldInfo destructor chain
  // C: *unaff_FS_OFFSET = &uStack_10;  (SEH setup)
  // C: local_8._0_1_ = 5; FUN_0043c19c();
  // C: local_8._0_1_ = 4; FUN_0043c1ab();
  // C: local_8._0_1_ = 3; FUN_0043c1ba();
  // C: local_8._0_1_ = 2; FUN_0043c1c9();
  // C: local_8._0_1_ = 1; FUN_0043c1d8();
  // C: local_8 = (uint)local_8._1_3_ << 8; FUN_0043c1e7();
  // C: local_8 = 0xffffffff; FUN_0043c1f6(); FUN_0043c209();
  FUN_0043c19c();
  FUN_0043c1ab();
  FUN_0043c1ba();
  FUN_0043c1c9();
  FUN_0043c1d8();
  FUN_0043c1e7();
  FUN_0043c1f6();
  FUN_0043c209();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c19c — cleanup string helper
// Source: decompiled/block_00430000.c FUN_0043c19c (15 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c19c() {
  // DEVIATION: MFC — thunk_FUN_0040fbb0() (CString destructor)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c1ab — cleanup string helper
// Source: decompiled/block_00430000.c FUN_0043c1ab (15 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c1ab() {
  // DEVIATION: MFC — thunk_FUN_0040f570() (CString destructor)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c1ba — cleanup string helper
// Source: decompiled/block_00430000.c FUN_0043c1ba (15 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c1ba() {
  // DEVIATION: MFC — thunk_FUN_0040f570() (CString destructor)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c1c9 — cleanup string helper
// Source: decompiled/block_00430000.c FUN_0043c1c9 (15 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c1c9() {
  // DEVIATION: MFC — thunk_FUN_0040f570() (CString destructor)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c1d8 — cleanup string helper
// Source: decompiled/block_00430000.c FUN_0043c1d8 (15 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c1d8() {
  // DEVIATION: MFC — thunk_FUN_0040f570() (CString destructor)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c1e7 — cleanup bitmap data
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c1e7() {
  FUN_005bd915();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c1f6 — destructor helper (no-op in JS)
// Source: decompiled/block_00430000.c FUN_0043c1f6 (9 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c1f6() {
  // DEVIATION: MFC — COleCntrFrameWnd::~COleCntrFrameWnd(*(unaff_EBP + -0x10))
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c209 — SEH cleanup (no-op in JS)
// Source: decompiled/block_00430000.c FUN_0043c209 (14 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c209() {
  // DEVIATION: Win32 — SEH epilog
  // C: *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00430000.c FUN_0043c260 (200 bytes)
// FUN_0043c260 — CDaoFieldInfo constructor (MFC)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c260() {
  // DEVIATION: MFC — SEH frame + MFC class constructor chain
  // let in_ECX = 0; // DEVIATION: MFC (in_ECX this pointer)
  // FUN_0055339f(); // DEVIATION: MFC — base class init
  // FUN_005bd630(); // port vtable init
  // FUN_0040f3e0(); // DEVIATION: MFC — CString init (x4)
  // FUN_0040fb00(); // DEVIATION: MFC — CStringArray init
  // *in_ECX = &PTR_FUN_0061c05c; // DEVIATION: MFC — set vtable
  return null;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c3f0 — load resource wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c3f0(param_1) {
  return FUN_005db140(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// _Timevec_destructor — free timevec resource
// ═══════════════════════════════════════════════════════════════════
export function _Timevec_destructor(thisPtr) {
  FUN_005db55b(thisPtr);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c460 — create font with 2 params
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c460(param_1, param_2) {
  let font = create_font_8200(param_1, param_2, 0);
  let height = gdi_847F(font);
  return { font, height };
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c4c0 — create font with 3 params
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c4c0(param_1, param_2, param_3) {
  let font = create_font_8200(param_1, param_2, param_3);
  let height = gdi_847F(font);
  return { font, height };
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c520 — destroy font object
// Source: decompiled/block_00430000.c FUN_0043c520 (48 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c520() {
  // DEVIATION: Win32 — GDI font object destruction via in_ECX (this pointer)
  // C: int *in_ECX;
  // C: if (*in_ECX != 0) {
  // C:   FUN_005c841d(*in_ECX);
  // C: }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// GetActiveView (0x0043C560) — COleClientItem::GetActiveView
// ═══════════════════════════════════════════════════════════════════
export function GetActiveView_C560(thisPtr) {
  return thisPtr ? thisPtr[8] : null;
}


// ═══════════════════════════════════════════════════════════════════
// GetActiveView (0x0043C590) — COleClientItem::GetActiveView
// ═══════════════════════════════════════════════════════════════════
export function GetActiveView_C590(thisPtr) {
  return thisPtr ? thisPtr[4] : null;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c5c0 — release surface
// Source: decompiled/block_00430000.c FUN_0043c5c0 (37 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c5c0() {
  // DEVIATION: Win32 — release drawing surface via in_ECX (this pointer)
  // C: int in_ECX;
  // C: FUN_005bca3d(*(undefined4 *)(in_ECX + 8));
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c5f0 — manage window
// Source: decompiled/block_00430000.c FUN_0043c5f0 (50 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c5f0() {
  // DEVIATION: Win32 — manage window handle via in_ECX (this pointer)
  // C: int in_ECX;
  // C: if (*(int *)(in_ECX + 0x1c) != 0) {
  // C:   manage_window_8B58(*(undefined4 *)(in_ECX + 0x1c));
  // C: }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c630 — scroll list to top
// Source: decompiled/block_00430000.c FUN_0043c630 (39 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c630() {
  // DEVIATION: Win32 — toggle list scroll via in_ECX (this pointer)
  // C: int in_ECX;
  // C: FUN_005bbfee(*(undefined4 *)(in_ECX + 8), 0);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c660 — scroll list to bottom
// Source: decompiled/block_00430000.c FUN_0043c660 (39 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c660() {
  // DEVIATION: Win32 — toggle list scroll via in_ECX (this pointer)
  // C: int in_ECX;
  // C: FUN_005bbfee(*(undefined4 *)(in_ECX + 8), 1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00430000.c FUN_0043c690 (34 bytes)
// FUN_0043c690 — initialize null pointer
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c690() {
  // *in_ECX = 0; // DEVIATION: MFC — clear font pointer
  return null;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c6c0 — create/replace font
// Source: decompiled/block_00430000.c FUN_0043c6c0 (95 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c6c0(param_1, param_2, param_3) {
  // DEVIATION: Win32 — GDI font create/replace via in_ECX (this pointer)
  // C: int *in_ECX;
  // C: if (*in_ECX != 0) {
  // C:   FUN_005c841d(*in_ECX);
  // C: }
  // C: iVar1 = create_font_8200(param_1, param_2, param_3);
  // C: *in_ECX = iVar1;
  // C: iVar1 = gdi_847F(*in_ECX);
  // C: in_ECX[1] = iVar1;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c740 — destructor with optional delete
// Source: decompiled/block_00430000.c FUN_0043c740 (57 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c740(param_1) {
  // DEVIATION: Win32 — destructor with optional heap delete via in_ECX (this pointer)
  // C: void *in_ECX;
  // C: FUN_005c656b();
  // C: if ((param_1 & 1) != 0) {
  // C:   operator_delete(in_ECX);
  // C: }
  // C: return in_ECX;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c790 — offset rect (Win32 OffsetRect wrapper)
// Source: decompiled/block_00430000.c FUN_0043c790 (34 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c790(param_1, param_2, param_3) {
  // DEVIATION: Win32 — OffsetRect(param_1, param_2, param_3)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c7c0 — draw rect border
// Source: decompiled/block_00430000.c FUN_0043c7c0 (61 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c7c0(param_1, param_2, param_3) {
  // DEVIATION: Win32 — draw rectangle border
  // C: thunk_FUN_005a98e4(param_1, *param_2, param_2[1], param_2[2] + -1, param_2[3] + -1, param_3);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c810 — append ordinal suffix to text buffer
// Source: decompiled/block_00430000.c FUN_0043c810 (29 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c810() {
  FUN_004aefd8(DAT_00679640);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c840 — string concatenate wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c840(param_1, param_2) {
  FUN_005f22e0(param_1, param_2);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c870 — append number to global text buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c870(param_1) {
  FUN_004af284(DAT_00679640, param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c8a0 — append gold amount to global text buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c8a0(param_1) {
  FUN_004af2b9(DAT_00679640, param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c8d0 — draw text at position
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c8d0(param_1, param_2, param_3) {
  FUN_005baf57(DAT_006366a8, param_1, param_2, param_3);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c910 — draw text centered
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c910(param_1, param_2, param_3, param_4) {
  FUN_005bb024(DAT_006366a8, param_1, param_2, param_3, param_4);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c950 — draw text right-aligned
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c950(param_1, param_2, param_3, param_4) {
  FUN_005bb0af(DAT_006366a8, param_1, param_2, param_3, param_4);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c990 — set dialog item value
// Source: decompiled/block_00430000.c FUN_0043c990 (40 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c990(param_1, param_2) {
  // DEVIATION: Win32 — set dialog item via in_ECX (this pointer)
  // C: int in_ECX;
  // C: *(undefined4 *)(in_ECX + 0x208 + param_2 * 4) = param_1;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043c9d0 — load text section by name
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043c9d0(param_1) {
  FUN_0043ca10(null, param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043ca10 — setup text section (CSocket::Create wrapper)
// Source: decompiled/block_00430000.c FUN_0043ca10 (42 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043ca10(param_1, param_2) {
  // DEVIATION: MFC — CSocket::Create via in_ECX (this pointer)
  // C: CSocket *in_ECX;
  // C: CSocket::Create(in_ECX, param_1, param_2, (char *)0x0);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043ca50 — append population text
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043ca50(param_1, param_2) {
  FUN_0043cda6(DAT_00679640, param_1, param_2);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043ca80 — append city name to buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043ca80(param_1) {
  FUN_0043f444(DAT_00679640, param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cab0 — get civ primary color
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cab0(param_1) {
  let local_8;

  if (param_1 === 0) {
    local_8 = 0;
  } else {
    local_8 = DAT_006554fe[DAT_0064c6a6[(param_1 * 0x594) / 2] * 0x30];
  }
  return DAT_00655358[local_8 * 0x10];
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cb30 — get civ secondary color
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cb30(param_1) {
  let local_8;

  if (param_1 === 0) {
    local_8 = 0;
  } else {
    local_8 = DAT_006554fe[DAT_0064c6a6[(param_1 * 0x594) / 2] * 0x30];
  }
  return DAT_00655360[local_8 * 0x10];
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cbb0 — destroy CString with optional delete
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cbb0(param_1) {
  FUN_005cde4d();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cc00 — set city building flag
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cc00(param_1, param_2) {
  if (param_2 >= 0) {
    DAT_0064f34c[param_1 * 0x58] =
         DAT_0064f34c[param_1 * 0x58] | u8(1 << (param_2 & 0x1f));
    DAT_0064f34d[param_1 * 0x58 + param_2] = DAT_0064f349[param_1 * 0x58];
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cc7e — get city population points (triangular number)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cc7e(param_1) {
  let local_c = 0;

  for (let local_8 = 1; local_8 <= s8(DAT_0064f349[param_1 * 0x58]); local_8 = local_8 + 1) {
    local_c = local_c + local_8;
  }
  if (local_c < 2) {
    local_c = 1;
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cce5 — get total civ population
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cce5(param_1) {
  let iVar1;
  let local_c;
  let local_8 = 0;

  for (local_c = 0; local_c < DAT_00655b18; local_c = local_c + 1) {
    if ((DAT_0064f394[(local_c * 0x58) / 4] !== 0) &&
       (s8(DAT_0064f348[local_c * 0x58]) === param_1)) {
      iVar1 = FUN_0043cc7e(local_c);
      local_8 = local_8 + iVar1;
    }
  }
  if ((local_8 < 0) || (32000 < local_8)) {
    local_8 = 32000;
  }
  if (local_8 < 2) {
    local_8 = 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cda6 — format population string (XX,000)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cda6(param_1, param_2, param_3) {
  let local_8;

  if (param_3 < 0) {
    local_8 = FUN_0043cce5(param_2);
  } else {
    local_8 = param_3;
  }
  if (99 < local_8) {
    FUN_004af1d5(param_1, (local_8 / 100) | 0);
    FUN_005f22e0(param_1, ',');
    local_8 = local_8 % 100;
    if (local_8 < 10) {
      FUN_005f22e0(param_1, '0');
    }
  }
  FUN_004af1d5(param_1, local_8);
  FUN_005f22e0(param_1, ',000');
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043ce5a — format city population string
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043ce5a(param_1, param_2) {
  let local_8 = FUN_0043cc7e(param_2);
  if (99 < local_8) {
    FUN_004af1d5(param_1, (local_8 / 100) | 0);
    FUN_005f22e0(param_1, ',');
    local_8 = local_8 % 100;
    if (local_8 < 10) {
      FUN_005f22e0(param_1, '0');
    }
  }
  FUN_004af1d5(param_1, local_8);
  FUN_005f22e0(param_1, ',000');
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cef9 — count city content/happy modifiers
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cef9(param_1) {
  let local_c = ((DAT_0064f347[param_1 * 0x58] & 4) !== 0) ? 1 : 0;

  if ((DAT_0064bc60 & 4) !== 0) {
    for (let local_8 = 0; local_8 < 0x1c; local_8 = local_8 + 1) {
      if (DAT_00655be6[local_8 * 2] === param_1) {
        local_c = local_c + 1;
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043cf76 — find city at tile
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043cf76(param_1, param_2) {
  let iVar1;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 !== 0) && (iVar1 = FUN_005b8ca6(param_1, param_2), iVar1 >= 0)) {
    for (let local_8 = 0; local_8 < DAT_00655b18; local_8 = local_8 + 1) {
      if (((DAT_0064f394[(local_8 * 0x58) / 4] !== 0) &&
          (DAT_0064f340[(local_8 * 0x58) / 2] === param_1)) &&
         (DAT_0064f342[(local_8 * 0x58) / 2] === param_2)) {
        return local_8;
      }
    }
  }
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043d07a — find nearest city matching criteria
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043d07a(param_1, param_2, param_3, param_4, param_5) {
  let sVar1;
  let sVar2;
  let iVar3;
  let local_18;
  let local_14 = -1;

  DAT_0063f660 = 9999;
  if ((param_4 >= 0) && (local_18 = FUN_005b8aa8(param_1, param_2), local_18 < 0)) {
    param_4 = -1;
  }
  for (let local_8 = 0; local_8 < DAT_00655b18; local_8 = local_8 + 1) {
    if (DAT_0064f394[(local_8 * 0x58) / 4] !== 0) {
      sVar1 = DAT_0064f340[(local_8 * 0x58) / 2];
      sVar2 = DAT_0064f342[(local_8 * 0x58) / 2];
      if (((((param_4 < 0) || (local_18 === param_4)) &&
           (((param_3 < 0 || (s8(DAT_0064f348[local_8 * 0x58]) === (param_3 & 0xff)))
            || ((param_5 >= 0 && (s8(DAT_0064f348[local_8 * 0x58]) === param_5)))))) &&
          ((param_4 !== -2 || (iVar3 = FUN_0043d20a(local_8, 0x22), iVar3 !== 0)))) &&
         (iVar3 = FUN_005ae31d(param_1, param_2, sVar1, sVar2), iVar3 <= DAT_0063f660)) {
        local_14 = local_8;
        DAT_0063f660 = iVar3;
      }
    }
  }
  return local_14;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043d20a — check if city has building
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00430000.c FUN_0043d20a (122 bytes)
export function FUN_0043d20a(param_1, param_2) {
  // C: thunk_FUN_005ae3bf(param_2, &local_10, local_c)
  let local_10_ref = [0];
  let local_c = [0];
  let local_8 = 0;

  if (((0 < param_2) && (param_2 < 0x23))) {
    FUN_005ae3bf(param_2, local_10_ref, local_c);
    let local_10 = local_10_ref[0];
    if ((local_c[0] & DAT_0064f374[param_1 * 0x58 + local_10]) !== 0) {
      local_8 = 1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043d289 — set or clear city building
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00430000.c FUN_0043d289 (186 bytes)
export function FUN_0043d289(param_1, param_2, param_3) {
  // C: thunk_FUN_005ae3bf(param_2, &local_c, local_8)
  // local_c gets byte index, local_8[0] gets bit mask
  let local_c_ref = [0];
  let local_8 = [0];

  if ((0 < param_2) && (param_2 < 0x23)) {
    FUN_005ae3bf(param_2, local_c_ref, local_8);
    let local_c = local_c_ref[0];
    if (param_3 === 0) {
      DAT_0064f374[param_1 * 0x58 + local_c] =
           DAT_0064f374[param_1 * 0x58 + local_c] & ~local_8[0];
    } else {
      DAT_0064f374[param_1 * 0x58 + local_c] =
           DAT_0064f374[param_1 * 0x58 + local_c] | local_8[0];
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043d348 — check if city wants to build item
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043d348(param_1, param_2) {
  for (let local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
    if (s8(DAT_0064f37b[param_1 * 0x58 + local_8]) === param_2) {
      return 1;
    }
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043d3a4 — check if city needs improvement
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043d3a4(param_1, param_2) {
  for (let local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
    if (s8(DAT_0064f37e[param_1 * 0x58 + local_8]) === param_2) {
      return 1;
    }
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043d400 — compute city AI production values
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043d400(param_1) {
  // Massive function (8227 bytes) that computes AI city production priorities
  // This is the core city AI evaluation function
  if (!(((DAT_0064f346[param_1 * 0x58] & 2) !== 0) || (DAT_00655b07 !== '\0') ||
     (((DAT_00655af8 + param_1) & 0xf) === 0))) {
    return;
  }

  // Clear flags
  DAT_0064f344[param_1 * 0x58] = DAT_0064f344[param_1 * 0x58] & 0xfffdffff;

  let local_90 = DAT_0064f340[(param_1 * 0x58) / 2];
  let local_98 = DAT_0064f342[(param_1 * 0x58) / 2];
  let iVar4 = s8(DAT_0064f348[param_1 * 0x58]);
  let local_a4 = FUN_005b8a81(local_90, local_98);
  let local_b0 = ((s8(DAT_0064f349[param_1 * 0x58]) + 2) / 5) | 0;
  let local_8c = u8(DAT_0064c6b0[s8(DAT_0064f348[param_1 * 0x58]) * 0x594]);
  let local_14 = local_98 - ((DAT_006d1162 >> 1) | 0);
  let local_6c = local_90 - ((DAT_006d1160 >> 1) | 0);

  // Absolute values
  let local_a0 = 0, local_94 = 0, local_64 = 0, local_ac = 0;
  if (local_14 < 0) local_a0 = ~local_14 + 1;
  if (local_14 > 0) local_94 = local_14;
  if (local_6c > 0) local_64 = local_6c;
  if (local_6c < 0) local_ac = ~local_6c + 1;
  if (local_14 < 1) local_14 = ~local_14 + 1;
  if (local_6c < 1) local_6c = ~local_6c + 1;

  // Terrain analysis for city radius
  let local_128 = new Array(11).fill(0);
  let local_b4 = 0;
  let local_12c = 0;

  // Pre-zero production/improvement desire arrays and init sort indices
  let local_5c = new Array(16).fill(0);
  let local_fc = new Array(16).fill(0);
  for (let local_68 = 0; local_68 < 0x10; local_68 = local_68 + 1) {
    DAT_0063f540[local_68] = 0;
    DAT_0063f668[local_68] = DAT_0063f540[local_68];
    local_5c[local_68] = local_68;
    local_fc[local_68] = local_5c[local_68];
  }

  for (let local_68 = 0; local_68 < 0x15; local_68 = local_68 + 1) {
    let local_70_x = FUN_005ae052(s8(DAT_00628370[local_68]) + local_90);
    let local_80 = s8(DAT_006283a0[local_68]) + local_98;
    let iVar5 = FUN_004087c0(local_70_x, local_80);
    if (iVar5 !== 0) {
      let bVar3 = FUN_005b89bb(local_70_x, local_80);
      let local_78 = u8(bVar3);
      local_128[local_78] = local_128[local_78] + 1;
      iVar5 = FUN_005b8ee1(local_70_x, local_80);
      if (iVar5 !== 0) {
        local_128[local_78] = local_128[local_78] + 3;
      }
      let pbVar6 = FUN_005b8931(local_70_x, local_80);
      if ((pbVar6 & 0x80) !== 0) {
        local_b4 = local_b4 + 1;
      }
      let uVar7 = FUN_005b94d5(local_70_x, local_80);
      if ((uVar7 & 0x10) !== 0) {
        local_12c = local_12c + 1;
      }
    }
  }

  // Merge jungle+swamp
  local_128[6] = local_128[6] + local_128[7];
  local_128[7] = 0;

  // Compute building desirability values (16 slots)
  // DAT_0063f668[0..15] = production desires
  // DAT_0063f540[0..15] = improvement desires

  // Defense value
  DAT_0063f668[0] = local_128[9] * 3 + local_128[6] * 6 + local_128[3] * 4 + local_b4 * 3;
  if (local_8c < 0x10) DAT_0063f668[0] = DAT_0063f668[0] * 2;
  if (local_8c < 0x18) DAT_0063f668[0] = DAT_0063f668[0] << 1;
  if (local_8c < 0x31) {
    if (s8(DAT_0064f349[param_1 * 0x58]) < 3) {
      DAT_0063f668[0] = DAT_0063f668[0] << 1;
    }
  } else {
    DAT_0063f668[0] = (DAT_0063f668[0] / 2) | 0;
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) > 7) {
    DAT_0063f668[0] = (DAT_0063f668[0] / 2) | 0;
  }

  let local_bc = local_128[6] + 2;
  if (((DAT_006d1162 / 3) | 0) < local_14) {
    local_bc = local_128[6] + 3;
  }
  DAT_0063f668[1] = ((local_b4 / 2) | 0) + local_128[4] * 2 + local_128[2];
  DAT_0063f668[1] = DAT_0063f668[1] * local_bc;
  DAT_0063f668[2] = local_128[10] * 8 - local_14;
  if (s8(DAT_0064f349[param_1 * 0x58]) > 9) {
    DAT_0063f668[2] = DAT_0063f668[2] >> 1;
  }
  if (local_8c > 0x20) {
    DAT_0063f668[2] = DAT_0063f668[2] >> 1;
  }
  let iVar9 = (local_128[1] * 3 + local_128[0]) - local_b4;
  let iVar5 = FUN_005adfa0((local_8c / 10) | 0, 1, 2);
  DAT_0063f668[3] = iVar9 * iVar5;
  iVar5 = FUN_004bd9f0(iVar4, 0x25);
  if (iVar5 !== 0) {
    DAT_0063f668[3] = (DAT_0063f668[3] * 3) >> 1;
  }
  if (local_8c < 8) {
    DAT_0063f668[3] = DAT_0063f668[3] >> 1;
  }
  if (local_8c < 0x10) {
    DAT_0063f668[3] = DAT_0063f668[3] >> 1;
  }
  DAT_0063f668[4] = (local_128[10] * 3 + local_128[0] * 4 + local_128[8] * 2) - ((local_8c / 6) | 0);
  iVar5 = FUN_004bd9f0(iVar4, 0x41);
  if (iVar5 === 0) {
    DAT_0063f668[4] = (DAT_0063f668[4] / 3) | 0;
  }
  iVar5 = FUN_0043d20a(param_1, 9);
  if (iVar5 !== 0) {
    DAT_0063f668[4] = DAT_0063f668[4] + (DAT_0063f668[4] >> 1);
  }
  if (((local_a4 & 1) !== 0) && (local_a4 < 6)) {
    DAT_0063f668[4] = DAT_0063f668[4] + (DAT_0063f668[4] >> 1);
  }
  DAT_0063f668[5] = (local_128[9] + local_128[1] + local_128[3] + local_128[8] + 1) * local_128[4] * 5;
  iVar5 = (local_b0 / 2) | 0;
  if (1 < iVar5) {
    iVar5 = 2;
  }
  DAT_0063f668[5] = FUN_005ae3ec(DAT_0063f668[5], iVar5 - 1);
  if (((local_a4 & 1) !== 0) && (1 < local_a4)) {
    DAT_0063f668[5] = DAT_0063f668[5] + (DAT_0063f668[5] >> 1);
  }
  if (local_8c < 0x14) {
    DAT_0063f668[5] = DAT_0063f668[5] >> 1;
  }
  DAT_0063f668[6] = local_128[5] * 5 + local_128[4] * 5;
  if ((local_a4 !== 0) && ((local_a4 & 1) === 0)) {
    DAT_0063f668[6] = DAT_0063f668[6] * 2;
  }
  iVar5 = (local_128[2] * 5 - local_128[1]) + local_b4;
  DAT_0063f668[7] = iVar5 * 2;
  if ((local_a4 !== 0) && ((local_a4 & 3) === 0)) {
    DAT_0063f668[7] = iVar5 * 4;
  }
  let local_8 = local_b4 * 5 - local_128[2];
  let local_1c = local_128[1] << 2;
  local_8 = FUN_005adfa0(local_8, 0, local_1c);
  local_1c = FUN_005adfa0(local_1c, 0, local_8);
  DAT_0063f668[8] = local_1c + ((((DAT_006d1160 >> 1) - local_6c) / 2) | 0) + local_8;
  if (local_94 !== 0) {
    DAT_0063f668[8] = DAT_0063f668[8] >> 1;
  }
  let uVar8 = FUN_005adfa0(local_b0 - 1, -2, 1);
  DAT_0063f668[8] = FUN_005ae3ec(DAT_0063f668[8], uVar8);
  if ((local_a4 - 2 & 3) === 0) {
    DAT_0063f668[8] = DAT_0063f668[8] + (DAT_0063f668[8] >> 1);
  }
  if (DAT_0064c6a6[(iVar4 * 0x594) / 2] === 9) {
    DAT_0063f668[8] = DAT_0063f668[8] << 1;
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) > 10) {
    DAT_0063f668[8] = DAT_0063f668[8] >> 1;
  }
  DAT_0063f668[9] = (local_128[3] * 2 + local_128[9] + 1) * (local_128[4] + 1);
  if (((DAT_0063f668[9] !== 0) && (DAT_0063f668[9] = DAT_0063f668[9] + local_64 * 2, local_a4 !== 0)) &&
     (local_a4 % 5 === 0)) {
    DAT_0063f668[9] = DAT_0063f668[9] * 2;
  }
  if (DAT_0064c6a6[(iVar4 * 0x594) / 2] === 0xb) {
    DAT_0063f668[9] = DAT_0063f668[9] << 1;
  }
  DAT_0063f668[10] = local_128[5] * 8;
  if (DAT_0063f668[10] !== 0) {
    DAT_0063f668[10] = DAT_0063f668[10] + local_128[4] + local_6c;
    iVar5 = FUN_004bd9f0(iVar4, 0x27);
    if (iVar5 === 0) {
      DAT_0063f668[10] = DAT_0063f668[10] >> 1;
    }
    if (8 < local_a4) {
      DAT_0063f668[10] = DAT_0063f668[10] + (DAT_0063f668[10] >> 1);
    }
    if (s8(DAT_0064f349[param_1 * 0x58]) < 5) {
      DAT_0063f668[10] = DAT_0063f668[10] >> 1;
    }
  }
  if (DAT_0064c6a6[(iVar4 * 0x594) / 2] === 10) {
    DAT_0063f668[9] = DAT_0063f668[9] << 1;
  }
  DAT_0063f668[11] = (local_128[9] * 3 + local_128[8] * 2 + local_128[0] * 2) *
                     (((local_128[10] + local_b4) / 2) | 0);
  if (DAT_0063f668[11] !== 0) {
    if (local_14 < 10) {
      DAT_0063f668[11] = DAT_0063f668[11] * 2;
    }
    DAT_0063f668[11] = DAT_0063f668[11] - local_14;
    if (DAT_00666130[local_a4 * 0x10] < 0x1a) {
      DAT_0063f668[11] = DAT_0063f668[11] + (DAT_0063f668[11] >> 1);
    }
    if (300 < DAT_00666130[local_a4 * 0x10]) {
      DAT_0063f668[11] = DAT_0063f668[11] >> 1;
    }
    if (local_a4 === 1) {
      DAT_0063f668[11] = DAT_0063f668[11] >> 1;
    }
  }
  DAT_0063f668[12] = (local_128[5] + 1) * (local_128[8] + 1) * (local_128[0] + 1) + local_128[1];
  if (DAT_0063f668[12] !== 0) {
    iVar5 = FUN_005adfa0(local_b0, 1, 4);
    DAT_0063f668[12] = ((iVar5 * DAT_0063f668[12]) / 2) | 0;
    if (local_a4 === 7) {
      DAT_0063f668[12] = DAT_0063f668[12] + (DAT_0063f668[12] >> 1);
    }
  }
  DAT_0063f668[13] = (local_128[5] + ((local_128[4] / 2) | 0) + 1) * (local_b4 + 2);
  if (2 < local_128[5]) {
    DAT_0063f668[13] = DAT_0063f668[13] * 2;
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) > 4) {
    DAT_0063f668[13] = DAT_0063f668[13] << 1;
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) > 9) {
    DAT_0063f668[13] = DAT_0063f668[13] << 1;
  }
  DAT_0063f668[14] = local_128[6] * 8 + local_128[0] * 10 + local_128[8] * 6 + local_128[7] * 0xc;
  if (DAT_00655b90 === '\0') {
    DAT_0063f668[14] = DAT_0063f668[14] >> 3;
  }
  if (DAT_0063f668[14] === 0) {
    DAT_0063f668[14] = -1;
  } else {
    if (local_a4 === 0x11) {
      DAT_0063f668[14] = DAT_0063f668[14] * 3;
    } else if ((1 < local_a4) && ((local_a4 - 1 & 7) === 0)) {
      DAT_0063f668[14] = DAT_0063f668[14] + (DAT_0063f668[14] >> 1);
    }
    iVar5 = FUN_005adfa0(((local_b0 / 2) | 0) - 2, 1, 2);
    DAT_0063f668[14] = iVar5 * DAT_0063f668[14];
  }
  DAT_0063f668[15] = (local_128[6] + local_128[0] + 1) * (local_128[4] + local_b4 + 1) *
                     (local_128[5] + 1);
  iVar5 = FUN_004bd9f0(iVar4, 0x3a);
  if (iVar5 === 0) {
    DAT_0063f668[15] = 0;
  }
  if (DAT_0063f668[15] === 0) {
    DAT_0063f668[15] = -1;
  } else {
    if ((local_a4 !== 0) && (local_a4 % 10 === 0)) {
      DAT_0063f668[15] = DAT_0063f668[15] + (DAT_0063f668[15] >> 1);
    }
    iVar5 = local_b0;
    if (5 < local_b0) {
      iVar5 = 6;
    }
    DAT_0063f668[15] = ((DAT_0063f668[15] * iVar5) / 6) | 0;
  }
  // Improvement desires (DAT_0063f540)
  DAT_0063f540[0] = (local_128[6] + local_128[7]) * 5 + ((local_14 * 3 / 2) | 0) + local_128[5] * 2 +
                   local_128[3];
  iVar5 = ((local_8c / 10) | 0) * DAT_0063f540[0];
  _DAT_0063f54c = local_128[4] * 4 + local_128[3] * 4 + ((iVar5 + (iVar5 >> 31 & 7)) >> 3);
  if (s8(DAT_0064f349[param_1 * 0x58]) < 3) {
    DAT_0063f540[0] = DAT_0063f540[0] * 2;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x25);
  if (iVar5 !== 0) {
    DAT_0063f540[0] = (DAT_0063f540[0] / 3) | 0;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x30);
  if (iVar5 !== 0) {
    DAT_0063f540[0] = 1;
  }
  if (local_8c < 10) {
    DAT_0063f540[0] = DAT_0063f540[0] << 1;
  }
  if (local_8c < 0x14) {
    DAT_0063f540[0] = DAT_0063f540[0] << 1;
  }
  if (0x2f < local_8c) {
    DAT_0063f540[0] = (DAT_0063f540[0] / 2) | 0;
  }
  let local_138;
  if (((DAT_006d1162 >> 2) - local_14) <= 0) {
    local_138 = ~(((DAT_006d1162 >> 2) | 0) - local_14) + 1;
  } else {
    local_138 = ((DAT_006d1162 >> 2) | 0) - local_14;
  }
  DAT_0063f540[1] = local_138 * 2 + local_128[1] * 2 + local_128[3];
  iVar5 = FUN_004bd9f0(iVar4, 0x25);
  if (iVar5 !== 0) {
    DAT_0063f540[1] = DAT_0063f540[1] << 1;
  }
  DAT_0063f540[2] = local_14 + (((0x15 - local_128[10]) * 3 / 2) | 0);
  if (s8(DAT_0064f349[param_1 * 0x58]) < 4) {
    DAT_0063f540[2] = DAT_0063f540[2] + (DAT_0063f540[2] >> 1);
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) > 11) {
    DAT_0063f540[2] = (DAT_0063f540[2] / 2) | 0;
  }
  if (0x2f < local_8c) {
    DAT_0063f540[2] = (DAT_0063f540[2] / 2) | 0;
  }
  let local_18 = 8;
  let local_88;
  let local_9c;
  _DAT_0063f550 = 0;
  for (local_88 = s8(DAT_0064f349[param_1 * 0x58]); (local_18 !== 0 && (0 < local_88));
      local_88 = local_88 - local_9c) {
    local_9c = FUN_005adfa0(local_88, 0, 5);
    _DAT_0063f550 = _DAT_0063f550 + local_9c * local_18;
    local_18 = (local_18 / 2) | 0;
  }
  _DAT_0063f550 = _DAT_0063f550 - ((local_8c / 2) | 0);
  DAT_0063f540[5] = (local_14 + 10) * local_b0 + local_8c;
  if (s8(DAT_0064f349[param_1 * 0x58]) < 5) {
    DAT_0063f540[5] = 0;
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) < 8) {
    DAT_0063f540[5] = DAT_0063f540[5] >> 1;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x25);
  if (iVar5 !== 0) {
    DAT_0063f540[5] = DAT_0063f540[5] << 1;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x17);
  if (iVar5 !== 0) {
    DAT_0063f540[5] = DAT_0063f540[5] << 1;
  }
  iVar5 = FUN_0043d20a(param_1, 0x13);
  if (iVar5 !== 0) {
    DAT_0063f540[5] = DAT_0063f540[5] << 1;
  }
  iVar5 = FUN_0043d20a(param_1, 0x14);
  if (((iVar5 !== 0) || (iVar5 = FUN_0043d20a(param_1, 0x15), iVar5 !== 0)) ||
     (iVar5 = FUN_0043d20a(param_1, 0x1d), iVar5 !== 0)) {
    DAT_0063f540[5] = DAT_0063f540[5] >> 3;
  }
  DAT_0063f540[6] = (local_b4 + local_12c + 1) * local_b0;
  if (DAT_0063f540[6] <= DAT_0063f668[6]) {
    DAT_0063f540[6] = DAT_0063f540[6] >> 1;
  }
  iVar5 = FUN_0043d20a(param_1, 5);
  if (iVar5 !== 0) {
    DAT_0063f540[6] = DAT_0063f540[6] + (DAT_0063f540[6] >> 1);
  }
  iVar5 = FUN_0043d20a(param_1, 10);
  if (iVar5 !== 0) {
    DAT_0063f540[6] = DAT_0063f540[6] + (DAT_0063f540[6] >> 1);
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x17);
  if (iVar5 !== 0) {
    DAT_0063f540[6] = DAT_0063f540[6] + (DAT_0063f540[6] >> 1);
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x10);
  if (iVar5 !== 0) {
    DAT_0063f540[6] = (DAT_0063f540[6] + (DAT_0063f540[6] >> 31 & 3)) >> 2;
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) < 5) {
    DAT_0063f540[6] = DAT_0063f540[6] >> 1;
  }
  DAT_0063f540[7] = DAT_0063f668[3] + local_12c;
  iVar5 = FUN_004bd9f0(iVar4, 10);
  if (iVar5 !== 0) {
    DAT_0063f540[7] = (DAT_0063f540[7] / 2) | 0;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x30);
  if (iVar5 !== 0) {
    DAT_0063f540[7] = (DAT_0063f540[7] / 2) | 0;
  }
  let local_13c;
  if (DAT_0064f340[(param_1 * 0x58) / 2] - DAT_0064f342[(param_1 * 0x58) / 2] <= 0) {
    local_13c = ~(DAT_0064f340[(param_1 * 0x58) / 2] - DAT_0064f342[(param_1 * 0x58) / 2]) + 1;
  } else {
    local_13c = DAT_0064f340[(param_1 * 0x58) / 2] - DAT_0064f342[(param_1 * 0x58) / 2];
  }
  _DAT_0063f560 = local_b0 * 4 + 4 + local_13c;
  DAT_0063f540[9] = (((DAT_006d1162 >> 1) - local_14) * 2 - local_6c) + (DAT_006d1160 >> 1) +
                   local_128[9] * 4 + ((local_128[1] / 2) | 0) + local_128[8] * 2 + local_128[0] * 4;
  uVar8 = FUN_005adfa0(local_b0 - 1, -1, 1);
  DAT_0063f540[9] = FUN_005ae3ec(DAT_0063f540[9], uVar8);
  if ((local_a4 === 1) && ((param_1 & 2) !== 0)) {
    DAT_0063f540[9] = DAT_0063f540[9] + (DAT_0063f540[9] >> 1);
  }
  if (s8(DAT_0064f349[param_1 * 0x58]) < 7) {
    DAT_0063f540[9] = DAT_0063f540[9] >> 1;
  }
  DAT_0063f540[10] = s8(DAT_0064f349[param_1 * 0x58]) << 3;
  DAT_0063f540[13] = 0;
  _DAT_0063f570 = 0;
  let local_84 = 10;
  iVar5 = ((DAT_0064f342[(param_1 * 0x58) / 2] + DAT_0064f340[(param_1 * 0x58) / 2]) % 3);
  if (iVar5 === 1) {
    local_84 = 0xc;
    _DAT_0063f570 = DAT_0063f540[10];
  } else if (iVar5 === 2) {
    local_84 = 0xd;
    DAT_0063f540[13] = DAT_0063f540[10];
  }
  iVar5 = FUN_0043d20a(param_1, 0xb);
  if ((iVar5 !== 0) || (iVar5 = FUN_00453e51(iVar4, 10), iVar5 !== 0)) {
    DAT_0063f540[local_84] = (DAT_0063f540[local_84] * 3) >> 1;
  }
  iVar5 = FUN_0043d20a(param_1, 10);
  if (iVar5 !== 0) {
    DAT_0063f540[local_84] = (DAT_0063f540[local_84] * 3) >> 1;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x16);
  if (iVar5 !== 0) {
    DAT_0063f540[local_84] = DAT_0063f540[local_84] >> 1;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x10);
  if (iVar5 !== 0) {
    DAT_0063f540[local_84] = DAT_0063f540[local_84] >> 1;
  }
  if (DAT_0064c6a6[(iVar4 * 0x594) / 2] === 0x11) {
    DAT_0063f540[local_84] = DAT_0063f540[local_84] << 1;
  }
  iVar5 = local_8c - 0xc;
  if (iVar5 < 1) {
    iVar5 = 0;
  }
  DAT_0063f540[11] = ((DAT_00666130[local_a4 * 0x10] / 10) | 0) - iVar5;
  if (s8(DAT_0064f349[param_1 * 0x58]) < 4) {
    DAT_0063f540[11] = (DAT_0063f540[11] / 2) | 0;
  }
  if (400 < DAT_00666130[local_a4 * 0x10]) {
    if (s8(DAT_0064f349[param_1 * 0x58]) > 7) {
      DAT_0063f540[11] = DAT_0063f540[11] << 1;
    }
    if (((-DAT_0064f340[(param_1 * 0x58) / 2] - DAT_0064f342[(param_1 * 0x58) / 2]) & 3) === 0) {
      DAT_0063f540[11] = 0;
    }
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x46);
  if (iVar5 !== 0) {
    DAT_0063f540[11] = DAT_0063f540[11] >> 1;
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x25);
  if (iVar5 === 0) {
    DAT_0063f540[14] = -1;
  } else {
    DAT_0063f540[14] = ((local_8c / 3) | 0) * (local_b0 + 2);
    if (DAT_0063f540[14] <= DAT_0063f668[14]) {
      DAT_0063f540[14] = DAT_0063f540[14] >> 1;
    }
    iVar5 = FUN_0043d20a(param_1, 0xf);
    if (iVar5 === 0) {
      if (s8(DAT_0064f349[param_1 * 0x58]) < 5) {
        DAT_0063f540[14] = DAT_0063f540[14] >> 1;
      }
      if (s8(DAT_0064f349[param_1 * 0x58]) < 10) {
        DAT_0063f540[14] = DAT_0063f540[14] >> 1;
      }
      if (s8(DAT_0064f349[param_1 * 0x58]) < 20) {
        DAT_0063f540[14] = DAT_0063f540[14] >> 1;
      }
    } else {
      DAT_0063f540[14] = ((DAT_0063f540[14] * 3) / 2) | 0;
    }
    iVar5 = FUN_004bd9f0(iVar4, 5);
    if (iVar5 !== 0) {
      DAT_0063f540[14] = DAT_0063f540[14] * 3;
    }
    iVar5 = FUN_0043d20a(param_1, 0x19);
    if (iVar5 !== 0) {
      DAT_0063f540[14] = DAT_0063f540[14] << 1;
    }
    iVar5 = FUN_0043d20a(param_1, 0xd);
    if (iVar5 !== 0) {
      DAT_0063f540[14] = DAT_0063f540[14] >> 1;
    }
    iVar5 = FUN_0043d20a(param_1, 0x12);
    if (iVar5 !== 0) {
      DAT_0063f540[14] = DAT_0063f540[14] >> 1;
    }
  }
  iVar5 = FUN_004bd9f0(iVar4, 0x3a);
  if (iVar5 === 0) {
    DAT_0063f540[15] = -1;
  } else {
    DAT_0063f540[15] = local_8c * local_8c;
    uVar8 = FUN_005adfa0(local_b0 - 3, -3, 0);
    DAT_0063f540[15] = FUN_005ae3ec(DAT_0063f540[15], uVar8);
    iVar5 = FUN_0043d20a(param_1, 0x15);
    if ((iVar5 !== 0) || (iVar5 = FUN_0043d20a(param_1, 0x11), iVar5 !== 0)) {
      DAT_0063f540[15] = DAT_0063f540[15] << 1;
    }
  }
  // Cross-suppress: if production desire > improvement desire, zero the lower one
  for (let local_68 = 0; local_68 < 0x10; local_68 = local_68 + 1) {
    if (DAT_0063f668[local_68] < DAT_0063f540[local_68]) {
      if (0 < DAT_0063f668[local_68]) {
        DAT_0063f668[local_68] = 0;
      }
    } else if (0 < DAT_0063f540[local_68]) {
      DAT_0063f540[local_68] = 0;
    }
  }

  // Sort and assign top-3 wants/needs to city record
  // (local_fc and local_5c already declared above in pre-zeroing loop)
  local_fc = new Array(16);
  local_5c = new Array(16);
  for (let i = 0; i < 16; i++) {
    local_fc[i] = i;
    local_5c[i] = i;
  }

  FUN_00414f02(0x10, local_fc, DAT_0063f668);
  FUN_00414f02(0x10, local_5c, DAT_0063f540);

  let local_b8 = 0xf;
  for (let local_68 = 0; local_68 < 3; local_68 = local_68 + 1) {
    while (DAT_0063f668[local_b8] < 0) {
      local_b8 = local_b8 - 1;
    }
    DAT_0064f37b[param_1 * 0x58 + local_68] = u8(local_fc[local_b8]);
    local_b8 = local_b8 - 1;
  }

  local_b8 = 0xf;
  for (let local_68 = 0; local_68 < 3; local_68 = local_68 + 1) {
    while (DAT_0063f540[local_b8] < 0) {
      local_b8 = local_b8 - 1;
    }
    DAT_0064f37e[param_1 * 0x58 + local_68] = u8(local_5c[local_b8]);
    local_b8 = local_b8 - 1;
  }

  // Trade route partner assignment: negate wants matching existing trade route goods
  if (local_8c < 0x20) {
    let local_60 = (DAT_0064f342[(param_1 * 0x58) / 2] * 5 +
                   DAT_0064f340[(param_1 * 0x58) / 2] * 3) % 0xe;
    let local_c = (DAT_0064f342[(param_1 * 0x58) / 2] * 7 +
                  DAT_0064f340[(param_1 * 0x58) / 2] * 0xd) % 0xe;
  } else {
    let local_60 = (DAT_0064f342[(param_1 * 0x58) / 2] * 5 +
                   DAT_0064f340[(param_1 * 0x58) / 2] * 3) % 9 + 5;
    let local_c = (DAT_0064f342[(param_1 * 0x58) / 2] * 7 +
                  DAT_0064f340[(param_1 * 0x58) / 2] * 0xd) % 9 + 5;
  }
  // Note: local_60/local_c are used for trade route good assignment but
  // the scoping above matches C goto-less restructuring. The actual
  // negation logic follows:
  let local_60_2, local_c_2;
  if (local_8c < 0x20) {
    local_60_2 = (DAT_0064f342[(param_1 * 0x58) / 2] * 5 +
                 DAT_0064f340[(param_1 * 0x58) / 2] * 3) % 0xe;
    local_c_2 = (DAT_0064f342[(param_1 * 0x58) / 2] * 7 +
                DAT_0064f340[(param_1 * 0x58) / 2] * 0xd) % 0xe;
  } else {
    local_60_2 = (DAT_0064f342[(param_1 * 0x58) / 2] * 5 +
                 DAT_0064f340[(param_1 * 0x58) / 2] * 3) % 9 + 5;
    local_c_2 = (DAT_0064f342[(param_1 * 0x58) / 2] * 7 +
                DAT_0064f340[(param_1 * 0x58) / 2] * 0xd) % 9 + 5;
  }
  if (local_c_2 === local_60_2) {
    local_c_2 = -2;
  }
  let local_a8 = 0;
  for (let local_68 = 0; local_68 < 3; local_68 = local_68 + 1) {
    if (s8(DAT_0064f37e[param_1 * 0x58 + local_68]) > 13) {
      local_a8 = local_a8 | 1;
    }
    if (s8(DAT_0064f37b[param_1 * 0x58 + local_68]) > 13) {
      local_a8 = local_a8 | 2;
    }
    if ((s8(DAT_0064f37b[param_1 * 0x58 + local_68]) === local_60_2) ||
       (s8(DAT_0064f37e[param_1 * 0x58 + local_68]) === local_60_2)) {
      local_60_2 = -2;
    }
    if ((s8(DAT_0064f37b[param_1 * 0x58 + local_68]) === local_c_2) ||
       (s8(DAT_0064f37e[param_1 * 0x58 + local_68]) === local_c_2)) {
      local_c_2 = -2;
    }
  }
  if ((local_60_2 < 0) && ((local_a8 & 1) === 0)) {
    iVar5 = FUN_004bd9f0(iVar4, 0x25);
    if ((iVar5 === 0) || ((local_60_2 & 1) === 0)) {
      iVar5 = FUN_004bd9f0(iVar4, 0x3a);
      if ((iVar5 !== 0) && ((local_60_2 & 1) === 0)) {
        local_60_2 = 0xf;
      }
    } else {
      local_60_2 = 0xe;
    }
  }
  if (local_60_2 >= 0) {
    DAT_0064f37f[param_1 * 0x58] = u8(local_60_2);
  }
  if ((local_c_2 < 0) && ((local_a8 & 2) === 0)) {
    local_c_2 = (local_c_2 & 1) + 0xe;
    if ((local_c_2 === 0xe) && (iVar5 = FUN_004bd9f0(iVar4, 0x25), iVar5 === 0)) {
      local_c_2 = -1;
    }
    if ((local_c_2 === 0xf) && (iVar4 = FUN_004bd9f0(iVar4, 0x3a), iVar4 === 0)) {
      local_c_2 = -1;
    }
  }
  if (local_c_2 >= 0) {
    DAT_0064f37c[param_1 * 0x58] = u8(local_c_2);
  }
  // Negate wants for goods already being traded
  for (let local_68 = 0; local_68 < s8(DAT_0064f37a[param_1 * 0x58]); local_68 = local_68 + 1) {
    let cVar2 = s8(DAT_0064f381[param_1 * 0x58 + local_68]);
    if (cVar2 >= 0) {
      for (let local_7c = 0; local_7c < 3; local_7c = local_7c + 1) {
        if (s8(DAT_0064f37b[param_1 * 0x58 + local_7c]) === cVar2) {
          DAT_0064f37b[param_1 * 0x58 + local_7c] = u8(-s8(DAT_0064f37b[param_1 * 0x58 + local_7c]));
        }
      }
      let iVar4_2 = DAT_0064f384[local_68 * 2 + param_1 * 0x58];
      let cVar2_2 = -1;
      for (let local_7c = 0; local_7c < s8(DAT_0064f37a[iVar4_2 * 0x58]); local_7c = local_7c + 1) {
        if (DAT_0064f384[local_7c * 2 + iVar4_2 * 0x58] === param_1) {
          cVar2_2 = s8(DAT_0064f381[iVar4_2 * 0x58 + local_7c]);
        }
      }
      if (cVar2_2 >= 0) {
        for (let local_7c = 0; local_7c < 3; local_7c = local_7c + 1) {
          if (s8(DAT_0064f37e[param_1 * 0x58 + local_7c]) === cVar2_2) {
            DAT_0064f37e[param_1 * 0x58 + local_7c] = u8(-s8(DAT_0064f37e[param_1 * 0x58 + local_7c]));
          }
        }
      }
    }
  }
  // Negate wants for units already in field producing matching goods
  for (let local_130 = 0; local_130 < DAT_00655b16; local_130 = local_130 + 1) {
    if ((((DAT_0065610a[(local_130 * 0x20) / 4] !== 0) &&
         (u8(DAT_00656100[local_130 * 0x20]) === param_1)) &&
        (s8(DAT_0064b1ca[u8(DAT_006560f6[local_130 * 0x20]) * 0x14]) === 7)) &&
       (s8(DAT_006560fd[local_130 * 0x20]) >= 0)) {
      for (let local_68 = 0; local_68 < 3; local_68 = local_68 + 1) {
        if (s8(DAT_0064f37b[param_1 * 0x58 + local_68]) === s8(DAT_006560fd[local_130 * 0x20])) {
          DAT_0064f37b[param_1 * 0x58 + local_68] = u8(-s8(DAT_0064f37b[param_1 * 0x58 + local_68]));
        }
      }
    }
  }

  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043f444 — append city name or "NONE" to string
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043f444(param_1, param_2) {
  if (param_2 < 0) {
    FUN_004af14b(param_1, 0xe);
  } else {
    FUN_004af174(param_1, DAT_0064f360[param_2 * 0x58]);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043f493 — assign city name from CITY.TXT
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043f493(param_1) {
  let iVar1;
  let iVar2;
  let sVar3;
  let local_2c;
  let local_24;
  let local_20 = 0;
  let local_1c = '';

  iVar1 = s8(DAT_0064f348[param_1 * 0x58]);
  FUN_004aef20(local_1c);
  if (DAT_00655504[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] < 1) {
    local_2c = ~DAT_00655504[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] + 1;
  } else {
    local_2c = DAT_00655504[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30];
  }
  FUN_004af122(local_1c, local_2c);

  // LAB_0043f557:
  do {
    local_20 = local_20 + 1;
    if (2 < local_20) {
      // LAB_0043f78e:
      FUN_004a2020();
      return;
    }
    DAT_006554fd[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] =
         DAT_006554fd[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] + 1;
    local_24 = u8(DAT_006554fd[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30]);

    // C: __chdir(&DAT_0064bb08);
    // C: iVar2 = thunk_FUN_004a2379(&DAT_00626258, local_1c);  // try CITY.TXT in scenario dir
    // C: __chdir(&DAT_0064bb08); — DEVIATION: no chdir in JS
    iVar2 = FUN_004a2379(DAT_00626258, local_1c);
    if (iVar2 !== 0) {
      // C: __chdir(&DAT_00655020); — DEVIATION: no chdir in JS
      iVar2 = FUN_004a2379(DAT_00626260, local_1c);
      if (iVar2 !== 0) {
        // goto LAB_0043f78e
        FUN_004a2020();
        return;
      }
    }
    // C: __chdir(&DAT_00655020);

    // Skip forward local_24 entries, checking for empty lines and _STOP marker
    for (; 0 < local_24; local_24 = local_24 - 1) {
      FUN_004a23fc(1);
      sVar3 = DAT_00679640.length;
      if (sVar3 === 0 || DAT_00679640.substring(0, 5).toUpperCase() === '_STOP') break;
    }

    if (local_24 < 1) {
      // LAB_0043f714: (reached from first loop exhaustion or EXTRA fallback)
      if (local_24 < 1) {
        // C: _memset(&DAT_0064f360 + param_1 * 0x58, 0, 0x10);
        DAT_0064f360.fill(0, param_1 * 0x58, param_1 * 0x58 + 0x10);
        // C: _strncpy(&DAT_0064f360 + param_1 * 0x58, &DAT_00679640, 0xf);
        for (let _i = 0; _i < 0xf && _i < DAT_00679640.length; _i++) {
          DAT_0064f360[param_1 * 0x58 + _i] = DAT_00679640.charCodeAt(_i);
        }
        // goto LAB_0043f78e
        FUN_004a2020();
        return;
      }
      // C: (&DAT_006554fd)[...] = 0;  — reset counter on wrap-around
      DAT_006554fd[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] = 0;
      // goto LAB_0043f557 (continue do-while)
      continue;
    }

    // C: iVar2 = thunk_FUN_004a2379(0, s_EXTRA_00626270);  // search for EXTRA section
    iVar2 = FUN_004a2379(0, 'EXTRA');
    if (iVar2 === 0) {
      // Found EXTRA section — skip forward again
      for (; 0 < local_24; local_24 = local_24 - 1) {
        FUN_004a23fc(1);
        sVar3 = DAT_00679640.length;
        if (sVar3 === 0 || DAT_00679640.substring(0, 5).toUpperCase() === '_STOP') break;
      }
      // goto LAB_0043f714
      if (local_24 < 1) {
        // C: _memset(&DAT_0064f360 + param_1 * 0x58, 0, 0x10);
        DAT_0064f360.fill(0, param_1 * 0x58, param_1 * 0x58 + 0x10);
        // C: _strncpy(&DAT_0064f360 + param_1 * 0x58, &DAT_00679640, 0xf);
        for (let _i = 0; _i < 0xf && _i < DAT_00679640.length; _i++) {
          DAT_0064f360[param_1 * 0x58 + _i] = DAT_00679640.charCodeAt(_i);
        }
        // goto LAB_0043f78e
        FUN_004a2020();
        return;
      }
      // C: (&DAT_006554fd)[...] = 0;  — reset counter on wrap-around
      DAT_006554fd[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] = 0;
      // goto LAB_0043f557 (continue do-while)
      continue;
    }
    // C: (&DAT_006554fd)[...] = 0;  — EXTRA not found, reset counter
    DAT_006554fd[DAT_0064c6a6[(iVar1 * 0x594) / 2] * 0x30] = 0;
  } while (true);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0043f7a7 — update city radius tile ownership
// ═══════════════════════════════════════════════════════════════════
export function FUN_0043f7a7(param_1) {
  let sVar2 = DAT_0064f340[(param_1 * 0x58) / 2];
  let sVar3 = DAT_0064f342[(param_1 * 0x58) / 2];
  let cVar1 = DAT_0064f348[param_1 * 0x58];

  FUN_005b9ec6();
  for (let local_8 = 0; local_8 < 0x2d; local_8 = local_8 + 1) {
    let uVar4 = FUN_005ae052(s8(DAT_00628370[local_8]) + sVar2);
    let iVar5 = s8(DAT_006283a0[local_8]) + sVar3;
    let iVar6 = FUN_004087c0(uVar4, iVar5);
    if (iVar6 !== 0) {
      let uVar7 = FUN_005b8c18(uVar4, iVar5, 1);
      FUN_005b98b7(uVar4, iVar5, uVar7 & 7);
      if (local_8 < 0x15) {
        FUN_005b9c49(uVar4, iVar5, s8(cVar1), 1);
      }
    }
  }
  FUN_005b9f1c();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// create_city — create a new city at given location
// ═══════════════════════════════════════════════════════════════════
export function create_city(param_1, param_2, param_3) {
  let cVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let pbVar7;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;

  DAT_006ad8c4 = 1;
  if ((DAT_00655b02 < 3) || (cVar1 = FUN_00421f40(), cVar1 !== '\0')) {
    for (local_28 = 0; (local_28 < DAT_00655b18 && (DAT_0064f394[(local_28 * 0x58) / 4] !== 0));
        local_28 = local_28 + 1) {
    }
    if (DAT_00655b18 === local_28) {
      if (0xfe < DAT_00655b18) {
        if (((1 << (param_3 & 0x1f) & DAT_00655b0b) !== 0) && (DAT_00655b02 < 3)) {
          FUN_00444270('TOOMANYCITIES');
        }
        DAT_006ad8c4 = 0;
        return -1;
      }
      DAT_00655b18 = DAT_00655b18 + 1;
    }
    DAT_0064c708[param_3 * 0x594] = DAT_0064c708[param_3 * 0x594] + 1;
    DAT_0064c6ae[param_3 * 0x594] = DAT_00655af8;
    FUN_005b94fc(param_1, param_2, 2, 1, 1);
    FUN_005b94fc(param_1, param_2, 0x40, 0, 1);
    DAT_0064f340[(local_28 * 0x58) / 2] = param_1;
    DAT_0064f342[(local_28 * 0x58) / 2] = param_2;
    DAT_0064f348[local_28 * 0x58] = u8(param_3);
    w32(DAT_0064f394, local_28 * 0x58, DAT_00627fdc);
    DAT_00627fdc = DAT_00627fdc + 1;
    DAT_0064f34a[local_28 * 0x58] = u8(param_3);
    DAT_0064f34b[local_28 * 0x58] = 0;
    DAT_0064f344[local_28 * 0x58] = 0x20000;
    DAT_0064f349[local_28 * 0x58] = 1;
    if (DAT_00655c18 < 0) {
      DAT_0064f34c[local_28 * 0x58] = 0;
      for (local_2c = 0; local_2c < 8; local_2c = local_2c + 1) {
        DAT_0064f34d[local_28 * 0x58 + local_2c] = 0;
      }
    } else {
      DAT_0064f34c[local_28 * 0x58] = 0xff;
      for (local_2c = 0; local_2c < 8; local_2c = local_2c + 1) {
        DAT_0064f34d[local_28 * 0x58 + local_2c] = 1;
      }
      FUN_005b976d(param_1, param_2, 0xff, 1, 1);
      for (local_2c = 1; local_2c < 8; local_2c = local_2c + 1) {
        FUN_005b8b1a(param_1, param_2, local_2c);
      }
    }
    DAT_0064f356[local_28 * 0x58] = 0;
    DAT_0064f379[local_28 * 0x58] = 0;
    local_10 = 0;
    for (local_24 = 2; local_24 < 0x3e; local_24 = local_24 + 1) {
      if ((s8(DAT_0064b1ca[local_24 * 0x14]) === 1) &&
         (iVar4 = FUN_004bfe5a(param_3, local_28, local_24), iVar4 !== 0)) {
        local_c = ((s8(DAT_0064b1c5[local_24 * 0x14]) << 3) /
                  s8(DAT_0064b1c8[local_24 * 0x14])) | 0;
        if ((DAT_0064b1bd[local_24 * 0x14] & 4) !== 0) {
          local_c = local_c + 1;
        }
        if (local_10 <= local_c) {
          local_10 = local_c;
          DAT_0064f379[local_28 * 0x58] = u8(local_24);
        }
      }
    }
    DAT_0064c7f4[param_3 * 0x594 + s8(DAT_0064f379[local_28 * 0x58])] =
         DAT_0064c7f4[param_3 * 0x594 + s8(DAT_0064f379[local_28 * 0x58])] + 1;
    DAT_0064f35a[local_28 * 0x58] = 0;
    DAT_0064f35c[local_28 * 0x58] = 0;
    DAT_0064f35e[local_28 * 0x58] = 0;
    DAT_0064f360[local_28 * 0x58] = 0;
    FUN_0043f493(local_28);
    DAT_0064f370[local_28 * 0x58] = 0;
    // memset buildings to 0
    for (let i = 0; i < 5; i++) {
      DAT_0064f374[local_28 * 0x58 + i] = 0;
    }
    if (DAT_0064c708[param_3 * 0x594] === 1) {
      FUN_0043d289(local_28, 1, 1);
      DAT_0064c6ac[param_3 * 0x594] = param_1;
      if ((1 << (param_3 & 0x1f) & DAT_00655b0b) === 0) {
        FUN_005b9ec6();
        for (local_14 = 0; local_14 < 0x14; local_14 = local_14 + 1) {
          uVar6 = FUN_005ae052(s8(DAT_00628370[local_14]) + param_1);
          iVar4 = s8(DAT_006283a0[local_14]) + param_2;
          iVar5 = FUN_004087c0(uVar6, iVar4);
          if (iVar5 !== 0) {
            FUN_005b976d(uVar6, iVar4, 1 << (param_3 & 0x1f), 1, 1);
            if ((0x27 < DAT_00655af8) && (local_14 < 8)) {
              iVar5 = FUN_005b8931(uVar6, iVar4);
              if ((DAT_00655b0b & iVar5) === 0) {
                bVar2 = FUN_005b89bb(uVar6, iVar4);
                if (s8(DAT_00627cce[u8(bVar2) * 0x18]) === -2) {
                  FUN_005b94fc(uVar6, iVar4, 4, 1, 1);
                }
              }
            }
          }
        }
        FUN_005b9f1c();
        if ((0x28 < DAT_00655af8) &&
           (iVar4 = FUN_005b8931(param_1, param_2), (DAT_00655b0b & iVar4) === 0)) {
          uVar3 = FUN_005adfa0(((DAT_00655af8 - 0x14) / 0x14) | 0, 2, 10);
          DAT_0064f349[local_28 * 0x58] = u8(uVar3);
          FUN_0043d289(local_28, 4, 1);
          FUN_0043d289(local_28, 5, 1);
          FUN_0043d289(local_28, 6, 1);
        }
        if ((0x28 < DAT_00655af8) && (DAT_0064f379[local_28 * 0x58] !== 0)) {
          FUN_005b3d06(s8(DAT_0064f379[local_28 * 0x58]), param_3, param_1, param_2);
        }
      }
    }
    DAT_0064f37a[local_28 * 0x58] = 0;
    // memset trade routes to 0
    for (let i = 0; i < 3; i++) {
      DAT_0064f384[local_28 * 0x58 + i] = 0;
      DAT_0064f381[local_28 * 0x58 + i] = 0;
    }
    for (local_14 = 0; local_14 < 9; local_14 = local_14 + 1) {
      uVar6 = FUN_005ae052(s8(DAT_00628350[local_14]) + param_1);
      iVar4 = s8(DAT_00628360[local_14]) + param_2;
      iVar5 = FUN_004087c0(uVar6, iVar4);
      if (iVar5 !== 0) {
        iVar5 = FUN_005b89e4(uVar6, iVar4);
        if (iVar5 !== 0) {
          iVar5 = FUN_005b8a81(uVar6, iVar4);
          if ((1 < DAT_00666134[iVar5 * 0x10]) &&
             ((iVar5 < 0x3f || ((DAT_0064f344[local_28 * 0x58] & 0x80) !== 0)))) {
            DAT_0064f344[local_28 * 0x58] = DAT_0064f344[local_28 * 0x58] | 0x200000;
          }
          DAT_0064f344[local_28 * 0x58] = DAT_0064f344[local_28 * 0x58] | 0x80;
        }
        pbVar7 = FUN_005b8931(uVar6, iVar4);
        if (((pbVar7 & 0x80) !== 0) || (cVar1 = FUN_005b89bb(uVar6, iVar4), cVar1 === 5)) {
          DAT_0064f344[local_28 * 0x58] = DAT_0064f344[local_28 * 0x58] | 0x800;
        }
      }
    }
    FUN_0043f7a7(local_28);
    FUN_0043d400(local_28);
    DAT_0064f38a[local_28 * 0x58] = 0;
    DAT_0064f38c[local_28 * 0x58] = 0;
    DAT_0064f38e[local_28 * 0x58] = 0;
    DAT_0064f390[local_28 * 0x58] = 0;
    DAT_0064f391[local_28 * 0x58] = 0;
    DAT_0064f392[local_28 * 0x58] = 0;
    DAT_0064f393[local_28 * 0x58] = 0;
    if (2 < DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(5000);
    }
    DAT_006ad8c4 = 0;
  } else {
    DAT_006ad8c4 = 0;
    DAT_006c90d0 = -2;
    FUN_0046b14d(0x3b, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
    iVar4 = FUN_00421bb0();
    while ((DAT_006c90d0 === -2 && (iVar5 = FUN_00421bb0(), iVar5 - iVar4 < 0xe10))) {
      FUN_0047e94e(1, 1);
    }
    if (DAT_006c90d0 === -2) {
      debug_log('Create City: Connection to server timed out');
      FUN_00410030('SERVERCONNECTTIME', null, 0);
      DAT_00628044 = 0;
    }
    while ((DAT_006c8fac !== 0 || (local_28 = DAT_006c90d0, DAT_006c8fa0 !== 0))) {
      FUN_0047e94e(1, 0);
    }
  }
  return local_28;
}


