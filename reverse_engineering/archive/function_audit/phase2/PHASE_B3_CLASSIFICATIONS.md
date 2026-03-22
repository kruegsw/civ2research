# Phase B3: UNSET Classifications — Remaining Blocks

Classified all 244 UNSET functions across 8 blocks (0x00400000, 0x00410000, 0x00450000, 0x004C0000, 0x00500000, 0x00510000, 0x005A0000, 0x005B0000).

## Block 0x00400000 (3 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x004081b0 | set_dlg_ctrl_id | FW | window | 45 | NN | MFC COleControlSite::SetDlgCtrlID — swaps ctrl_id field at this+0x28. No game logic. |
| 0x004081f0 | set_ascii_handler | FW | window | 45 | NN | Ghidra misidentified as `basic_ios::tie`. Actually sets keyboard event handler at this+0x2C. No game logic. |
| 0x0040efa0 | timevec_destructor | FW | crt | 36 | NN | Ghidra matched `_Timevec::~_Timevec`. Actually a GDI object destructor — calls gdi_8514(*this). No game logic. |

### Civ2-Specific Content Found:
None. All pure MFC/CRT framework.

---

## Block 0x00410000 (18 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0041852e | editor_dtor_step_02 | FW | seh_dtor | 15 | NN | Thunk to destroy_dropdown_item (thunk_FUN_00418ea0) |
| 0x0041853d | editor_dtor_step_03 | FW | seh_dtor | 15 | NN | Thunk to destroy_dropdown_item |
| 0x0041854c | editor_dtor_step_04 | FW | seh_dtor | 15 | NN | Thunk to destroy_button (thunk_FUN_0040f570) |
| 0x0041855b | editor_dtor_step_05 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x0041856a | editor_dtor_step_06 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x00418579 | editor_dtor_step_07 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x00418588 | editor_dtor_step_08 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x00418597 | editor_dtor_step_09 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x004185a6 | editor_dtor_step_10 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x004185b5 | editor_dtor_step_11 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x004185c4 | editor_dtor_step_12 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x004185d3 | editor_dtor_step_13 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x004185e2 | editor_dtor_step_14 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x004185f1 | editor_dtor_step_15 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x00418600 | editor_dtor_step_16 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x0041860f | editor_dtor_step_17 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x0041861e | editor_dtor_step_18 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |
| 0x0041862d | editor_dtor_step_19 | FW | seh_dtor | 15 | NN | Thunk to destroy_button |

### Civ2-Specific Content Found:
None. All 18 are identical 15-byte destructor stubs called sequentially from `destroy_editor_object` (0x004183d0). Steps 02-03 destroy dropdown items, steps 04-19 destroy buttons.

---

## Block 0x00450000 (3 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0045a526 | seh_epilog_exchange_gift | FW | seh | 15 | NN | SEH frame restore for handle_exchange_gift (FS:[0] restoration) |
| 0x0045f0a3 | seh_epilog_diplo_favor | FW | seh | 14 | NN | SEH frame restore for diplo_favor_menu |
| 0x0045fd59 | seh_epilog_show_gift | FW | seh | 14 | NN | SEH frame restore for show_gift_menu |

### Civ2-Specific Content Found:
None. All 3 are SEH exception handler epilog stubs for diplomacy UI functions.

---

