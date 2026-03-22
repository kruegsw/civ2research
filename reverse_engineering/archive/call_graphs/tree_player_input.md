# Player Input Call Graph Trees

Generated from `graph_data.json` — call graphs for all 7 player input entry points.

## Stats

- **Total unique functions reachable**: 1623
- **State-mutating functions reachable**: 450
- **By category**:
  - GL: 325
  - AI: 17
  - MIXED: 65
  - UI: 763
  - FW: 357

## Legend

- `[GL]` = Game Logic, `[AI]` = AI, `[MIXED]` = Mixed UI+Logic, `[UI]` = UI, `[FW]` = Framework
- `*** STATE MUTATION ***` = function directly modifies game state
- `→` summary line shown at depth ≤ 3
- FW functions filtered out at depth > 2
- Max tree depth: 6

---

## map_window_click (`00410F77`, 1866B)

Reachable: 873 functions, 260 state-mutating

```
map_window_click [MIXED] (1866B) *** STATE MUTATION ***
  → Main handler for map click events
├── is_tile_valid [GL] (80B)
│     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── show_city_info_dialog [UI] (518B)
│     → Displays a city information dialog for city index param_1
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_label_id [UI] (33B)
│   │     → Appends a localized label (by ID) to the global text buffer.
│   ├── text_newline [UI] (29B)
│   │     → Adds a newline to the global text buffer.
│   ├── text_begin_italic [UI] (29B)
│   │     → Begins italic text mode in the global text buffer.
│   ├── text_end_italic [UI] (29B)
│   │     → Ends italic text mode in the global text buffer.
│   ├── display_improvement [UI] (33B)
│   │     → Adds an improvement/government icon to the text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── get_civ_name [UI] (28B)
│   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   └── get_civ_adjective_name [GL] (145B)
│   │         → Returns the adjective form of a civilization name
│   ├── cleanup_dialog_buffer [FW] (12B)
│   │     → Cleanup thunk that calls FUN_0059df8a to free a dialog string buffer.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │       └── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │           ├── unknown (get drawing context) [UI] (37B)
│   │           │   └── focus_and_raise_window [UI] (57B)
│   │           ├── widget_scrollbar_dtor [UI] (57B)
│   │           │   └── scrollbar_widget_dtor [UI] (112B)
│   │           └── widget_dropdown_dtor [UI] (57B)
│   ├── cleanup_dialog_window [FW] (9B)
│   │     → Cleanup thunk that calls FUN_005cde4d to destroy a dialog window.
│   │   └── sprite_free_data [UI] (84B)
│   │         → Unlocks and frees sprite data handle at this+0x34/0x38.
│   ├── seh_cleanup_004102f4 [FW] (14B)
│   │     → SEH frame cleanup — restores the previous exception handler from the stack.
│   ├── show_city_popup [UI] (39B)
│   │     → Shows a city information popup using the dialog system.
│   │   └── show_city_style_picker [UI] (260B) *** STATE MUTATION ***
│   │         → Shows a city style picker dialog for the Civilopedia.
│   │       ├── select_list_item [UI] (38B)
│   │       │   └── popup_show_modal [UI] (999B)
│   │       │       ├── flush_display [UI] (21B)
│   │       │       ├── process_messages [UI] (21B)
│   │       │       ├── get_view_window_handle [UI] (28B)
│   │       │       ├── get_edit_text [UI] (43B)
│   │       │       ├── init_palette_system [UI] (21B)
│   │       │       ├── unknown — manage window [UI] (37B)
│   │       │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │       │       │     (subtree shown above — 3 children)
│   │       │       ├── popup_paint [UI] (1964B)
│   │       │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │       │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │       │       └── modal_dialog_run [UI] (283B)
│   │       ├── popup_dialog_create [UI] (93B)
│   │       │   ├── unknown (popup list init) [UI] (64B)
│   │       │   └── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │       ├── popup_add_button [UI] (360B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │   └── FUN_0000858E [??]
│   │       │   └── init_editor_scrollbar [UI] (34B)
│   │       │       └── rect_get_width [UI] (27B)
│   │       └── sprite_init_empty [UI] (140B)
│   │           ├── port_alloc_rect [UI] (58B)
│   │           │   └── port_alloc [UI] (325B)
│   │           ├── port_set_color [UI] (43B)
│   │           │   └── port_fill_rect [UI] (236B)
│   │           └── unknown (sprite extract with rect params) [UI] (88B)
│   │               ├── sprite_lock_data [UI] (56B)
│   │               └── sprite_extract_from_oleitem [UI] (1951B)
│   ├── city_count_content_citizens [GL] (125B)
│   │     → Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   └── sprite_init_empty [UI] (140B)
│         → Initializes a sprite with given dimensions and fill color
│         (subtree shown above — 3 children)
├── center_all_map_views [UI] (116B)
│     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   └── center_map_on_cursor [UI] (56B) *** STATE MUTATION ***
│         → Centers the map view on the current cursor position (DAT_0064b1b4, DAT_0064b1b0) for the current player (DAT_006d1da0).
│       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│             → Redraws a map area and optionally invalidates it
│           ├── tile_to_screen [UI] (151B)
│           │   └── wrap_x [GL] (94B)
│           ├── is_tile_visible [UI] (99B)
│           │   └── is_tile_in_viewport_rect [UI] (97B)
│           │       └── is_x_in_range [UI] (141B)
│           ├── redraw_tile_area [UI] (352B)
│           │   ├── draw_complete_tile [UI] (495B)
│           │   │   ├── flush_display [UI] (21B)
│           │   │   ├── is_tile_valid [GL] (80B)
│           │   │   ├── tile_to_screen [UI] (151B)
│           │   │   │     (subtree shown above — 1 children)
│           │   │   ├── render_tile [UI] (4431B) *** STATE MUTATION ***
│           │   │   ├── render_city_on_map [UI] (392B)
│           │   │   ├── draw_units_at_tile [UI] (662B)
│           │   │   ├── reset_sprite_scale [UI] (28B)
│           │   │   ├── set_current_zoom_scale [UI] (41B)
│           │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│           │   │   ├── calc_movement_cost [GL] (94B)
│           │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│           │   │   └── FUN_0064F394 [??]
│           │   ├── is_tile_visible [UI] (99B)
│           │   │     (subtree shown above — 1 children)
│           │   ├── draw_city_labels [UI] (871B)
│           │   │   ├── measure_text_height [UI] (42B)
│           │   │   │     (subtree shown above — 1 children)
│           │   │   ├── get_civ_foreground_color [UI] (92B)
│           │   │   ├── tile_to_screen [UI] (151B)
│           │   │   │     (subtree shown above — 1 children)
│           │   │   ├── is_tile_visible [UI] (99B)
│           │   │   │     (subtree shown above — 1 children)
│           │   │   ├── scale_at_current_zoom [UI] (47B)
│           │   │   ├── tile_distance_xy [GL] (157B)
│           │   │   ├── get_tile_explored [GL] (71B)
│           │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│           │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│           │   │   └── draw_text_with_shadow [UI] (205B)
│           │   ├── calc_tile_group_rect [UI] (191B)
│           │   │   ├── set_rect_wh [UI] (48B)
│           │   │   ├── tile_to_screen [UI] (151B)
│           │   │   │     (subtree shown above — 1 children)
│           │   │   └── intersect_rect_wrapper [UI] (34B)
│           │   ├── wrap_x [GL] (94B)
│           │   └── port_set_rect [UI] (91B)
│           ├── invalidate_tile_area [UI] (60B)
│           │   ├── invalidate_region [UI] (180B)
│           │   │   ├── blit_rect_to_screen [UI] (43B)
│           │   │   └── port_copy_to_screen_clipped [UI] (220B)
│           │   └── calc_tile_group_rect [UI] (191B)
│           │         (subtree shown above — 3 children)
│           ├── reset_sprite_scale [UI] (28B)
│           │     (subtree shown above — 1 children)
│           ├── set_current_zoom_scale [UI] (41B)
│           │     (subtree shown above — 1 children)
│           └── unknown (sprite blit wrapper 1) [UI] (53B)
│                 (subtree shown above — 1 children)
├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│     → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │   ├── minimap_full_redraw [UI] (416B) *** STATE MUTATION ***
│   │   │     → Performs a complete minimap redraw: recalculates viewport, iterates over all visible map tiles, draws each tile's col...
│   │   │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │   │   │   └── wrap_x [GL] (94B)
│   │   │   ├── minimap_get_tile_color [UI] (425B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── minimap_draw_goto_line [UI] (211B)
│   │   │   │   ├── minimap_tile_to_screen [UI] (169B)
│   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   └── surface_fill_rect_color [UI] (63B)
│   │   │   │       └── draw_rect_outline [UI] (128B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │   └── invalidate_region [UI] (180B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── surface_set_clear_color [UI] (34B)
│   │   │   │   └── unknown (clear_surface_region) [UI] (28B)
│   │   │   │       └── port_set_color [UI] (43B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── fill_rect_palette [UI] (50B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   │       ├── set_rect_wh [UI] (48B)
│   │   │   │       └── port_fill_rect [UI] (236B)
│   │   │   │             (subtree shown above — 7 children)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   │   └── widget_inflate_rect [UI] (34B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   │   └── draw_string_palette [UI] (534B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   │   └── swap_dc [UI] (43B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │   ├── FUN_00008BE1 [??]
│   │   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── recalc_viewport_geometry [UI] (1410B) *** STATE MUTATION ***
│   │   │     → Recalculates all viewport geometry metrics: tile dimensions at current zoom, number of visible tiles, viewport origin...
│   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   ├── FUN_00008200 [??]
│   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   └── delete_font [UI] (98B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── redraw_full_viewport [UI] (278B)
│   │   │     → Redraws all visible tiles in the viewport
│   │   │   ├── draw_complete_tile [UI] (495B)
│   │   │   │     (subtree shown above — 12 children)
│   │   │   ├── draw_city_labels [UI] (871B)
│   │   │   │     (subtree shown above — 10 children)
│   │   │   ├── unknown (clear_surface_region) [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── begin_end_paint_cycle [UI] (100B)
│   │   │     → Performs a paint cycle: begin paint, poll network (if MP), end paint, begin paint again, poll again
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │   │     (subtree shown above — 15 children)
│   │   └── dialog_create_buttons [UI] (675B)
│   │         → Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │         (subtree shown above — 8 children)
│   └── wrap_x [GL] (94B)
│         → Wraps an X coordinate for a cylindrical (non-flat) map
├── cancel_unit_blink_timer [UI] (191B) *** STATE MUTATION ***
│     → Cancels the unit blink timer and restores the cursor state
│   ├── set_cursor_icon [UI] (47B)
│   │     → Sets the cursor icon to the specified resource ID on the current view's window handle.
│   │   └── load_and_set_cursor [UI] (70B)
│   │         → Loads a cursor by resource ID onto a window and optionally activates it.
│   │       └── load_and_store_cursor [UI] (136B)
│   ├── stop_cursor_blink [UI] (39B)
│   │     → Stops the cursor blink animation.
│   │   ├── get_view_window_handle [UI] (28B)
│   │   │     → Returns the window handle stored at offset 8 of the current object.
│   │   └── release_mouse_capture [UI] (22B)
│   │         → Releases the mouse capture.
│   └── timer_stop [FW] (62B)
│         → Stops a timer by slot index
├── center_and_scroll_to_tile [UI] (114B) *** STATE MUTATION ***
│     → Centers the map on (param_1, param_2) if the tile is valid
│   ├── is_tile_valid [GL] (80B)
│   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── center_map_on_cursor [UI] (56B) *** STATE MUTATION ***
│   │     → Centers the map view on the current cursor position (DAT_0064b1b4, DAT_0064b1b0) for the current player (DAT_006d1da0).
│   │     (subtree shown above — 1 children)
│   └── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│         → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│       ├── rect_get_width [UI] (27B)
│       │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│       ├── rect_get_height [UI] (28B)
│       │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│       ├── invalidate_region [UI] (180B)
│       │     → Invalidates a screen region
│       │     (subtree shown above — 2 children)
│       ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION ***
│       │     → Calculates the status panel layout based on screen dimensions
│       ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION ***
│       │     → Draws the complete status panel unit section
│       │   ├── rect_get_width [UI] (27B)
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── text_begin [UI] (29B)
│       │   ├── text_add_label_id [UI] (33B)
│       │   ├── get_font_height [UI] (28B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── get_civ_name [UI] (28B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── set_status_bar_text [UI] (33B)
│       │   ├── draw_text_centered [UI] (46B)
│       │   │   └── draw_text_centered [UI] (139B)
│       │   │       ├── measure_text_height [UI] (42B)
│       │   │       │     (subtree shown above — 1 children)
│       │   │       └── draw_text_with_shadow [UI] (205B)
│       │   │             (subtree shown above — 3 children)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── draw_status_turn_info [UI] (474B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── flush_display [UI] (21B)
│       │   │   ├── invalidate_region [UI] (180B)
│       │   │   │     (subtree shown above — 2 children)
│       │   │   ├── text_begin [UI] (29B)
│       │   │   ├── text_add_label_id [UI] (33B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── draw_text_at [UI] (42B)
│       │   │   │   └── draw_text_with_shadow [UI] (205B)
│       │   │   │         (subtree shown above — 3 children)
│       │   │   ├── tile_bitmap [UI] (391B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│       │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│       │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│       │   │   ├── port_set_rect_from_self [UI] (63B)
│       │   │   └── port_set_rect [UI] (91B)
│       │   ├── draw_coordinate_text [UI] (132B)
│       │   │   ├── text_begin [UI] (29B)
│       │   │   ├── text_add_label_id [UI] (33B)
│       │   │   ├── text_newline [UI] (29B)
│       │   │   ├── text_begin_bold [UI] (29B)
│       │   │   ├── text_begin_italic [UI] (29B)
│       │   │   ├── text_end_italic [UI] (29B)
│       │   │   ├── text_add_number [UI] (33B)
│       │   │   ├── unknown (string pool append separator) [UI] (29B)
│       │   │   ├── draw_text_at [UI] (42B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   └── get_tile_continent [GL] (39B)
│       │   │       └── get_tile_ptr [GL] (90B)
│       │   ├── format_unit_orders_text [UI] (450B)
│       │   │   ├── text_add_string [UI] (33B)
│       │   │   ├── text_add_label_id [UI] (33B)
│       │   │   ├── text_newline [UI] (29B)
│       │   │   ├── text_begin_italic [UI] (29B)
│       │   │   ├── text_end_italic [UI] (29B)
│       │   │   ├── display_improvement [UI] (33B)
│       │   │   ├── text_add_number [UI] (33B)
│       │   │   ├── unknown (string pool append separator) [UI] (29B)
│       │   │   ├── find_city_at [GL] (245B)
│       │   │   │     (subtree shown above — 2 children)
│       │   │   └── get_tile_improvements [GL] (39B)
│       │   │       └── get_tile_ptr [GL] (90B)
│       │   │             (subtree shown above — 1 children)
│       │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── flush_display [UI] (21B)
│       │   │   ├── invalidate_region [UI] (180B)
│       │   │   │     (subtree shown above — 2 children)
│       │   │   ├── text_begin [UI] (29B)
│       │   │   ├── text_add_label_id [UI] (33B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── text_add_number [UI] (33B)
│       │   │   ├── unknown (string pool set) [UI] (33B)
│       │   │   │   └── advance_year_display [UI] (479B)
│       │   │   ├── draw_text_at [UI] (42B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── scale_sprite [UI] (35B)
│       │   │   ├── set_sprite_scale [UI] (33B)
│       │   │   │   └── scale_table_build_primary [UI] (657B)
│       │   │   ├── reset_sprite_scale [UI] (28B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── prepare_surface [UI] (24B)
│       │   │   ├── draw_hline [UI] (69B)
│       │   │   │   ├── set_rect_abs [UI] (42B)
│       │   │   │   └── fill_surface_from_rect [UI] (71B)
│       │   │   ├── tile_bitmap [UI] (391B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│       │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│       │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│       │   │   ├── port_set_rect_from_self [UI] (63B)
│       │   │   ├── port_set_rect [UI] (91B)
│       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   │         (subtree shown above — 1 children)
│       │   ├── select_display_unit [UI] (396B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── get_next_unit_in_stack [GL] (65B)
│       │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│       │   │   ├── get_first_unit_in_stack [GL] (118B)
│       │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│       │   │   │         (subtree shown above — 3 children)
│       │   │   ├── is_tile_ocean [GL] (57B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   └── get_fortress_owner_at [GL] (77B)
│       │   │       ├── get_tile_owner [GL] (100B)
│       │   │       └── get_tile_improvements [GL] (39B)
│       │   │             (subtree shown above — 1 children)
│       │   ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── set_rect_wh [UI] (48B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   │     (subtree shown above — 3 children)
│       │   │   ├── get_civ_background_color [UI] (92B)
│       │   │   ├── scale_sprite [UI] (35B)
│       │   │   ├── set_sprite_scale [UI] (33B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── reset_sprite_scale [UI] (28B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│       │   │   │   ├── set_editor_font [UI] (93B)
│       │   │   │   │     (subtree shown above — 3 children)
│       │   │   │   └── scale_sprite [UI] (35B)
│       │   │   ├── select_display_unit [UI] (396B)
│       │   │   │     (subtree shown above — 5 children)
│       │   │   ├── get_civ_dark_color [UI] (92B)
│       │   │   ├── get_unit_max_hp [GL] (45B)
│       │   │   ├── get_fortress_owner_at [GL] (77B)
│       │   │   │     (subtree shown above — 2 children)
│       │   │   ├── get_tile_improvements [GL] (39B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   ├── port_copy_rect [UI] (282B)
│       │   │   │   ├── rect_get_width [UI] (27B)
│       │   │   │   ├── rect_get_height [UI] (28B)
│       │   │   │   ├── port_lock [UI] (287B)
│       │   │   │   ├── port_unlock [UI] (83B)
│       │   │   │   ├── port_get_pixel_ptr [UI] (45B)
│       │   │   │   ├── surface_is_locked [UI] (44B)
│       │   │   │   └── pixel_ptr_next_row [UI] (33B)
│       │   │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   │     (subtree shown above — 3 children)
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│       │   │       └── dispatch_oleitem_dimmed [UI] (677B)
│       │   ├── calc_unit_movement_points [GL] (516B)
│       │   │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   │   └── get_wonder_city [GL] (57B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│       │   │   ├── get_unit_max_hp [GL] (45B)
│       │   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│       │   │       └── get_unit_max_hp [GL] (45B)
│       │   ├── get_next_unit_in_stack [GL] (65B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── get_first_unit_in_stack [GL] (118B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── find_unit_stack_at_xy [GL] (231B)
│       │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│       │   │   │     (subtree shown above — 3 children)
│       │   │   ├── get_first_unit_in_stack [GL] (118B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   └── get_unit_owner_at [GL] (66B)
│       │   │       ├── get_tile_owner [GL] (100B)
│       │   │       │     (subtree shown above — 2 children)
│       │   │       └── get_tile_improvements [GL] (39B)
│       │   │             (subtree shown above — 1 children)
│       │   ├── sum_stack_property [GL] (724B)
│       │   │   ├── get_next_unit_in_stack [GL] (65B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   └── get_first_unit_in_stack [GL] (118B)
│       │   │         (subtree shown above — 1 children)
│       │   ├── get_unit_home_city_name [GL] (89B)
│       │   ├── get_tile_ptr [GL] (90B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── get_civ_vis_ptr [GL] (48B)
│       │   ├── get_tile_terrain_raw [GL] (41B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── is_tile_ocean [GL] (57B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   └── get_tile_ptr [GL] (90B)
│       │   │         (subtree shown above — 1 children)
│       │   ├── check_tile_goody_hut [GL] (229B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── is_tile_ocean [GL] (57B)
│       │   │   │     (subtree shown above — 1 children)
│       │   │   └── get_tile_owner [GL] (100B)
│       │   │         (subtree shown above — 2 children)
│       │   ├── get_tile_improvements [GL] (39B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│       │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│       │   ├── port_set_rect_from_self [UI] (63B)
│       │   └── port_set_rect [UI] (91B)
│       ├── prepare_surface [UI] (24B)
│       │     → Sets the global drawing surface to param_1.
│       └── tile_bitmap [UI] (391B)
│             → Tiles a source bitmap to fill a destination rectangle
│             (subtree shown above — 1 children)
├── is_in_goto_mode [UI] (60B)
│     → Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
├── cancel_goto_mode [UI] (159B) *** STATE MUTATION ***
│     → If currently in goto mode, resets all view cursors back to normal (0x201).
│   ├── is_in_goto_mode [UI] (60B)
│   │     → Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
│   └── set_cursor_icon [UI] (47B)
│         → Sets the cursor icon to the specified resource ID on the current view's window handle.
│         (subtree shown above — 1 children)
├── find_city_at [GL] (245B)
│     → Finds a city at the given (x,y) coordinates
│     (subtree shown above — 2 children)
├── screen_to_tile [UI] (368B)
│     → Converts screen pixel coordinates to map tile coordinates
│   ├── wrap_x [GL] (94B)
│   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   └── port_set_pixel [UI] (107B)
│         → Gets a single pixel value at (param_1, param_2)
│       ├── port_get_pixel_ptr [UI] (45B)
│       │     → Returns a pointer to the pixel at (param_1, param_2) in the locked port buffer.
│       └── port_alloc_variant_b [UI] (93B)
│             → Checks if (param_1, param_2) is within the port's clip rect
├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│     → Starts human turn if not already active or if param forces it
│   ├── center_all_map_views [UI] (116B)
│   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │     (subtree shown above — 1 children)
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │   └── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │   ├── find_city_at [GL] (245B)
│   │   │     → Finds a city at the given (x,y) coordinates
│   │   │     (subtree shown above — 2 children)
│   │   ├── has_building [GL] (122B)
│   │   │     → Checks if a city has a specific building
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── get_wonder_city [GL] (57B)
│   │   │     → Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │   │     (subtree shown above — 1 children)
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── can_build_unit_type [GL] (1095B)
│   │   │     → Checks if a civilization can build a specific unit type
│   │   │   └── civ_has_tech [GL] (181B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── update_menu_item_label [UI] (89B)
│   │   │     → Updates a menu item's label text and enabled state
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── mp_format_template_string [UI] (504B)
│   │   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   └── menu_toggle_item_checked [UI] (103B)
│   │   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │       └── menu_check_item [UI] (50B)
│   │   │   └── menu_update_subitem_text [UI] (155B)
│   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │       ├── unknown (pipe-to-tab converter) [UI] (73B)
│   │   │       └── menu_change_item_text [UI] (50B)
│   │   │           └── modify_menu_item [UI] (130B)
│   │   ├── is_tile_worked [GL] (62B)
│   │   │     → Returns whether a specific tile (param_2) is being worked by city param_1
│   │   ├── menu_populate [UI] (686B) *** STATE MUTATION ***
│   │   │     → Populates the native menu from the internal linked-list representation
│   │   │   ├── menu_set_host_window [UI] (80B) *** STATE MUTATION ***
│   │   │   │   └── menu_setup_parent [UI] (59B)
│   │   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │   │       ├── unknown (get menu handle) [UI] (27B)
│   │   │   │       └── set_window_menu [UI] (99B)
│   │   │   ├── menu_toggle_item_checked [UI] (103B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── menu_toggle_item_grayed [UI] (101B)
│   │   │   │   ├── menu_get_visible_index [UI] (105B)
│   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │   └── menu_enable_item [UI] (50B)
│   │   │   │       └── check_menu_item [UI] (104B)
│   │   │   ├── menu_create_header [UI] (41B)
│   │   │   │   └── build_menu_from_string [UI] (376B)
│   │   │   │       └── parse_menu_string_recursive [UI] (586B)
│   │   │   ├── menu_insert_item [UI] (50B)
│   │   │   │   └── FUN_0000128C [??]
│   │   │   ├── menu_delete_item [UI] (46B)
│   │   │   │   └── delete_menu_item [UI] (102B)
│   │   │   └── menu_update_host [UI] (52B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       └── redraw_menubar [UI] (29B)
│   │   ├── menu_set_subitem_hidden [UI] (129B)
│   │   │     → Shows or hides a sub-menu item by setting/clearing bit 1 in its flags.
│   │   │   └── menu_find_subitem_by_id [UI] (136B)
│   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │     → Sets or clears the checked state of a sub-menu item (bit 0)
│   │   │     (subtree shown above — 2 children)
│   │   ├── menu_set_all_subitems_checked [UI] (111B)
│   │   │     → Sets or clears the checked state for all sub-items of a given top-level menu item.
│   │   │   ├── menu_find_item_by_id [UI] (98B)
│   │   │   └── menu_set_subitem_checked [UI] (194B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   └── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│         → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│         (subtree shown above — 7 children)
├── civ_has_tech [GL] (181B)
│     → Checks if a civilization (param_1) has a specific technology (param_2)
│     (subtree shown above — 1 children)
├── unit_order_goto [GL] (611B) *** STATE MUTATION ***
│     → Executes the goto/move order for a unit
│   ├── calc_unit_goto_direction [GL] (2516B) *** STATE MUTATION ***
│   │     → Calculates the next move direction for a unit executing a goto order
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── direction_from_delta [GL] (325B)
│   │   │     → Converts an (x,y) delta into a direction index (0-7)
│   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │     → BFS pathfinding algorithm
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── debug_show_message [UI] (33B)
│   │   │   │   └── show_help_topic [UI] (34B)
│   │   │   │       └── show_help_topic_ext [UI] (38B)
│   │   │   ├── draw_number_on_map [UI] (346B) *** STATE MUTATION ***
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   │   ├── FUN_00003ECA [??]
│   │   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── get_path_cost [GL] (88B)
│   │   │   ├── set_path_cost [GL] (91B) *** STATE MUTATION ***
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── check_adjacent_enemy_simple [GL] (253B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── check_tile_trespass [GL] (245B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_tile_city_radius_owner [GL] (42B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── find_road_path [GL] (1392B) *** STATE MUTATION ***
│   │   │     → Finds a path using the road/rail network between two points
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── calc_path_distance [GL] (318B) *** STATE MUTATION ***
│   │   │   │   └── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 20 children)
│   │   │   ├── find_adjacent_terrain_type [GL] (158B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── find_nearest_road_tile [GL] (730B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── calc_path_distance [GL] (318B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── find_adjacent_terrain_type [GL] (158B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── get_land_connectivity [GL] (36B)
│   │   │   │   ├── get_sea_connectivity [GL] (36B)
│   │   │   │   ├── wrap_y [GL] (94B)
│   │   │   │   └── calc_movement_cost [GL] (94B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── get_land_connectivity [GL] (36B)
│   │   │   ├── get_sea_connectivity [GL] (36B)
│   │   │   ├── get_bfs_visited [GL] (36B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── wrap_y [GL] (94B)
│   │   │   └── calc_movement_cost [GL] (94B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── distance_x_wrapped [GL] (111B)
│   │   │     → Computes the minimum X distance between two points, accounting for map wrapping on cylindrical maps.
│   │   ├── tile_distance_xy [GL] (157B)
│   │   │     → Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`
│   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   │     (subtree shown above — 4 children)
│   │   ├── check_zoc_if_no_city [GL] (86B) *** STATE MUTATION ***
│   │   │     → Checks ZOC only if there's no city at the location
│   │   │   ├── check_adjacent_enemy_continent [GL] (297B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   └── get_city_owner_at [GL] (111B)
│   │   │         (subtree shown above — 3 children)
│   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │     → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │   └── calc_unit_movement_points [GL] (516B)
│   │   │         (subtree shown above — 4 children)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_unit_owner_at [GL] (66B)
│   │   │     → Returns the civ with units at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   ├── move_unit [GL] (17963B) *** STATE MUTATION ***
│   │     → THE main unit movement function — the single largest function in the binary at ~18KB
│   │   ├── FUN_0000C494 [??]
│   │   ├── flush_display [UI] (21B)
│   │   │     → Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │   └── FUN_0051D564 [??] (178B)
│   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │   │   └── scroll_map_if_needed [UI] (404B) *** STATE MUTATION ***
│   │   │       └── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 2 children)
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │     → Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │     (subtree shown above — 1 children)
│   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │     → Major game logic function that processes visibility updates after a unit moves
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── cancel_goto_if_blocked [GL] (90B) *** STATE MUTATION ***
│   │   │   ├── cancel_goto_for_stack [GL] (192B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   │   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   │   ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│   │   │   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   │   ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   │   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   │   │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   │   └── diff_engine_append_data [GL] (98B)
│   │   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   │   └── diff_engine_append_data [GL] (98B)
│   │   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   │   └── rle_encode (unnamed) [GL] (588B)
│   │   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   │   └── diff_engine_append_data [GL] (98B)
│   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 15 children)
│   │   │   │   └── netmgr_build_packet [GL] (405B) *** STATE MUTATION ***
│   │   │   │       └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 7 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   └── update_map_tile [UI] (50B)
│   │   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 7 children)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │   └── update_map_radius1 [UI] (50B)
│   │   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 7 children)
│   │   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION ***
│   │   │   │   ├── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   │   └── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   │         (cycle — already in call path)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │   └── calc_unit_movement_points [GL] (516B)
│   │   │   │   │         (subtree shown above — 4 children)
│   │   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   │   └── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION ***
│   │   │   │   │   └── diff_engine_copy_sections [GL] (143B) *** STATE MUTATION ***
│   │   │   │   └── rle_encode (unnamed) [GL] (588B)
│   │   │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   │   └── FUN_0051D564 [??] (178B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   │   ├── break_alliance [MIXED] (632B) *** STATE MUTATION ***
│   │   │   │   │   └── get_civ_people_name [GL] (145B)
│   │   │   │   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── open_intelligence_dialog [UI] (535B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── calc_patience_threshold [GL] (211B)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 17 children)
│   │   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── diplo_form_alliance [GL] (374B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_sign_ceasefire [GL] (315B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 5 children)
│   │   │   │   │   ├── calc_gold_to_attitude [GL] (104B)
│   │   │   │   │   ├── diplo_ai_negotiate [MIXED] (10271B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_favor_menu [MIXED] (4878B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_check_war_weariness [UI] (178B)
│   │   │   │   │   ├── diplo_show_main_menu [UI] (747B)
│   │   │   │   │   ├── unknown (set trade route value) [GL] (29B) *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_attitude_raw [GL] (47B)
│   │   │   │   │   ├── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   ├── intel_play_animation [UI] (181B) *** STATE MUTATION ***
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_war_readiness [GL] (820B) *** STATE MUTATION ***
│   │   │   │   │   ├── check_can_declare_war [GL] (365B)
│   │   │   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   │   └── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │   ├── chatwin_get_text_length [UI] (37B)
│   │   │   │   │   ├── parleywin_build_title [UI] (324B)
│   │   │   │   │   ├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION ***
│   │   │   │   │   ├── widget_set_cursor_pos [UI] (43B)
│   │   │   │   │   ├── widget_get_text_length [UI] (37B)
│   │   │   │   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   │   └── set_active_control [UI] (38B)
│   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 18 children)
│   │   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── should_declare_war [GL] (191B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   │   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 35 children)
│   │   │   │   └── check_join_war [GL] (595B) *** STATE MUTATION ***
│   │   │   │       ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │       ├── show_dialog_message [UI] (43B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       └── get_civ_people_name [GL] (145B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   │       └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 18 children)
│   │   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 18 children)
│   │   │       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 3 children)
│   │   ├── find_city_at [GL] (245B)
│   │   │     → Finds a city at the given (x,y) coordinates
│   │   │     (subtree shown above — 2 children)
│   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   │   └── show_unit_type_picker [UI] (260B) *** STATE MUTATION ***
│   │   │       ├── select_list_item [UI] (38B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── popup_dialog_create [UI] (93B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── popup_add_button [UI] (360B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       └── sprite_init_empty [UI] (140B)
│   │   │             (subtree shown above — 3 children)
│   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │     → Adjusts the attitude value between two civs by a delta
│   │   │     (subtree shown above — 2 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │     → Initializes a network message header with magic bytes, message type, and default size.
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── wait_for_animation [UI] (109B)
│   │   │     → Busy-waits for a duration based on param_1, processing messages
│   │   │   ├── flush_display [UI] (21B)
│   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     → Updates a single tile for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     → The main network polling function
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_paradrop_range [GL] (31B) *** STATE MUTATION ***
│   │   │     → Sets the paradrop range for a unit type
│   │   ├── spy_enters_city [MIXED] (10469B) *** STATE MUTATION ***
│   │   │     → The enormous (10KB) spy/diplomat city action handler
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── open_intelligence_dialog [UI] (535B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 9 children)
│   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 35 children)
│   │   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── get_tile_continent_if_land [GL] (72B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │   │   │     (cycle — already in call path)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │   │   └── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │   │   ├── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   └── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│   │   │   │   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── spy_caught_check [GL] (163B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 10 children)
│   │   │   ├── check_incident_permission [GL] (133B)
│   │   │   │   └── unknown (dialog show single param) [UI] (33B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── calc_city_revolt_distance [GL] (232B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── calc_movement_cost [GL] (94B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── execute_civil_war [GL] (1339B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │   │   │   │   ├── FUN_0000DADA [??]
│   │   │   │   │   ├── FUN_0000DB36 [??]
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── select_list_item [UI] (38B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── change_city_production [MIXED] (2572B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── redraw_map_all_players [UI] (124B)
│   │   │   │   │   ├── ai_remove_goals_near [AI] (259B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   │   ├── has_spaceship_built [GL] (47B)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION ***
│   │   │   │   │   ├── can_build_unit_type [GL] (1095B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── can_build_improvement [GL] (1383B)
│   │   │   │   │   ├── show_city_event_dialog_v2 [UI] (915B) *** STATE MUTATION ***
│   │   │   │   │   ├── handle_espionage_discovery [GL] (236B) *** STATE MUTATION ***
│   │   │   │   │   ├── event_check_city_taken [GL] (243B) *** STATE MUTATION ***
│   │   │   │   │   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 23 children)
│   │   │   │   │   ├── diplomacy_check_treaty_violation [GL] (379B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_city_value_for_capture [GL] (277B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplomacy_steal_tech [GL] (999B) *** STATE MUTATION ***
│   │   │   │   │   ├── find_most_central_city [GL] (356B) *** STATE MUTATION ***
│   │   │   │   │   ├── handle_civil_war [GL] (3291B) *** STATE MUTATION ***
│   │   │   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── create_unit [GL] (1675B) *** STATE MUTATION ***
│   │   │   │   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION ***
│   │   │   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 3 children)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 23 children)
│   │   │   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── unknown (show improvement help) [UI] (43B)
│   │   │   │   │   └── show_improvement_help [UI] (111B)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── animate_nuke_explosion [UI] (885B) *** STATE MUTATION ***
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   │   ├── init_game_display [UI] (51B)
│   │   │   │   │   ├── blit_with_clip [UI] (265B)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── generate_terrain_around [GL] (696B) *** STATE MUTATION ***
│   │   │   │       ├── is_tile_valid [GL] (80B)
│   │   │   │       ├── find_city_at [GL] (245B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── update_tile_all_players [UI] (124B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── wrap_x [GL] (94B)
│   │   │   │       ├── get_tile_ptr [GL] (90B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── is_tile_ocean [GL] (57B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── reveal_tile [GL] (154B) *** STATE MUTATION ***
│   │   │   │       ├── get_tile_improvements [GL] (39B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │       ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   │       └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 2 children)
│   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   ├── FUN_0000C679 [??]
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   └── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 6 children)
│   │   │   └── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 7 children)
│   │   ├── spy_sabotage_unit [GL] (784B) *** STATE MUTATION ***
│   │   │     → Spy option to sabotage an enemy unit — either bribe it or blow it up with explosives
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 10 children)
│   │   │   ├── pick_up_unit_004c9528 [GL] (2453B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── calc_city_revolt_distance [GL] (232B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 23 children)
│   │   │   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 3 children)
│   │   │   ├── unknown (show unit help) [UI] (41B)
│   │   │   │   └── show_unit_type_picker [UI] (260B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 4 children)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── animate_combat_movement [UI] (2281B) *** STATE MUTATION ***
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── blit_with_clip [UI] (265B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── sum_stack_property [GL] (724B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │   │     → Animates unit movement between tiles
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 20 children)
│   │   │   ├── blit_with_clip [UI] (265B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── calc_movement_step_size [UI] (47B)
│   │   │   │   └── calc_scaled_step [UI] (38B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── port_destructor [UI] (114B)
│   │   │       ├── port_init [UI] (258B)
│   │   │       ├── port_unlock [UI] (83B)
│   │   │       ├── surface_is_locked [UI] (44B)
│   │   │       └── destroy_dib_surface [UI] (155B)
│   │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │   │     → Checks whether civ param_1 is allowed to attack civ param_2 given current treaties
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── check_can_declare_war [GL] (365B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │   │     → The main city capture handler — one of the most complex functions in the binary
│   │   │     (subtree shown above — 65 children)
│   │   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │   │     → Handles a nuclear attack on a tile
│   │   │     (subtree shown above — 15 children)
│   │   ├── resolve_combat [GL] (15052B) *** STATE MUTATION ***
│   │   │     → The main combat resolution function
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 26 children)
│   │   │   ├── dialog_repaint_check [UI] (91B)
│   │   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── reassign_all_city_production [GL] (254B) *** STATE MUTATION ***
│   │   │   │   ├── change_city_production [MIXED] (2572B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 13 children)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── diplo_activate_alliance_wars [GL] (910B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 9 children)
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── draw_unit_at_position [UI] (171B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 20 children)
│   │   │   ├── invalidate_single_tile [UI] (42B)
│   │   │   │   └── invalidate_tile_area [UI] (60B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── execute_airlift [GL] (460B) *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── unknown (show improvement help) [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── ai_alert_nearby_units [AI] (470B) *** STATE MUTATION ***
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── ai_choose_government [AI] (558B) *** STATE MUTATION ***
│   │   │   │   ├── check_govt_available [GL] (323B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   └── ai_revolution_notification [GL] (1336B) *** STATE MUTATION ***
│   │   │   │       ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │       ├── show_dialog_message [UI] (43B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │   │   │       ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── civ_has_active_wonder [GL] (142B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── get_civ_noun_name [GL] (145B)
│   │   │   │       ├── get_civ_leader_title [GL] (210B)
│   │   │   │       ├── get_civ_adjective_name [GL] (145B)
│   │   │   │       ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │   │   │       └── revolution_dialog [MIXED] (678B) *** STATE MUTATION ***
│   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 23 children)
│   │   │   ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 17 children)
│   │   │   ├── diplomacy_check_treaty_violation [GL] (379B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── calc_unit_hit_points [GL] (119B) *** STATE MUTATION ***
│   │   │   ├── calc_unit_defense_strength [GL] (931B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── calc_stack_best_defender [GL] (786B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── calc_unit_defense_strength [GL] (931B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── handle_unit_kill [GL] (411B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── event_check_unit_killed [GL] (231B) *** STATE MUTATION ***
│   │   │   │   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│   │   │   │   ├── record_combat_kill [GL] (762B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_foreground_color [UI] (92B)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   └── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 7 children)
│   │   │   ├── handle_stack_wipe [GL] (105B) *** STATE MUTATION ***
│   │   │   │   ├── handle_unit_kill [GL] (411B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── handle_unit_promotion [GL] (322B) *** STATE MUTATION ***
│   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── animate_combat_movement [UI] (2281B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 14 children)
│   │   │   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 15 children)
│   │   │   ├── scramble_defenders_to_tile [GL] (1084B) *** STATE MUTATION ***
│   │   │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 20 children)
│   │   │   │   ├── execute_paradrop [GL] (2572B) *** STATE MUTATION ***
│   │   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 26 children)
│   │   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── set_paradrop_range [GL] (31B) *** STATE MUTATION ***
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   │   ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 17 children)
│   │   │   │   │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   │   ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 65 children)
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   │   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │   │   │   │   ├── clear_stack_visibility [GL] (88B) *** STATE MUTATION ***
│   │   │   │   │   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_unit_owner_at [GL] (66B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── get_tile_controller [GL] (72B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   │         (subtree shown above — 3 children)
│   │   │   ├── refresh_combat_tiles [UI] (68B)
│   │   │   │   └── update_map_area_all_players [UI] (136B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_unit_owner_at [GL] (66B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── process_goody_hut [GL] (3404B) *** STATE MUTATION ***
│   │   │     → Processes a goody hut encounter
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 35 children)
│   │   │   ├── can_research_tech [GL] (156B)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 8 children)
│   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 23 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── create_unit [GL] (1675B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 9 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── (get_tile_fertility_or_city_radius) [GL] (100B)
│   │   │   │   ├── get_tile_city_radius_owner [GL] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_tile_fertility [GL] (42B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── claim_adjacent_ocean_tiles [GL] (306B) *** STATE MUTATION ***
│   │   │     → Claims adjacent ocean tiles for a civilization when it builds on a coast
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── reveal_tile_for_civ [GL] (188B) *** STATE MUTATION ***
│   │   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_unit_owner_at [GL] (66B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 2 children)
│   │   ├── handle_caravan_arrival [MIXED] (1831B) *** STATE MUTATION ***
│   │   │     → Handles a caravan/freight unit arriving at a destination city
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── select_list_item [UI] (38B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── process_caravan_arrival [GL] (3144B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── establish_trade_route [GL] (765B) *** STATE MUTATION ***
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_trade_route [GL] (103B) *** STATE MUTATION ***
│   │   │   │   │   └── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 8 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── calc_tech_cost [GL] (1003B)
│   │   │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │   │   │   ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION ***
│   │   │   │   │   └── recalc_city_all [GL] (76B) *** STATE MUTATION ***
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 23 children)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── popup_add_edit_field [UI] (412B)
│   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── popup_add_radio_option [UI] (566B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── popup_get_button_width [UI] (32B)
│   │   │   └── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 7 children)
│   │   ├── mp_lock_map [GL] (971B) *** STATE MUTATION ***
│   │   │     → Locks map tiles for multiplayer movement synchronization
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   ├── mp_unlock_map [GL] (324B) *** STATE MUTATION ***
│   │   │     → Unlocks map tiles after multiplayer movement completes
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   ├── spaceship_ai_should_start [AI] (583B) *** STATE MUTATION ***
│   │   │     → Determines if an AI civ should start building spaceship parts
│   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── spaceship_is_enabled [GL] (90B)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── tile_distance_xy [GL] (157B)
│   │   │     → Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`
│   │   ├── get_unit_max_hp [GL] (45B)
│   │   │     → Returns the maximum hit points for a unit based on its type.
│   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │     → Returns the remaining HP of a unit (max_hp - damage)
│   │   │     (subtree shown above — 1 children)
│   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   │     (subtree shown above — 4 children)
│   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │     → Returns remaining movement points (total - spent)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     → Returns the next unit in the stack linked list, or -1 if at end
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │     → Follows prev pointers to find the first unit in the stack.
│   │   │     (subtree shown above — 1 children)
│   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │   │     → Sets a unit's order to "goto" (3)
│   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │     → Moves a unit from its current position to a new position by picking it up and putting it down
│   │   │     (subtree shown above — 6 children)
│   │   ├── move_unit_to_bottom [GL] (577B) *** STATE MUTATION ***
│   │   │     → Moves a unit to the bottom of its stack (last position)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_last_unit_in_stack [GL] (118B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 3 children)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 6 children)
│   │   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │   │     → Relocates all units in a stack to a new position.
│   │   │     (subtree shown above — 4 children)
│   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │     → Deletes a unit
│   │   │     (subtree shown above — 7 children)
│   │   ├── clear_stack_visibility [GL] (88B) *** STATE MUTATION ***
│   │   │     → Clears visibility for all units in a stack.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │     → Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask)
│   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │   │     → Sets visibility for all units in a stack to be seen by a specific civ.
│   │   │     (subtree shown above — 3 children)
│   │   ├── check_zoc_violation [GL] (407B) *** STATE MUTATION ***
│   │   │     → Checks if a unit at (param_1, param_2) moving for civ param_3 would violate zone-of-control rules
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── check_zoc_if_no_city [GL] (86B) *** STATE MUTATION ***
│   │   │     → Checks ZOC only if there's no city at the location
│   │   │     (subtree shown above — 2 children)
│   │   ├── set_stack_visibility_mask [GL] (90B) *** STATE MUTATION ***
│   │   │     → OR's a visibility bitmask into every unit in a stack.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── sum_stack_property [GL] (724B)
│   │   │     → Sums a property across all units in a stack
│   │   │     (subtree shown above — 2 children)
│   │   ├── count_units_by_role [GL] (120B)
│   │   │     → Counts units in a stack that have a specific role.
│   │   │     (subtree shown above — 2 children)
│   │   ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │   │     → Loads ground/air units onto a transport ship
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── eject_air_units [GL] (343B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 6 children)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │   │     → Stacks a unit (puts it into storage)
│   │   │     (subtree shown above — 6 children)
│   │   ├── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│   │   │     → Safely deletes a unit, handling the case where it's a ship carrying units
│   │   │     (subtree shown above — 10 children)
│   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │     → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_explored [GL] (71B)
│   │   │     → Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_tile_controller [GL] (72B)
│   │   │     → Returns the controlling civ at a tile — city owner first, then unit owner.
│   │   │     (subtree shown above — 2 children)
│   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │     → Checks if a tile has a goody hut (village)
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │     → Sets or clears improvement bits on a tile
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │     → Sets or clears visibility bits (byte 4) on a tile
│   │   │     (subtree shown above — 3 children)
│   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │     → Begins a batched map update session for multiplayer
│   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │         → Ends a batched map update
│   │         (subtree shown above — 2 children)
│   ├── check_adjacent_enemy_simple [GL] (253B) *** STATE MUTATION ***
│   │     → Simple check for adjacent enemy units — no ocean/continent checks
│   │     (subtree shown above — 3 children)
│   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│         → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│         (subtree shown above — 1 children)
├── execute_paradrop [GL] (2572B) *** STATE MUTATION ***
│     → Executes a paradrop operation
│     (subtree shown above — 28 children)
├── citywin_modal_refresh [UI] (132B) *** STATE MUTATION ***
│     → Shows a modal city refresh message
│   ├── FUN_0000BC4F [??]
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   └── unknown (dialog show single param) [UI] (33B)
│         → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│         (subtree shown above — 1 children)
├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│     → Opens the city window for a specific city, handling disorder state
│     (subtree shown above — 8 children)
├── unit_order_sentry [MIXED] (451B) *** STATE MUTATION ***
│     → Places units on sentry duty
│   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │     → Major game logic function that processes visibility updates after a unit moves
│   │     (subtree shown above — 26 children)
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool
│   ├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
│   │     → Activates the current unit for player input
│   │   ├── center_all_map_views [UI] (116B)
│   │   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   │     (subtree shown above — 1 children)
│   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │   │     (subtree shown above — 1 children)
│   │   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │   │     → Starts human turn if not already active or if param forces it
│   │   │     (subtree shown above — 3 children)
│   │   ├── select_next_unit [MIXED] (436B) *** STATE MUTATION ***
│   │   │     → Selects the next unit needing orders
│   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 26 children)
│   │   │   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 19 children)
│   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── is_unit_ready_to_move [GL] (271B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_unit_moves_remaining [GL] (69B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   └── find_next_unit_needing_orders [GL] (629B) *** STATE MUTATION ***
│   │   │       ├── calc_movement_cost [GL] (94B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       └── is_unit_ready_to_move [GL] (271B)
│   │   │             (subtree shown above — 2 children)
│   │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │   │     → Updates all menu item enabled/disabled states based on current game state
│   │   │     (subtree shown above — 19 children)
│   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │     → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │     (subtree shown above — 7 children)
│   │   └── is_unit_ready_to_move [GL] (271B)
│   │         → Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │         (subtree shown above — 2 children)
│   ├── find_unit_stack_at_xy [GL] (231B)
│   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │     (subtree shown above — 3 children)
│   ├── sum_stack_property [GL] (724B)
│   │     → Sums a property across all units in a stack
│   │     (subtree shown above — 2 children)
│   └── show_unit_list_dialog [UI] (693B) *** STATE MUTATION ***
│         → Shows a scrolling dialog listing all units in a stack with their details (civ name, veteran flag, type name, home cit...
│       ├── text_begin [UI] (29B)
│       │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│       ├── text_add_label_id [UI] (33B)
│       │     → Appends a localized label (by ID) to the global text buffer.
│       ├── mapgen_set_dialog_type [UI] (42B)
│       │     → Sets up a dialog/progress indicator for map generation with the given type parameter.
│       │   └── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│       │       ├── rect_get_width [UI] (27B)
│       │       ├── rect_get_height [UI] (28B)
│       │       ├── unknown (popup list init) [UI] (64B)
│       │       ├── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│       │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│       │       │     (subtree shown above — 3 children)
│       │       ├── popup_set_bitmap [UI] (50B)
│       │       │   └── popup_calc_max_text_height [UI] (132B)
│       │       ├── popup_set_field_10 [UI] (33B)
│       │       └── popup_set_scaled_width [UI] (99B)
│       ├── select_list_item [UI] (38B)
│       │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│       │     (subtree shown above — 1 children)
│       ├── text_newline [UI] (29B)
│       │     → Adds a newline to the global text buffer.
│       ├── text_begin_italic [UI] (29B)
│       │     → Begins italic text mode in the global text buffer.
│       ├── text_end_italic [UI] (29B)
│       │     → Ends italic text mode in the global text buffer.
│       ├── display_improvement [UI] (33B)
│       │     → Adds an improvement/government icon to the text buffer.
│       ├── set_status_bar_text [UI] (33B)
│       │     → Sets the status bar text to param_1 using the global string buffer.
│       ├── unknown (string pool append separator) [UI] (29B)
│       │     → Appends a separator to the string buffer at DAT_00679640 using thunk_FUN_004aef96.
│       ├── get_civ_adjective_name [GL] (145B)
│       │     → Returns the adjective form of a civilization name
│       ├── popup_dialog_create [UI] (93B)
│       │     → Creates a new popup dialog object
│       │     (subtree shown above — 2 children)
│       ├── popup_set_title [UI] (86B)
│       │     → Sets the popup dialog title string
│       ├── popup_set_scaled_width [UI] (99B)
│       │     → Sets the popup dialog width (this+0x11C) with optional resolution scaling
│       ├── popup_add_button [UI] (360B)
│       │     → Adds a button to the popup dialog
│       │     (subtree shown above — 2 children)
│       ├── get_next_unit_in_stack [GL] (65B)
│       │     → Returns the next unit in the stack linked list, or -1 if at end
│       │     (subtree shown above — 1 children)
│       ├── get_first_unit_in_stack [GL] (118B)
│       │     → Follows prev pointers to find the first unit in the stack.
│       │     (subtree shown above — 1 children)
│       └── sprite_init_empty [UI] (140B)
│             → Initializes a sprite with given dimensions and fill color
│             (subtree shown above — 3 children)
├── move_unit [GL] (17963B) *** STATE MUTATION ***
│     → THE main unit movement function — the single largest function in the binary at ~18KB
│     (subtree shown above — 73 children)
├── find_unit_stack_at_xy [GL] (231B)
│     → Finds the first unit of any civ at map position (param_1, param_2)
│     (subtree shown above — 3 children)
├── get_tile_explored [GL] (71B)
│     → Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│     (subtree shown above — 1 children)
└── get_active_control [UI] (21B)
      → Returns DAT_00637ea4 (the active control handle).
```

---

## map_key (`004125C6`, 2451B)

Reachable: 1472 functions, 395 state-mutating

```
map_key [MIXED] (2451B) *** STATE MUTATION ***
  → Main virtual key handler for the map window
├── FUN_0000994F [??]
├── FUN_0000BC4F [??]
├── FUN_0000BD13 [??]
├── FUN_0000BF72 [??]
├── show_dialog_message [UI] (43B)
│     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   └── FUN_0051D564 [??] (178B)
├── cancel_unit_blink_timer [UI] (191B) *** STATE MUTATION ***
│     → Cancels the unit blink timer and restores the cursor state
│   ├── set_cursor_icon [UI] (47B)
│   │     → Sets the cursor icon to the specified resource ID on the current view's window handle.
│   │   └── load_and_set_cursor [UI] (70B)
│   │         → Loads a cursor by resource ID onto a window and optionally activates it.
│   │       └── load_and_store_cursor [UI] (136B)
│   ├── stop_cursor_blink [UI] (39B)
│   │     → Stops the cursor blink animation.
│   │   ├── get_view_window_handle [UI] (28B)
│   │   │     → Returns the window handle stored at offset 8 of the current object.
│   │   └── release_mouse_capture [UI] (22B)
│   │         → Releases the mouse capture.
│   └── timer_stop [FW] (62B)
│         → Stops a timer by slot index
├── cancel_goto_mode [UI] (159B) *** STATE MUTATION ***
│     → If currently in goto mode, resets all view cursors back to normal (0x201).
│   ├── is_in_goto_mode [UI] (60B)
│   │     → Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
│   └── set_cursor_icon [UI] (47B)
│         → Sets the cursor icon to the specified resource ID on the current view's window handle.
│         (subtree shown above — 1 children)
├── move_cursor_by_direction [UI] (114B) *** STATE MUTATION ***
│     → Moves the map cursor in direction param_1 (0-7)
│   ├── scroll_map_if_needed [UI] (404B) *** STATE MUTATION ***
│   │     → Checks if position (param_1, param_2) is near the edges of the visible map area and scrolls the map if necessary
│   │   └── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │         → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   │       ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │       │   ├── minimap_full_redraw [UI] (416B) *** STATE MUTATION ***
│   │       │   │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │       │   │   ├── minimap_get_tile_color [UI] (425B)
│   │       │   │   ├── minimap_draw_goto_line [UI] (211B)
│   │       │   │   ├── flush_display [UI] (21B)
│   │       │   │   ├── end_paint [UI] (32B)
│   │       │   │   ├── surface_set_clear_color [UI] (34B)
│   │       │   │   ├── fill_rect_palette [UI] (50B)
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │       │   │   ├── dialog_create_buttons [UI] (675B)
│   │       │   │   ├── prepare_surface [UI] (24B)
│   │       │   │   └── wrap_x [GL] (94B)
│   │       │   ├── recalc_viewport_geometry [UI] (1410B) *** STATE MUTATION ***
│   │       │   │   ├── set_editor_font [UI] (93B)
│   │       │   │   ├── reset_sprite_scale [UI] (28B)
│   │       │   │   ├── scale_at_current_zoom [UI] (47B)
│   │       │   │   ├── set_current_zoom_scale [UI] (41B)
│   │       │   │   ├── wrap_x [GL] (94B)
│   │       │   │   ├── port_alloc_rect [UI] (58B)
│   │       │   │   ├── scale_table_build_primary [UI] (657B)
│   │       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   ├── redraw_full_viewport [UI] (278B)
│   │       │   │   ├── draw_complete_tile [UI] (495B)
│   │       │   │   ├── draw_city_labels [UI] (871B)
│   │       │   │   ├── unknown (clear_surface_region) [UI] (28B)
│   │       │   │   └── wrap_x [GL] (94B)
│   │       │   ├── begin_end_paint_cycle [UI] (100B)
│   │       │   │   ├── flush_display [UI] (21B)
│   │       │   │   ├── end_paint [UI] (32B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 15 children)
│   │       │   └── dialog_create_buttons [UI] (675B)
│   │       │         (subtree shown above — 8 children)
│   │       └── wrap_x [GL] (94B)
│   ├── center_and_scroll_to_tile [UI] (114B) *** STATE MUTATION ***
│   │     → Centers the map on (param_1, param_2) if the tile is valid
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── center_map_on_cursor [UI] (56B) *** STATE MUTATION ***
│   │   │     → Centers the map view on the current cursor position (DAT_0064b1b4, DAT_0064b1b0) for the current player (DAT_006d1da0).
│   │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │       ├── tile_to_screen [UI] (151B)
│   │   │       │   └── wrap_x [GL] (94B)
│   │   │       ├── is_tile_visible [UI] (99B)
│   │   │       │   └── is_tile_in_viewport_rect [UI] (97B)
│   │   │       ├── redraw_tile_area [UI] (352B)
│   │   │       │   ├── draw_complete_tile [UI] (495B)
│   │   │       │   │     (subtree shown above — 12 children)
│   │   │       │   ├── is_tile_visible [UI] (99B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── draw_city_labels [UI] (871B)
│   │   │       │   │     (subtree shown above — 10 children)
│   │   │       │   ├── calc_tile_group_rect [UI] (191B)
│   │   │       │   ├── wrap_x [GL] (94B)
│   │   │       │   └── port_set_rect [UI] (91B)
│   │   │       ├── invalidate_tile_area [UI] (60B)
│   │   │       │   ├── invalidate_region [UI] (180B)
│   │   │       │   └── calc_tile_group_rect [UI] (191B)
│   │   │       │         (subtree shown above — 3 children)
│   │   │       ├── reset_sprite_scale [UI] (28B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── set_current_zoom_scale [UI] (41B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │             (subtree shown above — 1 children)
│   │   └── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │         → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── invalidate_region [UI] (180B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION ***
│   │       ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION ***
│   │       │   ├── rect_get_width [UI] (27B)
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── text_begin [UI] (29B)
│   │       │   ├── text_add_label_id [UI] (33B)
│   │       │   ├── get_font_height [UI] (28B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │   └── FUN_0000858E [??]
│   │       │   ├── get_civ_name [UI] (28B)
│   │       │   │   └── get_civ_adjective_name [GL] (145B)
│   │       │   ├── set_status_bar_text [UI] (33B)
│   │       │   ├── draw_text_centered [UI] (46B)
│   │       │   │   └── draw_text_centered [UI] (139B)
│   │       │   ├── scale_sprite [UI] (35B)
│   │       │   ├── draw_status_turn_info [UI] (474B)
│   │       │   │   ├── rect_get_width [UI] (27B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── flush_display [UI] (21B)
│   │       │   │   ├── invalidate_region [UI] (180B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── text_begin [UI] (29B)
│   │       │   │   ├── text_add_label_id [UI] (33B)
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── draw_text_at [UI] (42B)
│   │       │   │   ├── tile_bitmap [UI] (391B)
│   │       │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │       │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │       │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   └── port_set_rect [UI] (91B)
│   │       │   ├── draw_coordinate_text [UI] (132B)
│   │       │   │   ├── text_begin [UI] (29B)
│   │       │   │   ├── text_add_label_id [UI] (33B)
│   │       │   │   ├── text_newline [UI] (29B)
│   │       │   │   ├── text_begin_bold [UI] (29B)
│   │       │   │   ├── text_begin_italic [UI] (29B)
│   │       │   │   ├── text_end_italic [UI] (29B)
│   │       │   │   ├── text_add_number [UI] (33B)
│   │       │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │       │   │   ├── draw_text_at [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_tile_continent [GL] (39B)
│   │       │   ├── format_unit_orders_text [UI] (450B)
│   │       │   │   ├── text_add_string [UI] (33B)
│   │       │   │   ├── text_add_label_id [UI] (33B)
│   │       │   │   ├── text_newline [UI] (29B)
│   │       │   │   ├── text_begin_italic [UI] (29B)
│   │       │   │   ├── text_end_italic [UI] (29B)
│   │       │   │   ├── display_improvement [UI] (33B)
│   │       │   │   ├── text_add_number [UI] (33B)
│   │       │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │       │   │   ├── find_city_at [GL] (245B)
│   │       │   │   └── get_tile_improvements [GL] (39B)
│   │       │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │       │   │   ├── rect_get_width [UI] (27B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── flush_display [UI] (21B)
│   │       │   │   ├── invalidate_region [UI] (180B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── text_begin [UI] (29B)
│   │       │   │   ├── text_add_label_id [UI] (33B)
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── text_add_number [UI] (33B)
│   │       │   │   ├── unknown (string pool set) [UI] (33B)
│   │       │   │   ├── draw_text_at [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scale_sprite [UI] (35B)
│   │       │   │   ├── set_sprite_scale [UI] (33B)
│   │       │   │   ├── reset_sprite_scale [UI] (28B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── prepare_surface [UI] (24B)
│   │       │   │   ├── draw_hline [UI] (69B)
│   │       │   │   ├── tile_bitmap [UI] (391B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │       │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │       │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   ├── port_set_rect [UI] (91B)
│   │       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── select_display_unit [UI] (396B)
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │   ├── is_tile_ocean [GL] (57B)
│   │       │   │   └── get_fortress_owner_at [GL] (77B)
│   │       │   ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │       │   │   ├── rect_get_width [UI] (27B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── set_rect_wh [UI] (48B)
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   ├── get_civ_background_color [UI] (92B)
│   │       │   │   ├── scale_sprite [UI] (35B)
│   │       │   │   ├── set_sprite_scale [UI] (33B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── reset_sprite_scale [UI] (28B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │       │   │   ├── select_display_unit [UI] (396B)
│   │       │   │   │     (subtree shown above — 5 children)
│   │       │   │   ├── get_civ_dark_color [UI] (92B)
│   │       │   │   ├── get_unit_max_hp [GL] (45B)
│   │       │   │   ├── get_fortress_owner_at [GL] (77B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── get_tile_improvements [GL] (39B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── port_copy_rect [UI] (282B)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │       │   ├── calc_unit_movement_points [GL] (516B)
│   │       │   │   ├── civ_has_active_wonder [GL] (142B)
│   │       │   │   ├── civ_has_tech [GL] (181B)
│   │       │   │   ├── get_unit_max_hp [GL] (45B)
│   │       │   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── find_unit_stack_at_xy [GL] (231B)
│   │       │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │       │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_unit_owner_at [GL] (66B)
│   │       │   ├── sum_stack_property [GL] (724B)
│   │       │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_first_unit_in_stack [GL] (118B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── get_unit_home_city_name [GL] (89B)
│   │       │   ├── get_tile_ptr [GL] (90B)
│   │       │   │   └── is_tile_valid [GL] (80B)
│   │       │   ├── get_civ_vis_ptr [GL] (48B)
│   │       │   ├── get_tile_terrain_raw [GL] (41B)
│   │       │   │   └── get_tile_ptr [GL] (90B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── check_tile_resource [GL] (281B)
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   └── get_tile_ptr [GL] (90B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── check_tile_goody_hut [GL] (229B)
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   ├── is_tile_ocean [GL] (57B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_tile_owner [GL] (100B)
│   │       │   ├── get_tile_improvements [GL] (39B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │       │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │       │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   └── port_set_rect [UI] (91B)
│   │       ├── prepare_surface [UI] (24B)
│   │       └── tile_bitmap [UI] (391B)
│   │             (subtree shown above — 1 children)
│   └── wrap_x [GL] (94B)
│         → Wraps an X coordinate for a cylindrical (non-flat) map
├── launch_tech_editor [UI] (89B)
│     → Launches the technology editor: creates the editor object, opens the editor dialog, and cleans up.
│   ├── open_tech_editor [UI] (2186B) *** STATE MUTATION ***
│   │     → Opens the full technology editor dialog
│   │   ├── set_callback_0x44 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x44.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │   └── show_window_inner [UI] (38B)
│   │   │       ├── manage_window_show [UI] (37B)
│   │   │       │   └── FUN_0000C40A [??]
│   │   │       └── surface_list_find_dirty [UI] (174B)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │   └── FUN_0000BA4F [??]
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │   ├── FUN_00009740 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── FUN_0000944B [??]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │   └── get_window_object [UI] (28B)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── copy_tech_data_to_editor [GL] (295B) *** STATE MUTATION ***
│   │   │     → Copies technology data (names and prerequisite info) from the game tech table (DAT_00627684 array, stride 0x10) to th...
│   │   ├── update_editor_controls [UI] (343B)
│   │   │     → Updates editor dialog controls with current tech editor values based on control types (9=text field, 12=combo box).
│   │   │   ├── get_combo_selection_id [UI] (28B)
│   │   │   ├── set_edit_text [UI] (43B)
│   │   │   │   └── FUN_00002D7F [??]
│   │   │   └── set_combo_selection [UI] (43B)
│   │   │       └── FUN_000036F6 [??]
│   │   ├── handle_editor_selection_change [UI] (279B) *** STATE MUTATION ***
│   │   │     → Handles selection change in the tech editor combo box
│   │   │   ├── update_editor_controls [UI] (343B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── read_editor_controls [UI] (480B) *** STATE MUTATION ***
│   │   │   │   ├── get_combo_selection_id [UI] (28B)
│   │   │   │   ├── get_edit_text [UI] (43B)
│   │   │   │   │   └── FUN_00002D4D [??]
│   │   │   │   └── get_combo_selection [UI] (37B)
│   │   │   │       └── FUN_000036B1 [??]
│   │   │   ├── redraw_tech_editor [UI] (27B)
│   │   │   │   └── draw_tech_editor [UI] (1142B)
│   │   │   │       ├── end_paint [UI] (32B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── text_begin [UI] (29B)
│   │   │   │       ├── text_add_label_id [UI] (33B)
│   │   │   │       ├── fill_surface_from_rect [UI] (71B)
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       ├── get_editor_color [UI] (28B)
│   │   │   │       ├── draw_border_frame [UI] (588B)
│   │   │   │       ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 15 children)
│   │   │   │       ├── fill_rect_xywh [UI] (63B)
│   │   │   │       ├── blit_rect_to_rect [UI] (95B)
│   │   │   │       ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │       ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │       ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │       ├── draw_text_centered [UI] (139B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── scale_table_build_primary [UI] (657B)
│   │   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── populate_tech_prereq_list [UI] (769B)
│   │   │   │   ├── add_listbox_item [UI] (49B)
│   │   │   │   │   └── FUN_00003C50 [??]
│   │   │   │   └── clear_listbox [UI] (47B)
│   │   │   │       └── FUN_00003CDC [??]
│   │   │   ├── get_parent_window_handle [UI] (28B)
│   │   │   ├── get_combo_selection [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_combo_selection [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │   └── show_help_topic_ext [UI] (38B)
│   │   │   │       └── show_help_dialog [UI] (46B)
│   │   │   └── unknown (set popup parent B) [UI] (24B)
│   │   ├── create_editor_combo_control [UI] (962B) *** STATE MUTATION ***
│   │   │     → Creates a combo box control in the tech editor for a specific field position
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_combo_control [UI] (101B)
│   │   │   │   ├── FUN_00003130 [??]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── set_combo_data_source [UI] (48B)
│   │   │   │   ├── FUN_000035C8 [??]
│   │   │   │   └── get_data_source_ptr [UI] (27B)
│   │   │   ├── add_combo_item [UI] (49B)
│   │   │   │   └── FUN_0000357E [??]
│   │   │   └── set_combo_callback [UI] (33B)
│   │   ├── create_editor_edit_control [UI] (244B) *** STATE MUTATION ***
│   │   │     → Creates an edit text control in the tech editor for numeric fields.
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_edit_control [UI] (130B)
│   │   │   │   ├── FUN_00002740 [??]
│   │   │   │   ├── FUN_00002D7F [??]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── set_edit_max_chars [UI] (43B)
│   │   │   │   └── FUN_00002DA1 [??]
│   │   │   └── set_control_callback [UI] (33B)
│   │   ├── set_editor_font [UI] (93B)
│   │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_combo_selection [UI] (43B)
│   │   │     → Sets the selected index of a combo box.
│   │   │     (subtree shown above — 1 children)
│   │   ├── create_listbox_control [UI] (121B)
│   │   │     → Creates a listbox control for the editor.
│   │   │   ├── FUN_000037A0 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_listbox_data_source [UI] (48B)
│   │   │     → Sets the data source for a listbox.
│   │   │   ├── FUN_00003C9A [??]
│   │   │   └── get_data_source_ptr [UI] (27B)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │   ├── unknown (set_font_size) [UI] (43B)
│   │   │   │   └── set_callback_0x38 [UI] (40B)
│   │   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │   │   └── set_callback_0x3c [UI] (40B)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │     (subtree shown above — 8 children)
│   │   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │   └── create_offscreen_surface_b [UI] (119B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── port_alloc_rect [UI] (58B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── port_draw_text_rect [UI] (77B)
│   │   │       │   └── write_full_colortable [UI] (39B)
│   │   │       ├── surface_create_8param [UI] (85B)
│   │   │       │   ├── get_view_window_handle [UI] (28B)
│   │   │       │   ├── surface_init_8 [UI] (96B)
│   │   │       │   └── set_dialog_wndproc [UI] (55B)
│   │   │       └── set_window_data_and_wndproc [UI] (55B)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── call_refresh_callback [UI] (47B)
│   │   ├── load_gif_file [UI] (1353B)
│   │   │     → Loads a GIF image from a file
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── widget_read_text (wrapper) [UI] (44B)
│   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   └── port_alloc [UI] (325B)
│   │   │   │       ├── FUN_000035B0 [??]
│   │   │   │       ├── rect_get_width [UI] (27B)
│   │   │   │       ├── rect_get_height [UI] (28B)
│   │   │   │       ├── port_init [UI] (258B)
│   │   │   │       ├── port_lock [UI] (287B)
│   │   │   │       ├── port_unlock [UI] (83B)
│   │   │   │       ├── surface_is_locked [UI] (44B)
│   │   │   │       ├── destroy_dib_surface [UI] (155B)
│   │   │   │       ├── get_surface_stride [UI] (48B)
│   │   │   │       └── check_topdown [UI] (41B)
│   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   ├── palette_apply [UI] (90B)
│   │   │   │   │   ├── palette_generate_random_id [UI] (75B)
│   │   │   │   │   └── unknown (palette_update_entries) [UI] (60B)
│   │   │   │   └── palette_set_entry [UI] (316B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── flip_surface_vertical [UI] (249B)
│   │   │       └── get_pixel_buffer [UI] (39B)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │   ├── process_messages [UI] (21B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   ├── disable_parent_window [UI] (121B)
│   │   │   └── enable_parent_window [UI] (126B)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │       ├── FUN_0000E780 [??]
│   │       ├── palette_generate_random_id [UI] (75B)
│   │       └── unknown (palette_create) [UI] (60B)
│   ├── destroy_editor_object [FW] (12B)
│   │     → Destructor thunk for the editor object.
│   ├── seh_cleanup_4175d5 [FW] (14B)
│   │     → SEH cleanup.
│   ├── create_editor_object [FW] (498B)
│   │     → Constructor for the tech editor object
│   │   └── dialog_ctor [UI] (146B)
│   │         → Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │       └── init_sprite_surface_mgr [UI] (133B)
│   │           └── init_sprite_cache [UI] (132B)
│   │               └── init_render_surface [UI] (274B)
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── city_name_editor_entry [UI] (89B)
│     → Entry point for the city name editor
│   ├── create_editor_object [FW] (498B)
│   │     → Constructor for the tech editor object
│   │     (subtree shown above — 1 children)
│   ├── city_name_editor_open [UI] (2002B) *** STATE MUTATION ***
│   │     → Opens the full city name editor dialog
│   │   ├── set_callback_0x44 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x44.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── set_editor_font [UI] (93B)
│   │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_combo_selection [UI] (43B)
│   │   │     → Sets the selected index of a combo box.
│   │   │     (subtree shown above — 1 children)
│   │   ├── city_name_editor_scroll_update [UI] (108B)
│   │   │     → Updates the scroll position in the city name editor from three scroll controls.
│   │   │   ├── get_combo_selection [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── unknown (city name editor repaint trigger) [UI] (27B)
│   │   │       └── city_name_editor_paint [UI] (713B)
│   │   │           ├── end_paint [UI] (32B)
│   │   │           │     (subtree shown above — 1 children)
│   │   │           ├── text_begin [UI] (29B)
│   │   │           ├── fill_surface_from_rect [UI] (71B)
│   │   │           │     (subtree shown above — 3 children)
│   │   │           ├── set_status_bar_text [UI] (33B)
│   │   │           ├── get_editor_color [UI] (28B)
│   │   │           ├── draw_border_frame [UI] (588B)
│   │   │           │     (subtree shown above — 6 children)
│   │   │           ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │           │     (subtree shown above — 15 children)
│   │   │           ├── fill_rect_xywh [UI] (63B)
│   │   │           │     (subtree shown above — 2 children)
│   │   │           ├── blit_rect_to_rect [UI] (95B)
│   │   │           │     (subtree shown above — 2 children)
│   │   │           ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │           ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │           ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │           ├── draw_text_centered [UI] (139B)
│   │   │           │     (subtree shown above — 2 children)
│   │   │           └── unknown (sprite blit wrapper 2) [UI] (57B)
│   │   ├── city_name_editor_create_buttons [UI] (864B)
│   │   │     → Creates scroll buttons for the city name editor
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_combo_control [UI] (101B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_combo_data_source [UI] (48B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── add_combo_item [UI] (49B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_combo_callback [UI] (33B)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── load_gif_file [UI] (1353B)
│   │   │     → Loads a GIF image from a file
│   │   │     (subtree shown above — 7 children)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │     (subtree shown above — 4 children)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │         (subtree shown above — 3 children)
│   ├── unknown (UI cleanup) [FW] (12B)
│   │     → UI cleanup thunk.
│   ├── unknown (SEH epilog) [FW] (14B)
│   │     → SEH epilog.
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── advisor_city_status_open [UI] (99B)
├── render_power_graph [UI] (2183B)
│     → Renders the Power Graph report
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── set_rect_wh [UI] (48B)
│   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   └── popup_show_modal [UI] (999B)
│   │         → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │       ├── flush_display [UI] (21B)
│   │       ├── process_messages [UI] (21B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_edit_text [UI] (43B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── init_palette_system [UI] (21B)
│   │       ├── unknown — manage window [UI] (37B)
│   │       │   └── FUN_0000C692 [??]
│   │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │       │   ├── unknown (get drawing context) [UI] (37B)
│   │       │   │   └── focus_and_raise_window [UI] (57B)
│   │       │   ├── widget_scrollbar_dtor [UI] (57B)
│   │       │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │       │   └── widget_dropdown_dtor [UI] (57B)
│   │       ├── popup_paint [UI] (1964B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── show_window_wrapper [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   ├── set_rect_wh [UI] (48B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── control_invalidate [UI] (65B)
│   │       │   │   ├── FUN_00008B00 [??]
│   │       │   │   └── FUN_00008B2D [??]
│   │       │   ├── draw_border_rect [UI] (61B)
│   │       │   │   └── draw_rect_outline [UI] (128B)
│   │       │   ├── scale_sprite [UI] (35B)
│   │       │   ├── set_sprite_scale [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   │   └── rect_get_width [UI] (27B)
│   │       │   ├── widget_get_height [UI] (34B)
│   │       │   │   └── rect_get_height [UI] (28B)
│   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │       │   │   └── widget_inflate_rect [UI] (34B)
│   │       │   ├── popup_get_padded_height [UI] (42B)
│   │       │   ├── popup_render_label [UI] (226B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   └── port_fill_rect_pattern [UI] (201B)
│   │       │   │         (subtree shown above — 3 children)
│   │       │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_render_text_at_offset [UI] (61B)
│   │       │   │   └── unknown (popup_draw_icon) [UI] (55B)
│   │       │   ├── popup_layout_dialog [UI] (4785B) *** STATE MUTATION ***
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_calc_max_text_height [UI] (132B)
│   │       │   │   ├── popup_get_line_height [UI] (78B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B)
│   │       │   │   ├── popup_calc_button_area_height [UI] (46B)
│   │       │   │   ├── popup_calc_text_width [UI] (51B)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_render_label [UI] (226B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── popup_has_negative_line_count [UI] (83B)
│   │       │   │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_get_radio_page_number [UI] (56B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── blit_rect_to_rect [UI] (95B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   └── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── popup_redraw_visible_items [UI] (660B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── invalidate_region [UI] (180B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── draw_border_rect [UI] (61B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_draw_item [UI] (706B)
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   └── port_set_rect [UI] (91B)
│   │       │   ├── popup_create_window [UI] (693B)
│   │       │   │   ├── set_callback_0x44 [UI] (45B)
│   │       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── unknown (set_font_size) [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── create_offscreen_surface [UI] (115B) *** STATE MUTATION ***
│   │       │   │   └── create_offscreen_surface_b [UI] (119B)
│   │       │   │         (subtree shown above — 5 children)
│   │       │   ├── popup_init_controls [UI] (6616B) *** STATE MUTATION ***
│   │       │   │   ├── set_rect_wh [UI] (48B)
│   │       │   │   ├── create_text_button [UI] (133B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── set_button_owner [UI] (45B)
│   │       │   │   ├── set_button_handler [UI] (45B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_button_click_callback [UI] (33B)
│   │       │   │   ├── create_checkbox [UI] (167B)
│   │       │   │   ├── set_checkbox_value [UI] (33B)
│   │       │   │   ├── create_scrollbar [UI] (124B)
│   │       │   │   ├── scrollbar_set_position [UI] (52B)
│   │       │   │   ├── scrollbar_set_range [UI] (47B)
│   │       │   │   ├── scrollbar_set_callback [UI] (33B)
│   │       │   │   ├── set_edit_max_chars [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── create_listbox_control [UI] (121B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── add_listbox_item [UI] (49B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── disable_civ_slot [UI] (133B) *** STATE MUTATION ***
│   │       │   │   ├── unknown (set selected item) [UI] (33B) *** STATE MUTATION ***
│   │       │   │   ├── pedia_button_create [UI] (139B)
│   │       │   │   ├── unknown (set button callback) [UI] (33B)
│   │       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │       │   │   ├── scale_sprite [UI] (35B)
│   │       │   │   ├── widget_get_height [UI] (34B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scrollbar_init [UI] (93B)
│   │       │   │   ├── scrollbar_create_window [UI] (207B) *** STATE MUTATION ***
│   │       │   │   ├── scrollbar_set_position [UI] (33B)
│   │       │   │   ├── scrollbar_set_range [UI] (33B)
│   │       │   │   ├── unknown [UI] (43B)
│   │       │   │   ├── unknown [UI] (33B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_count_items_in_pane [UI] (93B)
│   │       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│   │       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│   │       │   │   └── set_scrollbar [UI] (64B)
│   │       │   ├── popup_draw_background [UI] (309B)
│   │       │   │   ├── rect_get_width [UI] (27B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── unknown [UI] (56B)
│   │       │   │   └── tile_bitmap [UI] (391B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── draw_3d_border [UI] (167B)
│   │       │   │   ├── draw_hline [UI] (69B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── draw_vline [UI] (69B)
│   │       │   ├── port_draw_text_styled [UI] (238B)
│   │       │   │   ├── FUN_0000847F [??]
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   │   └── draw_string_palette [UI] (534B)
│   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── unknown (invalidate_all_children) [UI] (115B)
│   │       │       ├── FUN_00008B00 [??]
│   │       │       └── FUN_00008B2D [??]
│   │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │       │   └── FUN_00003CFF [??]
│   │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │       │   └── FUN_00003D62 [??]
│   │       └── modal_dialog_run [UI] (283B)
│   │             (subtree shown above — 4 children)
│   ├── surface_destroy [FW] (57B)
│   │     → Destroys a surface object
│   │   └── port_destructor [UI] (114B)
│   │         → Destroys a port object: unlocks the surface if locked, frees the DIB, resets all fields, and clears the singleton poi...
│   │       ├── port_init [UI] (258B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── surface_is_locked [UI] (44B)
│   │       └── destroy_dib_surface [UI] (155B)
│   ├── fill_surface_from_rect [UI] (71B)
│   │     → Fills a rectangular region on a surface with a solid color, reading dimensions from a rect structure.
│   │     (subtree shown above — 3 children)
│   ├── unknown (string pool set) [UI] (33B)
│   │     → Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   │     (subtree shown above — 1 children)
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool
│   ├── power_graph_cleanup1 [FW] (12B)
│   │     → Stack buffer deallocation thunk.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │       └── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │             (subtree shown above — 3 children)
│   ├── power_graph_cleanup2 [FW] (12B)
│   │     → Font destruction thunk.
│   ├── power_graph_cleanup3 [FW] (12B)
│   │     → Font destruction thunk.
│   ├── power_graph_cleanup4 [FW] (12B)
│   │     → Surface/bitmap destruction thunk.
│   ├── power_graph_seh_restore [FW] (14B)
│   │     → SEH chain restore.
│   ├── object_init_null [FW] (34B)
│   │     → Sets *ECX = 0
│   ├── font_recreate [FW] (95B)
│   │     → Destroys existing font if any, then creates a new one with given params.
│   │   ├── FUN_00008200 [??]
│   │   ├── FUN_0000847F [??]
│   │   └── delete_font [UI] (98B)
│   │         → Deletes a font handle
│   ├── dialog_destructor_delete [FW] (57B)
│   │     → Destructor that calls cleanup then optionally deletes memory.
│   │   └── palette_destroy [UI] (142B)
│   │         → Destroys palette object
│   │       └── unknown (palette_delete) [UI] (39B)
│   ├── draw_border_rect [UI] (61B)
│   │     → Draws a bordered rectangle using surface draw function.
│   │     (subtree shown above — 1 children)
│   ├── draw_text_at [UI] (42B)
│   │     → Draws text at position (param_2, param_3) using the global drawing surface.
│   │     (subtree shown above — 1 children)
│   ├── get_civ_background_color [UI] (92B)
│   │     → Returns the background color for a civilization based on its leader index.
│   ├── calc_year_from_turn [GL] (540B) *** STATE MUTATION ***
│   │     → Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman")
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │     (subtree shown above — 15 children)
│   ├── dialog_create_buttons [UI] (675B)
│   │     → Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │     (subtree shown above — 8 children)
│   ├── dialog_ctor [UI] (146B)
│   │     → Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │     (subtree shown above — 1 children)
│   ├── dialog_create [UI] (588B)
│   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │     (subtree shown above — 6 children)
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │   ├── unknown (popup list init) [UI] (64B)
│   │   │     → Resets and initializes a popup list control with 9 slots and param_1 items.
│   │   └── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │         → Resets all fields of a popup dialog structure to default values
│   ├── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│   │     → Opens a popup dialog with specified parameters (title, position, dimensions, flags)
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B)
│   │   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── unknown (popup list init) [UI] (64B)
│   │   │     → Resets and initializes a popup list control with 9 slots and param_1 items.
│   │   ├── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │   │     → Resets all fields of a popup dialog structure to default values
│   │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │   │     → Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup stack
│   │   │     (subtree shown above — 3 children)
│   │   ├── popup_set_bitmap [UI] (50B)
│   │   │     → Sets the popup dialog's bitmap pointer (this+8 = param_1) and recalculates the layout height (this+0xB4) from the bit...
│   │   │   └── popup_calc_max_text_height [UI] (132B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── popup_set_field_10 [UI] (33B)
│   │   │     → Sets popup dialog field at this+0x10 to param_1
│   │   └── popup_set_scaled_width [UI] (99B)
│   │         → Sets the popup dialog width (this+0x11C) with optional resolution scaling
│   ├── draw_colored_rect [UI] (52B)
│   │     → Draws a colored rectangle
│   │   ├── port_alloc [UI] (683B)
│   │   │     → Draws a line from (param_1,param_2) to (param_3,param_4)
│   │   │   ├── FUN_000040FB [??]
│   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   ├── unknown (get surface base) [UI] (28B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   ├── fill_scanline_8bit [UI] (126B)
│   │   │   └── fill_column_8bit [UI] (83B)
│   │   └── unknown (set/get draw color) [UI] (38B)
│   │         → Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   ├── blit_rect_to_rect [UI] (95B)
│   │     → Blits a rectangle from one position to another, both specified by (x, y, w, h).
│   │     (subtree shown above — 2 children)
│   ├── clamp [FW] (57B)
│   │     → Clamps a value to [min, max] range
│   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │     → Sets the target surface for text drawing.
│   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │     → Sets the source font surface for text drawing.
│   ├── port_constructor [FW] (44B)
│   │     → Constructs a port object by setting its vtable pointer and initializing fields via FUN_005bd813.
│   │   └── port_init [UI] (258B)
│   │         → Initializes all fields of a port object, either to zero (if param_1 is null) or from the dimensions of the provided R...
│   ├── load_gif_resource [UI] (847B)
│   │     → Loads a GIF image from a resource
│   │   ├── flush_display [UI] (21B)
│   │   │     → Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── port_init_buffer [UI] (36B)
│   │   │     → Wrapper that calls FUN_005bd696 with param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── port_draw_text_rect [UI] (77B)
│   │   │     → Selects a palette on the port's surface if it differs from the current one.
│   │   │     (subtree shown above — 1 children)
│   │   ├── palette_set_entries [UI] (142B)
│   │   │     → Sets multiple palette entries from an RGB byte array
│   │   │     (subtree shown above — 2 children)
│   │   ├── check_topdown [UI] (41B)
│   │   │     → Returns true if the surface at param_1 has top-down orientation (offset 0x14 == 1).
│   │   └── flip_surface_vertical [UI] (249B)
│   │         → Vertically flips a surface's pixel data in place by swapping rows from top and bottom.
│   │         (subtree shown above — 1 children)
│   ├── port_set_rect [UI] (91B)
│   │     → Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   └── palette_init [UI] (145B)
│         → Initializes the palette object
│         (subtree shown above — 3 children)
├── show_demographics_dialog [UI] (175B)
│     → Opens the Demographics dialog.
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── advisor_create_close_button [UI] (223B)
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   └── modal_dialog_run [UI] (283B)
│         → Runs a modal dialog loop
│         (subtree shown above — 4 children)
├── show_attitude_dialog [UI] (175B)
│     → Opens the Attitude Advisor dialog.
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── advisor_create_close_button [UI] (223B)
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   └── modal_dialog_run [UI] (283B)
│         → Runs a modal dialog loop
│         (subtree shown above — 4 children)
├── show_score_dialog [UI] (187B)
│     → Opens the civilisation score dialog with music.
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── advisor_create_close_button [UI] (223B)
│   ├── play_music_track [UI] (312B) *** STATE MUTATION ***
│   │     → Plays a specific music track (param_1) with optional restart (param_2)
│   │   └── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │         → Stops music playback and sets paused flag.
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   └── modal_dialog_run [UI] (283B)
│         → Runs a modal dialog loop
│         (subtree shown above — 4 children)
├── show_military_advisor_dialog [UI] (333B)
│     → Opens the military advisor dialog
│   ├── rect_get_height [UI] (28B)
│   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── set_rect_wh [UI] (48B)
│   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   ├── create_text_button [UI] (133B)
│   │     → Creates a text button control
│   │     (subtree shown above — 3 children)
│   ├── set_button_owner [UI] (45B)
│   │     → Sets the button's owner/parent reference
│   │     (subtree shown above — 1 children)
│   ├── set_button_handler [UI] (45B)
│   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │     (subtree shown above — 1 children)
│   ├── set_button_click_callback [UI] (33B)
│   │     → Sets the click callback function pointer for a button control.
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool
│   ├── rect_offset [FW] (34B)
│   │     → Wraps Win32 OffsetRect(param_1, param_2, param_3).
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│     → Stops music playback and sets paused flag.
│     (subtree shown above — 1 children)
├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│     (subtree shown above — 7 children)
├── redraw_map_all_players [UI] (124B)
│     → Redraws entire map for all active players.
│   └── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│         → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│         (subtree shown above — 6 children)
├── clear_game_active_flag [GL] (23B) *** STATE MUTATION ***
│     → Sets DAT_00628044 = 0, clearing the "game active" flag.
├── mp_set_password [MIXED] (614B) *** STATE MUTATION ***
│     → Implements the password set/change dialog for multiplayer
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   └── show_help_topic [UI] (34B)
│   │         → Opens a help topic with default parameters.
│   │         (subtree shown above — 1 children)
│   ├── unknown (mp_set_password_cleanup) [FW] (12B)
│   │     → Destructor stub for mp_set_password stack cleanup.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │         (subtree shown above — 1 children)
│   ├── unknown (SEH unwind) [FW] (14B)
│   │     → SEH unwind for mp_set_password.
│   ├── mp_update_password_flags [GL] (141B) *** STATE MUTATION ***
│   │     → Scans all 8 player password slots
│   ├── mp_encrypt_passwords [FW] (139B) *** STATE MUTATION ***
│   │     → Encrypts the password buffer using a simple rotation + XOR cipher
│   ├── mp_decrypt_passwords [FW] (144B) *** STATE MUTATION ***
│   │     → Decrypts the password buffer
│   ├── mp_prepare_password_dialog [UI] (137B)
│   │     → Prepares the password dialog by setting the title string from the civ name and a string resource ID.
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │   ├── FUN_0000994F [??]
│   │   ├── credits_invalidate [UI] (27B)
│   │   │     → Invalidates the credits display to trigger repaint.
│   │   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │   │     → Idle handler for throne room
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│   │   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │   │       └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   └── diff_engine_append_data [GL] (98B)
│   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   └── diff_engine_append_data [GL] (98B)
│   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── rle_encode (unnamed) [GL] (588B)
│   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   └── diff_engine_append_data [GL] (98B)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 15 children)
│   │   │   └── netmgr_build_packet [GL] (405B) *** STATE MUTATION ***
│   │   │       └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │   ├── unknown (pedia_invalidate_cache) [UI] (27B)
│   │   │     → Forces invalidation of the Civilopedia display cache.
│   │   └── draw_minimap_overlay [UI] (646B) *** STATE MUTATION ***
│   │         → Draws the minimap timer/turn indicator overlay
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── flush_display [UI] (21B)
│   │       ├── invalidate_region [UI] (180B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── fill_surface_from_rect [UI] (71B)
│   │       │     (subtree shown above — 3 children)
│   │       ├── blit_rect_to_rect [UI] (95B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── port_alloc [UI] (325B)
│   │       │     (subtree shown above — 10 children)
│   │       ├── port_set_rect_from_self [UI] (63B)
│   │       └── port_set_rect [UI] (91B)
│   ├── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│   │     → Resumes the turn timer if time remains and game is active.
│   │   ├── FUN_0000994F [??]
│   │   ├── credits_invalidate [UI] (27B)
│   │   │     → Invalidates the credits display to trigger repaint.
│   │   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │   │     → Idle handler for throne room
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   └── unknown (pedia_invalidate_cache) [UI] (27B)
│   │         → Forces invalidation of the Civilopedia display cache.
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_show_modal [UI] (999B)
│   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │     (subtree shown above — 11 children)
│   ├── popup_parse_text_file [UI] (2287B)
│   │     → Parses a game text file section to configure and populate a popup dialog
│   │   ├── mp_format_template_string [UI] (504B)
│   │   │     → Template string formatter
│   │   ├── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│   │   │     → Opens a popup dialog with specified parameters (title, position, dimensions, flags)
│   │   │     (subtree shown above — 8 children)
│   │   ├── popup_add_edit_field [UI] (412B)
│   │   │     → Adds a text edit field to a popup dialog
│   │   ├── popup_set_field_38 [UI] (33B)
│   │   │     → Sets popup dialog field at this+0x38 to param_1
│   │   ├── popup_set_page_layout [UI] (91B)
│   │   │     → Sets page layout parameters for the current page: column offset (this+0x4C[page*4]) and secondary parameter (this+0x1...
│   │   │   └── popup_set_radio_column_count [UI] (126B)
│   │   │       ├── get_font_height [UI] (28B)
│   │   │       └── popup_get_line_height [UI] (78B)
│   │   │             (subtree shown above — 1 children)
│   │   ├── popup_set_title [UI] (86B)
│   │   │     → Sets the popup dialog title string
│   │   ├── popup_set_scaled_width [UI] (99B)
│   │   │     → Sets the popup dialog width (this+0x11C) with optional resolution scaling
│   │   ├── popup_set_radio_selected [UI] (76B)
│   │   │     → Sets or clears the "selected" flag (bit 0) on a radio option identified by param_1
│   │   │   └── popup_find_radio_option_by_id [UI] (101B)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── popup_get_button_width [UI] (32B)
│   │   ├── popup_add_radio_checked [UI] (71B)
│   │   │     → Adds a radio option with the "initially checked" (bit 2) flag
│   │   │   └── popup_add_radio_option [UI] (566B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── popup_add_text_input [UI] (566B)
│   │   │     → Adds a text input/edit field to the popup dialog
│   │   │   └── measure_text_height [UI] (42B)
│   │   │         (subtree shown above — 1 children)
│   │   └── popup_add_action_button_label [UI] (119B)
│   │         → Adds an action button label string to the popup dialog
│   └── _strcpy_thunk [FW] (7B)
│         → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── show_scenario_editor [UI] (89B)
│     → Entry point for showing the scenario editor
│   ├── create_editor_object [FW] (498B)
│   │     → Constructor for the tech editor object
│   │     (subtree shown above — 1 children)
│   ├── open_scenario_editor [UI] (2171B) *** STATE MUTATION ***
│   │     → Opens and runs the scenario editor
│   │   ├── set_callback_0x44 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x44.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── set_editor_font [UI] (93B)
│   │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_combo_selection [UI] (43B)
│   │   │     → Sets the selected index of a combo box.
│   │   │     (subtree shown above — 1 children)
│   │   ├── load_rules_to_editor [UI] (966B) *** STATE MUTATION ***
│   │   │     → Loads game rules data into scenario editor buffers
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   ├── update_editor_controls_from_game [UI] (269B) *** STATE MUTATION ***
│   │   │     → Updates scenario editor UI controls from the game data buffers
│   │   │   ├── get_combo_selection_id [UI] (28B)
│   │   │   ├── set_edit_text [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_combo_selection [UI] (43B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── create_editor_dropdown [UI] (1084B) *** STATE MUTATION ***
│   │   │     → Creates a dropdown/listbox control in the scenario editor
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_combo_control [UI] (101B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_combo_data_source [UI] (48B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── add_combo_item [UI] (49B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_combo_callback [UI] (33B)
│   │   ├── create_editor_textfield [UI] (215B) *** STATE MUTATION ***
│   │   │     → Creates a text input field in the scenario editor at a position determined by param_1.
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_edit_control [UI] (130B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   └── set_edit_max_chars [UI] (43B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │     → Gets scrollbar width by calling FUN_00407f90.
│   │   │     (subtree shown above — 1 children)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── load_gif_file [UI] (1353B)
│   │   │     → Loads a GIF image from a file
│   │   │     (subtree shown above — 7 children)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │     (subtree shown above — 4 children)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │         (subtree shown above — 3 children)
│   ├── destroy_bitmap_wrapper [FW] (12B)
│   │     → Cleanup calling FUN_004183d0 (bitmap destructor).
│   ├── unknown (SEH epilogue) [FW] (14B)
│   │     → SEH epilogue.
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│     → Saves CIV2.DAT preferences file
├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│     → Starts a diplomacy or chat session
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── civ_has_active_wonder [GL] (142B)
│   │     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2)
│   │     (subtree shown above — 1 children)
│   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │     → Plays a sound effect by ID
│   │   ├── flush_display [UI] (21B)
│   │   │     → Flushes the display buffer by calling FUN_005bbbce.
│   │   └── rng_range [GL] (113B) *** STATE MUTATION ***
│   │         → Returns a random integer in the range [param_1, param_2]
│   │       └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│   ├── chatwin_get_text_length [UI] (37B)
│   │     → Gets text length from chat edit control via Windows message.
│   │   └── FUN_00002F47 [??]
│   ├── parleywin_build_title [UI] (324B)
│   │     → Builds the title string for the parley window
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── display_improvement [UI] (33B)
│   │   │     → Adds an improvement/government icon to the text buffer.
│   │   ├── calc_attitude [GL] (178B)
│   │   │     → Converts a raw attitude value (0-100) into an attitude category (0-8)
│   │   └── get_civ_people_name [GL] (145B)
│   │         → Returns the people name for a civilization (e.g., "Roman")
│   ├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION ***
│   │     → Sets the negotiation state based on the current offer type (DAT_0067a9b0)
│   │   ├── pedia_clear_selection [UI] (47B)
│   │   │     → Clears the hypertext selection state and invalidates the window.
│   │   │   └── FUN_00008B00 [??]
│   │   ├── pedia_set_selection [UI] (47B)
│   │   │     → Sets the hypertext selection state and invalidates the window.
│   │   │   └── FUN_00008B00 [??]
│   │   ├── parley_add_dialog_panel [UI] (26152B) *** STATE MUTATION ***
│   │   │     → Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── surface_fill_rect_color [UI] (63B)
│   │   │   │   └── draw_rect_outline [UI] (128B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── create_text_button [UI] (133B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_button_click_callback [UI] (33B)
│   │   │   ├── set_checkbox_callback [UI] (33B)
│   │   │   ├── set_checkbox_value [UI] (33B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   ├── create_edit_control [UI] (130B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── set_edit_max_chars [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_control_callback [UI] (33B)
│   │   │   ├── disable_civ_slot [UI] (133B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (set selected item) [UI] (33B) *** STATE MUTATION ***
│   │   │   ├── pedia_setup_list_panel [UI] (1602B) *** STATE MUTATION ***
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_draw_list_panel [UI] (1333B) *** STATE MUTATION ***
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── set_scrollbar [UI] (64B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │         (cycle — already in call path)
│   │   │   ├── init_unit_listbox [UI] (899B) *** STATE MUTATION ***
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── paint_unit_listbox [UI] (1841B) *** STATE MUTATION ***
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── populate_unit_listbox [UI] (1102B) *** STATE MUTATION ***
│   │   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── populate_unit_listbox [UI] (1102B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── set_scrollbar [UI] (64B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   ├── create_civ_listbox [UI] (1123B) *** STATE MUTATION ***
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── paint_civ_listbox [UI] (1230B) *** STATE MUTATION ***
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   ├── draw_best_city_sprite [UI] (484B)
│   │   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   │   └── get_active_control [UI] (21B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── set_scrollbar [UI] (64B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── parley_cleanup_side_controls [UI] (1486B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── parleywin_paint_border_strip [UI] (226B)
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── widget_button_dtor [UI] (57B)
│   │   │   │   ├── widget_listbox_dtor [UI] (57B)
│   │   │   │   ├── widget_checkbox_dtor [UI] (57B)
│   │   │   │   ├── widget_scrollbar_dtor [UI] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── widget_dropdown_dtor [UI] (57B)
│   │   │   ├── widget_focus_hwnd [UI] (50B)
│   │   │   │   └── unknown (set focus) [UI] (26B)
│   │   │   ├── widget_create_editbox [UI] (134B)
│   │   │   │   ├── FUN_00002740 [??]
│   │   │   │   ├── FUN_00002D7F [??]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── parley_build_packet [GL] (990B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   └── parley_serialize_offer [GL] (1024B) *** STATE MUTATION ***
│   │   │   │       └── get_edit_text [UI] (43B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── parley_build_description [UI] (2892B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION ***
│   │   │   │   │   └── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   │         (subtree shown above — 4 children)
│   │   │   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION ***
│   │   │   │   │   └── find_city_by_id [GL] (128B)
│   │   │   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION ***
│   │   │   │   │   └── get_civ_people_name [GL] (145B)
│   │   │   │   └── parley_describe_treaty [UI] (417B) *** STATE MUTATION ***
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── listbox_create_window [UI] (167B) *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000C035 [??]
│   │   │   │   ├── FUN_0000C0F0 [??]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── listbox_mark_dirty [UI] (32B)
│   │   │   ├── scrollbar_init [UI] (93B)
│   │   │   ├── scrollbar_create_window [UI] (207B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── scrollbar_set_position [UI] (33B)
│   │   │   ├── scrollbar_set_range [UI] (33B)
│   │   │   ├── city_list_create_panel [UI] (849B) *** STATE MUTATION ***
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── city_list_draw [UI] (1721B) *** STATE MUTATION ***
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   │   ├── city_list_draw_city_sprite [UI] (239B)
│   │   │   │   │   ├── city_list_populate [UI] (1138B) *** STATE MUTATION ***
│   │   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   │   └── get_active_control [UI] (21B)
│   │   │   │   ├── city_list_populate [UI] (1138B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── set_scrollbar [UI] (64B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   └── set_active_control [UI] (38B)
│   │         → Sets DAT_00637ea4 to param_1, returns old value.
│   ├── widget_set_cursor_pos [UI] (43B)
│   │     → Sets the cursor position in an edit box by sending a message to its HWND.
│   │   └── FUN_00002F0D [??]
│   ├── widget_get_text_length [UI] (37B)
│   │     → Returns the text length of an edit box widget.
│   │   └── unknown (get_text_end_pos) [UI] (76B)
│   │         → Gets position of last character: line count - 1, gets line index, adds line length.
│   │       ├── FUN_00002E31 [??]
│   │       ├── FUN_00002E9C [??]
│   │       └── FUN_00002EC1 [??]
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   ├── get_active_control [UI] (21B)
│   │     → Returns DAT_00637ea4 (the active control handle).
│   └── set_active_control [UI] (38B)
│         → Sets DAT_00637ea4 to param_1, returns old value.
├── show_improvement_editor [UI] (89B)
│     → Entry point for showing the improvement editor
│   ├── create_editor_object [FW] (498B)
│   │     → Constructor for the tech editor object
│   │     (subtree shown above — 1 children)
│   ├── editor_init [UI] (2205B) *** STATE MUTATION ***
│   │     → Full initialization of the improvement editor window
│   │   ├── set_callback_0x44 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x44.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── set_editor_font [UI] (93B)
│   │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_combo_selection [UI] (43B)
│   │   │     → Sets the selected index of a combo box.
│   │   │     (subtree shown above — 1 children)
│   │   ├── editor_load_improvements [UI] (234B) *** STATE MUTATION ***
│   │   │     → Loads improvement data from the game's internal tables into the editor's working copies
│   │   ├── editor_update_controls [UI] (332B)
│   │   │     → Updates editor dialog controls (edit fields and combo boxes) to reflect the currently selected improvement's properties.
│   │   │   ├── get_combo_selection_id [UI] (28B)
│   │   │   ├── set_edit_text [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_combo_selection [UI] (43B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── editor_handle_listbox [UI] (342B) *** STATE MUTATION ***
│   │   │     → Handles listbox selection changes in the improvement editor
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_parent_window_handle [UI] (28B)
│   │   │   ├── get_combo_selection [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_combo_selection [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── editor_update_controls [UI] (332B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── editor_read_controls [UI] (437B) *** STATE MUTATION ***
│   │   │   │   ├── get_combo_selection_id [UI] (28B)
│   │   │   │   ├── get_edit_text [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_combo_selection [UI] (37B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── unknown — editor repaint wrapper [UI] (27B)
│   │   │   │   └── editor_paint [UI] (1396B)
│   │   │   │       ├── end_paint [UI] (32B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── text_begin [UI] (29B)
│   │   │   │       ├── text_add_string [UI] (33B)
│   │   │   │       ├── text_add_label_id [UI] (33B)
│   │   │   │       ├── fill_surface_from_rect [UI] (71B)
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       ├── text_add_number [UI] (33B)
│   │   │   │       ├── get_editor_color [UI] (28B)
│   │   │   │       ├── show_help_topic [UI] (34B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── draw_border_frame [UI] (588B)
│   │   │   │       │     (subtree shown above — 6 children)
│   │   │   │       ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 15 children)
│   │   │   │       ├── draw_rect_outline_wh [UI] (152B)
│   │   │   │       ├── fill_rect_xywh [UI] (63B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── blit_rect_to_rect [UI] (95B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │       ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │       ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │       ├── draw_text_with_shadow [UI] (205B)
│   │   │   │       ├── draw_text_centered [UI] (139B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── scale_table_build_primary [UI] (657B)
│   │   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   └── unknown (set popup parent B) [UI] (24B)
│   │   ├── editor_create_combo_control [UI] (551B) *** STATE MUTATION ***
│   │   │     → Creates a combo box control in the editor dialog, populating it with either improvement names or tech names depending...
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_combo_control [UI] (101B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_combo_data_source [UI] (48B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── add_combo_item [UI] (49B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_combo_callback [UI] (33B)
│   │   ├── editor_create_edit_control [UI] (244B) *** STATE MUTATION ***
│   │   │     → Creates a numeric edit control in the editor dialog.
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_edit_control [UI] (130B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── set_edit_max_chars [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_control_callback [UI] (33B)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── load_gif_file [UI] (1353B)
│   │   │     → Loads a GIF image from a file
│   │   │     (subtree shown above — 7 children)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │     (subtree shown above — 4 children)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │         (subtree shown above — 3 children)
│   ├── show_improvement_editor cleanup [FW] (12B)
│   │     → Cleanup — destroys font/resource context and restores SEH.
│   ├── FUN_004DAA51 [??]
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── load_game_handler [MIXED] (1023B) *** STATE MUTATION ***
│     → Handles loading a saved game
│   ├── FUN_0000994F [??]
│   ├── setup_map_status_bar [UI] (304B)
│   │     → Sets up the map window status bar content: player name, language indicator, and map view filter options.
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_bold [UI] (29B)
│   │   │     → Begins bold text mode in the global text buffer.
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_status_bar_text [UI] (33B)
│   │   │     → Sets the status bar text to param_1 using the global string buffer.
│   │   └── unknown (dialog_set_title_and_redraw) [UI] (139B)
│   │         → Sets the dialog title string (at offset 0x134, max 0x83 chars) then redraws the title bar and invalidates the rect.
│   │       ├── invalidate_region [UI] (180B)
│   │       │     (subtree shown above — 2 children)
│   │       └── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │             (subtree shown above — 15 children)
│   ├── initialize_map_view [UI] (889B) *** STATE MUTATION ***
│   │     → Full initialization of a map view window: sets initial zoom/filter, creates the view bitmap surface, registers all ca...
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B)
│   │   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_callback_paint [UI] (45B)
│   │   │     → Sets the paint callback handler on the window object
│   │   ├── set_callback_resize [UI] (45B)
│   │   │     → Sets the resize callback handler on the window object at this+0x18.
│   │   ├── set_callback_0x30 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x30.
│   │   ├── set_callback_0x40 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x40.
│   │   ├── set_callback_0x44 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x44.
│   │   ├── set_scroll_amounts [UI] (45B)
│   │   │     → Sets horizontal and vertical scroll amounts on the window object.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── setup_main_view_rect [UI] (153B)
│   │   │     → Calculates and sets the main map view rectangle dimensions, accounting for minimap panel offset.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── get_window_width [UI] (37B)
│   │   │   │   └── get_client_width [UI] (56B)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   └── get_view_height [UI] (37B)
│   │   │       └── get_client_height [UI] (56B)
│   │   ├── setup_map_status_bar [UI] (304B)
│   │   │     → Sets up the map window status bar content: player name, language indicator, and map view filter options.
│   │   │     (subtree shown above — 8 children)
│   │   ├── init_map_viewport [UI] (224B) *** STATE MUTATION ***
│   │   │     → Initializes the map viewport object
│   │   ├── dialog_add_button [UI] (192B)
│   │   │     → Adds a button to a dialog (max 6 buttons)
│   │   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── widget_get_height [UI] (34B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │         (subtree shown above — 2 children)
│   ├── scenario_player_selection [GL] (1483B) *** STATE MUTATION ***
│   │     → Handles player selection for scenarios
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── mapgen_set_dialog_type [UI] (42B)
│   │   │     → Sets up a dialog/progress indicator for map generation with the given type parameter.
│   │   │   └── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 8 children)
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │   └── open_dialog_extended [UI] (56B)
│   │   │       └── popup_parse_text_file [UI] (2287B)
│   │   │             (subtree shown above — 12 children)
│   │   ├── mp_list_invalidate_item [UI] (108B)
│   │   │     → Invalidates a specific item in a multiplayer list control by setting its dirty flag and triggering a redraw.
│   │   │   └── FUN_0000ABC7 [??]
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     → Returns the noun name for a civilization (e.g., "Romans")
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── mp_handle_player_turn [MIXED] (192B) *** STATE MUTATION ***
│   │   │     → Handles player turn authentication in multiplayer
│   │   │   ├── mp_check_password_or_set [GL] (90B) *** STATE MUTATION ***
│   │   │   │   ├── mp_set_password [MIXED] (614B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 8 children)
│   │   │   │   └── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 6 children)
│   │   │   └── mp_verify_password [UI] (341B) *** STATE MUTATION ***
│   │   │       ├── unknown (dialog show single param) [UI] (33B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── mp_prepare_password_dialog [UI] (137B)
│   │   │       ├── popup_dialog_create [UI] (93B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── popup_show_modal [UI] (999B)
│   │   │       │     (subtree shown above — 11 children)
│   │   │       └── popup_parse_text_file [UI] (2287B)
│   │   │             (subtree shown above — 12 children)
│   │   ├── mp_build_label_string [UI] (159B)
│   │   │     → Builds a label string for multiplayer dialogs
│   │   ├── popup_set_position_fields [UI] (42B)
│   │   │     → Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2
│   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │     → Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1
│   │   ├── popup_set_radio_selected [UI] (76B)
│   │   │     → Sets or clears the "selected" flag (bit 0) on a radio option identified by param_1
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID
│   │   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │   └── popup_find_button_by_id [UI] (100B)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_show_modal [UI] (999B)
│   │   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │   │     (subtree shown above — 11 children)
│   │   └── popup_parse_text_file [UI] (2287B)
│   │         → Parses a game text file section to configure and populate a popup dialog
│   │         (subtree shown above — 12 children)
│   ├── unknown (manage window) [UI] (37B)
│   │     → Manages a window by calling manage_window_C5DA with the handle from in_ECX+8.
│   │   └── FUN_0000C5DA [??]
│   ├── credits_close [UI] (84B)
│   │     → Closes the credits display window
│   │   ├── flush_at_origin [UI] (34B)
│   │   │     → Flushes the display at coordinates (0, 0).
│   │   │   └── port_alloc_rect [UI] (58B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── dialog_cleanup [UI] (38B)
│   │   │     → Cleans up a dialog — destroys buttons then destroys the window.
│   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── swap_dc [UI] (43B)
│   │   │   │       └── FUN_0000C0AB [??]
│   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   └── surface_list_clear [UI] (75B)
│   │         → Iterates the surface list and removes each node.
│   ├── init_cd_music [UI] (190B) *** STATE MUTATION ***
│   │     → Initializes CD music playback system
│   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │     → Stops music playback and sets paused flag.
│   ├── resume_music [UI] (85B) *** STATE MUTATION ***
│   │     → Resumes music if enabled
│   │   ├── select_random_music_track [UI] (388B) *** STATE MUTATION ***
│   │   │     → Selects a random music track
│   │   └── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │         → Stops music playback and sets paused flag.
│   ├── init_game_display [UI] (51B)
│   │     → Initializes the game display
│   │   ├── flush_display [UI] (21B)
│   │   │     → Flushes the display buffer by calling FUN_005bbbce.
│   │   └── init_palette_system [UI] (21B)
│   │         → Initializes the palette system.
│   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │     → Starts human turn if not already active or if param forces it
│   │   ├── center_all_map_views [UI] (116B)
│   │   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   │   └── center_map_on_cursor [UI] (56B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │   │     → Updates all menu item enabled/disabled states based on current game state
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   └── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   └── is_wonder_obsolete [GL] (120B)
│   │   │   │       └── civ_has_tech [GL] (181B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── can_build_unit_type [GL] (1095B)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── update_menu_item_label [UI] (89B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── mp_format_template_string [UI] (504B)
│   │   │   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   │   └── menu_toggle_item_checked [UI] (103B)
│   │   │   │   └── menu_update_subitem_text [UI] (155B)
│   │   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │       ├── unknown (pipe-to-tab converter) [UI] (73B)
│   │   │   │       └── menu_change_item_text [UI] (50B)
│   │   │   ├── is_tile_worked [GL] (62B)
│   │   │   ├── menu_populate [UI] (686B) *** STATE MUTATION ***
│   │   │   │   ├── menu_set_host_window [UI] (80B) *** STATE MUTATION ***
│   │   │   │   │   └── menu_setup_parent [UI] (59B)
│   │   │   │   ├── menu_toggle_item_checked [UI] (103B)
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── menu_toggle_item_grayed [UI] (101B)
│   │   │   │   │   ├── menu_get_visible_index [UI] (105B)
│   │   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   │   ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │   │   └── menu_enable_item [UI] (50B)
│   │   │   │   ├── menu_create_header [UI] (41B)
│   │   │   │   │   └── build_menu_from_string [UI] (376B)
│   │   │   │   ├── menu_insert_item [UI] (50B)
│   │   │   │   │   └── FUN_0000128C [??]
│   │   │   │   ├── menu_delete_item [UI] (46B)
│   │   │   │   │   └── delete_menu_item [UI] (102B)
│   │   │   │   └── menu_update_host [UI] (52B)
│   │   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │   │       └── redraw_menubar [UI] (29B)
│   │   │   ├── menu_set_subitem_hidden [UI] (129B)
│   │   │   │   └── menu_find_subitem_by_id [UI] (136B)
│   │   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── menu_set_all_subitems_checked [UI] (111B)
│   │   │   │   ├── menu_find_item_by_id [UI] (98B)
│   │   │   │   └── menu_set_subitem_checked [UI] (194B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   └── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │         → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │         (subtree shown above — 7 children)
│   ├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
│   │     → Activates the current unit for player input
│   │   ├── center_all_map_views [UI] (116B)
│   │   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   │     (subtree shown above — 1 children)
│   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │   │   └── scroll_map_if_needed [UI] (404B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │   │     → Starts human turn if not already active or if param forces it
│   │   │     (subtree shown above — 3 children)
│   │   ├── select_next_unit [MIXED] (436B) *** STATE MUTATION ***
│   │   │     → Selects the next unit needing orders
│   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── cancel_goto_if_blocked [GL] (90B) *** STATE MUTATION ***
│   │   │   │   ├── cancel_goto_for_stack [GL] (192B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 7 children)
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │   └── update_map_tile [UI] (50B)
│   │   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │   │   └── update_map_radius1 [UI] (50B)
│   │   │   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION ***
│   │   │   │   │   ├── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION ***
│   │   │   │   │   └── rle_encode (unnamed) [GL] (588B)
│   │   │   │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │   │   │   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   │   ├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 12 children)
│   │   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │   │   │   │   └── check_join_war [GL] (595B) *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 18 children)
│   │   │   │       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 3 children)
│   │   │   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 19 children)
│   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── is_unit_ready_to_move [GL] (271B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_unit_moves_remaining [GL] (69B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   └── find_next_unit_needing_orders [GL] (629B) *** STATE MUTATION ***
│   │   │       ├── calc_movement_cost [GL] (94B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       └── is_unit_ready_to_move [GL] (271B)
│   │   │             (subtree shown above — 2 children)
│   │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │   │     → Updates all menu item enabled/disabled states based on current game state
│   │   │     (subtree shown above — 19 children)
│   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │     → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │     (subtree shown above — 7 children)
│   │   └── is_unit_ready_to_move [GL] (271B)
│   │         → Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │         (subtree shown above — 2 children)
│   ├── mp_handle_player_turn [MIXED] (192B) *** STATE MUTATION ***
│   │     → Handles player turn authentication in multiplayer
│   │     (subtree shown above — 2 children)
│   ├── parleywin_focus_negotiate [UI] (72B)
│   │     → Sets focus to the negotiation parley window object (DAT_0067a7f0), then closes.
│   │   ├── parleywin_close [MIXED] (432B) *** STATE MUTATION ***
│   │   │     → Closes the parley window
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │   │   └── FUN_0000C44D [??]
│   │   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── init_game_display [UI] (51B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── get_active_control [UI] (21B)
│   │   └── set_active_control [UI] (38B)
│   │         → Sets DAT_00637ea4 to param_1, returns old value.
│   ├── parleywin_focus_chat [UI] (72B)
│   │     → Sets focus to the chat parley window object (DAT_0068ac30), then closes.
│   │   ├── parleywin_close [MIXED] (432B) *** STATE MUTATION ***
│   │   │     → Closes the parley window
│   │   │     (subtree shown above — 8 children)
│   │   └── set_active_control [UI] (38B)
│   │         → Sets DAT_00637ea4 to param_1, returns old value.
│   ├── widget_set_size [UI] (43B)
│   │     → Sets a widget's size by calling FUN_005bc713 with the widget's window handle and param_1.
│   │   └── move_window_from_rect [UI] (80B)
│   │         → Moves and resizes a window to match a RECT structure
│   │       ├── rect_get_width [UI] (27B)
│   │       └── rect_get_height [UI] (28B)
│   ├── init_city_windows_layout [MIXED] (926B) *** STATE MUTATION ***
│   │     → Initializes the layout of all city windows
│   │   ├── FUN_0000994F [??]
│   │   ├── FUN_00009A49 [??]
│   │   ├── status_panel_calc_rect [UI] (255B) *** STATE MUTATION ***
│   │   │     → Calculates the bounding rectangle for the status panel, adjusting dimensions based on screen size, multiplayer mode, ...
│   │   │   ├── get_window_width [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_rect_wh [UI] (48B)
│   │   ├── get_window_width [UI] (37B)
│   │   │     → Returns the window width by calling FUN_005bc933 with the window handle from this+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── save_and_flush [UI] (41B)
│   │   │     → Saves the current rendering context and flushes display updates.
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── setup_main_view_rect [UI] (153B)
│   │   │     → Calculates and sets the main map view rectangle dimensions, accounting for minimap panel offset.
│   │   │     (subtree shown above — 4 children)
│   │   ├── get_view_height [UI] (37B)
│   │   │     → Returns the height of the current view window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (manage window) [UI] (37B)
│   │   │     → Manages a window by calling manage_window_C5DA with the handle from in_ECX+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── init_game_display [UI] (51B)
│   │   │     → Initializes the game display
│   │   │     (subtree shown above — 2 children)
│   │   ├── widget_set_size [UI] (43B)
│   │   │     → Sets a widget's size by calling FUN_005bc713 with the widget's window handle and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown — manage window [UI] (37B)
│   │   │     → Calls manage_window_C692 with the window handle from the object's field at offset 8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── calc_main_window_rect [UI] (139B) *** STATE MUTATION ***
│   │   │     → Calculates the main game window rectangle from the status bar position.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   └── get_view_height [UI] (37B)
│   │   │         (subtree shown above — 1 children)
│   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │         (subtree shown above — 2 children)
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │     (subtree shown above — 19 children)
│   ├── unknown — manage window [UI] (37B)
│   │     → Calls manage_window_C692 with the window handle from the object's field at offset 8.
│   │     (subtree shown above — 1 children)
│   ├── pedia_close_display [UI] (129B) *** STATE MUTATION ***
│   │     → Closes the Civilopedia display panel
│   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │     → Calls manage_window_C44D with the window handle at this+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │     → Retrieves the drawing context from this+8.
│   │   │     (subtree shown above — 1 children)
│   │   └── init_game_display [UI] (51B)
│   │         → Initializes the game display
│   │         (subtree shown above — 2 children)
│   ├── pedia_load_index_data [UI] (3281B)
│   │     → Loads all Civilopedia index data from the describe.txt file
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   └── pedia_sort_entries [UI] (305B)
│   │         → Bubble sorts the Civilopedia entry linked list alphabetically, also reordering parallel index arrays.
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │     (subtree shown above — 6 children)
│   ├── start_turn_timer [MIXED] (280B) *** STATE MUTATION ***
│   │     → Starts the turn timer — closes open windows, calculates remaining time, creates a 500ms repeating timer, sends MP not...
│   │   ├── FUN_0000994F [??]
│   │   ├── invalidate_region [UI] (180B)
│   │   │     → Invalidates a screen region
│   │   │     (subtree shown above — 2 children)
│   │   ├── credits_invalidate [UI] (27B)
│   │   │     → Invalidates the credits display to trigger repaint.
│   │   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │   │     → Idle handler for throne room
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── unknown (pedia_invalidate_cache) [UI] (27B)
│   │   │     → Forces invalidation of the Civilopedia display cache.
│   │   └── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │         → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │         (subtree shown above — 15 children)
│   ├── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│   │     → Resumes the turn timer if time remains and game is active.
│   │     (subtree shown above — 5 children)
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   ├── cdaudio_open [FW] (265B)
│   │     → Opens CD audio device, sets time format to track, gets number of tracks (DAT_006389e0).
│   ├── cdaudio_close [FW] (70B)
│   │     → Closes CD audio device
│   └── cdaudio_stop [FW] (50B)
│         → Stops CD audio playback (MCI_STOP).
├── show_game_options_dialog [MIXED] (705B) *** STATE MUTATION ***
│     → Shows the game options dialog with 11 checkboxes
│   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── unknown (dialog show with section) [UI] (37B)
│   │     → Opens a dialog/section by calling thunk_FUN_00419100 with DAT_006359d4 and the two parameters.
│   │   └── show_help_topic_ext [UI] (38B)
│   │         → Extended help topic opener with additional parameter.
│   │         (subtree shown above — 1 children)
│   ├── init_cd_music [UI] (190B) *** STATE MUTATION ***
│   │     → Initializes CD music playback system
│   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │     → Stops music playback and sets paused flag.
│   ├── resume_music [UI] (85B) *** STATE MUTATION ***
│   │     → Resumes music if enabled
│   │     (subtree shown above — 2 children)
│   ├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│   │     → Saves CIV2.DAT preferences file
│   ├── set_checkbox_state [UI] (36B)
│   │     → Sets a dialog checkbox state
│   │   └── FUN_0051D7D6 [??] (65B)
│   ├── FUN_0051D7BC [??] (26B)
│   ├── FUN_0051D817 [??] (32B)
│   ├── cdaudio_open [FW] (265B)
│   │     → Opens CD audio device, sets time format to track, gets number of tracks (DAT_006389e0).
│   ├── cdaudio_close [FW] (70B)
│   │     → Closes CD audio device
│   ├── cdaudio_stop [FW] (50B)
│   │     → Stops CD audio playback (MCI_STOP).
│   └── _strcat [FW] (224B)
│         → CRT strcat — finds end of dest string then copies source
├── show_graphic_options_dialog [MIXED] (423B) *** STATE MUTATION ***
│     → Shows graphic options dialog with 6 checkboxes for display settings (throne room, animated heralds, high-res maps, et...
│   ├── unknown (dialog show with section) [UI] (37B)
│   │     → Opens a dialog/section by calling thunk_FUN_00419100 with DAT_006359d4 and the two parameters.
│   │     (subtree shown above — 1 children)
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│   │     → Saves CIV2.DAT preferences file
│   ├── set_checkbox_state [UI] (36B)
│   │     → Sets a dialog checkbox state
│   │     (subtree shown above — 1 children)
│   ├── FUN_0051D7BC [??] (26B)
│   ├── FUN_0051D817 [??] (32B)
│   └── unknown [FW] (24B)
│         → Returns 1 (always true)
├── show_multiplayer_options_dialog [MIXED] (1020B) *** STATE MUTATION ***
│     → Shows multiplayer game options dialog
│   ├── show_dialog_message [UI] (43B)
│   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (subtree shown above — 1 children)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── unknown (dialog show with section) [UI] (37B)
│   │     → Opens a dialog/section by calling thunk_FUN_00419100 with DAT_006359d4 and the two parameters.
│   │     (subtree shown above — 1 children)
│   ├── mp_show_wait_dialog [UI] (45B)
│   │     → Shows a waiting dialog by calling thunk_FUN_0051d564 with 4 parameters and DAT_006359d4.
│   │     (subtree shown above — 1 children)
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │     → Central network message dispatcher
│   │     (subtree shown above — 18 children)
│   ├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│   │     → Saves CIV2.DAT preferences file
│   ├── clear_string [FW] (22B)
│   │     → Sets the first byte of a string to 0 (empty string).
│   ├── append_label_string [FW] (41B)
│   │     → Appends label string at index param_2 from the labels array to param_1.
│   ├── set_checkbox_state [UI] (36B)
│   │     → Sets a dialog checkbox state
│   │     (subtree shown above — 1 children)
│   ├── toggle_unit_movement_doubling [GL] (318B) *** STATE MUTATION ***
│   │     → Toggles unit movement point doubling for multiplayer
│   │   └── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │         → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │         (subtree shown above — 7 children)
│   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │     → Enqueues a multiplayer event message
│   │     (subtree shown above — 1 children)
│   ├── FUN_0051D7BC [??] (26B)
│   ├── FUN_0051D817 [??] (32B)
│   ├── _strcpy_thunk [FW] (7B)
│   │     → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
│   └── _strcat [FW] (224B)
│         → CRT strcat — finds end of dest string then copies source
├── show_message_options_dialog [MIXED] (785B) *** STATE MUTATION ***
│     → Shows message notification options dialog with 11 checkboxes controlling which game events generate notifications.
│   ├── unknown (dialog show with section) [UI] (37B)
│   │     → Opens a dialog/section by calling thunk_FUN_00419100 with DAT_006359d4 and the two parameters.
│   │     (subtree shown above — 1 children)
│   ├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│   │     → Saves CIV2.DAT preferences file
│   ├── FUN_0051D7BC [??] (26B)
│   ├── FUN_0051D7D6 [??] (65B)
│   └── FUN_0051D817 [??] (32B)
├── handle_quit_or_retire [MIXED] (718B) *** STATE MUTATION ***
│     → Handles the quit or retire game action
│   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── show_dialog_message [UI] (43B)
│   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (subtree shown above — 1 children)
│   ├── get_civ_name [UI] (28B)
│   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │     (subtree shown above — 1 children)
│   ├── center_all_map_views [UI] (116B)
│   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │     (subtree shown above — 1 children)
│   ├── render_power_graph [UI] (2183B)
│   │     → Renders the Power Graph report
│   │     (subtree shown above — 24 children)
│   ├── show_attitude_dialog [UI] (175B)
│   │     → Opens the Attitude Advisor dialog.
│   │     (subtree shown above — 4 children)
│   ├── show_score_dialog [UI] (187B)
│   │     → Opens the civilisation score dialog with music.
│   │     (subtree shown above — 5 children)
│   ├── submit_hall_of_fame_entry [MIXED] (601B) *** STATE MUTATION ***
│   │     → Constructs a new Hall of Fame entry from current game state, inserts it into the sorted list, saves to file, and show...
│   │   ├── show_hall_of_fame_dialog [UI] (544B)
│   │   │     → Opens the Hall of Fame dialog
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_text_button [UI] (133B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_button_owner [UI] (45B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_button_handler [UI] (45B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_button_click_callback [UI] (33B)
│   │   │   ├── advisor_create_close_button [UI] (223B)
│   │   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── modal_dialog_run [UI] (283B)
│   │   │         (subtree shown above — 4 children)
│   │   ├── civ_calc_total_population [GL] (193B)
│   │   │     → Sums population points across all cities of a given civ
│   │   │   └── city_calc_population_points [GL] (103B)
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     → Returns the noun name for a civilization (e.g., "Romans")
│   │   └── get_civ_people_name [GL] (145B)
│   │         → Returns the people name for a civilization (e.g., "Roman")
│   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │     → Stops music playback and sets paused flag.
│   ├── clear_game_active_flag [GL] (23B) *** STATE MUTATION ***
│   │     → Sets DAT_00628044 = 0, clearing the "game active" flag.
│   ├── get_civ_noun_name [GL] (145B)
│   │     → Returns the noun name for a civilization (e.g., "Romans")
│   ├── get_civ_leader_title [GL] (210B)
│   │     → Returns the leader title for a civilization based on civ type and government
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman")
│   ├── parleywin_focus_negotiate [UI] (72B)
│   │     → Sets focus to the negotiation parley window object (DAT_0067a7f0), then closes.
│   │     (subtree shown above — 2 children)
│   ├── parleywin_focus_chat [UI] (72B)
│   │     → Sets focus to the chat parley window object (DAT_0068ac30), then closes.
│   │     (subtree shown above — 2 children)
│   ├── kill_or_retire_civ [GL] (2918B) *** STATE MUTATION ***
│   │     → Removes a civilization from the game (kill or retire)
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── remove_trade_route [GL] (199B) *** STATE MUTATION ***
│   │   │     → Removes a trade route at index param_2 from city param_1 by shifting subsequent trade route entries down and decremen...
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │   │     → Stops music playback and sets paused flag.
│   │   ├── redraw_map_all_players [UI] (124B)
│   │   │     → Redraws entire map for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     → The main network polling function
│   │   ├── reset_spaceship [GL] (187B) *** STATE MUTATION ***
│   │   │     → Resets spaceship data for civ param_1 to all zeros.
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │     → Executes a spy/diplomat's action in an enemy city — handles the chance of being caught (based on veteran status and w...
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── get_tile_continent_if_land [GL] (72B)
│   │   │   │       ├── is_tile_ocean [GL] (57B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       └── get_tile_continent [GL] (39B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │   │     (cycle — already in call path)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   └── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │   │       ├── is_tile_valid [GL] (80B)
│   │   │   │       ├── show_dialog_message [UI] (43B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 18 children)
│   │   │   │       ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │       ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       ├── find_first_unit_at [GL] (186B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   └── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│   │   │   │       ├── FUN_0000C494 [??]
│   │   │   │       ├── is_tile_valid [GL] (80B)
│   │   │   │       ├── show_dialog_message [UI] (43B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 18 children)
│   │   │   │       ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │       ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │       ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │   │       ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │   │   │       └── is_tile_ocean [GL] (57B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │       └── calc_unit_movement_points [GL] (516B)
│   │   │             (subtree shown above — 4 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     → Returns the next unit in the stack linked list, or -1 if at end
│   │   │     (subtree shown above — 1 children)
│   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │   │     (subtree shown above — 3 children)
│   │   ├── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│   │   │     → Safely deletes a unit, handling the case where it's a ship carrying units
│   │   │     (subtree shown above — 10 children)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_city_radius_owner [GL] (42B)
│   │   │     → Returns upper 3 bits of byte 2 (>> 5) = city radius owner.
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── get_tile_fertility [GL] (42B)
│   │   │     → Returns lower 4 bits of byte 5 (fertility value 0-15).
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── get_tile_controller [GL] (72B)
│   │   │     → Returns the controlling civ at a tile — city owner first, then unit owner.
│   │   │     (subtree shown above — 2 children)
│   │   ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │     → Sets or clears improvement bits on a tile
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │     → Sets or clears visibility bits (byte 4) on a tile
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_tile_fertility [GL] (305B) *** STATE MUTATION ***
│   │   │     → Sets the fertility value (lower 4 bits of byte 5)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION ***
│   │   │     → Sets the city-radius owner for a tile (top 3 bits of byte 2)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │     → Begins a batched map update session for multiplayer
│   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │         → Ends a batched map update
│   │         (subtree shown above — 2 children)
│   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│         → Enqueues a multiplayer event message
│         (subtree shown above — 1 children)
├── show_govt_council [UI] (134B)
│     → Shows the government council (full advisor council with video)
│   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │     → Stops music playback and sets paused flag.
│   ├── resume_music [UI] (85B) *** STATE MUTATION ***
│   │     → Resumes music if enabled
│   │     (subtree shown above — 2 children)
│   ├── unknown (govt_council_destruct_thunk) [FW] (12B)
│   │     → Thunk to govt_council destructor.
│   │   └── govt_council_destruct [UI] (198B)
│   │         → Destructs the government council dialog
│   ├── unknown (seh_epilog_govt) [FW] (14B)
│   │     → SEH epilogue.
│   ├── govt_council_construct [UI] (293B)
│   │     → Constructs the government council dialog
│   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │   │     → Initializes the sprite surface manager object
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (pedia object initializer) [UI] (34B)
│   │   │     → Zeroes out the first field of an object via ECX (this pointer)
│   │   └── popup_dialog_create [UI] (93B)
│   │         → Creates a new popup dialog object
│   │         (subtree shown above — 2 children)
│   ├── council_video_init [UI] (1672B)
│   │     → Initializes the government council video system
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │     → Stores param_1 at this+4 and calls FUN_00450440 to display it.
│   │   │   └── unknown (update pedia display surface) [UI] (49B)
│   │   │       └── select_palette [UI] (57B)
│   │   ├── pedia_clear_selection [UI] (47B)
│   │   │     → Clears the hypertext selection state and invalidates the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (set_font_size) [UI] (43B)
│   │   │     → Sets font size via internal object.
│   │   │     (subtree shown above — 1 children)
│   │   ├── council_draw_panels [UI] (1307B)
│   │   │     → Draws the council panel borders, frames, title text with shadow
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── draw_3d_border [UI] (167B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   ├── council_create_buttons [UI] (816B)
│   │   │     → Creates 6 buttons for the advisor council UI — 5 advisor buttons and 1 close/ok button
│   │   │   ├── set_button_click_callback [UI] (33B)
│   │   │   └── intel_create_button [UI] (68B)
│   │   │       └── create_text_button [UI] (133B)
│   │   │             (subtree shown above — 3 children)
│   │   ├── council_parse_advisor_script [UI] (907B)
│   │   │     → Parses an advisor script from a game text file
│   │   │   └── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── council_load_all_videos [UI] (420B)
│   │   │     → Loads all advisor video clips
│   │   ├── get_advisor_recommendation [GL] (177B)
│   │   │     → Gets an advisor recommendation for a given civ and advisor type
│   │   │   ├── ai_assess_military_posture [AI] (1066B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── ai_assess_city_defense [AI] (753B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── ai_assess_economy [AI] (1071B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── count_worker_tiles_with_status [GL] (87B)
│   │   │   │   └── calc_building_upkeep_cost [GL] (305B)
│   │   │   │       ├── civ_has_active_wonder [GL] (142B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       └── civ_has_tech [GL] (181B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── ai_assess_diplomacy [AI] (724B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   └── ai_assess_tax_rate [AI] (770B) *** STATE MUTATION ***
│   │   │       ├── has_building [GL] (122B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       └── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │           ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION ***
│   │   │           ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION ***
│   │   │           ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION ***
│   │   │           └── recalc_city_all [GL] (76B) *** STATE MUTATION ***
│   │   ├── show_input_dialog_int [UI] (41B)
│   │   │     → Shows a numeric input dialog using the standard popup system with DAT_006359d4.
│   │   │   └── FUN_0051D75D [??] (95B)
│   │   ├── get_civ_era_level [GL] (136B)
│   │   │     → Returns the era level for a civ: 2 if has Navigation+Astronomy (Modern), 1 if has Railroad+Industrialization (Industr...
│   │   │   └── civ_has_tech [GL] (181B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│   │   │     → Opens a popup dialog with specified parameters (title, position, dimensions, flags)
│   │   │     (subtree shown above — 8 children)
│   │   ├── create_offscreen_surface_b [UI] (119B)
│   │   │     → Creates an offscreen surface variant with 8 parameters (includes parent window).
│   │   │     (subtree shown above — 5 children)
│   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │         (subtree shown above — 2 children)
│   ├── council_video_run [UI] (388B)
│   │     → Runs the government council video playback loop
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── control_invalidate [UI] (65B)
│   │   │     → Invalidates a UI control for repainting
│   │   │     (subtree shown above — 2 children)
│   │   ├── init_palette_system [UI] (21B)
│   │   │     → Initializes the palette system.
│   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │     → Stores param_1 at this+4 and calls FUN_00450440 to display it.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │     → Calls manage_window_C44D with the window handle at this+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │   │     → Calls a GDI function on the window at this+8 with coordinates (0,0).
│   │   │   └── FUN_0000C763 [??]
│   │   ├── fade_out_palette [UI] (153B) *** STATE MUTATION ***
│   │   │     → Performs a palette fade-out effect over 10 steps with animation delays.
│   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── apply_palette_to_surfaces [UI] (241B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (realize all palettes) [UI] (151B) *** STATE MUTATION ***
│   │   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── init_palette_system [UI] (21B)
│   │   │   │   └── port_load_tga_file [UI] (171B)
│   │   │   ├── restore_palette_entries [UI] (135B) *** STATE MUTATION ***
│   │   │   │   └── palette_apply [UI] (90B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── unknown (realize all palettes) [UI] (151B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── palette_setup_crossfade [UI] (261B)
│   │   │   │   └── unknown (palette apply with range) [UI] (60B)
│   │   │   │       ├── palette_apply [UI] (90B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       └── FUN_005DE984 [??]
│   │   │   ├── palette_restore_from_crossfade [UI] (150B)
│   │   │   │   └── palette_set_entries [UI] (142B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   └── palette_crossfade_step [UI] (491B)
│   │   │       ├── FUN_0000EA62 [??]
│   │   │       └── unknown (palette_set_entry_raw) [UI] (55B)
│   │   ├── fade_in_palette [UI] (153B) *** STATE MUTATION ***
│   │   │     → Performs a palette fade-in effect over 10 steps.
│   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── unknown (realize palettes) [UI] (151B) *** STATE MUTATION ***
│   │   │   │   ├── init_palette_system [UI] (21B)
│   │   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── restore_palette_entries [UI] (135B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (realize all palettes) [UI] (151B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── palette_setup_crossfade [UI] (261B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── palette_restore_from_crossfade [UI] (150B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── palette_crossfade_step [UI] (491B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── council_draw_panels [UI] (1307B)
│   │   │     → Draws the council panel borders, frames, title text with shadow
│   │   │     (subtree shown above — 10 children)
│   │   ├── video_set_position [UI] (47B)
│   │   │     → Sets the video playback position by calling FUN_005bc4a1 with the video handle from ECX+8.
│   │   │   └── move_window_to [UI] (100B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       └── rect_get_height [UI] (28B)
│   │   ├── unknown (set popup parent A) [UI] (24B) *** STATE MUTATION ***
│   │   │     → Sets DAT_006359c0 = param_1.
│   │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │   │     → Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup stack
│   │   │     (subtree shown above — 3 children)
│   │   └── modal_dialog_run [UI] (283B)
│   │         → Runs a modal dialog loop
│   │         (subtree shown above — 4 children)
│   └── _strcpy_thunk / _chkstk [FW] (47B)
│         → Stack probe function — touches stack pages in 4KB increments to trigger guard page allocation.
├── FUN_0051C635 [??] (89B)
├── mp_join_game_handler [MIXED] (683B) *** STATE MUTATION ***
│     → Handles a player joining a multiplayer game
│   ├── FUN_0000994F [??]
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── init_palette_system [UI] (21B)
│   │     → Initializes the palette system.
│   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │     → Sets a string control value in the multiplayer dialog string table
│   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │     → Sets a numeric control value in the multiplayer dialog number table.
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── unknown (manage pedia window) [UI] (37B)
│   │     → Calls manage_window_C44D with the window handle at this+8.
│   │     (subtree shown above — 1 children)
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman")
│   ├── mp_choose_additional_player [MIXED] (1976B) *** STATE MUTATION ***
│   │     → Shows a dialog for choosing an additional player to join a multiplayer game
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── mapgen_set_dialog_type [UI] (42B)
│   │   │     → Sets up a dialog/progress indicator for map generation with the given type parameter.
│   │   │     (subtree shown above — 1 children)
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_list_invalidate_item [UI] (108B)
│   │   │     → Invalidates a specific item in a multiplayer list control by setting its dirty flag and triggering a redraw.
│   │   │     (subtree shown above — 1 children)
│   │   ├── disable_civ_slot [UI] (133B) *** STATE MUTATION ***
│   │   │     → Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (set selected item) [UI] (33B) *** STATE MUTATION ***
│   │   │     → Sets the selected item index in a UI list object.
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     → Returns the noun name for a civilization (e.g., "Romans")
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── mp_handle_player_turn [MIXED] (192B) *** STATE MUTATION ***
│   │   │     → Handles player turn authentication in multiplayer
│   │   │     (subtree shown above — 2 children)
│   │   ├── mp_build_label_string [UI] (159B)
│   │   │     → Builds a label string for multiplayer dialogs
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_set_position_fields [UI] (42B)
│   │   │     → Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2
│   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │     → Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1
│   │   ├── popup_set_radio_selected [UI] (76B)
│   │   │     → Sets or clears the "selected" flag (bit 0) on a radio option identified by param_1
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_show_modal [UI] (999B)
│   │   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │   │     (subtree shown above — 11 children)
│   │   └── popup_parse_text_file [UI] (2287B)
│   │         → Parses a game text file section to configure and populate a popup dialog
│   │         (subtree shown above — 12 children)
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │     (subtree shown above — 6 children)
│   ├── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│   │     → Resumes the turn timer if time remains and game is active.
│   │     (subtree shown above — 5 children)
│   └── popup_dialog_create [UI] (93B)
│         → Creates a new popup dialog object
│         (subtree shown above — 2 children)
├── open_events_editor [UI] (79B) *** STATE MUTATION ***
│     → Entry point for opening the events editor
│   ├── create_editor_object [FW] (498B)
│   │     → Constructor for the tech editor object
│   │     (subtree shown above — 1 children)
│   ├── events_editor_init [MIXED] (3035B) *** STATE MUTATION ***
│   │     → Initializes and runs the full events editor dialog
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── set_editor_font [UI] (93B)
│   │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
│   │   │     (subtree shown above — 3 children)
│   │   ├── create_listbox_control [UI] (121B)
│   │   │     → Creates a listbox control for the editor.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_listbox_data_source [UI] (48B)
│   │   │     → Sets the data source for a listbox.
│   │   │     (subtree shown above — 2 children)
│   │   ├── event_mgr_ctor [GL] (152B)
│   │   │     → Constructor for the event manager object
│   │   │   ├── event_mgr_init [GL] (62B)
│   │   │   │   └── event_mgr_reset_pool [GL] (64B)
│   │   │   └── popup_dialog_create [UI] (93B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── event_mgr_init [GL] (62B)
│   │   │     → Initializes the event manager
│   │   │     (subtree shown above — 1 children)
│   │   ├── update_event_action_buttons [UI] (602B)
│   │   │     → Updates the enabled/disabled state of event editor buttons based on the currently selected trigger and action
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── unknown [UI] (37B)
│   │   │       └── FUN_00003DBF [??]
│   │   ├── populate_trigger_listbox [UI] (1239B)
│   │   │     → Populates the trigger listbox in the events editor with formatted descriptions of all event triggers.
│   │   │   ├── add_listbox_item [UI] (49B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── clear_listbox [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── update_event_action_buttons [UI] (602B)
│   │   │         (subtree shown above — 3 children)
│   │   ├── populate_action_listbox [UI] (1866B)
│   │   │     → Populates the action listbox for the selected trigger in the events editor.
│   │   │   ├── add_listbox_item [UI] (49B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── clear_listbox [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── update_event_action_buttons [UI] (602B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   └── unknown [UI] (37B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── unknown [UI] (43B)
│   │   │     → Sends UI message 0x3E92 with a parameter, using window handle from object offset 0x1c.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown [UI] (33B)
│   │   │     → Setter — stores param_1 at object offset 0x30.
│   │   ├── unknown [UI] (33B)
│   │   │     → Setter — stores param_1 at object offset 0x34.
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │     (subtree shown above — 4 children)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │         (subtree shown above — 3 children)
│   ├── unknown [FW] (12B)
│   │     → Thunk that calls FUN_004183d0 (likely a destructor or cleanup).
│   └── unknown [FW] (14B)
│         → SEH epilog — restores FS:[0] from stack frame.
├── toggle_cheat_mode [MIXED] (335B) *** STATE MUTATION ***
│     → Toggles cheat mode on/off
│   ├── show_dialog_message [UI] (43B)
│   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (subtree shown above — 1 children)
│   ├── show_help_topic [UI] (34B)
│   │     → Opens a help topic with default parameters.
│   │     (subtree shown above — 1 children)
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │     (subtree shown above — 19 children)
│   └── create_scenario_folder [UI] (505B) *** STATE MUTATION ***
│         → Creates a new scenario folder
│       ├── show_message [UI] (46B) *** STATE MUTATION ***
│       │     → Stores a message string in the message buffer at the specified slot index.
│       ├── show_help_topic [UI] (34B)
│       │     → Opens a help topic with default parameters.
│       │     (subtree shown above — 1 children)
│       ├── write_save_file [GL] (4499B) *** STATE MUTATION ***
│       │     → Writes the complete save file
│       │   ├── pack_viewport_state [GL] (233B) *** STATE MUTATION ***
│       │   ├── civ_has_tech [GL] (181B)
│       │   │     (subtree shown above — 1 children)
│       │   └── save_map_data [GL] (309B) *** STATE MUTATION ***
│       ├── FUN_0051D63B [??] (253B)
│       └── validate_folder_name [UI] (77B)
│             → Validates a folder name by uppercasing it and checking each character against a valid-character table at DAT_006335f8
├── toggle_cheat_multiplayer [MIXED] (396B) *** STATE MUTATION ***
│     → Toggles cheat mode in multiplayer
│   ├── show_dialog_message [UI] (43B)
│   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (subtree shown above — 1 children)
│   ├── show_help_topic [UI] (34B)
│   │     → Opens a help topic with default parameters.
│   │     (subtree shown above — 1 children)
│   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │     → Sets a numeric control value in the multiplayer dialog number table.
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │     (subtree shown above — 19 children)
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │     (subtree shown above — 6 children)
│   └── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│         → Resumes the turn timer if time remains and game is active.
│         (subtree shown above — 5 children)
├── cheat_edit_tech [MIXED] (870B) *** STATE MUTATION ***
│     → Cheat dialog for editing technologies of a civ
│   ├── FUN_00009429 [??]
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │     (subtree shown above — 1 children)
│   ├── text_newline [UI] (29B)
│   │     → Adds a newline to the global text buffer.
│   ├── display_improvement [UI] (33B)
│   │     → Adds an improvement/government icon to the text buffer.
│   ├── open_list_dialog [UI] (47B)
│   │     → Opens a list dialog with the given title and flags.
│   │     (subtree shown above — 1 children)
│   ├── civ_has_tech [GL] (181B)
│   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │     (subtree shown above — 1 children)
│   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │     → Master handler for when a civilization discovers a new technology
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── display_improvement [UI] (33B)
│   │   │     → Adds an improvement/government icon to the text buffer.
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │     (subtree shown above — 1 children)
│   │   ├── dialog_set_title [UI] (41B)
│   │   │     → Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │   └── dialog_set_title_impl [UI] (42B)
│   │   ├── has_building [GL] (122B)
│   │   │     → Checks if a city has a specific building
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │     → Sets or clears a building bit in a city's building bitfield.
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── get_wonder_owner [GL] (73B)
│   │   │     → Returns the civ that owns a wonder, or -1 if no one does.
│   │   │   └── get_wonder_city [GL] (57B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │     → Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the diplomacy dialog flow
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── select_list_item [UI] (38B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── open_intelligence_dialog [UI] (535B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── create_text_button [UI] (133B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── set_button_owner [UI] (45B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_button_handler [UI] (45B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_button_click_callback [UI] (33B)
│   │   │   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── modal_dialog_run [UI] (283B)
│   │   │   │         (subtree shown above — 4 children)
│   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── ai_choose_government [AI] (558B) *** STATE MUTATION ***
│   │   │   │   │   ├── check_govt_available [GL] (323B)
│   │   │   │   │   └── ai_revolution_notification [GL] (1336B) *** STATE MUTATION ***
│   │   │   │   ├── spaceship_ai_should_start [AI] (583B) *** STATE MUTATION ***
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── spaceship_is_enabled [GL] (90B)
│   │   │   │   ├── find_nearest_unit [GL] (233B) *** STATE MUTATION ***
│   │   │   │   │   └── calc_movement_cost [GL] (94B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── calc_attitude [GL] (178B)
│   │   │   ├── diplo_show_greeting [MIXED] (804B) *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── select_list_item [UI] (38B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── open_list_dialog [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── intel_open_advisor [UI] (546B) *** STATE MUTATION ***
│   │   │   │   │   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │   │   │   │   ├── intel_create_object [UI] (200B) *** STATE MUTATION ***
│   │   │   │   │   ├── intel_setup_display [UI] (236B) *** STATE MUTATION ***
│   │   │   │   │   ├── intel_delete_object [UI] (57B)
│   │   │   │   │   ├── unknown (set popup parent A) [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   └── unknown (set popup parent B) [UI] (24B)
│   │   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (set popup position) [UI] (32B)
│   │   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── popup_set_position_fields [UI] (42B)
│   │   │   │   └── get_screen_rect [UI] (48B)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── intel_play_animation [UI] (181B) *** STATE MUTATION ***
│   │   │   │   └── intel_play_video_frame [UI] (248B)
│   │   │   │       └── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 2 children)
│   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── popup_add_radio_option [UI] (566B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │     → Resets all diplomacy session state variables to their default values and closes the intelligence advisor.
│   │   │   └── intel_close_advisor [UI] (166B) *** STATE MUTATION ***
│   │   │       ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── wait_for_animation [UI] (109B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── resume_music [UI] (85B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── intel_teardown_display [UI] (158B)
│   │   │       │   ├── save_and_flush [UI] (41B)
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── swap_dc [UI] (43B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── init_palette_system [UI] (21B)
│   │   │       │   ├── pedia_free_resource [UI] (57B)
│   │   │       │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── unknown (set popup parent A) [UI] (24B) *** STATE MUTATION ***
│   │   │       │   ├── unknown (set popup parent B) [UI] (24B)
│   │   │       │   └── unknown (set popup position) [UI] (32B)
│   │   │       └── intel_delete_object [UI] (57B)
│   │   │             (subtree shown above — 1 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION ***
│   │   │     → When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   └── show_terrain_help [UI] (58B)
│   │   │   │       └── FUN_0051D564 [??] (178B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── handle_tech_government_effects [GL] (973B) *** STATE MUTATION ***
│   │   │     → Handles side effects when a civ discovers a tech that unlocks a new government form
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │   │   │   └── FUN_0051D564 [??] (178B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │   │       ├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION ***
│   │   │       │   ├── FUN_00009429 [??]
│   │   │       │   ├── open_tax_rate_dialog [MIXED] (4140B) *** STATE MUTATION ***
│   │   │       │   └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │       │         (subtree shown above — 18 children)
│   │   │       └── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 4 children)
│   │   ├── we_love_the_king_day [GL] (379B) *** STATE MUTATION ***
│   │   │     → Triggers "We Love the King Day" celebration for a civilization
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (show tech help) [UI] (43B)
│   │   │   │   └── show_tech_help [UI] (92B)
│   │   │   │       └── FUN_0051D564 [??] (178B)
│   │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── format_enabled_item [UI] (138B)
│   │   │     → Formats an enabled item (unit/improvement/wonder) for display in the tech discovery dialog
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   └── popup_add_edit_field [UI] (412B)
│   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │     → Master handler for when a civilization discovers a new technology
│   │   │     (cycle — already in call path)
│   │   ├── unknown (show tech help) [UI] (43B)
│   │   │     → Shows tech help text via the help display system.
│   │   │     (subtree shown above — 1 children)
│   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │     → Enqueues a multiplayer event message
│   │   │     (subtree shown above — 1 children)
│   │   ├── pedia_select_entry [UI] (342B) *** STATE MUTATION ***
│   │   │     → Selects and displays a Civilopedia entry
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (lock pedia surface) [UI] (38B)
│   │   │   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── surface_list_find_dirty [UI] (174B)
│   │   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_edit_text [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   └── unknown (clear hypertext links) [UI] (21B)
│   │   │   ├── pedia_clear_item_list [UI] (118B)
│   │   │   │   └── init_palette_system [UI] (21B)
│   │   │   ├── pedia_draw_frame [UI] (800B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── draw_3d_border [UI] (167B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── pedia_open_category [UI] (200B) *** STATE MUTATION ***
│   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_dialog_enabled [UI] (36B)
│   │   │   │   ├── unknown (lock pedia surface) [UI] (38B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── pedia_set_title [UI] (229B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   └── text_add_label_id [UI] (33B)
│   │   │   │   ├── pedia_push_history [UI] (523B) *** STATE MUTATION ***
│   │   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── pedia_get_entry_name [UI] (89B)
│   │   │   ├── pedia_draw_tech_detail [UI] (5911B) *** STATE MUTATION ***
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── pedia_show_description [UI] (593B)
│   │   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── pedia_set_selection [UI] (47B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── pedia_add_hyperlink [UI] (1361B)
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── hypertext_widget_create [UI] (139B)
│   │   │   │   │   ├── pedia_link_node_ctor [UI] (86B)
│   │   │   │   │   ├── unknown (set link callback) [UI] (33B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── port_alloc [UI] (683B)
│   │   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── widget_get_height [UI] (34B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   └── modal_dialog_run [UI] (283B)
│   │   │         (subtree shown above — 4 children)
│   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │     → Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   │     (subtree shown above — 23 children)
│   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │     → Returns a random integer in the range [param_1, param_2]
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │     → Closes a popup dialog by destroying it and clearing its list control.
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_add_edit_field [UI] (412B)
│   │   │     → Adds a text edit field to a popup dialog
│   │   ├── popup_set_scaled_width [UI] (99B)
│   │   │     → Sets the popup dialog width (this+0x11C) with optional resolution scaling
│   │   ├── popup_add_button [UI] (360B)
│   │   │     → Adds a button to the popup dialog
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── init_editor_scrollbar [UI] (34B)
│   │   │         (subtree shown above — 1 children)
│   │   └── bit_index_to_byte_mask [GL] (45B)
│   │         → Converts a bit index to byte offset and bit mask
│   ├── cheat_pick_civ [MIXED] (301B)
│   │     → Shows a civilization picker dialog — lists all active civs (skipping barbarians if param_1==0)
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID
│   │   │     (subtree shown above — 2 children)
│   │   └── popup_add_radio_option [UI] (566B)
│   │         → Adds a radio button option to the popup dialog
│   │         (subtree shown above — 2 children)
│   ├── cheat_toggle_all_tech [GL] (371B) *** STATE MUTATION ***
│   │     → Toggles all technologies for a civ
│   │   ├── FUN_00009429 [??]
│   │   ├── debug_show_message [UI] (33B)
│   │   │     → Shows a debug message popup using the DEBUG template string.
│   │   │   └── show_help_topic [UI] (34B)
│   │   │         (subtree shown above — 1 children)
│   │   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │         → Master handler for when a civilization discovers a new technology
│   │         (subtree shown above — 35 children)
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_set_default_selection [UI] (116B)
│   │     → Sets the default selected item in the popup by ID
│   │     (subtree shown above — 2 children)
│   ├── popup_add_radio_option [UI] (566B)
│   │     → Adds a radio button option to the popup dialog
│   │     (subtree shown above — 2 children)
│   └── bit_index_to_byte_mask [GL] (45B)
│         → Converts a bit index to byte offset and bit mask
├── cheat_edit_terrain [MIXED] (2032B) *** STATE MUTATION ***
│     → Cheat terrain editor
│   ├── is_tile_valid [GL] (80B)
│   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │     (subtree shown above — 1 children)
│   ├── show_help_topic_ext [UI] (38B)
│   │     → Extended help topic opener with additional parameter.
│   │     (subtree shown above — 1 children)
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool
│   ├── update_map_area_all_players [UI] (136B)
│   │     → Updates a map area for all active players (all viewports in MP).
│   │     (subtree shown above — 1 children)
│   ├── update_tile_all_players [UI] (124B)
│   │     → Updates a single tile for all active players.
│   │     (subtree shown above — 1 children)
│   ├── FUN_0051D7D6 [??] (65B)
│   ├── FUN_0051D817 [??] (32B)
│   ├── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │     → Resets all fields of a popup dialog structure to default values
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │     → Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup stack
│   │     (subtree shown above — 3 children)
│   ├── popup_add_radio_option [UI] (566B)
│   │     → Adds a radio button option to the popup dialog
│   │     (subtree shown above — 2 children)
│   ├── wrap_x [GL] (94B)
│   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   ├── get_tile_ptr [GL] (90B)
│   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │     (subtree shown above — 1 children)
│   ├── get_tile_terrain_raw [GL] (41B)
│   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │     (subtree shown above — 1 children)
│   ├── is_tile_ocean [GL] (57B)
│   │     → Returns true if terrain type == 10 (ocean).
│   │     (subtree shown above — 1 children)
│   ├── get_tile_continent [GL] (39B)
│   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │     (subtree shown above — 1 children)
│   └── get_city_owner_at [GL] (111B)
│         → Returns the city-owning civ at a tile, or -1
│         (subtree shown above — 3 children)
├── cheat_place_unit [MIXED] (1059B) *** STATE MUTATION ***
│     → Cheat: places a new unit at cursor position
│   ├── is_tile_valid [GL] (80B)
│   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_label_id [UI] (33B)
│   │     → Appends a localized label (by ID) to the global text buffer.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │     (subtree shown above — 1 children)
│   ├── display_improvement [UI] (33B)
│   │     → Adds an improvement/government icon to the text buffer.
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool
│   ├── update_tile_all_players [UI] (124B)
│   │     → Updates a single tile for all active players.
│   │     (subtree shown above — 1 children)
│   ├── civ_has_tech [GL] (181B)
│   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │     (subtree shown above — 1 children)
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_set_default_selection [UI] (116B)
│   │     → Sets the default selected item in the popup by ID
│   │     (subtree shown above — 2 children)
│   ├── popup_add_radio_option [UI] (566B)
│   │     → Adds a radio button option to the popup dialog
│   │     (subtree shown above — 2 children)
│   └── create_unit [GL] (1675B) *** STATE MUTATION ***
│         → Creates a new unit of the specified type for a given civilization at a map position
│       ├── show_dialog_message [UI] (43B)
│       │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│       │     (subtree shown above — 1 children)
│       ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│       │     → Major game logic function that processes visibility updates after a unit moves
│       │     (subtree shown above — 26 children)
│       ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│       │     → Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status
│       │     (subtree shown above — 4 children)
│       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│       │     → Central network message dispatcher
│       │     (subtree shown above — 18 children)
│       ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│       │     → The main network polling function
│       ├── unknown (tutorial_show_advice) [UI] (38B)
│       │     → Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│       │   └── show_unit_type_picker [UI] (260B) *** STATE MUTATION ***
│       │       ├── select_list_item [UI] (38B)
│       │       │     (subtree shown above — 1 children)
│       │       ├── popup_dialog_create [UI] (93B)
│       │       │     (subtree shown above — 2 children)
│       │       ├── popup_add_button [UI] (360B)
│       │       │     (subtree shown above — 2 children)
│       │       └── sprite_init_empty [UI] (140B)
│       │           ├── port_alloc_rect [UI] (58B)
│       │           │     (subtree shown above — 1 children)
│       │           ├── port_set_color [UI] (43B)
│       │           └── unknown (sprite extract with rect params) [UI] (88B)
│       ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│       │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│       │     (subtree shown above — 3 children)
│       ├── calc_unit_movement_points [GL] (516B)
│       │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│       │     (subtree shown above — 4 children)
│       └── put_down_unit [GL] (640B) *** STATE MUTATION ***
│             → Places a unit on the map at a given position
│             (subtree shown above — 7 children)
├── cheat_edit_unit_at_cursor [UI] (60B) *** STATE MUTATION ***
│     → Cheat: opens unit editor for the top unit at cursor position.
│   ├── find_unit_stack_at_xy [GL] (231B)
│   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │     (subtree shown above — 3 children)
│   └── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│         → Deletes every unit in a stack by iterating from first to last.
│         (subtree shown above — 4 children)
├── cheat_edit_unit [MIXED] (1892B) *** STATE MUTATION ***
│     → Cheat unit editor dialog
│   ├── is_tile_valid [GL] (80B)
│   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_label_id [UI] (33B)
│   │     → Appends a localized label (by ID) to the global text buffer.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │     (subtree shown above — 1 children)
│   ├── text_newline [UI] (29B)
│   │     → Adds a newline to the global text buffer.
│   ├── text_begin_italic [UI] (29B)
│   │     → Begins italic text mode in the global text buffer.
│   ├── text_end_italic [UI] (29B)
│   │     → Ends italic text mode in the global text buffer.
│   ├── display_improvement [UI] (33B)
│   │     → Adds an improvement/government icon to the text buffer.
│   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── open_list_dialog [UI] (47B)
│   │     → Opens a list dialog with the given title and flags.
│   │     (subtree shown above — 1 children)
│   ├── get_civ_name [UI] (28B)
│   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │     (subtree shown above — 1 children)
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool
│   ├── update_tile_all_players [UI] (124B)
│   │     → Updates a single tile for all active players.
│   │     (subtree shown above — 1 children)
│   ├── show_input_dialog_int [UI] (41B)
│   │     → Shows a numeric input dialog using the standard popup system with DAT_006359d4.
│   │     (subtree shown above — 1 children)
│   ├── FUN_0051D7D6 [??] (65B)
│   ├── FUN_0051D817 [??] (32B)
│   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │     → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │     (subtree shown above — 7 children)
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_add_radio_option [UI] (566B)
│   │     → Adds a radio button option to the popup dialog
│   │     (subtree shown above — 2 children)
│   ├── get_unit_max_hp [GL] (45B)
│   │     → Returns the maximum hit points for a unit based on its type.
│   ├── find_unit_stack_at_xy [GL] (231B)
│   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │     (subtree shown above — 3 children)
│   ├── sum_stack_property [GL] (724B)
│   │     → Sums a property across all units in a stack
│   │     (subtree shown above — 2 children)
│   └── show_unit_list_dialog [UI] (693B) *** STATE MUTATION ***
│         → Shows a scrolling dialog listing all units in a stack with their details (civ name, veteran flag, type name, home cit...
│       ├── text_begin [UI] (29B)
│       │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│       ├── text_add_label_id [UI] (33B)
│       │     → Appends a localized label (by ID) to the global text buffer.
│       ├── mapgen_set_dialog_type [UI] (42B)
│       │     → Sets up a dialog/progress indicator for map generation with the given type parameter.
│       │     (subtree shown above — 1 children)
│       ├── select_list_item [UI] (38B)
│       │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│       │     (subtree shown above — 1 children)
│       ├── text_newline [UI] (29B)
│       │     → Adds a newline to the global text buffer.
│       ├── text_begin_italic [UI] (29B)
│       │     → Begins italic text mode in the global text buffer.
│       ├── text_end_italic [UI] (29B)
│       │     → Ends italic text mode in the global text buffer.
│       ├── display_improvement [UI] (33B)
│       │     → Adds an improvement/government icon to the text buffer.
│       ├── set_status_bar_text [UI] (33B)
│       │     → Sets the status bar text to param_1 using the global string buffer.
│       ├── unknown (string pool append separator) [UI] (29B)
│       │     → Appends a separator to the string buffer at DAT_00679640 using thunk_FUN_004aef96.
│       ├── get_civ_adjective_name [GL] (145B)
│       │     → Returns the adjective form of a civilization name
│       ├── popup_dialog_create [UI] (93B)
│       │     → Creates a new popup dialog object
│       │     (subtree shown above — 2 children)
│       ├── popup_set_title [UI] (86B)
│       │     → Sets the popup dialog title string
│       ├── popup_set_scaled_width [UI] (99B)
│       │     → Sets the popup dialog width (this+0x11C) with optional resolution scaling
│       ├── popup_add_button [UI] (360B)
│       │     → Adds a button to the popup dialog
│       │     (subtree shown above — 2 children)
│       ├── get_next_unit_in_stack [GL] (65B)
│       │     → Returns the next unit in the stack linked list, or -1 if at end
│       │     (subtree shown above — 1 children)
│       ├── get_first_unit_in_stack [GL] (118B)
│       │     → Follows prev pointers to find the first unit in the stack.
│       │     (subtree shown above — 1 children)
│       └── sprite_init_empty [UI] (140B)
│             → Initializes a sprite with given dimensions and fill color
│             (subtree shown above — 3 children)
├── cheat_edit_civ [GL] (3764B) *** STATE MUTATION ***
│     → Comprehensive cheat civ editor
├── cheat_edit_scenario [GL] (1648B) *** STATE MUTATION ***
│     → Master scenario editor dialog with 12+ options: paradigm shift, year increment, start year, max turns, clear/set fog ...
├── cheat_save_game [UI] (26B) *** STATE MUTATION ***
│     → Saves the current game via thunk_save_game(1).
├── end_turn_prompt [MIXED] (258B) *** STATE MUTATION ***
│     → End-turn prompt handler
│   ├── invalidate_region [UI] (180B)
│   │     → Invalidates a screen region
│   │     (subtree shown above — 2 children)
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │     → Central network message dispatcher
│   │     (subtree shown above — 18 children)
│   ├── game_timer_dialog [MIXED] (1579B) *** STATE MUTATION ***
│   │     → Shows the game timer configuration dialog
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │     → Shows a waiting dialog by calling thunk_FUN_0051d564 with 4 parameters and DAT_006359d4.
│   │   │     (subtree shown above — 1 children)
│   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │     → Enqueues a multiplayer event message
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_set_animation_style [UI] (185B) *** STATE MUTATION ***
│   │   │     → Sets the animation display style for multiplayer
│   │   │   └── show_popup_window [UI] (330B)
│   │   │       ├── set_callback_0x30 [UI] (45B)
│   │   │       ├── set_callback_0x38 [UI] (45B)
│   │   │       ├── show_window_wrapper [UI] (33B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── dialog_create [UI] (588B)
│   │   │       │     (subtree shown above — 6 children)
│   │   │       ├── unknown [UI] (81B)
│   │   │       ├── calc_window_position [UI] (352B)
│   │   │       ├── get_popup_dimensions [UI] (186B)
│   │   │       └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 2 children)
│   │   ├── unknown [UI] (61B)
│   │   │     → Conditional cleanup functions for popup windows — destroy window if video loaded.
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_set_position_fields [UI] (42B)
│   │   │     → Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_show_modal [UI] (999B)
│   │   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │   │     (subtree shown above — 11 children)
│   │   └── popup_parse_text_file [UI] (2287B)
│   │         → Parses a game text file section to configure and populate a popup dialog
│   │         (subtree shown above — 12 children)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │     (subtree shown above — 15 children)
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │     (subtree shown above — 6 children)
│   ├── start_turn_timer [MIXED] (280B) *** STATE MUTATION ***
│   │     → Starts the turn timer — closes open windows, calculates remaining time, creates a 500ms repeating timer, sends MP not...
│   │     (subtree shown above — 7 children)
│   └── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│         → Resumes the turn timer if time remains and game is active.
│         (subtree shown above — 5 children)
├── menu_set_subitem_grayed [UI] (194B)
│     → Sets or clears the grayed/disabled state of a sub-menu item (bit 2)
│   ├── menu_find_subitem_by_id [UI] (136B)
│   │     → Searches all top-level menu items and their sub-item lists for a sub-item with matching ID (param_1)
│   └── menu_toggle_item_grayed [UI] (101B)
│         → Toggles the grayed/disabled state of a menu sub-item
│         (subtree shown above — 4 children)
├── cosmic_editor_launch [UI] (89B)
│     → Launches the cosmic parameter editor
│   ├── create_editor_object [FW] (498B)
│   │     → Constructor for the tech editor object
│   │     (subtree shown above — 1 children)
│   ├── cosmic_editor_init_window [UI] (1731B) *** STATE MUTATION ***
│   │     → Creates and initializes the full cosmic parameter editor window with all controls (list, buttons for OK/Cancel/Help/E...
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_button_owner [UI] (45B)
│   │   │     → Sets the button's owner/parent reference
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── set_editor_font [UI] (93B)
│   │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
│   │   │     (subtree shown above — 3 children)
│   │   ├── create_listbox_control [UI] (121B)
│   │   │     → Creates a listbox control for the editor.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_listbox_data_source [UI] (48B)
│   │   │     → Sets the data source for a listbox.
│   │   │     (subtree shown above — 2 children)
│   │   ├── unknown [UI] (43B)
│   │   │     → Sends UI message 0x3E92 with a parameter, using window handle from object offset 0x1c.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown [UI] (33B)
│   │   │     → Setter — stores param_1 at object offset 0x30.
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   ├── cosmic_editor_save_restore [MIXED] (769B) *** STATE MUTATION ***
│   │   │     → Saves the current 22 cosmic parameters to the editor display buffer at 0x6a2d80, calls a dialog update function, then...
│   │   │   └── parse_cosmic_parameters [GL] (432B) *** STATE MUTATION ***
│   │   │       └── read_cosmic_param_clamped [GL] (57B) *** STATE MUTATION ***
│   │   ├── cosmic_editor_display_list [UI] (482B)
│   │   │     → Populates the cosmic editor list display, formatting each cosmic parameter with its current and saved values, reading...
│   │   │   ├── add_listbox_item [UI] (49B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── clear_listbox [UI] (47B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │     (subtree shown above — 4 children)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │         (subtree shown above — 3 children)
│   ├── (cosmic_editor_dtor) [FW] (12B)
│   │     → Destructor helper — calls thunk_FUN_004183d0 to destroy a property sheet.
│   ├── (SEH_cleanup_767C) [FW] (14B)
│   │     → SEH frame cleanup — restores FS:[0].
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── unit_order_wake_all_own [GL] (121B) *** STATE MUTATION ***
│     → Wakes all of the current player's units by refreshing their movement points.
│   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│         → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│         (subtree shown above — 1 children)
├── move_unit [GL] (17963B) *** STATE MUTATION ***
│     → THE main unit movement function — the single largest function in the binary at ~18KB
│   ├── FUN_0000C494 [??]
│   ├── flush_display [UI] (21B)
│   │     → Flushes the display buffer by calling FUN_005bbbce.
│   ├── is_tile_valid [GL] (80B)
│   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── show_dialog_message [UI] (43B)
│   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (subtree shown above — 1 children)
│   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │     (subtree shown above — 1 children)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │     → Sets a numeric control value in the multiplayer dialog number table.
│   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │     → Sets a dialog string control to an improvement/building name
│   │     (subtree shown above — 1 children)
│   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │     → Major game logic function that processes visibility updates after a unit moves
│   │     (subtree shown above — 26 children)
│   ├── find_city_at [GL] (245B)
│   │     → Finds a city at the given (x,y) coordinates
│   │     (subtree shown above — 2 children)
│   ├── show_game_popup_2arg [UI] (39B)
│   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   └── show_unit_type_picker [UI] (260B) *** STATE MUTATION ***
│   │         → Shows a unit type picker dialog for the Civilopedia.
│   │         (subtree shown above — 4 children)
│   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │     → Adjusts the attitude value between two civs by a delta
│   │   ├── get_attitude_raw [GL] (47B)
│   │   │     → Returns the raw attitude value of civ param_1 toward civ param_2.
│   │   └── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │         → Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │     → Central network message dispatcher
│   │     (subtree shown above — 18 children)
│   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │     → Initializes a network message header with magic bytes, message type, and default size.
│   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │     → Plays a sound effect by ID
│   │     (subtree shown above — 2 children)
│   ├── wait_for_animation [UI] (109B)
│   │     → Busy-waits for a duration based on param_1, processing messages
│   │     (subtree shown above — 2 children)
│   ├── update_tile_all_players [UI] (124B)
│   │     → Updates a single tile for all active players.
│   │     (subtree shown above — 1 children)
│   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │     → The main network polling function
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman")
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │     (subtree shown above — 3 children)
│   ├── set_paradrop_range [GL] (31B) *** STATE MUTATION ***
│   │     → Sets the paradrop range for a unit type
│   ├── spy_enters_city [MIXED] (10469B) *** STATE MUTATION ***
│   │     → The enormous (10KB) spy/diplomat city action handler
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── open_intelligence_dialog [UI] (535B) *** STATE MUTATION ***
│   │   │     → Opens the intelligence report dialog for a foreign civ
│   │   │     (subtree shown above — 9 children)
│   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │     → Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │     → Sets or clears a building bit in a city's building bitfield.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │     → Sets specified treaty flag bits between two civilizations
│   │   │     (subtree shown above — 2 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │     → Master handler for when a civilization discovers a new technology
│   │   │     (subtree shown above — 35 children)
│   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │     → Executes a spy/diplomat's action in an enemy city — handles the chance of being caught (based on veteran status and w...
│   │   │     (subtree shown above — 10 children)
│   │   ├── spy_caught_check [GL] (163B) *** STATE MUTATION ***
│   │   │     → Checks if a spy gets caught during an action
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 10 children)
│   │   ├── check_incident_permission [GL] (133B)
│   │   │     → For human players with treaty status, asks permission before committing an act of espionage
│   │   │   └── unknown (dialog show single param) [UI] (33B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── calc_city_revolt_distance [GL] (232B)
│   │   │     → Calculates the "revolt distance" for a city — minimum distance to any friendly city with a courthouse
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── calc_movement_cost [GL] (94B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── execute_civil_war [GL] (1339B) *** STATE MUTATION ***
│   │   │     → Executes a civil war — transfers nearby units from the old civ to the new rebel civ, reveals map around the city, and...
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000DADA [??]
│   │   │   │   ├── FUN_0000DB36 [??]
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── select_list_item [UI] (38B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── change_city_production [MIXED] (2572B) *** STATE MUTATION ***
│   │   │   │   │   ├── select_list_item [UI] (38B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   ├── ai_choose_city_production [AI] (29400B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_food_box_with_difficulty [GL] (106B)
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── redraw_map_all_players [UI] (124B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── ai_remove_goals_near [AI] (259B) *** STATE MUTATION ***
│   │   │   │   │   └── calc_movement_cost [GL] (94B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── has_spaceship_built [GL] (47B)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 8 children)
│   │   │   │   ├── can_build_unit_type [GL] (1095B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── can_build_improvement [GL] (1383B)
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── can_build_wonder [GL] (199B)
│   │   │   │   ├── show_city_event_dialog_v2 [UI] (915B) *** STATE MUTATION ***
│   │   │   │   │   ├── select_list_item [UI] (38B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── pedia_window_ctor [UI] (115B)
│   │   │   │   │   ├── popup_set_default_selection [UI] (116B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── popup_add_radio_option [UI] (566B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   │   ├── palette_init [UI] (145B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   └── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │   │   ├── handle_espionage_discovery [GL] (236B) *** STATE MUTATION ***
│   │   │   │   │   └── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── event_check_city_taken [GL] (243B) *** STATE MUTATION ***
│   │   │   │   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│   │   │   │   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │   │   │   │   ├── FUN_0000CA8D [??]
│   │   │   │   │   ├── FUN_0000CCB3 [??]
│   │   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── process_messages [UI] (21B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── unknown — manage window [UI] (37B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── init_city_production_globals [GL] (77B) *** STATE MUTATION ***
│   │   │   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 23 children)
│   │   │   │   ├── diplomacy_check_treaty_violation [GL] (379B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │   │   │   ├── calc_city_value_for_capture [GL] (277B) *** STATE MUTATION ***
│   │   │   │   ├── diplomacy_steal_tech [GL] (999B) *** STATE MUTATION ***
│   │   │   │   │   ├── select_list_item [UI] (38B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── reassign_all_city_production [GL] (254B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 35 children)
│   │   │   │   │   ├── show_research_goal_dialog [UI] (3119B) *** STATE MUTATION ***
│   │   │   │   │   ├── unknown (show tech help) [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── popup_add_radio_option [UI] (566B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── find_most_central_city [GL] (356B) *** STATE MUTATION ***
│   │   │   │   │   └── calc_movement_cost [GL] (94B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── handle_civil_war [GL] (3291B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── redraw_map_all_players [UI] (124B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── event_check_no_schism [GL] (169B) *** STATE MUTATION ***
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── find_most_central_city [GL] (356B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── transfer_city_ownership [GL] (283B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── create_unit [GL] (1675B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 9 children)
│   │   │   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 3 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 2 children)
│   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │     → Enqueues a multiplayer event message
│   │   │     (subtree shown above — 1 children)
│   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │     → Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   │     (subtree shown above — 23 children)
│   │   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │   │     → Handles a nuclear attack on a tile
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── unknown (show improvement help) [UI] (43B)
│   │   │   │   └── show_improvement_help [UI] (111B)
│   │   │   │       └── FUN_0051D564 [??] (178B)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── animate_nuke_explosion [UI] (885B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── init_game_display [UI] (51B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── blit_with_clip [UI] (265B)
│   │   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── generate_terrain_around [GL] (696B) *** STATE MUTATION ***
│   │   │       ├── is_tile_valid [GL] (80B)
│   │   │       ├── find_city_at [GL] (245B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── update_tile_all_players [UI] (124B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── wrap_x [GL] (94B)
│   │   │       ├── get_tile_ptr [GL] (90B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── is_tile_ocean [GL] (57B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── reveal_tile [GL] (154B) *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (80B)
│   │   │       │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── get_tile_improvements [GL] (39B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │       │         (subtree shown above — 3 children)
│   │   │       ├── get_tile_improvements [GL] (39B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 3 children)
│   │   │       ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │       └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 2 children)
│   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │     → Deletes a unit
│   │   │     (subtree shown above — 7 children)
│   │   └── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │         → Deletes a unit and refreshes the map display at its former position
│   │         (subtree shown above — 7 children)
│   ├── spy_sabotage_unit [GL] (784B) *** STATE MUTATION ***
│   │     → Spy option to sabotage an enemy unit — either bribe it or blow it up with explosives
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   │     (subtree shown above — 1 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     → Updates a single tile for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │   │     → Executes a spy/diplomat's action in an enemy city — handles the chance of being caught (based on veteran status and w...
│   │   │     (subtree shown above — 10 children)
│   │   ├── pick_up_unit_004c9528 [GL] (2453B) *** STATE MUTATION ***
│   │   │     → Handles bribing/picking up an enemy unit — the player pays gold to convert an enemy unit to their side
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── calc_city_revolt_distance [GL] (232B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 23 children)
│   │   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 3 children)
│   │   ├── unknown (show unit help) [UI] (41B)
│   │   │     → Shows help for a unit type.
│   │   │   └── show_unit_type_picker [UI] (260B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 4 children)
│   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │     → Enqueues a multiplayer event message
│   │   │     (subtree shown above — 1 children)
│   │   ├── animate_combat_movement [UI] (2281B) *** STATE MUTATION ***
│   │   │     → Animates combat movement for up to 8 animation channels
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── wait_for_animation [UI] (109B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── blit_with_clip [UI] (265B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │     → Returns the remaining HP of a unit (max_hp - damage)
│   │   │     (subtree shown above — 1 children)
│   │   └── sum_stack_property [GL] (724B)
│   │         → Sums a property across all units in a stack
│   │         (subtree shown above — 2 children)
│   ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │     → Animates unit movement between tiles
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B)
│   │   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── flush_display [UI] (21B)
│   │   │     → Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── invalidate_region [UI] (180B)
│   │   │     → Invalidates a screen region
│   │   │     (subtree shown above — 2 children)
│   │   ├── set_rect_abs [UI] (42B)
│   │   │     → Wrapper for Win32 SetRect with absolute coordinates.
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── tile_to_screen [UI] (151B)
│   │   │     → Converts map tile coordinates to screen pixel coordinates
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_visible [UI] (99B)
│   │   │     → Checks if a tile is within the current viewport's visible area
│   │   │     (subtree shown above — 1 children)
│   │   ├── update_map_area_all_players [UI] (136B)
│   │   │     → Updates a map area for all active players (all viewports in MP).
│   │   │     (subtree shown above — 1 children)
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     → The main network polling function
│   │   ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │     → Draws a complete unit sprite at the given coordinates
│   │   │     (subtree shown above — 20 children)
│   │   ├── blit_with_clip [UI] (265B)
│   │   │     → Blits a source rect to dest rect with manual clipping
│   │   │     (subtree shown above — 1 children)
│   │   ├── calc_movement_step_size [UI] (47B)
│   │   │     → Calculates animation step size for unit movement based on current zoom level.
│   │   │   └── calc_scaled_step [UI] (38B)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── port_alloc_rect [UI] (58B)
│   │   │     → Allocates a port surface from width and height dimensions by creating a RECT and delegating to port_alloc.
│   │   │     (subtree shown above — 1 children)
│   │   └── port_destructor [UI] (114B)
│   │         → Destroys a port object: unlocks the surface if locked, frees the DIB, resets all fields, and clears the singleton poi...
│   │         (subtree shown above — 4 children)
│   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │     → Checks whether civ param_1 is allowed to attack civ param_2 given current treaties
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   └── check_can_declare_war [GL] (365B)
│   │         → Checks if a civ can declare war
│   │       └── civ_has_active_wonder [GL] (142B)
│   │             (subtree shown above — 1 children)
│   ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │     → The main city capture handler — one of the most complex functions in the binary
│   │     (subtree shown above — 65 children)
│   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │     → Handles a nuclear attack on a tile
│   │     (subtree shown above — 15 children)
│   ├── resolve_combat [GL] (15052B) *** STATE MUTATION ***
│   │     → The main combat resolution function
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │     → Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │     (subtree shown above — 1 children)
│   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │     → Major game logic function that processes visibility updates after a unit moves
│   │   │     (subtree shown above — 26 children)
│   │   ├── dialog_repaint_check [UI] (91B)
│   │   │     → Conditionally triggers a repaint if the current dialog matches the expected one.
│   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 2 children)
│   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │     → Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │     → Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status
│   │   │     (subtree shown above — 4 children)
│   │   ├── has_building [GL] (122B)
│   │   │     → Checks if a city has a specific building
│   │   │     (subtree shown above — 1 children)
│   │   ├── reassign_all_city_production [GL] (254B) *** STATE MUTATION ***
│   │   │     → Reassigns production for all cities belonging to a specific civ (param_1)
│   │   │     (subtree shown above — 2 children)
│   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   │     (subtree shown above — 1 children)
│   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── diplo_activate_alliance_wars [GL] (910B) *** STATE MUTATION ***
│   │   │     → When an alliance is activated, makes all allies of the aggressor declare war on the target
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │     → Handles the human player demanding help from an ally against a common enemy
│   │   │     (subtree shown above — 9 children)
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │     → Sets specified treaty flag bits between two civilizations
│   │   │     (subtree shown above — 2 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── wait_for_animation [UI] (109B)
│   │   │     → Busy-waits for a duration based on param_1, processing messages
│   │   │     (subtree shown above — 2 children)
│   │   ├── draw_unit_at_position [UI] (171B)
│   │   │     → Draws a specific unit (by index) at its map position, converting tile coords to screen coords first.
│   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 20 children)
│   │   ├── invalidate_single_tile [UI] (42B)
│   │   │     → Invalidates a single tile (radius 0) for repaint.
│   │   │   └── invalidate_tile_area [UI] (60B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     → Updates a single tile for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── update_radius1_all_players [UI] (124B)
│   │   │     → Updates radius-1 area around a tile for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── execute_airlift [GL] (460B) *** STATE MUTATION ***
│   │   │     → Executes an airlift operation — moves a unit from one city to another
│   │   │   ├── FUN_0000C494 [??]
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── unknown (show improvement help) [UI] (43B)
│   │   │     → Shows help text for an improvement via the help display system.
│   │   │     (subtree shown above — 1 children)
│   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │     → Enqueues a multiplayer event message
│   │   │     (subtree shown above — 1 children)
│   │   ├── ai_alert_nearby_units [AI] (470B) *** STATE MUTATION ***
│   │   │     → When a city is threatened (param_1 = city index), alerts all AI naval units within movement range to redirect toward ...
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── is_tile_ocean [GL] (57B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── ai_choose_government [AI] (558B) *** STATE MUTATION ***
│   │   │     → AI government selection logic
│   │   │     (subtree shown above — 2 children)
│   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │     → Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   │     (subtree shown above — 23 children)
│   │   ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │   │     → Animates unit movement between tiles
│   │   │     (subtree shown above — 17 children)
│   │   ├── diplomacy_check_treaty_violation [GL] (379B) *** STATE MUTATION ***
│   │   │     → Checks if an attack between param_1 and param_2 violates existing treaties
│   │   │     (subtree shown above — 4 children)
│   │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │   │     → Checks whether civ param_1 is allowed to attack civ param_2 given current treaties
│   │   │     (subtree shown above — 6 children)
│   │   ├── calc_unit_hit_points [GL] (119B) *** STATE MUTATION ***
│   │   │     → Calculates a unit's maximum hit points
│   │   ├── calc_unit_defense_strength [GL] (931B) *** STATE MUTATION ***
│   │   │     → Calculates unit defense strength considering terrain, fortification, city walls, unit type bonuses, and special comba...
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── calc_stack_best_defender [GL] (786B) *** STATE MUTATION ***
│   │   │     → Finds the best defender in a stack of units at a given tile
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── calc_unit_defense_strength [GL] (931B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── handle_unit_kill [GL] (411B) *** STATE MUTATION ***
│   │   │     → Handles a unit being killed in combat
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── event_check_unit_killed [GL] (231B) *** STATE MUTATION ***
│   │   │   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 11 children)
│   │   │   ├── record_combat_kill [GL] (762B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_foreground_color [UI] (92B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 2 children)
│   │   │   └── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 7 children)
│   │   ├── handle_stack_wipe [GL] (105B) *** STATE MUTATION ***
│   │   │     → Wipes out an entire stack of units
│   │   │   ├── handle_unit_kill [GL] (411B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── handle_unit_promotion [GL] (322B) *** STATE MUTATION ***
│   │   │     → Promotes a unit to veteran status
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 1 children)
│   │   ├── animate_combat_movement [UI] (2281B) *** STATE MUTATION ***
│   │   │     → Animates combat movement for up to 8 animation channels
│   │   │     (subtree shown above — 14 children)
│   │   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │   │     → Handles a nuclear attack on a tile
│   │   │     (subtree shown above — 15 children)
│   │   ├── scramble_defenders_to_tile [GL] (1084B) *** STATE MUTATION ***
│   │   │     → Scrambles nearby defensive units to intercept an attack on a tile
│   │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── debug_show_message [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── draw_number_on_map [UI] (346B) *** STATE MUTATION ***
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── get_path_cost [GL] (88B)
│   │   │   │   ├── set_path_cost [GL] (91B) *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] (253B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │   │         (subtree shown above — 2 children)
│   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── check_tile_trespass [GL] (245B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_tile_city_radius_owner [GL] (42B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── execute_paradrop [GL] (2572B) *** STATE MUTATION ***
│   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 26 children)
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── set_paradrop_range [GL] (31B) *** STATE MUTATION ***
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 17 children)
│   │   │   │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 65 children)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 6 children)
│   │   │   │   ├── clear_stack_visibility [GL] (88B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── clear_unit_visibility [GL] (39B) *** STATE MUTATION ***
│   │   │   │   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   │   └── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 12 children)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_unit_owner_at [GL] (66B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── get_tile_controller [GL] (72B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_city_owner_at [GL] (111B)
│   │   │         (subtree shown above — 3 children)
│   │   ├── refresh_combat_tiles [UI] (68B)
│   │   │     → Refreshes display tiles for two map positions after combat
│   │   │   └── update_map_area_all_players [UI] (136B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── get_unit_max_hp [GL] (45B)
│   │   │     → Returns the maximum hit points for a unit based on its type.
│   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │     → Returns the remaining HP of a unit (max_hp - damage)
│   │   │     (subtree shown above — 1 children)
│   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   │     (subtree shown above — 4 children)
│   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │     → Returns remaining movement points (total - spent)
│   │   │     (subtree shown above — 1 children)
│   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │   │     (subtree shown above — 3 children)
│   │   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │   │     → Relocates all units in a stack to a new position.
│   │   │     (subtree shown above — 4 children)
│   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │     → Deletes a unit
│   │   │     (subtree shown above — 7 children)
│   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │     → Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask)
│   │   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │   │     → Stacks a unit (puts it into storage)
│   │   │     (subtree shown above — 6 children)
│   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │     → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │   │     (subtree shown above — 1 children)
│   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │     → Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility map.
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_unit_owner_at [GL] (66B)
│   │   │     → Returns the civ with units at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   ├── process_goody_hut [GL] (3404B) *** STATE MUTATION ***
│   │     → Processes a goody hut encounter
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │     → Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │     → Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status
│   │   │     (subtree shown above — 4 children)
│   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │     → Sets or clears a building bit in a city's building bitfield.
│   │   │     (subtree shown above — 1 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── update_radius1_all_players [UI] (124B)
│   │   │     → Updates radius-1 area around a tile for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │     → Master handler for when a civilization discovers a new technology
│   │   │     (subtree shown above — 35 children)
│   │   ├── can_research_tech [GL] (156B)
│   │   │     → Checks if a civilization can research a specific technology
│   │   │   └── civ_has_tech [GL] (181B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │   │     → Opens the city window for a specific city, handling disorder state
│   │   │     (subtree shown above — 8 children)
│   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │     → Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   │     (subtree shown above — 23 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── create_unit [GL] (1675B) *** STATE MUTATION ***
│   │   │     → Creates a new unit of the specified type for a given civilization at a map position
│   │   │     (subtree shown above — 9 children)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │   │     (subtree shown above — 1 children)
│   │   ├── (get_tile_fertility_or_city_radius) [GL] (100B)
│   │   │     → Returns city_radius_owner if nonzero; otherwise returns fertility (clamped: if 0 < fertility < 9, returns 8).
│   │   │   ├── get_tile_city_radius_owner [GL] (42B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_tile_fertility [GL] (42B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   └── get_unit_owner_at [GL] (66B)
│   │         → Returns the civ with units at a tile, or -1
│   │         (subtree shown above — 2 children)
│   ├── claim_adjacent_ocean_tiles [GL] (306B) *** STATE MUTATION ***
│   │     → Claims adjacent ocean tiles for a civilization when it builds on a coast
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── reveal_tile_for_civ [GL] (188B) *** STATE MUTATION ***
│   │   │     → Reveals a map tile at (param_1, param_2) for civilization param_3
│   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 2 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── update_map_area_all_players [UI] (136B)
│   │   │     → Updates a map area for all active players (all viewports in MP).
│   │   │     (subtree shown above — 1 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_unit_owner_at [GL] (66B)
│   │   │     → Returns the civ with units at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │     → Begins a batched map update session for multiplayer
│   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │         → Ends a batched map update
│   │         (subtree shown above — 2 children)
│   ├── handle_caravan_arrival [MIXED] (1831B) *** STATE MUTATION ***
│   │     → Handles a caravan/freight unit arriving at a destination city
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── display_improvement [UI] (33B)
│   │   │     → Adds an improvement/government icon to the text buffer.
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │     → Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │     (subtree shown above — 1 children)
│   │   ├── dialog_set_title [UI] (41B)
│   │   │     → Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── process_caravan_arrival [GL] (3144B) *** STATE MUTATION ***
│   │   │     → Processes a caravan/freight unit arriving at a destination city
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── establish_trade_route [GL] (765B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   ├── bit_index_to_byte_mask [GL] (45B)
│   │   │   │   │   ├── shift_by_signed [GL] (98B)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── set_trade_route [GL] (103B) *** STATE MUTATION ***
│   │   │   │   └── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │   │       ├── is_tile_valid [GL] (80B)
│   │   │   │       ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 20 children)
│   │   │   │       ├── wrap_x [GL] (94B)
│   │   │   │       ├── tile_distance_xy [GL] (157B)
│   │   │   │       ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── get_city_owner_at [GL] (111B)
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       ├── get_tile_controller [GL] (72B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       └── get_tile_improvements [GL] (39B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 8 children)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── calc_tech_cost [GL] (1003B)
│   │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 23 children)
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_add_edit_field [UI] (412B)
│   │   │     → Adds a text edit field to a popup dialog
│   │   ├── popup_add_button [UI] (360B)
│   │   │     → Adds a button to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   └── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │         → Deletes a unit and refreshes the map display at its former position
│   │         (subtree shown above — 7 children)
│   ├── mp_lock_map [GL] (971B) *** STATE MUTATION ***
│   │     → Locks map tiles for multiplayer movement synchronization
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │         → The main network polling function
│   ├── mp_unlock_map [GL] (324B) *** STATE MUTATION ***
│   │     → Unlocks map tiles after multiplayer movement completes
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │         → The main network polling function
│   ├── spaceship_ai_should_start [AI] (583B) *** STATE MUTATION ***
│   │     → Determines if an AI civ should start building spaceship parts
│   │     (subtree shown above — 3 children)
│   ├── wrap_x [GL] (94B)
│   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   ├── tile_distance_xy [GL] (157B)
│   │     → Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`
│   ├── get_unit_max_hp [GL] (45B)
│   │     → Returns the maximum hit points for a unit based on its type.
│   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │     → Returns the remaining HP of a unit (max_hp - damage)
│   │     (subtree shown above — 1 children)
│   ├── calc_unit_movement_points [GL] (516B)
│   │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │     (subtree shown above — 4 children)
│   ├── get_unit_moves_remaining [GL] (69B)
│   │     → Returns remaining movement points (total - spent)
│   │     (subtree shown above — 1 children)
│   ├── get_next_unit_in_stack [GL] (65B)
│   │     → Returns the next unit in the stack linked list, or -1 if at end
│   │     (subtree shown above — 1 children)
│   ├── get_first_unit_in_stack [GL] (118B)
│   │     → Follows prev pointers to find the first unit in the stack.
│   │     (subtree shown above — 1 children)
│   ├── find_unit_stack_at_xy [GL] (231B)
│   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │     (subtree shown above — 3 children)
│   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │     → Sets a unit's order to "goto" (3)
│   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │     → Moves a unit from its current position to a new position by picking it up and putting it down
│   │     (subtree shown above — 6 children)
│   ├── move_unit_to_bottom [GL] (577B) *** STATE MUTATION ***
│   │     → Moves a unit to the bottom of its stack (last position)
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     → The main network polling function
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     → Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (subtree shown above — 3 children)
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     → Returns the next unit in the stack linked list, or -1 if at end
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_last_unit_in_stack [GL] (118B)
│   │   │     → Follows next pointers to find the last unit in the stack.
│   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 3 children)
│   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │     → Follows prev pointers to find the first unit in the stack.
│   │   │     (subtree shown above — 1 children)
│   │   └── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │         → Removes a unit from its map tile stack
│   │         (subtree shown above — 6 children)
│   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │     → Relocates all units in a stack to a new position.
│   │     (subtree shown above — 4 children)
│   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │     → Deletes a unit
│   │     (subtree shown above — 7 children)
│   ├── clear_stack_visibility [GL] (88B) *** STATE MUTATION ***
│   │     → Clears visibility for all units in a stack.
│   │     (subtree shown above — 3 children)
│   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │     → Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask)
│   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │     → Sets visibility for all units in a stack to be seen by a specific civ.
│   │     (subtree shown above — 3 children)
│   ├── check_zoc_violation [GL] (407B) *** STATE MUTATION ***
│   │     → Checks if a unit at (param_1, param_2) moving for civ param_3 would violate zone-of-control rules
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   └── get_unit_owner_at [GL] (66B)
│   │         → Returns the civ with units at a tile, or -1
│   │         (subtree shown above — 2 children)
│   ├── check_zoc_if_no_city [GL] (86B) *** STATE MUTATION ***
│   │     → Checks ZOC only if there's no city at the location
│   │   ├── check_adjacent_enemy_continent [GL] (297B) *** STATE MUTATION ***
│   │   │     → Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean type match).
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │         (subtree shown above — 2 children)
│   │   └── get_city_owner_at [GL] (111B)
│   │         → Returns the city-owning civ at a tile, or -1
│   │         (subtree shown above — 3 children)
│   ├── set_stack_visibility_mask [GL] (90B) *** STATE MUTATION ***
│   │     → OR's a visibility bitmask into every unit in a stack.
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     → Returns the next unit in the stack linked list, or -1 if at end
│   │   │     (subtree shown above — 1 children)
│   │   └── get_first_unit_in_stack [GL] (118B)
│   │         → Follows prev pointers to find the first unit in the stack.
│   │         (subtree shown above — 1 children)
│   ├── sum_stack_property [GL] (724B)
│   │     → Sums a property across all units in a stack
│   │     (subtree shown above — 2 children)
│   ├── count_units_by_role [GL] (120B)
│   │     → Counts units in a stack that have a specific role.
│   │     (subtree shown above — 2 children)
│   ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │     → Loads ground/air units onto a transport ship
│   │     (subtree shown above — 12 children)
│   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │     → Stacks a unit (puts it into storage)
│   │     (subtree shown above — 6 children)
│   ├── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│   │     → Safely deletes a unit, handling the case where it's a ship carrying units
│   │     (subtree shown above — 10 children)
│   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │     → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │     (subtree shown above — 1 children)
│   ├── get_tile_ptr [GL] (90B)
│   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │     (subtree shown above — 1 children)
│   ├── get_tile_terrain_raw [GL] (41B)
│   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │     (subtree shown above — 1 children)
│   ├── get_tile_continent [GL] (39B)
│   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │     (subtree shown above — 1 children)
│   ├── get_tile_explored [GL] (71B)
│   │     → Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │     (subtree shown above — 1 children)
│   ├── get_city_owner_at [GL] (111B)
│   │     → Returns the city-owning civ at a tile, or -1
│   │     (subtree shown above — 3 children)
│   ├── get_fortress_owner_at [GL] (77B)
│   │     → Returns the fortress-owning civ at a tile, or -1
│   │     (subtree shown above — 2 children)
│   ├── get_tile_controller [GL] (72B)
│   │     → Returns the controlling civ at a tile — city owner first, then unit owner.
│   │     (subtree shown above — 2 children)
│   ├── check_tile_goody_hut [GL] (229B)
│   │     → Checks if a tile has a goody hut (village)
│   │     (subtree shown above — 3 children)
│   ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │     → Sets or clears improvement bits on a tile
│   │     (subtree shown above — 3 children)
│   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │     → Sets or clears visibility bits (byte 4) on a tile
│   │     (subtree shown above — 3 children)
│   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │     → Begins a batched map update session for multiplayer
│   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│         → Ends a batched map update
│         (subtree shown above — 2 children)
├── spaceship_view_menu [UI] (377B) *** STATE MUTATION ***
│     → Shows the "View Spaceships" menu
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │     (subtree shown above — 1 children)
│   ├── open_list_dialog [UI] (47B)
│   │     → Opens a list dialog with the given title and flags.
│   │     (subtree shown above — 1 children)
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman")
│   ├── has_spaceship_built [GL] (47B)
│   │     → Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   ├── load_civ_power_values [GL] (90B) *** STATE MUTATION ***
│   │     → Loads 6 power values from a civ's data (at offset 0x594*param_1 into per-civ data) into global array DAT_006a5b10.
│   ├── show_wonder_or_advance [UI] (268B)
│   │     → Shows either a wonder movie (negative param) or advance animation (positive param)
│   │   ├── wonder_win_init [UI] (677B) *** STATE MUTATION ***
│   │   │     → Constructor/initializer for the wonder window object
│   │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── init_render_surface [UI] (274B)
│   │   │   ├── unknown (pedia object initializer) [UI] (34B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── port_set_color [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── palette_init [UI] (145B)
│   │   │         (subtree shown above — 3 children)
│   │   ├── wonder_win_create [UI] (524B)
│   │   │     → Creates the wonder window — loads the DLL resource, builds the info text, determines display mode (0=normal, 1=has vi...
│   │   │   ├── set_window_style_flags [UI] (43B)
│   │   │   │   └── load_and_store_cursor [UI] (136B)
│   │   │   ├── pedia_set_resource [UI] (67B)
│   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   ├── wonder_win_create_dialog [UI] (322B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── update_palette [UI] (43B)
│   │   │   │   │   └── FUN_0000C280 [??]
│   │   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── create_offscreen_surface_b [UI] (119B)
│   │   │   │   │     (subtree shown above — 5 children)
│   │   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   └── surface_init_8 [UI] (96B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── build_wonder_info_text [UI] (1366B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   └── spaceship_get_max_component [GL] (264B) *** STATE MUTATION ***
│   │   │   ├── wonder_win_draw_buttons [UI] (826B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── FUN_004D56FD [??]
│   │   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   └── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── wonder_win_setup_hotspots [UI] (184B)
│   │   │   │   └── create_button_hotspot [UI] (54B)
│   │   │   │       └── add_click_region [UI] (153B) *** STATE MUTATION ***
│   │   │   └── spaceship_recalc_stats [GL] (1297B) *** STATE MUTATION ***
│   │   │       ├── calc_year_from_turn [GL] (540B) *** STATE MUTATION ***
│   │   │       ├── has_spaceship_launched [GL] (47B)
│   │   │       ├── civ_has_tech [GL] (181B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── spaceship_get_clamped_count [GL] (89B)
│   │   │       │   └── spaceship_get_max_component [GL] (264B) *** STATE MUTATION ***
│   │   │       └── spaceship_calc_population_capacity [GL] (90B)
│   │   ├── show_advance_animation [UI] (1232B) *** STATE MUTATION ***
│   │   │     → Main advance animation display function
│   │   │   ├── manage_window_show [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── start_cursor_blink [UI] (39B)
│   │   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   │   └── capture_mouse [UI] (29B)
│   │   │   ├── stop_cursor_blink [UI] (39B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── init_palette_system [UI] (21B)
│   │   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── load_civ_power_values [GL] (90B) *** STATE MUTATION ***
│   │   │   ├── wonder_win_draw_title [UI] (216B) *** STATE MUTATION ***
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── build_advance_scene [UI] (12822B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── wonder_win_draw_title [UI] (216B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 9 children)
│   │   │   │   ├── spaceship_get_clamped_count [GL] (89B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │   │     (subtree shown above — 6 children)
│   │   │   │   ├── port_set_color [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── wonder_win_show_starfield [UI] (1046B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── advance_year_display [UI] (479B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   └── text_newline [UI] (29B)
│   │   │   │   ├── wonder_win_draw_next_char [UI] (986B)
│   │   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   │   ├── FUN_0000858E [??]
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── init_palette_system [UI] (21B)
│   │   │   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   ├── port_draw_text_at [UI] (104B)
│   │   │   │   │   ├── port_get_pixel_ptr [UI] (45B)
│   │   │   │   │   └── port_alloc_variant_b [UI] (93B)
│   │   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── play_wonder_video [UI] (769B)
│   │   │   │   ├── set_callback_paint [UI] (45B)
│   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── start_cursor_blink [UI] (39B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── stop_cursor_blink [UI] (39B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── init_palette_system [UI] (21B)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │   │   │   ├── resume_music [UI] (85B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── port_set_color [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── modal_dialog_run [UI] (283B)
│   │   │   │         (subtree shown above — 4 children)
│   │   │   ├── wonder_win_setup_hotspots [UI] (184B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── wonder_win_draw_initial_buttons [UI] (128B)
│   │   │   │   ├── wonder_win_draw_button_left [UI] (300B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── init_palette_system [UI] (21B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── wonder_win_draw_button_right [UI] (286B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── init_palette_system [UI] (21B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   └── port_fill_rect [UI] (236B)
│   │   │   │         (subtree shown above — 7 children)
│   │   │   ├── wonder_win_draw_button_left [UI] (300B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── wonder_win_draw_button_right [UI] (286B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] (815B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── change_city_production [MIXED] (2572B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 13 children)
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── show_wonder_or_advance [UI] (268B)
│   │   │   │   │     (cycle — already in call path)
│   │   │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── modal_dialog_run [UI] (283B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │         (subtree shown above — 1 children)
│   │   └── show_wonder_movie [UI] (154B)
│   │         → Shows a wonder movie by first refreshing the display, playing the video (via play_wonder_video), then showing the adv...
│   │       ├── manage_window_show [UI] (37B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── init_palette_system [UI] (21B)
│   │       ├── unknown (pedia set and display resource) [UI] (45B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── unknown (manage pedia window) [UI] (37B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── show_advance_animation [UI] (1232B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 20 children)
│   │       └── play_wonder_video [UI] (769B)
│   │             (subtree shown above — 13 children)
│   ├── spaceship_dialog [UI] (1567B) *** STATE MUTATION ***
│   │     → Displays the spaceship status dialog for a civ
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_bold [UI] (29B)
│   │   │     → Begins bold text mode in the global text buffer.
│   │   ├── text_end_bold [UI] (29B)
│   │   │     → Ends bold text mode in the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── display_improvement [UI] (33B)
│   │   │     → Adds an improvement/government icon to the text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │     → Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── dialog_set_title [UI] (41B)
│   │   │     → Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     → Returns the noun name for a civilization (e.g., "Romans")
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── has_spaceship_launched [GL] (47B)
│   │   │     → Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── spaceship_get_max_component [GL] (264B) *** STATE MUTATION ***
│   │   │     → Gets the maximum allowed count for a spaceship component type (param_2: 0=structural, 1-2=component, 3-5=module)
│   │   ├── spaceship_recalc_stats [GL] (1297B) *** STATE MUTATION ***
│   │   │     → Recalculates all spaceship statistics for a civ: mass, fuel ratio, energy ratio, life support ratio, flight time, suc...
│   │   │     (subtree shown above — 5 children)
│   │   ├── spaceship_launch (internal — called after all checks pass) [GL] (815B) *** STATE MUTATION ***
│   │   │     → Launches a civ's spaceship
│   │   │     (subtree shown above — 9 children)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │     → Closes a popup dialog by destroying it and clearing its list control.
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   └── popup_add_action_button_label [UI] (119B)
│   │         → Adds an action button label string to the popup dialog
│   ├── unknown (popup close thunk) [FW] (12B)
│   │     → Popup dialog close thunk.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │         (subtree shown above — 1 children)
│   ├── unknown (SEH unwind) [FW] (14B)
│   │     → SEH unwind — restores FS:[0].
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │     → Closes a popup dialog by destroying it and clearing its list control.
│   │     (subtree shown above — 1 children)
│   └── popup_add_radio_option [UI] (566B)
│         → Adds a radio button option to the popup dialog
│         (subtree shown above — 2 children)
└── editor_launch [UI] (89B)
      → Launches the unit type editor.
    ├── create_editor_object [FW] (498B)
    │     → Constructor for the tech editor object
    │     (subtree shown above — 1 children)
    ├── editor_init_window [UI] (2484B) *** STATE MUTATION ***
    │     → Creates and runs the full unit type editor window
    │   ├── set_callback_0x44 [UI] (45B)
    │   │     → Sets a callback handler at this+0x44.
    │   ├── show_window_wrapper [UI] (33B)
    │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
    │   │     (subtree shown above — 1 children)
    │   ├── set_rect_wh [UI] (48B)
    │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
    │   ├── process_messages [UI] (21B)
    │   │     → Processes pending Windows messages (message pump)
    │   │     (subtree shown above — 1 children)
    │   ├── get_font_height [UI] (28B)
    │   │     → Returns the font height from the font object at this+4.
    │   ├── set_dialog_enabled [UI] (36B)
    │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
    │   ├── create_text_button [UI] (133B)
    │   │     → Creates a text button control
    │   │     (subtree shown above — 3 children)
    │   ├── set_button_handler [UI] (45B)
    │   │     → Sets a handler callback on the button's window object at offset +0xc0.
    │   │     (subtree shown above — 1 children)
    │   ├── set_button_click_callback [UI] (33B)
    │   │     → Sets the click callback function pointer for a button control.
    │   ├── set_editor_font [UI] (93B)
    │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
    │   │     (subtree shown above — 3 children)
    │   ├── set_combo_selection [UI] (43B)
    │   │     → Sets the selected index of a combo box.
    │   │     (subtree shown above — 1 children)
    │   ├── init_editor_scrollbar [UI] (34B)
    │   │     → Gets scrollbar width by calling FUN_00407f90.
    │   │     (subtree shown above — 1 children)
    │   ├── widget_get_height [UI] (34B)
    │   │     → Returns the height of a widget by calling thunk_FUN_00407fc0.
    │   │     (subtree shown above — 1 children)
    │   ├── dialog_create [UI] (588B)
    │   │     → Creates and initializes a dialog window with title, flags, position, and size
    │   │     (subtree shown above — 6 children)
    │   ├── editor_save_unit_types_to_buffer [UI] (544B) *** STATE MUTATION ***
    │   │     → Copies unit type data from the game's unit type tables into the editor buffer arrays for editing
    │   ├── FUN_005AF343 [??] (353B)
    │   ├── (editor_toggle_buttons) [UI] (196B)
    │   │     → Toggles enable/disable state of two editor buttons based on a combobox selection index (0, 1, or 2).
    │   │   ├── control_invalidate [UI] (65B)
    │   │   │     (subtree shown above — 2 children)
    │   │   └── get_combo_selection [UI] (37B)
    │   │         (subtree shown above — 1 children)
    │   ├── editor_populate_listbox [UI] (1111B) *** STATE MUTATION ***
    │   │     → Creates and populates a listbox control for the unit editor
    │   │   ├── set_rect_wh [UI] (48B)
    │   │   ├── create_combo_control [UI] (101B)
    │   │   │     (subtree shown above — 3 children)
    │   │   ├── set_combo_data_source [UI] (48B)
    │   │   │     (subtree shown above — 2 children)
    │   │   ├── add_combo_item [UI] (49B)
    │   │   │     (subtree shown above — 1 children)
    │   │   └── set_combo_callback [UI] (33B)
    │   ├── (editor_create_spinner) [UI] (244B)
    │   │     → Creates a numeric spinner control at a position determined by a layout table, with range 0-3.
    │   │   ├── set_rect_wh [UI] (48B)
    │   │   ├── create_edit_control [UI] (130B)
    │   │   │     (subtree shown above — 4 children)
    │   │   ├── set_edit_max_chars [UI] (43B)
    │   │   │     (subtree shown above — 1 children)
    │   │   └── set_control_callback [UI] (33B)
    │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
    │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
    │   │     (subtree shown above — 2 children)
    │   ├── load_gif_file [UI] (1353B)
    │   │     → Loads a GIF image from a file
    │   │     (subtree shown above — 7 children)
    │   ├── modal_dialog_run [UI] (283B)
    │   │     → Runs a modal dialog loop
    │   │     (subtree shown above — 4 children)
    │   └── palette_init [UI] (145B)
    │         → Initializes the palette object
    │         (subtree shown above — 3 children)
    ├── (editor_launch_dtor) [FW] (12B)
    │     → Destructor for editor property sheet.
    ├── (SEH_cleanup_1A98) [FW] (14B)
    │     → SEH frame cleanup.
    └── set_active_surface [UI] (74B) *** STATE MUTATION ***
          → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
          (subtree shown above — 2 children)
```

---

## map_ascii (`00411F91`, 1203B)

Reachable: 1027 functions, 286 state-mutating

```
map_ascii [MIXED] (1203B) *** STATE MUTATION ***
  → Main keyboard character handler for the map window
├── FUN_0000B9A4 [??]
├── FUN_0000BA07 [??]
├── FUN_0000BA6A [??]
├── FUN_0000BC4F [??]
├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION ***
│     → Shows the tax rate dialog for a civ
│   ├── FUN_00009429 [??]
│   ├── open_tax_rate_dialog [MIXED] (4140B) *** STATE MUTATION ***
│   │     → Creates and runs the tax rate adjustment dialog
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │   └── show_window_inner [UI] (38B)
│   │   │       ├── manage_window_show [UI] (37B)
│   │   │       │   └── FUN_0000C40A [??]
│   │   │       └── surface_list_find_dirty [UI] (174B)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_max_tax_rate [GL] (156B)
│   │   │     → Returns the maximum tax/luxury/science rate allowed for a civ based on its government type
│   │   ├── balance_tax_rates [GL] (293B) *** STATE MUTATION ***
│   │   │     → Balances three tax rate sliders (tax, luxury, science) to sum to 10, respecting individual maximums and lock flags
│   │   ├── taxrate_recalc_totals [MIXED] (848B) *** STATE MUTATION ***
│   │   │     → Recalculates tax/luxury/science income totals for the tax rate dialog
│   │   │   ├── has_building [GL] (122B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   │   └── is_wonder_obsolete [GL] (120B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   └── get_wonder_city [GL] (57B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   │   └── count_worker_tiles_with_status [GL] (87B)
│   │   │   │       └── get_worker_tile_status [GL] (68B)
│   │   │   └── calc_building_upkeep_cost [GL] (305B)
│   │   │       ├── civ_has_active_wonder [GL] (142B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       └── civ_has_tech [GL] (181B)
│   │   │             (subtree shown above — 1 children)
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │   └── FUN_0000BA4F [??]
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B)
│   │   │     → Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── FUN_0000858E [??]
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │   ├── FUN_00009740 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── FUN_0000944B [??]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_owner [UI] (45B)
│   │   │     → Sets the button's owner/parent reference
│   │   │   └── get_window_object [UI] (28B)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │   └── get_window_object [UI] (28B)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── create_checkbox [UI] (167B)
│   │   │     → Creates a checkbox control
│   │   │   ├── FUN_0000BF40 [??]
│   │   │   ├── FUN_0000C0F0 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_checkbox_callback [UI] (33B)
│   │   │     → Sets the checkbox callback function pointer.
│   │   ├── set_checkbox_value [UI] (33B)
│   │   │     → Sets the checkbox checked/unchecked value.
│   │   ├── create_scrollbar [UI] (124B)
│   │   │     → Creates a scrollbar control
│   │   │   ├── FUN_0000CF17 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │       └── scrollbar_set_pos [UI] (39B)
│   │   │           └── FUN_0000D149 [??]
│   │   ├── scrollbar_set_position [UI] (52B)
│   │   │     → Sets the scrollbar position value and updates the scrollbar control.
│   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── scrollbar_set_range [UI] (47B)
│   │   │     → Sets the scrollbar min/max range.
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │     → Sets the scrollbar change callback.
│   │   ├── dialog_repaint_check [UI] (91B)
│   │   │     → Conditionally triggers a repaint if the current dialog matches the expected one.
│   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │       ├── end_paint [UI] (32B)
│   │   │       │   └── invalidate_region [UI] (180B)
│   │   │       └── call_refresh_callback [UI] (47B)
│   │   ├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│   │   │     → Saves CIV2.DAT preferences file
│   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │     → Entry point for full city production calculation
│   │   │   ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_worked [GL] (62B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION ***
│   │   │   │   ├── check_unit_support [GL] (281B) *** STATE MUTATION ***
│   │   │   │   ├── calc_food_box_size [GL] (512B) *** STATE MUTATION ***
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   └── recalc_city_all [GL] (76B) *** STATE MUTATION ***
│   │   │       ├── assign_worker_tiles [GL] (2002B) *** STATE MUTATION ***
│   │   │       │   ├── is_tile_worked [GL] (62B)
│   │   │       │   ├── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│   │   │       │   ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION ***
│   │   │       │   ├── clear_and_check_worked_tiles [GL] (115B) *** STATE MUTATION ***
│   │   │       │   └── unknown (get_city_tile_flag) [GL] (29B)
│   │   │       ├── sync_worker_tile_status [GL] (155B) *** STATE MUTATION ***
│   │   │       │   ├── set_worker_tile_status [GL] (93B) *** STATE MUTATION ***
│   │   │       │   └── get_worker_tile_status [GL] (68B)
│   │   │       ├── calc_city_production [GL] (1053B) *** STATE MUTATION ***
│   │   │       │   ├── has_building [GL] (122B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_tech [GL] (181B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── calc_corruption [GL] (890B) *** STATE MUTATION ***
│   │   │       ├── calc_happiness [GL] (2627B) *** STATE MUTATION ***
│   │   │       │   ├── has_building [GL] (122B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION ***
│   │   │       │   ├── get_wonder_city [GL] (57B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 8 children)
│   │   │       │   ├── civ_has_tech [GL] (181B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── adjust_happy_unhappy [GL] (453B) *** STATE MUTATION ***
│   │   │       │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 5 children)
│   │   │       │   ├── calc_movement_cost [GL] (94B)
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── find_unit_stack_at_xy [GL] (231B)
│   │   │       │         (subtree shown above — 3 children)
│   │   │       └── calc_trade_route_income [GL] (378B) *** STATE MUTATION ***
│   │   ├── citywin_refresh_top_panels [UI] (153B)
│   │   │     → Refreshes the top panels of the city window (citizens, resources, map)
│   │   │   ├── FUN_00008ADC [??]
│   │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── draw_citizens_row [UI] (577B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── draw_text_centered [UI] (46B)
│   │   │   │   │   └── draw_text_centered [UI] (139B)
│   │   │   │   ├── close_dialog [UI] (94B) *** STATE MUTATION ***
│   │   │   │   │   └── remove_click_region [UI] (107B) *** STATE MUTATION ***
│   │   │   │   ├── citywin_prepare_panel [UI] (77B)
│   │   │   │   │   ├── citywin_blit_panel [UI] (129B)
│   │   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   └── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   ├── citywin_draw_citizen_icons [UI] (1186B)
│   │   │   │   │   ├── get_city_epoch [GL] (158B)
│   │   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   ├── get_worker_tile_status [GL] (68B)
│   │   │   │   │   ├── scale_universal [UI] (67B)
│   │   │   │   │   ├── calc_icon_spacing [UI] (264B)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │   │   ├── invalidate_rect_region [UI] (78B)
│   │   │   │   │   └── add_click_region [UI] (153B) *** STATE MUTATION ***
│   │   │   │   ├── scale_universal [UI] (67B)
│   │   │   │   └── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   └── draw_resource_rows [UI] (9761B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── invalidate_region [UI] (180B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       ├── fill_rect_palette [UI] (50B)
│   │   │       │   └── fill_rect_xywh [UI] (63B)
│   │   │       ├── text_begin [UI] (29B)
│   │   │       ├── text_add_label_id [UI] (33B)
│   │   │       ├── text_newline [UI] (29B)
│   │   │       ├── text_begin_bold [UI] (29B)
│   │   │       ├── text_begin_italic [UI] (29B)
│   │   │       ├── text_end_italic [UI] (29B)
│   │   │       ├── text_add_number [UI] (33B)
│   │   │       ├── draw_text_at [UI] (42B)
│   │   │       │   └── draw_text_with_shadow [UI] (205B)
│   │   │       ├── draw_text_centered [UI] (46B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── draw_text_right_aligned [UI] (46B)
│   │   │       │   └── draw_text_right_aligned [UI] (131B)
│   │   │       ├── find_city_at [GL] (245B)
│   │   │       │   ├── is_tile_valid [GL] (80B)
│   │   │       │   └── get_city_owner_at [GL] (111B)
│   │   │       │         (subtree shown above — 3 children)
│   │   │       ├── close_dialog [UI] (94B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── scale_sprite [UI] (35B)
│   │   │       ├── render_tile [UI] (4431B) *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (80B)
│   │   │       │   ├── grassland_has_shield [GL] (72B)
│   │   │       │   ├── get_civ_background_color [UI] (92B)
│   │   │       │   ├── scale_sprite [UI] (35B)
│   │   │       │   ├── calc_coast_quadrants [UI] (386B) *** STATE MUTATION ***
│   │   │       │   ├── is_x_in_range [UI] (141B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── wrap_x [GL] (94B)
│   │   │       │   ├── diagonal_movement_cost [GL] (135B)
│   │   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │       │   │     (subtree shown above — 3 children)
│   │   │       │   ├── get_tile_ptr [GL] (90B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │       │   ├── get_tile_owner [GL] (100B)
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── get_tile_explored [GL] (71B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_city_owner_at [GL] (111B)
│   │   │       │   │     (subtree shown above — 3 children)
│   │   │       │   ├── check_tile_resource [GL] (281B)
│   │   │       │   ├── check_tile_goody_hut [GL] (229B)
│   │   │       │   ├── get_tile_improvements [GL] (39B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── port_copy_rect [UI] (282B)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── set_sprite_scale [UI] (33B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── reset_sprite_scale [UI] (28B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── is_tile_worked [GL] (62B)
│   │   │       ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── citywin_prepare_panel [UI] (77B)
│   │   │       │     (subtree shown above — 4 children)
│   │   │       ├── citywin_draw_citizen_icons_simple [UI] (540B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_worker_tile_status [GL] (68B)
│   │   │       │   ├── scale_universal [UI] (67B)
│   │   │       │   ├── calc_icon_spacing [UI] (264B)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── invalidate_rect_region [UI] (78B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── scale_universal [UI] (67B)
│   │   │       ├── calc_icon_spacing [UI] (264B)
│   │   │       ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │       │   ├── rect_get_width [UI] (27B)
│   │   │       │   ├── rect_get_height [UI] (28B)
│   │   │       │   ├── set_rect_wh [UI] (48B)
│   │   │       │   ├── is_tile_valid [GL] (80B)
│   │   │       │   ├── fill_surface_from_rect [UI] (71B)
│   │   │       │   ├── get_civ_background_color [UI] (92B)
│   │   │       │   ├── scale_sprite [UI] (35B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │   │       │   ├── select_display_unit [UI] (396B)
│   │   │       │   ├── get_civ_dark_color [UI] (92B)
│   │   │       │   ├── get_unit_max_hp [GL] (45B)
│   │   │       │   ├── get_fortress_owner_at [GL] (77B)
│   │   │       │   ├── get_tile_improvements [GL] (39B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── port_copy_rect [UI] (282B)
│   │   │       │   │     (subtree shown above — 7 children)
│   │   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── draw_city_sprite [UI] (1737B) *** STATE MUTATION ***
│   │   │       │   ├── set_rect_wh [UI] (48B)
│   │   │       │   ├── get_font_height [UI] (28B)
│   │   │       │   ├── measure_text_height [UI] (42B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── fill_surface_from_rect [UI] (71B)
│   │   │       │   │     (subtree shown above — 3 children)
│   │   │       │   ├── draw_border_rect [UI] (61B)
│   │   │       │   ├── draw_text_at [UI] (42B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_civ_background_color [UI] (92B)
│   │   │       │   ├── has_building [GL] (122B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── scale_sprite [UI] (35B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │       │   ├── civ_has_tech [GL] (181B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── get_civ_dark_color [UI] (92B)
│   │   │       │   ├── prepare_surface [UI] (24B)
│   │   │       │   ├── get_unit_owner_at [GL] (66B)
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │       │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │       │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │       │   ├── port_copy_rect [UI] (282B)
│   │   │       │   │     (subtree shown above — 7 children)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── wrap_x [GL] (94B)
│   │   │       ├── get_next_unit_in_stack [GL] (65B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── find_unit_stack_at_xy [GL] (231B)
│   │   │       │     (subtree shown above — 3 children)
│   │   │       ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │       ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │             (subtree shown above — 1 children)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │   ├── unknown (set_font_size) [UI] (43B)
│   │   │   │   └── set_callback_0x38 [UI] (40B)
│   │   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │   │   └── set_callback_0x3c [UI] (40B)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   │   └── swap_dc [UI] (43B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │   ├── FUN_00008BE1 [??]
│   │   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │   └── create_offscreen_surface_b [UI] (119B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── port_alloc_rect [UI] (58B)
│   │   │       │   └── port_alloc [UI] (325B)
│   │   │       ├── port_draw_text_rect [UI] (77B)
│   │   │       │   └── write_full_colortable [UI] (39B)
│   │   │       ├── surface_create_8param [UI] (85B)
│   │   │       │   ├── get_view_window_handle [UI] (28B)
│   │   │       │   ├── surface_init_8 [UI] (96B)
│   │   │       │   └── set_dialog_wndproc [UI] (55B)
│   │   │       └── set_window_data_and_wndproc [UI] (55B)
│   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │     → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION ***
│   │   │   ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   ├── draw_text_centered [UI] (46B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── draw_status_turn_info [UI] (474B)
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   │   └── port_set_rect [UI] (91B)
│   │   │   │   ├── draw_coordinate_text [UI] (132B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── format_unit_orders_text [UI] (450B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── unknown (string pool set) [UI] (33B)
│   │   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   │   ├── draw_hline [UI] (69B)
│   │   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── select_display_unit [UI] (396B)
│   │   │   │   │     (subtree shown above — 5 children)
│   │   │   │   ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 20 children)
│   │   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   │   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   └── port_set_rect [UI] (91B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   └── tile_bitmap [UI] (391B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── load_gif_resource [UI] (847B)
│   │   │     → Loads a GIF image from a resource
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   └── port_alloc [UI] (325B)
│   │   │   │         (subtree shown above — 10 children)
│   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   ├── palette_apply [UI] (90B)
│   │   │   │   │   ├── palette_generate_random_id [UI] (75B)
│   │   │   │   │   └── unknown (palette_update_entries) [UI] (60B)
│   │   │   │   └── palette_set_entry [UI] (316B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── flip_surface_vertical [UI] (249B)
│   │   │       └── get_pixel_buffer [UI] (39B)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │   ├── process_messages [UI] (21B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   ├── disable_parent_window [UI] (121B)
│   │   │   └── enable_parent_window [UI] (126B)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │       ├── FUN_0000E780 [??]
│   │       ├── palette_generate_random_id [UI] (75B)
│   │       └── unknown (palette_create) [UI] (60B)
│   ├── dialog_destroy_thunk [FW] (12B)
│   │     → Thunk that calls the dialog object destructor.
│   ├── show_tax_seh_epilog [FW] (14B)
│   │     → SEH epilog for show_tax_rate_dialog.
│   ├── dialog_object_constructor [FW] (196B)
│   │     → Constructs a dialog object
│   │   └── dialog_ctor [UI] (146B)
│   │         → Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │       └── init_sprite_surface_mgr [UI] (133B)
│   │           └── init_sprite_cache [UI] (132B)
│   │               └── init_render_surface [UI] (274B)
│   └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│         → Central network message dispatcher
│       ├── invalidate_region [UI] (180B)
│       │     → Invalidates a screen region
│       │     (subtree shown above — 2 children)
│       ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│       │     → Sends a network message to a specific player
│       ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│       │     → Broadcasts a network message to all connected players
│       ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       │     → Initializes a network message header with magic bytes, message type, and default size.
│       ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│       │     → Initializes a network message with type, player name, and game version strings.
│       │   └── net_msg_init_with_version [GL] (94B)
│       │       └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── net_msg_init_with_version [GL] (94B)
│       │     → Initializes a network message header with version string at offset 0x10.
│       │     (subtree shown above — 1 children)
│       ├── unknown (init version message) [GL] (65B)
│       │     → Creates a type-2 network message (version info) with session data appended.
│       │   ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│       │   │     (subtree shown above — 1 children)
│       │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│       ├── unknown (init chat/popup message) [GL] (169B)
│       │     → Creates a type-0x2F network message with additional fields for chat or popup.
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── unknown (init type-4 message) [GL] (45B)
│       │     → Creates a type-4 network message header with size 0x280.
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── unknown (init type-6 message) [GL] (45B)
│       │     → Creates a type-6 network message header with size 0x21C.
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── unknown (init type-0x13 message) [GL] (60B)
│       │     → Creates a type-0x13 network message with session data
│       │   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│       ├── unknown (init type-0x69 message) [GL] (56B)
│       │     → Creates a type-0x69 (combat sync) message
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│       │     → Serializes 7 game state sections into a contiguous buffer with checksums
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   └── diff_engine_append_data [GL] (98B)
│       ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│       │     → Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   └── diff_engine_append_data [GL] (98B)
│       ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│       │     → Serializes all 24 game state sections with RLE compression
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   ├── diff_engine_calc_total_size [GL] (152B)
│       │   ├── diff_engine_append_data [GL] (98B)
│       │   └── rle_encode (unnamed) [GL] (588B)
│       ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│       │     → Serializes only game state sections whose checksums have changed since last serialization
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   ├── diff_engine_calc_total_size [GL] (152B)
│       │   └── diff_engine_append_data [GL] (98B)
│       ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│       │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│       │   ├── rect_get_width [UI] (27B)
│       │   ├── rect_get_height [UI] (28B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── get_font_height [UI] (28B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── get_civ_adjective_name [GL] (145B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── tile_bitmap [UI] (391B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── port_set_rect_from_self [UI] (63B)
│       │   ├── port_set_rect [UI] (91B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │     (subtree shown above — 3 children)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── scale_table_build_primary [UI] (657B)
│       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       │         (subtree shown above — 1 children)
│       └── netmgr_build_packet [GL] (405B) *** STATE MUTATION ***
│             → Builds a network packet by prepending a 0x2C-byte header to the payload data
│           └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
├── show_find_city_dialog [UI] (886B)
│     → Displays the "Find City" dialog that lists all known cities
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_label_id [UI] (33B)
│   │     → Appends a localized label (by ID) to the global text buffer.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   └── popup_show_modal [UI] (999B)
│   │         → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │       ├── flush_display [UI] (21B)
│   │       ├── process_messages [UI] (21B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_edit_text [UI] (43B)
│   │       │   └── FUN_00002D4D [??]
│   │       ├── init_palette_system [UI] (21B)
│   │       ├── unknown — manage window [UI] (37B)
│   │       │   └── FUN_0000C692 [??]
│   │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │       │   ├── unknown (get drawing context) [UI] (37B)
│   │       │   │   └── focus_and_raise_window [UI] (57B)
│   │       │   ├── widget_scrollbar_dtor [UI] (57B)
│   │       │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │       │   └── widget_dropdown_dtor [UI] (57B)
│   │       ├── popup_paint [UI] (1964B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── show_window_wrapper [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   ├── set_rect_wh [UI] (48B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── control_invalidate [UI] (65B)
│   │       │   │   ├── FUN_00008B00 [??]
│   │       │   │   └── FUN_00008B2D [??]
│   │       │   ├── draw_border_rect [UI] (61B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── scale_sprite [UI] (35B)
│   │       │   ├── set_sprite_scale [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   │   └── rect_get_width [UI] (27B)
│   │       │   ├── widget_get_height [UI] (34B)
│   │       │   │   └── rect_get_height [UI] (28B)
│   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── popup_get_padded_height [UI] (42B)
│   │       │   ├── popup_render_label [UI] (226B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   └── port_fill_rect_pattern [UI] (201B)
│   │       │   │         (subtree shown above — 3 children)
│   │       │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_render_text_at_offset [UI] (61B)
│   │       │   │   └── unknown (popup_draw_icon) [UI] (55B)
│   │       │   ├── popup_layout_dialog [UI] (4785B) *** STATE MUTATION ***
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_calc_max_text_height [UI] (132B)
│   │       │   │   ├── popup_get_line_height [UI] (78B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B)
│   │       │   │   ├── popup_calc_button_area_height [UI] (46B)
│   │       │   │   ├── popup_calc_text_width [UI] (51B)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_render_label [UI] (226B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── popup_has_negative_line_count [UI] (83B)
│   │       │   │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_get_radio_page_number [UI] (56B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── blit_rect_to_rect [UI] (95B)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   └── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── popup_redraw_visible_items [UI] (660B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── invalidate_region [UI] (180B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── draw_border_rect [UI] (61B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_draw_item [UI] (706B)
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   └── port_set_rect [UI] (91B)
│   │       │   ├── popup_create_window [UI] (693B)
│   │       │   │   ├── set_callback_0x44 [UI] (45B)
│   │       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── unknown (set_font_size) [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── create_offscreen_surface [UI] (115B) *** STATE MUTATION ***
│   │       │   │   └── create_offscreen_surface_b [UI] (119B)
│   │       │   │         (subtree shown above — 5 children)
│   │       │   ├── popup_init_controls [UI] (6616B) *** STATE MUTATION ***
│   │       │   │   ├── set_rect_wh [UI] (48B)
│   │       │   │   ├── create_text_button [UI] (133B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── set_button_owner [UI] (45B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_button_handler [UI] (45B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_button_click_callback [UI] (33B)
│   │       │   │   ├── create_checkbox [UI] (167B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── set_checkbox_value [UI] (33B)
│   │       │   │   ├── create_scrollbar [UI] (124B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── scrollbar_set_position [UI] (52B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scrollbar_set_range [UI] (47B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scrollbar_set_callback [UI] (33B)
│   │       │   │   ├── set_edit_max_chars [UI] (43B)
│   │       │   │   ├── create_listbox_control [UI] (121B)
│   │       │   │   ├── add_listbox_item [UI] (49B)
│   │       │   │   ├── disable_civ_slot [UI] (133B) *** STATE MUTATION ***
│   │       │   │   ├── unknown (set selected item) [UI] (33B) *** STATE MUTATION ***
│   │       │   │   ├── pedia_button_create [UI] (139B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── unknown (set button callback) [UI] (33B)
│   │       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │       │   │   ├── scale_sprite [UI] (35B)
│   │       │   │   ├── widget_get_height [UI] (34B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scrollbar_init [UI] (93B)
│   │       │   │   ├── scrollbar_create_window [UI] (207B) *** STATE MUTATION ***
│   │       │   │   ├── scrollbar_set_position [UI] (33B)
│   │       │   │   ├── scrollbar_set_range [UI] (33B)
│   │       │   │   ├── unknown [UI] (43B)
│   │       │   │   ├── unknown [UI] (33B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_count_items_in_pane [UI] (93B)
│   │       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│   │       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│   │       │   │   └── set_scrollbar [UI] (64B)
│   │       │   ├── popup_draw_background [UI] (309B)
│   │       │   │   ├── rect_get_width [UI] (27B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── unknown [UI] (56B)
│   │       │   │   └── tile_bitmap [UI] (391B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── draw_3d_border [UI] (167B)
│   │       │   │   ├── draw_hline [UI] (69B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── draw_vline [UI] (69B)
│   │       │   ├── port_draw_text_styled [UI] (238B)
│   │       │   │   ├── FUN_0000847F [??]
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   │   └── draw_string_palette [UI] (534B)
│   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── unknown (invalidate_all_children) [UI] (115B)
│   │       │       ├── FUN_00008B00 [??]
│   │       │       └── FUN_00008B2D [??]
│   │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │       │   └── FUN_00003CFF [??]
│   │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │       │   └── FUN_00003D62 [??]
│   │       └── modal_dialog_run [UI] (283B)
│   │             (subtree shown above — 4 children)
│   ├── findcity_cleanup_stack [FW] (12B)
│   │     → Cleans up the dynamic stack allocation from the find city dialog.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │       └── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │             (subtree shown above — 3 children)
│   ├── findcity_seh_epilog [FW] (14B)
│   │     → SEH epilog for the find city dialog.
│   ├── text_newline [UI] (29B)
│   │     → Adds a newline to the global text buffer.
│   ├── text_begin_italic [UI] (29B)
│   │     → Begins italic text mode in the global text buffer.
│   ├── text_end_italic [UI] (29B)
│   │     → Ends italic text mode in the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   ├── open_list_dialog [UI] (47B)
│   │     → Opens a list dialog with the given title and flags.
│   │   └── open_dialog_extended [UI] (56B)
│   │         → Opens a dialog with extended parameters, passing through to the dialog creation function.
│   │       └── popup_parse_text_file [UI] (2287B)
│   │           ├── mp_format_template_string [UI] (504B)
│   │           ├── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│   │           │   ├── rect_get_width [UI] (27B)
│   │           │   ├── rect_get_height [UI] (28B)
│   │           │   ├── unknown (popup list init) [UI] (64B)
│   │           │   ├── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │           │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │           │   │     (subtree shown above — 3 children)
│   │           │   ├── popup_set_bitmap [UI] (50B)
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
│   │           │   ├── measure_text_height [UI] (42B)
│   │           │   │     (subtree shown above — 1 children)
│   │           │   └── popup_get_button_width [UI] (32B)
│   │           ├── popup_add_radio_checked [UI] (71B)
│   │           │   └── popup_add_radio_option [UI] (566B)
│   │           │         (subtree shown above — 2 children)
│   │           ├── popup_add_text_input [UI] (566B)
│   │           │   └── measure_text_height [UI] (42B)
│   │           │         (subtree shown above — 1 children)
│   │           └── popup_add_action_button_label [UI] (119B)
│   ├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │     → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │   │   ├── minimap_full_redraw [UI] (416B) *** STATE MUTATION ***
│   │   │   │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │   │   │   │   └── wrap_x [GL] (94B)
│   │   │   │   ├── minimap_get_tile_color [UI] (425B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── minimap_draw_goto_line [UI] (211B)
│   │   │   │   │   ├── minimap_tile_to_screen [UI] (169B)
│   │   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   │   └── surface_fill_rect_color [UI] (63B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── surface_set_clear_color [UI] (34B)
│   │   │   │   │   └── unknown (clear_surface_region) [UI] (28B)
│   │   │   │   ├── fill_rect_palette [UI] (50B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 15 children)
│   │   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   │     (subtree shown above — 8 children)
│   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   └── wrap_x [GL] (94B)
│   │   │   ├── recalc_viewport_geometry [UI] (1410B) *** STATE MUTATION ***
│   │   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   │   ├── FUN_00008200 [??]
│   │   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   │   └── delete_font [UI] (98B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │   └── scale_sprite [UI] (35B)
│   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │   └── set_sprite_scale [UI] (33B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── redraw_full_viewport [UI] (278B)
│   │   │   │   ├── draw_complete_tile [UI] (495B)
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   ├── render_tile [UI] (4431B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 22 children)
│   │   │   │   │   ├── render_city_on_map [UI] (392B)
│   │   │   │   │   ├── draw_units_at_tile [UI] (662B)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── FUN_0064F394 [??]
│   │   │   │   ├── draw_city_labels [UI] (871B)
│   │   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_civ_foreground_color [UI] (92B)
│   │   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   │   └── draw_text_with_shadow [UI] (205B)
│   │   │   │   │         (subtree shown above — 3 children)
│   │   │   │   ├── unknown (clear_surface_region) [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── wrap_x [GL] (94B)
│   │   │   ├── begin_end_paint_cycle [UI] (100B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 15 children)
│   │   │   └── dialog_create_buttons [UI] (675B)
│   │   │         (subtree shown above — 8 children)
│   │   └── wrap_x [GL] (94B)
│   │         → Wraps an X coordinate for a cylindrical (non-flat) map
│   ├── city_count_content_citizens [GL] (125B)
│   │     → Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   ├── get_civ_adjective_name [GL] (145B)
│   │     → Returns the adjective form of a civilization name
│   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │     → Opens the city window for a specific city, handling disorder state
│   │   ├── FUN_0000CA8D [??]
│   │   ├── FUN_0000CCB3 [??]
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_help_topic [UI] (34B)
│   │   │     → Opens a help topic with default parameters.
│   │   │   └── show_help_topic_ext [UI] (38B)
│   │   │       └── show_help_dialog [UI] (46B)
│   │   │           └── FUN_0051D3E0 [??] (351B)
│   │   ├── unknown — manage window [UI] (37B)
│   │   │     → Calls manage_window_C692 with the window handle from the object's field at offset 8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── init_city_production_globals [GL] (77B) *** STATE MUTATION ***
│   │   │     → Initializes two global production variables from a city's current production type and accumulated shields.
│   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │         (subtree shown above — 2 children)
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │   ├── unknown (popup list init) [UI] (64B)
│   │   │     → Resets and initializes a popup list control with 9 slots and param_1 items.
│   │   └── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │         → Resets all fields of a popup dialog structure to default values
│   └── popup_add_radio_option [UI] (566B)
│         → Adds a radio button option to the popup dialog
│         (subtree shown above — 2 children)
├── handle_revolution [GL] (397B) *** STATE MUTATION ***
│     → Handles the player initiating a revolution
│   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── show_dialog_message [UI] (43B)
│   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   └── FUN_0051D564 [??] (178B)
│   ├── get_civ_name [UI] (28B)
│   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │     (subtree shown above — 1 children)
│   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │     → Sets a dialog string control to an improvement/building name
│   │   └── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │         → Sets a string control value in the multiplayer dialog string table
│   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │     → Plays a sound effect by ID
│   │   ├── flush_display [UI] (21B)
│   │   │     → Flushes the display buffer by calling FUN_005bbbce.
│   │   └── rng_range [GL] (113B) *** STATE MUTATION ***
│   │         → Returns a random integer in the range [param_1, param_2]
│   │       └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman")
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │     (subtree shown above — 1 children)
│   │   ├── find_city_at [GL] (245B)
│   │   │     → Finds a city at the given (x,y) coordinates
│   │   │     (subtree shown above — 2 children)
│   │   ├── has_building [GL] (122B)
│   │   │     → Checks if a city has a specific building
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_wonder_city [GL] (57B)
│   │   │     → Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │   │     (subtree shown above — 1 children)
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── can_build_unit_type [GL] (1095B)
│   │   │     → Checks if a civilization can build a specific unit type
│   │   │   └── civ_has_tech [GL] (181B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── update_menu_item_label [UI] (89B)
│   │   │     → Updates a menu item's label text and enabled state
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── mp_format_template_string [UI] (504B)
│   │   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   └── menu_toggle_item_checked [UI] (103B)
│   │   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │       └── menu_check_item [UI] (50B)
│   │   │   └── menu_update_subitem_text [UI] (155B)
│   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │       ├── unknown (pipe-to-tab converter) [UI] (73B)
│   │   │       └── menu_change_item_text [UI] (50B)
│   │   │           └── modify_menu_item [UI] (130B)
│   │   ├── is_tile_worked [GL] (62B)
│   │   │     → Returns whether a specific tile (param_2) is being worked by city param_1
│   │   ├── menu_populate [UI] (686B) *** STATE MUTATION ***
│   │   │     → Populates the native menu from the internal linked-list representation
│   │   │   ├── menu_set_host_window [UI] (80B) *** STATE MUTATION ***
│   │   │   │   └── menu_setup_parent [UI] (59B)
│   │   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │   │       ├── unknown (get menu handle) [UI] (27B)
│   │   │   │       └── set_window_menu [UI] (99B)
│   │   │   ├── menu_toggle_item_checked [UI] (103B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── menu_toggle_item_grayed [UI] (101B)
│   │   │   │   ├── menu_get_visible_index [UI] (105B)
│   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │   └── menu_enable_item [UI] (50B)
│   │   │   │       └── check_menu_item [UI] (104B)
│   │   │   ├── menu_create_header [UI] (41B)
│   │   │   │   └── build_menu_from_string [UI] (376B)
│   │   │   │       └── parse_menu_string_recursive [UI] (586B)
│   │   │   ├── menu_insert_item [UI] (50B)
│   │   │   │   └── FUN_0000128C [??]
│   │   │   ├── menu_delete_item [UI] (46B)
│   │   │   │   └── delete_menu_item [UI] (102B)
│   │   │   └── menu_update_host [UI] (52B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       └── redraw_menubar [UI] (29B)
│   │   ├── menu_set_subitem_hidden [UI] (129B)
│   │   │     → Shows or hides a sub-menu item by setting/clearing bit 1 in its flags.
│   │   │   └── menu_find_subitem_by_id [UI] (136B)
│   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │     → Sets or clears the checked state of a sub-menu item (bit 0)
│   │   │     (subtree shown above — 2 children)
│   │   ├── menu_set_all_subitems_checked [UI] (111B)
│   │   │     → Sets or clears the checked state for all sub-items of a given top-level menu item.
│   │   │   ├── menu_find_item_by_id [UI] (98B)
│   │   │   └── menu_set_subitem_checked [UI] (194B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   ├── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │     → Sets a civ's government type
│   │   ├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION ***
│   │   │     → Shows the tax rate dialog for a civ
│   │   │     (subtree shown above — 3 children)
│   │   └── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │         → Entry point for full city production calculation
│   │         (subtree shown above — 4 children)
│   └── ai_revolution_notification [GL] (1336B) *** STATE MUTATION ***
│         → Handles AI revolution/government change notifications
│       ├── show_message [UI] (46B) *** STATE MUTATION ***
│       │     → Stores a message string in the message buffer at the specified slot index.
│       ├── show_dialog_message [UI] (43B)
│       │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│       │     (subtree shown above — 1 children)
│       ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│       │     → Sets a string control value in the multiplayer dialog string table
│       ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│       │     → Sets a dialog string control to an improvement/building name
│       │     (subtree shown above — 1 children)
│       ├── civ_has_active_wonder [GL] (142B)
│       │     → Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2)
│       │     (subtree shown above — 1 children)
│       ├── get_civ_noun_name [GL] (145B)
│       │     → Returns the noun name for a civilization (e.g., "Romans")
│       ├── get_civ_leader_title [GL] (210B)
│       │     → Returns the leader title for a civilization based on civ type and government
│       ├── get_civ_adjective_name [GL] (145B)
│       │     → Returns the adjective form of a civilization name
│       ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│       │     → Enqueues a multiplayer event message
│       │   └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│       │         (subtree shown above — 18 children)
│       ├── set_government_type [GL] (529B) *** STATE MUTATION ***
│       │     → Sets a civ's government type
│       │     (subtree shown above — 2 children)
│       └── revolution_dialog [MIXED] (678B) *** STATE MUTATION ***
│             → Revolution/government change dialog
│           ├── text_begin [UI] (29B)
│           ├── select_list_item [UI] (38B)
│           │     (subtree shown above — 1 children)
│           ├── display_improvement [UI] (33B)
│           ├── show_dialog_message [UI] (43B)
│           │     (subtree shown above — 1 children)
│           ├── get_civ_name [UI] (28B)
│           │     (subtree shown above — 1 children)
│           ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│           │     (subtree shown above — 1 children)
│           ├── dialog_set_title [UI] (41B)
│           │   └── dialog_set_title_impl [UI] (42B)
│           ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│           │     (subtree shown above — 18 children)
│           ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│           │     (subtree shown above — 2 children)
│           ├── unknown (tutorial_show_city_screen) [UI] (42B)
│           │   └── FUN_0051D564 [??] (178B)
│           ├── get_civ_noun_name [GL] (145B)
│           ├── get_civ_leader_title [GL] (210B)
│           ├── set_government_type [GL] (529B) *** STATE MUTATION ***
│           │     (subtree shown above — 2 children)
│           ├── check_govt_available [GL] (323B)
│           │   ├── civ_has_active_wonder [GL] (142B)
│           │   │     (subtree shown above — 1 children)
│           │   └── civ_has_tech [GL] (181B)
│           │         (subtree shown above — 1 children)
│           ├── popup_dialog_create [UI] (93B)
│           │     (subtree shown above — 2 children)
│           └── popup_add_radio_option [UI] (566B)
│                 (subtree shown above — 2 children)
├── cancel_unit_blink_timer [UI] (191B) *** STATE MUTATION ***
│     → Cancels the unit blink timer and restores the cursor state
│   ├── set_cursor_icon [UI] (47B)
│   │     → Sets the cursor icon to the specified resource ID on the current view's window handle.
│   │   └── load_and_set_cursor [UI] (70B)
│   │         → Loads a cursor by resource ID onto a window and optionally activates it.
│   │       └── load_and_store_cursor [UI] (136B)
│   ├── stop_cursor_blink [UI] (39B)
│   │     → Stops the cursor blink animation.
│   │   ├── get_view_window_handle [UI] (28B)
│   │   │     → Returns the window handle stored at offset 8 of the current object.
│   │   └── release_mouse_capture [UI] (22B)
│   │         → Releases the mouse capture.
│   └── timer_stop [FW] (62B)
│         → Stops a timer by slot index
├── is_in_goto_mode [UI] (60B)
│     → Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
├── cancel_goto_mode [UI] (159B) *** STATE MUTATION ***
│     → If currently in goto mode, resets all view cursors back to normal (0x201).
│   ├── is_in_goto_mode [UI] (60B)
│   │     → Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
│   └── set_cursor_icon [UI] (47B)
│         → Sets the cursor icon to the specified resource ID on the current view's window handle.
│         (subtree shown above — 1 children)
├── handle_spectator_keypress [UI] (333B) *** STATE MUTATION ***
│     → Handles keyboard input in spectator/observer mode (DAT_006d1da8 == 0)
│   ├── show_city_info_dialog [UI] (518B)
│   │     → Displays a city information dialog for city index param_1
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── display_improvement [UI] (33B)
│   │   │     → Adds an improvement/government icon to the text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_city_popup [UI] (39B)
│   │   │     → Shows a city information popup using the dialog system.
│   │   │   └── show_city_style_picker [UI] (260B) *** STATE MUTATION ***
│   │   │       ├── select_list_item [UI] (38B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── popup_dialog_create [UI] (93B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── popup_add_button [UI] (360B)
│   │   │       │   ├── measure_text_height [UI] (42B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── init_editor_scrollbar [UI] (34B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       └── sprite_init_empty [UI] (140B)
│   │   │           ├── port_alloc_rect [UI] (58B)
│   │   │           │     (subtree shown above — 1 children)
│   │   │           ├── port_set_color [UI] (43B)
│   │   │           └── unknown (sprite extract with rect params) [UI] (88B)
│   │   ├── city_count_content_citizens [GL] (125B)
│   │   │     → Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   └── sprite_init_empty [UI] (140B)
│   │         → Initializes a sprite with given dimensions and fill color
│   │         (subtree shown above — 3 children)
│   ├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │     → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   │     (subtree shown above — 2 children)
│   ├── find_city_at [GL] (245B)
│   │     → Finds a city at the given (x,y) coordinates
│   │     (subtree shown above — 2 children)
│   ├── civ_has_tech [GL] (181B)
│   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │     (subtree shown above — 1 children)
│   └── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│         → Opens the city window for a specific city, handling disorder state
│         (subtree shown above — 8 children)
├── handle_unit_keypress [MIXED] (764B) *** STATE MUTATION ***
│     → Handles keyboard input when a unit is active (DAT_006d1da8 == 1)
│   ├── show_city_info_dialog [UI] (518B)
│   │     → Displays a city information dialog for city index param_1
│   │     (subtree shown above — 14 children)
│   ├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │     → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   │     (subtree shown above — 2 children)
│   ├── open_cheat_menu [UI] (30B)
│   │     → Opens the cheat menu for the current player.
│   │   └── show_throne_room [MIXED] (247B) *** STATE MUTATION ***
│   │         → Shows the throne room improvement screen
│   │       ├── init_throne_context [UI] (405B) *** STATE MUTATION ***
│   │       │   ├── init_sprite_surface_mgr [UI] (133B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── init_render_surface [UI] (274B)
│   │       │   ├── unknown (pedia object initializer) [UI] (34B)
│   │       │   ├── popup_dialog_create [UI] (93B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── get_screen_rect [UI] (48B)
│   │       │   └── palette_init [UI] (145B)
│   │       │         (subtree shown above — 3 children)
│   │       ├── destroy_throne_context [UI] (177B)
│   │       │   └── pedia_free_resource [UI] (57B)
│   │       └── throne_room_add_improvement [MIXED] (1799B) *** STATE MUTATION ***
│   │           ├── flush_display [UI] (21B)
│   │           ├── end_paint [UI] (32B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── show_window_wrapper [UI] (33B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── manage_window_show [UI] (37B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── start_cursor_blink [UI] (39B)
│   │           │   ├── get_view_window_handle [UI] (28B)
│   │           │   └── capture_mouse [UI] (29B)
│   │           ├── stop_cursor_blink [UI] (39B)
│   │           │     (subtree shown above — 2 children)
│   │           ├── init_palette_system [UI] (21B)
│   │           ├── load_throne_dll [UI] (308B)
│   │           │   ├── set_callback_paint [UI] (45B)
│   │           │   ├── update_palette [UI] (43B)
│   │           │   ├── pedia_set_resource [UI] (67B)
│   │           │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │           │   ├── create_offscreen_surface_b [UI] (119B)
│   │           │   │     (subtree shown above — 5 children)
│   │           │   └── surface_init_8 [UI] (96B)
│   │           │         (subtree shown above — 2 children)
│   │           ├── draw_throne_title [UI] (221B)
│   │           │   ├── text_begin [UI] (29B)
│   │           │   ├── text_add_string [UI] (33B)
│   │           │   ├── port_measure_text [UI] (219B)
│   │           │   └── unknown (set/get draw color) [UI] (38B)
│   │           ├── render_throne_room [UI] (3024B)
│   │           │   ├── flush_display [UI] (21B)
│   │           │   ├── port_destructor [UI] (114B)
│   │           │   ├── load_gif_resource [UI] (847B)
│   │           │   │     (subtree shown above — 6 children)
│   │           │   ├── sprite_free_data [UI] (84B)
│   │           │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │           │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │           │   │     (subtree shown above — 1 children)
│   │           │   └── sprite_replace_color [UI] (218B)
│   │           ├── throne_room_select_piece [UI] (3336B)
│   │           │   ├── flush_display [UI] (21B)
│   │           │   ├── add_click_region [UI] (153B) *** STATE MUTATION ***
│   │           │   │     (subtree shown above — 1 children)
│   │           │   ├── port_destructor [UI] (114B)
│   │           │   │     (subtree shown above — 4 children)
│   │           │   ├── load_gif_resource [UI] (847B)
│   │           │   │     (subtree shown above — 6 children)
│   │           │   ├── sprite_free_data [UI] (84B)
│   │           │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │           │   │     (subtree shown above — 2 children)
│   │           │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │           │   │     (subtree shown above — 1 children)
│   │           │   └── sprite_replace_color [UI] (218B)
│   │           │         (subtree shown above — 4 children)
│   │           ├── unknown (pedia set and display resource) [UI] (45B)
│   │           │   └── unknown (update pedia display surface) [UI] (49B)
│   │           ├── unknown (manage pedia window) [UI] (37B)
│   │           │   └── FUN_0000C44D [??]
│   │           ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │           │     (subtree shown above — 2 children)
│   │           ├── animate_screen_reveal [UI] (1155B) *** STATE MUTATION ***
│   │           │   ├── rect_get_width [UI] (27B)
│   │           │   ├── rect_get_height [UI] (28B)
│   │           │   ├── flush_display [UI] (21B)
│   │           │   ├── invalidate_region [UI] (180B)
│   │           │   │     (subtree shown above — 2 children)
│   │           │   └── rng_range [GL] (113B) *** STATE MUTATION ***
│   │           │         (subtree shown above — 1 children)
│   │           ├── port_alloc_rect [UI] (58B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── port_blit_stretch [UI] (443B)
│   │           │   ├── port_lock [UI] (287B)
│   │           │   ├── port_unlock [UI] (83B)
│   │           │   ├── surface_is_locked [UI] (44B)
│   │           │   ├── get_surface_buffer_handle [UI] (28B)
│   │           │   ├── unknown (get surface base) [UI] (28B)
│   │           │   ├── check_topdown [UI] (41B)
│   │           │   └── copy_rect_8bit [UI] (187B)
│   │           ├── port_get_font [UI] (75B)
│   │           │   └── FUN_00003FEB [??]
│   │           ├── unknown (set/get draw color) [UI] (38B)
│   │           └── modal_dialog_run [UI] (283B)
│   │                 (subtree shown above — 4 children)
│   ├── find_city_at [GL] (245B)
│   │     → Finds a city at the given (x,y) coordinates
│   │     (subtree shown above — 2 children)
│   ├── civ_has_tech [GL] (181B)
│   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │     (subtree shown above — 1 children)
│   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │     → Opens the city window for a specific city, handling disorder state
│   │     (subtree shown above — 8 children)
│   ├── unit_order_activate [GL] (36B) *** STATE MUTATION ***
│   │     → Activates the selected unit by calling move_unit with direction -1 and mode 3 (activate in place).
│   │   └── move_unit [GL] (17963B) *** STATE MUTATION ***
│   │         → THE main unit movement function — the single largest function in the binary at ~18KB
│   │       ├── FUN_0000C494 [??]
│   │       ├── flush_display [UI] (21B)
│   │       ├── is_tile_valid [GL] (80B)
│   │       ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       ├── show_dialog_message [UI] (43B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │       │   └── scroll_map_if_needed [UI] (404B) *** STATE MUTATION ***
│   │       │       └── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │       │             (subtree shown above — 2 children)
│   │       ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │       ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 1 children)
│   │       ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── cancel_goto_if_blocked [GL] (90B) *** STATE MUTATION ***
│   │       │   ├── cancel_goto_for_stack [GL] (192B) *** STATE MUTATION ***
│   │       │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── is_tile_ocean [GL] (57B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │       │   ├── find_city_at [GL] (245B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── update_map_area_all_players [UI] (136B)
│   │       │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │       │   ├── update_tile_all_players [UI] (124B)
│   │       │   │   └── update_map_tile [UI] (50B)
│   │       │   ├── update_radius1_all_players [UI] (124B)
│   │       │   │   └── update_map_radius1 [UI] (50B)
│   │       │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION ***
│   │       │   │   ├── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │       │   │   ├── calc_movement_cost [GL] (94B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │       │   │   ├── is_unit_active [GL] (176B)
│   │       │   │   └── get_tile_continent [GL] (39B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION ***
│   │       │   │   └── rle_encode (unnamed) [GL] (588B)
│   │       │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION ***
│   │       │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   │   ├── show_dialog_message [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │       │   │   ├── civ_has_active_wonder [GL] (142B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │       │   │   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │       │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │       │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │       │   │   ├── should_declare_war [GL] (191B)
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── get_civ_noun_name [GL] (145B)
│   │       │   │   ├── get_civ_people_name [GL] (145B)
│   │       │   │   ├── has_spaceship_launched [GL] (47B)
│   │       │   │   ├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│   │       │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │       │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── ai_should_declare_war [AI] (1549B)
│   │       │   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │       │   │   └── check_join_war [GL] (595B) *** STATE MUTATION ***
│   │       │   ├── wrap_x [GL] (94B)
│   │       │   ├── find_unit_stack_at_xy [GL] (231B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │       │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │       │   ├── sum_stack_property [GL] (724B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── get_tile_ptr [GL] (90B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_civ_vis_ptr [GL] (48B)
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_tile_explored [GL] (71B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_city_owner_at [GL] (111B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── get_tile_controller [GL] (72B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── get_tile_ptr [GL] (90B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │       │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │       │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │       │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │       │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │       │     (subtree shown above — 18 children)
│   │       │       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │             (subtree shown above — 3 children)
│   │       ├── find_city_at [GL] (245B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── show_game_popup_2arg [UI] (39B)
│   │       │   └── show_unit_type_picker [UI] (260B) *** STATE MUTATION ***
│   │       │       ├── select_list_item [UI] (38B)
│   │       │       │     (subtree shown above — 1 children)
│   │       │       ├── popup_dialog_create [UI] (93B)
│   │       │       │     (subtree shown above — 2 children)
│   │       │       ├── popup_add_button [UI] (360B)
│   │       │       │     (subtree shown above — 2 children)
│   │       │       └── sprite_init_empty [UI] (140B)
│   │       │             (subtree shown above — 3 children)
│   │       ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │       │   ├── get_attitude_raw [GL] (47B)
│   │       │   └── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 18 children)
│   │       ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│   │       ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 2 children)
│   │       ├── wait_for_animation [UI] (109B)
│   │       │   ├── flush_display [UI] (21B)
│   │       │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       ├── update_tile_all_players [UI] (124B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       ├── get_civ_people_name [GL] (145B)
│   │       ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 3 children)
│   │       ├── set_paradrop_range [GL] (31B) *** STATE MUTATION ***
│   │       ├── spy_enters_city [MIXED] (10469B) *** STATE MUTATION ***
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── unknown (dialog show single param) [UI] (33B)
│   │       │   │   └── show_help_topic [UI] (34B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── open_intelligence_dialog [UI] (535B) *** STATE MUTATION ***
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── show_window_wrapper [UI] (33B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_rect_wh [UI] (48B)
│   │       │   │   ├── create_text_button [UI] (133B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── set_button_owner [UI] (45B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_button_handler [UI] (45B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_button_click_callback [UI] (33B)
│   │       │   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── modal_dialog_run [UI] (283B)
│   │       │   │         (subtree shown above — 4 children)
│   │       │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │       │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │       │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │       │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │       │   │   ├── text_begin [UI] (29B)
│   │       │   │   ├── text_add_string [UI] (33B)
│   │       │   │   ├── text_add_label_id [UI] (33B)
│   │       │   │   ├── select_list_item [UI] (38B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── text_newline [UI] (29B)
│   │       │   │   ├── text_end_italic [UI] (29B)
│   │       │   │   ├── display_improvement [UI] (33B)
│   │       │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── dialog_set_title [UI] (41B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── has_building [GL] (122B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_wonder_owner [GL] (73B)
│   │       │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │       │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── get_civ_people_name [GL] (145B)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── civ_has_tech [GL] (181B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION ***
│   │       │   │   ├── handle_tech_government_effects [GL] (973B) *** STATE MUTATION ***
│   │       │   │   ├── we_love_the_king_day [GL] (379B) *** STATE MUTATION ***
│   │       │   │   ├── format_enabled_item [UI] (138B)
│   │       │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │       │   │   │     (cycle — already in call path)
│   │       │   │   ├── unknown (show tech help) [UI] (43B)
│   │       │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── pedia_select_entry [UI] (342B) *** STATE MUTATION ***
│   │       │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 23 children)
│   │       │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_dialog_create [UI] (93B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_add_edit_field [UI] (412B)
│   │       │   │   ├── popup_set_scaled_width [UI] (99B)
│   │       │   │   ├── popup_add_button [UI] (360B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │       │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │       │   │   ├── show_dialog_message [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── update_tile_all_players [UI] (124B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │       │   │   │     (cycle — already in call path)
│   │       │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │       │   │   ├── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │       │   │   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │       │   ├── spy_caught_check [GL] (163B) *** STATE MUTATION ***
│   │       │   │   ├── show_dialog_message [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 10 children)
│   │       │   ├── check_incident_permission [GL] (133B)
│   │       │   │   └── unknown (dialog show single param) [UI] (33B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── calc_city_revolt_distance [GL] (232B)
│   │       │   │   ├── has_building [GL] (122B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── calc_movement_cost [GL] (94B)
│   │       │   │         (subtree shown above — 2 children)
│   │       │   ├── execute_civil_war [GL] (1339B) *** STATE MUTATION ***
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   │   ├── get_civ_name [UI] (28B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── update_tile_all_players [UI] (124B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_civ_people_name [GL] (145B)
│   │       │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │       │   │   ├── wrap_x [GL] (94B)
│   │       │   │   ├── calc_movement_cost [GL] (94B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │       │   │   ├── get_city_owner_at [GL] (111B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │       │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 2 children)
│   │       │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 23 children)
│   │       │   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   │   ├── has_building [GL] (122B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── get_civ_people_name [GL] (145B)
│   │       │   │   ├── unknown (show improvement help) [UI] (43B)
│   │       │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── animate_nuke_explosion [UI] (885B) *** STATE MUTATION ***
│   │       │   │   ├── wrap_x [GL] (94B)
│   │       │   │   ├── tile_distance_xy [GL] (157B)
│   │       │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │       │   │   ├── get_tile_ptr [GL] (90B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_tile_controller [GL] (72B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── generate_terrain_around [GL] (696B) *** STATE MUTATION ***
│   │       │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │       │   │   ├── FUN_0000C494 [??]
│   │       │   │   ├── FUN_0000C679 [??]
│   │       │   │   ├── show_dialog_message [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   └── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │       │   └── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │       │         (subtree shown above — 7 children)
│   │       ├── spy_sabotage_unit [GL] (784B) *** STATE MUTATION ***
│   │       │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   ├── get_civ_name [UI] (28B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── show_game_popup_2arg [UI] (39B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── update_tile_all_players [UI] (124B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 10 children)
│   │       │   ├── pick_up_unit_004c9528 [GL] (2453B) *** STATE MUTATION ***
│   │       │   │   ├── get_civ_name [UI] (28B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │       │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── show_game_popup_2arg [UI] (39B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── wait_for_animation [UI] (109B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── update_tile_all_players [UI] (124B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── civ_has_tech [GL] (181B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── calc_city_revolt_distance [GL] (232B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 23 children)
│   │       │   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │       │   │   ├── sum_stack_property [GL] (724B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│   │       │   ├── unknown (show unit help) [UI] (41B)
│   │       │   │   └── show_unit_type_picker [UI] (260B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 4 children)
│   │       │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── animate_combat_movement [UI] (2281B) *** STATE MUTATION ***
│   │       │   │   ├── flush_display [UI] (21B)
│   │       │   │   ├── invalidate_region [UI] (180B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── set_rect_wh [UI] (48B)
│   │       │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── wait_for_animation [UI] (109B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── tile_to_screen [UI] (151B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── is_tile_visible [UI] (99B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_sprite_scale [UI] (33B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── reset_sprite_scale [UI] (28B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scale_at_current_zoom [UI] (47B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   │   ├── blit_with_clip [UI] (265B)
│   │       │   │   ├── port_alloc_rect [UI] (58B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── sum_stack_property [GL] (724B)
│   │       │         (subtree shown above — 2 children)
│   │       ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │       │   ├── rect_get_width [UI] (27B)
│   │       │   ├── rect_get_height [UI] (28B)
│   │       │   ├── flush_display [UI] (21B)
│   │       │   ├── invalidate_region [UI] (180B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   ├── set_rect_wh [UI] (48B)
│   │       │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── tile_to_screen [UI] (151B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── is_tile_visible [UI] (99B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── update_map_area_all_players [UI] (136B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 20 children)
│   │       │   ├── blit_with_clip [UI] (265B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── calc_movement_step_size [UI] (47B)
│   │       │   │   └── calc_scaled_step [UI] (38B)
│   │       │   ├── wrap_x [GL] (94B)
│   │       │   ├── port_alloc_rect [UI] (58B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── port_destructor [UI] (114B)
│   │       │         (subtree shown above — 4 children)
│   │       ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │       │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_civ_name [UI] (28B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_civ_people_name [GL] (145B)
│   │       │   └── check_can_declare_war [GL] (365B)
│   │       │       └── civ_has_active_wonder [GL] (142B)
│   │       │             (subtree shown above — 1 children)
│   │       ├── handle_city_capture [GL] (11451B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 65 children)
│   │       ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 15 children)
│   │       ├── resolve_combat [GL] (15052B) *** STATE MUTATION ***
│   │       │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   ├── get_civ_name [UI] (28B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │       │   ├── unknown (dialog show single param) [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 26 children)
│   │       │   ├── dialog_repaint_check [UI] (91B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │       │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 4 children)
│   │       │   ├── has_building [GL] (122B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── reassign_all_city_production [GL] (254B) *** STATE MUTATION ***
│   │       │   │   ├── change_city_production [MIXED] (2572B) *** STATE MUTATION ***
│   │       │   │   └── get_tile_continent [GL] (39B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── show_game_popup_2arg [UI] (39B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── diplo_activate_alliance_wars [GL] (910B) *** STATE MUTATION ***
│   │       │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   │   ├── show_dialog_message [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── get_civ_people_name [GL] (145B)
│   │       │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 9 children)
│   │       │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── wait_for_animation [UI] (109B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── draw_unit_at_position [UI] (171B)
│   │       │   │   ├── tile_to_screen [UI] (151B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 20 children)
│   │       │   ├── invalidate_single_tile [UI] (42B)
│   │       │   │   └── invalidate_tile_area [UI] (60B)
│   │       │   ├── update_tile_all_players [UI] (124B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── update_radius1_all_players [UI] (124B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_civ_people_name [GL] (145B)
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── execute_airlift [GL] (460B) *** STATE MUTATION ***
│   │       │   │   ├── FUN_0000C494 [??]
│   │       │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   │   ├── show_game_popup_3arg [UI] (43B)
│   │       │   │   ├── show_game_popup_2arg [UI] (39B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_civ_people_name [GL] (145B)
│   │       │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 6 children)
│   │       │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 7 children)
│   │       │   │   └── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── unknown (show improvement help) [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── ai_alert_nearby_units [AI] (470B) *** STATE MUTATION ***
│   │       │   │   ├── calc_movement_cost [GL] (94B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── calc_unit_movement_points [GL] (516B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── sum_stack_property [GL] (724B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── is_tile_ocean [GL] (57B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── ai_choose_government [AI] (558B) *** STATE MUTATION ***
│   │       │   │   ├── check_govt_available [GL] (323B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── ai_revolution_notification [GL] (1336B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 11 children)
│   │       │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 23 children)
│   │       │   ├── animate_unit_movement [UI] (2902B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 17 children)
│   │       │   ├── diplomacy_check_treaty_violation [GL] (379B) *** STATE MUTATION ***
│   │       │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │       │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │       │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 6 children)
│   │       │   ├── calc_unit_hit_points [GL] (119B) *** STATE MUTATION ***
│   │       │   ├── calc_unit_defense_strength [GL] (931B) *** STATE MUTATION ***
│   │       │   │   ├── find_city_at [GL] (245B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── has_building [GL] (122B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── civ_has_active_wonder [GL] (142B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_tile_ptr [GL] (90B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_tile_improvements [GL] (39B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── calc_stack_best_defender [GL] (786B) *** STATE MUTATION ***
│   │       │   │   ├── find_city_at [GL] (245B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── has_building [GL] (122B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── calc_unit_defense_strength [GL] (931B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 6 children)
│   │       │   │   ├── get_unit_max_hp [GL] (45B)
│   │       │   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_tile_terrain_raw [GL] (41B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── handle_unit_kill [GL] (411B) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── event_check_unit_killed [GL] (231B) *** STATE MUTATION ***
│   │       │   │   ├── record_combat_kill [GL] (762B) *** STATE MUTATION ***
│   │       │   │   └── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 7 children)
│   │       │   ├── handle_stack_wipe [GL] (105B) *** STATE MUTATION ***
│   │       │   │   ├── handle_unit_kill [GL] (411B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   └── get_first_unit_in_stack [GL] (118B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── handle_unit_promotion [GL] (322B) *** STATE MUTATION ***
│   │       │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── show_game_popup_2arg [UI] (39B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── animate_combat_movement [UI] (2281B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 14 children)
│   │       │   ├── handle_nuke_attack [GL] (1236B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 15 children)
│   │       │   ├── scramble_defenders_to_tile [GL] (1084B) *** STATE MUTATION ***
│   │       │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 20 children)
│   │       │   │   ├── execute_paradrop [GL] (2572B) *** STATE MUTATION ***
│   │       │   │   ├── tile_distance_xy [GL] (157B)
│   │       │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── sum_stack_property [GL] (724B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── get_tile_owner [GL] (100B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── get_tile_continent [GL] (39B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_city_owner_at [GL] (111B)
│   │       │   │         (subtree shown above — 3 children)
│   │       │   ├── refresh_combat_tiles [UI] (68B)
│   │       │   │   └── update_map_area_all_players [UI] (136B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── wrap_x [GL] (94B)
│   │       │   ├── get_unit_max_hp [GL] (45B)
│   │       │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── calc_unit_movement_points [GL] (516B)
│   │       │   │     (subtree shown above — 4 children)
│   │       │   ├── get_unit_moves_remaining [GL] (69B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── find_unit_stack_at_xy [GL] (231B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 6 children)
│   │       │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 7 children)
│   │       │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │       │   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │       │   │   ├── show_dialog_message [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 6 children)
│   │       │   │   └── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │       │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_tile_continent [GL] (39B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── get_fortress_owner_at [GL] (77B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── get_unit_owner_at [GL] (66B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   └── get_tile_improvements [GL] (39B)
│   │       │         (subtree shown above — 1 children)
│   │       ├── process_goody_hut [GL] (3404B) *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │       │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 4 children)
│   │       │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── update_radius1_all_players [UI] (124B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── civ_has_tech [GL] (181B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 35 children)
│   │       │   ├── can_research_tech [GL] (156B)
│   │       │   │   └── civ_has_tech [GL] (181B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 8 children)
│   │       │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 23 children)
│   │       │   ├── wrap_x [GL] (94B)
│   │       │   ├── create_unit [GL] (1675B) *** STATE MUTATION ***
│   │       │   │   ├── show_dialog_message [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 26 children)
│   │       │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 18 children)
│   │       │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   │   ├── unknown (tutorial_show_advice) [UI] (38B)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── calc_unit_movement_points [GL] (516B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   └── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │       │   ├── get_tile_ptr [GL] (90B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_tile_terrain_raw [GL] (41B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_tile_continent [GL] (39B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── (get_tile_fertility_or_city_radius) [GL] (100B)
│   │       │   │   ├── get_tile_city_radius_owner [GL] (42B)
│   │       │   │   └── get_tile_fertility [GL] (42B)
│   │       │   ├── get_city_owner_at [GL] (111B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   └── get_unit_owner_at [GL] (66B)
│   │       │         (subtree shown above — 2 children)
│   │       ├── claim_adjacent_ocean_tiles [GL] (306B) *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── reveal_tile_for_civ [GL] (188B) *** STATE MUTATION ***
│   │       │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │       │   │   ├── find_city_at [GL] (245B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │       │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 2 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── update_map_area_all_players [UI] (136B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── wrap_x [GL] (94B)
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_unit_owner_at [GL] (66B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │       │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │       │         (subtree shown above — 2 children)
│   │       ├── handle_caravan_arrival [MIXED] (1831B) *** STATE MUTATION ***
│   │       │   ├── text_begin [UI] (29B)
│   │       │   ├── text_add_string [UI] (33B)
│   │       │   ├── text_add_label_id [UI] (33B)
│   │       │   ├── select_list_item [UI] (38B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── text_newline [UI] (29B)
│   │       │   ├── display_improvement [UI] (33B)
│   │       │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │       │   ├── unknown (dialog show single param) [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── dialog_set_title [UI] (41B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── process_caravan_arrival [GL] (3144B) *** STATE MUTATION ***
│   │       │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │       │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │       │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── has_building [GL] (122B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── establish_trade_route [GL] (765B) *** STATE MUTATION ***
│   │       │   │   ├── show_game_popup_3arg [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── show_game_popup_2arg [UI] (39B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 8 children)
│   │       │   │   ├── civ_has_tech [GL] (181B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── calc_tech_cost [GL] (1003B)
│   │       │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 23 children)
│   │       │   │   ├── calc_movement_cost [GL] (94B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │       │   │   │     (subtree shown above — 7 children)
│   │       │   │   └── get_tile_continent [GL] (39B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── popup_dialog_create [UI] (93B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── popup_add_edit_field [UI] (412B)
│   │       │   ├── popup_add_button [UI] (360B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   ├── popup_add_radio_option [UI] (566B)
│   │       │   │     (subtree shown above — 2 children)
│   │       │   └── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │       │         (subtree shown above — 7 children)
│   │       ├── mp_lock_map [GL] (971B) *** STATE MUTATION ***
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       ├── mp_unlock_map [GL] (324B) *** STATE MUTATION ***
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       ├── spaceship_ai_should_start [AI] (583B) *** STATE MUTATION ***
│   │       │   ├── has_spaceship_launched [GL] (47B)
│   │       │   ├── civ_has_tech [GL] (181B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── spaceship_is_enabled [GL] (90B)
│   │       ├── wrap_x [GL] (94B)
│   │       ├── tile_distance_xy [GL] (157B)
│   │       ├── get_unit_max_hp [GL] (45B)
│   │       ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 1 children)
│   │       ├── calc_unit_movement_points [GL] (516B)
│   │       │     (subtree shown above — 4 children)
│   │       ├── get_unit_moves_remaining [GL] (69B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_next_unit_in_stack [GL] (65B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_first_unit_in_stack [GL] (118B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── find_unit_stack_at_xy [GL] (231B)
│   │       │     (subtree shown above — 3 children)
│   │       ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │       ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 6 children)
│   │       ├── move_unit_to_bottom [GL] (577B) *** STATE MUTATION ***
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_last_unit_in_stack [GL] (118B)
│   │       │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │       │   │         (subtree shown above — 3 children)
│   │       │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │       │         (subtree shown above — 6 children)
│   │       ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 4 children)
│   │       ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 7 children)
│   │       ├── clear_stack_visibility [GL] (88B) *** STATE MUTATION ***
│   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_first_unit_in_stack [GL] (118B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── clear_unit_visibility [GL] (39B) *** STATE MUTATION ***
│   │       ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │       ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 3 children)
│   │       ├── check_zoc_violation [GL] (407B) *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── wrap_x [GL] (94B)
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── get_city_owner_at [GL] (111B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   └── get_unit_owner_at [GL] (66B)
│   │       │         (subtree shown above — 2 children)
│   │       ├── check_zoc_if_no_city [GL] (86B) *** STATE MUTATION ***
│   │       │   ├── check_adjacent_enemy_continent [GL] (297B) *** STATE MUTATION ***
│   │       │   │   ├── is_tile_valid [GL] (80B)
│   │       │   │   ├── wrap_x [GL] (94B)
│   │       │   │   ├── is_tile_ocean [GL] (57B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   └── get_unit_owner_at [GL] (66B)
│   │       │   │         (subtree shown above — 2 children)
│   │       │   └── get_city_owner_at [GL] (111B)
│   │       │         (subtree shown above — 3 children)
│   │       ├── set_stack_visibility_mask [GL] (90B) *** STATE MUTATION ***
│   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── get_first_unit_in_stack [GL] (118B)
│   │       │         (subtree shown above — 1 children)
│   │       ├── sum_stack_property [GL] (724B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── count_units_by_role [GL] (120B)
│   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── get_first_unit_in_stack [GL] (118B)
│   │       │         (subtree shown above — 1 children)
│   │       ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 12 children)
│   │       ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 6 children)
│   │       ├── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│   │       │   ├── FUN_0000C494 [??]
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 7 children)
│   │       │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 4 children)
│   │       │   ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 12 children)
│   │       │   └── is_tile_ocean [GL] (57B)
│   │       │         (subtree shown above — 1 children)
│   │       ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_tile_ptr [GL] (90B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_tile_terrain_raw [GL] (41B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_tile_continent [GL] (39B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_tile_explored [GL] (71B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_city_owner_at [GL] (111B)
│   │       │     (subtree shown above — 3 children)
│   │       ├── get_fortress_owner_at [GL] (77B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── get_tile_controller [GL] (72B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── check_tile_goody_hut [GL] (229B)
│   │       │     (subtree shown above — 3 children)
│   │       ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 18 children)
│   │       │   ├── get_tile_ptr [GL] (90B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │       │         (subtree shown above — 1 children)
│   │       ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 3 children)
│   │       ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │       └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │             (subtree shown above — 2 children)
│   ├── (unit_order_wait) [GL] (89B) *** STATE MUTATION ***
│   │     → Sets the "wait" flag on the selected unit (bit 0x4000 in unit flags word) and advances to the next unit needing orders.
│   │   ├── center_all_map_views [UI] (116B)
│   │   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   │   └── center_map_on_cursor [UI] (56B) *** STATE MUTATION ***
│   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 7 children)
│   │   └── select_next_unit [MIXED] (436B) *** STATE MUTATION ***
│   │         → Selects the next unit needing orders
│   │       ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 1 children)
│   │       ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 26 children)
│   │       ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │       │   ├── center_all_map_views [UI] (116B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │       │   │     (subtree shown above — 19 children)
│   │       │   └── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │       │         (subtree shown above — 7 children)
│   │       ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 19 children)
│   │       ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 7 children)
│   │       ├── is_unit_ready_to_move [GL] (271B)
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   └── get_unit_moves_remaining [GL] (69B)
│   │       │         (subtree shown above — 1 children)
│   │       └── find_next_unit_needing_orders [GL] (629B) *** STATE MUTATION ***
│   │           ├── calc_movement_cost [GL] (94B)
│   │           │     (subtree shown above — 2 children)
│   │           └── is_unit_ready_to_move [GL] (271B)
│   │                 (subtree shown above — 2 children)
│   ├── unit_order_build_city [MIXED] (1087B) *** STATE MUTATION ***
│   │     → Handles the "Build City" order
│   │   ├── FUN_0000C679 [??]
│   │   ├── FUN_0000DADA [??]
│   │   ├── FUN_0000DB36 [??]
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │     → Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_city_popup [UI] (39B)
│   │   │     → Shows a city information popup using the dialog system.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (dialog show 4 params) [UI] (45B)
│   │   │     → Calls thunk_FUN_0051d63b with DAT_006359d4 and 4 parameters.
│   │   │   └── FUN_0051D63B [??] (253B)
│   │   ├── unknown (string pool set) [UI] (33B)
│   │   │     → Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── find_city_at [GL] (245B)
│   │   │     → Finds a city at the given (x,y) coordinates
│   │   │     (subtree shown above — 2 children)
│   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │     → Shows a game popup dialog with 3 arguments using the global dialog context.
│   │   │     (subtree shown above — 1 children)
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── update_map_area_all_players [UI] (136B)
│   │   │     → Updates a map area for all active players (all viewports in MP).
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564(param_1, param_2, 0, param_3, param_4)
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_paradrop_range [GL] (31B) *** STATE MUTATION ***
│   │   │     → Sets the paradrop range for a unit type
│   │   ├── unit_order_found_city [GL] (335B) *** STATE MUTATION ***
│   │   │     → Founds a new city at the unit's location
│   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 3 children)
│   │   ├── show_city_event_dialog_v2 [UI] (915B) *** STATE MUTATION ***
│   │   │     → Enhanced version of city event dialog with a production item image
│   │   │   ├── select_list_item [UI] (38B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── pedia_window_ctor [UI] (115B)
│   │   │   │   └── popup_dialog_create [UI] (93B)
│   │   │   │         (subtree shown above — 2 children)
│   │   │   ├── popup_set_default_selection [UI] (116B)
│   │   │   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │   │   └── popup_find_button_by_id [UI] (100B)
│   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── popup_add_radio_option [UI] (566B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── palette_init [UI] (145B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   └── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │   │     → Opens the city window for a specific city, handling disorder state
│   │   │     (subtree shown above — 8 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │     → Deletes a unit
│   │   │     (subtree shown above — 7 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   └── get_city_owner_at [GL] (111B)
│   │         → Returns the city-owning civ at a tile, or -1
│   │         (subtree shown above — 3 children)
│   ├── unit_order_build_improvement [MIXED] (1411B) *** STATE MUTATION ***
│   │     → Handles all settler/engineer improvement orders (road, railroad, irrigation, farmland, mining, fortress, airbase, pol...
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │     → Shows a game popup dialog with 3 arguments using the global dialog context.
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   │     (subtree shown above — 1 children)
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     → Updates a single tile for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (show tech help) [UI] (43B)
│   │   │     → Shows tech help text via the help display system.
│   │   │     (subtree shown above — 1 children)
│   │   ├── execute_worker_order [GL] (2035B) *** STATE MUTATION ***
│   │   │     → Executes a settler/engineer work order (irrigate, mine, road, railroad, fortress, clean pollution, plant forest, etc.)
│   │   │   ├── FUN_0000C494 [??]
│   │   │   ├── FUN_0000C6EF [??]
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   └── set_tile_terrain [GL] (295B) *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 18 children)
│   │   │       ├── get_tile_ptr [GL] (90B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 1 children)
│   │   ├── unknown (show improvement help) [UI] (43B)
│   │   │     → Shows help text for an improvement via the help display system.
│   │   │     (subtree shown above — 1 children)
│   │   ├── check_adjacent_water [GL] (242B)
│   │   │     → Checks if any of the 5 adjacent cardinal tiles has water or irrigation-relevant features
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   ├── unit_order_home_city [MIXED] (261B) *** STATE MUTATION ***
│   │     → Changes the selected unit's home city to the city at its current location
│   │   ├── FUN_0000C679 [??]
│   │   ├── find_city_at [GL] (245B)
│   │   │     → Finds a city at the given (x,y) coordinates
│   │   │     (subtree shown above — 2 children)
│   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   │     (subtree shown above — 1 children)
│   │   └── ai_find_nearest_city_or_transport [AI] (1297B) *** STATE MUTATION ***
│   │         → For AI units, finds the nearest friendly city or transport ship to go to
│   │       ├── tile_distance_xy [GL] (157B)
│   │       ├── calc_unit_movement_points [GL] (516B)
│   │       │     (subtree shown above — 4 children)
│   │       ├── get_unit_moves_remaining [GL] (69B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_tile_continent [GL] (39B)
│   │       │     (subtree shown above — 1 children)
│   │       └── get_fortress_owner_at [GL] (77B)
│   │             (subtree shown above — 2 children)
│   ├── unit_order_fortify [MIXED] (255B) *** STATE MUTATION ***
│   │     → Fortifies the selected unit
│   │   ├── FUN_0000C494 [??]
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     → Updates a single tile for all active players.
│   │   │     (subtree shown above — 1 children)
│   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │     → Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   └── get_fortress_owner_at [GL] (77B)
│   │         → Returns the fortress-owning civ at a tile, or -1
│   │         (subtree shown above — 2 children)
│   ├── unit_order_unload [GL] (488B) *** STATE MUTATION ***
│   │     → Issues the "unload" order for a transport ship or air unit carrying units
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │   │     → Sets a unit's order to "goto" (3)
│   │   ├── sum_stack_property [GL] (724B)
│   │   │     → Sums a property across all units in a stack
│   │   │     (subtree shown above — 2 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   └── get_city_owner_at [GL] (111B)
│   │         → Returns the city-owning civ at a tile, or -1
│   │         (subtree shown above — 3 children)
│   ├── unit_order_pillage [MIXED] (1105B) *** STATE MUTATION ***
│   │     → Handles the pillage order
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (subtree shown above — 1 children)
│   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │     → Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status
│   │   │     (subtree shown above — 4 children)
│   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │     → Declares war from param_1 against param_2
│   │   │     (subtree shown above — 5 children)
│   │   ├── unit_pillage [GL] (824B) *** STATE MUTATION ***
│   │   │     → Pillages improvements on a tile
│   │   │   ├── find_nearest_city [GL] (400B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 5 children)
│   │   │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 3 children)
│   │   ├── diplomacy_check_attack_allowed [GL] (933B) *** STATE MUTATION ***
│   │   │     → Checks whether civ param_1 is allowed to attack civ param_2 given current treaties
│   │   │     (subtree shown above — 6 children)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │     → Closes a popup dialog by destroying it and clearing its list control.
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│   │   │     (subtree shown above — 1 children)
│   │   └── get_city_owner_at [GL] (111B)
│   │         → Returns the city-owning civ at a tile, or -1
│   │         (subtree shown above — 3 children)
│   ├── unit_order_paradrop [UI] (165B) *** STATE MUTATION ***
│   │     → Handles the paradrop order
│   │   ├── set_all_views_goto_cursor [UI] (146B) *** STATE MUTATION ***
│   │   │     → Sets all active map view cursors to goto mode (0x202).
│   │   │   └── set_cursor_icon [UI] (47B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   │     (subtree shown above — 1 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   ├── unit_order_goto_city [MIXED] (1787B) *** STATE MUTATION ***
│   │     → Shows a dialog listing cities the unit can travel to (filtered by domain compatibility and range), then sets the unit...
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── display_improvement [UI] (33B)
│   │   │     → Adds an improvement/government icon to the text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │     (subtree shown above — 1 children)
│   │   ├── find_city_at [GL] (245B)
│   │   │     → Finds a city at the given (x,y) coordinates
│   │   │     (subtree shown above — 2 children)
│   │   ├── city_adjacent_to_continent [GL] (238B)
│   │   │     → Checks if a city (param_1) is adjacent to a given continent (param_2)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── cities_share_coast [GL] (269B)
│   │   │     → Checks if city param_1 and city param_2 share a coastal connection (both adjacent to the same ocean body)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── city_adjacent_to_continent [GL] (238B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │   │     → Closes a popup dialog by destroying it and clearing its list control.
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── tile_distance_xy [GL] (157B)
│   │   │     → Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`
│   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   │     (subtree shown above — 4 children)
│   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │     → Returns remaining movement points (total - spent)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     → Returns byte 3 of tile data (continent/landmass ID).
│   │   │     (subtree shown above — 1 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   ├── (unit_order_unload_transport) [MIXED] (326B) *** STATE MUTATION ***
│   │     → Unloads ground units from a transport ship
│   │   ├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
│   │   │     → Activates the current unit for player input
│   │   │   ├── center_all_map_views [UI] (116B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── select_next_unit [MIXED] (436B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 19 children)
│   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 7 children)
│   │   │   └── is_unit_ready_to_move [GL] (271B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     → Returns the next unit in the stack linked list, or -1 if at end
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │     → Follows prev pointers to find the first unit in the stack.
│   │   │     (subtree shown above — 1 children)
│   │   └── is_unit_ready_to_move [GL] (271B)
│   │         → Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │         (subtree shown above — 2 children)
│   ├── (unit_order_automate_settler) [GL] (103B) *** STATE MUTATION ***
│   │     → Sets the "automate" flag on a settler/engineer unit (bit 0x8000 in unit flags).
│   └── unit_order_airlift [MIXED] (1609B) *** STATE MUTATION ***
│         → Handles the airlift unit order
│       ├── select_list_item [UI] (38B)
│       │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│       │     (subtree shown above — 1 children)
│       ├── show_message [UI] (46B) *** STATE MUTATION ***
│       │     → Stores a message string in the message buffer at the specified slot index.
│       ├── open_list_dialog [UI] (47B)
│       │     → Opens a list dialog with the given title and flags.
│       │     (subtree shown above — 1 children)
│       ├── show_city_popup [UI] (39B)
│       │     → Shows a city information popup using the dialog system.
│       │     (subtree shown above — 1 children)
│       ├── find_city_at [GL] (245B)
│       │     → Finds a city at the given (x,y) coordinates
│       │     (subtree shown above — 2 children)
│       ├── has_building [GL] (122B)
│       │     → Checks if a city has a specific building
│       │     (subtree shown above — 1 children)
│       ├── show_game_popup_3arg [UI] (43B)
│       │     → Shows a game popup dialog with 3 arguments using the global dialog context.
│       │     (subtree shown above — 1 children)
│       ├── show_game_popup_2arg [UI] (39B)
│       │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│       │     (subtree shown above — 1 children)
│       ├── execute_airlift [GL] (460B) *** STATE MUTATION ***
│       │     → Executes an airlift operation — moves a unit from one city to another
│       │     (subtree shown above — 8 children)
│       ├── unknown (show improvement help) [UI] (43B)
│       │     → Shows help text for an improvement via the help display system.
│       │     (subtree shown above — 1 children)
│       ├── popup_dialog_create [UI] (93B)
│       │     → Creates a new popup dialog object
│       │     (subtree shown above — 2 children)
│       ├── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│       │     → Closes a popup dialog by destroying it and clearing its list control.
│       │     (subtree shown above — 1 children)
│       ├── popup_add_radio_option [UI] (566B)
│       │     → Adds a radio button option to the popup dialog
│       │     (subtree shown above — 2 children)
│       ├── tile_distance_xy [GL] (157B)
│       │     → Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`
│       ├── calc_unit_movement_points [GL] (516B)
│       │     → Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│       │     (subtree shown above — 4 children)
│       └── is_tile_ocean [GL] (57B)
│             → Returns true if terrain type == 10 (ocean).
│             (subtree shown above — 1 children)
├── view_throne_room [UI] (87B)
│     → Views the current throne room without adding improvements
│   ├── init_throne_context [UI] (405B) *** STATE MUTATION ***
│   │     → Initializes the throne room display context
│   │     (subtree shown above — 6 children)
│   ├── destroy_throne_context [UI] (177B)
│   │     → Destroys the throne room display context, releasing all resources.
│   │     (subtree shown above — 1 children)
│   ├── view_throne_display [UI] (244B)
│   │     → Displays the current throne room state for viewing (no modifications).
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── manage_window_show [UI] (37B)
│   │   │     → Calls manage_window_C40A with the window handle from this+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── init_palette_system [UI] (21B)
│   │   │     → Initializes the palette system.
│   │   ├── load_throne_dll [UI] (308B)
│   │   │     → Loads the throne room DLL (pv.dll) and initializes the throne room rendering context with it.
│   │   │     (subtree shown above — 6 children)
│   │   ├── draw_throne_title [UI] (221B)
│   │   │     → Draws the throne room title text ("Throne Room of [Leader Name]") with drop shadow effect.
│   │   │     (subtree shown above — 4 children)
│   │   ├── render_throne_room [UI] (3024B)
│   │   │     → Renders the complete throne room scene by compositing all throne room pieces from DLL resources based on the current ...
│   │   │     (subtree shown above — 7 children)
│   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │     → Stores param_1 at this+4 and calls FUN_00450440 to display it.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │     → Calls manage_window_C44D with the window handle at this+8.
│   │   │     (subtree shown above — 1 children)
│   │   └── modal_dialog_run [UI] (283B)
│   │         → Runs a modal dialog loop
│   │         (subtree shown above — 4 children)
│   └── _strcpy_thunk / _chkstk [FW] (47B)
│         → Stack probe function — touches stack pages in 4KB increments to trigger guard page allocation.
├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│     (subtree shown above — 7 children)
├── redraw_map_all_players [UI] (124B)
│     → Redraws entire map for all active players.
│   └── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│         → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│         (subtree shown above — 6 children)
├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│     → Starts human turn if not already active or if param forces it
│     (subtree shown above — 3 children)
├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
│     → Activates the current unit for player input
│     (subtree shown above — 7 children)
├── toggle_hidden_terrain [UI] (88B) *** STATE MUTATION ***
│     → Toggles hidden terrain debug mode
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   └── redraw_map_all_players [UI] (124B)
│         → Redraws entire map for all active players.
│         (subtree shown above — 1 children)
├── unit_order_disband [MIXED] (722B) *** STATE MUTATION ***
│     → Disbands a unit (or city in cheat mode)
│   ├── FUN_00009429 [??]
│   ├── show_city_popup [UI] (39B)
│   │     → Shows a city information popup using the dialog system.
│   │     (subtree shown above — 1 children)
│   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │     → Sets a string control value in the multiplayer dialog string table
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │     → Sets a dialog string control to an improvement/building name
│   │     (subtree shown above — 1 children)
│   ├── find_city_at [GL] (245B)
│   │     → Finds a city at the given (x,y) coordinates
│   │     (subtree shown above — 2 children)
│   ├── show_game_popup_2arg [UI] (39B)
│   │     → Shows a game popup dialog with 2 arguments using the global dialog context.
│   │     (subtree shown above — 1 children)
│   ├── update_map_area_all_players [UI] (136B)
│   │     → Updates a map area for all active players (all viewports in MP).
│   │     (subtree shown above — 1 children)
│   ├── redraw_map_all_players [UI] (124B)
│   │     → Redraws entire map for all active players.
│   │     (subtree shown above — 1 children)
│   ├── init_city_production_globals [GL] (77B) *** STATE MUTATION ***
│   │     → Initializes two global production variables from a city's current production type and accumulated shields.
│   ├── find_unit_stack_at_xy [GL] (231B)
│   │     → Finds the first unit of any civ at map position (param_1, param_2)
│   │     (subtree shown above — 3 children)
│   └── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│         → Safely deletes a unit, handling the case where it's a ship carrying units
│         (subtree shown above — 10 children)
└── unit_order_sentry [MIXED] (451B) *** STATE MUTATION ***
      → Places units on sentry duty
    ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
    │     → Major game logic function that processes visibility updates after a unit moves
    │     (subtree shown above — 26 children)
    ├── get_improvement_name [FW] (92B)
    │     → Returns a pointer to the Nth string in the string pool
    ├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
    │     → Activates the current unit for player input
    │     (subtree shown above — 7 children)
    ├── find_unit_stack_at_xy [GL] (231B)
    │     → Finds the first unit of any civ at map position (param_1, param_2)
    │     (subtree shown above — 3 children)
    ├── sum_stack_property [GL] (724B)
    │     → Sums a property across all units in a stack
    │     (subtree shown above — 2 children)
    └── show_unit_list_dialog [UI] (693B) *** STATE MUTATION ***
          → Shows a scrolling dialog listing all units in a stack with their details (civ name, veteran flag, type name, home cit...
        ├── text_begin [UI] (29B)
        │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
        ├── text_add_label_id [UI] (33B)
        │     → Appends a localized label (by ID) to the global text buffer.
        ├── mapgen_set_dialog_type [UI] (42B)
        │     → Sets up a dialog/progress indicator for map generation with the given type parameter.
        │   └── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
        │         (subtree shown above — 8 children)
        ├── select_list_item [UI] (38B)
        │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
        │     (subtree shown above — 1 children)
        ├── text_newline [UI] (29B)
        │     → Adds a newline to the global text buffer.
        ├── text_begin_italic [UI] (29B)
        │     → Begins italic text mode in the global text buffer.
        ├── text_end_italic [UI] (29B)
        │     → Ends italic text mode in the global text buffer.
        ├── display_improvement [UI] (33B)
        │     → Adds an improvement/government icon to the text buffer.
        ├── set_status_bar_text [UI] (33B)
        │     → Sets the status bar text to param_1 using the global string buffer.
        ├── unknown (string pool append separator) [UI] (29B)
        │     → Appends a separator to the string buffer at DAT_00679640 using thunk_FUN_004aef96.
        ├── get_civ_adjective_name [GL] (145B)
        │     → Returns the adjective form of a civilization name
        ├── popup_dialog_create [UI] (93B)
        │     → Creates a new popup dialog object
        │     (subtree shown above — 2 children)
        ├── popup_set_title [UI] (86B)
        │     → Sets the popup dialog title string
        ├── popup_set_scaled_width [UI] (99B)
        │     → Sets the popup dialog width (this+0x11C) with optional resolution scaling
        ├── popup_add_button [UI] (360B)
        │     → Adds a button to the popup dialog
        │     (subtree shown above — 2 children)
        ├── get_next_unit_in_stack [GL] (65B)
        │     → Returns the next unit in the stack linked list, or -1 if at end
        │     (subtree shown above — 1 children)
        ├── get_first_unit_in_stack [GL] (118B)
        │     → Follows prev pointers to find the first unit in the stack.
        │     (subtree shown above — 1 children)
        └── sprite_init_empty [UI] (140B)
              → Initializes a sprite with given dimensions and fill color
              (subtree shown above — 3 children)
```

---

## map_double_click (`00411705`, 767B)

Reachable: 167 functions, 8 state-mutating

```
map_double_click [MIXED] (767B) *** STATE MUTATION ***
  → Handles double-click on the map
├── is_tile_valid [GL] (80B)
│     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── grassland_has_shield [GL] (72B)
│     → Determines if a grassland tile at (param_1, param_2) has the bonus grassland shield
├── chatwin_select_item [UI] (321B) *** STATE MUTATION ***
│     → Handles item selection in the chat/civilopedia window
│   ├── end_paint [UI] (32B)
│   │     → Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│   │   └── invalidate_region [UI] (180B)
│   │         → Invalidates a screen region
│   │       ├── blit_rect_to_screen [UI] (43B)
│   │       │   └── validate_window_rect [UI] (43B)
│   │       └── port_copy_to_screen_clipped [UI] (220B)
│   │           ├── FUN_0000CC11 [??]
│   │           ├── rect_get_width [UI] (27B)
│   │           ├── rect_get_height [UI] (28B)
│   │           ├── get_view_window_handle [UI] (28B)
│   │           ├── get_surface_hwnd [UI] (28B)
│   │           ├── port_lock [UI] (287B)
│   │           │   ├── check_topdown [UI] (41B)
│   │           │   └── get_pixel_buffer [UI] (39B)
│   │           ├── port_unlock [UI] (83B)
│   │           ├── port_select_palette [UI] (87B)
│   │           │   └── write_full_colortable [UI] (39B)
│   │           └── surface_is_locked [UI] (44B)
│   ├── unknown (lock pedia surface) [UI] (38B)
│   │     → Locks the drawing surface for the pedia widget.
│   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │     → Retrieves the drawing context from this+8.
│   │   │   └── focus_and_raise_window [UI] (57B)
│   │   └── surface_list_find_dirty [UI] (174B)
│   │         → Walks the surface list looking for a dirty surface (via FUN_005c5ea0)
│   ├── pedia_init_tabs [UI] (1391B)
│   │     → Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) ...
│   │   ├── control_invalidate [UI] (65B)
│   │   │     → Invalidates a UI control for repainting
│   │   │   ├── FUN_00008B00 [??]
│   │   │   └── FUN_00008B2D [??]
│   │   ├── set_edit_text [UI] (43B)
│   │   │     → Sets the text content of an edit control.
│   │   │   └── FUN_00002D7F [??]
│   │   ├── pedia_button_ctor [UI] (83B)
│   │   │     → Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B)
│   │   │     → Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   │   ├── FUN_00008BE1 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── FUN_0000944B [??]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── unknown (set button callback) [UI] (33B)
│   │   │     → Sets a callback function pointer at this+0x34.
│   │   └── unknown (clear hypertext links) [UI] (21B)
│   │         → Clears/frees the hypertext link list.
│   ├── chatwin_draw_terrain_info [UI] (5344B) *** STATE MUTATION ***
│   │     → Draws detailed terrain information in the chat/info window
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B)
│   │   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── invalidate_region [UI] (180B)
│   │   │     → Invalidates a screen region
│   │   │     (subtree shown above — 2 children)
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B)
│   │   │     → Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── FUN_0000858E [??]
│   │   ├── text_begin_bold [UI] (29B)
│   │   │     → Begins bold text mode in the global text buffer.
│   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │     → Returns the width of the icon rectangle at this+0x10.
│   │   │   └── rect_get_width [UI] (27B)
│   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │     → Returns the height of the icon rectangle at this+0x10.
│   │   │   └── rect_get_height [UI] (28B)
│   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │     → Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) ...
│   │   │     (subtree shown above — 6 children)
│   │   ├── pedia_show_description [UI] (593B)
│   │   │     → Shows a description for the selected Civilopedia entry, handling scenario-specific description files
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   └── FUN_00008B00 [??]
│   │   │   └── pedia_set_selection [UI] (47B)
│   │   │       └── FUN_00008B00 [??]
│   │   ├── pedia_add_hyperlink [UI] (1361B)
│   │   │     → Adds a clickable hyperlink text node to the Civilopedia display
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── hypertext_widget_create [UI] (139B)
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── unknown (create hypertext window) [UI] (167B)
│   │   │   │       ├── FUN_000029DF [??]
│   │   │   │       ├── rect_get_width [UI] (27B)
│   │   │   │       ├── rect_get_height [UI] (28B)
│   │   │   │       ├── get_window_object [UI] (28B)
│   │   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │   │       └── control_alloc_instance [UI] (202B)
│   │   │   ├── pedia_link_node_ctor [UI] (86B)
│   │   │   ├── unknown (set link callback) [UI] (33B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   └── draw_string_palette [UI] (534B)
│   │   │   │       ├── FUN_0000847F [??]
│   │   │   │       ├── FUN_0000858E [??]
│   │   │   │       ├── rect_get_width [UI] (27B)
│   │   │   │       └── rect_get_height [UI] (28B)
│   │   │   ├── port_alloc [UI] (683B)
│   │   │   │   ├── FUN_000040FB [??]
│   │   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   │   ├── unknown (get surface base) [UI] (28B)
│   │   │   │   ├── check_topdown [UI] (41B)
│   │   │   │   ├── fill_scanline_8bit [UI] (126B)
│   │   │   │   └── fill_column_8bit [UI] (83B)
│   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   ├── chatwin_find_item_index [UI] (86B)
│   │   │     → Finds the display index for a given item ID by searching the item list at DAT_006a74bc
│   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │     → Draws a background panel for the Civilopedia
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   │       ├── set_rect_wh [UI] (48B)
│   │   │   │       └── port_fill_rect [UI] (236B)
│   │   │   └── tile_bitmap [UI] (391B)
│   │   │       └── blit_rect_to_rect [UI] (95B)
│   │   │           ├── set_rect_wh [UI] (48B)
│   │   │           └── port_blit_stretch [UI] (443B)
│   │   ├── pedia_get_entry_name [UI] (89B)
│   │   │     → Gets the name string for a Civilopedia entry by index from a linked list.
│   │   ├── port_set_rect [UI] (91B)
│   │   │     → Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_set_clip_rect [UI] (55B)
│   │   │     → Copies the port's clip rect (this+0x14..0x20) into the output parameter.
│   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │     → Draws text with a specific font (param_1 points to font handle)
│   │   │     (subtree shown above — 3 children)
│   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │     → Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B)
│   │   │     → Builds a primary scale mapping table for pixel scaling
│   │   ├── scale_table_get_current [UI] (36B)
│   │   │     → Returns current primary scale ratio into param_1 and param_2.
│   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │         → Calls FUN_005d056c with transparency=0xFF (no transparency)
│   │       └── dispatch_oleitem_normal [UI] (673B)
│   │           ├── rect_get_width [UI] (27B)
│   │           ├── rect_get_height [UI] (28B)
│   │           ├── unknown (get panel icon width) [UI] (37B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── unknown (get panel icon height) [UI] (37B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── init_editor_scrollbar [UI] (34B)
│   │           │   └── rect_get_width [UI] (27B)
│   │           ├── widget_get_height [UI] (34B)
│   │           │   └── rect_get_height [UI] (28B)
│   │           ├── get_surface_buffer_handle [UI] (28B)
│   │           ├── unknown (get surface base) [UI] (28B)
│   │           ├── scale_coords [UI] (254B)
│   │           ├── check_topdown [UI] (41B)
│   │           └── pixel_copy [UI] (305B)
│   ├── pedia_clear_item_list [UI] (118B)
│   │     → Clears the linked list of Civilopedia display items
│   │   └── init_palette_system [UI] (21B)
│   │         → Initializes the palette system.
│   ├── pedia_draw_frame [UI] (800B)
│   │     → Draws the decorative frame around the Civilopedia window including borders, title text with shadow effect, and backgr...
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B)
│   │   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── measure_text_height [UI] (42B)
│   │   │     → Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │     (subtree shown above — 1 children)
│   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │     → Inflates a rectangle by negative amounts (shrinks it)
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │     → Draws a background panel for the Civilopedia
│   │   │     (subtree shown above — 4 children)
│   │   ├── draw_3d_border [UI] (167B)
│   │   │     → Draws a 3D border around a RECT
│   │   │   ├── draw_hline [UI] (69B)
│   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   └── fill_surface_from_rect [UI] (71B)
│   │   │   │         (subtree shown above — 3 children)
│   │   │   └── draw_vline [UI] (69B)
│   │   │       ├── set_rect_abs [UI] (42B)
│   │   │       └── fill_surface_from_rect [UI] (71B)
│   │   │             (subtree shown above — 3 children)
│   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │     → Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B)
│   │   │     → Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │     → Draws text with a specific font (param_1 points to font handle)
│   │   │     (subtree shown above — 3 children)
│   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │     → Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B)
│   │   │     → Builds a primary scale mapping table for pixel scaling
│   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │         → Calls FUN_005d056c with transparency=0xFF (no transparency)
│   │         (subtree shown above — 1 children)
│   ├── pedia_open_category [UI] (200B) *** STATE MUTATION ***
│   │     → Opens a specific category in the Civilopedia
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │   └── show_window_inner [UI] (38B)
│   │   │       ├── manage_window_show [UI] (37B)
│   │   │       │   └── FUN_0000C40A [??]
│   │   │       └── surface_list_find_dirty [UI] (174B)
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── unknown (lock pedia surface) [UI] (38B)
│   │   │     → Locks the drawing surface for the pedia widget.
│   │   │     (subtree shown above — 2 children)
│   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │     → Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) ...
│   │   │     (subtree shown above — 6 children)
│   │   ├── pedia_set_title [UI] (229B)
│   │   │     → Sets the title text for the Civilopedia window based on the category
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   └── text_add_label_id [UI] (33B)
│   │   ├── pedia_push_history [UI] (523B) *** STATE MUTATION ***
│   │   │     → Pushes the current navigation state onto the Civilopedia history stack for back-button support
│   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │       ├── end_paint [UI] (32B)
│   │       │     (subtree shown above — 1 children)
│   │       └── call_refresh_callback [UI] (47B)
│   ├── pedia_get_entry_name [UI] (89B)
│   │     → Gets the name string for a Civilopedia entry by index from a linked list.
│   ├── modal_dialog_run [UI] (283B)
│   │     → Runs a modal dialog loop
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │   └── FUN_0000BA4F [??]
│   │   ├── get_view_window_handle [UI] (28B)
│   │   │     → Returns the window handle stored at offset 8 of the current object.
│   │   ├── disable_parent_window [UI] (121B)
│   │   │     → Disables the parent (or specified owner) window to create a modal-like effect.
│   │   └── enable_parent_window [UI] (126B)
│   │         → Re-enables the parent (or specified owner) window, reversing the modal effect.
│   └── _strcpy_thunk [FW] (7B)
│         → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── citywin_modal_refresh [UI] (132B) *** STATE MUTATION ***
│     → Shows a modal city refresh message
│   ├── FUN_0000BC4F [??]
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   └── unknown (dialog show single param) [UI] (33B)
│         → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│       └── show_help_topic [UI] (34B)
│             → Opens a help topic with default parameters.
│           └── show_help_topic_ext [UI] (38B)
│               └── show_help_dialog [UI] (46B)
│                   └── FUN_0051D3E0 [??] (351B)
├── get_tile_terrain_raw [GL] (41B)
│     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   └── get_tile_ptr [GL] (90B)
│         → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│       └── is_tile_valid [GL] (80B)
│             → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── get_tile_explored [GL] (71B)
│     → Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   └── get_tile_ptr [GL] (90B)
│         → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│         (subtree shown above — 1 children)
├── get_tile_controller [GL] (72B)
│     → Returns the controlling civ at a tile — city owner first, then unit owner.
│   ├── get_city_owner_at [GL] (111B)
│   │     → Returns the city-owning civ at a tile, or -1
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── get_tile_owner [GL] (100B)
│   │   │     → Returns the owner civ index for a tile (upper nibble of byte 5, >> 4)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   │         (subtree shown above — 1 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │       └── get_tile_ptr [GL] (90B)
│   │             (subtree shown above — 1 children)
│   └── get_unit_owner_at [GL] (66B)
│         → Returns the civ with units at a tile, or -1
│       ├── get_tile_owner [GL] (100B)
│       │     → Returns the owner civ index for a tile (upper nibble of byte 5, >> 4)
│       │     (subtree shown above — 2 children)
│       └── get_tile_improvements [GL] (39B)
│             → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│             (subtree shown above — 1 children)
├── check_tile_resource [GL] (281B)
│     → Checks if a tile has a special resource
│   ├── is_tile_valid [GL] (80B)
│   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   └── get_tile_ptr [GL] (90B)
│         → Returns pointer to 6-byte tile data for map position (param_1, param_2)
│         (subtree shown above — 1 children)
└── get_active_control [UI] (21B)
      → Returns DAT_00637ea4 (the active control handle).
```

---

## minimap_left_click (`004074DC`, 380B)

Reachable: 163 functions, 13 state-mutating

```
minimap_left_click [UI] (380B)
  → Handles a left-click on the minimap
├── is_tile_valid [GL] (80B)
│     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│     → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │   ├── minimap_full_redraw [UI] (416B) *** STATE MUTATION ***
│   │   │     → Performs a complete minimap redraw: recalculates viewport, iterates over all visible map tiles, draws each tile's col...
│   │   │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │   │   │   └── wrap_x [GL] (94B)
│   │   │   ├── minimap_get_tile_color [UI] (425B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   ├── minimap_draw_goto_line [UI] (211B)
│   │   │   │   ├── minimap_tile_to_screen [UI] (169B)
│   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   └── surface_fill_rect_color [UI] (63B)
│   │   │   │       └── draw_rect_outline [UI] (128B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │   └── invalidate_region [UI] (180B)
│   │   │   │       ├── blit_rect_to_screen [UI] (43B)
│   │   │   │       └── port_copy_to_screen_clipped [UI] (220B)
│   │   │   ├── surface_set_clear_color [UI] (34B)
│   │   │   │   └── unknown (clear_surface_region) [UI] (28B)
│   │   │   │       └── port_set_color [UI] (43B)
│   │   │   ├── fill_rect_palette [UI] (50B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   │       ├── set_rect_wh [UI] (48B)
│   │   │   │       └── port_fill_rect [UI] (236B)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   └── FUN_0000858E [??]
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   │   └── widget_inflate_rect [UI] (34B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   │   └── draw_string_palette [UI] (534B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │       └── dispatch_oleitem_normal [UI] (673B)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   │   └── swap_dc [UI] (43B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │   ├── FUN_00008BE1 [??]
│   │   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── recalc_viewport_geometry [UI] (1410B) *** STATE MUTATION ***
│   │   │     → Recalculates all viewport geometry metrics: tile dimensions at current zoom, number of visible tiles, viewport origin...
│   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   ├── FUN_00008200 [??]
│   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   └── delete_font [UI] (98B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   └── scale_sprite [UI] (35B)
│   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   └── set_sprite_scale [UI] (33B)
│   │   │   │       └── scale_table_build_primary [UI] (657B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   └── port_alloc [UI] (325B)
│   │   │   │       ├── FUN_000035B0 [??]
│   │   │   │       ├── rect_get_width [UI] (27B)
│   │   │   │       ├── rect_get_height [UI] (28B)
│   │   │   │       ├── port_init [UI] (258B)
│   │   │   │       ├── port_lock [UI] (287B)
│   │   │   │       ├── port_unlock [UI] (83B)
│   │   │   │       ├── surface_is_locked [UI] (44B)
│   │   │   │       ├── destroy_dib_surface [UI] (155B)
│   │   │   │       ├── get_surface_stride [UI] (48B)
│   │   │   │       └── check_topdown [UI] (41B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── redraw_full_viewport [UI] (278B)
│   │   │     → Redraws all visible tiles in the viewport
│   │   │   ├── draw_complete_tile [UI] (495B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   └── wrap_x [GL] (94B)
│   │   │   │   ├── render_tile [UI] (4431B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── grassland_has_shield [GL] (72B)
│   │   │   │   │   ├── get_civ_background_color [UI] (92B)
│   │   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   │   ├── calc_coast_quadrants [UI] (386B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_x_in_range [UI] (141B)
│   │   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   ├── diagonal_movement_cost [GL] (135B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   │   ├── port_copy_rect [UI] (282B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── render_city_on_map [UI] (392B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── draw_city_sprite [UI] (1737B) *** STATE MUTATION ***
│   │   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── draw_units_at_tile [UI] (662B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── draw_unit_with_stacking [UI] (351B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── is_unit_ready_to_move [GL] (271B)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   │   │         (subtree shown above — 3 children)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── FUN_0064F394 [??]
│   │   │   ├── draw_city_labels [UI] (871B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_foreground_color [UI] (92B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │   └── is_tile_in_viewport_rect [UI] (97B)
│   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   └── draw_text_with_shadow [UI] (205B)
│   │   │   │       ├── measure_text_height [UI] (42B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       └── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── unknown (clear_surface_region) [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── begin_end_paint_cycle [UI] (100B)
│   │   │     → Performs a paint cycle: begin paint, poll network (if MP), end paint, begin paint again, poll again
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │   │     (subtree shown above — 15 children)
│   │   └── dialog_create_buttons [UI] (675B)
│   │         → Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │         (subtree shown above — 8 children)
│   └── wrap_x [GL] (94B)
│         → Wraps an X coordinate for a cylindrical (non-flat) map
├── citywin_modal_refresh [UI] (132B) *** STATE MUTATION ***
│     → Shows a modal city refresh message
│   ├── FUN_0000BC4F [??]
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   └── unknown (dialog show single param) [UI] (33B)
│         → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│       └── show_help_topic [UI] (34B)
│             → Opens a help topic with default parameters.
│           └── show_help_topic_ext [UI] (38B)
│               └── show_help_dialog [UI] (46B)
│                   └── FUN_0051D3E0 [??] (351B)
├── clamp [FW] (57B)
│     → Clamps a value to [min, max] range
└── wrap_x [GL] (94B)
      → Wraps an X coordinate for a cylindrical (non-flat) map
```

---

## minimap_right_click (`00407658`, 510B)

Reachable: 221 functions, 16 state-mutating

```
minimap_right_click [UI] (510B)
  → Handles a right-click on the minimap
├── is_tile_valid [GL] (80B)
│     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│     → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │   ├── minimap_full_redraw [UI] (416B) *** STATE MUTATION ***
│   │   │     → Performs a complete minimap redraw: recalculates viewport, iterates over all visible map tiles, draws each tile's col...
│   │   │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │   │   │   └── wrap_x [GL] (94B)
│   │   │   ├── minimap_get_tile_color [UI] (425B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   ├── minimap_draw_goto_line [UI] (211B)
│   │   │   │   ├── minimap_tile_to_screen [UI] (169B)
│   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   └── surface_fill_rect_color [UI] (63B)
│   │   │   │       └── draw_rect_outline [UI] (128B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │   └── invalidate_region [UI] (180B)
│   │   │   │       ├── blit_rect_to_screen [UI] (43B)
│   │   │   │       └── port_copy_to_screen_clipped [UI] (220B)
│   │   │   ├── surface_set_clear_color [UI] (34B)
│   │   │   │   └── unknown (clear_surface_region) [UI] (28B)
│   │   │   │       └── port_set_color [UI] (43B)
│   │   │   ├── fill_rect_palette [UI] (50B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   │       ├── set_rect_wh [UI] (48B)
│   │   │   │       └── port_fill_rect [UI] (236B)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   └── FUN_0000858E [??]
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   │   └── widget_inflate_rect [UI] (34B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   │   └── draw_string_palette [UI] (534B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │       └── dispatch_oleitem_normal [UI] (673B)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   │   └── swap_dc [UI] (43B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │   ├── FUN_00008BE1 [??]
│   │   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── recalc_viewport_geometry [UI] (1410B) *** STATE MUTATION ***
│   │   │     → Recalculates all viewport geometry metrics: tile dimensions at current zoom, number of visible tiles, viewport origin...
│   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   ├── FUN_00008200 [??]
│   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   └── delete_font [UI] (98B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   └── scale_sprite [UI] (35B)
│   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   └── set_sprite_scale [UI] (33B)
│   │   │   │       └── scale_table_build_primary [UI] (657B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   └── port_alloc [UI] (325B)
│   │   │   │       ├── FUN_000035B0 [??]
│   │   │   │       ├── rect_get_width [UI] (27B)
│   │   │   │       ├── rect_get_height [UI] (28B)
│   │   │   │       ├── port_init [UI] (258B)
│   │   │   │       ├── port_lock [UI] (287B)
│   │   │   │       ├── port_unlock [UI] (83B)
│   │   │   │       ├── surface_is_locked [UI] (44B)
│   │   │   │       ├── destroy_dib_surface [UI] (155B)
│   │   │   │       ├── get_surface_stride [UI] (48B)
│   │   │   │       └── check_topdown [UI] (41B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── redraw_full_viewport [UI] (278B)
│   │   │     → Redraws all visible tiles in the viewport
│   │   │   ├── draw_complete_tile [UI] (495B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   └── wrap_x [GL] (94B)
│   │   │   │   ├── render_tile [UI] (4431B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── grassland_has_shield [GL] (72B)
│   │   │   │   │   ├── get_civ_background_color [UI] (92B)
│   │   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   │   ├── calc_coast_quadrants [UI] (386B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_x_in_range [UI] (141B)
│   │   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   ├── diagonal_movement_cost [GL] (135B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   │   ├── port_copy_rect [UI] (282B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── render_city_on_map [UI] (392B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── draw_city_sprite [UI] (1737B) *** STATE MUTATION ***
│   │   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── draw_units_at_tile [UI] (662B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── draw_unit_with_stacking [UI] (351B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── is_unit_ready_to_move [GL] (271B)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   │   │         (subtree shown above — 3 children)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── FUN_0064F394 [??]
│   │   │   ├── draw_city_labels [UI] (871B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_foreground_color [UI] (92B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │   └── is_tile_in_viewport_rect [UI] (97B)
│   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   └── draw_text_with_shadow [UI] (205B)
│   │   │   │       ├── measure_text_height [UI] (42B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       └── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── unknown (clear_surface_region) [UI] (28B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── begin_end_paint_cycle [UI] (100B)
│   │   │     → Performs a paint cycle: begin paint, poll network (if MP), end paint, begin paint again, poll again
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │   │     (subtree shown above — 15 children)
│   │   └── dialog_create_buttons [UI] (675B)
│   │         → Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │         (subtree shown above — 8 children)
│   └── wrap_x [GL] (94B)
│         → Wraps an X coordinate for a cylindrical (non-flat) map
├── initialize_map_view [UI] (889B) *** STATE MUTATION ***
│     → Full initialization of a map view window: sets initial zoom/filter, creates the view bitmap surface, registers all ca...
│   ├── rect_get_width [UI] (27B)
│   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── rect_get_height [UI] (28B)
│   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   ├── set_callback_paint [UI] (45B)
│   │     → Sets the paint callback handler on the window object
│   ├── set_callback_resize [UI] (45B)
│   │     → Sets the resize callback handler on the window object at this+0x18.
│   ├── set_callback_0x30 [UI] (45B)
│   │     → Sets a callback handler at this+0x30.
│   ├── set_callback_0x40 [UI] (45B)
│   │     → Sets a callback handler at this+0x40.
│   ├── set_callback_0x44 [UI] (45B)
│   │     → Sets a callback handler at this+0x44.
│   ├── set_scroll_amounts [UI] (45B)
│   │     → Sets horizontal and vertical scroll amounts on the window object.
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   └── show_window_inner [UI] (38B)
│   │         → Shows the window by calling manage_window then a follow-up display function.
│   │       ├── manage_window_show [UI] (37B)
│   │       │   └── FUN_0000C40A [??]
│   │       └── surface_list_find_dirty [UI] (174B)
│   ├── set_rect_wh [UI] (48B)
│   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   ├── setup_main_view_rect [UI] (153B)
│   │     → Calculates and sets the main map view rectangle dimensions, accounting for minimap panel offset.
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── get_window_width [UI] (37B)
│   │   │     → Returns the window width by calling FUN_005bc933 with the window handle from this+8.
│   │   │   └── get_client_width [UI] (56B)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   └── get_view_height [UI] (37B)
│   │         → Returns the height of the current view window.
│   │       └── get_client_height [UI] (56B)
│   ├── setup_map_status_bar [UI] (304B)
│   │     → Sets up the map window status bar content: player name, language indicator, and map view filter options.
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_bold [UI] (29B)
│   │   │     → Begins bold text mode in the global text buffer.
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   ├── set_status_bar_text [UI] (33B)
│   │   │     → Sets the status bar text to param_1 using the global string buffer.
│   │   └── unknown (dialog_set_title_and_redraw) [UI] (139B)
│   │         → Sets the dialog title string (at offset 0x134, max 0x83 chars) then redraws the title bar and invalidates the rect.
│   │       ├── invalidate_region [UI] (180B)
│   │       │     (subtree shown above — 2 children)
│   │       └── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │             (subtree shown above — 15 children)
│   ├── set_callback_0 [FW] (43B)
│   │     → Sets callback function pointer at offset 0 of the object
│   ├── set_callback_4 [FW] (45B)
│   │     → Sets callback function pointer at offset 4
│   ├── set_callback_8 [FW] (45B)
│   │     → Sets callback function pointer at offset 8
│   ├── set_callback_1c [FW] (45B)
│   │     → Sets callback function pointer at offset 0x1C (double-click handler)
│   ├── get_improvement_name [FW] (92B)
│   │     → Returns a pointer to the Nth string in the string pool
│   ├── init_map_viewport [UI] (224B) *** STATE MUTATION ***
│   │     → Initializes the map viewport object
│   ├── dialog_add_button [UI] (192B)
│   │     → Adds a button to a dialog (max 6 buttons)
│   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │     → Gets scrollbar width by calling FUN_00407f90.
│   │   │   └── rect_get_width [UI] (27B)
│   │   └── widget_get_height [UI] (34B)
│   │         → Returns the height of a widget by calling thunk_FUN_00407fc0.
│   │       └── rect_get_height [UI] (28B)
│   ├── dialog_create [UI] (588B)
│   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   ├── unknown (set_font_size) [UI] (43B)
│   │   │     → Sets font size via internal object.
│   │   │   └── set_callback_0x38 [UI] (40B)
│   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │     → Sets the video source for a dialog.
│   │   │   └── set_callback_0x3c [UI] (40B)
│   │   ├── dialog_create_buttons [UI] (675B)
│   │   │     → Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │   │     (subtree shown above — 8 children)
│   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │     → Sets message handler at offset 0x60, returns old handler.
│   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │     → Sets message handler at offset 0x64, returns old handler.
│   │   └── create_offscreen_surface_b [UI] (119B)
│   │         → Creates an offscreen surface variant with 8 parameters (includes parent window).
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── port_alloc_rect [UI] (58B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── port_draw_text_rect [UI] (77B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       │       └── FUN_00003B4C [??]
│   │       ├── surface_create_8param [UI] (85B)
│   │       │   ├── get_view_window_handle [UI] (28B)
│   │       │   ├── surface_init_8 [UI] (96B)
│   │       │   │   ├── get_view_window_handle [UI] (28B)
│   │       │   │   └── set_child_wndproc [UI] (55B)
│   │       │   └── set_dialog_wndproc [UI] (55B)
│   │       └── set_window_data_and_wndproc [UI] (55B)
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│       ├── end_paint [UI] (32B)
│       │     → Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│       │     (subtree shown above — 1 children)
│       └── call_refresh_callback [UI] (47B)
│             → Invokes the refresh callback function pointer stored at ECX+0x110, if non-null.
├── citywin_modal_refresh [UI] (132B) *** STATE MUTATION ***
│     → Shows a modal city refresh message
│   ├── FUN_0000BC4F [??]
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   └── unknown (dialog show single param) [UI] (33B)
│         → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│       └── show_help_topic [UI] (34B)
│             → Opens a help topic with default parameters.
│           └── show_help_topic_ext [UI] (38B)
│               └── show_help_dialog [UI] (46B)
│                   └── FUN_0051D3E0 [??] (351B)
├── clamp [FW] (57B)
│     → Clamps a value to [min, max] range
└── wrap_x [GL] (94B)
      → Wraps an X coordinate for a cylindrical (non-flat) map
```

---

## main_menu_command_dispatch (`004E2803`, 4219B)

Reachable: 1023 functions, 211 state-mutating

```
main_menu_command_dispatch [MIXED] (4219B) *** STATE MUTATION ***
  → Main menu command dispatcher
├── FUN_00058E14 [??]
├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION ***
│     → Shows the tax rate dialog for a civ
│   ├── FUN_00009429 [??]
│   ├── open_tax_rate_dialog [MIXED] (4140B) *** STATE MUTATION ***
│   │     → Creates and runs the tax rate adjustment dialog
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │   └── show_window_inner [UI] (38B)
│   │   │       ├── manage_window_show [UI] (37B)
│   │   │       │   └── FUN_0000C40A [??]
│   │   │       └── surface_list_find_dirty [UI] (174B)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_max_tax_rate [GL] (156B)
│   │   │     → Returns the maximum tax/luxury/science rate allowed for a civ based on its government type
│   │   ├── balance_tax_rates [GL] (293B) *** STATE MUTATION ***
│   │   │     → Balances three tax rate sliders (tax, luxury, science) to sum to 10, respecting individual maximums and lock flags
│   │   ├── taxrate_recalc_totals [MIXED] (848B) *** STATE MUTATION ***
│   │   │     → Recalculates tax/luxury/science income totals for the tax rate dialog
│   │   │   ├── has_building [GL] (122B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   │   └── is_wonder_obsolete [GL] (120B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   └── get_wonder_city [GL] (57B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   │   └── count_worker_tiles_with_status [GL] (87B)
│   │   │   │       └── get_worker_tile_status [GL] (68B)
│   │   │   └── calc_building_upkeep_cost [GL] (305B)
│   │   │       ├── civ_has_active_wonder [GL] (142B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       └── civ_has_tech [GL] (181B)
│   │   │             (subtree shown above — 1 children)
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │   └── FUN_0000BA4F [??]
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B)
│   │   │     → Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── FUN_0000858E [??]
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │   ├── FUN_00009740 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── FUN_0000944B [??]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_owner [UI] (45B)
│   │   │     → Sets the button's owner/parent reference
│   │   │   └── get_window_object [UI] (28B)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │   └── get_window_object [UI] (28B)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── create_checkbox [UI] (167B)
│   │   │     → Creates a checkbox control
│   │   │   ├── FUN_0000BF40 [??]
│   │   │   ├── FUN_0000C0F0 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_checkbox_callback [UI] (33B)
│   │   │     → Sets the checkbox callback function pointer.
│   │   ├── set_checkbox_value [UI] (33B)
│   │   │     → Sets the checkbox checked/unchecked value.
│   │   ├── create_scrollbar [UI] (124B)
│   │   │     → Creates a scrollbar control
│   │   │   ├── FUN_0000CF17 [??]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │       └── scrollbar_set_pos [UI] (39B)
│   │   │           └── FUN_0000D149 [??]
│   │   ├── scrollbar_set_position [UI] (52B)
│   │   │     → Sets the scrollbar position value and updates the scrollbar control.
│   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── scrollbar_set_range [UI] (47B)
│   │   │     → Sets the scrollbar min/max range.
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │     → Sets the scrollbar change callback.
│   │   ├── dialog_repaint_check [UI] (91B)
│   │   │     → Conditionally triggers a repaint if the current dialog matches the expected one.
│   │   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │       ├── end_paint [UI] (32B)
│   │   │       │   └── invalidate_region [UI] (180B)
│   │   │       └── call_refresh_callback [UI] (47B)
│   │   ├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│   │   │     → Saves CIV2.DAT preferences file
│   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │     → Entry point for full city production calculation
│   │   │   ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_worked [GL] (62B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │       └── get_tile_ptr [GL] (90B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION ***
│   │   │   │   ├── check_unit_support [GL] (281B) *** STATE MUTATION ***
│   │   │   │   ├── calc_food_box_size [GL] (512B) *** STATE MUTATION ***
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   └── recalc_city_all [GL] (76B) *** STATE MUTATION ***
│   │   │       ├── assign_worker_tiles [GL] (2002B) *** STATE MUTATION ***
│   │   │       │   ├── is_tile_worked [GL] (62B)
│   │   │       │   ├── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│   │   │       │   ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION ***
│   │   │       │   ├── clear_and_check_worked_tiles [GL] (115B) *** STATE MUTATION ***
│   │   │       │   └── unknown (get_city_tile_flag) [GL] (29B)
│   │   │       ├── sync_worker_tile_status [GL] (155B) *** STATE MUTATION ***
│   │   │       │   ├── set_worker_tile_status [GL] (93B) *** STATE MUTATION ***
│   │   │       │   └── get_worker_tile_status [GL] (68B)
│   │   │       ├── calc_city_production [GL] (1053B) *** STATE MUTATION ***
│   │   │       │   ├── has_building [GL] (122B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_tech [GL] (181B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── calc_corruption [GL] (890B) *** STATE MUTATION ***
│   │   │       ├── calc_happiness [GL] (2627B) *** STATE MUTATION ***
│   │   │       │   ├── has_building [GL] (122B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION ***
│   │   │       │   ├── get_wonder_city [GL] (57B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 8 children)
│   │   │       │   ├── civ_has_tech [GL] (181B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── adjust_happy_unhappy [GL] (453B) *** STATE MUTATION ***
│   │   │       │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 5 children)
│   │   │       │   ├── calc_movement_cost [GL] (94B)
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── find_unit_stack_at_xy [GL] (231B)
│   │   │       │         (subtree shown above — 3 children)
│   │   │       └── calc_trade_route_income [GL] (378B) *** STATE MUTATION ***
│   │   ├── citywin_refresh_top_panels [UI] (153B)
│   │   │     → Refreshes the top panels of the city window (citizens, resources, map)
│   │   │   ├── FUN_00008ADC [??]
│   │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── draw_citizens_row [UI] (577B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── draw_text_centered [UI] (46B)
│   │   │   │   │   └── draw_text_centered [UI] (139B)
│   │   │   │   ├── close_dialog [UI] (94B) *** STATE MUTATION ***
│   │   │   │   │   └── remove_click_region [UI] (107B) *** STATE MUTATION ***
│   │   │   │   ├── citywin_prepare_panel [UI] (77B)
│   │   │   │   │   ├── citywin_blit_panel [UI] (129B)
│   │   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   └── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   ├── citywin_draw_citizen_icons [UI] (1186B)
│   │   │   │   │   ├── get_city_epoch [GL] (158B)
│   │   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   ├── get_worker_tile_status [GL] (68B)
│   │   │   │   │   ├── scale_universal [UI] (67B)
│   │   │   │   │   ├── calc_icon_spacing [UI] (264B)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │   │   ├── invalidate_rect_region [UI] (78B)
│   │   │   │   │   └── add_click_region [UI] (153B) *** STATE MUTATION ***
│   │   │   │   ├── scale_universal [UI] (67B)
│   │   │   │   └── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   └── draw_resource_rows [UI] (9761B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── invalidate_region [UI] (180B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       ├── fill_rect_palette [UI] (50B)
│   │   │       │   └── fill_rect_xywh [UI] (63B)
│   │   │       ├── text_begin [UI] (29B)
│   │   │       ├── text_add_label_id [UI] (33B)
│   │   │       ├── text_newline [UI] (29B)
│   │   │       ├── text_begin_bold [UI] (29B)
│   │   │       ├── text_begin_italic [UI] (29B)
│   │   │       ├── text_end_italic [UI] (29B)
│   │   │       ├── text_add_number [UI] (33B)
│   │   │       ├── draw_text_at [UI] (42B)
│   │   │       │   └── draw_text_with_shadow [UI] (205B)
│   │   │       ├── draw_text_centered [UI] (46B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── draw_text_right_aligned [UI] (46B)
│   │   │       │   └── draw_text_right_aligned [UI] (131B)
│   │   │       ├── find_city_at [GL] (245B)
│   │   │       │   ├── is_tile_valid [GL] (80B)
│   │   │       │   └── get_city_owner_at [GL] (111B)
│   │   │       │         (subtree shown above — 3 children)
│   │   │       ├── close_dialog [UI] (94B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── scale_sprite [UI] (35B)
│   │   │       ├── render_tile [UI] (4431B) *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (80B)
│   │   │       │   ├── grassland_has_shield [GL] (72B)
│   │   │       │   ├── get_civ_background_color [UI] (92B)
│   │   │       │   ├── scale_sprite [UI] (35B)
│   │   │       │   ├── calc_coast_quadrants [UI] (386B) *** STATE MUTATION ***
│   │   │       │   ├── is_x_in_range [UI] (141B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── wrap_x [GL] (94B)
│   │   │       │   ├── diagonal_movement_cost [GL] (135B)
│   │   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │       │   │     (subtree shown above — 3 children)
│   │   │       │   ├── get_tile_ptr [GL] (90B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │       │   ├── get_tile_owner [GL] (100B)
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── get_tile_explored [GL] (71B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_city_owner_at [GL] (111B)
│   │   │       │   │     (subtree shown above — 3 children)
│   │   │       │   ├── check_tile_resource [GL] (281B)
│   │   │       │   ├── check_tile_goody_hut [GL] (229B)
│   │   │       │   ├── get_tile_improvements [GL] (39B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── port_copy_rect [UI] (282B)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── set_sprite_scale [UI] (33B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── reset_sprite_scale [UI] (28B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── is_tile_worked [GL] (62B)
│   │   │       ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── citywin_prepare_panel [UI] (77B)
│   │   │       │     (subtree shown above — 4 children)
│   │   │       ├── citywin_draw_citizen_icons_simple [UI] (540B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_worker_tile_status [GL] (68B)
│   │   │       │   ├── scale_universal [UI] (67B)
│   │   │       │   ├── calc_icon_spacing [UI] (264B)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── invalidate_rect_region [UI] (78B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── scale_universal [UI] (67B)
│   │   │       ├── calc_icon_spacing [UI] (264B)
│   │   │       ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │       │   ├── rect_get_width [UI] (27B)
│   │   │       │   ├── rect_get_height [UI] (28B)
│   │   │       │   ├── set_rect_wh [UI] (48B)
│   │   │       │   ├── is_tile_valid [GL] (80B)
│   │   │       │   ├── fill_surface_from_rect [UI] (71B)
│   │   │       │   ├── get_civ_background_color [UI] (92B)
│   │   │       │   ├── scale_sprite [UI] (35B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │   │       │   ├── select_display_unit [UI] (396B)
│   │   │       │   ├── get_civ_dark_color [UI] (92B)
│   │   │       │   ├── get_unit_max_hp [GL] (45B)
│   │   │       │   ├── get_fortress_owner_at [GL] (77B)
│   │   │       │   ├── get_tile_improvements [GL] (39B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── port_copy_rect [UI] (282B)
│   │   │       │   │     (subtree shown above — 7 children)
│   │   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── draw_city_sprite [UI] (1737B) *** STATE MUTATION ***
│   │   │       │   ├── set_rect_wh [UI] (48B)
│   │   │       │   ├── get_font_height [UI] (28B)
│   │   │       │   ├── measure_text_height [UI] (42B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── fill_surface_from_rect [UI] (71B)
│   │   │       │   │     (subtree shown above — 3 children)
│   │   │       │   ├── draw_border_rect [UI] (61B)
│   │   │       │   ├── draw_text_at [UI] (42B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── get_civ_background_color [UI] (92B)
│   │   │       │   ├── has_building [GL] (122B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── scale_sprite [UI] (35B)
│   │   │       │   ├── set_sprite_scale [UI] (33B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── reset_sprite_scale [UI] (28B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │       │   ├── civ_has_tech [GL] (181B)
│   │   │       │   │     (subtree shown above — 1 children)
│   │   │       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── get_civ_dark_color [UI] (92B)
│   │   │       │   ├── prepare_surface [UI] (24B)
│   │   │       │   ├── get_unit_owner_at [GL] (66B)
│   │   │       │   │     (subtree shown above — 2 children)
│   │   │       │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │       │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │       │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │       │   ├── port_copy_rect [UI] (282B)
│   │   │       │   │     (subtree shown above — 7 children)
│   │   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │       │         (subtree shown above — 1 children)
│   │   │       ├── wrap_x [GL] (94B)
│   │   │       ├── get_next_unit_in_stack [GL] (65B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── find_unit_stack_at_xy [GL] (231B)
│   │   │       │     (subtree shown above — 3 children)
│   │   │       ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │       ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │             (subtree shown above — 1 children)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │   ├── unknown (set_font_size) [UI] (43B)
│   │   │   │   └── set_callback_0x38 [UI] (40B)
│   │   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │   │   └── set_callback_0x3c [UI] (40B)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   │   └── swap_dc [UI] (43B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   │   ├── FUN_00008BE1 [??]
│   │   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │   └── create_offscreen_surface_b [UI] (119B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── port_alloc_rect [UI] (58B)
│   │   │       │   └── port_alloc [UI] (325B)
│   │   │       ├── port_draw_text_rect [UI] (77B)
│   │   │       │   └── write_full_colortable [UI] (39B)
│   │   │       ├── surface_create_8param [UI] (85B)
│   │   │       │   ├── get_view_window_handle [UI] (28B)
│   │   │       │   ├── surface_init_8 [UI] (96B)
│   │   │       │   └── set_dialog_wndproc [UI] (55B)
│   │   │       └── set_window_data_and_wndproc [UI] (55B)
│   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │     → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION ***
│   │   │   ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   ├── draw_text_centered [UI] (46B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── draw_status_turn_info [UI] (474B)
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   │   └── port_set_rect [UI] (91B)
│   │   │   │   ├── draw_coordinate_text [UI] (132B)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── format_unit_orders_text [UI] (450B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── draw_status_panel_header [UI] (1182B) *** STATE MUTATION ***
│   │   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── unknown (string pool set) [UI] (33B)
│   │   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   │   ├── draw_hline [UI] (69B)
│   │   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── select_display_unit [UI] (396B)
│   │   │   │   │     (subtree shown above — 5 children)
│   │   │   │   ├── draw_unit [UI] (2803B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 20 children)
│   │   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   │   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │   │   │     (subtree shown above — 3 children)
│   │   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   └── port_set_rect [UI] (91B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   └── tile_bitmap [UI] (391B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── load_gif_resource [UI] (847B)
│   │   │     → Loads a GIF image from a resource
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   └── port_alloc [UI] (325B)
│   │   │   │         (subtree shown above — 10 children)
│   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   ├── palette_apply [UI] (90B)
│   │   │   │   │   ├── palette_generate_random_id [UI] (75B)
│   │   │   │   │   └── unknown (palette_update_entries) [UI] (60B)
│   │   │   │   └── palette_set_entry [UI] (316B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── flip_surface_vertical [UI] (249B)
│   │   │       └── get_pixel_buffer [UI] (39B)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │   ├── process_messages [UI] (21B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   ├── disable_parent_window [UI] (121B)
│   │   │   └── enable_parent_window [UI] (126B)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │       ├── FUN_0000E780 [??]
│   │       ├── palette_generate_random_id [UI] (75B)
│   │       └── unknown (palette_create) [UI] (60B)
│   ├── dialog_destroy_thunk [FW] (12B)
│   │     → Thunk that calls the dialog object destructor.
│   ├── show_tax_seh_epilog [FW] (14B)
│   │     → SEH epilog for show_tax_rate_dialog.
│   ├── dialog_object_constructor [FW] (196B)
│   │     → Constructs a dialog object
│   │   └── dialog_ctor [UI] (146B)
│   │         → Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │       └── init_sprite_surface_mgr [UI] (133B)
│   │           └── init_sprite_cache [UI] (132B)
│   │               └── init_render_surface [UI] (274B)
│   └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│         → Central network message dispatcher
│       ├── invalidate_region [UI] (180B)
│       │     → Invalidates a screen region
│       │     (subtree shown above — 2 children)
│       ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│       │     → Sends a network message to a specific player
│       ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│       │     → Broadcasts a network message to all connected players
│       ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       │     → Initializes a network message header with magic bytes, message type, and default size.
│       ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│       │     → Initializes a network message with type, player name, and game version strings.
│       │   └── net_msg_init_with_version [GL] (94B)
│       │       └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── net_msg_init_with_version [GL] (94B)
│       │     → Initializes a network message header with version string at offset 0x10.
│       │     (subtree shown above — 1 children)
│       ├── unknown (init version message) [GL] (65B)
│       │     → Creates a type-2 network message (version info) with session data appended.
│       │   ├── net_msg_init_with_name [GL] (141B) *** STATE MUTATION ***
│       │   │     (subtree shown above — 1 children)
│       │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│       ├── unknown (init chat/popup message) [GL] (169B)
│       │     → Creates a type-0x2F network message with additional fields for chat or popup.
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── unknown (init type-4 message) [GL] (45B)
│       │     → Creates a type-4 network message header with size 0x280.
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── unknown (init type-6 message) [GL] (45B)
│       │     → Creates a type-6 network message header with size 0x21C.
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── unknown (init type-0x13 message) [GL] (60B)
│       │     → Creates a type-0x13 network message with session data
│       │   ├── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       │   └── netmgr_fill_game_info [GL] (598B) *** STATE MUTATION ***
│       ├── unknown (init type-0x69 message) [GL] (56B)
│       │     → Creates a type-0x69 (combat sync) message
│       │   └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
│       ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│       │     → Serializes 7 game state sections into a contiguous buffer with checksums
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   └── diff_engine_append_data [GL] (98B)
│       ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│       │     → Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   └── diff_engine_append_data [GL] (98B)
│       ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│       │     → Serializes all 24 game state sections with RLE compression
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   ├── diff_engine_calc_total_size [GL] (152B)
│       │   ├── diff_engine_append_data [GL] (98B)
│       │   └── rle_encode (unnamed) [GL] (588B)
│       ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│       │     → Serializes only game state sections whose checksums have changed since last serialization
│       │   ├── diff_engine_checksum [GL] (270B)
│       │   ├── diff_engine_calc_total_size [GL] (152B)
│       │   └── diff_engine_append_data [GL] (98B)
│       ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│       │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│       │   ├── rect_get_width [UI] (27B)
│       │   ├── rect_get_height [UI] (28B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── get_font_height [UI] (28B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── get_civ_adjective_name [GL] (145B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── tile_bitmap [UI] (391B)
│       │   │     (subtree shown above — 1 children)
│       │   ├── port_set_rect_from_self [UI] (63B)
│       │   ├── port_set_rect [UI] (91B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │     (subtree shown above — 3 children)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── scale_table_build_primary [UI] (657B)
│       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       │         (subtree shown above — 1 children)
│       └── netmgr_build_packet [GL] (405B) *** STATE MUTATION ***
│             → Builds a network packet by prepending a 0x2C-byte header to the payload data
│           └── net_msg_init_header [GL] (55B) *** STATE MUTATION ***
├── show_find_city_dialog [UI] (886B)
│     → Displays the "Find City" dialog that lists all known cities
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_label_id [UI] (33B)
│   │     → Appends a localized label (by ID) to the global text buffer.
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   └── popup_show_modal [UI] (999B)
│   │         → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │       ├── flush_display [UI] (21B)
│   │       ├── process_messages [UI] (21B)
│   │       │     (subtree shown above — 1 children)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_edit_text [UI] (43B)
│   │       │   └── FUN_00002D4D [??]
│   │       ├── init_palette_system [UI] (21B)
│   │       ├── unknown — manage window [UI] (37B)
│   │       │   └── FUN_0000C692 [??]
│   │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │       │   ├── unknown (get drawing context) [UI] (37B)
│   │       │   │   └── focus_and_raise_window [UI] (57B)
│   │       │   ├── widget_scrollbar_dtor [UI] (57B)
│   │       │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │       │   └── widget_dropdown_dtor [UI] (57B)
│   │       ├── popup_paint [UI] (1964B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── show_window_wrapper [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   ├── set_rect_wh [UI] (48B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── control_invalidate [UI] (65B)
│   │       │   │   ├── FUN_00008B00 [??]
│   │       │   │   └── FUN_00008B2D [??]
│   │       │   ├── draw_border_rect [UI] (61B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── scale_sprite [UI] (35B)
│   │       │   ├── set_sprite_scale [UI] (33B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   │   └── rect_get_width [UI] (27B)
│   │       │   ├── widget_get_height [UI] (34B)
│   │       │   │   └── rect_get_height [UI] (28B)
│   │       │   ├── widget_inflate_rect_neg [UI] (40B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── popup_get_padded_height [UI] (42B)
│   │       │   ├── popup_render_label [UI] (226B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   └── port_fill_rect_pattern [UI] (201B)
│   │       │   │         (subtree shown above — 3 children)
│   │       │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_render_text_at_offset [UI] (61B)
│   │       │   │   └── unknown (popup_draw_icon) [UI] (55B)
│   │       │   ├── popup_layout_dialog [UI] (4785B) *** STATE MUTATION ***
│   │       │   │   ├── get_font_height [UI] (28B)
│   │       │   │   ├── measure_text_height [UI] (42B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_calc_max_text_height [UI] (132B)
│   │       │   │   ├── popup_get_line_height [UI] (78B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B)
│   │       │   │   ├── popup_calc_button_area_height [UI] (46B)
│   │       │   │   ├── popup_calc_text_width [UI] (51B)
│   │       │   │   ├── popup_set_text_style [UI] (189B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_render_label [UI] (226B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── popup_has_negative_line_count [UI] (83B)
│   │       │   │   ├── popup_layout_text [UI] (1326B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_get_radio_page_number [UI] (56B)
│   │       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│   │       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── blit_rect_to_rect [UI] (95B)
│   │       │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   └── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── popup_redraw_visible_items [UI] (660B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── invalidate_region [UI] (180B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── draw_border_rect [UI] (61B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_get_radio_at_index [UI] (156B)
│   │       │   │   ├── popup_draw_item [UI] (706B)
│   │       │   │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   │   └── port_set_rect [UI] (91B)
│   │       │   ├── popup_create_window [UI] (693B)
│   │       │   │   ├── set_callback_0x44 [UI] (45B)
│   │       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── unknown (set_font_size) [UI] (43B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── create_offscreen_surface [UI] (115B) *** STATE MUTATION ***
│   │       │   │   └── create_offscreen_surface_b [UI] (119B)
│   │       │   │         (subtree shown above — 5 children)
│   │       │   ├── popup_init_controls [UI] (6616B) *** STATE MUTATION ***
│   │       │   │   ├── set_rect_wh [UI] (48B)
│   │       │   │   ├── create_text_button [UI] (133B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── set_button_owner [UI] (45B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_button_handler [UI] (45B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── set_button_click_callback [UI] (33B)
│   │       │   │   ├── create_checkbox [UI] (167B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── set_checkbox_value [UI] (33B)
│   │       │   │   ├── create_scrollbar [UI] (124B)
│   │       │   │   │     (subtree shown above — 4 children)
│   │       │   │   ├── scrollbar_set_position [UI] (52B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scrollbar_set_range [UI] (47B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scrollbar_set_callback [UI] (33B)
│   │       │   │   ├── set_edit_max_chars [UI] (43B)
│   │       │   │   ├── create_listbox_control [UI] (121B)
│   │       │   │   ├── add_listbox_item [UI] (49B)
│   │       │   │   ├── disable_civ_slot [UI] (133B) *** STATE MUTATION ***
│   │       │   │   ├── unknown (set selected item) [UI] (33B) *** STATE MUTATION ***
│   │       │   │   ├── pedia_button_create [UI] (139B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── unknown (set button callback) [UI] (33B)
│   │       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │       │   │   ├── scale_sprite [UI] (35B)
│   │       │   │   ├── widget_get_height [UI] (34B)
│   │       │   │   │     (subtree shown above — 1 children)
│   │       │   │   ├── scrollbar_init [UI] (93B)
│   │       │   │   ├── scrollbar_create_window [UI] (207B) *** STATE MUTATION ***
│   │       │   │   ├── scrollbar_set_position [UI] (33B)
│   │       │   │   ├── scrollbar_set_range [UI] (33B)
│   │       │   │   ├── unknown [UI] (43B)
│   │       │   │   ├── unknown [UI] (33B)
│   │       │   │   ├── popup_get_padded_height [UI] (42B)
│   │       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│   │       │   │   ├── popup_count_items_in_pane [UI] (93B)
│   │       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│   │       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│   │       │   │   └── set_scrollbar [UI] (64B)
│   │       │   ├── popup_draw_background [UI] (309B)
│   │       │   │   ├── rect_get_width [UI] (27B)
│   │       │   │   ├── rect_get_height [UI] (28B)
│   │       │   │   ├── fill_surface_from_rect [UI] (71B)
│   │       │   │   │     (subtree shown above — 3 children)
│   │       │   │   ├── unknown [UI] (56B)
│   │       │   │   └── tile_bitmap [UI] (391B)
│   │       │   │         (subtree shown above — 1 children)
│   │       │   ├── unknown (popup_draw_icon) [UI] (55B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   ├── draw_3d_border [UI] (167B)
│   │       │   │   ├── draw_hline [UI] (69B)
│   │       │   │   │     (subtree shown above — 2 children)
│   │       │   │   └── draw_vline [UI] (69B)
│   │       │   ├── port_draw_text_styled [UI] (238B)
│   │       │   │   ├── FUN_0000847F [??]
│   │       │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   │   └── draw_string_palette [UI] (534B)
│   │       │   ├── port_fill_rect_pattern [UI] (201B)
│   │       │   │     (subtree shown above — 3 children)
│   │       │   ├── unknown (set/get draw color) [UI] (38B)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   │     (subtree shown above — 1 children)
│   │       │   └── unknown (invalidate_all_children) [UI] (115B)
│   │       │       ├── FUN_00008B00 [??]
│   │       │       └── FUN_00008B2D [??]
│   │       ├── unknown (popup_get_item_text) [UI] (47B)
│   │       │   └── FUN_00003CFF [??]
│   │       ├── unknown (popup_get_edit_text) [UI] (43B)
│   │       │   └── FUN_00003D62 [??]
│   │       └── modal_dialog_run [UI] (283B)
│   │             (subtree shown above — 4 children)
│   ├── findcity_cleanup_stack [FW] (12B)
│   │     → Cleans up the dynamic stack allocation from the find city dialog.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │       └── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │             (subtree shown above — 3 children)
│   ├── findcity_seh_epilog [FW] (14B)
│   │     → SEH epilog for the find city dialog.
│   ├── text_newline [UI] (29B)
│   │     → Adds a newline to the global text buffer.
│   ├── text_begin_italic [UI] (29B)
│   │     → Begins italic text mode in the global text buffer.
│   ├── text_end_italic [UI] (29B)
│   │     → Ends italic text mode in the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   ├── open_list_dialog [UI] (47B)
│   │     → Opens a list dialog with the given title and flags.
│   │   └── open_dialog_extended [UI] (56B)
│   │         → Opens a dialog with extended parameters, passing through to the dialog creation function.
│   │       └── popup_parse_text_file [UI] (2287B)
│   │           ├── mp_format_template_string [UI] (504B)
│   │           ├── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│   │           │   ├── rect_get_width [UI] (27B)
│   │           │   ├── rect_get_height [UI] (28B)
│   │           │   ├── unknown (popup list init) [UI] (64B)
│   │           │   ├── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │           │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │           │   │     (subtree shown above — 3 children)
│   │           │   ├── popup_set_bitmap [UI] (50B)
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
│   │           │   ├── measure_text_height [UI] (42B)
│   │           │   │     (subtree shown above — 1 children)
│   │           │   └── popup_get_button_width [UI] (32B)
│   │           ├── popup_add_radio_checked [UI] (71B)
│   │           │   └── popup_add_radio_option [UI] (566B)
│   │           │         (subtree shown above — 2 children)
│   │           ├── popup_add_text_input [UI] (566B)
│   │           │   └── measure_text_height [UI] (42B)
│   │           │         (subtree shown above — 1 children)
│   │           └── popup_add_action_button_label [UI] (119B)
│   ├── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │     → Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │   │   ├── minimap_full_redraw [UI] (416B) *** STATE MUTATION ***
│   │   │   │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │   │   │   │   └── wrap_x [GL] (94B)
│   │   │   │   ├── minimap_get_tile_color [UI] (425B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── minimap_draw_goto_line [UI] (211B)
│   │   │   │   │   ├── minimap_tile_to_screen [UI] (169B)
│   │   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   │   └── surface_fill_rect_color [UI] (63B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── surface_set_clear_color [UI] (34B)
│   │   │   │   │   └── unknown (clear_surface_region) [UI] (28B)
│   │   │   │   ├── fill_rect_palette [UI] (50B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 15 children)
│   │   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   │     (subtree shown above — 8 children)
│   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   └── wrap_x [GL] (94B)
│   │   │   ├── recalc_viewport_geometry [UI] (1410B) *** STATE MUTATION ***
│   │   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   │   ├── FUN_00008200 [??]
│   │   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   │   └── delete_font [UI] (98B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │   └── scale_sprite [UI] (35B)
│   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │   └── set_sprite_scale [UI] (33B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── redraw_full_viewport [UI] (278B)
│   │   │   │   ├── draw_complete_tile [UI] (495B)
│   │   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   ├── render_tile [UI] (4431B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 22 children)
│   │   │   │   │   ├── render_city_on_map [UI] (392B)
│   │   │   │   │   ├── draw_units_at_tile [UI] (662B)
│   │   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── FUN_0064F394 [??]
│   │   │   │   ├── draw_city_labels [UI] (871B)
│   │   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── get_civ_foreground_color [UI] (92B)
│   │   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │   │   └── draw_text_with_shadow [UI] (205B)
│   │   │   │   │         (subtree shown above — 3 children)
│   │   │   │   ├── unknown (clear_surface_region) [UI] (28B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── wrap_x [GL] (94B)
│   │   │   ├── begin_end_paint_cycle [UI] (100B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 15 children)
│   │   │   └── dialog_create_buttons [UI] (675B)
│   │   │         (subtree shown above — 8 children)
│   │   └── wrap_x [GL] (94B)
│   │         → Wraps an X coordinate for a cylindrical (non-flat) map
│   ├── city_count_content_citizens [GL] (125B)
│   │     → Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   ├── get_civ_adjective_name [GL] (145B)
│   │     → Returns the adjective form of a civilization name
│   ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
│   │     → Opens the city window for a specific city, handling disorder state
│   │   ├── FUN_0000CA8D [??]
│   │   ├── FUN_0000CCB3 [??]
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_help_topic [UI] (34B)
│   │   │     → Opens a help topic with default parameters.
│   │   │   └── show_help_topic_ext [UI] (38B)
│   │   │       └── show_help_dialog [UI] (46B)
│   │   │           └── FUN_0051D3E0 [??] (351B)
│   │   ├── unknown — manage window [UI] (37B)
│   │   │     → Calls manage_window_C692 with the window handle from the object's field at offset 8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── init_city_production_globals [GL] (77B) *** STATE MUTATION ***
│   │   │     → Initializes two global production variables from a city's current production type and accumulated shields.
│   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │         (subtree shown above — 2 children)
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │   ├── unknown (popup list init) [UI] (64B)
│   │   │     → Resets and initializes a popup list control with 9 slots and param_1 items.
│   │   └── popup_dialog_reset [UI] (1299B) *** STATE MUTATION ***
│   │         → Resets all fields of a popup dialog structure to default values
│   └── popup_add_radio_option [UI] (566B)
│         → Adds a radio button option to the popup dialog
│         (subtree shown above — 2 children)
├── is_in_goto_mode [UI] (60B)
│     → Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
├── cancel_goto_mode [UI] (159B) *** STATE MUTATION ***
│     → If currently in goto mode, resets all view cursors back to normal (0x201).
│   ├── is_in_goto_mode [UI] (60B)
│   │     → Returns 1 if the first map view cursor is in goto mode (0x202 or 0x203), 0 otherwise.
│   └── set_cursor_icon [UI] (47B)
│         → Sets the cursor icon to the specified resource ID on the current view's window handle.
│       └── load_and_set_cursor [UI] (70B)
│             → Loads a cursor by resource ID onto a window and optionally activates it.
│           └── load_and_store_cursor [UI] (136B)
├── mp_setup_game_profile [UI] (1423B) *** STATE MUTATION ***
│     → Sets up the game profile dialog for multiplayer
│   ├── calc_year_from_turn [GL] (540B) *** STATE MUTATION ***
│   │     → Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
│   ├── advance_year_display [UI] (479B)
│   │     → Advances the year display in the UI, showing appropriate year strings
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   └── text_newline [UI] (29B)
│   │         → Adds a newline to the global text buffer.
│   ├── clear_string [FW] (22B)
│   │     → Sets the first byte of a string to 0 (empty string).
│   ├── append_separator_1 [FW] (33B)
│   │     → Appends separator string from DAT_0062d064 to param_1.
│   ├── append_separator_6 [FW] (33B)
│   │     → Appends the separator/formatting string at DAT_0062d078 to param_1.
│   ├── append_separator_7 [FW] (33B)
│   │     → Appends the separator/formatting string at DAT_0062d07c to param_1.
│   ├── append_label_string [FW] (41B)
│   │     → Appends label string at index param_2 from the labels array to param_1.
│   ├── append_int [FW] (53B)
│   │     → Converts int param_2 to string (base 10) and appends to param_1.
│   ├── FUN_0051D564 [??] (178B)
│   ├── _strcpy_thunk [FW] (7B)
│   │     → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
│   └── _strcat [FW] (224B)
│         → CRT strcat — finds end of dest string then copies source
├── show_top5_cities_dialog [UI] (175B)
│     → Opens the Top 5 Cities dialog with standard dialog setup, event loop, and cleanup.
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── advisor_create_close_button [UI] (223B)
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   └── modal_dialog_run [UI] (283B)
│         → Runs a modal dialog loop
│         (subtree shown above — 4 children)
├── show_credits_dialog [UI] (544B)
│     → Opens the credits dialog, loads credits text, sets up a timer for scrolling, runs the event loop, then cleans up all ...
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     → Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── advisor_create_close_button [UI] (223B)
│   ├── credits_text_pool_init [FW] (45B)
│   │     → Initializes the credits text pool with given size and resets the string counter.
│   ├── credits_text_pool_free [FW] (29B)
│   │     → Frees the credits text pool.
│   ├── credits_load_section [FW] (298B)
│   │     → Loads a credits text section from a game text file
│   ├── bitmap_surface_delete [FW] (57B)
│   │     → Destroys a bitmap surface and optionally frees memory.
│   │   └── sprite_free_data [UI] (84B)
│   │         → Unlocks and frees sprite data handle at this+0x34/0x38.
│   ├── play_music_track [UI] (312B) *** STATE MUTATION ***
│   │     → Plays a specific music track (param_1) with optional restart (param_2)
│   │   └── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │         → Stops music playback and sets paused flag.
│   ├── init_game_display [UI] (51B)
│   │     → Initializes the game display
│   │   ├── flush_display [UI] (21B)
│   │   │     → Flushes the display buffer by calling FUN_005bbbce.
│   │   └── init_palette_system [UI] (21B)
│   │         → Initializes the palette system.
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   ├── modal_dialog_run [UI] (283B)
│   │     → Runs a modal dialog loop
│   │     (subtree shown above — 4 children)
│   ├── timer_start [FW] (157B) *** STATE MUTATION ***
│   │     → Starts a timer
│   └── timer_stop [FW] (62B)
│         → Stops a timer by slot index
├── view_throne_room [UI] (87B)
│     → Views the current throne room without adding improvements
│   ├── init_throne_context [UI] (405B) *** STATE MUTATION ***
│   │     → Initializes the throne room display context
│   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │   │     → Initializes the sprite surface manager object
│   │   │     (subtree shown above — 1 children)
│   │   ├── init_render_surface [UI] (274B)
│   │   │     → Initializes a render surface object with default dimensions (0x4000 x 0x4000) and mode flags.
│   │   ├── unknown (pedia object initializer) [UI] (34B)
│   │   │     → Zeroes out the first field of an object via ECX (this pointer)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_screen_rect [UI] (48B)
│   │   │     → Fills a RECT with the full screen dimensions (0, 0, screen_width, screen_height).
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │         (subtree shown above — 3 children)
│   ├── destroy_throne_context [UI] (177B)
│   │     → Destroys the throne room display context, releasing all resources.
│   │   └── pedia_free_resource [UI] (57B)
│   │         → Frees a resource stored in the object and sets the pointer to zero.
│   ├── view_throne_display [UI] (244B)
│   │     → Displays the current throne room state for viewing (no modifications).
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── manage_window_show [UI] (37B)
│   │   │     → Calls manage_window_C40A with the window handle from this+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── init_palette_system [UI] (21B)
│   │   │     → Initializes the palette system.
│   │   ├── load_throne_dll [UI] (308B)
│   │   │     → Loads the throne room DLL (pv.dll) and initializes the throne room rendering context with it.
│   │   │   ├── set_callback_paint [UI] (45B)
│   │   │   ├── update_palette [UI] (43B)
│   │   │   │   └── FUN_0000C280 [??]
│   │   │   ├── pedia_set_resource [UI] (67B)
│   │   │   ├── unknown (GDI operation on pedia window) [UI] (41B)
│   │   │   │   └── FUN_0000C763 [??]
│   │   │   ├── create_offscreen_surface_b [UI] (119B)
│   │   │   │     (subtree shown above — 5 children)
│   │   │   └── surface_init_8 [UI] (96B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── draw_throne_title [UI] (221B)
│   │   │     → Draws the throne room title text ("Throne Room of [Leader Name]") with drop shadow effect.
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── port_measure_text [UI] (219B)
│   │   │   │   ├── FUN_00003ECA [??]
│   │   │   │   ├── FUN_0000847F [??]
│   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   ├── render_throne_room [UI] (3024B)
│   │   │     → Renders the complete throne room scene by compositing all throne room pieces from DLL resources based on the current ...
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── port_destructor [UI] (114B)
│   │   │   │   ├── port_init [UI] (258B)
│   │   │   │   ├── port_unlock [UI] (83B)
│   │   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   │   └── destroy_dib_surface [UI] (155B)
│   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │     (subtree shown above — 6 children)
│   │   │   ├── sprite_free_data [UI] (84B)
│   │   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B)
│   │   │   │   ├── sprite_lock_data [UI] (56B)
│   │   │   │   └── sprite_extract_from_oleitem [UI] (1951B)
│   │   │   │       ├── rect_get_width [UI] (27B)
│   │   │   │       ├── rect_get_height [UI] (28B)
│   │   │   │       ├── port_lock [UI] (287B)
│   │   │   │       ├── port_unlock [UI] (83B)
│   │   │   │       ├── port_get_pixel_ptr [UI] (45B)
│   │   │   │       ├── surface_is_locked [UI] (44B)
│   │   │   │       ├── pixel_ptr_next_row [UI] (33B)
│   │   │   │       ├── pixel_ptr_prev_row [UI] (33B)
│   │   │   │       └── sprite_unlock_data [UI] (56B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── sprite_replace_color [UI] (218B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── sprite_lock_data [UI] (56B)
│   │   │       ├── sprite_unlock_data [UI] (56B)
│   │   │       └── sprite_is_locked [UI] (44B)
│   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │     → Stores param_1 at this+4 and calls FUN_00450440 to display it.
│   │   │   └── unknown (update pedia display surface) [UI] (49B)
│   │   │       └── select_palette [UI] (57B)
│   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │     → Calls manage_window_C44D with the window handle at this+8.
│   │   │   └── FUN_0000C44D [??]
│   │   └── modal_dialog_run [UI] (283B)
│   │         → Runs a modal dialog loop
│   │         (subtree shown above — 4 children)
│   └── _strcpy_thunk / _chkstk [FW] (47B)
│         → Stack probe function — touches stack pages in 4KB increments to trigger guard page allocation.
├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│     → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│     (subtree shown above — 7 children)
├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│     → Starts human turn if not already active or if param forces it
│   ├── center_all_map_views [UI] (116B)
│   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   └── center_map_on_cursor [UI] (56B) *** STATE MUTATION ***
│   │         → Centers the map view on the current cursor position (DAT_0064b1b4, DAT_0064b1b0) for the current player (DAT_006d1da0).
│   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │           ├── tile_to_screen [UI] (151B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── is_tile_visible [UI] (99B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── redraw_tile_area [UI] (352B)
│   │           │   ├── draw_complete_tile [UI] (495B)
│   │           │   │     (subtree shown above — 12 children)
│   │           │   ├── is_tile_visible [UI] (99B)
│   │           │   │     (subtree shown above — 1 children)
│   │           │   ├── draw_city_labels [UI] (871B)
│   │           │   │     (subtree shown above — 10 children)
│   │           │   ├── calc_tile_group_rect [UI] (191B)
│   │           │   ├── wrap_x [GL] (94B)
│   │           │   └── port_set_rect [UI] (91B)
│   │           ├── invalidate_tile_area [UI] (60B)
│   │           │   ├── invalidate_region [UI] (180B)
│   │           │   │     (subtree shown above — 2 children)
│   │           │   └── calc_tile_group_rect [UI] (191B)
│   │           │         (subtree shown above — 3 children)
│   │           ├── reset_sprite_scale [UI] (28B)
│   │           │     (subtree shown above — 1 children)
│   │           ├── set_current_zoom_scale [UI] (41B)
│   │           │     (subtree shown above — 1 children)
│   │           └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │                 (subtree shown above — 1 children)
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │     → Sets a dialog string control to an improvement/building name
│   │   │   └── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │   ├── find_city_at [GL] (245B)
│   │   │     → Finds a city at the given (x,y) coordinates
│   │   │     (subtree shown above — 2 children)
│   │   ├── has_building [GL] (122B)
│   │   │     → Checks if a city has a specific building
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_wonder_city [GL] (57B)
│   │   │     → Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │   │     (subtree shown above — 1 children)
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     → Checks if a civilization (param_1) has a specific technology (param_2)
│   │   │     (subtree shown above — 1 children)
│   │   ├── can_build_unit_type [GL] (1095B)
│   │   │     → Checks if a civilization can build a specific unit type
│   │   │   └── civ_has_tech [GL] (181B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── update_menu_item_label [UI] (89B)
│   │   │     → Updates a menu item's label text and enabled state
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── mp_format_template_string [UI] (504B)
│   │   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   └── menu_toggle_item_checked [UI] (103B)
│   │   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │       └── menu_check_item [UI] (50B)
│   │   │   └── menu_update_subitem_text [UI] (155B)
│   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │       ├── unknown (pipe-to-tab converter) [UI] (73B)
│   │   │       └── menu_change_item_text [UI] (50B)
│   │   │           └── modify_menu_item [UI] (130B)
│   │   ├── is_tile_worked [GL] (62B)
│   │   │     → Returns whether a specific tile (param_2) is being worked by city param_1
│   │   ├── menu_populate [UI] (686B) *** STATE MUTATION ***
│   │   │     → Populates the native menu from the internal linked-list representation
│   │   │   ├── menu_set_host_window [UI] (80B) *** STATE MUTATION ***
│   │   │   │   └── menu_setup_parent [UI] (59B)
│   │   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │   │       ├── unknown (get menu handle) [UI] (27B)
│   │   │   │       └── set_window_menu [UI] (99B)
│   │   │   ├── menu_toggle_item_checked [UI] (103B)
│   │   │   │     (subtree shown above — 4 children)
│   │   │   ├── menu_toggle_item_grayed [UI] (101B)
│   │   │   │   ├── menu_get_visible_index [UI] (105B)
│   │   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   │   ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   │   └── menu_enable_item [UI] (50B)
│   │   │   │       └── check_menu_item [UI] (104B)
│   │   │   ├── menu_create_header [UI] (41B)
│   │   │   │   └── build_menu_from_string [UI] (376B)
│   │   │   │       └── parse_menu_string_recursive [UI] (586B)
│   │   │   ├── menu_insert_item [UI] (50B)
│   │   │   │   └── FUN_0000128C [??]
│   │   │   ├── menu_delete_item [UI] (46B)
│   │   │   │   └── delete_menu_item [UI] (102B)
│   │   │   └── menu_update_host [UI] (52B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       └── redraw_menubar [UI] (29B)
│   │   ├── menu_set_subitem_hidden [UI] (129B)
│   │   │     → Shows or hides a sub-menu item by setting/clearing bit 1 in its flags.
│   │   │   └── menu_find_subitem_by_id [UI] (136B)
│   │   ├── menu_set_subitem_checked [UI] (194B)
│   │   │     → Sets or clears the checked state of a sub-menu item (bit 0)
│   │   │     (subtree shown above — 2 children)
│   │   ├── menu_set_all_subitems_checked [UI] (111B)
│   │   │     → Sets or clears the checked state for all sub-items of a given top-level menu item.
│   │   │   ├── menu_find_item_by_id [UI] (98B)
│   │   │   └── menu_set_subitem_checked [UI] (194B)
│   │   │         (subtree shown above — 2 children)
│   │   ├── wrap_x [GL] (94B)
│   │   │     → Wraps an X coordinate for a cylindrical (non-flat) map
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     → Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (subtree shown above — 1 children)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     → Returns true if terrain type == 10 (ocean).
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     → Returns the city-owning civ at a tile, or -1
│   │   │     (subtree shown above — 3 children)
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     → Returns the fortress-owning civ at a tile, or -1
│   │   │     (subtree shown above — 2 children)
│   │   └── get_tile_improvements [GL] (39B)
│   │         → Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │         (subtree shown above — 1 children)
│   └── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│         → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│         (subtree shown above — 7 children)
├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
│     → Activates the current unit for player input
│   ├── center_all_map_views [UI] (116B)
│   │     → Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │     (subtree shown above — 1 children)
│   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │   └── scroll_map_if_needed [UI] (404B) *** STATE MUTATION ***
│   │         → Checks if position (param_1, param_2) is near the edges of the visible map area and scrolls the map if necessary
│   │       └── set_map_scroll_position [UI] (98B) *** STATE MUTATION ***
│   │             (subtree shown above — 2 children)
│   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │     → Starts human turn if not already active or if param forces it
│   │     (subtree shown above — 3 children)
│   ├── select_next_unit [MIXED] (436B) *** STATE MUTATION ***
│   │     → Selects the next unit needing orders
│   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │   │     (subtree shown above — 1 children)
│   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION ***
│   │   │     → Major game logic function that processes visibility updates after a unit moves
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── cancel_goto_if_blocked [GL] (90B) *** STATE MUTATION ***
│   │   │   ├── cancel_goto_for_stack [GL] (192B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 7 children)
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   └── update_map_tile [UI] (50B)
│   │   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 7 children)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │   └── update_map_radius1 [UI] (50B)
│   │   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 7 children)
│   │   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION ***
│   │   │   │   ├── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   │   └── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   │         (cycle — already in call path)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │   └── calc_unit_movement_points [GL] (516B)
│   │   │   │   │         (subtree shown above — 4 children)
│   │   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   │   └── get_unit_moves_remaining [GL] (69B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION ***
│   │   │   │   │   └── diff_engine_copy_sections [GL] (143B) *** STATE MUTATION ***
│   │   │   │   └── rle_encode (unnamed) [GL] (588B)
│   │   │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   └── FUN_0051D564 [??] (178B)
│   │   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   │   └── FUN_0051D564 [??] (178B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   │   ├── break_alliance [MIXED] (632B) *** STATE MUTATION ***
│   │   │   │   │   └── get_civ_people_name [GL] (145B)
│   │   │   │   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │   ├── set_improvement_name_string [UI] (41B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── open_intelligence_dialog [UI] (535B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── calc_patience_threshold [GL] (211B)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 17 children)
│   │   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── diplo_form_alliance [GL] (374B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_sign_ceasefire [GL] (315B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 5 children)
│   │   │   │   │   ├── calc_gold_to_attitude [GL] (104B)
│   │   │   │   │   ├── diplo_ai_negotiate [MIXED] (10271B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_favor_menu [MIXED] (4878B) *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_check_war_weariness [UI] (178B)
│   │   │   │   │   ├── diplo_show_main_menu [UI] (747B)
│   │   │   │   │   ├── unknown (set trade route value) [GL] (29B) *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │   ├── get_attitude_raw [GL] (47B)
│   │   │   │   │   ├── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   │   ├── intel_play_animation [UI] (181B) *** STATE MUTATION ***
│   │   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_war_readiness [GL] (820B) *** STATE MUTATION ***
│   │   │   │   │   ├── check_can_declare_war [GL] (365B)
│   │   │   │   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 7 children)
│   │   │   │   │   └── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│   │   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   │   ├── chatwin_get_text_length [UI] (37B)
│   │   │   │   │   ├── parleywin_build_title [UI] (324B)
│   │   │   │   │   ├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION ***
│   │   │   │   │   ├── widget_set_cursor_pos [UI] (43B)
│   │   │   │   │   ├── widget_get_text_length [UI] (37B)
│   │   │   │   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   │   └── set_active_control [UI] (38B)
│   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │   │   │   └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 18 children)
│   │   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   └── should_declare_war [GL] (191B)
│   │   │   │   │         (subtree shown above — 1 children)
│   │   │   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   │   │     (subtree shown above — 4 children)
│   │   │   │   │   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │   │         (subtree shown above — 35 children)
│   │   │   │   └── check_join_war [GL] (595B) *** STATE MUTATION ***
│   │   │   │       ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   │       ├── show_dialog_message [UI] (43B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       └── get_civ_people_name [GL] (145B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   │       └── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │             (subtree shown above — 18 children)
│   │   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 18 children)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │       │     (subtree shown above — 18 children)
│   │   │       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 3 children)
│   │   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │   │     → Starts human turn if not already active or if param forces it
│   │   │     (subtree shown above — 3 children)
│   │   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │   │     → Updates all menu item enabled/disabled states based on current game state
│   │   │     (subtree shown above — 19 children)
│   │   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │   │     → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │     (subtree shown above — 7 children)
│   │   ├── is_unit_ready_to_move [GL] (271B)
│   │   │     → Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   └── get_unit_moves_remaining [GL] (69B)
│   │   │         (subtree shown above — 1 children)
│   │   └── find_next_unit_needing_orders [GL] (629B) *** STATE MUTATION ***
│   │         → Finds the next unit needing orders, prioritizing by distance from the current cursor position
│   │       ├── calc_movement_cost [GL] (94B)
│   │       │     (subtree shown above — 2 children)
│   │       └── is_unit_ready_to_move [GL] (271B)
│   │             (subtree shown above — 2 children)
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │     (subtree shown above — 19 children)
│   ├── refresh_status_panel [UI] (297B) *** STATE MUTATION ***
│   │     → Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │     (subtree shown above — 7 children)
│   └── is_unit_ready_to_move [GL] (271B)
│         → Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│         (subtree shown above — 2 children)
├── mp_set_password [MIXED] (614B) *** STATE MUTATION ***
│     → Implements the password set/change dialog for multiplayer
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── unknown (mp_set_password_cleanup) [FW] (12B)
│   │     → Destructor stub for mp_set_password stack cleanup.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │         (subtree shown above — 1 children)
│   ├── unknown (SEH unwind) [FW] (14B)
│   │     → SEH unwind for mp_set_password.
│   ├── mp_update_password_flags [GL] (141B) *** STATE MUTATION ***
│   │     → Scans all 8 player password slots
│   ├── mp_encrypt_passwords [FW] (139B) *** STATE MUTATION ***
│   │     → Encrypts the password buffer using a simple rotation + XOR cipher
│   ├── mp_decrypt_passwords [FW] (144B) *** STATE MUTATION ***
│   │     → Decrypts the password buffer
│   ├── mp_prepare_password_dialog [UI] (137B)
│   │     → Prepares the password dialog by setting the title string from the civ name and a string resource ID.
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │   ├── FUN_0000994F [??]
│   │   ├── credits_invalidate [UI] (27B)
│   │   │     → Invalidates the credits display to trigger repaint.
│   │   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │   │     → Idle handler for throne room
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── unknown (pedia_invalidate_cache) [UI] (27B)
│   │   │     → Forces invalidation of the Civilopedia display cache.
│   │   └── draw_minimap_overlay [UI] (646B) *** STATE MUTATION ***
│   │         → Draws the minimap timer/turn indicator overlay
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── flush_display [UI] (21B)
│   │       ├── invalidate_region [UI] (180B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── fill_surface_from_rect [UI] (71B)
│   │       │     (subtree shown above — 3 children)
│   │       ├── blit_rect_to_rect [UI] (95B)
│   │       │     (subtree shown above — 2 children)
│   │       ├── port_alloc [UI] (325B)
│   │       │     (subtree shown above — 10 children)
│   │       ├── port_set_rect_from_self [UI] (63B)
│   │       └── port_set_rect [UI] (91B)
│   ├── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│   │     → Resumes the turn timer if time remains and game is active.
│   │   ├── FUN_0000994F [??]
│   │   ├── credits_invalidate [UI] (27B)
│   │   │     → Invalidates the credits display to trigger repaint.
│   │   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │   │     → Idle handler for throne room
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   └── unknown (pedia_invalidate_cache) [UI] (27B)
│   │         → Forces invalidation of the Civilopedia display cache.
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_show_modal [UI] (999B)
│   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │     (subtree shown above — 11 children)
│   ├── popup_parse_text_file [UI] (2287B)
│   │     → Parses a game text file section to configure and populate a popup dialog
│   │     (subtree shown above — 12 children)
│   └── _strcpy_thunk [FW] (7B)
│         → CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── show_improvement_editor [UI] (89B)
│     → Entry point for showing the improvement editor
│   ├── create_editor_object [FW] (498B)
│   │     → Constructor for the tech editor object
│   │   └── dialog_ctor [UI] (146B)
│   │         → Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │         (subtree shown above — 1 children)
│   ├── editor_init [UI] (2205B) *** STATE MUTATION ***
│   │     → Full initialization of the improvement editor window
│   │   ├── set_callback_0x44 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x44.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── process_messages [UI] (21B)
│   │   │     → Processes pending Windows messages (message pump)
│   │   │     (subtree shown above — 1 children)
│   │   ├── get_font_height [UI] (28B)
│   │   │     → Returns the font height from the font object at this+4.
│   │   ├── set_dialog_enabled [UI] (36B)
│   │   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   │   ├── create_text_button [UI] (133B)
│   │   │     → Creates a text button control
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_button_handler [UI] (45B)
│   │   │     → Sets a handler callback on the button's window object at offset +0xc0.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_button_click_callback [UI] (33B)
│   │   │     → Sets the click callback function pointer for a button control.
│   │   ├── set_editor_font [UI] (93B)
│   │   │     → Creates a font for the editor and stores both font handle and metrics in the object.
│   │   │     (subtree shown above — 3 children)
│   │   ├── set_combo_selection [UI] (43B)
│   │   │     → Sets the selected index of a combo box.
│   │   │   └── FUN_000036F6 [??]
│   │   ├── editor_load_improvements [UI] (234B) *** STATE MUTATION ***
│   │   │     → Loads improvement data from the game's internal tables into the editor's working copies
│   │   ├── editor_update_controls [UI] (332B)
│   │   │     → Updates editor dialog controls (edit fields and combo boxes) to reflect the currently selected improvement's properties.
│   │   │   ├── get_combo_selection_id [UI] (28B)
│   │   │   ├── set_edit_text [UI] (43B)
│   │   │   │   └── FUN_00002D7F [??]
│   │   │   └── set_combo_selection [UI] (43B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── editor_handle_listbox [UI] (342B) *** STATE MUTATION ***
│   │   │     → Handles listbox selection changes in the improvement editor
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_parent_window_handle [UI] (28B)
│   │   │   ├── get_combo_selection [UI] (37B)
│   │   │   │   └── FUN_000036B1 [??]
│   │   │   ├── set_combo_selection [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   └── FUN_00008B00 [??]
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │   └── FUN_00008B00 [??]
│   │   │   ├── editor_update_controls [UI] (332B)
│   │   │   │     (subtree shown above — 3 children)
│   │   │   ├── editor_read_controls [UI] (437B) *** STATE MUTATION ***
│   │   │   │   ├── get_combo_selection_id [UI] (28B)
│   │   │   │   ├── get_edit_text [UI] (43B)
│   │   │   │   │     (subtree shown above — 1 children)
│   │   │   │   └── get_combo_selection [UI] (37B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── unknown — editor repaint wrapper [UI] (27B)
│   │   │   │   └── editor_paint [UI] (1396B)
│   │   │   │       ├── end_paint [UI] (32B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── text_begin [UI] (29B)
│   │   │   │       ├── text_add_string [UI] (33B)
│   │   │   │       ├── text_add_label_id [UI] (33B)
│   │   │   │       ├── fill_surface_from_rect [UI] (71B)
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       ├── text_add_number [UI] (33B)
│   │   │   │       ├── get_editor_color [UI] (28B)
│   │   │   │       ├── show_help_topic [UI] (34B)
│   │   │   │       │     (subtree shown above — 1 children)
│   │   │   │       ├── draw_border_frame [UI] (588B)
│   │   │   │       ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │   │   │       │     (subtree shown above — 15 children)
│   │   │   │       ├── draw_rect_outline_wh [UI] (152B)
│   │   │   │       ├── fill_rect_xywh [UI] (63B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── blit_rect_to_rect [UI] (95B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── set_text_draw_target [UI] (24B) *** STATE MUTATION ***
│   │   │   │       ├── set_text_draw_source [UI] (24B) *** STATE MUTATION ***
│   │   │   │       ├── set_text_style [UI] (68B) *** STATE MUTATION ***
│   │   │   │       ├── draw_text_with_shadow [UI] (205B)
│   │   │   │       │     (subtree shown above — 3 children)
│   │   │   │       ├── draw_text_centered [UI] (139B)
│   │   │   │       │     (subtree shown above — 2 children)
│   │   │   │       ├── scale_table_build_primary [UI] (657B)
│   │   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │             (subtree shown above — 1 children)
│   │   │   └── unknown (set popup parent B) [UI] (24B)
│   │   ├── editor_create_combo_control [UI] (551B) *** STATE MUTATION ***
│   │   │     → Creates a combo box control in the editor dialog, populating it with either improvement names or tech names depending...
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_combo_control [UI] (101B)
│   │   │   │   ├── FUN_00003130 [??]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── set_combo_data_source [UI] (48B)
│   │   │   │   ├── FUN_000035C8 [??]
│   │   │   │   └── get_data_source_ptr [UI] (27B)
│   │   │   ├── add_combo_item [UI] (49B)
│   │   │   │   └── FUN_0000357E [??]
│   │   │   └── set_combo_callback [UI] (33B)
│   │   ├── editor_create_edit_control [UI] (244B) *** STATE MUTATION ***
│   │   │     → Creates a numeric edit control in the editor dialog.
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── create_edit_control [UI] (130B)
│   │   │   │   ├── FUN_00002740 [??]
│   │   │   │   ├── FUN_00002D7F [??]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   │     (subtree shown above — 2 children)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   │         (subtree shown above — 1 children)
│   │   │   ├── set_edit_max_chars [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── set_control_callback [UI] (33B)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (subtree shown above — 2 children)
│   │   ├── load_gif_file [UI] (1353B)
│   │   │     → Loads a GIF image from a file
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── widget_read_text (wrapper) [UI] (44B)
│   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── flip_surface_vertical [UI] (249B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     → Runs a modal dialog loop
│   │   │     (subtree shown above — 4 children)
│   │   └── palette_init [UI] (145B)
│   │         → Initializes the palette object
│   │         (subtree shown above — 3 children)
│   ├── show_improvement_editor cleanup [FW] (12B)
│   │     → Cleanup — destroys font/resource context and restores SEH.
│   ├── FUN_004DAA51 [??]
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── init_city_windows_layout [MIXED] (926B) *** STATE MUTATION ***
│     → Initializes the layout of all city windows
│   ├── FUN_0000994F [??]
│   ├── FUN_00009A49 [??]
│   ├── status_panel_calc_rect [UI] (255B) *** STATE MUTATION ***
│   │     → Calculates the bounding rectangle for the status panel, adjusting dimensions based on screen size, multiplayer mode, ...
│   │   ├── get_window_width [UI] (37B)
│   │   │     → Returns the window width by calling FUN_005bc933 with the window handle from this+8.
│   │   │   └── get_client_width [UI] (56B)
│   │   └── set_rect_wh [UI] (48B)
│   │         → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   ├── get_window_width [UI] (37B)
│   │     → Returns the window width by calling FUN_005bc933 with the window handle from this+8.
│   │     (subtree shown above — 1 children)
│   ├── save_and_flush [UI] (41B)
│   │     → Saves the current rendering context and flushes display updates.
│   │     (subtree shown above — 2 children)
│   ├── get_font_height [UI] (28B)
│   │     → Returns the font height from the font object at this+4.
│   ├── setup_main_view_rect [UI] (153B)
│   │     → Calculates and sets the main map view rectangle dimensions, accounting for minimap panel offset.
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── get_window_width [UI] (37B)
│   │   │     → Returns the window width by calling FUN_005bc933 with the window handle from this+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   └── get_view_height [UI] (37B)
│   │         → Returns the height of the current view window.
│   │       └── get_client_height [UI] (56B)
│   ├── get_view_height [UI] (37B)
│   │     → Returns the height of the current view window.
│   │     (subtree shown above — 1 children)
│   ├── unknown (manage window) [UI] (37B)
│   │     → Manages a window by calling manage_window_C5DA with the handle from in_ECX+8.
│   │   └── FUN_0000C5DA [??]
│   ├── init_game_display [UI] (51B)
│   │     → Initializes the game display
│   │     (subtree shown above — 2 children)
│   ├── widget_set_size [UI] (43B)
│   │     → Sets a widget's size by calling FUN_005bc713 with the widget's window handle and param_1.
│   │   └── move_window_from_rect [UI] (80B)
│   │         → Moves and resizes a window to match a RECT structure
│   │       ├── rect_get_width [UI] (27B)
│   │       └── rect_get_height [UI] (28B)
│   ├── unknown — manage window [UI] (37B)
│   │     → Calls manage_window_C692 with the window handle from the object's field at offset 8.
│   │     (subtree shown above — 1 children)
│   ├── calc_main_window_rect [UI] (139B) *** STATE MUTATION ***
│   │     → Calculates the main game window rectangle from the status bar position.
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B)
│   │   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   └── get_view_height [UI] (37B)
│   │         → Returns the height of the current view window.
│   │         (subtree shown above — 1 children)
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── load_game_handler [MIXED] (1023B) *** STATE MUTATION ***
│     → Handles loading a saved game
│   ├── FUN_0000994F [??]
│   ├── setup_map_status_bar [UI] (304B)
│   │     → Sets up the map window status bar content: player name, language indicator, and map view filter options.
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_bold [UI] (29B)
│   │   │     → Begins bold text mode in the global text buffer.
│   │   ├── get_civ_name [UI] (28B)
│   │   │     → Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_status_bar_text [UI] (33B)
│   │   │     → Sets the status bar text to param_1 using the global string buffer.
│   │   └── unknown (dialog_set_title_and_redraw) [UI] (139B)
│   │         → Sets the dialog title string (at offset 0x134, max 0x83 chars) then redraws the title bar and invalidates the rect.
│   │       ├── invalidate_region [UI] (180B)
│   │       │     (subtree shown above — 2 children)
│   │       └── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │             (subtree shown above — 15 children)
│   ├── initialize_map_view [UI] (889B) *** STATE MUTATION ***
│   │     → Full initialization of a map view window: sets initial zoom/filter, creates the view bitmap surface, registers all ca...
│   │   ├── rect_get_width [UI] (27B)
│   │   │     → Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B)
│   │   │     → Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_callback_paint [UI] (45B)
│   │   │     → Sets the paint callback handler on the window object
│   │   ├── set_callback_resize [UI] (45B)
│   │   │     → Sets the resize callback handler on the window object at this+0x18.
│   │   ├── set_callback_0x30 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x30.
│   │   ├── set_callback_0x40 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x40.
│   │   ├── set_callback_0x44 [UI] (45B)
│   │   │     → Sets a callback handler at this+0x44.
│   │   ├── set_scroll_amounts [UI] (45B)
│   │   │     → Sets horizontal and vertical scroll amounts on the window object.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (subtree shown above — 1 children)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     → Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── setup_main_view_rect [UI] (153B)
│   │   │     → Calculates and sets the main map view rectangle dimensions, accounting for minimap panel offset.
│   │   │     (subtree shown above — 4 children)
│   │   ├── setup_map_status_bar [UI] (304B)
│   │   │     → Sets up the map window status bar content: player name, language indicator, and map view filter options.
│   │   │     (subtree shown above — 8 children)
│   │   ├── init_map_viewport [UI] (224B) *** STATE MUTATION ***
│   │   │     → Initializes the map viewport object
│   │   ├── dialog_add_button [UI] (192B)
│   │   │     → Adds a button to a dialog (max 6 buttons)
│   │   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   └── widget_get_height [UI] (34B)
│   │   │         (subtree shown above — 1 children)
│   │   ├── dialog_create [UI] (588B)
│   │   │     → Creates and initializes a dialog window with title, flags, position, and size
│   │   │     (subtree shown above — 6 children)
│   │   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │         (subtree shown above — 2 children)
│   ├── scenario_player_selection [GL] (1483B) *** STATE MUTATION ***
│   │     → Handles player selection for scenarios
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── mapgen_set_dialog_type [UI] (42B)
│   │   │     → Sets up a dialog/progress indicator for map generation with the given type parameter.
│   │   │   └── popup_dialog_open [UI] (306B) *** STATE MUTATION ***
│   │   │         (subtree shown above — 8 children)
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_list_invalidate_item [UI] (108B)
│   │   │     → Invalidates a specific item in a multiplayer list control by setting its dirty flag and triggering a redraw.
│   │   │   └── FUN_0000ABC7 [??]
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     → Returns the noun name for a civilization (e.g., "Romans")
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── mp_handle_player_turn [MIXED] (192B) *** STATE MUTATION ***
│   │   │     → Handles player turn authentication in multiplayer
│   │   │   ├── mp_check_password_or_set [GL] (90B) *** STATE MUTATION ***
│   │   │   │   ├── mp_set_password [MIXED] (614B) *** STATE MUTATION ***
│   │   │   │   │     (subtree shown above — 8 children)
│   │   │   │   └── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │   │   │         (subtree shown above — 6 children)
│   │   │   └── mp_verify_password [UI] (341B) *** STATE MUTATION ***
│   │   │       ├── unknown (dialog show single param) [UI] (33B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── mp_prepare_password_dialog [UI] (137B)
│   │   │       ├── popup_dialog_create [UI] (93B)
│   │   │       │     (subtree shown above — 2 children)
│   │   │       ├── popup_show_modal [UI] (999B)
│   │   │       │     (subtree shown above — 11 children)
│   │   │       └── popup_parse_text_file [UI] (2287B)
│   │   │             (subtree shown above — 12 children)
│   │   ├── mp_build_label_string [UI] (159B)
│   │   │     → Builds a label string for multiplayer dialogs
│   │   ├── popup_set_position_fields [UI] (42B)
│   │   │     → Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2
│   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │     → Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1
│   │   ├── popup_set_radio_selected [UI] (76B)
│   │   │     → Sets or clears the "selected" flag (bit 0) on a radio option identified by param_1
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID
│   │   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │   └── popup_find_button_by_id [UI] (100B)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_show_modal [UI] (999B)
│   │   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │   │     (subtree shown above — 11 children)
│   │   └── popup_parse_text_file [UI] (2287B)
│   │         → Parses a game text file section to configure and populate a popup dialog
│   │         (subtree shown above — 12 children)
│   ├── unknown (manage window) [UI] (37B)
│   │     → Manages a window by calling manage_window_C5DA with the handle from in_ECX+8.
│   │     (subtree shown above — 1 children)
│   ├── credits_close [UI] (84B)
│   │     → Closes the credits display window
│   │   ├── flush_at_origin [UI] (34B)
│   │   │     → Flushes the display at coordinates (0, 0).
│   │   │     (subtree shown above — 1 children)
│   │   ├── dialog_cleanup [UI] (38B)
│   │   │     → Cleans up a dialog — destroys buttons then destroys the window.
│   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   └── dialog_destroy_buttons [UI] (162B)
│   │   └── surface_list_clear [UI] (75B)
│   │         → Iterates the surface list and removes each node.
│   ├── init_cd_music [UI] (190B) *** STATE MUTATION ***
│   │     → Initializes CD music playback system
│   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │     → Stops music playback and sets paused flag.
│   ├── resume_music [UI] (85B) *** STATE MUTATION ***
│   │     → Resumes music if enabled
│   │   ├── select_random_music_track [UI] (388B) *** STATE MUTATION ***
│   │   │     → Selects a random music track
│   │   └── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │         → Stops music playback and sets paused flag.
│   ├── init_game_display [UI] (51B)
│   │     → Initializes the game display
│   │     (subtree shown above — 2 children)
│   ├── start_human_turn [UI] (95B) *** STATE MUTATION ***
│   │     → Starts human turn if not already active or if param forces it
│   │     (subtree shown above — 3 children)
│   ├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
│   │     → Activates the current unit for player input
│   │     (subtree shown above — 7 children)
│   ├── mp_handle_player_turn [MIXED] (192B) *** STATE MUTATION ***
│   │     → Handles player turn authentication in multiplayer
│   │     (subtree shown above — 2 children)
│   ├── parleywin_focus_negotiate [UI] (72B)
│   │     → Sets focus to the negotiation parley window object (DAT_0067a7f0), then closes.
│   │   ├── parleywin_close [MIXED] (432B) *** STATE MUTATION ***
│   │   │     → Closes the parley window
│   │   │   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │   │     (subtree shown above — 1 children)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │     (subtree shown above — 18 children)
│   │   │   ├── init_game_display [UI] (51B)
│   │   │   │     (subtree shown above — 2 children)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── get_active_control [UI] (21B)
│   │   └── set_active_control [UI] (38B)
│   │         → Sets DAT_00637ea4 to param_1, returns old value.
│   ├── parleywin_focus_chat [UI] (72B)
│   │     → Sets focus to the chat parley window object (DAT_0068ac30), then closes.
│   │   ├── parleywin_close [MIXED] (432B) *** STATE MUTATION ***
│   │   │     → Closes the parley window
│   │   │     (subtree shown above — 8 children)
│   │   └── set_active_control [UI] (38B)
│   │         → Sets DAT_00637ea4 to param_1, returns old value.
│   ├── widget_set_size [UI] (43B)
│   │     → Sets a widget's size by calling FUN_005bc713 with the widget's window handle and param_1.
│   │     (subtree shown above — 1 children)
│   ├── init_city_windows_layout [MIXED] (926B) *** STATE MUTATION ***
│   │     → Initializes the layout of all city windows
│   │     (subtree shown above — 14 children)
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │     (subtree shown above — 19 children)
│   ├── unknown — manage window [UI] (37B)
│   │     → Calls manage_window_C692 with the window handle from the object's field at offset 8.
│   │     (subtree shown above — 1 children)
│   ├── pedia_close_display [UI] (129B) *** STATE MUTATION ***
│   │     → Closes the Civilopedia display panel
│   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │     → Calls manage_window_C44D with the window handle at this+8.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │     → Retrieves the drawing context from this+8.
│   │   │     (subtree shown above — 1 children)
│   │   └── init_game_display [UI] (51B)
│   │         → Initializes the game display
│   │         (subtree shown above — 2 children)
│   ├── pedia_load_index_data [UI] (3281B)
│   │     → Loads all Civilopedia index data from the describe.txt file
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   └── pedia_sort_entries [UI] (305B)
│   │         → Bubble sorts the Civilopedia entry linked list alphabetically, also reordering parallel index arrays.
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │     (subtree shown above — 6 children)
│   ├── start_turn_timer [MIXED] (280B) *** STATE MUTATION ***
│   │     → Starts the turn timer — closes open windows, calculates remaining time, creates a 500ms repeating timer, sends MP not...
│   │   ├── FUN_0000994F [??]
│   │   ├── invalidate_region [UI] (180B)
│   │   │     → Invalidates a screen region
│   │   │     (subtree shown above — 2 children)
│   │   ├── credits_invalidate [UI] (27B)
│   │   │     → Invalidates the credits display to trigger repaint.
│   │   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │   │     → Idle handler for throne room
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     → Central network message dispatcher
│   │   │     (subtree shown above — 18 children)
│   │   ├── unknown (pedia_invalidate_cache) [UI] (27B)
│   │   │     → Forces invalidation of the Civilopedia display cache.
│   │   └── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │         → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │         (subtree shown above — 15 children)
│   ├── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│   │     → Resumes the turn timer if time remains and game is active.
│   │     (subtree shown above — 5 children)
│   ├── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │     → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (subtree shown above — 2 children)
│   ├── cdaudio_open [FW] (265B)
│   │     → Opens CD audio device, sets time format to track, gets number of tracks (DAT_006389e0).
│   ├── cdaudio_close [FW] (70B)
│   │     → Closes CD audio device
│   └── cdaudio_stop [FW] (50B)
│         → Stops CD audio playback (MCI_STOP).
├── show_game_options_dialog [MIXED] (705B) *** STATE MUTATION ***
│     → Shows the game options dialog with 11 checkboxes
│   ├── show_message [UI] (46B) *** STATE MUTATION ***
│   │     → Stores a message string in the message buffer at the specified slot index.
│   ├── unknown (dialog show with section) [UI] (37B)
│   │     → Opens a dialog/section by calling thunk_FUN_00419100 with DAT_006359d4 and the two parameters.
│   │   └── show_help_topic_ext [UI] (38B)
│   │         → Extended help topic opener with additional parameter.
│   │         (subtree shown above — 1 children)
│   ├── init_cd_music [UI] (190B) *** STATE MUTATION ***
│   │     → Initializes CD music playback system
│   ├── unknown (stop music) [UI] (31B) *** STATE MUTATION ***
│   │     → Stops music playback and sets paused flag.
│   ├── resume_music [UI] (85B) *** STATE MUTATION ***
│   │     → Resumes music if enabled
│   │     (subtree shown above — 2 children)
│   ├── save_civ2_dat [GL] (212B) *** STATE MUTATION ***
│   │     → Saves CIV2.DAT preferences file
│   ├── set_checkbox_state [UI] (36B)
│   │     → Sets a dialog checkbox state
│   │   └── FUN_0051D7D6 [??] (65B)
│   ├── FUN_0051D7BC [??] (26B)
│   ├── FUN_0051D817 [??] (32B)
│   ├── cdaudio_open [FW] (265B)
│   │     → Opens CD audio device, sets time format to track, gets number of tracks (DAT_006389e0).
│   ├── cdaudio_close [FW] (70B)
│   │     → Closes CD audio device
│   ├── cdaudio_stop [FW] (50B)
│   │     → Stops CD audio playback (MCI_STOP).
│   └── _strcat [FW] (224B)
│         → CRT strcat — finds end of dest string then copies source
├── toggle_hidden_terrain [UI] (88B) *** STATE MUTATION ***
│     → Toggles hidden terrain debug mode
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   └── redraw_map_all_players [UI] (124B)
│         → Redraws entire map for all active players.
│       └── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│             → Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│             (subtree shown above — 6 children)
├── show_pick_music_dialog [UI] (496B)
│     → Shows a dialog to pick background music
│   ├── select_list_item [UI] (38B)
│   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │     (subtree shown above — 1 children)
│   ├── open_list_dialog [UI] (47B)
│   │     → Opens a list dialog with the given title and flags.
│   │     (subtree shown above — 1 children)
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── play_music_track [UI] (312B) *** STATE MUTATION ***
│   │     → Plays a specific music track (param_1) with optional restart (param_2)
│   │     (subtree shown above — 1 children)
│   ├── pick_music_cleanup_free [FW] (12B)
│   │     → Dialog destructor for pick_music — frees an allocated buffer via thunk_FUN_0059df8a.
│   │   └── popup_dialog_close [UI] (47B) *** STATE MUTATION ***
│   │         → Closes a popup dialog by destroying it and clearing its list control.
│   │         (subtree shown above — 1 children)
│   ├── pick_music_seh_epilog [FW] (14B)
│   │     → SEH epilog for pick_music
│   ├── popup_dialog_create [UI] (93B)
│   │     → Creates a new popup dialog object
│   │     (subtree shown above — 2 children)
│   ├── popup_set_default_selection [UI] (116B)
│   │     → Sets the default selected item in the popup by ID
│   │     (subtree shown above — 2 children)
│   ├── cdaudio_close [FW] (70B)
│   │     → Closes CD audio device
│   └── cdaudio_get_track_count [FW] (270B)
│         → Gets CD track count
├── pedia_open_category [UI] (200B) *** STATE MUTATION ***
│     → Opens a specific category in the Civilopedia
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── set_dialog_enabled [UI] (36B)
│   │     → Sets an enabled/disabled flag on a dialog control at this+0xc4.
│   ├── unknown (lock pedia surface) [UI] (38B)
│   │     → Locks the drawing surface for the pedia widget.
│   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │     → Retrieves the drawing context from this+8.
│   │   │     (subtree shown above — 1 children)
│   │   └── surface_list_find_dirty [UI] (174B)
│   │         → Walks the surface list looking for a dirty surface (via FUN_005c5ea0)
│   ├── pedia_init_tabs [UI] (1391B)
│   │     → Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) ...
│   │   ├── control_invalidate [UI] (65B)
│   │   │     → Invalidates a UI control for repainting
│   │   │     (subtree shown above — 2 children)
│   │   ├── set_edit_text [UI] (43B)
│   │   │     → Sets the text content of an edit control.
│   │   │     (subtree shown above — 1 children)
│   │   ├── pedia_button_ctor [UI] (83B)
│   │   │     → Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B)
│   │   │     → Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   │     (subtree shown above — 3 children)
│   │   ├── unknown (set button callback) [UI] (33B)
│   │   │     → Sets a callback function pointer at this+0x34.
│   │   └── unknown (clear hypertext links) [UI] (21B)
│   │         → Clears/frees the hypertext link list.
│   ├── pedia_set_title [UI] (229B)
│   │     → Sets the title text for the Civilopedia window based on the category
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   └── text_add_label_id [UI] (33B)
│   │         → Appends a localized label (by ID) to the global text buffer.
│   ├── pedia_push_history [UI] (523B) *** STATE MUTATION ***
│   │     → Pushes the current navigation state onto the Civilopedia history stack for back-button support
│   └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│         → Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│         (subtree shown above — 2 children)
├── citywin_modal_refresh [UI] (132B) *** STATE MUTATION ***
│     → Shows a modal city refresh message
│   ├── FUN_0000BC4F [??]
│   ├── text_begin [UI] (29B)
│   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B)
│   │     → Appends a string to the global text buffer.
│   ├── text_add_number [UI] (33B)
│   │     → Adds a number to the global text buffer.
│   └── unknown (dialog show single param) [UI] (33B)
│         → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│         (subtree shown above — 1 children)
├── mp_join_game_handler [MIXED] (683B) *** STATE MUTATION ***
│     → Handles a player joining a multiplayer game
│   ├── FUN_0000994F [??]
│   ├── show_window_wrapper [UI] (33B)
│   │     → Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (subtree shown above — 1 children)
│   ├── init_palette_system [UI] (21B)
│   │     → Initializes the palette system.
│   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │     → Sets a string control value in the multiplayer dialog string table
│   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │     → Sets a numeric control value in the multiplayer dialog number table.
│   ├── unknown (dialog show single param) [UI] (33B)
│   │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (subtree shown above — 1 children)
│   ├── unknown (manage pedia window) [UI] (37B)
│   │     → Calls manage_window_C44D with the window handle at this+8.
│   │     (subtree shown above — 1 children)
│   ├── get_civ_people_name [GL] (145B)
│   │     → Returns the people name for a civilization (e.g., "Roman")
│   ├── mp_choose_additional_player [MIXED] (1976B) *** STATE MUTATION ***
│   │     → Shows a dialog for choosing an additional player to join a multiplayer game
│   │   ├── text_begin [UI] (29B)
│   │   │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B)
│   │   │     → Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     → Appends a localized label (by ID) to the global text buffer.
│   │   ├── mapgen_set_dialog_type [UI] (42B)
│   │   │     → Sets up a dialog/progress indicator for map generation with the given type parameter.
│   │   │     (subtree shown above — 1 children)
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── text_newline [UI] (29B)
│   │   │     → Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B)
│   │   │     → Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B)
│   │   │     → Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B)
│   │   │     → Adds a number to the global text buffer.
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_list_invalidate_item [UI] (108B)
│   │   │     → Invalidates a specific item in a multiplayer list control by setting its dirty flag and triggering a redraw.
│   │   │     (subtree shown above — 1 children)
│   │   ├── disable_civ_slot [UI] (133B) *** STATE MUTATION ***
│   │   │     → Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   │     (subtree shown above — 1 children)
│   │   ├── unknown (set selected item) [UI] (33B) *** STATE MUTATION ***
│   │   │     → Sets the selected item index in a UI list object.
│   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │     → Plays a sound effect by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     → Returns the noun name for a civilization (e.g., "Romans")
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     → Returns the people name for a civilization (e.g., "Roman")
│   │   ├── mp_handle_player_turn [MIXED] (192B) *** STATE MUTATION ***
│   │   │     → Handles player turn authentication in multiplayer
│   │   │     (subtree shown above — 2 children)
│   │   ├── mp_build_label_string [UI] (159B)
│   │   │     → Builds a label string for multiplayer dialogs
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_set_position_fields [UI] (42B)
│   │   │     → Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2
│   │   ├── popup_find_radio_option_by_id [UI] (101B)
│   │   │     → Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1
│   │   ├── popup_set_radio_selected [UI] (76B)
│   │   │     → Sets or clears the "selected" flag (bit 0) on a radio option identified by param_1
│   │   │     (subtree shown above — 1 children)
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_add_radio_option [UI] (566B)
│   │   │     → Adds a radio button option to the popup dialog
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_show_modal [UI] (999B)
│   │   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │   │     (subtree shown above — 11 children)
│   │   └── popup_parse_text_file [UI] (2287B)
│   │         → Parses a game text file section to configure and populate a popup dialog
│   │         (subtree shown above — 12 children)
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │     (subtree shown above — 6 children)
│   ├── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│   │     → Resumes the turn timer if time remains and game is active.
│   │     (subtree shown above — 5 children)
│   └── popup_dialog_create [UI] (93B)
│         → Creates a new popup dialog object
│         (subtree shown above — 2 children)
├── toggle_cheat_mode [MIXED] (335B) *** STATE MUTATION ***
│     → Toggles cheat mode on/off
│   ├── show_dialog_message [UI] (43B)
│   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (subtree shown above — 1 children)
│   ├── show_help_topic [UI] (34B)
│   │     → Opens a help topic with default parameters.
│   │     (subtree shown above — 1 children)
│   ├── update_menu_state [MIXED] (3761B) *** STATE MUTATION ***
│   │     → Updates all menu item enabled/disabled states based on current game state
│   │     (subtree shown above — 19 children)
│   └── create_scenario_folder [UI] (505B) *** STATE MUTATION ***
│         → Creates a new scenario folder
│       ├── show_message [UI] (46B) *** STATE MUTATION ***
│       │     → Stores a message string in the message buffer at the specified slot index.
│       ├── show_help_topic [UI] (34B)
│       │     → Opens a help topic with default parameters.
│       │     (subtree shown above — 1 children)
│       ├── write_save_file [GL] (4499B) *** STATE MUTATION ***
│       │     → Writes the complete save file
│       │   ├── pack_viewport_state [GL] (233B) *** STATE MUTATION ***
│       │   ├── civ_has_tech [GL] (181B)
│       │   │     (subtree shown above — 1 children)
│       │   └── save_map_data [GL] (309B) *** STATE MUTATION ***
│       ├── FUN_0051D63B [??] (253B)
│       └── validate_folder_name [UI] (77B)
│             → Validates a folder name by uppercasing it and checking each character against a valid-character table at DAT_006335f8
├── cheat_edit_civ [GL] (3764B) *** STATE MUTATION ***
│     → Comprehensive cheat civ editor
├── end_turn_prompt [MIXED] (258B) *** STATE MUTATION ***
│     → End-turn prompt handler
│   ├── invalidate_region [UI] (180B)
│   │     → Invalidates a screen region
│   │     (subtree shown above — 2 children)
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │     → Central network message dispatcher
│   │     (subtree shown above — 18 children)
│   ├── game_timer_dialog [MIXED] (1579B) *** STATE MUTATION ***
│   │     → Shows the game timer configuration dialog
│   │   ├── select_list_item [UI] (38B)
│   │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (subtree shown above — 1 children)
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     → Opens a list dialog with the given title and flags.
│   │   │     (subtree shown above — 1 children)
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     → Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │     → Shows a waiting dialog by calling thunk_FUN_0051d564 with 4 parameters and DAT_006359d4.
│   │   │     (subtree shown above — 1 children)
│   │   ├── enqueue_mp_event [MIXED] (398B) *** STATE MUTATION ***
│   │   │     → Enqueues a multiplayer event message
│   │   │     (subtree shown above — 1 children)
│   │   ├── mp_set_animation_style [UI] (185B) *** STATE MUTATION ***
│   │   │     → Sets the animation display style for multiplayer
│   │   │   └── show_popup_window [UI] (330B)
│   │   │       ├── set_callback_0x30 [UI] (45B)
│   │   │       ├── set_callback_0x38 [UI] (45B)
│   │   │       ├── show_window_wrapper [UI] (33B)
│   │   │       │     (subtree shown above — 1 children)
│   │   │       ├── dialog_create [UI] (588B)
│   │   │       │     (subtree shown above — 6 children)
│   │   │       ├── unknown [UI] (81B)
│   │   │       ├── calc_window_position [UI] (352B)
│   │   │       ├── get_popup_dimensions [UI] (186B)
│   │   │       └── set_active_surface [UI] (74B) *** STATE MUTATION ***
│   │   │             (subtree shown above — 2 children)
│   │   ├── unknown [UI] (61B)
│   │   │     → Conditional cleanup functions for popup windows — destroy window if video loaded.
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     → Creates a new popup dialog object
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_set_position_fields [UI] (42B)
│   │   │     → Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2
│   │   ├── popup_set_default_selection [UI] (116B)
│   │   │     → Sets the default selected item in the popup by ID
│   │   │     (subtree shown above — 2 children)
│   │   ├── popup_show_modal [UI] (999B)
│   │   │     → Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels
│   │   │     (subtree shown above — 11 children)
│   │   └── popup_parse_text_file [UI] (2287B)
│   │         → Parses a game text file section to configure and populate a popup dialog
│   │         (subtree shown above — 12 children)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) *** STATE MUTATION ***
│   │     → Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name
│   │     (subtree shown above — 15 children)
│   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │     → Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │     (subtree shown above — 6 children)
│   ├── start_turn_timer [MIXED] (280B) *** STATE MUTATION ***
│   │     → Starts the turn timer — closes open windows, calculates remaining time, creates a 500ms repeating timer, sends MP not...
│   │     (subtree shown above — 7 children)
│   └── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│         → Resumes the turn timer if time remains and game is active.
│         (subtree shown above — 5 children)
└── unit_order_build_city [MIXED] (1087B) *** STATE MUTATION ***
      → Handles the "Build City" order
    ├── FUN_0000C679 [??]
    ├── FUN_0000DADA [??]
    ├── FUN_0000DB36 [??]
    ├── is_tile_valid [GL] (80B)
    │     → Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
    ├── text_begin [UI] (29B)
    │     → Begins a new text composition operation on the global text buffer at DAT_00679640.
    ├── show_message [UI] (46B) *** STATE MUTATION ***
    │     → Stores a message string in the message buffer at the specified slot index.
    ├── show_city_popup [UI] (39B)
    │     → Shows a city information popup using the dialog system.
    │   └── show_city_style_picker [UI] (260B) *** STATE MUTATION ***
    │         → Shows a city style picker dialog for the Civilopedia.
    │       ├── select_list_item [UI] (38B)
    │       │     (subtree shown above — 1 children)
    │       ├── popup_dialog_create [UI] (93B)
    │       │     (subtree shown above — 2 children)
    │       ├── popup_add_button [UI] (360B)
    │       │   ├── measure_text_height [UI] (42B)
    │       │   │     (subtree shown above — 1 children)
    │       │   └── init_editor_scrollbar [UI] (34B)
    │       │         (subtree shown above — 1 children)
    │       └── sprite_init_empty [UI] (140B)
    │           ├── port_alloc_rect [UI] (58B)
    │           │     (subtree shown above — 1 children)
    │           ├── port_set_color [UI] (43B)
    │           │   └── port_fill_rect [UI] (236B)
    │           └── unknown (sprite extract with rect params) [UI] (88B)
    │               ├── sprite_lock_data [UI] (56B)
    │               └── sprite_extract_from_oleitem [UI] (1951B)
    │                     (subtree shown above — 9 children)
    ├── unknown (dialog show single param) [UI] (33B)
    │     → Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
    │     (subtree shown above — 1 children)
    ├── unknown (dialog show 4 params) [UI] (45B)
    │     → Calls thunk_FUN_0051d63b with DAT_006359d4 and 4 parameters.
    │   └── FUN_0051D63B [??] (253B)
    ├── unknown (string pool set) [UI] (33B)
    │     → Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
    │     (subtree shown above — 1 children)
    ├── find_city_at [GL] (245B)
    │     → Finds a city at the given (x,y) coordinates
    │     (subtree shown above — 2 children)
    ├── show_game_popup_3arg [UI] (43B)
    │     → Shows a game popup dialog with 3 arguments using the global dialog context.
    │     (subtree shown above — 1 children)
    ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
    │     → Plays a sound effect by ID
    │     (subtree shown above — 2 children)
    ├── update_map_area_all_players [UI] (136B)
    │     → Updates a map area for all active players (all viewports in MP).
    │     (subtree shown above — 1 children)
    ├── unknown (tutorial_show_city_screen) [UI] (42B)
    │     → Wrapper that calls thunk_FUN_0051d564(param_1, param_2, 0, param_3, param_4)
    │   └── FUN_0051D564 [??] (178B)
    ├── set_paradrop_range [GL] (31B) *** STATE MUTATION ***
    │     → Sets the paradrop range for a unit type
    ├── unit_order_found_city [GL] (335B) *** STATE MUTATION ***
    │     → Founds a new city at the unit's location
    │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
    │   │     → Iterates all 8 map views and scrolls each active view if the given position is near edges
    │   │     (subtree shown above — 1 children)
    │   ├── update_map_area_all_players [UI] (136B)
    │   │     → Updates a map area for all active players (all viewports in MP).
    │   │     (subtree shown above — 1 children)
    │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
    │   │     → Deletes a unit
    │   │   ├── FUN_0000C494 [??]
    │   │   ├── FUN_0000C679 [??]
    │   │   ├── show_dialog_message [UI] (43B)
    │   │   │     (subtree shown above — 1 children)
    │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
    │   │   │     (subtree shown above — 18 children)
    │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
    │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
    │   │   │     (subtree shown above — 3 children)
    │   │   └── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
    │   │       ├── is_tile_valid [GL] (80B)
    │   │       ├── show_dialog_message [UI] (43B)
    │   │       │     (subtree shown above — 1 children)
    │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
    │   │       │     (subtree shown above — 18 children)
    │   │       ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
    │   │       ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
    │   │       │     (subtree shown above — 3 children)
    │   │       └── get_tile_ptr [GL] (90B)
    │   │             (subtree shown above — 1 children)
    │   ├── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
    │   │     → Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility map.
    │   │   ├── get_tile_ptr [GL] (90B)
    │   │   │     (subtree shown above — 1 children)
    │   │   └── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
    │   │         (subtree shown above — 3 children)
    │   └── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
    │         → Sets or clears improvement bits on a tile
    │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
    │       │     (subtree shown above — 18 children)
    │       ├── get_tile_ptr [GL] (90B)
    │       │     (subtree shown above — 1 children)
    │       └── queue_map_update [GL] (515B) *** STATE MUTATION ***
    │             (subtree shown above — 1 children)
    ├── show_city_event_dialog_v2 [UI] (915B) *** STATE MUTATION ***
    │     → Enhanced version of city event dialog with a production item image
    │   ├── select_list_item [UI] (38B)
    │   │     → Selects a list item in the current dialog, with index 0 and param_1 as a flag.
    │   │     (subtree shown above — 1 children)
    │   ├── dialog_set_title [UI] (41B)
    │   │     → Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
    │   │   └── dialog_set_title_impl [UI] (42B)
    │   ├── civ_has_tech [GL] (181B)
    │   │     → Checks if a civilization (param_1) has a specific technology (param_2)
    │   │     (subtree shown above — 1 children)
    │   ├── pedia_window_ctor [UI] (115B)
    │   │     → Constructor for the Civilopedia window object
    │   │   └── popup_dialog_create [UI] (93B)
    │   │         (subtree shown above — 2 children)
    │   ├── popup_set_default_selection [UI] (116B)
    │   │     → Sets the default selected item in the popup by ID
    │   │     (subtree shown above — 2 children)
    │   ├── popup_add_button [UI] (360B)
    │   │     → Adds a button to the popup dialog
    │   │     (subtree shown above — 2 children)
    │   ├── popup_add_radio_option [UI] (566B)
    │   │     → Adds a radio button option to the popup dialog
    │   │     (subtree shown above — 2 children)
    │   ├── load_gif_resource [UI] (847B)
    │   │     → Loads a GIF image from a resource
    │   │     (subtree shown above — 6 children)
    │   ├── palette_init [UI] (145B)
    │   │     → Initializes the palette object
    │   │     (subtree shown above — 3 children)
    │   └── unknown (sprite extract with transp + rect params) [UI] (92B)
    │         → Extracts sprite with transparency and explicit x,y,w,h params.
    │         (subtree shown above — 2 children)
    ├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION ***
    │     → Opens the city window for a specific city, handling disorder state
    │     (subtree shown above — 8 children)
    ├── wrap_x [GL] (94B)
    │     → Wraps an X coordinate for a cylindrical (non-flat) map
    ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
    │     → Deletes a unit
    │     (subtree shown above — 7 children)
    ├── is_tile_ocean [GL] (57B)
    │     → Returns true if terrain type == 10 (ocean).
    │     (subtree shown above — 1 children)
    └── get_city_owner_at [GL] (111B)
          → Returns the city-owning civ at a tile, or -1
          (subtree shown above — 3 children)
```

---

## All State-Mutating Functions Reachable from Player Input

Total: 450 functions

| Address | Name | Category | Size | Mutation Summary |
|---------|------|----------|------|-----------------|
| `0049301B` | ai_add_goal_a | AI | 958B | DAT_0064cab4-9 (0x0064 — AI goal A), DAT_006560ff/00656102/104 (0x0065 — unit orders/goto targets) |
| `005369F3` | ai_alert_nearby_units | AI | 470B | Writes DAT_006560ff, DAT_00656102, DAT_00656104 (unit orders/goto targets, 0x0065xxxx) |
| `004BD2A3` | ai_assess_tax_rate | AI | 770B | DAT_00655aee (bit 2 cleared — game flag at 0x0065xxxx). However this is only a bitflag clear, and... |
| `00498E8B` | ai_choose_city_production | AI | 29400B | DAT_0064f344 (0x0064 — city flags, bit 0x10000 for settlers), DAT_006560ff/656102/104 (0x0065 — u... |
| `0055F5A3` | ai_choose_government | AI | 558B | DAT_0064ca7e/80 (AI preference overrides) — game state |
| `0045705E` | ai_evaluate_diplomacy | AI | 6616B | Writes to many DAT_0064b0XX diplomacy evaluation globals AND DAT_0064c6c0 (per-civ treaty flags O... |
| `004C54DA` | ai_find_nearest_city_or_transport | AI | 1297B | **DAT_006560ff**, **DAT_00656102**, **DAT_00656104**, **DAT_0063f660** |
| `00492C15` | ai_remove_goals_near | AI | 259B | DAT_0064cbd8, DAT_0064cbd9 (0x0064 — AI goal B table per civ) |
| `00492D18` | ai_shift_goals_down_a | AI | 184B | DAT_0064cab4/8 (0x0064 — AI goal A table) |
| `00597D6F` | spaceship_ai_evaluate | AI | 1064B | NONE (read-only evaluation). |
| `00598D45` | spaceship_ai_should_start | AI | 583B | NONE (read-only evaluation). |
| `004A2020` | close_text_file | FW | 53B | NONE (file I/O state in 0x0062 range) |
| `0058A0EE` | crash_report_and_exit | FW | 778B | NONE (terminates process) |
| `00436DD7` | init_hall_of_fame_records | FW | 81B | NONE (0x0063 range — UI display data) |
| `00436E28` | load_hall_of_fame | FW | 170B | NONE (0x0063 range) |
| `00498943` | mp_decrypt_passwords | FW | 144B | DAT_00654b74 (0x0065 — password buffer) |
| `004988B8` | mp_encrypt_passwords | FW | 139B | DAT_00654b74 (0x0065 — password buffer, but this is encryption, not game state per se) |
| `0041508C` | open_rules_file | FW | 121B | NONE (DAT_00634810 and DAT_006347c0 are in 0x0063 range but these are file I/O state, not game st... |
| `004A2055` | open_text_file_section | FW | 789B | NONE (file I/O state) |
| `004A2379` | open_text_file_section_fallback | FW | 131B | NONE (path temporarily swapped and restored) |
| `004A24B1` | parse_next_token | FW | 131B | NONE (parser state) |
| `004A23FC` | read_next_line | FW | 171B | NONE (parser state) |
| `00473D5E` | set_save_extension | FW | 247B | Writes DAT_0066c4e8 (0x0066xxxx — extension string, UI config not persistent game state) |
| `00497EA0` | sound_buf_create | FW | 251B | NONE (sound buffer management) |
| `00530EB0` | streambuf_setegptr | FW | 33B | NONE (object member write, not game state) |
| `005D1F50` | timer_start | FW | 157B | NONE (framework state only) |
| `0044CD8D` | unknown (SEH epilogue) | FW | 14B | NONE \| **Detail**: Restores *FS_OFFSET |
| `0044D154` | unknown | **Category**: FW | **State mutations**: NONE | **Detail**: SEH epilogue | FW | 14B | NONE \| **Detail**: SEH epilogue |
| `0058DF14` | (unit_order_automate_settler) | GL | 103B | DAT_006560f4[unit * 0x20] \|= 0x8000 (0x0065XXXX) |
| `0058BDFD` | (unit_order_wait) | GL | 89B | DAT_006560f4[unit * 0x20] \|= 0x4000 (unit status flags at 0x0065XXXX) |
| `00456F20` | adjust_attitude | GL | 107B | **DAT_0064b114** (diplomacy attitude, 0x0064XXXX range — per-civ data) |
| `004EA031` | adjust_happy_unhappy | GL | 453B | DAT_006a659c, DAT_006a65a8, DAT_006a6550, DAT_006a6620-006a6628 (0x006A range — happiness calcula... |
| `00460129` | ai_diplomacy_negotiate | GL | 16263B | Extensive game state writes:
- DAT_0064c6c0 (treaty flags, 0x0064 range) — sets/clears war, peace... |
| `0055C69D` | ai_revolution_notification | GL | 1336B | DAT_0064c6a0, DAT_0064c6b4 — game state |
| `0055D1E2` | ai_tech_exchange | GL | 1182B | Tech data via thunk_FUN_004bf05b, treaty flags (0x40000 tech exchange marker) via thunk_FUN_00467825 |
| `004E8F42` | assign_worker_tiles | GL | 2002B | DAT_006a65dc, DAT_006a654c (specialist counts), DAT_006a65c8 (accumulated yields), DAT_0064f344 (... |
| `0040BDAC` | balance_tax_rates | GL | 293B | NONE (writes through parameter pointers, not global addresses) |
| `005B9EC6` | begin_map_batch | GL | 86B | DAT_006d1190 batch buffer (0x006DXXXX), DAT_006365f4, DAT_006ad699, DAT_006ad69a |
| `004E7967` | calc_capital_distance_and_corruption | GL | 1048B | DAT_006a6588, DAT_006a6600, DAT_006a6574, DAT_006a6530 (0x006A range — city calc globals) |
| `004E9C14` | calc_city_production | GL | 1053B | Multiple DAT_006a6xxx globals (0x006A range — production calculation state) |
| `004EB4ED` | calc_city_production (entry point) | GL | 132B | DAT_0062ee08 (stores city index), plus all sub-function mutations |
| `0043D400` | calc_city_trade_desirability | GL | 8227B | DAT_0064f37b-DAT_0064f37f[param_1 * 0x58 + ...] — city trade commodity assignments (0x0064 range,... |
| `00579DBB` | calc_city_value_for_capture | GL | 277B | NONE (read-only calculation). |
| `004E989A` | calc_corruption | GL | 890B | DAT_0064ca74-0064ca7a (0x0064 range — per-civ corruption statistics, only when DAT_0062edf8 flag ... |
| `004E7EB1` | calc_food_box_size | GL | 512B | DAT_006a6608, DAT_006a6560 (0x006A range — food box globals) |
| `004EA8E4` | calc_happiness | GL | 2627B | Multiple DAT_006a6xxx globals and DAT_0064f35e, DAT_0064f38a-0064f393 (city record fields) |
| `004AD0D1` | calc_path_distance | GL | 318B | DAT_0062d03c, DAT_0062d044, DAT_00673fa0/a4 (pathfinding setup state, 0x0062/0x0067 range) |
| `004E80B1` | calc_shields_per_row | GL | 1497B | Multiple DAT_006a6xxx globals (0x006A range — production calculation state), DAT_006560f4 (0x0065... |
| `0057E6E2` | calc_stack_best_defender | GL | 786B | Writes to DAT_006acb30, DAT_006acb08 (combat scratch — 0x006A range). |
| `004E8E4D` | calc_tile_all_resources | GL | 130B | DAT_0062edf4, DAT_006a65b8 (per-tile yields), DAT_006a65c8 (accumulated totals) — 0x006A range |
| `004E868F` | calc_tile_resource | GL | 1528B | DAT_006a65d4, DAT_0062ee0c, DAT_006a65e0, DAT_006a65e8 (auto-improvement triggers), DAT_0064ca76-... |
| `004EB327` | calc_trade_route_income | GL | 378B | DAT_006a65b0, DAT_006a6558, DAT_006a6570, DAT_006a65c8 (0x006A range) |
| `0057E33A` | calc_unit_defense_strength | GL | 931B | YES — writes to DAT_006acb30 (terrain type cache), DAT_006acb08 (city index cache), DAT_006acb34 ... |
| `004ADAFC` | calc_unit_goto_direction | GL | 2516B | DAT_006560ff (unit order byte, 0x0065 range — cleared when unit is stuck), DAT_006560f4 (unit fla... |
| `0057E2C3` | calc_unit_hit_points | GL | 119B | NONE (read-only calculation). |
| `0055BBC0` | calc_war_readiness | GL | 820B | DAT_006ab5e4/e0/e8/ec (war readiness counters), DAT_006560f4 (unit fortification flag bit 0x20 se... |
| `00484FEC` | calc_year_from_turn | GL | 540B | NONE (pure calculation) |
| `004273E6` | cancel_goto_for_stack | GL | 192B | Writes to unit order bytes at 0x0065XXXX:
- (&DAT_006560ff)[param_1 * 0x20] = 0xff for matching u... |
| `0042738C` | cancel_goto_if_blocked | GL | 90B | Writes to DAT_006560ff at 0x0065XXXX (unit data):
- (&DAT_006560ff)[param_1 * 0x20] = 0xff |
| `00556F54` | cheat_edit_civ | GL | 3764B | Extensive writes to per-civ data at 0x0064xxxx and 0x0065xxxx ranges — all game state. |
| `005582AD` | cheat_edit_scenario | GL | 1648B | Extensive writes to scenario config (0x0064-0x0065 ranges), map tile visibility, city visibility ... |
| `00554460` | cheat_toggle_all_tech | GL | 371B | DAT_0064c6b1 (tech flag), DAT_0064c6f8 (tech bitmask), DAT_0064c6b0 (tech count), DAT_00655b82 (g... |
| `005B4C63` | check_adjacent_enemy_continent | GL | 297B | DAT_006ced4c (0x006CXXXX) |
| `005B4B66` | check_adjacent_enemy_simple | GL | 253B | DAT_006ced4c (0x006CXXXX) |
| `0055D685` | check_join_war | GL | 595B | DAT_0064ca82 (last contact dates), treaty flags via thunk_FUN_00467825 (0x2000 = war declaration) |
| `00488A45` | check_trade_route_path | GL | 682B | DAT_0063f660 (0x0063 — trade route distance), DAT_0062d040-0062d048 (pathfinding scratch — 0x0062... |
| `004E7D7F` | check_unit_support | GL | 281B | DAT_006a660c (unit counter), DAT_006a6568 (support cost counter) — 0x006A range |
| `005B4D8C` | check_zoc_if_no_city | GL | 86B | DAT_006ced4c (0x006CXXXX) |
| `005B49CF` | check_zoc_violation | GL | 407B | DAT_006ced4c (0x006CXXXX — pathfinding scratch) |
| `0043CC00` | city_set_specialist_slot | GL | 126B | DAT_0064f34c[param_1 * 0x58] \|= (1 << param_2) — city specialist bitfield (0x0064 range); DAT_006... |
| `0043F7A7` | city_update_tile_workers | GL | 265B | Map tile data via thunk_FUN_005b98b7 and thunk_FUN_005b9c49 (map tile data, 0x006A range via indi... |
| `0058FDA9` | claim_adjacent_ocean_tiles | GL | 306B | Via thunk_FUN_004272d0 — modifies tile owner data (0x006AXXXX map data) |
| `004E8ECF` | clear_and_check_worked_tiles | GL | 115B | DAT_0064f370 (via set_tile_worked) — 0x0064 range |
| `00484D3B` | clear_game_active_flag | GL | 23B | NONE (DAT_00628044 is at 0x0062 — framework/UI state) |
| `005B48B1` | clear_stack_visibility | GL | 88B | DAT_006560f9 for each unit (0x0065XXXX) |
| `00467750` | clear_treaty_flags | GL | 213B | DAT_0064c6c0 + civ offsets (0x0064 range — per-civ treaty data) |
| `005B488A` | clear_unit_visibility | GL | 39B | DAT_006560f9 (0x0065XXXX) |
| `004151E0` | copy_tech_data_to_editor | GL | 295B | DAT_006a1d88 and DAT_006a2d28 arrays written (0x006A range — editor state) |
| `005B3D06` | create_unit | GL | 1675B | - DAT_00655b16: incremented if new slot needed (0x0065XXXX)
- DAT_0064c706[civ]: military unit co... |
| `005B47FA` | delete_all_units_in_stack | GL | 144B | Via delete_unit for each |
| `005B4391` | delete_unit | GL | 1129B | - DAT_0065610a[unit]: set to 0 (0x0065XXXX)
- DAT_00655b16: decremented (0x0065XXXX)
- DAT_0064c7... |
| `005B5D93` | delete_unit_safely | GL | 677B | Via delete_unit, delete_all_units_in_stack, load_unit_onto_ship |
| `005B6042` | delete_unit_visible | GL | 456B | Via delete_unit_safely |
| `004B0A41` | diff_engine_copy_sections | GL | 143B | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine scan pointers in 0x0067 range. |
| `004B0AD0` | diff_engine_invert_mirror | GL | 131B | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine state in 0x0067 range. |
| `004B0B53` | diff_engine_scan_and_send | GL | 1883B | Writes to DAT_0067a series (diff engine metadata, 0x0067xxxx range) and DAT_00655afe/00655b00 etc... |
| `004B1C11` | diff_engine_serialize_changed_only | GL | 466B | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B1A15` | diff_engine_serialize_full_compressed | GL | 508B | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B153C` | diff_engine_serialize_game | GL | 835B | Writes checksum values in DAT_0067a434/4c4/464/44c/4f4/524/644 (all 0x0067 range diff engine meta... |
| `004B18E1` | diff_engine_serialize_partial | GL | 308B | DAT_0067a434, DAT_0067a53c — checksum values in 0x0067 range. |
| `0045A8E3` | diplo_activate_alliance_wars | GL | 910B | **DAT_0064c6c0** (sets flags 0x80800 = war+mobilization for allies), **DAT_0064ca82** (war timest... |
| `0045AC71` | diplo_declare_war | GL | 1125B | Multiple writes to **DAT_0064c6XX** per-civ data: treaty flags, betrayal counters, war counters, ... |
| `0045A535` | diplo_form_alliance | GL | 374B | **DAT_0064c6a0** (status flag 0x100), **DAT_0064c6bf** (patience reset), **DAT_0064ca82** (allian... |
| `0045918E` | diplo_reset_state | GL | 61B | Writes to DAT_00626aXX which are diplomacy UI state — borderline but treated as UI state since th... |
| `0045A7A8` | diplo_sign_ceasefire | GL | 315B | **DAT_0064c6c0** (per-civ treaty flags: flag 0x800 cleared for all civs against param_1), **DAT_0... |
| `0045A6AB` | diplo_sign_peace_treaty | GL | 253B | **DAT_0064c6bf**, **DAT_0064ca82**, and attitude clamped via thunk_FUN_00467933 |
| `00579ED0` | diplomacy_check_attack_allowed | GL | 933B | NONE (displays dialogs, does not modify state). |
| `00579C40` | diplomacy_check_treaty_violation | GL | 379B | YES — writes to DAT_0064c6c0 + offsets (0x0064 range, per-civ treaty flags). Sets 0x2000 flag via... |
| `0057A27A` | diplomacy_steal_tech | GL | 999B | YES — calls thunk_FUN_004bf05b which transfers technology (writes to tech arrays in 0x0064 range)... |
| `004EA1F6` | distribute_trade | GL | 1769B | DAT_006a65fc (luxury), DAT_006a6578 (tax), DAT_006a6554 (science), DAT_006a6618 (trade route bonu... |
| `005B3B78` | eject_air_units | GL | 343B | Via relocate_unit |
| `005B9F1C` | end_map_batch | GL | 194B | DAT_006d1190 batch buffer cleared (0x006DXXXX) |
| `00440453` | establish_trade_route | GL | 765B | Modifies city trade route arrays at 0x0064XXXX via set_trade_route |
| `004E7641` | evaluate_city_tiles | GL | 653B | DAT_006a6530 (0x006A range — tile evaluation array), DAT_00655b10 (incremented for pollution trac... |
| `004FA944` | event_action_change_money | GL | 364B | Writes DAT_0064c6a2 + civ * 0x594 (civ treasury, 0x0064XXXX) |
| `004FB5B2` | event_action_change_terrain | GL | 1114B | Extensive writes to map tile data (0x006AXXXX), city data (0x0064XXXX), unit data (0x0065XXXX), D... |
| `004FAED4` | event_action_create_unit | GL | 941B | Writes DAT_006560f4, DAT_00656100 (unit data, 0x0065XXXX) |
| `004FAD02` | event_action_destroy_civ | GL | 249B | Writes DAT_0064b1ac (game end flag, 0x0064XXXX) |
| `004FA82D` | event_action_flag_no_schism | GL | 39B | DAT_006a9110 (0x006AXXXX game state) |
| `004FADFB` | event_action_give_tech | GL | 217B | Indirect via thunk_FUN_004bf05b which writes to tech tables (0x0065XXXX) |
| `004FABA6` | event_action_make_aggression | GL | 348B | Indirect via thunk_FUN_00579c40 which modifies treaty/diplomacy state |
| `004FB29F` | event_action_move_unit | GL | 787B | Writes DAT_006560ff, DAT_006560fc, DAT_00656102, DAT_00656104 (unit data, 0x0065XXXX) |
| `004FC2BB` | event_check_city_taken | GL | 243B | Indirect via dispatch_actions |
| `004FBE84` | event_check_negotiation | GL | 900B | Indirect via dispatch_actions |
| `004FC20D` | event_check_no_schism | GL | 169B | Indirect via dispatch_actions |
| `004FBD9D` | event_check_unit_killed | GL | 231B | Indirect via dispatch_actions |
| `004FC3AE` | event_dispatch_actions | GL | 360B | Indirect via all called action functions |
| `004CA1CD` | execute_airlift | GL | 460B | **DAT_0064f344** (city flags OR'd with 0x10000 = airlift used), unit position changed, unit poten... |
| `004C66BA` | execute_civil_war | GL | 1339B | Map visibility modified, units transferred between civs (DAT_006560f7 changed), unit counters mod... |
| `004CA39E` | execute_paradrop | GL | 2572B | Unit position changed, flags modified, possible combat triggered (via thunk_FUN_0057b5df) |
| `004C42A0` | execute_worker_order | GL | 2035B | **DAT_006560fd** (unit work counter), **DAT_006560ff** (order byte), **DAT_0062804c**, **DAT_0065... |
| `0057A685` | find_most_central_city | GL | 356B | NONE (read-only). |
| `0043D07A` | find_nearest_city | GL | 400B | NONE (DAT_0063f660 is temporary scratch) |
| `004AD822` | find_nearest_road_tile | GL | 730B | DAT_00673fa0/a4 (output coordinates, 0x0067 range) |
| `005B67AF` | find_nearest_unit | GL | 233B | DAT_006ced50 (0x006CXXXX — pathfinding scratch) |
| `005B6512` | find_next_unit_needing_orders | GL | 629B | DAT_006560f4: bit 0x4000 (wait flag) cleared during rescan passes (0x0065XXXX) |
| `004ABFE5` | find_path | GL | 4118B | - DAT_006ced60 (0x006C range — BFS scratch buffer, 0x2400 bytes)
- DAT_00673fc0-DAT_00673fbc (0x0... |
| `004AD20F` | find_road_path | GL | 1392B | DAT_006365e8 area (BFS visited map, 0x0063 range), DAT_00673f globals, DAT_0062d04c |
| `005B9179` | generate_terrain_around | GL | 696B | - Tile bytes 1 (improvements): fortress cleared, roads/irrigation/mining randomly cleared (0x006A... |
| `005B29D7` | get_unit_hp_remaining | GL | 98B | DAT_006560fa[param_1 * 0x20] = 0 when hitpoint flag not set (0x0065XXXX) |
| `0057B5DF` | handle_city_capture | GL | 11451B | YES — extensive writes across 0x0064 and 0x0065 ranges including: city owner, city size, city fla... |
| `0057A904` | handle_civil_war | GL | 3291B | YES — massive state mutations across 0x0064-0x0065 range: creates new civ, splits treasury, trans... |
| `004EC312` | handle_espionage_discovery | GL | 236B | DAT_0064c6a0 (civ flags), DAT_0064c6be (defense rating), DAT_0064c6c0 (diplomatic relations) — al... |
| `0057F9E3` | handle_nuke_attack | GL | 1236B | YES — writes DAT_0064c6c0 (treaty flags in 0x0064 range): sets 0x110 (nuclear aggressor) and 0x20... |
| `0040E3B1` | handle_revolution | GL | 397B | Via sub-calls:
- thunk_FUN_0046e020(0x3e, 1, 0, 0): triggers revolution event — GAME STATE
- thun... |
| `0057EB94` | handle_stack_wipe | GL | 105B | YES — DAT_006acb0c zeroed, then multiple units destroyed via handle_unit_kill. |
| `004BF05B` | handle_tech_discovery | GL | 3391B | Extensive writes to game state in 0x0064-0x0065 range:
- DAT_0064c6f8[civ*0x594 + byte] \|= bit (t... |
| `004BEA84` | handle_tech_government_effects | GL | 973B | Indirectly triggers thunk_FUN_0055c066 (revolution) which modifies DAT_0064c6b5 (government type ... |
| `0057E9F9` | handle_unit_kill | GL | 411B | YES — DAT_0064c7b6 (0x0064 range, per-civ kill counters) incremented. DAT_006acb0c (0x006A, comba... |
| `0057EBFD` | handle_unit_promotion | GL | 322B | YES — writes DAT_006560f4 + param_1 * 0x20 (0x0065 range, unit flags). Sets bit 0x2000 (veteran s... |
| `004E7492` | init_city_production_globals | GL | 77B | DAT_006a65a4, DAT_006a6528 (0x006A range — production calculation globals) |
| `004E1763` | kill_or_retire_civ | GL | 2918B | Extensive writes across 0x0064 (per-civ data), 0x0065 (unit/city data, game flags), 0x0066 (playe... |
| `004D01AE` | load_civ_power_values | GL | 90B | DAT_006a5b10 (0x006A range — map/game state area) — writes 6 int values from per-civ data at DAT_... |
| `005B542E` | load_unit_onto_ship | GL | 1912B | - DAT_006560f4: flag bits 0x1000 set/cleared (0x0065XXXX)
- DAT_006560ff: orders changed to goto ... |
| `0059062C` | move_unit | GL | 17963B | YES — massive state mutations across 0x0063-0x006C range. Key writes include: unit flags (DAT_006... |
| `005B389F` | move_unit_to_bottom | GL | 577B | DAT_00656106/00656108 linked list reordering (0x0065XXXX) |
| `00498310` | mp_check_password_or_set | GL | 90B | Indirect via thunk_FUN_0049836a |
| `00594D42` | mp_lock_map | GL | 971B | YES — writes to DAT_0064ba48-5c (0x0064 range, per-player lock data), DAT_006ad8cc (0x006A, lock ... |
| `0059511C` | mp_unlock_map | GL | 324B | YES — writes to DAT_006ad8d0 (0x006A, unlock state), DAT_0064ba48 (0x0064, lock data cleared via ... |
| `0049882B` | mp_update_password_flags | GL | 141B | DAT_00673d18, DAT_00673d38 (0x0067 — password flags) |
| `0046B0A1` | net_broadcast | GL | 124B | DAT_00628468 (network sequence) |
| `0046D5A0` | net_msg_init_header | GL | 55B | NONE (initializes local buffer) |
| `0046D5F0` | net_msg_init_with_name | GL | 141B | NONE (initializes local buffer) |
| `0046B14D` | net_send_message | GL | 6649B | - DAT_006c9088, DAT_006c9078, DAT_006c907c (0x006C range — network counters)
- DAT_00654fb0 (0x00... |
| `0046AF70` | net_send_to_player | GL | 305B | DAT_00628468 (sequence counter in 0x0062 range — not game state but network state) |
| `0059C0E1` | netmgr_build_packet | GL | 405B | NONE (constructs packet in memory). |
| `0059C31F` | netmgr_fill_game_info | GL | 598B | NONE (fills output buffer). |
| `00472F7B` | pack_viewport_state | GL | 233B | Writes DAT_0066c600-DAT_0066c662 (0x0066xxxx — unit type tables range, but these are viewport/sav... |
| `004DB690` | parley_build_packet | GL | 990B | DAT_0068abd0, DAT_0068abd4 (0x0068 range — diplomacy scratch data) |
| `004DBAB4` | parley_serialize_offer | GL | 1024B | NONE (writes to allocated buffer, not global state) |
| `00419D23` | parse_cosmic_parameters | GL | 432B | DAT_0064bcc8-DAT_0064bcdd written (0x0064 range — per-civ/cosmic data) |
| `004C9528` | pick_up_unit_004c9528 | GL | 2453B | **DAT_0064c6a2** (gold deducted), **DAT_0064c778** (unit counts per civ), **DAT_0064c6bc** (spy c... |
| `005B319E` | pick_up_unit_005b319e | GL | 705B | - DAT_006560f0/f2: unit position set to negative offscreen coords (0x0065XXXX)
- DAT_00656106/006... |
| `00440750` | process_caravan_arrival | GL | 3144B | Writes DAT_0064c6a2 (civ treasury, 0x0064XXXX), DAT_0064c6a8 (civ trade income counter), DAT_0064... |
| `0055D8D8` | process_diplomatic_contact | GL | 7326B | Extensive treaty/diplomacy state writes across 0x0064/0x0065/0x0063/0x0067 ranges. |
| `0058F040` | process_goody_hut | GL | 3404B | - DAT_0064c6a2[civ * 0x594]: gold increased (case 2) (0x0064XXXX)
- DAT_00656100[new_unit * 0x20]... |
| `004274A6` | process_unit_move_visibility | GL | 4250B | Extensive writes to game state:
- DAT_006560f9 (unit visibility bits at 0x0065XXXX)
- DAT_006560f... |
| `005B345F` | put_down_unit | GL | 640B | - DAT_006560f0/f2: position set (0x0065XXXX)
- DAT_00656106/00656108: linked to existing stack (0... |
| `005B9FDE` | queue_map_update | GL | 515B | DAT_006d1190 batch buffer (0x006DXXXX) |
| `00419CBB` | read_cosmic_param_clamped | GL | 57B | NONE (just reads and returns) |
| `00442541` | reassign_all_city_production | GL | 254B | Indirect via change_city_production calls |
| `004EB4A1` | recalc_city_all | GL | 76B | All sub-function mutations (see above) |
| `00467BAF` | recall_units_from_territory | GL | 835B | DAT_0064b1b4, DAT_0064b1b0 (viewport position, 0x0064 range), DAT_006560ff (unit order byte, 0x00... |
| `0059C575` | record_combat_kill | GL | 762B | YES — writes to DAT_006af2a0 (combat log, 0x006A range), DAT_006af280/260/220 (ring buffer pointe... |
| `005B6787` | refresh_unit_movement | GL | 40B | DAT_006560f8 (0x0065XXXX) |
| `005B3AE0` | relocate_all_units | GL | 152B | Via relocate_unit for each unit (0x0065XXXX, 0x006AXXXX) |
| `005B36DF` | relocate_unit | GL | 388B | Via pick_up_unit + put_down_unit (0x0065XXXX, 0x006AXXXX) |
| `00440325` | remove_trade_route | GL | 199B | Writes to DAT_0064f37a (city trade route count, 0x0064XXXX), DAT_0064f384 (trade route partner ID... |
| `004A74BC` | reset_spaceship | GL | 187B | DAT_0064caa0-DAT_0064cab4 + param_1*0x594 (0x0064 range — per-civ spaceship data) |
| `00580341` | resolve_combat | GL | 15052B | - DAT_006560fa[attacker/defender * 0x20]: damage accumulation during combat rounds
- DAT_006560f8... |
| `005B90DF` | reveal_tile | GL | 154B | - Tile byte 1: bit 0x80 set (pollution) (0x006AXXXX)
- DAT_00655b12: incremented (0x0065XXXX) |
| `004272D0` | reveal_tile_for_civ | GL | 188B | Modifies map tile visibility data (0x006AXXXX range via called functions):
- thunk_FUN_005b976d: ... |
| `0059A733` | rng_next_float | GL | 94B | YES — writes DAT_00635094 (RNG state, 0x0063 range). |
| `0059A791` | rng_range | GL | 113B | YES — indirectly via rng_next_float modifying DAT_00635094. |
| `004A73D9` | save_civ2_dat | GL | 212B | NONE (file I/O only) |
| `005B8635` | save_map_data | GL | 309B | NONE (file I/O only) |
| `0041E8FB` | scenario_player_selection | GL | 1483B | DAT_006d1da0, DAT_00655b0b/03/05, DAT_00655aea, DAT_006554fc, DAT_0064c6a0, DAT_0064bcfa (0x0064,... |
| `0057FEBC` | scramble_defenders_to_tile | GL | 1084B | YES — writes to DAT_006560ff (unit orders, 0x0065), DAT_00656102/04 (goto destination), DAT_00656... |
| `00467933` | set_attitude_value | GL | 120B | DAT_0064c6e0 + civ offsets (0x0064 range — attitude table) |
| `0043D289` | set_building | GL | 186B | DAT_0064f374[param_1 * 0x58 + offset] — city building data (0x0064 range) |
| `005B9D81` | set_civ_tile_data | GL | 325B | Civ visibility data (0x006365c0 array, points into allocated map memory) |
| `0055C066` | set_government_type | GL | 529B | DAT_0064c6b5, DAT_0064c6c0 (embassy flags), DAT_00655aee, DAT_0064f379 — all game state |
| `004C4210` | set_paradrop_range | GL | 31B | **DAT_0063cc30** + param_1*4 = (uint)param_2 |
| `004AD076` | set_path_cost | GL | 91B | BFS grid in 0x006C range (pathfinding scratch buffer) |
| `005B496E` | set_stack_seen_by | GL | 92B | DAT_006560f9 for each unit (0x0065XXXX) |
| `005B4EE2` | set_stack_visibility_mask | GL | 90B | DAT_006560f9 (0x0065XXXX) |
| `005B9C49` | set_tile_city_radius_owner | GL | 312B | Tile byte 2 (0x006AXXXX) |
| `005B98B7` | set_tile_fertility | GL | 305B | Tile byte 5 lower nibble (0x006AXXXX) |
| `005B94FC` | set_tile_improvement_bits | GL | 330B | Tile byte 1 (0x006AXXXX via tile pointer) |
| `005B99E8` | set_tile_owner | GL | 333B | Tile byte 5 upper nibble (0x006AXXXX) |
| `005B9646` | set_tile_terrain | GL | 295B | Tile byte 0 (0x006AXXXX) |
| `005B976D` | set_tile_visibility_bits | GL | 330B | Tile byte 4 (0x006AXXXX) |
| `004403EC` | set_trade_route | GL | 103B | Writes to DAT_0064f384 (trade partner ID, 0x0064XXXX), DAT_0064f381 (commodity byte), DAT_0064f34... |
| `00467825` | set_treaty_flags | GL | 223B | DAT_0064c6c0 + civ offsets (0x0064 range) |
| `005B2F50` | set_unit_goto_order | GL | 66B | DAT_006560ff, DAT_00656102 (0x0065XXXX) |
| `005B490E` | set_unit_seen_by | GL | 96B | DAT_006560f9 (0x0065XXXX) |
| `004E7549` | set_worker_tile_status | GL | 93B | DAT_0064f356 + param_1 * 0x58 (0x0064 range — city data) |
| `00596B00` | spaceship_get_max_component | GL | 264B | NONE (read-only). |
| `005973FD` | spaceship_launch (internal — called after all checks pass) | GL | 815B | YES — writes to DAT_0064caa0 (0x0064, spaceship flags), DAT_00655afc (0x0065, launch turn), DAT_0... |
| `00596EEC` | spaceship_recalc_stats | GL | 1297B | YES — writes to DAT_0064caa0 (spaceship flags, 0x0064), DAT_0064caa2/a4/a6 (arrival/support data)... |
| `004C64AA` | spy_caught_check | GL | 163B | Delegates to FUN_004c5fae |
| `004C5FAE` | spy_diplomat_action | GL | 1271B | **DAT_006560f8** (movement used), **DAT_006560f4** (flags), unit potentially killed (thunk_FUN_00... |
| `004C9EBD` | spy_sabotage_unit | GL | 784B | **DAT_006560fa** (unit damage), unit potentially destroyed via thunk_FUN_0057ed3f |
| `005B5BAB` | stack_unit | GL | 488B | Via load_unit_onto_ship and relocate_unit |
| `004E97AE` | sync_worker_tile_status | GL | 155B | DAT_0064f356 (0x0064 range — worker tile status) |
| `004E1314` | toggle_unit_movement_doubling | GL | 318B | DAT_00628068 (0x0062 range), DAT_0064b1c2 (0x0064 range — unit type movement points, multiplied o... |
| `0057A7E9` | transfer_city_ownership | GL | 283B | YES — writes to DAT_0064c708, DAT_0064c70c, DAT_0064f348 (all in 0x0064 range, per-civ and city d... |
| `0058BD60` | unit_order_activate | GL | 36B | Via move_unit |
| `004C4D1E` | unit_order_found_city | GL | 335B | Creates a new city (thunk_create_city), modifies map tile data (clears improvement bits 0x7c), de... |
| `004C4E6D` | unit_order_goto | GL | 611B | **DAT_006560ff** (order byte), **DAT_006560f4** (unit flags), **DAT_006560fd** (work counter), **... |
| `0058CDE5` | unit_order_unload | GL | 488B | Via set_unit_goto_order — sets unit order and goto target |
| `0058BD84` | unit_order_wake_all_own | GL | 121B | Via refresh_unit_movement — writes DAT_006560f8[unit * 0x20] |
| `004C50D0` | unit_pillage | GL | 824B | Map tile improvements cleared, possible war declaration (DAT_0064c6c0 flag 0x2000) |
| `00467580` | unknown (set trade route value) | GL | 29B | DAT_0063cc30 + param_1*4 (0x0063 range — trade route data) |
| `005B8B1A` | update_civ_visibility | GL | 75B | Civ visibility data at 0x006365c0[civ] (via set_civ_tile_data) |
| `004BE6BA` | upgrade_units_for_tech | GL | 970B | DAT_006560f6[unit_index * 0x20] (unit type ID at 0x0065xxxx), DAT_006560f4[unit_index * 0x20] (un... |
| `005B2590` | validate_unit_stack | GL | 1050B | - DAT_00656106/00656108 (unit prev/next pointers): may be set to 0xffff to fix broken stacks (0x0... |
| `004BEE56` | we_love_the_king_day | GL | 379B | NONE (display only — actual celebration logic is elsewhere) |
| `004741BE` | write_save_file | GL | 4499B | Writes to DAT_00655b04, DAT_00655af0, DAT_00655b82, DAT_00655b1e, DAT_0064c6a0, DAT_00655b03 (all... |
| `0058DDCE` | (unit_order_unload_transport) | MIXED | 326B | - DAT_006560f4[ship * 0x20] \|= 0x4000 (0x0065XXXX)
- DAT_006560ff[carried_unit * 0x20] = 0xff (wa... |
| `00489A0D` | activate_current_unit | MIXED | 398B | DAT_0064b1b4/b0 (0x0064 — viewport), DAT_00673b04 (0x0067 — flag) |
| `00467EF2` | break_alliance | MIXED | 632B | DAT_0064c6c0 (treaty flags, 0x0064 range — via thunk_FUN_00467750) |
| `00441B11` | change_city_production | MIXED | 2572B | Writes DAT_0064c7f4 (per-civ building production counts, 0x0064XXXX), DAT_0064f379 (city producti... |
| `005545D3` | cheat_edit_tech | MIXED | 870B | DAT_0062804c (UI flag), DAT_0064c6f8, DAT_0064c6b0, DAT_00655b82 (per-civ tech data) |
| `0055499F` | cheat_edit_terrain | MIXED | 2032B | Map tile data writes (0x006A range via thunk_FUN_005b8931 pointer), DAT_00633678, DAT_00631ed8, D... |
| `0055625B` | cheat_edit_unit | MIXED | 1892B | Unit data at 0x0065-0x0066 range: flags (DAT_006560f4), HP (DAT_006560fa), home city (DAT_0065610... |
| `005551B3` | cheat_place_unit | MIXED | 1059B | Unit creation via thunk_FUN_005b3d06, DAT_006560f4 (unit flags at 0x0065), various cheat UI state... |
| `005866D3` | cosmic_editor_save_restore | MIXED | 769B | - DAT_0064bcc8 through DAT_0064bcdd (0x0064XXXX range): All 22 cosmic parameters are overwritten ... |
| `00458DF9` | diplo_ai_emissary | MIXED | 880B | **DAT_00626a30** (diplomacy session active flag), **DAT_00626a34** (diplomacy result) |
| `0045B4DA` | diplo_ai_negotiate | MIXED | 10271B | Extensive writes to per-civ data (DAT_0064c6XX range): gold transfers, treaty flags, patience cou... |
| `0045B0D6` | diplo_demand_ally_help | MIXED | 919B | **DAT_0064c6a2** (gold transferred between civs) |
| `0045DD7F` | diplo_favor_menu | MIXED | 4878B | Multiple game state writes: treaty flags, gold, map visibility, unit visibility flags. |
| `00458AB1` | diplo_show_greeting | MIXED | 804B | **DAT_0064c6c0** write: `*(DAT_0064c6c0 + param_2*4 + param_1*0x594) \|= 0x100` (marks nuclear awa... |
| `0055B2C6` | end_turn_prompt | MIXED | 258B | DAT_0066c988 (turn-end state), DAT_0064b9bc |
| `00511880` | enqueue_mp_event | MIXED | 398B | NONE (no writes to 0x0063-0x006C game state range; DAT_0063cc48/DAT_0063cc30 are temp text buffers) |
| `0054F3B9` | events_editor_init | MIXED | 3035B | DAT_006a1d7c = 1 (editor active flag), DAT_006a4f88 = dialog pointer, DAT_006a1d80 incremented (c... |
| `0051EA8E` | game_timer_dialog | MIXED | 1579B | - DAT_00654b70 (0x0065XXXX): Turn timer in milliseconds (0, 30000, 60000, 120000, 180000, 300000,... |
| `0058FEDB` | handle_caravan_arrival | MIXED | 1831B | - DAT_0064f35c[city * 0x58]: production shields increased by unit_cost * cosmic_multiplier (0x006... |
| `00509590` | handle_city_disorder_00509590 | MIXED | 933B | Writes DAT_00655aee (game flags, 0x0065XXXX), DAT_00655af4 (tutorial flags, 0x0065XXXX) |
| `004E22C9` | handle_quit_or_retire | MIXED | 718B | DAT_00628054, DAT_0064b9bc, DAT_006ad685 (0x0062, 0x0064, 0x006A ranges) |
| `00411BF5` | handle_unit_keypress | MIXED | 764B | NONE directly (all order functions are thunked, state changes happen inside them) |
| `004E02EF` | init_city_windows_layout | MIXED | 926B | DAT_0067a8d4, DAT_0067a8c4, DAT_0067a8c8 (0x0067 range — score/display data); DAT_0068ad14, DAT_0... |
| `004E068D` | load_game_handler | MIXED | 1023B | DAT_00654fa4, DAT_00628048, DAT_00655b02, DAT_00655b0b, DAT_006d1da8 (0x0065, 0x0062, 0x006D rang... |
| `004E2803` | main_menu_command_dispatch | MIXED | 4219B | DAT_0066ca8c (zoom level), DAT_00655aea (options flag), DAT_006c31ac-b4 (deferred command) |
| `00411F91` | map_ascii | MIXED | 1203B | - DAT_0066ca8c (0x0066 range — zoom level)
- DAT_0066ca88, DAT_0066ca8a (0x0066 range — zoom cent... |
| `00411705` | map_double_click | MIXED | 767B | - DAT_006c31ac, DAT_006c31b0-DAT_006c31cc (0x006C range — queued event) |
| `004125C6` | map_key | MIXED | 2451B | - DAT_00655aea bit 0x20 toggled (0x0065 range — grid display flag)
- DAT_0064bc1e (0x0064 range —... |
| `00410F77` | map_window_click | MIXED | 1866B | - DAT_00656102/DAT_00656104 + offset (0x0065 range — unit goto destination X/Y)
- DAT_006560ff + ... |
| `00523F02` | mp_choose_additional_player | MIXED | 1976B | Writes to game state:
- DAT_00655b0b (human player mask at 0x0065XXXX)
- DAT_006d1da0 (current pl... |
| `00498A5C` | mp_handle_player_turn | MIXED | 192B | DAT_00628044 (game active flag), DAT_00673d18 (0x0067 — password flags) |
| `00522B2B` | mp_join_game_handler | MIXED | 683B | Writes to game state (but restores originals):
- DAT_006c31a9 = DAT_00655b0b (permanently updates... |
| `0049836A` | mp_set_password | MIXED | 614B | DAT_00654b74 (0x0065 — password data), DAT_00673d18 (0x0067 — password flags) |
| `0047E94E` | network_poll | MIXED | 14034B | MASSIVE — writes to virtually every game state address across 0x0063-0x006C. Key writes include:
... |
| `0040CD64` | open_tax_rate_dialog | MIXED | 4140B | - DAT_0063cbb4: dialog state pointer (0x0063 range)
- DAT_0063cbb0: dialog active flag
- DAT_0062... |
| `004B76D5` | parleywin_close | MIXED | 432B | DAT_006c91e4 (set to 0, negotiation flag at 0x006Cxxxx), DAT_00626a2c (UI state). |
| `004B7EB6` | parleywin_start_session | MIXED | 807B | DAT_006ad6a0, DAT_006ad69c (chat message counters at 0x006Axxxx), DAT_0067a9b0, DAT_0067a994 (neg... |
| `0055B046` | resume_turn_timer | MIXED | 181B | DAT_00633a74 (timer handle) |
| `0055C3D3` | revolution_dialog | MIXED | 678B | Via thunk_FUN_0055c066 (government change). DAT_00655af4 \|= 0x20 (tutorial flag). |
| `00489859` | select_next_unit | MIXED | 436B | DAT_00655afe (0x0065 — current unit index), DAT_0064b1b4/b0 (0x0064 — viewport center) |
| `004E0AB0` | show_game_options_dialog | MIXED | 705B | DAT_00655aea (0x0065 range — game flags), DAT_0064bc1e (0x0064 range — saved options copy) |
| `004E0D71` | show_graphic_options_dialog | MIXED | 423B | DAT_00655aea (bits 0x20000-0x200000), DAT_0064bc1e |
| `004E1452` | show_message_options_dialog | MIXED | 785B | DAT_00655af2 (0x0065 range — message flags), DAT_0064bc22 (0x0064 range — saved copy) |
| `004E0F18` | show_multiplayer_options_dialog | MIXED | 1020B | Multiple globals in 0x0065, 0x0066, 0x006A, 0x006C ranges |
| `0040DDC6` | show_tax_rate_dialog | MIXED | 226B | Via sub-call to open_tax_rate_dialog (see FUN_0040cd64). |
| `0044CC80` | show_throne_room | MIXED | 247B | Via FUN_0044d296: writes to DAT_0064ca93 (throne room piece levels, 0x0064XXXX) and DAT_0064ca9b ... |
| `004C6BF5` | spy_enters_city | MIXED | 10469B | Extremely extensive — modifies treaty flags, gold, city improvements, city size, city production,... |
| `0055AF2E` | start_turn_timer | MIXED | 280B | DAT_00633a78 (remaining time), DAT_00633a74 (timer handle), DAT_006ab5ac, _DAT_0066c990 |
| `0055AE80` | stop_turn_timer | MIXED | 174B | DAT_00633a74 (timer handle, 0x0063 range) |
| `00436F5A` | submit_hall_of_fame_entry | MIXED | 601B | DAT_0063f0c8 area (hall of fame records shifted to make room for new entry — 0x0063 range, UI data) |
| `0040C480` | taxrate_recalc_totals | MIXED | 848B | - DAT_0064c6b3[civ * 0x594] and DAT_0064c6b4[civ * 0x594]: temporarily modified during calculatio... |
| `0044D296` | throne_room_add_improvement | MIXED | 1799B | Writes DAT_0064ca93[civId*0x594 + category] (throne room piece level, 0x0064XXXX) and DAT_0064ca9... |
| `00553FF6` | toggle_cheat_mode | MIXED | 335B | DAT_00655aea \|= 0x8000, DAT_00655af0 \|= 0x10 \| 0x80 (game flags at 0x0065 = global game state) |
| `00554297` | toggle_cheat_multiplayer | MIXED | 396B | DAT_00655aea ^= 0x8000; DAT_00654b70, DAT_00654c7e (timer values at 0x0065 = game state) |
| `0058DF7B` | unit_order_airlift | MIXED | 1609B | Via thunk_FUN_004ca1cd (not directly in this function) |
| `0058BE56` | unit_order_build_city | MIXED | 1087B | - DAT_0064f349[city * 0x58]: city size incremented when settler joins existing city (0x0064XXXX)
... |
| `0058C65E` | unit_order_build_improvement | MIXED | 1411B | NONE directly (delegates actual work to thunk_FUN_004c42a0) |
| `0058C295` | unit_order_disband | MIXED | 722B | - DAT_0064f35c[city * 0x58]: production shields increased by (unit_cost * cosmic_multiplier / 2) ... |
| `0058CCE6` | unit_order_fortify | MIXED | 255B | - DAT_006560ff[unit * 0x20] = 1 (fortified order) (0x0065XXXX) |
| `0058D6AF` | unit_order_goto_city | MIXED | 1787B | - DAT_006560ff[unit * 0x20] = 0x0b (goto city order) (0x0065XXXX)
- DAT_00656102[unit * 0x20] = t... |
| `0058CBE1` | unit_order_home_city | MIXED | 261B | - DAT_00656100[unit * 0x20]: home city assignment changed (0x0065XXXX) |
| `0058CFCD` | unit_order_pillage | MIXED | 1105B | - DAT_006ad0cc = 1 (diplomacy trigger flag at 0x006AXXXX — not in game state range) |
| `0058D442` | unit_order_sentry | MIXED | 451B | - DAT_006560ff[unit * 0x20] = 0xff (sentry order) (0x0065XXXX)
- DAT_006560f4[unit * 0x20] &= 0x7... |
| `004E4CEB` | update_menu_state | MIXED | 3761B | NONE (only modifies menu UI state via thunk calls) |
| `0046ACE7` | add_click_region | UI | 153B | NONE (UI object state) |
| `0057ED3F` | animate_combat_movement | UI | 2281B | DAT_006ad908 written (0x006A, animation-in-progress flag). DAT_006c926c written (0x006C, MP sync ... |
| `0057F657` | animate_nuke_explosion | UI | 885B | DAT_006ad908 written (animation flag, 0x006A range). |
| `005683C5` | animate_screen_reveal | UI | 1155B | NONE (visual effect only) |
| `0056C705` | animate_unit_movement | UI | 2902B | DAT_006ad908 (animation lock), DAT_006ad6a4/a8 (animation state), DAT_00633e54 |
| `0046EE4E` | apply_palette_to_surfaces | UI | 241B | NONE (UI rendering) |
| `0047A747` | calc_coast_quadrants | UI | 386B | Writes DAT_0066c720 (0x0066xxxx — rendering scratch data, 4 quadrant flags) |
| `0056A9F4` | calc_main_window_rect | UI | 139B | NONE (UI rect) |
| `00568CA2` | calc_status_panel_layout | UI | 484B | UI layout globals (0x006A/0x0063 ranges — not game state) |
| `00410ED8` | cancel_goto_mode | UI | 159B | DAT_0066cb00 array written (0x0066 range) |
| `00410A64` | cancel_unit_blink_timer | UI | 191B | DAT_0066cb00 array written at DAT_00624f58*0xfc offset (0x0066 range = unit type tables) |
| `00410D98` | center_and_scroll_to_tile | UI | 114B | DAT_0064b1b4, DAT_0064b1b0 written (0x0064 range — per-civ data, specifically cursor position) |
| `00410302` | center_map_on_cursor | UI | 56B | NONE (DAT_006d1da0 is read, not written) |
| `004906FD` | chatwin_draw_terrain_info | UI | 5344B | NONE (pure drawing) |
| `00491C20` | chatwin_select_item | UI | 321B | NONE (object-local state) |
| `00555CB1` | cheat_edit_unit_at_cursor | UI | 60B | Via thunk_FUN_005b47fa (opens unit edit dialog) |
| `0055891D` | cheat_save_game | UI | 26B | NONE (file I/O only) |
| `00587A90` | city_list_create_panel | UI | 849B | NONE (UI state only) |
| `0058878E` | city_list_draw | UI | 1721B | NONE (UI rendering only) |
| `00588F36` | city_list_populate | UI | 1138B | NONE (UI object state) |
| `0058843F` | city_list_sort | UI | 847B | NONE (UI object state) |
| `00429671` | city_name_editor_open | UI | 2002B | NONE (all writes are to UI objects) |
| `005013BC` | citywin_modal_refresh | UI | 132B | NONE (DAT_00630d1c is UI reentrancy guard) |
| `00526913` | civpedia_select_item | UI | 334B | NONE (all writes to in_ECX are UI object state) |
| `0046AC89` | close_dialog | UI | 94B | NONE (UI object state) |
| `00586F16` | cosmic_editor_init_window | UI | 1731B | NONE (UI state only) |
| `004AF3E0` | create_civ_listbox | UI | 1123B | NONE (UI dialog state) |
| `00416354` | create_editor_combo_control | UI | 962B | DAT_006a1d80 incremented (0x006A range — editor control ID counter) |
| `004A4A58` | create_editor_dropdown | UI | 1084B | NONE (UI control creation) |
| `00416734` | create_editor_edit_control | UI | 244B | DAT_006a1d80 incremented (0x006A range) |
| `004A4EB2` | create_editor_textfield | UI | 215B | NONE (UI) |
| `005BB3F0` | create_offscreen_surface | UI | 115B | NONE (UI/GDI state) |
| `00553DFD` | create_scenario_folder | UI | 505B | DAT_0064bb08 (scenario path, 0x0064 range = per-civ data) |
| `00447210` | disable_civ_slot | UI | 133B | NONE (UI object state only) |
| `0056D289` | draw_city_sprite | UI | 1737B | NONE (pure rendering) |
| `0056AC67` | draw_minimap_overlay | UI | 646B | UI surface state (0x006A/0x0063 ranges — not game state) |
| `00472B0A` | draw_number_on_map | UI | 346B | NONE (DAT_0066ca8c is per-player viewport zoom data, DAT_0066cae0 is font resource) |
| `00569363` | draw_status_panel_header | UI | 1182B | NONE (pure rendering) |
| `00569801` | draw_status_panel_units | UI | 3672B | DAT_006abc38, DAT_006abc18-24, DAT_00633dfc (UI layout state, not game state) |
| `0056BAFF` | draw_unit | UI | 2803B | NONE (pure rendering) |
| `004D986E` | editor_create_combo_control | UI | 551B | DAT_006a1d80 (0x006A range — editor control ID counter) |
| `004D9A9F` | editor_create_edit_control | UI | 244B | DAT_006a1d80 (0x006A range) |
| `004D9718` | editor_handle_listbox | UI | 342B | NONE (DAT_006a4f88 is UI state) |
| `004DA107` | editor_init | UI | 2205B | DAT_006a1d7c = 1, DAT_006a4f88, DAT_006a1d80 = 0xc9, DAT_0062e018, DAT_006a4f90 (all 0x006A or 0x... |
| `005B1037` | editor_init_window | UI | 2484B | NONE (editor UI) |
| `004D8BC0` | editor_load_improvements | UI | 234B | DAT_006a1d88, DAT_006a2d28-34 (0x006A range — editor scratch/map data area) |
| `005B0473` | editor_populate_listbox | UI | 1111B | NONE (UI control population) |
| `004D8ED6` | editor_read_controls | UI | 437B | DAT_006a2d28, DAT_006a2a00 (0x006A range — editor data) |
| `005AEF20` | editor_save_unit_types_to_buffer | UI | 544B | NONE (editor buffers are UI state) |
| `004FAAB0` | event_action_show_text | UI | 246B | Writes DAT_0063cc48 (0x0063XXXX, trade/text data area) |
| `0046F06F` | fade_in_palette | UI | 153B | NONE (UI effect) |
| `0046EFD6` | fade_out_palette | UI | 153B | NONE (UI effect) |
| `0041623D` | handle_editor_selection_change | UI | 279B | DAT_006a4f88+0x2ec written (editor state — 0x006A range) |
| `00411A85` | handle_spectator_keypress | UI | 333B | DAT_0064b9bc written (0x0064 range — per-civ flag) |
| `0046E4A9` | init_cd_music | UI | 190B | NONE (music state) |
| `00479EDE` | init_map_viewport | UI | 224B | NONE (writes to object members via in_ECX, not to global game state addresses) |
| `0044CE16` | init_throne_context | UI | 405B | NONE (DAT_00626810 is a rendering context pointer, not game state) |
| `004683F0` | init_unit_listbox | UI | 899B | NONE (UI-only, DAT_0066be78/0066be80 are UI state in 0x0066 range) |
| `00413717` | initialize_map_view | UI | 889B | NONE (all writes are to view object member fields in CPropertySheet subclass) |
| `00494148` | intel_close_advisor | UI | 166B | NONE (0x0062 — UI state) |
| `004942A3` | intel_create_object | UI | 200B | NONE (object construction) |
| `004943C9` | intel_destroy_object | UI | 134B | NONE (0x0062 — UI) |
| `00493F0F` | intel_open_advisor | UI | 546B | NONE (0x0062 range — UI state) |
| `004941EE` | intel_play_animation | UI | 181B | NONE (object-local) |
| `00494704` | intel_setup_display | UI | 236B | NONE (UI state) |
| `00530EE0` | listbox_create_window | UI | 167B | NONE (UI object creation) |
| `004A3060` | load_rules_to_editor | UI | 966B | NONE (editor UI buffers in 0x006A range) |
| `00578F2C` | menu_populate | UI | 686B | NONE (UI menu construction). |
| `00578DE8` | menu_set_host_window | UI | 80B | NONE (0x0063 range but menu UI state). |
| `00406B4C` | minimap_calc_viewport | UI | 620B | Writes to DAT_0063c8XX and DAT_0066caXX ranges.
- DAT_0063c804: minimap tile height (zoom factor)... |
| `0040733C` | minimap_full_redraw | UI | 416B | NONE (all writes are via sub-calls to minimap_calc_viewport which writes 0x0063c8XX) |
| `00411A13` | move_cursor_by_direction | UI | 114B | DAT_0064b1b4, DAT_0064b1b0 (via center_and_scroll_to_tile — 0x0064 range) |
| `0052263C` | mp_set_animation_style | UI | 185B | NONE (DAT_00631ef0 is UI animation state at 0x0063XXXX) |
| `00421DA0` | mp_set_number_control | UI | 29B | Writes to DAT_0063cc30 range (0x0063XXXX — trade route/supply tables) |
| `00421D60` | mp_set_string_control | UI | 46B | Writes to DAT_0063cc48 range (0x0063XXXX — trade route/supply tables) |
| `004259A6` | mp_setup_game_profile | UI | 1423B | NONE (only writes to 0x0063XXXX dialog string buffers and 0x00635XXX UI state) |
| `004985F4` | mp_verify_password | UI | 341B | NONE (only temporary flag DAT_00635a3c in 0x0063 — UI state) |
| `0054FFC8` | open_events_editor | UI | 79B | NONE (delegates to FUN_0054f3b9) |
| `0043060B` | open_intelligence_dialog | UI | 535B | NONE (all UI state) |
| `004A54D9` | open_scenario_editor | UI | 2171B | NONE (editor UI session, DAT_006a1d7c/DAT_006a4f88 in 0x006A range) |
| `00416C9E` | open_tech_editor | UI | 2186B | DAT_006a1d7c, DAT_006a4f88, DAT_006a1d80, DAT_0062e018 (all 0x006A/0x0062 range — editor state) |
| `004AFC89` | paint_civ_listbox | UI | 1230B | NONE (UI rendering) |
| `00468BB9` | paint_unit_listbox | UI | 1841B | NONE (UI rendering only) |
| `00526CA0` | parley_add_dialog_panel | UI | 26152B | NONE (all writes are to in_ECX UI object state and DAT_0067XXXX UI state; DAT_0064c6c0 reads are ... |
| `004DBEE6` | parley_build_description | UI | 2892B | DAT_006a5b58 (0x006A range — text buffer) |
| `004DD016` | parley_describe_attitude | UI | 347B | DAT_006a5b58 (0x006A range) |
| `004DCEA5` | parley_describe_cities | UI | 369B | DAT_006a5b58 (0x006A range) |
| `004DCC0C` | parley_describe_gold | UI | 119B | DAT_006a5b58 (0x006A range) |
| `004DD176` | parley_describe_maps | UI | 271B | DAT_006a5b58 (0x006A range) |
| `004DCAFA` | parley_describe_techs | UI | 274B | DAT_006a5b58 (0x006A range) |
| `004DEF54` | parley_describe_treaty | UI | 417B | DAT_006a5b58 (0x006A range — text buffer) |
| `004DCC83` | parley_describe_units | UI | 546B | DAT_006a5b58 (0x006A range) |
| `004B8676` | parley_set_negotiation_state | UI | 536B | DAT_0067a994/998/99c/9a0/9a4 — negotiation state at 0x0067xxxx. |
| `004F5DD1` | pedia_close_display | UI | 129B | NONE (UI state) |
| `00599B8D` | pedia_draw_item_detail | UI | 1488B | NONE (UI drawing). |
| `00450F0B` | pedia_draw_list_panel | UI | 1333B | NONE (reads DAT_006d1da0 and tech data, but all writes are to GDI surfaces) |
| `00564E6D` | pedia_draw_tech_detail | UI | 5911B | NONE (pure rendering) |
| `0059A2E6` | pedia_navigate_to_item | UI | 369B | NONE (UI navigation). |
| `004F7BD1` | pedia_open_category | UI | 200B | NONE (UI state) |
| `004F8AF9` | pedia_push_history | UI | 523B | NONE (UI history state) |
| `00566584` | pedia_select_entry | UI | 342B | NONE (UI navigation state) |
| `00450480` | pedia_setup_list_panel | UI | 1602B | NONE (UI-only setup; reads game state but does not write it) |
| `0046E571` | play_music_track | UI | 312B | NONE (music state) |
| `0046E020` | play_sound_effect | UI | 601B | DAT_0066bfc4, DAT_0066bfc0 (last played sound tracking, 0x0066 range — not game state) |
| `00469BDC` | populate_unit_listbox | UI | 1102B | NONE (UI state) |
| `0059DF8A` | popup_dialog_close | UI | 47B | NONE (UI cleanup). |
| `0059DB65` | popup_dialog_destroy | UI | 1061B | Writes to DAT_00635a9c, DAT_006ad678, DAT_006cec84 (popup stack state, 0x0063/006A/006C ranges — ... |
| `0059DFB9` | popup_dialog_open | UI | 306B | NONE (UI initialization). |
| `0059D5F5` | popup_dialog_reset | UI | 1299B | NONE (object field initialization). |
| `005A211C` | popup_init_controls | UI | 6616B | NONE (all writes are to UI/popup state) |
| `0059FD2A` | popup_layout_dialog | UI | 4785B | NONE (all writes to this object's layout fields) |
| `0041557B` | read_editor_controls | UI | 480B | DAT_006a2d28 and DAT_006a2a00 written (0x006A range — editor state) |
| `00479FBE` | recalc_viewport_geometry | UI | 1410B | NONE (writes to object members at in_ECX + various offsets) |
| `0047CD51` | redraw_entire_map | UI | 205B | Writes DAT_006ad908 (rendering lock flag) |
| `0056A65E` | refresh_status_panel | UI | 297B | NONE (UI repaint) |
| `0046AB82` | remove_click_region | UI | 107B | NONE (UI object state) |
| `0047A8C9` | render_tile | UI | 4431B | NONE (pure rendering function) |
| `0046F108` | restore_palette_entries | UI | 135B | NONE (UI) |
| `0046E6C8` | resume_music | UI | 85B | NONE (music state) |
| `004105F8` | scroll_all_views_if_needed | UI | 261B | DAT_006ad908 written (0x006A range — map/BFS scratch area) |
| `00410464` | scroll_map_if_needed | UI | 404B | NONE (DAT_0062805c and DAT_00628054 are UI state at 0x0062) |
| `005310A0` | scrollbar_create_window | UI | 207B | NONE (UI object creation) |
| `0046E320` | select_random_music_track | UI | 388B | NONE (music state) |
| `005BB574` | set_active_surface | UI | 74B | NONE (UI state) |
| `00410E46` | set_all_views_goto_cursor | UI | 146B | DAT_0066cb00 array written (0x0066 range) |
| `004271E8` | set_improvement_name_string | UI | 41B | NONE (writes to 0x0063XXXX dialog buffer) |
| `00410402` | set_map_scroll_position | UI | 98B | NONE (DAT_0062804c is UI state, not game state; in_ECX+0x2e0/0x2e2 are view object fields) |
| `005BAEC8` | set_text_draw_source | UI | 24B | NONE (UI state) |
| `005BAEB0` | set_text_draw_target | UI | 24B | NONE (UI state) |
| `005BAEE0` | set_text_style | UI | 68B | NONE (UI state) |
| `0056B90B` | set_unit_font_for_zoom | UI | 99B | DAT_00633e3c (cached font size — UI state) |
| `004D0EA6` | show_advance_animation | UI | 1232B | DAT_006a5b08 — stores current time (0x006A range, map data area) |
| `004EB80A` | show_city_event_dialog_v2 | UI | 915B | DAT_006a65a0 (0x006A range) |
| `004A6CC5` | show_city_style_picker | UI | 260B | NONE (UI dialog) |
| `0040FF60` | show_message | UI | 46B | NONE (DAT_0063cc48 is in 0x0063 range but is a UI text buffer, not game logic state) |
| `004C0CF7` | show_research_goal_dialog | UI | 3119B | NONE (UI only — actual research goal is set by caller) |
| `005B6AEA` | show_unit_list_dialog | UI | 693B | NONE (UI dialog) |
| `004A6E39` | show_unit_type_picker | UI | 260B | NONE (UI dialog) |
| `0046990A` | sort_listbox_by_name | UI | 722B | NONE (UI state) |
| `0046968B` | sort_listbox_by_type | UI | 639B | NONE (UI state) |
| `0059772C` | spaceship_dialog | UI | 1567B | Writes to DAT_0063cc48-49 (name formatting, 0x0063 range — UI scratch, not game state). Calls spa... |
| `00598B4E` | spaceship_view_menu | UI | 377B | NONE (UI navigation). |
| `004897FA` | start_human_turn | UI | 95B | NONE (all writes to 0x0062 range — UI/framework state) |
| `0040785B` | status_panel_calc_rect | UI | 255B | NONE (DAT_006553XX is UI layout state) |
| `004E2597` | toggle_hidden_terrain | UI | 88B | DAT_0062804c = 0, DAT_0062bcd8 (toggled 1 then 0) — UI display flags |
| `0058D60A` | unit_order_paradrop | UI | 165B | NONE (validation only; actual paradrop handled elsewhere) |
| `00552112` | unknown (dialog_render_title_bar) | UI | 3401B | NONE (all writes to object fields via this pointer) |
| `0046F18F` | unknown (realize all palettes) | UI | 151B | NONE (UI) |
| `0046EF3F` | unknown (realize palettes) | UI | 151B | NONE (UI) |
| `0059D3B1` | unknown (set popup parent A) | UI | 24B | NONE (0x0063 range, popup config). |
| `004472F0` | unknown (set selected item) | UI | 33B | NONE (UI state) |
| `0046E6A9` | unknown (stop music) | UI | 31B | NONE (music state) |
| `004A3640` | update_editor_controls_from_game | UI | 269B | NONE (UI state) |
| `0047CBB4` | update_map_area | UI | 313B | Writes DAT_006ad908 (0x006Axxxx — map tile data range, but this is a rendering lock flag) |
| `004D08B0` | wonder_win_destructor | UI | 422B | DAT_0062e2d0 = 0 (UI state) |
| `004D043F` | wonder_win_draw_title | UI | 216B | NONE (DAT_00679641 at 0x0067 is score/power area but this is just UI text buffer) |
| `004D0517` | wonder_win_init | UI | 677B | DAT_0062e2d0 — sets global wonder window pointer (UI state, not game state) |
