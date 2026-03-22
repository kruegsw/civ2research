# Call Graph: network_poll (Multiplayer Message Dispatcher)

## Entry Point

- **Function**: `network_poll` at `0x0047E94E`
- **Size**: 14034 bytes (14KB)
- **Category**: MIXED
- **Structure**: Monolithic switch statement dispatching 160+ multiplayer message opcodes
- **Note**: Callees reconstructed from pseudocode analysis (function body is inline in binary, call graph has no outgoing edges)

## Stats

- **Direct callees** (from pseudocode): 32
- **Total unique reachable** (depth <= 6): 1412
- **Total unique reachable** (unlimited depth): 1765
- **State-mutating** (depth <= 6): 289
- **State-mutating** (unlimited depth): 345

### By Category (depth <= 6)

| Category | Count |
|----------|-------|
| ? | 72 |
| AI | 19 |
| FW | 313 |
| GL | 291 |
| MIXED | 74 |
| UI | 643 |
| **TOTAL** | **1412** |

### By Category (unlimited depth)

| Category | Count |
|----------|-------|
| ? | 108 |
| AI | 21 |
| FW | 396 |
| GL | 350 |
| MIXED | 78 |
| UI | 812 |
| **TOTAL** | **1765** |

## Call Tree

**Legend**: `[GL]` = Game Logic, `[AI]` = AI, `[MIXED]` = Mixed GL+UI, `[UI]` = UI-only, `[FW]` = Framework/CRT

- FW nodes filtered at depth > 2
- Max display depth: 6
- Subtrees shown only on first occurrence; subsequent refs marked `(subtree shown above)`
- 1-line summary shown at depth <= 3