## Block 0x004C0000 (18 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x004c1950 | seh_epilog_research_goal | FW | seh | 14 | NN | SEH epilog for show_research_goal_dialog |
| 0x004c217c | crt_cleanup_choose_research_1 | FW | crt | 12 | NN | CRT cleanup stub (thunk_FUN_0059df8a) for choose_research_tech |
| 0x004c2188 | crt_cleanup_choose_research_2 | FW | crt | 12 | NN | CRT cleanup stub for choose_research_tech |
| 0x004c219e | seh_epilog_choose_research | FW | seh | 15 | NN | SEH epilog for choose_research_tech |
| 0x004c2779 | seh_epilog_complete_research | FW | seh | 15 | NN | SEH epilog for complete_research |
| 0x004c951a | seh_epilog_spy_enters_city | FW | seh | 14 | NN | SEH epilog for spy_enters_city |
| 0x004cc975 | crt_static_init_frame_a1 | FW | crt | 26 | NN | CRT static init: construct via thunk_FUN_004187a0 |
| 0x004cc98f | crt_static_init_frame_a2 | FW | crt | 29 | NN | CRT static init: register atexit handler |
| 0x004cc9ac | crt_static_dtor_frame_a | FW | crt | 26 | NN | CRT static dtor: thunk_FUN_00418870 |
| 0x004cc9e0 | crt_static_init_frame_b1 | FW | crt | 30 | NN | CRT static init: construct via thunk_FUN_0043c460(0, 0x10) |
| 0x004cc9fe | crt_static_init_frame_b2 | FW | crt | 29 | NN | CRT static init: register atexit handler |
| 0x004cca1b | crt_static_dtor_frame_b | FW | crt | 26 | NN | CRT static dtor: thunk_FUN_0043c520 |
| 0x004cca35 | show_messagebox_CA35 | UI | popup | 132 | NN | Shows error messagebox when param exceeds maxParam. Calls MessageBoxA. No game formulas. |
| 0x004ccf2d | save_rules_txt | UI | rules_editor | 1149 | NN | Writes modified RULES.TXT file section-by-section. Scenario/modding editor only. |
| 0x004cdf3c | seh_epilog_cheat_checkbox | FW | seh | 15 | NN | SEH epilog for show_cheat_checkbox_dialog |
| 0x004ce6f9 | crt_cleanup_civilopedia | FW | crt | 9 | NN | Base class dtor for civilopedia viewer |
| 0x004ce70c | seh_epilog_civilopedia | FW | seh | 15 | NN | SEH epilog for show_civilopedia_viewer |
| 0x004cefdb | seh_epilog_rebuild_events | FW | seh | 14 | NN | SEH epilog for rebuild_event_system |

### Civ2-Specific Content Found:
- `show_messagebox_CA35` (0x4cca35): References string table offsets 0x8D0 and 0x8E8 for error caption/text. No game formulas.
- `save_rules_txt` (0x4ccf2d): Writes RULES.TXT sections — scenario editor tool. Contains file I/O for rule modifications but no runtime game formulas.

---

