# Master Classification -- All 5,149 Functions

Generated from Phase 2 pseudocode analysis of Civ2 MGE (civ2.exe).
Source: 34 pseudocode block files in `reverse_engineering/function_audit/phase2/pseudocode/`.

- Total functions: **5149**
- Porting-relevant (P/PA/FP/R/TH/TM/TL): **599** (11.6%)
- Framework/skip (SK/NN): **3635** (70.6%)
- Unclassified status: **915** (17.8%)
- Unclassified category: **762** (14.8%)

## Statistics

### By Category

| Category | Code | Count | % |
|----------|------|-------|---|
| Framework (CRT/MFC/SEH/Win32) | FW | 1975 | 38.4% |
| User Interface | UI | 1103 | 21.4% |
| Unclassified | UNSET | 762 | 14.8% |
| Game Logic | GL | 487 | 9.5% |
| Rendering | RN | 358 | 7.0% |
| Network/Multiplayer | NW | 164 | 3.2% |
| Sound/Audio | SN | 118 | 2.3% |
| AI | AI | 53 | 1.0% |
| File I/O | FI | 31 | 0.6% |
| Cutscene/Video | CS | 28 | 0.5% |
| Save/Load I/O | IO | 19 | 0.4% |
| Renderer/Drawing | RD | 18 | 0.3% |
| Multiplayer UI | MP | 12 | 0.2% |
| System Utilities | SYS | 8 | 0.2% |
| Viewport/Camera | VP | 7 | 0.1% |
| Utility | UTIL | 5 | 0.1% |
| Network | NET | 1 | 0.0% |
| **Total** | | **5149** | **100%** |

### By Porting Status

| Status | Meaning | Count | % |
|--------|---------|-------|---|
| P | Fully ported | 90 | 1.7% |
| PA | Partially ported | 171 | 3.3% |
| FP | Fully ported (legacy) | 11 | 0.2% |
| R | Referenced in JS | 51 | 1.0% |
| TH | TODO high priority | 62 | 1.2% |
| TM | TODO medium priority | 114 | 2.2% |
| TL | TODO low priority | 100 | 1.9% |
| SK | Skip (framework/rendering/UI) | 2422 | 47.0% |
| NN | Not needed (CRT/MFC/SEH) | 1213 | 23.6% |
| UNSET | Unclassified | 915 | 17.8% |
| **Total** | | **5149** | **100%** |

### By Block

| Block | Total | P | PA | FP | R | TH | TM | TL | SK | NN | ? | Top Categories |
|-------|-------|---|----|----|---|----|----|----|----|----|----|----------------|
| 0x00400000 | 154 | 11 | 7 | 0 | 1 | 1 | 1 | 0 | 128 | 2 | 3 | UI:71, FW:49, GL:20 |
| 0x00410000 | 204 | 2 | 21 | 0 | 5 | 0 | 6 | 4 | 88 | 60 | 18 | FW:88, UI:76, GL:18 |
| 0x00420000 | 157 | 0 | 3 | 0 | 2 | 1 | 4 | 5 | 61 | 81 | 0 | FW:61, UI:53, NW:39 |
| 0x00430000 | 114 | 12 | 4 | 0 | 1 | 1 | 1 | 0 | 63 | 32 | 0 | UI:73, GL:21, FW:20 |
| 0x00440000 | 355 | 15 | 7 | 0 | 1 | 0 | 0 | 0 | 60 | 37 | 235 | UNSET:235, FW:51, RN:30 |
| 0x00450000 | 136 | 3 | 3 | 0 | 2 | 6 | 7 | 3 | 7 | 1 | 104 | UI:100, GL:21, FW:7 |
| 0x00460000 | 107 | 0 | 9 | 0 | 1 | 0 | 0 | 0 | 81 | 16 | 0 | UI:35, FW:20, NW:14 |
| 0x00470000 | 139 | 0 | 9 | 8 | 1 | 0 | 0 | 0 | 34 | 21 | 66 | UNSET:60, CS:28, IO:19 |
| 0x00480000 | 61 | 0 | 10 | 0 | 0 | 1 | 4 | 1 | 9 | 36 | 0 | GL:23, NW:17, UI:12 |
| 0x00490000 | 124 | 0 | 3 | 0 | 2 | 3 | 8 | 0 | 17 | 91 | 0 | UI:55, NW:26, FW:17 |
| 0x004A0000 | 117 | 0 | 0 | 0 | 0 | 10 | 26 | 28 | 18 | 35 | 0 | FW:41, UI:35, GL:29 |
| 0x004B0000 | 164 | 8 | 2 | 0 | 1 | 2 | 3 | 4 | 34 | 61 | 49 | UNSET:49, UI:40, FW:34 |
| 0x004C0000 | 92 | 1 | 11 | 0 | 0 | 5 | 4 | 3 | 23 | 27 | 18 | UI:35, GL:25, UNSET:18 |
| 0x004D0000 | 123 | 0 | 0 | 0 | 0 | 9 | 3 | 12 | 44 | 55 | 0 | UI:66, FW:44, GL:12 |
| 0x004E0000 | 76 | 5 | 9 | 0 | 2 | 4 | 11 | 10 | 18 | 17 | 0 | GL:40, FW:18, UI:17 |
| 0x004F0000 | 107 | 0 | 1 | 0 | 0 | 10 | 8 | 12 | 52 | 24 | 0 | FW:52, GL:30, UI:23 |
| 0x00500000 | 123 | 0 | 12 | 0 | 0 | 0 | 0 | 0 | 32 | 33 | 46 | UNSET:46, UI:45, FW:32 |
| 0x00510000 | 162 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 96 | 32 | 34 | UI:69, UNSET:34, FW:32 |
| 0x00520000 | 51 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 33 | 16 | 0 | UI:22, FW:15, MP:12 |
| 0x00530000 | 23 | 0 | 6 | 0 | 8 | 0 | 0 | 0 | 0 | 9 | 0 | AI:14, UI:7, FW:2 |
| 0x00540000 | 37 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 27 | 8 | 0 | UI:27, FW:8, AI:2 |
| 0x00550000 | 152 | 0 | 8 | 3 | 9 | 0 | 0 | 0 | 37 | 0 | 95 | UNSET:95, UI:28, GL:20 |
| 0x00560000 | 131 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 13 | 118 | UNSET:46, UI:31, NW:15 |
| 0x00570000 | 122 | 0 | 0 | 0 | 0 | 5 | 7 | 4 | 98 | 8 | 0 | UI:63, FW:37, GL:16 |
| 0x00580000 | 91 | 2 | 3 | 0 | 1 | 0 | 7 | 8 | 22 | 27 | 21 | UI:30, GL:23, UNSET:21 |
| 0x00590000 | 157 | 1 | 3 | 0 | 1 | 0 | 10 | 4 | 5 | 46 | 87 | UNSET:113, GL:26, FW:18 |
| 0x005A0000 | 111 | 14 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 75 | 20 | UI:53, UNSET:20, GL:16 |
| 0x005B0000 | 242 | 16 | 38 | 0 | 11 | 2 | 4 | 2 | 164 | 4 | 1 | FW:122, GL:99, UI:20 |
| 0x005C0000 | 339 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 339 | 0 | 0 | RN:250, FW:89 |
| 0x005D0000 | 370 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 370 | 0 | 0 | FW:258, SN:100, RN:12 |
| 0x005E0000 | 357 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 357 | 0 | 0 | FW:357 |
| 0x005F0000 | 346 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 346 | 0 | FW:346 |
| 0x00600000 | 103 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 103 | 0 | 0 | FW:103 |
| 0x00610000 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | RN:2 |

### Top 40 Subcategories

| Subcategory | Count |
|-------------|-------|
| UNSET | 762 |
| UI.editor | 162 |
| FW.crt | 151 |
| FW.window | 109 |
| FW.SEH | 87 |
| FW.surface | 86 |
| FW | 75 |
| UI.advisor | 70 |
| FW.seh | 63 |
| UI.civilopedia | 61 |
| RN.sprite | 58 |
| UI.IntelAdvisor | 55 |
| FW.ddctrl | 52 |
| FW.seh_crt | 48 |
| FW.accessor | 46 |
| RN.palette | 46 |
| RN.control | 46 |
| GL.diplomacy | 42 |
| UI.diplomacy | 41 |
| SN.wave_audio | 41 |
| UI.control | 40 |
| FW.CRT | 40 |
| UI.wonder | 40 |
| GL | 40 |
| UI.text | 36 |
| UI.Popup | 36 |
| FW.crt_mem | 36 |
| FRAMEWORK.seh | 35 |
| FW.seh_dtor | 35 |
| FW.blit | 34 |
| FW.crt_string | 34 |
| UI.parley | 33 |
| FW.DTOR | 33 |
| UI.helper | 32 |
| FW.UI | 32 |
| FW.OBJ | 32 |
| RN.port | 32 |
| FW.input | 32 |
| FW.crt_eh | 32 |
| FW.mfc | 31 |

### Porting Priority Summary

Functions with game logic that have been ported or are candidates:

| Priority | Count | Description |
|----------|-------|-------------|
| P (done) | 90 | Fully ported to JS engine |
| PA (partial) | 171 | Core logic ported, edge cases remain |
| FP (legacy) | 11 | Ported via earlier analysis |
| R (referenced) | 51 | Called from JS but logic not ported |
| TH (high) | 62 | High priority game logic TODO |
| TM (medium) | 114 | Medium priority TODO |
| TL (low) | 100 | Low priority TODO |
| **Subtotal** | **599** | **All porting-relevant functions** |

## Master Table

| Address | Name | Category | Subcategory | Size | Block | Porting | Summary |
|---------|------|----------|-------------|------|-------|---------|---------|
| 0x00406a80 | FID_conflict:_$E31 | FW | crt | 26 | 0x00400000 | NN |  |
| 0x00406a9a | crt_init_global_object | FW | crt | 26b | 0x00400000 | SK |  |
| 0x00406ab4 | crt_register_atexit | FW | crt | 29b | 0x00400000 | SK |  |
| 0x00406ad1 | crt_atexit_destructor | FW | crt | 26b | 0x00400000 | SK |  |
| 0x00406aeb | minimap_lock_drawing | RN | minimap | 23b | 0x00400000 | SK |  |
| 0x00406b02 | minimap_unlock_and_redraw | RN | minimap | 38b | 0x00400000 | SK |  |
| 0x00406b28 | minimap_lock_and_hide | RN | minimap | 36b | 0x00400000 | SK |  |
| 0x00406b4c | minimap_calc_viewport | RN | minimap | 620b | 0x00400000 | SK |  |
| 0x00406db8 | minimap_tile_to_screen | RN | minimap | 169b | 0x00400000 | SK |  |
| 0x00406e61 | minimap_get_tile_color | RN | minimap | 425b | 0x00400000 | SK |  |
| 0x0040701e | minimap_draw_goto_line | RN | minimap | 211b | 0x00400000 | SK |  |
| 0x004070f1 | minimap_draw_radius | RN | minimap | 587b | 0x00400000 | SK |  |
| 0x0040733c | minimap_full_redraw | RN | minimap | 416b | 0x00400000 | SK |  |
| 0x004074dc | minimap_left_click | RN | minimap | 380b | 0x00400000 | SK |  |
| 0x00407658 | minimap_right_click | RN | minimap | 510b | 0x00400000 | SK |  |
| 0x0040785b | status_panel_calc_rect | UI | status | 255b | 0x00400000 | SK |  |
| 0x0040795a | status_panel_invalidate_1 | UI | status | 38b | 0x00400000 | SK |  |
| 0x00407980 | status_panel_invalidate_2 | UI | status | 38b | 0x00400000 | SK |  |
| 0x004079a6 | main_window_setup | UI | status | 395b | 0x00400000 | SK |  |
| 0x00407b31 | main_window_close | FW | window | 33b | 0x00400000 | SK |  |
| 0x00407f90 | rect_get_width | FW | window | 27b | 0x00400000 | SK |  |
| 0x00407fc0 | rect_get_height | FW | window | 28b | 0x00400000 | SK |  |
| 0x00407ff0 | cursor_update | FW | window | 21b | 0x00400000 | SK |  |
| 0x00408010 | window_set_style | FW | window | 43b | 0x00400000 | SK |  |
| 0x00408050 | window_invalidate | FW | window | 43b | 0x00400000 | SK |  |
| 0x00408090 | window_manage | FW | window | 37b | 0x00400000 | SK |  |
| 0x004080c0 | window_get_client_width | FW | window | 37b | 0x00400000 | SK |  |
| 0x004080f0 | window_update_rect | FW | window | 43b | 0x00400000 | SK |  |
| 0x00408130 | set_paint_handler | FW | window | 45b | 0x00400000 | SK |  |
| 0x00408170 | set_timer_handler | FW | window | 45b | 0x00400000 | SK |  |
| 0x004081b0 | SetDlgCtrlID | UNSET |  | 45 | 0x00400000 |  |  |
| 0x004081f0 | tie | UNSET |  | 45 | 0x00400000 |  |  |
| 0x00408230 | set_handler_0x30 | FW | window | 45b | 0x00400000 | SK |  |
| 0x00408270 | set_handler_0x34 | FW | window | 45b | 0x00400000 | SK |  |
| 0x004082b0 | set_handler_0x38 | FW | window | 45b | 0x00400000 | SK |  |
| 0x004082f0 | set_handler_0x40 | FW | window | 45b | 0x00400000 | SK |  |
| 0x00408330 | set_handler_0x44 | FW | window | 45b | 0x00400000 | SK |  |
| 0x00408370 | set_scroll_step | FW | window | 45b | 0x00400000 | SK |  |
| 0x004083b0 | window_destroy_and_cleanup | FW | window | 41b | 0x00400000 | SK |  |
| 0x004083f0 | window_post_cleanup | FW | window | 34b | 0x00400000 | SK |  |
| 0x00408420 | window_swap_handle | FW | window | 43b | 0x00400000 | SK |  |
| 0x00408460 | end_paint | FW | window | 32b | 0x00400000 | SK |  |
| 0x00408490 | invalidate_region | FW | window | 180b | 0x00400000 | SK |  |
| 0x00408580 | window_update_client | FW | window | 43b | 0x00400000 | SK |  |
| 0x004085c0 | EnableStackedTabs | FW | window | 36b | 0x00400000 | SK |  |
| 0x004085f0 | window_show_and_update | FW | window | 33b | 0x00400000 | SK |  |
| 0x00408620 | window_show_impl | FW | window | 38b | 0x00400000 | SK |  |
| 0x00408650 | window_show | FW | window | 37b | 0x00400000 | SK |  |
| 0x00408680 | set_rect_abs | FW | window | 42b | 0x00400000 | SK |  |
| 0x004086c0 | set_rect_wh | FW | window | 48b | 0x00400000 | SK |  |
| 0x00408700 | surface_fill_rect_color | FW | window | 63b | 0x00400000 | SK |  |
| 0x00408750 | surface_set_palette | FW | window | 34b | 0x00400000 | SK |  |
| 0x00408780 | fill_rect_palette | FW | window | 50b | 0x00400000 | SK |  |
| 0x004087c0 | is_tile_valid | GL | mapgen | 80b | 0x00400000 | PA |  |
| 0x00408830 | map_fill_byte_layer | GL | mapgen | 67b | 0x00400000 | PA |  |
| 0x00408873 | map_fill_rect_byte_layer | GL | mapgen | 144b | 0x00400000 | PA |  |
| 0x00408903 | map_copy_byte_layer | GL | mapgen | 73b | 0x00400000 | PA |  |
| 0x0040894c | mapgen_progress_tick | GL | mapgen | 51b | 0x00400000 | NN |  |
| 0x0040897f | mapgen_calc_fertility | GL | mapgen | 948b | 0x00400000 | P |  |
| 0x00408d33 | generate_world_map | GL | mapgen | 6004b | 0x00400000 | P |  |
| 0x0040a54e | mapgen_seh_cleanup | FW | seh | 12b | 0x00400000 | SK |  |
| 0x0040a564 | mapgen_seh_restore | FW | seh | 14b | 0x00400000 | SK |  |
| 0x0040a572 | place_continent | GL | mapgen | 497b | 0x00400000 | P |  |
| 0x0040a763 | place_land_small | GL | mapgen | 193b | 0x00400000 | P |  |
| 0x0040a824 | check_land_bounds | GL | mapgen | 110b | 0x00400000 | P |  |
| 0x0040a892 | mark_land_3tiles | GL | mapgen | 73b | 0x00400000 | P |  |
| 0x0040a8db | mark_land_1tile | GL | mapgen | 84b | 0x00400000 | P |  |
| 0x0040a92f | place_land_large | GL | mapgen | 373b | 0x00400000 | P |  |
| 0x0040aaa4 | place_land_island | GL | mapgen | 157b | 0x00400000 | P |  |
| 0x0040ab41 | try_create_inland_sea | GL | mapgen | 281b | 0x00400000 | P |  |
| 0x0040ac5a | generate_rivers | GL | mapgen | 1242b | 0x00400000 | P |  |
| 0x0040bbb0 | text_begin | UI | text | 29b | 0x00400000 | SK |  |
| 0x0040bbe0 | text_add_string | UI | text | 33b | 0x00400000 | SK |  |
| 0x0040bc10 | text_add_label_id | UI | text | 33b | 0x00400000 | SK |  |
| 0x0040bc40 | dialog_set_margins | UI | text | 42b | 0x00400000 | SK |  |
| 0x0040bc80 | dialog_get_selection | UI | text | 38b | 0x00400000 | SK |  |
| 0x0040bcb0 | grassland_has_shield | GL | mapgen | 72b | 0x00400000 | PA |  |
| 0x0040bd10 | get_max_tax_rate | GL | government | 156b | 0x00400000 | PA |  |
| 0x0040bdac | balance_tax_rates | GL | government | 293b | 0x00400000 | PA |  |
| 0x0040bed1 | taxrate_redraw | UI | taxdlg | 27b | 0x00400000 | SK |  |
| 0x0040beec | taxrate_set_tax | UI | taxdlg | 403b | 0x00400000 | SK |  |
| 0x0040c07f | taxrate_set_luxury | UI | taxdlg | 403b | 0x00400000 | SK |  |
| 0x0040c212 | taxrate_set_science | UI | taxdlg | 403b | 0x00400000 | SK |  |
| 0x0040c3a5 | taxrate_close | UI | taxdlg | 40b | 0x00400000 | SK |  |
| 0x0040c3cd | taxrate_checkbox_handler | UI | taxdlg | 179b | 0x00400000 | SK |  |
| 0x0040c480 | taxrate_recalc_totals | GL | production | 848b | 0x00400000 | TH |  |
| 0x0040c7d0 | taxrate_paint | UI | taxdlg | 1428b | 0x00400000 | SK |  |
| 0x0040cd64 | open_tax_rate_dialog | UI | taxdlg | 4140b | 0x00400000 | SK |  |
| 0x0040dda0 | taxdlg_seh_cleanup | FW | seh | 12b | 0x00400000 | SK |  |
| 0x0040ddb6 | taxdlg_seh_restore | FW | seh | 16b | 0x00400000 | SK |  |
| 0x0040ddc6 | show_tax_rate_dialog | UI | taxdlg | 226b | 0x00400000 | SK |  |
| 0x0040dea8 | show_taxdlg_cleanup | FW | seh | 12b | 0x00400000 | SK |  |
| 0x0040debe | show_taxdlg_seh_restore | FW | seh | 14b | 0x00400000 | SK |  |
| 0x0040decc | check_and_show_tax_dialog | UI | taxdlg | 331b | 0x00400000 | TM |  |
| 0x0040e017 | show_find_city_dialog | UI | findcity | 886b | 0x00400000 | SK |  |
| 0x0040e38d | findcity_seh_cleanup | FW | seh | 12b | 0x00400000 | SK |  |
| 0x0040e3a3 | findcity_seh_restore | FW | seh | 14b | 0x00400000 | SK |  |
| 0x0040e3b1 | handle_revolution | UI | revolution | 397b | 0x00400000 | R |  |
| 0x0040ef50 | process_messages | UI | control | 21b | 0x00400000 | SK |  |
| 0x0040ef70 | ctrl_get_height | UI | control | 28b | 0x00400000 | SK |  |
| 0x0040efa0 | ~_Timevec | UNSET |  | 36 | 0x00400000 |  |  |
| 0x0040efd0 | ctrl_measure_text | UI | control | 42b | 0x00400000 | SK |  |
| 0x0040f010 | ctrl_destructor_and_free | UI | control | 57b | 0x00400000 | SK |  |
| 0x0040f060 | dialog_object_constructor | UI | control | 196b | 0x00400000 | SK |  |
| 0x0040f1e0 | dialog_object_destructor | UI | control | 127b | 0x00400000 | SK |  |
| 0x0040f25f | dtor_bitmap_ctrl | UI | control | 15b | 0x00400000 | SK |  |
| 0x0040f26e | dtor_checkbox_array | UI | control | 24b | 0x00400000 | SK |  |
| 0x0040f286 | dtor_scrollbar_3 | UI | control | 15b | 0x00400000 | SK |  |
| 0x0040f295 | dtor_scrollbar_2 | UI | control | 15b | 0x00400000 | SK |  |
| 0x0040f2a4 | dtor_scrollbar_1 | UI | control | 15b | 0x00400000 | SK |  |
| 0x0040f2b3 | dtor_base_object | UI | control | 9b | 0x00400000 | SK |  |
| 0x0040f2c6 | dtor_seh_restore | FW | seh | 14b | 0x00400000 | SK |  |
| 0x0040f320 | EnableStackedTabs | FW | window | 36b | 0x00400000 | SK |  |
| 0x0040f350 | ctrl_set_editable | UI | control | 36b | 0x00400000 | SK |  |
| 0x0040f380 | ctrl_invalidate_parent | UI | control | 65b | 0x00400000 | SK |  |
| 0x0040f3e0 | init_bitmap_ctrl | UI | control | 100b | 0x00400000 | SK |  |
| 0x0040f480 | init_base_ctrl | UI | control | 110b | 0x00400000 | SK |  |
| 0x0040f510 | ctrl_destroy_window | UI | control | 75b | 0x00400000 | SK |  |
| 0x0040f570 | ctrl_destroy_with_seh | UI | control | 83b | 0x00400000 | SK |  |
| 0x0040f5c3 | ctrl_destroy_chain_1 | UI | control | 9b | 0x00400000 | SK |  |
| 0x0040f5d6 | ctrl_destroy_seh_restore | FW | seh | 14b | 0x00400000 | SK |  |
| 0x0040f610 | ctrl_destroy_child | UI | control | 88b | 0x00400000 | SK |  |
| 0x0040f680 | create_text_button | UI | control | 133b | 0x00400000 | SK |  |
| 0x0040f730 | ctrl_init_params | UI | control | 120b | 0x00400000 | SK |  |
| 0x0040f7d0 | ctrl_set_scroll_callback | UI | control | 45b | 0x00400000 | SK |  |
| 0x0040f810 | ctrl_get_child_hwnd | UI | control | 28b | 0x00400000 | SK |  |
| 0x0040f840 | ctrl_set_change_callback | UI | control | 45b | 0x00400000 | SK |  |
| 0x0040f880 | ctrl_set_value | UI | control | 33b | 0x00400000 | SK |  |
| 0x0040f8b0 | init_checkbox_ctrl | UI | control | 83b | 0x00400000 | SK |  |
| 0x0040f930 | destroy_checkbox_ctrl | UI | control | 90b | 0x00400000 | SK |  |
| 0x0040f98a | checkbox_dtor_chain | UI | control | 9b | 0x00400000 | SK |  |
| 0x0040f99d | checkbox_dtor_seh_restore | FW | seh | 14b | 0x00400000 | SK |  |
| 0x0040f9d0 | create_checkbox | UI | control | 167b | 0x00400000 | SK |  |
| 0x0040faa0 | ctrl_set_callback | UI | control | 33b | 0x00400000 | SK |  |
| 0x0040fad0 | ctrl_set_checked | UI | control | 33b | 0x00400000 | SK |  |
| 0x0040fb00 | init_scrollbar_ctrl | UI | control | 113b | 0x00400000 | SK |  |
| 0x0040fbb0 | destroy_scrollbar_ctrl | UI | control | 90b | 0x00400000 | SK |  |
| 0x0040fc0a | scrollbar_dtor_chain | UI | control | 9b | 0x00400000 | SK |  |
| 0x0040fc1d | scrollbar_dtor_seh_restore | FW | seh | 14b | 0x00400000 | SK |  |
| 0x0040fc50 | create_scrollbar | UI | control | 124b | 0x00400000 | SK |  |
| 0x0040fcf0 | scrollbar_set_position | UI | control | 52b | 0x00400000 | SK |  |
| 0x0040fd40 | scrollbar_set_range | UI | control | 47b | 0x00400000 | SK |  |
| 0x0040fd80 | scrollbar_set_handler | UI | control | 33b | 0x00400000 | SK |  |
| 0x0040fdb0 | surface_fill_from_rect | UI | control | 71b | 0x00400000 | SK |  |
| 0x0040fe10 | text_newline | UI | text | 29b | 0x00400000 | SK |  |
| 0x0040fe40 | text_begin_number | UI | text | 29b | 0x00400000 | SK |  |
| 0x0040fe70 | text_end_number | UI | text | 29b | 0x00400000 | SK |  |
| 0x0040fea0 | text_begin_highlight | UI | text | 29b | 0x00400000 | SK |  |
| 0x0040fed0 | text_end_highlight | UI | text | 29b | 0x00400000 | SK |  |
| 0x0040ff00 | display_improvement | UI | text | 33b | 0x00400000 | SK |  |
| 0x0040ff30 | text_add_number | UI | text | 33b | 0x00400000 | SK |  |
| 0x0040ff60 | show_message | UI | text | 46b | 0x00400000 | SK |  |
| 0x0040ffa0 | open_list_dialog | UI | text | 47b | 0x00400000 | SK |  |
| 0x0040ffe0 | create_dialog_window | UI | text | 56b | 0x00400000 | SK |  |
| 0x00410030 | show_dialog_popup | UI | dialog | 43B | 0x00410000 | TL |  |
| 0x00410070 | get_civ_name_for_display | UI | text | 28B | 0x00410000 | PA | Thunk to FUN_00493d13. |
| 0x004100a0 | blit_sprite_wrapper | UI | render | 47B | 0x00410000 | NN |  |
| 0x004100cf | show_city_info_popup | UI | city_dialog | 518B | 0x00410000 | PA |  |
| 0x004102d5 | FUN_004102d5 | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x004102e1 | FUN_004102e1 | FW | SEH | 9 | 0x00410000 | SK |  |
| 0x004102f4 | FUN_004102f4 | FW | SEH | 14 | 0x00410000 | SK |  |
| 0x00410302 | center_map_on_cursor | UI | map_input | 56B | 0x00410000 | PA |  |
| 0x0041033a | center_all_map_views | UI | map_input | 116B | 0x00410000 | NN |  |
| 0x004103ae | refresh_map_after_city_dialog | UI | map_input | 84B | 0x00410000 | NN |  |
| 0x00410402 | set_map_center_position | UI | map_input | 98B | 0x00410000 | PA |  |
| 0x00410464 | check_scroll_needed | UI | map_input | 404B | 0x00410000 | NN |  |
| 0x004105f8 | scroll_all_views_to_tile | UI | map_input | 261B | 0x00410000 | NN |  |
| 0x004106fd | pixel_to_direction | UI | map_input | 312B | 0x00410000 | NN | Converts screen pixel click to isometric direction index relative to unit position. |
| 0x00410835 | update_map_cursor_shape | UI | map_input | 554B | 0x00410000 | NN |  |
| 0x00410a64 | cancel_pending_goto | UI | map_input | 191B | 0x00410000 | NN |  |
| 0x00410b23 | activate_goto_cursor | UI | map_input | 160B | 0x00410000 | NN |  |
| 0x00410bc3 | handle_right_mouse_down | UI | map_input | 311B | 0x00410000 | NN |  |
| 0x00410cfa | handle_right_mouse_up | UI | map_input | 158B | 0x00410000 | NN |  |
| 0x00410d98 | select_tile_and_center | UI | map_input | 114B | 0x00410000 | PA |  |
| 0x00410e0a | is_goto_mode | UI | map_input | 60B | 0x00410000 | NN |  |
| 0x00410e46 | set_all_views_goto_mode | UI | map_input | 146B | 0x00410000 | NN |  |
| 0x00410ed8 | cancel_goto_mode | UI | map_input | 159B | 0x00410000 | NN |  |
| 0x00410f77 | map_window_click | UI | map_input | 1866B | 0x00410000 | PA |  |
| 0x004116c1 | map_left_click | UI | map_input | 34 | 0x00410000 | NN |  |
| 0x004116e3 | map_right_click | UI | map_input | 34 | 0x00410000 | NN |  |
| 0x00411705 | map_double_click | UI | map_input | 767B | 0x00410000 | NN | Opens terrain/improvement help dialog on double-click. |
| 0x00411a13 | move_unit_to_neighbor | UI | map_input | 114B | 0x00410000 | PA |  |
| 0x00411a85 | handle_unit_ascii_no_active | UI | map_input | 333B | 0x00410000 | NN |  |
| 0x00411bd7 | show_cheat_menu | UI | debug | 30B | 0x00410000 | NN |  |
| 0x00411bf5 | handle_unit_orders_key | UI | map_input | 764B | 0x00410000 | PA |  |
| 0x00411f91 | map_ascii | UI | map_input | 1203B | 0x00410000 | PA |  |
| 0x004125c6 | map_key | UI | map_input | 2451B | 0x00410000 | PA |  |
| 0x004131c0 | handle_map_timer_tick | UI | map_view | 157B | 0x00410000 | NN |  |
| 0x0041325d | toggle_minimap_mode | UI | map_view | 90 | 0x00410000 | NN |  |
| 0x004132b7 | resize_map_panel | UI | map_view | 153 | 0x00410000 | NN |  |
| 0x00413350 | check_primary_view | UI | map_view | 109 | 0x00410000 | NN |  |
| 0x004133c2 | FUN_004133c2 | UI | map_view | 90 | 0x00410000 | NN |  |
| 0x0041341c | FUN_0041341c | UI | map_view | 90 | 0x00410000 | NN |  |
| 0x00413476 | draw_status_bar | UI | map_view | 304 | 0x00410000 | NN |  |
| 0x004135ab | handle_view_control | UI | map_view | 343 | 0x00410000 | NN |  |
| 0x00413717 | init_map_view | UI | map_view | 889 | 0x00410000 | NN |  |
| 0x00413a90 | init_all_map_views | UI | map_view | 321 | 0x00410000 | NN |  |
| 0x00413bd1 | destroy_all_map_views | UI | map_view | 164 | 0x00410000 | NN |  |
| 0x00414b70 | FUN_00414b70 | FW | FW | 47 | 0x00410000 | SK |  |
| 0x00414bb0 | FUN_00414bb0 | FW | FW | 37 | 0x00410000 | SK |  |
| 0x00414be0 | FUN_00414be0 | FW | FW | 43 | 0x00410000 | SK |  |
| 0x00414c20 | FUN_00414c20 | FW | FW | 45 | 0x00410000 | SK |  |
| 0x00414c60 | FUN_00414c60 | FW | FW | 45 | 0x00410000 | SK |  |
| 0x00414ca0 | FUN_00414ca0 | FW | FW | 45 | 0x00410000 | SK |  |
| 0x00414ce0 | FUN_00414ce0 | FW | FW | 39 | 0x00410000 | SK |  |
| 0x00414d10 | FUN_00414d10 | FW | FW | 28 | 0x00410000 | SK |  |
| 0x00414d40 | FUN_00414d40 | FW | FW | 39 | 0x00410000 | SK |  |
| 0x00414d70 | set_window_title | FW | FW | 33 | 0x00410000 | SK |  |
| 0x00414da0 | EnableStackedTabs | FW | FW | 36 | 0x00410000 | SK |  |
| 0x00414dd0 | show_city_info_text | FW | FW | 39 | 0x00410000 | SK |  |
| 0x00414e00 | IsTracking | FW | FW | 31 | 0x00410000 | SK |  |
| 0x00414e30 | bubble_sort_bytes | GL | sort | 210B | 0x00410000 | P |  |
| 0x00414f02 | bubble_sort_ints | GL | sort | 206B | 0x00410000 | P |  |
| 0x00415040 | build_file_path | FI | FI | 76 | 0x00410000 | NN |  |
| 0x0041508c | open_game_file | FI | FI | 121 | 0x00410000 | NN |  |
| 0x00415105 | get_file_length | FI | FI | 46 | 0x00410000 | NN |  |
| 0x00415133 | file_exists | FI | FI | 85 | 0x00410000 | NN |  |
| 0x004151e0 | snapshot_tech_table | UI | editor | 295B | 0x00410000 | NN |  |
| 0x00415307 | restore_tech_table | UI | editor | 275B | 0x00410000 | NN |  |
| 0x0041541a | populate_editor_controls | UI | editor | 343B | 0x00410000 | NN |  |
| 0x0041557b | read_editor_controls | UI | editor | 480B | 0x00410000 | NN |  |
| 0x00415765 | refresh_editor_display | UI | editor | 27B | 0x00410000 | NN |  |
| 0x00415780 | write_techs_to_file | UI | editor | 466B | 0x00410000 | NN |  |
| 0x00415952 | recount_active_techs | GL | tech | 238B | 0x00410000 | R | Resolves prereq chains through disabled techs. |
| 0x00415a40 | show_messagebox_5A40 | UI | editor | 274B | 0x00410000 | NN |  |
| 0x00415b52 | populate_tech_prereq_list | UI | editor | 769B | 0x00410000 | NN |  |
| 0x00415e53 | rename_tech_dialog | UI | editor | 731B | 0x00410000 | NN |  |
| 0x0041612e | show_advances_help | UI | editor | 95 | 0x00410000 | NN |  |
| 0x0041618d | FUN_0041618d | UI | editor | 40 | 0x00410000 | NN |  |
| 0x004161b5 | edit_civilopedia_entry | UI | editor | 136 | 0x00410000 | NN |  |
| 0x0041623d | handle_editor_control_change | UI | editor | 279B | 0x00410000 | NN |  |
| 0x00416354 | create_editor_dropdown | UI | editor | 962B | 0x00410000 | NN |  |
| 0x00416734 | create_editor_textfield | UI | editor | 244B | 0x00410000 | NN |  |
| 0x00416828 | paint_editor_window | UI | editor | 1142B | 0x00410000 | NN |  |
| 0x00416c9e | create_rules_editor | UI | editor | 2186B | 0x00410000 | NN |  |
| 0x00417542 | FUN_00417542 | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x00417558 | FUN_00417558 | FW | SEH | 14 | 0x00410000 | SK |  |
| 0x00417566 | open_rules_editor | FW | SEH | 89 | 0x00410000 | SK |  |
| 0x004175bf | FUN_004175bf | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x004175d5 | FUN_004175d5 | FW | SEH | 14 | 0x00410000 | SK |  |
| 0x00417ef0 | set_editor_font | FW | FW | 93 | 0x00410000 | SK |  |
| 0x00417f70 | FUN_00417f70 | FW | FW | 28 | 0x00410000 | SK |  |
| 0x00417fa0 | construct_editor_object | FW | FW | 498 | 0x00410000 | SK |  |
| 0x004183d0 | destroy_editor_object | FW | FW | 335 | 0x00410000 | SK |  |
| 0x0041851f | editor_dtor_step_01 | FW | FW | 15 | 0x00410000 | SK | destroy_dropdown_item |
| 0x0041852e | editor_dtor_step_02 | UNSET |  | 15 | 0x00410000 |  | destroy_dropdown_item |
| 0x0041853d | editor_dtor_step_03 | UNSET |  | 15 | 0x00410000 |  | destroy_dropdown_item |
| 0x0041854c | editor_dtor_step_04 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x0041855b | editor_dtor_step_05 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x0041856a | editor_dtor_step_06 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x00418579 | editor_dtor_step_07 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x00418588 | editor_dtor_step_08 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x00418597 | editor_dtor_step_09 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x004185a6 | editor_dtor_step_10 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x004185b5 | editor_dtor_step_11 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x004185c4 | editor_dtor_step_12 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x004185d3 | editor_dtor_step_13 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x004185e2 | editor_dtor_step_14 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x004185f1 | editor_dtor_step_15 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x00418600 | editor_dtor_step_16 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x0041860f | editor_dtor_step_17 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x0041861e | editor_dtor_step_18 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x0041862d | editor_dtor_step_19 | UNSET |  | 15 | 0x00410000 |  | destroy_button |
| 0x0041863c | FUN_0041863c | FW | FW | 24 | 0x00410000 | SK |  |
| 0x00418654 | FUN_00418654 | FW | FW | 24 | 0x00410000 | SK |  |
| 0x0041866c | FUN_0041866c | FW | FW | 9 | 0x00410000 | SK |  |
| 0x0041867f | FUN_0041867f | FW | FW | 14 | 0x00410000 | SK |  |
| 0x00418740 | FUN_00418740 | FW | FW | 28 | 0x00410000 | SK |  |
| 0x00418770 | FUN_00418770 | FW | FW | 28 | 0x00410000 | SK |  |
| 0x004187a0 | FUN_004187a0 | FW | FW | 137 | 0x00410000 | SK |  |
| 0x00418870 | FUN_00418870 | FW | FW | 90 | 0x00410000 | SK |  |
| 0x004188ca | FUN_004188ca | FW | FW | 9 | 0x00410000 | SK |  |
| 0x004188dd | FUN_004188dd | FW | FW | 14 | 0x00410000 | SK |  |
| 0x00418910 | create_combobox | FW | FW | 130 | 0x00410000 | SK |  |
| 0x004189c0 | FUN_004189c0 | FW | FW | 43 | 0x00410000 | SK |  |
| 0x00418a00 | FUN_00418a00 | FW | FW | 33 | 0x00410000 | SK |  |
| 0x00418a30 | FUN_00418a30 | FW | FW | 43 | 0x00410000 | SK |  |
| 0x00418a70 | FUN_00418a70 | FW | FW | 43 | 0x00410000 | SK |  |
| 0x00418ab0 | FUN_00418ab0 | FW | FW | 103 | 0x00410000 | SK |  |
| 0x00418b50 | FUN_00418b50 | FW | FW | 90 | 0x00410000 | SK |  |
| 0x00418baa | FUN_00418baa | FW | FW | 9 | 0x00410000 | SK |  |
| 0x00418bbd | FUN_00418bbd | FW | FW | 14 | 0x00410000 | SK |  |
| 0x00418bf0 | create_scrollable_listbox | FW | FW | 101 | 0x00410000 | SK |  |
| 0x00418c70 | FUN_00418c70 | FW | FW | 48 | 0x00410000 | SK |  |
| 0x00418cb0 | FUN_00418cb0 | FW | FW | 27 | 0x00410000 | SK |  |
| 0x00418ce0 | FUN_00418ce0 | FW | FW | 49 | 0x00410000 | SK |  |
| 0x00418d20 | FUN_00418d20 | FW | FW | 47 | 0x00410000 | SK |  |
| 0x00418d60 | FUN_00418d60 | FW | FW | 37 | 0x00410000 | SK |  |
| 0x00418d90 | FUN_00418d90 | FW | FW | 43 | 0x00410000 | SK |  |
| 0x00418dd0 | FUN_00418dd0 | FW | FW | 33 | 0x00410000 | SK |  |
| 0x00418e00 | FUN_00418e00 | FW | FW | 103 | 0x00410000 | SK |  |
| 0x00418ea0 | FUN_00418ea0 | FW | FW | 90 | 0x00410000 | SK |  |
| 0x00418efa | FUN_00418efa | FW | FW | 9 | 0x00410000 | SK |  |
| 0x00418f0d | FUN_00418f0d | FW | FW | 14 | 0x00410000 | SK |  |
| 0x00418f40 | create_treeview_listbox | FW | FW | 121 | 0x00410000 | SK |  |
| 0x00418fe0 | FUN_00418fe0 | FW | FW | 48 | 0x00410000 | SK |  |
| 0x00419020 | FUN_00419020 | FW | FW | 49 | 0x00410000 | SK |  |
| 0x00419060 | FUN_00419060 | FW | FW | 47 | 0x00410000 | SK |  |
| 0x004190a0 | FUN_004190a0 | FW | FW | 33 | 0x00410000 | SK |  |
| 0x004190d0 | show_help_topic | FW | FW | 34 | 0x00410000 | SK |  |
| 0x00419100 | FUN_00419100 | FW | FW | 38 | 0x00410000 | SK |  |
| 0x00419130 | open_help_dialog | FW | FW | 46 | 0x00410000 | SK |  |
| 0x00419170 | hotseat_game_loop | UI | setup | 1955B | 0x00410000 | NN |  |
| 0x00419940 | FUN_00419940 | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041994c | FUN_0041994c | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x00419962 | FUN_00419962 | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x00419b80 | FUN_00419b80 | UI | UI | 21 | 0x00410000 | NN |  |
| 0x00419ba0 | set_palette_entries | UI | UI | 43 | 0x00410000 | NN |  |
| 0x00419be0 | load_palette_file | UI | UI | 43 | 0x00410000 | NN |  |
| 0x00419c20 | FID_conflict:_$E31 | FW | CRT | 26 | 0x00410000 | SK |  |
| 0x00419c3a | FUN_00419c3a | FW | CRT | 26 | 0x00410000 | SK |  |
| 0x00419c54 | FUN_00419c54 | FW | CRT | 29 | 0x00410000 | SK |  |
| 0x00419c71 | FUN_00419c71 | FW | CRT | 26 | 0x00410000 | SK |  |
| 0x00419c8b | reload_art_and_music | GL | init | 48B | 0x00410000 | NN |  |
| 0x00419cbb | parse_rules_value_with_advance | GL | rules | 57 | 0x00410000 | PA |  |
| 0x00419cf4 | parse_rules_value | GL | rules | 47 | 0x00410000 | PA |  |
| 0x00419d23 | load_cosmic_rules | GL | rules | 432B | 0x00410000 | PA |  |
| 0x00419ed3 | normalize_leader_names | GL | rules | 371B | 0x00410000 | TL |  |
| 0x0041a046 | load_advances | GL | rules | 988B | 0x00410000 | PA |  |
| 0x0041a422 | load_improvements | GL | rules | 418B | 0x00410000 | PA |  |
| 0x0041a5c4 | load_unit_types | GL | rules | 923B | 0x00410000 | PA |  |
| 0x0041a95f | load_terrain_rules | GL | rules | 441B | 0x00410000 | PA |  |
| 0x0041ab18 | load_governments_and_leaders | GL | rules | 1270B | 0x00410000 | PA |  |
| 0x0041b00e | load_all_rules | GL | rules | 361B | 0x00410000 | PA |  |
| 0x0041b177 | select_language | UI | setup | 755B | 0x00410000 | NN |  |
| 0x0041b46a | FUN_0041b46a | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041b480 | FUN_0041b480 | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x0041b48f | shutdown_game | UI | setup | 49B | 0x00410000 | NN |  |
| 0x0041b4c0 | initialize_game | UI | setup | 983B | 0x00410000 | TM |  |
| 0x0041b8b0 | cleanup_subsystems | UI | setup | 79B | 0x00410000 | NN |  |
| 0x0041b8ff | show_tech_discovery_report | UI | setup | 339B | 0x00410000 | TL |  |
| 0x0041ba52 | new_game_setup_wizard | UI | setup | 6555B | 0x00410000 | TM |  |
| 0x0041d3f2 | FUN_0041d3f2 | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041d408 | FUN_0041d408 | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x0041d417 | choose_map_size | UI | setup | 937B | 0x00410000 | TM |  |
| 0x0041d7c5 | FUN_0041d7c5 | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041d7db | FUN_0041d7db | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x0041d7ea | choose_world_params | UI | setup | 1204B | 0x00410000 | TM |  |
| 0x0041dc9e | FUN_0041dc9e | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041dcb4 | FUN_0041dcb4 | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x0041dcc3 | clear_start_locations | GL | init | 75B | 0x00410000 | PA |  |
| 0x0041dd0e | load_scenario_map | UI | setup | 708B | 0x00410000 | TM |  |
| 0x0041dfe1 | resume_saved_game | UI | setup | 2001B | 0x00410000 | TM |  |
| 0x0041e7b2 | FUN_0041e7b2 | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041e7be | FUN_0041e7be | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041e7d4 | FUN_0041e7d4 | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x0041e7e3 | reload_labels_and_strings | GL | init | 129B | 0x00410000 | R |  |
| 0x0041e864 | reload_rules_for_scenario | GL | init | 151B | 0x00410000 | R |  |
| 0x0041e8fb | multiplayer_civ_selection | UI | setup | 1483B | 0x00410000 | TL |  |
| 0x0041eec6 | FUN_0041eec6 | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041eedc | FUN_0041eedc | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x0041eeeb | singleplayer_main_menu | UI | menu | 1891B | 0x00410000 | R |  |
| 0x0041f66e | FUN_0041f66e | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041f67a | FUN_0041f67a | FW | SEH | 12 | 0x00410000 | SK |  |
| 0x0041f690 | FUN_0041f690 | FW | SEH | 15 | 0x00410000 | SK |  |
| 0x0041f69f | post_load_game_init | GL | init | 473B | 0x00410000 | PA |  |
| 0x0041f878 | cleanup_game_views | UI | menu | 97B | 0x00410000 | R |  |
| 0x0041f8d9 | multiplayer_game_entry | UI | menu | 2326B | 0x00410000 | NN |  |
| 0x004201ef | FUN_004201ef | FW | SEH | 12 | 0x00420000 | SK |  |
| 0x004201fb | FUN_004201fb | FW | SEH | 12 | 0x00420000 | SK |  |
| 0x00420207 | FUN_00420207 | FW | SEH | 12 | 0x00420000 | SK |  |
| 0x0042021d | FUN_0042021d | FW | SEH | 14 | 0x00420000 | SK |  |
| 0x00421bb0 | get_tick_count_wrapper | FW | thunk | 21 | 0x00420000 | SK |  |
| 0x00421bd0 | FUN_00421bd0 | FW | thunk | 21 | 0x00420000 | SK |  |
| 0x00421bf0 | Realloc | FW | thunk | 40 | 0x00420000 | SK |  |
| 0x00421c30 | FUN_00421c30 | FW | thunk | 34 | 0x00420000 | SK |  |
| 0x00421c60 | FUN_00421c60 | FW | thunk | 44 | 0x00420000 | SK |  |
| 0x00421ca0 | mp_list_invalidate_item | NW | ui | 108B | 0x00420000 | NN |  |
| 0x00421d30 | mp_reset_separator | NW | ui | 29B | 0x00420000 | NN |  |
| 0x00421d60 | mp_set_string_control | NW | ui | 46B | 0x00420000 | NN |  |
| 0x00421da0 | mp_set_number_control | NW | ui | 29B | 0x00420000 | NN |  |
| 0x00421dd0 | mp_init_scrollbar | NW | ui | 38B | 0x00420000 | NN |  |
| 0x00421e00 | Create | FW | MFC | 46B | 0x00420000 | SK |  |
| 0x00421e40 | mp_set_connection_params | NW | connection | 32B | 0x00420000 | NN |  |
| 0x00421e70 | FUN_00421e70 | NW | ui | 37 | 0x00420000 | NN |  |
| 0x00421ea0 | FUN_00421ea0 | NW | ui | 33 | 0x00420000 | NN |  |
| 0x00421ed0 | FUN_00421ed0 | NW | ui | 45 | 0x00420000 | NN |  |
| 0x00421f10 | FUN_00421f10 | NW | ui | 33 | 0x00420000 | NN |  |
| 0x00421f40 | FUN_00421f40 | NW | ui | 31 | 0x00420000 | NN |  |
| 0x00421f70 | mp_init_object | NW | connection | 61B | 0x00420000 | NN |  |
| 0x00421fad | mp_thunk_0059baf0 | NW | connection | 32B | 0x00420000 | NN |  |
| 0x00421fcd | mp_join_game | NW | connection | 8475B | 0x00420000 | NN | Massive function (8475B). Handles entire MP connection lifecycle. Uses XD_OpenConnection, XD_Flus... |
| 0x00424101 | FUN_00424101 | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x0042410d | FUN_0042410d | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x00424129 | FUN_00424129 | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x00424135 | FUN_00424135 | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x0042414b | FUN_0042414b | FW | thunk | 17 | 0x00420000 | SK |  |
| 0x0042415c | mp_send_keepalive | NW | heartbeat | 30B | 0x00420000 | NN |  |
| 0x0042417a | mp_check_connection_errors | NW | heartbeat | 126B | 0x00420000 | NN |  |
| 0x004241f8 | mp_animate_waiting_arrow | NW | ui | 324B | 0x00420000 | NN | Purely cosmetic waiting animation for MP lobby. |
| 0x0042433c | mp_check_errors_type2 | NW | heartbeat | 96 | 0x00420000 | NN |  |
| 0x0042439c | mp_check_errors_type3 | NW | heartbeat | 83 | 0x00420000 | NN |  |
| 0x004243ef | mp_check_errors_type4 | NW | heartbeat | 96 | 0x00420000 | NN |  |
| 0x0042444f | mp_check_timeout | NW | heartbeat | 145B | 0x00420000 | NN |  |
| 0x004244e0 | mp_update_session_selection | NW | ui | 424B | 0x00420000 | NN |  |
| 0x00424688 | mp_find_session_node | NW | ui | 157B | 0x00420000 | NN |  |
| 0x0042472a | mp_sync_session_names | NW | ui | 136B | 0x00420000 | NN |  |
| 0x004247b2 | mp_resolve_session_to_names | NW | ui | 189B | 0x00420000 | NN |  |
| 0x0042486f | mp_create_session_list_buttons | NW | ui | 634B | 0x00420000 | NN | Creates 9 labeled info buttons for session browser (host, game name, scenario, difficulty, map si... |
| 0x00424ae9 | mp_update_session_info | NW | ui | 2305B | 0x00420000 | NN |  |
| 0x004253ef | mp_clear_session_list | NW | ui | 185B | 0x00420000 | NN |  |
| 0x004254a8 | mp_add_session_entry | NW | ui | 351B | 0x00420000 | NN |  |
| 0x00425607 | mp_start_timer | NW | timer | 73B | 0x00420000 | NN |  |
| 0x00425650 | mp_stop_timer | NW | timer | 69B | 0x00420000 | NN |  |
| 0x00425695 | mp_refresh_session_list | NW | session | 119B | 0x00420000 | NN |  |
| 0x0042570c | mp_prune_stale_sessions | NW | session | 242B | 0x00420000 | NN |  |
| 0x004257fe | mp_rebuild_session_list_ui | NW | ui | 424B | 0x00420000 | NN |  |
| 0x004259a6 | mp_setup_game_profile | NW | ui | 1423B | 0x00420000 | NN |  |
| 0x00426f30 | mp_scalar_deleting_destructor | NW | cleanup | 57 | 0x00420000 | NN |  |
| 0x00426f80 | FUN_00426f80 | NW | cleanup | 37 | 0x00420000 | NN |  |
| 0x00426fb0 | mp_show_wait_dialog | NW | cleanup | 45 | 0x00420000 | NN |  |
| 0x00426ff0 | mp_format_template_string | NW | ui | 504B | 0x00420000 | NN | General-purpose template formatter. Supports %STRING0..%STRING9, %NUMBER0..%NUMBER9, %HEX0..%HEX9... |
| 0x004271e8 | set_improvement_name_string | UI | text | 41B | 0x00420000 | NN |  |
| 0x00427211 | set_wonder_name_string | UI | text | 41B | 0x00420000 | NN |  |
| 0x004272d0 | reveal_tile_for_civ | GL | visibility | 188B | 0x00420000 | PA | Sets the per-civ exploration bit in tile byte[4]. Our engine/visibility.js `updateVisibility` doe... |
| 0x0042738c | cancel_goto_if_blocked | GL | movement | 90B | 0x00420000 | PA | Cancels goto orders for non-air units when movement is blocked. Orders 0x0B = goto, 0xFF = cancel... |
| 0x004273e6 | cancel_goto_for_stack | GL | movement | 192B | 0x00420000 | PA | Cancels goto for all units in a stack that can't reach their destination (land units blocked by w... |
| 0x004274a6 | process_unit_move_visibility | GL | visibility | 4250B | 0x00420000 | TH | **CRITICAL GAME LOGIC**. 4250 bytes. This is the master post-move handler. Every unit movement tr... |
| 0x004289e0 | FUN_004289e0 | UI | text | 21 | 0x00420000 | NN |  |
| 0x004289f5 | FUN_004289f5 | UI | text | 26 | 0x00420000 | NN |  |
| 0x00428a0f | string_pool_open | UI | text | 105B | 0x00420000 | NN |  |
| 0x00428a78 | string_pool_close | UI | text | 29B | 0x00420000 | NN |  |
| 0x00428a95 | string_pool_add | UI | text | 119B | 0x00420000 | R | Referenced indirectly — get_improvement_name walks this pool. |
| 0x00428b0c | get_improvement_name | UI | text | 92B | 0x00420000 | R | Core name lookup. Walks sequential null-terminated strings. Used by advisors, editors, tooltips, ... |
| 0x00428b68 | string_pool_add_padded | UI | text | 177B | 0x00420000 | NN |  |
| 0x00428cb0 | string_pool_struct_init | UI | text | 54B | 0x00420000 | NN |  |
| 0x00428d00 | city_name_editor_init | UI | city_name_editor | 27B | 0x00420000 | NN |  |
| 0x00428d1b | city_name_editor_refresh | UI | city_name_editor | 45B | 0x00420000 | NN |  |
| 0x00428d48 | city_name_editor_load_names | UI | city_name_editor | 95B | 0x00420000 | NN |  |
| 0x00428da7 | city_name_editor_invalidate | UI | city_name_editor | 40B | 0x00420000 | NN |  |
| 0x00428dcf | city_name_editor_set_name | UI | city_name_editor | 129B | 0x00420000 | NN |  |
| 0x00428e50 | city_name_editor_misc_dialog | UI | city_name_editor | 349B | 0x00420000 | NN | Debug dialog for editing specific city name slots. |
| 0x00428fd2 | city_name_editor_scroll_update | UI | city_name_editor | 108B | 0x00420000 | NN |  |
| 0x0042903e | city_name_editor_create_buttons | UI | city_name_editor | 864B | 0x00420000 | NN |  |
| 0x004293a8 | city_name_editor_paint | UI | city_name_editor | 713B | 0x00420000 | NN |  |
| 0x00429671 | city_name_editor_open | UI | city_name_editor | 2002B | 0x00420000 | NN |  |
| 0x00429e53 | FUN_00429e53 | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x00429e69 | FUN_00429e69 | FW | thunk | 14 | 0x00420000 | SK |  |
| 0x00429e77 | city_name_editor_entry | UI | city_name_editor | 89B | 0x00420000 | NN |  |
| 0x00429ed0 | FUN_00429ed0 | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x00429ee6 | FUN_00429ee6 | FW | thunk | 14 | 0x00420000 | SK |  |
| 0x0042a380 | static_init_fp_24 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a39a | static_init_fp_24_impl | FW | CRT | 32 | 0x00420000 | SK |  |
| 0x0042a3ba | static_init_fp_24_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a3d7 | static_cleanup_fp_24 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a3f1 | FID_conflict:_$E51 | FW | CRT | 26 | 0x00420000 | SK | static_init_18` (FID_conflict___E51 1st) |
| 0x0042a40b | static_init_18_impl | FW | CRT | 30 | 0x00420000 | SK |  |
| 0x0042a429 | static_init_18_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a446 | static_cleanup_18 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a460 | static_init_fp_16 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a47a | static_init_fp_16_impl | FW | CRT | 32 | 0x00420000 | SK |  |
| 0x0042a49a | static_init_fp_16_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a4b7 | static_cleanup_fp_16 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a4d1 | static_init_fp_14 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a4eb | static_init_fp_14_impl | FW | CRT | 32 | 0x00420000 | SK |  |
| 0x0042a50b | static_init_fp_14_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a528 | static_cleanup_fp_14 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a542 | static_init_fp_12 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a55c | static_init_fp_12_impl | FW | CRT | 32 | 0x00420000 | SK |  |
| 0x0042a57c | static_init_fp_12_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a599 | static_cleanup_fp_12 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a5b3 | FID_conflict:_$E51 | FW | CRT | 26 | 0x00420000 | SK | static_init_16b` (FID_conflict___E51 2nd) |
| 0x0042a5cd | static_init_16b_impl | FW | CRT | 30 | 0x00420000 | SK |  |
| 0x0042a5eb | static_init_16b_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a608 | static_cleanup_16b | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a622 | FID_conflict:_$E31 | FW | CRT | 26 | 0x00420000 | SK | static_init_cdao_1` (FID_conflict___E31 1st) |
| 0x0042a63c | static_init_cdao_1_impl | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a656 | static_init_cdao_1_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a673 | static_cleanup_cdao_1 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a68d | FID_conflict:_$E31 | FW | CRT | 26 | 0x00420000 | SK | static_init_cdao_2` (FID_conflict___E31 2nd) |
| 0x0042a6a7 | static_init_cdao_2_impl | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a6c1 | static_init_cdao_2_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a6de | static_cleanup_cdao_2 | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a6f8 | static_init_tiles_dll | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a712 | static_init_tiles_dll_impl | FW | CRT | 31 | 0x00420000 | SK |  |
| 0x0042a731 | static_init_tiles_dll_atexit | FW | CRT | 29 | 0x00420000 | SK |  |
| 0x0042a74e | static_cleanup_tiles_dll | FW | CRT | 26 | 0x00420000 | SK |  |
| 0x0042a768 | credits_close | UI | credits | 84B | 0x00420000 | NN |  |
| 0x0042a7bc | show_credits | UI | credits | 986B | 0x00420000 | NN | Used by advisor screens (IDs 1-6) and actual credits (ID 10000). The advisor screens re-use this ... |
| 0x0042ab9b | credits_destroy_stream | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x0042abb1 | credits_seh_unwind | FW | SEH | 16 | 0x00420000 | SK |  |
| 0x0042abc1 | FUN_0042abc1 | UI | credits | 87 | 0x00420000 | NN |  |
| 0x0042ac18 | FUN_0042ac18 | UI | credits | 54 | 0x00420000 | NN |  |
| 0x0042ac4e | credits_on_timer | UI | credits | 98B | 0x00420000 | NN |  |
| 0x0042acb0 | advisor_create_close_button | UI | advisor | 223B | 0x00420000 | NN | Standard close button at bottom of all advisor windows. Label ID 0x51C = "Close". |
| 0x0042ad8f | advisor_science_paint | UI | advisor | 1969B | 0x00420000 | TL |  |
| 0x0042b540 | advisor_science_scroll | UI | advisor | 35B | 0x00420000 | NN |  |
| 0x0042b563 | advisor_science_click | UI | advisor | 243B | 0x00420000 | NN |  |
| 0x0042b65b | advisor_science_change_goal | UI | advisor | 34B | 0x00420000 | NN |  |
| 0x0042b67d | advisor_science_open | UI | advisor | 423B | 0x00420000 | NN |  |
| 0x0042b824 | trade_supply_demand_show | UI | advisor | 1022B | 0x00420000 | TL |  |
| 0x0042bc22 | trade_supply_cleanup | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x0042bc38 | trade_supply_seh_unwind | FW | SEH | 15 | 0x00420000 | SK |  |
| 0x0042bc47 | trade_search_commodity | UI | advisor | 292B | 0x00420000 | TL |  |
| 0x0042bd6b | trade_search_cleanup | FW | thunk | 12 | 0x00420000 | SK |  |
| 0x0042bd81 | trade_search_seh_unwind | FW | SEH | 14 | 0x00420000 | SK |  |
| 0x0042bd8f | advisor_trade_paint | UI | advisor | 3931B | 0x00420000 | TL |  |
| 0x0042ccf4 | FUN_0042ccf4 | UI | advisor | 29 | 0x00420000 | NN |  |
| 0x0042cd11 | FUN_0042cd11 | UI | advisor | 30 | 0x00420000 | NN |  |
| 0x0042cd2f | advisor_trade_open | UI | advisor | 423B | 0x00420000 | NN |  |
| 0x0042ced6 | advisor_city_status_paint | UI | advisor | 1858B | 0x00420000 | TL |  |
| 0x0042d618 | FUN_0042d618 | UI | advisor | 29 | 0x00420000 | NN |  |
| 0x0042d635 | advisor_city_status_click | UI | advisor | 228 | 0x00420000 | NN |  |
| 0x0042d71e | advisor_city_status_open | UI | advisor | 99B | 0x00420000 | NN |  |
| 0x0042d781 | draw_citizen_happiness_bar | UI | advisor | 668B | 0x00420000 | TM | Renders the citizen face icons in the Happiness advisor. Uses FUN_00448f92 for face rendering, FU... |
| 0x0042da1d | advisor_happiness_paint | UI | advisor | 1634B | 0x00420000 | TM | Happiness advisor. Interesting that it calls FUN_004eb4ed to force recalculation of city producti... |
| 0x0042e07f | FUN_0042e07f | UI | advisor | 29 | 0x00420000 | NN |  |
| 0x0042e09c | advisor_happiness_click | UI | advisor | 228 | 0x00420000 | NN |  |
| 0x0042e185 | advisor_happiness_open | UI | advisor | 99 | 0x00420000 | NN |  |
| 0x0042e1e8 | advisor_append_unit_flag | UI | advisor | 56B | 0x00420000 | NN |  |
| 0x0042e220 | advisor_military_paint | UI | advisor | 3523B | 0x00420000 | TM | The unit flag bits decoded here (0x10=settler, 0x01=attack, 0x02=trade, 0x40=diplomat, etc.) matc... |
| 0x0042efe3 | advisor_military_scroll | UI | advisor | 29B | 0x00420000 | NN |  |
| 0x0042f000 | advisor_military_toggle_view | UI | advisor | 121B | 0x00420000 | NN |  |
| 0x0042f079 | advisor_military_open | UI | advisor | 538B | 0x00420000 | NN |  |
| 0x0042f293 | advisor_foreign_paint | UI | advisor | 4042B | 0x00420000 | TM | The treaty flag bits visible here confirm: bit 1=contact, bit 2=ceasefire, bit 4=peace, bit 8=war... |
| 0x00430267 | intel_city_set_page | UI | intel | 35B | 0x00430000 | NN | Sets page offset in intel city list view, triggers repaint. DAT_0063ef70 = currentPage, DAT_0063e... |
| 0x0043028a | intel_city_click_handler | UI | intel | 270B | 0x00430000 | NN | Translates pixel click to city slot in 3-column intel city list. Iterates visible cities for targ... |
| 0x0043039d | show_intel_city_list | UI | intel | 586B | 0x00430000 | NN | Populates intel city list dialog. Shows city name, walls icon, active trade commodity. Calls FUN_... |
| 0x004305e7 | seh_cleanup_intel_city_1 | FW | SEH | 22B | 0x00430000 | SK | SEH epilog for intel city dialog. |
| 0x004305fd | seh_cleanup_intel_city_2 | FW | SEH | 14B | 0x00430000 | SK | Stack unwind helper for intel city dialog. |
| 0x0043060b | setup_intel_city_dialog | UI | foreign_advisor | 535B | 0x00430000 | NN | Creates the intelligence city inspection dialog. Shows cities of a foreign civ. Event loop with m... |
| 0x00430822 | check_foreign_advisor_stale | UI | foreign_advisor | 140B | 0x00430000 | NN | Checks if foreign advisor data is stale (timer expired, diplomacy pending, or network event). Tri... |
| 0x004308ae | show_foreign_advisor | UI | foreign_advisor | 3218B | 0x00430000 | NN | Main foreign advisor screen. 3218 bytes — largest UI function in this block. Handles civ list dis... |
| 0x0043154f | seh_cleanup_foreign_advisor_1 | FW | SEH | 22B | 0x00430000 | SK | SEH epilog for foreign advisor dialog. |
| 0x00431565 | seh_cleanup_foreign_advisor_2 | FW | SEH | 14B | 0x00430000 | SK | Stack unwind helper for foreign advisor dialog. |
| 0x00431573 | render_wonders_screen | UI | wonders | 1763B | 0x00430000 | NN | Renders Wonders of the World advisor screen. Groups 28 wonders into 4 eras (7 each). wonderCityId... |
| 0x00431c56 | wonders_scroll_handler | UI | wonders | 29B | 0x00430000 | NN | Scrollbar callback for wonders screen. Updates page offset and repaints. |
| 0x00431c73 | show_top5_dialog_wrapper | UI | top5 | 175B | 0x00430000 | NN | Dialog shell for Top 5 Cities screen. Delegates rendering to FUN_00432c1c. |
| 0x00431d22 | render_power_graph | UI | power_graph | 2183B | 0x00430000 | NN | Power graph data at DAT_00655c38[turn*8+civ] (byte). X axis = turns (scaled by scenario speed), Y... |
| 0x004325c9 | seh_cleanup_power_graph_1 | FW | SEH | 12B | 0x00430000 | SK | SEH epilog for power graph. |
| 0x004325d5 | seh_cleanup_power_graph_2 | FW | SEH | 12B | 0x00430000 | SK | Stack unwind for power graph. |
| 0x004325e1 | seh_cleanup_power_graph_3 | FW | SEH | 12B | 0x00430000 | SK | Stack unwind for power graph. |
| 0x004325ed | seh_cleanup_power_graph_4 | FW | SEH | 22B | 0x00430000 | SK | Final SEH epilog for power graph. |
| 0x00432603 | seh_cleanup_power_graph_5 | FW | SEH | 14B | 0x00430000 | SK | Stack unwind for power graph CString. |
| 0x00432611 | show_historians_report | UI | historians | 1501B | 0x00430000 | NN | 5 historian categories: 0=Wealthiest(treasury), 1=Most Powerful(military units), 2=Most Advanced(... |
| 0x00432bf8 | seh_cleanup_historians_1 | FW | SEH | 22B | 0x00430000 | SK | SEH epilog for historians dialog. |
| 0x00432c0e | seh_cleanup_historians_2 | FW | SEH | 14B | 0x00430000 | SK | Stack unwind for historians CString. |
| 0x00432c1c | render_top5_cities | UI | top5 | 1281B | 0x00430000 | NN | Scores cities by size + happy - unhappy + 10 per wonder. Insertion sort into top-5 array. Renders... |
| 0x00433122 | show_top5_dialog_wrapper_v2 | UI | top5 | 175B | 0x00430000 | NN | Nearly identical to FUN_00431c73. Different dialog ID (8 vs 7). Likely "Happiest Cities" variant. |
| 0x004331d1 | render_demog_row_with_rank | UI | demographics | 611B | 0x00430000 | NN | Generic demographics row renderer. Called 11 times by render_demographics for each metric. rank c... |
| 0x00433434 | render_demographics | UI | demographics | 6486B | 0x00430000 | NN | 6486 bytes — second largest function in block. Computes and displays 11 demographic metrics per c... |
| 0x00434d8a | show_demographics_dialog | UI | demographics | 175B | 0x00430000 | NN | Dialog shell for demographics screen. Identical pattern to other advisor dialogs. |
| 0x00434e39 | render_attitude_advisor | UI | attitude | 3769B | 0x00430000 | NN | 3769 bytes. Two rendering modes: standard game (citizen icons + wonder list + happiness stats) an... |
| 0x00435d15 | show_attitude_dialog | UI | attitude | 175B | 0x00430000 | NN | Dialog shell for attitude advisor. Dialog ID 10. |
| 0x00435dc4 | render_retirement_score | UI | score | 1032B | 0x00430000 | NN | Score screen displayed on retirement. Score formula: (difficulty+4+bonuses) * max(approval1,appro... |
| 0x004361cc | show_retirement_dialog | UI | score | 187B | 0x00430000 | NN | Dialog shell for retirement score screen. Plays sound effect 3 on open. |
| 0x00436287 | trigger_repaint_if_active | UI | score | 91B | 0x00430000 | NN | Conditional repaint trigger. Checks if the requested screen matches the currently active screen b... |
| 0x004362e2 | render_hall_of_fame_list | UI | score | 2224B | 0x00430000 | NN | Hall of Fame display. 6 records at DAT_0063f0c8, each 72 (0x48) bytes. Record fields: +0x00=score... |
| 0x00436b92 | hof_set_page_1 | UI | score | 37B | 0x00430000 | NN | Sets HOF page to 1 and triggers repaint. Used as button handler. |
| 0x00436bb7 | show_hall_of_fame_dialog | UI | score | 544B | 0x00430000 | NN | HOF dialog shell. Two modes: view (param < 0, no buttons) and highlight (param >= 0, shows close ... |
| 0x00436dd7 | hof_clear_records | GL | hall_of_fame | 81B | 0x00430000 | NN | Clears all 6 Hall of Fame records by setting score and population to -1 (0xFFFF). Records at DAT_... |
| 0x00436e28 | hof_load_from_file | GL | hall_of_fame | 170B | 0x00430000 | NN | Reads HALLFAME.DAT into 6 x 72-byte records. If any read fails, clears all records (atomic all-or... |
| 0x00436ed2 | hof_save_to_file | GL | hall_of_fame | 136B | 0x00430000 | NN | Writes 6 x 72-byte HOF records to HALLFAME.DAT. Stops on first write failure. |
| 0x00436f5a | hof_insert_entry | GL | hall_of_fame | 601B | 0x00430000 | NN | Inserts new HOF entry at correct sorted position, shifts others down. Compares by population fiel... |
| 0x004371b3 | credits_init_wrapper | UI | credits | 21B | 0x00430000 | SK | Wrapper that calls the actual credits init function. |
| 0x004371c8 | credits_init | UI | credits | 26B | 0x00430000 | SK | Initializes credits rendering context. |
| 0x004371e2 | credits_alloc_buffer | UI | credits | 45B | 0x00430000 | SK | Allocates buffer for credits text. Resets line counter. |
| 0x0043720f | credits_free_buffer | UI | credits | 29B | 0x00430000 | SK | Frees credits text buffer. |
| 0x0043722c | credits_add_line | UI | credits | 88B | 0x00430000 | SK | Appends a text line to credits buffer. Returns line index. |
| 0x00437284 | credits_get_line | UI | credits | 73B | 0x00430000 | SK | Returns pointer to Nth line in credits buffer by walking null-terminated strings. |
| 0x004372cd | credits_load_text | UI | credits | 298B | 0x00430000 | SK | Loads credits text from game.txt. 4 sections: standard, multiplayer, fantasy, scenario. Lines ter... |
| 0x0043742f | credits_render | UI | credits | 1469B | 0x00430000 | SK | Credits scroll renderer. Uses 30-slot bitmap cache for rendered text lines. Supports '^' prefix f... |
| 0x00437a10 | credits_full_repaint | UI | credits | 26B | 0x00430000 | SK | Triggers full repaint of credits display. |
| 0x00437a2a | credits_scroll_tick | UI | credits | 32B | 0x00430000 | SK | Called by timer to advance credits scroll by one pixel row. |
| 0x00437a4a | show_credits_dialog | UI | credits | 544B | 0x00430000 | SK | Full credits dialog. 30-slot bitmap cache for rendered lines. Timer-driven scroll at 50ms interva... |
| 0x00437c6f | credits_invalidate | UI | credits | 27B | 0x00430000 | SK | Forces full repaint of credits display area. |
| 0x00437c8a | credits_idle_handler | UI | credits | 67B | 0x00430000 | SK | Idle handler for credits. If 1.2 seconds pass without a scroll tick (e.g., window was obscured), ... |
| 0x00437ccd | combat_log_scroll_handler | UI | military | 29B | 0x00430000 | NN | Scrollbar callback for combat log. Updates scroll position and repaints. |
| 0x00437cea | render_combat_log | UI | military | 2172B | 0x00430000 | NN | 2172 bytes. Renders combat log entries from ring buffer. 300-entry ring per civ at DAT_006af2a0 +... |
| 0x0043856b | show_combat_log_dialog | UI | military | 333B | 0x00430000 | NN | Creates or refreshes combat log dialog. Reuses existing dialog if already open. |
| 0x004386b8 | combat_log_click_handler | UI | military | 308B | 0x00430000 | NN | Click handler for combat log. Converts pixel position to ring buffer index, then centers the map ... |
| 0x0043c110 | CDaoFieldInfo_destructor | FW | SEH | 140B | 0x00430000 | SK | MFC CDaoFieldInfo destructor. Ghidra FID match. No game logic. |
| 0x0043c19c | CDaoFieldInfo_cleanup_1 | FW | SEH | 14B | 0x00430000 | SK | Destructor chain helper 1. |
| 0x0043c1ab | CDaoFieldInfo_cleanup_2 | FW | SEH | 15B | 0x00430000 | SK | Destructor chain helper 2. Calls CString cleanup thunk. |
| 0x0043c1ba | CDaoFieldInfo_cleanup_3 | FW | SEH | 15B | 0x00430000 | SK | Destructor chain helper 3. Same thunk as cleanup_2. |
| 0x0043c1c9 | CDaoFieldInfo_cleanup_4 | FW | SEH | 15B | 0x00430000 | SK | Destructor chain helper 4. Same thunk as cleanup_2. |
| 0x0043c1d8 | CDaoFieldInfo_cleanup_5 | FW | SEH | 15B | 0x00430000 | SK | Destructor chain helper 5. Same thunk as cleanup_2. |
| 0x0043c1e7 | CDaoFieldInfo_cleanup_6 | FW | SEH | 15B | 0x00430000 | SK | Destructor chain helper 6. Calls different cleanup function. |
| 0x0043c1f6 | CDaoFieldInfo_cleanup_7 | FW | SEH | 9B | 0x00430000 | SK | Destructor chain helper 7. Destroys embedded OLE frame window. |
| 0x0043c209 | CDaoFieldInfo_cleanup_8 | FW | SEH | 14B | 0x00430000 | SK | Destructor chain helper 8. Last in CDaoFieldInfo chain. Restores SEH frame. |
| 0x0043c260 | advisor_dialog_construct | UI | helper | 200B | 0x00430000 | SK | Constructor for advisor dialog object. Allocates bitmap + 4 fonts + CString. |
| 0x0043c3f0 | helper_load_bitmap | UI | helper | 44B | 0x00430000 | SK | Loads a bitmap resource into the dialog context. |
| 0x0043c430 | get_text_height | UI | helper | 36B | 0x00430000 | SK | Ghidra FID misidentified as `_Timevec::~_Timevec`. Actually returns text line height from font me... |
| 0x0043c460 | create_font_2param | UI | helper | 70B | 0x00430000 | SK | Creates font with 2 params (size, weight), stores metrics. |
| 0x0043c4c0 | create_font_3param | UI | helper | 72B | 0x00430000 | SK | Creates font with 3 params (size, weight, italic), stores metrics. |
| 0x0043c520 | release_font | UI | helper | 48B | 0x00430000 | SK | Releases a font GDI object. |
| 0x0043c560 | GetActiveView | UI | helper | 28B | 0x00430000 | SK | MFC COleClientItem::GetActiveView. Returns view pointer at offset +8. |
| 0x0043c590 | GetActiveView | UI | helper | 28B | 0x00430000 | SK | MFC COleClientItem::GetActiveView. Returns view pointer at offset +4. Different object layout. |
| 0x0043c5c0 | helper_select_bitmap | UI | helper | 37B | 0x00430000 | SK | Selects a bitmap into the device context. |
| 0x0043c5f0 | helper_manage_window | UI | helper | 50B | 0x00430000 | SK | Window management helper. Null check before call. |
| 0x0043c630 | helper_show_scrollbar_off | UI | helper | 39B | 0x00430000 | SK | Hides the scrollbar control. |
| 0x0043c660 | helper_show_scrollbar_on | UI | helper | 39B | 0x00430000 | SK | Shows the scrollbar control. |
| 0x0043c690 | helper_init_null | UI | helper | 34B | 0x00430000 | SK | Initializes a pointer/handle to null. |
| 0x0043c6c0 | helper_set_font | UI | helper | 95B | 0x00430000 | SK | Replaces current font with a new one. Releases old font first. |
| 0x0043c740 | helper_delete_object | UI | helper | 57B | 0x00430000 | SK | Object destructor with optional heap deallocation. |
| 0x0043c790 | helper_offset_rect | UI | helper | 34B | 0x00430000 | SK | Win32 OffsetRect wrapper. Moves a RECT by (dx, dy). |
| 0x0043c7c0 | helper_draw_border | UI | helper | 61B | 0x00430000 | SK | Draws a colored border rectangle. Adjusts right/bottom by -1. |
| 0x0043c810 | helper_append_dot | UI | helper | 29B | 0x00430000 | SK | Appends ". " to the shared text buffer. Used after ordinal numbers ("1.", "2.", etc.). |
| 0x0043c840 | helper_strcat | UI | helper | 32B | 0x00430000 | SK | String concatenation wrapper. |
| 0x0043c870 | helper_append_int | UI | helper | 33B | 0x00430000 | SK | Appends integer as text to the shared text buffer. |
| 0x0043c8a0 | helper_append_hex | UI | helper | 33B | 0x00430000 | SK | Appends value as hex string to the shared text buffer. Used for government name display. |
| 0x0043c8d0 | helper_draw_text_at | UI | helper | 42B | 0x00430000 | SK | Draws text at specified (x,y) position using the global render context DAT_006366a8. |
| 0x0043c910 | helper_draw_text_centered | UI | helper | 46B | 0x00430000 | SK | Draws text centered within a given width. Uses global render context. |
| 0x0043c950 | helper_draw_text_right | UI | helper | 46B | 0x00430000 | SK | Right-aligned text drawing variant. |
| 0x0043c990 | helper_set_dialog_item | UI | helper | 40B | 0x00430000 | SK | Sets a dialog item value at offset 0x208 + index*4 in the dialog object. |
| 0x0043c9d0 | helper_load_dialog_template | UI | helper | 41B | 0x00430000 | SK | Loads a named dialog template (e.g., "INTELLCITY", "REPORTFOREIGN"). |
| 0x0043ca10 | helper_create_dialog | UI | helper | 42B | 0x00430000 | SK | Creates a dialog window. Ghidra misidentified as CSocket::Create — actually a dialog creation cal... |
| 0x0043ca50 | helper_format_population | UI | helper | 37B | 0x00430000 | SK | Wrapper for formatting population display. Delegates to FUN_0043cda6. |
| 0x0043ca80 | helper_format_year | UI | helper | 33B | 0x00430000 | SK | Wrapper for formatting year display. Delegates to FUN_0043f444. |
| 0x0043cab0 | get_civ_primary_color | UI | helper | 92B | 0x00430000 | P | Returns primary color for a civ. Lookup chain: civId → leaderIndex → colorIndex → color table. Eq... |
| 0x0043cb30 | get_civ_secondary_color | UI | helper | 92B | 0x00430000 | P | Returns secondary color for a civ. Same lookup chain as primary, different offset in color table ... |
| 0x0043cbb0 | helper_delete_bitmap_object | UI | helper | 57B | 0x00430000 | SK | Bitmap object destructor with optional heap deallocation. |
| 0x0043cc00 | city_set_civ_knowledge | GL | city_data | 126B | 0x00430000 | PA | Marks a city as known by a specific civ, and caches the current size in the per-civ knowledge arr... |
| 0x0043cc7e | city_calc_population_points | GL | city_data | 103B | 0x00430000 | P | Triangular number formula for city population points. size 1→1, 2→3, 3→6, 4→10, etc. Minimum retu... |
| 0x0043cce5 | civ_calc_total_population | GL | city_data | 193B | 0x00430000 | P | Sums population points across all cities owned by a civ. Capped at 32000. Minimum 1. Fully ported... |
| 0x0043cda6 | format_population_string | GL | city_data | 180B | 0x00430000 | P | Formats population points as a comma-separated thousands string. Each population point = 1000 peo... |
| 0x0043ce5a | format_city_population_string | GL | city_data | 159B | 0x00430000 | P | Formats a single city's population. Calls city_calc_population_points for the specific city. Same... |
| 0x0043cef9 | city_count_content_citizens | GL | city_data | 125B | 0x00430000 | TM | Counts "content" citizens from city attributes bit 0x04 and wonder bonuses. The attribs byte is a... |
| 0x0043cf76 | find_city_at | GL | city_data | 245B | 0x00430000 | P | Finds a city at exact (x,y) coordinates. Validates tile first, then linear scan. Fully ported in ... |
| 0x0043d07a | find_nearest_city | GL | city_data | 400B | 0x00430000 | R | Finds nearest city to (x,y) with optional filters: continent, owner, alt_owner, port-only (param_... |
| 0x0043d20a | has_building | GL | city_data | 122B | 0x00430000 | P | Checks if a city has a specific building. Buildings stored as bitmask at city+0x2C (4 bytes, 32 b... |
| 0x0043d289 | set_building | GL | city_data | 186B | 0x00430000 | P | Sets or clears a building in a city's bitmask. param_set=0 removes, param_set=1 adds. Fully porte... |
| 0x0043d348 | city_has_supply | GL | city_data | 92B | 0x00430000 | P | Checks if a city has a specific trade commodity in its supply slots (3 slots at city+0x33). Porte... |
| 0x0043d3a4 | city_has_demand | GL | city_data | 92B | 0x00430000 | P | Checks if a city has a specific trade commodity in its demand slots (3 slots at city+0x36). Porte... |
| 0x0043d400 | calc_city_trade_desirability | GL | trade | 8227B | 0x00430000 | PA | 8227 bytes — largest function in this block by far. Calculates 16 supply and 16 demand commodity ... |
| 0x0043f444 | format_city_name_or_none | GL | city_mgmt | 79B | 0x00430000 | P | Formats city name for display, or "None" if no city. Ported in JS. |
| 0x0043f493 | assign_city_name | GL | city_mgmt | 778B | 0x00430000 | PA | Assigns a name to a newly created city from the CITY_NAMES section of game.txt. Tries up to 3 tim... |
| 0x0043f7a7 | city_update_tile_ownership | GL | city_mgmt | 265B | 0x00430000 | TH | Updates tile ownership for all 45 tiles in the big fat cross around a city. Inner 21 tiles get ci... |
| 0x0043f8b0 | create_city | GL | city_mgmt | 2677B | 0x00430000 | PA | 2677 bytes — full city creation logic. Handles both local and network paths. Key behaviors: finds... |
| 0x00440325 | remove_trade_route | GL | trade | 199b | 0x00440000 | PA |  |
| 0x004403ec | set_trade_route | GL | trade | 103b | 0x00440000 | PA |  |
| 0x00440453 | establish_trade_route | GL | trade | 765b | 0x00440000 | PA |  |
| 0x00440750 | process_caravan_arrival | GL | trade | 3144b | 0x00440000 | PA |  |
| 0x004413d1 | delete_city | GL | city | 1704b | 0x00440000 | PA |  |
| 0x00441a79 | check_auto_improvement | GL | city | 152b | 0x00440000 | PA |  |
| 0x00441b11 | change_city_production | GL | city | 2572b | 0x00440000 | PA |  |
| 0x0044251d | cleanup_stack_alloc | FW | seh | 12b | 0x00440000 | SK |  |
| 0x00442533 | seh_epilog_441b11 | FW | seh | 14b | 0x00440000 | SK |  |
| 0x00442541 | reassign_all_city_production | GL | city | 254b | 0x00440000 | R |  |
| 0x0044263f | city_adjacent_to_continent | GL | city | 238b | 0x00440000 | NN |  |
| 0x0044272d | find_best_coastal_continent | GL | city | 344b | 0x00440000 | NN |  |
| 0x00442885 | city_connected_to_continent | GL | city | 298b | 0x00440000 | NN |  |
| 0x004429af | cities_share_coast | GL | city | 269b | 0x00440000 | NN |  |
| 0x00444270 | debug_show_message | UI | debug | 33b | 0x00440000 | SK |  |
| 0x004442a0 | show_game_popup_3arg | UI | debug | 43b | 0x00440000 | SK |  |
| 0x004442e0 | show_game_popup_2arg | UI | debug | 39b | 0x00440000 | SK |  |
| 0x00444310 | startup_multiplayer | NW | mp | 3846b | 0x00440000 | NN |  |
| 0x0044525d | cleanup_mp_surface | FW | seh | 12b | 0x00440000 | SK |  |
| 0x00445269 | cleanup_mp_stack | FW | seh | 12b | 0x00440000 | SK |  |
| 0x0044527f | seh_epilog_444310 | FW | seh | 15b | 0x00440000 | SK |  |
| 0x0044528e | prompt_ip_address | NW | mp | 377b | 0x00440000 | NN |  |
| 0x00445407 | cleanup_ip_stack | FW | seh | 12b | 0x00440000 | SK |  |
| 0x0044541d | seh_epilog_44528e | FW | seh | 15b | 0x00440000 | SK |  |
| 0x0044542c | prompt_net_name | NW | mp | 321b | 0x00440000 | NN |  |
| 0x0044556d | cleanup_netname_stack | FW | seh | 12b | 0x00440000 | SK |  |
| 0x00445583 | seh_epilog_44542c | FW | seh | 15b | 0x00440000 | SK |  |
| 0x00445592 | prompt_game_name | NW | mp | 347b | 0x00440000 | NN |  |
| 0x004456ed | cleanup_gamename_stack | FW | seh | 12b | 0x00440000 | SK |  |
| 0x00445703 | seh_epilog_445592 | FW | seh | 15b | 0x00440000 | SK |  |
| 0x00445712 | load_scenario_mp | NW | mp | 1795b | 0x00440000 | NN |  |
| 0x00445e15 | cleanup_scen_surface | FW | seh | 12b | 0x00440000 | SK |  |
| 0x00445e21 | cleanup_scen_stack | FW | seh | 12b | 0x00440000 | SK |  |
| 0x00445e37 | seh_epilog_445712 | FW | seh | 15b | 0x00440000 | SK |  |
| 0x00445e46 | join_mp_game | NW | mp | 2469b | 0x00440000 | NN |  |
| 0x004467fa | cleanup_join_stack | FW | seh | 12b | 0x00440000 | SK |  |
| 0x00446810 | seh_epilog_445e46 | FW | seh | 15b | 0x00440000 | SK |  |
| 0x00447170 | delete_mp_host_obj | NW | mp | 57b | 0x00440000 | SK |  |
| 0x004471c0 | delete_mp_client_obj | NW | mp | 57b | 0x00440000 | SK |  |
| 0x00447210 | disable_civ_slot | NW | mp | 133b | 0x00440000 | NN |  |
| 0x004472c0 | GetCheckStyle | FW | mfc | 28b | 0x00440000 | SK |  |
| 0x004472f0 | set_selected_slot | FW | mfc | 33b | 0x00440000 | SK |  |
| 0x00447320 | DAT_00647c40 | UNSET |  | 11 | 0x00440000 |  | terrain type labels |
| 0x0044733a | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00447362 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044737f | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004473a2 | DAT_00640bd8 | UNSET |  | 52 | 0x00440000 |  | dither blend sprites |
| 0x004473bc | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004473e4 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447401 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447424 | DAT_0063f858 | UNSET |  | 16 | 0x00440000 |  | coast quadrant sprites set 1 |
| 0x0044743e | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00447466 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447483 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004474a6 | DAT_006461d8 | UNSET |  | 16 | 0x00440000 |  | coast quadrant sprites set 2 |
| 0x004474c0 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004474e8 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447505 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447528 | DAT_00647388 | UNSET |  | 16 | 0x00440000 |  | coast quadrant sprites set 3 |
| 0x00447542 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044756a | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447587 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004475aa | DAT_006447b0 | UNSET |  | 16 | 0x00440000 |  | coast quadrant sprites set 4 |
| 0x004475c4 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004475ec | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447609 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x0044762c | DAT_00646158 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447646 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447660 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044767d | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447697 | DAT_00644e88 | UNSET |  | 26 | 0x00440000 |  | 2 / resource sprites |
| 0x004476b1 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004476d9 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004476f6 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447719 | DAT_0063fcd8 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447733 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044774d | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044776a | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447784 | DAT_00647ed8 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x0044779e | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x004477b8 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004477d5 | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x004477ef | DAT_00646118 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447809 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447823 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447840 | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044785a | DAT_00643b38 | UNSET |  | 32 | 0x00440000 |  | river sprites |
| 0x00447874 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044789c | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004478b9 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004478dc | DAT_0063fd18 | UNSET |  | 26 | 0x00440000 |  | 4 / misc sprites |
| 0x004478f6 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044791e | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044793b | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x0044795e | DAT_00642710 | UNSET |  | 18 | 0x00440000 |  | overlay sprites |
| 0x00447978 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004479a0 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004479bd | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004479e0 | DAT_006446b8 | UNSET |  | 26 | 0x00440000 |  | 3 / improvement sprites |
| 0x004479fa | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00447a22 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447a3f | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447a62 | DAT_00641808 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447a7c | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447a96 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447ab3 | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447acd | DAT_0063fc18 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447ae7 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447b01 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447b1e | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447b38 | DAT_006482f8 | UNSET |  | 22 | 0x00440000 |  | city flag sprites |
| 0x00447b52 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00447b7a | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447b97 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447bba | DAT_00647fa0 | UNSET |  | 26 | 0x00440000 |  | 2 / airbase sprites |
| 0x00447bd4 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00447bfc | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447c19 | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447c3c | DAT_00645120 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447c56 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447c70 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447c8d | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447ca7 | DAT_00648820 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447cc1 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447cdb | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447cf8 | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447d12 | DAT_00647788 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447d2c | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447d46 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447d63 | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447d7d | DAT_00647348 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447d97 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447db1 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447dce | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447de8 | DAT_00644770 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447e02 | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447e1c | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447e39 | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447e53 | DAT_006480d8 | UNSET |  | 26 | 0x00440000 |  | 1 / single CString |
| 0x00447e6d | constructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447e87 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447ea4 | destructor | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447ebe | DAT_00644b70 | UNSET |  | 11 | 0x00440000 |  | people sprites |
| 0x00447ed8 | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00447f00 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447f1d | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447f40 | DAT_006477c8 | UNSET |  | 15 | 0x00440000 |  | editor sprites |
| 0x00447f5a | constructor | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00447f82 | atexit | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00447f9f | destructor | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00447fc2 | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00447fdc | FUN_00447fdc | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00447ff6 | FUN_00447ff6 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448013 | FUN_00448013 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044802d | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448047 | FUN_00448047 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448061 | FUN_00448061 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044807e | FUN_0044807e | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448098 | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x004480b2 | FUN_004480b2 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x004480cc | FUN_004480cc | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004480e9 | FUN_004480e9 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448103 | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x0044811d | FUN_0044811d | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448137 | FUN_00448137 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448154 | FUN_00448154 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044816e | FUN_0044816e | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448188 | FUN_00448188 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004481b0 | FUN_004481b0 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004481cd | FUN_004481cd | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004481f0 | FUN_004481f0 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044820a | FUN_0044820a | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448232 | FUN_00448232 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044824f | FUN_0044824f | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448272 | FUN_00448272 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044828c | FUN_0044828c | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004482b4 | FUN_004482b4 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004482d1 | FUN_004482d1 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004482f4 | FUN_004482f4 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044830e | FUN_0044830e | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448336 | FUN_00448336 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448353 | FUN_00448353 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448376 | FUN_00448376 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448390 | FUN_00448390 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004483b8 | FUN_004483b8 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004483d5 | FUN_004483d5 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004483f8 | FUN_004483f8 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448412 | FUN_00448412 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044843a | FUN_0044843a | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448457 | FUN_00448457 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x0044847a | FUN_0044847a | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448494 | FUN_00448494 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004484bc | FUN_004484bc | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004484d9 | FUN_004484d9 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004484fc | FUN_004484fc | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448516 | FUN_00448516 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044853e | FUN_0044853e | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044855b | FUN_0044855b | UNSET |  | 35 | 0x00440000 |  |  |
| 0x0044857e | FUN_0044857e | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448598 | FUN_00448598 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x004485c0 | FUN_004485c0 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004485dd | FUN_004485dd | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448600 | FUN_00448600 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x0044861a | FUN_0044861a | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448642 | FUN_00448642 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044865f | FUN_0044865f | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448682 | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x0044869c | FUN_0044869c | UNSET |  | 26 | 0x00440000 |  |  |
| 0x004486b6 | FUN_004486b6 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004486d3 | FUN_004486d3 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x004486ed | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448707 | FUN_00448707 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448721 | FUN_00448721 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044873e | FUN_0044873e | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448758 | FUN_00448758 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448772 | FUN_00448772 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044879a | FUN_0044879a | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004487b7 | FUN_004487b7 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004487da | FUN_004487da | UNSET |  | 26 | 0x00440000 |  |  |
| 0x004487f4 | FUN_004487f4 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044881c | FUN_0044881c | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448839 | FUN_00448839 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x0044885c | FUN_0044885c | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448876 | FUN_00448876 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044889e | FUN_0044889e | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004488bb | FUN_004488bb | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004488de | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x004488f8 | FUN_004488f8 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448912 | FUN_00448912 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x0044892f | FUN_0044892f | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448949 | FUN_00448949 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448963 | FUN_00448963 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x0044898b | FUN_0044898b | UNSET |  | 29 | 0x00440000 |  |  |
| 0x004489a8 | FUN_004489a8 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x004489cb | FUN_004489cb | UNSET |  | 26 | 0x00440000 |  |  |
| 0x004489e5 | FUN_004489e5 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448a0d | FUN_00448a0d | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448a2a | FUN_00448a2a | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448a4d | FUN_00448a4d | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448a67 | FUN_00448a67 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448a8f | FUN_00448a8f | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448aac | FUN_00448aac | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448acf | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448ae9 | FUN_00448ae9 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448b03 | FUN_00448b03 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448b20 | FUN_00448b20 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448b3a | FUN_00448b3a | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448b54 | FUN_00448b54 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448b7c | FUN_00448b7c | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448b99 | FUN_00448b99 | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448bbc | FUN_00448bbc | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448bd6 | FUN_00448bd6 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448bfe | FUN_00448bfe | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448c1b | FUN_00448c1b | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448c3e | FUN_00448c3e | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448c58 | FUN_00448c58 | UNSET |  | 40 | 0x00440000 |  |  |
| 0x00448c80 | FUN_00448c80 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448c9d | FUN_00448c9d | UNSET |  | 35 | 0x00440000 |  |  |
| 0x00448cc0 | FUN_00448cc0 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448cda | FUN_00448cda | UNSET |  | 66 | 0x00440000 |  |  |
| 0x00448d1c | FUN_00448d1c | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448d39 | FUN_00448d39 | UNSET |  | 66 | 0x00440000 |  |  |
| 0x00448d7b | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448d95 | FUN_00448d95 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448daf | FUN_00448daf | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448dcc | FUN_00448dcc | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448de6 | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448e00 | FUN_00448e00 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448e1a | FUN_00448e1a | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448e37 | FUN_00448e37 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448e51 | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448e6b | FUN_00448e6b | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448e85 | FUN_00448e85 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448ea2 | FUN_00448ea2 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448ebc | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448ed6 | FUN_00448ed6 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448ef0 | FUN_00448ef0 | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448f0d | FUN_00448f0d | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448f27 | FID_conflict:_$E31 | FW | crt | 26 | 0x00440000 | NN |  |
| 0x00448f41 | FUN_00448f41 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448f5b | FUN_00448f5b | UNSET |  | 29 | 0x00440000 |  |  |
| 0x00448f78 | FUN_00448f78 | UNSET |  | 26 | 0x00440000 |  |  |
| 0x00448f92 | get_city_epoch | GL | epoch | 158b | 0x00440000 | P |  |
| 0x00449030 | load_terrain_sprites | RN | sprite | 2367b | 0x00440000 | P |  |
| 0x0044996f | FUN_0044996f | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044997b | FUN_0044997b | FW | seh | 9 | 0x00440000 | SK |  |
| 0x0044998e | FUN_0044998e | FW | seh | 14 | 0x00440000 | SK |  |
| 0x0044999c | extract_tile_sprite | RN | sprite | 55b | 0x00440000 | P |  |
| 0x004499d3 | extract_rect_sprite | RN | sprite | 59b | 0x00440000 | P |  |
| 0x00449a0e | load_icon_sprites | RN | sprite | 4416b | 0x00440000 | P |  |
| 0x0044ab4e | FUN_0044ab4e | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044ab64 | FUN_0044ab64 | FW | seh | 14 | 0x00440000 | SK |  |
| 0x0044ab72 | extract_32x32_sprite | RN | sprite | 55b | 0x00440000 | P |  |
| 0x0044aba9 | extract_square_sprite | RN | sprite | 44b | 0x00440000 | P |  |
| 0x0044abd5 | extract_city_style_sprite | RN | sprite | 50b | 0x00440000 | P |  |
| 0x0044ac07 | extract_48px_sprite | RN | sprite | 55b | 0x00440000 | P |  |
| 0x0044ac3e | find_city_blue_marker | RN | sprite | 265b | 0x00440000 | P |  |
| 0x0044ad47 | find_city_name_anchor | RN | sprite | 261b | 0x00440000 | P |  |
| 0x0044ae4c | load_city_sprites | RN | sprite | 1005b | 0x00440000 | P |  |
| 0x0044b239 | find_unit_blue_marker | RN | sprite | 213b | 0x00440000 | P |  |
| 0x0044b30e | load_unit_sprites | RN | sprite | 400b | 0x00440000 | P |  |
| 0x0044b49e | load_all_art_sprites | RN | sprite | 88b | 0x00440000 | P |  |
| 0x0044b4f6 | FUN_0044b4f6 | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044b50c | FUN_0044b50c | FW | seh | 14 | 0x00440000 | SK |  |
| 0x0044c5a0 | init_sprite_surface_mgr | RN | surface | 133b | 0x00440000 | SK |  |
| 0x0044c670 | init_sprite_cache | RN | surface | 132b | 0x00440000 | SK |  |
| 0x0044c730 | init_render_surface | RN | surface | 274b | 0x00440000 | SK |  |
| 0x0044c8b0 | CString | FW | mfc | 33b | 0x00440000 | SK |  |
| 0x0044c8e0 | clear_surface_26dwords | RN | surface | 281b | 0x00440000 | SK |  |
| 0x0044ca40 | noop_surface | RN | surface | 22b | 0x00440000 | SK |  |
| 0x0044ca60 | FUN_0044ca60 | RN | surface | 75 | 0x00440000 | SK |  |
| 0x0044caab | FUN_0044caab | RN | surface | 40 | 0x00440000 | SK |  |
| 0x0044cad3 | FUN_0044cad3 | RN | surface | 9 | 0x00440000 | SK |  |
| 0x0044cae6 | FUN_0044cae6 | RN | surface | 14 | 0x00440000 | SK |  |
| 0x0044cb20 | FUN_0044cb20 | RN | surface | 62 | 0x00440000 | SK |  |
| 0x0044cb5e | FUN_0044cb5e | RN | surface | 9 | 0x00440000 | SK |  |
| 0x0044cb71 | FUN_0044cb71 | RN | surface | 14 | 0x00440000 | SK |  |
| 0x0044cba0 | destroy_sprite_surface_mgr | RN | surface | 97b | 0x00440000 | SK |  |
| 0x0044cc01 | FUN_0044cc01 | RN | surface | 40 | 0x00440000 | SK |  |
| 0x0044cc29 | FUN_0044cc29 | RN | surface | 9 | 0x00440000 | SK |  |
| 0x0044cc3c | FUN_0044cc3c | RN | surface | 14 | 0x00440000 | SK |  |
| 0x0044cc80 | show_throne_room | UI | throne | 247b | 0x00440000 | NN |  |
| 0x0044cd77 | FUN_0044cd77 | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044cd8d | FUN_0044cd8d | FW | seh | 14 | 0x00440000 | SK |  |
| 0x0044cd9b | view_throne_room | UI | throne | 87b | 0x00440000 | NN |  |
| 0x0044cdf2 | FUN_0044cdf2 | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044ce08 | FUN_0044ce08 | FW | seh | 14 | 0x00440000 | SK |  |
| 0x0044ce16 | init_throne_context | UI | throne | 405b | 0x00440000 | NN |  |
| 0x0044d027 | destroy_throne_context | UI | throne | 177b | 0x00440000 | NN |  |
| 0x0044d0d8 | FUN_0044d0e7 | UI | throne | 9 | 0x00440000 | SK |  |
| 0x0044d0e7 | FUN_0044d0e7 | UNSET |  | 15 | 0x00440000 |  |  |
| 0x0044d0f6 | FUN_0044d0f6 | UNSET |  | 15 | 0x00440000 |  |  |
| 0x0044d105 | FUN_0044d105 | UNSET |  | 15 | 0x00440000 |  |  |
| 0x0044d114 | FUN_0044d114 | UNSET |  | 15 | 0x00440000 |  |  |
| 0x0044d123 | FUN_0044d123 | UNSET |  | 15 | 0x00440000 |  |  |
| 0x0044d132 | FUN_0044d132 | UNSET |  | 15 | 0x00440000 |  |  |
| 0x0044d141 | FUN_0044d141 | UNSET |  | 9 | 0x00440000 |  |  |
| 0x0044d154 | FUN_0044d154 | UNSET |  | 14 | 0x00440000 |  |  |
| 0x0044d162 | load_throne_dll | UI | throne | 308b | 0x00440000 | NN |  |
| 0x0044d296 | throne_room_add_improvement | UI | throne | 1799b | 0x00440000 | NN |  |
| 0x0044d99d | FUN_0044d99d | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044d9b3 | FUN_0044d9b3 | FW | seh | 14 | 0x00440000 | SK |  |
| 0x0044d9c1 | view_throne_display | UI | throne | 244b | 0x00440000 | NN |  |
| 0x0044dab5 | draw_throne_title | UI | throne | 221b | 0x00440000 | NN |  |
| 0x0044db92 | render_throne_room | UI | throne | 3024b | 0x00440000 | NN |  |
| 0x0044e762 | FUN_0044e762 | FW | seh | 9 | 0x00440000 | SK |  |
| 0x0044e76b | FUN_0044e76b | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044e781 | FUN_0044e781 | FW | seh | 15 | 0x00440000 | SK |  |
| 0x0044e790 | throne_room_select_piece | UI | throne | 3336b | 0x00440000 | NN |  |
| 0x0044f498 | FUN_0044f498 | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044f4a4 | FUN_0044f4a4 | FW | seh | 12 | 0x00440000 | SK |  |
| 0x0044f4ba | FUN_0044f4ba | FW | seh | 15 | 0x00440000 | SK |  |
| 0x0044f4c9 | throne_room_click | UI | throne | 585b | 0x00440000 | NN |  |
| 0x0044f717 | throne_room_keypress | UI | throne | 125b | 0x00440000 | NN |  |
| 0x0044f799 | throne_room_invalidate | UI | throne | 64b | 0x00440000 | NN |  |
| 0x004502b0 | pedia_init_field | UI | civilopedia | 34 | 0x00450000 |  | Zeroes first field of this-ptr |
| 0x004502e0 | pedia_set_resource | UI | civilopedia | 67 | 0x00450000 |  | Free old resource, load new |
| 0x00450340 | pedia_free_resource | UI | civilopedia | 57 | 0x00450000 |  | Free resource, zero ptr |
| 0x00450390 | pedia_set_surface | UI | civilopedia | 45 | 0x00450000 |  | Store surface ptr at this+4 |
| 0x004503d0 | pedia_manage_window | UI | civilopedia | 37 | 0x00450000 |  | manage_window_C44D on this+8 |
| 0x00450400 | pedia_gdi_init | UI | civilopedia | 41 | 0x00450000 |  | gdi_C763 init 0,0 |
| 0x00450440 | pedia_attach_surface | UI | civilopedia | 49 | 0x00450000 |  | Attach param+0x404 to this+8 |
| 0x00450480 | pedia_setup_list_panel | UI | civilopedia | 1602 | 0x00450000 |  | Build tech/improvement list for tab |
| 0x00450ae6 | pedia_scroll_panel_0 | UI | civilopedia | 30 | 0x00450000 |  | Scroll wrapper for panel 0 |
| 0x00450b04 | pedia_scroll_panel_1 | UI | civilopedia | 30 | 0x00450000 |  | Scroll wrapper for panel 1 |
| 0x00450b22 | pedia_set_scroll_pos | UI | civilopedia | 97 | 0x00450000 |  | Set scroll offset, redraw |
| 0x00450b83 | pedia_list_click | UI | civilopedia | 627 | 0x00450000 |  | Handle click: select/multi-select/range |
| 0x00450df6 | pedia_hittest_list | UI | civilopedia | 277 | 0x00450000 |  | Hit test: x,y → list item index |
| 0x00450f0b | pedia_draw_list_panel | UI | civilopedia | 1333 | 0x00450000 |  | Render list panel: items + selection highlight |
| 0x00451830 | pedia_get_width | UI | civilopedia | 37 | 0x00450000 |  | Get rect width via thunk |
| 0x00451860 | pedia_get_height | UI | civilopedia | 37 | 0x00450000 |  | Get rect height via thunk |
| 0x00451890 | pedia_get_cursor_pos | UI | civilopedia | 49 | 0x00450000 |  | Get cursor position via dialog |
| 0x004518d0 | pedia_begin_paint | UI | civilopedia | 38 | 0x00450000 |  | Begin paint + update |
| 0x00451900 | pedia_select_dc | UI | civilopedia | 37 | 0x00450000 |  | Select DC object |
| 0x00451930 | pedia_button_ctor | UI | civilopedia | 83 | 0x00450000 |  | Construct button widget |
| 0x004519b0 | pedia_button_create | UI | civilopedia | 139 | 0x00450000 |  | Create button HWND |
| 0x00451a60 | pedia_set_callback | UI | civilopedia | 33 | 0x00450000 |  | Set callback at this+0x34 |
| 0x00451a90 | SetHelpID | FW | mfc | 33 | 0x00450000 |  | CDialog::SetHelpID (1) / MFC library: set help ID |
| 0x00451ac0 | pedia_set_scroll_handler | UI | civilopedia | 33 | 0x00450000 |  | Set handler at this+0x30 |
| 0x00451af0 | pedia_draw_header | UI | civilopedia | 256 | 0x00450000 |  | Draw header text with shadow |
| 0x00451bf0 | pedia_init_tabs | UI | civilopedia | 1391 | 0x00450000 |  | Init 17 category tabs, create scrollbar |
| 0x00452188 | pedia_render_tab_content | UI | civilopedia | 356 | 0x00450000 |  | Switch on tab index to render content |
| 0x00452315 | pedia_show_article | UI | civilopedia | 1059 | 0x00450000 |  | Load and display article from describe.txt |
| 0x00452768 | pedia_show_description | UI | civilopedia | 593 | 0x00450000 |  | Switch on category, show description page |
| 0x004529df | register_wndclass_29DF | UI | civilopedia | 136 | 0x00450000 |  | Register MSHyperTextClass once |
| 0x00452a67 | hypertext_dtor | UI | civilopedia | 90 | 0x00450000 |  | Destroy hypertext window + cleanup |
| 0x00452ac1 | hypertext_base_dtor | UI | civilopedia | 9 | 0x00450000 |  | Base destructor thunk |
| 0x00452ad4 | hypertext_seh_epilog | FW | crt | 14 | 0x00450000 |  | SEH frame restore |
| 0x00452ae2 | hypertext_create_window | UI | civilopedia | 167 | 0x00450000 |  | CreateWindowExA MSHyperTextClass |
| 0x00452b89 | hypertext_widget_create | UI | civilopedia | 139 | 0x00450000 |  | Widget init + create HWND |
| 0x00452c14 | pedia_add_hyperlink | UI | civilopedia | 1361 | 0x00450000 |  | Add clickable link node to article |
| 0x004531b8 | pedia_link_click_left | UI | civilopedia | 130 | 0x00450000 |  | Link click handler: type=1 |
| 0x0045323a | pedia_link_click_right | UI | civilopedia | 130 | 0x00450000 |  | Link click handler: type=2 |
| 0x004532bc | pedia_link_click_3 | UI | civilopedia | 130 | 0x00450000 |  | Link click handler: type=3 |
| 0x0045333e | pedia_link_click_4 | UI | civilopedia | 130 | 0x00450000 |  | Link click handler: type=4 |
| 0x004533c0 | pedia_link_click_5 | UI | civilopedia | 130 | 0x00450000 |  | Link click handler: type=5 |
| 0x00453aa0 | pedia_scrollbar_dtor_delete | UI | civilopedia | 57 | 0x00450000 |  | Scalar destructor + delete |
| 0x00453af0 | pedia_close_file | UI | civilopedia | 21 | 0x00450000 |  | Close file handle |
| 0x00453b10 | pedia_link_node_ctor | UI | civilopedia | 86 | 0x00450000 |  | Construct link node object |
| 0x00453ba0 | hypertext_link_dtor | UI | civilopedia | 90 | 0x00450000 |  | Destroy hypertext link window |
| 0x00453bfa | hypertext_link_base_dtor | UI | civilopedia | 9 | 0x00450000 |  | Base destructor thunk |
| 0x00453c0d | hypertext_link_seh_epilog | FW | crt | 14 | 0x00450000 |  | SEH frame restore |
| 0x00453c40 | pedia_clear_selection | UI | civilopedia | 47 | 0x00450000 |  | Clear selection, invalidate |
| 0x00453c80 | pedia_set_selection | UI | civilopedia | 47 | 0x00450000 |  | Set selection=1, invalidate |
| 0x00453cc0 | pedia_link_button_ctor | UI | civilopedia | 83 | 0x00450000 |  | Construct link button object |
| 0x00453d40 | pedia_link_set_callback | UI | civilopedia | 33 | 0x00450000 |  | Set callback at this+0x34 |
| 0x00453d70 | SetHelpID | FW | mfc | 33 | 0x00450000 |  | CDialog::SetHelpID (2) / MFC library: set help ID (duplicate) |
| 0x00453da0 | is_wonder_obsolete | GL | wonder | 120 bytes | 0x00450000 | P |  |
| 0x00453e18 | get_wonder_city | GL | wonder | 57 bytes | 0x00450000 | P |  |
| 0x00453e51 | civ_has_active_wonder | GL | wonder | 142 bytes | 0x00450000 | P |  |
| 0x00453edf | get_wonder_owner | GL | wonder | 73 bytes | 0x00450000 | PA |  |
| 0x00453f90 | load_default_language | FI | registry | 220 | 0x00450000 |  | Read/write DefaultLanguage from HKLM registry |
| 0x0045406c | registry_write_value | FI | registry | 146 | 0x00450000 |  | RegCreateKeyExA + RegSetValueExA |
| 0x00454103 | registry_read_value | FI | registry | 199 | 0x00450000 |  | RegOpenKeyExA + RegQueryValueExA |
| 0x00454260 | show_advisor_screen | UI | advisor | 205 | 0x00450000 |  | Entry point: alloc 0x1CB4 object, init, show |
| 0x00454344 | advisor_noop | UI | advisor | 16 | 0x00450000 |  | Empty function |
| 0x00454354 | advisor_ctor | UI | advisor | 578 | 0x00450000 |  | Constructor: init CStrings, copy layout tables |
| 0x00454699 | advisor_dtor | UI | advisor | 255 | 0x00450000 |  | Destructor chain: 14 sub-destructors |
| 0x00454798 | advisor_dtor_sub_0 | UI | advisor | 15 | 0x00450000 |  | Destroy sub-object 0 |
| 0x004547a7 | advisor_dtor_sub_1 | UI | advisor | 15 | 0x00450000 |  | Destroy sub-object 1 |
| 0x004547b6 | advisor_dtor_sub_2 | UI | advisor | 24 | 0x00450000 |  | Vector destructor 0x18ac |
| 0x004547ce | advisor_dtor_sub_3 | UI | advisor | 24 | 0x00450000 |  | Vector destructor 0x17bc |
| 0x004547e6 | advisor_dtor_sub_4 | UI | advisor | 24 | 0x00450000 |  | Vector destructor 0x16cc |
| 0x004547fe | advisor_dtor_sub_5 | UI | advisor | 24 | 0x00450000 |  | Vector destructor 0x15dc |
| 0x00454816 | advisor_dtor_sub_6 | UI | advisor | 24 | 0x00450000 |  | Vector destructor 0x6dc |
| 0x0045482e | advisor_dtor_sub_7 | UI | advisor | 15 | 0x00450000 |  | Timevec destructor |
| 0x0045483d | advisor_dtor_sub_8 | UI | advisor | 15 | 0x00450000 |  | Destroy sub-object 8 |
| 0x0045484c | advisor_dtor_sub_9 | UI | advisor | 15 | 0x00450000 |  | Destroy sub-object 9 |
| 0x0045485b | advisor_dtor_sub_10 | UI | advisor | 15 | 0x00450000 |  | Destroy sub-object 10 |
| 0x0045486a | advisor_dtor_sub_11 | UI | advisor | 15 | 0x00450000 |  | Destroy sub-object 11 |
| 0x00454879 | advisor_dtor_sub_12 | UI | advisor | 15 | 0x00450000 |  | Destroy sub-object 12 |
| 0x00454888 | advisor_dtor_sub_13 | UI | advisor | 9 | 0x00450000 |  | Destroy sub-object 13 |
| 0x0045489b | advisor_seh_epilog | FW | crt | 14 | 0x00450000 |  | SEH frame restore |
| 0x004548a9 | advisor_init_with_city | UI | advisor | 1506 | 0x00450000 |  | Load cv.dll, setup portrait, create grid regions |
| 0x00454e8b | advisor_init_cleanup_0 | UI | advisor | 12 | 0x00450000 |  | CRT thunk |
| 0x00454ea1 | advisor_init_seh_epilog | FW | crt | 17 | 0x00450000 |  | SEH frame restore |
| 0x00454eb2 | advisor_show_dialog | UI | advisor | 209 | 0x00450000 |  | Show property sheet dialog |
| 0x00454f83 | advisor_setup_portraits | UI | advisor | 414 | 0x00450000 |  | Choose advisor portrait based on coastal/inland |
| 0x0045512b | advisor_load_icon_surface | UI | advisor | 88 | 0x00450000 |  | Load 32x32 icon surface |
| 0x00455183 | advisor_setup_background | UI | advisor | 401 | 0x00450000 |  | Create background surface, title bar |
| 0x00455314 | advisor_render_building_grid | UI | advisor | 1694 | 0x00450000 |  | Render building/wonder grid with sprites |
| 0x00455add | advisor_blit_icons | UI | advisor | 177 | 0x00450000 |  | Blit assigned building icons to grid |
| 0x00455b8e | advisor_pop_wonder_shuffle | UI | advisor | 207 | 0x00450000 |  | Pop random wonder from shuffle deck |
| 0x00455c5d | advisor_pop_building_shuffle | UI | advisor | 219 | 0x00450000 |  | Pop random building from shuffle deck |
| 0x00455d38 | advisor_assign_building_sprite | UI | advisor | 197 | 0x00450000 |  | Assign building sprite to grid cell |
| 0x00455dfd | advisor_assign_wonder_sprite | UI | advisor | 193 | 0x00450000 |  | Assign wonder sprite to grid cell |
| 0x00455ebe | advisor_place_wonder_animated | UI | advisor | 112 | 0x00450000 |  | Place wonder with animation countdown |
| 0x00455f2e | advisor_place_building_animated | UI | advisor | 112 | 0x00450000 |  | Place building with animation countdown |
| 0x00455f9e | advisor_place_wonder_static | UI | advisor | 103 | 0x00450000 |  | Place wonder without animation |
| 0x00456005 | advisor_place_building_static | UI | advisor | 103 | 0x00450000 |  | Place building without animation |
| 0x0045606c | advisor_composite_and_title | UI | advisor | 140 | 0x00450000 |  | Composite background + draw title |
| 0x004560f8 | advisor_draw_title | UI | advisor | 225 | 0x00450000 |  | Draw city name in advisor title bar |
| 0x004561d9 | advisor_check_scroll_edge | UI | advisor | 79 | 0x00450000 |  | Check cursor position for scroll trigger |
| 0x00456228 | advisor_handle_key | UI | advisor | 64 | 0x00450000 |  | Handle key 0xD2 → invalidate cache |
| 0x0045626d | advisor_invalidate_cache | UI | advisor | 46 | 0x00450000 |  | Invalidate property sheet cache |
| 0x0045629b | advisor_handle_command | UI | advisor | 164 | 0x00450000 |  | Handle scroll/tab commands via switch |
| 0x0045638b | advisor_scroll_right | UI | advisor | 285 | 0x00450000 |  | Animated scroll right loop |
| 0x004564a8 | advisor_scroll_left | UI | advisor | 274 | 0x00450000 |  | Animated scroll left loop |
| 0x00456e90 | advisor_scalar_dtor | UI | advisor | 57 | 0x00450000 |  | Scalar destructor + delete |
| 0x00456ee0 | ios::tie | FW | mfc | 45 | 0x00450000 |  | MFC library: ios::tie |
| 0x00456f20 | adjust_attitude | GL | diplomacy | 107 bytes | 0x00450000 | R |  |
| 0x00456f8b | calc_patience_threshold | GL | diplomacy | 211 bytes | 0x00450000 | R |  |
| 0x0045705e | ai_evaluate_diplomacy | AI | diplomacy | 6616 bytes | 0x00450000 | PA |  |
| 0x00458a3b | diplo_show_attitude_header | UI | diplomacy | 118 bytes | 0x00450000 | NN |  |
| 0x00458ab1 | diplo_show_greeting | UI | diplomacy | 804 bytes | 0x00450000 | TL |  |
| 0x00458dd5 | diplo_greeting_cleanup_0 | UI | diplomacy | 12 bytes | 0x00450000 | SK |  |
| 0x00458deb | diplo_greeting_seh_epilog | UI | diplomacy | 14 bytes | 0x00450000 | SK |  |
| 0x00458df9 | diplo_ai_emissary | GL | diplomacy | 880 bytes | 0x00450000 | TM |  |
| 0x00459169 | diplo_emissary_cleanup | UI | diplomacy | 12 bytes | 0x00450000 | SK |  |
| 0x0045917f | diplo_emissary_seh_epilog | UI | diplomacy | 15 bytes | 0x00450000 | SK |  |
| 0x0045918e | diplo_reset_state | GL | diplomacy | 61 bytes | 0x00450000 | TM |  |
| 0x004591cb | diplo_sell_tech | GL | diplomacy | 832 bytes | 0x00450000 | TL |  |
| 0x0045950b | handle_exchange_gift | GL | diplomacy | 4096 bytes | 0x00450000 | TH |  |
| 0x0045a510 | FUN_0045a526 | UI | diplomacy | 12 | 0x00450000 | SK |  |
| 0x0045a526 | FUN_0045a526 | UNSET |  | 15 | 0x00450000 |  |  |
| 0x0045a535 | diplo_form_alliance | GL | diplomacy | 374 bytes | 0x00450000 | TH |  |
| 0x0045a6ab | diplo_sign_peace_treaty | GL | diplomacy | 253 bytes | 0x00450000 | TH |  |
| 0x0045a7a8 | diplo_sign_ceasefire | GL | diplomacy | 315 bytes | 0x00450000 | TH |  |
| 0x0045a8e3 | diplo_activate_alliance_wars | GL | diplomacy | 910 bytes | 0x00450000 | TH |  |
| 0x0045ac71 | diplo_declare_war | GL | diplomacy | 1125 bytes | 0x00450000 | TH |  |
| 0x0045b0d6 | diplo_demand_ally_help | GL | diplomacy | 919 bytes | 0x00450000 | TM |  |
| 0x0045b472 | calc_gold_to_attitude | GL | diplomacy | 104 bytes | 0x00450000 | TL |  |
| 0x0045b4da | diplo_ai_negotiate | AI | diplomacy | 10271 bytes | 0x00450000 | PA |  |
| 0x0045dd7f | diplo_favor_menu | GL | diplomacy | 4878 bytes | 0x00450000 | TM |  |
| 0x0045f08d | FUN_0045f0a3 | UI | diplomacy | 12 | 0x00450000 | SK |  |
| 0x0045f0a3 | FUN_0045f0a3 | UNSET |  | 14 | 0x00450000 |  |  |
| 0x0045f0b1 | show_gift_menu | GL | diplomacy | 3218 bytes | 0x00450000 | TM |  |
| 0x0045fd43 | FUN_0045fd59 | UI | diplomacy | 12 | 0x00450000 | SK |  |
| 0x0045fd59 | FUN_0045fd59 | UNSET |  | 14 | 0x00450000 |  |  |
| 0x0045fd67 | diplo_check_war_weariness | GL | diplomacy | 178 bytes | 0x00450000 | TM |  |
| 0x0045fe19 | diplo_show_main_menu | GL | diplomacy | 747 bytes | 0x00450000 | TM |  |
| 0x00460104 | crt_init_thunk_0 | FW | crt | 12 | 0x00460000 | SK |  |
| 0x0046011a | crt_seh_epilog | FW | crt | 15 bytes | 0x00460000 | SK |  |
| 0x00460129 | ai_diplomacy_negotiate | AI | diplomacy | 16263 bytes | 0x00460000 | PA |  |
| 0x00467580 | set_tribute_display_amount | UI | parley | 29 bytes | 0x00460000 | SK |  |
| 0x004675b0 | crt_init_midi | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x004675ca | init_midi_system | SN | music | 31 bytes | 0x00460000 | SK |  |
| 0x004675e9 | register_midi_cleanup | FW | crt | 29 bytes | 0x00460000 | SK |  |
| 0x00467606 | cleanup_midi_system | SN | music | 26 bytes | 0x00460000 | SK |  |
| 0x00467620 | FID_conflict___E31 | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x0046763a | init_static_module_1 | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x00467654 | register_cleanup_1 | FW | crt | 29 bytes | 0x00460000 | SK |  |
| 0x00467671 | cleanup_static_1 | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x0046768b | FID_conflict___E31 | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x004676a5 | init_static_module_2 | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x004676bf | register_cleanup_2 | FW | crt | 29 bytes | 0x00460000 | SK |  |
| 0x004676dc | cleanup_timevec_global | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x00467750 | clear_treaty_flags | GL | diplomacy | 213 bytes | 0x00460000 | PA |  |
| 0x00467825 | set_treaty_flags | GL | diplomacy | 223 bytes | 0x00460000 | R |  |
| 0x00467904 | get_attitude_raw | GL | diplomacy | 47 bytes | 0x00460000 | PA |  |
| 0x00467933 | set_attitude_value | GL | diplomacy | 120 bytes | 0x00460000 | PA |  |
| 0x004679ab | calc_attitude | GL | diplomacy | 178 bytes | 0x00460000 | PA |  |
| 0x00467a5d | get_attitude_category | GL | diplomacy | 41 bytes | 0x00460000 | PA |  |
| 0x00467a86 | is_attitude_hostile | GL | diplomacy | 53 bytes | 0x00460000 | PA |  |
| 0x00467abb | is_attitude_friendly | GL | diplomacy | 53 bytes | 0x00460000 | PA |  |
| 0x00467af0 | should_declare_war | AI | diplomacy | 191 bytes | 0x00460000 | PA |  |
| 0x00467baf | recall_units_from_territory | GL | diplomacy | 835 bytes | 0x00460000 | NN |  |
| 0x00467ef2 | break_alliance | GL | diplomacy | 632 bytes | 0x00460000 | NN |  |
| 0x004683f0 | init_unit_listbox | UI | parley | 899 bytes | 0x00460000 | SK |  |
| 0x00468797 | scroll_left_panel | UI | parley | 30 bytes | 0x00460000 | SK |  |
| 0x004687b5 | scroll_right_panel | UI | parley | 30 bytes | 0x00460000 | SK |  |
| 0x004687d3 | set_listbox_scroll | UI | parley | 97 bytes | 0x00460000 | SK |  |
| 0x00468834 | handle_listbox_click | UI | parley | 627 bytes | 0x00460000 | SK |  |
| 0x00468aa7 | hit_test_listbox | UI | parley | 274 bytes | 0x00460000 | SK |  |
| 0x00468bb9 | paint_unit_listbox | UI | parley | 1841 bytes | 0x00460000 | SK |  |
| 0x004692ea | handle_listbox_sort_left_fwd | UI | parley | 219 bytes | 0x00460000 | SK |  |
| 0x004693c5 | handle_listbox_sort_left_rev | UI | parley | 242 bytes | 0x00460000 | SK |  |
| 0x004694b7 | handle_listbox_rename_unit | UI | parley | 144 bytes | 0x00460000 | SK |  |
| 0x00469547 | handle_select_all_left | UI | parley | 26 bytes | 0x00460000 | SK |  |
| 0x00469561 | handle_select_all_right | UI | parley | 26 bytes | 0x00460000 | SK |  |
| 0x0046957b | select_all_items | UI | parley | 110 bytes | 0x00460000 | SK |  |
| 0x004695e9 | handle_sort_left_by_name | UI | parley | 26 bytes | 0x00460000 | SK |  |
| 0x00469603 | handle_sort_right_by_name | UI | parley | 26 bytes | 0x00460000 | SK |  |
| 0x0046961d | sort_panel_by_name | UI | parley | 110 bytes | 0x00460000 | SK |  |
| 0x0046968b | sort_listbox_by_type | UI | parley | 639 bytes | 0x00460000 | SK |  |
| 0x0046990a | sort_listbox_by_name | UI | parley | 722 bytes | 0x00460000 | SK |  |
| 0x00469bdc | populate_unit_listbox | UI | parley | 1102 bytes | 0x00460000 | SK |  |
| 0x0046a740 | free_labels | FI | labels | 77 bytes | 0x00460000 | SK |  |
| 0x0046a78d | load_labels_txt | FI | labels | 589 bytes | 0x00460000 | SK |  |
| 0x0046aaa0 | mem_free | FW | crt | 28 bytes | 0x00460000 | SK |  |
| 0x0046aad0 | mem_lock | FW | crt | 28 bytes | 0x00460000 | SK |  |
| 0x0046ab00 | mem_unlock | FW | crt | 28 bytes | 0x00460000 | SK |  |
| 0x0046ab30 | get_this_ptr | FW | crt | 25 bytes | 0x00460000 | SK |  |
| 0x0046ab49 | noop_stub | FW | crt | 22 bytes | 0x00460000 | SK |  |
| 0x0046ab5f | InvalidateObjectCache | UI | clickRegion | 35 bytes | 0x00460000 | SK |  |
| 0x0046ab82 | remove_click_region | UI | clickRegion | 107 bytes | 0x00460000 | SK |  |
| 0x0046abed | remove_click_region_by_id | UI | clickRegion | 151 bytes | 0x00460000 | SK |  |
| 0x0046ac89 | close_dialog | UI | clickRegion | 94 bytes | 0x00460000 | SK |  |
| 0x0046ace7 | add_click_region | UI | clickRegion | 153 bytes | 0x00460000 | SK |  |
| 0x0046ad85 | find_click_region | UI | clickRegion | 259 bytes | 0x00460000 | SK |  |
| 0x0046af70 | net_send_to_player | NW | protocol | 305 bytes | 0x00460000 | NN |  |
| 0x0046b0a1 | net_broadcast | NW | protocol | 124 bytes | 0x00460000 | NN |  |
| 0x0046b11d | net_send_simple | NW | protocol | 48 bytes | 0x00460000 | NN |  |
| 0x0046b14d | net_send_message | NW | protocol | 6649 bytes | 0x00460000 | NN |  |
| 0x0046d5a0 | net_msg_init_header | NW | protocol | 55 bytes | 0x00460000 | NN |  |
| 0x0046d5f0 | net_msg_init_with_name | NW | protocol | 141 bytes | 0x00460000 | NN |  |
| 0x0046d6a0 | net_msg_init_with_version | NW | protocol | 94 bytes | 0x00460000 | NN |  |
| 0x0046d720 | net_msg_build_type2 | NW | protocol | 65 bytes | 0x00460000 | NN |  |
| 0x0046d780 | net_msg_build_type2f | NW | protocol | 169 bytes | 0x00460000 | NN |  |
| 0x0046d860 | net_msg_build_type4 | NW | protocol | 45 bytes | 0x00460000 | NN |  |
| 0x0046d8a0 | net_msg_build_type6 | NW | protocol | 45 bytes | 0x00460000 | NN |  |
| 0x0046d8e0 | net_msg_build_type13 | NW | protocol | 60 bytes | 0x00460000 | NN |  |
| 0x0046d930 | net_msg_build_type69 | NW | protocol | 56 bytes | 0x00460000 | NN |  |
| 0x0046d980 | net_show_popup | NW | protocol | 148 bytes | 0x00460000 | NN |  |
| 0x0046da40 | load_civ2_art_0046da40 | UI | video | 851 bytes | 0x00460000 | SK |  |
| 0x0046dd98 | cleanup_video_timevec | UI | video | 12 bytes | 0x00460000 | SK |  |
| 0x0046dda4 | cleanup_video_surface | UI | video | 12 bytes | 0x00460000 | SK |  |
| 0x0046ddb0 | cleanup_video_module | UI | video | 12 bytes | 0x00460000 | SK |  |
| 0x0046ddbc | cleanup_video_player | UI | video | 12 bytes | 0x00460000 | SK |  |
| 0x0046ddd2 | cleanup_video_seh | UI | video | 14 bytes | 0x00460000 | SK |  |
| 0x0046dde0 | on_video_timer | UI | video | 69 bytes | 0x00460000 | SK |  |
| 0x0046de25 | on_video_key | UI | video | 119 bytes | 0x00460000 | SK |  |
| 0x0046dea1 | on_video_frame | UI | video | 43 bytes | 0x00460000 | SK |  |
| 0x0046dff0 | EnableStackedTabs | FW | crt | 36 bytes | 0x00460000 | SK |  |
| 0x0046e020 | play_sound_effect | SN | music | 601 bytes | 0x00460000 | SK |  |
| 0x0046e287 | wait_for_animation | SN | music | 109 bytes | 0x00460000 | SK |  |
| 0x0046e2f4 | trigger_music_change | SN | music | 44 bytes | 0x00460000 | SK |  |
| 0x0046e320 | select_random_music_track | SN | music | 388 bytes | 0x00460000 | SK |  |
| 0x0046e4a9 | init_cd_music | SN | music | 190 bytes | 0x00460000 | SK |  |
| 0x0046e571 | play_music_track | SN | music | 312 bytes | 0x00460000 | SK |  |
| 0x0046e6a9 | stop_music | SN | music | 31 bytes | 0x00460000 | SK |  |
| 0x0046e6c8 | resume_music | SN | music | 85 bytes | 0x00460000 | SK |  |
| 0x0046e8f0 | parse_hex_string | FI | labels | 173 bytes | 0x00460000 | SK |  |
| 0x0046e9d0 | FID_conflict___E31 | FW | crt | 26 bytes | 0x00460000 | SK |  |
| 0x0046e9ea | init_palette_surface | RN | palette | 26 bytes | 0x00460000 | SK |  |
| 0x0046ea04 | register_palette_cleanup | FW | crt | 29 bytes | 0x00460000 | SK |  |
| 0x0046ea21 | cleanup_palette_surface | RN | palette | 26 bytes | 0x00460000 | SK |  |
| 0x0046ea3b | handle_palette | RN | palette | 970 bytes | 0x00460000 | SK |  |
| 0x0046ee1e | free_palette_data | RN | palette | 48 bytes | 0x00460000 | SK |  |
| 0x0046ee4e | apply_palette_to_surfaces | RN | palette | 241 bytes | 0x00460000 | SK |  |
| 0x0046ef3f | invalidate_all_surfaces | RN | palette | 151 bytes | 0x00460000 | SK |  |
| 0x0046efd6 | fade_out_palette | RN | palette | 153 bytes | 0x00460000 | SK |  |
| 0x0046f06f | fade_in_palette | RN | palette | 153 bytes | 0x00460000 | SK |  |
| 0x0046f108 | restore_palette_entries | RN | palette | 135 bytes | 0x00460000 | SK |  |
| 0x0046f18f | end_paint_all_surfaces | RN | palette | 151 bytes | 0x00460000 | SK |  |
| 0x0046f440 | get_palette_handle | RN | palette | 25 bytes | 0x00460000 | SK |  |
| 0x0046f460 | load_bitmap | FI | bitmap | 1929 bytes | 0x00460000 | SK |  |
| 0x0046fbf3 | write_bitmap_data | FI | bitmap | 1027 bytes | 0x00460000 | SK |  |
| 0x004702e0 | play_loser_video | CS | loser | 221 bytes | 0x00470000 | SK |  |
| 0x004703d4 | ctor_cutscene_object | CS | loser | 186 bytes | 0x00470000 | NN |  |
| 0x004704ec | dtor_cutscene_object | CS | loser | 127 bytes | 0x00470000 | NN |  |
| 0x0047056b | FUN_0047056b | CS | loser | 15 | 0x00470000 | NN |  |
| 0x0047057a | FUN_0047057a | CS | loser | 15 | 0x00470000 | NN |  |
| 0x00470589 | FUN_00470589 | CS | loser | 15 | 0x00470000 | NN |  |
| 0x00470598 | FUN_00470598 | CS | loser | 15 | 0x00470000 | NN |  |
| 0x004705a7 | FUN_004705a7 | CS | loser | 15 | 0x00470000 | NN |  |
| 0x004705b6 | FUN_004705b6 | CS | loser | 9 | 0x00470000 | NN |  |
| 0x004705c9 | seh_cleanup_loser | FW | seh | 14 bytes | 0x00470000 | NN |  |
| 0x004705d7 | load_loser_art | CS | loser | 772 bytes | 0x00470000 | SK |  |
| 0x004708db | show_loser_text | CS | loser | 817 bytes | 0x00470000 | SK |  |
| 0x00470c0c | noop_loser_callback | CS | loser | 16 bytes | 0x00470000 | NN |  |
| 0x00470c1c | show_loser_text_page3 | CS | loser | 338 bytes | 0x00470000 | SK |  |
| 0x00471020 | scalar_deleting_dtor_loser | CS | loser | 57 bytes | 0x00470000 | NN |  |
| 0x00471070 | GetActiveView | FW | mfc | 30 bytes | 0x00470000 | NN |  |
| 0x004710a0 | GetActiveView | FW | mfc | 30 bytes | 0x00470000 | NN |  |
| 0x004710d0 | play_winner_video | CS | winner | 606 bytes | 0x00470000 | SK |  |
| 0x0047132e | FUN_0047132e | CS | winner | 12 | 0x00470000 |  |  |
| 0x00471354 | FUN_00471354 | CS | winner | 14 | 0x00470000 |  |  |
| 0x00471362 | ctor_cutscene_object_2 | CS | winner | 186 | 0x00470000 |  |  |
| 0x0047147a | dtor_cutscene_object_2 | CS | winner | 127 | 0x00470000 |  |  |
| 0x004714f9 | FUN_004714f9 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x00471508 | FUN_00471508 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x00471517 | FUN_00471517 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x00471526 | FUN_00471526 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x00471535 | FUN_00471535 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x00471544 | FUN_00471544 | UNSET |  | 9 | 0x00470000 |  |  |
| 0x00471557 | FUN_00471557 | UNSET |  | 14 | 0x00470000 |  |  |
| 0x00471565 | load_civ2_art_00471565 | CS | winner | 753 | 0x00470000 |  |  |
| 0x00471856 | show_winner_text | CS | winner | 936 | 0x00470000 |  |  |
| 0x00471bfe | FUN_00471bfe | CS | winner | 22 | 0x00470000 | NN |  |
| 0x00471c14 | FUN_00471c14 | CS | winner | 22 | 0x00470000 | NN |  |
| 0x00471c2a | show_centauri_scrolltext | CS | winner | 397 bytes | 0x00470000 | SK |  |
| 0x00471db7 | FUN_00471db7 | CS | winner | 33 bytes | 0x00470000 | NN |  |
| 0x00471dd8 | show_beaten_cutscene | CS | winner | 1467 bytes | 0x00470000 | SK |  |
| 0x00472393 | FUN_00472393 | CS | winner | 12 | 0x00470000 | NN |  |
| 0x0047239f | FUN_0047239f | UNSET |  | 12 | 0x00470000 |  |  |
| 0x004723ab | FUN_004723ab | UNSET |  | 12 | 0x00470000 |  |  |
| 0x004723b7 | FUN_004723b7 | UNSET |  | 12 | 0x00470000 |  |  |
| 0x004723c3 | FUN_004723c3 | UNSET |  | 12 | 0x00470000 |  |  |
| 0x004723cf | FUN_004723cf | UNSET |  | 12 | 0x00470000 |  |  |
| 0x004723e5 | FUN_004723e5 | UNSET |  | 14 | 0x00470000 |  |  |
| 0x004728c0 | scalar_deleting_dtor_winner | CS | winner | 57 bytes | 0x00470000 | NN |  |
| 0x00472910 | set_callback_pointers | RD | helper | 48 bytes | 0x00470000 | SK |  |
| 0x00472950 | append_extension_if_missing | IO | file_dialog | 91 bytes | 0x00470000 | SK |  |
| 0x004729ab | replace_extension | IO | file_dialog | 125 bytes | 0x00470000 | SK |  |
| 0x00472a60 | show_danger_popup | RD | helper | 85 bytes | 0x00470000 | SK |  |
| 0x00472ab5 | show_dangerhex_popup | RD | helper | 85 bytes | 0x00470000 | SK |  |
| 0x00472b0a | draw_number_on_map | RD | helper | 346 bytes | 0x00470000 | SK |  |
| 0x00472cf0 | scale_sprite | VP | zoom | 35 bytes | 0x00470000 | FP |  |
| 0x00472d20 | init_unit_move_data | RD | helper | 253 bytes | 0x00470000 | SK |  |
| 0x00472e1d | init_and_place_unit | RD | helper | 63 bytes | 0x00470000 | SK |  |
| 0x00472e5c | stop_unit_animation | RD | helper | 79 bytes | 0x00470000 | SK |  |
| 0x00472f10 | FID_conflict:_$E31 | FW | crt_init | 26 bytes | 0x00470000 | NN |  |
| 0x00472f2a | FUN_00472f2a | UNSET |  | 26 | 0x00470000 |  |  |
| 0x00472f44 | FUN_00472f44 | UNSET |  | 29 | 0x00470000 |  |  |
| 0x00472f61 | FUN_00472f61 | UNSET |  | 26 | 0x00470000 |  |  |
| 0x00472f7b | pack_viewport_state | IO | viewport_pack | 233 bytes | 0x00470000 | PA |  |
| 0x00473064 | unpack_viewport_state | IO | viewport_pack | 234 bytes | 0x00470000 | PA |  |
| 0x0047314e | rect_int32_to_int16 | IO | viewport_pack | 66 | 0x00470000 | PA |  |
| 0x00473190 | rect_int16_to_int32 | IO | viewport_pack | 66 | 0x00470000 | PA |  |
| 0x004731d2 | show_open_dialog | IO | file_dialog | 212 bytes | 0x00470000 | SK |  |
| 0x004732a6 | load_units_and_cities | IO | save | 954 bytes | 0x00470000 | FP |  |
| 0x00473660 | load_game_file | IO | save | 1458 bytes | 0x00470000 | FP |  |
| 0x00473c12 | write_null_terminated_string | IO | save | 86 bytes | 0x00470000 | SK |  |
| 0x00473c68 | read_null_terminated_string | IO | save | 246 bytes | 0x00470000 | SK |  |
| 0x00473d5e | set_save_extension | IO | file_dialog | 247 bytes | 0x00470000 | SK |  |
| 0x00473e55 | build_file_filter | IO | file_dialog | 408 bytes | 0x00470000 | SK |  |
| 0x00473ff2 | append_file_type_filter | IO | file_dialog | 422 bytes | 0x00470000 | SK |  |
| 0x004741be | write_save_file | IO | save | 4499 bytes | 0x00470000 | PA |  |
| 0x0047543c | quick_load_check | IO | save | 509 bytes | 0x00470000 | FP |  |
| 0x00475666 | load_full_game | IO | save | 7734 bytes | 0x00470000 | FP |  |
| 0x0047758c | save_game | IO | save | 2038 bytes | 0x00470000 | SK |  |
| 0x00477d8c | load_verify_units | IO | load | 2391 bytes | 0x00470000 | SK |  |
| 0x004786f8 | FUN_004786f8 | UNSET |  | 12 | 0x00470000 |  |  |
| 0x0047870e | FUN_0047870e | UNSET |  | 15 | 0x00470000 |  |  |
| 0x00479d20 | FUN_00479d20 | UNSET |  | 26 | 0x00470000 |  |  |
| 0x00479d3a | construct_civ_array | UNSET |  | 43 | 0x00470000 |  |  |
| 0x00479d65 | FUN_00479d65 | UNSET |  | 29 | 0x00470000 |  |  |
| 0x00479d82 | FUN_00479d82 | UNSET |  | 38 | 0x00470000 |  |  |
| 0x00479da8 | FID_conflict:_$E31 | FW | crt | 26 | 0x00470000 | NN |  |
| 0x00479dc2 | FUN_00479dc2 | UNSET |  | 26 | 0x00470000 |  |  |
| 0x00479ddc | FUN_00479ddc | UNSET |  | 29 | 0x00470000 |  |  |
| 0x00479df9 | FUN_00479df9 | UNSET |  | 26 | 0x00470000 |  |  |
| 0x00479e13 | FID_conflict:_$E31 | FW | crt | 26 | 0x00470000 | NN |  |
| 0x00479e2d | FUN_00479e2d | UNSET |  | 26 | 0x00470000 |  |  |
| 0x00479e47 | FUN_00479e47 | UNSET |  | 29 | 0x00470000 |  |  |
| 0x00479e64 | FUN_00479e64 | UNSET |  | 26 | 0x00470000 |  |  |
| 0x00479e7e | scroll_map_to_y | VP | camera | 48 bytes | 0x00470000 | SK |  |
| 0x00479eae | scroll_map_to_x | VP | camera | 48 bytes | 0x00470000 | SK |  |
| 0x00479ede | init_map_viewport | VP | camera | 224 bytes | 0x00470000 | SK |  |
| 0x00479fbe | recalc_viewport_geometry | VP | camera | 1410 bytes | 0x00470000 | PA |  |
| 0x0047a540 | screen_to_tile | VP | camera | 368 bytes | 0x00470000 | PA |  |
| 0x0047a6b0 | tile_to_screen | VP | camera | 151 bytes | 0x00470000 | PA |  |
| 0x0047a747 | calc_coast_quadrants | RD | terrain | 386 bytes | 0x00470000 | FP |  |
| 0x0047a8c9 | render_tile | RD | terrain | 4431 bytes | 0x00470000 | FP |  |
| 0x0047ba1d | render_city_on_map | RD | terrain | 392 bytes | 0x00470000 | SK |  |
| 0x0047bba5 | draw_unit_simple | UNSET |  | 69 | 0x00470000 |  |  |
| 0x0047bbea | draw_unit_if_visible | UNSET |  | 111 | 0x00470000 |  |  |
| 0x0047bc59 | draw_unit_at_position | UNSET |  | 171 | 0x00470000 |  |  |
| 0x0047bd04 | draw_unit_with_stacking | UNSET |  | 351 | 0x00470000 |  |  |
| 0x0047be63 | draw_units_at_tile | UNSET |  | 662 | 0x00470000 |  |  |
| 0x0047c103 | draw_complete_tile | RD | compose | 495 bytes | 0x00470000 | SK |  |
| 0x0047c2f2 | is_x_in_range | RD | compose | 141 bytes | 0x00470000 | FP |  |
| 0x0047c37f | is_tile_in_viewport_rect | RD | compose | 97 bytes | 0x00470000 | SK |  |
| 0x0047c3e0 | is_tile_visible | RD | compose | 99 bytes | 0x00470000 | SK |  |
| 0x0047c443 | draw_city_labels | RD | compose | 871 bytes | 0x00470000 | SK |  |
| 0x0047c7aa | calc_tile_group_rect | UNSET |  | 191 | 0x00470000 |  |  |
| 0x0047c869 | redraw_tile_area | UNSET |  | 352 | 0x00470000 |  |  |
| 0x0047c9d4 | redraw_full_viewport | UNSET |  | 278 | 0x00470000 |  |  |
| 0x0047caea | invalidate_tile_area | UNSET |  | 60 | 0x00470000 |  |  |
| 0x0047cb26 | invalidate_single_tile | UNSET |  | 42 | 0x00470000 |  |  |
| 0x0047cb50 | begin_end_paint_cycle | UNSET |  | 100 | 0x00470000 |  |  |
| 0x0047cbb4 | update_map_area | UNSET |  | 313 | 0x00470000 |  |  |
| 0x0047cced | update_map_tile | UNSET |  | 50 | 0x00470000 |  |  |
| 0x0047cd1f | update_map_radius1 | UNSET |  | 50 | 0x00470000 |  |  |
| 0x0047cd51 | redraw_entire_map | UNSET |  | 205 | 0x00470000 |  |  |
| 0x0047ce1e | update_map_area_all_players | UNSET |  | 136 | 0x00470000 |  |  |
| 0x0047cea6 | update_tile_all_players | UNSET |  | 124 | 0x00470000 |  |  |
| 0x0047cf22 | update_radius1_all_players | UNSET |  | 124 | 0x00470000 |  |  |
| 0x0047cf9e | redraw_map_all_players | UNSET |  | 124 | 0x00470000 |  |  |
| 0x0047dce0 | ctor_map_window | UNSET |  | 164 | 0x00470000 |  |  |
| 0x0047de10 | ~CBitmapButton | UNSET |  | 114 | 0x00470000 |  |  |
| 0x0047de82 | FUN_0047de82 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x0047de91 | FUN_0047de91 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x0047dea0 | FUN_0047dea0 | UNSET |  | 15 | 0x00470000 |  |  |
| 0x0047deaf | FUN_0047deaf | UNSET |  | 15 | 0x00470000 |  |  |
| 0x0047debe | FUN_0047debe | UNSET |  | 9 | 0x00470000 |  |  |
| 0x0047ded1 | FUN_0047ded1 | UNSET |  | 14 | 0x00470000 |  |  |
| 0x0047df20 | set_sprite_scale | UNSET |  | 33 | 0x00470000 |  |  |
| 0x0047df50 | reset_sprite_scale | UNSET |  | 28 | 0x00470000 |  |  |
| 0x0047df80 | FUN_0047df80 | UNSET |  | 34 | 0x00470000 |  |  |
| 0x0047dfb0 | scale_at_current_zoom | UNSET |  | 47 | 0x00470000 |  |  |
| 0x0047dff0 | set_current_zoom_scale | UNSET |  | 41 | 0x00470000 |  |  |
| 0x0047e030 | is_tile_visible_to_any_player | RD | visibility | 181 bytes | 0x00470000 | SK |  |
| 0x0047e0e5 | enqueue_stacked_draw | RD | visibility | 462 bytes | 0x00470000 | R |  |
| 0x0047e2b3 | dequeue_stacked_draw | RD | visibility | 1590 bytes | 0x00470000 | SK |  |
| 0x0047e94e | network_poll | NET | poll | 14034 bytes | 0x00470000 | PA | 1 |
| 0x00482305 | crt_destructor_thunk_1 | FW | FRAMEWORK | 12 bytes | 0x00480000 | SK |  |
| 0x00482311 | crt_destructor_thunk_2 | FW | FRAMEWORK | 12 bytes | 0x00480000 | SK |  |
| 0x00482327 | seh_unwind_handler | FW | FRAMEWORK | 16 bytes | 0x00480000 | SK |  |
| 0x00482337 | mp_on_msg_invalidate | NW | MsgHandler | 70 bytes | 0x00480000 | NN |  |
| 0x0048237d | mp_on_msg_timer_invalidate | NW | MsgHandler | 89 bytes | 0x00480000 | NN |  |
| 0x004823d6 | mp_copy_player_info | NW | SessionMgmt | 154 bytes | 0x00480000 | NN |  |
| 0x00482470 | mp_on_msg_conditional_invalidate | NW | MsgHandler | 115 bytes | 0x00480000 | NN |  |
| 0x004824e3 | mp_server_quit_handler | NW | SessionMgmt | 577 bytes | 0x00480000 | NN |  |
| 0x00482724 | mp_on_quit_status_check | NW | MsgHandler | 73 bytes | 0x00480000 | NN |  |
| 0x0048276d | mp_on_timer_check_1 | NW | SessionMgmt | 104 bytes | 0x00480000 | NN |  |
| 0x004827d5 | mp_on_timer_check_2 | NW | SessionMgmt | 104 bytes | 0x00480000 | NN |  |
| 0x0048283d | mp_on_timer_check_3 | NW | SessionMgmt | 104 bytes | 0x00480000 | NN |  |
| 0x004828a5 | mp_client_transfer_server | NW | TurnSync | 2021 bytes | 0x00480000 | NN |  |
| 0x0048308f | mp_relink_event_strings | NW | EventString | 1654 bytes | 0x00480000 | NN |  |
| 0x00484cc0 | init_scenario_vars | GL | Init | 123 bytes | 0x00480000 | NN |  |
| 0x00484d3b | clear_game_active_flag | GL | Init | 23 bytes | 0x00480000 | NN |  |
| 0x00484d52 | init_game_display | GL | Init | 51 bytes | 0x00480000 | NN |  |
| 0x00484d85 | handle_quit_game | GL | Init | 615 bytes | 0x00480000 | NN |  |
| 0x00484fec | calc_year_from_turn | GL | Calendar | 540 bytes | 0x00480000 | PA |  |
| 0x00485208 | advance_year_display | GL | Calendar | 479 bytes | 0x00480000 | NN |  |
| 0x004853e7 | calc_power_graph_rankings | GL | PowerGraph | 2094 bytes | 0x00480000 | TH |  |
| 0x00485c15 | spawn_barbarians | GL | Barbarians | 3297 bytes | 0x00480000 | PA |  |
| 0x004868fb | apply_global_warming | GL | Pollution | 819 bytes | 0x00480000 | PA |  |
| 0x00486c2e | update_pollution_counter | GL | Pollution | 487 bytes | 0x00480000 | PA |  |
| 0x00486e15 | calc_tech_paradigm_cost | GL | Tech | 90 bytes | 0x00480000 | TM |  |
| 0x00486e6f | check_tech_advance | GL | Tech | 403 bytes | 0x00480000 | TM |  |
| 0x00487007 | refresh_map_visibility | GL | TurnProcess | 259 bytes | 0x00480000 | TM |  |
| 0x0048710a | begin_turn_unit_reset | GL | TurnProcess | 615 bytes | 0x00480000 | PA |  |
| 0x00487371 | process_end_of_turn | GL | TurnProcess | 1744 bytes | 0x00480000 | PA |  |
| 0x00487a41 | process_civ_turn | GL | TurnProcess | 3830 bytes | 0x00480000 | PA |  |
| 0x00488937 | auto_save_game | GL | Autosave | 270 bytes | 0x00480000 | NN |  |
| 0x00488a45 | check_trade_route_path | GL | TradeRoute | 682 bytes | 0x00480000 | TM |  |
| 0x00488cef | heal_units | GL | Healing | 1438 bytes | 0x00480000 | PA |  |
| 0x00489292 | check_population_milestone | UI | Tutorial | 705 bytes | 0x00480000 | NN |  |
| 0x00489553 | do_full_civ_turn | GL | TurnProcess | 679 bytes | 0x00480000 | PA |  |
| 0x004897fa | start_human_turn | UI | HumanTurn | 95 bytes | 0x00480000 | NN |  |
| 0x00489859 | select_next_unit | UI | HumanTurn | 436 bytes | 0x00480000 | NN |  |
| 0x00489a0d | activate_current_unit | UI | HumanTurn | 398 bytes | 0x00480000 | NN |  |
| 0x00489b9b | scroll_map_to_if_needed | UI | MapScroll | 71 bytes | 0x00480000 | NN |  |
| 0x00489be2 | check_tutorial_advice | UI | Tutorial | 1058 bytes | 0x00480000 | NN |  |
| 0x0048a004 | process_human_unit_orders | UI | HumanTurn | 880 bytes | 0x00480000 | NN |  |
| 0x0048a374 | wait_for_player_input | UI | HumanTurn | 162 bytes | 0x00480000 | NN |  |
| 0x0048a416 | human_turn_main_loop | UI | GameLoop | 1303 bytes | 0x00480000 | NN |  |
| 0x0048a92d | calc_demographic_extremes | GL | Demographics | 247 bytes | 0x00480000 | TL |  |
| 0x0048aa24 | check_turn_advisors | UI | Tutorial | 1208 bytes | 0x00480000 | NN |  |
| 0x0048aedc | check_game_end_conditions | GL | GameEnd | 649 bytes | 0x00480000 | PA |  |
| 0x0048b165 | show_victory_screen | GL | GameEnd | 450 bytes | 0x00480000 | NN |  |
| 0x0048b340 | game_loop_singleplayer | UI | GameLoop | 3048 bytes | 0x00480000 | NN |  |
| 0x0048bf2d | crt_destructor_game_loop_1 | FW | FRAMEWORK | 12 bytes | 0x00480000 | SK |  |
| 0x0048bf43 | seh_unwind_game_loop_1 | FW | FRAMEWORK | 14 bytes | 0x00480000 | SK |  |
| 0x0048bf51 | mp_client_poll_handler | NW | MsgHandler | 155 bytes | 0x00480000 | NN |  |
| 0x0048bfec | game_loop_mp_client | NW | ClientLoop | 2530 bytes | 0x00480000 | NN |  |
| 0x0048c9ce | crt_destructor_mp_client | FW | FRAMEWORK | 12 bytes | 0x00480000 | SK |  |
| 0x0048c9e4 | seh_unwind_mp_client | FW | FRAMEWORK | 15 bytes | 0x00480000 | SK |  |
| 0x0048c9f3 | game_loop_mp_server | UI | GameLoop | 3990 bytes | 0x00480000 | NN |  |
| 0x0048d989 | crt_destructor_mp_server | FW | FRAMEWORK | 12 bytes | 0x00480000 | SK |  |
| 0x0048d99f | seh_unwind_mp_server | FW | FRAMEWORK | 14 bytes | 0x00480000 | SK |  |
| 0x0048d9ad | mp_send_turn_signal | NW | TurnSync | 164 bytes | 0x00480000 | NN |  |
| 0x0048da51 | mp_check_client_timeout | NW | TurnSync | 104 bytes | 0x00480000 | NN |  |
| 0x0048dab9 | mp_handle_disconnections | NW | TurnSync | 956 bytes | 0x00480000 | NN |  |
| 0x0048de75 | mp_purge_disconnected_players | NW | TurnSync | 376 bytes | 0x00480000 | NN |  |
| 0x004904c0 | chatwin_thunk_a | NW | Chat | 42 bytes | 0x00490000 | NN |  |
| 0x00490500 | chatwin_thunk_b | NW | Chat | 38 bytes | 0x00490000 | NN |  |
| 0x00490530 | chatwin_thunk_c | NW | Chat | 38 bytes | 0x00490000 | NN |  |
| 0x00490560 | IsTracking | FW | FRAMEWORK | 31 bytes | 0x00490000 | SK |  |
| 0x00490590 | chatwin_init_display | NW | Chat | 365 bytes | 0x00490000 | NN |  |
| 0x004906fd | chatwin_draw_terrain_info | NW | Chat | 5344 bytes | 0x00490000 | NN |  |
| 0x00491c20 | chatwin_select_item | NW | Chat | 321 bytes | 0x00490000 | NN |  |
| 0x00491d61 | chatwin_find_item_index | NW | Chat | 86 bytes | 0x00490000 | NN |  |
| 0x004923c0 | chatwin_invalidate | NW | Chat | 37 bytes | 0x00490000 | NN |  |
| 0x004923f0 | chatwin_handle_command | NW | Chat | 849 bytes | 0x00490000 | NN |  |
| 0x0049275a | chatwin_load_macro_file | NW | Chat | 270 bytes | 0x00490000 | NN |  |
| 0x00492868 | chatwin_macro_cleanup_a | FW | FRAMEWORK | 12 bytes | 0x00490000 | SK |  |
| 0x0049287e | chatwin_macro_seh_restore | FW | FRAMEWORK | 14 bytes | 0x00490000 | SK |  |
| 0x004929c0 | Realloc | FW | FRAMEWORK | 40 bytes | 0x00490000 | SK |  |
| 0x00492a00 | Realloc | FW | FRAMEWORK | 40 bytes | 0x00490000 | SK |  |
| 0x00492a40 | chatwin_file_read | FW | FRAMEWORK | 44 bytes | 0x00490000 | SK |  |
| 0x00492a80 | chatwin_file_get_count | FW | FRAMEWORK | 34 bytes | 0x00490000 | SK |  |
| 0x00492ab0 | chatwin_get_text_length | NW | Chat | 37 bytes | 0x00490000 | NN |  |
| 0x00492ae0 | chatwin_set_text | NW | Chat | 43 bytes | 0x00490000 | NN |  |
| 0x00492b20 | chatwin_set_selection | NW | Chat | 47 bytes | 0x00490000 | NN |  |
| 0x00492b60 | ai_negate_goal_priority | AI | GoalManagement | 181 bytes | 0x00490000 | R |  |
| 0x00492c15 | ai_remove_goals_near | AI | GoalManagement | 259 bytes | 0x00490000 | R |  |
| 0x00492d18 | ai_shift_goals_down_a | AI | GoalManagement | 184 bytes | 0x00490000 | TH |  |
| 0x00492dd0 | ai_shift_goals_down_b | AI | GoalManagement | 144 bytes | 0x00490000 | TH |  |
| 0x00492e60 | ai_find_max_goal_priority | AI | GoalManagement | 443 bytes | 0x00490000 | PA |  |
| 0x0049301b | ai_add_goal_a | AI | GoalManagement | 958 bytes | 0x00490000 | PA |  |
| 0x004933f2 | ai_add_goal_b | AI | GoalManagement | 518 bytes | 0x00490000 | TH |  |
| 0x00493602 | ai_decay_and_merge_goals | AI | GoalManagement | 365 bytes | 0x00490000 | TM |  |
| 0x0049376f | ai_clear_goals_b | AI | GoalManagement | 115 bytes | 0x00490000 | TM |  |
| 0x00493b10 | get_civ_noun_name | GL | CivName | 145 bytes | 0x00490000 | TM |  |
| 0x00493ba6 | get_civ_leader_title | GL | CivName | 210 bytes | 0x00490000 | TM |  |
| 0x00493c7d | get_civ_people_name | GL | CivName | 145 bytes | 0x00490000 | TM |  |
| 0x00493d13 | get_civ_adjective_name | GL | CivName | 145 bytes | 0x00490000 | TM |  |
| 0x00493e50 | intel_play_music | UI | IntelAdvisor | 51 bytes | 0x00490000 | NN |  |
| 0x00493e83 | intel_show_initial | UI | IntelAdvisor | 104 bytes | 0x00490000 | NN |  |
| 0x00493eeb | intel_cleanup_cmdline | FW | FRAMEWORK | 12 bytes | 0x00490000 | SK |  |
| 0x00493f01 | intel_seh_restore_a | FW | FRAMEWORK | 14 bytes | 0x00490000 | SK |  |
| 0x00493f0f | intel_open_advisor | UI | IntelAdvisor | 546 bytes | 0x00490000 | NN |  |
| 0x00494148 | intel_close_advisor | UI | IntelAdvisor | 166 bytes | 0x00490000 | NN |  |
| 0x004941ee | intel_play_animation | UI | IntelAdvisor | 181 bytes | 0x00490000 | NN |  |
| 0x004942a3 | intel_create_object | UI | IntelAdvisor | 200 bytes | 0x00490000 | NN |  |
| 0x004943c9 | intel_destroy_object | UI | IntelAdvisor | 200 bytes | 0x00490000 | NN |  |
| 0x0049444f | intel_dtor_video | UI | IntelAdvisor | 15 bytes | 0x00490000 | NN |  |
| 0x0049445e | intel_dtor_surface | UI | IntelAdvisor | 15 bytes | 0x00490000 | NN |  |
| 0x0049446d | intel_dtor_palette_a | UI | IntelAdvisor | 15 bytes | 0x00490000 | NN |  |
| 0x0049447c | intel_dtor_font | UI | IntelAdvisor | 15 bytes | 0x00490000 | NN |  |
| 0x0049448b | intel_dtor_dialog_a | UI | IntelAdvisor | 15 bytes | 0x00490000 | NN |  |
| 0x0049449a | intel_dtor_dialog_b | UI | IntelAdvisor | 15 bytes | 0x00490000 | NN |  |
| 0x004944ad | intel_seh_restore_b | FW | FRAMEWORK | 14 bytes | 0x00490000 | SK |  |
| 0x004944bb | init_tile | UI | IntelAdvisor | large | 0x00490000 | NN |  |
| 0x00494704 | intel_setup_display | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x004947f0 | intel_teardown_display | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x0049488e | intel_init_tile_sprites | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x004948e6 | intel_init_background | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00494949 | intel_init_main_art | UI | IntelAdvisor | medium | 0x00490000 | NN |  |
| 0x00494b3a | intel_art_cleanup_palette | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00494b50 | intel_art_seh_restore | FW | FRAMEWORK | stub | 0x00490000 | SK |  |
| 0x00494b5f | intel_init_military | UI | IntelAdvisor | large | 0x00490000 | NN |  |
| 0x00494d71 | intel_mil_cleanup_font | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00494d7d | intel_mil_cleanup_palette | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00494d89 | intel_mil_cleanup_string | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00494d9f | intel_mil_seh_restore | FW | FRAMEWORK | stub | 0x00490000 | SK |  |
| 0x00494dae | count_tech_depth | GL | TechTree | small | 0x00490000 | TM |  |
| 0x00494e2a | intel_init_science | UI | IntelAdvisor | 3512 bytes | 0x00490000 | NN |  |
| 0x00495be2 | intel_sci_cleanup_font | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00495bee | intel_sci_cleanup_palette | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00495bfa | intel_sci_cleanup_strings | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00495c10 | intel_sci_cleanup_array | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00495c26 | intel_sci_seh_restore | FW | FRAMEWORK | stub | 0x00490000 | SK |  |
| 0x00495c35 | intel_init_portrait | UI | IntelAdvisor | medium | 0x00490000 | NN |  |
| 0x00495dcf | intel_port_cleanup_font | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00495ddb | intel_port_cleanup_palette | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00495de7 | intel_port_cleanup_string | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00495dfd | intel_port_seh_restore | FW | FRAMEWORK | stub | 0x00490000 | SK |  |
| 0x00495e0c | intel_init_video | UI | IntelAdvisor | large | 0x00490000 | NN |  |
| 0x00496100 | intel_vid_cleanup_palette | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00496116 | intel_vid_seh_restore | FW | FRAMEWORK | stub | 0x00490000 | SK |  |
| 0x00496125 | intel_play_video_frame | UI | IntelAdvisor | medium | 0x00490000 | NN |  |
| 0x0049621d | intel_dialog_ctor | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x0049632a | ~CCommandLineInfo | FW | FRAMEWORK | small | 0x00490000 | SK |  |
| 0x004963a5 | intel_dialog_dtor_timevec | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x004963b4 | intel_dialog_dtor_member_a | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x004963c3 | intel_dialog_dtor_member_b | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x004963d2 | intel_dialog_dtor_font | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x004963e1 | intel_dialog_dtor_dialog | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x004963f4 | intel_dialog_seh_restore | FW | FRAMEWORK | stub | 0x00490000 | SK |  |
| 0x00496402 | intel_create_main_window | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x004964b3 | intel_create_buttons | UI | IntelAdvisor | medium | 0x00490000 | NN |  |
| 0x004965ff | intel_show_results | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x004966c4 | intel_render_grid | UI | IntelAdvisor | 1400 bytes | 0x00490000 | NN |  |
| 0x00496c3c | intel_grid_click | UI | IntelAdvisor | large | 0x00490000 | NN |  |
| 0x00496e5d | intel_grid_dblclick | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x00496ecf | intel_button_handler | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x00497bf0 | intel_delete_object | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00497c40 | intel_set_palette_entries | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00497c90 | intel_get_client_rect | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00497cc0 | intel_set_scroll_info | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00497d00 | intel_set_font_size | UI | IntelAdvisor | stub | 0x00490000 | NN |  |
| 0x00497d40 | intel_create_button | UI | IntelAdvisor | small | 0x00490000 | NN |  |
| 0x00497da0 | read_string_from_file | FI | FILE_IO | small | 0x00490000 | NN |  |
| 0x00497e0f | write_string_to_file | FI | FILE_IO | small | 0x00490000 | NN |  |
| 0x00497ea0 | sound_buf_create | SN | Buffer | medium | 0x00490000 | NN |  |
| 0x00497fa0 | sound_buf_init_external | SN | Buffer | small | 0x00490000 | NN |  |
| 0x00497ff3 | sound_buf_lock | SN | Buffer | small | 0x00490000 | NN |  |
| 0x0049805e | sound_buf_clear_ptrs | SN | Buffer | stub | 0x00490000 | NN |  |
| 0x00498082 | sound_buf_reset_offset | SN | Buffer | stub | 0x00490000 | NN |  |
| 0x004980a9 | sound_buf_unlock | SN | Buffer | small | 0x00490000 | NN |  |
| 0x004980ec | sound_buf_destroy | SN | Buffer | small | 0x00490000 | NN |  |
| 0x00498159 | sound_buf_consume | SN | Buffer | small | 0x00490000 | NN |  |
| 0x00498310 | mp_check_password_or_set | NW | Password | small | 0x00490000 | NN |  |
| 0x0049836a | mp_set_password | NW | Password | large | 0x00490000 | NN |  |
| 0x004985d0 | mp_pwd_cleanup_a | NW | Password | stub | 0x00490000 | NN |  |
| 0x004985e6 | mp_pwd_seh_restore_a | NW | Password | stub | 0x00490000 | NN |  |
| 0x004985f4 | mp_verify_password | NW | Password | medium | 0x00490000 | NN |  |
| 0x0049875f | mp_verify_cleanup | NW | Password | stub | 0x00490000 | NN |  |
| 0x00498775 | mp_verify_seh_restore | NW | Password | stub | 0x00490000 | NN |  |
| 0x00498784 | mp_init_passwords | NW | Password | small | 0x00490000 | NN |  |
| 0x0049882b | mp_update_password_flags | NW | Password | small | 0x00490000 | NN |  |
| 0x004988b8 | mp_encrypt_passwords | NW | Password | small | 0x00490000 | NN |  |
| 0x00498943 | mp_decrypt_passwords | NW | Password | small | 0x00490000 | NN |  |
| 0x004989d3 | mp_prepare_password_dialog | NW | TurnMgmt | small | 0x00490000 | NN |  |
| 0x00498a5c | mp_handle_player_turn | NW | TurnMgmt | small | 0x00490000 | NN |  |
| 0x00498d40 | load_city_preferences | GL | CityPref | medium | 0x00490000 | TM | 1 (city preferences) |
| 0x00498e8b | ai_choose_city_production | AI | Production | 29400 bytes | 0x00490000 | PA | 1 (AI production master) |
| 0x004a2020 | close_text_file | FI | text | 53B | 0x004A0000 | TM | Closes the global text file handle (DAT_0062cd20). Used after reading GAME.TXT / LABELS.TXT secti... |
| 0x004a2055 | open_text_file_section | FI | text | 789B | 0x004A0000 | TM | Core text file parser. Opens a .TXT file and seeks to an @SECTION header. Tries game dir then alt... |
| 0x004a2379 | open_text_file_section_fallback | FI | text | 131B | 0x004A0000 | TM | Wrapper that retries with swapped directories if first attempt fails. |
| 0x004a23fc | read_next_line | FI | text | 171B | 0x004A0000 | TM | Reads next line, optionally strips comments. Sets global tokenPtr for subsequent token parsing. |
| 0x004a24b1 | parse_next_token | FI | text | 131B | 0x004A0000 | TM | Extracts next comma-delimited token from current line. DAT_00673e10 = 256-byte token buffer. |
| 0x004a2534 | parse_and_discard_token | FI | text | 30B | 0x004A0000 | TM | Skips one comma-delimited field without using the value. |
| 0x004a2552 | skip_to_end_of_line | FI | text | 40B | 0x004A0000 | TM | Advances tokenPtr to end of current line, effectively skipping all remaining tokens. |
| 0x004a257a | read_line_as_int | FI | text | 48B | 0x004A0000 | TM | Reads next line and parses entire line as integer. |
| 0x004a25aa | parse_token_as_int | FI | text | 43B | 0x004A0000 | TM | Parses next comma-delimited token as integer. |
| 0x004a25d5 | parse_token_as_binary | FI | text | 112B | 0x004A0000 | TM | Parses a binary string like "01101001" into an integer. Used for RULES.TXT bitmask fields. |
| 0x004a2645 | open_file_skip_lines | FI | text | 117B | 0x004A0000 | TM | Opens a text file, seeks to section, skips N lines, then closes. Used for reading specific offset... |
| 0x004a26bf | parse_token_and_alloc_string | FI | text | 47B | 0x004A0000 | TM | Parses next token and allocates a string copy (via string table lookup FUN_00428b68). |
| 0x004a28b0 | calc_civ_score | GL | score | 1542B | 0x004A0000 | TH | MAXIMUM DEPTH. Comprehensive score formula. The Alpha Centauri branch is a scenario-specific rela... |
| 0x004a3060 | load_rules_to_editor | UI | editor | 966B | 0x004A0000 | NN | Populates editor arrays (DAT_006a1d88, DAT_006a1b98, DAT_006a1cd8, DAT_006a2d28) from game rules ... |
| 0x004a3426 | save_editor_to_rules | UI | editor | 538B | 0x004A0000 | NN | Writes editor changes back to in-memory rules data. |
| 0x004a3640 | update_editor_controls_from_game | UI | editor | 269B | 0x004A0000 | NN | Syncs MFC dialog controls with current editor data. |
| 0x004a3757 | update_game_from_editor_controls | UI | editor | 296B | 0x004A0000 | NN | Reads MFC dialog control values back into editor arrays. |
| 0x004a3889 | refresh_editor_display | UI | editor | 27B | 0x004A0000 | NN | Thin wrapper calling paint_editor_screen. |
| 0x004a38a4 | write_govt_rules_to_file | UI | editor | 381B | 0x004A0000 | NN | Writes @GOVERNMENTS section to RULES.TXT during scenario save. |
| 0x004a3a21 | write_leader_rules_to_file | UI | editor | 1975B | 0x004A0000 | NN | Writes @LEADERS section. Merges editor changes with template line format. |
| 0x004a41d8 | write_commodity_rules_to_file | UI | editor | 113B | 0x004A0000 | NN | Writes @CARAVAN section to RULES.TXT. |
| 0x004a4249 | show_messagebox_4249 | UI | editor | 187B | 0x004A0000 | NN | "OK" button handler for scenario editor — saves all rule changes. |
| 0x004a4304 | edit_commodity_names_dialog | UI | editor | 414B | 0x004A0000 | NN | MFC dialog for renaming trade commodities. Uses CSocket::Create for dialog init (Ghidra misidenti... |
| 0x004a44a2 | FUN_004a44a2 | FW | SEH | 12B | 0x004A0000 | SK |  |
| 0x004a44b8 | FUN_004a44b8 | FW | SEH | 14B | 0x004A0000 | SK |  |
| 0x004a44c6 | edit_govt_names_dialog | UI | editor | 417B | 0x004A0000 | NN | Same pattern as commodity dialog but for government names. |
| 0x004a4667 | FUN_004a4667 | FW | SEH | 12B | 0x004A0000 | SK |  |
| 0x004a467d | FUN_004a467d | FW | SEH | 14B | 0x004A0000 | SK |  |
| 0x004a468b | show_title_screen | UI | editor | 701B | 0x004A0000 | NN | Editor dialog for renaming government leader titles (e.g., "President", "Queen"). |
| 0x004a4948 | FUN_004a4948 | FW | SEH | 12B | 0x004A0000 | SK |  |
| 0x004a495e | FUN_004a495e | FW | SEH | 14B | 0x004A0000 | SK |  |
| 0x004a496c | edit_tribes_dialog | UI | editor | 95B | 0x004A0000 | NN | Opens tribes customization dialog. |
| 0x004a49cb | invalidate_editor | UI | editor | 40B | 0x004A0000 | NN | Marks editor as clean and forces window repaint. |
| 0x004a49f3 | handle_editor_button | UI | editor | 101B | 0x004A0000 | NN |  |
| 0x004a4a58 | create_editor_dropdown | UI | editor | 1084B | 0x004A0000 | NN | Creates dropdown combo boxes for the scenario editor property pages. |
| 0x004a4eb2 | create_editor_textfield | UI | editor | 215B | 0x004A0000 | NN |  |
| 0x004a4f89 | paint_editor_screen | UI | editor | 1360B | 0x004A0000 | NN | Custom paint handler for the scenario editor main panel. Draws civ flag, city style, and labels. |
| 0x004a54d9 | open_scenario_editor | UI | editor | 2171B | 0x004A0000 | NN | Main scenario editor entry point. Creates a complex property sheet dialog with tribe/leader editing. |
| 0x004a5d6e | destroy_scenario_editor | FW | SEH | 12B | 0x004A0000 | SK |  |
| 0x004a5d84 | FUN_004a5d84 | FW | SEH | 14B | 0x004A0000 | SK |  |
| 0x004a5d92 | show_scenario_editor | UI | editor | 89B | 0x004A0000 | NN | Top-level entry for the scenario editor. Manages palette swap and delegates to open_scenario_editor. |
| 0x004a5deb | destroy_bitmap_wrapper | FW | UI | 12B | 0x004A0000 | SK |  |
| 0x004a5e01 | FUN_004a5e01 | FW | SEH | 14B | 0x004A0000 | SK |  |
| 0x004a6980 | FUN_004a6980 | FW | UI | 34B | 0x004A0000 | SK | Returns font metrics for layout calculations. |
| 0x004a69b0 | init_editor_scrollbar | UI | help | 365B | 0x004A0000 | NN | Initializes a scrollbar for the civilopedia/help listbox with 9-item pages. DAT_006a85a4 is a mod... |
| 0x004a6b80 | show_tech_help | UI | help | 92B | 0x004A0000 | NN | Displays civilopedia entry for a technology advance. |
| 0x004a6bdc | show_improvement_help | UI | help | 111B | 0x004A0000 | NN |  |
| 0x004a6c4b | show_terrain_help | UI | help | 58B | 0x004A0000 | NN |  |
| 0x004a6c85 | draw_city_sprite_in_help | UI | help | 64B | 0x004A0000 | NN |  |
| 0x004a6cc5 | show_city_style_picker | UI | help | 260B | 0x004A0000 | NN | Picker dialog for selecting city architectural style (4 styles). |
| 0x004a6dc9 | destroy_city_picker | FW | SEH | 9B | 0x004A0000 | SK |  |
| 0x004a6dd2 | FUN_004a6dd2 | FW | SEH | 12B | 0x004A0000 | SK |  |
| 0x004a6de8 | FUN_004a6de8 | FW | SEH | 15B | 0x004A0000 | SK |  |
| 0x004a6df7 | draw_unit_sprite_in_help | UI | help | 66B | 0x004A0000 | NN |  |
| 0x004a6e39 | show_unit_type_picker | UI | help | 260B | 0x004A0000 | NN |  |
| 0x004a6f3d | destroy_unit_picker | FW | SEH | 9B | 0x004A0000 | SK |  |
| 0x004a6f46 | FUN_004a6f46 | FW | SEH | 12B | 0x004A0000 | SK |  |
| 0x004a6f5c | FUN_004a6f5c | FW | SEH | 15B | 0x004A0000 | SK |  |
| 0x004a7070 | toupper_ascii | FW | string | 43B | 0x004A0000 | SK | Manual ASCII uppercase (avoids locale issues). Only handles a-z. |
| 0x004a70b0 | init_game_options | GL | init | 267B | 0x004A0000 | TL | Sets CIV2.DAT game options to factory defaults. DAT_0064bc10-0064bc56 is the options block (72 by... |
| 0x004a71bb | init_multiplayer_state | GL | init | 386B | 0x004A0000 | TL | Initializes multiplayer/network state block (0x1BC bytes at DAT_00666538). Used when creating a n... |
| 0x004a733d | load_civ2_dat | GL | init | 156B | 0x004A0000 | TL | Loads persistent game options and multiplayer settings from CIV2.DAT. Falls back to defaults on f... |
| 0x004a73d9 | save_civ2_dat | GL | init | 212B | 0x004A0000 | TL |  |
| 0x004a74bc | reset_spaceship | GL | space | 187B | 0x004A0000 | TM | Clears all spaceship data for a civ. 0x594 stride = per-civ data block size. |
| 0x004a7577 | has_spaceship_launched | GL | space | 47B | 0x004A0000 | TM |  |
| 0x004a75a6 | has_spaceship_built | GL | space | 47B | 0x004A0000 | TM |  |
| 0x004a75d5 | is_spaceship_arriving | GL | space | 88B | 0x004A0000 | TM | Checks if spaceship has arrived at Alpha Centauri (turn >= arrival turn). |
| 0x004a762d | destroy_spaceship | GL | space | 200B | 0x004A0000 | TM | Handles spaceship destruction with appropriate sound and message. |
| 0x004a76f5 | reset_kill_history | GL | civ | 95B | 0x004A0000 | TL | Clears the 12-entry kill history table (civs destroyed during game). DAT_00655128 = count, +2 = t... |
| 0x004a7754 | assign_initial_settler_positions | GL | civ | 1408B | 0x004A0000 | TH | Position balancing algorithm. Evaluates starting locations by terrain quality, continent size, an... |
| 0x004a7ce9 | new_civ | GL | civ | 5834B | 0x004A0000 | TH | MAXIMUM DEPTH. Master civ creation function. Handles initial setup (turn 0) and respawn (killed c... |
| 0x004a93b3 | expand_city_territory | GL | civ | 953B | 0x004A0000 | TH | Called when a city is founded or grows. Expands territory by claiming the best unowned tile in th... |
| 0x004a9785 | setup_scenario_start | GL | civ | 3059B | 0x004A0000 | TH | MAXIMUM DEPTH. Sets up a scenario start state for a given historical era. Creates cities, grants ... |
| 0x004aa378 | kill_civ | GL | civ | 1608B | 0x004A0000 | TH | MAXIMUM DEPTH. Handles full civ death: checks no cities remain, records kill history, disbands un... |
| 0x004aa9c0 | init_new_game | GL | civ | 1345B | 0x004A0000 | TH | MAXIMUM DEPTH. Master new-game initialization. Resets all global state, spawns 8 civs, balances s... |
| 0x004abea0 | direction_from_delta | GL | path | 325B | 0x004A0000 | TM | Converts an (x,y) delta to a direction index (0-7). Returns 8 if no match. |
| 0x004abfe5 | find_path | GL | path | 4118B | 0x004A0000 | TH | MAXIMUM DEPTH. Core BFS pathfinder. Uses a circular queue (size 2304). Cost grid is 48x48 tiles c... |
| 0x004ad01e | get_path_cost | GL | path | 88B | 0x004A0000 | TM | Reads BFS cost from the 48x48 cost grid. Coordinate transform from iso to grid space. |
| 0x004ad076 | set_path_cost | GL | path | 91B | 0x004A0000 | TM |  |
| 0x004ad0d1 | calc_path_distance | GL | path | 318B | 0x004A0000 | TM | Wrapper that calculates actual path cost between two points using BFS. Used for distance comparis... |
| 0x004ad20f | find_road_path | GL | path | 1392B | 0x004A0000 | TH | Road-network pathfinder. Uses precomputed connectivity maps (one for land, one for sea) to find p... |
| 0x004ad784 | find_adjacent_terrain_type | GL | path | 158B | 0x004A0000 | TM | Finds a nearby tile matching the target terrain type (ocean or land). Used by road pathfinder to ... |
| 0x004ad822 | find_nearest_road_tile | GL | path | 730B | 0x004A0000 | TM | Finds the nearest tile on the road/rail connectivity network from a given position. Searches curr... |
| 0x004adafc | calc_unit_goto_direction | GL | path | 2516B | 0x004A0000 | TH | MAXIMUM DEPTH. High-level movement director for goto orders. Three-tier approach: (1) direct BFS ... |
| 0x004aee90 | get_land_connectivity | GL | path | 36B | 0x004A0000 | TM | Returns pointer to land connectivity byte for grid cell (x,y). DAT_006365e0 = base, DAT_006d116a ... |
| 0x004aeec0 | get_sea_connectivity | GL | path | 36B | 0x004A0000 | TM | Same as land connectivity but for sea routes. DAT_006365e4 = base. |
| 0x004aeef0 | get_bfs_visited | GL | path | 36B | 0x004A0000 | TM | Returns pointer to BFS visited byte. DAT_006365e8 = base. |
| 0x004aef20 | clear_string | FW | string | 22B | 0x004A0000 | TL |  |
| 0x004aef36 | append_separator_1 | FW | string | 33B | 0x004A0000 | TL | Each append_separator_N appends a different predefined separator string (comma, space, newline, e... |
| 0x004aef57 | append_separators | FW | string | 63B | 0x004A0000 | TL |  |
| 0x004aef96 | append_separator_2 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004aefb7 | append_separator_3 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004aefd8 | append_separator_4 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004aeff9 | append_separator_5 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af01a | append_separator_6 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af03b | append_separator_7 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af05c | append_separator_8 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af07d | append_separator_9 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af09e | append_separator_10 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af0bf | append_separator_11 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af0e0 | append_separator_12 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af101 | append_separator_13 | FW | string | 33B | 0x004A0000 | TL |  |
| 0x004af122 | append_string_by_id | FW | string | 41B | 0x004A0000 | TL |  |
| 0x004af14b | append_label_string | FW | string | 41B | 0x004A0000 | TL | DAT_00628420 = label string table base. |
| 0x004af174 | append_raw_string | FW | string | 32B | 0x004A0000 | TL |  |
| 0x004af194 | append_highlighted_string | FW | string | 65B | 0x004A0000 | TL | Wraps a string in highlight control codes for rich text display. |
| 0x004af1d5 | append_int | FW | string | 53B | 0x004A0000 | TL |  |
| 0x004af20a | append_binary_byte | FW | string | 122B | 0x004A0000 | TL | Formats a byte as 8-digit binary string (e.g., "01101001"). Used for RULES.TXT bitmask fields. |
| 0x004af284 | append_long | FW | string | 53B | 0x004A0000 | TL |  |
| 0x004af2b9 | append_gold_amount | FW | string | 50B | 0x004A0000 | TL | Formats a gold amount like "150 Gold" using localized strings. |
| 0x004af3e0 | create_civ_listbox | UI | listbox | 1123B | 0x004A0000 | NN | Creates a civ selection listbox with scrollbar for diplomacy/trade dialogs. Filters by diplomatic... |
| 0x004af867 | scroll_listbox_up | UI | listbox | 30B | 0x004A0000 | NN |  |
| 0x004af885 | scroll_listbox_down | UI | listbox | 30B | 0x004A0000 | NN |  |
| 0x004af8a3 | scroll_civ_listbox | UI | listbox | 97B | 0x004A0000 | NN |  |
| 0x004af904 | handle_listbox_click | UI | listbox | 627B | 0x004A0000 | NN | Handles mouse clicks on the civ listbox. Supports single-click, ctrl-click (toggle), and shift-cl... |
| 0x004afb77 | hit_test_listbox | UI | listbox | 274B | 0x004A0000 | NN |  |
| 0x004afc89 | paint_civ_listbox | UI | listbox | 1230B | 0x004A0000 | NN | Custom-painted civ selection listbox with civ icons, leader names, and selection highlighting. |
| 0x004b0157 | draw_best_city_sprite | UI | render | 484B | 0x004B0000 | NN | Renders city sprite in diplomacy/advisor screens. Pure rendering. |
| 0x004b0720 | lookup_tech_by_name | GL | lookup | 177B | 0x004B0000 | NN | String lookup for scenario/rules parsing. Not needed for engine. |
| 0x004b07d1 | lookup_terrain_by_name | GL | lookup | 167B | 0x004B0000 | NN |  |
| 0x004b08e0 | _crt_init_E2 | UNSET |  | 21B | 0x004B0000 |  | Calls _E1 |
| 0x004b08f5 | _crt_init_E1 | UNSET |  | 10B | 0x004B0000 |  | No-op return |
| 0x004b0905 | diff_engine_alloc_mirror | NW | diff | 261B | 0x004B0000 | NN |  |
| 0x004b0a0a | diff_engine_free_mirror | NW | diff | 55B | 0x004B0000 | NN |  |
| 0x004b0a41 | diff_engine_copy_sections | NW | diff | 99B | 0x004B0000 | NN |  |
| 0x004b0ad0 | diff_engine_invert_mirror | NW | diff | 131B | 0x004B0000 | NN |  |
| 0x004b0b53 | diff_engine_scan_and_send | NW | diff | 1888B | 0x004B0000 | NN | xlarge function (1888B). This is the core multiplayer synchronization engine. Not needed for our ... |
| 0x004b12b3 | diff_engine_check_section_changed | NW | diff | 227B | 0x004B0000 | NN |  |
| 0x004b1396 | diff_engine_checksum | NW | diff | 270B | 0x004B0000 | NN |  |
| 0x004b14a4 | diff_engine_calc_total_size | NW | diff | 152B | 0x004B0000 | NN | Maps section indices to game data sizes. Key layout information. |
| 0x004b153c | diff_engine_serialize_game | NW | diff | 835B | 0x004B0000 | NN |  |
| 0x004b187f | diff_engine_append_data | NW | diff | 98B | 0x004B0000 | NN |  |
| 0x004b18e1 | diff_engine_serialize_partial | NW | diff | 308B | 0x004B0000 | NN | Serializes 2 sections (units + extra). Same pattern as full serialize. |
| 0x004b1a15 | diff_engine_serialize_full_compressed | NW | diff | 508B | 0x004B0000 | NN | Full state serialization with RLE compression. Returns compressed size. |
| 0x004b1c11 | diff_engine_serialize_changed_only | NW | diff | 466B | 0x004B0000 | NN | Serializes only changed sections (delta sync). |
| 0x004b1de3 | diff_engine_deserialize | NW | diff | 563B | 0x004B0000 | NN |  |
| 0x004b2010 | parse_save_block | NW | diff | 275B | 0x004B0000 | NN |  |
| 0x004b2123 | diff_engine_read_section_node | NW | diff | 180B | 0x004B0000 | NN | Reads 0x14-byte section header, copies data into game structures. |
| 0x004b21d7 | diff_engine_init_sections | NW | diff | 715B | 0x004B0000 | R | This is the authoritative mapping of runtime memory layout for save/load and network sync. Refere... |
| 0x004b24a2 | rle_calc_decoded_size | NW | compression | 120B | 0x004B0000 | NN |  |
| 0x004b251a | rle_decode | NW | compression | 292B | 0x004B0000 | NN |  |
| 0x004b263e | rle_encode | NW | compression | 568B | 0x004B0000 | NN |  |
| 0x004b3080 | diff_engine_register_section | NW | diff | 42B | 0x004B0000 | NN |  |
| 0x004b3110 | continent_set_adjacency_bit | GL | map | 76B | 0x004B0000 | TL |  |
| 0x004b315c | continent_calc_adjacency | GL | map | 418B | 0x004B0000 | TL |  |
| 0x004b32fe | continent_assign_body_ids | GL | map | 1853B | 0x004B0000 | TH |  |
| 0x004b3ca0 | static_init_obj_a | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3cba | static_init_obj_a_ctor | UNSET |  | 32B | 0x004B0000 |  | FUN_0043c4c0(0,0x10,1) |
| 0x004b3cda | static_init_obj_a_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b3cf7 | static_init_obj_a_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b3d11 | static_init_obj_b | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3d2b | static_init_obj_b_ctor | UNSET |  | 30B | 0x004B0000 |  | FUN_0043c460(0,0x14) |
| 0x004b3d49 | static_init_obj_b_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b3d66 | static_init_obj_b_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b3d80 | static_init_obj_c | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3d9a | static_init_obj_c_ctor | UNSET |  | 30B | 0x004B0000 |  | FUN_0043c460(0,0x0E) |
| 0x004b3db8 | static_init_obj_c_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b3dd5 | static_init_obj_c_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b3def | static_init_obj_d | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3e09 | static_init_obj_d_ctor | UNSET |  | 30B | 0x004B0000 |  | FUN_0043c460(0,0x10) |
| 0x004b3e27 | static_init_obj_d_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b3e44 | static_init_obj_d_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b3e5e | static_init_obj_e | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3e78 | static_init_obj_e_ctor | UNSET |  | 32B | 0x004B0000 |  | FUN_0043c4c0(0,0x18,1) |
| 0x004b3e98 | static_init_obj_e_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b3eb5 | static_init_obj_e_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b3ecf | static_init_obj_f | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3ee9 | static_init_obj_f_ctor | UNSET |  | 30B | 0x004B0000 |  | FUN_0043c460(0,0x1E) |
| 0x004b3f07 | static_init_obj_f_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b3f24 | static_init_obj_f_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b3f3e | static_init_obj_g | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3f58 | static_init_obj_g_ctor | UNSET |  | 30B | 0x004B0000 |  | FUN_0043c460(0,0x15) |
| 0x004b3f76 | static_init_obj_g_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b3f93 | static_init_obj_g_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b3fad | static_init_obj_h | UNSET |  | 26B | 0x004B0000 |  | Calls ctor + atexit |
| 0x004b3fc7 | static_init_obj_h_ctor | UNSET |  | 30B | 0x004B0000 |  | FUN_0043c460(0,0x18) |
| 0x004b3fe5 | static_init_obj_h_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit(dtor) |
| 0x004b4002 | static_init_obj_h_dtor | UNSET |  | 26B | 0x004B0000 |  | FUN_0043c520 |
| 0x004b401c | static_init_parleywin_a | UNSET |  | 26B | 0x004B0000 |  | Init DAT_006665da |
| 0x004b4036 | static_init_parleywin_a_ctor | UNSET |  | 37B | 0x004B0000 |  | Calls parleywin_construct |
| 0x004b405b | static_init_parleywin_a_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit |
| 0x004b4078 | static_init_parleywin_a_dtor | UNSET |  | 26B | 0x004B0000 |  | Calls parleywin_destruct |
| 0x004b4092 | static_init_parleywin_b | UNSET |  | 26B | 0x004B0000 |  | Init DAT_006665ea |
| 0x004b40ac | static_init_parleywin_b_ctor | UNSET |  | 37B | 0x004B0000 |  | Calls parleywin_construct |
| 0x004b40d1 | static_init_parleywin_b_atexit | UNSET |  | 29B | 0x004B0000 |  | _atexit |
| 0x004b40ee | static_init_parleywin_b_dtor | UNSET |  | 26B | 0x004B0000 |  | Calls parleywin_destruct |
| 0x004b4108 | parleywin_construct | UI | diplomacy | 1163B | 0x004B0000 | NN | Pure Win32/MFC UI construction. Not needed. |
| 0x004b4593 | parleywin_destruct | UI | diplomacy | 352B | 0x004B0000 | NN | Saves chat log to `chatlog.txt` if MP chat mode. Frees chat buffers. |
| 0x004b4705 | parleywin_close_file | UNSET |  | 12B | 0x004B0000 |  | Thunk to FUN_005d7c6e |
| 0x004b4711 | parleywin_cleanup_base | UNSET |  | 22B | 0x004B0000 |  | Thunk to FUN_0044cba0 |
| 0x004b4727 | parleywin_seh_unwind_a | UNSET |  | 14B | 0x004B0000 |  | SEH epilogue |
| 0x004b4735 | parleywin_open | UI | diplomacy | 1198B | 0x004B0000 | NN | Opens diplomacy window. Mode 4 = MP chat (reads ChatShowSize from CIV.INI). Creates child control... |
| 0x004b4be3 | parleywin_close_file_2 | UNSET |  | 22B | 0x004B0000 |  | Thunk |
| 0x004b4bf9 | parleywin_seh_unwind_b | UNSET |  | 16B | 0x004B0000 |  | SEH epilogue |
| 0x004b4c09 | parleywin_save_position | UI | diplomacy | 56B | 0x004B0000 | NN |  |
| 0x004b4c81 | parleywin_set_resolution | UI | diplomacy | 43B | 0x004B0000 | NN |  |
| 0x004b4cf0 | parleywin_calc_layout | UI | diplomacy | 410B | 0x004B0000 | NN |  |
| 0x004b4e8a | parleywin_calc_client_rects | UI | diplomacy | 296B | 0x004B0000 | NN |  |
| 0x004b4fb2 | parleywin_update_scrollbars | UI | diplomacy | 285B | 0x004B0000 | NN |  |
| 0x004b50cf | parleywin_free_controls | UI | diplomacy | 1476B | 0x004B0000 | NN |  |
| 0x004b5c93 | parleywin_create_controls | UI | diplomacy | 6241B | 0x004B0000 | NN | Creates all child controls for diplomacy window (leader portraits, treaty buttons, chat area). |
| 0x004b74c4 | parleywin_button_handler | UI | diplomacy | 311B | 0x004B0000 | NN |  |
| 0x004b75fb | parleywin_ok_clicked | UI | diplomacy | 74B | 0x004B0000 | NN |  |
| 0x004b7645 | parleywin_activate_negotiation | UI | diplomacy | 70B | 0x004B0000 | NN |  |
| 0x004b768d | parleywin_activate_mp_chat | UI | diplomacy | 72B | 0x004B0000 | NN |  |
| 0x004b76d5 | parleywin_close | UI | diplomacy | 432B | 0x004B0000 | NN | Handles pending negotiation results on close. Sends network message 0x81 (diplomacy cancel). |
| 0x004b7885 | parleywin_repaint | UI | diplomacy | 197B | 0x004B0000 | NN |  |
| 0x004b794a | parleywin_paint_decorations | UI | diplomacy | 838B | 0x004B0000 | NN |  |
| 0x004b7c90 | parleywin_draw_border_bitmap | UI | diplomacy | 130B | 0x004B0000 | NN |  |
| 0x004b7d72 | parleywin_build_title | UI | diplomacy | 324B | 0x004B0000 | NN |  |
| 0x004b7eb6 | parleywin_start_session | UI | diplomacy | 807B | 0x004B0000 | TL | The session-start logic for determining which civs can be contacted could inform our diplomacy AI... |
| 0x004b81dd | parley_handle_response | UI | diplomacy | 1177B | 0x004B0000 | TL | The response handling logic maps to our `engine/ai/diplomai.js` protocol concepts. Low priority —... |
| 0x004b8676 | parley_set_negotiation_state | UI | diplomacy | 536B | 0x004B0000 | NN | State machine for diplomacy negotiation UI. Pure UI. |
| 0x004b888e | parley_cleanup_side_controls | UI | diplomacy | 1038B | 0x004B0000 | NN |  |
| 0x004b8e5c | parley_validate_gold_input | UI | diplomacy | 593B | 0x004B0000 | NN |  |
| 0x004b90ad | parley_send_chat_message | UI | diplomacy | 757B | 0x004B0000 | NN | Builds chat message with civ name + turn number, sends via network message 0x68. We handle chat d... |
| 0x004b93a2 | parley_append_chat_text | UI | diplomacy | 354B | 0x004B0000 | NN |  |
| 0x004b9504 | parley_format_civ_name | UI | diplomacy | 122B | 0x004B0000 | NN |  |
| 0x004b957e | parley_handle_keydown | UI | diplomacy | 68B | 0x004B0000 | NN |  |
| 0x004b95c2 | parley_handle_submit | UI | diplomacy | 31B | 0x004B0000 | NN |  |
| 0x004b95e1 | parley_clear_chat | UI | diplomacy | 84B | 0x004B0000 | NN |  |
| 0x004b9635 | parley_handle_escape | UI | diplomacy | 85B | 0x004B0000 | NN |  |
| 0x004b968a | parley_handle_command | UI | diplomacy | 1510B | 0x004B0000 | NN | Command handler for chat/diplomacy window. Pure UI event handling. |
| 0x004bb370 | widget_read_file | FW | IO | 12B | 0x004B0000 | SK |  |
| 0x004bb3b0 | widget_dtor_button | FW | UI | 46B | 0x004B0000 | SK |  |
| 0x004bb400 | widget_dtor_editbox | FW | UI | 46B | 0x004B0000 | SK |  |
| 0x004bb450 | widget_dtor_label | FW | UI | 46B | 0x004B0000 | SK |  |
| 0x004bb4a0 | widget_dtor_scrollbar | FW | UI | 46B | 0x004B0000 | SK |  |
| 0x004bb4f0 | widget_dtor_checkbox | FW | UI | 46B | 0x004B0000 | SK |  |
| 0x004bb540 | widget_get_height | FW | UI | 12B | 0x004B0000 | SK |  |
| 0x004bb570 | widget_move_window | FW | UI | 30B | 0x004B0000 | SK |  |
| 0x004bb5b0 | widget_set_readonly | FW | UI | 24B | 0x004B0000 | SK |  |
| 0x004bb5e0 | widget_set_focus | FW | UI | 28B | 0x004B0000 | SK |  |
| 0x004bb620 | widget_create_editbox | FW | UI | 176B | 0x004B0000 | SK |  |
| 0x004bb6d0 | widget_set_caret_pos | FW | UI | 28B | 0x004B0000 | SK |  |
| 0x004bb710 | widget_get_text_len | FW | UI | 24B | 0x004B0000 | SK |  |
| 0x004bb740 | scrollbar_dtor | FW | UI | 60B | 0x004B0000 | SK |  |
| 0x004bb7b0 | scrollbar_dtor_base | FW | UI | 12B | 0x004B0000 | SK |  |
| 0x004bb7c3 | scrollbar_seh_unwind | FW | SEH | 14B | 0x004B0000 | SK |  |
| 0x004bb800 | rect_deflate | FW | UI | 30B | 0x004B0000 | SK |  |
| 0x004bb840 | rect_inflate | FW | UI | 24B | 0x004B0000 | SK |  |
| 0x004bb870 | alloc_global_handle | FW | MEM | 42B | 0x004B0000 | SK |  |
| 0x004bb8e0 | wonder_view_init | UI | wonder | 155B | 0x004B0000 | NN |  |
| 0x004bb97b | wonder_view_cleanup | FW | UI | 22B | 0x004B0000 | SK |  |
| 0x004bb991 | wonder_view_seh_unwind | FW | SEH | 14B | 0x004B0000 | SK |  |
| 0x004bb99f | wonder_view_construct | UI | wonder | 218B | 0x004B0000 | NN |  |
| 0x004bba79 | wonder_view_destruct | UI | wonder | 120B | 0x004B0000 | NN |  |
| 0x004bbaf1 | wonder_view_destroy_sub3 | FW | UI | 15B | 0x004B0000 | SK |  |
| 0x004bbb00 | wonder_view_destroy_sub2 | FW | UI | 15B | 0x004B0000 | SK |  |
| 0x004bbb0f | wonder_view_destroy_sub1 | FW | UI | 15B | 0x004B0000 | SK |  |
| 0x004bbb1e | wonder_view_destroy_frame | FW | UI | 19B | 0x004B0000 | SK |  |
| 0x004bbb31 | wonder_view_seh_unwind_2 | FW | SEH | 14B | 0x004B0000 | SK |  |
| 0x004bbb3f | load_civ2_art_004bbb3f | UI | wonder | 638B | 0x004B0000 | NN | Loads wonder artwork from `civ2.wonder.dll`. Extracts GIF resource (param + 20000, 10 frames). No... |
| 0x004bbdbd | wonder_art_cleanup_path | FW | UI | 12B | 0x004B0000 | SK |  |
| 0x004bbdc9 | wonder_art_cleanup_surface | FW | UI | 12B | 0x004B0000 | SK |  |
| 0x004bbdd5 | wonder_art_cleanup_render | FW | UI | 22B | 0x004B0000 | SK |  |
| 0x004bbdeb | wonder_art_seh_unwind | FW | SEH | 16B | 0x004B0000 | SK |  |
| 0x004bbdfb | wonder_view_play_video | UI | wonder | 704B | 0x004B0000 | NN | Plays `civ2.video.wonder##.avi`. AVI player with VFW callbacks. |
| 0x004bc0bb | wonder_view_return_zero | FW | UI | 24B | 0x004B0000 | SK |  |
| 0x004bc0d3 | wonder_view_refresh_surface | UI | wonder | 60B | 0x004B0000 | NN |  |
| 0x004bc10f | wonder_view_resize | UI | wonder | 132B | 0x004B0000 | NN |  |
| 0x004bc193 | wonder_view_invalidate_a | FW | UI | 30B | 0x004B0000 | SK |  |
| 0x004bc1b1 | wonder_view_invalidate_b | FW | UI | 30B | 0x004B0000 | SK |  |
| 0x004bc1cf | wonder_view_invalidate_range | FW | UI | 80B | 0x004B0000 | SK |  |
| 0x004bc480 | ai_assess_military_posture | AI | assessment | 1066B | 0x004B0000 | P |  |
| 0x004bc8aa | ai_assess_city_defense | AI | assessment | 753B | 0x004B0000 | P |  |
| 0x004bcb9b | ai_assess_economy | AI | assessment | 1071B | 0x004B0000 | P |  |
| 0x004bcfcf | ai_assess_diplomacy | AI | assessment | 724B | 0x004B0000 | P |  |
| 0x004bd2a3 | ai_assess_tax_rate | AI | assessment | 770B | 0x004B0000 | P |  |
| 0x004bd9f0 | civ_has_tech | AI | utility | 181B | 0x004B0000 | P |  |
| 0x004bdaa5 | tech_is_descendant_of | AI | utility | 135B | 0x004B0000 | P |  |
| 0x004bdb2c | ai_calc_tech_value | GL | tech | 2869B | 0x004B0000 | PA |  |
| 0x004be6ba | upgrade_units_for_tech | GL | tech | 970B | 0x004B0000 | TM |  |
| 0x004bea84 | handle_tech_government_effects | GL | tech | 973B | 0x004B0000 | TM |  |
| 0x004bee56 | we_love_the_king_day | GL | event | 379B | 0x004B0000 | TM |  |
| 0x004befd1 | format_enabled_item | GL | tech | 138B | 0x004B0000 | NN | Pure UI formatting for tech discovery screen. Not needed for game engine. |
| 0x004bf05b | handle_tech_discovery | GL | tech | 3391B | 0x004B0000 | PA |  |
| 0x004bfd9a | tech_discovery_cleanup | UNSET |  | 12B | 0x004B0000 |  | Thunk to FUN_0059df8a |
| 0x004bfdb0 | tech_discovery_seh_unwind | UNSET |  | 14B | 0x004B0000 |  | SEH epilogue |
| 0x004bfdbe | can_research_tech | GL | tech | 156B | 0x004B0000 | P |  |
| 0x004bfe5a | can_build_unit_type | GL | tech | 1095B | 0x004B0000 | TH |  |
| 0x004c02d8 | can_build_wonder | GL | build_prereq | 199b | 0x004C0000 | TH |  |
| 0x004c03ae | can_build_improvement | GL | build_prereq | 1383b | 0x004C0000 | TH |  |
| 0x004c09b0 | ai_pick_research_goal | GL | research | 417b | 0x004C0000 | P |  |
| 0x004c0b51 | blit_tech_icon_normal | UI | research | 151b | 0x004C0000 | SK |  |
| 0x004c0be8 | blit_tech_icon_scaled | UI | research | 155b | 0x004C0000 | SK |  |
| 0x004c0c83 | blit_tech_icon_alt | UI | research | 116b | 0x004C0000 | SK |  |
| 0x004c0cf7 | show_research_goal_dialog | UI | research | 3119b | 0x004C0000 | SK |  |
| 0x004c193a | FUN_004c193a | FW | seh_crt | 12 | 0x004C0000 | SK |  |
| 0x004c1950 | FUN_004c1950 | UNSET |  | 14 | 0x004C0000 |  |  |
| 0x004c195e | choose_research_tech | UI | research | 2078b | 0x004C0000 | SK |  |
| 0x004c217c | FUN_004c217c | UNSET |  | 12 | 0x004C0000 |  |  |
| 0x004c2188 | FUN_004c2188 | UNSET |  | 12 | 0x004C0000 |  |  |
| 0x004c219e | FUN_004c219e | UNSET |  | 15 | 0x004C0000 |  |  |
| 0x004c21ad | choose_research_wrapper | UI | research | 40b | 0x004C0000 | SK |  |
| 0x004c21d5 | complete_research | GL | research | 1422b | 0x004C0000 | PA |  |
| 0x004c2763 | FUN_004c2763 | FW | seh_crt | 12 | 0x004C0000 | SK |  |
| 0x004c2779 | FUN_004c2779 | UNSET |  | 15 | 0x004C0000 |  |  |
| 0x004c2788 | calc_tech_cost | GL | research | 1003b | 0x004C0000 | PA |  |
| 0x004c2b73 | add_research_beakers | GL | research | 458b | 0x004C0000 | PA |  |
| 0x004c4210 | set_paradrop_range | GL | research | 31b | 0x004C0000 | NN |  |
| 0x004c4240 | refresh_map_tile | GL | unit_orders | 43b | 0x004C0000 | SK |  |
| 0x004c4280 | FUN_004c4280 | FW | seh_crt | 21b | 0x004C0000 | SK |  |
| 0x004c42a0 | execute_worker_order | GL | unit_orders | 2035b | 0x004C0000 | PA |  |
| 0x004c4ada | unit_order_fortify | GL | unit_orders | 580b | 0x004C0000 | PA |  |
| 0x004c4d1e | unit_order_found_city | GL | unit_orders | 335b | 0x004C0000 | PA |  |
| 0x004c4e6d | unit_order_goto | GL | unit_orders | 611b | 0x004C0000 | PA |  |
| 0x004c50d0 | unit_pillage | GL | unit_orders | 824b | 0x004C0000 | PA |  |
| 0x004c5408 | execute_unit_order | GL | unit_orders | 158b | 0x004C0000 | PA |  |
| 0x004c54da | ai_find_nearest_city_or_transport | AI | pathfinding | 1297b | 0x004C0000 | TM |  |
| 0x004c59f0 | handle_incident_terror | GL | espionage | 1465b | 0x004C0000 | TH |  |
| 0x004c5fae | spy_diplomat_action | GL | espionage | 1271b | 0x004C0000 | TM |  |
| 0x004c64aa | spy_caught_check | GL | espionage | 163b | 0x004C0000 | TM |  |
| 0x004c654d | check_incident_permission | GL | espionage | 133b | 0x004C0000 | TL |  |
| 0x004c65d2 | calc_city_revolt_distance | GL | bribery | 232b | 0x004C0000 | TH |  |
| 0x004c66ba | execute_civil_war | GL | espionage | 1339b | 0x004C0000 | TH |  |
| 0x004c6bf5 | spy_enters_city | GL | espionage | 10469b | 0x004C0000 | PA |  |
| 0x004c9504 | FUN_004c9504 | FW | seh_crt | 12 | 0x004C0000 | SK |  |
| 0x004c951a | FUN_004c951a | UNSET |  | 14 | 0x004C0000 |  |  |
| 0x004c9528 | pick_up_unit | GL | bribery | 2453b | 0x004C0000 | PA |  |
| 0x004c9ebd | spy_sabotage_unit | GL | espionage | 784b | 0x004C0000 | TM |  |
| 0x004ca1cd | execute_airlift | GL | transport | 460b | 0x004C0000 | TL |  |
| 0x004ca39e | execute_paradrop | GL | transport | 2572b | 0x004C0000 | TL |  |
| 0x004cc870 | show_popup_with_icon | UI | popup | 43b | 0x004C0000 | SK |  |
| 0x004cc8b0 | show_popup_with_options | UI | popup | 41b | 0x004C0000 | SK |  |
| 0x004cc8f0 | FID_conflict:_$E31 | FW | seh_crt | 26b | 0x004C0000 | SK |  |
| 0x004cc90a | FUN_004cc90a | FW | seh_crt | 26b | 0x004C0000 | SK |  |
| 0x004cc924 | FUN_004cc924 | FW | seh_crt | 29b | 0x004C0000 | SK |  |
| 0x004cc941 | FUN_004cc941 | FW | seh_crt | 26b | 0x004C0000 | SK |  |
| 0x004cc95b | FID_conflict:_$E31 | FW | seh_crt | 26 | 0x004C0000 | SK |  |
| 0x004cc975 | FUN_004cc975 | UNSET |  | 26 | 0x004C0000 |  |  |
| 0x004cc98f | FUN_004cc98f | UNSET |  | 29 | 0x004C0000 |  |  |
| 0x004cc9ac | FUN_004cc9ac | UNSET |  | 26 | 0x004C0000 |  |  |
| 0x004cc9c6 | FID_conflict:_$E51 | FW | seh_crt | 26 | 0x004C0000 | SK |  |
| 0x004cc9e0 | FUN_004cc9e0 | UNSET |  | 30 | 0x004C0000 |  |  |
| 0x004cc9fe | FUN_004cc9fe | UNSET |  | 29 | 0x004C0000 |  |  |
| 0x004cca1b | FUN_004cca1b | UNSET |  | 26 | 0x004C0000 |  |  |
| 0x004cca35 | show_messagebox_CA35 | UNSET |  | 132 | 0x004C0000 |  |  |
| 0x004ccab9 | init_rules_editor_sections | UI | rules_editor | 52b | 0x004C0000 | NN |  |
| 0x004ccaed | add_rules_editor_section | UI | rules_editor | 125b | 0x004C0000 | NN |  |
| 0x004ccb6a | draw_border_frame | UI | popup | 588b | 0x004C0000 | SK |  |
| 0x004ccdb6 | append_number_to_buffer | UI | misc | 57b | 0x004C0000 | NN |  |
| 0x004ccdef | append_tech_name_to_buffer | UI | civilopedia | 318b | 0x004C0000 | NN |  |
| 0x004ccf2d | show_messagebox_CF2D | UNSET |  | 1149 | 0x004C0000 |  |  |
| 0x004cd3d7 | save_city_txt_entry | UI | rules_editor | 1171b | 0x004C0000 | NN |  |
| 0x004cd8a6 | update_city_txt_civ_names | UI | rules_editor | 1069b | 0x004C0000 | NN |  |
| 0x004cdcf6 | is_numeric_char | UI | misc | 71b | 0x004C0000 | NN |  |
| 0x004cdd3d | show_cheat_checkbox_dialog | UI | popup | 489b | 0x004C0000 | NN |  |
| 0x004cdf26 | FUN_004cdf26 | FW | seh_crt | 12 | 0x004C0000 | SK |  |
| 0x004cdf3c | FUN_004cdf3c | UNSET |  | 15 | 0x004C0000 |  |  |
| 0x004cdf4b | clamp_with_flag | UI | misc | 79b | 0x004C0000 | NN |  |
| 0x004cdfa4 | create_popup_dialog | UI | popup | 498b | 0x004C0000 | NN |  |
| 0x004ce196 | load_civilopedia_pages | UI | civilopedia | 349b | 0x004C0000 | NN |  |
| 0x004ce2f3 | reset_civilopedia_state | UI | civilopedia | 47b | 0x004C0000 | NN |  |
| 0x004ce322 | paint_civilopedia_header | UI | civilopedia | 104b | 0x004C0000 | NN |  |
| 0x004ce38a | show_civilopedia_viewer | UI | civilopedia | 867b | 0x004C0000 | NN |  |
| 0x004ce6ed | FUN_004ce6ed | FW | seh_crt | 9 | 0x004C0000 | SK |  |
| 0x004ce6f9 | FUN_004ce6f9 | UNSET |  | 9 | 0x004C0000 |  |  |
| 0x004ce70c | FUN_004ce70c | UNSET |  | 15 | 0x004C0000 |  |  |
| 0x004ce71b | check_city_name_available | UI | civilopedia | 290b | 0x004C0000 | NN |  |
| 0x004ce83d | refresh_civilopedia_tabs | UI | civilopedia | 103b | 0x004C0000 | NN |  |
| 0x004ce8a4 | read_ini_long | UI | misc | 95b | 0x004C0000 | NN |  |
| 0x004ce903 | alloc_event_string | UI | events | 139b | 0x004C0000 | NN |  |
| 0x004ce98e | clone_event_data | UI | events | 1367b | 0x004C0000 | NN |  |
| 0x004cef35 | rebuild_event_system | UI | events | 144b | 0x004C0000 | NN |  |
| 0x004cefc5 | FUN_004cefc5 | FW | seh_crt | 12 | 0x004C0000 | SK |  |
| 0x004cefdb | FUN_004cefdb | UNSET |  | 14 | 0x004C0000 |  |  |
| 0x004cefe9 | rename_city_in_events | UI | events | 347b | 0x004C0000 | NN |  |
| 0x004cf144 | rename_text_in_events | UI | events | 630b | 0x004C0000 | NN |  |
| 0x004cf3ba | rename_unit_in_events | UI | events | 201b | 0x004C0000 | NN |  |
| 0x004cff70 | set_civilopedia_bitmap | UI | civilopedia | 43b | 0x004C0000 | NN |  |
| 0x004cffb0 | send_civilopedia_msg | UI | civilopedia | 51b | 0x004C0000 | NN |  |
| 0x004cfff0 | trim_trailing_whitespace | UI | misc | 142b | 0x004C0000 | NN |  |
| 0x004d007e | trim_leading_whitespace | UTIL | STRING | 148B | 0x004D0000 | NN | Strips leading spaces/tabs in-place. UI helper only. |
| 0x004d0160 | wonder_win_timer_check | UI | wonder | 78B | 0x004D0000 | NN | Periodically invalidates wonder window cache on timer/flag. |
| 0x004d01ae | load_civ_power_values | UI | wonder | 90B | 0x004D0000 | NN | Loads 6 civ ranking categories into temp array for throne room threshold checks. |
| 0x004d0208 | show_wonder_or_advance | UI | wonder | 268B | 0x004D0000 | NN | Main entry point. Negative param = wonder movie, positive = advance animation. |
| 0x004d0314 | wonder_win_cleanup_thunk | FW | SEH | 12B | 0x004D0000 | SK |  |
| 0x004d032a | wonder_win_seh_epilog_1 | FW | SEH | 15B | 0x004D0000 | SK |  |
| 0x004d0339 | show_between_turns_advance | UI | wonder | 225B | 0x004D0000 | NN | Between-turns variant, only for active human player. |
| 0x004d041a | wonder_win_cleanup_thunk_2 | FW | SEH | 12B | 0x004D0000 | SK |  |
| 0x004d0430 | wonder_win_seh_epilog_2 | FW | SEH | 15B | 0x004D0000 | SK |  |
| 0x004d043f | wonder_win_draw_title | UI | wonder | 216B | 0x004D0000 | NN | Draws the civ name, separator, and leader name across top of wonder window. |
| 0x004d0517 | wonder_win_init | UI | wonder | 677B | 0x004D0000 | NN |  |
| 0x004d08b0 | wonder_win_destructor | UI | wonder | 422B | 0x004D0000 | NN | Reverse-order cleanup of all resources allocated in init. |
| 0x004d0a56 | FUN_004d0a56 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0a65 | FUN_004d0a65 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0a74 | FUN_004d0a74 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0a83 | FUN_004d0a83 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0a92 | FUN_004d0a92 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0aa1 | FUN_004d0aa1 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0ab0 | FUN_004d0ab0 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0abf | FUN_004d0abf | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0ace | FUN_004d0ace | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0add | FUN_004d0add | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0aec | FUN_004d0aec | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0afb | FUN_004d0afb | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0b0a | FUN_004d0b0a | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0b19 | FUN_004d0b19 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0b28 | FUN_004d0b28 | FW | DTOR | 15 | 0x004D0000 | SK |  |
| 0x004d0b37 | FUN_004d0b37 | FW | DTOR | 9 | 0x004D0000 | SK |  |
| 0x004d0b4a | wonder_win_seh_epilog_3 | FW | SEH | 14B | 0x004D0000 | SK |  |
| 0x004d0b58 | wonder_win_create | UI | wonder | 524B | 0x004D0000 | NN |  |
| 0x004d0d64 | wonder_win_create_dialog | UI | wonder | 322B | 0x004D0000 | NN |  |
| 0x004d0ea6 | show_advance_animation | UI | wonder | 1232B | 0x004D0000 | NN | Main animation display loop. Mode 2 causes recursive call after video playback. |
| 0x004d138b | advance_anim_dtor_surface | FW | DTOR | 12B | 0x004D0000 | SK |  |
| 0x004d1397 | advance_anim_dtor_bitmap | FW | DTOR | 9B | 0x004D0000 | SK |  |
| 0x004d13aa | advance_anim_seh_epilog | FW | SEH | 14B | 0x004D0000 | SK |  |
| 0x004d13b8 | show_advance_between_turns | UI | wonder | 877B | 0x004D0000 | NN | Two-pass rendering: instant first scene then animated transition to updated scene. |
| 0x004d1725 | show_wonder_movie | UI | wonder | 154B | 0x004D0000 | NN | Plays AVI video then transitions to wonder starfield animation. |
| 0x004d17bf | build_advance_scene | UI | wonder | 12822B | 0x004D0000 | NN | Largest function in block (12822B). Hardcoded sprite coordinate tables define the entire throne r... |
| 0x004d49d5 | build_scene_dtor_step_0 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #10 in build_advance_scene SEH cleanup |
| 0x004d49e1 | build_scene_dtor_step_1 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #9 |
| 0x004d49ed | build_scene_dtor_step_2 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #8 |
| 0x004d49f9 | build_scene_dtor_step_3 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #7 |
| 0x004d4a05 | build_scene_dtor_step_4 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #6 |
| 0x004d4a11 | build_scene_dtor_step_5 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #5 |
| 0x004d4a1d | build_scene_dtor_step_6 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #4 |
| 0x004d4a29 | build_scene_dtor_step_7 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #3 |
| 0x004d4a35 | build_scene_dtor_step_8 | FW | DTOR | 9B | 0x004D0000 | SK | Destroy bitmap #2 |
| 0x004d4a3e | build_scene_dtor_step_9 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #1 |
| 0x004d4a4a | build_scene_dtor_step_10 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy bitmap #0 |
| 0x004d4a56 | build_scene_dtor_step_11 | FW | DTOR | 12B | 0x004D0000 | SK | Destroy base bitmap |
| 0x004d4a6c | build_scene_seh_epilog | FW | SEH | 14B | 0x004D0000 | SK |  |
| 0x004d4a7b | build_wonder_info_text | UI | wonder | 1366B | 0x004D0000 | TL | Builds the full statistics text shown in the wonder/advance window. Uses the 6 civ ranking catego... |
| 0x004d4fd1 | wonder_win_draw_next_char | UI | wonder | 986B | 0x004D0000 | NN | Typewriter effect — draws one character at a time. Pollution bar uses 3-color system (green/yello... |
| 0x004d53ab | wonder_win_draw_buttons | UI | wonder | 826B | 0x004D0000 | NN | Creates button sprite sheet with 3 states (normal/highlight/pressed) for 2 buttons (OK and Video)... |
| 0x004d56ea | wonder_buttons_dtor_bitmap | FW | DTOR | 9B | 0x004D0000 | SK |  |
| 0x004d56fd | wonder_buttons_seh_epilog | FW | SEH | 14B | 0x004D0000 | SK |  |
| 0x004d570b | wonder_win_show_starfield | UI | wonder | 1046B | 0x004D0000 | NN | Starfield uses perspective projection (x/z+center, y/z+center). 80 particles with random 3D posit... |
| 0x004d5b21 | play_wonder_video | UI | wonder | 769B | 0x004D0000 | NN | Plays "civ2_video_launch.avi". Allocates 0xa28-byte video player. Handles VFW registration errors. |
| 0x004d5e41 | wonder_win_setup_hotspots | UI | wonder | 184B | 0x004D0000 | NN |  |
| 0x004d5ef9 | wonder_win_draw_initial_buttons | UI | wonder | 128B | 0x004D0000 | NN |  |
| 0x004d5f79 | wonder_win_draw_button_left | UI | wonder | 300B | 0x004D0000 | NN |  |
| 0x004d60a5 | wonder_win_draw_button_right | UI | wonder | 286B | 0x004D0000 | NN |  |
| 0x004d61c3 | wonder_win_handle_click | UI | wonder | 415B | 0x004D0000 | NN |  |
| 0x004d6367 | wonder_win_timer_callback | UI | wonder | 29B | 0x004D0000 | NN |  |
| 0x004d6384 | wonder_win_toggle_flag | UI | wonder | 119B | 0x004D0000 | NN |  |
| 0x004d63fb | wonder_win_animate_stars | UI | wonder | 841B | 0x004D0000 | NN | Star animation: palette index 0x29 = star, 10 = background. Perspective projection with z-depth. ... |
| 0x004d6744 | wonder_win_handle_key | UI | wonder | 290B | 0x004D0000 | NN |  |
| 0x004d686b | wonder_win_video_event | UI | wonder | 60B | 0x004D0000 | NN |  |
| 0x004d68a7 | wonder_win_handle_mousedown | UI | wonder | 388B | 0x004D0000 | NN |  |
| 0x004d6a30 | wonder_win_handle_mouseup | UI | wonder | 647B | 0x004D0000 | NN |  |
| 0x004d6cbc | wonder_win_handle_mousemove | UI | wonder | 663B | 0x004D0000 | NN | Standard Win32 button tracking — pressed state follows mouse, restores on leave. |
| 0x004d6f58 | wonder_win_noop | FW | NOOP | 16B | 0x004D0000 | SK | Empty no-op function (unused virtual slot) |
| 0x004d8af0 | get_text_ptr | UI | editor | 27B | 0x004D0000 | NN |  |
| 0x004d8b20 | video_player_destructor | UI | wonder | 57B | 0x004D0000 | NN |  |
| 0x004d8b70 | create_button_hotspot | UI | wonder | 54B | 0x004D0000 | NN |  |
| 0x004d8bc0 | editor_load_improvements | UI | editor | 234B | 0x004D0000 | NN |  |
| 0x004d8caa | editor_save_improvements | UI | editor | 214B | 0x004D0000 | NN |  |
| 0x004d8d80 | editor_update_controls | UI | editor | 332B | 0x004D0000 | NN |  |
| 0x004d8ed6 | editor_read_controls | UI | editor | 437B | 0x004D0000 | NN |  |
| 0x004d9095 | editor_repaint | UI | editor | 27B | 0x004D0000 | NN |  |
| 0x004d90b0 | editor_write_rules_file | UI | editor | 328B | 0x004D0000 | NN |  |
| 0x004d91f8 | editor_write_wonders_section | UI | editor | 162B | 0x004D0000 | NN |  |
| 0x004d929a | show_messagebox_929A | UI | editor | 287B | 0x004D0000 | NN |  |
| 0x004d93b9 | editor_rename_improvement | UI | editor | 390B | 0x004D0000 | NN |  |
| 0x004d953f | editor_show_help | UI | editor | 95B | 0x004D0000 | NN |  |
| 0x004d959e | editor_close | UI | editor | 40B | 0x004D0000 | NN |  |
| 0x004d95c6 | editor_edit_effects | UI | editor | 83B | 0x004D0000 | NN |  |
| 0x004d9619 | editor_edit_misc | UI | editor | 250B | 0x004D0000 | NN |  |
| 0x004d9718 | editor_handle_listbox | UI | editor | 342B | 0x004D0000 | NN |  |
| 0x004d986e | editor_create_combo_control | UI | editor | 551B | 0x004D0000 | NN |  |
| 0x004d9a9f | editor_create_edit_control | UI | editor | 244B | 0x004D0000 | NN |  |
| 0x004d9b93 | editor_paint | UI | editor | 1396B | 0x004D0000 | NN | Full paint handler for the editor. Draws icon, labels, and Civilopedia description. |
| 0x004da107 | editor_init | UI | editor | 1463B | 0x004D0000 | NN |  |
| 0x004da9be | editor_dtor_critsec | FW | DTOR | 22B | 0x004D0000 | SK |  |
| 0x004da9d4 | editor_seh_epilog | FW | SEH | 14B | 0x004D0000 | SK |  |
| 0x004da9e2 | show_improvement_editor | UI | editor | 89B | 0x004D0000 | NN | Public API entry point called from cheat menu. |
| 0x004daa3b | editor_frame_dtor | FW | DTOR | 22B | 0x004D0000 | SK |  |
| 0x004daa51 | editor_frame_seh_epilog | FW | SEH | 14B | 0x004D0000 | SK |  |
| 0x004db210 | parley_init_thunk | UI | parley | 21B | 0x004D0000 | NN |  |
| 0x004db225 | parley_init_tables | UI | parley | 26B | 0x004D0000 | NN |  |
| 0x004db23f | parley_load_index_file | UI | parley | 529B | 0x004D0000 | TL |  |
| 0x004db450 | parley_unload_index | UI | parley | 49B | 0x004D0000 | TL |  |
| 0x004db481 | parley_find_entry | UI | parley | 525B | 0x004D0000 | TL |  |
| 0x004db690 | parley_build_packet | GL | diplomacy | 1060B | 0x004D0000 | TH | Critical for understanding MP diplomacy protocol. |
| 0x004dbab4 | parley_serialize_offer | GL | diplomacy | 1074B | 0x004D0000 | TH | Serializes offer data from UI selection lists (DAT_00682ba8) into network packet buffer. |
| 0x004dbee6 | parley_build_description | UI | parley | 3092B | 0x004D0000 | TL | Enormous switch statement generating human-readable text for all 11 transaction types. |
| 0x004dcafa | parley_describe_techs | UI | parley | 274B | 0x004D0000 | TL |  |
| 0x004dcc0c | parley_describe_gold | UI | parley | 119B | 0x004D0000 | TL |  |
| 0x004dcc83 | parley_describe_units | UI | parley | 546B | 0x004D0000 | TL |  |
| 0x004dcea5 | parley_describe_cities | UI | parley | 369B | 0x004D0000 | TL |  |
| 0x004dd016 | parley_describe_attitude | UI | parley | 347B | 0x004D0000 | TL |  |
| 0x004dd176 | parley_describe_maps | UI | parley | 271B | 0x004D0000 | TL |  |
| 0x004dd285 | parley_execute_transaction | GL | diplomacy | 1381B | 0x004D0000 | TH | Master dispatcher. Trade (0xe) executes both sides. After execution, checks for civ elimination. |
| 0x004dd8ad | parley_execute_share_maps | GL | diplomacy | 1521B | 0x004D0000 | TH | Full map sharing implementation. Three passes: tiles, units, cities. Reveals 21-tile radius aroun... |
| 0x004dde9e | parley_execute_give_tech_list | GL | diplomacy | 102B | 0x004D0000 | TH |  |
| 0x004ddf04 | parley_execute_give_gold | GL | diplomacy | 174B | 0x004D0000 | TH |  |
| 0x004ddfb2 | parley_execute_give_techs | GL | diplomacy | 151B | 0x004D0000 | TH |  |
| 0x004de049 | parley_execute_give_units | GL | diplomacy | 153B | 0x004D0000 | TM | Despite the name, this transfers CITIES (each entry is a city seq_id). Iterates offer with stride 2. |
| 0x004de0e2 | parley_transfer_city | GL | diplomacy | 2217B | 0x004D0000 | TH | Complete city transfer. Removes Palace/Temple/Barracks/Library. Transfers units, updates ownershi... |
| 0x004de990 | parley_execute_transfer_units | GL | diplomacy | 887B | 0x004D0000 | TM |  |
| 0x004ded07 | find_unit_placement_tile | GL | diplomacy | 589B | 0x004D0000 | TM |  |
| 0x004def54 | parley_describe_treaty | UI | parley | 417B | 0x004D0000 | TL |  |
| 0x004df10f | parley_execute_treaty | GL | diplomacy | 289B | 0x004D0000 | TH | Treaty bits: 2=ceasefire, 4=peace, 8=alliance. Cancel removes all three. |
| 0x004e0140 | crt_init_wrapper | FW | FW | 26B | 0x004E0000 | SK | CRT initialization trampoline. No game logic. |
| 0x004e015a | crt_alloc_heap | FW | FW | 31B | 0x004E0000 | SK | Heap allocation wrapper. |
| 0x004e0179 | crt_register_atexit | FW | FW | 29B | 0x004E0000 | SK | Registers shutdown handler. |
| 0x004e0196 | crt_cleanup_handler | FW | FW | 26B | 0x004E0000 | SK | CRT cleanup trampoline. |
| 0x004e01b0 | show_wonder_selection_dialog | UI | UI | 283B | 0x004E0000 | NN | Wonder selection popup during city production change. Not needed — JS uses custom UI. |
| 0x004e02cb | dialog_cleanup_1 | FW | FW | 22B | 0x004E0000 | SK | MFC dialog destructor stub. |
| 0x004e02e1 | seh_unwind_1 | FW | FW | 14B | 0x004E0000 | SK | SEH exception-unwind thunk. |
| 0x004e02ef | init_city_windows_layout | UI | UI | 926B | 0x004E0000 | NN | Win32 city dialog layout calculator. Positions child windows (resource display, citizen icons, et... |
| 0x004e068d | load_game_handler | UI | UI | 1023B | 0x004E0000 | NN | File→Load Game menu handler. Full Win32 file dialog + game state reload. Not needed — JS has its ... |
| 0x004e0a8c | set_checkbox_state | UI | UI | 36B | 0x004E0000 | NN | Checkbox helper for options dialogs. |
| 0x004e0ab0 | show_game_options_dialog | UI | UI | 705B | 0x004E0000 | NN | Game→Game Options dialog. Reads/writes ~15 global option flags. Not needed — JS settings are sepa... |
| 0x004e0d71 | show_graphic_options_dialog | UI | UI | 423B | 0x004E0000 | NN | Game→Graphic Options dialog. |
| 0x004e0f18 | show_multiplayer_options_dialog | UI | UI | 1020B | 0x004E0000 | NN | Multiplayer options dialog. Our multiplayer uses its own protocol/settings. |
| 0x004e1314 | toggle_unit_movement_doubling | GL | GL | 318B | 0x004E0000 | TL |  |
| 0x004e1452 | show_message_options_dialog | UI | UI | 783B | 0x004E0000 | NN | Game→Message Options dialog. |
| 0x004e1763 | kill_or_retire_civ | GL | GL | 3942B | 0x004E0000 | TM |  |
| 0x004e22c9 | handle_quit_or_retire | UI | UI | 726B | 0x004E0000 | NN | Game→Retire / Game→Quit handler. Score display + state cleanup. |
| 0x004e2597 | toggle_hidden_terrain | UI | UI | 88B | 0x004E0000 | NN | View→Toggle Hidden Terrain. Debug/cheat feature toggling fog of war. Our FOW is handled client-side. |
| 0x004e25ef | show_pick_music_dialog | UI | SN | 496B | 0x004E0000 | NN | UI/SN |
| 0x004e27df | dialog_cleanup_2 | FW | FW | 22B | 0x004E0000 | SK | MFC dialog destructor stub (pick music dialog). |
| 0x004e27f5 | seh_unwind_2 | FW | FW | 14B | 0x004E0000 | SK | SEH exception-unwind thunk. |
| 0x004e2803 | main_menu_command_dispatch | UI | UI | 4739B | 0x004E0000 | NN | Master WM_COMMAND dispatch for main game window. Giant switch statement mapping ~80 menu IDs to h... |
| 0x004e3a86 | build_main_menu_bar | UI | UI | 4620B | 0x004E0000 | NN | Builds the full main menu bar with 6+ popup menus. |
| 0x004e4c92 | update_menu_item_label | UI | UI | 89B | 0x004E0000 | NN | Updates a single menu item's display text (e.g., "Republic" → "Democracy" after revolution). |
| 0x004e4ceb | update_menu_state | UI | UI | 9557B | 0x004E0000 | NN | Called on every game state change to sync menu item states. Massive function (~9.5KB) of pure Win... |
| 0x004e7240 | manage_window_wrapper | FW | FW | 48B | 0x004E0000 | SK | Win32 window show/update wrapper. |
| 0x004e7270 | acquire_wonder | GL | GL | 486B | 0x004E0000 | TM |  |
| 0x004e7458 | classify_production_type | GL | GL | 58B | 0x004E0000 | TL |  |
| 0x004e7492 | init_city_production_globals | GL | GL | 77B | 0x004E0000 | TL |  |
| 0x004e74df | calc_food_box_with_difficulty | GL | GL | 106B | 0x004E0000 | TL |  |
| 0x004e7549 | set_worker_tile_status | GL | GL | 93B | 0x004E0000 | PA |  |
| 0x004e75a6 | get_worker_tile_status | GL | GL | 68B | 0x004E0000 | PA |  |
| 0x004e75ea | count_worker_tiles_with_status | GL | GL | 87B | 0x004E0000 | PA |  |
| 0x004e7641 | evaluate_city_tiles | GL | GL | 653B | 0x004E0000 | TM |  |
| 0x004e78ce | is_tile_worked | GL | GL | 62B | 0x004E0000 | PA |  |
| 0x004e790c | set_tile_worked | GL | GL | 91B | 0x004E0000 | PA |  |
| 0x004e7967 | calc_capital_distance_and_corruption | GL | GL | 1046B | 0x004E0000 | PA |  |
| 0x004e7d7f | check_unit_support | GL | GL | 306B | 0x004E0000 | TM |  |
| 0x004e7eb1 | calc_food_box_size | GL | GL | 512B | 0x004E0000 | TM |  |
| 0x004e80b1 | calc_shields_per_row | GL | GL | 1502B | 0x004E0000 | TM |  |
| 0x004e868f | calc_tile_resource | GL | GL | 1533B | 0x004E0000 | PA |  |
| 0x004e8c8c | check_auto_irrigation_trigger | GL | GL | 297B | 0x004E0000 | TL |  |
| 0x004e8db5 | check_road_trade_trigger | GL | GL | 152B | 0x004E0000 | TL |  |
| 0x004e8e4d | calc_tile_all_resources | GL | GL | 130B | 0x004E0000 | PA |  |
| 0x004e8ecf | clear_and_check_worked_tiles | GL | GL | 115B | 0x004E0000 | TL |  |
| 0x004e8f42 | assign_worker_tiles | AI | AI | 2038B | 0x004E0000 | TM |  |
| 0x004e9719 | adjust_specialist_count | GL | GL | 149B | 0x004E0000 | TL |  |
| 0x004e97ae | sync_worker_tile_status | GL | GL | 155B | 0x004E0000 | TL |  |
| 0x004e9849 | calc_corruption_divisor | GL | GL | 82B | 0x004E0000 | P |  |
| 0x004e989a | calc_corruption | GL | GL | 890B | 0x004E0000 | P |  |
| 0x004e9c14 | calc_city_production | GL | GL | 1053B | 0x004E0000 | PA |  |
| 0x004ea031 | adjust_happy_unhappy | GL | GL | 437B | 0x004E0000 | P |  |
| 0x004ea1f6 | distribute_trade | GL | GL | 1774B | 0x004E0000 | P |  |
| 0x004ea8e4 | calc_happiness | GL | GL | 2627B | 0x004E0000 | P |  |
| 0x004eb327 | calc_trade_route_income | GL | GL | 374B | 0x004E0000 | TM |  |
| 0x004eb4a1 | recalc_city_all | GL | GL | 76B | 0x004E0000 | R |  |
| 0x004eb4ed | calc_city_production_orchestrator | GL | GL | 132B | 0x004E0000 | R |  |
| 0x004eb571 | show_city_event_dialog | UI | UI | 612B | 0x004E0000 | NN | Shows popup for city events during turn processing. |
| 0x004eb7e5 | dialog_cleanup_3 | FW | FW | 22B | 0x004E0000 | SK | MFC dialog destructor stub (city event dialog). |
| 0x004eb7fb | seh_unwind_3 | FW | FW | 15B | 0x004E0000 | SK | SEH exception-unwind thunk. |
| 0x004eb80a | show_city_event_dialog_v2 | UI | UI | 931B | 0x004E0000 | NN | Enhanced city event dialog with navigation. Win32-specific. |
| 0x004ebbad | render_ctx_cleanup | FW | FW | 12B | 0x004E0000 | SK | DirectDraw rendering context cleanup. |
| 0x004ebbb9 | surface_cleanup | FW | FW | 22B | 0x004E0000 | SK | DirectDraw surface cleanup. |
| 0x004ebbcf | seh_unwind_4 | FW | FW | 15B | 0x004E0000 | SK | SEH exception-unwind thunk. |
| 0x004ebbde | process_city_food | GL | GL | 1512B | 0x004E0000 | TH |  |
| 0x004ec1c6 | assign_caravan_commodity | GL | GL | 332B | 0x004E0000 | TM |  |
| 0x004ec312 | handle_espionage_discovery | GL | GL | 236B | 0x004E0000 | TL |  |
| 0x004ec3fe | process_city_production | GL | GL | 10931B | 0x004E0000 | TH |  |
| 0x004eeee7 | dialog_cleanup_5 | FW | FW | 12B | 0x004E0000 | SK | MFC dialog destructor stub. |
| 0x004eeef3 | dialog_cleanup_6 | FW | FW | 12B | 0x004E0000 | SK | MFC dialog destructor stub. |
| 0x004eeeff | dialog_cleanup_7 | FW | FW | 22B | 0x004E0000 | SK | MFC dialog destructor stub (production complete dialog). |
| 0x004eef15 | seh_unwind_5 | FW | FW | 14B | 0x004E0000 | SK | SEH exception-unwind thunk. |
| 0x004eef23 | process_unit_support_deficit | GL | GL | 1621B | 0x004E0000 | TH |  |
| 0x004ef578 | handle_city_disorder | GL | GL | 1614B | 0x004E0000 | TH |  |
| 0x004efbc6 | process_city_science | GL | GL | 382B | 0x004E0000 | TM |  |
| 0x004efd44 | process_city_pollution_and_meltdown | GL | GL | 508B | 0x004E0000 | TM |  |
| 0x004f00f0 | calc_building_upkeep_cost | GL | CITY | 305B | 0x004F0000 | PA |  |
| 0x004f0221 | pay_building_upkeep | GL | CITY | 406B | 0x004F0000 | TH |  |
| 0x004f03b7 | find_city_expansion_site | AI | CITY | 1095B | 0x004F0000 | TM |  |
| 0x004f080d | handle_city_expansion | AI | CITY | 650B | 0x004F0000 | TM |  |
| 0x004f0a9c | process_city_turn | GL | CITY | 1903B | 0x004F0000 | TH |  |
| 0x004f1220 | handle_space_race_victory | GL | VICTORY | 641B | 0x004F0000 | TL |  |
| 0x004f3d30 | pedia_get_char | FW | UTIL | 29 | 0x004F0000 | SK | return DAT_006a6530[index]`. Pedia text buffer accessor. |
| 0x004f3d60 | pedia_window_ctor | FW | OBJ | 115 | 0x004F0000 | SK | MFC CWnd ctor. Calls base ctor, sets 0x4000 style, assigns vtable. SEH frame. |
| 0x004f3e20 | pedia_window_scalar_delete | FW | OBJ | 57 | 0x004F0000 | SK | Scalar deleting destructor. Calls dtor, conditionally frees. |
| 0x004f3e70 | pedia_window_dtor | FW | OBJ | 75 | 0x004F0000 | SK | Destructor with SEH. Calls 3 cleanup helpers. |
| 0x004f3ebb | pedia_window_dtor_helper1 | FW | OBJ | 42 | 0x004F0000 | SK | Computes sub-object offset +0x4a4, calls CWnd cleanup. |
| 0x004f3ee5 | pedia_window_dtor_helper2 | FW | OBJ | 9 | 0x004F0000 | SK | CString/CDaoFieldInfo destructor (Ghidra FID misidentification). |
| 0x004f3ef8 | pedia_window_seh_cleanup | FW | SEH | 14 | 0x004F0000 | SK | SEH chain restore: `*FS:[0] = saved_link`. |
| 0x004f3f30 | city_message_wrapper | FW | UTIL | 38 | 0x004F0000 | SK | Wrapper: `show_city_msg(key, city_idx, 0, extra)`. |
| 0x004f3f60 | set_global_f004 | FW | UTIL | 24 | 0x004F0000 | SK | Sets `DAT_0062f004 = value`. Simple global setter. |
| 0x004f3f80 | crt_static_init_pedia | FW | INIT | 26 | 0x004F0000 | SK | CRT static init. Calls ctor wrapper + registers atexit. |
| 0x004f3f9a | pedia_static_ctor_wrapper | FW | INIT | 26 | 0x004F0000 | SK | Wraps `thunk_FUN_004f3feb` (pedia manager ctor). |
| 0x004f3fb4 | pedia_register_atexit | FW | INIT | 29 | 0x004F0000 | SK | atexit(pedia_static_dtor_wrapper)`. |
| 0x004f3fd1 | pedia_static_dtor_wrapper | FW | INIT | 26 | 0x004F0000 | SK | atexit handler: calls `thunk_FUN_004f44a7` (pedia manager dtor). |
| 0x004f3feb | pedia_manager_ctor | FW | OBJ | 938 | 0x004F0000 | SK | Constructor: base ctor, creates 16 child controls + 2 special, assigns vtable, inits 7 index arra... |
| 0x004f44a7 | pedia_manager_dtor | FW | OBJ | 460 | 0x004F0000 | SK | Destructor: calls free_string_lists, clear_item_list, frees 2 surfaces, destroys 17 child control... |
| 0x004f4673 | pedia_dtor_child_16 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040fbb0 |
| 0x004f4682 | pedia_dtor_child_15 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_00418870 |
| 0x004f4691 | pedia_dtor_child_14 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f46a0 | pedia_dtor_child_13 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f46af | pedia_dtor_child_12 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f46be | pedia_dtor_child_11 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f46cd | pedia_dtor_child_10 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f46dc | pedia_dtor_child_9 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f46eb | pedia_dtor_child_8 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f46fa | pedia_dtor_child_7 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4709 | pedia_dtor_child_6 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4718 | pedia_dtor_child_5 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4727 | pedia_dtor_child_4 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4736 | pedia_dtor_child_3 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4745 | pedia_dtor_child_2 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4754 | pedia_dtor_child_1 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4763 | pedia_dtor_child_0 | FW | OBJ | 15 | 0x004F0000 | SK | thunk_FUN_0040f570 |
| 0x004f4772 | pedia_dtor_base | FW | OBJ | 9 | 0x004F0000 | SK | Calls `thunk_FUN_0044cba0` (base class dtor). |
| 0x004f4785 | pedia_seh_cleanup | FW | SEH | 14 | 0x004F0000 | SK | SEH chain restore. |
| 0x004f4793 | pedia_clear_item_list | FW | MEM | 118 | 0x004F0000 | SK | Frees linked list at `this+0x1F40`, calls scalar deleting dtor per node. |
| 0x004f4809 | pedia_free_string_lists | FW | MEM | 918 | 0x004F0000 | SK | Frees 7 linked lists at offsets 0x16dc-0x16f4 (one per category). |
| 0x004f4b9f | pedia_init_layout | UI | PEDIA | 3950B | 0x004F0000 | NN | Pure Win32 layout code. Not needed — JS has its own Civilopedia rendering. |
| 0x004f5b24 | pedia_reset_view | UI | PEDIA | 75B | 0x004F0000 | NN |  |
| 0x004f5b6f | pedia_handle_back | UI | PEDIA | 605B | 0x004F0000 | NN |  |
| 0x004f5dd1 | pedia_close_display | UI | PEDIA | 129B | 0x004F0000 | NN |  |
| 0x004f5e52 | pedia_refresh_page | UI | PEDIA | 128B | 0x004F0000 | NN |  |
| 0x004f5ed2 | pedia_show_category_8 | UI | PEDIA | 81B | 0x004F0000 | NN |  |
| 0x004f5f23 | pedia_select_entry | UI | PEDIA | 764B | 0x004F0000 | NN |  |
| 0x004f6244 | pedia_draw_frame | UI | PEDIA | 800B | 0x004F0000 | NN |  |
| 0x004f6564 | pedia_draw_background | UI | PEDIA | 226B | 0x004F0000 | NN |  |
| 0x004f6646 | pedia_dispatch_after_select | UI | PEDIA | 113B | 0x004F0000 | NN |  |
| 0x004f66c6 | pedia_draw_item_list | UI | PEDIA | 3016B | 0x004F0000 | NN |  |
| 0x004f7313 | pedia_set_scroll_page | UI | PEDIA | 55B | 0x004F0000 | NN |  |
| 0x004f734a | pedia_hit_test | UI | PEDIA | 266B | 0x004F0000 | NN |  |
| 0x004f7454 | pedia_ensure_visible | UI | PEDIA | 151B | 0x004F0000 | NN |  |
| 0x004f74eb | pedia_find_by_letter | UI | PEDIA | 445B | 0x004F0000 | NN |  |
| 0x004f76ce | pedia_handle_keypress | UI | PEDIA | 741B | 0x004F0000 | NN |  |
| 0x004f7a30 | pedia_handle_mouse_click | UI | PEDIA | 151B | 0x004F0000 | NN |  |
| 0x004f7ac7 | pedia_set_title | UI | PEDIA | 229B | 0x004F0000 | NN |  |
| 0x004f7bd1 | pedia_open_category | UI | PEDIA | 200B | 0x004F0000 | NN |  |
| 0x004f7c99 | pedia_load_index_data | UI | PEDIA | 3281B | 0x004F0000 | NN |  |
| 0x004f896a | pedia_sort_entries | UI | PEDIA | 305B | 0x004F0000 | NN |  |
| 0x004f8a9b | pedia_get_entry_name | UI | PEDIA | 89B | 0x004F0000 | NN |  |
| 0x004f8af9 | pedia_push_history | UI | PEDIA | 523B | 0x004F0000 | NN |  |
| 0x004f8d04 | pedia_timer_handler | FW | UI | 77 | 0x004F0000 | SK | Timer callback. Calls screen update, invalidates pedia cache if needed. |
| 0x004f8d51 | pedia_invalidate_cache | FW | UI | 27 | 0x004F0000 | SK | Invalidates surface cache at `DAT_006a66b0`. |
| 0x004fa0f0 | crt_scalar_deleting_dtor | FW | OBJ | 57 | 0x004F0000 | SK | CControlBarInfo scalar deleting destructor pattern. |
| 0x004fa140 | event_node_dtor | FW | OBJ | 62 | 0x004F0000 | SK | Destructor for event node structure (0x1C4 bytes). SEH frame. |
| 0x004fa17e | event_node_dtor_helper | FW | OBJ | 12 | 0x004F0000 | SK | Calls `thunk_FUN_00452a67`. Sub-object cleanup. |
| 0x004fa194 | event_node_seh_cleanup | FW | SEH | 14 | 0x004F0000 | SK | SEH chain restore. |
| 0x004fa1c0 | crt_static_init_events | FW | INIT | 26 | 0x004F0000 | SK | CRT static init for events subsystem. |
| 0x004fa1da | events_static_ctor | FW | INIT | 26 | 0x004F0000 | SK | Wraps `FUN_005c64da` (construct static event manager). |
| 0x004fa1f4 | events_register_atexit | FW | INIT | 29 | 0x004F0000 | SK | atexit(events_static_dtor)`. |
| 0x004fa211 | events_static_dtor | FW | INIT | 26 | 0x004F0000 | SK | atexit handler: calls `FUN_005c656b` (destroy event manager). |
| 0x004fa250 | event_resolve_civ_name | GL | EVENT | 265B | 0x004F0000 | TH |  |
| 0x004fa359 | event_resolve_unit_name | GL | EVENT | 170B | 0x004F0000 | TH |  |
| 0x004fa403 | event_resolve_terrain_name | GL | EVENT | 123B | 0x004F0000 | TL |  |
| 0x004fa47e | event_mgr_reset_pool | FW | MEM | 64 | 0x004F0000 | SK | Clears pool at `this+0x2F4`, reinits with 0xC-size blocks. |
| 0x004fa4be | event_mgr_ctor | FW | OBJ | 152 | 0x004F0000 | SK | Constructor: CWnd init, zeroes list head/count, calls init. SEH. |
| 0x004fa569 | event_mgr_dtor | FW | OBJ | 79 | 0x004F0000 | SK | Destructor: clears pool, calls cleanup helpers. SEH. |
| 0x004fa5b8 | event_mgr_dtor_helper | FW | OBJ | 9 | 0x004F0000 | SK | Calls `thunk_FUN_0059df8a` (CWnd cleanup). |
| 0x004fa5cb | event_mgr_seh_cleanup | FW | SEH | 14 | 0x004F0000 | SK | SEH chain restore. |
| 0x004fa5d9 | event_mgr_init | FW | OBJ | 62 | 0x004F0000 | SK | Zeroes list head + count, calls `event_mgr_reset_pool`. |
| 0x004fa617 | event_alloc_node | GL | EVENT | 240B | 0x004F0000 | TH |  |
| 0x004fa707 | event_action_play_sound | GL | EVENT | 294B | 0x004F0000 | TL |  |
| 0x004fa82d | event_action_flag_no_schism | GL | EVENT | 39B | 0x004F0000 | TL |  |
| 0x004fa854 | event_action_play_cd | GL | EVENT | 235B | 0x004F0000 | NN |  |
| 0x004fa944 | event_action_change_money | GL | EVENT | 364B | 0x004F0000 | TH |  |
| 0x004faab0 | event_action_show_text | GL | EVENT | 246B | 0x004F0000 | TL |  |
| 0x004faba6 | event_action_make_aggression | GL | EVENT | 348B | 0x004F0000 | TM |  |
| 0x004fad02 | event_action_destroy_civ | GL | EVENT | 249B | 0x004F0000 | TM |  |
| 0x004fadfb | event_action_give_tech | GL | EVENT | 217B | 0x004F0000 | TM |  |
| 0x004faed4 | event_action_create_unit | GL | EVENT | 941B | 0x004F0000 | TM |  |
| 0x004fb29f | event_action_move_unit | GL | EVENT | 787B | 0x004F0000 | TM |  |
| 0x004fb5b2 | event_action_change_terrain | GL | EVENT | 1114B | 0x004F0000 | TM |  |
| 0x004fba0c | event_check_turn_trigger | GL | EVENT | 144B | 0x004F0000 | TH |  |
| 0x004fba9c | event_check_interval_trigger | GL | EVENT | 147B | 0x004F0000 | TH |  |
| 0x004fbb2f | event_check_random_trigger | GL | EVENT | 174B | 0x004F0000 | TL |  |
| 0x004fbbdd | event_check_tech_trigger | GL | EVENT | 334B | 0x004F0000 | TL |  |
| 0x004fbd2b | event_check_scenario_loaded | GL | EVENT | 114B | 0x004F0000 | TL |  |
| 0x004fbd9d | event_check_unit_killed | GL | EVENT | 231B | 0x004F0000 | TL |  |
| 0x004fbe84 | event_check_negotiation | GL | EVENT | 900B | 0x004F0000 | TL |  |
| 0x004fc20d | event_check_no_schism | GL | EVENT | 169B | 0x004F0000 | TL |  |
| 0x004fc2bb | event_check_city_taken | GL | EVENT | 243B | 0x004F0000 | TL |  |
| 0x004fc3ae | event_dispatch_actions | GL | EVENT | 360B | 0x004F0000 | TH |  |
| 0x004fc516 | parse_events_file | GL | EVENT | 12813B | 0x004F0000 | TH |  |
| 0x00500e00 | FID_conflict:_$E51 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500e1a | FUN_00500e1a | FW | crt_static | 30 | 0x00500000 | NN |  |
| 0x00500e38 | FUN_00500e38 | FW | crt_static | 29 | 0x00500000 | NN |  |
| 0x00500e55 | FUN_00500e55 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500e6f | FID_conflict:_$E51 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500e89 | FUN_00500e89 | FW | crt_static | 30 | 0x00500000 | NN |  |
| 0x00500ea7 | FUN_00500ea7 | FW | crt_static | 29 | 0x00500000 | NN |  |
| 0x00500ec4 | FUN_00500ec4 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500ede | FID_conflict:_$E31 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500ef8 | FUN_00500ef8 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500f12 | FUN_00500f12 | FW | crt_static | 29 | 0x00500000 | NN |  |
| 0x00500f2f | FUN_00500f2f | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500f49 | FID_conflict:_$E31 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500f63 | FUN_00500f63 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500f7d | FUN_00500f7d | FW | crt_static | 29 | 0x00500000 | NN |  |
| 0x00500f9a | FUN_00500f9a | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500fb4 | FID_conflict:_$E31 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500fce | FUN_00500fce | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x00500fe8 | FUN_00500fe8 | FW | crt_static | 29 | 0x00500000 | NN |  |
| 0x00501005 | FUN_00501005 | FW | crt_static | 26 | 0x00500000 | NN |  |
| 0x0050101f | citywin_load_background | UI | citywin_bg | 348 bytes | 0x00500000 | SK |  |
| 0x0050117b | FUN_0050117b | FW | dialog_cleanup | 12 | 0x00500000 | NN |  |
| 0x00501187 | FUN_00501187 | FW | dialog_cleanup | 9 | 0x00500000 | NN |  |
| 0x00501190 | FUN_00501190 | FW | dialog_cleanup | 12 | 0x00500000 | NN |  |
| 0x005011a6 | FUN_005011a6 | FW | dialog_cleanup | 14 | 0x00500000 | NN |  |
| 0x005011b4 | citywin_create_arrow_button | UI | citywin_bg | 520 bytes | 0x00500000 | SK |  |
| 0x005013bc | citywin_modal_refresh | UI | citywin_bg | 132 bytes | 0x00500000 | SK |  |
| 0x00501440 | citywin_init_members | UI | citywin_init | 127 bytes | 0x00500000 | SK |  |
| 0x005014bf | OnClose | UNSET |  | 38 | 0x00500000 |  |  |
| 0x005014e5 | citywin_close_all_panels | UNSET |  | 70 | 0x00500000 |  |  |
| 0x0050152b | citywin_close_and_destroy | UNSET |  | 38 | 0x00500000 |  |  |
| 0x00501551 | citywin_constructor | UNSET |  | 136 | 0x00500000 |  |  |
| 0x0050160a | citywin_destructor | UNSET |  | 105 | 0x00500000 |  |  |
| 0x00501673 | FUN_00501673 | UNSET |  | 15 | 0x00500000 |  |  |
| 0x00501682 | FUN_00501682 | UNSET |  | 15 | 0x00500000 |  |  |
| 0x00501691 | FUN_00501691 | UNSET |  | 9 | 0x00500000 |  |  |
| 0x005016a4 | FUN_005016a4 | UNSET |  | 14 | 0x00500000 |  |  |
| 0x005016b2 | citywin_blit_panel | UI | citywin_render_core | 129 | 0x00500000 | SK |  |
| 0x00501733 | citywin_prepare_panel | UI | citywin_render_core | 77 | 0x00500000 | SK |  |
| 0x00501780 | citywin_refresh_top_panels | UI | citywin_render_core | 153 | 0x00500000 | SK |  |
| 0x00501819 | citywin_click_citizen | UI | citywin_citizens | 424 bytes | 0x00500000 | PA |  |
| 0x005019c1 | citywin_draw_citizen_icons | UI | citywin_citizens | 1186 bytes | 0x00500000 | SK |  |
| 0x00501e63 | citywin_draw_citizen_icons_simple | UI | citywin_citizens | 540 bytes | 0x00500000 | SK |  |
| 0x0050207f | draw_citizens_row | UI | citywin_citizens | 577 bytes | 0x00500000 | SK |  |
| 0x005022c0 | citywin_click_resource_map | UI | citywin_citizens | 784 bytes | 0x00500000 | PA |  |
| 0x005025d5 | draw_resource_rows | UI | citywin_resources | 9761 bytes | 0x00500000 | PA | 1 |
| 0x00504c05 | draw_food_storage | UI | citywin_food_prod_buy | 1081 bytes | 0x00500000 | PA |  |
| 0x0050503e | draw_production_box | UI | citywin_food_prod_buy | 1434 bytes | 0x00500000 | PA |  |
| 0x005055dd | draw_buy_panel | UI | citywin_food_prod_buy | 137 bytes | 0x00500000 | SK |  |
| 0x00505666 | draw_units_supported | UI | citywin_supported | 1751 bytes | 0x00500000 | PA | 1 |
| 0x00505d3d | citywin_sell_improvement | UI | citywin_sell | 701 bytes | 0x00500000 | PA | 1 |
| 0x00505ffa | draw_improvements_list | UI | citywin_improvements | 1102 bytes | 0x00500000 | SK | 1 |
| 0x00506448 | citywin_format_unit_info | UI | citywin_unitinfo | 495 bytes | 0x00500000 | SK |  |
| 0x00506637 | citywin_unit_popup_supported | UI | citywin_unitinfo | 985 bytes | 0x00500000 | PA |  |
| 0x00506a15 | FUN_00506a15 | FW | dialog_cleanup | 9 | 0x00500000 | NN |  |
| 0x00506a1e | FUN_00506a1e | FW | dialog_cleanup | 12 | 0x00500000 | NN |  |
| 0x00506a34 | FUN_00506a34 | FW | dialog_cleanup | 14 | 0x00500000 | NN |  |
| 0x00506a42 | citywin_unit_popup_present | UI | citywin_unitinfo | 1608 bytes | 0x00500000 | SK |  |
| 0x005070b8 | citywin_70B8 | FW | dialog_cleanup | 9 | 0x00500000 | NN |  |
| 0x005070c1 | citywin_70C1 | FW | dialog_cleanup | 12 | 0x00500000 | NN |  |
| 0x005070d7 | citywin_70D7 | FW | dialog_cleanup | 14 | 0x00500000 | NN |  |
| 0x005070e5 | citywin_draw_units_present | UI | citywin_infopanel | 2692 bytes | 0x00500000 | SK |  |
| 0x00507b69 | citywin_draw_minimap | UI | citywin_infopanel | 968 bytes | 0x00500000 | SK |  |
| 0x00507f31 | citywin_draw_defense_buildings | UI | citywin_infopanel | 561 bytes | 0x00500000 | SK |  |
| 0x00508177 | citywin_draw_happiness_modifiers | UI | citywin_infopanel | 987 bytes | 0x00500000 | PA |  |
| 0x00508552 | citywin_draw_happiness_panel | UI | citywin_infopanel | 1393 bytes | 0x00500000 | PA |  |
| 0x00508adc | citywin_draw_info_panel | UI | citywin_infopanel | 228 bytes | 0x00500000 | SK |  |
| 0x00508bc5 | citywin_8BC5 | UNSET |  | 191 | 0x00500000 |  |  |
| 0x00508c84 | citywin_8C84 | UNSET |  | 160 | 0x00500000 |  |  |
| 0x00508d24 | citywin_8D24 | UNSET |  | 418 | 0x00500000 |  |  |
| 0x00508ec6 | citywin_8EC6 | UNSET |  | 354 | 0x00500000 |  |  |
| 0x00509028 | citywin_9028 | UNSET |  | 647 | 0x00500000 |  |  |
| 0x005092af | citywin_92AF | UNSET |  | 378 | 0x00500000 |  |  |
| 0x00509429 | citywin_9429 | UNSET |  | 246 | 0x00500000 |  |  |
| 0x0050951f | citywin_951F | UNSET |  | 38 | 0x00500000 |  |  |
| 0x00509545 | citywin_9545 | UNSET |  | 75 | 0x00500000 |  |  |
| 0x00509590 | handle_city_disorder | UI | citywin_open | 933 bytes | 0x00500000 | SK | 1 |
| 0x00509935 | citywin_9935 | UNSET |  | 26 | 0x00500000 |  |  |
| 0x0050994f | citywin_994F | UNSET |  | 64 | 0x00500000 |  |  |
| 0x0050998f | citywin_998F | UNSET |  | 186 | 0x00500000 |  |  |
| 0x00509a49 | citywin_9A49 | UNSET |  | 57 | 0x00500000 |  |  |
| 0x00509a82 | citywin_9A82 | UNSET |  | 26 | 0x00500000 |  |  |
| 0x00509a9c | citywin_9A9C | UNSET |  | 36 | 0x00500000 |  |  |
| 0x00509ac0 | citywin_format_turns_to_complete | UI | citywin_zoom_misc | 136 bytes | 0x00500000 | SK |  |
| 0x00509b48 | city_button_buy | UI | citywin_buy | 1642 bytes | 0x00500000 | PA | 1 |
| 0x0050a1b2 | citywin_A1B2 | FW | dialog_cleanup | 12 | 0x00500000 | NN |  |
| 0x0050a1c8 | citywin_A1C8 | FW | dialog_cleanup | 14 | 0x00500000 | NN |  |
| 0x0050a1d6 | citywin_A1D6 | UI | citywin_change | 289 | 0x00500000 | SK |  |
| 0x0050a2f7 | citywin_A2F7 | UI | citywin_change | 380 | 0x00500000 | SK |  |
| 0x0050a473 | city_button_change | UI | citywin_change | 4544 bytes | 0x00500000 | PA |  |
| 0x0050b638 | citywin_B638 | UNSET |  | 12 | 0x00500000 |  |  |
| 0x0050b644 | citywin_B644 | UNSET |  | 12 | 0x00500000 |  |  |
| 0x0050b650 | citywin_B650 | UNSET |  | 12 | 0x00500000 |  |  |
| 0x0050b666 | citywin_B666 | UNSET |  | 14 | 0x00500000 |  |  |
| 0x0050b674 | citywin_idle_timer_check | UI | citywin_idle | 218 bytes | 0x00500000 | NN | 1 |
| 0x0050b74e | city_button_rename | UI | citywin_rename | 598 bytes | 0x00500000 | SK | 1 |
| 0x0050b9a4 | citywin_B9A4 | UI | citywin_tabs | 99 | 0x00500000 | SK |  |
| 0x0050ba07 | citywin_BA07 | UI | citywin_tabs | 99 | 0x00500000 | SK |  |
| 0x0050ba6a | citywin_BA6A | UI | citywin_tabs | 99 | 0x00500000 | SK |  |
| 0x0050bacd | city_button_view | UI | citywin_view | 386 bytes | 0x00500000 | SK | 1 |
| 0x0050bc4f | citywin_BC4F | UNSET |  | 139 | 0x00500000 |  |  |
| 0x0050bcda | citywin_BCDA | UNSET |  | 57 | 0x00500000 |  |  |
| 0x0050bd13 | citywin_BD13 | UNSET |  | 607 | 0x00500000 |  |  |
| 0x0050bf72 | citywin_BF72 | UNSET |  | 607 | 0x00500000 |  |  |
| 0x0050c1d1 | city_mouse | UNSET |  | 535 | 0x00500000 |  |  |
| 0x0050c405 | citywin_C405 | UNSET |  | 34 | 0x00500000 |  |  |
| 0x0050c427 | citywin_C427 | UNSET |  | 34 | 0x00500000 |  |  |
| 0x0050c449 | citywin_C449 | UNSET |  | 75 | 0x00500000 |  |  |
| 0x0050c494 | citywin_C494 | UNSET |  | 485 | 0x00500000 |  |  |
| 0x0050c679 | citywin_C679 | UNSET |  | 118 | 0x00500000 |  |  |
| 0x0050c6ef | citywin_C6EF | UNSET |  | 180 | 0x00500000 |  |  |
| 0x0050c7a3 | citywin_C7A3 | UI | citywin_buttons | 182 | 0x00500000 | SK |  |
| 0x0050c859 | citywin_C859 | UI | citywin_buttons | 564 | 0x00500000 | SK |  |
| 0x0050ca8d | citywin_CA8D | UI | citywin_buttons | 527 | 0x00500000 | SK |  |
| 0x0050ccb3 | citywin_CCB3 | UI | citywin_buttons | 572 | 0x00500000 | SK |  |
| 0x0050cf06 | citywin_create_all_buttons | UI | citywin_buttons | 2883 bytes | 0x00500000 | SK |  |
| 0x0050dada | citywin_DADA | UNSET |  | 92 | 0x00500000 |  |  |
| 0x0050db36 | citywin_DB36 | UNSET |  | 92 | 0x00500000 |  |  |
| 0x0050db92 | citywin_DB92 | UNSET |  | 38 | 0x00500000 |  |  |
| 0x0050dbb8 | citywin_DBB8 | UNSET |  | 38 | 0x00500000 |  |  |
| 0x0050dbde | citywin_DBDE | UNSET |  | 211 | 0x00500000 |  |  |
| 0x0050dcb6 | citywin_DCB6 | UNSET |  | 498 | 0x00500000 |  |  |
| 0x0050dea8 | citywin_DEA8 | UNSET |  | 51 | 0x00500000 |  |  |
| 0x00511320 | FUN_00511320 | RN | draw | 28 | 0x00510000 | SK |  |
| 0x00511350 | clamp_to_range | RN | draw | 59 | 0x00510000 | SK |  |
| 0x005113b0 | draw_line | RN | draw | 46 | 0x00510000 | SK |  |
| 0x005113f0 | draw_3d_frame | RN | draw | 42 | 0x00510000 | SK |  |
| 0x00511430 | init_text_buffer | RN | draw | 29 | 0x00510000 | SK |  |
| 0x00511460 | invalidate_rect_region | UI | layout | 78 | 0x00510000 | SK | 1 |
| 0x005114d0 | blit_sprite_8param | RN | draw | 62 | 0x00510000 | SK |  |
| 0x00511520 | FUN_00511520 | UI | popup | 41 | 0x00510000 | SK | 1 |
| 0x00511560 | scalar_deleting_destructor_a | UNSET |  | 57 | 0x00510000 |  | Calls dtor, conditionally deletes |
| 0x005115b0 | destructor_chain_a | UNSET |  | 116 | 0x00510000 |  | Deletes *(this+0x1c), calls sub-dtors |
| 0x00511624 | dtor_helper_a1 | UNSET |  | 12 | 0x00510000 |  | CString dtor |
| 0x00511630 | dtor_helper_a2 | UNSET |  | 12 | 0x00510000 |  | CString dtor |
| 0x0051163c | dtor_helper_a3 | UNSET |  | 9 | 0x00510000 |  | Base class dtor |
| 0x0051164f | seh_epilog_a | UNSET |  | 14 | 0x00510000 |  | Restores FS:[0] |
| 0x00511690 | scale_universal | RN | draw | 67 | 0x00510000 | SK |  |
| 0x005116f0 | format_string_to_buf | RN | draw | 33 | 0x00510000 | SK |  |
| 0x00511720 | FUN_00511720 | FW | window | 123 | 0x00510000 | NN |  |
| 0x005117f0 | FUN_005117f0 | FW | window | 33 | 0x00510000 | NN |  |
| 0x00511820 | EnableStackedTabs | FW | window | 36 | 0x00510000 | NN |  |
| 0x00511850 | EnableStackedTabs | FW | window | 36 | 0x00510000 | NN |  |
| 0x00511880 | enqueue_mp_event | NW | mp_event | 398 | 0x00510000 | SK |  |
| 0x00511a0e | mp_event_list_append | NW | mp_event | 193 | 0x00510000 | SK |  |
| 0x00511acf | mp_event_list_clear | NW | mp_event | 94 | 0x00510000 | SK |  |
| 0x00511b2d | mp_check_invalidate | NW | mp_event | 117 | 0x00510000 | SK |  |
| 0x00511ba2 | dispatch_mp_event | NW | mp_event | 7252 | 0x00510000 | SK | Cases 0x64/0x65 set intelligence flags; 0x24 triggers meltdown; 0x2E/0x3B change city/govt state.... |
| 0x0051399d | FUN_0051399d | NW | mp_event | 12 | 0x00510000 | SK | dispatch cleanup dtor |
| 0x005139b3 | FUN_005139b3 | NW | mp_event | 14 | 0x00510000 | SK | SEH epilog |
| 0x00514220 | netmsg_queue_construct | NW | netmsg | 52 | 0x00510000 | SK |  |
| 0x00514254 | netmsg_queue_init | NW | netmsg | 30 | 0x00510000 | SK |  |
| 0x00514272 | netmsg_queue_reset | NW | netmsg | 237 | 0x00510000 | SK |  |
| 0x0051435f | is_alpha_message | NW | netmsg | 48 | 0x00510000 | SK |  |
| 0x0051438f | netmsg_enqueue | NW | netmsg | 1602 | 0x00510000 | SK |  |
| 0x005149d6 | netmsg_dequeue | NW | netmsg | 461 | 0x00510000 | SK |  |
| 0x00514e10 | static_init_e31 | UNSET |  | 26 | 0x00510000 |  | Calls two sub-inits |
| 0x00514e2a | static_init_e31a | UNSET |  | 26 | 0x00510000 |  | CString constructor |
| 0x00514e44 | static_init_e31b | UNSET |  | 29 | 0x00510000 |  | Registers atexit handler |
| 0x00514e61 | static_dtor_e31 | UNSET |  | 26 | 0x00510000 |  | CString destructor |
| 0x00514e7b | show_council_dialog | UI | council_advisor | 119 | 0x00510000 | SK |  |
| 0x00514ef2 | FUN_00514ef2 | FW | seh_dtor | 12 | 0x00510000 | NN | council destructor helper |
| 0x00514f08 | FUN_00514f08 | FW | seh_dtor | 14 | 0x00510000 | NN | SEH epilog |
| 0x00514f16 | council_construct | UI | council_advisor | 295 | 0x00510000 | SK |  |
| 0x005150b9 | council_destruct | UI | council_advisor | 177 | 0x00510000 | SK |  |
| 0x0051516a | thunk_FUN_0043c520 | UNSET |  | 15 | 0x00510000 |  | council sub-dtor |
| 0x00515179 | FUN_00515179 | UNSET |  | 15 | 0x00510000 |  | surface dtor |
| 0x00515188 | FUN_00515188 | UNSET |  | 15 | 0x00510000 |  | surface dtor |
| 0x00515197 | FUN_00515197 | UNSET |  | 15 | 0x00510000 |  | _Timevec dtor |
| 0x005151a6 | FUN_005151a6 | UNSET |  | 15 | 0x00510000 |  | CString dtor |
| 0x005151b5 | thunk_FUN_0044cba0 | UNSET |  | 15 | 0x00510000 |  | CWnd dtor |
| 0x005151c4 | FUN_005151c4 | UNSET |  | 15 | 0x00510000 |  | surface cleanup |
| 0x005151d3 | thunk_FUN_0044ca60 | UNSET |  | 9 | 0x00510000 |  | CWnd dtor |
| 0x005151e6 | FUN_005151e6 | UNSET |  | 14 | 0x00510000 |  | SEH epilog |
| 0x005151f4 | council_init | UI | council_advisor | 802 | 0x00510000 | SK |  |
| 0x00515516 | council_play_video | UI | council_advisor | 1122 | 0x00510000 | SK |  |
| 0x00515978 | FUN_00515978 | FW | seh_dtor | 9 | 0x00510000 | NN | council video dtor (thunk_FUN_0043c520) |
| 0x0051598b | FUN_0051598b | FW | seh_dtor | 14 | 0x00510000 | NN | SEH epilog |
| 0x00515999 | council_draw_label | UI | council_advisor | 636 | 0x00510000 | SK |  |
| 0x00515c15 | council_load_advisor_bg | UI | council_advisor | 385 | 0x00510000 | SK |  |
| 0x00515d96 | FUN_00515d96 | FW | seh_dtor | 12 | 0x00510000 | NN | surface cleanup |
| 0x00515da2 | FUN_00515da2 | FW | seh_dtor | 12 | 0x00510000 | NN | CString dtor |
| 0x00515db8 | FUN_00515db8 | FW | seh_dtor | 16 | 0x00510000 | NN | SEH epilog |
| 0x00515dc8 | council_scroll_panel | UI | council_advisor | 372 | 0x00510000 | SK |  |
| 0x00515f3c | council_scroll_down_anim | UI | council_advisor | 201 | 0x00510000 | SK |  |
| 0x00516005 | council_scroll_up_anim | UI | council_advisor | 61 | 0x00510000 | SK |  |
| 0x00516042 | council_invalidate | UI | council_advisor | 33 | 0x00510000 | SK |  |
| 0x00516063 | council_check_button | UI | council_advisor | 83 | 0x00510000 | SK |  |
| 0x00516570 | show_govt_council | UI | council_govt | 134 | 0x00510000 | SK |  |
| 0x005165f6 | FUN_005165f6 | FW | seh_dtor | 12 | 0x00510000 | NN | Calls govt_council_destruct |
| 0x0051660c | FUN_0051660c | FW | seh_dtor | 14 | 0x00510000 | NN | SEH epilog |
| 0x0051661a | govt_council_construct | UI | council_govt | 293 | 0x00510000 | SK |  |
| 0x005167d9 | govt_council_destruct | UI | council_govt | 198 | 0x00510000 | SK |  |
| 0x0051689f | FUN_0051689f | UNSET |  | 15 | 0x00510000 |  | button dtor |
| 0x005168ae | FUN_005168ae | UNSET |  | 15 | 0x00510000 |  | button dtor |
| 0x005168bd | FUN_005168bd | UNSET |  | 15 | 0x00510000 |  | button dtor |
| 0x005168cc | FUN_005168cc | UNSET |  | 15 | 0x00510000 |  | button dtor |
| 0x005168db | FUN_005168db | UNSET |  | 15 | 0x00510000 |  | button dtor |
| 0x005168ea | FUN_005168ea | UNSET |  | 15 | 0x00510000 |  | button dtor |
| 0x005168f9 | FUN_005168f9 | UNSET |  | 15 | 0x00510000 |  | _Timevec dtor |
| 0x00516908 | FUN_00516908 | UNSET |  | 15 | 0x00510000 |  | CDialog dtor |
| 0x00516917 | FUN_00516917 | UNSET |  | 15 | 0x00510000 |  | video player dtor |
| 0x00516926 | FUN_00516926 | UNSET |  | 9 | 0x00510000 |  | CWnd dtor |
| 0x00516939 | FUN_00516939 | UNSET |  | 14 | 0x00510000 |  | SEH epilog |
| 0x00516947 | council_video_init | UI | council_govt | 1672 | 0x00510000 | SK |  |
| 0x00516fd4 | council_video_run | UI | council_govt | 388 | 0x00510000 | SK |  |
| 0x00517158 | council_draw_panels | UI | council_govt | 1307 | 0x00510000 | SK |  |
| 0x00517673 | council_create_buttons | UI | council_govt | 816 | 0x00510000 | SK |  |
| 0x005179a3 | council_parse_advisor_script | UI | council_govt | 907 | 0x00510000 | SK |  |
| 0x00517dd3 | council_render_speech | UI | council_govt | 529 | 0x00510000 | SK |  |
| 0x00517fe4 | FUN_00517fe4 | UI | council_govt | 9 | 0x00510000 | SK | council speech dtor |
| 0x00517ff7 | FUN_00517ff7 | UI | council_govt | 16 | 0x00510000 | SK | SEH epilog |
| 0x00518007 | council_load_all_videos | UI | council_govt | 420 | 0x00510000 | SK |  |
| 0x005181ab | FUN_005181ab | FW | seh_dtor | 9 | 0x00510000 | NN | surface dtor |
| 0x005181b4 | FUN_005181b4 | FW | seh_dtor | 12 | 0x00510000 | NN | CString dtor |
| 0x005181ca | FUN_005181ca | FW | seh_dtor | 14 | 0x00510000 | NN | SEH epilog |
| 0x005181d8 | council_handle_button | UI | council_govt | 362 | 0x00510000 | SK |  |
| 0x00518342 | council_position_video | UI | council_govt | 80 | 0x00510000 | SK |  |
| 0x00518392 | parse_advisor_letter | UI | council_govt | 122 | 0x00510000 | SK |  |
| 0x00518471 | council_auto_advance | UI | council_govt | 273 | 0x00510000 | SK |  |
| 0x00518582 | get_advisor_recommendation | UI | council_govt | 177 | 0x00510000 | SK | Dispatches to 5 AI advisor scoring functions (004bc480..004bd2a3). Dispatch only — scoring logic ... |
| 0x00518e80 | video_set_position | UI | council_govt | 47 | 0x00510000 | SK |  |
| 0x00518ec0 | show_input_dialog_int | UI | council_govt | 41 | 0x00510000 | SK |  |
| 0x00518f00 | init_scrollbar_list | UI | scrollbar | 365 | 0x00510000 | SK | 1 |
| 0x005190d0 | FUN_005190d0 | UNSET |  | 26 | 0x00510000 |  | static_init_dialog_obj: calls ctor + atexit |
| 0x005190ea | FUN_005190ea | UNSET |  | 31 | 0x00510000 |  | static_init_dialog_ctor: CDialog(0x4000) |
| 0x00519109 | FUN_00519109 | UNSET |  | 29 | 0x00510000 |  | static_init_dialog_atexit: _atexit(dtor) |
| 0x00519126 | FUN_00519126 | UNSET |  | 26 | 0x00510000 |  | static_dtor_dialog: CDialog dtor |
| 0x00519140 | close_active_popup | UI | dialog | 49 bytes | 0x00510000 | SK |  |
| 0x00519171 | show_popup_labeled | UI | editor | 77 | 0x00510000 | SK |  |
| 0x00519200 | load_terrain_rules_to_editor | UI | editor | 493 | 0x00510000 | SK |  |
| 0x005193ed | save_terrain_rules_from_editor | UI | editor | 471 | 0x00510000 | SK |  |
| 0x005195c4 | adjust_combo_index_down | UI | editor | 45 | 0x00510000 | SK |  |
| 0x005195f1 | adjust_combo_index_up | UI | editor | 45 | 0x00510000 | SK |  |
| 0x0051961e | editor_populate_controls | UI | editor | 391 | 0x00510000 | SK |  |
| 0x005197af | editor_read_controls | UI | editor | 496 | 0x00510000 | SK |  |
| 0x005199a9 | editor_refresh_display | UI | editor | 27 | 0x00510000 | SK |  |
| 0x005199c4 | format_terrain_type_name | UI | editor | 236 | 0x00510000 | SK |  |
| 0x00519ab0 | export_terrain_rules_to_file | UI | editor | 695 | 0x00510000 | SK |  |
| 0x00519d67 | show_messagebox_9D67 | UI | editor | 269 | 0x00510000 | SK |  |
| 0x00519e74 | editor_rename_terrain | UI | editor | 881 | 0x00510000 | SK |  |
| 0x0051a1e5 | editor_show_terrain_help | UI | editor | 95 | 0x00510000 | SK |  |
| 0x0051a244 | editor_cancel_changes | UI | editor | 40 | 0x00510000 | SK |  |
| 0x0051a26c | editor_select_terrain_sprite | UI | editor | 1036 | 0x00510000 | SK |  |
| 0x0051a678 | editor_select_river_sprite | UI | editor | 287 | 0x00510000 | SK |  |
| 0x0051a797 | editor_select_coast_sprite | UI | editor | 288 | 0x00510000 | SK |  |
| 0x0051a8b7 | editor_select_misc_sprite | UI | editor | 407 | 0x00510000 | SK |  |
| 0x0051aa4e | editor_toggle_resource_visibility | UI | editor | 644 | 0x00510000 | SK |  |
| 0x0051acdc | editor_handle_command | UI | editor | 289 | 0x00510000 | SK |  |
| 0x0051adfd | editor_create_control | UI | editor | 931 | 0x00510000 | SK |  |
| 0x0051b1c2 | editor_create_edit_field | UI | editor | 244 | 0x00510000 | SK |  |
| 0x0051b2b6 | editor_paint | UI | editor | 2283 | 0x00510000 | SK |  |
| 0x0051bba1 | terrain_editor_main | UI | editor | 2646 | 0x00510000 | SK |  |
| 0x0051c611 | FUN_0051c611 | FW | seh_dtor | 12 | 0x00510000 | NN | surface cleanup |
| 0x0051c627 | FUN_0051c627 | FW | seh_dtor | 14 | 0x00510000 | NN | SEH epilog |
| 0x0051c635 | launch_terrain_editor | UI | editor | 89 | 0x00510000 | SK |  |
| 0x0051c68e | thunk_FUN_004183d0 | FW | seh_dtor | 12 | 0x00510000 | NN | editor launch dtor |
| 0x0051c6a4 | FUN_0051c6a4 | FW | seh_dtor | 14 | 0x00510000 | NN | SEH epilog |
| 0x0051d3e0 | show_dialog_with_checkboxes | UI | dialog | 351 | 0x00510000 | SK |  |
| 0x0051d53f | FUN_0051d53f | FW | seh_dtor | 12 | 0x00510000 | NN | CDialog dtor |
| 0x0051d555 | FUN_0051d555 | FW | seh_dtor | 15 | 0x00510000 | NN | SEH epilog |
| 0x0051d564 | show_dialog_with_image | UI | dialog | 178 | 0x00510000 | SK |  |
| 0x0051d616 | FUN_0051d616 | FW | seh_dtor | 12 | 0x00510000 | NN | CDialog dtor |
| 0x0051d62c | FUN_0051d62c | FW | seh_dtor | 15 | 0x00510000 | NN | SEH epilog |
| 0x0051d63b | show_input_dialog | UI | dialog | 253 | 0x00510000 | SK |  |
| 0x0051d738 | FUN_0051d738 | FW | seh_dtor | 12 | 0x00510000 | NN | CDialog dtor |
| 0x0051d74e | FUN_0051d74e | FW | seh_dtor | 15 | 0x00510000 | NN | SEH epilog |
| 0x0051d75d | show_numeric_input_dialog | UI | dialog | 95 | 0x00510000 | SK |  |
| 0x0051d7bc | clear_checkbox_flags | UI | dialog | 26 | 0x00510000 | SK |  |
| 0x0051d7d6 | set_checkbox_flag | UI | dialog | 65 | 0x00510000 | SK |  |
| 0x0051d817 | get_checkbox_flag | UI | dialog | 32 | 0x00510000 | SK |  |
| 0x0051d950 | to_uppercase | UI | dialog | 58 | 0x00510000 | SK |  |
| 0x0051d9a0 | mp_startup_config | NW | mp_setup | 952 | 0x00510000 | SK | Reads INI: NetTimeOut, Adapter, MaxPlayers (4-7) |
| 0x0051dd72 | FUN_0051dd72 | FW | seh_dtor | 12 | 0x00510000 | NN | CDialog dtor |
| 0x0051dd88 | FUN_0051dd88 | FW | seh_dtor | 15 | 0x00510000 | NN | SEH epilog |
| 0x0051dd97 | new_game_setup | NW | mp_setup | 3152 | 0x00510000 | SK | Sets difficulty, AI count, barbarian level, game options bitmask. Random barbarian formula branch... |
| 0x0051e9e7 | FUN_0051e9e7 | FW | seh_dtor | 12 | 0x00510000 | NN | new game CDialog dtor |
| 0x0051e9fd | FUN_0051e9fd | FW | seh_dtor | 15 | 0x00510000 | NN | SEH epilog |
| 0x0051ea0c | mp_check_invalidate_2 | NW | mp_event | 130 | 0x00510000 | SK |  |
| 0x0051ea8e | game_timer_dialog | NW | mp_event | 1579 | 0x00510000 | SK | Turn timer presets (0/30s/60s/2m/3m/5m/custom 10-3600s). Negative input toggles hidden flag |
| 0x0051f0f5 | FUN_0051f0f5 | FW | seh_dtor | 12 | 0x00510000 | NN | CDialog dtor |
| 0x0051f10b | FUN_0051f10b | FW | seh_dtor | 15 | 0x00510000 | NN | SEH epilog |
| 0x0051f11a | mp_check_invalidate_3 | NW | mp_event | 100 | 0x00510000 | SK |  |
| 0x0051f17e | mp_process_messages | NW | mp_event | 30 | 0x00510000 | SK |  |
| 0x0051f19c | civ_selection_dialog | UI | civ_select | 9815 bytes | 0x00510000 | SK | 1 |
| 0x00521807 | mp_scenario_load_dtor_thunk | FW | seh_dtor | 12 bytes | 0x00520000 | NN |  |
| 0x0052181d | mp_scenario_load_seh_epilog | FW | seh_epilog | 15 bytes | 0x00520000 | NN |  |
| 0x0052182c | mp_build_label_string | MP | setup | 159 bytes | 0x00520000 | SK |  |
| 0x005218cb | mp_scenario_load_dialog | MP | setup | 1764 bytes | 0x00520000 | SK |  |
| 0x00521faf | mp_scenario_load_cleanup | FW | seh_cleanup | 12 bytes | 0x00520000 | NN | 1 |
| 0x00521fbb | mp_scenario_load_dtor2 | FW | seh_dtor | 12 bytes | 0x00520000 | NN |  |
| 0x00521fd1 | mp_scenario_load_seh_epilog2 | FW | seh_epilog | 15 bytes | 0x00520000 | NN |  |
| 0x00521fe0 | mp_choose_players_dialog | MP | setup | 1591 bytes | 0x00520000 | SK |  |
| 0x00522617 | mp_choose_players_dtor | FW | seh_dtor | 12 bytes | 0x00520000 | NN |  |
| 0x0052262d | mp_choose_players_seh_epilog | FW | seh_epilog | 15 bytes | 0x00520000 | NN |  |
| 0x0052263c | mp_set_animation_style | MP | animation | 185 bytes | 0x00520000 | NN | 1 |
| 0x005226fa | mp_get_scroll_offset | MP | setup | 192 bytes | 0x00520000 | SK |  |
| 0x005227e3 | mp_hotseat_config_dialog | MP | setup | 773 bytes | 0x00520000 | SK |  |
| 0x00522b06 | mp_hotseat_dtor | FW | seh_dtor | 12 bytes | 0x00520000 | NN |  |
| 0x00522b1c | mp_hotseat_seh_epilog | FW | seh_epilog | 15 bytes | 0x00520000 | NN |  |
| 0x00522b2b | mp_join_game_handler | MP | setup | 683 bytes | 0x00520000 | SK |  |
| 0x00522dd6 | mp_join_dtor | FW | seh_dtor | 12 bytes | 0x00520000 | NN |  |
| 0x00522dec | mp_join_seh_epilog | FW | seh_epilog | 14 bytes | 0x00520000 | NN |  |
| 0x00522dfa | mp_negate_leader_ids | MP | setup | 405 bytes | 0x00520000 | SK |  |
| 0x00522f8f | mp_assign_ai_opponents | MP | setup | 1097 bytes | 0x00520000 | SK |  |
| 0x005233d8 | mp_ai_opponents_dtor | FW | seh_dtor | 12 bytes | 0x00520000 | NN |  |
| 0x005233ee | mp_ai_opponents_seh_epilog | FW | seh_epilog | 14 bytes | 0x00520000 | NN |  |
| 0x005233fc | mp_register_network_player | MP | setup | 2446 bytes | 0x00520000 | SK |  |
| 0x00523d8a | mp_send_network_state_all | MP | setup | 376 bytes | 0x00520000 | SK |  |
| 0x00523f02 | mp_choose_additional_player | MP | setup | 1976 bytes | 0x00520000 | SK |  |
| 0x005246bf | mp_choose_add_dtor | FW | seh_dtor | 12 bytes | 0x00520000 | NN |  |
| 0x005246d5 | mp_choose_add_seh_epilog | FW | seh_epilog | 15 bytes | 0x00520000 | NN |  |
| 0x005261a0 | civpedia_init_list | UI | civpedia | 365 bytes | 0x00520000 | SK |  |
| 0x0052630d | civpedia_draw_detail | UI | civpedia | 1542 bytes | 0x00520000 | SK |  |
| 0x00526913 | civpedia_select_item | UI | civpedia | 334 bytes | 0x00520000 | SK |  |
| 0x00526ca0 | parley_add_dialog_panel | UI | parley_panel | 26152 bytes | 0x00520000 | SK | 1 |
| 0x0052d4d2 | parley_on_treaty_status_select | UI | parley_handler | 81 bytes | 0x00520000 | SK |  |
| 0x0052d523 | parley_on_demand_type_select | UI | parley_handler | 101 bytes | 0x00520000 | SK |  |
| 0x0052d588 | parley_on_generic_select | UI | parley_handler | 85 bytes | 0x00520000 | SK |  |
| 0x0052d5dd | parley_on_tribute_type_select | UI | parley_handler | 265 bytes | 0x00520000 | SK |  |
| 0x0052d6ff | parley_on_war_peace_select | UI | parley_handler | 216 bytes | 0x00520000 | SK |  |
| 0x0052d7dc | parley_on_propose_item_toggle | UI | parley_handler | 425 bytes | 0x00520000 | SK |  |
| 0x0052d9a1 | parley_on_timer_tick | UI | parley_handler | 130 bytes | 0x00520000 | SK |  |
| 0x0052da23 | parley_reject_proposals | UI | parley_handler | 282 bytes | 0x00520000 | SK |  |
| 0x0052db3d | parley_accept_proposals | UI | parley_handler | 321 bytes | 0x00520000 | SK |  |
| 0x0052dc7e | parley_show_intelligence | UI | parley_handler | 245 bytes | 0x00520000 | SK |  |
| 0x0052dd73 | parley_advance_negotiation | UI | parley_statemachine | 1425 bytes | 0x00520000 | SK |  |
| 0x0052e326 | parley_go_back | UI | parley_statemachine | 381 bytes | 0x00520000 | SK |  |
| 0x0052e4c9 | parley_on_accept_deal | UI | parley_statemachine | 179 bytes | 0x00520000 | SK |  |
| 0x0052e57c | parley_on_reject_deal | UI | parley_statemachine | 265 bytes | 0x00520000 | SK |  |
| 0x0052e685 | parley_on_end_negotiations | UI | parley_statemachine | 149 bytes | 0x00520000 | SK |  |
| 0x0052e71a | parley_on_civ_button_click | UI | parley_handler | 152 bytes | 0x00520000 | SK |  |
| 0x0052e7b7 | parley_on_checkbox_state_change | UI | parley_handler | 389 bytes | 0x00520000 | SK |  |
| 0x0052e971 | parley_update_button_states | UI | parley_buttons | 678 bytes | 0x00520000 | SK | 1 |
| 0x0052ec47 | find_unit_by_alive_flag | GL | lookup | 329 bytes | 0x00520000 | R |  |
| 0x0052ed95 | find_city_by_id | GL | lookup | 128 bytes | 0x00520000 | R |  |
| 0x00530e80 | streambuf_egptr | FW | streambuf | 28 bytes | 0x00530000 | NN |  |
| 0x00530eb0 | streambuf_setegptr | FW | streambuf | 33 bytes | 0x00530000 | NN |  |
| 0x00530ee0 | listbox_create_window | UI | listbox | 167 bytes | 0x00530000 | NN |  |
| 0x00530fb0 | listbox_set_flag | UI | listbox | 32 bytes | 0x00530000 | NN |  |
| 0x00530fe0 | ios_width | UI | listbox | 28 bytes | 0x00530000 | NN |  |
| 0x00531010 | scrollbar_init | UI | scrollbar | 93 bytes | 0x00530000 | NN |  |
| 0x005310a0 | scrollbar_create_window | UI | scrollbar | 207 bytes | 0x00530000 | NN |  |
| 0x005311b0 | scrollbar_set_field_2c | UI | scrollbar | 33 bytes | 0x00530000 | NN |  |
| 0x005311e0 | scrollbar_set_field_30 | UI | scrollbar | 33 bytes | 0x00530000 | NN |  |
| 0x00531210 | ai_set_active_civ | AI | civ_setup | 83 bytes | 0x00530000 | R | 1 |
| 0x00531263 | map_coord_to_linear | AI | map_util | 36 bytes | 0x00530000 | R | 1 |
| 0x00531287 | ai_get_unit_role | AI | unit_role | 93 bytes | 0x00530000 | PA | 1 |
| 0x005312e4 | ai_find_best_settle_dir | AI | settle | 643 bytes | 0x00530000 | PA | 1 |
| 0x00531567 | ai_cancel_goto_on_domain | AI | unit_order | 160 bytes | 0x00530000 | R |  |
| 0x00531607 | ai_set_goto_order | AI | unit_order | 76 bytes | 0x00530000 | R |  |
| 0x00531653 | ai_set_goto_via_coast | AI | unit_order | 501 bytes | 0x00530000 | R |  |
| 0x0053184d | ai_process_civ_turn | AI | civ_turn | 14665 bytes | 0x00530000 | R | 1 |
| 0x005351aa | ai_barbarian_unit_turn | AI | barbarian | 6102 bytes | 0x00530000 | PA | 1 |
| 0x005369f3 | ai_alert_nearby_units | AI | alert | 470 bytes | 0x00530000 | R | 1 |
| 0x00536bc9 | ai_calc_continent_city_weight | AI | scoring | 131 bytes | 0x00530000 | R | 1 |
| 0x00536c4c | ai_find_nuke_target | AI | nuke | 1760 bytes | 0x00530000 | PA | 1 |
| 0x00537331 | ai_naval_and_ranged_move | AI | naval_ranged | 5855 bytes | 0x00530000 | PA | 1 |
| 0x00538a29 | ai_unit_turn_master | AI | unit_master | 44777 bytes | 0x00530000 | PA | 1 |
| 0x00543b80 | ai_try_settle_unit | AI | unit_automation | 322 bytes | 0x00540000 | PA |  |
| 0x00543cd6 | ai_process_unit_automation | AI | unit_automation | 801 bytes | 0x00540000 | PA |  |
| 0x00548b70 | calc_icon_spacing | UI | layout_util | 264 bytes | 0x00540000 | SK |  |
| 0x00548c78 | draw_icon_row_spaced | UI | layout_util | 246 bytes | 0x00540000 | SK |  |
| 0x00548df0 | events_editor_set_focus | UI | events_editor | 51 bytes | 0x00540000 | SK |  |
| 0x00548e23 | write_event_actions | UI | events_editor | 3045 bytes | 0x00540000 | SK |  |
| 0x00549aee | write_all_events | UI | events_editor | 2113 bytes | 0x00540000 | SK |  |
| 0x0054a4c4 | save_events_file | UI | events_editor | 894 bytes | 0x00540000 | SK |  |
| 0x0054a874 | get_nth_set_bit | UI | events_editor | 95 bytes | 0x00540000 | SK |  |
| 0x0054a8d3 | count_lower_set_bits | UI | events_editor | 63 bytes | 0x00540000 | SK |  |
| 0x0054a912 | show_event_picker_dialog | UI | events_editor | 1125 bytes | 0x00540000 | SK |  |
| 0x0054ada1 | picker_dialog_cleanup | FW | seh_thunk | 12 bytes | 0x00540000 | NN |  |
| 0x0054adb7 | picker_dialog_seh_unwind | FW | seh_thunk | 15 bytes | 0x00540000 | NN |  |
| 0x0054adc6 | pick_event_civ_receiver | UI | events_editor | 205 bytes | 0x00540000 | SK |  |
| 0x0054ae93 | update_event_action_buttons | UI | events_editor | 602 bytes | 0x00540000 | SK |  |
| 0x0054b0ed | show_messagebox_B0ED | UI | events_editor | 232 bytes | 0x00540000 | SK |  |
| 0x0054b1d5 | show_trigger_help | UI | events_editor | 238 bytes | 0x00540000 | SK |  |
| 0x0054b2ec | show_action_help | UI | events_editor | 274 bytes | 0x00540000 | SK |  |
| 0x0054b433 | handle_help_button | UI | events_editor | 440 bytes | 0x00540000 | SK |  |
| 0x0054b5eb | events_editor_reset | UI | events_editor | 74 bytes | 0x00540000 | SK |  |
| 0x0054b635 | populate_trigger_listbox | UI | events_editor | 1239 bytes | 0x00540000 | SK |  |
| 0x0054bc1a | populate_action_listbox | UI | events_editor | 1866 bytes | 0x00540000 | SK |  |
| 0x0054c36e | delete_event | UI | events_editor | 307 bytes | 0x00540000 | SK |  |
| 0x0054c4a1 | edit_event_trigger | UI | events_editor | 3867 bytes | 0x00540000 | SK |  |
| 0x0054d4ca | edit_event_trigger_wrapper | FW | seh_thunk | 28 bytes | 0x00540000 | NN |  |
| 0x0054d4e6 | show_messagebox_D4E6 | UI | events_editor | 500 bytes | 0x00540000 | SK |  |
| 0x0054d6da | delete_event_action | UI | events_editor | 277 bytes | 0x00540000 | SK |  |
| 0x0054d7ef | edit_event_action | UI | events_editor | 5782 bytes | 0x00540000 | SK |  |
| 0x0054ee8f | edit_action_cleanup | FW | seh_thunk | 12 bytes | 0x00540000 | NN |  |
| 0x0054eea5 | edit_action_seh_unwind | FW | seh_thunk | 15 bytes | 0x00540000 | NN |  |
| 0x0054eeb4 | edit_event_action_wrapper | FW | seh_thunk | 28 bytes | 0x00540000 | NN |  |
| 0x0054eed0 | show_messagebox_EED0 | UI | events_editor | 667 bytes | 0x00540000 | SK |  |
| 0x0054f16b | events_editor_paint | UI | events_editor | 590 bytes | 0x00540000 | SK |  |
| 0x0054f3b9 | events_editor_init | UI | events_editor | 3035 bytes | 0x00540000 | SK |  |
| 0x0054ffa4 | events_editor_window_cleanup | FW | seh_thunk | 12 bytes | 0x00540000 | NN |  |
| 0x0054ffba | events_editor_seh_unwind | FW | seh_thunk | 14 bytes | 0x00540000 | NN |  |
| 0x0054ffc8 | open_events_editor | UI | events_editor | 79 bytes | 0x00540000 | SK |  |
| 0x00550017 | thunk_wrapper_4183d0 | UNSET |  | 12 | 0x00550000 |  | Thunk to FUN_004183d0 |
| 0x0055002d | seh_epilog_002d | UNSET |  | 14 | 0x00550000 |  | SEH — restores FS:[0] |
| 0x00551cd0 | scalar_deleting_destructor | UNSET |  | 57 | 0x00550000 |  | MFC pattern: call dtor, conditionally free |
| 0x00551d20 | streambuf::egptr | UNSET |  | 28 | 0x00550000 |  | Library: returns `this+0x2c |
| 0x00551d50 | dlg_send_3dbf | UI | dialog_framework | 37 bytes | 0x00550000 | SK |  |
| 0x00551d80 | dlg_send_3e92 | UI | dialog_framework | 43 bytes | 0x00550000 | SK |  |
| 0x00551dc0 | dlg_set_field_30 | UI | dialog_framework | 33 bytes | 0x00550000 | SK |  |
| 0x00551df0 | dlg_set_field_34 | UI | dialog_framework | 33 bytes | 0x00550000 | SK |  |
| 0x00551e20 | dlg_log_normal | UI | dialog_framework | 41 bytes | 0x00550000 | SK |  |
| 0x00551e60 | dlg_log_debug | UI | dialog_framework | 41 bytes | 0x00550000 | SK |  |
| 0x00551ea0 | crt_static_init_1 | UNSET |  | 26 | 0x00550000 |  | Calls init+atexit pair |
| 0x00551eba | crt_alloc_16 | UNSET |  | 30 | 0x00550000 |  | thunk_FUN_0043c460(0, 0x10) |
| 0x00551ed8 | crt_register_atexit_1 | UNSET |  | 29 | 0x00550000 |  | Registers FUN_00551ef5 via _atexit |
| 0x00551ef5 | crt_static_dtor_1 | UNSET |  | 26 | 0x00550000 |  | Thunk to thunk_FUN_0043c520 |
| 0x00551f0f | crt_static_init_2 | UNSET |  | 26 | 0x00550000 |  | Calls init+atexit pair |
| 0x00551f29 | crt_alloc_10 | UNSET |  | 30 | 0x00550000 |  | thunk_FUN_0043c460(0, 10) |
| 0x00551f47 | crt_register_atexit_2 | UNSET |  | 29 | 0x00550000 |  | Registers FUN_00551f64 via _atexit |
| 0x00551f64 | crt_static_dtor_2 | UNSET |  | 26 | 0x00550000 |  | Thunk to thunk_FUN_0043c520 |
| 0x00551f7e | crt_static_init_3 | UNSET |  | 26 | 0x00550000 |  | Calls init+atexit pair |
| 0x00551f98 | crt_alloc_16b | UNSET |  | 30 | 0x00550000 |  | thunk_FUN_0043c460(0, 0x10) |
| 0x00551fb6 | crt_register_atexit_3 | UNSET |  | 29 | 0x00550000 |  | Registers FUN_00551fd3 via _atexit |
| 0x00551fd3 | crt_static_dtor_3 | UNSET |  | 26 | 0x00550000 |  | Thunk to thunk_FUN_0043c520 |
| 0x00551fed | init_dialog_metrics | UI | dialog_framework | 269 bytes | 0x00550000 | SK |  |
| 0x005520fa | set_dialog_background | UI | dialog_framework | 24 bytes | 0x00550000 | SK |  |
| 0x00552112 | dialog_paint_titlebar | UI | dialog_framework | 3401 bytes | 0x00550000 | SK |  |
| 0x00552e5b | dialog_button_click | UI | dialog_framework | 119 bytes | 0x00550000 | SK |  |
| 0x00552ed2 | dialog_create_buttons | UI | dialog_framework | 698 bytes | 0x00550000 | SK |  |
| 0x0055318c | dialog_add_button | UI | dialog_framework | 192 bytes | 0x00550000 | SK |  |
| 0x0055324c | dialog_set_title | UI | dialog_framework | 139 bytes | 0x00550000 | SK |  |
| 0x005532d7 | dialog_destroy_buttons | UI | dialog_framework | 162 bytes | 0x00550000 | SK |  |
| 0x00553379 | dialog_cleanup | UI | dialog_framework | 38 bytes | 0x00550000 | SK |  |
| 0x0055339f | dialog_ctor | UI | dialog_framework | 165 bytes | 0x00550000 | SK |  |
| 0x00553444 | dialog_dtor | UNSET |  | 87 | 0x00550000 |  | Sets vtable, destroys buttons, chains base dtor |
| 0x0055349b | dialog_base_dtor | UNSET |  | 9 | 0x00550000 |  | Thunk to thunk_FUN_0044cba0 |
| 0x005534ae | seh_epilog_34ae | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x005534bc | dialog_create | UI | dialog_framework | 2164 bytes | 0x00550000 | SK |  |
| 0x00553d30 | dialog_set_callback_60 | UI | dialog_framework | 64 bytes | 0x00550000 | SK |  |
| 0x00553d70 | dialog_set_callback_64 | UI | dialog_framework | 64 bytes | 0x00550000 | SK |  |
| 0x00553db0 | validate_folder_name | UI | cheat_menu | 77 bytes | 0x00550000 | SK |  |
| 0x00553dfd | create_scenario_folder | UI | cheat_menu | 505 bytes | 0x00550000 | SK |  |
| 0x00553ff6 | toggle_cheat_mode | UI | cheat_menu | 335 bytes | 0x00550000 | SK |  |
| 0x00554145 | cheat_pick_civ | UI | cheat_menu | 301 bytes | 0x00550000 | SK |  |
| 0x00554272 | seh_cleanup_54272 | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x00554288 | seh_epilog_54288 | UNSET |  | 15 | 0x00550000 |  | SEH epilog |
| 0x00554297 | toggle_cheat_multiplayer | UI | cheat_menu | 396 bytes | 0x00550000 | SK |  |
| 0x00554423 | cheat_reveal_map | UNSET |  | 61 | 0x00550000 |  |  |
| 0x00554460 | cheat_toggle_all_tech | UNSET |  | 371 | 0x00550000 |  |  |
| 0x005545d3 | cheat_edit_tech | UNSET |  | 870 | 0x00550000 |  |  |
| 0x0055493e | seh_cleanup_5493e | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x00554954 | seh_epilog_54954 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x00554962 | cheat_change_govt | UNSET |  | 61 | 0x00550000 |  |  |
| 0x0055499f | cheat_edit_terrain | UNSET |  | 2032 | 0x00550000 |  |  |
| 0x0055518f | seh_cleanup_5518f | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x005551a5 | seh_epilog_551a5 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x005551b3 | cheat_place_unit | UNSET |  | 1059 | 0x00550000 |  |  |
| 0x005555eb | seh_cleanup_555eb | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x00555601 | seh_epilog_55601 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x0055560f | cheat_change_player | UNSET |  | 524 | 0x00550000 |  |  |
| 0x0055581b | seh_cleanup_5581b | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x00555831 | seh_epilog_55831 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x0055583f | cheat_change_human_civ | UNSET |  | 415 | 0x00550000 |  |  |
| 0x005559de | seh_cleanup_559de | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x005559f4 | seh_epilog_559f4 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x00555a02 | cheat_set_game_year | UNSET |  | 137 | 0x00550000 |  |  |
| 0x00555a8b | cheat_destroy_civ | UNSET |  | 514 | 0x00550000 |  |  |
| 0x00555c8d | seh_cleanup_55c8d | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x00555ca3 | seh_epilog_55ca3 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x00555cb1 | cheat_edit_unit_at_cursor | UNSET |  | 60 | 0x00550000 |  |  |
| 0x00555ced | get_ai_continent_goal_icon | UI | cheat_menu | 131 bytes | 0x00550000 | SK |  |
| 0x00555d70 | cheat_show_ai_goals | UNSET |  | 857 | 0x00550000 |  |  |
| 0x005560c9 | cheat_reveal_map_area | UNSET |  | 147 | 0x00550000 |  |  |
| 0x0055615c | cheat_set_money | UNSET |  | 255 | 0x00550000 |  |  |
| 0x0055625b | cheat_edit_unit | UNSET |  | 1892 | 0x00550000 |  |  |
| 0x005569bf | seh_cleanup_569bf | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x005569d5 | seh_epilog_569d5 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x005569e3 | set_city_shields | UNSET |  | 1357 | 0x00550000 |  |  |
| 0x00556f30 | seh_cleanup_56f30 | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x00556f46 | seh_epilog_56f46 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x00556f54 | cheat_edit_civ | UNSET |  | 3764 | 0x00550000 |  |  |
| 0x00557e08 | seh_cleanup_57e08 | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x00557e1e | seh_epilog_57e1e | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x00557e2c | cheat_edit_victory | UNSET |  | 843 | 0x00550000 |  |  |
| 0x00558177 | seh_cleanup_58177 | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x0055818d | seh_epilog_5818d | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x0055819b | cheat_edit_rules | UNSET |  | 274 | 0x00550000 |  |  |
| 0x005582ad | cheat_edit_scenario | UNSET |  | 1648 | 0x00550000 |  |  |
| 0x0055891d | cheat_save_game | UNSET |  | 26 | 0x00550000 |  |  |
| 0x00559c20 | crt_static_init_miniframe | UNSET |  | 26 | 0x00550000 |  | CRT static init for CMiniFrameWnd at DAT_006ab1b8 |
| 0x00559c3a | crt_init_miniframe | UNSET |  | 26 | 0x00550000 |  | Thunk to FUN_00559e3c |
| 0x00559c54 | crt_register_atexit_miniframe | UNSET |  | 29 | 0x00550000 |  | Registers dtor via _atexit |
| 0x00559c71 | crt_dtor_miniframe | UNSET |  | 26 | 0x00550000 |  | CMiniFrameWnd::~CMiniFrameWnd on DAT_006ab1b8 |
| 0x00559c8b | crt_static_init_surface | UNSET |  | 26 | 0x00550000 |  | CRT static init for surface object |
| 0x00559ca5 | crt_init_surface_obj | UNSET |  | 26 | 0x00550000 |  | Thunk to FUN_005bd630 |
| 0x00559cbf | crt_register_atexit_surface | UNSET |  | 29 | 0x00550000 |  | Registers FUN_00559cdc via _atexit |
| 0x00559cdc | crt_dtor_surface_obj | UNSET |  | 26 | 0x00550000 |  | Thunk to FUN_005bd915 |
| 0x00559cf6 | video_create_surface | UNSET |  | 199 | 0x00550000 |  |  |
| 0x00559dbd | FUN_00559dbd | UNSET |  | 12 | 0x00550000 |  |  |
| 0x00559dc9 | FUN_00559dc9 | UNSET |  | 12 | 0x00550000 |  |  |
| 0x00559ddf | seh_epilog_59ddf | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x00559ded | video_init_playback_params | UNSET |  | 79 | 0x00550000 |  |  |
| 0x00559e3c | video_window_ctor | UNSET |  | 118 | 0x00550000 |  |  |
| 0x00559ed4 | video_window_dtor | UNSET |  | 92 | 0x00550000 |  | Destroys playback, timevec, chains base dtors |
| 0x00559f30 | video_destroy_timevec | UNSET |  | 15 | 0x00550000 |  | Destroys _Timevec at this+0x2F8 |
| 0x00559f3f | video_dtor_base | UNSET |  | 9 | 0x00550000 |  | Chains to COleCntrFrameWnd dtor |
| 0x00559f52 | seh_epilog_59f52 | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x00559f60 | video_blit_rect | UNSET |  | 111 | 0x00550000 |  |  |
| 0x00559fcf | video_prepare_and_blit | UNSET |  | 60 | 0x00550000 |  |  |
| 0x0055a00b | FUN_0055a00b | UNSET |  | 70 | 0x00550000 |  |  |
| 0x0055a051 | video_render_frame | UNSET |  | 144 | 0x00550000 |  |  |
| 0x0055a0e1 | FUN_0055a0e1 | UNSET |  | 44 | 0x00550000 |  |  |
| 0x0055a10d | FUN_0055a10d | UNSET |  | 81 | 0x00550000 |  |  |
| 0x0055a15e | FUN_0055a15e | UNSET |  | 26 | 0x00550000 |  |  |
| 0x0055a178 | FUN_0055a178 | UNSET |  | 26 | 0x00550000 |  |  |
| 0x0055a192 | calc_window_position | UI | window_layout | 407 bytes | 0x00550000 | SK |  |
| 0x0055a329 | get_popup_dimensions | UI | window_layout | 244 bytes | 0x00550000 | SK |  |
| 0x0055a41d | show_popup_window | UI | window_layout | 330 bytes | 0x00550000 | SK |  |
| 0x0055a567 | FUN_0055a567 | UNSET |  | 61 | 0x00550000 |  |  |
| 0x0055a5a4 | FUN_0055a5a4 | UNSET |  | 64 | 0x00550000 |  |  |
| 0x0055a5e4 | load_intro_dll | UNSET |  | 102 | 0x00550000 |  |  |
| 0x0055a64a | unload_intro_dll | UNSET |  | 65 | 0x00550000 |  |  |
| 0x0055a930 | FUN_0055a930 | UNSET |  | 56 | 0x00550000 |  |  |
| 0x0055a980 | build_trade_route_map | GL | trade_route | 695 bytes | 0x00550000 | R |  |
| 0x0055ac37 | find_trade_tile | GL | trade_route | 180 bytes | 0x00550000 | R |  |
| 0x0055add0 | app_entry_point | GL | app_entry | 140 bytes | 0x00550000 | SK | 2 |
| 0x0055ae80 | stop_turn_timer | GL | turn_timer | 174 bytes | 0x00550000 | R |  |
| 0x0055af2e | start_turn_timer | GL | turn_timer | 280 bytes | 0x00550000 | R |  |
| 0x0055b046 | resume_turn_timer | GL | turn_timer | 181 bytes | 0x00550000 | R |  |
| 0x0055b0fb | turn_timer_tick | GL | turn_timer | 459 bytes | 0x00550000 | R |  |
| 0x0055b2c6 | end_turn_prompt | GL | turn_timer | 258 bytes | 0x00550000 | R |  |
| 0x0055b3c8 | kill_drag_timer | GL | turn_timer | 53 bytes | 0x00550000 | SK |  |
| 0x0055b3fd | restart_drag_timer | GL | turn_timer | 84 bytes | 0x00550000 | SK |  |
| 0x0055b451 | check_drag_timeout | GL | turn_timer | 45 bytes | 0x00550000 | SK |  |
| 0x0055b47e | enter_window_drag | GL | mp_sync | 151 bytes | 0x00550000 | SK |  |
| 0x0055b515 | exit_window_drag | GL | mp_sync | 137 bytes | 0x00550000 | SK |  |
| 0x0055b59e | cancel_window_drag | GL | mp_sync | 92 bytes | 0x00550000 | SK |  |
| 0x0055b5fa | check_drag_timeout_mp | GL | mp_sync | 120 bytes | 0x00550000 | SK |  |
| 0x0055b677 | check_drag_invalidate | GL | mp_sync | 80 bytes | 0x00550000 | SK |  |
| 0x0055b6c7 | handle_resign | GL | resign | 1273 bytes | 0x00550000 | R | 1 |
| 0x0055bbc0 | calc_war_readiness | AI | diplomacy | 820 bytes | 0x00550000 | PA |  |
| 0x0055bef9 | check_can_declare_war | AI | diplomacy | 365 bytes | 0x00550000 | PA |  |
| 0x0055c066 | set_government_type | GL | government | 529 bytes | 0x00550000 | FP |  |
| 0x0055c277 | check_govt_available | GL | government | 323 bytes | 0x00550000 | FP |  |
| 0x0055c3d3 | revolution_dialog | GL | government | 678 bytes | 0x00550000 | PA |  |
| 0x0055c679 | seh_cleanup_5c679 | UNSET |  | 12 | 0x00550000 |  | thunk_FUN_0059df8a |
| 0x0055c68f | seh_epilog_5c68f | UNSET |  | 14 | 0x00550000 |  | SEH epilog |
| 0x0055c69d | ai_revolution_notification | AI | diplomacy | 1336 bytes | 0x00550000 | PA |  |
| 0x0055cbd5 | ai_should_declare_war | AI | diplomacy | 1549 bytes | 0x00550000 | PA |  |
| 0x0055d1e2 | ai_tech_exchange | AI | diplomacy | 1182 bytes | 0x00550000 | PA |  |
| 0x0055d685 | check_join_war | AI | diplomacy | 595 bytes | 0x00550000 | PA |  |
| 0x0055d8d8 | process_diplomatic_contact | AI | diplomacy | 7326 bytes | 0x00550000 | PA |  |
| 0x0055f5a3 | ai_choose_government | AI | diplomacy | 558 bytes | 0x00550000 | FP |  |
| 0x0055f7d1 | ai_military_aid | AI | diplomacy | 2222 bytes | 0x00550000 | R |  |
| 0x00560084 | ai_diplomacy_turn_processing | AI | diplomacy | 3345 bytes | 0x00560000 |  |  |
| 0x00560d95 | ai_evaluate_diplomacy_toward_human | AI | diplomacy | 4728 bytes | 0x00560000 |  |  |
| 0x00562021 | ai_propose_alliance_or_crusade | AI | diplomacy | 2292 bytes | 0x00560000 |  |  |
| 0x00564470 | find_cdrom_path | FI | FILE_IO | 212 bytes | 0x00560000 |  |  |
| 0x00564549 | is_cdrom_not_found | FI | FILE_IO | 43 | 0x00560000 |  |  |
| 0x00564574 | get_cdrom_path | FI | FILE_IO | 43 | 0x00560000 |  |  |
| 0x0056459f | scan_drives_for_cdrom | FI | FILE_IO | 354 | 0x00560000 |  |  |
| 0x00564713 | resolve_file_path | FI | FILE_IO | 831 | 0x00560000 |  |  |
| 0x00564bf0 | parse_number_with_prefix | UTIL | UTIL | 216 | 0x00560000 |  |  |
| 0x00564d00 | civilopedia_init | UI | civilopedia | 365 bytes | 0x00560000 |  |  |
| 0x00564e6d | civilopedia_draw_page | UI | civilopedia | 5911 bytes | 0x00560000 |  |  |
| 0x00566584 | civilopedia_navigate_to | UI | civilopedia | 342 bytes | 0x00560000 |  |  |
| 0x005666da | civilopedia_draw_tech_tree | UI | civilopedia | 3551 bytes | 0x00560000 |  |  |
| 0x005674b9 | draw_tech_tree_connector | UI | tech_tree | 254 bytes | 0x00560000 |  |  |
| 0x005675b7 | draw_tech_tree_continuation | UI | tech_tree | 138 bytes | 0x00560000 |  |  |
| 0x005680a0 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x005680ba | FUN_005680ba | UNSET |  | 26 | 0x00560000 |  |  |
| 0x005680d4 | FUN_005680d4 | UNSET |  | 29 | 0x00560000 |  |  |
| 0x005680f1 | FUN_005680f1 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056810b | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x00568125 | FUN_00568125 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056813f | FUN_0056813f | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056815c | FUN_0056815c | UNSET |  | 26 | 0x00560000 |  |  |
| 0x00568176 | return_true | UI | main_window | 24 | 0x00560000 |  |  |
| 0x005681c9 | load_civ2_art_005681c9 | UI | main_window | 383 | 0x00560000 |  |  |
| 0x00568348 | FUN_00568348 | UNSET |  | 12 | 0x00560000 |  |  |
| 0x00568354 | FUN_00568354 | UNSET |  | 9 | 0x00560000 |  |  |
| 0x0056835d | FUN_0056835d | UNSET |  | 12 | 0x00560000 |  |  |
| 0x00568373 | FUN_00568373 | UNSET |  | 14 | 0x00560000 |  |  |
| 0x00568381 | on_display_change | UI | main_window | 36 | 0x00560000 |  |  |
| 0x005683a5 | noop_a | UI | main_window | 16 | 0x00560000 |  |  |
| 0x005683b5 | noop_b | UI | main_window | 16 | 0x00560000 |  |  |
| 0x005683c5 | screen_reveal_animation | UI | animation | 1155 | 0x00560000 |  |  |
| 0x00568861 | get_civ_era_from_techs | UTIL | era | 136 | 0x00560000 |  |  |
| 0x00568b00 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x00568b1a | FUN_00568b1a | UNSET |  | 26 | 0x00560000 |  |  |
| 0x00568b34 | FUN_00568b34 | UNSET |  | 29 | 0x00560000 |  |  |
| 0x00568b51 | FUN_00568b51 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x00568b6b | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x00568b85 | FUN_00568b85 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x00568b9f | FUN_00568b9f | UNSET |  | 29 | 0x00560000 |  |  |
| 0x00568bbc | FUN_00568bbc | UNSET |  | 26 | 0x00560000 |  |  |
| 0x00568bd6 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x00568bf0 | FUN_00568bf0 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x00568c0a | FUN_00568c0a | UNSET |  | 29 | 0x00560000 |  |  |
| 0x00568c27 | FUN_00568c27 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x00568c41 | disable_status_panel_flag | UI | main_window | 23 | 0x00560000 |  |  |
| 0x00568c58 | enable_status_panel_and_refresh | UI | main_window | 38 | 0x00560000 |  |  |
| 0x00568c7e | on_resize_disable_status | UI | main_window | 36 | 0x00560000 |  |  |
| 0x00568ca2 | status_panel_layout | UI | status_panel | 484 | 0x00560000 |  |  |
| 0x00568e86 | status_panel_draw_minimap_unit | UI | status_panel | 189 | 0x00560000 |  |  |
| 0x00568f43 | status_panel_draw_info_text | UI | status_panel | 474 | 0x00560000 |  |  |
| 0x0056911d | status_panel_format_coordinates | UI | status_panel | 132 | 0x00560000 |  |  |
| 0x005691a1 | status_panel_draw_unit_orders | UI | status_panel | 450 | 0x00560000 |  |  |
| 0x00569363 | status_panel_draw_main | UI | status_panel | 1182 | 0x00560000 |  |  |
| 0x00569801 | status_panel_draw_full | UI | status_panel | 3672 | 0x00560000 |  |  |
| 0x0056a65e | status_panel_refresh | UI | status_panel | 297 | 0x00560000 |  |  |
| 0x0056a787 | status_panel_rebuild | UI | status_panel | 516 | 0x00560000 |  |  |
| 0x0056a98b | status_panel_handle_click | UI | status_panel | 105 | 0x00560000 |  |  |
| 0x0056a9f4 | info_panel_rect_setup | UI | main_window | 139 | 0x00560000 |  |  |
| 0x0056aa7f | invalidate_main_window_a | UI | main_window | 38 | 0x00560000 |  |  |
| 0x0056aaa5 | invalidate_main_window_b | UI | main_window | 38 | 0x00560000 |  |  |
| 0x0056aacb | main_window_setup | UI | main_window | 379 | 0x00560000 |  |  |
| 0x0056ac46 | main_window_disable_status | UI | main_window | 33 | 0x00560000 |  |  |
| 0x0056ac67 | status_panel_draw_minimap | UI | status_panel | 646 | 0x00560000 |  |  |
| 0x0056aeed | FUN_0056aeed | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056b810 | strip_newline | UTIL | UTIL | 55 | 0x00560000 |  |  |
| 0x0056b847 | append_newline | UTIL | UTIL | 54 | 0x00560000 |  |  |
| 0x0056b8a0 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056b8ba | FUN_0056b8ba | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056b8d4 | FUN_0056b8d4 | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056b8f1 | FUN_0056b8f1 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056b90b | setup_unit_font | RN | unit | 99 | 0x00560000 |  |  |
| 0x0056b96e | pick_best_display_unit | RN | unit | 396 | 0x00560000 |  |  |
| 0x0056baff | draw_unit_sprite_full | RN | unit | 2803 | 0x00560000 |  |  |
| 0x0056c5fc | blit_clipped_sprite | RN | spritesheet | 265 | 0x00560000 |  |  |
| 0x0056c705 | animate_unit_movement | RN | animation | 2902 | 0x00560000 |  |  |
| 0x0056d25b | animate_cleanup_surfaces | RN | animation | 22 | 0x00560000 |  |  |
| 0x0056d27b | animate_restore_seh | RN | animation | 14 | 0x00560000 |  |  |
| 0x0056d289 | draw_city_sprite | RN | city | 1737 | 0x00560000 |  |  |
| 0x0056e180 | scale_sprite_size | RN | spritesheet | 47 | 0x00560000 |  |  |
| 0x0056e1c0 | scale_coord | RN | spritesheet | 38 | 0x00560000 |  |  |
| 0x0056e1f0 | get_civ_dark_color | RN | spritesheet | 92 | 0x00560000 |  |  |
| 0x0056e270 | mp_player_init | NW | multiplayer | 89 | 0x00560000 |  |  |
| 0x0056e2c9 | mp_player_destructor | NW | multiplayer | 32 | 0x00560000 |  |  |
| 0x0056e2e9 | mp_create_game | NW | multiplayer | 2450 | 0x00560000 |  |  |
| 0x0056ec92 | mp_check_all_players_ready | NW | multiplayer | 208 | 0x00560000 |  |  |
| 0x0056ed62 | mp_process_messages_wrapper | NW | multiplayer | 30 | 0x00560000 |  |  |
| 0x0056ed80 | mp_check_data_received | NW | multiplayer | 83 | 0x00560000 |  |  |
| 0x0056edd3 | mp_find_alternate_node | NW | multiplayer | 89 | 0x00560000 |  |  |
| 0x0056ee2c | mp_clear_player_list | NW | multiplayer | 171 | 0x00560000 |  |  |
| 0x0056eed7 | mp_remove_player_node | NW | multiplayer | 188 | 0x00560000 |  |  |
| 0x0056ef93 | mp_add_player_node | NW | multiplayer | 384 | 0x00560000 |  |  |
| 0x0056f113 | mp_refresh_player_list | NW | multiplayer | 494 | 0x00560000 |  |  |
| 0x0056f301 | mp_add_default_entry | NW | multiplayer | 113 | 0x00560000 |  |  |
| 0x0056f372 | mp_check_single_default | NW | multiplayer | 110 | 0x00560000 |  |  |
| 0x0056f3e0 | mp_find_node_by_id | NW | multiplayer | 75 | 0x00560000 |  |  |
| 0x0056f42b | mp_find_slot_by_id | NW | multiplayer | 89 | 0x00560000 |  |  |
| 0x0056f910 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056f92a | FUN_0056f92a | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056f944 | FUN_0056f944 | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056f961 | FUN_0056f961 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056f97b | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056f995 | FUN_0056f995 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056f9af | FUN_0056f9af | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056f9cc | FUN_0056f9cc | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056f9e6 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056fa00 | FUN_0056fa00 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fa1a | FUN_0056fa1a | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056fa37 | FUN_0056fa37 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fa51 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056fa6b | FUN_0056fa6b | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fa85 | FUN_0056fa85 | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056faa2 | FUN_0056faa2 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fabc | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056fad6 | FUN_0056fad6 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056faf0 | FUN_0056faf0 | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056fb0d | FUN_0056fb0d | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fb27 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056fb41 | FUN_0056fb41 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fb5b | FUN_0056fb5b | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056fb78 | FUN_0056fb78 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fb92 | FID_conflict:_$E31 | FW | crt | 26 | 0x00560000 | NN |  |
| 0x0056fbac | FUN_0056fbac | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fbc6 | FUN_0056fbc6 | UNSET |  | 29 | 0x00560000 |  |  |
| 0x0056fbe3 | FUN_0056fbe3 | UNSET |  | 26 | 0x00560000 |  |  |
| 0x0056fbfd | draw_unit_origin_markers | RN | spritesheet | 231 | 0x00560000 |  |  |
| 0x0056fce4 | recolor_units_spritesheet | RN | spritesheet | 722 | 0x00560000 |  |  |
| 0x0056ffb6 | FUN_0056ffb6 | UNSET |  | 12 | 0x00560000 |  |  |
| 0x0056ffcc | FUN_0056ffcc | UNSET |  | 14 | 0x00560000 |  |  |
| 0x0056ffda | recolor_cities_spritesheet | RN | spritesheet | 1922 | 0x00560000 |  |  |
| 0x0057075c | sprited_terrain1_destructor_helper | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x00570772 | sprited_terrain1_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00570780 | sprited_process_terrain1 | RN | sprite | 2082b | 0x00570000 | NN |  |
| 0x00570fa2 | sprited_terrain2_destructor_helper | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x00570fb8 | sprited_terrain2_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00570fc6 | sprited_process_terrain2 | RN | sprite | 2342b | 0x00570000 | NN |  |
| 0x005718ec | sprited_icons_a_destructor_helper | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x00571902 | sprited_icons_a_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00571910 | sprited_process_icons_a | RN | sprite | 666b | 0x00570000 | NN |  |
| 0x00571baa | sprited_icons_b_destructor_helper | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x00571bc0 | sprited_icons_b_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00571bce | sprited_process_icons_b | RN | sprite | 1175b | 0x00570000 | NN |  |
| 0x00572065 | sprited_icons_b_cleanup | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x0057207b | sprited_icons_b_seh_epilogue | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00572089 | sprited_open_dialog | UI | editor | 546b | 0x00570000 | SK |  |
| 0x005722ab | sprited_refresh_display | UI | editor | 185b | 0x00570000 | SK |  |
| 0x00572364 | sprited_invalidate_cache | UI | editor | 37b | 0x00570000 | SK |  |
| 0x00572389 | sprited_capture_viewport | UI | editor | 101b | 0x00570000 | SK |  |
| 0x005723ee | sprited_draw_color_swatches | UI | editor | 556b | 0x00570000 | SK |  |
| 0x0057261a | sprited_draw_palette_entry | UI | editor | 294b | 0x00570000 | SK |  |
| 0x00572740 | sprited_hit_test_toolbar | UI | editor | 147b | 0x00570000 | SK |  |
| 0x005727d8 | sprited_init_view_mode | UI | editor | 135b | 0x00570000 | SK |  |
| 0x00572887 | sprited_paint_pixel | UI | editor | 1295b | 0x00570000 | SK |  |
| 0x00572da0 | sprited_draw_cursor_crosshair | UI | editor | 607b | 0x00570000 | SK |  |
| 0x00572fff | sprited_handle_mouse_click | UI | editor | 2685b | 0x00570000 | SK |  |
| 0x00573adc | sprited_string_destructor | FW | seh_crt | 9b | 0x00570000 | SK |  |
| 0x00573aef | sprited_click_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00573afd | sprited_release_capture | UI | editor | 32b | 0x00570000 | SK |  |
| 0x00573b1d | sprited_handle_mouse_move | UI | editor | 813b | 0x00570000 | SK |  |
| 0x00573e59 | sprited_show_editor | UI | editor | 947b | 0x00570000 | SK |  |
| 0x0057420c | sprited_destroy_button_1 | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x00574218 | sprited_destroy_button_2 | FW | seh_crt | 9b | 0x00570000 | SK |  |
| 0x0057422b | sprited_show_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00574239 | sprited_redraw_all | UI | editor | 745b | 0x00570000 | SK |  |
| 0x00574522 | sprited_draw_preview_centered | UI | editor | 356b | 0x00570000 | SK |  |
| 0x00574686 | sprited_redraw_preview_thunk | UI | editor | 27b | 0x00570000 | SK |  |
| 0x005746a1 | sprited_get_sprite_coords | RN | sprite | 1362b | 0x00570000 | NN |  |
| 0x00574c47 | sprited_edit_single_sprite | UI | editor | 95b | 0x00570000 | SK |  |
| 0x00574ca6 | sprited_open_preview_dialog | UI | editor | 498b | 0x00570000 | SK |  |
| 0x00574e98 | sprited_init_preview | UI | editor | 184b | 0x00570000 | SK |  |
| 0x00574f50 | sprited_apply_changes | RN | sprite | 3562b | 0x00570000 | NN |  |
| 0x00575d89 | sprited_write_sprite_back | UI | editor | 59b | 0x00570000 | SK |  |
| 0x00575dc4 | sprited_close_preview | UI | editor | 40b | 0x00570000 | SK |  |
| 0x00575dec | sprited_setup_preview_window | UI | editor | 1121b | 0x00570000 | SK |  |
| 0x0057624d | sprited_setup_preview_thunk | UI | editor | 27b | 0x00570000 | SK |  |
| 0x00576267 | sprited_import_bitmap | UI | editor | 1121b | 0x00570000 | SK |  |
| 0x005767a7 | sprited_import_free_string | FW | seh_crt | 9b | 0x00570000 | SK |  |
| 0x005767b3 | sprited_import_destructor | FW | seh_crt | 9b | 0x00570000 | SK |  |
| 0x005767c9 | sprited_import_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x00578390 | ~CBitmapButton | FW | mfc | 178b | 0x00570000 | SK |  |
| 0x00578402 | cbitmapbutton_destroy_bmp_1 | FW | mfc | 15b | 0x00570000 | SK |  |
| 0x00578411 | cbitmapbutton_destroy_bmp_2 | FW | mfc | 15b | 0x00570000 | SK |  |
| 0x00578420 | cbitmapbutton_destroy_bmp_3 | FW | mfc | 15b | 0x00570000 | SK |  |
| 0x0057842f | cbitmapbutton_destroy_bmp_4 | FW | mfc | 15b | 0x00570000 | SK |  |
| 0x0057843e | cbitmapbutton_destroy_base | FW | mfc | 19b | 0x00570000 | SK |  |
| 0x00578451 | cbitmapbutton_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x005784a0 | init_menu_control | UI | editor | 304b | 0x00570000 | SK |  |
| 0x005785d0 | precision | FW | mfc | 52b | 0x00570000 | SK |  |
| 0x00578610 | width | FW | mfc | 52b | 0x00570000 | SK |  |
| 0x00578650 | menu_ctrl_set_item_count | UI | editor | 54b | 0x00570000 | SK |  |
| 0x0057868c | Reset | FW | mfc | 42b | 0x00570000 | SK |  |
| 0x005786b6 | menu_ctrl_reset_and_init | UI | editor | 59b | 0x00570000 | SK |  |
| 0x005786f1 | menu_ctrl_create | UI | editor | 127b | 0x00570000 | SK |  |
| 0x00578770 | menu_ctrl_destroy | UI | editor | 77b | 0x00570000 | SK |  |
| 0x005787bd | menu_ctrl_destroy_timevec | FW | seh_crt | 19b | 0x00570000 | SK |  |
| 0x005787d0 | menu_ctrl_destroy_seh | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x005787de | menu_find_item_by_id | UI | editor | 98b | 0x00570000 | SK |  |
| 0x00578840 | menu_get_visible_index | UI | editor | 105b | 0x00570000 | SK |  |
| 0x005788a9 | menu_get_id_at_visible_index | UI | editor | 121b | 0x00570000 | SK |  |
| 0x00578922 | menu_find_subitem_by_id | UI | editor | 136b | 0x00570000 | SK |  |
| 0x005789aa | menu_get_subitem_visible_index | UI | editor | 114b | 0x00570000 | SK |  |
| 0x00578a1c | menu_get_subitem_id_at_index | UI | editor | 161b | 0x00570000 | SK |  |
| 0x00578abd | menu_replace_pipe_with_tab | UI | editor | 73b | 0x00570000 | SK |  |
| 0x00578b06 | menu_add_toplevel_item | UI | editor | 268b | 0x00570000 | SK |  |
| 0x00578c12 | menu_add_sub_item | UI | editor | 371b | 0x00570000 | SK |  |
| 0x00578d8a | menu_dispatch_item_click | UI | editor | 94b | 0x00570000 | SK |  |
| 0x00578de8 | menu_set_host_window | UI | editor | 80b | 0x00570000 | SK |  |
| 0x00578e38 | menu_set_callback | UI | editor | 40b | 0x00570000 | SK |  |
| 0x00578e60 | menu_toggle_item_checked | UI | editor | 103b | 0x00570000 | SK |  |
| 0x00578ec7 | menu_toggle_item_grayed | UI | editor | 101b | 0x00570000 | SK |  |
| 0x00578f2c | menu_populate | UI | editor | 686b | 0x00570000 | SK |  |
| 0x005791df | menu_set_item_hidden | UI | editor | 129b | 0x00570000 | SK |  |
| 0x00579260 | menu_set_subitem_hidden | UI | editor | 129b | 0x00570000 | SK |  |
| 0x005792e1 | menu_set_subitem_checked | UI | editor | 194b | 0x00570000 | SK |  |
| 0x005793a3 | menu_remove_subitem | UI | editor | 106b | 0x00570000 | SK |  |
| 0x0057940d | menu_set_subitem_grayed | UI | editor | 194b | 0x00570000 | SK |  |
| 0x005794cf | menu_set_all_subitems_checked | UI | editor | 111b | 0x00570000 | SK |  |
| 0x0057953e | menu_update_subitem_text | UI | editor | 155b | 0x00570000 | SK |  |
| 0x005799c0 | menu_create_header | UI | editor | 41b | 0x00570000 | SK |  |
| 0x00579a00 | menu_insert_item | UI | editor | 50b | 0x00570000 | SK |  |
| 0x00579a40 | menu_delete_item | UI | editor | 46b | 0x00570000 | SK |  |
| 0x00579a80 | menu_change_item_text | UI | editor | 50b | 0x00570000 | SK |  |
| 0x00579ac0 | menu_check_item | UI | editor | 50b | 0x00570000 | SK |  |
| 0x00579b00 | menu_enable_item | UI | editor | 50b | 0x00570000 | SK |  |
| 0x00579b40 | menu_setup_parent | UI | editor | 59b | 0x00570000 | SK |  |
| 0x00579b90 | menu_get_handle | UI | editor | 27b | 0x00570000 | SK |  |
| 0x00579bc0 | EnableStackedTabs | FW | mfc | 36b | 0x00570000 | SK |  |
| 0x00579bf0 | menu_update_host | UI | editor | 52b | 0x00570000 | SK |  |
| 0x00579c40 | diplomacy_check_treaty_violation | GL | diplomacy | 379b | 0x00570000 | TM |  |
| 0x00579dbb | calc_city_value_for_capture | GL | city_capture | 277b | 0x00570000 | TL |  |
| 0x00579ed0 | diplomacy_check_attack_allowed | GL | diplomacy | 933b | 0x00570000 | TM |  |
| 0x0057a27a | diplomacy_steal_tech | GL | diplomacy | 999b | 0x00570000 | TM |  |
| 0x0057a661 | steal_tech_free_string | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x0057a677 | steal_tech_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x0057a685 | find_most_central_city | GL | city_capture | 356b | 0x00570000 | TL |  |
| 0x0057a7e9 | transfer_city_ownership | GL | city_capture | 283b | 0x00570000 | TM |  |
| 0x0057a904 | handle_civil_war | GL | city_capture | 3291b | 0x00570000 | TH |  |
| 0x0057b5df | handle_city_capture | GL | city_capture | 11451b | 0x00570000 | TH |  |
| 0x0057e29f | city_capture_free_string | FW | seh_crt | 12b | 0x00570000 | SK |  |
| 0x0057e2b5 | city_capture_seh_restore | FW | seh_crt | 14b | 0x00570000 | SK |  |
| 0x0057e2c3 | calc_unit_hit_points | GL | combat | 119b | 0x00570000 | TM |  |
| 0x0057e33a | calc_unit_defense_strength | GL | combat | 931b | 0x00570000 | TH |  |
| 0x0057e6e2 | calc_stack_best_defender | GL | combat | 786b | 0x00570000 | TH |  |
| 0x0057e9f9 | handle_unit_kill | GL | combat | 411b | 0x00570000 | TM |  |
| 0x0057eb94 | handle_stack_wipe | GL | combat | 105b | 0x00570000 | TL |  |
| 0x0057ebfd | handle_unit_promotion | GL | combat | 322b | 0x00570000 | TM |  |
| 0x0057ed3f | animate_combat_movement | UI | animation | 2281b | 0x00570000 | NN |  |
| 0x0057f628 | animate_combat_destructor | FW | seh_crt | 22b | 0x00570000 | SK |  |
| 0x0057f648 | animate_combat_seh_restore | FW | seh_crt | 15b | 0x00570000 | SK |  |
| 0x0057f657 | animate_nuke_explosion | UI | animation | 885b | 0x00570000 | NN |  |
| 0x0057f9e3 | handle_nuke_attack | GL | nuclear | 1236b | 0x00570000 | TH |  |
| 0x0057febc | scramble_defenders_to_tile | GL | nuclear | 1084b | 0x00570000 | TL |  |
| 0x005802fd | refresh_combat_tiles | GL | combat | 68b | 0x00580000 | SK |  |
| 0x00580341 | resolve_combat | GL | combat | 15052b | 0x00580000 | PA |  |
| 0x005866a0 | cosmic_editor_set_focus | UI | editor | 51b | 0x00580000 | NN |  |
| 0x005866d3 | cosmic_editor_save_restore | UI | editor | 769b | 0x00580000 | NN |  |
| 0x005869d4 | cosmic_editor_display_list | UI | editor | 482b | 0x00580000 | NN |  |
| 0x00586bb6 | cosmic_editor_edit_value | UI | editor | 340b | 0x00580000 | NN |  |
| 0x00586d0a | cosmic_editor_write_rules | UI | editor | 151b | 0x00580000 | NN |  |
| 0x00586da1 | show_messagebox_6DA1 | UNSET |  | 131 | 0x00580000 |  |  |
| 0x00586e24 | cosmic_editor_show_effects | UI | editor | 100b | 0x00580000 | NN |  |
| 0x00586e88 | cosmic_editor_close | UI | editor | 40b | 0x00580000 | NN |  |
| 0x00586eb0 | cosmic_editor_repaint | UI | editor | 102b | 0x00580000 | NN |  |
| 0x00586f16 | cosmic_editor_init_window | UI | editor | 1731b | 0x00580000 | NN |  |
| 0x005875e9 | FUN_005875e9 | FW | seh_crt | stub | 0x00580000 | SK |  |
| 0x005875ff | FUN_005875ff | UNSET |  | 14 | 0x00580000 |  |  |
| 0x0058760d | cosmic_editor_launch | UNSET |  | 89 | 0x00580000 |  |  |
| 0x00587666 | FUN_00587666 | UNSET |  | 12 | 0x00580000 |  |  |
| 0x0058767c | FUN_0058767c | UNSET |  | 14 | 0x00580000 |  |  |
| 0x00587a90 | city_list_create_panel | UI | city_list | 849b | 0x00580000 | SK |  |
| 0x00587e05 | city_list_scroll_top | UI | city_list | 30b | 0x00580000 | SK |  |
| 0x00587e23 | FUN_00587e23 | UNSET |  | 30 | 0x00580000 |  |  |
| 0x00587e41 | city_list_toggle_filter | UI | city_list | 191b | 0x00580000 | SK |  |
| 0x00587f00 | city_list_toggle_filter_off | UI | city_list | 191b | 0x00580000 | SK |  |
| 0x00587fbf | city_list_send_message | UI | city_list | 144b | 0x00580000 | SK |  |
| 0x0058804f | city_list_set_scroll_pos | UI | city_list | 97b | 0x00580000 | SK |  |
| 0x005880b0 | city_list_handle_click | UI | city_list | 637b | 0x00580000 | SK |  |
| 0x0058832d | city_list_hit_test | UI | city_list | 274b | 0x00580000 | SK |  |
| 0x0058843f | city_list_sort | UI | city_list | 847b | 0x00580000 | SK |  |
| 0x0058878e | city_list_draw | UI | city_list | 1721b | 0x00580000 | SK |  |
| 0x00588e47 | city_list_draw_city_sprite | UI | city_list | 239b | 0x00580000 | SK |  |
| 0x00588f36 | city_list_populate | UI | city_list | 1138b | 0x00580000 | SK |  |
| 0x005899f0 | FID_conflict:_$E31 | FW | crt | 26 | 0x00580000 | NN |  |
| 0x00589a0a | FUN_00589a0a | UNSET |  | 26 | 0x00580000 |  |  |
| 0x00589a24 | FUN_00589a24 | UNSET |  | 29 | 0x00580000 |  |  |
| 0x00589a41 | FUN_00589a41 | UNSET |  | 26 | 0x00580000 |  |  |
| 0x00589a5b | app_init_main_window | SYS | app_init | 505b | 0x00580000 | NN |  |
| 0x00589c54 | app_init_cleanup | FW | seh_crt | stub | 0x00580000 | SK |  |
| 0x00589c6a | FUN_00589c6a | UNSET |  | 15 | 0x00580000 |  |  |
| 0x00589c79 | app_shutdown_handler | SYS | app_init | 36b | 0x00580000 | NN |  |
| 0x00589d50 | app_init_subsystem | SYS | app_init | 37b | 0x00580000 | NN |  |
| 0x00589d80 | register_crash_handler | SYS | error | 69b | 0x00580000 | NN |  |
| 0x00589dc5 | read_warning_file | SYS | error | 297b | 0x00580000 | NN |  |
| 0x00589ef8 | format_error_report | SYS | error | 209b | 0x00580000 | NN |  |
| 0x00589fc9 | lookup_error_string | SYS | error | 278b | 0x00580000 | NN |  |
| 0x0058a0ee | crash_report_and_exit | SYS | error | 778b | 0x00580000 | NN |  |
| 0x0058a5b0 | FID_conflict:_$E31 | FW | crt | 26 | 0x00580000 | NN |  |
| 0x0058a5ca | FUN_0058a5ca | UNSET |  | 26 | 0x00580000 |  |  |
| 0x0058a5e4 | FUN_0058a5e4 | UNSET |  | 29 | 0x00580000 |  |  |
| 0x0058a601 | FUN_0058a601 | UNSET |  | 26 | 0x00580000 |  |  |
| 0x0058a61b | create_popup_window | UI | popup | 498b | 0x00580000 | SK |  |
| 0x0058a80d | show_messagebox_A80D | UNSET |  | 248 | 0x00580000 |  |  |
| 0x0058a905 | import_sound_file | UI | sound_editor | 709b | 0x00580000 | NN |  |
| 0x0058abca | import_sound_cleanup | FW | seh_crt | stub | 0x00580000 | SK |  |
| 0x0058abe0 | FUN_0058abe0 | UNSET |  | 14 | 0x00580000 |  |  |
| 0x0058abee | sound_editor_close_a | UI | sound_editor | 37b | 0x00580000 | NN |  |
| 0x0058ac13 | sound_editor_close_b | UI | sound_editor | 37b | 0x00580000 | NN |  |
| 0x0058ac38 | sound_editor_paint | UI | sound_editor | 488b | 0x00580000 | NN |  |
| 0x0058ae20 | point_in_rect | UI | popup | 76b | 0x00580000 | NN |  |
| 0x0058ae6c | sound_editor_click | UI | sound_editor | 330b | 0x00580000 | NN |  |
| 0x0058afb6 | sound_editor_populate_slots | UI | sound_editor | 1224b | 0x00580000 | NN |  |
| 0x0058b47e | sound_editor_init_window | UI | sound_editor | 987b | 0x00580000 | NN |  |
| 0x0058b859 | FUN_0058b859 | FW | seh_crt | stub | 0x00580000 | SK |  |
| 0x0058b86f | FUN_0058b86f | UNSET |  | 12 | 0x00580000 |  |  |
| 0x0058b87b | FUN_0058b87b | UNSET |  | 9 | 0x00580000 |  |  |
| 0x0058b88e | FUN_0058b88e | UNSET |  | 14 | 0x00580000 |  |  |
| 0x0058bd60 | unit_order_activate | GL | unit_orders | 36b | 0x00580000 | TL |  |
| 0x0058bd84 | unit_order_wake_all_own | GL | unit_orders | 121b | 0x00580000 | TL |  |
| 0x0058bdfd | unit_order_automate | GL | unit_orders | 89b | 0x00580000 | TL |  |
| 0x0058be56 | unit_order_build_city | GL | city_founding | 1087b | 0x00580000 | P |  |
| 0x0058c295 | unit_order_disband | GL | unit_orders | 722b | 0x00580000 | TM |  |
| 0x0058c56c | check_adjacent_water | GL | city_founding | 242b | 0x00580000 | P |  |
| 0x0058c65e | unit_order_build_improvement | GL | unit_orders | 1411b | 0x00580000 | TM |  |
| 0x0058cbe1 | unit_order_home_city | GL | unit_mgmt | 261b | 0x00580000 | TM |  |
| 0x0058cce6 | unit_order_fortify | GL | unit_orders | 255b | 0x00580000 | TM |  |
| 0x0058cde5 | unit_order_unload | GL | unit_orders | 488b | 0x00580000 | TM |  |
| 0x0058cfcd | unit_order_pillage | GL | unit_orders | 1105b | 0x00580000 | TM |  |
| 0x0058d41e | pillage_cleanup | FW | seh_crt | stub | 0x00580000 | SK |  |
| 0x0058d434 | FUN_0058d434 | UNSET |  | 14 | 0x00580000 |  |  |
| 0x0058d442 | unit_order_sentry | GL | unit_orders | 451b | 0x00580000 | TL |  |
| 0x0058d60a | unit_order_paradrop | GL | unit_orders | 165b | 0x00580000 | TL |  |
| 0x0058d6af | unit_order_goto_city | GL | unit_orders | 1787b | 0x00580000 | TL |  |
| 0x0058ddaa | goto_city_cleanup | FW | seh_crt | stub | 0x00580000 | SK |  |
| 0x0058ddc0 | FUN_0058ddc0 | UNSET |  | 14 | 0x00580000 |  |  |
| 0x0058ddce | unit_order_wake_sentries | GL | unit_orders | 326b | 0x00580000 | TL |  |
| 0x0058df14 | unit_order_clean_toggle | GL | unit_mgmt | 103b | 0x00580000 | TL |  |
| 0x0058df7b | unit_order_airlift | GL | unit_orders | 1609b | 0x00580000 | TM |  |
| 0x0058e5c4 | airlift_cleanup | FW | seh_crt | stub | 0x00580000 | SK |  |
| 0x0058e5da | FUN_0058e5da | UNSET |  | 14 | 0x00580000 |  |  |
| 0x0058f010 | show_message_if_visible | GL | goody_hut | 48b | 0x00580000 | SK |  |
| 0x0058f040 | process_goody_hut | GL | goody_hut | 3404b | 0x00580000 | PA |  |
| 0x0058fda9 | claim_adjacent_ocean_tiles | GL | goody_hut | 306b | 0x00580000 | R |  |
| 0x0058fedb | handle_caravan_arrival | GL | trade | 1831b | 0x00580000 | PA |  |
| 0x00590607 | caravan_cleanup | FW | seh_crt | stub | 0x00590000 | SK |  |
| 0x0059061d | FUN_0059061d | UNSET |  | 15 | 0x00590000 |  |  |
| 0x0059062c | move_unit | GL | Movement | 17963 bytes | 0x00590000 | PA | engine/reducer.js:649 |
| 0x00594d42 | mp_lock_map | GL | Movement | 971 bytes | 0x00590000 | NN |  |
| 0x0059511c | mp_unlock_map | GL | Movement | 324 bytes | 0x00590000 | NN |  |
| 0x00596b00 | spaceship_get_max_component | GL | Spaceship | 264 bytes | 0x00590000 | R | engine/ai/prodai.js:435 |
| 0x00596c08 | spaceship_get_clamped_count | GL | Spaceship | 89 bytes | 0x00590000 | TL |  |
| 0x00596c61 | spaceship_get_category_count | GL | Spaceship | 140 bytes | 0x00590000 | TL |  |
| 0x00596ced | spaceship_get_max_category | GL | Spaceship | 79 bytes | 0x00590000 | TL |  |
| 0x00596d3c | spaceship_get_raw_count | GL | Spaceship | 202 bytes | 0x00590000 | TL |  |
| 0x00596e06 | spaceship_get_clamped_category | GL | Spaceship | 140 bytes | 0x00590000 | TM |  |
| 0x00596e92 | spaceship_calc_population_capacity | GL | Spaceship | 90 bytes | 0x00590000 | TM |  |
| 0x00596eec | spaceship_recalc_stats | GL | Spaceship | 1297 bytes | 0x00590000 | TM | Not yet ported. Contains the complete spaceship victory calculation. Would be needed for a proper... |
| 0x005973fd | spaceship_launch | GL | Spaceship | 815 bytes | 0x00590000 | TM |  |
| 0x0059772c | spaceship_dialog | GL | Spaceship | 1567 bytes | 0x00590000 | NN |  |
| 0x00597d4b | popup_dtor_thunk_2 | FW | FRAMEWORK | 12 bytes | 0x00590000 | SK |  |
| 0x00597d61 | seh_epilog_2 | FW | FRAMEWORK | 14 bytes | 0x00590000 | SK |  |
| 0x00597d6f | spaceship_ai_evaluate | GL | Spaceship | 1064 bytes | 0x00590000 | P | engine/ai/prodai.js:376 |
| 0x00598197 | spaceship_human_build | GL | Spaceship | 2111 bytes | 0x00590000 | PA | engine/ai/prodai.js:377 |
| 0x00598a05 | spaceship_check_complete_section | GL | Spaceship | 324 bytes | 0x00590000 | TM |  |
| 0x00598b4e | spaceship_view_menu | GL | Spaceship | 377 bytes | 0x00590000 | NN |  |
| 0x00598cc7 | popup_dtor_thunk_3 | FW | FRAMEWORK | 12 bytes | 0x00590000 | SK |  |
| 0x00598cdd | seh_epilog_3 | FW | FRAMEWORK | 14 bytes | 0x00590000 | SK |  |
| 0x00598ceb | spaceship_is_enabled | GL | Spaceship | 90 bytes | 0x00590000 | TM |  |
| 0x00598d45 | spaceship_ai_should_start | GL | Spaceship | 583 bytes | 0x00590000 | PA | engine/ai/unitai.js:3979 |
| 0x005998b0 | spaceship_has_enough_raw | GL | Spaceship | 66 bytes | 0x00590000 | TM |  |
| 0x00599910 | spaceship_can_build_category | GL | Spaceship | 132 bytes | 0x00590000 | TM |  |
| 0x005999c0 | spaceship_category_maxed | GL | Spaceship | 70 bytes | 0x00590000 | TM |  |
| 0x00599a20 | pedia_init_list | UNSET |  | 365 | 0x00590000 | NN |  |
| 0x00599b8d | pedia_draw_item_detail | UNSET |  | 1488 | 0x00590000 | NN |  |
| 0x0059a15d | pedia_load_description | UNSET |  | 388 | 0x00590000 | NN |  |
| 0x0059a2e6 | pedia_navigate_to_item | UNSET |  | 369 | 0x00590000 | NN |  |
| 0x0059a6f0 | rng_set_seed | GL | RNG | 62 bytes | 0x00590000 | NN |  |
| 0x0059a733 | rng_next_float | GL | RNG | 94 bytes | 0x00590000 | NN |  |
| 0x0059a791 | rng_range | GL | RNG | 113 bytes | 0x00590000 | NN |  |
| 0x0059a850 | FID_conflict:_$E31 | FW | crt | 26 | 0x00590000 | NN |  |
| 0x0059a86a | FUN_0059a86a | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059a884 | FUN_0059a884 | UNSET |  | 29 | 0x00590000 |  |  |
| 0x0059a8a1 | FUN_0059a8a1 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059a8bb | netmgr_init | UNSET |  | 196 | 0x00590000 | NN |  |
| 0x0059a998 | netmgr_reset_state | UNSET |  | 936 | 0x00590000 | NN |  |
| 0x0059ad40 | netmgr_dtor | UNSET |  | 136 | 0x00590000 | NN |  |
| 0x0059adc8 | FUN_0059adc8 | UNSET |  | 15 | 0x00590000 |  |  |
| 0x0059ade1 | FUN_0059ade1 | UNSET |  | 14 | 0x00590000 |  |  |
| 0x0059adef | netmgr_connect | UNSET |  | 1167 | 0x00590000 | NN |  |
| 0x0059b293 | netmgr_disconnect | UNSET |  | 691 | 0x00590000 | NN |  |
| 0x0059b55b | FUN_0059b55b | UNSET |  | 22 | 0x00590000 | NN |  |
| 0x0059b571 | netmgr_update_player_list | UNSET |  | 651 | 0x00590000 | NN |  |
| 0x0059b7fc | netmgr_add_client | UNSET |  | 366 | 0x00590000 | NN |  |
| 0x0059b96a | netmgr_remove_client | UNSET |  | 390 | 0x00590000 | NN |  |
| 0x0059baf0 | netmgr_free_player_list | UNSET |  | 100 | 0x00590000 | NN |  |
| 0x0059bb54 | netmgr_broadcast_receive | UNSET |  | 237 | 0x00590000 | NN |  |
| 0x0059bc41 | netmgr_secure_receive | UNSET |  | 884 | 0x00590000 | NN |  |
| 0x0059bfb5 | netmgr_on_new_client | UNSET |  | 38 | 0x00590000 | NN |  |
| 0x0059bfdb | netmgr_on_connected_to_server | UNSET |  | 112 | 0x00590000 | NN |  |
| 0x0059c04b | netmgr_on_connection_lost | UNSET |  | 89 | 0x00590000 | NN |  |
| 0x0059c0a4 | netmgr_on_oversized_msg | UNSET |  | 61 | 0x00590000 | NN |  |
| 0x0059c0e1 | netmgr_build_packet | UNSET |  | 405 | 0x00590000 | NN |  |
| 0x0059c276 | FUN_0059c276 | UNSET |  | 66 | 0x00590000 | NN |  |
| 0x0059c2b8 | FUN_0059c2b8 | UNSET |  | 73 | 0x00590000 | NN |  |
| 0x0059c301 | FUN_0059c301 | UNSET |  | 30 | 0x00590000 | NN |  |
| 0x0059c31f | netmgr_fill_game_info | UNSET |  | 598 | 0x00590000 | NN |  |
| 0x0059c575 | record_combat_kill | GL | CombatLog | 762 bytes | 0x00590000 | TM |  |
| 0x0059d080 | popup_msg_init | UNSET |  | 209 bytes | 0x00590000 | NN |  |
| 0x0059d190 | FUN_0059d190 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d1aa | FUN_0059d1aa | UNSET |  | 32 | 0x00590000 |  |  |
| 0x0059d1ca | FUN_0059d1ca | UNSET |  | 29 | 0x00590000 |  |  |
| 0x0059d1e7 | FUN_0059d1e7 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d201 | FID_conflict:_$E51 | FW | crt | 26 | 0x00590000 | NN |  |
| 0x0059d21b | FUN_0059d21b | UNSET |  | 30 | 0x00590000 |  |  |
| 0x0059d239 | FUN_0059d239 | UNSET |  | 29 | 0x00590000 |  |  |
| 0x0059d256 | FUN_0059d256 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d270 | FID_conflict:_$E51 | FW | crt | 26 | 0x00590000 | NN |  |
| 0x0059d28a | FUN_0059d28a | UNSET |  | 30 | 0x00590000 |  |  |
| 0x0059d2a8 | FUN_0059d2a8 | UNSET |  | 29 | 0x00590000 |  |  |
| 0x0059d2c5 | FUN_0059d2c5 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d2df | FID_conflict:_$E51 | FW | crt | 26 | 0x00590000 | NN |  |
| 0x0059d2f9 | FUN_0059d2f9 | UNSET |  | 30 | 0x00590000 |  |  |
| 0x0059d317 | FUN_0059d317 | UNSET |  | 29 | 0x00590000 |  |  |
| 0x0059d334 | FUN_0059d334 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d34e | FUN_0059d34e | UNSET |  | 21 | 0x00590000 |  |  |
| 0x0059d363 | FUN_0059d363 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d37d | FUN_0059d37d | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d397 | FUN_0059d397 | UNSET |  | 26 | 0x00590000 |  |  |
| 0x0059d3b1 | FUN_0059d3b1 | UNSET |  | 24 | 0x00590000 |  |  |
| 0x0059d3c9 | FUN_0059d3c9 | UNSET |  | 24 | 0x00590000 |  |  |
| 0x0059d3e1 | FUN_0059d3e1 | UNSET |  | 32 | 0x00590000 |  |  |
| 0x0059d401 | popup_load_labels | UNSET |  | 129 | 0x00590000 |  |  |
| 0x0059d487 | FUN_0059d487 | UNSET |  | 88 | 0x00590000 |  |  |
| 0x0059d4df | FUN_0059d4df | UNSET |  | 72 | 0x00590000 |  |  |
| 0x0059d527 | FUN_0059d527 | UNSET |  | 24 | 0x00590000 |  |  |
| 0x0059d53f | FUN_0059d53f | UNSET |  | 24 | 0x00590000 |  |  |
| 0x0059d557 | FUN_0059d557 | UNSET |  | 24 | 0x00590000 |  |  |
| 0x0059d56f | FUN_0059d56f | UNSET |  | 46 | 0x00590000 |  |  |
| 0x0059d59d | FUN_0059d59d | UNSET |  | 24 | 0x00590000 |  |  |
| 0x0059d5b5 | FUN_0059d5b5 | UNSET |  | 64 | 0x00590000 |  |  |
| 0x0059d5f5 | popup_dialog_reset | UNSET |  | 1299 | 0x00590000 |  |  |
| 0x0059db08 | popup_dialog_create | UNSET |  | 93 | 0x00590000 |  |  |
| 0x0059db65 | popup_dialog_destroy | UNSET |  | 1061 | 0x00590000 |  |  |
| 0x0059df8a | popup_dialog_close | UNSET |  | 47 | 0x00590000 |  |  |
| 0x0059dfb9 | popup_dialog_open | UNSET |  | 306 | 0x00590000 |  |  |
| 0x0059e0eb | popup_set_edit_text | UNSET |  | 160 | 0x00590000 |  |  |
| 0x0059e18b | popup_add_edit_field | UNSET |  | 412 | 0x00590000 |  |  |
| 0x0059e327 | FUN_0059e327 | UNSET |  | 47 | 0x00590000 |  |  |
| 0x0059e356 | FUN_0059e356 | UNSET |  | 32 | 0x00590000 |  |  |
| 0x0059e376 | FUN_0059e376 | UNSET |  | 132 | 0x00590000 |  |  |
| 0x0059e3fa | FUN_0059e3fa | UNSET |  | 78 | 0x00590000 |  |  |
| 0x0059e448 | FUN_0059e448 | UNSET |  | 42 | 0x00590000 |  |  |
| 0x0059e472 | FUN_0059e472 | UNSET |  | 50 | 0x00590000 |  |  |
| 0x0059e4a4 | SetObjectSchema | UNSET |  | 33 | 0x00590000 |  |  |
| 0x0059e4c5 | FUN_0059e4c5 | UNSET |  | 33 | 0x00590000 |  |  |
| 0x0059e4e6 | FUN_0059e4e6 | UNSET |  | 33 | 0x00590000 |  |  |
| 0x0059e507 | FUN_0059e507 | UNSET |  | 126 | 0x00590000 |  |  |
| 0x0059e585 | FUN_0059e585 | UNSET |  | 68 | 0x00590000 |  |  |
| 0x0059e5c9 | FUN_0059e5c9 | UNSET |  | 91 | 0x00590000 |  |  |
| 0x0059e624 | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059e648 | FUN_0059e648 | UNSET |  | 46 | 0x00590000 |  |  |
| 0x0059e676 | FUN_0059e676 | UNSET |  | 51 | 0x00590000 |  |  |
| 0x0059e6a9 | popup_set_title | UNSET |  | 86 | 0x00590000 |  |  |
| 0x0059e6ff | FUN_0059e6ff | UNSET |  | 99 | 0x00590000 |  |  |
| 0x0059e762 | delbuf | UNSET |  | 33 | 0x00590000 |  |  |
| 0x0059e783 | FUN_0059e783 | UNSET |  | 42 | 0x00590000 |  |  |
| 0x0059e7ad | FUN_0059e7ad | UNSET |  | 101 | 0x00590000 |  |  |
| 0x0059e812 | FUN_0059e812 | UNSET |  | 101 | 0x00590000 |  |  |
| 0x0059e877 | FUN_0059e877 | UNSET |  | 100 | 0x00590000 |  |  |
| 0x0059e8db | FUN_0059e8db | UNSET |  | 76 | 0x00590000 |  |  |
| 0x0059e927 | FUN_0059e927 | UNSET |  | 76 | 0x00590000 |  |  |
| 0x0059e973 | FUN_0059e973 | UNSET |  | 64 | 0x00590000 |  |  |
| 0x0059e9b3 | FUN_0059e9b3 | UNSET |  | 64 | 0x00590000 |  |  |
| 0x0059e9f3 | FUN_0059e9f3 | UNSET |  | 90 | 0x00590000 |  |  |
| 0x0059ea4d | FUN_0059ea4d | UNSET |  | 76 | 0x00590000 |  |  |
| 0x0059ea99 | FUN_0059ea99 | UNSET |  | 116 | 0x00590000 |  |  |
| 0x0059eb0d | FUN_0059eb0d | UNSET |  | 53 | 0x00590000 |  |  |
| 0x0059eb42 | FUN_0059eb42 | UNSET |  | 38 | 0x00590000 |  |  |
| 0x0059eb68 | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059eb8c | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059ebb0 | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059ebd4 | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059ebf8 | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059ec1c | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059ec40 | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059ec64 | EnableStackedTabs | FW | mfc | 36 | 0x00590000 | NN |  |
| 0x0059ec88 | popup_add_button | UNSET |  | 360 | 0x00590000 |  |  |
| 0x0059edf0 | popup_add_radio_option | UNSET |  | 566 | 0x00590000 |  |  |
| 0x0059f026 | FUN_0059f026 | UNSET |  | 71 | 0x00590000 |  |  |
| 0x0059f06d | popup_add_text_input | UNSET |  | 566 | 0x00590000 |  |  |
| 0x0059f2a3 | FUN_0059f2a3 | UNSET |  | 119 | 0x00590000 |  |  |
| 0x0059f31a | popup_set_text_style | UNSET |  | 189 | 0x00590000 |  |  |
| 0x0059f3d7 | popup_render_label | UNSET |  | 226 | 0x00590000 |  |  |
| 0x0059f5ba | FUN_0059f5ba | UNSET |  | 61 | 0x00590000 |  |  |
| 0x0059f5f7 | FUN_0059f5f7 | UNSET |  | 83 | 0x00590000 |  |  |
| 0x0059f64a | popup_layout_text | UNSET |  | 1326 | 0x00590000 |  |  |
| 0x0059fb78 | FUN_0059fb78 | UNSET |  | 156 | 0x00590000 |  |  |
| 0x0059fc19 | FUN_0059fc19 | UNSET |  | 156 | 0x00590000 |  |  |
| 0x0059fcba | FUN_0059fcba | UNSET |  | 56 | 0x00590000 |  |  |
| 0x0059fcf2 | FUN_0059fcf2 | UNSET |  | 56 | 0x00590000 |  |  |
| 0x0059fd2a | popup_layout_dialog | UNSET |  | 4785 | 0x00590000 |  |  |
| 0x005a0fea | popup_draw_text_truncated | UI | Popup | 350 | 0x005A0000 | NN |  |
| 0x005a1148 | FUN_005a1148 | UI | Popup | 195 | 0x005A0000 | NN |  |
| 0x005a120b | popup_draw_item | UI | Popup | 706 | 0x005A0000 | NN |  |
| 0x005a14d2 | popup_redraw_visible_items | UI | Popup | 660 | 0x005A0000 | NN |  |
| 0x005a1766 | popup_index_to_page | UI | Popup | 62 | 0x005A0000 | NN |  |
| 0x005a17a4 | popup_align_to_column | UI | Popup | 69 | 0x005A0000 | NN |  |
| 0x005a17e9 | popup_select_item | UI | Popup | 603 | 0x005A0000 | NN |  |
| 0x005a1a44 | clamp_value | UI | Popup | 57 | 0x005A0000 | NN |  |
| 0x005a1a7d | popup_hittest | UI | Popup | 469 | 0x005A0000 | NN |  |
| 0x005a1c52 | popup_count_items_in_pane | UI | Popup | 93 | 0x005A0000 | NN |  |
| 0x005a1caf | popup_select_pane_by_coords | UI | Popup | 244 | 0x005A0000 | NN |  |
| 0x005a1da3 | popup_set_scroll_position | UI | Popup | 133 | 0x005A0000 | NN |  |
| 0x005a1e28 | popup_create_window | UI | Popup | 693 | 0x005A0000 | NN |  |
| 0x005a20f4 | FUN_005a20f4 | UI | Popup | 40 | 0x005A0000 | NN |  |
| 0x005a211c | popup_init_controls | UI | Popup | 6616 | 0x005A0000 | NN |  |
| 0x005a3bae | popup_on_grid_select | UI | Popup | 170 | 0x005A0000 | NN |  |
| 0x005a3c58 | popup_invalidate | UI | Popup | 43 | 0x005A0000 | NN |  |
| 0x005a3c83 | popup_on_icon_select | UI | Popup | 71 | 0x005A0000 | NN |  |
| 0x005a3cca | popup_on_tab_click | UI | Popup | 297 | 0x005A0000 | NN |  |
| 0x005a3df3 | FUN_005a3df3 | UI | Popup | 99 | 0x005A0000 | NN |  |
| 0x005a3e56 | popup_on_button_click | UI | Popup | 548 | 0x005A0000 | NN |  |
| 0x005a407f | popup_on_keypress | UI | Popup | 2181 | 0x005A0000 | NN |  |
| 0x005a49c1 | popup_on_alpha_key | UI | Popup | 1069 | 0x005A0000 | NN |  |
| 0x005a4df3 | popup_on_lbutton_down | UI | Popup | 236 | 0x005A0000 | NN |  |
| 0x005a4edf | popup_on_mouse_move | UI | Popup | 1130 | 0x005A0000 | NN |  |
| 0x005a535e | popup_on_lbutton_up | UI | Popup | 90 | 0x005A0000 | NN |  |
| 0x005a53b8 | popup_on_dblclick | UI | Popup | 220 | 0x005A0000 | NN |  |
| 0x005a5494 | popup_on_vscroll_pane0_page | UI | Popup | 152 | 0x005A0000 | NN |  |
| 0x005a552c | popup_on_vscroll_pane1_pos | UI | Popup | 133 | 0x005A0000 | NN |  |
| 0x005a55b1 | popup_on_vscroll_pane1_page | UI | Popup | 152 | 0x005A0000 | NN |  |
| 0x005a5649 | popup_draw_background | UI | Popup | 309 | 0x005A0000 | NN |  |
| 0x005a577e | popup_paint | UI | Popup | 1964 | 0x005A0000 | NN |  |
| 0x005a5f34 | popup_show_modal | UI | Popup | 999 | 0x005A0000 | NN |  |
| 0x005a632a | popup_parse_text_file | UI | Popup | 2287 | 0x005A0000 | NN |  |
| 0x005a6c23 | popup_push_parent_surface | UI | Popup | 34 | 0x005A0000 | NN |  |
| 0x005a6c45 | popup_pop_parent_surface | UI | Popup | 26 | 0x005A0000 | NN |  |
| 0x005a9320 | FID_conflict:`vector_deleting_destructor' | FW | crt | 110 | 0x005A0000 | NN |  |
| 0x005a93b0 | FID_conflict:`vector_deleting_destructor' | FW | crt | 110 | 0x005A0000 | NN |  |
| 0x005a9440 | FID_conflict:`vector_deleting_destructor' | FW | crt | 110 | 0x005A0000 | NN |  |
| 0x005a94d0 | FUN_005a94d0 | UNSET |  | 57 | 0x005A0000 |  |  |
| 0x005a9520 | FID_conflict:`vector_deleting_destructor' | FW | crt | 110 | 0x005A0000 | NN |  |
| 0x005a95b0 | FUN_005a95b0 | UNSET |  | 57 | 0x005A0000 |  |  |
| 0x005a9600 | FUN_005a9600 | UNSET |  | 43 | 0x005A0000 |  |  |
| 0x005a9640 | FUN_005a9640 | UNSET |  | 32 | 0x005A0000 |  |  |
| 0x005a9670 | FUN_005a9670 | UNSET |  | 47 | 0x005A0000 |  |  |
| 0x005a96b0 | FUN_005a96b0 | UNSET |  | 43 | 0x005A0000 |  |  |
| 0x005a96f0 | FUN_005a96f0 | UNSET |  | 47 | 0x005A0000 |  |  |
| 0x005a9730 | FUN_005a9730 | UNSET |  | 55 | 0x005A0000 |  |  |
| 0x005a9780 | prepare_surface | RN | Drawing | 24 | 0x005A0000 | NN |  |
| 0x005a9798 | draw_colored_rect | RN | Drawing | 52 | 0x005A0000 | NN |  |
| 0x005a97cc | draw_hline | RN | Drawing | 69 | 0x005A0000 | NN |  |
| 0x005a9811 | draw_hline_width | RN | Drawing | 71 | 0x005A0000 | NN |  |
| 0x005a9858 | draw_vline | RN | Drawing | 69 | 0x005A0000 | NN |  |
| 0x005a989d | draw_vline_height | RN | Drawing | 71 | 0x005A0000 | NN |  |
| 0x005a98e4 | draw_rect_outline | RN | Drawing | 128 | 0x005A0000 | NN |  |
| 0x005a9964 | draw_rect_outline_wh | RN | Drawing | 152 | 0x005A0000 | NN |  |
| 0x005a99fc | draw_3d_border | RN | Drawing | 167 | 0x005A0000 | NN |  |
| 0x005a9aa3 | FUN_005a9aa3 | RN | Drawing | 28 | 0x005A0000 | NN |  |
| 0x005a9abf | fill_rect_xywh | RN | Drawing | 63 | 0x005A0000 | NN |  |
| 0x005a9afe | blit_rect_to_rect | RN | Drawing | 95 | 0x005A0000 | NN |  |
| 0x005a9b5d | tile_bitmap | RN | Drawing | 391 | 0x005A0000 | NN |  |
| 0x005a9ce9 | draw_3d_border_inset | RN | Drawing | 183 | 0x005A0000 | NN |  |
| 0x005a9f30 | mp_check_all_human_ready_production | NW | Multiplayer | 212 | 0x005A0000 | NN |  |
| 0x005aa004 | mp_check_all_human_ready_moves | NW | Multiplayer | 225 | 0x005A0000 | NN |  |
| 0x005aa0e5 | wait_production_005aa0e5 | NW | Multiplayer | 3994 | 0x005A0000 | NN |  |
| 0x005ab07f | FUN_005ab07f | UNSET |  | 12 | 0x005A0000 |  |  |
| 0x005ab095 | FUN_005ab095 | UNSET |  | 14 | 0x005A0000 |  |  |
| 0x005ab0a3 | mp_check_ready_waitprod | UNSET |  | 125 | 0x005A0000 |  |  |
| 0x005ab120 | mp_check_ready_waitmoves | UNSET |  | 125 | 0x005A0000 |  |  |
| 0x005ab19d | mp_check_ready_human | UNSET |  | 157 | 0x005A0000 |  |  |
| 0x005ab23a | mp_check_ready_human_alt | UNSET |  | 155 | 0x005A0000 |  |  |
| 0x005ab2d5 | wait_production_005ab2d5 | NW | Multiplayer | 3334 | 0x005A0000 | NN |  |
| 0x005abfdb | FUN_005abfdb | UNSET |  | 12 | 0x005A0000 |  |  |
| 0x005abff1 | FUN_005abff1 | UNSET |  | 15 | 0x005A0000 |  |  |
| 0x005ac840 | pedia_unit_init_list | UI | Civilopedia | 365 | 0x005A0000 | NN |  |
| 0x005ac9ad | pedia_unit_draw_details | UI | Civilopedia | 4075 | 0x005A0000 | NN |  |
| 0x005ad998 | pedia_select_unit_type | UI | Civilopedia | 342 | 0x005A0000 | NN |  |
| 0x005adfa0 | clamp | GL | Utility | 57 | 0x005A0000 | P |  |
| 0x005adfd9 | swap_values | GL | Utility | 45 | 0x005A0000 | P |  |
| 0x005ae006 | popcount_byte | GL | Utility | 76 | 0x005A0000 | P |  |
| 0x005ae052 | wrap_x | GL | MapUtil | 94 | 0x005A0000 | P |  |
| 0x005ae0b0 | wrap_y | GL | MapUtil | 94 | 0x005A0000 | P |  |
| 0x005ae10e | distance_x_wrapped | GL | MapUtil | 111 | 0x005A0000 | P |  |
| 0x005ae17d | tile_distance_x | GL | MapUtil | 51 | 0x005A0000 | P |  |
| 0x005ae1b0 | tile_distance_xy | GL | MapUtil | 157 | 0x005A0000 | P |  |
| 0x005ae24d | tile_distance_dxdy | GL | MapUtil | 73 | 0x005A0000 | P |  |
| 0x005ae296 | diagonal_movement_cost | GL | MapUtil | 135 | 0x005A0000 | P |  |
| 0x005ae31d | calc_movement_cost | GL | MapUtil | 94 | 0x005A0000 | P |  |
| 0x005ae37b | is_adjacent_direction | GL | MapUtil | 68 | 0x005A0000 | P |  |
| 0x005ae3bf | bit_index_to_byte_mask | GL | MapUtil | 45 | 0x005A0000 | P |  |
| 0x005ae3ec | shift_by_signed | GL | MapUtil | 98 | 0x005A0000 | P |  |
| 0x005ae580 | pbem_game_setup | GL | PBEM | 1602 | 0x005A0000 | TH |  |
| 0x005aebef | FUN_005aebef | UNSET |  | 12 | 0x005A0000 |  |  |
| 0x005aec05 | FUN_005aec05 | UNSET |  | 15 | 0x005A0000 |  |  |
| 0x005aec14 | pbem_get_email_address | GL | PBEM | 249 | 0x005A0000 | TH |  |
| 0x005aed0d | FUN_005aed0d | UNSET |  | 12 | 0x005A0000 |  |  |
| 0x005aed23 | FUN_005aed23 | UNSET |  | 14 | 0x005A0000 |  |  |
| 0x005aef20 | editor_save_unit_types_to_buffer | UI | UnitEditor | 544 | 0x005A0000 | NN |  |
| 0x005af140 | editor_load_unit_types_from_buffer | UI | UnitEditor | 515 | 0x005A0000 | NN |  |
| 0x005af343 | editor_populate_spinners | UI | UnitEditor | 353 | 0x005A0000 | NN |  |
| 0x005af4ae | editor_read_spinners | UI | UnitEditor | 458 | 0x005A0000 | NN |  |
| 0x005af682 | FUN_005af682 | UI | UnitEditor | 27 | 0x005A0000 | NN |  |
| 0x005af69d | editor_write_unit_types_to_file | UI | UnitEditor | 838 | 0x005A0000 | NN |  |
| 0x005af9e3 | show_messagebox_F9E3 | UI | UnitEditor | 487 | 0x005A0000 | NN |  |
| 0x005afbca | editor_rename_unit | UI | UnitEditor | 369 | 0x005A0000 | NN |  |
| 0x005afd3b | editor_show_help | UI | UnitEditor | 95 | 0x005A0000 | NN |  |
| 0x005afd9a | FUN_005afd9a | UI | UnitEditor | 40 | 0x005A0000 | NN |  |
| 0x005afdc2 | editor_copy_unit_graphics | UI | UnitEditor | 83 | 0x005A0000 | NN |  |
| 0x005afe15 | editor_export_unit_text | UI | UnitEditor | 111 | 0x005A0000 | NN |  |
| 0x005afe84 | FUN_005afe84 | UI | UnitEditor | 36 | 0x005A0000 | NN |  |
| 0x005afea8 | editor_show_abilities_dialog | UI | UnitEditor | 1021 | 0x005A0000 | NN |  |
| 0x005b02a5 | editor_update_display_mode | UI | editor | 196b | 0x005B0000 | SK |  |
| 0x005b0373 | editor_handle_command | UI | editor | 256b | 0x005B0000 | SK |  |
| 0x005b0473 | editor_populate_listbox | UI | editor | 1111b | 0x005B0000 | SK |  |
| 0x005b08e8 | editor_create_spinbox | UI | editor | 244b | 0x005B0000 | SK |  |
| 0x005b09dc | editor_paint | UI | editor | 1627b | 0x005B0000 | SK |  |
| 0x005b1037 | editor_init_window | UI | editor | 2484b | 0x005B0000 | SK |  |
| 0x005b1a05 | editor_cleanup_a | UI | editor | 12b | 0x005B0000 | SK |  |
| 0x005b1a1b | editor_seh_epilog_a | FW | window | 14b | 0x005B0000 | SK |  |
| 0x005b1a29 | editor_launch | UI | editor | 89b | 0x005B0000 | SK |  |
| 0x005b1a82 | editor_destroy_parent | UI | editor | 12b | 0x005B0000 | SK |  |
| 0x005b1a98 | editor_seh_epilog_b | UI | editor | 14b | 0x005B0000 | SK |  |
| 0x005b2590 | validate_unit_stack | GL | unit_stack | 1050b | 0x005B0000 | PA |  |
| 0x005b29aa | get_unit_max_hp | GL | unit_mgmt | 45b | 0x005B0000 | P |  |
| 0x005b29d7 | get_unit_hp_remaining | GL | unit_mgmt | 98b | 0x005B0000 | P |  |
| 0x005b2a39 | calc_unit_movement_points | GL | movement | 516b | 0x005B0000 | PA |  |
| 0x005b2c3d | get_unit_moves_remaining | GL | movement | 69b | 0x005B0000 | P |  |
| 0x005b2c82 | get_next_unit_in_stack | GL | unit_stack | 65b | 0x005B0000 | P |  |
| 0x005b2cc3 | get_last_unit_in_stack | GL | unit_stack | 118b | 0x005B0000 | PA |  |
| 0x005b2d39 | get_first_unit_in_stack | GL | unit_stack | 118b | 0x005B0000 | P |  |
| 0x005b2daf | find_first_unit_at | GL | unit_stack | 186b | 0x005B0000 | PA |  |
| 0x005b2e69 | find_unit_stack_at_xy | GL | unit_stack | 231b | 0x005B0000 | PA |  |
| 0x005b2f50 | set_unit_goto_order | GL | unit_mgmt | 66b | 0x005B0000 | PA |  |
| 0x005b2f92 | get_nth_unit_in_stack | GL | unit_stack | 117b | 0x005B0000 | PA |  |
| 0x005b3007 | count_prev_units | GL | unit_stack | 63b | 0x005B0000 | SK |  |
| 0x005b3046 | get_nth_unit_by_role | GL | unit_stack | 163b | 0x005B0000 | R |  |
| 0x005b30e9 | count_units_in_stack | GL | unit_stack | 77b | 0x005B0000 | PA |  |
| 0x005b3136 | count_unit_type_in_stack | GL | unit_stack | 104b | 0x005B0000 | PA |  |
| 0x005b319e | pick_up_unit | GL | unit_mgmt | 705b | 0x005B0000 | PA |  |
| 0x005b345f | put_down_unit | GL | unit_mgmt | 640b | 0x005B0000 | PA |  |
| 0x005b36df | relocate_unit | GL | unit_mgmt | 388b | 0x005B0000 | PA |  |
| 0x005b3863 | relocate_unit_in_place | GL | unit_mgmt | 60b | 0x005B0000 | SK |  |
| 0x005b389f | move_unit_to_bottom | GL | unit_mgmt | 577b | 0x005B0000 | SK |  |
| 0x005b3ae0 | relocate_all_units | GL | unit_mgmt | 152b | 0x005B0000 | SK |  |
| 0x005b3b78 | eject_air_units | GL | unit_mgmt | 343b | 0x005B0000 | TM |  |
| 0x005b3cd4 | eject_air_and_return_first | GL | unit_mgmt | 50b | 0x005B0000 | SK |  |
| 0x005b3d06 | create_unit | GL | unit_mgmt | 1675b | 0x005B0000 | PA |  |
| 0x005b4391 | delete_unit | GL | unit_mgmt | 1129b | 0x005B0000 | PA |  |
| 0x005b47fa | delete_all_units_in_stack | GL | unit_mgmt | 144b | 0x005B0000 | SK |  |
| 0x005b488a | clear_unit_visibility | GL | visibility | 39b | 0x005B0000 | PA |  |
| 0x005b48b1 | clear_stack_visibility | GL | visibility | 88b | 0x005B0000 | SK |  |
| 0x005b490e | set_unit_seen_by | GL | visibility | 96b | 0x005B0000 | PA |  |
| 0x005b496e | set_stack_seen_by | GL | visibility | 92b | 0x005B0000 | SK |  |
| 0x005b49cf | check_zoc_violation | GL | movement | 407b | 0x005B0000 | R |  |
| 0x005b4b66 | check_adjacent_enemy_simple | GL | movement | 253b | 0x005B0000 | R |  |
| 0x005b4c63 | check_adjacent_enemy_continent | GL | movement | 297b | 0x005B0000 | R |  |
| 0x005b4d8c | check_zoc_if_no_city | GL | movement | 86b | 0x005B0000 | R |  |
| 0x005b4de2 | is_civ_adjacent | GL | visibility | 251b | 0x005B0000 | R |  |
| 0x005b4ee2 | set_stack_visibility_mask | GL | visibility | 90b | 0x005B0000 | SK |  |
| 0x005b4f3c | get_civs_near_tile | GL | visibility | 142b | 0x005B0000 | SK |  |
| 0x005b4fca | update_unit_visibility_neighbors | GL | visibility | 113b | 0x005B0000 | SK |  |
| 0x005b503b | stack_contains_type | GL | unit_stack | 114b | 0x005B0000 | PA |  |
| 0x005b50ad | sum_stack_property | GL | unit_mgmt | 758b | 0x005B0000 | R |  |
| 0x005b53b6 | count_units_by_role | GL | unit_mgmt | 118b | 0x005B0000 | R |  |
| 0x005b542e | load_unit_onto_ship | GL | unit_mgmt | 1912b | 0x005B0000 | TH |  |
| 0x005b5bab | stack_unit | GL | unit_mgmt | 380b | 0x005B0000 | TM |  |
| 0x005b5d93 | delete_unit_safely | GL | unit_mgmt | 666b | 0x005B0000 | TM |  |
| 0x005b6042 | delete_unit_visible | GL | unit_mgmt | 425b | 0x005B0000 | R |  |
| 0x005b620a | autoload_ships | GL | unit_mgmt | 222b | 0x005B0000 | TM |  |
| 0x005b62ee | set_stack_orders | GL | unit_mgmt | 81b | 0x005B0000 | SK |  |
| 0x005b633f | is_unit_ready_to_move | GL | movement | 281b | 0x005B0000 | PA |  |
| 0x005b6458 | is_unit_active | GL | unit_mgmt | 186b | 0x005B0000 | PA |  |
| 0x005b6512 | find_next_unit_needing_orders | GL | unit_mgmt | 629b | 0x005B0000 | PA |  |
| 0x005b6787 | refresh_unit_movement | GL | movement | 43b | 0x005B0000 | PA |  |
| 0x005b67af | find_nearest_unit | GL | unit_mgmt | 236b | 0x005B0000 | SK |  |
| 0x005b6898 | get_unit_home_city_name | GL | unit_mgmt | 94b | 0x005B0000 | P |  |
| 0x005b68f6 | check_unit_can_improve | GL | unit_mgmt | 362b | 0x005B0000 | TH |  |
| 0x005b6a58 | clear_unit_orders | GL | unit_mgmt | 66b | 0x005B0000 | PA |  |
| 0x005b6aa0 | return_true | GL | unit_mgmt | 21b | 0x005B0000 | SK |  |
| 0x005b6ab5 | draw_unit_for_dialog | UNSET |  | 53 | 0x005B0000 |  |  |
| 0x005b6aea | show_unit_list_dialog | UI | text | 693b | 0x005B0000 | SK |  |
| 0x005b6d9f | dialog_cleanup_a | FW | window | 12b | 0x005B0000 | SK |  |
| 0x005b6dab | dialog_cleanup_b | FW | window | 13b | 0x005B0000 | SK |  |
| 0x005b6dbe | dialog_seh_epilog | FW | window | 14b | 0x005B0000 | SK |  |
| 0x005b7fe0 | alloc_map_data | GL | map_data | 1078b | 0x005B0000 | PA |  |
| 0x005b8416 | free_map_data | GL | map_data | 486b | 0x005B0000 | SK |  |
| 0x005b85fe | init_map_seed | GL | map_data | 55b | 0x005B0000 | P |  |
| 0x005b8635 | save_map_data | GL | map_data | 334b | 0x005B0000 | PA |  |
| 0x005b8783 | load_map_data | GL | map_data | 430b | 0x005B0000 | PA |  |
| 0x005b8931 | get_tile_ptr | GL | map_access | 90b | 0x005B0000 | P |  |
| 0x005b898b | get_civ_vis_ptr | GL | map_access | 48b | 0x005B0000 | PA |  |
| 0x005b89bb | get_tile_terrain_raw | GL | map_access | 41b | 0x005B0000 | P |  |
| 0x005b89e4 | is_tile_ocean | GL | map_access | 57b | 0x005B0000 | P |  |
| 0x005b8a1d | get_tile_owner | GL | map_access | 100b | 0x005B0000 | PA |  |
| 0x005b8a81 | get_tile_continent | GL | map_access | 39b | 0x005B0000 | P |  |
| 0x005b8aa8 | get_tile_continent_if_land | GL | map_access | 72b | 0x005B0000 | PA |  |
| 0x005b8af0 | get_tile_city_radius_owner | GL | map_access | 42b | 0x005B0000 | PA |  |
| 0x005b8b1a | update_civ_visibility | GL | visibility | 75b | 0x005B0000 | SK |  |
| 0x005b8b65 | get_tile_explored | GL | map_access | 71b | 0x005B0000 | P |  |
| 0x005b8bac | set_tile_explored | GL | map_access | 108b | 0x005B0000 | PA |  |
| 0x005b8c18 | get_tile_fertility | GL | map_access | 42b | 0x005B0000 | PA |  |
| 0x005b8c42 | get_tile_effective_owner | GL | map_access | 100b | 0x005B0000 | R |  |
| 0x005b8ca6 | get_city_owner_at | GL | map_access | 111b | 0x005B0000 | P |  |
| 0x005b8d15 | get_fortress_owner_at | GL | map_access | 77b | 0x005B0000 | SK |  |
| 0x005b8d62 | get_unit_owner_at | GL | map_access | 66b | 0x005B0000 | P |  |
| 0x005b8da4 | get_tile_controller | GL | map_access | 72b | 0x005B0000 | SK |  |
| 0x005b8dec | check_tile_trespass | GL | map_query | 248b | 0x005B0000 | TL |  |
| 0x005b8ee1 | check_tile_resource | GL | map_query | 281b | 0x005B0000 | P |  |
| 0x005b8ffa | check_tile_goody_hut | GL | map_query | 229b | 0x005B0000 | R |  |
| 0x005b90df | reveal_tile | GL | map_query | 154b | 0x005B0000 | PA |  |
| 0x005b9179 | generate_terrain_around | GL | map_query | 696b | 0x005B0000 | TL |  |
| 0x005b9431 | is_tech_known_by_continent | GL | continent | 78b | 0x005B0000 | SK |  |
| 0x005b947f | count_known_techs_continent | GL | continent | 86b | 0x005B0000 | SK |  |
| 0x005b94d5 | get_tile_improvements | GL | map_access | 39b | 0x005B0000 | P |  |
| 0x005b94fc | set_tile_improvement_bits | GL | map_setter | 330b | 0x005B0000 | PA |  |
| 0x005b9646 | set_tile_terrain | GL | map_setter | 295b | 0x005B0000 | PA |  |
| 0x005b976d | set_tile_visibility_bits | GL | map_setter | 330b | 0x005B0000 | PA |  |
| 0x005b98b7 | set_tile_fertility | GL | map_setter | 305b | 0x005B0000 | SK |  |
| 0x005b99e8 | set_tile_owner | GL | map_setter | 333b | 0x005B0000 | PA |  |
| 0x005b9b35 | set_tile_continent | GL | map_setter | 276b | 0x005B0000 | PA |  |
| 0x005b9c49 | set_tile_city_radius_owner | GL | map_setter | 312b | 0x005B0000 | PA |  |
| 0x005b9d81 | set_civ_tile_data | GL | map_setter | 325b | 0x005B0000 | SK |  |
| 0x005b9ec6 | begin_map_batch | GL | map_net | 86b | 0x005B0000 | NN |  |
| 0x005b9f1c | end_map_batch | GL | map_net | 194b | 0x005B0000 | NN |  |
| 0x005b9fde | queue_map_update | GL | map_net | 552b | 0x005B0000 | NN |  |
| 0x005ba206 | apply_map_updates | GL | map_net | 434b | 0x005B0000 | NN |  |
| 0x005bad40 | parse_binary_string | UI | text | 176b | 0x005B0000 | SK |  |
| 0x005badf0 | build_file_path | UI | text | 192b | 0x005B0000 | SK |  |
| 0x005baeb0 | set_text_draw_target | UI | text | 24b | 0x005B0000 | SK |  |
| 0x005baec8 | set_text_draw_source | UI | text | 24b | 0x005B0000 | SK |  |
| 0x005baee0 | set_text_style | UI | text | 68b | 0x005B0000 | SK |  |
| 0x005baf24 | set_text_outline | UI | text | 51b | 0x005B0000 | SK |  |
| 0x005baf57 | draw_text_with_shadow | UI | text | 205b | 0x005B0000 | SK |  |
| 0x005bb024 | draw_text_centered | UI | text | 139b | 0x005B0000 | SK |  |
| 0x005bb0af | draw_text_right_aligned | UI | text | 86b | 0x005B0000 | SK |  |
| 0x005bb3f0 | create_offscreen_surface | FW | surface | 115b | 0x005B0000 | SK |  |
| 0x005bb463 | create_offscreen_surface_ex | FW | surface | 75b | 0x005B0000 | SK |  |
| 0x005bb4ae | create_offscreen_surface_b | FW | surface | 119b | 0x005B0000 | SK |  |
| 0x005bb525 | create_offscreen_surface_b_ex | FW | surface | 79b | 0x005B0000 | SK |  |
| 0x005bb574 | set_active_surface | FW | surface | 74b | 0x005B0000 | SK |  |
| 0x005bb5be | handle_size_change | FW | surface | 99b | 0x005B0000 | SK |  |
| 0x005bb621 | resize_window | FW | surface | 166b | 0x005B0000 | SK |  |
| 0x005bb6c7 | scroll_to_clamped | FW | surface | 153b | 0x005B0000 | SK |  |
| 0x005bb760 | create_child_surface | FW | surface | 99b | 0x005B0000 | SK |  |
| 0x005bb7c3 | create_child_surface_ex | FW | surface | 71b | 0x005B0000 | SK |  |
| 0x005bb80a | create_child_surface_b | FW | surface | 103b | 0x005B0000 | SK |  |
| 0x005bb871 | create_child_surface_b_ex | FW | surface | 79b | 0x005B0000 | SK |  |
| 0x005bb8c0 | get_surface_handle | FW | surface | 32b | 0x005B0000 | SK |  |
| 0x005bb8e0 | set_surface_size | FW | surface | 48b | 0x005B0000 | SK |  |
| 0x005bb910 | get_scroll_min | FW | surface | 64b | 0x005B0000 | SK |  |
| 0x005bb950 | get_scroll_max | FW | surface | 64b | 0x005B0000 | SK |  |
| 0x005bb990 | call_refresh_callback | FW | surface | 48b | 0x005B0000 | SK |  |
| 0x005bb9c0 | flush_mouse_keyboard_msgs | FW | msgpump | 93b | 0x005B0000 | SK |  |
| 0x005bba1d | flush_all_messages | FW | msgpump | 50b | 0x005B0000 | SK |  |
| 0x005bba4f | process_one_message | FW | msgpump | 105b | 0x005B0000 | SK |  |
| 0x005bbab8 | process_paint_message | FW | msgpump | 82b | 0x005B0000 | SK |  |
| 0x005bbb0a | process_all_pending | FW | msgpump | 40b | 0x005B0000 | SK |  |
| 0x005bbb32 | process_all_paints | FW | msgpump | 40b | 0x005B0000 | SK |  |
| 0x005bbb5a | launch_program | FW | msgpump | 28b | 0x005B0000 | SK |  |
| 0x005bbb76 | process_timer_message | FW | msgpump | 88b | 0x005B0000 | SK |  |
| 0x005bbbce | process_timer_and_idle | FW | msgpump | 66b | 0x005B0000 | SK |  |
| 0x005bbc10 | create_game_window | FW | window | 990b | 0x005B0000 | SK |  |
| 0x005bbfee | enable_window | FW | window | 43b | 0x005B0000 | SK |  |
| 0x005bc019 | set_window_data | FW | window | 25b | 0x005B0000 | SK |  |
| 0x005bc032 | is_window_visible | FW | window | 76b | 0x005B0000 | SK |  |
| 0x005bc07e | close_window | FW | window | 45b | 0x005B0000 | SK |  |
| 0x005bc0ab | destroy_game_window | FW | window | 200b | 0x005B0000 | SK |  |
| 0x005bc173 | enumerate_windows | FW | window | 66b | 0x005B0000 | SK |  |
| 0x005bc1b5 | push_window_stack | FW | window | 38b | 0x005B0000 | SK |  |
| 0x005bc1db | pop_window_stack | FW | window | 165b | 0x005B0000 | SK |  |
| 0x005bc280 | set_window_background | FW | window | 222b | 0x005B0000 | SK |  |
| 0x005bc35e | set_window_bg_rgb | FW | window | 97b | 0x005B0000 | SK |  |
| 0x005bc3bf | set_window_callback_a | FW | window | 25b | 0x005B0000 | SK |  |
| 0x005bc3d8 | set_window_callback_b | FW | window | 25b | 0x005B0000 | SK |  |
| 0x005bc3f1 | set_window_callback_c | FW | window | 25b | 0x005B0000 | SK |  |
| 0x005bc40a | show_window | FW | window | 67b | 0x005B0000 | SK |  |
| 0x005bc44d | hide_window | FW | window | 41b | 0x005B0000 | SK |  |
| 0x005bc476 | set_window_title | FW | window | 43b | 0x005B0000 | SK |  |
| 0x005bc4a1 | move_window | FW | window | 100b | 0x005B0000 | SK |  |
| 0x005bc505 | resize_window_client | FW | window | 213b | 0x005B0000 | SK |  |
| 0x005bc5da | maximize_window | FW | window | 41b | 0x005B0000 | SK |  |
| 0x005bc603 | is_window_maximized | FW | window | 51b | 0x005B0000 | SK |  |
| 0x005bc636 | minimize_window | FW | window | 41b | 0x005B0000 | SK |  |
| 0x005bc65f | is_window_minimized | FW | window | 51b | 0x005B0000 | SK |  |
| 0x005bc692 | restore_window | FW | window | 41b | 0x005B0000 | SK |  |
| 0x005bc6bb | validate_window_rect | FW | window | 43b | 0x005B0000 | SK |  |
| 0x005bc6e6 | invalidate_window_rect | FW | window | 45b | 0x005B0000 | SK |  |
| 0x005bc713 | move_window_to_rect | FW | window | 80b | 0x005B0000 | SK |  |
| 0x005bc763 | center_window | FW | window | 464b | 0x005B0000 | SK |  |
| 0x005bc933 | get_client_width | FW | window | 56b | 0x005B0000 | SK |  |
| 0x005bc96b | get_client_height | FW | window | 56b | 0x005B0000 | SK |  |
| 0x005bc9a3 | get_window_rect | FW | window | 48b | 0x005B0000 | SK |  |
| 0x005bc9d3 | get_nonclient_width | FW | window | 106b | 0x005B0000 | SK |  |
| 0x005bca3d | get_nonclient_height | FW | window | 106b | 0x005B0000 | SK |  |
| 0x005bcaa7 | get_screen_rect | FW | window | 48b | 0x005B0000 | SK |  |
| 0x005bcad7 | client_to_screen | FW | window | 79b | 0x005B0000 | SK |  |
| 0x005bcb26 | client_to_parent | FW | window | 95b | 0x005B0000 | SK |  |
| 0x005bcb85 | get_window_rect_in_parent | FW | window | 140b | 0x005B0000 | SK |  |
| 0x005bcc11 | blit_to_screen | FW | window | 124b | 0x005B0000 | SK |  |
| 0x005bcc8d | blit_to_surface | FW | window | 85b | 0x005B0000 | SK |  |
| 0x005bcce2 | stretch_blit_to_screen | FW | window | 132b | 0x005B0000 | SK |  |
| 0x005bcd66 | stretch_blit_to_surface | FW | window | 93b | 0x005B0000 | SK |  |
| 0x005bcdc3 | select_palette | FW | window | 57b | 0x005B0000 | SK |  |
| 0x005bcdfc | set_window_menu | FW | window | 99b | 0x005B0000 | SK |  |
| 0x005bce5f | set_window_icon | FW | window | 143b | 0x005B0000 | SK |  |
| 0x005bceee | load_cursor_resource | FW | window | 46b | 0x005B0000 | SK |  |
| 0x005bcf1c | destroy_cursor | FW | window | 36b | 0x005B0000 | SK |  |
| 0x005bcf40 | set_cursor | FW | window | 26b | 0x005B0000 | SK |  |
| 0x005bcf5a | set_window_cursor | FW | window | 70b | 0x005B0000 | SK |  |
| 0x005bcfa0 | show_cursor | FW | window | 24b | 0x005B0000 | SK |  |
| 0x005bcfb8 | hide_cursor | FW | window | 37b | 0x005B0000 | SK |  |
| 0x005bcfdd | set_cursor_by_id | FW | window | 70b | 0x005B0000 | SK |  |
| 0x005bd023 | set_cursor_direct | FW | window | 60b | 0x005B0000 | SK |  |
| 0x005bd05f | load_and_store_cursor | FW | window | 136b | 0x005B0000 | SK |  |
| 0x005bd0e7 | focus_and_raise | FW | window | 57b | 0x005B0000 | SK |  |
| 0x005bd120 | focus_window | FW | window | 44b | 0x005B0000 | SK |  |
| 0x005bd14c | disable_parent | FW | window | 121b | 0x005B0000 | SK |  |
| 0x005bd1c5 | enable_parent | FW | window | 126b | 0x005B0000 | SK |  |
| 0x005bd248 | set_window_timer_a | FW | window | 40b | 0x005B0000 | SK |  |
| 0x005bd270 | set_window_timer_b | FW | window | 40b | 0x005B0000 | SK |  |
| 0x005bd298 | wait_for_mouse_release | FW | window | 262b | 0x005B0000 | SK |  |
| 0x005bd39e | check_modifier_key | FW | window | 241b | 0x005B0000 | SK |  |
| 0x005bd48f | get_cursor_pos_client | FW | window | 62b | 0x005B0000 | SK |  |
| 0x005bd4cd | is_left_button_down | FW | window | 51b | 0x005B0000 | SK |  |
| 0x005bd500 | is_right_button_down | FW | window | 51b | 0x005B0000 | SK |  |
| 0x005bd533 | capture_mouse | FW | window | 29b | 0x005B0000 | SK |  |
| 0x005bd550 | release_mouse | FW | window | 22b | 0x005B0000 | SK |  |
| 0x005bd566 | set_topmost_child | FW | window | 167b | 0x005B0000 | SK |  |
| 0x005bd610 | get_window_flags | FW | window | 27b | 0x005B0000 | SK |  |
| 0x005bd630 | port_constructor | FW | surface | 44b | 0x005B0000 | SK |  |
| 0x005bd65c | port_alloc_rect | FW | surface | 58b | 0x005B0000 | SK |  |
| 0x005bd696 | port_alloc | FW | surface | 325b | 0x005B0000 | SK |  |
| 0x005bd7db | port_load_image | FW | surface | 56b | 0x005B0000 | SK |  |
| 0x005bd813 | port_init | FW | surface | 258b | 0x005B0000 | SK |  |
| 0x005bd915 | port_destructor | FW | surface | 114b | 0x005B0000 | SK |  |
| 0x005bd987 | load_lbm_resource | FW | image | 1508b | 0x005B0000 | SK |  |
| 0x005bdf7f | decode_lbm_scanline | FW | image | 559b | 0x005B0000 | SK |  |
| 0x005be1b3 | decode_rle_row | FW | image | 268b | 0x005B0000 | SK |  |
| 0x005be2c4 | load_tga_resource | FW | image | 701b | 0x005B0000 | SK |  |
| 0x005be595 | load_tga_file | FW | image | 919b | 0x005B0000 | SK |  |
| 0x005be940 | tga_file_cleanup | FW | image | 12b | 0x005B0000 | SK |  |
| 0x005be956 | tga_file_seh_epilog | FW | image | 17b | 0x005B0000 | SK |  |
| 0x005be967 | load_pcx_resource | FW | image | 805b | 0x005B0000 | SK |  |
| 0x005bec8c | load_pcx_file | FW | image | 958b | 0x005B0000 | SK |  |
| 0x005bf04a | pcx_file_cleanup | FW | image | 12b | 0x005B0000 | SK |  |
| 0x005bf060 | pcx_file_seh_epilog | FW | image | 17b | 0x005B0000 | SK |  |
| 0x005bf071 | load_gif_file | FW | image | 1353b | 0x005B0000 | SK |  |
| 0x005bf5ba | gif_file_cleanup | FW | image | 12b | 0x005B0000 | SK |  |
| 0x005bf5d0 | gif_file_seh_epilog | FW | image | 17b | 0x005B0000 | SK |  |
| 0x005bf5e1 | load_gif_resource | FW | image | 847b | 0x005B0000 | SK |  |
| 0x005bf930 | load_cvpc_resource | FW | image | 425b | 0x005B0000 | SK |  |
| 0x005bfad9 | load_bmp_resource | FW | image | 550b | 0x005B0000 | SK |  |
| 0x005bfcff | load_bmp_file | FW | image | 782b | 0x005B0000 | SK |  |
| 0x005c000d | bmp_file_cleanup | FW | image | 12b | 0x005C0000 | SK | Calls FUN_005d7c6e (SEH destructor) |
| 0x005c0023 | bmp_file_seh_epilog | FW | image | 17b | 0x005C0000 | SK | Restores FS:[0] chain from EBP-0xC |
| 0x005c0034 | port_set_rect_from_self | RN | port | 63 | 0x005C0000 | SK | SetRect(this+0x14) from this+0x24..0x30 |
| 0x005c0073 | port_set_rect | RN | port | 91 | 0x005C0000 | SK | SetRect(this+0x14) from param RECT |
| 0x005c00ce | port_set_clip_rect | RN | port | 55 | 0x005C0000 | SK | Sets clip rect, validates against bounds |
| 0x005c0105 | port_get_clip_rect | RN | port | 131 | 0x005C0000 | SK | Gets clip rect into output param |
| 0x005c019d | port_init_buffer | RN | port | 36 | 0x005C0000 | SK | Initializes port buffer pointer |
| 0x005c01c1 | port_lock | RN | port | 287 | 0x005C0000 | SK | Locks port surface for pixel access. "Port not locked" warning |
| 0x005c02e0 | port_unlock | RN | port | 83 | 0x005C0000 | SK | Unlocks port surface |
| 0x005c0333 | port_fill_rect | RN | port | 236 | 0x005C0000 | SK | Fills rectangle with color. "Port not locked in Fill" |
| 0x005c041f | port_set_color | RN | port | 43 | 0x005C0000 | SK | Sets current drawing color |
| 0x005c044a | port_set_text_color | RN | port | 47 | 0x005C0000 | SK | Sets text drawing color |
| 0x005c0479 | port_copy_rect | RN | port | 282 | 0x005C0000 | SK | Copies rect between ports. Lock check warnings |
| 0x005c0593 | port_blit_stretch | RN | port | 443 | 0x005C0000 | SK | Stretched blit between ports (source/dest locking) |
| 0x005c0753 | port_copy_to_screen | RN | port | 540 | 0x005C0000 | SK | Copies port to screen DC. "CopyToScreen" error string |
| 0x005c0979 | port_copy_to_screen_clipped | RN | port | 220 | 0x005C0000 | SK | Clipped version of copy to screen |
| 0x005c0a55 | port_copy_to_screen_rect | RN | port | 215 | 0x005C0000 | SK | Another copy-to-screen variant |
| 0x005c0b2c | port_get_pixel | RN | port | 198 | 0x005C0000 | SK | Gets pixel at (x,y). "GetPixel out of clip rect" |
| 0x005c0bf2 | port_set_pixel | RN | port | 107 | 0x005C0000 | SK | Sets pixel at (x,y). "SetPixel out of clip rect" |
| 0x005c0c5d | port_draw_text_at | RN | text | 104 | 0x005C0000 | SK | Draws text at position. "No current font selected" |
| 0x005c0cc5 | port_draw_text_rect | RN | text | 77 | 0x005C0000 | SK | Draws text in rect. "No current font selected" |
| 0x005c0d12 | port_select_palette | RN | port | 87 | 0x005C0000 | SK | Selects palette for port |
| 0x005c0d69 | port_draw_text_styled | RN | text | 238 | 0x005C0000 | SK | Draws styled text (shadow, bold). "No current font selected" |
| 0x005c0e57 | port_draw_text_measure | RN | text | 256 | 0x005C0000 | SK | Draws text and measures bounds |
| 0x005c0f57 | port_fill_rect_pattern | RN | port | 201 | 0x005C0000 | SK | Pattern fill in port surface |
| 0x005c1020 | port_measure_text | RN | text | 219 | 0x005C0000 | SK | Measures text width in port context |
| 0x005c10fb | port_set_font | RN | text | 108 | 0x005C0000 | SK | Sets current font for port text operations |
| 0x005c1167 | port_get_font | RN | text | 75 | 0x005C0000 | SK | Returns current font pointer |
| 0x005c11b2 | port_alloc | RN | port | 683 | 0x005C0000 | SK | Allocates port buffer. "ERR_PORTALLOCFAILED" (Port.cpp) |
| 0x005c145d | port_load_picture_resource | RN | image_load | 182 | 0x005C0000 | SK | Loads picture from resource. "Picture resource not found" |
| 0x005c1513 | port_load_tga | RN | image_load | 559 | 0x005C0000 | SK | Loads TGA into port. "Targa Compression Not Implemented" |
| 0x005c1742 | port_load_bmp_resource | RN | image_load | 560 | 0x005C0000 | SK | Loads BMP from resource. "Bitmap resource not found" |
| 0x005c1972 | port_set_palette_index | RN | port | 38 | 0x005C0000 | SK | Sets a palette index value |
| 0x005c1998 | port_get_palette_entry | RN | port | 21 | 0x005C0000 | SK | Returns palette entry |
| 0x005c19ad | port_push_color_byte | RN | port | 38 | 0x005C0000 | SK | Pushes color byte for palette ops |
| 0x005c19d3 | port_get_pixel_ptr | RN | port | 45 | 0x005C0000 | SK | Returns pointer to pixel at (x,y) in locked port |
| 0x005c1a00 | port_alloc_variant_b | RN | port | 93 | 0x005C0000 | SK | Second port allocation variant |
| 0x005c1a62 | port_load_tga_file | RN | image_load | 171 | 0x005C0000 | SK | TGA from file (not resource). "Targa File not found" |
| 0x005c1b0d | port_alloc_variant_c | RN | port | 58 | 0x005C0000 | SK | Third port allocation variant |
| 0x005c1b47 | port_load_gif_resource | RN | image_load | 338 | 0x005C0000 | SK | Loads GIF from resource. Checks header/color table |
| 0x005c1c99 | port_load_gif_resource_wrapper | RN | image_load | 36 | 0x005C0000 | SK | Wrapper for GIF resource loading |
| 0x005c1cbd | port_load_gif_file | RN | image_load | 58 | 0x005C0000 | SK | Loads GIF from file |
| 0x005c1cf7 | gif_decode_lzw | RN | image_load | 338 | 0x005C0000 | SK | GIF LZW decompression core |
| 0x005c1e49 | gif_resource_wrapper_2 | RN | image_load | 36 | 0x005C0000 | SK | Another GIF resource wrapper |
| 0x005c1e6d | gif_file_wrapper | RN | image_load | 58 | 0x005C0000 | SK | Another GIF file wrapper |
| 0x005c1ea7 | port_load_picture_file | RN | image_load | 338 | 0x005C0000 | SK | Loads picture from file (BMP/TGA) |
| 0x005c1ff9 | port_load_picture_wrapper | RN | image_load | 36 | 0x005C0000 | SK | Picture loading wrapper |
| 0x005c201d | port_load_bitmap_file | RN | image_load | 43 | 0x005C0000 | SK | Bitmap file loading wrapper |
| 0x005c2048 | tga_decode_rle | RN | image_load | 782 | 0x005C0000 | SK | TGA RLE decode. Upside-down warning string |
| 0x005c2360 | tga_load_from_file | RN | image_load | 1052 | 0x005C0000 | SK | TGA file loader. "Error: Targa File not found" |
| 0x005c2786 | seh_cleanup_2786 | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup (calls FUN_005d7c6e) |
| 0x005c279c | seh_restore_fs_279c | FW | seh | 17 | 0x005C0000 | SK | FS-chain restore |
| 0x005c27ad | bmp_load_from_resource | RN | image_load | 699 | 0x005C0000 | SK | BMP resource loader. "Bitmap resource not found" |
| 0x005c2a77 | bmp_load_from_file | RN | image_load | 945 | 0x005C0000 | SK | BMP file loader. "Bitmap file not found" |
| 0x005c2e37 | seh_cleanup_2e37 | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005c2e4d | seh_restore_fs_2e4d | FW | seh | 17 | 0x005C0000 | SK | FS-chain restore |
| 0x005c2e5e | gif_decode_resource | RN | image_load | 1205 | 0x005C0000 | SK | Full GIF resource decode (header+LZW) |
| 0x005c3313 | gif_decode_file | RN | image_load | 1338 | 0x005C0000 | SK | Full GIF file decode |
| 0x005c384d | seh_cleanup_384d | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005c3863 | seh_restore_fs_3863 | FW | seh | 17 | 0x005C0000 | SK | FS-chain restore |
| 0x005c3874 | picture_load_resource_dispatch | RN | image_load | 774 | 0x005C0000 | SK | Dispatches to BMP/TGA/GIF loader by resource type |
| 0x005c3b7a | picture_load_file_dispatch | RN | image_load | 859 | 0x005C0000 | SK | Dispatches to BMP/TGA/GIF file loader |
| 0x005c3ed5 | seh_cleanup_3ed5 | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005c3eeb | seh_restore_fs_3eeb | FW | seh | 17 | 0x005C0000 | SK | FS-chain restore |
| 0x005c3efc | bmp_load_resource_ex | RN | image_load | 432 | 0x005C0000 | SK | Extended BMP resource loader |
| 0x005c40b6 | bmp_load_file_ex | RN | image_load | 654 | 0x005C0000 | SK | Extended BMP file loader |
| 0x005c434e | seh_cleanup_434e | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005c4364 | seh_restore_fs_4364 | FW | seh | 17 | 0x005C0000 | SK | FS-chain restore |
| 0x005c4375 | tga_load_resource_full | RN | image_load | 704 | 0x005C0000 | SK | Full TGA resource loader |
| 0x005c463f | tga_load_file_full | RN | image_load | 951 | 0x005C0000 | SK | Full TGA file loader |
| 0x005c4a00 | seh_cleanup_4a00 | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005c4a16 | seh_restore_fs_4a16 | FW | seh | 17 | 0x005C0000 | SK | FS-chain restore |
| 0x005c4a27 | port_fill_rect_clipped | RN | port | 293 | 0x005C0000 | SK | Fills clipped rect. "Port not locked in Fill" |
| 0x005c4b4c | port_copy_scanline | RN | port | 51 | 0x005C0000 | SK | Copies scanline data between ports |
| 0x005c4b7f | port_copy_rect_clipped | RN | port | 194 | 0x005C0000 | SK | Clipped rect copy. "Port not locked in Copy" |
| 0x005c4c46 | port_draw_text_shadow | RN | text | 194 | 0x005C0000 | SK | Draws text with shadow effect |
| 0x005c4d0d | port_draw_text_in_rect_shadow | RN | text | 198 | 0x005C0000 | SK | Draws text in rect with shadow |
| 0x005c4dd3 | text_draw_with_shadow | RN | text | 227 | 0x005C0000 | SK | Draws text at x,y with optional shadow (bit 0x10) |
| 0x005c4eb6 | text_draw_in_rect_with_shadow | RN | text | 233 | 0x005C0000 | SK | Draws text in RECT with shadow + color table |
| 0x005c4f9f | text_draw_with_font_shadow | RN | text | 190 | 0x005C0000 | SK | Same as above with explicit font param |
| 0x005c505d | text_draw_in_rect_with_font_shadow | RN | text | 208 | 0x005C0000 | SK | Rect variant with explicit font |
| 0x005c512d | text_measure_string | RN | text | 120 | 0x005C0000 | SK | Measures string extent. "No current font selected" |
| 0x005c51a5 | text_measure_string_with_font | RN | text | 87 | 0x005C0000 | SK | Measures string with explicit font param |
| 0x005c51fc | port_draw_line_clipped | RN | port | 225 | 0x005C0000 | SK | Draws line with clip rect check |
| 0x005c52dd | port_draw_rect_outline | RN | port | 230 | 0x005C0000 | SK | Draws rect outline (4 line calls) |
| 0x005c53c3 | port_draw_ellipse | RN | port | 74 | 0x005C0000 | SK | Draws ellipse using bpp shift |
| 0x005c5410 | byte_swap_16 | FW | accessor | 24 | 0x005C0000 | SK | Swaps bytes of 16-bit value (big-endian conversion) |
| 0x005c5430 | byte_swap_32 | FW | accessor | 58 | 0x005C0000 | SK | Full 32-bit byte swap (big-endian conversion) |
| 0x005c5470 | resource_open | FW | accessor | 38 | 0x005C0000 | SK | Opens resource (wraps FUN_005d89e8) |
| 0x005c54a0 | resource_close | FW | accessor | 34 | 0x005C0000 | SK | Closes resource (wraps FUN_005d8ab8) |
| 0x005c54d0 | identity_return | FW | accessor | 19 | 0x005C0000 | SK | Returns param unchanged (endian NOP) |
| 0x005c54f0 | surface_is_locked | FW | accessor | 44 | 0x005C0000 | SK | Returns this+0x34 != 0 (locked?) |
| 0x005c5520 | resource_seek_end | FW | accessor | 28 | 0x005C0000 | SK | Seeks to end of resource chunk |
| 0x005c5540 | resource_find_chunk | FW | accessor | 32 | 0x005C0000 | SK | Finds chunk by 4-byte tag + id |
| 0x005c5560 | resource_get_data_ptr | FW | accessor | 28 | 0x005C0000 | SK | Gets data pointer from resource handle |
| 0x005c5580 | resource_release_data | FW | accessor | 28 | 0x005C0000 | SK | Releases resource data pointer |
| 0x005c55a0 | align_to_4 | FW | accessor | 34 | 0x005C0000 | SK | Aligns value up to 4-byte boundary: ((n+3)/4)*4 |
| 0x005c55d0 | get_stride | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x0C (surface stride) |
| 0x005c55f0 | get_surface_buffer_handle | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x40. Ghidra FID=GetCheckStyle |
| 0x005c5610 | pixel_ptr_next_row | FW | accessor | 33 | 0x005C0000 | SK | Advances ptr by stride: this+0x10 + param |
| 0x005c5640 | get_pixel_buffer | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x34 (locked pixel buffer) |
| 0x005c5660 | get_surface_height | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x04 (height) |
| 0x005c5680 | get_surface_width | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x08 (width) |
| 0x005c56a0 | get_stride_alt | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x0C (stride, alt accessor) |
| 0x005c56c0 | timevec_destructor | FW | crt | 36 | 0x005C0000 | SK | ~_Timevec destructor (MFC). Actually surface_unlock |
| 0x005c56f0 | csplitterwnd_is_tracking | FW | crt | 31 | 0x005C0000 | SK | CSplitterWnd::IsTracking — returns this+0x408. Ghidra FID |
| 0x005c5710 | pixel_ptr_prev_row | FW | accessor | 33 | 0x005C0000 | SK | Subtracts stride: param - this+0x10 |
| 0x005c5740 | get_vtable | FW | accessor | 27 | 0x005C0000 | SK | Returns *this (vtable pointer) |
| 0x005c5760 | surface_create_7param | RN | surface | 81 | 0x005C0000 | SK | Creates surface w/ 7 params + palette reg |
| 0x005c57b1 | surface_create_7param_named | RN | surface | 72 | 0x005C0000 | SK | Above + name param |
| 0x005c57f9 | surface_create_8param | RN | surface | 85 | 0x005C0000 | SK | Creates surface w/ 8 params + palette reg |
| 0x005c584e | surface_create_8param_named | RN | surface | 76 | 0x005C0000 | SK | Above + name param |
| 0x005c589a | surface_create_6param | RN | surface | 77 | 0x005C0000 | SK | Creates surface w/ 6 params + palette reg |
| 0x005c58e7 | surface_create_6param_named | RN | surface | 68 | 0x005C0000 | SK | Above + name param |
| 0x005c592b | surface_create_7param_alt | RN | surface | 81 | 0x005C0000 | SK | Alt 7-param surface creation |
| 0x005c597c | surface_create_7param_alt_named | RN | surface | 72 | 0x005C0000 | SK | Above + name param |
| 0x005c59c4 | surface_list_append | RN | surface | 99 | 0x005C0000 | SK | Appends surface to linked list at this+0xB8 |
| 0x005c5a27 | surface_list_remove | RN | surface | 191 | 0x005C0000 | SK | Removes surface by id from linked list |
| 0x005c5aeb | surface_list_clear | RN | surface | 75 | 0x005C0000 | SK | Clears all surfaces from linked list |
| 0x005c5b36 | surface_list_invalidate_all | RN | surface | 73 | 0x005C0000 | SK | Invalidates all surfaces (calls invalidate_8B00) |
| 0x005c5b7f | surface_list_find_dirty | RN | surface | 174 | 0x005C0000 | SK | Finds first dirty surface, calls repaint |
| 0x005c5c2d | surface_list_find_active | RN | surface | 89 | 0x005C0000 | SK | Finds first active surface, returns ptr |
| 0x005c5c86 | surface_list_find_by_name | RN | surface | 460 | 0x005C0000 | SK | Finds surface by name (case-insensitive) |
| 0x005c5e60 | node_get_type | FW | accessor | 27 | 0x005C0000 | SK | Returns *this (node type) |
| 0x005c5e80 | node_get_next | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x20 (next pointer) |
| 0x005c5ea0 | node_get_dirty | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x24 (dirty flag) |
| 0x005c5ec0 | node_get_data | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x34 (data pointer) |
| 0x005c5ee0 | node_get_items | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x48 (items array) |
| 0x005c5f00 | node_get_count | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x38 (item count) |
| 0x005c5f20 | surface_init_7 | RN | surface | 92 | 0x005C0000 | SK | Surface init (FUN_005db67b + palette) |
| 0x005c5f7c | surface_init_7_named | RN | surface | 72 | 0x005C0000 | SK | Above + name |
| 0x005c5fc4 | surface_init_8 | RN | surface | 96 | 0x005C0000 | SK | Surface init (FUN_005db893) |
| 0x005c6024 | surface_init_8_named | RN | surface | 76 | 0x005C0000 | SK | Above + name |
| 0x005c6070 | surface_init_6 | RN | surface | 88 | 0x005C0000 | SK | Surface init (FUN_005db704) |
| 0x005c60c8 | surface_init_6_named | RN | surface | 68 | 0x005C0000 | SK | Above + name |
| 0x005c610c | surface_init_7_alt | RN | surface | 92 | 0x005C0000 | SK | Alt surface init (FUN_005db923) |
| 0x005c6168 | surface_init_7_alt_named | RN | surface | 72 | 0x005C0000 | SK | Above + name |
| 0x005c61b0 | modal_dialog_run | RN | dialog | 283 | 0x005C0000 | SK | Pushes dialog on stack, pumps messages until this+0x8C=0 |
| 0x005c62cb | modal_dialog_close | RN | dialog | 35 | 0x005C0000 | SK | Sets this+0x8C=0, exits modal loop. Ghidra=InvalidateObjectCache |
| 0x005c62ee | get_active_control | FW | accessor | 21 | 0x005C0000 | SK | Returns DAT_00637ea4 (active control handle) |
| 0x005c6303 | set_active_control | FW | accessor | 38 | 0x005C0000 | SK | Sets DAT_00637ea4, returns old value |
| 0x005c6329 | dialog_set_scroll_x | RN | dialog | 67 | 0x005C0000 | SK | Sets this+0x90 horizontal scroll |
| 0x005c636c | dialog_set_scroll_y | RN | dialog | 67 | 0x005C0000 | SK | Sets this+0x94 vertical scroll |
| 0x005c63af | dialog_invoke_callback | RN | dialog | 65 | 0x005C0000 | SK | Invokes callback at this+0xA0 if set |
| 0x005c6400 | dialog_get_scroll_range_h | RN | dialog | 51 | 0x005C0000 | SK | Gets horizontal scroll range |
| 0x005c6440 | dialog_get_scroll_range_v | RN | dialog | 51 | 0x005C0000 | SK | Gets vertical scroll range |
| 0x005c6480 | palette_apply | RN | palette | 90 | 0x005C0000 | SK | Applies palette changes via FUN_005decb1 |
| 0x005c64da | palette_init | RN | palette | 145 | 0x005C0000 | SK | Inits palette manager. Zeroes +0x424..+0x430, random ID at +0x408 |
| 0x005c656b | palette_destroy | RN | palette | 142 | 0x005C0000 | SK | Destroys palette, frees buffers +0x428/+0x42C/+0x430 |
| 0x005c65f9 | palette_load_ctab_resource | RN | palette | 192 | 0x005C0000 | SK | Loads color table from CTAB resource |
| 0x005c66b9 | palette_load_ctab_partial | RN | palette | 158 | 0x005C0000 | SK | Loads partial color table from CTAB resource |
| 0x005c6757 | palette_load_from_file | RN | palette | 36 | 0x005C0000 | SK | Wraps palette_load_from_file_impl |
| 0x005c677b | palette_save_to_file_full | RN | palette | 43 | 0x005C0000 | SK | Saves full palette (0..255) to file |
| 0x005c67a6 | palette_save_to_file | RN | palette | 292 | 0x005C0000 | SK | Saves palette range to file (start+count+RGB) |
| 0x005c68ca | seh_cleanup_68ca | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005c68e0 | seh_restore_fs_68e0 | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005c68f0 | palette_load_from_file_impl | RN | palette | 300 | 0x005C0000 | SK | Reads palette file: count+RGB data |
| 0x005c6a1c | seh_cleanup_6a1c | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005c6a32 | seh_restore_fs_6a32 | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005c6a42 | palette_generate_random_id | RN | palette | 75 | 0x005C0000 | SK | rand()&0x7FFF at this+0x408 |
| 0x005c6a8d | palette_apply_standard | RN | palette | 60 | 0x005C0000 | SK | Apply palette via standard pathway |
| 0x005c6ac9 | palette_apply_alternate | RN | palette | 60 | 0x005C0000 | SK | Apply palette via alternate pathway |
| 0x005c6b05 | palette_update | RN | palette | 54 | 0x005C0000 | SK | Calls update_palette_EA62 |
| 0x005c6b3b | file_open | FW | accessor | 40 | 0x005C0000 | SK | Opens file for reading. Ghidra FID=Realloc |
| 0x005c6b63 | palette_read_entries | RN | palette | 48 | 0x005C0000 | SK | Reads palette entries from hardware/surface |
| 0x005c6b93 | palette_set_single_entry | RN | palette | 66 | 0x005C0000 | SK | Sets single palette entry |
| 0x005c6bd5 | palette_cycle_entries | RN | palette | 467 | 0x005C0000 | SK | Rotates palette entries. +dir=fwd, -dir=bwd |
| 0x005c6da8 | palette_set_entries | RN | palette | 142 | 0x005C0000 | SK | Sets range of palette entries from RGB byte array |
| 0x005c6e36 | palette_setup_fade_to_color | RN | palette | 166 | 0x005C0000 | SK | Saves original colors at +0x430 for fade |
| 0x005c6edc | palette_setup_fade_to_rgb | RN | palette | 80 | 0x005C0000 | SK | Sets fade target RGB (+0x424..426) then calls above |
| 0x005c6f2c | palette_restore_from_fade | RN | palette | 151 | 0x005C0000 | SK | Restores palette from saved data at +0x430 |
| 0x005c6fc3 | palette_get_saved_data | RN | palette | 89 | 0x005C0000 | SK | Copies saved palette data to output buffer |
| 0x005c701c | palette_fade_step | RN | palette | 471 | 0x005C0000 | SK | Interpolates palette. "Color Scale factor out of range" |
| 0x005c71f3 | palette_setup_crossfade | RN | palette | 261 | 0x005C0000 | SK | Sets up crossfade. Saves both at +0x428/+0x42C |
| 0x005c72f8 | palette_restore_from_crossfade | RN | palette | 150 | 0x005C0000 | SK | Restores palette from crossfade, frees buffers |
| 0x005c738e | palette_crossfade_step | RN | palette | 491 | 0x005C0000 | SK | Interpolates two palettes. "Color Scale factor out of range" |
| 0x005c7579 | palette_build_lookup_table | RN | palette | 363 | 0x005C0000 | SK | Builds palette->index lookup via KD-tree color match |
| 0x005c76e4 | kdtree_cleanup_76e4 | FW | seh | 12 | 0x005C0000 | SK | KD-tree SEH cleanup |
| 0x005c76fa | seh_restore_fs_76fa | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005c770a | palette_build_lookup_table_ex | RN | palette | 361 | 0x005C0000 | SK | Extended lookup with separate src/dest palettes |
| 0x005c7873 | kdtree_cleanup_7873 | FW | seh | 12 | 0x005C0000 | SK | KD-tree SEH cleanup |
| 0x005c7889 | seh_restore_fs_7889 | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005c7899 | palette_find_nearest_color | RN | palette | 255 | 0x005C0000 | SK | Finds nearest palette index for RGB via KD-tree |
| 0x005c7998 | kdtree_cleanup_7998 | FW | seh | 12 | 0x005C0000 | SK | KD-tree SEH cleanup |
| 0x005c79ae | seh_restore_fs_79ae | FW | seh | 17 | 0x005C0000 | SK | FS-chain restore |
| 0x005c79bf | kdtree_init | RN | palette | 113 | 0x005C0000 | SK | Initializes KD-tree structure (zeroes fields) |
| 0x005c7a30 | kdtree_destroy | RN | palette | 86 | 0x005C0000 | SK | Destroys KD-tree, frees memory |
| 0x005c7a86 | kdtree_build | RN | palette | 501 | 0x005C0000 | SK | Builds balanced KD-tree from RGB data, median insert |
| 0x005c7c7b | kdtree_insert | RN | palette | 395 | 0x005C0000 | SK | Inserts node into KD-tree, cycling R/G/B axes (mod 3) |
| 0x005c7e06 | kdtree_find_nearest | RN | palette | 754 | 0x005C0000 | SK | 3D KD-tree nearest-neighbor search. tolerance=0x20 |
| 0x005c80fd | palette_find_middle_gray | RN | palette | 245 | 0x005C0000 | SK | Finds palette entry closest to (128,128,128) |
| 0x005c8200 | create_font_by_name | RN | font | 380 | 0x005C0000 | SK | Creates font. Style: bit0=bold, bit1=italic, bit2=underline |
| 0x005c8391 | get_font_variant | RN | font | 140 | 0x005C0000 | SK | Gets font variant from collection (+0x108+idx*4) |
| 0x005c841d | delete_font | RN | font | 98 | 0x005C0000 | SK | DeleteObject if owner flag set |
| 0x005c847f | get_font_height | RN | font | 149 | 0x005C0000 | SK | GetTextMetricsA → tmHeight |
| 0x005c8514 | get_font_line_height | RN | font | 122 | 0x005C0000 | SK | tmHeight + tmExternalLeading |
| 0x005c858e | measure_text_width | RN | font | 142 | 0x005C0000 | SK | GetTextExtentPointA → width |
| 0x005c861c | load_font_resource | RN | font | 160 | 0x005C0000 | SK | AddFontResourceA + enumerate faces |
| 0x005c86bc | enum_font_callback | RN | font | 122 | 0x005C0000 | SK | EnumFontFamiliesA callback. Matches first 3 chars |
| 0x005c8736 | enumerate_font_faces | RN | font | 91 | 0x005C0000 | SK | EnumFontFamiliesA for all system fonts |
| 0x005c8791 | unload_font_resource | RN | font | 163 | 0x005C0000 | SK | RemoveFontResourceA + DeleteObject for cached |
| 0x005c8834 | measure_text_wrapped | RN | font | 212 | 0x005C0000 | SK | DrawTextA with DT_CALCRECT for wrap measurement |
| 0x005c8908 | create_font_from_logfont | RN | font | 124 | 0x005C0000 | SK | CreateFontIndirectA + wrap in handle |
| 0x005c8984 | delete_font_handle | RN | font | 105 | 0x005C0000 | SK | DeleteObject + free handle (alt cleanup) |
| 0x005c89ed | control_add_font_resource | RN | control | 152 | 0x005C0000 | SK | AddFontResourceA for control text |
| 0x005c8a85 | control_remove_font_resource | RN | control | 111 | 0x005C0000 | SK | RemoveFontResourceA + free |
| 0x005c8b00 | control_invalidate | RN | control | 45 | 0x005C0000 | SK | InvalidateRect wrapper |
| 0x005c8b2d | control_show | RN | control | 43 | 0x005C0000 | SK | ShowWindow wrapper |
| 0x005c8b58 | control_hide | RN | control | 43 | 0x005C0000 | SK | ShowWindow(SW_HIDE) |
| 0x005c8b83 | control_destroy | RN | control | 94 | 0x005C0000 | SK | DestroyWindow with cleanup |
| 0x005c8be1 | control_create_label | RN | control | 162 | 0x005C0000 | SK | Creates MSControlClass label |
| 0x005c8c83 | control_move | RN | control | 44 | 0x005C0000 | SK | MoveWindow wrapper |
| 0x005c8caf | control_init_checkbox | RN | control | 647 | 0x005C0000 | SK | Initializes checkbox with bitmap states |
| 0x005c8f50 | control_get_rect | FW | accessor | 28 | 0x005C0000 | SK | Returns pointer to control rect |
| 0x005c8f70 | control_set_callback_a | FW | accessor | 50 | 0x005C0000 | SK | Sets callback function pointer A |
| 0x005c8fb0 | control_set_callback_b | FW | accessor | 50 | 0x005C0000 | SK | Sets callback function pointer B |
| 0x005c8ff0 | control_set_callback_c | FW | accessor | 50 | 0x005C0000 | SK | Sets callback function pointer C |
| 0x005c9030 | control_set_callback_d | FW | accessor | 50 | 0x005C0000 | SK | Sets callback function pointer D |
| 0x005c9070 | control_set_callback_e | FW | accessor | 50 | 0x005C0000 | SK | Sets callback function pointer E |
| 0x005c90b0 | control_get_enabled | FW | accessor | 26 | 0x005C0000 | SK | Returns whether control is enabled |
| 0x005c90ca | control_paint_with_palette | RN | control | 344 | 0x005C0000 | SK | Paints control surface with palette realization |
| 0x005c9222 | control_parse_hotkey | RN | control | 224 | 0x005C0000 | SK | Parses '~' hotkey marker, stores at ctrl+0x28 |
| 0x005c9307 | control_wndproc_base | RN | control | 319 | 0x005C0000 | SK | Base WndProc: WM_PAINT, WM_DESTROY, WM_SETFOCUS |
| 0x005c944b | control_register_instance | RN | control | 78 | 0x005C0000 | SK | Registers per-control data via SetWindowLongA |
| 0x005c9499 | control_alloc_instance | RN | control | 202 | 0x005C0000 | SK | Allocates per-instance control data |
| 0x005c9563 | control_get_instance | RN | control | 45 | 0x005C0000 | SK | Retrieves per-instance data from extra bytes |
| 0x005c9595 | control_free_instance | RN | control | 311 | 0x005C0000 | SK | Frees control data. "Tried to dispose NULL control" |
| 0x005c96cc | control_invalidate_client | RN | control | 59 | 0x005C0000 | SK | InvalidateRect(hwnd, client_rect, FALSE) |
| 0x005c9710 | control_cleanup_delbuf | FW | crt | 33 | 0x005C0000 | SK | ios::delbuf cleanup (CRT library match) |
| 0x005c9740 | control_create_button | RN | control | 5302 | 0x005C0000 | SK | Creates 3-state button. Draws bitmaps with border/text/hotkey |
| 0x005cabf6 | control_check_null | RN | control | 44 | 0x005C0000 | SK | "Error: Tried to dispose NULL Button" check |
| 0x005cac22 | control_activate_button | RN | control | 178 | 0x005C0000 | SK | SetFocus, flash pressed, invoke callback |
| 0x005cacd4 | button_wndproc | RN | control | 1600 | 0x005C0000 | SK | WndProc: WM_PAINT BitBlt, mouse/key handling, focus rect |
| 0x005cb319 | control_create_image_button | RN | control | 744 | 0x005C0000 | SK | Creates image button from sprite up/down states |
| 0x005cb601 | control_create_panel | RN | control | 218 | 0x005C0000 | SK | Creates simple panel/frame control (no bitmaps) |
| 0x005cb6db | noop_b6db | FW | noop | 16 | 0x005C0000 | SK | Empty function body |
| 0x005cb6eb | image_button_wndproc | RN | control | 1700 | 0x005C0000 | SK | WndProc: WM_PAINT BitBlt, mouse/key, focus |
| 0x005cbdb0 | tracking_is_active_2 | FW | crt | 31 | 0x005C0000 | SK | IsTracking duplicate — returns this+0x408 |
| 0x005cbdd0 | control_is_focusable | FW | accessor | 31 | 0x005C0000 | SK | Returns whether control accepts focus |
| 0x005cbdf0 | control_invoke_activate | FW | accessor | 50 | 0x005C0000 | SK | Invokes activation callback |
| 0x005cbe30 | control_set_state_a | FW | accessor | 50 | 0x005C0000 | SK | Sets control state field A |
| 0x005cbe70 | control_set_state_b | FW | accessor | 50 | 0x005C0000 | SK | Sets control state field B |
| 0x005cbeb0 | control_set_state_c | FW | accessor | 28 | 0x005C0000 | SK | Sets control state field C |
| 0x005cbed0 | fid_conflict_e31 | FW | crt | 26 | 0x005C0000 | SK | FID_conflict:_$E31 — Ghidra library stub |
| 0x005cbeea | control_get_state_a | FW | accessor | 26 | 0x005C0000 | SK | Gets control state field A |
| 0x005cbf04 | control_get_state_b | FW | accessor | 29 | 0x005C0000 | SK | Gets control state field B |
| 0x005cbf21 | control_get_state_c | FW | accessor | 26 | 0x005C0000 | SK | Gets control state field C |
| 0x005cbf40 | checkbox_measure_text | RN | control | 245 | 0x005C0000 | SK | Measures text for checkbox layout |
| 0x005cc035 | checkbox_paint | RN | control | 187 | 0x005C0000 | SK | Paints checked/unchecked state + text |
| 0x005cc0f0 | control_create_checkbox | RN | control | 344 | 0x005C0000 | SK | Creates checkbox. "MSControlClass" window |
| 0x005cc248 | checkbox_dispose_check | RN | control | 44 | 0x005C0000 | SK | "Tried to dispose NULL Checkbox" |
| 0x005cc274 | checkbox_toggle | RN | control | 172 | 0x005C0000 | SK | Toggles state and invalidates |
| 0x005cc320 | control_create_text_display | RN | control | 2746 | 0x005C0000 | SK | Multi-line text display. Word wrap, line breaks, scrolling |
| 0x005ccddf | set_control_color_a | RN | control | 47 | 0x005C0000 | SK | Sets DAT_00637f00..02 RGB + flag |
| 0x005cce0e | set_control_color_b | RN | control | 47 | 0x005C0000 | SK | Sets DAT_00637f04..06 RGB + flag |
| 0x005cce40 | control_invoke_draw_callback | RN | control | 54 | 0x005C0000 | SK | Invokes draw callback at this+0x2C |
| 0x005cce80 | control_subclass_wndproc | RN | control | 146 | 0x005C0000 | SK | Subclassed WndProc. WM_DESTROY cleanup |
| 0x005ccf17 | control_create_scrollbar | RN | control | 546 | 0x005C0000 | SK | Creates custom scrollbar. Registers MSScrollBarClass |
| 0x005cd139 | scrollbar_noop | FW | noop | 16 | 0x005C0000 | SK | Empty placeholder |
| 0x005cd149 | scrollbar_wndproc | RN | control | 815 | 0x005C0000 | SK | WM_COMMAND(0x7F), WM_HSCROLL/VSCROLL, thumb track |
| 0x005cd49f | control_enable | RN | control | 40 | 0x005C0000 | SK | EnableWindow wrapper (null-safe) |
| 0x005cd4c7 | scrollbar_set_range | RN | control | 54 | 0x005C0000 | SK | SetScrollRange + set initial position |
| 0x005cd4fd | scrollbar_set_range_ex | RN | control | 56 | 0x005C0000 | SK | SetScrollRange with redraw flag |
| 0x005cd535 | scrollbar_get_range | RN | control | 36 | 0x005C0000 | SK | GetScrollRange wrapper |
| 0x005cd559 | scrollbar_set_pos | RN | control | 39 | 0x005C0000 | SK | Sets position via 0x7F command |
| 0x005cd580 | scrollbar_set_range_native | RN | control | 67 | 0x005C0000 | SK | Native scrollbar range (uses HWND at wnd+4) |
| 0x005cd5c3 | scrollbar_get_range_native | RN | control | 45 | 0x005C0000 | SK | Native scrollbar range getter |
| 0x005cd5f0 | scrollbar_set_pos_native | RN | control | 43 | 0x005C0000 | SK | Native scrollbar position setter |
| 0x005cd620 | scrollbar_get_pos | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x3C (current position) |
| 0x005cd640 | scrollbar_invoke_change_callback | RN | control | 50 | 0x005C0000 | SK | Invokes callback on value change |
| 0x005cd680 | scrollbar_invoke_track_callback | RN | control | 50 | 0x005C0000 | SK | Invokes callback during tracking |
| 0x005cd6c0 | scrollbar_get_page_size | FW | accessor | 28 | 0x005C0000 | SK | Returns this+0x34 (page size) |
| 0x005cd6e0 | scale_table_init_all | RN | scale | 149 | 0x005C0000 | SK | Initializes all 16 cache slots to zero, creates 1:1 tables |
| 0x005cd775 | scale_table_build_primary | RN | scale | 657 | 0x005C0000 | SK | Builds primary scale table. Sets DAT_00637f98/9c zoom params |
| 0x005cda06 | scale_table_get_current | RN | scale | 36 | 0x005C0000 | SK | Returns DAT_00637f98 and 00637f9c (zoom params) |
| 0x005cda2a | scale_table_build_pair | RN | scale | 684 | 0x005C0000 | SK | Builds two scale tables (primary + secondary) |
| 0x005cdcdb | scale_table_fill_slot | RN | scale | 337 | 0x005C0000 | SK | Fills one cache slot: Bresenham mapping for 1024 entries |
| 0x005cde2c | CString_ctor | FW | crt | 33 | 0x005C0000 | SK | CString::CString() — MFC library match |
| 0x005cde4d | sprite_free_data | RN | sprite | 84 | 0x005C0000 | SK | Frees sprite pixel data (+0x34/+0x38) |
| 0x005cdea1 | sprite_init_empty | RN | sprite | 140 | 0x005C0000 | SK | Creates empty sprite with given w/h/bpp |
| 0x005cdf2d | sprite_init_cleanup | FW | seh | 9 | 0x005C0000 | SK | Sprite init SEH cleanup |
| 0x005cdf40 | seh_restore_fs_df40 | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005cdf50 | sprite_reset | RN | sprite | 98 | 0x005C0000 | SK | Unlocks data, frees handle, reinits |
| 0x005cdfb2 | sprite_decompress_noop | FW | noop | 16 | 0x005C0000 | SK | Empty decompress callback |
| 0x005cdfc2 | sprite_load_from_resource | RN | sprite | 428 | 0x005C0000 | SK | Loads from SPRT resource. "SPRT resource not found" |
| 0x005ce16e | sprite_save_to_resource_auto | RN | sprite | 44 | 0x005C0000 | SK | Saves to resource with auto palette range |
| 0x005ce19a | sprite_save_to_resource | RN | sprite | 526 | 0x005C0000 | SK | Saves to SPRT resource with palette data |
| 0x005ce3a8 | sprite_load_from_file_wrapper | RN | sprite | 36 | 0x005C0000 | SK | Wraps sprite_load_from_file_impl |
| 0x005ce3cc | sprite_save_to_file | RN | sprite | 457 | 0x005C0000 | SK | Saves sprite to file: header+data+palette |
| 0x005ce595 | seh_cleanup_e595 | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005ce5ab | seh_restore_fs_e5ab | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005ce5bb | sprite_save_to_file_nopal | RN | sprite | 322 | 0x005C0000 | SK | Saves sprite to file without palette data |
| 0x005ce6fd | seh_cleanup_e6fd | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005ce713 | seh_restore_fs_e713 | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005ce723 | sprite_load_from_file_auto | RN | sprite | 44 | 0x005C0000 | SK | Loads from file with auto palette range |
| 0x005ce74f | sprite_load_from_file | RN | sprite | 634 | 0x005C0000 | SK | Loads from file with palette. Reads header, allocs |
| 0x005ce9c9 | seh_cleanup_e9c9 | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005ce9df | seh_restore_fs_e9df | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005ce9ef | sprite_load_from_file_impl | RN | sprite | 415 | 0x005C0000 | SK | Implementation: reads sprite header+data from binary |
| 0x005ceb8e | seh_cleanup_eb8e | FW | seh | 12 | 0x005C0000 | SK | SEH cleanup |
| 0x005ceba4 | seh_restore_fs_eba4 | FW | seh | 16 | 0x005C0000 | SK | FS-chain restore |
| 0x005cebb4 | sprite_extract_from_port | RN | sprite | 56 | 0x005C0000 | SK | Extract from port, auto-detect transparent color |
| 0x005cebec | sprite_extract_rect | RN | sprite | 88 | 0x005C0000 | SK | Extract from port at given rect |
| 0x005cec44 | sprite_extract_with_transp | RN | sprite | 60 | 0x005C0000 | SK | Extract with explicit transparent color |
| 0x005cec80 | sprite_extract_by_boundary | RN | sprite | 301 | 0x005C0000 | SK | Extract by scanning for boundary char in surface |
| 0x005cedad | sprite_extract_rect_with_transp | RN | sprite | 92 | 0x005C0000 | SK | Extract from rect with explicit transparency |
| 0x005cee09 | sprite_extract_timevec | RN | sprite | 56 | 0x005C0000 | SK | Extract from _Timevec surface |
| 0x005cee41 | sprite_extract_timevec_rect | RN | sprite | 88 | 0x005C0000 | SK | Extract from _Timevec at rect |
| 0x005cee99 | sprite_extract_timevec_with_transp | RN | sprite | 60 | 0x005C0000 | SK | _Timevec + explicit transparency |
| 0x005ceed5 | sprite_extract_timevec_rect_transp | RN | sprite | 92 | 0x005C0000 | SK | _Timevec rect + transparency |
| 0x005cef31 | blit_normal | RN | sprite | 53 | 0x005C0000 | SK | Normal blit, transp=0xFF |
| 0x005cef66 | blit_normal_custom_transp | RN | sprite | 57 | 0x005C0000 | SK | Normal blit, custom transp |
| 0x005cef9f | blit_normal_timevec | RN | sprite | 53 | 0x005C0000 | SK | Normal blit to Timevec, transp=0xFF |
| 0x005cefd4 | blit_normal_timevec_transp | RN | sprite | 57 | 0x005C0000 | SK | Normal blit to Timevec, custom transp |
| 0x005cf00d | blit_aniso | RN | sprite | 53 | 0x005C0000 | SK | Aniso blit, transp=0xFF |
| 0x005cf042 | blit_aniso_transp | RN | sprite | 57 | 0x005C0000 | SK | Aniso blit, custom transp |
| 0x005cf07b | blit_aniso_timevec | RN | sprite | 53 | 0x005C0000 | SK | Aniso blit to Timevec |
| 0x005cf0b0 | blit_aniso_timevec_transp | RN | sprite | 57 | 0x005C0000 | SK | Aniso blit to Timevec, custom transp |
| 0x005cf0e9 | blit_dimmed_explicit_transp | RN | sprite | 61 | 0x005C0000 | SK | Dimmed blit, explicit transp+fill |
| 0x005cf126 | blit_dimmed | RN | sprite | 57 | 0x005C0000 | SK | Dimmed blit, transp=0xFF |
| 0x005cf15f | blit_dimmed_timevec_explicit_transp | RN | sprite | 61 | 0x005C0000 | SK | Dimmed blit to Timevec, explicit transp |
| 0x005cf19c | blit_dimmed_timevec | RN | sprite | 57 | 0x005C0000 | SK | Dimmed blit to Timevec |
| 0x005cf1d5 | blit_normal_no_transp | RN | sprite | 53 | 0x005C0000 | SK | Normal blit, transp=0xFE (disabled) |
| 0x005cf20a | blit_normal_timevec_no_transp | RN | sprite | 53 | 0x005C0000 | SK | Normal blit to Timevec, no transp |
| 0x005cf23f | sprite_fill_solid | RN | sprite | 46 | 0x005C0000 | SK | Fills sprite with solid color (no offset) |
| 0x005cf26d | sprite_fill_solid_offset | RN | sprite | 50 | 0x005C0000 | SK | Fills sprite with solid color at dx,dy offset |
| 0x005cf29f | sprite_fill_pattern | RN | sprite | 46 | 0x005C0000 | SK | Fills sprite with pattern (mode=1) |
| 0x005cf2cd | sprite_fill_pattern_offset | RN | sprite | 50 | 0x005C0000 | SK | Fills sprite with pattern at offset |
| 0x005cf2ff | sprite_lock_data | RN | sprite | 56 | 0x005C0000 | SK | If +0x38==0, gets ptr from +0x34 handle |
| 0x005cf337 | sprite_unlock_data | RN | sprite | 56 | 0x005C0000 | SK | Releases handle at +0x34, zeroes +0x38 |
| 0x005cf36f | sprite_is_locked | RN | sprite | 44 | 0x005C0000 | SK | Returns this+0x38 != 0 |
| 0x005cf39b | sprite_set_dimensions | RN | sprite | 42 | 0x005C0000 | SK | Sets this+0x20=w, this+0x24=h |
| 0x005cf3c5 | sprite_get_dimensions | RN | sprite | 46 | 0x005C0000 | SK | Gets w,h from +0x20/+0x24 |
| 0x005cf3f3 | sprite_set_scale | RN | sprite | 70 | 0x005C0000 | SK | Sets scale factors at +0x28/+0x2C (min=1) |
| 0x005cf439 | sprite_get_scale | RN | sprite | 46 | 0x005C0000 | SK | Gets scale factors from +0x28/+0x2C |
| 0x005cf467 | sprite_replace_color | RN | sprite | 218 | 0x005C0000 | SK | Replaces palette index in all scanlines. "Sprite not locked in ChangeColor" |
| 0x005cf541 | sprite_remap_palette | RN | sprite | 267 | 0x005C0000 | SK | Remaps all pixels through lookup table. "Sprite not locked in ChangePalette" |
| 0x005cf64c | sprite_extract_from_oleitem | RN | sprite | 1951 | 0x005C0000 | SK | Core extraction from OleItem surface. RLE scanline data. "Port not locked on Sprite Extract" |
| 0x005cfdeb | sprite_extract_from_timevec | RN | sprite | 1921 | 0x005C0000 | SK | Core extraction from _Timevec surface. Same algorithm, different lock API |
| 0x005d056c | dispatch_oleitem_normal | FW | sprite_blit | 673 | 0x005D0000 | SK | Blit sprite to OLE surface; scale src rect via DAT_006e47c8 zoom table; clip via IntersectRect; c... |
| 0x005d080d | dispatch_timevec_normal | FW | sprite_blit | 671 | 0x005D0000 | SK | Same as #1 but locks _Timevec surface via FUN_005e6188; calls ~_Timevec dtor after blit |
| 0x005d0aac | dispatch_oleitem_aniso | FW | sprite_blit | 787 | 0x005D0000 | SK | Anisotropic blit: separate x/y zoom params (DAT_00637fa0-fac); separate lookup tables; calls scal... |
| 0x005d0dbf | dispatch_timevec_aniso | FW | sprite_blit | 782 | 0x005D0000 | SK | Anisotropic + _Timevec surface lock variant |
| 0x005d10cd | dispatch_oleitem_dimmed | FW | sprite_blit | 677 | 0x005D0000 | SK | Dimmed/sentry blit: calls pixel_fill (FUN_005e52bf) with fill_color param (typically 0x1a=dark gray) |
| 0x005d1372 | dispatch_timevec_dimmed | FW | sprite_blit | 672 | 0x005D0000 | SK | Dimmed + _Timevec surface lock variant |
| 0x005d1612 | sprite_compose_overlay | FW | sprite_blit | 1297 | 0x005D0000 | SK | Per-pixel sprite overlay merge: 4-case scanline switch (empty/dst-only/src-only/both); allocs mer... |
| 0x005d1b38 | sprite_init_record | FW | sprite_blit | 128 | 0x005D0000 | SK | Zero-init sprite record: two rects to (0,0,0,0), scale (1,1), transparency=0, data ptrs=0 |
| 0x005d1bb8 | sprite_get_pixel | FW | sprite_compose | 239 | 0x005D0000 | SK | Return pixel at (x,y) from scanline data; bounds-check rect +0x14..+0x1c; walk scanline linked li... |
| 0x005d1cb0 | identity_return | FW | sprite_compose | 19 | 0x005D0000 | SK | Returns param_1 unchanged; trivial passthrough |
| 0x005d1cd0 | copy_4_dwords | FW | sprite_compose | 44 | 0x005D0000 | SK | Copies 4 consecutive dwords src→dst; used for RECT copies |
| 0x005d1d00 | scale_coords | FW | coord_scale | 254 | 0x005D0000 | SK | Scale pixel coords: DAT_006e47c8 lookup table + DAT_00637f98/f9c zoom ratio; handles negatives; r... |
| 0x005d1e00 | scale_coords_aniso | FW | coord_scale | 234 | 0x005D0000 | SK | 6-param version: explicit zoom_num/zoom_den/table pointers for anisotropic scaling |
| 0x005d1ef0 | offset_add | FW | sprite_compose | 33 | 0x005D0000 | SK | Returns this->+0xc + delta |
| 0x005d1f20 | offset_subtract | FW | sprite_compose | 33 | 0x005D0000 | SK | Returns delta - this->+0xc |
| 0x005d1f50 | timer_start | FW | timer | 157 | 0x005D0000 | SK | Alloc timer manager singleton (DAT_00637ef4, 0x90 bytes, 16 slots); calls timer_add_slot |
| 0x005d2004 | timer_stop | FW | timer | 62 | 0x005D0000 | SK | Remove timer slot; logs error if manager not inited ("Error: MrTimer not initialized") |
| 0x005d2042 | timer_add_slot | FW | timer | 159 | 0x005D0000 | SK | Find free slot in 16-slot array; store callback+user_data; calls timer_dll_set_timer; returns slo... |
| 0x005d20e6 | timer_remove_slot | FW | timer | 56 | 0x005D0000 | SK | Clear callback; kill timer via timer_dll_kill_timer |
| 0x005d211e | timer_manager_init | FW | timer | 100 | 0x005D0000 | SK | Zero all 16 slots; create timer window (MSMrTimerClass); store HWND |
| 0x005d2182 | timer_manager_destroy | FW | timer | 95 | 0x005D0000 | SK | Destroy all active timers; destroy timer window |
| 0x005d21f0 | crt_static_init | FW | timer | 26 | 0x005D0000 | SK | CRT static initializer stub; calls debug_system_init + registers atexit |
| 0x005d220a | debug_system_init | FW | timer | 26 | 0x005D0000 | SK | Calls debug_init_timestamp |
| 0x005d2224 | debug_register_atexit | FW | timer | 29 | 0x005D0000 | SK | Registers debug_atexit_handler via _atexit |
| 0x005d2241 | debug_atexit_handler | FW | timer | 26 | 0x005D0000 | SK | Calls debug_shutdown |
| 0x005d225b | debug_log | FW | debug | 30 | 0x005D0000 | SK | Delegate to debug_log_core (FUN_005d24b3) |
| 0x005d2279 | debug_log_fmt1 | FW | debug | 62 | 0x005D0000 | SK | sprintf 1 arg → 1024-byte buf → debug_log_core |
| 0x005d22b7 | debug_log_fmt2 | FW | debug | 66 | 0x005D0000 | SK | sprintf 2 args → debug_log_core |
| 0x005d22f9 | debug_log_fmt3 | FW | debug | 70 | 0x005D0000 | SK | sprintf 3 args → debug_log_core |
| 0x005d233f | debug_log_fmt1b | FW | debug | 62 | 0x005D0000 | SK | Duplicate of debug_log_fmt1 |
| 0x005d237d | debug_log_fmt1c | FW | debug | 62 | 0x005D0000 | SK | Duplicate of debug_log_fmt1 |
| 0x005d23bb | debug_log_fmt2b | FW | debug | 66 | 0x005D0000 | SK | Duplicate of debug_log_fmt2 |
| 0x005d23fd | debug_log_fmt2c | FW | debug | 66 | 0x005D0000 | SK | Duplicate of debug_log_fmt2 |
| 0x005d243f | debug_set_log_to_file | FW | debug | 24 | 0x005D0000 | SK | Sets DAT_00638304 flag |
| 0x005d2457 | debug_set_log_to_debug | FW | debug | 24 | 0x005D0000 | SK | Sets DAT_00638308 flag |
| 0x005d246f | debug_init_timestamp | FW | debug | 41 | 0x005D0000 | SK | Init debug: call file-open; store GetTickCount() baseline for "[%5d]" prefix |
| 0x005d2498 | debug_shutdown | FW | debug | 27 | 0x005D0000 | SK | Close debug output via FUN_005eda65 |
| 0x005d24b3 | debug_log_core | FW | debug | 155 | 0x005D0000 | SK | Core: compute elapsed=(GetTickCount()-baseline)/1000; format "[%5d]" prefix; output to debugger a... |
| 0x005d2550 | set_control_flag_e90 | FW | ctrl_edit | 24 | 0x005D0000 | SK | Set DAT_00637e90 |
| 0x005d2568 | set_control_rgb_e94 | FW | ctrl_edit | 40 | 0x005D0000 | SK | Set DAT_00637e94/e98/e9c (background RGB) |
| 0x005d2590 | set_control_flag_ea0 | FW | ctrl_edit | 24 | 0x005D0000 | SK | Set DAT_00637ea0 |
| 0x005d25a8 | set_control_font_ptr | FW | ctrl_edit | 24 | 0x005D0000 | SK | Set PTR_DAT_00637e68 (font) |
| 0x005d25c0 | editbox_create_simple | FW | ctrl_edit | 101 | 0x005D0000 | SK | Create EDIT at (x,y), height 0x1e, set font |
| 0x005d2625 | editbox_create_with_text | FW | ctrl_edit | 105 | 0x005D0000 | SK | Create EDIT + set initial text via WM_SETTEXT |
| 0x005d268e | set_editbox_font | FW | ctrl_edit | 24 | 0x005D0000 | SK | Set PTR_DAT_00637e6c |
| 0x005d26b0 | editbox_create_with_callback | FW | ctrl_edit | 132 | 0x005D0000 | SK | Create EDIT with validation callback at +0x34 |
| 0x005d2740 | editbox_register_and_create | FW | ctrl_edit | 705 | 0x005D0000 | SK | Register MSEditBoxClass by subclassing EDIT; get orig wndproc; extra window bytes |
| 0x005d2a01 | editbox_wndproc | FW | ctrl_edit | 778 | 0x005D0000 | SK | Subclassed WndProc: WM_KEYDOWN (Tab/Enter/Esc→parent), WM_CHAR (validation), WM_SETFOCUS (select ... |
| 0x005d2d15 | control_enable | FW | ctrl_edit | 40 | 0x005D0000 | SK | EnableWindow wrapper with null check |
| 0x005d2d3d | noop_edit | FW | ctrl_edit | 16 | 0x005D0000 | SK | Empty function |
| 0x005d2d4d | edit_append_text | FW | ctrl_edit | 50 | 0x005D0000 | SK | EM_GETLIMITTEXT then WM_GETTEXT |
| 0x005d2d7f | edit_set_text | FW | ctrl_edit | 34 | 0x005D0000 | SK | WM_SETTEXT (0xC) |
| 0x005d2da1 | edit_set_limit | FW | ctrl_edit | 37 | 0x005D0000 | SK | EM_SETLIMITTEXT (0xC5) |
| 0x005d2dc6 | edit_set_sel | FW | ctrl_edit | 39 | 0x005D0000 | SK | EM_SETSEL (0xB1) |
| 0x005d2ded | edit_get_line | FW | ctrl_edit | 68 | 0x005D0000 | SK | EM_GETLINE (0xC4) with buffer size prefix |
| 0x005d2e31 | edit_get_line_count | FW | ctrl_edit | 35 | 0x005D0000 | SK | EM_GETLINECOUNT (0xBA) |
| 0x005d2e54 | edit_scroll_caret | FW | ctrl_edit | 35 | 0x005D0000 | SK | EM_SCROLLCARET (0xCE) |
| 0x005d2e77 | edit_line_from_char | FW | ctrl_edit | 37 | 0x005D0000 | SK | EM_LINEFROMCHAR (0xC9) |
| 0x005d2e9c | edit_line_index | FW | ctrl_edit | 37 | 0x005D0000 | SK | EM_LINEINDEX (0xBB) |
| 0x005d2ec1 | edit_line_length | FW | ctrl_edit | 37 | 0x005D0000 | SK | EM_LINELENGTH (0xC1) |
| 0x005d2ee6 | edit_replace_sel | FW | ctrl_edit | 39 | 0x005D0000 | SK | EM_REPLACESEL (0xB6) |
| 0x005d2f0d | edit_set_caret_pos | FW | ctrl_edit | 58 | 0x005D0000 | SK | EM_SETSEL(pos,pos) + EM_SCROLLCARET |
| 0x005d2f47 | edit_get_sel_end | FW | ctrl_edit | 55 | 0x005D0000 | SK | EM_GETSEL → return high word (selection end) |
| 0x005d2f7e | edit_get_end_offset | FW | ctrl_edit | 76 | 0x005D0000 | SK | Last line index + last line length = total char count |
| 0x005d2fca | edit_move_caret_to_end | FW | ctrl_edit | 107 | 0x005D0000 | SK | Chain: sel end → line from char → line index → line length → set caret |
| 0x005d3035 | edit_insert_text | FW | ctrl_edit | 37 | 0x005D0000 | SK | EM_REPLACESEL (no undo) |
| 0x005d305a | edit_is_at_end | FW | ctrl_edit | 118 | 0x005D0000 | SK | Returns true if cursor at end of text |
| 0x005d30e0 | edit_call_validator | FW | ctrl_edit | 67 | 0x005D0000 | SK | Call validation callback at +0x34 if set; else return 1 |
| 0x005d3130 | combobox_register_and_create | FW | ctrl_combo | 480 | 0x005D0000 | SK | Register MSComboBoxClass by subclassing COMBOBOX; extra window bytes |
| 0x005d3310 | combobox_wndproc | FW | ctrl_combo | 591 | 0x005D0000 | SK | WM_KEYDOWN (Tab/Enter/Esc), WM_DESTROY, WM_LBUTTONDOWN, custom 0x4C8 dispatch |
| 0x005d356e | noop_combo | FW | ctrl_combo | 16 | 0x005D0000 | SK | Empty function |
| 0x005d357e | combo_add_string | FW | ctrl_combo | 37 | 0x005D0000 | SK | CB_ADDSTRING (0x143) |
| 0x005d35a3 | combo_set_cursel | FW | ctrl_combo | 37 | 0x005D0000 | SK | CB_SETCURSEL (0x144) |
| 0x005d35c8 | combo_set_font | FW | ctrl_combo | 66 | 0x005D0000 | SK | WM_SETFONT via hmem_lock/unlock |
| 0x005d360a | combo_reset_content | FW | ctrl_combo | 35 | 0x005D0000 | SK | CB_RESETCONTENT (0x14B) |
| 0x005d362d | combo_get_lbtext | FW | ctrl_combo | 39 | 0x005D0000 | SK | CB_GETLBTEXT (0x148) |
| 0x005d3654 | combo_get_selected_text | FW | ctrl_combo | 93 | 0x005D0000 | SK | CB_GETCURSEL + CB_GETLBTEXT; empty string if -1 |
| 0x005d36b1 | combo_get_cursel | FW | ctrl_combo | 64 | 0x005D0000 | SK | CB_GETCURSEL (0x147), return -1 if none |
| 0x005d36f6 | combo_set_cursel_2 | FW | ctrl_combo | 37 | 0x005D0000 | SK | CB_SETCURSEL (0x14E) |
| 0x005d3720 | combo_call_change_callback | FW | ctrl_combo | 51 | 0x005D0000 | SK | Call callback at +0x30 if set |
| 0x005d3760 | combo_call_edit_callback | FW | ctrl_combo | 51 | 0x005D0000 | SK | Call callback at +0x34 if set |
| 0x005d37a0 | listbox_register_and_create | FW | ctrl_listbox | 578 | 0x005D0000 | SK | Register MSListBoxClass by subclassing LISTBOX; LBS_SORT if sorted=1 |
| 0x005d39e2 | listbox_wndproc | FW | ctrl_listbox | 591 | 0x005D0000 | SK | Near-identical to combobox_wndproc; custom 0x4C8 dispatch |
| 0x005d3c40 | noop_listbox | FW | ctrl_listbox | 16 | 0x005D0000 | SK | Empty function |
| 0x005d3c50 | listbox_add_string | FW | ctrl_listbox | 37 | 0x005D0000 | SK | LB_ADDSTRING (0x180) |
| 0x005d3c75 | listbox_delete_string | FW | ctrl_listbox | 37 | 0x005D0000 | SK | LB_DELETESTRING (0x182) |
| 0x005d3c9a | listbox_set_font | FW | ctrl_listbox | 66 | 0x005D0000 | SK | WM_SETFONT via hmem_lock/unlock |
| 0x005d3cdc | listbox_reset_content | FW | ctrl_listbox | 35 | 0x005D0000 | SK | LB_RESETCONTENT (0x184) |
| 0x005d3cff | listbox_get_text | FW | ctrl_listbox | 39 | 0x005D0000 | SK | LB_GETTEXT (0x189) |
| 0x005d3d26 | listbox_set_text | FW | ctrl_listbox | 60 | 0x005D0000 | SK | LB_DELETESTRING + LB_INSERTSTRING |
| 0x005d3d62 | listbox_get_selected_text | FW | ctrl_listbox | 93 | 0x005D0000 | SK | LB_GETCURSEL + LB_GETTEXT; empty if -1 |
| 0x005d3dbf | listbox_get_cursel | FW | ctrl_listbox | 64 | 0x005D0000 | SK | LB_GETCURSEL (0x188) |
| 0x005d3e04 | listbox_get_count | FW | ctrl_listbox | 64 | 0x005D0000 | SK | LB_GETCOUNT (0x190) |
| 0x005d3e49 | listbox_find_string | FW | ctrl_listbox | 68 | 0x005D0000 | SK | LB_FINDSTRINGEXACT (0x191) |
| 0x005d3e92 | listbox_set_cursel | FW | ctrl_listbox | 37 | 0x005D0000 | SK | LB_SETCURSEL (0x186) |
| 0x005d3eb7 | listbox_insert_string | FW | ctrl_listbox | 39 | 0x005D0000 | SK | LB_INSERTSTRING (0x183) |
| 0x005d3ede | listbox_insert_string_at | FW | ctrl_listbox | 39 | 0x005D0000 | SK | LB_INSERTSTRING with swapped param order |
| 0x005d3f05 | listbox_set_item_data | FW | ctrl_listbox | 40 | 0x005D0000 | SK | LB_SETITEMDATA (0x185) |
| 0x005d3f30 | listbox_call_change_callback | FW | ctrl_listbox | 51 | 0x005D0000 | SK | Call callback at +0x30 if set |
| 0x005d3f70 | listbox_call_edit_callback | FW | ctrl_listbox | 51 | 0x005D0000 | SK | Call callback at +0x34 if set |
| 0x005d3fb0 | window_find_by_id | FW | window_mgmt | 100 | 0x005D0000 | SK | Search array at +0x48 (stride 0xA4) for matching id; return 1/0 |
| 0x005d4014 | window_invalidate_all | FW | window_mgmt | 115 | 0x005D0000 | SK | Iterate array at +0x48 (count at +0x38); call invalidate on each |
| 0x005d4087 | window_show_all | FW | window_mgmt | 86 | 0x005D0000 | SK | Iterate array; call show on each |
| 0x005d40dd | window_iter_method1 | FW | window_mgmt | 69 | 0x005D0000 | SK | Iterate array; call thunk_FUN_00447210 on each |
| 0x005d4122 | window_iter_method2 | FW | window_mgmt | 69 | 0x005D0000 | SK | Iterate array; call thunk_FUN_00421ca0 on each |
| 0x005d4167 | set_global_ptr_e64 | FW | window_mgmt | 24 | 0x005D0000 | SK | Set PTR_DAT_00637e64 |
| 0x005d417f | set_global_flag_e7c | FW | window_mgmt | 24 | 0x005D0000 | SK | Set DAT_00637e7c |
| 0x005d4197 | set_global_flag_e8c | FW | window_mgmt | 24 | 0x005D0000 | SK | Set DAT_00637e8c |
| 0x005d41af | set_global_rgb_e80 | FW | window_mgmt | 40 | 0x005D0000 | SK | Set DAT_00637e80/e84/e88 (RGB) |
| 0x005d41e0 | get_tick_60fps | FW | timing | 36 | 0x005D0000 | SK | Return (GetTickCount() * 6) / 100 — convert ms to ~60fps ticks |
| 0x005d4204 | delay_ticks | FW | timing | 56 | 0x005D0000 | SK | Busy-wait until `count` ticks elapsed; pump messages in loop |
| 0x005d423c | timer_create_window | FW | timer | 571 | 0x005D0000 | SK | Load timerdll.dll; get 5 procs (TimerCallBack/SetTimerID/GetTimerID/GetTimerIndex/ResetTimerNotif... |
| 0x005d447c | timer_destroy_window | FW | timer | 66 | 0x005D0000 | SK | Free timerdll.dll; kill multimedia timer; destroy timer window |
| 0x005d44be | timer_dll_set_timer | FW | timer | 387 | 0x005D0000 | SK | timeSetEvent (5ms resolution) or fallback Win32 SetTimer; store ID via SetTimerID |
| 0x005d4664 | timer_dll_kill_timer | FW | timer | 156 | 0x005D0000 | SK | timeKillEvent or Win32 KillTimer; get ID via GetTimerID |
| 0x005d4700 | timer_wndproc | FW | timer | 188 | 0x005D0000 | SK | WndProc for MSMrTimerClass; handles WM_TIMER: get slot via GetTimerIndex, reset notification, cal... |
| 0x005d47d0 | timer_fire_callback | SN | wave_audio | 142 | 0x005D0000 | SK | Timer callback dispatcher: if slot active AND repeat count >0, decrement repeat, call callback(sl... |
| 0x005d4870 | wave_play_oneshot | SN | wave_audio | 41 | 0x005D0000 | SK | Wrapper: calls wave_play_sound(node, 0) — no looping |
| 0x005d4899 | wave_init_child | SN | wave_audio | 55 | 0x005D0000 | SK | Call surface init; get parent; call wave_init_system with parent's sound handle |
| 0x005d48d0 | wave_shutdown | SN | wave_audio | 21 | 0x005D0000 | SK | Thunk: calls wave_shutdown_internal |
| 0x005d48f0 | wave_init_system | SN | wave_audio | 117 | 0x005D0000 | SK | Store format params (DAT_0063857c/80/84/88); call wave_out_open; if OK setup mix buffers (FUN_005... |
| 0x005d4965 | wave_shutdown_internal | SN | wave_audio | 62 | 0x005D0000 | SK | If waveOut handle open: call wave_cleanup_all + wave_out_close |
| 0x005d49a3 | show_messagebox_sound_error | SN | wave_audio | 105 | 0x005D0000 | SK | If code==10: "This Sound format is not supported"; elif code!=11: "Undefined Sound Error" |
| 0x005d4a11 | wave_out_open | SN | wave_audio | 437 | 0x005D0000 | SK | Search waveOutGetNumDevs for 22050Hz 8-bit mono (caps 0x20/0x10); waveOutOpen; retry after sndPla... |
| 0x005d4bcb | wave_out_close | SN | wave_audio | 77 | 0x005D0000 | SK | waveOutClose; zero DAT_006385b0 (device-open flag) |
| 0x005d4c18 | show_messagebox_waveout_error | SN | wave_audio | 71 | 0x005D0000 | SK | waveOutGetErrorTextA → MessageBox "Wave Out Error" |
| 0x005d4c5f | wave_load_file | SN | wave_audio | 779 | 0x005D0000 | SK | mmioOpen; parse RIFF/WAVE/fmt/data; validate 22050Hz 8-bit mono; alloc 0xBC node; copy PCM data; ... |
| 0x005d4f6a | wave_load_file_streamed | SN | wave_audio | 824 | 0x005D0000 | SK | Same but memory-mapped (MMIO_ALLOCBUF); for larger WAV files |
| 0x005d52a2 | wave_load_avi_stream | SN | wave_audio | 929 | 0x005D0000 | SK | AVIStreamInfo/ReadFormat/Read; validate 22050Hz PCM; alloc 0xBC node; handle mono/stereo conversi... |
| 0x005d5643 | wave_get_position_ms | SN | wave_audio | 190 | 0x005D0000 | SK | waveOutGetPosition(TIME_MS); convert TIME_SAMPLES/TIME_BYTES to ms via __ftol |
| 0x005d5706 | wave_get_position_samples | SN | wave_audio | 166 | 0x005D0000 | SK | waveOutGetPosition; convert TIME_MS/TIME_BYTES to samples; return sample count |
| 0x005d57b1 | wave_fill_avi_buffer | SN | wave_audio | 983 | 0x005D0000 | SK | Read AVI audio data into circular buffer; handle buffer wrap; handle end-of-stream (fill 0x80 sil... |
| 0x005d5b88 | wave_stop_avi_stream | SN | wave_audio | 95 | 0x005D0000 | SK | Clear DAT_006385bc; remove AVI node from list via wave_node_free_from_list |
| 0x005d5bec | wave_refill_avi_buffer | SN | wave_audio | 293 | 0x005D0000 | SK | If buffer empty/full: AVIStreamRead into buffer; fill remaining with silence (0x80) if short |
| 0x005d5d11 | wave_play_range | SN | wave_audio | 640 | 0x005D0000 | SK | AVIStreamTimeToSample → set range; reset buffers; configure double-buffered output |
| 0x005d5f91 | wave_play_from_position | SN | wave_audio | 167 | 0x005D0000 | SK | Start playback from node+0x84 position; trigger buffer callback |
| 0x005d6038 | wave_play_sound | SN | wave_audio | 371 | 0x005D0000 | SK | Enforce max 5 concurrent (DAT_0063858c); open waveOut if needed; setup mix buffers; start |
| 0x005d61ab | wave_stop_sound_by_tag | SN | wave_audio | 119 | 0x005D0000 | SK | Walk linked list; remove nodes matching tag (node+0x8a); free via wave_node_free_from_list |
| 0x005d6222 | wave_set_loop_by_tag | SN | wave_audio | 97 | 0x005D0000 | SK | Walk linked list; set loop flag (bit 2) on nodes matching tag |
| 0x005d6283 | wave_preload_streamed | SN | wave_audio | 322 | 0x005D0000 | SK | Copy mmioinfo state; handle partial buffer; read from mmio file in loop until buffer full; handle... |
| 0x005d63c5 | wave_alloc_global | SN | wave_audio | 107 | 0x005D0000 | SK | GlobalAlloc(GMEM_MOVEABLE) + GlobalLock; store handle in *param_2; free on lock failure |
| 0x005d6430 | wave_free_global | SN | wave_audio | 46 | 0x005D0000 | SK | GlobalUnlock + GlobalFree with null check |
| 0x005d645e | wave_setup_buffer_chain | SN | wave_audio | 551 | 0x005D0000 | SK | Alloc param_3 buffer nodes in circular linked list; each buffer = param_1/param_3 + 0x20 header; ... |
| 0x005d6685 | wave_buffer_grow | SN | wave_audio | 181 | 0x005D0000 | SK | Splice additional buffers from free pool into active chain; update DAT_00638588 |
| 0x005d673a | wave_buffer_shrink | SN | wave_audio | 321 | 0x005D0000 | SK | Remove buffers from active chain to free pool; clear flags; update DAT_00638588 |
| 0x005d687b | wave_set_buffer_count | SN | wave_audio | 204 | 0x005D0000 | SK | Clamp to [2, DAT_00638584]; grow or shrink as needed |
| 0x005d6947 | wave_submit_buffers | SN | wave_audio | 229 | 0x005D0000 | SK | XOR each sample with 0x80 (unsigned→signed); waveOutWrite; set/clear submitted flags |
| 0x005d6a2c | wave_reset_all | SN | wave_audio | 288 | 0x005D0000 | SK | waveOutReset; drain WOM_DONE messages; free non-AVI nodes; clear buffer flags |
| 0x005d6b4c | wave_fill_silence | SN | wave_audio | 61 | 0x005D0000 | SK | Fill buffer region with 0x80 (8-bit PCM silence) |
| 0x005d6b89 | wave_cleanup_all | SN | wave_audio | 272 | 0x005D0000 | SK | waveOutReset; unprepare all headers; free all buffers and nodes |
| 0x005d6c99 | wave_buffer_callback | SN | wave_audio | 1254 | 0x005D0000 | SK | WOM_DONE handler: refill completed buffer via wave_mix_samples; resubmit via waveOutWrite; handle... |
| 0x005d717f | wave_mix_and_dispatch | SN | wave_audio | 784 | 0x005D0000 | SK | Core mix loop: walk sound node list; for AVI nodes call wave_fill_avi_buffer; for WAV nodes call ... |
| 0x005d7494 | wave_node_free_from_list | SN | wave_audio | 165 | 0x005D0000 | SK | Unlink node from linked list; mmioClose file handle(s); GlobalUnlock/Free node memory; decrement ... |
| 0x005d753e | wave_mix_into_buffer | SN | wave_audio | 590 | 0x005D0000 | SK | Mix single WAV node samples into output: read from circular buffer; apply volume; track remaining... |
| 0x005d778c | wave_mix_secondary | SN | wave_audio | 399 | 0x005D0000 | SK | Mix secondary sound node: similar to wave_mix_into_buffer but for non-primary nodes; additive mixing |
| 0x005d791b | wave_avi_mix_callback | SN | wave_audio | 633 | 0x005D0000 | SK | AVI audio mix callback: AVIStreamRead into circular buffer; handle buffer wrap; fill silence on s... |
| 0x005d7b94 | wave_find_by_tag | SN | wave_audio | 107 | 0x005D0000 | SK | Search linked list for node with matching tag (node+0x8a); return 1 if found, 0 if not |
| 0x005d7c00 | fileio_init | FW | file_io | 44 | 0x005D0000 | SK | memset(this, 0, 0x98); constructor for file I/O object |
| 0x005d7c2c | fileio_scalar_dtor | FW | file_io | 66 | 0x005D0000 | SK | Scalar deleting destructor: calls Realloc either way (decompiler quirk) |
| 0x005d7c6e | fileio_close | FW | file_io | 30 | 0x005D0000 | SK | Thunk to thunk_FUN_00421c30 (close file handle) |
| 0x005d7c8c | fileio_debug_output | FW | file_io | 28 | 0x005D0000 | SK | Thunk to FUN_005d8d06 (OutputDebugString) |
| 0x005d7cb0 | dialog_surface_init | FW | file_io | 706 | 0x005D0000 | SK | Init dialog surface: SetRect, create dual surfaces, center viewport, create 3D frame borders, cre... |
| 0x005d7f72 | dialog_surface_init_ex | FW | file_io | 708 | 0x005D0000 | SK | Same as dialog_surface_init but with extra param_9 (window creation flags) |
| 0x005d8236 | set_file_search_path | FW | file_io | 24 | 0x005D0000 | SK | Set PTR_DAT_00637e60 (search path for file open) |
| 0x005d8250 | file_open_thunk | FW | file_io | 32 | 0x005D0000 | SK | Thunk: calls file_open (FUN_005d8270) |
| 0x005d8270 | file_open | FW | file_io | 321 | 0x005D0000 | SK | OpenFile: try READWRITE, fallback READ; build full path from cwd if no backslash |
| 0x005d83b6 | file_create_thunk | FW | file_io | 32 | 0x005D0000 | SK | Thunk to file_create |
| 0x005d83d6 | file_create | FW | file_io | 155 | 0x005D0000 | SK | CreateFileA (GENERIC_READ / WRITE, CREATE_ALWAYS) |
| 0x005d8476 | file_close | FW | file_io | 123 | 0x005D0000 | SK | Flush + CloseHandle; unmap memory-mapped view first if active |
| 0x005d84f6 | file_read | FW | file_io | 86 | 0x005D0000 | SK | ReadFile wrapper; return 1 on success |
| 0x005d8551 | file_search_string | FW | file_io | 209 | 0x005D0000 | SK | Read byte-by-byte searching for string match; on match seek back to start of match |
| 0x005d8622 | file_seek_relative | FW | file_io | 78 | 0x005D0000 | SK | SetFilePointer(handle, offset, NULL, FILE_CURRENT) |
| 0x005d8675 | file_seek_absolute | FW | file_io | 78 | 0x005D0000 | SK | SetFilePointer(handle, offset, NULL, FILE_BEGIN) |
| 0x005d86c8 | file_get_start_pos | FW | file_io | 84 | 0x005D0000 | SK | SetFilePointer to beginning; store position in *param_2 |
| 0x005d8721 | file_write | FW | file_io | 118 | 0x005D0000 | SK | WriteFile; log error if read-only file ("Error: Tried to write to a read only file") |
| 0x005d879c | file_write_line | FW | file_io | 128 | 0x005D0000 | SK | strlen → file_write(string) + file_write(CRLF) |
| 0x005d881c | file_read_line | FW | file_io | 370 | 0x005D0000 | SK | Read byte-by-byte until \n/\r/\0 or max_len; skip trailing newlines; seek back 1 if extra read |
| 0x005d898e | file_get_size | FW | file_io | 90 | 0x005D0000 | SK | GetFileSize; log "Bad file handle in MSFileSize" on error |
| 0x005d89e8 | file_memory_map | FW | file_io | 196 | 0x005D0000 | SK | CreateFileMappingA + MapViewOfFile (read-only); cleanup on failure |
| 0x005d8ab8 | file_memory_unmap | FW | file_io | 124 | 0x005D0000 | SK | UnmapViewOfFile + CloseHandle for mapping |
| 0x005d8b34 | strftime_simple | FW | file_io | 40 | 0x005D0000 | SK | Wrapper: calls strftime_core(buf, size, 0, tm, 0) |
| 0x005d8b5c | _strftime | FW | file_io | 42 | 0x005D0000 | SK | CRT library _strftime: calls strftime_core(buf, size, fmt, tm, 0) |
| 0x005d8b86 | strftime_wchar | FW | file_io | 42 | 0x005D0000 | SK | Wrapper: calls strftime_core(buf, size, fmt, tm, 1) — wide char variant |
| 0x005d8bb0 | show_save_dialog | FW | file_dialog | 46 | 0x005D0000 | SK | Wrapper: show_file_dialog(buf, filter, dir, multi, 1=save, parent) |
| 0x005d8bde | show_open_dialog | FW | file_dialog | 46 | 0x005D0000 | SK | Wrapper: show_file_dialog(buf, filter, dir, multi, save_mode, 0) |
| 0x005d8c0c | show_file_dialog | FW | file_dialog | 250 | 0x005D0000 | SK | GetOpenFileNameA/GetSaveFileNameA; title "Select a File"; OFN_FILEMUSTEXIST |
| 0x005d8d06 | debug_output_string | FW | file_dialog | 42 | 0x005D0000 | SK | OutputDebugStringA(param) + OutputDebugStringA(newline); return 1 |
| 0x005d8d30 | always_return_true | FW | file_dialog | 21 | 0x005D0000 | SK | Returns 1 unconditionally |
| 0x005d8d50 | string_split_underscores | FW | gdi_text | 81 | 0x005D0000 | SK | Replace '_' with '\0' in string; return segment count |
| 0x005d8da1 | gdi_get_text_height | FW | gdi_text | 158 | 0x005D0000 | SK | GetDC → CreateCompatibleDC → SelectObject(font) → GetTextMetrics → tmHeight (min 20px) |
| 0x005d8e3f | tab_control_create | FW | gdi_text | 1239 | 0x005D0000 | SK | Create MSControlClass tab windows: load bitmaps (0x12d/0x12e/0x12f); alloc 0xA4 per tab; SetWindo... |
| 0x005d931b | tab_control_create_ex | FW | gdi_text | 1748 | 0x005D0000 | SK | Extended tab creation: optional scrollbar, supports auto-paginate when tabs exceed rect height |
| 0x005d99f4 | tab_set_selection | FW | tab_ctrl | 166 | 0x005D0000 | SK | Set selected tab index; invalidate previous+new tabs for repaint |
| 0x005d9a9a | tab_invalidate_item | FW | tab_ctrl | 236 | 0x005D0000 | SK | Invalidate tab region for repaint; handle scroll offset |
| 0x005d9b86 | tab_wndproc | FW | tab_ctrl | 4031 | 0x005D0000 | SK | Full WndProc for tab controls (at GWL_WNDPROC): WM_PAINT (draw focused/unfocused text, underline ... |
| 0x005dab5a | tab_is_mscontrol | FW | tab_ctrl | 109 | 0x005D0000 | SK | GetClassNameA → uppercase → strcmp "MSCONTROLCLASS"; verify +0x2c==3 |
| 0x005dabc7 | invalidate_rect_wrapper | FW | tab_ctrl | 30 | 0x005D0000 | SK | InvalidateRect(hwnd, NULL, 0) |
| 0x005dabe5 | tab_check_matches_index | FW | tab_ctrl | 84 | 0x005D0000 | SK | Compare CCheckListBox style with stored index at +0x14; return match |
| 0x005dac39 | tab_same_group | FW | tab_ctrl | 160 | 0x005D0000 | SK | Check if two HWNDs are both MSCONTROLCLASS and share same tab group (+0x04) |
| 0x005dacd9 | set_tab_text_color | FW | tab_ctrl | 47 | 0x005D0000 | SK | Set DAT_006386f4/f5/f6=RGB; set DAT_006386f7=1 (enabled flag) |
| 0x005dad08 | set_tab_shadow_color | FW | tab_ctrl | 47 | 0x005D0000 | SK | Set DAT_006386f8/f9/fa=RGB; set DAT_006386fb=1 |
| 0x005dad40 | tab_fire_callback_2c | FW | tab_ctrl | 54 | 0x005D0000 | SK | If this+0x2c callback set, call it(p1,p2) |
| 0x005dad80 | tab_fire_callback_30 | FW | tab_ctrl | 54 | 0x005D0000 | SK | If this+0x30 callback set, call it(p1,p2) |
| 0x005dadc0 | tab_fire_callback_34 | FW | tab_ctrl | 54 | 0x005D0000 | SK | If this+0x34 callback set, call it(p1,p2) |
| 0x005dae00 | crt_static_init_pcmem | FW | error | 26 | 0x005D0000 | SK | CRT static init: call pcmem_init + register atexit |
| 0x005dae1a | pcmem_init | FW | error | 26 | 0x005D0000 | SK | Calls FUN_005db089 (error system init) |
| 0x005dae34 | pcmem_register_atexit | FW | error | 29 | 0x005D0000 | SK | _atexit(pcmem_atexit_handler) |
| 0x005dae51 | pcmem_atexit_handler | FW | error | 26 | 0x005D0000 | SK | ~Iostream_init() destructor call |
| 0x005dae6b | fatal_error | FW | error | 70 | 0x005D0000 | SK | Set error code; format "FATAL ERROR"+"Error: %s File: %s Line: %d"; show MessageBox "SMEDS Applic... |
| 0x005daeb1 | warning_log | FW | error | 70 | 0x005D0000 | SK | Set error code; format "WARNING"+same; output via debug_log |
| 0x005daef7 | error_format_message | FW | error | 108 | 0x005D0000 | SK | strcpy prefix; sprintf "Error: %s File: %s Line: %d"; append timestamp |
| 0x005daf63 | error_get_timestamp_buf | FW | error | 47 | 0x005D0000 | SK | Return this+0x400 buffer; call FUN_005eddaa to format |
| 0x005daf92 | error_show_fatal_dialog | FW | error | 41 | 0x005D0000 | SK | show_messagebox_DD00("SMEDS Application Error", msg) |
| 0x005dafbb | error_log_warning | FW | error | 36 | 0x005D0000 | SK | debug_log(msg) |
| 0x005dafdf | error_set_code | FW | error | 55 | 0x005D0000 | SK | Store code at this+0x704; set bit flag at this+0x700 |
| 0x005db016 | IsTracking | FW | error | 31 | 0x005D0000 | SK | MFC CSplitterWnd::IsTracking; return this+0x704 |
| 0x005db035 | EnableStackedTabs | FW | scrollbar | 36 | 0x005D0000 | SK | MFC CPropertySheet::EnableStackedTabs; set this+0x708 |
| 0x005db059 | error_clear_state | FW | scrollbar | 48 | 0x005D0000 | SK | Zero this+0x700 and this+0x704 (clear error code and flags) |
| 0x005db089 | error_system_init | FW | scrollbar | 43 | 0x005D0000 | SK | EnableStackedTabs(0); clear error state; return this |
| 0x005db0b4 | ~Iostream_init | FW | scrollbar | 22 | 0x005D0000 | SK | MFC Iostream_init destructor; empty function |
| 0x005db0d0 | scrollbar_set_position | FW | scrollbar | 64 | 0x005D0000 | SK | Get min/max range; clamp param_1; store at this+0x34 |
| 0x005db110 | scrollbar_get_range | FW | scrollbar | 47 | 0x005D0000 | SK | Thunk: call FUN_005cd535 with this->hwnd |
| 0x005db140 | load_resource_dll | FW | resource | 155 | 0x005D0000 | SK | LoadLibraryExA; store in DAT_006e4f60 array; inc DAT_006387cc; max 36 DLLs; log "not found" on fa... |
| 0x005db1e0 | lock_resource_alt | FW | resource | 26 | 0x005D0000 | SK | LockResource wrapper (alternate entry point) |
| 0x005db1fa | find_resource_bitmap | FW | resource | 249 | 0x005D0000 | SK | FindResourceA(RT_BITMAP) across exe + loaded DLLs; LoadResource |
| 0x005db2f8 | find_resource_bitmap_alt | FW | resource | 205 | 0x005D0000 | SK | Same as find_resource_bitmap — identical logic, separate entry |
| 0x005db3ca | find_resource_named | FW | resource | 354 | 0x005D0000 | SK | Sanitize name (space/dot/apostrophe→underscore); FindResourceA with custom type across exe+DLLs |
| 0x005db531 | lock_resource | FW | resource | 26 | 0x005D0000 | SK | LockResource wrapper |
| 0x005db54b | noop_free_resource | FW | resource | 16 | 0x005D0000 | SK | Empty (FreeResource is no-op in Win32) |
| 0x005db55b | unload_resource_dll | FW | resource | 142 | 0x005D0000 | SK | Find in DAT_006e4f60; shift remaining; dec count; FreeLibrary |
| 0x005db5e9 | hmem_get_size_wrapper | FW | resource | 28 | 0x005D0000 | SK | Thunk to FUN_005dcef7 (GlobalSize) |
| 0x005db610 | surface_record_init | FW | surface | 64 | 0x005D0000 | SK | Zero 4 dwords of surface struct (handle, width, height, flags) |
| 0x005db650 | surface_destroy | FW | surface | 43 | 0x005D0000 | SK | Destroy surface at +8 |
| 0x005db67b | surface_create_and_show | FW | surface | 137 | 0x005D0000 | SK | Create surface; bind to struct; call show callback |
| 0x005db704 | surface_create_and_setup | FW | surface | 142 | 0x005D0000 | SK | Create surface; bind; call with 0x10 flag |
| 0x005db792 | surface_create_movie | FW | surface | 125 | 0x005D0000 | SK | Create movie surface via FUN_005ee0b1 |
| 0x005db80f | surface_create_movie_child | FW | surface | 132 | 0x005D0000 | SK | Create child movie surface; get parent via thunk |
| 0x005db893 | surface_create_child_and_show | FW | surface | 144 | 0x005D0000 | SK | Create child surface + show callback |
| 0x005db923 | surface_create_child_and_setup | FW | surface | 149 | 0x005D0000 | SK | Create child surface + 0x10 flag |
| 0x005db9b8 | show_dialog_modal | FW | surface | 88 | 0x005D0000 | SK | If param==0 standalone else child; modal display |
| 0x005dba15 | show_dialog_modeless | FW | surface | 88 | 0x005D0000 | SK | Same but modeless flag |
| 0x005dba72 | send_gdi_resize_400 | FW | surface | 35 | 0x005D0000 | SK | Calls gdi_D39E(0x400) |
| 0x005dba95 | send_gdi_resize_100 | FW | surface | 35 | 0x005D0000 | SK | Calls gdi_D39E(0x100) |
| 0x005dbab8 | send_gdi_resize_200 | FW | surface | 35 | 0x005D0000 | SK | Calls gdi_D39E(0x200) |
| 0x005dbadb | flush_display_1 | FW | surface | 27 | 0x005D0000 | SK | Calls FUN_005bd4cd |
| 0x005dbaf6 | flush_display_2 | FW | surface | 27 | 0x005D0000 | SK | Calls FUN_005bd500 |
| 0x005dbb20 | smeds_init | FW | smeds_init | 47 | 0x005D0000 | SK | Store hInstance (DAT_006e4ff0), flags (DAT_006e4fec); call subsystem inits |
| 0x005dbb4f | smeds_shutdown | FW | smeds_init | 100 | 0x005D0000 | SK | Log "SMEDS> Terminated Normally."; destroy timer manager; GdiFlush |
| 0x005dbbb3 | smeds_init_gdi | FW | smeds_init | 35 | 0x005D0000 | SK | Init GDI subsystem |
| 0x005dbbd6 | smeds_init_subsystems | FW | smeds_init | 69 | 0x005D0000 | SK | Register window classes; PRNG seed via time(); InitCommonControls |
| 0x005dbc1b | smeds_cleanup | FW | smeds_init | 31 | 0x005D0000 | SK | Window cleanup + audio cleanup + class unregistration |
| 0x005dbc3a | smeds_hook_init | FW | smeds_init | 16 | 0x005D0000 | SK | Empty virtual hook (overridable) |
| 0x005dbc4a | smeds_hook_cleanup | FW | smeds_init | 16 | 0x005D0000 | SK | Empty virtual hook |
| 0x005dbc5a | register_smeds_window_classes | FW | smeds_window | 352 | 0x005D0000 | SK | Register 4 classes: MSWindowClass, MSMovieClass, MSControlClass, MSMrTimerClass |
| 0x005dbdba | unregister_smeds_classes | FW | smeds_window | 206 | 0x005D0000 | SK | Unregister all 5 SMEDS classes (+ MSAppWindow); log errors |
| 0x005dbe88 | mswindow_wndproc | FW | smeds_window | 3076 | 0x005D0000 | SK | Main WndProc for MSWindowClass: WM_PAINT (icon/tiled bg/centered overlay), WM_DESTROY, WM_MOVE, W... |
| 0x005dcac0 | timer_manager_dtor | FW | timer | 57 | 0x005D0000 | SK | Destroy timer manager; conditionally delete self if bit 0 set |
| 0x005dcb00 | thunk_hmem_duplicate | FW | memory | 28 | 0x005D0000 | SK | Thunk to hmem_duplicate |
| 0x005dcb1c | thunk_hmem_lock | FW | memory | 28 | 0x005D0000 | SK | Thunk to hmem_lock |
| 0x005dcb38 | thunk_hmem_unlock | FW | memory | 28 | 0x005D0000 | SK | Thunk to hmem_unlock |
| 0x005dcb54 | thunk_hmem_alloc | FW | memory | 28 | 0x005D0000 | SK | Thunk to hmem_alloc |
| 0x005dcb70 | thunk_hmem_free | FW | memory | 28 | 0x005D0000 | SK | Thunk to hmem_free |
| 0x005dcb8c | thunk_hmem_copy | FW | memory | 36 | 0x005D0000 | SK | Thunk to hmem_copy |
| 0x005dcbb0 | thunk_hmem_get_size | FW | memory | 28 | 0x005D0000 | SK | Thunk to hmem_get_size |
| 0x005dcbcc | thunk_hmem_realloc | FW | memory | 32 | 0x005D0000 | SK | Thunk to hmem_realloc |
| 0x005dcbec | thunk_hmem_max_alloc | FW | memory | 21 | 0x005D0000 | SK | Thunk to hmem_max_alloc_size |
| 0x005dcc10 | timevec_init | FW | memory | 34 | 0x005D0000 | SK | Zero this[0]; return this |
| 0x005dcc32 | ~_Timevec | FW | memory | 36 | 0x005D0000 | SK | VS 1998 _Timevec destructor; calls FUN_005e10c7 |
| 0x005dcc56 | menu_add_item_resolved | FW | menu | 63 | 0x005D0000 | SK | Resolve string via FUN_005dcd40; call build_menu_16E0 |
| 0x005dcc95 | menu_add_item_direct | FW | menu | 44 | 0x005D0000 | SK | Call build_menu_1768 directly |
| 0x005dccc1 | Realloc | FW | menu | 40 | 0x005D0000 | SK | MFC Realloc (CHtmlStream/CMemFile); delegate to FUN_005e17db |
| 0x005dcce9 | menu_remove_item | FW | menu | 51 | 0x005D0000 | SK | Resolve string; call build_menu_1805 to remove |
| 0x005dcd1c | menu_remove_direct | FW | menu | 36 | 0x005D0000 | SK | Call build_menu_1805 directly |
| 0x005dcd40 | string_resolve | FW | menu | 42 | 0x005D0000 | SK | Resolve string ID via FUN_005e1599 |
| 0x005dcd70 | hmem_duplicate | FW | memory | 137 | 0x005D0000 | SK | GlobalSize → alloc → lock → memcpy → unlock; replace handle_ptr |
| 0x005dcdf9 | hmem_lock | FW | memory | 43 | 0x005D0000 | SK | GlobalLock with null check |
| 0x005dce29 | hmem_unlock | FW | memory | 38 | 0x005D0000 | SK | GlobalUnlock with null check |
| 0x005dce4f | hmem_alloc | FW | memory | 71 | 0x005D0000 | SK | GlobalAlloc(GMEM_MOVEABLE / GMEM_ZEROINIT); fatal error on failure |
| 0x005dce96 | hmem_free | FW | memory | 56 | 0x005D0000 | SK | GlobalFree; log "Error: Tried to dispose of NULL HMEM" |
| 0x005dced3 | hmem_copy | FW | memory | 36 | 0x005D0000 | SK | memcpy wrapper (src/dst swapped from C convention) |
| 0x005dcef7 | hmem_get_size | FW | memory | 26 | 0x005D0000 | SK | GlobalSize wrapper |
| 0x005dcf11 | hmem_realloc | FW | memory | 164 | 0x005D0000 | SK | Alloc new → lock both → copy min(old,new) → free old → replace ptr |
| 0x005dcfb5 | hmem_max_alloc_size | FW | memory | 21 | 0x005D0000 | SK | Returns 0x100000 (1MB constant) |
| 0x005dcfca | hmem_would_exceed_max | FW | memory | 58 | 0x005D0000 | SK | Returns true if size_kb * 1024 > 0x100000 |
| 0x005dd010 | av_manager_ctor | SN | av_manager | 336 | 0x005D0000 | SK | Init A/V subsystems; set vtable; zero fields; store at DAT_006389d0 |
| 0x005dd1a0 | av_manager_dtor | SN | av_manager | 144 | 0x005D0000 | SK | Shutdown in reverse; zero DAT_006389d0 |
| 0x005dd230 | av_dtor_step1 | SN | av_manager | 15 | 0x005D0000 | SK | Calls FUN_005bd915 |
| 0x005dd23f | av_dtor_step2 | SN | av_manager | 15 | 0x005D0000 | SK | Calls FUN_005c656b |
| 0x005dd24e | av_dtor_step3 | SN | av_manager | 15 | 0x005D0000 | SK | Calls FUN_005eed1b |
| 0x005dd25d | av_dtor_step4 | SN | av_manager | 9 | 0x005D0000 | SK | Calls thunk_FUN_0044cba0 |
| 0x005dd270 | seh_unwind | SN | av_manager | 14 | 0x005D0000 | SK | SEH frame unwinder (restores FS:[0]) |
| 0x005dd27e | av_init_standalone | SN | av_manager | 101 | 0x005D0000 | SK | Init 320x240 A/V window; set surface at +0x124 |
| 0x005dd2e3 | av_init_child | SN | av_manager | 148 | 0x005D0000 | SK | Init A/V as child window; store owner+0x48 |
| 0x005dd377 | av_play_file | SN | av_manager | 75 | 0x005D0000 | SK | Play file via FUN_005e1c8e; return 0 on failure |
| 0x005dd3c2 | av_stop | SN | av_manager | 47 | 0x005D0000 | SK | Zero +0xa24; stop playback |
| 0x005dd3f1 | av_play_range | SN | av_manager | 108 | 0x005D0000 | SK | Set +0xa10/+0xa14 bounds; start playback |
| 0x005dd45d | av_reset | SN | av_manager | 42 | 0x005D0000 | SK | Reset to beginning |
| 0x005dd487 | av_play_continuous | SN | av_manager | 59 | 0x005D0000 | SK | Set +0xa24=1 (loop); start playback |
| 0x005dd4c2 | av_play_range_loop | SN | av_manager | 91 | 0x005D0000 | SK | Set range + loop flag |
| 0x005dd51d | av_pause | SN | av_manager | 34 | 0x005D0000 | SK | Pause playback |
| 0x005dd53f | av_resume | SN | av_manager | 34 | 0x005D0000 | SK | Resume playback |
| 0x005dd561 | av_set_surface | SN | av_manager | 67 | 0x005D0000 | SK | Set rendering surface and display callback |
| 0x005dd5a4 | av_resize_to_fit | SN | av_manager | 168 | 0x005D0000 | SK | Resize A/V display to fit surface dimensions |
| 0x005dd64c | av_set_position | SN | av_manager | 210 | 0x005D0000 | SK | Position A/V display at (x,y) within surface |
| 0x005dd71e | av_double_size | SN | av_manager | 67 | 0x005D0000 | SK | Width*2, height*2; set +0x5a0=1 |
| 0x005dd761 | av_set_stretch | SN | av_manager | 125 | 0x005D0000 | SK | Enable/disable stretch mode at +0x5a4 |
| 0x005dd7de | av_repaint | SN | av_manager | 159 | 0x005D0000 | SK | Repaint at stored position to parent surface |
| 0x005dd87d | noop_av | SN | av_manager | 16 | 0x005D0000 | SK | Empty function |
| 0x005dd8a0 | register_mm_window | SN | midi_cd | 159 | 0x005D0000 | SK | Register MSMMWindow; create hidden window (DAT_006e4ff8); open cdaudio |
| 0x005dd93f | mm_wndproc | SN | midi_cd | 149 | 0x005D0000 | SK | MM_MCINOTIFY handler: MIDI done → callback; CD done → callback |
| 0x005dd9d9 | snd_play_async | SN | midi_cd | 28 | 0x005D0000 | SK | sndPlaySoundA(file, SND_ASYNC) |
| 0x005dd9f5 | snd_play_loop | SN | midi_cd | 28 | 0x005D0000 | SK | sndPlaySoundA(file, SND_ASYNC / SND_LOOP) |
| 0x005dda11 | snd_stop | SN | midi_cd | 26 | 0x005D0000 | SK | sndPlaySoundA(NULL, SND_ASYNC) |
| 0x005dda2b | noop_snd | SN | midi_cd | 16 | 0x005D0000 | SK | Empty function |
| 0x005dda3b | snd_beep | SN | midi_cd | 24 | 0x005D0000 | SK | MessageBeep(0xFFFFFFFF) |
| 0x005dda53 | midi_play | SN | midi_cd | 372 | 0x005D0000 | SK | MCI_OPEN "sequencer"; check MIDI Mapper; MCI_PLAY with notification |
| 0x005ddbc7 | cdaudio_play_track | SN | midi_cd | 326 | 0x005D0000 | SK | MCI_SEEK to track; MCI_PLAY with from/to range; handle last track |
| 0x005ddd12 | midi_stop | SN | midi_cd | 60 | 0x005D0000 | SK | MCI_STOP + MCI_CLOSE; zero DAT_006389d4 |
| 0x005ddd4e | cdaudio_open | SN | midi_cd | 265 | 0x005D0000 | SK | Open "cdaudio"; set MCI_FORMAT_TMSF; get total tracks |
| 0x005dde57 | cdaudio_close | SN | midi_cd | 70 | 0x005D0000 | SK | MCI_CLOSE; zero DAT_006389d8/e0 |
| 0x005dde9d | cdaudio_stop | SN | midi_cd | 50 | 0x005D0000 | SK | MCI_STOP on cdaudio device |
| 0x005ddecf | audio_shutdown_all | SN | midi_cd | 48 | 0x005D0000 | SK | snd_stop + cdaudio_stop + cdaudio_close + midi_stop + destroy MM window |
| 0x005ddeff | cdaudio_get_track_count | SN | midi_cd | 270 | 0x005D0000 | SK | Open if needed; MCI_STATUS for total tracks; return count or -1 |
| 0x005de00d | cdaudio_eject | SN | midi_cd | 168 | 0x005D0000 | SK | MCI_SET MCI_SET_DOOR_OPEN (0x100) |
| 0x005de0b5 | cdaudio_close_tray | SN | midi_cd | 232 | 0x005D0000 | SK | MCI_SET MCI_SET_DOOR_CLOSED (0x200) |
| 0x005de19d | cdaudio_pause_resume | SN | midi_cd | 179 | 0x005D0000 | SK | Toggle: if 0x20D (playing) pause; if stopped resume |
| 0x005de250 | cdaudio_pause_resume_2 | SN | midi_cd | 192 | 0x005D0000 | SK | Toggle: if 0x20D play; if 0x211 (paused) resume |
| 0x005de310 | cdaudio_play_next | SN | midi_cd | 270 | 0x005D0000 | SK | Query current track; increment (wrap to 1); play |
| 0x005de41e | cdaudio_play_prev | SN | midi_cd | 267 | 0x005D0000 | SK | Query current; decrement (min 1); play |
| 0x005de529 | cdaudio_get_position | SN | midi_cd | 231 | 0x005D0000 | SK | MCI_STATUS MCI_FORMAT_MSF → extract minutes/seconds/frames |
| 0x005de620 | api_snd_play_async | SN | audio_thunks | 28 | 0x005D0000 | SK | Thunk to snd_play_async |
| 0x005de63c | api_snd_play_loop | SN | audio_thunks | 28 | 0x005D0000 | SK | Thunk to snd_play_loop |
| 0x005de658 | api_snd_noop | SN | audio_thunks | 28 | 0x005D0000 | SK | Thunk to noop_snd |
| 0x005de674 | api_snd_beep | SN | audio_thunks | 21 | 0x005D0000 | SK | Thunk to snd_beep |
| 0x005de689 | api_midi_play | SN | audio_thunks | 28 | 0x005D0000 | SK | Thunk to midi_play |
| 0x005de6a5 | set_midi_done_callback | SN | audio_thunks | 24 | 0x005D0000 | SK | Set DAT_006e5004 (MIDI completion callback) |
| 0x005de6bd | midi_done_notify | SN | audio_thunks | 35 | 0x005D0000 | SK | Call MIDI completion callback if set |
| 0x005de6e0 | api_cdaudio_play | SN | audio_thunks | 28 | 0x005D0000 | SK | Thunk to cdaudio_play_track |
| 0x005de6fc | set_cdaudio_done_callback | SN | audio_thunks | 24 | 0x005D0000 | SK | Set DAT_006e5000 (CD completion callback) |
| 0x005de714 | cdaudio_done_notify | SN | audio_thunks | 35 | 0x005D0000 | SK | Call CD completion callback if set |
| 0x005de737 | api_midi_stop | SN | audio_thunks | 21 | 0x005D0000 | SK | Thunk to midi_stop |
| 0x005de74c | api_snd_stop | SN | audio_thunks | 21 | 0x005D0000 | SK | Thunk to snd_stop |
| 0x005de761 | api_cdaudio_stop | SN | audio_thunks | 21 | 0x005D0000 | SK | Thunk to cdaudio_stop |
| 0x005de780 | palette_init_system | RN | palette | 516 | 0x005D0000 | SK | Init 256-entry LOGPALETTE from system palette; mark first/last as fixed, middle as animatable; fi... |
| 0x005de984 | palette_mark_animatable | RN | palette | 92 | 0x005D0000 | SK | Set PC_RESERVED (flag 1) for entries [start, start+count) |
| 0x005de9e0 | palette_copy_range | RN | palette | 130 | 0x005D0000 | SK | Copy RGB from source to destination range |
| 0x005dea62 | palette_animate | RN | palette | 60 | 0x005D0000 | SK | AnimatePalette (only if hardware palette mode) |
| 0x005dea9e | palette_get_entry | RN | palette | 61 | 0x005D0000 | SK | Read RGB from palette entry at index*4+4 |
| 0x005deadb | palette_set_entry_simple | RN | palette | 55 | 0x005D0000 | SK | Set RGB at entry (no flag update) |
| 0x005deb12 | palette_set_entry | RN | palette | 316 | 0x005D0000 | SK | Set RGB + PC_NOCOLLAPSE(4); check static match → PC_RESERVED(1) |
| 0x005dec4e | palette_create | RN | palette | 60 | 0x005D0000 | SK | CreatePalette (hardware palette only) |
| 0x005dec8a | palette_delete | RN | palette | 39 | 0x005D0000 | SK | DeleteObject (hardware palette only) |
| 0x005decb1 | palette_set_entries | RN | palette | 60 | 0x005D0000 | SK | SetPaletteEntries (hardware palette only) |
| 0x005deced | palette_copy_full | RN | palette | 37 | 0x005D0000 | SK | memcpy 0x404 bytes (full LOGPALETTE) |
| 0x005ded12 | palette_export_rgb | RN | palette | 123 | 0x005D0000 | SK | Export range as packed RGB triplets (3 bytes/entry) |
| 0x005ded90 | splash_on_timer | FW | splash | 152 | 0x005D0000 | SK | Timer callback: set timeout = tick + 3600 (60 sec); update display |
| 0x005dee28 | text_display_show | FW | splash | 794 | 0x005D0000 | SK | Load "TEXT" resource; render with shadow; create surface; draw 3D frame; message loop |
| 0x005df166 | text_display_timer_check | FW | splash | 151 | 0x005D0000 | SK | If memory OK AND retries < 3 AND timeout elapsed: show text display |
| 0x005df1fd | text_display_schedule | FW | splash | 131 | 0x005D0000 | SK | Create timer; store display params in globals DAT_00638b90-b9c |
| 0x005df280 | text_display_cancel | FW | splash | 53 | 0x005D0000 | SK | Kill timer at DAT_00638ba0 |
| 0x005df2b5 | load_gif_resource | FW | gif | 966 | 0x005D0000 | SK | Validate "GIF" magic; extract global color table; skip extension blocks; read dimensions + LZW mi... |
| 0x005df67b | gif_cleanup_1 | FW | gif | 12 | 0x005D0000 | SK | SEH cleanup: call fileio_close |
| 0x005df687 | gif_cleanup_2 | FW | gif | 12 | 0x005D0000 | SK | SEH cleanup: call fileio_close |
| 0x005df69d | gif_seh_unwind | FW | gif | 14 | 0x005D0000 | SK | SEH frame unwinder |
| 0x005df6ab | transition_effect_no_wait | FW | transition | 54 | 0x005D0000 | SK | Wrapper: transition_effect with wait_surface=0 |
| 0x005df6e1 | transition_effect | FW | transition | 592 | 0x005D0000 | SK | Fisher-Yates shuffle rows; blit `step` rows at a time; flush after each batch |
| 0x005df931 | draw_3d_frame_gdi | FW | 3d_frame | 284 | 0x005D0000 | SK | GDI line calls: swap light/dark if depth<0; draw right+bottom then left+top; InflateRect and repeat |
| 0x005dfa4d | draw_3d_frame_palette | FW | 3d_frame | 276 | 0x005D0000 | SK | Same 3D frame with palette-indexed line drawing |
| 0x005dfb61 | rll_decode | FW | rll_codec | 558 | 0x005D0000 | SK | In-place decode: <0x80 = run of N copies; >=0x80 = literal of (N-0x80) bytes; expand via __expand() |
| 0x005dfd8f | rll_encode | FW | rll_codec | 777 | 0x005D0000 | SK | Detect runs (3+ identical); max run 0x7F; return -1 if compressed >= original |
| 0x005e00bb | dialog_button_handler | FW | dialog | 79 | 0x005E0000 | SK | Handles OK(0x65)/Cancel(0x66) button clicks; sets dialog result |
| 0x005e010a | set_dialog_result | FW | dialog | 24 | 0x005E0000 | SK | Sets DAT_006e5018 = value (dialog return code) |
| 0x005e0122 | set_dialog_result_and_invalidate | FW | dialog | 38 | 0x005E0000 | SK | Sets dialog result + invalidates object cache |
| 0x005e0148 | measure_multiline_text | FW | dialog | 205 | 0x005E0000 | SK | Splits text on '_', measures max line width, returns line count |
| 0x005e0215 | calc_text_line_count | FW | dialog | 51 | 0x005E0000 | SK | text_width / avail_width + 1 = line count |
| 0x005e0248 | show_text_dialog | FW | dialog | 34 | 0x005E0000 | SK | Wrapper: calls show_text_dialog_ex with param_3=0 |
| 0x005e026a | show_text_dialog_ex | FW | dialog | 1402 | 0x005E0000 | SK | Modal text dialog: text panel + listbox + OK/Cancel buttons |
| 0x005e0802 | dtor_thunk_1 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e080e | dtor_thunk_2 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e081a | dtor_thunk_3 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0826 | dtor_thunk_4 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0832 | dtor_thunk_5 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e083e | dtor_thunk_6 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0854 | seh_epilog_1 | FW | seh | 15 | 0x005E0000 | SK | SEH chain restore epilog |
| 0x005e0863 | show_simple_dialog | FW | dialog | 442 | 0x005E0000 | SK | Simple dialog with OK/Cancel, no text panel |
| 0x005e0a31 | dtor_thunk_7 | FW | seh | 9 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0a3a | dtor_thunk_8 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0a46 | dtor_thunk_9 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0a52 | dtor_thunk_10 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0a5e | dtor_thunk_11 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0a6a | dtor_thunk_12 | FW | seh | 12 | 0x005E0000 | SK | Destructor thunk |
| 0x005e0a80 | seh_epilog_2 | FW | seh | 15 | 0x005E0000 | SK | SEH chain restore epilog |
| 0x005e0a8f | msgbox_wrapper_1 | FW | msgbox | 36 | 0x005E0000 | SK | Wrapper for show_messagebox_EEB0 |
| 0x005e0ab3 | msgbox_wrapper_2 | FW | msgbox | 40 | 0x005E0000 | SK | Wrapper for show_messagebox_F0B9 |
| 0x005e0adb | fw_call_5bbb5a | FW | util | 28 | 0x005E0000 | SK | Forwarding thunk |
| 0x005e0af7 | point_in_rect | FW | util | 84 | 0x005E0000 | SK | Returns 1 if (x,y) inside rect[4] |
| 0x005e0b50 | rand_range | FW | util | 37 | 0x005E0000 | SK | Returns random int in [0, max) via rand()*max/32768 |
| 0x005e0b80 | swap_bytes_16 | FW | util | 27 | 0x005E0000 | SK | Swaps high/low bytes of 16-bit value (endian swap) |
| 0x005e0ba0 | get_object_field_38 | FW | util | 28 | 0x005E0000 | SK | Returns this->field_0x38 |
| 0x005e0bc0 | create_listbox_control | FW | dialog | 194 | 0x005E0000 | SK | Creates listbox child window with scrollbar |
| 0x005e0c90 | render_surface_to | FW | surface | 37 | 0x005E0000 | SK | Gets surface then renders to target |
| 0x005e0cc0 | get_surface_ptr | FW | surface | 27 | 0x005E0000 | SK | Returns *this (first field = surface pointer) |
| 0x005e0ce0 | parse_menu_string_recursive | FW | menu | 586 | 0x005E0000 | SK | Recursive menu builder from format string: {=submenu, _=sep, !=disabled, *=checked |
| 0x005e0f2a | build_menu_from_string | FW | menu | 376 | 0x005E0000 | SK | Top-level: creates MenuBar, parses {..} blocks |
| 0x005e10a2 | load_menu_resource | FW | menu | 37 | 0x005E0000 | SK | LoadMenuA from hInstance |
| 0x005e10c7 | destroy_menu_safe | FW | menu | 36 | 0x005E0000 | SK | DestroyMenu if non-null |
| 0x005e10eb | noop_1 | FW | noop | 16 | 0x005E0000 | SK | Empty stub |
| 0x005e10fb | draw_menu_bar | FW | menu | 29 | 0x005E0000 | SK | DrawMenuBar on wndObj->hwnd |
| 0x005e1118 | enable_menu_item | FW | menu | 166 | 0x005E0000 | SK | Enable/disable by position (1-based), supports submenu |
| 0x005e11be | check_menu_item | FW | menu | 104 | 0x005E0000 | SK | Check/uncheck by position (1-based) |
| 0x005e1226 | delete_menu_item | FW | menu | 102 | 0x005E0000 | SK | Delete/remove by position; -1 = remove submenu |
| 0x005e128c | build_menu_128C | FW | menu | 293 | 0x005E0000 | SK | Insert item with auto-column-break at 22 items |
| 0x005e13b1 | build_menu_13B1 | FW | menu | 279 | 0x005E0000 | SK | Insert item with explicit command ID + auto-break |
| 0x005e14c8 | modify_menu_item | FW | menu | 130 | 0x005E0000 | SK | Modify existing menu item text |
| 0x005e154a | show_popup_menu | FW | menu | 79 | 0x005E0000 | SK | ClientToScreen + TrackPopupMenu |
| 0x005e1599 | get_submenu | FW | menu | 48 | 0x005E0000 | SK | GetSubMenu wrapper (1-based position) |
| 0x005e15ce | enable_menu_item_by_id | FW | menu | 75 | 0x005E0000 | SK | Enable/disable by command ID |
| 0x005e1619 | check_menu_item_by_id | FW | menu | 75 | 0x005E0000 | SK | Check/uncheck by command ID |
| 0x005e1664 | delete_menu_item_by_id | FW | menu | 42 | 0x005E0000 | SK | DeleteMenu by command ID |
| 0x005e168e | rename_menu_item_by_id | FW | menu | 50 | 0x005E0000 | SK | ModifyMenu to change item text by ID |
| 0x005e16c0 | noop_2 | FW | noop | 16 | 0x005E0000 | SK | Empty stub |
| 0x005e16d0 | noop_3 | FW | noop | 16 | 0x005E0000 | SK | Empty stub |
| 0x005e16e0 | build_menu_16E0 | FW | menu | 136 | 0x005E0000 | SK | Append to submenu with column break at 22 |
| 0x005e1768 | build_menu_1768 | FW | menu | 115 | 0x005E0000 | SK | Append to top-level with column break |
| 0x005e17db | delete_menu_item_by_id_2 | FW | menu | 42 | 0x005E0000 | SK | Duplicate of 005E1664 |
| 0x005e1805 | append_menu_separator | FW | menu | 111 | 0x005E0000 | SK | Append MF_SEPARATOR with column break |
| 0x005e1880 | set_window_data_and_wndproc | FW | wndproc | 55 | 0x005E0000 | SK | SetWindowLong: stores data + sets wndproc |
| 0x005e18b7 | set_timer | FW | timer | 39 | 0x005E0000 | SK | SetTimer wrapper |
| 0x005e18de | kill_timer | FW | timer | 33 | 0x005E0000 | SK | KillTimer wrapper |
| 0x005e18ff | avi_window_wndproc | FW | wndproc | 861 | 0x005E0000 | SK | WndProc for AVI window: WM_DESTROY, WM_SIZE, WM_PAINT (StretchBlt) |
| 0x005e1c70 | avi_render_current | FW | avi | 30 | 0x005E0000 | SK | Calls avi_render_frame on current AVI context |
| 0x005e1c8e | avi_open_file | FW | avi | 1631 | 0x005E0000 | SK | Opens AVI: AVIFileOpenA, gets streams, ICLocate, alloc frame buf |
| 0x005e22ed | avi_play | FW | avi | 543 | 0x005E0000 | SK | Starts AVI playback: sets compression, begins decompress, starts timer |
| 0x005e250c | ic_decompress_begin | FW | avi | 119 | 0x005E0000 | SK | ICSendMessage(ICM_DECOMPRESS_BEGIN) wrapper |
| 0x005e2583 | ic_decompress_query | FW | avi | 119 | 0x005E0000 | SK | ICSendMessage(ICM_DECOMPRESS_QUERY) wrapper |
| 0x005e25fa | avi_play_range | FW | avi | 123 | 0x005E0000 | SK | Sets play range and starts playback |
| 0x005e2675 | avi_stop | FW | avi | 129 | 0x005E0000 | SK | Stops AVI playback, clears playing flag |
| 0x005e26f6 | avi_rewind | FW | avi | 163 | 0x005E0000 | SK | Resets to first frame (AVIStreamStart) |
| 0x005e2799 | avi_close | FW | avi | 308 | 0x005E0000 | SK | Closes AVI: ICClose, AVIStreamRelease x2, AVIFileRelease, free buf |
| 0x005e28cd | avi_seek_frame | FW | avi | 202 | 0x005E0000 | SK | Seeks to keyframe, decompresses intermediate frames |
| 0x005e2997 | avi_decode_frame | FW | avi | 702 | 0x005E0000 | SK | Decodes one frame: AVIStreamRead + ICDecompressEx; loop/end handling |
| 0x005e2c5a | ic_decompress_ex | FW | avi | 119 | 0x005E0000 | SK | ICSendMessage(ICM_DECOMPRESS) wrapper |
| 0x005e2cd1 | avi_render_frame | FW | avi | 976 | 0x005E0000 | SK | Main render loop: time-syncs frames, skips to keyframes, displays |
| 0x005e30a1 | avi_update_palette | FW | avi | 529 | 0x005E0000 | SK | Updates palette from DIB color table |
| 0x005e32b2 | avi_set_display_mode | FW | avi | 666 | 0x005E0000 | SK | Configures display: compression flags, resizes output, blit rect |
| 0x005e3550 | avi_call_end_callback | FW | avi | 47 | 0x005E0000 | SK | Calls this+0x114 if non-null (end-of-playback) |
| 0x005e3580 | avi_call_frame_callback | FW | avi | 47 | 0x005E0000 | SK | Calls this+0x118 if non-null (frame-reached) |
| 0x005e35b0 | create_dib_8bit | FW | dib | 706 | 0x005E0000 | SK | Creates 8-bit paletted DIBSection; returns surface struct |
| 0x005e3877 | set_dib_orientation | FW | dib | 24 | 0x005E0000 | SK | Sets DAT_00638e18: -1=bottom-up, 1=top-down, 0=auto |
| 0x005e388f | destroy_dib_surface | FW | dib | 155 | 0x005E0000 | SK | Destroys DIB: SelectObject, DeleteObject, DeleteDC, free |
| 0x005e392a | get_surface_stride | FW | dib | 48 | 0x005E0000 | SK | Returns surface+0x20 (stride field) |
| 0x005e395a | check_topdown | FW | dib | 41 | 0x005E0000 | SK | Returns (surface+0x14 == 1) — top-down check |
| 0x005e3988 | flip_surface_vertical | FW | dib | 249 | 0x005E0000 | SK | Flips pixel data vertically (swaps top/bottom rows) |
| 0x005e3a81 | get_pixel_buffer | FW | dib | 39 | 0x005E0000 | SK | Returns surface+0x24 (pixel data pointer) |
| 0x005e3aa8 | return_zero | FW | noop | 35 | 0x005E0000 | SK | Always returns 0 |
| 0x005e3acb | read_dib_colortable | FW | dib | 129 | 0x005E0000 | SK | GetDIBColorTable → store per-entry |
| 0x005e3b4c | write_dib_colortable | FW | dib | 144 | 0x005E0000 | SK | Read palette → SetDIBColorTable |
| 0x005e3bdc | write_full_colortable | FW | dib | 39 | 0x005E0000 | SK | Wrapper: write_dib_colortable(0, 256) |
| 0x005e3c03 | set_dib_palette_from_hpal | FW | dib | 177 | 0x005E0000 | SK | HPALETTE → RGBQUAD → SetDIBColorTable |
| 0x005e3cb4 | draw_string_palette | FW | gdi_text | 534 | 0x005E0000 | SK | Text on DIB using palette color, alignment flags |
| 0x005e3eca | draw_string_in_rect_palette | FW | gdi_text | 289 | 0x005E0000 | SK | DrawText in clipping rect, palette color |
| 0x005e3feb | draw_text_wrapped_palette | FW | gdi_text | 272 | 0x005E0000 | SK | DrawText with DT_WORDBREAK, palette color |
| 0x005e40fb | draw_line_palette | FW | gdi_text | 191 | 0x005E0000 | SK | Line via CreatePen + LineTo, palette color |
| 0x005e41ba | create_dib_16bit | FW | dib | 518 | 0x005E0000 | SK | Creates 16-bit (5-5-5) DIBSection with BI_BITFIELDS |
| 0x005e43c5 | create_dib_24bit | FW | dib | 491 | 0x005E0000 | SK | Creates 24-bit DIBSection |
| 0x005e45b5 | create_dib_32bit | FW | dib | 491 | 0x005E0000 | SK | Creates 32-bit DIBSection |
| 0x005e47a5 | draw_string_rgb | FW | gdi_text | 507 | 0x005E0000 | SK | Text with explicit RGB color |
| 0x005e49a0 | draw_string_in_rect_rgb | FW | gdi_text | 262 | 0x005E0000 | SK | DrawText in rect with RGB |
| 0x005e4aa6 | draw_text_wrapped_rgb | FW | gdi_text | 245 | 0x005E0000 | SK | DrawText wrapped with RGB |
| 0x005e4b9b | draw_line_rgb | FW | gdi_text | 164 | 0x005E0000 | SK | Line with explicit RGB via CreatePen |
| 0x005e4c3f | fill_rect_rgb | FW | gdi_text | 137 | 0x005E0000 | SK | FillRect with RGB via CreateSolidBrush |
| 0x005e4cc8 | test_pixel_bit | FW | gdi_text | 141 | 0x005E0000 | SK | Color-to-index probe: reads pixel at (0,0) |
| 0x005e4d60 | decompress_lzw | FW | lzw | 250 | 0x005E0000 | SK | Allocates 0x6000-byte LZW table, calls lzw_decode_core, frees |
| 0x005e4e60 | fill_rect_8bit | FW | pixel | 152 | 0x005E0000 | SK | Fills rectangular region of 8-bit surface with solid color |
| 0x005e4ef8 | fill_rect_16bit | FW | pixel | 163 | 0x005E0000 | SK | Fills 16-bit surface rect with RGB555 |
| 0x005e4f9b | copy_rect_8bit | FW | pixel | 187 | 0x005E0000 | SK | Copies rect between 8-bit surfaces (memcpy per row) |
| 0x005e5056 | copy_rect_16bit | FW | pixel | 198 | 0x005E0000 | SK | Copies rect between 16-bit surfaces |
| 0x005e511c | transpose_pixels | FW | pixel | 114 | 0x005E0000 | SK | Transposes pixel data (90-degree rotation) |
| 0x005e518e | pixel_copy | FW | pixel | 305 | 0x005E0000 | SK | Core sprite blit inner loop: non-transparent pixel copy with scaling |
| 0x005e52bf | pixel_fill | FW | pixel | 308 | 0x005E0000 | SK | Core dimmed blit: replaces non-transparent with fill color (0x1a) |
| 0x005e53f3 | lzw_decode_core | FW | lzw | 1142 | 0x005E0000 | SK | Full GIF LZW decoder: variable code size, clear/end, dictionary chain |
| 0x005e5869 | fill_scanline_8bit | FW | pixel | 126 | 0x005E0000 | SK | Fills single horizontal scanline |
| 0x005e58e7 | fill_column_8bit | FW | pixel | 83 | 0x005E0000 | SK | Fills single vertical column |
| 0x005e593a | copy_with_brightness_topdown | FW | pixel | 121 | 0x005E0000 | SK | Copy block adding brightness offset, top-down |
| 0x005e59b3 | copy_with_brightness_bottomup | FW | pixel | 134 | 0x005E0000 | SK | Same but bottom-up |
| 0x005e5a39 | rle_decode_with_brightness_td | FW | pixel | 229 | 0x005E0000 | SK | RLE-compressed copy with brightness, top-down |
| 0x005e5b1e | rle_decode_with_brightness_bu | FW | pixel | 242 | 0x005E0000 | SK | RLE-compressed copy with brightness, bottom-up |
| 0x005e5c10 | rle16_decode_with_brightness_td | FW | pixel | 319 | 0x005E0000 | SK | 16-bit RLE decode with brightness, top-down |
| 0x005e5d4f | rle16_decode_with_brightness_bu | FW | pixel | 332 | 0x005E0000 | SK | 16-bit RLE decode with brightness, bottom-up |
| 0x005e5ea0 | surface_init | FW | surface | 64 | 0x005E0000 | SK | Constructor: zeroes fields, calls set_dimensions(0) |
| 0x005e5ee0 | surface_dtor_empty | FW | surface | 22 | 0x005E0000 | SK | Empty destructor |
| 0x005e5ef6 | surface_release | FW | surface | 130 | 0x005E0000 | SK | Releases surface: destroy if owned, free row ptrs |
| 0x005e5f78 | surface_create_wh | FW | surface | 60 | 0x005E0000 | SK | Create from width/height |
| 0x005e5fb4 | surface_create_rect | FW | surface | 38 | 0x005E0000 | SK | Create from rect pointer |
| 0x005e5fda | surface_create_wh_ex | FW | surface | 62 | 0x005E0000 | SK | Create with extra param (color depth) |
| 0x005e6018 | surface_allocate | FW | surface | 368 | 0x005E0000 | SK | Core alloc: creates DIB, calcs stride, builds row ptr LUT |
| 0x005e6188 | lock_surface | FW | surface | 97 | 0x005E0000 | SK | Lock for pixel access; handles shared surfaces |
| 0x005e61e9 | surface_wait_lock | FW | surface | 92 | 0x005E0000 | SK | Wait for lock; recurse for shared, call lock+notify |
| 0x005e6245 | rgb_to_565 | FW | surface | 39 | 0x005E0000 | SK | RGB → 16-bit RGB565 |
| 0x005e626c | rgb_to_555 | FW | surface | 43 | 0x005E0000 | SK | RGB → 16-bit RGB555 |
| 0x005e6297 | surface_attach | FW | surface | 200 | 0x005E0000 | SK | Attach to existing surface (shared/external) |
| 0x005e635f | surface_wrap_external | FW | surface | 241 | 0x005E0000 | SK | Wrap external pixel buffer as surface (no ownership) |
| 0x005e6450 | surface_set_dimensions | FW | surface | 278 | 0x005E0000 | SK | Set width/height/clipping from rect |
| 0x005e6566 | surface_create_wrapper | FW | surface | 36 | 0x005E0000 | SK | Wrapper for surface_create_rect |
| 0x005e658a | surface_get_pixel | FW | surface | 103 | 0x005E0000 | SK | Get pixel value at (x,y) |
| 0x005e65f1 | surface_set_pixel | FW | surface | 96 | 0x005E0000 | SK | Set pixel value at (x,y) |
| 0x005e6651 | load_bitmap_resource | FW | resource | 578 | 0x005E0000 | SK | Loads BMP resource: validates 8bpp, copies palette+pixels |
| 0x005e6893 | load_gif_resource | FW | resource | 818 | 0x005E0000 | SK | Loads GIF resource: validates header, color table, LZW decompress |
| 0x005e6bc5 | load_cvpic_resource | FW | resource | 391 | 0x005E0000 | SK | Loads CvPic ("CvPc") resource with LZW decompression |
| 0x005e6d4c | load_bitmap_resource_16bit | FW | resource | 453 | 0x005E0000 | SK | Loads BMP to 16-bit surface (supports 16/24/32bpp source) |
| 0x005e6f25 | surface_get_width | FW | surface | 50 | 0x005E0000 | SK | Returns this->field_8 (width) |
| 0x005e6f57 | surface_get_clip_rect | FW | surface | 63 | 0x005E0000 | SK | Copies clipping rect (this+0x20) to output |
| 0x005e6f96 | surface_set_clip_rect | FW | surface | 91 | 0x005E0000 | SK | Sets clipping rect within surface bounds |
| 0x005e6ff1 | surface_get_height | FW | surface | 55 | 0x005E0000 | SK | Returns this->field_4 (height) |
| 0x005e7028 | surface_get_row_ptr | FW | surface | 42 | 0x005E0000 | SK | Returns pixel address: lockData+row_offset+x |
| 0x005e7052 | surface_calc_blit_params | FW | surface | 133 | 0x005E0000 | SK | Calculates clipped blit rectangle params |
| 0x005e70d7 | surface_get_field_34 | FW | surface | 43 | 0x005E0000 | SK | Returns this->field_0x34 |
| 0x005e7102 | surface_blit_to_dc | FW | blit | 308 | 0x005E0000 | SK | BitBlt from surface DC to window DC |
| 0x005e7257 | surface_set_callback | FW | surface | 51 | 0x005E0000 | SK | Sets this->field_0x10 = callback fn ptr |
| 0x005e728a | surface_stretchblit_to_dc | FW | blit | 198 | 0x005E0000 | SK | StretchBlt from surface DC to window DC |
| 0x005e7355 | surface_copy_rect | FW | blit | 290 | 0x005E0000 | SK | Copies rect between 8-bit surfaces |
| 0x005e747c | surface_fill_rect_idx | FW | blit | 76 | 0x005E0000 | SK | Fills rect with palette index color |
| 0x005e74c8 | surface_copy_rect_16bit | FW | blit | 198 | 0x005E0000 | SK | Copies rect between 16-bit surfaces |
| 0x005e7593 | surface_fill_rect_rgb16 | FW | blit | 76 | 0x005E0000 | SK | Fills rect with RGB on 16-bit surface |
| 0x005e75df | surface_blit_rle | FW | blit | 254 | 0x005E0000 | SK | RLE blit to 8-bit surface with brightness |
| 0x005e76dd | surface_blit_rle_16bit | FW | blit | 272 | 0x005E0000 | SK | RLE blit to 16-bit surface with brightness |
| 0x005e77ed | surface_copy_with_brightness | FW | blit | 217 | 0x005E0000 | SK | Copy with brightness offset (8-bit) |
| 0x005e78c6 | surface_copy_brightness_16bit | FW | blit | 235 | 0x005E0000 | SK | Copy with brightness offset (16-bit) |
| 0x005e79b1 | surface_fill_scanline | FW | blit | 127 | 0x005E0000 | SK | Fills one scanline on surface |
| 0x005e7a30 | surface_fill_column | FW | blit | 94 | 0x005E0000 | SK | Fills one column on surface |
| 0x005e7a8e | surface_scale_blit | FW | blit | 266 | 0x005E0000 | SK | Scaled blit using scale lookup table |
| 0x005e7b98 | surface_blit_to_dc_scaled | FW | blit | 284 | 0x005E0000 | SK | BitBlt with scaling from surface to window DC |
| 0x005e7cb4 | surface_blit_to_dc_2 | FW | blit | 229 | 0x005E0000 | SK | BitBlt variant (different param handling) |
| 0x005e7d99 | surface_stretchblit_to_dc_2 | FW | blit | 247 | 0x005E0000 | SK | StretchBlt variant |
| 0x005e7e90 | surface_save_to_clipboard | FW | blit | 139 | 0x005E0000 | SK | Copy surface region to clipboard via BitBlt |
| 0x005e7f1b | dc_draw_string_palette | FW | gdi_text | 106 | 0x005E0000 | SK | Text to HDC using palette color |
| 0x005e7f85 | dc_draw_string_rgb_full | FW | gdi_text | 232 | 0x005E0000 | SK | Text to DC using DAT_006e5224-6 color globals |
| 0x005e806d | dc_draw_string_in_rect_rgb | FW | gdi_text | 181 | 0x005E0000 | SK | DrawText to DC with global RGB |
| 0x005e8122 | dc_draw_text_wrapped | FW | gdi_text | 244 | 0x005E0000 | SK | DrawText wrapped to DC with global RGB |
| 0x005e8216 | dc_draw_line_rgb | FW | gdi_text | 229 | 0x005E0000 | SK | Line to DC with global RGB |
| 0x005e82fb | CReObject_ctor | FW | mfc | 64 | 0x005E0000 | SK | CReObject constructor |
| 0x005e833b | obj_load_bitmap | FW | mfc | 141 | 0x005E0000 | SK | Loads bitmap into object field |
| 0x005e83c8 | obj_destroy | FW | mfc | 57 | 0x005E0000 | SK | Destroys object bitmap |
| 0x005e8401 | obj_blit_bitmap | FW | mfc | 619 | 0x005E0000 | SK | Blits object bitmap to target with alignment |
| 0x005e866c | measure_text_multiline | FW | gdi_text | 134 | 0x005E0000 | SK | Measures multi-line text ('_' delimited) |
| 0x005e86f2 | surface_palette_sync | FW | surface | 71 | 0x005E0000 | SK | Syncs palette range to surface DIB color table |
| 0x005e8739 | surface_palette_from_hpal | FW | surface | 105 | 0x005E0000 | SK | Sets surface palette from HPALETTE |
| 0x005e87a2 | surface_save_bmp | FW | surface | 484 | 0x005E0000 | SK | Saves surface to BMP file (8-bit, with palette) |
| 0x005e8990 | palette_set_range | FW | surface | 50 | 0x005E0000 | SK | Palette set for range of entries |
| 0x005e89d0 | register_wndclass | FW | wndproc | 308 | 0x005E0000 | SK | RegisterClass for child window with custom WndProc |
| 0x005e8b04 | child_window_create | FW | wndproc | 80 | 0x005E0000 | SK | Creates child window |
| 0x005e8b54 | child_window_wndproc | FW | wndproc | 213 | 0x005E0000 | SK | WndProc for child windows (WM_PAINT, WM_SIZE) |
| 0x005e8c29 | child_window_close | FW | surface | 43 | 0x005E0000 | SK | Destroys child window |
| 0x005e8c54 | surface_create_from_hwnd | FW | surface | 260 | 0x005E0000 | SK | Creates surface from HWND bounds |
| 0x005e8d58 | surface_blit_to_hwnd | FW | surface | 174 | 0x005E0000 | SK | BitBlt surface to HWND DC |
| 0x005e8e06 | surface_create_compat | FW | surface | 73 | 0x005E0000 | SK | Creates compatible surface |
| 0x005e8e4f | surface_destroy_compat | FW | surface | 97 | 0x005E0000 | SK | Destroys compatible surface |
| 0x005e8eb0 | surface_alloc_ddraw | FW | surface | 155 | 0x005E0000 | SK | Allocates DDraw surface or falls back to DIB |
| 0x005e8f4b | surface_try_ddraw | FW | surface | 108 | 0x005E0000 | SK | Attempts DDraw surface creation via vtable |
| 0x005e8fb7 | surface_alloc_from_rect | FW | surface | 180 | 0x005E0000 | SK | Alloc from rect: tries DDraw first, falls back to DIB |
| 0x005e906b | surface_destroy | FW | surface | 38 | 0x005E0000 | SK | Destroys surface (DDraw or DIB) |
| 0x005e9091 | surface_lock_ddraw | FW | surface | 122 | 0x005E0000 | SK | Locks DDraw surface or returns DIB pixel buffer |
| 0x005e910b | surface_get_stride_val | FW | surface | 69 | 0x005E0000 | SK | Returns stride from DDraw lock or DIB info |
| 0x005e9150 | surface_get_colordepth | FW | surface | 249 | 0x005E0000 | SK | Returns color depth: 1=8bit, 2=16bit, etc. |
| 0x005e924e | surface_try_lock | FW | surface | 123 | 0x005E0000 | SK | Attempts lock; returns lock data or 0 |
| 0x005e92c9 | surface_unlock | FW | surface | 52 | 0x005E0000 | SK | Unlocks DDraw surface |
| 0x005e92fd | surface_unlock_2 | FW | surface | 52 | 0x005E0000 | SK | Alternate unlock path |
| 0x005e9331 | surface_blit_gdi | FW | blit | 292 | 0x005E0000 | SK | GDI BitBlt between surface DCs |
| 0x005e9455 | surface_stretchblit_gdi | FW | blit | 167 | 0x005E0000 | SK | GDI StretchBlt between surface DCs |
| 0x005e9506 | surface_blit_gdi_2 | FW | blit | 148 | 0x005E0000 | SK | GDI blit variant 2 |
| 0x005e95a4 | surface_stretchblit_gdi_2 | FW | blit | 174 | 0x005E0000 | SK | GDI StretchBlt variant 2 |
| 0x005e965c | surface_blit_gdi_3 | FW | blit | 152 | 0x005E0000 | SK | GDI blit variant 3 |
| 0x005e96fe | surface_blit_transparent_gdi | FW | blit | 123 | 0x005E0000 | SK | GDI TransparentBlt |
| 0x005e9783 | surface_set_palette | FW | surface | 171 | 0x005E0000 | SK | Sets surface palette from palette object |
| 0x005e9838 | blit_dc_to_dc | FW | blit | 130 | 0x005E0000 | SK | BitBlt wrapper |
| 0x005e98ba | stretch_blit_dc_to_dc | FW | blit | 138 | 0x005E0000 | SK | StretchBlt wrapper |
| 0x005e9944 | render_surface_blit | FW | blit | 56 | 0x005E0000 | SK | Render one surface to another |
| 0x005e997c | surface_blit_complex | FW | blit | 598 | 0x005E0000 | SK | Complex multi-surface blit with clipping |
| 0x005e9bd7 | surface_stretchblit_complex | FW | blit | 341 | 0x005E0000 | SK | Complex stretch blit |
| 0x005e9d31 | surface_blit_complex_2 | FW | blit | 337 | 0x005E0000 | SK | Another complex blit variant |
| 0x005e9e87 | surface_stretchblit_complex_2 | FW | blit | 254 | 0x005E0000 | SK | Another complex stretch blit |
| 0x005e9f8a | surface_blit_with_colortable | FW | blit | 590 | 0x005E0000 | SK | Blit with color table transformation |
| 0x005ea1dd | surface_blit_transformed | FW | blit | 333 | 0x005E0000 | SK | Transformed blit |
| 0x005ea32f | surface_blit_transformed_2 | FW | blit | 329 | 0x005E0000 | SK | Transformed blit variant |
| 0x005ea47d | surface_blit_masked | FW | blit | 246 | 0x005E0000 | SK | Masked blit |
| 0x005ea578 | ddraw_create_surface | FW | ddraw | 72 | 0x005E0000 | SK | Creates DDraw surface via DAT_006394c0 vtable+0x14 |
| 0x005ea5c5 | ddraw_check_surface_lost | FW | ddraw | 70 | 0x005E0000 | SK | Checks if DD surface is lost via vtable+0x60 |
| 0x005ea610 | ddraw_flip_surface | FW | ddraw | 103 | 0x005E0000 | SK | Flips DD surface: 0=no wait, 1=wait |
| 0x005ea677 | ddraw_get_scan_line | FW | ddraw | 77 | 0x005E0000 | SK | Gets current scan line via vtable+0x44 |
| 0x005ea6c4 | ddraw_get_surface_desc | FW | ddraw | 77 | 0x005E0000 | SK | Gets surface desc via vtable+0x40 |
| 0x005ea711 | ddraw_get_monitor_freq | FW | ddraw | 104 | 0x005E0000 | SK | Gets monitor frequency via vtable+0x3c |
| 0x005ea779 | noop_dd | FW | ddraw | 34 | 0x005E0000 | SK | Empty stub |
| 0x005ea7a0 | set_dialog_wndproc | FW | ddraw | 55 | 0x005E0000 | SK | SetWindowLong: GWL_USERDATA + GWL_WNDPROC |
| 0x005ea7d7 | find_control_by_type | FW | ddraw | 78 | 0x005E0000 | SK | Walks linked list to find control by type |
| 0x005ea825 | get_next_window | FW | ddraw | 87 | 0x005E0000 | SK | GetWindow(GW_HWNDNEXT), wraps to HWNDFIRST |
| 0x005ea87c | get_prev_window | FW | ddraw | 87 | 0x005E0000 | SK | GetWindow(GW_HWNDPREV), wraps to HWNDLAST |
| 0x005ea8d3 | tab_navigate | FW | ddraw | 756 | 0x005E0000 | SK | Tab-order focus: walks children, checks visibility/tab-stop |
| 0x005eabcc | tab_key_handler | FW | input | 161 | 0x005E0000 | SK | Handles Tab key: determines direction, calls tab_navigate |
| 0x005eac6d | find_scrollbar_control | FW | surface | 83 | 0x005E0000 | SK | Walks control list to find scrollbar (type 0xb) |
| 0x005eacc0 | dialog_wndproc | FW | wndproc | 1566 | 0x005E0000 | SK | Main dialog WndProc: Tab nav, Enter/Esc, mouse/kbd dispatch, scroll |
| 0x005eb2f0 | dd_blt_wrapper | FW | ddraw | 51 | 0x005E0000 | SK | DirectDraw Blt wrapper |
| 0x005eb330 | dd_bltfast_wrapper | FW | ddraw | 51 | 0x005E0000 | SK | DirectDraw BltFast wrapper |
| 0x005eb370 | dd_getdc_wrapper | FW | ddraw | 35 | 0x005E0000 | SK | DirectDraw GetDC wrapper |
| 0x005eb393 | dd_releasedc_wrapper | FW | ddraw | 55 | 0x005E0000 | SK | DirectDraw ReleaseDC wrapper |
| 0x005eb3ca | dd_getpixelformat | FW | ddraw | 35 | 0x005E0000 | SK | GetPixelFormat wrapper |
| 0x005eb3ed | translate_vkey | FW | input | 90 | 0x005E0000 | SK | Translates Win32 VK code to internal key code |
| 0x005eb447 | child_dialog_wndproc | FW | wndproc | 3277 | 0x005E0000 | SK | Child dialog WndProc: WM_PAINT, WM_SIZE, WM_ACTIVATE, scroll, MCI |
| 0x005ec1a1 | handle_menu_command | FW | menu | 153 | 0x005E0000 | SK | Processes menu command, translates to position |
| 0x005ec23a | find_menu_item_position | FW | menu | 221 | 0x005E0000 | SK | Recursive search for command ID in menu tree |
| 0x005ec317 | scrollable_wndproc | FW | wndproc | 2883 | 0x005E0000 | SK | Scrollable panel WndProc: HSCROLL/VSCROLL, mouse, SYSCOMMAND |
| 0x005eceda | noop_event | FW | input | 16 | 0x005E0000 | SK | Empty event stub |
| 0x005ecef0 | is_shift_pressed | FW | input | 48 | 0x005E0000 | SK | GetKeyState(VK_SHIFT) & 0x8000 |
| 0x005ecf20 | is_ctrl_pressed | FW | input | 48 | 0x005E0000 | SK | GetKeyState(VK_CONTROL) & 0x8000 |
| 0x005ecf50 | dispatch_mouse_move | FW | input | 52 | 0x005E0000 | SK | Calls handler[0](x,y) |
| 0x005ecf90 | dispatch_lbutton_down | FW | input | 54 | 0x005E0000 | SK | Calls handler[1](x,y) |
| 0x005ecfd0 | dispatch_lbutton_up | FW | input | 54 | 0x005E0000 | SK | Calls handler[2](x,y) |
| 0x005ed010 | dispatch_lclick | FW | input | 54 | 0x005E0000 | SK | Calls handler[3](x,y) |
| 0x005ed050 | dispatch_rbutton_down | FW | input | 54 | 0x005E0000 | SK | Calls handler[4](x,y) |
| 0x005ed090 | dispatch_rbutton_up | FW | input | 54 | 0x005E0000 | SK | Calls handler[5](x,y) |
| 0x005ed0d0 | dispatch_rclick | FW | input | 54 | 0x005E0000 | SK | Calls handler[6](x,y) |
| 0x005ed110 | dispatch_ldblclick | FW | input | 54 | 0x005E0000 | SK | Calls handler[7](x,y) |
| 0x005ed150 | dispatch_key_down | FW | input | 50 | 0x005E0000 | SK | Calls handler[8](key) |
| 0x005ed190 | dispatch_key_up | FW | input | 50 | 0x005E0000 | SK | Calls handler[9](key) |
| 0x005ed1d0 | dispatch_key_repeat | FW | input | 50 | 0x005E0000 | SK | Calls handler[10](key) |
| 0x005ed210 | dispatch_char | FW | input | 50 | 0x005E0000 | SK | Calls handler[11](char) |
| 0x005ed250 | dispatch_close | FW | input | 48 | 0x005E0000 | SK | Calls handler[12]() — returns nonzero to cancel |
| 0x005ed290 | dispatch_minimize | FW | input | 41 | 0x005E0000 | SK | Calls handler[13]() |
| 0x005ed2c0 | dispatch_restore | FW | input | 41 | 0x005E0000 | SK | Calls handler[14]() |
| 0x005ed2f0 | dispatch_move | FW | input | 41 | 0x005E0000 | SK | Calls handler[15]() |
| 0x005ed320 | dispatch_activate | FW | input | 50 | 0x005E0000 | SK | Calls handler[16](active) |
| 0x005ed360 | dispatch_scroll_move | FW | input | 54 | 0x005E0000 | SK | Calls handler[17](x,y) |
| 0x005ed3a0 | dispatch_notify | FW | input | 50 | 0x005E0000 | SK | Calls handler[18](data) |
| 0x005ed3e0 | dispatch_hscroll | FW | input | 50 | 0x005E0000 | SK | Calls handler[19](pos) |
| 0x005ed420 | dispatch_hscroll_track | FW | input | 50 | 0x005E0000 | SK | Calls handler[20](pos) |
| 0x005ed460 | dispatch_vscroll | FW | input | 50 | 0x005E0000 | SK | Calls handler[21](pos) |
| 0x005ed4a0 | dispatch_vscroll_track | FW | input | 50 | 0x005E0000 | SK | Calls handler[22](pos) |
| 0x005ed4e0 | dispatch_idle | FW | input | 50 | 0x005E0000 | SK | Calls handler[23](data) |
| 0x005ed520 | dispatch_resize | FW | input | 41 | 0x005E0000 | SK | Calls handler[24]() |
| 0x005ed550 | dispatch_event_25 | FW | input | 41 | 0x005E0000 | SK | Calls handler[25]() |
| 0x005ed580 | get_event_handler_base | FW | input | 24 | 0x005E0000 | SK | Returns event handler base pointer |
| 0x005ed5a0 | hotkey_register | FW | hotkey | 69 | 0x005E0000 | SK | Registers hotkey mapping (key → menu position) |
| 0x005ed5f0 | hotkey_lookup | FW | hotkey | 65 | 0x005E0000 | SK | Looks up registered hotkey |
| 0x005ed640 | isTracking_scrollbar_h | FW | scrollbar | 31 | 0x005E0000 | SK | Returns scroll position value (Ghidra FID misid) |
| 0x005ed660 | isTracking_scrollbar_v | FW | scrollbar | 31 | 0x005E0000 | SK | Returns scroll position value |
| 0x005ed680 | isTracking_page_h | FW | scrollbar | 31 | 0x005E0000 | SK | Returns page size value |
| 0x005ed6a0 | isTracking_page_v | FW | scrollbar | 31 | 0x005E0000 | SK | Returns page size value |
| 0x005ed6c0 | isTracking_scroll_range | FW | scrollbar | 31 | 0x005E0000 | SK | Returns scroll range value |
| 0x005ed6e0 | scrollbar_init | FW | scrollbar | 47 | 0x005E0000 | SK | Initializes scrollbar with default range/page/pos |
| 0x005ed710 | scrollbar_setup | FW | scrollbar | 517 | 0x005E0000 | SK | Full scrollbar init: SetScrollRange, SetScrollPos, ShowScrollBar |
| 0x005ed920 | mci_open_waveform | FW | mci_audio | 325 | 0x005E0000 | SK | Opens MCI waveform device for audio |
| 0x005eda65 | mci_play | FW | mci_audio | 176 | 0x005E0000 | SK | Starts MCI playback with MCI_NOTIFY |
| 0x005edb15 | mci_play_range | FW | mci_audio | 157 | 0x005E0000 | SK | MCI play with from/to position |
| 0x005edbb2 | mci_stop | FW | mci_audio | 39 | 0x005E0000 | SK | MCI_STOP command |
| 0x005edc6c | mci_close | FW | mci_audio | 64 | 0x005E0000 | SK | MCI_CLOSE + cleanup |
| 0x005edcac | mci_set_window | FW | mci_audio | 80 | 0x005E0000 | SK | Associates MCI device with window |
| 0x005edd00 | mci_pause | FW | mci_audio | 43 | 0x005E0000 | SK | MCI_PAUSE command |
| 0x005edd2b | mci_resume | FW | mci_audio | 127 | 0x005E0000 | SK | MCI_RESUME / re-play |
| 0x005eddaa | mci_get_position | FW | mci_audio | 33 | 0x005E0000 | SK | MCI_STATUS_POSITION query |
| 0x005eddd0 | mci_seek | FW | mci_audio | 107 | 0x005E0000 | SK | MCI_SEEK to position |
| 0x005ede3b | mci_get_length | FW | mci_audio | 89 | 0x005E0000 | SK | MCI_STATUS_LENGTH query |
| 0x005ede94 | mci_check_mode | FW | mci_audio | 43 | 0x005E0000 | SK | MCI_STATUS_MODE query |
| 0x005edebf | mci_open_midi | FW | mci_audio | 270 | 0x005E0000 | SK | Opens MCI MIDI sequencer device |
| 0x005edfcd | midi_set_tempo | FW | mci_audio | 53 | 0x005E0000 | SK | Sets MIDI tempo via MCI_SET |
| 0x005ee002 | midi_play_ex | FW | mci_audio | 74 | 0x005E0000 | SK | MIDI play with range |
| 0x005ee04c | midi_stop | FW | mci_audio | 60 | 0x005E0000 | SK | Stops + seeks to start |
| 0x005ee088 | midi_close | FW | mci_audio | 41 | 0x005E0000 | SK | Closes MIDI device |
| 0x005ee0b1 | cdaudio_open_and_play | FW | cdaudio | 927 | 0x005E0000 | SK | Opens CD audio, reads TOC, plays track |
| 0x005ee450 | cdaudio_play_track | FW | cdaudio | 74 | 0x005E0000 | SK | Plays specific CD audio track |
| 0x005ee49a | cdaudio_stop | FW | cdaudio | 99 | 0x005E0000 | SK | Stops CD audio |
| 0x005ee4fd | cdaudio_close | FW | cdaudio | 43 | 0x005E0000 | SK | Closes CD audio device |
| 0x005ee528 | cdaudio_get_status | FW | cdaudio | 49 | 0x005E0000 | SK | Gets playback status |
| 0x005ee559 | cdaudio_get_track_count | FW | cdaudio | 56 | 0x005E0000 | SK | Gets number of CD tracks |
| 0x005ee591 | cdaudio_play_range | FW | cdaudio | 288 | 0x005E0000 | SK | CD audio play with range (from/to tracks) |
| 0x005ee6b1 | cdaudio_get_position | FW | cdaudio | 50 | 0x005E0000 | SK | Gets current position |
| 0x005ee6e3 | mixer_set_volume | FW | mixer | 116 | 0x005E0000 | SK | Sets wave audio volume (waveOutSetVolume) |
| 0x005ee757 | mixer_get_volume | FW | mixer | 90 | 0x005E0000 | SK | Gets wave audio volume |
| 0x005ee7b1 | mixer_set_cd_volume | FW | mixer | 116 | 0x005E0000 | SK | Sets CD audio volume |
| 0x005ee825 | mixer_get_cd_volume | FW | mixer | 90 | 0x005E0000 | SK | Gets CD audio volume |
| 0x005ee87f | mixer_set_midi_volume | FW | mixer | 71 | 0x005E0000 | SK | Sets MIDI volume via midiOutSetVolume |
| 0x005ee8c6 | timer_callback_1 | FW | timer | 43 | 0x005E0000 | SK | Timer callback wrapper |
| 0x005ee8f1 | timer_callback_2 | FW | timer | 43 | 0x005E0000 | SK | Timer callback wrapper |
| 0x005ee91c | timer_callback_3 | FW | timer | 47 | 0x005E0000 | SK | Timer callback wrapper |
| 0x005ee94b | timer_set_callback | FW | timer | 70 | 0x005E0000 | SK | Sets up multimedia timer callback |
| 0x005ee991 | timer_kill_1 | FW | timer | 43 | 0x005E0000 | SK | Kills timer 1 |
| 0x005ee9bc | timer_kill_2 | FW | timer | 43 | 0x005E0000 | SK | Kills timer 2 |
| 0x005ee9e7 | timer_kill_3 | FW | timer | 43 | 0x005E0000 | SK | Kills timer 3 |
| 0x005eea12 | get_tick_count | FW | timer | 40 | 0x005E0000 | SK | timeGetTime wrapper |
| 0x005eea3a | joystick_read | FW | joystick | 163 | 0x005E0000 | SK | Reads joystick via joyGetPos |
| 0x005eeadd | joystick_get_x | FW | joystick | 52 | 0x005E0000 | SK | Returns joystick X |
| 0x005eeb11 | joystick_get_y | FW | joystick | 52 | 0x005E0000 | SK | Returns joystick Y |
| 0x005eeb45 | joystick_get_button | FW | joystick | 57 | 0x005E0000 | SK | Returns button state |
| 0x005eeb7e | joystick_check_present | FW | joystick | 36 | 0x005E0000 | SK | joyGetNumDevs > 0 |
| 0x005eeba2 | joystick_get_z | FW | joystick | 52 | 0x005E0000 | SK | Returns joystick Z |
| 0x005eebd6 | joystick_read_ex | FW | joystick | 159 | 0x005E0000 | SK | Extended joystick read via joyGetPosEx |
| 0x005eec80 | audio_get_field | FW | wave_audio | 31 | 0x005E0000 | SK | Returns audio object field (Ghidra FID misid as IsTracking) |
| 0x005eeca0 | audio_init | FW | wave_audio | 35 | 0x005E0000 | SK | Initializes audio state fields |
| 0x005eecc3 | audio_open_device | FW | wave_audio | 88 | 0x005E0000 | SK | Opens waveOut audio device |
| 0x005eed1b | audio_close_device | FW | wave_audio | 40 | 0x005E0000 | SK | Closes waveOut device |
| 0x005eed43 | audio_check_playing | FW | wave_audio | 51 | 0x005E0000 | SK | Checks if audio still playing |
| 0x005eed76 | audio_prepare_header | FW | wave_audio | 91 | 0x005E0000 | SK | Prepares wave header for playback |
| 0x005eedd1 | audio_get_position | FW | wave_audio | 27 | 0x005E0000 | SK | Gets playback position |
| 0x005eedec | audio_start_playback | FW | wave_audio | 99 | 0x005E0000 | SK | Starts audio with range |
| 0x005eee4f | audio_reset | FW | wave_audio | 30 | 0x005E0000 | SK | Resets audio device |
| 0x005eee6d | audio_stub_1 | FW | wave_audio | 25 | 0x005E0000 | SK | Returns 0 |
| 0x005eee86 | audio_stub_2 | FW | wave_audio | 22 | 0x005E0000 | SK | Empty stub |
| 0x005eeeb0 | show_msgbox_titled | FW | msgbox | 402 | 0x005E0000 | SK | MessageBoxA with "Potentially fatal error" title |
| 0x005ef0b9 | show_msgbox_custom_title | FW | msgbox | 401 | 0x005E0000 | SK | MessageBoxA with custom title |
| 0x005ef320 | ddwin_set_class_data | FW | ddwin | 54 | 0x005E0000 | SK | SetClassLong for wndproc + user data |
| 0x005ef356 | ddwin_create | FW | ddwin | 200 | 0x005E0000 | SK | Creates hidden "MSDirectWindow", returns window struct |
| 0x005ef41e | ddraw_set_coop_level | FW | ddwin | 192 | 0x005E0000 | SK | Sets DDraw cooperative level (0=normal, 1=fs, 2=exclusive) |
| 0x005ef4e3 | ddraw_set_display_mode | FW | ddwin | 171 | 0x005E0000 | SK | Sets display mode (resolution+bpp) via DDraw |
| 0x005ef58e | ddraw_restore_mode | FW | ddwin | 77 | 0x005E0000 | SK | Restores original display mode |
| 0x005ef5db | ddwin_destroy | FW | ddwin | 127 | 0x005E0000 | SK | Destroys DDraw window: SW_HIDE, DestroyWindow, free |
| 0x005ef65a | ddwin_show | FW | ddwin | 63 | 0x005E0000 | SK | ShowWindow(SW_SHOW) + UpdateWindow |
| 0x005ef699 | ddwin_hide | FW | ddwin | 50 | 0x005E0000 | SK | ShowWindow(SW_HIDE) |
| 0x005ef6cb | ddwin_wndproc | FW | ddwin | 1456 | 0x005E0000 | SK | WndProc for DDraw window: destroy, size, close, mouse, kbd, joystick |
| 0x005efca3 | ddraw_enum_callback | FW | ddwin | 59 | 0x005E0000 | SK | DDraw enumeration callback |
| 0x005efcde | ddraw_enum_modes | FW | ddwin | 133 | 0x005E0000 | SK | Enumerates display modes via DDraw vtable+0x20 |
| 0x005efd70 | ddwin_call_activate_cb | FW | ddwin | 56 | 0x005E0000 | SK | Calls activate callback at this+0xbc |
| 0x005efdc0 | ddwin_obj_ctor | FW | ddwin | 194 | 0x005E0000 | SK | DDraw window object constructor |
| 0x005efeb0 | ddwin_obj_dtor | FW | ddwin | 123 | 0x005E0000 | SK | DDraw window object destructor |
| 0x005eff2b | ddwin_dtor_thunk_1 | FW | seh | 15 | 0x005E0000 | SK | Destructor thunk |
| 0x005eff3a | ddwin_dtor_thunk_2 | FW | seh | 40 | 0x005E0000 | SK | Destructor thunk + CString cleanup |
| 0x005eff62 | ddwin_dtor_thunk_3 | FW | seh | 9 | 0x005E0000 | SK | Calls surface_dtor_empty |
| 0x005eff75 | seh_epilog_3 | FW | seh | 14 | 0x005E0000 | SK | SEH chain restore |
| 0x005eff83 | ddwin_create_named | FW | ddwin | 105 | 0x005E0000 | SK | Creates named DDraw window, sets class data |
| 0x005effec | ddwin_create_default | FW | ddwin | 106 | 0x005E0000 | SK | Creates DDraw window with default title |
| 0x005f0056 | ddctrl_invalidate_surface | FW | ddctrl | 98 | 0x005F0000 | NN | Calls surface lock, marks dirty flag [0x2e]=1 |
| 0x005f00b8 | ddctrl_resize_and_repaint | FW | ddctrl | 177 | 0x005F0000 | NN | SetRect from surface dims, lock, check bounds, repaint children |
| 0x005f0169 | ddctrl_forward_input | FW | ddctrl | 68 | 0x005F0000 | NN | Forwards input event, then repaints |
| 0x005f01ad | ddctrl_set_dirty_flag | FW | ddctrl | 102 | 0x005F0000 | NN | Sets field [0x2b]=param, conditionally marks dirty |
| 0x005f0213 | ddctrl_blit_surface | FW | ddctrl | 83 | 0x005F0000 | NN | SetRect, calls surface blit |
| 0x005f0266 | ddctrl_add_child_tail | FW | ddctrl | 56 | 0x005F0000 | NN | Calls list_move_to_tail + list_append |
| 0x005f029e | ddctrl_remove_all_children | FW | ddctrl | 85 | 0x005F0000 | NN | Iterates list calling remove_current |
| 0x005f02f3 | ddctrl_update_bounds_all | FW | ddctrl | 79 | 0x005F0000 | NN | Iterates children calling update_bounds |
| 0x005f0342 | ddctrl_deactivate_all | FW | ddctrl | 79 | 0x005F0000 | NN | Iterates children calling deactivate |
| 0x005f0391 | ddctrl_dispatch_message | FW | ddctrl | 291 | 0x005F0000 | NN | Dispatches WM to children; tracks hover [0xcc] |
| 0x005f04c0 | ddctrl_list_clear_seh | FW | ddctrl | 62 | 0x005F0000 | NN | SEH-wrapped call to list_clear_all |
| 0x005f04fe | ddctrl_list_clear_thunk | FW | ddctrl | 9 | 0x005F0000 | NN | Thunk to list_clear_all |
| 0x005f0511 | ddctrl_seh_epilog | FW | ddctrl | 14 | 0x005F0000 | NN | SEH frame teardown |
| 0x005f0520 | ddctrl_list_init_seh | FW | ddctrl | 83 | 0x005F0000 | NN | SEH-wrapped list initialization |
| 0x005f0590 | ddctrl_list_get_first | FW | ddctrl_list | 30 | 0x005F0000 | NN | Thunk to list_move_to_head |
| 0x005f05b0 | ddctrl_list_move_to_tail | FW | ddctrl_list | 30 | 0x005F0000 | NN | Thunk to list rbegin |
| 0x005f05d0 | ddctrl_list_advance | FW | ddctrl_list | 30 | 0x005F0000 | NN | Thunk to list_next |
| 0x005f05f0 | ddctrl_list_append | FW | ddctrl_list | 36 | 0x005F0000 | NN | Thunk to list_push_back |
| 0x005f0620 | ios::lockptr | FW | mfc | 28 | 0x005F0000 | NN | ios stream lock pointer accessor |
| 0x005f0640 | ddctrl_listnode_init | FW | ddctrl_list | 54 | 0x005F0000 | NN | Zero-initializes 3-field node {data, next, prev} |
| 0x005f0676 | ~CDataBoundProperty | FW | mfc | 22 | 0x005F0000 | NN | MFC data-bound property destructor (empty) |
| 0x005f068c | ddctrl_listnode_set_next | FW | ddctrl_list | 33 | 0x005F0000 | NN | Sets node field +4 (next pointer) |
| 0x005f06ad | ddctrl_listnode_set_prev | FW | ddctrl_list | 33 | 0x005F0000 | NN | Sets node field +8 (prev pointer) |
| 0x005f06ce | ddctrl_listnode_set_data | FW | ddctrl_list | 32 | 0x005F0000 | NN | Sets node field +0 (data value) |
| 0x005f06ee | ddctrl_listnode_init2 | FW | ddctrl_list | 54 | 0x005F0000 | NN | Identical to 005f0640, zero-init 3 fields |
| 0x005f0724 | ddctrl_list_destroy_all | FW | ddctrl_list | 30 | 0x005F0000 | NN | Thunk to iterate+remove all nodes |
| 0x005f0742 | ddctrl_list_is_empty | FW | ddctrl_list | 46 | 0x005F0000 | NN | Returns *this == 0 (head is null) |
| 0x005f0770 | ddctrl_list_begin | FW | ddctrl_list | 62 | 0x005F0000 | NN | Sets cursor to head, returns data |
| 0x005f07b3 | ddctrl_list_rbegin | FW | ddctrl_list | 65 | 0x005F0000 | NN | Sets cursor to tail, returns data |
| 0x005f07f9 | pDNameNode::length | FW | mfc | 53 | 0x005F0000 | NN | Name demangler node length |
| 0x005f0833 | ddctrl_list_next | FW | ddctrl_list | 90 | 0x005F0000 | NN | Advances cursor via get_prev, returns data |
| 0x005f0897 | ddctrl_list_prev | FW | ddctrl_list | 90 | 0x005F0000 | NN | Advances cursor via get_next, returns data |
| 0x005f08fb | ddctrl_list_push_back | FW | ddctrl_list | 242 | 0x005F0000 | NN | Allocates 12-byte node, links at tail |
| 0x005f0a04 | ddctrl_list_insert_before | FW | ddctrl_list | 422 | 0x005F0000 | NN | Inserts node before cursor in linked list |
| 0x005f0bce | ddctrl_list_find | FW | ddctrl_list | 83 | 0x005F0000 | NN | Linear search for matching data value |
| 0x005f0c21 | ddctrl_list_count | FW | ddctrl_list | 72 | 0x005F0000 | NN | Counts nodes by iterating head to end |
| 0x005f0c69 | ddctrl_list_remove_current | FW | ddctrl_list | 426 | 0x005F0000 | NN | Unlinks current node, frees via scalar_deleting_destructor |
| 0x005f0e13 | ddctrl_list_clear | FW | ddctrl_list | 56 | 0x005F0000 | NN | Removes all nodes from head to empty |
| 0x005f0e50 | ddctrl_listnode_get_data | FW | ddctrl_list | 27 | 0x005F0000 | NN | Returns field +0 (data) |
| 0x005f0e70 | ddctrl_listnode_get_next | FW | ddctrl_list | 28 | 0x005F0000 | NN | Returns field +4 (next) |
| 0x005f0e90 | ddctrl_listnode_get_prev | FW | ddctrl_list | 28 | 0x005F0000 | NN | Returns field +8 (prev) |
| 0x005f0eb0 | scalar_deleting_destructor | FW | mfc | 57 | 0x005F0000 | NN | CDataBoundProperty scalar deleting destructor |
| 0x005f0ef0 | ddctrl_get_current_control | FW | ddctrl | 21 | 0x005F0000 | NN | Returns global DAT_00639dc8 |
| 0x005f0f05 | ddctrl_set_current_control | FW | ddctrl | 24 | 0x005F0000 | NN | Sets global DAT_00639dc8 |
| 0x005f0f1d | ddctrl_construct | FW | ddctrl | 182 | 0x005F0000 | NN | Constructor: vtable PTR_FUN_0061d720, zero-inits all fields |
| 0x005f0fe9 | ddctrl_construct_with_parent | FW | ddctrl | 183 | 0x005F0000 | NN | Constructor with parent window param |
| 0x005f10b6 | ddctrl_construct_with_control | FW | ddctrl | 183 | 0x005F0000 | NN | Constructor with parent control param |
| 0x005f1183 | ddctrl_destructor | FW | ddctrl | 79 | 0x005F0000 | NN | Destructor: clears children, calls base cleanup |
| 0x005f11d2 | ddctrl_base_destructor | FW | ddctrl | 12 | 0x005F0000 | NN | Thunk to list SEH cleanup |
| 0x005f11e8 | ddctrl_seh_epilog2 | FW | ddctrl | 14 | 0x005F0000 | NN | SEH frame teardown |
| 0x005f11f6 | ddctrl_set_enabled | FW | ddctrl | 43 | 0x005F0000 | NN | Sets field +8=param, clears field +0xc |
| 0x005f1221 | CTestCmdUI::Enable | FW | mfc | 43 | 0x005F0000 | NN | MFC test command UI enable |
| 0x005f124c | ddctrl_init | FW | ddctrl | 195 | 0x005F0000 | NN | Init: parent, bounds, resolves window, registers child |
| 0x005f130f | ddctrl_handle_message | FW | ddctrl | 478 | 0x005F0000 | NN | Central msg dispatcher: LButton, RButton, MouseMove, DblClk, Key via vtable |
| 0x005f1514 | ddctrl_get_parent_window | FW | ddctrl | 89 | 0x005F0000 | NN | Resolves parent window handle, caches at +8 |
| 0x005f156d | ddctrl_check_tracking | FW | ddctrl | 60 | 0x005F0000 | NN | Gets parent, calls CSplitterWnd::IsTracking |
| 0x005f15a9 | ddctrl_assert_parent | FW | ddctrl | 73 | 0x005F0000 | NN | Asserts GetParentGameWin() != null |
| 0x005f15f2 | ddctrl_update_bounds | FW | ddctrl | 48 | 0x005F0000 | NN | Calls vtable[0x28](bounds), then update_bounds_all |
| 0x005f1622 | ddctrl_activate | FW | ddctrl | 97 | 0x005F0000 | NN | Sets active flag [0xd]=1, vtable[0x20](1), init children |
| 0x005f1683 | ddctrl_deactivate | FW | ddctrl | 65 | 0x005F0000 | NN | Clears active flag [0xd]=0, vtable[0x20](0), deactivate children |
| 0x005f16c4 | ddctrl_set_activate_callback | FW | ddctrl | 33 | 0x005F0000 | NN | Sets callback at +0x20 |
| 0x005f16e5 | ddctrl_set_rbuttonup_callback | FW | ddctrl | 33 | 0x005F0000 | NN | Sets callback at +0x24 |
| 0x005f1706 | ddctrl_set_paint_callback | FW | ddctrl | 33 | 0x005F0000 | NN | Sets callback at +0x28 |
| 0x005f1727 | ddctrl_set_keydown_callback | FW | ddctrl | 33 | 0x005F0000 | NN | Sets callback at +0x2c |
| 0x005f1748 | ddctrl_set_dblclick_callback | FW | ddctrl | 33 | 0x005F0000 | NN | Sets callback at +0x30 |
| 0x005f1769 | ddctrl_fire_activate | FW | ddctrl | 51 | 0x005F0000 | NN | Calls activate callback with field +4 (hwnd) |
| 0x005f179c | ddctrl_activate_thunk | FW | ddctrl | 32 | 0x005F0000 | NN | Thunk to ddctrl_activate |
| 0x005f17bc | ddctrl_noop_lbuttondown | FW | ddctrl | 24 | 0x005F0000 | NN | Empty stub (default LButtonDown) |
| 0x005f17d4 | ddctrl_fire_keydown | FW | ddctrl | 61 | 0x005F0000 | NN | Calls keydown callback at +0x28 |
| 0x005f1811 | ddctrl_fire_keychar | FW | ddctrl | 61 | 0x005F0000 | NN | Calls callback at +0x2c |
| 0x005f184e | ddctrl_fire_rbuttonup | FW | ddctrl | 61 | 0x005F0000 | NN | Calls callback at +0x24 |
| 0x005f188b | ddctrl_fire_dblclick | FW | ddctrl | 61 | 0x005F0000 | NN | Calls callback at +0x30 |
| 0x005f18c8 | ddctrl_noop_lbuttonup | FW | ddctrl | 24 | 0x005F0000 | NN | Empty stub (default LButtonUp) |
| 0x005f18e0 | ddctrl_noop_rbuttondown | FW | ddctrl | 24 | 0x005F0000 | NN | Empty stub (default RButtonDown) |
| 0x005f18f8 | ddctrl_noop_rbuttonup | FW | ddctrl | 24 | 0x005F0000 | NN | Empty stub (default RButtonUp) |
| 0x005f1910 | ddctrl_noop_mousemove | FW | ddctrl | 24 | 0x005F0000 | NN | Empty stub (default MouseMove) |
| 0x005f1928 | ddctrl_register_child | FW | ddctrl | 50 | 0x005F0000 | NN | Adds control to parent's child list |
| 0x005f195a | ddctrl_clear_children | FW | ddctrl | 76 | 0x005F0000 | NN | Removes all children from list |
| 0x005f19a6 | ddctrl_deactivate_children | FW | ddctrl | 73 | 0x005F0000 | NN | Iterates children calling deactivate |
| 0x005f19ef | ddctrl_update_bounds_children | FW | ddctrl | 73 | 0x005F0000 | NN | Iterates children calling update_bounds |
| 0x005f1a40 | ddctrl_dispatch_to_children | FW | ddctrl | 270 | 0x005F0000 | NN | Dispatches msg to child controls; tracks hover at +0x1c |
| 0x005f1b50 | CSplitterWnd::IsTracking | FW | mfc | 31 | 0x005F0000 | NN | MFC splitter window tracking check |
| 0x005f1b80 | __onexit | FW | crt_seh | 181 | 0x005F0000 | NN | Register atexit-like callback |
| 0x005f1c40 | _atexit | FW | crt_seh | 48 | 0x005F0000 | NN | Standard atexit wrapper |
| 0x005f1c70 | ___onexitinit | FW | crt_seh | 85 | 0x005F0000 | NN | Initialize onexit table |
| 0x005f1cc8 | __global_unwind2 | FW | crt_seh | 32 | 0x005F0000 | NN | SEH global unwind |
| 0x005f1d0a | __local_unwind2 | FW | crt_seh | 104 | 0x005F0000 | NN | SEH local unwind |
| 0x005f1d72 | __abnormal_termination | FW | crt_seh | 35 | 0x005F0000 | NN | Check abnormal termination flag |
| 0x005f1d95 | crt_save_context_1 | FW | crt_seh | 9 | 0x005F0000 | NN | Saves ECX/EAX/EBP to globals |
| 0x005f1d9e | crt_save_context_2 | FW | crt_seh | 24 | 0x005F0000 | NN | Similar SEH context save |
| 0x005f1dc0 | _JumpToContinuation | FW | crt_eh | 47 | 0x005F0000 | NN | EH jump to continuation |
| 0x005f1e00 | _CallMemberFunction0 | FW | crt_eh | 7 | 0x005F0000 | NN | EH call member function (0 args) |
| 0x005f1e10 | _CallMemberFunction1_A | FW | crt_eh | 7 | 0x005F0000 | NN | EH call member function (1 arg) variant A |
| 0x005f1e20 | _CallMemberFunction1_B | FW | crt_eh | 7 | 0x005F0000 | NN | EH call member function (1 arg) variant B |
| 0x005f1e30 | _UnwindNestedFrames | FW | crt_eh | 81 | 0x005F0000 | NN | EH nested frame unwind |
| 0x005f1e90 | ___CxxFrameHandler | FW | crt_eh | 60 | 0x005F0000 | NN | C++ frame-based exception handler |
| 0x005f1ed0 | ___CxxLongjmpUnwind | FW | crt_eh | 49 | 0x005F0000 | NN | C++ longjmp unwind |
| 0x005f1f10 | _CallCatchBlock2 | FW | crt_eh | 102 | 0x005F0000 | NN | EH catch block invocation |
| 0x005f1f80 | CatchGuardHandler | FW | crt_eh | 62 | 0x005F0000 | NN | EH catch guard |
| 0x005f1fc0 | _CallSETranslator | FW | crt_eh | 209 | 0x005F0000 | NN | SEH-to-C++ exception translation |
| 0x005f20a0 | TranslatorGuardHandler | FW | crt_eh | 98 | 0x005F0000 | NN | SEH translator guard |
| 0x005f2110 | _memcpy_1 | FW | crt_mem | 285 | 0x005F0000 | NN | Memory copy (optimized, variant 1) |
| 0x005f2260 | _srand | FW | crt_misc | 19 | 0x005F0000 | NN | Set random seed (DAT_00639e50) |
| 0x005f2280 | _rand | FW | crt_misc | 65 | 0x005F0000 | NN | Generate pseudo-random number |
| 0x005f22d0 | _strcpy | FW | crt_string | 7 | 0x005F0000 | NN | String copy (optimized DWORD-at-a-time) |
| 0x005f22e0 | _strcat | FW | crt_string | 224 | 0x005F0000 | NN | String concatenate (optimized) |
| 0x005f23c0 | operator_delete | FW | crt_mem | 162 | 0x005F0000 | NN | C++ operator delete (debug) |
| 0x005f2470 | operator_new | FW | crt_mem | 30 | 0x005F0000 | NN | C++ operator new |
| 0x005f2490 | eh_vector_destructor_iterator | FW | crt_eh | 148 | 0x005F0000 | NN | Destroy array elements |
| 0x005f2540 | __ArrayUnwind | FW | crt_eh | 108 | 0x005F0000 | NN | Unwind array construction |
| 0x005f25d0 | ArrayUnwindFilter_1 | FW | crt_eh | 65 | 0x005F0000 | NN | Array unwind exception filter |
| 0x005f2620 | eh_vector_constructor_iterator | FW | crt_eh | 152 | 0x005F0000 | NN | Construct array elements |
| 0x005f26e0 | crt_init_check | FW | crt_stub | 22 | 0x005F0000 | NN | Returns immediately |
| 0x005f2700 | __toupper_lk | FW | crt_string | 313 | 0x005F0000 | NN | Locale-aware toupper |
| 0x005f2840 | _isalpha | FW | crt_string | 74 | 0x005F0000 | NN | Character classification |
| 0x005f2890 | _isupper | FW | crt_string | 68 | 0x005F0000 | NN | Character classification |
| 0x005f28e0 | _islower | FW | crt_string | 68 | 0x005F0000 | NN | Character classification |
| 0x005f2930 | _isdigit | FW | crt_string | 68 | 0x005F0000 | NN | Character classification |
| 0x005f2980 | _isxdigit | FW | crt_string | 74 | 0x005F0000 | NN | Character classification |
| 0x005f29d0 | _isspace | FW | crt_string | 68 | 0x005F0000 | NN | Character classification |
| 0x005f2a20 | _ispunct | FW | crt_string | 68 | 0x005F0000 | NN | Character classification |
| 0x005f2a70 | _isalnum | FW | crt_string | 74 | 0x005F0000 | NN | Character classification |
| 0x005f2ac0 | _isprint | FW | crt_string | 74 | 0x005F0000 | NN | Character classification |
| 0x005f2b10 | _isgraph | FW | crt_string | 74 | 0x005F0000 | NN | Character classification |
| 0x005f2b60 | _iscntrl | FW | crt_string | 68 | 0x005F0000 | NN | Character classification |
| 0x005f2bb0 | ___isascii | FW | crt_string | 41 | 0x005F0000 | NN | Character classification |
| 0x005f2be0 | _toascii | FW | crt_string | 22 | 0x005F0000 | NN | Convert to ASCII (mask 0x7f) |
| 0x005f2c00 | ___iscsymf | FW | crt_string | 113 | 0x005F0000 | NN | Check C symbol first char |
| 0x005f2c80 | ___iscsym | FW | crt_string | 113 | 0x005F0000 | NN | Check C symbol char |
| 0x005f2d00 | __fsopen | FW | crt_file | 258 | 0x005F0000 | NN | Open file with sharing |
| 0x005f2e10 | _fopen | FW | crt_file | 34 | 0x005F0000 | NN | Open file |
| 0x005f2e40 | _fclose | FW | crt_file | 237 | 0x005F0000 | NN | Close file |
| 0x005f2f30 | _strncpy | FW | crt_string | 254 | 0x005F0000 | NN | String copy with length |
| 0x005f3030 | _sprintf | FW | crt_string | 236 | 0x005F0000 | NN | Formatted string output |
| 0x005f3120 | _atol | FW | crt_string | 282 | 0x005F0000 | NN | String to long |
| 0x005f3240 | _atoi | FW | crt_string | 28 | 0x005F0000 | NN | String to int |
| 0x005f3260 | __atoi64 | FW | crt_string | 324 | 0x005F0000 | NN | String to 64-bit int |
| 0x005f33b0 | _fputs | FW | crt_file | 202 | 0x005F0000 | NN | Write string to stream |
| 0x005f3480 | _strlen | FW | crt_string | 123 | 0x005F0000 | NN | String length |
| 0x005f3500 | _memset | FW | crt_mem | 88 | 0x005F0000 | NN | Memory fill |
| 0x005f3560 | _strcmp | FW | crt_string | 129 | 0x005F0000 | NN | String compare |
| 0x005f35f0 | _strcpy_thunk | FW | crt_string | 47 | 0x005F0000 | NN | Thunk to _strcpy |
| 0x005f3630 | _strchr | FW | crt_string | 193 | 0x005F0000 | NN | Find char in string |
| 0x005f36f0 | _strncmp | FW | crt_string | 56 | 0x005F0000 | NN | Compare n chars |
| 0x005f3730 | _fread | FW | crt_file | 456 | 0x005F0000 | NN | Read from stream |
| 0x005f3900 | _fwrite | FW | crt_file | 536 | 0x005F0000 | NN | Write to stream |
| 0x005f3b20 | __chdir | FW | crt_file | 226 | 0x005F0000 | NN | Change directory |
| 0x005f3c10 | _strrchr | FW | crt_string | 39 | 0x005F0000 | NN | Find last char in string |
| 0x005f3c40 | _fgets | FW | crt_file | 301 | 0x005F0000 | NN | Read line from stream |
| 0x005f3d70 | __filbuf | FW | crt_file | 479 | 0x005F0000 | NN | Fill file buffer |
| 0x005f3f50 | _fputc | FW | crt_file | 146 | 0x005F0000 | NN | Write char to stream |
| 0x005f3ff0 | _putc | FW | crt_file | 32 | 0x005F0000 | NN | Write char (macro) |
| 0x005f4010 | _fgetc | FW | crt_file | 126 | 0x005F0000 | NN | Read char from stream |
| 0x005f4090 | _getc | FW | crt_file | 28 | 0x005F0000 | NN | Read char (macro) |
| 0x005f40b0 | __strnicmp | FW | crt_string | 173 | 0x005F0000 | NN | Case-insensitive compare n chars |
| 0x005f4160 | __cinit | FW | crt_startup | 66 | 0x005F0000 | NN | CRT C initialization |
| 0x005f41b0 | _exit | FW | crt_startup | 27 | 0x005F0000 | NN | Process exit |
| 0x005f41d0 | __exit | FW | crt_startup | 27 | 0x005F0000 | NN | Internal process exit |
| 0x005f41f0 | __cexit | FW | crt_startup | 25 | 0x005F0000 | NN | CRT cleanup exit |
| 0x005f4210 | __c_exit | FW | crt_startup | 25 | 0x005F0000 | NN | CRT quick exit |
| 0x005f4230 | doexit | FW | crt_startup | 251 | 0x005F0000 | NN | Core exit handler |
| 0x005f4330 | __initterm | FW | crt_startup | 49 | 0x005F0000 | NN | Call function pointer table |
| 0x005f4370 | _strstr | FW | crt_string | 128 | 0x005F0000 | NN | Find substring |
| 0x005f43f0 | _malloc | FW | crt_mem | 40 | 0x005F0000 | NN | Standard malloc |
| 0x005f4420 | __malloc_dbg | FW | crt_mem | 46 | 0x005F0000 | NN | Debug malloc |
| 0x005f4450 | __nh_malloc | FW | crt_mem | 38 | 0x005F0000 | NN | No-throw malloc |
| 0x005f4480 | __nh_malloc_dbg | FW | crt_mem | 101 | 0x005F0000 | NN | Debug no-throw malloc |
| 0x005f44f0 | __heap_alloc | FW | crt_mem | 34 | 0x005F0000 | NN | Raw heap alloc |
| 0x005f4520 | __heap_alloc_dbg | FW | crt_mem | 818 | 0x005F0000 | NN | Debug heap alloc with header/guards |
| 0x005f4860 | _calloc | FW | crt_mem | 38 | 0x005F0000 | NN | Standard calloc |
| 0x005f4890 | __calloc_dbg | FW | crt_mem | 110 | 0x005F0000 | NN | Debug calloc |
| 0x005f4900 | __expand_1 | FW | crt_mem | 38 | 0x005F0000 | NN | Expand allocation (variant 1) |
| 0x005f4930 | __realloc_dbg | FW | crt_mem | 55 | 0x005F0000 | NN | Debug realloc |
| 0x005f4970 | realloc_help | FW | crt_mem | 1409 | 0x005F0000 | NN | Core realloc implementation |
| 0x005f4f00 | __expand_2 | FW | crt_mem | 38 | 0x005F0000 | NN | Expand allocation (variant 2) |
| 0x005f4f30 | __expand_dbg | FW | crt_mem | 55 | 0x005F0000 | NN | Debug expand |
| 0x005f4f70 | crt_heap_stub_1 | FW | crt_stub | 25 | 0x005F0000 | NN | Returns immediately |
| 0x005f4f90 | __free_dbg | FW | crt_mem | 1057 | 0x005F0000 | NN | Debug free with leak/corruption checks |
| 0x005f53c0 | __msize | FW | crt_mem | 30 | 0x005F0000 | NN | Get allocation size |
| 0x005f53e0 | __msize_dbg | FW | crt_mem | 358 | 0x005F0000 | NN | Debug get allocation size |
| 0x005f5550 | crt_heap_validate_stub | FW | crt_stub | 38 | 0x005F0000 | NN | Returns immediately |
| 0x005f5580 | __CrtSetDbgBlockType | FW | crt_mem | 160 | 0x005F0000 | NN | Set debug block type |
| 0x005f5620 | crt_heap_check_stub | FW | crt_stub | 38 | 0x005F0000 | NN | Returns immediately |
| 0x005f5650 | _CheckBytes | FW | crt_mem | 140 | 0x005F0000 | NN | Verify guard bytes |
| 0x005f56e0 | __CrtCheckMemory | FW | crt_mem | 873 | 0x005F0000 | NN | Full heap validation |
| 0x005f5a60 | __CrtSetDbgFlag | FW | crt_mem | 48 | 0x005F0000 | NN | Set debug heap flags |
| 0x005f5a90 | __CrtDoForAllClientObjects | FW | crt_mem | 105 | 0x005F0000 | NN | Iterate client allocations |
| 0x005f5b00 | __CrtIsValidPointer | FW | crt_mem | 92 | 0x005F0000 | NN | Validate pointer |
| 0x005f5b60 | __CrtIsValidHeapPointer | FW | crt_mem | 182 | 0x005F0000 | NN | Validate heap pointer |
| 0x005f5c30 | __CrtIsMemoryBlock | FW | crt_mem | 255 | 0x005F0000 | NN | Check if valid memory block |
| 0x005f5d30 | crt_alloc_counter_stub | FW | crt_stub | 38 | 0x005F0000 | NN | Returns immediately |
| 0x005f5d60 | __CrtMemCheckpoint | FW | crt_mem | 316 | 0x005F0000 | NN | Checkpoint heap state |
| 0x005f5ea0 | __CrtMemDifference | FW | crt_mem | 312 | 0x005F0000 | NN | Diff two heap checkpoints |
| 0x005f5fe0 | __CrtMemDumpAllObjectsSince | FW | crt_mem | 704 | 0x005F0000 | NN | Dump allocations since checkpoint |
| 0x005f62a0 | __printMemBlockData | FW | crt_mem | 252 | 0x005F0000 | NN | Print memory block details |
| 0x005f63a0 | __CrtDumpMemoryLeaks | FW | crt_mem | 132 | 0x005F0000 | NN | Report memory leaks |
| 0x005f6430 | __CrtMemDumpStatistics | FW | crt_mem | 199 | 0x005F0000 | NN | Print memory statistics |
| 0x005f6500 | _memcpy_2 | FW | crt_mem | 285 | 0x005F0000 | NN | Memory copy (variant 2) |
| 0x005f6650 | __wrename | FW | crt_file | 96 | 0x005F0000 | NN | Rename file (wide) |
| 0x005f66b0 | _remove | FW | crt_file | 92 | 0x005F0000 | NN | Remove file |
| 0x005f6710 | __unlink | FW | crt_file | 28 | 0x005F0000 | NN | Delete file |
| 0x005f6730 | _rewind | FW | crt_file | 192 | 0x005F0000 | NN | Rewind file stream |
| 0x005f67f0 | _fseek | FW | crt_file | 304 | 0x005F0000 | NN | Seek in file stream |
| 0x005f6920 | _ftell | FW | crt_file | 674 | 0x005F0000 | NN | Get file position |
| 0x005f6bd0 | _printf | FW | crt_file | 141 | 0x005F0000 | NN | Formatted console output |
| 0x005f6c60 | __ftol | FW | crt_math | 39 | 0x005F0000 | NN | Float to long conversion |
| 0x005f6c90 | __fpmath | FW | crt_math | 38 | 0x005F0000 | NN | FP math init |
| 0x005f6cc0 | crt_fp_init_stub | FW | crt_stub | 16 | 0x005F0000 | NN | Returns immediately |
| 0x005f6cd0 | __cfltcvt_init | FW | crt_math | 71 | 0x005F0000 | NN | Init float conversion function pointers |
| 0x005f6d20 | crt_fp_stub2 | FW | crt_stub | 38 | 0x005F0000 | NN | Returns immediately |
| 0x005f6d50 | _memcmp | FW | crt_string | 172 | 0x005F0000 | NN | Memory compare |
| 0x005f6e00 | __strcmpi | FW | crt_string | 140 | 0x005F0000 | NN | Case-insensitive compare |
| 0x005f6e90 | entry | FW | crt_startup | 494 | 0x005F0000 | NN | CRT entry point (calls WinMain via thunk_FUN_0055add0) |
| 0x005f70e0 | __amsg_exit | FW | crt_startup | 55 | 0x005F0000 | NN | CRT fatal message exit |
| 0x005f7120 | crt_stub_return | FW | crt_stub | 24 | 0x005F0000 | NN | Returns immediately |
| 0x005f7140 | __getcwd | FW | crt_misc | 43 | 0x005F0000 | NN | Get current working directory |
| 0x005f7170 | __getdcwd | FW | crt_misc | 312 | 0x005F0000 | NN | Get CWD for drive |
| 0x005f72b0 | __validdrive | FW | crt_misc | 105 | 0x005F0000 | NN | Check if drive letter valid |
| 0x005f7320 | _time | FW | crt_misc | 390 | 0x005F0000 | NN | Get current time |
| 0x005f74b0 | _strncat | FW | crt_string | 291 | 0x005F0000 | NN | Concatenate n chars |
| 0x005f75e0 | __assert | FW | crt_debug | 951 | 0x005F0000 | NN | Assert failure handler |
| 0x005f79a0 | ___InternalCxxFrameHandler | FW | crt_eh | 263 | 0x005F0000 | NN | Internal C++ EH frame handler |
| 0x005f7ac0 | FindHandler | FW | crt_eh | 675 | 0x005F0000 | NN | Find matching EH handler |
| 0x005f7d70 | FindHandlerForForeignException | FW | crt_eh | 288 | 0x005F0000 | NN | Handle foreign (non-C++) exceptions |
| 0x005f7e90 | GetRangeOfTrysToCheck | FW | crt_eh | 230 | 0x005F0000 | NN | Get try block range for state |
| 0x005f7f80 | TypeMatch | FW | crt_eh | 195 | 0x005F0000 | NN | RTTI type matching for catch |
| 0x005f8050 | ___FrameUnwindToState | FW | crt_eh | 234 | 0x005F0000 | NN | Unwind to specific EH state |
| 0x005f8160 | ArrayUnwindFilter_2 | FW | crt_eh | 65 | 0x005F0000 | NN | Array unwind exception filter (variant 2) |
| 0x005f81b0 | CatchIt | FW | crt_eh | 209 | 0x005F0000 | NN | Execute catch block |
| 0x005f8290 | CallCatchBlock | FW | crt_eh | 260 | 0x005F0000 | NN | Call catch handler function |
| 0x005f83f0 | ExFilterRethrow | FW | crt_eh | 96 | 0x005F0000 | NN | Exception filter for rethrow |
| 0x005f8460 | BuildCatchObject | FW | crt_eh | 699 | 0x005F0000 | NN | Build catch object from thrown object |
| 0x005f8740 | DestructExceptionObject | FW | crt_eh | 124 | 0x005F0000 | NN | Destroy thrown exception object |
| 0x005f87e0 | AdjustPointer | FW | crt_eh | 79 | 0x005F0000 | NN | Adjust pointer for MI/vbase |
| 0x005f8830 | __CallSettingFrame | FW | crt_eh | 72 | 0x005F0000 | NN | Call with EH frame setup |
| 0x005f8880 | terminate | FW | crt_eh | 105 | 0x005F0000 | NN | C++ terminate handler |
| 0x005f8920 | unexpected | FW | crt_eh | 40 | 0x005F0000 | NN | C++ unexpected handler |
| 0x005f8950 | _inconsistency | FW | crt_eh | 106 | 0x005F0000 | NN | C++ inconsistency handler |
| 0x005f89f0 | __CrtDbgBreak | FW | crt_debug | 17 | 0x005F0000 | NN | Debug break |
| 0x005f8a10 | __CrtSetReportMode | FW | crt_debug | 126 | 0x005F0000 | NN | Set debug report mode |
| 0x005f8a90 | __CrtSetReportFile | FW | crt_debug | 169 | 0x005F0000 | NN | Set debug report file |
| 0x005f8b40 | crt_dbg_report_stub | FW | crt_stub | 38 | 0x005F0000 | NN | Returns immediately |
| 0x005f8b70 | __CrtDbgReport | FW | crt_debug | 998 | 0x005F0000 | NN | Debug assertion/error report |
| 0x005f8f60 | _CrtMessageWindow | FW | crt_debug | 813 | 0x005F0000 | NN | Debug message dialog |
| 0x005f9355 | crt_locale_init_stub | FW | crt_stub | 27 | 0x005F0000 | NN | Returns immediately |
| 0x005f9370 | ___crtLCMapStringW | FW | crt_locale | 760 | 0x005F0000 | NN | Locale-aware string mapping (wide) |
| 0x005f9670 | wcsncnt | FW | crt_locale | 108 | 0x005F0000 | NN | Count wide chars |
| 0x005f96e0 | ___crtLCMapStringA | FW | crt_locale | 791 | 0x005F0000 | NN | Locale-aware string mapping (ANSI) |
| 0x005f9a00 | _strncnt | FW | crt_locale | 100 | 0x005F0000 | NN | Count chars up to limit |
| 0x005f9a70 | __isctype | FW | crt_locale | 182 | 0x005F0000 | NN | Check character type |
| 0x005f9b30 | __openfile | FW | crt_io | 831 | 0x005F0000 | NN | Core file open |
| 0x005f9ef0 | __getstream | FW | crt_io | 274 | 0x005F0000 | NN | Get free stream slot |
| 0x005fa010 | __close | FW | crt_io | 267 | 0x005F0000 | NN | Close file descriptor |
| 0x005fa120 | __freebuf | FW | crt_io | 138 | 0x005F0000 | NN | Free file buffer |
| 0x005fa1b0 | _fflush | FW | crt_io | 126 | 0x005F0000 | NN | Flush file stream |
| 0x005fa230 | __flush | FW | crt_io | 186 | 0x005F0000 | NN | Internal flush |
| 0x005fa2f0 | __flushall | FW | crt_io | 26 | 0x005F0000 | NN | Flush all streams |
| 0x005fa310 | flsall | FW | crt_io | 247 | 0x005F0000 | NN | Flush all (internal) |
| 0x005fa410 | __flsbuf | FW | crt_io | 660 | 0x005F0000 | NN | Flush buffer on write |
| 0x005fa6b0 | __output | FW | crt_io | 3177 | 0x005F0000 | NN | Core printf engine |
| 0x005fb440 | write_char | FW | crt_io | 117 | 0x005F0000 | NN | Output single char |
| 0x005fb4c0 | write_multi_char | FW | crt_io | 75 | 0x005F0000 | NN | Output repeated char |
| 0x005fb510 | write_string | FW | crt_io | 87 | 0x005F0000 | NN | Output string segment |
| 0x005fb570 | get_int_arg | FW | crt_io | 30 | 0x005F0000 | NN | Get int from va_list |
| 0x005fb590 | get_int64_arg | FW | crt_io | 35 | 0x005F0000 | NN | Get int64 from va_list |
| 0x005fb5c0 | get_short_arg | FW | crt_io | 31 | 0x005F0000 | NN | Get short from va_list |
| 0x005fb5e0 | __allmul | FW | crt_math | 52 | 0x005F0000 | NN | 64-bit multiply |
| 0x005fb620 | __stbuf | FW | crt_io | 330 | 0x005F0000 | NN | Set temp buffer for stdout |
| 0x005fb770 | __ftbuf | FW | crt_io | 182 | 0x005F0000 | NN | Free temp buffer |
| 0x005fb830 | __read | FW | crt_io | 1156 | 0x005F0000 | NN | Low-level read |
| 0x005fbcd0 | __write | FW | crt_io | 744 | 0x005F0000 | NN | Low-level write |
| 0x005fbfd0 | __dosmaperr | FW | crt_misc | 177 | 0x005F0000 | NN | Map DOS error to errno |
| 0x005fc090 | __mbctoupper | FW | crt_locale | 188 | 0x005F0000 | NN | MBCS toupper |
| 0x005fc160 | __ioinit | FW | crt_io | 808 | 0x005F0000 | NN | Initialize I/O subsystem |
| 0x005fc490 | __ioterm | FW | crt_io | 104 | 0x005F0000 | NN | Terminate I/O subsystem |
| 0x005fc500 | __getbuf | FW | crt_io | 188 | 0x005F0000 | NN | Allocate file buffer |
| 0x005fc5c0 | crt_locale_stub_1 | FW | crt_stub | 22 | 0x005F0000 | NN | Returns immediately |
| 0x005fc5e0 | _tolower | FW | crt_locale | 313 | 0x005F0000 | NN | Locale-aware tolower |
| 0x005fc720 | crt_locale_stub_2 | FW | crt_stub | 38 | 0x005F0000 | NN | Returns immediately |
| 0x005fc750 | crt_locale_stub_3 | FW | crt_stub | 21 | 0x005F0000 | NN | Returns immediately |
| 0x005fc770 | __callnewh | FW | crt_mem | 62 | 0x005F0000 | NN | Call new handler |
| 0x005fc7b0 | __malloc_base | FW | crt_heap | 34 | 0x005F0000 | NN | Base malloc (non-debug) |
| 0x005fc7e0 | __nh_malloc_base | FW | crt_heap | 150 | 0x005F0000 | NN | Base no-throw malloc |
| 0x005fc880 | __heap_alloc_base | FW | crt_heap | 99 | 0x005F0000 | NN | Base heap alloc |
| 0x005fc8f0 | crt_heap_base_stub | FW | crt_stub | 21 | 0x005F0000 | NN | Returns immediately |
| 0x005fc910 | __expand_base | FW | crt_heap | 195 | 0x005F0000 | NN | Base expand |
| 0x005fc9e0 | __realloc_base | FW | crt_heap | 518 | 0x005F0000 | NN | Base realloc |
| 0x005fcbf0 | __free_base | FW | crt_heap | 105 | 0x005F0000 | NN | Base free |
| 0x005fcc60 | __heapchk | FW | crt_heap | 120 | 0x005F0000 | NN | Heap consistency check |
| 0x005fcce0 | __heapset | FW | crt_heap | 21 | 0x005F0000 | NN | Set free heap bytes |
| 0x005fcd00 | __heap_init | FW | crt_heap | 93 | 0x005F0000 | NN | Initialize CRT heap |
| 0x005fcd60 | __heap_term | FW | crt_heap | 93 | 0x005F0000 | NN | Terminate CRT heap |
| 0x005fcdc0 | crt_heap_term_stub | FW | crt_stub | 21 | 0x005F0000 | NN | Returns immediately |
| 0x005fcde0 | __set_sbh_threshold | FW | crt_heap | 61 | 0x005F0000 | NN | Set small-block heap threshold |
| 0x005fce30 | ___sbh_new_region | FW | crt_heap | 508 | 0x005F0000 | NN | Allocate SBH region |
| 0x005fd040 | ___sbh_release_region | FW | crt_heap | 132 | 0x005F0000 | NN | Release SBH region |
| 0x005fd0d0 | ___sbh_decommit_pages | FW | crt_heap | 376 | 0x005F0000 | NN | Decommit SBH pages |
| 0x005fd250 | ___sbh_find_block | FW | crt_heap | 162 | 0x005F0000 | NN | Find SBH block |
| 0x005fd300 | ___sbh_free_block | FW | crt_heap | 136 | 0x005F0000 | NN | Free SBH block |
| 0x005fd390 | ___sbh_alloc_block | FW | crt_heap | 1207 | 0x005F0000 | NN | Allocate SBH block |
| 0x005fd860 | ___sbh_alloc_block_from_page | FW | crt_heap | 763 | 0x005F0000 | NN | SBH page-level allocator |
| 0x005fdb60 | ___sbh_resize_block | FW | crt_heap | 439 | 0x005F0000 | NN | Resize SBH block |
| 0x005fdd20 | ___sbh_heap_check | FW | crt_heap | 617 | 0x005F0000 | NN | SBH heap validation |
| 0x005fdf90 | __lseek | FW | crt_io | 285 | 0x005F0000 | NN | Low-level seek |
| 0x005fe0b0 | ___initstdio | FW | crt_stdio | 338 | 0x005F0000 | NN | Initialize stdio |
| 0x005fe210 | ___endstdio | FW | crt_stdio | 36 | 0x005F0000 | NN | Shutdown stdio |
| 0x005fe240 | __setdefaultprecision | FW | crt_math | 29 | 0x005F0000 | NN | Set FP default precision |
| 0x005fe260 | __ms_p5_test_fdiv | FW | crt_math | 94 | 0x005F0000 | NN | Pentium FDIV bug test |
| 0x005fe2c0 | __ms_p5_mp_test_fdiv | FW | crt_math | 86 | 0x005F0000 | NN | Pentium FDIV multi-precision test |
| 0x005fe320 | __forcdecpt | FW | crt_math | 179 | 0x005F0000 | NN | Force decimal point in float string |
| 0x005fe3e0 | __cropzeros | FW | crt_math | 223 | 0x005F0000 | NN | Remove trailing zeros |
| 0x005fe4c0 | __positive | FW | crt_math | 50 | 0x005F0000 | NN | Check if float positive |
| 0x005fe500 | __fassign | FW | crt_math | 83 | 0x005F0000 | NN | Assign float value |
| 0x005fe560 | __cftoe | FW | crt_math | 458 | 0x005F0000 | NN | Float to E-format string |
| 0x005fe730 | __cftof | FW | crt_math | 393 | 0x005F0000 | NN | Float to F-format string |
| 0x005fe8c0 | __cftog | FW | crt_math | 281 | 0x005F0000 | NN | Float to G-format string |
| 0x005fe9e0 | __cftoe_g | FW | crt_math | 63 | 0x005F0000 | NN | Float to E-format (G variant) |
| 0x005fea20 | __cftof_g | FW | crt_math | 59 | 0x005F0000 | NN | Float to F-format (G variant) |
| 0x005fea60 | __cfltcvt | FW | crt_math | 119 | 0x005F0000 | NN | Central float conversion dispatch |
| 0x005feae0 | __shift | FW | crt_math | 54 | 0x005F0000 | NN | Shift mantissa |
| 0x005feb20 | __XcptFilter | FW | crt_misc | 500 | 0x005F0000 | NN | CRT exception filter |
| 0x005fed20 | xcptlookup | FW | crt_misc | 97 | 0x005F0000 | NN | Exception code lookup |
| 0x005fed90 | __ismbbkalnum | FW | crt_mbcs | 32 | 0x005F0000 | NN | MBCS Katakana alnum |
| 0x005fedb0 | __ismbbkprint | FW | crt_mbcs | 32 | 0x005F0000 | NN | MBCS Katakana print |
| 0x005fedd0 | __ismbbkpunct | FW | crt_mbcs | 32 | 0x005F0000 | NN | MBCS Katakana punct |
| 0x005fedf0 | __ismbbalnum | FW | crt_mbcs | 35 | 0x005F0000 | NN | MBCS isalnum |
| 0x005fee20 | __ismbbalpha | FW | crt_mbcs | 35 | 0x005F0000 | NN | MBCS isalpha |
| 0x005fee50 | __ismbbgraph | FW | crt_mbcs | 35 | 0x005F0000 | NN | MBCS isgraph |
| 0x005fee80 | __ismbbprint | FW | crt_mbcs | 35 | 0x005F0000 | NN | MBCS isprint |
| 0x005feeb0 | __ismbbpunct | FW | crt_mbcs | 32 | 0x005F0000 | NN | MBCS ispunct |
| 0x005feed0 | __ismbblead | FW | crt_mbcs | 32 | 0x005F0000 | NN | MBCS lead byte check |
| 0x005feef0 | __ismbbtrail | FW | crt_mbcs | 32 | 0x005F0000 | NN | MBCS trail byte check |
| 0x005fef10 | __ismbbkana | FW | crt_mbcs | 68 | 0x005F0000 | NN | MBCS kana check |
| 0x005fef60 | x_ismbbtype | FW | crt_mbcs | 110 | 0x005F0000 | NN | Core MBCS type check |
| 0x005fefd0 | __setenvp | FW | crt_env | 318 | 0x005F0000 | NN | Initialize environment |
| 0x005ff110 | __setargv | FW | crt_env | 204 | 0x005F0000 | NN | Initialize argv |
| 0x005ff1e0 | parse_cmdline | FW | crt_env | 958 | 0x005F0000 | NN | Parse command line |
| 0x005ff5a0 | ___crtGetEnvironmentStringsW | FW | crt_env | 689 | 0x005F0000 | NN | Get env strings (wide) |
| 0x005ff860 | ___crtGetEnvironmentStringsA | FW | crt_env | 602 | 0x005F0000 | NN | Get env strings (ANSI) |
| 0x005ffac0 | __setmbcp | FW | crt_locale | 815 | 0x005F0000 | NN | Set multibyte code page |
| 0x005ffdf0 | getSystemCP | FW | crt_locale | 121 | 0x005F0000 | NN | Get system code page |
| 0x005ffe80 | _CPtoLCID | FW | crt_locale | 107 | 0x005F0000 | NN | Code page to locale ID |
| 0x005fff20 | setSBCS | FW | crt_locale | 120 | 0x005F0000 | NN | Set single-byte character set |
| 0x005fffa0 | crt_mbcp_stub | FW | crt_stub | 21 | 0x005F0000 | NN | Returns immediately |
| 0x005fffc0 | ___initmbctable | FW | crt_locale | 21 | 0x005F0000 | NN | Initialize MBCS table |
| 0x005fffe0 | __FF_MSGBANNER | FW | crt_misc | 95 | 0x005F0000 | NN | CRT error message banner |
| 0x00600040 | __NMSG_WRITE | FW | crt | 537 bytes | 0x00600000 | SK |  |
| 0x00600260 | __GET_RTERRMSG | FW | crt | small | 0x00600000 | SK |  |
| 0x006002e0 | ___loctotime_t | FW | crt | small | 0x00600000 | SK |  |
| 0x00600400 | _abort | FW | crt | stub | 0x00600000 | SK |  |
| 0x00600430 | _signal | FW | crt | medium | 0x00600000 | SK |  |
| 0x00600610 | ctrlevent_capture | FW | crt | small | 0x00600000 | SK |  |
| 0x006006a0 | _raise | FW | crt | medium | 0x00600000 | SK |  |
| 0x006008c0 | siglookup | FW | crt | small | 0x00600000 | SK |  |
| 0x00600930 | ___crtMessageBoxA | FW | crt | small | 0x00600000 | SK |  |
| 0x00600a10 | __itoa | FW | crt | small | 0x00600000 | SK |  |
| 0x00600a70 | xtoa | FW | crt | small | 0x00600000 | SK |  |
| 0x00600b30 | __ltoa | FW | crt | small | 0x00600000 | SK |  |
| 0x00600b90 | __ultoa | FW | crt | stub | 0x00600000 | SK |  |
| 0x00600bc0 | __i64toa | FW | crt | small | 0x00600000 | SK |  |
| 0x00600c30 | x64toa | FW | crt | small | 0x00600000 | SK |  |
| 0x00600d10 | __ui64toa | FW | crt | stub | 0x00600000 | SK |  |
| 0x00600d40 | _fprintf | FW | crt | small | 0x00600000 | SK |  |
| 0x00600df0 | _setvbuf | FW | crt | medium | 0x00600000 | SK |  |
| 0x00600f50 | $E2 | FW | crt | stub | 0x00600000 | SK |  |
| 0x00600f70 | $E1 | FW | crt | stub | 0x00600000 | SK |  |
| 0x00600fa0 | __CxxUnhandledExceptionFilter | FW | crt | small | 0x00600000 | SK |  |
| 0x00601040 | crt_restore_exception_filter | FW | crt | stub | 0x00600000 | SK |  |
| 0x00601060 | _ValidateRead | FW | crt | small | 0x00600000 | SK |  |
| 0x006010a0 | _ValidateWrite | FW | crt | small | 0x00600000 | SK |  |
| 0x006010e0 | _ValidateExecute | FW | crt | small | 0x00600000 | SK |  |
| 0x00601120 | __snprintf | FW | crt | small | 0x00600000 | SK |  |
| 0x00601210 | __vsnprintf | FW | crt | small | 0x00600000 | SK |  |
| 0x00601300 | ___crtGetStringTypeW | FW | crt | medium | 0x00600000 | SK |  |
| 0x00601560 | ___crtGetStringTypeA | FW | crt | medium | 0x00600000 | SK |  |
| 0x00601700 | __open | FW | crt | stub | 0x00600000 | SK |  |
| 0x00601750 | __sopen | FW | crt | xlarge | 0x00600000 | SK |  |
| 0x00601cf0 | __alloc_osfhnd | FW | crt | small | 0x00600000 | SK |  |
| 0x00601e40 | __set_osfhnd | FW | crt | small | 0x00600000 | SK |  |
| 0x00601f40 | __free_osfhnd | FW | crt | small | 0x00600000 | SK |  |
| 0x00602060 | __get_osfhandle | FW | crt | small | 0x00600000 | SK |  |
| 0x006020e0 | __open_osfhandle | FW | crt | small | 0x00600000 | SK |  |
| 0x006021e0 | __commit | FW | crt | small | 0x00600000 | SK |  |
| 0x006022c0 | __isatty | FW | crt | stub | 0x00600000 | SK |  |
| 0x00602310 | _wctomb | FW | crt | small | 0x00600000 | SK |  |
| 0x006023e0 | __aulldiv | FW | crt | small | 0x00600000 | SK |  |
| 0x00602450 | __aullrem | FW | crt | small | 0x00600000 | SK |  |
| 0x006024d0 | __fcloseall | FW | crt | small | 0x00600000 | SK |  |
| 0x00602590 | __statusfp | FW | crt | stub | 0x00600000 | SK |  |
| 0x006025c0 | __clearfp | FW | crt | stub | 0x00600000 | SK |  |
| 0x006025f0 | __control87 | FW | crt | stub | 0x00600000 | SK |  |
| 0x00602640 | __controlfp | FW | crt | stub | 0x00600000 | SK |  |
| 0x00602670 | __fpreset | FW | crt | small | 0x00600000 | SK |  |
| 0x006026d0 | __abstract_cw | FW | crt | small | 0x00600000 | SK |  |
| 0x00602820 | __hw_cw | FW | crt | small | 0x00600000 | SK |  |
| 0x006029f0 | __abstract_sw | FW | crt | small | 0x00600000 | SK |  |
| 0x00602a70 | __fptrap | FW | crt | stub | 0x00600000 | SK |  |
| 0x00602a90 | __ZeroTail | FW | crt | small | 0x00600000 | SK |  |
| 0x00602b30 | __IncMan | FW | crt | small | 0x00600000 | SK |  |
| 0x00602bf0 | __RoundMan | FW | crt | small | 0x00600000 | SK |  |
| 0x00602cd0 | __CopyMan | FW | crt | stub | 0x00600000 | SK |  |
| 0x00602d20 | __FillZeroMan | FW | crt | stub | 0x00600000 | SK |  |
| 0x00602d60 | __IsZeroMan | FW | crt | stub | 0x00600000 | SK |  |
| 0x00602db0 | __ShrMan | FW | crt | small | 0x00600000 | SK |  |
| 0x00602ea0 | __ld12cvt | FW | crt | large | 0x00600000 | SK |  |
| 0x00603110 | FID_conflict:__ld12tod | FW | crt | stub | 0x00600000 | SK |  |
| 0x00603140 | FID_conflict:__ld12tod | FW | crt | stub | 0x00600000 | SK |  |
| 0x00603170 | __ld12told | FW | crt | small | 0x00600000 | SK |  |
| 0x00603240 | FID_conflict:__atodbl | FW | crt | stub | 0x00600000 | SK |  |
| 0x00603280 | __atoldbl | FW | crt | stub | 0x00600000 | SK |  |
| 0x006032c0 | FID_conflict:__atodbl | FW | crt | stub | 0x00600000 | SK |  |
| 0x00603300 | __fptostr | FW | crt | small | 0x00600000 | SK |  |
| 0x006033e0 | __fltout | FW | crt | small | 0x00600000 | SK |  |
| 0x00603450 | ___dtold | FW | crt | small | 0x00600000 | SK |  |
| 0x006035d0 | _wcslen | FW | crt | stub | 0x00600000 | SK |  |
| 0x00603620 | ___tzset | FW | crt | stub | 0x00600000 | SK |  |
| 0x00603650 | __tzset | FW | crt | large | 0x00600000 | SK |  |
| 0x006039b0 | __isindst | FW | crt | large | 0x00600000 | SK |  |
| 0x00603d20 | cvtdate | FW | crt | medium | 0x00600000 | SK |  |
| 0x00603f30 | __chsize | FW | crt | medium | 0x00600000 | SK |  |
| 0x006041e0 | ___addl | FW | crt | stub | 0x00600000 | SK |  |
| 0x00604230 | ___add_12 | FW | crt | small | 0x00600000 | SK |  |
| 0x006042e0 | ___shl_12 | FW | crt | small | 0x00600000 | SK |  |
| 0x00604360 | ___shr_12 | FW | crt | small | 0x00600000 | SK |  |
| 0x006043e0 | ___mtold12 | FW | crt | small | 0x00600000 | SK |  |
| 0x00604520 | ___strgtold12 | FW | crt | xlarge | 0x00600000 | SK |  |
| 0x00605140 | ___STRINGTOLD | FW | crt | small | 0x00600000 | SK |  |
| 0x006051a0 | $I10_OUTPUT | FW | crt | large | 0x00600000 | SK |  |
| 0x006056e0 | _wcstombs | FW | crt | medium | 0x00600000 | SK |  |
| 0x00605a40 | wcsncnt | FW | crt | stub | 0x00600000 | SK |  |
| 0x00605ab0 | _getenv | FW | crt | small | 0x00600000 | SK |  |
| 0x00605ba0 | __setmode | FW | crt | small | 0x00600000 | SK |  |
| 0x00605ce0 | ___ld12mul | FW | crt | large | 0x00600000 | SK |  |
| 0x00606110 | ___multtenpow12 | FW | crt | small | 0x00600000 | SK |  |
| 0x006061f0 | __mbsnbicoll | FW | crt | small | 0x00600000 | SK |  |
| 0x00606260 | ___wtomb_environ | FW | crt | small | 0x00600000 | SK |  |
| 0x00606330 | ___crtCompareStringW | FW | crt | medium | 0x00600000 | SK |  |
| 0x00606620 | wcsncnt | FW | crt | stub | 0x00600000 | SK |  |
| 0x00606690 | ___crtCompareStringA | FW | crt | large | 0x00600000 | SK |  |
| 0x00606af0 | _strncnt | FW | crt | small | 0x00600000 | SK |  |
| 0x00606b60 | ___crtsetenv | FW | crt | large | 0x00600000 | SK |  |
| 0x00606ed0 | findenv | FW | crt | small | 0x00600000 | SK |  |
| 0x00606f70 | copy_environ | FW | crt | small | 0x00600000 | SK |  |
| 0x00607070 | __mbschr | FW | crt | small | 0x00600000 | SK |  |
| 0x006075e0 | __filelength | FW | crt | small | 0x00600000 | SK |  |
| 0x006076a0 | crt_get_struct_field_0x10 | FW | crt | stub | 0x00600000 | SK |  |
| 0x006076c0 | __strupr | FW | crt | small | 0x00600000 | SK |  |
| 0x006077f0 | __strlwr | FW | crt | small | 0x00600000 | SK |  |
| 0x00607920 | FID_conflict:__mkdir | FW | crt | small | 0x00600000 | SK |  |
| 0x0061a000 | blit_sprite_16bit | RN | sprite | 326 bytes | 0x00610000 | SK | Rectangular sprite copy with transparency (color-key) and coordinate wrapping. Reads pixels from ... |
| 0x0061a759 | blit_rle_sprite_16bit | RN | sprite | 423 bytes | 0x00610000 | SK | RLE (run-length encoded) sprite blit with transparency, vertical flip, and horizontal clipping. R... |

**Total rows: 5149**