```
network_poll [MIXED] (0x0047E94E) *** STATE MUTATION ***
  Main multiplayer message dispatcher — 14KB monolithic switch on 160+ opcodes
  (callees reconstructed from pseudocode; function is inline in binary)
├── map_window_click [MIXED] *** STATE MUTATION ***  -- deferred UI: map click
│     Main handler for map click events. Handles city opening, unit movement orders (goto, directional move), and unit sele...
│   ├── is_tile_valid [GL]
│   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── show_city_info_dialog [UI]
│   │     Displays a city information dialog for city index param_1. Shows city name, owner, and up to 3 trade route commodity ...
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_string [UI]
│   │   │     Appends a string to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_label_id [UI]
│   │   │     Appends a localized label (by ID) to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_newline [UI]
│   │   │     Adds a newline to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_begin_italic [UI]
│   │   │     Begins italic text mode in the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_end_italic [UI]
│   │   │     Ends italic text mode in the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── display_improvement [UI]
│   │   │     Adds an improvement/government icon to the text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_number [UI]
│   │   │     Adds a number to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── show_message [UI]
│   │   │     Stores a message string in the message buffer at the specified slot index.
│   │   │   └── (1 FW callees filtered)
│   │   ├── get_civ_name [UI]
│   │   │     Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL]
│   │   │       └── (1 FW callees filtered)
│   │   ├── show_city_popup [UI]
│   │   │     Shows a city information popup using the dialog system.
│   │   │   └── show_city_style_picker [UI]
│   │   │       ├── select_list_item [UI]
│   │   │       │   └── popup_show_modal [UI]
│   │   │       │       └── ... (11 more callees, depth limit)
│   │   │       ├── popup_dialog_create [UI]
│   │   │       │   ├── unknown (popup list init) [UI]
│   │   │       │   ├── popup_dialog_reset [UI]
│   │   │       │   └── (1 FW callees filtered)
│   │   │       ├── popup_add_button [UI]
│   │   │       │   ├── measure_text_height [UI]
│   │   │       │   │   └── ... (1 more callees, depth limit)
│   │   │       │   ├── init_editor_scrollbar [UI]
│   │   │       │   │   └── ... (1 more callees, depth limit)
│   │   │       │   └── (2 FW callees filtered)
│   │   │       ├── sprite_init_empty [UI]
│   │   │       │   ├── port_alloc_rect [UI]
│   │   │       │   │   └── ... (1 more callees, depth limit)
│   │   │       │   ├── port_set_color [UI]
│   │   │       │   │   └── ... (1 more callees, depth limit)
│   │   │       │   ├── unknown (sprite extract with rect params) [UI]
│   │   │       │   │   └── ... (2 more callees, depth limit)
│   │   │       │   └── (3 FW callees filtered)
│   │   │       └── (3 FW callees filtered)
│   │   ├── city_count_content_citizens [GL]
│   │   │     Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── sprite_init_empty [UI]  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── center_all_map_views [UI]
│   │     Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   └── center_map_on_cursor [UI]
│   │         Centers the map view on the current cursor position (DAT_0064b1b4, DAT_0064b1b0) for the current player (DAT_006d1da0).
│   │       └── update_map_area [UI] *** STATE MUTATION ***
│   │           ├── tile_to_screen [UI]
│   │           │   └── wrap_x [GL]
│   │           ├── is_tile_visible [UI]
│   │           │   └── is_tile_in_viewport_rect [UI]
│   │           │       └── ... (1 more callees, depth limit)
│   │           ├── redraw_tile_area [UI]
│   │           │   ├── draw_complete_tile [UI]
│   │           │   │   └── ... (12 more callees, depth limit)
│   │           │   ├── is_tile_visible [UI]  (subtree shown above)
│   │           │   ├── draw_city_labels [UI]
│   │           │   │   └── ... (10 more callees, depth limit)
│   │           │   ├── calc_tile_group_rect [UI]
│   │           │   │   └── ... (3 more callees, depth limit)
│   │           │   ├── wrap_x [GL]
│   │           │   └── port_set_rect [UI]
│   │           ├── invalidate_tile_area [UI]
│   │           │   ├── invalidate_region [UI]
│   │           │   │   └── ... (2 more callees, depth limit)
│   │           │   └── calc_tile_group_rect [UI]  (subtree shown above)
│   │           ├── reset_sprite_scale [UI]
│   │           │   └── scale_table_build_primary [UI]
│   │           ├── set_current_zoom_scale [UI]
│   │           │   └── set_sprite_scale [UI]
│   │           │       └── ... (1 more callees, depth limit)
│   │           └── unknown (sprite blit wrapper 1) [UI]
│   │               └── dispatch_oleitem_normal [UI]
│   │                   └── ... (11 more callees, depth limit)
│   ├── set_map_scroll_position [UI]
│   │     Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   │   ├── redraw_entire_map [UI] *** STATE MUTATION ***
│   │   │     Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │   │   ├── minimap_full_redraw [UI]
│   │   │   │   ├── minimap_calc_viewport [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── minimap_get_tile_color [UI]
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── find_city_at [GL]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   └── get_tile_explored [GL]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── minimap_draw_goto_line [UI]
│   │   │   │   │   ├── minimap_tile_to_screen [UI]
│   │   │   │   │   ├── set_rect_abs [UI]
│   │   │   │   │   └── surface_fill_rect_color [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── end_paint [UI]
│   │   │   │   │   └── invalidate_region [UI]  (subtree shown above)
│   │   │   │   ├── surface_set_clear_color [UI]
│   │   │   │   │   └── unknown (clear_surface_region) [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── fill_rect_palette [UI]
│   │   │   │   │   └── fill_rect_xywh [UI]
│   │   │   │   │       └── ... (2 more callees, depth limit)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── unknown (dialog_render_title_bar) [UI]
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── get_font_height [UI]
│   │   │   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   │   │   ├── reset_sprite_scale [UI]  (subtree shown above)
│   │   │   │   │   ├── get_civ_adjective_name [GL]
│   │   │   │   │   ├── widget_inflate_rect_neg [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── tile_bitmap [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── port_set_rect_from_self [UI]
│   │   │   │   │   ├── port_set_rect [UI]
│   │   │   │   │   ├── port_fill_rect_pattern [UI]
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │   ├── scale_table_build_primary [UI]
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   ├── dialog_create_buttons [UI]
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   ├── save_and_flush [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── pedia_button_ctor [UI]
│   │   │   │   │   ├── pedia_button_create [UI]
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   ├── unknown (set button callback) [UI]
│   │   │   │   │   ├── dialog_destroy_buttons [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── prepare_surface [UI]
│   │   │   │   └── wrap_x [GL]
│   │   │   ├── recalc_viewport_geometry [UI]
│   │   │   │   ├── set_editor_font [UI]
│   │   │   │   │   ├── FUN_00008200 [?]
│   │   │   │   │   ├── FUN_0000847F [?]
│   │   │   │   │   └── delete_font [UI]
│   │   │   │   ├── reset_sprite_scale [UI]  (subtree shown above)
│   │   │   │   ├── scale_at_current_zoom [UI]
│   │   │   │   │   └── scale_sprite [UI]
│   │   │   │   ├── set_current_zoom_scale [UI]  (subtree shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── port_alloc_rect [UI]  (subtree shown above)
│   │   │   │   ├── scale_table_build_primary [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   ├── redraw_full_viewport [UI]
│   │   │   │   ├── draw_complete_tile [UI]  (subtree shown above)
│   │   │   │   ├── draw_city_labels [UI]  (subtree shown above)
│   │   │   │   ├── unknown (clear_surface_region) [UI]  (subtree shown above)
│   │   │   │   └── wrap_x [GL]
│   │   │   ├── begin_end_paint_cycle [UI]
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── end_paint [UI]  (subtree shown above)
│   │   │   │   └── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   ├── unknown (dialog_render_title_bar) [UI]  (subtree shown above)
│   │   │   ├── dialog_create_buttons [UI]  (subtree shown above)
│   │   │   └── (1 FW callees filtered)
│   │   └── wrap_x [GL]
│   │         Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   ├── cancel_unit_blink_timer [UI] *** STATE MUTATION ***
│   │     Cancels the unit blink timer and restores the cursor state. If a blink was active and the cursor was in special mode ...
│   │   ├── set_cursor_icon [UI]
│   │   │     Sets the cursor icon to the specified resource ID on the current view's window handle.
│   │   │   └── load_and_set_cursor [UI]
│   │   │       └── load_and_store_cursor [UI]
│   │   ├── stop_cursor_blink [UI]
│   │   │     Stops the cursor blink animation.
│   │   │   ├── get_view_window_handle [UI]
│   │   │   └── release_mouse_capture [UI]
│   │   └── (1 FW callees filtered)
│   ├── center_and_scroll_to_tile [UI] *** STATE MUTATION ***
│   │     Centers the map on (param_1, param_2) if the tile is valid. Updates the cursor position globals and redraws.
│   │   ├── is_tile_valid [GL]
│   │   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── center_map_on_cursor [UI]  (subtree shown above)
│   │   └── refresh_status_panel [UI]
│   │         Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │       ├── rect_get_width [UI]
│   │       ├── rect_get_height [UI]
│   │       ├── invalidate_region [UI]  (subtree shown above)
│   │       ├── calc_status_panel_layout [UI] *** STATE MUTATION ***
│   │       │   └── (1 FW callees filtered)
│   │       ├── draw_status_panel_units [UI] *** STATE MUTATION ***
│   │       │   ├── rect_get_width [UI]
│   │       │   ├── is_tile_valid [GL]
│   │       │   ├── text_begin [UI]
│   │       │   │   └── (1 FW callees filtered)
│   │       │   ├── text_add_label_id [UI]
│   │       │   │   └── (1 FW callees filtered)
│   │       │   ├── get_font_height [UI]
│   │       │   ├── measure_text_height [UI]  (subtree shown above)
│   │       │   ├── get_civ_name [UI]  (subtree shown above)
│   │       │   ├── set_status_bar_text [UI]
│   │       │   │   └── (1 FW callees filtered)
│   │       │   ├── draw_text_centered [UI]
│   │       │   │   └── draw_text_centered [UI]
│   │       │   │       └── ... (2 more callees, depth limit)
│   │       │   ├── scale_sprite [UI]
│   │       │   ├── draw_status_turn_info [UI]
│   │       │   │   ├── rect_get_width [UI]
│   │       │   │   ├── rect_get_height [UI]
│   │       │   │   ├── flush_display [UI]
│   │       │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │       │   │   ├── text_begin [UI]
│   │       │   │   ├── text_add_label_id [UI]
│   │       │   │   ├── get_font_height [UI]
│   │       │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │       │   │   ├── draw_text_at [UI]
│   │       │   │   │   └── ... (1 more callees, depth limit)
│   │       │   │   ├── tile_bitmap [UI]  (subtree shown above)
│   │       │   │   ├── set_text_draw_target [UI]
│   │       │   │   ├── set_text_draw_source [UI]
│   │       │   │   ├── set_text_style [UI]
│   │       │   │   ├── port_set_rect_from_self [UI]
│   │       │   │   └── port_set_rect [UI]
│   │       │   ├── draw_coordinate_text [UI]
│   │       │   │   ├── text_begin [UI]
│   │       │   │   ├── text_add_label_id [UI]
│   │       │   │   ├── text_newline [UI]
│   │       │   │   ├── text_begin_bold [UI]
│   │       │   │   ├── text_begin_italic [UI]
│   │       │   │   ├── text_end_italic [UI]
│   │       │   │   ├── text_add_number [UI]
│   │       │   │   ├── unknown (string pool append separator) [UI]
│   │       │   │   ├── draw_text_at [UI]  (subtree shown above)
│   │       │   │   └── get_tile_continent [GL]
│   │       │   │       └── ... (1 more callees, depth limit)
│   │       │   ├── format_unit_orders_text [UI]
│   │       │   │   ├── text_add_string [UI]
│   │       │   │   ├── text_add_label_id [UI]
│   │       │   │   ├── text_newline [UI]
│   │       │   │   ├── text_begin_italic [UI]
│   │       │   │   ├── text_end_italic [UI]
│   │       │   │   ├── display_improvement [UI]
│   │       │   │   ├── text_add_number [UI]
│   │       │   │   ├── unknown (string pool append separator) [UI]
│   │       │   │   ├── find_city_at [GL]  (subtree shown above)
│   │       │   │   └── get_tile_improvements [GL]
│   │       │   │       └── ... (1 more callees, depth limit)
│   │       │   ├── draw_status_panel_header [UI]
│   │       │   │   ├── rect_get_width [UI]
│   │       │   │   ├── rect_get_height [UI]
│   │       │   │   ├── flush_display [UI]
│   │       │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │       │   │   ├── text_begin [UI]
│   │       │   │   ├── text_add_label_id [UI]
│   │       │   │   ├── get_font_height [UI]
│   │       │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │       │   │   ├── text_add_number [UI]
│   │       │   │   ├── unknown (string pool set) [UI]
│   │       │   │   │   └── ... (1 more callees, depth limit)
│   │       │   │   ├── draw_text_at [UI]  (subtree shown above)
│   │       │   │   ├── scale_sprite [UI]
│   │       │   │   ├── set_sprite_scale [UI]  (subtree shown above)
│   │       │   │   ├── reset_sprite_scale [UI]  (subtree shown above)
│   │       │   │   ├── prepare_surface [UI]
│   │       │   │   ├── draw_hline [UI]
│   │       │   │   │   └── ... (2 more callees, depth limit)
│   │       │   │   ├── tile_bitmap [UI]  (subtree shown above)
│   │       │   │   ├── set_text_draw_target [UI]
│   │       │   │   ├── set_text_draw_source [UI]
│   │       │   │   ├── set_text_style [UI]
│   │       │   │   ├── port_set_rect_from_self [UI]
│   │       │   │   ├── port_set_rect [UI]
│   │       │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │       │   │   └── (4 FW callees filtered)
│   │       │   ├── select_display_unit [UI]
│   │       │   │   ├── is_tile_valid [GL]
│   │       │   │   ├── get_next_unit_in_stack [GL]
│   │       │   │   │   └── ... (1 more callees, depth limit)
│   │       │   │   ├── get_first_unit_in_stack [GL]
│   │       │   │   │   └── ... (1 more callees, depth limit)
│   │       │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │       │   │   └── get_fortress_owner_at [GL]
│   │       │   │       └── ... (2 more callees, depth limit)
│   │       │   ├── draw_unit [UI]
│   │       │   │   ├── rect_get_width [UI]
│   │       │   │   ├── rect_get_height [UI]
│   │       │   │   ├── set_rect_wh [UI]
│   │       │   │   ├── is_tile_valid [GL]
│   │       │   │   ├── fill_surface_from_rect [UI]
│   │       │   │   │   └── ... (3 more callees, depth limit)
│   │       │   │   ├── get_civ_background_color [UI]
│   │       │   │   ├── scale_sprite [UI]
│   │       │   │   ├── set_sprite_scale [UI]  (subtree shown above)
│   │       │   │   ├── reset_sprite_scale [UI]  (subtree shown above)
│   │       │   │   ├── set_unit_font_for_zoom [UI] *** STATE MUTATION ***
│   │       │   │   │   └── ... (2 more callees, depth limit)
│   │       │   │   ├── select_display_unit [UI]  (subtree shown above)
│   │       │   │   ├── get_civ_dark_color [UI]
│   │       │   │   ├── get_unit_max_hp [GL]
│   │       │   │   ├── get_fortress_owner_at [GL]  (subtree shown above)
│   │       │   │   ├── get_tile_improvements [GL]  (subtree shown above)
│   │       │   │   ├── port_copy_rect [UI]
│   │       │   │   │   └── ... (7 more callees, depth limit)
│   │       │   │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│   │       │   │   ├── unknown (set/get draw color) [UI]
│   │       │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │       │   │   ├── unknown (sprite blit wrapper 10) [UI]
│   │       │   │   │   └── ... (1 more callees, depth limit)
│   │       │   │   └── (1 FW callees filtered)
│   │       │   ├── calc_unit_movement_points [GL]
│   │       │   │   ├── civ_has_active_wonder [GL]
│   │       │   │   │   └── ... (1 more callees, depth limit)
│   │       │   │   ├── civ_has_tech [GL]
│   │       │   │   │   └── ... (1 more callees, depth limit)
│   │       │   │   ├── get_unit_max_hp [GL]
│   │       │   │   └── get_unit_hp_remaining [GL] *** STATE MUTATION ***
│   │       │   │       └── ... (1 more callees, depth limit)
│   │       │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │       │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │       │   ├── find_unit_stack_at_xy [GL]
│   │       │   │   ├── validate_unit_stack [GL] *** STATE MUTATION ***
│   │       │   │   │   └── ... (3 more callees, depth limit)
│   │       │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │       │   │   └── get_unit_owner_at [GL]
│   │       │   │       └── ... (2 more callees, depth limit)
│   │       │   ├── sum_stack_property [GL]
│   │       │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │       │   │   └── get_first_unit_in_stack [GL]  (subtree shown above)
│   │       │   ├── get_unit_home_city_name [GL]
│   │       │   │   └── (1 FW callees filtered)
│   │       │   ├── get_tile_ptr [GL]
│   │       │   │   └── is_tile_valid [GL]
│   │       │   ├── get_civ_vis_ptr [GL]
│   │       │   ├── get_tile_terrain_raw [GL]
│   │       │   │   └── get_tile_ptr [GL]  (subtree shown above)
│   │       │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │       │   ├── check_tile_resource [GL]
│   │       │   │   ├── is_tile_valid [GL]
│   │       │   │   └── get_tile_ptr [GL]  (subtree shown above)
│   │       │   ├── check_tile_goody_hut [GL]
│   │       │   │   ├── is_tile_valid [GL]
│   │       │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │       │   │   └── get_tile_owner [GL]
│   │       │   │       └── ... (2 more callees, depth limit)
│   │       │   ├── get_tile_improvements [GL]  (subtree shown above)
│   │       │   ├── set_text_draw_source [UI]
│   │       │   ├── set_text_style [UI]
│   │       │   ├── port_set_rect_from_self [UI]
│   │       │   └── port_set_rect [UI]
│   │       ├── prepare_surface [UI]
│   │       └── tile_bitmap [UI]  (subtree shown above)
│   ├── is_in_goto_mode [UI]
│   │     Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
│   ├── cancel_goto_mode [UI] *** STATE MUTATION ***
│   │     If currently in goto mode, resets all view cursors back to normal (0x201).
│   │   ├── is_in_goto_mode [UI]
│   │   │     Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
│   │   └── set_cursor_icon [UI]  (subtree shown above)
│   ├── find_city_at [GL]  (subtree shown above)
│   ├── screen_to_tile [UI]
│   │     Converts screen pixel coordinates to map tile coordinates. Handles the isometric diamond-grid subdivision to determin...
│   │   ├── wrap_x [GL]
│   │   │     Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   │   └── port_set_pixel [UI]
│   │         Gets a single pixel value at (param_1, param_2). Returns 0 if out of clip rect bounds.
│   │       ├── port_get_pixel_ptr [UI]
│   │       ├── port_alloc_variant_b [UI]
│   │       └── (1 FW callees filtered)
│   ├── start_human_turn [UI]
│   │     Starts human turn if not already active or if param forces it. Sets UI state flags and triggers display updates.
│   │   ├── center_all_map_views [UI]  (subtree shown above)
│   │   ├── update_menu_state [MIXED]
│   │   │     Updates all menu item enabled/disabled states based on current game state. Handles unit orders visibility, cheat menu...
│   │   │   ├── is_tile_valid [GL]
│   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   ├── has_building [GL]
│   │   │   │   └── bit_index_to_byte_mask [GL]
│   │   │   ├── get_wonder_city [GL]
│   │   │   │   └── is_wonder_obsolete [GL]
│   │   │   │       └── civ_has_tech [GL]  (subtree shown above)
│   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   ├── can_build_unit_type [GL]
│   │   │   │   └── civ_has_tech [GL]  (subtree shown above)
│   │   │   ├── update_menu_item_label [UI]
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── mp_format_template_string [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── menu_set_subitem_checked [UI]
│   │   │   │   │   ├── menu_find_subitem_by_id [UI]
│   │   │   │   │   └── menu_toggle_item_checked [UI]
│   │   │   │   │       └── ... (4 more callees, depth limit)
│   │   │   │   └── menu_update_subitem_text [UI]
│   │   │   │       ├── menu_get_visible_index [UI]
│   │   │   │       ├── menu_find_subitem_by_id [UI]
│   │   │   │       ├── menu_get_subitem_visible_index [UI]
│   │   │   │       ├── unknown (pipe-to-tab converter) [UI]
│   │   │   │       ├── menu_change_item_text [UI]
│   │   │   │       │   └── ... (1 more callees, depth limit)
│   │   │   │       └── (1 FW callees filtered)
│   │   │   ├── is_tile_worked [GL]
│   │   │   ├── menu_populate [UI]
│   │   │   │   ├── menu_set_host_window [UI]
│   │   │   │   │   └── menu_setup_parent [UI]
│   │   │   │   │       └── ... (3 more callees, depth limit)
│   │   │   │   ├── menu_toggle_item_checked [UI]  (subtree shown above)
│   │   │   │   ├── menu_toggle_item_grayed [UI]
│   │   │   │   │   ├── menu_get_visible_index [UI]
│   │   │   │   │   ├── menu_find_subitem_by_id [UI]
│   │   │   │   │   ├── menu_get_subitem_visible_index [UI]
│   │   │   │   │   └── menu_enable_item [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── menu_create_header [UI]
│   │   │   │   │   └── build_menu_from_string [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── menu_insert_item [UI]
│   │   │   │   │   └── FUN_0000128C [?]
│   │   │   │   ├── menu_delete_item [UI]
│   │   │   │   │   └── delete_menu_item [UI]
│   │   │   │   ├── menu_update_host [UI]
│   │   │   │   │   ├── get_view_window_handle [UI]
│   │   │   │   │   └── redraw_menubar [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── menu_set_subitem_hidden [UI]
│   │   │   │   └── menu_find_subitem_by_id [UI]
│   │   │   ├── menu_set_subitem_checked [UI]  (subtree shown above)
│   │   │   ├── menu_set_all_subitems_checked [UI]
│   │   │   │   ├── menu_find_item_by_id [UI]
│   │   │   │   └── menu_set_subitem_checked [UI]  (subtree shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   ├── get_city_owner_at [GL]
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── get_tile_owner [GL]  (subtree shown above)
│   │   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   │   ├── get_fortress_owner_at [GL]  (subtree shown above)
│   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   └── refresh_status_panel [UI]  (subtree shown above)
│   ├── civ_has_tech [GL]  (subtree shown above)
│   ├── unit_order_goto [GL] *** STATE MUTATION ***
│   │     Executes the goto/move order for a unit. Computes direction via calc_unit_goto_direction and moves one step. When des...
│   │   ├── calc_unit_goto_direction [GL] *** STATE MUTATION ***
│   │   │     Calculates the next move direction for a unit executing a goto order. Uses short-range direct pathfinding for nearby ...
│   │   │   ├── is_tile_valid [GL]
│   │   │   ├── direction_from_delta [GL]
│   │   │   ├── find_path [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── set_map_scroll_position [UI]  (subtree shown above)
│   │   │   │   ├── debug_show_message [UI]
│   │   │   │   │   └── show_help_topic [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── draw_number_on_map [UI]
│   │   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── scale_sprite [UI]
│   │   │   │   │   ├── tile_to_screen [UI]  (subtree shown above)
│   │   │   │   │   ├── is_tile_visible [UI]  (subtree shown above)
│   │   │   │   │   ├── port_measure_text [UI]
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── redraw_entire_map [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_path_cost [GL]
│   │   │   │   ├── set_path_cost [GL] *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── distance_x_wrapped [GL]
│   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │   ├── distance_x_wrapped [GL]
│   │   │   │   │   └── diagonal_movement_cost [GL]
│   │   │   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   └── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── count_units_by_role [GL]
│   │   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   └── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_controller [GL]
│   │   │   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   │   └── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── check_tile_trespass [GL]
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   │   └── get_tile_city_radius_owner [GL]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   │   ├── find_road_path [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── calc_path_distance [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_path [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── find_adjacent_terrain_type [GL]
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   └── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── find_nearest_road_tile [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── calc_path_distance [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── find_adjacent_terrain_type [GL]  (subtree shown above)
│   │   │   │   │   ├── get_land_connectivity [GL]
│   │   │   │   │   ├── get_sea_connectivity [GL]
│   │   │   │   │   ├── wrap_y [GL]
│   │   │   │   │   └── calc_movement_cost [GL]  (subtree shown above)
│   │   │   │   ├── get_land_connectivity [GL]
│   │   │   │   ├── get_sea_connectivity [GL]
│   │   │   │   ├── get_bfs_visited [GL]
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── wrap_y [GL]
│   │   │   │   └── calc_movement_cost [GL]  (subtree shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   ├── distance_x_wrapped [GL]
│   │   │   ├── tile_distance_xy [GL]
│   │   │   ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │   ├── check_zoc_if_no_city [GL] *** STATE MUTATION ***
│   │   │   │   ├── check_adjacent_enemy_continent [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   │   └── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   │   └── get_city_owner_at [GL]  (subtree shown above)
│   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │   └── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   ├── get_fortress_owner_at [GL]  (subtree shown above)
│   │   │   ├── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   ├── move_unit [GL] *** STATE MUTATION ***
│   │   │     THE main unit movement function — the single largest function in the binary at ~18KB. Handles all aspects of moving a...
│   │   │   ├── FUN_0000C494 [?]
│   │   │   ├── flush_display [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── is_tile_valid [GL]
│   │   │   ├── show_message [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── show_dialog_message [UI]
│   │   │   │   └── FUN_0051D564 [?]
│   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │   └── scroll_map_if_needed [UI]
│   │   │   │       ├── set_map_scroll_position [UI]  (subtree shown above)
│   │   │   │       └── (1 FW callees filtered)
│   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── cancel_goto_if_blocked [GL] *** STATE MUTATION ***
│   │   │   │   ├── cancel_goto_for_stack [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   └── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION ***
│   │   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   │   ├── net_send_to_player [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_broadcast [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_msg_init_header [GL]
│   │   │   │   │   ├── net_msg_init_with_name [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── net_msg_init_with_version [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── unknown (init version message) [GL]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── unknown (init chat/popup message) [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── unknown (init type-4 message) [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── unknown (init type-6 message) [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── unknown (init type-0x13 message) [GL]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── unknown (init type-0x69 message) [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── diff_engine_serialize_game [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── diff_engine_serialize_partial [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── diff_engine_serialize_full_compressed [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   ├── diff_engine_serialize_changed_only [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   ├── unknown (dialog_render_title_bar) [UI]  (subtree shown above)
│   │   │   │   │   ├── netmgr_build_packet [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   ├── update_map_area_all_players [UI]
│   │   │   │   │   └── update_map_area [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── update_tile_all_players [UI]
│   │   │   │   │   └── update_map_tile [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── update_radius1_all_players [UI]
│   │   │   │   │   └── update_map_radius1 [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── ai_add_goal_a [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── ai_shift_goals_down_a [AI] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── calc_movement_cost [GL]  (subtree shown above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── is_unit_active [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   └── get_tile_continent [GL]  (subtree shown above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── diff_engine_invert_mirror [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── rle_encode (unnamed) [GL]
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── process_diplomatic_contact [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   │   ├── mp_show_wait_dialog [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   │   │   │   ├── diplo_demand_ally_help [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (9 more callees, depth limit)
│   │   │   │   │   ├── ai_diplomacy_negotiate [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (44 more callees, depth limit)
│   │   │   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── should_declare_war [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │   ├── parleywin_start_session [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (12 more callees, depth limit)
│   │   │   │   │   ├── event_check_negotiation [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── ai_should_declare_war [AI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── ai_tech_exchange [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   ├── check_join_war [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   │   ├── set_stack_seen_by [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   └── set_unit_seen_by [GL] *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   ├── get_civ_vis_ptr [GL]
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_explored [GL]  (subtree shown above)
│   │   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_controller [GL]  (subtree shown above)
│   │   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   │   └── queue_map_update [GL] *** STATE MUTATION ***
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── set_civ_tile_data [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_civ_vis_ptr [GL]
│   │   │   │   │   └── queue_map_update [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   └── end_map_batch [GL] *** STATE MUTATION ***
│   │   │   │       ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │       └── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   ├── show_game_popup_2arg [UI]
│   │   │   │   └── show_unit_type_picker [UI]
│   │   │   │       ├── select_list_item [UI]  (subtree shown above)
│   │   │   │       ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   │       ├── popup_add_button [UI]  (subtree shown above)
│   │   │   │       ├── sprite_init_empty [UI]  (subtree shown above)
│   │   │   │       └── (3 FW callees filtered)
│   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   ├── get_attitude_raw [GL]
│   │   │   │   └── set_attitude_value [GL] *** STATE MUTATION ***
│   │   │   │       └── (1 FW callees filtered)
│   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── net_msg_init_header [GL]
│   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │   └── rng_next_float [GL] *** STATE MUTATION ***
│   │   │   │   └── (10 FW callees filtered)
│   │   │   ├── wait_for_animation [UI]
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │   │   ├── spy_enters_city [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │   └── show_help_topic [UI]  (subtree shown above)
│   │   │   │   ├── open_intelligence_dialog [UI]
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── create_text_button [UI]
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   ├── set_button_owner [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── set_button_handler [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── set_button_click_callback [UI]
│   │   │   │   │   ├── set_active_surface [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── modal_dialog_run [UI]
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION ***
│   │   │   │   ├── set_building [GL] *** STATE MUTATION ***
│   │   │   │   │   └── bit_index_to_byte_mask [GL]
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   │   │   ├── text_newline [UI]
│   │   │   │   │   ├── text_end_italic [UI]
│   │   │   │   │   ├── display_improvement [UI]
│   │   │   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── set_building [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_wonder_owner [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (17 more callees, depth limit)
│   │   │   │   │   ├── diplo_reset_state [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   │   ├── upgrade_units_for_tech [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (8 more callees, depth limit)
│   │   │   │   │   ├── handle_tech_government_effects [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (6 more callees, depth limit)
│   │   │   │   │   ├── we_love_the_king_day [GL]
│   │   │   │   │   │   └── ... (5 more callees, depth limit)
│   │   │   │   │   ├── format_enabled_item [UI]
│   │   │   │   │   │   └── ... (5 more callees, depth limit)
│   │   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── unknown (show tech help) [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   │   ├── pedia_select_entry [UI]
│   │   │   │   │   │   └── ... (10 more callees, depth limit)
│   │   │   │   │   ├── draw_status_panel_header [UI]  (subtree shown above)
│   │   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   │   │   ├── popup_dialog_close [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── popup_add_edit_field [UI]
│   │   │   │   │   ├── popup_set_scaled_width [UI]
│   │   │   │   │   ├── popup_add_button [UI]  (subtree shown above)
│   │   │   │   │   ├── bit_index_to_byte_mask [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── spy_diplomat_action [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── spy_diplomat_action [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (6 more callees, depth limit)
│   │   │   │   │   ├── delete_unit_visible [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (7 more callees, depth limit)
│   │   │   │   │   └── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── spy_caught_check [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   │   └── spy_diplomat_action [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── check_incident_permission [GL]
│   │   │   │   │   └── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │   ├── calc_city_revolt_distance [GL]
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   └── calc_movement_cost [GL]  (subtree shown above)
│   │   │   │   ├── execute_civil_war [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   │   ├── handle_city_capture [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (65 more callees, depth limit)
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   ├── calc_movement_cost [GL]  (subtree shown above)
│   │   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   ├── draw_status_panel_header [UI]  (subtree shown above)
│   │   │   │   ├── handle_nuke_attack [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   ├── unknown (show improvement help) [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   │   ├── animate_nuke_explosion [UI] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (18 more callees, depth limit)
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   │   │   ├── delete_all_units_in_stack [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   │   ├── get_tile_controller [GL]  (subtree shown above)
│   │   │   │   │   └── generate_terrain_around [GL] *** STATE MUTATION ***
│   │   │   │   │       └── ... (12 more callees, depth limit)
│   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── FUN_0000C494 [?]
│   │   │   │   │   ├── FUN_0000C679 [?]
│   │   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (6 more callees, depth limit)
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   └── delete_unit_visible [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── spy_sabotage_unit [GL] *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── spy_diplomat_action [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── pick_up_unit_004c9528 [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── wait_for_animation [UI]  (subtree shown above)
│   │   │   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   │   ├── calc_city_revolt_distance [GL]  (subtree shown above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   │   ├── draw_status_panel_header [UI]  (subtree shown above)
│   │   │   │   │   ├── set_unit_seen_by [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   │   │   │   ├── set_tile_owner [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (show unit help) [UI]
│   │   │   │   │   └── show_unit_type_picker [UI]  (subtree shown above)
│   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   ├── animate_combat_movement [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── wait_for_animation [UI]  (subtree shown above)
│   │   │   │   │   ├── tile_to_screen [UI]  (subtree shown above)
│   │   │   │   │   ├── is_tile_visible [UI]  (subtree shown above)
│   │   │   │   │   ├── set_sprite_scale [UI]  (subtree shown above)
│   │   │   │   │   ├── reset_sprite_scale [UI]  (subtree shown above)
│   │   │   │   │   ├── scale_at_current_zoom [UI]  (subtree shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── blit_with_clip [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── port_alloc_rect [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── sum_stack_property [GL]  (subtree shown above)
│   │   │   ├── animate_unit_movement [UI] *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   ├── rect_get_height [UI]
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   ├── set_rect_abs [UI]
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── tile_to_screen [UI]  (subtree shown above)
│   │   │   │   ├── is_tile_visible [UI]  (subtree shown above)
│   │   │   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── draw_unit [UI]  (subtree shown above)
│   │   │   │   ├── blit_with_clip [UI]  (subtree shown above)
│   │   │   │   ├── calc_movement_step_size [UI]
│   │   │   │   │   └── calc_scaled_step [UI]
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── port_alloc_rect [UI]  (subtree shown above)
│   │   │   │   ├── port_destructor [UI]
│   │   │   │   │   ├── port_init [UI]
│   │   │   │   │   ├── port_unlock [UI]
│   │   │   │   │   ├── surface_is_locked [UI]
│   │   │   │   │   └── destroy_dib_surface [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── diplomacy_check_attack_allowed [GL]
│   │   │   │   ├── show_message [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── check_can_declare_war [GL]
│   │   │   │       ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   │   │       └── (1 FW callees filtered)
│   │   │   ├── handle_city_capture [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── handle_nuke_attack [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── resolve_combat [GL] *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── dialog_repaint_check [UI]
│   │   │   │   │   └── set_active_surface [UI]  (subtree shown above)
│   │   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION ***
│   │   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   ├── reassign_all_city_production [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── change_city_production [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (13 more callees, depth limit)
│   │   │   │   │   └── get_tile_continent [GL]  (subtree shown above)
│   │   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   │   │   ├── diplo_activate_alliance_wars [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   └── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   ├── diplo_demand_ally_help [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── wait_for_animation [UI]  (subtree shown above)
│   │   │   │   ├── draw_unit_at_position [UI]
│   │   │   │   │   ├── tile_to_screen [UI]  (subtree shown above)
│   │   │   │   │   └── draw_unit [UI]  (subtree shown above)
│   │   │   │   ├── invalidate_single_tile [UI]
│   │   │   │   │   └── invalidate_tile_area [UI]  (subtree shown above)
│   │   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   │   ├── update_radius1_all_players [UI]  (subtree shown above)
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── execute_airlift [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── FUN_0000C494 [?]
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   ├── show_game_popup_3arg [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   └── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── unknown (show improvement help) [UI]  (subtree shown above)
│   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   ├── ai_alert_nearby_units [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL]  (subtree shown above)
│   │   │   │   │   ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │   │   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   │   │   │   └── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── ai_choose_government [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── check_govt_available [GL]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   └── ai_revolution_notification [GL] *** STATE MUTATION ***
│   │   │   │   │       └── ... (11 more callees, depth limit)
│   │   │   │   ├── draw_status_panel_header [UI]  (subtree shown above)
│   │   │   │   ├── animate_unit_movement [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── diplomacy_check_treaty_violation [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (5 more callees, depth limit)
│   │   │   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   └── set_attitude_value [GL] *** STATE MUTATION ***
│   │   │   │   ├── diplomacy_check_attack_allowed [GL]  (subtree shown above)
│   │   │   │   ├── calc_unit_hit_points [GL]
│   │   │   │   ├── calc_unit_defense_strength [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   │   │   ├── calc_stack_best_defender [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── calc_unit_defense_strength [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_unit_max_hp [GL]
│   │   │   │   │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL]  (subtree shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   └── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   │   ├── handle_unit_kill [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── event_check_unit_killed [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── record_combat_kill [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   └── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── handle_stack_wipe [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── handle_unit_kill [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   └── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   ├── handle_unit_promotion [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   │   │   └── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   ├── animate_combat_movement [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── handle_nuke_attack [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── scramble_defenders_to_tile [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_path [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── execute_paradrop [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (28 more callees, depth limit)
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   ├── get_unit_moves_remaining [GL]  (subtree shown above)
│   │   │   │   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   │   │   │   ├── get_tile_owner [GL]  (subtree shown above)
│   │   │   │   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   │   │   │   └── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── refresh_combat_tiles [UI]
│   │   │   │   │   └── update_map_area_all_players [UI]  (subtree shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── get_unit_max_hp [GL]
│   │   │   │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │   │   ├── get_unit_moves_remaining [GL]  (subtree shown above)
│   │   │   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   │   ├── relocate_all_units [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   │   └── relocate_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── set_unit_seen_by [GL] *** STATE MUTATION ***
│   │   │   │   ├── stack_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── load_unit_onto_ship [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (12 more callees, depth limit)
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_fortress_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   │   ├── process_goody_hut [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   │   ├── set_building [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── update_radius1_all_players [UI]  (subtree shown above)
│   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── can_research_tech [GL]
│   │   │   │   │   └── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── FUN_0000CA8D [?]
│   │   │   │   │   ├── FUN_0000CCB3 [?]
│   │   │   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   │   │   ├── process_messages [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── show_help_topic [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown — manage window [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── init_city_production_globals [GL] *** STATE MUTATION ***
│   │   │   │   │   └── set_active_surface [UI]  (subtree shown above)
│   │   │   │   ├── draw_status_panel_header [UI]  (subtree shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── create_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── unknown (tutorial_show_advice) [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │   │   │   ├── put_down_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (7 more callees, depth limit)
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   │   │   ├── (get_tile_fertility_or_city_radius) [GL]
│   │   │   │   │   ├── get_tile_city_radius_owner [GL]  (subtree shown above)
│   │   │   │   │   └── get_tile_fertility [GL]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── claim_adjacent_ocean_tiles [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── reveal_tile_for_civ [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   │   │   ├── set_stack_seen_by [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── handle_caravan_arrival [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   │   ├── text_newline [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── display_improvement [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── show_message [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   │   ├── dialog_set_title [UI]  (subtree shown above)
│   │   │   │   ├── process_caravan_arrival [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── establish_trade_route [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   ├── show_game_popup_3arg [UI]  (subtree shown above)
│   │   │   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── check_trade_route_path [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (8 more callees, depth limit)
│   │   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   │   ├── calc_tech_cost [GL]
│   │   │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   │   ├── draw_status_panel_header [UI]  (subtree shown above)
│   │   │   │   │   ├── calc_movement_cost [GL]  (subtree shown above)
│   │   │   │   │   ├── delete_unit_visible [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   │   ├── popup_add_edit_field [UI]
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── popup_add_button [UI]  (subtree shown above)
│   │   │   │   ├── popup_add_radio_option [UI]
│   │   │   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   │   │   ├── popup_get_button_width [UI]
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── delete_unit_visible [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── mp_lock_map [GL] *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── mp_unlock_map [GL] *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── spaceship_ai_should_start [AI]
│   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   ├── spaceship_is_enabled [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── wrap_x [GL]
│   │   │   ├── tile_distance_xy [GL]
│   │   │   ├── get_unit_max_hp [GL]
│   │   │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │   ├── get_unit_moves_remaining [GL]  (subtree shown above)
│   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   ├── set_unit_goto_order [GL] *** STATE MUTATION ***
│   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── move_unit_to_bottom [GL] *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   ├── get_last_unit_in_stack [GL]
│   │   │   │   │   └── validate_unit_stack [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── (2 FW callees filtered)
│   │   │   ├── relocate_all_units [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── clear_stack_visibility [GL] *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   └── clear_unit_visibility [GL] *** STATE MUTATION ***
│   │   │   ├── set_unit_seen_by [GL] *** STATE MUTATION ***
│   │   │   ├── set_stack_seen_by [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── check_zoc_violation [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   └── get_unit_owner_at [GL]  (subtree shown above)
│   │   │   ├── check_zoc_if_no_city [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── set_stack_visibility_mask [GL] *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   └── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   │   ├── count_units_by_role [GL]  (subtree shown above)
│   │   │   ├── load_unit_onto_ship [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── stack_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── delete_unit_safely [GL] *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000C494 [?]
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── delete_all_units_in_stack [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── load_unit_onto_ship [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   └── (2 FW callees filtered)
│   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   │   ├── get_tile_explored [GL]  (subtree shown above)
│   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   ├── get_fortress_owner_at [GL]  (subtree shown above)
│   │   │   ├── get_tile_controller [GL]  (subtree shown above)
│   │   │   ├── check_tile_goody_hut [GL]  (subtree shown above)
│   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   └── queue_map_update [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   ├── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   └── (1 FW callees filtered)
│   │   ├── check_adjacent_enemy_simple [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── execute_paradrop [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── citywin_modal_refresh [UI]
│   │     Shows a modal city refresh message. Guards against reentrancy with DAT_00630d1c flag. Displays CITYMODAL message and ...
│   │   ├── FUN_0000BC4F [?]
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_string [UI]
│   │   │     Appends a string to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_number [UI]
│   │   │     Adds a number to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   └── unknown (dialog show single param) [UI]  (subtree shown above)
│   ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── unit_order_sentry [MIXED] *** STATE MUTATION ***
│   │     Places units on sentry duty. If only one unit at location, sentries it directly. If multiple units, shows a unit list...
│   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── activate_current_unit [MIXED] *** STATE MUTATION ***
│   │   │     Activates the current unit for player input. Handles transition from "no unit selected" to active unit state.
│   │   │   ├── center_all_map_views [UI]  (subtree shown above)
│   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── start_human_turn [UI]  (subtree shown above)
│   │   │   ├── select_next_unit [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── start_human_turn [UI]  (subtree shown above)
│   │   │   │   ├── update_menu_state [MIXED]  (subtree shown above)
│   │   │   │   ├── refresh_status_panel [UI]  (subtree shown above)
│   │   │   │   ├── is_unit_ready_to_move [GL]
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   └── get_unit_moves_remaining [GL]  (subtree shown above)
│   │   │   │   ├── find_next_unit_needing_orders [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL]  (subtree shown above)
│   │   │   │   │   └── is_unit_ready_to_move [GL]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── update_menu_state [MIXED]  (subtree shown above)
│   │   │   ├── refresh_status_panel [UI]  (subtree shown above)
│   │   │   └── is_unit_ready_to_move [GL]  (subtree shown above)
│   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   ├── show_unit_list_dialog [UI]
│   │   │     Shows a scrolling dialog listing all units in a stack with their details (civ name, veteran flag, type name, home cit...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── mapgen_set_dialog_type [UI]
│   │   │   │   └── popup_dialog_open [UI]
│   │   │   │       ├── rect_get_width [UI]
│   │   │   │       ├── rect_get_height [UI]
│   │   │   │       ├── unknown (popup list init) [UI]
│   │   │   │       ├── popup_dialog_reset [UI]
│   │   │   │       ├── popup_dialog_destroy [UI] *** STATE MUTATION ***
│   │   │   │       │   └── ... (3 more callees, depth limit)
│   │   │   │       ├── popup_set_bitmap [UI]
│   │   │   │       │   └── ... (1 more callees, depth limit)
│   │   │   │       ├── popup_set_field_10 [UI]
│   │   │   │       ├── popup_set_scaled_width [UI]
│   │   │   │       └── (1 FW callees filtered)
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_end_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── display_improvement [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── set_status_bar_text [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown (string pool append separator) [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_adjective_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   ├── popup_set_title [UI]
│   │   │   │   └── (2 FW callees filtered)
│   │   │   ├── popup_set_scaled_width [UI]
│   │   │   ├── popup_add_button [UI]  (subtree shown above)
│   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   ├── sprite_init_empty [UI]  (subtree shown above)
│   │   │   └── (4 FW callees filtered)
│   │   └── (1 FW callees filtered)
│   ├── move_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   ├── get_tile_explored [GL]  (subtree shown above)
│   └── get_active_control [UI]
│         Returns DAT_00637ea4 (the active control handle).
├── map_double_click [MIXED] *** STATE MUTATION ***  -- deferred UI: map double-click
│     Handles double-click on the map. Opens the terrain improvement info popup for the tile under the double-click, based ...
│   ├── is_tile_valid [GL]
│   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── grassland_has_shield [GL]
│   │     Determines if a grassland tile at (param_1, param_2) has the bonus grassland shield. Uses the formula: returns true i...
│   ├── chatwin_select_item [UI]
│   │     Handles item selection in the chat/civilopedia window. Updates display to show selected item info.
│   │   ├── end_paint [UI]  (subtree shown above)
│   │   ├── unknown (lock pedia surface) [UI]
│   │   │     Locks the drawing surface for the pedia widget.
│   │   │   ├── unknown (get drawing context) [UI]
│   │   │   │   └── focus_and_raise_window [UI]
│   │   │   └── surface_list_find_dirty [UI]
│   │   ├── pedia_init_tabs [UI]
│   │   │     Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) ...
│   │   │   ├── control_invalidate [UI]
│   │   │   │   ├── FUN_00008B00 [?]
│   │   │   │   └── FUN_00008B2D [?]
│   │   │   ├── set_edit_text [UI]
│   │   │   │   └── FUN_00002D7F [?]
│   │   │   ├── pedia_button_ctor [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── pedia_button_create [UI]  (subtree shown above)
│   │   │   ├── unknown (set button callback) [UI]
│   │   │   ├── unknown (clear hypertext links) [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── (2 FW callees filtered)
│   │   ├── chatwin_draw_terrain_info [UI]
│   │   │     Draws detailed terrain information in the chat/info window. Shows terrain type, food/shields/trade yields, special re...
│   │   │   ├── rect_get_width [UI]
│   │   │   ├── rect_get_height [UI]
│   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   ├── text_begin_bold [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown (get panel icon width) [UI]
│   │   │   │   └── rect_get_width [UI]
│   │   │   ├── unknown (get panel icon height) [UI]
│   │   │   │   └── rect_get_height [UI]
│   │   │   ├── pedia_init_tabs [UI]  (subtree shown above)
│   │   │   ├── pedia_show_description [UI]
│   │   │   │   ├── pedia_clear_selection [UI]
│   │   │   │   │   └── FUN_00008B00 [?]
│   │   │   │   ├── pedia_set_selection [UI]
│   │   │   │   │   └── FUN_00008B00 [?]
│   │   │   │   └── (3 FW callees filtered)
│   │   │   ├── pedia_add_hyperlink [UI]
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   ├── get_font_height [UI]
│   │   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   │   ├── control_invalidate [UI]  (subtree shown above)
│   │   │   │   ├── hypertext_widget_create [UI]
│   │   │   │   │   ├── control_detach_window [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── control_init_fields [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   └── unknown (create hypertext window) [UI]
│   │   │   │   │       └── ... (6 more callees, depth limit)
│   │   │   │   ├── pedia_link_node_ctor [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (set link callback) [UI]
│   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│   │   │   │   ├── port_alloc [UI]
│   │   │   │   │   ├── FUN_000040FB [?]
│   │   │   │   │   ├── get_surface_buffer_handle [UI]
│   │   │   │   │   ├── unknown (get surface base) [UI]
│   │   │   │   │   ├── check_topdown [UI]
│   │   │   │   │   ├── fill_scanline_8bit [UI]
│   │   │   │   │   ├── fill_column_8bit [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── unknown (set/get draw color) [UI]
│   │   │   ├── chatwin_find_item_index [UI]
│   │   │   ├── unknown (pedia_draw_background_panel) [UI]
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   ├── rect_get_height [UI]
│   │   │   │   ├── fill_surface_from_rect [UI]  (subtree shown above)
│   │   │   │   └── tile_bitmap [UI]  (subtree shown above)
│   │   │   ├── pedia_get_entry_name [UI]
│   │   │   ├── port_set_rect [UI]
│   │   │   ├── port_set_clip_rect [UI]
│   │   │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   ├── scale_table_build_primary [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── scale_table_get_current [UI]
│   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   └── (2 FW callees filtered)
│   │   ├── pedia_clear_item_list [UI]
│   │   │     Clears the linked list of Civilopedia display items. Walks the list at offset 8000 in the object, calling scalar dele...
│   │   │   └── init_palette_system [UI]
│   │   │       └── (1 FW callees filtered)
│   │   ├── pedia_draw_frame [UI]
│   │   │     Draws the decorative frame around the Civilopedia window including borders, title text with shadow effect, and backgr...
│   │   │   ├── rect_get_width [UI]
│   │   │   ├── rect_get_height [UI]
│   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   ├── widget_inflate_rect_neg [UI]  (subtree shown above)
│   │   │   ├── unknown (pedia_draw_background_panel) [UI]  (subtree shown above)
│   │   │   ├── draw_3d_border [UI]
│   │   │   │   ├── draw_hline [UI]  (subtree shown above)
│   │   │   │   └── draw_vline [UI]
│   │   │   │       ├── set_rect_abs [UI]
│   │   │   │       └── fill_surface_from_rect [UI]  (subtree shown above)
│   │   │   ├── port_set_rect_from_self [UI]
│   │   │   ├── port_set_rect [UI]
│   │   │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   ├── scale_table_build_primary [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   ├── pedia_open_category [UI]
│   │   │     Opens a specific category in the Civilopedia. Initializes display state, sets title, configures tabs, and optionally ...
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── unknown (lock pedia surface) [UI]  (subtree shown above)
│   │   │   ├── pedia_init_tabs [UI]  (subtree shown above)
│   │   │   ├── pedia_set_title [UI]
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── pedia_push_history [UI]
│   │   │   └── set_active_surface [UI]  (subtree shown above)
│   │   ├── pedia_get_entry_name [UI]
│   │   │     Gets the name string for a Civilopedia entry by index from a linked list.
│   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── citywin_modal_refresh [UI]  (subtree shown above)
│   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   ├── get_tile_explored [GL]  (subtree shown above)
│   ├── get_tile_controller [GL]  (subtree shown above)
│   ├── check_tile_resource [GL]  (subtree shown above)
│   └── get_active_control [UI]
│         Returns DAT_00637ea4 (the active control handle).
├── map_key [MIXED] *** STATE MUTATION ***  -- deferred UI: map key
│     Main virtual key handler for the map window. Dispatches function keys (F1-F10 = advisor screens), menu accelerators (...
│   ├── FUN_0000994F [?]
│   ├── FUN_0000BC4F [?]
│   ├── FUN_0000BD13 [?]
│   ├── FUN_0000BF72 [?]
│   ├── show_dialog_message [UI]  (subtree shown above)
│   ├── cancel_unit_blink_timer [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── cancel_goto_mode [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── move_cursor_by_direction [UI] *** STATE MUTATION ***
│   │     Moves the map cursor in direction param_1 (0-7). Uses direction offset tables at DAT_00628350/DAT_00628360 to compute...
│   │   ├── scroll_map_if_needed [UI]  (subtree shown above)
│   │   ├── center_and_scroll_to_tile [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   └── wrap_x [GL]
│   │         Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   ├── launch_tech_editor [UI]
│   │     Launches the technology editor: creates the editor object, opens the editor dialog, and cleans up.
│   │   ├── open_tech_editor [UI] *** STATE MUTATION ***
│   │   │     Opens the full technology editor dialog. Creates all controls (combo boxes, edit fields, buttons), initializes data, ...
│   │   │   ├── set_callback_0x44 [UI]
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── process_messages [UI]  (subtree shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   ├── copy_tech_data_to_editor [GL] *** STATE MUTATION ***
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── update_editor_controls [UI]
│   │   │   │   ├── get_combo_selection_id [UI]
│   │   │   │   ├── set_edit_text [UI]  (subtree shown above)
│   │   │   │   └── set_combo_selection [UI]
│   │   │   │       └── FUN_000036F6 [?]
│   │   │   ├── handle_editor_selection_change [UI] *** STATE MUTATION ***
│   │   │   │   ├── update_editor_controls [UI]  (subtree shown above)
│   │   │   │   ├── read_editor_controls [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── get_combo_selection_id [UI]
│   │   │   │   │   ├── get_edit_text [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── get_combo_selection [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── redraw_tech_editor [UI]
│   │   │   │   │   └── draw_tech_editor [UI]
│   │   │   │   │       └── ... (15 more callees, depth limit)
│   │   │   │   ├── populate_tech_prereq_list [UI]
│   │   │   │   │   ├── add_listbox_item [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── clear_listbox [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── get_parent_window_handle [UI]
│   │   │   │   ├── get_combo_selection [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_selection [UI]  (subtree shown above)
│   │   │   │   ├── show_help_topic [UI]  (subtree shown above)
│   │   │   │   └── unknown (set popup parent B) [UI]
│   │   │   ├── create_editor_combo_control [UI] *** STATE MUTATION ***
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_combo_control [UI]
│   │   │   │   │   ├── FUN_00003130 [?]
│   │   │   │   │   ├── control_detach_window [UI]  (subtree shown above)
│   │   │   │   │   └── control_init_fields [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_data_source [UI]
│   │   │   │   │   ├── FUN_000035C8 [?]
│   │   │   │   │   └── get_data_source_ptr [UI]
│   │   │   │   ├── add_combo_item [UI]
│   │   │   │   │   └── FUN_0000357E [?]
│   │   │   │   ├── set_combo_callback [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── create_editor_edit_control [UI] *** STATE MUTATION ***
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_edit_control [UI]
│   │   │   │   │   ├── FUN_00002740 [?]
│   │   │   │   │   ├── FUN_00002D7F [?]
│   │   │   │   │   ├── control_detach_window [UI]  (subtree shown above)
│   │   │   │   │   └── control_init_fields [UI]  (subtree shown above)
│   │   │   │   ├── set_edit_max_chars [UI]
│   │   │   │   │   └── FUN_00002DA1 [?]
│   │   │   │   └── set_control_callback [UI]
│   │   │   ├── set_editor_font [UI]  (subtree shown above)
│   │   │   ├── set_combo_selection [UI]  (subtree shown above)
│   │   │   ├── create_listbox_control [UI]
│   │   │   │   ├── FUN_000037A0 [?]
│   │   │   │   ├── control_detach_window [UI]  (subtree shown above)
│   │   │   │   └── control_init_fields [UI]  (subtree shown above)
│   │   │   ├── set_listbox_data_source [UI]
│   │   │   │   ├── FUN_00003C9A [?]
│   │   │   │   └── get_data_source_ptr [UI]
│   │   │   ├── dialog_create [UI]
│   │   │   │   ├── unknown (set_font_size) [UI]
│   │   │   │   │   └── set_callback_0x38 [UI]
│   │   │   │   ├── unknown (set dialog video source) [UI]
│   │   │   │   │   └── set_callback_0x3c [UI]
│   │   │   │   ├── dialog_create_buttons [UI]  (subtree shown above)
│   │   │   │   ├── unknown (set_msg_handler_a) [UI]
│   │   │   │   ├── unknown (set_msg_handler_b) [UI]
│   │   │   │   ├── create_offscreen_surface_b [UI]
│   │   │   │   │   ├── get_view_window_handle [UI]
│   │   │   │   │   ├── port_alloc_rect [UI]  (subtree shown above)
│   │   │   │   │   ├── port_draw_text_rect [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── surface_create_8param [UI]
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   └── set_window_data_and_wndproc [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── load_gif_file [UI]
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── widget_read_text (wrapper) [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── port_init_buffer [UI]
│   │   │   │   │   └── port_alloc [UI]
│   │   │   │   │       └── ... (10 more callees, depth limit)
│   │   │   │   ├── port_draw_text_rect [UI]  (subtree shown above)
│   │   │   │   ├── palette_set_entries [UI]
│   │   │   │   │   ├── palette_apply [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   └── palette_set_entry [UI]
│   │   │   │   ├── check_topdown [UI]
│   │   │   │   ├── flip_surface_vertical [UI]
│   │   │   │   │   ├── get_pixel_buffer [UI]
│   │   │   │   │   └── (4 FW callees filtered)
│   │   │   │   └── (13 FW callees filtered)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]
│   │   │   │   ├── FUN_0000E780 [?]
│   │   │   │   ├── palette_generate_random_id [UI]
│   │   │   │   └── unknown (palette_create) [UI]
│   │   │   └── (10 FW callees filtered)
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── city_name_editor_entry [UI]
│   │     Entry point for the city name editor. Sets up the window context, opens the editor, then cleans up.
│   │   ├── city_name_editor_open [UI]
│   │   │     Opens the full city name editor dialog. Allocates surfaces, loads the editor background GIF, creates buttons and scro...
│   │   │   ├── set_callback_0x44 [UI]
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── get_font_height [UI]
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   ├── set_editor_font [UI]  (subtree shown above)
│   │   │   ├── set_combo_selection [UI]  (subtree shown above)
│   │   │   ├── city_name_editor_scroll_update [UI]
│   │   │   │   ├── get_combo_selection [UI]  (subtree shown above)
│   │   │   │   └── unknown (city name editor repaint trigger) [UI]
│   │   │   │       └── city_name_editor_paint [UI]
│   │   │   │           └── ... (14 more callees, depth limit)
│   │   │   ├── city_name_editor_create_buttons [UI]
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_combo_control [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_data_source [UI]  (subtree shown above)
│   │   │   │   ├── add_combo_item [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_callback [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── load_gif_file [UI]  (subtree shown above)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   └── (8 FW callees filtered)
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── advisor_city_status_open [UI]
│   ├── render_power_graph [UI]
│   │     Renders the Power Graph report. Creates an offscreen bitmap, draws axes with turn labels, then plots power graph line...
│   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   ├── set_rect_wh [UI]
│   │   │     Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── fill_surface_from_rect [UI]  (subtree shown above)
│   │   ├── unknown (string pool set) [UI]  (subtree shown above)
│   │   ├── draw_border_rect [UI]
│   │   │     Draws a bordered rectangle using surface draw function.
│   │   │   └── draw_rect_outline [UI]
│   │   │       ├── draw_hline [UI]  (subtree shown above)
│   │   │       └── draw_vline [UI]  (subtree shown above)
│   │   ├── draw_text_at [UI]  (subtree shown above)
│   │   ├── get_civ_background_color [UI]
│   │   │     Returns the background color for a civilization based on its leader index.
│   │   ├── calc_year_from_turn [GL]
│   │   │     Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
│   │   │   └── (1 FW callees filtered)
│   │   ├── get_civ_people_name [GL]
│   │   │     Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── unknown (dialog_render_title_bar) [UI]  (subtree shown above)
│   │   ├── dialog_create_buttons [UI]  (subtree shown above)
│   │   ├── dialog_ctor [UI]
│   │   │     Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │   │   └── init_sprite_surface_mgr [UI]
│   │   │       ├── init_sprite_cache [UI]
│   │   │       │   └── init_render_surface [UI]
│   │   │       └── (1 FW callees filtered)
│   │   ├── dialog_create [UI]  (subtree shown above)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_dialog_open [UI]  (subtree shown above)
│   │   ├── draw_colored_rect [UI]
│   │   │     Draws a colored rectangle. Sets the draw color then fills the rect.
│   │   │   ├── port_alloc [UI]  (subtree shown above)
│   │   │   └── unknown (set/get draw color) [UI]
│   │   ├── blit_rect_to_rect [UI]
│   │   │     Blits a rectangle from one position to another, both specified by (x, y, w, h).
│   │   │   ├── set_rect_wh [UI]
│   │   │   └── port_blit_stretch [UI]
│   │   │       ├── port_lock [UI]
│   │   │       │   ├── check_topdown [UI]
│   │   │       │   └── get_pixel_buffer [UI]
│   │   │       ├── port_unlock [UI]
│   │   │       │   └── (1 FW callees filtered)
│   │   │       ├── surface_is_locked [UI]
│   │   │       ├── get_surface_buffer_handle [UI]
│   │   │       ├── unknown (get surface base) [UI]
│   │   │       ├── check_topdown [UI]
│   │   │       └── copy_rect_8bit [UI]
│   │   ├── set_text_draw_target [UI]
│   │   │     Sets the target surface for text drawing.
│   │   ├── set_text_draw_source [UI]
│   │   │     Sets the source font surface for text drawing.
│   │   ├── load_gif_resource [UI]
│   │   │     Loads a GIF image from a resource. Same GIF parsing and LZW decompression as load_gif_file but reads from resource data.
│   │   │   ├── flush_display [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── port_init_buffer [UI]  (subtree shown above)
│   │   │   ├── port_draw_text_rect [UI]  (subtree shown above)
│   │   │   ├── palette_set_entries [UI]  (subtree shown above)
│   │   │   ├── check_topdown [UI]
│   │   │   ├── flip_surface_vertical [UI]  (subtree shown above)
│   │   │   └── (8 FW callees filtered)
│   │   ├── port_set_rect [UI]
│   │   │     Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── palette_init [UI]  (subtree shown above)
│   │   └── (12 FW callees filtered)
│   ├── show_demographics_dialog [UI]
│   │     Opens the Demographics dialog.
│   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   ├── advisor_create_close_button [UI]
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── show_attitude_dialog [UI]
│   │     Opens the Attitude Advisor dialog.
│   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   ├── advisor_create_close_button [UI]
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── show_score_dialog [UI]
│   │     Opens the civilisation score dialog with music.
│   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   ├── advisor_create_close_button [UI]
│   │   ├── play_music_track [UI]
│   │   │     Plays a specific music track (param_1) with optional restart (param_2). Handles CD audio mode.
│   │   │   ├── unknown (stop music) [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── (4 FW callees filtered)
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── show_military_advisor_dialog [UI]
│   │     Opens the military advisor dialog. If not already open (DAT_0063e948 < 0), creates it with navigation button; otherwi...
│   │   ├── rect_get_height [UI]
│   │   │     Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   ├── set_rect_wh [UI]
│   │   │     Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── create_text_button [UI]  (subtree shown above)
│   │   ├── set_button_owner [UI]  (subtree shown above)
│   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   ├── set_button_click_callback [UI]
│   │   │     Sets the click callback function pointer for a button control.
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   └── (2 FW callees filtered)
│   ├── unknown (stop music) [UI]
│   │     Stops music playback and sets paused flag.
│   │   └── (1 FW callees filtered)
│   ├── redraw_entire_map [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── redraw_map_all_players [UI]
│   │     Redraws entire map for all active players.
│   │   └── redraw_entire_map [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── clear_game_active_flag [GL]
│   │     Sets DAT_00628044 = 0, clearing the "game active" flag.
│   ├── mp_set_password [MIXED] *** STATE MUTATION ***
│   │     Implements the password set/change dialog for multiplayer. If password exists, verifies old password first, then prom...
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── mp_update_password_flags [GL] *** STATE MUTATION ***
│   │   │     Scans all 8 player password slots. If a password is set (first byte != 0), sets the corresponding flag in DAT_00673d1...
│   │   │   └── (2 FW callees filtered)
│   │   ├── mp_prepare_password_dialog [UI]
│   │   │     Prepares the password dialog by setting the title string from the civ name and a string resource ID.
│   │   │   └── (3 FW callees filtered)
│   │   ├── stop_turn_timer [MIXED] *** STATE MUTATION ***
│   │   │     Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │   │   ├── FUN_0000994F [?]
│   │   │   ├── credits_invalidate [UI]
│   │   │   ├── unknown (throne room timer/idle handler) [UI]
│   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── unknown (pedia_invalidate_cache) [UI]
│   │   │   ├── draw_minimap_overlay [UI] *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   ├── fill_surface_from_rect [UI]  (subtree shown above)
│   │   │   │   ├── blit_rect_to_rect [UI]  (subtree shown above)
│   │   │   │   ├── port_alloc [UI]  (subtree shown above)
│   │   │   │   ├── port_set_rect_from_self [UI]
│   │   │   │   ├── port_set_rect [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── (1 FW callees filtered)
│   │   ├── resume_turn_timer [MIXED] *** STATE MUTATION ***
│   │   │     Resumes the turn timer if time remains and game is active.
│   │   │   ├── FUN_0000994F [?]
│   │   │   ├── credits_invalidate [UI]
│   │   │   ├── unknown (throne room timer/idle handler) [UI]
│   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── unknown (pedia_invalidate_cache) [UI]
│   │   │   └── (3 FW callees filtered)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_show_modal [UI]  (subtree shown above)
│   │   ├── popup_parse_text_file [UI]
│   │   │     Parses a game text file section to configure and populate a popup dialog. Handles @-directives (OPTIONS, PROMPT, TITL...
│   │   │   ├── mp_format_template_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── popup_dialog_open [UI]  (subtree shown above)
│   │   │   ├── popup_add_edit_field [UI]
│   │   │   │   └── (2 FW callees filtered)
│   │   │   ├── popup_set_field_38 [UI]
│   │   │   ├── popup_set_page_layout [UI]
│   │   │   │   └── popup_set_radio_column_count [UI]
│   │   │   │       ├── get_font_height [UI]
│   │   │   │       └── popup_get_line_height [UI]
│   │   │   │           └── ... (1 more callees, depth limit)
│   │   │   ├── popup_set_title [UI]
│   │   │   │   └── (2 FW callees filtered)
│   │   │   ├── popup_set_scaled_width [UI]
│   │   │   ├── popup_set_radio_selected [UI]
│   │   │   │   └── popup_find_radio_option_by_id [UI]
│   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   ├── popup_add_radio_checked [UI]
│   │   │   │   └── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   ├── popup_add_text_input [UI]
│   │   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   │   └── (2 FW callees filtered)
│   │   │   ├── popup_add_action_button_label [UI]
│   │   │   │   └── (2 FW callees filtered)
│   │   │   └── (4 FW callees filtered)
│   │   └── (5 FW callees filtered)
│   ├── show_scenario_editor [UI]
│   │     Entry point for showing the scenario editor. Initializes bitmap wrapper, opens editor, cleans up on exit.
│   │   ├── open_scenario_editor [UI]
│   │   │     Opens and runs the scenario editor. Creates the editor window, initializes controls (5 dropdowns + text fields), load...
│   │   │   ├── set_callback_0x44 [UI]
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── process_messages [UI]  (subtree shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   ├── set_editor_font [UI]  (subtree shown above)
│   │   │   ├── set_combo_selection [UI]  (subtree shown above)
│   │   │   ├── load_rules_to_editor [UI]
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── get_civ_adjective_name [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── update_editor_controls_from_game [UI]
│   │   │   │   ├── get_combo_selection_id [UI]
│   │   │   │   ├── set_edit_text [UI]  (subtree shown above)
│   │   │   │   └── set_combo_selection [UI]  (subtree shown above)
│   │   │   ├── create_editor_dropdown [UI]
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_combo_control [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_data_source [UI]  (subtree shown above)
│   │   │   │   ├── add_combo_item [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_callback [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── create_editor_textfield [UI]
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_edit_control [UI]  (subtree shown above)
│   │   │   │   └── set_edit_max_chars [UI]  (subtree shown above)
│   │   │   ├── init_editor_scrollbar [UI]  (subtree shown above)
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── load_gif_file [UI]  (subtree shown above)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   └── (6 FW callees filtered)
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── save_civ2_dat [GL]
│   │     Saves CIV2.DAT preferences file. On write failure, deletes the file to avoid corruption.
│   ├── parleywin_start_session [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── show_improvement_editor [UI]
│   │     Entry point for showing the improvement editor. Creates the editor context and calls editor_init.
│   │   ├── editor_init [UI] *** STATE MUTATION ***
│   │   │     Full initialization of the improvement editor window. Creates the dialog, all controls, loads data, and enters the ed...
│   │   │   ├── set_callback_0x44 [UI]
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── process_messages [UI]  (subtree shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   ├── set_editor_font [UI]  (subtree shown above)
│   │   │   ├── set_combo_selection [UI]  (subtree shown above)
│   │   │   ├── editor_load_improvements [UI] *** STATE MUTATION ***
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── editor_update_controls [UI]
│   │   │   │   ├── get_combo_selection_id [UI]
│   │   │   │   ├── set_edit_text [UI]  (subtree shown above)
│   │   │   │   └── set_combo_selection [UI]  (subtree shown above)
│   │   │   ├── editor_handle_listbox [UI]
│   │   │   │   ├── control_invalidate [UI]  (subtree shown above)
│   │   │   │   ├── get_parent_window_handle [UI]
│   │   │   │   ├── get_combo_selection [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_selection [UI]  (subtree shown above)
│   │   │   │   ├── show_help_topic [UI]  (subtree shown above)
│   │   │   │   ├── pedia_clear_selection [UI]  (subtree shown above)
│   │   │   │   ├── pedia_set_selection [UI]  (subtree shown above)
│   │   │   │   ├── editor_update_controls [UI]  (subtree shown above)
│   │   │   │   ├── editor_read_controls [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── get_combo_selection_id [UI]
│   │   │   │   │   ├── get_edit_text [UI]  (subtree shown above)
│   │   │   │   │   ├── get_combo_selection [UI]  (subtree shown above)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown — editor repaint wrapper [UI]
│   │   │   │   │   └── editor_paint [UI]
│   │   │   │   │       └── ... (20 more callees, depth limit)
│   │   │   │   ├── unknown (set popup parent B) [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── editor_create_combo_control [UI] *** STATE MUTATION ***
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_combo_control [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_data_source [UI]  (subtree shown above)
│   │   │   │   ├── add_combo_item [UI]  (subtree shown above)
│   │   │   │   ├── set_combo_callback [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── editor_create_edit_control [UI] *** STATE MUTATION ***
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_edit_control [UI]  (subtree shown above)
│   │   │   │   ├── set_edit_max_chars [UI]  (subtree shown above)
│   │   │   │   └── set_control_callback [UI]
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── load_gif_file [UI]  (subtree shown above)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   └── (8 FW callees filtered)
│   │   ├── FUN_004DAA51 [?]
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   └── (2 FW callees filtered)
│   ├── load_game_handler [MIXED] *** STATE MUTATION ***
│   │     Handles loading a saved game. Verifies the save file, resets game state, initializes city windows, refreshes the map ...
│   │   ├── FUN_0000994F [?]
│   │   ├── setup_map_status_bar [UI]
│   │   │     Sets up the map window status bar content: player name, language indicator, and map view filter options.
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_bold [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   ├── set_status_bar_text [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── unknown (dialog_set_title_and_redraw) [UI]
│   │   │       ├── invalidate_region [UI]  (subtree shown above)
│   │   │       └── unknown (dialog_render_title_bar) [UI]  (subtree shown above)
│   │   ├── initialize_map_view [UI]
│   │   │     Full initialization of a map view window: sets initial zoom/filter, creates the view bitmap surface, registers all ca...
│   │   │   ├── rect_get_width [UI]
│   │   │   ├── rect_get_height [UI]
│   │   │   ├── set_callback_paint [UI]
│   │   │   ├── set_callback_resize [UI]
│   │   │   ├── set_callback_0x30 [UI]
│   │   │   ├── set_callback_0x40 [UI]
│   │   │   ├── set_callback_0x44 [UI]
│   │   │   ├── set_scroll_amounts [UI]
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── setup_main_view_rect [UI]
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   ├── get_window_width [UI]
│   │   │   │   │   └── get_client_width [UI]
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   └── get_view_height [UI]
│   │   │   │       └── get_client_height [UI]
│   │   │   ├── setup_map_status_bar [UI]  (subtree shown above)
│   │   │   ├── init_map_viewport [UI]
│   │   │   ├── dialog_add_button [UI]
│   │   │   │   ├── init_editor_scrollbar [UI]  (subtree shown above)
│   │   │   │   └── widget_get_height [UI]
│   │   │   │       └── rect_get_height [UI]
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   └── (5 FW callees filtered)
│   │   ├── scenario_player_selection [GL] *** STATE MUTATION ***
│   │   │     Handles player selection for scenarios. Shows available civs with city/tech counts, allows gender and name customizat...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── mapgen_set_dialog_type [UI]  (subtree shown above)
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_end_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_number [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── open_list_dialog [UI]
│   │   │   │   └── open_dialog_extended [UI]
│   │   │   │       └── popup_parse_text_file [UI]  (subtree shown above)
│   │   │   ├── mp_list_invalidate_item [UI]
│   │   │   │   └── FUN_0000ABC7 [?]
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── mp_handle_player_turn [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── mp_check_password_or_set [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── mp_set_password [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── stop_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   └── mp_verify_password [UI]
│   │   │   │       ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │       ├── mp_prepare_password_dialog [UI]
│   │   │   │       ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   │       ├── popup_show_modal [UI]  (subtree shown above)
│   │   │   │       ├── popup_parse_text_file [UI]  (subtree shown above)
│   │   │   │       └── (4 FW callees filtered)
│   │   │   ├── mp_build_label_string [UI]
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── popup_set_position_fields [UI]
│   │   │   ├── popup_find_radio_option_by_id [UI]
│   │   │   ├── popup_set_radio_selected [UI]  (subtree shown above)
│   │   │   ├── popup_set_default_selection [UI]
│   │   │   │   ├── popup_find_radio_option_by_id [UI]
│   │   │   │   └── popup_find_button_by_id [UI]
│   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   ├── popup_show_modal [UI]  (subtree shown above)
│   │   │   ├── popup_parse_text_file [UI]  (subtree shown above)
│   │   │   └── (1 FW callees filtered)
│   │   ├── unknown (manage window) [UI]
│   │   │     Manages a window by calling manage_window_C5DA with the handle from in_ECX+8.
│   │   │   └── FUN_0000C5DA [?]
│   │   ├── credits_close [UI]
│   │   │     Closes the credits display window. Stops animations and destroys the window.
│   │   │   ├── flush_at_origin [UI]
│   │   │   │   └── port_alloc_rect [UI]  (subtree shown above)
│   │   │   ├── dialog_cleanup [UI]
│   │   │   │   ├── save_and_flush [UI]  (subtree shown above)
│   │   │   │   └── dialog_destroy_buttons [UI]
│   │   │   │       └── (1 FW callees filtered)
│   │   │   └── surface_list_clear [UI]
│   │   ├── init_cd_music [UI]
│   │   │     Initializes CD music playback system. Opens MCI device and queries disc.
│   │   │   └── (2 FW callees filtered)
│   │   ├── unknown (stop music) [UI]
│   │   │     Stops music playback and sets paused flag.
│   │   │   └── (1 FW callees filtered)
│   │   ├── resume_music [UI]
│   │   │     Resumes music if enabled. If paused, selects new random track. If disabled, stops.
│   │   │   ├── select_random_music_track [UI]
│   │   │   │   └── (2 FW callees filtered)
│   │   │   └── unknown (stop music) [UI]
│   │   │       └── (1 FW callees filtered)
│   │   ├── init_game_display [UI]
│   │   │     Initializes the game display. If DAT_006ad684 == 0, calls FUN_00421bd0 first. Then calls display update functions.
│   │   │   ├── flush_display [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── init_palette_system [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── (1 FW callees filtered)
│   │   ├── start_human_turn [UI]  (subtree shown above)
│   │   ├── activate_current_unit [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── mp_handle_player_turn [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── parleywin_focus_negotiate [UI]
│   │   │     Sets focus to the negotiation parley window object (DAT_0067a7f0), then closes.
│   │   │   ├── parleywin_close [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │   │   └── FUN_0000C44D [?]
│   │   │   │   ├── unknown (get drawing context) [UI]  (subtree shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── init_game_display [UI]  (subtree shown above)
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── get_active_control [UI]
│   │   │   └── set_active_control [UI]
│   │   ├── parleywin_focus_chat [UI]
│   │   │     Sets focus to the chat parley window object (DAT_0068ac30), then closes.
│   │   │   ├── parleywin_close [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   └── set_active_control [UI]
│   │   ├── widget_set_size [UI]
│   │   │     Sets a widget's size by calling FUN_005bc713 with the widget's window handle and param_1.
│   │   │   └── move_window_from_rect [UI]
│   │   │       ├── rect_get_width [UI]
│   │   │       └── rect_get_height [UI]
│   │   ├── init_city_windows_layout [MIXED] *** STATE MUTATION ***
│   │   │     Initializes the layout of all city windows. Computes window positions based on screen resolution (standard or hi-res ...
│   │   │   ├── FUN_0000994F [?]
│   │   │   ├── FUN_00009A49 [?]
│   │   │   ├── status_panel_calc_rect [UI]
│   │   │   │   ├── get_window_width [UI]  (subtree shown above)
│   │   │   │   └── set_rect_wh [UI]
│   │   │   ├── get_window_width [UI]  (subtree shown above)
│   │   │   ├── save_and_flush [UI]  (subtree shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── setup_main_view_rect [UI]  (subtree shown above)
│   │   │   ├── get_view_height [UI]  (subtree shown above)
│   │   │   ├── unknown (manage window) [UI]  (subtree shown above)
│   │   │   ├── init_game_display [UI]  (subtree shown above)
│   │   │   ├── widget_set_size [UI]  (subtree shown above)
│   │   │   ├── unknown — manage window [UI]  (subtree shown above)
│   │   │   ├── calc_main_window_rect [UI]
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   ├── rect_get_height [UI]
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   └── get_view_height [UI]  (subtree shown above)
│   │   │   └── set_active_surface [UI]  (subtree shown above)
│   │   ├── update_menu_state [MIXED]  (subtree shown above)
│   │   ├── unknown — manage window [UI]  (subtree shown above)
│   │   ├── pedia_close_display [UI]
│   │   │     Closes the Civilopedia display panel. Resets navigation state, frees resources, restores previous UI.
│   │   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │   ├── unknown (get drawing context) [UI]  (subtree shown above)
│   │   │   ├── init_game_display [UI]  (subtree shown above)
│   │   │   └── (1 FW callees filtered)
│   │   ├── pedia_load_index_data [UI]
│   │   │     Loads all Civilopedia index data from the describe.txt file. Parses 7 sections: advances, improvements, wonders, unit...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── pedia_sort_entries [UI]
│   │   │   └── (6 FW callees filtered)
│   │   ├── stop_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── start_turn_timer [MIXED] *** STATE MUTATION ***
│   │   │     Starts the turn timer — closes open windows, calculates remaining time, creates a 500ms repeating timer, sends MP not...
│   │   │   ├── FUN_0000994F [?]
│   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   ├── credits_invalidate [UI]
│   │   │   ├── unknown (throne room timer/idle handler) [UI]
│   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── unknown (pedia_invalidate_cache) [UI]
│   │   │   ├── unknown (dialog_render_title_bar) [UI]  (subtree shown above)
│   │   │   └── (3 FW callees filtered)
│   │   ├── resume_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── show_game_options_dialog [MIXED] *** STATE MUTATION ***
│   │     Shows the game options dialog with 11 checkboxes. On OK, reads checkbox states and updates the game options flags (so...
│   │   ├── show_message [UI]
│   │   │     Stores a message string in the message buffer at the specified slot index.
│   │   │   └── (1 FW callees filtered)
│   │   ├── unknown (dialog show with section) [UI]
│   │   │     Opens a dialog/section by calling thunk_FUN_00419100 with DAT_006359d4 and the two parameters.
│   │   │   └── show_help_topic_ext [UI]
│   │   │       └── show_help_dialog [UI]
│   │   │           └── FUN_0051D3E0 [?]
│   │   ├── init_cd_music [UI]
│   │   │     Initializes CD music playback system. Opens MCI device and queries disc.
│   │   │   └── (2 FW callees filtered)
│   │   ├── unknown (stop music) [UI]
│   │   │     Stops music playback and sets paused flag.
│   │   │   └── (1 FW callees filtered)
│   │   ├── resume_music [UI]  (subtree shown above)
│   │   ├── save_civ2_dat [GL]
│   │   │     Saves CIV2.DAT preferences file. On write failure, deletes the file to avoid corruption.
│   │   ├── set_checkbox_state [UI]
│   │   │     Sets a dialog checkbox state. Converts param_2 to boolean (!=0) and calls the checkbox setter.
│   │   │   └── FUN_0051D7D6 [?]
│   │   ├── FUN_0051D7BC [?]
│   │   ├── FUN_0051D817 [?]
│   │   └── (4 FW callees filtered)
│   ├── show_graphic_options_dialog [MIXED] *** STATE MUTATION ***
│   │     Shows graphic options dialog with 6 checkboxes for display settings (throne room, animated heralds, high-res maps, et...
│   │   ├── unknown (dialog show with section) [UI]  (subtree shown above)
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── save_civ2_dat [GL]
│   │   │     Saves CIV2.DAT preferences file. On write failure, deletes the file to avoid corruption.
│   │   ├── set_checkbox_state [UI]  (subtree shown above)
│   │   ├── FUN_0051D7BC [?]
│   │   ├── FUN_0051D817 [?]
│   │   └── (1 FW callees filtered)
│   ├── show_multiplayer_options_dialog [MIXED] *** STATE MUTATION ***
│   │     Shows multiplayer game options dialog. Handles turn timer and unit movement doubling settings, with server coordinati...
│   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   ├── unknown (dialog show with section) [UI]  (subtree shown above)
│   │   ├── mp_show_wait_dialog [UI]  (subtree shown above)
│   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── save_civ2_dat [GL]
│   │   │     Saves CIV2.DAT preferences file. On write failure, deletes the file to avoid corruption.
│   │   ├── set_checkbox_state [UI]  (subtree shown above)
│   │   ├── toggle_unit_movement_doubling [GL] *** STATE MUTATION ***
│   │   │     Toggles unit movement point doubling for multiplayer. Doubles or halves all land unit movement points.
│   │   │   └── refresh_status_panel [UI]  (subtree shown above)
│   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   ├── FUN_0051D7BC [?]
│   │   ├── FUN_0051D817 [?]
│   │   └── (5 FW callees filtered)
│   ├── show_message_options_dialog [MIXED] *** STATE MUTATION ***
│   │     Shows message notification options dialog with 11 checkboxes controlling which game events generate notifications.
│   │   ├── unknown (dialog show with section) [UI]  (subtree shown above)
│   │   ├── save_civ2_dat [GL]
│   │   │     Saves CIV2.DAT preferences file. On write failure, deletes the file to avoid corruption.
│   │   ├── FUN_0051D7BC [?]
│   │   ├── FUN_0051D7D6 [?]
│   │   └── FUN_0051D817 [?]
│   ├── handle_quit_or_retire [MIXED] *** STATE MUTATION ***
│   │     Handles the quit or retire game action. Shows confirmation dialog, optionally shows retirement score screens, then ei...
│   │   ├── show_message [UI]
│   │   │     Stores a message string in the message buffer at the specified slot index.
│   │   │   └── (1 FW callees filtered)
│   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   ├── center_all_map_views [UI]  (subtree shown above)
│   │   ├── render_power_graph [UI]  (subtree shown above)
│   │   ├── show_attitude_dialog [UI]  (subtree shown above)
│   │   ├── show_score_dialog [UI]  (subtree shown above)
│   │   ├── submit_hall_of_fame_entry [MIXED] *** STATE MUTATION ***
│   │   │     Constructs a new Hall of Fame entry from current game state, inserts it into the sorted list, saves to file, and show...
│   │   │   ├── show_hall_of_fame_dialog [UI]
│   │   │   │   ├── rect_get_height [UI]
│   │   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   │   ├── set_button_owner [UI]  (subtree shown above)
│   │   │   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   │   │   ├── set_button_click_callback [UI]
│   │   │   │   ├── advisor_create_close_button [UI]
│   │   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── civ_calc_total_population [GL]
│   │   │   │   └── city_calc_population_points [GL]
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── (4 FW callees filtered)
│   │   ├── unknown (stop music) [UI]
│   │   │     Stops music playback and sets paused flag.
│   │   │   └── (1 FW callees filtered)
│   │   ├── clear_game_active_flag [GL]
│   │   │     Sets DAT_00628044 = 0, clearing the "game active" flag.
│   │   ├── get_civ_noun_name [GL]
│   │   │     Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│   │   │   └── (1 FW callees filtered)
│   │   ├── get_civ_leader_title [GL]
│   │   │     Returns the leader title for a civilization based on civ type and government. Uses custom title if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── get_civ_people_name [GL]
│   │   │     Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── parleywin_focus_negotiate [UI]  (subtree shown above)
│   │   ├── parleywin_focus_chat [UI]  (subtree shown above)
│   │   ├── kill_or_retire_civ [GL] *** STATE MUTATION ***
│   │   │     Removes a civilization from the game (kill or retire). Destroys all units, removes cities, updates map visibility, an...
│   │   │   ├── is_tile_valid [GL]
│   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   ├── remove_trade_route [GL] *** STATE MUTATION ***
│   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── unknown (stop music) [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── redraw_map_all_players [UI]  (subtree shown above)
│   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   ├── reset_spaceship [GL] *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── spy_diplomat_action [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   ├── delete_unit_safely [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   ├── get_tile_city_radius_owner [GL]  (subtree shown above)
│   │   │   ├── get_tile_fertility [GL]  (subtree shown above)
│   │   │   ├── get_tile_controller [GL]  (subtree shown above)
│   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── set_tile_fertility [GL] *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   └── queue_map_update [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── set_tile_city_radius_owner [GL] *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   └── queue_map_update [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   ├── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   └── (2 FW callees filtered)
│   │   └── enqueue_mp_event [MIXED]  (subtree shown above)
│   ├── show_govt_council [UI]
│   │     Shows the government council (full advisor council with video). Sets DAT_00631ad0=1, constructs the council, initiali...
│   │   ├── unknown (stop music) [UI]
│   │   │     Stops music playback and sets paused flag.
│   │   │   └── (1 FW callees filtered)
│   │   ├── resume_music [UI]  (subtree shown above)
│   │   ├── govt_council_construct [UI]
│   │   │     Constructs the government council dialog. Initializes base class, creates popup surface, dialog, 6 sub-windows. Sets ...
│   │   │   ├── init_sprite_surface_mgr [UI]  (subtree shown above)
│   │   │   ├── unknown (pedia object initializer) [UI]
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   └── (2 FW callees filtered)
│   │   ├── council_video_init [UI]
│   │   │     Initializes the government council video system. Creates the dialog surface, gets advisor recommendations, loads advi...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_number [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │   └── unknown (update pedia display surface) [UI]
│   │   │   │       └── select_palette [UI]
│   │   │   ├── pedia_clear_selection [UI]  (subtree shown above)
│   │   │   ├── unknown (set_font_size) [UI]  (subtree shown above)
│   │   │   ├── council_draw_panels [UI]
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   │   ├── text_newline [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   │   ├── draw_3d_border [UI]  (subtree shown above)
│   │   │   │   ├── tile_bitmap [UI]  (subtree shown above)
│   │   │   │   ├── port_fill_rect [UI]
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   ├── port_lock [UI]  (subtree shown above)
│   │   │   │   │   ├── surface_is_locked [UI]
│   │   │   │   │   ├── get_surface_buffer_handle [UI]
│   │   │   │   │   ├── check_topdown [UI]
│   │   │   │   │   └── fill_rect_8bit [UI]
│   │   │   │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── council_create_buttons [UI]
│   │   │   │   ├── set_button_click_callback [UI]
│   │   │   │   ├── intel_create_button [UI]
│   │   │   │   │   └── create_text_button [UI]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── council_parse_advisor_script [UI]
│   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── (7 FW callees filtered)
│   │   │   ├── council_load_all_videos [UI]
│   │   │   │   └── (10 FW callees filtered)
│   │   │   ├── get_advisor_recommendation [GL]
│   │   │   │   ├── ai_assess_military_posture [AI]
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── ai_assess_city_defense [AI]
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── ai_assess_economy [AI]
│   │   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   │   ├── distribute_trade [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (5 more callees, depth limit)
│   │   │   │   │   └── calc_building_upkeep_cost [GL]
│   │   │   │   │       └── ... (2 more callees, depth limit)
│   │   │   │   ├── ai_assess_diplomacy [AI]
│   │   │   │   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   │   │   │   └── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   └── ai_assess_tax_rate [AI] *** STATE MUTATION ***
│   │   │   │       ├── has_building [GL]  (subtree shown above)
│   │   │   │       └── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── show_input_dialog_int [UI]
│   │   │   │   └── FUN_0051D75D [?]
│   │   │   ├── get_civ_era_level [GL]
│   │   │   │   └── civ_has_tech [GL]  (subtree shown above)
│   │   │   ├── popup_dialog_open [UI]  (subtree shown above)
│   │   │   ├── create_offscreen_surface_b [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   └── (8 FW callees filtered)
│   │   ├── council_video_run [UI]
│   │   │     Runs the government council video playback loop. Flips surfaces, suspends music, initializes display, shows all panel...
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── control_invalidate [UI]  (subtree shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│   │   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │   └── FUN_0000C763 [?]
│   │   │   ├── fade_out_palette [UI]
│   │   │   │   ├── wait_for_animation [UI]  (subtree shown above)
│   │   │   │   ├── apply_palette_to_surfaces [UI]
│   │   │   │   │   ├── unknown (realize all palettes) [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── port_load_tga_file [UI]
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── restore_palette_entries [UI]
│   │   │   │   │   ├── palette_apply [UI]  (subtree shown above)
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── unknown (realize all palettes) [UI]  (subtree shown above)
│   │   │   │   ├── palette_setup_crossfade [UI]
│   │   │   │   │   ├── unknown (palette apply with range) [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   └── (5 FW callees filtered)
│   │   │   │   ├── palette_restore_from_crossfade [UI]
│   │   │   │   │   ├── palette_set_entries [UI]  (subtree shown above)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   └── palette_crossfade_step [UI]
│   │   │   │       ├── FUN_0000EA62 [?]
│   │   │   │       ├── unknown (palette_set_entry_raw) [UI]
│   │   │   │       └── (3 FW callees filtered)
│   │   │   ├── fade_in_palette [UI]
│   │   │   │   ├── wait_for_animation [UI]  (subtree shown above)
│   │   │   │   ├── unknown (realize palettes) [UI]
│   │   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   └── set_active_surface [UI]  (subtree shown above)
│   │   │   │   ├── restore_palette_entries [UI]  (subtree shown above)
│   │   │   │   ├── unknown (realize all palettes) [UI]  (subtree shown above)
│   │   │   │   ├── palette_setup_crossfade [UI]  (subtree shown above)
│   │   │   │   ├── palette_restore_from_crossfade [UI]  (subtree shown above)
│   │   │   │   └── palette_crossfade_step [UI]  (subtree shown above)
│   │   │   ├── council_draw_panels [UI]  (subtree shown above)
│   │   │   ├── video_set_position [UI]
│   │   │   │   └── move_window_to [UI]
│   │   │   │       ├── rect_get_width [UI]
│   │   │   │       └── rect_get_height [UI]
│   │   │   ├── unknown (set popup parent A) [UI]
│   │   │   ├── popup_dialog_destroy [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   └── (2 FW callees filtered)
│   │   └── (3 FW callees filtered)
│   ├── FUN_0051C635 [?]
│   ├── mp_join_game_handler [MIXED] *** STATE MUTATION ***
│   │     Handles a player joining a multiplayer game. Temporarily sets the player bitmask to the full session mask, shows the ...
│   │   ├── FUN_0000994F [?]
│   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   ├── init_palette_system [UI]
│   │   │     Initializes the palette system.
│   │   │   └── (1 FW callees filtered)
│   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │     Sets a string control value in the multiplayer dialog string table. Copies param_2 into the string slot at index para...
│   │   │   └── (1 FW callees filtered)
│   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │     Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   ├── get_civ_people_name [GL]
│   │   │     Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── mp_choose_additional_player [MIXED] *** STATE MUTATION ***
│   │   │     Shows a dialog for choosing an additional player to join a multiplayer game. Similar to mp_choose_players_dialog but ...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── mapgen_set_dialog_type [UI]  (subtree shown above)
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_end_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_number [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   │   ├── mp_list_invalidate_item [UI]  (subtree shown above)
│   │   │   ├── disable_civ_slot [UI]
│   │   │   │   └── FUN_0000ABC7 [?]
│   │   │   ├── unknown (set selected item) [UI]
│   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── mp_handle_player_turn [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── mp_build_label_string [UI]
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   ├── popup_set_position_fields [UI]
│   │   │   ├── popup_find_radio_option_by_id [UI]
│   │   │   ├── popup_set_radio_selected [UI]  (subtree shown above)
│   │   │   ├── popup_set_default_selection [UI]  (subtree shown above)
│   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   ├── popup_show_modal [UI]  (subtree shown above)
│   │   │   ├── popup_parse_text_file [UI]  (subtree shown above)
│   │   │   └── (1 FW callees filtered)
│   │   ├── stop_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── resume_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   └── popup_dialog_create [UI]  (subtree shown above)
│   ├── open_events_editor [UI]
│   │     Entry point for opening the events editor. Creates the window frame, initializes the editor, then cleans up.
│   │   ├── events_editor_init [MIXED] *** STATE MUTATION ***
│   │   │     Initializes and runs the full events editor dialog. Creates all UI elements (listboxes, buttons), loads event data, e...
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── process_messages [UI]  (subtree shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   ├── set_editor_font [UI]  (subtree shown above)
│   │   │   ├── create_listbox_control [UI]  (subtree shown above)
│   │   │   ├── set_listbox_data_source [UI]  (subtree shown above)
│   │   │   ├── event_mgr_ctor [GL]
│   │   │   │   ├── event_mgr_init [GL]
│   │   │   │   │   └── event_mgr_reset_pool [GL]
│   │   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── event_mgr_init [GL]  (subtree shown above)
│   │   │   ├── update_event_action_buttons [UI]
│   │   │   │   ├── pedia_clear_selection [UI]  (subtree shown above)
│   │   │   │   ├── pedia_set_selection [UI]  (subtree shown above)
│   │   │   │   ├── unknown [UI]
│   │   │   │   │   └── FUN_00003DBF [?]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── populate_trigger_listbox [UI]
│   │   │   │   ├── add_listbox_item [UI]  (subtree shown above)
│   │   │   │   ├── clear_listbox [UI]  (subtree shown above)
│   │   │   │   ├── update_event_action_buttons [UI]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── populate_action_listbox [UI]
│   │   │   │   ├── add_listbox_item [UI]  (subtree shown above)
│   │   │   │   ├── clear_listbox [UI]  (subtree shown above)
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── update_event_action_buttons [UI]  (subtree shown above)
│   │   │   │   ├── unknown [UI]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown [UI]
│   │   │   │   └── FUN_00003E92 [?]
│   │   │   ├── unknown [UI]
│   │   │   ├── unknown [UI]
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   └── (10 FW callees filtered)
│   │   └── (3 FW callees filtered)
│   ├── toggle_cheat_mode [MIXED] *** STATE MUTATION ***
│   │     Toggles cheat mode on/off. Shows confirmation dialog, optionally creates a scenario folder. Sets flag bits 0x8000 in ...
│   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   ├── show_help_topic [UI]  (subtree shown above)
│   │   ├── update_menu_state [MIXED]  (subtree shown above)
│   │   └── create_scenario_folder [UI] *** STATE MUTATION ***
│   │         Creates a new scenario folder. Prompts user for name, validates it, checks for duplicates, creates the directory and ...
│   │       ├── show_message [UI]
│   │       │   └── (1 FW callees filtered)
│   │       ├── show_help_topic [UI]  (subtree shown above)
│   │       ├── write_save_file [GL] *** STATE MUTATION ***
│   │       │   ├── pack_viewport_state [GL] *** STATE MUTATION ***
│   │       │   │   └── (1 FW callees filtered)
│   │       │   ├── civ_has_tech [GL]  (subtree shown above)
│   │       │   ├── save_map_data [GL]
│   │       │   └── (8 FW callees filtered)
│   │       ├── FUN_0051D63B [?]
│   │       ├── validate_folder_name [UI]
│   │       └── (2 FW callees filtered)
│   ├── toggle_cheat_multiplayer [MIXED] *** STATE MUTATION ***
│   │     Toggles cheat mode in multiplayer. Checks if any password-protected players exist; if so, shows warning and refuses. ...
│   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   ├── show_help_topic [UI]  (subtree shown above)
│   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │     Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── update_menu_state [MIXED]  (subtree shown above)
│   │   ├── stop_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   └── resume_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── cheat_edit_tech [MIXED] *** STATE MUTATION ***
│   │     Cheat dialog for editing technologies of a civ. Shows list of all techs with indicators for known/available status. A...
│   │   ├── FUN_00009429 [?]
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_string [UI]
│   │   │     Appends a string to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── text_newline [UI]
│   │   │     Adds a newline to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── display_improvement [UI]
│   │   │     Adds an improvement/government icon to the text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── cheat_pick_civ [MIXED]
│   │   │     Shows a civilization picker dialog — lists all active civs (skipping barbarians if param_1==0). Returns selected civ ...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   ├── popup_set_default_selection [UI]  (subtree shown above)
│   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   └── (2 FW callees filtered)
│   │   ├── cheat_toggle_all_tech [GL] *** STATE MUTATION ***
│   │   │     Toggles all technologies for a civ. If civ doesn't have all techs, grants all 100. If it does, removes them all. Upda...
│   │   │   ├── FUN_00009429 [?]
│   │   │   ├── debug_show_message [UI]  (subtree shown above)
│   │   │   └── handle_tech_discovery [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_set_default_selection [UI]  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   └── bit_index_to_byte_mask [GL]
│   │         Converts a bit index to byte offset and bit mask. `*param_2 = param_1 >> 3` (byte), `*param_3 = 1 << (param_1 & 7)` (...
│   ├── cheat_edit_terrain [MIXED] *** STATE MUTATION ***
│   │     Cheat terrain editor. Allows changing terrain type and improvement flags on the tile at cursor position. For ocean/la...
│   │   ├── is_tile_valid [GL]
│   │   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── show_help_topic_ext [UI]  (subtree shown above)
│   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   ├── FUN_0051D7D6 [?]
│   │   ├── FUN_0051D817 [?]
│   │   ├── popup_dialog_reset [UI]
│   │   │     Resets all fields of a popup dialog structure to default values. Initializes counters, positions, colors, margins, bu...
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_dialog_destroy [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   ├── wrap_x [GL]
│   │   │     Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── cheat_place_unit [MIXED] *** STATE MUTATION ***
│   │     Cheat: places a new unit at cursor position. Shows filterable unit type list (can toggle veteran, obsolete, and prere...
│   │   ├── is_tile_valid [GL]
│   │   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_label_id [UI]
│   │   │     Appends a localized label (by ID) to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── display_improvement [UI]
│   │   │     Adds an improvement/government icon to the text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_set_default_selection [UI]  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   ├── create_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── cheat_edit_unit_at_cursor [UI] *** STATE MUTATION ***
│   │     Cheat: opens unit editor for the top unit at cursor position.
│   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   └── delete_all_units_in_stack [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── cheat_edit_unit [MIXED] *** STATE MUTATION ***
│   │     Cheat unit editor dialog. Allows editing veteran status, movement points, hit points, home city, fortification, and t...
│   │   ├── is_tile_valid [GL]
│   │   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_label_id [UI]
│   │   │     Appends a localized label (by ID) to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── text_newline [UI]
│   │   │     Adds a newline to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_begin_italic [UI]
│   │   │     Begins italic text mode in the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_end_italic [UI]
│   │   │     Ends italic text mode in the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── display_improvement [UI]
│   │   │     Adds an improvement/government icon to the text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── show_message [UI]
│   │   │     Stores a message string in the message buffer at the specified slot index.
│   │   │   └── (1 FW callees filtered)
│   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   ├── show_input_dialog_int [UI]  (subtree shown above)
│   │   ├── FUN_0051D7D6 [?]
│   │   ├── FUN_0051D817 [?]
│   │   ├── refresh_status_panel [UI]  (subtree shown above)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   ├── get_unit_max_hp [GL]
│   │   │     Returns the maximum hit points for a unit based on its type.
│   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   ├── show_unit_list_dialog [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── cheat_edit_civ [GL] *** STATE MUTATION ***
│   │     Comprehensive cheat civ editor. 12+ options: edit treaties, attitudes, betrayal count, reset patience, reset all cont...
│   ├── cheat_edit_scenario [GL] *** STATE MUTATION ***
│   │     Master scenario editor dialog with 12+ options: paradigm shift, year increment, start year, max turns, clear/set fog ...
│   ├── cheat_save_game [UI]
│   │     Saves the current game via thunk_save_game(1).
│   ├── end_turn_prompt [MIXED] *** STATE MUTATION ***
│   │     End-turn prompt handler. Stops timer, checks if user wants to end turn (via thunk_FUN_0051ea8e). If yes and no timer,...
│   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── game_timer_dialog [MIXED] *** STATE MUTATION ***
│   │   │     Shows the game timer configuration dialog. Supports preset times (30s to 5min) and custom entry. For multiplayer, bro...
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   ├── mp_show_wait_dialog [UI]  (subtree shown above)
│   │   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   ├── mp_set_animation_style [UI]
│   │   │   │   └── show_popup_window [UI]
│   │   │   │       ├── set_callback_0x30 [UI]
│   │   │   │       ├── set_callback_0x38 [UI]
│   │   │   │       ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   │       ├── dialog_create [UI]  (subtree shown above)
│   │   │   │       ├── unknown [UI]
│   │   │   │       ├── calc_window_position [UI]
│   │   │   │       ├── get_popup_dimensions [UI]
│   │   │   │       └── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── unknown [UI]
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   ├── popup_set_position_fields [UI]
│   │   │   ├── popup_set_default_selection [UI]  (subtree shown above)
│   │   │   ├── popup_show_modal [UI]  (subtree shown above)
│   │   │   ├── popup_parse_text_file [UI]  (subtree shown above)
│   │   │   └── (3 FW callees filtered)
│   │   ├── unknown (dialog_render_title_bar) [UI]  (subtree shown above)
│   │   ├── stop_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── start_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   └── resume_turn_timer [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── menu_set_subitem_grayed [UI]
│   │     Sets or clears the grayed/disabled state of a sub-menu item (bit 2). Updates native menu if populated and visible.
│   │   ├── menu_find_subitem_by_id [UI]
│   │   │     Searches all top-level menu items and their sub-item lists for a sub-item with matching ID (param_1). Returns the sub...
│   │   └── menu_toggle_item_grayed [UI]  (subtree shown above)
│   ├── cosmic_editor_launch [UI]
│   │     Launches the cosmic parameter editor. Creates a property sheet, initializes the editor window, then cleans up on close.
│   │   ├── cosmic_editor_init_window [UI]
│   │   │     Creates and initializes the full cosmic parameter editor window with all controls (list, buttons for OK/Cancel/Help/E...
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── process_messages [UI]  (subtree shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   ├── set_button_owner [UI]  (subtree shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   ├── set_editor_font [UI]  (subtree shown above)
│   │   │   ├── create_listbox_control [UI]  (subtree shown above)
│   │   │   ├── set_listbox_data_source [UI]  (subtree shown above)
│   │   │   ├── unknown [UI]  (subtree shown above)
│   │   │   ├── unknown [UI]
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── cosmic_editor_save_restore [MIXED] *** STATE MUTATION ***
│   │   │   │   └── parse_cosmic_parameters [GL] *** STATE MUTATION ***
│   │   │   │       ├── read_cosmic_param_clamped [GL]
│   │   │   │       └── (1 FW callees filtered)
│   │   │   ├── cosmic_editor_display_list [UI]
│   │   │   │   ├── add_listbox_item [UI]  (subtree shown above)
│   │   │   │   ├── clear_listbox [UI]  (subtree shown above)
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   └── (10 FW callees filtered)
│   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── unit_order_wake_all_own [GL] *** STATE MUTATION ***
│   │     Wakes all of the current player's units by refreshing their movement points.
│   │   └── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── move_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── spaceship_view_menu [UI]
│   │     Shows the "View Spaceships" menu. Lists all civs with active space programs, lets the player select one to view, then...
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── get_civ_people_name [GL]
│   │   │     Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── has_spaceship_built [GL]
│   │   │     Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   │   ├── load_civ_power_values [GL] *** STATE MUTATION ***
│   │   │     Loads 6 power values from a civ's data (at offset 0x594*param_1 into per-civ data) into global array DAT_006a5b10.
│   │   ├── show_wonder_or_advance [UI]
│   │   │     Shows either a wonder movie (negative param) or advance animation (positive param). Creates the wonder window, initia...
│   │   │   ├── wonder_win_init [UI] *** STATE MUTATION ***
│   │   │   │   ├── init_sprite_surface_mgr [UI]  (subtree shown above)
│   │   │   │   ├── init_render_surface [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (pedia object initializer) [UI]
│   │   │   │   ├── port_alloc_rect [UI]  (subtree shown above)
│   │   │   │   ├── port_set_color [UI]  (subtree shown above)
│   │   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── wonder_win_create [UI]
│   │   │   │   ├── set_window_style_flags [UI]
│   │   │   │   │   └── load_and_store_cursor [UI]
│   │   │   │   ├── pedia_set_resource [UI]
│   │   │   │   │   └── (2 FW callees filtered)
│   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   ├── wonder_win_create_dialog [UI]
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   ├── update_palette [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── unknown (GDI operation on pedia window) [UI]  (subtree shown above)
│   │   │   │   │   ├── create_offscreen_surface_b [UI]  (subtree shown above)
│   │   │   │   │   ├── load_gif_resource [UI]  (subtree shown above)
│   │   │   │   │   ├── surface_init_8 [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   ├── build_wonder_info_text [UI]
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   ├── spaceship_get_max_component [GL]
│   │   │   │   │   └── (10 FW callees filtered)
│   │   │   │   ├── wonder_win_draw_buttons [UI]
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   ├── FUN_004D56FD [?]
│   │   │   │   │   ├── load_gif_resource [UI]  (subtree shown above)
│   │   │   │   │   ├── port_measure_text [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   ├── wonder_win_setup_hotspots [UI]
│   │   │   │   │   └── create_button_hotspot [UI]
│   │   │   │   │       └── ... (1 more callees, depth limit)
│   │   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_year_from_turn [GL]
│   │   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   │   ├── spaceship_get_clamped_count [GL]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── spaceship_calc_population_capacity [GL]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── show_advance_animation [UI] *** STATE MUTATION ***
│   │   │   │   ├── manage_window_show [UI]
│   │   │   │   │   └── FUN_0000C40A [?]
│   │   │   │   ├── start_cursor_blink [UI]
│   │   │   │   │   ├── get_view_window_handle [UI]
│   │   │   │   │   └── capture_mouse [UI]
│   │   │   │   ├── stop_cursor_blink [UI]  (subtree shown above)
│   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│   │   │   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │   │   ├── load_civ_power_values [GL] *** STATE MUTATION ***
│   │   │   │   ├── wonder_win_draw_title [UI]
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   ├── text_newline [UI]
│   │   │   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   ├── port_measure_text [UI]  (subtree shown above)
│   │   │   │   │   └── unknown (set/get draw color) [UI]
│   │   │   │   ├── build_advance_scene [UI]
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   ├── wonder_win_draw_title [UI]  (subtree shown above)
│   │   │   │   │   ├── spaceship_get_clamped_count [GL]  (subtree shown above)
│   │   │   │   │   ├── load_gif_resource [UI]  (subtree shown above)
│   │   │   │   │   ├── port_set_color [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   │   │   └── (3 FW callees filtered)
│   │   │   │   ├── wonder_win_show_starfield [UI]
│   │   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   │   ├── advance_year_display [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── wonder_win_draw_next_char [UI]
│   │   │   │   │   │   └── ... (9 more callees, depth limit)
│   │   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── port_fill_rect [UI]  (subtree shown above)
│   │   │   │   │   ├── port_draw_text_at [UI]
│   │   │   │   │   │   └── ... (2 more callees, depth limit)
│   │   │   │   │   ├── port_measure_text [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   │   │   └── (6 FW callees filtered)
│   │   │   │   ├── play_wonder_video [UI]
│   │   │   │   │   ├── set_callback_paint [UI]
│   │   │   │   │   ├── end_paint [UI]  (subtree shown above)
│   │   │   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   │   │   ├── start_cursor_blink [UI]  (subtree shown above)
│   │   │   │   │   ├── stop_cursor_blink [UI]  (subtree shown above)
│   │   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (GDI operation on pedia window) [UI]  (subtree shown above)
│   │   │   │   │   ├── unknown (stop music) [UI]
│   │   │   │   │   ├── resume_music [UI]  (subtree shown above)
│   │   │   │   │   ├── port_set_color [UI]  (subtree shown above)
│   │   │   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   │   │   └── (10 FW callees filtered)
│   │   │   │   ├── wonder_win_setup_hotspots [UI]  (subtree shown above)
│   │   │   │   ├── wonder_win_draw_initial_buttons [UI]
│   │   │   │   │   ├── wonder_win_draw_button_left [UI]
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   ├── wonder_win_draw_button_right [UI]
│   │   │   │   │   │   └── ... (3 more callees, depth limit)
│   │   │   │   │   └── port_fill_rect [UI]  (subtree shown above)
│   │   │   │   ├── wonder_win_draw_button_left [UI]  (subtree shown above)
│   │   │   │   ├── wonder_win_draw_button_right [UI]  (subtree shown above)
│   │   │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   │   │   ├── change_city_production [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │   ├── show_wonder_or_advance [UI]  (subtree shown above)
│   │   │   │   │   └── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   │   │   ├── load_gif_resource [UI]  (subtree shown above)
│   │   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]  (subtree shown above)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── show_wonder_movie [UI]
│   │   │   │   ├── manage_window_show [UI]  (subtree shown above)
│   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│   │   │   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │   │   ├── show_advance_animation [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── play_wonder_video [UI]  (subtree shown above)
│   │   │   └── (3 FW callees filtered)
│   │   ├── spaceship_dialog [UI] *** STATE MUTATION ***
│   │   │     Displays the spaceship status dialog for a civ. Shows all component counts, ratios (fuel, energy, life support), mass...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_bold [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_end_bold [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_end_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── display_improvement [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_number [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── show_message [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   ├── dialog_set_title [UI]  (subtree shown above)
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── has_spaceship_launched [GL]
│   │   │   ├── spaceship_get_max_component [GL]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   ├── popup_dialog_close [UI]  (subtree shown above)
│   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   ├── popup_add_action_button_label [UI]
│   │   │   │   └── (2 FW callees filtered)
│   │   │   └── (1 FW callees filtered)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_dialog_close [UI]  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   └── (2 FW callees filtered)
│   └── editor_launch [UI]
│         Launches the unit type editor.
│       ├── editor_init_window [UI]
│       │     Creates and runs the full unit type editor window. Loads editor artwork, creates 13 spinner controls and 5 listbox co...
│       │   ├── set_callback_0x44 [UI]
│       │   ├── show_window_wrapper [UI]  (subtree shown above)
│       │   ├── set_rect_wh [UI]
│       │   ├── process_messages [UI]  (subtree shown above)
│       │   ├── get_font_height [UI]
│       │   ├── set_dialog_enabled [UI]
│       │   ├── create_text_button [UI]  (subtree shown above)
│       │   ├── set_button_handler [UI]  (subtree shown above)
│       │   ├── set_button_click_callback [UI]
│       │   ├── set_editor_font [UI]  (subtree shown above)
│       │   ├── set_combo_selection [UI]  (subtree shown above)
│       │   ├── init_editor_scrollbar [UI]  (subtree shown above)
│       │   ├── widget_get_height [UI]  (subtree shown above)
│       │   ├── dialog_create [UI]  (subtree shown above)
│       │   ├── editor_save_unit_types_to_buffer [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── FUN_005AF343 [?]
│       │   ├── (editor_toggle_buttons) [UI]
│       │   │   ├── control_invalidate [UI]  (subtree shown above)
│       │   │   ├── get_combo_selection [UI]  (subtree shown above)
│       │   │   └── (1 FW callees filtered)
│       │   ├── editor_populate_listbox [UI]
│       │   │   ├── set_rect_wh [UI]
│       │   │   ├── create_combo_control [UI]  (subtree shown above)
│       │   │   ├── set_combo_data_source [UI]  (subtree shown above)
│       │   │   ├── add_combo_item [UI]  (subtree shown above)
│       │   │   ├── set_combo_callback [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── (editor_create_spinner) [UI]
│       │   │   ├── set_rect_wh [UI]
│       │   │   ├── create_edit_control [UI]  (subtree shown above)
│       │   │   ├── set_edit_max_chars [UI]  (subtree shown above)
│       │   │   └── set_control_callback [UI]
│       │   ├── set_active_surface [UI]  (subtree shown above)
│       │   ├── load_gif_file [UI]  (subtree shown above)
│       │   ├── modal_dialog_run [UI]  (subtree shown above)
│       │   ├── palette_init [UI]  (subtree shown above)
│       │   └── (10 FW callees filtered)
│       ├── set_active_surface [UI]  (subtree shown above)
│       └── (3 FW callees filtered)
├── map_ascii [MIXED] *** STATE MUTATION ***  -- deferred UI: map ASCII key
│     Main keyboard character handler for the map window. Routes to city window shortcuts (if city view), map-level command...
│   ├── FUN_0000B9A4 [?]
│   ├── FUN_0000BA07 [?]
│   ├── FUN_0000BA6A [?]
│   ├── FUN_0000BC4F [?]
│   ├── show_tax_rate_dialog [MIXED] *** STATE MUTATION ***
│   │     Shows the tax rate dialog for a civ. First checks if the civ is active (bit set in DAT_00655b0b). In single-player or...
│   │   ├── FUN_00009429 [?]
│   │   ├── open_tax_rate_dialog [MIXED] *** STATE MUTATION ***
│   │   │     Creates and runs the tax rate adjustment dialog. Initializes the dialog state, adjusts rates to comply with governmen...
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   ├── get_max_tax_rate [GL]
│   │   │   ├── balance_tax_rates [GL]
│   │   │   ├── taxrate_recalc_totals [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL]  (subtree shown above)
│   │   │   │   ├── distribute_trade [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── calc_building_upkeep_cost [GL]  (subtree shown above)
│   │   │   ├── process_messages [UI]  (subtree shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   ├── set_dialog_enabled [UI]
│   │   │   ├── create_text_button [UI]  (subtree shown above)
│   │   │   ├── set_button_owner [UI]  (subtree shown above)
│   │   │   ├── set_button_handler [UI]  (subtree shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   ├── create_checkbox [UI]
│   │   │   │   ├── FUN_0000BF40 [?]
│   │   │   │   ├── FUN_0000C0F0 [?]
│   │   │   │   ├── control_detach_window [UI]  (subtree shown above)
│   │   │   │   └── control_init_fields [UI]  (subtree shown above)
│   │   │   ├── set_checkbox_callback [UI]
│   │   │   ├── set_checkbox_value [UI]
│   │   │   ├── create_scrollbar [UI]
│   │   │   │   ├── FUN_0000CF17 [?]
│   │   │   │   ├── control_detach_window [UI]  (subtree shown above)
│   │   │   │   ├── control_init_fields [UI]  (subtree shown above)
│   │   │   │   └── scrollbar_set_range [UI]
│   │   │   │       └── scrollbar_set_pos [UI]
│   │   │   │           └── ... (1 more callees, depth limit)
│   │   │   ├── scrollbar_set_position [UI]
│   │   │   │   └── scrollbar_set_pos [UI]  (subtree shown above)
│   │   │   ├── scrollbar_set_range [UI]
│   │   │   │   └── scrollbar_set_range [UI]  (subtree shown above)
│   │   │   ├── scrollbar_set_callback [UI]
│   │   │   ├── dialog_repaint_check [UI]  (subtree shown above)
│   │   │   ├── save_civ2_dat [GL]
│   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── citywin_refresh_top_panels [UI]
│   │   │   │   ├── FUN_00008ADC [?]
│   │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── draw_citizens_row [UI]
│   │   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   ├── draw_text_centered [UI]  (subtree shown above)
│   │   │   │   │   ├── close_dialog [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── citywin_prepare_panel [UI]
│   │   │   │   │   │   └── ... (4 more callees, depth limit)
│   │   │   │   │   ├── citywin_draw_citizen_icons [UI]
│   │   │   │   │   │   └── ... (8 more callees, depth limit)
│   │   │   │   │   ├── invalidate_rect_region [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── scale_universal [UI]
│   │   │   │   │   └── set_text_style [UI]
│   │   │   │   └── draw_resource_rows [UI]
│   │   │   │       ├── rect_get_width [UI]
│   │   │   │       ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │       ├── set_rect_wh [UI]
│   │   │   │       ├── fill_rect_palette [UI]  (subtree shown above)
│   │   │   │       ├── text_begin [UI]
│   │   │   │       ├── text_add_label_id [UI]
│   │   │   │       ├── text_newline [UI]
│   │   │   │       ├── text_begin_bold [UI]
│   │   │   │       ├── text_begin_italic [UI]
│   │   │   │       ├── text_end_italic [UI]
│   │   │   │       ├── text_add_number [UI]
│   │   │   │       ├── draw_text_at [UI]  (subtree shown above)
│   │   │   │       ├── draw_text_centered [UI]  (subtree shown above)
│   │   │   │       ├── draw_text_right_aligned [UI]
│   │   │   │       │   └── ... (1 more callees, depth limit)
│   │   │   │       ├── find_city_at [GL]  (subtree shown above)
│   │   │   │       ├── close_dialog [UI]  (subtree shown above)
│   │   │   │       ├── scale_sprite [UI]
│   │   │   │       ├── render_tile [UI]
│   │   │   │       │   └── ... (22 more callees, depth limit)
│   │   │   │       ├── set_sprite_scale [UI]  (subtree shown above)
│   │   │   │       ├── reset_sprite_scale [UI]  (subtree shown above)
│   │   │   │       ├── is_tile_worked [GL]
│   │   │   │       ├── calc_tile_all_resources [GL] *** STATE MUTATION ***
│   │   │   │       │   └── ... (1 more callees, depth limit)
│   │   │   │       ├── citywin_prepare_panel [UI]  (subtree shown above)
│   │   │   │       ├── citywin_draw_citizen_icons_simple [UI]
│   │   │   │       │   └── ... (6 more callees, depth limit)
│   │   │   │       ├── invalidate_rect_region [UI]  (subtree shown above)
│   │   │   │       ├── scale_universal [UI]
│   │   │   │       ├── calc_icon_spacing [UI]
│   │   │   │       ├── draw_unit [UI]  (subtree shown above)
│   │   │   │       ├── draw_city_sprite [UI]
│   │   │   │       │   └── ... (23 more callees, depth limit)
│   │   │   │       ├── wrap_x [GL]
│   │   │   │       ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │       ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   │   │       ├── set_text_draw_source [UI]
│   │   │   │       ├── set_text_style [UI]
│   │   │   │       └── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── refresh_status_panel [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── load_gif_resource [UI]  (subtree shown above)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   └── (5 FW callees filtered)
│   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── show_find_city_dialog [UI]
│   │     Displays the "Find City" dialog that lists all known cities. Shows city names with owner names for foreign cities, an...
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_string [UI]
│   │   │     Appends a string to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_label_id [UI]
│   │   │     Appends a localized label (by ID) to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── text_newline [UI]
│   │   │     Adds a newline to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_begin_italic [UI]
│   │   │     Begins italic text mode in the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_end_italic [UI]
│   │   │     Ends italic text mode in the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_number [UI]
│   │   │     Adds a number to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   ├── set_map_scroll_position [UI]  (subtree shown above)
│   │   ├── city_count_content_citizens [GL]
│   │   │     Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   │   ├── get_civ_adjective_name [GL]
│   │   │     Returns the adjective form of a civilization name. Uses custom name if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   └── (2 FW callees filtered)
│   ├── handle_revolution [GL] *** STATE MUTATION ***
│   │     Handles the player initiating a revolution. If the civ is in anarchy, shows the government selection dialog. Otherwis...
│   │   ├── show_message [UI]
│   │   │     Stores a message string in the message buffer at the specified slot index.
│   │   │   └── (1 FW callees filtered)
│   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── get_civ_people_name [GL]
│   │   │     Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── update_menu_state [MIXED]  (subtree shown above)
│   │   ├── set_government_type [GL] *** STATE MUTATION ***
│   │   │     Sets a civ's government type. If changing to/from anarchy, clears embassy flags. Refreshes all cities of the civ. If ...
│   │   │   ├── show_tax_rate_dialog [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   └── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── ai_revolution_notification [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── cancel_unit_blink_timer [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── is_in_goto_mode [UI]
│   │     Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
│   ├── cancel_goto_mode [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── handle_spectator_keypress [UI] *** STATE MUTATION ***
│   │     Handles keyboard input in spectator/observer mode (DAT_006d1da8 == 0). Processes Enter/Space for city dialog, 'C' for...
│   │   ├── show_city_info_dialog [UI]  (subtree shown above)
│   │   ├── set_map_scroll_position [UI]  (subtree shown above)
│   │   ├── find_city_at [GL]  (subtree shown above)
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   └── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── handle_unit_keypress [MIXED]
│   │     Handles keyboard input when a unit is active (DAT_006d1da8 == 1). Dispatches unit orders: Space=wait, B=build, C=cent...
│   │   ├── show_city_info_dialog [UI]  (subtree shown above)
│   │   ├── set_map_scroll_position [UI]  (subtree shown above)
│   │   ├── open_cheat_menu [UI]
│   │   │     Opens the cheat menu for the current player.
│   │   │   └── show_throne_room [MIXED] *** STATE MUTATION ***
│   │   │       ├── init_throne_context [UI]
│   │   │       │   ├── init_sprite_surface_mgr [UI]  (subtree shown above)
│   │   │       │   ├── init_render_surface [UI]
│   │   │       │   ├── unknown (pedia object initializer) [UI]
│   │   │       │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │       │   ├── get_screen_rect [UI]
│   │   │       │   ├── palette_init [UI]  (subtree shown above)
│   │   │       │   └── (4 FW callees filtered)
│   │   │       ├── destroy_throne_context [UI]
│   │   │       │   ├── pedia_free_resource [UI]
│   │   │       │   └── (2 FW callees filtered)
│   │   │       ├── throne_room_add_improvement [MIXED] *** STATE MUTATION ***
│   │   │       │   ├── flush_display [UI]
│   │   │       │   ├── end_paint [UI]  (subtree shown above)
│   │   │       │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │       │   ├── manage_window_show [UI]  (subtree shown above)
│   │   │       │   ├── start_cursor_blink [UI]  (subtree shown above)
│   │   │       │   ├── stop_cursor_blink [UI]  (subtree shown above)
│   │   │       │   ├── init_palette_system [UI]
│   │   │       │   ├── load_throne_dll [UI]
│   │   │       │   │   └── ... (6 more callees, depth limit)
│   │   │       │   ├── draw_throne_title [UI]
│   │   │       │   │   └── ... (4 more callees, depth limit)
│   │   │       │   ├── render_throne_room [UI]
│   │   │       │   │   └── ... (7 more callees, depth limit)
│   │   │       │   ├── throne_room_select_piece [UI]
│   │   │       │   │   └── ... (8 more callees, depth limit)
│   │   │       │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│   │   │       │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │       │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │       │   ├── animate_screen_reveal [UI]
│   │   │       │   │   └── ... (5 more callees, depth limit)
│   │   │       │   ├── port_alloc_rect [UI]  (subtree shown above)
│   │   │       │   ├── port_blit_stretch [UI]  (subtree shown above)
│   │   │       │   ├── port_get_font [UI]
│   │   │       │   │   └── ... (1 more callees, depth limit)
│   │   │       │   ├── unknown (set/get draw color) [UI]
│   │   │       │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │       │   └── (8 FW callees filtered)
│   │   │       └── (3 FW callees filtered)
│   │   ├── find_city_at [GL]  (subtree shown above)
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── unit_order_activate [GL] *** STATE MUTATION ***
│   │   │     Activates the selected unit by calling move_unit with direction -1 and mode 3 (activate in place).
│   │   │   └── move_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── (unit_order_wait) [GL] *** STATE MUTATION ***
│   │   │     Sets the "wait" flag on the selected unit (bit 0x4000 in unit flags word) and advances to the next unit needing orders.
│   │   │   ├── center_all_map_views [UI]  (subtree shown above)
│   │   │   └── select_next_unit [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── unit_order_build_city [MIXED] *** STATE MUTATION ***
│   │   │     Handles the "Build City" order. Checks if unit is settler type, validates location (not ocean, not adjacent to existi...
│   │   │   ├── FUN_0000C679 [?]
│   │   │   ├── FUN_0000DADA [?]
│   │   │   ├── FUN_0000DB36 [?]
│   │   │   ├── is_tile_valid [GL]
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── show_message [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── show_city_popup [UI]  (subtree shown above)
│   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   ├── unknown (dialog show 4 params) [UI]
│   │   │   │   └── FUN_0051D63B [?]
│   │   │   ├── unknown (string pool set) [UI]  (subtree shown above)
│   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   ├── show_game_popup_3arg [UI]  (subtree shown above)
│   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   │   ├── unknown (tutorial_show_city_screen) [UI]
│   │   │   │   └── FUN_0051D564 [?]
│   │   │   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │   │   ├── unit_order_found_city [GL] *** STATE MUTATION ***
│   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── show_city_event_dialog_v2 [UI] *** STATE MUTATION ***
│   │   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   │   ├── dialog_set_title [UI]  (subtree shown above)
│   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   ├── pedia_window_ctor [UI]
│   │   │   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── popup_set_default_selection [UI]  (subtree shown above)
│   │   │   │   ├── popup_add_button [UI]  (subtree shown above)
│   │   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   │   ├── load_gif_resource [UI]  (subtree shown above)
│   │   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]  (subtree shown above)
│   │   │   │   └── (4 FW callees filtered)
│   │   │   ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   └── get_city_owner_at [GL]  (subtree shown above)
│   │   ├── unit_order_build_improvement [MIXED]
│   │   │     Handles all settler/engineer improvement orders (road, railroad, irrigation, farmland, mining, fortress, airbase, pol...
│   │   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   │   ├── show_game_popup_3arg [UI]  (subtree shown above)
│   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   ├── unknown (show tech help) [UI]  (subtree shown above)
│   │   │   ├── execute_worker_order [GL] *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000C494 [?]
│   │   │   │   ├── FUN_0000C6EF [?]
│   │   │   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   │   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │   │   ├── refresh_status_panel [UI]  (subtree shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   │   ├── get_tile_improvements [GL]  (subtree shown above)
│   │   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   └── set_tile_terrain [GL] *** STATE MUTATION ***
│   │   │   │       ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │       ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │       └── queue_map_update [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── unknown (show improvement help) [UI]  (subtree shown above)
│   │   │   ├── check_adjacent_water [GL]
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   ├── get_fortress_owner_at [GL]  (subtree shown above)
│   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   ├── unit_order_home_city [MIXED] *** STATE MUTATION ***
│   │   │     Changes the selected unit's home city to the city at its current location. Caravans cannot be rehomed if they already...
│   │   │   ├── FUN_0000C679 [?]
│   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   └── ai_find_nearest_city_or_transport [AI] *** STATE MUTATION ***
│   │   │       ├── tile_distance_xy [GL]
│   │   │       ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │       ├── get_unit_moves_remaining [GL]  (subtree shown above)
│   │   │       ├── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │       ├── get_tile_continent [GL]  (subtree shown above)
│   │   │       └── get_fortress_owner_at [GL]  (subtree shown above)
│   │   ├── unit_order_fortify [MIXED] *** STATE MUTATION ***
│   │   │     Fortifies the selected unit. Land units can only fortify on land (not ocean), and only in a city or fortress. Sets un...
│   │   │   ├── FUN_0000C494 [?]
│   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   ├── update_tile_all_players [UI]  (subtree shown above)
│   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   └── get_fortress_owner_at [GL]  (subtree shown above)
│   │   ├── unit_order_unload [GL] *** STATE MUTATION ***
│   │   │     Issues the "unload" order for a transport ship or air unit carrying units. Land units need a city or ship to unload f...
│   │   │   ├── is_tile_valid [GL]
│   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   ├── set_unit_goto_order [GL] *** STATE MUTATION ***
│   │   │   ├── sum_stack_property [GL]  (subtree shown above)
│   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   └── get_city_owner_at [GL]  (subtree shown above)
│   │   ├── unit_order_pillage [MIXED] *** STATE MUTATION ***
│   │   │     Handles the pillage order. Shows a menu to select which improvement to pillage (road, railroad, irrigation, farmland,...
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── unit_pillage [GL] *** STATE MUTATION ***
│   │   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   │   │   ├── ai_add_goal_a [AI] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── diplomacy_check_attack_allowed [GL]  (subtree shown above)
│   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   │   ├── get_tile_improvements [GL]  (subtree shown above)
│   │   │   │   └── set_tile_improvement_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── diplomacy_check_attack_allowed [GL]  (subtree shown above)
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   ├── popup_dialog_close [UI]  (subtree shown above)
│   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   │   ├── get_city_owner_at [GL]  (subtree shown above)
│   │   │   └── (4 FW callees filtered)
│   │   ├── unit_order_paradrop [UI]
│   │   │     Handles the paradrop order. Validates unit hasn't moved and hasn't paradropped already (bit 0x10 in flags), checks ai...
│   │   │   ├── set_all_views_goto_cursor [UI] *** STATE MUTATION ***
│   │   │   │   └── set_cursor_icon [UI]  (subtree shown above)
│   │   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   │   └── get_tile_improvements [GL]  (subtree shown above)
│   │   ├── unit_order_goto_city [MIXED] *** STATE MUTATION ***
│   │   │     Shows a dialog listing cities the unit can travel to (filtered by domain compatibility and range), then sets the unit...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── select_list_item [UI]  (subtree shown above)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_end_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── display_improvement [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_number [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   ├── city_adjacent_to_continent [GL]
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   └── get_tile_continent [GL]  (subtree shown above)
│   │   │   ├── cities_share_coast [GL]
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   ├── city_adjacent_to_continent [GL]  (subtree shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   │   │   └── get_tile_continent [GL]  (subtree shown above)
│   │   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │   ├── popup_dialog_close [UI]  (subtree shown above)
│   │   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   ├── tile_distance_xy [GL]
│   │   │   ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │   │   ├── get_unit_moves_remaining [GL]  (subtree shown above)
│   │   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   │   ├── get_tile_improvements [GL]  (subtree shown above)
│   │   │   └── (2 FW callees filtered)
│   │   ├── (unit_order_unload_transport) [MIXED] *** STATE MUTATION ***
│   │   │     Unloads ground units from a transport ship. Sets the ship's wait flag and wakes carried ground units with goto orders...
│   │   │   ├── activate_current_unit [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   │   │   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   │   │   └── is_unit_ready_to_move [GL]  (subtree shown above)
│   │   ├── (unit_order_automate_settler) [GL] *** STATE MUTATION ***
│   │   │     Sets the "automate" flag on a settler/engineer unit (bit 0x8000 in unit flags).
│   │   └── unit_order_airlift [MIXED] *** STATE MUTATION ***
│   │         Handles the airlift unit order. Validates the unit is ground-domain, in a city with an airport that hasn't already ai...
│   │       ├── select_list_item [UI]  (subtree shown above)
│   │       ├── show_message [UI]
│   │       │   └── (1 FW callees filtered)
│   │       ├── open_list_dialog [UI]  (subtree shown above)
│   │       ├── show_city_popup [UI]  (subtree shown above)
│   │       ├── find_city_at [GL]  (subtree shown above)
│   │       ├── has_building [GL]  (subtree shown above)
│   │       ├── show_game_popup_3arg [UI]  (subtree shown above)
│   │       ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │       ├── execute_airlift [GL] *** STATE MUTATION ***  (subtree shown above)
│   │       ├── unknown (show improvement help) [UI]  (subtree shown above)
│   │       ├── popup_dialog_create [UI]  (subtree shown above)
│   │       ├── popup_dialog_close [UI]  (subtree shown above)
│   │       ├── popup_add_radio_option [UI]  (subtree shown above)
│   │       ├── tile_distance_xy [GL]
│   │       ├── calc_unit_movement_points [GL]  (subtree shown above)
│   │       ├── is_tile_ocean [GL]  (subtree shown above)
│   │       └── (2 FW callees filtered)
│   ├── view_throne_room [UI]
│   │     Views the current throne room without adding improvements. Creates context, renders current state, destroys context.
│   │   ├── init_throne_context [UI]  (subtree shown above)
│   │   ├── destroy_throne_context [UI]  (subtree shown above)
│   │   ├── view_throne_display [UI]
│   │   │     Displays the current throne room state for viewing (no modifications).
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── manage_window_show [UI]  (subtree shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── load_throne_dll [UI]  (subtree shown above)
│   │   │   ├── draw_throne_title [UI]  (subtree shown above)
│   │   │   ├── render_throne_room [UI]  (subtree shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│   │   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │   └── modal_dialog_run [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── redraw_entire_map [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── redraw_map_all_players [UI]  (subtree shown above)
│   ├── start_human_turn [UI]  (subtree shown above)
│   ├── activate_current_unit [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── toggle_hidden_terrain [UI] *** STATE MUTATION ***
│   │     Toggles hidden terrain debug mode. Sets a flag, refreshes the map, shows a message, then unsets the flag and refreshe...
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   └── redraw_map_all_players [UI]  (subtree shown above)
│   ├── unit_order_disband [MIXED] *** STATE MUTATION ***
│   │     Disbands a unit (or city in cheat mode). If disbanded in a city, adds half the unit's shield cost to the city's produ...
│   │   ├── FUN_00009429 [?]
│   │   ├── show_city_popup [UI]  (subtree shown above)
│   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │     Sets a string control value in the multiplayer dialog string table. Copies param_2 into the string slot at index para...
│   │   │   └── (1 FW callees filtered)
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   ├── find_city_at [GL]  (subtree shown above)
│   │   ├── show_game_popup_2arg [UI]  (subtree shown above)
│   │   ├── update_map_area_all_players [UI]  (subtree shown above)
│   │   ├── redraw_map_all_players [UI]  (subtree shown above)
│   │   ├── init_city_production_globals [GL] *** STATE MUTATION ***
│   │   │     Initializes two global production variables from a city's current production type and accumulated shields.
│   │   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   │   └── delete_unit_safely [GL] *** STATE MUTATION ***  (subtree shown above)
│   └── unit_order_sentry [MIXED] *** STATE MUTATION ***  (subtree shown above)
├── city_mouse [UI] *** STATE MUTATION ***  -- deferred UI: city mouse
│     Main mouse click dispatcher for the city window. Hit-tests click regions and dispatches to: resource map (1), citizen...
│   ├── find_click_region [UI]
│   │     Finds which click region contains point (param_1, param_2). Returns region index and optionally writes callback/ID to...
│   ├── citywin_click_citizen [MIXED] *** STATE MUTATION ***
│   │     Handles clicking on a citizen icon in the city window. Cycles through specialist types (entertainer/taxman/scientist)...
│   │   ├── show_city_popup [UI]  (subtree shown above)
│   │   ├── set_worker_tile_status [GL] *** STATE MUTATION ***
│   │   │     Sets a worker tile status (2-bit field) in a city's tile assignment bitmask. Each tile uses 2 bits in the 32-bit fiel...
│   │   ├── get_worker_tile_status [GL]
│   │   │     Gets a worker tile status (2-bit field) from a city's tile assignment bitmask. Returns 1 for tiles beyond index 15.
│   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── citywin_refresh_top_panels [UI]  (subtree shown above)
│   ├── citywin_click_resource_map [MIXED] *** STATE MUTATION ***
│   │     Handles clicking on the resource map in the city window. Determines which tile was clicked using isometric hit-testin...
│   │   ├── scale_sprite [UI]
│   │   │     Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
│   │   ├── is_tile_worked [GL]
│   │   │     Returns whether a specific tile (param_2) is being worked by city param_1. Checks bit in 32-bit field.
│   │   ├── set_tile_worked [GL] *** STATE MUTATION ***
│   │   │     Sets or clears a tile's worked status in a city's worked-tiles bitmask.
│   │   ├── adjust_specialist_count [GL] *** STATE MUTATION ***
│   │   │     Adjusts the specialist count stored in the upper 6 bits of DAT_0064f370. Adds or removes specialists.
│   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── citywin_refresh_top_panels [UI]  (subtree shown above)
│   │   ├── scale_universal [UI]
│   │   │     Scales a value based on the display scale factor at `this + 0x15d4`. If scale != 2, returns `(scale * param_1) / 2`; ...
│   │   └── port_set_pixel [UI]  (subtree shown above)
│   ├── citywin_sell_improvement [MIXED] *** STATE MUTATION ***
│   │     Handles selling a city improvement. Shows confirmation dialog, removes building, adds sale price to treasury, sets "s...
│   │   ├── FUN_00009429 [?]
│   │   ├── show_city_popup [UI]  (subtree shown above)
│   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │     Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   ├── dialog_repaint_check [UI]  (subtree shown above)
│   │   ├── set_building [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── unknown (show improvement help) [UI]  (subtree shown above)
│   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── draw_status_panel_header [UI]  (subtree shown above)
│   ├── citywin_unit_popup_supported [MIXED] *** STATE MUTATION ***
│   │     Handles the unit popup menu when clicking a supported unit in the city window. Options: activate (goto to unit), disb...
│   │   ├── FUN_00009429 [?]
│   │   ├── FUN_0000994F [?]
│   │   ├── is_tile_valid [GL]
│   │   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   ├── set_map_scroll_position [UI]  (subtree shown above)
│   │   ├── center_and_scroll_to_tile [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── find_city_at [GL]  (subtree shown above)
│   │   ├── start_human_turn [UI]  (subtree shown above)
│   │   ├── activate_current_unit [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── citywin_format_unit_info [UI]
│   │   │     Formats unit information text for a city window unit popup: civ name, veteran status, unit type, location coordinates...
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_string [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_newline [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_begin_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_end_italic [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── display_improvement [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_number [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── show_message [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   │   ├── unknown (string pool append separator) [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── find_city_at [GL]  (subtree shown above)
│   │   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   │   └── (1 FW callees filtered)
│   │   ├── FUN_00506A15 [?]
│   │   ├── FUN_00506A1E [?]
│   │   ├── FUN_00506A34 [?]
│   │   ├── popup_add_button [UI]  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   ├── delete_unit_visible [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── is_unit_ready_to_move [GL]  (subtree shown above)
│   │   ├── sprite_init_empty [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   └── citywin_unit_popup_present [MIXED] *** STATE MUTATION ***
│         Handles the unit popup menu when clicking a present (visiting) unit in the city window. Extended options: activate, d...
│       ├── FUN_000070B8 [?]
│       ├── FUN_000070C1 [?]
│       ├── FUN_000070D7 [?]
│       ├── FUN_00008ADC [?]
│       ├── FUN_00009429 [?]
│       ├── FUN_0000994F [?]
│       ├── select_list_item [UI]  (subtree shown above)
│       ├── open_list_dialog [UI]  (subtree shown above)
│       ├── activate_current_unit [MIXED] *** STATE MUTATION ***  (subtree shown above)
│       ├── init_city_production_globals [GL] *** STATE MUTATION ***
│       │     Initializes two global production variables from a city's current production type and accumulated shields.
│       ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│       ├── citywin_format_unit_info [UI]  (subtree shown above)
│       ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***  (subtree shown above)
│       ├── popup_set_default_selection [UI]  (subtree shown above)
│       ├── popup_add_button [UI]  (subtree shown above)
│       ├── popup_add_radio_option [UI]  (subtree shown above)
│       ├── get_unit_moves_remaining [GL]  (subtree shown above)
│       ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│       ├── set_unit_goto_order [GL] *** STATE MUTATION ***
│       │     Sets a unit's order to "goto" (3). If the unit wasn't already on goto, resets the goto target.
│       ├── get_nth_unit_in_stack [GL]
│       │     Returns the Nth unit in a stack (0-indexed from first). Returns -1 if N exceeds stack size.
│       │   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│       │   └── get_first_unit_in_stack [GL]  (subtree shown above)
│       ├── relocate_unit_in_place [GL] *** STATE MUTATION ***
│       │     Relocates a unit to its own current position (used to refresh stack linkage).
│       │   └── relocate_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│       ├── delete_unit_visible [GL] *** STATE MUTATION ***  (subtree shown above)
│       ├── refresh_unit_movement [GL] *** STATE MUTATION ***  (subtree shown above)
│       ├── sprite_init_empty [UI]  (subtree shown above)
│       └── (1 FW callees filtered)
├── city_button_buy [MIXED] *** STATE MUTATION ***  -- deferred UI: city buy
│     Handles the "Buy" button in the city window. Calculates rush-buy cost (2x remaining shields for buildings, 2x + shiel...
│   ├── FUN_000092AF [?]
│   ├── FUN_0000A1B2 [?]
│   ├── FUN_0000A1C8 [?]
│   ├── select_list_item [UI]  (subtree shown above)
│   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │     Sets a numeric control value in the multiplayer dialog number table.
│   ├── set_improvement_name_string [UI]  (subtree shown above)
│   ├── dialog_set_title [UI]  (subtree shown above)
│   ├── unknown (set trade route value) [GL] *** STATE MUTATION ***
│   │     Stores a value into the trade route table at index param_1.
│   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── init_city_production_globals [GL] *** STATE MUTATION ***
│   │     Initializes two global production variables from a city's current production type and accumulated shields.
│   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── draw_production_box [UI]
│   │     Draws the production box in the city window. Shows the item being produced (unit sprite or building icon) and product...
│   │   ├── rect_get_width [UI]
│   │   │     Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI]
│   │   │     Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   ├── set_rect_wh [UI]
│   │   │     Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── draw_text_centered [UI]  (subtree shown above)
│   │   ├── close_dialog [UI]  (subtree shown above)
│   │   ├── init_unit_move_data [GL] *** STATE MUTATION ***
│   │   │     Initializes the unit movement animation data structure at 0x006660xx. Sets unit type/owner params and initializes coo...
│   │   ├── set_sprite_scale [UI]  (subtree shown above)
│   │   ├── reset_sprite_scale [UI]  (subtree shown above)
│   │   ├── widget_inflate_rect_neg [UI]  (subtree shown above)
│   │   ├── widget_inflate_rect [UI]
│   │   │     Thin wrapper around Win32 InflateRect.
│   │   ├── citywin_prepare_panel [UI]  (subtree shown above)
│   │   ├── draw_3d_frame [UI]
│   │   │     Draws a 3D frame/border by delegating to thunk_FUN_005a99fc (draw_3d_border) with the global surface and 3 params.
│   │   │   └── draw_3d_border [UI]  (subtree shown above)
│   │   ├── invalidate_rect_region [UI]  (subtree shown above)
│   │   ├── blit_sprite_8param [UI]
│   │   │     Blits a sprite with 8 parameters by calling thunk_FUN_00548c78 with the global surface prepended.
│   │   │   └── draw_icon_row_spaced [UI]
│   │   │       ├── calc_icon_spacing [UI]
│   │   │       └── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   ├── scale_universal [UI]
│   │   │     Scales a value based on the display scale factor at `this + 0x15d4`. If scale != 2, returns `(scale * param_1) / 2`; ...
│   │   ├── calc_icon_spacing [UI]
│   │   │     Calculates spacing for drawing a row of icons evenly distributed across a width. Returns the computed spacing value.
│   │   ├── draw_unit [UI]  (subtree shown above)
│   │   ├── set_text_style [UI]
│   │   │     Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   └── (2 FW callees filtered)
│   ├── draw_status_panel_header [UI]  (subtree shown above)
│   ├── popup_set_default_selection [UI]  (subtree shown above)
│   ├── popup_add_button [UI]  (subtree shown above)
│   ├── clamp [FW]
│   │     Clamps a value to [min, max] range. Identical logic to FUN_005a1a44 (clamp_value).
│   └── _strcpy_thunk [FW]
│         CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── city_button_change [MIXED] *** STATE MUTATION ***  -- deferred UI: city change production
│     The second-largest function in this block (4.5KB). Handles the city production change dialog. Shows list of all build...
│   ├── FUN_00009AC0 [?]
│   ├── FUN_0000B638 [?]
│   ├── FUN_0000CCB3 [?]
│   ├── text_begin [UI]
│   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   └── (1 FW callees filtered)
│   ├── text_add_string [UI]
│   │     Appends a string to the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── text_add_label_id [UI]
│   │     Appends a localized label (by ID) to the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── text_newline [UI]
│   │     Adds a newline to the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── text_begin_bold [UI]
│   │     Begins bold text mode in the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── text_begin_italic [UI]
│   │     Begins italic text mode in the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── text_end_italic [UI]
│   │     Ends italic text mode in the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── display_improvement [UI]
│   │     Adds an improvement/government icon to the text buffer.
│   │   └── (1 FW callees filtered)
│   ├── text_add_number [UI]
│   │     Adds a number to the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── show_message [UI]
│   │     Stores a message string in the message buffer at the specified slot index.
│   │   └── (1 FW callees filtered)
│   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   ├── set_improvement_name_string [UI]  (subtree shown above)
│   ├── get_improvement_name [FW]
│   │     Returns a pointer to the Nth string in the string pool. Walks through null-terminated strings in DAT_0063e4c8, skippi...
│   ├── dialog_repaint_check [UI]  (subtree shown above)
│   ├── text_concat_string [FW]
│   │     Concatenates param_2 onto param_1 string.
│   │   └── (1 FW callees filtered)
│   ├── dialog_set_icon [UI]
│   │     Sets *(ECX + 0x208 + param_2*4) = param_1. Stores an icon/sprite ID at a given slot.
│   ├── dialog_set_title [UI]  (subtree shown above)
│   ├── set_building [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── change_city_production [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── debug_show_message [UI]  (subtree shown above)
│   ├── is_wonder_obsolete [GL]  (subtree shown above)
│   ├── init_game_display [UI]  (subtree shown above)
│   ├── clear_string [FW]
│   │     Sets the first byte of a string to 0 (empty string).
│   ├── append_string_by_id [FW]
│   │     Appends a string identified by ID (param_2) to param_1. Resolves ID to string via FUN_00428b0c.
│   │   └── (2 FW callees filtered)
│   ├── can_build_unit_type [GL]  (subtree shown above)
│   ├── can_build_wonder [GL]
│   │     Checks if a civ can build a specific wonder. Returns 1 if the wonder slot is vacant (DAT_00655be6 == -1) and the civ ...
│   │   └── civ_has_tech [GL]  (subtree shown above)
│   ├── can_build_improvement [GL]
│   │     Comprehensive check for whether a civ can build a specific city improvement or wonder. Handles all prerequisite tech ...
│   │   ├── has_building [GL]  (subtree shown above)
│   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   ├── has_spaceship_launched [GL]
│   │   │     Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   └── can_build_wonder [GL]  (subtree shown above)
│   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │     Sets the paradrop range for a unit type. Writes to the unit type table.
│   ├── calc_food_box_with_difficulty [GL]
│   │     Calculates adjusted food box size based on difficulty. If production type changed, applies a penalty percentage from ...
│   │   └── classify_production_type [GL]
│   │         Classifies a production item: returns 0 for positive (improvement/wonder), 1 for units (negative but > -0x22), 2 for ...
│   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── draw_resource_rows [UI]  (subtree shown above)
│   ├── draw_production_box [UI]  (subtree shown above)
│   ├── unknown (draw_text_at) [UI]
│   │     Draws text at a location by calling thunk_FUN_004a6cc5 with DAT_006359d4 (a popup/dialog context) and 3 params.
│   │   └── show_city_style_picker [UI]  (subtree shown above)
│   ├── spaceship_human_build [GL] *** STATE MUTATION ***
│   │     Handles building a spaceship component for a human or AI player. For humans, shows a dialog to choose which component...
│   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │     Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   ├── has_spaceship_launched [GL]
│   │   │     Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── has_spaceship_built [GL]
│   │   │     Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── spaceship_launch (internal — called after all checks pass) [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── pedia_navigate_to_item [UI]
│   │     Navigates the Civilopedia to a specific item by index. If index < 0x27, finds the item in the list, updates the selec...
│   │   ├── end_paint [UI]  (subtree shown above)
│   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   ├── unknown (lock pedia surface) [UI]  (subtree shown above)
│   │   ├── pedia_init_tabs [UI]  (subtree shown above)
│   │   ├── pedia_clear_item_list [UI]  (subtree shown above)
│   │   ├── pedia_draw_frame [UI]  (subtree shown above)
│   │   ├── pedia_open_category [UI]  (subtree shown above)
│   │   ├── pedia_get_entry_name [UI]
│   │   │     Gets the name string for a Civilopedia entry by index from a linked list.
│   │   ├── civpedia_select_item [UI]
│   │   │     Handles selection of a Civilopedia item. Searches for the selected item ID in the list, updates the selection state, ...
│   │   │   ├── end_paint [UI]  (subtree shown above)
│   │   │   ├── unknown (lock pedia surface) [UI]  (subtree shown above)
│   │   │   ├── pedia_init_tabs [UI]  (subtree shown above)
│   │   │   ├── pedia_clear_item_list [UI]  (subtree shown above)
│   │   │   ├── pedia_draw_frame [UI]  (subtree shown above)
│   │   │   ├── pedia_open_category [UI]  (subtree shown above)
│   │   │   ├── pedia_get_entry_name [UI]
│   │   │   ├── civpedia_draw_detail [UI]
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── get_font_height [UI]
│   │   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   │   ├── text_begin_bold [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── display_improvement [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (get panel icon width) [UI]  (subtree shown above)
│   │   │   │   ├── unknown (get panel icon height) [UI]  (subtree shown above)
│   │   │   │   ├── pedia_init_tabs [UI]  (subtree shown above)
│   │   │   │   ├── pedia_show_description [UI]  (subtree shown above)
│   │   │   │   ├── pedia_add_hyperlink [UI]  (subtree shown above)
│   │   │   │   ├── widget_get_height [UI]  (subtree shown above)
│   │   │   │   ├── unknown (pedia_draw_background_panel) [UI]  (subtree shown above)
│   │   │   │   ├── pedia_load_description [UI] *** STATE MUTATION ***
│   │   │   │   │   └── (8 FW callees filtered)
│   │   │   │   ├── port_set_rect [UI]
│   │   │   │   ├── port_set_clip_rect [UI]
│   │   │   │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│   │   │   │   ├── port_get_font [UI]  (subtree shown above)
│   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   ├── scale_table_build_primary [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   └── (1 FW callees filtered)
│   │   ├── pedia_draw_item_detail [UI]
│   │   │     Draws the detail view for a selected Civilopedia item. Renders the item name, icon, cost, attack/defense values, and ...
│   │   │   ├── rect_get_width [UI]
│   │   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   │   ├── text_begin [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── text_add_label_id [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── get_font_height [UI]
│   │   │   ├── measure_text_height [UI]  (subtree shown above)
│   │   │   ├── text_begin_bold [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── display_improvement [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown (get panel icon width) [UI]  (subtree shown above)
│   │   │   ├── pedia_init_tabs [UI]  (subtree shown above)
│   │   │   ├── pedia_show_description [UI]  (subtree shown above)
│   │   │   ├── pedia_add_hyperlink [UI]  (subtree shown above)
│   │   │   ├── widget_get_height [UI]  (subtree shown above)
│   │   │   ├── unknown (pedia_draw_background_panel) [UI]  (subtree shown above)
│   │   │   ├── pedia_load_description [UI] *** STATE MUTATION ***
│   │   │   │   └── (8 FW callees filtered)
│   │   │   ├── port_set_rect [UI]
│   │   │   ├── port_set_clip_rect [UI]
│   │   │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│   │   │   ├── port_get_font [UI]  (subtree shown above)
│   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   ├── scale_table_build_primary [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   └── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── popup_dialog_destroy [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── popup_set_radio_column_count [UI]  (subtree shown above)
│   ├── popup_set_position_fields [UI]
│   │     Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2. Used to position content within the ...
│   ├── popup_set_default_selection [UI]  (subtree shown above)
│   ├── popup_add_button [UI]  (subtree shown above)
│   ├── popup_add_radio_option [UI]  (subtree shown above)
│   ├── popup_add_action_button_label [UI]
│   │     Adds an action button label string to the popup dialog. Supports up to 6 labels (this+0x294 array, index tracked at t...
│   │   └── (2 FW callees filtered)
│   ├── popup_show_modal [UI]  (subtree shown above)
│   └── pedia_select_unit_type [UI]
│         Selects and displays a unit type in the Civilopedia. Finds the unit in the list, updates the selection, draws the det...
│       ├── end_paint [UI]  (subtree shown above)
│       ├── show_window_wrapper [UI]  (subtree shown above)
│       ├── unknown (lock pedia surface) [UI]  (subtree shown above)
│       ├── pedia_init_tabs [UI]  (subtree shown above)
│       ├── pedia_clear_item_list [UI]  (subtree shown above)
│       ├── pedia_draw_frame [UI]  (subtree shown above)
│       ├── pedia_open_category [UI]  (subtree shown above)
│       ├── pedia_get_entry_name [UI]
│       │     Gets the name string for a Civilopedia entry by index from a linked list.
│       ├── pedia_unit_draw_details [UI]
│       │     Draws the full unit detail page in the Civilopedia. Shows unit sprite, name, stats (attack, defense, hit points, fire...
│       │   ├── rect_get_width [UI]
│       │   ├── rect_get_height [UI]
│       │   ├── invalidate_region [UI]  (subtree shown above)
│       │   ├── set_rect_abs [UI]
│       │   ├── text_begin [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── text_add_label_id [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── get_font_height [UI]
│       │   ├── measure_text_height [UI]  (subtree shown above)
│       │   ├── text_begin_bold [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── unknown (get panel icon width) [UI]  (subtree shown above)
│       │   ├── unknown (get panel icon height) [UI]  (subtree shown above)
│       │   ├── pedia_init_tabs [UI]  (subtree shown above)
│       │   ├── pedia_show_description [UI]  (subtree shown above)
│       │   ├── pedia_add_hyperlink [UI]  (subtree shown above)
│       │   ├── unknown (pedia_draw_background_panel) [UI]  (subtree shown above)
│       │   ├── port_set_rect [UI]
│       │   ├── port_set_clip_rect [UI]
│       │   ├── port_fill_rect_pattern [UI]  (subtree shown above)
│       │   ├── port_get_font [UI]  (subtree shown above)
│       │   ├── unknown (set/get draw color) [UI]
│       │   ├── scale_table_build_primary [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── scale_table_get_current [UI]
│       │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│       │   └── (7 FW callees filtered)
│       ├── modal_dialog_run [UI]  (subtree shown above)
│       └── (1 FW callees filtered)
├── city_button_view [MIXED] *** STATE MUTATION ***  -- deferred UI: city view
│     Handles the "View" button (shows advisor/improvement details). Defers if network busy.
│   └── show_advisor_screen [UI]
│         Creates and shows the advisor screen dialog. Allocates the advisor object, initializes it with a city, shows the dial...
│       ├── advisor_ctor [UI]
│       │     Constructs the advisor screen object, initializing member variables, string arrays, sprite data, and layout geometry.
│       │   ├── init_sprite_surface_mgr [UI]  (subtree shown above)
│       │   ├── init_render_surface [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── unknown (pedia object initializer) [UI]
│       │   ├── get_screen_rect [UI]
│       │   ├── palette_init [UI]  (subtree shown above)
│       │   └── (4 FW callees filtered)
│       ├── advisor_init_with_city [UI]
│       │     Initializes the advisor screen for a specific city, loading art resources, setting up portrait positions, creating ic...
│       │   ├── get_city_epoch [GL]
│       │   │   └── civ_has_tech [GL]  (subtree shown above)
│       │   ├── pedia_set_resource [UI]
│       │   │   └── (2 FW callees filtered)
│       │   ├── advisor_setup_portraits [UI]
│       │   │   ├── is_tile_valid [GL]
│       │   │   ├── wrap_x [GL]
│       │   │   └── get_tile_ptr [GL]  (subtree shown above)
│       │   ├── advisor_load_icon_surface [UI]
│       │   │   ├── port_alloc_rect [UI]  (subtree shown above)
│       │   │   └── load_gif_resource [UI]  (subtree shown above)
│       │   ├── advisor_setup_background [UI]
│       │   │   ├── set_callback_paint [UI]
│       │   │   ├── update_palette [UI]  (subtree shown above)
│       │   │   ├── has_building [GL]  (subtree shown above)
│       │   │   ├── advisor_composite_and_title [UI]
│       │   │   │   ├── init_palette_system [UI]
│       │   │   │   ├── advisor_draw_title [UI]
│       │   │   │   │   └── ... (7 more callees, depth limit)
│       │   │   │   ├── set_active_surface [UI]  (subtree shown above)
│       │   │   │   └── port_blit_stretch [UI]  (subtree shown above)
│       │   │   ├── get_civ_era_level [GL]  (subtree shown above)
│       │   │   ├── create_offscreen_surface_b [UI]  (subtree shown above)
│       │   │   ├── load_gif_resource [UI]  (subtree shown above)
│       │   │   ├── surface_init_8 [UI]  (subtree shown above)
│       │   │   └── (1 FW callees filtered)
│       │   ├── advisor_render_building_grid [UI]
│       │   │   ├── flush_at_origin [UI]  (subtree shown above)
│       │   │   ├── has_building [GL]  (subtree shown above)
│       │   │   ├── advisor_pop_wonder_shuffle [UI]
│       │   │   │   └── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│       │   │   ├── advisor_pop_building_shuffle [UI]
│       │   │   │   └── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│       │   │   ├── advisor_assign_building_sprite [UI]
│       │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]  (subtree shown above)
│       │   │   │   └── sprite_replace_color [UI]
│       │   │   │       └── ... (4 more callees, depth limit)
│       │   │   ├── advisor_assign_wonder_sprite [UI]
│       │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]  (subtree shown above)
│       │   │   │   └── sprite_replace_color [UI]  (subtree shown above)
│       │   │   ├── advisor_place_building_sprite [UI]
│       │   │   │   └── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│       │   │   ├── advisor_place_building_sprite_2 [UI]
│       │   │   │   └── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│       │   │   ├── advisor_place_wonder_sprite [UI]
│       │   │   │   └── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│       │   │   ├── advisor_place_wonder_sprite_2 [UI]
│       │   │   │   └── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│       │   │   ├── rng_set_seed [GL] *** STATE MUTATION ***
│       │   │   └── rng_range [GL] *** STATE MUTATION ***  (subtree shown above)
│       │   ├── advisor_blit_icons [UI]
│       │   │   ├── advisor_composite_and_title [UI]  (subtree shown above)
│       │   │   └── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│       │   ├── get_civ_era_level [GL]  (subtree shown above)
│       │   ├── port_alloc_rect [UI]  (subtree shown above)
│       │   ├── load_gif_resource [UI]  (subtree shown above)
│       │   ├── unknown (sprite extract with transp + rect params) [UI]  (subtree shown above)
│       │   ├── sprite_replace_color [UI]  (subtree shown above)
│       │   └── (4 FW callees filtered)
│       ├── advisor_show_dialog [UI]
│       │     Shows the advisor dialog by preparing surfaces, running the modal dialog loop, and cleaning up.
│       │   ├── show_window_wrapper [UI]  (subtree shown above)
│       │   ├── manage_window_show [UI]  (subtree shown above)
│       │   ├── start_cursor_blink [UI]  (subtree shown above)
│       │   ├── stop_cursor_blink [UI]  (subtree shown above)
│       │   ├── init_palette_system [UI]
│       │   │   └── (1 FW callees filtered)
│       │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│       │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│       │   └── modal_dialog_run [UI]  (subtree shown above)
│       └── (1 FW callees filtered)
├── city_button_rename [MIXED] *** STATE MUTATION ***  -- deferred UI: city rename
│     Handles the city rename button. Shows text input dialog, validates, updates city name, refreshes displays.
│   ├── FUN_00009429 [?]
│   ├── unknown (dialog show 4 params) [UI]  (subtree shown above)
│   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── redraw_map_all_players [UI]  (subtree shown above)
│   └── _strcpy_thunk [FW]
│         CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── dequeue_stacked_draw [MIXED] *** STATE MUTATION ***  -- draw queue processing
│     Dequeues and processes one drawing command from the stacked draw buffer. Handles unit movement animation (type 0x70),...
│   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── update_map_area_all_players [UI]  (subtree shown above)
│   ├── update_tile_all_players [UI]  (subtree shown above)
│   ├── update_radius1_all_players [UI]  (subtree shown above)
│   ├── redraw_map_all_players [UI]  (subtree shown above)
│   ├── is_tile_visible_to_any_player [UI]
│   │     Checks if a tile is visible to any active player viewport that can see the tile (has fog-of-war visibility).
│   │   ├── is_tile_visible [UI]  (subtree shown above)
│   │   └── get_tile_explored [GL]  (subtree shown above)
│   ├── animate_unit_movement [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── animate_combat_movement [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── animate_nuke_explosion [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── refresh_combat_tiles [UI]  (subtree shown above)
│   ├── validate_unit_stack [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── get_first_unit_in_stack [GL]  (subtree shown above)
│   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   ├── sum_stack_property [GL]  (subtree shown above)
│   ├── get_tile_ptr [GL]  (subtree shown above)
│   ├── get_tile_explored [GL]  (subtree shown above)
│   └── set_tile_improvement_bits [GL] *** STATE MUTATION ***  (subtree shown above)
├── enqueue_stacked_draw [UI] *** STATE MUTATION ***  -- opcodes 0x70-0x7D: draw enqueue
│     Enqueues a drawing command into the stacked draw circular buffer (100 entries at DAT_006ad920, stride 0x40). Used for...
│   ├── enqueue_stacked_draw [UI] *** STATE MUTATION ***  (subtree shown above)
│   └── fatal_error [FW]
│         Reports a fatal error: records error number, formats error message with file/line info, shows message box.
│       ├── unknown (show_fatal_error_box) [UI]
│       │     Shows "SMEDS Application Error" message box.
│       │   └── FUN_0000DD00 [?]
│       └── (2 FW callees filtered)
├── delete_city [GL] *** STATE MUTATION ***  -- opcode 0x39: delete city
│     Deletes a city from the game. Handles unit reassignment, trade route removal, wonder invalidation, tile ownership cle...
│   ├── FUN_00009429 [?]
│   ├── FUN_0000C449 [?]
│   ├── is_tile_valid [GL]
│   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── show_dialog_message [UI]  (subtree shown above)
│   ├── unknown (get mp object byte) [FW]
│   │     Returns a single byte from offset 0x1ef within the current object (in_ECX).
│   ├── find_city_at [GL]  (subtree shown above)
│   ├── city_update_tile_workers [GL] *** STATE MUTATION ***
│   │     Updates the map tile worker assignments for a city. Iterates 45 tiles in the city radius, updating ownership and work...
│   │   ├── is_tile_valid [GL]
│   │   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL]
│   │   │     Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   │   ├── get_tile_fertility [GL]  (subtree shown above)
│   │   ├── set_tile_fertility [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── set_tile_city_radius_owner [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │     Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing.
│   │   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── remove_trade_route [GL] *** STATE MUTATION ***
│   │     Removes a trade route at index param_2 from city param_1 by shifting subsequent trade route entries down and decremen...
│   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │     The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── wrap_x [GL]
│   │     Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   ├── get_next_unit_in_stack [GL]  (subtree shown above)
│   ├── find_unit_stack_at_xy [GL]  (subtree shown above)
│   ├── count_units_by_role [GL]  (subtree shown above)
│   ├── delete_unit_visible [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── is_tile_ocean [GL]  (subtree shown above)
│   ├── get_tile_city_radius_owner [GL]  (subtree shown above)
│   ├── get_tile_fertility [GL]  (subtree shown above)
│   ├── get_tile_controller [GL]  (subtree shown above)
│   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── set_tile_fertility [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── set_tile_city_radius_owner [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │     Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing.
│   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
├── create_city [GL] *** STATE MUTATION ***  -- opcode 0x3B: create city
│     Creates a new city at (param_1, param_2) for civ param_3. Initializes the full city record, assigns a name, sets defa...
│   ├── is_tile_valid [GL]
│   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── show_dialog_message [UI]  (subtree shown above)
│   ├── get_tick_count_wrapper [FW]
│   │     Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   │   └── (1 FW callees filtered)
│   ├── unknown (get mp object byte) [FW]
│   │     Returns a single byte from offset 0x1ef within the current object (in_ECX).
│   ├── set_building [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── calc_city_trade_desirability [GL] *** STATE MUTATION ***
│   │     Massive function that computes trade desirability scores for all 16 commodity types for a given city, based on terrai...
│   │   ├── is_tile_valid [GL]
│   │   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── has_building [GL]  (subtree shown above)
│   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   ├── wrap_x [GL]
│   │   │     Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   │   ├── bit_index_to_byte_mask [GL]
│   │   │     Converts a bit index to byte offset and bit mask. `*param_2 = param_1 >> 3` (byte), `*param_3 = 1 << (param_1 & 7)` (...
│   │   ├── shift_by_signed [GL]
│   │   │     Shifts param_1 by param_2 bits. If param_2 > 0, left shift. If param_2 < 0, right shift by abs(param_2). If param_2 =...
│   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   │   ├── get_tile_continent [GL]  (subtree shown above)
│   │   ├── check_tile_resource [GL]  (subtree shown above)
│   │   ├── get_tile_improvements [GL]  (subtree shown above)
│   │   └── (2 FW callees filtered)
│   ├── assign_city_name [GL] *** STATE MUTATION ***
│   │     Assigns a city name from the civilization's city name list in game text files. Handles wraparound and extra names sec...
│   │   └── (5 FW callees filtered)
│   ├── city_update_tile_workers [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── debug_show_message [UI]  (subtree shown above)
│   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │     The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── can_build_unit_type [GL]  (subtree shown above)
│   ├── clamp [FW]
│   │     Clamps a value to [min, max] range. Identical logic to FUN_005a1a44 (clamp_value).
│   ├── wrap_x [GL]
│   │     Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   ├── create_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── get_tile_ptr [GL]  (subtree shown above)
│   ├── get_tile_terrain_raw [GL]  (subtree shown above)
│   ├── is_tile_ocean [GL]  (subtree shown above)
│   ├── get_tile_continent [GL]  (subtree shown above)
│   ├── update_civ_visibility [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │     Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing.
│   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
├── create_unit [GL] *** STATE MUTATION ***  -- opcode 0x3D: create unit  (subtree shown above)
├── pick_up_unit_004c9528 [GL] *** STATE MUTATION ***  -- opcode 0x3F: pick up unit  (subtree shown above)
├── move_unit [GL] *** STATE MUTATION ***  -- opcode 0x45: move unit  (subtree shown above)
├── move_unit_to_bottom [GL] *** STATE MUTATION ***  -- opcode 0x45: move unit to bottom  (subtree shown above)
├── process_city_production [GL] *** STATE MUTATION ***  -- opcode 0x47: city production
│     Massive end-of-turn city production processing function. Handles completing buildings, wonders, units, and special it...
│   ├── show_message [UI]
│   │     Stores a message string in the message buffer at the specified slot index.
│   │   └── (1 FW callees filtered)
│   ├── get_civ_name [UI]  (subtree shown above)
│   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   ├── set_improvement_name_string [UI]  (subtree shown above)
│   ├── trade_supply_demand_show [UI]
│   │     Shows the supply/demand details for a specific trade commodity in a specific city. Lists all cities that supply or de...
│   ├── has_building [GL]  (subtree shown above)
│   ├── set_building [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── check_auto_improvement [GL]
│   │     Checks if a city should auto-build a Granary (9) or Aqueduct (23/0x17) based on city size thresholds. Returns the bui...
│   │   └── has_building [GL]  (subtree shown above)
│   ├── change_city_production [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── has_spaceship_launched [GL]
│   │     Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   ├── has_spaceship_built [GL]
│   │     Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   ├── wonder_view_init [UI]
│   │     Initializes the wonder view display: constructs the wonder view object, loads wonder art, plays wonder video (if appl...
│   │   ├── unknown (stop music) [UI]
│   │   │     Stops music playback and sets paused flag.
│   │   │   └── (1 FW callees filtered)
│   │   ├── resume_music [UI]  (subtree shown above)
│   │   ├── wonder_view_construct [UI]
│   │   │     Constructs the wonder view object, setting up MFC base classes and storing global pointer in DAT_006a1864.
│   │   │   ├── dialog_ctor [UI]  (subtree shown above)
│   │   │   ├── palette_init [UI]  (subtree shown above)
│   │   │   └── (2 FW callees filtered)
│   │   ├── load_civ2_art_004bbb3f [UI]
│   │   │     Loads wonder artwork from "civ2.wonder.dll", extracts the specific wonder's GIF sprite, creates a scaled bitmap surfa...
│   │   │   ├── set_callback_paint [UI]
│   │   │   ├── flush_at_origin [UI]  (subtree shown above)
│   │   │   ├── pedia_free_resource [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI]  (subtree shown above)
│   │   │   ├── wonder_view_refresh_surface [UI]
│   │   │   │   ├── set_dialog_background [UI] *** STATE MUTATION ***
│   │   │   │   └── unknown (dialog_render_title_bar) [UI]  (subtree shown above)
│   │   │   ├── dialog_create [UI]  (subtree shown above)
│   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   ├── port_alloc_rect [UI]  (subtree shown above)
│   │   │   ├── load_gif_resource [UI]  (subtree shown above)
│   │   │   ├── port_fill_rect [UI]  (subtree shown above)
│   │   │   ├── port_set_color [UI]  (subtree shown above)
│   │   │   ├── sprite_reset [UI]
│   │   │   │   ├── sprite_init_record [UI]
│   │   │   │   └── (2 FW callees filtered)
│   │   │   ├── unknown (sprite extract with transp + rect params) [UI]  (subtree shown above)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   │   └── (11 FW callees filtered)
│   │   ├── wonder_view_play_video [UI]
│   │   │     Plays a wonder video (AVI) if available and video features are enabled. Checks for "civ2.video.wonder##.avi" file, lo...
│   │   │   ├── set_callback_paint [UI]
│   │   │   ├── show_window_wrapper [UI]  (subtree shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]  (subtree shown above)
│   │   │   ├── unknown (manage pedia window) [UI]  (subtree shown above)
│   │   │   ├── fade_out_palette [UI]  (subtree shown above)
│   │   │   ├── fade_in_palette [UI]  (subtree shown above)
│   │   │   ├── wonder_view_resize [UI]
│   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   └── (1 FW callees filtered)
│   │   │   │   ├── unknown (GDI operation on pedia window) [UI]  (subtree shown above)
│   │   │   │   ├── dialog_create_buttons [UI]  (subtree shown above)
│   │   │   │   ├── set_active_surface [UI]  (subtree shown above)
│   │   │   │   ├── scroll_to_clamped [UI]
│   │   │   │   │   ├── set_surface_size [UI]
│   │   │   │   │   │   └── ... (1 more callees, depth limit)
│   │   │   │   │   ├── get_scroll_min [UI]
│   │   │   │   │   └── get_scroll_max [UI]
│   │   │   │   ├── port_fill_rect [UI]  (subtree shown above)
│   │   │   │   └── (1 FW callees filtered)
│   │   │   ├── modal_dialog_run [UI]  (subtree shown above)
│   │   │   └── (10 FW callees filtered)
│   │   ├── pedia_navigate_to_item [UI]  (subtree shown above)
│   │   └── (4 FW callees filtered)
│   ├── civ_has_tech [GL]  (subtree shown above)
│   ├── upgrade_units_for_tech [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── can_build_unit_type [GL]  (subtree shown above)
│   ├── complete_research [MIXED] *** STATE MUTATION ***
│   │     Completes a tech research for a civ. Calls handle_tech_discovery to process the tech. For human players, shows the di...
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── text_newline [UI]
│   │   │     Adds a newline to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── display_improvement [UI]
│   │   │     Adds an improvement/government icon to the text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_number [UI]
│   │   │     Adds a number to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── show_dialog_message [UI]  (subtree shown above)
│   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │     Sets a string control value in the multiplayer dialog string table. Copies param_2 into the string slot at index para...
│   │   │   └── (1 FW callees filtered)
│   │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   ├── dialog_set_title [UI]  (subtree shown above)
│   │   ├── reassign_all_city_production [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── get_civ_adjective_name [GL]
│   │   │     Returns the adjective form of a civilization name. Uses custom name if set.
│   │   │   └── (1 FW callees filtered)
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   ├── handle_tech_government_effects [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── we_love_the_king_day [GL]  (subtree shown above)
│   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── unknown (choose research wrapper) [GL] *** STATE MUTATION ***
│   │   │     Wrapper that calls choose_research_tech(param_1, 0) — the "choose next research" entry point.
│   │   │   └── choose_research_tech [MIXED] *** STATE MUTATION ***
│   │   │       ├── text_begin [UI]
│   │   │       │   └── (1 FW callees filtered)
│   │   │       ├── text_newline [UI]
│   │   │       │   └── (1 FW callees filtered)
│   │   │       ├── display_improvement [UI]
│   │   │       │   └── (1 FW callees filtered)
│   │   │       ├── text_add_number [UI]
│   │   │       │   └── (1 FW callees filtered)
│   │   │       ├── show_message [UI]
│   │   │       │   └── (1 FW callees filtered)
│   │   │       ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │       ├── dialog_set_icon [UI]
│   │   │       ├── dialog_set_title [UI]  (subtree shown above)
│   │   │       ├── init_game_display [UI]  (subtree shown above)
│   │   │       ├── civ_has_tech [GL]  (subtree shown above)
│   │   │       ├── ai_pick_research_goal [AI]
│   │   │       │   ├── ai_calc_tech_value [AI]
│   │   │       │   │   └── ... (4 more callees, depth limit)
│   │   │       │   └── can_research_tech [GL]  (subtree shown above)
│   │   │       ├── show_research_goal_dialog [UI]
│   │   │       │   ├── text_begin [UI]
│   │   │       │   ├── text_add_label_id [UI]
│   │   │       │   ├── select_list_item [UI]  (subtree shown above)
│   │   │       │   ├── text_newline [UI]
│   │   │       │   ├── display_improvement [UI]
│   │   │       │   ├── text_add_number [UI]
│   │   │       │   ├── open_list_dialog [UI]  (subtree shown above)
│   │   │       │   ├── unknown (string pool append separator) [UI]
│   │   │       │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   │       │   ├── set_improvement_name_string [UI]  (subtree shown above)
│   │   │       │   ├── dialog_set_icon [UI]
│   │   │       │   ├── dialog_set_title [UI]  (subtree shown above)
│   │   │       │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   │       │   ├── tech_is_descendant_of [GL]
│   │   │       │   │   └── ... (1 more callees, depth limit)
│   │   │       │   ├── pedia_select_entry [UI]  (subtree shown above)
│   │   │       │   ├── pedia_navigate_to_item [UI]  (subtree shown above)
│   │   │       │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │       │   ├── popup_add_edit_field [UI]
│   │   │       │   ├── popup_set_field_38 [UI]
│   │   │       │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │       │   ├── popup_add_action_button_label [UI]
│   │   │       │   ├── pedia_select_unit_type [UI]  (subtree shown above)
│   │   │       │   └── (2 FW callees filtered)
│   │   │       ├── pedia_select_entry [UI]  (subtree shown above)
│   │   │       ├── popup_dialog_create [UI]  (subtree shown above)
│   │   │       ├── popup_dialog_destroy [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   │       ├── popup_add_edit_field [UI]
│   │   │       │   └── (2 FW callees filtered)
│   │   │       ├── popup_set_position_fields [UI]
│   │   │       ├── popup_add_button [UI]  (subtree shown above)
│   │   │       ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   │       ├── popup_show_modal [UI]  (subtree shown above)
│   │   │       └── (1 FW callees filtered)
│   │   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │   │     Sets the paradrop range for a unit type. Writes to the unit type table.
│   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── pedia_select_entry [UI]  (subtree shown above)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   └── popup_add_button [UI]  (subtree shown above)
│   ├── acquire_wonder [GL] *** STATE MUTATION ***
│   │     Acquires (completes) a wonder for a city. In single-player, directly assigns the wonder. In multiplayer, sends reques...
│   │   ├── set_building [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │     The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   └── (2 FW callees filtered)
│   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── show_city_event_dialog [UI] *** STATE MUTATION ***
│   │     Shows a city event notification dialog (e.g., "Building completed", "Famine", etc.). Creates a popup with buttons for...
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_string [UI]
│   │   │     Appends a string to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── select_list_item [UI]  (subtree shown above)
│   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │     Sets a string control value in the multiplayer dialog string table. Copies param_2 into the string slot at index para...
│   │   │   └── (1 FW callees filtered)
│   │   ├── dialog_set_title [UI]  (subtree shown above)
│   │   ├── popup_dialog_create [UI]  (subtree shown above)
│   │   ├── popup_set_default_selection [UI]  (subtree shown above)
│   │   ├── popup_add_radio_option [UI]  (subtree shown above)
│   │   └── (3 FW callees filtered)
│   ├── show_city_event_dialog_v2 [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── assign_caravan_commodity [GL] *** STATE MUTATION ***
│   │     Assigns a trade commodity to a newly built caravan/freight unit. Randomly selects from the city's 3 supply commodities.
│   ├── handle_espionage_discovery [GL] *** STATE MUTATION ***
│   │     Handles discovery of espionage (spy embassy established). Halves defense rating, sets espionage flag, and penalizes d...
│   │   └── adjust_attitude [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── handle_space_race_victory [GL] *** STATE MUTATION ***
│   │     Handles space race victory condition. If multiplayer scenario version < 3 or scenario flag set, reveals entire map an...
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── redraw_map_all_players [UI]  (subtree shown above)
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   │   ├── get_tile_ptr [GL]  (subtree shown above)
│   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── set_civ_tile_data [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │     Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing.
│   │   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── city_message_wrapper [UI]
│   │     Wrapper to display a city-related message. Passes through to thunk_FUN_004eb571 with param_3 inserted as 0.
│   │   └── show_city_event_dialog [UI] *** STATE MUTATION ***  (subtree shown above)
│   ├── draw_production_box [UI]  (subtree shown above)
│   ├── draw_improvements_list [UI]
│   │     Draws the city improvements list with building names and wonders. Each entry shows building icon and name. Supports s...
│   │   ├── rect_get_width [UI]
│   │   │     Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI]
│   │   │     Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── invalidate_region [UI]  (subtree shown above)
│   │   ├── set_rect_wh [UI]
│   │   │     Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_label_id [UI]
│   │   │     Appends a localized label (by ID) to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── scrollbar_set_position [UI]  (subtree shown above)
│   │   ├── scrollbar_set_range [UI]  (subtree shown above)
│   │   ├── display_improvement [UI]
│   │   │     Adds an improvement/government icon to the text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── draw_text_at [UI]  (subtree shown above)
│   │   ├── draw_text_centered [UI]  (subtree shown above)
│   │   ├── has_building [GL]  (subtree shown above)
│   │   ├── close_dialog [UI]  (subtree shown above)
│   │   ├── set_sprite_scale [UI]  (subtree shown above)
│   │   ├── reset_sprite_scale [UI]  (subtree shown above)
│   │   ├── citywin_prepare_panel [UI]  (subtree shown above)
│   │   ├── invalidate_rect_region [UI]  (subtree shown above)
│   │   ├── scale_universal [UI]
│   │   │     Scales a value based on the display scale factor at `this + 0x15d4`. If scale != 2, returns `(scale * param_1) / 2`; ...
│   │   ├── set_text_style [UI]
│   │   │     Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│   │   ├── unknown (sprite blit wrapper 1) [UI]  (subtree shown above)
│   │   └── set_scrollbar [UI]
│   │         Sets scrollbar position if within valid range.
│   │       └── unknown (get_scroll_range) [UI]
│   │           └── scrollbar_get_range [UI]
│   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   ├── spaceship_ai_evaluate [AI]
│   │     AI evaluation of which spaceship category to build next. Checks if structural/component/module sections are complete,...
│   │   ├── has_spaceship_launched [GL]
│   │   │     Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── civ_has_tech [GL]  (subtree shown above)
│   │   ├── spaceship_get_category_count [GL]
│   │   │     Gets the total max allowed for a spaceship category: structural (type 0), components (types 1+2 summed), or modules (...
│   │   │   └── spaceship_get_max_component [GL]
│   │   │       └── (1 FW callees filtered)
│   │   ├── spaceship_get_raw_count [GL]
│   │   │     Returns the raw (unclamped) total count of spaceship parts for a category. Category 0=structural count, 1=fuel+propul...
│   │   ├── spaceship_get_clamped_category [GL]
│   │   │     Returns the clamped total for a spaceship category (sum of clamped individual component counts).
│   │   │   └── spaceship_get_clamped_count [GL]  (subtree shown above)
│   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── unknown (spaceship section complete check) [GL]
│   │   │     Returns true if a civ's raw component count for a category meets or exceeds the global maximum for that category.
│   │   │   ├── spaceship_get_max_category [GL]
│   │   │   └── spaceship_get_raw_count [GL]
│   │   └── spaceship_can_build_category [GL]
│   │         Checks if a civ can build in a spaceship category. Returns 1 if: the category max isn't reached, or the raw count is ...
│   │       ├── civ_has_tech [GL]  (subtree shown above)
│   │       ├── spaceship_get_raw_count [GL]
│   │       ├── unknown (spaceship section complete check) [GL]  (subtree shown above)
│   │       └── unknown (spaceship category full check) [GL]
│   │           ├── spaceship_get_category_count [GL]  (subtree shown above)
│   │           └── spaceship_get_raw_count [GL]
│   ├── spaceship_human_build [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── spaceship_check_complete_section [GL]
│   │     Checks if a spaceship section is complete. param_2: 0x23=structural, 0x24=components, 0x25=modules. Returns 1 if all ...
│   ├── spaceship_ai_should_start [AI]  (subtree shown above)
│   ├── clamp [FW]
│   │     Clamps a value to [min, max] range. Identical logic to FUN_005a1a44 (clamp_value).
│   ├── create_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── find_nearest_unit [GL] *** STATE MUTATION ***
│   │     Finds the nearest unit to a position, optionally filtered by owner civ. Returns unit index or -1.
│   │   └── calc_movement_cost [GL]  (subtree shown above)
│   ├── get_tile_continent [GL]  (subtree shown above)
│   └── get_unit_owner_at [GL]  (subtree shown above)
├── set_unit_goto_order [GL] *** STATE MUTATION ***  -- opcode 0x51: set goto order  (subtree shown above)
├── establish_trade_route [GL] *** STATE MUTATION ***  -- opcode 0x55: establish trade route  (subtree shown above)
├── new_civ [GL] *** STATE MUTATION ***  -- opcode 0x5F: new civilization
│     Creates a new civilization. Initializes all per-civ game state arrays, selects a tribe, finds a starting position on ...
│   ├── is_tile_valid [GL]
│   │     Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── show_dialog_message [UI]  (subtree shown above)
│   ├── get_tick_count_wrapper [FW]
│   │     Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   │   └── (1 FW callees filtered)
│   ├── find_nearest_city [GL]  (subtree shown above)
│   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │     The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   ├── ai_decay_and_merge_goals [AI] *** STATE MUTATION ***
│   │     Decays AI goal priorities (negates negative ones = removes expired goals) and merges goal list B into goal list A.
│   │   ├── ai_negate_goal_priority [AI] *** STATE MUTATION ***
│   │   │     Negates the priority of an AI goal entry. Takes absolute value then negates it, effectively flipping the sign.
│   │   └── ai_add_goal_a [AI] *** STATE MUTATION ***  (subtree shown above)
│   ├── ai_clear_goals_b [AI] *** STATE MUTATION ***
│   │     Clears all 16 entries in AI goal list B for a given civ. Sets type to 0xFF and priority to 0.
│   ├── handle_tech_discovery [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── complete_research [MIXED] *** STATE MUTATION ***  (subtree shown above)
│   ├── clamp [FW]
│   │     Clamps a value to [min, max] range. Identical logic to FUN_005a1a44 (clamp_value).
│   ├── popcount_byte [FW]
│   │     Counts the number of set bits in the low 8 bits of param_1 (population count).
│   ├── calc_movement_cost [GL]  (subtree shown above)
│   ├── create_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── get_tile_ptr [GL]  (subtree shown above)
│   ├── is_tile_ocean [GL]  (subtree shown above)
│   ├── get_tile_continent [GL]  (subtree shown above)
│   ├── (get_tile_fertility_or_city_radius) [GL]  (subtree shown above)
│   ├── get_tile_controller [GL]  (subtree shown above)
│   ├── check_tile_goody_hut [GL]  (subtree shown above)
│   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │     Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing.
│   └── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
├── kill_civ [GL] *** STATE MUTATION ***  -- opcode 0x60: kill civilization
│     Destroys a civilization. Removes all units, shows destruction message, records in kill history, clears map visibility...
│   ├── show_dialog_message [UI]  (subtree shown above)
│   ├── get_tick_count_wrapper [FW]
│   │     Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   │   └── (1 FW callees filtered)
│   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │     Sets a string control value in the multiplayer dialog string table. Copies param_2 into the string slot at index para...
│   │   └── (1 FW callees filtered)
│   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── play_music_track [UI]  (subtree shown above)
│   ├── redraw_map_all_players [UI]  (subtree shown above)
│   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │     The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   ├── get_civ_people_name [GL]
│   │     Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   └── (1 FW callees filtered)
│   ├── get_civ_adjective_name [GL]
│   │     Returns the adjective form of a civilization name. Uses custom name if set.
│   │   └── (1 FW callees filtered)
│   ├── mp_encrypt_passwords [FW] *** STATE MUTATION ***
│   │     Encrypts the password buffer using a simple rotation + XOR cipher. Each byte is rotated right 3, combined with previo...
│   ├── mp_decrypt_passwords [FW] *** STATE MUTATION ***
│   │     Decrypts the password buffer. Reverse of mp_encrypt_passwords: XOR with index, then rotate left 3.
│   ├── reset_spaceship [GL] *** STATE MUTATION ***
│   │     Resets spaceship data for civ param_1 to all zeros.
│   ├── destroy_spaceship [MIXED] *** STATE MUTATION ***
│   │     Destroys a civ's spaceship, showing appropriate message (returned/destroyed). Resets spaceship data.
│   │   ├── show_message [UI]
│   │   │     Stores a message string in the message buffer at the specified slot index.
│   │   │   └── (1 FW callees filtered)
│   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   ├── unknown (dialog show single param) [UI]  (subtree shown above)
│   │   ├── reset_spaceship [GL] *** STATE MUTATION ***
│   │   │     Resets spaceship data for civ param_1 to all zeros.
│   │   ├── has_spaceship_launched [GL]
│   │   │     Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── has_spaceship_built [GL]
│   │   │     Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   │   └── enqueue_mp_event [MIXED]  (subtree shown above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── spy_diplomat_action [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── enqueue_mp_event [MIXED]  (subtree shown above)
│   ├── delete_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │     Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing.
│   ├── end_map_batch [GL] *** STATE MUTATION ***  (subtree shown above)
│   └── _strcpy_thunk [FW]
│         CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── spy_diplomat_action [GL] *** STATE MUTATION ***  -- opcode 0x64: spy/diplomat action  (subtree shown above)
├── city_set_specialist_slot [GL] *** STATE MUTATION ***  -- opcode 0x88: specialist cycle  (subtree shown above)
├── diplo_sign_ceasefire [GL] *** STATE MUTATION ***  -- opcode 0xA4: sign ceasefire
│     Signs a ceasefire — sets treaty flags 0x4002, clears mobilization flag 0x40000, clamps attitude, records turn, clears...
│   ├── show_message [UI]
│   │     Stores a message string in the message buffer at the specified slot index.
│   │   └── (1 FW callees filtered)
│   ├── show_dialog_message [UI]  (subtree shown above)
│   ├── get_civ_name [UI]  (subtree shown above)
│   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION ***
│   │     The core AI diplomacy evaluation function. Computes all diplomacy decision variables: military threat, demand amount,...
│   │   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   │   ├── clear_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── calc_attitude [GL]
│   │   │     Converts a raw attitude value (0-100) into an attitude category (0-8). Pure function with no side effects.
│   │   ├── should_declare_war [GL]  (subtree shown above)
│   │   ├── has_spaceship_launched [GL]
│   │   │     Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── ai_choose_government [AI] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── spaceship_ai_should_start [AI]  (subtree shown above)
│   │   ├── find_nearest_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── get_unit_owner_at [GL]  (subtree shown above)
│   │   └── (1 FW callees filtered)
│   ├── diplo_show_attitude_header [UI]
│   │     Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── text_begin [UI]
│   │   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_add_string [UI]
│   │   │     Appends a string to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── text_newline [UI]
│   │   │     Adds a newline to the global text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── display_improvement [UI]
│   │   │     Adds an improvement/government icon to the text buffer.
│   │   │   └── (1 FW callees filtered)
│   │   ├── show_message [UI]
│   │   │     Stores a message string in the message buffer at the specified slot index.
│   │   │   └── (1 FW callees filtered)
│   │   ├── get_civ_name [UI]  (subtree shown above)
│   │   └── calc_attitude [GL]
│   │         Converts a raw attitude value (0-100) into an attitude category (0-8). Pure function with no side effects.
│   ├── clear_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── set_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── get_attitude_raw [GL]
│   │     Returns the raw attitude value of civ param_1 toward civ param_2.
│   ├── set_attitude_value [GL] *** STATE MUTATION ***
│   │     Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100. Skips if multiplayer human player unless...
│   │   └── (1 FW callees filtered)
│   ├── intel_play_animation [UI]
│   │     Plays an animation frame in the intel advisor (for param types 2, 3, 4). Validates frame range before playing.
│   │   └── intel_play_video_frame [UI]
│   │         Plays one frame of the advisor video animation. Handles idle (type 0) and active (type 2-4) animations.
│   │       ├── play_sound_effect [UI] *** STATE MUTATION ***  (subtree shown above)
│   │       └── (2 FW callees filtered)
│   └── clamp [FW]
│         Clamps a value to [min, max] range. Identical logic to FUN_005a1a44 (clamp_value).
├── break_alliance [MIXED] *** STATE MUTATION ***  -- opcode 0xA4: break alliance
│     Breaks an alliance between two civs. Clears alliance flag, recalls units from each other's territory, shows notificat...
│   ├── text_begin [UI]
│   │     Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   └── (1 FW callees filtered)
│   ├── text_add_string [UI]
│   │     Appends a string to the global text buffer.
│   │   └── (1 FW callees filtered)
│   ├── show_message [UI]
│   │     Stores a message string in the message buffer at the specified slot index.
│   │   └── (1 FW callees filtered)
│   ├── show_dialog_message [UI]  (subtree shown above)
│   ├── get_civ_name [UI]  (subtree shown above)
│   ├── civ_has_active_wonder [GL]  (subtree shown above)
│   ├── clear_treaty_flags [GL] *** STATE MUTATION ***  (subtree shown above)
│   ├── recall_units_from_territory [GL] *** STATE MUTATION ***
│   │     When an alliance breaks, recalls all units of civ param_1 that are in territory belonging to civ param_2. Sends them ...
│   │   ├── find_nearest_city [GL]  (subtree shown above)
│   │   ├── city_adjacent_to_continent [GL]  (subtree shown above)
│   │   ├── calc_movement_cost [GL]  (subtree shown above)
│   │   ├── relocate_all_units [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── stack_unit [GL] *** STATE MUTATION ***  (subtree shown above)
│   │   ├── is_tile_ocean [GL]  (subtree shown above)
│   │   └── get_tile_continent [GL]  (subtree shown above)
│   ├── redraw_map_all_players [UI]  (subtree shown above)
│   └── get_civ_people_name [GL]
│         Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│       └── (1 FW callees filtered)
├── handle_revolution [GL] *** STATE MUTATION ***  -- opcode 0x9F: revolution  (subtree shown above)
├── open_tax_rate_dialog [MIXED] *** STATE MUTATION ***  -- opcode 0x9D-0x9E: tax rate dialog  (subtree shown above)
├── play_sound_effect [UI] *** STATE MUTATION ***  -- opcode 0x7A: play sound  (subtree shown above)
├── play_music_track [UI]  -- opcode 0x7B: play music  (subtree shown above)
├── mp_purge_disconnected_players [MIXED] *** STATE MUTATION ***  -- opcode 0x8C-0x8F: purge disconnected
│     Scans for disconnected players (DAT_006c3188 nonzero) and removes them from the game. Clears their bits in DAT_00655b...
│   ├── net_send_message [GL] *** STATE MUTATION ***  (subtree shown above)
│   └── netmgr_remove_client [GL] *** STATE MUTATION ***
│         Removes a client from the network game by connection ID. Finds the matching player slot, clears the human player bit ...
└── auto_save_game [UI]  -- post-poll: auto save
      Performs auto-save. Generates save filename from civ name, deletes old backup, renames current auto-save to backup, s...
    ├── text_begin [UI]
    │     Begins a new text composition operation on the global text buffer at DAT_00679640.
    │   └── (1 FW callees filtered)
    ├── text_add_string [UI]
    │     Appends a string to the global text buffer.
    │   └── (1 FW callees filtered)
    ├── text_add_label_id [UI]
    │     Appends a localized label (by ID) to the global text buffer.
    │   └── (1 FW callees filtered)
    ├── text_concat_string [FW]
    │     Concatenates param_2 onto param_1 string.
    │   └── (1 FW callees filtered)
    ├── set_save_extension [FW] *** STATE MUTATION ***
    │     Sets the default save file extension (DAT_0066c4e8) based on game type (DAT_00655b02) and param_1 (scenario flag).
    │   └── (1 FW callees filtered)
    ├── write_save_file [GL] *** STATE MUTATION ***  (subtree shown above)
    ├── get_civ_noun_name [GL]
    │     Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
    │   └── (1 FW callees filtered)
    ├── unknown — string trim leading whitespace [FW]
    │     Trims leading whitespace (spaces and tabs) from a string in-place. Calls thunk_FUN_004cfff0 first (likely trims trail...
    │   └── (2 FW callees filtered)
    └── _strcpy_thunk [FW]
          CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
```