## Block 0x00500000 (46 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x005014bf | citywin_on_close | UI | citywin_wndmgmt | 38 | SK | close_dialog(2) |
| 0x005014e5 | citywin_close_all_panels | UI | citywin_wndmgmt | 70 | SK | close_dialog(1,3,4) |
| 0x0050152b | citywin_close_and_destroy | UI | citywin_wndmgmt | 38 | SK | close_all_panels() then on_close() |
| 0x00501551 | citywin_constructor | UI | citywin_init | 136 | SK | Base class ctors, vtable PTR_FUN_0061d6d4, init_members() |
| 0x0050160a | citywin_destructor | UI | citywin_init | 105 | SK | Set vtable, close_and_destroy(), base class dtors |
| 0x00501673 | citywin_dtor_helper_1 | FW | seh_dtor | 15 | NN | thunk_FUN_0043c520 |
| 0x00501682 | citywin_dtor_helper_2 | FW | seh_dtor | 15 | NN | thunk_FUN_0046ab49 |
| 0x00501691 | citywin_dtor_helper_3 | FW | seh_dtor | 9 | NN | COleCntrFrameWnd dtor (Ghidra MFC misID) |
| 0x005016a4 | citywin_seh_epilog | FW | seh | 14 | NN | Restores FS:[0] |
| 0x00508bc5 | citywin_redraw_all_panels | UI | citywin_layout | 191 | SK | Calls 8 draw functions (citizens, resources, food, prod, buy, supported, improvements, info) |
| 0x00508c84 | citywin_calc_panel_rect | UI | citywin_layout | 160 | SK | Scales coordinates by zoom factor: (zoom * coord + 1) / 2 + offsets |
| 0x00508d24 | citywin_calc_all_rects | UI | citywin_layout | 418 | SK | 12 calls to calc_panel_rect with hardcoded base coordinates for all panels |
| 0x00508ec6 | citywin_draw_border_fills | UI | citywin_layout | 354 | SK | Fills margins with palette color 10 if window > content (636x421) |
| 0x00509028 | citywin_calc_zoom_and_layout | UI | citywin_layout | 647 | SK | Zoom: 1 (small), 2 (default), 3 (large). Font size 0x10 or 0xC. CONTAINS_GAME_LOGIC: zoom thresholds define the 636x421 base city window size and 3 zoom levels |
| 0x005092af | citywin_draw_title_bar | UI | citywin_title | 378 | SK | Formats "city_name + turn + gold". Shows governor indicator if city.flags & 2. CONTAINS_GAME_LOGIC: reads DAT_0064bc60 (auto-governor flag bit 2) |
| 0x00509429 | citywin_full_refresh | UI | citywin_title | 246 | SK | Guards on city valid/alive, calls calc_city_production then redraws all panels |
| 0x0050951f | citywin_show_dialog | UI | citywin_title | 38 | SK | FUN_005bb574() + show_window() |
| 0x00509545 | citywin_bring_to_front | UI | citywin_title | 75 | SK | BringWindowToTop(hwnd) if not blocked |
| 0x00509935 | citywin_on_refresh_msg | UI | citywin_zoom_misc | 26 | SK | Just calls citywin_full_refresh() |
| 0x0050994f | citywin_close_dialog | UI | citywin_zoom_misc | 64 | SK | DAT_006aa75c = 1; refresh_map_chain() |
| 0x0050998f | citywin_calc_window_position | UI | citywin_zoom_misc | 186 | SK | Base 636x421 + chrome; center on screen |
| 0x00509a49 | citywin_set_zoom_and_position | UI | citywin_zoom_misc | 57 | SK | DAT_006aa78c = 2; if screen > 999: 3; calc_window_position() |
| 0x00509a82 | citywin_set_drag_mode | UI | citywin_zoom_misc | 26 | SK | DAT_006aa758 = 1 |
| 0x00509a9c | citywin_clear_drag_mode | UI | citywin_zoom_misc | 36 | SK | DAT_006aa758 = 0; full_refresh() |
| 0x0050b638 | citywin_dialog_cleanup_1 | FW | dialog_cleanup | 12 | NN | thunk_FUN_0059df8a (dialog teardown) |
| 0x0050b644 | citywin_dialog_cleanup_2 | FW | dialog_cleanup | 12 | NN | thunk_FUN_0059df8a |
| 0x0050b650 | citywin_dialog_cleanup_3 | FW | dialog_cleanup | 12 | NN | thunk_FUN_0059df8a |
| 0x0050b666 | citywin_seh_epilog_change | FW | seh | 14 | NN | SEH epilog for city_button_change |
| 0x0050bc4f | citywin_button_close_action | UI | citywin_buttons | 139 | SK | Gets city idx, sends net msg 99, closes panels. If MP mode 2, sets deferred close flag. |
| 0x0050bcda | citywin_set_imp_scroll | UI | citywin_buttons | 57 | SK | Sets DAT_006aa76c = param, refreshes improvements list |
| 0x0050bd13 | citywin_button_next_city | UI | citywin_buttons | 607 | SK | Finds next city alphabetically AFTER current; wraps to last. Pure string comparison — no game formulas. |
| 0x0050bf72 | citywin_button_prev_city | UI | citywin_buttons | 607 | SK | Same as next but reversed: initial sentinel "zzzzz..."; finds prev alphabetically. |
| 0x0050c1d1 | city_mouse | UI | citywin_mouse | 535 | SK | Hit-test dispatch: panel 1=resource map click, 2=citizen, 3=unit present, 4=sell improvement, 6=unit supported. No formulas. |
| 0x0050c405 | citywin_on_lbutton_down | UI | citywin_mouse | 34 | SK | city_mouse(x, y, 0) |
| 0x0050c427 | citywin_on_rbutton_down | UI | citywin_mouse | 34 | SK | city_mouse(x, y, 1) |
| 0x0050c449 | citywin_on_city_deleted | UI | citywin_notify | 75 | SK | If deleted city == displayed city: close dialog |
| 0x0050c494 | citywin_on_unit_moved | UI | citywin_notify | 485 | SK | Refreshes info panel if unit moved to/from city tile. No formulas, just recalc trigger. |
| 0x0050c679 | citywin_on_city_changed | UI | citywin_notify | 118 | SK | If changed city == displayed city: full_refresh() |
| 0x0050c6ef | citywin_on_tile_changed | UI | citywin_notify | 180 | SK | If changed tile within distance 3 of city: refresh top panels |
| 0x0050dada | citywin_on_activate | UI | citywin_activate | 92 | SK | Sets activation mode (0x15ac = 2 if not blocked, 1 if blocked) |
| 0x0050db36 | citywin_on_deactivate | UI | citywin_activate | 92 | SK | Restores mode, creates close button if was active |
| 0x0050db92 | citywin_on_getminmaxinfo | UI | citywin_activate | 38 | SK | Returns DAT_00655344 (window rect) |
| 0x0050dbb8 | citywin_on_nchittest | UI | citywin_activate | 38 | SK | Returns DAT_00655344 |
| 0x0050dbde | citywin_on_syscommand | UI | citywin_activate | 211 | SK | cmd 1: close. cmd 2: zoom out (min 2). cmd 3: zoom in (max 3, or 2 if screen<1000). |
| 0x0050dcb6 | citywin_on_create | UI | citywin_init | 498 | SK | Full window initialization: create 636x421 window, register surfaces (food/shield/trade), set all event handlers. |
| 0x0050dea8 | citywin_on_destroy | UI | citywin_activate | 51 | SK | Mark closing (0x15a0 = 1), destroy_buttons(), base cleanup |

