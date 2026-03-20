# Turn Pipeline — Call Graph Tree

Generated from `reverse_engineering/call_graphs/graph_data.json`.

## Statistics

- **Total unique functions reachable**: 1242
- **State-mutating functions**: 206
- **By category**:
  - ??: 70
  - AI: 10
  - FW: 288
  - GL: 276
  - MIXED: 19
  - UI: 579

## Entry Points

- `00487371` — **process_end_of_turn** (1744B)
- `00487A41` — **process_civ_turn** (3830B)
- `004F0A9C` — **process_city_turn** (1903B)
- `004EC3FE` — **process_city_production** (10931B)

## Rules

- Max depth: 6. Shows "(N more reachable)" at cutoff.
- FW (framework) functions filtered out at depth > 2.
- `*** STATE MUTATION ***` marks functions that modify game state.
- 1-line summary shown for nodes at depth ≤ 3.
- `(see above)` marks functions already expanded elsewhere in the same tree.

---

## process_end_of_turn (`00487371`, 1744B)

Reachable: 1043 functions (167 state-mutating)

```
process_end_of_turn [GL] (1744B)  *** STATE MUTATION ***
  → Master end-of-turn processing.
├── FUN_0000994F [??]
├── show_window_wrapper [UI] (33B)
│     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   └── show_window_inner [UI] (38B)
│         → Shows the window by calling manage_window then a follow-up display function.
│       ├── manage_window_show [UI] (37B)
│       │     → Calls manage_window_C40A with the window handle from this+8.
│       │   └── FUN_0000C40A [??]
│       └── surface_list_find_dirty [UI] (174B)
│             → Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── show_message [UI] (46B)
│     → Stores a message string in the message buffer at the specified slot index.
│   └── _strcpy_thunk [FW] (7B)
│         → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── show_dialog_message [UI] (43B)
│     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded 0, param_2, and par...
│   └── FUN_0051D564 [??] (178B)
├── get_civ_name [UI] (28B)
│     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   └── get_civ_adjective_name [GL] (145B)
│         → Returns the adjective form of a civilization name.
├── show_historians_report [UI] (1501B)
│     → Shows the Historian's report.
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_label_id [UI] (33B)
│   │     → Appends a localized label (by ID) to the global text buffer.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   └── popup_show_modal [UI] (999B)
│   │         → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│   │       ├── flush_display [UI] (21B)
│   │       ├── process_messages [UI] (21B)
│   │       │   └── FUN_0000BA4F [??]
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_edit_text [UI] (43B)
│   │       │   └── FUN_00002D4D [??]
│   │       ├── init_palette_system [UI] (21B)
│   │       ├── unknown — manage window [UI] (37B)
│   │       │   └── FUN_0000C692 [??]
│   │       ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION ***
│   │       │   ├── unknown (get drawing context) [UI] (37B)
│   │       │   │   └── focus_and_raise_window [UI] (57B)
│   │       │   ├── widget_scrollbar_dtor [UI] (57B)
│   │       │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │       │   │         (7 more reachable)
│   │       │   └── widget_dropdown_dtor [UI] (57B)
│   │       ├── popup_paint [UI] (1964B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   │   └── invalidate_region [UI] (180B)
│   │       │   │         (16 more reachable)
│   │       │   ├── show_window_wrapper [UI] (33B) (see above)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   ├── set_rect_wh [UI] (48B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │   └── FUN_0000858E [??]
│   │       │   ├── control_invalidate [UI] (65B)
│   │       │   │   ├── FUN_00008B00 [??]
│   │       │   │   └── FUN_00008B2D [??]
│   │       │   ├── draw_border_rect [UI] (61B)
│   │       │   │   └── draw_rect_outline [UI] (128B)
│   │       │   │         (13 more reachable)
│   │       │   ├── scale_sprite [UI] (35B)
│   │       │   ├── set_sprite_scale [UI] (33B)
│   │       │   │   └── scale_table_build_primary [UI] (657B)
│   │       │   │         (2 more reachable)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   │   └── rect_get_width [UI] (27B)
│   │       │   ├── widget_get_height [UI] (34B)
│   │       │   │   └── rect_get_height [UI] (28B)
│   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │       │   │   └── widget_inflate_rect [UI] (34B)
│   │       │   ├── popup_get_padded_height [UI] (42B)
│   │       │   ├── popup_render_label [UI] (226B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   └── port_fill_rect_pattern [UI] (201B)
│   │       │   │         (5 more reachable)
│   │       │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_render_text_at_offset [UI] (61B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   └── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │         (5 more reachable)
│   │       │   ├── popup_layout_dialog [UI] (4785B)
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_calc_max_text_height [UI] (132B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── popup_get_line_height [UI] (78B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B) (see above)
│   │       │   │   ├── popup_calc_button_area_height [UI] (46B)
│   │       │   │   ├── popup_calc_text_width [UI] (51B)
│   │       │   │   ├── popup_set_text_style [UI] (189B) (see above)
│   │       │   │   ├── popup_render_label [UI] (226B) (see above)
│   │       │   │   ├── popup_has_negative_line_count [UI] (83B)
│   │       │   │   ├── popup_layout_text [UI] (1326B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_get_radio_page_number [UI] (56B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B) (see above)
│   │       │   │   ├── unknown (popup_draw_icon) [UI] (55B) (see above)
│   │       │   │   ├── blit_rect_to_rect [UI] (95B)
│   │       │   │   │     (10 more reachable)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │       │   │   └── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── popup_redraw_visible_items [UI] (660B)
│   │       │   │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   │   ├── invalidate_region [UI] (180B) (see above)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   ├── draw_border_rect [UI] (61B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B) (see above)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B) (see above)
│   │       │   │   ├── popup_draw_item [UI] (706B)
│   │       │   │   │     (27 more reachable)
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   └── port_set_rect [UI] (91B)
│   │       │   ├── popup_create_window [UI] (693B)
│   │       │   │   ├── set_callback_0x44 [UI] (45B)
│   │       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │       │   │   │     (5 more reachable)
│   │       │   │   ├── unknown (set_font_size) [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── create_offscreen_surface [UI] (115B)
│   │       │   │   │     (37 more reachable)
│   │       │   │   └── create_offscreen_surface_b [UI] (119B)
│   │       │   │         (37 more reachable)
│   │       │   ├── popup_init_controls [UI] (6616B)
│   │       │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │       │   │   ├── create_text_button [UI] (133B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── set_button_owner [UI] (45B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── set_button_handler [UI] (45B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── set_button_click_callback [UI] (33B)
│   │       │   │   ├── create_checkbox [UI] (167B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── set_checkbox_value [UI] (33B)
│   │       │   │   ├── create_scrollbar [UI] (124B)
│   │       │   │   │     (9 more reachable)
│   │       │   │   ├── scrollbar_set_position [UI] (52B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── scrollbar_set_range [UI] (47B)
│   │       │   │   │     (3 more reachable)
│   │       │   │   ├── scrollbar_set_callback [UI] (33B)
│   │       │   │   ├── set_edit_max_chars [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── create_listbox_control [UI] (121B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── add_listbox_item [UI] (49B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── disable_civ_slot [UI] (133B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown (set selected item) [UI] (33B)
│   │       │   │   ├── pedia_button_create [UI] (139B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── unknown (set button callback) [UI] (33B)
│   │       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │       │   │   ├── scale_sprite [UI] (35B) (see above)
│   │       │   │   ├── widget_get_height [UI] (34B) (see above)
│   │       │   │   ├── scrollbar_init [UI] (93B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── scrollbar_create_window [UI] (207B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── scrollbar_set_position [UI] (33B)
│   │       │   │   ├── scrollbar_set_range [UI] (33B)
│   │       │   │   ├── unknown [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown [UI] (33B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B) (see above)
│   │       │   │   ├── popup_count_items_in_pane [UI] (93B)
│   │       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│   │       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   └── set_scrollbar [UI] (64B)
│   │       │   │         (2 more reachable)
│   │       │   ├── popup_draw_background [UI] (309B)
│   │       │   │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │       │   │   ├── unknown [UI] (56B)
│   │       │   │   └── tile_bitmap [UI] (391B)
│   │       │   │         (10 more reachable)
│   │       │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │   └── popup_render_label [UI] (226B) (see above)
│   │       │   ├── draw_3d_border [UI] (167B)
│   │       │   │   ├── draw_hline [UI] (69B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   └── draw_vline [UI] (69B)
│   │       │   │         (8 more reachable)
│   │       │   ├── port_draw_text_styled [UI] (238B)
│   │       │   │   ├── FUN_0000847F [??]
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   │   └── draw_string_palette [UI] (534B)
│   │       │   │         (2 more reachable)
│   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │   ├── FUN_0000847F [??] (see above)
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   │   └── draw_string_palette [UI] (534B) (see above)
│   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │       │   │         (7 more reachable)
│   │       │   └── unknown (invalidate_all_children) [UI] (115B)
│   │       │       ├── FUN_00008B00 [??] (see above)
│   │       │       └── FUN_00008B2D [??] (see above)
│   │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │       │   └── FUN_00003CFF [??]
│   │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │       │   └── FUN_00003D62 [??]
│   │       └── modal_dialog_run [UI] (283B)
│   │           ├── process_messages [UI] (21B) (see above)
│   │           ├── get_view_window_handle [UI] (28B) (see above)
│   │           ├── disable_parent_window [UI] (121B)
│   │           └── enable_parent_window [UI] (126B)
│   ├── text_newline [UI] (29B)
│   │     → Adds a newline to the global text buffer.
│   ├── text_begin_bold [UI] (29B)
│   │     → Begins bold text mode in the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   ├── show_message [UI] (46B) (see above)
│   ├── open_list_dialog [UI] (47B)
│   │     → Opens a list dialog with the given title and flags.
│   │   └── open_dialog_extended [UI] (56B)
│   │         → Opens a dialog with extended parameters, passing through to the dialog creation function.
│   │       └── popup_parse_text_file [UI] (2287B)
│   │           ├── mp_format_template_string [UI] (504B)
│   │           ├── popup_dialog_open [UI] (306B)
│   │           │   ├── rect_get_width [UI] (27B) (see above)
│   │           │   ├── rect_get_height [UI] (28B) (see above)
│   │           │   ├── unknown (popup list init) [UI] (64B)
│   │           │   │     (21 more reachable)
│   │           │   ├── popup_dialog_reset [UI] (1299B)
│   │           │   ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   │           │   ├── popup_set_bitmap [UI] (50B)
│   │           │   │     (1 more reachable)
│   │           │   ├── popup_set_field_10 [UI] (33B)
│   │           │   └── popup_set_scaled_width [UI] (99B)
│   │           ├── popup_add_edit_field [UI] (412B)
│   │           ├── popup_set_field_38 [UI] (33B)
│   │           ├── popup_set_page_layout [UI] (91B)
│   │           │   └── popup_set_radio_column_count [UI] (126B)
│   │           ├── popup_set_title [UI] (86B)
│   │           ├── popup_set_scaled_width [UI] (99B)
│   │           ├── popup_set_radio_selected [UI] (76B)
│   │           │   └── popup_find_radio_option_by_id [UI] (101B)
│   │           ├── popup_add_radio_option [UI] (566B)
│   │           │   ├── measure_text_height [UI] (42B) (see above)
│   │           │   └── popup_get_button_width [UI] (32B)
│   │           ├── popup_add_radio_checked [UI] (71B)
│   │           │   └── popup_add_radio_option [UI] (566B) (see above)
│   │           ├── popup_add_text_input [UI] (566B)
│   │           │   └── measure_text_height [UI] (42B) (see above)
│   │           └── popup_add_action_button_label [UI] (119B)
│   ├── historians_cleanup [FW] (12B)
│   │     → Stack dealloc thunk.
│   │   └── popup_dialog_close [UI] (47B)
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │       └── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   ├── historians_seh_restore [FW] (14B)
│   │     → SEH teardown.
│   ├── text_append_ordinal_suffix [FW] (29B)
│   │     → Appends an ordinal suffix (st/nd/rd/th) to the global text buffer.
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman").
│   ├── open_text_file_section_fallback [FW] (131B)
│   │     → Tries to open a text file section.
│   ├── read_next_line [FW] (171B)
│   │     → Reads the next line from the open text file into DAT_00679640 (255 char buffer).
│   ├── open_file_skip_lines [FW] (117B)
│   │     → Opens a text file at a given section and skips param_3 lines.
│   ├── civ_has_tech [GL] (181B)
│   │     → Checks if a civilization (param_1) has a specific technology (param_2).
│   │   └── bit_index_to_byte_mask [GL] (45B)
│   │         → Converts a bit index to byte offset and bit mask.
│   ├── rng_range [GL] (113B)  *** STATE MUTATION ***
│   │     → Returns a random integer in the range [param_1, param_2].
│   │   └── rng_next_float [GL] (94B)  *** STATE MUTATION ***
│   │         → Generates the next random number using a linear congruential generator: seed = seed * 0x19660D + 0x3C6EF35F.
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object.
│   │   ├── unknown (popup list init) [UI] (64B) (see above)
│   │   └── popup_dialog_reset [UI] (1299B) (see above)
│   ├── popup_add_edit_field [UI] (412B)
│   │     → Adds a text edit field to a popup dialog.
│   └── _strcpy_thunk [FW] (7B) (see above)
├── unknown (manage pedia window) [UI] (37B)
│     → Calls manage_window_C44D with the window handle at this+8.
│   └── FUN_0000C44D [??]
├── civ_has_active_wonder [GL] (142B)
│     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   └── get_wonder_city [GL] (57B)
│         → Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│       └── is_wonder_obsolete [GL] (120B)
│             → Checks if a wonder has been made obsolete by any civ researching its obsolescence tech.
│           └── civ_has_tech [GL] (181B) (see above)
├── net_send_message [GL] (6649B)  *** STATE MUTATION ***
│     → Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) (see above)
│   ├── net_send_to_player [GL] (305B)  *** STATE MUTATION ***
│   │     → Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B)  *** STATE MUTATION ***
│   │     → Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B)
│   │     → Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B)
│   │     → Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B)
│   │         → Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B) (see above)
│   ├── net_msg_init_with_version [GL] (94B)
│   │     → Initializes a network message header with version string at offset 0x10.
│   │   └── net_msg_init_header [GL] (55B) (see above)
│   ├── unknown (init version message) [GL] (65B)
│   │     → Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) (see above)
│   │   └── netmgr_fill_game_info [GL] (598B)
│   │         → Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B)
│   │     → Creates a type-0x2F network message with additional fields for chat or popup.
│   │   └── net_msg_init_header [GL] (55B) (see above)
│   ├── unknown (init type-4 message) [GL] (45B)
│   │     → Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) (see above)
│   ├── unknown (init type-6 message) [GL] (45B)
│   │     → Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) (see above)
│   ├── unknown (init type-0x13 message) [GL] (60B)
│   │     → Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) (see above)
│   │   └── netmgr_fill_game_info [GL] (598B) (see above)
│   ├── unknown (init type-0x69 message) [GL] (56B)
│   │     → Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) (see above)
│   ├── diff_engine_serialize_game [GL] (835B)  *** STATE MUTATION ***
│   │     → Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B)
│   │   │     → Computes a simple additive checksum over a data buffer.
│   │   └── diff_engine_append_data [GL] (98B)
│   │         → Appends data to a serialization buffer, advancing the write cursor.
│   ├── diff_engine_serialize_partial [GL] (308B)  *** STATE MUTATION ***
│   │     → Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) (see above)
│   │   └── diff_engine_append_data [GL] (98B) (see above)
│   ├── diff_engine_serialize_full_compressed [GL] (508B)  *** STATE MUTATION ***
│   │     → Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) (see above)
│   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │     → Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and 6 (cities) which use...
│   │   ├── diff_engine_append_data [GL] (98B) (see above)
│   │   └── rle_encode (unnamed) [GL] (588B)
│   │         → RLE-encodes a data buffer.
│   ├── diff_engine_serialize_changed_only [GL] (466B)  *** STATE MUTATION ***
│   │     → Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) (see above)
│   │   ├── diff_engine_calc_total_size [GL] (152B) (see above)
│   │   └── diff_engine_append_data [GL] (98B) (see above)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) (see above)
│   │   ├── rect_get_height [UI] (28B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── get_font_height [UI] (28B) (see above)
│   │   ├── measure_text_height [UI] (42B) (see above)
│   │   ├── reset_sprite_scale [UI] (28B)
│   │   │     → Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B) (see above)
│   │   ├── get_civ_adjective_name [GL] (145B) (see above)
│   │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   ├── tile_bitmap [UI] (391B) (see above)
│   │   ├── port_set_rect_from_self [UI] (63B) (see above)
│   │   ├── port_set_rect [UI] (91B) (see above)
│   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── netmgr_build_packet [GL] (405B)
│   │     → Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) (see above)
│   ├── fatal_error [FW] (70B)
│   │     → Reports a fatal error: records error number, formats error message with file/line info, shows message box.
│   │   └── unknown (show_fatal_error_box) [UI] (41B)
│   │         → Shows "SMEDS Application Error" message box.
│   │       └── FUN_0000DD00 [??]
│   ├── _strcpy_thunk [FW] (7B) (see above)
│   └── _strcat [FW] (224B)
│         → CRT strcat — finds end of dest string then copies source.
├── calc_year_from_turn [GL] (540B)
│     → Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c490).
│   └── clamp [FW] (57B)
│         → Clamps a value to [min, max] range.
├── calc_power_graph_rankings [GL] (2094B)  *** STATE MUTATION ***
│     → Calculates power rankings for all civilizations, updates the power graph history, determines the leading civilization, and triggers war d...
│   ├── city_count_content_citizens [GL] (125B)
│   │     → Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION ***
│   │     → Adjusts the attitude value between two civs by a delta.
│   │   ├── get_attitude_raw [GL] (47B)
│   │   │     → Returns the raw attitude value of civ param_1 toward civ param_2.
│   │   └── set_attitude_value [GL] (120B)  *** STATE MUTATION ***
│   │         → Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100.
│   ├── has_spaceship_launched [GL] (47B)
│   │     → Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   ├── spaceship_is_enabled [GL] (90B)
│   │     → Returns whether the spaceship victory condition is enabled.
│   └── clamp [FW] (57B) (see above)
├── spawn_barbarians [GL] (3297B)  *** STATE MUTATION ***
│     → Main barbarian spawning logic.
│   ├── is_tile_valid [GL] (80B)
│   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── show_message [UI] (46B) (see above)
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool.
│   ├── find_nearest_city [GL] (400B)
│   │     → Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── has_building [GL] (122B)
│   │   │     → Checks if a city has a specific building.
│   │   │   └── bit_index_to_byte_mask [GL] (45B) (see above)
│   │   ├── calc_movement_cost [GL] (94B)
│   │   │     → Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diagonal_movement_cost.
│   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   └── get_tile_continent_if_land [GL] (72B)
│   │         → Returns continent ID only if tile is not ocean, otherwise -1.
│   │       ├── is_tile_ocean [GL] (57B)
│   │       │   └── get_tile_terrain_raw [GL] (41B)
│   │       │       └── get_tile_ptr [GL] (90B)
│   │       └── get_tile_continent [GL] (39B)
│   │           └── get_tile_ptr [GL] (90B) (see above)
│   ├── show_game_popup_2arg [UI] (39B)
│   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   └── show_unit_type_picker [UI] (260B)
│   │         → Shows a unit type picker dialog for the Civilopedia.
│   │       ├── select_list_item [UI] (38B) (see above)
│   │       ├── popup_dialog_create [UI] (93B) (see above)
│   │       ├── popup_add_button [UI] (360B)
│   │       │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   └── init_editor_scrollbar [UI] (34B) (see above)
│   │       └── sprite_init_empty [UI] (140B)
│   │           ├── port_alloc_rect [UI] (58B)
│   │           │   └── port_alloc [UI] (325B)
│   │           │         (16 more reachable)
│   │           ├── port_set_color [UI] (43B)
│   │           │   └── port_fill_rect [UI] (236B)
│   │           │         (6 more reachable)
│   │           └── unknown (sprite extract with rect params) [UI] (88B)
│   │               ├── sprite_lock_data [UI] (56B)
│   │               └── sprite_extract_from_oleitem [UI] (1951B)
│   │                     (24 more reachable)
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── update_tile_all_players [UI] (124B)
│   │     → Updates a single tile for all active players.
│   │   └── update_map_tile [UI] (50B)
│   │         → Updates a single map tile (radius 0, current player, with invalidate).
│   │       └── update_map_area [UI] (313B)  *** STATE MUTATION ***
│   │           ├── tile_to_screen [UI] (151B)
│   │           │   └── wrap_x [GL] (94B)
│   │           ├── is_tile_visible [UI] (99B)
│   │           │   └── is_tile_in_viewport_rect [UI] (97B)
│   │           │         (1 more reachable)
│   │           ├── redraw_tile_area [UI] (352B)
│   │           │   ├── draw_complete_tile [UI] (495B)
│   │           │   │     (137 more reachable)
│   │           │   ├── is_tile_visible [UI] (99B) (see above)
│   │           │   ├── draw_city_labels [UI] (871B)
│   │           │   │     (10 more reachable)
│   │           │   ├── calc_tile_group_rect [UI] (191B)
│   │           │   │     (1 more reachable)
│   │           │   ├── wrap_x [GL] (94B) (see above)
│   │           │   └── port_set_rect [UI] (91B) (see above)
│   │           ├── invalidate_tile_area [UI] (60B)
│   │           │   ├── invalidate_region [UI] (180B) (see above)
│   │           │   └── calc_tile_group_rect [UI] (191B) (see above)
│   │           ├── reset_sprite_scale [UI] (28B) (see above)
│   │           ├── set_current_zoom_scale [UI] (41B)
│   │           │   └── set_sprite_scale [UI] (33B) (see above)
│   │           └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── enqueue_mp_event [MIXED] (398B)
│   │     → Enqueues a multiplayer event message.
│   │   └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── calc_city_value_for_capture [GL] (277B)
│   │     → Calculates the strategic value of a city (param_1 = city index) for capture/transfer purposes.
│   ├── clamp [FW] (57B) (see above)
│   ├── wrap_x [GL] (94B)
│   │     → Wraps an X coordinate for a cylindrical (non-flat) map.
│   ├── find_unit_stack_at_xy [GL] (231B)
│   │     → Finds the first unit of any civ at map position (param_1, param_2).
│   │   ├── validate_unit_stack [GL] (1050B)  *** STATE MUTATION ***
│   │   │     → Validates the integrity of a unit's linked list stack.
│   │   │   ├── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_invert_mirror [GL] (131B)  *** STATE MUTATION ***
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   └── rle_encode (unnamed) [GL] (588B) (see above)
│   │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── put_down_unit [GL] (640B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── find_first_unit_at [GL] (186B)
│   │   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │         (44 more reachable)
│   │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── sum_stack_property [GL] (724B)
│   │   │       ├── get_next_unit_in_stack [GL] (65B)
│   │   │       │   └── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   │       └── get_first_unit_in_stack [GL] (118B) (see above)
│   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │     → Follows prev pointers to find the first unit in the stack.
│   │   │   └── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   └── get_unit_owner_at [GL] (66B)
│   │         → Returns the civ with units at a tile, or -1.
│   │       ├── get_tile_owner [GL] (100B)
│   │       │   ├── is_tile_valid [GL] (80B) (see above)
│   │       │   └── get_tile_ptr [GL] (90B) (see above)
│   │       └── get_tile_improvements [GL] (39B)
│   │           └── get_tile_ptr [GL] (90B) (see above)
│   ├── set_unit_goto_order [GL] (66B)  *** STATE MUTATION ***
│   │     → Sets a unit's order to "goto" (3).
│   ├── relocate_unit_in_place [GL] (60B)  *** STATE MUTATION ***
│   │     → Relocates a unit to its own current position (used to refresh stack linkage).
│   │   └── relocate_unit [GL] (388B)  *** STATE MUTATION ***
│   │         → Moves a unit from its current position to a new position by picking it up and putting it down.
│   │       ├── show_dialog_message [UI] (43B) (see above)
│   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │       ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │       ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │       ├── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
│   │       └── put_down_unit [GL] (640B)  *** STATE MUTATION *** (see above)
│   ├── create_unit [GL] (1675B)  *** STATE MUTATION ***
│   │     → Creates a new unit of the specified type for a given civilization at a map position.
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── process_unit_move_visibility [GL] (4250B)  *** STATE MUTATION ***
│   │   │     → Major game logic function that processes visibility updates after a unit moves.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── cancel_goto_if_blocked [GL] (90B)  *** STATE MUTATION ***
│   │   │   ├── cancel_goto_for_stack [GL] (192B)  *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   └── is_tile_ocean [GL] (57B) (see above)
│   │   │   ├── city_set_specialist_slot [GL] (126B)  *** STATE MUTATION ***
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   │       ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │       ├── get_tile_owner [GL] (100B) (see above)
│   │   │   │       └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │   └── update_map_area [UI] (313B)  *** STATE MUTATION *** (see above)
│   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │   └── update_map_radius1 [UI] (50B)
│   │   │   │       └── update_map_area [UI] (313B)  *** STATE MUTATION *** (see above)
│   │   │   ├── ai_add_goal_a [AI] (958B)  *** STATE MUTATION ***
│   │   │   │   ├── ai_shift_goals_down_a [AI] (184B)  *** STATE MUTATION ***
│   │   │   │   │   └── ai_shift_goals_down_a [AI] (184B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │   └── calc_unit_movement_points [GL] (516B)
│   │   │   │   │         (2 more reachable)
│   │   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   │   └── get_unit_moves_remaining [GL] (69B) (see above)
│   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── process_diplomatic_contact [GL] (7326B)  *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   │   └── FUN_0051D564 [??] (178B) (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── diplo_demand_ally_help [MIXED] (919B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION ***
│   │   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION ***
│   │   │   │   │   │     (504 more reachable)
│   │   │   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION ***
│   │   │   │   │   │     (141 more reachable)
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B)  *** STATE MUTATION ***
│   │   │   │   │   │     (172 more reachable)
│   │   │   │   │   ├── break_alliance [MIXED] (632B)  *** STATE MUTATION ***
│   │   │   │   │   │     (169 more reachable)
│   │   │   │   │   └── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── ai_diplomacy_negotiate [GL] (16263B)  *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── open_intelligence_dialog [UI] (535B)
│   │   │   │   │   │     (26 more reachable)
│   │   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_patience_threshold [GL] (211B)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION ***
│   │   │   │   │   │     (450 more reachable)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   │   │     (5 more reachable)
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_form_alliance [GL] (374B)  *** STATE MUTATION ***
│   │   │   │   │   │     (455 more reachable)
│   │   │   │   │   ├── diplo_sign_ceasefire [GL] (315B)  *** STATE MUTATION ***
│   │   │   │   │   │     (455 more reachable)
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_gold_to_attitude [GL] (104B)
│   │   │   │   │   ├── diplo_ai_negotiate [MIXED] (10271B)  *** STATE MUTATION ***
│   │   │   │   │   │     (564 more reachable)
│   │   │   │   │   ├── diplo_favor_menu [MIXED] (4878B)  *** STATE MUTATION ***
│   │   │   │   │   │     (288 more reachable)
│   │   │   │   │   ├── diplo_check_war_weariness [UI] (178B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   ├── diplo_show_main_menu [UI] (747B)
│   │   │   │   │   │     (191 more reachable)
│   │   │   │   │   ├── unknown (set trade route value) [GL] (29B)  *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION ***
│   │   │   │   │   ├── get_attitude_raw [GL] (47B) (see above)
│   │   │   │   │   ├── set_attitude_value [GL] (120B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   │   ├── intel_play_animation [UI] (181B)
│   │   │   │   │   │     (71 more reachable)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION ***
│   │   │   │   │   │     (546 more reachable)
│   │   │   │   │   ├── event_check_negotiation [GL] (900B)  *** STATE MUTATION ***
│   │   │   │   │   │     (676 more reachable)
│   │   │   │   │   ├── calc_war_readiness [GL] (820B)  *** STATE MUTATION ***
│   │   │   │   │   │     (42 more reachable)
│   │   │   │   │   ├── check_can_declare_war [GL] (365B)
│   │   │   │   │   ├── refresh_status_panel [UI] (297B)
│   │   │   │   │   │     (137 more reachable)
│   │   │   │   │   └── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION ***
│   │   │   │   │   └── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   └── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   └── get_attitude_raw [GL] (47B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── parleywin_start_session [MIXED] (807B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION ***
│   │   │   │   │   │     (67 more reachable)
│   │   │   │   │   ├── chatwin_get_text_length [UI] (37B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── parleywin_build_title [UI] (324B)
│   │   │   │   │   │     (8 more reachable)
│   │   │   │   │   ├── parley_set_negotiation_state [UI] (536B)  *** STATE MUTATION ***
│   │   │   │   │   │     (178 more reachable)
│   │   │   │   │   ├── widget_set_cursor_pos [UI] (43B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── widget_get_text_length [UI] (37B)
│   │   │   │   │   │     (4 more reachable)
│   │   │   │   │   ├── set_active_surface [UI] (74B)
│   │   │   │   │   │     (15 more reachable)
│   │   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   │   └── set_active_control [UI] (38B)
│   │   │   │   ├── event_check_negotiation [GL] (900B)  *** STATE MUTATION ***
│   │   │   │   │   └── event_dispatch_actions [GL] (360B)  *** STATE MUTATION ***
│   │   │   │   │         (661 more reachable)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   └── should_declare_war [GL] (191B) (see above)
│   │   │   │   ├── ai_tech_exchange [GL] (1182B)  *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B) (see above)
│   │   │   │   │   └── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── check_join_war [GL] (595B)  *** STATE MUTATION ***
│   │   │   │       ├── show_message [UI] (46B) (see above)
│   │   │   │       ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │       ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │       └── get_civ_people_name [GL] (145B) (see above)
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   ├── set_stack_seen_by [GL] (92B)  *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   └── set_unit_seen_by [GL] (96B)  *** STATE MUTATION ***
│   │   │   ├── sum_stack_property [GL] (724B) (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION ***
│   │   │   │       └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B) (see above)
│   │   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       └── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── find_nearest_city [GL] (400B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   ├── unknown (tutorial_show_advice) [UI] (38B)
│   │   │     → Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│   │   │   └── show_unit_type_picker [UI] (260B) (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 for sea, Magellan +1 f...
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   └── get_unit_hp_remaining [GL] (98B)  *** STATE MUTATION ***
│   │   │       └── get_unit_max_hp [GL] (45B) (see above)
│   │   └── put_down_unit [GL] (640B)  *** STATE MUTATION *** (see above)
│   ├── delete_all_units_in_stack [GL] (144B)  *** STATE MUTATION ***
│   │     → Deletes every unit in a stack by iterating from first to last.
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   └── delete_unit [GL] (1129B)  *** STATE MUTATION ***
│   │         → Deletes a unit.
│   │       ├── FUN_0000C494 [??]
│   │       ├── FUN_0000C679 [??]
│   │       ├── show_dialog_message [UI] (43B) (see above)
│   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │       ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │       ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │       └── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
│   ├── check_adjacent_enemy_continent [GL] (297B)  *** STATE MUTATION ***
│   │     → Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean type match).
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── wrap_x [GL] (94B) (see above)
│   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   └── get_unit_owner_at [GL] (66B) (see above)
│   ├── get_tile_ptr [GL] (90B)
│   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── is_tile_valid [GL] (80B) (see above)
│   ├── is_tile_ocean [GL] (57B)
│   │     → Returns true if terrain type == 10 (ocean).
│   │   └── get_tile_terrain_raw [GL] (41B) (see above)
│   ├── get_tile_continent [GL] (39B)
│   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │   └── get_tile_ptr [GL] (90B) (see above)
│   ├── get_tile_explored [GL] (71B)
│   │     → Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   └── get_tile_ptr [GL] (90B) (see above)
│   └── get_unit_owner_at [GL] (66B)
│         → Returns the civ with units at a tile, or -1.
│       ├── get_tile_owner [GL] (100B) (see above)
│       └── get_tile_improvements [GL] (39B) (see above)
├── update_pollution_counter [GL] (487B)  *** STATE MUTATION ***
│     → Updates the global pollution counter.
│   ├── show_dialog_message [UI] (43B) (see above)
│   ├── has_building [GL] (122B) (see above)
│   ├── apply_global_warming [GL] (819B)  *** STATE MUTATION ***
│   │     → Applies global warming effects to the map.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── wrap_x [GL] (94B) (see above)
│   │   ├── get_civ_vis_ptr [GL] (48B) (see above)
│   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   ├── update_civ_visibility [GL] (75B)  *** STATE MUTATION ***
│   │   │     → Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility map.
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── set_civ_tile_data [GL] (325B)  *** STATE MUTATION *** (see above)
│   │   ├── get_tile_explored [GL] (71B) (see above)
│   │   ├── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION ***
│   │   │     → Sets or clears improvement bits on a tile.
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   ├── set_tile_terrain [GL] (295B)  *** STATE MUTATION ***
│   │   │     → Sets the terrain type for a tile (lower 4 bits of byte 0).
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   ├── set_tile_owner [GL] (333B)  *** STATE MUTATION ***
│   │   │     → Sets the tile owner (upper nibble of byte 5).
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION *** (see above)
│   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION *** (see above)
│   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   └── popcount_byte [FW] (76B)
│         → Counts the number of set bits in the low 8 bits of param_1 (population count).
├── check_tech_advance [GL] (403B)  *** STATE MUTATION ***
│     → Checks if a civilization has accumulated enough research to advance to the next tech.
│   ├── has_building [GL] (122B) (see above)
│   ├── show_throne_room [MIXED] (247B)  *** STATE MUTATION ***
│   │     → Shows the throne room improvement screen.
│   │   ├── init_throne_context [UI] (405B)
│   │   │     → Initializes the throne room display context.
│   │   │   ├── init_sprite_surface_mgr [UI] (133B) (see above)
│   │   │   ├── init_render_surface [UI] (274B)
│   │   │   ├── unknown (pedia object initializer) [UI] (34B)
│   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   ├── get_screen_rect [UI] (48B)
│   │   │   └── palette_init [UI] (145B)
│   │   │       ├── FUN_0000E780 [??]
│   │   │       ├── palette_generate_random_id [UI] (75B)
│   │   │       └── unknown (palette_create) [UI] (60B)
│   │   ├── destroy_throne_context [UI] (177B)
│   │   │     → Destroys the throne room display context, releasing all resources.
│   │   │   └── pedia_free_resource [UI] (57B)
│   │   └── throne_room_add_improvement [MIXED] (1799B)  *** STATE MUTATION ***
│   │         → Manages the throne room improvement selection and animation.
│   │       ├── flush_display [UI] (21B) (see above)
│   │       ├── end_paint [UI] (32B) (see above)
│   │       ├── show_window_wrapper [UI] (33B) (see above)
│   │       ├── manage_window_show [UI] (37B) (see above)
│   │       ├── start_cursor_blink [UI] (39B)
│   │       │   ├── get_view_window_handle [UI] (28B) (see above)
│   │       │   └── capture_mouse [UI] (29B)
│   │       ├── stop_cursor_blink [UI] (39B)
│   │       │   ├── get_view_window_handle [UI] (28B) (see above)
│   │       │   └── release_mouse_capture [UI] (22B)
│   │       ├── init_palette_system [UI] (21B) (see above)
│   │       ├── load_throne_dll [UI] (308B)
│   │       │   ├── set_callback_paint [UI] (45B)
│   │       │   ├── update_palette [UI] (43B)
│   │       │   │   └── FUN_0000C280 [??]
│   │       │   ├── pedia_set_resource [UI] (67B)
│   │       │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │       │   │   └── FUN_0000C763 [??]
│   │       │   ├── create_offscreen_surface_b [UI] (119B) (see above)
│   │       │   └── surface_init_8 [UI] (96B)
│   │       │       ├── get_view_window_handle [UI] (28B) (see above)
│   │       │       └── set_child_wndproc [UI] (55B)
│   │       ├── draw_throne_title [UI] (221B)
│   │       │   ├── text_begin [UI] (29B) (see above)
│   │       │   ├── text_add_string [UI] (33B) (see above)
│   │       │   ├── port_measure_text [UI] (219B)
│   │       │   │   ├── FUN_00003ECA [??]
│   │       │   │   ├── FUN_0000847F [??] (see above)
│   │       │   │   └── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   └── unknown (set/get draw color) [UI] (38B) (see above)
│   │       ├── render_throne_room [UI] (3024B)
│   │       │   ├── flush_display [UI] (21B) (see above)
│   │       │   ├── port_destructor [UI] (114B)
│   │       │   │   ├── port_init [UI] (258B)
│   │       │   │   ├── port_unlock [UI] (83B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── surface_is_locked [UI] (44B)
│   │       │   │   └── destroy_dib_surface [UI] (155B)
│   │       │   │         (2 more reachable)
│   │       │   ├── load_gif_resource [UI] (847B)
│   │       │   │   ├── flush_display [UI] (21B) (see above)
│   │       │   │   ├── port_init_buffer [UI] (36B)
│   │       │   │   │     (12 more reachable)
│   │       │   │   ├── port_draw_text_rect [UI] (77B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── palette_set_entries [UI] (142B)
│   │       │   │   │     (3 more reachable)
│   │       │   │   ├── check_topdown [UI] (41B)
│   │       │   │   └── flip_surface_vertical [UI] (249B)
│   │       │   │         (9 more reachable)
│   │       │   ├── sprite_free_data [UI] (84B)
│   │       │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │       │   │   ├── sprite_lock_data [UI] (56B) (see above)
│   │       │   │   └── sprite_extract_from_oleitem [UI] (1951B) (see above)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       │   └── sprite_replace_color [UI] (218B)
│   │       │       ├── rect_get_height [UI] (28B) (see above)
│   │       │       ├── sprite_lock_data [UI] (56B) (see above)
│   │       │       ├── sprite_unlock_data [UI] (56B)
│   │       │       └── sprite_is_locked [UI] (44B)
│   │       ├── throne_room_select_piece [UI] (3336B)
│   │       │   ├── flush_display [UI] (21B) (see above)
│   │       │   ├── add_click_region [UI] (153B)
│   │       │   │   └── set_rect_wh [UI] (48B) (see above)
│   │       │   ├── port_destructor [UI] (114B) (see above)
│   │       │   ├── load_gif_resource [UI] (847B) (see above)
│   │       │   ├── sprite_free_data [UI] (84B) (see above)
│   │       │   ├── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       │   └── sprite_replace_color [UI] (218B) (see above)
│   │       ├── unknown (pedia set and display resource) [UI] (45B)
│   │       │   └── unknown (update pedia display surface) [UI] (49B)
│   │       │       └── select_palette [UI] (57B)
│   │       ├── unknown (manage pedia window) [UI] (37B) (see above)
│   │       ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │       ├── animate_screen_reveal [UI] (1155B)
│   │       │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   ├── flush_display [UI] (21B) (see above)
│   │       │   ├── invalidate_region [UI] (180B) (see above)
│   │       │   └── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │       ├── port_alloc_rect [UI] (58B) (see above)
│   │       ├── port_blit_stretch [UI] (443B)
│   │       │   ├── port_lock [UI] (287B)
│   │       │   │   ├── check_topdown [UI] (41B) (see above)
│   │       │   │   └── get_pixel_buffer [UI] (39B)
│   │       │   ├── port_unlock [UI] (83B) (see above)
│   │       │   ├── surface_is_locked [UI] (44B) (see above)
│   │       │   ├── get_surface_buffer_handle [UI] (28B)
│   │       │   ├── unknown (get surface base) [UI] (28B)
│   │       │   ├── check_topdown [UI] (41B) (see above)
│   │       │   └── copy_rect_8bit [UI] (187B)
│   │       ├── port_get_font [UI] (75B)
│   │       │   └── FUN_00003FEB [??]
│   │       ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       └── modal_dialog_run [UI] (283B) (see above)
│   ├── calc_tech_paradigm_cost [GL] (90B)
│   │     → Calculates the research cost for a given tech level.
│   └── calc_civ_score [GL] (1542B)  *** STATE MUTATION ***
│         → Calculates civilization score for param_1.
│       ├── city_count_content_citizens [GL] (125B) (see above)
│       └── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION ***
│             → Recalculates all spaceship statistics for a civ: mass, fuel ratio, energy ratio, life support ratio, flight time, success probability, an...
│           ├── calc_year_from_turn [GL] (540B) (see above)
│           ├── has_spaceship_launched [GL] (47B) (see above)
│           ├── civ_has_tech [GL] (181B) (see above)
│           ├── spaceship_get_clamped_count [GL] (89B)
│           │   └── spaceship_get_max_component [GL] (264B)
│           └── spaceship_calc_population_capacity [GL] (90B)
├── begin_turn_unit_reset [GL] (615B)  *** STATE MUTATION ***
│     → Resets unit movement/status for a new turn.
│   ├── refresh_map_visibility [GL] (259B)  *** STATE MUTATION ***
│   │     → Refreshes map visibility for all tiles and unit positions.
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   └── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   ├── spy_diplomat_action [GL] (1271B)  *** STATE MUTATION ***
│   │     → Executes a spy/diplomat's action in an enemy city — handles the chance of being caught (based on veteran status and whether exposed).
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── find_nearest_city [GL] (400B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── spy_diplomat_action [GL] (1271B)  *** STATE MUTATION *** (see above)
│   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── relocate_unit [GL] (388B)  *** STATE MUTATION *** (see above)
│   │   ├── delete_unit_visible [GL] (456B)  *** STATE MUTATION ***
│   │   │     → Deletes a unit and refreshes the map display at its former position.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   └── delete_unit_safely [GL] (677B)  *** STATE MUTATION ***
│   │   │       ├── FUN_0000C494 [??] (see above)
│   │   │       ├── is_tile_valid [GL] (80B) (see above)
│   │   │       ├── show_dialog_message [UI] (43B) (see above)
│   │   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │       ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │       ├── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   │   │       ├── delete_all_units_in_stack [GL] (144B)  *** STATE MUTATION *** (see above)
│   │   │       ├── load_unit_onto_ship [GL] (1912B)  *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │       │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │       │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │       │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │       │   ├── set_unit_goto_order [GL] (66B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── relocate_unit [GL] (388B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── eject_air_units [GL] (343B)  *** STATE MUTATION ***
│   │   │       │   │     (33 more reachable)
│   │   │       │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │       │   └── get_tile_continent [GL] (39B) (see above)
│   │   │       └── is_tile_ocean [GL] (57B) (see above)
│   │   └── refresh_unit_movement [GL] (40B)  *** STATE MUTATION ***
│   │         → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its movement — this is used...
│   │       └── calc_unit_movement_points [GL] (516B) (see above)
│   ├── refresh_unit_movement [GL] (40B)  *** STATE MUTATION ***
│   │     → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its movement — this is used...
│   │   └── calc_unit_movement_points [GL] (516B) (see above)
│   └── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION *** (see above)
├── has_spaceship_launched [GL] (47B)
│     → Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
├── is_spaceship_arriving [GL] (88B)
│     → Returns 1 if civ param_1's spaceship has launched AND the arrival turn has not yet been reached.
│   └── has_spaceship_launched [GL] (47B) (see above)
├── enqueue_mp_event [MIXED] (398B)
│     → Enqueues a multiplayer event message.
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   └── _strcpy_thunk [FW] (7B) (see above)
└── clamp [FW] (57B)
      → Clamps a value to [min, max] range.
```

---

## process_civ_turn (`00487A41`, 3830B)

Reachable: 1204 functions (193 state-mutating)

```
process_civ_turn [GL] (3830B)  *** STATE MUTATION ***
  → Processes a complete civ turn: unit orders, city production, tax/science/happiness calculations, AI attitude adjustments, tribute demands...
├── FUN_00009429 [??]
├── FUN_0000DADA [??]
├── FUN_0000DB36 [??]
├── civ_has_active_wonder [GL] (142B)
│     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   └── get_wonder_city [GL] (57B)
│         → Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│       └── is_wonder_obsolete [GL] (120B)
│             → Checks if a wonder has been made obsolete by any civ researching its obsolescence tech.
│           └── civ_has_tech [GL] (181B)
│               └── bit_index_to_byte_mask [GL] (45B)
├── network_poll [MIXED] (14034B)  *** STATE MUTATION ***
│     → The main network polling function.
├── has_spaceship_launched [GL] (47B)
│     → Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
├── has_spaceship_built [GL] (47B)
│     → Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
├── civ_has_tech [GL] (181B)
│     → Checks if a civilization (param_1) has a specific technology (param_2).
│   └── bit_index_to_byte_mask [GL] (45B) (see above)
├── process_city_turn [GL] (1903B)  *** STATE MUTATION ***
│     → Main city turn processing function.
│   ├── FUN_00009429 [??] (see above)
│   ├── has_building [GL] (122B)
│   │     → Checks if a city has a specific building.
│   │   └── bit_index_to_byte_mask [GL] (45B) (see above)
│   ├── get_wonder_city [GL] (57B) (see above)
│   ├── civ_has_active_wonder [GL] (142B) (see above)
│   ├── init_city_production_globals [GL] (77B)  *** STATE MUTATION ***
│   │     → Initializes two global production variables from a city's current production type and accumulated shields.
│   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION ***
│   │     → Entry point for full city production calculation.
│   │   ├── evaluate_city_tiles [GL] (653B)  *** STATE MUTATION ***
│   │   │     → Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530 array.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   └── validate_unit_stack [GL] (1050B)  *** STATE MUTATION ***
│   │   │   │       ├── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION ***
│   │   │   │       │     (101 more reachable)
│   │   │   │       ├── put_down_unit [GL] (640B)  *** STATE MUTATION ***
│   │   │   │       │     (104 more reachable)
│   │   │   │       └── sum_stack_property [GL] (724B)
│   │   │   │             (103 more reachable)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   ├── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   └── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │       ├── get_tile_owner [GL] (100B)
│   │   │   │       │     (1 more reachable)
│   │   │   │       └── get_tile_improvements [GL] (39B)
│   │   │   │             (1 more reachable)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── calc_capital_distance_and_corruption [GL] (1048B)  *** STATE MUTATION ***
│   │   │     → Calculates distance to capital and corruption-related variables for a city.
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── check_trade_route_path [GL] (682B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── find_path [GL] (4118B)  *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── set_map_scroll_position [UI] (98B)
│   │   │   │   │   │     (247 more reachable)
│   │   │   │   │   ├── debug_show_message [UI] (33B)
│   │   │   │   │   │     (4 more reachable)
│   │   │   │   │   ├── draw_number_on_map [UI] (346B)
│   │   │   │   │   │     (29 more reachable)
│   │   │   │   │   ├── redraw_entire_map [UI] (205B)  *** STATE MUTATION ***
│   │   │   │   │   │     (246 more reachable)
│   │   │   │   │   ├── get_path_cost [GL] (88B)
│   │   │   │   │   ├── set_path_cost [GL] (91B)  *** STATE MUTATION ***
│   │   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   │   │   ├── check_adjacent_enemy_simple [GL] (253B)  *** STATE MUTATION ***
│   │   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   │   │     (101 more reachable)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │   ├── check_tile_trespass [GL] (245B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── is_tile_worked [GL] (62B)
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── distance_x_wrapped [GL] (111B) (see above)
│   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── calc_shields_per_row [GL] (1497B)  *** STATE MUTATION ***
│   │   │     → Calculates shield production rows and unit support costs for a city.
│   │   │   ├── check_unit_support [GL] (281B)  *** STATE MUTATION ***
│   │   │   ├── calc_food_box_size [GL] (512B)  *** STATE MUTATION ***
│   │   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   └── recalc_city_all [GL] (76B)  *** STATE MUTATION ***
│   │         → Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, computes production, and determines happiness.
│   │       ├── assign_worker_tiles [GL] (2002B)  *** STATE MUTATION ***
│   │       │   ├── is_tile_worked [GL] (62B) (see above)
│   │       │   ├── calc_tile_resource [GL] (1528B)  *** STATE MUTATION ***
│   │       │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │       │   │   ├── grassland_has_shield [GL] (72B)
│   │       │   │   ├── find_city_at [GL] (245B)
│   │       │   │   ├── has_building [GL] (122B) (see above)
│   │       │   │   ├── get_wonder_city [GL] (57B) (see above)
│   │       │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │       │   │   ├── check_auto_irrigation_trigger [GL] (297B)  *** STATE MUTATION ***
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── check_road_trade_trigger [GL] (152B)  *** STATE MUTATION ***
│   │       │   │   ├── check_adjacent_water [GL] (242B)
│   │       │   │   ├── wrap_x [GL] (94B) (see above)
│   │       │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │       │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │       │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │       │   │   ├── get_tile_controller [GL] (72B) (see above)
│   │       │   │   ├── check_tile_resource [GL] (281B)
│   │       │   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │       │   │   ├── set_tile_owner [GL] (333B)  *** STATE MUTATION ***
│   │       │   │   │     (95 more reachable)
│   │       │   │   └── set_tile_city_radius_owner [GL] (312B)  *** STATE MUTATION ***
│   │       │   │         (95 more reachable)
│   │       │   ├── calc_tile_all_resources [GL] (130B)  *** STATE MUTATION ***
│   │       │   │   └── calc_tile_resource [GL] (1528B)  *** STATE MUTATION *** (see above)
│   │       │   ├── clear_and_check_worked_tiles [GL] (115B)  *** STATE MUTATION ***
│   │       │   │   ├── set_tile_worked [GL] (91B)  *** STATE MUTATION ***
│   │       │   │   └── unknown (get_city_tile_flag) [GL] (29B)
│   │       │   └── unknown (get_city_tile_flag) [GL] (29B)
│   │       ├── sync_worker_tile_status [GL] (155B)  *** STATE MUTATION ***
│   │       │   ├── set_worker_tile_status [GL] (93B)  *** STATE MUTATION ***
│   │       │   └── get_worker_tile_status [GL] (68B)
│   │       ├── calc_city_production [GL] (1053B)  *** STATE MUTATION ***
│   │       │   ├── has_building [GL] (122B) (see above)
│   │       │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │       │   ├── civ_has_tech [GL] (181B) (see above)
│   │       │   └── calc_corruption [GL] (890B)  *** STATE MUTATION ***
│   │       │       ├── has_building [GL] (122B) (see above)
│   │       │       └── calc_corruption_divisor [GL] (81B)
│   │       ├── calc_happiness [GL] (2627B)  *** STATE MUTATION ***
│   │       │   ├── has_building [GL] (122B) (see above)
│   │       │   ├── calc_city_trade_desirability [GL] (8227B)  *** STATE MUTATION ***
│   │       │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │       │   │   ├── has_building [GL] (122B) (see above)
│   │       │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │       │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │       │   │   ├── wrap_x [GL] (94B) (see above)
│   │       │   │   ├── bit_index_to_byte_mask [GL] (45B) (see above)
│   │       │   │   ├── shift_by_signed [GL] (98B)
│   │       │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │       │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │       │   │   ├── get_tile_continent [GL] (39B) (see above)
│   │       │   │   ├── check_tile_resource [GL] (281B) (see above)
│   │       │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │       │   ├── get_wonder_city [GL] (57B) (see above)
│   │       │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │       │   ├── check_trade_route_path [GL] (682B)  *** STATE MUTATION *** (see above)
│   │       │   ├── civ_has_tech [GL] (181B) (see above)
│   │       │   ├── calc_corruption [GL] (890B)  *** STATE MUTATION *** (see above)
│   │       │   ├── adjust_happy_unhappy [GL] (453B)  *** STATE MUTATION ***
│   │       │   ├── distribute_trade [GL] (1769B)  *** STATE MUTATION ***
│   │       │   │   ├── has_building [GL] (122B) (see above)
│   │       │   │   ├── get_wonder_city [GL] (57B) (see above)
│   │       │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │       │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │       │   │   └── count_worker_tiles_with_status [GL] (87B)
│   │       │   ├── calc_movement_cost [GL] (94B) (see above)
│   │       │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │       │   └── find_unit_stack_at_xy [GL] (231B) (see above)
│   │       └── calc_trade_route_income [GL] (378B)  *** STATE MUTATION ***
│   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION ***
│   │     → Shows a city event notification dialog (e.g., "Building completed", "Famine", etc.).
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │   └── popup_show_modal [UI] (999B)
│   │   │       ├── flush_display [UI] (21B)
│   │   │       ├── process_messages [UI] (21B)
│   │   │       │   └── FUN_0000BA4F [??]
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── get_edit_text [UI] (43B)
│   │   │       │   └── FUN_00002D4D [??]
│   │   │       ├── init_palette_system [UI] (21B)
│   │   │       ├── unknown — manage window [UI] (37B)
│   │   │       │   └── FUN_0000C692 [??]
│   │   │       ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION ***
│   │   │       │   ├── unknown (get drawing context) [UI] (37B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── widget_scrollbar_dtor [UI] (57B)
│   │   │       │   │     (8 more reachable)
│   │   │       │   └── widget_dropdown_dtor [UI] (57B)
│   │   │       │         (7 more reachable)
│   │   │       ├── popup_paint [UI] (1964B)
│   │   │       │   ├── end_paint [UI] (32B)
│   │   │       │   │     (17 more reachable)
│   │   │       │   ├── show_window_wrapper [UI] (33B)
│   │   │       │   │     (4 more reachable)
│   │   │       │   ├── set_rect_abs [UI] (42B)
│   │   │       │   ├── set_rect_wh [UI] (48B)
│   │   │       │   ├── measure_text_height [UI] (42B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── control_invalidate [UI] (65B)
│   │   │       │   │     (2 more reachable)
│   │   │       │   ├── draw_border_rect [UI] (61B)
│   │   │       │   │     (14 more reachable)
│   │   │       │   ├── scale_sprite [UI] (35B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (3 more reachable)
│   │   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── widget_get_height [UI] (34B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── popup_get_padded_height [UI] (42B)
│   │   │       │   ├── popup_render_label [UI] (226B)
│   │   │       │   │     (11 more reachable)
│   │   │       │   ├── popup_layout_text [UI] (1326B)
│   │   │       │   │     (15 more reachable)
│   │   │       │   ├── popup_layout_dialog [UI] (4785B)
│   │   │       │   │     (36 more reachable)
│   │   │       │   ├── popup_redraw_visible_items [UI] (660B)
│   │   │       │   │     (41 more reachable)
│   │   │       │   ├── popup_create_window [UI] (693B)
│   │   │       │   │     (53 more reachable)
│   │   │       │   ├── popup_init_controls [UI] (6616B)
│   │   │       │   │     (84 more reachable)
│   │   │       │   ├── popup_draw_background [UI] (309B)
│   │   │       │   │     (19 more reachable)
│   │   │       │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │   │       │   │     (11 more reachable)
│   │   │       │   ├── draw_3d_border [UI] (167B)
│   │   │       │   │     (13 more reachable)
│   │   │       │   ├── port_draw_text_styled [UI] (238B)
│   │   │       │   │     (8 more reachable)
│   │   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │       │   │     (8 more reachable)
│   │   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │   │     (10 more reachable)
│   │   │       │   └── unknown (invalidate_all_children) [UI] (115B)
│   │   │       │         (2 more reachable)
│   │   │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │   │       │   └── FUN_00003CFF [??]
│   │   │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │   │       │   └── FUN_00003D62 [??]
│   │   │       └── modal_dialog_run [UI] (283B)
│   │   │           ├── process_messages [UI] (21B) (see above)
│   │   │           ├── get_view_window_handle [UI] (28B) (see above)
│   │   │           ├── disable_parent_window [UI] (121B)
│   │   │           └── enable_parent_window [UI] (126B)
│   │   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION ***
│   │   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges.
│   │   │   └── scroll_map_if_needed [UI] (404B)
│   │   │       └── set_map_scroll_position [UI] (98B) (see above)
│   │   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION ***
│   │   │     → Sets a string control value in the multiplayer dialog string table.
│   │   ├── dialog_set_title [UI] (41B)
│   │   │     → Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │   └── dialog_set_title_impl [UI] (42B)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object.
│   │   │   ├── unknown (popup list init) [UI] (64B)
│   │   │   └── popup_dialog_reset [UI] (1299B)
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID.
│   │   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │   └── popup_find_button_by_id [UI] (100B)
│   │   └── popup_add_radio_option [UI] (566B)
│   │         → Adds a radio button option to the popup dialog.
│   │       ├── measure_text_height [UI] (42B) (see above)
│   │       └── popup_get_button_width [UI] (32B)
│   ├── process_city_food [GL] (1512B)  *** STATE MUTATION ***
│   │     → Processes city food production at end of turn.
│   │   ├── show_message [UI] (46B)
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── set_improvement_name_string [UI] (41B)
│   │   │     → Sets a dialog string control to an improvement/building name.
│   │   │   └── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── remove_trade_route [GL] (199B)  *** STATE MUTATION ***
│   │   │     → Removes a trade route at index param_2 from city param_1 by shifting subsequent trade route entries down and decrementing the trade route...
│   │   ├── check_auto_improvement [GL] (152B)
│   │   │     → Checks if a city should auto-build a Granary (9) or Aqueduct (23/0x17) based on city size thresholds.
│   │   │   └── has_building [GL] (122B) (see above)
│   │   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION ***
│   │   │     → Changes a city's production item.
│   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── ai_choose_city_production [AI] (29400B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │   └── show_help_topic [UI] (34B)
│   │   │   │   │         (3 more reachable)
│   │   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   │   ├── set_building [GL] (186B)  *** STATE MUTATION ***
│   │   │   │   │   └── bit_index_to_byte_mask [GL] (45B) (see above)
│   │   │   │   ├── city_adjacent_to_continent [GL] (238B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   │   ├── find_best_coastal_continent [GL] (344B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   │   ├── is_wonder_obsolete [GL] (120B) (see above)
│   │   │   │   ├── get_wonder_city [GL] (57B) (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── has_spaceship_built [GL] (47B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── can_build_unit_type [GL] (1095B)
│   │   │   │   │   └── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── can_build_improvement [GL] (1383B)
│   │   │   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   └── can_build_wonder [GL] (199B)
│   │   │   │   ├── is_tile_worked [GL] (62B) (see above)
│   │   │   │   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── spaceship_ai_evaluate [AI] (1064B)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── spaceship_get_category_count [GL] (140B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── spaceship_get_raw_count [GL] (202B)
│   │   │   │   │   ├── spaceship_get_clamped_category [GL] (140B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   ├── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION ***
│   │   │   │   │   │     (5 more reachable)
│   │   │   │   │   ├── unknown (spaceship section complete check) [GL] (66B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   └── spaceship_can_build_category [GL] (132B)
│   │   │   │   │         (4 more reachable)
│   │   │   │   ├── spaceship_is_enabled [GL] (90B)
│   │   │   │   ├── spaceship_ai_should_start [AI] (583B)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   └── spaceship_is_enabled [GL] (90B) (see above)
│   │   │   │   ├── rng_range [GL] (113B)  *** STATE MUTATION ***
│   │   │   │   │   └── rng_next_float [GL] (94B)  *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   │   │   └── get_unit_hp_remaining [GL] (98B)  *** STATE MUTATION ***
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │   └── calc_unit_movement_points [GL] (516B) (see above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   │   ├── relocate_unit [GL] (388B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION ***
│   │   │   │   │   │     (84 more reachable)
│   │   │   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION ***
│   │   │   │   │   │     (86 more reachable)
│   │   │   │   │   ├── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   └── put_down_unit [GL] (640B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── delete_unit [GL] (1129B)  *** STATE MUTATION ***
│   │   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   │   ├── FUN_0000C679 [??]
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   └── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── check_adjacent_enemy_continent [GL] (297B)  *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   │   ├── sum_stack_property [GL] (724B) (see above)
│   │   │   │   ├── count_units_by_role [GL] (120B) (see above)
│   │   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   │   └── get_unit_moves_remaining [GL] (69B) (see above)
│   │   │   │   ├── refresh_unit_movement [GL] (40B)  *** STATE MUTATION ***
│   │   │   │   │   └── calc_unit_movement_points [GL] (516B) (see above)
│   │   │   │   ├── check_unit_can_improve [GL] (354B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── check_adjacent_water [GL] (242B) (see above)
│   │   │   │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   │   │   ├── get_tile_continent [GL] (39B) (see above)
│   │   │   │   ├── get_unit_owner_at [GL] (66B) (see above)
│   │   │   │   ├── check_tile_resource [GL] (281B) (see above)
│   │   │   │   ├── (count_techs_discovered) [GL] (86B)
│   │   │   │   │   └── (check_tech_bit) [GL] (78B)
│   │   │   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   │   │   └── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION ***
│   │   │   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │       ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │       └── queue_map_update [GL] (515B)  *** STATE MUTATION ***
│   │   │   │             (84 more reachable)
│   │   │   ├── calc_food_box_with_difficulty [GL] (106B)
│   │   │   │   └── classify_production_type [GL] (58B)
│   │   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │   │   └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   ├── popup_dialog_close [UI] (47B)
│   │   │   │   └── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   └── init_editor_scrollbar [UI] (34B) (see above)
│   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   ├── update_map_area_all_players [UI] (136B)
│   │   │     → Updates a map area for all active players (all viewports in MP).
│   │   │   └── update_map_area [UI] (313B)  *** STATE MUTATION ***
│   │   │       ├── tile_to_screen [UI] (151B)
│   │   │       │   └── wrap_x [GL] (94B) (see above)
│   │   │       ├── is_tile_visible [UI] (99B)
│   │   │       │   └── is_tile_in_viewport_rect [UI] (97B)
│   │   │       │         (1 more reachable)
│   │   │       ├── redraw_tile_area [UI] (352B)
│   │   │       │   ├── draw_complete_tile [UI] (495B)
│   │   │       │   │     (166 more reachable)
│   │   │       │   ├── is_tile_visible [UI] (99B) (see above)
│   │   │       │   ├── draw_city_labels [UI] (871B)
│   │   │       │   │     (13 more reachable)
│   │   │       │   ├── calc_tile_group_rect [UI] (191B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── wrap_x [GL] (94B) (see above)
│   │   │       │   └── port_set_rect [UI] (91B)
│   │   │       ├── invalidate_tile_area [UI] (60B)
│   │   │       │   ├── invalidate_region [UI] (180B)
│   │   │       │   │     (16 more reachable)
│   │   │       │   └── calc_tile_group_rect [UI] (191B) (see above)
│   │   │       ├── reset_sprite_scale [UI] (28B)
│   │   │       │   └── scale_table_build_primary [UI] (657B)
│   │   │       │         (2 more reachable)
│   │   │       ├── set_current_zoom_scale [UI] (41B)
│   │   │       │   └── set_sprite_scale [UI] (33B) (see above)
│   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── set_paradrop_range [GL] (31B)  *** STATE MUTATION ***
│   │   │     → Sets the paradrop range for a unit type.
│   │   ├── calc_food_box_size [GL] (512B)  *** STATE MUTATION *** (see above)
│   │   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   │   ├── city_message_wrapper [UI] (38B)
│   │   │     → Wrapper to display a city-related message.
│   │   │   └── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   │   ├── draw_citizens_row [UI] (577B)
│   │   │     → Draws the citizen row panel at the top of the city window: header labels (food/shields produced), citizen icons, and click regions for ea...
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── draw_text_centered [UI] (46B)
│   │   │   │   └── draw_text_centered [UI] (139B)
│   │   │   │       ├── measure_text_height [UI] (42B) (see above)
│   │   │   │       └── draw_text_with_shadow [UI] (205B)
│   │   │   │             (7 more reachable)
│   │   │   ├── close_dialog [UI] (94B)
│   │   │   │   └── remove_click_region [UI] (107B)
│   │   │   ├── citywin_prepare_panel [UI] (77B)
│   │   │   │   ├── citywin_blit_panel [UI] (129B)
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   │   │         (10 more reachable)
│   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   │   └── set_text_draw_source [UI] (24B)
│   │   │   ├── citywin_draw_citizen_icons [UI] (1186B)
│   │   │   │   ├── get_city_epoch [GL] (158B)
│   │   │   │   │   └── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   │   ├── get_worker_tile_status [GL] (68B) (see above)
│   │   │   │   ├── scale_universal [UI] (67B)
│   │   │   │   ├── calc_icon_spacing [UI] (264B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │   │       └── dispatch_oleitem_dimmed [UI] (677B)
│   │   │   │             (7 more reachable)
│   │   │   ├── invalidate_rect_region [UI] (78B)
│   │   │   │   └── add_click_region [UI] (153B)
│   │   │   │       └── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── scale_universal [UI] (67B)
│   │   │   └── set_text_style [UI] (68B)
│   │   ├── draw_food_storage [UI] (1081B)
│   │   │     → Draws the food storage box in the city window.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   │   ├── widget_inflate_rect [UI] (34B)
│   │   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   │   ├── draw_line [UI] (46B)
│   │   │   │   └── draw_hline [UI] (69B)
│   │   │   │       ├── set_rect_abs [UI] (42B) (see above)
│   │   │   │       └── fill_surface_from_rect [UI] (71B)
│   │   │   │             (8 more reachable)
│   │   │   ├── draw_3d_frame [UI] (42B)
│   │   │   │   └── draw_3d_border [UI] (167B) (see above)
│   │   │   ├── blit_sprite_8param [UI] (62B)
│   │   │   │   └── draw_icon_row_spaced [UI] (246B)
│   │   │   │       ├── calc_icon_spacing [UI] (264B) (see above)
│   │   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   ├── scale_universal [UI] (67B) (see above)
│   │   │   ├── calc_icon_spacing [UI] (264B) (see above)
│   │   │   └── set_text_style [UI] (68B) (see above)
│   │   └── delete_unit_safely [GL] (677B)  *** STATE MUTATION ***
│   │         → Safely deletes a unit, handling the case where it's a ship carrying units.
│   │       ├── FUN_0000C494 [??] (see above)
│   │       ├── is_tile_valid [GL] (80B) (see above)
│   │       ├── show_dialog_message [UI] (43B) (see above)
│   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │       ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │       ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │       ├── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   │       ├── delete_all_units_in_stack [GL] (144B)  *** STATE MUTATION ***
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │       │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │       │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │       │   └── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   │       ├── load_unit_onto_ship [GL] (1912B)  *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B) (see above)
│   │       │   ├── show_dialog_message [UI] (43B) (see above)
│   │       │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │       │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │       │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │       │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │       │   ├── set_unit_goto_order [GL] (66B)  *** STATE MUTATION ***
│   │       │   ├── relocate_unit [GL] (388B)  *** STATE MUTATION *** (see above)
│   │       │   ├── eject_air_units [GL] (343B)  *** STATE MUTATION ***
│   │       │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │       │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │       │   │   └── relocate_unit [GL] (388B)  *** STATE MUTATION *** (see above)
│   │       │   ├── is_tile_ocean [GL] (57B) (see above)
│   │       │   └── get_tile_continent [GL] (39B) (see above)
│   │       └── is_tile_ocean [GL] (57B) (see above)
│   ├── process_city_production [GL] (10931B)  *** STATE MUTATION ***
│   │     → Massive end-of-turn city production processing function.
│   │   ├── show_message [UI] (46B) (see above)
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── trade_supply_demand_show [UI] (1022B)
│   │   │     → Shows the supply/demand details for a specific trade commodity in a specific city.
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   ├── check_auto_improvement [GL] (152B) (see above)
│   │   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   │   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID.
│   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   └── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   ├── has_spaceship_built [GL] (47B) (see above)
│   │   ├── wonder_view_init [UI] (155B)
│   │   │     → Initializes the wonder view display: constructs the wonder view object, loads wonder art, plays wonder video (if applicable), and handles...
│   │   │   ├── unknown (stop music) [UI] (31B)
│   │   │   ├── resume_music [UI] (85B)
│   │   │   │   ├── select_random_music_track [UI] (388B)
│   │   │   │   └── unknown (stop music) [UI] (31B) (see above)
│   │   │   ├── wonder_view_construct [UI] (154B)
│   │   │   │   ├── dialog_ctor [UI] (146B)
│   │   │   │   │   └── init_sprite_surface_mgr [UI] (133B)
│   │   │   │   │         (5 more reachable)
│   │   │   │   └── palette_init [UI] (145B)
│   │   │   │       ├── FUN_0000E780 [??]
│   │   │   │       ├── palette_generate_random_id [UI] (75B)
│   │   │   │       └── unknown (palette_create) [UI] (60B)
│   │   │   ├── load_civ2_art_004bbb3f [UI] (638B)
│   │   │   │   ├── set_callback_paint [UI] (45B)
│   │   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   │   └── port_alloc_rect [UI] (58B)
│   │   │   │   │         (21 more reachable)
│   │   │   │   ├── pedia_free_resource [UI] (57B)
│   │   │   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │   │   │   └── unknown (update pedia display surface) [UI] (49B)
│   │   │   │   │         (1 more reachable)
│   │   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │   │   │   │   └── FUN_0000C763 [??]
│   │   │   │   ├── wonder_view_refresh_surface [UI] (60B)
│   │   │   │   │   ├── set_dialog_background [UI] (24B)  *** STATE MUTATION ***
│   │   │   │   │   └── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   │         (30 more reachable)
│   │   │   │   ├── dialog_create [UI] (588B)
│   │   │   │   │   ├── unknown (set_font_size) [UI] (43B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   │   │     (42 more reachable)
│   │   │   │   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │   │   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │   │   │   └── create_offscreen_surface_b [UI] (119B)
│   │   │   │   │         (35 more reachable)
│   │   │   │   ├── set_active_surface [UI] (74B)
│   │   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   │   └── call_refresh_callback [UI] (47B)
│   │   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   │   └── port_alloc [UI] (325B)
│   │   │   │   │         (20 more reachable)
│   │   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   │   │     (20 more reachable)
│   │   │   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   ├── check_topdown [UI] (41B)
│   │   │   │   │   └── flip_surface_vertical [UI] (249B)
│   │   │   │   │         (13 more reachable)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   │   ├── port_lock [UI] (287B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   │   │   ├── check_topdown [UI] (41B) (see above)
│   │   │   │   │   └── fill_rect_8bit [UI] (152B)
│   │   │   │   ├── port_set_color [UI] (43B)
│   │   │   │   │   └── port_fill_rect [UI] (236B) (see above)
│   │   │   │   ├── sprite_reset [UI] (98B)
│   │   │   │   │   └── sprite_init_record [UI] (128B)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │   │   │   ├── sprite_lock_data [UI] (56B)
│   │   │   │   │   └── sprite_extract_from_oleitem [UI] (1951B)
│   │   │   │   │         (26 more reachable)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   ├── wonder_view_play_video [UI] (699B)
│   │   │   │   ├── set_callback_paint [UI] (45B) (see above)
│   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   ├── init_palette_system [UI] (21B) (see above)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│   │   │   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │   │   │   └── FUN_0000C44D [??]
│   │   │   │   ├── fade_out_palette [UI] (153B)
│   │   │   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │   │   │     (44 more reachable)
│   │   │   │   │   ├── apply_palette_to_surfaces [UI] (241B)
│   │   │   │   │   │     (17 more reachable)
│   │   │   │   │   ├── restore_palette_entries [UI] (135B)
│   │   │   │   │   │     (11 more reachable)
│   │   │   │   │   ├── unknown (realize all palettes) [UI] (151B)
│   │   │   │   │   │     (13 more reachable)
│   │   │   │   │   ├── palette_setup_crossfade [UI] (261B)
│   │   │   │   │   │     (17 more reachable)
│   │   │   │   │   ├── palette_restore_from_crossfade [UI] (150B)
│   │   │   │   │   │     (6 more reachable)
│   │   │   │   │   └── palette_crossfade_step [UI] (491B)
│   │   │   │   │         (9 more reachable)
│   │   │   │   ├── fade_in_palette [UI] (153B)
│   │   │   │   │   ├── wait_for_animation [UI] (109B) (see above)
│   │   │   │   │   ├── unknown (realize palettes) [UI] (151B)
│   │   │   │   │   │     (13 more reachable)
│   │   │   │   │   ├── restore_palette_entries [UI] (135B) (see above)
│   │   │   │   │   ├── unknown (realize all palettes) [UI] (151B) (see above)
│   │   │   │   │   ├── palette_setup_crossfade [UI] (261B) (see above)
│   │   │   │   │   ├── palette_restore_from_crossfade [UI] (150B) (see above)
│   │   │   │   │   └── palette_crossfade_step [UI] (491B) (see above)
│   │   │   │   ├── wonder_view_resize [UI] (132B)
│   │   │   │   │   ├── init_palette_system [UI] (21B) (see above)
│   │   │   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B) (see above)
│   │   │   │   │   ├── dialog_create_buttons [UI] (675B) (see above)
│   │   │   │   │   ├── set_active_surface [UI] (74B) (see above)
│   │   │   │   │   ├── scroll_to_clamped [UI] (153B)
│   │   │   │   │   │     (6 more reachable)
│   │   │   │   │   └── port_fill_rect [UI] (236B) (see above)
│   │   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   │   └── pedia_navigate_to_item [UI] (369B)
│   │   │       ├── end_paint [UI] (32B) (see above)
│   │   │       ├── show_window_wrapper [UI] (33B) (see above)
│   │   │       ├── unknown (lock pedia surface) [UI] (38B)
│   │   │       │   ├── unknown (get drawing context) [UI] (37B) (see above)
│   │   │       │   └── surface_list_find_dirty [UI] (174B)
│   │   │       ├── pedia_init_tabs [UI] (1391B)
│   │   │       │   ├── control_invalidate [UI] (65B) (see above)
│   │   │       │   ├── set_edit_text [UI] (43B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── pedia_button_ctor [UI] (83B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── pedia_button_create [UI] (139B)
│   │   │       │   │     (6 more reachable)
│   │   │       │   ├── unknown (set button callback) [UI] (33B)
│   │   │       │   └── unknown (clear hypertext links) [UI] (21B)
│   │   │       │         (1 more reachable)
│   │   │       ├── pedia_clear_item_list [UI] (118B)
│   │   │       │   └── init_palette_system [UI] (21B) (see above)
│   │   │       ├── pedia_draw_frame [UI] (800B)
│   │   │       │   ├── rect_get_width [UI] (27B) (see above)
│   │   │       │   ├── rect_get_height [UI] (28B) (see above)
│   │   │       │   ├── measure_text_height [UI] (42B) (see above)
│   │   │       │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   │       │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │       │   │     (8 more reachable)
│   │   │       │   ├── draw_3d_border [UI] (167B) (see above)
│   │   │       │   ├── port_set_rect_from_self [UI] (63B)
│   │   │       │   ├── port_set_rect [UI] (91B) (see above)
│   │   │       │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │       │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │       │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │       ├── pedia_open_category [UI] (200B)
│   │   │       │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │       │   ├── set_dialog_enabled [UI] (36B)
│   │   │       │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │       │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │       │   ├── pedia_set_title [UI] (229B)
│   │   │       │   │     (6 more reachable)
│   │   │       │   ├── pedia_push_history [UI] (523B)
│   │   │       │   └── set_active_surface [UI] (74B) (see above)
│   │   │       ├── pedia_get_entry_name [UI] (89B)
│   │   │       ├── civpedia_select_item [UI] (334B)
│   │   │       │   ├── end_paint [UI] (32B) (see above)
│   │   │       │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │       │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │       │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   │       │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   │       │   ├── pedia_open_category [UI] (200B) (see above)
│   │   │       │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   │       │   ├── civpedia_draw_detail [UI] (1542B)
│   │   │       │   │     (93 more reachable)
│   │   │       │   └── modal_dialog_run [UI] (283B) (see above)
│   │   │       ├── pedia_draw_item_detail [UI] (1488B)
│   │   │       │   ├── rect_get_width [UI] (27B) (see above)
│   │   │       │   ├── invalidate_region [UI] (180B) (see above)
│   │   │       │   ├── text_begin [UI] (29B) (see above)
│   │   │       │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │       │   ├── get_font_height [UI] (28B)
│   │   │       │   ├── measure_text_height [UI] (42B) (see above)
│   │   │       │   ├── text_begin_bold [UI] (29B)
│   │   │       │   │     (2 more reachable)
│   │   │       │   ├── display_improvement [UI] (33B)
│   │   │       │   │     (3 more reachable)
│   │   │       │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │       │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │       │   ├── pedia_show_description [UI] (593B)
│   │   │       │   │     (9 more reachable)
│   │   │       │   ├── pedia_add_hyperlink [UI] (1361B)
│   │   │       │   │     (27 more reachable)
│   │   │       │   ├── widget_get_height [UI] (34B) (see above)
│   │   │       │   ├── unknown (pedia_draw_background_panel) [UI] (226B) (see above)
│   │   │       │   ├── pedia_load_description [UI] (388B)  *** STATE MUTATION ***
│   │   │       │   │     (17 more reachable)
│   │   │       │   ├── port_set_rect [UI] (91B) (see above)
│   │   │       │   ├── port_set_clip_rect [UI] (55B)
│   │   │       │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │       │   ├── port_get_font [UI] (75B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │       │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │       └── modal_dialog_run [UI] (283B) (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── upgrade_units_for_tech [GL] (970B)  *** STATE MUTATION ***
│   │   │     → When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type.
│   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   └── show_terrain_help [UI] (58B)
│   │   │   │       └── FUN_0051D564 [??] (178B)
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   └── update_map_tile [UI] (50B)
│   │   │   │       └── update_map_area [UI] (313B)  *** STATE MUTATION *** (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   └── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── can_build_unit_type [GL] (1095B) (see above)
│   │   ├── complete_research [MIXED] (1422B)  *** STATE MUTATION ***
│   │   │     → Completes a tech research for a civ.
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   ├── reassign_all_city_production [GL] (254B)  *** STATE MUTATION ***
│   │   │   │   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   ├── get_civ_adjective_name [GL] (145B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── handle_tech_government_effects [GL] (973B)  *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │   │   │   │   └── FUN_0051D564 [??] (178B) (see above)
│   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   └── set_government_type [GL] (529B)  *** STATE MUTATION ***
│   │   │   │       ├── show_tax_rate_dialog [MIXED] (226B)  *** STATE MUTATION ***
│   │   │   │       │     (303 more reachable)
│   │   │   │       └── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │   │   ├── we_love_the_king_day [GL] (379B)
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   │   ├── unknown (show tech help) [UI] (43B)
│   │   │   │   │   └── show_tech_help [UI] (92B)
│   │   │   │   └── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   │   ├── text_newline [UI] (29B) (see above)
│   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_wonder_owner [GL] (73B)
│   │   │   │   │   └── get_wonder_city [GL] (57B) (see above)
│   │   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   │   ├── open_intelligence_dialog [UI] (535B)
│   │   │   │   │   │     (29 more reachable)
│   │   │   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION ***
│   │   │   │   │   │     (426 more reachable)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   │   │     (7 more reachable)
│   │   │   │   │   ├── diplo_show_greeting [MIXED] (804B)  *** STATE MUTATION ***
│   │   │   │   │   │     (315 more reachable)
│   │   │   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   │   ├── intel_play_animation [UI] (181B)
│   │   │   │   │   │     (69 more reachable)
│   │   │   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │   │   └── popup_add_radio_option [UI] (566B) (see above)
│   │   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION ***
│   │   │   │   │   └── intel_close_advisor [UI] (166B)
│   │   │   │   │         (133 more reachable)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── upgrade_units_for_tech [GL] (970B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── handle_tech_government_effects [GL] (973B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── we_love_the_king_day [GL] (379B) (see above)
│   │   │   │   ├── format_enabled_item [UI] (138B)
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   │   └── popup_add_edit_field [UI] (412B)
│   │   │   │   │         (12 more reachable)
│   │   │   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── unknown (show tech help) [UI] (43B) (see above)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   │   ├── pedia_select_entry [UI] (342B)
│   │   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   │   │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   │   │   │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   │   │   │   ├── pedia_open_category [UI] (200B) (see above)
│   │   │   │   │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   │   │   │   ├── pedia_draw_tech_detail [UI] (5911B)
│   │   │   │   │   │     (82 more reachable)
│   │   │   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   │   │   ├── draw_status_panel_header [UI] (1182B)
│   │   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   │   ├── unknown (string pool set) [UI] (33B)
│   │   │   │   │   │     (7 more reachable)
│   │   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   │     (5 more reachable)
│   │   │   │   │   ├── scale_sprite [UI] (35B) (see above)
│   │   │   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   │   │   ├── prepare_surface [UI] (24B) (see above)
│   │   │   │   │   ├── draw_hline [UI] (69B) (see above)
│   │   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   │     (6 more reachable)
│   │   │   │   │   ├── set_text_draw_target [UI] (24B) (see above)
│   │   │   │   │   ├── set_text_draw_source [UI] (24B) (see above)
│   │   │   │   │   ├── set_text_style [UI] (68B) (see above)
│   │   │   │   │   ├── port_set_rect_from_self [UI] (63B) (see above)
│   │   │   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   │   ├── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │   ├── popup_dialog_close [UI] (47B) (see above)
│   │   │   │   ├── popup_add_edit_field [UI] (412B)
│   │   │   │   ├── popup_set_scaled_width [UI] (99B)
│   │   │   │   ├── popup_add_button [UI] (360B) (see above)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B) (see above)
│   │   │   ├── unknown (choose research wrapper) [GL] (40B)  *** STATE MUTATION ***
│   │   │   │   └── choose_research_tech [MIXED] (2078B)  *** STATE MUTATION ***
│   │   │   │       ├── text_begin [UI] (29B) (see above)
│   │   │   │       ├── text_newline [UI] (29B) (see above)
│   │   │   │       ├── display_improvement [UI] (33B) (see above)
│   │   │   │       ├── text_add_number [UI] (33B) (see above)
│   │   │   │       ├── show_message [UI] (46B) (see above)
│   │   │   │       ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │       ├── dialog_set_icon [UI] (40B)
│   │   │   │       ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │       ├── init_game_display [UI] (51B)
│   │   │   │       │     (48 more reachable)
│   │   │   │       ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │       ├── ai_pick_research_goal [AI] (417B)
│   │   │   │       │     (4 more reachable)
│   │   │   │       ├── show_research_goal_dialog [UI] (3119B)
│   │   │   │       │     (294 more reachable)
│   │   │   │       ├── pedia_select_entry [UI] (342B) (see above)
│   │   │   │       ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │       ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   │   │   │       ├── popup_add_edit_field [UI] (412B) (see above)
│   │   │   │       ├── popup_set_position_fields [UI] (42B)
│   │   │   │       ├── popup_add_button [UI] (360B) (see above)
│   │   │   │       ├── popup_add_radio_option [UI] (566B) (see above)
│   │   │   │       └── popup_show_modal [UI] (999B) (see above)
│   │   │   ├── set_paradrop_range [GL] (31B)  *** STATE MUTATION *** (see above)
│   │   │   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │   │   ├── pedia_select_entry [UI] (342B)
│   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   │   │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   │   │   ├── pedia_open_category [UI] (200B) (see above)
│   │   │   │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   │   │   ├── pedia_draw_tech_detail [UI] (5911B) (see above)
│   │   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   └── popup_add_button [UI] (360B) (see above)
│   │   ├── acquire_wonder [GL] (488B)  *** STATE MUTATION ***
│   │   │     → Acquires (completes) a wonder for a city.
│   │   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   └── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   │   ├── show_city_event_dialog_v2 [UI] (915B)  *** STATE MUTATION ***
│   │   │     → Enhanced version of city event dialog with a production item image.
│   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── pedia_window_ctor [UI] (115B)
│   │   │   │   └── popup_dialog_create [UI] (93B) (see above)
│   │   │   ├── popup_set_default_selection [UI] (116B) (see above)
│   │   │   ├── popup_add_button [UI] (360B) (see above)
│   │   │   ├── popup_add_radio_option [UI] (566B) (see above)
│   │   │   ├── load_gif_resource [UI] (847B) (see above)
│   │   │   ├── palette_init [UI] (145B) (see above)
│   │   │   └── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
│   │   ├── assign_caravan_commodity [GL] (327B)  *** STATE MUTATION ***
│   │   │     → Assigns a trade commodity to a newly built caravan/freight unit.
│   │   ├── handle_espionage_discovery [GL] (236B)  *** STATE MUTATION ***
│   │   │     → Handles discovery of espionage (spy embassy established).
│   │   │   └── adjust_attitude [GL] (107B)  *** STATE MUTATION ***
│   │   │       ├── get_attitude_raw [GL] (47B)
│   │   │       └── set_attitude_value [GL] (120B)  *** STATE MUTATION ***
│   │   ├── handle_space_race_victory [GL] (641B)  *** STATE MUTATION ***
│   │   │     → Handles space race victory condition.
│   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── redraw_map_all_players [UI] (124B)
│   │   │   │   └── redraw_entire_map [UI] (205B)  *** STATE MUTATION *** (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   │   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       └── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── city_message_wrapper [UI] (38B) (see above)
│   │   ├── draw_production_box [UI] (1434B)
│   │   │     → Draws the production box in the city window.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   │   ├── close_dialog [UI] (94B) (see above)
│   │   │   ├── init_unit_move_data [GL] (253B)  *** STATE MUTATION ***
│   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   │   ├── widget_inflate_rect [UI] (34B) (see above)
│   │   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   │   ├── draw_3d_frame [UI] (42B) (see above)
│   │   │   ├── invalidate_rect_region [UI] (78B) (see above)
│   │   │   ├── blit_sprite_8param [UI] (62B) (see above)
│   │   │   ├── scale_universal [UI] (67B) (see above)
│   │   │   ├── calc_icon_spacing [UI] (264B) (see above)
│   │   │   ├── draw_unit [UI] (2803B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │   │   │   ├── get_civ_background_color [UI] (92B)
│   │   │   │   ├── scale_sprite [UI] (35B) (see above)
│   │   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   │   ├── set_unit_font_for_zoom [UI] (99B)  *** STATE MUTATION ***
│   │   │   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   │   │     (6 more reachable)
│   │   │   │   │   └── scale_sprite [UI] (35B) (see above)
│   │   │   │   ├── select_display_unit [UI] (396B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   └── get_fortress_owner_at [GL] (77B)
│   │   │   │   ├── get_civ_dark_color [UI] (92B)
│   │   │   │   ├── get_unit_max_hp [GL] (45B) (see above)
│   │   │   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │   │   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   │   │   ├── port_copy_rect [UI] (282B)
│   │   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   │   ├── port_lock [UI] (287B) (see above)
│   │   │   │   │   ├── port_unlock [UI] (83B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── port_get_pixel_ptr [UI] (45B)
│   │   │   │   │   ├── surface_is_locked [UI] (44B) (see above)
│   │   │   │   │   └── pixel_ptr_next_row [UI] (33B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B) (see above)
│   │   │   ├── set_text_style [UI] (68B) (see above)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── draw_improvements_list [UI] (1102B)
│   │   │     → Draws the city improvements list with building names and wonders.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │   │       └── FUN_0000D149 [??]
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   │       └── scrollbar_set_pos [UI] (39B) (see above)
│   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   ├── draw_text_at [UI] (42B) (see above)
│   │   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── close_dialog [UI] (94B) (see above)
│   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   │   ├── invalidate_rect_region [UI] (78B) (see above)
│   │   │   ├── scale_universal [UI] (67B) (see above)
│   │   │   ├── set_text_style [UI] (68B) (see above)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   └── set_scrollbar [UI] (64B)
│   │   │       └── unknown (get_scroll_range) [UI] (47B)
│   │   │           └── scrollbar_get_range [UI] (36B)
│   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── spaceship_ai_evaluate [AI] (1064B) (see above)
│   │   ├── spaceship_human_build [GL] (2111B)  *** STATE MUTATION ***
│   │   │     → Handles building a spaceship component for a human or AI player.
│   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION ***
│   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   ├── has_spaceship_built [GL] (47B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION *** (see above)
│   │   │   └── spaceship_launch (internal — called after all checks pass) [GL] (815B)  *** STATE MUTATION ***
│   │   │       ├── show_message [UI] (46B) (see above)
│   │   │       ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │       ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │       ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   │   │       ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION ***
│   │   │       │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION ***
│   │   │       │   └── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │       ├── get_civ_people_name [GL] (145B) (see above)
│   │   │       ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │       ├── show_wonder_or_advance [UI] (268B)
│   │   │       │   ├── wonder_win_init [UI] (677B)  *** STATE MUTATION ***
│   │   │       │   │     (28 more reachable)
│   │   │       │   ├── wonder_win_create [UI] (524B)
│   │   │       │   │     (134 more reachable)
│   │   │       │   ├── show_advance_animation [UI] (1232B)  *** STATE MUTATION ***
│   │   │       │   │     (420 more reachable)
│   │   │       │   └── show_wonder_movie [UI] (154B)
│   │   │       │         (419 more reachable)
│   │   │       └── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── spaceship_check_complete_section [GL] (324B)
│   │   │     → Checks if a spaceship section is complete.
│   │   ├── spaceship_ai_should_start [AI] (583B) (see above)
│   │   ├── create_unit [GL] (1675B)  *** STATE MUTATION ***
│   │   │     → Creates a new unit of the specified type for a given civilization at a map position.
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── process_unit_move_visibility [GL] (4250B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── cancel_goto_if_blocked [GL] (90B)  *** STATE MUTATION ***
│   │   │   │   ├── cancel_goto_for_stack [GL] (192B)  *** STATE MUTATION ***
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   │   └── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   ├── city_set_specialist_slot [GL] (126B)  *** STATE MUTATION ***
│   │   │   │   ├── find_city_at [GL] (245B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── update_map_area_all_players [UI] (136B) (see above)
│   │   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │   │   └── update_map_radius1 [UI] (50B)
│   │   │   │   │         (125 more reachable)
│   │   │   │   ├── ai_add_goal_a [AI] (958B)  *** STATE MUTATION ***
│   │   │   │   │   ├── ai_shift_goals_down_a [AI] (184B)  *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL] (69B) (see above)
│   │   │   │   │   ├── is_unit_active [GL] (176B) (see above)
│   │   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── process_diplomatic_contact [GL] (7326B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── diplo_demand_ally_help [MIXED] (919B)  *** STATE MUTATION ***
│   │   │   │   │   │     (467 more reachable)
│   │   │   │   │   ├── ai_diplomacy_negotiate [GL] (16263B)  *** STATE MUTATION ***
│   │   │   │   │   │     (609 more reachable)
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── get_civ_noun_name [GL] (145B) (see above)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── parleywin_start_session [MIXED] (807B)  *** STATE MUTATION ***
│   │   │   │   │   │     (267 more reachable)
│   │   │   │   │   ├── event_check_negotiation [GL] (900B)  *** STATE MUTATION ***
│   │   │   │   │   │     (606 more reachable)
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   │   ├── ai_tech_exchange [GL] (1182B)  *** STATE MUTATION ***
│   │   │   │   │   │     (480 more reachable)
│   │   │   │   │   └── check_join_war [GL] (595B)  *** STATE MUTATION ***
│   │   │   │   │         (2 more reachable)
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   │   ├── set_stack_seen_by [GL] (92B)  *** STATE MUTATION ***
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   │   └── set_unit_seen_by [GL] (96B)  *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL] (724B) (see above)
│   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B) (see above)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   ├── get_tile_explored [GL] (71B) (see above)
│   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   ├── get_tile_controller [GL] (72B) (see above)
│   │   │   │   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION *** (see above)
│   │   │   ├── find_nearest_city [GL] (400B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   │   │   └── get_tile_continent_if_land [GL] (72B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   ├── unknown (tutorial_show_advice) [UI] (38B)
│   │   │   │   └── show_unit_type_picker [UI] (260B)
│   │   │   │       ├── select_list_item [UI] (38B) (see above)
│   │   │   │       ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │       ├── popup_add_button [UI] (360B) (see above)
│   │   │   │       └── sprite_init_empty [UI] (140B)
│   │   │   │             (32 more reachable)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── calc_unit_movement_points [GL] (516B) (see above)
│   │   │   └── put_down_unit [GL] (640B)  *** STATE MUTATION *** (see above)
│   │   ├── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   │   ├── find_nearest_unit [GL] (233B)  *** STATE MUTATION ***
│   │   │     → Finds the nearest unit to a position, optionally filtered by owner civ.
│   │   │   └── calc_movement_cost [GL] (94B) (see above)
│   │   ├── get_tile_continent [GL] (39B) (see above)
│   │   └── get_unit_owner_at [GL] (66B) (see above)
│   ├── process_unit_support_deficit [GL] (1621B)  *** STATE MUTATION ***
│   │     → Handles unit support deficit — when a city can't support all its units, disbands the furthest ones.
│   │   ├── FUN_00008ADC [??]
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── find_city_at [GL] (245B) (see above)
│   │   ├── check_unit_support [GL] (281B)  *** STATE MUTATION *** (see above)
│   │   ├── city_message_wrapper [UI] (38B) (see above)
│   │   ├── draw_units_supported [UI] (1751B)
│   │   │     → Draws the supported units panel in the city window.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── close_dialog [UI] (94B) (see above)
│   │   │   ├── scale_sprite [UI] (35B) (see above)
│   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   │   ├── invalidate_rect_region [UI] (78B) (see above)
│   │   │   ├── scale_universal [UI] (67B) (see above)
│   │   │   ├── calc_icon_spacing [UI] (264B) (see above)
│   │   │   ├── draw_unit [UI] (2803B) (see above)
│   │   │   ├── set_text_style [UI] (68B) (see above)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   ├── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   │   ├── delete_unit_visible [GL] (456B)  *** STATE MUTATION ***
│   │   │     → Deletes a unit and refreshes the map display at its former position.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   └── delete_unit_safely [GL] (677B)  *** STATE MUTATION *** (see above)
│   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   └── get_tile_improvements [GL] (39B) (see above)
│   ├── handle_city_disorder_004ef578 [GL] (1614B)  *** STATE MUTATION ***
│   │     → Handles civil disorder and "we love the king" celebrations.
│   │   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   │   ├── check_auto_improvement [GL] (152B) (see above)
│   │   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   │   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   ├── play_music_track [UI] (312B)
│   │   │     → Plays a specific music track (param_1) with optional restart (param_2).
│   │   │   └── unknown (stop music) [UI] (31B) (see above)
│   │   ├── update_map_area_all_players [UI] (136B) (see above)
│   │   ├── get_civ_leader_title [GL] (210B) (see above)
│   │   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   │   ├── show_city_event_dialog_v2 [UI] (915B)  *** STATE MUTATION *** (see above)
│   │   ├── city_message_wrapper [UI] (38B) (see above)
│   │   └── ai_revolution_notification [GL] (1336B)  *** STATE MUTATION ***
│   │         → Handles AI revolution/government change notifications.
│   │       ├── show_message [UI] (46B) (see above)
│   │       ├── show_dialog_message [UI] (43B) (see above)
│   │       ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   │       ├── set_improvement_name_string [UI] (41B) (see above)
│   │       ├── civ_has_active_wonder [GL] (142B) (see above)
│   │       ├── get_civ_noun_name [GL] (145B) (see above)
│   │       ├── get_civ_leader_title [GL] (210B) (see above)
│   │       ├── get_civ_adjective_name [GL] (145B) (see above)
│   │       ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │       ├── set_government_type [GL] (529B)  *** STATE MUTATION *** (see above)
│   │       └── revolution_dialog [MIXED] (678B)  *** STATE MUTATION ***
│   │           ├── text_begin [UI] (29B) (see above)
│   │           ├── select_list_item [UI] (38B) (see above)
│   │           ├── display_improvement [UI] (33B) (see above)
│   │           ├── show_dialog_message [UI] (43B) (see above)
│   │           ├── get_civ_name [UI] (28B) (see above)
│   │           ├── set_improvement_name_string [UI] (41B) (see above)
│   │           ├── dialog_set_title [UI] (41B) (see above)
│   │           ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │           ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │           ├── unknown (tutorial_show_city_screen) [UI] (42B) (see above)
│   │           ├── get_civ_noun_name [GL] (145B) (see above)
│   │           ├── get_civ_leader_title [GL] (210B) (see above)
│   │           ├── set_government_type [GL] (529B)  *** STATE MUTATION *** (see above)
│   │           ├── check_govt_available [GL] (323B)
│   │           │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │           │   └── civ_has_tech [GL] (181B) (see above)
│   │           ├── popup_dialog_create [UI] (93B) (see above)
│   │           └── popup_add_radio_option [UI] (566B) (see above)
│   ├── process_city_science [GL] (382B)  *** STATE MUTATION ***
│   │     → Processes a city's science contribution.
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── add_research_beakers [GL] (458B)  *** STATE MUTATION ***
│   │   │     → Adds research beakers to a civ's current research.
│   │   │   ├── unknown (tutorial_show_city_screen) [UI] (42B) (see above)
│   │   │   ├── unknown (choose research wrapper) [GL] (40B)  *** STATE MUTATION *** (see above)
│   │   │   ├── complete_research [MIXED] (1422B)  *** STATE MUTATION *** (see above)
│   │   │   └── calc_tech_cost [GL] (1003B)
│   │   ├── calc_food_box_size [GL] (512B)  *** STATE MUTATION *** (see above)
│   │   └── spaceship_ai_should_start [AI] (583B) (see above)
│   ├── process_city_pollution_and_meltdown [GL] (940B)  *** STATE MUTATION ***
│   │     → Handles city pollution generation and nuclear meltdown checks.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── set_map_scroll_position [UI] (98B) (see above)
│   │   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION *** (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   │   ├── city_message_wrapper [UI] (38B) (see above)
│   │   ├── animate_nuke_explosion [UI] (885B)  *** STATE MUTATION ***
│   │   │     → Plays the nuclear explosion animation at a given map tile.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION *** (see above)
│   │   │   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   │   ├── tile_to_screen [UI] (151B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   └── scale_sprite [UI] (35B) (see above)
│   │   │   ├── set_current_zoom_scale [UI] (41B) (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   ├── init_game_display [UI] (51B) (see above)
│   │   │   ├── blit_with_clip [UI] (265B)
│   │   │   │   └── blit_rect_to_rect [UI] (95B) (see above)
│   │   │   ├── get_tile_explored [GL] (71B) (see above)
│   │   │   ├── port_alloc_rect [UI] (58B) (see above)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── wrap_x [GL] (94B) (see above)
│   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   ├── get_tile_explored [GL] (71B) (see above)
│   │   ├── reveal_tile [GL] (154B)  *** STATE MUTATION ***
│   │   │     → Reveals pollution on a tile by setting the pollution bit (0x80) in tile improvements.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── update_civ_visibility [GL] (75B)  *** STATE MUTATION ***
│   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   └── set_civ_tile_data [GL] (325B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   │   └── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   │   ├── generate_terrain_around [GL] (696B)  *** STATE MUTATION ***
│   │   │     → Generates/randomizes terrain around a nuclear detonation site.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── find_city_at [GL] (245B) (see above)
│   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   ├── update_civ_visibility [GL] (75B)  *** STATE MUTATION *** (see above)
│   │   │   ├── reveal_tile [GL] (154B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   │   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION *** (see above)
│   │   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION *** (see above)
│   │   └── get_tile_improvements [GL] (39B) (see above)
│   ├── pay_building_upkeep [GL] (406B)  *** STATE MUTATION ***
│   │     → Processes building upkeep for a city.
│   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   ├── calc_building_upkeep_cost [GL] (305B)
│   │   │     → Calculates the upkeep cost for a specific building type for a given civ.
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   └── civ_has_tech [GL] (181B) (see above)
│   │   └── city_message_wrapper [UI] (38B) (see above)
│   ├── handle_city_expansion [GL] (650B)  *** STATE MUTATION ***
│   │     → Handles city expansion by checking adjacent tiles for buildable land and dispatching settler/engineer creation.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── ai_add_goal_a [AI] (958B)  *** STATE MUTATION *** (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── find_city_expansion_site [GL] (1095B)  *** STATE MUTATION ***
│   │   │     → Searches for a nearby expansion site for a city's settler/engineer.
│   │   │   ├── find_path [GL] (4118B)  *** STATE MUTATION *** (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── get_tile_continent_if_land [GL] (72B) (see above)
│   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   ├── get_tile_controller [GL] (72B) (see above)
│   │   │   ├── check_tile_trespass [GL] (245B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   └── get_tile_improvements [GL] (39B) (see above)
│   ├── handle_city_disorder_00509590 [MIXED] (933B)  *** STATE MUTATION ***
│   │     → Opens the city window for a specific city, handling disorder state.
│   │   ├── FUN_0000CA8D [??]
│   │   ├── FUN_0000CCB3 [??]
│   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   ├── process_messages [UI] (21B) (see above)
│   │   ├── show_help_topic [UI] (34B) (see above)
│   │   ├── unknown — manage window [UI] (37B) (see above)
│   │   ├── init_city_production_globals [GL] (77B)  *** STATE MUTATION *** (see above)
│   │   └── set_active_surface [UI] (74B) (see above)
│   └── clamp [FW] (57B)
│         → Clamps a value to [min, max] range.
├── spaceship_is_enabled [GL] (90B)
│     → Returns whether the spaceship victory condition is enabled.
└── clamp [FW] (57B)
      → Clamps a value to [min, max] range.
```

---

## process_city_turn (`004F0A9C`, 1903B)

Reachable: 1201 functions (192 state-mutating)

```
process_city_turn [GL] (1903B)  *** STATE MUTATION ***
  → Main city turn processing function.
├── FUN_00009429 [??]
├── has_building [GL] (122B)
│     → Checks if a city has a specific building.
│   └── bit_index_to_byte_mask [GL] (45B)
│         → Converts a bit index to byte offset and bit mask.
├── get_wonder_city [GL] (57B)
│     → Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   └── is_wonder_obsolete [GL] (120B)
│         → Checks if a wonder has been made obsolete by any civ researching its obsolescence tech.
│       └── civ_has_tech [GL] (181B)
│             → Checks if a civilization (param_1) has a specific technology (param_2).
│           └── bit_index_to_byte_mask [GL] (45B) (see above)
├── civ_has_active_wonder [GL] (142B)
│     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   └── get_wonder_city [GL] (57B) (see above)
├── init_city_production_globals [GL] (77B)  *** STATE MUTATION ***
│     → Initializes two global production variables from a city's current production type and accumulated shields.
├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION ***
│     → Entry point for full city production calculation.
│   ├── evaluate_city_tiles [GL] (653B)  *** STATE MUTATION ***
│   │     → Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530 array.
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     → Returns the next unit in the stack linked list, or -1 if at end.
│   │   │   └── validate_unit_stack [GL] (1050B)  *** STATE MUTATION ***
│   │   │       ├── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │       │   ├── show_dialog_message [UI] (43B)
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION ***
│   │   │       │   │     (93 more reachable)
│   │   │       │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION ***
│   │   │       │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION ***
│   │   │       │   │     (95 more reachable)
│   │   │       │   └── get_tile_ptr [GL] (90B)
│   │   │       ├── put_down_unit [GL] (640B)  *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │       │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │       │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── find_first_unit_at [GL] (186B)
│   │   │       │   │     (99 more reachable)
│   │   │       │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │       └── sum_stack_property [GL] (724B)
│   │   │           ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │           └── get_first_unit_in_stack [GL] (118B)
│   │   │                 (97 more reachable)
│   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │     → Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │       │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   │           └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │       └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── get_tile_explored [GL] (71B)
│   │   │     → Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4=road, bit 5=railroa...
│   │       └── get_tile_ptr [GL] (90B) (see above)
│   ├── calc_capital_distance_and_corruption [GL] (1048B)  *** STATE MUTATION ***
│   │     → Calculates distance to capital and corruption-related variables for a city.
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── check_trade_route_path [GL] (682B)  *** STATE MUTATION ***
│   │   │     → Checks if a trade route path exists between two points.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── find_path [GL] (4118B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── set_map_scroll_position [UI] (98B)
│   │   │   │   │   ├── redraw_entire_map [UI] (205B)  *** STATE MUTATION ***
│   │   │   │   │   │     (242 more reachable)
│   │   │   │   │   └── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── debug_show_message [UI] (33B)
│   │   │   │   │   └── show_help_topic [UI] (34B)
│   │   │   │   │         (3 more reachable)
│   │   │   │   ├── draw_number_on_map [UI] (346B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (17 more reachable)
│   │   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── redraw_entire_map [UI] (205B)  *** STATE MUTATION ***
│   │   │   │   │   ├── minimap_full_redraw [UI] (416B)
│   │   │   │   │   │     (146 more reachable)
│   │   │   │   │   ├── recalc_viewport_geometry [UI] (1410B)
│   │   │   │   │   │     (46 more reachable)
│   │   │   │   │   ├── redraw_full_viewport [UI] (278B)
│   │   │   │   │   │     (194 more reachable)
│   │   │   │   │   ├── begin_end_paint_cycle [UI] (100B)
│   │   │   │   │   │     (52 more reachable)
│   │   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   │   │     (44 more reachable)
│   │   │   │   │   └── dialog_create_buttons [UI] (675B)
│   │   │   │   │         (46 more reachable)
│   │   │   │   ├── get_path_cost [GL] (88B)
│   │   │   │   ├── set_path_cost [GL] (91B)  *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   ├── distance_x_wrapped [GL] (111B) (see above)
│   │   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] (253B)  *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   │   └── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   │   ├── check_tile_trespass [GL] (245B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   └── get_tile_city_radius_owner [GL] (42B)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │       └── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── is_tile_worked [GL] (62B)
│   │   │     → Returns whether a specific tile (param_2) is being worked by city param_1.
│   │   ├── calc_movement_cost [GL] (94B)
│   │   │     → Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diagonal_movement_cost.
│   │   │   ├── distance_x_wrapped [GL] (111B) (see above)
│   │   │   └── diagonal_movement_cost [GL] (135B) (see above)
│   │   └── get_tile_continent [GL] (39B)
│   │         → Returns byte 3 of tile data (continent/landmass ID).
│   │       └── get_tile_ptr [GL] (90B) (see above)
│   ├── calc_shields_per_row [GL] (1497B)  *** STATE MUTATION ***
│   │     → Calculates shield production rows and unit support costs for a city.
│   │   ├── check_unit_support [GL] (281B)  *** STATE MUTATION ***
│   │   │     → Checks if a unit requires shield support based on government type.
│   │   ├── calc_food_box_size [GL] (512B)  *** STATE MUTATION ***
│   │   │     → Calculates the food box size (rows to grow) for a city.
│   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   └── get_tile_improvements [GL] (39B) (see above)
│   └── recalc_city_all [GL] (76B)  *** STATE MUTATION ***
│         → Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, computes production, and determines happiness.
│       ├── assign_worker_tiles [GL] (2002B)  *** STATE MUTATION ***
│       │     → Assigns city workers to optimal tiles.
│       │   ├── is_tile_worked [GL] (62B) (see above)
│       │   ├── calc_tile_resource [GL] (1528B)  *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B) (see above)
│       │   │   ├── grassland_has_shield [GL] (72B)
│       │   │   ├── find_city_at [GL] (245B)
│       │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│       │   │   │   └── get_city_owner_at [GL] (111B) (see above)
│       │   │   ├── has_building [GL] (122B) (see above)
│       │   │   ├── get_wonder_city [GL] (57B) (see above)
│       │   │   ├── civ_has_tech [GL] (181B) (see above)
│       │   │   ├── check_auto_irrigation_trigger [GL] (297B)  *** STATE MUTATION ***
│       │   │   │   ├── check_adjacent_water [GL] (242B)
│       │   │   │   └── get_tile_terrain_raw [GL] (41B) (see above)
│       │   │   ├── check_road_trade_trigger [GL] (152B)  *** STATE MUTATION ***
│       │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│       │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│       │   │   ├── check_adjacent_water [GL] (242B)
│       │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│       │   │   │   ├── wrap_x [GL] (94B) (see above)
│       │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│       │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│       │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│       │   │   ├── wrap_x [GL] (94B) (see above)
│       │   │   ├── get_tile_ptr [GL] (90B) (see above)
│       │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│       │   │   ├── get_city_owner_at [GL] (111B) (see above)
│       │   │   ├── get_tile_controller [GL] (72B) (see above)
│       │   │   ├── check_tile_resource [GL] (281B)
│       │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│       │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│       │   │   ├── get_tile_improvements [GL] (39B) (see above)
│       │   │   ├── set_tile_owner [GL] (333B)  *** STATE MUTATION ***
│       │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│       │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│       │   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION ***
│       │   │   │         (89 more reachable)
│       │   │   └── set_tile_city_radius_owner [GL] (312B)  *** STATE MUTATION ***
│       │   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│       │   │       ├── get_tile_ptr [GL] (90B) (see above)
│       │   │       └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│       │   ├── calc_tile_all_resources [GL] (130B)  *** STATE MUTATION ***
│       │   │   └── calc_tile_resource [GL] (1528B)  *** STATE MUTATION *** (see above)
│       │   ├── clear_and_check_worked_tiles [GL] (115B)  *** STATE MUTATION ***
│       │   │   ├── set_tile_worked [GL] (91B)  *** STATE MUTATION ***
│       │   │   └── unknown (get_city_tile_flag) [GL] (29B)
│       │   └── unknown (get_city_tile_flag) [GL] (29B)
│       ├── sync_worker_tile_status [GL] (155B)  *** STATE MUTATION ***
│       │     → Synchronizes worker tile status flags with the current tile assignment state.
│       │   ├── set_worker_tile_status [GL] (93B)  *** STATE MUTATION ***
│       │   └── get_worker_tile_status [GL] (68B)
│       ├── calc_city_production [GL] (1053B)  *** STATE MUTATION ***
│       │     → Calculates a city's production output including building bonuses, factory effects, and waste.
│       │   ├── has_building [GL] (122B) (see above)
│       │   ├── civ_has_active_wonder [GL] (142B) (see above)
│       │   ├── civ_has_tech [GL] (181B) (see above)
│       │   └── calc_corruption [GL] (890B)  *** STATE MUTATION ***
│       │       ├── has_building [GL] (122B) (see above)
│       │       └── calc_corruption_divisor [GL] (81B)
│       ├── calc_happiness [GL] (2627B)  *** STATE MUTATION ***
│       │     → Complete happiness calculation for a city.
│       │   ├── has_building [GL] (122B) (see above)
│       │   ├── calc_city_trade_desirability [GL] (8227B)  *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B) (see above)
│       │   │   ├── has_building [GL] (122B) (see above)
│       │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│       │   │   ├── civ_has_tech [GL] (181B) (see above)
│       │   │   ├── wrap_x [GL] (94B) (see above)
│       │   │   ├── bit_index_to_byte_mask [GL] (45B) (see above)
│       │   │   ├── shift_by_signed [GL] (98B)
│       │   │   ├── get_tile_ptr [GL] (90B) (see above)
│       │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│       │   │   ├── get_tile_continent [GL] (39B) (see above)
│       │   │   ├── check_tile_resource [GL] (281B) (see above)
│       │   │   └── get_tile_improvements [GL] (39B) (see above)
│       │   ├── get_wonder_city [GL] (57B) (see above)
│       │   ├── civ_has_active_wonder [GL] (142B) (see above)
│       │   ├── check_trade_route_path [GL] (682B)  *** STATE MUTATION *** (see above)
│       │   ├── civ_has_tech [GL] (181B) (see above)
│       │   ├── calc_corruption [GL] (890B)  *** STATE MUTATION *** (see above)
│       │   ├── adjust_happy_unhappy [GL] (453B)  *** STATE MUTATION ***
│       │   ├── distribute_trade [GL] (1769B)  *** STATE MUTATION ***
│       │   │   ├── has_building [GL] (122B) (see above)
│       │   │   ├── get_wonder_city [GL] (57B) (see above)
│       │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│       │   │   ├── civ_has_tech [GL] (181B) (see above)
│       │   │   └── count_worker_tiles_with_status [GL] (87B)
│       │   │       └── get_worker_tile_status [GL] (68B) (see above)
│       │   ├── calc_movement_cost [GL] (94B) (see above)
│       │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│       │   └── find_unit_stack_at_xy [GL] (231B) (see above)
│       └── calc_trade_route_income [GL] (378B)  *** STATE MUTATION ***
│             → Calculates trade route income.
├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION ***
│     → Shows a city event notification dialog (e.g., "Building completed", "Famine", etc.).
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   └── popup_show_modal [UI] (999B)
│   │         → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│   │       ├── flush_display [UI] (21B)
│   │       ├── process_messages [UI] (21B)
│   │       │   └── FUN_0000BA4F [??]
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_edit_text [UI] (43B)
│   │       │   └── FUN_00002D4D [??]
│   │       ├── init_palette_system [UI] (21B)
│   │       ├── unknown — manage window [UI] (37B)
│   │       │   └── FUN_0000C692 [??]
│   │       ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION ***
│   │       │   ├── unknown (get drawing context) [UI] (37B)
│   │       │   │   └── focus_and_raise_window [UI] (57B)
│   │       │   ├── widget_scrollbar_dtor [UI] (57B)
│   │       │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │       │   │         (7 more reachable)
│   │       │   └── widget_dropdown_dtor [UI] (57B)
│   │       ├── popup_paint [UI] (1964B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   │   └── invalidate_region [UI] (180B) (see above)
│   │       │   ├── show_window_wrapper [UI] (33B)
│   │       │   │   └── show_window_inner [UI] (38B)
│   │       │   │         (3 more reachable)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   ├── set_rect_wh [UI] (48B) (see above)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │   └── FUN_0000858E [??]
│   │       │   ├── control_invalidate [UI] (65B)
│   │       │   │   ├── FUN_00008B00 [??]
│   │       │   │   └── FUN_00008B2D [??]
│   │       │   ├── draw_border_rect [UI] (61B)
│   │       │   │   └── draw_rect_outline [UI] (128B)
│   │       │   │         (13 more reachable)
│   │       │   ├── scale_sprite [UI] (35B) (see above)
│   │       │   ├── set_sprite_scale [UI] (33B)
│   │       │   │   └── scale_table_build_primary [UI] (657B)
│   │       │   │         (2 more reachable)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   │   └── rect_get_width [UI] (27B)
│   │       │   ├── widget_get_height [UI] (34B)
│   │       │   │   └── rect_get_height [UI] (28B)
│   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │       │   │   └── widget_inflate_rect [UI] (34B)
│   │       │   ├── popup_get_padded_height [UI] (42B)
│   │       │   ├── popup_render_label [UI] (226B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   └── port_fill_rect_pattern [UI] (201B)
│   │       │   │         (4 more reachable)
│   │       │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_render_text_at_offset [UI] (61B)
│   │       │   │   │     (5 more reachable)
│   │       │   │   └── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │         (4 more reachable)
│   │       │   ├── popup_layout_dialog [UI] (4785B)
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_calc_max_text_height [UI] (132B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── popup_get_line_height [UI] (78B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B) (see above)
│   │       │   │   ├── popup_calc_button_area_height [UI] (46B)
│   │       │   │   ├── popup_calc_text_width [UI] (51B)
│   │       │   │   ├── popup_set_text_style [UI] (189B) (see above)
│   │       │   │   ├── popup_render_label [UI] (226B) (see above)
│   │       │   │   ├── popup_has_negative_line_count [UI] (83B)
│   │       │   │   ├── popup_layout_text [UI] (1326B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_get_radio_page_number [UI] (56B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B) (see above)
│   │       │   │   ├── unknown (popup_draw_icon) [UI] (55B) (see above)
│   │       │   │   ├── blit_rect_to_rect [UI] (95B)
│   │       │   │   │     (10 more reachable)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │       │   │   └── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   ├── popup_redraw_visible_items [UI] (660B)
│   │       │   │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   │   ├── invalidate_region [UI] (180B) (see above)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   ├── draw_border_rect [UI] (61B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B) (see above)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B) (see above)
│   │       │   │   ├── popup_draw_item [UI] (706B)
│   │       │   │   │     (27 more reachable)
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   └── port_set_rect [UI] (91B)
│   │       │   ├── popup_create_window [UI] (693B)
│   │       │   │   ├── set_callback_0x44 [UI] (45B)
│   │       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │       │   │   │     (5 more reachable)
│   │       │   │   ├── unknown (set_font_size) [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── create_offscreen_surface [UI] (115B)
│   │       │   │   │     (38 more reachable)
│   │       │   │   └── create_offscreen_surface_b [UI] (119B)
│   │       │   │         (38 more reachable)
│   │       │   ├── popup_init_controls [UI] (6616B)
│   │       │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │       │   │   ├── create_text_button [UI] (133B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── set_button_owner [UI] (45B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── set_button_handler [UI] (45B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── set_button_click_callback [UI] (33B)
│   │       │   │   ├── create_checkbox [UI] (167B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── set_checkbox_value [UI] (33B)
│   │       │   │   ├── create_scrollbar [UI] (124B)
│   │       │   │   │     (9 more reachable)
│   │       │   │   ├── scrollbar_set_position [UI] (52B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── scrollbar_set_range [UI] (47B)
│   │       │   │   │     (3 more reachable)
│   │       │   │   ├── scrollbar_set_callback [UI] (33B)
│   │       │   │   ├── set_edit_max_chars [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── create_listbox_control [UI] (121B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── add_listbox_item [UI] (49B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── disable_civ_slot [UI] (133B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown (set selected item) [UI] (33B)
│   │       │   │   ├── pedia_button_create [UI] (139B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── unknown (set button callback) [UI] (33B)
│   │       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │       │   │   ├── scale_sprite [UI] (35B) (see above)
│   │       │   │   ├── widget_get_height [UI] (34B) (see above)
│   │       │   │   ├── scrollbar_init [UI] (93B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── scrollbar_create_window [UI] (207B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── scrollbar_set_position [UI] (33B)
│   │       │   │   ├── scrollbar_set_range [UI] (33B)
│   │       │   │   ├── unknown [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown [UI] (33B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B) (see above)
│   │       │   │   ├── popup_count_items_in_pane [UI] (93B)
│   │       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│   │       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   └── set_scrollbar [UI] (64B)
│   │       │   │         (2 more reachable)
│   │       │   ├── popup_draw_background [UI] (309B)
│   │       │   │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │       │   │   ├── unknown [UI] (56B)
│   │       │   │   └── tile_bitmap [UI] (391B)
│   │       │   │         (10 more reachable)
│   │       │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │   └── popup_render_label [UI] (226B) (see above)
│   │       │   ├── draw_3d_border [UI] (167B)
│   │       │   │   ├── draw_hline [UI] (69B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   └── draw_vline [UI] (69B)
│   │       │   │         (8 more reachable)
│   │       │   ├── port_draw_text_styled [UI] (238B)
│   │       │   │   ├── FUN_0000847F [??]
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   │   └── draw_string_palette [UI] (534B)
│   │       │   │         (2 more reachable)
│   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │   ├── FUN_0000847F [??] (see above)
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   │   └── draw_string_palette [UI] (534B) (see above)
│   │       │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │       │   │         (7 more reachable)
│   │       │   └── unknown (invalidate_all_children) [UI] (115B)
│   │       │       ├── FUN_00008B00 [??] (see above)
│   │       │       └── FUN_00008B2D [??] (see above)
│   │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │       │   └── FUN_00003CFF [??]
│   │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │       │   └── FUN_00003D62 [??]
│   │       └── modal_dialog_run [UI] (283B)
│   │           ├── process_messages [UI] (21B) (see above)
│   │           ├── get_view_window_handle [UI] (28B) (see above)
│   │           ├── disable_parent_window [UI] (121B)
│   │           └── enable_parent_window [UI] (126B)
│   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION ***
│   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges.
│   │   └── scroll_map_if_needed [UI] (404B)
│   │         → Checks if position (param_1, param_2) is near the edges of the visible map area and scrolls the map if necessary.
│   │       └── set_map_scroll_position [UI] (98B) (see above)
│   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION ***
│   │     → Sets a string control value in the multiplayer dialog string table.
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool.
│   ├── dialog_set_title [UI] (41B)
│   │     → Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   └── dialog_set_title_impl [UI] (42B)
│   │         → Implements title setting via CSocket::Create (misidentified by Ghidra — actually a string copy/display operation).
│   ├── city_event_dialog_cleanup_free [FW] (12B)
│   │     → Dialog destructor for city event dialog — frees an allocated buffer via thunk_FUN_0059df8a.
│   │   └── popup_dialog_close [UI] (47B)
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │       └── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   ├── city_event_dialog_seh_epilog [FW] (15B)
│   │     → SEH epilog for city event dialog.
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object.
│   │   ├── unknown (popup list init) [UI] (64B)
│   │   │     → Resets and initializes a popup list control with 9 slots and param_1 items.
│   │   └── popup_dialog_reset [UI] (1299B)
│   │         → Resets all fields of a popup dialog structure to default values.
│   ├── popup_set_default_selection [UI] (116B)
│   │     → Sets the default selected item in the popup by ID.
│   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │     → Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1.
│   │   └── popup_find_button_by_id [UI] (100B)
│   │         → Searches the popup's button linked list (head at this+0x234) for a node whose first field (node[0]) matches param_1.
│   └── popup_add_radio_option [UI] (566B)
│         → Adds a radio button option to the popup dialog.
│       ├── measure_text_height [UI] (42B) (see above)
│       └── popup_get_button_width [UI] (32B)
│             → Returns the constant 0x20 (32), which is the standard button icon width for popup dialogs.
├── process_city_food [GL] (1512B)  *** STATE MUTATION ***
│     → Processes city food production at end of turn.
│   ├── show_message [UI] (46B)
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── set_improvement_name_string [UI] (41B)
│   │     → Sets a dialog string control to an improvement/building name.
│   │   └── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   ├── has_building [GL] (122B) (see above)
│   ├── remove_trade_route [GL] (199B)  *** STATE MUTATION ***
│   │     → Removes a trade route at index param_2 from city param_1 by shifting subsequent trade route entries down and decrementing the trade route...
│   ├── check_auto_improvement [GL] (152B)
│   │     → Checks if a city should auto-build a Granary (9) or Aqueduct (23/0x17) based on city size thresholds.
│   │   └── has_building [GL] (122B) (see above)
│   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION ***
│   │     → Changes a city's production item.
│   │   ├── select_list_item [UI] (38B) (see above)
│   │   ├── show_message [UI] (46B) (see above)
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman").
│   │   ├── ai_choose_city_production [AI] (29400B)  *** STATE MUTATION ***
│   │   │     → The massive AI city production decision function.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   └── show_help_topic [UI] (34B) (see above)
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── set_building [GL] (186B)  *** STATE MUTATION ***
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B) (see above)
│   │   │   ├── city_adjacent_to_continent [GL] (238B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   ├── find_best_coastal_continent [GL] (344B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   ├── is_wonder_obsolete [GL] (120B) (see above)
│   │   │   ├── get_wonder_city [GL] (57B) (see above)
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   ├── has_spaceship_built [GL] (47B)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── can_build_unit_type [GL] (1095B)
│   │   │   │   └── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── can_build_improvement [GL] (1383B)
│   │   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   └── can_build_wonder [GL] (199B)
│   │   │   │       └── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── is_tile_worked [GL] (62B) (see above)
│   │   │   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │   │   ├── spaceship_ai_evaluate [AI] (1064B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── spaceship_get_category_count [GL] (140B)
│   │   │   │   │   └── spaceship_get_max_component [GL] (264B)
│   │   │   │   │         (1 more reachable)
│   │   │   │   ├── spaceship_get_raw_count [GL] (202B)
│   │   │   │   ├── spaceship_get_clamped_category [GL] (140B)
│   │   │   │   │   └── spaceship_get_clamped_count [GL] (89B)
│   │   │   │   │         (1 more reachable)
│   │   │   │   ├── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION ***
│   │   │   │   │   ├── calc_year_from_turn [GL] (540B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── spaceship_get_clamped_count [GL] (89B) (see above)
│   │   │   │   │   └── spaceship_calc_population_capacity [GL] (90B)
│   │   │   │   ├── unknown (spaceship section complete check) [GL] (66B)
│   │   │   │   │   ├── spaceship_get_max_category [GL] (79B)
│   │   │   │   │   └── spaceship_get_raw_count [GL] (202B) (see above)
│   │   │   │   └── spaceship_can_build_category [GL] (132B)
│   │   │   │       ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │       ├── spaceship_get_raw_count [GL] (202B) (see above)
│   │   │   │       ├── unknown (spaceship section complete check) [GL] (66B) (see above)
│   │   │   │       └── unknown (spaceship category full check) [GL] (70B)
│   │   │   │             (1 more reachable)
│   │   │   ├── spaceship_is_enabled [GL] (90B)
│   │   │   ├── spaceship_ai_should_start [AI] (583B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   └── spaceship_is_enabled [GL] (90B) (see above)
│   │   │   ├── rng_range [GL] (113B)  *** STATE MUTATION ***
│   │   │   │   └── rng_next_float [GL] (94B)  *** STATE MUTATION ***
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   │   └── get_unit_hp_remaining [GL] (98B)  *** STATE MUTATION ***
│   │   │   │       └── get_unit_max_hp [GL] (45B) (see above)
│   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   └── calc_unit_movement_points [GL] (516B) (see above)
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   ├── relocate_unit [GL] (388B)  *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── put_down_unit [GL] (640B)  *** STATE MUTATION *** (see above)
│   │   │   ├── delete_unit [GL] (1129B)  *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   ├── FUN_0000C679 [??]
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
│   │   │   ├── check_adjacent_enemy_continent [GL] (297B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   ├── sum_stack_property [GL] (724B) (see above)
│   │   │   ├── count_units_by_role [GL] (120B) (see above)
│   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   └── get_unit_moves_remaining [GL] (69B) (see above)
│   │   │   ├── refresh_unit_movement [GL] (40B)  *** STATE MUTATION ***
│   │   │   │   └── calc_unit_movement_points [GL] (516B) (see above)
│   │   │   ├── check_unit_can_improve [GL] (354B)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── check_adjacent_water [GL] (242B) (see above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   │   ├── get_tile_continent [GL] (39B) (see above)
│   │   │   ├── get_unit_owner_at [GL] (66B) (see above)
│   │   │   ├── check_tile_resource [GL] (281B) (see above)
│   │   │   ├── (count_techs_discovered) [GL] (86B)
│   │   │   │   └── (check_tech_bit) [GL] (78B)
│   │   │   │       └── bit_index_to_byte_mask [GL] (45B) (see above)
│   │   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   │   └── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       ├── get_tile_ptr [GL] (90B) (see above)
│   │   │       └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   ├── calc_food_box_with_difficulty [GL] (106B)
│   │   │     → Calculates adjusted food box size based on difficulty.
│   │   │   └── classify_production_type [GL] (58B)
│   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │     → Enqueues a multiplayer event message.
│   │   │   └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   ├── popup_dialog_close [UI] (47B) (see above)
│   │   ├── popup_add_button [UI] (360B)
│   │   │     → Adds a button to the popup dialog.
│   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   └── init_editor_scrollbar [UI] (34B) (see above)
│   │   └── get_tile_continent [GL] (39B) (see above)
│   ├── civ_has_active_wonder [GL] (142B) (see above)
│   ├── update_map_area_all_players [UI] (136B)
│   │     → Updates a map area for all active players (all viewports in MP).
│   │   └── update_map_area [UI] (313B)  *** STATE MUTATION ***
│   │         → Redraws a map area and optionally invalidates it.
│   │       ├── tile_to_screen [UI] (151B) (see above)
│   │       ├── is_tile_visible [UI] (99B) (see above)
│   │       ├── redraw_tile_area [UI] (352B)
│   │       │   ├── draw_complete_tile [UI] (495B)
│   │       │   │   ├── flush_display [UI] (21B) (see above)
│   │       │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │       │   │   ├── tile_to_screen [UI] (151B) (see above)
│   │       │   │   ├── render_tile [UI] (4431B)
│   │       │   │   │     (80 more reachable)
│   │       │   │   ├── render_city_on_map [UI] (392B)
│   │       │   │   │     (40 more reachable)
│   │       │   │   ├── draw_units_at_tile [UI] (662B)
│   │       │   │   │     (96 more reachable)
│   │       │   │   ├── reset_sprite_scale [UI] (28B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── set_current_zoom_scale [UI] (41B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │       │   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │       │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       │   │   └── FUN_0064F394 [??]
│   │       │   ├── is_tile_visible [UI] (99B) (see above)
│   │       │   ├── draw_city_labels [UI] (871B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── get_civ_foreground_color [UI] (92B)
│   │       │   │   ├── tile_to_screen [UI] (151B) (see above)
│   │       │   │   ├── is_tile_visible [UI] (99B) (see above)
│   │       │   │   ├── scale_at_current_zoom [UI] (47B)
│   │       │   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │       │   │   ├── get_tile_explored [GL] (71B) (see above)
│   │       │   │   ├── set_text_draw_source [UI] (24B)
│   │       │   │   ├── set_text_style [UI] (68B)
│   │       │   │   └── draw_text_with_shadow [UI] (205B)
│   │       │   │         (2 more reachable)
│   │       │   ├── calc_tile_group_rect [UI] (191B)
│   │       │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │       │   │   ├── tile_to_screen [UI] (151B) (see above)
│   │       │   │   └── intersect_rect_wrapper [UI] (34B)
│   │       │   ├── wrap_x [GL] (94B) (see above)
│   │       │   └── port_set_rect [UI] (91B) (see above)
│   │       ├── invalidate_tile_area [UI] (60B)
│   │       │   ├── invalidate_region [UI] (180B) (see above)
│   │       │   └── calc_tile_group_rect [UI] (191B) (see above)
│   │       ├── reset_sprite_scale [UI] (28B)
│   │       │   └── scale_table_build_primary [UI] (657B) (see above)
│   │       ├── set_current_zoom_scale [UI] (41B)
│   │       │   └── set_sprite_scale [UI] (33B) (see above)
│   │       └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── set_paradrop_range [GL] (31B)  *** STATE MUTATION ***
│   │     → Sets the paradrop range for a unit type.
│   ├── calc_food_box_size [GL] (512B)  *** STATE MUTATION *** (see above)
│   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   ├── city_message_wrapper [UI] (38B)
│   │     → Wrapper to display a city-related message.
│   │   └── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   ├── draw_citizens_row [UI] (577B)
│   │     → Draws the citizen row panel at the top of the city window: header labels (food/shields produced), citizen icons, and click regions for ea...
│   │   ├── invalidate_region [UI] (180B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── text_begin [UI] (29B) (see above)
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── draw_text_centered [UI] (46B)
│   │   │     → Draws text centered within a rect at (param_2, param_3) with width param_4.
│   │   │   └── draw_text_centered [UI] (139B)
│   │   │       ├── measure_text_height [UI] (42B) (see above)
│   │   │       └── draw_text_with_shadow [UI] (205B) (see above)
│   │   ├── close_dialog [UI] (94B)
│   │   │     → Removes all click regions with a matching dialog ID (param_1).
│   │   │   └── remove_click_region [UI] (107B)
│   │   ├── citywin_prepare_panel [UI] (77B)
│   │   │     → Prepares a panel for drawing: clears surface, sets draw state, blits background.
│   │   │   ├── citywin_blit_panel [UI] (129B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   └── blit_rect_to_rect [UI] (95B) (see above)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   └── set_text_draw_source [UI] (24B) (see above)
│   │   ├── citywin_draw_citizen_icons [UI] (1186B)
│   │   │     → Draws all citizen icons for the city: happy citizens, content citizens, unhappy citizens, and specialists (entertainers/taxmen/scientists).
│   │   │   ├── get_city_epoch [GL] (158B)
│   │   │   │   └── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── get_worker_tile_status [GL] (68B) (see above)
│   │   │   ├── scale_universal [UI] (67B)
│   │   │   ├── calc_icon_spacing [UI] (264B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │       └── dispatch_oleitem_dimmed [UI] (677B)
│   │   │           ├── rect_get_width [UI] (27B) (see above)
│   │   │           ├── rect_get_height [UI] (28B) (see above)
│   │   │           ├── unknown (get panel icon width) [UI] (37B)
│   │   │           ├── unknown (get panel icon height) [UI] (37B)
│   │   │           ├── init_editor_scrollbar [UI] (34B) (see above)
│   │   │           ├── widget_get_height [UI] (34B) (see above)
│   │   │           ├── get_surface_buffer_handle [UI] (28B)
│   │   │           ├── unknown (get surface base) [UI] (28B)
│   │   │           ├── scale_coords [UI] (254B)
│   │   │           ├── check_topdown [UI] (41B)
│   │   │           └── pixel_fill [UI] (308B)
│   │   ├── invalidate_rect_region [UI] (78B)
│   │   │     → Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then calling thunk_FUN_0046ace7.
│   │   │   └── add_click_region [UI] (153B)
│   │   │       └── set_rect_wh [UI] (48B) (see above)
│   │   ├── scale_universal [UI] (67B)
│   │   │     → Scales a value based on the display scale factor at `this + 0x15d4`.
│   │   └── set_text_style [UI] (68B) (see above)
│   ├── draw_food_storage [UI] (1081B)
│   │     → Draws the food storage box in the city window.
│   │   ├── rect_get_width [UI] (27B) (see above)
│   │   ├── rect_get_height [UI] (28B) (see above)
│   │   ├── invalidate_region [UI] (180B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   ├── widget_inflate_rect [UI] (34B) (see above)
│   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   ├── draw_line [UI] (46B)
│   │   │     → Draws a horizontal line by delegating to thunk_FUN_005a97cc with the global drawing surface DAT_00635c64 and 4 coordinate parameters.
│   │   │   └── draw_hline [UI] (69B) (see above)
│   │   ├── draw_3d_frame [UI] (42B)
│   │   │     → Draws a 3D frame/border by delegating to thunk_FUN_005a99fc (draw_3d_border) with the global surface and 3 params.
│   │   │   └── draw_3d_border [UI] (167B) (see above)
│   │   ├── blit_sprite_8param [UI] (62B)
│   │   │     → Blits a sprite with 8 parameters by calling thunk_FUN_00548c78 with the global surface prepended.
│   │   │   └── draw_icon_row_spaced [UI] (246B)
│   │   │       ├── calc_icon_spacing [UI] (264B) (see above)
│   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── scale_universal [UI] (67B) (see above)
│   │   ├── calc_icon_spacing [UI] (264B) (see above)
│   │   └── set_text_style [UI] (68B) (see above)
│   ├── delete_unit_safely [GL] (677B)  *** STATE MUTATION ***
│   │     → Safely deletes a unit, handling the case where it's a ship carrying units.
│   │   ├── FUN_0000C494 [??] (see above)
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   │   ├── delete_all_units_in_stack [GL] (144B)  *** STATE MUTATION ***
│   │   │     → Deletes every unit in a stack by iterating from first to last.
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   └── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   │   ├── load_unit_onto_ship [GL] (1912B)  *** STATE MUTATION ***
│   │   │     → Loads ground/air units onto a transport ship.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   ├── set_unit_goto_order [GL] (66B)  *** STATE MUTATION ***
│   │   │   ├── relocate_unit [GL] (388B)  *** STATE MUTATION *** (see above)
│   │   │   ├── eject_air_units [GL] (343B)  *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   └── relocate_unit [GL] (388B)  *** STATE MUTATION *** (see above)
│   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   └── is_tile_ocean [GL] (57B) (see above)
│   └── _strcpy_thunk [FW] (7B)
│         → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── process_city_production [GL] (10931B)  *** STATE MUTATION ***
│     → Massive end-of-turn city production processing function.
│   ├── show_message [UI] (46B) (see above)
│   ├── get_civ_name [UI] (28B)
│   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   └── get_civ_adjective_name [GL] (145B)
│   │         → Returns the adjective form of a civilization name.
│   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   ├── set_improvement_name_string [UI] (41B) (see above)
│   ├── trade_supply_demand_show [UI] (1022B)
│   │     → Shows the supply/demand details for a specific trade commodity in a specific city.
│   ├── has_building [GL] (122B) (see above)
│   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   ├── check_auto_improvement [GL] (152B) (see above)
│   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION ***
│   │     → Plays a sound effect by ID.
│   │   ├── flush_display [UI] (21B) (see above)
│   │   └── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   ├── has_spaceship_launched [GL] (47B) (see above)
│   ├── has_spaceship_built [GL] (47B) (see above)
│   ├── wonder_view_init [UI] (155B)
│   │     → Initializes the wonder view display: constructs the wonder view object, loads wonder art, plays wonder video (if applicable), and handles...
│   │   ├── unknown (stop music) [UI] (31B)
│   │   │     → Stops music playback and sets paused flag.
│   │   ├── resume_music [UI] (85B)
│   │   │     → Resumes music if enabled.
│   │   │   ├── select_random_music_track [UI] (388B)
│   │   │   └── unknown (stop music) [UI] (31B) (see above)
│   │   ├── wonder_view_construct [UI] (154B)
│   │   │     → Constructs the wonder view object, setting up MFC base classes and storing global pointer in DAT_006a1864.
│   │   │   ├── dialog_ctor [UI] (146B)
│   │   │   │   └── init_sprite_surface_mgr [UI] (133B) (see above)
│   │   │   └── palette_init [UI] (145B)
│   │   │       ├── FUN_0000E780 [??]
│   │   │       ├── palette_generate_random_id [UI] (75B)
│   │   │       └── unknown (palette_create) [UI] (60B)
│   │   ├── load_civ2_art_004bbb3f [UI] (638B)
│   │   │     → Loads wonder artwork from "civ2.wonder.dll", extracts the specific wonder's GIF sprite, creates a scaled bitmap surface, and displays it ...
│   │   │   ├── set_callback_paint [UI] (45B)
│   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   └── port_alloc_rect [UI] (58B)
│   │   │   │       └── port_alloc [UI] (325B)
│   │   │   │             (18 more reachable)
│   │   │   ├── pedia_free_resource [UI] (57B)
│   │   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │   │   └── unknown (update pedia display surface) [UI] (49B)
│   │   │   │       └── select_palette [UI] (57B)
│   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │   │   │   └── FUN_0000C763 [??]
│   │   │   ├── wonder_view_refresh_surface [UI] (60B)
│   │   │   │   ├── set_dialog_background [UI] (24B)  *** STATE MUTATION ***
│   │   │   │   └── unknown (dialog_render_title_bar) [UI] (3401B) (see above)
│   │   │   ├── dialog_create [UI] (588B)
│   │   │   │   ├── unknown (set_font_size) [UI] (43B) (see above)
│   │   │   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │   │   │   └── set_callback_0x3c [UI] (40B)
│   │   │   │   ├── dialog_create_buttons [UI] (675B) (see above)
│   │   │   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │   │   └── create_offscreen_surface_b [UI] (119B) (see above)
│   │   │   ├── set_active_surface [UI] (74B)
│   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   └── call_refresh_callback [UI] (47B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   └── port_alloc [UI] (325B) (see above)
│   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   │   └── port_alloc [UI] (325B) (see above)
│   │   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │   │   └── write_full_colortable [UI] (39B)
│   │   │   │   │         (1 more reachable)
│   │   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   │   ├── palette_apply [UI] (90B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   └── palette_set_entry [UI] (316B)
│   │   │   │   ├── check_topdown [UI] (41B) (see above)
│   │   │   │   └── flip_surface_vertical [UI] (249B)
│   │   │   │       └── get_pixel_buffer [UI] (39B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── port_lock [UI] (287B)
│   │   │   │   │   ├── check_topdown [UI] (41B) (see above)
│   │   │   │   │   └── get_pixel_buffer [UI] (39B) (see above)
│   │   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   │   ├── get_surface_buffer_handle [UI] (28B) (see above)
│   │   │   │   ├── check_topdown [UI] (41B) (see above)
│   │   │   │   └── fill_rect_8bit [UI] (152B)
│   │   │   ├── port_set_color [UI] (43B)
│   │   │   │   └── port_fill_rect [UI] (236B) (see above)
│   │   │   ├── sprite_reset [UI] (98B)
│   │   │   │   └── sprite_init_record [UI] (128B)
│   │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │   │   ├── sprite_lock_data [UI] (56B)
│   │   │   │   └── sprite_extract_from_oleitem [UI] (1951B)
│   │   │   │       ├── rect_get_width [UI] (27B) (see above)
│   │   │   │       ├── rect_get_height [UI] (28B) (see above)
│   │   │   │       ├── port_lock [UI] (287B) (see above)
│   │   │   │       ├── port_unlock [UI] (83B)
│   │   │   │       │     (1 more reachable)
│   │   │   │       ├── port_get_pixel_ptr [UI] (45B)
│   │   │   │       ├── surface_is_locked [UI] (44B) (see above)
│   │   │   │       ├── pixel_ptr_next_row [UI] (33B)
│   │   │   │       ├── pixel_ptr_prev_row [UI] (33B)
│   │   │   │       └── sprite_unlock_data [UI] (56B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── wonder_view_play_video [UI] (699B)
│   │   │     → Plays a wonder video (AVI) if available and video features are enabled.
│   │   │   ├── set_callback_paint [UI] (45B) (see above)
│   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   ├── init_palette_system [UI] (21B) (see above)
│   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│   │   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │   │   └── FUN_0000C44D [??]
│   │   │   ├── fade_out_palette [UI] (153B)
│   │   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   │   │   └── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── apply_palette_to_surfaces [UI] (241B)
│   │   │   │   │   ├── unknown (realize all palettes) [UI] (151B)
│   │   │   │   │   │     (10 more reachable)
│   │   │   │   │   └── port_load_tga_file [UI] (171B)
│   │   │   │   ├── restore_palette_entries [UI] (135B)
│   │   │   │   │   └── palette_apply [UI] (90B) (see above)
│   │   │   │   ├── unknown (realize all palettes) [UI] (151B)
│   │   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   │   └── init_palette_system [UI] (21B) (see above)
│   │   │   │   ├── palette_setup_crossfade [UI] (261B)
│   │   │   │   │   └── unknown (palette apply with range) [UI] (60B)
│   │   │   │   │         (2 more reachable)
│   │   │   │   ├── palette_restore_from_crossfade [UI] (150B)
│   │   │   │   │   └── palette_set_entries [UI] (142B) (see above)
│   │   │   │   └── palette_crossfade_step [UI] (491B)
│   │   │   │       ├── FUN_0000EA62 [??]
│   │   │   │       └── unknown (palette_set_entry_raw) [UI] (55B)
│   │   │   ├── fade_in_palette [UI] (153B)
│   │   │   │   ├── wait_for_animation [UI] (109B) (see above)
│   │   │   │   ├── unknown (realize palettes) [UI] (151B)
│   │   │   │   │   ├── init_palette_system [UI] (21B) (see above)
│   │   │   │   │   └── set_active_surface [UI] (74B) (see above)
│   │   │   │   ├── restore_palette_entries [UI] (135B) (see above)
│   │   │   │   ├── unknown (realize all palettes) [UI] (151B) (see above)
│   │   │   │   ├── palette_setup_crossfade [UI] (261B) (see above)
│   │   │   │   ├── palette_restore_from_crossfade [UI] (150B) (see above)
│   │   │   │   └── palette_crossfade_step [UI] (491B) (see above)
│   │   │   ├── wonder_view_resize [UI] (132B)
│   │   │   │   ├── init_palette_system [UI] (21B) (see above)
│   │   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B) (see above)
│   │   │   │   ├── dialog_create_buttons [UI] (675B) (see above)
│   │   │   │   ├── set_active_surface [UI] (74B) (see above)
│   │   │   │   ├── scroll_to_clamped [UI] (153B)
│   │   │   │   │   ├── set_surface_size [UI] (47B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   ├── get_scroll_min [UI] (49B)
│   │   │   │   │   └── get_scroll_max [UI] (52B)
│   │   │   │   └── port_fill_rect [UI] (236B) (see above)
│   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   └── pedia_navigate_to_item [UI] (369B)
│   │         → Navigates the Civilopedia to a specific item by index.
│   │       ├── end_paint [UI] (32B) (see above)
│   │       ├── show_window_wrapper [UI] (33B) (see above)
│   │       ├── unknown (lock pedia surface) [UI] (38B)
│   │       │   ├── unknown (get drawing context) [UI] (37B) (see above)
│   │       │   └── surface_list_find_dirty [UI] (174B)
│   │       ├── pedia_init_tabs [UI] (1391B)
│   │       │   ├── control_invalidate [UI] (65B) (see above)
│   │       │   ├── set_edit_text [UI] (43B)
│   │       │   │   └── FUN_00002D7F [??]
│   │       │   ├── pedia_button_ctor [UI] (83B)
│   │       │   ├── pedia_button_create [UI] (139B) (see above)
│   │       │   ├── unknown (set button callback) [UI] (33B) (see above)
│   │       │   └── unknown (clear hypertext links) [UI] (21B)
│   │       ├── pedia_clear_item_list [UI] (118B)
│   │       │   └── init_palette_system [UI] (21B) (see above)
│   │       ├── pedia_draw_frame [UI] (800B)
│   │       │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │       │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │       │   │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │       │   │   └── tile_bitmap [UI] (391B) (see above)
│   │       │   ├── draw_3d_border [UI] (167B) (see above)
│   │       │   ├── port_set_rect_from_self [UI] (63B) (see above)
│   │       │   ├── port_set_rect [UI] (91B) (see above)
│   │       │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │       │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       ├── pedia_open_category [UI] (200B)
│   │       │   ├── show_window_wrapper [UI] (33B) (see above)
│   │       │   ├── set_dialog_enabled [UI] (36B)
│   │       │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │       │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │       │   ├── pedia_set_title [UI] (229B)
│   │       │   │   ├── text_begin [UI] (29B) (see above)
│   │       │   │   ├── text_add_string [UI] (33B) (see above)
│   │       │   │   └── text_add_label_id [UI] (33B) (see above)
│   │       │   ├── pedia_push_history [UI] (523B)
│   │       │   └── set_active_surface [UI] (74B) (see above)
│   │       ├── pedia_get_entry_name [UI] (89B)
│   │       ├── civpedia_select_item [UI] (334B)
│   │       │   ├── end_paint [UI] (32B) (see above)
│   │       │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │       │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │       │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │       │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │       │   ├── pedia_open_category [UI] (200B) (see above)
│   │       │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │       │   ├── civpedia_draw_detail [UI] (1542B)
│   │       │   │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   │   ├── invalidate_region [UI] (180B) (see above)
│   │       │   │   ├── text_begin [UI] (29B) (see above)
│   │       │   │   ├── text_add_string [UI] (33B) (see above)
│   │       │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │       │   │   ├── get_font_height [UI] (28B) (see above)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── text_begin_bold [UI] (29B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── display_improvement [UI] (33B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── unknown (get panel icon width) [UI] (37B) (see above)
│   │       │   │   ├── unknown (get panel icon height) [UI] (37B) (see above)
│   │       │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │       │   │   ├── pedia_show_description [UI] (593B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── pedia_add_hyperlink [UI] (1361B)
│   │       │   │   │     (21 more reachable)
│   │       │   │   ├── widget_get_height [UI] (34B) (see above)
│   │       │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B) (see above)
│   │       │   │   ├── pedia_load_description [UI] (388B)  *** STATE MUTATION ***
│   │       │   │   │     (16 more reachable)
│   │       │   │   ├── port_set_rect [UI] (91B) (see above)
│   │       │   │   ├── port_set_clip_rect [UI] (55B)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │       │   │   ├── port_get_font [UI] (75B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       │   └── modal_dialog_run [UI] (283B) (see above)
│   │       ├── pedia_draw_item_detail [UI] (1488B)
│   │       │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   ├── invalidate_region [UI] (180B) (see above)
│   │       │   ├── text_begin [UI] (29B) (see above)
│   │       │   ├── text_add_label_id [UI] (33B) (see above)
│   │       │   ├── get_font_height [UI] (28B) (see above)
│   │       │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   ├── text_begin_bold [UI] (29B) (see above)
│   │       │   ├── display_improvement [UI] (33B) (see above)
│   │       │   ├── unknown (get panel icon width) [UI] (37B) (see above)
│   │       │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │       │   ├── pedia_show_description [UI] (593B) (see above)
│   │       │   ├── pedia_add_hyperlink [UI] (1361B) (see above)
│   │       │   ├── widget_get_height [UI] (34B) (see above)
│   │       │   ├── unknown (pedia_draw_background_panel) [UI] (226B) (see above)
│   │       │   ├── pedia_load_description [UI] (388B)  *** STATE MUTATION *** (see above)
│   │       │   ├── port_set_rect [UI] (91B) (see above)
│   │       │   ├── port_set_clip_rect [UI] (55B) (see above)
│   │       │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │       │   ├── port_get_font [UI] (75B) (see above)
│   │       │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       └── modal_dialog_run [UI] (283B) (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── upgrade_units_for_tech [GL] (970B)  *** STATE MUTATION ***
│   │     → When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type.
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │     → Shows a game popup dialog with 3 arguments using the global dialog context.
│   │   │   └── show_terrain_help [UI] (58B)
│   │   │       └── FUN_0051D564 [??] (178B)
│   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     → Updates a single tile for all active players.
│   │   │   └── update_map_tile [UI] (50B)
│   │   │       └── update_map_area [UI] (313B)  *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   └── enqueue_mp_event [MIXED] (398B) (see above)
│   ├── can_build_unit_type [GL] (1095B) (see above)
│   ├── complete_research [MIXED] (1422B)  *** STATE MUTATION ***
│   │     → Completes a tech research for a civ.
│   │   ├── text_begin [UI] (29B) (see above)
│   │   ├── select_list_item [UI] (38B) (see above)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── display_improvement [UI] (33B) (see above)
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   ├── reassign_all_city_production [GL] (254B)  *** STATE MUTATION ***
│   │   │     → Reassigns production for all cities belonging to a specific civ (param_1).
│   │   │   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   ├── get_civ_adjective_name [GL] (145B) (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── handle_tech_government_effects [GL] (973B)  *** STATE MUTATION ***
│   │   │     → Handles side effects when a civ discovers a tech that unlocks a new government form.
│   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │   │   │   └── FUN_0051D564 [??] (178B) (see above)
│   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   └── set_government_type [GL] (529B)  *** STATE MUTATION ***
│   │   │       ├── show_tax_rate_dialog [MIXED] (226B)  *** STATE MUTATION ***
│   │   │       │   ├── FUN_00009429 [??] (see above)
│   │   │       │   ├── open_tax_rate_dialog [MIXED] (4140B)  *** STATE MUTATION ***
│   │   │       │   │     (234 more reachable)
│   │   │       │   └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       └── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │   ├── we_love_the_king_day [GL] (379B)
│   │   │     → Triggers "We Love the King Day" celebration for a civilization.
│   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── unknown (show tech help) [UI] (43B)
│   │   │   │   └── show_tech_help [UI] (92B)
│   │   │   │       └── FUN_0051D564 [??] (178B) (see above)
│   │   │   └── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION ***
│   │   │     → Master handler for when a civilization discovers a new technology.
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   ├── text_newline [UI] (29B) (see above)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_wonder_owner [GL] (73B)
│   │   │   │   └── get_wonder_city [GL] (57B) (see above)
│   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   ├── open_intelligence_dialog [UI] (535B)
│   │   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   │   │   ├── create_text_button [UI] (133B) (see above)
│   │   │   │   │   ├── set_button_owner [UI] (45B) (see above)
│   │   │   │   │   ├── set_button_handler [UI] (45B) (see above)
│   │   │   │   │   ├── set_button_click_callback [UI] (33B) (see above)
│   │   │   │   │   ├── set_active_surface [UI] (74B) (see above)
│   │   │   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION ***
│   │   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── ai_choose_government [AI] (558B)  *** STATE MUTATION ***
│   │   │   │   │   │     (338 more reachable)
│   │   │   │   │   ├── spaceship_ai_should_start [AI] (583B) (see above)
│   │   │   │   │   ├── find_nearest_unit [GL] (233B)  *** STATE MUTATION ***
│   │   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── text_newline [UI] (29B) (see above)
│   │   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   │   │   └── calc_attitude [GL] (178B) (see above)
│   │   │   │   ├── diplo_show_greeting [MIXED] (804B)  *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── open_list_dialog [UI] (47B)
│   │   │   │   │   │     (86 more reachable)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   │   ├── intel_open_advisor [UI] (546B)
│   │   │   │   │   │     (120 more reachable)
│   │   │   │   │   ├── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── unknown (set popup position) [UI] (32B)
│   │   │   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │   │   ├── popup_set_position_fields [UI] (42B)
│   │   │   │   │   └── get_screen_rect [UI] (48B)
│   │   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── intel_play_animation [UI] (181B)
│   │   │   │   │   └── intel_play_video_frame [UI] (248B)
│   │   │   │   │         (64 more reachable)
│   │   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │   └── popup_add_radio_option [UI] (566B) (see above)
│   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION ***
│   │   │   │   └── intel_close_advisor [UI] (166B)
│   │   │   │       ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   │   │       ├── wait_for_animation [UI] (109B) (see above)
│   │   │   │       ├── resume_music [UI] (85B) (see above)
│   │   │   │       ├── intel_teardown_display [UI] (158B)
│   │   │   │       │     (22 more reachable)
│   │   │   │       └── intel_delete_object [UI] (57B)
│   │   │   │             (41 more reachable)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── upgrade_units_for_tech [GL] (970B)  *** STATE MUTATION *** (see above)
│   │   │   ├── handle_tech_government_effects [GL] (973B)  *** STATE MUTATION *** (see above)
│   │   │   ├── we_love_the_king_day [GL] (379B) (see above)
│   │   │   ├── format_enabled_item [UI] (138B)
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   └── popup_add_edit_field [UI] (412B)
│   │   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   ├── unknown (show tech help) [UI] (43B) (see above)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   ├── pedia_select_entry [UI] (342B)
│   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   │   │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   │   │   ├── pedia_open_category [UI] (200B) (see above)
│   │   │   │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   │   │   ├── pedia_draw_tech_detail [UI] (5911B)
│   │   │   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   │   ├── text_begin_bold [UI] (29B) (see above)
│   │   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── unknown (get panel icon width) [UI] (37B) (see above)
│   │   │   │   │   ├── unknown (get panel icon height) [UI] (37B) (see above)
│   │   │   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   │   │   ├── pedia_show_description [UI] (593B) (see above)
│   │   │   │   │   ├── pedia_add_hyperlink [UI] (1361B) (see above)
│   │   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   │   ├── init_editor_scrollbar [UI] (34B) (see above)
│   │   │   │   │   ├── widget_get_height [UI] (34B) (see above)
│   │   │   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B) (see above)
│   │   │   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   │   │   ├── port_set_clip_rect [UI] (55B) (see above)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   │   ├── draw_status_panel_header [UI] (1182B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   ├── unknown (string pool set) [UI] (33B)
│   │   │   │   │   └── advance_year_display [UI] (479B)
│   │   │   │   │         (5 more reachable)
│   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   └── draw_text_with_shadow [UI] (205B) (see above)
│   │   │   │   ├── scale_sprite [UI] (35B) (see above)
│   │   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   │   ├── prepare_surface [UI] (24B) (see above)
│   │   │   │   ├── draw_hline [UI] (69B) (see above)
│   │   │   │   ├── tile_bitmap [UI] (391B) (see above)
│   │   │   │   ├── set_text_draw_target [UI] (24B) (see above)
│   │   │   │   ├── set_text_draw_source [UI] (24B) (see above)
│   │   │   │   ├── set_text_style [UI] (68B) (see above)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B) (see above)
│   │   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   ├── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   ├── popup_dialog_close [UI] (47B) (see above)
│   │   │   ├── popup_add_edit_field [UI] (412B)
│   │   │   ├── popup_set_scaled_width [UI] (99B)
│   │   │   ├── popup_add_button [UI] (360B) (see above)
│   │   │   └── bit_index_to_byte_mask [GL] (45B) (see above)
│   │   ├── unknown (choose research wrapper) [GL] (40B)  *** STATE MUTATION ***
│   │   │     → Wrapper that calls choose_research_tech(param_1, 0) — the "choose next research" entry point.
│   │   │   └── choose_research_tech [MIXED] (2078B)  *** STATE MUTATION ***
│   │   │       ├── text_begin [UI] (29B) (see above)
│   │   │       ├── text_newline [UI] (29B) (see above)
│   │   │       ├── display_improvement [UI] (33B) (see above)
│   │   │       ├── text_add_number [UI] (33B) (see above)
│   │   │       ├── show_message [UI] (46B) (see above)
│   │   │       ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │       ├── dialog_set_icon [UI] (40B)
│   │   │       ├── dialog_set_title [UI] (41B) (see above)
│   │   │       ├── init_game_display [UI] (51B)
│   │   │       │   ├── flush_display [UI] (21B) (see above)
│   │   │       │   └── init_palette_system [UI] (21B) (see above)
│   │   │       ├── civ_has_tech [GL] (181B) (see above)
│   │   │       ├── ai_pick_research_goal [AI] (417B)
│   │   │       │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │       │   │     (2 more reachable)
│   │   │       │   └── can_research_tech [GL] (156B)
│   │   │       ├── show_research_goal_dialog [UI] (3119B)
│   │   │       │   ├── text_begin [UI] (29B) (see above)
│   │   │       │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │       │   ├── select_list_item [UI] (38B) (see above)
│   │   │       │   ├── text_newline [UI] (29B) (see above)
│   │   │       │   ├── display_improvement [UI] (33B) (see above)
│   │   │       │   ├── text_add_number [UI] (33B) (see above)
│   │   │       │   ├── open_list_dialog [UI] (47B) (see above)
│   │   │       │   ├── unknown (string pool append separator) [UI] (29B) (see above)
│   │   │       │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │       │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │       │   ├── dialog_set_icon [UI] (40B) (see above)
│   │   │       │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │       │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │       │   ├── tech_is_descendant_of [GL] (135B)
│   │   │       │   ├── pedia_select_entry [UI] (342B) (see above)
│   │   │       │   ├── pedia_navigate_to_item [UI] (369B) (see above)
│   │   │       │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │       │   ├── popup_add_edit_field [UI] (412B) (see above)
│   │   │       │   ├── popup_set_field_38 [UI] (33B)
│   │   │       │   ├── popup_add_radio_option [UI] (566B) (see above)
│   │   │       │   ├── popup_add_action_button_label [UI] (119B)
│   │   │       │   │     (11 more reachable)
│   │   │       │   └── pedia_select_unit_type [UI] (342B)
│   │   │       │         (72 more reachable)
│   │   │       ├── pedia_select_entry [UI] (342B) (see above)
│   │   │       ├── popup_dialog_create [UI] (93B) (see above)
│   │   │       ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   │   │       ├── popup_add_edit_field [UI] (412B) (see above)
│   │   │       ├── popup_set_position_fields [UI] (42B) (see above)
│   │   │       ├── popup_add_button [UI] (360B) (see above)
│   │   │       ├── popup_add_radio_option [UI] (566B) (see above)
│   │   │       └── popup_show_modal [UI] (999B) (see above)
│   │   ├── set_paradrop_range [GL] (31B)  *** STATE MUTATION *** (see above)
│   │   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │   ├── pedia_select_entry [UI] (342B)
│   │   │     → Selects and displays a Civilopedia entry.
│   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   │   ├── pedia_open_category [UI] (200B) (see above)
│   │   │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   │   ├── pedia_draw_tech_detail [UI] (5911B) (see above)
│   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   └── popup_add_button [UI] (360B) (see above)
│   ├── acquire_wonder [GL] (488B)  *** STATE MUTATION ***
│   │     → Acquires (completes) a wonder for a city.
│   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   └── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   ├── show_city_event_dialog_v2 [UI] (915B)  *** STATE MUTATION ***
│   │     → Enhanced version of city event dialog with a production item image.
│   │   ├── select_list_item [UI] (38B) (see above)
│   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── pedia_window_ctor [UI] (115B)
│   │   │     → Constructor for the Civilopedia window object.
│   │   │   └── popup_dialog_create [UI] (93B) (see above)
│   │   ├── popup_set_default_selection [UI] (116B) (see above)
│   │   ├── popup_add_button [UI] (360B) (see above)
│   │   ├── popup_add_radio_option [UI] (566B) (see above)
│   │   ├── load_gif_resource [UI] (847B) (see above)
│   │   ├── palette_init [UI] (145B) (see above)
│   │   └── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
│   ├── assign_caravan_commodity [GL] (327B)  *** STATE MUTATION ***
│   │     → Assigns a trade commodity to a newly built caravan/freight unit.
│   ├── handle_espionage_discovery [GL] (236B)  *** STATE MUTATION ***
│   │     → Handles discovery of espionage (spy embassy established).
│   │   └── adjust_attitude [GL] (107B)  *** STATE MUTATION ***
│   │         → Adjusts the attitude value between two civs by a delta.
│   │       ├── get_attitude_raw [GL] (47B)
│   │       └── set_attitude_value [GL] (120B)  *** STATE MUTATION ***
│   ├── handle_space_race_victory [GL] (641B)  *** STATE MUTATION ***
│   │     → Handles space race victory condition.
│   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── redraw_map_all_players [UI] (124B)
│   │   │     → Redraws entire map for all active players.
│   │   │   └── redraw_entire_map [UI] (205B)  *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION ***
│   │   │     → Sets or clears visibility bits (byte 4) on a tile.
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION ***
│   │   │     → Sets a civ's tile visibility byte.
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION ***
│   │   │     → Begins a batched map update session for multiplayer.
│   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION ***
│   │         → Ends a batched map update.
│   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │       └── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   ├── city_message_wrapper [UI] (38B) (see above)
│   ├── draw_production_box [UI] (1434B)
│   │     → Draws the production box in the city window.
│   │   ├── rect_get_width [UI] (27B) (see above)
│   │   ├── rect_get_height [UI] (28B) (see above)
│   │   ├── invalidate_region [UI] (180B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   ├── close_dialog [UI] (94B) (see above)
│   │   ├── init_unit_move_data [GL] (253B)  *** STATE MUTATION ***
│   │   │     → Initializes the unit movement animation data structure at 0x006660xx.
│   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   ├── widget_inflate_rect [UI] (34B) (see above)
│   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   ├── draw_3d_frame [UI] (42B) (see above)
│   │   ├── invalidate_rect_region [UI] (78B) (see above)
│   │   ├── blit_sprite_8param [UI] (62B) (see above)
│   │   ├── scale_universal [UI] (67B) (see above)
│   │   ├── calc_icon_spacing [UI] (264B) (see above)
│   │   ├── draw_unit [UI] (2803B)
│   │   │     → Draws a complete unit sprite at the given coordinates.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │   │   ├── get_civ_background_color [UI] (92B)
│   │   │   ├── scale_sprite [UI] (35B) (see above)
│   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── set_unit_font_for_zoom [UI] (99B)  *** STATE MUTATION ***
│   │   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   │   ├── FUN_00008200 [??]
│   │   │   │   │   ├── FUN_0000847F [??] (see above)
│   │   │   │   │   └── delete_font [UI] (98B)
│   │   │   │   │         (3 more reachable)
│   │   │   │   └── scale_sprite [UI] (35B) (see above)
│   │   │   ├── select_display_unit [UI] (396B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   └── get_fortress_owner_at [GL] (77B)
│   │   │   │       ├── get_tile_owner [GL] (100B) (see above)
│   │   │   │       └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── get_civ_dark_color [UI] (92B)
│   │   │   ├── get_unit_max_hp [GL] (45B) (see above)
│   │   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── port_copy_rect [UI] (282B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── port_lock [UI] (287B) (see above)
│   │   │   │   ├── port_unlock [UI] (83B) (see above)
│   │   │   │   ├── port_get_pixel_ptr [UI] (45B) (see above)
│   │   │   │   ├── surface_is_locked [UI] (44B) (see above)
│   │   │   │   └── pixel_ptr_next_row [UI] (33B) (see above)
│   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B) (see above)
│   │   ├── set_text_style [UI] (68B) (see above)
│   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── draw_improvements_list [UI] (1102B)
│   │     → Draws the city improvements list with building names and wonders.
│   │   ├── rect_get_width [UI] (27B) (see above)
│   │   ├── rect_get_height [UI] (28B) (see above)
│   │   ├── invalidate_region [UI] (180B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── text_begin [UI] (29B) (see above)
│   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   ├── scrollbar_set_position [UI] (52B) (see above)
│   │   ├── scrollbar_set_range [UI] (47B) (see above)
│   │   ├── display_improvement [UI] (33B) (see above)
│   │   ├── draw_text_at [UI] (42B) (see above)
│   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── close_dialog [UI] (94B) (see above)
│   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   ├── invalidate_rect_region [UI] (78B) (see above)
│   │   ├── scale_universal [UI] (67B) (see above)
│   │   ├── set_text_style [UI] (68B) (see above)
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   └── set_scrollbar [UI] (64B) (see above)
│   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   ├── spaceship_ai_evaluate [AI] (1064B) (see above)
│   ├── spaceship_human_build [GL] (2111B)  *** STATE MUTATION ***
│   │     → Handles building a spaceship component for a human or AI player.
│   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION ***
│   │   │     → Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   ├── has_spaceship_built [GL] (47B) (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION *** (see above)
│   │   └── spaceship_launch (internal — called after all checks pass) [GL] (815B)  *** STATE MUTATION ***
│   │         → Launches a civ's spaceship.
│   │       ├── show_message [UI] (46B) (see above)
│   │       ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │       ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │       ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   │       ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION ***
│   │       │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │       │   └── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │       ├── get_civ_people_name [GL] (145B) (see above)
│   │       ├── has_spaceship_launched [GL] (47B) (see above)
│   │       ├── show_wonder_or_advance [UI] (268B)
│   │       │   ├── wonder_win_init [UI] (677B)  *** STATE MUTATION ***
│   │       │   │   ├── init_sprite_surface_mgr [UI] (133B) (see above)
│   │       │   │   ├── init_render_surface [UI] (274B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown (pedia object initializer) [UI] (34B)
│   │       │   │   ├── port_alloc_rect [UI] (58B) (see above)
│   │       │   │   ├── port_set_color [UI] (43B) (see above)
│   │       │   │   └── palette_init [UI] (145B) (see above)
│   │       │   ├── wonder_win_create [UI] (524B)
│   │       │   │   ├── set_window_style_flags [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── pedia_set_resource [UI] (67B)
│   │       │   │   │     (3 more reachable)
│   │       │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │       │   │   ├── wonder_win_create_dialog [UI] (322B)
│   │       │   │   │     (88 more reachable)
│   │       │   │   ├── build_wonder_info_text [UI] (1366B)
│   │       │   │   │     (53 more reachable)
│   │       │   │   ├── wonder_win_draw_buttons [UI] (826B)
│   │       │   │   │     (80 more reachable)
│   │       │   │   ├── wonder_win_setup_hotspots [UI] (184B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   └── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION *** (see above)
│   │       │   ├── show_advance_animation [UI] (1232B)  *** STATE MUTATION ***
│   │       │   │   ├── manage_window_show [UI] (37B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── start_cursor_blink [UI] (39B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── stop_cursor_blink [UI] (39B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── init_palette_system [UI] (21B) (see above)
│   │       │   │   ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│   │       │   │   ├── unknown (manage pedia window) [UI] (37B) (see above)
│   │       │   │   ├── load_civ_power_values [GL] (90B)  *** STATE MUTATION ***
│   │       │   │   ├── wonder_win_draw_title [UI] (216B)
│   │       │   │   │     (45 more reachable)
│   │       │   │   ├── build_advance_scene [UI] (12822B)
│   │       │   │   │     (84 more reachable)
│   │       │   │   ├── wonder_win_show_starfield [UI] (1046B)
│   │       │   │   │     (79 more reachable)
│   │       │   │   ├── play_wonder_video [UI] (769B)
│   │       │   │   │     (130 more reachable)
│   │       │   │   ├── wonder_win_setup_hotspots [UI] (184B) (see above)
│   │       │   │   ├── wonder_win_draw_initial_buttons [UI] (128B)
│   │       │   │   │     (13 more reachable)
│   │       │   │   ├── wonder_win_draw_button_left [UI] (300B)
│   │       │   │   │     (11 more reachable)
│   │       │   │   ├── wonder_win_draw_button_right [UI] (286B)
│   │       │   │   │     (11 more reachable)
│   │       │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] (815B)  *** STATE MUTATION *** (see above)
│   │       │   │   ├── load_gif_resource [UI] (847B) (see above)
│   │       │   │   ├── modal_dialog_run [UI] (283B) (see above)
│   │       │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
│   │       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       │   └── show_wonder_movie [UI] (154B)
│   │       │       ├── manage_window_show [UI] (37B) (see above)
│   │       │       ├── init_palette_system [UI] (21B) (see above)
│   │       │       ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│   │       │       ├── unknown (manage pedia window) [UI] (37B) (see above)
│   │       │       ├── show_advance_animation [UI] (1232B)  *** STATE MUTATION *** (see above)
│   │       │       └── play_wonder_video [UI] (769B) (see above)
│   │       └── enqueue_mp_event [MIXED] (398B) (see above)
│   ├── spaceship_check_complete_section [GL] (324B)
│   │     → Checks if a spaceship section is complete.
│   ├── spaceship_ai_should_start [AI] (583B) (see above)
│   ├── clamp [FW] (57B)
│   │     → Clamps a value to [min, max] range.
│   ├── create_unit [GL] (1675B)  *** STATE MUTATION ***
│   │     → Creates a new unit of the specified type for a given civilization at a map position.
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── process_unit_move_visibility [GL] (4250B)  *** STATE MUTATION ***
│   │   │     → Major game logic function that processes visibility updates after a unit moves.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── cancel_goto_if_blocked [GL] (90B)  *** STATE MUTATION ***
│   │   │   ├── cancel_goto_for_stack [GL] (192B)  *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   └── is_tile_ocean [GL] (57B) (see above)
│   │   │   ├── city_set_specialist_slot [GL] (126B)  *** STATE MUTATION ***
│   │   │   ├── find_city_at [GL] (245B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── update_map_area_all_players [UI] (136B) (see above)
│   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │   └── update_map_radius1 [UI] (50B)
│   │   │   │       └── update_map_area [UI] (313B)  *** STATE MUTATION *** (see above)
│   │   │   ├── ai_add_goal_a [AI] (958B)  *** STATE MUTATION ***
│   │   │   │   ├── ai_shift_goals_down_a [AI] (184B)  *** STATE MUTATION ***
│   │   │   │   │   └── ai_shift_goals_down_a [AI] (184B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B) (see above)
│   │   │   │   ├── is_unit_active [GL] (176B) (see above)
│   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   ├── process_diplomatic_contact [GL] (7326B)  *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   │   └── FUN_0051D564 [??] (178B) (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── diplo_demand_ally_help [MIXED] (919B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B)  *** STATE MUTATION ***
│   │   │   │   │   │     (140 more reachable)
│   │   │   │   │   ├── break_alliance [MIXED] (632B)  *** STATE MUTATION ***
│   │   │   │   │   │     (138 more reachable)
│   │   │   │   │   └── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── ai_diplomacy_negotiate [GL] (16263B)  *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── show_help_topic [UI] (34B) (see above)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   │   ├── open_intelligence_dialog [UI] (535B) (see above)
│   │   │   │   │   ├── show_game_popup_3arg [UI] (43B) (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_patience_threshold [GL] (211B)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_form_alliance [GL] (374B)  *** STATE MUTATION ***
│   │   │   │   │   │     (318 more reachable)
│   │   │   │   │   ├── diplo_sign_ceasefire [GL] (315B)  *** STATE MUTATION ***
│   │   │   │   │   │     (318 more reachable)
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_gold_to_attitude [GL] (104B)
│   │   │   │   │   ├── diplo_ai_negotiate [MIXED] (10271B)  *** STATE MUTATION ***
│   │   │   │   │   │     (392 more reachable)
│   │   │   │   │   ├── diplo_favor_menu [MIXED] (4878B)  *** STATE MUTATION ***
│   │   │   │   │   │     (240 more reachable)
│   │   │   │   │   ├── diplo_check_war_weariness [UI] (178B)
│   │   │   │   │   │     (3 more reachable)
│   │   │   │   │   ├── diplo_show_main_menu [UI] (747B)
│   │   │   │   │   │     (176 more reachable)
│   │   │   │   │   ├── unknown (set trade route value) [GL] (29B)  *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── get_attitude_raw [GL] (47B) (see above)
│   │   │   │   │   ├── set_attitude_value [GL] (120B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_attitude [GL] (178B) (see above)
│   │   │   │   │   ├── should_declare_war [GL] (191B) (see above)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   │   ├── intel_play_animation [UI] (181B) (see above)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B) (see above)
│   │   │   │   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── event_check_negotiation [GL] (900B)  *** STATE MUTATION ***
│   │   │   │   │   │     (500 more reachable)
│   │   │   │   │   ├── calc_war_readiness [GL] (820B)  *** STATE MUTATION ***
│   │   │   │   │   │     (57 more reachable)
│   │   │   │   │   ├── check_can_declare_war [GL] (365B)
│   │   │   │   │   ├── refresh_status_panel [UI] (297B)
│   │   │   │   │   │     (117 more reachable)
│   │   │   │   │   └── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── should_declare_war [GL] (191B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_civ_noun_name [GL] (145B) (see above)
│   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── parleywin_start_session [MIXED] (807B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── chatwin_get_text_length [UI] (37B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── parleywin_build_title [UI] (324B)
│   │   │   │   │   │     (6 more reachable)
│   │   │   │   │   ├── parley_set_negotiation_state [UI] (536B)  *** STATE MUTATION ***
│   │   │   │   │   │     (170 more reachable)
│   │   │   │   │   ├── widget_set_cursor_pos [UI] (43B)
│   │   │   │   │   │     (1 more reachable)
│   │   │   │   │   ├── widget_get_text_length [UI] (37B)
│   │   │   │   │   │     (4 more reachable)
│   │   │   │   │   ├── set_active_surface [UI] (74B) (see above)
│   │   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   │   └── set_active_control [UI] (38B)
│   │   │   │   ├── event_check_negotiation [GL] (900B)  *** STATE MUTATION ***
│   │   │   │   │   └── event_dispatch_actions [GL] (360B)  *** STATE MUTATION ***
│   │   │   │   │         (488 more reachable)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   └── should_declare_war [GL] (191B) (see above)
│   │   │   │   ├── ai_tech_exchange [GL] (1182B)  *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B) (see above)
│   │   │   │   │   └── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── check_join_war [GL] (595B)  *** STATE MUTATION ***
│   │   │   │       ├── show_message [UI] (46B) (see above)
│   │   │   │       ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │       ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │       └── get_civ_people_name [GL] (145B) (see above)
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   ├── set_stack_seen_by [GL] (92B)  *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   │   └── set_unit_seen_by [GL] (96B)  *** STATE MUTATION ***
│   │   │   ├── sum_stack_property [GL] (724B) (see above)
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── get_civ_vis_ptr [GL] (48B) (see above)
│   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   ├── get_tile_explored [GL] (71B) (see above)
│   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   ├── get_tile_controller [GL] (72B) (see above)
│   │   │   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   │   │   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION *** (see above)
│   │   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION *** (see above)
│   │   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION *** (see above)
│   │   ├── find_nearest_city [GL] (400B)
│   │   │     → Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   │   └── get_tile_continent_if_land [GL] (72B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   ├── unknown (tutorial_show_advice) [UI] (38B)
│   │   │     → Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│   │   │   └── show_unit_type_picker [UI] (260B)
│   │   │       ├── select_list_item [UI] (38B) (see above)
│   │   │       ├── popup_dialog_create [UI] (93B) (see above)
│   │   │       ├── popup_add_button [UI] (360B) (see above)
│   │   │       └── sprite_init_empty [UI] (140B)
│   │   │           ├── port_alloc_rect [UI] (58B) (see above)
│   │   │           ├── port_set_color [UI] (43B) (see above)
│   │   │           └── unknown (sprite extract with rect params) [UI] (88B)
│   │   │                 (19 more reachable)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── calc_unit_movement_points [GL] (516B) (see above)
│   │   └── put_down_unit [GL] (640B)  *** STATE MUTATION *** (see above)
│   ├── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   ├── find_nearest_unit [GL] (233B)  *** STATE MUTATION ***
│   │     → Finds the nearest unit to a position, optionally filtered by owner civ.
│   │   └── calc_movement_cost [GL] (94B) (see above)
│   ├── get_tile_continent [GL] (39B) (see above)
│   └── get_unit_owner_at [GL] (66B) (see above)
├── process_unit_support_deficit [GL] (1621B)  *** STATE MUTATION ***
│     → Handles unit support deficit — when a city can't support all its units, disbands the furthest ones.
│   ├── FUN_00008ADC [??]
│   ├── set_improvement_name_string [UI] (41B) (see above)
│   ├── find_city_at [GL] (245B) (see above)
│   ├── check_unit_support [GL] (281B)  *** STATE MUTATION *** (see above)
│   ├── city_message_wrapper [UI] (38B) (see above)
│   ├── draw_units_supported [UI] (1751B)
│   │     → Draws the supported units panel in the city window.
│   │   ├── rect_get_width [UI] (27B) (see above)
│   │   ├── invalidate_region [UI] (180B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── text_begin [UI] (29B) (see above)
│   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   ├── draw_text_centered [UI] (46B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   ├── close_dialog [UI] (94B) (see above)
│   │   ├── scale_sprite [UI] (35B) (see above)
│   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   ├── citywin_prepare_panel [UI] (77B) (see above)
│   │   ├── invalidate_rect_region [UI] (78B) (see above)
│   │   ├── scale_universal [UI] (67B) (see above)
│   │   ├── calc_icon_spacing [UI] (264B) (see above)
│   │   ├── draw_unit [UI] (2803B) (see above)
│   │   ├── set_text_style [UI] (68B) (see above)
│   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── tile_distance_xy [GL] (157B) (see above)
│   ├── calc_movement_cost [GL] (94B) (see above)
│   ├── delete_unit [GL] (1129B)  *** STATE MUTATION *** (see above)
│   ├── delete_unit_visible [GL] (456B)  *** STATE MUTATION ***
│   │     → Deletes a unit and refreshes the map display at its former position.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   └── delete_unit_safely [GL] (677B)  *** STATE MUTATION *** (see above)
│   ├── get_city_owner_at [GL] (111B) (see above)
│   └── get_tile_improvements [GL] (39B) (see above)
├── handle_city_disorder_004ef578 [GL] (1614B)  *** STATE MUTATION ***
│     → Handles civil disorder and "we love the king" celebrations.
│   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   ├── check_auto_improvement [GL] (152B) (see above)
│   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   ├── play_music_track [UI] (312B)
│   │     → Plays a specific music track (param_1) with optional restart (param_2).
│   │   └── unknown (stop music) [UI] (31B) (see above)
│   ├── update_map_area_all_players [UI] (136B) (see above)
│   ├── get_civ_leader_title [GL] (210B) (see above)
│   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   ├── show_city_event_dialog_v2 [UI] (915B)  *** STATE MUTATION *** (see above)
│   ├── city_message_wrapper [UI] (38B) (see above)
│   └── ai_revolution_notification [GL] (1336B)  *** STATE MUTATION ***
│         → Handles AI revolution/government change notifications.
│       ├── show_message [UI] (46B) (see above)
│       ├── show_dialog_message [UI] (43B) (see above)
│       ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│       ├── set_improvement_name_string [UI] (41B) (see above)
│       ├── civ_has_active_wonder [GL] (142B) (see above)
│       ├── get_civ_noun_name [GL] (145B) (see above)
│       ├── get_civ_leader_title [GL] (210B) (see above)
│       ├── get_civ_adjective_name [GL] (145B) (see above)
│       ├── enqueue_mp_event [MIXED] (398B) (see above)
│       ├── set_government_type [GL] (529B)  *** STATE MUTATION *** (see above)
│       └── revolution_dialog [MIXED] (678B)  *** STATE MUTATION ***
│             → Revolution/government change dialog.
│           ├── text_begin [UI] (29B) (see above)
│           ├── select_list_item [UI] (38B) (see above)
│           ├── display_improvement [UI] (33B) (see above)
│           ├── show_dialog_message [UI] (43B) (see above)
│           ├── get_civ_name [UI] (28B) (see above)
│           ├── set_improvement_name_string [UI] (41B) (see above)
│           ├── dialog_set_title [UI] (41B) (see above)
│           ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│           ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│           ├── unknown (tutorial_show_city_screen) [UI] (42B) (see above)
│           ├── get_civ_noun_name [GL] (145B) (see above)
│           ├── get_civ_leader_title [GL] (210B) (see above)
│           ├── set_government_type [GL] (529B)  *** STATE MUTATION *** (see above)
│           ├── check_govt_available [GL] (323B)
│           │   ├── civ_has_active_wonder [GL] (142B) (see above)
│           │   └── civ_has_tech [GL] (181B) (see above)
│           ├── popup_dialog_create [UI] (93B) (see above)
│           └── popup_add_radio_option [UI] (566B) (see above)
├── process_city_science [GL] (382B)  *** STATE MUTATION ***
│     → Processes a city's science contribution.
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── add_research_beakers [GL] (458B)  *** STATE MUTATION ***
│   │     → Adds research beakers to a civ's current research.
│   │   ├── unknown (tutorial_show_city_screen) [UI] (42B) (see above)
│   │   ├── unknown (choose research wrapper) [GL] (40B)  *** STATE MUTATION *** (see above)
│   │   ├── complete_research [MIXED] (1422B)  *** STATE MUTATION *** (see above)
│   │   └── calc_tech_cost [GL] (1003B)
│   │         → Calculates the research cost (in beakers) for a civ to discover the next technology.
│   ├── calc_food_box_size [GL] (512B)  *** STATE MUTATION *** (see above)
│   └── spaceship_ai_should_start [AI] (583B) (see above)
├── process_city_pollution_and_meltdown [GL] (940B)  *** STATE MUTATION ***
│     → Handles city pollution generation and nuclear meltdown checks.
│   ├── is_tile_valid [GL] (80B) (see above)
│   ├── set_map_scroll_position [UI] (98B) (see above)
│   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION *** (see above)
│   ├── has_building [GL] (122B) (see above)
│   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
│   ├── city_message_wrapper [UI] (38B) (see above)
│   ├── animate_nuke_explosion [UI] (885B)  *** STATE MUTATION ***
│   │     → Plays the nuclear explosion animation at a given map tile.
│   │   ├── rect_get_width [UI] (27B) (see above)
│   │   ├── rect_get_height [UI] (28B) (see above)
│   │   ├── flush_display [UI] (21B) (see above)
│   │   ├── invalidate_region [UI] (180B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION *** (see above)
│   │   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   ├── tile_to_screen [UI] (151B) (see above)
│   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   ├── scale_at_current_zoom [UI] (47B) (see above)
│   │   ├── set_current_zoom_scale [UI] (41B) (see above)
│   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   ├── init_game_display [UI] (51B) (see above)
│   │   ├── blit_with_clip [UI] (265B)
│   │   │     → Blits a source rect to dest rect with manual clipping.
│   │   │   └── blit_rect_to_rect [UI] (95B) (see above)
│   │   ├── get_tile_explored [GL] (71B) (see above)
│   │   ├── port_alloc_rect [UI] (58B) (see above)
│   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── wrap_x [GL] (94B) (see above)
│   ├── is_tile_ocean [GL] (57B) (see above)
│   ├── get_tile_explored [GL] (71B) (see above)
│   ├── reveal_tile [GL] (154B)  *** STATE MUTATION ***
│   │     → Reveals pollution on a tile by setting the pollution bit (0x80) in tile improvements.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── update_civ_visibility [GL] (75B)  *** STATE MUTATION ***
│   │   │     → Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility map.
│   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── set_civ_tile_data [GL] (325B)  *** STATE MUTATION *** (see above)
│   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   └── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   ├── generate_terrain_around [GL] (696B)  *** STATE MUTATION ***
│   │     → Generates/randomizes terrain around a nuclear detonation site.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── find_city_at [GL] (245B) (see above)
│   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   ├── wrap_x [GL] (94B) (see above)
│   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   ├── update_civ_visibility [GL] (75B)  *** STATE MUTATION *** (see above)
│   │   ├── reveal_tile [GL] (154B)  *** STATE MUTATION *** (see above)
│   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   ├── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION *** (see above)
│   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION *** (see above)
│   └── get_tile_improvements [GL] (39B) (see above)
├── pay_building_upkeep [GL] (406B)  *** STATE MUTATION ***
│     → Processes building upkeep for a city.
│   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   ├── set_improvement_name_string [UI] (41B) (see above)
│   ├── has_building [GL] (122B) (see above)
│   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   ├── calc_building_upkeep_cost [GL] (305B)
│   │     → Calculates the upkeep cost for a specific building type for a given civ.
│   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   └── civ_has_tech [GL] (181B) (see above)
│   └── city_message_wrapper [UI] (38B) (see above)
├── handle_city_expansion [GL] (650B)  *** STATE MUTATION ***
│     → Handles city expansion by checking adjacent tiles for buildable land and dispatching settler/engineer creation.
│   ├── is_tile_valid [GL] (80B) (see above)
│   ├── has_building [GL] (122B) (see above)
│   ├── ai_add_goal_a [AI] (958B)  *** STATE MUTATION *** (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── find_city_expansion_site [GL] (1095B)  *** STATE MUTATION ***
│   │     → Searches for a nearby expansion site for a city's settler/engineer.
│   │   ├── find_path [GL] (4118B)  *** STATE MUTATION *** (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── wrap_x [GL] (94B) (see above)
│   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   ├── get_tile_continent_if_land [GL] (72B) (see above)
│   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   ├── get_tile_controller [GL] (72B) (see above)
│   │   ├── check_tile_trespass [GL] (245B) (see above)
│   │   └── get_tile_improvements [GL] (39B) (see above)
│   └── get_tile_improvements [GL] (39B) (see above)
├── handle_city_disorder_00509590 [MIXED] (933B)  *** STATE MUTATION ***
│     → Opens the city window for a specific city, handling disorder state.
│   ├── FUN_0000CA8D [??]
│   ├── FUN_0000CCB3 [??]
│   ├── show_window_wrapper [UI] (33B) (see above)
│   ├── process_messages [UI] (21B) (see above)
│   ├── show_help_topic [UI] (34B) (see above)
│   ├── unknown — manage window [UI] (37B) (see above)
│   ├── init_city_production_globals [GL] (77B)  *** STATE MUTATION *** (see above)
│   └── set_active_surface [UI] (74B) (see above)
└── clamp [FW] (57B)
      → Clamps a value to [min, max] range.
```

---

## process_city_production (`004EC3FE`, 10931B)

Reachable: 1179 functions (177 state-mutating)

```
process_city_production [GL] (10931B)  *** STATE MUTATION ***
  → Massive end-of-turn city production processing function.
├── show_message [UI] (46B)
│     → Stores a message string in the message buffer at the specified slot index.
│   └── _strcpy_thunk [FW] (7B)
│         → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── get_civ_name [UI] (28B)
│     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   └── get_civ_adjective_name [GL] (145B)
│         → Returns the adjective form of a civilization name.
├── unknown (dialog show single param) [UI] (33B)
│     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   └── show_help_topic [UI] (34B)
│         → Opens a help topic with default parameters.
│       └── show_help_topic_ext [UI] (38B)
│             → Extended help topic opener with additional parameter.
│           └── show_help_dialog [UI] (46B)
│               └── FUN_0051D3E0 [??] (351B)
├── set_improvement_name_string [UI] (41B)
│     → Sets a dialog string control to an improvement/building name.
│   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION ***
│   │     → Sets a string control value in the multiplayer dialog string table.
│   └── get_improvement_name [FW] (92B)
│         → Returns a pointer to the Nth string in the string pool.
├── trade_supply_demand_show [UI] (1022B)
│     → Shows the supply/demand details for a specific trade commodity in a specific city.
├── has_building [GL] (122B)
│     → Checks if a city has a specific building.
│   └── bit_index_to_byte_mask [GL] (45B)
│         → Converts a bit index to byte offset and bit mask.
├── set_building [GL] (186B)  *** STATE MUTATION ***
│     → Sets or clears a building bit in a city's building bitfield.
│   └── bit_index_to_byte_mask [GL] (45B) (see above)
├── check_auto_improvement [GL] (152B)
│     → Checks if a city should auto-build a Granary (9) or Aqueduct (23/0x17) based on city size thresholds.
│   └── has_building [GL] (122B) (see above)
├── change_city_production [MIXED] (2572B)  *** STATE MUTATION ***
│     → Changes a city's production item.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   └── popup_show_modal [UI] (999B)
│   │         → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│   │       ├── flush_display [UI] (21B)
│   │       ├── process_messages [UI] (21B)
│   │       │   └── FUN_0000BA4F [??]
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_edit_text [UI] (43B)
│   │       │   └── FUN_00002D4D [??]
│   │       ├── init_palette_system [UI] (21B)
│   │       ├── unknown — manage window [UI] (37B)
│   │       │   └── FUN_0000C692 [??]
│   │       ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION ***
│   │       │   ├── unknown (get drawing context) [UI] (37B)
│   │       │   │   └── focus_and_raise_window [UI] (57B)
│   │       │   ├── widget_scrollbar_dtor [UI] (57B)
│   │       │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │       │   │         (7 more reachable)
│   │       │   └── widget_dropdown_dtor [UI] (57B)
│   │       ├── popup_paint [UI] (1964B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   │   └── invalidate_region [UI] (180B)
│   │       │   │         (16 more reachable)
│   │       │   ├── show_window_wrapper [UI] (33B)
│   │       │   │   └── show_window_inner [UI] (38B)
│   │       │   │         (3 more reachable)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   ├── set_rect_wh [UI] (48B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │   └── FUN_0000858E [??]
│   │       │   ├── control_invalidate [UI] (65B)
│   │       │   │   ├── FUN_00008B00 [??]
│   │       │   │   └── FUN_00008B2D [??]
│   │       │   ├── draw_border_rect [UI] (61B)
│   │       │   │   └── draw_rect_outline [UI] (128B)
│   │       │   │         (13 more reachable)
│   │       │   ├── scale_sprite [UI] (35B)
│   │       │   ├── set_sprite_scale [UI] (33B)
│   │       │   │   └── scale_table_build_primary [UI] (657B)
│   │       │   │         (2 more reachable)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   │   └── rect_get_width [UI] (27B)
│   │       │   ├── widget_get_height [UI] (34B)
│   │       │   │   └── rect_get_height [UI] (28B)
│   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │       │   │   └── widget_inflate_rect [UI] (34B)
│   │       │   ├── popup_get_padded_height [UI] (42B)
│   │       │   ├── popup_render_label [UI] (226B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   └── port_fill_rect_pattern [UI] (201B)
│   │       │   │         (5 more reachable)
│   │       │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_render_text_at_offset [UI] (61B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   └── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │         (5 more reachable)
│   │       │   ├── popup_layout_dialog [UI] (4785B)
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── popup_calc_max_text_height [UI] (132B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── popup_get_line_height [UI] (78B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B) (see above)
│   │       │   │   ├── popup_calc_button_area_height [UI] (46B)
│   │       │   │   ├── popup_calc_text_width [UI] (51B)
│   │       │   │   ├── popup_set_text_style [UI] (189B) (see above)
│   │       │   │   ├── popup_render_label [UI] (226B) (see above)
│   │       │   │   ├── popup_has_negative_line_count [UI] (83B)
│   │       │   │   ├── popup_layout_text [UI] (1326B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_get_radio_page_number [UI] (56B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B) (see above)
│   │       │   │   ├── unknown (popup_draw_icon) [UI] (55B) (see above)
│   │       │   │   ├── blit_rect_to_rect [UI] (95B)
│   │       │   │   │     (10 more reachable)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │       │   │   └── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── popup_redraw_visible_items [UI] (660B)
│   │       │   │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   │   ├── invalidate_region [UI] (180B) (see above)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   ├── draw_border_rect [UI] (61B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B) (see above)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B) (see above)
│   │       │   │   ├── popup_draw_item [UI] (706B)
│   │       │   │   │     (27 more reachable)
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   └── port_set_rect [UI] (91B)
│   │       │   ├── popup_create_window [UI] (693B)
│   │       │   │   ├── set_callback_0x44 [UI] (45B)
│   │       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │       │   │   │     (5 more reachable)
│   │       │   │   ├── unknown (set_font_size) [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── create_offscreen_surface [UI] (115B)
│   │       │   │   │     (37 more reachable)
│   │       │   │   └── create_offscreen_surface_b [UI] (119B)
│   │       │   │         (37 more reachable)
│   │       │   ├── popup_init_controls [UI] (6616B)
│   │       │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │       │   │   ├── create_text_button [UI] (133B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── set_button_owner [UI] (45B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── set_button_handler [UI] (45B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── set_button_click_callback [UI] (33B)
│   │       │   │   ├── create_checkbox [UI] (167B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── set_checkbox_value [UI] (33B)
│   │       │   │   ├── create_scrollbar [UI] (124B)
│   │       │   │   │     (9 more reachable)
│   │       │   │   ├── scrollbar_set_position [UI] (52B)
│   │       │   │   │     (2 more reachable)
│   │       │   │   ├── scrollbar_set_range [UI] (47B)
│   │       │   │   │     (3 more reachable)
│   │       │   │   ├── scrollbar_set_callback [UI] (33B)
│   │       │   │   ├── set_edit_max_chars [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── create_listbox_control [UI] (121B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── add_listbox_item [UI] (49B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── disable_civ_slot [UI] (133B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown (set selected item) [UI] (33B)
│   │       │   │   ├── pedia_button_create [UI] (139B)
│   │       │   │   │     (6 more reachable)
│   │       │   │   ├── unknown (set button callback) [UI] (33B)
│   │       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │       │   │   ├── scale_sprite [UI] (35B) (see above)
│   │       │   │   ├── widget_get_height [UI] (34B) (see above)
│   │       │   │   ├── scrollbar_init [UI] (93B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── scrollbar_create_window [UI] (207B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── scrollbar_set_position [UI] (33B)
│   │       │   │   ├── scrollbar_set_range [UI] (33B)
│   │       │   │   ├── unknown [UI] (43B)
│   │       │   │   │     (1 more reachable)
│   │       │   │   ├── unknown [UI] (33B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B) (see above)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B) (see above)
│   │       │   │   ├── popup_count_items_in_pane [UI] (93B)
│   │       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│   │       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   └── set_scrollbar [UI] (64B)
│   │       │   │         (2 more reachable)
│   │       │   ├── popup_draw_background [UI] (309B)
│   │       │   │   ├── rect_get_width [UI] (27B) (see above)
│   │       │   │   ├── rect_get_height [UI] (28B) (see above)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │       │   │   ├── unknown [UI] (56B)
│   │       │   │   └── tile_bitmap [UI] (391B)
│   │       │   │         (10 more reachable)
│   │       │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │   └── popup_render_label [UI] (226B) (see above)
│   │       │   ├── draw_3d_border [UI] (167B)
│   │       │   │   ├── draw_hline [UI] (69B)
│   │       │   │   │     (8 more reachable)
│   │       │   │   └── draw_vline [UI] (69B)
│   │       │   │         (8 more reachable)
│   │       │   ├── port_draw_text_styled [UI] (238B)
│   │       │   │   ├── FUN_0000847F [??]
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   │   └── draw_string_palette [UI] (534B)
│   │       │   │         (2 more reachable)
│   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │   ├── FUN_0000847F [??] (see above)
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │       │   │   └── draw_string_palette [UI] (534B) (see above)
│   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │       │   │         (7 more reachable)
│   │       │   └── unknown (invalidate_all_children) [UI] (115B)
│   │       │       ├── FUN_00008B00 [??] (see above)
│   │       │       └── FUN_00008B2D [??] (see above)
│   │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │       │   └── FUN_00003CFF [??]
│   │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │       │   └── FUN_00003D62 [??]
│   │       └── modal_dialog_run [UI] (283B)
│   │           ├── process_messages [UI] (21B) (see above)
│   │           ├── get_view_window_handle [UI] (28B) (see above)
│   │           ├── disable_parent_window [UI] (121B)
│   │           └── enable_parent_window [UI] (126B)
│   ├── show_message [UI] (46B) (see above)
│   ├── set_improvement_name_string [UI] (41B) (see above)
│   ├── dialog_set_title [UI] (41B)
│   │     → Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   └── dialog_set_title_impl [UI] (42B)
│   │         → Implements title setting via CSocket::Create (misidentified by Ghidra — actually a string copy/display operation).
│   ├── civ_has_active_wonder [GL] (142B)
│   │     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   └── get_wonder_city [GL] (57B)
│   │         → Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │       └── is_wonder_obsolete [GL] (120B)
│   │           └── civ_has_tech [GL] (181B)
│   │               └── bit_index_to_byte_mask [GL] (45B) (see above)
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman").
│   ├── ai_choose_city_production [AI] (29400B)  *** STATE MUTATION ***
│   │     → The massive AI city production decision function.
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── show_message [UI] (46B) (see above)
│   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   ├── city_adjacent_to_continent [GL] (238B)
│   │   │     → Checks if a city (param_1) is adjacent to a given continent (param_2).
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── find_best_coastal_continent [GL] (344B)
│   │   │     → Finds the best (largest) coastal continent adjacent to a city.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   ├── is_wonder_obsolete [GL] (120B) (see above)
│   │   ├── get_wonder_city [GL] (57B) (see above)
│   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   ├── has_spaceship_launched [GL] (47B)
│   │   │     → Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── has_spaceship_built [GL] (47B)
│   │   │     → Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── can_build_unit_type [GL] (1095B)
│   │   │     → Checks if a civilization can build a specific unit type.
│   │   │   └── civ_has_tech [GL] (181B) (see above)
│   │   ├── can_build_improvement [GL] (1383B)
│   │   │     → Comprehensive check for whether a civ can build a specific city improvement or wonder.
│   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   └── can_build_wonder [GL] (199B)
│   │   │       └── civ_has_tech [GL] (181B) (see above)
│   │   ├── is_tile_worked [GL] (62B)
│   │   │     → Returns whether a specific tile (param_2) is being worked by city param_1.
│   │   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION ***
│   │   │     → Entry point for full city production calculation.
│   │   │   ├── evaluate_city_tiles [GL] (653B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   └── validate_unit_stack [GL] (1050B)  *** STATE MUTATION ***
│   │   │   │   │         (80 more reachable)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   ├── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   │     (79 more reachable)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │   │         (2 more reachable)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │       └── get_tile_ptr [GL] (90B) (see above)
│   │   │   ├── calc_capital_distance_and_corruption [GL] (1048B)  *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B) (see above)
│   │   │   │   ├── check_trade_route_path [GL] (682B)  *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── find_path [GL] (4118B)  *** STATE MUTATION ***
│   │   │   │   │   │     (225 more reachable)
│   │   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── is_tile_worked [GL] (62B) (see above)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   │   ├── calc_shields_per_row [GL] (1497B)  *** STATE MUTATION ***
│   │   │   │   ├── check_unit_support [GL] (281B)  *** STATE MUTATION ***
│   │   │   │   ├── calc_food_box_size [GL] (512B)  *** STATE MUTATION ***
│   │   │   │   ├── tile_distance_xy [GL] (157B) (see above)
│   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   └── recalc_city_all [GL] (76B)  *** STATE MUTATION ***
│   │   │       ├── assign_worker_tiles [GL] (2002B)  *** STATE MUTATION ***
│   │   │       │   ├── is_tile_worked [GL] (62B) (see above)
│   │   │       │   ├── calc_tile_resource [GL] (1528B)  *** STATE MUTATION ***
│   │   │       │   │     (77 more reachable)
│   │   │       │   ├── calc_tile_all_resources [GL] (130B)  *** STATE MUTATION ***
│   │   │       │   │     (77 more reachable)
│   │   │       │   ├── clear_and_check_worked_tiles [GL] (115B)  *** STATE MUTATION ***
│   │   │       │   │     (2 more reachable)
│   │   │       │   └── unknown (get_city_tile_flag) [GL] (29B)
│   │   │       ├── sync_worker_tile_status [GL] (155B)  *** STATE MUTATION ***
│   │   │       │   ├── set_worker_tile_status [GL] (93B)  *** STATE MUTATION ***
│   │   │       │   └── get_worker_tile_status [GL] (68B)
│   │   │       ├── calc_city_production [GL] (1053B)  *** STATE MUTATION ***
│   │   │       │   ├── has_building [GL] (122B) (see above)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │       │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │       │   └── calc_corruption [GL] (890B)  *** STATE MUTATION ***
│   │   │       │         (2 more reachable)
│   │   │       ├── calc_happiness [GL] (2627B)  *** STATE MUTATION ***
│   │   │       │   ├── has_building [GL] (122B) (see above)
│   │   │       │   ├── calc_city_trade_desirability [GL] (8227B)  *** STATE MUTATION ***
│   │   │       │   │     (4 more reachable)
│   │   │       │   ├── get_wonder_city [GL] (57B) (see above)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │       │   ├── check_trade_route_path [GL] (682B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │       │   ├── calc_corruption [GL] (890B)  *** STATE MUTATION *** (see above)
│   │   │       │   ├── adjust_happy_unhappy [GL] (453B)  *** STATE MUTATION ***
│   │   │       │   │     (1 more reachable)
│   │   │       │   ├── distribute_trade [GL] (1769B)  *** STATE MUTATION ***
│   │   │       │   │     (2 more reachable)
│   │   │       │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   │       │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │       │   └── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │       └── calc_trade_route_income [GL] (378B)  *** STATE MUTATION ***
│   │   ├── spaceship_ai_evaluate [AI] (1064B)
│   │   │     → AI evaluation of which spaceship category to build next.
│   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── spaceship_get_category_count [GL] (140B)
│   │   │   │   └── spaceship_get_max_component [GL] (264B)
│   │   │   ├── spaceship_get_raw_count [GL] (202B)
│   │   │   ├── spaceship_get_clamped_category [GL] (140B)
│   │   │   │   └── spaceship_get_clamped_count [GL] (89B)
│   │   │   │       └── spaceship_get_max_component [GL] (264B) (see above)
│   │   │   ├── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION ***
│   │   │   │   ├── calc_year_from_turn [GL] (540B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── spaceship_get_clamped_count [GL] (89B) (see above)
│   │   │   │   └── spaceship_calc_population_capacity [GL] (90B)
│   │   │   ├── unknown (spaceship section complete check) [GL] (66B)
│   │   │   │   ├── spaceship_get_max_category [GL] (79B)
│   │   │   │   └── spaceship_get_raw_count [GL] (202B) (see above)
│   │   │   └── spaceship_can_build_category [GL] (132B)
│   │   │       ├── civ_has_tech [GL] (181B) (see above)
│   │   │       ├── spaceship_get_raw_count [GL] (202B) (see above)
│   │   │       ├── unknown (spaceship section complete check) [GL] (66B) (see above)
│   │   │       └── unknown (spaceship category full check) [GL] (70B)
│   │   │           ├── spaceship_get_category_count [GL] (140B) (see above)
│   │   │           └── spaceship_get_raw_count [GL] (202B) (see above)
│   │   ├── spaceship_is_enabled [GL] (90B)
│   │   │     → Returns whether the spaceship victory condition is enabled.
│   │   ├── spaceship_ai_should_start [AI] (583B)
│   │   │     → Determines if an AI civ should start building spaceship parts.
│   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   └── spaceship_is_enabled [GL] (90B) (see above)
│   │   ├── rng_range [GL] (113B)  *** STATE MUTATION ***
│   │   │     → Returns a random integer in the range [param_1, param_2].
│   │   │   └── rng_next_float [GL] (94B)  *** STATE MUTATION ***
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── tile_distance_xy [GL] (157B)
│   │   │     → Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`.
│   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 for sea, Magellan +1 f...
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   └── get_unit_hp_remaining [GL] (98B)  *** STATE MUTATION ***
│   │   │       └── get_unit_max_hp [GL] (45B) (see above)
│   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │     → Returns remaining movement points (total - spent).
│   │   │   └── calc_unit_movement_points [GL] (516B) (see above)
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     → Returns the next unit in the stack linked list, or -1 if at end.
│   │   │   └── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │     → Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   ├── relocate_unit [GL] (388B)  *** STATE MUTATION ***
│   │   │     → Moves a unit from its current position to a new position by picking it up and putting it down.
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   └── FUN_0051D564 [??] (178B)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION ***
│   │   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   │   ├── net_send_to_player [GL] (305B)  *** STATE MUTATION ***
│   │   │   │   ├── net_broadcast [GL] (124B)  *** STATE MUTATION ***
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) (see above)
│   │   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   │   ├── net_msg_init_with_name [GL] (141B) (see above)
│   │   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) (see above)
│   │   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) (see above)
│   │   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) (see above)
│   │   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   │   ├── net_msg_init_header [GL] (55B) (see above)
│   │   │   │   │   └── netmgr_fill_game_info [GL] (598B) (see above)
│   │   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) (see above)
│   │   │   │   ├── diff_engine_serialize_game [GL] (835B)  *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   │   └── diff_engine_append_data [GL] (98B)
│   │   │   │   │         (7 more reachable)
│   │   │   │   ├── diff_engine_serialize_partial [GL] (308B)  *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B) (see above)
│   │   │   │   │   └── diff_engine_append_data [GL] (98B) (see above)
│   │   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B)  *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B) (see above)
│   │   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   │   ├── diff_engine_append_data [GL] (98B) (see above)
│   │   │   │   │   └── rle_encode (unnamed) [GL] (588B)
│   │   │   │   ├── diff_engine_serialize_changed_only [GL] (466B)  *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B) (see above)
│   │   │   │   │   ├── diff_engine_calc_total_size [GL] (152B) (see above)
│   │   │   │   │   └── diff_engine_append_data [GL] (98B) (see above)
│   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── get_civ_adjective_name [GL] (145B) (see above)
│   │   │   │   │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   │   │   │   ├── tile_bitmap [UI] (391B) (see above)
│   │   │   │   │   ├── port_set_rect_from_self [UI] (63B) (see above)
│   │   │   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   │   │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   │   └── netmgr_build_packet [GL] (405B)
│   │   │   │       └── net_msg_init_header [GL] (55B) (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diff_engine_invert_mirror [GL] (131B)  *** STATE MUTATION ***
│   │   │   │   │   └── diff_engine_copy_sections [GL] (143B)  *** STATE MUTATION ***
│   │   │   │   └── rle_encode (unnamed) [GL] (588B) (see above)
│   │   │   ├── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   │   └── put_down_unit [GL] (640B)  *** STATE MUTATION ***
│   │   │       ├── is_tile_valid [GL] (80B) (see above)
│   │   │       ├── show_dialog_message [UI] (43B) (see above)
│   │   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │       ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │       ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │       ├── find_first_unit_at [GL] (186B)
│   │   │       │   └── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │       └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── delete_unit [GL] (1129B)  *** STATE MUTATION ***
│   │   │     → Deletes a unit.
│   │   │   ├── FUN_0000C494 [??]
│   │   │   ├── FUN_0000C679 [??]
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   └── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
│   │   ├── check_adjacent_enemy_continent [GL] (297B)  *** STATE MUTATION ***
│   │   │     → Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean type match).
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   ├── sum_stack_property [GL] (724B)
│   │   │     → Sums a property across all units in a stack.
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   └── get_first_unit_in_stack [GL] (118B) (see above)
│   │   ├── count_units_by_role [GL] (120B)
│   │   │     → Counts units in a stack that have a specific role.
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   └── get_first_unit_in_stack [GL] (118B) (see above)
│   │   ├── is_unit_active [GL] (176B)
│   │   │     → Returns 1 if a unit is "active" — alive, has valid position, not on goto, and has remaining movement.
│   │   │   └── get_unit_moves_remaining [GL] (69B) (see above)
│   │   ├── refresh_unit_movement [GL] (40B)  *** STATE MUTATION ***
│   │   │     → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its movement — this is used...
│   │   │   └── calc_unit_movement_points [GL] (516B) (see above)
│   │   ├── check_unit_can_improve [GL] (354B)
│   │   │     → Checks if a settler/engineer unit can perform a specific terrain improvement at a location.
│   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   ├── check_adjacent_water [GL] (242B)
│   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   ├── get_tile_terrain_raw [GL] (41B) (see above)
│   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   │   └── is_tile_valid [GL] (80B) (see above)
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── get_unit_owner_at [GL] (66B)
│   │   │     → Returns the civ with units at a tile, or -1.
│   │   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   ├── check_tile_resource [GL] (281B)
│   │   │     → Checks if a tile has a special resource.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   ├── (count_techs_discovered) [GL] (86B)
│   │   │     → Counts total technologies discovered (1 through 62).
│   │   │   └── (check_tech_bit) [GL] (78B)
│   │   │       └── bit_index_to_byte_mask [GL] (45B) (see above)
│   │   ├── get_tile_improvements [GL] (39B)
│   │   │     → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4=road, bit 5=railroa...
│   │   │   └── get_tile_ptr [GL] (90B) (see above)
│   │   └── set_tile_improvement_bits [GL] (330B)  *** STATE MUTATION ***
│   │         → Sets or clears improvement bits on a tile.
│   │       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │       ├── get_tile_ptr [GL] (90B) (see above)
│   │       └── queue_map_update [GL] (515B)  *** STATE MUTATION ***
│   │           └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── calc_food_box_with_difficulty [GL] (106B)
│   │     → Calculates adjusted food box size based on difficulty.
│   │   └── classify_production_type [GL] (58B)
│   │         → Classifies a production item: returns 0 for positive (improvement/wonder), 1 for units (negative but > -0x22), 2 for special (< -0x22).
│   ├── enqueue_mp_event [MIXED] (398B)
│   │     → Enqueues a multiplayer event message.
│   │   └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object.
│   │   ├── unknown (popup list init) [UI] (64B)
│   │   │     → Resets and initializes a popup list control with 9 slots and param_1 items.
│   │   └── popup_dialog_reset [UI] (1299B)
│   │         → Resets all fields of a popup dialog structure to default values.
│   ├── popup_dialog_close [UI] (47B)
│   │     → Closes a popup dialog by destroying it and clearing its list control.
│   │   └── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   ├── popup_add_button [UI] (360B)
│   │     → Adds a button to the popup dialog.
│   │   ├── measure_text_height [UI] (42B) (see above)
│   │   └── init_editor_scrollbar [UI] (34B) (see above)
│   └── get_tile_continent [GL] (39B)
│         → Returns byte 3 of tile data (continent/landmass ID).
│       └── get_tile_ptr [GL] (90B) (see above)
├── play_sound_effect [UI] (601B)  *** STATE MUTATION ***
│     → Plays a sound effect by ID.
│   ├── flush_display [UI] (21B) (see above)
│   ├── file_exists [FW] (85B)
│   │     → Checks if a file exists by attempting to open it in read mode.
│   ├── text_concat_string [FW] (32B)
│   │     → Concatenates param_2 onto param_1 string.
│   ├── clear_string [FW] (22B)
│   │     → Sets the first byte of a string to 0 (empty string).
│   ├── append_int [FW] (53B)
│   │     → Converts int param_2 to string (base 10) and appends to param_1.
│   ├── get_cdrom_path [FW] (43B)
│   │     → Returns pointer to CD-ROM path (DAT_006ab680) or NULL if empty.
│   ├── resolve_file_path [FW] (831B)
│   │     → Resolves a file path by trying multiple locations: exe directory, relative paths, and CD-ROM path.
│   ├── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   ├── wave_play_sound [FW] (371B)
│   │     → Plays a WAV sound.
│   ├── wave_stop_sound [FW] (119B)
│   │     → Stops playback of all sounds with matching ID (param_1).
│   ├── _strcpy_thunk [FW] (7B) (see above)
│   └── _strcat [FW] (224B)
│         → CRT strcat — finds end of dest string then copies source.
├── has_spaceship_launched [GL] (47B)
│     → Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
├── has_spaceship_built [GL] (47B)
│     → Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
├── wonder_view_init [UI] (155B)
│     → Initializes the wonder view display: constructs the wonder view object, loads wonder art, plays wonder video (if applicable), and handles...
│   ├── unknown (stop music) [UI] (31B)
│   │     → Stops music playback and sets paused flag.
│   ├── resume_music [UI] (85B)
│   │     → Resumes music if enabled.
│   │   ├── select_random_music_track [UI] (388B)
│   │   │     → Selects a random music track.
│   │   └── unknown (stop music) [UI] (31B) (see above)
│   ├── wonder_view_cleanup_call [FW] (12B)
│   │     → Calls wonder_view_destruct.
│   │   └── wonder_view_destruct [UI] (120B)
│   │         → Destructs the wonder view object.
│   ├── wonder_view_seh_cleanup [FW] (14B)
│   │     → SEH cleanup handler.
│   ├── wonder_view_construct [UI] (154B)
│   │     → Constructs the wonder view object, setting up MFC base classes and storing global pointer in DAT_006a1864.
│   │   ├── dialog_ctor [UI] (146B)
│   │   │     → Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │   │   └── init_sprite_surface_mgr [UI] (133B) (see above)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object.
│   │       ├── FUN_0000E780 [??]
│   │       ├── palette_generate_random_id [UI] (75B)
│   │       └── unknown (palette_create) [UI] (60B)
│   ├── load_civ2_art_004bbb3f [UI] (638B)
│   │     → Loads wonder artwork from "civ2.wonder.dll", extracts the specific wonder's GIF sprite, creates a scaled bitmap surface, and displays it ...
│   │   ├── set_callback_paint [UI] (45B)
│   │   │     → Sets the paint callback handler on the window object.
│   │   ├── flush_at_origin [UI] (34B)
│   │   │     → Flushes the display at coordinates (0, 0).
│   │   │   └── port_alloc_rect [UI] (58B)
│   │   │       └── port_alloc [UI] (325B)
│   │   │           ├── FUN_000035B0 [??]
│   │   │           ├── rect_get_width [UI] (27B) (see above)
│   │   │           ├── rect_get_height [UI] (28B) (see above)
│   │   │           ├── port_init [UI] (258B)
│   │   │           ├── port_lock [UI] (287B)
│   │   │           │     (2 more reachable)
│   │   │           ├── port_unlock [UI] (83B)
│   │   │           │     (1 more reachable)
│   │   │           ├── surface_is_locked [UI] (44B)
│   │   │           ├── destroy_dib_surface [UI] (155B)
│   │   │           │     (2 more reachable)
│   │   │           ├── get_surface_stride [UI] (48B)
│   │   │           └── check_topdown [UI] (41B)
│   │   ├── pedia_free_resource [UI] (57B)
│   │   │     → Frees a resource stored in the object and sets the pointer to zero.
│   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │     → Stores param_1 at this+4 and calls FUN_00450440 to display it.
│   │   │   └── unknown (update pedia display surface) [UI] (49B)
│   │   │       └── select_palette [UI] (57B)
│   │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │   │     → Calls a GDI function on the window at this+8 with coordinates (0,0).
│   │   │   └── FUN_0000C763 [??]
│   │   ├── wonder_view_refresh_surface [UI] (60B)
│   │   │     → Refreshes the wonder view's rendering surface, blitting the wonder art bitmap.
│   │   │   ├── set_dialog_background [UI] (24B)  *** STATE MUTATION ***
│   │   │   └── unknown (dialog_render_title_bar) [UI] (3401B) (see above)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size.
│   │   │   ├── unknown (set_font_size) [UI] (43B) (see above)
│   │   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │   │   └── set_callback_0x3c [UI] (40B)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   │   ├── flush_at_origin [UI] (34B) (see above)
│   │   │   │   │   └── swap_dc [UI] (43B)
│   │   │   │   │         (1 more reachable)
│   │   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B) (see above)
│   │   │   │   ├── unknown (set button callback) [UI] (33B) (see above)
│   │   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │   └── create_offscreen_surface_b [UI] (119B) (see above)
│   │   ├── set_active_surface [UI] (74B)
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   └── call_refresh_callback [UI] (47B)
│   │   ├── port_alloc_rect [UI] (58B)
│   │   │     → Allocates a port surface from width and height dimensions by creating a RECT and delegating to port_alloc.
│   │   │   └── port_alloc [UI] (325B) (see above)
│   │   ├── load_gif_resource [UI] (847B)
│   │   │     → Loads a GIF image from a resource.
│   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   └── port_alloc [UI] (325B) (see above)
│   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │   └── write_full_colortable [UI] (39B)
│   │   │   │       └── FUN_00003B4C [??]
│   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   ├── palette_apply [UI] (90B)
│   │   │   │   │   ├── palette_generate_random_id [UI] (75B) (see above)
│   │   │   │   │   └── unknown (palette_update_entries) [UI] (60B)
│   │   │   │   └── palette_set_entry [UI] (316B)
│   │   │   ├── check_topdown [UI] (41B) (see above)
│   │   │   └── flip_surface_vertical [UI] (249B)
│   │   │       └── get_pixel_buffer [UI] (39B)
│   │   ├── port_fill_rect [UI] (236B)
│   │   │     → Fills a rectangle in the port with a given color index.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── port_lock [UI] (287B) (see above)
│   │   │   ├── surface_is_locked [UI] (44B) (see above)
│   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   ├── check_topdown [UI] (41B) (see above)
│   │   │   └── fill_rect_8bit [UI] (152B)
│   │   ├── port_set_color [UI] (43B)
│   │   │     → Fills the entire clip rect with a given color.
│   │   │   └── port_fill_rect [UI] (236B) (see above)
│   │   ├── sprite_reset [UI] (98B)
│   │   │     → Resets sprite to empty.
│   │   │   └── sprite_init_record [UI] (128B)
│   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │     → Extracts sprite with transparency and explicit x,y,w,h params.
│   │   │   ├── sprite_lock_data [UI] (56B)
│   │   │   └── sprite_extract_from_oleitem [UI] (1951B)
│   │   │       ├── rect_get_width [UI] (27B) (see above)
│   │   │       ├── rect_get_height [UI] (28B) (see above)
│   │   │       ├── port_lock [UI] (287B) (see above)
│   │   │       ├── port_unlock [UI] (83B) (see above)
│   │   │       ├── port_get_pixel_ptr [UI] (45B)
│   │   │       ├── surface_is_locked [UI] (44B) (see above)
│   │   │       ├── pixel_ptr_next_row [UI] (33B)
│   │   │       ├── pixel_ptr_prev_row [UI] (33B)
│   │   │       └── sprite_unlock_data [UI] (56B)
│   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── wonder_view_play_video [UI] (699B)
│   │     → Plays a wonder video (AVI) if available and video features are enabled.
│   │   ├── set_callback_paint [UI] (45B) (see above)
│   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   ├── init_palette_system [UI] (21B) (see above)
│   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │     → Calls manage_window_C44D with the window handle at this+8.
│   │   │   └── FUN_0000C44D [??]
│   │   ├── fade_out_palette [UI] (153B)
│   │   │     → Performs a palette fade-out effect over 10 steps with animation delays.
│   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   │   └── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │   │   ├── apply_palette_to_surfaces [UI] (241B)
│   │   │   │   ├── unknown (realize all palettes) [UI] (151B)
│   │   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   │   └── init_palette_system [UI] (21B) (see above)
│   │   │   │   └── port_load_tga_file [UI] (171B)
│   │   │   ├── restore_palette_entries [UI] (135B)
│   │   │   │   └── palette_apply [UI] (90B) (see above)
│   │   │   ├── unknown (realize all palettes) [UI] (151B)
│   │   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   │   └── init_palette_system [UI] (21B) (see above)
│   │   │   ├── palette_setup_crossfade [UI] (261B)
│   │   │   │   └── unknown (palette apply with range) [UI] (60B)
│   │   │   │       ├── palette_apply [UI] (90B) (see above)
│   │   │   │       └── FUN_005DE984 [??]
│   │   │   ├── palette_restore_from_crossfade [UI] (150B)
│   │   │   │   └── palette_set_entries [UI] (142B) (see above)
│   │   │   └── palette_crossfade_step [UI] (491B)
│   │   │       ├── FUN_0000EA62 [??]
│   │   │       └── unknown (palette_set_entry_raw) [UI] (55B)
│   │   ├── fade_in_palette [UI] (153B)
│   │   │     → Performs a palette fade-in effect over 10 steps.
│   │   │   ├── wait_for_animation [UI] (109B) (see above)
│   │   │   ├── unknown (realize palettes) [UI] (151B)
│   │   │   │   ├── init_palette_system [UI] (21B) (see above)
│   │   │   │   └── set_active_surface [UI] (74B) (see above)
│   │   │   ├── restore_palette_entries [UI] (135B) (see above)
│   │   │   ├── unknown (realize all palettes) [UI] (151B) (see above)
│   │   │   ├── palette_setup_crossfade [UI] (261B) (see above)
│   │   │   ├── palette_restore_from_crossfade [UI] (150B) (see above)
│   │   │   └── palette_crossfade_step [UI] (491B) (see above)
│   │   ├── wonder_view_resize [UI] (132B)
│   │   │     → Resizes the wonder view window to fit the wonder art dimensions (2x width for hi-res, plus height offset).
│   │   │   ├── init_palette_system [UI] (21B) (see above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B) (see above)
│   │   │   ├── dialog_create_buttons [UI] (675B) (see above)
│   │   │   ├── set_active_surface [UI] (74B) (see above)
│   │   │   ├── scroll_to_clamped [UI] (153B)
│   │   │   │   ├── set_surface_size [UI] (47B)
│   │   │   │   │   └── resize_window_client [UI] (213B)
│   │   │   │   │         (2 more reachable)
│   │   │   │   ├── get_scroll_min [UI] (49B)
│   │   │   │   └── get_scroll_max [UI] (52B)
│   │   │   └── port_fill_rect [UI] (236B) (see above)
│   │   └── modal_dialog_run [UI] (283B) (see above)
│   ├── pedia_navigate_to_item [UI] (369B)
│   │     → Navigates the Civilopedia to a specific item by index.
│   │   ├── end_paint [UI] (32B) (see above)
│   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   ├── unknown (lock pedia surface) [UI] (38B)
│   │   │     → Locks the drawing surface for the pedia widget.
│   │   │   ├── unknown (get drawing context) [UI] (37B) (see above)
│   │   │   └── surface_list_find_dirty [UI] (174B)
│   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │     → Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) sets up 2-4 addition...
│   │   │   ├── control_invalidate [UI] (65B) (see above)
│   │   │   ├── set_edit_text [UI] (43B)
│   │   │   │   └── FUN_00002D7F [??]
│   │   │   ├── pedia_button_ctor [UI] (83B) (see above)
│   │   │   ├── pedia_button_create [UI] (139B) (see above)
│   │   │   ├── unknown (set button callback) [UI] (33B) (see above)
│   │   │   └── unknown (clear hypertext links) [UI] (21B)
│   │   ├── pedia_clear_item_list [UI] (118B)
│   │   │     → Clears the linked list of Civilopedia display items.
│   │   │   └── init_palette_system [UI] (21B) (see above)
│   │   ├── pedia_draw_frame [UI] (800B)
│   │   │     → Draws the decorative frame around the Civilopedia window including borders, title text with shadow effect, and background panels.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │   │   │   └── tile_bitmap [UI] (391B) (see above)
│   │   │   ├── draw_3d_border [UI] (167B) (see above)
│   │   │   ├── port_set_rect_from_self [UI] (63B) (see above)
│   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── pedia_open_category [UI] (200B)
│   │   │     → Opens a specific category in the Civilopedia.
│   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   ├── set_dialog_enabled [UI] (36B)
│   │   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   ├── pedia_set_title [UI] (229B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   └── text_add_label_id [UI] (33B)
│   │   │   ├── pedia_push_history [UI] (523B)
│   │   │   └── set_active_surface [UI] (74B) (see above)
│   │   ├── pedia_get_entry_name [UI] (89B)
│   │   │     → Gets the name string for a Civilopedia entry by index from a linked list.
│   │   ├── civpedia_select_item [UI] (334B)
│   │   │     → Handles selection of a Civilopedia item.
│   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   │   ├── pedia_open_category [UI] (200B) (see above)
│   │   │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   │   ├── civpedia_draw_detail [UI] (1542B)
│   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   │   └── rect_get_width [UI] (27B) (see above)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   │   └── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   │   ├── pedia_show_description [UI] (593B)
│   │   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   │   └── pedia_set_selection [UI] (47B)
│   │   │   │   ├── pedia_add_hyperlink [UI] (1361B)
│   │   │   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   │   ├── control_invalidate [UI] (65B) (see above)
│   │   │   │   │   ├── hypertext_widget_create [UI] (139B)
│   │   │   │   │   │     (9 more reachable)
│   │   │   │   │   ├── pedia_link_node_ctor [UI] (86B)
│   │   │   │   │   │     (2 more reachable)
│   │   │   │   │   ├── unknown (set link callback) [UI] (33B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   │   │   ├── port_alloc [UI] (683B)
│   │   │   │   │   │     (5 more reachable)
│   │   │   │   │   └── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   │   ├── widget_get_height [UI] (34B) (see above)
│   │   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B) (see above)
│   │   │   │   ├── pedia_load_description [UI] (388B)  *** STATE MUTATION ***
│   │   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   │   ├── port_get_font [UI] (75B)
│   │   │   │   │   └── FUN_00003FEB [??]
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   ├── pedia_draw_item_detail [UI] (1488B)
│   │   │     → Draws the detail view for a selected Civilopedia item.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   ├── text_begin_bold [UI] (29B) (see above)
│   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   ├── unknown (get panel icon width) [UI] (37B) (see above)
│   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   ├── pedia_show_description [UI] (593B) (see above)
│   │   │   ├── pedia_add_hyperlink [UI] (1361B) (see above)
│   │   │   ├── widget_get_height [UI] (34B) (see above)
│   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B) (see above)
│   │   │   ├── pedia_load_description [UI] (388B)  *** STATE MUTATION *** (see above)
│   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   ├── port_set_clip_rect [UI] (55B) (see above)
│   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   ├── port_get_font [UI] (75B) (see above)
│   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   └── modal_dialog_run [UI] (283B) (see above)
│   ├── wave_mix_samples (reset) [FW] (288B)
│   │     → Resets wave output: stops all playback, drains pending messages, removes non-AVI sound nodes, clears buffer flags.
│   └── _strcpy_thunk / _chkstk [FW] (47B)
│         → Stack probe function — touches stack pages in 4KB increments to trigger guard page allocation.
├── civ_has_tech [GL] (181B)
│     → Checks if a civilization (param_1) has a specific technology (param_2).
│   └── bit_index_to_byte_mask [GL] (45B) (see above)
├── upgrade_units_for_tech [GL] (970B)  *** STATE MUTATION ***
│     → When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type.
│   ├── set_improvement_name_string [UI] (41B) (see above)
│   ├── show_game_popup_3arg [UI] (43B)
│   │     → Shows a game popup dialog with 3 arguments using the global dialog context.
│   │   └── show_terrain_help [UI] (58B)
│   │         → Shows help text for a terrain type.
│   │       └── FUN_0051D564 [??] (178B) (see above)
│   ├── civ_has_active_wonder [GL] (142B) (see above)
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── update_tile_all_players [UI] (124B)
│   │     → Updates a single tile for all active players.
│   │   └── update_map_tile [UI] (50B)
│   │         → Updates a single map tile (radius 0, current player, with invalidate).
│   │       └── update_map_area [UI] (313B)  *** STATE MUTATION ***
│   │           ├── tile_to_screen [UI] (151B)
│   │           │   └── wrap_x [GL] (94B) (see above)
│   │           ├── is_tile_visible [UI] (99B)
│   │           │   └── is_tile_in_viewport_rect [UI] (97B)
│   │           │         (1 more reachable)
│   │           ├── redraw_tile_area [UI] (352B)
│   │           │   ├── draw_complete_tile [UI] (495B)
│   │           │   │     (104 more reachable)
│   │           │   ├── is_tile_visible [UI] (99B) (see above)
│   │           │   ├── draw_city_labels [UI] (871B)
│   │           │   │     (8 more reachable)
│   │           │   ├── calc_tile_group_rect [UI] (191B)
│   │           │   │     (1 more reachable)
│   │           │   ├── wrap_x [GL] (94B) (see above)
│   │           │   └── port_set_rect [UI] (91B) (see above)
│   │           ├── invalidate_tile_area [UI] (60B)
│   │           │   ├── invalidate_region [UI] (180B) (see above)
│   │           │   └── calc_tile_group_rect [UI] (191B) (see above)
│   │           ├── reset_sprite_scale [UI] (28B) (see above)
│   │           ├── set_current_zoom_scale [UI] (41B)
│   │           │   └── set_sprite_scale [UI] (33B) (see above)
│   │           └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   └── enqueue_mp_event [MIXED] (398B) (see above)
├── can_build_unit_type [GL] (1095B)
│     → Checks if a civilization can build a specific unit type.
│   └── civ_has_tech [GL] (181B) (see above)
├── complete_research [MIXED] (1422B)  *** STATE MUTATION ***
│     → Completes a tech research for a civ.
│   ├── text_begin [UI] (29B) (see above)
│   ├── select_list_item [UI] (38B) (see above)
│   ├── text_newline [UI] (29B)
│   │     → Adds a newline to the global text buffer.
│   ├── display_improvement [UI] (33B) (see above)
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   ├── show_dialog_message [UI] (43B) (see above)
│   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   ├── set_improvement_name_string [UI] (41B) (see above)
│   ├── dialog_set_title [UI] (41B) (see above)
│   ├── reassign_all_city_production [GL] (254B)  *** STATE MUTATION ***
│   │     → Reassigns production for all cities belonging to a specific civ (param_1).
│   │   ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│   │   └── get_tile_continent [GL] (39B) (see above)
│   ├── get_civ_adjective_name [GL] (145B) (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── handle_tech_government_effects [GL] (973B)  *** STATE MUTATION ***
│   │     → Handles side effects when a civ discovers a tech that unlocks a new government form.
│   │   ├── show_message [UI] (46B) (see above)
│   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564(param_1, param_2, 0, param_3, param_4).
│   │   │   └── FUN_0051D564 [??] (178B) (see above)
│   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   └── set_government_type [GL] (529B)  *** STATE MUTATION ***
│   │         → Sets a civ's government type.
│   │       ├── show_tax_rate_dialog [MIXED] (226B)  *** STATE MUTATION ***
│   │       │   ├── FUN_00009429 [??]
│   │       │   ├── open_tax_rate_dialog [MIXED] (4140B)  *** STATE MUTATION ***
│   │       │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │       │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │       │   │   ├── get_max_tax_rate [GL] (156B)
│   │       │   │   ├── balance_tax_rates [GL] (293B)
│   │       │   │   ├── taxrate_recalc_totals [MIXED] (848B)  *** STATE MUTATION ***
│   │       │   │   │     (3 more reachable)
│   │       │   │   ├── process_messages [UI] (21B) (see above)
│   │       │   │   ├── get_font_height [UI] (28B) (see above)
│   │       │   │   ├── measure_text_height [UI] (42B) (see above)
│   │       │   │   ├── set_dialog_enabled [UI] (36B) (see above)
│   │       │   │   ├── create_text_button [UI] (133B) (see above)
│   │       │   │   ├── set_button_owner [UI] (45B) (see above)
│   │       │   │   ├── set_button_handler [UI] (45B) (see above)
│   │       │   │   ├── set_button_click_callback [UI] (33B) (see above)
│   │       │   │   ├── create_checkbox [UI] (167B) (see above)
│   │       │   │   ├── set_checkbox_callback [UI] (33B)
│   │       │   │   ├── set_checkbox_value [UI] (33B) (see above)
│   │       │   │   ├── create_scrollbar [UI] (124B) (see above)
│   │       │   │   ├── scrollbar_set_position [UI] (52B) (see above)
│   │       │   │   ├── scrollbar_set_range [UI] (47B) (see above)
│   │       │   │   ├── scrollbar_set_callback [UI] (33B) (see above)
│   │       │   │   ├── dialog_repaint_check [UI] (91B)
│   │       │   │   │     (7 more reachable)
│   │       │   │   ├── save_civ2_dat [GL] (212B)
│   │       │   │   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   │       │   │   ├── citywin_refresh_top_panels [UI] (153B)
│   │       │   │   │     (178 more reachable)
│   │       │   │   ├── dialog_create [UI] (588B) (see above)
│   │       │   │   ├── refresh_status_panel [UI] (297B)
│   │       │   │   │     (121 more reachable)
│   │       │   │   ├── set_active_surface [UI] (74B) (see above)
│   │       │   │   ├── load_gif_resource [UI] (847B) (see above)
│   │       │   │   ├── modal_dialog_run [UI] (283B) (see above)
│   │       │   │   └── palette_init [UI] (145B) (see above)
│   │       │   └── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │       └── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   ├── we_love_the_king_day [GL] (379B)
│   │     → Triggers "We Love the King Day" celebration for a civilization.
│   │   ├── show_message [UI] (46B) (see above)
│   │   ├── get_civ_name [UI] (28B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── unknown (show tech help) [UI] (43B)
│   │   │     → Shows tech help text via the help display system.
│   │   │   └── show_tech_help [UI] (92B)
│   │   │       └── FUN_0051D564 [??] (178B) (see above)
│   │   └── enqueue_mp_event [MIXED] (398B) (see above)
│   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION ***
│   │     → Master handler for when a civilization discovers a new technology.
│   │   ├── text_begin [UI] (29B) (see above)
│   │   ├── text_add_string [UI] (33B) (see above)
│   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   ├── select_list_item [UI] (38B) (see above)
│   │   ├── text_newline [UI] (29B) (see above)
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── display_improvement [UI] (33B) (see above)
│   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   │   ├── get_wonder_owner [GL] (73B)
│   │   │     → Returns the civ that owns a wonder, or -1 if no one does.
│   │   │   └── get_wonder_city [GL] (57B) (see above)
│   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION ***
│   │   │     → Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the diplomacy dialog flow.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION ***
│   │   │   │   └── scroll_map_if_needed [UI] (404B)
│   │   │   │       └── set_map_scroll_position [UI] (98B)
│   │   │   │             (135 more reachable)
│   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   ├── open_intelligence_dialog [UI] (535B)
│   │   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   │   │   ├── create_text_button [UI] (133B) (see above)
│   │   │   │   ├── set_button_owner [UI] (45B) (see above)
│   │   │   │   ├── set_button_handler [UI] (45B) (see above)
│   │   │   │   ├── set_button_click_callback [UI] (33B) (see above)
│   │   │   │   ├── set_active_surface [UI] (74B) (see above)
│   │   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION ***
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION ***
│   │   │   │   │   └── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   └── get_attitude_raw [GL] (47B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── ai_choose_government [AI] (558B)  *** STATE MUTATION ***
│   │   │   │   │   ├── check_govt_available [GL] (323B)
│   │   │   │   │   └── ai_revolution_notification [GL] (1336B)  *** STATE MUTATION ***
│   │   │   │   │         (336 more reachable)
│   │   │   │   ├── spaceship_ai_should_start [AI] (583B) (see above)
│   │   │   │   ├── find_nearest_unit [GL] (233B)  *** STATE MUTATION ***
│   │   │   │   │   └── calc_movement_cost [GL] (94B) (see above)
│   │   │   │   └── get_unit_owner_at [GL] (66B) (see above)
│   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   ├── text_newline [UI] (29B) (see above)
│   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   │   └── calc_attitude [GL] (178B) (see above)
│   │   │   ├── diplo_show_greeting [MIXED] (804B)  *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── open_list_dialog [UI] (47B)
│   │   │   │   │   └── open_dialog_extended [UI] (56B)
│   │   │   │   │         (84 more reachable)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── intel_open_advisor [UI] (546B)
│   │   │   │   │   ├── unknown (stop music) [UI] (31B) (see above)
│   │   │   │   │   ├── intel_create_object [UI] (200B)
│   │   │   │   │   │     (8 more reachable)
│   │   │   │   │   ├── intel_setup_display [UI] (236B)
│   │   │   │   │   │     (57 more reachable)
│   │   │   │   │   ├── intel_delete_object [UI] (57B)
│   │   │   │   │   │     (39 more reachable)
│   │   │   │   │   ├── unknown (set popup parent A) [UI] (24B)
│   │   │   │   │   └── unknown (set popup parent B) [UI] (24B)
│   │   │   │   ├── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── unknown (set popup position) [UI] (32B)
│   │   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │   ├── popup_set_position_fields [UI] (42B)
│   │   │   │   └── get_screen_rect [UI] (48B)
│   │   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   ├── intel_play_animation [UI] (181B)
│   │   │   │   └── intel_play_video_frame [UI] (248B)
│   │   │   │       └── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   └── popup_add_radio_option [UI] (566B)
│   │   │       ├── measure_text_height [UI] (42B) (see above)
│   │   │       └── popup_get_button_width [UI] (32B)
│   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION ***
│   │   │     → Resets all diplomacy session state variables to their default values and closes the intelligence advisor.
│   │   │   └── intel_close_advisor [UI] (166B)
│   │   │       ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   │       ├── wait_for_animation [UI] (109B) (see above)
│   │   │       ├── resume_music [UI] (85B) (see above)
│   │   │       ├── intel_teardown_display [UI] (158B)
│   │   │       │   ├── save_and_flush [UI] (41B) (see above)
│   │   │       │   ├── swap_dc [UI] (43B) (see above)
│   │   │       │   ├── init_palette_system [UI] (21B) (see above)
│   │   │       │   ├── pedia_free_resource [UI] (57B) (see above)
│   │   │       │   ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│   │   │       │   ├── unknown (manage pedia window) [UI] (37B) (see above)
│   │   │       │   ├── unknown (set popup parent A) [UI] (24B) (see above)
│   │   │       │   ├── unknown (set popup parent B) [UI] (24B) (see above)
│   │   │       │   └── unknown (set popup position) [UI] (32B) (see above)
│   │   │       └── intel_delete_object [UI] (57B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   ├── upgrade_units_for_tech [GL] (970B)  *** STATE MUTATION *** (see above)
│   │   ├── handle_tech_government_effects [GL] (973B)  *** STATE MUTATION *** (see above)
│   │   ├── we_love_the_king_day [GL] (379B) (see above)
│   │   ├── format_enabled_item [UI] (138B)
│   │   │     → Formats an enabled item (unit/improvement/wonder) for display in the tech discovery dialog.
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   └── popup_add_edit_field [UI] (412B)
│   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   ├── unknown (show tech help) [UI] (43B) (see above)
│   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   ├── pedia_select_entry [UI] (342B)
│   │   │     → Selects and displays a Civilopedia entry.
│   │   │   ├── end_paint [UI] (32B) (see above)
│   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   │   ├── pedia_open_category [UI] (200B) (see above)
│   │   │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   │   ├── pedia_draw_tech_detail [UI] (5911B)
│   │   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   │   ├── text_begin_bold [UI] (29B) (see above)
│   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B) (see above)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B) (see above)
│   │   │   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   │   │   ├── pedia_show_description [UI] (593B) (see above)
│   │   │   │   ├── pedia_add_hyperlink [UI] (1361B) (see above)
│   │   │   │   ├── pedia_clear_selection [UI] (47B) (see above)
│   │   │   │   ├── init_editor_scrollbar [UI] (34B) (see above)
│   │   │   │   ├── widget_get_height [UI] (34B) (see above)
│   │   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B) (see above)
│   │   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   │   ├── port_set_clip_rect [UI] (55B) (see above)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   │   └── modal_dialog_run [UI] (283B) (see above)
│   │   ├── draw_status_panel_header [UI] (1182B)
│   │   │     → Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and research progress indic...
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── flush_display [UI] (21B) (see above)
│   │   │   ├── invalidate_region [UI] (180B) (see above)
│   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   ├── text_add_label_id [UI] (33B) (see above)
│   │   │   ├── get_font_height [UI] (28B) (see above)
│   │   │   ├── measure_text_height [UI] (42B) (see above)
│   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   ├── unknown (string pool set) [UI] (33B)
│   │   │   │   └── advance_year_display [UI] (479B)
│   │   │   │       ├── text_add_label_id [UI] (33B) (see above)
│   │   │   │       └── text_newline [UI] (29B) (see above)
│   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   └── draw_text_with_shadow [UI] (205B)
│   │   │   │       ├── measure_text_height [UI] (42B) (see above)
│   │   │   │       ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   │   │       └── unknown (set/get draw color) [UI] (38B) (see above)
│   │   │   ├── scale_sprite [UI] (35B) (see above)
│   │   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   ├── draw_hline [UI] (69B) (see above)
│   │   │   ├── tile_bitmap [UI] (391B) (see above)
│   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   ├── set_text_style [UI] (68B)
│   │   │   ├── port_set_rect_from_self [UI] (63B) (see above)
│   │   │   ├── port_set_rect [UI] (91B) (see above)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   ├── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   ├── popup_dialog_close [UI] (47B) (see above)
│   │   ├── popup_add_edit_field [UI] (412B)
│   │   │     → Adds a text edit field to a popup dialog.
│   │   ├── popup_set_scaled_width [UI] (99B)
│   │   │     → Sets the popup dialog width (this+0x11C) with optional resolution scaling.
│   │   ├── popup_add_button [UI] (360B) (see above)
│   │   └── bit_index_to_byte_mask [GL] (45B) (see above)
│   ├── unknown (choose research wrapper) [GL] (40B)  *** STATE MUTATION ***
│   │     → Wrapper that calls choose_research_tech(param_1, 0) — the "choose next research" entry point.
│   │   └── choose_research_tech [MIXED] (2078B)  *** STATE MUTATION ***
│   │         → The main "choose research" dialog for human players.
│   │       ├── text_begin [UI] (29B) (see above)
│   │       ├── text_newline [UI] (29B) (see above)
│   │       ├── display_improvement [UI] (33B) (see above)
│   │       ├── text_add_number [UI] (33B) (see above)
│   │       ├── show_message [UI] (46B) (see above)
│   │       ├── set_improvement_name_string [UI] (41B) (see above)
│   │       ├── dialog_set_icon [UI] (40B)
│   │       ├── dialog_set_title [UI] (41B) (see above)
│   │       ├── init_game_display [UI] (51B)
│   │       │   ├── flush_display [UI] (21B) (see above)
│   │       │   └── init_palette_system [UI] (21B) (see above)
│   │       ├── civ_has_tech [GL] (181B) (see above)
│   │       ├── ai_pick_research_goal [AI] (417B)
│   │       │   ├── ai_calc_tech_value [AI] (2869B)
│   │       │   │   ├── get_wonder_city [GL] (57B) (see above)
│   │       │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │       │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │       │   │   └── tech_is_descendant_of [GL] (135B)
│   │       │   └── can_research_tech [GL] (156B)
│   │       │       └── civ_has_tech [GL] (181B) (see above)
│   │       ├── show_research_goal_dialog [UI] (3119B)
│   │       │   ├── text_begin [UI] (29B) (see above)
│   │       │   ├── text_add_label_id [UI] (33B) (see above)
│   │       │   ├── select_list_item [UI] (38B) (see above)
│   │       │   ├── text_newline [UI] (29B) (see above)
│   │       │   ├── display_improvement [UI] (33B) (see above)
│   │       │   ├── text_add_number [UI] (33B) (see above)
│   │       │   ├── open_list_dialog [UI] (47B) (see above)
│   │       │   ├── unknown (string pool append separator) [UI] (29B) (see above)
│   │       │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │       │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │       │   ├── dialog_set_icon [UI] (40B) (see above)
│   │       │   ├── dialog_set_title [UI] (41B) (see above)
│   │       │   ├── civ_has_tech [GL] (181B) (see above)
│   │       │   ├── tech_is_descendant_of [GL] (135B) (see above)
│   │       │   ├── pedia_select_entry [UI] (342B) (see above)
│   │       │   ├── pedia_navigate_to_item [UI] (369B) (see above)
│   │       │   ├── popup_dialog_create [UI] (93B) (see above)
│   │       │   ├── popup_add_edit_field [UI] (412B) (see above)
│   │       │   ├── popup_set_field_38 [UI] (33B)
│   │       │   ├── popup_add_radio_option [UI] (566B) (see above)
│   │       │   ├── popup_add_action_button_label [UI] (119B)
│   │       │   └── pedia_select_unit_type [UI] (342B)
│   │       │       ├── end_paint [UI] (32B) (see above)
│   │       │       ├── show_window_wrapper [UI] (33B) (see above)
│   │       │       ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │       │       ├── pedia_init_tabs [UI] (1391B) (see above)
│   │       │       ├── pedia_clear_item_list [UI] (118B) (see above)
│   │       │       ├── pedia_draw_frame [UI] (800B) (see above)
│   │       │       ├── pedia_open_category [UI] (200B) (see above)
│   │       │       ├── pedia_get_entry_name [UI] (89B) (see above)
│   │       │       ├── pedia_unit_draw_details [UI] (4075B)
│   │       │       │     (59 more reachable)
│   │       │       └── modal_dialog_run [UI] (283B) (see above)
│   │       ├── pedia_select_entry [UI] (342B) (see above)
│   │       ├── popup_dialog_create [UI] (93B) (see above)
│   │       ├── popup_dialog_destroy [UI] (1061B)  *** STATE MUTATION *** (see above)
│   │       ├── popup_add_edit_field [UI] (412B) (see above)
│   │       ├── popup_set_position_fields [UI] (42B) (see above)
│   │       ├── popup_add_button [UI] (360B) (see above)
│   │       ├── popup_add_radio_option [UI] (566B) (see above)
│   │       └── popup_show_modal [UI] (999B) (see above)
│   ├── set_paradrop_range [GL] (31B)  *** STATE MUTATION ***
│   │     → Sets the paradrop range for a unit type.
│   ├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION *** (see above)
│   ├── pedia_select_entry [UI] (342B)
│   │     → Selects and displays a Civilopedia entry.
│   │   ├── end_paint [UI] (32B) (see above)
│   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   ├── unknown (lock pedia surface) [UI] (38B) (see above)
│   │   ├── pedia_init_tabs [UI] (1391B) (see above)
│   │   ├── pedia_clear_item_list [UI] (118B) (see above)
│   │   ├── pedia_draw_frame [UI] (800B) (see above)
│   │   ├── pedia_open_category [UI] (200B) (see above)
│   │   ├── pedia_get_entry_name [UI] (89B) (see above)
│   │   ├── pedia_draw_tech_detail [UI] (5911B) (see above)
│   │   └── modal_dialog_run [UI] (283B) (see above)
│   ├── popup_dialog_create [UI] (93B) (see above)
│   └── popup_add_button [UI] (360B) (see above)
├── acquire_wonder [GL] (488B)  *** STATE MUTATION ***
│     → Acquires (completes) a wonder for a city.
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── unknown (get mp object byte) [FW] (31B)
│   │     → Returns a single byte from offset 0x1ef within the current object (in_ECX).
│   ├── set_building [GL] (186B)  *** STATE MUTATION *** (see above)
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   └── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
├── calc_city_production (entry point) [GL] (132B)  *** STATE MUTATION ***
│     → Entry point for full city production calculation.
│   ├── evaluate_city_tiles [GL] (653B)  *** STATE MUTATION *** (see above)
│   ├── calc_capital_distance_and_corruption [GL] (1048B)  *** STATE MUTATION *** (see above)
│   ├── calc_shields_per_row [GL] (1497B)  *** STATE MUTATION *** (see above)
│   └── recalc_city_all [GL] (76B)  *** STATE MUTATION *** (see above)
├── show_city_event_dialog [UI] (628B)  *** STATE MUTATION ***
│     → Shows a city event notification dialog (e.g., "Building completed", "Famine", etc.).
│   ├── text_begin [UI] (29B) (see above)
│   ├── text_add_string [UI] (33B) (see above)
│   ├── select_list_item [UI] (38B) (see above)
│   ├── scroll_all_views_if_needed [UI] (261B)  *** STATE MUTATION *** (see above)
│   ├── mp_set_string_control [UI] (46B)  *** STATE MUTATION *** (see above)
│   ├── get_improvement_name [FW] (92B) (see above)
│   ├── dialog_set_title [UI] (41B) (see above)
│   ├── city_event_dialog_cleanup_free [FW] (12B)
│   │     → Dialog destructor for city event dialog — frees an allocated buffer via thunk_FUN_0059df8a.
│   │   └── popup_dialog_close [UI] (47B) (see above)
│   ├── city_event_dialog_seh_epilog [FW] (15B)
│   │     → SEH epilog for city event dialog.
│   ├── popup_dialog_create [UI] (93B) (see above)
│   ├── popup_set_default_selection [UI] (116B)
│   │     → Sets the default selected item in the popup by ID.
│   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │     → Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1.
│   │   └── popup_find_button_by_id [UI] (100B)
│   │         → Searches the popup's button linked list (head at this+0x234) for a node whose first field (node[0]) matches param_1.
│   └── popup_add_radio_option [UI] (566B) (see above)
├── show_city_event_dialog_v2 [UI] (915B)  *** STATE MUTATION ***
│     → Enhanced version of city event dialog with a production item image.
│   ├── select_list_item [UI] (38B) (see above)
│   ├── get_improvement_name [FW] (92B) (see above)
│   ├── dialog_set_title [UI] (41B) (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── city_event_v2_cleanup_cstring_dtor [FW] (12B)
│   │     → CString destructor cleanup for show_city_event_dialog_v2 — calls FUN_005cde4d to destroy a CString object.
│   │   └── sprite_free_data [UI] (84B)
│   │         → Unlocks and frees sprite data handle at this+0x34/0x38.
│   ├── city_event_v2_seh_epilog [FW] (15B)
│   │     → SEH epilog for show_city_event_dialog_v2.
│   ├── pedia_window_ctor [UI] (115B)
│   │     → Constructor for the Civilopedia window object.
│   │   └── popup_dialog_create [UI] (93B) (see above)
│   ├── pedia_window_scalar_delete [FW] (57B)
│   │     → Scalar deleting destructor for the Civilopedia window.
│   ├── popup_set_default_selection [UI] (116B) (see above)
│   ├── popup_add_button [UI] (360B) (see above)
│   ├── popup_add_radio_option [UI] (566B) (see above)
│   ├── load_gif_resource [UI] (847B) (see above)
│   ├── palette_init [UI] (145B) (see above)
│   └── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
├── assign_caravan_commodity [GL] (327B)  *** STATE MUTATION ***
│     → Assigns a trade commodity to a newly built caravan/freight unit.
├── handle_espionage_discovery [GL] (236B)  *** STATE MUTATION ***
│     → Handles discovery of espionage (spy embassy established).
│   └── adjust_attitude [GL] (107B)  *** STATE MUTATION ***
│         → Adjusts the attitude value between two civs by a delta.
│       ├── get_attitude_raw [GL] (47B) (see above)
│       └── set_attitude_value [GL] (120B)  *** STATE MUTATION ***
│             → Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100.
├── handle_space_race_victory [GL] (641B)  *** STATE MUTATION ***
│     → Handles space race victory condition.
│   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── redraw_map_all_players [UI] (124B)
│   │     → Redraws entire map for all active players.
│   │   └── redraw_entire_map [UI] (205B)  *** STATE MUTATION ***
│   │         → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionally redraws the minimap.
│   │       ├── minimap_full_redraw [UI] (416B)
│   │       │   ├── minimap_calc_viewport [UI] (620B)  *** STATE MUTATION ***
│   │       │   │   └── wrap_x [GL] (94B) (see above)
│   │       │   ├── minimap_get_tile_color [UI] (425B)
│   │       │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │       │   │   ├── find_city_at [GL] (245B)
│   │       │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │       │   │   └── get_tile_explored [GL] (71B) (see above)
│   │       │   ├── minimap_draw_goto_line [UI] (211B)
│   │       │   │   ├── minimap_tile_to_screen [UI] (169B)
│   │       │   │   ├── set_rect_abs [UI] (42B) (see above)
│   │       │   │   └── surface_fill_rect_color [UI] (63B)
│   │       │   │         (1 more reachable)
│   │       │   ├── flush_display [UI] (21B) (see above)
│   │       │   ├── end_paint [UI] (32B) (see above)
│   │       │   ├── surface_set_clear_color [UI] (34B)
│   │       │   │   └── unknown (clear_surface_region) [UI] (28B)
│   │       │   ├── fill_rect_palette [UI] (50B)
│   │       │   │   └── fill_rect_xywh [UI] (63B)
│   │       │   ├── is_tile_valid [GL] (80B) (see above)
│   │       │   ├── unknown (dialog_render_title_bar) [UI] (3401B) (see above)
│   │       │   ├── dialog_create_buttons [UI] (675B) (see above)
│   │       │   ├── prepare_surface [UI] (24B) (see above)
│   │       │   └── wrap_x [GL] (94B) (see above)
│   │       ├── recalc_viewport_geometry [UI] (1410B)
│   │       │   ├── set_editor_font [UI] (93B)
│   │       │   │   ├── FUN_00008200 [??]
│   │       │   │   ├── FUN_0000847F [??] (see above)
│   │       │   │   └── delete_font [UI] (98B)
│   │       │   │         (3 more reachable)
│   │       │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │       │   ├── scale_at_current_zoom [UI] (47B)
│   │       │   │   └── scale_sprite [UI] (35B) (see above)
│   │       │   ├── set_current_zoom_scale [UI] (41B) (see above)
│   │       │   ├── wrap_x [GL] (94B) (see above)
│   │       │   ├── port_alloc_rect [UI] (58B) (see above)
│   │       │   ├── scale_table_build_primary [UI] (657B) (see above)
│   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │       ├── redraw_full_viewport [UI] (278B)
│   │       │   ├── draw_complete_tile [UI] (495B) (see above)
│   │       │   ├── draw_city_labels [UI] (871B) (see above)
│   │       │   ├── unknown (clear_surface_region) [UI] (28B) (see above)
│   │       │   └── wrap_x [GL] (94B) (see above)
│   │       ├── begin_end_paint_cycle [UI] (100B)
│   │       │   ├── flush_display [UI] (21B) (see above)
│   │       │   ├── end_paint [UI] (32B) (see above)
│   │       │   └── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   │       ├── unknown (dialog_render_title_bar) [UI] (3401B) (see above)
│   │       └── dialog_create_buttons [UI] (675B) (see above)
│   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   ├── get_tile_ptr [GL] (90B) (see above)
│   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION ***
│   │     → Sets or clears visibility bits (byte 4) on a tile.
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION ***
│   │     → Sets a civ's tile visibility byte.
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │     → Returns pointer to a civ's visibility byte for a tile.
│   │   └── queue_map_update [GL] (515B)  *** STATE MUTATION *** (see above)
│   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION ***
│   │     → Begins a batched map update session for multiplayer.
│   └── end_map_batch [GL] (194B)  *** STATE MUTATION ***
│         → Ends a batched map update.
│       ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│       └── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
├── city_message_wrapper [UI] (38B)
│     → Wrapper to display a city-related message.
│   └── show_city_event_dialog [UI] (628B)  *** STATE MUTATION *** (see above)
├── draw_production_box [UI] (1434B)
│     → Draws the production box in the city window.
│   ├── rect_get_width [UI] (27B) (see above)
│   ├── rect_get_height [UI] (28B) (see above)
│   ├── invalidate_region [UI] (180B) (see above)
│   ├── set_rect_wh [UI] (48B) (see above)
│   ├── get_improvement_name [FW] (92B) (see above)
│   ├── rect_offset [FW] (34B)
│   │     → Wraps Win32 OffsetRect(param_1, param_2, param_3).
│   ├── draw_text_centered [UI] (46B)
│   │     → Draws text centered within a rect at (param_2, param_3) with width param_4.
│   │   └── draw_text_centered [UI] (139B)
│   │         → Draws text centered horizontally within a given width.
│   │       ├── measure_text_height [UI] (42B) (see above)
│   │       └── draw_text_with_shadow [UI] (205B) (see above)
│   ├── close_dialog [UI] (94B)
│   │     → Removes all click regions with a matching dialog ID (param_1).
│   │   └── remove_click_region [UI] (107B)
│   │         → Removes a click region at index param_1 by shifting subsequent entries down.
│   ├── init_unit_move_data [GL] (253B)  *** STATE MUTATION ***
│   │     → Initializes the unit movement animation data structure at 0x006660xx.
│   ├── set_sprite_scale [UI] (33B) (see above)
│   ├── reset_sprite_scale [UI] (28B) (see above)
│   ├── widget_inflate_rect_neg [UI] (40B) (see above)
│   ├── widget_inflate_rect [UI] (34B) (see above)
│   ├── citywin_prepare_panel [UI] (77B)
│   │     → Prepares a panel for drawing: clears surface, sets draw state, blits background.
│   │   ├── citywin_blit_panel [UI] (129B)
│   │   │     → Blits a city window panel from the offscreen buffer to the display surface, accounting for scroll offset.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   └── blit_rect_to_rect [UI] (95B) (see above)
│   │   ├── prepare_surface [UI] (24B) (see above)
│   │   ├── set_text_draw_target [UI] (24B) (see above)
│   │   └── set_text_draw_source [UI] (24B) (see above)
│   ├── draw_3d_frame [UI] (42B)
│   │     → Draws a 3D frame/border by delegating to thunk_FUN_005a99fc (draw_3d_border) with the global surface and 3 params.
│   │   └── draw_3d_border [UI] (167B) (see above)
│   ├── invalidate_rect_region [UI] (78B)
│   │     → Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then calling thunk_FUN_0046ace7.
│   │   └── add_click_region [UI] (153B)
│   │         → Adds a new click region.
│   │       └── set_rect_wh [UI] (48B) (see above)
│   ├── blit_sprite_8param [UI] (62B)
│   │     → Blits a sprite with 8 parameters by calling thunk_FUN_00548c78 with the global surface prepended.
│   │   └── draw_icon_row_spaced [UI] (246B)
│   │         → Draws a row of icons with computed spacing, using Bresenham-style error accumulation for sub-pixel positioning.
│   │       ├── calc_icon_spacing [UI] (264B)
│   │       └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   ├── scale_universal [UI] (67B)
│   │     → Scales a value based on the display scale factor at `this + 0x15d4`.
│   ├── calc_icon_spacing [UI] (264B)
│   │     → Calculates spacing for drawing a row of icons evenly distributed across a width.
│   ├── draw_unit [UI] (2803B)
│   │     → Draws a complete unit sprite at the given coordinates.
│   │   ├── rect_get_width [UI] (27B) (see above)
│   │   ├── rect_get_height [UI] (28B) (see above)
│   │   ├── set_rect_wh [UI] (48B) (see above)
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── fill_surface_from_rect [UI] (71B) (see above)
│   │   ├── get_civ_background_color [UI] (92B)
│   │   │     → Returns the background color for a civilization based on its leader index.
│   │   ├── scale_sprite [UI] (35B) (see above)
│   │   ├── set_sprite_scale [UI] (33B) (see above)
│   │   ├── reset_sprite_scale [UI] (28B) (see above)
│   │   ├── set_unit_font_for_zoom [UI] (99B)  *** STATE MUTATION ***
│   │   │     → Sets the unit display font size based on zoom level.
│   │   │   ├── set_editor_font [UI] (93B) (see above)
│   │   │   └── scale_sprite [UI] (35B) (see above)
│   │   ├── select_display_unit [UI] (396B)
│   │   │     → Selects which unit to display from a tile's unit stack.
│   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   └── get_fortress_owner_at [GL] (77B)
│   │   │       ├── get_tile_owner [GL] (100B) (see above)
│   │   │       └── get_tile_improvements [GL] (39B) (see above)
│   │   ├── get_civ_dark_color [UI] (92B)
│   │   │     → Returns the dark color for a civ based on its government type and race.
│   │   ├── get_unit_max_hp [GL] (45B) (see above)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1.
│   │   │   ├── get_tile_owner [GL] (100B) (see above)
│   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   ├── get_tile_improvements [GL] (39B) (see above)
│   │   ├── port_copy_rect [UI] (282B)
│   │   │     → Replaces all pixels of color param_2 with param_3 within the given rectangle.
│   │   │   ├── rect_get_width [UI] (27B) (see above)
│   │   │   ├── rect_get_height [UI] (28B) (see above)
│   │   │   ├── port_lock [UI] (287B) (see above)
│   │   │   ├── port_unlock [UI] (83B) (see above)
│   │   │   ├── port_get_pixel_ptr [UI] (45B) (see above)
│   │   │   ├── surface_is_locked [UI] (44B) (see above)
│   │   │   └── pixel_ptr_next_row [UI] (33B) (see above)
│   │   ├── port_fill_rect_pattern [UI] (201B) (see above)
│   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │         → Calls FUN_005d10cd with transparency=0xFF and extra param.
│   │       └── dispatch_oleitem_dimmed [UI] (677B)
│   │           ├── rect_get_width [UI] (27B) (see above)
│   │           ├── rect_get_height [UI] (28B) (see above)
│   │           ├── unknown (get panel icon width) [UI] (37B) (see above)
│   │           ├── unknown (get panel icon height) [UI] (37B) (see above)
│   │           ├── init_editor_scrollbar [UI] (34B) (see above)
│   │           ├── widget_get_height [UI] (34B) (see above)
│   │           ├── get_surface_buffer_handle [UI] (28B) (see above)
│   │           ├── unknown (get surface base) [UI] (28B)
│   │           ├── scale_coords [UI] (254B)
│   │           ├── check_topdown [UI] (41B) (see above)
│   │           └── pixel_fill [UI] (308B)
│   ├── set_text_style [UI] (68B) (see above)
│   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
├── draw_improvements_list [UI] (1102B)
│     → Draws the city improvements list with building names and wonders.
│   ├── rect_get_width [UI] (27B) (see above)
│   ├── rect_get_height [UI] (28B) (see above)
│   ├── invalidate_region [UI] (180B) (see above)
│   ├── set_rect_wh [UI] (48B) (see above)
│   ├── text_begin [UI] (29B) (see above)
│   ├── text_add_label_id [UI] (33B) (see above)
│   ├── scrollbar_set_position [UI] (52B) (see above)
│   ├── scrollbar_set_range [UI] (47B) (see above)
│   ├── display_improvement [UI] (33B) (see above)
│   ├── draw_text_at [UI] (42B) (see above)
│   ├── draw_text_centered [UI] (46B) (see above)
│   ├── has_building [GL] (122B) (see above)
│   ├── close_dialog [UI] (94B) (see above)
│   ├── set_sprite_scale [UI] (33B) (see above)
│   ├── reset_sprite_scale [UI] (28B) (see above)
│   ├── citywin_prepare_panel [UI] (77B) (see above)
│   ├── invalidate_rect_region [UI] (78B) (see above)
│   ├── scale_universal [UI] (67B) (see above)
│   ├── set_text_style [UI] (68B) (see above)
│   ├── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│   └── set_scrollbar [UI] (64B) (see above)
├── enqueue_mp_event [MIXED] (398B)
│     → Enqueues a multiplayer event message.
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   └── _strcpy_thunk [FW] (7B) (see above)
├── spaceship_ai_evaluate [AI] (1064B)
│     → AI evaluation of which spaceship category to build next.
│   ├── has_spaceship_launched [GL] (47B) (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── spaceship_get_category_count [GL] (140B) (see above)
│   ├── spaceship_get_raw_count [GL] (202B) (see above)
│   ├── spaceship_get_clamped_category [GL] (140B) (see above)
│   ├── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION *** (see above)
│   ├── unknown (spaceship section complete check) [GL] (66B) (see above)
│   └── spaceship_can_build_category [GL] (132B) (see above)
├── spaceship_human_build [GL] (2111B)  *** STATE MUTATION ***
│     → Handles building a spaceship component for a human or AI player.
│   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION ***
│   │     → Sets a numeric control value in the multiplayer dialog number table.
│   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   ├── set_improvement_name_string [UI] (41B) (see above)
│   ├── has_spaceship_launched [GL] (47B) (see above)
│   ├── has_spaceship_built [GL] (47B) (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION *** (see above)
│   └── spaceship_launch (internal — called after all checks pass) [GL] (815B)  *** STATE MUTATION ***
│         → Launches a civ's spaceship.
│       ├── show_message [UI] (46B) (see above)
│       ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│       ├── unknown (dialog show single param) [UI] (33B) (see above)
│       ├── change_city_production [MIXED] (2572B)  *** STATE MUTATION *** (see above)
│       ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION ***
│       │     → Sets specified treaty flag bits between two civilizations.
│       │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│       │   └── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│       ├── get_civ_people_name [GL] (145B) (see above)
│       ├── has_spaceship_launched [GL] (47B) (see above)
│       ├── show_wonder_or_advance [UI] (268B)
│       │     → Shows either a wonder movie (negative param) or advance animation (positive param).
│       │   ├── wonder_win_init [UI] (677B)  *** STATE MUTATION ***
│       │   │   ├── init_sprite_surface_mgr [UI] (133B) (see above)
│       │   │   ├── init_render_surface [UI] (274B)
│       │   │   ├── unknown (pedia object initializer) [UI] (34B)
│       │   │   ├── port_alloc_rect [UI] (58B) (see above)
│       │   │   ├── port_set_color [UI] (43B) (see above)
│       │   │   └── palette_init [UI] (145B) (see above)
│       │   ├── wonder_win_create [UI] (524B)
│       │   │   ├── set_window_style_flags [UI] (43B)
│       │   │   │   └── load_and_store_cursor [UI] (136B)
│       │   │   ├── pedia_set_resource [UI] (67B)
│       │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│       │   │   ├── wonder_win_create_dialog [UI] (322B)
│       │   │   │   ├── flush_display [UI] (21B) (see above)
│       │   │   │   ├── update_palette [UI] (43B)
│       │   │   │   │     (1 more reachable)
│       │   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B) (see above)
│       │   │   │   ├── create_offscreen_surface_b [UI] (119B) (see above)
│       │   │   │   ├── load_gif_resource [UI] (847B) (see above)
│       │   │   │   └── surface_init_8 [UI] (96B)
│       │   │   │         (6 more reachable)
│       │   │   ├── build_wonder_info_text [UI] (1366B)
│       │   │   │   ├── flush_display [UI] (21B) (see above)
│       │   │   │   └── spaceship_get_max_component [GL] (264B) (see above)
│       │   │   ├── wonder_win_draw_buttons [UI] (826B)
│       │   │   │   ├── text_begin [UI] (29B) (see above)
│       │   │   │   ├── text_add_string [UI] (33B) (see above)
│       │   │   │   ├── FUN_004D56FD [??]
│       │   │   │   ├── load_gif_resource [UI] (847B) (see above)
│       │   │   │   ├── port_measure_text [UI] (219B)
│       │   │   │   │     (1 more reachable)
│       │   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│       │   │   │   └── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
│       │   │   ├── wonder_win_setup_hotspots [UI] (184B)
│       │   │   │   └── create_button_hotspot [UI] (54B)
│       │   │   └── spaceship_recalc_stats [GL] (1297B)  *** STATE MUTATION *** (see above)
│       │   ├── show_advance_animation [UI] (1232B)  *** STATE MUTATION ***
│       │   │   ├── manage_window_show [UI] (37B)
│       │   │   │   └── FUN_0000C40A [??]
│       │   │   ├── start_cursor_blink [UI] (39B)
│       │   │   │   ├── get_view_window_handle [UI] (28B) (see above)
│       │   │   │   └── capture_mouse [UI] (29B)
│       │   │   ├── stop_cursor_blink [UI] (39B)
│       │   │   │   ├── get_view_window_handle [UI] (28B) (see above)
│       │   │   │   └── release_mouse_capture [UI] (22B)
│       │   │   ├── init_palette_system [UI] (21B) (see above)
│       │   │   ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│       │   │   ├── unknown (manage pedia window) [UI] (37B) (see above)
│       │   │   ├── load_civ_power_values [GL] (90B)  *** STATE MUTATION ***
│       │   │   ├── wonder_win_draw_title [UI] (216B)
│       │   │   │   ├── flush_display [UI] (21B) (see above)
│       │   │   │   ├── text_begin [UI] (29B) (see above)
│       │   │   │   ├── text_add_string [UI] (33B) (see above)
│       │   │   │   ├── text_newline [UI] (29B) (see above)
│       │   │   │   ├── get_civ_name [UI] (28B) (see above)
│       │   │   │   ├── get_civ_noun_name [GL] (145B) (see above)
│       │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│       │   │   │   ├── port_measure_text [UI] (219B) (see above)
│       │   │   │   └── unknown (set/get draw color) [UI] (38B) (see above)
│       │   │   ├── build_advance_scene [UI] (12822B)
│       │   │   │   ├── flush_display [UI] (21B) (see above)
│       │   │   │   ├── wonder_win_draw_title [UI] (216B) (see above)
│       │   │   │   ├── spaceship_get_clamped_count [GL] (89B) (see above)
│       │   │   │   ├── load_gif_resource [UI] (847B) (see above)
│       │   │   │   ├── port_set_color [UI] (43B) (see above)
│       │   │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
│       │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│       │   │   ├── wonder_win_show_starfield [UI] (1046B)
│       │   │   │   ├── invalidate_region [UI] (180B) (see above)
│       │   │   │   ├── advance_year_display [UI] (479B) (see above)
│       │   │   │   ├── wonder_win_draw_next_char [UI] (986B)
│       │   │   │   │     (60 more reachable)
│       │   │   │   ├── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│       │   │   │   ├── port_fill_rect [UI] (236B) (see above)
│       │   │   │   ├── port_draw_text_at [UI] (104B)
│       │   │   │   │     (5 more reachable)
│       │   │   │   ├── port_measure_text [UI] (219B) (see above)
│       │   │   │   ├── unknown (set/get draw color) [UI] (38B) (see above)
│       │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│       │   │   ├── play_wonder_video [UI] (769B)
│       │   │   │   ├── set_callback_paint [UI] (45B) (see above)
│       │   │   │   ├── end_paint [UI] (32B) (see above)
│       │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│       │   │   │   ├── start_cursor_blink [UI] (39B) (see above)
│       │   │   │   ├── stop_cursor_blink [UI] (39B) (see above)
│       │   │   │   ├── init_palette_system [UI] (21B) (see above)
│       │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│       │   │   │   ├── unknown (manage pedia window) [UI] (37B) (see above)
│       │   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B) (see above)
│       │   │   │   ├── unknown (stop music) [UI] (31B) (see above)
│       │   │   │   ├── resume_music [UI] (85B) (see above)
│       │   │   │   ├── port_set_color [UI] (43B) (see above)
│       │   │   │   └── modal_dialog_run [UI] (283B) (see above)
│       │   │   ├── wonder_win_setup_hotspots [UI] (184B) (see above)
│       │   │   ├── wonder_win_draw_initial_buttons [UI] (128B)
│       │   │   │   ├── wonder_win_draw_button_left [UI] (300B)
│       │   │   │   │     (10 more reachable)
│       │   │   │   ├── wonder_win_draw_button_right [UI] (286B)
│       │   │   │   │     (10 more reachable)
│       │   │   │   └── port_fill_rect [UI] (236B) (see above)
│       │   │   ├── wonder_win_draw_button_left [UI] (300B)
│       │   │   │   ├── invalidate_region [UI] (180B) (see above)
│       │   │   │   ├── init_palette_system [UI] (21B) (see above)
│       │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│       │   │   ├── wonder_win_draw_button_right [UI] (286B)
│       │   │   │   ├── invalidate_region [UI] (180B) (see above)
│       │   │   │   ├── init_palette_system [UI] (21B) (see above)
│       │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│       │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] (815B)  *** STATE MUTATION *** (see above)
│       │   │   ├── load_gif_resource [UI] (847B) (see above)
│       │   │   ├── modal_dialog_run [UI] (283B) (see above)
│       │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B) (see above)
│       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B) (see above)
│       │   └── show_wonder_movie [UI] (154B)
│       │       ├── manage_window_show [UI] (37B) (see above)
│       │       ├── init_palette_system [UI] (21B) (see above)
│       │       ├── unknown (pedia set and display resource) [UI] (45B) (see above)
│       │       ├── unknown (manage pedia window) [UI] (37B) (see above)
│       │       ├── show_advance_animation [UI] (1232B)  *** STATE MUTATION *** (see above)
│       │       └── play_wonder_video [UI] (769B) (see above)
│       └── enqueue_mp_event [MIXED] (398B) (see above)
├── spaceship_check_complete_section [GL] (324B)
│     → Checks if a spaceship section is complete.
├── spaceship_ai_should_start [AI] (583B)
│     → Determines if an AI civ should start building spaceship parts.
│   ├── has_spaceship_launched [GL] (47B) (see above)
│   ├── civ_has_tech [GL] (181B) (see above)
│   ├── spaceship_is_enabled [GL] (90B) (see above)
│   └── clamp [FW] (57B)
│         → Clamps a value to [min, max] range.
├── clamp [FW] (57B)
│     → Clamps a value to [min, max] range.
├── create_unit [GL] (1675B)  *** STATE MUTATION ***
│     → Creates a new unit of the specified type for a given civilization at a map position.
│   ├── show_dialog_message [UI] (43B) (see above)
│   ├── get_tick_count_wrapper [FW] (21B) (see above)
│   ├── unknown (get mp object byte) [FW] (31B) (see above)
│   ├── process_unit_move_visibility [GL] (4250B)  *** STATE MUTATION ***
│   │     → Major game logic function that processes visibility updates after a unit moves.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── cancel_goto_if_blocked [GL] (90B)  *** STATE MUTATION ***
│   │   │     → Cancels a unit's goto order if the unit has a goto order (0x0B) and its domain type is not 7 (air).
│   │   ├── cancel_goto_for_stack [GL] (192B)  *** STATE MUTATION ***
│   │   │     → Cancels goto orders for all units in a stack at a given location.
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   └── is_tile_ocean [GL] (57B) (see above)
│   │   ├── city_set_specialist_slot [GL] (126B)  *** STATE MUTATION ***
│   │   │     → Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── find_city_at [GL] (245B) (see above)
│   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   ├── update_map_area_all_players [UI] (136B)
│   │   │     → Updates a map area for all active players (all viewports in MP).
│   │   │   └── update_map_area [UI] (313B)  *** STATE MUTATION *** (see above)
│   │   ├── update_tile_all_players [UI] (124B) (see above)
│   │   ├── update_radius1_all_players [UI] (124B)
│   │   │     → Updates radius-1 area around a tile for all active players.
│   │   │   └── update_map_radius1 [UI] (50B)
│   │   │       └── update_map_area [UI] (313B)  *** STATE MUTATION *** (see above)
│   │   ├── ai_add_goal_a [AI] (958B)  *** STATE MUTATION ***
│   │   │     → Adds a goal to AI goal list A.
│   │   │   ├── ai_shift_goals_down_a [AI] (184B)  *** STATE MUTATION ***
│   │   │   │   └── ai_shift_goals_down_a [AI] (184B)  *** STATE MUTATION *** (see above)
│   │   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   │   ├── get_unit_moves_remaining [GL] (69B) (see above)
│   │   │   ├── is_unit_active [GL] (176B) (see above)
│   │   │   └── get_tile_continent [GL] (39B) (see above)
│   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   ├── process_diplomatic_contact [GL] (7326B)  *** STATE MUTATION ***
│   │   │     → Master diplomatic contact processing function.
│   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   └── FUN_0051D564 [??] (178B) (see above)
│   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   ├── diplo_demand_ally_help [MIXED] (919B)  *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_declare_war [GL] (1125B)  *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_activate_alliance_wars [GL] (910B)  *** STATE MUTATION ***
│   │   │   │   │   │     (30 more reachable)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   └── break_alliance [MIXED] (632B)  *** STATE MUTATION ***
│   │   │   │   │         (100 more reachable)
│   │   │   │   ├── break_alliance [MIXED] (632B)  *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── recall_units_from_territory [GL] (835B)  *** STATE MUTATION ***
│   │   │   │   │   │     (36 more reachable)
│   │   │   │   │   ├── redraw_map_all_players [UI] (124B) (see above)
│   │   │   │   │   └── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   └── get_civ_people_name [GL] (145B) (see above)
│   │   │   ├── ai_diplomacy_negotiate [GL] (16263B)  *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   ├── show_help_topic [UI] (34B) (see above)
│   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   ├── open_intelligence_dialog [UI] (535B) (see above)
│   │   │   │   ├── show_game_popup_3arg [UI] (43B) (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_patience_threshold [GL] (211B)
│   │   │   │   │   └── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   ├── diplo_ai_emissary [MIXED] (880B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_reset_state [GL] (61B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_form_alliance [GL] (374B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   └── intel_play_animation [UI] (181B) (see above)
│   │   │   │   ├── diplo_sign_ceasefire [GL] (315B)  *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── get_attitude_raw [GL] (47B) (see above)
│   │   │   │   │   ├── set_attitude_value [GL] (120B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   └── intel_play_animation [UI] (181B) (see above)
│   │   │   │   ├── diplo_declare_war [GL] (1125B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_gold_to_attitude [GL] (104B)
│   │   │   │   ├── diplo_ai_negotiate [MIXED] (10271B)  *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── text_add_number [UI] (33B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (43B) (see above)
│   │   │   │   │   ├── get_civ_name [UI] (28B) (see above)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   ├── adjust_attitude [GL] (107B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   │   ├── diplo_form_alliance [GL] (374B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_sign_peace_treaty [GL] (253B)  *** STATE MUTATION ***
│   │   │   │   │   │     (272 more reachable)
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_gold_to_attitude [GL] (104B) (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_attitude [GL] (178B) (see above)
│   │   │   │   │   ├── should_declare_war [GL] (191B) (see above)
│   │   │   │   │   ├── break_alliance [MIXED] (632B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── intel_play_animation [UI] (181B) (see above)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B) (see above)
│   │   │   │   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── refresh_status_panel [UI] (297B) (see above)
│   │   │   │   │   └── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_favor_menu [MIXED] (4878B)  *** STATE MUTATION ***
│   │   │   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) (see above)
│   │   │   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │   │   ├── city_set_specialist_slot [GL] (126B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_patience_threshold [GL] (211B) (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── redraw_map_all_players [UI] (124B) (see above)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   │   ├── intel_play_animation [UI] (181B) (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   │   │   │   ├── get_civ_vis_ptr [GL] (48B) (see above)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION *** (see above)
│   │   │   │   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_check_war_weariness [UI] (178B)
│   │   │   │   │   ├── show_message [UI] (46B) (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   │   └── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── diplo_show_main_menu [UI] (747B)
│   │   │   │   │   ├── select_list_item [UI] (38B) (see above)
│   │   │   │   │   ├── dialog_set_title [UI] (41B) (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B) (see above)
│   │   │   │   │   ├── popup_dialog_create [UI] (93B) (see above)
│   │   │   │   │   └── popup_add_radio_option [UI] (566B) (see above)
│   │   │   │   ├── unknown (set trade route value) [GL] (29B)  *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_attitude_raw [GL] (47B) (see above)
│   │   │   │   ├── set_attitude_value [GL] (120B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_attitude [GL] (178B) (see above)
│   │   │   │   ├── should_declare_war [GL] (191B) (see above)
│   │   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── intel_play_animation [UI] (181B) (see above)
│   │   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── ai_calc_tech_value [AI] (2869B) (see above)
│   │   │   │   ├── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── event_check_negotiation [GL] (900B)  *** STATE MUTATION ***
│   │   │   │   │   └── event_dispatch_actions [GL] (360B)  *** STATE MUTATION ***
│   │   │   │   │         (446 more reachable)
│   │   │   │   ├── calc_war_readiness [GL] (820B)  *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   │   │   │   ├── wrap_x [GL] (94B) (see above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   │   │   │   ├── get_unit_owner_at [GL] (66B) (see above)
│   │   │   │   │   └── get_tile_improvements [GL] (39B) (see above)
│   │   │   │   ├── check_can_declare_war [GL] (365B)
│   │   │   │   │   └── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── refresh_status_panel [UI] (297B) (see above)
│   │   │   │   └── rng_range [GL] (113B)  *** STATE MUTATION *** (see above)
│   │   │   ├── clear_treaty_flags [GL] (213B)  *** STATE MUTATION *** (see above)
│   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   ├── should_declare_war [GL] (191B) (see above)
│   │   │   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   │   │   ├── get_civ_noun_name [GL] (145B) (see above)
│   │   │   ├── get_civ_people_name [GL] (145B) (see above)
│   │   │   ├── has_spaceship_launched [GL] (47B) (see above)
│   │   │   ├── parleywin_start_session [MIXED] (807B)  *** STATE MUTATION ***
│   │   │   │   ├── show_window_wrapper [UI] (33B) (see above)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B) (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   ├── play_sound_effect [UI] (601B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── chatwin_get_text_length [UI] (37B)
│   │   │   │   │   └── FUN_00002F47 [??]
│   │   │   │   ├── parleywin_build_title [UI] (324B)
│   │   │   │   │   ├── text_begin [UI] (29B) (see above)
│   │   │   │   │   ├── text_add_string [UI] (33B) (see above)
│   │   │   │   │   ├── text_newline [UI] (29B) (see above)
│   │   │   │   │   ├── text_begin_italic [UI] (29B) (see above)
│   │   │   │   │   ├── text_end_italic [UI] (29B) (see above)
│   │   │   │   │   ├── display_improvement [UI] (33B) (see above)
│   │   │   │   │   ├── calc_attitude [GL] (178B) (see above)
│   │   │   │   │   └── get_civ_people_name [GL] (145B) (see above)
│   │   │   │   ├── parley_set_negotiation_state [UI] (536B)  *** STATE MUTATION ***
│   │   │   │   │   ├── pedia_clear_selection [UI] (47B) (see above)
│   │   │   │   │   ├── pedia_set_selection [UI] (47B) (see above)
│   │   │   │   │   ├── parley_add_dialog_panel [UI] (26152B)
│   │   │   │   │   │     (133 more reachable)
│   │   │   │   │   └── set_active_control [UI] (38B)
│   │   │   │   ├── widget_set_cursor_pos [UI] (43B)
│   │   │   │   │   └── FUN_00002F0D [??]
│   │   │   │   ├── widget_get_text_length [UI] (37B)
│   │   │   │   │   └── unknown (get_text_end_pos) [UI] (76B)
│   │   │   │   │         (3 more reachable)
│   │   │   │   ├── set_active_surface [UI] (74B) (see above)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── set_active_control [UI] (38B)
│   │   │   ├── event_check_negotiation [GL] (900B)  *** STATE MUTATION ***
│   │   │   │   └── event_dispatch_actions [GL] (360B)  *** STATE MUTATION *** (see above)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) (see above)
│   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B) (see above)
│   │   │   │   └── should_declare_war [GL] (191B) (see above)
│   │   │   ├── ai_tech_exchange [GL] (1182B)  *** STATE MUTATION ***
│   │   │   │   ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │   │   ├── civ_has_tech [GL] (181B) (see above)
│   │   │   │   ├── ai_calc_tech_value [AI] (2869B) (see above)
│   │   │   │   └── handle_tech_discovery [GL] (3391B)  *** STATE MUTATION *** (see above)
│   │   │   └── check_join_war [GL] (595B)  *** STATE MUTATION ***
│   │   │       ├── show_message [UI] (46B) (see above)
│   │   │       ├── show_dialog_message [UI] (43B) (see above)
│   │   │       ├── set_treaty_flags [GL] (223B)  *** STATE MUTATION *** (see above)
│   │   │       └── get_civ_people_name [GL] (145B) (see above)
│   │   ├── wrap_x [GL] (94B) (see above)
│   │   ├── find_unit_stack_at_xy [GL] (231B) (see above)
│   │   ├── set_stack_seen_by [GL] (92B)  *** STATE MUTATION ***
│   │   │     → Sets visibility for all units in a stack to be seen by a specific civ.
│   │   │   ├── get_next_unit_in_stack [GL] (65B) (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (118B) (see above)
│   │   │   └── set_unit_seen_by [GL] (96B)  *** STATE MUTATION ***
│   │   ├── sum_stack_property [GL] (724B) (see above)
│   │   ├── get_tile_ptr [GL] (90B) (see above)
│   │   ├── get_civ_vis_ptr [GL] (48B) (see above)
│   │   ├── is_tile_ocean [GL] (57B) (see above)
│   │   ├── get_tile_explored [GL] (71B) (see above)
│   │   ├── get_city_owner_at [GL] (111B) (see above)
│   │   ├── get_tile_controller [GL] (72B) (see above)
│   │   ├── set_tile_visibility_bits [GL] (330B)  *** STATE MUTATION *** (see above)
│   │   ├── set_civ_tile_data [GL] (325B)  *** STATE MUTATION *** (see above)
│   │   ├── begin_map_batch [GL] (86B)  *** STATE MUTATION *** (see above)
│   │   └── end_map_batch [GL] (194B)  *** STATE MUTATION *** (see above)
│   ├── find_nearest_city [GL] (400B)
│   │     → Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status.
│   │   ├── is_tile_valid [GL] (80B) (see above)
│   │   ├── has_building [GL] (122B) (see above)
│   │   ├── calc_movement_cost [GL] (94B) (see above)
│   │   └── get_tile_continent_if_land [GL] (72B) (see above)
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   ├── unknown (tutorial_show_advice) [UI] (38B)
│   │     → Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│   │   └── show_unit_type_picker [UI] (260B)
│   │         → Shows a unit type picker dialog for the Civilopedia.
│   │       ├── select_list_item [UI] (38B) (see above)
│   │       ├── popup_dialog_create [UI] (93B) (see above)
│   │       ├── popup_add_button [UI] (360B) (see above)
│   │       └── sprite_init_empty [UI] (140B)
│   │           ├── port_alloc_rect [UI] (58B) (see above)
│   │           ├── port_set_color [UI] (43B) (see above)
│   │           └── unknown (sprite extract with rect params) [UI] (88B)
│   │               ├── sprite_lock_data [UI] (56B) (see above)
│   │               └── sprite_extract_from_oleitem [UI] (1951B) (see above)
│   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   ├── calc_unit_movement_points [GL] (516B) (see above)
│   └── put_down_unit [GL] (640B)  *** STATE MUTATION *** (see above)
├── delete_unit [GL] (1129B)  *** STATE MUTATION ***
│     → Deletes a unit.
│   ├── FUN_0000C494 [??] (see above)
│   ├── FUN_0000C679 [??] (see above)
│   ├── show_dialog_message [UI] (43B) (see above)
│   ├── get_tick_count_wrapper [FW] (21B) (see above)
│   ├── unknown (get mp object byte) [FW] (31B) (see above)
│   ├── net_send_message [GL] (6649B)  *** STATE MUTATION *** (see above)
│   ├── network_poll [MIXED] (14034B)  *** STATE MUTATION *** (see above)
│   ├── diff_engine_scan_and_send [GL] (1883B)  *** STATE MUTATION *** (see above)
│   └── pick_up_unit_005b319e [GL] (705B)  *** STATE MUTATION *** (see above)
├── find_nearest_unit [GL] (233B)  *** STATE MUTATION ***
│     → Finds the nearest unit to a position, optionally filtered by owner civ.
│   └── calc_movement_cost [GL] (94B) (see above)
├── get_tile_continent [GL] (39B)
│     → Returns byte 3 of tile data (continent/landmass ID).
│   └── get_tile_ptr [GL] (90B) (see above)
└── get_unit_owner_at [GL] (66B)
      → Returns the civ with units at a tile, or -1.
    ├── get_tile_owner [GL] (100B) (see above)
    └── get_tile_improvements [GL] (39B) (see above)
```

---

## All State-Mutating Functions (Flat List)

Total: 206 unique state-mutating functions reachable from turn pipeline entry points.

| Address | Name | Category | Size | Mutation Summary |
|---------|------|----------|------|------------------|
| `00406B4C` | minimap_calc_viewport | UI | 620B | Writes to DAT_0063c8XX and DAT_0066caXX ranges.
- DAT_0063c804: minimap tile height (zoom factor)... |
| `0040C480` | taxrate_recalc_totals | MIXED | 848B | - DAT_0064c6b3[civ * 0x594] and DAT_0064c6b4[civ * 0x594]: temporarily modified during calculatio... |
| `0040CD64` | open_tax_rate_dialog | MIXED | 4140B | - DAT_0063cbb4: dialog state pointer (0x0063 range)
- DAT_0063cbb0: dialog active flag
- DAT_0062... |
| `0040DDC6` | show_tax_rate_dialog | MIXED | 226B | Via sub-call to open_tax_rate_dialog (see FUN_0040cd64). |
| `004105F8` | scroll_all_views_if_needed | UI | 261B | DAT_006ad908 written (0x006A range — map/BFS scratch area) |
| `00421D60` | mp_set_string_control | UI | 46B | Writes to DAT_0063cc48 range (0x0063XXXX — trade route/supply tables) |
| `00421DA0` | mp_set_number_control | UI | 29B | Writes to DAT_0063cc30 range (0x0063XXXX — trade route/supply tables) |
| `0042738C` | cancel_goto_if_blocked | GL | 90B | Writes to DAT_006560ff at 0x0065XXXX (unit data):
- (&DAT_006560ff)[param_1 * 0x20] = 0xff |
| `004273E6` | cancel_goto_for_stack | GL | 192B | Writes to unit order bytes at 0x0065XXXX:
- (&DAT_006560ff)[param_1 * 0x20] = 0xff for matching u... |
| `004274A6` | process_unit_move_visibility | GL | 4250B | Extensive writes to game state:
- DAT_006560f9 (unit visibility bits at 0x0065XXXX)
- DAT_006560f... |
| `0043CC00` | city_set_specialist_slot | GL | 126B | DAT_0064f34c[param_1 * 0x58] \|= (1 << param_2) — city specialist bitfield (0x0064 range); DAT_006... |
| `0043D289` | set_building | GL | 186B | DAT_0064f374[param_1 * 0x58 + offset] — city building data (0x0064 range) |
| `0043D400` | calc_city_trade_desirability | GL | 8227B | DAT_0064f37b-DAT_0064f37f[param_1 * 0x58 + ...] — city trade commodity assignments (0x0064 range,... |
| `0043F7A7` | city_update_tile_workers | GL | 265B | Map tile data via thunk_FUN_005b98b7 and thunk_FUN_005b9c49 (map tile data, 0x006A range via indi... |
| `00440325` | remove_trade_route | GL | 199B | Writes to DAT_0064f37a (city trade route count, 0x0064XXXX), DAT_0064f384 (trade route partner ID... |
| `00441B11` | change_city_production | MIXED | 2572B | Writes DAT_0064c7f4 (per-civ building production counts, 0x0064XXXX), DAT_0064f379 (city producti... |
| `00442541` | reassign_all_city_production | GL | 254B | Indirect via change_city_production calls |
| `0044CC80` | show_throne_room | MIXED | 247B | Via FUN_0044d296: writes to DAT_0064ca93 (throne room piece levels, 0x0064XXXX) and DAT_0064ca9b ... |
| `0044D296` | throne_room_add_improvement | MIXED | 1799B | Writes DAT_0064ca93[civId*0x594 + category] (throne room piece level, 0x0064XXXX) and DAT_0064ca9... |
| `00456F20` | adjust_attitude | GL | 107B | **DAT_0064b114** (diplomacy attitude, 0x0064XXXX range — per-civ data) |
| `0045705E` | ai_evaluate_diplomacy | AI | 6616B | Writes to many DAT_0064b0XX diplomacy evaluation globals AND DAT_0064c6c0 (per-civ treaty flags O... |
| `00458AB1` | diplo_show_greeting | MIXED | 804B | **DAT_0064c6c0** write: `*(DAT_0064c6c0 + param_2*4 + param_1*0x594) \|= 0x100` (marks nuclear awa... |
| `00458DF9` | diplo_ai_emissary | MIXED | 880B | **DAT_00626a30** (diplomacy session active flag), **DAT_00626a34** (diplomacy result) |
| `0045918E` | diplo_reset_state | GL | 61B | Writes to DAT_00626aXX which are diplomacy UI state — borderline but treated as UI state since th... |
| `0045A535` | diplo_form_alliance | GL | 374B | **DAT_0064c6a0** (status flag 0x100), **DAT_0064c6bf** (patience reset), **DAT_0064ca82** (allian... |
| `0045A6AB` | diplo_sign_peace_treaty | GL | 253B | **DAT_0064c6bf**, **DAT_0064ca82**, and attitude clamped via thunk_FUN_00467933 |
| `0045A7A8` | diplo_sign_ceasefire | GL | 315B | **DAT_0064c6c0** (per-civ treaty flags: flag 0x800 cleared for all civs against param_1), **DAT_0... |
| `0045A8E3` | diplo_activate_alliance_wars | GL | 910B | **DAT_0064c6c0** (sets flags 0x80800 = war+mobilization for allies), **DAT_0064ca82** (war timest... |
| `0045AC71` | diplo_declare_war | GL | 1125B | Multiple writes to **DAT_0064c6XX** per-civ data: treaty flags, betrayal counters, war counters, ... |
| `0045B0D6` | diplo_demand_ally_help | MIXED | 919B | **DAT_0064c6a2** (gold transferred between civs) |
| `0045B4DA` | diplo_ai_negotiate | MIXED | 10271B | Extensive writes to per-civ data (DAT_0064c6XX range): gold transfers, treaty flags, patience cou... |
| `0045DD7F` | diplo_favor_menu | MIXED | 4878B | Multiple game state writes: treaty flags, gold, map visibility, unit visibility flags. |
| `00460129` | ai_diplomacy_negotiate | GL | 16263B | Extensive game state writes:
- DAT_0064c6c0 (treaty flags, 0x0064 range) — sets/clears war, peace... |
| `00467580` | unknown (set trade route value) | GL | 29B | DAT_0063cc30 + param_1*4 (0x0063 range — trade route data) |
| `00467750` | clear_treaty_flags | GL | 213B | DAT_0064c6c0 + civ offsets (0x0064 range — per-civ treaty data) |
| `00467825` | set_treaty_flags | GL | 223B | DAT_0064c6c0 + civ offsets (0x0064 range) |
| `00467933` | set_attitude_value | GL | 120B | DAT_0064c6e0 + civ offsets (0x0064 range — attitude table) |
| `00467BAF` | recall_units_from_territory | GL | 835B | DAT_0064b1b4, DAT_0064b1b0 (viewport position, 0x0064 range), DAT_006560ff (unit order byte, 0x00... |
| `00467EF2` | break_alliance | MIXED | 632B | DAT_0064c6c0 (treaty flags, 0x0064 range — via thunk_FUN_00467750) |
| `0046AF70` | net_send_to_player | GL | 305B | DAT_00628468 (sequence counter in 0x0062 range — not game state but network state) |
| `0046B0A1` | net_broadcast | GL | 124B | DAT_00628468 (network sequence) |
| `0046B14D` | net_send_message | GL | 6649B | - DAT_006c9088, DAT_006c9078, DAT_006c907c (0x006C range — network counters)
- DAT_00654fb0 (0x00... |
| `0046E020` | play_sound_effect | UI | 601B | DAT_0066bfc4, DAT_0066bfc0 (last played sound tracking, 0x0066 range — not game state) |
| `00472D20` | init_unit_move_data | GL | 253B | Writes to DAT_006660f0-DAT_00666108 (0x0066xxxx range — unit type tables area). These are animati... |
| `0047A747` | calc_coast_quadrants | UI | 386B | Writes DAT_0066c720 (0x0066xxxx — rendering scratch data, 4 quadrant flags) |
| `0047CBB4` | update_map_area | UI | 313B | Writes DAT_006ad908 (0x006Axxxx — map tile data range, but this is a rendering lock flag) |
| `0047CD51` | redraw_entire_map | UI | 205B | Writes DAT_006ad908 (rendering lock flag) |
| `0047E94E` | network_poll | MIXED | 14034B | MASSIVE — writes to virtually every game state address across 0x0063-0x006C. Key writes include:
... |
| `004853E7` | calc_power_graph_rankings | GL | 2094B | DAT_00655c38, DAT_00655c22, DAT_00655c2a, DAT_00655c20, DAT_00655c21, DAT_00655af0 (0x0065 range ... |
| `00485C15` | spawn_barbarians | GL | 3297B | DAT_006560f4, DAT_006560f9 (0x0065 range — unit data), plus indirect mutations through thunk_FUN_... |
| `004868FB` | apply_global_warming | GL | 819B | Map tile data (0x006A range via thunk calls) |
| `00486C2E` | update_pollution_counter | GL | 487B | DAT_00655b0e, DAT_00655b0f, DAT_00655b10 (0x0065 range — global game state) |
| `00486E6F` | check_tech_advance | GL | 403B | DAT_0064ca9e (0x0064 range — per-civ tech paradigm level) |
| `00487007` | refresh_map_visibility | GL | 259B | Map visibility data (0x006A range via thunk_FUN_005b94fc) |
| `0048710A` | begin_turn_unit_reset | GL | 615B | DAT_006560f4, DAT_006560f8, DAT_006560fe (0x0065 range — unit data), DAT_0064c6c0 (0x0064 — diplo... |
| `00487371` | process_end_of_turn | GL | 1744B | DAT_00655af8 (turn counter), DAT_00655afa (year), DAT_00655b14, DAT_00655aee, DAT_00655c1e, DAT_0... |
| `00487A41` | process_civ_turn | GL | 3830B | Extensive across 0x0063-0x0065 ranges — per-civ attitude (DAT_0064c6b3/b4), tribute (DAT_0064ca80... |
| `00488A45` | check_trade_route_path | GL | 682B | DAT_0063f660 (0x0063 — trade route distance), DAT_0062d040-0062d048 (pathfinding scratch — 0x0062... |
| `00492D18` | ai_shift_goals_down_a | AI | 184B | DAT_0064cab4/8 (0x0064 — AI goal A table) |
| `0049301B` | ai_add_goal_a | AI | 958B | DAT_0064cab4-9 (0x0064 — AI goal A), DAT_006560ff/00656102/104 (0x0065 — unit orders/goto targets) |
| `004988B8` | mp_encrypt_passwords | FW | 139B | DAT_00654b74 (0x0065 — password buffer, but this is encryption, not game state per se) |
| `00498943` | mp_decrypt_passwords | FW | 144B | DAT_00654b74 (0x0065 — password buffer) |
| `00498E8B` | ai_choose_city_production | AI | 29400B | DAT_0064f344 (0x0064 — city flags, bit 0x10000 for settlers), DAT_006560ff/656102/104 (0x0065 — u... |
| `004A28B0` | calc_civ_score | GL | 1542B | All DAT_00673fXX addresses are in 0x0067 range — score tracking globals (not in documented game s... |
| `004A74BC` | reset_spaceship | GL | 187B | DAT_0064caa0-DAT_0064cab4 + param_1*0x594 (0x0064 range — per-civ spaceship data) |
| `004ABFE5` | find_path | GL | 4118B | - DAT_006ced60 (0x006C range — BFS scratch buffer, 0x2400 bytes)
- DAT_00673fc0-DAT_00673fbc (0x0... |
| `004AD076` | set_path_cost | GL | 91B | BFS grid in 0x006C range (pathfinding scratch buffer) |
| `004B0A41` | diff_engine_copy_sections | GL | 143B | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine scan pointers in 0x0067 range. |
| `004B0AD0` | diff_engine_invert_mirror | GL | 131B | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine state in 0x0067 range. |
| `004B0B53` | diff_engine_scan_and_send | GL | 1883B | Writes to DAT_0067a series (diff engine metadata, 0x0067xxxx range) and DAT_00655afe/00655b00 etc... |
| `004B153C` | diff_engine_serialize_game | GL | 835B | Writes checksum values in DAT_0067a434/4c4/464/44c/4f4/524/644 (all 0x0067 range diff engine meta... |
| `004B18E1` | diff_engine_serialize_partial | GL | 308B | DAT_0067a434, DAT_0067a53c — checksum values in 0x0067 range. |
| `004B1A15` | diff_engine_serialize_full_compressed | GL | 508B | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B1C11` | diff_engine_serialize_changed_only | GL | 466B | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B7EB6` | parleywin_start_session | MIXED | 807B | DAT_006ad6a0, DAT_006ad69c (chat message counters at 0x006Axxxx), DAT_0067a9b0, DAT_0067a994 (neg... |
| `004B8676` | parley_set_negotiation_state | UI | 536B | DAT_0067a994/998/99c/9a0/9a4 — negotiation state at 0x0067xxxx. |
| `004BE6BA` | upgrade_units_for_tech | GL | 970B | DAT_006560f6[unit_index * 0x20] (unit type ID at 0x0065xxxx), DAT_006560f4[unit_index * 0x20] (un... |
| `004BEA84` | handle_tech_government_effects | GL | 973B | Indirectly triggers thunk_FUN_0055c066 (revolution) which modifies DAT_0064c6b5 (government type ... |
| `004BF05B` | handle_tech_discovery | GL | 3391B | Extensive writes to game state in 0x0064-0x0065 range:
- DAT_0064c6f8[civ*0x594 + byte] \|= bit (t... |
| `004C195E` | choose_research_tech | MIXED | 2078B | **DAT_0064c6aa** + param_1*0x594 (sets the chosen research tech as a short) |
| `004C21AD` | unknown (choose research wrapper) | GL | 40B | Delegates to FUN_004c195e which writes DAT_0064c6aa. |
| `004C21D5` | complete_research | MIXED | 1422B | **DAT_0064c6a8** (research beakers reset), **DAT_0064c6aa** (research target cleared), calls thun... |
| `004C2B73` | add_research_beakers | GL | 458B | **DAT_0064c6a8** + param_1*0x594 (research beakers incremented by param_2) |
| `004C4210` | set_paradrop_range | GL | 31B | **DAT_0063cc30** + param_1*4 = (uint)param_2 |
| `004C5FAE` | spy_diplomat_action | GL | 1271B | **DAT_006560f8** (movement used), **DAT_006560f4** (flags), unit potentially killed (thunk_FUN_00... |
| `004D01AE` | load_civ_power_values | GL | 90B | DAT_006a5b10 (0x006A range — map/game state area) — writes 6 int values from per-civ data at DAT_... |
| `004D0517` | wonder_win_init | UI | 677B | DAT_0062e2d0 — sets global wonder window pointer (UI state, not game state) |
| `004D08B0` | wonder_win_destructor | UI | 422B | DAT_0062e2d0 = 0 (UI state) |
| `004D0EA6` | show_advance_animation | UI | 1232B | DAT_006a5b08 — stores current time (0x006A range, map data area) |
| `004DB690` | parley_build_packet | GL | 990B | DAT_0068abd0, DAT_0068abd4 (0x0068 range — diplomacy scratch data) |
| `004DBEE6` | parley_build_description | UI | 2892B | DAT_006a5b58 (0x006A range — text buffer) |
| `004DCAFA` | parley_describe_techs | UI | 274B | DAT_006a5b58 (0x006A range) |
| `004DCC0C` | parley_describe_gold | UI | 119B | DAT_006a5b58 (0x006A range) |
| `004DCC83` | parley_describe_units | UI | 546B | DAT_006a5b58 (0x006A range) |
| `004DCEA5` | parley_describe_cities | UI | 369B | DAT_006a5b58 (0x006A range) |
| `004DD016` | parley_describe_attitude | UI | 347B | DAT_006a5b58 (0x006A range) |
| `004DD176` | parley_describe_maps | UI | 271B | DAT_006a5b58 (0x006A range) |
| `004DEF54` | parley_describe_treaty | UI | 417B | DAT_006a5b58 (0x006A range — text buffer) |
| `004E1763` | kill_or_retire_civ | GL | 2918B | Extensive writes across 0x0064 (per-civ data), 0x0065 (unit/city data, game flags), 0x0066 (playe... |
| `004E7270` | acquire_wonder | GL | 488B | DAT_006ad8e8 (busy flag), DAT_00655be6 (wonder ownership), DAT_0064f344 (city flags), DAT_0064f35... |
| `004E7492` | init_city_production_globals | GL | 77B | DAT_006a65a4, DAT_006a6528 (0x006A range — production calculation globals) |
| `004E7549` | set_worker_tile_status | GL | 93B | DAT_0064f356 + param_1 * 0x58 (0x0064 range — city data) |
| `004E7641` | evaluate_city_tiles | GL | 653B | DAT_006a6530 (0x006A range — tile evaluation array), DAT_00655b10 (incremented for pollution trac... |
| `004E790C` | set_tile_worked | GL | 91B | DAT_0064f370 + param_1 * 0x58 (0x0064 range — city worked tiles) |
| `004E7967` | calc_capital_distance_and_corruption | GL | 1048B | DAT_006a6588, DAT_006a6600, DAT_006a6574, DAT_006a6530 (0x006A range — city calc globals) |
| `004E7D7F` | check_unit_support | GL | 281B | DAT_006a660c (unit counter), DAT_006a6568 (support cost counter) — 0x006A range |
| `004E7EB1` | calc_food_box_size | GL | 512B | DAT_006a6608, DAT_006a6560 (0x006A range — food box globals) |
| `004E80B1` | calc_shields_per_row | GL | 1497B | Multiple DAT_006a6xxx globals (0x006A range — production calculation state), DAT_006560f4 (0x0065... |
| `004E868F` | calc_tile_resource | GL | 1528B | DAT_006a65d4, DAT_0062ee0c, DAT_006a65e0, DAT_006a65e8 (auto-improvement triggers), DAT_0064ca76-... |
| `004E8C8C` | check_auto_irrigation_trigger | GL | 297B | DAT_006a65d4 (counter), DAT_0062ee0c (flag), DAT_006a65e0, DAT_006a65e8 (target tile coords) — 0x... |
| `004E8DB5` | check_road_trade_trigger | GL | 152B | DAT_0062ee0c, DAT_006a65e0, DAT_006a65e8 — auto-improvement trigger flags |
| `004E8E4D` | calc_tile_all_resources | GL | 130B | DAT_0062edf4, DAT_006a65b8 (per-tile yields), DAT_006a65c8 (accumulated totals) — 0x006A range |
| `004E8ECF` | clear_and_check_worked_tiles | GL | 115B | DAT_0064f370 (via set_tile_worked) — 0x0064 range |
| `004E8F42` | assign_worker_tiles | GL | 2002B | DAT_006a65dc, DAT_006a654c (specialist counts), DAT_006a65c8 (accumulated yields), DAT_0064f344 (... |
| `004E97AE` | sync_worker_tile_status | GL | 155B | DAT_0064f356 (0x0064 range — worker tile status) |
| `004E989A` | calc_corruption | GL | 890B | DAT_0064ca74-0064ca7a (0x0064 range — per-civ corruption statistics, only when DAT_0062edf8 flag ... |
| `004E9C14` | calc_city_production | GL | 1053B | Multiple DAT_006a6xxx globals (0x006A range — production calculation state) |
| `004EA031` | adjust_happy_unhappy | GL | 453B | DAT_006a659c, DAT_006a65a8, DAT_006a6550, DAT_006a6620-006a6628 (0x006A range — happiness calcula... |
| `004EA1F6` | distribute_trade | GL | 1769B | DAT_006a65fc (luxury), DAT_006a6578 (tax), DAT_006a6554 (science), DAT_006a6618 (trade route bonu... |
| `004EA8E4` | calc_happiness | GL | 2627B | Multiple DAT_006a6xxx globals and DAT_0064f35e, DAT_0064f38a-0064f393 (city record fields) |
| `004EB327` | calc_trade_route_income | GL | 378B | DAT_006a65b0, DAT_006a6558, DAT_006a6570, DAT_006a65c8 (0x006A range) |
| `004EB4A1` | recalc_city_all | GL | 76B | All sub-function mutations (see above) |
| `004EB4ED` | calc_city_production (entry point) | GL | 132B | DAT_0062ee08 (stores city index), plus all sub-function mutations |
| `004EB571` | show_city_event_dialog | UI | 628B | DAT_006a65a0 (0x006A range — dialog state) |
| `004EB80A` | show_city_event_dialog_v2 | UI | 915B | DAT_006a65a0 (0x006A range) |
| `004EBBDE` | process_city_food | GL | 1512B | DAT_0064f349 (city size), DAT_0064f35a (food surplus), DAT_0062ee04 — 0x0064 and 0x0062 ranges |
| `004EC1C6` | assign_caravan_commodity | GL | 327B | DAT_006560fd (0x0065 range — unit commodity), DAT_0064f344 (0x0064 range — city flags, sets 0x1000) |
| `004EC312` | handle_espionage_discovery | GL | 236B | DAT_0064c6a0 (civ flags), DAT_0064c6be (defense rating), DAT_0064c6c0 (diplomatic relations) — al... |
| `004EC3FE` | process_city_production | GL | 10931B | Extensive writes across all game state ranges (0x0064, 0x0065, 0x006A) |
| `004EEF23` | process_unit_support_deficit | GL | 1621B | DAT_0064f344 (city flags), DAT_0064ca7e, DAT_0064ca80 (per-civ stats), plus disbanding units modi... |
| `004EF578` | handle_city_disorder_004ef578 | GL | 1614B | DAT_0064f344 (city flags: disorder 0x1, 0x2000, 0x4000, 0x4001, 0x100000), DAT_0064c6a0 (civ flag... |
| `004EFBC6` | process_city_science | GL | 382B | DAT_006a6578 (doubled under conditions) — triggers thunk_FUN_004c2b73 which modifies research pro... |
| `004EFD44` | process_city_pollution_and_meltdown | GL | 940B | Map tile data (pollution flag via thunk_FUN_005b90df) — 0x006A range; city improvements (removes ... |
| `004F0221` | pay_building_upkeep | GL | 406B | Writes DAT_0064c6a2 + civ * 0x594 (civ treasury, 0x0064XXXX range) |
| `004F03B7` | find_city_expansion_site | GL | 1095B | Writes DAT_006a65e0, DAT_006a65e8 (map coordinates, 0x006AXXXX range) |
| `004F080D` | handle_city_expansion | GL | 650B | Writes DAT_0064f344 + city * 0x58 (city flags, 0x0064XXXX), DAT_006a65d4 (expansion priority, 0x0... |
| `004F0A9C` | process_city_turn | GL | 1903B | Extensive writes to 0x0064XXXX (city/civ data), 0x006AXXXX (game state) |
| `004F1220` | handle_space_race_victory | GL | 641B | Writes DAT_0064f34c, DAT_0064f34d (city visibility data, 0x0064XXXX), DAT_006ad699 (0x006AXXXX) |
| `004FA82D` | event_action_flag_no_schism | GL | 39B | DAT_006a9110 (0x006AXXXX game state) |
| `004FA944` | event_action_change_money | GL | 364B | Writes DAT_0064c6a2 + civ * 0x594 (civ treasury, 0x0064XXXX) |
| `004FAAB0` | event_action_show_text | UI | 246B | Writes DAT_0063cc48 (0x0063XXXX, trade/text data area) |
| `004FABA6` | event_action_make_aggression | GL | 348B | Indirect via thunk_FUN_00579c40 which modifies treaty/diplomacy state |
| `004FAD02` | event_action_destroy_civ | GL | 249B | Writes DAT_0064b1ac (game end flag, 0x0064XXXX) |
| `004FADFB` | event_action_give_tech | GL | 217B | Indirect via thunk_FUN_004bf05b which writes to tech tables (0x0065XXXX) |
| `004FAED4` | event_action_create_unit | GL | 941B | Writes DAT_006560f4, DAT_00656100 (unit data, 0x0065XXXX) |
| `004FB29F` | event_action_move_unit | GL | 787B | Writes DAT_006560ff, DAT_006560fc, DAT_00656102, DAT_00656104 (unit data, 0x0065XXXX) |
| `004FB5B2` | event_action_change_terrain | GL | 1114B | Extensive writes to map tile data (0x006AXXXX), city data (0x0064XXXX), unit data (0x0065XXXX), D... |
| `004FBE84` | event_check_negotiation | GL | 900B | Indirect via dispatch_actions |
| `004FC3AE` | event_dispatch_actions | GL | 360B | Indirect via all called action functions |
| `00509590` | handle_city_disorder_00509590 | MIXED | 933B | Writes DAT_00655aee (game flags, 0x0065XXXX), DAT_00655af4 (tutorial flags, 0x0065XXXX) |
| `005520FA` | set_dialog_background | UI | 24B | DAT_0063357c = param_1 (UI state, not game state) |
| `0055BBC0` | calc_war_readiness | GL | 820B | DAT_006ab5e4/e0/e8/ec (war readiness counters), DAT_006560f4 (unit fortification flag bit 0x20 se... |
| `0055C066` | set_government_type | GL | 529B | DAT_0064c6b5, DAT_0064c6c0 (embassy flags), DAT_00655aee, DAT_0064f379 — all game state |
| `0055C3D3` | revolution_dialog | MIXED | 678B | Via thunk_FUN_0055c066 (government change). DAT_00655af4 \|= 0x20 (tutorial flag). |
| `0055C69D` | ai_revolution_notification | GL | 1336B | DAT_0064c6a0, DAT_0064c6b4 — game state |
| `0055D1E2` | ai_tech_exchange | GL | 1182B | Tech data via thunk_FUN_004bf05b, treaty flags (0x40000 tech exchange marker) via thunk_FUN_00467825 |
| `0055D685` | check_join_war | GL | 595B | DAT_0064ca82 (last contact dates), treaty flags via thunk_FUN_00467825 (0x2000 = war declaration) |
| `0055D8D8` | process_diplomatic_contact | GL | 7326B | Extensive treaty/diplomacy state writes across 0x0064/0x0065/0x0063/0x0067 ranges. |
| `0055F5A3` | ai_choose_government | AI | 558B | DAT_0064ca7e/80 (AI preference overrides) — game state |
| `00568CA2` | calc_status_panel_layout | UI | 484B | UI layout globals (0x006A/0x0063 ranges — not game state) |
| `00569801` | draw_status_panel_units | UI | 3672B | DAT_006abc38, DAT_006abc18-24, DAT_00633dfc (UI layout state, not game state) |
| `0056B90B` | set_unit_font_for_zoom | UI | 99B | DAT_00633e3c (cached font size — UI state) |
| `00579C40` | diplomacy_check_treaty_violation | GL | 379B | YES — writes to DAT_0064c6c0 + offsets (0x0064 range, per-civ treaty flags). Sets 0x2000 flag via... |
| `0057F657` | animate_nuke_explosion | UI | 885B | DAT_006ad908 written (animation flag, 0x006A range). |
| `00596EEC` | spaceship_recalc_stats | GL | 1297B | YES — writes to DAT_0064caa0 (spaceship flags, 0x0064), DAT_0064caa2/a4/a6 (arrival/support data)... |
| `005973FD` | spaceship_launch (internal — called after all checks pass) | GL | 815B | YES — writes to DAT_0064caa0 (0x0064, spaceship flags), DAT_00655afc (0x0065, launch turn), DAT_0... |
| `00598197` | spaceship_human_build | GL | 2111B | YES — writes to DAT_0064caa8 (component count incremented, 0x0064), DAT_0064caa0 (alpha program f... |
| `0059A15D` | pedia_load_description | UI | 388B | DAT_00679640 written (0x0067 range — text buffer, not game state per se but in documented range). |
| `0059A733` | rng_next_float | GL | 94B | YES — writes DAT_00635094 (RNG state, 0x0063 range). |
| `0059A791` | rng_range | GL | 113B | YES — indirectly via rng_next_float modifying DAT_00635094. |
| `0059DB65` | popup_dialog_destroy | UI | 1061B | Writes to DAT_00635a9c, DAT_006ad678, DAT_006cec84 (popup stack state, 0x0063/006A/006C ranges — ... |
| `005B2590` | validate_unit_stack | GL | 1050B | - DAT_00656106/00656108 (unit prev/next pointers): may be set to 0xffff to fix broken stacks (0x0... |
| `005B29D7` | get_unit_hp_remaining | GL | 98B | DAT_006560fa[param_1 * 0x20] = 0 when hitpoint flag not set (0x0065XXXX) |
| `005B2F50` | set_unit_goto_order | GL | 66B | DAT_006560ff, DAT_00656102 (0x0065XXXX) |
| `005B319E` | pick_up_unit_005b319e | GL | 705B | - DAT_006560f0/f2: unit position set to negative offscreen coords (0x0065XXXX)
- DAT_00656106/006... |
| `005B345F` | put_down_unit | GL | 640B | - DAT_006560f0/f2: position set (0x0065XXXX)
- DAT_00656106/00656108: linked to existing stack (0... |
| `005B36DF` | relocate_unit | GL | 388B | Via pick_up_unit + put_down_unit (0x0065XXXX, 0x006AXXXX) |
| `005B3863` | relocate_unit_in_place | GL | 60B | Via relocate_unit |
| `005B3AE0` | relocate_all_units | GL | 152B | Via relocate_unit for each unit (0x0065XXXX, 0x006AXXXX) |
| `005B3B78` | eject_air_units | GL | 343B | Via relocate_unit |
| `005B3D06` | create_unit | GL | 1675B | - DAT_00655b16: incremented if new slot needed (0x0065XXXX)
- DAT_0064c706[civ]: military unit co... |
| `005B4391` | delete_unit | GL | 1129B | - DAT_0065610a[unit]: set to 0 (0x0065XXXX)
- DAT_00655b16: decremented (0x0065XXXX)
- DAT_0064c7... |
| `005B47FA` | delete_all_units_in_stack | GL | 144B | Via delete_unit for each |
| `005B490E` | set_unit_seen_by | GL | 96B | DAT_006560f9 (0x0065XXXX) |
| `005B496E` | set_stack_seen_by | GL | 92B | DAT_006560f9 for each unit (0x0065XXXX) |
| `005B4B66` | check_adjacent_enemy_simple | GL | 253B | DAT_006ced4c (0x006CXXXX) |
| `005B4C63` | check_adjacent_enemy_continent | GL | 297B | DAT_006ced4c (0x006CXXXX) |
| `005B542E` | load_unit_onto_ship | GL | 1912B | - DAT_006560f4: flag bits 0x1000 set/cleared (0x0065XXXX)
- DAT_006560ff: orders changed to goto ... |
| `005B5BAB` | stack_unit | GL | 488B | Via load_unit_onto_ship and relocate_unit |
| `005B5D93` | delete_unit_safely | GL | 677B | Via delete_unit, delete_all_units_in_stack, load_unit_onto_ship |
| `005B6042` | delete_unit_visible | GL | 456B | Via delete_unit_safely |
| `005B6787` | refresh_unit_movement | GL | 40B | DAT_006560f8 (0x0065XXXX) |
| `005B67AF` | find_nearest_unit | GL | 233B | DAT_006ced50 (0x006CXXXX — pathfinding scratch) |
| `005B8B1A` | update_civ_visibility | GL | 75B | Civ visibility data at 0x006365c0[civ] (via set_civ_tile_data) |
| `005B90DF` | reveal_tile | GL | 154B | - Tile byte 1: bit 0x80 set (pollution) (0x006AXXXX)
- DAT_00655b12: incremented (0x0065XXXX) |
| `005B9179` | generate_terrain_around | GL | 696B | - Tile bytes 1 (improvements): fortress cleared, roads/irrigation/mining randomly cleared (0x006A... |
| `005B94FC` | set_tile_improvement_bits | GL | 330B | Tile byte 1 (0x006AXXXX via tile pointer) |
| `005B9646` | set_tile_terrain | GL | 295B | Tile byte 0 (0x006AXXXX) |
| `005B976D` | set_tile_visibility_bits | GL | 330B | Tile byte 4 (0x006AXXXX) |
| `005B98B7` | set_tile_fertility | GL | 305B | Tile byte 5 lower nibble (0x006AXXXX) |
| `005B99E8` | set_tile_owner | GL | 333B | Tile byte 5 upper nibble (0x006AXXXX) |
| `005B9C49` | set_tile_city_radius_owner | GL | 312B | Tile byte 2 (0x006AXXXX) |
| `005B9D81` | set_civ_tile_data | GL | 325B | Civ visibility data (0x006365c0 array, points into allocated map memory) |
| `005B9EC6` | begin_map_batch | GL | 86B | DAT_006d1190 batch buffer (0x006DXXXX), DAT_006365f4, DAT_006ad699, DAT_006ad69a |
| `005B9F1C` | end_map_batch | GL | 194B | DAT_006d1190 batch buffer cleared (0x006DXXXX) |
| `005B9FDE` | queue_map_update | GL | 515B | DAT_006d1190 batch buffer (0x006DXXXX) |