## All State-Mutating Functions Reachable from network_poll

Total: **345** state-mutating functions reachable (unlimited depth).

| Address | Name | Cat | Summary |
|---------|------|-----|---------|
| `0x00406B4C` | minimap_calc_viewport | UI | Calculates the minimap viewport dimensions and tile sizes based on the minimap surface dimensions... |
| `0x0040C480` | taxrate_recalc_totals | MIXED | Recalculates tax/luxury/science income totals for the tax rate dialog. Temporarily swaps the civ'... |
| `0x0040CD64` | open_tax_rate_dialog | MIXED | Creates and runs the tax rate adjustment dialog. Initializes the dialog state, adjusts rates to c... |
| `0x0040DDC6` | show_tax_rate_dialog | MIXED | Shows the tax rate dialog for a civ. First checks if the civ is active (bit set in DAT_00655b0b).... |
| `0x0040E3B1` | handle_revolution | GL | Handles the player initiating a revolution. If the civ is in anarchy, shows the government select... |
| `0x004105F8` | scroll_all_views_if_needed | UI | Iterates all 8 map views and scrolls each active view if the given position is near edges. Sets/c... |
| `0x00410A64` | cancel_unit_blink_timer | UI | Cancels the unit blink timer and restores the cursor state. If a blink was active and the cursor ... |
| `0x00410D98` | center_and_scroll_to_tile | UI | Centers the map on (param_1, param_2) if the tile is valid. Updates the cursor position globals a... |
| `0x00410E46` | set_all_views_goto_cursor | UI | Sets all active map view cursors to goto mode (0x202). |
| `0x00410ED8` | cancel_goto_mode | UI | If currently in goto mode, resets all view cursors back to normal (0x201). |
| `0x00410F77` | map_window_click | MIXED | Main handler for map click events. Handles city opening, unit movement orders (goto, directional ... |
| `0x00411705` | map_double_click | MIXED | Handles double-click on the map. Opens the terrain improvement info popup for the tile under the ... |
| `0x00411A13` | move_cursor_by_direction | UI | Moves the map cursor in direction param_1 (0-7). Uses direction offset tables at DAT_00628350/DAT... |
| `0x00411A85` | handle_spectator_keypress | UI | Handles keyboard input in spectator/observer mode (DAT_006d1da8 == 0). Processes Enter/Space for ... |
| `0x00411F91` | map_ascii | MIXED | Main keyboard character handler for the map window. Routes to city window shortcuts (if city view... |
| `0x004125C6` | map_key | MIXED | Main virtual key handler for the map window. Dispatches function keys (F1-F10 = advisor screens),... |
| `0x004151E0` | copy_tech_data_to_editor | GL | Copies technology data (names and prerequisite info) from the game tech table (DAT_00627684 array... |
| `0x0041557B` | read_editor_controls | UI | Reads current values from editor dialog controls back into the editor data buffer. Returns count ... |
| `0x0041623D` | handle_editor_selection_change | UI | Handles selection change in the tech editor combo box. Reads current control values, updates the ... |
| `0x00416354` | create_editor_combo_control | UI | Creates a combo box control in the tech editor for a specific field position. Populates it with t... |
| `0x00416734` | create_editor_edit_control | UI | Creates an edit text control in the tech editor for numeric fields. |
| `0x00416C9E` | open_tech_editor | UI | Opens the full technology editor dialog. Creates all controls (combo boxes, edit fields, buttons)... |
| `0x00419D23` | parse_cosmic_parameters | GL | Parses the COSMIC section of RULES.TXT, reading 22 cosmic parameters with clamped ranges into the... |
| `0x0041E8FB` | scenario_player_selection | GL | Handles player selection for scenarios. Shows available civs with city/tech counts, allows gender... |
| `0x00421D60` | mp_set_string_control | UI | Sets a string control value in the multiplayer dialog string table. Copies param_2 into the strin... |
| `0x00421DA0` | mp_set_number_control | UI | Sets a numeric control value in the multiplayer dialog number table. |
| `0x004272D0` | reveal_tile_for_civ | GL | Reveals a map tile at (param_1, param_2) for civilization param_3. Updates tile visibility, city ... |
| `0x0042738C` | cancel_goto_if_blocked | GL | Cancels a unit's goto order if the unit has a goto order (0x0B) and its domain type is not 7 (air... |
| `0x004273E6` | cancel_goto_for_stack | GL | Cancels goto orders for all units in a stack at a given location. Iterates through the unit stack... |
| `0x004274A6` | process_unit_move_visibility | GL | Major game logic function that processes visibility updates after a unit moves. Updates fog of wa... |
| `0x00436F5A` | submit_hall_of_fame_entry | MIXED | Constructs a new Hall of Fame entry from current game state, inserts it into the sorted list, sav... |
| `0x0043CC00` | city_set_specialist_slot | GL | Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the ... |
| `0x0043D289` | set_building | GL | Sets or clears a building bit in a city's building bitfield. |
| `0x0043D400` | calc_city_trade_desirability | GL | Massive function that computes trade desirability scores for all 16 commodity types for a given c... |
| `0x0043F493` | assign_city_name | GL | Assigns a city name from the civilization's city name list in game text files. Handles wraparound... |
| `0x0043F7A7` | city_update_tile_workers | GL | Updates the map tile worker assignments for a city. Iterates 45 tiles in the city radius, updatin... |
| `0x0043F8B0` | create_city | GL | Creates a new city at (param_1, param_2) for civ param_3. Initializes the full city record, assig... |
| `0x00440325` | remove_trade_route | GL | Removes a trade route at index param_2 from city param_1 by shifting subsequent trade route entri... |
| `0x004403EC` | set_trade_route | GL | Sets a trade route slot for city param_1 at index param_2, storing the partner city ID (param_3) ... |
| `0x00440453` | establish_trade_route | GL | Establishes a trade route between city param_1 and city param_2 carrying commodity param_3. If ci... |
| `0x00440750` | process_caravan_arrival | GL | Processes a caravan/freight unit arriving at a destination city. Calculates trade revenue based o... |
| `0x004413D1` | delete_city | GL | Deletes a city from the game. Handles unit reassignment, trade route removal, wonder invalidation... |
| `0x00441B11` | change_city_production | MIXED | Changes a city's production item. Handles wonder-specific logic: starting a wonder, switching bet... |
| `0x00442541` | reassign_all_city_production | GL | Reassigns production for all cities belonging to a specific civ (param_1). Optionally filters by ... |
| `0x0044CC80` | show_throne_room | MIXED | Shows the throne room improvement screen. Checks if any throne room categories still have availab... |
| `0x0044D296` | throne_room_add_improvement | MIXED | Manages the throne room improvement selection and animation. Loads DLL, renders current state, le... |
| `0x00456F20` | adjust_attitude | GL | Adjusts the attitude value between two civs by a delta. Also updates the active diplomacy session... |
| `0x0045705E` | ai_evaluate_diplomacy | AI | The core AI diplomacy evaluation function. Computes all diplomacy decision variables: military th... |
| `0x00458AB1` | diplo_show_greeting | MIXED | Shows the diplomacy greeting screen when two civs meet. Displays attitude, leader names, and nucl... |
| `0x00458DF9` | diplo_ai_emissary | MIXED | Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the ... |
| `0x0045918E` | diplo_reset_state | GL | Resets all diplomacy session state variables to their default values and closes the intelligence ... |
| `0x0045A535` | diplo_form_alliance | GL | Forms an alliance between two civs — adjusts attitude by -25, sets treaty flag 8 (alliance), rese... |
| `0x0045A6AB` | diplo_sign_peace_treaty | GL | Signs a peace treaty — sets treaty flags 0x4004 (peace + contact), clamps attitude to 0-50 range,... |
| `0x0045A7A8` | diplo_sign_ceasefire | GL | Signs a ceasefire — sets treaty flags 0x4002, clears mobilization flag 0x40000, clamps attitude, ... |
| `0x0045A8E3` | diplo_activate_alliance_wars | GL | When an alliance is activated, makes all allies of the aggressor declare war on the target. Adjus... |
| `0x0045AC71` | diplo_declare_war | GL | Declares war from param_1 against param_2. Handles three cases: already at war (alliance), at pea... |
| `0x0045B0D6` | diplo_demand_ally_help | MIXED | Handles the human player demanding help from an ally against a common enemy. The ally may provide... |
| `0x0045B4DA` | diplo_ai_negotiate | MIXED | The enormous (10KB) AI negotiation engine. Handles cases 1 (alliance request), 2 (peace request),... |
| `0x0045DD7F` | diplo_favor_menu | MIXED | Handles the "favor menu" in diplomacy — options include tech exchange, declaring war on a third p... |
| `0x00460129` | ai_diplomacy_negotiate | GL | The main AI diplomacy negotiation function. Handles all phases of AI-to-AI and AI-to-human diplom... |
| `0x00467580` | unknown (set trade route value) | GL | Stores a value into the trade route table at index param_1. |
| `0x00467750` | clear_treaty_flags | GL | Clears specified treaty flag bits between two civilizations. Handles cascading flag dependencies:... |
| `0x00467825` | set_treaty_flags | GL | Sets specified treaty flag bits between two civilizations. Handles cascading: setting alliance (8... |
| `0x00467933` | set_attitude_value | GL | Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100. Skips if multiplayer... |
| `0x00467BAF` | recall_units_from_territory | GL | When an alliance breaks, recalls all units of civ param_1 that are in territory belonging to civ ... |
| `0x00467EF2` | break_alliance | MIXED | Breaks an alliance between two civs. Clears alliance flag, recalls units from each other's territ... |
| `0x0046AF70` | net_send_to_player | GL | Sends a network message to a specific player. Validates player ID (0-7 or 0xFF), validates messag... |
| `0x0046B0A1` | net_broadcast | GL | Broadcasts a network message to all connected players. Assigns sequence number and calls XD_SendB... |
| `0x0046B14D` | net_send_message | GL | Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type... |
| `0x0046E020` | play_sound_effect | UI | Plays a sound effect by ID. Looks up sound filename from table, checks for custom sound directory... |
| `0x00472D20` | init_unit_move_data | GL | Initializes the unit movement animation data structure at 0x006660xx. Sets unit type/owner params... |
| `0x00472F7B` | pack_viewport_state | GL | Packs viewport state from 32-bit game structures (0x00655xxx) into 16-bit save file format (0x006... |
| `0x00473D5E` | set_save_extension | FW | Sets the default save file extension (DAT_0066c4e8) based on game type (DAT_00655b02) and param_1... |
| `0x004741BE` | write_save_file | GL | Writes the complete save file. Handles both normal saves and scenario exports. Writes magic heade... |
| `0x0047A747` | calc_coast_quadrants | UI | Calculates coast/shore quadrant data for a tile by examining all 8 neighbors. Determines which qu... |
| `0x0047CBB4` | update_map_area | UI | Redraws a map area and optionally invalidates it. Handles cursor blink rendering for the active u... |
| `0x0047CD51` | redraw_entire_map | UI | Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint bu... |
| `0x0047E0E5` | enqueue_stacked_draw | UI | Enqueues a drawing command into the stacked draw circular buffer (100 entries at DAT_006ad920, st... |
| `0x0047E2B3` | dequeue_stacked_draw | MIXED | Dequeues and processes one drawing command from the stacked draw buffer. Handles unit movement an... |
| `0x0047E94E` | network_poll | MIXED | The main network polling function. Processes all incoming multiplayer messages: game state synchr... |
| `0x00488A45` | check_trade_route_path | GL | Checks if a trade route path exists between two points. Uses pathfinding to trace a route, checki... |
| `0x00489859` | select_next_unit | MIXED | Selects the next unit needing orders. Calls the unit finder, scrolls the map to the unit, activat... |
| `0x00489A0D` | activate_current_unit | MIXED | Activates the current unit for player input. Handles transition from "no unit selected" to active... |
| `0x0048DE75` | mp_purge_disconnected_players | MIXED | Scans for disconnected players (DAT_006c3188 nonzero) and removes them from the game. Clears thei... |
| `0x00492B60` | ai_negate_goal_priority | AI | Negates the priority of an AI goal entry. Takes absolute value then negates it, effectively flipp... |
| `0x00492C15` | ai_remove_goals_near | AI | Removes AI goal_b entries near a specified location. Scans 16 goal_b slots, if the goal type matc... |
| `0x00492D18` | ai_shift_goals_down_a | AI | Recursively shifts AI goal_a entries down by one position starting from param_2. Moves each entry... |
| `0x0049301B` | ai_add_goal_a | AI | Adds a goal to AI goal list A. If duplicate exists with higher priority, skips. If list full, ins... |
| `0x00493602` | ai_decay_and_merge_goals | AI | Decays AI goal priorities (negates negative ones = removes expired goals) and merges goal list B ... |
| `0x0049376F` | ai_clear_goals_b | AI | Clears all 16 entries in AI goal list B for a given civ. Sets type to 0xFF and priority to 0. |
| `0x00498310` | mp_check_password_or_set | GL | Checks if a player has a password set. If not, calls mp_set_password to create one. |
| `0x0049836A` | mp_set_password | MIXED | Implements the password set/change dialog for multiplayer. If password exists, verifies old passw... |
| `0x0049882B` | mp_update_password_flags | GL | Scans all 8 player password slots. If a password is set (first byte != 0), sets the corresponding... |
| `0x004988B8` | mp_encrypt_passwords | FW | Encrypts the password buffer using a simple rotation + XOR cipher. Each byte is rotated right 3, ... |
| `0x00498943` | mp_decrypt_passwords | FW | Decrypts the password buffer. Reverse of mp_encrypt_passwords: XOR with index, then rotate left 3. |
| `0x00498A5C` | mp_handle_player_turn | MIXED | Handles player turn authentication in multiplayer. If no password set and mode is email: prompts ... |
| `0x00498E8B` | ai_choose_city_production | AI | The massive AI city production decision function. Evaluates all possible buildings, units, and wo... |
| `0x004A74BC` | reset_spaceship | GL | Resets spaceship data for civ param_1 to all zeros. |
| `0x004A762D` | destroy_spaceship | MIXED | Destroys a civ's spaceship, showing appropriate message (returned/destroyed). Resets spaceship data. |
| `0x004A7CE9` | new_civ | GL | Creates a new civilization. Initializes all per-civ game state arrays, selects a tribe, finds a s... |
| `0x004AA378` | kill_civ | GL | Destroys a civilization. Removes all units, shows destruction message, records in kill history, c... |
| `0x004ABFE5` | find_path | GL | BFS pathfinding algorithm. Finds shortest path from (param_1,param_2) to the target stored in DAT... |
| `0x004AD076` | set_path_cost | GL | Stores a BFS path cost at map position (param_1, param_2). |
| `0x004AD0D1` | calc_path_distance | GL | Calculates path distance between two points using BFS pathfinding. Returns the path cost, or -1 i... |
| `0x004AD20F` | find_road_path | GL | Finds a path using the road/rail network between two points. Uses road connectivity maps for fast... |
| `0x004AD822` | find_nearest_road_tile | GL | Finds the nearest tile connected to the road network. Searches the tile itself and its 8 neighbors. |
| `0x004ADAFC` | calc_unit_goto_direction | GL | Calculates the next move direction for a unit executing a goto order. Uses short-range direct pat... |
| `0x004B0A41` | diff_engine_copy_sections | GL | Copies all 23 game state sections into the diff engine mirror buffer. |
| `0x004B0AD0` | diff_engine_invert_mirror | GL | Copies state into mirror then bitwise-inverts all mirror data. This forces a full diff on next sc... |
| `0x004B0B53` | diff_engine_scan_and_send | GL | Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RL... |
| `0x004B153C` | diff_engine_serialize_game | GL | Serializes 7 game state sections into a contiguous buffer with checksums. Each section gets a 0x1... |
| `0x004B18E1` | diff_engine_serialize_partial | GL | Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer. Lig... |
| `0x004B1A15` | diff_engine_serialize_full_compressed | GL | Serializes all 24 game state sections with RLE compression. Computes and stores per-section check... |
| `0x004B1C11` | diff_engine_serialize_changed_only | GL | Serializes only game state sections whose checksums have changed since last serialization. Compre... |
| `0x004B76D5` | parleywin_close | MIXED | Closes the parley window. For the main negotiation window (DAT_0067a7a8), handles pending negotia... |
| `0x004B7EB6` | parleywin_start_session | MIXED | Starts a diplomacy or chat session. For chat (type 4): validates at least one valid foreign conta... |
| `0x004B8676` | parley_set_negotiation_state | UI | Sets the negotiation state based on the current offer type (DAT_0067a9b0). Maps offer types (0-4)... |
| `0x004BD2A3` | ai_assess_tax_rate | AI | AI function to assess and adjust tax rates. Checks cities for unhappiness, disorder potential, an... |
| `0x004BE6BA` | upgrade_units_for_tech | GL | When a tech is discovered that obsoletes units, upgrades all applicable units of that civilizatio... |
| `0x004BEA84` | handle_tech_government_effects | GL | Handles side effects when a civ discovers a tech that unlocks a new government form. For Monarchy... |
| `0x004BF05B` | handle_tech_discovery | GL | Master handler for when a civilization discovers a new technology. This is one of the most import... |
| `0x004C195E` | choose_research_tech | MIXED | The main "choose research" dialog for human players. Shows current tech goal recommendation, list... |
| `0x004C21AD` | unknown (choose research wrapper) | GL | Wrapper that calls choose_research_tech(param_1, 0) — the "choose next research" entry point. |
| `0x004C21D5` | complete_research | MIXED | Completes a tech research for a civ. Calls handle_tech_discovery to process the tech. For human p... |
| `0x004C4210` | set_paradrop_range | GL | Sets the paradrop range for a unit type. Writes to the unit type table. |
| `0x004C42A0` | execute_worker_order | GL | Executes a settler/engineer work order (irrigate, mine, road, railroad, fortress, clean pollution... |
| `0x004C4D1E` | unit_order_found_city | GL | Founds a new city at the unit's location. Reveals map to the founding civ, creates the city, opti... |
| `0x004C4E6D` | unit_order_goto | GL | Executes the goto/move order for a unit. Computes direction via calc_unit_goto_direction and move... |
| `0x004C50D0` | unit_pillage | GL | Pillages improvements on a tile. Removes the highest-priority improvement (fortress > railroad > ... |
| `0x004C54DA` | ai_find_nearest_city_or_transport | AI | For AI units, finds the nearest friendly city or transport ship to go to. Sets a goto order towar... |
| `0x004C5FAE` | spy_diplomat_action | GL | Executes a spy/diplomat's action in an enemy city — handles the chance of being caught (based on ... |
| `0x004C64AA` | spy_caught_check | GL | Checks if a spy gets caught during an action. Wrapper around spy_diplomat_action with param_2=-1.... |
| `0x004C66BA` | execute_civil_war | GL | Executes a civil war — transfers nearby units from the old civ to the new rebel civ, reveals map ... |
| `0x004C6BF5` | spy_enters_city | MIXED | The enormous (10KB) spy/diplomat city action handler. Implements all espionage operations: establ... |
| `0x004C9528` | pick_up_unit_004c9528 | GL | Handles bribing/picking up an enemy unit — the player pays gold to convert an enemy unit to their... |
| `0x004C9EBD` | spy_sabotage_unit | GL | Spy option to sabotage an enemy unit — either bribe it or blow it up with explosives. For spy uni... |
| `0x004CA1CD` | execute_airlift | GL | Executes an airlift operation — moves a unit from one city to another. Has a 1-in-6 chance of bei... |
| `0x004CA39E` | execute_paradrop | GL | Executes a paradrop operation. Validates range, checks for enemy units at target, determines whic... |
| `0x004D01AE` | load_civ_power_values | GL | Loads 6 power values from a civ's data (at offset 0x594*param_1 into per-civ data) into global ar... |
| `0x004D0517` | wonder_win_init | UI | Constructor/initializer for the wonder window object. Initializes multiple sub-objects (bitmaps, ... |
| `0x004D08B0` | wonder_win_destructor | UI | Destructor for the wonder window. Frees allocated resources (3 bitmap handles), destroys sub-obje... |
| `0x004D0EA6` | show_advance_animation | UI | Main advance animation display function. Loads civ power values, builds the advance scene, sets u... |
| `0x004D8BC0` | editor_load_improvements | UI | Loads improvement data from the game's internal tables into the editor's working copies. Copies 6... |
| `0x004D8ED6` | editor_read_controls | UI | Reads values from editor dialog controls and stores them in the editor's working data. Returns co... |
| `0x004D986E` | editor_create_combo_control | UI | Creates a combo box control in the editor dialog, populating it with either improvement names or ... |
| `0x004D9A9F` | editor_create_edit_control | UI | Creates a numeric edit control in the editor dialog. |
| `0x004DA107` | editor_init | UI | Full initialization of the improvement editor window. Creates the dialog, all controls, loads dat... |
| `0x004DB690` | parley_build_packet | GL | Builds a diplomacy transaction packet. Allocates memory, populates header with magic (0x66606660)... |
| `0x004DBEE6` | parley_build_description | UI | Builds a human-readable description of a diplomacy transaction. Handles all offer types including... |
| `0x004DCAFA` | parley_describe_techs | UI | Builds text description of tech items in a diplomacy offer. Lists tech names with proper comma/an... |
| `0x004DCC0C` | parley_describe_gold | UI | Builds text description of a gold amount in a diplomacy offer. |
| `0x004DCC83` | parley_describe_units | UI | Builds text description of unit items in a diplomacy offer. Groups units by type with counts. |
| `0x004DCEA5` | parley_describe_cities | UI | Builds text description of cities and their populations in a diplomacy offer. |
| `0x004DD016` | parley_describe_attitude | UI | Builds text description of an attitude/relationship change request (war, peace, alliance). Uses d... |
| `0x004DD176` | parley_describe_maps | UI | Builds text description of map sharing items in a diplomacy offer. Lists civ names with proper se... |
| `0x004DEF54` | parley_describe_treaty | UI | Builds text describing a treaty type (ceasefire, peace, alliance, withdrawal) for diplomacy descr... |
| `0x004E02EF` | init_city_windows_layout | MIXED | Initializes the layout of all city windows. Computes window positions based on screen resolution ... |
| `0x004E068D` | load_game_handler | MIXED | Handles loading a saved game. Verifies the save file, resets game state, initializes city windows... |
| `0x004E0AB0` | show_game_options_dialog | MIXED | Shows the game options dialog with 11 checkboxes. On OK, reads checkbox states and updates the ga... |
| `0x004E0D71` | show_graphic_options_dialog | MIXED | Shows graphic options dialog with 6 checkboxes for display settings (throne room, animated herald... |
| `0x004E0F18` | show_multiplayer_options_dialog | MIXED | Shows multiplayer game options dialog. Handles turn timer and unit movement doubling settings, wi... |
| `0x004E1314` | toggle_unit_movement_doubling | GL | Toggles unit movement point doubling for multiplayer. Doubles or halves all land unit movement po... |
| `0x004E1452` | show_message_options_dialog | MIXED | Shows message notification options dialog with 11 checkboxes controlling which game events genera... |
| `0x004E1763` | kill_or_retire_civ | GL | Removes a civilization from the game (kill or retire). Destroys all units, removes cities, update... |
| `0x004E22C9` | handle_quit_or_retire | MIXED | Handles the quit or retire game action. Shows confirmation dialog, optionally shows retirement sc... |
| `0x004E2597` | toggle_hidden_terrain | UI | Toggles hidden terrain debug mode. Sets a flag, refreshes the map, shows a message, then unsets t... |
| `0x004E7270` | acquire_wonder | GL | Acquires (completes) a wonder for a city. In single-player, directly assigns the wonder. In multi... |
| `0x004E7492` | init_city_production_globals | GL | Initializes two global production variables from a city's current production type and accumulated... |
| `0x004E7549` | set_worker_tile_status | GL | Sets a worker tile status (2-bit field) in a city's tile assignment bitmask. Each tile uses 2 bit... |
| `0x004E7641` | evaluate_city_tiles | GL | Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530... |
| `0x004E790C` | set_tile_worked | GL | Sets or clears a tile's worked status in a city's worked-tiles bitmask. |
| `0x004E7967` | calc_capital_distance_and_corruption | GL | Calculates distance to capital and corruption-related variables for a city. Finds the nearest cit... |
| `0x004E7D7F` | check_unit_support | GL | Checks if a unit requires shield support based on government type. Increments counters and return... |
| `0x004E7EB1` | calc_food_box_size | GL | Calculates the food box size (rows to grow) for a city. Base value depends on difficulty and gove... |
| `0x004E80B1` | calc_shields_per_row | GL | Calculates shield production rows and unit support costs for a city. Iterates all units, determin... |
| `0x004E868F` | calc_tile_resource | GL | Calculates the food/shield/trade yield for a single city tile. Applies terrain bonuses, irrigatio... |
| `0x004E8C8C` | check_auto_irrigation_trigger | GL | Checks if auto-irrigation/mining should be triggered for a tile based on terrain type and governm... |
| `0x004E8DB5` | check_road_trade_trigger | GL | Checks if a road should be auto-built on a tile for trade bonus. Only triggers if tile has no riv... |
| `0x004E8E4D` | calc_tile_all_resources | GL | Calculates all 3 resource types (food/shields/trade) for a tile and accumulates into city totals. |
| `0x004E8ECF` | clear_and_check_worked_tiles | GL | Clears all worked tile assignments for a city. Returns flag indicating if any tile had enemy unit... |
| `0x004E8F42` | assign_worker_tiles | GL | Assigns city workers to optimal tiles. Uses a multi-pass greedy algorithm considering food, shiel... |
| `0x004E9719` | adjust_specialist_count | GL | Adjusts the specialist count stored in the upper 6 bits of DAT_0064f370. Adds or removes speciali... |
| `0x004E97AE` | sync_worker_tile_status | GL | Synchronizes worker tile status flags with the current tile assignment state. Sets status=1 for a... |
| `0x004E989A` | calc_corruption | GL | Calculates trade corruption for a city based on distance to capital, government type, and difficu... |
| `0x004E9C14` | calc_city_production | GL | Calculates a city's production output including building bonuses, factory effects, and waste. Det... |
| `0x004EA031` | adjust_happy_unhappy | GL | Adjusts happy/content/unhappy citizen counts to ensure they sum correctly. Balances specialists a... |
| `0x004EA1F6` | distribute_trade | GL | Distributes a city's trade income into luxury, tax, and science based on the government's tax rat... |
| `0x004EA8E4` | calc_happiness | GL | Complete happiness calculation for a city. Determines content/happy/unhappy citizens based on gov... |
| `0x004EB327` | calc_trade_route_income | GL | Calculates trade route income. Counts deficit routes (marked negative) and surplus routes from ot... |
| `0x004EB4A1` | recalc_city_all | GL | Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, comput... |
| `0x004EB4ED` | calc_city_production (entry point) | GL | Entry point for full city production calculation. If param_2 is 0, returns cached happy-unhappy d... |
| `0x004EB571` | show_city_event_dialog | UI | Shows a city event notification dialog (e.g., "Building completed", "Famine", etc.). Creates a po... |
| `0x004EB80A` | show_city_event_dialog_v2 | UI | Enhanced version of city event dialog with a production item image. Creates a larger dialog showi... |
| `0x004EC1C6` | assign_caravan_commodity | GL | Assigns a trade commodity to a newly built caravan/freight unit. Randomly selects from the city's... |
| `0x004EC312` | handle_espionage_discovery | GL | Handles discovery of espionage (spy embassy established). Halves defense rating, sets espionage f... |
| `0x004EC3FE` | process_city_production | GL | Massive end-of-turn city production processing function. Handles completing buildings, wonders, u... |
| `0x004F1220` | handle_space_race_victory | GL | Handles space race victory condition. If multiplayer scenario version < 3 or scenario flag set, r... |
| `0x004FA82D` | event_action_flag_no_schism | GL | Event action: sets the no-schism flag to prevent civil war. |
| `0x004FA944` | event_action_change_money | GL | Event action: modifies a civilization's treasury. Resolves receiver from trigger context, validat... |
| `0x004FAAB0` | event_action_show_text | UI | Event action: displays text popup with up to 20 lines. In multiplayer, also sends text via network. |
| `0x004FABA6` | event_action_make_aggression | GL | Event action: forces aggression between two civs. Resolves both civs from trigger context, valida... |
| `0x004FAD02` | event_action_destroy_civ | GL | Event action: destroys a civilization. Resolves target civ, validates alive, sets game over flag ... |
| `0x004FADFB` | event_action_give_tech | GL | Event action: gives a technology to a civilization. |
| `0x004FAED4` | event_action_create_unit | GL | Event action: creates a unit at one of up to 10 specified locations. Validates terrain accessibil... |
| `0x004FB29F` | event_action_move_unit | GL | Event action: moves matching units to a new location. Only works for AI-controlled civs. Finds un... |
| `0x004FB5B2` | event_action_change_terrain | GL | Event action: changes terrain in a rectangular area. Destroys all cities and units in the area fi... |
| `0x004FBD9D` | event_check_unit_killed | GL | Checks all events for UNITKILLED triggers. Fires when specified unit type is killed by specified ... |
| `0x004FBE84` | event_check_negotiation | GL | Checks all events for NEGOTIATION triggers. Complex matching of talker/listener by civ and human/... |
| `0x004FC20D` | event_check_no_schism | GL | Checks all events for NOSCHISM triggers. If any matching event fires, returns 0 (prevents schism). |
| `0x004FC2BB` | event_check_city_taken | GL | Checks all events for CITYTAKEN triggers. Fires when a specific city is captured by matching atta... |
| `0x004FC3AE` | event_dispatch_actions | GL | Dispatches all actions for a triggered event. Checks action flags in the event node and calls app... |
| `0x00501819` | citywin_click_citizen | MIXED | Handles clicking on a citizen icon in the city window. Cycles through specialist types (entertain... |
| `0x005022C0` | citywin_click_resource_map | MIXED | Handles clicking on the resource map in the city window. Determines which tile was clicked using ... |
| `0x00505D3D` | citywin_sell_improvement | MIXED | Handles selling a city improvement. Shows confirmation dialog, removes building, adds sale price ... |
| `0x00506637` | citywin_unit_popup_supported | MIXED | Handles the unit popup menu when clicking a supported unit in the city window. Options: activate ... |
| `0x00506A42` | citywin_unit_popup_present | MIXED | Handles the unit popup menu when clicking a present (visiting) unit in the city window. Extended ... |
| `0x00509590` | handle_city_disorder_00509590 | MIXED | Opens the city window for a specific city, handling disorder state. Checks network busy flags, se... |
| `0x00509B48` | city_button_buy | MIXED | Handles the "Buy" button in the city window. Calculates rush-buy cost (2x remaining shields for b... |
| `0x0050A473` | city_button_change | MIXED | The second-largest function in this block (4.5KB). Handles the city production change dialog. Sho... |
| `0x0050B74E` | city_button_rename | MIXED | Handles the city rename button. Shows text input dialog, validates, updates city name, refreshes ... |
| `0x0050BACD` | city_button_view | MIXED | Handles the "View" button (shows advisor/improvement details). Defers if network busy. |
| `0x0050C1D1` | city_mouse | UI | Main mouse click dispatcher for the city window. Hit-tests click regions and dispatches to: resou... |
| `0x0051EA8E` | game_timer_dialog | MIXED | Shows the game timer configuration dialog. Supports preset times (30s to 5min) and custom entry. ... |
| `0x00522B2B` | mp_join_game_handler | MIXED | Handles a player joining a multiplayer game. Temporarily sets the player bitmask to the full sess... |
| `0x00523F02` | mp_choose_additional_player | MIXED | Shows a dialog for choosing an additional player to join a multiplayer game. Similar to mp_choose... |
| `0x005369F3` | ai_alert_nearby_units | AI | When a city is threatened (param_1 = city index), alerts all AI naval units within movement range... |
| `0x0054F3B9` | events_editor_init | MIXED | Initializes and runs the full events editor dialog. Creates all UI elements (listboxes, buttons),... |
| `0x005520FA` | set_dialog_background | UI | Sets the dialog background pattern/image to param_1. |
| `0x00553DFD` | create_scenario_folder | UI | Creates a new scenario folder. Prompts user for name, validates it, checks for duplicates, create... |
| `0x00553FF6` | toggle_cheat_mode | MIXED | Toggles cheat mode on/off. Shows confirmation dialog, optionally creates a scenario folder. Sets ... |
| `0x00554297` | toggle_cheat_multiplayer | MIXED | Toggles cheat mode in multiplayer. Checks if any password-protected players exist; if so, shows w... |
| `0x00554460` | cheat_toggle_all_tech | GL | Toggles all technologies for a civ. If civ doesn't have all techs, grants all 100. If it does, re... |
| `0x005545D3` | cheat_edit_tech | MIXED | Cheat dialog for editing technologies of a civ. Shows list of all techs with indicators for known... |
| `0x0055499F` | cheat_edit_terrain | MIXED | Cheat terrain editor. Allows changing terrain type and improvement flags on the tile at cursor po... |
| `0x005551B3` | cheat_place_unit | MIXED | Cheat: places a new unit at cursor position. Shows filterable unit type list (can toggle veteran,... |
| `0x00555CB1` | cheat_edit_unit_at_cursor | UI | Cheat: opens unit editor for the top unit at cursor position. |
| `0x0055625B` | cheat_edit_unit | MIXED | Cheat unit editor dialog. Allows editing veteran status, movement points, hit points, home city, ... |
| `0x00556F54` | cheat_edit_civ | GL | Comprehensive cheat civ editor. 12+ options: edit treaties, attitudes, betrayal count, reset pati... |
| `0x005582AD` | cheat_edit_scenario | GL | Master scenario editor dialog with 12+ options: paradigm shift, year increment, start year, max t... |
| `0x0055AE80` | stop_turn_timer | MIXED | Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable. |
| `0x0055AF2E` | start_turn_timer | MIXED | Starts the turn timer — closes open windows, calculates remaining time, creates a 500ms repeating... |
| `0x0055B046` | resume_turn_timer | MIXED | Resumes the turn timer if time remains and game is active. |
| `0x0055B2C6` | end_turn_prompt | MIXED | End-turn prompt handler. Stops timer, checks if user wants to end turn (via thunk_FUN_0051ea8e). ... |
| `0x0055BBC0` | calc_war_readiness | GL | Calculates war readiness score for a civ pair. Counts enemy military units near the border, assig... |
| `0x0055C066` | set_government_type | GL | Sets a civ's government type. If changing to/from anarchy, clears embassy flags. Refreshes all ci... |
| `0x0055C3D3` | revolution_dialog | MIXED | Revolution/government change dialog. Shows available government types, lets player choose. Applie... |
| `0x0055C69D` | ai_revolution_notification | GL | Handles AI revolution/government change notifications. If human civ, opens revolution dialog. If ... |
| `0x0055D1E2` | ai_tech_exchange | GL | Handles AI technology exchange between two civs during diplomacy. Finds the best tech each side c... |
| `0x0055D685` | check_join_war | GL | Checks if a 3rd party (param_2) should join a war between param_1 and param_3. Evaluates existing... |
| `0x0055D8D8` | process_diplomatic_contact | GL | Master diplomatic contact processing function. Handles all phases of civ-to-civ contact: initial ... |
| `0x0055F5A3` | ai_choose_government | AI | AI government selection logic. Evaluates available governments using preference scores (DAT_0064c... |
| `0x00568CA2` | calc_status_panel_layout | UI | Calculates the status panel layout based on screen dimensions. Determines zoom level (2/3/4), fon... |
| `0x00569801` | draw_status_panel_units | UI | Draws the complete status panel unit section. Shows active unit with sprite, movement points, nam... |
| `0x0056AC67` | draw_minimap_overlay | UI | Draws the minimap timer/turn indicator overlay. Lazy-initializes the surface on first call. Cache... |
| `0x0056B90B` | set_unit_font_for_zoom | UI | Sets the unit display font size based on zoom level. Calculates size as sprite_height/3, adjusts ... |
| `0x0056C705` | animate_unit_movement | UI | Animates unit movement between tiles. Creates per-viewport off-screen buffers, captures backgroun... |
| `0x00579C40` | diplomacy_check_treaty_violation | GL | Checks if an attack between param_1 and param_2 violates existing treaties. If the two civs have ... |
| `0x0057A27A` | diplomacy_steal_tech | GL | Handles stealing a technology when a civ captures a city or defeats another civ. For human player... |
| `0x0057A7E9` | transfer_city_ownership | GL | Transfers ownership of a single city (param_1) from civ param_2 to civ param_3. Decrements old ow... |
| `0x0057A904` | handle_civil_war | GL | Handles civil war when a civ's capital is captured. Creates a new rebel civ, splits treasury, cop... |
| `0x0057B5DF` | handle_city_capture | GL | The main city capture handler — one of the most complex functions in the binary. Handles all aspe... |
| `0x0057E33A` | calc_unit_defense_strength | GL | Calculates unit defense strength considering terrain, fortification, city walls, unit type bonuse... |
| `0x0057E6E2` | calc_stack_best_defender | GL | Finds the best defender in a stack of units at a given tile. Iterates all units in the stack, com... |
| `0x0057E9F9` | handle_unit_kill | GL | Handles a unit being killed in combat. Increments the kill counter for the owning civ's unit type... |
| `0x0057EB94` | handle_stack_wipe | GL | Wipes out an entire stack of units. Sets DAT_006acb0c = 0, then iterates all units in the stack (... |
| `0x0057EBFD` | handle_unit_promotion | GL | Promotes a unit to veteran status. Sets the veteran flag (0x2000) on the unit's flags word, then ... |
| `0x0057ED3F` | animate_combat_movement | UI | Animates combat movement for up to 8 animation channels. Creates sprite animation objects, runs 8... |
| `0x0057F657` | animate_nuke_explosion | UI | Plays the nuclear explosion animation at a given map tile. Creates a large (0x5B x 0x48) sprite, ... |
| `0x0057F9E3` | handle_nuke_attack | GL | Handles a nuclear attack on a tile. Shows "USEWEAPONS" warning, checks for SDI defense (cancels i... |
| `0x0057FEBC` | scramble_defenders_to_tile | GL | Scrambles nearby defensive units to intercept an attack on a tile. First checks for adjacent unit... |
| `0x00580341` | resolve_combat | GL | The main combat resolution function. Handles the entire combat pipeline: calculates attack/defens... |
| `0x005866D3` | cosmic_editor_save_restore | MIXED | Saves the current 22 cosmic parameters to the editor display buffer at 0x6a2d80, calls a dialog u... |
| `0x0058BD60` | unit_order_activate | GL | Activates the selected unit by calling move_unit with direction -1 and mode 3 (activate in place). |
| `0x0058BD84` | unit_order_wake_all_own | GL | Wakes all of the current player's units by refreshing their movement points. |
| `0x0058BDFD` | (unit_order_wait) | GL | Sets the "wait" flag on the selected unit (bit 0x4000 in unit flags word) and advances to the nex... |
| `0x0058BE56` | unit_order_build_city | MIXED | Handles the "Build City" order. Checks if unit is settler type, validates location (not ocean, no... |
| `0x0058C295` | unit_order_disband | MIXED | Disbands a unit (or city in cheat mode). If disbanded in a city, adds half the unit's shield cost... |
| `0x0058CBE1` | unit_order_home_city | MIXED | Changes the selected unit's home city to the city at its current location. Caravans cannot be reh... |
| `0x0058CCE6` | unit_order_fortify | MIXED | Fortifies the selected unit. Land units can only fortify on land (not ocean), and only in a city ... |
| `0x0058CDE5` | unit_order_unload | GL | Issues the "unload" order for a transport ship or air unit carrying units. Land units need a city... |
| `0x0058CFCD` | unit_order_pillage | MIXED | Handles the pillage order. Shows a menu to select which improvement to pillage (road, railroad, i... |
| `0x0058D442` | unit_order_sentry | MIXED | Places units on sentry duty. If only one unit at location, sentries it directly. If multiple unit... |
| `0x0058D6AF` | unit_order_goto_city | MIXED | Shows a dialog listing cities the unit can travel to (filtered by domain compatibility and range)... |
| `0x0058DDCE` | (unit_order_unload_transport) | MIXED | Unloads ground units from a transport ship. Sets the ship's wait flag and wakes carried ground un... |
| `0x0058DF14` | (unit_order_automate_settler) | GL | Sets the "automate" flag on a settler/engineer unit (bit 0x8000 in unit flags). |
| `0x0058DF7B` | unit_order_airlift | MIXED | Handles the airlift unit order. Validates the unit is ground-domain, in a city with an airport th... |
| `0x0058F040` | process_goody_hut | GL | Processes a goody hut encounter. Randomly selects from 6 outcomes: (0) friendly tribe founding a ... |
| `0x0058FDA9` | claim_adjacent_ocean_tiles | GL | Claims adjacent ocean tiles for a civilization when it builds on a coast. Iterates 8 adjacent til... |
| `0x0058FEDB` | handle_caravan_arrival | MIXED | Handles a caravan/freight unit arriving at a destination city. Shows a dialog offering trade rout... |
| `0x0059062C` | move_unit | GL | THE main unit movement function — the single largest function in the binary at ~18KB. Handles all... |
| `0x00594D42` | mp_lock_map | GL | Locks map tiles for multiplayer movement synchronization. In client mode, sends lock request to s... |
| `0x0059511C` | mp_unlock_map | GL | Unlocks map tiles after multiplayer movement completes. In client mode, sends unlock request and ... |
| `0x00596EEC` | spaceship_recalc_stats | GL | Recalculates all spaceship statistics for a civ: mass, fuel ratio, energy ratio, life support rat... |
| `0x005973FD` | spaceship_launch (internal — called after all checks pass) | GL | Launches a civ's spaceship. Sets the launch flag, records the launch turn, displays "LAUNCHED" me... |
| `0x0059772C` | spaceship_dialog | UI | Displays the spaceship status dialog for a civ. Shows all component counts, ratios (fuel, energy,... |
| `0x00598197` | spaceship_human_build | GL | Handles building a spaceship component for a human or AI player. For humans, shows a dialog to ch... |
| `0x0059A15D` | pedia_load_description | UI | Loads a Civilopedia description from the PEDIA section of the game text file. Reads lines until a... |
| `0x0059A6F0` | rng_set_seed | GL | Sets the random number generator seed. If param_1 is 0, returns 0 (and leaves seed unchanged). Ot... |
| `0x0059A733` | rng_next_float | GL | Generates the next random number using a linear congruential generator: seed = seed * 0x19660D + ... |
| `0x0059A791` | rng_range | GL | Returns a random integer in the range [param_1, param_2]. If param_1 == param_2, just advances th... |
| `0x0059B96A` | netmgr_remove_client | GL | Removes a client from the network game by connection ID. Finds the matching player slot, clears t... |
| `0x0059C575` | record_combat_kill | GL | Records a combat kill event in the per-civ combat history ring buffer (300 entries per civ). Stor... |
| `0x0059DB65` | popup_dialog_destroy | UI | Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping ... |
| `0x005B2590` | validate_unit_stack | GL | Validates the integrity of a unit's linked list stack. Checks for infinite loops, dead units in s... |
| `0x005B29D7` | get_unit_hp_remaining | GL | Returns the remaining HP of a unit (max_hp - damage). If hitpoint combat is disabled (flag 0x10 n... |
| `0x005B2F50` | set_unit_goto_order | GL | Sets a unit's order to "goto" (3). If the unit wasn't already on goto, resets the goto target. |
| `0x005B319E` | pick_up_unit_005b319e | GL | Removes a unit from its map tile stack. Unlinks it from the prev/next chain, sets its position to... |
| `0x005B345F` | put_down_unit | GL | Places a unit on the map at a given position. Links it into the existing unit stack at that tile,... |
| `0x005B36DF` | relocate_unit | GL | Moves a unit from its current position to a new position by picking it up and putting it down. Ha... |
| `0x005B3863` | relocate_unit_in_place | GL | Relocates a unit to its own current position (used to refresh stack linkage). |
| `0x005B389F` | move_unit_to_bottom | GL | Moves a unit to the bottom of its stack (last position). Picks it up, finds the current last unit... |
| `0x005B3AE0` | relocate_all_units | GL | Relocates all units in a stack to a new position. |
| `0x005B3B78` | eject_air_units | GL | Ejects all sea-domain units from a stack to offscreen holding coordinates, then relocates them ba... |
| `0x005B3D06` | create_unit | GL | Creates a new unit of the specified type for a given civilization at a map position. Finds a free... |
| `0x005B4391` | delete_unit | GL | Deletes a unit. Picks it up from the map, decrements all counters, marks the slot as dead, clears... |
| `0x005B47FA` | delete_all_units_in_stack | GL | Deletes every unit in a stack by iterating from first to last. |
| `0x005B488A` | clear_unit_visibility | GL | Clears a unit's visibility mask (which civs can see it). |
| `0x005B48B1` | clear_stack_visibility | GL | Clears visibility for all units in a stack. |
| `0x005B490E` | set_unit_seen_by | GL | Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask). No-o... |
| `0x005B496E` | set_stack_seen_by | GL | Sets visibility for all units in a stack to be seen by a specific civ. |
| `0x005B49CF` | check_zoc_violation | GL | Checks if a unit at (param_1, param_2) moving for civ param_3 would violate zone-of-control rules... |
| `0x005B4B66` | check_adjacent_enemy_simple | GL | Simple check for adjacent enemy units — no ocean/continent checks. Returns true if any adjacent t... |
| `0x005B4C63` | check_adjacent_enemy_continent | GL | Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean ty... |
| `0x005B4D8C` | check_zoc_if_no_city | GL | Checks ZOC only if there's no city at the location. Returns 0 if city present (cities negate ZOC). |
| `0x005B4EE2` | set_stack_visibility_mask | GL | OR's a visibility bitmask into every unit in a stack. |
| `0x005B542E` | load_unit_onto_ship | GL | Loads ground/air units onto a transport ship. In mode param_2=1 (physical loading), ejects air un... |
| `0x005B5BAB` | stack_unit | GL | Stacks a unit (puts it into storage). If the unit is a ship, calls load_unit_onto_ship to load ca... |
| `0x005B5D93` | delete_unit_safely | GL | Safely deletes a unit, handling the case where it's a ship carrying units. If the ship is on ocea... |
| `0x005B6042` | delete_unit_visible | GL | Deletes a unit and refreshes the map display at its former position. Sends MP tile-refresh notifi... |
| `0x005B6512` | find_next_unit_needing_orders | GL | Finds the next unit needing orders, prioritizing by distance from the current cursor position. Ne... |
| `0x005B6787` | refresh_unit_movement | GL | Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has alrea... |
| `0x005B67AF` | find_nearest_unit | GL | Finds the nearest unit to a position, optionally filtered by owner civ. Returns unit index or -1. |
| `0x005B8B1A` | update_civ_visibility | GL | Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility... |
| `0x005B90DF` | reveal_tile | GL | Reveals pollution on a tile by setting the pollution bit (0x80) in tile improvements. Updates vis... |
| `0x005B9179` | generate_terrain_around | GL | Generates/randomizes terrain around a nuclear detonation site. For each of 9 tiles (center + 8 ad... |
| `0x005B94FC` | set_tile_improvement_bits | GL | Sets or clears improvement bits on a tile. If the value actually changed and in multiplayer, queu... |
| `0x005B9646` | set_tile_terrain | GL | Sets the terrain type for a tile (lower 4 bits of byte 0). Sends MP notification (0x91) if changed. |
| `0x005B976D` | set_tile_visibility_bits | GL | Sets or clears visibility bits (byte 4) on a tile. Sends MP notification (0x92) if changed. |
| `0x005B98B7` | set_tile_fertility | GL | Sets the fertility value (lower 4 bits of byte 5). MP notification 0x93. |
| `0x005B99E8` | set_tile_owner | GL | Sets the tile owner (upper nibble of byte 5). Values 0-7 for civs, 0xf for no owner. MP notificat... |
| `0x005B9C49` | set_tile_city_radius_owner | GL | Sets the city-radius owner for a tile (top 3 bits of byte 2). MP notification 0x96. |
| `0x005B9D81` | set_civ_tile_data | GL | Sets a civ's tile visibility byte. Can either overwrite or OR with existing value. MP notificatio... |
| `0x005B9EC6` | begin_map_batch | GL | Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing. |
| `0x005B9F1C` | end_map_batch | GL | Ends a batched map update. If queued updates exist (DAT_006365f4 > 1), sends them as a batch pack... |
| `0x005B9FDE` | queue_map_update | GL | Queues a single map update operation into the batch buffer. If buffer would overflow (> 0x100 ent... |