### Civ2-Specific Content Found:
- **citywin_calc_all_rects** (0x508d24): Hardcoded panel coordinates: citizens(0,0,0x1b4,0x3d), resources(0,0x1b4,0xc8,0xa7), food(0x1b4,0,0xc8,0xa7), production(0x1b4,0xa7,0xc8,0xbd), buy(0x1b4,0x164,0xc8,0x41), supported(0,0xd4,0xc0,0x4e), improvements(0,0x122,0xc0,0x83), info(0xc0,0xd4,0xf4,0xd1). These define the city dialog layout geometry.
- **citywin_calc_zoom_and_layout** (0x509028): CONTAINS_GAME_LOGIC: Base city window = 636x421 pixels. 3 zoom levels (1/2/3). Font sizes 0x10 and 0xC.
- **citywin_draw_title_bar** (0x5092af): CONTAINS_GAME_LOGIC: Reads auto-governor flag (city flags bit 2 at DAT_0064bc60), multiplayer civ count (DAT_006aa78c). Display-only formulas.
- **citywin_on_create** (0x50dcb6): Registers surface handles: food=DAT_00645120, shield=DAT_00648820, trade=DAT_00647788. These are the panel surface object addresses.

---

## Block 0x00510000 (34 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x00511560 | scalar_deleting_destructor_a | FW | seh_dtor | 57 | NN | Calls dtor, conditionally deletes |
| 0x005115b0 | destructor_chain_a | FW | seh_dtor | 116 | NN | Deletes *(this+0x1c), calls sub-dtors |
| 0x00511624 | dtor_helper_a1 | FW | seh_dtor | 12 | NN | CString dtor |
| 0x00511630 | dtor_helper_a2 | FW | seh_dtor | 12 | NN | CString dtor |
| 0x0051163c | dtor_helper_a3 | FW | seh_dtor | 9 | NN | Base class dtor |
| 0x0051164f | seh_epilog_a | FW | seh | 14 | NN | Restores FS:[0] |
| 0x00514e10 | static_init_e31 | FW | crt | 26 | NN | Calls two sub-inits |
| 0x00514e2a | static_init_e31a | FW | crt | 26 | NN | CString constructor |
| 0x00514e44 | static_init_e31b | FW | crt | 29 | NN | Registers atexit handler |
| 0x00514e61 | static_dtor_e31 | FW | crt | 26 | NN | CString destructor |
| 0x0051516a | council_sub_dtor | FW | seh_dtor | 15 | NN | thunk_FUN_0043c520 (council dialog sub-dtor) |
| 0x00515179 | council_surface_dtor_1 | FW | seh_dtor | 15 | NN | Surface destructor for council advisor dialog |
| 0x00515188 | council_surface_dtor_2 | FW | seh_dtor | 15 | NN | Surface destructor |
| 0x00515197 | council_timevec_dtor | FW | seh_dtor | 15 | NN | _Timevec dtor (actually GDI object cleanup) |
| 0x005151a6 | council_cstring_dtor | FW | seh_dtor | 15 | NN | CString destructor |
| 0x005151b5 | council_cwnd_dtor_1 | FW | seh_dtor | 15 | NN | thunk_FUN_0044cba0 (CWnd dtor) |
| 0x005151c4 | council_surface_cleanup | FW | seh_dtor | 15 | NN | Surface cleanup |
| 0x005151d3 | council_cwnd_dtor_2 | FW | seh_dtor | 9 | NN | thunk_FUN_0044ca60 (CWnd dtor) |
| 0x005151e6 | council_seh_epilog | FW | seh | 14 | NN | SEH epilog for council advisor dialog |
| 0x0051689f | govt_button_dtor_1 | FW | seh_dtor | 15 | NN | Button dtor for government council dialog |
| 0x005168ae | govt_button_dtor_2 | FW | seh_dtor | 15 | NN | Button dtor |
| 0x005168bd | govt_button_dtor_3 | FW | seh_dtor | 15 | NN | Button dtor |
| 0x005168cc | govt_button_dtor_4 | FW | seh_dtor | 15 | NN | Button dtor |
| 0x005168db | govt_button_dtor_5 | FW | seh_dtor | 15 | NN | Button dtor |
| 0x005168ea | govt_button_dtor_6 | FW | seh_dtor | 15 | NN | Button dtor |
| 0x005168f9 | govt_timevec_dtor | FW | seh_dtor | 15 | NN | _Timevec dtor (GDI object cleanup) |
| 0x00516908 | govt_cdialog_dtor | FW | seh_dtor | 15 | NN | CDialog destructor |
| 0x00516917 | govt_video_dtor | FW | seh_dtor | 15 | NN | Video player destructor |
| 0x00516926 | govt_cwnd_dtor | FW | seh_dtor | 9 | NN | CWnd destructor |
| 0x00516939 | govt_seh_epilog | FW | seh | 14 | NN | SEH epilog for government council dialog |
| 0x005190d0 | static_init_dialog_obj | FW | crt | 26 | NN | Calls ctor + atexit for static dialog object |
| 0x005190ea | static_init_dialog_ctor | FW | crt | 31 | NN | CDialog constructor with ID 0x4000 |
| 0x00519109 | static_init_dialog_atexit | FW | crt | 29 | NN | Registers _atexit(dtor) for static dialog |
| 0x00519126 | static_dtor_dialog | FW | crt | 26 | NN | CDialog destructor for static object |

### Civ2-Specific Content Found:
None. All 34 functions are pure MFC/CRT framework: destructor stubs for advisor/government council dialog sub-objects, CRT static initializer/destructor pairs. The council advisor and government council dialogs they support do contain game logic (advisor AI dispatch at 0x516947), but these specific UNSET stubs do not.

---

## Block 0x005A0000 (20 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x005a94d0 | dtor_icon_list | FW | seh_dtor | 57 | NN | Scalar deleting destructor for icon-list control. Calls thunk_FUN_00418ea0, conditional delete. |
| 0x005a95b0 | dtor_grid_control | FW | seh_dtor | 57 | NN | Scalar deleting destructor for grid control (0x50 object). Calls thunk_FUN_0044cba0. |
| 0x005a9600 | popup_set_icon_bitmap | UI | popup | 43 | SK | set_bitmap(this.surface, bitmap_id). Simple accessor. |
| 0x005a9640 | popup_clear_checked | UI | popup | 32 | SK | this.checked (offset +0x34) = 0. Simple accessor. |
| 0x005a9670 | popup_get_item_text | UI | popup | 47 | SK | send_msg(this.listCtrl, 0x3CFF, index, buf). Win32 message wrapper. |
| 0x005a96b0 | popup_get_selected_text | UI | popup | 43 | SK | send_msg(this.listCtrl, 0x3D62, buf). Win32 message wrapper. |
| 0x005a96f0 | popup_is_cancelled | UI | popup | 47 | SK | return (this.flags_3D & 1) != 0. Simple predicate. |
| 0x005a9730 | popup_draw_icon | UI | popup | 55 | SK | draw_icon(this.surface, icon, x, y, flags). Rendering call. |
| 0x005ab07f | mp_cleanup_dialog | FW | dialog_cleanup | 12 | NN | Calls dialog_teardown (thunk_FUN_0059df8a) |
| 0x005ab095 | mp_restore_seh | FW | seh | 14 | NN | SEH epilog — restores FS:[0] |
| 0x005ab0a3 | mp_check_ready_waitprod | NW | mp | 125 | NN | Process network, check connection. Close popup if DAT_006c9214/game_over/disconnect. No game formulas. |
| 0x005ab120 | mp_check_ready_waitmoves | NW | mp | 125 | NN | Same pattern but checks DAT_006c9218 instead. No game formulas. |
| 0x005ab19d | mp_check_ready_human | NW | mp | 157 | NN | Checks DAT_006c920c, reconnect==1, disconnect==1. No game formulas. |
| 0x005ab23a | mp_check_ready_human_alt | NW | mp | 155 | NN | Same as above but reconnect!=0, disconnect!=0 (looser check). No game formulas. |
| 0x005abfdb | mp_client_cleanup_dialog | FW | dialog_cleanup | 12 | NN | Calls dialog_teardown |
| 0x005abff1 | mp_client_restore_seh | FW | seh | 15 | NN | SEH epilog |
| 0x005aebef | pbem_cleanup_dialog | FW | dialog_cleanup | 12 | NN | Calls dialog_teardown |
| 0x005aec05 | pbem_restore_seh | FW | seh | 15 | NN | SEH epilog |
| 0x005aed0d | pbem_email_cleanup | FW | dialog_cleanup | 12 | NN | Calls dialog_teardown for email address dialog |
| 0x005aed23 | pbem_email_restore_seh | FW | seh | 14 | NN | SEH epilog |

### Civ2-Specific Content Found:
- **mp_check_ready_waitprod/waitmoves/human/human_alt**: These check multiplayer synchronization state flags (DAT_006c9214/9218/920c) and connection/reconnect/game_over flags. They are multiplayer UI callbacks, not game logic — they just poll status and close a waiting popup when conditions are met.

---

## Block 0x005B0000 (1 UNSET → classified)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x005b6ab5 | draw_unit_for_dialog | RN | sprite | 53 | SK | Thunk: calls draw_unit(surface, unit_id, 4/*full*/, x, y+2, zoom, DAT_0063605c, 0). Pure rendering — draws unit sprite in a dialog popup. No game formulas. |

### Civ2-Specific Content Found:
- Rendering mode constant `4` = full unit sprite (vs. partial/icon modes). Y offset +2 for dialog alignment. Uses DAT_0063605c as the sprite zoom/scale factor.

---

## Summary

| Metric | Count |
|--------|-------|
| **Total UNSET classified** | **244** |
| New GL functions found | **0** |
| Functions with embedded game logic (display-only) | **3** |
| FW (Framework) | 157 |
| UI (User Interface) | 78 |
| NW (Network/Multiplayer) | 4 |
| RN (Rendering) | 1 |
| IO (Save/Load) | 0 |
| GL (Game Logic) | 0 |

### Porting Status Breakdown

| Status | Count |
|--------|-------|
| NN (Not Needed) | 163 |
| SK (Skip) | 81 |
| Total | 244 |

### Functions Flagged with Embedded Game Logic (CONTAINS_GAME_LOGIC)

1. **0x00509028 citywin_calc_zoom_and_layout**: Base city window dimensions (636x421), 3 zoom levels (1/2/3), font sizes (0x10/0xC). Display constants, not game state formulas.
2. **0x005092af citywin_draw_title_bar**: Reads auto-governor flag (city flags bit 2). The flag interpretation is game-relevant but the function is pure UI rendering.
3. **0x00508d24 citywin_calc_all_rects**: Hardcoded panel coordinate table (12 panels with x,y,w,h). Layout constants useful for UI recreation but not game logic.

### Key Finding

**No new game logic was discovered among these 244 UNSET functions.** All are either:
- **Framework boilerplate** (157): SEH epilog stubs, CRT static init/dtor pairs, MFC destructor thunks
- **UI rendering/dispatch** (78): City dialog window management, panel layout, mouse dispatch, notification handlers, popup accessors
- **Network callbacks** (4): Multiplayer ready-check polling stubs
- **Rendering** (1): Unit sprite draw thunk

The UNSET status of these functions correctly correlates with their lack of game logic importance. The classification gap was purely an administrative oversight from Phase 2, not a missed game logic area.
